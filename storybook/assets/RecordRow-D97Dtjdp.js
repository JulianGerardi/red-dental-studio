import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { FileText, Trash2, MoreVertical, ListFilter, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { RecordStatus } from '@/data/mock'

/* Lab Order, Prescription y Referral comparten esta fila en el original:
   borde azul a la izquierda, avatar + provider, un slot central variable,
   badge de estado, tres fechas y tres acciones. */

const STATUS: Record<RecordStatus, string> = {
  Pending: 'bg-amber-100 text-amber-700',
  Requested: 'bg-blue-100 text-blue-700',
  Delivered: 'bg-green-100 text-green-700',
  Active: 'bg-green-100 text-green-700',
  Completed: 'bg-green-100 text-green-700',
  Expired: 'bg-red-100 text-red-600',
  Cancelled: 'bg-red-100 text-red-600',
}

export function RecordRow({
  provider, providerRole, status, created, updated, expires, children,
}: {
  provider: string
  providerRole?: string
  status: RecordStatus
  created: string
  updated: string
  expires: string
  children?: React.ReactNode
}) {
  const initials = provider.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
  return (
    <div className="border-l-primary flex items-center gap-6 rounded-lg border border-l-4 bg-background px-4 py-3 shadow-sm">
      <div className="flex w-[190px] shrink-0 items-center gap-3">
        <span className="bg-primary text-primary-foreground flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-medium">
          {initials}
        </span>
        <span className="min-w-0 leading-tight">
          <span className="block truncate text-sm font-medium">{provider}</span>
          {providerRole && <span className="text-muted-foreground block text-xs">{providerRole}</span>}
        </span>
      </div>

      <div className="w-[230px] shrink-0 border-l pl-6">{children}</div>

      <span className={cn('rounded-full px-3 py-1 text-xs font-medium', STATUS[status])}>
        {status}
      </span>

      <div className="ml-auto flex shrink-0 gap-6 text-center text-xs">
        <span><span className="text-muted-foreground block">Created</span><span className="text-primary font-medium">{created}</span></span>
        <span><span className="text-muted-foreground block">Last Updated</span><span className="text-primary font-medium">{updated}</span></span>
        <span><span className="text-muted-foreground block">Expiration date</span><span className="text-destructive font-medium">{expires}</span></span>
      </div>

      <div className="text-muted-foreground flex shrink-0 gap-2">
        <button aria-label="Document"><FileText className="size-4" /></button>
        <button aria-label="Delete"><Trash2 className="size-4" /></button>
        <button aria-label="More"><MoreVertical className="size-4" /></button>
      </div>
    </div>
  )
}

export function RecordToolbar({ newLabel }: { newLabel: string }) {
  return (
    <div className="mb-4 flex justify-end gap-3">
      <button className="flex h-9 items-center gap-2 rounded-md border bg-background px-4 text-sm font-medium shadow-sm">
        <ListFilter className="size-4" /> Filters
      </button>
      {/* En el original este botón viene deshabilitado */}
      <button
        disabled
        className="bg-primary-disabled text-primary-disabled-foreground flex h-9 cursor-not-allowed items-center gap-2 rounded-md px-4 text-sm font-medium"
      >
        <Plus className="size-4" /> {newLabel}
      </button>
    </div>
  )
}

export function RecordPagination({ total }: { total: number }) {
  return (
    <div className="mt-4 flex items-center gap-3 rounded-lg border bg-background px-5 py-4 text-sm shadow-sm">
      <span className="text-muted-foreground">Showing 1 to 7 of {total} results</span>
      {/* El original rotula este selector "Mostrar:". Corregido. */}
      <label className="flex items-center gap-2">Show:
        <select className="border-input h-9 rounded-md border px-2"><option>10</option><option>20</option></select>
      </label>
      <div className="text-muted-foreground ml-auto flex items-center gap-2">
        <button>Previous</button>
        <span className="bg-primary text-primary-foreground size-8 rounded-md text-center leading-8 font-medium">1</span>
        <button>2</button><span>…</span><button>Next</button>
      </div>
    </div>
  )
}
`})))()}export{n,i as r,r as t};