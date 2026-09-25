import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useMemo, useState } from 'react'
import { Filter, CirclePlus, FileText, MoreVertical, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { EmptyState } from '@/components/ui/empty-state'
import { ICONO_SUELTO } from '@/lib/estilos'
import { ORDENES, type EstadoOrden } from '@/data/clinical-mode'
import { Pill, type PillTone } from '@/components/ui/pill'

const ORDEN_TONO: Record<EstadoOrden, PillTone> = {
  Pending: 'warning', Canceled: 'danger', Rejected: 'danger',
  Delayed: 'warning', Requested: 'purple', Delivered: 'success',
}

/* Figma 4070:148911 "Lab Order — Section (List, Detail & New Laboratory
   Modal)". Acá está el listado, que es donde cae la pestaña. El detalle y el
   modal "New Laboratory" quedan pendientes.

   El pie del frame dice "Showing 9 active prescriptions" y el botón "New
   Prescription" en una pantalla de órdenes de laboratorio: es texto de la
   pantalla de Prescription que quedó pegado. Se replica tal cual. */

const COLUMNAS = ['Provider', 'Patient', 'Status', 'Updated', 'Created', 'Expiration Date', 'Actions']

function iniciales(nombre: string) {
  return nombre.replace(/^Dr\\.\\s*/, '').split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
}

export function LabOrderPanel() {
  const [q, setQ] = useState('')

  const filas = useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t) return ORDENES
    return ORDENES.filter((o) => \`\${o.proveedor} \${o.paciente} \${o.estado}\`.toLowerCase().includes(t))
  }, [q])

  return (
    <div className="rounded-xl border border-line bg-white">
      <div className="flex flex-wrap items-center justify-end gap-2 p-3">
        <div className="relative mr-auto w-full sm:w-[240px]">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search..."
            className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none"
          />
        </div>
        <button
          onClick={() => aviso.info('Filters are not available in this release.')}
          className="flex h-9 shrink-0 items-center gap-1.5 rounded-md border border-line px-3 text-[13px] font-medium hover:bg-surface-subtle"
        >
          <Filter className="size-3.5" /> Filter
        </button>
        <button
          onClick={() => aviso.info('New Prescription is not available in this release.')}
          className="text-dash-blue flex h-9 shrink-0 items-center gap-1.5 px-2 text-[13px] font-semibold hover:underline"
        >
          <CirclePlus className="size-4" /> New Prescription
        </button>
      </div>

      {filas.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No lab orders found"
          detail={\`Nothing matches "\${q}". Try another provider, patient or status.\`}
          className="py-10"
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] border-collapse">
            <thead>
              <tr className="border-y border-line-soft bg-surface-alt">
                {COLUMNAS.map((c) => (
                  <th key={c} className="h-10 px-3 text-left text-[11px] font-semibold whitespace-nowrap text-ink-muted">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filas.map((o) => (
                <tr key={o.id} className="border-b border-line-soft last:border-0">
                  <td className="h-14 px-3">
                    <span className="flex items-center gap-2 whitespace-nowrap">
                      <span className="bg-dash-count-bg text-dash-blue-hover flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold">
                        {iniciales(o.proveedor)}
                      </span>
                      <span className="text-[13px] text-ink">{o.proveedor}</span>
                    </span>
                  </td>
                  <td className="px-3">
                    <span className="flex items-center gap-2 whitespace-nowrap">
                      <span className="bg-dash-count-bg text-dash-blue-hover flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold">
                        {iniciales(o.paciente)}
                      </span>
                      <span className="text-[13px] text-ink">{o.paciente}</span>
                    </span>
                  </td>
                  <td className="px-3"><Pill tone={ORDEN_TONO[o.estado]}>{o.estado}</Pill></td>
                  <td className="px-3 text-[13px] whitespace-nowrap text-ink-soft">{o.actualizado}</td>
                  <td className="px-3 text-[13px] whitespace-nowrap text-ink-soft">{o.creado}</td>
                  {/* El frame pinta de rojo las que vencen pronto. */}
                  <td className={cn('px-3 text-[13px] whitespace-nowrap', o.urgente ? 'font-semibold text-dash-bad-fg' : 'text-ink-soft')}>
                    {o.vence}
                  </td>
                  <td className="px-3">
                    <span className="flex items-center gap-1">
                      <button
                        onClick={() => aviso.info('The lab order detail is not available in this release.')}
                        aria-label={\`Open order for \${o.paciente}\`}
                        className={ICONO_SUELTO}
                      >
                        <FileText className="size-4" />
                      </button>
                      <button
                        onClick={() => aviso.info('Actions are not available in this release.')}
                        aria-label={\`Actions for \${o.paciente}\`}
                        className={ICONO_SUELTO}
                      >
                        <MoreVertical className="size-4" />
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line-soft p-3">
        <span className="text-[12px] text-ink-muted">Showing {filas.length} active prescriptions</span>
        <button
          onClick={() => aviso.info('History is not available in this release.')}
          className="text-dash-blue flex items-center gap-0.5 text-[12px] font-medium hover:underline"
        >
          View History ›
        </button>
      </div>
    </div>
  )
}
`})))()}export{n,i as r,r as t};