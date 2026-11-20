import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { PendingTask } from './PendingTaskCard'

/* El documento de una tarea de Pending Task: el mismo contenido arma la vista de la Clinical Note y el PDF. Formato del
   PDF de red.dev que pasó Julián (2026-11-20): encabezado de la clínica, Dental Clinical Note, Medical History,
   Additional Notes y la firma del provider. Ver design-reference/figma/modulos/dashboard.md. */

export const CLINICA = {
  nombre: 'Red Dental Studio', sede: 'Abril',
  direccion: 'Aroser Allee 97, 5 B, Berlin, 13407, C, AR', contacto: '+54 312321322 · abril@gmail.com',
}

export type Seccion =
  | { titulo: string; campos: [string, string][] }
  | { titulo: string; listas: [string, string[]][] }
  | { titulo: string; parrafos: string[] }

export type Documento = { titulo: string; paciente: string; secciones: Seccion[]; provider: string; firmado?: string }

const MESES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const largo = (d: Date) => \`\${MESES[d.getMonth()]} \${d.getDate()}, \${d.getFullYear()}\`

/* Datos del paciente que no trae la tarea: los de la ficha de John Smith y, para el resto, unos fijos por nombre. */
function paciente(nombre: string) {
  if (nombre === 'John Smith') return { nacimiento: new Date(1999, 0, 28), telefono: '(555) 234-5678' }
  const n = [...nombre].reduce((a, c) => a + c.charCodeAt(0), 0)
  return { nacimiento: new Date(1960 + (n % 45), n % 12, (n % 27) + 1), telefono: \`+1 \${200 + (n % 700)} \${String(1000000 + n * 7919).slice(-7)}\` }
}

export function documentoTarea(t: PendingTask, firmado?: Date): Documento {
  const p = paciente(t.person)
  const edad = Math.floor((Date.now() - p.nacimiento.getTime()) / 31557600000)
  const nacio = \`\${largo(p.nacimiento)} (\${edad} yrs)\`
  const provider = (t.provider ?? '').replace(/^Dr\\.\\s*/, '')
  const visita = new Date(t.register)
  if (t.kind === 'Clinical Note') {
    return {
      titulo: 'Dental Clinical Note',
      paciente: t.person,
      provider,
      firmado: firmado && largo(firmado),
      secciones: [
        { titulo: 'Dental Clinical Note', campos: [
          ['Patient name', t.person], ['Date of birth', nacio],
          ['Date of visit', \`\${Number.isNaN(visita.getTime()) ? t.register : largo(visita)} — 09:00 AM to 09:45 AM\`],
          ['Attending dentist', provider], ['Contact', p.telefono],
        ] },
        { titulo: 'Medical History', listas: [
          ['Past medical conditions:', ['Patient reports no known medical conditions.']],
          ['Current medications:', ['Patient reports no current medications.']],
          ['Known allergies:', ['No known allergies reported.']],
          ['Past surgeries and/or hospitalizations:', ['No past surgeries or hospitalizations reported.']],
        ] },
        { titulo: 'Additional Notes', parrafos: [
          'Patient responsibilities were discussed including but not limited to daily care, use/misuse, regular maintenance appointments, and routine examination of underlying oral tissues.',
          'The patient was discharged to return home in satisfactory condition.',
        ] },
      ],
    }
  }
  /* Lab Order, Prescription y Referral: el mismo formato con los datos de la tarea. */
  const tipo = { 'Lab Orders': 'Lab Order', Prescriptions: 'Prescription', Referrals: 'Referral' }[t.kind] ?? t.kind
  return {
    titulo: tipo,
    paciente: t.person,
    provider,
    secciones: [{ titulo: tipo, campos: [
      ['Patient name', t.person], ['Date of birth', nacio], ['Provider', provider], ['Contact', p.telefono],
      ['Register', t.register], ['Expiration date', t.expiration], ['Status', t.state],
    ] }],
  }
}

/* ── PDF de una página, armado a mano con Helvetica (sin dependencias). ── */

/* Anchos de Helvetica (AFM), de " " a "~", en milésimas de em. */
const ANCHOS = [278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278, 556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 278, 278, 584, 584, 584, 556, 1015, 667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556, 833, 722, 778, 667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 278, 278, 278, 469, 556, 333, 556, 556, 500, 556, 556, 278, 556, 556, 222, 222, 500, 222, 833, 556, 556, 556, 556, 333, 500, 278, 556, 500, 722, 500, 500, 500, 334, 260, 334, 584]
const ancho = (s: string, tam: number, negrita = false) =>
  ([...s].reduce((a, c) => a + (ANCHOS[c.charCodeAt(0) - 32] ?? 556), 0) * tam * (negrita ? 1.1 : 1)) / 1000

const WIN: Record<string, number> = { '—': 0x97, '–': 0x96, '·': 0xb7, '’': 0x92, '•': 0x95 }
const texto = (s: string) =>
  [...s].map((c) => { const b = WIN[c] ?? (c.charCodeAt(0) < 256 ? c.charCodeAt(0) : 63); return b === 40 || b === 41 || b === 92 ? \`\\\\\${c}\` : String.fromCharCode(b) }).join('')

function partir(s: string, tam: number, max: number) {
  const lineas: string[] = []
  let actual = ''
  for (const p of s.split(' ')) {
    const prueba = actual ? \`\${actual} \${p}\` : p
    if (ancho(prueba, tam) > max && actual) { lineas.push(actual); actual = p } else actual = prueba
  }
  if (actual) lineas.push(actual)
  return lineas
}

const ALTO = 842
const X = 64
const ANCHO = 467
const GRIS: [number, number, number] = [0.42, 0.45, 0.5]
const NEGRO: [number, number, number] = [0.07, 0.07, 0.09]

export function pdfDeDocumento(doc: Documento) {
  const ops: string[] = []
  const col = ([r, g, b]: number[]) => \`\${r} \${g} \${b}\`
  const escribir = (s: string, x: number, y: number, tam: number, negrita = false, color = NEGRO) =>
    ops.push(\`BT /\${negrita ? 'F2' : 'F1'} \${tam} Tf \${col(color)} rg \${x.toFixed(1)} \${(ALTO - y).toFixed(1)} Td (\${texto(s)}) Tj ET\`)
  const rect = (x: number, y: number, w: number, h: number, color: number[]) => ops.push(\`\${col(color)} rg \${x} \${ALTO - y - h} \${w} \${h} re f\`)
  const circulo = (cx: number, cy: number, r: number, color: number[]) => {
    const k = r * 0.5523
    const y = ALTO - cy
    ops.push(\`\${col(color)} rg \${cx + r} \${y} m \${cx + r} \${y + k} \${cx + k} \${y + r} \${cx} \${y + r} c \${cx - k} \${y + r} \${cx - r} \${y + k} \${cx - r} \${y} c \${cx - r} \${y - k} \${cx - k} \${y - r} \${cx} \${y - r} c \${cx + k} \${y - r} \${cx + r} \${y - k} \${cx + r} \${y} c f\`)
  }

  /* Encabezado de la clínica. */
  circulo(X + 26, 86, 26, [0.9, 0.94, 1])
  escribir('R', X + 26 - ancho('R', 15, true) / 2, 91, 15, true, [0.11, 0.34, 0.74])
  escribir(CLINICA.nombre, X + 64, 84, 10.5, true)
  escribir(CLINICA.sede, X + 64, 97, 8, false, GRIS)
  escribir(CLINICA.direccion, X + ANCHO - ancho(CLINICA.direccion, 8), 70, 8)
  escribir(CLINICA.contacto, X + ANCHO - ancho(CLINICA.contacto, 8), 81, 8)

  let y = 140
  for (const s of doc.secciones) {
    rect(X, y, ANCHO, 26, [0.965, 0.97, 0.98])
    escribir(s.titulo, X + 8, y + 17, 10.5, true)
    y += 44
    if ('campos' in s) {
      for (const [k, v] of s.campos) {
        escribir(\`\${k}:\`, X, y, 9, true)
        escribir(v, X + ancho(\`\${k}:\`, 9, true) + 6, y, 9, false, GRIS)
        y += 16
      }
    } else if ('listas' in s) {
      for (const [k, items] of s.listas) {
        escribir(k, X, y, 9, true)
        y += 19
        for (const it of items) { escribir('•', X + 2, y, 9); escribir(it, X + 14, y, 9); y += 20 }
      }
    } else {
      for (const p of s.parrafos) {
        for (const l of partir(p, 9, ANCHO)) { escribir(l, X, y, 9, false, GRIS); y += 15 }
        y += 4
      }
    }
    y += 22
  }

  /* La firma del provider. */
  y += 8
  ops.push(\`0.2 0.2 0.2 RG 0.8 w \${X} \${ALTO - y} m \${X + ANCHO} \${ALTO - y} l S\`)
  escribir('Provider', X, y + 14, 7.5, true)
  escribir(doc.provider, X, y + 26, 7.5, false, GRIS)
  escribir(\`Date: \${doc.firmado ?? ''}\`, X, y + 38, 7.5, false, GRIS)

  const contenido = ops.join('\\n')
  const objetos = [
    '<< /Type /Catalog /Pages 2 0 R /ViewerPreferences << /DisplayDocTitle true >> >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    \`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 \${ALTO}] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>\`,
    \`<< /Length \${contenido.length} >>\\nstream\\n\${contenido}\\nendstream\`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>',
    \`<< /Title <FEFF\${[...\`\${doc.titulo} — \${doc.paciente}\`].map((c) => c.charCodeAt(0).toString(16).padStart(4, '0')).join('')}> /Producer (Confidentally) >>\`,
  ]
  let pdf = '%PDF-1.4\\n'
  const posiciones: number[] = []
  objetos.forEach((o, i) => { posiciones.push(pdf.length); pdf += \`\${i + 1} 0 obj\\n\${o}\\nendobj\\n\` })
  const xref = pdf.length
  pdf += \`xref\\n0 \${objetos.length + 1}\\n0000000000 65535 f \\n\${posiciones.map((p) => \`\${String(p).padStart(10, '0')} 00000 n \\n\`).join('')}\`
  pdf += \`trailer\\n<< /Size \${objetos.length + 1} /Root 1 0 R /Info 7 0 R >>\\nstartxref\\n\${xref}\\n%%EOF\`
  return new Blob([Uint8Array.from(pdf, (c) => c.charCodeAt(0))], { type: 'application/pdf' })
}

/* Como red.dev: una pestaña nueva con "Preparing document, please wait..." y después el PDF. La pestaña se abre en el
   mismo clic (si no, el navegador la bloquea); si igual la bloquea, avisa. */
export function abrirDocumento(doc: Documento, alFallar: () => void) {
  const ventana = window.open('', '_blank')
  if (!ventana) { alFallar(); return }
  ventana.document.title = \`\${doc.titulo} — \${doc.paciente}\`
  ventana.document.body.style.cssText = 'margin:0;height:100vh;display:grid;place-items:center;font:14px system-ui,sans-serif;color:#4b5563'
  ventana.document.body.textContent = 'Preparing document, please wait...'
  const url = URL.createObjectURL(pdfDeDocumento(doc))
  setTimeout(() => { ventana.location.href = url }, 700)
}
`})))()}export{n,i as r,r as t};