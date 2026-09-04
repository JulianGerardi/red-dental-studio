import { useState } from 'react'
import {
  Bookmark, Pencil, Plus, MoreVertical, CornerUpLeft, ChevronDown, SquareX,
  LoaderCircle, Check, FileText, Eye, Save, Link2, ClipboardList, Scan, X,
  CalendarDays,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { ConsentBlock } from '@/components/clinical/ConsentBlock'
import {
  CASOS, NO_ASIGNADOS, CATEGORIAS, DIALOGOS, OPCIONES_BORRAR_CASO, MOVER,
  NUEVO_GRUPO, COMPLETAR,
  type Caso, type Procedimiento, type ClaveDialogo,
} from '@/data/treatment-plan'
import { ICONO_SUELTO } from '@/lib/estilos'
import { SelectField } from '@/components/patients/form'

/* Figma 4118:220403 "Treatment Plan — Section (Cases, Workflow & Dialogs)":
   el rail de estados, la tabla de no asignados, el caso con sus visitas y los
   diálogos. */

const COLUMNAS = ['Date', 'Surface', 'Tooth', 'Location', 'Procedure', 'Provider', 'Fee', 'Status', 'Actions']

const ESTADO_PILL: Record<Procedimiento['estado'], string> = {
  Planned: 'border-[#1a804d] bg-[#f0fcf5] text-[#1a804d]',
  Completed: 'border-[#174596] bg-[#f0f5ff] text-[#174596]',
  Removed: 'border-[#595959] bg-[#f5f5f5] text-[#595959]',
}

/* ── Diálogos ─────────────────────────────────────────────────────── */

function Dialogo({
  titulo, bajada, texto, children, onConfirm, onClose, confirmar = 'Confirm',
}: {
  titulo: string
  /** Bajada del título. Va en su columna, no a lo ancho: suelta se metía
      debajo de la X. */
  bajada?: readonly string[]
  texto?: readonly string[]
  children?: React.ReactNode
  onConfirm: () => void
  onClose: () => void
  confirmar?: string
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-label={titulo}
        onClick={(e) => e.stopPropagation()}
        className="motion-safe:animate-[loc-in_160ms_ease-out] w-full max-w-[440px] rounded-xl bg-white p-5 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <span className="min-w-0">
            <h2 className="text-[18px] leading-tight font-bold text-[#09090b]">{titulo}</h2>
            {bajada?.map((t) => (
              <p key={t} className="mt-1.5 text-[12px] leading-[1.5] text-[#71717a]">{t}</p>
            ))}
          </span>
          <button onClick={onClose} aria-label="Close" className="shrink-0 text-[#09090b] hover:opacity-60">
            <X className="size-4" />
          </button>
        </div>
        {texto?.map((t) => (
          <p key={t} className="mt-2 text-[13px] text-[#71717a]">{t}</p>
        ))}
        {children}
        <div className="mt-5 flex flex-nowrap items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="h-9 shrink-0 rounded-md border border-[#e4e4e7] px-4 text-[13px] font-medium whitespace-nowrap hover:bg-[#fafafa]"
          >
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(); onClose() }}
            className="bg-dash-blue hover:bg-dash-blue-hover h-9 shrink-0 rounded-md px-4 text-[13px] font-semibold whitespace-nowrap text-white transition-colors"
          >
            {confirmar}
          </button>
        </div>
      </div>
    </div>
  )
}

/* Tarjeta con radio: la usan Delete Case y Move Procedure. */
function OpcionRadio({
  on, titulo, detalle, onClick,
}: { on: boolean; titulo: string; detalle: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex gap-3 rounded-lg border px-3.5 py-3 text-left transition-colors',
        on ? 'border-dash-blue' : 'border-[#e4e4e7] hover:bg-[#fafafa]',
      )}
    >
      <span
        className={cn(
          'mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border-2',
          on ? 'border-dash-blue' : 'border-[#a1a1aa]',
        )}
      >
        {on && <span className="bg-dash-blue size-2 rounded-full" />}
      </span>
      <span className="min-w-0">
        <span className="block text-[13px] font-semibold text-[#09090b]">{titulo}</span>
        <span className="mt-1 block text-[12px] leading-[1.5] text-[#71717a]">{detalle}</span>
      </span>
    </button>
  )
}

/* Figma 4122:246942. El mismo modal sale de New Alternative Case y de Move to. */
function DialogoMover({ onClose }: { onClose: () => void }) {
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
            ? `Procedure moved to ${caso}.`
            : `Procedure added to ${caso} and kept in the original plan.`,
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
      <p className="mt-5 text-xs font-medium text-[#09090b]">Select destination case</p>
      <div className="mt-2.5 flex flex-col gap-2.5">
        {MOVER.opciones.map((o) => (
          <OpcionRadio key={o.id} on={op === o.id} titulo={o.titulo} detalle={o.detalle} onClick={() => setOp(o.id)} />
        ))}
      </div>
    </Dialogo>
  )
}

/* Figma 4122:246100. Un solo campo. */
function DialogoNuevoGrupo({ onClose }: { onClose: () => void }) {
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
        aviso.ok(`${nombre} case group created.`)
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
function DialogoCompletar({ onClose }: { onClose: () => void }) {
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
            : `Procedure completed and ${marcadas.length} condition${marcadas.length > 1 ? 's' : ''} marked as treated.`,
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
                'rounded-r-md border border-l-[3px] border-[#f1f1f4] border-l-[#1a804d] p-3 transition-colors',
                on && 'border-dash-blue border-l-[#1a804d] bg-dash-count-bg',
              )}
            >
              <div className="flex items-center gap-2">
                <Casilla
                  on={on}
                  label={`Mark ${c.zona} as treated`}
                  onChange={(v) => setMarcadas((m) => (v ? [...m, c.id] : m.filter((x) => x !== c.id)))}
                />
                <span className="rounded-full border border-[#1a804d] bg-[#f0fcf5] px-2 py-[2px] text-[11px] font-semibold text-[#1a804d]">
                  {c.estado}
                </span>
                <span className="text-dash-blue flex items-center gap-1 text-[12px] font-medium">
                  <CalendarDays className="size-3" /> {c.fecha}
                </span>
                <button
                  onClick={() => aviso.info('Condition actions are not available in this release.')}
                  aria-label={`Actions for ${c.zona}`}
                  className={`${ICONO_SUELTO} ml-auto`}
                >
                  <MoreVertical className="size-4" />
                </button>
              </div>
              <p className="mt-2 text-[13px] font-bold text-[#09090b]">{c.zona}</p>
              <p className="text-[12px] text-[#52525b]">
                Condition: <span className="text-[#71717a]">{c.condicion}</span>
              </p>
              <p className="text-[12px] text-[#52525b]">
                Descriptors: <span className="text-[#71717a]">{c.descriptores}</span>
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

function DialogoBorrarCaso({ onConfirm, onClose }: { onConfirm: (op: string) => void; onClose: () => void }) {
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
      <p className="mt-4 text-[13px] font-semibold text-[#09090b]">Select destination case</p>
      <div className="mt-2 flex flex-col gap-2">
        {OPCIONES_BORRAR_CASO.map((o) => (
          <OpcionRadio key={o.id} on={op === o.id} titulo={o.titulo} detalle={o.detalle} onClick={() => setOp(o.id)} />
        ))}
      </div>
    </Dialogo>
  )
}

/* ── Rail de estados ──────────────────────────────────────────────── */

function Rail({
  vista, casoId, favoritos, onFavorito, onUnassigned, onCaso,
}: {
  vista: 'unassigned' | 'caso'
  casoId: string
  favoritos: string[]
  onFavorito: (id: string) => void
  onUnassigned: () => void
  onCaso: (id: string) => void
}) {
  const [abierto, setAbierto] = useState(true)

  /* Medido: "Periodontists Recommended" pide 179px de texto; con el ícono y el
     padding la columna necesita 240. Con 190 se cortaba. */
  return (
    <nav className="shrink-0 lg:w-[240px]">
      <button
        onClick={onUnassigned}
        className={cn(
          'flex w-full items-center gap-2 rounded-md px-2 py-2 text-[13px] transition-colors',
          vista === 'unassigned' ? 'bg-dash-blue font-medium text-white' : 'text-[#52525b] hover:bg-[#f4f4f5]',
        )}
      >
        <SquareX className="size-4 shrink-0" /> Unassigned
      </button>

      <button
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        className="mt-1 flex w-full items-center gap-2 rounded-md px-2 py-2 text-[13px] text-[#52525b] transition-colors hover:bg-[#f4f4f5]"
      >
        <LoaderCircle className="size-4 shrink-0" />
        <span className="min-w-0 flex-1 text-left">Pending Decision</span>
        <ChevronDown className={cn('size-4 shrink-0 transition-transform', !abierto && '-rotate-90')} />
      </button>

      {abierto && (
        <div className="mt-1 flex flex-col gap-1 pl-3">
          {CASOS.map((c) => {
            const on = vista === 'caso' && c.id === casoId
            return (
              <span
                key={c.id}
                className={cn(
                  'flex items-center gap-2 rounded-md pr-1 transition-colors',
                  on ? 'bg-dash-blue text-white' : 'text-[#52525b] hover:bg-[#f4f4f5]',
                )}
              >
                {/* El bookmark marca favorito; el resto de la fila navega. */}
                <button
                  onClick={() => onFavorito(c.id)}
                  aria-label={`${favoritos.includes(c.id) ? 'Unmark' : 'Mark'} ${c.nombre} as favourite`}
                  aria-pressed={favoritos.includes(c.id)}
                  className="shrink-0 py-2 pl-2 hover:opacity-70"
                >
                  <Bookmark
                    className="size-4"
                    fill={favoritos.includes(c.id) ? 'currentColor' : 'none'}
                  />
                </button>
                <button
                  onClick={() => onCaso(c.id)}
                  aria-current={on ? 'page' : undefined}
                  className={cn('min-w-0 flex-1 truncate py-2 text-left text-[13px]', on && 'font-medium')}
                >
                  {c.nombre}
                </button>
              </span>
            )
          })}
        </div>
      )}

      {/* "Acepted" y "Discarted" son los typos del frame. */}
      {[
        { label: 'Acepted', icono: Check },
        { label: 'Discarted', icono: FileText },
      ].map(({ label, icono: Icono }) => (
        <button
          key={label}
          onClick={() => aviso.info(`${label} cases are not available in this release.`)}
          className="mt-1 flex w-full items-center gap-2 rounded-md px-2 py-2 text-[13px] text-[#52525b] transition-colors hover:bg-[#f4f4f5]"
        >
          <Icono className="size-4 shrink-0" /> {label}
        </button>
      ))}
    </nav>
  )
}

/* ── Tablas ───────────────────────────────────────────────────────── */

/* Casilla del sistema: cuadrada, azul cuando está marcada. */
function Casilla({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={cn(
        'flex size-4 shrink-0 items-center justify-center rounded border transition-colors',
        on ? 'border-dash-blue bg-dash-blue text-white' : 'border-[#d4d4d8] bg-white hover:border-[#a1a1aa]',
      )}
    >
      {on && <Check className="size-3" strokeWidth={3} />}
    </button>
  )
}

function TablaProcedimientos({
  filas, acciones, seleccion, onSeleccion, onAccion, onCompletar,
}: {
  filas: Procedimiento[]
  acciones?: boolean
  /** Con selección, la tabla suma la columna de casillas. */
  seleccion?: string[]
  onSeleccion?: (ids: string[]) => void
  onAccion: (p: Procedimiento) => void
  onCompletar?: () => void
}) {
  const conCasillas = !!seleccion && !!onSeleccion
  const todas = conCasillas && filas.length > 0 && filas.every((f) => seleccion.includes(f.id))

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[860px] border-collapse">
        <thead>
          <tr className="border-y border-[#f1f1f4] bg-[#fafafa]">
            {conCasillas && (
              <th className="w-10 px-3">
                <Casilla
                  on={todas}
                  label="Select all procedures"
                  onChange={(v) => onSeleccion(v ? filas.map((f) => f.id) : [])}
                />
              </th>
            )}
            {COLUMNAS.map((c) => (
              <th key={c} className="h-10 px-3 text-left text-[11px] font-semibold whitespace-nowrap text-[#71717a]">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((p) => (
            <tr
              key={p.id}
              className={cn(
                'border-b border-[#f1f1f4] last:border-0',
                conCasillas && seleccion.includes(p.id) && 'bg-dash-count-bg',
              )}
            >
              {conCasillas && (
                <td className="px-3">
                  <Casilla
                    on={seleccion.includes(p.id)}
                    label={`Select ${p.codigo} from ${p.fecha}`}
                    onChange={(v) =>
                      onSeleccion(v ? [...seleccion, p.id] : seleccion.filter((x) => x !== p.id))
                    }
                  />
                </td>
              )}
              <td className="h-12 px-3 text-[13px] whitespace-nowrap text-[#09090b]">{p.fecha}</td>
              <td className="px-3 text-[13px] text-[#09090b]">{p.superficie}</td>
              <td className="px-3 text-[13px] text-[#09090b]">{p.pieza}</td>
              <td className="px-3 text-[13px] text-[#09090b]">{p.ubicacion}</td>
              <td className="px-3 text-[13px] whitespace-nowrap text-[#09090b]">
                {p.codigo} {p.nombre}
              </td>
              <td className="px-3 text-[13px] whitespace-nowrap text-[#52525b]">{p.proveedor}</td>
              <td className="px-3 text-[13px] whitespace-nowrap text-[#52525b] tabular-nums">{p.fee}</td>
              <td className="px-3">
                <span className={cn('rounded-full border px-2 py-[2px] text-[11px] font-semibold', ESTADO_PILL[p.estado])}>
                  {p.estado}
                </span>
              </td>
              <td className="px-3">
                <span className="flex items-center gap-1">
                  <button
                    onClick={() => onAccion(p)}
                    aria-label={`Actions for ${p.codigo}`}
                    className={ICONO_SUELTO}
                  >
                    <MoreVertical className="size-4" />
                  </button>
                  {acciones && (
                    <>
                      <button
                        onClick={() => onCompletar?.()}
                        aria-label={`Complete ${p.codigo}`}
                        className={ICONO_SUELTO}
                      >
                        <ClipboardList className="size-4" />
                      </button>
                      <button
                        onClick={() => aviso.info('Imaging is not available in this release.')}
                        aria-label={`Imaging for ${p.codigo}`}
                        className={ICONO_SUELTO}
                      >
                        <Scan className="size-4" />
                      </button>
                      <button
                        onClick={() => aviso.info('Linking is not available in this release.')}
                        aria-label={`Link ${p.codigo}`}
                        className={ICONO_SUELTO}
                      >
                        <Link2 className="size-4" />
                      </button>
                    </>
                  )}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ── Caso ─────────────────────────────────────────────────────────── */

function VistaCaso({
  caso, favorito, onFavorito, onDialogo, onMover, onGrupo, onCompletar,
}: {
  caso: Caso
  favorito: boolean
  onFavorito: () => void
  onDialogo: (d: ClaveDialogo | 'delete') => void
  onMover: () => void
  onGrupo: () => void
  onCompletar: () => void
}) {
  const [categoria, setCategoria] = useState('')
  const [notas, setNotas] = useState('')
  const [menu, setMenu] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-[#e4e4e7] bg-white p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onFavorito}
            aria-label={`${favorito ? 'Unmark' : 'Mark'} ${caso.nombre} as favourite`}
            aria-pressed={favorito}
            className={cn(
              'flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors',
              favorito ? 'bg-dash-blue text-white' : 'border border-[#e4e4e7] bg-white text-[#09090b] hover:bg-[#fafafa]',
            )}
          >
            <Bookmark className="size-4" fill={favorito ? 'currentColor' : 'none'} />
          </button>
          <span className="min-w-0 flex-1 text-[17px] font-bold text-[#09090b]">{caso.nombre}</span>
          <button
            onClick={() => aviso.info('Renaming a case is not available in this release.')}
            aria-label="Rename case"
            className="shrink-0 text-[#52525b] hover:opacity-70"
          >
            <Pencil className="size-4" />
          </button>
          <button
            onClick={onMover}
            className="text-dash-blue ml-auto flex shrink-0 items-center gap-1 text-[13px] font-semibold hover:underline"
          >
            Move to <CornerUpLeft className="size-3.5" />
          </button>
          <div className="relative shrink-0">
            <button
              onClick={() => setMenu((v) => !v)}
              aria-label="Case actions"
              aria-expanded={menu}
              className={`${ICONO_SUELTO} size-9`}
            >
              <MoreVertical className="size-4" />
            </button>
            {menu && (
              <div className="absolute top-full right-0 z-30 mt-1 w-[190px] rounded-lg border border-[#e4e4e7] bg-white p-1 shadow-[0_12px_32px_rgb(0_0_0/0.18)]">
                {([
                  ['Present Case', 'present'],
                  ['Accept Case', 'accept'],
                  ['Discard Case', 'discard'],
                  ['Delete Case', 'delete'],
                ] as const).map(([label, clave]) => (
                  <button
                    key={clave}
                    onClick={() => { setMenu(false); onDialogo(clave) }}
                    className="block w-full rounded px-3 py-2 text-left text-[13px] hover:bg-[#f4f4f5]"
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap justify-end gap-2">
          {['New Case Group', 'New Alternative Case'].map((t) => (
            <button
              key={t}
              onClick={t === 'New Alternative Case' ? onMover : onGrupo}
              className="bg-dash-blue hover:bg-dash-blue-hover flex h-9 items-center gap-1.5 rounded-md px-4 text-[13px] font-semibold text-white transition-colors"
            >
              <Plus className="size-3.5" /> {t}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-2">
          <span className="text-[13px] text-[#09090b]">
            Create on: <span className="text-dash-blue font-medium">{caso.creado}</span>
          </span>
          <span className="text-[13px] text-[#09090b]">
            Create by: <span className="text-dash-blue font-medium">{caso.creadoPor}</span>
          </span>
          <span className="ml-auto flex items-center gap-2 text-[13px] text-[#09090b]">
            Status:
            <span className="rounded-full border border-[#99660d] bg-[#fffaf0] px-2 py-[2px] text-[11px] font-semibold text-[#99660d]">
              {caso.estado}
            </span>
          </span>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div>
            <span className="block text-xs font-medium text-[#09090b]">
              Treatment Case Category<span className="text-[#ff0608]">*</span>
            </span>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="focus:border-dash-blue mt-1.5 h-10 w-full rounded-md border border-[#e4e4e7] bg-white px-3 text-[13px] focus:outline-none"
            >
              <option value="">Select</option>
              {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
            </select>
            <button
              onClick={() => aviso.info('The case preview is not available in this release.')}
              className="text-dash-blue mt-2 flex items-center gap-1.5 text-[13px] font-semibold hover:underline"
            >
              Preview <Eye className="size-3.5" />
            </button>
          </div>
          <div>
            <span className="block text-xs font-medium text-[#09090b]">
              Additional Discussion Notes<span className="text-[#ff0608]">*</span>
            </span>
            <div className="relative mt-1.5">
              <textarea
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                rows={3}
                placeholder="Include patient history, previous treatments, and specific questions for the specialist..."
                className="focus:border-dash-blue w-full resize-none rounded-md border border-[#e4e4e7] p-3 pr-10 text-[13px] placeholder:text-[#a1a1aa] focus:outline-none"
              />
              <button
                onClick={() => aviso.ok('Discussion notes saved.')}
                aria-label="Save notes"
                className="absolute right-2 bottom-2 text-[#52525b] hover:opacity-70"
              >
                <Save className="size-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-dash-count-bg mt-4 w-fit rounded-md px-3 py-2 text-[13px] font-semibold text-[#09090b]">
          Total Amount: <span className="text-dash-blue">{caso.total}</span>
        </div>
      </div>

      {caso.visitas.map((v) => (
        <div key={v.id} className="overflow-hidden rounded-xl border border-[#e4e4e7] bg-white">
          <div className="bg-dash-blue px-4 py-2 text-[13px] font-semibold text-white">
            {v.nombre} - {v.total}
          </div>
          <TablaProcedimientos
            filas={v.procedimientos}
            acciones
            onAccion={() => onDialogo('removeProcedure')}
            onCompletar={onCompletar}
          />
        </div>
      ))}
    </div>
  )
}

/* ── Sección ──────────────────────────────────────────────────────── */

export function TreatmentPlanSection() {
  /* Se entra por Unassigned, como el frame por defecto (4118:220406). */
  const [vista, setVista] = useState<'unassigned' | 'caso'>('unassigned')
  const [casoId, setCasoId] = useState(CASOS[0].id)
  const [dialogo, setDialogo] = useState<ClaveDialogo | 'delete' | null>(null)
  const [mover, setMover] = useState(false)
  const [grupo, setGrupo] = useState(false)
  const [completar, setCompletar] = useState(false)
  const [favoritos, setFavoritos] = useState<string[]>([])
  const [seleccion, setSeleccion] = useState<string[]>([])
  const caso = CASOS.find((c) => c.id === casoId) ?? CASOS[0]

  const alternarFavorito = (id: string) =>
    setFavoritos((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]))

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <Rail
        vista={vista}
        casoId={casoId}
        favoritos={favoritos}
        onFavorito={alternarFavorito}
        onUnassigned={() => setVista('unassigned')}
        onCaso={(id) => { setCasoId(id); setVista('caso') }}
      />

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        {vista === 'caso' && <ConsentBlock />}

        {vista === 'unassigned' ? (
          <div className="rounded-xl border border-[#e4e4e7] bg-white p-4 sm:p-5">
            <div className="flex flex-wrap items-center gap-3">
              <p className="min-w-0 flex-1 text-[17px] font-bold text-[#09090b]">Unassigned</p>
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
                  className="text-[13px] font-semibold text-[#b22626] hover:underline"
                >
                  Remove
                </button>
                <button
                  onClick={() => setSeleccion([])}
                  className="ml-auto text-[13px] font-medium text-[#71717a] hover:underline"
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
            <p className="mt-3 text-[12px] text-[#71717a]">
              Showing {NO_ASIGNADOS.length} of {NO_ASIGNADOS.length} insurances
            </p>
          </div>
        ) : (
          <VistaCaso
            caso={caso}
            favorito={favoritos.includes(caso.id)}
            onFavorito={() => alternarFavorito(caso.id)}
            onDialogo={setDialogo}
            onMover={() => setMover(true)}
            onGrupo={() => setGrupo(true)}
            onCompletar={() => setCompletar(true)}
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
          onConfirm={() => aviso.ok(`${DIALOGOS[dialogo].titulo} confirmed.`)}
        />
      )}
    </div>
  )
}
