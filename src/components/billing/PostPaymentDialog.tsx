import { PatientPaymentPanel } from '@/components/patients/ledger/PatientPaymentPanel'
import { CreditAdjustmentPanel } from '@/components/patients/ledger/CreditAdjustmentPanel'
import { ChargeAdjustmentPanel } from '@/components/patients/ledger/ChargeAdjustmentPanel'
import { ALCANCE_GUARANTOR } from '@/lib/ledgerAplicacion'
import { type Aplicacion, type Movimiento } from '@/data/ledger'
import { APLICACIONES_BILLING, HOY_BILLING, PROVIDERS_BILLING, grupoDeGarante, type TipoAjusteBilling } from '@/data/billing'

/* Cada botón de Billing abre su drawer, como red.dev: New Patient Payment (-), Credit Adjustment (-) y Enter Charge (+)
   Adjustment. Son los mismos formularios del Ledger, con la misma lógica (reparto del más viejo al más nuevo, Apply to,
   crédito sin aplicar), en un drawer con pasos (billing.md, 2026-11-13 y 2026-11-19). */

const [mes, dia, anio] = HOY_BILLING.split('/').map(Number)
const HOY = new Date(anio, mes - 1, dia)

export function PostPaymentDialog({
  tipoInicial, pacienteInicial, movs, aplicaciones = APLICACIONES_BILLING, alcanceGuarantor, onClose, onGuardar,
}: {
  tipoInicial: TipoAjusteBilling
  /** El paciente elegido en Billing: los botones sólo aparecen con uno. */
  pacienteInicial: string
  /** La actividad de la sesión (con lo ya posteado): de ahí salen los cargos abiertos. */
  movs: Movimiento[]
  aplicaciones?: Aplicacion[]
  /** Abre aplicando a todo el hogar (Guarantor View) en lugar de al paciente. */
  alcanceGuarantor?: boolean
  onClose: () => void
  onGuardar: (m: Omit<Movimiento, 'id'>, aplicado: Record<string, number>) => void
}) {
  /* El guarantor y los pacientes a su cargo, como red.dev. */
  const grupo = grupoDeGarante(pacienteInicial)
  const garante = grupo.find((p) => p.rol === 'Guarantor')?.nombre ?? pacienteInicial
  const dependientes = grupo.filter((p) => p.nombre !== garante).map((p) => p.nombre)
  const comun = {
    movs, aplicaciones, garante, dependientes, hoy: HOY, modo: 'drawer' as const, onCancelar: onClose, onGuardar,
    alcanceInicial: alcanceGuarantor ? ALCANCE_GUARANTOR : pacienteInicial,
  }
  if (tipoInicial === 'Patient Payment') return <PatientPaymentPanel {...comun} />
  if (tipoInicial === 'Credit Adjustment') return <CreditAdjustmentPanel {...comun} />
  return <ChargeAdjustmentPanel {...comun} providers={[...PROVIDERS_BILLING]} />
}
