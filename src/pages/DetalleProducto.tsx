import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fetchPublicProducts, type Product } from '../services/api'
import { addToCart } from '../services/cart'

export default function DetalleProducto() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    fetchPublicProducts()
      .then((products) => {
        const found = products.find((p) => p.id === Number(id))
        setProduct(found || null)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  function getImageUrl(path: string) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    return `${supabaseUrl}/storage/v1/object/public/product-images/${path}`
  }

  function handleAdd() {
    if (!product) return
    addToCart({
      product_id: product.id,
      name: product.name,
      price: product.price,
      image: product.product_images?.[0]?.storage_path || '',
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-warning" role="status" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <i className="bi bi-emoji-frown display-1 text-muted" />
        <h3 className="mt-3">Producto no encontrado</h3>
        <Link to="/productos" className="btn btn-warning">
          Volver a productos
        </Link>
      </div>
    )
  }

  const images = product.product_images || []

  return (
    <div className="container py-5">
      <Link to="/productos" className="btn btn-outline-secondary btn-sm mb-4">
        <i className="bi bi-arrow-left me-2"></i>Volver
      </Link>

      <motion.div
        key={product.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="row g-5"
      >
        <div className="col-lg-6">
          {images.length > 0 ? (
            <>
              <div
                className="bg-light rounded mb-3 d-flex align-items-center justify-content-center"
                style={{ height: 400 }}
              >
                <img
                  src={getImageUrl(images[selectedImage].storage_path)}
                  alt={product.name}
                  className="img-fluid"
                  style={{ maxHeight: '100%', objectFit: 'contain' }}
                />
              </div>
              {images.length > 1 && (
                <div className="d-flex gap-2 overflow-auto">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      className={`btn p-1 border ${i === selectedImage ? 'border-warning border-2' : ''}`}
                      onClick={() => setSelectedImage(i)}
                    >
                      <img
                        src={getImageUrl(img.storage_path)}
                        alt=""
                        style={{ width: 64, height: 64, objectFit: 'cover' }}
                        className="rounded"
                      />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div
              className="bg-light rounded d-flex align-items-center justify-content-center"
              style={{ height: 400 }}
            >
              <i className="bi bi-image text-muted fs-1" />
            </div>
          )}
        </div>

        <div className="col-lg-6">
          {product.category && (
            <span className="badge bg-warning text-dark mb-2">{product.category}</span>
          )}
          <h1 className="fw-bold mb-3">{product.name}</h1>

          {product.description && <p className="text-muted mb-4">{product.description}</p>}

          <div className="mb-4">
            <h3 className="fw-bold text-warning mb-0">
              ${Number(product.price).toLocaleString('es-CL')}
            </h3>
            <small className={`${product.quantity > 0 ? 'text-success' : 'text-danger'}`}>
              {product.quantity > 0 ? `Stock: ${product.quantity} unidades` : 'Sin stock'}
            </small>
          </div>

          <button
            className="btn btn-warning btn-lg w-100 mb-4"
            onClick={handleAdd}
            disabled={product.quantity <= 0}
          >
            {product.quantity <= 0 ? (
              'Sin stock'
            ) : (
              <>
                <i className="bi bi-cart-plus me-2"></i>Agregar al carrito
              </>
            )}
          </button>

          {added && (
            <div className="alert alert-success py-2 text-center">
              <i className="bi bi-check-circle-fill me-2"></i>Agregado al carrito
            </div>
          )}

          <div className="card bg-light border-0">
            <div className="card-body">
              <h6 className="fw-bold mb-3">Características</h6>
              <table className="table table-sm mb-0">
                <tbody>
                  {product.code && (
                    <tr>
                      <td className="fw-semibold" style={{ width: 120 }}>
                        Código
                      </td>
                      <td>
                        <code>{product.code}</code>
                      </td>
                    </tr>
                  )}
                  {product.brand && (
                    <tr>
                      <td className="fw-semibold">Marca</td>
                      <td>{product.brand}</td>
                    </tr>
                  )}
                  {product.color && (
                    <tr>
                      <td className="fw-semibold">Color</td>
                      <td>{product.color}</td>
                    </tr>
                  )}
                  {product.material && (
                    <tr>
                      <td className="fw-semibold">Material</td>
                      <td>{product.material}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
