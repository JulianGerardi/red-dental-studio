import { useState } from 'react'
import { ModalShell, SelectField } from '@/components/patients/form'
import { Button } from '@/components/ui/button'
import { DrawerSection } from '@/components/ui/drawer'
import { cn } from '@/lib/utils'
import { PROCEDIMIENTOS, dinero, fechaDMA, versionVigente, type Arancel } from '@/data/finanzas'

/* Compare fees (pedido de Julián): la diferencia es por procedimiento, contra un fee schedule de referencia elegido a la
   vista (UCR - Red, el Default, si no se elige otro). Compara las versiones vigentes. Ver settings-billing.md. */

const conSigno = (n: number, texto: string) => (n > 0 ? `+${texto}` : n < 0 ? `−${texto}` : texto)

export function diferencia(precio: number | undefined, referencia: number | undefined) {
  if (precio === undefined || referencia === undefined) return null
  const monto = precio - referencia
  return { monto, porcentaje: referencia === 0 ? null : (monto / referencia) * 100 }
}

export function CompareFeesDrawer({ arancel, aranceles, onClose, onEditar }: {
  arancel: Arancel
  aranceles: Arancel[]
  onClose: () => void
  onEditar: () => void
}) {
  const opciones = aranceles.filter((a) => a.id !== arancel.id && a.estado !== 'Archived')
  const [refId, setRefId] = useState((opciones.find((a) => a.porDefecto) ?? opciones[0])?.id ?? '')
  const ref = opciones.find((a) => a.id === refId)
  const propios = versionVigente(arancel).precios
  const ajenos = ref ? versionVigente(ref).precios : {}
  const filas = PROCEDIMIENTOS.map((p) => ({ ...p, d: diferencia(propios[p.code], ajenos[p.code]) }))
  const comparables = filas.filter((f) => f.d)
  const resumen = [
    ['Higher', comparables.filter((f) => f.d!.monto > 0).length],
    ['Lower', comparables.filter((f) => f.d!.monto < 0).length],
    ['Same', comparables.filter((f) => f.d!.monto === 0).length],
    ['Missing a fee', filas.length - comparables.length],
  ] as const

  return (
    <ModalShell
      title="Compare fees"
      description={`Compare the current fees of ${arancel.nombre} with another fee schedule, procedure by procedure.`}
      onClose={onClose}
      footer={<><Button variant="secondary" onClick={onClose}>Close</Button><Button onClick={onEditar}>Edit fees</Button></>}
    >
      <div className="flex flex-col gap-6">
        <DrawerSection title="Reference">
          <SelectField
            label="Compare with" options={opciones.map((a) => a.nombre)} value={ref?.nombre ?? ''}
            onChange={(n) => setRefId(opciones.find((a) => a.nombre === n)?.id ?? '')}
            hint={ref ? `Current version from ${fechaDMA(versionVigente(ref).desde)}. ${arancel.nombre}: from ${fechaDMA(versionVigente(arancel).desde)}.` : undefined}
          />
          <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {resumen.map(([k, v]) => (
              <div key={k} className="rounded-lg bg-surface-muted px-3 py-2">
                <dt className="text-xs text-ink-muted">{k}</dt>
                <dd className="text-[15px] font-semibold text-ink tabular-nums">{v}</dd>
              </div>
            ))}
          </dl>
        </DrawerSection>

        <DrawerSection title="Fees">
          <div className="overflow-x-auto">
            <div role="table" aria-label="Compared fees" className="min-w-[560px] text-[13px]">
              <div role="row" className="grid grid-cols-[56px_1fr_88px_88px_120px] gap-3 border-b border-line pb-2 text-xs font-medium text-ink-muted">
                <span role="columnheader">Code</span>
                <span role="columnheader">Description</span>
                <span role="columnheader" className="truncate text-right" title={arancel.nombre}>{arancel.nombre}</span>
                <span role="columnheader" className="truncate text-right" title={ref?.nombre}>{ref?.nombre ?? '—'}</span>
                <span role="columnheader" className="text-right">Difference</span>
              </div>
              {filas.map((f) => (
                <div key={f.code} role="row" className="grid grid-cols-[56px_1fr_88px_88px_120px] items-center gap-3 border-b border-line py-2 last:border-b-0">
                  <span role="cell" className="font-medium tabular-nums">{f.code}</span>
                  <span role="cell" className="min-w-0 truncate text-ink-muted" title={f.label}>{f.label}</span>
                  <span role="cell" className="text-right tabular-nums">{propios[f.code] !== undefined ? dinero(propios[f.code]) : '—'}</span>
                  <span role="cell" className="text-right text-ink-muted tabular-nums">{ajenos[f.code] !== undefined ? dinero(ajenos[f.code]) : '—'}</span>
                  <span role="cell" className={cn('text-right tabular-nums', !f.d || f.d.monto === 0 ? 'text-ink-faint' : 'text-ink')}>
                    {f.d
                      ? <>{conSigno(f.d.monto, dinero(Math.abs(f.d.monto)))}{f.d.porcentaje !== null && f.d.monto !== 0 && <span className="text-ink-muted"> · {conSigno(f.d.porcentaje, `${Math.abs(f.d.porcentaje).toFixed(0)}%`)}</span>}</>
                      : '—'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </DrawerSection>
      </div>
    </ModalShell>
  )
}
