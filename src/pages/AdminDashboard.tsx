import { NavLink, Outlet, Navigate } from 'react-router-dom'
import { isAdmin, clearToken } from '../services/admin'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
  const navigate = useNavigate()

  if (!isAdmin()) {
    return <Navigate to="/admin" replace />
  }

  function handleLogout() {
    clearToken()
    navigate('/')
  }

  return (
    <div className="d-flex min-vh-100">
      <nav
        className="d-flex flex-column bg-dark text-white p-3"
        style={{ width: 240, minHeight: '100vh' }}
      >
        <h5 className="text-warning mb-4">Admin</h5>
        <NavLink to="/admin/dashboard/stock" className="btn btn-outline-light text-start mb-2">
          <i className="bi bi-box-seam me-2"></i>Stock
        </NavLink>
        <NavLink to="/admin/dashboard/movements" className="btn btn-outline-light text-start mb-2">
          <i className="bi bi-arrow-left-right me-2"></i>Movimientos
        </NavLink>
        <NavLink to="/admin/dashboard/contact" className="btn btn-outline-light text-start mb-2">
          <i className="bi bi-envelope me-2"></i>Contacto
        </NavLink>
        <div className="mt-auto">
          <button className="btn btn-outline-danger w-100" onClick={handleLogout}>
            <i className="bi bi-box-arrow-left me-2"></i>Salir
          </button>
        </div>
      </nav>
      <main className="flex-grow-1 p-4 bg-light" style={{ overflow: 'auto' }}>
        <Outlet />
      </main>
    </div>
  )
}
