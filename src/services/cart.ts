export interface CartItem {
  product_id: number
  name: string
  price: number
  quantity: number
  image: string
}

const CART_KEY = 'nm_cart'

export function getCart(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]')
  } catch {
    return []
  }
}

export function saveCart(items: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(items))
}

export function addToCart(item: Omit<CartItem, 'quantity'>): void {
  const cart = getCart()
  const existing = cart.find((i) => i.product_id === item.product_id)
  if (existing) {
    existing.quantity += 1
  } else {
    cart.push({ ...item, quantity: 1 })
  }
  saveCart(cart)
}

export function updateQuantity(productId: number, delta: number): CartItem[] {
  const cart = getCart()
  const item = cart.find((i) => i.product_id === productId)
  if (item) {
    item.quantity = Math.max(1, item.quantity + delta)
  }
  saveCart(cart)
  return cart
}

export function removeFromCart(productId: number): CartItem[] {
  const cart = getCart().filter((i) => i.product_id !== productId)
  saveCart(cart)
  return cart
}

export function clearCart(): void {
  localStorage.removeItem(CART_KEY)
}

export function getCartCount(): number {
  return getCart().reduce((sum, i) => sum + i.quantity, 0)
}

export function getCartTotal(): number {
  return getCart().reduce((sum, i) => sum + i.price * i.quantity, 0)
}
