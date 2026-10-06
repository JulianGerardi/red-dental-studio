import { useEffect, useState } from 'react'
import { CircleAlert } from 'lucide-react'
import { Drawer, DrawerActions } from '@/components/ui/drawer'
import { TextArea } from '@/components/patients/form'

/* Firmar el exam: hace falta una nota antes de poder confirmar. Drawer, como todo lo que se carga encima de una pantalla. */
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
    <Drawer
      open={open} onClose={onCancel} title="Review Exam" description="Are you sure you want to review this exam?"
      footer={<DrawerActions onCancel={onCancel} onSave={() => onConfirm(nota.trim())} saveLabel="Confirm" saveDisabled={!nota.trim()} />}
    >
      <div className="flex flex-col gap-3 pt-2">
        <p className="flex items-start gap-2 text-xs leading-relaxed text-ink-muted">
          <CircleAlert className="mt-px size-4 shrink-0 text-ink" aria-hidden />
          The review is signed with your name and stays in the exam history.
        </p>
        <TextArea label="Review" required placeholder="Add review" value={nota} onChange={setNota} />
      </div>
    </Drawer>
  )
}
