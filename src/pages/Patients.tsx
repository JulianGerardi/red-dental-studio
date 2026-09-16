import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Search, Plus } from 'lucide-react'
import { PatientsTable, type PatientRow } from '@/components/patients/PatientsTable'
import { PatientCard } from '@/components/patients/PatientCard'
import { usePatients } from '@/data/patientsStore'
import { PageTitle } from '@/components/ui/page-title'
import { SearchButton } from '@/components/ui/search-button'
import { NewPatientModal } from '@/pages/patients/NewPatientModal'

/* La lista todavía no guarda fecha de alta ni de última visita: "Recent" usa
   el orden del array -`addPatient` inserta al principio- y "Active" toma el
   status del plan de tratamiento (todo lo que no está "Completed"), que es
   el único dato de estado que existe hoy por paciente. */
const CANTIDAD_ESTANTE = 4

function EstantePacientes({
  titulo, filas, onEdit,
}: {
  titulo: string
  filas: PatientRow[]
  onEdit: (row: PatientRow) => void
}) {
  if (filas.length === 0) return null
  return (
    <div className="mt-5">
      <h2 className="text-sm font-bold text-[#09090b]">{titulo}</h2>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {filas.map((r) => <PatientCard key={r.id} row={r} onEdit={onEdit} />)}
      </div>
    </div>
  )
}


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

  /* Los estantes muestran siempre el mismo pulso de la cuenta: no se filtran
     por la búsqueda, igual que las cards de resumen de Billing. */
  const activos = useMemo(
    () => patients.filter((r) => r.status !== 'Completed').slice(0, CANTIDAD_ESTANTE),
    [patients],
  )
  const recientes = useMemo(() => patients.slice(0, CANTIDAD_ESTANTE), [patients])

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6">
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

      <EstantePacientes titulo="Active Patients" filas={activos} onEdit={setEditando} />
      <EstantePacientes titulo="Recent Patients" filas={recientes} onEdit={setEditando} />

      <div className="mt-5 flex flex-wrap items-center gap-3">
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
