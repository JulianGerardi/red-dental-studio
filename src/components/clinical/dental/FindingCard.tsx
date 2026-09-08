import type { ReactNode } from 'react'
import { Calendar, Check, X } from 'lucide-react'
import { STATUS_STYLE, type Finding } from './data'

/* Card de finding, compartida por el panel del exam y las confirmaciones.
   `action` llena la esquina superior derecha -el menú en el panel, un tilde
   de selección en los diálogos-. */
export function FindingCard({
  finding, action, className = '',
}: {
  finding: Finding
  action?: ReactNode
  className?: string
}) {
  const style = STATUS_STYLE[finding.status]
  return (
    <div className={`flex flex-col gap-2.5 rounded-md border-l-[3px] bg-white px-2.5 py-3 shadow-sm ${style.rail} ${className}`}>
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${style.badge}`}>
            {style.good ? <Check className="size-2.5" strokeWidth={3} /> : <X className="size-2.5" />}
            {finding.status}
          </span>
          <span className="text-dash-blue flex items-center gap-1 text-[10px] font-semibold">
            <Calendar className="size-2.5" /> {finding.date}
          </span>
        </div>
        {action}
      </div>
      <div className="flex flex-col gap-0.5 pl-1">
        <p className="text-xs font-extrabold text-[#09090b]">{finding.area}</p>
        <p className="text-xs text-[#09090b]">Condition: <span className="text-[#71717a]">{finding.condition}</span></p>
        <p className="text-xs text-[#09090b]">Descriptors: <span className="text-[#71717a]">{finding.descriptor}</span></p>
      </div>
    </div>
  )
}
