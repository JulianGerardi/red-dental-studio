import { useState } from 'react'
import {
  ClipboardList, CreditCard, FileSignature, IdCard, Inbox, Scan, Send, ShieldCheck, Wallet,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { Pill, type PillTone } from '@/components/ui/pill'
import { Tabs } from '@/components/ui/tabs'
import { EmptyState } from '@/components/ui/empty-state'
import { DOCS_PENDIENTES, type DocPendiente, type MotivoDoc, type Responsable, type TipoDoc } from '@/data/pendingDocuments'

/* Documentos pendientes del paciente, en el Patient Dashboard en lugar de la tabla de Insurance (Julián, 2026-10-05):
   por urgencia, con quién tiene que actuar y la acción para resolverlo. Resolver uno lo saca de pendientes. Ver
   design-reference/figma/modulos/patient-dashboard.md. */

const ICONO: Record<TipoDoc, LucideIcon> = {
  consent: FileSignature, form: ClipboardList, insurance: CreditCard, referral: Send, privacy: ShieldCheck, image: Scan, financial: Wallet, id: IdCard,
}
const TONO_MOTIVO: Record<MotivoDoc, PillTone> = { 'Pending signature': 'warning', Expired: 'danger', Missing: 'danger', 'Needs review': 'info' }
const QUIEN: Record<Responsable, string> = { Patient: 'Patient', Provider: 'Provider', 'Front desk': 'Front desk' }

const venceTexto = (d: DocPendiente) =>
  d.dias < 0 ? `Overdue ${-d.dias} ${d.dias === -1 ? 'day' : 'days'}` : d.dias === 0 ? 'Due today' : `Due ${d.vence.replace(/, \d{4}$/, '')}`

function useDocsPendientes(iniciales: DocPendiente[]) {
  const [docs, setDocs] = useState(iniciales)
  const resolver = (d: DocPendiente) => {
    setDocs((ds) => ds.map((x) => (x.id === d.id ? { ...x, resuelto: 'Oct 5, 2026' } : x)))
    const hecho = d.accion === 'Send reminder' || d.accion === 'Request update' ? 'sent to the patient' : d.accion === 'Upload' ? 'uploaded' : d.accion === 'Sign' ? 'signed' : 'reviewed'
    aviso.ok(`${d.nombre} ${hecho}.`)
  }
  return { docs, resolver }
}

/* El ícono del documento en su cuadrado, del color de lo que le falta. */
function IconoDoc({ d }: { d: DocPendiente }) {
  const Icono = ICONO[d.tipo]
  const tono = d.resuelto ? 'bg-dash-ok-bg text-dash-ok-fg' : d.motivo === 'Needs review' ? 'bg-info-bg text-dash-busy-fg' : d.motivo === 'Pending signature' ? 'bg-warn-bg text-warn-fg' : 'bg-dash-bad-bg text-dash-bad-fg'
  return <span className={cn('flex size-9 shrink-0 items-center justify-center rounded-lg', tono)}><Icono className="size-4" /></span>
}

const GRUPOS: { titulo: string; filtro: (d: DocPendiente) => boolean; color: string }[] = [
  { titulo: 'Overdue', filtro: (d) => d.dias < 0, color: 'text-dash-bad-fg' },
  { titulo: 'Due this week', filtro: (d) => d.dias >= 0 && d.dias <= 7, color: 'text-warn-fg' },
  { titulo: 'Later', filtro: (d) => d.dias > 7, color: 'text-ink-muted' },
]

export function PendingDocuments({ docs: iniciales = DOCS_PENDIENTES }: { docs?: DocPendiente[] }) {
  const { docs, resolver } = useDocsPendientes(iniciales)
  const [quien, setQuien] = useState<'All' | 'Patient' | 'Office'>('All')
  const pendientes = docs.filter((d) => !d.resuelto)
  const visibles = pendientes.filter((d) => quien === 'All' || (quien === 'Patient' ? d.responsable === 'Patient' : d.responsable !== 'Patient'))

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-[15px] font-bold text-ink">Pending documents</h2>
        {pendientes.length > 0 && <Pill tone="warning" size="sm">{pendientes.length} to resolve</Pill>}
        <Tabs
          size="sm" className="ml-auto" aria-label="Who has to act"
          tabs={[
            { value: 'All' as const, count: pendientes.length },
            { value: 'Patient' as const, count: pendientes.filter((d) => d.responsable === 'Patient').length },
            { value: 'Office' as const, count: pendientes.filter((d) => d.responsable !== 'Patient').length },
          ]}
          value={quien} onChange={setQuien}
        />
      </div>

      {visibles.length === 0 ? (
        <EmptyState icon={Inbox} title="Nothing to resolve" detail="Every document of this patient is signed, uploaded and up to date." className="py-8" />
      ) : (
        <div className="flex flex-col gap-4">
          {GRUPOS.map((g) => {
            const del = visibles.filter(g.filtro)
            if (!del.length) return null
            return (
              <section key={g.titulo} aria-label={g.titulo} className="flex flex-col gap-1.5">
                <p className={cn('text-[11px] font-semibold tracking-wide uppercase', g.color)}>{g.titulo} · {del.length}</p>
                <ul className="shadow-hairline flex flex-col divide-y divide-line-soft rounded-lg">
                  {del.map((d) => (
                    <li key={d.id} className="flex flex-wrap items-center gap-3 px-3 py-2.5">
                      <IconoDoc d={d} />
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="text-[13px] font-semibold text-ink">{d.nombre}</span>
                          <Pill tone={TONO_MOTIVO[d.motivo]} size="sm">{d.motivo}</Pill>
                        </span>
                        <span className="block truncate text-[12px] text-ink-muted">{d.detalle}</span>
                      </span>
                      <span className="flex shrink-0 flex-col items-end gap-0.5 text-right">
                        <span className={cn('text-[12px] font-semibold tabular-nums', d.dias < 0 ? 'text-dash-bad-fg' : 'text-ink')}>{venceTexto(d)}</span>
                        <span className="text-[11px] text-ink-muted">{QUIEN[d.responsable]}</span>
                      </span>
                      <Button size="sm" variant={d.dias < 0 ? 'primary' : 'secondary'} onClick={() => resolver(d)} className="shrink-0">{d.accion}</Button>
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}
