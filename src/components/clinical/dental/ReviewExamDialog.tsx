import { useEffect, useState } from 'react'
import { Check, CircleAlert, X } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { TextArea } from '@/components/patients/form'

/* Firmar el exam: hace falta una nota antes de poder confirmar. */
export function ReviewExamDialog({
  open, onCancel, onConfirm,
}: {
  open: boolean
  onCancel: () => void
  onConfirm: (note: string) => void
}) {
  const [nota, setNota] = useState('')

  useEffect(() => { if (open) setNota('') }, [open])

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onCancel()}>
      <DialogContent showCloseButton={false} className="gap-3 p-5 sm:max-w-[400px]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span aria-hidden className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#e4e4e7] text-[#09090b]">
              <CircleAlert className="size-4" />
            </span>
            <h2 className="text-base leading-none font-bold text-[#09090b]">Review Exam</h2>
          </div>
          <button type="button" aria-label="Close" onClick={onCancel} className="flex size-7 items-center justify-center rounded-md text-[#71717a] hover:bg-[#f4f4f5]">
            <X className="size-4" />
          </button>
        </div>

        <p className="text-xs leading-relaxed text-[#71717a]">Are you sure you want to review this exam?</p>

        <TextArea label="Review" required placeholder="Add review" value={nota} onChange={setNota} />

        <div className="flex items-center justify-end gap-2">
          <button type="button" onClick={onCancel} className="flex items-center gap-1.5 rounded-md border border-[#e4e4e7] px-3 py-1.5 text-[13px] font-medium hover:bg-[#fafafa]">
            <X className="size-3" /> Cancel
          </button>
          <button
            type="button" disabled={!nota.trim()} onClick={() => onConfirm(nota.trim())}
            className="bg-dash-blue hover:bg-dash-blue-hover flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-semibold text-white disabled:opacity-40"
          >
            <Check className="size-3" /> Confirm
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
