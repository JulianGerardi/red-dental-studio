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
import { estadosSoportados, estadosFaltantes, estadosDocumentados } from './states-lib.mjs'
import { writeFileSync, mkdirSync } from 'node:fs'

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

/* Componentes internos: cada función de React (exportada o no) de
   components/ y pages/ tiene que estar importada por algún story desde su
   propio archivo, o tener una exención (archivo o archivo#Nombre) en
   exentos.json. Así una pieza chica -una fila, una tarjeta, un diálogo- no
   queda sin documentar por vivir dentro de otro archivo. */
/* Los stories y AppRoutes.tsx cuentan como "montan el componente": las pantallas
   se documentan en Pages, que renderiza AppRoutes. */
const todosLosStories = archivos(join(RAIZ, 'src')).filter((p) => p.endsWith('.stories.tsx')).concat(join(RAIZ, 'src/AppRoutes.tsx'))
const importados = new Map() /* archivo fuente -> Set de nombres */
const resolver = (desde, ruta) => {
  const base = ruta.startsWith('@/') ? join(RAIZ, 'src', ruta.slice(2)) : ruta.startsWith('.') ? join(desde, '..', ruta) : null
  if (!base) return null
  return [base + '.tsx', base + '.ts', join(base, 'index.tsx')].find((c) => existsSync(c)) ?? null
}
for (const st of todosLosStories) {
  const texto = readFileSync(st, 'utf8')
  for (const [, nombres, ruta] of texto.matchAll(/import\s*(?:type\s*)?\{([^}]+)\}\s*from\s*['"]([^'"]+)['"]/g)) {
    const destino = resolver(st, ruta)
    if (!destino) continue
    const set = importados.get(destino) ?? new Set()
    for (const n of nombres.split(',')) set.add(n.trim().split(/\s+as\s+/)[0].replace(/^type\s+/, ''))
    importados.set(destino, set)
  }
  for (const [, , ruta] of texto.matchAll(/import\s+(\w+)\s*(?:,\s*\{[^}]*\})?\s*from\s*['"]([^'"]+)['"]/g)) {
    const destino = resolver(st, ruta)
    if (destino) importados.set(destino, new Set([...(importados.get(destino) ?? []), 'default']))
  }
  for (const [, ns, ruta] of texto.matchAll(/import\s*\*\s*as\s+(\w+)\s*from\s*['"]([^'"]+)['"]/g)) {
    const destino = resolver(st, ruta)
    if (destino) importados.set(destino, new Set([...(importados.get(destino) ?? []), '*']))
  }
}
const internosSinStory = []
let totalInternos = 0
for (const f of archivos(join(RAIZ, 'src')).filter((p) => (p.includes('/src/components/') || p.includes('/src/pages/')) && extname(p) === '.tsx' && !p.endsWith('.stories.tsx'))) {
  const texto = readFileSync(f, 'utf8')
  const nombres = new Set()
  const porDefecto = new Set([...texto.matchAll(/^export\s+default\s+function\s+([A-Z]\w*)/gm)].map((m) => m[1]))
  for (const m of texto.matchAll(/^(?:export\s+)?(?:default\s+)?function\s+([A-Z]\w*)\s*[<(]/gm)) nombres.add(m[1])
  for (const m of texto.matchAll(/^export const ([A-Z][A-Za-z0-9]*)\s*(?::[^=]+)?=\s*(?:React\.)?(?:forwardRef|memo|\(|function)/gm)) nombres.add(m[1])
  for (const m of texto.matchAll(/^export\s*\{([^}]+)\}/gm)) for (const n of m[1].split(',')) { const x = n.trim().split(/\s+as\s+/).pop(); if (/^[A-Z]/.test(x)) nombres.add(x) }
  const clave = f.replace(`${RAIZ}src/`, '')
  const set = importados.get(f) ?? new Set()
  for (const n of nombres) {
    totalInternos++
    const cubierto = set.has(n) || set.has('*') || (porDefecto.has(n) && set.has('default'))
    const exento = clave in exentos || `${clave}#${n}` in exentos
    if (!cubierto && !exento) internosSinStory.push(`${clave}#${n}`)
  }
}

/* Sin uso: componentes exportados que ninguna pantalla ni componente importa
   (los stories no cuentan). Son candidatos a borrarse o a conectarse. */
const usados = new Map()
for (const f of archivos(join(RAIZ, 'src')).filter((p) => ['.ts', '.tsx'].includes(extname(p)) && !p.endsWith('.stories.tsx') && !p.includes('/design-system/'))) {
  const texto = readFileSync(f, 'utf8')
  for (const [, nombres, ruta] of texto.matchAll(/import\s*(?:type\s*)?\{([^}]+)\}\s*from\s*['"]([^'"]+)['"]/g)) {
    const destino = resolver(f, ruta)
    if (!destino) continue
    const set = usados.get(destino) ?? new Set()
    for (const n of nombres.split(',')) set.add(n.trim().split(/\s+as\s+/)[0].replace(/^type\s+/, ''))
    usados.set(destino, set)
  }
}
const sinUso = []
for (const f of componentes) {
  const texto = readFileSync(f, 'utf8')
  for (const m of texto.matchAll(/^export (?:function|const) ([A-Z][a-z]\w*)/gm)) {
    const n = m[1]
    if ((usados.get(f) ?? new Set()).has(n)) continue
    if (new RegExp(`<${n}[\\s/>]`).test(texto)) continue /* lo usa el mismo archivo */
    if (/^[A-Z][A-Z_]+$/.test(n)) continue
    sinUso.push(`${f.replace(`${RAIZ}src/`, '')}#${n}`)
  }
}

/* Estados: cada componente con story tiene que mostrar los estados que su
   código soporta (disabled, error, loading, empty, selected) o tener una
   exención válida en state-waivers.json. */
const exencionesEstado = JSON.parse(readFileSync(join(RAIZ, 'src/design-system/state-waivers.json'), 'utf8'))
const estadosSinCubrir = []
const exencionesInvalidas = []
for (const [archivo, estados] of Object.entries(exencionesEstado)) {
  for (const [estado, ex] of Object.entries(estados)) {
    if (ex.na) { if (!ex.reason) exencionesInvalidas.push(`${archivo} · ${estado}: falta el motivo`); continue }
    const [ruta, historia] = String(ex.story ?? '').split('#')
    const f = join(RAIZ, 'src', ruta ?? '')
    if (!ruta || !historia || !existsSync(f) || !new RegExp(`export const ${historia}\\b`).test(readFileSync(f, 'utf8')))
      exencionesInvalidas.push(`${archivo} · ${estado}: el story "${ex.story}" no existe`)
  }
}
const matrizEstados = []
let conEstados = 0
for (const p of componentes) {
  const st = p.replace(/\.tsx$/, '.stories.tsx')
  if (!existsSync(st)) continue
  const clave = `components/${p.split('/src/components/')[1]}`
  const codigo = readFileSync(p, 'utf8')
  const soportados = estadosSoportados(codigo)
  if (soportados.length) conEstados++
  if (soportados.length) {
    const documentados = new Set(estadosDocumentados(readFileSync(st, 'utf8')))
    const ex = exencionesEstado[clave] ?? {}
    matrizEstados.push({ archivo: clave, estados: Object.fromEntries(soportados.map((e) => [e, documentados.has(e) ? 'story' : ex[e] ? (ex[e].na ? 'na' : 'exenta') : 'falta'])) })
  }
  const faltan = estadosFaltantes(clave, codigo, readFileSync(st, 'utf8'), Object.fromEntries(Object.entries(exencionesEstado).map(([k, v]) => [k, v])))
  if (faltan.length) estadosSinCubrir.push(`${clave}: ${faltan.join(', ')}`)
}

/* Colores escritos a mano en clases */
const css = readFileSync(join(RAIZ, 'src/index.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')
const tokens = {}
for (const [, cuerpo] of css.matchAll(/@theme(?:\s+static)?\s*\{([^{}]*)\}/g))
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
console.log(`Componentes internos:   ${totalInternos - internosSinStory.length} de ${totalInternos} funciones de React tienen story`)
console.log(`Estados:                ${conEstados - estadosSinCubrir.length} de ${conEstados} componentes con estados los muestran todos (${Object.values(exencionesEstado).reduce((n, e) => n + Object.keys(e).length, 0)} exenciones)`)
console.log(`Colores a mano en clases: ${sinToken} sin token (baseline ${baseline.colorSinToken}), ${conToken} que ya tienen token`)
if (rutasSinStory.length) console.log(`\nRutas sin story en Pages:\n  ${rutasSinStory.join('\n  ')}`)
if (!check && sinStory.length) console.log(`\nComponentes sin story:\n  ${sinStory.map((p) => p.replace(`${RAIZ}src/`, '')).join('\n  ')}`)

if (sinUso.length) console.log(`\nExportados que la app no usa (${sinUso.length}, sólo los importan stories):\n  ${sinUso.join('\n  ')}`)
if (internosSinStory.length) console.log(`\nFunciones de React sin story:\n  ${internosSinStory.join('\n  ')}`)
if (estadosSinCubrir.length) console.log(`\nEstados soportados sin story ni exención:\n  ${estadosSinCubrir.join('\n  ')}`)
if (exencionesInvalidas.length) console.log(`\nExenciones de estado inválidas:\n  ${exencionesInvalidas.join('\n  ')}`)

mkdirSync(join(RAIZ, 'src/design-system/generated'), { recursive: true })
writeFileSync(join(RAIZ, 'src/design-system/generated/coverage.json'), JSON.stringify({
  componentes: { conStory: componentes.length - sinStory.length - nExentos, total: componentes.length, enAnfitrion: nExentos, sinStory: sinStory.map((p) => p.replace(`${RAIZ}src/`, '')) },
  rutas: { conStory: rutas.size - rutasSinStory.length, total: rutas.size, sinStory: rutasSinStory },
  internos: { conStory: totalInternos - internosSinStory.length, total: totalInternos, sinStory: internosSinStory },
  estados: { matriz: matrizEstados, sinCubrir: estadosSinCubrir, exenciones: exencionesEstado },
  sinUso,
  colores: { sinToken, conToken, baseline: baseline.colorSinToken },
}, null, 1))

let falla = false
if (internosSinStory.length) { console.error(`\n✗ Hay ${internosSinStory.length} funciones de React sin story: importalas en un .stories.tsx o agregá una exención (archivo#Nombre) en exentos.json.`); falla = true }
if (estadosSinCubrir.length) { console.error(`\n✗ Hay estados sin documentar: agregá el story (Disabled, WithValidationErrors, Empty…) o una exención con motivo en src/design-system/state-waivers.json.`); falla = true }
if (exencionesInvalidas.length) { console.error(`\n✗ Hay exenciones de estado que apuntan a stories que no existen.`); falla = true }
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
