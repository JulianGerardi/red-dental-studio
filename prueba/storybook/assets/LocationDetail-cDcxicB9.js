import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { Tabs } from '@/components/ui/tabs'
import { Pill } from '@/components/ui/pill'
import { PageTitle } from '@/components/ui/page-title'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Chip, ChipMas } from '@/components/ui/chip'
import { useParams, useSearchParams } from 'react-router-dom'
import { Pencil, DoorOpen, Plus, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EmptyState } from '@/components/ui/empty-state'
import { ICONO_SUELTO, PADDING_PAGINA } from '@/lib/estilos'
import { Button } from '@/components/ui/button'
import { aviso } from '@/components/ui/toaster'
import { Card } from '@/components/settings/primitives'
import {
  CountryCodeField, SelectField, TextField, FormFooter,
} from '@/components/patients/form'
import {
  PAISES, CODIGOS, ESTADOS, ZONAS, FEES,
} from '@/data/location-options'
import { LocationHoursModal, aMinutos, deChip } from '@/components/settings/LocationHoursModal'
import { HoursAppointmentsDialog, HoursBlockedDialog } from '@/components/settings/HoursAppointmentsDialog'
import { NewRoomModal } from '@/components/settings/NewRoomModal'
import { NewAppointmentModal, type DatosTurno } from '@/components/scheduling/NewAppointmentModal'
import { formatDMY } from '@/components/ui/date-picker'
import { NewExceptionModal } from '@/components/settings/NewExceptionModal'
import { LOCACIONES } from '@/pages/settings/Locations'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { LocationBillingProfile } from '@/components/settings/LocationBillingProfile'
import { LocationInsuranceDefaults } from '@/components/settings/LocationInsuranceDefaults'
import { hora24 } from '@/components/scheduling/AppointmentSlotPicker'
import {
  HORARIO_SEMANAL, SALAS_INICIALES, EXCEPCIONES_INICIALES, TURNOS_LOCACION, type TurnoLocacion, type EstadoDia,
  type Sala, type TurnoSala, type Excepcion,
} from '@/data/location-detail'
import { formatMDY } from '@/lib/fecha'

/* Figma 3864:277885 "Settings — Location": Information / Working Hours /
   Rooms / Exceptions. Reemplaza lo que había antes en esta ruta —la ficha de
   un empleado, que no correspondía acá y se mudó a Settings → Employees. */

const TABS = ['Information', 'Working hours', 'Rooms', 'Exceptions', 'Insurance / billing profile', 'Insurance defaults'] as const
type Tab = (typeof TABS)[number]
/* La pestaña va en la URL como en red.dev (\`?type=rooms\`), así un link abre la pestaña justa. */
const TIPO_URL: Record<Tab, string> = {
  Information: 'information', 'Working hours': 'working-hours', Rooms: 'rooms', Exceptions: 'exceptions',
  'Insurance / billing profile': 'billing-profile', 'Insurance defaults': 'insurance-defaults',
}

const DIAS: [string, string][] = [
  ['Sunday', 'Sunday'], ['Monday', 'Monday'], ['Tuesday', 'Tuesday'],
  ['Wednesday', 'Wednesday'], ['Thursday', 'Thursday'], ['Friday', 'Friday'], ['Saturday', 'Saturday'],
]

export function SwitchOpenClose({ on, onChange, labels = ['Open', 'Close'], label }: {
  on: boolean
  onChange: (v: boolean) => void
  /** Rótulo prendido / apagado; Rooms usa Active / Inactive. */
  labels?: [string, string]
  /** Nombre para lectores de pantalla cuando el rótulo solo no alcanza. */
  label?: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className="flex items-center gap-2 text-[13px]"
    >
      <span className={cn('flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors', on ? 'bg-dash-blue' : 'bg-line-strong')}>
        <span className={cn('size-4 rounded-full bg-surface transition-transform', on && 'translate-x-4')} />
      </span>
      {/* Azul, no verde: el switch ya es azul cuando está en Open, y el
          texto va del mismo color en vez de meter un segundo significado
          -verde- que el resto del sistema reserva para "Active"/"Completado". */}
      <span className={cn('font-medium', on ? 'text-dash-blue' : 'text-ink-muted')}>{on ? labels[0] : labels[1]}</span>
    </button>
  )
}

export function InformationTab({ nombreLocacion }: { nombreLocacion: string }) {
  const [d, setD] = useState({
    nombre: nombreLocacion, abrev: '', fee: '',
    codigo: CODIGOS[0], numero: '', email: '',
    linea1: '', linea2: '', ciudad: '', estado: '', zip: '', pais: '', zona: '',
  })
  const set = (k: keyof typeof d) => (v: string) => setD((p) => ({ ...p, [k]: v }))

  return (
    <div className="flex flex-col gap-4">
      <Card title="General information">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Location name" required value={d.nombre} onChange={set('nombre')} />
          <TextField label="Abbreviation" required placeholder="Placeholder" value={d.abrev} onChange={set('abrev')} />
          <SelectField label="Preferred location fee schedule" options={FEES} value={d.fee} onChange={set('fee')} />
        </div>
      </Card>

      <Card title="Contact information">
        <div className="grid gap-4 sm:grid-cols-2">
          <CountryCodeField required value={d.codigo} onChange={set('codigo')} />
          <TextField label="Number" required placeholder="Placeholder" value={d.numero} onChange={set('numero')} />
        </div>
        <TextField className="mt-4 sm:w-1/2 sm:pr-2" label="Email" placeholder="Placeholder" value={d.email} onChange={set('email')} />
      </Card>

      {/* "Address information" es del Figma. */}
      <Card title="Address information">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Address line 1" required placeholder="Select" value={d.linea1} onChange={set('linea1')} />
          <TextField label="Address line 2" required placeholder="Select" value={d.linea2} onChange={set('linea2')} />
          <SelectField label="City" required options={['Los Angeles', 'Miami', 'Seattle']} value={d.ciudad} onChange={set('ciudad')} />
          <SelectField label="State" required options={ESTADOS} value={d.estado} onChange={set('estado')} />
          <TextField label="ZIP code" required placeholder="Select" value={d.zip} onChange={set('zip')} />
          <SelectField label="Country" required options={PAISES} value={d.pais} onChange={set('pais')} />
        </div>
        <SelectField className="mt-4 sm:w-1/2 sm:pr-2" label="Time zone" required options={ZONAS} value={d.zona} onChange={set('zona')} />
      </Card>

      <div className="flex justify-end gap-3">
        <FormFooter onCancel={() => aviso.info('Changes discarded.')} onSave={() => aviso.ok('Location information saved.')} />
      </div>
    </div>
  )
}

/* Un turno de una hora tiene cobertura si cabe entero en alguna franja. */
const cubre = (t: TurnoLocacion, rangos: string[]) => {
  const m = t.fecha.getHours() * 60 + t.fecha.getMinutes()
  return rangos.some((r) => {
    const [a, b] = r.split(' - ').map((h) => aMinutos(deChip(h)))
    return a <= m && m + 60 <= b
  })
}

/* Un cambio de Working Hours: el panel (Save), borrar una franja con la ✕ o cerrar un día con el switch. \`rangos\` son las
   franjas que quedan abiertas en \`dias\` (ninguna al cerrar). Ver locations.md, 2026-11-16 (CON-4165, CON-4166, CON-4167). */
type Operacion = { tipo: 'panel' | 'quitar' | 'cerrar'; dias: number[]; rangos: string[]; quitada?: string }

/* Pierde cobertura: su día entra en el cambio, antes estaba Open y lo cubría, y después no. Si ya estaba afuera, no
   cuenta (CON-4167, Detección 4). */
const pierde = (t: TurnoLocacion, antes: Record<string, EstadoDia>, op: Operacion) => {
  const d = t.fecha.getDay()
  if (!op.dias.includes(d)) return false
  const previo = antes[DIAS[d][0]]
  return previo.abierto && cubre(t, previo.rangos) && !cubre(t, op.rangos)
}
const pendiente = (t: TurnoLocacion) => t.estado === 'Proposed' || t.estado === 'Booked'
const enCurso = (t: TurnoLocacion) => t.estado === 'Check in' || t.estado === 'In progress'

/* Las franjas de un día en una línea: entran todas las que caben junto a Edit hours y el resto queda en "+N", que las
   despliega. Se mide en una capa invisible y se recalcula al cambiar el ancho. Ver locations.md, 2026-11-16. */
export function FranjasDia({ label, rangos, onQuitar, onEditar }: {
  label: string
  rangos: string[]
  onQuitar: (i: number) => void
  onEditar: () => void
}) {
  const caja = useRef<HTMLDivElement>(null)
  const muestra = useRef<HTMLDivElement>(null)
  const [entran, setEntran] = useState(rangos.length)
  const [abierto, setAbierto] = useState(false)

  useLayoutEffect(() => {
    const el = caja.current
    const m = muestra.current
    if (!el || !m) return
    const calcular = () => {
      const gap = parseFloat(getComputedStyle(m).columnGap) || 0
      const hijos = [...m.children] as HTMLElement[]
      const editar = hijos[hijos.length - 1].offsetWidth
      const mas = hijos[hijos.length - 2].offsetWidth
      const chips = hijos.slice(0, -2).map((h) => h.offsetWidth)
      let n = chips.length
      for (; n > 0; n -= 1) {
        const ocupado = chips.slice(0, n).reduce((a, w) => a + w + gap, 0) + (n < chips.length ? mas + gap : 0) + editar
        if (ocupado <= el.clientWidth) break
      }
      setEntran(n)
    }
    calcular()
    const ro = new ResizeObserver(calcular)
    ro.observe(el)
    return () => ro.disconnect()
  }, [rangos])

  const visibles = abierto ? rangos.length : entran
  const ocultas = rangos.length - visibles
  const chip = (r: string, i: number) => (
    <Chip key={i} removeLabel={\`Remove \${r} on \${label}\`} onRemove={() => onQuitar(i)}>{r}</Chip>
  )
  const editar = (
    <button
      type="button"
      onClick={onEditar}
      aria-label={\`Edit hours on \${label}\`}
      className="text-dash-blue flex shrink-0 items-center gap-1 text-[12px] font-semibold hover:underline"
    >
      <Pencil className="size-3" /> Edit hours
    </button>
  )
  const mas = (n: number, onClick?: () => void) => <ChipMas n={n} label={\`Show \${n} more hours on \${label}\`} onClick={onClick} />

  return (
    <div ref={caja} className="relative col-span-2 min-w-0 sm:col-span-1">
      <div className={cn('flex items-center gap-2', abierto ? 'flex-wrap' : 'flex-nowrap')}>
        {rangos.slice(0, visibles).map(chip)}
        {ocultas > 0 && mas(ocultas, () => setAbierto(true))}
        {editar}
      </div>
      {/* Copia invisible con todo en una línea: de acá salen los anchos. */}
      <div ref={muestra} aria-hidden className="pointer-events-none invisible absolute top-0 left-0 flex gap-2 whitespace-nowrap">
        {rangos.map(chip)}
        {mas(rangos.length)}
        {editar}
      </div>
    </div>
  )
}

/* Un día sólo queda Open con al menos una franja: activar el switch abre "Set working hours" (con las franjas que
   conservó al cerrarse) y se abre recién al guardar. Borrar una franja (✕) o cerrar un día (switch) pregunta antes, y
   todo cambio pasa por las citas afectadas (HoursAppointmentsDialog) o se frena si alguna está en curso. Ver
   figma/modulos/locations.md (2026-11-06 y 2026-11-16; CON-1546, CON-4164 a CON-4167). */
export function WorkingHoursTab() {
  const [horario, setHorario] = useState(HORARIO_SEMANAL)
  const [modal, setModal] = useState<string | null>(null)
  const [turnos, setTurnos] = useState(TURNOS_LOCACION)
  const [pregunta, setPregunta] = useState<Operacion | null>(null)
  const [resolver, setResolver] = useState<Operacion | null>(null)
  const [bloqueo, setBloqueo] = useState<TurnoLocacion[] | null>(null)

  const nombre = (i: number) => DIAS[i][1]
  const afectados = resolver ? turnos.filter((t) => pendiente(t) && pierde(t, horario, resolver)) : []

  /* Si no queda ninguna cita afectada, se vuelve a la acción de origen sin mover nada a Waiting List (CON-4167). */
  useEffect(() => {
    if (!resolver || afectados.length) return
    setResolver(null)
    if (resolver.tipo !== 'panel') setPregunta(resolver)
  }, [resolver, afectados.length])

  /* Aplica el cambio a la tabla. Borrar o cerrar avisa con Undo; el panel avisa por su cuenta. */
  const aplicar = (op: Operacion, movidos: string[]) => {
    const [antesHorario, antesTurnos] = [horario, turnos]
    const key = DIAS[op.dias[0]][0]
    setHorario((p) => {
      const q = { ...p }
      for (const i of op.dias) {
        const k = DIAS[i][0]
        q[k] = op.tipo === 'cerrar' ? { abierto: false, rangos: p[k].rangos } : { abierto: op.rangos.length > 0, rangos: op.rangos }
      }
      return q
    })
    if (movidos.length) setTurnos((p) => p.map((t) => (movidos.includes(t.id) ? { ...t, estado: 'Waiting list' } : t)))
    const espera = movidos.length ? \` \${movidos.length} \${movidos.length === 1 ? 'appointment was' : 'appointments were'} moved to the waiting list.\` : ''
    if (op.tipo === 'panel') {
      if (movidos.length) aviso.ok(\`\${op.dias.length === 1 ? \`Hours saved for \${nombre(op.dias[0])}.\` : \`Hours saved for \${op.dias.length} days.\`}\${espera}\`)
      return
    }
    const texto = op.tipo === 'cerrar'
      ? \`\${nombre(op.dias[0])} is now closed.\`
      : \`Working hours deleted from \${nombre(op.dias[0])}.\${op.rangos.length ? '' : \` \${nombre(op.dias[0])} is now closed.\`}\`
    aviso.ok(\`\${texto}\${espera}\`, { label: 'Undo', onClick: () => { setHorario({ ...antesHorario, [key]: antesHorario[key] }); setTurnos(antesTurnos) } })
  }

  /* Revisa el impacto: citas en curso → se frena todo; citas afectadas → se resuelven antes; si no, se aplica. */
  const ejecutar = (op: Operacion) => {
    const afectan = turnos.filter((t) => (pendiente(t) || enCurso(t)) && pierde(t, horario, op))
    const frenan = afectan.filter(enCurso)
    if (frenan.length) { setBloqueo(frenan); return false }
    if (afectan.length) { setResolver(op); return false }
    aplicar(op, [])
    return true
  }

  const confirmarTurnos = () => {
    if (!resolver) return
    aplicar(resolver, afectados.map((t) => t.id))
    if (resolver.tipo === 'panel') setModal(null)
    setResolver(null)
  }

  /* Textos de CON-4165 y CON-4166; si el cambio deja la locación sin horarios, se dice en la misma pregunta. */
  const textoPregunta = (op: Operacion) => {
    const dia = nombre(op.dias[0])
    const otrosAbiertos = DIAS.some(([k], i) => i !== op.dias[0] && horario[k].abierto)
    const sinHorarios = !otrosAbiertos && op.rangos.length === 0 ? ' The location will have no working hours.' : ''
    if (op.tipo === 'cerrar') return \`This will close the location every \${dia}.\${sinHorarios} Do you want to continue?\`
    const [desde, hasta] = (op.quitada ?? '').split(' - ')
    const cierra = op.rangos.length === 0 ? \` \${dia} will be closed.\` : ''
    return \`This will delete the working hours from \${desde} to \${hasta} on \${dia}.\${cierra}\${sinHorarios} Do you want to continue?\`
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <div className="grid grid-cols-[1fr_auto] gap-3 border-b border-line bg-surface-alt px-4 py-3 text-xs font-semibold text-ink-muted sm:grid-cols-[140px_140px_1fr]">
        <span>Day</span>
        <span>Status</span>
        <span className="max-sm:hidden">Hours</span>
      </div>
      {DIAS.map(([key, label], indice) => {
        const dia = horario[key]
        return (
          <div
            key={key}
            className={cn(
              /* En celular, día y switch arriba y las franjas debajo a todo el ancho. */
              'grid grid-cols-[1fr_auto] items-center gap-3 border-b border-line-soft px-4 py-3 last:border-0 sm:grid-cols-[140px_140px_1fr]',
              !dia.abierto && 'bg-surface-subtle',
            )}
          >
            <span className="text-[13px] font-semibold text-ink">{label}</span>
            <SwitchOpenClose
              on={dia.abierto}
              label={\`\${label} open\`}
              onChange={(v) => (v ? setModal(key) : setPregunta({ tipo: 'cerrar', dias: [indice], rangos: [] }))}
            />
            {dia.abierto ? (
              <FranjasDia
                label={label}
                rangos={dia.rangos}
                onEditar={() => setModal(key)}
                onQuitar={(i) => setPregunta({ tipo: 'quitar', dias: [indice], rangos: dia.rangos.filter((_, j) => j !== i), quitada: dia.rangos[i] })}
              />
            ) : (
              <span className="col-span-2 text-[12px] text-ink-faint sm:col-span-1">Closed all day.</span>
            )}
          </div>
        )
      })}

      {modal && (
        <LocationHoursModal
          dia={DIAS.findIndex(([key]) => key === modal)}
          iniciales={horario[modal].rangos}
          horario={DIAS.map(([key]) => horario[key])}
          onClose={() => setModal(null)}
          onGuardar={(dias, rangos) => ejecutar({ tipo: 'panel', dias, rangos })}
        />
      )}

      {pregunta && (
        <ConfirmDialog
          tone="danger"
          icon={pregunta.tipo === 'quitar' ? 'delete' : undefined}
          title={pregunta.tipo === 'quitar' ? 'Delete working hours?' : 'Close working hours?'}
          confirmLabel="Confirm"
          onCancel={() => setPregunta(null)}
          onConfirm={() => { const op = pregunta; setPregunta(null); ejecutar(op) }}
        >
          {textoPregunta(pregunta)}
        </ConfirmDialog>
      )}

      {resolver && afectados.length > 0 && (
        <HoursAppointmentsDialog
          afectados={afectados}
          fueraDeHorario={(t) => pierde(t, horario, resolver)}
          operatorios={SALAS_INICIALES.filter((s) => s.activa).map((s) => s.nombre)}
          onCambiar={(t) => setTurnos((p) => p.map((x) => (x.id === t.id ? t : x)))}
          onCancel={() => setResolver(null)}
          onConfirm={confirmarTurnos}
        />
      )}

      {bloqueo && <HoursBlockedDialog turnos={bloqueo} onClose={() => setBloqueo(null)} />}
    </div>
  )
}

/* Rooms (CON-404, CON-1581…1584, CON-1520), con la caja de Working Hours. Desactivar una sala con turnos los muestra:
   cada uno se edita aparte (Edit Appointment, para cambiarle la sala) y Confirm cancela los que quedan y los pasa a la
   lista de espera. Dejar la locación sin salas activas también se pregunta. Ver figma/modulos/locations.md. */
/* Exceptions usa la misma caja que Rooms (locations.md, 2026-11-20). */
/* Columnas de datos del mismo ancho, como las demás tablas; las acciones al final en 160 px, el mismo en el encabezado y las filas (locations.md, 2026-11-25). */
const FILA_EXCEPCION = 'grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 px-4 lg:grid-cols-[repeat(3,minmax(0,1fr))_160px]'
const FILA_SALA = 'grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 px-4 lg:grid-cols-[repeat(4,minmax(0,1fr))_160px]'
const fechaTurno = (d: Date) =>
  d.toLocaleString('en-US', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })
/* Las horas del drawer de turnos ("09 AM", "02 PM"): la agenda va de hora en hora. */
const horaTurno = (h: number) => \`\${String(h % 12 || 12).padStart(2, '0')} \${h < 12 ? 'AM' : 'PM'}\`
const fechaDeDrawer = (d: DatosTurno) => {
  const [dd, mm, yyyy] = (d.date ?? '').split('-').map(Number)
  return new Date(yyyy, mm - 1, dd, hora24(d.start))
}

export function RoomsTab() {
  const [salas, setSalas] = useState<Sala[]>(SALAS_INICIALES)
  const [modal, setModal] = useState<'nueva' | Sala | false>(false)
  const [baja, setBaja] = useState<Sala | null>(null)
  /* El turno que se edita desde el aviso: mientras el drawer está abierto, el aviso se esconde. */
  const [turno, setTurno] = useState<TurnoSala | null>(null)

  const reemplazar = (s: Sala) => setSalas((p) => (p.some((x) => x.id === s.id) ? p.map((x) => (x.id === s.id ? s : x)) : [...p, s]))
  const ultimaActiva = (s: Sala) => !salas.some((x) => x.id !== s.id && x.activa)

  /* Todo cambio pasa por acá: si apaga una sala con turnos o la última activa, primero se pregunta. */
  const aplicar = (s: Sala) => {
    const antes = salas.find((x) => x.id === s.id)
    if (antes?.activa && !s.activa && (s.turnos.length > 0 || ultimaActiva(s))) return setBaja(s)
    reemplazar(s)
    if (!antes) aviso.ok(\`\${s.nombre} was added to Rooms.\`)
    else if (antes.activa !== s.activa) aviso.ok(\`\${s.nombre} is now \${s.activa ? 'active' : 'inactive'}.\`, { label: 'Undo', onClick: () => reemplazar(antes) })
    else aviso.ok(\`\${s.nombre} was updated.\`)
  }

  const confirmarBaja = () => {
    if (!baja) return
    const antes = salas.find((x) => x.id === baja.id)!
    const n = baja.turnos.length
    reemplazar({ ...baja, turnos: [] })
    aviso.ok(
      n
        ? \`\${baja.nombre} is now inactive. \${n} appointment\${n > 1 ? 's were' : ' was'} cancelled and moved to the waiting list.\`
        : \`\${baja.nombre} is now inactive.\`,
      { label: 'Undo', onClick: () => reemplazar(antes) },
    )
    setBaja(null)
  }

  /* Guardar el turno: si cambió de sala sale de los afectados y pasa a esa sala; si no, queda con su fecha nueva. */
  const guardarTurno = (d: DatosTurno) => {
    if (!baja || !turno) return
    const nuevo = { ...turno, fecha: fechaDeDrawer(d), provider: d.primary || turno.provider }
    const otra = salas.find((x) => x.nombre === d.operatory && x.id !== baja.id)
    const turnos = otra ? baja.turnos.filter((t) => t.id !== turno.id) : baja.turnos.map((t) => (t.id === turno.id ? nuevo : t))
    setBaja({ ...baja, turnos })
    setSalas((p) => p.map((x) =>
      x.id === baja.id ? { ...x, turnos } : otra && x.id === otra.id ? { ...x, turnos: [...x.turnos, nuevo] } : x))
    if (!otra) return false
    aviso.ok(\`Appointment for \${turno.paciente} moved to \${otra.nombre}.\`)
    return true
  }

  const borrar = (s: Sala) => {
    const indice = salas.findIndex((x) => x.id === s.id)
    setSalas((p) => p.filter((x) => x.id !== s.id))
    aviso.ok(\`\${s.nombre} was deleted.\`, { label: 'Undo', onClick: () => setSalas((p) => [...p.slice(0, indice), s, ...p.slice(indice)]) })
  }

  return (
    <>
      <div className="mb-3 flex justify-end">
        <Button onClick={() => setModal('nueva')}><Plus /> New room</Button>
      </div>
      {/* Misma caja que Working Hours: encabezado gris, switch en la fila y la inactiva en gris. */}
      <div className="overflow-hidden rounded-xl border border-line bg-surface">
        <div className={cn(FILA_SALA, 'border-b border-line bg-surface-alt py-3 text-xs font-semibold text-ink-muted max-lg:hidden')}>
          <span>Room</span>
          <span>Abbreviation</span>
          <span>Type</span>
          <span>Status</span>
          <span className="sr-only">Actions</span>
        </div>
        {salas.length === 0 && (
          <EmptyState icon={DoorOpen} title="No rooms yet" detail="Add the rooms of this location so they can be booked for appointments." className="border-0 py-16" />
        )}
        {salas.map((s) => (
          <div key={s.id} className={cn(FILA_SALA, 'border-b border-line-soft py-3 last:border-0', !s.activa && 'bg-surface-subtle')}>
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-semibold text-ink">{s.nombre}</span>
              <span className="block text-[12px] text-ink-muted lg:hidden">{[s.tipo, s.abreviatura].filter(Boolean).join(' · ')}</span>
            </span>
            <span className="text-[13px] text-ink-soft max-lg:hidden">{s.abreviatura || '-'}</span>
            <span className="text-[13px] text-ink-soft max-lg:hidden">{s.tipo}</span>
            <SwitchOpenClose on={s.activa} onChange={(v) => aplicar({ ...s, activa: v })} labels={['Active', 'Inactive']} label={\`\${s.nombre} active\`} />
            <span className="flex items-center justify-end gap-1">
              <button
                type="button"
                onClick={() => setModal(s)}
                aria-label={\`Edit \${s.nombre}\`}
                className="text-dash-blue flex min-h-8 items-center gap-1 px-1 text-[12px] font-semibold hover:underline"
              >
                <Pencil className="size-3" /> <span className="max-lg:hidden">Edit room</span>
              </button>
              <button type="button" aria-label={\`Delete \${s.nombre}\`} onClick={() => borrar(s)} className={cn(ICONO_SUELTO, 'text-dash-bad-fg')}>
                <Trash2 className="size-4" />
              </button>
            </span>
          </div>
        ))}
      </div>

      {modal && (
        <NewRoomModal
          inicial={modal === 'nueva' ? undefined : modal}
          nombresUsados={salas.filter((x) => modal === 'nueva' || x.id !== modal.id).map((x) => x.nombre)}
          onClose={() => setModal(false)}
          onGuardar={aplicar}
        />
      )}

      {baja && turno && (
        <NewAppointmentModal
          edicion
          pestanaInicial="Schedule"
          inicial={{
            patient: turno.paciente, primary: turno.provider, date: formatDMY(turno.fecha),
            start: horaTurno(turno.fecha.getHours()), end: horaTurno(turno.fecha.getHours() + 1),
            operatory: baja.nombre, status: 'Booked',
          }}
          operatorios={salas.filter((x) => x.activa && x.id !== baja.id).map((x) => x.nombre)}
          onGuardar={guardarTurno}
          onClose={() => setTurno(null)}
        />
      )}

      {baja && !turno && (
        <ConfirmDialog
          icon="warning"
          tone="danger"
          title={baja.turnos.length ? 'This room has scheduled appointments' : ultimaActiva(baja) ? 'Deactivate all rooms?' : \`Deactivate \${baja.nombre}?\`}
          confirmLabel={baja.turnos.length ? 'Confirm' : ultimaActiva(baja) ? 'Continue' : 'Deactivate'}
          onCancel={() => setBaja(null)}
          onConfirm={confirmarBaja}
        >
          {baja.turnos.length > 0 ? (
            <>
              <p>
                There are scheduled appointments assigned to {baja.nombre}. You can review and manage each appointment
                individually or confirm to move all of them to the waiting list.
              </p>
              <p className="mt-3 font-semibold text-ink">Affected appointments ({baja.turnos.length})</p>
              <ul className="mt-1.5 flex max-h-52 flex-col gap-2 overflow-y-auto">
                {baja.turnos.map((t) => (
                  <li key={t.id} className="flex items-start justify-between gap-3 leading-snug">
                    <span>
                      <span className="block font-medium text-ink tabular-nums">{fechaTurno(t.fecha)}</span>
                      {t.provider} · Patient: {t.paciente}
                    </span>
                    <button
                      type="button"
                      onClick={() => setTurno(t)}
                      aria-label={\`Edit appointment for \${t.paciente}\`}
                      className="text-dash-blue flex min-h-8 shrink-0 items-center gap-1 text-[12px] font-semibold hover:underline"
                    >
                      <Pencil className="size-3" /> Edit<span className="max-sm:hidden"> appointment</span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : !ultimaActiva(baja) && (
            <p>Its appointments were moved. {baja.nombre} won&apos;t be offered for new appointments.</p>
          )}
          {ultimaActiva(baja) && (
            <p className={cn(baja.turnos.length > 0 && 'mt-3')}>
              {baja.nombre} is the last active room. New appointments can&apos;t be booked at this location until you
              activate a room again.
            </p>
          )}
        </ConfirmDialog>
      )}
    </>
  )
}

export function ExceptionsTab() {
  const [excepciones, setExcepciones] = useState<Excepcion[]>(EXCEPCIONES_INICIALES)
  const [modal, setModal] = useState<'nueva' | Excepcion | null>(null)

  const borrar = (e: Excepcion) => {
    const indice = excepciones.findIndex((x) => x.id === e.id)
    setExcepciones((p) => p.filter((x) => x.id !== e.id))
    aviso.ok(\`\${e.nombre} was removed.\`, {
      label: 'Undo',
      onClick: () => setExcepciones((p) => [...p.slice(0, indice), e, ...p.slice(indice)]),
    })
  }

  return (
    <>
      {/* El diseño de Rooms y Working hours: botón arriba, caja con encabezado gris y una fila por excepción
          (locations.md, 2026-11-20). */}
      <div className="mb-3 flex justify-end">
        <Button onClick={() => setModal('nueva')}><Plus /> Add exception</Button>
      </div>
      <div className="overflow-hidden rounded-xl border border-line bg-surface">
        <div className={cn(FILA_EXCEPCION, 'border-b border-line bg-surface-alt py-3 text-xs font-semibold text-ink-muted max-lg:hidden')}>
          <span>Exception</span>
          <span>Date</span>
          <span>Status</span>
          <span className="sr-only">Actions</span>
        </div>
        {excepciones.length === 0 && (
          <EmptyState title="No exceptions" detail="Add a day that breaks from the regular schedule." className="border-0 py-16" />
        )}
        {excepciones.map((e) => (
          <div key={e.id} className={cn(FILA_EXCEPCION, 'border-b border-line-soft py-3 last:border-0')}>
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-semibold text-ink">{e.nombre}</span>
              <span className="block text-[12px] text-ink-muted lg:hidden">{formatMDY(e.fecha)}</span>
            </span>
            <span className="text-[13px] text-ink-soft max-lg:hidden">{formatMDY(e.fecha)}</span>
            {/* El estado con su nombre, como en el resto de la app; sin punto de color. */}
            <span><Pill tone={e.estado === 'Active' ? 'success' : 'neutral'}>{e.estado}</Pill></span>
            <span className="flex items-center justify-end gap-1">
              <button
                type="button"
                onClick={() => setModal(e)}
                aria-label={\`Edit \${e.nombre}\`}
                className="text-dash-blue flex min-h-8 items-center gap-1 px-1 text-[12px] font-semibold hover:underline"
              >
                <Pencil className="size-3" /> <span className="max-lg:hidden">Edit exception</span>
              </button>
              <button type="button" aria-label={\`Delete \${e.nombre}\`} onClick={() => borrar(e)} className={cn(ICONO_SUELTO, 'text-dash-bad-fg')}>
                <Trash2 className="size-4" />
              </button>
            </span>
          </div>
        ))}
      </div>

      {modal && (
        <NewExceptionModal
          inicial={modal === 'nueva' ? undefined : modal}
          onClose={() => setModal(null)}
          onGuardar={(datos) => {
            if (modal !== 'nueva') {
              setExcepciones((p) => p.map((x) => (x.id === modal.id ? { ...x, ...datos } : x)))
              aviso.ok(\`\${datos.nombre} was updated.\`)
            } else {
              setExcepciones((p) => [...p, { ...datos, id: \`exc-\${Date.now()}\` }])
              aviso.ok(\`\${datos.nombre} was added to Exceptions.\`)
            }
          }}
        />
      )}
    </>
  )
}

export function SettingsLocationDetail() {
  const { locId = 'abril' } = useParams()
  const loc = LOCACIONES.find((l) => l.id === locId) ?? LOCACIONES[0]
  const [params, setParams] = useSearchParams()
  const tab = TABS.find((t) => TIPO_URL[t] === params.get('type')) ?? 'Information'
  const setTab = (t: Tab) => setParams(t === 'Information' ? {} : { type: TIPO_URL[t] }, { replace: true })
  /* Insurance / Billing Profile e Insurance Defaults tienen su propio guardado: salir de la pestaña con algo sin guardar
     lo pregunta. */
  const [sucio, setSucio] = useState(false)
  const [pendiente, setPendiente] = useState<Tab | null>(null)
  const marcarSucio = useCallback((v: boolean) => setSucio(v), [])
  const cambiarTab = (t: Tab) => (sucio && tab !== t ? setPendiente(t) : setTab(t))

  return (
    <div className={PADDING_PAGINA}>
      {/* Siempre el nombre: la pestaña ya dice la sección y el breadcrumb termina en la locación (README, 2026-11-27). */}
      <PageTitle>{loc.nombre}</PageTitle>

      <Tabs size="sm" className="mt-4" aria-label="Location sections" tabs={TABS} value={tab} onChange={cambiarTab} />

      <div className="mt-4">
        {tab === 'Information' && <InformationTab nombreLocacion={loc.nombre} />}
        {tab === 'Working hours' && <WorkingHoursTab />}
        {tab === 'Rooms' && <RoomsTab />}
        {tab === 'Exceptions' && <ExceptionsTab />}
        {tab === 'Insurance / billing profile' && (
          <LocationBillingProfile locId={loc.id} nombreLocacion={loc.nombre} onDirtyChange={marcarSucio} />
        )}
        {tab === 'Insurance defaults' && <LocationInsuranceDefaults key={loc.id} locId={loc.id} onDirtyChange={marcarSucio} />}
      </div>

      {pendiente && (
        <ConfirmDialog
          title="Discard unsaved changes?"
          confirmLabel="Discard changes"
          cancelLabel="Keep editing"
          tone="danger"
          onCancel={() => setPendiente(null)}
          onConfirm={() => { setSucio(false); setTab(pendiente); setPendiente(null) }}
        >
          {tab === 'Insurance defaults' ? "Your insurance defaults changes haven't been saved." : "Your billing profile changes haven't been saved."}
        </ConfirmDialog>
      )}
    </div>
  )
}
`})))()}export{n,i as r,r as t};