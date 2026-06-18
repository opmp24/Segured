const { createClient } = require('@supabase/supabase-js')
const crypto = require('crypto')
const WebSocket = require('ws')

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

  const supabase = createClient(supabaseUrl, serviceRoleKey, { realtime: { transport: WebSocket } })

  try {
    // GET — público
    if (event.httpMethod === 'GET') {
      const { data, error } = await supabase.from('contact_info').select('*').eq('id', 1).single()
      if (error) throw error
      return {
        statusCode: 200,
        body: JSON.stringify({
          address: data.address || '',
          phone: data.phone || '',
          whatsapp: data.whatsapp || '',
          email: data.email || '',
        }),
      }
    }

    // PUT — admin
    if (event.httpMethod === 'PUT') {
      const token = getAuthToken(event)
      if (!verifyToken(token)) {
        return { statusCode: 401, body: JSON.stringify({ error: 'No autorizado' }) }
      }

      const body = JSON.parse(event.body || '{}')
      const { data, error } = await supabase
        .from('contact_info')
        .update({
          address: body.address || '',
          phone: body.phone || '',
          whatsapp: body.whatsapp || '',
          email: body.email || '',
        })
        .eq('id', 1)
        .select()
        .single()

      if (error) throw error
      return { statusCode: 200, body: JSON.stringify({ success: true, data }) }
    }

    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}
