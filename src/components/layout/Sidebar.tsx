import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  GalleryVerticalEnd, House, Users, CalendarRange, CreditCard,
  MessageSquare, Phone, Files, ChartPie, CircleHelp, Settings, Bot,
  ChevronRight, ChevronDown, type LucideIcon,
} from 'lucide-react'
import { SETTINGS_NAV } from '@/data/settings-nav'
import { useHelp } from '@/components/help/HelpProvider'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

type NavItem = { to: string; label: string; icon: LucideIcon; end?: boolean }

/* Con el rail colapsado los ítems son sólo un ícono: el nombre sale en un
   tooltip al costado. Expandido no hace falta -el label ya se ve-. Reemplaza
   al `title` nativo, que tardaba en aparecer y se veía distinto al resto de la
   app. Settings queda afuera a propósito: al pasar el mouse ya abre su menú
   flotante en ese mismo lugar. */
function ConTooltip({
  label, mostrar, children,
}: {
  label: string
  mostrar: boolean
  children: React.ReactElement
}) {
  if (!mostrar) return children
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="right" sideOffset={10} className="bg-ink text-white">{label}</TooltipContent>
    </Tooltip>
  )
}

/* Figma 3605:56447 "Sidebar Rail (Collapsed Icons)".
   Rail 58px sobre #fafafa, bloque de logo 64px en #1a4da9 (un azul más
   oscuro que el primario #1d56bc, que es el del ítem activo).
   Los ítems van 32×32 con pitch de 50px → gap de 18. */
const NAV: NavItem[] = [
  { to: '/', label: 'Dashboard', icon: House, end: true },
  { to: '/patients', label: 'Patients', icon: Users },
  { to: '/scheduling', label: 'Scheduling', icon: CalendarRange },
  { to: '/billing', label: 'Billing', icon: CreditCard },
  { to: '/message', label: 'Message', icon: MessageSquare },
  { to: '/contacts', label: 'Contacts', icon: Phone },
  { to: '/documents', label: 'Documents', icon: Files },
  { to: '/reports', label: 'Reports', icon: ChartPie },
  { to: '/help', label: 'Help', icon: CircleHelp },
]

export function Sidebar({
  expanded,
  onClose,
}: {
  expanded: boolean
  onClose?: () => void
}) {
  const { confibotAbierto, toggleConfibot } = useHelp()
  const { pathname } = useLocation()

  /* Mismo criterio que el `isActive` de NavLink. Se calcula acá y no con la
     función de `className` de NavLink porque el tooltip envuelve al link con
     `asChild`, y Radix Slot no sabe combinar una `className` que es función:
     la pasa como texto y el link perdía todos sus estilos. */
  const activa = (to: string, end?: boolean) =>
    pathname === to || (!end && pathname.startsWith(to) && pathname.charAt(to.length) === '/')

  /* En mobile el panel siempre está abierto de ancho completo, así que los
     ítems van con label; el modo icono es sólo para el rail de escritorio. */
  const item = (active: boolean) =>
    cn(
      'flex items-center rounded-md text-sm font-medium transition-colors',
      'mx-3 gap-3 px-3 py-2',
      expanded ? '' : 'md:mx-0 md:size-8 md:justify-center md:px-0 md:py-0',
      active ? 'bg-dash-blue text-white' : 'text-dash-muted hover:bg-black/5',
    )

  return (
    <TooltipProvider delayDuration={100}>
      {/* Fondo del panel en mobile. Arriba de md el rail es parte del layout. */}
      {expanded && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          aria-hidden
        />
      )}

      <aside
        className={cn(
          /* El scroll va sólo en mobile: en desktop un overflow acá recorta el
             menú flotante de Settings, que se sale del ancho del rail. */
          'flex h-svh flex-col bg-surface-subtle transition-[width,transform] duration-200',
          'max-md:overflow-y-auto md:overflow-visible',
          /* Mobile: panel fijo que entra desde la izquierda. */
          'fixed top-0 left-0 z-50 w-[234px]',
          expanded ? 'translate-x-0' : '-translate-x-full',
          /* Desde md vuelve a ser una columna del layout. El z-index explicito
             no es decorativo: `position: sticky` arma su propio contexto de
             apilamiento, asi que el z-50 del menu flotante de Settings solo
             compite adentro del rail. Con `z-auto` el rail entero se pintaba
             en orden de documento —antes que <main>— y cualquier caja del
             contenido le pasaba por encima. Con z-40 el rail sube completo;
             los modales y popovers del contenido usan z-50 y lo siguen
             tapando. */
          'md:sticky md:z-40 md:shrink-0 md:translate-x-0',
          expanded ? 'md:w-[234px]' : 'md:w-[58px]',
        )}
      >
      {/* Bloque del logo: ocupa exactamente el alto del header */}
      <div
        className={cn(
          'bg-dash-blue-hover flex h-16 shrink-0 items-center gap-3 px-5 text-white',
          expanded ? '' : 'md:justify-center md:px-0',
        )}
      >
        <GalleryVerticalEnd className="size-4 shrink-0" />
        <span className={cn('text-sm font-semibold', expanded ? '' : 'md:hidden')}>
          Confidentally
        </span>
      </div>

      <nav
        className={cn(
          'flex flex-col gap-1 pt-6',
          expanded ? '' : 'md:items-center md:gap-[18px]',
        )}
      >
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <ConTooltip key={to} label={label} mostrar={!expanded}>
            <NavLink to={to} end={end} aria-label={label} className={item(activa(to, end))}>
              <Icon className="size-4 shrink-0" />
              <span className={cn(expanded ? '' : 'md:hidden')}>{label}</span>
            </NavLink>
          </ConTooltip>
        ))}
        {/* No es una ruta: abre la hoja de chat de Confibot, que antes vivía
            flotando solo sobre la pantalla y tapaba otros botones flotantes
            -el de Appointment requests en Scheduling, por ejemplo-. */}
        <ConTooltip label="Confibot" mostrar={!expanded}>
          <button
            type="button"
            aria-label="Confibot"
            aria-pressed={confibotAbierto}
            onClick={toggleConfibot}
            className={item(confibotAbierto)}
          >
            <Bot className="size-4 shrink-0" />
            <span className={cn(expanded ? '' : 'md:hidden')}>Confibot</span>
          </button>
        </ConTooltip>
      </nav>

      {/* Settings va al pie del rail, en el mismo lugar colapsado y expandido:
          Julián pidió que no cambie de sitio al abrir o cerrar el menú. El
          ítem colapsado mide 32 y el expandido 36, así que se le suman 2px de
          padding abajo para que el ícono caiga exactamente en la misma altura. */}
      <div className={cn('mt-auto flex flex-col pb-6', expanded ? '' : 'md:items-center md:pb-[26px]')}>
          <SettingsItem clase={item} mostrarLabel={expanded} />
        </div>
      </aside>
    </TooltipProvider>
  )
}


/* Settings ya no abre un sidebar propio adentro de la sección: sus pantallas
   cuelgan de un menú flotante que sale al costado del ítem, como en el
   ejemplo que pasó Julián. Se abre con hover en escritorio y con clic en el
   chevron, para que también funcione con dedo. */
function SettingsItem({
  clase,
  mostrarLabel,
}: {
  clase: (active: boolean) => string
  mostrarLabel: boolean
}) {
  const [abierto, setAbierto] = useState(false)
  /* Billing es el único con sub-items: se despliega con su chevron en vez de
     mostrarlos siempre. */
  const [grupo, setGrupo] = useState<string | null>(null)
  const cierre = useRef<number | null>(null)
  const { pathname } = useLocation()
  const activo = pathname.startsWith('/settings')

  /* Un respiro antes de cerrar: si no, el menú desaparece al cruzar el hueco
     entre el ítem y el panel. */
  const abrir = () => {
    if (cierre.current) window.clearTimeout(cierre.current)
    setAbierto(true)
  }
  const cerrarConDelay = () => {
    cierre.current = window.setTimeout(() => setAbierto(false), 140)
  }

  useEffect(() => setAbierto(false), [pathname])
  useEffect(() => {
    const dentro = SETTINGS_NAV.find((s) => s.children && pathname.startsWith(s.to))
    if (dentro) setGrupo(dentro.to)
  }, [pathname])
  useEffect(() => () => { if (cierre.current) window.clearTimeout(cierre.current) }, [])

  return (
    <div
      className="relative"
      onMouseEnter={abrir}
      onMouseLeave={cerrarConDelay}
    >
      {/* El chevron es un botón aparte y no un icono adentro del link: dentro,
          cancelar la navegación dependía de que el preventDefault ganara la
          carrera contra el Link, y en touch terminaba navegando igual. */}
      <div className={cn(clase(activo), 'w-full')} data-tour="settings-menu">
        <NavLink
          to="/settings"
          title="Settings"
          /* Colapsado el ícono va centrado en su caja de 32: sin esto quedaba
             corrido 8px a la izquierda del resto de la columna. */
          className={cn('flex min-w-0 flex-1 items-center gap-3', !mostrarLabel && 'md:justify-center')}
        >
          <Settings className="size-4 shrink-0" />
          <span className={cn(mostrarLabel ? '' : 'md:hidden')}>Settings</span>
        </NavLink>
        <button
          type="button"
          aria-label="Settings menu"
          aria-expanded={abierto}
          onClick={() => setAbierto((v) => !v)}
          className={cn('shrink-0 opacity-60 hover:opacity-100', mostrarLabel ? '' : 'md:hidden')}
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      {abierto && (
        /* Anclado abajo: el ítem vive al pie del rail y hacia arriba es el
           único lado donde el panel entra completo. */
        <div
          /* En el panel mobile no hay lugar al costado: ahí se despliega en
             el mismo lugar, debajo del ítem. */
          className="motion-safe:animate-[loc-in_120ms_ease-out] z-50 rounded-2xl border border-line bg-white p-2 max-md:mt-2 max-md:max-h-[45svh] max-md:overflow-y-auto md:absolute md:bottom-0 md:left-full md:ml-2 md:w-[236px] md:shadow-[0_12px_32px_rgb(0_0_0/0.18)]"
          /* En mobile el ítem vive al pie del panel, así que los once destinos
             nacen abajo del pliegue. Se los trae a la vista al abrir; en
             desktop no hace falta porque el flotante sale al costado. */
          ref={(el) => {
            if (el && window.matchMedia('(max-width: 767px)').matches) {
              el.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
            }
          }}
          onMouseEnter={abrir}
          onMouseLeave={cerrarConDelay}
        >
          {SETTINGS_NAV.map((s) => (
            <div key={s.to}>
              <span
                className={cn(
                  'flex items-center rounded-lg pr-1 transition-colors',
                  pathname.startsWith(s.to) ? 'bg-dash-count-bg' : 'hover:bg-surface-muted',
                )}
              >
                <NavLink
                  to={s.to}
                  className={({ isActive }) =>
                    cn(
                      'block flex-1 px-3 py-2 text-sm',
                      isActive ? 'text-dash-blue-hover font-medium' : 'text-ink',
                    )
                  }
                >
                  {s.label}
                </NavLink>
                {s.children && (
                  <button
                    type="button"
                    aria-label={`${s.label} options`}
                    aria-expanded={grupo === s.to}
                    onClick={() => setGrupo((g) => (g === s.to ? null : s.to))}
                    className="rounded p-1 text-ink-muted hover:text-black"
                  >
                    <ChevronDown className={cn('size-4 transition-transform', grupo === s.to && 'rotate-180')} />
                  </button>
                )}
              </span>
              {grupo === s.to && s.children?.map((c) => (
                <NavLink
                  key={c.to}
                  to={c.to}
                  className={({ isActive }) =>
                    cn(
                      'block rounded-lg py-1.5 pr-3 pl-7 text-[13px] transition-colors',
                      isActive ? 'text-dash-blue font-medium' : 'text-ink-muted hover:bg-surface-muted',
                    )
                  }
                >
                  {c.label}
                </NavLink>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
