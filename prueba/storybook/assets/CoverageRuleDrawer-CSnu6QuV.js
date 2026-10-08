import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { DrawerActions, DrawerSection } from '@/components/ui/drawer'
import { ModalShell, SelectField, TextField } from '@/components/patients/form'
import { Toggle } from '@/components/settings/primitives'
import { CoverageBar } from '@/components/finance/CoverageBar'
import type { ProcedureGroup } from '@/components/clinical/dental/data'
import { CATEGORIAS, ESPERAS, numero, type Espera, type ReglaCobertura } from '@/data/finanzas'

/* La regla de una categoría de una coverage table: cuánto paga, si descuenta el deducible, la espera y el límite de
   frecuencia. Un paso. Ver settings-billing.md. */
export function CoverageRuleDrawer({
  grupo, regla, onClose, onGuardar,
}: {
  grupo: ProcedureGroup
  regla: ReglaCobertura
  onClose: () => void
  onGuardar: (r: ReglaCobertura) => void
}) {
  const categoria = CATEGORIAS.find((c) => c.grupo === grupo)
  const [porcentaje, setPorcentaje] = useState(String(regla.porcentaje))
  const [deducible, setDeducible] = useState(regla.deducible)
  const [espera, setEspera] = useState<Espera>(regla.espera)
  const [frecuencia, setFrecuencia] = useState(regla.frecuencia)

  const n = numero(porcentaje)
  const error = !porcentaje.trim()
    ? 'This field is required.'
    : n === null || n < 0 || n > 100 || !Number.isInteger(n) ? 'Enter a whole number from 0 to 100.' : undefined

  const guardar = () => {
    if (error) return
    onGuardar({ porcentaje: n!, deducible, espera, frecuencia: frecuencia.trim() })
    onClose()
  }

  return (
    <ModalShell
      title={grupo}
      description={categoria ? \`\${categoria.rango} · \${categoria.clase} class\` : undefined}
      onClose={onClose}
      width="max-w-[480px]"
      actions={<DrawerActions onCancel={onClose} onSave={guardar} />}
    >
      <div className="flex flex-col gap-6">
        <DrawerSection title="Coverage">
          <TextField label="Plan Pays (%)" required placeholder="80" value={porcentaje} onChange={setPorcentaje} error={error} hint="0 means the category is not covered." />
          {!error && <CoverageBar value={n!} />}
          <Toggle label="Deductible Applies" on={deducible} onChange={setDeducible} />
        </DrawerSection>
        <DrawerSection title="Limitations">
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField label="Waiting Period" options={[...ESPERAS]} value={espera} onChange={(v) => setEspera(v as Espera)} />
            <TextField label="Frequency Limit" placeholder="e.g. 2 per calendar year" value={frecuencia} onChange={setFrecuencia} />
          </div>
        </DrawerSection>
      </div>
    </ModalShell>
  )
}
`})))()}export{n,i as r,r as t};