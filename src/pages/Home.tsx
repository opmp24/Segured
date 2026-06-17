import { useRef } from 'react'
import { useScroll, useSpring } from 'framer-motion'
import BgLayer from '../components/BgLayer'
import SlideContent from '../components/SlideContent'
import ProgressDot from '../components/ProgressDot'
import ContactSection from '../components/ContactSection'
import { slides, images } from '../data/slides'

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

      <section
        className="d-flex align-items-center"
        style={{ height: '100vh', position: 'relative', zIndex: 1 }}
      >
        <SlideContent slide={slides[0]} index={0} />
      </section>

      {slides.slice(1).map((slide, i) => (
        <section
          key={slide.tag}
          className="d-flex align-items-center"
          style={{ height: '200vh', position: 'relative', zIndex: 1 }}
        >
          <div style={{ width: '100%', position: 'sticky', top: '20vh', zIndex: 1 }}>
            <SlideContent slide={slide} index={i + 1} />
          </div>
          <ProgressDot index={i + 1} />
        </section>
      ))}

      <ContactSection />
    </div>
  )
}
