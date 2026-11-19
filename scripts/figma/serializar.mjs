/* Corre adentro de la página (page.evaluate): devuelve la pantalla como HTML autocontenido para el importador de Figma.
   Cada capa sale con el nombre de su componente de React (aria-label) y el auto layout lo arma el importador a partir
   del flex/grid real. Ver design-reference/figma-docs.md. */
export async function serializar({ nombres, titulo, altoMax = 2600 }) {
  const SRC = new Set(nombres)
  /* Envoltorios que no dicen nada de la pieza: router, providers, tooltips y triggers de Radix. */
  const FUERA = /^(App|AppRoutes|Router)$|Provider$|Tooltip|Trigger$/
  /* Etiquetas a las que el importador ya les antepone su rol ("Header - …", "Navigation - …"). */
  const CON_ROL = { ASIDE: 'Sidebar', HEADER: 'Header', NAV: 'Navigation', MAIN: 'Main', FOOTER: 'Footer' }
  const GENERICOS = new Set(['Button', 'Link', 'NavLink', 'Input', 'Textarea', 'Label'])
  const clave = (el) => Object.keys(el).find((k) => k.startsWith('__reactFiber$'))
  const nombreDe = (t) => (typeof t === 'function' ? t.displayName || t.name
    : t && typeof t === 'object' ? t.displayName || nombreDe(t.render) || nombreDe(t.type) : null)

  /* Componentes del proyecto cuya raíz es este elemento, del más interno al más externo. */
  function componentes(el) {
    const k = clave(el)
    if (!k) return []
    const out = []
    for (let f = el[k].return; f && ![5, 3, 26, 27].includes(f.tag); f = f.return) {
      const n = nombreDe(f.type)
      if (n && SRC.has(n) && !FUERA.test(n) && out.at(-1) !== n) out.push(n)
    }
    return out
  }
  const pascal = (s) => s.split(/[-_\s]+/).map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('')
  const corto = (s) => (s || '').trim().replace(/\s+/g, ' ').slice(0, 40)

  /* [nombre, fuerte]: fuerte = sale de un componente o de un aria-label, no del layout. */
  const fuertes = new Map()
  function nombre(el) {
    const tag = el.tagName
    if (el.ownerSVGElement) return null
    const aria = el.getAttribute('aria-label')
    if (tag === 'svg') {
      const icono = [...el.classList].find((c) => c.startsWith('lucide-'))
      return icono ? icono.slice(7) : aria
    }
    const comps = componentes(el)
    const comp = comps.length ? (comps.at(-1) === comps[0] ? comps[0] : `${comps.at(-1)} / ${comps[0]}`) : ''
    if (tag === 'BUTTON' || tag === 'A') {
      const base = corto(aria || el.innerText || el.getAttribute('title'))
      const pref = comps.length && !GENERICOS.has(comps[0]) ? comp : ''
      return [pref, base].filter(Boolean).join(' · ') || null
    }
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
      return corto(aria || el.labels?.[0]?.innerText || el.getAttribute('placeholder') || el.getAttribute('name')) || null
    }
    const fuerte = comp && comp !== CON_ROL[tag] ? (aria ? `${comp} · ${corto(aria)}` : comp)
      : aria || (el.dataset.slot ? pascal(el.dataset.slot) : '')
    if (fuerte) { fuertes.set(el, fuerte); return fuerte }
    /* El importador funde un contenedor con su único hijo y se queda con el nombre del hijo: hereda el del padre. */
    const padre = el.parentElement
    if (padre?.childElementCount === 1 && fuertes.has(padre)) { fuertes.set(el, fuertes.get(padre)); return fuertes.get(padre) }
    if ((tag !== 'DIV' && tag !== 'SPAN') || el.getAttribute('role') || el.childElementCount < 2) return null
    const cs = getComputedStyle(el)
    if (cs.display.includes('grid')) return 'Grid'
    if (cs.display.includes('flex')) return cs.flexDirection.startsWith('column') ? 'Column' : 'Row'
    return null
  }

  /* Imágenes a data URI: el importador no baja recursos externos. */
  const datos = new Map()
  await Promise.all([...document.images].map(async (img) => {
    const src = img.currentSrc || img.src
    if (!src || src.startsWith('data:') || datos.has(src)) return
    datos.set(src, null)
    try {
      const blob = await (await fetch(src)).blob()
      datos.set(src, await new Promise((ok) => { const r = new FileReader(); r.onload = () => ok(r.result); r.readAsDataURL(blob) }))
    } catch { /* queda sin imagen */ }
  }))

  /* Los dibujos vectoriales pesados (cada diente del odontograma son cientos de trazos) van como imagen: en Figma
     serían miles de capas por pantalla. Se dibujan aparte, con sus estilos calculados, para no arrastrar lo que
     tengan encima. */
  const aDataUri = async (src) => {
    if (!datos.has(src)) {
      try {
        const blob = await (await fetch(src)).blob()
        datos.set(src, await new Promise((ok) => { const r = new FileReader(); r.onload = () => ok(r.result); r.readAsDataURL(blob) }))
      } catch { datos.set(src, null) }
    }
    return datos.get(src)
  }
  const ESTILOS = ['fill', 'stroke', 'stroke-width', 'opacity', 'fill-opacity', 'stroke-opacity', 'stroke-linecap',
    'stroke-linejoin', 'stroke-dasharray', 'display', 'visibility', 'font-family', 'font-size', 'font-weight', 'text-anchor']
  const dibujos = new Map()
  for (const svg of document.querySelectorAll('svg')) {
    if (svg.ownerSVGElement) continue
    const partes = svg.querySelectorAll('*')
    const caja = svg.getBoundingClientRect()
    if ((partes.length < 60 && !svg.querySelector('image')) || caja.width < 1 || caja.height < 1) continue
    const copia = svg.cloneNode(true)
    const pc = copia.querySelectorAll('*')
    for (const [i, el] of [svg, ...partes].entries()) {
      const cs = getComputedStyle(el), c = i ? pc[i - 1] : copia
      c.setAttribute('style', ESTILOS.map((k) => `${k}:${cs.getPropertyValue(k)}`).join(';'))
      if (el.tagName === 'image') {
        const d = await aDataUri(el.href.baseVal)
        if (d) { c.setAttribute('href', d); c.removeAttribute('xlink:href') }
      }
    }
    copia.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    copia.setAttribute('width', caja.width); copia.setAttribute('height', caja.height)
    copia.removeAttribute('class')
    const img = new Image()
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(new XMLSerializer().serializeToString(copia))}`
    try {
      await img.decode()
      const lienzo = document.createElement('canvas')
      lienzo.width = Math.ceil(caja.width * 2); lienzo.height = Math.ceil(caja.height * 2)
      lienzo.getContext('2d').drawImage(img, 0, 0, lienzo.width, lienzo.height)
      dibujos.set(svg, { src: lienzo.toDataURL('image/png'), w: caja.width, h: caja.height })
    } catch { /* queda vectorial */ }
  }

  const vivos = [document.body, ...document.body.querySelectorAll('*')]
  const clon = document.body.cloneNode(true)
  const copias = [clon, ...clon.querySelectorAll('*')]
  const unidades = (s) => s.replace(/(-?\d*\.?\d+)[dsl]?v([hw])\b/g, 'calc(var(--fx-v$2) * $1)')

  const ocultos = []
  vivos.forEach((el, i) => {
    const c = copias[i]
    /* Lo que no se ve se quita: el importador no respeta el atributo hidden. */
    if (i && !el.ownerSVGElement && el.tagName !== 'STYLE' && getComputedStyle(el).display === 'none') { ocultos.push(c); return }
    const n = i ? nombre(el) : null
    if (n) c.setAttribute('aria-label', n)
    for (const a of ['aria-hidden', 'inert', 'data-aria-hidden', 'data-fx-medido', 'data-fx-fijo']) c.removeAttribute(a)
    /* Lo sticky va en su lugar del flujo: la captura es con el scroll arriba y el importador lo saca aparte. */
    if (!el.ownerSVGElement && getComputedStyle(el).position === 'sticky') c.style.position = 'relative'
    const st = c.getAttribute('style')
    if (st && /v[hw]\b/.test(st)) c.setAttribute('style', unidades(st))
    if (el.tagName === 'INPUT') {
      if (el.type === 'checkbox' || el.type === 'radio') el.checked ? c.setAttribute('checked', '') : c.removeAttribute('checked')
      else c.setAttribute('value', el.value)
    } else if (el.tagName === 'TEXTAREA') c.textContent = el.value
    else if (el.tagName === 'OPTION') el.selected ? c.setAttribute('selected', '') : c.removeAttribute('selected')
    else if (el.tagName === 'IMG') {
      const d = datos.get(el.currentSrc || el.src)
      if (d) { c.setAttribute('src', d); c.removeAttribute('srcset') }
    }
  })
  vivos.forEach((el, i) => {
    const d = dibujos.get(el)
    if (!d || !copias[i].parentNode) return
    const img = document.createElement('img')
    img.setAttribute('src', d.src)
    img.setAttribute('class', el.getAttribute('class') || '')
    img.setAttribute('aria-label', el.getAttribute('aria-label') || 'Drawing')
    img.setAttribute('style', `${el.getAttribute('style') || ''};width:${d.w}px;height:${d.h}px;max-width:none;flex:none`)
    copias[i].replaceWith(img)
  })
  ocultos.forEach((n) => n.remove())
  clon.querySelectorAll('script, noscript, link, vite-error-overlay').forEach((n) => n.remove())

  /* CSS: las media queries se resuelven acá (el importador tiene otro ancho de ventana) y vh/vw pasan a variables
     que fija cada pantalla. Los selectores no se tocan. */
  const hijos = (r) => [...r.cssRules].map(css).join('')
  function css(r) {
    const T = r.constructor.name
    if (T === 'CSSImportRule') return ''
    if (T === 'CSSFontFaceRule') return /url\((?!["']?data:)/.test(r.cssText) ? '' : r.cssText
    if (T === 'CSSMediaRule') return matchMedia(r.conditionText).matches ? hijos(r) : ''
    if (T === 'CSSStyleRule') return `${r.selectorText}{${unidades(r.style.cssText)}${hijos(r)}}`
    if (T === 'CSSNestedDeclarations') return unidades(r.style.cssText)
    if (r.cssRules && T !== 'CSSKeyframesRule') return `${r.cssText.slice(0, r.cssText.indexOf('{'))}{${hijos(r)}}`
    return r.cssText
  }
  let estilos = ''
  for (const hoja of document.styleSheets) {
    try { estilos += [...hoja.cssRules].map(css).join('\n') + '\n' } catch { /* hoja de otro origen */ }
  }

  /* Si la que scrollea es la página entera, el frame toma su alto completo (vh sigue siendo el de la ventana).
     Con un drawer o un diálogo abierto se queda en el alto de la ventana: van fijos sobre ella. */
  const modal = document.querySelector('[role=dialog][data-state=open], [role=alertdialog][data-state=open]')
  const ancho = innerWidth
  const alto = modal ? innerHeight : Math.min(altoMax, Math.max(innerHeight, document.documentElement.scrollHeight))
  const fondo = getComputedStyle(document.body).backgroundColor
  const wrap = document.createElement('div')
  wrap.className = `fx-screen ${document.body.className}`
  wrap.setAttribute('aria-label', titulo)
  wrap.setAttribute('style', `--fx-vh:${innerHeight / 100}px;--fx-vw:${ancho / 100}px;width:${ancho}px;height:${alto}px;`
    + `position:relative;overflow:hidden;transform:translate(0);flex:none;background:${fondo}`)
  wrap.innerHTML = clon.innerHTML
  return { html: wrap.outerHTML, css: estilos, alto, ancho, htmlClass: document.documentElement.className }
}

/* Cuánto contenido queda escondido en un scroll grande (la página, el cuerpo de un drawer): la ventana crece eso.
   Marca al que más esconde para saber después si crecer lo destapó; los que no ceden (alto fijo) quedan descartados. */
export function sobrante() {
  let max = 0, cual = null
  document.querySelectorAll('[data-fx-medido]').forEach((el) => el.removeAttribute('data-fx-medido'))
  for (const el of document.querySelectorAll('*')) {
    if (el.clientHeight < innerHeight * 0.4 || el.hasAttribute('data-fx-fijo')) continue
    const oy = getComputedStyle(el).overflowY
    if (oy !== 'auto' && oy !== 'scroll') continue
    const extra = el.scrollHeight - el.clientHeight
    if (extra > max) { max = extra; cual = el }
  }
  cual?.setAttribute('data-fx-medido', '')
  return max
}

/* Después de crecer: lo que todavía esconde el scroll marcado. Si no cedió, se lo descarta. */
export function cedio(antes) {
  const el = document.querySelector('[data-fx-medido]')
  if (!el) return true
  const ok = el.scrollHeight - el.clientHeight < antes - 4
  if (!ok) el.setAttribute('data-fx-fijo', '')
  return ok
}
