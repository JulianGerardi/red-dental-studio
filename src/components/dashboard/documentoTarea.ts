import type { PendingTask } from './PendingTaskCard'
import { CLINICA } from '@/data/clinica'
import { LABORATORIOS, type Denticion } from '@/data/laboratorios'
import { diagramaBoca } from '@/lib/diagramaBoca'

/* El documento de una tarea de Pending Task: el mismo contenido arma la vista de la Clinical Note y el PDF. Formato del
   PDF de red.dev que pasó Julián (2026-11-20): encabezado de la clínica, Dental Clinical Note, Medical History,
   Additional Notes y la firma del provider. Ver design-reference/figma/modulos/dashboard.md. */

export { CLINICA }

export type Seccion =
  | { titulo: string; campos: [string, string][] }
  | { titulo: string; listas: [string, string[]][] }
  | { titulo: string; parrafos: string[] }
  | { titulo: string; dientes: { denticion: Denticion; piezas: [string, string[]][] } }

/** `sinFirma`: la Lab Order no lleva firma (red.dev no la tiene). */
export type Documento = { titulo: string; paciente: string; secciones: Seccion[]; provider: string; firmado?: string; sinFirma?: boolean }

const MESES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const largo = (d: Date) => `${MESES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`

const suma = (s: string) => [...s].reduce((a, c) => a + c.charCodeAt(0), 0)
const DIRECCIONES = ['Av Siempreviva 1237, 222, New York, 1232, NY, US', '742 Evergreen Ter, 5, Brooklyn, 11215, NY, US', '19 Hudson St, 12, Jersey City, 07302, NJ, US']

/* Datos del paciente que no trae la tarea: los de la ficha de John Smith y, para el resto, unos fijos por nombre. */
function paciente(nombre: string) {
  const n = suma(nombre)
  const email = `${nombre.toLowerCase().replace(/\s+/g, '.')}@email.com`
  const direccion = DIRECCIONES[n % DIRECCIONES.length]!
  if (nombre === 'John Smith') return { nacimiento: new Date(1999, 0, 28), telefono: '(555) 234-5678', email, direccion }
  return { nacimiento: new Date(1960 + (n % 45), n % 12, (n % 27) + 1), telefono: `+1 ${200 + (n % 700)} ${String(1000000 + n * 7919).slice(-7)}`, email, direccion }
}

/* La orden de laboratorio de la tarea, fija por id: laboratorio, trabajo pedido y dientes. Los datos que muestra el PDF
   de red.dev (dashboard.md, 2026-11-25). */
const PEDIDOS: { trabajo: string; denticion: Denticion; piezas: [string, string[]][] }[] = [
  { trabajo: 'Stainless steel crowns for primary molars, mixed dentition.', denticion: 'Primary', piezas: [['A', ['O']], ['T', []], ['K', ['M', 'D']]] },
  { trabajo: 'Porcelain-fused-to-metal crown, shade A2.', denticion: 'Permanent', piezas: [['14', ['O', 'MB']]] },
  { trabajo: 'Zirconia bridge, three units, shade B1.', denticion: 'Permanent', piezas: [['19', []], ['20', ['O']], ['21', ['M', 'D']]] },
]
/* FNV-1a: reparte mejor que la suma de caracteres entre ids parecidos. */
const hash = (s: string) => [...s].reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0, 2166136261)
function ordenLab(t: PendingTask) {
  const n = hash(t.id ?? t.person)
  /* Un id con el formato de red.dev (UUID), siempre el mismo para la misma tarea. */
  let x = n
  const hex = Array.from({ length: 32 }, () => { x = (Math.imul(x, 1103515245) + 12345) >>> 0; return (x >>> 28).toString(16) }).join('')
  const id = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
  return { id, lab: LABORATORIOS[n % LABORATORIOS.length]!, ...PEDIDOS[(n >>> 8) % PEDIDOS.length]! }
}

/* El mail del provider como en red.dev: inicial y apellido. */
const mailProvider = (nombre: string) => {
  const [primero = '', ...resto] = nombre.toLowerCase().split(/\s+/)
  return `${resto.length ? `${primero[0]}${resto.at(-1)}` : primero}@confidentally.com`
}

export function documentoTarea(t: PendingTask, firmado?: Date): Documento {
  const p = paciente(t.person)
  const edad = Math.floor((Date.now() - p.nacimiento.getTime()) / 31557600000)
  const nacio = `${largo(p.nacimiento)} (${edad} yrs)`
  const provider = (t.provider ?? '').replace(/^Dr\.\s*/, '')
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
          ['Date of visit', `${Number.isNaN(visita.getTime()) ? t.register : largo(visita)} — 09:00 AM to 09:45 AM`],
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
  /* Lab Order: lo que trae el PDF de red.dev (video de Julián, 2026-11-25): el encabezado con provider, id, teléfono del
     paciente, mail y vencimiento; Patient Information, Receiving Laboratory, Provider Information, Dental Work Request y
     Teeth & Surface Specifications. Sin firma. */
  if (t.kind === 'Lab orders') {
    const o = ordenLab(t)
    const mail = mailProvider(provider)
    return {
      titulo: 'Lab Order',
      paciente: t.person,
      provider,
      sinFirma: true,
      secciones: [
        { titulo: 'Lab Order', campos: [
          ['Provider', provider], ['Lab Order ID', o.id], ['Patient Phone', p.telefono], ['Email', mail], ['Expiration Date', t.expiration],
        ] },
        { titulo: 'Patient Information', campos: [['Name', t.person], ['Phone', p.telefono], ['Email', p.email], ['Address', p.direccion]] },
        { titulo: 'Receiving Laboratory', campos: [['Name', o.lab.nombre], ['Phone', o.lab.telefono], ['Email', o.lab.email], ['Address', o.lab.direccion]] },
        { titulo: 'Provider Information', campos: [['Name', provider], ['Email', mail]] },
        { titulo: 'Dental Work Request', parrafos: [o.trabajo] },
        { titulo: 'Teeth & Surface Specifications', dientes: { denticion: o.denticion, piezas: o.piezas } },
      ],
    }
  }
  /* Prescription y Referral: el mismo formato con los datos de la tarea. */
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

/* El diagrama de la boca de la Lab Order vive en lib/diagramaBoca (lo usan también las plantillas de PDF). */
export { diagramaBoca, type ArcadaDiagrama, type DienteDiagrama } from '@/lib/diagramaBoca'

/* ── PDF de una página, armado a mano con Helvetica (sin dependencias), con el diseño de la hoja de la pantalla. ── */

/* Anchos de Helvetica (AFM), de " " a "~", en milésimas de em. */
const ANCHOS = [278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278, 556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 278, 278, 584, 584, 584, 556, 1015, 667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556, 833, 722, 778, 667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 278, 278, 278, 469, 556, 333, 556, 556, 500, 556, 556, 278, 556, 556, 222, 222, 500, 222, 833, 556, 556, 556, 556, 333, 500, 278, 556, 500, 722, 500, 500, 500, 334, 260, 334, 584]
const ancho = (s: string, tam: number, negrita = false) =>
  ([...s].reduce((a, c) => a + (ANCHOS[c.charCodeAt(0) - 32] ?? 556), 0) * tam * (negrita ? 1.1 : 1)) / 1000

const WIN: Record<string, number> = { '—': 0x97, '–': 0x96, '·': 0xb7, '’': 0x92, '•': 0x95 }
const texto = (s: string) =>
  [...s].map((c) => { const b = WIN[c] ?? (c.charCodeAt(0) < 256 ? c.charCodeAt(0) : 63); return b === 40 || b === 41 || b === 92 ? `\\${c}` : String.fromCharCode(b) }).join('')

function partir(s: string, tam: number, max: number) {
  const lineas: string[] = []
  let actual = ''
  const palabras = s.split(' ').flatMap((p) => {
    if (ancho(p, tam) <= max) return [p]
    const trozos: string[] = []
    let t = ''
    for (const c of p) { if (ancho(t + c, tam) > max && t) { trozos.push(t); t = c } else t += c }
    return [...trozos, t]
  })
  for (const p of palabras) {
    const prueba = actual ? `${actual} ${p}` : p
    if (ancho(prueba, tam) > max && actual) { lineas.push(actual); actual = p } else actual = prueba
  }
  if (actual) lineas.push(actual)
  return lineas
}

/* Mismo diseño que la hoja de la pantalla (ui/document-sheet): membrete, tipo y título, resumen en tres columnas,
   secciones numeradas, la firma del provider y el pie. */
const ALTO = 842
const X = 56
const ANCHO = 483
const AZUL: [number, number, number] = [0.114, 0.337, 0.737]
const TINTA: [number, number, number] = [0.035, 0.035, 0.043]
const SUAVE: [number, number, number] = [0.25, 0.25, 0.27]
const GRIS: [number, number, number] = [0.44, 0.44, 0.48]
const TENUE: [number, number, number] = [0.63, 0.63, 0.67]
const LINEA: [number, number, number] = [0.906, 0.906, 0.906]
const ENCIA: [number, number, number] = [0.973, 0.835, 0.82] // --color-encia
const AZUL_DIENTE: [number, number, number] = [0.39, 0.56, 0.94]

export function pdfDeDocumento(doc: Documento) {
  const ops: string[] = []
  const col = ([r, g, b]: number[]) => `${r} ${g} ${b}`
  const escribir = (s: string, x: number, y: number, tam: number, fuente: 'F1' | 'F2' | 'F3' = 'F1', color = SUAVE, espacio = 0) =>
    ops.push(`BT /${fuente} ${tam} Tf ${espacio} Tc ${col(color)} rg ${x.toFixed(1)} ${(ALTO - y).toFixed(1)} Td (${texto(s)}) Tj ET`)
  const linea = (x1: number, y1: number, x2: number, y2: number, color: number[], grosor: number) =>
    ops.push(`${col(color)} RG ${grosor} w ${x1} ${ALTO - y1} m ${x2} ${ALTO - y2} l S`)
  const rectRedondo = (x: number, y: number, w: number, h: number, r: number, color: number[]) => {
    const k = r * 0.5523
    const [x0, y0, x1, y1] = [x, ALTO - y - h, x + w, ALTO - y]
    ops.push(`${col(color)} rg ${x0 + r} ${y0} m ${x1 - r} ${y0} l ${x1 - r + k} ${y0} ${x1} ${y0 + r - k} ${x1} ${y0 + r} c ${x1} ${y1 - r} l ${x1} ${y1 - r + k} ${x1 - r + k} ${y1} ${x1 - r} ${y1} c ${x0 + r} ${y1} l ${x0 + r - k} ${y1} ${x0} ${y1 - r + k} ${x0} ${y1 - r} c ${x0} ${y0 + r} l ${x0} ${y0 + r - k} ${x0 + r - k} ${y0} ${x0 + r} ${y0} c f`)
  }

  /* Membrete. */
  rectRedondo(X, 50, 30, 30, 6, AZUL)
  escribir('RD', X + 15 - ancho('RD', 11, true) / 2, 69, 11, 'F2', [1, 1, 1])
  escribir(CLINICA.nombre, X + 40, 62, 11.5, 'F2', TINTA)
  escribir(`${CLINICA.sede} · ${CLINICA.direccion}`, X + 40, 74, 8, 'F1', GRIS)
  escribir(CLINICA.contacto, X + 40, 84, 8, 'F1', GRIS)
  linea(X, 98, X + ANCHO, 98, TINTA, 1.5)

  /* Tipo y título. */
  escribir(doc.titulo.toUpperCase(), X, 122, 7.5, 'F2', AZUL, 1)
  escribir(doc.paciente, X, 142, 15, 'F2', TINTA)

  /* Resumen: la primera sección de datos, en tres columnas. */
  let y = 158
  const datos = doc.secciones.find((s) => 'campos' in s)
  if (datos && 'campos' in datos) {
    const w = ANCHO / 3
    const filas: [string, string][][] = []
    for (let i = 0; i < datos.campos.length; i += 3) filas.push(datos.campos.slice(i, i + 3))
    const arriba = y
    for (const fila of filas) {
      const partes = fila.map(([, v]) => partir(v, 8.5, w - 16))
      const alto = 22 + Math.max(...partes.map((l) => l.length)) * 11
      fila.forEach(([k], i) => {
        escribir(k.toUpperCase(), X + i * w + 8, y + 12, 6.5, 'F2', GRIS, 0.5)
        partes[i]!.forEach((l, j) => escribir(l, X + i * w + 8, y + 24 + j * 11, 8.5, 'F1', TINTA))
      })
      y += alto
      if (fila !== filas[filas.length - 1]) linea(X, y, X + ANCHO, y, LINEA, 0.8)
    }
    for (const x of [X, X + w, X + 2 * w, X + ANCHO]) linea(x, arriba, x, y, LINEA, 0.8)
    linea(X, arriba, X + ANCHO, arriba, LINEA, 0.8)
    linea(X, y, X + ANCHO, y, LINEA, 0.8)
  }

  /* Secciones numeradas. */
  y += 30
  doc.secciones.filter((s) => s !== datos).forEach((s, i) => {
    escribir(String(i + 1), X, y, 10.5, 'F2', AZUL)
    escribir(s.titulo, X + 14, y, 10.5, 'F2', TINTA)
    y += 17
    if ('campos' in s) {
      for (const [k, v] of s.campos) {
        escribir(`${k}:`, X, y, 9, 'F2', TINTA)
        escribir(v, X + ancho(`${k}:`, 9, true) + 5, y, 9)
        y += 14
      }
    } else if ('listas' in s) {
      for (const [k, items] of s.listas) {
        escribir(k, X, y, 9, 'F2', TINTA)
        y += 14
        for (const it of items) { escribir('•', X + 2, y, 9); escribir(it, X + 14, y, 9); y += 14 }
        y += 4
      }
    } else if ('dientes' in s) {
      /* El diagrama de la boca en su panel gris y, a la derecha, cada diente con sus superficies (como red.dev). */
      const { denticion, piezas } = s.dientes
      const elegidos = new Map(piezas)
      const g = diagramaBoca(denticion)
      const [ox, oy] = [X, y - 6]
      rectRedondo(ox, oy, g.ancho, g.alto, 10, [0.953, 0.957, 0.965])
      for (const a of g.arcadas) {
        const pts = a.encia.map(([px, py]) => `${(ox + px).toFixed(1)} ${(ALTO - oy - py).toFixed(1)}`)
        ops.push(`${col(ENCIA)} RG ${g.tam + 7} w 1 J 1 j ${pts[0]} m ${pts.slice(1).map((q) => `${q} l`).join(' ')} S`)
        escribir(a.nombre, ox + a.cx - ancho(a.nombre, 8.5) / 2, oy + a.cy + 3, 8.5, 'F1', GRIS)
        for (const t of a.dientes) {
          const si = elegidos.has(t.d)
          rectRedondo(ox + t.x - g.tam / 2 - 0.8, oy + t.y - g.tam / 2 - 0.8, g.tam + 1.6, g.tam + 1.6, g.tam * 0.4, si ? AZUL : TENUE)
          rectRedondo(ox + t.x - g.tam / 2, oy + t.y - g.tam / 2, g.tam, g.tam, g.tam * 0.35, si ? AZUL_DIENTE : [1, 1, 1])
          const tamL = denticion === 'Primary' ? 8 : 6.5
          escribir(t.d, ox + t.lx - ancho(t.d, tamL) / 2, oy + t.ly + tamL / 3, tamL, 'F1', GRIS)
        }
      }
      let yl = y + 4
      for (const [d, sup] of piezas) {
        escribir(`Tooth ${d}${sup.length ? ':' : ''}`, X + g.ancho + 16, yl, 9, 'F2', TINTA)
        if (sup.length) escribir(sup.join(', '), X + g.ancho + 16 + ancho(`Tooth ${d}:`, 9, true) + 5, yl, 9)
        yl += 14
      }
      y = Math.max(oy + g.alto + 8, yl)
    } else {
      for (const p of s.parrafos) {
        for (const l of partir(p, 9, ANCHO)) { escribir(l, X, y, 9); y += 14 }
        y += 4
      }
    }
    y += 16
  })

  /* La firma del provider (la Lab Order no lleva). */
  if (!doc.sinFirma) {
    y += 24
    const finFirma = X + (ANCHO - 24) / 2
    if (doc.firmado) escribir(doc.provider, X, y - 6, 16, 'F3', AZUL)
    else escribir('Pending signature', X, y - 5, 8.5, 'F3', TENUE)
    linea(X, y, finFirma, y, TINTA, 0.8)
    escribir(`${doc.provider} · Provider`, X, y + 13, 8, 'F2', TINTA)
    escribir(doc.firmado ? `Signed electronically · ${doc.firmado}` : 'Not signed yet', X, y + 24, 7.5, 'F1', GRIS)
  }

  /* Pie. */
  linea(X, 796, X + ANCHO, 796, LINEA, 0.8)
  escribir(`${CLINICA.nombre} · ${doc.titulo} · ${doc.paciente}`, X, 808, 7, 'F1', TENUE)
  escribir('Page 1 of 1', X + ANCHO - ancho('Page 1 of 1', 7), 808, 7, 'F1', TENUE)

  const contenido = ops.join('\n')
  const objetos = [
    '<< /Type /Catalog /Pages 2 0 R /ViewerPreferences << /DisplayDocTitle true >> >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 ${ALTO}] /Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 8 0 R >> >> /Contents 4 0 R >>`,
    `<< /Length ${contenido.length} >>\nstream\n${contenido}\nendstream`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>',
    `<< /Title <FEFF${[...`${doc.titulo} — ${doc.paciente}`].map((c) => c.charCodeAt(0).toString(16).padStart(4, '0')).join('')}> /Producer (Confidentally) >>`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>',
  ]
  let pdf = '%PDF-1.4\n'
  const posiciones: number[] = []
  objetos.forEach((o, i) => { posiciones.push(pdf.length); pdf += `${i + 1} 0 obj\n${o}\nendobj\n` })
  const xref = pdf.length
  pdf += `xref\n0 ${objetos.length + 1}\n0000000000 65535 f \n${posiciones.map((p) => `${String(p).padStart(10, '0')} 00000 n \n`).join('')}`
  pdf += `trailer\n<< /Size ${objetos.length + 1} /Root 1 0 R /Info 7 0 R >>\nstartxref\n${xref}\n%%EOF`
  return new Blob([Uint8Array.from(pdf, (c) => c.charCodeAt(0))], { type: 'application/pdf' })
}

/* Como red.dev: una pestaña nueva con "Preparing document, please wait..." y después el PDF. La pestaña se abre en el
   mismo clic (si no, el navegador la bloquea); si igual la bloquea, avisa. */
export function abrirDocumento(doc: Documento, alFallar: () => void) {
  const ventana = window.open('', '_blank')
  if (!ventana) { alFallar(); return }
  ventana.document.title = `${doc.titulo} — ${doc.paciente}`
  ventana.document.body.style.cssText = 'margin:0;height:100vh;display:grid;place-items:center;font:14px system-ui,sans-serif;color:#4b5563'
  ventana.document.body.textContent = 'Preparing document, please wait...'
  const url = URL.createObjectURL(pdfDeDocumento(doc))
  setTimeout(() => { ventana.location.href = url }, 700)
}
