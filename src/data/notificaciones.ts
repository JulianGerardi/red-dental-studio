import type { LucideIcon } from 'lucide-react'
import { AtSign, BadgeDollarSign, CalendarPlus, CalendarX2, ClipboardCheck, FileCheck2, FileSignature, FlaskConical, ListTodo, LogIn, Receipt, Send, ShieldAlert, ShieldCheck, TrendingUp, UserPlus, Wrench } from 'lucide-react'

/* Las notificaciones del usuario, con la lógica del Inbox de Notion: cada una está sin leer o leída (Pending y
   Archived se sacaron, Julián 2026-10-13). Las que son tareas van además al banner de arriba mientras estén sin leer.
   Ver design-reference/figma/modulos/notifications.md y header-sidebar.md. */

export type EstadoNotificacion = 'unread' | 'read'

export type Notificacion = {
  id: string
  titulo: string
  detalle: string
  accion: string
  to: string
  icon: LucideIcon
  /** Es algo para hacer (firmar, revisar, llamar): va al banner mientras esté sin leer. */
  tarea: boolean
  /** Hace cuántos minutos llegó: relativo a "ahora" para que el ejemplo no envejezca. */
  hace: number
  /** Cómo arranca. */
  estado: EstadoNotificacion
  /** Quién la generó, si fue una persona. */
  autor?: string
}

const HORA = 60
const DIA = 24 * HORA

export const NOTIFICACIONES: Notificacion[] = [
  {
    id: 'n1',
    titulo: 'Document awaiting your signature',
    detalle: 'Consent form for Mara Otero — sent 2 days ago.',
    accion: 'Review',
    /* Antes iba a /documents -un placeholder que no tiene nada de
       consentimientos-. Julián pidió conectarla con Settings → Consents,
       que sí existe. */
    to: '/settings/consents',
    icon: FileSignature,
    tarea: true,
    hace: 25,
    estado: 'unread',
  },
  {
    id: 'n2',
    titulo: 'Referral expires today',
    detalle: 'Referral to Dr. Salgado for John Smith closes at 6:00 PM.',
    accion: 'Open referral',
    to: '/patients/patient-0001/treatments',
    icon: Send,
    tarea: true,
    hace: 2 * HORA,
    estado: 'unread',
  },
  {
    id: 'n3',
    titulo: 'Lab results are back',
    detalle: 'Crown impressions for Noah James came back from Lakeside Lab.',
    accion: 'View documents',
    to: '/patients/patient-0001/documents',
    icon: FlaskConical,
    tarea: false,
    hace: 3 * HORA,
    estado: 'unread',
  },
  {
    id: 'n4',
    titulo: 'Insurance verification pending',
    detalle: 'Northwind Dental Plan hasn’t confirmed coverage for Mara Otero.',
    accion: 'Open insurance',
    to: '/patients/patient-0001/insurance',
    icon: ShieldAlert,
    tarea: true,
    hace: 5 * HORA,
    estado: 'unread',
  },
  {
    id: 'n5',
    titulo: 'Dr. Emily Chen mentioned you',
    detalle: '“@Sarah can you review this treatment plan before Thursday?”',
    accion: 'Open treatment plan',
    to: '/patients/patient-0001/treatments',
    icon: AtSign,
    tarea: false,
    hace: DIA + 2 * HORA,
    estado: 'unread',
    autor: 'Dr. Emily Chen',
  },
  {
    id: 'n6',
    titulo: 'New appointment request',
    detalle: 'Elias Aguirre asked for a cleaning on Friday morning.',
    accion: 'Open scheduling',
    to: '/scheduling',
    icon: CalendarPlus,
    tarea: false,
    hace: DIA + 5 * HORA,
    estado: 'read',
  },
  {
    id: 'n7',
    titulo: 'Payment received',
    detalle: '$120.00 from Maria Abril Viola was applied to her ledger.',
    accion: 'Open ledger',
    to: '/patients/patient-0001/ledger',
    icon: BadgeDollarSign,
    tarea: false,
    hace: 2 * DIA,
    estado: 'read',
  },
  {
    id: 'n8',
    titulo: 'Call to confirm tomorrow’s appointment',
    detalle: 'Noah James hasn’t confirmed his 10:00 AM visit with Dr. Martinez.',
    accion: 'Open scheduling',
    to: '/scheduling',
    icon: ListTodo,
    tarea: true,
    hace: 3 * DIA,
    estado: 'unread',
    autor: 'Front desk',
  },
  {
    id: 'n9',
    titulo: 'Treatment plan accepted',
    detalle: 'John Smith accepted his treatment plan (3 procedures).',
    accion: 'Open treatment plan',
    to: '/patients/patient-0001/treatments',
    icon: ClipboardCheck,
    tarea: false,
    hace: 4 * DIA,
    estado: 'read',
  },
  {
    id: 'n10',
    titulo: 'Consent signed',
    detalle: 'Sofía Romero signed the extraction consent.',
    accion: 'View documents',
    to: '/patients/patient-0001/documents',
    icon: FileCheck2,
    tarea: false,
    hace: 6 * DIA,
    estado: 'read',
  },
  {
    id: 'n11',
    titulo: 'Operatory 4 is unavailable',
    detalle: 'It was marked unavailable for maintenance until Monday.',
    accion: 'Open locations',
    to: '/settings/locations',
    icon: Wrench,
    tarea: false,
    hace: 9 * DIA,
    estado: 'read',
  },
  {
    id: 'n12',
    titulo: 'Weekly report is ready',
    detalle: 'Production and collections for last week are ready to review.',
    accion: 'Open billing',
    to: '/billing',
    icon: TrendingUp,
    tarea: false,
    hace: 11 * DIA,
    estado: 'read',
  },
  /* Las que completan cada combinación en la app (estado × tipo, texto largo, "Just now"). */
  {
    id: 'n13',
    titulo: 'Maria Abril Viola checked in',
    detalle: 'Waiting room · 10:00 AM appointment with Dr. Elena Martinez.',
    accion: 'Open scheduling',
    to: '/scheduling',
    icon: LogIn,
    tarea: false,
    hace: 0,
    estado: 'unread',
  },
  {
    id: 'n14',
    titulo: 'Approve next week’s hygienist schedule',
    detalle: 'Sarah Stone sent the schedule for Abril - Los Angeles.',
    accion: 'Open scheduling',
    to: '/scheduling',
    icon: ClipboardCheck,
    tarea: true,
    hace: 8 * HORA,
    estado: 'read',
    autor: 'Sarah Stone',
  },
  {
    id: 'n15',
    titulo: 'New fee schedule from Delta Dental',
    detalle: 'Updated allowed amounts take effect on November 1.',
    accion: 'Open billing',
    to: '/billing',
    icon: Receipt,
    tarea: false,
    hace: 2 * DIA + 3 * HORA,
    estado: 'read',
  },
  {
    id: 'n16',
    titulo: 'Referral to Dr. Alvarez for periodontal evaluation needs a signed consent before the specialist’s office can schedule the first visit',
    detalle: 'Mara Otero · Periodontics referral sent on September 12. The patient asked to be called in the afternoon, after 3 PM, and prefers the Uptown office if there is availability this month.',
    accion: 'Open referral',
    to: '/patients/patient-0001/treatments',
    icon: Send,
    tarea: false,
    hace: 6 * HORA,
    estado: 'unread',
    autor: 'Dr. Alvarez’s office',
  },
]

/* Historial de los últimos meses, para ver la pantalla con muchas notificaciones (y usar el filtro de fecha). Todas
   leídas y ninguna tarea: no cambian la campana ni el banner. Ver notifications.md (2026-10-12). */
const vieja = (n: number, dias: number, titulo: string, detalle: string, accion: string, to: string, icon: LucideIcon, extra: Partial<Notificacion> = {}): Notificacion =>
  ({ id: `h${n}`, titulo, detalle, accion, to, icon, tarea: false, hace: dias * DIA + 3 * HORA, estado: 'read', ...extra })
const REPORTE = ['Weekly report is ready', 'Production and collections for last week are ready to review.', 'Open billing', '/billing', TrendingUp] as const

export const HISTORIAL: Notificacion[] = [
  vieja(1, 12, 'Payment received', '$85.00 from Elias Aguirre was applied to his ledger.', 'Open ledger', '/patients/patient-0001/ledger', BadgeDollarSign),
  vieja(2, 13, 'Appointment canceled', 'Sofía Romero canceled her 2:30 PM cleaning with Dr. Martinez.', 'Open scheduling', '/scheduling', CalendarX2),
  vieja(3, 15, 'Lab results are back', 'Bite registration for Mara Otero came back from Lakeside Lab.', 'View documents', '/patients/patient-0001/documents', FlaskConical),
  vieja(4, 16, 'Consent signed', 'John Smith signed the root canal consent.', 'View documents', '/patients/patient-0001/documents', FileCheck2),
  vieja(5, 18, ...REPORTE),
  vieja(6, 18, 'New appointment request', 'Lucía Benítez asked for a consultation next Tuesday.', 'Open scheduling', '/scheduling', CalendarPlus),
  vieja(7, 20, 'Insurance verified', 'Delta Dental confirmed coverage for Noah James.', 'Open insurance', '/patients/patient-0001/insurance', ShieldCheck),
  vieja(8, 23, 'Dr. Emily Chen mentioned you', '“@Sarah please call Mr. Smith about his crown.”', 'Open treatment plan', '/patients/patient-0001/treatments', AtSign, { autor: 'Dr. Emily Chen' }),
  vieja(9, 25, ...REPORTE),
  vieja(10, 26, 'Claim paid', 'Northwind Dental Plan paid $340.00 for Mara Otero.', 'Open billing', '/billing', Receipt),
  vieja(11, 28, 'Treatment plan accepted', 'Elias Aguirre accepted his treatment plan (2 procedures).', 'Open treatment plan', '/patients/patient-0001/treatments', ClipboardCheck),
  vieja(13, 32, ...REPORTE),
  vieja(14, 33, 'Payment received', '$200.00 from John Smith was applied to his ledger.', 'Open ledger', '/patients/patient-0001/ledger', BadgeDollarSign),
  vieja(15, 38, 'Referral answered', 'Dr. Salgado scheduled John Smith for an evaluation.', 'Open referral', '/patients/patient-0001/treatments', Send, { autor: 'Dr. Salgado’s office' }),
  vieja(16, 39, ...REPORTE),
  vieja(17, 41, 'Operatory 2 is back in service', 'Maintenance is done; it’s available for appointments again.', 'Open locations', '/settings/locations', Wrench),
  vieja(18, 44, 'New fee schedule from Northwind', 'Updated allowed amounts are ready to review.', 'Open billing', '/billing', Receipt),
  vieja(19, 46, ...REPORTE),
  vieja(21, 52, 'Consent signed', 'Lucía Benítez signed the whitening consent.', 'View documents', '/patients/patient-0001/documents', FileCheck2),
  vieja(22, 53, ...REPORTE),
  vieja(23, 55, 'Appointment canceled', 'Noah James canceled his 9:00 AM check-up.', 'Open scheduling', '/scheduling', CalendarX2),
  vieja(25, 64, 'Dr. Elena Martinez mentioned you', '“@Sarah can you move my Friday patients to Monday?”', 'Open scheduling', '/scheduling', AtSign, { autor: 'Dr. Elena Martinez' }),
  vieja(26, 70, 'Payment received', '$60.00 from Sofía Romero was applied to her ledger.', 'Open ledger', '/patients/patient-0001/ledger', BadgeDollarSign),
  vieja(27, 78, 'New team member', 'Sarah Stone joined Abril - Los Angeles as a hygienist.', 'Open team', '/settings/team', UserPlus),
]

/** El momento en que llegó. */
export const fechaDe = (minutos: number) => new Date(Date.now() - minutos * 60_000)

/* Cuántos días de calendario atrás llegó (0 hoy, 1 ayer), no cuántas veces 24 horas: así el grupo Today y el filtro
   Today muestran lo mismo. */
export function diasAtras(minutos: number): number {
  const f = fechaDe(minutos)
  const hoy = new Date()
  return Math.round((new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate()).getTime() - new Date(f.getFullYear(), f.getMonth(), f.getDate()).getTime()) / (DIA * 60_000))
}

/* "2h ago", "Yesterday", "Mar 3": corto, como en el Inbox de Notion. */
export function haceCuanto(minutos: number): string {
  if (minutos < 1) return 'Just now'
  if (minutos < HORA) return `${Math.round(minutos)}m ago`
  if (minutos < DIA) return `${Math.floor(minutos / HORA)}h ago`
  const dias = diasAtras(minutos)
  if (dias <= 1) return 'Yesterday'
  if (dias < 7) return `${dias}d ago`
  return fechaDe(minutos).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/* Los grupos de la lista, del más nuevo al más viejo: Today, Yesterday, This week y después un grupo por mes, para que
   una lista larga no termine en un solo "Older". */
export function grupoDe(minutos: number): string {
  const dias = diasAtras(minutos)
  if (dias === 0) return 'Today'
  if (dias === 1) return 'Yesterday'
  if (dias < 7) return 'This week'
  const f = fechaDe(minutos)
  const hoy = new Date()
  if (f.getFullYear() === hoy.getFullYear() && f.getMonth() === hoy.getMonth()) return 'Earlier this month'
  return f.toLocaleDateString('en-US', { month: 'long', year: f.getFullYear() === hoy.getFullYear() ? undefined : 'numeric' })
}
