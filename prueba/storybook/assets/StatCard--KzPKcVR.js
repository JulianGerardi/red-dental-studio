import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { LucideIcon } from 'lucide-react'

/* Figma 3605:64575 — p-24, radius 8, shadow 0 4px 4px rgba(0,0,0,.05),
   gap 8. Header: título 15px Medium + icon slot 28px con glifo 18px.
   Valor 26px Bold, delta 13px #b8b8b8, gap 2. */
export function StatCard({
  title,
  value,
  delta,
  icon: Icon,
}: {
  title: string
  value: string
  delta: string
  icon: LucideIcon
}) {
  return (
    <div className="shadow-stat flex flex-col gap-2 overflow-hidden rounded-lg bg-white p-6">
      <div className="flex items-center gap-4">
        <p className="min-w-px flex-1 text-[15px] leading-[1.4] font-medium text-black">
          {title}
        </p>
        <span className="flex size-7 shrink-0 items-center justify-center rounded-md">
          <Icon className="text-dash-blue size-[18px]" strokeWidth={2} />
        </span>
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-[26px] leading-none font-bold text-black">{value}</p>
        <p className="text-dash-delta text-[13px] leading-[1.5]">{delta}</p>
      </div>
    </div>
  )
}
`})))()}export{n,i as r,r as t};