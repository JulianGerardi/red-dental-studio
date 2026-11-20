#!/usr/bin/env node
/* Captura las pantallas de la app para documentarlas en Figma: `node scripts/figma/capturar.mjs patients billing`
   (sin argumentos, todos los módulos). Con el dev server andando (APP_URL, por defecto http://localhost:5182).
   Deja en .figma-capturas/<módulo>/ los HTML por lote y el manifiesto con los flujos. Ver design-reference/figma-docs.md. */
import { createRequire } from 'node:module'
import { execSync } from 'node:child_process'
import { mkdir, readdir, readFile, writeFile, rm } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { serializar, sobrante, cedio } from './serializar.mjs'

const { chromium } = createRequire(import.meta.url)('playwright')
const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '../..')
const APP = process.env.APP_URL ?? 'http://localhost:5182'
const ANCHO = 1512, ALTO = 1008, ALTO_MAX = 2600, PESO_LOTE = 12e6
const REV = execSync('git rev-parse --short HEAD', { cwd: RAIZ }).toString().trim()
const HOY = new Date().toISOString().slice(0, 10)

/* Los nombres de componente del proyecto: sólo esos nombran capas (Radix y el router quedan afuera). */
async function nombresDeComponentes() {
  const out = new Set()
  async function leer(dir) {
    for (const e of await readdir(dir, { withFileTypes: true })) {
      const ruta = join(dir, e.name)
      if (e.isDirectory()) { if (e.name !== 'design-system') await leer(ruta) }
      else if (e.name.endsWith('.tsx') && !e.name.includes('.stories.')) {
        const src = await readFile(ruta, 'utf8')
        for (const m of src.matchAll(/(?:function|const)\s+([A-Z][A-Za-z0-9]+)\b/g)) out.add(m[1])
      }
    }
  }
  await leer(join(RAIZ, 'src'))
  return [...out]
}

/* La documentación alrededor de las pantallas, también en HTML: el importador la convierte en frames con auto layout.
   Cada bloque lleva su nombre de capa en aria-label. Ver design-reference/figma-docs.md. */
const FONDO = '#1e1e1e'
const JIRA = 'https://confidetally.atlassian.net/browse/'
const esc = (t) => String(t ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const T = 'font-family:Inter,sans-serif;margin:0;'
const caja = (nombre, estilo, hijos) => `<div aria-label="${esc(nombre)}" style="display:flex;${estilo}">${hijos}</div>`
const txt = (nombre, estilo, t) => `<p aria-label="${esc(nombre)}" style="${T}${estilo}">${esc(t)}</p>`
const chip = (clase, t, color, fondo) => `<span aria-label="Doc / Chip · ${clase}" style="${T}display:inline-flex;align-items:center;padding:8px 20px;border-radius:999px;font-size:24px;line-height:32px;font-weight:600;color:${color};background:${fondo};white-space:nowrap">${esc(t)}</span>`
const chips = (rol, jira) => caja('Doc / Chips', 'flex-direction:row;flex-wrap:wrap;gap:12px;align-items:center', [
  ...(rol ? [chip('Role', rol, '#e5e5e5', '#3d3d3d')] : []),
  ...(jira.length ? jira.map((k) => chip('Jira', k, '#bcd3ff', '#1d3a7a')) : [chip('Jira', 'Sin historia en Jira', '#ffd9a8', '#5a3a12')]),
].join(''))
const insignia = (n) => `<span aria-label="Doc / Step number" style="${T}display:inline-flex;align-items:center;justify-content:center;width:64px;height:64px;flex:none;border-radius:999px;background:#2f6bff;color:#fff;font-size:28px;line-height:32px;font-weight:700">${n}</span>`

function flujoHtml(f, capturas) {
  const pasos = capturas.map((c) => {
    const [n, ...resto] = c.titulo.split(' · ')
    const p = f.pantallas.find((x) => c.titulo.endsWith(`· ${x.nombre}`)) ?? {}
    return { n, nombre: resto.join(' · '), ruta: c.ruta, nota: p.nota ?? '', html: c.html, ancho: c.ancho }
  })
  return caja(f.nombre, `flex-direction:column;gap:96px;padding:160px;background:#262626;border-radius:48px;flex:none" class="fx-frame`, [
    caja('Doc / Flow header', 'flex-direction:column;gap:28px;max-width:2600px', [
      txt('Flow title', 'font-size:88px;line-height:104px;font-weight:700;color:#fff;letter-spacing:-1px', f.nombre),
      txt('Flow summary', 'font-size:36px;line-height:52px;color:#c9c9c9', f.resumen ?? ''),
      chips(f.rol, f.jira ?? []),
    ].join('')),
    caja('Doc / Happy path', 'flex-direction:column;gap:24px;padding:48px;border-radius:32px;background:#303030;max-width:2600px', [
      txt('Happy path label', 'font-size:24px;line-height:32px;font-weight:700;letter-spacing:3px;color:#8fb2ff', 'HAPPY PATH · GUÍA PARA EL DEV'),
      ...pasos.map((p) => caja(`Doc / Happy path step ${p.n}`, 'flex-direction:row;gap:28px;align-items:flex-start', [
        insignia(p.n),
        caja('Text', 'flex-direction:column;gap:6px;flex:1;min-width:0', [
          txt('Step name', 'font-size:32px;line-height:44px;font-weight:600;color:#fff', p.nombre),
          txt('Step note', 'font-size:28px;line-height:42px;color:#c9c9c9', p.nota),
        ].join('')),
      ].join(''))),
    ].join('')),
    caja('Screens', 'flex-direction:row;gap:160px;align-items:flex-start', pasos.map((p) =>
      caja(`Step ${p.n} · ${p.nombre}`, `flex-direction:column;gap:32px;width:${p.ancho}px;flex:none`, [
        caja('Doc / Step header', 'flex-direction:row;gap:24px;align-items:center', [
          insignia(p.n),
          caja('Text', 'flex-direction:column;gap:2px;min-width:0', [
            txt('Step name', 'font-size:40px;line-height:52px;font-weight:600;color:#fff', p.nombre),
            txt('Route', 'font-size:26px;line-height:36px;color:#9a9a9a', p.ruta),
          ].join('')),
        ].join('')),
        p.html,
        caja('Doc / Step note', 'flex-direction:column;padding:32px 40px;border-radius:24px;background:#303030', txt('Note', 'font-size:30px;line-height:46px;color:#e0e0e0', p.nota)),
      ].join(''))).join('')),
  ].join(''))
}

function moduloHtml(def, capturas) {
  return caja(`Module · ${def.pagina}`, `flex-direction:column;gap:64px;padding:160px;width:3200px;background:#262626;border-radius:48px;flex:none" class="fx-frame`, [
    caja('Doc / Module header', 'flex-direction:column;gap:32px', [
      txt('Module title', 'font-size:144px;line-height:160px;font-weight:700;color:#fff;letter-spacing:-2px', def.pagina),
      txt('Module summary', 'font-size:44px;line-height:64px;color:#c9c9c9', def.resumen ?? ''),
      chips('', def.jira ?? []),
      txt('Source', 'font-size:28px;line-height:40px;color:#9a9a9a', `Capturado de red-clone (${REV}) el ${HOY} · Decisiones: design-reference/figma/modulos/ · Flujos: scripts/figma/flujos/`),
    ].join('')),
    caja('Doc / Flows index', 'flex-direction:column;gap:20px;padding:48px;border-radius:32px;background:#303030', [
      txt('Index label', 'font-size:24px;line-height:32px;font-weight:700;letter-spacing:3px;color:#8fb2ff', 'FLUJOS DE ESTA PÁGINA'),
      ...def.flujos.map((f, i) => caja(`Doc / Flow row ${i + 1}`, 'flex-direction:row;gap:28px;align-items:flex-start', [
        insignia(String(i + 1).padStart(2, '0')),
        caja('Text', 'flex-direction:column;gap:6px;flex:1;min-width:0', [
          txt('Flow name', 'font-size:36px;line-height:48px;font-weight:600;color:#fff', `${f.nombre} · ${capturas.filter((c) => c.flujo === f.nombre).length} pantallas`),
          txt('Flow summary', 'font-size:28px;line-height:42px;color:#c9c9c9', f.resumen ?? ''),
        ].join('')),
      ].join(''))),
    ].join('')),
  ].join(''))
}

const modulos = process.argv.slice(2).length ? process.argv.slice(2)
  : (await readdir(join(RAIZ, 'scripts/figma/flujos'))).filter((f) => !f.startsWith('_')).map((f) => f.replace('.mjs', ''))
const nombres = await nombresDeComponentes()
const browser = await chromium.launch()

for (const modulo of modulos) {
  const def = (await import(`./flujos/${modulo}.mjs`)).default
  const dir = join(RAIZ, '.figma-capturas', modulo)
  await rm(dir, { recursive: true, force: true })
  await mkdir(dir, { recursive: true })
  const capturas = []
  let n = 0
  for (const flujo of def.flujos) {
    const ctx = await browser.newContext({ viewport: { width: ANCHO, height: ALTO }, reducedMotion: 'reduce' })
    const page = await ctx.newPage()
    page.setDefaultTimeout(8000)
    let paso = 0
    for (const pantalla of flujo.pantallas) {
      paso += 1; n += 1
      const titulo = `${String(paso).padStart(2, '0')} · ${pantalla.nombre}`
      try {
        await page.setViewportSize({ width: ANCHO, height: ALTO })
        if (pantalla.ruta) { await page.goto(APP + pantalla.ruta); await page.waitForLoadState('networkidle').catch(() => {}) }
        if (pantalla.hacer) await pantalla.hacer(page)
        await page.waitForTimeout(pantalla.espera ?? 450)
        if (pantalla.alto !== 'fijo') {
          /* La ventana crece hasta mostrar lo que quedaba en el scroll; si crecer no lo destapa (un scroll de alto
             fijo, como una lista con "Show more"), vuelve al alto anterior y prueba con el siguiente. */
          for (let i = 0; i < 6; i += 1) {
            const extra = await page.evaluate(sobrante)
            const alto = page.viewportSize().height
            if (extra < 4 || alto >= ALTO_MAX) break
            await page.setViewportSize({ width: ANCHO, height: Math.min(ALTO_MAX, alto + extra) })
            await page.waitForTimeout(200)
            if (!(await page.evaluate(cedio, extra))) { await page.setViewportSize({ width: ANCHO, height: alto }); await page.waitForTimeout(200) }
          }
        }
        const r = await page.evaluate(serializar, { nombres, titulo })
        capturas.push({ ...r, flujo: flujo.nombre, titulo, ruta: new URL(page.url()).pathname + new URL(page.url()).search + new URL(page.url()).hash })
        process.stdout.write(`  ✓ ${modulo} · ${flujo.nombre} · ${titulo} (${r.ancho}×${r.alto}, ${Math.round(r.html.length / 1024)} KB)\n`)
      } catch (e) {
        process.stdout.write(`  ✗ ${modulo} · ${flujo.nombre} · ${titulo}: ${String(e.message).split('\n')[0]}\n`)
        capturas.push({ error: String(e.message).split('\n')[0], flujo: flujo.nombre, titulo })
      }
    }
    await ctx.close()
  }

  const buenas = capturas.filter((c) => !c.error)
  /* Un HTML por lote: el encabezado del módulo y cada flujo son un `.fx-frame` (un frame en Figma). Los flujos se
     reparten en lotes de hasta PESO_LOTE bytes. */
  const marcos = [{ html: moduloHtml(def, buenas), peso: 0 }, ...def.flujos.map((f) => {
    const suyas = buenas.filter((c) => c.flujo === f.nombre)
    return { html: flujoHtml(f, suyas), peso: suyas.reduce((n, c) => n + c.html.length, 0) }
  })]
  const lotes = [[]]
  let peso = 0
  for (const m of marcos) {
    if (lotes.at(-1).length && peso + m.peso > PESO_LOTE) { lotes.push([]); peso = 0 }
    lotes.at(-1).push(m); peso += m.peso
  }
  const u = buenas.at(-1)
  for (const [i, lote] of lotes.entries()) {
    await writeFile(join(dir, `lote-${i + 1}.html`), `<!doctype html><html lang="en" class="${u.htmlClass}"><head><meta charset="utf-8">
<style>${u.css}</style>
<style>*,*::before,*::after{animation:none!important;transition:none!important}
body{margin:0!important;display:flex!important;flex-direction:column;align-items:flex-start;gap:200px;height:auto!important;overflow:visible!important;background:${FONDO}!important}</style>
</head><body>${lote.map((m) => m.html).join('\n')}</body></html>`)
  }
  await writeFile(join(dir, 'manifiesto.json'), JSON.stringify({
    modulo, pagina: def.pagina, orden: def.orden ?? 99, lotes: lotes.length,
    flujos: def.flujos.map((f) => ({ nombre: f.nombre, pantallas: buenas.filter((c) => c.flujo === f.nombre).length })),
    errores: capturas.filter((c) => c.error).map((c) => `${c.flujo} · ${c.titulo}: ${c.error}`),
  }, null, 2))
  console.log(`${modulo}: ${buenas.length}/${capturas.length} pantallas, ${def.flujos.length} flujos, ${lotes.length} lote(s)`)
}
await browser.close()
