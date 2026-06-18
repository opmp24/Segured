-- ============================================================
-- NM Soluciones Integrales - Esquema de Base de Datos
-- Ejecutar en Supabase Dashboard -> SQL Editor
-- ============================================================

-- Migración: agregar columna category a products (si no existe)
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS category TEXT DEFAULT '';

-- 1. TABLA: admin (almacena hash bcrypt de la clave maestra)
CREATE TABLE IF NOT EXISTS public.admin (
  id BIGSERIAL PRIMARY KEY,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. TABLA: products
CREATE TABLE IF NOT EXISTS public.products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  code TEXT DEFAULT '',
  category TEXT DEFAULT '',
  brand TEXT DEFAULT '',
  color TEXT DEFAULT '',
  material TEXT DEFAULT '',
  position INTEGER DEFAULT 0,
  price NUMERIC(12,2) DEFAULT 0,
  quantity INTEGER DEFAULT 0,
  status TEXT DEFAULT 'visible' CHECK (status IN ('visible', 'blocked', 'out_of_stock', 'deleted')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. TABLA: product_images
CREATE TABLE IF NOT EXISTS public.product_images (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

-- 4. TABLA: stock_movements
CREATE TABLE IF NOT EXISTS public.stock_movements (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('ingreso', 'venta', 'eliminacion')),
  quantity INTEGER NOT NULL,
  note TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. TABLA: users (registro voluntario)
CREATE TABLE IF NOT EXISTS public.users (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. TABLA: orders
CREATE TABLE IF NOT EXISTS public.orders (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES public.users(id),
  guest_name TEXT DEFAULT '',
  guest_email TEXT DEFAULT '',
  shipping_address TEXT NOT NULL,
  status TEXT DEFAULT 'pendiente' CHECK (status IN ('pendiente', 'confirmado', 'enviado', 'entregado', 'cancelado')),
  notes TEXT DEFAULT '',
  total NUMERIC(12,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. TABLA: order_items
CREATE TABLE IF NOT EXISTS public.order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL REFERENCES public.products(id),
  quantity INTEGER NOT NULL,
  unit_price NUMERIC(12,2) NOT NULL
);

-- 8. ÍNDICES
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);
CREATE INDEX IF NOT EXISTS idx_products_position ON public.products(position);
CREATE INDEX IF NOT EXISTS idx_product_images_product ON public.product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_stock_movements_product ON public.stock_movements(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);

-- 9. FUNCIÓN: actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_products_updated_at ON public.products;
CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- 10. FUNCIÓN: decrementar stock (usada al hacer venta)
CREATE OR REPLACE FUNCTION public.decrement_stock(pid BIGINT, qty INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE public.products
  SET quantity = quantity - qty
  WHERE id = pid;
  -- Si queda 0, marcar como sin stock
  UPDATE public.products
  SET status = 'out_of_stock'
  WHERE id = pid AND quantity <= 0 AND status = 'visible';
END;
$$ LANGUAGE plpgsql;

-- 11. BUCKET Storage: product-images (público)
-- Crear bucket en Supabase Dashboard -> Storage -> Create bucket
-- Nombre: product-images
-- Luego ejecutar las políticas:
/*
CREATE POLICY "Product images are public for SELECT"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "Admin can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product-images'
  AND auth.role() = 'service_role'
);

CREATE POLICY "Admin can delete product images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'product-images'
  AND auth.role() = 'service_role'
);
*/
