import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  listFolderFiles,
  fetchYouTubeVideos,
  thumbnailUrl,
  driveFileUrl,
  getGalleryFolderId,
  getLatestVideoId,
  type DriveFile,
  type YouTubeVideo,
} from '../services/drive'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.7, ease: 'easeOut' as const },
}

interface ImageItem {
  id: string
  name: string
  thumb: string
  full: string
}

interface ModalContent {
  type: 'image' | 'video'
  src: string
  title: string
}

export default function Gallery() {
  const [modal, setModal] = useState<ModalContent | null>(null)
  const [images, setImages] = useState<ImageItem[]>([])
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [loadingImages, setLoadingImages] = useState(true)
  const [loadingVideos, setLoadingVideos] = useState(true)
  const [imageError, setImageError] = useState('')
  const [videoError, setVideoError] = useState('')
  const abortRef = useRef(false)

  useEffect(() => {
    const controller = new AbortController()
    abortRef.current = false
    ;(async () => {
      try {
        const folderId = getGalleryFolderId()
        if (!folderId) {
          setImageError('Carpeta de galería no configurada')
          setLoadingImages(false)
          return
        }

        const files: DriveFile[] = await listFolderFiles(folderId)
        if (abortRef.current) return

        const imageFiles = files.filter((f) => f.mimeType?.startsWith('image/'))

        if (imageFiles.length === 0) {
          setImageError('No se encontraron imágenes en la carpeta de Drive.')
          setLoadingImages(false)
          return
        }

        const items: ImageItem[] = imageFiles.map((f) => ({
          id: f.id,
          name: f.name.replace(/\.[^/.]+$/, ''),
          thumb: thumbnailUrl(f.thumbnailLink, 800),
          full: f.thumbnailLink ? thumbnailUrl(f.thumbnailLink, 2048) : driveFileUrl(f.id),
        }))

        setImages(items)
        setLoadingImages(false)
      } catch (err: unknown) {
        if (!abortRef.current) {
          setImageError(err instanceof Error ? err.message : 'Error al cargar imágenes')
          setLoadingImages(false)
        }
      }
    })()
    ;(async () => {
      try {
        const ytVideos = await fetchYouTubeVideos()
        if (abortRef.current) return
        if (ytVideos.length > 0) {
          setVideos(ytVideos)
        } else {
          const fallbackId = getLatestVideoId()
          if (fallbackId) {
            setVideos([
              {
                videoId: fallbackId,
                title: 'Video Destacado',
                thumb: `https://img.youtube.com/vi/${fallbackId}/mqdefault.jpg`,
              },
            ])
          } else {
            setVideoError('No se encontraron videos.')
          }
        }
        setLoadingVideos(false)
      } catch {
        if (!abortRef.current) {
          const fallbackId = getLatestVideoId()
          if (fallbackId) {
            setVideos([
              {
                videoId: fallbackId,
                title: 'Video Destacado',
                thumb: `https://img.youtube.com/vi/${fallbackId}/mqdefault.jpg`,
              },
            ])
          } else {
            setVideoError('Error al cargar videos de YouTube.')
          }
          setLoadingVideos(false)
        }
      }
    })()

    return () => {
      abortRef.current = true
      controller.abort()
    }
  }, [])

  return (
    <>
      <section
        className="container-fluid text-white py-5 mb-5 position-relative overflow-hidden hero-parallax text-center"
        style={{
          backgroundImage: 'url(/assets/images/capacitacion.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="position-absolute" style={{ inset: 0, background: 'rgba(0,0,0,0.6)' }} />
        <div className="container py-5 position-relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-warning fw-bold text-uppercase">Galer&iacute;a</span>
            <h1 className="display-4 fw-bold">Nuestro Trabajo en Acci&oacute;n</h1>
            <p className="lead text-white-50 col-lg-8 mx-auto">
              Explore nuestro portafolio de proyectos, capacitaciones y auditor&iacute;as de
              seguridad.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="container py-4">
        <motion.section {...fadeUp} className="py-4">
          <h2 className="display-6 fw-bold mb-4">Im&aacute;genes</h2>

          {loadingImages && (
            <div className="text-center py-5">
              <div className="spinner-border text-warning" role="status"></div>
              <p className="mt-2 text-muted">Cargando im&aacute;genes desde Drive...</p>
            </div>
          )}

          {imageError && !loadingImages && (
            <div className="alert alert-warning">
              <i className="bi bi-exclamation-triangle me-2"></i>
              {imageError}
            </div>
          )}

          {!loadingImages && images.length > 0 && (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
              {images.map((img, i) => (
                <motion.div
                  key={img.id}
                  className="col"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <a
                    href="#"
                    className="d-block overflow-hidden position-relative"
                    style={{
                      borderRadius: 0,
                      boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                      backgroundColor: '#f0f0f0',
                    }}
                    onClick={(e) => {
                      e.preventDefault()
                      setModal({ type: 'image', src: img.full, title: img.name })
                    }}
                  >
                    <img
                      src={img.thumb}
                      className="gallery-item-img"
                      alt={img.name}
                      loading="lazy"
                      style={{
                        width: '100%',
                        aspectRatio: '4/3',
                        objectFit: 'cover',
                        cursor: 'pointer',
                        transition: 'transform 0.4s ease',
                      }}
                    />
                  </a>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>

        <motion.section {...fadeUp} className="py-5 my-4">
          <h2 className="display-6 fw-bold mb-4">Videos</h2>

          {loadingVideos && (
            <p className="text-muted">
              <i className="bi bi-cloud-download me-1"></i>
              Cargando videos...
            </p>
          )}

          {videoError && !loadingVideos && <p className="text-muted">{videoError}</p>}

          {!loadingVideos && videos.length > 0 && (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
              {videos.map((video, i) => (
                <motion.div
                  key={video.videoId}
                  className="col"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <a
                    href="#"
                    className="d-block overflow-hidden position-relative"
                    style={{
                      borderRadius: 0,
                      boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                      backgroundColor: '#f0f0f0',
                    }}
                    onClick={(e) => {
                      e.preventDefault()
                      setModal({
                        type: 'video',
                        src: `https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1`,
                        title: video.title,
                      })
                    }}
                  >
                    <img
                      src={video.thumb}
                      className="gallery-item-img"
                      alt={video.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        aspectRatio: '4/3',
                        objectFit: 'cover',
                        cursor: 'pointer',
                        transition: 'transform 0.4s ease',
                      }}
                    />
                  </a>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </main>

      {modal && (
        <div
          className="modal d-block"
          tabIndex={-1}
          style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
          onClick={() => setModal(null)}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content bg-transparent border-0">
              <div className="modal-body text-center p-0 position-relative">
                <button
                  type="button"
                  className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
                  style={{
                    zIndex: 1055,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    borderRadius: '50%',
                    padding: '1rem',
                  }}
                  onClick={() => setModal(null)}
                ></button>
                {modal.type === 'image' ? (
                  <img
                    src={modal.src}
                    className="img-fluid"
                    alt={modal.title}
                    style={{ maxHeight: '85vh', maxWidth: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <div className="ratio ratio-16x9">
                    <iframe
                      src={modal.src}
                      title={modal.title}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
