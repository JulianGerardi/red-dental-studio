import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { DrawerActions, DrawerStep } from '@/components/ui/drawer'
import { DatePicker } from '@/components/ui/date-picker'
import { FieldError, FieldLabel, ModalShell } from '@/components/patients/form'
import type { Aplicacion, Movimiento } from '@/data/ledger'
import {
  autoAplicar, cargosAbiertos, comoTexto, pacienteDeAlcance, resumenAplicacion,
} from '@/lib/ledgerAplicacion'

/* Lo que comparten Patient Payment, Credit Adjustment y Charge Adjustment, en el Ledger (pestañas) y en Billing (drawer):
   la misma lógica (CON-3738, CON-3739, CON-3735) y el mismo cuerpo, sólo cambia el contenedor. Ver ledger.md (2026-11-19). */

/** Lo que recibe cada formulario de la pantalla que lo abre. */
export type FormularioLedger = {
  /** Todos los movimientos de la cuenta: de ahí salen los cargos abiertos. */
  movs: Movimiento[]
  aplicaciones: Aplicacion[]
  /** El guarantor y los pacientes a su cargo: las opciones de Apply to. */
  garante: string
  dependientes: string[]
  /** La clave de Apply to con que abre (ALCANCE_GUARANTOR o un paciente); por defecto, el guarantor. */
  alcanceInicial?: string
  /** El día de hoy: la fecha con que abre la transacción y el límite de las futuras. */
  hoy?: Date
  /** Un solo movimiento y, si se aplicó algo, cuánto fue a cada cargo (id → monto). */
  onGuardar: (m: Omit<Movimiento, 'id'>, aplicado: Record<string, number>) => void
  onCancelar: () => void
  /** Los profesionales que se pueden elegir (Enter Charge (+) Adjustment). */
  providers?: string[]
}

/** Los cargos del alcance elegido y lo que se va aplicando: se reparten solos al cambiar el importe o el alcance. */
export function useAplicacion({ movs, aplicaciones, aplicaA, total, mensajeExceso }: {
  movs: Movimiento[]
  aplicaciones: Aplicacion[]
  aplicaA: string
  total: number
  mensajeExceso: string
}) {
  const paciente = pacienteDeAlcance(aplicaA)
  const cargos = useMemo(() => cargosAbiertos(movs, aplicaciones, paciente), [movs, aplicaciones, paciente])
  const [aplicado, setAplicado] = useState<Record<string, string>>(() => comoTexto(autoAplicar(cargos, total)))
  /* Al cambiar de alcance se recargan los cargos: un esqueleto breve, y Save espera (como red.dev). */
  const [cargando, setCargando] = useState(false)
  const primera = useRef(true)
  useEffect(() => {
    if (primera.current) { primera.current = false; return }
    setCargando(true)
    const t = setTimeout(() => setCargando(false), 450)
    return () => clearTimeout(t)
  }, [aplicaA])
  /* Cambió el importe o los cargos: se vuelve a repartir del más viejo al más nuevo; lo editado a mano se pisa. */
  const ids = cargos.map((c) => c.id).join()
  useEffect(() => { setAplicado(comoTexto(autoAplicar(cargos, total))) }, [total, ids]) // eslint-disable-line react-hooks/exhaustive-deps
  const resumen = resumenAplicacion(cargos, aplicado, total, mensajeExceso)
  return { cargos, cargando, aplicado, setLinea: (id: string, v: string) => setAplicado((p) => ({ ...p, [id]: v })), ...resumen }
}

/** Los campos en una sola fila, como red.dev (ledger.md, 2026-11-20): de a dos en una card angosta y en fila desde 672px. */
export const FILA: Record<2 | 3 | 4, string> = {
  2: 'grid gap-4 @md:grid-cols-2',
  3: 'grid gap-4 @md:grid-cols-2 @xl:grid-cols-3',
  4: 'grid gap-4 @md:grid-cols-2 @2xl:grid-cols-4',
}

/** Transaction date: la de hoy de entrada. */
export function CampoFecha({ value, onChange, error }: { value: Date | null; onChange: (d: Date | null) => void; error?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <FieldLabel required>Transaction date</FieldLabel>
      <DatePicker value={value} onChange={onChange} className="h-9 w-full" error={error ? true : undefined} />
      <FieldError>{error}</FieldError>
    </div>
  )
}

/** La card de datos de los tres drawers, con su título como red.dev (Payment Information, Credit Adjustment Information,
    Adjustment Information), sin el ícono ni el plegado de red.dev (pedido de Julián, ledger.md 2026-11-20). */
export function SeccionLedger({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section aria-label={titulo} data-campos="fila" className="@container flex flex-col gap-4 rounded-lg border border-line bg-white p-4 sm:p-5">
      <h3 className="text-sm font-bold text-ink">{titulo}</h3>
      {children}
    </section>
  )
}

/** El drawer: con título y el pie del sistema. Con \`pasos\`, la tabla de aplicación es el segundo paso; sin ellos, todo junto en
    un solo paso (Patient Payment, como red.dev); sin tabla, una sola sección (Charge Adjustment). */
export function ShellLedger({
  titulo, pasos, primero, segundo, validarPrimero, onGuardar, onCancelar, guardando,
}: {
  titulo: string
  /** Los nombres de los dos pasos; sin ellos, \`primero\` y \`segundo\` van juntos. */
  pasos?: [string, string]
  primero: ReactNode
  segundo?: ReactNode
  /** Antes de pasar al segundo paso: marca los errores y dice si se puede seguir. */
  validarPrimero?: () => boolean
  onGuardar: () => void
  onCancelar: () => void
  /** Save espera: se están cargando los cargos. */
  guardando?: boolean
}) {
  const [paso, setPaso] = useState(0)
  if (!segundo || !pasos) {
    return (
      <ModalShell
        title={titulo} onClose={onCancelar} width={segundo ? 'max-w-[1000px]' : undefined}
        actions={<DrawerActions onCancel={onCancelar} onSave={onGuardar} saveDisabled={guardando} />}
      >
        <div className="flex flex-col gap-6">{primero}{segundo}</div>
      </ModalShell>
    )
  }
  return (
    <ModalShell
      title={titulo} onClose={onCancelar} width="max-w-[1000px]" steps={pasos} step={paso}
      actions={(
        <DrawerActions
          step={paso} total={2} onBack={() => setPaso(0)} onCancel={onCancelar} saveDisabled={guardando}
          onNext={() => { if (!validarPrimero || validarPrimero()) setPaso(1) }}
          onSave={() => { if (validarPrimero && !validarPrimero()) { setPaso(0); return } onGuardar() }}
        />
      )}
    >
      <DrawerStep index={0} step={paso} className="flex flex-col gap-4">{primero}</DrawerStep>
      <DrawerStep index={1} step={paso}>{segundo}</DrawerStep>
    </ModalShell>
  )
}
`})))()}export{n,i as r,r as t};