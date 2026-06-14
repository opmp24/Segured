import { ReactNode, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar')
      if (navbar) {
        navbar.classList.toggle('navbar-scrolled', window.scrollY > 50)
      }
      const btn = document.getElementById('scrollTopBtn')
      if (btn) {
        btn.style.display = window.scrollY > 300 ? 'flex' : 'none'
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const navLinks = [
    { href: '/', label: 'Inicio', isReact: true },
    { href: '/pages/about.html', label: 'A qu\u00e9 nos dedicamos', isReact: false },
    { href: '/pages/gallery.html', label: 'Galer\u00eda', isReact: false },
    { href: '/pages/documents.html', label: 'Documentos', isReact: false },
    { href: '/pages/contact.html', label: 'Contacto', isReact: false },
  ]

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="bg-dark text-white py-2 d-none d-lg-block small">
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <span className="me-4">
              <i className="bi bi-envelope-fill me-2"></i>
              <a href="mailto:contacto@nm-soluciones.cl" className="text-white text-decoration-none">
                contacto@nm-soluciones.cl
              </a>
            </span>
            <span>
              <i className="bi bi-telephone-fill me-2"></i>
              <a href="tel:+56990772964" className="text-white text-decoration-none">
                +56 9 9077 2964
              </a>
            </span>
          </div>
          <div>
            <span className="text-warning fw-bold">L&iacute;deres en Seguridad Industrial</span>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold text-uppercase" to="/">
            <span className="text-dark">NM</span>{' '}
            <span className="text-warning">Soluciones Integrales</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMain"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navMain">
            <ul className="navbar-nav ms-auto">
              {navLinks.map((link) => (
                <li className="nav-item" key={link.href}>
                  {link.isReact ? (
                    <Link
                      className={`nav-link text-dark fw-bold text-uppercase${pathname === link.href ? ' active' : ''}`}
                      to={link.href}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      className={`nav-link text-dark fw-bold text-uppercase${pathname === link.href ? ' active' : ''}`}
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <main className="flex-grow-1">{children}</main>

      <footer className="bg-dark text-white py-5 mt-auto">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-4 mb-md-0">
              <h3 className="fw-bold mb-4">Informaci&oacute;n de contacto</h3>
              <p className="mb-4 text-white-50">
                Estamos disponibles para responder tus dudas sobre seguridad laboral.
              </p>
            </div>
            <div className="col-md-6">
              <div className="d-flex mb-3">
                <div className="me-3 text-warning">
                  <i className="bi bi-geo-alt-fill fs-4"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-0">Direcci&oacute;n</h6>
                  <small className="text-white-50">Por confirmar v&iacute;a Google Drive</small>
                </div>
              </div>
              <div className="d-flex mb-3">
                <div className="me-3 text-warning">
                  <i className="bi bi-envelope-fill fs-4"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-0">Email</h6>
                  <a
                    href="mailto:contacto@nm-soluciones.cl"
                    className="small text-white-50 text-decoration-none"
                  >
                    contacto@nm-soluciones.cl
                  </a>
                </div>
              </div>
              <div className="d-flex">
                <div className="me-3 text-warning">
                  <i className="bi bi-telephone-fill fs-4"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-0">Tel&eacute;fono</h6>
                  <a
                    href="tel:+56990772964"
                    className="small text-white-50 text-decoration-none"
                  >
                    +56 9 9077 2964
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <motion.a
        className="whatsapp-fab"
        href="https://wa.me/56990772964"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <i className="bi bi-whatsapp fs-3"></i>
      </motion.a>

      <button
        id="scrollTopBtn"
        className="btn btn-warning position-fixed start-50 translate-middle-x bottom-0 mb-4 rounded-circle shadow border-2 border-dark align-items-center justify-content-center p-0"
        onClick={scrollToTop}
        aria-label="Volver arriba"
        style={{ display: 'none', width: 50, height: 50, zIndex: 1000 }}
      >
        <i className="bi bi-arrow-up fs-4"></i>
      </button>
    </div>
  )
}
