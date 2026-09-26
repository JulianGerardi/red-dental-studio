import { Calendar, Link2, Link2Off } from 'lucide-react'
import { STATUS_STYLE, type LinkedFinding } from './data'

/* Card compacta que listan los drawers de procedimiento: estado y fecha en
   una línea, id y diente debajo, link/unlink a la derecha. */
export function LinkedFindingCard({
  finding, linked, onToggle,
}: {
  finding: LinkedFinding
  linked: boolean
  onToggle: (linked: boolean) => void
}) {
  const style = STATUS_STYLE[finding.status]
  return (
    <div className={`flex items-center gap-2 rounded-md border-l-[3px] bg-white px-3 py-2.5 shadow-sm ${style.rail}`}>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span className={`flex items-center gap-1 text-[11px] font-semibold ${style.good ? 'text-dash-ok-fg' : 'text-field-error'}`}>
            <span className={`size-1.5 rounded-full ${style.dot}`} />
            {finding.status}
          </span>
          <span className="text-dash-blue flex items-center gap-1 text-[10px] font-semibold">
            <Calendar className="size-2.5" /> {finding.date}
          </span>
        </div>
        <p className="mt-0.5 text-[13px] leading-tight font-bold text-ink">{finding.id}</p>
        <p className="text-[13px] leading-tight font-bold text-ink">TOOTH: {finding.tooth}</p>
      </div>
      <div className="flex shrink-0 items-center">
        <button
          type="button" aria-label={`Link ${finding.id}`} aria-pressed={linked} onClick={() => onToggle(true)}
          className={`flex size-7 items-center justify-center rounded-md hover:bg-surface-muted ${linked ? 'text-dash-blue' : 'text-ink-faint'}`}
        >
          <Link2 className="size-4" />
        </button>
        <button
          type="button" aria-label={`Unlink ${finding.id}`} aria-pressed={!linked} onClick={() => onToggle(false)}
          className={`flex size-7 items-center justify-center rounded-md hover:bg-surface-muted ${linked ? 'text-ink-faint' : 'text-dash-blue'}`}
        >
          <Link2Off className="size-4" />
        </button>
      </div>
    </div>
  )
}
