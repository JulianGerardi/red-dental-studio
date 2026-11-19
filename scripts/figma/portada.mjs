#!/usr/bin/env node
/* Arma la portada del archivo de Figma (índice de páginas y convenciones) a partir de los manifiestos que dejó
   capturar.mjs: `node scripts/figma/portada.mjs`. Ver design-reference/figma-docs.md. */
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '../..')
const DIR = join(RAIZ, '.figma-capturas')
const esc = (t) => String(t ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const T = 'font-family:Inter,sans-serif;margin:0;'
const caja = (nombre, estilo, hijos) => `<div aria-label="${esc(nombre)}" style="display:flex;${estilo}">${hijos}</div>`
const txt = (nombre, estilo, t) => `<p aria-label="${esc(nombre)}" style="${T}${estilo}">${esc(t)}</p>`
const etiqueta = (t) => txt('Label', 'font-size:24px;line-height:32px;font-weight:700;letter-spacing:3px;color:#8fb2ff', t)
const item = (titulo, cuerpo) => caja('Doc / Item', 'flex-direction:column;gap:6px', [
  txt('Item title', 'font-size:34px;line-height:46px;font-weight:600;color:#fff', titulo),
  txt('Item text', 'font-size:28px;line-height:42px;color:#c9c9c9', cuerpo),
].join(''))
const tarjeta = (nombre, t, items) => caja(nombre, 'flex-direction:column;gap:28px;padding:48px;border-radius:32px;background:#303030;flex:1;min-width:0', [etiqueta(t), ...items].join(''))

const modulos = []
for (const d of await readdir(DIR, { withFileTypes: true })) {
  if (!d.isDirectory() || d.name.startsWith('_')) continue
  modulos.push(JSON.parse(await readFile(join(DIR, d.name, 'manifiesto.json'), 'utf8')))
}
modulos.sort((a, b) => a.orden - b.orden)
const pantallas = modulos.reduce((n, m) => n + m.flujos.reduce((k, f) => k + f.pantallas, 0), 0)
const flujos = modulos.reduce((n, m) => n + m.flujos.length, 0)

const html = caja('Cover', 'flex-direction:column;gap:80px;padding:200px;width:4400px;background:#262626;border-radius:48px;flex:none" class="fx-frame', [
  caja('Doc / Cover header', 'flex-direction:column;gap:36px', [
    txt('Eyebrow', 'font-size:32px;line-height:40px;font-weight:700;letter-spacing:4px;color:#8fb2ff', 'CONFIDENTALLY · RED DENTAL STUDIO'),
    txt('Title', 'font-size:200px;line-height:216px;font-weight:700;color:#fff;letter-spacing:-4px', 'Screens & Flows'),
    txt('Summary', 'font-size:48px;line-height:68px;color:#c9c9c9;max-width:3200px', `Todas las pantallas del rediseño, por módulo y por flujo, con la guía de happy path para devs. ${modulos.length} páginas, ${flujos} flujos y ${pantallas} pantallas capturadas de la app (red-clone).`),
  ].join('')),
  caja('Doc / Guides', 'flex-direction:row;gap:48px;align-items:stretch', [
    tarjeta('Doc / How to read', 'CÓMO LEER ESTE ARCHIVO', [
      item('Una página por módulo', 'Patients, Scheduling, Billing… Arriba de cada página, el resumen del módulo, sus historias de Jira y el índice de flujos.'),
      item('Una sección por flujo', 'Cada sección es un recorrido completo, de izquierda a derecha. El bloque Happy path lo cuenta paso a paso.'),
      item('Pasos numerados', 'Cada pantalla lleva su número, su nombre, la ruta de la app y una nota: qué hace el usuario y qué responde la app.'),
      item('Chips', 'Azul: historia de Jira con la regla de negocio (proyecto CON). Gris: quién usa el flujo. Ámbar: la pantalla no tiene historia.'),
    ]),
    tarjeta('Doc / Layer naming', 'CÓMO ESTÁN NOMBRADAS LAS CAPAS', [
      item('El nombre del componente de React', 'Topbar, DataTable, Drawer, StepIndicator: la capa se llama como la pieza en src/components y en el Storybook.'),
      item('Propio / base', '"PatientsTable / DataTable": el componente de la pantalla y la pieza del design system que usa.'),
      item('Controles', '"Button - New Patient", "Link - Patients", "Text Input - First Name": rol y texto. Los íconos, "Icon - plus" (Lucide).'),
      item('Auto layout', 'Todo frame sale del flex o grid real de la app. Sin nombre propio quedan Row, Column o Grid. Lo que empieza con "Doc /" es documentación, no producto.'),
    ]),
    tarjeta('Doc / How to update', 'CÓMO SE ACTUALIZA', [
      item('No se dibuja a mano', 'Las pantallas se capturan de la app andando. Si cambia el diseño, se vuelve a capturar el módulo y se reemplaza su página.'),
      item('Flujos en el repo', 'scripts/figma/flujos/<módulo>.mjs define los pasos, las notas y las claves de Jira. node scripts/figma/capturar.mjs <módulo> genera el HTML.'),
      item('Reglas', 'design-reference/figma-docs.md explica el formato. Las decisiones de cada módulo, en design-reference/figma/modulos/<módulo>.md.'),
      item('Fuentes', 'App: juliangerardi.github.io/red-dental-studio · Design system: …/storybook · Jira: confidetally.atlassian.net (CON).'),
    ]),
  ].join('')),
  caja('Doc / Pages index', 'flex-direction:column;gap:24px;padding:48px;border-radius:32px;background:#303030', [
    etiqueta('PÁGINAS'),
    caja('Grid', 'flex-direction:row;flex-wrap:wrap;gap:24px 48px', modulos.map((m) =>
      caja(`Doc / Page row · ${m.pagina}`, 'flex-direction:column;gap:6px;width:1280px;padding:24px 0;border-top:2px solid #444', [
        txt('Page name', 'font-size:40px;line-height:52px;font-weight:600;color:#fff', m.pagina),
        txt('Page meta', 'font-size:26px;line-height:38px;color:#9a9a9a', `${m.flujos.length} flujos · ${m.flujos.reduce((k, f) => k + f.pantallas, 0)} pantallas`),
        txt('Page flows', 'font-size:26px;line-height:38px;color:#c9c9c9', m.flujos.map((f) => f.nombre).join('  ·  ')),
      ].join(''))).join('')),
  ].join('')),
].join(''))

await mkdir(join(DIR, '_portada'), { recursive: true })
await writeFile(join(DIR, '_portada', 'lote-1.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8">
<style>*{box-sizing:border-box}body{margin:0;background:#1e1e1e}</style></head><body>${html}</body></html>`)
console.log(`portada: ${modulos.length} páginas, ${flujos} flujos, ${pantallas} pantallas`)
