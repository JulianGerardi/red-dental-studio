/* Documentos del paciente que alguien tiene que resolver: firmar, subir, actualizar o revisar. Las fechas son relativas a
   hoy en el mock (5 de octubre de 2026). Ver design-reference/figma/modulos/patient-dashboard.md. */

export type Responsable = 'Patient' | 'Provider' | 'Front desk'
export type MotivoDoc = 'Pending signature' | 'Expired' | 'Missing' | 'Needs review'
export type TipoDoc = 'consent' | 'form' | 'insurance' | 'referral' | 'privacy' | 'image' | 'financial' | 'id'

export type DocPendiente = {
  id: string
  nombre: string
  detalle: string
  tipo: TipoDoc
  motivo: MotivoDoc
  responsable: Responsable
  /** Fecha límite, como se muestra. */
  vence: string
  /** Días hasta la fecha límite; negativo si ya venció. */
  dias: number
  /** Qué hace quien lo resuelve desde acá. */
  accion: string
  /** Fecha en que se resolvió; resuelto, ya no figura entre los pendientes. */
  resuelto?: string
}

export const DOCS_PENDIENTES: DocPendiente[] = [
  { id: 'd1', nombre: 'Informed Consent – Periodontal treatment', detalle: 'Sent Sep 28 · patient has not signed', tipo: 'consent', motivo: 'Pending signature', responsable: 'Patient', vence: 'Sep 30, 2026', dias: -5, accion: 'Send reminder' },
  { id: 'd2', nombre: 'Medical history', detalle: 'Last updated Aug 12, 2025 · older than 12 months', tipo: 'form', motivo: 'Expired', responsable: 'Patient', vence: 'Oct 2, 2026', dias: -3, accion: 'Request update' },
  { id: 'd3', nombre: 'Insurance card – AETNA Dental PPO', detalle: 'Back side of the card is missing', tipo: 'insurance', motivo: 'Missing', responsable: 'Front desk', vence: 'Oct 7, 2026', dias: 2, accion: 'Upload' },
  { id: 'd4', nombre: 'Referral to periodontist', detalle: 'Drafted by Perez Martinez · needs the provider signature', tipo: 'referral', motivo: 'Pending signature', responsable: 'Provider', vence: 'Oct 8, 2026', dias: 3, accion: 'Sign' },
  { id: 'd5', nombre: 'Notice of privacy practices (HIPAA)', detalle: 'New version, acknowledgement required', tipo: 'privacy', motivo: 'Pending signature', responsable: 'Patient', vence: 'Oct 15, 2026', dias: 10, accion: 'Send reminder' },
  { id: 'd6', nombre: 'Panoramic X-ray from previous dentist', detalle: 'Received Oct 3 · waiting to be reviewed', tipo: 'image', motivo: 'Needs review', responsable: 'Provider', vence: 'Oct 20, 2026', dias: 15, accion: 'Review' },
]
