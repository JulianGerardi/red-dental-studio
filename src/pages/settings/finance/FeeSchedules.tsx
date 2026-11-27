import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Archive, ArchiveRestore, Copy, FilePen, GitCompareArrows, Network, Pencil, Plus, Power, ReceiptText, Search, SearchX, SlidersHorizontal, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { BillingHeader } from '@/components/finance/BillingHeader'
import { FieldLabel, SelectField, TextField, control } from '@/components/patients/form'
import { Alert } from '@/components/ui/alert'
import { EmptyState } from '@/components/ui/empty-state'
import { useAvisoSalida } from '@/lib/useAvisoSalida'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import { FilterMenu } from '@/components/ui/filter-menu'
import { Pill } from '@/components/ui/pill'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { aviso } from '@/components/ui/toaster'
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { EncabezadoEditor, GRILLA_LISTA_EDITOR, ItemLista, PanelLista, PieEditor, TARJETA_EDITOR } from '@/components/settings/ListaEditor'
import { AssignmentsDrawer, asignacionesDe, totalAsignaciones } from '@/components/finance/Assignments'
import { CompareFeesDrawer } from '@/components/finance/CompareFeesDrawer'
import { MoneyInput } from '@/components/finance/fields'
import { CopyFormDrawer, IncreaseAllDrawer, aumentar } from '@/components/finance/FeeScheduleTools'
import { ICONO_SUELTO, TABLA_ENCABEZADO, TABLA_FILA, TABLA_MARCO, PADDING_PAGINA } from '@/lib/estilos'
import { useFinanzas } from '@/data/finanzasStore'
import {
  ESTADOS_ARANCEL, PROCEDIMIENTOS, SIN_ASIGNAR, TIPOS_ARANCEL, TONO_ARANCEL, conImporte, dinero, estadoVersion, etiquetaVersion,
  fechaMDA, hoyIso, idNuevo, siguienteVersion, versionVigente, type Arancel, type EstadoArancel, type TipoArancel,
} from '@/data/finanzas'
import { OBLIGATORIO } from '@/lib/validacion'

/* Settings → Billing → Fee Schedules: la lista de lo creado y el editor con sus versiones, como Coverage tables. New Fee
   Schedule es una página sin la lista. Ver settings-billing.md. */

export const LISTA_ARANCELES = '/settings/finance/fee-schedule'
export const rutaArancel = (id: string) => `${LISTA_ARANCELES}/${id}/edit`

const aIso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const deIso = (iso: string) => { const [y, m, d] = iso.split('-').map(Number); return new Date(y!, m! - 1, d!) }
const sinVacios = (n: Record<string, number | null>) => Object.fromEntries(Object.entries(n).filter(([, v]) => v !== null)) as Record<string, number>

/* Textos de Jira: CON-495 / CON-1375 (nombre repetido), CON-1151 (fecha y versión nueva), CON-496 / CON-1276
   (asociaciones), CON-1276 (archivar) y CON-1108 (restaurar). */
const NOMBRE_REPETIDO = 'There is already a fee schedule with this name. Please choose a different name.'
const FECHA_PASADA = 'The available date must be today or a future date.'
const CON_ASOCIACIONES = 'The fee schedule cannot be deactivated when there are active associations. Please remove all associations before continuing.'
const BORRADOR = 'draft'

/* El ⋮ de un fee schedule: Inactive / Active y Archive / Restore. No se desactiva ni se archiva con asociaciones activas
   (CON-496, CON-1276); archivar y restaurar piden confirmación (CON-1276, CON-1108) y Restore lo deja Active. */
type PedidoArancel = { tipo: 'sin-desactivar' | 'sin-archivar' | 'archivar' | 'restaurar'; a: Arancel }
export function useAccionesArancel() {
  const { guardar, planes, aseguradoras } = useFinanzas()
  const [pedido, setPedido] = useState<PedidoArancel | null>(null)
  const asociado = (a: Arancel) => totalAsignaciones(asignacionesDe(a, planes, aseguradoras)) > 0
  const pasar = (a: Arancel, estado: EstadoArancel, texto: string, deshacer = true) => {
    guardar('aranceles', { ...a, estado })
    aviso.ok(`${a.nombre} ${texto}.`, deshacer ? { label: 'Undo', onClick: () => guardar('aranceles', a) } : undefined)
  }

  const items = (a: Arancel) => (
    <>
      {a.estado === 'Active' && (
        <DropdownMenuItem variant="destructive" onSelect={() => (asociado(a) ? setPedido({ tipo: 'sin-desactivar', a }) : pasar(a, 'Inactive', 'is now inactive'))}>
          <Power className="size-4 shrink-0" /> Inactive
        </DropdownMenuItem>
      )}
      {a.estado === 'Inactive' && (
        <DropdownMenuItem onSelect={() => pasar(a, 'Active', 'is now active')}><Power className="size-4 shrink-0" /> Active</DropdownMenuItem>
      )}
      {a.estado === 'Archived'
        ? <DropdownMenuItem onSelect={() => setPedido({ tipo: 'restaurar', a })}><ArchiveRestore className="size-4 shrink-0" /> Restore</DropdownMenuItem>
        : <DropdownMenuItem variant="destructive" onSelect={() => setPedido({ tipo: asociado(a) ? 'sin-archivar' : 'archivar', a })}><Archive className="size-4 shrink-0" /> Archive</DropdownMenuItem>}
    </>
  )

  const cerrar = () => setPedido(null)
  const dialogo = pedido && (
    pedido.tipo === 'sin-desactivar' || pedido.tipo === 'sin-archivar' ? (
      <ConfirmDialog
        title={pedido.tipo === 'sin-desactivar' ? 'Unable to deactivate fee schedule' : 'Unable to archive fee schedule'}
        tone="primary" icon="warning" confirmLabel="Close" hideCancel onCancel={cerrar} onConfirm={cerrar}
      >
        {CON_ASOCIACIONES}
      </ConfirmDialog>
    ) : pedido.tipo === 'archivar' ? (
      <ConfirmDialog
        title="Archive fee schedule?" tone="danger" confirmLabel="Archive" onCancel={cerrar}
        onConfirm={() => { cerrar(); pasar(pedido.a, 'Archived', 'was archived', false) }}
      >
        Are you sure you want to archive this fee schedule? This action cannot be undone.
      </ConfirmDialog>
    ) : (
      <ConfirmDialog
        title="Restore fee schedule?" tone="primary" confirmLabel="Restore" onCancel={cerrar}
        onConfirm={() => { cerrar(); pasar(pedido.a, 'Active', 'was restored', false) }}
      >
        Are you sure you want to restore this Fee Schedule?
      </ConfirmDialog>
    )
  )
  return { items, dialogo }
}

/* El editor de la derecha (y, sin `arancel`, la página New Fee Schedule), con las versiones de la guía de Fee Schedules
   (settings-billing.md, 2026-11-27):
   - Active: la que rige hoy; no se edita (CON-495, CON-1369). Update fees abre el Draft con sus precios.
   - Draft: uno por fee schedule; no afecta a la clínica. Save draft lo guarda; Publish lo convierte en versión desde
     Available from (hoy o después), con la confirmación de CON-1151. Discard draft lo descarta.
   - Scheduled: publicada con fecha futura; se cambian precios y fecha en el lugar, sin versión nueva (CON-1375).
   - Expired: reemplazada; sólo lectura para auditoría (CON-1369).
   Archivado, todo en sólo lectura (CON-1276). Name y Type son del fee schedule y se guardan desde cualquier versión. */
export function FeeScheduleEditor({ arancel }: { arancel?: Arancel }) {
  const navigate = useNavigate()
  const { aranceles, planes, aseguradoras, guardar } = useFinanzas()
  const hoy = hoyIso()
  const vigente = arancel ? versionVigente(arancel) : undefined
  const [vista, setVista] = useState<string>(vigente?.id ?? BORRADOR)
  const enBorrador = !arancel || vista === BORRADOR
  const version = enBorrador ? undefined : arancel.versiones.find((v) => v.id === vista)
  const estadoV = arancel && version ? estadoVersion(arancel, version, hoy) : undefined
  const archivado = arancel?.estado === 'Archived'
  const editaPrecios = !archivado && (enBorrador || estadoV === 'Scheduled')

  /* Lo guardado de la versión que se ve: el Draft parte de la activa. */
  const base = enBorrador ? (arancel?.borrador?.precios ?? vigente?.precios ?? {}) : (version?.precios ?? {})
  const desdeBase = enBorrador ? (arancel?.borrador?.desde ?? hoy) : (version?.desde ?? hoy)
  /* La columna Current fee: en el Draft, lo que rige hoy; en una Scheduled, lo que ya tiene guardado (CON-1375). */
  const referencia = enBorrador ? vigente?.precios : version?.precios

  const [nombre, setNombre] = useState(arancel?.nombre ?? '')
  const [tipo, setTipo] = useState<TipoArancel | ''>(arancel?.tipo ?? '')
  const [renombrando, setRenombrando] = useState(!arancel)
  const [nuevos, setNuevos] = useState<Record<string, number | null>>(() => ({ ...base }))
  const [desde, setDesde] = useState<Date | null>(() => deIso(desdeBase))
  const [q, setQ] = useState('')
  const [herramienta, setHerramienta] = useState<'copiar' | 'aumentar' | null>(null)
  const [intentado, setIntentado] = useState(false)
  const [pregunta, setPregunta] = useState<'publicar' | 'futura' | 'descartar' | { vista: string } | null>(null)

  const precios = sinVacios(nuevos)
  const preciosCambiados = editaPrecios && JSON.stringify(precios) !== JSON.stringify(base)
  const fechaCambiada = editaPrecios && !!arancel && !!desde && aIso(desde) !== desdeBase
  const datosCambiados = !!arancel && (nombre.trim() !== arancel.nombre || tipo !== arancel.tipo)
  const cambiado = !arancel || preciosCambiados || fechaCambiada || datosCambiados
  const repetido = !!nombre.trim() && aranceles.some((a) => a.id !== arancel?.id && a.nombre.toLowerCase() === nombre.trim().toLowerCase())
  const faltaNombre = intentado && !nombre.trim() ? OBLIGATORIO : repetido ? NOMBRE_REPETIDO : undefined
  const faltaTipo = intentado && !tipo ? OBLIGATORIO : undefined
  const errorFecha = intentado && editaPrecios ? (!desde ? OBLIGATORIO : aIso(desde) < hoy ? FECHA_PASADA : undefined) : undefined
  const incompleto = intentado && (!nombre.trim() || !tipo || (editaPrecios && !desde))
  /* Con cambios sin guardar, irse (otro fee schedule de la lista, el breadcrumb, Cancel) pregunta antes, como red.dev. */
  const salida = useAvisoSalida(!!arancel && cambiado)

  const cargar = (v: string, p: Record<string, number>, d: string) => {
    setVista(v); setNuevos({ ...p }); setDesde(deIso(d)); setIntentado(false)
  }
  const verVista = (v: string) => {
    if (!arancel) return
    if (v === BORRADOR) return cargar(BORRADOR, arancel.borrador?.precios ?? vigente!.precios, arancel.borrador?.desde ?? hoy)
    const x = arancel.versiones.find((y) => y.id === v)
    if (x) cargar(x.id, x.precios, x.desde)
  }
  /* Cambiar de versión con precios sin guardar pregunta, como las pestañas de una Location. */
  const pedirVista = (v: string) => (preciosCambiados || fechaCambiada ? setPregunta({ vista: v }) : verVista(v))

  const datosMal = () => !nombre.trim() || !tipo || repetido
  const fechaMal = () => !desde || aIso(desde) < hoy

  /* Update fees: abre el Draft (o el que ya había) con los precios de la activa; la clínica sigue con la activa. */
  const abrirBorrador = () => {
    if (!arancel || !vigente) return
    if (arancel.borrador) return cargar(BORRADOR, arancel.borrador.precios, arancel.borrador.desde)
    const b = { precios: { ...vigente.precios }, desde: hoy }
    guardar('aranceles', { ...arancel, borrador: b })
    cargar(BORRADOR, b.precios, b.desde)
    aviso.info('A draft was opened with the active fees. The clinic keeps using the active version until you publish it.')
  }
  const guardarBorrador = () => {
    if (!arancel || datosMal() || !desde) { setIntentado(true); return }
    guardar('aranceles', { ...arancel, nombre: nombre.trim(), tipo: tipo as TipoArancel, borrador: { precios, desde: aIso(desde) }, actualizado: hoy })
    cargar(BORRADOR, precios, aIso(desde))
    setRenombrando(false)
    aviso.ok('The draft was saved. The clinic keeps using the active version.')
  }
  const publicar = () => {
    if (datosMal() || fechaMal()) { setIntentado(true); return }
    if (arancel) { setPregunta('publicar'); return }
    const dia = aIso(desde!)
    const nuevo: Arancel = {
      id: idNuevo(nombre, aranceles.map((a) => a.id)), nombre: nombre.trim(), tipo: tipo as TipoArancel, porDefecto: false, estado: 'Active',
      versiones: [{ id: `v-${Date.now().toString(36)}`, desde: dia, precios }], actualizado: hoy, asignados: SIN_ASIGNAR,
    }
    guardar('aranceles', nuevo)
    aviso.ok(`${nuevo.nombre} was created. Its fees apply from ${fechaMDA(dia)}.`)
    navigate(rutaArancel(nuevo.id))
  }
  const confirmarPublicar = () => {
    if (!arancel || !desde) return
    const dia = aIso(desde)
    /* Si ya hay una versión que empieza ese día, la reemplaza. */
    const mismoDia = arancel.versiones.find((v) => v.desde === dia)
    const nueva = mismoDia ? { ...mismoDia, precios } : { id: `v-${Date.now().toString(36)}`, desde: dia, precios }
    const versiones = mismoDia ? arancel.versiones.map((v) => (v.id === mismoDia.id ? nueva : v)) : [...arancel.versiones, nueva]
    guardar('aranceles', { ...arancel, nombre: nombre.trim(), tipo: tipo as TipoArancel, versiones, borrador: undefined, actualizado: hoy })
    cargar(nueva.id, precios, dia)
    setRenombrando(false)
    aviso.ok(`The Fee Schedule has been updated successfully. A new version has been created, effective from ${fechaMDA(dia)}.`)
  }
  const guardarFutura = () => {
    if (datosMal() || fechaMal()) { setIntentado(true); return }
    /* Con asociaciones, CON-495 pide confirmar antes de guardar. */
    if (arancel && totalAsignaciones(asignacionesDe(arancel, planes, aseguradoras)) > 0) { setPregunta('futura'); return }
    aplicarFutura()
  }
  const aplicarFutura = () => {
    if (!arancel || !version || !desde) return
    const dia = aIso(desde)
    const versiones = arancel.versiones.map((v) => (v.id === version.id ? { ...v, desde: dia, precios } : v))
    guardar('aranceles', { ...arancel, nombre: nombre.trim(), tipo: tipo as TipoArancel, versiones, actualizado: hoy })
    cargar(version.id, precios, dia)
    setRenombrando(false)
    aviso.ok(`${nombre.trim()} was saved. These fees apply from ${fechaMDA(dia)}.`)
  }
  const guardarDatos = () => {
    if (!arancel || datosMal()) { setIntentado(true); return }
    guardar('aranceles', { ...arancel, nombre: nombre.trim(), tipo: tipo as TipoArancel, actualizado: hoy })
    setIntentado(false)
    setRenombrando(false)
    aviso.ok(`${nombre.trim()} was saved.`)
  }
  const descartar = () => {
    if (!arancel || !vigente) return
    guardar('aranceles', { ...arancel, borrador: undefined })
    cargar(vigente.id, vigente.precios, vigente.desde)
    aviso.ok('The draft was discarded. Nothing changed for the clinic.')
  }

  const opcionesVersion = arancel ? [
    ...(arancel.borrador || enBorrador ? ['Draft'] : []),
    ...[...arancel.versiones].sort((x, y) => y.desde.localeCompare(x.desde)).map((v) => etiquetaVersion(arancel, v, hoy)),
  ] : []
  const elegirOpcion = (o: string) => {
    if (!arancel) return
    if (o === 'Draft') return pedirVista(BORRADOR)
    const v = arancel.versiones.find((x) => etiquetaVersion(arancel, x, hoy) === o)
    if (v) pedirVista(v.id)
  }

  /* Qué es la versión que se ve, en una línea, con lo que se puede hacer (la tabla de estados de la guía). */
  const siguiente = arancel && version && estadoV === 'Expired' ? siguienteVersion(arancel, version) : undefined
  const aviso_ = archivado
    ? { tono: 'warning' as const, titulo: 'This fee schedule is archived', texto: 'It’s read only and can’t be assigned. Restore it from the list to use it again.' }
    : !arancel ? undefined
    : enBorrador ? { tono: 'warning' as const, titulo: 'Draft', texto: 'Only you see these fees. The clinic keeps using the active version until you publish this draft.' }
    : estadoV === 'Scheduled' ? { tono: 'info' as const, titulo: `Scheduled for ${fechaMDA(version!.desde)}`, texto: 'Not in use yet. You can still change its fees and date; the active version applies until then.' }
    : estadoV === 'Expired' ? { tono: 'info' as const, titulo: 'Expired version', texto: `Replaced${siguiente ? ` on ${fechaMDA(siguiente.desde)}` : ''}. It’s read only, so past claims and ledger entries keep these fees.` }
    : { tono: 'success' as const, titulo: 'Active version', texto: 'The fees the clinic uses today. To change them, update fees: a draft opens and nothing changes until you publish it.' }

  const campoTipo = (
    <SelectField label="Type" required placeholder="Select a type" options={[...TIPOS_ARANCEL]} value={tipo} onChange={(v) => setTipo(v as TipoArancel)} error={faltaTipo} disabled={archivado} />
  )
  const conReferencia = editaPrecios && !!arancel
  /* Sin casillas y con New fee como texto que se edita al tocarlo, como red.dev (settings-billing.md, 2026-11-25). */
  const columnas = cn('grid items-center gap-3', conReferencia ? 'grid-cols-[64px_1fr_96px_120px]' : 'grid-cols-[64px_1fr_120px]')
  const filas = PROCEDIMIENTOS.filter((p) => `${p.code} ${p.label}`.toLowerCase().includes(q.trim().toLowerCase()))

  const pie = archivado ? null
    : enBorrador ? (
      <PieEditor
        izquierda={arancel && <Button variant="ghost" onClick={() => setPregunta('descartar')}><Trash2 /> Discard draft</Button>}
        onCancelar={() => salida.ir(LISTA_ARANCELES)} onGuardar={publicar} etiquetaGuardar="Publish"
        secundario={arancel && <Button variant="secondary" className="px-6" onClick={guardarBorrador}>Save draft</Button>}
      />
    )
    : estadoV === 'Scheduled'
      ? <PieEditor onCancelar={() => salida.ir(LISTA_ARANCELES)} onGuardar={guardarFutura} etiquetaGuardar="Save changes" guardarDeshabilitado={!cambiado} />
      : <PieEditor onCancelar={() => salida.ir(LISTA_ARANCELES)} onGuardar={guardarDatos} guardarDeshabilitado={!datosCambiados} />

  /* Misma card, encabezado y pie que el editor de Coverage tables (settings-billing.md, 2026-11-26). */
  return (
    <section aria-label={arancel ? 'Edit fee schedule' : 'New fee schedule'} className={TARJETA_EDITOR}>
      {arancel && (
        <EncabezadoEditor
          titulo="Edit fee schedule" estado={{ nombre: arancel.estado, tono: TONO_ARANCEL[arancel.estado] }}
          extra={arancel.porDefecto && <Pill tone="info" size="sm">Default</Pill>}
        />
      )}
      {incompleto && (
        <Alert tone="danger" title="Uncompleted fields">All required fields marked with (*) must be completed before proceeding</Alert>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-start gap-2">
          <TextField
            label="Fee schedule name" required placeholder="Enter a fee schedule name" value={nombre} onChange={setNombre}
            disabled={!renombrando || archivado} error={faltaNombre} className="min-w-0 flex-1"
          />
          {arancel && !archivado && (
            <button type="button" aria-label="Rename fee schedule" aria-pressed={renombrando} onClick={() => setRenombrando((r) => !r)} className={cn(ICONO_SUELTO, 'mt-[26px] size-9', renombrando && 'bg-info-bg text-dash-blue')}>
              <Pencil className="size-4" />
            </button>
          )}
        </div>
        {campoTipo}
        {arancel && (
          <SelectField label="Fee schedule version" options={opcionesVersion} value={enBorrador ? 'Draft' : version ? etiquetaVersion(arancel, version, hoy) : ''} onChange={elegirOpcion} />
        )}
        <div className="flex flex-col gap-2">
          <FieldLabel required={editaPrecios}>Available from</FieldLabel>
          {editaPrecios
            ? <DatePicker value={desde} onChange={setDesde} className="h-9 w-full" error={!!errorFecha} />
            : <span className={cn(control(), 'flex h-9 items-center bg-surface-muted text-ink-muted tabular-nums')} aria-label="Available from">{fechaMDA(desdeBase)}</span>}
          {errorFecha && <span className="-mt-1 text-[11px] text-field-error">{errorFecha}</span>}
        </div>
      </div>

      {aviso_ && <Alert tone={aviso_.tono} title={aviso_.titulo}>{aviso_.texto}</Alert>}

      {/* Buscador y Non-zero fees a la izquierda; las acciones de la tabla justo encima, a la derecha, como Coverage. */}
      <div className="-mb-2 flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="relative block w-full sm:max-w-[320px]">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
          <input aria-label="Search procedure" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search procedures" className={cn(control(), 'h-9 pr-3 pl-9')} />
        </span>
        <span className="text-[13px] text-ink-muted tabular-nums" title="Procedures whose fee is more than $0.00">
          Non-zero fees — <span className="font-semibold text-ink">{conImporte(nuevos)} / {PROCEDIMIENTOS.length}</span>
        </span>
        <div className="flex flex-wrap gap-2 sm:ml-auto">
          {editaPrecios ? (
            <>
              <Button variant="secondary" onClick={() => setHerramienta('copiar')}><Copy /> Copy form</Button>
              <Button variant="secondary" onClick={() => setHerramienta('aumentar')}><SlidersHorizontal /> Bulk edit</Button>
            </>
          ) : estadoV === 'Active' && !archivado && (
            <Button onClick={abrirBorrador}><FilePen /> {arancel?.borrador ? 'Open draft' : 'Update fees'}</Button>
          )}
        </div>
      </div>

      {/* La tabla scrollea adentro con el encabezado fijo, así Cancel y Save quedan a la vista (red.dev). */}
      <div role="table" aria-label="Fees" className={cn(TABLA_MARCO, 'flex flex-col overflow-hidden')}>
        <div role="row" className={cn(columnas, TABLA_ENCABEZADO, 'shrink-0')}>
          <span role="columnheader">Code</span><span role="columnheader">Description</span>
          {conReferencia && <span role="columnheader" className="text-right">Current fee</span>}
          <span role="columnheader" className="text-right">{editaPrecios ? 'New fee' : 'Fee'}</span>
        </div>
        <div role="rowgroup" className="max-h-[min(480px,60vh)] overflow-y-auto">
        {filas.map((p) => {
          const actual = referencia?.[p.code]
          const cambio = conReferencia && (nuevos[p.code] ?? null) !== (actual ?? null)
          return (
            <div key={p.code} role="row" className={cn(columnas, TABLA_FILA)}>
              <span role="cell" className="tabular-nums">{p.code}</span>
              <span role="cell" className="min-w-0">{p.label}</span>
              {conReferencia && <span role="cell" className="text-right tabular-nums">{actual !== undefined ? dinero(actual) : '—'}</span>}
              <span role="cell" className={cn(!editaPrecios && 'text-right tabular-nums')}>
                {editaPrecios
                  ? <MoneyInput label={`${p.code} new fee`} value={nuevos[p.code] ?? null} onChange={(v) => setNuevos((n) => ({ ...n, [p.code]: v }))} comoTexto className={cn(cambio && 'font-semibold text-dash-blue')} />
                  : nuevos[p.code] !== undefined && nuevos[p.code] !== null ? dinero(nuevos[p.code]!) : '—'}
              </span>
            </div>
          )
        })}
        {filas.length === 0 && (
          <EmptyState icon={SearchX} title="No procedures available" detail="No procedures match your current filters or may not be available at this time." className="border-t border-line-row" />
        )}
        </div>
      </div>

      {pie}

      {salida.dialogo}

      {pregunta === 'publicar' && (
        <ConfirmDialog
          title="Create a new version?" confirmLabel="Confirm" onCancel={() => setPregunta(null)}
          onConfirm={() => { setPregunta(null); confirmarPublicar() }}
        >
          Are you sure you want to create a new version of the Fee Schedule? Once created, previous versions will remain locked and cannot be modified.
        </ConfirmDialog>
      )}
      {pregunta === 'futura' && (
        <ConfirmDialog
          title="Save changes?" confirmLabel="Save changes" onCancel={() => setPregunta(null)}
          onConfirm={() => { setPregunta(null); aplicarFutura() }}
        >
          Are you sure you want to record the changes? Changing a fee schedule does not affect procedures that have already been posted or sent to the insurance carrier.
        </ConfirmDialog>
      )}
      {pregunta === 'descartar' && (
        <ConfirmDialog
          title="Discard draft?" tone="danger" icon="delete" confirmLabel="Discard draft" onCancel={() => setPregunta(null)}
          onConfirm={() => { setPregunta(null); descartar() }}
        >
          The draft fees will be lost. The active version doesn’t change.
        </ConfirmDialog>
      )}
      {pregunta && typeof pregunta === 'object' && (
        <ConfirmDialog
          title="Discard unsaved changes?" tone="danger" confirmLabel="Discard changes" cancelLabel="Keep editing"
          onCancel={() => setPregunta(null)} onConfirm={() => { const v = pregunta.vista; setPregunta(null); verVista(v) }}
        >
          The fees you changed in this version haven’t been saved.
        </ConfirmDialog>
      )}

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
  const { aranceles, planes, aseguradoras } = useFinanzas()
  const [q, setQ] = useState('')
  /* Sin filtro al entrar, como todas las listas: se ven todos, cada uno con su estado (settings-billing.md, 2026-11-25). */
  const [estados, setEstados] = useState<string[]>([])
  const acciones = useAccionesArancel()
  const [drawer, setDrawer] = useState<{ tipo: 'asignaciones' | 'comparar'; a: Arancel } | null>(null)
  const elegido = aranceles.find((a) => a.id === feeId)

  const visibles = aranceles.filter((a) => (estados.length === 0 || estados.includes(a.estado) || a.id === feeId) && a.nombre.toLowerCase().includes(q.trim().toLowerCase()))

  /* Un fee schedule que ya no está (un link viejo): la lista sin elegido. */
  if (feeId && !elegido) return <Navigate to={LISTA_ARANCELES} replace />

  return (
    <div className={cn('@container', PADDING_PAGINA)}>
      <BillingHeader accion={<Button size="md" onClick={() => navigate(`${LISTA_ARANCELES}/new`)}><Plus /> New fee schedule</Button>} />
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
                  {acciones.items(a)}
                </>
              )}
            />
          ))}
        </PanelLista>
        {elegido
          ? <FeeScheduleEditor key={elegido.id} arancel={elegido} />
          : (
            <div className={TARJETA_EDITOR}>
              <EmptyState icon={ReceiptText} title="No fee schedule selected" detail="Select a fee schedule from the list on the left or create one with New fee schedule." className="py-16" />
            </div>
          )}
      </div>

      {acciones.dialogo}
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
