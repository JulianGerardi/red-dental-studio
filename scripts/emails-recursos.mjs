/* Genera las imágenes de los mails en public/emails/: los íconos del aviso (los de lucide que usa ui/alert, en el
   color de cada tono), la marca de Confidentally del pie ("Powered by") y el logo inventado de la clínica de ejemplo,
   en varios colores para probar que ninguno pise el degradé de la cabecera. Los mails no muestran SVG en Gmail ni en Outlook,
   así que van en PNG al doble de tamaño. Uso: `node scripts/emails-recursos.mjs` (necesita Playwright con Chromium).
   Ver design-reference/figma/modulos/emails.md. */
import { createRequire } from 'node:module'
import { join } from 'node:path'

const { chromium } = createRequire(import.meta.url)('playwright')
const DESTINO = join(import.meta.dirname, '..', 'public', 'emails')

/* Los mismos trazos que lucide-react (TriangleAlert, Info, CircleCheck, CircleAlert) y los colores de ui/alert. */
const ICONOS = {
  warning: { color: '#99660d', trazos: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>' },
  info: { color: '#174596', trazos: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>' },
  success: { color: '#1a804d', trazos: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>' },
  danger: { color: '#b22626', trazos: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>' },
}
const icono = ({ color, trazos }) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${trazos}</svg>`

/* Logo de ejemplo: no es de ninguna clínica real. Marca de color con una muela y el nombre al lado. Alto 88 (se ve a 44).
   Una variante por color; el azul es el de la marca, el caso más difícil sobre el degradé. */
const COLORES = { red: '#d6383f', blue: '#1d56bc', green: '#15803d', purple: '#7c3aed', black: '#18181b' }
const logo = (color) => `<svg xmlns="http://www.w3.org/2000/svg" width="384" height="88" viewBox="0 0 384 88">
  <rect x="0" y="0" width="88" height="88" rx="22" fill="${color}"/>
  <path transform="translate(12 14)" fill="#ffffff" d="M20 6C13 6 8 12 8 20C8 29 11.5 35 14 44C16 52 17 60 22 60C27 60 27 51 29.5 45.5C30.5 43 31.5 41.5 32 41.5C32.5 41.5 33.5 43 34.5 45.5C37 51 37 60 42 60C47 60 48 52 50 44C52.5 35 56 29 56 20C56 12 51 6 44 6C39 6 36 9 32 9C28 9 25 6 20 6Z"/>
  <text x="108" y="44" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="700" fill="#09090b" letter-spacing="-0.5">Red Dental</text>
  <text x="110" y="74" font-family="Inter, Arial, sans-serif" font-size="15" font-weight="600" fill="${color}" letter-spacing="6.5">STUDIO</text>
</svg>`

const b = await chromium.launch()
const p = await b.newPage({ deviceScaleFactor: 1 })
const sacar = async (svg, archivo) => {
  await p.setContent(`<html><head><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@600;700&display=swap"></head><body style="margin:0;background:transparent">${svg}</body></html>`, { waitUntil: 'networkidle' })
  await p.evaluate(() => document.fonts.ready)
  await p.locator('svg').screenshot({ path: join(DESTINO, archivo), omitBackground: true })
}
for (const [tono, i] of Object.entries(ICONOS)) await sacar(icono(i), `alert-${tono}.png`)
await sacar(logo(COLORES.red), 'sample-practice-logo.png')
for (const [nombre, color] of Object.entries(COLORES)) await sacar(logo(color), `sample-practice-logo-${nombre}.png`)
/* La "C" de Confidentally, recortada de su logo, a 24 × 28 (se ve a 12 × 14). */
const { readFileSync } = await import('node:fs')
const original = `data:image/png;base64,${readFileSync(join(DESTINO, 'confidentally-logo.png')).toString('base64')}`
await p.setContent(`<canvas width="24" height="28"></canvas>`)
const marca = await p.evaluate(async (src) => {
  const img = new Image(); img.src = src; await img.decode()
  const c = document.querySelector('canvas'); const x = c.getContext('2d')
  x.imageSmoothingQuality = 'high'
  x.drawImage(img, 0, 0, 197, 231, 0, 0, 24, 28)
  return c.toDataURL('image/png').split(',')[1]
}, original)
const { writeFileSync } = await import('node:fs')
writeFileSync(join(DESTINO, 'confidentally-mark.png'), Buffer.from(marca, 'base64'))
await b.close()
console.log('Imágenes de los mails en public/emails/.')
