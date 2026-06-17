import { motion, type Variants } from 'framer-motion'
import Counter from './Counter'
import MagneticBtn from './MagneticBtn'
import type { Slide, Feature, Stat, EppItem, MuellesItem } from '../data/slides'

const easeExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

const staggerWord: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.4 } },
}

const wordUp: Variants = {
  hidden: { opacity: 0, y: 60, rotateX: -15 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.7, ease: easeExpo } },
}

const cardStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.1)',
  backdropFilter: 'blur(2px)',
  borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.12)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
}

const sectionTitle: React.CSSProperties = {
  fontSize: '0.85rem',
  letterSpacing: '1px',
  fontWeight: 700,
  color: '#FFB600',
  marginBottom: '0.5rem',
}

function HeroSection({ slide }: { slide: Slide }) {
  const heroWords = `${slide.title} ${slide.titleAccent} ${slide.titleEnd}`.trim().split(' ')

  return (
    <div className="container-fluid px-4">
      <div className="row">
        <div className="col-lg-12">
          <div style={{ ...cardStyle, padding: '2.5rem' }}>
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

            {slide.about && (
              <>
                <hr style={{ borderColor: 'rgba(255,255,255,0.1)', marginTop: '2rem' }} />
                <p
                  className="text-white-50 mb-0 col-lg-10 px-0"
                  style={{ fontSize: '0.9rem', lineHeight: 1.7 }}
                >
                  {slide.about}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function FeaturesList({ features }: { features: Feature[] }) {
  return (
    <div className="d-flex flex-wrap gap-3 mb-4">
      {features.map((f) => (
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
  )
}

function Timeline({ steps }: { steps: string[] }) {
  return (
    <div className="d-flex align-items-center gap-0 flex-wrap">
      {steps.map((step, i) => (
        <div key={step} className="d-flex align-items-center">
          <div className="d-flex align-items-center gap-2 px-3 py-2">
            <span className="fw-bold text-warning" style={{ fontSize: '0.8rem' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="text-white-50 small">{step}</span>
          </div>
          {i < steps.length - 1 && (
            <span className="text-warning" style={{ opacity: 0.3 }}>
              —
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

function StatsGrid({ stats }: { stats: Stat[] }) {
  return (
    <div className="d-flex flex-wrap gap-4 mb-3">
      {stats.map((s) => (
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
  )
}

function ServiceTags({ services }: { services: string[] }) {
  return (
    <div className="d-flex flex-wrap gap-2">
      {services.map((svc, i) => (
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
  )
}

function Checklist({ items }: { items: string[] }) {
  return (
    <div className="mb-3">
      <h6 style={sectionTitle}>SERVICIOS ESPECIALIZADOS</h6>
      <div className="row row-cols-1 row-cols-sm-2 g-1">
        {items.map((item) => (
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
  )
}

function EppGrid({ items }: { items: EppItem[] }) {
  return (
    <div className="mb-3">
      <h6 style={sectionTitle}>ELEMENTOS DE PROTECCIÓN PERSONAL (EPP)</h6>
      <div className="row row-cols-2 row-cols-sm-4 g-2">
        {items.map((item) => (
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
  )
}

function ExtincionList({ items }: { items: string[] }) {
  return (
    <div className="mb-3">
      <h6 style={sectionTitle}>EQUIPOS DE EXTINCIÓN</h6>
      <div className="d-flex flex-wrap gap-2">
        {items.map((item) => (
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
  )
}

function TextTags({ items }: { items: string[] }) {
  return (
    <div className="d-flex flex-wrap gap-2">
      {items.map((item) => (
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
  )
}

function MuellesGrid({ items }: { items: MuellesItem[] }) {
  return (
    <div className="mb-3">
      <h6 style={sectionTitle}>MUELLES FLOTANTES</h6>
      <div className="d-flex flex-wrap gap-3">
        {items.map((item) => (
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
  )
}

function ActividadesList({ items }: { items: string[] }) {
  return (
    <div className="mb-3">
      <h6 style={sectionTitle}>ACTIVIDADES ASOCIADAS</h6>
      <div className="row row-cols-1 row-cols-sm-2 g-1">
        {items.map((item) => (
          <div key={item} className="col">
            <div className="d-flex align-items-center gap-2 py-1">
              <i className="bi bi-check2 text-warning" style={{ fontSize: '0.8rem' }}></i>
              <span className="text-white-50 small">{item}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AboutSection({ about }: { about: string }) {
  return (
    <>
      <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
      <p
        className="text-white-50 mb-3 col-lg-10 px-0"
        style={{ fontSize: '0.9rem', lineHeight: 1.7 }}
      >
        {about}
      </p>
      <a
        href="/about"
        className="btn btn-outline-light btn-sm px-4"
        style={{ borderRadius: 0, fontWeight: 600, letterSpacing: '1.5px', fontSize: '0.8rem' }}
      >
        CONOCER MÁS →
      </a>
    </>
  )
}

function ServiceSection({ slide }: { slide: Slide }) {
  return (
    <div className="container-fluid px-4">
      <div className="row">
        <div className="col-12">
          <div style={{ ...cardStyle, padding: '2rem' }}>
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

            {slide.features && <FeaturesList features={slide.features} />}
            {slide.timeline && <Timeline steps={slide.timeline} />}
            {slide.stats && <StatsGrid stats={slide.stats} />}
            {slide.services && <ServiceTags services={slide.services} />}
            {slide.checklist && <Checklist items={slide.checklist} />}
            {slide.eppItems && <EppGrid items={slide.eppItems} />}
            {slide.extincionItems && <ExtincionList items={slide.extincionItems} />}
            {slide.paisajismoItems && (
              <div className="mb-3">
                <h6 style={sectionTitle}>PAISAJISMO Y JARDINERÍA</h6>
                <TextTags items={slide.paisajismoItems} />
              </div>
            )}
            {slide.obrasItems && (
              <div className="mb-3">
                <h6 style={sectionTitle}>OBRAS MENORES DE CONSTRUCCIÓN</h6>
                <TextTags items={slide.obrasItems} />
              </div>
            )}
            {slide.muellesItems && <MuellesGrid items={slide.muellesItems} />}
            {slide.actividades && <ActividadesList items={slide.actividades} />}
            {slide.about && <AboutSection about={slide.about} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SlideContent({ slide, index }: { slide: Slide; index: number }) {
  if (index === 0) return <HeroSection slide={slide} />
  return <ServiceSection slide={slide} />
}
