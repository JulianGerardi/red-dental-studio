import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ChevronDown, Eye, Pencil, PanelTop, FileText, Archive, Shield, BookOpen, ClipboardList, Ban, PersonStanding, Calendar, Languages, Phone, Mail, MapPin, type LucideIcon, Play, Pause, PanelLeftClose, PanelLeftOpen, IdCard,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { aviso } from '@/components/ui/toaster'
import { EditContactModal } from '@/pages/patients/EditContactModal'
import { EditableAvatar } from '@/components/ui/editable-avatar'
import { usePhoto } from '@/lib/usePhoto'

/* Figma 3646:58836 — panel izquierdo del dashboard del paciente. */

/* Todos los ítems navegan: sin `to` el ítem quedaba muerto en las pantallas
   que no manejan estado local, que era lo que pasaba con Ledger. */
const NAV: { key: string; icon: LucideIcon; to?: string }[] = [
  { key: 'Overview', icon: PanelTop, to: '' },
  { key: 'Treatments', icon: Archive, to: '/treatments' },
  { key: 'Insurance', icon: Shield, to: '/insurance' },
  { key: 'Ledger', icon: BookOpen, to: '/ledger' },
  { key: 'Documents', icon: ClipboardList, to: '/documents' },
  { key: 'Relationships & Billing', icon: Ban, to: '/relationships' },
]

const GENERAL = [
  { icon: PersonStanding, label: 'Gender', value: 'Male' },
  { icon: Calendar, label: 'DOB', value: '28/01/1999' },
  { icon: Languages, label: 'Language', value: 'Spanish' },
]

const CONTACT = [
  { icon: Phone, label: 'Phone', value: '(555) 234-5678' },
  { icon: Mail, label: 'Email', value: 'Johnsmith@gmail.com' },
  { icon: MapPin, label: 'Address', value: '123 Biscayne Blvd' },
]

/* Mismo mecanismo que `useEstadoEncuentro` de más abajo y por el mismo
   motivo: el panel se remonta en cada pantalla del paciente. */
let colapsadoGlobal = false
const oyentesColapso = new Set<() => void>()

/** Deja el menú del paciente colapsado o expandido desde afuera (Storybook). */
export function setPatientMenuCollapsed(v: boolean) {
  colapsadoGlobal = v
  oyentesColapso.forEach((f) => f())
}

function useColapso() {
  const [, redibujar] = useState(0)
  useEffect(() => {
    const f = () => redibujar((n) => n + 1)
    oyentesColapso.add(f)
    return () => { oyentesColapso.delete(f) }
  }, [])
  const set = (v: boolean | ((p: boolean) => boolean)) => {
    colapsadoGlobal = typeof v === 'function' ? v(colapsadoGlobal) : v
    oyentesColapso.forEach((f) => f())
  }
  return [colapsadoGlobal, set] as const
}

export function InfoBlock({
  title,
  items,
  onEdit,
  className,
}: {
  title: string
  items: { icon: LucideIcon; label: string; value: string }[]
  onEdit: () => void
  className?: string
}) {
  return (
    <div className={cn('mt-5', className)}>
      <div className="flex items-center justify-between border-b border-line pb-1.5">
        <span className="text-[13px] font-semibold text-ink">{title}</span>
        <button
          type="button"
          onClick={onEdit}
          aria-label={`Edit ${title}`}
          className="text-ink-muted transition-colors hover:text-black"
        >
          <Pencil className="size-3.5" />
        </button>
      </div>
      <dl className="mt-3 flex flex-col gap-3">
        {items.map(({ icon: Icon, label, value }) => (
          <div key={label}>
            <dt className="flex items-center gap-2 text-xs font-medium text-ink">
              <Icon className="size-3.5 shrink-0" /> {label}
            </dt>
            <dd className="mt-0.5 text-[11px] text-ink-muted">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function PatientSidePanel({
  name,
  initials,
  section,
  basePath,
  onSection,
  onEditGeneral,
  onEditContact,
}: {
  name: string
  initials: string
  section: string
  basePath: string
  onSection?: (s: string) => void
  /* Sin handler, el panel resuelve la edición por su cuenta: antes los
     lápices quedaban muertos en Treatments, Insurance, Documents y
     Relationships, que pasaban funciones vacías. */
  onEditGeneral?: () => void
  onEditContact?: () => void
}) {
  const navigate = useNavigate()
  const [contacto, setContacto] = useState(false)
  const [foto, setFoto] = usePhoto(`patient-photo:${basePath}`)
  /* Sólo colapsa en desktop -en angosto el panel ya es compacto por su
     cuenta-, para liberar ancho cuando el contenido lo necesita (p.ej. las
     tablas del Ledger). El estado vive fuera de React, igual que el del
     botón de encuentro: el panel se vuelve a montar en cada pantalla del
     paciente, así que con `useState` volvía a abrirse al cambiar de ítem. */
  const [colapsado, setColapsado] = useColapso()
  const [info, setInfo] = useState(false)
  const cierre = useRef<number | null>(null)
  const abrirInfo = () => {
    if (cierre.current) window.clearTimeout(cierre.current)
    setInfo(true)
  }
  const cerrarInfo = () => {
    if (cierre.current) window.clearTimeout(cierre.current)
    cierre.current = window.setTimeout(() => setInfo(false), 160)
  }

  /* Envuelve en tooltip sólo cuando el rail está colapsado: expandido el
     ítem ya dice qué es y un tooltip encima sería ruido. */
  const conTooltip = (texto: string, hijo: React.ReactNode) =>
    colapsado ? (
      <Tooltip>
        <TooltipTrigger asChild>{hijo}</TooltipTrigger>
        <TooltipContent side="right" className="bg-ink text-white">
          {texto}
        </TooltipContent>
      </Tooltip>
    ) : (
      hijo
    )

  return (
    <TooltipProvider delayDuration={150}>
    <aside className={cn('w-full rounded-lg border border-line bg-white p-4 lg:shrink-0', colapsado ? 'lg:w-[60px] lg:p-2' : 'lg:w-[218px]')}>
      <button
        type="button"
        onClick={() => setColapsado((v) => !v)}
        aria-label={colapsado ? 'Expand patient menu' : 'Collapse patient menu'}
        className={cn(
          'hidden rounded-md text-ink-muted hover:bg-surface-muted hover:text-black lg:mb-2 lg:flex lg:size-9 lg:items-center lg:justify-center',
          colapsado ? 'lg:mx-auto' : 'lg:ml-auto',
        )}
      >
        {colapsado ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
      </button>

      <div className={cn('flex items-center gap-3 lg:flex-col lg:gap-1.5', colapsado && 'lg:gap-0')}>
        {/* Colapsado el pill "Active" no entra, pero el estado del paciente
            no es un dato que se pueda perder: pasa a un punto verde sobre el
            avatar, con el nombre y la edad en el tooltip. */}
        <div className="relative">
          <EditableAvatar
            foto={foto}
            iniciales={initials}
            onChange={setFoto}
            label={name}
            avatarClassName={cn(
              'bg-dash-blue-hover rounded-full text-white size-[62px] text-lg',
              colapsado && 'lg:size-9 lg:text-[11px]',
            )}
          />
          {colapsado && conTooltip(`${name} · Active · 50 years`, (
            <span
              tabIndex={0}
              aria-label={`${name}, Active, 50 years`}
              className="absolute right-0 bottom-0 hidden size-3 rounded-full border-2 border-white bg-green lg:block"
            />
          ))}
        </div>
        <div className={cn('flex min-w-0 flex-col items-start gap-1.5 lg:items-center', colapsado && 'lg:hidden')}>
          <p className="truncate text-lg font-bold text-ink">{name}</p>
          <span className="rounded-full border border-dash-ok-fg bg-dash-ok-bg px-2 py-[2px] text-[10px] font-semibold text-dash-ok-fg">
            Active
          </span>
          <p className="text-[11px] text-ink-muted">50 years</p>
        </div>
      </div>

      <div className={cn('mt-3 flex flex-col gap-2 sm:flex-row lg:flex-col', colapsado && 'lg:hidden')}>
        <EncounterButton />
        <Link
          to="/patients/john-smith/clinical-mode"
          data-tour="pat-clinical-mode"
          className="text-dash-blue flex w-full items-center justify-center gap-2 rounded-md bg-[#eef5ff] py-2 text-[13px] font-medium"
        >
          <Eye className="size-3.5" /> Clinical Mode
        </Link>
      </div>

      {/* Colapsado, Clinical Mode y los datos del paciente siguen
          disponibles como íconos: son contenido del panel, no adorno que se
          pueda esconder. General/Contact se leen desde un popover. */}
      {colapsado && (
        <div className="mt-2 hidden flex-col items-center gap-1 lg:flex">
          {conTooltip('Clinical Mode', (
            <Link
              to="/patients/john-smith/clinical-mode"
              aria-label="Clinical Mode"
              className="text-dash-blue flex size-9 items-center justify-center rounded-md bg-[#eef5ff]"
            >
              <Eye className="size-4" />
            </Link>
          ))}
          {/* Abre con el mouse encima además de con click: es información de
              consulta, no una acción, y a esa altura del rail el usuario
              está apenas paseando. El cierre va con retardo para poder
              cruzar el hueco entre el botón y el panel sin que se escape. */}
          <Popover open={info} onOpenChange={setInfo}>
            {/* Sin tooltip: abriendo con el mouse encima, el panel ya dice
                qué es y el tooltip se le encimaba. */}
            <PopoverTrigger
              aria-label="Patient information"
              onMouseEnter={abrirInfo}
              onMouseLeave={cerrarInfo}
              onFocus={abrirInfo}
              className="flex size-9 items-center justify-center rounded-md text-ink hover:bg-surface-muted"
            >
              <IdCard className="size-4" />
            </PopoverTrigger>
            <PopoverContent
              side="right"
              align="start"
              onOpenAutoFocus={(e) => e.preventDefault()}
              onMouseEnter={abrirInfo}
              onMouseLeave={cerrarInfo}
              className="w-64 p-4"
            >
              <InfoBlock className="mt-0" title="General" items={GENERAL} onEdit={onEditGeneral ?? (() => navigate('/patients/edit'))} />
              <InfoBlock title="Contact" items={CONTACT} onEdit={onEditContact ?? (() => setContacto(true))} />
            </PopoverContent>
          </Popover>
        </div>
      )}

      {/* Apilado el panel ocupa toda la pantalla antes del contenido. En
          angosto la nav pasa a una tira horizontal —con altura de toque real
          y un degradado a la derecha que avisa que sigue— y los bloques de
          datos van a dos columnas. */}
      <div className="relative mt-3 lg:mt-0">
      <nav data-tour="pat-tabs" className={cn(
        '-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 lg:mx-0 lg:mt-3 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-0 lg:pb-0',
        colapsado && 'lg:mt-2 lg:items-center lg:gap-1',
      )}>
        {NAV.map(({ key, icon: Icon, to }) => {
          const clase = cn(
            'flex h-10 shrink-0 items-center gap-2 rounded-lg border px-3 text-left text-[13px] font-medium whitespace-nowrap',
            'lg:h-auto lg:shrink lg:gap-2.5 lg:rounded-md lg:border-0 lg:px-2.5 lg:py-2 lg:text-xs',
            colapsado && 'lg:size-9 lg:justify-center lg:gap-0 lg:p-0',
            section === key
              ? 'bg-dash-blue border-dash-blue text-white'
              : 'border-line bg-white text-ink hover:bg-surface-muted lg:bg-transparent',
          )
          const contenido = (
            <>
              <Icon className={cn('size-4 shrink-0 lg:size-3.5', colapsado && 'lg:size-4')} />
              <span className={cn(colapsado && 'lg:hidden')}>{key}</span>
            </>
          )
          /* Colapsado el label va oculto por CSS, así que sin aria-label el
             ítem queda sin nombre accesible: el tooltip es sólo visual. */
          const item = to !== undefined ? (
            <Link to={`${basePath}${to}`} aria-label={colapsado ? key : undefined} className={clase}>{contenido}</Link>
          ) : (
            <button type="button" aria-label={colapsado ? key : undefined} onClick={() => onSection?.(key)} className={clase}>{contenido}</button>
          )
          return <div key={key} className="contents">{conTooltip(key, item)}</div>
        })}
      </nav>
      {/* Degradado que avisa que la tira sigue. */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-white to-transparent lg:hidden"
      />
      </div>

      <div className={cn('grid gap-x-6 sm:grid-cols-2 lg:grid-cols-1', colapsado && 'lg:hidden')}>
        <InfoBlock title="General" items={GENERAL} onEdit={onEditGeneral ?? (() => navigate('/patients/edit'))} />
        <InfoBlock title="Contact" items={CONTACT} onEdit={onEditContact ?? (() => setContacto(true))} />
      </div>

      {contacto && <EditContactModal onClose={() => setContacto(false)} />}
    </aside>
    </TooltipProvider>
  )
}

export { FileText }


/* Figma (Design System) 7740:12244: el botón tiene dos estados, "Start
   Enconter" en verde con play y "Pending Encounter" en ámbar con pausa. El
   chevron alterna entre ellos.

   El verde queda en #1e9850, el de la plataforma, y no en el #28c563 del
   design system: es el mismo botón que el popup del paciente, que Julián pidió
   alinear. El ámbar sí es el #ffb82c del sistema, pero con texto oscuro: el
   frame lo pone en blanco y sobre ese fondo no se lee. */
type EstadoEncuentro = 'start' | 'pending'

/* El estado vivía en el componente y el panel se vuelve a montar en cada
   pantalla del paciente, así que al ir de Treatments a Insurance volvía a
   "Start". Ahora vive fuera de React y todas las instancias lo comparten. */
let estadoGlobal: EstadoEncuentro = 'start'
const oyentes = new Set<() => void>()

function useEstadoEncuentro() {
  const [, redibujar] = useState(0)
  useEffect(() => {
    const f = () => redibujar((n) => n + 1)
    oyentes.add(f)
    return () => { oyentes.delete(f) }
  }, [])
  const set = (v: EstadoEncuentro) => {
    estadoGlobal = v
    oyentes.forEach((f) => f())
  }
  return [estadoGlobal, set] as const
}

const ENCUENTRO = {
  start: {
    label: 'Start Enconter',
    clase: 'bg-green text-white hover:bg-[#18763e]',
    icono: <Play className="size-3.5 shrink-0" />,
  },
  pending: {
    label: 'Pending Encounter',
    clase: 'bg-amber text-[#7a4a00] hover:bg-[#f0a913]',
    icono: <Pause className="size-3.5 shrink-0" />,
  },
} as const

export function EncounterButton() {
  const [estado, setEstado] = useEstadoEncuentro()
  const [abierto, setAbierto] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const actual = ENCUENTRO[estado]

  useEffect(() => {
    if (!abierto) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setAbierto(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [abierto])

  return (
    <div ref={ref} className="relative w-full">
      <span className={cn('flex w-full items-center rounded-lg text-[13px] font-semibold', actual.clase)}>
        <button
          type="button"
          onClick={() =>
            estado === 'start'
              ? aviso.ok('Encounter started.')
              : aviso.warn('Encounter is on hold.')
          }
          className="flex flex-1 items-center justify-center gap-2 py-2"
        >
          {actual.icono} {actual.label}
        </button>
        <button
          type="button"
          aria-label="Encounter options"
          aria-expanded={abierto}
          onClick={() => setAbierto((v) => !v)}
          className="px-2 py-2 opacity-80 hover:opacity-100"
        >
          <ChevronDown className={cn('size-3.5 transition-transform', abierto && 'rotate-180')} />
        </button>
      </span>

      {abierto && (
        <div className="motion-safe:animate-[loc-in_120ms_ease-out] absolute top-[calc(100%+4px)] left-0 z-30 w-full overflow-hidden rounded-lg border border-line bg-white py-1 shadow-lg">
          {(Object.keys(ENCUENTRO) as EstadoEncuentro[]).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => { setEstado(k); setAbierto(false); aviso.ok(`Encounter set to ${ENCUENTRO[k].label}.`) }}
              className={cn(
                'flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] hover:bg-surface-muted',
                estado === k && 'text-dash-blue font-medium',
              )}
            >
              {ENCUENTRO[k].icono} {ENCUENTRO[k].label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
