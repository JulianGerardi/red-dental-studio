import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { CalendarDays, ChevronRight, CircleCheck, CircleDollarSign, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Pill } from '@/components/ui/pill'
import { TONO_CASO } from '@/components/clinical/TreatmentPlanSection'
import { PLANES, type Plan } from '@/data/clinical-mode'

/* Cards de Treatment Plan del Overview, con la estructura de red.dev: profesional, nombre y estado del caso, su grupo, dos
   datos (total y fecha de creación) y el avance en su caja. Toda la card abre el caso en Treatment Plan. El ícono de
   documento del frame sigue afuera, a pedido de Julián. Ver design-reference/figma/modulos/clinical-mode.md. */

export function Dato({ label, valor, icono: Icono }: { label: string; valor: string; icono?: LucideIcon }) {
  return (
    <div className="min-w-0 rounded-md bg-surface-alt px-2.5 py-2">
      <span className="flex items-center gap-1 text-[9px] leading-none font-semibold tracking-wide whitespace-nowrap text-ink-muted uppercase">
        {Icono && <Icono className="size-3 shrink-0" aria-hidden />}
        {label}
      </span>
      <span className="mt-1.5 block truncate text-[13px] font-semibold text-ink tabular-nums">{valor}</span>
    </div>
  )
}

const iniciales = (n: string) => n.split(' ').map((p) => p[0]).slice(0, 2).join('')

export function PlanCard({ p, onAbrir }: { p: Plan; onAbrir?: () => void }) {
  const progreso = p.procedimientos ? Math.round((p.completados / p.procedimientos) * 100) : 0
  return (
    <button
      type="button" onClick={onAbrir} aria-label={\`Open \${p.nombre}\`}
      className="hover:border-dash-blue focus-visible:outline-dash-blue group block w-full rounded-lg border border-line bg-white p-3.5 text-left transition-colors hover:shadow-[0_4px_14px_rgb(29_86_188/0.08)]"
    >
      <span className="flex items-center gap-2.5">
        <span className="bg-dash-count-bg text-dash-blue-hover flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold">{iniciales(p.doctor)}</span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-semibold text-ink">{p.doctor}</span>
          <span className="block text-[11px] text-ink-muted">{p.rol}</span>
        </span>
        <ChevronRight className="group-hover:text-dash-blue size-4 shrink-0 text-ink-faint transition-colors" aria-hidden />
      </span>

      <span className="my-3 block h-px bg-line-soft" />

      <span className="flex items-start gap-2">
        <span className="min-w-0 flex-1">
          <span className="block text-[14px] leading-snug font-bold text-ink">{p.nombre}</span>
          <span className="mt-0.5 block text-[11px] text-ink-muted">{p.grupo} · {p.procedimientos} procedures</span>
        </span>
        <Pill tone={TONO_CASO[p.estado]} size="sm" className="mt-0.5 shrink-0 tracking-wide whitespace-nowrap uppercase">{p.estado}</Pill>
      </span>

      <span className="mt-3 grid grid-cols-2 gap-1.5">
        <Dato label="Total amount" valor={p.total} icono={CircleDollarSign} />
        <Dato label="Created on" valor={p.creado} icono={CalendarDays} />
      </span>

      <span className="mt-1.5 block rounded-md bg-surface-alt px-2.5 py-2.5">
        <span className="block text-[9px] leading-none font-semibold tracking-wide text-ink-muted uppercase">Treatment progress</span>
        <span className="mt-1.5 flex items-center justify-between gap-2">
          <span className={cn('text-[18px] leading-none font-bold tabular-nums', progreso ? 'text-dash-blue' : 'text-ink')}>{progreso}%</span>
          <span className="bg-dash-count-bg text-dash-blue-hover flex shrink-0 items-center gap-1 rounded-full px-2 py-[2px] text-[10px] font-medium">
            <CircleCheck className="size-3" aria-hidden /> {p.completados} of {p.procedimientos} completed
          </span>
        </span>
        <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-line" role="progressbar" aria-label={\`\${p.nombre} progress\`} aria-valuenow={progreso} aria-valuemin={0} aria-valuemax={100}>
          <span className="bg-dash-blue block h-full rounded-full" style={{ width: \`\${progreso}%\` }} />
        </span>
      </span>
    </button>
  )
}

export function TreatmentPlanList({ onAbrir }: { onAbrir?: (casoId?: string) => void }) {
  return (
    <div className="rounded-lg bg-white shadow-panel p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[15px] font-bold text-ink">Treatment Plan</p>
        <button onClick={() => onAbrir?.()} className="text-dash-blue flex shrink-0 items-center gap-0.5 text-[12px] font-semibold hover:underline">
          All treatment <ChevronRight className="size-3.5" />
        </button>
      </div>
      {/* La columna scrollea sola para no estirar la página hasta el doble del alto del odontograma. */}
      <div className="mt-3 flex max-h-[560px] flex-col gap-3 overflow-y-auto pr-1">
        {PLANES.map((p) => <PlanCard key={p.id} p={p} onAbrir={() => onAbrir?.(p.id)} />)}
      </div>
    </div>
  )
}
`})))()}export{n,i as r,r as t};