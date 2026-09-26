import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`/* Mide una tabla ya dibujada: abre su story en un iframe y lee el DOM y los
   estilos calculados. Así lo que dice Audit / Tables in the app sale de lo que la app
   dibuja hoy, no de una descripción escrita a mano que se desactualiza. */

export type Medida = {
  construccion: 'table' | 'div'
  columnas: string[]
  contenedor: { radio: string; borde: string; fondo: string; conRelleno: boolean }
  encabezado: { fondo: string; texto: string; color: string; mayusculas: boolean; alto: number }
  fila: { alto: number; texto: string; color: string; divisor: string } | null
  dentro: string[]
  alrededor: string[]
}

const TOKENS = [
  'ink', 'ink-soft', 'ink-medium', 'ink-muted', 'ink-slate', 'ink-faint',
  'line', 'line-strong', 'line-row', 'line-soft', 'line-hair',
  'surface-subtle', 'surface-muted', 'surface-alt', 'surface-slate', 'page-background',
]

/* rgb() calculado → nombre del token de index.css que da ese color. */
function mapaDeColores() {
  const m = new Map<string, string[]>([['rgb(255, 255, 255)', ['white']]])
  const sonda = document.createElement('span')
  document.body.appendChild(sonda)
  for (const t of TOKENS) {
    sonda.style.color = \`var(--color-\${t})\`
    const c = getComputedStyle(sonda).color
    m.set(c, [...(m.get(c) ?? []), t])
  }
  sonda.remove()
  return m
}

const px = (v: string) => Math.round(parseFloat(v) * 10) / 10
export const moda = (v: string[]) => {
  const c = new Map<string, number>()
  for (const x of v) c.set(x, (c.get(x) ?? 0) + 1)
  return [...c].sort((a, b) => b[1] - a[1])[0]?.[0] ?? ''
}
const transparente = (c: string) => c === 'rgba(0, 0, 0, 0)' || c === 'transparent'

export function medir(doc: Document): Medida | null {
  const raiz = doc.querySelector('#storybook-root') ?? doc.body
  const vista = doc.defaultView
  if (!vista) return null
  const cs = (e: Element) => vista.getComputedStyle(e)
  const colores = mapaDeColores()
  const nombre = (c: string) => (transparente(c) ? 'transparent' : (colores.get(c)?.join(' = ') ?? c))

  /* Las tablas nativas: se ignora la de argumentos que Storybook monta oculta. */
  const nativas = [...raiz.querySelectorAll('table')].filter((t) => !t.closest('.docblock-argstable, .sb-argstableBlock'))
  const hojas = (e: Element) => [...e.querySelectorAll('*')].filter((h) => !h.children.length && h.textContent?.trim())

  let encabezado: Element | null = null
  let fila: Element | null = null
  let construccion: Medida['construccion'] = 'div'
  if (nativas.length) {
    construccion = 'table'
    encabezado = nativas[0]!.querySelector('thead tr')
    fila = nativas[0]!.querySelector('tbody tr')
  } else {
    /* Fila de encabezado: la primera con fondo propio cuyos textos son, todos,
       etiquetas chicas y en negrita (así no se confunde con una tarjeta de
       totales, que mezcla títulos con cifras grandes). */
    encabezado =
      [...raiz.querySelectorAll('div')].find((e) => {
        if (e.children.length < 3 || transparente(cs(e).backgroundColor)) return false
        const t = hojas(e)
        return t.length >= 3 && t.every((h) => px(cs(h).fontSize) <= 12 && parseInt(cs(h).fontWeight) >= 600)
      }) ?? null
    if (encabezado) {
      /* Primera fila de datos: el primer elemento después del encabezado con
         varias celdas; si viene envuelto (fila expandible), se sube al envoltorio. */
      const despues = [...raiz.querySelectorAll('div')].find(
        (e) => !encabezado!.contains(e) && !!(encabezado!.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING) && e.children.length >= 3,
      )
      fila = despues ?? null
      while (fila && fila.parentElement && fila.parentElement !== encabezado.parentElement && fila.parentElement.children.length === 1) fila = fila.parentElement
    }
  }
  if (!encabezado) return null

  let contenedor: Element | null = encabezado
  while (contenedor && !(px(cs(contenedor).borderTopWidth) > 0 && px(cs(contenedor).borderTopLeftRadius) > 0)) contenedor = contenedor.parentElement
  if (!contenedor) return null

  const etiquetas = hojas(encabezado)
  const primera = etiquetas[0] ?? encabezado
  const eh = cs(primera)
  const ec = cs(encabezado)

  let medidaFila: Medida['fila'] = null
  if (fila) {
    const celdas = fila.tagName === 'TR' ? [...fila.querySelectorAll('td')] : [...fila.querySelectorAll(':scope > *')]
    /* El texto de la fila es el de las celdas de texto plano: se descartan los
       links, botones, avatares y pastillas, que tienen su propio estilo. */
    const plano = (h: Element) => {
      for (let e: Element | null = h; e && e !== fila; e = e.parentElement) {
        if (e.tagName === 'A' || e.tagName === 'BUTTON' || (typeof e.className === 'string' && /rounded-full/.test(e.className))) return false
      }
      return true
    }
    const planos = hojas(fila).filter(plano)
    const fs = cs(fila)
    const celda = fila.tagName === 'TR' && celdas[0] ? cs(celdas[0]) : null
    const lado = (e: CSSStyleDeclaration) => (px(e.borderTopWidth) > 0 ? \`\${px(e.borderTopWidth)}px \${nombre(e.borderTopColor)}\` : px(e.borderBottomWidth) > 0 ? \`\${px(e.borderBottomWidth)}px \${nombre(e.borderBottomColor)}\` : '')
    medidaFila = {
      alto: Math.round(fila.getBoundingClientRect().height),
      texto: planos.length ? moda(planos.map((h) => \`\${px(cs(h).fontSize)}px\`)) : '',
      color: planos.length ? moda(planos.map((h) => nombre(cs(h).color))) : '',
      divisor: lado(fs) || (celda ? lado(celda) : '') || 'none',
    }
  }

  const dentro: string[] = []
  const c = contenedor
  const hay = (sel: string) => !!c.querySelector(sel)
  if (hay('input[type="checkbox"], [role="checkbox"]')) dentro.push('Selection')
  if (hay('[aria-haspopup="menu"]')) dentro.push('Row menu')
  if ([...c.querySelectorAll('[class*="rounded-full"][class*="border"]')].some((p) => (p.textContent ?? '').trim().length > 0 && (p.textContent ?? '').length < 24)) dentro.push('Status pills')
  if (/Showing/.test(c.textContent ?? '')) dentro.push('“Showing X of N” counter')
  if ([...c.querySelectorAll('button')].some((b) => /Previous|Next/.test(b.textContent ?? '') || /page|previous|next/i.test(b.getAttribute('aria-label') ?? ''))) dentro.push('Pagination')
  if (hay('[draggable="true"]')) dentro.push('Drag to reorder')
  if (hay('[role="separator"]')) dentro.push('Resizable columns')
  if (hay('[aria-expanded]:not([aria-haspopup])')) dentro.push('Expandable rows')

  const alrededor: string[] = []
  const region = contenedor.parentElement ?? contenedor
  const botones = [...region.querySelectorAll('button')]
  if (region.querySelector('input[placeholder*="Search" i], input[type="search"]')) alrededor.push('Search')
  if (region.querySelector('select') || botones.some((b) => /filter/i.test(\`\${b.textContent} \${b.getAttribute('aria-label') ?? ''}\`))) alrededor.push('Filter')
  if (botones.some((b) => /^\\s*Columns/.test(b.textContent ?? ''))) alrededor.push('Column picker')
  if (region.querySelector('[role="tab"]')) alrededor.push('Tabs')

  const cc = cs(contenedor)
  return {
    construccion,
    columnas: [...new Set(etiquetas.map((h) => (h.textContent ?? '').trim()).filter(Boolean))],
    contenedor: { radio: \`\${px(cc.borderTopLeftRadius)}px\`, borde: nombre(cc.borderTopColor), fondo: nombre(cc.backgroundColor), conRelleno: px(cc.paddingTop) >= 8 },
    encabezado: {
      fondo: nombre(ec.backgroundColor),
      texto: \`\${px(eh.fontSize)}px \${eh.fontWeight === '700' ? 'bold' : parseInt(eh.fontWeight) >= 600 ? 'semibold' : parseInt(eh.fontWeight) >= 500 ? 'medium' : 'regular'}\`,
      color: nombre(eh.color),
      mayusculas: eh.textTransform === 'uppercase',
      alto: Math.round(encabezado.getBoundingClientRect().height),
    },
    fila: medidaFila,
    dentro,
    alrededor,
  }
}

/* Carga un story en el iframe y espera a que termine de dibujarse. */
export function cargar(iframe: HTMLIFrameElement, src: string, limiteMs = 20000): Promise<boolean> {
  return new Promise((resolver) => {
    const t = setTimeout(() => resolver(false), limiteMs)
    iframe.onload = () => {
      clearTimeout(t)
      resolver(true)
    }
    iframe.src = src
  })
}

export async function esperarYMedir(iframe: HTMLIFrameElement, limiteMs = 12000): Promise<Medida | null> {
  const fin = Date.now() + limiteMs
  while (Date.now() < fin) {
    const w = iframe.contentWindow as (Window & { __STORYBOOK_PREVIEW__?: { currentRender?: { phase?: string } } }) | null
    const fase = w?.__STORYBOOK_PREVIEW__?.currentRender?.phase
    const listo = (fase === 'completed' || fase === 'finished') && !!iframe.contentDocument?.querySelector('#storybook-root')?.children.length
    if (listo) {
      await new Promise((r) => setTimeout(r, 400))
      try {
        const m = iframe.contentDocument ? medir(iframe.contentDocument) : null
        if (m) return m
      } catch {
        return null
      }
    }
    await new Promise((r) => setTimeout(r, 250))
  }
  return null
}
`})))()}n();export{t as default};