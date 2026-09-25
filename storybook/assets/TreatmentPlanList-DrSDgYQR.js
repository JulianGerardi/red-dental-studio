import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { ChevronRight, CircleCheck } from 'lucide-react'
import { aviso } from '@/components/ui/toaster'
import { PLANES, type Plan } from '@/data/clinical-mode'

/* Card de 4235:135661: profesional arriba, una regla, el nombre del plan con
   la pill, los tres datos y el porcentaje grande con la barra. El orden de los
   datos es Created On / Total Procedures / Total Amount, distinto al del
   tablero viejo. El frame dibuja además un ícono de documento a la derecha del
   profesional: se sacó a pedido de Julián. */
/* La etiqueta va en una sola línea. Partida en dos —"Total / Procedures"—
   desalineaba las tres cajas entre sí y apretaba la card entera. */
export function Dato({ label, valor, azul }: { label: string; valor: string; azul?: boolean }) {
  return (
    <div className="min-w-0 rounded-md border border-line px-2 py-2">
      <span className="block truncate text-[9px] leading-none whitespace-nowrap text-ink-muted">
        {label}
      </span>
      <span className={\`mt-1.5 block truncate text-[12px] font-semibold \${azul ? 'text-dash-blue' : 'text-ink'}\`}>
        {valor}
      </span>
    </div>
  )
}

export function PlanCard({ p }: { p: Plan }) {
  return (
    <div className="rounded-lg border border-line bg-white p-3.5">
      <div className="flex items-start gap-2">
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-bold text-ink">{p.doctor}</span>
          <span className="block text-[12px] text-ink-muted">{p.rol}</span>
        </span>
      </div>

      <div className="my-3 h-px bg-line-soft" />

      <div className="flex items-center gap-2">
        <span className="min-w-0 flex-1 truncate text-[13px] text-ink">{p.nombre}</span>
        <span className="shrink-0 rounded-full border border-dash-ok-fg bg-dash-ok-bg px-2 py-[2px] text-[11px] font-semibold text-dash-ok-fg">
          {p.estado}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-1.5">
        <Dato label="Created On" valor={p.creado} azul />
        <Dato label="Total Procedures" valor={String(p.procedimientos)} />
        <Dato label="Total Amount" valor={p.total} />
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <span className="text-dash-blue text-[17px] font-bold">{p.progreso}%</span>
        <span className="bg-dash-count-bg text-dash-blue-hover flex shrink-0 items-center gap-1 rounded-full px-2 py-[2px] text-[10px] font-medium">
          <CircleCheck className="size-3" /> {p.completados}
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e5e5e5]">
        <div className="bg-dash-blue h-full rounded-full" style={{ width: \`\${p.progreso}%\` }} />
      </div>
    </div>
  )
}

export function TreatmentPlanList() {
  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[15px] font-bold text-ink">Treatment Plan</p>
        <button
          onClick={() => aviso.info('Full treatment plan list is not available in this release.')}
          className="text-dash-blue flex shrink-0 items-center gap-0.5 text-[12px] font-semibold hover:underline"
        >
          All treatment <ChevronRight className="size-3.5" />
        </button>
      </div>
      {/* Cuatro planes en el frame; la columna scrollea sola para no estirar
          la página hasta el doble del alto del odontograma. */}
      <div className="mt-3 flex max-h-[560px] flex-col gap-3 overflow-y-auto pr-1">
        {PLANES.map((p) => <PlanCard key={p.id} p={p} />)}
      </div>
    </div>
  )
}
`})))()}export{n,i as r,r as t};