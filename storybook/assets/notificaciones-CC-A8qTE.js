import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { LucideIcon } from 'lucide-react'
import { AtSign, BadgeDollarSign, CalendarPlus, ClipboardCheck, FileCheck2, FileSignature, FlaskConical, ListTodo, Send, ShieldAlert, TrendingUp, Wrench } from 'lucide-react'

/* Las notificaciones del usuario, con la lógica del Inbox de Notion: cada una está sin leer, leída o pendiente
   (lo que quedó para hacer), y se archiva cuando ya no hace falta verla. Las que son tareas van además al banner
   de arriba hasta resolverse. Ver design-reference/figma/modulos/notifications.md y header-sidebar.md. */

export type EstadoNotificacion = 'unread' | 'read' | 'pending'

export type Notificacion = {
  id: string
  titulo: string
  detalle: string
  accion: string
  to: string
  icon: LucideIcon
  /** Es algo para hacer (firmar, revisar, llamar): va al banner mientras no esté leída ni archivada. */
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
    estado: 'pending',
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
    estado: 'pending',
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
]

/* "2h ago", "Yesterday", "Mar 3": corto, como en el Inbox de Notion. */
export function haceCuanto(minutos: number): string {
  if (minutos < 1) return 'Just now'
  if (minutos < HORA) return \`\${Math.round(minutos)}m ago\`
  if (minutos < DIA) return \`\${Math.floor(minutos / HORA)}h ago\`
  if (minutos < 2 * DIA) return 'Yesterday'
  if (minutos < 7 * DIA) return \`\${Math.floor(minutos / DIA)}d ago\`
  return new Date(Date.now() - minutos * 60_000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/* Los grupos de la lista, del más nuevo al más viejo. */
export function grupoDe(minutos: number): 'Today' | 'Yesterday' | 'This week' | 'Older' {
  if (minutos < DIA) return 'Today'
  if (minutos < 2 * DIA) return 'Yesterday'
  if (minutos < 7 * DIA) return 'This week'
  return 'Older'
}
`})))()}export{r as n,n as r,i as t};