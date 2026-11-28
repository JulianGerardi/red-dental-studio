import type { PillTone } from '@/components/ui/pill'
import type { EstadoOrden, OrdenLab } from '@/data/clinical-mode'
import type { PendingTask } from '@/components/dashboard/PendingTaskCard'
import { RegistrosPanel } from './RegistrosPanel'

/* El tono de cada estado de una orden vinculada (RecordDetail). */
export const ORDEN_TONO: Record<EstadoOrden, PillTone> = {
  Requested: 'purple', Pending: 'warning', Delayed: 'warning',
  Delivered: 'success', Cancelled: 'danger', Rejected: 'danger',
}

/** La pestaña Lab order: el panel compartido con Prescription y Referral (RegistrosPanel). `ordenes` sólo limita cuántas
 *  se ven (Storybook). Ver design-reference/figma/modulos/clinical-mode.md (2026-11-27). */
export function LabOrderPanel({ ordenes, tarea }: { ordenes?: OrdenLab[]; tarea?: PendingTask }) {
  return <RegistrosPanel kind="Lab orders" tarea={tarea} maximo={ordenes?.length} />
}
