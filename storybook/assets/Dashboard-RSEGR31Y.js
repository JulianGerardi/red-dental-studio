import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CalendarDays, Clock, Activity, ShieldQuestionMark, CalendarClock } from 'lucide-react'
import { Panel } from '@/components/dashboard/primitives'
import { EmptyState } from '@/components/ui/empty-state'
import { FilterMenu } from '@/components/ui/filter-menu'
import { PageTitle } from '@/components/ui/page-title'
import { StatStrip, type Stat } from '@/components/dashboard/StatStrip'
import type { Appointment } from '@/components/dashboard/AppointmentCard'
import { PatientDetailsPopover } from '@/components/dashboard/PatientDetailsPopover'
import { DatePicker, sameDay } from '@/components/ui/date-picker'
import { OperatoryStrip } from '@/components/dashboard/OperatoryStrip'
import { AppointmentRow, TaskRow } from '@/components/dashboard/DashboardRows'
import { ListGroup } from '@/components/ui/list-group'
import { Chip } from '@/components/ui/chip'
import {
  DIAS, DIA_CARGADO, DIA_VACIO, HOY_DEMO, TASK_KINDS, claveFecha, fechaDesdeClave, reprogramar,
  type DiaDashboard, type Origen,
} from '@/components/dashboard/dashboard-data'
import {
  NewAppointmentModal, type DatosTurno,
} from '@/components/scheduling/NewAppointmentModal'
import { HORAS } from '@/components/scheduling/AppointmentSlotPicker'
import { formatDMY } from '@/components/ui/date-picker'
import { aviso } from '@/components/ui/toaster'
import { CONTENEDOR_PAGINA } from '@/lib/estilos'
import { Button, buttonClasses } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/* Figma 4430:57451 — rediseño del dashboard.
   Cambios respecto de la versión anterior (3605:56445 / 3636:57488):
   - El frame lo rotula "Patients"; es un error del archivo (anomalía 54) y
     Julián confirmó que va "Dashboard".
   - Los tres stat cards se juntaron en una sola tira arriba a la derecha.
   - Las salas van en una tira arriba y Appointments · Waiting Room en dos columnas a todo el ancho (Julián,
     2026-10-13). El toggle Provider / Recepcionista ya no está en el diseño.
   - Pending Task: tercera columna desde 1280px; más angosto, una franja a lo ancho. Los tabs se sacaron: hacían lo mismo que el embudo.
   - Turnos y tareas van en filas con las mismas partes que las cards, con tope y "Show N more" (2026-10-12).
   - Desapareció el cuarto panel "Rooms" vacío del pie.

   **Toda la pantalla cuelga del filtro de fecha** del panel de Appointments:
   encabezado, tira de stats, sala de espera, salas y tareas. Los datos por
   día están en dashboard-data.ts. */

const DEFAULT_DATE = HOY_DEMO

export function BotonFiltro({
  label, options, value, onChange,
}: {
  label: string
  options: string[]
  value: string[]
  onChange: (v: string[]) => void
}) {
  return <FilterMenu label={label} options={options} value={value} onChange={onChange} size="sm" tour="dash-filter" />
}

/* La fecha de toda la pantalla, el atajo a hoy y las preguntas frecuentes. Today va en md: la altura del
   DatePicker (ver dashboard.md, 2026-10-09). El selector va como barra
   ("Feb 28, 2026"), el mismo campo que el Date filter (dashboard.md, 2026-10-12). */
export function FiltroFecha({
  value, onChange, marked, className,
}: {
  value: Date
  onChange: (d: Date) => void
  marked?: Date[]
  className?: string
}) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)} data-tour="dash-date">
      <DatePicker variant="toolbar" value={value} onChange={onChange} marked={marked} />
      {/* Volver a hoy sin tener que abrir el calendario y buscar el día.
          Desaparece cuando ya estás en hoy: no tendría nada que hacer. */}
      {!sameDay(value, new Date()) && (
        <Button
          variant="secondary" size="md" onClick={() => onChange(new Date())} title="Go to today"
          className="shadow-[0_1px_2px_0_rgb(0_0_0/0.05)]"
        >
          <CalendarClock /> Today
        </Button>
      )}
      {/* Las preguntas frecuentes, en Help con el Dashboard abierto (Julián, 2026-10-13). */}
      <Link
        to="/help" aria-label="Frequently asked questions" title="Frequently asked questions"
        className={buttonClasses({ variant: 'secondary', size: 'md', iconOnly: true, className: 'shadow-[0_1px_2px_0_rgb(0_0_0/0.05)]' })}
      >
        <ShieldQuestionMark />
      </Link>
    </div>
  )
}

/* Un día real de una clínica (35 turnos, 8 en espera, 28 tareas) en la fecha de la demo, para ver el Dashboard con
   volumen: ?day=busy (dashboard.md, 2026-10-12). */
const conDiaCargado = (dias: Record<string, DiaDashboard>) => ({ ...dias, [claveFecha(HOY_DEMO)]: DIA_CARGADO })

/* Cuántas filas se ven en cada panel antes de "Show N more" (ver ui/show-more). */
const TOPE = { turnos: 5, espera: 5, tareas: 5 }

/* La acción la dice el panel, no el turno (Julián, 2026-10-18): en Appointments el paciente todavía no llegó (Check In,
   verde) y en Waiting Room ya está adentro (Check Out, azul). Ver dashboard.md. */

export default function Dashboard() {
  const [params] = useSearchParams()
  const cargado = params.get('day') === 'busy'

  const [date, setDate] = useState(DEFAULT_DATE)
  const [tipos, setTipos] = useState<string[]>([])
  /* La sala elegida en la tira de arriba: Appointments y Waiting Room muestran sólo a los suyos. Siempre hay una
     elegida, la primera por defecto (dashboard.md, 2026-10-19). */
  const [salaElegida, setSalaElegida] = useState('Operatory 1')
  const [selected, setSelected] =
    useState<{ appt: Appointment; rect: DOMRect; id?: string } | null>(null)
  const [editando, setEditando] = useState<{ datos: DatosTurno; origen: Origen } | null>(null)
  /* Los días viven en estado: reprogramar un turno tiene que moverlo de fecha
     y verse en el día nuevo. */
  const [dias, setDias] = useState(() => (cargado ? conDiaCargado(DIAS) : DIAS))
  /* Al cambiar de día cargado a demo (o al revés) se vuelve a la fecha de la demo, que es la que cambia. */
  const [cargadoAntes, setCargadoAntes] = useState(cargado)
  useEffect(() => {
    if (cargado === cargadoAntes) return
    setCargadoAntes(cargado)
    setDias(cargado ? conDiaCargado(DIAS) : DIAS)
    setDate(HOY_DEMO)
    setSelected(null)
  }, [cargado, cargadoAntes])

  const dia: DiaDashboard = useMemo(
    () => dias[claveFecha(date)] ?? DIA_VACIO,
    [dias, date],
  )
  const diasConDatos = useMemo(
    () => Object.entries(dias)
      .filter(([, d]) => d.appointments.length > 0 || d.waiting.length > 0)
      .map(([k]) => fechaDesdeClave(k)),
    [dias],
  )

  const pick = (appt: Appointment, el: HTMLElement, id?: string) =>
    setSelected({ appt, rect: el.getBoundingClientRect(), id })

  /* "10:00" -> "10 AM", la franja con la que trabaja el modal. */
  const franja = (t: string) => {
    const h = Number(t.slice(0, 2))
    return HORAS.find((x) => Number(x.slice(0, 2)) === h) ?? ''
  }

  /* El kebab abre el mismo modal de alta, con lo que la card ya sabe. */
  const editar = (a: Appointment, origen: Origen) => {
    setSelected(null)
    setEditando({
      origen,
      datos: {
        patient: a.name,
        primary: a.provider,
        operatory: a.operatory,
        date: formatDMY(date),
        start: franja(a.time),
        end: HORAS[HORAS.indexOf(franja(a.time)) + 1] ?? '',
        status: 'Check-in',
      },
    })
  }

  /* Guardar la edición: si cambió la fecha, el turno se muda de día. */
  const guardarEdicion = (d: Record<string, string>) => {
    if (!editando) return
    const { origen } = editando
    const destino = d.date || origen.clave
    const turnoNuevo = {
      name: d.patient,
      initials: d.patient.split(' ').map((x) => x[0]).slice(0, 2).join('').toUpperCase(),
      provider: d.primary,
      operatory: d.operatory,
      time: d.start.replace(/ (AM|PM)$/, ':00'),
    }
    setDias((prev) => reprogramar(prev, origen, destino, turnoNuevo))
    if (destino !== origen.clave) {
      /* No se salta de día solo: eso hace perder de vista el día en curso.
         El toast ofrece ir, y decide el usuario. */
      const nueva = fechaDesdeClave(destino)
      const corta = nueva.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      aviso.ok(\`\${d.patient} rescheduled to \${destino}.\`, {
        label: \`Go to \${corta}\`,
        onClick: () => setDate(nueva),
      })
      return true
    }
  }

  /* Los números salen de las listas del día, no de un mock aparte. */
  const stats: Stat[] = useMemo(() => {
    const completados = dia.appointments.filter((a) => a.completado).length
    const nuevos = dia.waiting.filter((w) => w.nuevo).length
    return [
      {
        label: 'Appointments', value: String(dia.appointments.length),
        nota: \`\${completados} completed\`, icon: CalendarDays,
      },
      {
        label: 'Waiting', value: String(dia.waiting.length),
        nota: \`\${nuevos} new\`, icon: Clock,
      },
      {
        label: 'Open encounters', value: String(dia.encuentros.abiertos),
        nota: dia.encuentros.promedio, icon: Activity,
      },
    ]
  }, [dia])

  /* "Patients today" de cada sala sale de los turnos del día en esa sala: el número es la cantidad de cards que
     Appointments muestra al elegirla (antes era un 12 fijo que no tenía relación). */
  const salas = useMemo(
    () => dia.rooms.map((r) => ({ ...r, patientsToday: dia.appointments.filter((a) => a.operatory === r.name).length })),
    [dia],
  )
  /* Si el día no tiene la sala elegida, la primera. */
  const sala = salas.some((r) => r.name === salaElegida) ? salaElegida : (salas[0]?.name ?? null)
  const turnos = dia.appointments.filter((a) => a.operatory === sala)
  const enEspera = dia.waiting.filter((w) => w.operatory === sala)
  const tareas = dia.tasks.filter((t) => tipos.length === 0 || tipos.includes(t.kind))
  /* La sala elegida, al lado del título de cada panel que filtra (sin ✕: siempre hay una). */
  const conSala = (titulo: string) => <>{titulo}{sala && <Chip>{sala}</Chip>}</>

  return (
    <div className={CONTENEDOR_PAGINA}>
      {/* El día de hoy pasó al Topbar y el elegido lo dice el selector (Julián, 2026-10-13). */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <PageTitle size="lg">Dashboard</PageTitle>
        <div data-tour="dash-stats">
          <StatStrip stats={stats} />
        </div>
      </div>

      {/* La fecha manda sobre las tres columnas, así que vive acá arriba y no
          adentro de Appointments: metida en una de las tres, parecía filtrar
          sólo esa. */}
      <FiltroFecha className="mt-4" value={date} onChange={setDate} marked={diasConDatos} />

      {/* Las salas en una tira arriba, sin ocupar una columna (Julián, 2026-10-13). */}
      <div className="mt-5">
        <OperatoryStrip rooms={salas} elegida={sala} onElegir={setSalaElegida} />
      </div>

      {/* Mucho volumen: filas en lugar de cards (las mismas partes) y un tope por panel; "Show N more" abre el resto con
          scroll adentro (dashboard.md, 2026-10-12). Turnos y sala de espera se reparten el ancho (2026-10-13); desde 1280px, Pending Task es la tercera columna (2026-10-18). */}
      <div className="mt-4 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <Panel title={conSala('Appointments')}>
          {turnos.length === 0 ? (
            <EmptyState
              icon={CalendarDays}
              title={sala && dia.appointments.length > 0 ? \`No appointments in \${sala}\` : 'No appointments today'}
              detail={
                dia.appointments.length > 0
                  ? 'Pick another room above to see its appointments.'
                  : 'Your schedule is clear. Add an appointment or check pending requests.'
              }
              accion={{ label: 'New appointment', onClick: () => aviso.info('Use Scheduling to create an appointment.') }}
            />
          ) : (
            <ListGroup key={sala} limit={TOPE.turnos} label="appointments">
              {turnos.map((a, i) => (
                <AppointmentRow
                  key={i} appt={{ ...a, accion: 'Check In' }} id={\`appt-\${i}\`} activa={selected?.id === \`appt-\${i}\`}
                  onSelect={pick}
                  onEdit={(x) => editar(x, {
                    clave: claveFecha(date), panel: 'appointments',
                    index: dia.appointments.indexOf(a),
                  })}
                />
              ))}
            </ListGroup>
          )}
        </Panel>

        {/* La sala va pegada al título (a la derecha la tapaba la pestaña del paciente que flota en el borde). */}
        <Panel title={conSala('Waiting Room')}>
          {enEspera.length === 0 ? (
            sala && dia.waiting.length > 0 ? (
              <EmptyState
                icon={Clock}
                title={\`No one is waiting for \${sala}\`}
                detail="Pick another room above to see who is waiting there."
              />
            ) : (
              <EmptyState
                icon={Clock}
                title="Waiting room is empty"
                detail="No patients have checked in for this day yet."
              />
            )
          ) : (
            <ListGroup key={sala} limit={TOPE.espera} label="patients waiting">
              {enEspera.map((a, i) => (
                <AppointmentRow
                  key={i} appt={{ ...a, accion: 'Check Out' }} id={\`wait-\${i}\`} activa={selected?.id === \`wait-\${i}\`}
                  onSelect={pick}
                  onEdit={(x) => editar(x, { clave: claveFecha(date), panel: 'waiting', index: dia.waiting.indexOf(a) })}
                />
              ))}
            </ListGroup>
          )}
        </Panel>

        <Panel
          title="Pending Task" className="lg:col-span-2 xl:col-span-1"
          controls={
            <BotonFiltro
              label="Filter tasks" options={TASK_KINDS} value={tipos} onChange={setTipos}
            />
          }
        >
          {tareas.length === 0 ? (
            <EmptyState
              icon={Activity}
              title="Nothing pending"
              detail={
                dia.tasks.length === 0
                  ? 'There are no tasks waiting on this day.'
                  : 'No pending tasks match the selected types.'
              }
            />
          ) : (
            <ListGroup limit={TOPE.tareas} label="pending tasks">
              {tareas.map((t, i) => <TaskRow key={i} task={t} />)}
            </ListGroup>
          )}
        </Panel>
      </div>

      {editando && (
        <NewAppointmentModal
          titulo="Edit Appointment"
          inicial={editando.datos}
          onGuardar={guardarEdicion}
          onClose={() => setEditando(null)}
        />
      )}

      {selected && (
        <PatientDetailsPopover
          name={selected.appt.name}
          initials={selected.appt.initials}
          anchor={selected.rect}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}

`})))()}export{n,i as r,r as t};