import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { fetchSucursalesTxt, fetchEmail, fetchPhone } from '../services/drive'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.7, ease: 'easeOut' as const },
}

export default function Contact() {
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const mapRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    fetchSucursalesTxt().then((a) => {
      if (a) {
        setAddress(a)
        if (mapRef.current) {
          mapRef.current.src = `https://maps.google.com/maps?q=${encodeURIComponent(a)}&t=&z=15&ie=UTF8&iwloc=&output=embed`
        }
      }
    })
    fetchEmail().then((e) => {
      if (e) setEmail(e)
    })
    fetchPhone().then((p) => {
      if (p) setPhone(p)
    })
  }, [])

  return (
    <>
      <section className="container-fluid bg-dark text-white py-5 mb-5 position-relative overflow-hidden hero-parallax text-center">
        <div className="container py-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-warning fw-bold text-uppercase">Contacto</span>
            <h1 className="display-4 fw-bold">P&oacute;ngase en Contacto</h1>
            <p className="lead text-white-50 col-lg-8 mx-auto">
              Estamos aqu&iacute; para ayudarle. Env&iacute;enos sus consultas y nos pondremos en
              contacto a la brevedad.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="container py-4">
        <motion.div {...fadeUp} className="row justify-content-center mb-5">
          <div className="col-lg-10">
            <div className="card shadow border-0 overflow-hidden rounded-0">
              <div className="row g-0">
                <div className="col-md-5 bg-dark text-white p-4 p-md-5 d-flex flex-column">
                  <h3 className="fw-bold mb-4">Informaci&oacute;n de contacto</h3>
                  <p className="mb-4 text-white-50">
                    Estamos disponibles para responder tus dudas sobre seguridad laboral.
                  </p>
                  <div className="d-flex mb-3">
                    <div className="me-3 text-warning">
                      <i className="bi bi-geo-alt-fill fs-4"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0">Direcci&oacute;n</h6>
                      <small className="text-white-50">{address || 'Cargando...'}</small>
                    </div>
                  </div>
                  <div className="d-flex mb-3">
                    <div className="me-3 text-warning">
                      <i className="bi bi-envelope-fill fs-4"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0">Email</h6>
                      <a
                        href={`mailto:${email || 'contacto@nm-soluciones.cl'}`}
                        className="small text-white-50 text-decoration-none"
                      >
                        {email || 'contacto@nm-soluciones.cl'}
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
                        href={`tel:${phone || '+56990772964'}`}
                        className="small text-white-50 text-decoration-none"
                      >
                        {phone || '+56 9 9077 2964'}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-7 p-4 p-md-5 bg-white">
                  <h2 className="fw-bold mb-4">Env&iacute;anos un mensaje</h2>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            placeholder="Nombre"
                            required
                          />
                          <label htmlFor="nombre">Nombre</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Email"
                            required
                          />
                          <label htmlFor="email">Email</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="asunto"
                            placeholder="Asunto"
                            required
                          />
                          <label htmlFor="asunto">Asunto</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating">
                          <textarea
                            className="form-control"
                            placeholder="Mensaje"
                            id="mensaje"
                            style={{ height: 150 }}
                            required
                          ></textarea>
                          <label htmlFor="mensaje">Mensaje</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <button className="btn btn-dark w-100 py-3 fw-bold" type="submit">
                          Enviar Mensaje
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div {...fadeUp} className="row justify-content-center mt-5">
          <div className="col-lg-10">
            <div className="ratio ratio-21x9 shadow rounded-0 overflow-hidden">
              <iframe
                ref={mapRef}
                title="Ubicación"
                style={{ border: 0 }}
                src="https://maps.google.com/maps?q=Chile&t=&z=5&ie=UTF8&output=embed"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  )
}
