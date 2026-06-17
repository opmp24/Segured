import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { listFolderFiles, getDocumentsFolderId, type DriveFile } from '../services/drive'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.7, ease: 'easeOut' as const },
}

function previewUrl(file: DriveFile): string | null {
  if (file.mimeType?.includes('pdf')) {
    return `https://docs.google.com/viewer?url=${encodeURIComponent(`https://drive.google.com/uc?export=download&id=${file.id}`)}&embedded=true`
  }
  if (file.mimeType?.includes('image/')) {
    return `https://drive.google.com/uc?export=view&id=${file.id}`
  }
  if (file.mimeType?.includes('vnd.google-apps.document')) {
    return `https://docs.google.com/document/d/${file.id}/preview`
  }
  if (file.mimeType?.includes('vnd.google-apps.spreadsheet')) {
    return `https://docs.google.com/spreadsheets/d/${file.id}/preview`
  }
  if (file.mimeType?.includes('vnd.google-apps.presentation')) {
    return `https://docs.google.com/presentation/d/${file.id}/preview`
  }
  if (
    file.mimeType?.includes('text/') ||
    file.mimeType?.includes('application/json') ||
    file.mimeType?.includes('application/xml')
  ) {
    return `https://docs.google.com/viewer?url=${encodeURIComponent(`https://drive.google.com/uc?export=download&id=${file.id}`)}&embedded=true`
  }
  return null
}

function isIframePreview(file: DriveFile): boolean {
  if (!file.mimeType) return false
  return !file.mimeType.startsWith('image/')
}

export default function Documents() {
  const [files, setFiles] = useState<DriveFile[]>([])
  const [selected, setSelected] = useState<DriveFile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const abortRef = useRef(false)

  useEffect(() => {
    const controller = new AbortController()
    abortRef.current = false
    ;(async () => {
      try {
        const folderId = getDocumentsFolderId()
        if (!folderId) {
          setError('Carpeta de documentos no configurada')
          setLoading(false)
          return
        }

        const docs = await listFolderFiles(folderId)
        if (abortRef.current) return

        if (docs.length === 0) {
          setError('No se encontraron documentos en la carpeta.')
          setLoading(false)
          return
        }

        setFiles(docs)
        setSelected(docs[0])
        setLoading(false)
      } catch (err: unknown) {
        if (!abortRef.current) {
          setError(err instanceof Error ? err.message : 'Error al cargar documentos')
          setLoading(false)
        }
      }
    })()

    return () => {
      abortRef.current = true
      controller.abort()
    }
  }, [])

  const preview = selected ? previewUrl(selected) : null
  const useIframe = selected ? isIframePreview(selected) : false

  return (
    <>
      <section className="container-fluid bg-dark text-white py-5 mb-5 position-relative overflow-hidden hero-parallax text-center">
        <div className="container py-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-warning fw-bold text-uppercase">Documentaci&oacute;n</span>
            <h1 className="display-4 fw-bold">Centro de Documentos</h1>
            <p className="lead text-white-50 col-lg-8 mx-auto">
              Acceso a normativas, manuales y procedimientos de seguridad.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="container py-4">
        <motion.section {...fadeUp} className="row g-4">
          <div className="col-lg-4 order-lg-1 order-2">
            <div className="bg-light p-4 rounded shadow-sm h-100">
              <h5 className="mb-3 border-bottom pb-2">
                <i className="bi bi-folder2-open me-2 text-warning"></i>Archivos Disponibles
              </h5>

              {loading && (
                <div className="text-center py-3">
                  <div className="spinner-border text-warning" role="status"></div>
                  <p className="small mt-2">Cargando...</p>
                </div>
              )}

              {error && !loading && (
                <p className="text-danger small mb-0">
                  <i className="bi bi-exclamation-triangle me-1"></i>
                  {error}
                </p>
              )}

              {!loading && files.length > 0 && (
                <div className="list-group list-group-flush">
                  {files.map((f) => (
                    <button
                      key={f.id}
                      className={`list-group-item list-group-item-action d-flex align-items-center gap-2 border-0 ${selected?.id === f.id ? 'active' : ''}`}
                      onClick={() => setSelected(f)}
                    >
                      <i
                        className={`bi ${f.mimeType?.includes('pdf') ? 'bi-filetype-pdf' : f.mimeType?.includes('image/') ? 'bi-image' : f.mimeType?.includes('spreadsheet') ? 'bi-file-earmark-spreadsheet' : f.mimeType?.includes('presentation') ? 'bi-file-earmark-slides' : f.mimeType?.includes('document') || f.mimeType?.includes('text') ? 'bi-file-earmark-text' : 'bi-file-earmark'} flex-shrink-0`}
                      ></i>
                      <span className="small text-truncate">{f.name}</span>
                    </button>
                  ))}
                </div>
              )}

              <div className="text-muted small mt-3 fst-italic">
                <i className="bi bi-lock-fill me-1"></i>Documentos privados requieren
                autorizaci&oacute;n administrativa.
              </div>
            </div>
          </div>

          <div className="col-lg-8 order-lg-2 order-1">
            <div className="card border-0 shadow-sm h-100">
              <div
                className="card-body p-0 position-relative bg-dark rounded overflow-hidden d-flex align-items-center justify-content-center"
                style={{ minHeight: 600 }}
              >
                {loading && (
                  <div className="text-center text-white-50">
                    <div className="spinner-border text-warning mb-3" role="status"></div>
                    <p className="small">Cargando documentos...</p>
                  </div>
                )}

                {error && !loading && !selected && (
                  <div className="text-center text-white-50 p-5">
                    <i className="bi bi-file-earmark-text display-1 d-block mb-3"></i>
                    <p>{error}</p>
                  </div>
                )}

                {!loading && files.length === 0 && !error && (
                  <div className="text-center text-white-50 p-5">
                    <i className="bi bi-file-earmark-text display-1 d-block mb-3"></i>
                    <p>No hay documentos disponibles.</p>
                  </div>
                )}

                {selected && preview && useIframe && (
                  <iframe
                    src={preview}
                    className="w-100 h-100 border-0"
                    style={{ minHeight: 600 }}
                    title={selected.name}
                    allowFullScreen
                  ></iframe>
                )}

                {selected && preview && !useIframe && (
                  <img
                    src={preview}
                    className="img-fluid"
                    alt={selected.name}
                    style={{ maxHeight: '80vh', objectFit: 'contain' }}
                  />
                )}

                {selected && !preview && (
                  <div className="text-center text-white-50 p-5">
                    <i className="bi bi-file-earmark-text display-1 d-block mb-3"></i>
                    <p className="mb-2">{selected.name}</p>
                    <p className="small">
                      <i className="bi bi-exclamation-triangle me-1 text-warning"></i>
                      Tipo de archivo no soportado para vista previa.
                    </p>
                    <p className="small text-white-50 mb-3">
                      Formatos soportados: PDF, Google Docs, Sheets, Slides, TXT, JSON, XML,
                      im&aacute;genes.
                    </p>
                    <a
                      href={`https://drive.google.com/uc?export=download&id=${selected.id}`}
                      className="btn btn-warning btn-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="bi bi-download me-1"></i>Descargar
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section {...fadeUp} className="mt-5 pt-4">
          <h3 className="mb-4 text-uppercase fw-bold">
            <span className="text-warning">Recursos</span> de Seguridad
          </h3>
          <div className="row g-4">
            {[
              {
                icon: 'bi-shield-check',
                title: 'Normativa ISO 45001',
                text: 'Est\u00e1ndares internacionales para sistemas de gesti\u00f3n de seguridad y salud en el trabajo.',
              },
              {
                icon: 'bi-cone-striped',
                title: 'Protocolos de Emergencia',
                text: 'Gu\u00edas de actuaci\u00f3n r\u00e1pida ante incidentes, evacuaciones y primeros auxilios en obra.',
              },
              {
                icon: 'bi-people-fill',
                title: 'Capacitaciones',
                text: 'Material de apoyo para charlas de 5 minutos y formaci\u00f3n continua del personal.',
              },
            ].map((r, i) => (
              <motion.div
                key={r.title}
                className="col-md-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <div className="info-card text-center p-4 h-100">
                  <i className={`bi ${r.icon} display-4 text-warning mb-3 d-block`}></i>
                  <h4>{r.title}</h4>
                  <p className="text-muted">{r.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </>
  )
}
