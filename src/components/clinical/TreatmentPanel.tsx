import { useState } from 'react'
import {
  Bot, CalendarDays, Check, ChevronDown, ChevronRight, CircleAlert, CircleCheck, ClipboardList, Eye, EyeOff, Filter, MoreVertical, Play, Search, Siren, Sparkles,
  Stethoscope, Workflow as IconoWorkflow, X, type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ICONO_SUELTO } from '@/lib/estilos'
import { Button } from '@/components/ui/button'
import { Pill, type PillTone } from '@/components/ui/pill'
import { EmptyState } from '@/components/ui/empty-state'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { TooltipProvider } from '@/components/ui/tooltip'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ConAyuda } from '@/components/clinical/dental/ProcedureRow'
import { useWorkflows } from '@/components/clinical/WorkflowsContext'
import { NarrativeEditor } from '@/components/clinical/NarrativeEditor'
import {
  CATEGORIAS_WORKFLOW, TIPO_PREGUNTA, WORKFLOWS, contestada, pasoListo,
  type CategoriaWorkflow, type Narrativa, type Pregunta, type Valor, type Workflow,
} from '@/data/workflows'
import { CASOS, type Procedimiento } from '@/data/treatment-plan'

/* Treatment — Figma 9fYLxX9h 4540:26288 "Workflow Detail & Clinical Note Confirmation", con la lógica de red.dev: a la
   izquierda el workflow elegido con sus pasos y preguntas; a la derecha Workflows, Progress y Treatment plans. Completar
   Chief Complaint o Triage pone en verde CC o TR en el header. Ver design-reference/figma/modulos/clinical-mode.md. */

const TONO_PROCEDIMIENTO: Record<Procedimiento['estado'], PillTone> = { Planned: 'success', Completed: 'info', Removed: 'neutral' }
const CHIP = 'h-7 rounded-md border px-3 text-[11px] font-medium transition-colors'

/* Una pregunta del paso, con sus opciones como chips; las preguntas que dependen de una opción cuelgan debajo. */
export function QuestionBlock({
  pregunta, respuestas, onResponder,
}: {
  pregunta: Pregunta
  respuestas: Record<string, Valor>
  onResponder: (id: string, v: Valor) => void
}) {
  const v = respuestas[pregunta.id]
  const hijas = (pregunta.hijas ?? []).filter((h) => (Array.isArray(v) ? v.includes(h.cuando) : v === h.cuando)).flatMap((h) => h.preguntas)
  const elegir = (o: string) => {
    if (pregunta.tipo === 'multiple') {
      const lista = Array.isArray(v) ? v : []
      onResponder(pregunta.id, lista.includes(o) ? lista.filter((x) => x !== o) : [...lista, o])
    } else onResponder(pregunta.id, v === o ? '' : o)
  }
  return (
    <div className="flex flex-col gap-2">
      <div className={cn('flex flex-col gap-2 rounded-lg border-l-2 px-3 py-2.5', contestada(v) ? 'border-l-dash-blue bg-info-bg' : 'border-l-line bg-surface-alt')}>
        <div>
          <p className="text-[12px] font-semibold text-ink">
            {pregunta.texto}
            {pregunta.opcional && <span className="font-normal text-ink-muted"> (optional)</span>}
          </p>
          <p className="text-[9px] font-semibold tracking-wide text-ink-muted uppercase">{TIPO_PREGUNTA[pregunta.tipo]}</p>
        </div>
        {pregunta.tipo === 'text' ? (
          <textarea
            value={typeof v === 'string' ? v : ''}
            onChange={(e) => onResponder(pregunta.id, e.target.value)}
            rows={2}
            placeholder="Enter text here..."
            aria-label={pregunta.texto}
            className="focus:border-dash-blue w-full max-w-[460px] resize-y rounded-md border border-line bg-white px-2.5 py-1.5 text-[12px] placeholder:text-ink-faint focus:outline-none"
          />
        ) : (
          <div role="group" aria-label={pregunta.texto} className="flex flex-wrap gap-1.5">
            {pregunta.opciones?.map((o) => {
              const on = Array.isArray(v) ? v.includes(o) : v === o
              return (
                <button
                  key={o} type="button" aria-pressed={on} onClick={() => elegir(o)}
                  className={cn(CHIP, on ? 'border-dash-blue bg-dash-blue text-white' : 'hover:border-dash-blue border-line bg-white text-ink')}
                >
                  {o}
                </button>
              )
            })}
          </div>
        )}
      </div>
      {hijas.map((h) => (
        <div key={h.id} className="ml-3 flex gap-1.5">
          <span aria-hidden className="mt-1 h-3 w-3 shrink-0 rounded-bl border-b border-l border-line-strong" />
          <div className="min-w-0 flex-1"><QuestionBlock pregunta={h} respuestas={respuestas} onResponder={onResponder} /></div>
        </div>
      ))}
    </div>
  )
}

/* Tarjeta de la lista de Workflows: nombre, categoría y fecha; la elegida en azul. */
export function WorkflowCard({
  wf, seleccionado, completo, onElegir,
}: {
  wf: Workflow
  seleccionado: boolean
  completo: boolean
  onElegir: () => void
}) {
  const suave = seleccionado ? 'text-white/80' : 'text-ink-muted'
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-md border px-3 py-2 transition-colors',
        seleccionado ? 'border-dash-blue bg-dash-blue text-white' : 'hover:border-dash-blue border-line border-l-4 border-l-line-strong bg-white text-ink',
      )}
    >
      <button type="button" onClick={onElegir} aria-pressed={seleccionado} className="min-w-0 flex-1 text-left">
        <span className="flex items-center gap-2">
          <span className="truncate text-[13px] font-medium">{wf.nombre}</span>
          <span className={cn('flex shrink-0 items-center gap-1 text-[10px]', suave)}><IconoWorkflow className="size-3" aria-hidden />{wf.categoria}</span>
        </span>
        <span className={cn('mt-0.5 flex items-center gap-1 text-[10px]', suave)}><CalendarDays className="size-3" aria-hidden />{wf.fecha}</span>
      </button>
      {completo && (
        <ConAyuda texto="Completed">
          <span className="inline-flex"><CircleCheck className={cn('size-4', seleccionado ? 'text-white' : 'text-status-ok')} aria-label="Completed" /></span>
        </ConAyuda>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label={`Actions for ${wf.nombre}`}
          className={seleccionado ? 'text-dash-blue flex size-6 shrink-0 items-center justify-center rounded bg-white' : ICONO_SUELTO}
        >
          <MoreVertical className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[180px]">
          <DropdownMenuLabel className="text-[12px] font-semibold text-ink">Workflow</DropdownMenuLabel>
          <DropdownMenuItem onSelect={onElegir} className="gap-2 text-[13px]"><Eye className="size-4 text-ink-muted" /> View Workflow</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

/* El progreso del workflow elegido: cuántos pasos están guardados y cuáles. */
export function WorkflowProgress({
  wf, guardados, onPaso,
}: {
  wf: Workflow
  guardados: string[]
  onPaso?: (paso: string) => void
}) {
  const hechos = wf.pasos.filter((p) => guardados.includes(p.id)).length
  const listo = hechos === wf.pasos.length
  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <div className="flex items-center gap-3">
        <span className={cn('flex size-9 shrink-0 items-center justify-center rounded-full text-white', listo ? 'bg-status-ok' : 'bg-dash-blue')}>
          {listo ? <Check className="size-4" strokeWidth={3} aria-hidden /> : <Play className="size-4" aria-hidden />}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[16px] font-semibold text-ink">{wf.nombre}</p>
          <p className="text-[11px] text-ink-muted">{hechos}/{wf.pasos.length} steps completed</p>
        </div>
      </div>
      <div className="my-3 border-t border-line-soft" />
      <ol className="flex flex-col gap-0.5">
        {wf.pasos.map((p) => {
          const hecho = guardados.includes(p.id)
          return (
            <li key={p.id}>
              <button type="button" onClick={() => onPaso?.(p.id)} className="flex w-full items-center gap-2 rounded px-1 py-1 text-left text-[13px] hover:bg-surface-subtle">
                {hecho ? <Check className="size-3.5 shrink-0 text-ink" aria-label="Saved" /> : <span aria-hidden className="mx-[5px] size-1 shrink-0 rounded-full bg-line-strong" />}
                <span className={hecho ? 'text-status-ok-strong' : 'text-ink-muted'}>{p.nombre}</span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export type Filtros = { categorias: CategoriaWorkflow[]; q: string }

const ICONO_CATEGORIA: Record<CategoriaWorkflow, LucideIcon> = { Procedure: Stethoscope, Emergency: Siren, Complication: CircleAlert, Questionnaire: ClipboardList }
export const filtrar = (lista: Workflow[], f: Filtros) => {
  const t = f.q.trim().toLowerCase()
  return lista.filter((w) => (!f.categorias.length || f.categorias.includes(w.categoria)) && (!t || `${w.codigo} ${w.nombre}`.toLowerCase().includes(t)))
}

/* El embudo de Workflows: por tipo (con cuántos hay de cada uno) y por código o descripción. Muestra cuántos quedarían
   antes de aplicar; Clear all vacía el borrador. */
export function WorkflowFilters({ value, onChange }: { value: Filtros; onChange: (f: Filtros) => void }) {
  const [abierto, setAbierto] = useState(false)
  const [borrador, setBorrador] = useState(value)
  const activos = value.categorias.length + (value.q.trim() ? 1 : 0)
  const hayBorrador = borrador.categorias.length > 0 || !!borrador.q.trim()
  const quedan = filtrar(WORKFLOWS, borrador).length
  const alternar = (c: CategoriaWorkflow) =>
    setBorrador((b) => ({ ...b, categorias: b.categorias.includes(c) ? b.categorias.filter((x) => x !== c) : [...b.categorias, c] }))
  return (
    <Popover open={abierto} onOpenChange={(o) => { setAbierto(o); if (o) setBorrador(value) }}>
      <ConAyuda texto="Filter workflows">
        <PopoverTrigger
          aria-label={activos ? `Filter workflows (${activos} applied)` : 'Filter workflows'}
          className={cn(ICONO_SUELTO, 'relative size-8 rounded-md border', activos ? 'border-dash-blue bg-dash-count-bg text-dash-blue' : 'border-line')}
        >
          <Filter className="size-4" />
          {activos > 0 && <span className="bg-dash-blue absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full text-[9px] text-white">{activos}</span>}
        </PopoverTrigger>
      </ConAyuda>
      <PopoverContent align="end" className="w-[320px] gap-0 overflow-hidden p-0">
        <div className="flex items-center justify-between gap-2 border-b border-line-soft px-4 py-3">
          <p className="text-[14px] font-bold text-ink">Filters</p>
          <button type="button" disabled={!hayBorrador} onClick={() => setBorrador({ categorias: [], q: '' })} className="text-dash-blue text-[12px] font-medium hover:underline disabled:text-ink-faint disabled:no-underline">
            Clear all
          </button>
        </div>
        <div className="flex flex-col gap-4 px-4 py-3">
          <fieldset>
            <legend className="text-[11px] font-semibold text-ink">Workflow type</legend>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {CATEGORIAS_WORKFLOW.map((c) => {
                const on = borrador.categorias.includes(c)
                const Icono = on ? Check : ICONO_CATEGORIA[c]
                const n = WORKFLOWS.filter((w) => w.categoria === c).length
                return (
                  <button
                    key={c} type="button" aria-pressed={on} disabled={n === 0 && !on} onClick={() => alternar(c)}
                    className={cn(
                      'flex h-9 items-center gap-2 rounded-md border px-2.5 text-left text-[12px] transition-colors disabled:cursor-not-allowed disabled:opacity-50',
                      on ? 'border-dash-blue bg-info-bg text-dash-blue font-semibold' : 'enabled:hover:border-dash-blue border-line bg-white text-ink',
                    )}
                  >
                    <Icono className="size-3.5 shrink-0" aria-hidden />
                    <span className="min-w-0 flex-1 truncate">{c}</span>
                    <span className={cn('text-[10px] tabular-nums', on ? 'text-dash-blue' : 'text-ink-faint')}>{n}</span>
                  </button>
                )
              })}
            </div>
          </fieldset>
          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-semibold text-ink">Code or description</span>
            <span className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-ink-faint" />
              <input
                value={borrador.q} onChange={(e) => setBorrador((b) => ({ ...b, q: e.target.value }))} placeholder="e.g. TRIAGE or Social"
                onKeyDown={(e) => { if (e.key === 'Enter') { onChange(borrador); setAbierto(false) } }}
                className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-8 pl-8 text-[12px] placeholder:text-ink-faint focus:outline-none"
              />
              {borrador.q && (
                <button type="button" aria-label="Clear search" onClick={() => setBorrador((b) => ({ ...b, q: '' }))} className="absolute top-1/2 right-2 -translate-y-1/2 text-ink-muted hover:text-ink">
                  <X className="size-3.5" />
                </button>
              )}
            </span>
          </label>
        </div>
        <div className="flex items-center justify-between gap-2 border-t border-line-soft bg-surface-alt px-4 py-3">
          <span className="text-[11px] text-ink-muted tabular-nums">{quedan} of {WORKFLOWS.length} workflows</span>
          <Button size="sm" disabled={quedan === 0} onClick={() => { onChange(borrador); setAbierto(false) }}>Apply Filters</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

/* Lo aplicado, debajo del título de Workflows: un chip por filtro para sacarlo, y Clear. */
export function FiltrosAplicados({ value, onChange }: { value: Filtros; onChange: (f: Filtros) => void }) {
  if (!value.categorias.length && !value.q.trim()) return null
  const chip = 'bg-dash-count-bg text-dash-blue flex h-6 items-center gap-1 rounded-full pr-1.5 pl-2.5 text-[11px] font-medium'
  return (
    <div className="mt-2 flex flex-wrap items-center gap-1.5 px-1">
      {value.categorias.map((c) => (
        <span key={c} className={chip}>
          {c}
          <button type="button" aria-label={`Remove ${c} filter`} onClick={() => onChange({ ...value, categorias: value.categorias.filter((x) => x !== c) })} className="rounded-full p-0.5 hover:bg-white">
            <X className="size-3" />
          </button>
        </span>
      ))}
      {value.q.trim() && (
        <span className={chip}>
          “{value.q.trim()}”
          <button type="button" aria-label="Remove search filter" onClick={() => onChange({ ...value, q: '' })} className="rounded-full p-0.5 hover:bg-white"><X className="size-3" /></button>
        </span>
      )}
      <button type="button" onClick={() => onChange({ categorias: [], q: '' })} className="text-[11px] text-ink-muted hover:text-ink hover:underline">Clear</button>
    </div>
  )
}

/* La narrativa guardada del workflow, resumida arriba de los pasos; Open vuelve al editor. */
export function NarrativeSummary({ narrativa, onAbrir }: { narrativa: Narrativa; onAbrir: () => void }) {
  /* Texto corrido para el resumen: cada subtítulo cierra con dos puntos y cada ítem con punto y coma. */
  const plano = narrativa.html.replace(/<h2>.*?<\/h2>/, '').replace(/<\/h3>/g, ': ').replace(/<\/(li|p)>/g, '; ').replace(/<br\s*\/?>/g, ' ')
  const texto = (new DOMParser().parseFromString(plano, 'text/html').body.textContent ?? '').replace(/;\s*$/, '').replace(/;\s*(?=[A-Z][^:;]*:)/g, '. ')
  return (
    <div className="flex items-start gap-3 rounded-lg border border-line bg-white px-3 py-2.5">
      <span className="bg-purple-bg text-purple-fg flex size-8 shrink-0 items-center justify-center rounded-lg"><Bot className="size-4" aria-hidden /></span>
      <div className="min-w-0 flex-1">
        <p className="text-[12px] font-semibold text-ink">
          Clinical narrative <span className="font-normal text-ink-muted">· {narrativa.origen === 'edited' ? 'Edited' : 'Original clinical draft'} · {narrativa.fecha}</span>
        </p>
        <p className="mt-0.5 line-clamp-2 text-[12px] text-ink-muted">{texto}</p>
      </div>
      <Button variant="secondary" size="sm" onClick={onAbrir}>Open</Button>
    </div>
  )
}

/* Los planes del paciente, plegables, con sus procedimientos en tarjetas chicas. */
export function TreatmentPlansCard({ onTreatmentPlan }: { onTreatmentPlan?: () => void }) {
  const casos = CASOS.filter((c) => c.estado !== 'Discarded').slice(0, 3)
  const [abiertos, setAbiertos] = useState<string[]>(casos.slice(0, 1).map((c) => c.id))
  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <p className="text-[15px] font-bold text-ink">Treatment plans</p>
      <div className="mt-2 flex flex-col">
        {casos.map((c) => {
          const abierto = abiertos.includes(c.id)
          return (
            <div key={c.id}>
              <button
                type="button" aria-expanded={abierto}
                onClick={() => setAbiertos((a) => (abierto ? a.filter((x) => x !== c.id) : [...a, c.id]))}
                className="flex w-full items-center justify-between gap-2 py-2 text-left text-[12px] font-medium text-ink"
              >
                <span className="truncate">{c.nombre}</span>
                <ChevronDown className={cn('size-4 shrink-0 transition-transform', abierto && 'rotate-180')} />
              </button>
              {abierto && (
                <ul className="flex flex-col gap-1.5 pb-2">
                  {c.visitas.flatMap((v) => v.procedimientos).slice(0, 3).map((p) => (
                    <li key={p.id} className="flex items-start gap-1 rounded-md border-l-2 border-l-status-ok bg-surface-alt py-2 pr-1 pl-2.5">
                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-2 text-[12px] text-ink">
                          <Pill tone={TONO_PROCEDIMIENTO[p.estado]} size="sm">{p.estado}</Pill>
                          <span className="min-w-0 truncate"><span className="font-semibold">{p.codigo}:</span> {p.nombre}</span>
                        </p>
                        <p className="mt-1 flex flex-wrap gap-x-3 text-[10px] text-ink-muted">
                          <span><span className="font-semibold text-ink">Tooth:</span> {p.pieza}</span>
                          <span><span className="font-semibold text-ink">Surface:</span> {p.superficie}</span>
                          <span><span className="font-semibold text-ink">Provider:</span> {p.proveedor}</span>
                        </p>
                      </div>
                      <RowActionsMenu label={`${p.codigo} ${p.nombre}`}>
                        <DropdownMenuItem onSelect={() => onTreatmentPlan?.()} className="text-[13px]">Open in Treatment Plan</DropdownMenuItem>
                      </RowActionsMenu>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function TreatmentPanel({ onTreatmentPlan }: { onTreatmentPlan?: () => void }) {
  const { progreso, elegido, elegir, responder, guardarPaso, guardarNarrativa } = useWorkflows()
  const [filtros, setFiltros] = useState<Filtros>({ categorias: [], q: '' })
  const [q, setQ] = useState('')
  const [abiertoPor, setAbiertoPor] = useState<Record<string, string | null>>({})
  const [ocultosPor, setOcultosPor] = useState<Record<string, string[]>>({})
  const [verOcultos, setVerOcultos] = useState(false)
  const [editor, setEditor] = useState(false)

  const wf = WORKFLOWS.find((w) => w.id === elegido) ?? WORKFLOWS[0]
  const estado = progreso[wf.id] ?? { respuestas: {}, guardados: [] }
  const r = estado.respuestas
  const abierto = wf.id in abiertoPor ? abiertoPor[wf.id] : (wf.pasos.find((p) => !estado.guardados.includes(p.id))?.id ?? null)
  const pasoAbierto = wf.pasos.find((p) => p.id === abierto)
  const ocultos = ocultosPor[wf.id] ?? []
  const pasos = wf.pasos.filter((p) => (verOcultos || !ocultos.includes(p.id)) && p.nombre.toLowerCase().includes(q.trim().toLowerCase()))
  const lista = filtrar(WORKFLOWS, filtros)

  const abrir = (paso: string | null) => setAbiertoPor((a) => ({ ...a, [wf.id]: paso }))
  const guardar = () => {
    if (!pasoAbierto) return
    guardarPaso(wf.id, pasoAbierto.id)
    const siguiente = wf.pasos.find((p) => p.id !== pasoAbierto.id && !estado.guardados.includes(p.id))
    abrir(siguiente?.id ?? null)
  }
  const alternarOculto = (paso: string) =>
    setOcultosPor((o) => ({ ...o, [wf.id]: ocultos.includes(paso) ? ocultos.filter((x) => x !== paso) : [...ocultos, paso] }))

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <section aria-label={`${wf.nombre} workflow`} className="flex min-w-0 flex-1 flex-col rounded-xl border border-line bg-white">
          <header className="flex flex-wrap items-center gap-2 border-b border-line-soft px-4 py-3">
            <p className="text-dash-blue text-[12px] font-bold tracking-wide uppercase">{wf.nombre}</p>
            <span className="text-[11px] text-ink-muted">· Published v{wf.version}</span>
            {estado.completado && <Pill tone="success" size="sm" className="ml-auto">Completed {estado.completado}</Pill>}
          </header>

          <div className="flex flex-col gap-3 p-4">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
              <input
                value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a section by Name" aria-label="Search a section by Name"
                className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none"
              />
            </div>

            {estado.narrativa && <NarrativeSummary narrativa={estado.narrativa} onAbrir={() => setEditor(true)} />}

            <div className="rounded-lg border border-line">
              <div className="flex items-center justify-between gap-2 border-b border-line-soft px-3 py-2.5">
                <span className="flex items-center gap-2 text-[13px] font-medium text-ink"><ChevronDown className="size-4" aria-hidden />{wf.nombre}</span>
                {ocultos.length > 0 && (
                  <button type="button" onClick={() => setVerOcultos((v) => !v)} className="text-dash-blue text-[12px] hover:underline">
                    {verOcultos ? 'Hide hidden' : `Show hidden (${ocultos.length})`}
                  </button>
                )}
              </div>
              {pasos.length === 0 ? (
                <EmptyState icon={Search} title="No sections found" detail={q ? `Nothing matches "${q}".` : 'Every section of this workflow is hidden.'} className="py-8" />
              ) : (
                pasos.map((paso) => {
                  const on = paso.id === abierto
                  const oculto = ocultos.includes(paso.id)
                  return (
                    <div key={paso.id} className={cn('border-b border-line-soft last:border-0', oculto && 'opacity-60')}>
                      <div className={cn('flex items-center gap-2 px-3 py-2', on && 'bg-info-bg')}>
                        <button type="button" aria-expanded={on} onClick={() => abrir(on ? null : paso.id)} className="flex min-w-0 flex-1 items-center gap-2 text-left text-[13px] text-ink">
                          <ChevronRight className={cn('size-4 shrink-0 transition-transform', on && 'rotate-90')} aria-hidden />
                          <span className="truncate">{paso.nombre}</span>
                        </button>
                        {estado.guardados.includes(paso.id) && (
                          <ConAyuda texto="Step saved"><span className="inline-flex"><CircleCheck className="size-4 text-status-ok" aria-label="Step saved" /></span></ConAyuda>
                        )}
                        <ConAyuda texto={oculto ? 'Show section' : 'Hide section'}>
                          <button type="button" onClick={() => alternarOculto(paso.id)} aria-label={`${oculto ? 'Show' : 'Hide'} ${paso.nombre}`} className={ICONO_SUELTO}>
                            {oculto ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                          </button>
                        </ConAyuda>
                      </div>
                      {on && (
                        <div className="flex flex-col gap-2 py-3 pr-3 pl-9">
                          {paso.preguntas.map((p) => <QuestionBlock key={p.id} pregunta={p} respuestas={r} onResponder={(id, v) => responder(wf.id, id, v)} />)}
                        </div>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </div>

          <footer className="mt-auto flex flex-wrap justify-end gap-2 px-4 pb-4">
            <Button variant="secondary" size="md" onClick={() => setEditor(true)} className="bg-dash-count-bg text-dash-blue border-transparent hover:bg-info-bg">
              <Sparkles /> {estado.narrativa ? 'Edit Narrative' : 'Generate Narrative'}
            </Button>
            <ConAyuda texto={!pasoAbierto ? 'Open a step to save it' : pasoListo(pasoAbierto, r) ? `Save ${pasoAbierto.nombre}` : 'Answer the required questions to save this step'}>
              <span className="inline-flex">
                <Button size="md" disabled={!pasoAbierto || !pasoListo(pasoAbierto, r)} onClick={guardar}>Save Step</Button>
              </span>
            </ConAyuda>
          </footer>
        </section>

        <aside className="flex w-full shrink-0 flex-col gap-4 lg:w-[311px]">
          <div className="rounded-xl border border-line bg-white p-3">
            <div className="flex items-center justify-between gap-2 px-1">
              <p className="text-[15px] font-bold text-ink">Workflows</p>
              <WorkflowFilters value={filtros} onChange={setFiltros} />
            </div>
            <FiltrosAplicados value={filtros} onChange={setFiltros} />
            {lista.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-1 py-5 text-center">
                <p className="text-[12px] text-ink-muted">No workflows match these filters.</p>
                <Button variant="secondary" size="sm" onClick={() => setFiltros({ categorias: [], q: '' })}>Clear filters</Button>
              </div>
            ) : (
              <ul className="mt-3 flex max-h-[300px] flex-col gap-2 overflow-y-auto pr-1">
                {lista.map((w) => (
                  <li key={w.id}>
                    <WorkflowCard wf={w} seleccionado={w.id === wf.id} completo={!!progreso[w.id]?.completado} onElegir={() => { elegir(w.id); setQ('') }} />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <WorkflowProgress wf={wf} guardados={estado.guardados} onPaso={(p) => { abrir(p); setOcultosPor((o) => ({ ...o, [wf.id]: ocultos.filter((x) => x !== p) })) }} />
          <TreatmentPlansCard onTreatmentPlan={onTreatmentPlan} />
        </aside>
      </div>
      <NarrativeEditor key={wf.id} wf={wf} progreso={estado} open={editor} onClose={() => setEditor(false)} onGuardar={(n) => guardarNarrativa(wf.id, n)} />
    </TooltipProvider>
  )
}
