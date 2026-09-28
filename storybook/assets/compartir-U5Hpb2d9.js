import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import { toPng } from 'html-to-image'
import type { Diseno } from './bloques'

/* Compartir y bajar lo que se arma en el constructor.

   El link lleva el diseño adentro (comprimido, en el # de la dirección): no
   se sube a ningún servidor, así que no hay nada que borrar ni que pueda
   quedar público por error. Quien lo abre ve el mismo componente con su
   código, y lo que cambie queda en su navegador, no en el link. */

const CLAVE = 'confidentally-ui-shared'

const aBase64Url = (bytes: Uint8Array) => {
  let bin = ''
  bytes.forEach((b) => (bin += String.fromCharCode(b)))
  return btoa(bin).replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '')
}
const deBase64Url = (s: string) => {
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/')
  const bin = atob(b64 + '==='.slice((b64.length + 3) % 4))
  return Uint8Array.from(bin, (ch) => ch.charCodeAt(0))
}

export async function codificar(d: Diseno): Promise<string> {
  const datos = new Blob([JSON.stringify(d)]).stream().pipeThrough(new CompressionStream('deflate-raw'))
  return aBase64Url(new Uint8Array(await new Response(datos).arrayBuffer()))
}

export async function decodificar(codigo: string): Promise<Diseno> {
  const datos = new Blob([deBase64Url(codigo)]).stream().pipeThrough(new DecompressionStream('deflate-raw'))
  return JSON.parse(await new Response(datos).text()) as Diseno
}

/* La dirección del sitio (no la del iframe de la página) con el diseño. */
export function linkDe(codigo: string) {
  let base = window.location.href
  try {
    base = window.top?.location.href ?? base
  } catch {
    /* Otro origen: queda la dirección de esta página. */
  }
  const url = new URL('./', base)
  url.search = '?path=/docs/builder--docs'
  url.hash = \`diseno=\${codigo}\`
  return url.toString()
}

/* El diseño de un link, una sola vez. Lo guarda .storybook/manager.ts al
   abrir el sitio, antes de que Storybook reescriba la dirección. */
export function tomarCompartido(): string | null {
  try {
    const guardado = window.sessionStorage.getItem(CLAVE)
    if (guardado) {
      window.sessionStorage.removeItem(CLAVE)
      const top = window.top
      if (top?.location.hash.includes('diseno=')) top.history.replaceState(null, '', top.location.pathname + top.location.search)
      return guardado
    }
  } catch {
    /* Sin almacenamiento: se intenta con la dirección. */
  }
  for (const w of [window.top, window]) {
    try {
      const m = w?.location.hash.match(/diseno=([\\w-]+)/)
      if (m) {
        /* Se saca de la dirección: recargar no tiene que pisar lo que se
           cambie después. */
        w!.history.replaceState(null, '', w!.location.pathname + w!.location.search)
        return m[1]!
      }
    } catch {
      /* Otro origen. */
    }
  }
  return null
}

/* El color de fondo de las pantallas de la app, para el margen de la imagen. */
function fondoDeLaApp() {
  const sonda = document.createElement('div')
  sonda.className = 'bg-page-background'
  document.body.appendChild(sonda)
  const color = getComputedStyle(sonda).backgroundColor
  sonda.remove()
  return color
}

/* La imagen, al doble de resolución y con un margen del fondo de la app. Si
   las fuentes no se pueden incrustar, se baja igual con las del sistema. */
export async function descargarPng(nodo: HTMLElement, nombre: string) {
  const margen = 32
  const opciones = {
    pixelRatio: 2,
    cacheBust: true,
    backgroundColor: fondoDeLaApp(),
    width: nodo.offsetWidth + margen * 2,
    height: nodo.offsetHeight + margen * 2,
    style: { margin: \`\${margen}px\`, position: 'static', transform: 'none' },
  }
  let url: string
  try {
    url = await toPng(nodo, opciones)
  } catch {
    url = await toPng(nodo, { ...opciones, skipFonts: true })
  }
  const a = document.createElement('a')
  a.href = url
  a.download = \`\${nombre}.png\`
  a.click()
}
`})))()}n();export{t as default};