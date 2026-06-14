export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark text-white py-5 mb-5 position-relative overflow-hidden hero-parallax">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 py-5 position-relative" style={{ zIndex: 2 }}>
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
                <a className="btn btn-warning btn-lg" href="/about">
                  CONOCER M&Aacute;S
                </a>
                <a className="btn btn-outline-light btn-lg rounded-0" href="/contact">
                  CONTACTAR
                </a>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block position-relative"></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container features-overlap">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="feature-box text-center">
              <div className="feature-icon">
                <i className="bi bi-shield-check"></i>
              </div>
              <h4>Asesor&iacute;a y Gesti&oacute;n</h4>
              <p className="text-muted">
                Implementamos sistemas de gesti&oacute;n (DS 44) y realizamos visitas t&eacute;cnicas
                para evaluar y mitigar riesgos.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-box text-center">
              <div className="feature-icon">
                <i className="bi bi-people-fill"></i>
              </div>
              <h4>Venta de Equipamiento</h4>
              <p className="text-muted">
                Proveemos Elementos de Protecci&oacute;n Personal (EPP) y equipos de extinci&oacute;n
                de fuego certificados.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="feature-box text-center">
              <div className="feature-icon">
                <i className="bi bi-gear-wide-connected"></i>
              </div>
              <h4>Servicios y Capacitaci&oacute;n</h4>
              <p className="text-muted">
                Ofrecemos capacitaci&oacute;n especializada, obras menores, paisajismo y
                mantenimiento de &aacute;reas verdes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="container py-5 my-5">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <img
              src="/assets/images/img1.svg"
              className="img-fluid shadow-lg"
              alt="Sobre Nosotros"
            />
          </div>
          <div className="col-lg-6 ps-lg-5">
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
            <a href="/about" className="btn btn-dark">
              CONOCER M&Aacute;S!
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-dark text-white py-5">
        <div className="container py-4">
          <div className="row text-center g-4">
            <div className="col-md-3">
              <div className="bg-dark p-4 h-100 d-flex flex-column justify-content-center">
                <div className="display-4 fw-bold text-warning">150+</div>
                <div className="text-uppercase small letter-spacing-1">Proyectos</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-dark p-4 h-100 d-flex flex-column justify-content-center">
                <div className="display-4 fw-bold text-warning">5000+</div>
                <div className="text-uppercase small letter-spacing-1">Capacitados</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-dark p-4 h-100 d-flex flex-column justify-content-center">
                <div className="display-4 fw-bold text-warning">12</div>
                <div className="text-uppercase small letter-spacing-1">A&ntilde;os Exp.</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-dark p-4 h-100 d-flex flex-column justify-content-center">
                <div className="display-4 fw-bold text-warning">100%</div>
                <div className="text-uppercase small letter-spacing-1">Certificado</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container py-5 mb-5">
        <div className="text-center mb-5">
          <span className="text-warning fw-bold text-uppercase">Nuestros Servicios</span>
          <h2 className="display-5">SOLUCIONES INTEGRALES</h2>
        </div>
        <div className="row row-cols-1 row-cols-md-4 g-3">
          <div className="col">
            <div className="service-card p-4 h-100 d-flex flex-column">
              <div className="bg-light p-4 text-center">
                <img
                  src="/assets/images/img5.svg"
                  className="img-fluid"
                  style={{ height: 120, objectFit: 'contain' }}
                  alt="Prevenci&oacute;n"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Prevenci&oacute;n de Riesgos</h5>
                <p className="text-muted small">
                  Asesor&iacute;a, capacitaci&oacute;n y gesti&oacute;n de seguridad.
                </p>
                <a
                  href="/prevencion-riesgos"
                  className="btn btn-link text-warning text-decoration-none p-0 fw-bold"
                >
                  VER M&Aacute;S <span className="ms-1">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="service-card p-4 h-100 d-flex flex-column">
              <div className="bg-light p-4 text-center">
                <img
                  src="/assets/images/img1.svg"
                  className="img-fluid"
                  style={{ height: 120, objectFit: 'contain' }}
                  alt="Paisajismo"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Paisajismo y Construcci&oacute;n</h5>
                <p className="text-muted small">
                  Obras menores y mantenci&oacute;n de &aacute;reas verdes.
                </p>
                <a
                  href="/paisajismo-construccion"
                  className="btn btn-link text-warning text-decoration-none p-0 fw-bold"
                >
                  VER M&Aacute;S <span className="ms-1">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="service-card p-4 h-100 d-flex flex-column">
              <div className="bg-light p-4 text-center">
                <img
                  src="/assets/images/img2.svg"
                  className="img-fluid"
                  style={{ height: 120, objectFit: 'contain' }}
                  alt="Equipos"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Venta de Equipos</h5>
                <p className="text-muted small">EPP y equipos de extinci&oacute;n de incendios.</p>
                <a
                  href="/venta-equipos"
                  className="btn btn-link text-warning text-decoration-none p-0 fw-bold"
                >
                  VER M&Aacute;S <span className="ms-1">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="service-card p-4 h-100 d-flex flex-column">
              <div className="bg-light p-4 text-center d-flex align-items-center justify-content-center">
                <i className="bi bi-water display-1 text-secondary"></i>
              </div>
              <div className="card-body">
                <h5 className="card-title">Muelles Flotantes</h5>
                <p className="text-muted small">
                  Armado y desarme de sistemas modulares.
                </p>
                <a
                  href="/muelles-flotantes"
                  className="btn btn-link text-warning text-decoration-none p-0 fw-bold"
                >
                  VER M&Aacute;S <span className="ms-1">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Divider */}
      <section
        className="bg-dark text-white py-5 mb-5 position-relative overflow-hidden hero-parallax"
        style={{ backgroundImage: 'url(/assets/images/muelle03.jpeg)' }}
      >
        <div className="container py-5">
          <h2 className="display-5 fw-bold text-uppercase">
            Infraestructura Mar&iacute;tima
          </h2>
          <p className="lead">Soluciones robustas para entornos exigentes.</p>
        </div>
      </section>

      {/* Info */}
      <section className="container py-5">
        <div className="card shadow-sm border-0">
          <div className="card-body p-4">
            <h2 className="text-center mb-4 text-warning fw-bold">
              NM Soluciones Integrales
            </h2>
            <div className="row">
              <div className="col-md-5 mb-4">
                <div className="p-3 bg-light rounded h-100">
                  <h4 className="h5 border-bottom pb-2 mb-3">Informaci&oacute;n General</h4>
                  <p className="mb-1">
                    <strong>Raz&oacute;n Social:</strong>
                  </p>
                  <p className="mb-3">NM Soluciones Integrales</p>
                  <p className="mb-1">
                    <strong>Giro Principal:</strong>
                  </p>
                  <p className="mb-0">Prevenci&oacute;n de riesgos laborales</p>
                  <hr className="my-3" />
                  <p className="mb-1">
                    <strong>Direcci&oacute;n:</strong>
                  </p>
                  <p className="mb-3">Por confirmar</p>
                  <p className="mb-1">
                    <strong>Tel&eacute;fono:</strong>
                  </p>
                  <p className="mb-3">
                    <a href="tel:+56990772964" className="text-decoration-none text-dark">
                      +56 9 9077 2964
                    </a>
                  </p>
                  <p className="mb-1">
                    <strong>Correo:</strong>
                  </p>
                  <p className="mb-0">
                    <a
                      href="mailto:contacto@nm-soluciones.cl"
                      className="text-decoration-none text-dark"
                    >
                      contacto@nm-soluciones.cl
                    </a>
                  </p>
                </div>
              </div>
              <div className="col-md-7">
                <h4 className="h5 border-bottom pb-2 mb-3">Actividades Asociadas</h4>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item px-0 py-2 border-0">
                    <i className="bi bi-check2 text-warning me-2"></i>
                    Venta de elementos de protecci&oacute;n personal
                  </li>
                  <li className="list-group-item px-0 py-2 border-0">
                    <i className="bi bi-check2 text-warning me-2"></i>
                    Asesor&iacute;a en prevenci&oacute;n de riesgos
                  </li>
                  <li className="list-group-item px-0 py-2 border-0">
                    <i className="bi bi-check2 text-warning me-2"></i>
                    Visitas t&eacute;cnicas
                  </li>
                  <li className="list-group-item px-0 py-2 border-0">
                    <i className="bi bi-check2 text-warning me-2"></i>
                    Capacitaci&oacute;n
                  </li>
                  <li className="list-group-item px-0 py-2 border-0">
                    <i className="bi bi-check2 text-warning me-2"></i>
                    Implementaci&oacute;n de sistema de gesti&oacute;n seg&uacute;n DS 44
                  </li>
                  <li className="list-group-item px-0 py-2 border-0">
                    <i className="bi bi-check2 text-warning me-2"></i>
                    Armado y desarme de muelle
                  </li>
                  <li className="list-group-item px-0 py-2 border-0">
                    <i className="bi bi-check2 text-warning me-2"></i>
                    Construcci&oacute;n y obras menores
                  </li>
                  <li className="list-group-item px-0 py-2 border-0">
                    <i className="bi bi-check2 text-warning me-2"></i>
                    Paisajista y mantenci&oacute;n de &aacute;reas verdes
                  </li>
                  <li className="list-group-item px-0 py-2 border-0">
                    <i className="bi bi-check2 text-warning me-2"></i>
                    Venta de equipos de extinci&oacute;n del fuego
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
