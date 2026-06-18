const { createClient } = require('@supabase/supabase-js')
const WebSocket = require('ws')

const supabaseUrl = process.env.SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  if (!supabaseUrl || !serviceRoleKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Supabase no configurado' }) }
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, { realtime: { transport: WebSocket } })

  try {
    const body = JSON.parse(event.body || '{}')
    const { guestName, guestEmail, shippingAddress, notes, items, total } = body

    if (!shippingAddress || !items || !items.length) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Faltan datos obligatorios' }) }
    }

    let userId = null

    // Si el usuario se registró, buscar o crear
    if (guestEmail && guestName) {
      const { data: existing } = await supabase
        .from('users')
        .select('id')
        .eq('email', guestEmail)
        .maybeSingle()
      if (existing) {
        userId = existing.id
      } else {
        const { data: newUser } = await supabase
          .from('users')
          .insert({
            name: guestName,
            email: guestEmail,
          })
          .select()
          .single()
        userId = newUser?.id || null
      }
    }

    // Crear orden
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        guest_name: guestName || '',
        guest_email: guestEmail || '',
        shipping_address: shippingAddress,
        notes: notes || '',
        total,
        status: 'pendiente',
      })
      .select()
      .single()

    if (orderError) throw orderError

    // Insertar items y registrar movimientos de stock
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.price,
    }))

    const { error: itemsError } = await supabase.from('order_items').insert(orderItems)
    if (itemsError) throw itemsError

    // Registrar movimientos de stock y descontar stock
    for (const item of items) {
      await supabase.from('stock_movements').insert({
        product_id: item.product_id,
        type: 'venta',
        quantity: item.quantity,
        note: `Pedido #${order.id}`,
      })
      await supabase.rpc('decrement_stock', {
        pid: item.product_id,
        qty: item.quantity,
      })
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, orderId: order.id }),
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}
