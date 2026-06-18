import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getCart, getCartTotal, clearCart } from '../services/cart'
import { submitOrder } from '../services/api'

export default function Checkout() {
  const items = getCart()
  const total = getCartTotal()

  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [shippingAddress, setShippingAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState(false)

  if (items.length === 0 && !done) {
    return (
      <div className="container py-5 text-center">
        <i className="bi bi-cart-x display-1 text-muted"></i>
        <p className="mt-3 text-muted">No hay productos en el carrito</p>
        <Link to="/gallery" className="btn btn-warning">
          Ver productos
        </Link>
      </div>
    )
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      await submitOrder({
        guestName,
        guestEmail,
        shippingAddress,
        notes,
        items: items.map((i) => ({
          product_id: i.product_id,
          quantity: i.quantity,
          price: i.price,
        })),
        total,
      })
      clearCart()
      setDone(true)
    } catch (err) {
      console.error(err)
      alert('Error al procesar el pedido. Intenta de nuevo.')
    }
    setSaving(false)
  }

  if (done) {
    return (
      <div className="container py-5 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <i className="bi bi-check-circle-fill display-1 text-success"></i>
        </motion.div>
        <h3 className="mt-3">¡Pedido registrado!</h3>
        <p className="text-muted">Te contactaremos para coordinar el pago y despacho.</p>
        <Link to="/gallery" className="btn btn-warning me-2">
          Seguir comprando
        </Link>
        <Link to="/" className="btn btn-outline-secondary">
          Volver al inicio
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="fw-bold mb-4">
          <i className="bi bi-truck me-2"></i>Datos de Despacho
        </h2>

        <div className="row g-4">
          <div className="col-lg-7">
            <form onSubmit={handleSubmit}>
              <div className="card shadow-sm">
                <div className="card-body p-4">
                  <h5 className="mb-3">Información de contacto</h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Nombre (opcional)</label>
                      <input
                        className="form-control"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="Para hacer seguimiento"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email (opcional)</label>
                      <input
                        type="email"
                        className="form-control"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="Para notificaciones"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Dirección de despacho *</label>
                      <textarea
                        className="form-control"
                        required
                        rows={3}
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        placeholder="Calle, número, comuna, región"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Notas (opcional)</label>
                      <textarea
                        className="form-control"
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Horario preferente, indicaciones, etc."
                      />
                    </div>
                  </div>
                  <p className="text-muted small mt-3 mb-0">
                    <i className="bi bi-info-circle me-1"></i>
                    El pago se coordinará por WhatsApp después de registrar el pedido.
                  </p>
                </div>
              </div>

              <button type="submit" className="btn btn-warning btn-lg w-100 mt-3" disabled={saving}>
                {saving ? 'Procesando...' : 'Registrar Pedido'}
              </button>
            </form>
          </div>

          <div className="col-lg-5">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <h5 className="mb-3">Resumen del pedido</h5>
                {items.map((item) => (
                  <div key={item.product_id} className="d-flex justify-content-between mb-2">
                    <span>
                      {item.name} <small className="text-muted">x{item.quantity}</small>
                    </span>
                    <span>${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                  </div>
                ))}
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Total</span>
                  <span className="text-warning">${total.toLocaleString('es-CL')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
