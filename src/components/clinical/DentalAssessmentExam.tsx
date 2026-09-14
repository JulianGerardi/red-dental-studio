import { useState } from 'react'
import { Plus, FilePlus, Table2, SlidersHorizontal } from 'lucide-react'
import { aviso } from '@/components/ui/toaster'
import { ModalShell, SelectField, TextArea, FormFooter } from '@/components/patients/form'
import { OdontogramEmbed } from '@/components/clinical/OdontogramEmbed'
import { ExamPanelHeader } from './dental/ExamPanelHeader'
import { ReviewList, type ExamReview } from './dental/ReviewList'
import { ReviewExamDialog } from './dental/ReviewExamDialog'
import { FindingCard } from './dental/FindingCard'
import { FindingActionsMenu } from './dental/FindingActionsMenu'
import { NewProcedureModal, type ProcedureDraft } from './dental/NewProcedureModal'
import { EditProcedureModal } from './dental/EditProcedureModal'
import { ConfirmProcedureDialog } from './dental/ConfirmProcedureDialog'
import { useExamReviews } from './dental/useExamReviews'
import { ACTIONS, type FindingAction } from './dental/actions'
import { STATUS_STYLE, neighbours, quadrantTeeth, type Finding } from './dental/data'

/* DentAssmt — Figma (proyecto hermano, misma spec). Reusa nuestro
   `Odontogram` real en vez del PNG con hotspots del original: ya existe,
   opera de verdad y es lo que pide `ClinicalMode.tsx` desde el principio
   ("no una foto"). Acá el click en un diente abre su detalle en vez de
   pintar superficies -eso pasa dentro de "New Procedure"-. Ver
   design-reference/figma/modulos/clinical-mode.md. */

const HOY = 'May 14, 2026'

const INITIAL_FINDINGS: Finding[] = [
  { id: 'F-1', area: 'Tooth 3', condition: 'chronic enamel dental caries', descriptor: 'Deep', date: HOY, status: 'Discarded', tooth: 3, provider: 'Elena Martinez', surfaces: ['O', 'DB'], notes: '', linked: [], diagnoses: [] },
  { id: 'F-2', area: 'Soft Palate', condition: 'oral candidiasis', descriptor: 'Red', date: HOY, status: 'Discarded', tooth: null, provider: 'Elena Martinez', surfaces: [], notes: '', linked: [], diagnoses: [] },
  { id: 'F-3', area: 'Tooth 20', condition: 'localized periodontal pocketing', descriptor: 'Moderate', date: HOY, status: 'Active', tooth: 20, provider: 'Elena Martinez', surfaces: ['B', 'MB'], notes: '', linked: ['#10987231', '#10987232'], diagnoses: [] },
  { id: 'F-4', area: 'Tooth 30', condition: 'severe root surface decay', descriptor: 'Advanced', date: HOY, status: 'In Treatment', tooth: 30, provider: 'Emily Chen', surfaces: ['O'], notes: '', linked: ['#10987233'], diagnoses: [] },
  { id: 'F-5', area: 'Soft Palate', condition: 'oral candidiasis', descriptor: 'Red', date: HOY, status: 'Active', tooth: null, provider: 'Sarah Stone', surfaces: [], notes: '', linked: [], diagnoses: [] },
]

const DOCUMENT_TYPES = ['Clinical note', 'Consent form', 'Lab prescription', 'Referral letter']

const INITIAL_REVIEWS: ExamReview[] = [
  { id: 'R-1', date: 'January 12, 2026', provider: 'Daniel Anderson', note: 'Charting checked against the radiographs. Caries on tooth 3 confirmed, the rest of the arch is unremarkable. Cleared for treatment planning.' },
]



function NewDocumentDialog({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: (type: string) => void }) {
  const [type, setType] = useState(DOCUMENT_TYPES[0])
  const [note, setNote] = useState('')
  if (!open) return null
  return (
    <ModalShell title="New document" onClose={onClose} width="max-w-[380px]" footer={<FormFooter onCancel={onClose} onSave={() => { onSave(type); onClose() }} />}>
      <div className="flex flex-col gap-4">
        <SelectField label="Type" required value={type} onChange={setType} options={DOCUMENT_TYPES} />
        <TextArea label="Notes" value={note} onChange={setNote} placeholder="What should this document say?" />
      </div>
    </ModalShell>
  )
}

export function DentalAssessmentExam() {
  const [findings, setFindings] = useState<Finding[]>(INITIAL_FINDINGS)
  /* El chart sólo aparece una vez elegida la dentición. */
  const [procedureFor, setProcedureFor] = useState<number | null>(null)
  const [procedureOpen, setProcedureOpen] = useState(false)
  const [editing, setEditing] = useState<Finding | null>(null)
  const [confirming, setConfirming] = useState<{ action: Exclude<FindingAction, 'edit'>; finding: Finding } | null>(null)
  const [documentOpen, setDocumentOpen] = useState(false)
  const [view, setView] = useState<'chart' | 'table'>('chart')
  /* Los controles del odontograma salen en un flotante, no en columna. */
  const [controlesAbiertos, setControlesAbiertos] = useState(false)
  const reviewState = useExamReviews(INITIAL_REVIEWS, HOY)

  function openProcedure(tooth: number | null) {
    setProcedureFor(tooth)
    setProcedureOpen(true)
  }

  function saveProcedure(draft: ProcedureDraft) {
    const tooth = draft.tooth
    setFindings((f) => [
      {
        id: `F-${Date.now()}`,
        area: tooth !== null ? `Tooth ${tooth}` : draft.area,
        condition: `${draft.procedure.code} - ${draft.procedure.label}`,
        descriptor: draft.surfaces.join(', ') || draft.scope,
        date: HOY, status: 'Active', tooth, provider: 'Elena Martinez',
        surfaces: draft.surfaces, notes: '', linked: draft.linked, diagnoses: draft.diagnoses,
      },
      ...f,
    ])
    aviso.ok(`${draft.procedure.code} charted on ${tooth !== null ? `tooth ${tooth}` : draft.area.toLowerCase()}.`)
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
      <div className="order-2 flex w-full shrink-0 flex-col gap-3 rounded-xl border border-[#e4e4e7] bg-white p-3 lg:order-1 lg:w-[300px]">
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

      <div className="relative order-1 flex min-w-0 flex-1 flex-col items-center gap-3 overflow-x-auto rounded-xl border border-[#e4e4e7] p-4 lg:order-2 lg:pr-20" data-examen style={{ background: 'radial-gradient(#e4e4e7 1px, transparent 1px) 0 0 / 16px 16px, #fbfefc' }}>
        {view === 'table' ? (
          <div className="w-full overflow-x-auto rounded-lg border border-[#e4e4e7] bg-white">
            <div className="min-w-[720px]">
              <div className="flex h-12 items-center gap-3 border-b border-[#e7e7e7] bg-[#f9f9f9] px-4 text-xs font-semibold text-[#71717a]">
                <span className="w-[90px] shrink-0">Date</span>
                <span className="w-[110px] shrink-0">Area</span>
                <span className="w-[90px] shrink-0">Surface</span>
                <span className="min-w-[180px] flex-1">Condition</span>
                <span className="w-[110px] shrink-0">Provider</span>
                <span className="w-[110px] shrink-0 text-center">Status</span>
              </div>
              {findings.map((f) => {
                const style = STATUS_STYLE[f.status]
                return (
                  <div key={f.id} className="flex items-center gap-3 border-b border-[#e7e7e7] px-4 py-3 text-[13px] text-[#3f3f46] last:border-0">
                    <span className="w-[90px] shrink-0">{f.date}</span>
                    <span className="w-[110px] shrink-0 truncate">{f.area}</span>
                    <span className="w-[90px] shrink-0">{f.surfaces.join(', ') || '—'}</span>
                    <span className="text-dash-blue min-w-[180px] flex-1 truncate font-semibold">{f.condition}</span>
                    <span className="w-[110px] shrink-0 truncate">{f.provider}</span>
                    <span className="w-[110px] shrink-0 text-center">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${style.badge}`}>{f.status}</span>
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <OdontogramEmbed controlesAbiertos={controlesAbiertos} onCerrarControles={() => setControlesAbiertos(false)} />
        )}

        <div
          className="absolute right-4 z-30 flex flex-col gap-2"
          /* Pegada al pie del gráfico: así no se mueve cuando el panel de
             controles se abre debajo y estira la card. */
          style={{ top: 'calc(var(--odonto-chart-fin, 620px) - 196px)' }}
        >
          <button type="button" aria-label="New procedure" onClick={() => openProcedure(null)} className="flex size-11 items-center justify-center rounded-full border border-[#e4e4e7] bg-white text-[#09090b] shadow-md hover:bg-[#fafafa]">
            <Plus className="size-4" />
          </button>
          <button type="button" aria-label="New document" onClick={() => setDocumentOpen(true)} className="flex size-11 items-center justify-center rounded-full border border-[#e4e4e7] bg-white text-[#09090b] shadow-md hover:bg-[#fafafa]">
            <FilePlus className="size-4" />
          </button>
          <button
            type="button" aria-label="Tooth controls" aria-pressed={controlesAbiertos}
            onClick={() => setControlesAbiertos((v) => !v)}
            className={`flex size-11 items-center justify-center rounded-full shadow-md ${controlesAbiertos ? 'bg-dash-blue text-white' : 'border border-[#e4e4e7] bg-white text-[#09090b] hover:bg-[#fafafa]'}`}
          >
            <SlidersHorizontal className="size-4" />
          </button>
          <button
            type="button" aria-label={view === 'table' ? 'View chart' : 'View table'} aria-pressed={view === 'table'}
            onClick={() => setView((v) => (v === 'table' ? 'chart' : 'table'))}
            className={`flex size-11 items-center justify-center rounded-full shadow-md ${view === 'table' ? 'bg-dash-blue text-white' : 'border border-[#e4e4e7] bg-white text-[#09090b] hover:bg-[#fafafa]'}`}
          >
            <Table2 className="size-4" />
          </button>
        </div>
      </div>


      <NewProcedureModal
        open={procedureOpen}
        area={procedureFor !== null ? `Tooth ${procedureFor}` : 'Upper left'}
        teeth={procedureFor !== null ? neighbours(procedureFor) : quadrantTeeth(9)}
        onClose={() => setProcedureOpen(false)}
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

      <NewDocumentDialog open={documentOpen} onClose={() => setDocumentOpen(false)} onSave={(type) => aviso.ok(`${type} added to the patient's documents.`)} />

      <ReviewExamDialog open={reviewState.dialogOpen} onCancel={reviewState.closeDialog} onConfirm={reviewState.confirm} />
    </div>
  )
}
