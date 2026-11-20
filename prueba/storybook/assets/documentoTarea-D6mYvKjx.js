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
  if (t.kind === 'Clinical note') {
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
  const tipo = { 'Lab orders': 'Lab Order', Prescriptions: 'Prescription', Referrals: 'Referral' }[t.kind] ?? t.kind
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

/* ── PDF armado a mano con Helvetica (sin dependencias). ── */

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
type Color = [number, number, number]
const GRIS: Color = [0.42, 0.45, 0.5]
const NEGRO: Color = [0.07, 0.07, 0.09]
const AZUL: Color = [0.11, 0.34, 0.74]
const BANDA: Color = [0.965, 0.97, 0.98]
const col = ([r, g, b]: number[]) => \`\${r} \${g} \${b}\`

/* Las páginas: cada una junta sus operaciones; \`pdf()\` arma el archivo. La y se cuenta desde arriba. */
class Lienzo {
  paginas: string[][] = [[]]
  private get ops() { return this.paginas[this.paginas.length - 1]! }
  nuevaPagina() { this.paginas.push([]) }
  escribir(s: string, x: number, y: number, tam: number, negrita = false, color: Color = NEGRO) {
    this.ops.push(\`BT /\${negrita ? 'F2' : 'F1'} \${tam} Tf \${col(color)} rg \${x.toFixed(1)} \${(ALTO - y).toFixed(1)} Td (\${texto(s)}) Tj ET\`)
  }
  derecha(s: string, xFin: number, y: number, tam: number, negrita = false, color: Color = NEGRO) {
    this.escribir(s, xFin - ancho(s, tam, negrita), y, tam, negrita, color)
  }
  rect(x: number, y: number, w: number, h: number, relleno: Color, borde?: Color) {
    this.ops.push(\`\${col(relleno)} rg \${borde ? \`\${col(borde)} RG 0.6 w \` : ''}\${x} \${ALTO - y - h} \${w} \${h} re \${borde ? 'B' : 'f'}\`)
  }
  circulo(cx: number, cy: number, r: number, relleno: Color, borde?: Color) {
    const k = r * 0.5523
    const y = ALTO - cy
    this.ops.push(\`\${col(relleno)} rg \${borde ? \`\${col(borde)} RG 0.6 w \` : ''}\${cx + r} \${y} m \${cx + r} \${y + k} \${cx + k} \${y + r} \${cx} \${y + r} c \${cx - k} \${y + r} \${cx - r} \${y + k} \${cx - r} \${y} c \${cx - r} \${y - k} \${cx - k} \${y - r} \${cx} \${y - r} c \${cx + k} \${y - r} \${cx + r} \${y - k} \${cx + r} \${y} c \${borde ? 'B' : 'f'}\`)
  }
  linea(x1: number, y1: number, x2: number, y2: number) {
    this.ops.push(\`0.2 0.2 0.2 RG 0.8 w \${x1} \${ALTO - y1} m \${x2} \${ALTO - y2} l S\`)
  }
  banda(titulo: string, y: number) {
    this.rect(X, y, ANCHO, 26, BANDA)
    this.escribir(titulo, X + 8, y + 17, 10.5, true)
  }
  pdf(titulo: string) {
    const n = this.paginas.length
    /* 1 catálogo, 2 páginas, 3 y 4 fuentes, 5 info; después, de a dos: página y su contenido. */
    const objetos = [
      '<< /Type /Catalog /Pages 2 0 R /ViewerPreferences << /DisplayDocTitle true >> >>',
      \`<< /Type /Pages /Kids [\${this.paginas.map((_, i) => \`\${6 + i * 2} 0 R\`).join(' ')}] /Count \${n} >>\`,
      '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
      '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>',
      \`<< /Title <FEFF\${[...titulo].map((c) => c.charCodeAt(0).toString(16).padStart(4, '0')).join('')}> /Producer (Confidentally) >>\`,
      ...this.paginas.flatMap((ops, i) => {
        const contenido = ops.join('\\n')
        return [
          \`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 \${ALTO}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents \${7 + i * 2} 0 R >>\`,
          \`<< /Length \${contenido.length} >>\\nstream\\n\${contenido}\\nendstream\`,
        ]
      }),
    ]
    let pdf = '%PDF-1.4\\n'
    const posiciones: number[] = []
    objetos.forEach((o, i) => { posiciones.push(pdf.length); pdf += \`\${i + 1} 0 obj\\n\${o}\\nendobj\\n\` })
    const xref = pdf.length
    pdf += \`xref\\n0 \${objetos.length + 1}\\n0000000000 65535 f \\n\${posiciones.map((p) => \`\${String(p).padStart(10, '0')} 00000 n \\n\`).join('')}\`
    pdf += \`trailer\\n<< /Size \${objetos.length + 1} /Root 1 0 R /Info 5 0 R >>\\nstartxref\\n\${xref}\\n%%EOF\`
    return new Blob([Uint8Array.from(pdf, (c) => c.charCodeAt(0))], { type: 'application/pdf' })
  }
}

/* La Clinical Note (y por ahora Prescription y Referral): formato del PDF de red.dev del 2026-11-20. */
export function pdfDeDocumento(doc: Documento) {
  const l = new Lienzo()
  l.circulo(X + 26, 86, 26, [0.9, 0.94, 1])
  l.escribir('R', X + 26 - ancho('R', 15, true) / 2, 91, 15, true, AZUL)
  l.escribir(CLINICA.nombre, X + 64, 84, 10.5, true)
  l.escribir(CLINICA.sede, X + 64, 97, 8, false, GRIS)
  l.derecha(CLINICA.direccion, X + ANCHO, 70, 8)
  l.derecha(CLINICA.contacto, X + ANCHO, 81, 8)

  let y = 140
  for (const s of doc.secciones) {
    l.banda(s.titulo, y)
    y += 44
    if ('campos' in s) {
      for (const [k, v] of s.campos) {
        l.escribir(\`\${k}:\`, X, y, 9, true)
        l.escribir(v, X + ancho(\`\${k}:\`, 9, true) + 6, y, 9, false, GRIS)
        y += 16
      }
    } else if ('listas' in s) {
      for (const [k, items] of s.listas) {
        l.escribir(k, X, y, 9, true)
        y += 19
        for (const it of items) { l.escribir('•', X + 2, y, 9); l.escribir(it, X + 14, y, 9); y += 20 }
      }
    } else {
      for (const p of s.parrafos) {
        for (const linea of partir(p, 9, ANCHO)) { l.escribir(linea, X, y, 9, false, GRIS); y += 15 }
        y += 4
      }
    }
    y += 22
  }

  /* La firma del provider. */
  y += 8
  l.linea(X, y, X + ANCHO, y)
  l.escribir('Provider', X, y + 14, 7.5, true)
  l.escribir(doc.provider, X, y + 26, 7.5, false, GRIS)
  l.escribir(\`Date: \${doc.firmado ?? ''}\`, X, y + 38, 7.5, false, GRIS)
  return l.pdf(\`\${doc.titulo} — \${doc.paciente}\`)
}

/* ── La Lab Order: formato del PDF de red.dev (video de Julián del 2026-11-20). Dos páginas: los datos y, en la
   segunda, Teeth & Surface Specifications con el odontograma y las superficies de cada diente. ── */

export type OrdenLab = {
  id: string
  provider: { nombre: string; email: string }
  paciente: { nombre: string; telefono: string; email: string; direccion: string }
  laboratorio: { nombre: string; telefono: string; email: string; direccion: string }
  vence: string
  trabajo: string
  dientes: [number, string][]
}

const iso = (mdy: string) => { const [m, d, a] = mdy.split('/'); return a && m && d ? \`\${a}-\${m}-\${d}\` : mdy }

export function ordenDeLab(t: PendingTask): OrdenLab {
  const p = paciente(t.person)
  const prov = (t.provider ?? '').replace(/^Dr\\.\\s*/, '')
  const [nombre = '', apellido = ''] = prov.split(' ')
  const n = [...(t.id ?? t.person)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7)
  const hex = (k: number, largo: number) => ((n * (k + 1) * 2654435761) >>> 0).toString(16).padStart(8, '0').slice(0, largo)
  return {
    id: \`\${hex(1, 8)}-\${hex(2, 4)}-\${hex(3, 4)}-\${hex(4, 4)}-\${hex(5, 8)}\${hex(6, 4)}\`,
    provider: { nombre: prov, email: \`\${nombre[0] ?? ''}\${apellido || nombre}\`.toLowerCase() + '@confidentally.com' },
    paciente: { nombre: t.person, telefono: p.telefono, email: \`\${t.person.toLowerCase().replace(/\\s+/g, '.')}@gmail.com\`, direccion: '245 Brickell Ave, 12, Miami, 33131, FL, US' },
    laboratorio: { nombre: 'Olivos Laboratory', telefono: '+52 7777 7777', email: 'orders@olivoslab.com', direccion: 'Av Siempre Viva 5400, Barcelona, ES' },
    vence: iso(t.expiration),
    trabajo: 'Full-coverage crown, shade A2.',
    dientes: [[3, 'O'], [14, 'B'], [30, 'L']],
  }
}

export function pdfOrdenLab(o: OrdenLab) {
  const l = new Lienzo()
  /* Encabezado: el logo (cuadro) y la clínica a la izquierda; provider, id, teléfono, email y vencimiento a la derecha. */
  l.rect(X, 60, 40, 40, [1, 1, 1], [0.88, 0.89, 0.91])
  l.escribir(CLINICA.nombre, X + 52, 85, 13, true, AZUL)
  const fin = X + ANCHO
  l.derecha(o.provider.nombre, fin, 64, 7.5, true)
  ;[\`Lab Order ID: \${o.id}\`, \`Patient Phone: \${o.paciente.telefono}\`, \`Email: \${o.provider.email}\`, \`Expiration Date: \${o.vence}\`]
    .forEach((s, i) => l.derecha(s, fin, 75 + i * 10.5, 7.5, true))

  let y = 130
  const bloque = (titulo: string, campos: [string, string][]) => {
    l.banda(titulo, y)
    y += 42
    for (const [k, v] of campos) {
      l.escribir(\`\${k}:\`, X, y, 8, true)
      l.escribir(v, X, y + 12, 8, false, NEGRO)
      y += 28
    }
    y += 10
  }
  bloque('Patient Information', [['Name', o.paciente.nombre], ['Phone', o.paciente.telefono], ['Email', o.paciente.email], ['Address', o.paciente.direccion]])
  bloque('Receiving Laboratory', [['Name', o.laboratorio.nombre], ['Phone', o.laboratorio.telefono], ['Email', o.laboratorio.email], ['Address', o.laboratorio.direccion]])
  bloque('Provider Information', [['Name', o.provider.nombre], ['Email', o.provider.email]])
  l.banda('Dental Work Request', y)
  y += 42
  for (const linea of partir(o.trabajo, 8, ANCHO)) { l.escribir(linea, X, y, 8); y += 12 }

  /* Segunda página: el odontograma, con los dientes de la orden en azul, y la lista de superficies. */
  l.nuevaPagina()
  l.banda('Teeth & Surface Specifications', 60)
  const marcados = new Map(o.dientes)
  const cx = X + 90
  const arcada = (desde: number, cy: number, arriba: boolean) => {
    for (let i = 0; i < 16; i++) {
      const ang = Math.PI * (i / 15)
      const x = cx - Math.cos(ang) * 62
      const yy = cy + (arriba ? -1 : 1) * Math.sin(ang) * 72
      const num = arriba ? desde + i : desde - i
      l.circulo(x, yy, 7.5, marcados.has(num) ? [0.39, 0.58, 0.93] : [1, 1, 1], [0.85, 0.6, 0.6])
      const nx = cx - Math.cos(ang) * 82
      const ny = cy + (arriba ? -1 : 1) * Math.sin(ang) * 90 + 3
      l.escribir(String(num), nx - ancho(String(num), 7) / 2, ny, 7, false, GRIS)
    }
  }
  l.rect(X, 100, 180, 300, [0.97, 0.97, 0.98])
  arcada(1, 240, true)
  arcada(32, 262, false)
  l.escribir('Maxillary', cx - ancho('Maxillary', 9) / 2, 215, 9, false, GRIS)
  l.escribir('Mandibular', cx - ancho('Mandibular', 9) / 2, 292, 9, false, GRIS)
  o.dientes.forEach(([d, sup], i) => l.escribir(\`Tooth \${d}: \${sup}\`, X + 196, 112 + i * 11, 7.5, true))
  return l.pdf('Lab Order')
}

/* Como red.dev: una pestaña nueva con "Preparing document, please wait..." y después el PDF. La pestaña se abre en el
   mismo clic (si no, el navegador la bloquea); si igual la bloquea, avisa. */
export function abrirPdfEnPestana(titulo: string, armar: () => Blob, alFallar: () => void) {
  const ventana = window.open('', '_blank')
  if (!ventana) { alFallar(); return }
  ventana.document.title = titulo
  ventana.document.body.style.cssText = 'margin:0;height:100vh;display:grid;place-items:center;font:14px system-ui,sans-serif;color:#4b5563'
  ventana.document.body.textContent = 'Preparing document, please wait...'
  const url = URL.createObjectURL(armar())
  setTimeout(() => { ventana.location.href = url }, 700)
}

export const abrirDocumento = (doc: Documento, alFallar: () => void) =>
  abrirPdfEnPestana(\`\${doc.titulo} — \${doc.paciente}\`, () => pdfDeDocumento(doc), alFallar)
`})))()}export{n,i as r,r as t};