import { useState } from 'react'
import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.7, ease: 'easeOut' as const },
}

const images = [
  { src: '/assets/images/img1.jpg', alt: 'Proyecto de seguridad industrial' },
  { src: '/assets/images/img2.jpg', alt: 'Capacitación en terreno' },
  { src: '/assets/images/img5.jpg', alt: 'Auditoría de seguridad' },
  { src: '/assets/images/photo1.jpg', alt: 'Equipo de protección personal' },
  { src: '/assets/images/photo2.jpg', alt: 'Obras menores' },
  { src: '/assets/images/fire-extinguisher.jpg', alt: 'Equipos de extinción' },
  { src: '/assets/images/safety-sign.jpg', alt: 'Señalética de seguridad' },
  { src: '/assets/images/muelle03.jpg', alt: 'Muelles flotantes' },
  { src: '/assets/images/hero-bg.jpg', alt: 'Seguridad laboral en altura' },
]

export default function Gallery() {
  const [modalImg, setModalImg] = useState<string | null>(null)

  return (
    <>
      <section className="container-fluid bg-dark text-white py-5 mb-5 position-relative overflow-hidden hero-parallax text-center">
        <div className="container py-5">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-warning fw-bold text-uppercase">Galer&iacute;a</span>
            <h1 className="display-4 fw-bold">Nuestro Trabajo en Acci&oacute;n</h1>
            <p className="lead text-white-50 col-lg-8 mx-auto">
              Explore nuestro portafolio de proyectos, capacitaciones y auditor&iacute;as de seguridad.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="container py-4">
        <motion.section {...fadeUp} className="py-4">
          <h2 className="display-6 fw-bold mb-4">Im&aacute;genes</h2>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
            {images.map((img, i) => (
              <motion.div
                key={img.src}
                className="col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <a
                  href="#"
                  className="d-block overflow-hidden position-relative"
                  style={{ borderRadius: 0, boxShadow: '0 5px 15px rgba(0,0,0,0.08)', backgroundColor: '#f0f0f0' }}
                  onClick={(e) => { e.preventDefault(); setModalImg(img.src) }}
                  data-type="image"
                >
                  <img
                    src={img.src}
                    className="gallery-item-img"
                    alt={img.alt}
                    style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', cursor: 'pointer', transition: 'transform 0.4s ease' }}
                  />
                </a>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      {modalImg && (
        <div
          className="modal d-block"
          tabIndex={-1}
          style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
          onClick={() => setModalImg(null)}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content bg-transparent border-0">
              <div className="modal-body text-center p-0 position-relative">
                <button
                  type="button"
                  className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
                  style={{ zIndex: 1055, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '50%', padding: '1rem' }}
                  onClick={() => setModalImg(null)}
                ></button>
                <img
                  src={modalImg}
                  className="img-fluid"
                  alt=""
                  style={{ maxHeight: '85vh', maxWidth: '100%', objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
