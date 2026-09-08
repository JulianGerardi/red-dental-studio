import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Search, Plus } from 'lucide-react'
import { PatientsTable, type PatientRow } from '@/components/patients/PatientsTable'
import { usePatients } from '@/data/patientsStore'
import { PageTitle } from '@/components/ui/page-title'
import { NewPatientModal } from '@/pages/patients/NewPatientModal'


/* Figma 3638:59529 "Patients — List".
   Los formatos de fecha mezclados ("April 2" / "Jan 15" / "June 2" / "Jun 3")
   y las iniciales en minúscula son del original y se dejan tal cual. */

export default function Patients() {
  const { patients } = usePatients()
  const [query, setQuery] = useState('')
  const [modal, setModal] = useState<'new' | null>(null)
  const [editando, setEditando] = useState<PatientRow | null>(null)

  const rows = useMemo(
    () => patients.filter((r) => r.name.toLowerCase().includes(query.toLowerCase())),
    [patients, query],
  )

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6">
      {/* Page Header: título+search a la izquierda, botón alineado abajo a la
          derecha. En angosto el botón baja debajo del bloque de título. */}
      <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
        <div className="flex w-full flex-col gap-[15px] sm:w-[320px] sm:shrink-0">
          {/* Era un <button> sin acción. Ahora es el mismo link que en el
              resto de las pantallas del módulo. */}
          <Link to="/patients" className="flex items-center gap-1 self-start text-sm text-[#0056ef]">
            Patients <ChevronDown className="size-[15px]" />
          </Link>

          <div className="flex flex-col gap-[9px]">
            <PageTitle>Patients</PageTitle>
            {/* Copy de locación en una pantalla de pacientes: es del Figma. */}
            <p className="text-xs leading-[17px] text-[#a3a3a3]">
              Set your location name. Add the location you need.
            </p>
          </div>

          <div className="relative" data-tour="pat-search">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#a1a1aa]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by Name or Last Name"
              className="focus:border-dash-blue h-8 w-full rounded-md border border-[#e4e4e7] bg-white pr-3 pl-9 text-[13px] font-medium shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-[#a1a1aa] focus:outline-none"
            />
          </div>
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
