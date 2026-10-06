import { Fragment } from 'react'
import { Check } from 'lucide-react'

/* Header de paso que comparten los drawers de varios pasos: una insignia
   numerada por paso, unidas por una regla que se completa al avanzar. Al
   completar un paso, el tilde entra con un rebote y un anillo verde se abre;
   después la regla se llena en verde hacia el paso siguiente (paso-check y
   paso-anillo en index.css). Ver modulos/clinical-mode.md. */
export function Insignia({ estado, numero, label = 'Step' }: { estado: 'active' | 'complete' | 'pending'; numero: number; label?: string }) {
  const bg = estado === 'complete' ? 'bg-dash-ok-fg motion-safe:animate-[paso-anillo_700ms_ease-out]' : estado === 'active' ? 'bg-dash-blue' : 'bg-line-strong'
  const color = estado === 'complete' ? 'text-dash-ok-fg' : estado === 'active' ? 'text-dash-blue' : 'text-ink-faint'
  return (
    <div className="flex flex-col items-center gap-1">
      <span className={`text-[10px] font-medium whitespace-nowrap transition-colors duration-300 ${color}`}>{label}</span>
      <div className={`flex size-6 items-center justify-center rounded-full transition-colors duration-300 ${bg}`}>
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
      <span className="invisible text-[10px] font-medium">Step</span>
      <div className="flex h-6 w-full items-center">
        <div className="relative h-0.5 w-full overflow-hidden rounded-full bg-line-strong">
          <div className={`absolute inset-y-0 left-0 rounded-full bg-dash-ok-fg transition-[width] ease-out motion-reduce:transition-none ${lleno ? 'w-full delay-150 duration-500' : 'w-0 duration-300'}`} />
        </div>
      </div>
    </div>
  )
}

/* Con `labels`, cada paso dice qué se hace en él en vez de "Step". */
export function StepIndicator({ total, current, labels, className = '' }: { total: number; current: number; labels?: readonly string[]; className?: string }) {
  return (
    <div className={`flex items-start gap-2 ${className}`}>
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <Fragment key={n}>
          {n > 1 && <Conector lleno={n <= current} />}
          <Insignia estado={n < current ? 'complete' : n === current ? 'active' : 'pending'} numero={n} label={labels?.[n - 1]} />
        </Fragment>
      ))}
    </div>
  )
}
