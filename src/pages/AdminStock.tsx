import { useEffect, useState } from 'react'
import { fetchAdminProducts, updateProduct, deleteProduct, type Product } from '../services/admin'
import AdminStockForm from './AdminStockForm'

export default function AdminStock() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)

  async function loadProducts() {
    setLoading(true)
    try {
      const data = await fetchAdminProducts('visible,blocked,out_of_stock')
      setProducts(data)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadProducts()
  }, [])

  async function handleToggleStatus(p: Product) {
    const newStatus = p.status === 'visible' ? 'blocked' : 'visible'
    await updateProduct({ id: p.id, status: newStatus, name: p.name })
    loadProducts()
  }

  async function handleDelete(p: Product) {
    if (!confirm(`¿Eliminar "${p.name}"?`)) return
    await deleteProduct(p.id)
    loadProducts()
  }

  function handleEdit(p: Product) {
    setEditing(p)
    setShowForm(true)
  }

  function handleCreate() {
    setEditing(null)
    setShowForm(true)
  }

  const statusBadge = (s: string | undefined) => {
    const map: Record<string, string> = {
      visible: 'bg-success',
      blocked: 'bg-secondary',
      out_of_stock: 'bg-warning text-dark',
      deleted: 'bg-danger',
    }
    return map[s ?? ''] || 'bg-secondary'
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-warning" role="status" />
      </div>
    )
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">Productos</h3>
        <button className="btn btn-warning" onClick={handleCreate}>
          <i className="bi bi-plus-lg me-2"></i>Nuevo Producto
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-hover bg-white rounded shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Código</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.position}</td>
                <td>{p.name}</td>
                <td>
                  <code>{p.code}</code>
                </td>
                <td>${Number(p.price).toLocaleString('es-CL')}</td>
                <td>{p.quantity}</td>
                <td>
                  <span className={`badge ${statusBadge(p.status)}`}>{p.status}</span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-1"
                    onClick={() => handleEdit(p)}
                    title="Editar"
                  >
                    <i className="bi bi-pencil" />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-secondary me-1"
                    onClick={() => handleToggleStatus(p)}
                    title={p.status === 'visible' ? 'Bloquear' : 'Activar'}
                  >
                    <i className={`bi ${p.status === 'visible' ? 'bi-eye-slash' : 'bi-eye'}`} />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(p)}
                    title="Eliminar"
                  >
                    <i className="bi bi-trash" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <AdminStockForm
          product={editing}
          onClose={() => {
            setShowForm(false)
            loadProducts()
          }}
        />
      )}
    </div>
  )
}
