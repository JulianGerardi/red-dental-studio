import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ChevronDown, Eye, Pencil, PanelTop, FileText, Archive, Shield, BookOpen, ClipboardList, Ban, PersonStanding, Calendar, Languages, Phone, Mail, MapPin, type LucideIcon, Play, Pause,
} from 'lucide-react'
import { cn } from '@/lib/utils'
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

function InfoBlock({
  title,
  items,
  onEdit,
}: {
  title: string
  items: { icon: LucideIcon; label: string; value: string }[]
  onEdit: () => void
}) {
  return (
    <div className="mt-5">
      <div className="flex items-center justify-between border-b border-[#e4e4e7] pb-1.5">
        <span className="text-[13px] font-semibold text-[#09090b]">{title}</span>
        <button
          type="button"
          onClick={onEdit}
          aria-label={`Edit ${title}`}
          className="text-[#71717a] transition-colors hover:text-black"
        >
          <Pencil className="size-3.5" />
        </button>
      </div>
      <dl className="mt-3 flex flex-col gap-3">
        {items.map(({ icon: Icon, label, value }) => (
          <div key={label}>
            <dt className="flex items-center gap-2 text-xs font-medium text-[#09090b]">
              <Icon className="size-3.5 shrink-0" /> {label}
            </dt>
            <dd className="mt-0.5 text-[11px] text-[#71717a]">{value}</dd>
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

  return (
    <aside className="w-full rounded-lg border border-[#e4e4e7] bg-white p-4 lg:w-[218px] lg:shrink-0">
      <div className="flex items-center gap-3 lg:flex-col lg:gap-1.5">
        <EditableAvatar
          foto={foto}
          iniciales={initials}
          onChange={setFoto}
          label={name}
          avatarClassName="bg-dash-blue-hover text-white size-[62px] rounded-full text-lg"
        />
        <div className="flex min-w-0 flex-col items-start gap-1.5 lg:items-center">
          <p className="truncate text-lg font-bold text-[#09090b]">{name}</p>
          <span className="rounded-full border border-[#1a804d] bg-[#f0fcf5] px-2 py-[2px] text-[10px] font-semibold text-[#1a804d]">
            Active
          </span>
          <p className="text-[11px] text-[#71717a]">50 years</p>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row lg:flex-col">
        <EncounterButton />
        <Link
          to="/patients/john-smith/clinical-mode"
          data-tour="pat-clinical-mode"
          className="text-dash-blue flex w-full items-center justify-center gap-2 rounded-md bg-[#eef5ff] py-2 text-[13px] font-medium"
        >
          <Eye className="size-3.5" /> Clinical Mode
        </Link>
      </div>

      {/* Apilado el panel ocupa toda la pantalla antes del contenido. En
          angosto la nav pasa a una tira horizontal —con altura de toque real
          y un degradado a la derecha que avisa que sigue— y los bloques de
          datos van a dos columnas. */}
      <div className="relative mt-3 lg:mt-0">
      <nav data-tour="pat-tabs" className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 lg:mx-0 lg:mt-3 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-0 lg:pb-0">
        {NAV.map(({ key, icon: Icon, to }) => {
          const clase = cn(
            'flex h-10 shrink-0 items-center gap-2 rounded-lg border px-3 text-left text-[13px] font-medium whitespace-nowrap',
            'lg:h-auto lg:shrink lg:gap-2.5 lg:rounded-md lg:border-0 lg:px-2.5 lg:py-2 lg:text-xs',
            section === key
              ? 'bg-dash-blue border-dash-blue text-white'
              : 'border-[#e4e4e7] bg-white text-[#09090b] hover:bg-[#f4f4f5] lg:bg-transparent',
          )
          const contenido = (
            <>
              <Icon className="size-4 shrink-0 lg:size-3.5" /> {key}
            </>
          )
          return to !== undefined ? (
            <Link key={key} to={`${basePath}${to}`} className={clase}>
              {contenido}
            </Link>
          ) : (
            <button key={key} type="button" onClick={() => onSection?.(key)} className={clase}>
              {contenido}
            </button>
          )
        })}
      </nav>
      {/* Degradado que avisa que la tira sigue. */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-white to-transparent lg:hidden"
      />
      </div>

      <div className="grid gap-x-6 sm:grid-cols-2 lg:grid-cols-1">
        <InfoBlock title="General" items={GENERAL} onEdit={onEditGeneral ?? (() => navigate('/patients/edit'))} />
        <InfoBlock title="Contact" items={CONTACT} onEdit={onEditContact ?? (() => setContacto(true))} />
      </div>

      {contacto && <EditContactModal onClose={() => setContacto(false)} />}
    </aside>
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
    clase: 'bg-[#1e9850] text-white hover:bg-[#18763e]',
    icono: <Play className="size-3.5 shrink-0" />,
  },
  pending: {
    label: 'Pending Encounter',
    clase: 'bg-[#ffb82c] text-[#7a4a00] hover:bg-[#f0a913]',
    icono: <Pause className="size-3.5 shrink-0" />,
  },
} as const

function EncounterButton() {
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
        <div className="motion-safe:animate-[loc-in_120ms_ease-out] absolute top-[calc(100%+4px)] left-0 z-30 w-full overflow-hidden rounded-lg border border-[#e4e4e7] bg-white py-1 shadow-lg">
          {(Object.keys(ENCUENTRO) as EstadoEncuentro[]).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => { setEstado(k); setAbierto(false); aviso.ok(`Encounter set to ${ENCUENTRO[k].label}.`) }}
              className={cn(
                'flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] hover:bg-[#f4f4f5]',
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
