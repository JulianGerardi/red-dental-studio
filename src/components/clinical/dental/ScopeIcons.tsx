import { Grid2x2, LayoutGrid } from 'lucide-react'
import { ToothIcon } from './ToothIcon'
import type { ProcedureScope } from './data'

function ArchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" aria-hidden className={className}>
      <path d="M4 19V12a8 8 0 0 1 16 0v7" />
    </svg>
  )
}

export function ScopeIcon({ scope, className }: { scope: ProcedureScope; className?: string }) {
  if (scope === 'Tooth') return <ToothIcon className={className} />
  if (scope === 'Surface') return <Grid2x2 className={className} />
  if (scope === 'Quadrant') return <LayoutGrid className={className} />
  return <ArchIcon className={className} />
}
