import { useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { OptionCheckbox } from '@/components/patients/form'

/* Figma 3862:230569 "Link Treatment Plan Modal": es un drawer anclado a la
   derecha, a toda la altura, no un modal centrado. */

const PLANS = [
  { id: 'p1', date: '21 August 2025', doctor: 'Dr. Emily Chen', therapy: 'Comprehensive Implant Therapy' },
  { id: 'p2', date: '21 August 2025', doctor: 'Dr. Emily Chen', therapy: 'Comprehensive Implant Therapy' },
]
const VISITS = [
  { id: 'v1', name: 'Plan 1', total: '$1,270.00' },
  { id: 'v2', name: 'Plan 1', total: '$1,270.00' },
]
const PROCEDURES = Array(4).fill('D0120 - Periodic oral evaluation')

export function LinkTreatmentPlanDrawer({ onClose }: { onClose: () => void }) {
  const [plan, setPlan] = useState('p1')
  const [visit, setVisit] = useState('v1')

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30" onClick={onClose}>
      <div
        role="dialog"
        aria-label="Link to treatment plan visit"
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-[480px] max-w-full flex-col overflow-y-auto bg-white p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-xl font-bold text-[#09090b]">Link to treatment plan visit</h2>
          <button onClick={onClose} aria-label="Close" className="text-[#09090b] hover:opacity-60">
            <X className="size-5" />
          </button>
        </div>

        <p className="mt-5 text-[13px] font-semibold text-[#09090b]">Treatment plan</p>
        <div className="mt-2 flex flex-col gap-3">
          {PLANS.map((p) => {
            const on = plan === p.id
            return (
              <button
                key={p.id}
                onClick={() => setPlan(p.id)}
                className={cn(
                  'rounded-lg border p-3 text-left transition-colors',
                  on ? 'border-dash-blue' : 'border-transparent hover:bg-[#fafafa]',
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full border border-[#1a804d] bg-white px-2 py-[2px] text-[10px] font-semibold text-[#1a804d]">
                    Check In
                  </span>
                  <span className="text-[13px] font-bold text-[#09090b]">{p.date}</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className={cn('flex size-4 shrink-0 items-center justify-center rounded-full border-2',
                    on ? 'border-dash-blue' : 'border-[#a1a1aa]')}>
                    {on && <span className="bg-dash-blue size-2 rounded-full" />}
                  </span>
                  <span className="text-[13px] font-bold text-[#09090b]">{p.doctor}</span>
                  <span className="text-[#e4e4e7]">|</span>
                  <span className="text-[12px] text-[#71717a]">{p.therapy}</span>
                </div>
                <p className="text-dash-blue mt-1.5 text-[12px] font-medium">2 Visits • 3 Procedures</p>
              </button>
            )
          })}
        </div>

        <p className="mt-6 text-[13px] font-semibold text-[#09090b]">Visit</p>
        <div className="mt-2 flex flex-col gap-3">
          {VISITS.map((v) => {
            const on = visit === v.id
            return (
              <button
                key={v.id}
                onClick={() => setVisit(v.id)}
                className={cn(
                  'rounded-lg border p-3 text-left transition-colors',
                  on ? 'border-dash-blue' : 'border-transparent hover:bg-[#fafafa]',
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[13px] font-bold text-[#09090b]">{v.name}</span>
                  <span className="text-[12px] font-semibold text-[#71717a]">
                    Total : <span className={on ? 'text-dash-blue' : 'text-[#a1a1aa]'}>{v.total}</span>
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {PROCEDURES.map((p, i) => (
                    <span
                      key={i}
                      className={cn(
                        'rounded-full border px-2 py-[3px] text-[10px]',
                        on ? 'border-dash-blue text-dash-blue' : 'border-[#e4e4e7] text-[#a1a1aa]',
                      )}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </button>
            )
          })}
        </div>

        <p className="mt-6 text-[13px] font-semibold text-[#71717a]">Additional</p>
        <div className="mt-2 flex flex-col gap-3">
          <OptionCheckbox label="ASAP" />
          <OptionCheckbox label="Follow-up" />
          <OptionCheckbox label="Premedicate" />
        </div>

        <div className="mt-6 flex justify-end gap-3 pb-2">
          <button
            onClick={onClose}
            className="h-9 rounded-md border border-[#e4e4e7] bg-white px-6 text-[13px] font-medium hover:bg-[#fafafa]"
          >
            Cancel
          </button>
          <button
            onClick={() => { aviso.ok('Treatment plan visit linked.'); onClose() }}
            className="bg-dash-blue hover:bg-dash-blue-hover h-9 rounded-md px-6 text-[13px] font-medium text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
