import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Search, Plus, CalendarDays, Users } from 'lucide-react'
import { PatientsTable, type PatientRow } from '@/components/patients/PatientsTable'
import { PatientCard } from '@/components/patients/PatientCard'
import { usePatients } from '@/data/patientsStore'
import { PageTitle } from '@/components/ui/page-title'
import { SearchButton } from '@/components/ui/search-button'
import { EmptyState } from '@/components/ui/empty-state'
import { NewPatientModal } from '@/pages/patients/NewPatientModal'
import { aviso } from '@/components/ui/toaster'
import { Panel } from '@/components/dashboard/primitives'
import { AppointmentCard } from '@/components/dashboard/AppointmentCard'
import { HOY_DEMO, datosDelDia } from '@/components/dashboard/dashboard-data'
import { CONTENEDOR_PAGINA } from '@/lib/estilos'

/* Barra lateral junto a la tabla, no arriba: reemplaza al estante de
   "Active"/"Recent Patients" en grilla de la vuelta anterior. Mismos paneles
   que el Dashboard -Panel + AppointmentCard- para Today Appointments, así la
   card de turno es una sola en todo el sistema y no una versión propia acá.
   La card de turno pesa ~220px contra los ~45px de una fila de tabla: con
   los mismos 4 elementos que el estante anterior la barra triplicaba el
   alto de la tabla. Se recorta a 2 turnos y 3 pacientes para que la barra
   no le gane tanto lugar a la tabla, que sigue siendo el contenido principal. */
const CANTIDAD_TURNOS = 2
const CANTIDAD_PACIENTES = 3


/* Figma 3638:59529 "Patients — List".
   Los formatos de fecha mezclados ("April 2" / "Jan 15" / "June 2" / "Jun 3")
   y las iniciales en minúscula son del original y se dejan tal cual. */

export default function Patients() {
  const { patients } = usePatients()
  const [query, setQuery] = useState('')
  const [modal, setModal] = useState<'new' | null>(null)
  const [editando, setEditando] = useState<PatientRow | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const rows = useMemo(
    () => patients.filter((r) => r.name.toLowerCase().includes(query.toLowerCase())),
    [patients, query],
  )

  /* La barra lateral muestra siempre el mismo pulso de la cuenta: no se
     filtra por la búsqueda, igual que las cards de resumen de Billing. */
  const recientes = useMemo(() => patients.slice(0, CANTIDAD_PACIENTES), [patients])
  const turnosHoy = useMemo(
    () => datosDelDia(HOY_DEMO).appointments.slice(0, CANTIDAD_TURNOS),
    [],
  )

  return (
    <div className={CONTENEDOR_PAGINA}>
      {/* Era un <button> sin acción. Ahora es el mismo link que en el
          resto de las pantallas del módulo. */}
      <Link to="/patients" className="flex items-center gap-1 self-start text-sm text-[#0056ef]">
        Patients <ChevronDown className="size-[15px]" />
      </Link>

      {/* Misma disposición que el resto de las listas: el botón principal va
          en la fila del título -antes quedaba abajo, al lado del buscador- y
          la búsqueda pasa a su propia fila. */}
      <div className="mt-[15px] flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-[9px]">
          <PageTitle>Patients</PageTitle>
          {/* Copy de locación en una pantalla de pacientes: es del Figma. */}
          <p className="text-xs leading-[17px] text-[#a3a3a3]">
            Set your location name. Add the location you need.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModal('new')}
          data-tour="pat-new"
          className="bg-dash-blue hover:bg-dash-blue-hover flex h-[33px] shrink-0 items-center justify-center gap-2 rounded-md px-5 text-[13px] font-medium text-white transition-colors"
        >
          <Plus className="size-3.5" /> New Patient
        </button>
      </div>

      <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-[320px]" data-tour="pat-search">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#a1a1aa]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by Name or Last Name"
                className="focus:border-dash-blue h-8 w-full rounded-md border border-[#e4e4e7] bg-white pr-3 pl-9 text-[13px] font-medium shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-[#a1a1aa] focus:outline-none"
              />
            </div>
            <SearchButton onClick={() => inputRef.current?.focus()} className="h-8" />
          </div>

          <div className="mt-4">
            {/* El nombre navega al dashboard del paciente; el kebab abre Edit. */}
            <PatientsTable rows={rows} onRowAction={setEditando} />
          </div>
        </div>

        {/* Al costado de la tabla, no arriba: mismo Panel que usa el Dashboard,
            para que la card de turno sea la misma en las dos pantallas. */}
        <div className="flex w-full flex-col gap-4 lg:w-[336px] lg:shrink-0">
          <Panel title="Today Appointments" bodyClassName="gap-3">
            {turnosHoy.length === 0 ? (
              <EmptyState
                icon={CalendarDays}
                title="No appointments today"
                detail="Your schedule is clear for today."
                className="py-6"
              />
            ) : (
              turnosHoy.map((a, i) => (
                <AppointmentCard
                  key={i} appt={a}
                  onEdit={() => aviso.info('Use Scheduling to edit this appointment.')}
                />
              ))
            )}
          </Panel>

          <Panel title="Recent Patients" bodyClassName="gap-3">
            {recientes.length === 0 ? (
              <EmptyState
                icon={Users}
                title="No patients yet"
                detail="New patients will show up here."
                className="py-6"
              />
            ) : (
              recientes.map((r) => <PatientCard key={r.id} row={r} onEdit={setEditando} />)
            )}
          </Panel>
        </div>
      </div>

      {modal === 'new' && <NewPatientModal onClose={() => setModal(null)} />}
      {/* Mismo formulario que New Patient (variante con guardián), otro título.
          Se le pasa la fila para que guarde sobre ese paciente. */}
      {editando && (
        <NewPatientModal
          title="Edit Patient"
          forceGuardian
          editId={editando.id}
          inicial={{
            first: editando.name.split(' ')[0] ?? '',
            last: editando.name.split(' ').slice(1).join(' '),
            email: editando.email,
            birthday: editando.birthday,
          }}
          onClose={() => setEditando(null)}
        />
      )}
    </div>
  )
}
