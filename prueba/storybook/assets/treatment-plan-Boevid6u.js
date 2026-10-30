import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`/* Treatment Plan — Figma 4118:220403 "Treatment Plan — Section (Cases,
   Workflow & Dialogs)".

   Contenido tal cual el frame, typos incluidos: "Acepted", "Discarted",
   "Periodontists Recommended" / "Periodontist Alternative", y el pie de la
   tabla que dice "insurances" en una tabla de procedimientos. */

/* Planning -> Pending -> Presented -> Waiting for consent -> Accepted, o Discarded. Sólo en Planning el caso se edita;
   Pending es el plan terminado que espera ser presentado. Al aceptarlo salen los consentimientos y espera la firma
   (Waiting for consent, como en la app real). */
export type EstadoCaso = 'Planning' | 'Pending' | 'Presented' | 'Waiting for consent' | 'Accepted' | 'Discarded'

export type Procedimiento = {
  id: string
  fecha: string
  superficie: string
  pieza: string
  ubicacion: string
  codigo: string
  nombre: string
  proveedor: string
  fee: string
  estado: 'Planned' | 'Completed' | 'Removed'
  /** Sólo en los procedimientos de un caso: los sueltos no tienen consentimiento. */
  consentimiento?: ConsentProcedimiento
}

export type ConsentProcedimiento = 'Signed' | 'Pending' | 'Not sent' | 'Expired'

/* El turno vinculado a la visita, si hay. Sin turno, la visita dice "No appointment". */
export type Cita = { fecha: string; hora: string; proveedor: string }
export type Visita = { id: string; nombre: string; total: string; procedimientos: Procedimiento[]; cita?: Cita }

/* Los procedimientos del caso que son procedimientos del paciente (VINCULOS_PROCEDIMIENTO en data/clinical-mode) llevan
   su código, pieza y superficie: así la fila y su detalle dicen lo mismo. El resto queda como el frame. Ver
   clinical-mode.md (2026-10-13). */
const DEL_PACIENTE: Record<string, Partial<Procedimiento>> = {
  c1v2p1: { codigo: 'D4341', nombre: 'Periodontal scaling and root planing – four or more teeth per quadrant', superficie: '-', pieza: '-', ubicacion: 'Upper Arch' },
  c3v1p1: { codigo: 'D2391', nombre: 'Resin-based composite – one surface, posterior', superficie: 'O', pieza: '3', ubicacion: '-' },
  c3v1p2: { codigo: 'D2392', nombre: 'Resin-based composite – two surfaces, posterior', superficie: 'O, D', pieza: '14', ubicacion: '-' },
  c5v2p1: { codigo: 'D3330', nombre: 'Endodontic therapy, molar tooth', superficie: '-', pieza: '19', ubicacion: '-' },
  c7v1p1: { codigo: 'D7140', nombre: 'Extraction – erupted tooth or exposed root (elevation and/or forceps removal)', superficie: '-', pieza: '16', ubicacion: '-' },
}

const proc = (id: string, estado: Procedimiento['estado'] = 'Planned', consentimiento?: ConsentProcedimiento): Procedimiento => ({
  id,
  fecha: '2025/01/24',
  superficie: '1',
  pieza: '1',
  ubicacion: '1',
  codigo: 'D0120',
  nombre: 'Periodic oral evaluation',
  proveedor: 'Perez Martinez',
  fee: '$234',
  estado,
  consentimiento,
  ...DEL_PACIENTE[id],
})

/* Los procedimientos de una visita, cada uno con el estado de su consentimiento. */
const visita = (prefijo: string, consentimientos: ConsentProcedimiento[]) =>
  consentimientos.map((c, i) => proc(\`\${prefijo}p\${i + 1}\`, 'Planned', c))

export const NO_ASIGNADOS: Procedimiento[] = Array.from({ length: 15 }, (_, i) => proc(\`u\${i + 1}\`))

export type Caso = {
  id: string
  nombre: string
  grupo: string
  estado: EstadoCaso
  creado: string
  creadoPor: string
  total: string
  visitas: Visita[]
  /** El caso es de una ubicación donde el usuario no puede editar planes: se avisa y no se edita. */
  sinPermiso?: boolean
}

/* Los planes del paciente. La pantalla los agrupa por fecha de creación (DD/MM/YYYY, como la app real), la más nueva
   arriba; los de una fecha son las alternativas de un grupo: al aceptar una, las otras se descartan.
   El total sale de los fees: es el mismo número que desglosa Estimate details (clinical-mode.md, 2026-10-28). */
const totalDeFees = (c: Caso): Caso => ({
  ...c,
  total: c.visitas.flatMap((v) => v.procedimientos).filter((p) => p.estado !== 'Removed')
    .reduce((t, p) => t + (Number(p.fee.replace(/[^0-9.]/g, '')) || 0), 0)
    .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
})

export const CASOS: Caso[] = ([
  {
    id: 'c1', nombre: 'Periodontists Recommended', grupo: 'Periodontal', estado: 'Planning',
    creado: '27/08/2026', creadoPor: 'Provider 1', total: '231.12',
    visitas: [
      { id: 'v1', nombre: 'Visit 1', total: '$100.000', procedimientos: visita('c1v1', ['Signed', 'Signed', 'Pending', 'Pending']), cita: { fecha: 'Sep 2, 2026', hora: '10:00 AM', proveedor: 'Perez Martinez' } },
      { id: 'v2', nombre: 'Visit 2', total: '$100.000', procedimientos: visita('c1v2', ['Pending', 'Not sent', 'Not sent', 'Expired']) },
    ],
  },
  {
    id: 'c2', nombre: 'Periodontist Alternative', grupo: 'Periodontal', estado: 'Planning',
    creado: '27/08/2026', creadoPor: 'Provider 1', total: '184.60',
    visitas: [
      { id: 'v1', nombre: 'Visit 1', total: '$84.600', procedimientos: visita('c2v1', ['Signed', 'Pending', 'Not sent']) },
    ],
  },
  {
    id: 'c3', nombre: 'Restorative Plan', grupo: 'Restorative', estado: 'Waiting for consent',
    creado: '26/08/2026', creadoPor: 'Provider 1', total: '96.00',
    visitas: [
      { id: 'v1', nombre: 'Visit 1', total: '$96.000', procedimientos: visita('c3v1', ['Pending', 'Not sent']) },
    ],
  },
  {
    id: 'c8', nombre: 'Orthodontic Plan', grupo: 'Orthodontics', estado: 'Pending',
    creado: '25/08/2026', creadoPor: 'Provider 1', total: '2,400.00',
    visitas: [
      { id: 'v1', nombre: 'Visit 1', total: '$2,400.000', procedimientos: visita('c8v1', ['Not sent', 'Not sent']) },
    ],
  },
  {
    id: 'c4', nombre: 'Crown Option', grupo: 'Prosthodontics', estado: 'Presented',
    creado: '24/08/2026', creadoPor: 'Provider 1', total: '412.00',
    visitas: [
      { id: 'v1', nombre: 'Visit 1', total: '$412.000', procedimientos: visita('c4v1', ['Not sent', 'Not sent']) },
    ],
  },
  {
    id: 'c5', nombre: 'Endodontic Treatment', grupo: 'Endodontics', estado: 'Accepted',
    creado: '27/04/2026', creadoPor: 'Provider 1', total: '640.00',
    visitas: [
      { id: 'v1', nombre: 'Visit 1', total: '$320.000', procedimientos: visita('c5v1', ['Signed', 'Signed']).map((p) => ({ ...p, estado: 'Completed' as const })), cita: { fecha: 'May 4, 2026', hora: '9:30 AM', proveedor: 'Perez Martinez' } },
      { id: 'v2', nombre: 'Visit 2', total: '$320.000', procedimientos: visita('c5v2', ['Signed']) },
    ],
  },
  {
    id: 'c6', nombre: 'Implant Option', grupo: 'Implant', estado: 'Discarded',
    creado: '17/04/2026', creadoPor: 'Provider 1', total: '1,250.00', sinPermiso: true,
    visitas: [
      { id: 'v1', nombre: 'Visit 1', total: '$1,250.000', procedimientos: visita('c6v1', ['Not sent']) },
    ],
  },
  {
    id: 'c7', nombre: 'Bridge Option', grupo: 'Implant', estado: 'Accepted',
    creado: '17/04/2026', creadoPor: 'Provider 1', total: '980.00', sinPermiso: true,
    visitas: [
      { id: 'v1', nombre: 'Visit 1', total: '$980.000', procedimientos: visita('c7v1', ['Signed', 'Signed']) },
    ],
  },
] satisfies Caso[]).map(totalDeFees)

/* El paciente del encabezado de Clinical Mode (ClinicalTopBar), para los diálogos que lo nombran. */
export const PACIENTE = 'Julio Perez'

/* DD/MM/YYYY a un número que ordena: el más nuevo, mayor. */
export const ordenFecha = (fecha: string) => {
  const [d, m, a] = fecha.split('/').map(Number)
  return (a ?? 0) * 10000 + (m ?? 0) * 100 + (d ?? 0)
}

export const CATEGORIAS = [
  'Preventive', 'Restorative', 'Periodontics', 'Endodontics', 'Prosthodontics', 'Surgery',
]

/* ── Consentimiento ─────────────────────────────────────────────────

   El frame lo deja al pie del caso, con dos avisos repetidos —"Provider
   signature pending" dos veces— y sin decir quién firmó ni cuándo: para saberlo
   hay que abrir Consent history y recién ahí elegir el documento.

   Acá el documento sube al principio de la pantalla, con el estado de cada
   firma y la acción pendiente en el mismo bloque; el historial pasa a ser una
   vista secundaria. */

export type Firma = {
  rol: 'Patient' | 'Provider'
  nombre: string
  estado: 'Signed' | 'Pending'
  fecha?: string
}

export type Consentimiento = {
  id: string
  titulo: string
  estado: 'Pending' | 'Signed' | 'Expired'
  firmas: Firma[]
  historial: { id: string; version: string; fecha: string; evento: string; autor: string }[]
}

export const CONSENTIMIENTO: Consentimiento = {
  id: 'consent-1',
  titulo: 'Informed Consent for Dental Treatment – Prueba 1',
  estado: 'Pending',
  firmas: [
    { rol: 'Patient', nombre: 'John Smith', estado: 'Signed', fecha: '05/14/2026' },
    { rol: 'Provider', nombre: 'Perez Martinez', estado: 'Pending' },
  ],
  historial: [
    { id: 'h1', version: 'v3', fecha: '05/14/2026', evento: 'Sent to patient', autor: 'Perez Martinez' },
    { id: 'h2', version: 'v3', fecha: '05/14/2026', evento: 'Signed by patient', autor: 'John Smith' },
    { id: 'h3', version: 'v2', fecha: '04/02/2026', evento: 'Replaced by a newer version', autor: 'Perez Martinez' },
    { id: 'h4', version: 'v1', fecha: '01/07/2024', evento: 'Created', autor: 'Provider 1' },
  ],
}

/* Copias exactas de los diálogos del frame. */
export const DIALOGOS = {
  /* No está en el frame: es el paso que cierra la planificación. */
  finish: {
    titulo: 'Finish Planning',
    texto: ['Are you sure you want to finish planning this case? It will no longer be editable and will be ready to present to the patient.'],
  },
  present: {
    titulo: 'Present Case',
    texto: ['Are you sure you want to present this case to the patient?'],
  },
  accept: {
    titulo: 'Accept Case',
    texto: [
      'Are you sure you want to accept this case? The other options in this group will be automatically discarded.',
      'This will complete the treatment decisions for this group and send the corresponding consent forms to the patient.',
    ],
  },
  discard: {
    titulo: 'Discard Case',
    texto: ['Are you sure you want to discard this case?'],
  },
  /* Del menú del caso en la app real (Actions Treatment): cierran el plan. */
  expire: {
    titulo: 'Expire Treatment Plan',
    texto: ['Are you sure you want to expire this treatment plan? It will no longer be available to accept.'],
  },
  cancel: {
    titulo: 'Cancel Treatment Plan',
    texto: ['Are you sure you want to cancel this treatment plan?'],
  },
  removeProcedure: {
    titulo: 'Remove Procedure',
    texto: ['Are you sure you want to remove this procedure from the case?'],
  },
} as const
export type ClaveDialogo = keyof typeof DIALOGOS

/* Al cambiar el estado de un procedimiento (Complete en Treatment Plan, Start en Procedures): los textos del prototipo de
   Julián "Consent modals revised" para CON-3927, CON-3946 y CON-3950. Ver clinical-mode.md (2026-10-17). */
export const CONSENTIMIENTO_REQUERIDO = {
  titulo: 'Consent required',
  /* Sin documento, un borrador sin enviar o uno vencido: se manda (o se reusa el borrador) y el paciente firma después. */
  'sin-enviar': {
    texto: 'This procedure requires a consent document. Send it to the patient to sign later, or have it signed now.',
    textoVarios: 'These procedures require a consent document. Send it to the patient to sign later, or have it signed now.',
    accion: 'Send consent and sign later',
  },
  /* El documento ya se mandó y falta la firma: se sigue con la firma pendiente, sin mandar otro. */
  pendiente: {
    texto: 'A consent document already exists for this procedure. You can sign it now or continue with the signature pending.',
    textoVarios: 'Consent documents already exist for these procedures. You can sign them now or continue with the signatures pending.',
    accion: 'Continue without signed consent',
  },
  firmar: 'Sign now',
  ver: 'View consent',
  /* El caso todavía no se aceptó: no hay consentimiento que pedir, el procedimiento no se actualiza. */
  noListo: {
    titulo: 'Procedure cannot be updated',
    texto: 'The treatment case must be Accepted and its treatment plan must be Accepted or In Progress.',
    accion: 'View case',
  },
} as const

export const OPCIONES_BORRAR_CASO = [
  {
    id: 'con-procedimientos',
    titulo: 'Delete Case and Procedures',
    detalle: 'The procedure will remain in the current treatment plan and also be added to the selected destination plan.',
  },
  {
    id: 'solo-caso',
    titulo: 'Delete Case',
    detalle: 'Only remove the case; the procedures remain available for reuse and are moved to the Unassigned category if they are not linked to another case.',
  },
]

/* Modal "Workflow — New Workflow Modal" (4122:246942). El Figma lo abre desde
   New Alternative Case **y** desde Move to, con el mismo título "Move
   Procedure to Existing Case" en los dos casos. Ver anomalías. */
export const MOVER = {
  titulo: 'Move Procedure to Existing Case',
  bajada: 'Select the destination case and move option to move the procedure to the selected case.',
  opciones: [
    {
      id: 'mantener',
      titulo: 'Keep in original plan and add to destination plan',
      detalle: 'The procedure will remain in the current treatment plan and also be added to the selected destination plan.',
    },
    {
      id: 'mover',
      titulo: 'Move to destination plan only',
      /* El frame repite el mismo detalle en las dos opciones, aunque esta diga
         justo lo contrario. Se replica. */
      detalle: 'The procedure will remain in the current treatment plan and also be added to the selected destination plan.',
    },
  ],
}

/* Modal "New Case Group" (4122:246100): un solo campo. */
export const NUEVO_GRUPO = { titulo: 'New Case Group', campo: 'Case Name' }

/* Modal "Complete Procedure" (4122:250957). El texto pide **seleccionar** las
   condiciones ligadas, pero las tarjetas del frame no tienen con qué: se les
   suma la casilla del sistema para que la instrucción se pueda cumplir. */
export const COMPLETAR = {
  titulo: 'Complete Procedure',
  texto: [
    'You are about to complete this procedure.',
    'Select any linked conditions you want to mark as Treated.',
  ],
  condiciones: [
    { id: 'cc1', estado: 'Active' as const, fecha: 'May 18, 2026', zona: 'Soft Palate', condicion: 'oral candidiasis', descriptores: 'Red' },
    { id: 'cc2', estado: 'Active' as const, fecha: 'May 18, 2026', zona: 'Soft Palate', condicion: 'oral candidiasis', descriptores: 'Red' },
    { id: 'cc3', estado: 'Active' as const, fecha: 'May 18, 2026', zona: 'Soft Palate', condicion: 'oral candidiasis', descriptores: 'Red' },
  ],
}
`})))()}export{r as n,n as r,i as t};