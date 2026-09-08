import { Fragment } from 'react'
import { Check } from 'lucide-react'

/* Header de paso que comparten los drawers de varios pasos: una insignia
   numerada por paso, unidas por una regla que se completa al avanzar. */
function Insignia({ estado, numero }: { estado: 'active' | 'complete' | 'pending'; numero: number }) {
  const bg = estado === 'complete' ? 'bg-[#1a804d]' : estado === 'active' ? 'bg-dash-blue' : 'bg-[#d4d4d8]'
  const label = estado === 'complete' ? 'text-[#1a804d]' : estado === 'active' ? 'text-dash-blue' : 'text-[#a1a1aa]'
  return (
    <div className="flex flex-col items-center gap-1">
      <span className={`text-[10px] font-medium transition-colors duration-300 ${label}`}>Step</span>
      <div className={`flex size-6 items-center justify-center rounded-full transition-colors duration-300 ${bg}`}>
        {estado === 'complete' ? <Check className="size-2.5 text-white" /> : <span className="text-xs font-semibold text-white">{numero}</span>}
      </div>
    </div>
  )
}

function Conector({ lleno }: { lleno: boolean }) {
  return (
    <div className="-mx-2 flex flex-1 flex-col items-center gap-1">
      <span className="invisible text-[10px] font-medium">Step</span>
      <div className="flex h-6 w-full items-center">
        <div className={`w-full border-t-2 transition-colors duration-300 ${lleno ? 'border-dash-blue' : 'border-[#d4d4d8]'}`} />
      </div>
    </div>
  )
}

export function StepIndicator({ total, current, className = '' }: { total: number; current: number; className?: string }) {
  return (
    <div className={`flex items-start gap-2 ${className}`}>
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <Fragment key={n}>
          {n > 1 && <Conector lleno={n <= current} />}
          <Insignia estado={n < current ? 'complete' : n === current ? 'active' : 'pending'} numero={n} />
        </Fragment>
      ))}
    </div>
  )
}
