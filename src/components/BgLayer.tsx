import { motion, useTransform, type MotionValue } from 'framer-motion'

export default function BgLayer({
  src,
  scrollYProgress,
  index,
  total,
}: {
  src: string
  scrollYProgress: MotionValue<number>
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
        filter: 'blur(12px)',
        opacity,
        y,
      }}
    />
  )
}
