import { Routes, Route } from 'react-router-dom'
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

export default function App() {
  return (
    <Layout>
      <Routes>
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
    </Layout>
  )
}
