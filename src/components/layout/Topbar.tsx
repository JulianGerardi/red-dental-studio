import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  PanelLeftOpen, PanelLeftClose, Search, BellDot, ChevronDown,
  CircleUserRound, CreditCard, CircleHelp, Info, LogOut, EyeOff,
} from 'lucide-react'
import { LocationSelector } from './LocationSelector'
import type { Notificacion } from '@/data/notificaciones'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { aviso } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import { ANCHO_PAGINA } from '@/lib/estilos'

/* Figma 3636:57489 (Secretary) y 3605:56446 (Provider). Alto 64, fondo blanco.
   El glifo ⌘ del buscador aparece solo en el frame Provider — en recepcionista
   no está. Se replica esa diferencia tal cual. */
/* Índice ficticio para que el buscador global devuelva resultados reales. */
const INDICE = [
  { label: 'Mara Otero', hint: 'Patient', to: '/patients/mara-otero' },
  { label: 'Elias Aguirre', hint: 'Patient', to: '/patients/elias-aguirre' },
  { label: 'Nadia Duarte', hint: 'Patient', to: '/patients/nadia-duarte' },
  { label: 'Dashboard', hint: 'Page', to: '/' },
  { label: 'Patients', hint: 'Page', to: '/patients' },
  { label: 'Scheduling', hint: 'Page', to: '/scheduling' },
  { label: 'Settings', hint: 'Page', to: '/settings' },
]

export function Topbar({
  expanded,
  onToggleSidebar,
  showCommandHint = true,
  notificaciones = [],
  ocultasDelBanner = [],
  onVolverAlBanner,
}: {
  expanded: boolean
  onToggleSidebar: () => void
  showCommandHint?: boolean
  notificaciones?: Notificacion[]
  ocultasDelBanner?: string[]
  onVolverAlBanner?: (id: string) => void
}) {
  const ToggleIcon = expanded ? PanelLeftClose : PanelLeftOpen

  return (
    <header className="h-16 shrink-0 bg-white">
      <div className={cn(ANCHO_PAGINA, 'flex h-full items-center gap-2 pr-3 pl-[13px] sm:gap-3 sm:pr-4')}>
      {/* Left Section del Figma: greeting a la izquierda, grupo de controles
          empujado contra su borde derecho (justify-between).
          A medida que baja el ancho van cayendo, de menos a más importante:
          el saludo, la locación, el nombre del perfil y por último el ancho
          fijo del buscador. */}
      <div className="flex min-w-0 flex-1 items-center justify-between gap-3 xl:gap-6">
      <div className="flex min-w-0 shrink-0 items-center gap-2">
        {/* Botón con borde, no un icono suelto. La flecha invierte su
            dirección según el estado, con un pulso corto al presionar. */}
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
          aria-expanded={expanded}
          className={cn(
            'flex size-8 items-center justify-center rounded-md border border-[#e4e4e7] bg-white',
            'text-[#3f3f46] transition-all duration-150 hover:bg-[#fafafa]',
            'active:scale-90 motion-reduce:transition-none motion-reduce:active:scale-100',
          )}
        >
          <ToggleIcon className="size-[18px] transition-transform duration-200" />
        </button>

        <p className="hidden items-center gap-1.5 text-[19px] whitespace-nowrap text-black lg:flex">
          <span aria-hidden>👋</span> Hi! Dentist Sarah
        </p>
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-4 xl:gap-6">
        <span className="hidden shrink-0 md:block">
          <LocationSelector />
        </span>

        {/* Search */}
        <GlobalSearch showCommandHint={showCommandHint} />


        <Campana items={notificaciones} ocultas={ocultasDelBanner} onVolverAlBanner={onVolverAlBanner} />
      </div>

      </div>

      {/* Perfil. El borde izquierdo es el divisor que separa del resto. */}
      <div className="flex h-[42px] shrink-0 items-center border-l border-[#e4e4e7] pl-3 sm:pl-[18px]">
        <MenuCuenta />
      </div>
      </div>
    </header>
  )
}


/* La flecha del perfil abría nada. Ahora despliega el menú de cuenta que
   pasó Julián: Profile · Suscription · Support, separador, Help center ·
   Log out. "Suscription" va con esa ortografía a propósito -así está en el
   diseño, y acá el contenido se replica tal cual-. */
const CUENTA = [
  { label: 'Profile', icon: CircleUserRound, to: '/settings/account' },
  { label: 'Suscription', icon: CreditCard, to: '/billing' },
  { label: 'Support', icon: CircleHelp, to: '/help' },
]

function MenuCuenta() {
  const navigate = useNavigate()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-md px-1 py-1 transition-colors hover:bg-[#f4f4f5]">
        <span className="bg-dash-count-bg text-dash-blue-hover flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold">
          SS
        </span>
        {/* Los dos frames del Figma difieren acá: Provider usa nombre negro
            medium + rol gris semibold; Secretary pone ambos en gris semibold.
            Se toma la versión del Provider, que da jerarquía real. */}
        <span className="hidden flex-col items-start text-[12px] leading-[1.35] sm:flex">
          <span className="font-medium text-[#09090b]">Sarah Stone</span>
          <span className="font-semibold text-[#71717a]">Dentist</span>
        </span>
        <ChevronDown className="hidden size-4 shrink-0 text-[#71717a] sm:block" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[248px]">
        <DropdownMenuLabel className="text-[15px] font-bold text-[#09090b]">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {CUENTA.map(({ label, icon: Icon, to }) => (
          <DropdownMenuItem key={label} onSelect={() => navigate(to)} className="gap-2.5 py-2 text-[13px]">
            <Icon className="size-4 shrink-0" /> {label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => navigate('/help')} className="gap-2.5 py-2 text-[13px]">
          <Info className="size-4 shrink-0" /> Help center
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => { aviso.ok('Signed out.'); navigate('/login') }}
          className="gap-2.5 py-2 text-[13px]"
        >
          <LogOut className="size-4 shrink-0" /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* La campana es donde viven las tareas: acá están todas, incluidas las que
   se sacaron del banner. Nada se borra desde acá -siguen pendientes hasta
   que se completen-; lo que sí se puede es volver a ponerlas en el banner. */
function Campana({
  items, ocultas, onVolverAlBanner,
}: {
  items: Notificacion[]
  ocultas: string[]
  onVolverAlBanner?: (id: string) => void
}) {
  const navigate = useNavigate()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={items.length ? `Notifications (${items.length})` : 'Notifications'}
        className="relative shrink-0 rounded-md p-1 text-[#3f3f46] transition-colors hover:bg-[#f4f4f5] hover:text-black"
      >
        <BellDot className="size-5" />
        {items.length > 0 && (
          <span className="bg-dash-blue absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full text-[9px] font-semibold text-white">
            {items.length}
          </span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[320px]">
        <DropdownMenuLabel className="text-[13px] font-bold text-[#09090b]">
          Notifications {items.length > 0 && <span className="font-normal text-[#71717a]">({items.length})</span>}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.length === 0 ? (
          <p className="px-2 py-6 text-center text-[13px] text-[#a1a1aa]">You&apos;re all caught up.</p>
        ) : (
          items.map((n) => (
            /* Abrirla desde acá la devuelve al banner además de llevarte a
               la tarea: vuelve al estado de siempre, sin nada escondido. */
            <DropdownMenuItem
              key={n.id}
              onSelect={() => { onVolverAlBanner?.(n.id); navigate(n.to) }}
              className="items-start gap-2.5 py-2.5"
            >
              <n.icon className="mt-0.5 size-4 shrink-0 text-[#b45309]" />
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-semibold text-[#09090b]">{n.titulo}</span>
                <span className="block text-[12px] leading-snug text-[#71717a]">{n.detalle}</span>
                {ocultas.includes(n.id) && (
                  <span className="mt-1 flex items-center gap-1 text-[11px] font-medium text-[#a1a1aa]">
                    <EyeOff className="size-3" /> Hidden from banner
                  </span>
                )}
              </span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function GlobalSearch({ showCommandHint }: { showCommandHint: boolean }) {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const resultados = useMemo(
    () => (q.trim() ? INDICE.filter((i) => i.label.toLowerCase().includes(q.toLowerCase())) : []),
    [q],
  )

  useEffect(() => {
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
  }, [])

  return (
    <div ref={ref} className="relative w-full min-w-0 max-w-[304px]">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#a1a1aa]" />
      <input
        value={q}
        onChange={(e) => { setQ(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        placeholder="Search..."
        className={cn(
          'h-8 w-full rounded-md border border-[#e4e4e7] bg-white pl-9 text-[13px] font-medium',
          'shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-[#a1a1aa]',
          'focus:border-dash-blue focus:outline-none',
          showCommandHint ? 'pr-9' : 'pr-3',
        )}
      />
      {showCommandHint && (
        <span aria-hidden className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm text-[#71717a]">
          ⌘
        </span>
      )}
      {open && q.trim() && (
        <div className="motion-safe:animate-[loc-in_120ms_ease-out] absolute top-[calc(100%+4px)] left-0 z-50 w-full overflow-hidden rounded-md border border-[#e4e4e7] bg-white py-1 shadow-lg">
          {resultados.length === 0 ? (
            <p className="px-3 py-2 text-[13px] text-[#a1a1aa]">No results for “{q}”</p>
          ) : (
            resultados.map((r) => (
              <Link
                key={r.to}
                to={r.to}
                onClick={() => { setOpen(false); setQ('') }}
                className="flex items-center justify-between px-3 py-2 text-[13px] hover:bg-[#f4f4f5]"
              >
                <span className="text-[#09090b]">{r.label}</span>
                <span className="text-[11px] text-[#a1a1aa]">{r.hint}</span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  )
}
