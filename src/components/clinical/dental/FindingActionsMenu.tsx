import {
  Activity, ArchiveX, CheckCheck, CircleOff, MoreVertical, Pencil, Play, ShieldX, Trash2, UserRoundX,
} from 'lucide-react'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ACTIONS, type FindingAction } from './actions'
import type { Finding } from './data'

type Fila = { action: Exclude<FindingAction, 'edit'>; Icon: typeof Activity }

const FILAS: Fila[] = [
  { action: 'monitor', Icon: Activity },
  { action: 'treat', Icon: Play },
  { action: 'treated', Icon: CheckCheck },
  { action: 'externally-treated', Icon: CheckCheck },
  { action: 'no-treatment', Icon: CircleOff },
  { action: 'patient-declined', Icon: UserRoundX },
  { action: 'clinic-declined', Icon: ShieldX },
  { action: 'discard', Icon: ArchiveX },
]

export function FindingActionsMenu({
  finding, onEdit, onAction,
}: {
  finding: Finding
  onEdit: () => void
  onAction: (action: Exclude<FindingAction, 'edit'>) => void
}) {
  /* El tratamiento sólo puede arrancar sobre algo todavía abierto. */
  const puedeTratar = finding.status === 'Active' || finding.status === 'Monitoring'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" aria-label={`Actions for ${finding.area}`} className="flex size-7 items-center justify-center rounded-md text-[#71717a] hover:bg-[#f4f4f5]">
          <MoreVertical className="size-3.5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[248px]">
        <p className="px-2 py-1.5 text-sm font-bold text-[#09090b]">Actions</p>
        <DropdownMenuItem onSelect={onEdit}>
          <Pencil className="size-4" /> Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {FILAS.map(({ action, Icon }) => {
          const copy = ACTIONS[action]
          const disabled = action === 'treat' && !puedeTratar
          return (
            <DropdownMenuItem
              key={action} disabled={disabled}
              className={copy.destructive ? 'text-[#dc2626] focus:bg-[#fef2f2] focus:text-[#dc2626]' : undefined}
              onSelect={() => onAction(action)}
            >
              <Icon className="size-4" /> {copy.label}
            </DropdownMenuItem>
          )
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-[#dc2626] focus:bg-[#fef2f2] focus:text-[#dc2626]" onSelect={() => onAction('delete')}>
          <Trash2 className="size-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
