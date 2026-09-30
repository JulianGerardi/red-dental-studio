import { useState } from 'react'
import { aviso } from '@/components/ui/toaster'
import type { ExamPanelTab } from './ExamPanelHeader'
import type { ExamReview } from './ReviewList'

/* Todo lo que necesita el split Findings/Review exam, compartido por los
   tres exams. */
export function useExamReviews(inicial: ExamReview[] = [], hoy = 'May 14, 2026') {
  const [tab, setTab] = useState<ExamPanelTab>('Findings')
  const [reviews, setReviews] = useState<ExamReview[]>(inicial)
  const [dialogOpen, setDialogOpen] = useState(false)

  return {
    tab,
    setTab,
    reviews,
    dialogOpen,
    openDialog: () => setDialogOpen(true),
    closeDialog: () => setDialogOpen(false),
    confirm(nota: string) {
      setReviews((r) => [{ id: `R-${Date.now()}`, date: hoy, provider: 'Elena Martinez', note: nota }, ...r])
      setDialogOpen(false)
      setTab('Review exam')
      aviso.ok('Exam reviewed.')
    },
  }
}
