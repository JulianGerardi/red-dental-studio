import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { CalendarDays, ChevronRight, CircleCheck, CircleDollarSign, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Pill } from '@/components/ui/pill'
import { TONO_CASO } from '@/components/clinical/TreatmentPlanSection'
import { PLANES, type Plan } from '@/data/clinical-mode'
import { Avatar } from '@/components/ui/avatar'

/* Cards de Treatment Plan del Overview, con la estructura de red.dev: profesional, nombre y estado del caso, su grupo, dos
   datos (total y fecha de creación) y el avance en su caja. Toda la card abre el caso en Treatment Plan. El ícono de
   documento del frame sigue afuera, a pedido de Julián. Ver design-reference/figma/modulos/clinical-mode.md. */

export function Dato({ label, valor, icono: Icono, className }: { label: string; valor: string; icono?: LucideIcon; className?: string }) {
  return (
    <div className={cn('min-w-0 rounded-md bg-surface-alt px-2.5 py-2', className)}>
      <span className="flex items-center gap-1 text-[9px] leading-none font-semibold tracking-wide whitespace-nowrap text-ink-muted uppercase">
        {Icono && <Icono className="size-3 shrink-0" aria-hidden />}
        {label}
      </span>
      <span className="mt-1.5 block truncate text-[13px] font-semibold text-ink tabular-nums">{valor}</span>
    </div>
  )
}

const iniciales = (n: string) => n.split(' ').map((p) => p[0]).slice(0, 2).join('')

/* La card entera abre el caso; el Total amount, Estimate details (clinical-mode.md, 2026-10-28). Como un botón no puede
   ir adentro de otro, el de la card es una capa que la cubre y el del total queda encima. */
export function PlanCard({ p, onAbrir, onEstimado }: { p: Plan; onAbrir?: () => void; onEstimado?: () => void }) {
  const progreso = p.procedimientos ? Math.round((p.completados / p.procedimientos) * 100) : 0
  return (
    <div className="hover:border-dash-blue has-[[data-abrir]:focus-visible]:outline-dash-blue group relative block w-full rounded-lg border border-line bg-white p-3.5 text-left transition-colors hover:shadow-[0_4px_14px_rgb(29_86_188/0.08)] has-[[data-abrir]:focus-visible]:outline-2">
      <button type="button" data-abrir onClick={onAbrir} aria-label={\`Open \${p.nombre}\`} className="absolute inset-0 rounded-lg focus-visible:outline-none" />
      <span className="flex items-center gap-2.5">
        <Avatar initials={iniciales(p.doctor)} />
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
        <Pill tone={TONO_CASO[p.estado]} size="sm" className="mt-0.5 shrink-0 whitespace-nowrap">{p.estado}</Pill>
      </span>

      <span className="mt-3 grid grid-cols-2 gap-1.5">
        {onEstimado ? (
          <button
            type="button" onClick={onEstimado} aria-label={\`Total amount \${p.total}. View estimate details\`}
            className="group/total focus-visible:outline-dash-blue relative z-10 rounded-md text-left focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <Dato label="Total amount" valor={p.total} icono={CircleDollarSign} className="group-hover/total:bg-dash-count-bg pr-6 transition-colors" />
            <ChevronRight className="group-hover/total:text-dash-blue absolute top-1/2 right-1.5 size-3.5 -translate-y-1/2 text-ink-faint transition-colors" aria-hidden />
          </button>
        ) : (
          <Dato label="Total amount" valor={p.total} icono={CircleDollarSign} />
        )}
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
    </div>
  )
}

export function TreatmentPlanList({ onAbrir, onEstimado, llena }: {
  onAbrir?: (casoId?: string) => void
  /** El Total amount de una card abre Estimate details de ese caso. */
  onEstimado?: (casoId: string) => void
  /** En desktop ocupa todo el alto de su contenedor (con \`position: relative\`) sin estirarlo, y la lista scrollea. */
  llena?: boolean
}) {
  return (
    <div className={cn('flex flex-col rounded-lg bg-white p-4 shadow-panel', llena && 'lg:absolute lg:inset-0')}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-[15px] font-bold text-ink">Treatment Plan</p>
        <button onClick={() => onAbrir?.()} className="text-dash-blue flex shrink-0 items-center gap-0.5 text-[12px] font-semibold hover:underline">
          All treatment <ChevronRight className="size-3.5" />
        </button>
      </div>
      {/* La columna scrollea sola para no estirar la página hasta el doble del alto del odontograma. */}
      <div className={cn('mt-3 flex max-h-[560px] min-h-0 flex-col gap-3 overflow-y-auto pr-1', llena && 'lg:max-h-none lg:flex-1')}>
        {PLANES.map((p) => <PlanCard key={p.id} p={p} onAbrir={() => onAbrir?.(p.id)} onEstimado={onEstimado && (() => onEstimado(p.id))} />)}
      </div>
    </div>
  )
}
`})))()}export{n,i as r,r as t};