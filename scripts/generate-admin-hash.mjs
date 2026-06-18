import bcrypt from 'bcryptjs'
import { createClient } from '@supabase/supabase-js'

const password = process.argv[2]
if (!password) {
  console.error('Uso: node scripts/generate-admin-hash.mjs <password>')
  process.exit(1)
}

const hash = await bcrypt.hash(password, 10)
console.log('Hash bcrypt:', hash)
console.log('')
console.log('Ejecuta en Supabase SQL Editor:')
console.log(`INSERT INTO public.admin (password_hash) VALUES ('${hash}');`)
console.log('')

// Opcional: insertar directo si hay .env con service_role
const supabaseUrl = process.env.VITE_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
if (supabaseUrl && serviceRoleKey) {
  const supabase = createClient(supabaseUrl, serviceRoleKey)
  const { error } = await supabase.from('admin').insert({ password_hash: hash })
  if (error) console.error('Error al insertar:', error.message)
  else console.log('✓ Hash insertado directamente en Supabase')
}
