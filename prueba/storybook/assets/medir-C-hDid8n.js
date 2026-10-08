import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`/* Lectura de estilos calculados para las páginas de Elements: los números y
   colores que muestran salen del componente ya dibujado y de src/index.css,
   nunca de una tabla copiada a mano. */

export const PESOS: Record<string, string> = { '400': 'Regular', '500': 'Medium', '600': 'Semibold', '700': 'Bold' }

export const px = (v: string) => Math.round(parseFloat(v) * 10) / 10

export function hex(rgb: string): string {
  const m = rgb.match(/rgba?\\(([\\d.]+)[, ]+([\\d.]+)[, ]+([\\d.]+)(?:[, /]+([\\d.]+))?\\)/)
  if (!m) return rgb
  if (m[4] !== undefined && parseFloat(m[4]) === 0) return 'transparent'
  return \`#\${[m[1], m[2], m[3]].map((n) => Math.round(parseFloat(n!)).toString(16).padStart(2, '0')).join('')}\`
}

/* Hex de un token de color de Tailwind (\`dash-blue\` → #1d56bc). */
export function colorDeToken(token: string): string {
  if (token.startsWith('[#')) return token.slice(1, -1)
  if (token === 'white') return '#ffffff'
  if (token === 'transparent') return 'transparent'
  const sonda = document.createElement('span')
  sonda.style.color = \`var(--color-\${token})\`
  document.body.appendChild(sonda)
  const c = getComputedStyle(sonda).color
  sonda.remove()
  return hex(c)
}

/* De un string de clases, el token de color de cada rol. */
export function tokensDe(clases: string) {
  const lista = clases.split(/\\s+/)
  const buscar = (re: RegExp) => lista.map((c) => c.match(re)?.[1]).find(Boolean) ?? null
  return {
    fondo: buscar(/^bg-([a-z][\\w-]*|\\[#[0-9a-f]{3,8}\\])$/),
    texto: buscar(/^text-([a-z][\\w-]*|\\[#[0-9a-f]{3,8}\\])$/),
    borde: lista.includes('border') ? buscar(/^border-([a-z][\\w-]*|\\[#[0-9a-f]{3,8}\\])$/) : null,
    fondoHover: buscar(/^hover:bg-([\\w-]+)$/),
    textoHover: buscar(/^hover:text-([\\w-]+)$/),
    fondoActivo: buscar(/^active:bg-([\\w-]+)$/),
    foco: buscar(/^focus-visible:outline-([a-z][\\w-]*)$/),
  }
}
`})))()}n();export{t as default};