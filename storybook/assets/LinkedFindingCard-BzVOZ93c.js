import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { Calendar, Link2, Link2Off } from 'lucide-react'
import { STATUS_STYLE, type Finding } from './data'

/* Un hallazgo del examen para vincular al procedimiento: estado y fecha arriba, el nombre del hallazgo y, si tiene,
   sus superficies; link/unlink a la derecha. */
export function LinkedFindingCard({
  finding, linked, onToggle,
}: {
  finding: Pick<Finding, 'id' | 'condition' | 'area' | 'surfaces' | 'status' | 'date'>
  linked: boolean
  onToggle: (linked: boolean) => void
}) {
  const style = STATUS_STYLE[finding.status]
  const nombre = finding.condition.charAt(0).toUpperCase() + finding.condition.slice(1)
  return (
    <div className={\`flex items-center gap-2 rounded-md border border-l-[3px] border-line bg-white px-3 py-2.5 \${style.rail} \${linked ? 'border-dash-blue' : ''}\`}>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span className={\`flex items-center gap-1 text-[11px] font-semibold \${style.good ? 'text-dash-ok-fg' : 'text-field-error'}\`}>
            <span className={\`size-1.5 rounded-full \${style.dot}\`} />
            {finding.status}
          </span>
          <span className="text-dash-blue flex items-center gap-1 text-[10px] font-semibold">
            <Calendar className="size-2.5" /> {finding.date}
          </span>
        </div>
        <p className="mt-0.5 text-[13px] leading-tight font-bold text-ink">
          {nombre}
          {finding.surfaces.length > 0 && <span className="font-semibold text-ink-medium"> - {finding.surfaces.join(', ')}</span>}
        </p>
        <p className="text-[12px] leading-tight text-ink-muted">{finding.area}</p>
      </div>
      <div className="flex shrink-0 items-center">
        <button
          type="button" aria-label={\`Link \${nombre}\`} aria-pressed={linked} onClick={() => onToggle(true)}
          className={\`flex size-7 items-center justify-center rounded-md hover:bg-surface-muted \${linked ? 'text-dash-blue' : 'text-ink-faint'}\`}
        >
          <Link2 className="size-4" />
        </button>
        <button
          type="button" aria-label={\`Unlink \${nombre}\`} aria-pressed={!linked} onClick={() => onToggle(false)}
          className={\`flex size-7 items-center justify-center rounded-md hover:bg-surface-muted \${linked ? 'text-ink-faint' : 'text-dash-blue'}\`}
        >
          <Link2Off className="size-4" />
        </button>
      </div>
    </div>
  )
}
`})))()}export{n,i as r,r as t};