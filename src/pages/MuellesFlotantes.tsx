import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.7, ease: 'easeOut' as const },
}

export default function MuellesFlotantes() {
  return (
    <>
      <section className="container-fluid bg-dark text-white py-5 mb-5 position-relative overflow-hidden hero-parallax text-center">
        <div className="container py-5">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-warning fw-bold text-uppercase">Servicios Mar&iacute;timos</span>
            <h1 className="display-4 fw-bold">Muelles Flotantes</h1>
            <p className="lead text-white-50 col-lg-8 mx-auto">
              Soluciones modulares para armado y desarme de infraestructura mar&iacute;tima.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="container py-4">
        <motion.p {...fadeUp} className="lead mb-5 text-center">
          Servicio especializado de armado y desarme de sistemas de muelles modulares.
        </motion.p>
        <div className="row g-4">
          {[
            { icon: 'bi-water', title: 'Ez Dock' },
            { icon: 'bi-box-seam', title: 'Pcm Dock' },
            { icon: 'bi-tools', title: 'Ready Dock' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="col-md-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <div className="card h-100 text-center p-4 border-0 shadow-sm">
                <div className="display-1 text-warning mb-3">
                  <i className={`bi ${item.icon}`}></i>
                </div>
                <h3 className="h5 fw-bold">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </>
  )
}
