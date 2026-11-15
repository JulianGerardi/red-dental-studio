/* Se corre en Figma con `use_figma`, después de importar y ordenar los lotes de las páginas. Cambiar PAGE_IDS por los ids de
   las páginas (varias por llamada: cada una se carga con `loadAsync`; si la llamada se queda sin tiempo, devuelve las
   pantallas pendientes y se vuelve a correr). Hace tres cosas que el importador no hace, sin cambiar cómo se ve nada a 1512 px:
   1. Orden de capas: en CSS lo posicionado pinta arriba de lo que está en el flujo; en Figma manda el orden de las capas.
      Los hijos ABSOLUTE pasan al final de su padre y, en los frames sin auto layout, el ícono pasa sobre el campo que lo
      tapaba (el ícono del buscador).
   2. Fill container: lo que en la app ocupa todo el ancho o el alto de su contenedor, o el espacio que sobra (flex-1, el
      mx-auto con max-w), pasa a FILL (con ancho máximo si lo tenía). En una fila tan llena que ninguno crece (las filas de
      una tabla) absorbe el más ancho. Cada padre se verifica: si algún hijo cambiara de tamaño, se deja como estaba.
   3. Constraints: lo que en un frame sin auto layout ocupa todo el ancho o el alto se estira; lo absoluto pegado a un borde
      (el dock, los drawers) se ancla a ese borde.
   Se puede repetir sin romper nada. Ver design-reference/figma-docs.md. */
const PAGE_IDS = ['PAGE_ID']
const TOL = 1.5, CHICO = 48, TIEMPO = 50000
const t0 = Date.now()
const total = { pantallas: 0, nodos: 0, z: 0, cruzado: 0, centrado: 0, principal: 0, absorbe: 0, estirar: 0, anclar: 0, iconos: 0, revertidos: 0 }
const porPagina = {}
const pendientes = []
const fuentesOk = new Set(), fuentesMal = new Set()
let st = total
const clave = (f) => f.family + '|' + f.style
const textoOk = (c) => c.fontName !== figma.mixed && fuentesOk.has(clave(c.fontName))
const visibles = (p) => p.children.filter((c) => c.visible !== false && c.layoutPositioning !== 'ABSOLUTE')
const chico = (n) => n.type !== 'TEXT' && n.width <= CHICO && n.height <= CHICO
const opaco = (n) => 'fills' in n && Array.isArray(n.fills) && n.fills.some((f) => f.visible !== false && f.type === 'SOLID' && (f.opacity === undefined || f.opacity >= 0.99))
const contiene = (b, a) => a.x >= b.x - 1 && a.y >= b.y - 1 && a.x + a.width <= b.x + b.width + 1 && a.y + a.height <= b.y + b.height + 1

function anclar(p, c) {
  const h = Math.abs(c.x) <= TOL && Math.abs(c.width - p.width) <= TOL ? 'STRETCH' : Math.abs(p.width - (c.x + c.width)) <= TOL && c.x > TOL ? 'MAX' : null
  const v = Math.abs(c.y) <= TOL && Math.abs(c.height - p.height) <= TOL ? 'STRETCH' : Math.abs(p.height - (c.y + c.height)) <= TOL && c.y > TOL ? 'MAX' : null
  if (h || v) { c.constraints = { horizontal: h || c.constraints.horizontal, vertical: v || c.constraints.vertical }; return true }
  return false
}

function sinAuto(p) {
  const hijos = p.children.filter((c) => c.visible !== false)
  hijos.forEach((c, i) => {
    const esIcono = (c.type === 'FRAME' && /^Icon/.test(c.name)) || (c.type === 'TEXT' && c.width <= 40)
    if (!esIcono) return
    const encima = hijos.slice(i + 1).find((b) => b.type === 'FRAME' && opaco(b) && b.width > c.width && b.height > c.height && contiene(b, c))
    if (encima) { p.appendChild(c); st.iconos += 1 }
  })
  for (const c of p.children) {
    if (c.visible === false || !('constraints' in c)) continue
    const h = Math.abs(c.x) <= TOL && Math.abs(c.width - p.width) <= TOL
    const v = Math.abs(c.y) <= TOL && Math.abs(c.height - p.height) <= TOL
    if (h || v) { c.constraints = { horizontal: h ? 'STRETCH' : c.constraints.horizontal, vertical: v ? 'STRETCH' : c.constraints.vertical }; st.estirar += 1 }
  }
}

function arreglar(p) {
  if (p.layoutMode === 'NONE') { sinAuto(p); return }
  const H = p.layoutMode === 'HORIZONTAL'
  if (!H && p.layoutMode !== 'VERTICAL') return
  const abs = p.children.filter((c) => c.layoutPositioning === 'ABSOLUTE')
  if (abs.length && p.children.slice(0, p.children.length - abs.length).some((c) => c.layoutPositioning === 'ABSOLUTE')) {
    for (const a of abs) { p.appendChild(a); st.z += 1 }
  }
  for (const a of abs) if (a.visible !== false && 'constraints' in a && anclar(p, a)) st.anclar += 1
  const ps = H ? 'width' : 'height', cs = H ? 'height' : 'width'
  const propP = H ? 'layoutSizingHorizontal' : 'layoutSizingVertical'
  const propC = H ? 'layoutSizingVertical' : 'layoutSizingHorizontal'
  const padC = H ? p.paddingTop + p.paddingBottom : p.paddingLeft + p.paddingRight
  const padP = H ? p.paddingLeft + p.paddingRight : p.paddingTop + p.paddingBottom
  const todos = visibles(p)
  if (!todos.length) return
  const orig = new Map(todos.map((c) => [c.id, { w: c.width, h: c.height, sh: c.layoutSizingHorizontal, sv: c.layoutSizingVertical }]))
  const cambiados = []
  const kids = todos.filter((c) => c.type === 'FRAME' || c.type === 'TEXT')
  if (p.counterAxisSizingMode !== 'AUTO') {
    const ic = p[cs] - padC
    for (const c of kids) {
      if (chico(c) || c[propC] !== 'FIXED' || c[cs] <= 0) continue
      if (Math.abs(c[cs] - ic) <= TOL) {
        if (c.type === 'TEXT') { if (H || !textoOk(c)) continue; c.textAutoResize = 'HEIGHT' }
        c[propC] = 'FILL'; cambiados.push(c); st.cruzado += 1
      } else if (!H && c.type === 'FRAME' && p.counterAxisAlignItems === 'CENTER' && c[cs] < ic - 8) {
        const izq = c.x - p.paddingLeft, der = ic - izq - c.width
        if (Math.abs(izq - der) <= TOL) { const w = c.width; c[propC] = 'FILL'; c.maxWidth = w; cambiados.push(c); st.centrado += 1 }
      }
    }
  }
  if (p.primaryAxisSizingMode !== 'AUTO' && p.primaryAxisAlignItems !== 'SPACE_BETWEEN') {
    const suma = todos.reduce((s, c) => s + c[ps], 0) + p.itemSpacing * (todos.length - 1)
    if (Math.abs(suma - (p[ps] - padP)) <= TOL) {
      let crecio = 0
      for (const c of kids) {
        if (c.type !== 'FRAME' || c.layoutMode === 'NONE' || chico(c) || c[propP] !== 'FIXED') continue
        const o = c[ps]
        c[propP] = 'HUG'
        if (c[ps] < o - TOL) { c[propP] = 'FILL'; cambiados.push(c); st.principal += 1; crecio += 1 }
        else { c[propP] = 'FIXED'; c.resize(H ? o : c.width, H ? c.height : o) }
      }
      /* fila llena donde ninguno crece (las celdas de una tabla): el más ancho absorbe lo que sobre o falte */
      if (!crecio && H && kids.length >= 3) {
        const filas = kids.filter((c) => c.type === 'FRAME' && !chico(c) && c[propP] === 'FIXED')
        const ancho = filas.sort((a, b) => b[ps] - a[ps])[0]
        if (ancho) { ancho[propP] = 'FILL'; cambiados.push(ancho); st.absorbe += 1 }
      }
    }
  }
  if (cambiados.length && todos.some((c) => Math.abs(c.width - orig.get(c.id).w) > 4 || Math.abs(c.height - orig.get(c.id).h) > 4)) {
    for (const c of cambiados) {
      const o = orig.get(c.id)
      if (c.type === 'TEXT') c.textAutoResize = 'HEIGHT'
      c.layoutSizingHorizontal = o.sh === 'FILL' ? 'FILL' : 'FIXED'
      c.layoutSizingVertical = o.sv === 'FILL' ? 'FILL' : 'FIXED'
      if ('maxWidth' in c) c.maxWidth = null
      c.resize(o.w, o.h)
    }
    st.revertidos += cambiados.length
  }
}

for (const pid of PAGE_IDS) {
  const page = await figma.getNodeByIdAsync(pid)
  await page.loadAsync()
  st = { pantallas: 0, nodos: 0, z: 0, cruzado: 0, centrado: 0, principal: 0, absorbe: 0, estirar: 0, anclar: 0, iconos: 0, revertidos: 0 }
  /* las fuentes de los textos se cargan antes de tocar su auto resize */
  for (const t of page.findAllWithCriteria({ types: ['TEXT'] })) {
    if (t.fontName === figma.mixed) continue
    const k = clave(t.fontName)
    if (fuentesOk.has(k) || fuentesMal.has(k)) continue
    try { await figma.loadFontAsync(t.fontName); fuentesOk.add(k) } catch (e) { fuentesMal.add(k) }
  }
  const pantallas = page.findAll((n) => n.type === 'FRAME' && /^\d\d · /.test(n.name) && Math.abs(n.width - 1512) < 2)
  for (const raiz of pantallas) {
    if (Date.now() - t0 > TIEMPO) { pendientes.push(raiz.id); continue }
    const pila = [raiz]
    while (pila.length) {
      const n = pila.pop(); st.nodos += 1
      if (n.type === 'INSTANCE' || n.type === 'TEXT' || !('children' in n)) continue
      if (n.type === 'FRAME') arreglar(n)
      for (const c of [...n.children].reverse()) pila.push(c)
    }
    st.pantallas += 1
  }
  porPagina[page.name] = st
  for (const k of Object.keys(total)) total[k] += st[k]
}
return { ms: Date.now() - t0, pendientes, fuentesMal: [...fuentesMal], total, porPagina }
