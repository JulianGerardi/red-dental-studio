import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { CalendarDays, ChevronRight, DollarSign, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Pill } from '@/components/ui/pill'
import { TONO_CASO } from '@/components/clinical/TreatmentPlanSection'
import { PLANES, type Plan } from '@/data/clinical-mode'
import { Avatar } from '@/components/ui/avatar'
import { TARJETA_INTERNA } from '@/lib/estilos'

/* Cards de Treatment Plan del Overview, con el diseño de la card de Treatment Plan de la ficha del paciente
   (\`pages/patients/Treatments\`, Figma 3768:803852; Julián, 2026-11-25): profesional y estado arriba; en la franja gris
   el grupo, el nombre del caso, la barra de avance y cuánto se completó; abajo la fecha de creación y el total. Los
   datos son los mismos de antes. Va dentro del panel blanco, así que es card interna. Toda la card abre el caso en
   Treatment Plan. Ver design-reference/figma/modulos/clinical-mode.md (2026-11-25). */

/** Un dato del pie de la card: rótulo chico y el valor con su ícono azul, como en la card de la ficha. */
export function Dato({ label, valor, icono: Icono, className }: { label: string; valor: string; icono?: LucideIcon; className?: string }) {
  return (
    <span className={cn('block min-w-0 leading-tight', className)}>
      <span className="block text-[11px] whitespace-nowrap text-ink-muted">{label}</span>
      <span className="mt-0.5 flex items-center gap-1.5 text-[13px] font-semibold whitespace-nowrap text-ink tabular-nums">
        {Icono && <Icono className="size-3.5 shrink-0 text-dash-blue" aria-hidden />} {valor}
      </span>
    </span>
  )
}

const iniciales = (n: string) => n.split(' ').map((p) => p[0]).slice(0, 2).join('')
/* La barra como en la ficha: verde al terminar, roja si el plan se cayó, azul mientras avanza. */
const cerrado = (p: Plan) => p.estado === 'Cancelled' || p.estado === 'Expired' || p.estado === 'Discarded'

/* La card entera abre el caso; el Total amount, Estimate details (clinical-mode.md, 2026-10-28). Como un botón no puede
   ir adentro de otro, el de la card es una capa que la cubre y el del total queda encima. */
export function PlanCard({ p, onAbrir, onEstimado }: { p: Plan; onAbrir?: () => void; onEstimado?: () => void }) {
  const progreso = p.procedimientos ? Math.round((p.completados / p.procedimientos) * 100) : 0
  const barra = cerrado(p) ? 'bg-dash-bad-fg' : progreso === 100 ? 'bg-dash-ok-fg' : 'bg-dash-blue'
  return (
    <article className={cn(TARJETA_INTERNA, 'group shrink-0 has-[[data-abrir]:focus-visible]:outline-dash-blue relative overflow-hidden transition-shadow hover:shadow-[0_4px_14px_rgb(29_86_188/0.1)] has-[[data-abrir]:focus-visible]:outline-2')}>
      <button type="button" data-abrir onClick={onAbrir} aria-label={\`Open \${p.nombre}\`} className="absolute inset-0 rounded-lg focus-visible:outline-none" />
      <header className="flex items-center gap-3 px-4 py-3">
        <Avatar initials={iniciales(p.doctor)} size={36} />
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate text-[13px] font-bold text-ink">{p.doctor}</span>
          <span className="block text-[11px] text-ink-muted">{p.rol}</span>
        </span>
        <Pill tone={TONO_CASO[p.estado]} size="sm" className="shrink-0 whitespace-nowrap">{p.estado}</Pill>
      </header>

      <div className="bg-surface-subtle px-4 py-3">
        <p className="truncate text-[11px] font-medium text-ink-muted">{p.grupo} · {p.procedimientos} procedures</p>
        <p className="group-hover:underline mt-1 text-[13px] font-bold text-dash-blue">{p.nombre}</p>
        <span className="mt-2.5 block h-[3px] w-full overflow-hidden rounded-full bg-line" role="progressbar" aria-label={\`\${p.nombre} progress\`} aria-valuenow={progreso} aria-valuemin={0} aria-valuemax={100}>
          <span className={cn('block h-full rounded-full', barra)} style={{ width: \`\${progreso}%\` }} />
        </span>
        <p className="mt-1.5 text-[11px] text-ink-faint">Overall completion: {progreso}% · {p.completados} of {p.procedimientos} completed</p>
      </div>

      <footer className="flex flex-wrap items-center gap-x-8 gap-y-2 px-4 py-3">
        <Dato label="Created on" valor={p.creado} icono={CalendarDays} />
        {onEstimado ? (
          <button
            type="button" onClick={onEstimado} aria-label={\`Total amount \${p.total}. View estimate details\`}
            className="group/total focus-visible:outline-dash-blue relative z-10 -mx-1.5 -my-1 flex items-center gap-1 rounded-md px-1.5 py-1 text-left transition-colors hover:bg-dash-count-bg focus-visible:outline-2"
          >
            <Dato label="Total amount" valor={p.total} icono={DollarSign} />
            <ChevronRight className="group-hover/total:text-dash-blue size-3.5 self-end text-ink-faint transition-colors" aria-hidden />
          </button>
        ) : (
          <Dato label="Total amount" valor={p.total} icono={DollarSign} />
        )}
      </footer>
    </article>
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
    <div className={cn('flex flex-col rounded-lg bg-surface p-4 shadow-panel', llena && 'lg:absolute lg:inset-0')}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-[15px] font-bold text-ink">Treatment plan</p>
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