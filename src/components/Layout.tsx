import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold text-uppercase" href="/">
            <span className="text-dark">NM</span>{' '}
            <span className="text-warning">Soluciones Integrales</span>
          </a>
        </div>
      </nav>

      <main className="flex-grow-1">{children}</main>

      <footer className="bg-dark text-white py-4">
        <div className="container text-center">
          <p className="mb-0 text-white-50 small">
            &copy; {new Date().getFullYear()} NM Soluciones Integrales
          </p>
        </div>
      </footer>
    </div>
  )
}
