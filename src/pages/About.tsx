import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.7, ease: 'easeOut' as const },
}

export default function About() {
  return (
    <>
      <section className="container-fluid bg-dark text-white py-5 mb-5 position-relative overflow-hidden hero-parallax text-center">
        <div className="container py-5">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-warning fw-bold text-uppercase">Nuestra Empresa</span>
            <h1 className="display-4 fw-bold">Nuestros Servicios y Enfoque</h1>
            <p className="lead text-white-50 col-lg-8 mx-auto">
              Ofrecemos un abanico completo de servicios orientados a la prevenci&oacute;n de riesgos laborales.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="container py-4">
        <motion.section {...fadeUp} className="py-5 my-4">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img src="/assets/images/img1.jpg" className="img-fluid shadow-lg" alt="Nuestra Misión" />
            </div>
            <div className="col-lg-6 ps-lg-5">
              <h2 className="display-6 fw-bold mb-4">SOLUCIONES A SU MEDIDA</h2>
              <p className="text-muted mb-4">
                Nuestro giro principal es la prevenci&oacute;n de riesgos laborales. Brindamos asesor&iacute;a experta,
                realizamos visitas t&eacute;cnicas y capacitamos a su personal para fomentar una cultura de seguridad.
                Implementamos sistemas de gesti&oacute;n robustos, como el DS 44, para garantizar el cumplimiento normativo.
              </p>
              <p className="text-muted">
                Adem&aacute;s, complementamos nuestra oferta con servicios pr&aacute;cticos que incluyen la venta de
                Elementos de Protecci&oacute;n Personal (EPP) y equipos de extinci&oacute;n, junto con la ejecuci&oacute;n
                de obras menores, construcci&oacute;n, paisajismo y mantenimiento de &aacute;reas verdes.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section {...fadeUp} className="py-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="text-center mb-4 text-warning fw-bold">NM Soluciones Integrales SpA</h2>
              <div className="row">
                <div className="col-md-5 mb-4">
                  <div className="p-3 bg-light rounded h-100">
                    <h4 className="h5 border-bottom pb-2 mb-3">Informaci&oacute;n General</h4>
                    <p className="mb-1"><strong>Raz&oacute;n Social:</strong></p>
                    <p className="mb-3">NM Soluciones Integrales SpA</p>
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

        <motion.section {...fadeUp} className="py-5">
          <div className="text-center mb-5">
            <span className="text-warning fw-bold text-uppercase">Nuestros Valores</span>
            <h2 className="display-5">CULTURA DE SEGURIDAD</h2>
          </div>
          <div className="row g-4 justify-content-center">
            {[
              { title: 'Compromiso', text: 'Nos implicamos a fondo en cada proyecto, entendiendo las necesidades espec\u00edficas de nuestros clientes para ofrecer soluciones a medida.' },
              { title: 'Excelencia', text: 'Buscamos la m\u00e1xima calidad en nuestros servicios, manteni\u00e9ndonos actualizados con las \u00faltimas normativas y tecnolog\u00edas del sector.' },
              { title: 'Innovaci\u00f3n', text: 'Aplicamos m\u00e9todos y herramientas innovadoras para la gesti\u00f3n de riesgos, asegurando auditor\u00edas precisas y formaci\u00f3n efectiva.' },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="col-lg-4 col-md-6"
              >
                <div className="feature-box text-center">
                  <div className="feature-icon mb-3">
                    <i className={`bi ${i === 0 ? 'bi-shield-check' : i === 1 ? 'bi-star' : 'bi-lightbulb'} display-4`}></i>
                  </div>
                  <h4>{v.title}</h4>
                  <p className="text-muted">{v.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </>
  )
}
