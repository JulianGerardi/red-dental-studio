import { useState } from 'react'
import { DrawerActions, DrawerSection } from '@/components/ui/drawer'
import { ModalShell, TextField } from '@/components/patients/form'
import { Alert } from '@/components/ui/alert'
import type { Cuenta } from '@/pages/settings/Accounts'

/* Manage licenses (menú de una fila de Accounts): cuántas licencias tiene la cuenta. Las que usan los empleados activos
   y suspendidos son el mínimo, como dice la pestaña Subscription. Sin plan no hay licencias que ajustar. */

export function ManageLicensesDrawer({ cuenta, onClose, onGuardar }: { cuenta: Cuenta; onClose: () => void; onGuardar: (total: string) => void }) {
  const sinPlan = cuenta.plan === '—'
  const [total, setTotal] = useState(cuenta.licencias === '—' ? '' : cuenta.licencias)
  const n = Number(total)
  const error = !total.trim() ? 'This field is required.'
    : !Number.isInteger(n) || n < 1 ? 'Enter a whole number.'
    : n < cuenta.empleados ? `At least ${cuenta.empleados}: that many are in use.` : undefined
  const [intentado, setIntentado] = useState(false)

  const guardar = () => {
    setIntentado(true)
    if (error) return
    onGuardar(String(n))
    onClose()
  }

  const datos: [string, string][] = [
    ['Plan', cuenta.plan],
    ['Subscription', cuenta.suscripcion],
    ['Expires on', cuenta.vence || '—'],
    ['In use', String(cuenta.empleados)],
  ]

  return (
    <ModalShell
      title="Manage Licenses"
      description={cuenta.nombre}
      onClose={onClose}
      width="max-w-[480px]"
      actions={<DrawerActions onCancel={onClose} onSave={guardar} saveDisabled={sinPlan} />}
    >
      <div className="flex flex-col gap-6">
      <DrawerSection title="Subscription">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
          {datos.map(([k, v]) => (
            <div key={k} className="min-w-0">
              <dt className="text-[11px] text-ink-muted">{k}</dt>
              <dd className="truncate text-[13px] font-semibold text-ink tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
      </DrawerSection>
      <DrawerSection title="Licenses">
        {sinPlan ? (
          <Alert tone="warning" title="This account has no plan yet">Licenses come with a subscription. Assign a plan first.</Alert>
        ) : (
          <TextField
            label="Total licenses" required placeholder="0" value={total} onChange={setTotal}
            error={intentado ? error : undefined}
            hint={!error ? `${n - cuenta.empleados} available after the ${cuenta.empleados} in use by active and suspended employees.` : undefined}
          />
        )}
      </DrawerSection>
      </div>
    </ModalShell>
  )
}
