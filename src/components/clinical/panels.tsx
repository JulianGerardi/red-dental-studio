import { useState } from 'react'
import {
  Search, User, Calendar, LayoutGrid, ChevronDown, ChevronRight,
  MoreVertical, CircleAlert, Inbox, Square,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { RecordRow, RecordToolbar, RecordPagination } from './RecordRow'
import {
  LAB_ORDERS, PRESCRIPTIONS, REFERRALS,
  PLAN_CASES, PLAN_PROCEDURES,
} from '@/data/mock'

/* ── Treatment Plan ──────────────────────────────────────────────── */

export function TreatmentPlanPanel() {
  const [openCase, setOpenCase] = useState(0)

  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      <div className="bg-background w-full rounded-xl border p-0 shadow-sm lg:w-[300px] lg:shrink-0">
        <div className="bg-primary text-primary-foreground flex items-center gap-2 rounded-t-xl px-4 py-3 text-sm font-medium">
          <Inbox className="size-4" /> Unassigned items
        </div>
        <div className="p-4">
          {PLAN_CASES.map((c, i) => (
            <div key={i} className="border-b py-3 last:border-0">
              <button
                onClick={() => setOpenCase((o) => (o === i ? -1 : i))}
                className="flex w-full items-center gap-2 text-left"
              >
                <span className="text-sm font-medium">{c.date}</span>
                <span
                  className={cn(
                    'ml-auto rounded-full px-2 py-0.5 text-[11px] font-semibold tracking-wide',
                    c.status === 'PLANNING'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-muted text-muted-foreground',
                  )}
                >
                  {c.status}
                </span>
                {c.status === 'PLANNING'
                  ? <ChevronDown className="text-muted-foreground size-4 shrink-0" />
                  : <ChevronRight className="text-muted-foreground size-4 shrink-0" />}
              </button>
              {openCase === i && c.items.map((it) => (
                <div key={it.name} className="mt-3 flex items-center gap-2 pl-4">
                  <span className="flex size-6 items-center justify-center rounded bg-orange-500 text-white">
                    <Square className="size-3 fill-current" />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-sm font-medium">{it.name}</span>
                    <span className="text-muted-foreground block text-xs">Update: {it.updated}</span>
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="min-w-0 flex-1 rounded-xl border bg-background shadow-sm">
        <div className="flex flex-wrap items-center gap-3 p-5">
          <h2 className="text-[15px] font-bold text-ink">Unassigned</h2>
          <div className="flex w-full flex-wrap gap-3 sm:ml-auto sm:w-auto">
            {['New treatment group', 'New alternative case', 'Move to'].map((l) => (
              <button key={l} disabled
                className="bg-primary-disabled text-primary-disabled-foreground h-9 cursor-not-allowed rounded-md px-4 text-sm font-medium">
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 border-b px-5 pb-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            { icon: Search, label: 'Search procedure', ph: 'Code or description...' },
            { icon: User, label: 'Providers', ph: 'Select providers...' },
            { icon: Calendar, label: 'Creation date', ph: 'Pick a date range' },
            { icon: LayoutGrid, label: 'Anatomical areas', ph: 'Select areas...' },
          ].map(({ icon: Icon, label, ph }) => (
            <div key={label}>
              <p className="text-muted-foreground mb-1 flex items-center gap-2 text-sm">
                <Icon className="size-4" /> {label}
              </p>
              <input placeholder={ph} className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm shadow-sm" />
            </div>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="text-muted-foreground border-b">
                <th className="px-4 py-3"><input type="checkbox" aria-label="Select all" /></th>
                {['Date', 'Location', 'Tooth', 'Surface', 'Procedure', 'Provider', 'Amount', 'Status', ''].map((h, i) => (
                  <th key={i} className="px-4 py-3 text-left font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PLAN_PROCEDURES.map((p, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="px-4 py-4"><input type="checkbox" aria-label={`Select row ${i + 1}`} /></td>
                  <td className="px-4 py-4 whitespace-nowrap">{p.date}</td>
                  <td className="px-4 py-4">{p.location || ''}</td>
                  <td className="px-4 py-4">
                    <span className="bg-muted inline-block min-w-9 rounded px-2 py-1 text-center text-xs font-medium">{p.tooth}</span>
                  </td>
                  <td className="px-4 py-4">{p.surface}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{p.code} - {p.procedure}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{p.provider}</td>
                  <td className="px-4 py-4">{p.amount}</td>
                  <td className="px-4 py-4">
                    <span className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs font-medium">{p.status}</span>
                  </td>
                  <td className="px-4 py-4"><MoreVertical className="text-muted-foreground size-4" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ── Treatment (gate) ────────────────────────────────────────────── */

export function TreatmentPanel() {
  return (
    <div className="relative min-h-[560px] overflow-hidden rounded-xl border bg-background shadow-sm">
      {/* Layout de fondo, difuminado igual que en el original */}
      <div className="pointer-events-none grid select-none gap-5 p-6 opacity-30 blur-[3px] xl:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <div className="bg-muted h-6 w-64 rounded" />
          <div className="bg-muted h-4 w-full rounded" />
          <div className="bg-muted/60 h-64 rounded-lg" />
        </div>
        <div className="space-y-4">
          {['Procedures', 'Diagnosis', 'Clinical notes'].map((s) => (
            <div key={s} className="rounded-lg border p-4">
              <div className="bg-muted mb-3 h-4 w-32 rounded" />
              <div className="bg-muted/60 h-12 rounded" />
              <div className="bg-muted/60 mt-2 h-12 rounded" />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[410px] rounded-xl border bg-background p-8 text-center shadow-lg">
          <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-red-50">
            <CircleAlert className="text-destructive size-6" />
          </span>
          <h3 className="mt-4 text-lg font-semibold">No active encounter found</h3>
          <p className="text-muted-foreground mt-2 text-sm">
            You cannot proceed without an active encounter. Please ensure the patient has an
            open encounter and try again.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── Lab Order · Prescription · Referral ─────────────────────────── */

export function LabOrderPanel() {
  return (
    <div>
      <RecordToolbar newLabel="New lab order" />
      <div className="space-y-3">
        {LAB_ORDERS.map((o, i) => (
          <RecordRow key={i} provider={o.provider} status={o.status}
            created={o.created} updated={o.updated} expires={o.expires}>
            <span className="text-sm font-medium">{o.subject}</span>
          </RecordRow>
        ))}
      </div>
      <RecordPagination total={14} />
    </div>
  )
}

export function PrescriptionPanel() {
  return (
    <div>
      <RecordToolbar newLabel="New prescription" />
      <div className="space-y-3">
        {PRESCRIPTIONS.map((p, i) => (
          <RecordRow key={i} provider={p.provider} status={p.status}
            created={p.created} updated={p.updated} expires={p.expires}>
            <span className="bg-accent text-primary rounded-full px-3 py-1 text-sm font-medium">{p.drug}</span>
          </RecordRow>
        ))}
      </div>
      <RecordPagination total={20} />
    </div>
  )
}

export function ReferralPanel() {
  return (
    <div>
      <RecordToolbar newLabel="New referral" />
      <div className="space-y-3">
        {REFERRALS.map((r, i) => (
          <RecordRow key={i} provider={r.provider} providerRole="Referring provider" status={r.status}
            created={r.created} updated={r.updated} expires={r.expires}>
            <span className="leading-tight">
              <span className="block text-sm">
                <span className="font-semibold">{r.referred}</span>
                <span className="text-muted-foreground"> | {r.specialty}</span>
              </span>
              <span className="text-muted-foreground block text-xs">Referred provider</span>
            </span>
          </RecordRow>
        ))}
      </div>
      <RecordPagination total={14} />
    </div>
  )
}
