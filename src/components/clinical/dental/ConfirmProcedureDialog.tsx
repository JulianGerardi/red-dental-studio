import { useEffect, useState } from 'react'
import { Check, X } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { FindingCard } from './FindingCard'
import { ACTIONS, type FindingAction } from './actions'
import type { Finding } from './data'

/* Confirmación antes de cambiar el estado de un finding. Cuando el área
   tiene otras condiciones cargadas, la lista permite marcarlas Treated
   al mismo tiempo. */
export function ConfirmProcedureDialog({
  action, finding, linkedConditions, onCancel, onConfirm,
}: {
  action: Exclude<FindingAction, 'edit'> | null
  finding: Finding | null
  linkedConditions: Finding[]
  onCancel: () => void
  onConfirm: (treatedIds: string[]) => void
}) {
  const [treated, setTreated] = useState<string[]>([])

  useEffect(() => {
    setTreated(linkedConditions.map((c) => c.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, finding?.id])

  if (!action || !finding) return null
  const copy = ACTIONS[action]
  const hasList = linkedConditions.length > 0 && action !== 'delete'

  return (
    <Dialog open onOpenChange={(v) => !v && onCancel()}>
      <DialogContent showCloseButton={false} className={`gap-3 p-5 ${hasList ? 'sm:max-w-[400px]' : 'sm:max-w-[360px]'}`}>
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-base leading-none font-bold text-ink">{copy.title}</h2>
          <button type="button" aria-label="Close" onClick={onCancel} className="flex size-7 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted">
            <X className="size-4" />
          </button>
        </div>

        {hasList ? (
          <p className="text-xs leading-relaxed text-ink-muted">
            You are about to {copy.verb}.<br />Select any linked conditions you want to mark as Treated.
          </p>
        ) : (
          <p className="text-xs leading-relaxed text-ink-muted">{copy.question}</p>
        )}

        {hasList && (
          <div className="flex max-h-[46vh] flex-col gap-2.5 overflow-y-auto">
            {linkedConditions.map((c) => {
              const on = treated.includes(c.id)
              return (
                <button
                  key={c.id} type="button" aria-pressed={on}
                  onClick={() => setTreated((t) => (on ? t.filter((x) => x !== c.id) : [...t, c.id]))}
                  className={`rounded-md text-left transition-shadow outline-none ${on ? 'ring-dash-blue ring-2' : 'ring-1 ring-transparent hover:ring-line'}`}
                >
                  <FindingCard
                    finding={c}
                    action={
                      <span aria-hidden className={`flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors ${on ? 'bg-dash-blue border-dash-blue text-white' : 'border-line-strong bg-white'}`}>
                        {on && <Check className="size-2.5" strokeWidth={3} />}
                      </span>
                    }
                  />
                </button>
              )
            })}
          </div>
        )}

        <div className="flex items-center justify-end gap-2">
          <button type="button" onClick={onCancel} className="flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-[13px] font-medium hover:bg-surface-subtle">
            <X className="size-3" /> Cancel
          </button>
          <button
            type="button" onClick={() => onConfirm(treated)}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-semibold text-white ${copy.destructive ? 'bg-field-error hover:bg-[#b91c1c]' : 'bg-dash-blue hover:bg-dash-blue-hover'}`}
          >
            <Check className="size-3" /> Confirm
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
