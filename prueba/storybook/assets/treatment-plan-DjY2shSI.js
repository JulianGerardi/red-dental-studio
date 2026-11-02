import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`/* Treatment Plan — Figma 4118:220403 "Treatment Plan — Section (Cases,
   Workflow & Dialogs)".

   Contenido tal cual el frame, typos incluidos: "Acepted", "Discarted",
   "Periodontists Recommended" / "Periodontist Alternative", y el pie de la
   tabla que dice "insurances" en una tabla de procedimientos. */

/* Planning -> Pending -> Presented -> Waiting for consent -> Accepted -> In progress (el primer Start), o Discarded; el
   plan se puede cancelar (Cancelled) o vencer (Expired), CON-4052. Sólo en Planning el caso se edita;
   Pending es el plan terminado que espera ser presentado. Al aceptarlo salen los consentimientos y espera la firma
   (Waiting for consent, como en la app real). */
import type { EstadoProcedimiento } from '@/data/clinical-mode'

export type EstadoCaso = 'Planning' | 'Pending' | 'Presented' | 'Waiting for consent' | 'Accepted' | 'In progress' | 'Discarded' | 'Cancelled' | 'Expired'

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
  /** Los de la ficha del paciente, más Removed (quitado del caso). Al aceptar el caso, Planned pasa a Pending (CON-4052). */
  estado: EstadoProcedimiento | 'Removed'
  /** Sólo en los procedimientos de un caso: los sueltos no tienen consentimiento. */
  consentimiento?: ConsentProcedimiento
  /** Las firmas del consentimiento, con la fecha de cada una. Con las dos, el consentimiento queda Signed. */
  firmas?: FirmasConsentimiento
  /** Las notas de Edit procedure: no cambian el estado. */
  nota?: string
  /** Cómo firmó cada uno: el trazo dibujado (imagen) o el nombre escrito. Sin esto, la hoja muestra el nombre. */
  rubricas?: Partial<Record<keyof FirmasConsentimiento, Rubrica>>
}

export type FirmasConsentimiento = { Patient?: string; Provider?: string }
export type Rubrica = { imagen?: string; texto?: string }

/* El consentimiento específico del procedimiento (no el del caso), del prototipo de Julián para CON-4052:
   Not generated (hay template, no hay documento) · Not sent (generado, sin mandar ni firmar) · Pending (mandado, falta
   la firma) · Signed · Not required (el procedimiento no tiene template). */
export type ConsentProcedimiento = 'Not generated' | 'Not sent' | 'Pending' | 'Signed' | 'Not required'

/* El turno vinculado a la visita, si hay. Sin turno, la visita dice "No appointment". */
export type Cita = { fecha: string; hora: string; proveedor: string }
export type Visita = { id: string; nombre: string; total: string; procedimientos: Procedimiento[]; cita?: Cita }

/* Los procedimientos del caso que son procedimientos del paciente (VINCULOS_PROCEDIMIENTO en data/clinical-mode) llevan
   su código, pieza y superficie: así la fila y su detalle dicen lo mismo. El resto queda como el frame. Ver
   clinical-mode.md (2026-10-13). */
const DEL_PACIENTE: Record<string, Partial<Procedimiento>> = {
  /* El consentimiento a medio firmar: el paciente ya firmó, falta el provider. */
  c5v2p2: { codigo: 'D2950', nombre: 'Core buildup, including any pins when required', superficie: '-', pieza: '19', ubicacion: '-', firmas: { Patient: '04/29/2026' } },
  c5v2p3: { codigo: 'D2954', nombre: 'Prefabricated post and core in addition to crown', superficie: '-', pieza: '19', ubicacion: '-' },
  c9v1p1: { codigo: 'D9944', nombre: 'Occlusal guard – hard appliance, full arch', superficie: '-', pieza: '-', ubicacion: 'Upper Arch', estado: 'In progress' },
  c9v1p2: { codigo: 'D1110', nombre: 'Prophylaxis – adult', superficie: '-', pieza: '-', ubicacion: '-' },
  c10v1p1: { codigo: 'D9972', nombre: 'External bleaching – per arch – performed in office', superficie: '-', pieza: '-', ubicacion: 'Upper Arch' },
  c10v1p2: { codigo: 'D9972', nombre: 'External bleaching – per arch – performed in office', superficie: '-', pieza: '-', ubicacion: 'Lower Arch' },
  c11v1p1: { codigo: 'D1351', nombre: 'Sealant – per tooth', superficie: 'O', pieza: '30', ubicacion: '-' },
  c1v2p1: { codigo: 'D4341', nombre: 'Periodontal scaling and root planing – four or more teeth per quadrant', superficie: '-', pieza: '-', ubicacion: 'Upper Arch' },
  c3v1p1: { codigo: 'D2391', nombre: 'Resin-based composite – one surface, posterior', superficie: 'O', pieza: '3', ubicacion: '-' },
  c3v1p2: { codigo: 'D2392', nombre: 'Resin-based composite – two surfaces, posterior', superficie: 'O, D', pieza: '14', ubicacion: '-' },
  /* El mismo estado que en Procedures: la endodoncia se derivó y la extracción ya empezó. */
  c5v2p1: { codigo: 'D3330', nombre: 'Endodontic therapy, molar tooth', superficie: '-', pieza: '19', ubicacion: '-', estado: 'Referred' },
  c7v1p1: { codigo: 'D7140', nombre: 'Extraction – erupted tooth or exposed root (elevation and/or forceps removal)', superficie: '-', pieza: '16', ubicacion: '-', estado: 'In progress' },
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
  firmas: consentimiento === 'Signed' ? { Patient: '04/28/2026', Provider: '04/28/2026' } : {},
  ...DEL_PACIENTE[id],
})

/* Los procedimientos de una visita, cada uno con el estado de su consentimiento. Con el caso aceptado (Waiting for
   consent o Accepted) los que estaban Planned ya pasaron a Pending (CON-4052). */
const visita = (prefijo: string, consentimientos: ConsentProcedimiento[], estado: Procedimiento['estado'] = 'Planned') =>
  consentimientos.map((c, i) => proc(\`\${prefijo}p\${i + 1}\`, estado, c))

/* Un procedimiento suelto también puede tener su consentimiento (hay template): no se ve en la tabla, pero Complete pasa
   por él como en un caso (prototipo de CON-4052). El segundo no tiene template. */
export const NO_ASIGNADOS: Procedimiento[] = Array.from({ length: 15 }, (_, i) => proc(\`u\${i + 1}\`, 'Planned', i === 1 ? 'Not required' : 'Not generated'))

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
  /** Se aceptó alguna vez: un plan cancelado después de aceptar sigue mostrando los consentimientos (CON-4052). */
  aceptado?: boolean
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
      { id: 'v1', nombre: 'Visit 1', total: '$100.000', procedimientos: visita('c1v1', ['Not generated', 'Not generated', 'Not generated', 'Not generated']), cita: { fecha: 'Sep 2, 2026', hora: '10:00 AM', proveedor: 'Perez Martinez' } },
      { id: 'v2', nombre: 'Visit 2', total: '$100.000', procedimientos: visita('c1v2', ['Not generated', 'Not generated', 'Not generated', 'Not required']) },
    ],
  },
  {
    id: 'c2', nombre: 'Periodontist Alternative', grupo: 'Periodontal', estado: 'Planning',
    creado: '27/08/2026', creadoPor: 'Provider 1', total: '184.60',
    visitas: [
      { id: 'v1', nombre: 'Visit 1', total: '$84.600', procedimientos: visita('c2v1', ['Not generated', 'Not generated', 'Not required']) },
    ],
  },
  {
    id: 'c3', nombre: 'Restorative Plan', grupo: 'Restorative', estado: 'Waiting for consent', aceptado: true,
    creado: '26/08/2026', creadoPor: 'Provider 1', total: '96.00',
    visitas: [
      { id: 'v1', nombre: 'Visit 1', total: '$96.000', procedimientos: visita('c3v1', ['Pending', 'Not sent'], 'Pending') },
    ],
  },
  {
    id: 'c8', nombre: 'Orthodontic Plan', grupo: 'Orthodontics', estado: 'Pending',
    creado: '25/08/2026', creadoPor: 'Provider 1', total: '2,400.00',
    visitas: [
      { id: 'v1', nombre: 'Visit 1', total: '$2,400.000', procedimientos: visita('c8v1', ['Not generated', 'Not generated']) },
    ],
  },
  {
    id: 'c4', nombre: 'Crown Option', grupo: 'Prosthodontics', estado: 'Presented',
    creado: '24/08/2026', creadoPor: 'Provider 1', total: '412.00',
    visitas: [
      { id: 'v1', nombre: 'Visit 1', total: '$412.000', procedimientos: visita('c4v1', ['Not generated', 'Not generated']) },
    ],
  },
  {
    id: 'c5', nombre: 'Endodontic Treatment', grupo: 'Endodontics', estado: 'Accepted', aceptado: true,
    creado: '27/04/2026', creadoPor: 'Provider 1', total: '640.00',
    visitas: [
      { id: 'v1', nombre: 'Visit 1', total: '$320.000', procedimientos: visita('c5v1', ['Signed', 'Signed']).map((p) => ({ ...p, estado: 'Completed' as const })), cita: { fecha: 'May 4, 2026', hora: '9:30 AM', proveedor: 'Perez Martinez' } },
      { id: 'v2', nombre: 'Visit 2', total: '$702.000', procedimientos: visita('c5v2', ['Signed', 'Pending', 'Not generated'], 'Pending') },
    ],
  },
  {
    id: 'c6', nombre: 'Implant Option', grupo: 'Implant', estado: 'Discarded',
    creado: '17/04/2026', creadoPor: 'Provider 1', total: '1,250.00', sinPermiso: true,
    visitas: [
      { id: 'v1', nombre: 'Visit 1', total: '$1,250.000', procedimientos: visita('c6v1', ['Not generated']) },
    ],
  },
  {
    id: 'c7', nombre: 'Bridge Option', grupo: 'Implant', estado: 'Accepted', aceptado: true,
    creado: '17/04/2026', creadoPor: 'Provider 1', total: '980.00', sinPermiso: true,
    visitas: [
      { id: 'v1', nombre: 'Visit 1', total: '$980.000', procedimientos: visita('c7v1', ['Signed', 'Not required'], 'Pending') },
    ],
  },
  /* Los escenarios del prototipo de CON-4052 que no tenía ningún caso: el plan empezado, el cancelado después de
     aceptar y el vencido antes de aceptar. */
  {
    id: 'c9', nombre: 'Night Guard Plan', grupo: 'Occlusal', estado: 'In progress', aceptado: true,
    creado: '10/04/2026', creadoPor: 'Provider 1', total: '0',
    visitas: [{ id: 'v1', nombre: 'Visit 1', total: '$468.000', procedimientos: visita('c9v1', ['Signed', 'Pending'], 'Pending') }],
  },
  {
    id: 'c10', nombre: 'Whitening Plan', grupo: 'Cosmetic', estado: 'Cancelled', aceptado: true,
    creado: '05/03/2026', creadoPor: 'Provider 1', total: '0',
    visitas: [{ id: 'v1', nombre: 'Visit 1', total: '$468.000', procedimientos: visita('c10v1', ['Pending', 'Not sent'], 'Pending') }],
  },
  {
    id: 'c11', nombre: 'Sealant Plan', grupo: 'Preventive', estado: 'Expired',
    creado: '12/02/2026', creadoPor: 'Provider 1', total: '0',
    visitas: [{ id: 'v1', nombre: 'Visit 1', total: '$234.000', procedimientos: visita('c11v1', ['Not generated']) }],
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

/* El documento de consentimiento de cada procedimiento: el template de Settings → Consent Templates con los datos del
   procedimiento y del paciente. Se abre desde la columna Consent (clinical-mode.md, 2026-11-02). */
export const DOCUMENTO_CONSENTIMIENTO = {
  titulo: 'Informed Consent for Dental Treatment',
  naturaleza: 'The dentist will treat the affected tooth as described in the treatment plan. Local anesthesia will be used to keep you comfortable. The procedure may take one or more visits.',
  riesgos: 'Pain, swelling or sensitivity after treatment.\\nReaction to the anesthetic.\\nThe tooth may need further treatment in the future.',
} as const

/* Los textos del detalle del consentimiento, según su estado. */
export const AVISO_CONSENTIMIENTO = {
  'Not sent': { titulo: 'Not sent to the patient yet', texto: 'Send it so the patient can sign from their phone, or collect both signatures here.' },
  Signed: { titulo: 'All signatures collected', texto: 'The signed consent is stored in the patient documents.' },
} as const

/* La columna Consent sin documento: lo que avisa al tocarla (prototipo de CON-4052). */
export const SIN_DOCUMENTO: Partial<Record<ConsentProcedimiento, string>> = {
  'Not generated': 'No document yet. Start or Complete initiates consent management when allowed.',
  'Not required': 'No mapped template: no specific consent flow.',
}

/* Los textos del menú ⋮ de un procedimiento (prototipo de CON-4052). */
export const MENU_PROCEDIMIENTO = {
  editar: { titulo: 'Edit procedure', texto: 'Only authorized fields can be edited. Notes do not change clinical state.' },
  borrarSuelto: 'Are you sure you want to delete this procedure? This action cannot be undone.',
  borrarEnCaso: {
    texto: 'Choose the scope of deletion.',
    tx: { titulo: 'Delete from Tx', texto: 'Remove from this case and keep the clinical record. Move to Unassigned if no associations remain.' },
    procedimiento: { titulo: 'Delete Procedure', texto: 'Delete the clinical record after existing validations pass.' },
  },
  /* Sign now del diálogo Consent required: revisar y firmar, y después confirmar el cambio pedido. */
  revisar: { titulo: 'Review and sign consent', texto: 'Opening this view does not sign the document.' },
  firmado: { titulo: 'Consent signed', texto: 'The procedure consent has been signed. Confirm the original clinical action to continue.' },
  noPudoEnviarse: 'The consent could not be sent. The procedure has not changed. Retry using the same document, or sign now.',
} as const
`})))()}export{r as n,n as r,i as t};