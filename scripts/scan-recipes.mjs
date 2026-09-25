/* Lee el código de la app con el compilador de TypeScript y arma un inventario
   de las "recetas" visuales que se repiten: botones, campos, tarjetas y
   celdas de tabla. Una receta es el conjunto de clases de aspecto (color,
   borde, radio, sombra, tipografía, estados) de un elemento; el tamaño y la
   posición no cuentan.

   Salida: src/design-system/generated/recipes.json, que lee Storybook
   (Patterns / Buttons, Inputs, Cards y Tables). Se regenera antes de cada
   build de Storybook, así que siempre refleja el código actual.

     node scripts/scan-recipes.mjs

   Ver design-reference/design-system.md. */
import ts from 'typescript'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, extname, relative } from 'node:path'

const RAIZ = new URL('..', import.meta.url).pathname
const SRC = join(RAIZ, 'src')
const archivos = (d) =>
  readdirSync(d).flatMap((n) => {
    const p = join(d, n)
    return statSync(p).isDirectory() ? archivos(p) : [p]
  })
const fuentes = archivos(SRC).filter(
  (p) => extname(p) === '.tsx' && !p.includes('.stories.') && !p.includes('/design-system/'),
)

/* Clases que sólo dicen tamaño o posición: no forman parte de la receta. */
const LAYOUT =
  /^(?:w-|h-|min-|max-|size-|p[trblxy]?-|m[trblxy]?-|-m|gap-|space-|flex|grid|col-|row-|items-|justify-|self-|shrink|grow|basis|order-|overflow|absolute|relative|fixed|sticky|inset|top-|left-|right-|bottom-|z-|whitespace|truncate|block|inline|hidden|sr-only|leading-|tracking-|cursor|select-|pointer-events|transition|duration|animate|motion|origin|transform|translate|scale|rotate|aspect|object-|line-clamp|break-|list-|float|clear|text-(?:left|right|center)|uppercase|lowercase|capitalize|underline-offset)/
const VISUAL = /^(?:bg-|text-|border|rounded|shadow|font-|ring|outline|opacity|placeholder|accent-|fill-|stroke-|divide-|underline|hover:|focus|active:|disabled:|aria-|data-|group-|peer-|first:|last:|odd:|even:)/
const TAMANO_TEXTO = /^text-(?:\[[\d.]+px\]|xs|sm|base|lg|xl|\d?xl)$/

const sinVariante = (c) => c.replace(/^(?:[^\s:]+:)+/, '')

function literales(nodo) {
  const salida = []
  ;(function visitar(n) {
    if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) salida.push(n.text)
    else if (ts.isIdentifier(n) && constantes.has(n.text) && !(n.parent && ts.isPropertyAccessExpression(n.parent) && n.parent.name === n)) salida.push(constantes.get(n.text))
    else if (ts.isTemplateExpression(n)) {
      salida.push(n.head.text)
      n.templateSpans.forEach((s) => salida.push(s.literal.text))
    } else ts.forEachChild(n, visitar)
  })(nodo)
  return salida.join(' ').split(/\s+/).filter(Boolean)
}

/* Clases que se aplican siempre: el literal directo, o los argumentos de
   cn()/clsx() que no dependen de una condición. */
function incondicionales(expr) {
  if (!expr) return []
  if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) return expr.text.split(/\s+/).filter(Boolean)
  if (ts.isJsxExpression(expr) && expr.expression) return incondicionales(expr.expression)
  if (ts.isIdentifier(expr) && constantes.has(expr.text)) return constantes.get(expr.text).split(/\s+/).filter(Boolean)
  if (ts.isCallExpression(expr))
    return expr.arguments.flatMap((a) => {
      if (ts.isStringLiteral(a) || ts.isNoSubstitutionTemplateLiteral(a)) return a.text.split(/\s+/).filter(Boolean)
      if (ts.isIdentifier(a) && constantes.has(a.text)) return constantes.get(a.text).split(/\s+/).filter(Boolean)
      return []
    })
  if (ts.isTemplateExpression(expr)) return [expr.head.text, ...expr.templateSpans.map((s) => s.literal.text)].join(' ').split(/\s+/).filter(Boolean)
  return []
}

function etiqueta(elemento, sf) {
  const padre = elemento.parent
  if (!ts.isJsxElement(padre)) return ''
  return padre.children
    .map((h) => (ts.isJsxText(h) ? h.text : ts.isJsxExpression(h) && h.expression && ts.isStringLiteral(h.expression) ? h.expression.text : ''))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 40)
}

/* Constantes de clases declaradas a nivel de módulo (`const BOTON = '...'`,
   `export const ICONO_SUELTO = '...'`). Se resuelven por nombre, en el mismo
   archivo o importadas, para que las recetas que viven en constantes también
   cuenten. */
const constantes = new Map()
function textoDe(expr) {
  if (!expr) return null
  if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) return expr.text
  if (ts.isBinaryExpression(expr) && expr.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const a = textoDe(expr.left)
    const b = textoDe(expr.right)
    return a !== null && b !== null ? a + b : null
  }
  if (ts.isParenthesizedExpression(expr)) return textoDe(expr.expression)
  return null
}
for (const archivo of fuentes.concat(archivos(join(SRC, 'lib')).filter((p) => extname(p) === '.ts'))) {
  const sf = ts.createSourceFile(archivo, readFileSync(archivo, 'utf8'), ts.ScriptTarget.Latest, true, archivo.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS)
  sf.statements.forEach((st) => {
    if (!ts.isVariableStatement(st)) return
    st.declarationList.declarations.forEach((d) => {
      if (ts.isIdentifier(d.name)) {
        const t = textoDe(d.initializer)
        if (t !== null && /[a-z]-|hover:|border|rounded/.test(t)) constantes.set(d.name.text, t)
      }
    })
  })
}

const recetas = new Map()

function registrar(tipo, tag, todas, base, archivo, linea, texto) {
  const visuales = [...new Set(todas.filter((c) => VISUAL.test(sinVariante(c)) || VISUAL.test(c)))]
    .filter((c) => !TAMANO_TEXTO.test(sinVariante(c)) && !LAYOUT.test(sinVariante(c)))
    .sort()
  const firma = visuales.join(' ')
  const id = `${tipo}-${createHash('sha1').update(firma).digest('hex').slice(0, 8)}`
  const r = recetas.get(id) ?? { id, tipo, tag, firma, clases: base.join(' '), etiqueta: texto, usos: [] }
  if (!r.etiqueta && texto) r.etiqueta = texto
  r.usos.push({ archivo, linea })
  recetas.set(id, r)
}

for (const archivo of fuentes) {
  const sf = ts.createSourceFile(archivo, readFileSync(archivo, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const rel = relative(RAIZ, archivo)
  ;(function visitar(n) {
    if (ts.isJsxOpeningElement(n) || ts.isJsxSelfClosingElement(n)) {
      const tag = n.tagName.getText(sf)
      const attr = n.attributes.properties.find((a) => ts.isJsxAttribute(a) && a.name.getText(sf) === 'className')
      if (attr?.initializer) {
        const todas = literales(attr.initializer)
        const base = incondicionales(attr.initializer)
        const linea = sf.getLineAndCharacterOfPosition(n.getStart(sf)).line + 1
        const texto = etiqueta(n, sf)
        if (tag === 'button') registrar('button', tag, todas, base, rel, linea, texto)
        else if (['input', 'select', 'textarea'].includes(tag)) registrar('field', tag, todas, base, rel, linea, texto)
        else if (['table', 'th', 'td'].includes(tag)) registrar('table', tag, todas, base, rel, linea, texto)
        else if (['div', 'section', 'article', 'aside', 'li'].includes(tag)) {
          const b = new Set(base.map(sinVariante))
          const esTarjeta = b.has('bg-white') && b.has('border') && [...b].some((c) => /^rounded-(md|lg|xl|2xl)$/.test(c))
          if (esTarjeta) registrar('card', tag, todas, base, rel, linea, texto)
        } else if (tag === 'span') {
          const b = new Set(base.map(sinVariante))
          if (b.has('rounded-full') && b.has('border') && [...b].some((c) => /^text-\[(9|10|11|12)px\]$/.test(c)))
            registrar('pill', tag, todas, base, rel, linea, texto)
        }
      }
    }
    ts.forEachChild(n, visitar)
  })(sf)
}

const lista = [...recetas.values()]
  .map((r) => ({ ...r, cantidad: r.usos.length, archivos: new Set(r.usos.map((u) => u.archivo)).size }))
  .sort((a, b) => b.cantidad - a.cantidad)

mkdirSync(join(SRC, 'design-system/generated'), { recursive: true })
writeFileSync(join(SRC, 'design-system/generated/recipes.json'), JSON.stringify(lista, null, 1))

const resumen = {}
for (const r of lista) resumen[r.tipo] = { recetas: (resumen[r.tipo]?.recetas ?? 0) + 1, usos: (resumen[r.tipo]?.usos ?? 0) + r.cantidad }
console.log('Recetas leídas del código:', resumen)
