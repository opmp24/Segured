import { useEffect, useState } from 'react'

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null)

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
      alert(
        'Para instalar la aplicación:\n\n' +
          '1. Abre el menú del navegador (⋮)\n' +
          '2. Selecciona "Instalar aplicación" o "Agregar a pantalla de inicio"\n\n' +
          'Si no aparece, asegúrate de estar usando Chrome o Edge.',
      )
    }
  }

  return (
    <button
      onClick={handleClick}
      className="btn btn-warning shadow position-fixed"
      style={{
        bottom: 80,
        left: 18,
        zIndex: 9999,
        borderRadius: 50,
        padding: '10px 16px',
        fontSize: '0.85rem',
      }}
      title="Instalar aplicación"
    >
      <i className="bi bi-download me-1"></i>App
    </button>
  )
}
