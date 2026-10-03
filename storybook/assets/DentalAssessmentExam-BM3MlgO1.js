import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { Plus, Stethoscope, Table2, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
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

/* Las acciones del examen, flotando arriba a la izquierda del chart: blancas con sombra para despegarse del fondo punteado.
   Con poco ancho queda sólo el ícono, con su tooltip. */
const BOTON_FLOTANTE = 'flex h-9 items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 text-[13px] font-medium whitespace-nowrap shadow-[0_4px_12px_rgb(0_0_0/0.10)] hover:bg-surface-subtle xl:px-3.5'
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
  /* Add Procedure y Add Condition abren el mismo drawer; cambia con qué pestaña arranca. */
  const [procedureOpen, setProcedureOpen] = useState<'procedure' | 'condition' | null>(null)
  const [editing, setEditing] = useState<Finding | null>(null)
  const [confirming, setConfirming] = useState<{ action: Exclude<FindingAction, 'edit'>; finding: Finding } | null>(null)
  const [problemas, setProblemas] = useState(false)
  /* Los controles del odontograma salen en un flotante, no en columna. */
  const [controlesAbiertos, setControlesAbiertos] = useState(false)
  const reviewState = useExamReviews(INITIAL_REVIEWS, HOY)

  /* El "+" abre New Procedure y de una vez deja los controles del diente
     listos: al cerrar el modal (Cancel o Save) el panel ya está ahí,
     sin un botón aparte para "Tooth controls" -se sacó, quedaba
     redundante con esto-. */
  function openProcedure(tooth: number | null, mode: 'procedure' | 'condition' = 'procedure') {
    setProcedureFor(tooth)
    setProcedureOpen(mode)
    setControlesAbiertos(true)
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

      <div className="relative order-1 flex min-w-0 flex-1 flex-col items-center gap-3 overflow-x-auto rounded-xl border border-line p-4 lg:order-2" data-examen style={{ background: 'radial-gradient(#e4e4e7 1px, transparent 1px) 0 0 / 16px 16px, #fafbfe' }}>
        {/* Arriba a la izquierda, en la fila de Odontogram / Periodontal Status, que ahí está libre: se ven apenas se
            abre el examen (abajo quedaban fuera de la pantalla). En el celular van en su propia fila. La Problem list
            se abre flotando sobre el chart, sin cambiar de vista. */}
        <TooltipProvider delayDuration={150}>
          <div className="z-10 flex items-center gap-2 self-start sm:absolute sm:top-[31px] sm:left-4">
            {ACCIONES_EXAMEN.map(({ label, icono: Icono, modo }) => {
              const boton = (
                <button
                  type="button"
                  aria-label={label}
                  onClick={modo ? () => openProcedure(null, modo) : undefined}
                  className={cn(BOTON_FLOTANTE, !modo && problemas && 'border-dash-blue bg-dash-count-bg text-dash-blue-hover')}
                >
                  <Icono className="size-4" /> <span className="hidden xl:inline">{label}</span>
                </button>
              )
              return (
                <Tooltip key={label}>
                  {modo ? (
                    <TooltipTrigger asChild>{boton}</TooltipTrigger>
                  ) : (
                    <Popover open={problemas} onOpenChange={setProblemas}>
                      <TooltipTrigger asChild>
                        <PopoverTrigger asChild>{boton}</PopoverTrigger>
                      </TooltipTrigger>
                      <PopoverContent align="start" sideOffset={8} aria-label="Problem list" className="w-[min(820px,calc(100vw-2rem))] gap-0 bg-transparent p-0 shadow-none ring-0">
                        <div className="rounded-xl shadow-[0_16px_40px_rgb(0_0_0/0.18)]"><ProblemList /></div>
                      </PopoverContent>
                    </Popover>
                  )}
                  <TooltipContent side="bottom" sideOffset={4} className="bg-ink text-white xl:hidden">{label}</TooltipContent>
                </Tooltip>
              )
            })}
          </div>
        </TooltipProvider>
        <OdontogramEmbed controlesAbiertos={controlesAbiertos} onCerrarControles={() => setControlesAbiertos(false)} />
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