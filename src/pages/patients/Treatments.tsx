import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Calendar, DollarSign, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PageTitle } from '@/components/ui/page-title'
import { PatientSidePanel } from '@/components/patients/PatientSidePanel'
import { PatientBreadcrumb } from '@/components/patients/PatientBreadcrumb'
import { CONTENEDOR_PAGINA, TARJETA_PANEL } from '@/lib/estilos'
import { Avatar } from '@/components/ui/avatar'

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
export const PLANS: Plan[] = [
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

export function TreatmentCard({ plan }: { plan: Plan }) {
  const rojo = plan.estado === 'Expired'
  return (
    <article className={cn(TARJETA_PANEL, 'overflow-hidden')}>
      <header className="flex items-center gap-3 px-4 py-3">
        <Avatar initials={plan.initials} size={36} />
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

      <PatientBreadcrumb name="John Smith" section="Treatments" />
      <div className="flex flex-col gap-5 lg:flex-row">
        <PatientSidePanel
          name="John Smith"
          initials="JS"
          section="Treatments"
          basePath={`/patients/${id}`}
        />

        <div className="flex min-w-0 flex-1 flex-col">
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
            <div className={cn(TARJETA_PANEL, 'mt-4 flex min-h-[560px] flex-col items-center justify-center lg:flex-1')}>
              <span className="flex size-11 items-center justify-center rounded-lg bg-[#eff4ff]">
                <Circle className="size-4 fill-dash-blue text-dash-blue" />
              </span>
              <p className="mt-3 text-[15px] font-bold text-ink">No accepted treatment plans</p>
              <p className="mt-1 max-w-[280px] text-center text-xs text-ink-faint">
                This patient doesn&apos;t have any accepted treatment plans yet.
              </p>
            </div>
          ) : (
            /* Todos los planes a la vista; desde lg la lista llena el alto que deja el menú y scrollea adentro
               (patient-dashboard.md, 2026-10-25). El absolute saca la lista del cálculo del alto de la fila: lo manda el menú. */
            <div className="mt-4 lg:relative lg:min-h-[320px] lg:flex-1">
              <div tabIndex={0} aria-label="Treatment plans" role="region" className="-m-1 grid gap-5 overflow-y-auto p-1 focus-visible:outline-2 focus-visible:outline-dash-blue lg:absolute lg:inset-0 lg:m-0 lg:grid-cols-2 lg:auto-rows-max lg:content-start lg:p-1">
                {PLANS.map((p, i) => <TreatmentCard key={i} plan={p} />)}
                <div aria-hidden className="pointer-events-none sticky bottom-0 -mt-10 hidden h-10 bg-gradient-to-t from-page-background to-transparent lg:col-span-2 lg:block" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
