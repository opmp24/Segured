import { useState } from 'react'
import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.7, ease: 'easeOut' as const },
}

export default function Inventario() {
  const [scannedCode, setScannedCode] = useState('')
  const [productName, setProductName] = useState('')
  const [productBrand, setProductBrand] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productMeasures, setProductMeasures] = useState('')
  const [showResult, setShowResult] = useState(false)

  const handleScan = async () => {
    const code = (document.getElementById('scan-input') as HTMLInputElement)?.value?.trim()
    if (!code) return
    setScannedCode(code)
    setShowResult(true)
    setProductName('Buscando informaci\u00f3n...')
    setProductBrand('')
    setProductMeasures('')

    try {
      const resp = await fetch(`https://world.openfoodfacts.org/api/v0/product/${code}.json`)
      const data = await resp.json()
      if (data.status === 1) {
        const p = data.product
        setProductName(p.product_name || '')
        setProductBrand(p.brands || '')
        setProductMeasures(p.quantity || '')
      } else {
        setProductName('')
      }
    } catch {
      setProductName('')
    }
  }

  const resetForm = () => {
    setShowResult(false)
    setScannedCode('')
    setProductName('')
    setProductBrand('')
    setProductPrice('')
    setProductMeasures('')
  }

  return (
    <>
      <section className="container-fluid bg-dark text-white py-5 mb-5 position-relative overflow-hidden hero-parallax text-center">
        <div className="container py-5">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-warning fw-bold text-uppercase">Gesti&oacute;n</span>
            <h1 className="display-4 fw-bold">Inventario QR</h1>
            <p className="lead text-white-50 col-lg-8 mx-auto">
              Escanea c&oacute;digos de productos para obtener informaci&oacute;n y gestionar el inventario.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="container py-4">
        <motion.div {...fadeUp} className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body text-center">
                <h5 className="card-title mb-3">
                  <i className="bi bi-qr-code-scan me-2 text-warning"></i>Ingresa C&oacute;digo
                </h5>
                <div className="input-group mb-3">
                  <input
                    id="scan-input"
                    type="text"
                    className="form-control"
                    placeholder="C\u00f3digo de barras o QR"
                    onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                  />
                  <button className="btn btn-warning" onClick={handleScan}>
                    <i className="bi bi-search me-1"></i>Buscar
                  </button>
                </div>
                <p className="text-muted small mt-2">
                  Ingresa el c&oacute;digo del producto o usa un esc&aacute;ner de c&oacute;digos.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {showResult && (
          <motion.div
            className="row justify-content-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="col-md-8">
              <div className="card shadow border-0">
                <div className="card-header bg-warning text-dark fw-bold">
                  <i className="bi bi-box-seam me-2"></i>Detalles del Producto
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label fw-bold">C&oacute;digo Escaneado</label>
                    <div className="input-group">
                      <input type="text" className="form-control bg-light" value={scannedCode} readOnly />
                      <a
                        href={`https://www.google.com/search?q=${encodeURIComponent(scannedCode)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-secondary"
                        title="Buscar en Google"
                      >
                        <i className="bi bi-google"></i>
                      </a>
                    </div>
                  </div>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Nombre del Producto</label>
                      <input type="text" className="form-control" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Ej: Casco de Seguridad" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Marca</label>
                      <input type="text" className="form-control" value={productBrand} onChange={(e) => setProductBrand(e.target.value)} placeholder="Ej: 3M" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Precio Estimado</label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input type="number" className="form-control" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} placeholder="0" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Medidas / Talla</label>
                      <input type="text" className="form-control" value={productMeasures} onChange={(e) => setProductMeasures(e.target.value)} placeholder="Ej: L, 20x20cm" />
                    </div>
                  </div>
                  <div className="mt-4 text-end">
                    <button className="btn btn-outline-dark me-2" onClick={resetForm}>Escanear Otro</button>
                    <button className="btn btn-warning fw-bold" onClick={() => alert('Funcionalidad de guardado pendiente de backend.')}>
                      Guardar en Inventario
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </>
  )
}
