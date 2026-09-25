import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import { tokenPorHex } from './tokens'

/* Lee el código fuente de la app -todo lo que hay bajo src/ menos los propios
   stories- y cuenta qué valores visuales están escritos a mano. Es el
   "scraping" del design system: siempre sale del código actual. */
const todas = import.meta.glob(['/src/**/*.{ts,tsx}', '!/src/**/*.stories.tsx', '!/src/design-system/**'], {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>
const fuentes = Object.fromEntries(Object.entries(todas).filter(([f]) => !f.endsWith('.stories.tsx') && !f.startsWith('/src/design-system/')))

export type Uso = { valor: string; usos: number; archivos: number }

function contar(re: RegExp, normalizar = (s: string) => s): Uso[] {
  const mapa = new Map<string, { usos: number; archivos: Set<string> }>()
  for (const [archivo, texto] of Object.entries(fuentes)) {
    for (const m of texto.matchAll(re)) {
      const v = normalizar(m[0])
      const e = mapa.get(v) ?? { usos: 0, archivos: new Set() }
      e.usos++
      e.archivos.add(archivo)
      mapa.set(v, e)
    }
  }
  return [...mapa].map(([valor, e]) => ({ valor, usos: e.usos, archivos: e.archivos.size })).sort((a, b) => b.usos - a.usos)
}

export const archivosAnalizados = Object.keys(fuentes).length

export const hexEnCodigo = contar(/#[0-9a-fA-F]{6}\\b/g, (s) => s.toLowerCase()).map((u) => ({
  ...u,
  token: tokenPorHex[u.valor],
}))

export const tamanosDeTexto = contar(/text-\\[\\d+(?:\\.\\d+)?px\\]/g)
export const radios = contar(/rounded(?:-[trbl]{1,2})?-\\[[^\\]]+\\]/g)
export const sombras = contar(/shadow-\\[[^\\]]+\\]/g)

/* Cómo se dibuja cada estado interactivo: todas las clases con ese prefijo
   (hover:, focus:, disabled:…) que aparecen en el código, con cuántas veces. */
export function clasesDeEstado(prefijo: string): Uso[] {
  const re = new RegExp(\`(?<![\\\\w-])\${prefijo}:[^\\\\s"'\\\`\\\\\\\\)]+\`, 'g')
  return contar(re)
}
`})))()}n();export{t as default};