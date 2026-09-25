import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, Calendar, DollarSign, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PageTitle } from '@/components/ui/page-title'
import { PatientSidePanel } from '@/components/patients/PatientSidePanel'
import { CONTENEDOR_PAGINA } from '@/lib/estilos'

/* Figma 3768:803852 (poblado) y 3769:808875 (vacío).
   Sección "Patient Profile — Treatment Plan & Documents". */

type Estado = 'Completed' | 'Expired'

type Plan = {
  patient: string
  initials: string
  code: string
  name: string
  progress: number
  note: string
  estado: Estado
  createdOn: string
  total: string
}

const BADGE: Record<Estado, string> = {
  Completed: 'border-dash-ok-fg bg-dash-ok-bg text-dash-ok-fg',
  Expired: 'border-dash-bad-fg bg-dash-bad-bg text-dash-bad-fg',
}

const base = {
  patient: 'Sarah Mitchell', initials: 'SM',
  code: 'TO01 - Acute / Emergency', name: 'Root Canal Treatment',
  createdOn: 'Jun 3, 2026', total: '$1,850.00',
}
const PLANS: Plan[] = [
  { ...base, progress: 100, note: 'Overall completion: 100%', estado: 'Completed' },
  { ...base, progress: 100, note: 'Overall completion: 100%', estado: 'Completed' },
  { ...base, progress: 100, note: 'Overall completion: 100%', estado: 'Completed' },
  { ...base, progress: 100, note: 'Overall completion: 100%', estado: 'Completed' },
  /* El badge dice "Expired" pero la nota dice "Cancelled". Es del Figma. */
  { ...base, progress: 100, note: 'Cancelled', estado: 'Expired' },
  { ...base, progress: 100, note: 'Overall completion: 100%', estado: 'Completed' },
  { ...base, progress: 100, note: 'Overall completion: 100%', estado: 'Completed' },
  { ...base, progress: 100, note: 'Overall completion: 100%', estado: 'Completed' },
]

function TreatmentCard({ plan }: { plan: Plan }) {
  const rojo = plan.estado === 'Expired'
  return (
    <article className="overflow-hidden rounded-lg border border-line bg-white">
      <header className="flex items-center gap-3 px-4 py-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#eff4ff] text-xs font-semibold text-[#0056ef]">
          {plan.initials}
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate text-[13px] font-bold text-ink">{plan.patient}</span>
          <span className="block text-[11px] text-ink-muted">Patient</span>
        </span>
        <span className={cn('shrink-0 rounded-full border px-2.5 py-[2px] text-[11px] font-semibold', BADGE[plan.estado])}>
          {plan.estado}
        </span>
      </header>

      <div className="bg-surface-subtle px-4 py-3">
        <p className="text-[11px] font-medium text-ink-muted">{plan.code}</p>
        <button className="mt-1 text-[13px] font-bold text-[#0056ef] hover:underline">
          {plan.name}
        </button>
        <div className="mt-2.5 h-[3px] w-full rounded-full bg-line">
          <div
            className="h-full rounded-full"
            style={{ width: `${plan.progress}%`, backgroundColor: rojo ? '#ef4444' : '#28c563' }}
          />
        </div>
        <p className="mt-1.5 text-[11px] text-ink-faint">{plan.note}</p>
      </div>

      <footer className="flex items-center gap-8 px-4 py-3">
        <span className="leading-tight">
          <span className="block text-[11px] text-ink-muted">Created On</span>
          <span className="mt-0.5 flex items-center gap-1.5 text-[13px] font-semibold text-ink">
            <Calendar className="size-3.5 text-[#0056ef]" /> {plan.createdOn}
          </span>
        </span>
        <span className="leading-tight">
          <span className="block text-[11px] text-ink-muted">Total Amount</span>
          <span className="mt-0.5 flex items-center gap-1.5 text-[13px] font-semibold text-ink">
            <DollarSign className="size-3.5 text-[#0056ef]" /> {plan.total}
          </span>
        </span>
      </footer>
    </article>
  )
}

export default function Treatments() {
  const { id = 'john-smith' } = useParams()
  const [vacio, setVacio] = useState(false)

  return (
    <div className={CONTENEDOR_PAGINA}>

      {/* Único rastro de navegación que queda arriba: la vuelta a la tabla.
          El breadcrumb completo repetía lo que ya dice el panel lateral. */}
      <Link
        to="/patients"
        className="text-dash-blue mb-3 inline-flex items-center gap-1 text-sm hover:underline"
      >
        <ChevronLeft className="size-4" /> Patients
      </Link>
      <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-start">
        <PatientSidePanel
          name="John Smith"
          initials="JS"
          section="Treatments"
          basePath={`/patients/${id}`}
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            {/* El título dice "Treatments plan" y el breadcrumb "Treatment plan". */}
            <PageTitle>Treatments plan</PageTitle>
            <button
              onClick={() => setVacio((v) => !v)}
              className="rounded-md border border-line bg-white px-3 py-1.5 text-[11px] font-medium text-ink-muted hover:bg-surface-subtle"
            >
              {vacio ? 'Ver poblado' : 'Ver estado vacío'}
            </button>
          </div>

          {vacio ? (
            <div className="mt-4 flex min-h-[560px] flex-col items-center justify-center rounded-lg border border-line bg-white">
              <span className="flex size-11 items-center justify-center rounded-lg bg-[#eff4ff]">
                <Circle className="size-4 fill-dash-blue text-dash-blue" />
              </span>
              <p className="mt-3 text-[15px] font-bold text-ink">No accepted treatment plans</p>
              <p className="mt-1 max-w-[280px] text-center text-xs text-ink-faint">
                This patient doesn&apos;t have any accepted treatment plans yet.
              </p>
            </div>
          ) : (
            <div className="mt-4 grid gap-5 lg:grid-cols-2">
              {PLANS.map((p, i) => <TreatmentCard key={i} plan={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
