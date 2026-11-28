import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState, type ComponentType, type ReactNode } from 'react'
import { ArrowRightLeft, Eye, FileText, FlaskConical, Pill as IconoPastilla, Plus, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ICONO_SUELTO } from '@/lib/estilos'
import { Button } from '@/components/ui/button'
import { Chip, ChipMas } from '@/components/ui/chip'
import { DataTable, TextCell, type DataTableColumn } from '@/components/ui/data-table'
import { DateNav } from '@/components/ui/date-nav'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { FilterMenu, type FilterGroup } from '@/components/ui/filter-menu'
import { Pill } from '@/components/ui/pill'
import { SettingsSearch } from '@/components/settings/SettingsSearch'
import type { PendingTask } from '@/components/dashboard/PendingTaskCard'
import { ItemsTarea, TONO_ESTADO, accionesDe, esEditable, useAccionesTarea, type AccionUI } from '@/components/dashboard/tareas'
import { nombreMedicacion } from '@/data/recetas'
import { LabOrderDetail } from './LabOrderDetail'
import { PrescriptionDetail } from './PrescriptionDetail'
import { ReferralDetail } from './ReferralDetail'
import { asegurarRegistro, nuevoRegistro, proveedoresDerivacion, urge, useRegistros, type Registro, type TipoRegistro } from './registros'

/* Las pestañas Lab order, Prescription y Referral de Clinical Mode son el mismo panel: la tabla estándar (buscador con
   Search, Filter y la fecha con el bloque del Dashboard, y la acción New a la derecha), la fila que abre la ficha, el ⋮ con las acciones del estado
   (la máquina de \`dashboard/tareas\`) y la ficha, que es una sola para New, Edit y la vista de sólo lectura. red.dev lista
   Prescription y Referral en cards; acá las tres van en tabla, como el resto de la app. Ver
   design-reference/figma/modulos/clinical-mode.md (2026-11-27). */

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
          n={todas.length - visibles.length} label={\`Show \${todas.length - visibles.length} more medications: \${todas.slice(1).map(nombreMedicacion).join(', ')}\`}
          onClick={(e) => { e.stopPropagation(); setAbierto(true) }}
        />
      )}
    </span>
  )
}

const CONFIG: Record<TipoRegistro, {
  /** El filtro de fecha de red.dev: el vencimiento (Lab order, Prescription) o la fecha de la derivación (CON-2609). */
  fecha: (r: Registro) => string
  /** Cómo se llama esa fecha, para el lector de pantalla. */
  nombreFecha: string
  /** Además de Status y Provider, Lab order filtra por laboratorio (CON-2219). */
  grupoExtra?: { titulo: string; de: (r: Registro) => string }
  nombre: string
  plural: string
  icono: LucideIcon
  estados: string[]
  Ficha: ComponentType<PropsFicha>
  columnas: DataTableColumn<Registro>[]
  /** El texto contra el que busca el buscador. */
  texto: (r: Registro) => string
  /** Qué nombra a la fila para el lector de pantalla. */
  rotulo: (r: Registro) => string
}> = {
  'Lab orders': {
    nombre: 'lab order', plural: 'lab orders', icono: FlaskConical, Ficha: LabOrderDetail,
    fecha: (r) => r.expiration, nombreFecha: 'expiration date',
    grupoExtra: { titulo: 'Laboratory', de: (r) => r.lab?.laboratorio ?? '' },
    estados: ['Pending', 'Requested', 'Delayed', 'Delivered', 'Rejected', 'Canceled'],
    columnas: [proveedor('Provider'), { key: 'laboratorio', header: 'Laboratory', cell: (r) => <TextCell>{r.lab?.laboratorio || '—'}</TextCell> }, columnaEstado, ...columnasFecha()],
    texto: (r) => \`\${r.provider} \${r.lab?.laboratorio} \${r.state}\`,
    rotulo: (r) => \`lab order for \${r.lab?.laboratorio || r.person}, \${r.state}, created \${r.register}\`,
  },
  Prescriptions: {
    nombre: 'prescription', plural: 'prescriptions', icono: IconoPastilla, Ficha: PrescriptionDetail,
    fecha: (r) => r.expiration, nombreFecha: 'expiration date',
    estados: ['Pending', 'Active', 'Expired', 'Canceled'],
    columnas: [
      proveedor('Provider'),
      { key: 'medicacion', header: 'Medication', cell: (r) => <MedicacionesCelda r={r} /> },
      columnaEstado, ...columnasFecha(),
    ],
    texto: (r) => \`\${r.provider} \${r.receta?.medicaciones.map(nombreMedicacion).join(' ')} \${r.state}\`,
    rotulo: (r) => \`prescription of \${r.receta?.medicaciones.map(nombreMedicacion).join(', ') || r.person}, \${r.state}, created \${r.register}\`,
  },
  Referrals: {
    nombre: 'referral', plural: 'referrals', icono: ArrowRightLeft, Ficha: ReferralDetail,
    fecha: (r) => r.register, nombreFecha: 'referral date',
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
    texto: (r) => \`\${r.provider} \${r.derivacion?.proveedor} \${especialidadDe(r.derivacion?.proveedor) ?? ''} \${r.state}\`,
    rotulo: (r) => \`referral to \${r.derivacion?.proveedor || r.person}, \${r.state}, created \${r.register}\`,
  },
}

type Vista = { modo: 'lista' } | { modo: 'ficha'; id: string } | { modo: 'nuevo'; borrador: Registro }

export function RegistrosPanel({ kind, paciente, tarea, maximo }: {
  kind: TipoRegistro
  /** El paciente de Clinical Mode: a su nombre quedan los registros nuevos (y su PDF). */
  paciente?: string
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
  const [q, setQ] = useState('')
  const [estados, setEstados] = useState<string[]>([])
  const [proveedores, setProveedores] = useState<string[]>([])
  const [extras, setExtras] = useState<string[]>([])
  /* El mes que filtra la tabla; sin mes, todas las fechas. */
  const [mesFiltro, setMesFiltro] = useState<Date | null>(null)
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
        <c.Ficha key={abierto.id} registro={abierto} onVolver={aLista} onAccion={hacer} />
        {acciones.dialogo}
      </>
    )
  }

  /* En Clinical Mode nada de esto pide un encuentro abierto: ni New, ni editar, ni las acciones (Julián, 2026-11-27). */
  const nuevo = <Button size="md" onClick={() => setVista({ modo: 'nuevo', borrador: nuevoRegistro(kind, tarea ? { person: tarea.person, initials: tarea.initials, patientId: tarea.patientId } : paciente ? { person: paciente, initials: paciente.split(/\\s+/).map((x) => x[0]).join('').slice(0, 2).toUpperCase() } : undefined) })}><Plus /> New {c.nombre}</Button>
  const fechaDe = (r: Registro) => new Date(c.fecha(r))
  const visibles = registros.filter((r) =>
    c.texto(r).toLowerCase().includes(q.trim().toLowerCase())
    && (!estados.length || estados.includes(r.state))
    && (!proveedores.length || proveedores.includes(r.provider ?? ''))
    && (!extras.length || extras.includes(c.grupoExtra?.de(r) ?? ''))
    && (!mesFiltro || (fechaDe(r).getFullYear() === mesFiltro.getFullYear() && fechaDe(r).getMonth() === mesFiltro.getMonth())))
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
        type="button" disabled={!r.pdf} aria-label={\`View PDF of the \${c.rotulo(r)}\`} title={r.pdf ? 'View PDF' : 'No document yet'}
        onClick={(e) => { e.stopPropagation(); hacer(r, 'PDF') }}
        className={cn(ICONO_SUELTO, 'disabled:cursor-not-allowed disabled:opacity-30')}
      >
        <FileText className="size-4" />
      </button>
    ),
  }
  const item = (icono: ReactNode, texto: string, alElegir: () => void) => <DropdownMenuItem className="text-[13px]" onSelect={alElegir}>{icono} {texto}</DropdownMenuItem>

  return (
    <div>
      <DataTable
        columns={[...c.columnas, columnaPdf]}
        rows={visibles}
        rowKey={(r) => r.id}
        rowLabel={c.rotulo}
        onRowClick={(r) => setVista({ modo: 'ficha', id: r.id })}
        toolbarStart={(
          <>
            <SettingsSearch value={q} onChange={setQ} placeholder={\`Search \${c.plural}\`} />
            <FilterMenu label={\`Filter \${c.plural}\`} groups={grupos} />
            {/* La fecha, con el bloque del Dashboard (‹ Today › + calendario, ui/date-nav), por mes: el del vencimiento o
                el de la derivación. Sin mes elegido, All dates. */}
            <DateNav value={mesFiltro} onChange={setMesFiltro} onClear={() => setMesFiltro(null)} periodo="month" vacio="All dates" label={\`Filter \${c.plural} by \${c.nombreFecha}\`} />
          </>
        )}
        actions={nuevo}
        rowActions={(r) => (
          <>
            {!esEditable(r) && item(<Eye className="size-3.5" />, 'View', () => setVista({ modo: 'ficha', id: r.id }))}
            {accionesDe(r).length > 0 && <ItemsTarea task={r} abierto onAccion={hacer} />}
          </>
        )}
        pageSize={10}
        empty={registros.length === 0
          ? { icon: c.icono, title: \`No \${c.plural} yet\`, detail: \`New \${c.plural} for this patient will show up here.\` }
          : { icon: c.icono, title: \`No \${c.plural} match the current filters\`, detail: 'Try a different search, status or date.' }}
      />
      {acciones.dialogo}
    </div>
  )
}
`})))()}export{n,i as r,r as t};