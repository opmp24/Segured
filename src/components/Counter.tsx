import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const steps = 40
    const increment = value / steps
    let count = 0
    const timer = setInterval(() => {
      count++
      const next = Math.min(Math.round(increment * count), value)
      setCurrent(next)
      if (next >= value) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <motion.span
      ref={ref}
      initial={{ scale: 0.3, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ type: 'spring', stiffness: 80, damping: 12, delay: 0.1 }}
    >
      {current}{suffix}
    </motion.span>
  )
}
