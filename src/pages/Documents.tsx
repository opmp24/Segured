import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.7, ease: 'easeOut' as const },
}

export default function Documents() {
  return (
    <>
      <section className="container-fluid bg-dark text-white py-5 mb-5 position-relative overflow-hidden hero-parallax text-center">
        <div className="container py-5">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-warning fw-bold text-uppercase">Documentaci&oacute;n</span>
            <h1 className="display-4 fw-bold">Centro de Documentos</h1>
            <p className="lead text-white-50 col-lg-8 mx-auto">
              Acceso a normativas, manuales y procedimientos de seguridad.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="container py-4">
        <motion.section {...fadeUp} className="row g-4">
          <div className="col-lg-4">
            <div className="bg-light p-4 rounded shadow-sm h-100">
              <h5 className="mb-3 border-bottom pb-2">
                <i className="bi bi-folder2-open me-2 text-warning"></i>Archivos Disponibles
              </h5>
              <div className="text-muted small">
                <p className="mb-2">Los documentos se cargan desde Google Drive cuando hay conexi&oacute;n.</p>
                <p className="mb-0 fst-italic">
                  <i className="bi bi-lock-fill me-1"></i>Documentos privados requieren autorizaci&oacute;n administrativa.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-0 position-relative bg-dark rounded overflow-hidden d-flex align-items-center justify-content-center" style={{ minHeight: 600 }}>
                <div className="text-center text-white-50 p-5">
                  <i className="bi bi-file-earmark-text display-1 d-block mb-3"></i>
                  <p>Conecta tu Google Drive para ver documentos.</p>
                  <p className="small">Configura las claves en <code>drive-config.js</code></p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section {...fadeUp} className="mt-5 pt-4">
          <h3 className="mb-4 text-uppercase fw-bold">
            <span className="text-warning">Recursos</span> de Seguridad
          </h3>
          <div className="row g-4">
            {[
              { icon: 'bi-shield-check', title: 'Normativa ISO 45001', text: 'Est\u00e1ndares internacionales para sistemas de gesti\u00f3n de seguridad y salud en el trabajo.' },
              { icon: 'bi-cone-striped', title: 'Protocolos de Emergencia', text: 'Gu\u00edas de actuaci\u00f3n r\u00e1pida ante incidentes, evacuaciones y primeros auxilios en obra.' },
              { icon: 'bi-people-fill', title: 'Capacitaciones', text: 'Material de apoyo para charlas de 5 minutos y formaci\u00f3n continua del personal.' },
            ].map((r, i) => (
              <motion.div
                key={r.title}
                className="col-md-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <div className="info-card text-center p-4 h-100">
                  <i className={`bi ${r.icon} display-4 text-warning mb-3 d-block`}></i>
                  <h4>{r.title}</h4>
                  <p className="text-muted">{r.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </>
  )
}
