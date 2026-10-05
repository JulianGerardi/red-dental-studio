import { ChevronDown, ChevronRight } from 'lucide-react'
import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { EXAMENES, REGISTROS, type Pestana } from '@/data/clinical-mode'

/* Botonera de Clinical Mode, como en la app real (red.dev, 2026-10-05). En los exámenes, "Exams ›" queda marcado y
   despliega los registros (Treatment Plan, Treatment, Patient Summary, Lab Order, Prescription, Referral). Con un
   registro abierto, las pestañas pasan a ser los registros y "Exams" es un botón común que vuelve al último examen.
   Ver design-reference/figma/modulos/clinical-mode.md. */
export function ClinicalToolbar({
  pestana, onPestana,
}: {
  pestana: Pestana
  onPestana: (p: Pestana) => void
}) {
  const [abierto, setAbierto] = useState(false)
  const enRegistro = (REGISTROS as readonly string[]).includes(pestana)
  const ultimoExamen = useRef<Pestana>('Vitals')
  if ((EXAMENES as readonly string[]).includes(pestana)) ultimoExamen.current = pestana
  const items: readonly Pestana[] = enRegistro ? REGISTROS : EXAMENES

  return (
    /* El botón del desplegable vive FUERA del contenedor que scrollea: sólo scrollean las pestañas. */
    <div className="flex items-center gap-[10.64px]">
      {enRegistro ? (
        <button
          type="button"
          onClick={() => onPestana(ultimoExamen.current)}
          className="flex h-9 shrink-0 items-center rounded-lg border border-line bg-white px-3.5 text-[13px] font-medium whitespace-nowrap text-ink shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] transition-colors hover:bg-surface-subtle"
        >
          Exams
        </button>
      ) : (
      <DropdownMenu open={abierto} onOpenChange={setAbierto}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label="Exams. Open records menu"
            className="bg-dash-count-bg text-dash-blue hover:bg-dash-count-bg/80 flex h-9 shrink-0 items-center gap-1.5 rounded-lg px-3.5 text-[13px] font-medium whitespace-nowrap transition-colors"
          >
            Exams
            {abierto ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" sideOffset={6} className="w-auto min-w-[168px] rounded-lg p-1.5 shadow-[0_12px_32px_rgb(0_0_0/0.14)]">
          {REGISTROS.map((r) => (
            <DropdownMenuItem key={r} onSelect={() => onPestana(r)} className="rounded-md px-3 py-2 text-[13px] text-ink">
              {r}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      )}

      {/* Fill container: en desktop las pestañas se reparten el ancho en
          partes iguales, como en el frame. En angosto vuelven a su tamaño y
          scrollean. */}
      <div className="-mx-1 min-w-0 flex-1 overflow-x-auto px-1 pb-1">
        {/* El hueco entre pestañas queda fijo en 10.64, el del export. El
            sobrante lo absorben las **pestañas**, no los huecos: `grow` con
            base automática reparte el extra en partes iguales, así cada una
            crece lo mismo y conserva su diferencia de ancho. Con
            `justify-between` el sobrante caía en los huecos y quedaban de 47;
            con `basis-0` todas terminaban del mismo ancho. */}
        <div className="flex w-max items-center gap-[10.64px] lg:w-full">
          {items.map((p) => {
            const on = p === pestana
            return (
              <button
                key={p}
                onClick={() => onPestana(p)}
                aria-current={on ? 'page' : undefined}
                className={cn(
                  /* Del export de la Tab Bar: alto 33.96, padding 21.27, radio
                     5.32, label 11.52/600. Cada pestaña mide lo que dice: el
                     ancho de la fila lo da el padding de la pantalla, no un
                     estiramiento de los botones. */
                  'flex h-[33.96px] shrink-0 items-center justify-center rounded-[5.32px] px-[21.27px] text-[11.52px] font-semibold whitespace-nowrap transition-colors',
                  'lg:grow',
                  on
                    ? 'bg-dash-blue font-semibold text-white'
                    : 'border border-line bg-white font-medium text-ink shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] hover:bg-surface-subtle',
                )}
              >
                {p}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
