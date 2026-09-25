import { useEffect, useMemo, useRef, useState } from 'react'
import { MapPin, ChevronDown, Search, Check, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'

/* Figma 3605:56446 → "Select Location Modal" (I3605:56446;7805:3715).

   Rediseño propio del panel, pedido por Julián. Qué cambió y por qué:

   - **El contador dice cuántas hay de verdad.** El frame rotula "40
     locations" con dos en la lista; con el buscador andando el número tiene
     que seguir a lo que se ve.
   - **Los favoritos se marcan y desmarcan**, y **suben al tope de la lista**
     en su propio grupo. En el frame la estrella es decorativa, y una lista de
     40 sin forma de fijar las de siempre no sirve.
   - **Cada fila pasó a una sola línea de identidad**: inicial en cuadrito,
     nombre y ciudad juntos, y la zona horaria y los roles debajo. Antes el
     nombre competía con la zona horaria en la misma línea y los roles
     colgaban sueltos.
   - **La elegida se marca con la barra de acento azul** del sistema, no sólo
     con un borde: se distingue de un vistazo entre muchas. */

type Location = {
  name: string
  ciudad: string
  timezone: string
  roles: string[]
}

const LOCATIONS: Location[] = [
  { name: 'Abril', ciudad: 'Los Angeles', timezone: 'Europe/Berlin', roles: ['Administrator', 'Dentist', '+1'] },
  { name: 'Alaska Medical', ciudad: 'Anchorage', timezone: 'Europe/Berlin', roles: ['Administrator'] },
  { name: 'Bayside Dental', ciudad: 'Miami', timezone: 'America/New_York', roles: ['Dentist'] },
  { name: 'Northgate Clinic', ciudad: 'Seattle', timezone: 'America/Los_Angeles', roles: ['Administrator', 'Hygienist'] },
  { name: 'Riverside Care', ciudad: 'Austin', timezone: 'America/Chicago', roles: ['Hygienist'] },
]

const iniciales = (n: string) =>
  n.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()

function Fila({
  loc, actual, favorita, onElegir, onFavorita,
}: {
  loc: Location
  actual: boolean
  favorita: boolean
  onElegir: () => void
  onFavorita: () => void
}) {
  return (
    <div
      className={cn(
        'flex items-start gap-2.5 rounded-[10px] border border-l-[3px] p-2.5 transition-colors',
        actual ? 'border-dash-blue bg-[#f8faff]' : 'border-transparent hover:bg-surface-subtle',
      )}
    >
      <button type="button" onClick={onElegir} className="flex min-w-0 flex-1 items-start gap-2.5 text-left">
        <span className="bg-dash-count-bg text-dash-blue-hover flex size-8 shrink-0 items-center justify-center rounded-md text-[11px] font-semibold">
          {iniciales(loc.name)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5">
            <span className="truncate text-[13px] leading-none font-semibold text-ink">
              {loc.name}
            </span>
            <span className="truncate text-[13px] leading-none text-ink-muted">· {loc.ciudad}</span>
            {actual && <Check className="text-dash-blue size-3.5 shrink-0" />}
          </span>
          {/* Los roles y la zona horaria en un solo renglón de texto: tres
              pastillas por fila multiplicadas por 40 locaciones eran una
              alfombra de color que competía con el nombre. */}
          <span className="mt-1 block truncate text-[11px] leading-relaxed text-ink-faint">
            {loc.timezone} · {loc.roles.join(' · ')}
          </span>
        </span>
      </button>

      <button
        type="button"
        onClick={onFavorita}
        aria-label={favorita ? `Remove ${loc.name} from favorites` : `Add ${loc.name} to favorites`}
        aria-pressed={favorita}
        className="shrink-0 rounded p-1 transition-colors hover:bg-black/5"
      >
        <Star className={cn('size-4', favorita ? 'fill-amber-400 text-amber-400' : 'text-ink-faint')} />
      </button>
    </div>
  )
}

export function LocationSelector() {
  const [open, setOpen] = useState(false)
  const [actual, setActual] = useState(LOCATIONS[0].name)
  const [favoritas, setFavoritas] = useState<string[]>([LOCATIONS[0].name])
  const [q, setQ] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const elegida = LOCATIONS.find((l) => l.name === actual) ?? LOCATIONS[0]

  /* Estado explícito en vez de :focus — un click en un button no siempre
     mueve document.activeElement ni dispara :focus-visible. */
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const { favs, resto } = useMemo(() => {
    const visibles = LOCATIONS.filter((l) =>
      `${l.name} ${l.ciudad} ${l.timezone}`.toLowerCase().includes(q.trim().toLowerCase()),
    )
    return {
      favs: visibles.filter((l) => favoritas.includes(l.name)),
      resto: visibles.filter((l) => !favoritas.includes(l.name)),
    }
  }, [q, favoritas])

  const elegir = (loc: Location) => {
    setOpen(false)
    setQ('')
    if (loc.name === actual) return
    setActual(loc.name)
    aviso.ok(`Switched to ${loc.name} - ${loc.ciudad}.`)
  }

  const alternarFavorita = (loc: Location) =>
    setFavoritas((prev) =>
      prev.includes(loc.name) ? prev.filter((n) => n !== loc.name) : [...prev, loc.name],
    )

  const total = favs.length + resto.length

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={cn(
          'flex h-8 items-center gap-3 rounded-md border bg-white py-1 pr-[11px] pl-[7px] transition-colors',
          /* Abierto, el selector toma borde azul (Figma: border-dash-blue). */
          open ? 'border-dash-blue' : 'border-line',
        )}
      >
        <MapPin className="text-dash-blue size-4 shrink-0" />
        <span className="text-sm leading-none whitespace-nowrap">
          <span className="text-dash-blue">{elegida.name}</span>{' '}
          <span className="font-medium text-black">- {elegida.ciudad}</span>
        </span>
        <ChevronDown
          className={cn(
            'size-4 shrink-0 text-[#0f172a] transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Select location"
          className={cn(
            'absolute top-[calc(100%+5px)] left-0 z-50 w-[320px] max-w-[calc(100vw-24px)] rounded-xl border border-line bg-white p-4',
            'flex flex-col gap-3 shadow-[0_8px_28px_rgb(0_0_0/0.18)]',
            'motion-safe:animate-[loc-in_140ms_ease-out]',
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-base leading-[1.3] font-semibold text-ink">Select location</p>
            {/* Contador en texto plano: es un dato de contexto, no un estado
                que merezca una pastilla de color. Y sigue a la lista — el
                frame decía 40 con dos. */}
            <span className="shrink-0 text-[11px] text-ink-faint">
              {total} {total === 1 ? 'location' : 'locations'}
            </span>
          </div>

          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search..."
              className="focus:border-dash-blue h-8 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] font-medium shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none"
            />
          </div>

          <div className="flex max-h-[416px] flex-col gap-1 overflow-y-auto">
            {total === 0 && (
              <p className="px-1 py-6 text-center text-xs text-ink-faint">No locations match “{q}”.</p>
            )}

            {favs.length > 0 && (
              <>
                <p className="px-1 pt-1 text-[10px] font-semibold tracking-wide text-ink-faint uppercase">
                  Favorites
                </p>
                {favs.map((loc) => (
                  <Fila
                    key={loc.name} loc={loc} actual={loc.name === actual} favorita
                    onElegir={() => elegir(loc)} onFavorita={() => alternarFavorita(loc)}
                  />
                ))}
              </>
            )}

            {resto.length > 0 && (
              <>
                {favs.length > 0 && (
                  <p className="px-1 pt-2 text-[10px] font-semibold tracking-wide text-ink-faint uppercase">
                    All locations
                  </p>
                )}
                {resto.map((loc) => (
                  <Fila
                    key={loc.name} loc={loc} actual={loc.name === actual} favorita={false}
                    onElegir={() => elegir(loc)} onFavorita={() => alternarFavorita(loc)}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
