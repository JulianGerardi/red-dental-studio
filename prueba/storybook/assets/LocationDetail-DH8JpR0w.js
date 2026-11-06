import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { Tabs } from '@/components/ui/tabs'
import { PageTitle } from '@/components/ui/page-title'
import { useCallback, useState } from 'react'
import { Chip } from '@/components/ui/chip'
import { useParams, useSearchParams } from 'react-router-dom'
import { Pencil, DoorOpen, Plus, CalendarDays, ChevronRight, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EmptyState } from '@/components/ui/empty-state'
import { ICONO_SUELTO } from '@/lib/estilos'
import { Button } from '@/components/ui/button'
import { aviso } from '@/components/ui/toaster'
import { Card } from '@/components/settings/primitives'
import {
  CountryCodeField, SelectField, TextField, FormFooter,
} from '@/components/patients/form'
import {
  PAISES, CODIGOS, ESTADOS, ZONAS, FEES,
} from '@/data/location-options'
import { LocationHoursModal } from '@/components/settings/LocationHoursModal'
import { NewRoomModal } from '@/components/settings/NewRoomModal'
import { NewAppointmentModal, type DatosTurno } from '@/components/scheduling/NewAppointmentModal'
import { formatDMY } from '@/components/ui/date-picker'
import { NewExceptionModal } from '@/components/settings/NewExceptionModal'
import { LOCACIONES } from '@/pages/settings/Locations'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { LocationBillingProfile } from '@/components/settings/LocationBillingProfile'
import { LocationInsuranceDefaults } from '@/components/settings/LocationInsuranceDefaults'
import {
  HORARIO_SEMANAL, SALAS_INICIALES, EXCEPCIONES_INICIALES,
  type Sala, type TurnoSala, type Excepcion,
} from '@/data/location-detail'

/* Figma 3864:277885 "Settings — Location": Information / Working Hours /
   Rooms / Exceptions. Reemplaza lo que había antes en esta ruta —la ficha de
   un empleado, que no correspondía acá y se mudó a Settings → Employees. */

const TABS = ['Information', 'Working Hours', 'Rooms', 'Exceptions', 'Insurance / Billing Profile', 'Insurance Defaults'] as const
type Tab = (typeof TABS)[number]
/* La pestaña va en la URL como en red.dev (\`?type=rooms\`), así un link abre la pestaña justa. */
const TIPO_URL: Record<Tab, string> = {
  Information: 'information', 'Working Hours': 'working-hours', Rooms: 'rooms', Exceptions: 'exceptions',
  'Insurance / Billing Profile': 'billing-profile', 'Insurance Defaults': 'insurance-defaults',
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
        <span className={cn('size-4 rounded-full bg-white transition-transform', on && 'translate-x-4')} />
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
      <Card title="General Information">
        <TextField label="Location Name" required value={d.nombre} onChange={set('nombre')} />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <TextField label="Abreviattion" required placeholder="Placeholder" value={d.abrev} onChange={set('abrev')} />
          <SelectField label="Preferred Location Fee Schedule" options={FEES} value={d.fee} onChange={set('fee')} />
        </div>
      </Card>

      <Card title="Contact Information">
        <div className="grid gap-4 sm:grid-cols-2">
          <CountryCodeField required value={d.codigo} onChange={set('codigo')} />
          <TextField label="Number" required placeholder="Placeholder" value={d.numero} onChange={set('numero')} />
        </div>
        <TextField className="mt-4 sm:w-1/2 sm:pr-2" label="Email" placeholder="Placeholder" value={d.email} onChange={set('email')} />
      </Card>

      {/* "Adress Information" es del Figma. */}
      <Card title="Adress Information">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Address line 1" required placeholder="Select" value={d.linea1} onChange={set('linea1')} />
          <TextField label="Address line 2" required placeholder="Select" value={d.linea2} onChange={set('linea2')} />
          <SelectField label="City" required options={['Los Angeles', 'Miami', 'Seattle']} value={d.ciudad} onChange={set('ciudad')} />
          <SelectField label="State" required options={ESTADOS} value={d.estado} onChange={set('estado')} />
          <TextField label="Zip Code" required placeholder="Select" value={d.zip} onChange={set('zip')} />
          <SelectField label="Country" required options={PAISES} value={d.pais} onChange={set('pais')} />
        </div>
        <SelectField className="mt-4 sm:w-1/2 sm:pr-2" label="Time Zone" required options={ZONAS} value={d.zona} onChange={set('zona')} />
      </Card>

      <div className="flex justify-end gap-3">
        <FormFooter onCancel={() => aviso.info('Changes discarded.')} onSave={() => aviso.ok('Location information saved.')} />
      </div>
    </div>
  )
}

/* Un día sólo queda Open con al menos una franja: activar el switch abre "Set working hours" y el día se abre recién
   al guardar; Cancel lo deja como estaba. Ver figma/modulos/locations.md (2026-11-06, CON-1546). */
export function WorkingHoursTab() {
  const [horario, setHorario] = useState(HORARIO_SEMANAL)
  const [expandido, setExpandido] = useState<string | null>(null)
  const [modal, setModal] = useState<string | null>(null)

  const cerrar = (key: string, label: string) => {
    const antes = horario[key]
    setHorario((p) => ({ ...p, [key]: { abierto: false, rangos: [] } }))
    aviso.ok(\`\${label} is now closed.\`, { label: 'Undo', onClick: () => setHorario((p) => ({ ...p, [key]: antes })) })
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white">
      <div className="grid grid-cols-[140px_140px_1fr] gap-3 border-b border-line bg-surface-alt px-4 py-3 text-xs font-semibold text-ink-muted">
        <span>Day</span>
        <span>Status</span>
        <span>Hours</span>
      </div>
      {DIAS.map(([key, label]) => {
        const dia = horario[key]
        return (
          <div
            key={key}
            className={cn(
              'grid grid-cols-[140px_140px_1fr] items-center gap-3 border-b border-line-soft px-4 py-3 last:border-0',
              !dia.abierto && 'bg-surface-subtle',
            )}
          >
            <span className="text-[13px] font-semibold text-ink">{label}</span>
            <SwitchOpenClose
              on={dia.abierto}
              label={\`\${label} open\`}
              onChange={(v) => (v ? setModal(key) : cerrar(key, label))}
            />
            {dia.abierto ? (
              <div className="flex flex-wrap items-center gap-2">
                {/* Todo "+N" se despliega: regla del sistema. Colapsado
                    muestra sólo las dos primeras franjas y un chip "+N" con
                    las que faltan; al tocarlo aparecen todas. */}
                {(expandido === key ? dia.rangos : dia.rangos.slice(0, 2)).map((r, i) => (
                  <Chip
                    key={i}
                    removeLabel={\`Remove \${r} on \${label}\`}
                    onRemove={() =>
                      setHorario((p) => {
                        const rangos = p[key].rangos.filter((_, j) => j !== i)
                        return { ...p, [key]: { abierto: rangos.length > 0, rangos } }
                      })
                    }
                  >
                    {r}
                  </Chip>
                ))}
                {expandido !== key && dia.rangos.length > 2 && (
                  <button
                    type="button"
                    onClick={() => setExpandido(key)}
                    aria-label={\`Show \${dia.rangos.length - 2} more hours on \${label}\`}
                    className="inline-flex h-6 items-center rounded-full bg-dash-count-bg px-2.5 text-[12px] font-medium text-dash-blue hover:underline"
                  >
                    +{dia.rangos.length - 2}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setModal(key)}
                  aria-label={\`Edit hours on \${label}\`}
                  className="text-dash-blue flex shrink-0 items-center gap-1 text-[12px] font-semibold hover:underline"
                >
                  <Pencil className="size-3" /> Edit hours
                </button>
              </div>
            ) : (
              <span className="text-[12px] text-ink-faint">Closed all day.</span>
            )}
          </div>
        )
      })}

      {modal && (
        <LocationHoursModal
          dia={DIAS.findIndex(([key]) => key === modal)}
          iniciales={horario[modal].rangos}
          onClose={() => setModal(null)}
          onGuardar={(dias, rangos) =>
            setHorario((p) => ({
              ...p,
              ...Object.fromEntries(dias.map((i) => [DIAS[i][0], { abierto: true, rangos }])),
            }))
          }
        />
      )}
    </div>
  )
}

/* Rooms (CON-404, CON-1581…1584, CON-1520), con la caja de Working Hours. Desactivar una sala con turnos los muestra:
   cada uno se edita aparte (Edit Appointment, para cambiarle la sala) y Confirm cancela los que quedan y los pasa a la
   lista de espera. Dejar la locación sin salas activas también se pregunta. Ver figma/modulos/locations.md. */
const FILA_SALA = 'grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 px-4 lg:grid-cols-[minmax(0,1fr)_120px_140px_130px_120px]'
const fechaTurno = (d: Date) =>
  d.toLocaleString('en-US', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })
/* Las horas del drawer de turnos ("09 AM", "14 PM"): la agenda va de hora en hora. */
const horaTurno = (h: number) => \`\${String(h).padStart(2, '0')} \${h < 12 ? 'AM' : 'PM'}\`
const fechaDeDrawer = (d: DatosTurno) => {
  const [dd, mm, yyyy] = (d.date ?? '').split('-').map(Number)
  return new Date(yyyy, mm - 1, dd, parseInt(d.start ?? '0', 10))
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
        <Button onClick={() => setModal('nueva')}><Plus /> New Room</Button>
      </div>
      {/* Misma caja que Working Hours: encabezado gris, switch en la fila y la inactiva en gris. */}
      <div className="overflow-hidden rounded-xl border border-line bg-white">
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
              <button type="button" aria-label={\`Delete \${s.nombre}\`} onClick={() => borrar(s)} className={ICONO_SUELTO}>
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
          titulo="Edit Appointment"
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
              <p className="mt-3 font-semibold text-ink">Affected Appointments ({baja.turnos.length})</p>
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

  return (
    <div className="rounded-xl border border-line bg-white p-4 sm:p-5">
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() => setModal('nueva')}
          className="text-dash-blue flex items-center gap-1.5 text-[13px] font-semibold hover:underline"
        >
          <Plus className="size-4" /> Add Exception
        </button>
      </div>

      {excepciones.length === 0 ? (
        <EmptyState title="No Exceptions" detail="Add a day that breaks from the regular schedule." className="border-0 py-16" />
      ) : (
        <div className="mt-4 flex flex-col gap-2">
          {excepciones.map((e) => (
            <div key={e.id} className="flex items-center gap-3 rounded-lg border border-line px-3 py-2.5">
              <span className={cn('size-2 shrink-0 rounded-full', e.estado === 'Active' ? 'bg-green' : 'bg-ink-faint')} />
              <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-ink">{e.nombre}</span>
              <span className="flex shrink-0 items-center gap-1.5 text-[12px] text-ink-muted">
                <CalendarDays className="size-3.5" />
                {e.fecha.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <button
                type="button"
                aria-label={\`Edit \${e.nombre}\`}
                onClick={() => setModal(e)}
                className={ICONO_SUELTO}
              >
                <ChevronRight className="size-4" />
              </button>
              <button
                type="button"
                aria-label={\`Delete \${e.nombre}\`}
                onClick={() => {
                  const indice = excepciones.findIndex((x) => x.id === e.id)
                  setExcepciones((p) => p.filter((x) => x.id !== e.id))
                  aviso.ok(\`\${e.nombre} was removed.\`, {
                    label: 'Undo',
                    onClick: () => setExcepciones((p) => [...p.slice(0, indice), e, ...p.slice(indice)]),
                  })
                }}
                className={ICONO_SUELTO}
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}

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
    </div>
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
    <div className="px-4 py-6 sm:px-8">
      <PageTitle>{tab === 'Information' ? loc.nombre : tab}</PageTitle>
      <p className="mt-[9px] text-xs leading-[17px] text-ink-faint">
        {tab === 'Insurance Defaults' ? 'Manage the insurance preferences this location uses on claims.' : 'Set your location name. Add the location you need.'}
      </p>

      <Tabs className="mt-4" aria-label="Location sections" tabs={TABS} value={tab} onChange={cambiarTab} />

      <div className="mt-4">
        {tab === 'Information' && <InformationTab nombreLocacion={loc.nombre} />}
        {tab === 'Working Hours' && <WorkingHoursTab />}
        {tab === 'Rooms' && <RoomsTab />}
        {tab === 'Exceptions' && <ExceptionsTab />}
        {tab === 'Insurance / Billing Profile' && (
          <LocationBillingProfile locId={loc.id} nombreLocacion={loc.nombre} onDirtyChange={marcarSucio} />
        )}
        {tab === 'Insurance Defaults' && <LocationInsuranceDefaults key={loc.id} locId={loc.id} onDirtyChange={marcarSucio} />}
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
          {tab === 'Insurance Defaults' ? "Your insurance defaults changes haven't been saved." : "Your billing profile changes haven't been saved."}
        </ConfirmDialog>
      )}
    </div>
  )
}
`})))()}export{n,i as r,r as t};