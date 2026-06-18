import { FormEvent, useEffect, useState } from 'react'
import { createProduct, updateProduct, type Product } from '../services/admin'
import { supabase } from '../services/supabase'

interface Props {
  product: Product | null
  onClose: () => void
}

export default function AdminStockForm({ product, onClose }: Props) {
  const isEdit = !!product
  const CATEGORIES = ['', 'EPP', 'Extinción', 'Equipos', 'Construcción', 'Muelles', 'Otro']

  const [form, setForm] = useState({
    name: '',
    description: '',
    code: '',
    category: '',
    brand: '',
    color: '',
    material: '',
    position: 0,
    price: 0,
    quantity: 0,
  })
  const [images, setImages] = useState<string[]>(
    product?.product_images?.map((i) => i.storage_path) || [],
  )
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description || '',
        code: product.code || '',
        category: product.category || '',
        brand: product.brand || '',
        color: product.color || '',
        material: product.material || '',
        position: product.position ?? 0,
        price: product.price ?? 0,
        quantity: product.quantity ?? 0,
      })
    }
  }, [product])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || !supabase) return
    setUploading(true)
    const uploaded: string[] = []
    for (const file of files) {
      const ext = file.name.split('.').pop()
      const path = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error } = await supabase.storage.from('product-images').upload(path, file)
      if (!error) uploaded.push(path)
    }
    setImages((prev) => [...prev, ...uploaded])
    setUploading(false)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setSubmitError('')
    try {
      if (isEdit && product) {
        await updateProduct({ id: product.id, ...form, images })
      } else {
        await createProduct({ ...form, images })
      }
      onClose()
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Error al guardar')
    }
    setSaving(false)
  }

  function getImageUrl(path: string) {
    if (!supabase) return ''
    const { data } = supabase.storage.from('product-images').getPublicUrl(path)
    return data.publicUrl
  }

  return (
    <div
      className="modal d-block"
      style={{
        backgroundColor: 'rgba(0,0,0,0.5)',
        overflowY: 'auto',
        padding: '1rem 0',
      }}
    >
      <div className="modal-dialog modal-xl" style={{ margin: 'auto' }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isEdit ? 'Editar' : 'Nuevo'} Producto</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {submitError && <div className="alert alert-danger py-2">{submitError}</div>}
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label">Nombre *</label>
                  <input
                    className="form-control"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Descripción</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  />
                </div>
                <div className="col-4">
                  <label className="form-label">Código</label>
                  <input
                    className="form-control"
                    value={form.code}
                    onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
                  />
                </div>
                <div className="col-4">
                  <label className="form-label">Categoría</label>
                  <select
                    className="form-select"
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c || 'Sin categoría'}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-4">
                  <label className="form-label">Marca</label>
                  <input
                    className="form-control"
                    value={form.brand}
                    onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
                  />
                </div>
                <div className="col-4">
                  <label className="form-label">Color</label>
                  <input
                    className="form-control"
                    value={form.color}
                    onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
                  />
                </div>
                <div className="col-4">
                  <label className="form-label">Material</label>
                  <input
                    className="form-control"
                    value={form.material}
                    onChange={(e) => setForm((f) => ({ ...f, material: e.target.value }))}
                  />
                </div>
                <div className="col-4">
                  <label className="form-label">Posición (orden)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={form.position}
                    onChange={(e) => setForm((f) => ({ ...f, position: +e.target.value }))}
                  />
                </div>
                <div className="col-4">
                  <label className="form-label">Precio $</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: +e.target.value }))}
                  />
                </div>
                <div className="col-4">
                  <label className="form-label">Cantidad</label>
                  <input
                    type="number"
                    className="form-control"
                    value={form.quantity}
                    onChange={(e) => setForm((f) => ({ ...f, quantity: +e.target.value }))}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Imágenes (1-5)</label>
                  <input
                    type="file"
                    className="form-control"
                    multiple
                    accept="image/*"
                    onChange={handleUpload}
                    disabled={uploading || images.length >= 5}
                  />
                  {uploading && <div className="spinner-border spinner-border-sm mt-2" />}
                  {images.length > 0 && (
                    <div className="d-flex flex-wrap gap-2 mt-2">
                      {images.map((path, i) => (
                        <div key={i} className="position-relative">
                          <img
                            src={getImageUrl(path)}
                            alt=""
                            style={{ width: 180, height: 180, objectFit: 'cover' }}
                            className="rounded border"
                          />
                          <button
                            type="button"
                            className="btn btn-sm btn-danger position-absolute top-0 end-0 p-1 m-0"
                            style={{ fontSize: 20 }}
                            onClick={() => setImages((prev) => prev.filter((_, j) => j !== i))}
                          >
                            <i className="bi bi-trash" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-warning" disabled={saving}>
                {saving ? 'Guardando...' : isEdit ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
