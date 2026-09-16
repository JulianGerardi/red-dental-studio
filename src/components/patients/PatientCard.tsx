import { Link } from 'react-router-dom'
import { Cake, Mail, Pencil } from 'lucide-react'
import { Pill } from '@/components/ui/pill'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import { STATUS_TONO, type PatientRow } from '@/components/patients/PatientsTable'

/* Card de paciente para los estantes de "Active"/"Recent" de Patients.tsx.
   Mismo avatar, mismo nombre-link, misma pill y el mismo menú de acciones
   que ya tiene cada fila de la tabla -no se inventa nada nuevo, sólo se
   reacomoda ese mismo contenido en una card. */

export function PatientCard({
  row, onEdit,
}: {
  row: PatientRow
  onEdit: (row: PatientRow) => void
}) {
  return (
    <article className="flex flex-col gap-3 rounded-lg border border-[#e4e4e7] bg-white p-4">
      <header className="flex items-center gap-2.5">
        <span className="bg-dash-blue-hover flex size-9 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-[#fafafa]">
          {row.initials}
        </span>
        <Link
          to={`/patients/${row.id}`}
          className="text-dash-blue min-w-0 flex-1 truncate text-[13px] font-semibold hover:underline"
        >
          {row.name}
        </Link>
        <RowActionsMenu label={row.name}>
          <DropdownMenuItem onSelect={() => onEdit(row)}>
            <Pencil className="size-4 shrink-0" /> Edit
          </DropdownMenuItem>
        </RowActionsMenu>
      </header>

      <Pill tone={STATUS_TONO[row.status]} className="w-fit">{row.status}</Pill>

      <dl className="flex flex-col gap-1.5 border-t border-[#e4e4e7] pt-3">
        <div className="flex items-center gap-1.5 text-[12px] text-[#3f3f46]">
          <Cake className="size-3.5 shrink-0 text-[#71717a]" />
          <dd>{row.birthday}</dd>
        </div>
        <div className="flex items-center gap-1.5 text-[12px] text-[#3f3f46]">
          <Mail className="size-3.5 shrink-0 text-[#71717a]" />
          <dd className="truncate">{row.email}</dd>
        </div>
      </dl>
    </article>
  )
}
