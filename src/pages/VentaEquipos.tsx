import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.7, ease: 'easeOut' as const },
}

export default function VentaEquipos() {
  return (
    <>
      <section className="container-fluid bg-dark text-white py-5 mb-5 position-relative overflow-hidden hero-parallax text-center">
        <div className="container py-5">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-warning fw-bold text-uppercase">Equipamiento</span>
            <h1 className="display-4 fw-bold">Venta de Equipos</h1>
            <p className="lead text-white-50 col-lg-8 mx-auto">
              Proveemos EPP certificados y equipos de extinci&oacute;n de incendios de alta calidad.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="container py-4">
        <motion.div {...fadeUp} className="mb-5">
          <h3 className="h4 border-bottom pb-2 mb-3">Equipos de extinci&oacute;n del fuego</h3>
          <ul className="list-group list-group-flush shadow-sm">
            <li className="list-group-item">
              <i className="bi bi-fire text-danger me-2"></i>Extintores y similares
            </li>
          </ul>
        </motion.div>

        <motion.div {...fadeUp}>
          <h3 className="h4 border-bottom pb-2 mb-3">Elementos de Protecci&oacute;n Personal (EPP)</h3>
          <div className="row row-cols-1 row-cols-md-2 g-3">
            {[
              { icon: 'bi-hand-index-thumb', label: 'Guantes' },
              { icon: 'bi-person-bounding-box', label: 'Cascos' },
              { icon: 'bi-boot', label: 'Calzado de seguridad' },
              { icon: 'bi-ear', label: 'Protecci\u00f3n auditiva' },
              { icon: 'bi-eye', label: 'Protecci\u00f3n ocular' },
              { icon: 'bi-lungs', label: 'Protecci\u00f3n respiratoria' },
              { icon: 'bi-shield-shaded', label: 'Protecci\u00f3n colectiva' },
              { icon: 'bi-ladder', label: 'Protecci\u00f3n para trabajos en altura' },
            ].map((epp, i) => (
              <motion.div
                key={epp.label}
                className="col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <div className="p-3 bg-light border rounded">
                  <i className={`bi ${epp.icon} me-2`}></i>
                  {epp.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </>
  )
}
