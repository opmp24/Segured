CREATE TABLE IF NOT EXISTS public.contact_info (
  id INTEGER PRIMARY KEY DEFAULT 1,
  address TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  whatsapp TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO public.contact_info (id, address, phone, whatsapp, email)
VALUES (1, 'avenida nueva villarrica 1560 REGIÓN de la araucania', '+56990772964', '+56990772964', 'contacto@nm-soluciones.cl')
ON CONFLICT (id) DO NOTHING;
