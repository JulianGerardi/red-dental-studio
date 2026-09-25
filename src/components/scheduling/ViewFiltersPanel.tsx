import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'

/* Figma 3856:208346 "View Filters Panel". */

type Row = { id: string; label: string; sub?: string; kind?: 'avatar' | 'room' }

const STATUS: Row[] = [
  { id: 'all-status', label: 'Select all Status' },
  { id: 'proposed', label: 'Proposed' },
  { id: 'checkin', label: 'Check In' },
  { id: 'cancelled', label: 'Cancelled' },
]
const PROVIDERS: Row[] = [
  { id: 'all-prov', label: 'Select all Providers' },
  { id: 'martinez', label: "Dr. Martinez's", sub: 'General Dentist', kind: 'avatar' },
  { id: 'okonkwo', label: 'Dr. Emily Okonkwo', sub: 'Pediatric Specialist', kind: 'avatar' },
  { id: 'torres', label: 'Dr. Michael Torres', sub: 'Oral Surgeon', kind: 'avatar' },
]
/* Los subtítulos de las salas repiten las especialidades de los providers.
   Es del Figma y se deja tal cual. */
const ROOMS: Row[] = [
  { id: 'all-rooms', label: 'Select all Rooms' },
  { id: 'op1', label: 'Operatory 1', sub: 'General Dentist', kind: 'room' },
  { id: 'op2', label: 'Operatory 2', sub: 'Pediatric Specialist', kind: 'room' },
  { id: 'op3', label: 'Operatory 3', sub: 'Oral Surgeon', kind: 'room' },
]

export function Group({
  rows,
  value,
  onChange,
}: {
  rows: Row[]
  value: string
  onChange: (id: string) => void
}) {
  return (
    <div className="flex flex-col gap-1">
      {rows.map((r) => {
        const on = value === r.id
        return (
          <button
            key={r.id}
            type="button"
            onClick={() => onChange(r.id)}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-left transition-colors',
              on ? 'bg-[#eef2ff]' : 'hover:bg-surface-subtle',
            )}
          >
            <span
              className={cn(
                'flex size-4 shrink-0 items-center justify-center rounded-full border-2',
                on ? 'border-dash-blue' : 'border-ink-faint',
              )}
            >
              {on && <span className="bg-dash-blue size-2 rounded-full" />}
            </span>
            {r.kind === 'avatar' && (
              <span className="bg-dash-count-bg text-dash-blue-hover flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold">
                {r.label.replace('Dr. ', '').split(' ').map((w) => w[0]).slice(0, 2).join('')}
              </span>
            )}
            {r.kind === 'room' && <span className="bg-dash-blue size-7 shrink-0 rounded-full" />}
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-semibold text-ink">{r.label}</span>
              {r.sub && <span className="block truncate text-[11px] text-ink-faint">{r.sub}</span>}
            </span>
          </button>
        )
      })}
    </div>
  )
}

/* Se despliega debajo del botón View, no como modal centrado. */
export function ViewFiltersPanel({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState('proposed')
  const [prov, setProv] = useState('martinez')
  const [room, setRoom] = useState('op1')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node
      if (ref.current && !ref.current.contains(t) && !(t as HTMLElement).closest?.('[data-view-trigger]')) {
        onClose()
      }
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
      <div
        ref={ref}
        role="dialog"
        aria-label="View"
        /* En angosto los 360 fijos se salían de pantalla: ahí el panel se
           ancla a los bordes del viewport en vez de al botón. */
        className={cn(
          'motion-safe:animate-[loc-in_150ms_ease-out] z-50 overflow-y-auto rounded-xl border border-line bg-white p-5 shadow-[0_8px_28px_rgb(0_0_0/0.18)] sm:p-6',
          'fixed inset-x-3 top-[76px] max-h-[calc(100svh-96px)]',
          'sm:absolute sm:inset-x-auto sm:top-[calc(100%+6px)] sm:right-0 sm:max-h-[70vh] sm:w-[360px]',
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-[22px] leading-none font-bold text-ink">View</h2>
            <p className="mt-1 text-[11px] text-ink-faint">Customize the schedule you want to see</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-ink hover:opacity-60">
            <X className="size-5" />
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-5">
          <Group rows={STATUS} value={status} onChange={setStatus} />
          <Group rows={PROVIDERS} value={prov} onChange={setProv} />
          <Group rows={ROOMS} value={room} onChange={setRoom} />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="h-9 rounded-md border border-line bg-white px-6 text-[13px] font-medium hover:bg-surface-subtle"
          >
            Cancel
          </button>
          <button
            onClick={() => { aviso.ok('Calendar view updated.'); onClose() }}
            className="bg-dash-blue hover:bg-dash-blue-hover h-9 rounded-md px-6 text-[13px] font-medium text-white"
          >
            Save
          </button>
        </div>
      </div>
  )
}
