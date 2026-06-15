import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.7, ease: 'easeOut' as const },
}

export default function PaisajismoConstruccion() {
  return (
    <>
      <section className="container-fluid bg-dark text-white py-5 mb-5 position-relative overflow-hidden hero-parallax text-center">
        <div className="container py-5">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-warning fw-bold text-uppercase">Construcci&oacute;n y &Aacute;reas Verdes</span>
            <h1 className="display-4 fw-bold">Paisajismo y Obras Menores</h1>
            <p className="lead text-white-50 col-lg-8 mx-auto">
              Servicios de construcci&oacute;n, mantenci&oacute;n de &aacute;reas verdes y mejoras de infraestructura.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="container py-4">
        <motion.div {...fadeUp} className="mb-5 text-center">
          <img src="/assets/images/img1.jpg" className="img-fluid rounded shadow-sm" alt="Paisajismo y Construcción" style={{ maxHeight: 400 }} />
        </motion.div>
        <div className="row g-4">
          <motion.div
            className="col-md-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-header bg-dark text-white fw-bold">Paisajismo y Jardiner&iacute;a</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Recuperaci&oacute;n de &aacute;reas verdes</li>
                <li className="list-group-item">Construcci&oacute;n de &aacute;reas verdes</li>
                <li className="list-group-item">Mantenci&oacute;n de &aacute;reas verdes</li>
              </ul>
            </div>
          </motion.div>
          <motion.div
            className="col-md-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-header bg-dark text-white fw-bold">Obras Menores de Construcci&oacute;n</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Mejoras y construcciones</li>
                <li className="list-group-item">Mantenci&oacute;n de &aacute;reas comunes</li>
                <li className="list-group-item">Instalaciones el&eacute;ctricas</li>
                <li className="list-group-item">Hormig&oacute;n de radier</li>
                <li className="list-group-item">Galpones y estructuras met&aacute;licas</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  )
}
