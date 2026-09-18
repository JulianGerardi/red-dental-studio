import { useState } from 'react'
import { NotebookText, X } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export type ExamReview = { id: string; date: string; provider: string; note: string }

const iniciales = (nombre: string) => nombre.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()

/* Quién revisó el exam y cuándo, más reciente primero. */
export function ReviewList({ reviews }: { reviews: ExamReview[] }) {
  const [leyendo, setLeyendo] = useState<ExamReview | null>(null)

  if (!reviews.length) {
    return (
      <div className="bg-dash-count-bg flex flex-1 flex-col items-center justify-center gap-1 rounded-xl px-4 py-10 text-center">
        <p className="text-dash-blue text-xs font-medium">This exam hasn't been reviewed yet.</p>
        <p className="text-dash-blue text-xs font-medium">Use Review Exam to sign it off.</p>
      </div>
    )
  }

  return (
    <>
      <div className="flex w-full flex-col gap-3">
        {reviews.map((r) => (
          <div key={r.id} className="flex w-full flex-col gap-2.5 rounded-xl border border-[#e4e4e7] bg-white p-3">
            <div className="flex w-full items-start justify-between gap-2">
              <span className="flex flex-col rounded-lg bg-[#fafafa] px-2.5 py-1.5">
                <span className="text-[11px] text-[#71717a]">Last Reviewed</span>
                <span className="text-sm font-bold text-[#09090b]">{r.date}</span>
              </span>
              <button
                type="button" aria-label={`Read the review from ${r.date}`} onClick={() => setLeyendo(r)}
                className="flex size-8 items-center justify-center rounded-md border border-[#e4e4e7] text-[#71717a] hover:bg-[#fafafa]"
              >
                <NotebookText className="size-3.5" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <Avatar className="size-8">
                <AvatarFallback className="bg-dash-count-bg text-dash-blue text-[11px] font-bold">{iniciales(r.provider)}</AvatarFallback>
              </Avatar>
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold text-[#09090b]">{r.provider}</span>
                <span className="block text-xs text-[#a1a1aa]">Provider</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={leyendo !== null} onOpenChange={(v) => !v && setLeyendo(null)}>
        <DialogContent showCloseButton={false} className="gap-3 p-5 sm:max-w-[420px]">
          <div className="flex items-start justify-between gap-4">
            <span className="flex flex-col">
              <span className="text-base leading-none font-bold text-[#09090b]">Exam review</span>
              <span className="mt-1 text-xs text-[#a1a1aa]">{leyendo?.provider} · {leyendo?.date}</span>
            </span>
            <button type="button" aria-label="Close" onClick={() => setLeyendo(null)} className="flex size-7 items-center justify-center rounded-md text-[#71717a] hover:bg-[#f4f4f5]">
              <X className="size-4" />
            </button>
          </div>
          <p className="text-sm leading-relaxed whitespace-pre-wrap text-[#09090b]">{leyendo?.note}</p>
        </DialogContent>
      </Dialog>
    </>
  )
}
