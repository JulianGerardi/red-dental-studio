import { Eye, Pencil, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { clavePacienteFoto, fotoGuardada } from '@/lib/usePhoto'
import { Pill, type PillTone } from '@/components/ui/pill'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { DataTable, PersonCell, TextCell, type DataTableColumn } from '@/components/ui/data-table'

/* Figma 3638:61352 — la capa se llama `table/referral-table`: es el componente
   de referrals reusado para pacientes, y de ahí venía un pie que decía
   "Showing 6 of 18 referrals" con 11 filas a la vista y flechas que no
   hacían nada. Confidentally 2.0 ya no arrastra esa etiqueta en esta
   pantalla, y Accounts acá mismo cuenta de verdad: el pie ahora dice lo que
   hay y el pager funciona, con el mismo componente que usan Ledger y
   Accounts. */
const POR_PAGINA = 10

/* Pedido explícito de Julián: reemplazar el status de tratamiento
   (Completed/Proposed/In Progress) por si el paciente está activo o no. */
export type PatientStatus = 'Active' | 'Inactive'

export type PatientRow = {
  id: string
  name: string
  initials: string
  birthday: string
  email: string
  status: PatientStatus
}

export const STATUS_TONO: Record<PatientStatus, PillTone> = {
  Active: 'success',
  Inactive: 'neutral',
}

/* La tabla estándar de la app (ui/data-table) con las columnas de pacientes. El nombre y Overview llevan al dashboard
   del paciente; Edit abre el formulario. La foto es la que se subió en la ficha (patients.md, 2026-11-06). */
const COLUMNAS: DataTableColumn<PatientRow>[] = [
  { key: 'name', header: 'Full name', width: 220, cell: (r) => <PersonCell name={r.name} initials={r.initials} photo={fotoGuardada(clavePacienteFoto(r.id))} to={`/patients/${r.id}`} /> },
  { key: 'birthday', header: 'Birthday', width: 160, cell: (r) => <TextCell>{r.birthday}</TextCell> },
  { key: 'email', header: 'Email', cell: (r) => <TextCell>{r.email}</TextCell> },
  { key: 'status', header: 'Status', width: 140, cell: (r) => <Pill tone={STATUS_TONO[r.status]}>{r.status}</Pill> },
]

export function PatientsTable({
  rows,
  onRowAction,
}: {
  rows: PatientRow[]
  onRowAction?: (row: PatientRow) => void
}) {
  const navigate = useNavigate()
  return (
    <DataTable
      columns={COLUMNAS}
      rows={rows}
      rowKey={(r) => r.id}
      rowLabel={(r) => r.name}
      pageSize={POR_PAGINA}
      pageSizeOptions={[10, 20, 50]}
      itemLabel="patients"
      empty={{ icon: Users, title: 'No patients found', detail: 'Try a different name or last name.' }}
      rowActions={(r) => (
        <>
          <DropdownMenuItem onSelect={() => navigate(`/patients/${r.id}`)}>
            <Eye className="size-4 shrink-0" /> Overview
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => onRowAction?.(r)}>
            <Pencil className="size-4 shrink-0" /> Edit
          </DropdownMenuItem>
        </>
      )}
    />
  )
}
