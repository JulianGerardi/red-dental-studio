import { Link } from 'react-router-dom'
import { Mail, Pencil } from 'lucide-react'
import { Pill } from '@/components/ui/pill'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import { STATUS_TONO, type PatientRow } from '@/components/patients/PatientsTable'

/* Card chica para el costado de Patients.tsx -ver Patients.tsx-: una fila,
   no la card de dos pisos de antes. Mismo avatar, nombre-link, pill y menú
   que ya tiene cada fila de la tabla; el cumpleaños queda afuera -ya está en
   la tabla de al lado- para que la card entre en un renglón. */

export function PatientCard({
  row, onEdit,
}: {
  row: PatientRow
  onEdit: (row: PatientRow) => void
}) {
  return (
    <article className="flex items-center gap-2.5 rounded-lg border border-[#e4e4e7] bg-white p-2.5">
      <span className="bg-dash-blue-hover flex size-8 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold text-[#fafafa]">
        {row.initials}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="flex items-center gap-1.5">
          <Link
            to={`/patients/${row.id}`}
            className="text-dash-blue min-w-0 truncate text-[13px] font-semibold hover:underline"
          >
            {row.name}
          </Link>
          <Pill tone={STATUS_TONO[row.status]} className="shrink-0">{row.status}</Pill>
        </span>
        <span className="flex items-center gap-1 text-[11px] text-[#71717a]">
          <Mail className="size-3 shrink-0" />
          <span className="truncate">{row.email}</span>
        </span>
      </span>
      <RowActionsMenu label={row.name} className="shrink-0">
        <DropdownMenuItem onSelect={() => onEdit(row)}>
          <Pencil className="size-4 shrink-0" /> Edit
        </DropdownMenuItem>
      </RowActionsMenu>
    </article>
  )
}
