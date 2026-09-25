import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Pencil, DoorOpen, Plus, CalendarDays, ChevronRight, Trash2, X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { EmptyState } from '@/components/ui/empty-state'
import { ICONO_SUELTO } from '@/lib/estilos'
import { aviso } from '@/components/ui/toaster'
import { Card } from '@/components/settings/primitives'
import {
  SelectField, TextField, FormFooter,
} from '@/components/patients/form'
import {
  PAISES, CODIGOS, ESTADOS, ZONAS, FEES,
} from '@/data/location-options'
import { LocationHoursModal } from '@/components/settings/LocationHoursModal'
import { NewRoomModal } from '@/components/settings/NewRoomModal'
import { NewExceptionModal } from '@/components/settings/NewExceptionModal'
import { LOCACIONES } from '@/pages/settings/Locations'
import {
  HORARIO_SEMANAL, SALAS_INICIALES, EXCEPCIONES_INICIALES,
  type Sala, type Excepcion,
} from '@/data/location-detail'

/* Figma 3864:277885 "Settings — Location": Information / Working Hours /
   Rooms / Exceptions. Reemplaza lo que había antes en esta ruta —la ficha de
   un empleado, que no correspondía acá y se mudó a Settings → Employees. */

const TABS = ['Information', 'Working Hours', 'Rooms', 'Exceptions'] as const
type Tab = (typeof TABS)[number]

const DIAS: [string, string][] = [
  ['Sunday', 'Sunday'], ['Monday', 'Monday'], ['Tuesday', 'Tuesday'],
  ['Wednesday', 'Wednesday'], ['Thursday', 'Thursday'], ['Friday', 'Friday'], ['Saturday', 'Saturday'],
]

function SwitchOpenClose({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="flex items-center gap-2 text-[13px]"
    >
      <span className={cn('flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors', on ? 'bg-dash-blue' : 'bg-line-strong')}>
        <span className={cn('size-4 rounded-full bg-white transition-transform', on && 'translate-x-4')} />
      </span>
      {/* Azul, no verde: el switch ya es azul cuando está en Open, y el
          texto va del mismo color en vez de meter un segundo significado
          -verde- que el resto del sistema reserva para "Active"/"Completado". */}
      <span className={cn('font-medium', on ? 'text-dash-blue' : 'text-ink-muted')}>{on ? 'Open' : 'Close'}</span>
    </button>
  )
}

function InformationTab({ nombreLocacion }: { nombreLocacion: string }) {
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
          <SelectField label="Country Code" required options={CODIGOS} value={d.codigo} onChange={set('codigo')} />
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

function WorkingHoursTab() {
  const [horario, setHorario] = useState(HORARIO_SEMANAL)
  const [expandido, setExpandido] = useState<string | null>(null)
  const [modal, setModal] = useState<string | null>(null)

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white">
      <div className="grid grid-cols-[140px_140px_1fr] gap-3 border-b border-line bg-surface-alt px-4 py-3 text-xs font-semibold text-ink-muted">
        <span>Day</span>
        <span>Status</span>
        <span>Hours</span>
      </div>
      {DIAS.map(([key, label]) => {
        const dia = horario[key]
        const sinHoras = dia.abierto && dia.rangos.length === 0
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
              onChange={(v) => {
                setHorario((p) => ({ ...p, [key]: { ...p[key], abierto: v } }))
                /* Abrir un día sin franjas cargadas siempre termina en "Add
                   New Hour" igual: te ahorra ese segundo click y te lleva
                   directo al popup para cargarlas. */
                if (v && dia.rangos.length === 0) setModal(key)
              }}
            />
            {dia.abierto ? (
              <div className="flex flex-wrap items-center gap-2">
                {/* Todo "+N" se despliega: regla del sistema. Colapsado
                    muestra sólo las dos primeras franjas y un chip "+N" con
                    las que faltan; al tocarlo aparecen todas. */}
                {(expandido === key ? dia.rangos : dia.rangos.slice(0, 2)).map((r, i) => (
                  <span key={i} className="bg-dash-count-bg text-dash-blue-hover flex items-center gap-1 rounded-full py-[3px] pr-2 pl-1.5 text-[11px] font-semibold">
                    <button
                      type="button"
                      aria-label={`Remove ${r} on ${label}`}
                      onClick={() =>
                        setHorario((p) => {
                          const rangos = p[key].rangos.filter((_, j) => j !== i)
                          return { ...p, [key]: { abierto: rangos.length > 0, rangos } }
                        })
                      }
                      className="hover:opacity-60"
                    >
                      <X className="size-3" strokeWidth={2.5} />
                    </button>
                    {r}
                  </span>
                ))}
                {expandido !== key && dia.rangos.length > 2 && (
                  <button
                    type="button"
                    onClick={() => setExpandido(key)}
                    className="bg-dash-count-bg text-dash-blue-hover rounded-full px-2 py-[3px] text-[11px] font-semibold hover:underline"
                  >
                    +{dia.rangos.length - 2}
                  </button>
                )}
                {sinHoras && (
                  <button
                    type="button"
                    onClick={() => setModal(key)}
                    className="text-dash-blue flex items-center gap-1 text-[12px] font-semibold hover:underline"
                  >
                    <Plus className="size-3.5" /> Add New Hour
                  </button>
                )}
                {!sinHoras && (
                  <button
                    type="button"
                    onClick={() => setModal(key)}
                    className="text-dash-blue flex shrink-0 items-center gap-1 text-[12px] font-semibold hover:underline"
                  >
                    <Pencil className="size-3" /> Edit hours
                  </button>
                )}
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
          onClose={() => setModal(null)}
          onGuardar={(rango) =>
            setHorario((p) => ({
              ...p,
              [modal]: { abierto: true, rangos: [`${rango.inicio} - ${rango.fin}`] },
            }))
          }
        />
      )}
    </div>
  )
}

function RoomsTab() {
  const [salas, setSalas] = useState<Sala[]>(SALAS_INICIALES)
  const [modal, setModal] = useState<'nueva' | Sala | false>(false)

  return (
    <div className="rounded-xl border border-line bg-white p-4 sm:p-5">
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() => setModal('nueva')}
          className="text-dash-blue flex items-center gap-1.5 text-[13px] font-semibold hover:underline"
        >
          <Plus className="size-4" /> Add Room
        </button>
      </div>

      {salas.length === 0 ? (
        <EmptyState title="No Rooms" className="border-0 py-16" />
      ) : (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {salas.map((s) => (
            <div key={s.id} className="rounded-lg border-l-[3px] border-l-dash-blue bg-surface-subtle p-3">
              <div className="flex items-start justify-between gap-2">
                <span className="flex min-w-0 items-center gap-2 text-[13px] font-bold text-ink">
                  <DoorOpen className="text-dash-blue size-4 shrink-0" /> <span className="truncate">{s.nombre}</span>
                </span>
                <span className="flex shrink-0 items-center gap-0.5">
                  <button
                    type="button"
                    aria-label={`Edit ${s.nombre}`}
                    onClick={() => setModal(s)}
                    className={ICONO_SUELTO}
                  >
                    <Pencil className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete ${s.nombre}`}
                    onClick={() => {
                      const indice = salas.findIndex((x) => x.id === s.id)
                      setSalas((p) => p.filter((x) => x.id !== s.id))
                      aviso.ok(`${s.nombre} was removed from Rooms.`, {
                        label: 'Undo',
                        onClick: () => setSalas((p) => [...p.slice(0, indice), s, ...p.slice(indice)]),
                      })
                    }}
                    className={ICONO_SUELTO}
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </span>
              </div>
              <p className="mt-1.5 text-[12px] text-ink-muted">Type: {s.tipo || '-'}</p>
              <p className="text-[12px] text-ink-muted">Abbreviation: {s.abreviatura || '-'}</p>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <NewRoomModal
          inicial={modal === 'nueva' ? undefined : modal}
          onClose={() => setModal(false)}
          onGuardar={(nombre, abrev, tipo) => {
            if (modal !== 'nueva') {
              setSalas((p) => p.map((x) => (x.id === modal.id ? { ...x, nombre, abreviatura: abrev, tipo } : x)))
              aviso.ok(`${nombre} was updated.`)
            } else {
              setSalas((p) => [...p, { id: `sala-${Date.now()}`, nombre, abreviatura: abrev, tipo }])
              aviso.ok(`${nombre} was added to Rooms.`)
            }
          }}
        />
      )}
    </div>
  )
}

function ExceptionsTab() {
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
                aria-label={`Edit ${e.nombre}`}
                onClick={() => setModal(e)}
                className={ICONO_SUELTO}
              >
                <ChevronRight className="size-4" />
              </button>
              <button
                type="button"
                aria-label={`Delete ${e.nombre}`}
                onClick={() => {
                  const indice = excepciones.findIndex((x) => x.id === e.id)
                  setExcepciones((p) => p.filter((x) => x.id !== e.id))
                  aviso.ok(`${e.nombre} was removed.`, {
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
              aviso.ok(`${datos.nombre} was updated.`)
            } else {
              setExcepciones((p) => [...p, { ...datos, id: `exc-${Date.now()}` }])
              aviso.ok(`${datos.nombre} was added to Exceptions.`)
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
  const [tab, setTab] = useState<Tab>('Information')

  return (
    <div className="px-4 py-6 sm:px-8">
      <h1 className="text-2xl font-bold text-ink">{tab === 'Information' ? loc.nombre : tab}</h1>
      <p className="mt-1 text-sm text-ink-muted">Set your location name. Add the location you need.</p>

      <div className="mt-4 flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-lg bg-surface-slate p-1">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              'h-8 shrink-0 rounded-md px-3 text-xs font-medium whitespace-nowrap transition-colors',
              tab === t ? 'bg-dash-blue text-white' : 'text-ink-slate hover:text-ink-soft',
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tab === 'Information' && <InformationTab nombreLocacion={loc.nombre} />}
        {tab === 'Working Hours' && <WorkingHoursTab />}
        {tab === 'Rooms' && <RoomsTab />}
        {tab === 'Exceptions' && <ExceptionsTab />}
      </div>
    </div>
  )
}
