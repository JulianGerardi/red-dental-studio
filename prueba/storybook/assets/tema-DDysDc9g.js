import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useState } from 'react'

/* Tema de la app (Settings › Preferences › Appearance). Se guarda en el navegador hasta que haya backend y se aplica con
   la clase \`dark\` en <html>; los colores oscuros están en src/index.css (:root.dark). Ver modulos/preferences.md. */
export type Tema = 'Light' | 'Dark'

const CLAVE = 'preferences:theme'
const EVENTO = 'tema-cambio'

export function leerTema(): Tema {
  try { return localStorage.getItem(CLAVE) === 'Dark' ? 'Dark' : 'Light' } catch { return 'Light' }
}

export function aplicarTema(tema: Tema = leerTema()) {
  document.documentElement.classList.toggle('dark', tema === 'Dark')
}

export function guardarTema(tema: Tema) {
  try { localStorage.setItem(CLAVE, tema) } catch { /* sin almacenamiento, vale para esta visita */ }
  aplicarTema(tema)
  window.dispatchEvent(new Event(EVENTO))
}

export function useTema() {
  const [tema, setTema] = useState<Tema>(leerTema)
  useEffect(() => {
    const sync = () => setTema(document.documentElement.classList.contains('dark') ? 'Dark' : 'Light')
    window.addEventListener(EVENTO, sync)
    return () => window.removeEventListener(EVENTO, sync)
  }, [])
  return [tema, guardarTema] as const
}
`})))()}export{r as n,n as r,i as t};