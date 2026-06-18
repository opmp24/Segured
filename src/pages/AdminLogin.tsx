import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/admin'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const ok = await login(password)
    setLoading(false)
    if (ok) {
      navigate('/admin/dashboard')
    } else {
      setError('Clave incorrecta')
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow" style={{ maxWidth: 400, width: '100%' }}>
        <div className="card-body p-4">
          <h3 className="text-center mb-4">Acceso Administrador</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Clave de administrador</label>
              <input
                type="password"
                className={`form-control ${error ? 'is-invalid' : ''}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              {error && <div className="invalid-feedback">{error}</div>}
            </div>
            <button type="submit" className="btn btn-warning w-100" disabled={loading}>
              {loading ? 'Validando...' : 'Ingresar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
