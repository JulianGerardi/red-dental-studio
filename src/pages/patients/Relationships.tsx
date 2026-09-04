import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, EllipsisVertical, Pencil, Plus, Trash2, Calendar, Phone, Mail, MapPin, Users, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PageTitle } from '@/components/ui/page-title'
import { PatientSidePanel } from '@/components/patients/PatientSidePanel'
import { EmptyState } from '@/components/ui/empty-state'
import { EditRelationshipModal } from '@/components/patients/EditRelationshipModal'
import { DIRECTORIO } from '@/pages/patients/AddRelationship'
import { aviso } from '@/components/ui/toaster'

/* Figma 3712:60564 (poblado) y 3712:59142 (vacío). */

type Badge = 'Legal contact' | 'Financial contact' | 'Household'
/* Muestreados del frame. Coinciden con el resto del sistema: el par
   #f0f2ff / #174596 es el mismo de "Busy" en Scheduling y "Primary" en la
   tabla de Insurance. Legal contact usa #f0f5ff, dos unidades distinto de
   Household (#f0f2ff) — inconsistencia menor del propio Figma. */
const BADGE: Record<Badge, string> = {
  'Legal contact': 'border-[#174596] bg-[#f0f5ff] text-[#174596]',
  'Financial contact': 'border-[#1a804d] bg-[#f0fcf5] text-[#1a804d]',
  Household: 'border-[#174596] bg-[#f0f2ff] text-[#174596]',
}

/* El Figma dibuja el elipsis pero nunca muestra su menú. Lleva las dos
   acciones que el propio diseño da por existentes: editar (3716:81940) y
   borrar, que el texto de ese modal menciona sin llegar a dibujar.
   Ver modulos/relationships.md, anomalía 42. */
function MenuAcciones({
  nombre, onEdit, onDelete,
}: {
  nombre: string
  onEdit: () => void
  onDelete: () => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

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

  return (
    <div ref={ref} className="relative ml-auto">
      <button
        type="button"
        aria-label={`Actions for ${nombre}`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn('rounded p-1 text-[#09090b] hover:bg-[#f4f4f5]', open && 'bg-[#f4f4f5]')}
      >
        <EllipsisVertical className="size-4" />
      </button>
      {open && (
        <div className="motion-safe:animate-[loc-in_120ms_ease-out] absolute top-full right-0 z-20 mt-1 w-44 overflow-hidden rounded-md border border-[#e4e4e7] bg-white py-1 shadow-lg">
          <button
            type="button"
            onClick={() => { setOpen(false); onEdit() }}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] hover:bg-[#f4f4f5]"
          >
            <Pencil className="size-3.5" /> Edit relationship
          </button>
          <button
            type="button"
            onClick={() => { setOpen(false); onDelete() }}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-[#dc2626] hover:bg-[#fff2f2]"
          >
            <Trash2 className="size-3.5" /> Delete relationship
          </button>
        </div>
      )}
    </div>
  )
}

type Campo = { icon: LucideIcon; label: string; value: string }

type Persona = {
  id?: string
  name: string
  initials: string
  rol: string
  badges: Badge[]
  campos: Campo[]
}

const CONTACTO: Campo[] = [
  { icon: Calendar, label: 'Date of Birth', value: 'May 14, 1982' },
  { icon: Phone, label: 'Phone', value: '(555) 123-4567' },
  { icon: Mail, label: 'Email', value: 'abrilviola@gmail.com' },
  { icon: MapPin, label: 'Contact Address', value: '123 Maple Street, Phoenix, AZ 85016' },
]
const HOGAR: Campo[] = [
  { icon: Calendar, label: 'Date of Birth', value: 'May 14, 1982' },
  { icon: Mail, label: 'Email', value: 'abrilviola@gmail.com' },
]

/* Dos cards con la misma persona: es lo que muestra el frame. Se les agrega
   un id para poder borrarlas por separado. */
const RELACIONES: Persona[] = [
  { id: 'r1', name: 'Jessica Miller', initials: 'JM', rol: 'Mother', badges: ['Legal contact', 'Financial contact'], campos: CONTACTO },
  { id: 'r2', name: 'Jessica Miller', initials: 'JM', rol: 'Mother', badges: ['Legal contact', 'Financial contact'], campos: CONTACTO },
]
const HOUSEHOLD: Persona[] = [
  { id: 'h1', name: 'Jessica Miller', initials: 'JM', rol: 'Child', badges: ['Household'], campos: HOGAR },
  { id: 'h2', name: 'Jessica Miller', initials: 'JM', rol: 'Child', badges: ['Household'], campos: HOGAR },
]

function PersonaCard({
  p, onEdit, onDelete,
}: {
  p: Persona
  onEdit?: () => void
  onDelete?: () => void
}) {
  return (
    <article className="rounded-lg border border-[#e4e4e7] bg-white px-5 py-4">
      <header className="flex flex-wrap items-center gap-3">
        <span className="bg-dash-blue flex size-10 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-white">
          {p.initials}
        </span>
        <span className="leading-tight">
          <span className="block text-[15px] font-bold text-[#09090b]">{p.name}</span>
          <span className="block text-xs text-[#71717a]">{p.rol}</span>
        </span>
        <span className="flex flex-wrap items-center gap-2">
          {p.badges.map((b) => (
            <span key={b} className={cn('rounded-full border px-2.5 py-[2px] text-[11px] font-medium', BADGE[b])}>
              {b}
            </span>
          ))}
        </span>
        {onEdit && onDelete && <MenuAcciones nombre={p.name} onEdit={onEdit} onDelete={onDelete} />}
      </header>

      <div className="mt-4 border-t border-[#e4e4e7] pt-3">
        <dl className="flex flex-wrap gap-x-10 gap-y-3">
          {p.campos.map(({ icon: Icon, label, value }) => (
            <div key={label} className="min-w-0">
              <dt className="flex items-center gap-1.5 text-[11px] text-[#71717a]">
                <Icon className="size-3.5 shrink-0" /> {label}
              </dt>
              <dd className="mt-0.5 text-[13px] text-[#09090b]">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  )
}

export default function Relationships() {
  const { id = 'john-smith' } = useParams()
  const navigate = useNavigate()
  const [vacio, setVacio] = useState(false)
  const [editando, setEditando] = useState<string | null>(null)
  const [relaciones, setRelaciones] = useState(RELACIONES)

  const borrar = (p: Persona) => {
    const indice = relaciones.findIndex((x) => x.id === p.id)
    setRelaciones((prev) => prev.filter((x) => x.id !== p.id))
    aviso.ok(`Relationship with ${p.name} was deleted.`, {
      label: 'Undo',
      onClick: () => setRelaciones((prev) => [...prev.slice(0, indice), p, ...prev.slice(indice)]),
    })
  }

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6">

      {/* Único rastro de navegación que queda arriba: la vuelta a la tabla.
          El breadcrumb completo repetía lo que ya dice el panel lateral. */}
      <Link
        to="/patients"
        className="text-dash-blue mb-3 inline-flex items-center gap-1 text-sm hover:underline"
      >
        <ChevronLeft className="size-4" /> Patients
      </Link>
      <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-start">
        <PatientSidePanel
          name="John Smith"
          initials="JS"
          section="Relationships & Billing"
          basePath={`/patients/${id}`}
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <PageTitle>Relationships &amp; Billing</PageTitle>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setVacio((v) => !v)}
                className="rounded-md border border-[#e4e4e7] bg-white px-3 py-1.5 text-[11px] font-medium text-[#71717a] hover:bg-[#fafafa]"
              >
                {vacio ? 'Ver poblado' : 'Ver estado vacío'}
              </button>
              {/* El Figma diseña "Add Relationship" pero no dibuja de dónde se
                  entra. Este botón es una decisión propia — anomalía 42. */}
              <Link
                to={`/patients/${id}/relationships/new`}
                className="bg-dash-blue hover:bg-dash-blue-hover flex h-9 items-center gap-1.5 rounded-md px-4 text-[13px] font-medium text-white transition-colors"
              >
                <Plus className="size-4" /> Add Relationship
              </Link>
            </div>
          </div>

          {vacio ? (
            <div className="mt-4 flex min-h-[460px] rounded-lg border border-[#e4e4e7] bg-white">
              <EmptyState
                icon={Users}
                title="No relationships yet"
                detail="This patient doesn't have any related contacts or household members yet."
                accion={{ label: 'Add Relationship', onClick: () => navigate(`/patients/${id}/relationships/new`) }}
              />
            </div>
          ) : (
            <>
              <div className="mt-4 flex flex-col gap-4">
                {relaciones.length === 0 ? (
                  <div className="rounded-lg border border-[#e4e4e7] bg-white">
                    <EmptyState icon={Users} title="No related contacts" detail="Every relationship was removed." />
                  </div>
                ) : (
                  relaciones.map((p) => (
                    <PersonaCard
                      key={p.id}
                      p={p}
                      onEdit={() => setEditando(p.name)}
                      onDelete={() => borrar(p)}
                    />
                  ))
                )}
              </div>

              <h2 className="mt-8 text-xl leading-none font-bold text-[#09090b]">
                Household/Same Guarantor Patients
              </h2>
              <div className="mt-4 flex flex-col gap-4">
                {HOUSEHOLD.map((p) => <PersonaCard key={p.id} p={p} />)}
              </div>
            </>
          )}
        </div>
      </div>

      {editando && (
        <EditRelationshipModal
          persona={DIRECTORIO.find((x) => x.name === editando) ?? DIRECTORIO[1]}
          onClose={() => setEditando(null)}
        />
      )}
    </div>
  )
}
