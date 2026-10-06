import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useState } from 'react'
import {
  Bookmark, Pencil, Plus, MoreVertical, CornerUpLeft, ChevronDown, ChevronRight, Captions, Check, Eye, Save, Link2, ClipboardList, Scan, GripVertical, Trash2, TimerOff, Ban, FilePen, CheckCheck, Presentation, CircleCheck, CircleX, CalendarCheck2, CalendarX2, CalendarDays, FileCheck2, FileClock, FileMinus2, FileX2, type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { ConsentBlock } from '@/components/clinical/ConsentBlock'
import {
  CASOS, NO_ASIGNADOS, CATEGORIAS, DIALOGOS, OPCIONES_BORRAR_CASO, MOVER,
  NUEVO_GRUPO, COMPLETAR, ordenFecha,
  type Caso, type Cita, type EstadoCaso, type Procedimiento, type ClaveDialogo, type ConsentProcedimiento, type Visita,
} from '@/data/treatment-plan'
import { ICONO_SUELTO } from '@/lib/estilos'
import { SelectField } from '@/components/patients/form'
import { Pill, type PillTone } from '@/components/ui/pill'
import { Button } from '@/components/ui/button'
import { Alert } from '@/components/ui/alert'
import { Drawer, DrawerActions } from '@/components/ui/drawer'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ConAyuda } from '@/components/clinical/dental/ProcedureRow'

/* Figma 4118:220403 "Treatment Plan — Section (Cases, Workflow & Dialogs)":
   el rail de estados, la tabla de no asignados, el caso con sus visitas y los
   diálogos. */

const COLUMNAS = ['Date', 'Surface', 'Tooth', 'Location', 'Procedure', 'Provider', 'Fee', 'Status']

/* La caja del total, igual abierta (en la fila de campos) y plegada (en el encabezado). */
const CAJA_TOTAL = 'bg-dash-count-bg flex h-9 shrink-0 items-center rounded-md px-3 text-[13px] font-semibold whitespace-nowrap text-ink'

const ESTADO_TONO: Record<Procedimiento['estado'], PillTone> = {
  Planned: 'success', Completed: 'info', Removed: 'neutral',
}

export const TONO_CASO: Record<EstadoCaso, PillTone> = {
  Planning: 'warning', Pending: 'purple', Presented: 'info', 'Waiting for consent': 'neutral', Accepted: 'success', Discarded: 'danger',
}

/* Lo que cada diálogo del menú hace con el estado del caso. */
const ESTADO_TRAS: Partial<Record<ClaveDialogo, EstadoCaso>> = {
  finish: 'Pending', present: 'Presented', accept: 'Waiting for consent', discard: 'Discarded', expire: 'Discarded', cancel: 'Discarded',
}

/* El menú del caso, como en la app real: "Actions Case" y "Actions Treatment", según el estado. Lo que cierra o borra
   va en rojo. Ver clinical-mode.md. */
type AccionMenu = { label: string; clave: ClaveDialogo | 'delete' | 'consent'; icono: LucideIcon; peligro?: boolean }
const EXPIRAR: AccionMenu = { label: 'Expire', clave: 'expire', icono: TimerOff, peligro: true }
const CANCELAR: AccionMenu = { label: 'Cancel', clave: 'cancel', icono: Ban, peligro: true }
const CONSENTIMIENTO: AccionMenu = { label: 'Generate Consent', clave: 'consent', icono: FilePen }
const ACCIONES_CASO: Partial<Record<EstadoCaso, AccionMenu[]>> = {
  Planning: [{ label: 'Delete', clave: 'delete', icono: Trash2, peligro: true }],
}
const ACCIONES_TRATAMIENTO: Record<EstadoCaso, AccionMenu[]> = {
  Planning: [{ label: 'Finish Planning', clave: 'finish', icono: CheckCheck }, EXPIRAR, CANCELAR],
  Pending: [{ label: 'Present', clave: 'present', icono: Presentation }, EXPIRAR, CANCELAR],
  Presented: [{ label: 'Accept', clave: 'accept', icono: CircleCheck }, { label: 'Discard', clave: 'discard', icono: CircleX }, EXPIRAR, CANCELAR],
  'Waiting for consent': [EXPIRAR, CANCELAR],
  Accepted: [CONSENTIMIENTO, EXPIRAR, CANCELAR],
  Discarded: [CONSENTIMIENTO],
}

/* Ícono de acción del encabezado del caso. Fuera de su estado no se esconde:
   queda deshabilitado y el tooltip dice cuándo se puede usar. El botón
   deshabilitado no recibe el hover, así que el tooltip cuelga del span. */
export function AccionCaso({
  habilitado, tooltip, tooltipDeshabilitado, className, claseBoton, children, ...boton
}: {
  habilitado: boolean
  tooltip: string
  tooltipDeshabilitado: string
  claseBoton?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className={cn('shrink-0', className)}>
          <button
            {...boton}
            disabled={!habilitado}
            className={cn(
              'flex items-center enabled:hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-40',
              claseBoton,
            )}
          >
            {children}
          </button>
        </span>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={4} className="bg-ink text-white">
        {habilitado ? tooltip : tooltipDeshabilitado}
      </TooltipContent>
    </Tooltip>
  )
}

/* ── Diálogos ─────────────────────────────────────────────────────── */

/* Con contenido para elegir (Move to, New group, Complete, Delete case) se abre como drawer; si es sólo una pregunta
   (Discard, Expire, Present…) es una confirmación chica. Ver Components / UI / Drawer. */
export function Dialogo({
  titulo, bajada, texto, children, onConfirm, onClose, confirmar = 'Confirm',
}: {
  titulo: string
  /** Bajada del título. */
  bajada?: readonly string[]
  texto?: readonly string[]
  children?: React.ReactNode
  onConfirm: () => void
  onClose: () => void
  confirmar?: string
}) {
  const confirmarYCerrar = () => { onConfirm(); onClose() }
  if (!children) {
    return (
      <ConfirmDialog title={titulo} confirmLabel={confirmar} onCancel={onClose} onConfirm={confirmarYCerrar}>
        {[...(bajada ?? []), ...(texto ?? [])].map((t) => <p key={t} className="mt-1 first:mt-0">{t}</p>)}
      </ConfirmDialog>
    )
  }
  return (
    <Drawer open onClose={onClose} title={titulo} description={bajada?.join(' ')} footer={<DrawerActions onCancel={onClose} onSave={confirmarYCerrar} saveLabel={confirmar} />}>
      {texto?.map((t) => (
        <p key={t} className="mb-3 text-[13px] text-ink-muted">{t}</p>
      ))}
      {children}
    </Drawer>
  )
}

/* Tarjeta con radio: la usan Delete Case y Move Procedure. */
export function OpcionRadio({
  on, titulo, detalle, onClick,
}: { on: boolean; titulo: string; detalle: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex gap-3 rounded-lg border px-3.5 py-3 text-left transition-colors',
        on ? 'border-dash-blue' : 'border-line hover:bg-surface-subtle',
      )}
    >
      <span
        className={cn(
          'mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border-2',
          on ? 'border-dash-blue' : 'border-ink-faint',
        )}
      >
        {on && <span className="bg-dash-blue size-2 rounded-full" />}
      </span>
      <span className="min-w-0">
        <span className="block text-[13px] font-semibold text-ink">{titulo}</span>
        <span className="mt-1 block text-[12px] leading-[1.5] text-ink-muted">{detalle}</span>
      </span>
    </button>
  )
}

/* Figma 4122:246942. El mismo modal sale de New Alternative Case y de Move to. */
export function DialogoMover({ onClose }: { onClose: () => void }) {
  const [caso, setCaso] = useState('')
  const [op, setOp] = useState(MOVER.opciones[0].id)
  const [intentado, setIntentado] = useState(false)

  return (
    <Dialogo
      titulo={MOVER.titulo}
      bajada={[MOVER.bajada]}
      onClose={onClose}
      confirmar="Save"
      onConfirm={() => {
        setIntentado(true)
        if (!caso) return
        aviso.ok(
          op === 'mover'
            ? \`Procedure moved to \${caso}.\`
            : \`Procedure added to \${caso} and kept in the original plan.\`,
        )
      }}
    >
      <div className="mt-5">
        <SelectField
          label="Case Name"
          value={caso}
          onChange={setCaso}
          options={CASOS.map((c) => c.nombre)}
          error={intentado && !caso ? 'This field is required.' : undefined}
        />
      </div>
      <p className="mt-5 text-xs font-medium text-ink">Select destination case</p>
      <div className="mt-2.5 flex flex-col gap-2.5">
        {MOVER.opciones.map((o) => (
          <OpcionRadio key={o.id} on={op === o.id} titulo={o.titulo} detalle={o.detalle} onClick={() => setOp(o.id)} />
        ))}
      </div>
    </Dialogo>
  )
}

/* Figma 4122:246100. Un solo campo. */
export function DialogoNuevoGrupo({ onClose }: { onClose: () => void }) {
  const [nombre, setNombre] = useState('')
  const [intentado, setIntentado] = useState(false)
  return (
    <Dialogo
      titulo={NUEVO_GRUPO.titulo}
      onClose={onClose}
      confirmar="Save"
      onConfirm={() => {
        setIntentado(true)
        if (!nombre) return
        aviso.ok(\`\${nombre} case group created.\`)
      }}
    >
      <div className="mt-4">
        <SelectField
          label={NUEVO_GRUPO.campo}
          value={nombre}
          onChange={setNombre}
          options={CASOS.map((c) => c.nombre)}
          error={intentado && !nombre ? 'This field is required.' : undefined}
        />
      </div>
    </Dialogo>
  )
}

/* Figma 4122:250957. Las tarjetas llevan casilla: el texto pide seleccionar
   las condiciones y en el frame no había con qué. */
export function DialogoCompletar({ onClose }: { onClose: () => void }) {
  const [marcadas, setMarcadas] = useState<string[]>([])
  return (
    <Dialogo
      titulo={COMPLETAR.titulo}
      bajada={COMPLETAR.texto}
      onClose={onClose}
      onConfirm={() =>
        aviso.ok(
          marcadas.length === 0
            ? 'Procedure completed.'
            : \`Procedure completed and \${marcadas.length} condition\${marcadas.length > 1 ? 's' : ''} marked as treated.\`,
        )
      }
    >
      <div className="mt-4 flex max-h-[340px] flex-col gap-3 overflow-y-auto">
        {COMPLETAR.condiciones.map((c) => {
          const on = marcadas.includes(c.id)
          return (
            <div
              key={c.id}
              className={cn(
                'rounded-r-md border border-l-[3px] border-line-soft border-l-dash-ok-fg p-3 transition-colors',
                on && 'border-dash-blue border-l-dash-ok-fg bg-dash-count-bg',
              )}
            >
              <div className="flex items-center gap-2">
                <Casilla
                  on={on}
                  label={\`Mark \${c.zona} as treated\`}
                  onChange={(v) => setMarcadas((m) => (v ? [...m, c.id] : m.filter((x) => x !== c.id)))}
                />
                <span className="rounded-full border border-dash-ok-fg bg-dash-ok-bg px-2 py-[2px] text-[11px] font-semibold text-dash-ok-fg">
                  {c.estado}
                </span>
                <span className="text-dash-blue flex items-center gap-1 text-[12px] font-medium">
                  <CalendarDays className="size-3" /> {c.fecha}
                </span>
                <button
                  onClick={() => aviso.info('Condition actions are not available in this release.')}
                  aria-label={\`Actions for \${c.zona}\`}
                  className={\`\${ICONO_SUELTO} ml-auto\`}
                >
                  <MoreVertical className="size-4" />
                </button>
              </div>
              <p className="mt-2 text-[13px] font-bold text-ink">{c.zona}</p>
              <p className="text-[12px] text-ink-medium">
                Condition: <span className="text-ink-muted">{c.condicion}</span>
              </p>
              <p className="text-[12px] text-ink-medium">
                Descriptors: <span className="text-ink-muted">{c.descriptores}</span>
              </p>
              <button
                onClick={() => aviso.info('The procedure detail is not available in this release.')}
                className="text-dash-blue mt-1 ml-auto block text-[12px] font-medium hover:underline"
              >
                Go to procedure ›
              </button>
            </div>
          )
        })}
      </div>
    </Dialogo>
  )
}

export function DialogoBorrarCaso({ onConfirm, onClose }: { onConfirm: (op: string) => void; onClose: () => void }) {
  const [op, setOp] = useState(OPCIONES_BORRAR_CASO[0].id)
  return (
    <Dialogo
      titulo="Delete Case"
      texto={['Are you sure you want to delete this case?']}
      onConfirm={() => onConfirm(op)}
      onClose={onClose}
    >
      {/* "Select destination case" es el rótulo del frame, aunque lo que se
          elige acá sea el alcance del borrado. Se replica. */}
      <p className="mt-4 text-[13px] font-semibold text-ink">Select destination case</p>
      <div className="mt-2 flex flex-col gap-2">
        {OPCIONES_BORRAR_CASO.map((o) => (
          <OpcionRadio key={o.id} on={op === o.id} titulo={o.titulo} detalle={o.detalle} onClick={() => setOp(o.id)} />
        ))}
      </div>
    </Dialogo>
  )
}

/* ── Rail de estados ──────────────────────────────────────────────── */

/* El estado de un grupo (una fecha): el de sus casos vivos; si todos se descartaron, Discarded. */
const estadoGrupo = (casos: Caso[]): EstadoCaso => casos.find((c) => c.estado !== 'Discarded')?.estado ?? 'Discarded'

/* El punto de cada caso en la lista: el color de su estado. */
const PUNTO_CASO: Record<EstadoCaso, string> = {
  Planning: 'bg-ink-faint', Pending: 'bg-purple-fg', Presented: 'bg-dash-busy-fg', 'Waiting for consent': 'bg-warn-fg', Accepted: 'bg-dash-ok-fg', Discarded: 'bg-dash-bad-fg',
}

/* Como en la app real (red.dev): arriba Unassigned Items y debajo los planes agrupados por fecha de creación, la más
   nueva primero. Cada fecha lleva el estado del grupo y se despliega con sus casos (las alternativas). Ver
   clinical-mode.md. */
export function Rail({
  casos, vista, casoId, onUnassigned, onCaso,
}: {
  casos: Caso[]
  vista: 'unassigned' | 'caso'
  casoId: string
  onUnassigned: () => void
  onCaso: (id: string) => void
}) {
  const fechas = [...new Set(casos.map((c) => c.creado))].sort((x, y) => ordenFecha(y) - ordenFecha(x))
  const fechaElegida = casos.find((c) => c.id === casoId)?.creado
  const [abiertas, setAbiertas] = useState<string[]>(() => [vista === 'caso' && fechaElegida ? fechaElegida : fechas[0]!])
  const alternar = (f: string) => setAbiertas((xs) => (xs.includes(f) ? xs.filter((x) => x !== f) : [...xs, f]))
  /* Al cambiar de caso su fecha se abre, pero después se puede cerrar como cualquier otra. */
  useEffect(() => {
    if (vista === 'caso' && fechaElegida) setAbiertas((xs) => (xs.includes(fechaElegida) ? xs : [...xs, fechaElegida]))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [casoId, vista])

  return (
    <nav aria-label="Treatment plans" className="flex shrink-0 flex-col self-start rounded-lg bg-white shadow-panel p-2 lg:max-h-[720px] lg:w-[300px]">
      <button
        onClick={onUnassigned}
        aria-current={vista === 'unassigned' ? 'page' : undefined}
        className={cn(
          'flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-[13px] font-medium transition-colors',
          vista === 'unassigned' ? 'bg-dash-blue text-white' : 'text-ink hover:bg-surface-muted',
        )}
      >
        <Captions className="size-4 shrink-0" /> Unassigned Items
      </button>
      <TooltipProvider delayDuration={200}>
      <ul className="mt-1 flex min-h-0 flex-col overflow-y-auto">
        {fechas.map((f) => {
          const delDia = casos.filter((c) => c.creado === f)
          const abierta = abiertas.includes(f)
          const estado = estadoGrupo(delDia)
          return (
            <li key={f}>
              <button
                onClick={() => alternar(f)}
                aria-expanded={abierta}
                aria-label={\`\${f}, \${estado}, \${delDia.length} \${delDia.length === 1 ? 'case' : 'cases'}\`}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors hover:bg-surface-muted"
              >
                <span className="text-[13px] text-ink tabular-nums">{f}</span>
                <Pill tone={TONO_CASO[estado]} size="sm" className="ml-auto tracking-wide whitespace-nowrap uppercase">{estado}</Pill>
                <ChevronRight className={cn('size-4 shrink-0 text-ink-faint transition-transform', abierta && 'rotate-90')} />
              </button>
              {abierta && (
                /* La línea del árbol une los casos con su fecha. */
                <ul className="relative mb-1 ml-5 flex flex-col gap-1 border-l border-line pl-3">
                  {delDia.map((c) => {
                    const on = vista === 'caso' && c.id === casoId
                    return (
                      <li key={c.id} className="relative before:absolute before:top-1/2 before:-left-3 before:w-2.5 before:border-t before:border-line">
                        {/* El punto del estado va sobre la línea del árbol, al inicio de cada caso. */}
                        <ConAyuda texto={c.estado}>
                          <span aria-label={c.estado} className={cn('absolute top-1/2 -left-[16.5px] z-10 size-2 -translate-y-1/2 rounded-full ring-2 ring-white', PUNTO_CASO[c.estado])} />
                        </ConAyuda>
                        <button
                          onClick={() => onCaso(c.id)}
                          aria-current={on ? 'page' : undefined}
                          aria-label={\`\${c.nombre}, \${c.estado}\`}
                          className={cn(
                            'flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left transition-colors',
                            on ? 'bg-dash-blue text-white' : 'hover:bg-surface-muted',
                          )}
                        >
                          <span className="bg-warning flex size-5 shrink-0 items-center justify-center rounded text-white">
                            <Bookmark className="size-3" fill="currentColor" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className={cn('block truncate text-[13px] font-medium', on ? 'text-white' : 'text-ink')}>{c.nombre}</span>
                            <span className={cn('flex items-center gap-1 text-[10px]', on ? 'text-white/80' : 'text-ink-muted')}>
                              <CalendarDays className="size-2.5" /> Update: {c.creado}
                            </span>
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
      </TooltipProvider>
    </nav>
  )
}

/* ── Tablas ───────────────────────────────────────────────────────── */

/* Estado del consentimiento de un procedimiento: ícono y palabra, en el color del estado. Ver clinical-mode.md. */
const CONSENT: Record<ConsentProcedimiento, { icono: LucideIcon; clase: string }> = {
  Signed: { icono: FileCheck2, clase: 'text-dash-ok-fg' },
  Pending: { icono: FileClock, clase: 'text-warn-fg' },
  'Not sent': { icono: FileMinus2, clase: 'text-ink-muted' },
  Expired: { icono: FileX2, clase: 'text-dash-bad-fg' },
}

export function EstadoConsentimiento({ estado }: { estado: ConsentProcedimiento }) {
  const { icono: Icono, clase } = CONSENT[estado]
  return (
    <span className={cn('flex items-center gap-1.5 text-[12px] font-medium whitespace-nowrap', clase)}>
      <Icono className="size-4 shrink-0" aria-hidden /> {estado}
    </span>
  )
}

/* Casilla del sistema: cuadrada, azul cuando está marcada. */
export function Casilla({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={cn(
        'flex size-4 shrink-0 items-center justify-center rounded border transition-colors',
        on ? 'border-dash-blue bg-dash-blue text-white' : 'border-line-strong bg-white hover:border-ink-faint',
      )}
    >
      {on && <Check className="size-3" strokeWidth={3} />}
    </button>
  )
}

export function TablaProcedimientos({
  filas, acciones, consentimiento, seleccion, onSeleccion, onAccion, onCompletar, arrastrable, sinMenu,
}: {
  filas: Procedimiento[]
  acciones?: boolean
  /** Mientras se planea: cada fila se arrastra a otra visita o a una nueva. */
  arrastrable?: boolean
  /** Sin el menú de la fila (quitar el procedimiento): un caso ya presentado no se edita. */
  sinMenu?: boolean
  /** Suma la columna Consent: sólo en los casos, los sueltos no tienen consentimiento. */
  consentimiento?: boolean
  /** Con selección, la tabla suma la columna de casillas. */
  seleccion?: string[]
  onSeleccion?: (ids: string[]) => void
  onAccion: (p: Procedimiento) => void
  onCompletar?: () => void
}) {
  const conCasillas = !!seleccion && !!onSeleccion
  const todas = conCasillas && filas.length > 0 && filas.every((f) => seleccion.includes(f.id))
  const columnas = [...COLUMNAS, ...(consentimiento ? ['Consent'] : []), 'Actions']

  return (
    <TooltipProvider delayDuration={200}>
    <div className="overflow-x-auto">
      <table className="w-full min-w-[860px] border-collapse">
        <thead>
          <tr className="border-y border-line-soft bg-surface-alt">
            {arrastrable && <th className="w-8" aria-label="Drag" />}
            {conCasillas && (
              <th className="w-10 px-3">
                <Casilla
                  on={todas}
                  label="Select all procedures"
                  onChange={(v) => onSeleccion(v ? filas.map((f) => f.id) : [])}
                />
              </th>
            )}
            {columnas.map((c) => (
              <th key={c} className="h-10 px-3 text-left text-[11px] font-semibold whitespace-nowrap text-ink-muted">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((p) => (
            <tr
              key={p.id}
              draggable={arrastrable}
              onDragStart={arrastrable ? (e) => { e.dataTransfer.setData('text/plain', p.id); e.dataTransfer.effectAllowed = 'move' } : undefined}
              className={cn(
                'border-b border-line-soft last:border-0',
                conCasillas && seleccion.includes(p.id) && 'bg-dash-count-bg',
                arrastrable && 'cursor-grab active:cursor-grabbing',
              )}
            >
              {arrastrable && (
                <td className="pl-3 text-ink-faint" aria-label={\`Drag \${p.codigo} to another visit\`}><GripVertical className="size-4" /></td>
              )}
              {conCasillas && (
                <td className="px-3">
                  <Casilla
                    on={seleccion.includes(p.id)}
                    label={\`Select \${p.codigo} from \${p.fecha}\`}
                    onChange={(v) =>
                      onSeleccion(v ? [...seleccion, p.id] : seleccion.filter((x) => x !== p.id))
                    }
                  />
                </td>
              )}
              <td className="h-12 px-3 text-[13px] whitespace-nowrap text-ink">{p.fecha}</td>
              <td className="px-3 text-[13px] text-ink">{p.superficie}</td>
              <td className="px-3 text-[13px] text-ink">{p.pieza}</td>
              <td className="px-3 text-[13px] text-ink">{p.ubicacion}</td>
              <td className="px-3 text-[13px] whitespace-nowrap text-ink">
                {p.codigo} {p.nombre}
              </td>
              <td className="px-3 text-[13px] whitespace-nowrap text-ink-soft">{p.proveedor}</td>
              <td className="px-3 text-[13px] whitespace-nowrap text-ink-soft tabular-nums">{p.fee}</td>
              <td className="px-3"><Pill tone={ESTADO_TONO[p.estado]}>{p.estado}</Pill></td>
              {consentimiento && (
                <td className="px-3">{p.consentimiento && <EstadoConsentimiento estado={p.consentimiento} />}</td>
              )}
              <td className="px-3">
                <span className="flex items-center gap-1">
                  {!sinMenu && (
                    <ConAyuda texto="More actions">
                      <button onClick={() => onAccion(p)} aria-label={\`Actions for \${p.codigo}\`} className={ICONO_SUELTO}>
                        <MoreVertical className="size-4" />
                      </button>
                    </ConAyuda>
                  )}
                  {acciones && (
                    <>
                      <ConAyuda texto="Complete procedure">
                        <button onClick={() => onCompletar?.()} aria-label={\`Complete \${p.codigo}\`} className={ICONO_SUELTO}>
                          <ClipboardList className="size-4" />
                        </button>
                      </ConAyuda>
                      <ConAyuda texto="Imaging">
                        <button onClick={() => aviso.info('Imaging is not available in this release.')} aria-label={\`Imaging for \${p.codigo}\`} className={ICONO_SUELTO}>
                          <Scan className="size-4" />
                        </button>
                      </ConAyuda>
                      <ConAyuda texto="Link to finding">
                        <button onClick={() => aviso.info('Linking is not available in this release.')} aria-label={\`Link \${p.codigo}\`} className={ICONO_SUELTO}>
                          <Link2 className="size-4" />
                        </button>
                      </ConAyuda>
                    </>
                  )}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </TooltipProvider>
  )
}

/* ── Caso ─────────────────────────────────────────────────────────── */

/* Mueve un procedimiento a otra visita, o a una nueva con \`destino\` null. Las visitas vacías se van y se renumeran. */
function moverEnVisitas(visitas: Visita[], id: string, destino: string | null): Visita[] {
  const proc = visitas.flatMap((v) => v.procedimientos).find((p) => p.id === id)
  const origen = visitas.find((v) => v.procedimientos.some((p) => p.id === id))
  if (!proc || !origen || origen.id === destino) return visitas
  let siguientes = visitas.map((v) => ({ ...v, procedimientos: v.procedimientos.filter((p) => p.id !== id) }))
  siguientes = destino
    ? siguientes.map((v) => (v.id === destino ? { ...v, procedimientos: [...v.procedimientos, proc] } : v))
    : [...siguientes, { id: \`v\${Date.now()}\`, nombre: '', total: '', procedimientos: [proc] }]
  return siguientes
    .filter((v) => v.procedimientos.length > 0)
    .map((v, i) => ({
      ...v,
      nombre: \`Visit \${i + 1}\`,
      total: \`$\${v.procedimientos.reduce((t, p) => t + Number(p.fee.replace(/[^0-9.]/g, '')), 0)}\`,
    }))
}

/* El turno de la visita (como "No appointment" en la app real): sin turno, avisa que el encuentro no tiene uno activo;
   con turno, muestra la fecha y abre el detalle. */
export function CitaVisita({ cita }: { cita?: Cita }) {
  const boton = 'flex h-7 shrink-0 items-center gap-1.5 rounded-md border border-line bg-white px-2.5 text-[12px] font-medium shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] transition-colors hover:bg-surface-subtle'
  if (!cita) {
    return (
      <button type="button" onClick={() => aviso.error('No active appointment. There is no active appointment in the current encounter.')} className={cn(boton, 'text-ink-medium')}>
        <CalendarX2 className="size-3.5" /> No appointment
      </button>
    )
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" aria-label={\`Appointment on \${cita.fecha} at \${cita.hora}\`} className={cn(boton, 'text-dash-blue')}>
          <CalendarCheck2 className="size-3.5" /> {cita.fecha} · {cita.hora}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[240px] gap-2 p-3">
        <span className="flex items-center justify-between gap-2">
          <span className="text-[13px] font-semibold text-ink">Appointment</span>
          <Pill tone="info" size="sm">Booked</Pill>
        </span>
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[12px]">
          <dt className="text-ink-muted">Date</dt><dd className="text-ink">{cita.fecha}</dd>
          <dt className="text-ink-muted">Time</dt><dd className="text-ink">{cita.hora}</dd>
          <dt className="text-ink-muted">Provider</dt><dd className="text-ink">{cita.proveedor}</dd>
        </dl>
      </PopoverContent>
    </Popover>
  )
}

/* Qué se ve según el estado (Julián, 2026-10-05). Planning: todo se edita (nombre, alternativa, Move to, categoría,
   visitas). Pending: sólo el ojo, para ver el plan antes de presentarlo. Desde Presented, nada de eso: la categoría
   queda como texto. Lo que no corresponde no se muestra, en vez de quedar deshabilitado. Un caso de una ubicación sin
   permiso (\`sinPermiso\`) lleva el aviso de acceso limitado y tampoco se edita. Las filas de las visitas se marcan
   siempre; lo que se hace con ellas depende del estado. */
export function VistaCaso({
  caso, favorito, onFavorito, onDialogo, onMover, onCompletar, onNuevaAlternativa, onVisitas,
}: {
  caso: Caso
  favorito: boolean
  onFavorito: () => void
  onDialogo: (d: ClaveDialogo | 'delete') => void
  onMover: () => void
  onCompletar: () => void
  onNuevaAlternativa?: () => void
  onVisitas?: (visitas: Visita[]) => void
}) {
  const [categoria, setCategoria] = useState('')
  const [notas, setNotas] = useState('')
  const [colapsado, setColapsado] = useState(false)
  const [soltando, setSoltando] = useState<string | null>(null)
  const [seleccion, setSeleccion] = useState<string[]>([])
  const planificando = caso.estado === 'Planning' && !caso.sinPermiso
  const antesDePresentar = caso.estado === 'Planning' || caso.estado === 'Pending'
  /* Cada tabla marca y desmarca sólo sus filas: las de las otras visitas quedan como estaban. */
  const marcarEn = (ids: string[]) => (nuevos: string[]) => setSeleccion((sel) => [...new Set([...sel.filter((x) => !ids.includes(x)), ...nuevos])])
  const elegir = (a: AccionMenu) => {
    if (a.clave === 'consent') aviso.ok('Consent generated and sent to the patient for signature.')
    else onDialogo(a.clave)
  }
  const itemMenu = (a: AccionMenu) => (
    <DropdownMenuItem key={a.clave} onSelect={() => elegir(a)} className={cn('gap-2 text-[13px]', a.peligro && 'text-dash-bad-fg focus:text-dash-bad-fg')}>
      <a.icono className={cn('size-4', a.peligro ? 'text-dash-bad-fg' : 'text-ink-muted')} /> {a.label}
    </DropdownMenuItem>
  )
  const accionesCaso = ACCIONES_CASO[caso.estado] ?? []

  const soltar = (destino: string | null) => (e: React.DragEvent) => {
    e.preventDefault()
    setSoltando(null)
    const id = e.dataTransfer.getData('text/plain')
    if (id) onVisitas?.(moverEnVisitas(caso.visitas, id, destino))
  }
  const sobre = (destino: string) => (e: React.DragEvent) => { e.preventDefault(); setSoltando(destino) }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg bg-white shadow-panel p-4 sm:p-5">
        {caso.sinPermiso && (
          <Alert tone="warning" title="Limited access to this treatment case" className="mb-4">
            You do not have permission to update treatment plans for this location.
          </Alert>
        )}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onFavorito}
            aria-label={\`\${favorito ? 'Unmark' : 'Mark'} \${caso.nombre} as favourite\`}
            aria-pressed={favorito}
            className={cn(
              'flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors',
              favorito ? 'bg-dash-blue text-white' : 'border border-line bg-white text-ink hover:bg-surface-subtle',
            )}
          >
            <Bookmark className="size-4" fill={favorito ? 'currentColor' : 'none'} />
          </button>
          <span className="min-w-0 flex-1 text-[17px] font-bold text-ink">{caso.nombre}</span>
          {/* Plegado, el encabezado conserva lo que se consulta sin abrir: estado y total. */}
          {colapsado && (
            <span className="flex shrink-0 items-center gap-3">
              <Pill tone={TONO_CASO[caso.estado]} className="px-2 py-[2px]">{caso.estado}</Pill>
              <span className={CAJA_TOTAL}>
                Total Amount: <span className="text-dash-blue ml-1">{caso.total}</span>
              </span>
            </span>
          )}
          {/* En el orden de la app real: New Alternative Case, lápiz, ojo y Move to. */}
          <TooltipProvider delayDuration={150}>
            <span className="ml-auto flex shrink-0 items-center gap-3">
              {planificando && (
                <Button onClick={onNuevaAlternativa}>
                  <Plus /> New Alternative Case
                </Button>
              )}
              {planificando && (
                <AccionCaso habilitado tooltip="Rename case" tooltipDeshabilitado="" onClick={() => aviso.info('Renaming a case is not available in this release.')} aria-label="Rename case" claseBoton="text-ink-medium">
                  <Pencil className="size-4" />
                </AccionCaso>
              )}
              {antesDePresentar && (
                <AccionCaso habilitado tooltip="Preview case" tooltipDeshabilitado="" onClick={() => aviso.info('The case preview is not available in this release.')} aria-label="Preview case" claseBoton="text-ink-medium">
                  <Eye className="size-4" />
                </AccionCaso>
              )}
              {planificando && (
                <button onClick={onMover} className="text-dash-blue flex items-center gap-1 text-[13px] font-semibold hover:underline">
                  Move to <CornerUpLeft className="size-3.5" />
                </button>
              )}
            </span>
          </TooltipProvider>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button aria-label="Case actions" className={\`\${ICONO_SUELTO} size-9 shrink-0\`}>
                <MoreVertical className="size-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[210px]">
              <DropdownMenuLabel className="text-[12px] font-semibold text-ink">Actions Case</DropdownMenuLabel>
              {accionesCaso.length ? accionesCaso.map(itemMenu) : <p className="px-2 pb-1.5 text-[12px] text-ink-muted italic">No case actions available</p>}
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-[12px] font-semibold text-ink">Actions Treatment</DropdownMenuLabel>
              {ACCIONES_TRATAMIENTO[caso.estado].map(itemMenu)}
            </DropdownMenuContent>
          </DropdownMenu>
          <button
            onClick={() => setColapsado((v) => !v)}
            aria-expanded={!colapsado}
            aria-label={colapsado ? 'Expand case' : 'Collapse case'}
            className={\`\${ICONO_SUELTO} size-9\`}
          >
            <ChevronDown className={cn('size-4 transition-transform', colapsado && '-rotate-90')} />
          </button>
        </div>

        {!colapsado && (<>
        <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-2">
          <span className="text-[13px] text-ink">
            Create on: <span className="text-dash-blue font-medium">{caso.creado}</span>
          </span>
          <span className="text-[13px] text-ink">
            Create by: <span className="text-dash-blue font-medium">{caso.creadoPor}</span>
          </span>
          <span className="ml-auto flex items-center gap-2 text-[13px] text-ink">
            Status:
            <Pill tone={TONO_CASO[caso.estado]} className="px-2 py-[2px]">{caso.estado}</Pill>
          </span>
        </div>

        {/* Una sola línea: categoría, notas y total. La categoría no necesita el ancho de media card.
            Es un combo sólo mientras se planea; después queda como texto. */}
        <div className="mt-4 flex flex-wrap items-start gap-4">
          {planificando ? (
            <SelectField
              label="Treatment Case Category"
              required
              value={categoria}
              onChange={setCategoria}
              options={CATEGORIAS}
              className="w-[240px] max-w-full"
            />
          ) : (
            <div className="w-[240px] max-w-full">
              <span className="block text-xs font-medium text-ink">Treatment Case Category</span>
              <p className="mt-2 flex h-9 items-center text-[13px] font-medium text-ink">{categoria || '—'}</p>
            </div>
          )}
          <div className="min-w-[260px] flex-1">
            <span className="block text-xs font-medium text-ink">
              Additional Discussion Notes<span className="text-required">*</span>
            </span>
            <div className="relative mt-2">
              <textarea
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                rows={2}
                placeholder="Include patient history, previous treatments, and specific questions for the specialist..."
                className="focus:border-dash-blue w-full resize-none rounded-md border border-line p-3 pr-10 text-[13px] placeholder:text-ink-faint focus:outline-none"
              />
              <button
                onClick={() => aviso.ok('Discussion notes saved.')}
                aria-label="Save notes"
                className="absolute right-2 bottom-2 text-ink-medium hover:opacity-70"
              >
                <Save className="size-4" />
              </button>
            </div>
          </div>
          {/* Sin rótulo propio: baja lo que miden el rótulo y el gap de los campos (16 + 8) para alinear con los controles. */}
          <div className={cn(CAJA_TOTAL, 'mt-6')}>
            Total Amount: <span className="text-dash-blue ml-1">{caso.total}</span>
          </div>
        </div>
        </>)}
      </div>

      {/* Con filas marcadas, la barra dice cuántas y qué se puede hacer con ellas en este estado. */}
      {seleccion.length > 0 && (
        <div className="bg-dash-count-bg flex flex-wrap items-center gap-3 rounded-md px-3 py-2">
          <span className="text-dash-blue-hover text-[13px] font-semibold">{seleccion.length} selected</span>
          {planificando && (
            <>
              <button onClick={onMover} className="text-dash-blue text-[13px] font-semibold hover:underline">Move to</button>
              <button onClick={() => onDialogo('removeProcedure')} className="text-[13px] font-semibold text-dash-bad-fg hover:underline">Remove</button>
            </>
          )}
          {(caso.estado === 'Accepted' || caso.estado === 'Waiting for consent') && (
            <button onClick={onCompletar} className="text-dash-blue text-[13px] font-semibold hover:underline">Complete</button>
          )}
          <button onClick={() => setSeleccion([])} className="ml-auto text-[13px] font-medium text-ink-muted hover:underline">Clear</button>
        </div>
      )}

      {/* El turno de la visita va afuera de su tabla, arriba a la derecha; la visita queda como estaba. */}
      {caso.visitas.map((v) => (
        <section key={v.id} aria-label={v.nombre} className="flex flex-col gap-2">
          <div className="flex justify-end"><CitaVisita cita={v.cita} /></div>
          <div
            onDragOver={planificando ? sobre(v.id) : undefined}
            onDragLeave={planificando ? () => setSoltando(null) : undefined}
            onDrop={planificando ? soltar(v.id) : undefined}
            className={cn('overflow-hidden rounded-xl border bg-white transition-colors', soltando === v.id ? 'border-dash-blue ring-dash-blue/30 ring-2' : 'border-line')}
          >
            <div className="bg-dash-blue px-4 py-2 text-[13px] font-semibold text-white">
              {v.nombre} - {v.total}
            </div>
            <TablaProcedimientos
              filas={v.procedimientos}
              acciones
              consentimiento
              arrastrable={planificando}
              sinMenu={!planificando}
              seleccion={seleccion}
              onSeleccion={marcarEn(v.procedimientos.map((p) => p.id))}
              onAccion={() => onDialogo('removeProcedure')}
              onCompletar={onCompletar}
            />
          </div>
        </section>
      ))}

      {/* Mientras se planea, soltar un procedimiento acá arma una visita nueva con él. */}
      {planificando && (
        <div
          onDragOver={sobre('nueva')}
          onDragLeave={() => setSoltando(null)}
          onDrop={soltar(null)}
          className={cn(
            'flex h-16 items-center justify-center rounded-xl border-2 border-dashed text-[13px] font-medium transition-colors',
            soltando === 'nueva' ? 'border-dash-blue bg-dash-count-bg text-dash-blue' : 'border-line bg-surface-subtle text-ink-muted',
          )}
        >
          Drag procedure here to create new visit
        </div>
      )}
    </div>
  )
}

/* ── Sección ──────────────────────────────────────────────────────── */

export function TreatmentPlanSection({ casoInicial }: { casoInicial?: string }) {
  /* Se entra por Unassigned, como el frame por defecto (4118:220406), salvo que se llegue desde una card del Overview. */
  const [vista, setVista] = useState<'unassigned' | 'caso'>(casoInicial ? 'caso' : 'unassigned')
  const [casoId, setCasoId] = useState(casoInicial ?? CASOS[0].id)
  const [dialogo, setDialogo] = useState<ClaveDialogo | 'delete' | null>(null)
  const [mover, setMover] = useState(false)
  const [grupo, setGrupo] = useState(false)
  const [completar, setCompletar] = useState(false)
  const [favoritos, setFavoritos] = useState<string[]>([])
  const [seleccion, setSeleccion] = useState<string[]>([])
  const [casos, setCasos] = useState<Caso[]>(CASOS)
  const caso = casos.find((c) => c.id === casoId) ?? casos[0]!
  const cambiarCaso = (cambio: Partial<Caso>) => setCasos((cs) => cs.map((c) => (c.id === caso.id ? { ...c, ...cambio } : c)))

  /* La alternativa nace como copia del caso, en Planning y con la misma fecha: queda al lado en la lista. */
  const nuevaAlternativa = () => {
    const id = \`\${caso.id}-alt-\${Date.now()}\`
    const n = casos.filter((c) => c.grupo === caso.grupo).length
    setCasos((cs) => [...cs, { ...caso, id, nombre: \`\${caso.nombre.replace(/ Alternative( \\d+)?$/, '')} Alternative \${n}\`, estado: 'Planning' }])
    setCasoId(id)
    aviso.ok('Alternative case created.')
  }

  const alternarFavorito = (id: string) =>
    setFavoritos((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]))

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <Rail
        casos={casos}
        vista={vista}
        casoId={caso.id}
        onUnassigned={() => setVista('unassigned')}
        onCaso={(id) => { setCasoId(id); setVista('caso') }}
      />

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        {vista === 'caso' && <ConsentBlock />}

        {vista === 'unassigned' ? (
          <div className="rounded-lg bg-white shadow-panel p-4 sm:p-5">
            <div className="flex flex-wrap items-center gap-3">
              <p className="min-w-0 flex-1 text-[17px] font-bold text-ink">Unassigned</p>
              {['New Case Group', 'New Alternative Case'].map((t) => (
                <button
                  key={t}
                  onClick={t === 'New Alternative Case' ? () => setMover(true) : () => setGrupo(true)}
                  className="bg-dash-blue hover:bg-dash-blue-hover flex h-9 shrink-0 items-center gap-1.5 rounded-md px-4 text-[13px] font-semibold text-white transition-colors"
                >
                  <Plus className="size-3.5" /> {t}
                </button>
              ))}
              <button
                onClick={() => setMover(true)}
                className="text-dash-blue flex shrink-0 items-center gap-1 text-[13px] font-semibold hover:underline"
              >
                Move to <CornerUpLeft className="size-3.5" />
              </button>
            </div>
            {/* Con filas marcadas, la barra dice cuántas y ofrece qué hacer
                con ellas: seleccionar sin acción no sirve de nada. */}
            {seleccion.length > 0 && (
              <div className="bg-dash-count-bg mt-3 flex flex-wrap items-center gap-3 rounded-md px-3 py-2">
                <span className="text-dash-blue-hover text-[13px] font-semibold">
                  {seleccion.length} selected
                </span>
                <button
                  onClick={() => setMover(true)}
                  className="text-dash-blue text-[13px] font-semibold hover:underline"
                >
                  Move to
                </button>
                <button
                  onClick={() => setDialogo('removeProcedure')}
                  className="text-[13px] font-semibold text-dash-bad-fg hover:underline"
                >
                  Remove
                </button>
                <button
                  onClick={() => setSeleccion([])}
                  className="ml-auto text-[13px] font-medium text-ink-muted hover:underline"
                >
                  Clear
                </button>
              </div>
            )}
            <div className="mt-4 -mx-4 sm:-mx-5">
              <TablaProcedimientos
                filas={NO_ASIGNADOS}
                seleccion={seleccion}
                onSeleccion={setSeleccion}
                onAccion={() => setDialogo('removeProcedure')}
              />
            </div>
            {/* El pie del frame dice "insurances" en una tabla de
                procedimientos. Se replica. */}
            <p className="mt-3 text-[12px] text-ink-muted">
              Showing {NO_ASIGNADOS.length} of {NO_ASIGNADOS.length} insurances
            </p>
          </div>
        ) : (
          <VistaCaso
            key={caso.id}
            caso={caso}
            favorito={favoritos.includes(caso.id)}
            onFavorito={() => alternarFavorito(caso.id)}
            onDialogo={setDialogo}
            onMover={() => setMover(true)}
            onCompletar={() => setCompletar(true)}
            onNuevaAlternativa={nuevaAlternativa}
            onVisitas={(visitas) => cambiarCaso({ visitas })}
          />
        )}
      </div>

      {mover && <DialogoMover onClose={() => setMover(false)} />}
      {grupo && <DialogoNuevoGrupo onClose={() => setGrupo(false)} />}
      {completar && <DialogoCompletar onClose={() => setCompletar(false)} />}
      {dialogo === 'delete' && (
        <DialogoBorrarCaso
          onClose={() => setDialogo(null)}
          onConfirm={(op) =>
            aviso.ok(op === 'solo-caso' ? 'Case deleted.' : 'Case and procedures deleted.')
          }
        />
      )}
      {dialogo && dialogo !== 'delete' && (
        <Dialogo
          titulo={DIALOGOS[dialogo].titulo}
          texto={DIALOGOS[dialogo].texto}
          onClose={() => setDialogo(null)}
          onConfirm={() => {
            const nuevo = ESTADO_TRAS[dialogo]
            if (nuevo) cambiarCaso({ estado: nuevo })
            aviso.ok(\`\${DIALOGOS[dialogo].titulo} confirmed.\`)
          }}
        />
      )}
    </div>
  )
}
`})))()}export{n,i as r,r as t};