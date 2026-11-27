import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { Ban, FileText, FlaskConical, History, Pencil, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { DataTable, TextCell, type DataTableColumn } from '@/components/ui/data-table'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Pill, type PillTone } from '@/components/ui/pill'
import { ORDENES, type EstadoOrden, type OrdenLab } from '@/data/clinical-mode'
import type { PendingTask } from '@/components/dashboard/PendingTaskCard'
import { tareaViva, useAccionesTarea, useTareasVivas } from '@/components/dashboard/tareas'
import { SettingsSearch } from '@/components/settings/SettingsSearch'
import { LabOrderDetail } from './LabOrderDetail'

/* En el orden del pedido: es también el orden del filtro. */
export const ORDEN_TONO: Record<EstadoOrden, PillTone> = {
  Requested: 'purple', Pending: 'warning', Delayed: 'warning',
  Delivered: 'success', Canceled: 'danger', Rejected: 'danger',
}
const ESTADOS = Object.keys(ORDEN_TONO) as EstadoOrden[]
/* Las que todavía se pueden cancelar desde el menú de la fila. */
const ABIERTAS: EstadoOrden[] = ['Requested', 'Pending', 'Delayed']

/* Figma 4070:148911 "Lab Order — Section (List, Detail & New Laboratory Modal)": el listado, sobre la tabla estándar
   (DataTable) con buscador, filtro de estado y botones de la app, como la Problem List. El detalle y el modal "New
   Laboratory" quedan pendientes. "active prescriptions" y "New prescription" son texto de Prescription que quedó pegado
   en el frame (anomalía 85). Ver design-reference/figma/modulos/clinical-mode.md. */

/* Sólo el nombre: el avatar queda para las tablas de personas, Patients y Employees (tablas estandarizadas v2, 2026-11-24). */
const persona = (nombre: string) => <TextCell>{nombre}</TextCell>

/* Edit y View abren el detalle de la orden, como Edit en red.dev (video de Julián del 2026-11-27): la orden de la tabla
   pasa por la misma ficha y el mismo ⋮ que la de Pending Task. */
const comoTarea = (o: OrdenLab): PendingTask => ({
  id: \`orden-\${o.id}\`, kind: 'Lab orders', state: o.estado, person: o.paciente, initials: o.paciente.split(' ').map((x) => x[0]).join('').slice(0, 2),
  provider: o.proveedor, register: o.creado, expiration: o.vence, pdf: o.estado !== 'Pending',
})

const COLUMNAS: DataTableColumn<OrdenLab>[] = [
  { key: 'proveedor', header: 'Provider', cell: (o) => persona(o.proveedor) },
  { key: 'paciente', header: 'Patient', cell: (o) => persona(o.paciente) },
  { key: 'estado', header: 'Status', width: 110, cell: (o) => <Pill tone={ORDEN_TONO[o.estado]}>{o.estado}</Pill> },
  { key: 'actualizado', header: 'Last update', width: 120, cell: (o) => o.actualizado },
  { key: 'creado', header: 'Created date', width: 120, cell: (o) => o.creado },
  /* El frame pinta de rojo las que vencen pronto. */
  { key: 'vence', header: 'Expiration date', width: 120, cell: (o) => <span className={cn(o.urgente && 'font-semibold text-dash-bad-fg')}>{o.vence}</span> },
]

export function LabOrderPanel({ ordenes: inicio = ORDENES, tarea, encuentroAbierto = false }: {
  /** Las órdenes con las que abre; por defecto, las del frame. */
  ordenes?: OrdenLab[]
  /** La orden de Pending Task que abrió Complete this Task: entra directo a su detalle (dashboard.md, 2026-11-20). */
  tarea?: PendingTask
  encuentroAbierto?: boolean
}) {
  const [ordenes, setOrdenes] = useState(inicio)
  const [q, setQ] = useState('')
  const [detalle, setDetalle] = useState(tarea?.id)
  /* La tarea con sus cambios: Request o Cancel desde el ⋮ del detalle se ven acá y en Pending Task. */
  useTareasVivas(tarea ? [tarea] : [])
  const deTabla = ordenes.map(comoTarea).find((t) => t.id === detalle)
  const abierta = deTabla ?? tarea
  const viva = abierta && tareaViva(abierta)
  const acciones = useAccionesTarea({ paciente: tarea?.patientId })

  if (viva && detalle === viva.id) {
    /* Cancelada o borrada desde su ⋮, ya no hay detalle que mostrar: vuelve a la lista. */
    if (viva.fuera) { setDetalle(undefined); return null }
    return (
      <>
        <LabOrderDetail tarea={viva} abierto={encuentroAbierto} onVolver={() => setDetalle(undefined)} onAccion={acciones.hacer} />
        {acciones.dialogo}
      </>
    )
  }

  const cancelar = (o: OrdenLab) => {
    const antes = ordenes
    setOrdenes(antes.map((x) => (x.id === o.id ? { ...x, estado: 'Canceled' } : x)))
    aviso.ok(\`Lab order for \${o.paciente} canceled.\`, { label: 'Undo', onClick: () => setOrdenes(antes) })
  }

  /* Lo hecho desde el ⋮ del detalle (Request, Cancel, Delete) se ve en la fila. */
  const vivas = ordenes.flatMap((o) => { const t = tareaViva(comoTarea(o)); return t.state === 'Canceled' || !t.fuera ? [{ ...o, estado: t.state as EstadoOrden }] : [] })
  /* Como el resto de las tablas: buscador con su botón Search, sin card alrededor (tablas estandarizadas, 2026-11-25). */
  const visibles = vivas.filter((o) => \`\${o.proveedor} \${o.paciente} \${o.estado}\`.toLowerCase().includes(q.trim().toLowerCase()))

  return (
    <div>
      <DataTable
        columns={COLUMNAS}
        rows={visibles}
        rowKey={(o) => o.id}
        rowLabel={(o) => o.paciente}
        toolbarStart={<SettingsSearch value={q} onChange={setQ} placeholder="Search lab orders" />}
        filter={{
          label: 'Filter lab orders by status',
          options: ESTADOS.map((e) => ({ value: e, count: vivas.filter((o) => o.estado === e).length })),
          match: (o, sel) => sel.includes(o.estado),
        }}
        actions={(
          <>
            <Button variant="secondary" size="md" onClick={() => aviso.info('History is not available in this release.')}>
              <History /> View history
            </Button>
            <Button size="md" onClick={() => aviso.info('New prescription is not available in this release.')}>
              <Plus /> New prescription
            </Button>
          </>
        )}
        rowActions={(o) => (
          <>
            <DropdownMenuItem onSelect={() => setDetalle(comoTarea(o).id)}>
              <FileText className="size-4 shrink-0" /> View order
            </DropdownMenuItem>
            {o.estado === 'Pending' && (
              <DropdownMenuItem onSelect={() => setDetalle(comoTarea(o).id)}>
                <Pencil className="size-4 shrink-0" /> Edit order
              </DropdownMenuItem>
            )}
            {ABIERTAS.includes(o.estado) && (
              <DropdownMenuItem variant="destructive" onSelect={() => cancelar(o)}>
                <Ban className="size-4 shrink-0" /> Cancel order
              </DropdownMenuItem>
            )}
          </>
        )}
        pageSize={10}
        empty={ordenes.length === 0
          ? { icon: FlaskConical, title: 'No lab orders yet', detail: 'Orders sent to the lab will show up here.' }
          : { icon: FlaskConical, title: 'No lab orders found', detail: 'Try a different provider, patient or status.' }}
      />
    </div>
  )
}
`})))()}export{n,i as r,r as t};