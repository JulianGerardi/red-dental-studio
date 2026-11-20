import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { FindingCard } from './FindingCard'
import { ACTIONS, type FindingAction } from './actions'
import type { Finding } from './data'

/* Confirmación antes de cambiar el estado de un finding, con ui/confirm-dialog como el resto de la app (antes rearmaba
   Dialog a mano, clinical-mode.md 2026-10-19). Cuando el área tiene otras condiciones cargadas, la lista permite
   marcarlas Treated al mismo tiempo. */
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
    <ConfirmDialog
      title={copy.title}
      confirmLabel="Confirm"
      tone={copy.destructive ? 'danger' : 'primary'}
      onConfirm={() => onConfirm(treated)}
      onCancel={onCancel}
    >
      {hasList ? (
        <>
          <p>You are about to {copy.verb}.<br />Select any linked conditions you want to mark as Treated.</p>
          <div className="mt-3 flex max-h-[46vh] flex-col gap-2.5 overflow-y-auto">
            {linkedConditions.map((c) => {
              const on = treated.includes(c.id)
              return (
                <button
                  key={c.id} type="button" aria-pressed={on}
                  onClick={() => setTreated((t) => (on ? t.filter((x) => x !== c.id) : [...t, c.id]))}
                  className={\`rounded-md text-left transition-shadow outline-none \${on ? 'ring-dash-blue ring-2' : 'ring-1 ring-transparent hover:ring-line'}\`}
                >
                  <FindingCard
                    finding={c}
                    action={
                      <span aria-hidden className={\`flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors \${on ? 'bg-dash-blue border-dash-blue text-white' : 'border-line-strong bg-white'}\`}>
                        {on && <Check className="size-2.5" strokeWidth={3} />}
                      </span>
                    }
                  />
                </button>
              )
            })}
          </div>
        </>
      ) : (
        <p>{copy.question}</p>
      )}
    </ConfirmDialog>
  )
}
`})))()}export{n,i as r,r as t};