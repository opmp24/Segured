import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.7, ease: 'easeOut' as const },
}

const items = [
  'Capacitaci\u00f3n',
  'Consultor\u00eda',
  'Inspecci\u00f3n t\u00e9cnica',
  'Informes t\u00e9cnicos',
  'Protocolos Minsal',
  'Matriz de riesgos',
  'Procedimientos de trabajo seguro',
  'Pol\u00edtica de seguridad y salud en el trabajo',
  'Programa de gesti\u00f3n preventiva',
  'Charlas de 5 minutos',
  'Gestiones con mutualidades',
  'Excepci\u00f3n o rebajas de multas por fiscalizaci\u00f3n de direcci\u00f3n del trabajo o Seremi de salud',
]

export default function PrevencionRiesgos() {
  return (
    <>
      <section className="container-fluid bg-dark text-white py-5 mb-5 position-relative overflow-hidden hero-parallax text-center">
        <div className="container py-5">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-warning fw-bold text-uppercase">Seguridad Laboral</span>
            <h1 className="display-4 fw-bold">Prevenci&oacute;n de Riesgos</h1>
            <p className="lead text-white-50 col-lg-8 mx-auto">
              Asesor&iacute;a integral, capacitaci&oacute;n y gesti&oacute;n para un entorno de trabajo seguro.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="container py-4">
        <motion.div {...fadeUp} className="row">
          <div className="col-lg-8">
            <ul className="list-group list-group-flush shadow-sm">
              {items.map((item, i) => (
                <motion.li
                  key={item}
                  className="list-group-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <i className="bi bi-check-circle-fill text-warning me-2"></i>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </main>
    </>
  )
}
