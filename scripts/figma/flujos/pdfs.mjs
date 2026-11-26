/* PDFs: los documentos que genera la plataforma, capturados de la página aparte (/pdfs/). Ver
   design-reference/figma/modulos/pdfs.md. */
import { PDFS } from '../../../src/pdfs/plantillas.ts'
import { clic, pasos } from './_util.mjs'

/* La hoja va en un iframe y la captura no entra ahí: se lo reemplaza por su contenido. Las reglas del documento pasan a
   cada elemento (de la última a la primera, así la primera queda más cerca del final del style y gana la más nueva):
   no se mezclan con las clases de la página (.tabla, .tarjeta…). */
const sinIframe = (p) => p.evaluate(() => {
  for (const f of document.querySelectorAll('iframe')) {
    const doc = f.contentDocument
    if (!doc?.body?.querySelector('.hoja')) continue
    const reglas = []
    for (const hoja of doc.styleSheets) {
      for (const r of hoja.cssRules) {
        if (r.constructor.name === 'CSSMediaRule') reglas.push(...r.cssRules)
        else if (r.constructor.name === 'CSSStyleRule') reglas.push(r)
      }
    }
    const caja = document.createElement('div')
    caja.setAttribute('aria-label', `PdfSheet · ${doc.title}`)
    caja.innerHTML = doc.body.innerHTML
    for (const r of reglas.reverse()) {
      for (const sel of r.selectorText.split(',').map((x) => x.trim())) {
        if (sel === 'html' || sel.startsWith('@')) continue
        const els = sel === 'body' ? [caja] : sel === '*' ? caja.querySelectorAll('*') : caja.querySelectorAll(sel)
        for (const el of els) el.setAttribute('style', `${r.style.cssText};${el.getAttribute('style') ?? ''}`)
      }
    }
    caja.querySelectorAll('style').forEach((s) => s.remove())
    caja.style.cssText += ';width:842px;box-sizing:border-box;margin:0 auto;overflow:hidden'
    f.replaceWith(caja)
  }
})

const verPdf = pasos((p) => p.waitForFunction(() => !!document.querySelector('iframe')?.contentDocument?.querySelector('.hoja main, main.hoja')), (p) => p.waitForTimeout(500), sinIframe)

const pantallaDe = (d) => ({
  nombre: d.nombre,
  ruta: `/pdfs/#${d.id}`,
  hacer: verPdf,
  nota: `${d.cuando} ${d.firma.startsWith('Not signed') ? d.firma : `Firma: ${d.firma}`} `
    + (d.origen === 'propuesta' ? 'Propuesta: la app no tiene este PDF; espera aprobación.' : 'Mismo diseño que la hoja de la app.')
    + (d.completado?.length ? ` Propuesto: ${d.completado.join(', ')}.` : ''),
})

const de = (...categorias) => PDFS.filter((d) => categorias.includes(d.categoria))
const jiraDe = (docs) => [...new Set(docs.flatMap((d) => d.jira))].sort()
const flujo = (nombre, rol, resumen, docs) => ({ nombre, rol, resumen, jira: jiraDe(docs), pantallas: docs.map(pantallaDe) })

export default {
  pagina: '📄 PDFs',
  orden: 21,
  resumen: 'Los 10 PDF que genera la plataforma, sobre una sola hoja A4 para el backend (HTML con {{variables}} y listas Mustache). Página aparte de la app: /pdfs/. El PDF de ejemplo de cada uno está en public/pdfs/.',
  jira: jiraDe(PDFS),
  flujos: [
    {
      nombre: 'PDFs — Template & preview',
      rol: 'Backend',
      jira: ['CON-4115', 'CON-2923'],
      resumen: 'La página de referencia para el backend: elegir un documento, ver su hoja con datos de ejemplo, firmada o sin firmar, ver sus {{variables}} y listas y bajar la plantilla HTML o el PDF de ejemplo. Todos comparten la hoja (membrete, tipo y título, resumen, secciones numeradas, firmas y pie).',
      pantallas: [
        { nombre: 'PDF preview (sample data)', ruta: '/pdfs/#procedure-consent', hacer: verPdf, nota: 'Lista de documentos por categoría a la izquierda; a la derecha, la ficha (cuándo se genera, quién firma, Jira, variables y listas) y la hoja con datos de ejemplo, firmada. "Download HTML" baja la plantilla y "Sample PDF" el PDF que generó Chromium.' },
        { nombre: 'PDF preview (not signed)', hacer: pasos(clic('Not signed', 'tab'), verPdf), nota: 'La misma hoja antes de firmar: las casillas del paciente quedan vacías, la línea de firma dice "Pending signature" y debajo "Not signed yet". El backend genera el mismo PDF antes y después de la firma.' },
        { nombre: 'Variables', hacer: pasos(clic('Variables', 'tab'), verPdf), nota: 'Muestra las {{variables}} que completa el backend, resaltadas en la hoja, y cada lista una sola vez. Sólo hay variables, listas ({{#lista}}…{{/lista}}) y "si está vacía" ({{^lista}}): sin otra lógica. Las *_html van sin escapar. La pestaña PDF muestra el archivo de ejemplo (no se captura: el navegador de la captura no dibuja PDF).' },
      ],
    },
    flujo('PDFs — Clinical records', 'Odontólogo', 'Registros clínicos de la visita: la nota clínica (como la app) y los exámenes periodontal y radiográfico (propuestas).', de('Clinical records')),
    flujo('PDFs — Orders', 'Odontólogo · Laboratorio · Contacto derivado', 'Órdenes que salen de la clínica: la Lab order (como la app, sin firma), la receta y la derivación (propuestas, con los campos de CON-2230 y CON-2322).', de('Orders')),
    flujo('PDFs — Treatment & consent', 'Paciente · Odontólogo', 'El plan de tratamiento y los consentimientos: del procedimiento (como la app) y, al decidir todos los casos, el de aceptación y el de rechazo (CON-2923, propuestas).', de('Treatment & consent')),
  ],
}
