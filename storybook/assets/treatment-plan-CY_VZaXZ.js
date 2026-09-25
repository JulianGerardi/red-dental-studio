import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`/* Treatment Plan — Figma 4118:220403 "Treatment Plan — Section (Cases,
   Workflow & Dialogs)".

   Contenido tal cual el frame, typos incluidos: "Acepted", "Discarted",
   "Periodontists Recommended" / "Periodontist Alternative", y el pie de la
   tabla que dice "insurances" en una tabla de procedimientos. */

export type EstadoCaso = 'Pending' | 'Accepted' | 'Discarded'

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
}

export type Visita = { id: string; nombre: string; total: string; procedimientos: Procedimiento[] }

const proc = (id: string, estado: Procedimiento['estado'] = 'Planned'): Procedimiento => ({
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
})

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
}

export const CASOS: Caso[] = [
  {
    id: 'c1', nombre: 'Periodontists Recommended', grupo: 'Pending Decision', estado: 'Pending',
    creado: '01/07/2024', creadoPor: 'Provider 1', total: '231.12',
    visitas: [
      { id: 'v1', nombre: 'Visit 1', total: '$100.000', procedimientos: Array.from({ length: 4 }, (_, i) => proc(\`c1v1p\${i + 1}\`)) },
      { id: 'v2', nombre: 'Visit 2', total: '$100.000', procedimientos: Array.from({ length: 4 }, (_, i) => proc(\`c1v2p\${i + 1}\`)) },
    ],
  },
  {
    id: 'c2', nombre: 'Periodontist Alternative', grupo: 'Pending Decision', estado: 'Pending',
    creado: '01/07/2024', creadoPor: 'Provider 1', total: '184.60',
    visitas: [
      { id: 'v1', nombre: 'Visit 1', total: '$84.600', procedimientos: Array.from({ length: 3 }, (_, i) => proc(\`c2v1p\${i + 1}\`)) },
    ],
  },
  {
    id: 'c3', nombre: 'Periodontist Alternative', grupo: 'Pending Decision', estado: 'Pending',
    creado: '01/07/2024', creadoPor: 'Provider 1', total: '96.00',
    visitas: [
      { id: 'v1', nombre: 'Visit 1', total: '$96.000', procedimientos: Array.from({ length: 2 }, (_, i) => proc(\`c3v1p\${i + 1}\`)) },
    ],
  },
]

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
  removeProcedure: {
    titulo: 'Remove Procedure',
    texto: ['Are you sure you want to remove this procedure from the case?'],
  },
} as const
export type ClaveDialogo = keyof typeof DIALOGOS

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