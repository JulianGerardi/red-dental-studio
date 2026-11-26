import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Archive, ArchiveRestore, Copy, GitCompareArrows, Network, Pencil, Plus, Power, ReceiptText, Search, SearchX, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { FieldLabel, SelectField, TextField, control } from '@/components/patients/form'
import { Alert } from '@/components/ui/alert'
import { EmptyState } from '@/components/ui/empty-state'
import { useAvisoSalida } from '@/lib/useAvisoSalida'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import { FilterMenu } from '@/components/ui/filter-menu'
import { Pill } from '@/components/ui/pill'
import { Switch } from '@/components/ui/switch'
import { aviso } from '@/components/ui/toaster'
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { EncabezadoEditor, GRILLA_LISTA_EDITOR, ItemLista, PanelLista, PieEditor, TARJETA_EDITOR } from '@/components/settings/ListaEditor'
import { AssignmentsDrawer, asignacionesDe } from '@/components/finance/Assignments'
import { CompareFeesDrawer } from '@/components/finance/CompareFeesDrawer'
import { MoneyInput } from '@/components/finance/fields'
import { CopyFormDrawer, IncreaseAllDrawer, aumentar } from '@/components/finance/FeeScheduleTools'
import { ICONO_SUELTO, TABLA_ENCABEZADO, TABLA_FILA, TABLA_MARCO, PADDING_PAGINA } from '@/lib/estilos'
import { useFinanzas } from '@/data/finanzasStore'
import {
  ESTADOS_ARANCEL, PROCEDIMIENTOS, SIN_ASIGNAR, TIPOS_ARANCEL, TONO_ARANCEL, conImporte, dinero, etiquetaVersion, fechaMDA,
  hoyIso, idNuevo, versionVigente, type Arancel, type EstadoArancel, type TipoArancel,
} from '@/data/finanzas'
import { OBLIGATORIO } from '@/lib/validacion'

/* Settings → Billing → Fee Schedules: la lista de lo creado y el editor con sus versiones, como Coverage tables. New Fee
   Schedule es una página sin la lista. Ver settings-billing.md. */

export const LISTA_ARANCELES = '/settings/finance/fee-schedule'
export const rutaArancel = (id: string) => `${LISTA_ARANCELES}/${id}/edit`

const aIso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

/* Inactive / Active y Archive / Restore, con Undo. */
export function accionesArancel(a: Arancel, guardar: (a: Arancel) => void) {
  const pasar = (estado: EstadoArancel, texto: string) => {
    guardar({ ...a, estado })
    aviso.ok(`${a.nombre} ${texto}.`, { label: 'Undo', onClick: () => guardar(a) })
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

/* El editor de la derecha (y, sin `arancel`, la página New Fee Schedule). New Fee empieza igual a la versión elegida;
   guardar con precios distintos crea una versión desde Available From (o pisa la que empieza ese mismo día). */
export function FeeScheduleEditor({ arancel, onGuardado }: { arancel?: Arancel; onGuardado?: (a: Arancel) => void }) {
  const navigate = useNavigate()
  const { aranceles, guardar } = useFinanzas()
  const vigente = arancel ? versionVigente(arancel) : undefined
  const [versionId, setVersionId] = useState(vigente?.id ?? '')
  const version = arancel?.versiones.find((v) => v.id === versionId) ?? vigente
  const [nombre, setNombre] = useState(arancel?.nombre ?? '')
  const [tipo, setTipo] = useState<TipoArancel | ''>(arancel?.tipo ?? '')
  const [renombrando, setRenombrando] = useState(!arancel)
  const [borrador, setBorrador] = useState(arancel ? arancel.estado === 'Inactive' : false)
  const [desde, setDesde] = useState<Date | null>(new Date())
  const [nuevos, setNuevos] = useState<Record<string, number | null>>(() => ({ ...(version?.precios ?? {}) }))
  const [q, setQ] = useState('')
  const [herramienta, setHerramienta] = useState<'copiar' | 'aumentar' | null>(null)
  const [intentado, setIntentado] = useState(false)

  const filas = PROCEDIMIENTOS.filter((p) => `${p.code} ${p.label}`.toLowerCase().includes(q.trim().toLowerCase()))
  const precios = Object.fromEntries(Object.entries(nuevos).filter(([, v]) => v !== null)) as Record<string, number>
  const preciosCambiados = JSON.stringify(precios) !== JSON.stringify(version?.precios ?? {})
  const cambiado = !arancel || preciosCambiados || nombre.trim() !== arancel.nombre || tipo !== arancel.tipo || borrador !== (arancel.estado === 'Inactive')
  const faltaNombre = intentado && !nombre.trim() ? OBLIGATORIO : undefined
  const faltaTipo = intentado && !tipo ? OBLIGATORIO : undefined
  const faltaFecha = intentado && arancel && preciosCambiados && !desde ? OBLIGATORIO : undefined
  const repetido = !!nombre.trim() && aranceles.some((a) => a.id !== arancel?.id && a.nombre.toLowerCase() === nombre.trim().toLowerCase())
  /* Con cambios sin guardar, irse (otro fee schedule de la lista, el breadcrumb, Cancel) pregunta antes, como red.dev. */
  const salida = useAvisoSalida(!!arancel && cambiado)

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
        versiones: [{ id: `v-${Date.now().toString(36)}`, desde: aIso(new Date()), precios }], actualizado: hoyIso(), asignados: SIN_ASIGNAR,
      }
      guardar('aranceles', nuevo)
      aviso.ok(`${nuevo.nombre} was created.`)
      navigate(rutaArancel(nuevo.id))
      return
    }
    let versiones = arancel.versiones
    if (preciosCambiados && desde) {
      const dia = aIso(desde)
      const mismoDia = versiones.find((v) => v.desde === dia)
      versiones = mismoDia
        ? versiones.map((v) => (v.id === mismoDia.id ? { ...v, precios } : v))
        : [...versiones, { id: `v-${Date.now().toString(36)}`, desde: dia, precios }]
    }
    const actualizado = { ...arancel, nombre: nombre.trim(), tipo, estado, versiones, actualizado: hoyIso() }
    guardar('aranceles', actualizado)
    setIntentado(false)
    setRenombrando(false)
    aviso.ok(preciosCambiados && desde ? `${actualizado.nombre} was saved. The new fees apply from ${fechaMDA(aIso(desde))}.` : `${actualizado.nombre} was saved.`)
    onGuardado?.(actualizado)
  }

  const campoTipo = (
    <SelectField label="Type" required placeholder="Select a type" options={[...TIPOS_ARANCEL]} value={tipo} onChange={(v) => setTipo(v as TipoArancel)} error={faltaTipo} />
  )
  /* Sin casillas y con New fee como texto que se edita al tocarlo, como red.dev (settings-billing.md, 2026-11-25). */
  const columnas = cn('grid items-center gap-3', arancel ? 'grid-cols-[64px_1fr_96px_120px]' : 'grid-cols-[64px_1fr_120px]')

  /* Misma card, encabezado y pie que el editor de Coverage tables (settings-billing.md, 2026-11-26). */
  return (
    <section aria-label={arancel ? 'Edit fee schedule' : 'New fee schedule'} className={TARJETA_EDITOR}>
      {arancel && (
        <EncabezadoEditor
          titulo="Edit fee schedule" estado={{ nombre: arancel.estado, tono: TONO_ARANCEL[arancel.estado] }}
          extra={arancel.porDefecto && <Pill tone="info" size="sm">Default</Pill>}
        />
      )}
      {intentado && (!nombre.trim() || !tipo || faltaFecha) && (
        <Alert tone="danger" title="Uncompleted fields">All required fields marked with (*) must be completed before proceeding</Alert>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-start gap-2">
          <TextField
            label="Fee schedule name" required placeholder="Enter a fee schedule name" value={nombre} onChange={setNombre}
            disabled={!renombrando} error={faltaNombre ?? (repetido ? 'Another fee schedule has this name.' : undefined)} className="min-w-0 flex-1"
          />
          {arancel && (
            <button type="button" aria-label="Rename fee schedule" aria-pressed={renombrando} onClick={() => setRenombrando((r) => !r)} className={cn(ICONO_SUELTO, 'mt-[26px] size-9', renombrando && 'bg-info-bg text-dash-blue')}>
              <Pencil className="size-4" />
            </button>
          )}
        </div>
        {arancel && version && (
          <SelectField label="Fee schedule version" options={arancel.versiones.map((v) => etiquetaVersion(arancel, v))} value={etiquetaVersion(arancel, version)} onChange={elegirVersion} />
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
            <FieldLabel required>Available from</FieldLabel>
            <DatePicker value={desde} onChange={setDesde} className="h-9 w-full" error={!!faltaFecha} />
            {faltaFecha && <span className="-mt-1 text-[11px] text-field-error">{faltaFecha}</span>}
          </div>
        )}
        {arancel && campoTipo}
      </div>

      {/* Buscador y Non-zero fees a la izquierda; las acciones de la tabla justo encima, a la derecha, como Coverage. */}
      <div className="-mb-2 flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="relative block w-full sm:max-w-[320px]">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
          <input aria-label="Search procedure" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search procedures" className={cn(control(), 'h-9 pr-3 pl-9')} />
        </span>
        <span className="text-[13px] text-ink-muted tabular-nums" title="Procedures whose new fee is more than $0.00">
          Non-zero fees — <span className="font-semibold text-ink">{conImporte(nuevos)} / {PROCEDIMIENTOS.length}</span>
        </span>
        <div className="flex flex-wrap gap-2 sm:ml-auto">
          <Button variant="secondary" onClick={() => setHerramienta('copiar')}><Copy /> Copy form</Button>
          <Button variant="secondary" onClick={() => setHerramienta('aumentar')}><SlidersHorizontal /> Bulk edit</Button>
        </div>
      </div>

      {/* La tabla scrollea adentro con el encabezado fijo, así Cancel y Save quedan a la vista (red.dev). */}
      <div role="table" aria-label="Fees" className={cn(TABLA_MARCO, 'flex flex-col overflow-hidden')}>
        <div role="row" className={cn(columnas, TABLA_ENCABEZADO, 'shrink-0')}>
          <span role="columnheader">Code</span><span role="columnheader">Description</span>
          {arancel && <span role="columnheader" className="text-right">Current fee</span>}
          <span role="columnheader" className="text-right">New fee</span>
        </div>
        <div role="rowgroup" className="max-h-[min(480px,60vh)] overflow-y-auto">
        {filas.map((p) => {
          const actual = version?.precios[p.code]
          const cambio = !!arancel && (nuevos[p.code] ?? null) !== (actual ?? null)
          return (
            <div key={p.code} role="row" className={cn(columnas, TABLA_FILA)}>
              <span role="cell" className="tabular-nums">{p.code}</span>
              <span role="cell" className="min-w-0">{p.label}</span>
              {arancel && <span role="cell" className="text-right tabular-nums">{actual !== undefined ? dinero(actual) : '—'}</span>}
              <span role="cell"><MoneyInput label={`${p.code} new fee`} value={nuevos[p.code] ?? null} onChange={(v) => setNuevos((n) => ({ ...n, [p.code]: v }))} comoTexto className={cn(cambio && 'font-semibold text-dash-blue')} /></span>
            </div>
          )
        })}
        {filas.length === 0 && (
          <EmptyState icon={SearchX} title="No procedures available" detail="No procedures match your current filters or may not be available at this time." className="border-t border-line-row" />
        )}
        </div>
      </div>

      <PieEditor onCancelar={() => salida.ir(LISTA_ARANCELES)} onGuardar={guardarTodo} guardarDeshabilitado={!cambiado} />

      {salida.dialogo}

      {herramienta === 'copiar' && (
        <CopyFormDrawer
          opciones={aranceles.filter((a) => a.id !== arancel?.id && a.estado === 'Active').map((a) => a.nombre)}
          onClose={() => setHerramienta(null)}
          onCopiar={(n) => {
            const origen = aranceles.find((a) => a.nombre === n)
            if (!origen) return
            setNuevos({ ...versionVigente(origen).precios })
            aviso.info(`New fees copied from ${n}. Save to keep them.`)
          }}
        />
      )}
      {herramienta === 'aumentar' && (
        <IncreaseAllDrawer
          seleccionados={0}
          onClose={() => setHerramienta(null)}
          onAplicar={(a) => {
            const codigos = PROCEDIMIENTOS.map((p) => p.code)
            setNuevos((n) => ({ ...n, ...Object.fromEntries(codigos.map((c) => [c, aumentar(n[c] ?? 0, a)])) }))
            aviso.info('New fees were updated. Save to keep them.')
          }}
        />
      )}
    </section>
  )
}

/* Fee schedules como Coverage tables: lo creado a la izquierda y el elegido en el editor; al entrar, sin elegido. La tabla
   de antes se fue por redundante (Julián, 2026-11-26): View assignments y Compare fees pasan al ⋮ de cada ítem. */
export function SettingsFeeSchedules() {
  const { feeId } = useParams()
  const navigate = useNavigate()
  const { aranceles, planes, aseguradoras, guardar } = useFinanzas()
  const [q, setQ] = useState('')
  /* Sin filtro al entrar, como todas las listas: se ven todos, cada uno con su estado (settings-billing.md, 2026-11-25). */
  const [estados, setEstados] = useState<string[]>([])
  const [drawer, setDrawer] = useState<{ tipo: 'asignaciones' | 'comparar'; a: Arancel } | null>(null)
  const elegido = aranceles.find((a) => a.id === feeId)

  const visibles = aranceles.filter((a) => (estados.length === 0 || estados.includes(a.estado) || a.id === feeId) && a.nombre.toLowerCase().includes(q.trim().toLowerCase()))

  /* Un fee schedule que ya no está (un link viejo): la lista sin elegido. */
  if (feeId && !elegido) return <Navigate to={LISTA_ARANCELES} replace />

  return (
    <div className={cn('@container', PADDING_PAGINA)}>
      <SettingsPageHeader
        titulo="Fee schedules"
        accion={<Button size="md" onClick={() => navigate(`${LISTA_ARANCELES}/new`)}><Plus /> New fee schedule</Button>}
      />
      <div className={GRILLA_LISTA_EDITOR}>
        <PanelLista
          titulo="Fee schedules" q={q} onQ={setQ} placeholder="Search fee schedules" vacio={visibles.length === 0}
          filtro={(
            <FilterMenu
              label="Filters" size="sm" align="end"
              groups={[{
                title: 'States', value: estados, onChange: setEstados,
                options: ESTADOS_ARANCEL.map((e) => ({ value: e, count: aranceles.filter((a) => a.estado === e).length })),
              }]}
            />
          )}
        >
          {visibles.map((a) => (
            <ItemLista
              key={a.id} nombre={a.nombre} activo={a.estado === 'Active'} estado={{ nombre: a.estado, tono: TONO_ARANCEL[a.estado] }}
              elegido={a.id === feeId} to={rutaArancel(a.id)}
              extra={a.porDefecto && <Pill tone="info" size="sm">Default</Pill>}
              acciones={(
                <>
                  <DropdownMenuItem onSelect={() => setDrawer({ tipo: 'asignaciones', a })}><Network className="size-4 shrink-0" /> View assignments</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setDrawer({ tipo: 'comparar', a })}><GitCompareArrows className="size-4 shrink-0" /> Compare fees</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {accionesArancel(a, (x) => guardar('aranceles', x))}
                </>
              )}
            />
          ))}
        </PanelLista>
        {elegido
          ? <FeeScheduleEditor key={`${elegido.id}-${elegido.versiones.length}`} arancel={elegido} />
          : (
            <div className={TARJETA_EDITOR}>
              <EmptyState icon={ReceiptText} title="No fee schedule selected" detail="Select a fee schedule from the list on the left or create one with New fee schedule." className="py-16" />
            </div>
          )}
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

export function SettingsNewFeeSchedule() {
  return (
    <div className={PADDING_PAGINA}>
      <SettingsPageHeader titulo="New fee schedule" />
      <div className="mt-5"><FeeScheduleEditor /></div>
    </div>
  )
}
