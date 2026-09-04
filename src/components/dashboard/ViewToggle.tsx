import { cn } from '@/lib/utils'

export type DashboardView = 'Recepcionista' | 'Provider'

/* Figma 3636:60667 — medido por píxel sobre el frame:
   contenedor 200×35, pill activo 79×29 con 3px de inset.
   Los segmentos NO son mitad y mitad: cada uno se ajusta a su texto
   ("Recepcionista" 115px, "Provider" 79px). */
export function ViewToggle({
  value,
  onChange,
}: {
  value: DashboardView
  onChange: (v: DashboardView) => void
}) {
  const options: DashboardView[] = ['Recepcionista', 'Provider']
  return (
    <div className="inline-flex h-[35px] items-center gap-0 rounded-lg bg-[#f1f3f9] p-[3px]">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          aria-pressed={value === o}
          className={cn(
            'h-[29px] rounded-md px-3 text-xs font-medium whitespace-nowrap transition-colors',
            value === o
              ? 'bg-dash-blue text-white'
              : 'text-[#a3a9b8] hover:text-dash-muted',
          )}
        >
          {o}
        </button>
      ))}
    </div>
  )
}
