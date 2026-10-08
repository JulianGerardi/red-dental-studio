import { Link } from 'react-router-dom'
import { ArrowRight, CircleCheck, Landmark, Receipt, ShieldCheck, TriangleAlert } from 'lucide-react'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { SettingsSectionCard } from '@/components/settings/SettingsSectionCard'
import { Card } from '@/components/settings/primitives'
import { InnerCard } from '@/components/dashboard/primitives'
import { useFinanzas } from '@/data/finanzasStore'
import { PROCEDIMIENTOS, cantidad } from '@/data/finanzas'

/* Settings → Billing: la portada de las tres tablas que alimentan la facturación. Las cards llevan a cada una con su
   cuenta; abajo, cómo se conectan y lo que falta configurar. Ver design-reference/figma/modulos/settings-billing.md. */

const PASOS = [
  { n: 1, titulo: 'Fee schedule', texto: 'What your office charges for each procedure.' },
  { n: 2, titulo: 'Carrier and plan', texto: 'Who pays. Each plan points to one fee schedule and one coverage table.' },
  { n: 3, titulo: 'Coverage table', texto: 'How much the plan pays per category, after deductibles and up to the maximum.' },
]

export type Pendiente = { id: string; texto: string; to: string }

/* Lo que deja un plan sin poder cobrarse bien: carriers activos sin planes, planes que apuntan a algo inactivo y fee
   schedules en uso con procedimientos sin precio. */
export function usePendientes(): Pendiente[] {
  const { aranceles, aseguradoras, planes, coberturas } = useFinanzas()
  const lista: Pendiente[] = []
  for (const c of aseguradoras.filter((c) => c.estado === 'Active' && !planes.some((p) => p.aseguradoraId === c.id))) {
    lista.push({ id: `c-${c.id}`, texto: `${c.nombre} has no plans yet.`, to: `/settings/finance/carriers/${c.id}` })
  }
  for (const p of planes.filter((p) => p.estado === 'Active')) {
    const a = aranceles.find((x) => x.id === p.arancelId)
    const t = coberturas.find((x) => x.id === p.coberturaId)
    if (a?.estado === 'Inactive') lista.push({ id: `pa-${p.id}`, texto: `${p.nombre} uses ${a.nombre}, which is inactive.`, to: `/settings/finance/carriers/${p.aseguradoraId}` })
    if (t?.estado === 'Inactive') lista.push({ id: `pt-${p.id}`, texto: `${p.nombre} uses ${t.nombre}, which is inactive.`, to: `/settings/finance/carriers/${p.aseguradoraId}` })
  }
  for (const a of aranceles.filter((a) => a.estado === 'Active' && planes.some((p) => p.arancelId === a.id))) {
    const sin = PROCEDIMIENTOS.filter((p) => a.precios[p.code] === undefined).length
    if (sin) lista.push({ id: `a-${a.id}`, texto: `${a.nombre} has ${cantidad(sin, 'procedure')} without a fee.`, to: `/settings/finance/fee-schedule/${a.id}` })
  }
  return lista
}

/* La card de lo que falta configurar; sin pendientes, lo dice. */
export function SetupChecks({ pendientes }: { pendientes: Pendiente[] }) {
  return (
    <Card title="Setup checks">
      {pendientes.length === 0 ? (
        <p className="flex items-center gap-2 text-[13px] text-ink-muted">
          <CircleCheck className="size-4 shrink-0 text-dash-ok-fg" /> Everything is set up. Every plan can be billed.
        </p>
      ) : (
        <ul className="flex flex-col divide-y divide-line-row">
          {pendientes.map((p) => (
            <li key={p.id} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
              <TriangleAlert className="size-4 shrink-0 text-warn-fg" />
              <span className="min-w-0 flex-1 text-[13px] text-ink">{p.texto}</span>
              <Link to={p.to} className="text-dash-blue shrink-0 text-[12px] font-semibold hover:underline">Review</Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}

export function SettingsBilling() {
  const { aranceles, aseguradoras, planes, coberturas } = useFinanzas()
  const pendientes = usePendientes()
  const porDefecto = aranceles.find((a) => a.porDefecto)
  const activos = <T extends { estado: string }>(l: T[]) => l.filter((x) => x.estado === 'Active').length

  return (
    <div className="px-4 py-6 sm:px-8">
      <SettingsPageHeader titulo="Billing" bajada="Manage fee schedules, carriers, and coverage tables." />

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <SettingsSectionCard
          to="/settings/finance/fee-schedule" icon={Receipt} title="Fee Schedules"
          description="What your office charges for each procedure."
          detail={`${cantidad(activos(aranceles), 'active schedule')}${porDefecto ? ` · Default: ${porDefecto.nombre}` : ''}`}
        />
        <SettingsSectionCard
          to="/settings/finance/carriers" icon={Landmark} title="Carriers"
          description="The insurance companies you bill and their plans."
          detail={`${cantidad(activos(aseguradoras), 'carrier')} · ${cantidad(activos(planes), 'plan')}`}
        />
        <SettingsSectionCard
          to="/settings/finance/coverage-table" icon={ShieldCheck} title="Coverage Tables"
          description="What each plan pays by procedure category."
          detail={cantidad(activos(coberturas), 'active table')}
        />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <Card title="How it fits together">
          <ol className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
            {PASOS.map((p, i) => (
              <li key={p.n} className="contents">
                <InnerCard className="flex flex-col gap-1 p-3">
                  <span className="bg-dash-count-bg text-dash-blue-hover flex size-6 items-center justify-center rounded-full text-[11px] font-bold">{p.n}</span>
                  <span className="mt-1 text-[13px] font-semibold text-ink">{p.titulo}</span>
                  <span className="text-[12px] leading-snug text-ink-muted">{p.texto}</span>
                </InnerCard>
                {i < PASOS.length - 1 && <ArrowRight aria-hidden className="hidden size-4 self-center text-ink-faint md:block" />}
              </li>
            ))}
          </ol>
        </Card>
        <SetupChecks pendientes={pendientes} />
      </div>
    </div>
  )
}
