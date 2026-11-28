/* Exporta los PDFs para el backend: la plantilla HTML de cada documento (con sus {{variables}} y {{#listas}}), un
   pdfs.json con cuándo se genera, quién firma, variables, listas y datos de ejemplo, y un PDF de ejemplo por documento
   (Chromium con Playwright). Fuente: src/pdfs/. Uso: `npm run pdfs:exportar` (con --check falla si public/pdfs/ quedó
   desactualizado; no mira los PDF). Ver design-reference/figma/modulos/pdfs.md. */
import { mkdirSync, readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { createRequire } from 'node:module'
import { PDFS, htmlDe, ejemploDe } from '../src/pdfs/plantillas.ts'
import { completar, variablesDe } from '../src/pdfs/marco.ts'

const DESTINO = join(import.meta.dirname, '..', 'public', 'pdfs')
const PUBLICADO = 'https://juliangerardi.github.io/red-dental-studio/pdfs'
const check = process.argv.includes('--check')
const archivos = {}

for (const p of PDFS) archivos[`${p.id}.html`] = htmlDe(p)
archivos['pdfs.json'] = JSON.stringify(
  PDFS.map((p) => {
    const ejemplo = ejemploDe(p, PUBLICADO)
    const { variables, listas } = variablesDe(htmlDe(p), ejemplo)
    const faltan = [...variables, ...Object.keys(listas).filter((l) => !l.includes('.'))].filter((v) => !(v in ejemplo))
    if (faltan.length) throw new Error(`${p.id}: faltan datos de ejemplo para ${faltan.join(', ')}`)
    return {
      id: p.id,
      category: p.categoria,
      name: p.nombre,
      generated: p.cuando,
      signed_by: p.firma,
      layout: p.origen === 'app' ? 'same as the app' : 'proposal, pending approval',
      template: `${p.id}.html`,
      sample_pdf: `${p.id}.pdf`,
      variables,
      lists: listas,
      raw_html: variables.filter((v) => v.endsWith('_html')),
      /* Sólo lo que usa la plantilla: COMUNES trae datos que no todos los documentos imprimen. */
      sample_data: Object.fromEntries(Object.entries(ejemplo).filter(([k]) => variables.includes(k) || k in listas)),
      jira: p.jira,
    }
  }),
  null,
  2,
) + '\n'

const viejos = Object.entries(archivos).filter(([n, c]) => !existsSync(join(DESTINO, n)) || readFileSync(join(DESTINO, n), 'utf8') !== c)
if (check) {
  if (viejos.length) {
    console.error(`public/pdfs/ desactualizado (${viejos.map(([n]) => n).join(', ')}). Corré npm run pdfs:exportar.`)
    process.exit(1)
  }
  console.log(`public/pdfs/ al día (${PDFS.length} documentos).`)
} else {
  mkdirSync(DESTINO, { recursive: true })
  for (const [n, c] of viejos) writeFileSync(join(DESTINO, n), c)
  /* Los PDF de ejemplo: sólo los que cambiaron o faltan (con --todos, todos). Chromium usa @page para el tamaño A4,
     los márgenes y el pie con el número de página. */
  const forzar = process.argv.includes('--todos')
  const rehacer = PDFS.filter((p) => forzar || !existsSync(join(DESTINO, `${p.id}.pdf`)) || viejos.some(([n]) => n === `${p.id}.html`))
  if (rehacer.length) {
    const { chromium } = createRequire(import.meta.url)('playwright')
    const navegador = await chromium.launch()
    const pagina = await navegador.newPage()
    for (const p of rehacer) {
      /* Desde un archivo al lado de las imágenes de ejemplo: setContent no deja cargar file://. */
      const temporal = join(DESTINO, `.${p.id}.tmp.html`)
      writeFileSync(temporal, completar(htmlDe(p), ejemploDe(p, '.')))
      await pagina.goto(`file://${temporal}`, { waitUntil: 'load' })
      rmSync(temporal)
      await pagina.emulateMedia({ media: 'print' })
      await pagina.pdf({ path: join(DESTINO, `${p.id}.pdf`), preferCSSPageSize: true, printBackground: true })
    }
    await navegador.close()
  }
  console.log(`${PDFS.length} documentos en public/pdfs/ (${viejos.length} archivos y ${rehacer.length} PDF actualizados).`)
}
