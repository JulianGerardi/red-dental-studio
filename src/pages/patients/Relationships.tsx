import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Archive, ArchiveRestore, Pencil, Plus, Calendar, Phone, Mail, MapPin, Users, type LucideIcon } from 'lucide-react'
import { PageTitle } from '@/components/ui/page-title'
import { PatientSidePanel } from '@/components/patients/PatientSidePanel'
import { PatientBreadcrumb } from '@/components/patients/PatientBreadcrumb'
import { EmptyState } from '@/components/ui/empty-state'
import { EditRelationshipModal } from '@/components/patients/EditRelationshipModal'
import { AddRelationshipDrawer, type NuevaRelacion, type PersonaDirectorio } from '@/components/patients/AddRelationshipDrawer'
import { ArchiveRelationshipDialog, ReactivateRelationshipDrawer } from '@/components/patients/RelationshipDialogs'
import { Tabs } from '@/components/ui/tabs'
import { aviso } from '@/components/ui/toaster'
import { Pill, type PillTone } from '@/components/ui/pill'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import { CONTENEDOR_PAGINA, TARJETA_PANEL } from '@/lib/estilos'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'

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

/* El Figma dibuja el elipsis pero nunca muestra su menú. Lleva las acciones que el propio diseño da por existentes: editar
   (3716:81940) y quitar la relación, que acá es "Archive relationship" y no borra: pasa a Archived, de donde se reactiva
   (CON-3958, 2026-10-22). Una relación archivada sólo ofrece reactivarla. Ver modulos/relationships.md, anomalía 42. */
export function MenuAcciones({
  nombre, archivada, onEdit, onArchive, onReactivate,
}: {
  nombre: string
  archivada?: boolean
  onEdit?: () => void
  onArchive?: () => void
  onReactivate?: () => void
}) {
  return (
    <RowActionsMenu label={nombre} className="ml-auto">
      {archivada ? (
        <DropdownMenuItem onSelect={onReactivate}>
          <ArchiveRestore className="size-4 shrink-0" /> Reactivate relationship
        </DropdownMenuItem>
      ) : (
        <>
          <DropdownMenuItem onSelect={onEdit}>
            <Pencil className="size-4 shrink-0" /> Edit relationship
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={onArchive}>
            <Archive className="size-4 shrink-0" /> Archive relationship
          </DropdownMenuItem>
        </>
      )}
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
  /** Fecha en que se archivó; sin ella la relación está vigente. */
  archivadaEl?: string
}

/* Legal contact es el rol Guardian. */
export const esGuardian = (p: Persona) => p.badges.includes('Legal contact')

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
export const RELACIONES: Persona[] = [
  { id: 'r1', name: 'Jessica Miller', initials: 'JM', rol: 'Mother', badges: ['Legal contact', 'Financial contact'], campos: CONTACTO },
  { id: 'r2', name: 'Jessica Miller', initials: 'JM', rol: 'Mother', badges: ['Legal contact', 'Financial contact'], campos: CONTACTO },
  /* Una archivada, para ver la vista Archived y el aviso de Add Relationship al elegir a Michael Miller. */
  {
    id: 'r3', name: 'Michael Miller', initials: 'MM', rol: 'Father', badges: ['Legal contact'], archivadaEl: 'Sep 30, 2026',
    campos: [
      { icon: Calendar, label: 'Date of Birth', value: 'May 14, 1982' },
      { icon: Phone, label: 'Phone', value: '(555) 765-4321' },
      { icon: Mail, label: 'Email', value: 'mm.thompson@yahoo.com' },
      { icon: MapPin, label: 'Contact Address', value: '45 Desert View Road, Phoenix, AZ 85018' },
    ],
  },
]
export const HOUSEHOLD: Persona[] = [
  { id: 'h1', name: 'Jessica Miller', initials: 'JM', rol: 'Child', badges: ['Household'], campos: HOGAR },
  { id: 'h2', name: 'Jessica Miller', initials: 'JM', rol: 'Child', badges: ['Household'], campos: HOGAR },
]

export function PersonaCard({
  p, onEdit, onArchive, onReactivate,
}: {
  p: Persona
  onEdit?: () => void
  onArchive?: () => void
  onReactivate?: () => void
}) {
  const archivada = !!p.archivadaEl
  const campos = archivada ? [...p.campos, { icon: Archive, label: 'Archived on', value: p.archivadaEl! }] : p.campos
  return (
    <article className={cn(TARJETA_PANEL, 'px-5 py-4')}>
      <header className="flex flex-wrap items-center gap-3">
        <Avatar initials={p.initials} size={40} />
        <span className="leading-tight">
          <span className="block text-[15px] font-bold text-ink">{p.name}</span>
          <span className="block text-xs text-ink-muted">{p.rol}</span>
        </span>
        <span className="flex flex-wrap items-center gap-2">
          {p.badges.map((b) => <Pill key={b} tone={BADGE_TONO[b]}>{b}</Pill>)}
          {archivada && <Pill tone="neutral">Archived</Pill>}
        </span>
        {(onEdit || onArchive || onReactivate) && (
          <MenuAcciones nombre={p.name} archivada={archivada} onEdit={onEdit} onArchive={onArchive} onReactivate={onReactivate} />
        )}
      </header>

      <div className="mt-4 border-t border-line pt-3">
        <dl className="flex flex-wrap gap-x-10 gap-y-3">
          {campos.map(({ icon: Icon, label, value }) => (
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

const PACIENTE = 'John Smith'
const hoy = () => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
const campo = (p: Persona, label: string) => p.campos.find((c) => c.label === label)?.value ?? ''
const aDirectorio = (p: Persona): PersonaDirectorio => ({ name: p.name, initials: p.initials, dob: campo(p, 'Date of Birth'), email: campo(p, 'Email') })

/* `nuevo`: la ruta .../relationships/new abre la lista con el drawer de Add Relationship ya abierto. */
export default function Relationships({ nuevo = false }: { nuevo?: boolean }) {
  const { id = 'john-smith' } = useParams()
  const navigate = useNavigate()
  const [vacio, setVacio] = useState(false)
  const [agregando, setAgregando] = useState(nuevo)
  const [relaciones, setRelaciones] = useState(RELACIONES)
  /* Relaciones vigentes o archivadas: el filtro de la pantalla (CON-3958). */
  const [vista, setVista] = useState<'Active' | 'Archived'>('Active')
  const [editando, setEditando] = useState<Persona | null>(null)
  const [archivando, setArchivando] = useState<Persona | null>(null)
  const [reactivando, setReactivando] = useState<Persona | null>(null)

  const vigentes = relaciones.filter((r) => !r.archivadaEl)
  const archivadas = relaciones.filter((r) => r.archivadaEl)
  /* Sin otro vínculo de guardián vigente con el mismo paciente: perder éste le quita el usuario (y reactivarlo se lo devuelve). */
  const sinOtraGuardian = (p: Persona) => !relaciones.some((x) => x.id !== p.id && !x.archivadaEl && x.name === p.name && esGuardian(x))

  const cerrarAlta = () => { setAgregando(false); if (nuevo) navigate(`/patients/${id}/relationships`, { replace: true }) }
  const agregar = (r: NuevaRelacion) => {
    const badges: Badge[] = [...(r.guardian ? ['Legal contact' as const] : []), ...(r.guarantor ? ['Financial contact' as const] : [])]
    setRelaciones((prev) => [{
      id: `r${Date.now()}`, name: r.name, initials: r.initials, rol: r.rol, badges,
      campos: [
        { icon: Calendar, label: 'Date of Birth', value: r.dob },
        { icon: Phone, label: 'Phone', value: r.phone },
        { icon: Mail, label: 'Email', value: r.email },
        { icon: MapPin, label: 'Contact Address', value: r.address },
      ],
    }, ...prev])
    setVacio(false)
    setVista('Active')
    aviso.ok(`${r.name} was added as ${r.rol}.`)
  }
  const guardarEdicion = (p: Persona, c: { guardian: boolean; guarantor: boolean; rel: string }) => {
    const badges: Badge[] = [...(c.guardian ? ['Legal contact' as const] : []), ...(c.guarantor ? ['Financial contact' as const] : [])]
    setRelaciones((prev) => prev.map((x) => (x.id === p.id ? { ...x, rol: c.rel, badges } : x)))
  }
  const cambiarArchivo = (p: Persona, archivadaEl: string | undefined) =>
    setRelaciones((prev) => prev.map((x) => (x.id === p.id ? { ...x, archivadaEl } : x)))
  const archivar = (p: Persona) => {
    cambiarArchivo(p, hoy())
    setArchivando(null)
    aviso.ok(`Relationship with ${p.name} was archived.`, { label: 'Undo', onClick: () => cambiarArchivo(p, undefined) })
  }
  const reactivar = (p: Persona) => {
    const fecha = p.archivadaEl
    cambiarArchivo(p, undefined)
    setReactivando(null)
    setVista('Active')
    aviso.ok(`Relationship with ${p.name} was reactivated.`, { label: 'Undo', onClick: () => cambiarArchivo(p, fecha) })
  }

  return (
    <div className={CONTENEDOR_PAGINA}>

      <PatientBreadcrumb name="John Smith" section="Relationships &amp; Billing" />
      <div className="flex flex-col gap-5 lg:flex-row">
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
              <Button data-tour="pat-add-relationship" onClick={() => setAgregando(true)}>
                <Plus /> Add Relationship
              </Button>
            </div>
          </div>

          {vacio ? (
            <div className={cn(TARJETA_PANEL, 'mt-4 flex min-h-[460px]')}>
              <EmptyState
                icon={Users}
                title="No relationships yet"
                detail="This patient doesn't have any related contacts or household members yet."
                accion={{ label: 'Add Relationship', onClick: () => setAgregando(true) }}
              />
            </div>
          ) : (
            <>
              <Tabs
                className="mt-4" aria-label="Relationship status" value={vista} onChange={setVista}
                tabs={[{ value: 'Active', count: vigentes.length }, { value: 'Archived', count: archivadas.length }]}
              />
              <div className="mt-4 flex flex-col gap-4">
                {vista === 'Active' ? (
                  vigentes.length === 0 ? (
                    <div className={TARJETA_PANEL}>
                      <EmptyState icon={Users} title="No related contacts" detail="Every relationship was archived." />
                    </div>
                  ) : (
                    vigentes.map((p) => (
                      <PersonaCard key={p.id} p={p} onEdit={() => setEditando(p)} onArchive={() => setArchivando(p)} />
                    ))
                  )
                ) : archivadas.length === 0 ? (
                  <div className={TARJETA_PANEL}>
                    <EmptyState icon={Archive} title="No archived relationships" detail="Relationships you archive are kept here, and you can reactivate them at any time." />
                  </div>
                ) : (
                  archivadas.map((p) => <PersonaCard key={p.id} p={p} onReactivate={() => setReactivando(p)} />)
                )}
              </div>

              {vista === 'Active' && (
                <>
                  <h2 className="mt-8 text-xl leading-none font-bold text-ink">
                    Household/Same Guarantor Patients
                  </h2>
                  <div className="mt-4 flex flex-col gap-4">
                    {HOUSEHOLD.map((p) => <PersonaCard key={p.id} p={p} />)}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {agregando && (
        <AddRelationshipDrawer
          paciente={PACIENTE}
          archivadas={archivadas.map((r) => r.name)}
          onReactivar={(nombre) => {
            const r = archivadas.find((x) => x.name === nombre)
            if (!r) return
            cerrarAlta()
            setReactivando(r)
          }}
          onClose={cerrarAlta}
          onGuardar={agregar}
        />
      )}
      {editando && (
        <EditRelationshipModal
          persona={aDirectorio(editando)}
          paciente={PACIENTE}
          inicial={{ guardian: esGuardian(editando), guarantor: editando.badges.includes('Financial contact'), rel: editando.rol }}
          ultimaDeGuardian={sinOtraGuardian(editando)}
          onGuardar={(c) => guardarEdicion(editando, c)}
          onClose={() => setEditando(null)}
        />
      )}
      {archivando && (
        <ArchiveRelationshipDialog
          persona={archivando.name} paciente={PACIENTE}
          esGuardian={esGuardian(archivando)} ultimaDeGuardian={sinOtraGuardian(archivando)}
          onConfirm={() => archivar(archivando)} onCancel={() => setArchivando(null)}
        />
      )}
      {reactivando && (
        <ReactivateRelationshipDrawer
          relacion={{
            persona: aDirectorio(reactivando), roles: reactivando.badges, vinculo: reactivando.rol, archivadaEl: reactivando.archivadaEl ?? '',
            esGuardian: esGuardian(reactivando), sinOtraGuardian: sinOtraGuardian(reactivando),
          }}
          paciente={PACIENTE}
          onConfirm={() => reactivar(reactivando)} onClose={() => setReactivando(null)}
        />
      )}
    </div>
  )
}
