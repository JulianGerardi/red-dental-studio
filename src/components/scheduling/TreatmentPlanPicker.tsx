import { cn } from '@/lib/utils'

/* Diseño propio de las cards de "Link to treatment plan visit"
   (Figma 4430:61940). No replica el frame: está armado con piezas que ya
   existen en el sistema.

   Reusado: barra de acento de 3px (bloques del calendario, card ASAP), pills
   outline + fondo tintado (Relationships, Insurance, leyenda de Scheduling),
   chips de conteo `bg-dash-count-bg` ("Patients today") y la tabla con
   cabecera `#f9f9f9` de Insurance y Documents.

   Se propusieron dos variantes y Julián eligió una de cada listado:
   **el plan como card** y **la visita como fila con la tabla desplegada**.
   Las dos descartadas están descritas en
   design-reference/figma/modulos/scheduling.md. */

export type Plan = {
  id: string
  estado: 'Accepted' | 'Inprogress'
  date: string
  doctor: string
  therapy: string
  visitas: number
  procedimientos: number
}

export type Visita = {
  id: string
  name: string
  procedimientos: string[]
  total: string
}

const ESTADO = {
  Accepted: { pill: 'border-dash-ok-fg bg-dash-ok-bg text-dash-ok-fg', barra: '#1a804d' },
  Inprogress: { pill: 'border-dash-busy-fg bg-dash-busy-bg text-dash-busy-fg', barra: '#1d56bc' },
}

export function Radio({ on, className }: { on: boolean; className?: string }) {
  return (
    <span
      className={cn(
        'flex size-[18px] shrink-0 items-center justify-center rounded-full border-2 transition-colors',
        on ? 'border-dash-blue' : 'border-[#c4c4c8]',
        className,
      )}
    >
      {on && <span className="bg-dash-blue size-2.5 rounded-full" />}
    </span>
  )
}

/* Contenedor seleccionable. Es un div con role=radio y no un <button> para
   poder anidar adentro el botón que despliega los procedimientos. */
export function Seleccionable({
  on,
  onClick,
  barra,
  className,
  children,
}: {
  on: boolean
  onClick: () => void
  barra?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      role="radio"
      tabIndex={0}
      aria-checked={on}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      style={barra ? { borderLeftColor: barra } : undefined}
      className={cn(
        'flex w-full cursor-pointer gap-3 rounded-lg border text-left transition-colors',
        barra && 'border-l-[3px]',
        on ? 'border-dash-blue bg-[#f8faff]' : 'border-line bg-white hover:bg-surface-subtle',
        className,
      )}
    >
      {children}
    </div>
  )
}

/* ── Plan: card ──────────────────────────────────────────────────────── */

export function PlanCard({ plan, on, onClick }: { plan: Plan; on: boolean; onClick: () => void }) {
  const e = ESTADO[plan.estado]
  return (
    <Seleccionable on={on} onClick={onClick} barra={e.barra} className="p-3">
      <Radio on={on} className="mt-0.5" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-[13px] font-bold text-ink">{plan.doctor}</span>
          <span className={cn('shrink-0 rounded-full border px-2 py-[2px] text-[11px] font-semibold', e.pill)}>
            {plan.estado}
          </span>
        </div>
        <p className="mt-0.5 truncate text-xs text-ink-muted">{plan.therapy}</p>
        {/* Conteos en texto, no en pill. Una pill marca un estado —Accepted,
            Inprogress— y ésa ya está arriba a la derecha; pintar también los
            números ponía tres cápsulas de colores compitiendo en una card de
            cuatro líneas. */}
        <div className="mt-2 flex items-center gap-1.5">
          <span className="text-[11px] text-ink-muted">
            {plan.visitas} Visits · {plan.procedimientos} Procedures
          </span>
          <span className="ml-auto shrink-0 text-[11px] whitespace-nowrap text-ink-faint">
            {plan.date}
          </span>
        </div>
      </div>
    </Seleccionable>
  )
}

/* ── Visita: fila con la tabla de procedimientos ─────────────────────── */

export function VisitRow({ visita, on, onClick }: { visita: Visita; on: boolean; onClick: () => void }) {
  return (
    <Seleccionable on={on} onClick={onClick} className="flex-col gap-0 p-0">
      <div className="flex w-full items-center gap-3 px-3 py-2.5">
        <Radio on={on} />
        <span className="text-[13px] font-bold text-ink">{visita.name}</span>
        <span className="text-[11px] text-ink-muted">
          {visita.procedimientos.length} Procedures
        </span>
        <span className="ml-auto shrink-0 text-right">
          <span className="text-[10px] tracking-wide text-ink-faint uppercase">Total </span>
          <span className="text-dash-blue text-[15px] font-bold">{visita.total}</span>
        </span>
      </div>

      {/* La visita elegida abre la tabla completa, con la cabecera gris que
          usan Insurance y Documents. */}
      {on && (
        <div className="w-full px-3 pb-3">
          <div className="overflow-hidden rounded-lg border border-line-row bg-white">
            <div className="flex h-8 items-center gap-3 border-b border-line-row bg-surface-alt px-3 text-[10px] font-semibold tracking-wide text-ink-muted uppercase">
              <span className="w-[52px] shrink-0">Code</span>
              <span className="min-w-0 flex-1">Procedure</span>
            </div>
            <div className="max-h-[168px] overflow-y-auto">
              {visita.procedimientos.map((p) => {
                const [code, ...resto] = p.split(' – ')
                return (
                  <div
                    key={p}
                    className="flex h-8 items-center gap-3 border-b border-line-soft px-3 text-[11px] last:border-0"
                  >
                    <span className="text-dash-blue w-[52px] shrink-0 font-medium">{code}</span>
                    <span className="min-w-0 flex-1 truncate text-ink-medium">{resto.join(' – ')}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </Seleccionable>
  )
}
