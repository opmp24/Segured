import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fetchPublicProducts, type Product } from '../services/api'
import { addToCart } from '../services/cart'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.7, ease: 'easeOut' as const },
}

export default function Productos() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [addedMsg, setAddedMsg] = useState<string | null>(null)

  useEffect(() => {
    fetchPublicProducts()
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  function handleAdd(product: Product) {
    addToCart({
      product_id: product.id,
      name: product.name,
      price: product.price,
      image: product.product_images?.[0]?.storage_path || '',
    })
    setAddedMsg(product.name)
    setTimeout(() => setAddedMsg(null), 2000)
  }

  function getProductImage(path: string) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    return `${supabaseUrl}/storage/v1/object/public/product-images/${path}`
  }

  return (
    <>
      <section className="container-fluid bg-dark text-white py-5 mb-5 position-relative overflow-hidden hero-parallax text-center">
        <div className="container py-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-warning fw-bold text-uppercase">Tienda</span>
            <h1 className="display-4 fw-bold">Nuestros Productos</h1>
            <p className="lead text-white-50 col-lg-8 mx-auto">
              EPP, equipos certificados y soluciones en seguridad industrial.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="container-fluid py-4 px-lg-5">
        <motion.section {...fadeUp} className="py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="display-6 fw-bold mb-0">Catálogo</h2>
            <Link to="/cart" className="btn btn-outline-warning">
              <i className="bi bi-cart3 me-2"></i>Ver Carrito
            </Link>
          </div>

          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-warning" role="status" />
            </div>
          )}

          {!loading && products.length === 0 && (
            <p className="text-muted text-center py-4">Próximamente...</p>
          )}

          {!loading && products.length > 0 && (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4">
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  className="col"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Link to={`/productos/${product.id}`} className="text-decoration-none text-dark">
                    <div className="card h-100 border-0 shadow-sm">
                      {product.product_images?.[0]?.storage_path ? (
                        <img
                          src={getProductImage(product.product_images[0].storage_path)}
                          alt={product.name}
                          className="card-img-top"
                          style={{ height: 220, objectFit: 'cover' }}
                        />
                      ) : (
                        <div
                          className="bg-light d-flex align-items-center justify-content-center"
                          style={{ height: 220 }}
                        >
                          <i className="bi bi-image text-muted fs-1" />
                        </div>
                      )}
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{product.name}</h5>
                        {product.description && (
                          <p className="card-text small text-muted flex-grow-1">
                            {product.description}
                          </p>
                        )}
                        <div className="d-flex flex-wrap gap-1 mb-2">
                          {product.category && (
                            <span className="badge bg-warning text-dark">{product.category}</span>
                          )}
                          {product.brand && (
                            <span className="badge bg-light text-dark border">{product.brand}</span>
                          )}
                          {product.color && (
                            <span className="badge bg-light text-dark border">{product.color}</span>
                          )}
                          {product.material && (
                            <span className="badge bg-light text-dark border">
                              {product.material}
                            </span>
                          )}
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-auto">
                          <span className="fs-5 fw-bold text-warning">
                            ${Number(product.price).toLocaleString('es-CL')}
                          </span>
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              handleAdd(product)
                            }}
                            disabled={product.quantity <= 0}
                          >
                            {product.quantity <= 0 ? (
                              'Sin stock'
                            ) : (
                              <>
                                <i className="bi bi-cart-plus me-1"></i>Agregar
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </main>

      {addedMsg && (
        <div
          className="position-fixed top-0 start-50 translate-middle-x mt-4"
          style={{ zIndex: 9999 }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="alert alert-success d-flex align-items-center shadow"
          >
            <i className="bi bi-check-circle-fill me-2"></i>
            {addedMsg} agregado al carrito
          </motion.div>
        </div>
      )}
    </>
  )
}
