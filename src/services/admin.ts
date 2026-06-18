const FUNCTIONS_BASE = '/.netlify/functions'

const TOKEN_KEY = 'nm_admin_token'

export function getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  sessionStorage.setItem(TOKEN_KEY, token)
}

export function clearToken(): void {
  sessionStorage.removeItem(TOKEN_KEY)
}

export function isAdmin(): boolean {
  return !!getToken()
}

export async function login(password: string): Promise<boolean> {
  const res = await fetch(`${FUNCTIONS_BASE}/admin-auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })
  if (!res.ok) return false
  const data = await res.json()
  setToken(data.token)
  return true
}

export interface ProductInput {
  id?: number
  name: string
  description?: string
  code?: string
  category?: string
  brand?: string
  color?: string
  material?: string
  position?: number
  price?: number
  quantity?: number
  status?: string
  images?: string[]
}

export interface Product extends ProductInput {
  id: number
  created_at: string
  updated_at: string
  product_images: { id: number; storage_path: string; sort_order: number }[]
}

async function adminFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getToken()
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

export async function fetchAdminProducts(status?: string): Promise<Product[]> {
  const params = status ? `?status=${status}` : ''
  const res = await adminFetch(`${FUNCTIONS_BASE}/admin-products${params}`)
  if (!res.ok) throw new Error('Error al cargar productos')
  return res.json()
}

export async function createProduct(input: ProductInput): Promise<Product> {
  const res = await adminFetch(`${FUNCTIONS_BASE}/admin-products`, {
    method: 'POST',
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error('Error al crear producto')
  return res.json()
}

export async function updateProduct(input: ProductInput): Promise<Product> {
  const res = await adminFetch(`${FUNCTIONS_BASE}/admin-products`, {
    method: 'PUT',
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error('Error al actualizar producto')
  return res.json()
}

export async function deleteProduct(id: number, note?: string): Promise<void> {
  const params = new URLSearchParams({ id: String(id), note: note || 'Eliminado' })
  const res = await adminFetch(`${FUNCTIONS_BASE}/admin-products?${params}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Error al eliminar producto')
}
