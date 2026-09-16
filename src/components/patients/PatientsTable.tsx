import { Pencil } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Pill, type PillTone } from '@/components/ui/pill'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'

/* Figma 3638:61352 — la capa se llama `table/referral-table`: es el componente
   de referrals reusado para pacientes. De ahí sale el "referrals" del footer. */

export type PatientStatus = 'Completed' | 'Proposed' | 'In Progress'

export type PatientRow = {
  id: string
  name: string
  initials: string
  birthday: string
  email: string
  status: PatientStatus
}

const STATUS_TONO: Record<PatientStatus, PillTone> = {
  Completed: 'success',
  Proposed: 'warning',
  'In Progress': 'info',
}

/* Anchos fijos por celda; el sobrante se reparte con justify-between,
   igual que en el Figma (200+180+260+160+72 = 872 sobre 1056 útiles). */
const COLS = {
  name: 'w-[200px]',
  birthday: 'w-[180px]',
  email: 'w-[260px]',
  status: 'w-[160px]',
  actions: 'w-[72px]',
}

function HeadCell({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('flex h-full items-center', className)}>
      <span className="text-[11px] font-semibold text-[#71717a]">{children}</span>
    </div>
  )
}

function Cell({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('flex h-full items-center', className)}>
      <span className="truncate text-[13px] text-[#3f3f46]">{children}</span>
    </div>
  )
}

export function PatientsTable({
  rows,
  onRowAction,
}: {
  rows: PatientRow[]
  onRowAction?: (row: PatientRow) => void
}) {
  return (
    /* Las columnas suman 872: en pantallas angostas la tabla scrollea sola en
       vez de recortarse contra el borde. */
    <div className="overflow-x-auto rounded-lg border border-[#e7e7e7] bg-white">
    <div className="min-w-[880px]">
      <div className="flex h-11 w-full items-center justify-between border-b border-[#e7e7e7] bg-[#f9f9f9] px-4">
        <HeadCell className={COLS.name}>Full name</HeadCell>
        <HeadCell className={COLS.birthday}>Birthday</HeadCell>
        <HeadCell className={COLS.email}>Email</HeadCell>
        <HeadCell className={COLS.status}>Status</HeadCell>
        <HeadCell className={COLS.actions}>Actions</HeadCell>
      </div>

      {rows.map((r, i) => (
        <div
          key={`${r.email}-${i}`}
          className={cn(
            'flex h-14 w-full items-center justify-between bg-white px-4',
            i < rows.length - 1 && 'border-b border-[#e7e7e7]',
          )}
        >
          <div className={cn('flex h-full items-center gap-2.5', COLS.name)}>
            <span className="bg-dash-blue-hover flex size-8 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-[#fafafa]">
              {r.initials}
            </span>
            {/* El nombre es el acceso al dashboard del paciente. */}
            <Link
              to={`/patients/${r.id}`}
              onClick={(e) => e.stopPropagation()}
              className="text-dash-blue truncate text-[13px] font-semibold hover:underline"
            >
              {r.name}
            </Link>
          </div>
          <Cell className={COLS.birthday}>{r.birthday}</Cell>
          <Cell className={COLS.email}>{r.email}</Cell>
          <div className={cn('flex h-full items-center', COLS.status)}>
            <Pill tone={STATUS_TONO[r.status]}>{r.status}</Pill>
          </div>
          <div className={cn('flex h-full items-center justify-center', COLS.actions)}>
            <RowActionsMenu label={r.name}>
              <DropdownMenuItem onSelect={() => onRowAction?.(r)}>
                <Pencil className="size-4 shrink-0" /> Edit
              </DropdownMenuItem>
            </RowActionsMenu>
          </div>
        </div>
      ))}

      <div className="flex h-[52px] w-full items-center justify-between border-t border-[#e7e7e7] bg-white px-4">
        {/* El texto dice "referrals" y "6" con 11 filas a la vista: es del
            Figma, por reuso del componente de referrals. Se deja tal cual. */}
        <p className="text-xs font-semibold text-[#71717a]">Showing 6 of 18 referrals</p>
        <div className="flex items-center gap-1">
          {['‹', '1', '2', '3', '›'].map((p) => (
            <button
              key={p}
              type="button"
              className={cn(
                'flex size-8 items-center justify-center rounded-md text-xs font-semibold',
                p === '1' ? 'bg-dash-blue text-[#fafafa]' : 'text-[#71717a] hover:bg-[#f4f4f5]',
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}
