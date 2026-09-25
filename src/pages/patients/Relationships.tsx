import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, Pencil, Plus, Trash2, Calendar, Phone, Mail, MapPin, Users, type LucideIcon } from 'lucide-react'
import { PageTitle } from '@/components/ui/page-title'
import { PatientSidePanel } from '@/components/patients/PatientSidePanel'
import { EmptyState } from '@/components/ui/empty-state'
import { EditRelationshipModal } from '@/components/patients/EditRelationshipModal'
import { DIRECTORIO } from '@/pages/patients/AddRelationship'
import { aviso } from '@/components/ui/toaster'
import { Pill, type PillTone } from '@/components/ui/pill'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import { CONTENEDOR_PAGINA } from '@/lib/estilos'

/* Figma 3712:60564 (poblado) y 3712:59142 (vacío). */

type Badge = 'Legal contact' | 'Financial contact' | 'Household'
/* Household usaba #f0f2ff -dos unidades distinto del resto de las pills
   azules del sistema (#f0f5ff)-: inconsistencia menor del propio Figma que
   la pill compartida ya no reproduce. */
const BADGE_TONO: Record<Badge, PillTone> = {
  'Legal contact': 'info',
  'Financial contact': 'success',
  Household: 'info',
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
  return (
    <RowActionsMenu label={nombre} className="ml-auto">
      <DropdownMenuItem onSelect={onEdit}>
        <Pencil className="size-4 shrink-0" /> Edit relationship
      </DropdownMenuItem>
      <DropdownMenuItem variant="destructive" onSelect={onDelete}>
        <Trash2 className="size-4 shrink-0" /> Delete relationship
      </DropdownMenuItem>
    </RowActionsMenu>
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
    <article className="rounded-lg border border-line bg-white px-5 py-4">
      <header className="flex flex-wrap items-center gap-3">
        <span className="bg-dash-blue flex size-10 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-white">
          {p.initials}
        </span>
        <span className="leading-tight">
          <span className="block text-[15px] font-bold text-ink">{p.name}</span>
          <span className="block text-xs text-ink-muted">{p.rol}</span>
        </span>
        <span className="flex flex-wrap items-center gap-2">
          {p.badges.map((b) => <Pill key={b} tone={BADGE_TONO[b]}>{b}</Pill>)}
        </span>
        {onEdit && onDelete && <MenuAcciones nombre={p.name} onEdit={onEdit} onDelete={onDelete} />}
      </header>

      <div className="mt-4 border-t border-line pt-3">
        <dl className="flex flex-wrap gap-x-10 gap-y-3">
          {p.campos.map(({ icon: Icon, label, value }) => (
            <div key={label} className="min-w-0">
              <dt className="flex items-center gap-1.5 text-[11px] text-ink-muted">
                <Icon className="size-3.5 shrink-0" /> {label}
              </dt>
              <dd className="mt-0.5 text-[13px] text-ink">{value}</dd>
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
    <div className={CONTENEDOR_PAGINA}>

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
                className="rounded-md border border-line bg-white px-3 py-1.5 text-[11px] font-medium text-ink-muted hover:bg-surface-subtle"
              >
                {vacio ? 'Ver poblado' : 'Ver estado vacío'}
              </button>
              {/* El Figma diseña "Add Relationship" pero no dibuja de dónde se
                  entra. Este botón es una decisión propia — anomalía 42. */}
              <Link
                to={`/patients/${id}/relationships/new`}
                data-tour="pat-add-relationship"
                className="bg-dash-blue hover:bg-dash-blue-hover flex h-9 items-center gap-1.5 rounded-md px-4 text-[13px] font-medium text-white transition-colors"
              >
                <Plus className="size-4" /> Add Relationship
              </Link>
            </div>
          </div>

          {vacio ? (
            <div className="mt-4 flex min-h-[460px] rounded-lg border border-line bg-white">
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
                  <div className="rounded-lg border border-line bg-white">
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

              <h2 className="mt-8 text-xl leading-none font-bold text-ink">
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
