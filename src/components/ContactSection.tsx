import { motion } from 'framer-motion'

const easeExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

const contactInfo = [
  { icon: 'bi-envelope-fill', text: 'contacto@nm-soluciones.cl' },
  { icon: 'bi-telephone-fill', text: '+56 9 9077 2964' },
  { icon: 'bi-geo-alt-fill', text: 'Chile' },
]

export default function ContactSection() {
  return (
    <section
      className="position-relative overflow-hidden d-flex align-items-center"
      style={{
        background: 'linear-gradient(135deg, #FFB600 0%, #cc9200 100%)',
        minHeight: '60vh',
        zIndex: 1,
      }}
    >
      <div className="container py-5 text-center position-relative w-100" style={{ zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easeExpo }}
        >
          <span
            className="fw-bold text-uppercase d-inline-block mb-3 text-dark"
            style={{ letterSpacing: '3px', fontSize: '0.8rem', opacity: 0.7 }}
          >
            Contacto
          </span>
          <h2 className="display-5 fw-bold text-dark mb-3" style={{ letterSpacing: '-0.02em' }}>
            ¿LISTO PARA COMENZAR?
          </h2>
          <p
            className="lead mb-4 col-lg-6 mx-auto text-dark"
            style={{ lineHeight: 1.8, opacity: 0.8 }}
          >
            Contáctanos hoy y descubre cómo podemos ayudarte a crear un entorno laboral más seguro y
            productivo para tu equipo.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap mb-4">
            <motion.a
              href="/contact"
              className="btn btn-dark btn-lg px-5 py-3"
              style={{ borderRadius: 0, fontWeight: 700, letterSpacing: '1.5px' }}
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.96 }}
            >
              CONTÁCTANOS
            </motion.a>
            <motion.a
              href="tel:+56990772964"
              className="btn btn-outline-dark btn-lg px-5 py-3"
              style={{ borderRadius: 0, fontWeight: 700, letterSpacing: '1.5px' }}
              whileHover={{
                scale: 1.04,
                backgroundColor: '#111',
                color: '#fff',
                borderColor: '#111',
              }}
              whileTap={{ scale: 0.96 }}
            >
              LLÁMANOS
            </motion.a>
          </div>
          <div className="d-flex justify-content-center gap-4 flex-wrap">
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.icon}
                className="d-flex align-items-center gap-2 text-dark"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: easeExpo, delay: 0.3 + i * 0.1 }}
              >
                <motion.i
                  className={`bi ${item.icon}`}
                  style={{ fontSize: '1rem' }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.5,
                  }}
                />
                <span className="small fw-semibold">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
