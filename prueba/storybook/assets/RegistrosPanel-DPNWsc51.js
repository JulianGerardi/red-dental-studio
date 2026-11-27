import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState, type ComponentType, type ReactNode } from 'react'
import { ArrowRightLeft, Eye, FileText, FlaskConical, Pill as IconoPastilla, Plus, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Chip } from '@/components/ui/chip'
import { DataTable, TextCell, type DataTableColumn } from '@/components/ui/data-table'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Pill } from '@/components/ui/pill'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { SettingsSearch } from '@/components/settings/SettingsSearch'
import type { PendingTask } from '@/components/dashboard/PendingTaskCard'
import { ItemsTarea, SIN_ENCUENTRO, TONO_ESTADO, accionesDe, esEditable, useAccionesTarea, type AccionUI } from '@/components/dashboard/tareas'
import { nombreMedicacion } from '@/data/recetas'
import { LabOrderDetail } from './LabOrderDetail'
import { PrescriptionDetail } from './PrescriptionDetail'
import { ReferralDetail } from './ReferralDetail'
import { asegurarRegistro, nuevoRegistro, proveedoresDerivacion, useRegistros, type Registro, type TipoRegistro } from './registros'

/* Las pestañas Lab order, Prescription y Referral de Clinical Mode son el mismo panel: la tabla estándar (buscador con
   Search, Filter por estado y la acción New a la derecha), la fila que abre la ficha, el ⋮ con las acciones del estado
   (la máquina de \`dashboard/tareas\`) y la ficha, que es una sola para New, Edit y la vista de sólo lectura. red.dev lista
   Prescription y Referral en cards; acá las tres van en tabla, como el resto de la app. Ver
   design-reference/figma/modulos/clinical-mode.md (2026-11-27). */

type PropsFicha = { registro: Registro; nuevo?: boolean; abierto: boolean; onVolver: () => void; onAccion: (t: PendingTask, a: AccionUI) => void }

const fecha = (s: string) => s || '—'
const FINALES = ['Delivered', 'Rejected', 'Canceled', 'Completed', 'Expired']
/* Vence en una semana o ya venció y sigue abierto: en rojo, como red.dev. */
const urge = (r: Registro) => {
  const f = new Date(r.expiration)
  return !FINALES.includes(r.state) && !Number.isNaN(f.getTime()) && f.getTime() - Date.now() < 7 * 86400000
}
const columnaEstado: DataTableColumn<Registro> = { key: 'estado', header: 'Status', width: 120, cell: (r) => <Pill tone={TONO_ESTADO[r.state] ?? 'info'}>{r.state}</Pill> }
const columnasFecha = (conVencimiento = true): DataTableColumn<Registro>[] => [
  { key: 'actualizado', header: 'Last update', width: 120, cell: (r) => fecha(r.updated) },
  { key: 'creado', header: 'Created date', width: 120, cell: (r) => fecha(r.register) },
  ...(conVencimiento ? [{ key: 'vence', header: 'Expiration date', width: 130, cell: (r: Registro) => <span className={cn(urge(r) && 'font-semibold text-dash-bad-fg')}>{fecha(r.expiration)}</span> }] : []),
]
const proveedor = (header: string): DataTableColumn<Registro> => ({ key: 'proveedor', header, cell: (r) => <TextCell>{r.provider ?? '—'}</TextCell> })
const especialidadDe = (nombre?: string) => proveedoresDerivacion().find((p) => p.nombre === nombre)?.especialidad

const CONFIG: Record<TipoRegistro, {
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
    estados: ['Pending', 'Requested', 'Delayed', 'Delivered', 'Rejected', 'Canceled'],
    columnas: [proveedor('Provider'), { key: 'laboratorio', header: 'Laboratory', cell: (r) => <TextCell>{r.lab?.laboratorio || '—'}</TextCell> }, columnaEstado, ...columnasFecha()],
    texto: (r) => \`\${r.provider} \${r.lab?.laboratorio} \${r.state}\`,
    rotulo: (r) => \`lab order for \${r.lab?.laboratorio || r.person}, \${r.state}, created \${r.register}\`,
  },
  Prescriptions: {
    nombre: 'prescription', plural: 'prescriptions', icono: IconoPastilla, Ficha: PrescriptionDetail,
    estados: ['Pending', 'Active', 'Expired', 'Canceled'],
    columnas: [
      proveedor('Provider'),
      { key: 'medicacion', header: 'Medication', cell: (r) => {
        const [primera, ...resto] = r.receta?.medicaciones ?? []
        return (
          <span className="flex min-w-0 items-center gap-1.5">
            {primera ? <Chip title={nombreMedicacion(primera)}>{nombreMedicacion(primera)}</Chip> : '—'}
            {resto.length > 0 && <span className="shrink-0 text-xs text-ink-muted" title={resto.map(nombreMedicacion).join(', ')}>+{resto.length}</span>}
          </span>
        )
      } },
      columnaEstado, ...columnasFecha(),
    ],
    texto: (r) => \`\${r.provider} \${r.receta?.medicaciones.map(nombreMedicacion).join(' ')} \${r.state}\`,
    rotulo: (r) => \`prescription of \${r.receta?.medicaciones.map(nombreMedicacion).join(', ') || r.person}, \${r.state}, created \${r.register}\`,
  },
  Referrals: {
    nombre: 'referral', plural: 'referrals', icono: ArrowRightLeft, Ficha: ReferralDetail,
    estados: ['Pending', 'Requested', 'Completed', 'Rejected', 'Canceled'],
    columnas: [
      proveedor('Referring provider'),
      { key: 'derivado', header: 'Referred provider', cell: (r) => (
        <span className="flex min-w-0 flex-col">
          <span className="truncate text-ink">{r.derivacion?.proveedor || '—'}</span>
          {especialidadDe(r.derivacion?.proveedor) && <span className="truncate text-[11px] text-ink-muted">{especialidadDe(r.derivacion?.proveedor)}</span>}
        </span>
      ) },
      /* CON-2609: Referral date, provider referido, provider creador y Status; la derivación no tiene vencimiento propio. */
      columnaEstado, ...columnasFecha(false),
    ],
    texto: (r) => \`\${r.provider} \${r.derivacion?.proveedor} \${especialidadDe(r.derivacion?.proveedor) ?? ''} \${r.state}\`,
    rotulo: (r) => \`referral to \${r.derivacion?.proveedor || r.person}, \${r.state}, created \${r.register}\`,
  },
}

type Vista = { modo: 'lista' } | { modo: 'ficha'; id: string } | { modo: 'nuevo'; borrador: Registro }

export function RegistrosPanel({ kind, tarea, encuentroAbierto = false, maximo }: {
  kind: TipoRegistro
  /** La tarea de Pending Task que abrió Complete this task: entra directo a su ficha (CON-2643). */
  tarea?: PendingTask
  encuentroAbierto?: boolean
  /** Cuántos registros mostrar como mucho (Storybook). */
  maximo?: number
}) {
  const c = CONFIG[kind]
  const [vista, setVista] = useState<Vista>(() => {
    asegurarRegistro(tarea)
    return tarea?.id ? { modo: 'ficha', id: tarea.id } : { modo: 'lista' }
  })
  const [q, setQ] = useState('')
  const todos = useRegistros(kind)
  const registros = maximo === undefined ? todos : todos.slice(0, maximo)
  const acciones = useAccionesTarea({ paciente: tarea?.patientId })
  const aLista = () => setVista({ modo: 'lista' })
  /* Edit abre la ficha acá mismo; el resto pasa por la pregunta de su acción. */
  const hacer = (t: PendingTask, a: AccionUI) => (a === 'Edit' && t.id ? setVista({ modo: 'ficha', id: t.id }) : acciones.hacer(t, a))

  if (vista.modo === 'nuevo') return <c.Ficha registro={vista.borrador} nuevo abierto={encuentroAbierto} onVolver={aLista} onAccion={hacer} />

  const abierto = vista.modo === 'ficha' ? registros.find((r) => r.id === vista.id) : undefined
  /* Borrado desde su ⋮: ya no hay ficha que mostrar, vuelve a la lista. */
  if (vista.modo === 'ficha' && !abierto) { aLista(); return null }
  if (abierto) {
    return (
      <>
        <c.Ficha key={abierto.id} registro={abierto} abierto={encuentroAbierto} onVolver={aLista} onAccion={hacer} />
        {acciones.dialogo}
      </>
    )
  }

  const nuevo = (
    <Button size="md" aria-disabled={!encuentroAbierto || undefined} className={cn(!encuentroAbierto && 'cursor-not-allowed opacity-50')}
      onClick={() => { if (encuentroAbierto) setVista({ modo: 'nuevo', borrador: nuevoRegistro(kind, tarea) }) }}
    >
      <Plus /> New {c.nombre}
    </Button>
  )
  const visibles = registros.filter((r) => c.texto(r).toLowerCase().includes(q.trim().toLowerCase()))
  const item = (icono: ReactNode, texto: string, alElegir: () => void) => <DropdownMenuItem className="text-[13px]" onSelect={alElegir}>{icono} {texto}</DropdownMenuItem>

  return (
    <div>
      <DataTable
        columns={c.columnas}
        rows={visibles}
        rowKey={(r) => r.id}
        rowLabel={c.rotulo}
        onRowClick={(r) => setVista({ modo: 'ficha', id: r.id })}
        toolbarStart={<SettingsSearch value={q} onChange={setQ} placeholder={\`Search \${c.plural}\`} />}
        filter={{
          label: \`Filter \${c.plural} by status\`,
          options: c.estados.map((e) => ({ value: e, count: registros.filter((r) => r.state === e).length })),
          match: (r, sel) => sel.includes(r.state),
        }}
        actions={encuentroAbierto ? nuevo : (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>{nuevo}</TooltipTrigger>
              <TooltipContent side="top" className="max-w-[240px] text-center">{SIN_ENCUENTRO}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        rowActions={(r) => (
          <>
            {!esEditable(r) && item(<Eye className="size-3.5" />, 'View', () => setVista({ modo: 'ficha', id: r.id }))}
            {r.pdf && item(<FileText className="size-3.5" />, 'View PDF', () => hacer(r, 'PDF'))}
            {accionesDe(r).length > 0 && <ItemsTarea task={r} abierto={encuentroAbierto} onAccion={hacer} />}
          </>
        )}
        pageSize={10}
        empty={registros.length === 0
          ? { icon: c.icono, title: \`No \${c.plural} yet\`, detail: \`New \${c.plural} for this patient will show up here.\` }
          : { icon: c.icono, title: \`No \${c.plural} found\`, detail: 'Try a different search or status.' }}
      />
      {acciones.dialogo}
    </div>
  )
}
`})))()}export{n,i as r,r as t};