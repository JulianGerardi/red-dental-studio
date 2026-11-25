import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import Pdfs from './Vista'

/* Entrada propia de la página de PDFs (/pdfs/): no carga la app, sólo la vista previa. Ver pdfs.md. */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Pdfs />
  </StrictMode>,
)
