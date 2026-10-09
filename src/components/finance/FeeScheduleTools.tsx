import { useState } from 'react'
import { FormFooter, ModalShell, OptionCheckbox, SelectField, TextField } from '@/components/patients/form'
import { DrawerSection } from '@/components/ui/drawer'

/* Las dos herramientas del editor de un fee schedule (red.dev): Copy form trae los precios de otro fee schedule y Bulk
   Edit ("Increase All") los sube en monto o en porcentaje. Las dos llenan la columna New Fee; nada se guarda hasta Save.
   Ver settings-billing.md. */

export function CopyFormDrawer({ opciones, onClose, onCopiar }: {
  /** Los nombres de los otros fee schedules activos. */
  opciones: string[]
  onClose: () => void
  onCopiar: (nombre: string) => void
}) {
  const [elegido, setElegido] = useState('')
  const [intentado, setIntentado] = useState(false)
  return (
    <ModalShell
      title="Copy form"
      description="Select the fee schedule you want to replace with"
      onClose={onClose}
      width="max-w-[480px]"
      footer={<FormFooter onCancel={onClose} saveLabel="Confirm" onSave={() => { if (!elegido) { setIntentado(true); return } onCopiar(elegido); onClose() }} />}
    >
      <DrawerSection title="Fee schedule">
        <SelectField
          label="Fee schedule" required placeholder="Select an option" options={opciones} value={elegido} onChange={setElegido}
          error={intentado && !elegido ? 'Select the fee schedule to copy.' : undefined}
          hint="Its fees replace every New Fee. Save to keep them."
        />
      </DrawerSection>
    </ModalShell>
  )
}

export type Aumento = { monto: number; por: '$' | '%'; excluirCeros: boolean; redondear: boolean }

/* Aplica Increase All a un precio: $0 queda igual si se excluye, y el redondeo sube al dólar. */
export const aumentar = (precio: number, a: Aumento) => {
  if (a.excluirCeros && precio === 0) return precio
  const nuevo = a.por === '%' ? precio * (1 + a.monto / 100) : precio + a.monto
  return a.redondear ? Math.ceil(nuevo) : Math.round(nuevo * 100) / 100
}

/* Con filas tildadas en la tabla, Bulk Edit sube sólo esas (pedido de Julián; red.dev sube todas). */
export function IncreaseAllDrawer({ onClose, onAplicar, seleccionados = 0 }: {
  onClose: () => void
  onAplicar: (a: Aumento) => void
  /** Cuántas filas están tildadas; 0 = todas. */
  seleccionados?: number
}) {
  const [monto, setMonto] = useState('')
  const [por, setPor] = useState<'$' | '%'>('$')
  const [excluirCeros, setExcluirCeros] = useState(false)
  const [redondear, setRedondear] = useState(false)
  const [intentado, setIntentado] = useState(false)
  const valido = monto.trim() !== '' && Number(monto) !== 0

  return (
    <ModalShell
      title={seleccionados ? 'Increase Selected' : 'Increase All'}
      description={seleccionados ? `Increase the ${seleccionados} selected ${seleccionados === 1 ? 'fee' : 'fees'} by a specific amount or percentage.` : 'Increase all fees by a specific amount or percentage.'}
      onClose={onClose}
      width="max-w-[480px]"
      footer={<FormFooter onCancel={onClose} saveLabel="Confirm" onSave={() => { if (!valido) { setIntentado(true); return } onAplicar({ monto: Number(monto), por, excluirCeros, redondear }); onClose() }} />}
    >
      <DrawerSection title="Increase">
        <div className="grid grid-cols-[1fr_96px] gap-4">
          <TextField
            label={seleccionados ? 'Increase Selected Fees By' : 'Increase All Fees By'} required placeholder={por === '$' ? '$0.00' : '0'} value={monto}
            onChange={(v) => setMonto(v.replace(/[^\d.-]/g, ''))}
            error={intentado && !valido ? 'Enter an amount other than 0.' : undefined}
            hint="A negative number lowers the fees."
          />
          <SelectField label="By" options={['$', '%']} value={por} onChange={(v) => setPor(v as '$' | '%')} />
        </div>
        <div className="flex flex-col gap-2">
          <OptionCheckbox label="Exclude $0.0 fees from the increase" checked={excluirCeros} onChange={setExcluirCeros} />
          <OptionCheckbox label="Round up the value to the nearest dollar" checked={redondear} onChange={setRedondear} />
        </div>
      </DrawerSection>
    </ModalShell>
  )
}
