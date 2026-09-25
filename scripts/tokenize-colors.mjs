/* Reemplaza colores escritos a mano en clases de Tailwind (text-[#09090b])
   por el token que ya tiene ese mismo valor en src/index.css (text-ink).

   Cada token vale exactamente el hex que reemplaza, así que la app se ve igual.
   Sólo toca clases arbitrarias con un hex de 6 dígitos; los colores en estilos
   en línea, atributos SVG o strings de datos no se tocan (los lista el audit).

     node scripts/tokenize-colors.mjs           aplica los reemplazos
     node scripts/tokenize-colors.mjs --check   sólo cuenta, no escribe

   Ver design-reference/design-system.md. */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const RAIZ = new URL('..', import.meta.url).pathname
const check = process.argv.includes('--check')

/* Si dos tokens comparten hex, gana el primero definido salvo que esté acá. */
const PREFERIDO = { '#174596': 'dash-busy-fg' }

const css = readFileSync(join(RAIZ, 'src/index.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')
const tokens = {}
for (const [, cuerpo] of css.matchAll(/@theme(?:\s+static)?\s*\{([^{}]*)\}/g)) {
  for (const [, nombre, hex] of cuerpo.matchAll(/--color-([\w-]+)\s*:\s*(#[0-9a-fA-F]{6})\s*;/g)) {
    tokens[hex.toLowerCase()] ??= nombre
  }
}
for (const [hex, nombre] of Object.entries(PREFERIDO)) tokens[hex] = nombre

const UTILIDAD = /(?<![\w-])(text|bg|border(?:-[trblxyse])?|ring|fill|stroke|divide|outline|decoration|placeholder|caret|accent|from|to|via)-\[(#[0-9a-fA-F]{6})\]/g

function archivos(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n)
    if (statSync(p).isDirectory()) return archivos(p)
    return ['.ts', '.tsx', '.mdx'].includes(extname(p)) ? [p] : []
  })
}

const porToken = {}
const sinToken = {}
let total = 0
for (const archivo of [...archivos(join(RAIZ, 'src')), ...archivos(join(RAIZ, '.storybook'))]) {
  const original = readFileSync(archivo, 'utf8')
  const nuevo = original.replace(UTILIDAD, (m, util, hex) => {
    const token = tokens[hex.toLowerCase()]
    if (!token) {
      sinToken[hex.toLowerCase()] = (sinToken[hex.toLowerCase()] ?? 0) + 1
      return m
    }
    porToken[token] = (porToken[token] ?? 0) + 1
    total++
    return `${util}-${token}`
  })
  if (nuevo !== original && !check) writeFileSync(archivo, nuevo)
}

console.log(`${check ? 'Se reemplazarían' : 'Reemplazados'}: ${total} usos con ${Object.keys(porToken).length} tokens`)
console.table(Object.entries(porToken).sort((a, b) => b[1] - a[1]).map(([token, usos]) => ({ token, usos })))
const resto = Object.entries(sinToken).sort((a, b) => b[1] - a[1])
console.log(`Sin token (quedan escritos a mano): ${resto.reduce((n, [, c]) => n + c, 0)} usos, ${resto.length} valores`)
