import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { Archive, ArchiveRestore, Copy, GitCompareArrows, Network, Pencil, Plus, Power, ReceiptText, Search, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { FieldLabel, SelectField, TextField, control } from '@/components/patients/form'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTable, TextCell, type DataTableColumn } from '@/components/ui/data-table'
import { DatePicker } from '@/components/ui/date-picker'
import { FilterMenu } from '@/components/ui/filter-menu'
import { Pill } from '@/components/ui/pill'
import { Switch } from '@/components/ui/switch'
import { aviso } from '@/components/ui/toaster'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { SettingsSearch } from '@/components/settings/SettingsSearch'
import { MasterList, type ItemMaestro } from '@/components/finance/MasterList'
import { AssignmentsCount, AssignmentsDrawer, asignacionesDe } from '@/components/finance/Assignments'
import { CompareFeesDrawer } from '@/components/finance/CompareFeesDrawer'
import { MoneyInput } from '@/components/finance/fields'
import { CopyFormDrawer, IncreaseAllDrawer, aumentar } from '@/components/finance/FeeScheduleTools'
import { ICONO_SUELTO, TARJETA_PANEL } from '@/lib/estilos'
import { useFinanzas } from '@/data/finanzasStore'
import {
  ESTADOS_ARANCEL, PROCEDIMIENTOS, SIN_ASIGNAR, TIPOS_ARANCEL, TONO_ARANCEL, conImporte, dinero, etiquetaVersion, fechaDMA,
  hoyIso, idNuevo, versionVigente, type Arancel, type EstadoArancel, type TipoArancel,
} from '@/data/finanzas'

/* Settings → Billing → Fee Schedules: la tabla (Name, Type, Assignments, Effective, Last updated, Status, Actions) y,
   al editar, la lista y el editor de red.dev con sus versiones. New Fee Schedule es una página sin la lista. Ver
   settings-billing.md. */

export const LISTA_ARANCELES = '/settings/finance/fee-schedule'
export const rutaArancel = (id: string) => \`\${LISTA_ARANCELES}/\${id}/edit\`

const aIso = (d: Date) => \`\${d.getFullYear()}-\${String(d.getMonth() + 1).padStart(2, '0')}-\${String(d.getDate()).padStart(2, '0')}\`

/* Inactive / Active y Archive / Restore, con Undo. */
export function accionesArancel(a: Arancel, guardar: (a: Arancel) => void) {
  const pasar = (estado: EstadoArancel, texto: string) => {
    guardar({ ...a, estado })
    aviso.ok(\`\${a.nombre} \${texto}.\`, { label: 'Undo', onClick: () => guardar(a) })
  }
  return (
    <>
      {a.estado !== 'Archived' && (
        <DropdownMenuItem variant={a.estado === 'Active' ? 'destructive' : 'default'} onSelect={() => pasar(a.estado === 'Active' ? 'Inactive' : 'Active', a.estado === 'Active' ? 'is now inactive' : 'is now active')}>
          <Power className="size-4 shrink-0" /> {a.estado === 'Active' ? 'Inactive' : 'Active'}
        </DropdownMenuItem>
      )}
      {a.estado === 'Archived'
        ? <DropdownMenuItem onSelect={() => pasar('Inactive', 'was restored as inactive')}><ArchiveRestore className="size-4 shrink-0" /> Restore</DropdownMenuItem>
        : <DropdownMenuItem variant="destructive" onSelect={() => pasar('Archived', 'was archived')}><Archive className="size-4 shrink-0" /> Archive</DropdownMenuItem>}
    </>
  )
}

/* El editor de la derecha (y, sin \`arancel\`, la página New Fee Schedule). New Fee empieza igual a la versión elegida;
   guardar con precios distintos crea una versión desde Available From (o pisa la que empieza ese mismo día). */
export function FeeScheduleEditor({ arancel, onGuardado }: { arancel?: Arancel; onGuardado?: (a: Arancel) => void }) {
  const navigate = useNavigate()
  const { aranceles, guardar } = useFinanzas()
  const vigente = arancel ? versionVigente(arancel) : undefined
  const [versionId, setVersionId] = useState(vigente?.id ?? '')
  const version = arancel?.versiones.find((v) => v.id === versionId) ?? vigente
  const [nombre, setNombre] = useState(arancel?.nombre ?? '')
  const [tipo, setTipo] = useState<TipoArancel | ''>(arancel?.tipo ?? '')
  const [elegidos, setElegidos] = useState<string[]>([])
  const [renombrando, setRenombrando] = useState(!arancel)
  const [borrador, setBorrador] = useState(arancel ? arancel.estado === 'Inactive' : false)
  const [desde, setDesde] = useState<Date | null>(new Date())
  const [nuevos, setNuevos] = useState<Record<string, number | null>>(() => ({ ...(version?.precios ?? {}) }))
  const [q, setQ] = useState('')
  const [herramienta, setHerramienta] = useState<'copiar' | 'aumentar' | null>(null)
  const [intentado, setIntentado] = useState(false)

  const filas = PROCEDIMIENTOS.filter((p) => \`\${p.code} \${p.label}\`.toLowerCase().includes(q.trim().toLowerCase()))
  const precios = Object.fromEntries(Object.entries(nuevos).filter(([, v]) => v !== null)) as Record<string, number>
  const preciosCambiados = JSON.stringify(precios) !== JSON.stringify(version?.precios ?? {})
  const cambiado = !arancel || preciosCambiados || nombre.trim() !== arancel.nombre || tipo !== arancel.tipo || borrador !== (arancel.estado === 'Inactive')
  const faltaNombre = intentado && !nombre.trim() ? 'This field is required.' : undefined
  const faltaTipo = intentado && !tipo ? 'This field is required.' : undefined
  const todas = filas.length > 0 && filas.every((p) => elegidos.includes(p.code))
  const faltaFecha = intentado && arancel && preciosCambiados && !desde ? 'This field is required.' : undefined
  const repetido = !!nombre.trim() && aranceles.some((a) => a.id !== arancel?.id && a.nombre.toLowerCase() === nombre.trim().toLowerCase())

  const elegirVersion = (etiqueta: string) => {
    const v = arancel?.versiones.find((x) => etiquetaVersion(arancel, x) === etiqueta)
    if (!v) return
    setVersionId(v.id)
    setNuevos({ ...v.precios })
  }

  const guardarTodo = () => {
    if (!nombre.trim() || !tipo || repetido || (arancel && preciosCambiados && !desde)) { setIntentado(true); return }
    const estado: EstadoArancel = borrador ? 'Inactive' : arancel?.estado === 'Archived' ? 'Archived' : 'Active'
    if (!arancel) {
      const nuevo: Arancel = {
        id: idNuevo(nombre, aranceles.map((a) => a.id)), nombre: nombre.trim(), tipo, porDefecto: false, estado,
        versiones: [{ id: \`v-\${Date.now().toString(36)}\`, desde: aIso(new Date()), precios }], actualizado: hoyIso(), asignados: SIN_ASIGNAR,
      }
      guardar('aranceles', nuevo)
      aviso.ok(\`\${nuevo.nombre} was created.\`)
      navigate(rutaArancel(nuevo.id))
      return
    }
    let versiones = arancel.versiones
    if (preciosCambiados && desde) {
      const dia = aIso(desde)
      const mismoDia = versiones.find((v) => v.desde === dia)
      versiones = mismoDia
        ? versiones.map((v) => (v.id === mismoDia.id ? { ...v, precios } : v))
        : [...versiones, { id: \`v-\${Date.now().toString(36)}\`, desde: dia, precios }]
    }
    const actualizado = { ...arancel, nombre: nombre.trim(), tipo, estado, versiones, actualizado: hoyIso() }
    guardar('aranceles', actualizado)
    setIntentado(false)
    setRenombrando(false)
    aviso.ok(preciosCambiados && desde ? \`\${actualizado.nombre} was saved. The new fees apply from \${fechaDMA(aIso(desde))}.\` : \`\${actualizado.nombre} was saved.\`)
    onGuardado?.(actualizado)
  }

  const campoTipo = (
    <SelectField label="Type" required placeholder="Select a type" options={[...TIPOS_ARANCEL]} value={tipo} onChange={(v) => setTipo(v as TipoArancel)} error={faltaTipo} />
  )
  const columnas = cn('grid items-center gap-3', arancel ? 'grid-cols-[16px_64px_1fr_96px_120px]' : 'grid-cols-[16px_64px_1fr_120px]')

  return (
    <div className="flex flex-col gap-4">
      {intentado && (!nombre.trim() || !tipo || faltaFecha) && (
        <Alert tone="danger" title="Uncompleted fields">All required fields marked with (*) must be completed before proceeding</Alert>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[15px] font-semibold text-ink">General information</h2>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setHerramienta('copiar')}><Copy /> Copy form</Button>
          <Button variant="secondary" onClick={() => setHerramienta('aumentar')}><SlidersHorizontal /> Bulk Edit</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-start gap-2">
          <TextField
            label="Fee Schedule's Name" required placeholder="Enter a fee schedule name" value={nombre} onChange={setNombre}
            disabled={!renombrando} error={faltaNombre ?? (repetido ? 'Another fee schedule has this name.' : undefined)} className="min-w-0 flex-1"
          />
          {arancel && (
            <button type="button" aria-label="Rename fee schedule" aria-pressed={renombrando} onClick={() => setRenombrando((r) => !r)} className={cn(ICONO_SUELTO, 'mt-[26px] size-9', renombrando && 'bg-info-bg text-dash-blue')}>
              <Pencil className="size-4" />
            </button>
          )}
        </div>
        {arancel && version && (
          <SelectField label="Fee Schedule Version" options={arancel.versiones.map((v) => etiquetaVersion(arancel, v))} value={etiquetaVersion(arancel, version)} onChange={elegirVersion} />
        )}
        {!arancel && campoTipo}
        <div className="flex flex-col gap-2">
          <FieldLabel>Save in draft state</FieldLabel>
          <label className="flex h-9 items-center gap-2 text-[13px] text-ink">
            <Switch checked={borrador} onCheckedChange={setBorrador} aria-label="Save in draft state" />
            Inactive
          </label>
        </div>
        {arancel && (
          <div className="flex flex-col gap-2">
            <FieldLabel required>Available From</FieldLabel>
            <DatePicker value={desde} onChange={setDesde} className="h-9 w-full" error={!!faltaFecha} />
            {faltaFecha && <span className="-mt-1 text-[11px] text-field-error">{faltaFecha}</span>}
          </div>
        )}
        {arancel && campoTipo}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="relative block w-full sm:max-w-[320px]">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
          <input aria-label="Search procedure" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search procedure..." className={cn(control(), 'h-9 pr-3 pl-9')} />
        </span>
        <span className="text-[13px] text-ink-muted tabular-nums" title="Procedures whose New Fee is more than $0.00">
          Non-zero fees — <span className="font-semibold text-ink">{conImporte(nuevos)} / {PROCEDIMIENTOS.length}</span>
        </span>
      </div>

      {elegidos.length > 0 && (
        <div role="status" className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg bg-info-bg px-3 py-2 text-[13px]">
          <span className="font-semibold text-ink">{elegidos.length} selected</span>
          <span className="text-ink-muted">Bulk Edit changes only these fees.</span>
          <button type="button" onClick={() => setElegidos([])} className="ml-auto font-medium text-dash-blue hover:underline">Clear selection</button>
        </div>
      )}

      <div role="table" aria-label="Fees" className="text-[13px]">
        <div role="row" className={cn(columnas, 'border-b border-line pb-2 text-xs font-medium text-ink-muted')}>
          <span role="columnheader">
            <Checkbox
              on={todas} label="Select all procedures" disabled={filas.length === 0}
              onChange={(v) => setElegidos((e) => (v ? [...new Set([...e, ...filas.map((p) => p.code)])] : e.filter((c) => !filas.some((p) => p.code === c))))}
            />
          </span>
          <span role="columnheader">Code</span><span role="columnheader">Description</span>
          {arancel && <span role="columnheader" className="text-right">Current Fee</span>}
          <span role="columnheader" className="text-right">New Fee</span>
        </div>
        {filas.map((p) => {
          const elegido = elegidos.includes(p.code)
          const actual = version?.precios[p.code]
          const cambio = !!arancel && (nuevos[p.code] ?? null) !== (actual ?? null)
          return (
            <div key={p.code} role="row" aria-selected={elegido} className={cn(columnas, 'border-b border-line px-0 py-1.5 last:border-b-0', elegido && 'bg-info-bg/60')}>
              <span role="cell"><Checkbox on={elegido} label={\`Select \${p.code}\`} onChange={(v) => setElegidos((e) => (v ? [...e, p.code] : e.filter((c) => c !== p.code)))} /></span>
              <span role="cell" className="font-medium tabular-nums">{p.code}</span>
              <span role="cell" className="min-w-0 text-ink-muted">{p.label}</span>
              {arancel && <span role="cell" className="text-right text-ink-muted tabular-nums">{actual !== undefined ? dinero(actual) : '—'}</span>}
              <span role="cell"><MoneyInput label={\`\${p.code} new fee\`} value={nuevos[p.code] ?? null} onChange={(v) => setNuevos((n) => ({ ...n, [p.code]: v }))} className={cn(cambio && 'font-semibold text-dash-blue')} /></span>
            </div>
          )
        })}
        {filas.length === 0 && <p className="py-6 text-center text-ink-muted">No procedures match “{q}”.</p>}
      </div>

      <div className="flex justify-between gap-3">
        <Button variant="secondary" onClick={() => navigate(LISTA_ARANCELES)}>Cancel</Button>
        <Button disabled={!cambiado} onClick={guardarTodo}>Save</Button>
      </div>

      {herramienta === 'copiar' && (
        <CopyFormDrawer
          opciones={aranceles.filter((a) => a.id !== arancel?.id && a.estado === 'Active').map((a) => a.nombre)}
          onClose={() => setHerramienta(null)}
          onCopiar={(n) => {
            const origen = aranceles.find((a) => a.nombre === n)
            if (!origen) return
            setNuevos({ ...versionVigente(origen).precios })
            aviso.info(\`New fees copied from \${n}. Save to keep them.\`)
          }}
        />
      )}
      {herramienta === 'aumentar' && (
        <IncreaseAllDrawer
          seleccionados={elegidos.length}
          onClose={() => setHerramienta(null)}
          onAplicar={(a) => {
            const codigos = elegidos.length ? elegidos : PROCEDIMIENTOS.map((p) => p.code)
            setNuevos((n) => ({ ...n, ...Object.fromEntries(codigos.map((c) => [c, aumentar(n[c] ?? 0, a)])) }))
            aviso.info(elegidos.length ? \`\${elegidos.length} new fees were updated. Save to keep them.\` : 'New fees were updated. Save to keep them.')
          }}
        />
      )}
    </div>
  )
}

/* La tabla de la lista. Actions: Edit, View assignments y Compare fees (pedido de Julián). */
export function SettingsFeeSchedules() {
  const navigate = useNavigate()
  const { aranceles, planes, aseguradoras } = useFinanzas()
  const [q, setQ] = useState('')
  const [estados, setEstados] = useState<string[]>(['Active', 'Inactive'])
  const [drawer, setDrawer] = useState<{ tipo: 'asignaciones' | 'comparar'; a: Arancel } | null>(null)

  const filas = useMemo(
    () => aranceles.filter((a) => (estados.length === 0 || estados.includes(a.estado)) && \`\${a.nombre} \${a.tipo}\`.toLowerCase().includes(q.trim().toLowerCase())),
    [aranceles, estados, q],
  )

  const columnas: DataTableColumn<Arancel>[] = [
    {
      key: 'nombre', header: 'Name', locked: true,
      cell: (a) => (
        <span className="flex min-w-0 items-center gap-2">
          <Link to={rutaArancel(a.id)} className="truncate font-semibold text-dash-blue hover:underline">{a.nombre}</Link>
          {a.porDefecto && <Pill tone="info" size="sm">Default</Pill>}
        </span>
      ),
    },
    { key: 'tipo', header: 'Type', width: 120, cell: (a) => <TextCell>{a.tipo}</TextCell> },
    {
      key: 'asignaciones', header: 'Assignments', width: 120, align: 'center',
      cell: (a) => <AssignmentsCount asignaciones={asignacionesDe(a, planes, aseguradoras)} onVer={() => setDrawer({ tipo: 'asignaciones', a })} />,
    },
    { key: 'vigencia', header: 'Effective', width: 110, cell: (a) => <span className="tabular-nums">{fechaDMA(versionVigente(a).desde)}</span> },
    { key: 'actualizado', header: 'Last updated', width: 120, cell: (a) => <span className="tabular-nums">{fechaDMA(a.actualizado)}</span> },
    { key: 'estado', header: 'Status', width: 100, cell: (a) => <Pill tone={TONO_ARANCEL[a.estado]}>{a.estado}</Pill> },
  ]

  return (
    <div className="px-4 py-6 sm:px-8">
      <SettingsPageHeader
        titulo="Fee Schedules"
        bajada="What the office charges for each procedure, with a version for each date the fees change."
        accion={<Button onClick={() => navigate(\`\${LISTA_ARANCELES}/new\`)}><Plus /> New Fee Schedule</Button>}
      >
        <SettingsSearch value={q} onChange={setQ} placeholder="Search a Fee Schedule Here..." />
        <FilterMenu
          label="Filters"
          groups={[{
            title: 'States', value: estados, onChange: setEstados,
            options: ESTADOS_ARANCEL.map((e) => ({ value: e, count: aranceles.filter((a) => a.estado === e).length, tone: TONO_ARANCEL[e] })),
          }]}
        />
      </SettingsPageHeader>

      <div className="mt-4">
        <DataTable
          columns={columnas}
          rows={filas}
          rowKey={(a) => a.id}
          rowLabel={(a) => a.nombre}
          itemLabel="fee schedules"
          empty={{ icon: ReceiptText, title: 'No Fee Schedule Found', detail: 'Try another name or state, or create a new one with New Fee Schedule.' }}
          rowActions={(a) => (
            <>
              <DropdownMenuItem onSelect={() => navigate(rutaArancel(a.id))}><Pencil className="size-4 shrink-0" /> Edit</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setDrawer({ tipo: 'asignaciones', a })}><Network className="size-4 shrink-0" /> View assignments</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setDrawer({ tipo: 'comparar', a })}><GitCompareArrows className="size-4 shrink-0" /> Compare fees</DropdownMenuItem>
            </>
          )}
        />
      </div>

      {drawer?.tipo === 'asignaciones' && (
        <AssignmentsDrawer arancel={drawer.a} asignaciones={asignacionesDe(drawer.a, planes, aseguradoras)} onClose={() => setDrawer(null)} />
      )}
      {drawer?.tipo === 'comparar' && (
        <CompareFeesDrawer arancel={drawer.a} aranceles={aranceles} onClose={() => setDrawer(null)} onEditar={() => navigate(rutaArancel(drawer.a.id))} />
      )}
    </div>
  )
}

/* Editar: la lista de red.dev a la izquierda (con su filtro de estados y ⋮ Inactive / Archive) y el editor a la derecha. */
export function SettingsFeeScheduleEdit() {
  const { feeId } = useParams()
  const navigate = useNavigate()
  const { aranceles, guardar } = useFinanzas()
  const [q, setQ] = useState('')
  const [estados, setEstados] = useState<string[]>(['Active'])
  const elegido = aranceles.find((a) => a.id === feeId)

  const items: ItemMaestro[] = useMemo(() => aranceles
    .filter((a) => (estados.length === 0 || estados.includes(a.estado) || a.id === feeId) && a.nombre.toLowerCase().includes(q.trim().toLowerCase()))
    .map((a) => ({
      id: a.id, nombre: a.nombre, to: rutaArancel(a.id),
      etiqueta: a.porDefecto ? <Pill tone="info" size="sm">Default</Pill> : undefined,
      estado: { nombre: a.estado, tono: TONO_ARANCEL[a.estado] },
      acciones: accionesArancel(a, (x) => guardar('aranceles', x)),
    })), [aranceles, estados, q, feeId, guardar])

  if (!elegido) return <Navigate to={LISTA_ARANCELES} replace />

  return (
    <div className="px-4 py-6 sm:px-8">
      <SettingsPageHeader
        titulo="Edit Fee Schedule"
        bajada="What the office charges for each procedure, with a version for each date the fees change."
        accion={<Button onClick={() => navigate(\`\${LISTA_ARANCELES}/new\`)}><Plus /> New Fee Schedule</Button>}
      />
      <div className={cn(TARJETA_PANEL, 'mt-5 grid gap-6 p-4 sm:p-5 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start')}>
        <MasterList
          items={items} elegido={feeId} q={q} onQ={setQ} placeholder="Search a Fee Schedule Here..."
          vacio="No fee schedules match the search or filters."
          filtro={(
            <FilterMenu
              label="Filters" align="start"
              groups={[{
                title: 'States', value: estados, onChange: setEstados,
                options: ESTADOS_ARANCEL.map((e) => ({ value: e, count: aranceles.filter((a) => a.estado === e).length, tone: TONO_ARANCEL[e] })),
              }]}
            />
          )}
        />
        <div className="min-w-0">
          <FeeScheduleEditor key={\`\${elegido.id}-\${elegido.versiones.length}\`} arancel={elegido} />
        </div>
      </div>
    </div>
  )
}

export function SettingsNewFeeSchedule() {
  return (
    <div className="px-4 py-6 sm:px-8">
      <SettingsPageHeader titulo="New Fee Schedule" bajada="Set the fee for each procedure. You can copy them from another fee schedule." />
      <div className={cn(TARJETA_PANEL, 'mt-5 p-4 sm:p-5')}>
        <FeeScheduleEditor />
      </div>
    </div>
  )
}
`})))()}export{n,i as r,r as t};