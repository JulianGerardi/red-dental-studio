/* Genera src/styles/odontogram-scoped.css a partir del CSS que publica
   react-advanced-odontogram.

   Por qué hace falta: ese CSS es el de una app entera, no el de un
   componente -trae `*`, `html, body` y clases genéricas como `.btn`,
   `.card`, `.title`, `.pill`-. Importado tal cual pisa media app.
   Acá cada selector se prefija con `.odonto-embed`, los resets globales se
   acotan al contenedor y `:root` pasa a ser el propio contenedor, así las
   variables `--odon-*` siguen resolviendo.

   Correr con: npm run odontogram:css   (sólo al actualizar el paquete). */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import postcss from 'postcss'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ENTRADA = resolve(raiz, 'node_modules/react-advanced-odontogram/dist/style.css')
const SALIDA = resolve(raiz, 'src/styles/odontogram-scoped.css')
const SCOPE = '.odonto-embed'

function prefijar(selector) {
  return selector
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => {
      /* `:root` guarda las variables: pasa a ser el contenedor. */
      if (s === ':root' || s === 'html' || s === 'body' || s === 'html body') return SCOPE
      /* El reset universal se acota a los descendientes del contenedor. */
      if (s === '*') return `${SCOPE}, ${SCOPE} *`
      if (s.startsWith('*')) return `${SCOPE} ${s}`
      /* Un selector que ya arranca con el scope no se vuelve a prefijar. */
      if (s.startsWith(SCOPE)) return s
      /* `.odontogram-root` es el contenedor propio de la librería. */
      if (s.startsWith('.odontogram-root')) return `${SCOPE}${s.slice('.odontogram-root'.length) || ''}`
      return `${SCOPE} ${s}`
    })
    .join(', ')
}

const css = readFileSync(ENTRADA, 'utf8')
const raiz_css = postcss.parse(css)

raiz_css.walkRules((rule) => {
  /* Los selectores de dentro de un @keyframes son porcentajes, no elementos. */
  const padre = rule.parent
  if (padre && padre.type === 'atrule' && /keyframes/.test(padre.name)) return
  rule.selector = prefijar(rule.selector)
})

const cabecera = `/* GENERADO por scripts/scope-odontogram-css.mjs — no editar a mano.
   Fuente: react-advanced-odontogram (MIT, (c) Zoltán Dul)
   https://github.com/ZoliQua/React-Odontogram-Modul
   Cada selector va acotado a ${SCOPE} para que el CSS de la librería
   -que es el de una app entera- no se derrame sobre el resto de red-clone. */\n`

mkdirSync(dirname(SALIDA), { recursive: true })
writeFileSync(SALIDA, cabecera + raiz_css.toString() + '\n', 'utf8')

const reglas = []
raiz_css.walkRules(() => reglas.push(1))
console.log(`ok — ${reglas.length} reglas acotadas a ${SCOPE} → ${SALIDA.replace(raiz + '/', '')}`)
