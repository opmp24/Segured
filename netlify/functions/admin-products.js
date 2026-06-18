const { createClient } = require('@supabase/supabase-js')
const crypto = require('crypto')

const supabaseUrl = process.env.SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const signingSecret =
  process.env.ADMIN_SECRET ||
  crypto
    .createHash('sha256')
    .update(serviceRoleKey || '')
    .digest('hex')

function verifyToken(token) {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return false
    const [header, body, sig] = parts
    const expectedSig = crypto
      .createHmac('sha256', signingSecret)
      .update(`${header}.${body}`)
      .digest('base64url')
    if (sig !== expectedSig) return false
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString())
    if (payload.exp < Date.now()) return false
    return payload.role === 'admin'
  } catch {
    return false
  }
}

function getAuthToken(event) {
  const auth = event.headers.authorization || event.headers.Authorization || ''
  return auth.replace(/^Bearer\s+/i, '')
}

exports.handler = async function (event) {
  if (!supabaseUrl || !serviceRoleKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Supabase no configurado' }) }
  }

  const token = getAuthToken(event)
  if (!verifyToken(token)) {
    return { statusCode: 401, body: JSON.stringify({ error: 'No autorizado' }) }
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, { realtime: { enabled: false } })
  const method = event.httpMethod
  const params = event.queryStringParameters || {}

  try {
    // GET /admin-products — listar productos
    if (method === 'GET') {
      const status = params.status || 'visible,blocked,out_of_stock'
      const statusList = status.split(',')

      let query = supabase
        .from('products')
        .select('*, product_images(*)')
        .in('status', statusList)
        .order('position', { ascending: true })

      const { data, error } = await query
      if (error) throw error
      return { statusCode: 200, body: JSON.stringify(data) }
    }

    // POST /admin-products — crear producto
    if (method === 'POST') {
      const body = JSON.parse(event.body || '{}')
      const { data, error } = await supabase
        .from('products')
        .insert({
          name: body.name,
          description: body.description || '',
          code: body.code || '',
          category: body.category || '',
          brand: body.brand || '',
          color: body.color || '',
          material: body.material || '',
          position: body.position || 0,
          price: body.price || 0,
          quantity: body.quantity || 0,
          status: body.status || 'visible',
        })
        .select()
        .single()
      if (error) throw error

      if (body.quantity > 0) {
        await supabase.from('stock_movements').insert({
          product_id: data.id,
          type: 'ingreso',
          quantity: body.quantity,
          note: 'Ingreso inicial',
        })
      }

      // Guardar imágenes
      if (body.images && Array.isArray(body.images) && body.images.length > 0) {
        const imageRows = body.images.map((path, i) => ({
          product_id: data.id,
          storage_path: path,
          sort_order: i,
        }))
        const { error: imgErr } = await supabase.from('product_images').insert(imageRows)
        if (imgErr) throw imgErr
      }

      return { statusCode: 200, body: JSON.stringify(data) }
    }

    // PUT /admin-products — actualizar producto
    if (method === 'PUT') {
      const body = JSON.parse(event.body || '{}')
      if (!body.id) {
        return { statusCode: 400, body: JSON.stringify({ error: 'ID requerido' }) }
      }

      const updateData = {}
      const fields = [
        'name',
        'description',
        'code',
        'category',
        'brand',
        'color',
        'material',
        'position',
        'price',
        'quantity',
        'status',
      ]
      for (const f of fields) {
        if (body[f] !== undefined) updateData[f] = body[f]
      }

      const { data, error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', body.id)
        .select()
        .single()
      if (error) throw error

      if (body.movementNote && body.movementQty && body.movementType) {
        await supabase.from('stock_movements').insert({
          product_id: body.id,
          type: body.movementType,
          quantity: body.movementQty,
          note: body.movementNote,
        })
      }

      // Reemplazar imágenes: borrar existentes + insertar nuevas
      if (body.images !== undefined && Array.isArray(body.images)) {
        const { error: delErr } = await supabase
          .from('product_images')
          .delete()
          .eq('product_id', body.id)
        if (delErr) throw delErr
        if (body.images.length > 0) {
          const imageRows = body.images.map((path, i) => ({
            product_id: body.id,
            storage_path: path,
            sort_order: i,
          }))
          const { error: insErr } = await supabase.from('product_images').insert(imageRows)
          if (insErr) throw insErr
        }
      }

      return { statusCode: 200, body: JSON.stringify(data) }
    }

    // DELETE /admin-products — eliminar producto (soft delete)
    if (method === 'DELETE') {
      const id = params.id
      if (!id) {
        return { statusCode: 400, body: JSON.stringify({ error: 'ID requerido' }) }
      }

      await supabase.from('products').update({ status: 'deleted' }).eq('id', id)
      await supabase.from('stock_movements').insert({
        product_id: id,
        type: 'eliminacion',
        quantity: 0,
        note: params.note || 'Eliminado',
      })

      return { statusCode: 200, body: JSON.stringify({ success: true }) }
    }

    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}
