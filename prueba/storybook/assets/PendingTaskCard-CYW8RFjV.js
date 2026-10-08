import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { FileText, TriangleAlert, ArrowRight } from 'lucide-react'
import { InnerCard } from './primitives'
import { aviso } from '@/components/ui/toaster'

export type PendingTask = {
  kind: string
  state: string
  person: string
  initials: string
  register: string
  expiration: string
}

export function PendingTaskCard({ task }: { task: PendingTask }) {
  return (
    <InnerCard className="flex flex-col gap-2.5 px-3 py-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-dash-name text-sm leading-none font-bold">{task.kind}</p>
        <span className="text-dash-blue flex items-center gap-1.5 text-xs">
          <span className="bg-dash-blue size-1.5 rounded-full" />
          {task.state}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="bg-dash-count-bg text-dash-blue-hover flex size-7 shrink-0 items-center justify-center rounded-md text-[11px] font-semibold">
          {task.initials}
        </span>
        <p className="text-dash-name min-w-0 flex-1 truncate text-[13px] font-semibold">
          {task.person}
        </p>
        <button
          type="button"
          aria-label="Open document"
          className="bg-dash-bad-chip border-dash-bad-fg flex size-7 shrink-0 items-center justify-center rounded-md border"
        >
          <FileText className="text-dash-bad-fg size-3.5" />
        </button>
        <span className="flex shrink-0 items-center gap-1 rounded-md border border-amber-400 bg-amber-50 px-2 py-1.5 text-[11px] font-medium text-amber-700">
          <TriangleAlert className="size-3" /> Expired date
        </span>
      </div>

      <div className="flex items-end justify-between gap-2 text-[11px]">
        <span className="flex flex-col gap-0.5">
          <span className="text-dash-delta">Register</span>
          <span className="text-dash-blue font-medium">{task.register}</span>
        </span>
        <span className="flex flex-col gap-0.5 text-right">
          <span className="text-dash-delta">Expiration date</span>
          <span className="text-dash-bad-fg font-medium">{task.expiration}</span>
        </span>
      </div>

      <button
        type="button"
        onClick={() => aviso.ok(\`\${task.kind} for \${task.person} marked as complete.\`)}
        className="bg-dash-blue hover:bg-dash-blue-hover flex w-full items-center justify-center gap-1.5 rounded-lg py-2.5 text-[13px] font-medium text-white transition-colors"
      >
        Complete this Task <ArrowRight className="size-3.5" />
      </button>
    </InnerCard>
  )
}
`})))()}export{n,i as r,r as t};