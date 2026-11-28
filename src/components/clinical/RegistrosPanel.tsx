import { useState, type ComponentType } from 'react'
import { ArrowRightLeft, FileText, FlaskConical, Pill as IconoPastilla, Plus, Trash2, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ICONO_SUELTO, ICONO_TACHO } from '@/lib/estilos'
import { Button } from '@/components/ui/button'
import { Chip, ChipMas } from '@/components/ui/chip'
import { DataTable, TextCell, type DataTableColumn } from '@/components/ui/data-table'
import { DropdownMenuLabel } from '@/components/ui/dropdown-menu'
import { FilterMenu, type FilterGroup } from '@/components/ui/filter-menu'
import { Pill } from '@/components/ui/pill'
import type { PendingTask } from '@/components/dashboard/PendingTaskCard'
import { ItemsTarea, TONO_ESTADO, accionesDe, useAccionesTarea, type AccionUI } from '@/components/dashboard/tareas'
import { nombreMedicacion } from '@/data/recetas'
import { LabOrderDetail } from './LabOrderDetail'
import { PrescriptionDetail } from './PrescriptionDetail'
import { ReferralDetail } from './ReferralDetail'
import { asegurarRegistro, nuevoRegistro, proveedoresDerivacion, urge, useRegistros, type Registro, type TipoRegistro } from './registros'

/* Las pestañas Lab order, Prescription y Referral de Clinical Mode son el mismo panel: la tabla estándar (sólo *Filter*
   a la izquierda, como red.dev, y la acción New a la derecha: sin buscador ni filtro de fecha, Julián 2026-11-28), la
   fila que abre la ficha, el ⋮ con las acciones del estado (la máquina de `dashboard/tareas`; fuera de Pending, *Edit*
   apagado) y la ficha, que es una sola para New, Edit y la vista de sólo lectura. red.dev lista Prescription y Referral
   en cards; acá las tres van en tabla, como el resto de la app. Ver design-reference/figma/modulos/clinical-mode.md
   (2026-11-27 y 2026-11-28). */

type PropsFicha = { registro: Registro; nuevo?: boolean; onVolver: () => void; onAccion: (t: PendingTask, a: AccionUI) => void }

const fecha = (s: string) => s || '—'
const columnaEstado: DataTableColumn<Registro> = { key: 'estado', header: 'Status', width: 120, cell: (r) => <Pill tone={TONO_ESTADO[r.state] ?? 'info'}>{r.state}</Pill> }
const columnasFecha = (): DataTableColumn<Registro>[] => [
  { key: 'actualizado', header: 'Last update', width: 120, cell: (r) => fecha(r.updated) },
  { key: 'creado', header: 'Created date', width: 120, cell: (r) => fecha(r.register) },
  { key: 'vence', header: 'Expiration date', width: 130, cell: (r: Registro) => <span className={cn(urge(r) && 'font-semibold text-dash-bad-fg')}>{fecha(r.expiration)}</span> },
]
const proveedor = (header: string): DataTableColumn<Registro> => ({ key: 'proveedor', header, cell: (r) => <TextCell>{r.provider ?? '—'}</TextCell> })
const especialidadDe = (nombre?: string) => proveedoresDerivacion().find((p) => p.nombre === nombre)?.especialidad

/* Las medicaciones de una receta en la fila: la primera en un chip y el resto detrás de "+N", que las despliega (como las
   franjas de Working hours, sin la ✕). */
function MedicacionesCelda({ r }: { r: Registro }) {
  const [abierto, setAbierto] = useState(false)
  const todas = r.receta?.medicaciones ?? []
  if (!todas.length) return <>—</>
  const visibles = abierto ? todas : todas.slice(0, 1)
  return (
    <span className="flex min-w-0 flex-wrap items-center gap-1.5">
      {visibles.map((m) => <Chip key={m.id} title={nombreMedicacion(m)}>{nombreMedicacion(m)}</Chip>)}
      {todas.length > visibles.length && (
        <ChipMas
          n={todas.length - visibles.length} label={`Show ${todas.length - visibles.length} more medications: ${todas.slice(1).map(nombreMedicacion).join(', ')}`}
          onClick={(e) => { e.stopPropagation(); setAbierto(true) }}
        />
      )}
    </span>
  )
}

const CONFIG: Record<TipoRegistro, {
  /** Además de Status y Provider, Lab order filtra por laboratorio (CON-2219). */
  grupoExtra?: { titulo: string; de: (r: Registro) => string }
  nombre: string
  plural: string
  icono: LucideIcon
  estados: string[]
  Ficha: ComponentType<PropsFicha>
  columnas: DataTableColumn<Registro>[]
  /** *Delete* va como tacho en la fila (Referral, como red.dev) y no en el ⋮ (Lab order y Prescription; Julián, 2026-11-28). */
  tachoEnFila?: boolean
  /** Qué nombra a la fila para el lector de pantalla. */
  rotulo: (r: Registro) => string
}> = {
  'Lab orders': {
    nombre: 'lab order', plural: 'lab orders', icono: FlaskConical, Ficha: LabOrderDetail,
    grupoExtra: { titulo: 'Laboratory', de: (r) => r.lab?.laboratorio ?? '' },
    estados: ['Pending', 'Requested', 'Delayed', 'Delivered', 'Rejected', 'Canceled'],
    columnas: [proveedor('Provider'), { key: 'laboratorio', header: 'Laboratory', cell: (r) => <TextCell>{r.lab?.laboratorio || '—'}</TextCell> }, columnaEstado, ...columnasFecha()],
    rotulo: (r) => `lab order for ${r.lab?.laboratorio || r.person}, ${r.state}, created ${r.register}`,
  },
  Prescriptions: {
    nombre: 'prescription', plural: 'prescriptions', icono: IconoPastilla, Ficha: PrescriptionDetail,
    estados: ['Pending', 'Active', 'Expired', 'Canceled'],
    columnas: [
      proveedor('Provider'),
      { key: 'medicacion', header: 'Medication', cell: (r) => <MedicacionesCelda r={r} /> },
      columnaEstado, ...columnasFecha(),
    ],
    rotulo: (r) => `prescription of ${r.receta?.medicaciones.map(nombreMedicacion).join(', ') || r.person}, ${r.state}, created ${r.register}`,
  },
  Referrals: {
    nombre: 'referral', plural: 'referrals', icono: ArrowRightLeft, Ficha: ReferralDetail, tachoEnFila: true,
    estados: ['Pending', 'Requested', 'Completed', 'Rejected', 'Canceled'],
    columnas: [
      proveedor('Referring provider'),
      { key: 'derivado', header: 'Referred provider', cell: (r) => (
        <span className="flex min-w-0 flex-col">
          <span className="truncate text-ink">{r.derivacion?.proveedor || '—'}</span>
          {especialidadDe(r.derivacion?.proveedor) && <span className="truncate text-[11px] text-ink-muted">{especialidadDe(r.derivacion?.proveedor)}</span>}
        </span>
      ) },
      /* CON-2609: Referral date, provider referido, provider creador y Status; el vencimiento, como la lista de red.dev. */
      columnaEstado, ...columnasFecha(),
    ],
    rotulo: (r) => `referral to ${r.derivacion?.proveedor || r.person}, ${r.state}, created ${r.register}`,
  },
}

type Vista = { modo: 'lista' } | { modo: 'ficha'; id: string } | { modo: 'nuevo'; borrador: Registro }

export function RegistrosPanel({ kind, paciente, pacienteId, tarea, maximo }: {
  kind: TipoRegistro
  /** El paciente de Clinical Mode: a su nombre quedan los registros nuevos (y su PDF). */
  paciente?: string
  pacienteId?: string
  /** La tarea de Pending Task que abrió Complete this task: entra directo a su ficha (CON-2643). */
  tarea?: PendingTask
  /** Cuántos registros mostrar como mucho (Storybook). */
  maximo?: number
}) {
  const c = CONFIG[kind]
  const [vista, setVista] = useState<Vista>(() => {
    asegurarRegistro(tarea)
    return tarea?.id ? { modo: 'ficha', id: tarea.id } : { modo: 'lista' }
  })
  const [estados, setEstados] = useState<string[]>([])
  const [proveedores, setProveedores] = useState<string[]>([])
  const [extras, setExtras] = useState<string[]>([])
  const todos = useRegistros(kind)
  const registros = maximo === undefined ? todos : todos.slice(0, maximo)
  const acciones = useAccionesTarea({ paciente: tarea?.patientId })
  const aLista = () => setVista({ modo: 'lista' })
  /* Edit abre la ficha acá mismo; el resto pasa por la pregunta de su acción. */
  const hacer = (t: PendingTask, a: AccionUI) => (a === 'Edit' && t.id ? setVista({ modo: 'ficha', id: t.id }) : acciones.hacer(t, a))

  if (vista.modo === 'nuevo') return <c.Ficha registro={vista.borrador} nuevo onVolver={aLista} onAccion={hacer} />

  const abierto = vista.modo === 'ficha' ? registros.find((r) => r.id === vista.id) : undefined
  /* Borrado desde su ⋮: ya no hay ficha que mostrar, vuelve a la lista. */
  if (vista.modo === 'ficha' && !abierto) { aLista(); return null }
  if (abierto) {
    return (
      <>
        {/* Otro estado, otra ficha: lo que no se guardó antes de Cancel o Delete no queda a la vista como si estuviera. */}
        <c.Ficha key={`${abierto.id}-${abierto.state}`} registro={abierto} onVolver={aLista} onAccion={hacer} />
        {acciones.dialogo}
      </>
    )
  }

  /* En Clinical Mode nada de esto pide un encuentro abierto: ni New, ni editar, ni las acciones (Julián, 2026-11-27). */
  const nuevo = <Button size="md" onClick={() => setVista({ modo: 'nuevo', borrador: nuevoRegistro(kind, tarea ? { person: tarea.person, initials: tarea.initials, patientId: tarea.patientId } : paciente ? { person: paciente, patientId: pacienteId, initials: paciente.split(/\s+/).map((x) => x[0]).join('').slice(0, 2).toUpperCase() } : undefined) })}><Plus /> New {c.nombre}</Button>
  const visibles = registros.filter((r) =>
    (!estados.length || estados.includes(r.state))
    && (!proveedores.length || proveedores.includes(r.provider ?? ''))
    && (!extras.length || extras.includes(c.grupoExtra?.de(r) ?? '')))
  const contar = (de: (r: Registro) => string) => (v: string) => ({ value: v, count: registros.filter((r) => de(r) === v).length })
  const unicos = (de: (r: Registro) => string) => [...new Set(registros.map(de).filter(Boolean))].sort()
  /* Los grupos del Filters de red.dev: Status y Provider en los tres, Laboratory en Lab order. Referral sólo Status. */
  const grupos: FilterGroup[] = [
    { title: 'Status', options: c.estados.map(contar((r) => r.state)), value: estados, onChange: setEstados },
    ...(c.grupoExtra ? [{ title: c.grupoExtra.titulo, options: unicos(c.grupoExtra.de).map(contar(c.grupoExtra.de)), value: extras, onChange: setExtras }] : []),
    ...(kind !== 'Referrals' ? [{ title: 'Provider', options: unicos((r) => r.provider ?? '').map(contar((r) => r.provider ?? '')), value: proveedores, onChange: setProveedores }] : []),
  ]
  /* El documento en la fila, como el ícono de red.dev: se abre cuando existe; si todavía no, se ve apagado. */
  const columnaPdf: DataTableColumn<Registro> = {
    key: 'pdf', header: 'PDF', width: 64, cell: (r) => (
      <button
        type="button" disabled={!r.pdf} aria-label={`View PDF of the ${c.rotulo(r)}`} title={r.pdf ? 'View PDF' : 'No document yet'}
        onClick={(e) => { e.stopPropagation(); hacer(r, 'PDF') }}
        className={cn(ICONO_SUELTO, 'disabled:cursor-not-allowed disabled:opacity-30')}
      >
        <FileText className="size-4" />
      </button>
    ),
  }
  /* Delete en la fila, entre el documento y el ⋮ como red.dev, con el tacho de la app; sólo se borra en Pending
     (CON-2356), en el resto se ve apagado. */
  const columnaTacho: DataTableColumn<Registro> = {
    key: 'borrar', header: 'Delete', width: 64, cell: (r) => (
      <button
        type="button" disabled={!accionesDe(r).includes('Delete')} aria-label={`Delete the ${c.rotulo(r)}`}
        title={accionesDe(r).includes('Delete') ? 'Delete' : `This ${c.nombre} can only be deleted while Pending.`}
        onClick={(e) => { e.stopPropagation(); hacer(r, 'Delete') }}
        className={cn(ICONO_TACHO, 'disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent')}
      >
        <Trash2 className="size-4" />
      </button>
    ),
  }

  return (
    <div>
      <DataTable
        columns={[...c.columnas, columnaPdf, ...(c.tachoEnFila ? [columnaTacho] : [])]}
        rows={visibles}
        rowKey={(r) => r.id}
        rowLabel={c.rotulo}
        onRowClick={(r) => setVista({ modo: 'ficha', id: r.id })}
        toolbarStart={<FilterMenu label={`Filter ${c.plural}`} groups={grupos} />}
        actions={nuevo}
        rowActions={(r) => (
          <>
            <DropdownMenuLabel className="text-[12px] font-semibold text-ink">Options</DropdownMenuLabel>
            <ItemsTarea task={r} onAccion={hacer} editarApagado sin={c.tachoEnFila ? ['Delete'] : []} />
          </>
        )}
        pageSize={10}
        empty={registros.length === 0
          ? { icon: c.icono, title: `No ${c.plural} yet`, detail: `New ${c.plural} for this patient will show up here.` }
          : { icon: c.icono, title: `No ${c.plural} match the current filters`, detail: 'Try different filters.' }}
      />
      {acciones.dialogo}
    </div>
  )
}
