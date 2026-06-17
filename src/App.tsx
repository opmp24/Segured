import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import Documents from './pages/Documents'
import PrevencionRiesgos from './pages/PrevencionRiesgos'
import VentaEquipos from './pages/VentaEquipos'
import PaisajismoConstruccion from './pages/PaisajismoConstruccion'
import MuellesFlotantes from './pages/MuellesFlotantes'
import Inventario from './pages/Inventario'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] as const } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: [0.25, 1, 0.5, 1] as const } },
} satisfies Variants

export default function App() {
  const location = useLocation()
  return (
    <Layout>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/prevencion-riesgos" element={<PrevencionRiesgos />} />
            <Route path="/venta-equipos" element={<VentaEquipos />} />
            <Route path="/paisajismo-construccion" element={<PaisajismoConstruccion />} />
            <Route path="/muelles-flotantes" element={<MuellesFlotantes />} />
            <Route path="/inventario" element={<Inventario />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </Layout>
  )
}
