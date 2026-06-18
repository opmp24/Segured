import { useEffect, useState } from 'react'

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null)
  const [toast, setToast] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  function handleClick() {
    if (deferredPrompt) {
      ;(deferredPrompt as any).prompt()
      ;(deferredPrompt as any).userChoice.then(() => setDeferredPrompt(null))
    } else {
      setToast(true)
      setTimeout(() => setToast(false), 4000)
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="btn btn-warning shadow position-fixed d-flex align-items-center justify-content-center p-0"
        style={{
          right: 18,
          bottom: 82,
          zIndex: 9999,
          width: 56,
          height: 56,
          borderRadius: '50%',
          border: '2px solid #1a1a1a',
        }}
        title="Instalar aplicación"
      >
        <i className="bi bi-download fs-5"></i>
      </button>

      {toast && (
        <div
          className="position-fixed shadow bg-dark text-white px-4 py-3 rounded"
          style={{
            bottom: 150,
            right: 18,
            zIndex: 10001,
            fontSize: '0.85rem',
            maxWidth: 280,
          }}
        >
          <i className="bi bi-info-circle text-warning me-2"></i>
          Para instalar, abre el menú del navegador (⋮) → "Instalar aplicación"
        </div>
      )}
    </>
  )
}
