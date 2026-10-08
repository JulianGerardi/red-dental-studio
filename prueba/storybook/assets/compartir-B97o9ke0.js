import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import { toPng } from 'html-to-image'
import type { Diseno } from './bloques'

/* Compartir y bajar lo que se arma en el constructor.

   El link lleva el diseño adentro (comprimido, en el # de la dirección): no
   se sube a ningún servidor, así que no hay nada que borrar ni que pueda
   quedar público por error. Quien lo abre ve el mismo componente con su
   código, y puede abrir una copia en el Builder para cambiarla. */

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

/* El diseño de un link. Lo guarda .storybook/manager.ts al abrir el sitio,
   antes de que Storybook reescriba la dirección; se vuelve a poner en la
   dirección para que recargar o copiarla siga mostrando el diseño. */
export function tomarCompartido(): string | null {
  let codigo: string | null = null
  try {
    codigo = window.sessionStorage.getItem(CLAVE)
    window.sessionStorage.removeItem(CLAVE)
  } catch {
    /* Sin almacenamiento: se intenta con la dirección. */
  }
  codigo ??= dondeEsta().location.hash.match(/diseno=([\\w-]+)/)?.[1] ?? null
  if (codigo) ponerEnLaDireccion(\`#diseno=\${codigo}\`)
  return codigo
}

/* Al pasar a editar una copia: recargar ya no vuelve al diseño del link. */
export function soltarCompartido() {
  ponerEnLaDireccion('')
}

/* La ventana del sitio, o esta página si el sitio es de otro origen. */
function dondeEsta(): Window {
  try {
    if (window.top?.location.href) return window.top
  } catch {
    /* Otro origen. */
  }
  return window
}

function ponerEnLaDireccion(hash: string) {
  const w = dondeEsta()
  if (w.location.hash === hash) return
  w.history.replaceState(w.history.state, '', w.location.pathname + w.location.search + hash)
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