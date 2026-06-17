import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ReactLenis } from 'lenis/react'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../css/style.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ReactLenis
        root
        options={{
          lerp: 0.08,
          duration: 1.2,
          wheelMultiplier: 0.8,
          gestureOrientation: 'vertical',
        }}
      >
        <App />
      </ReactLenis>
    </BrowserRouter>
  </React.StrictMode>,
)
