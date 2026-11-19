import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { PatientPaymentPanel } from '@/components/patients/ledger/PatientPaymentPanel'
import { CreditAdjustmentPanel } from '@/components/patients/ledger/CreditAdjustmentPanel'
import { ChargeAdjustmentPanel } from '@/components/patients/ledger/ChargeAdjustmentPanel'
import type { FormularioLedger } from '@/components/patients/ledger/formulario'
import type { TipoAjusteBilling } from '@/data/billing'

/* Los tres drawers de Patient Payment (-), Credit Adjustment (-) y Enter Charge (+) Adjustment, como red.dev: uno por botón,
   en Billing y en el Ledger del paciente. Son los mismos formularios con la misma lógica (Apply to, reparto del más viejo al
   más nuevo, crédito sin aplicar); esto sólo elige cuál abrir. Ver ledger.md y billing.md (2026-11-19). */

export function PostPaymentDialog({
  tipoInicial, onClose, onGuardar, ...datos
}: Omit<FormularioLedger, 'onCancelar'> & {
  tipoInicial: TipoAjusteBilling
  onClose: () => void
}) {
  const comun = { ...datos, onGuardar, onCancelar: onClose }
  if (tipoInicial === 'Patient Payment') return <PatientPaymentPanel {...comun} />
  if (tipoInicial === 'Credit Adjustment') return <CreditAdjustmentPanel {...comun} />
  return <ChargeAdjustmentPanel {...comun} />
}
`})))()}export{n,i as r,r as t};