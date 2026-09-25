import { useState } from 'react'
import { Pencil } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Pill, type PillTone } from '@/components/ui/pill'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import { Pagination } from '@/components/patients/ledger/Pagination'

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
      <span className="text-[11px] font-semibold text-ink-muted">{children}</span>
    </div>
  )
}

function Cell({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('flex h-full items-center', className)}>
      <span className="truncate text-[13px] text-ink-soft">{children}</span>
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
  const [pagina, setPagina] = useState(1)
  const paginas = Math.max(1, Math.ceil(rows.length / POR_PAGINA))
  const actual = Math.min(pagina, paginas)
  const visibles = rows.slice((actual - 1) * POR_PAGINA, actual * POR_PAGINA)
  const desde = rows.length === 0 ? 0 : (actual - 1) * POR_PAGINA + 1

  return (
    /* Las columnas suman 872: en pantallas angostas la tabla scrollea sola en
       vez de recortarse contra el borde. */
    <div className="overflow-x-auto rounded-lg border border-line-row bg-white">
    <div className="min-w-[880px]">
      <div className="flex h-11 w-full items-center justify-between border-b border-line-row bg-surface-alt px-4">
        <HeadCell className={COLS.name}>Full name</HeadCell>
        <HeadCell className={COLS.birthday}>Birthday</HeadCell>
        <HeadCell className={COLS.email}>Email</HeadCell>
        <HeadCell className={COLS.status}>Status</HeadCell>
        <HeadCell className={COLS.actions}>Actions</HeadCell>
      </div>

      {visibles.map((r, i) => (
        <div
          key={`${r.email}-${i}`}
          className={cn(
            'flex h-14 w-full items-center justify-between bg-white px-4',
            i < rows.length - 1 && 'border-b border-line-row',
          )}
        >
          <div className={cn('flex h-full items-center gap-2.5', COLS.name)}>
            <span className="bg-dash-blue-hover flex size-8 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-surface-subtle">
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

      <div className="flex h-[52px] w-full items-center justify-between border-t border-line-row bg-white px-4">
        <p className="text-xs font-semibold text-ink-muted">
          Showing {desde} to {desde === 0 ? 0 : desde + visibles.length - 1} of {rows.length} patients
        </p>
        <Pagination pagina={actual} paginas={paginas} onChange={setPagina} />
      </div>
    </div>
    </div>
  )
}
