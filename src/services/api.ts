const FUNCTIONS_BASE = '/.netlify/functions'

export interface ProductImage {
  id: number
  product_id: number
  storage_path: string
  sort_order: number
}

export interface Product {
  id: number
  name: string
  description: string
  code: string
  category: string
  brand: string
  color: string
  material: string
  position: number
  price: number
  quantity: number
  status: 'visible' | 'blocked' | 'out_of_stock' | 'deleted'
  created_at: string
  updated_at: string
  product_images: ProductImage[]
}

export async function fetchPublicProducts(): Promise<Product[]> {
  const res = await fetch(`${FUNCTIONS_BASE}/products-public`)
  if (!res.ok) throw new Error('Error al cargar productos')
  return res.json()
}

export interface SubmitOrderInput {
  guestName?: string
  guestEmail?: string
  shippingAddress: string
  notes?: string
  items: { product_id: number; quantity: number; price: number }[]
  total: number
}

export interface SubmitOrderResult {
  success: boolean
  orderId: number
}

export async function submitOrder(input: SubmitOrderInput): Promise<SubmitOrderResult> {
  const res = await fetch(`${FUNCTIONS_BASE}/submit-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error('Error al procesar pedido')
  return res.json()
}
