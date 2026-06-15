import { motion } from 'framer-motion'
import Counter from '../components/Counter'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.7, ease: 'easeOut' as const },
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-dark text-white py-5 mb-5 position-relative overflow-hidden hero-parallax"
      >
        <div className="container py-5">
          <div className="row align-items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="col-lg-6 py-5 position-relative"
              style={{ zIndex: 2 }}
            >
              <span className="text-warning fw-bold text-uppercase mb-2 d-block">
                NM Soluciones Integrales
              </span>
              <h1 className="display-3 fw-bold mb-4">
                SOLUCIONES EN PREVENCI&Oacute;N DE RIESGOS LABORALES
              </h1>
              <p className="lead mb-4 text-white-50">
                Asesor&iacute;a experta, capacitaci&oacute;n, venta de equipamiento y servicios de
                construcci&oacute;n para garantizar un entorno laboral seguro y productivo.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-warning btn-lg"
                  href="/about"
                >
                  CONOCER M&Aacute;S
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-outline-light btn-lg rounded-0"
                  href="/contact"
                >
                  CONTACTAR
                </motion.a>
              </div>
            </motion.div>
            <div className="col-lg-6 d-none d-lg-block position-relative"></div>
          </div>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section {...fadeUp} className="container features-overlap">
        <div className="row g-4">
          {[
            { icon: 'bi-shield-check', title: 'Asesor\u00eda y Gesti\u00f3n', text: 'Implementamos sistemas de gesti\u00f3n (DS 44) y realizamos visitas t\u00e9cnicas para evaluar y mitigar riesgos.' },
            { icon: 'bi-people-fill', title: 'Venta de Equipamiento', text: 'Proveemos Elementos de Protecci\u00f3n Personal (EPP) y equipos de extinci\u00f3n de fuego certificados.' },
            { icon: 'bi-gear-wide-connected', title: 'Servicios y Capacitaci\u00f3n', text: 'Ofrecemos capacitaci\u00f3n especializada, obras menores, paisajismo y mantenimiento de \u00e1reas verdes.' },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="col-md-4"
            >
              <div className="feature-box text-center">
                <div className="feature-icon">
                  <i className={`bi ${f.icon}`}></i>
                </div>
                <h4>{f.title}</h4>
                <p className="text-muted">{f.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* About */}
      <motion.section {...fadeUp} className="container py-5 my-5">
        <div className="row align-items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="col-lg-6 mb-4 mb-lg-0"
          >
            <img
              src="/assets/images/img1.jpg"
              className="img-fluid shadow-lg"
              alt="Sobre Nosotros"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="col-lg-6 ps-lg-5"
          >
            <span className="text-warning fw-bold text-uppercase">Sobre Nosotros</span>
            <h2 className="display-6 fw-bold mb-4">
              EXPERIENCIA EN PREVENCI&Oacute;N DE RIESGOS LABORALES
            </h2>
            <p className="text-muted mb-4">
              Somos su socio estrat&eacute;gico en la creaci&oacute;n de entornos laborales seguros.
              Nuestro giro principal es la prevenci&oacute;n de riesgos laborales, abarcando desde la
              asesor&iacute;a hasta la ejecuci&oacute;n de obras.
            </p>
            <ul className="list-unstyled mb-4">
              <li className="mb-2">
                <i className="bi bi-check-circle-fill text-warning me-2"></i>
                Asesor&iacute;a en prevenci&oacute;n de riesgos
              </li>
              <li className="mb-2">
                <i className="bi bi-check-circle-fill text-warning me-2"></i>
                Implementaci&oacute;n de sistema de gesti&oacute;n seg&uacute;n DS 44
              </li>
              <li className="mb-2">
                <i className="bi bi-check-circle-fill text-warning me-2"></i>
                Construcci&oacute;n, paisajismo y mantenci&oacute;n de &aacute;reas verdes
              </li>
            </ul>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/about" className="btn btn-dark">
              CONOCER M&Aacute;S!
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats */}
      <motion.section {...fadeUp} className="bg-dark text-white py-5">
        <div className="container py-4">
          <div className="row text-center g-4">
            {[
              { value: 150, suffix: '+', label: 'Proyectos' },
              { value: 5000, suffix: '+', label: 'Capacitados' },
              { value: 12, suffix: '', label: 'A\u00f1os Exp.' },
              { value: 100, suffix: '%', label: 'Certificado' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="col-md-3"
              >
                <div className="bg-dark p-4 h-100 d-flex flex-column justify-content-center">
                  <div className="display-4 fw-bold text-warning">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-uppercase small letter-spacing-1">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Services */}
      <motion.section {...fadeUp} className="container py-5 mb-5">
        <div className="text-center mb-5">
          <span className="text-warning fw-bold text-uppercase">Nuestros Servicios</span>
          <h2 className="display-5">SOLUCIONES INTEGRALES</h2>
        </div>
        <div className="row row-cols-1 row-cols-md-4 g-3">
          {[
            { img: '/assets/images/img5.jpg', title: 'Prevenci\u00f3n de Riesgos', text: 'Asesor\u00eda, capacitaci\u00f3n y gesti\u00f3n de seguridad.', href: '/prevencion-riesgos' },
            { img: '/assets/images/img1.jpg', title: 'Paisajismo y Construcci\u00f3n', text: 'Obras menores y mantenci\u00f3n de \u00e1reas verdes.', href: '/paisajismo-construccion' },
            { img: '/assets/images/img2.jpg', title: 'Venta de Equipos', text: 'EPP y equipos de extinci\u00f3n de incendios.', href: '/venta-equipos' },
            { icon: 'bi-water', title: 'Muelles Flotantes', text: 'Armado y desarme de sistemas modulares.', href: '/muelles-flotantes' },
          ].map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="col"
            >
              <div className="service-card p-4 h-100 d-flex flex-column">
                <div className={`${svc.img ? 'bg-light p-4 text-center' : 'bg-light p-4 text-center d-flex align-items-center justify-content-center'}`}
                  style={svc.icon ? { height: 168 } : undefined}>
                  {svc.img ? (
                    <img
                      src={svc.img}
                      className="img-fluid"
                      style={{ height: 120, objectFit: 'cover', borderRadius: 4 }}
                      alt={svc.title}
                    />
                  ) : (
                    <i className={`bi ${svc.icon} display-1 text-secondary`}></i>
                  )}
                </div>
                <div className="card-body">
                  <h5 className="card-title">{svc.title}</h5>
                  <p className="text-muted small">{svc.text}</p>
                  <motion.a
                    whileHover={{ x: 5 }}
                    href={svc.href}
                    className="btn btn-link text-warning text-decoration-none p-0 fw-bold"
                  >
                    VER M&Aacute;S <span className="ms-1">&rarr;</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Parallax Divider */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-dark text-white py-5 mb-5 position-relative overflow-hidden hero-parallax"
        style={{ backgroundImage: 'url(/assets/images/muelle03.jpg)' }}
      >
        <div className="container py-5">
          <h2 className="display-5 fw-bold text-uppercase">
            Infraestructura Mar&iacute;tima
          </h2>
          <p className="lead">Soluciones robustas para entornos exigentes.</p>
        </div>
      </motion.section>

      {/* Info */}
      <motion.section {...fadeUp} className="container py-5">
        <div className="card shadow-sm border-0">
          <div className="card-body p-4">
            <h2 className="text-center mb-4 text-warning fw-bold">
              NM Soluciones Integrales
            </h2>
            <div className="row">
              <div className="col-md-5 mb-4">
                <div className="p-3 bg-light rounded h-100">
                  <h4 className="h5 border-bottom pb-2 mb-3">Informaci&oacute;n General</h4>
                  <p className="mb-1"><strong>Raz&oacute;n Social:</strong></p>
                  <p className="mb-3">NM Soluciones Integrales</p>
                  <p className="mb-1"><strong>Giro Principal:</strong></p>
                  <p className="mb-0">Prevenci&oacute;n de riesgos laborales</p>
                  <hr className="my-3" />
                  <p className="mb-1"><strong>Direcci&oacute;n:</strong></p>
                  <p className="mb-3">Por confirmar</p>
                  <p className="mb-1"><strong>Tel&eacute;fono:</strong></p>
                  <p className="mb-3">
                    <a href="tel:+56990772964" className="text-decoration-none text-dark">+56 9 9077 2964</a>
                  </p>
                  <p className="mb-1"><strong>Correo:</strong></p>
                  <p className="mb-0">
                    <a href="mailto:contacto@nm-soluciones.cl" className="text-decoration-none text-dark">contacto@nm-soluciones.cl</a>
                  </p>
                </div>
              </div>
              <div className="col-md-7">
                <h4 className="h5 border-bottom pb-2 mb-3">Actividades Asociadas</h4>
                <ul className="list-group list-group-flush">
                  {[
                    'Venta de elementos de protecci\u00f3n personal',
                    'Asesor\u00eda en prevenci\u00f3n de riesgos',
                    'Visitas t\u00e9cnicas',
                    'Capacitaci\u00f3n',
                    'Implementaci\u00f3n de sistema de gesti\u00f3n seg\u00fan DS 44',
                    'Armado y desarme de muelle',
                    'Construcci\u00f3n y obras menores',
                    'Paisajista y mantenci\u00f3n de \u00e1reas verdes',
                    'Venta de equipos de extinci\u00f3n del fuego',
                  ].map((act) => (
                    <li key={act} className="list-group-item px-0 py-2 border-0">
                      <i className="bi bi-check2 text-warning me-2"></i>
                      {act}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  )
}
