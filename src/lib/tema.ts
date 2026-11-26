import { useEffect, useState } from 'react'

/* Tema de la app (Settings › Preferences › Appearance). Se guarda en el navegador hasta que haya backend y se aplica con
   la clase `dark` en <html>; los colores oscuros están en src/index.css (:root.dark). Ver modulos/preferences.md. */
export type Tema = 'Light' | 'Dark'

const CLAVE = 'preferences:theme'
const EVENTO = 'tema-cambio'
let actual: Tema | null = null

export function leerTema(): Tema {
  try { return localStorage.getItem(CLAVE) === 'Dark' ? 'Dark' : 'Light' } catch { return 'Light' }
}

export function aplicarTema(tema: Tema = leerTema()) {
  document.documentElement.classList.toggle('dark', tema === 'Dark')
}

export function guardarTema(tema: Tema) {
  actual = tema
  try { localStorage.setItem(CLAVE, tema) } catch { /* sin almacenamiento, vale para esta visita */ }
  /* Un fundido corto al cambiar, para que no sea un golpe de luz (preferences.md); sin él si se pide menos movimiento. */
  const quieto = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (document.startViewTransition && !quieto) document.startViewTransition(() => aplicarTema(tema))
  else aplicarTema(tema)
  window.dispatchEvent(new Event(EVENTO))
}

export function useTema() {
  const [tema, setTema] = useState<Tema>(leerTema)
  useEffect(() => {
    const sync = () => setTema(actual ?? leerTema())
    window.addEventListener(EVENTO, sync)
    return () => window.removeEventListener(EVENTO, sync)
  }, [])
  return [tema, guardarTema] as const
}
