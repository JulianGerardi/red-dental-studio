import { useState } from 'react'
import { Plus, SearchX, Trash2, X } from 'lucide-react'
import { DrawerActions, DrawerSection, DrawerStep } from '@/components/ui/drawer'
import { ModalShell, SearchField, SelectField, TextArea, TextField } from '@/components/patients/form'
import { Button } from '@/components/ui/button'
import { Pill } from '@/components/ui/pill'
import { EmptyState } from '@/components/ui/empty-state'
import { SettingsSearch } from '@/components/settings/SettingsSearch'
import { OpcionDireccion } from '@/components/patients/AddRelationshipDrawer'
import { UnitField } from '@/components/finance/fields'
import { ICONO_SUELTO } from '@/lib/estilos'
import { cn } from '@/lib/utils'
import {
  OPCIONES_PROCEDIMIENTO, TIPOS_DEDUCIBLE, TIPOS_EXCEPCION, codigoDeOpcion, descripcionDe, opcionProcedimiento,
  type Excepcion, type TipoDeducible, type TipoExcepcion,
} from '@/data/finanzas'

/* Manage Exceptions (red.dev, Coverage Table): la lista de excepciones de la plantilla y, con Add new exception, un
   asistente de cuatro pasos en el mismo drawer. Cancel del asistente vuelve a la lista, como en red.dev. Cada excepción se
   guarda al terminar el asistente, sin esperar al Save de la tabla. Ver settings-billing.md. */

const PASOS = ['Exceptions Type', 'Select Procedure', 'Specify Options', 'Reason For Exception'] as const

/* La columna Description: lo que hace la excepción, en una línea. */
export function resumenExcepcion(e: Excepcion) {
  switch (e.tipo) {
    case 'Age limitation': {
      const fuera = e.opcionEdad === 'Downgrade' && e.rebajaA ? `downgrade to ${e.rebajaA}` : `${e.cobertura ?? 0}%`
      return `Ages ${e.edadMin ?? 0}–${e.edadMax ?? 0}; outside them, ${fuera}`
    }
    case 'Downgrade': return `Paid as ${e.rebajaA} – ${descripcionDe(e.rebajaA ?? '')}`
    case 'Frequency': return `${e.veces ?? 0} times over ${e.periodo ?? 0} months`
    default: return 'Not covered'
  }
}

type Borrador = Omit<Excepcion, 'id'>
const BORRADOR: Borrador = { tipo: 'Not covered', procedimientos: [], opcionEdad: 'Coverage', cobertura: 0, deducible: 'None', motivo: '' }

export function ExceptionsDrawer({ excepciones, onClose, onGuardar, agregando = false }: {
  excepciones: Excepcion[]
  onClose: () => void
  /** Se llama con la lista nueva al agregar o quitar una excepción. */
  onGuardar: (excepciones: Excepcion[], cambio: 'added' | 'removed') => void
  /** Abre directamente el asistente (para las stories). */
  agregando?: boolean
}) {
  const [modo, setModo] = useState<'lista' | 'asistente'>(agregando ? 'asistente' : 'lista')
  const [q, setQ] = useState('')
  const [paso, setPaso] = useState(0)
  const [b, setB] = useState<Borrador>(BORRADOR)
  const [busqueda, setBusqueda] = useState('')
  const [rebaja, setRebaja] = useState('')
  const [intentado, setIntentado] = useState(false)
  const set = <K extends keyof Borrador>(k: K, v: Borrador[K]) => setB((p) => ({ ...p, [k]: v }))

  const filas = excepciones.filter((e) => `${e.procedimientos.join(' ')} ${e.tipo} ${e.motivo}`.toLowerCase().includes(q.trim().toLowerCase()))

  /* Lo que falta en cada paso; Next no avanza hasta completarlo. */
  const faltas = [
    [],
    b.procedimientos.length ? [] : ['procedimientos'],
    b.tipo === 'Downgrade' || (b.tipo === 'Age limitation' && b.opcionEdad === 'Downgrade') ? (b.rebajaA ? [] : ['rebajaA'])
      : b.tipo === 'Frequency' ? ((b.veces ?? 0) > 0 && (b.periodo ?? 0) > 0 ? [] : ['frecuencia'])
        : b.tipo === 'Age limitation' && (b.edadMax ?? 0) < (b.edadMin ?? 0) ? ['edad'] : [],
    b.motivo.trim() ? [] : ['motivo'],
  ]
  const falta = (k: string) => intentado && faltas[paso].includes(k)

  const volverALista = () => { setModo('lista'); setPaso(0); setB(BORRADOR); setIntentado(false); setBusqueda(''); setRebaja('') }
  const siguiente = () => {
    if (faltas[paso].length) { setIntentado(true); return }
    setIntentado(false)
    setPaso((n) => n + 1)
  }
  const guardar = () => {
    if (faltas[paso].length) { setIntentado(true); return }
    const nueva: Excepcion = { ...b, id: `ex-${Date.now().toString(36)}`, motivo: b.motivo.trim() }
    onGuardar([...excepciones, nueva], 'added')
    volverALista()
  }

  const agregarProcedimiento = (v: string) => {
    setBusqueda(v)
    const codigo = codigoDeOpcion(v)
    if (!OPCIONES_PROCEDIMIENTO.includes(v) || b.procedimientos.includes(codigo)) return
    set('procedimientos', [...b.procedimientos, codigo])
    setBusqueda('')
  }
  const elegirRebaja = (v: string) => {
    setRebaja(v)
    set('rebajaA', OPCIONES_PROCEDIMIENTO.includes(v) ? codigoDeOpcion(v) : undefined)
  }

  if (modo === 'lista') {
    return (
      <ModalShell
        title="Manage exceptions for standard with exceptions"
        description="Manage exceptions for standard with exceptions"
        onClose={onClose}
        width="max-w-[720px]"
        footer={<Button variant="secondary" className="w-full" onClick={onClose}><X /> Cancel</Button>}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SettingsSearch value={q} onChange={setQ} placeholder="Search..." className="min-w-0 flex-1 sm:max-w-[260px]" />
          <Button variant="secondary" onClick={() => setModo('asistente')}><Plus /> Add new exception</Button>
        </div>
        <div role="table" aria-label="Exceptions" className="text-[13px]">
          <div role="row" className="hidden grid-cols-[150px_1fr_1fr_32px] gap-3 border-b border-line pb-2 text-xs font-medium text-ink-muted sm:grid">
            <span role="columnheader">Code, Exception</span>
            <span role="columnheader">Description</span>
            <span role="columnheader">Reason</span>
            <span role="columnheader" className="sr-only">Actions</span>
          </div>
          {filas.length === 0 ? (
            <EmptyState icon={SearchX} title={excepciones.length ? `No exceptions match “${q}”.` : 'No exceptions found in the system.'} className="py-10" />
          ) : filas.map((e) => (
            <div key={e.id} role="row" className="grid grid-cols-[1fr_32px] gap-x-3 gap-y-1 border-b border-line py-3 last:border-b-0 sm:grid-cols-[150px_1fr_1fr_32px]">
              <span role="cell" className="flex flex-col gap-1">
                <span className="font-medium text-ink tabular-nums">{e.procedimientos.join(', ')}</span>
                <Pill tone="info" className="self-start">{e.tipo}</Pill>
              </span>
              <span role="cell" className="col-start-1 text-ink-muted sm:col-start-auto">{resumenExcepcion(e)}</span>
              <span role="cell" className="col-start-1 text-ink-muted sm:col-start-auto">{e.motivo}</span>
              <span role="cell" className="col-start-2 row-start-1 flex justify-end sm:col-start-auto">
                <button type="button" aria-label={`Remove exception ${e.procedimientos.join(', ')}`} onClick={() => onGuardar(excepciones.filter((x) => x.id !== e.id), 'removed')} className={cn(ICONO_SUELTO, 'text-dash-bad-fg')}>
                  <Trash2 className="size-4" />
                </button>
              </span>
            </div>
          ))}
        </div>
      </ModalShell>
    )
  }

  return (
    <ModalShell
      title="Manage exceptions for standard with exceptions"
      description="Manage exceptions for standard with exceptions"
      onClose={onClose}
      width="max-w-[720px]"
      steps={PASOS}
      step={paso}
      actions={<DrawerActions step={paso} total={PASOS.length} onNext={siguiente} onBack={() => { setIntentado(false); setPaso((n) => n - 1) }} onCancel={volverALista} onSave={guardar} />}
    >
      <DrawerStep index={0} step={paso}>
        <DrawerSection title="Exception Type" description="Select the type of exception you want to create.">
          <div role="radiogroup" aria-label="Exception Type" className="flex flex-col gap-2">
            {TIPOS_EXCEPCION.map((t) => <OpcionDireccion key={t} texto={t} elegida={b.tipo === t} onElegir={() => set('tipo', t as TipoExcepcion)} />)}
          </div>
        </DrawerSection>
      </DrawerStep>

      <DrawerStep index={1} step={paso}>
        <DrawerSection title={`Add Procedures (${b.procedimientos.length})`} description={`Selected Exception Types: ${b.tipo}`}>
          <SearchField
            label="Add Procedure" placeholder="Search for CDT Code o Description" options={OPCIONES_PROCEDIMIENTO}
            value={busqueda} onChange={agregarProcedimiento}
            error={falta('procedimientos') ? 'Please add a procedure to the exception' : undefined}
          />
          <div className="flex flex-wrap gap-2">
            {b.procedimientos.map((c) => (
              <span key={c} className="inline-flex items-center gap-1 rounded-full bg-surface-muted py-1 pr-1 pl-2.5 text-xs text-ink">
                {opcionProcedimiento(c)}
                <button type="button" aria-label={`Remove ${c}`} onClick={() => set('procedimientos', b.procedimientos.filter((x) => x !== c))} className="flex size-5 items-center justify-center rounded-full hover:bg-line">
                  <X className="size-3" />
                </button>
              </span>
            ))}
          </div>
        </DrawerSection>
      </DrawerStep>

      <DrawerStep index={2} step={paso}>
        {b.tipo === 'Age limitation' && (
          <DrawerSection title="Age Limitation" description="Select the age limitation of the exception.">
            <div className="grid gap-4 sm:grid-cols-2">
              <UnitField label="Minimum age" unit="years" value={b.edadMin ?? 0} onChange={(n) => set('edadMin', n)} />
              <UnitField label="Maximum age" unit="years" value={b.edadMax ?? 0} onChange={(n) => set('edadMax', n)} error={falta('edad') ? 'The maximum age can’t be lower than the minimum.' : undefined} />
            </div>
            <div role="radiogroup" aria-label="Outside the ages" className="grid gap-2 sm:grid-cols-2">
              <OpcionDireccion texto="Coverage, %" elegida={b.opcionEdad === 'Coverage'} onElegir={() => set('opcionEdad', 'Coverage')} />
              <OpcionDireccion texto="Downgrade to" elegida={b.opcionEdad === 'Downgrade'} onElegir={() => set('opcionEdad', 'Downgrade')} />
            </div>
            {b.opcionEdad === 'Coverage' ? (
              <TextField label="Coverage, %" placeholder="0" value={String(b.cobertura ?? 0)} onChange={(v) => set('cobertura', Math.min(100, Number(v.replace(/\D/g, '')) || 0))} />
            ) : (
              <SearchField label="Downgrade to" placeholder="Search for CDT Code o Description" options={OPCIONES_PROCEDIMIENTO} value={rebaja} onChange={elegirRebaja} error={falta('rebajaA') ? 'Select the procedure it is paid as.' : undefined} />
            )}
            <SelectField label="Deductible Type" options={[...TIPOS_DEDUCIBLE]} value={b.deducible} onChange={(v) => set('deducible', v as TipoDeducible)} />
          </DrawerSection>
        )}
        {b.tipo === 'Downgrade' && (
          <DrawerSection title="Downgrade" description="Select the downgrade of the exception.">
            <SearchField label="Downgrade to" required placeholder="Search for CDT Code o Description" options={OPCIONES_PROCEDIMIENTO} value={rebaja} onChange={elegirRebaja} error={falta('rebajaA') ? 'Select the procedure it is paid as.' : undefined} />
          </DrawerSection>
        )}
        {b.tipo === 'Frequency' && (
          <DrawerSection title="Frequency" description="Select the frequency of the exception.">
            <div className="grid gap-4 sm:grid-cols-2">
              <UnitField label="How many times" unit="times" value={b.veces ?? 0} onChange={(n) => set('veces', n)} error={falta('frecuencia') && !(b.veces ?? 0) ? 'Enter how many times.' : undefined} />
              <UnitField label="Over the course of" unit="months" value={b.periodo ?? 0} onChange={(n) => set('periodo', n)} error={falta('frecuencia') && !(b.periodo ?? 0) ? 'Enter the period.' : undefined} />
            </div>
          </DrawerSection>
        )}
        {b.tipo === 'Not covered' && (
          <DrawerSection title="No covered option" description="There are no type specific options for Not covered type.">
            <span />
          </DrawerSection>
        )}
      </DrawerStep>

      <DrawerStep index={3} step={paso}>
        <DrawerSection title="Reason for exception" description="Select the reason for the exception.">
          <TextArea label="Reason for exception" required placeholder="Enter a reason for the exception" value={b.motivo} onChange={(v) => set('motivo', v)} error={falta('motivo') ? 'Enter the reason.' : undefined} />
        </DrawerSection>
      </DrawerStep>
    </ModalShell>
  )
}
