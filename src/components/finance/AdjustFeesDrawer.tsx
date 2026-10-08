import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { DrawerActions, DrawerSection } from '@/components/ui/drawer'
import { ModalShell, SelectField, TextField } from '@/components/patients/form'
import { InnerCard } from '@/components/dashboard/primitives'
import { PROCEDIMIENTOS, REDONDEOS, ajustar, dinero, numero, type Arancel, type Redondeo } from '@/data/finanzas'

/* Adjust fees: sube o baja por porcentaje todos los precios de un fee schedule, o los de una categoría, con redondeo. Un
   solo paso, con la vista previa de lo que cambia antes de aplicarlo. Ver settings-billing.md. */

const TODAS = 'All categories'
const CAMBIOS = ['Increase by', 'Decrease by'] as const

export function AdjustFeesDrawer({
  arancel, onClose, onGuardar,
}: {
  arancel: Arancel
  onClose: () => void
  /** Los precios nuevos y cuántos cambiaron. */
  onGuardar: (precios: Record<string, number>, cambiados: number) => void
}) {
  const [categoria, setCategoria] = useState(TODAS)
  const [cambio, setCambio] = useState<(typeof CAMBIOS)[number]>('Increase by')
  const [porcentaje, setPorcentaje] = useState('')
  const [redondeo, setRedondeo] = useState<Redondeo>('Nearest $1')
  const [intentado, setIntentado] = useState(false)

  const conPrecio = PROCEDIMIENTOS.filter((p) => arancel.precios[p.code] !== undefined)
  const grupos = [...new Set(conPrecio.map((p) => p.group))]
  const alcance = conPrecio.filter((p) => categoria === TODAS || p.group === categoria)
  const n = numero(porcentaje)
  const error = !porcentaje.trim()
    ? (intentado ? 'This field is required.' : undefined)
    : n === null || n <= 0 || n > 100 ? 'Enter a percentage between 1 and 100.' : undefined
  const signo = cambio === 'Increase by' ? 1 : -1
  const filas = alcance.map((p) => ({ p, antes: arancel.precios[p.code], despues: error || n === null ? arancel.precios[p.code] : ajustar(arancel.precios[p.code], signo * n, redondeo) }))
  const cambian = filas.filter((f) => f.antes !== f.despues)

  const guardar = () => {
    if (!porcentaje.trim() || error) { setIntentado(true); return }
    onGuardar({ ...arancel.precios, ...Object.fromEntries(cambian.map((f) => [f.p.code, f.despues])) }, cambian.length)
    onClose()
  }

  return (
    <ModalShell
      title="Adjust Fees"
      description={`Change many fees of ${arancel.nombre} at once.`}
      onClose={onClose}
      width="max-w-[480px]"
      actions={<DrawerActions onCancel={onClose} onSave={guardar} saveLabel={cambian.length ? `Apply to ${cambian.length} fees` : 'Apply'} />}
    >
      <div className="flex flex-col gap-6">
      <DrawerSection title="Adjustment">
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField label="Change" required options={[...CAMBIOS]} value={cambio} onChange={(v) => setCambio(v as typeof cambio)} />
          <TextField label="Percentage (%)" required placeholder="5" value={porcentaje} onChange={setPorcentaje} error={error} />
          <SelectField label="Apply To" required options={[TODAS, ...grupos]} value={categoria} onChange={setCategoria} hint={`${alcance.length} procedures with a fee`} />
          <SelectField label="Rounding" required options={[...REDONDEOS]} value={redondeo} onChange={(v) => setRedondeo(v as Redondeo)} />
        </div>
      </DrawerSection>
      <DrawerSection
        title="Preview"
        description={n !== null && !error ? `${cambian.length} of ${alcance.length} fees change.` : 'Enter a percentage to see the new fees.'}
      >
        <InnerCard className="divide-y divide-line-row">
          {filas.slice(0, 5).map(({ p, antes, despues }) => (
            <div key={p.code} className="flex items-center gap-3 px-3 py-2.5 text-[12.5px]">
              <span className="w-12 shrink-0 font-semibold text-ink">{p.code}</span>
              <span className="min-w-0 flex-1 truncate text-ink-muted" title={p.label}>{p.label}</span>
              <span className="shrink-0 text-ink-faint tabular-nums">{dinero(antes, true)}</span>
              <ArrowRight aria-hidden className="size-3.5 shrink-0 text-ink-faint" />
              <span className="w-20 shrink-0 text-right font-semibold text-ink tabular-nums">{dinero(despues, true)}</span>
            </div>
          ))}
        </InnerCard>
        {filas.length > 5 && <p className="text-[11.5px] text-ink-muted">And {filas.length - 5} more.</p>}
      </DrawerSection>
      </div>
    </ModalShell>
  )
}
