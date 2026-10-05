import { createContext, useContext, useState, type ReactNode } from 'react'
import { Plus, Stethoscope, Table2, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { BOTON_EXPANDIBLE, ETIQUETA_EXPANDIBLE } from '@/lib/estilos'
import { ProblemList } from '@/components/clinical/ProblemList'
import { ExamPanelHeader } from './dental/ExamPanelHeader'
import { ReviewList, type ExamReview } from './dental/ReviewList'
import { ReviewExamDialog } from './dental/ReviewExamDialog'
import { FindingCard } from './dental/FindingCard'
import { FindingActionsMenu } from './dental/FindingActionsMenu'
import { NewProcedureDrawer, type ProcedureDraft } from './dental/NewProcedureDrawer'
import { EditFindingDrawer } from './dental/EditFindingDrawer'
import { ConfirmProcedureDialog } from './dental/ConfirmProcedureDialog'
import { useExamReviews } from './dental/useExamReviews'
import { ACTIONS, type FindingAction } from './dental/actions'
import { quadrantTeeth, type Finding } from './dental/data'

/* Lo que comparten todos los exámenes de Clinical Mode (Julián, 2026-10-03): el panel de Findings a la izquierda (menos
   en Vitals) y arriba del contenido las acciones Add Procedure, Add Condition y View Problem List, blancas y con el texto
   que se abre al pasar el mouse. Los findings son del paciente, no del examen: con `ExamFindingsProvider` (en
   ClinicalMode) son los mismos al pasar de un examen a otro. Ver design-reference/figma/modulos/clinical-mode.md. */

const HOY = 'May 14, 2026'

const INITIAL_FINDINGS: Finding[] = [
  { id: 'F-1', area: 'Tooth 3', condition: 'chronic enamel dental caries', descriptor: 'Deep', date: HOY, status: 'Discarded', tooth: 3, provider: 'Elena Martinez', surfaces: ['O', 'DB'], notes: '', linked: [], diagnoses: [] },
  { id: 'F-2', area: 'Soft Palate', condition: 'oral candidiasis', descriptor: 'Red', date: HOY, status: 'Discarded', tooth: null, provider: 'Elena Martinez', surfaces: [], notes: '', linked: [], diagnoses: [] },
  { id: 'F-3', area: 'Tooth 20', condition: 'localized periodontal pocketing', descriptor: 'Moderate', date: HOY, status: 'Active', tooth: 20, provider: 'Elena Martinez', surfaces: ['B', 'MB'], notes: '', linked: ['#10987231', '#10987232'], diagnoses: [] },
  { id: 'F-4', area: 'Tooth 30', condition: 'severe root surface decay', descriptor: 'Advanced', date: HOY, status: 'In Treatment', tooth: 30, provider: 'Emily Chen', surfaces: ['O'], notes: '', linked: ['#10987233'], diagnoses: [] },
  { id: 'F-5', area: 'Soft Palate', condition: 'oral candidiasis', descriptor: 'Red', date: HOY, status: 'Active', tooth: null, provider: 'Sarah Stone', surfaces: [], notes: '', linked: [], diagnoses: [] },
]

const INITIAL_REVIEWS: ExamReview[] = [
  { id: 'R-1', date: 'January 12, 2026', provider: 'Daniel Anderson', note: 'Charting checked against the radiographs. Caries on tooth 3 confirmed, the rest of the arch is unremarkable. Cleared for treatment planning.' },
]

/* Las acciones de todos los exámenes: blancas, y al pasar el mouse se abren con su texto como Exit clinical Mode. */
const ACCIONES_EXAMEN: { label: string; icono: LucideIcon; modo?: 'procedure' | 'condition' }[] = [
  { label: 'Add Procedure', icono: Plus, modo: 'procedure' },
  { label: 'Add Condition', icono: Stethoscope, modo: 'condition' },
  { label: 'View Problem List', icono: Table2 },
]
const BOTON_ACCION = cn(BOTON_EXPANDIBLE, 'border-line bg-white shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] hover:bg-surface-subtle')

function useEstadoFindings() {
  const [findings, setFindings] = useState<Finding[]>(INITIAL_FINDINGS)
  const reviews = useExamReviews(INITIAL_REVIEWS, HOY)
  return { findings, setFindings, reviews }
}
type EstadoFindings = ReturnType<typeof useEstadoFindings>
const FindingsCtx = createContext<EstadoFindings | null>(null)

/* Los findings y las revisiones del paciente, compartidos por todos los exámenes. */
export function ExamFindingsProvider({ children }: { children: ReactNode }) {
  const estado = useEstadoFindings()
  return <FindingsCtx.Provider value={estado}>{children}</FindingsCtx.Provider>
}

export function ExamLayout({ findings: conFindings = true, extra, children }: {
  /** El panel de Findings a la izquierda. Vitals no lo lleva. */
  findings?: boolean
  /** Lo propio del examen en la misma fila de las acciones, a la derecha (el buscador de Radiography). */
  extra?: ReactNode
  children: ReactNode
}) {
  /* Fuera de ClinicalMode (un story) no hay provider: el examen usa su propio estado. */
  const local = useEstadoFindings()
  const { findings, setFindings, reviews: reviewState } = useContext(FindingsCtx) ?? local

  const [procedureOpen, setProcedureOpen] = useState<'procedure' | 'condition' | null>(null)
  const [editing, setEditing] = useState<Finding | null>(null)
  const [confirming, setConfirming] = useState<{ action: Exclude<FindingAction, 'edit'>; finding: Finding } | null>(null)
  const [problemas, setProblemas] = useState(false)

  function saveProcedure(draft: ProcedureDraft) {
    const tooth = draft.tooth
    setFindings((f) => [
      {
        id: `F-${Date.now()}`,
        area: tooth !== null ? `Tooth ${tooth}` : draft.area,
        condition: `${draft.procedure.code} - ${draft.procedure.label}`,
        descriptor: draft.surfaces.join(', ') || draft.scope,
        date: HOY, status: draft.status === 'Existing' ? 'Externally Treated' : 'Active', tooth, provider: 'Elena Martinez',
        surfaces: draft.surfaces, notes: '', linked: draft.linked, diagnoses: draft.diagnoses,
      },
      ...f,
    ])
    aviso.ok(`${draft.procedure.code} charted as ${draft.status.toLowerCase()} on ${tooth !== null ? `tooth ${tooth}` : draft.area.toLowerCase()}.`)
  }

  function applyConfirm(treatedIds: string[]) {
    if (!confirming) return
    const { action, finding } = confirming
    const status = ACTIONS[action].status

    if (!status) {
      const indice = findings.findIndex((f) => f.id === finding.id)
      setFindings((all) => all.filter((f) => f.id !== finding.id))
      aviso.warn(`${finding.condition} deleted from the exam.`, {
        label: 'Undo',
        onClick: () => setFindings((all) => [...all.slice(0, indice), finding, ...all.slice(indice)]),
      })
      setConfirming(null)
      return
    }

    setFindings((all) => all.map((f) => {
      if (f.id === finding.id) return { ...f, status }
      if (treatedIds.includes(f.id)) return { ...f, status: 'Treated' as const }
      return f
    }))
    aviso.ok(`${finding.condition} marked as ${status.toLowerCase()}.`)
    setConfirming(null)
  }

  const linkedConditions = confirming
    ? findings.filter((f) => f.id !== confirming.finding.id && f.area === confirming.finding.area)
    : []

  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-start">
      {conFindings && (
        <div className="order-2 flex w-full shrink-0 flex-col gap-3 rounded-xl border border-line bg-white p-3 lg:order-1 lg:w-[300px]">
          <ExamPanelHeader tab={reviewState.tab} onTabChange={reviewState.setTab} onNewReview={reviewState.openDialog} />
          <div className="flex w-full flex-col gap-3 lg:max-h-[70vh] lg:overflow-y-auto">
            {reviewState.tab === 'Findings' ? (
              findings.map((f) => (
                <FindingCard
                  key={f.id} finding={f}
                  action={<FindingActionsMenu finding={f} onEdit={() => setEditing(f)} onAction={(action) => setConfirming({ action, finding: f })} />}
                />
              ))
            ) : (
              <ReviewList reviews={reviewState.reviews} />
            )}
          </div>
        </div>
      )}

      <div className="order-1 flex min-w-0 flex-1 flex-col gap-3 lg:order-2">
        {/* Las acciones arriba del contenido del examen. La Problem list se abre flotando, sin cambiar de vista. */}
        <div className="flex flex-wrap items-center gap-2">
          {ACCIONES_EXAMEN.map(({ label, icono: Icono, modo }) => {
            const boton = (
              <button
                key={label}
                type="button"
                aria-label={label}
                onClick={modo ? () => setProcedureOpen(modo) : undefined}
                className={cn(BOTON_ACCION, !modo && problemas && 'border-dash-blue bg-dash-count-bg text-dash-blue-hover hover:bg-dash-count-bg')}
              >
                <Icono className="size-[18px] shrink-0" />
                <span className={ETIQUETA_EXPANDIBLE}>{label}</span>
              </button>
            )
            return modo ? boton : (
              <Popover key={label} open={problemas} onOpenChange={setProblemas}>
                <PopoverTrigger asChild>{boton}</PopoverTrigger>
                <PopoverContent align="start" sideOffset={8} aria-label="Problem list" className="w-[min(820px,calc(100vw-2rem))] gap-0 bg-transparent p-0 shadow-none ring-0">
                  <div className="rounded-xl shadow-[0_16px_40px_rgb(0_0_0/0.18)]"><ProblemList /></div>
                </PopoverContent>
              </Popover>
            )
          })}
          {extra && <div className="ml-auto flex items-center gap-2">{extra}</div>}
        </div>
        {children}
      </div>

      <NewProcedureDrawer
        open={procedureOpen !== null}
        mode={procedureOpen ?? 'procedure'}
        area="Upper left"
        teeth={quadrantTeeth(9)}
        findings={findings}
        onClose={() => setProcedureOpen(null)}
        onSave={saveProcedure}
      />

      <EditFindingDrawer
        finding={editing}
        onClose={() => setEditing(null)}
        onSave={(patch) => setFindings((all) => all.map((f) => (f.id === editing?.id ? { ...f, ...patch } : f)))}
      />

      <ConfirmProcedureDialog
        action={confirming?.action ?? null}
        finding={confirming?.finding ?? null}
        linkedConditions={linkedConditions}
        onCancel={() => setConfirming(null)}
        onConfirm={applyConfirm}
      />

      <ReviewExamDialog open={reviewState.dialogOpen} onCancel={reviewState.closeDialog} onConfirm={reviewState.confirm} />
    </div>
  )
}
