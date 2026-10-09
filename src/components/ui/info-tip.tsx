import { useRef, useState } from 'react'
import { Info } from 'lucide-react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { cn } from '@/lib/utils'

/* InfoTip: el círculo de info de una card que explica qué cuenta ese número. Ver Components / UI / InfoTip.

   Por qué así:
   - Es un HoverCard (card blanca con título y texto), no un Tooltip: el Tooltip oscuro es sólo para nombrar, y esto
     explica en una o dos líneas.
   - Gris como la etiqueta que acompaña y azul al abrirse: dice que hay algo más sin competir con el número.
   - Con el mouse abre al pasar; con el dedo, al tocar (el HoverCard solo no abre en pantallas táctiles); con el
     teclado, al llegar con Tab. Escape o tocar afuera lo cierra.
   - El lector de pantalla lee el título y el texto desde el botón: el HoverCard no se anuncia solo. */

export function InfoTip({ title, children, className, abierto }: {
  /** Lo que se explica, igual que la etiqueta de la card. */
  title: string
  /** La explicación: una o dos líneas. */
  children: string
  className?: string
  /** Sólo para las stories: arranca abierto. */
  abierto?: boolean
}) {
  const [open, setOpen] = useState(!!abierto)
  const tactil = useRef(false)
  const boton = useRef<HTMLButtonElement>(null)
  return (
    <HoverCard open={open} onOpenChange={setOpen} openDelay={120} closeDelay={80}>
      <HoverCardTrigger asChild>
        <button
          ref={boton}
          type="button"
          aria-label={`${title}: ${children}`}
          aria-expanded={open}
          onPointerDown={(e) => { tactil.current = e.pointerType !== 'mouse' }}
          onClick={() => { if (tactil.current) setOpen((v) => !v) }}
          className={cn(
            '-m-1 flex size-6 shrink-0 items-center justify-center rounded-full text-ink-muted transition-colors hover:text-dash-blue focus-visible:text-dash-blue focus-visible:outline-2 focus-visible:outline-dash-ring aria-expanded:text-dash-blue',
            className,
          )}
        >
          <Info className="size-4" />
        </button>
      </HoverCardTrigger>
      {/* Tocar el círculo otra vez lo cierra: ese toque no cuenta como "afuera". */}
      <HoverCardContent
        side="bottom" align="end" className="w-64 p-3"
        onPointerDownOutside={(e) => { if (boton.current?.contains(e.target as Node)) e.preventDefault() }}
      >
        <p className="text-[13px] font-semibold text-ink">{title}</p>
        <p className="mt-1 text-[12px] leading-snug text-ink-muted">{children}</p>
      </HoverCardContent>
    </HoverCard>
  )
}
