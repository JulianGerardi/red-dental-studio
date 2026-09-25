/* Lee el código de la app con el compilador de TypeScript y arma un inventario
   de las "recetas" visuales que se repiten: botones, campos, tarjetas y
   celdas de tabla. Una receta es el conjunto de clases de aspecto (color,
   borde, radio, sombra, tipografía, estados) de un elemento; el tamaño y la
   posición no cuentan.

   Cuando el className tiene condicionales (`cond ? 'a' : 'b'`, `cond && 'x'`,
   cn(...), clsx({...}), plantillas con `${...}`), cada combinación posible es
   un "look" distinto y coherente: nunca se mezclan las dos ramas de un mismo
   condicional. Un elemento puede así aportar varios looks, cada uno con la
   condición que lo activa.

   Salida: src/design-system/generated/recipes.json (los looks) y
   recipes-meta.json (cuántos elementos hay de cada tipo), que lee Storybook
   (Patterns / Buttons, Fields, Cards, Pills y Tables). Se regenera antes de
   cada build de Storybook, así que siempre refleja el código actual.

     node scripts/scan-recipes.mjs

   Ver design-reference/design-system.md. */
import ts from 'typescript'
import { twMerge } from 'tailwind-merge'
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
  (p) => extname(p) === '.tsx' && !p.includes('.stories.') && !p.includes('/design-system/') && !p.endsWith('/components/ui/button.tsx'),
)

/* Clases que sólo dicen tamaño o posición: no forman parte de la receta. */
const LAYOUT =
  /^(?:w-|h-|min-|max-|size-|p[trblxy]?-|m[trblxy]?-|-m|gap-|space-|flex|grid|col-|row-|items-|justify-|self-|shrink|grow|basis|order-|overflow|absolute|relative|fixed|sticky|inset|top-|left-|right-|bottom-|z-|whitespace|truncate|block|inline|hidden|sr-only|leading-|tracking-|cursor|select-|pointer-events|transition|duration|animate|motion|origin|transform|translate|scale|rotate|aspect|object-|line-clamp|break-|list-|float|clear|text-(?:left|right|center)|uppercase|lowercase|capitalize|underline-offset)/
const VISUAL = /^(?:bg-|text-|border|rounded|shadow|font-|ring|outline|opacity|placeholder|accent-|fill-|stroke-|divide-|underline|hover:|focus|active:|disabled:|aria-|data-|group-|peer-|first:|last:|odd:|even:)/
const TAMANO_TEXTO = /^text-(?:\[[\d.]+px\]|xs|sm|base|lg|xl|\d?xl)$/

const sinVariante = (c) => c.replace(/^(?:[^\s:]+:)+/, '')

/* ── Alternativas de un className ─────────────────────────────────────────
   alt(expr) devuelve todas las combinaciones que puede tomar la expresión:
   [{ clases: [...], conds: [...] }]. `conds` guarda, en texto, las condiciones
   que hay que cumplir para que se dé esa combinación ("!disabled"). */
const MAX_ALT = 32
const NEGADA = (c) => (c.startsWith('!') ? c.slice(1) : `!${c}`)
const vacio = () => [{ clases: [], conds: [] }]
const partir = (t) => t.split(/\s+/).filter((c) => c && !c.endsWith('-') && !c.startsWith('${'))
let truncados = 0

function contradice(conds) {
  const s = new Set(conds)
  return conds.some((c) => s.has(NEGADA(c)))
}

function producto(listas) {
  let acc = vacio()
  for (const lista of listas) {
    const sig = []
    for (const a of acc)
      for (const b of lista) {
        const conds = [...new Set([...a.conds, ...b.conds])]
        if (contradice(conds)) continue
        sig.push({ clases: [...a.clases, ...b.clases], conds })
      }
    if (sig.length > MAX_ALT) {
      truncados++
      sig.length = MAX_ALT
    }
    if (sig.length) acc = sig
  }
  return acc
}

const conCond = (alts, cond) => alts.map((a) => ({ clases: a.clases, conds: [...new Set([...a.conds, cond])] }))
const sinDuplicados = (alts) => {
  const vistos = new Set()
  return alts.filter((a) => {
    const k = [...a.clases].sort().join(' ') + '|' + [...a.conds].sort().join(' & ')
    return vistos.has(k) ? false : (vistos.add(k), true)
  })
}
const FUNCIONES_CLASES = new Set(['cn', 'clsx', 'classNames', 'twMerge', 'cx'])

function alt(expr, sf) {
  if (!expr) return vacio()
  if (ts.isParenthesizedExpression(expr) || ts.isAsExpression(expr) || ts.isNonNullExpression(expr)) return alt(expr.expression, sf)
  if (ts.isJsxExpression(expr)) return expr.expression ? alt(expr.expression, sf) : vacio()
  if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) return [{ clases: partir(expr.text), conds: [] }]
  if (ts.isIdentifier(expr)) return constantes.has(expr.text) ? [{ clases: partir(constantes.get(expr.text)), conds: [] }] : vacio()
  if (ts.isTemplateExpression(expr))
    return sinDuplicados(
      producto([
        [{ clases: partir(expr.head.text), conds: [] }],
        ...expr.templateSpans.flatMap((s) => [alt(s.expression, sf), [{ clases: partir(s.literal.text), conds: [] }]]),
      ]),
    )
  if (ts.isConditionalExpression(expr)) {
    const c = expr.condition.getText(sf).replace(/\s+/g, ' ').slice(0, 60)
    return sinDuplicados([...conCond(alt(expr.whenTrue, sf), c), ...conCond(alt(expr.whenFalse, sf), NEGADA(c))])
  }
  if (ts.isBinaryExpression(expr)) {
    const op = expr.operatorToken.kind
    if (op === ts.SyntaxKind.AmpersandAmpersandToken) {
      const c = expr.left.getText(sf).replace(/\s+/g, ' ').slice(0, 60)
      return sinDuplicados([...conCond(alt(expr.right, sf), c), { clases: [], conds: [NEGADA(c)] }])
    }
    if (op === ts.SyntaxKind.PlusToken) return sinDuplicados(producto([alt(expr.left, sf), alt(expr.right, sf)]))
    if (op === ts.SyntaxKind.BarBarToken || op === ts.SyntaxKind.QuestionQuestionToken) return sinDuplicados([...alt(expr.left, sf), ...alt(expr.right, sf)])
  }
  if (ts.isCallExpression(expr)) {
    const callee = expr.expression.getText(sf)
    if (FUNCIONES_CLASES.has(callee)) return sinDuplicados(producto(expr.arguments.map((a) => alt(a, sf))))
    if (ts.isPropertyAccessExpression(expr.expression) && expr.expression.name.text === 'join') return alt(expr.expression.expression, sf)
    if (ts.isPropertyAccessExpression(expr.expression) && expr.expression.name.text === 'filter') return alt(expr.expression.expression, sf)
  }
  if (ts.isArrayLiteralExpression(expr)) return sinDuplicados(producto(expr.elements.map((a) => alt(a, sf))))
  if (ts.isObjectLiteralExpression(expr)) {
    const props = expr.properties.filter(ts.isPropertyAssignment).map((p) => {
      const clave = ts.isStringLiteral(p.name) || ts.isIdentifier(p.name) ? p.name.text : null
      if (clave === null) return vacio()
      const c = p.initializer.getText(sf).replace(/\s+/g, ' ').slice(0, 60)
      return [{ clases: partir(clave), conds: [c] }, { clases: [], conds: [NEGADA(c)] }]
    })
    return sinDuplicados(producto(props))
  }
  return vacio()
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
/* Cuántos elementos hay de cada tipo (un elemento puede dar varios looks). */
const elementos = {}
let usosDeButtonUI = 0
const DESHABILITADO = /disabled|deshabilit|bloquead|locked|readonly/i

/* Qué estados define un look, mirando las clases con prefijo. El foco se
   clasifica aparte: puede estar definido, quitado sin reemplazo (outline-none
   y nada más: en teclado no se ve dónde estás) o no definido, y en ese caso
   el navegador dibuja su anillo por defecto. */
function estadosDe(clases, conds) {
  const con = (re) => clases.some((c) => re.test(c))
  const base = new Set(clases.filter((c) => !c.includes(':')))
  /* Un hover que pinta lo mismo que la base (`bg-x hover:bg-x`) no cambia nada. */
  const hovers = clases.filter((c) => /(^|:)hover:/.test(c) && !/^(?:group|peer)-/.test(c))
  const hoverEfectivo = hovers.some((c) => !base.has(c.split(':').pop()))
  const focos = clases.filter((c) => /^(?:[^\s:]+:)*(?:focus|focus-visible|focus-within):/.test(c))
  const quita = focos.some((c) => /:(?:outline-none|outline-0|ring-0|outline-hidden)$/.test(c))
  const otrosVisibles = focos.some((c) => /:(?:ring-(?!0)|ring$|border|bg-|shadow|text-|underline|opacity)/.test(c))
  /* Con `outline-none` de base, `focus-visible:outline-2` no dibuja nada: la
     utilidad deja el estilo en `none` y el ancho no alcanza. Hace falta un
     `outline-solid` en el foco. */
  const outlineDeclarado = focos.some((c) => /:outline-(?!none|0$|hidden|offset)/.test(c))
  const outlineVisible = outlineDeclarado && (!base.has('outline-none') || focos.some((c) => /:outline-(?:solid|dashed|dotted|double)$/.test(c)) || con(/^(?:[^\s:]+:)*\[outline-style:(?:solid|dashed|dotted|double)\]$/))
  const pone = otrosVisibles || outlineVisible
  return {
    hover: hoverEfectivo,
    hoverSinEfecto: hovers.length > 0 && !hoverEfectivo,
    hoverGrupo: con(/(^|:)(?:group|peer)-hover(?:\/[^:]+)?:/),
    foco: pone ? 'definido' : quita ? 'quitado' : outlineDeclarado ? 'invisible' : 'navegador',
    activo: con(/(^|:)active:/),
    deshabilitado: con(/(^|:)(?:disabled|aria-disabled|data-\[disabled\]):|-disabled(?:-foreground)?$|cursor-not-allowed/) || conds.some((c) => !c.startsWith('!') && DESHABILITADO.test(c)),
    deshabilitadoPorAtributo: con(/(^|:)disabled:/),
  }
}

/* Igual que en la app: si el className sale de cn(), las clases que se pisan
   entre sí (text-ink y text-white, hover:bg-white y hover:bg-blue) se resuelven
   con twMerge y queda la última. */
const usaCn = (attr) => {
  let e = attr.initializer
  if (e && ts.isJsxExpression(e)) e = e.expression
  return !!e && ts.isCallExpression(e) && ['cn', 'twMerge'].includes(e.expression.getText())
}

function registrar(tipo, tag, alts, archivo, linea, texto, cuentaElemento, fusionar) {
  const vistos = new Set()
  for (const a0 of alts) {
    const a = fusionar ? { ...a0, clases: twMerge(a0.clases.join(' ')).split(/\s+/).filter(Boolean) } : a0
    const visuales = [...new Set(a.clases.filter((c) => VISUAL.test(sinVariante(c)) || VISUAL.test(c)))]
      .filter((c) => !TAMANO_TEXTO.test(sinVariante(c)) && !LAYOUT.test(sinVariante(c)))
      .sort()
    const firma = visuales.join(' ')
    const id = `${tipo}-${createHash('sha1').update(firma).digest('hex').slice(0, 8)}`
    if (!cuentaElemento(a)) continue
    const r = recetas.get(id) ?? { id, tipo, tag, firma, clases: [...new Set(a.clases)].join(' '), etiqueta: texto, estados: estadosDe(a.clases, a.conds), usos: [] }
    if (!r.etiqueta && texto) r.etiqueta = texto
    /* Si el look sale de varios elementos, el estado "deshabilitado por
       condición" se acumula: alcanza con que uno lo tenga. */
    if (a.conds.some((c) => !c.startsWith('!') && DESHABILITADO.test(c))) r.estados.deshabilitado = true
    const cuando = a.conds.join(' && ')
    if (!vistos.has(id)) {
      vistos.add(id)
      r.usos.push(cuando ? { archivo, linea, cuando } : { archivo, linea })
    }
    recetas.set(id, r)
  }
}

for (const archivo of fuentes) {
  const sf = ts.createSourceFile(archivo, readFileSync(archivo, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const rel = relative(RAIZ, archivo)
  ;(function visitar(n) {
    if (ts.isJsxOpeningElement(n) || ts.isJsxSelfClosingElement(n)) {
      const tag = n.tagName.getText(sf)
      if (tag === 'Button') usosDeButtonUI++
      const attr = n.attributes.properties.find((a) => ts.isJsxAttribute(a) && a.name.getText(sf) === 'className')
      if (attr?.initializer) {
        const alts = alt(attr.initializer, sf)
        const linea = sf.getLineAndCharacterOfPosition(n.getStart(sf)).line + 1
        const texto = etiqueta(n, sf)
        const siempre = () => true
        let tipo = null
        let filtro = siempre
        if (tag === 'button') tipo = 'button'
        else if (['input', 'select', 'textarea'].includes(tag)) tipo = 'field'
        else if (['table', 'th', 'td'].includes(tag)) tipo = 'table'
        else if (['div', 'section', 'article', 'aside', 'li'].includes(tag)) {
          tipo = 'card'
          filtro = (a) => {
            const b = new Set(a.clases.map(sinVariante))
            return b.has('bg-white') && b.has('border') && [...b].some((c) => /^rounded-(md|lg|xl|2xl)$/.test(c))
          }
        } else if (tag === 'span') {
          tipo = 'pill'
          filtro = (a) => {
            const b = new Set(a.clases.map(sinVariante))
            return b.has('rounded-full') && b.has('border') && [...b].some((c) => /^text-\[(9|10|11|12)px\]$/.test(c))
          }
        }
        if (tipo) {
          /* Un elemento cuenta una sola vez aunque dé varios looks. */
          if (alts.some(filtro)) elementos[tipo] = (elementos[tipo] ?? 0) + 1
          registrar(tipo, tag, alts, rel, linea, texto, filtro, usaCn(attr))
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
writeFileSync(join(SRC, 'design-system/generated/recipes-meta.json'), JSON.stringify({ elementos, usosDeButtonUI, truncados }, null, 1))

const resumen = {}
for (const r of lista) resumen[r.tipo] = { looks: (resumen[r.tipo]?.looks ?? 0) + 1, elementos: elementos[r.tipo] }
console.log('Looks leídos del código:', resumen, truncados ? `(${truncados} combinaciones truncadas)` : '')
