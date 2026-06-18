const { createClient } = require('@supabase/supabase-js')
const WebSocket = require('ws')

const supabaseUrl = process.env.SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

exports.handler = async function (event) {
  if (!supabaseUrl || !serviceRoleKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Supabase no configurado' }) }
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, { realtime: { transport: WebSocket } })

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*, product_images(*)')
      .eq('status', 'visible')
      .order('position', { ascending: true })

    if (error) throw error
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data || []),
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}
