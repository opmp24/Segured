const bcrypt = require('bcryptjs')
const { createClient } = require('@supabase/supabase-js')
const crypto = require('crypto')

const supabaseUrl = process.env.SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const signingSecret =
  process.env.ADMIN_SECRET ||
  crypto
    .createHash('sha256')
    .update(serviceRoleKey || 'fallback')
    .digest('hex')

function signToken(payload) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'auth' })).toString('base64url')
  const body = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + 86400000 })).toString(
    'base64url',
  )
  const sig = crypto
    .createHmac('sha256', signingSecret)
    .update(`${header}.${body}`)
    .digest('base64url')
  return `${header}.${body}.${sig}`
}

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  if (!supabaseUrl || !serviceRoleKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Supabase no configurado' }) }
  }

  try {
    const { password } = JSON.parse(event.body || '{}')
    if (!password) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Password requerido' }) }
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, { realtime: { enabled: false } })
    const { data: admins, error } = await supabase.from('admin').select('password_hash').limit(1)

    if (error || !admins || admins.length === 0) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Error de configuración: admin no encontrado' }),
      }
    }

    const valid = await bcrypt.compare(password, admins[0].password_hash)
    if (!valid) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Clave incorrecta' }) }
    }

    const token = signToken({ role: 'admin' })

    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Error interno' }) }
  }
}
