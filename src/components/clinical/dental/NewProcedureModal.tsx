import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, ChevronRight, ChevronsLeft, ChevronsRight, ListFilter, Search, X } from 'lucide-react'
import { ModalShell } from '@/components/patients/form'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { StepIndicator } from '@/components/clinical/StepIndicator'
import { SurfaceWheel, type Surface } from './SurfaceWheel'
import { LinkedFindingCard } from './LinkedFindingCard'
import { ScopeIcon } from './ScopeIcons'
import { ToothChip } from './ToothIcon'
import {
  DIAGNOSES, LINKED_FINDINGS, PROCEDURES, PROCEDURE_GROUPS, SCOPES,
  type ProcedureFilter, type ProcedureOption, type ProcedureScope,
} from './data'

export type ProcedureDraft = {
  procedure: ProcedureOption
  scope: ProcedureScope
  area: string
  tooth: number | null
  surfaces: Surface[]
  linked: string[]
  diagnoses: string[]
}

/* Julián pidió sacar el tab "Diagnostics" (la lista de condiciones/
   diagnósticos, ej. "Chronic enamel dental caries") del paso 3 por ahora.
   El markup y el estado (`diagnoses`, `DIAGNOSES`) se dejan tal cual, sólo se
   deja de dibujar el botón que lleva ahí -con eso alcanza, `tab` nunca pasa
   a 'Diagnostics' si no hay cómo clickearlo-. Volver a mostrarlo es poner
   esto en `true`. */
const CONDICIONES = false

/* Modal, no drawer: en red-clone un formulario complejo se resuelve con
   `ModalShell` (ver NewAppointmentModal de Scheduling), nunca con un panel
   deslizante -eso no es un patrón que use este proyecto. Ver
   design-reference/figma/modulos/clinical-mode.md. */
export function NewProcedureModal({
  open, area, teeth, onClose, onSave,
}: {
  open: boolean
  /** Rótulo del área donde se clickeó, ej "Tooth 21" o "Upper left". */
  area: string
  /** Dientes contra los que se puede cargar el procedimiento; el del medio arranca elegido. */
  teeth: number[]
  onClose: () => void
  onSave: (draft: ProcedureDraft) => void
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [keepArea, setKeepArea] = useState(true)
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState<ProcedureFilter>('All')
  const [code, setCode] = useState<string | null>(null)
  const [scope, setScope] = useState<ProcedureScope>('Tooth')
  const [tooth, setTooth] = useState<number | null>(null)
  const [surfaces, setSurfaces] = useState<Record<number, Surface[]>>({})
  const [tab, setTab] = useState<'Findings' | 'Diagnostics'>('Findings')
  const [findingQuery, setFindingQuery] = useState('')
  const [linked, setLinked] = useState<string[]>([])
  const [diagnoses, setDiagnoses] = useState<string[]>([])

  useEffect(() => {
    if (!open) return
    setStep(1); setKeepArea(true); setQuery(''); setGroup('All'); setCode(null); setScope('Tooth')
    setTooth(teeth[Math.floor(teeth.length / 2)] ?? null); setSurfaces({}); setTab('Findings')
    setFindingQuery(''); setLinked([]); setDiagnoses([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  if (!open) return null

  const procedure = PROCEDURES.find((p) => p.code === code) ?? null
  const q = query.trim().toLowerCase()
  const list = PROCEDURES.filter((p) =>
    (group === 'All' || p.group === group) &&
    (!q || p.code.toLowerCase().includes(q) || p.label.toLowerCase().includes(q)))

  const current = tooth ?? teeth[0] ?? null
  const currentSurfaces = current !== null ? (surfaces[current] ?? []) : []
  const fq = findingQuery.trim().toLowerCase()
  const findings = LINKED_FINDINGS.filter((f) => !fq || f.id.includes(fq) || String(f.tooth).includes(fq))
  const diagnosisList = DIAGNOSES.filter((d) => !fq || d.toLowerCase().includes(fq))

  function step2Move(delta: number) {
    if (current === null) return
    const i = teeth.indexOf(current)
    setTooth(teeth[Math.min(Math.max(i + delta, 0), teeth.length - 1)])
  }

  /** Copia la selección actual a cada diente del rango que no tenga ninguna. */
  function applyToUnset() {
    if (!currentSurfaces.length) return
    setSurfaces((prev) => {
      const next = { ...prev }
      for (const t of teeth) if (!next[t]?.length) next[t] = [...currentSurfaces]
      return next
    })
  }

  function save() {
    if (!procedure) return
    onSave({ procedure, scope, area: keepArea ? area : 'Full mouth', tooth: current, surfaces: currentSurfaces, linked, diagnoses })
    onClose()
  }

  const footer = step === 1 ? (
    <>
      <button type="button" onClick={onClose} className="flex h-9 items-center gap-1.5 rounded-md border border-line bg-white px-6 text-[13px] font-medium whitespace-nowrap shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] hover:bg-surface-subtle">
        <X className="size-3" /> Cancel
      </button>
      <button type="button" disabled={!procedure} onClick={() => setStep(2)} className="bg-dash-blue hover:bg-dash-blue-hover flex h-9 items-center gap-1.5 rounded-md px-6 text-[13px] font-medium whitespace-nowrap text-white disabled:opacity-40">
        Next Step <ArrowRight className="size-3" />
      </button>
    </>
  ) : (
    <>
      <button type="button" onClick={() => setStep(step === 3 ? 2 : 1)} className="flex h-9 items-center gap-1.5 rounded-md border border-line bg-white px-6 text-[13px] font-medium whitespace-nowrap shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] hover:bg-surface-subtle">
        <ArrowLeft className="size-3" /> Return
      </button>
      {step === 2 ? (
        <button type="button" onClick={() => setStep(3)} className="bg-dash-blue hover:bg-dash-blue-hover flex h-9 items-center gap-1.5 rounded-md px-6 text-[13px] font-medium whitespace-nowrap text-white">
          Next Step <ArrowRight className="size-3" />
        </button>
      ) : (
        <button type="button" onClick={save} className="bg-dash-blue hover:bg-dash-blue-hover flex h-9 items-center gap-1.5 rounded-md px-6 text-[13px] font-medium whitespace-nowrap text-white">
          <Check className="size-3" /> Save
        </button>
      )}
    </>
  )

  return (
    <ModalShell title="New Procedure" onClose={onClose} width="max-w-[560px]" footer={footer}>
      <StepIndicator total={3} current={step} />

      <div className="mt-5">
        {step === 1 && (
          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex w-full flex-col items-start gap-2 border-b border-line pb-4">
              <span className="text-xs font-semibold text-ink-muted">Selected area</span>
              {keepArea ? (
                <button type="button" onClick={() => setKeepArea(false)} aria-label={`Remove ${area}`} className="bg-dash-count-bg text-dash-blue inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold">
                  <X className="size-3" /> {area}
                </button>
              ) : (
                <span className="text-xs font-medium text-ink-faint">Full mouth</span>
              )}
            </div>

            <div className="flex w-full flex-col items-start gap-1.5">
              <span className="text-xs font-semibold text-ink-muted">Procedure<span className="text-field-error">*</span></span>
              <div className="flex w-full items-center gap-2">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
                  <input
                    value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..."
                    className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] placeholder:text-ink-faint focus:outline-none"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button type="button" className="flex h-9 items-center gap-1.5 rounded-md border border-line px-3 text-[13px] font-medium hover:bg-surface-subtle">
                      <ListFilter className="size-3.5" /> Filter
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-[180px]">
                    {PROCEDURE_GROUPS.map((g) => (
                      <DropdownMenuItem key={g} onSelect={() => setGroup(g)}>
                        {g === group && <Check className="text-dash-blue size-3.5" />}
                        <span className={g === group ? 'font-semibold' : 'ml-5'}>{g}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <button type="button" onClick={() => setGroup('All')} className="text-dash-blue flex items-center gap-0.5 text-xs font-bold hover:underline">
              {group} <ChevronRight className="size-3.5" />
            </button>

            <div className="flex max-h-[320px] w-full flex-col items-start gap-2 overflow-y-auto">
              {list.map((p) => {
                const on = p.code === code
                return (
                  <div key={p.code} className={`flex w-full items-center gap-2 rounded-md border px-3 py-2 transition-colors ${on ? 'border-dash-blue' : 'border-line hover:border-line-strong'}`}>
                    <button type="button" onClick={() => setCode(p.code)} className="min-w-0 flex-1 text-left text-xs outline-none">
                      <span className="text-dash-blue font-bold">{p.code}</span>
                      <span className="font-medium text-ink"> - {p.label}</span>
                    </button>
                    <span className="flex shrink-0 items-center gap-1">
                      {SCOPES.map((s) => (
                        <button
                          key={s} type="button" title={`Chart on ${s.toLowerCase()}`} aria-label={`${p.code} on ${s.toLowerCase()}`}
                          aria-pressed={on && scope === s} onClick={() => { setCode(p.code); setScope(s) }}
                          className={`bg-dash-blue hover:bg-dash-blue-hover flex size-6 items-center justify-center rounded-md text-white transition-all ${on && scope === s ? 'ring-dash-blue ring-2 ring-offset-1' : ''}`}
                        >
                          <ScopeIcon scope={s} className="size-3.5" />
                        </button>
                      ))}
                    </span>
                  </div>
                )
              })}
              {!list.length && <p className="w-full py-6 text-center text-xs text-ink-faint">No procedure matches that search.</p>}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex w-full flex-col items-start gap-5">
            <div className="flex w-full flex-col items-start gap-1.5">
              <span className="text-xs font-semibold text-ink-muted">Procedure<span className="text-field-error">*</span></span>
              <div className="border-dash-blue flex w-full items-center justify-between gap-2 rounded-md border px-3 py-2">
                <span className="min-w-0 text-xs font-semibold text-ink">{procedure?.code} - {procedure?.label}</span>
                <ToothChip />
              </div>
            </div>

            <div className="flex w-full flex-col items-center gap-3">
              <span className="w-full text-xs font-semibold text-ink-muted">Surface</span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {teeth.map((t) => (
                  <button
                    key={t} type="button" onClick={() => setTooth(t)} aria-pressed={t === current}
                    className={`min-w-8 rounded-md px-2 py-1 text-sm font-bold transition-colors ${t === current ? 'bg-dash-blue text-white' : 'text-ink hover:bg-surface-muted'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <SurfaceWheel value={currentSurfaces} onChange={(next) => current !== null && setSurfaces((prev) => ({ ...prev, [current]: next }))} />
              <div className="flex items-center gap-3">
                <button
                  type="button" aria-label="Previous tooth" disabled={current === teeth[0]} onClick={() => step2Move(-1)}
                  className="bg-dash-blue hover:bg-dash-blue-hover flex size-10 items-center justify-center rounded-full text-white disabled:opacity-40"
                >
                  <ChevronsLeft className="size-4" />
                </button>
                <button
                  type="button" disabled={!currentSurfaces.length} onClick={applyToUnset}
                  className="flex h-10 items-center rounded-md border border-line px-4 text-[13px] font-medium hover:bg-surface-subtle disabled:opacity-40"
                >
                  Apply to unset
                </button>
                <button
                  type="button" aria-label="Next tooth" disabled={current === teeth[teeth.length - 1]} onClick={() => step2Move(1)}
                  className="bg-dash-blue hover:bg-dash-blue-hover flex size-10 items-center justify-center rounded-full text-white disabled:opacity-40"
                >
                  <ChevronsRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex w-full flex-col items-start gap-4">
            {CONDICIONES && (
              <div className="flex items-center gap-1 rounded-lg bg-surface-slate p-1">
                {(['Findings', 'Diagnostics'] as const).map((t) => (
                  <button
                    key={t} type="button" onClick={() => setTab(t)}
                    className={`h-8 rounded-md px-3 text-xs font-medium ${tab === t ? 'bg-dash-blue text-white' : 'text-ink-slate hover:text-ink-soft'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}

            <div className="flex w-full flex-col gap-1">
              <p className="text-sm font-bold text-ink">{tab === 'Findings' ? 'Link Findings' : 'Add Diagnostic'}</p>
              <p className="text-[11px] leading-relaxed text-ink-faint">
                You can link clinical findings that may be resolved by this procedure.
              </p>
            </div>

            <div className="relative w-full">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
              <input
                value={findingQuery} onChange={(e) => setFindingQuery(e.target.value)} placeholder="Search"
                className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] placeholder:text-ink-faint focus:outline-none"
              />
            </div>

            <div className="max-h-[280px] w-full overflow-y-auto">
              {tab === 'Findings' ? (
                <div className="flex w-full flex-col gap-2.5">
                  {findings.map((f) => (
                    <LinkedFindingCard
                      key={f.id} finding={f} linked={linked.includes(f.id)}
                      onToggle={(on) => setLinked((prev) => (on ? [...new Set([...prev, f.id])] : prev.filter((x) => x !== f.id)))}
                    />
                  ))}
                  {!findings.length && <p className="w-full py-6 text-center text-xs text-ink-faint">No finding matches that search.</p>}
                </div>
              ) : (
                <div className="flex w-full flex-col gap-2">
                  {diagnosisList.map((d) => {
                    const on = diagnoses.includes(d)
                    return (
                      <button
                        key={d} type="button" aria-pressed={on}
                        onClick={() => setDiagnoses((prev) => (on ? prev.filter((x) => x !== d) : [...prev, d]))}
                        className={`flex w-full items-center justify-between gap-2 rounded-md border px-3 py-2 text-left transition-colors ${on ? 'border-dash-blue' : 'border-line hover:border-line-strong'}`}
                      >
                        <span className="min-w-0 text-xs font-medium text-ink">{d}</span>
                        <ToothChip />
                      </button>
                    )
                  })}
                  {!diagnosisList.length && <p className="w-full py-6 text-center text-xs text-ink-faint">No diagnosis matches that search.</p>}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ModalShell>
  )
}
