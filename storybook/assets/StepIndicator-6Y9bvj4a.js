import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { Fragment } from 'react'
import { Check } from 'lucide-react'

/* Header de paso que comparten los drawers de varios pasos: una insignia
   numerada por paso, unidas por una regla que se completa al avanzar. */
export function Insignia({ estado, numero, label = 'Step' }: { estado: 'active' | 'complete' | 'pending'; numero: number; label?: string }) {
  const bg = estado === 'complete' ? 'bg-dash-ok-fg' : estado === 'active' ? 'bg-dash-blue' : 'bg-line-strong'
  const color = estado === 'complete' ? 'text-dash-ok-fg' : estado === 'active' ? 'text-dash-blue' : 'text-ink-faint'
  return (
    <div className="flex flex-col items-center gap-1">
      <span className={\`text-[10px] font-medium whitespace-nowrap transition-colors duration-300 \${color}\`}>{label}</span>
      <div className={\`flex size-6 items-center justify-center rounded-full transition-colors duration-300 \${bg}\`}>
        {estado === 'complete' ? <Check className="size-2.5 text-white" /> : <span className="text-xs font-semibold text-white">{numero}</span>}
      </div>
    </div>
  )
}

export function Conector({ lleno }: { lleno: boolean }) {
  return (
    <div className="-mx-2 flex flex-1 flex-col items-center gap-1">
      <span className="invisible text-[10px] font-medium">Step</span>
      <div className="flex h-6 w-full items-center">
        <div className={\`w-full border-t-2 transition-colors duration-300 \${lleno ? 'border-dash-blue' : 'border-line-strong'}\`} />
      </div>
    </div>
  )
}

/* Con \`labels\`, cada paso dice qué se hace en él en vez de "Step". */
export function StepIndicator({ total, current, labels, className = '' }: { total: number; current: number; labels?: readonly string[]; className?: string }) {
  return (
    <div className={\`flex items-start gap-2 \${className}\`}>
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <Fragment key={n}>
          {n > 1 && <Conector lleno={n <= current} />}
          <Insignia estado={n < current ? 'complete' : n === current ? 'active' : 'pending'} numero={n} label={labels?.[n - 1]} />
        </Fragment>
      ))}
    </div>
  )
}
`})))()}export{n,i as r,r as t};