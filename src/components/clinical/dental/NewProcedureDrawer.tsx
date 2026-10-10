import { Tabs } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Chip } from '@/components/ui/chip'
import { ChevronsLeft, ChevronsRight, Search } from 'lucide-react'
import { Drawer, DrawerActions, DrawerStep } from '@/components/ui/drawer'
import { FilterMenu } from '@/components/ui/filter-menu'
import { FieldLabel, SelectField, control } from '@/components/patients/form'
import { SurfaceWheel, type Surface } from './SurfaceWheel'
import { LinkedDiagnosisCard, LinkedFindingCard } from './LinkedFindingCard'
import { NOMBRE_ALCANCE, ScopeIcon } from './ScopeIcons'
import { CajaIcono, ConAyuda, ProcedureRow } from './ProcedureRow'
import { TooltipProvider } from '@/components/ui/tooltip'
import {
  EXISTING_GROUPS, PROCEDURES, codigoDiagnostico, PROCEDURE_GROUPS, PROCEDURE_STATUSES, SCOPES, TREATMENT_AREAS,
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

/* Los pasos dependen de lo elegido (Julián, 2026-10-05 y 2026-10-06): Surfaces sólo si el procedimiento elegido lleva
   superficie, sea Planned o Existing; Link to finding y Link to diagnosis sólo para lo planeado: algo que el paciente ya
   tiene hecho (Existing) no resuelve un hallazgo. Link to diagnosis muestra los diagnósticos de los hallazgos por código
   y superficie. */
type Paso = 'Procedure' | 'Surfaces' | 'Link to finding' | 'Link to diagnosis'

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
  const [findingQuery, setFindingQuery] = useState('')
  const [diagnosisQuery, setDiagnosisQuery] = useState('')
  const [linked, setLinked] = useState<string[]>([])
  const [diagnoses, setDiagnoses] = useState<string[]>([])

  useEffect(() => {
    if (!open) return
    setPaso(0); setKeepArea(true); setQuery(''); setStatus(mode === 'condition' ? 'Existing' : 'Planned'); setGroup('All'); setAreas([]); setCode(null); setScope('Tooth')
    setTooth(teeth[Math.floor(teeth.length / 2)] ?? null); setSurfaces({})
    setFindingQuery(''); setDiagnosisQuery(''); setLinked([]); setDiagnoses([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const procedure = PROCEDURES.find((p) => p.code === code) ?? null
  const conSuperficies = procedure?.area === 'Surface'
  const pasos: Paso[] = ['Procedure', ...(conSuperficies ? ['Surfaces' as const] : []), ...(status === 'Planned' ? ['Link to finding' as const, 'Link to diagnosis' as const] : [])]
  const actual = pasos[Math.min(paso, pasos.length - 1)]!
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
  const dq = diagnosisQuery.trim().toLowerCase()
  /* Un diagnóstico por hallazgo del examen, con su código y sus superficies. Se guarda como "K05.31 · B, MB". */
  const diagnosticos = findings
    .filter((f) => f.status !== 'Discarded')
    .map((f) => ({ id: f.id, code: codigoDiagnostico(f.condition), surfaces: f.surfaces }))
    .map((d) => ({ ...d, valor: d.surfaces.length ? `${d.code} · ${d.surfaces.join(', ')}` : d.code }))
    .filter((d) => !dq || d.valor.toLowerCase().includes(dq))

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

  /* El pie de todos los drawers (como en Confidentally 2.0): Cancel o Return a la izquierda, Next Step o Save a la derecha. */
  const bloqueado = (actual === 'Procedure' && !procedure) || (actual === 'Surfaces' && !hayAlguna)
  const footer = (
    <DrawerActions
      step={paso} total={pasos.length} onNext={() => setPaso(paso + 1)} onBack={() => setPaso(paso - 1)} onCancel={onClose} onSave={save}
      nextDisabled={bloqueado} saveDisabled={bloqueado}
    />
  )

  return (
    <Drawer open={open} onClose={onClose} title={mode === 'condition' ? 'New Condition' : 'New Procedure'} steps={pasos} step={paso} footer={footer}>
      <DrawerStep key={actual} index={paso} step={paso}>
        {actual === 'Procedure' && (
          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex w-full flex-col items-start gap-2 border-b border-line pb-4">
              <FieldLabel>Selected area</FieldLabel>
              {keepArea ? (
                <Chip removeLabel={`Remove ${area}`} onRemove={() => setKeepArea(false)}>{area}</Chip>
              ) : (
                <span className="text-xs font-medium text-ink-faint">Full mouth</span>
              )}
            </div>

            {/* Como en la app real: búsqueda por código o descripción, el embudo con las áreas de tratamiento y las
                categorías del catálogo. */}
            <div className="flex w-full flex-col items-start gap-1.5">
              <FieldLabel required>Procedure</FieldLabel>
              <div className="flex w-full items-center gap-2">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
                  <input
                    value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by code or description"
                    className={cn(control(), 'h-9 pr-3 pl-9')}
                  />
                </div>
                {/* Sin áreas tildadas se ve todo ("Show all treatment"): Clear all vuelve a eso. */}
                <FilterMenu label="Filter by treatment area" groups={[{ title: 'Treatment Area', options: [...TREATMENT_AREAS], value: areas, onChange: (v) => setAreas(v as TreatmentArea[]) }]} />
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
              <FieldLabel required>Procedure</FieldLabel>
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
                <FieldLabel required>Surfaces</FieldLabel>
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
            <div className="flex w-full flex-col gap-1">
              <p className="text-sm font-bold text-ink">Link to finding</p>
              <p className="text-[11px] leading-relaxed text-ink-faint">
                You can link clinical findings that may be resolved by this procedure.
              </p>
            </div>

            <div className="relative w-full">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
              <input
                value={findingQuery} onChange={(e) => setFindingQuery(e.target.value)} placeholder="Search" aria-label="Search findings"
                className={cn(control(), 'h-9 pr-3 pl-9')}
              />
            </div>

            <div className="flex max-h-[280px] w-full flex-col gap-2.5 overflow-y-auto">
              {vinculables.map((f) => (
                <LinkedFindingCard
                  key={f.id} finding={f} linked={linked.includes(f.id)}
                  onToggle={(on) => setLinked((prev) => (on ? [...new Set([...prev, f.id])] : prev.filter((x) => x !== f.id)))}
                />
              ))}
              {!vinculables.length && <p className="w-full py-6 text-center text-xs text-ink-faint">No finding matches that search.</p>}
            </div>
          </div>
        )}

        {actual === 'Link to diagnosis' && (
          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex w-full flex-col gap-1">
              <p className="text-sm font-bold text-ink">Link to diagnosis</p>
              <p className="text-[11px] leading-relaxed text-ink-faint">
                You can link the diagnoses this procedure treats, by code and surface.
              </p>
            </div>

            <div className="relative w-full">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
              <input
                value={diagnosisQuery} onChange={(e) => setDiagnosisQuery(e.target.value)} placeholder="Search by code or surface" aria-label="Search diagnoses"
                className={cn(control(), 'h-9 pr-3 pl-9')}
              />
            </div>

            <div className="flex max-h-[280px] w-full flex-col gap-2.5 overflow-y-auto">
              {diagnosticos.map((d) => (
                <LinkedDiagnosisCard
                  key={d.id} code={d.code} surfaces={d.surfaces} linked={diagnoses.includes(d.valor)}
                  onToggle={(on) => setDiagnoses((prev) => (on ? [...new Set([...prev, d.valor])] : prev.filter((x) => x !== d.valor)))}
                />
              ))}
              {!diagnosticos.length && <p className="w-full py-6 text-center text-xs text-ink-faint">No diagnosis matches that search.</p>}
            </div>
          </div>
        )}
      </DrawerStep>
    </Drawer>
  )
}
