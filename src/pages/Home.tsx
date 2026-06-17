import { useRef, type MouseEvent } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  type Variants,
} from 'framer-motion'
import Counter from '../components/Counter'

const easeExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

const staggerWord: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.4 } },
}

const wordUp: Variants = {
  hidden: { opacity: 0, y: 60, rotateX: -15 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.7, ease: easeExpo } },
}

function MagneticBtn({
  children,
  className,
  href,
  style,
}: {
  children: React.ReactNode
  className: string
  href: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const onMove = (e: MouseEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    x.set((e.clientX - r.left - r.width / 2) * 0.3)
    y.set((e.clientY - r.top - r.height / 2) * 0.3)
  }
  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x, y, ...style }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  )
}

const images = [
  'https://images.unsplash.com/photo-1567954970774-58d6aa6c50dc?w=1600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1577199001468-44c049e7603f?w=1600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1614127938540-a1139bee1841?w=1600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1628147529780-36964fbb8d54?w=1600&h=1000&fit=crop',
]

const slides = [
  {
    tag: 'NM Soluciones Integrales',
    title: 'SOLUCIONES EN',
    titleAccent: 'PREVENCIÓN DE RIESGOS',
    titleEnd: 'LABORALES',
    text: 'Asesoría experta, capacitación certificada, venta de equipamiento y servicios de construcción para entornos laborales seguros y productivos.',
    ctas: [
      { label: 'CONOCER MÁS', href: '/about' },
      { label: 'CONTACTAR', href: '/contact' },
    ],
    about:
      'Somos tu socio estratégico en la creación de entornos laborales seguros. Nuestro giro principal es la prevención de riesgos laborales, abarcando desde la asesoría hasta la ejecución de obras.',
  },
  {
    tag: 'Prevención de Riesgos',
    title: 'CAPACITACIÓN Y',
    titleAccent: 'GESTIÓN PREVENTIVA',
    titleEnd: '',
    text: 'Protegemos lo más importante: tu equipo. Con más de 12 años de experiencia en prevención de riesgos laborales, implementamos sistemas de gestión y realizamos visitas técnicas para evaluar y mitigar riesgos.',
    features: [
      { icon: 'bi-shield-check', label: 'Asesoría y Gestión' },
      { icon: 'bi-people-fill', label: 'Venta de Equipamiento' },
      { icon: 'bi-gear-wide-connected', label: 'Servicios y Capacitación' },
    ],
    timeline: ['Contacto', 'Diagnóstico', 'Propuesta', 'Ejecución'],
    checklist: [
      'Capacitación',
      'Consultoría',
      'Inspección técnica',
      'Informes técnicos',
      'Protocolos Minsal',
      'Matriz de riesgos',
      'Procedimientos de trabajo seguro',
      'Política de seguridad y salud en el trabajo',
      'Programa de gestión preventiva',
      'Charlas de 5 minutos',
      'Gestiones con mutualidades',
      'Excepción o rebajas de multas por fiscalización',
    ],
  },
  {
    tag: 'Equipamiento',
    title: 'EPP Y EQUIPOS',
    titleAccent: 'CERTIFICADOS',
    titleEnd: '',
    text: 'Proveemos elementos de protección personal y equipos de extinción certificados para toda industria.',
    stats: [
      { value: 150, suffix: '+', label: 'Proyectos' },
      { value: 5000, suffix: '+', label: 'Capacitados' },
      { value: 12, suffix: '+', label: 'Años Exp.' },
      { value: 100, suffix: '%', label: 'Certificado' },
    ],
    services: [
      'Prevención de Riesgos',
      'Paisajismo y Construcción',
      'Venta de Equipos',
      'Muelles Flotantes',
    ],
    eppItems: [
      { icon: 'bi-hand-index-thumb', label: 'Guantes' },
      { icon: 'bi-person-bounding-box', label: 'Cascos' },
      { icon: 'bi-bootstrap', label: 'Calzado de seguridad' },
      { icon: 'bi-ear', label: 'Protección auditiva' },
      { icon: 'bi-eye', label: 'Protección ocular' },
      { icon: 'bi-lungs', label: 'Protección respiratoria' },
      { icon: 'bi-shield-shaded', label: 'Protección colectiva' },
      { icon: 'bi-ladder', label: 'Protección para trabajos en altura' },
    ],
    extincionItems: ['Extintores y similares'],
  },
  {
    tag: 'Infraestructura',
    title: 'PAISAJISMO, OBRAS',
    titleAccent: 'Y MUELLES FLOTANTES',
    titleEnd: '',
    text: 'Soluciones robustas para entornos exigentes con los más altos estándares de calidad y seguridad.',
    about:
      'Somos tu socio estratégico en la creación de entornos laborales seguros. Desde la asesoría hasta la ejecución de obras, cubrimos cada aspecto de la prevención de riesgos.',
    paisajismoItems: [
      'Recuperación de áreas verdes',
      'Construcción de áreas verdes',
      'Mantención de áreas verdes',
    ],
    obrasItems: [
      'Mejoras y construcciones',
      'Mantención de áreas comunes',
      'Instalaciones eléctricas',
      'Hormigón de radier',
      'Galpones y estructuras metálicas',
    ],
    muellesItems: [
      { icon: 'bi-water', name: 'Ez Dock' },
      { icon: 'bi-box-seam', name: 'Pcm Dock' },
      { icon: 'bi-tools', name: 'Ready Dock' },
    ],
    actividades: [
      'Venta de elementos de protección personal',
      'Asesoría en prevención de riesgos',
      'Visitas técnicas',
      'Capacitación',
      'Implementación de sistema de gestión según DS 44',
      'Armado y desarme de muelle',
      'Construcción y obras menores',
      'Paisajista y mantención de áreas verdes',
      'Venta de equipos de extinción del fuego',
    ],
  },
]

function BgLayer({
  src,
  scrollYProgress,
  index,
  total,
}: {
  src: string
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
  index: number
  total: number
}) {
  const seg = 1 / total
  const overlap = 0.08
  const inMin = Math.max(0, index * seg - overlap)
  const inMax = index * seg
  const outMin = (index + 1) * seg
  const outMax = Math.min(1, (index + 1) * seg + overlap)

  const opacity = useTransform(
    scrollYProgress,
    [inMin, inMax, outMin, outMax],
    [index === 0 ? 1 : 0, 1, 1, index === total - 1 ? 1 : 0],
  )
  const y = useTransform(scrollYProgress, [inMax, outMin], ['0%', '-8%'])

  return (
    <motion.div
      className="position-absolute"
      style={{
        inset: '-8%',
        backgroundImage: `url(${src})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        filter: 'blur(3px)',
        opacity,
        y,
      }}
    />
  )
}

function SlideContent({ slide, index }: { slide: (typeof slides)[0]; index: number }) {
  const isHero = index === 0
  const heroWords = `${slide.title} ${slide.titleAccent} ${slide.titleEnd}`.trim().split(' ')

  return (
    <div className="container-fluid px-4">
      <div className="row">
        <div className={isHero ? 'col-lg-12' : 'col-12'}>
          <div
            style={{
              background: 'rgba(255,255,255,0.1)',
              padding: isHero ? '2.5rem' : '2rem',
              backdropFilter: 'blur(2px)',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
            }}
          >
            {isHero && index === 0 && (
              <motion.svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFB600"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: easeExpo }}
                className="mb-3"
                style={{ filter: 'drop-shadow(0 0 20px rgba(255,182,0,0.3))' }}
              >
                <motion.path
                  d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: easeExpo }}
                />
                <motion.path
                  d="M9 12l2 2 4-4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease: easeExpo, delay: 0.8 }}
                />
              </motion.svg>
            )}

            {isHero ? (
              <>
                <span
                  className="text-warning fw-bold text-uppercase d-inline-block mb-3"
                  style={{ letterSpacing: '3px', fontSize: '0.8rem' }}
                >
                  {slide.tag}
                </span>
                <motion.div variants={staggerWord} initial="hidden" animate="visible">
                  <h1
                    className="display-3 fw-bold text-white mb-0"
                    style={{ lineHeight: 1.1, letterSpacing: '-0.03em', overflow: 'hidden' }}
                  >
                    {heroWords.map((w, i) => (
                      <motion.span
                        key={i}
                        variants={wordUp}
                        className="d-inline-block me-3"
                        style={{ color: w === slide.titleAccent ? '#FFB600' : undefined }}
                      >
                        {w}
                      </motion.span>
                    ))}
                  </h1>
                </motion.div>
                <motion.p
                  className="lead text-white-50 mb-4 col-lg-9 px-0 mt-4"
                  style={{ fontSize: '1.1rem', lineHeight: 1.8 }}
                  initial={{ opacity: 0, filter: 'blur(8px)', y: 15 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                  transition={{ duration: 0.8, ease: easeExpo, delay: 1.4 }}
                >
                  {slide.text}
                </motion.p>
                <motion.div
                  className="d-flex gap-3 flex-wrap"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: easeExpo, delay: 1.8 }}
                >
                  <MagneticBtn
                    href="/about"
                    className="btn btn-warning btn-lg px-5 py-3"
                    style={{ borderRadius: 0, fontWeight: 700, letterSpacing: '1.5px' }}
                  >
                    CONOCER MÁS
                  </MagneticBtn>
                  <MagneticBtn
                    href="/contact"
                    className="btn btn-outline-light btn-lg px-5 py-3"
                    style={{ borderRadius: 0, fontWeight: 700, letterSpacing: '1.5px' }}
                  >
                    CONTACTAR
                  </MagneticBtn>
                </motion.div>
              </>
            ) : (
              <>
                <span
                  className="d-inline-block fw-bold text-uppercase mb-3 px-3 py-1"
                  style={{
                    background: 'rgba(255,182,0,0.15)',
                    color: '#FFB600',
                    fontSize: '0.75rem',
                    letterSpacing: '3px',
                  }}
                >
                  {slide.tag}
                </span>
                <h2
                  className="display-4 fw-bold text-white mb-3"
                  style={{ lineHeight: 1.1, letterSpacing: '-0.03em' }}
                >
                  {slide.title} <span className="text-warning">{slide.titleAccent}</span>
                  {slide.titleEnd && <> {slide.titleEnd}</>}
                </h2>
                <p
                  className="lead text-white-50 mb-4 col-lg-9 px-0"
                  style={{ fontSize: '1rem', lineHeight: 1.7 }}
                >
                  {slide.text}
                </p>

                {'features' in slide && slide.features && (
                  <div className="d-flex flex-wrap gap-3 mb-4">
                    {slide.features.map((f) => (
                      <div
                        key={f.label}
                        className="d-flex align-items-center gap-2 px-3 py-2"
                        style={{ background: 'rgba(255,255,255,0.06)' }}
                      >
                        <i className={`bi ${f.icon} text-warning`}></i>
                        <span className="text-white small fw-semibold">{f.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {'timeline' in slide && slide.timeline && (
                  <div className="d-flex align-items-center gap-0 flex-wrap">
                    {slide.timeline.map((step, i) => (
                      <div key={step} className="d-flex align-items-center">
                        <div className="d-flex align-items-center gap-2 px-3 py-2">
                          <span className="fw-bold text-warning" style={{ fontSize: '0.8rem' }}>
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="text-white-50 small">{step}</span>
                        </div>
                        {i < slide.timeline!.length - 1 && (
                          <span className="text-warning" style={{ opacity: 0.3 }}>
                            —
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {'stats' in slide && slide.stats && (
                  <div className="d-flex flex-wrap gap-4 mb-3">
                    {slide.stats.map((s) => (
                      <div key={s.label} className="text-center">
                        <div className="display-6 fw-bold text-warning" style={{ lineHeight: 1 }}>
                          <Counter value={s.value} suffix={s.suffix} />
                        </div>
                        <div
                          className="text-uppercase text-white-50"
                          style={{ fontSize: '0.6rem', letterSpacing: '1.5px' }}
                        >
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {'services' in slide && slide.services && (
                  <div className="d-flex flex-wrap gap-2">
                    {slide.services.map((svc, i) => (
                      <span
                        key={svc}
                        className="px-3 py-1 small"
                        style={{
                          background: `rgba(255,182,0,${0.06 + i * 0.03})`,
                          border: '1px solid rgba(255,182,0,0.15)',
                          color: '#fff',
                          letterSpacing: '0.5px',
                        }}
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                )}

                {'checklist' in slide && slide.checklist && (
                  <div className="mb-3">
                    <h6
                      className="text-warning fw-bold mb-2"
                      style={{ fontSize: '0.85rem', letterSpacing: '1px' }}
                    >
                      SERVICIOS ESPECIALIZADOS
                    </h6>
                    <div className="row row-cols-1 row-cols-sm-2 g-1">
                      {slide.checklist.map((item) => (
                        <div key={item} className="col">
                          <div className="d-flex align-items-center gap-2 py-1">
                            <i
                              className="bi bi-check-circle-fill text-warning"
                              style={{ fontSize: '0.7rem' }}
                            ></i>
                            <span className="text-white-50 small">{item}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {'eppItems' in slide && slide.eppItems && (
                  <div className="mb-3">
                    <h6
                      className="text-warning fw-bold mb-2"
                      style={{ fontSize: '0.85rem', letterSpacing: '1px' }}
                    >
                      ELEMENTOS DE PROTECCIÓN PERSONAL (EPP)
                    </h6>
                    <div className="row row-cols-2 row-cols-sm-4 g-2">
                      {slide.eppItems.map((item) => (
                        <div key={item.label} className="col">
                          <div
                            className="p-2 text-center"
                            style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}
                          >
                            <i
                              className={`bi ${item.icon} text-warning d-block mb-1`}
                              style={{ fontSize: '1.2rem' }}
                            ></i>
                            <span className="text-white-50" style={{ fontSize: '0.7rem' }}>
                              {item.label}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {'extincionItems' in slide && slide.extincionItems && (
                  <div className="mb-3">
                    <h6
                      className="text-warning fw-bold mb-2"
                      style={{ fontSize: '0.85rem', letterSpacing: '1px' }}
                    >
                      EQUIPOS DE EXTINCIÓN
                    </h6>
                    <div className="d-flex flex-wrap gap-2">
                      {slide.extincionItems.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 small"
                          style={{
                            background: 'rgba(255,182,0,0.1)',
                            border: '1px solid rgba(255,182,0,0.2)',
                            color: '#fff',
                          }}
                        >
                          <i className="bi bi-fire text-danger me-1"></i>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {'paisajismoItems' in slide && slide.paisajismoItems && (
                  <div className="mb-3">
                    <h6
                      className="text-warning fw-bold mb-2"
                      style={{ fontSize: '0.85rem', letterSpacing: '1px' }}
                    >
                      PAISAJISMO Y JARDINERÍA
                    </h6>
                    <div className="d-flex flex-wrap gap-2">
                      {slide.paisajismoItems.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 small"
                          style={{
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: '#fff',
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {'obrasItems' in slide && slide.obrasItems && (
                  <div className="mb-3">
                    <h6
                      className="text-warning fw-bold mb-2"
                      style={{ fontSize: '0.85rem', letterSpacing: '1px' }}
                    >
                      OBRAS MENORES DE CONSTRUCCIÓN
                    </h6>
                    <div className="d-flex flex-wrap gap-2">
                      {slide.obrasItems.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 small"
                          style={{
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: '#fff',
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {'muellesItems' in slide && slide.muellesItems && (
                  <div className="mb-3">
                    <h6
                      className="text-warning fw-bold mb-2"
                      style={{ fontSize: '0.85rem', letterSpacing: '1px' }}
                    >
                      MUELLES FLOTANTES
                    </h6>
                    <div className="d-flex flex-wrap gap-3">
                      {slide.muellesItems.map((item) => (
                        <div
                          key={item.name}
                          className="d-flex align-items-center gap-2 px-3 py-2"
                          style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '8px' }}
                        >
                          <i className={`bi ${item.icon} text-warning`}></i>
                          <span className="text-white small fw-semibold">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {'actividades' in slide && slide.actividades && (
                  <div className="mb-3">
                    <h6
                      className="text-warning fw-bold mb-2"
                      style={{ fontSize: '0.85rem', letterSpacing: '1px' }}
                    >
                      ACTIVIDADES ASOCIADAS
                    </h6>
                    <div className="row row-cols-1 row-cols-sm-2 g-1">
                      {slide.actividades.map((item) => (
                        <div key={item} className="col">
                          <div className="d-flex align-items-center gap-2 py-1">
                            <i
                              className="bi bi-check2 text-warning"
                              style={{ fontSize: '0.8rem' }}
                            ></i>
                            <span className="text-white-50 small">{item}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {'about' in slide && slide.about && (
                  <>
                    <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                    <p
                      className="text-white-50 mb-3 col-lg-10 px-0"
                      style={{ fontSize: '0.9rem', lineHeight: 1.7 }}
                    >
                      {slide.about}
                    </p>
                    <a
                      href="/about"
                      className="btn btn-outline-light btn-sm px-4"
                      style={{
                        borderRadius: 0,
                        fontWeight: 600,
                        letterSpacing: '1.5px',
                        fontSize: '0.8rem',
                      }}
                    >
                      CONOCER MÁS →
                    </a>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProgressDot({ index }: { index: number }) {
  return (
    <div
      className="d-none d-md-flex align-items-center justify-content-center"
      style={{
        position: 'absolute',
        right: 56,
        top: '50%',
        width: 11,
        height: 11,
        borderRadius: '50%',
        background: '#FFB600',
        zIndex: 4,
        transform: 'translateY(-50%)',
      }}
    >
      <span className="fw-bold text-dark" style={{ fontSize: '0.55rem' }}>
        {index + 1}
      </span>
    </div>
  )
}

export default function Home() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 25,
    restDelta: 0.001,
  })

  return (
    <div ref={wrapperRef}>
      {/* Background fijo con crossfade */}
      <div
        className="position-fixed overflow-hidden"
        style={{ inset: 0, zIndex: -1, pointerEvents: 'none' }}
      >
        {images.map((src, i) => (
          <BgLayer
            key={i}
            src={src}
            scrollYProgress={smoothProgress}
            index={i}
            total={slides.length}
          />
        ))}
        <div
          className="position-absolute"
          style={{ inset: 0, background: '#000', opacity: 0.35 }}
        />
      </div>

      {/* Hero — pantalla completa */}
      <section
        className="d-flex align-items-center"
        style={{ height: '100vh', position: 'relative', zIndex: 1 }}
      >
        <SlideContent slide={slides[0]} index={0} />
      </section>

      {/* Tarjetas de servicio — cada una es un "track" sticky individual */}
      {slides.slice(1).map((slide, i) => (
        <section
          key={slide.tag}
          className="d-flex align-items-center"
          style={{
            height: '200vh',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: '100%',
              position: 'sticky',
              top: '20vh',
              zIndex: 1,
            }}
          >
            <SlideContent slide={slide} index={i + 1} />
          </div>
          <ProgressDot index={i + 1} />
        </section>
      ))}

      {/* Contacto */}
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
              Contáctanos hoy y descubre cómo podemos ayudarte a crear un entorno laboral más seguro
              y productivo para tu equipo.
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
              {[
                { icon: 'bi-envelope-fill', text: 'contacto@nm-soluciones.cl' },
                { icon: 'bi-telephone-fill', text: '+56 9 9077 2964' },
                { icon: 'bi-geo-alt-fill', text: 'Chile' },
              ].map((item, i) => (
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
    </div>
  )
}
