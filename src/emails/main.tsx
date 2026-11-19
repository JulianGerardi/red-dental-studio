import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import Emails from './Vista'

/* Entrada propia de la página de mails (/emails/): no carga la app, sólo la vista previa. Ver emails.md. */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Emails />
  </StrictMode>,
)
