import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getCart, updateQuantity, removeFromCart, getCartTotal } from '../services/cart'

export default function Cart() {
  const [items, setItems] = useState(getCart())
  const total = getCartTotal()

  function getImageUrl(path: string) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    return `${supabaseUrl}/storage/v1/object/public/product-images/${path}`
  }

  function handleUpdate(productId: number, delta: number) {
    setItems(updateQuantity(productId, delta))
  }

  function handleRemove(productId: number) {
    setItems(removeFromCart(productId))
  }

  return (
    <div className="container py-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="fw-bold mb-4">
          <i className="bi bi-cart3 me-2"></i>Carrito de Compra
        </h2>

        {items.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-cart-x display-1 text-muted"></i>
            <p className="mt-3 text-muted">El carrito está vacío</p>
            <Link to="/productos" className="btn btn-warning">
              Ver productos
            </Link>
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.product_id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          {item.image && (
                            <img
                              src={getImageUrl(item.image)}
                              alt={item.name}
                              style={{ width: 60, height: 60, objectFit: 'cover' }}
                              className="rounded"
                            />
                          )}
                          <span className="fw-semibold">{item.name}</span>
                        </div>
                      </td>
                      <td>${Number(item.price).toLocaleString('es-CL')}</td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => handleUpdate(item.product_id, -1)}
                          >
                            -
                          </button>
                          <span className="btn btn-outline-secondary disabled">
                            {item.quantity}
                          </span>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => handleUpdate(item.product_id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="fw-bold">
                        ${(item.price * item.quantity).toLocaleString('es-CL')}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleRemove(item.product_id)}
                        >
                          <i className="bi bi-trash" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4 p-3 bg-white rounded shadow-sm flex-wrap gap-2">
              <div>
                <strong>Total: </strong>
                <span className="fs-4 fw-bold text-warning">${total.toLocaleString('es-CL')}</span>
              </div>
              <div className="d-flex gap-2">
                <Link to="/productos" className="btn btn-outline-warning">
                  <i className="bi bi-plus-circle me-2"></i>Agregar más productos
                </Link>
                <Link to="/checkout" className="btn btn-warning">
                  <i className="bi bi-credit-card me-2"></i>Proceder al pago
                </Link>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}
