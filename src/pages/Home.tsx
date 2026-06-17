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

const overlap = 0.08

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
  },
  {
    tag: 'Capacitación',
    title: 'FORMACIÓN Y',
    titleAccent: 'ASESORÍA ESPECIALIZADA',
    titleEnd: '',
    text: 'Protegemos lo más importante: tu equipo. Con más de 12 años de experiencia en prevención de riesgos laborales.',
    features: [
      { icon: 'bi-shield-check', label: 'Asesoría y Gestión' },
      { icon: 'bi-people-fill', label: 'Venta de Equipamiento' },
      { icon: 'bi-gear-wide-connected', label: 'Servicios y Capacitación' },
    ],
    timeline: ['Contacto', 'Diagnóstico', 'Propuesta', 'Ejecución'],
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
  },
  {
    tag: 'Infraestructura',
    title: 'CONSTRUCCIÓN Y',
    titleAccent: 'MANTENIMIENTO',
    titleEnd: '',
    text: 'Soluciones robustas para entornos exigentes con los más altos estándares de calidad y seguridad.',
    about:
      'Somos tu socio estratégico en la creación de entornos laborales seguros. Desde la asesoría hasta la ejecución de obras, cubrimos cada aspecto de la prevención de riesgos.',
  },
]

function Slide({
  slide,
  range,
  scrollYProgress,
  index,
}: {
  slide: (typeof slides)[0]
  range: [number, number]
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
  index: number
}) {
  const isHero = index === 0
  const enter = 0.04
  const hold = 0.08
  const contentOpacity = useTransform(
    scrollYProgress,
    isHero
      ? [0, hold, hold + 0.12, range[1]]
      : [range[0], range[0] + enter, range[0] + enter + hold, range[1]],
    [1, 1, 0, 0],
  )
  const contentY = useTransform(
    scrollYProgress,
    isHero
      ? [0, hold, hold + 0.12, range[1]]
      : [range[0], range[0] + enter, range[0] + enter + hold, range[1]],
    isHero ? [0, 0, -25, -30] : [50, 0, 0, -30],
  )
  const progressPct = useTransform(scrollYProgress, [range[0], range[1]], ['0%', '100%'])

  const heroWords = `${slide.title} ${slide.titleAccent} ${slide.titleEnd}`.trim().split(' ')

  return (
    <div
      className="position-relative overflow-hidden"
      style={{ height: '100vh', position: 'sticky', top: 0 }}
    >
      <motion.div
        className="position-absolute d-flex align-items-center"
        style={{ inset: 0, zIndex: 2, opacity: contentOpacity, y: contentY }}
      >
        <div className="container">
          <div className="row">
            <div className={isHero ? 'col-lg-10' : 'col-lg-8'}>
              <div
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  padding: isHero ? '2.5rem' : '2rem',
                  backdropFilter: 'blur(2px)',
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
                            <div
                              className="display-6 fw-bold text-warning"
                              style={{ lineHeight: 1 }}
                            >
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

                    {'about' in slide && slide.about && (
                      <>
                        <p
                          className="text-white-50 mb-3 col-lg-10 px-0"
                          style={{ fontSize: '0.95rem', lineHeight: 1.7 }}
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
      </motion.div>

      <motion.div
        className="position-absolute d-none d-md-block"
        style={{
          right: 60,
          top: '50%',
          width: 3,
          height: 100,
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 2,
          zIndex: 3,
          transform: 'translateY(-50%)',
          overflow: 'hidden',
        }}
      >
        <motion.div
          className="position-absolute"
          style={{
            bottom: 0,
            left: 0,
            width: '100%',
            background: '#FFB600',
            borderRadius: 2,
            height: progressPct,
          }}
        />
      </motion.div>

      <motion.div
        className="position-absolute d-none d-md-flex align-items-center justify-content-center"
        style={{
          right: 56,
          top: '50%',
          width: 11,
          height: 11,
          borderRadius: '50%',
          background: '#FFB600',
          zIndex: 4,
          x: '-50%',
          y: '-50%',
        }}
      >
        <span className="fw-bold text-dark" style={{ fontSize: '0.55rem' }}>
          {index + 1}
        </span>
      </motion.div>
    </div>
  )
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 25,
    restDelta: 0.001,
  })
  const len = slides.length

  return (
    <>
      <section ref={containerRef} style={{ height: `${len * 100}vh`, position: 'relative' }}>
        <div
          className="position-fixed overflow-hidden"
          style={{ inset: 0, zIndex: -1, pointerEvents: 'none' }}
        >
          {images.map((src, i) => (
            <BgLayer key={i} src={src} scrollYProgress={smoothProgress} index={i} total={len} />
          ))}
          <div
            className="position-absolute"
            style={{ inset: 0, background: '#000', opacity: 0.35 }}
          />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          {slides.map((slide, i) => {
            const start = i / len
            const end = (i + 1) / len
            return (
              <Slide
                key={slide.tag}
                slide={slide}
                range={[start, end]}
                scrollYProgress={smoothProgress}
                index={i}
              />
            )
          })}
        </div>
      </section>

      <section
        className="position-relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FFB600 0%, #cc9200 100%)' }}
      >
        <div className="container py-5 text-center position-relative" style={{ zIndex: 1 }}>
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
    </>
  )
}
