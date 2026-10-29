import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { createContext, useContext, useState, type ReactNode } from 'react'
import { Plus, Stethoscope, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { BOTON_EXPANDIBLE, ETIQUETA_EXPANDIBLE } from '@/lib/estilos'
import { ProblemListFlotante } from '@/components/clinical/ProblemListFlotante'
import { registroDeHallazgo, useVerRegistro } from '@/components/clinical/RecordDetail'
import { ExamPanelHeader } from './dental/ExamPanelHeader'
import { ReviewList, type ExamReview } from './dental/ReviewList'
import { ReviewExamDialog } from './dental/ReviewExamDialog'
import { FindingCard } from './dental/FindingCard'
import { FindingActionsMenu } from './dental/FindingActionsMenu'
import { NewProcedureDrawer, type ProcedureDraft } from './dental/NewProcedureDrawer'
import { precioUcr } from '@/data/finanzas'
import { EditFindingDrawer } from './dental/EditFindingDrawer'
import { textoDescriptores } from './dental/DescriptorFields'
import { ConfirmProcedureDialog } from './dental/ConfirmProcedureDialog'
import { useExamReviews } from './dental/useExamReviews'
import { ACTIONS, type FindingAction } from './dental/actions'
import { areaDeAlcance, quadrantTeeth, type Finding } from './dental/data'
import { ULTIMA_CONDICION, type UltimaCondicion } from '@/data/clinical-mode'

/* Lo que comparten todos los exámenes de Clinical Mode (Julián, 2026-10-03): el panel de Findings a la izquierda (menos
   en Vitals) y arriba del contenido las acciones Add Procedure, Add Condition y View Problem List, blancas y con el texto
   que se abre al pasar el mouse. Los findings son del paciente, no del examen: con \`ExamFindingsProvider\` (en
   ClinicalMode) son los mismos al pasar de un examen a otro. Ver design-reference/figma/modulos/clinical-mode.md. */

const HOY = 'May 14, 2026'

const INITIAL_FINDINGS: Finding[] = [
  { id: 'F-1', area: 'Tooth 3', condition: 'chronic enamel dental caries', descriptor: 'Deep', date: HOY, status: 'Discarded', tooth: 3, provider: 'Elena Martinez', surfaces: ['O', 'DB'], notes: '', linked: [], diagnoses: [], examen: 'Dental Assessment', problema: 'p5', kind: 'condition' },
  { id: 'F-2', area: 'Soft Palate', condition: 'oral candidiasis', descriptor: 'Red', date: HOY, status: 'Discarded', tooth: null, provider: 'Elena Martinez', surfaces: [], notes: '', linked: [], diagnoses: [], examen: 'Intraoral', kind: 'condition', descriptors: { colors: 'Red' } },
  { id: 'F-3', area: 'Tooth 20', condition: 'localized periodontal pocketing', descriptor: 'Moderate', date: HOY, status: 'Active', tooth: 20, provider: 'Elena Martinez', surfaces: ['B', 'MB'], notes: '', linked: ['#10987231', '#10987232'], diagnoses: [], examen: 'Periodontal', kind: 'condition' },
  { id: 'F-4', area: 'Tooth 30', condition: 'severe root surface decay', descriptor: 'Advanced', date: HOY, status: 'In Treatment', tooth: 30, provider: 'Emily Chen', surfaces: ['O'], notes: '', linked: ['#10987233'], diagnoses: [], examen: 'Dental Assessment', kind: 'condition' },
  { id: 'F-5', area: 'Soft Palate', condition: 'oral candidiasis', descriptor: 'Red', date: HOY, status: 'Active', tooth: null, provider: 'Sarah Stone', surfaces: [], notes: '', linked: [], diagnoses: [], examen: 'Intraoral', kind: 'condition', descriptors: { colors: 'Red' } },
]

const INITIAL_REVIEWS: ExamReview[] = [
  { id: 'R-1', date: 'January 12, 2026', provider: 'Daniel Anderson', note: 'Charting checked against the radiographs. Caries on tooth 3 confirmed, the rest of the arch is unremarkable. Cleared for treatment planning.' },
]

/* Las acciones de todos los exámenes: blancas, y al pasar el mouse se abren con su texto como Exit clinical Mode. El
   tooltip no repite el nombre, que ya se lee en el botón: dice qué hace. */
const ACCIONES_EXAMEN: { label: string; ayuda: string; icono: LucideIcon; modo: 'procedure' | 'condition' }[] = [
  { label: 'Add Procedure', ayuda: 'Chart a planned procedure', icono: Plus, modo: 'procedure' },
  { label: 'Add Condition', ayuda: 'Chart a condition or work the patient already has', icono: Stethoscope, modo: 'condition' },
]
const BOTON_ACCION = cn(BOTON_EXPANDIBLE, 'border-line bg-white shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] hover:bg-surface-subtle')

function useEstadoFindings() {
  const [findings, setFindings] = useState<Finding[]>(INITIAL_FINDINGS)
  const reviews = useExamReviews(INITIAL_REVIEWS, HOY)
  /* Lo último que se cargó con Add Condition: lo muestra el Overview (clinical-mode.md, 2026-10-18). */
  const [ultima, setUltima] = useState<UltimaCondicion>(ULTIMA_CONDICION)
  return { findings, setFindings, reviews, ultima, setUltima }
}
type EstadoFindings = ReturnType<typeof useEstadoFindings>
const FindingsCtx = createContext<EstadoFindings | null>(null)

/* Los findings y las revisiones del paciente, compartidos por todos los exámenes. */
export function ExamFindingsProvider({ children }: { children: ReactNode }) {
  const estado = useEstadoFindings()
  return <FindingsCtx.Provider value={estado}>{children}</FindingsCtx.Provider>
}

/** La última condición cargada; sin provider (un story), la del frame. */
export const useUltimaCondicion = () => useContext(FindingsCtx)?.ultima ?? ULTIMA_CONDICION

/** Los findings del paciente y cómo guardar uno nuevo, para un examen con su propio Add Condition (Extraoral,
   Intraoral: por región, no por diente). Sin provider (un story), nada -ese examen no corre fuera de ClinicalMode. */
export const useFindingsEstado = () => useContext(FindingsCtx)

/** Extraoral e Intraoral: las regiones elegidas en el gráfico, sobre las que se carga lo nuevo. */
export type RegionesElegidas = { elegidas: string[]; quitar: (region: string) => void; limpiar: () => void; tipo: 'Extraoral' | 'Intraoral' }

export function ExamLayout({ findings: conFindings = true, examen, extra, onCondicion, regiones, children }: {
  /** El panel de Findings a la izquierda. Vitals no lo lleva. */
  findings?: boolean
  /** El examen, como lo nombra la Problem List: es el Source exam de lo que se carga acá. */
  examen?: string
  /** Lo propio del examen en la misma fila de las acciones, a la derecha (el buscador de Radiography). */
  extra?: ReactNode
  /** Reemplaza el drawer genérico de Add Condition (NewProcedureDrawer, por diente) por el propio del examen -
     Extraoral e Intraoral cargan por región, no por pieza. Ver ExtraOralExam.tsx. */
  onCondicion?: () => void
  /** Con regiones, Add Procedure y Add Condition piden al menos una elegida (red.dev, Julián 2026-10-28) y New
     Procedure se carga sobre ellas en vez de sobre un diente. */
  regiones?: RegionesElegidas
  children: ReactNode
}) {
  /* Fuera de ClinicalMode (un story) no hay provider: el examen usa su propio estado. */
  const local = useEstadoFindings()
  const { findings, setFindings, reviews: reviewState, setUltima } = useContext(FindingsCtx) ?? local

  const [procedureOpen, setProcedureOpen] = useState<'procedure' | 'condition' | null>(null)
  const [editing, setEditing] = useState<Finding | null>(null)
  const [confirming, setConfirming] = useState<{ action: Exclude<FindingAction, 'edit'>; finding: Finding } | null>(null)
  /* View full record de cada finding: el drawer de la Problem List, sin salir del examen. */
  const { ver, drawer } = useVerRegistro()

  function saveProcedure(draft: ProcedureDraft) {
    const id = \`F-\${Date.now()}\`
    const tooth = regiones ? null : draft.tooth
    const esCondicion = procedureOpen === 'condition'
    const area = regiones ? regiones.elegidas.join(', ') : tooth !== null ? \`Tooth \${tooth}\` : draft.area
    const descriptorTexto = esCondicion ? textoDescriptores(draft.descriptors) : ''
    setFindings((f) => [
      {
        id,
        area,
        condition: \`\${draft.procedure.code} - \${draft.procedure.label}\`,
        descriptor: descriptorTexto || draft.surfaces.join(', ') || (regiones ? '' : draft.scope),
        date: HOY, status: draft.status === 'Existing' ? 'Externally Treated' : 'Active', tooth, provider: 'Elena Martinez',
        surfaces: draft.surfaces, notes: '', linked: draft.linked, diagnoses: draft.diagnoses, examen,
        kind: procedureOpen ?? 'procedure', descriptors: esCondicion ? draft.descriptors : undefined,
        fee: esCondicion ? undefined : precioUcr(draft.procedure.code),
        treatmentArea: regiones ? { tipo: regiones.tipo, valor: area } : areaDeAlcance(draft.scope, draft.area, tooth),
      },
      ...f,
    ])
    if (procedureOpen === 'condition') {
      setUltima({ condicion: draft.procedure.label, actualizado: new Date().toLocaleDateString('en-GB'), pieza: tooth, examen })
    }
    aviso.ok(\`\${draft.procedure.code} charted as \${draft.status.toLowerCase()} on \${regiones ? area : tooth !== null ? \`tooth \${tooth}\` : draft.area.toLowerCase()}.\`)
    return id
  }

  /** Add Procedure / Add Condition. En Extraoral e Intraoral, sin región elegida avisa en vez de abrir. */
  function abrir(modo: 'procedure' | 'condition') {
    if (regiones && !regiones.elegidas.length) {
      aviso.warn(\`Select at least one area on the chart to add a \${modo}.\`)
      return
    }
    if (modo === 'condition' && onCondicion) onCondicion()
    else setProcedureOpen(modo)
  }

  /** Link to finding / Link to diagnosis: se guardan sobre el procedimiento ya cargado con saveProcedure. */
  function linkProcedure(id: string, patch: { linked: string[]; diagnoses: string[] }) {
    setFindings((all) => all.map((f) => (f.id === id ? { ...f, ...patch } : f)))
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
    <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-start">
      {conFindings && (
        <div className="order-2 flex w-full shrink-0 flex-col gap-3 rounded-lg bg-white shadow-panel p-3 lg:order-1 lg:w-[300px]">
          <ExamPanelHeader tab={reviewState.tab} onTabChange={reviewState.setTab} onNewReview={reviewState.openDialog} />
          <div className="flex w-full flex-col gap-3 lg:max-h-[70vh] lg:overflow-y-auto">
            {reviewState.tab === 'Findings' ? (
              findings.map((f) => (
                <FindingCard
                  key={f.id} finding={f}
                  action={<FindingActionsMenu finding={f} onVer={() => ver(registroDeHallazgo(f))} onEdit={() => setEditing(f)} onAction={(action) => setConfirming({ action, finding: f })} />}
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
        <TooltipProvider delayDuration={400}>
        <div className="flex flex-wrap items-center gap-2">
          {ACCIONES_EXAMEN.map(({ label, ayuda, icono: Icono, modo }) => (
            <Tooltip key={label}>
              <TooltipTrigger asChild>
                <button type="button" aria-label={label} onClick={() => abrir(modo)} className={BOTON_ACCION}>
                  <Icono className="size-[18px] shrink-0" />
                  <span className={ETIQUETA_EXPANDIBLE}>{label}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={6} className="bg-ink text-white">{ayuda}</TooltipContent>
            </Tooltip>
          ))}
          <ProblemListFlotante />
          {extra && <div className="ml-auto flex items-center gap-2">{extra}</div>}
        </div>
        </TooltipProvider>
        {children}
      </div>

      <NewProcedureDrawer
        open={procedureOpen !== null}
        mode={procedureOpen ?? 'procedure'}
        area="Upper left"
        teeth={quadrantTeeth(9)}
        regiones={regiones?.elegidas}
        onRemoveRegion={regiones?.quitar}
        findings={findings}
        onClose={() => { setProcedureOpen(null); regiones?.limpiar() }}
        onSave={saveProcedure}
        onLink={linkProcedure}
      />

      <EditFindingDrawer
        finding={editing}
        findings={findings}
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
      {drawer}
    </div>
  )
}
`})))()}export{n,i as r,r as t};