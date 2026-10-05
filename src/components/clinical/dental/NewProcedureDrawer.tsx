import { Tabs } from '@/components/ui/tabs'
import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, ChevronsLeft, ChevronsRight, ListFilter, Search, X } from 'lucide-react'
import { Drawer } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Switch } from '@/components/ui/switch'
import { SelectField } from '@/components/patients/form'
import { StepIndicator } from '@/components/clinical/StepIndicator'
import { SurfaceWheel, type Surface } from './SurfaceWheel'
import { LinkedFindingCard } from './LinkedFindingCard'
import { NOMBRE_ALCANCE, ScopeIcon } from './ScopeIcons'
import { CajaIcono, ConAyuda, ConditionRow, ProcedureRow } from './ProcedureRow'
import { TooltipProvider } from '@/components/ui/tooltip'
import {
  DIAGNOSES, EXISTING_GROUPS, PROCEDURES, PROCEDURE_GROUPS, PROCEDURE_STATUSES, SCOPES, TREATMENT_AREAS,
  type Finding, type ProcedureFilter, type ProcedureOption, type ProcedureScope, type ProcedureStatus, type TreatmentArea,
} from './data'

export type ProcedureDraft = {
  procedure: ProcedureOption
  status: ProcedureStatus
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

/* Los pasos dependen de lo elegido (Julián, 2026-10-05): Surfaces sólo si el procedimiento lleva superficie, y Link to
   finding sólo para lo planeado: algo que el paciente ya tiene hecho (Existing) no resuelve un hallazgo. */
type Paso = 'Procedure' | 'Surfaces' | 'Link to finding'

/* Drawer a la derecha, a pedido de Julián (Figma UX-UI 2.0, 1669:87207 y 1669:87208): el chart queda a la vista mientras
   se carga. Add Procedure abre en Planned; Add Condition, en Existing (algo que el paciente ya tiene hecho). Ver
   design-reference/figma/modulos/clinical-mode.md. */
export function NewProcedureDrawer({
  open, mode = 'procedure', area, teeth, findings, onClose, onSave,
}: {
  open: boolean
  /** De qué botón se abrió: cambia el título y la pestaña con que arranca la búsqueda. */
  mode?: 'procedure' | 'condition'
  /** Rótulo del área donde se clickeó, ej "Tooth 21" o "Upper left". */
  area: string
  /** Dientes contra los que se puede cargar el procedimiento; el del medio arranca elegido. */
  teeth: number[]
  /** Los hallazgos del examen, para vincularlos en el último paso. */
  findings: Finding[]
  onClose: () => void
  onSave: (draft: ProcedureDraft) => void
}) {
  const [paso, setPaso] = useState(0)
  const [keepArea, setKeepArea] = useState(true)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<ProcedureStatus>('Planned')
  const [group, setGroup] = useState<ProcedureFilter>('All')
  /* Áreas de tratamiento del embudo; vacío = todas ("Show all treatment"). */
  const [areas, setAreas] = useState<TreatmentArea[]>([])
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
    setPaso(0); setKeepArea(true); setQuery(''); setStatus(mode === 'condition' ? 'Existing' : 'Planned'); setGroup('All'); setAreas([]); setCode(null); setScope('Tooth')
    setTooth(teeth[Math.floor(teeth.length / 2)] ?? null); setSurfaces({}); setTab('Findings')
    setFindingQuery(''); setLinked([]); setDiagnoses([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const procedure = PROCEDURES.find((p) => p.code === code) ?? null
  const conSuperficies = procedure?.area === 'Surface'
  const pasos: Paso[] = ['Procedure', ...(conSuperficies ? ['Surfaces' as const] : []), ...(status === 'Planned' ? ['Link to finding' as const] : [])]
  const actual = pasos[Math.min(paso, pasos.length - 1)]!
  const ultimo = paso >= pasos.length - 1
  const hayAlguna = Object.values(surfaces).some((x) => x.length > 0)
  const q = query.trim().toLowerCase()
  const coincide = (p: ProcedureOption, s: ProcedureStatus) =>
    (s === 'Planned' || EXISTING_GROUPS.includes(p.group)) &&
    (group === 'All' || p.group === group) &&
    (!areas.length || areas.includes(p.area)) &&
    (!q || p.code.toLowerCase().includes(q) || p.label.toLowerCase().includes(q))
  const list = PROCEDURES.filter((p) => coincide(p, status))

  const current = tooth ?? teeth[0] ?? null
  const currentSurfaces = current !== null ? (surfaces[current] ?? []) : []
  const fq = findingQuery.trim().toLowerCase()
  const vinculables = findings.filter((f) => f.status !== 'Discarded' && (!fq || `${f.condition} ${f.area} ${f.surfaces.join(' ')}`.toLowerCase().includes(fq)))
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
    const vincula = status === 'Planned'
    onSave({ procedure, status, scope, area: keepArea ? area : 'Full mouth', tooth: current, surfaces: conSuperficies ? currentSurfaces : [], linked: vincula ? linked : [], diagnoses: vincula ? diagnoses : [] })
    onClose()
  }

  /* Como en el Figma: la acción principal a lo ancho y debajo la secundaria. */
  const footer = (
    <>
      {!ultimo ? (
        <Button className="w-full" disabled={(actual === 'Procedure' && !procedure) || (actual === 'Surfaces' && !hayAlguna)} onClick={() => setPaso(paso + 1)}>
          Next Step <ArrowRight />
        </Button>
      ) : (
        <Button className="w-full" disabled={(actual === 'Procedure' && !procedure) || (actual === 'Surfaces' && !hayAlguna)} onClick={save}><Check /> Save</Button>
      )}
      {paso === 0 ? (
        <Button variant="secondary" className="w-full" onClick={onClose}><X /> Cancel</Button>
      ) : (
        <Button variant="secondary" className="w-full" onClick={() => setPaso(paso - 1)}><ArrowLeft /> Return</Button>
      )}
    </>
  )

  return (
    <Drawer open={open} onClose={onClose} title={mode === 'condition' ? 'New Condition' : 'New Procedure'} footer={footer}>
      {/* Con un solo paso (algo ya hecho, sin superficie) no hay pasos que mostrar. */}
      {pasos.length > 1 && <StepIndicator total={pasos.length} current={paso + 1} labels={pasos} />}

      <div className="mt-5">
        {actual === 'Procedure' && (
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

            {/* Como en la app real: búsqueda por código o descripción, el embudo con las áreas de tratamiento y las
                categorías del catálogo. */}
            <div className="flex w-full flex-col items-start gap-1.5">
              <span className="text-xs font-semibold text-ink-muted">Procedure<span className="text-field-error">*</span></span>
              <div className="flex w-full items-center gap-2">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
                  <input
                    value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by code or description"
                    className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] placeholder:text-ink-faint focus:outline-none"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button type="button" aria-label="Filter by treatment area" className={`relative flex size-9 items-center justify-center rounded-md border hover:bg-surface-subtle ${areas.length ? 'border-dash-blue text-dash-blue' : 'border-line'}`}>
                      <ListFilter className="size-4" />
                      {areas.length > 0 && <span className="bg-dash-blue absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full text-[9px] font-bold text-white">{areas.length}</span>}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-[200px]">
                    <DropdownMenuLabel>Treatment Area</DropdownMenuLabel>
                    <DropdownMenuItem onSelect={(e) => { e.preventDefault(); setAreas([]) }} className="justify-between">
                      Show all treatment <Switch checked={!areas.length} aria-hidden tabIndex={-1} />
                    </DropdownMenuItem>
                    {TREATMENT_AREAS.map((a) => (
                      <DropdownMenuItem key={a} onSelect={(e) => { e.preventDefault(); setAreas((xs) => (xs.includes(a) ? xs.filter((x) => x !== a) : [...xs, a])) }} className="justify-between">
                        {a} <Switch checked={areas.includes(a)} aria-hidden tabIndex={-1} />
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <SelectField label="Category" value={group === 'All' ? 'All' : group} onChange={(v) => setGroup(v as ProcedureFilter)} options={[...PROCEDURE_GROUPS]} className="w-full" />

            {/* Existing: algo que ya tiene hecho; Planned: lo que se va a hacer. Filtran la búsqueda y se guardan con el procedimiento. */}
            <Tabs
              aria-label="Procedure status"
              tabs={PROCEDURE_STATUSES.map((s) => ({ value: s, count: PROCEDURES.filter((p) => coincide(p, s)).length }))}
              value={status}
              onChange={(s) => { setStatus(s); if (procedure && !coincide(procedure, s)) setCode(null) }}
            />

            <div className="flex max-h-[320px] w-full flex-col items-start gap-2 overflow-y-auto">
              {list.map((p) => {
                const on = p.code === code
                return (
                  <ProcedureRow
                    key={p.code} procedure={p} estado={on ? 'selected' : 'default'}
                    scopes={SCOPES.filter((s) => s !== 'Surface' || p.area === 'Surface')}
                    scope={on ? scope : null}
                    onSelect={() => { setCode(p.code); if (p.area === 'Surface') setScope('Surface') }}
                    onScope={(s) => { setCode(p.code); setScope(s) }}
                  />
                )
              })}
              {!list.length && <p className="w-full py-6 text-center text-xs text-ink-faint">No procedure matches that search, category or treatment area.</p>}
            </div>
          </div>
        )}

        {actual === 'Surfaces' && (
          <div className="flex w-full flex-col items-start gap-5">
            <div className="flex w-full flex-col items-start gap-1.5">
              <span className="text-xs font-semibold text-ink-muted">Procedure<span className="text-field-error">*</span></span>
              <div className="border-dash-blue flex w-full items-center justify-between gap-2 rounded-md border px-3 py-2">
                <span className="min-w-0 text-xs font-semibold text-ink">{procedure?.code} - {procedure?.label}</span>
                <span className="flex shrink-0 items-center gap-1.5">
                  <span className="bg-dash-count-bg text-dash-blue rounded-full px-2 py-0.5 text-[10px] font-semibold">{status}</span>
                  <TooltipProvider delayDuration={200}>
                    <ConAyuda texto={NOMBRE_ALCANCE[scope]}><span><CajaIcono estado="selected"><ScopeIcon scope={scope} /></CajaIcono></span></ConAyuda>
                  </TooltipProvider>
                </span>
              </div>
            </div>

            <div className="flex w-full flex-col items-center gap-3">
              <span className="flex w-full flex-col gap-0.5">
                <span className="text-xs font-semibold text-ink-muted">Surfaces<span className="text-field-error">*</span></span>
                <span className="text-[11px] text-ink-faint">Mark the surfaces this procedure goes on, tooth by tooth.</span>
              </span>
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

        {actual === 'Link to finding' && (
          <div className="flex w-full flex-col items-start gap-4">
            {CONDICIONES && (
              <Tabs aria-label="Link to" tabs={['Findings', 'Diagnostics'] as const} value={tab} onChange={setTab} />
            )}

            <div className="flex w-full flex-col gap-1">
              <p className="text-sm font-bold text-ink">{tab === 'Findings' ? 'Link to finding' : 'Add Diagnostic'}</p>
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
                  {vinculables.map((f) => (
                    <LinkedFindingCard
                      key={f.id} finding={f} linked={linked.includes(f.id)}
                      onToggle={(on) => setLinked((prev) => (on ? [...new Set([...prev, f.id])] : prev.filter((x) => x !== f.id)))}
                    />
                  ))}
                  {!vinculables.length && <p className="w-full py-6 text-center text-xs text-ink-faint">No finding matches that search.</p>}
                </div>
              ) : (
                <div className="flex w-full flex-col gap-2">
                  {diagnosisList.map((d) => {
                    const on = diagnoses.includes(d)
                    return (
                      <ConditionRow
                        key={d} label={d} estado={on ? 'selected' : 'default'}
                        onClick={() => setDiagnoses((prev) => (on ? prev.filter((x) => x !== d) : [...prev, d]))}
                      />
                    )
                  })}
                  {!diagnosisList.length && <p className="w-full py-6 text-center text-xs text-ink-faint">No diagnosis matches that search.</p>}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Drawer>
  )
}
