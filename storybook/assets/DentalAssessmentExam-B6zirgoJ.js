import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { Plus, Stethoscope, Table2, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { BOTON_EXPANDIBLE, ETIQUETA_EXPANDIBLE } from '@/lib/estilos'
import { BotoneraDientes } from './dental/BotoneraDientes'
import { aviso } from '@/components/ui/toaster'
import { OdontogramEmbed } from '@/components/clinical/OdontogramEmbed'
import { ProblemList } from '@/components/clinical/ProblemList'
import { ExamPanelHeader } from './dental/ExamPanelHeader'
import { ReviewList, type ExamReview } from './dental/ReviewList'
import { ReviewExamDialog } from './dental/ReviewExamDialog'
import { FindingCard } from './dental/FindingCard'
import { FindingActionsMenu } from './dental/FindingActionsMenu'
import { NewProcedureDrawer, type ProcedureDraft } from './dental/NewProcedureDrawer'
import { EditProcedureModal } from './dental/EditProcedureModal'
import { ConfirmProcedureDialog } from './dental/ConfirmProcedureDialog'
import { useExamReviews } from './dental/useExamReviews'
import { ACTIONS, type FindingAction } from './dental/actions'
import { neighbours, quadrantTeeth, type Finding } from './dental/data'

/* DentAssmt — Figma (proyecto hermano, misma spec). Reusa nuestro
   \`Odontogram\` real en vez del PNG con hotspots del original: ya existe,
   opera de verdad y es lo que pide \`ClinicalMode.tsx\` desde el principio
   ("no una foto"). Acá el click en un diente abre su detalle en vez de
   pintar superficies -eso pasa dentro de "New Procedure"-. Ver
   design-reference/figma/modulos/clinical-mode.md. */

const HOY = 'May 14, 2026'

/* Las acciones del examen, como Exit clinical Mode: sólo el ícono, y al pasar el mouse se abren con su texto. */
const ACCIONES_EXAMEN: { label: string; icono: LucideIcon; modo?: 'procedure' | 'condition' }[] = [
  { label: 'Add Procedure', icono: Plus, modo: 'procedure' },
  { label: 'Add Condition', icono: Stethoscope, modo: 'condition' },
  { label: 'View Problem List', icono: Table2 },
]

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



export function DentalAssessmentExam() {
  const [findings, setFindings] = useState<Finding[]>(INITIAL_FINDINGS)
  /* El chart sólo aparece una vez elegida la dentición. */
  const [procedureFor, setProcedureFor] = useState<number | null>(null)
  /* El lienzo del chart: la botonera de selección busca ahí las piezas de la librería. */
  const [lienzo, setLienzo] = useState<HTMLDivElement | null>(null)
  /* Add Procedure y Add Condition abren el mismo drawer; cambia con qué pestaña arranca. */
  const [procedureOpen, setProcedureOpen] = useState<'procedure' | 'condition' | null>(null)
  const [editing, setEditing] = useState<Finding | null>(null)
  const [confirming, setConfirming] = useState<{ action: Exclude<FindingAction, 'edit'>; finding: Finding } | null>(null)
  const [problemas, setProblemas] = useState(false)
  const reviewState = useExamReviews(INITIAL_REVIEWS, HOY)

  /* La tabla de controles del diente ya no se abre: la selección va por la botonera de arriba (Julián, 2026-10-03). */
  function openProcedure(tooth: number | null, mode: 'procedure' | 'condition' = 'procedure') {
    setProcedureFor(tooth)
    setProcedureOpen(mode)
  }

  function saveProcedure(draft: ProcedureDraft) {
    const tooth = draft.tooth
    setFindings((f) => [
      {
        id: \`F-\${Date.now()}\`,
        area: tooth !== null ? \`Tooth \${tooth}\` : draft.area,
        condition: \`\${draft.procedure.code} - \${draft.procedure.label}\`,
        descriptor: draft.surfaces.join(', ') || draft.scope,
        date: HOY, status: draft.status === 'Existing' ? 'Externally Treated' : 'Active', tooth, provider: 'Elena Martinez',
        surfaces: draft.surfaces, notes: '', linked: draft.linked, diagnoses: draft.diagnoses,
      },
      ...f,
    ])
    aviso.ok(\`\${draft.procedure.code} charted as \${draft.status.toLowerCase()} on \${tooth !== null ? \`tooth \${tooth}\` : draft.area.toLowerCase()}.\`)
  }

  function applyConfirm(treatedIds: string[]) {
    if (!confirming) return
    const { action, finding } = confirming
    const status = ACTIONS[action].status

    if (!status) {
      const indice = findings.findIndex((f) => f.id === finding.id)
      setFindings((all) => all.filter((f) => f.id !== finding.id))
      aviso.warn(\`\${finding.condition} deleted from the exam.\`, {
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
    aviso.ok(\`\${finding.condition} marked as \${status.toLowerCase()}.\`)
    setConfirming(null)
  }

  const linkedConditions = confirming
    ? findings.filter((f) => f.id !== confirming.finding.id && f.area === confirming.finding.area)
    : []


  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-start">
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

      <div ref={setLienzo} className="relative order-1 flex min-w-0 flex-1 flex-col items-center gap-3 overflow-x-auto rounded-xl border border-line p-4 lg:order-2" data-examen style={{ background: 'radial-gradient(#e4e4e7 1px, transparent 1px) 0 0 / 16px 16px, #fafbfe' }}>
        {/* Arriba del chart, la botonera de selección de la app real. Las acciones del examen van a la izquierda de la barra
            de Odontogram / Periodontal Status, que ahí está libre. La Problem list se abre flotando sobre el chart. */}
        <div className="w-full"><BotoneraDientes raiz={lienzo} /></div>
        <OdontogramEmbed
          controlesAbiertos={false}
          onCerrarControles={() => {}}
          accionesBarra={
            <>
            {ACCIONES_EXAMEN.map(({ label, icono: Icono, modo }) => {
              const boton = (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  onClick={modo ? () => openProcedure(null, modo) : undefined}
                  className={cn(BOTON_EXPANDIBLE, !modo && problemas && 'border-dash-blue bg-dash-count-bg text-dash-blue-hover hover:bg-dash-count-bg')}
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
            </>
          }
        />
      </div>
      </div>

      <NewProcedureDrawer
        open={procedureOpen !== null}
        mode={procedureOpen ?? 'procedure'}
        area={procedureFor !== null ? \`Tooth \${procedureFor}\` : 'Upper left'}
        teeth={procedureFor !== null ? neighbours(procedureFor) : quadrantTeeth(9)}
        findings={findings}
        onClose={() => setProcedureOpen(null)}
        onSave={saveProcedure}
      />

      <EditProcedureModal
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
`})))()}export{n,i as r,r as t};