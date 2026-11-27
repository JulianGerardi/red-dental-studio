import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Archive, ArchiveRestore, ChevronDown, Copy, GitCompareArrows, Plus, Power, ReceiptText, Search, SearchX, SlidersHorizontal, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { BillingHeader } from '@/components/finance/BillingHeader'
import { FieldError, FieldHint, FieldLabel, SelectField, TextField, control } from '@/components/patients/form'
import { Alert, type AlertTone } from '@/components/ui/alert'
import { EmptyState } from '@/components/ui/empty-state'
import { useAvisoSalida } from '@/lib/useAvisoSalida'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { DatePicker } from '@/components/ui/date-picker'
import { FilterMenu } from '@/components/ui/filter-menu'
import { Pill, type PillTone } from '@/components/ui/pill'
import { Tabs } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { aviso } from '@/components/ui/toaster'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { EncabezadoEditor, GRILLA_LISTA_EDITOR, ItemLista, PanelLista, PieEditor, TARJETA_EDITOR } from '@/components/settings/ListaEditor'
import { AssignmentsTab, cuantasAsignaciones } from '@/components/finance/Assignments'
import { CompareFeesDrawer } from '@/components/finance/CompareFeesDrawer'
import { MoneyInput } from '@/components/finance/fields'
import { CopyFormDrawer, IncreaseAllDrawer, aumentar } from '@/components/finance/FeeScheduleTools'
import { TABLA_ENCABEZADO, TABLA_FILA, TABLA_MARCO, PADDING_PAGINA, BOTON_BORRAR } from '@/lib/estilos'
import { useFinanzas } from '@/data/finanzasStore'
import {
  ESTADOS_ARANCEL, PROCEDIMIENTOS, SIN_ASIGNAR, TIPOS_ARANCEL, TONO_ARANCEL, conImporte, dinero, estadoVersion, fechaMDA, hoyIso,
  idNuevo, siguienteVersion, versionActiva, versionProgramada, versionVigente, type Arancel, type EstadoArancel, type EstadoVersion,
  type TipoArancel,
} from '@/data/finanzas'
import { OBLIGATORIO } from '@/lib/validacion'

/* Settings → Billing → Fee Schedules: la lista de lo creado y el editor con sus versiones (Draft, Scheduled, Active,
   Expired), según la guía funcional y el prototipo de Julián (settings-billing.md, 2026-11-27). New Fee Schedule es una
   página sin la lista. */

export const LISTA_ARANCELES = '/settings/finance/fee-schedule'
export const rutaArancel = (id: string) => \`\${LISTA_ARANCELES}/\${id}/edit\`

const aIso = (d: Date) => \`\${d.getFullYear()}-\${String(d.getMonth() + 1).padStart(2, '0')}-\${String(d.getDate()).padStart(2, '0')}\`
const deIso = (iso: string) => { const [y, m, d] = iso.split('-').map(Number); return new Date(y!, m! - 1, d!) }
const sinVacios = (n: Record<string, number | null>) => Object.fromEntries(Object.entries(n).filter(([, v]) => v !== null)) as Record<string, number>

/* Textos del prototipo, que salen de Jira: CON-495 / CON-1375 (nombre repetido), CON-1151 (fecha), CON-496 / CON-1276
   (asociaciones). */
const NOMBRE_REPETIDO = 'There is already a fee schedule with this name. Please choose a different name.'
const FECHA_PASADA = 'The available date must be today or a future date.'
const CON_ASOCIACIONES = 'The fee schedule cannot be deactivated when there are active associations. Please remove all associations before continuing.'
const REVISAR = 'Please review the highlighted fields.'
const BORRADOR = 'draft'
const TONO_VERSION: Record<EstadoVersion | 'Draft', PillTone> = { Active: 'success', Scheduled: 'info', Expired: 'neutral', Draft: 'warning' }

/* El ⋮ de un fee schedule: Deactivate / Activate, Archive y Restore. Con asociaciones no se desactiva ni se archiva
   (CON-496, CON-1276): hay que quitarlas en la pestaña Assignments. Archive y Restore confirman (CON-1276, CON-1108). */
export function useAccionesArancel() {
  const { guardar, planes, aseguradoras } = useFinanzas()
  const [pedido, setPedido] = useState<{ tipo: 'archivar' | 'restaurar'; a: Arancel } | null>(null)
  const pasar = (a: Arancel, estado: EstadoArancel, texto: string) => { guardar('aranceles', { ...a, estado }); aviso.ok(texto) }
  /* Devuelve true si quedó frenado por las asociaciones. */
  const frenado = (a: Arancel) => {
    if (cuantasAsignaciones(a, planes, aseguradoras) === 0) return false
    aviso.error(CON_ASOCIACIONES)
    return true
  }

  const items = (a: Arancel) => (
    <>
      {a.estado === 'Active' && (
        <DropdownMenuItem onSelect={() => { if (!frenado(a)) pasar(a, 'Inactive', 'Fee Schedule deactivate successfully.') }}><Power className="size-4 shrink-0" /> Deactivate</DropdownMenuItem>
      )}
      {a.estado === 'Inactive' && (
        <DropdownMenuItem onSelect={() => pasar(a, 'Active', 'Fee Schedule activated successfully.')}><Power className="size-4 shrink-0" /> Activate</DropdownMenuItem>
      )}
      {a.estado === 'Archived'
        ? <DropdownMenuItem onSelect={() => setPedido({ tipo: 'restaurar', a })}><ArchiveRestore className="size-4 shrink-0" /> Restore</DropdownMenuItem>
        : <DropdownMenuItem variant="destructive" onSelect={() => { if (!frenado(a)) setPedido({ tipo: 'archivar', a }) }}><Archive className="size-4 shrink-0" /> Archive</DropdownMenuItem>}
    </>
  )

  const cerrar = () => setPedido(null)
  const dialogo = pedido && (pedido.tipo === 'archivar' ? (
    <ConfirmDialog
      title="Archive fee schedule?" confirmLabel="Archive" onCancel={cerrar}
      onConfirm={() => { cerrar(); pasar(pedido.a, 'Archived', 'Fee Schedule archived successfully.') }}
    >
      Are you sure you want to archive this fee schedule? It will become read-only and stop being available in the system.
    </ConfirmDialog>
  ) : (
    <ConfirmDialog
      title="Restore fee schedule?" confirmLabel="Restore" onCancel={cerrar}
      onConfirm={() => { cerrar(); pasar(pedido.a, 'Active', 'Fee Schedule restored.') }}
    >
      Are you sure you want to restore this Fee Schedule?
    </ConfirmDialog>
  ))
  return { items, dialogo }
}

/* El selector de versión, arriba a la derecha del editor: fecha y estado de cada una, de la más nueva a la más vieja, con el
   Draft primero. Con una sola no abre nada. */
type OpcionVersion = { id: string; fecha: string; estado: EstadoVersion | 'Draft' }
function MenuVersion({ opciones, actual, onElegir }: { opciones: OpcionVersion[]; actual: OpcionVersion; onElegir: (id: string) => void }) {
  const caja = 'flex h-9 items-center gap-2 rounded-md border border-line bg-surface px-3 text-[13px] font-semibold text-ink'
  const contenido = (
    <>
      <span className="font-normal text-ink-muted">Version</span>
      <span className="tabular-nums">{actual.fecha}</span>
      <Pill tone={TONO_VERSION[actual.estado]} size="sm">{actual.estado}</Pill>
    </>
  )
  if (opciones.length < 2) return <span className={caja}>{contenido}</span>
  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label={\`Version \${actual.fecha} \${actual.estado}\`} className={cn(caja, 'hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue')}>
        {contenido}
        <ChevronDown className="size-4 text-ink-muted" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[240px]">
        {opciones.map((o) => (
          <DropdownMenuItem key={o.id} onSelect={() => onElegir(o.id)} className={cn('justify-between gap-4', o.id === actual.id && 'bg-info-bg')}>
            <span className="tabular-nums">{o.fecha}</span>
            <Pill tone={TONO_VERSION[o.estado]} size="sm">{o.estado}</Pill>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* Debajo de Available from: qué va a pasar con esa fecha al publicar, con el aviso de la app (\`ui/alert\`) en el tono del
   estado que va a tener la versión (settings-billing.md, 2026-11-27). */
function ResultadoFecha({ desde, hoy, hayActiva }: { desde: string; hoy: string; hayActiva: boolean }) {
  if (desde < hoy) return <FieldError>{FECHA_PASADA}</FieldError>
  return desde === hoy ? (
    <Alert tone="success" title="Starts today">
      It becomes <b>Active</b> as soon as you publish.{hayActiva && ' The current version expires at that moment.'}
    </Alert>
  ) : (
    <Alert tone="info" title={\`Starts on \${fechaMDA(desde)}\`}>
      It stays <b>Scheduled</b> until then, then becomes Active automatically.{hayActiva && ' The current version remains active until that day.'}
    </Alert>
  )
}

type Modo = 'create' | 'archived' | 'draft' | 'expired' | 'active' | 'newver' | 'scheduled'
const PESTANAS = ['General information', 'Assignments'] as const

/* El editor de la derecha (y, sin \`arancel\`, la página New Fee Schedule). Qué se ve y qué se puede hacer sale del modo:
   - active: la que rige hoy, sólo lectura. Create new version pasa a newver (si no hay ya un Draft o una Scheduled).
   - newver / draft: se editan nombre, fecha y fees. Save draft guarda el borrador (sin fecha); Publish… pide confirmar y
     crea la versión: Active si empieza hoy, Scheduled si empieza después (CON-1151).
   - scheduled: se cambian fees y fecha en el lugar, sin versión nueva (CON-1375).
   - expired / archived: sólo lectura (CON-1369, CON-1276).
   - create: Save as draft deja el fee schedule Inactive con su borrador; Create and publish… lo deja Active. */
export function FeeScheduleEditor({ arancel }: { arancel?: Arancel }) {
  const navigate = useNavigate()
  const { aranceles, planes, aseguradoras, guardar } = useFinanzas()
  const hoy = hoyIso()
  const activa = arancel && versionActiva(arancel, hoy)
  const programada = arancel && versionProgramada(arancel, hoy)
  const preciosDe = (v: string) => (v === BORRADOR ? arancel?.borrador?.precios : arancel?.versiones.find((x) => x.id === v)?.precios) ?? {}
  /* El Draft no guarda fecha: arranca en hoy. */
  const fechaDe = (v: string) => arancel?.versiones.find((x) => x.id === v)?.desde ?? hoy

  const [vista, setVista] = useState(() => activa?.id ?? programada?.id ?? arancel?.versiones[0]?.id ?? BORRADOR)
  const [creando, setCreando] = useState(false)
  const [pestana, setPestana] = useState<(typeof PESTANAS)[number]>('General information')
  const version = arancel?.versiones.find((v) => v.id === vista)
  const estadoV = arancel && version ? estadoVersion(arancel, version, hoy) : undefined
  const modo: Modo = !arancel ? 'create' : arancel.estado === 'Archived' ? 'archived' : !version ? 'draft'
    : estadoV === 'Expired' ? 'expired' : estadoV === 'Scheduled' ? 'scheduled' : creando ? 'newver' : 'active'
  const edita = modo === 'create' || modo === 'draft' || modo === 'newver' || modo === 'scheduled'

  const [nombre, setNombre] = useState(arancel?.nombre ?? '')
  const [tipo, setTipo] = useState<TipoArancel | ''>(arancel?.tipo ?? '')
  const [nuevos, setNuevos] = useState<Record<string, number | null>>(() => ({ ...preciosDe(vista) }))
  const [desde, setDesde] = useState<Date | null>(() => (arancel ? deIso(fechaDe(vista)) : null))
  /* Lo guardado de lo que se ve, para saber si hay cambios. */
  const [base, setBase] = useState(() => ({ precios: preciosDe(vista), desde: fechaDe(vista) }))
  const [q, setQ] = useState('')
  const [herramienta, setHerramienta] = useState<'copiar' | 'aumentar' | null>(null)
  const [intento, setIntento] = useState<'borrador' | 'publicar' | null>(null)
  const [pregunta, setPregunta] = useState<'publicar' | 'descartar' | { vista: string } | null>(null)

  const precios = sinVacios(nuevos)
  const dia = desde ? aIso(desde) : ''
  const repetido = !!nombre.trim() && aranceles.some((a) => a.id !== arancel?.id && a.nombre.toLowerCase() === nombre.trim().toLowerCase())
  const errorNombre = !intento ? undefined : !nombre.trim() ? OBLIGATORIO : repetido ? NOMBRE_REPETIDO : undefined
  const errorTipo = intento && !tipo ? OBLIGATORIO : undefined
  const faltaFecha = intento === 'publicar' && !desde
  const cambiado = edita && !!arancel && (
    JSON.stringify(precios) !== JSON.stringify(base.precios) || nombre.trim() !== arancel.nombre || tipo !== arancel.tipo
    || (modo === 'scheduled' && dia !== base.desde)
  )
  /* Con cambios sin guardar, irse (otro fee schedule de la lista, el breadcrumb, otra pestaña de Billing) pregunta antes. */
  const salida = useAvisoSalida(cambiado)
  const asignaciones = arancel ? cuantasAsignaciones(arancel, planes, aseguradoras) : 0

  /* Los valores van por parámetro: después de guardar, \`arancel\` todavía es el de antes. */
  const cargar = (v: string, p: Record<string, number>, d: string, nueva = false) => {
    setVista(v); setCreando(nueva); setNuevos({ ...p }); setDesde(deIso(d)); setBase({ precios: p, desde: d }); setIntento(null)
  }
  const verVista = (v: string) => {
    if (!arancel) return
    setNombre(arancel.nombre); setTipo(arancel.tipo)
    cargar(v, preciosDe(v), fechaDe(v))
  }
  /* Cambiar de versión con cambios sin guardar pregunta, como salir de la pantalla. */
  const pedirVista = (v: string) => (v === vista && !creando ? undefined : cambiado ? setPregunta({ vista: v }) : verVista(v))

  const validar = (conFecha: boolean) => {
    const ok = !!nombre.trim() && !!tipo && !repetido && (!conFecha || (!!desde && dia >= hoy))
    if (!ok) { setIntento(conFecha ? 'publicar' : 'borrador'); aviso.error(REVISAR) }
    return ok
  }

  const guardarBorrador = () => {
    if (!validar(false)) return
    if (!arancel) {
      const nuevo: Arancel = {
        id: idNuevo(nombre, aranceles.map((a) => a.id)), nombre: nombre.trim(), tipo: tipo as TipoArancel, porDefecto: false, estado: 'Inactive',
        versiones: [], borrador: { precios }, actualizado: hoy, asignados: SIN_ASIGNAR,
      }
      guardar('aranceles', nuevo)
      aviso.ok('Draft saved. Publish it when you’re ready.')
      navigate(rutaArancel(nuevo.id))
      return
    }
    guardar('aranceles', { ...arancel, nombre: nombre.trim(), tipo: tipo as TipoArancel, borrador: { precios }, actualizado: hoy })
    aviso.ok(modo === 'draft' ? 'Draft saved.' : 'New version saved as a draft.')
    cargar(BORRADOR, precios, hoy)
  }

  const publicar = () => {
    setPregunta(null)
    if (!arancel) {
      const nuevo: Arancel = {
        id: idNuevo(nombre, aranceles.map((a) => a.id)), nombre: nombre.trim(), tipo: tipo as TipoArancel, porDefecto: false, estado: 'Active',
        versiones: [{ id: \`v-\${Date.now().toString(36)}\`, desde: dia, precios }], actualizado: hoy, asignados: SIN_ASIGNAR,
      }
      guardar('aranceles', nuevo)
      aviso.ok(dia === hoy ? 'Fee schedule created and active.' : \`Fee schedule created. It becomes active on \${fechaMDA(dia)}.\`)
      navigate(rutaArancel(nuevo.id))
      return
    }
    /* Si ya hay una versión que empieza ese día, la reemplaza. */
    const mismoDia = arancel.versiones.find((v) => v.desde === dia)
    const nueva = mismoDia ? { ...mismoDia, precios } : { id: \`v-\${Date.now().toString(36)}\`, desde: dia, precios }
    const versiones = mismoDia ? arancel.versiones.map((v) => (v.id === mismoDia.id ? nueva : v)) : [...arancel.versiones, nueva]
    guardar('aranceles', {
      ...arancel, nombre: nombre.trim(), tipo: tipo as TipoArancel, versiones, actualizado: hoy,
      borrador: modo === 'draft' ? undefined : arancel.borrador,
      /* Publicar con fecha de hoy un fee schedule que sólo era un borrador lo deja disponible. */
      estado: dia === hoy && arancel.estado === 'Inactive' ? 'Active' : arancel.estado,
    })
    aviso.ok(\`The Fee Schedule has been updated successfully. A new version has been created, effective from \${fechaMDA(dia)}.\`)
    cargar(nueva.id, precios, dia)
  }

  const guardarProgramada = () => {
    if (!arancel || !version || !validar(true)) return
    const versiones = arancel.versiones.map((v) => (v.id === version.id ? { ...v, desde: dia, precios } : v))
    guardar('aranceles', { ...arancel, nombre: nombre.trim(), tipo: tipo as TipoArancel, versiones, actualizado: hoy })
    aviso.ok(\`Changes saved.\${dia === hoy ? ' This version is now active.' : ''}\`)
    cargar(version.id, precios, dia)
  }

  const descartar = () => {
    setPregunta(null)
    if (!arancel) return
    const v = activa ?? programada ?? arancel.versiones[0]
    if (!v) return
    guardar('aranceles', { ...arancel, borrador: undefined })
    setNombre(arancel.nombre); setTipo(arancel.tipo)
    cargar(v.id, v.precios, v.desde)
    aviso.ok('Draft discarded. Nothing changed for the clinic.')
  }

  const cancelar = () => {
    if (!arancel) { navigate(LISTA_ARANCELES); return }
    verVista(vista)
    aviso.info('Changes discarded')
  }

  const opciones: OpcionVersion[] = arancel ? [
    ...(arancel.borrador ? [{ id: BORRADOR, fecha: 'No date yet', estado: 'Draft' as const }] : []),
    ...[...arancel.versiones].sort((x, y) => y.desde.localeCompare(x.desde)).map((v) => ({ id: v.id, fecha: fechaMDA(v.desde), estado: estadoVersion(arancel, v, hoy) })),
  ] : []
  const opcionActual = opciones.find((o) => o.id === vista) ?? opciones[0]

  /* El aviso de arriba: qué es lo que se ve y qué se puede hacer. */
  const bloqueoNueva = programada
    ? { texto: \`A newer version is scheduled for \${fechaMDA(programada.desde)}. Edit that one instead.\`, tip: \`A new version already exists and is scheduled for \${fechaMDA(programada.desde)}. Edit that version instead of creating another.\` }
    : arancel?.borrador
      ? { texto: 'A draft version already exists. Open it from Version history.', tip: 'A new version already exists as a draft. Publish it or open it from Version history before creating another.' }
      : undefined
  const expiro = arancel && version && modo === 'expired' ? siguienteVersion(arancel, version)?.desde : undefined
  const banner: { tono: AlertTone; titulo: string; texto?: string } | undefined
    = modo === 'draft' ? { tono: 'warning', titulo: 'This is a draft.', texto: 'Publish it to start using this fee schedule. Saving as a draft doesn’t need a date.' }
    : modo === 'active' ? { tono: 'success', titulo: \`Current version, active since \${fechaMDA(version!.desde)}.\`, texto: bloqueoNueva?.texto ?? 'Changes are saved as a new version; this one stays as it is.' }
    : modo === 'newver' ? { tono: 'warning', titulo: 'You’re creating a new version.', texto: 'The current version stays active until the new one starts.' }
    : modo === 'scheduled' ? { tono: 'info', titulo: activa ? \`Scheduled. Replaces the current version on \${fechaMDA(version!.desde)}.\` : \`Scheduled. Starts on \${fechaMDA(version!.desde)}.\`, texto: 'You can still change the fees or the start date.' }
    : modo === 'expired' ? { tono: 'neutral', titulo: \`Expired\${expiro ? \` on \${fechaMDA(expiro)}\` : ''}. View only.\` }
    : modo === 'archived' ? { tono: 'neutral', titulo: 'Archived. View only.', texto: 'Restore it from the list menu to edit.' }
    : undefined
  const crearVersion = modo !== 'active' || !activa ? undefined : bloqueoNueva ? (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span tabIndex={0} className="inline-flex rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue">
            <Button variant="secondary" disabled className="pointer-events-none">Create new version</Button>
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-[270px] bg-tooltip leading-snug text-white">{bloqueoNueva.tip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : <Button onClick={() => cargar(activa.id, activa.precios, hoy, true)}>Create new version</Button>

  /* Current fee: lo que rige hoy, al lado de lo que se está cargando. */
  const referencia = (modo === 'newver' || modo === 'draft' || modo === 'scheduled') && activa ? activa.precios : undefined
  /* Sin casillas y con New fee como texto que se edita al tocarlo, como red.dev (settings-billing.md, 2026-11-25). */
  const columnas = cn('grid items-center gap-3', referencia ? 'grid-cols-[64px_1fr_96px_120px]' : 'grid-cols-[64px_1fr_120px]')
  const filas = PROCEDIMIENTOS.filter((p) => \`\${p.code} \${p.label}\`.toLowerCase().includes(q.trim().toLowerCase()))

  const pie = !edita || pestana === 'Assignments' ? null
    : modo === 'scheduled' ? <PieEditor onCancelar={cancelar} onGuardar={guardarProgramada} etiquetaGuardar="Save changes" guardarDeshabilitado={!cambiado} />
    : (
      <PieEditor
        izquierda={modo === 'draft' && arancel && arancel.versiones.length > 0 && <Button variant="ghost" className={BOTON_BORRAR} onClick={() => setPregunta('descartar')}><Trash2 /> Discard draft</Button>}
        onCancelar={cancelar}
        secundario={<Button variant="secondary" className="px-6" onClick={guardarBorrador}>{arancel ? 'Save draft' : 'Save as draft'}</Button>}
        onGuardar={() => { if (validar(true)) setPregunta('publicar') }} etiquetaGuardar={arancel ? 'Publish…' : 'Create and publish…'}
      />
    )

  /* Misma card y pie que el editor de Coverage tables (settings-billing.md, 2026-11-26). */
  return (
    <section aria-label={arancel ? 'Edit fee schedule' : 'New fee schedule'} className={TARJETA_EDITOR}>
      {arancel && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <EncabezadoEditor
              titulo={arancel.nombre} estado={{ nombre: arancel.estado, tono: TONO_ARANCEL[arancel.estado] }}
              extra={arancel.porDefecto && <Pill tone="info" size="sm">Default</Pill>}
            />
            {opcionActual && <MenuVersion opciones={opciones} actual={opcionActual} onElegir={pedirVista} />}
          </div>
          <Tabs
            size="sm" aria-label="Fee schedule sections" value={pestana} onChange={setPestana}
            tabs={[{ value: 'General information' }, { value: 'Assignments', label: \`Assignments (\${asignaciones})\` }]}
          />
        </>
      )}

      {arancel && pestana === 'Assignments' ? <AssignmentsTab arancel={arancel} /> : (
        <>
          {banner && <Alert tone={banner.tono} title={banner.titulo} action={crearVersion}>{banner.texto}</Alert>}

          <div className="grid items-start gap-4 sm:grid-cols-2">
            <TextField label="Fee schedule name" required placeholder="Enter a fee schedule name" value={nombre} onChange={setNombre} disabled={!edita} error={errorNombre} />
            <SelectField label="Type" required placeholder="Select a type" options={[...TIPOS_ARANCEL]} value={tipo} onChange={(v) => setTipo(v as TipoArancel)} error={errorTipo} disabled={!edita} />
            <div className="flex flex-col gap-2">
              <FieldLabel required={edita}>Available from</FieldLabel>
              {edita ? (
                <>
                  <DatePicker value={desde} onChange={setDesde} className="h-9 w-full" error={faltaFecha || (!!dia && dia < hoy)} />
                  {faltaFecha ? <FieldError>{OBLIGATORIO}</FieldError>
                    : modo !== 'scheduled' && <FieldHint>Used when you publish. Saving as a draft doesn’t keep a date.</FieldHint>}
                  {dia && <ResultadoFecha desde={dia} hoy={hoy} hayActiva={!!activa} />}
                </>
              ) : <span className={cn(control(), 'flex h-9 items-center bg-surface-muted px-3 text-ink-muted tabular-nums')}>{version ? fechaMDA(version.desde) : 'No date'}</span>}
            </div>
          </div>

          {/* Buscador y Non-zero fees a la izquierda; las acciones de la tabla justo encima, a la derecha, como Coverage. */}
          <div className="-mb-2 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="relative block w-full sm:max-w-[320px]">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
              <input aria-label="Search procedure" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search procedures" className={cn(control(), 'h-9 pr-3 pl-9')} />
            </span>
            <span className="text-[13px] text-ink-muted tabular-nums" title="Procedures whose fee is more than $0.00">
              Non-zero fees — <span className="font-semibold text-ink">{conImporte(nuevos)} / {PROCEDIMIENTOS.length}</span>
            </span>
            {edita && (
              <div className="flex flex-wrap gap-2 sm:ml-auto">
                <Button variant="secondary" onClick={() => setHerramienta('copiar')}><Copy /> Copy form</Button>
                <Button variant="secondary" onClick={() => setHerramienta('aumentar')}><SlidersHorizontal /> Bulk edit</Button>
              </div>
            )}
          </div>

          {/* La tabla scrollea adentro con el encabezado fijo, así el pie queda a la vista (red.dev). */}
          <div role="table" aria-label="Fees" className={cn(TABLA_MARCO, 'flex flex-col overflow-hidden')}>
            <div role="row" className={cn(columnas, TABLA_ENCABEZADO, 'shrink-0')}>
              <span role="columnheader">Code</span><span role="columnheader">Description</span>
              {referencia && <span role="columnheader" className="text-right">Current fee</span>}
              <span role="columnheader" className="text-right">{referencia ? 'New fee' : 'Fee'}</span>
            </div>
            <div role="rowgroup" className="max-h-[min(480px,60vh)] overflow-y-auto">
              {filas.map((p) => {
                const actual = referencia?.[p.code]
                const valor = nuevos[p.code] ?? null
                return (
                  <div key={p.code} role="row" className={cn(columnas, TABLA_FILA)}>
                    <span role="cell" className="tabular-nums">{p.code}</span>
                    <span role="cell" className="min-w-0">{p.label}</span>
                    {referencia && <span role="cell" className="text-right tabular-nums">{actual !== undefined ? dinero(actual) : '—'}</span>}
                    <span role="cell" className={cn(!edita && 'text-right tabular-nums')}>
                      {edita
                        ? <MoneyInput label={\`\${p.code} new fee\`} value={valor} onChange={(v) => setNuevos((n) => ({ ...n, [p.code]: v }))} comoTexto className={cn(referencia && valor !== (actual ?? null) && 'font-semibold text-dash-blue')} />
                        : valor !== null ? dinero(valor) : '—'}
                    </span>
                  </div>
                )
              })}
              {filas.length === 0 && <EmptyState icon={SearchX} title="No results found for the selected filter." className="border-t border-line-row" />}
            </div>
          </div>
        </>
      )}

      {pie}

      {salida.dialogo}

      {pregunta === 'publicar' && (
        <ConfirmDialog
          title={arancel ? 'Publish fee schedule?' : 'Create and publish fee schedule?'} confirmLabel={arancel ? 'Publish' : 'Create and publish'} cancelLabel="Back"
          onCancel={() => setPregunta(null)} onConfirm={publicar}
        >
          <dl className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 rounded-lg bg-surface-muted p-3 text-ink">
            <dt className="font-semibold">Name:</dt><dd>{nombre.trim()}</dd>
            <dt className="font-semibold">Available from:</dt><dd className="tabular-nums">{fechaMDA(dia)}</dd>
            <dt className="font-semibold">Result:</dt>
            <dd>{dia === hoy ? <Pill tone="success" size="sm">Active</Pill> : <><Pill tone="info" size="sm">Scheduled</Pill> — becomes Active on {fechaMDA(dia)}</>}</dd>
          </dl>
          {activa && <p className="mt-3">Once published, previous versions stay locked and can’t be modified.</p>}
          {asignaciones > 0 && <p className="mt-2">Changing a fee schedule does not affect procedures that have already been posted or sent to the insurance carrier.</p>}
        </ConfirmDialog>
      )}
      {pregunta === 'descartar' && (
        <ConfirmDialog title="Discard draft?" tone="danger" icon="delete" confirmLabel="Discard draft" onCancel={() => setPregunta(null)} onConfirm={descartar}>
          The draft fees will be lost. The current version doesn’t change.
        </ConfirmDialog>
      )}
      {pregunta && typeof pregunta === 'object' && (
        <ConfirmDialog
          title="Discard unsaved changes?" tone="danger" confirmLabel="Discard changes" cancelLabel="Keep editing"
          onCancel={() => setPregunta(null)} onConfirm={() => { const v = pregunta.vista; setPregunta(null); verVista(v) }}
        >
          The changes you made in this version haven’t been saved.
        </ConfirmDialog>
      )}

      {herramienta === 'copiar' && (
        <CopyFormDrawer
          opciones={aranceles.filter((a) => a.id !== arancel?.id && a.estado === 'Active' && a.versiones.length > 0).map((a) => a.nombre)}
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

/* Fee schedules como Coverage tables: lo creado a la izquierda y el elegido en el editor; al entrar, sin elegido. La lista
   muestra los activos e inactivos; los archivados, con el filtro (CON-497). El Default va primero y el resto por nombre. */
const SIN_FILTRO = 'Active and inactive'
export function SettingsFeeSchedules() {
  const { feeId } = useParams()
  const navigate = useNavigate()
  const { aranceles } = useFinanzas()
  const [q, setQ] = useState('')
  const [estado, setEstado] = useState(SIN_FILTRO)
  const acciones = useAccionesArancel()
  const [comparar, setComparar] = useState<Arancel | null>(null)
  const elegido = aranceles.find((a) => a.id === feeId)

  const pasa = (a: Arancel) => (estado === 'All' ? true : estado === SIN_FILTRO ? a.estado !== 'Archived' : a.estado === estado)
  const visibles = aranceles
    .filter((a) => (pasa(a) || a.id === feeId) && a.nombre.toLowerCase().includes(q.trim().toLowerCase()))
    .sort((x, y) => Number(y.porDefecto) - Number(x.porDefecto) || x.nombre.localeCompare(y.nombre))

  /* Un fee schedule que ya no está (un link viejo): la lista sin elegido. */
  if (feeId && !elegido) return <Navigate to={LISTA_ARANCELES} replace />

  return (
    <div className={cn('@container', PADDING_PAGINA)}>
      <BillingHeader accion={<Button size="md" onClick={() => navigate(\`\${LISTA_ARANCELES}/new\`)}><Plus /> New fee schedule</Button>} />
      <div className={GRILLA_LISTA_EDITOR}>
        <PanelLista
          titulo="Fee schedules" q={q} onQ={setQ} placeholder="Search fee schedules" vacio={visibles.length === 0}
          filtro={(
            <FilterMenu
              label="Filters" size="sm" align="end"
              groups={[{
                type: 'single', title: 'Fee schedule status', defaultValue: SIN_FILTRO, value: estado, onChange: setEstado,
                options: [
                  { value: SIN_FILTRO },
                  ...ESTADOS_ARANCEL.map((e) => ({ value: e, count: aranceles.filter((a) => a.estado === e).length })),
                  { value: 'All', count: aranceles.length },
                ],
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
                  {/* Compare fees no está en el prototipo: lo pidió Julián antes (2026-10-09) y se mantiene. */}
                  {a.versiones.length > 0 && (
                    <>
                      <DropdownMenuItem onSelect={() => setComparar(a)}><GitCompareArrows className="size-4 shrink-0" /> Compare fees</DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
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
      {comparar && (
        <CompareFeesDrawer arancel={comparar} aranceles={aranceles} onClose={() => setComparar(null)} onEditar={() => navigate(rutaArancel(comparar.id))} />
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
`})))()}export{n,i as r,r as t};