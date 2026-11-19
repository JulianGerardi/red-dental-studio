import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { DrawerActions } from '@/components/ui/drawer'
import { useEffect, useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import {
  ModalShell, TextField, SelectField, TextArea, FieldLabel,
} from '@/components/patients/form'
import { DatePicker } from '@/components/ui/date-picker'
import { TransaccionesAbiertas, repartirPendiente, type CargoAbierto } from '@/components/billing/TransaccionesAbiertas'
import { moneda, pendienteDe, type Movimiento } from '@/data/ledger'
import {
  APLICACIONES_BILLING, cargosAbiertos, grupoDeGarante, HOY_BILLING, METODOS_PAGO, PROVIDERS_BILLING, TIPOS_AJUSTE_CARGO,
  TIPOS_AJUSTE_CREDITO, type TipoAjusteBilling,
} from '@/data/billing'
import { formatMDY } from '@/lib/fecha'
import { OBLIGATORIO } from '@/lib/validacion'
import { TARJETA_INTERNA } from '@/lib/estilos'
import { cn } from '@/lib/utils'

/* Cada botón de Billing y del Ledger abre su drawer, como red.dev: New Patient Payment (-), Credit Adjustment (-) y Enter
   Charge (+) Adjustment. Una sola página, sin pasos: la card de datos y, en el pago y el crédito, Ledger Transactions
   debajo (ledger.md y billing.md, 2026-11-19). */

const TITULO: Record<TipoAjusteBilling, string> = {
  'Patient Payment': 'New Patient Payment (-)',
  'Credit Adjustment': 'Credit Adjustment (-)',
  'Charge Adjustment': 'Enter Charge (+) Adjustment',
}
const SECCION: Record<TipoAjusteBilling, string> = {
  'Patient Payment': 'Payment Information',
  'Credit Adjustment': 'Credit Adjustment Information',
  'Charge Adjustment': 'Adjustment Information',
}
const REQUERIDO = OBLIGATORIO
const CHEQUE = 'Check Payment'

type Metodo = { id: number; monto: string; metodo: string; cheque: string; banco: string }
const filaVacia = (id: number, monto = '', metodo: string = METODOS_PAGO[0]): Metodo => ({ id, monto, metodo, cheque: '', banco: '' })
const [mes, dia, anio] = HOY_BILLING.split('/').map(Number)
const HOY = new Date(anio, mes - 1, dia)
/** Lo que falta de los cargos abiertos: el monto de arranque del pago (red.dev). */
const saldoDe = (cargos: CargoAbierto[]) => {
  const total = cargos.reduce((a, m) => a + m.pendiente, 0)
  return total > 0 ? total.toFixed(2) : ''
}
const rotuloMetodo = (f: Metodo) => (f.metodo === CHEQUE ? \`Check Payment #\${f.cheque}\` : f.metodo)

export function PostPaymentDialog({
  tipoInicial, pacienteInicial, personas: personasDadas, garante: garanteDado, cargosDe: cargosDados, providers = PROVIDERS_BILLING,
  hoy = HOY, onClose, onGuardar,
}: {
  tipoInicial: TipoAjusteBilling
  /** El paciente elegido en Billing o el del Ledger. */
  pacienteInicial?: string
  /** Apply to. Sin dato, el paciente y los demás de su garante en Billing. */
  personas?: string[]
  /** El garante del grupo: en un pago o un crédito se lee "(Guarantor)" y aplica a los cargos de todo el hogar (CON-4071). */
  garante?: string
  /** Los cargos abiertos de quien se elige en Apply to, con lo que falta de cada uno. */
  cargosDe?: (persona: string) => CargoAbierto[]
  providers?: readonly string[]
  /** La fecha de arranque de Transaction date. */
  hoy?: Date
  onClose: () => void
  /** El movimiento y, en un pago o un crédito, cuánto va a cada cargo. */
  onGuardar: (m: Omit<Movimiento, 'id'>, porCargo?: Record<string, number>) => void
}) {
  const tipo = tipoInicial
  const grupo = pacienteInicial ? grupoDeGarante(pacienteInicial) : []
  const personas = personasDadas ?? grupo.map((p) => p.nombre)
  const garante = garanteDado ?? grupo[0]?.garante
  /* Sin cargos de afuera (Billing), el garante ve los del grupo entero y cada paciente los suyos. */
  const deBilling = (p: string): CargoAbierto[] => cargosAbiertos(p)
    .map((m) => ({ ...m, pendiente: pendienteDe(m, APLICACIONES_BILLING) }))
    .filter((m) => m.pendiente > 0)
  const cargosDe = cargosDados ?? ((p: string) => (p === garante ? personas.flatMap(deBilling) : deBilling(p)))
  const inicial = pacienteInicial ?? personas[0] ?? ''
  /* El alcance (scope) sólo existe en un pago o un crédito; un Charge Adjustment es siempre de un paciente. */
  const conAlcance = tipo !== 'Charge Adjustment'
  const etiqueta = (p: string) => (conAlcance && p === garante ? \`\${p} (Guarantor)\` : p)

  const [fecha, setFecha] = useState<Date | null>(hoy)
  const [aplicaA, setAplicaA] = useState(inicial)
  /* El pago arranca con lo que falta de los cargos de quien se le aplica y Cash Payment, como red.dev. */
  const [metodos, setMetodos] = useState<Metodo[]>(() => [filaVacia(0, tipo === 'Patient Payment' ? saldoDe(cargosDe(inicial)) : '')])
  const [monto, setMonto] = useState('')
  /* Credit Adjustment arranca sin tipo, para elegirlo (red.dev); Charge Adjustment, con el primero. */
  const [ajuste, setAjuste] = useState<string>(tipo === 'Charge Adjustment' ? TIPOS_AJUSTE_CARGO[0] : '')
  const [provider, setProvider] = useState('')
  const [visita, setVisita] = useState('')
  const [notas, setNotas] = useState('')
  const [intentado, setIntentado] = useState(false)

  const cargos = cargosDe(aplicaA)
  /* Sin transacciones abiertas no hay a qué aplicar: el pago no muestra métodos y Save queda apagado (red.dev, ledger.md 2026-11-19). */
  const sinCargos = conAlcance && cargos.length === 0
  const total = tipo === 'Patient Payment' ? metodos.reduce((a, f) => a + (Number(f.monto) || 0), 0) : Number(monto) || 0
  /* Applied se reparte solo cuando cambia el monto o a quién se aplica; después se puede tocar fila por fila. */
  const [aplicado, setAplicado] = useState<Record<string, string>>(() => repartirPendiente(cargos, total))
  const claveCargos = cargos.map((m) => m.id).join()
  useEffect(() => { setAplicado(repartirPendiente(cargosDe(aplicaA), total)) }, [total, aplicaA, claveCargos])

  const cambiarAplicaA = (v: string) => {
    setAplicaA(v)
    if (tipo === 'Patient Payment' && metodos.length === 1) setMetodos((p) => [{ ...p[0], monto: saldoDe(cargosDe(v)) }])
  }
  const visitas = [...new Set(cargos.map((c) => \`Visit - \${c.fecha}\`))]
  const setFila = (id: number, cambios: Partial<Metodo>) => setMetodos((p) => p.map((f) => (f.id === id ? { ...f, ...cambios } : f)))

  const faltaAlgo = sinCargos || !fecha || !aplicaA || (tipo === 'Patient Payment'
    ? metodos.some((f) => !f.monto.trim() || (f.metodo === CHEQUE && (!f.cheque.trim() || !f.banco.trim())))
    : !monto.trim() || !ajuste)

  const guardar = () => {
    setIntentado(true)
    if (faltaAlgo || !fecha) return
    const base = {
      fecha: formatMDY(fecha), paciente: aplicaA, codigo: '—', estado: 'Posted' as const,
      ...(conAlcance && aplicaA === garante ? { alcance: 'guarantor' as const } : {}),
    }
    if (tipo === 'Charge Adjustment') {
      onGuardar({ ...base, descripcion: ajuste, tipo: 'Adjustment', provider: provider || 'Front desk', monto: total })
      return
    }
    /* Lo que cada cargo recibe; lo que sobra queda como crédito sin aplicar (CON-4073). */
    const porCargo = Object.fromEntries(
      Object.entries(aplicado).map(([id, v]) => [id, Number(v) || 0]).filter(([, v]) => (v as number) > 0),
    ) as Record<string, number>
    const sobra = Math.round((total - Object.values(porCargo).reduce((a, v) => a + v, 0)) * 100) / 100
    const credito = sobra > 0 ? { creditoDisponible: sobra } : {}
    if (tipo === 'Patient Payment') {
      /* Un pago en varios métodos es una sola transacción, como en CON-3753 ("Cash payment $100.00 + Card payment…"). */
      const descripcion = metodos.length === 1
        ? rotuloMetodo(metodos[0])
        : metodos.map((f) => \`\${rotuloMetodo(f)} \${moneda(Number(f.monto) || 0)}\`).join(' + ')
      onGuardar({
        ...base, ...credito, provider: 'Front desk', tipo: 'Payment', monto: -total, descripcion,
        metodos: metodos.map((f) => ({ metodo: f.metodo, monto: Number(f.monto) || 0, ...(f.metodo === CHEQUE ? { ref: \`#\${f.cheque}\` } : {}) })),
      }, porCargo)
      return
    }
    onGuardar({ ...base, ...credito, descripcion: ajuste, tipo: 'Adjustment', provider: 'Front desk', monto: -total }, porCargo)
  }

  const campoFecha = (
    <div className="flex flex-col gap-2">
      <FieldLabel required>Transaction date</FieldLabel>
      <DatePicker value={fecha} onChange={setFecha} className="h-9 w-full" error={intentado && !fecha ? true : undefined} />
    </div>
  )
  const campoAplica = (
    <SelectField
      label="Apply to" required options={personas.map(etiqueta)} value={aplicaA ? etiqueta(aplicaA) : ''}
      onChange={(v) => cambiarAplicaA(personas.find((p) => etiqueta(p) === v) ?? v)} error={intentado && !aplicaA ? REQUERIDO : undefined}
    />
  )
  const campoMonto = (
    <TextField label="Amount" required placeholder="$ 0.00" value={monto} onChange={setMonto} error={intentado && !monto.trim() ? REQUERIDO : undefined} />
  )
  const campoNotas = <TextArea label="Notes" placeholder="Add a note (optional)" value={notas} onChange={setNotas} rows={3} />
  const tituloSeccion = SECCION[tipo]

  return (
    <ModalShell
      title={TITULO[tipo]} onClose={onClose} width={tipo === 'Charge Adjustment' ? 'max-w-[860px]' : 'max-w-[1000px]'}
      actions={<DrawerActions onCancel={onClose} onSave={guardar} saveDisabled={sinCargos} />}
    >
      <div className="flex flex-col gap-6">
        {/* La card de datos con su título, sin el ícono de red.dev (pedido de Julián). */}
        <section aria-label={tituloSeccion} className={cn(TARJETA_INTERNA, 'flex flex-col gap-4 p-5')}>
          <h3 className="text-[15px] font-semibold text-ink">{tituloSeccion}</h3>

          {tipo === 'Charge Adjustment' && (
            <div className="grid gap-4 sm:grid-cols-3">
              {campoFecha}
              {campoMonto}
              <SelectField label="Type" required options={[...TIPOS_AJUSTE_CARGO]} value={ajuste} onChange={setAjuste} />
              <SelectField label="Provider" placeholder="Select" options={[...providers]} value={provider} onChange={setProvider} />
              {campoAplica}
              <SelectField label="Visit date" placeholder="Select" options={visitas} value={visita} onChange={setVisita} />
            </div>
          )}

          {tipo === 'Credit Adjustment' && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {campoFecha}
              {campoAplica}
              <SelectField
                label="Adjustment type" required placeholder="Select credit type" options={[...TIPOS_AJUSTE_CREDITO]}
                value={ajuste} onChange={setAjuste} error={intentado && !ajuste ? REQUERIDO : undefined}
              />
              {campoMonto}
            </div>
          )}

          {tipo === 'Patient Payment' && (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {campoFecha}
                {campoAplica}
              </div>
              {/* Cada método en su caja gris: + suma otro y − lo saca. Cheque pide número y banco (red.dev). */}
              {!sinCargos && metodos.map((f, i) => {
                const ultimo = i === metodos.length - 1
                return (
                  <div key={f.id} className="flex items-start gap-2 rounded-lg border border-line-row bg-surface-subtle p-3">
                    <div className={cn('grid flex-1 gap-4 sm:grid-cols-2', f.metodo === CHEQUE && 'lg:grid-cols-4')}>
                      <TextField
                        label="Amount" required placeholder="$ 0.00" value={f.monto} onChange={(v) => setFila(f.id, { monto: v })}
                        error={intentado && !f.monto.trim() ? REQUERIDO : undefined}
                      />
                      <SelectField label="Payment method" required options={[...METODOS_PAGO]} value={f.metodo} onChange={(v) => setFila(f.id, { metodo: v })} />
                      {f.metodo === CHEQUE && (
                        <>
                          <TextField label="Check" required placeholder="1234" value={f.cheque} onChange={(v) => setFila(f.id, { cheque: v })} error={intentado && !f.cheque.trim() ? REQUERIDO : undefined} />
                          <TextField label="Bank/Branch" required placeholder="AE9323AMB" value={f.banco} onChange={(v) => setFila(f.id, { banco: v })} error={intentado && !f.banco.trim() ? REQUERIDO : undefined} />
                        </>
                      )}
                    </div>
                    <div className="mt-6 flex shrink-0 gap-2">
                      {metodos.length > 1 && (
                        <button
                          type="button"
                          aria-label="Remove this payment method"
                          onClick={() => setMetodos((p) => p.filter((x) => x.id !== f.id))}
                          className="flex size-9 items-center justify-center rounded-md border border-line bg-white text-ink-muted hover:bg-dash-bad-bg hover:text-dash-bad-fg focus-visible:outline-2 focus-visible:outline-dash-ring"
                        >
                          <Minus className="size-4" />
                        </button>
                      )}
                      {ultimo && (
                        <button
                          type="button"
                          aria-label="Add another payment method"
                          onClick={() => setMetodos((p) => [...p, filaVacia(Math.max(...p.map((x) => x.id)) + 1, '0.00', CHEQUE)])}
                          className="flex size-9 items-center justify-center rounded-md border border-line bg-white text-ink-muted hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-dash-ring"
                        >
                          <Plus className="size-4" />
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </>
          )}

          {campoNotas}
        </section>

        {tipo !== 'Charge Adjustment' && (
          <TransaccionesAbiertas
            cargos={cargos}
            aplicado={aplicado}
            onAplicado={(id, v) => setAplicado((p) => ({ ...p, [id]: v }))}
            monto={total}
          />
        )}
      </div>
    </ModalShell>
  )
}
`})))()}export{n,i as r,r as t};