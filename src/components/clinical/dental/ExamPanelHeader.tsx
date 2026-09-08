import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

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
      <div className="flex items-center gap-1 rounded-lg bg-[#f1f5f9] p-1">
        {EXAM_PANEL_TABS.map((t) => (
          <button
            key={t} type="button" onClick={() => onTabChange(t)}
            className={cn(
              'h-8 rounded-md px-3 text-xs font-medium whitespace-nowrap transition-colors',
              tab === t ? 'bg-dash-blue text-white' : 'text-[#64748b] hover:text-[#3f3f46]',
            )}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === 'Findings' ? (
        <button type="button" disabled title="Available once the exam has been charted" className="flex h-7 items-center gap-1.5 rounded-md bg-[#f4f4f5] px-2.5 text-[11px] font-semibold text-[#a1a1aa]">
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
