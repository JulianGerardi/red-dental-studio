/* Estado del design system contra el código:
   - componentes de src/components sin su .stories.tsx
   - rutas de src/AppRoutes.tsx sin story en Pages
   - colores escritos a mano en clases de Tailwind (y cuáles ya tienen token)

     node scripts/ds-coverage.mjs           informe
     node scripts/ds-coverage.mjs --check   además falla (exit 1) si aparece un
                                            color escrito a mano que ya tiene
                                            token, o si crecen los que no

   Ver design-reference/design-system.md. */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, extname, basename } from 'node:path'

const RAIZ = new URL('..', import.meta.url).pathname
const check = process.argv.includes('--check')

const archivos = (dir) =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n)
    return statSync(p).isDirectory() ? archivos(p) : [p]
  })

/* Componentes sin story */
const componentes = archivos(join(RAIZ, 'src/components')).filter(
  (p) => extname(p) === '.tsx' && !p.endsWith('.stories.tsx'),
)
/* Componentes que sólo existen dentro de otro (manipulan el DOM de la librería
   del odontograma): se documentan en el story del anfitrión. Ver exentos.json. */
const exentos = JSON.parse(readFileSync(join(RAIZ, 'src/design-system/exentos.json'), 'utf8'))
const esExento = (p) => `components/${p.split('/src/components/')[1]}` in exentos
const sinStory = componentes.filter((p) => !existsSync(p.replace(/\.tsx$/, '.stories.tsx')) && !esExento(p))

/* Rutas sin story */
const rutasSrc = readFileSync(join(RAIZ, 'src/AppRoutes.tsx'), 'utf8')
const historias = readFileSync(join(RAIZ, 'src/design-system/Pages.stories.tsx'), 'utf8')
const urls = [...historias.matchAll(/pantalla\(['`]([^'`]+)['`]\)/g)].map((m) => m[1].replace('${P}', '/patients/patient-0001'))
const rutas = new Set()
const base = (pila, p) => `/${[...pila, p].filter(Boolean).join('/')}`.replace(/\/+/g, '/')
{
  /* Recorre el árbol de <Route> con una pila de prefijos. Las rutas que se
     generan con .map() comparten pantalla: se cuenta una sola de cada grupo. */
  const pila = []
  for (const linea of rutasSrc.split('\n')) {
    const autocierre = /\/>\s*$/.test(linea)
    if (linea.includes('<Route')) {
      const p = linea.match(/path="([^"]+)"/)?.[1] ?? ''
      if (autocierre) {
        if (p && p !== '*') rutas.add(p.startsWith('/') ? p : base(pila, p))
        else if (!p && linea.includes('<Route index') && !linea.includes('<Navigate')) rutas.add(base(pila, ''))
      } else {
        pila.push(p) /* contenedor: no es una pantalla, sólo aporta el prefijo */
      }
    } else if (linea.includes('</Route>') && pila.length) {
      pila.pop()
    }
  }
  rutas.add('/message')
  rutas.add('/settings/roles')
}
const coincide = (patron, url) => new RegExp(`^${patron.replace(/:[^/]+/g, '[^/]+').replace(/\/$/, '') || '/'}/?$`).test(url)
const rutasSinStory = [...rutas].filter((r) => !urls.some((u) => coincide(r, u)))

/* Colores escritos a mano en clases */
const css = readFileSync(join(RAIZ, 'src/index.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')
const tokens = {}
for (const [, cuerpo] of css.matchAll(/@theme\s*\{([^{}]*)\}/g))
  for (const [, nombre, hex] of cuerpo.matchAll(/--color-([\w-]+)\s*:\s*(#[0-9a-fA-F]{6})\s*;/g)) tokens[hex.toLowerCase()] ??= nombre
const UTIL = /(?<![\w-])(?:text|bg|border(?:-[trblxyse])?|ring|fill|stroke|divide|outline|decoration|placeholder|caret|accent|from|to|via)-\[(#[0-9a-fA-F]{6})\]/g
let conToken = 0
let sinToken = 0
const detalle = {}
for (const f of archivos(join(RAIZ, 'src')).filter((p) => ['.ts', '.tsx'].includes(extname(p)))) {
  for (const [, hex] of readFileSync(f, 'utf8').matchAll(UTIL)) {
    const h = hex.toLowerCase()
    if (tokens[h]) { conToken++; (detalle[h] ??= []).push(basename(f)) } else sinToken++
  }
}
const baseline = JSON.parse(readFileSync(join(RAIZ, 'scripts/ds-baseline.json'), 'utf8'))

const nExentos = componentes.filter(esExento).length
console.log(`Componentes con story:  ${componentes.length - sinStory.length - nExentos} de ${componentes.length}` + (nExentos ? ` (+${nExentos} documentados en su anfitrión)` : ''))
console.log(`Rutas con story:        ${rutas.size - rutasSinStory.length} de ${rutas.size}`)
console.log(`Colores a mano en clases: ${sinToken} sin token (baseline ${baseline.colorSinToken}), ${conToken} que ya tienen token`)
if (rutasSinStory.length) console.log(`\nRutas sin story en Pages:\n  ${rutasSinStory.join('\n  ')}`)
if (!check && sinStory.length) console.log(`\nComponentes sin story:\n  ${sinStory.map((p) => p.replace(`${RAIZ}src/`, '')).join('\n  ')}`)

let falla = false
if (conToken > 0) {
  console.error(`\n✗ Hay ${conToken} colores escritos a mano que ya tienen token: corré "npm run ds:tokenize".`)
  falla = true
}
if (sinToken > baseline.colorSinToken) {
  console.error(`\n✗ Crecieron los colores sin token (${sinToken} > ${baseline.colorSinToken}). Usá un token de src/index.css o creá uno.`)
  falla = true
}
if (rutasSinStory.length) {
  console.error(`\n✗ Hay rutas sin story en Pages.`)
  falla = true
}
if (check && falla) process.exit(1)
