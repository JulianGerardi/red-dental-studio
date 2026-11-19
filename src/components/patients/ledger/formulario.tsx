import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { SquareMinus, SquarePlus } from 'lucide-react'
import { DrawerActions, DrawerStep } from '@/components/ui/drawer'
import { DatePicker } from '@/components/ui/date-picker'
import { FieldError, FieldLabel, FormFooter, ModalShell } from '@/components/patients/form'
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
  /** Ledger: pestaña con tarjetas apiladas. Billing: drawer, con pasos si hay tabla de aplicación. */
  modo?: 'tab' | 'drawer'
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

/** Una sección del formulario: en la pestaña, una card con su título (se pliega con el cuadradito); en el drawer, sin caja. */
export function SeccionLedger({ titulo, modo, children }: { titulo: string; modo: 'tab' | 'drawer'; children: ReactNode }) {
  const [abierta, setAbierta] = useState(true)
  if (modo === 'drawer') return <div className="flex flex-col gap-4">{children}</div>
  const Icono = abierta ? SquareMinus : SquarePlus
  return (
    <div className="rounded-lg border border-line bg-white p-4 sm:p-5">
      <button
        type="button" aria-expanded={abierta} onClick={() => setAbierta((v) => !v)}
        className="flex items-center gap-2 rounded text-sm font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue"
      >
        <Icono aria-hidden className="size-5 text-ink-muted" strokeWidth={1.5} /> {titulo}
      </button>
      {/* Plegada se esconde y no se desmonta: lo tipeado se conserva. */}
      <div hidden={!abierta} className="mt-4 flex flex-col gap-4">{children}</div>
    </div>
  )
}

/** El contenedor: en la pestaña todo seguido con Cancel y Save al pie; en el drawer, con título, pasos y el pie del sistema. */
export function ShellLedger({
  modo = 'tab', titulo, pasos, primero, segundo, validarPrimero, onGuardar, onCancelar, guardando,
}: {
  modo?: 'tab' | 'drawer'
  titulo: string
  /** Los nombres de los pasos del drawer; sin ellos (Charge Adjustment) es un solo paso. */
  pasos?: [string, string]
  primero: ReactNode
  /** La tabla de aplicación: en la pestaña va debajo, en el drawer es el segundo paso. */
  segundo?: ReactNode
  /** Antes de pasar al segundo paso: marca los errores y dice si se puede seguir. */
  validarPrimero?: () => boolean
  onGuardar: () => void
  onCancelar: () => void
  /** Save espera: se están cargando los cargos. */
  guardando?: boolean
}) {
  const [paso, setPaso] = useState(0)
  if (modo === 'tab') {
    return (
      <div className="flex flex-col gap-4">
        {primero}
        {segundo}
        <div className="flex justify-end gap-3"><FormFooter onCancel={onCancelar} onSave={onGuardar} saveDisabled={guardando} /></div>
      </div>
    )
  }
  if (!pasos || !segundo) {
    return (
      <ModalShell title={titulo} onClose={onCancelar} actions={<DrawerActions onCancel={onCancelar} onSave={onGuardar} />}>
        {primero}
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
