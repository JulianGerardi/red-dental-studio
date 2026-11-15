/* Se corre en Figma con `use_figma`, una vez por página, después de importar sus lotes: quita los marcadores vacíos del
   importador, mete cada flujo en una sección con su nombre y apila todo de arriba hacia abajo. Se puede repetir sin
   romper nada. Cambiar PAGE_ID por el id de la página. Ver design-reference/figma-docs.md. */
const page = await figma.getNodeByIdAsync('PAGE_ID')
await figma.setCurrentPageAsync(page)
const fondo = [{ type: 'SOLID', color: { r: 0.149, g: 0.149, b: 0.149 } }]
for (const n of [...page.children]) if (n.name.startsWith('Sticky placeholder')) n.remove()
let y = 0
const out = []
for (const n of [...page.children]) {
  let m = n
  if (n.type === 'FRAME' && !n.name.startsWith('Module ·') && n.name !== 'Cover') {
    m = figma.createSection()
    m.name = n.name
    m.fills = fondo
    m.appendChild(n)
    n.x = 0; n.y = 0; n.cornerRadius = 0
    m.resizeWithoutConstraints(n.width, n.height)
  }
  m.x = 0; m.y = y
  y += m.height + (m.type === 'SECTION' ? 400 : 240)
  out.push(`${m.id} ${m.name} ${Math.round(m.width)}x${Math.round(m.height)}`)
}
return out
