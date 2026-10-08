import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { Fragment } from 'react'
import { Check } from 'lucide-react'

/* Header de paso que comparten los drawers de varios pasos: una insignia
   numerada por paso, unidas por una regla que se completa al avanzar. Al
   completar un paso, el tilde entra con un rebote y un anillo verde se abre;
   después la regla se llena en verde hacia el paso siguiente (paso-check y
   paso-anillo en index.css). Ver modulos/clinical-mode.md.

   El rótulo ("Step" o el nombre del paso) va encima del círculo sin ocupar
   ancho: así la regla corre siempre de círculo a círculo, con "Step" o con
   nombres largos como los de New Procedure. El primero se alinea al borde
   izquierdo, el último al derecho y los del medio al centro, para que nunca
   se salgan del drawer. */
const POSICION = { inicio: 'left-0', centro: 'left-1/2 -translate-x-1/2', fin: 'right-0' } as const
export type AlineacionRotulo = keyof typeof POSICION

export function Insignia({ estado, numero, label = 'Step', alinear = 'centro' }: { estado: 'active' | 'complete' | 'pending'; numero: number; label?: string; alinear?: AlineacionRotulo }) {
  const bg = estado === 'complete' ? 'bg-dash-ok-fg motion-safe:animate-[paso-anillo_700ms_ease-out]' : estado === 'active' ? 'bg-dash-blue' : 'bg-line-strong'
  const color = estado === 'complete' ? 'text-dash-ok-fg' : estado === 'active' ? 'text-dash-blue' : 'text-ink-faint'
  return (
    <div className="relative flex shrink-0 flex-col items-center gap-1">
      <span className={\`absolute top-0 text-[10px] leading-[15px] font-medium whitespace-nowrap transition-colors duration-300 \${POSICION[alinear]} \${color}\`}>{label}</span>
      <span aria-hidden className="h-[15px]" />
      <div className={\`flex size-6 items-center justify-center rounded-full transition-colors duration-300 \${bg}\`}>
        {estado === 'complete'
          ? <Check className="size-2.5 text-white motion-safe:animate-[paso-check_380ms_cubic-bezier(0.34,1.56,0.64,1)_both]" strokeWidth={3} />
          : <span className="text-xs font-semibold text-white">{numero}</span>}
      </div>
    </div>
  )
}

export function Conector({ lleno }: { lleno: boolean }) {
  return (
    <div className="-mx-2 flex flex-1 flex-col items-center gap-1">
      <span aria-hidden className="h-[15px]" />
      <div className="flex h-6 w-full items-center">
        <div className="relative h-0.5 w-full overflow-hidden rounded-full bg-line-strong">
          <div className={\`absolute inset-y-0 left-0 rounded-full bg-dash-ok-fg transition-[width] ease-out motion-reduce:transition-none \${lleno ? 'w-full delay-150 duration-500' : 'w-0 duration-300'}\`} />
        </div>
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
          <Insignia
            estado={n < current ? 'complete' : n === current ? 'active' : 'pending'}
            numero={n}
            label={labels?.[n - 1]}
            alinear={n === 1 ? 'inicio' : n === total ? 'fin' : 'centro'}
          />
        </Fragment>
      ))}
    </div>
  )
}
`})))()}export{r as n,n as r,i as t};