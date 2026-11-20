import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { Plus } from 'lucide-react'
import { Tabs } from '@/components/ui/tabs'

export const EXAM_PANEL_TABS = ['Findings', 'Review exam'] as const
export type ExamPanelTab = (typeof EXAM_PANEL_TABS)[number]

/* Header que comparten los tres exams: las dos mitades del panel como
   segmented control, más la acción de la mitad activa. */
export function ExamPanelHeader({
  tab, onTabChange, onNewReview,
}: {
  tab: ExamPanelTab
  onTabChange: (t: ExamPanelTab) => void
  onNewReview: () => void
}) {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-2">
      <Tabs aria-label="Exam panel" tabs={EXAM_PANEL_TABS} value={tab} onChange={onTabChange} />
      {tab === 'Findings' ? (
        <button type="button" disabled title="Available once the exam has been charted" className="flex h-7 items-center gap-1.5 rounded-md bg-surface-muted px-2.5 text-[11px] font-semibold text-ink-faint">
          <Plus className="size-3" /> No Finding
        </button>
      ) : (
        <button type="button" onClick={onNewReview} className="bg-dash-blue hover:bg-dash-blue-hover flex h-7 items-center gap-1.5 rounded-md px-2.5 text-[11px] font-semibold text-white">
          <Plus className="size-3" /> Review Exam
        </button>
      )}
    </div>
  )
}
`})))()}export{n,i as r,r as t};