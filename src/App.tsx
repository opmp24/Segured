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
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminStock from './pages/AdminStock'
import AdminMovements from './pages/AdminMovements'
import AdminContact from './pages/AdminContact'
import Productos from './pages/Productos'
import DetalleProducto from './pages/DetalleProducto'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] as const } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: [0.25, 1, 0.5, 1] as const } },
} satisfies Variants

export default function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  const content = (
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
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:id" element={<DetalleProducto />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/prevencion-riesgos" element={<PrevencionRiesgos />} />
          <Route path="/venta-equipos" element={<VentaEquipos />} />
          <Route path="/paisajismo-construccion" element={<PaisajismoConstruccion />} />
          <Route path="/muelles-flotantes" element={<MuellesFlotantes />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />}>
            <Route index element={<AdminStock />} />
            <Route path="stock" element={<AdminStock />} />
            <Route path="movements" element={<AdminMovements />} />
            <Route path="contact" element={<AdminContact />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )

  if (isAdminRoute) {
    return <>{content}</>
  }

  return <Layout>{content}</Layout>
}
