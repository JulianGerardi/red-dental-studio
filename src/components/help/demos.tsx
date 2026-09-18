import { Plus, Search, ListFilter, ChevronDown, Link2, LayoutGrid, ClipboardList, FileCheck2 } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

/* Demos de Help: piezas chicas y esquemáticas -un puntero, algunos bloques,
   un panel- para reconocer la interacción sin redibujar la pantalla entera.
   Todas en loop de 4s, ver design-reference/figma/modulos/help.md. */

function Stage({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative h-[150px] w-full overflow-hidden rounded-xl border border-[#e4e4e7] bg-[#fafbfe] ${className}`}>
      {children}
    </div>
  )
}

function Panel({ title, children, className = '' }: { title?: string; children?: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-[#e4e4e7] bg-white p-2.5 shadow-sm ${className}`}>
      {title && <p className="text-[10px] font-bold text-[#09090b]">{title}</p>}
      {children}
    </div>
  )
}

function Pointer({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 12 16" className="absolute z-20 size-4 drop-shadow-sm" style={style}>
      <path d="M1 1l9.5 8.2-4.2.5 2.4 4.6-1.9 1-2.4-4.6-2.6 3z" fill="#18181b" stroke="#fff" strokeWidth="1" />
    </svg>
  )
}

export function DateDrivesPanelsDemo() {
  const filas = [{ n: 'Elena Ruiz', i: 'ER' }, { n: 'Maria Viola', i: 'MV' }]
  return (
    <Stage className="p-3">
      <span
        className="flex w-fit items-center gap-1.5 rounded-lg border border-[#e4e4e7] bg-white px-2 py-1 text-[10px] font-semibold text-[#09090b] shadow-sm"
        style={{ animation: 'tour-pulse 4s ease-in-out infinite' }}
      >
        28-02-2026 <ChevronDown className="size-2.5" />
      </span>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <Panel title="Appointments">
          <div className="mt-1.5 space-y-1.5">
            {filas.map((f, i) => (
              <div key={f.n} className="flex items-center gap-1.5" style={{ animation: `tour-card-in 4s ${0.3 + i * 0.2}s ease-out infinite` }}>
                <Avatar className="size-4"><AvatarFallback className="bg-dash-count-bg text-dash-blue-hover text-[7px]">{f.i}</AvatarFallback></Avatar>
                <span className="truncate text-[9px] font-semibold text-[#09090b]">{f.n}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Waiting Room">
          <div className="mt-1.5 space-y-1.5">
            {filas.map((f, i) => (
              <div key={f.n} className="flex items-center gap-1.5" style={{ animation: `tour-card-in 4s ${0.45 + i * 0.2}s ease-out infinite` }}>
                <Badge variant="active" className="h-4 px-1.5 text-[8px]">Check In</Badge>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </Stage>
  )
}

export function RoomFilterDemo() {
  const filas = [{ n: 'Operatory 1', estado: 'Busy', tono: 'bg-[#fffaf0] text-[#99660d]' }, { n: 'Operatory 2', estado: 'Available', tono: 'bg-[#f0fcf5] text-[#1a804d]' }]
  return (
    <Stage className="p-3">
      <Panel>
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold text-[#09090b]">Rooms</p>
          <span className="flex size-5 items-center justify-center rounded-md text-[#71717a]" style={{ animation: 'tour-pulse 3s ease-in-out infinite' }}>
            <ListFilter className="size-3" />
          </span>
        </div>
        <div className="mt-2 space-y-1.5">
          {filas.map((r, i) => (
            <div key={r.n} className="flex items-center justify-between rounded-md border border-[#e4e4e7] px-2 py-1" style={{ animation: `tour-card-in 4s ${i * 0.25}s ease-out infinite` }}>
              <span className="text-[9px] font-semibold text-[#09090b]">{r.n}</span>
              <span className={`rounded-full px-1.5 py-0.5 text-[8px] font-semibold ${r.tono}`}>{r.estado}</span>
            </div>
          ))}
        </div>
      </Panel>
    </Stage>
  )
}

export function ReschedulePopoverDemo() {
  return (
    <Stage className="p-3">
      <Panel title="10:00 AM · Noah Smith" className="w-[150px]" />
      <div
        className="absolute top-[70px] left-6 w-[160px] rounded-lg border border-[#e4e4e7] bg-white p-2 shadow-md"
        style={{ animation: 'tour-card-in 4s .6s ease-out infinite' }}
      >
        <p className="text-[9px] font-semibold text-[#09090b]">Reschedule</p>
        <p className="mt-1 text-[8px] text-[#71717a]">Pick a new date and time without leaving the dashboard.</p>
      </div>
    </Stage>
  )
}

export function AddPatientDemo() {
  return (
    <Stage className="flex flex-col items-center justify-center gap-2 p-3">
      <span
        className="bg-dash-blue flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[10px] font-medium text-white"
        style={{ animation: 'tour-pulse 4s ease-in-out infinite' }}
      >
        <Plus className="size-3" /> New Patient
      </span>
      <div className="w-[150px] space-y-1.5 overflow-hidden" style={{ animation: 'tour-expand 4s ease-in-out infinite' }}>
        <div className="h-5 rounded-md border border-[#e4e4e7] bg-white px-1.5 text-[8px] leading-5 text-[#a1a1aa]">First name</div>
        <div className="h-5 rounded-md border border-[#e4e4e7] bg-white px-1.5 text-[8px] leading-5 text-[#a1a1aa]">Last name</div>
      </div>
    </Stage>
  )
}

export function PatientSearchDemo() {
  const filas = ['Noah Smith', 'Maria Viola']
  return (
    <Stage className="p-3">
      <div className="relative flex h-7 items-center rounded-md border border-[#e4e4e7] bg-white px-2 text-[10px] text-[#09090b]" style={{ animation: 'tour-pulse 4s ease-in-out infinite' }}>
        <Search className="mr-1.5 size-3 text-[#a1a1aa]" /> Noa
      </div>
      <div className="mt-2 space-y-1.5">
        {filas.map((f, i) => (
          <div key={f} className="rounded-md border border-[#e4e4e7] bg-white px-2 py-1 text-[9px] font-medium text-[#09090b]" style={{ animation: `tour-card-in 4s ${0.4 + i * 0.2}s ease-out infinite` }}>
            {f}
          </div>
        ))}
      </div>
    </Stage>
  )
}

const TABS = ['Treatments', 'Documents', 'Insurance', 'Ledger', 'Relationships']
export function PatientTabsDemo({ activa = 'Treatments' }: { activa?: string }) {
  return (
    <Stage className="p-3">
      <div className="flex flex-wrap gap-1">
        {TABS.map((t) => (
          <span
            key={t}
            className={`rounded-md px-1.5 py-1 text-[8px] font-medium whitespace-nowrap ${t === activa ? 'bg-dash-blue text-white' : 'bg-[#f1f5f9] text-[#64748b]'}`}
            style={t === activa ? { animation: 'tour-pulse 4s ease-in-out infinite' } : undefined}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-2 space-y-1.5 overflow-hidden" style={{ animation: 'tour-card-in 4s .3s ease-out infinite' }}>
        <div className="h-2 w-full rounded-full bg-[#e4e4e7]" />
        <div className="h-2 w-3/4 rounded-full bg-[#e4e4e7]" />
      </div>
    </Stage>
  )
}

export function AddRelationshipDemo() {
  return (
    <Stage className="flex items-center justify-center gap-3 p-3">
      <Avatar className="size-9"><AvatarFallback className="bg-dash-count-bg text-dash-blue-hover text-[11px]">JS</AvatarFallback></Avatar>
      <Link2 className="size-4 shrink-0 text-[#a1a1aa]" style={{ animation: 'tour-pulse 4s ease-in-out infinite' }} />
      <Avatar className="size-9" style={{ animation: 'tour-block-appear 4s ease-out infinite' }}>
        <AvatarFallback className="bg-dash-count-bg text-dash-blue-hover text-[11px]">EV</AvatarFallback>
      </Avatar>
    </Stage>
  )
}

export function CalendarOverviewDemo() {
  return (
    <Stage>
      <div className="absolute inset-0 flex bg-white">
        <div className="w-8 shrink-0 pt-1">
          {['08', '09', '10', '11'].map((h) => <div key={h} className="h-9 pr-1.5 text-right text-[8px] text-[#a1a1aa]">{h}</div>)}
        </div>
        {[0, 1, 2].map((c) => (
          <div key={c} className="relative flex-1 border-l border-[#e4e4e7]">
            {[0, 1, 2, 3].map((i) => <div key={i} className="h-9 border-b border-[#e4e4e7]" />)}
            {c === 1 && (
              <div className="absolute inset-x-1 top-[9px] rounded-r-[3px] border-l-[3px] border-l-dash-blue bg-[#e8eef8] px-1 py-0.5" style={{ animation: 'tour-card-in 4s .3s ease-out infinite' }}>
                <span className="block text-[8px] font-medium text-dash-blue">09:00 AM</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </Stage>
  )
}

export function NewApptButtonDemo() {
  return (
    <Stage className="p-3">
      <span
        className="bg-dash-blue flex w-fit items-center gap-1.5 rounded-md px-3 py-1.5 text-[10px] font-medium text-white"
        style={{ animation: 'tour-pulse 4s ease-in-out infinite' }}
      >
        <Plus className="size-3" /> New appointment
      </span>
      <div className="mt-3 h-9 w-[130px] overflow-hidden rounded-r-[3px] border-l-[3px] border-l-dash-blue bg-[#e8eef8] px-1.5 py-1 origin-top" style={{ animation: 'tour-block-appear 4s ease-out infinite' }}>
        <span className="block text-[9px] font-medium text-dash-blue">10:00 AM</span>
        <span className="block truncate text-[9px] text-[#09090b]">Sofia Marin</span>
      </div>
    </Stage>
  )
}

export function ClinicalTakeoverDemo() {
  return (
    <Stage>
      <div className="absolute inset-0 flex">
        <div className="shrink-0 space-y-1.5 overflow-hidden bg-[#0b1220] p-2" style={{ animation: 'tour-rail-collapse 4s ease-in-out infinite' }}>
          {[0, 1, 2].map((i) => <div key={i} className="h-2 w-24 rounded-full bg-white/15" />)}
        </div>
        <div className="flex flex-1 items-center justify-center bg-white">
          <LayoutGrid className="size-6 text-[#a1a1aa]" style={{ animation: 'tour-card-in 4s .5s ease-out infinite' }} />
        </div>
      </div>
    </Stage>
  )
}

export function ClinicalSectionsDemo() {
  return (
    <Stage className="flex flex-col justify-center gap-2 p-3">
      <div className="flex items-center gap-2 rounded-lg border border-[#e4e4e7] bg-white p-2" style={{ animation: 'tour-card-in 4s .2s ease-out infinite' }}>
        <ClipboardList className="size-3.5 shrink-0 text-dash-blue" />
        <span className="text-[10px] font-semibold text-[#09090b]">Treatment Plan</span>
      </div>
      <div className="flex items-center gap-2 rounded-lg border border-[#e4e4e7] bg-white p-2" style={{ animation: 'tour-card-in 4s .4s ease-out infinite' }}>
        <FileCheck2 className="size-3.5 shrink-0 text-dash-blue" />
        <span className="text-[10px] font-semibold text-[#09090b]">Consent</span>
      </div>
    </Stage>
  )
}

export function NewLocationDemo() {
  return (
    <Stage className="flex flex-col items-center justify-center gap-2 p-3">
      <span className="bg-dash-blue flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[10px] font-medium text-white" style={{ animation: 'tour-pulse 4s ease-in-out infinite' }}>
        <Plus className="size-3" /> New Location
      </span>
      <div className="flex w-[170px] items-center justify-between rounded-md border border-[#e4e4e7] bg-white px-2 py-1.5" style={{ animation: 'tour-card-in 4s .5s ease-out infinite' }}>
        <span className="text-[9px] font-semibold text-dash-blue">Downtown Clinic</span>
        <span className="text-[8px] text-[#71717a]">0 staff</span>
      </div>
    </Stage>
  )
}

export function TeamListDemo() {
  const filas = [{ n: 'Elena Martinez', c: 'EM' }, { n: 'Emily Chen', c: 'EC' }]
  return (
    <Stage className="p-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold text-[#09090b]">Employees</p>
        <span className="bg-dash-blue flex items-center gap-1 rounded-md px-2 py-1 text-[8px] font-medium text-white" style={{ animation: 'tour-pulse 4s ease-in-out infinite' }}>
          <Plus className="size-2.5" /> New
        </span>
      </div>
      <div className="mt-2 space-y-1.5">
        {filas.map((f, i) => (
          <div key={f.n} className="flex items-center gap-1.5" style={{ animation: `tour-card-in 4s ${0.4 + i * 0.2}s ease-out infinite` }}>
            <Avatar className="size-5"><AvatarFallback className="bg-dash-count-bg text-dash-blue-hover text-[8px]">{f.c}</AvatarFallback></Avatar>
            <span className="text-[9px] font-medium text-[#09090b]">{f.n}</span>
          </div>
        ))}
      </div>
    </Stage>
  )
}

export function SettingsMenuDemo({ resaltarComingSoon = false }: { resaltarComingSoon?: boolean }) {
  const items = ['General', 'Locations', 'Employees', 'Finance']
  return (
    <Stage className="p-2.5">
      <div className="w-[140px] rounded-lg border border-[#e4e4e7] bg-white p-1">
        {items.map((it, i) => (
          <div
            key={it}
            className="flex items-center justify-between rounded-md px-2 py-1.5 text-[9px] font-medium text-[#09090b]"
            style={i === 3 && resaltarComingSoon ? { animation: 'tour-pulse 4s ease-in-out infinite' } : undefined}
          >
            {it}
            {i === 3 && resaltarComingSoon && (
              <span className="rounded-full bg-[#f4f4f5] px-1.5 py-px text-[7px] font-semibold text-[#71717a]">Coming soon</span>
            )}
          </div>
        ))}
      </div>
      <Pointer style={{ animation: 'tour-tap-move 4s ease-in-out infinite', left: 4, top: 4 }} />
    </Stage>
  )
}
