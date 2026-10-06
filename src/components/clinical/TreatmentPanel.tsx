import { useState } from 'react'
import {
  Bot, CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, CircleAlert, CircleCheck, ClipboardList, Eye, EyeOff, MoreVertical, Play, Search, Siren, Sparkles,
  Stethoscope, Workflow as IconoWorkflow, X, type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ICONO_SUELTO } from '@/lib/estilos'
import { Button } from '@/components/ui/button'
import { Pill, type PillTone } from '@/components/ui/pill'
import { EmptyState } from '@/components/ui/empty-state'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import { FilterMenu } from '@/components/ui/filter-menu'
import { TooltipProvider } from '@/components/ui/tooltip'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ConAyuda } from '@/components/clinical/dental/ProcedureRow'
import { useWorkflows } from '@/components/clinical/WorkflowsContext'
import { NarrativeEditor } from '@/components/clinical/NarrativeEditor'
import {
  CATEGORIAS_WORKFLOW, TIPO_PREGUNTA, WORKFLOWS, contestada, pasoListo,
  type CategoriaWorkflow, type Narrativa, type Pregunta, type Valor, type Workflow,
} from '@/data/workflows'
import { CASOS, type Caso, type Procedimiento } from '@/data/treatment-plan'
import { TONO_CASO } from '@/components/clinical/TreatmentPlanSection'

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
    <div className="rounded-lg bg-white shadow-panel p-4">
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

/* Punto del color del estado de cada procedimiento (el de su pill). */
const PUNTO_PROCEDIMIENTO: Record<Procedimiento['estado'], string> = { Planned: 'bg-status-ok', Completed: 'bg-dash-busy-fg', Removed: 'bg-ink-faint' }

const procedimientosDe = (c: Caso) => c.visitas.flatMap((v) => v.procedimientos)

function MenuProcedimiento({ p, onTreatmentPlan }: { p: Procedimiento; onTreatmentPlan?: () => void }) {
  return (
    <RowActionsMenu label={`${p.codigo} ${p.nombre}`}>
      <DropdownMenuItem onSelect={() => onTreatmentPlan?.()} className="text-[13px]">Open in Treatment Plan</DropdownMenuItem>
    </RowActionsMenu>
  )
}

/* B · Cada plan en su caja, con estado, avance y total a la vista; abierto, los procedimientos encabezados por la pieza. */
export function PlanProgressList({ casos, onTreatmentPlan }: { casos: Caso[]; onTreatmentPlan?: () => void }) {
  const [abiertos, setAbiertos] = useState<string[]>(casos.slice(0, 1).map((c) => c.id))
  return (
    <div className="mt-3 flex flex-col gap-2">
      {casos.map((c) => {
        const procs = procedimientosDe(c)
        const hechos = procs.filter((p) => p.estado === 'Completed').length
        const abierto = abiertos.includes(c.id)
        return (
          <div key={c.id} className={cn('rounded-lg border', abierto ? 'border-line' : 'border-line-soft')}>
            <button
              type="button" aria-expanded={abierto}
              onClick={() => setAbiertos((a) => (abierto ? a.filter((x) => x !== c.id) : [...a, c.id]))}
              className="flex w-full flex-col gap-2 p-3 text-left"
            >
              <span className="flex items-center gap-2">
                <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-ink">{c.nombre}</span>
                <Pill tone={TONO_CASO[c.estado]} size="sm" className="whitespace-nowrap">{c.estado}</Pill>
                <ChevronDown className={cn('size-4 shrink-0 text-ink-muted transition-transform', abierto && 'rotate-180')} aria-hidden />
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line" role="progressbar" aria-label={`${c.nombre} progress`} aria-valuenow={hechos} aria-valuemin={0} aria-valuemax={procs.length}>
                  <span className="block h-full rounded-full bg-dash-busy-fg" style={{ width: `${(hechos / procs.length) * 100}%` }} />
                </span>
                <span className="text-[11px] whitespace-nowrap text-ink-muted tabular-nums">{hechos}/{procs.length} done · ${c.total}</span>
              </span>
            </button>
            {abierto && (
              <ul className="border-t border-line-soft">
                {procs.slice(0, 3).map((p) => (
                  <li key={p.id} className="flex items-center gap-2.5 border-b border-line-soft px-3 py-2 last:border-b-0">
                    <span className="flex size-9 shrink-0 flex-col items-center justify-center rounded-md bg-surface-alt leading-none">
                      <span className="text-[8px] font-semibold tracking-wide text-ink-muted uppercase">Tooth</span>
                      <span className="mt-0.5 text-[13px] font-bold text-ink tabular-nums">{p.pieza}</span>
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12px] text-ink"><span className="font-semibold">{p.codigo}:</span> {p.nombre}</p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-[10px] text-ink-muted">
                        <span aria-hidden className={cn('size-1.5 shrink-0 rounded-full', PUNTO_PROCEDIMIENTO[p.estado])} />
                        <span className="font-semibold text-ink">{p.estado}</span>· Surface {p.superficie}
                      </p>
                      <p className="truncate text-[10px] text-ink-muted"><span className="font-semibold text-ink">Provider:</span> {p.proveedor}</p>
                    </div>
                    <MenuProcedimiento p={p} onTreatmentPlan={onTreatmentPlan} />
                  </li>
                ))}
                {procs.length > 3 && (
                  <li>
                    <button type="button" onClick={() => onTreatmentPlan?.()} className="text-dash-blue w-full px-3 py-2 text-left text-[11px] font-medium hover:underline">
                      See all {procs.length} procedures
                    </button>
                  </li>
                )}
              </ul>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* C · Un plan a la vez, con flechas para pasar al siguiente: avance en tramos (uno por procedimiento, lleno el que está
   completo) y los procedimientos en línea de tiempo por visita, con pieza, superficie y proveedor. */
export function PlanTimeline({ casos, onTreatmentPlan, tope = 4 }: { casos: Caso[]; onTreatmentPlan?: () => void; tope?: number }) {
  const [i, setI] = useState(0)
  const c = casos[i]
  if (!c) return null
  const procs = procedimientosDe(c)
  const hechos = procs.filter((p) => p.estado === 'Completed').length
  let quedan = tope
  const visitas = c.visitas
    .map((v) => { const lista = v.procedimientos.slice(0, Math.max(quedan, 0)); quedan -= lista.length; return { ...v, lista } })
    .filter((v) => v.lista.length)
  const flecha = 'flex size-7 shrink-0 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-white hover:text-ink disabled:pointer-events-none disabled:opacity-40'
  return (
    <div className="mt-3">
      <div className="flex items-center gap-1 rounded-lg bg-surface-alt p-1">
        <button type="button" aria-label="Previous plan" disabled={i === 0} onClick={() => setI(i - 1)} className={flecha}><ChevronLeft className="size-4" /></button>
        <div className="min-w-0 flex-1 text-center" aria-live="polite">
          <p className="truncate text-[12px] font-semibold text-ink">{c.nombre}</p>
          <p className="text-[10px] text-ink-muted tabular-nums">Plan {i + 1} of {casos.length}</p>
        </div>
        <button type="button" aria-label="Next plan" disabled={i === casos.length - 1} onClick={() => setI(i + 1)} className={flecha}><ChevronRight className="size-4" /></button>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <Pill tone={TONO_CASO[c.estado]} size="sm" className="whitespace-nowrap">{c.estado}</Pill>
        <span className="ml-auto text-[11px] text-ink-muted tabular-nums">{hechos} of {procs.length} completed · ${c.total}</span>
      </div>
      <div className="mt-2 flex gap-0.5" role="img" aria-label={`${hechos} of ${procs.length} procedures completed`}>
        {procs.map((p) => <span key={p.id} className={cn('h-1.5 flex-1 rounded-full', p.estado === 'Completed' ? 'bg-dash-busy-fg' : p.estado === 'Removed' ? 'bg-line-soft' : 'bg-line')} />)}
      </div>
      <ol className="mt-3 flex flex-col gap-3">
        {visitas.map((v) => (
          <li key={v.id}>
            <p className="text-[10px] font-semibold tracking-wide text-ink-muted uppercase">
              {v.nombre} <span className="font-normal tracking-normal normal-case">· {v.cita ? `${v.cita.fecha}, ${v.cita.hora}` : 'No appointment'}</span>
            </p>
            <ul className="mt-1 ml-[3px] flex flex-col border-l border-line">
              {v.lista.map((p) => (
                <li key={p.id} className="relative flex items-start gap-1 py-1.5 pl-4">
                  <span aria-hidden className={cn('absolute top-[11px] -left-[4px] size-[7px] rounded-full ring-2 ring-white', PUNTO_PROCEDIMIENTO[p.estado])} />
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 text-[12px] text-ink">
                      <span className="min-w-0 flex-1 truncate"><span className="font-semibold">{p.codigo}:</span> {p.nombre}</span>
                      <Pill tone={TONO_PROCEDIMIENTO[p.estado]} size="sm">{p.estado}</Pill>
                    </p>
                    <p className="mt-1 flex flex-wrap gap-x-3 text-[10px] text-ink-muted">
                      <span><span className="font-semibold text-ink">Tooth:</span> {p.pieza}</span>
                      <span><span className="font-semibold text-ink">Surface:</span> {p.superficie}</span>
                      <span><span className="font-semibold text-ink">Provider:</span> {p.proveedor}</span>
                    </p>
                  </div>
                  <MenuProcedimiento p={p} onTreatmentPlan={onTreatmentPlan} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      {procs.length > tope && (
        <button type="button" onClick={() => onTreatmentPlan?.()} className="text-dash-blue mt-2 text-[11px] font-medium hover:underline">
          See all {procs.length} procedures
        </button>
      )}
    </div>
  )
}

export type VarianteTreatmentPlans = 'tarjetas' | 'progreso' | 'recorrido'

/* Los planes del paciente. A (tarjetas, la publicada): plegables, con sus procedimientos en tarjetas chicas. B y C son
   las propuestas nuevas, con el mismo detalle por procedimiento; Julián elige. */
export function TreatmentPlansCard({ onTreatmentPlan, variante = 'tarjetas' }: { onTreatmentPlan?: () => void; variante?: VarianteTreatmentPlans }) {
  const casos = CASOS.filter((c) => c.estado !== 'Discarded').slice(0, 3)
  const [abiertos, setAbiertos] = useState<string[]>(casos.slice(0, 1).map((c) => c.id))
  return (
    <div className="rounded-lg bg-white shadow-panel p-4">
      <p className="text-[15px] font-bold text-ink">Treatment plans</p>
      {variante === 'progreso' ? <PlanProgressList casos={casos} onTreatmentPlan={onTreatmentPlan} />
        : variante === 'recorrido' ? <PlanTimeline casos={casos} onTreatmentPlan={onTreatmentPlan} />
        : (
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
                  {procedimientosDe(c).slice(0, 3).map((p) => (
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
                      <MenuProcedimiento p={p} onTreatmentPlan={onTreatmentPlan} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </div>
      )}
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
        <section aria-label={`${wf.nombre} workflow`} className="flex min-w-0 flex-1 flex-col rounded-lg bg-white shadow-panel">
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
          <div className="rounded-lg bg-white shadow-panel p-3">
            <div className="flex items-center justify-between gap-2 px-1">
              <p className="text-[15px] font-bold text-ink">Workflows</p>
              <FilterMenu
                label="Filter workflows" size="sm"
                groups={[{
                  title: 'Workflow type', value: filtros.categorias, onChange: (v) => setFiltros((f) => ({ ...f, categorias: v as CategoriaWorkflow[] })),
                  options: CATEGORIAS_WORKFLOW.map((c) => {
                    const n = WORKFLOWS.filter((w) => w.categoria === c).length
                    return { value: c, icon: ICONO_CATEGORIA[c], count: n, disabled: n === 0 }
                  }),
                }]}
                search={{ label: 'Code or description', placeholder: 'e.g. TRIAGE or Social', value: filtros.q, onChange: (q) => setFiltros((f) => ({ ...f, q })) }}
                result={`${lista.length} of ${WORKFLOWS.length} workflows`}
              />
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
