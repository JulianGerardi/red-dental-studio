// Campos de los drawers: abre cada story de Storybook y mide los campos de los drawers abiertos. Por fila, mismo ancho y
// alineados a la grilla de dos columnas; en un mismo paso, nada de mezclar campos cortos de media columna y de ancho
// entero. Regla en Components / UI / Drawer → Specs → Fields.
// Uso: con Storybook andando (npm run storybook), `npm run ds:campos [-- filtro]`. STORYBOOK_URL y CHROMIUM_PATH opcionales.
import { chromium } from 'playwright-core'

const BASE = process.env.STORYBOOK_URL ?? 'http://localhost:6006'
const filtro = process.argv[2]
const index = await (await fetch(`${BASE}/index.json`)).json()
let ids = Object.values(index.entries).filter((e) => e.type === 'story').map((e) => e.id)
if (filtro) ids = ids.filter((id) => id.includes(filtro))

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {})
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })

/* Corre en la página: devuelve los problemas de cada drawer abierto. */
function medir() {
  const dlgs = [...document.querySelectorAll('[role=dialog]')].filter((d) => d.getBoundingClientRect().width > 300)
  const out = []
  for (const dlg of dlgs) {
    const titulo = dlg.querySelector('h2')?.textContent?.trim() ?? '(sin título)'
    const body = [...dlg.querySelectorAll('div')].find((d) => String(d.className).includes('overflow-y-auto') && String(d.className).includes('px-6'))
    if (!body) continue
    const cs = getComputedStyle(body)
    const izq = body.getBoundingClientRect().left + parseFloat(cs.paddingLeft)
    const W = body.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)
    const mitad = (W - 16) / 2
    const controles = [...body.querySelectorAll('input, textarea, button[aria-expanded], button[aria-haspopup]')]
      .filter((el) => {
        if (['checkbox', 'radio', 'hidden', 'file', 'range'].includes(el.type)) return false
        if (el.closest('table, [role=table], [role=row], [role=menu], [role=listbox], [role=tablist], [role=grid]')) return false
        const r = el.getBoundingClientRect()
        if (r.width < 2 || r.height < 2) return false
        return el.tagName === 'TEXTAREA' || (r.height >= 30 && r.height <= 44)
      })
      .map((el) => {
        const r = el.getBoundingClientRect()
        const lbl = el.closest('label, div.flex-col')?.querySelector('span')?.textContent?.trim() || el.getAttribute('aria-label') || el.getAttribute('placeholder') || ''
        /* Una búsqueda (lupa al lado) o la barra de una tabla (con su botón Filter) no son campos de la grilla. */
        const busqueda = el.tagName === 'INPUT' && !!el.parentElement?.querySelector('svg.lucide-search')
        return { top: Math.round(r.top), left: Math.round(r.left - izq), w: Math.round(r.width * 10) / 10, h: Math.round(r.height), tag: el.tagName, lbl, busqueda }
      })
      .sort((a, b) => a.top - b.top || a.left - b.left)
    const filas = []
    for (const c of controles) {
      const f = filas.find((x) => Math.abs(x.top - c.top) <= 3)
      if (f) f.campos.push(c)
      else filas.push({ top: c.top, campos: [c] })
    }
    const problemas = []
    for (const { campos } of filas) {
      if (campos.some((c) => c.busqueda)) continue
      const ws = campos.map((c) => c.w)
      const desc = campos.map((c) => `${c.lbl} ${c.w}px`).join(' | ')
      if (campos.length >= 3) problemas.push(`tres o más por fila: ${desc}`)
      else if (campos.length === 2 && Math.max(...ws) - Math.min(...ws) > 2) problemas.push(`distinto ancho: ${desc}`)
      else if (campos.length === 2 && Math.abs(ws[0] - mitad) > 2) problemas.push(`par fuera de la grilla: ${desc}`)
      else if (campos.length === 1 && Math.abs(ws[0] - W) > 2 && Math.abs(ws[0] - mitad) > 2) problemas.push(`fuera de la grilla: ${desc}`)
      const altos = campos.filter((c) => c.tag !== 'TEXTAREA').map((c) => c.h)
      if (altos.length && Math.max(...altos) - Math.min(...altos) > 1) problemas.push(`distinto alto: ${desc}`)
    }
    const cortos = controles.filter((c) => c.tag !== 'TEXTAREA' && !c.busqueda)
    const enteros = cortos.filter((c) => Math.abs(c.w - W) <= 2)
    if (cortos.some((c) => Math.abs(c.w - mitad) <= 2) && enteros.length) {
      problemas.push(`mezcla media columna y ancho entero: ${enteros.map((c) => c.lbl).join(', ')}`)
    }
    if (problemas.length) out.push({ titulo, problemas })
  }
  return out
}

const hallados = []
let i = 0
async function trabajador() {
  const page = await ctx.newPage()
  while (i < ids.length) {
    const id = ids[i++]
    try {
      await page.goto(`${BASE}/iframe.html?id=${id}&viewMode=story`, { waitUntil: 'load', timeout: 20000 })
      await page.waitForSelector('#storybook-root > *, #storybook-docs > *', { timeout: 15000 }).catch(() => {})
      await page.waitForSelector('[role=dialog]', { timeout: 1500 }).catch(() => {})
      await page.waitForTimeout(500)
      for (const d of await page.evaluate(medir)) hallados.push({ id, ...d })
    } catch (e) {
      hallados.push({ id, titulo: 'error', problemas: [String(e).split('\n')[0]] })
    }
  }
  await page.close()
}
await Promise.all(Array.from({ length: 6 }, trabajador))
await browser.close()

/* Un mismo drawer aparece en varias stories: se informa una vez. */
const vistos = new Map()
for (const h of hallados) for (const p of h.problemas) if (!vistos.has(`${h.titulo} ${p}`)) vistos.set(`${h.titulo} ${p}`, h)
for (const [clave, h] of vistos) console.log(`✗ ${clave}\n    ${BASE}/?path=/story/${h.id}`)
console.log(vistos.size ? `\n${vistos.size} problemas en los campos de los drawers.` : `Campos de los drawers: ${ids.length} stories, sin problemas.`)
process.exit(vistos.size ? 1 : 0)
