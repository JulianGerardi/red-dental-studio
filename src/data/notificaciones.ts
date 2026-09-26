import type { LucideIcon } from 'lucide-react'
import { FileSignature, Send } from 'lucide-react'

/* Tareas pendientes del usuario. Quedan hasta que se resuelven: no son
   avisos de paso -para eso están los toasts- sino cosas que hay que hacer.
   Ver design-reference/figma/modulos/header-sidebar.md. */
export type Notificacion = {
  id: string
  titulo: string
  detalle: string
  accion: string
  to: string
  icon: LucideIcon
}

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
  },
  {
    id: 'n2',
    titulo: 'Referral expires today',
    detalle: 'Referral to Dr. Salgado for John Smith closes at 6:00 PM.',
    accion: 'Open referral',
    to: '/patients/1/treatments',
    icon: Send,
  },
]
