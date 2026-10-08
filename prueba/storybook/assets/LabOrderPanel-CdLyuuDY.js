import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { Ban, CirclePlus, FileText, FlaskConical, History, Pencil } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { DataTable, TextCell, type DataTableColumn } from '@/components/ui/data-table'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Pill, type PillTone } from '@/components/ui/pill'
import { TARJETA_PANEL } from '@/lib/estilos'
import { ORDENES, type EstadoOrden, type OrdenLab } from '@/data/clinical-mode'

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
   Laboratory" quedan pendientes. "active prescriptions" y "New Prescription" son texto de Prescription que quedó pegado
   en el frame (anomalía 85). Ver design-reference/figma/modulos/clinical-mode.md. */

function iniciales(nombre: string) {
  return nombre.replace(/^Dr\\.\\s*/, '').split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
}

/* Las iniciales en el círculo celeste del equipo (PersonCell soft), sin link: la orden no lleva a la ficha. */
const persona = (nombre: string) => (
  <span className="flex min-w-0 items-center gap-2.5">
    <span className="bg-dash-count-bg text-dash-blue-hover flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold">
      {iniciales(nombre)}
    </span>
    <TextCell strong>{nombre}</TextCell>
  </span>
)

const COLUMNAS: DataTableColumn<OrdenLab>[] = [
  { key: 'proveedor', header: 'Provider', cell: (o) => persona(o.proveedor) },
  { key: 'paciente', header: 'Patient', cell: (o) => persona(o.paciente) },
  { key: 'estado', header: 'Status', width: 110, cell: (o) => <Pill tone={ORDEN_TONO[o.estado]}>{o.estado}</Pill> },
  { key: 'actualizado', header: 'Updated', width: 110, cell: (o) => o.actualizado },
  { key: 'creado', header: 'Created', width: 110, cell: (o) => o.creado },
  /* El frame pinta de rojo las que vencen pronto. */
  { key: 'vence', header: 'Expiration Date', width: 120, cell: (o) => <span className={cn(o.urgente && 'font-semibold text-dash-bad-fg')}>{o.vence}</span> },
]

export function LabOrderPanel({ ordenes: inicio = ORDENES }: { /** Las órdenes con las que abre; por defecto, las del frame. */ ordenes?: OrdenLab[] }) {
  const [ordenes, setOrdenes] = useState(inicio)

  const cancelar = (o: OrdenLab) => {
    const antes = ordenes
    setOrdenes(antes.map((x) => (x.id === o.id ? { ...x, estado: 'Canceled' } : x)))
    aviso.ok(\`Lab order for \${o.paciente} canceled.\`, { label: 'Undo', onClick: () => setOrdenes(antes) })
  }

  return (
    <div className={cn(TARJETA_PANEL, 'p-4')}>
      <DataTable
        columns={COLUMNAS}
        rows={ordenes}
        rowKey={(o) => o.id}
        rowLabel={(o) => o.paciente}
        search={{ placeholder: 'Search...', match: (o, q) => \`\${o.proveedor} \${o.paciente} \${o.estado}\`.toLowerCase().includes(q.toLowerCase()) }}
        filter={{
          label: 'Filter lab orders by status',
          options: ESTADOS.map((e) => ({ value: e, count: ordenes.filter((o) => o.estado === e).length, tone: ORDEN_TONO[e] })),
          match: (o, sel) => sel.includes(o.estado),
        }}
        actions={(
          <>
            <Button variant="secondary" onClick={() => aviso.info('History is not available in this release.')}>
              <History /> View History
            </Button>
            <Button onClick={() => aviso.info('New Prescription is not available in this release.')}>
              <CirclePlus /> New Prescription
            </Button>
          </>
        )}
        rowActions={(o) => (
          <>
            <DropdownMenuItem onSelect={() => aviso.info('The lab order detail is not available in this release.')}>
              <FileText className="size-4 shrink-0" /> View order
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => aviso.info('Editing is not available in this release.')}>
              <Pencil className="size-4 shrink-0" /> Edit order
            </DropdownMenuItem>
            {ABIERTAS.includes(o.estado) && (
              <DropdownMenuItem variant="destructive" onSelect={() => cancelar(o)}>
                <Ban className="size-4 shrink-0" /> Cancel order
              </DropdownMenuItem>
            )}
          </>
        )}
        pageSize={10}
        pageSizeOptions={[5, 10, 20]}
        pageSizeLabel="Show:"
        itemLabel="active prescriptions"
        empty={{ icon: FlaskConical, title: 'No lab orders yet', detail: 'Orders sent to the lab will show up here.' }}
      />
    </div>
  )
}
`})))()}export{n,i as r,r as t};