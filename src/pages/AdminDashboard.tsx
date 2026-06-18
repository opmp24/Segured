import { useState } from 'react'
import { NavLink, Outlet, Navigate } from 'react-router-dom'
import { isAdmin, clearToken } from '../services/admin'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!isAdmin()) {
    return <Navigate to="/admin" replace />
  }

  function handleLogout() {
    clearToken()
    navigate('/')
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `btn text-start mb-2 ${isActive ? 'btn-warning text-dark' : 'btn-outline-light'}`

  const links = (
    <>
      <h5 className="text-warning mb-4 d-none d-md-block">Admin</h5>
      <NavLink
        to="/admin/dashboard/stock"
        className={linkClass}
        onClick={() => setSidebarOpen(false)}
      >
        <i className="bi bi-box-seam me-2"></i>Stock
      </NavLink>
      <NavLink
        to="/admin/dashboard/movements"
        className={linkClass}
        onClick={() => setSidebarOpen(false)}
      >
        <i className="bi bi-arrow-left-right me-2"></i>Movimientos
      </NavLink>
      <NavLink
        to="/admin/dashboard/contact"
        className={linkClass}
        onClick={() => setSidebarOpen(false)}
      >
        <i className="bi bi-envelope me-2"></i>Contacto
      </NavLink>
      <div className="mt-auto">
        <button className="btn btn-outline-danger w-100" onClick={handleLogout}>
          <i className="bi bi-box-arrow-left me-2"></i>Salir
        </button>
      </div>
    </>
  )

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Top bar mobile */}
      <nav className="bg-dark text-white d-md-none d-flex align-items-center px-3 py-2">
        <button className="btn btn-outline-light btn-sm me-2" onClick={() => setSidebarOpen(true)}>
          <i className="bi bi-list fs-5"></i>
        </button>
        <span className="text-warning fw-bold">Admin</span>
        <button className="btn btn-outline-danger btn-sm ms-auto" onClick={handleLogout}>
          <i className="bi bi-box-arrow-left"></i>
        </button>
      </nav>

      {/* Offcanvas sidebar mobile */}
      <div
        className={`offcanvas offcanvas-start bg-dark text-white ${sidebarOpen ? 'show' : ''}`}
        style={{ width: 240 }}
        tabIndex={-1}
      >
        <div className="offcanvas-header">
          <h5 className="text-warning mb-0">Admin</h5>
          <button className="btn-close btn-close-white" onClick={() => setSidebarOpen(false)} />
        </div>
        <div className="offcanvas-body d-flex flex-column">{links}</div>
      </div>
      {sidebarOpen && (
        <div className="offcanvas-backdrop fade show" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Desktop sidebar */}
      <div className="d-flex flex-grow-1">
        <nav
          className="bg-dark text-white p-3 d-none d-md-flex flex-column"
          style={{ width: 240, minHeight: '100%' }}
        >
          {links}
        </nav>
        <main className="flex-grow-1 p-3 p-md-4 bg-light" style={{ overflow: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
