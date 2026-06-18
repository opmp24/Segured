import { useEffect, useState } from 'react'
import { getToken } from '../services/admin'

export default function AdminContact() {
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/.netlify/functions/contact-info')
      .then((r) => r.json())
      .then((data) => {
        setAddress(data.address || '')
        setPhone(data.phone || '')
        setWhatsapp(data.whatsapp || '')
        setEmail(data.email || '')
      })
      .catch(() => setMessage('Error al cargar datos'))
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    try {
      const res = await fetch('/.netlify/functions/contact-info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ address, phone, whatsapp, email }),
      })
      if (!res.ok) throw new Error('Error al guardar')
      setMessage('Datos guardados correctamente')
    } catch {
      setMessage('Error al guardar los datos')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h4 className="fw-bold mb-4">
        <i className="bi bi-envelope me-2"></i>Contacto
      </h4>

      <form onSubmit={handleSave} className="card shadow-sm border-0 p-4" style={{ maxWidth: 600 }}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Dirección</label>
          <textarea
            className="form-control"
            rows={2}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Teléfono</label>
          <input
            type="text"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">WhatsApp</label>
          <input
            type="text"
            className="form-control"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-warning fw-bold" disabled={saving}>
          {saving ? 'Guardando...' : 'Guardar'}
        </button>

        {message && (
          <div
            className={`alert mt-3 py-2 ${message.includes('correctamente') ? 'alert-success' : 'alert-danger'}`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  )
}
