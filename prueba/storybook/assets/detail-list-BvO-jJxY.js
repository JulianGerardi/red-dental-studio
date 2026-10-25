import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState, type ReactNode } from 'react'
import { ArrowUpRight, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Count } from '@/components/ui/count'

/* Lista de detalle: lo que se despliega debajo de una fila de tabla (Clinical Mode). Una fila por tema, una
   debajo de la otra y sin cards, con el título a la izquierda y los datos a la derecha. Sólo lectura: cada dato lleva a
   la pantalla donde se trabaja. Ver Components / UI / DetailList. */

/** El detalle entero: título y dato del costado arriba, las filas, y un pie opcional (una acción, como Apply credit, y Read-only summary). */
export function ListaDetalle({ titulo, lado, pie, children }: { titulo: string; lado?: ReactNode; pie?: ReactNode; children: ReactNode }) {
  return (
    <div className="@container">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
        <h3 className="text-[13px] font-semibold text-ink">{titulo}</h3>
        {lado && <span className="text-[11px] text-ink-muted">{lado}</span>}
      </div>
      <div className="flex flex-col">{children}</div>
      {pie && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-4">{pie}</div>
          <span className="text-[11px] text-ink-faint">Read-only summary</span>
        </div>
      )}
    </div>
  )
}

/** Una fila: el título (y la cuenta) a la izquierda y lo vinculado a la derecha. En angosto el título va arriba. */
export function FilaDetalle({ titulo, cuenta, children }: { titulo: string; cuenta?: number; children: ReactNode }) {
  return (
    <section className="grid gap-x-4 gap-y-1 border-t border-line-soft py-2 first:border-t-0 first:pt-0 last:pb-0 @md:grid-cols-[150px_minmax(0,1fr)]">
      <header className="flex min-h-6 items-center gap-2 self-start">
        <h4 className="text-[11px] font-semibold text-ink-muted">{titulo}</h4>
        {cuenta !== undefined && <Count>{cuenta}</Count>}
      </header>
      <div className="min-w-0">{children}</div>
    </section>
  )
}

/** Un dato en una sola línea: rótulo opcional, el link (o el texto), su estado y el contexto. */
export function Entrada({ children, estado, sub, rotulo }: { children: ReactNode; estado?: ReactNode; sub?: ReactNode; rotulo?: string }) {
  return (
    <div className="flex min-h-6 flex-wrap items-center gap-x-2 gap-y-0.5 py-0.5">
      {rotulo && <span className="text-[11px] text-ink-muted">{rotulo}:</span>}
      {children}
      {estado}
      {sub && <span className="text-[11px] leading-[1.45] text-ink-muted">{sub}</span>}
    </div>
  )
}

/** Link a la pantalla donde vive el registro, con la flecha de "sale de acá". */
export function EnlaceRegistro({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="group/link text-dash-blue min-w-0 text-left text-[12px] leading-[1.45] font-medium break-words hover:underline">
      {children}
      <ArrowUpRight aria-hidden className="ml-0.5 inline size-3 align-[-1px] transition-transform group-hover/link:translate-x-px group-hover/link:-translate-y-px" />
    </button>
  )
}

/** Lo que no entra en el resumen, plegado detrás de "N more…". */
export function MasItems({ label, children, abierto: inicial = false }: { label: string; children: ReactNode; abierto?: boolean }) {
  const [abierto, setAbierto] = useState(inicial)
  return (
    <div className="mt-1">
      <button
        type="button" aria-expanded={abierto} onClick={() => setAbierto((v) => !v)}
        className="text-dash-blue flex items-center gap-1 py-1 text-[11px] font-semibold hover:underline"
      >
        <ChevronRight aria-hidden className={cn('size-3.5 transition-transform', abierto && 'rotate-90')} /> {label}
      </button>
      {abierto && <div className="pl-[18px]">{children}</div>}
    </div>
  )
}

/** La fila queda aunque no haya nada, y lo dice: así se sabe que no hay, no que no cargó. */
export const Vacio = ({ children }: { children: ReactNode }) => <p className="flex min-h-6 items-center text-[12px] text-ink-faint">{children}</p>

/** Nota chica debajo de un dato, para aclarar qué mide (por ejemplo, un saldo de la transacción y no de la cuenta). */
export const NotaDetalle = ({ children }: { children: ReactNode }) => <p className="mt-2 text-[11px] leading-[1.5] text-ink-muted">{children}</p>
`})))()}export{n,i as r,r as t};