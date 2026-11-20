import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CalendarDays, Clock, Activity, ShieldQuestionMark, CalendarClock, Pencil, UserX, CalendarX } from 'lucide-react'
import { Globo, Panel } from '@/components/dashboard/primitives'
import { EmptyState } from '@/components/ui/empty-state'
import { FilterMenu } from '@/components/ui/filter-menu'
import { PageTitle } from '@/components/ui/page-title'
import { StatStrip, type Stat } from '@/components/dashboard/StatStrip'
import type { AccionMenu, Appointment } from '@/components/dashboard/AppointmentCard'
import { CancelAppointmentDialog, NoShowDialog } from '@/components/dashboard/AppointmentStatusDialogs'
import { PatientDetailsPopover } from '@/components/dashboard/PatientDetailsPopover'
import { DatePicker, sameDay } from '@/components/ui/date-picker'
import { OperatoryList } from '@/components/dashboard/OperatoryList'
import { AppointmentRow } from '@/components/dashboard/DashboardRows'
import { PendingTaskList } from '@/components/dashboard/PendingTaskList'
import { WaitingRoomList } from '@/components/dashboard/WaitingRoomList'
import { ListGroup } from '@/components/ui/list-group'
import { Tabs } from '@/components/ui/tabs'
import {
  DIAS, DIA_CARGADO, DIA_VACIO, ETAPAS_ESPERA, HOY_DEMO, TASK_KINDS, claveFecha, claveTurno, fechaDesdeClave,
  horaDelDia, pendientesDeLlegar, puedeNoShow, reprogramar, type DiaDashboard, type EnEspera, type EtapaEspera, type Origen,
} from '@/components/dashboard/dashboard-data'
import {
  NewAppointmentModal, type CampoTurno, type DatosTurno, type Pestana,
} from '@/components/scheduling/NewAppointmentModal'
import { HORAS, hora24 } from '@/components/scheduling/AppointmentSlotPicker'
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
   - Appointments · Waiting Room · Rooms en tres columnas: quién falta llegar, en qué etapa está cada visita y qué pasa
     en cada sala (comparativa del 2026-11-19, Figma TPh6NE9d4skn0BdId26UTR 476:66770). Las tres salen de la misma agenda.
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

/* Cuántas filas se ven en cada panel antes de "Show N more" (ver ui/show-more): los de la comparativa del 2026-11-19. */
const TOPE = { turnos: 6, espera: 5, tareas: 5 }

/* Qué deja editar Edit appointment desde la Waiting Room, según la etapa (dashboard.md, 2026-11-19). Lo bloqueado se ve
   en sólo lectura. */
const TODO: CampoTurno[] = ['patient', 'primary', 'additional', 'status', 'requestor', 'reason', 'date', 'start', 'end', 'operatory', 'notes', 'flags', 'plan']
const EDICION_POR_ETAPA: Record<EtapaEspera, { bloqueados: CampoTurno[]; pestanaInicial?: Pestana; nota: { title: string; detail: string } }> = {
  'Checked in': {
    bloqueados: ['patient', 'status', 'date', 'start', 'end'],
    nota: { title: 'The patient has checked in', detail: 'You can change the room and the other details. Patient, status, date and time stay as they are.' },
  },
  'On hold': {
    bloqueados: TODO.filter((c) => c !== 'operatory'), pestanaInicial: 'Schedule',
    nota: { title: 'This visit is on hold', detail: 'You can only change the room. The encounter stays on hold.' },
  },
  'Ready to check out': {
    bloqueados: TODO.filter((c) => c !== 'notes'), pestanaInicial: 'Additional',
    nota: { title: 'This visit is ready to check out', detail: 'You can only add notes to the appointment.' },
  },
}

const ENCOUNTER: Record<EtapaEspera, string> = { 'Checked in': 'Planned', 'On hold': 'On hold', 'Ready to check out': 'Completed' }

/* La acción la dice el panel, no el turno (Julián, 2026-10-18): en Appointments el paciente todavía no llegó (Check In,
   verde) y en Waiting Room ya está adentro (Check Out, azul). Ver dashboard.md. */

export default function Dashboard() {
  const [params] = useSearchParams()
  const cargado = params.get('day') === 'busy'

  const [date, setDate] = useState(DEFAULT_DATE)
  /* Appointments: Provider y Room, combinados; sin elegir nada, todos (dashboard.md, 2026-11-19). */
  const [providers, setProviders] = useState<string[]>([])
  const [salas, setSalas] = useState<string[]>([])
  /* Tabs en vez del embudo (Julián, 2026-10-29): vuelve lo que `dashboard.md` (2026-08-28) había sacado del Figma por
     redundante con el filtro -ahora el filtro se saca a favor de las tabs, en las dos pantallas que comparten
     PendingTaskList-. */
  const [tipoTarea, setTipoTarea] = useState('All')
  /* La Waiting Room se filtra por etapa visible, no por sala (dashboard.md, 2026-11-19). */
  const [etapas, setEtapas] = useState<string[]>([])
  const [selected, setSelected] =
    useState<{ appt: Appointment; rect: DOMRect; id?: string } | null>(null)
  const [editando, setEditando] = useState<{ datos: DatosTurno; origen: Origen; etapa?: EtapaEspera } | null>(null)
  /* La pregunta abierta del kebab: Cancel appointment o Mark as no-show. */
  const [cerrando, setCerrando] = useState<{ tipo: 'cancel' | 'noshow'; turno: Appointment } | null>(null)
  /* El reloj de Waiting y Paused: se mueve cada minuto (CON-4178). */
  const [reloj, setReloj] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setReloj(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])
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
    return HORAS.find((x) => hora24(x) === h) ?? ''
  }

  /* El kebab abre el mismo modal de alta, con lo que la card ya sabe. */
  const editar = (a: Appointment, origen: Origen, etapa?: EtapaEspera) => {
    setSelected(null)
    setEditando({
      origen,
      etapa,
      datos: {
        patient: a.name,
        primary: a.provider,
        operatory: a.operatory,
        date: formatDMY(date),
        start: franja(a.time),
        end: HORAS[HORAS.indexOf(franja(a.time)) + 1] ?? '',
        status: etapa === 'Checked in' ? 'Check-in' : etapa ? 'In progress' : 'Booked',
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
      time: `${String(hora24(d.start)).padStart(2, '0')}:00`,
    }
    setDias((prev) => reprogramar(prev, origen, destino, turnoNuevo))
    if (destino !== origen.clave) {
      /* No se salta de día solo: eso hace perder de vista el día en curso.
         El toast ofrece ir, y decide el usuario. */
      const nueva = fechaDesdeClave(destino)
      const corta = nueva.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      aviso.ok(`${d.patient} rescheduled to ${destino}.`, {
        label: `Go to ${corta}`,
        onClick: () => setDate(nueva),
      })
      return true
    }
  }

  /* Check In: la cita sale de Appointments y entra a la Waiting Room, en Checked in. No sale de Scheduling: sólo cambia
     de bloque en el dashboard (comparativa del 2026-11-19). */
  const hacerCheckIn = (a: Appointment) => setDias((prev) => {
    const d = prev[claveFecha(date)] ?? DIA_VACIO
    return { ...prev, [claveFecha(date)]: { ...d, waiting: [...d.waiting, { ...a, accion: undefined, etapa: 'Checked in', desde: horaDelDia(date, reloj) ?? undefined, nuevo: true }] } }
  })
  /* Check Out: sale de la Waiting Room y queda completado en la agenda. */
  const hacerCheckOut = (p: EnEspera) => setDias((prev) => {
    const d = prev[claveFecha(date)] ?? DIA_VACIO
    const k = claveTurno(p)
    return {
      ...prev,
      [claveFecha(date)]: {
        ...d,
        waiting: d.waiting.filter((w) => claveTurno(w) !== k),
        appointments: d.appointments.map((a) => (claveTurno(a) === k ? { ...a, completado: true } : a)),
      },
    }
  })

  /* Cancel y No Show cierran la cita sin atenderla: sale de Appointments o de la Waiting Room (CON-1827, CON-1828). */
  const cerrar = (t: Appointment, cerrado: 'Cancelled' | 'No show') => setDias((prev) => {
    const d = prev[claveFecha(date)] ?? DIA_VACIO
    const k = claveTurno(t)
    return {
      ...prev,
      [claveFecha(date)]: {
        ...d,
        waiting: d.waiting.filter((w) => claveTurno(w) !== k),
        appointments: d.appointments.map((a) => (claveTurno(a) === k ? { ...a, cerrado } : a)),
      },
    }
  })
  const confirmarCierre = (motivo?: string) => {
    if (!cerrando) return
    const cancelado = cerrando.tipo === 'cancel'
    cerrar(cerrando.turno, cancelado ? 'Cancelled' : 'No show')
    aviso.ok(cancelado
      ? `The appointment status has been updated to Canceled.${motivo ? ` Reason: ${motivo}.` : ''}`
      : 'The appointment status has been updated to No show.')
    setCerrando(null)
  }

  /* El kebab de una cita Booked (CON-4177): Edit appointment, Mark as no-show sólo si ya pasó la hora y Cancel al final.
     Check In tiene su botón. */
  const accionesReservada = (a: Appointment): AccionMenu[] => [
    { label: 'Edit appointment', icon: Pencil, onSelect: () => editar(a, { clave: claveFecha(date), panel: 'appointments', index: dia.appointments.indexOf(a) }) },
    ...(puedeNoShow(a, date) ? [{ label: 'Mark as no-show', icon: UserX, onSelect: () => setCerrando({ tipo: 'noshow', turno: a }) }] : []),
    { label: 'Cancel appointment', icon: CalendarX, destructiva: true, onSelect: () => setCerrando({ tipo: 'cancel', turno: a }) },
  ]
  /* En la Waiting Room: Edit appointment siempre (lo que deja editar depende de la etapa) y Cancel sólo en Checked in,
     con el encounter Planned (CON-1670). Check Out tiene su botón. */
  const accionesEspera = (p: EnEspera): AccionMenu[] => [
    { label: 'Edit appointment', icon: Pencil, onSelect: () => editar(p, { clave: claveFecha(date), panel: 'waiting', index: dia.waiting.indexOf(p) }, p.etapa) },
    ...(p.etapa === 'Checked in' ? [{ label: 'Cancel appointment', icon: CalendarX, destructiva: true, onSelect: () => setCerrando({ tipo: 'cancel', turno: p }) }] : []),
  ]

  /* Lo que dice la ficha rápida de la visita: el estado del encounter (una cita Booked todavía no tiene) y Start
     Encounter sólo con el encounter Planned, o sea en Checked in (CON-4179). */
  const estadoVisita = (a: Appointment): { encounter: string | null; iniciar: boolean } => {
    const k = claveTurno(a)
    const enSala = dia.waiting.find((w) => claveTurno(w) === k)
    if (enSala) return { encounter: ENCOUNTER[enSala.etapa], iniciar: enSala.etapa === 'Checked in' }
    const t = dia.appointments.find((x) => claveTurno(x) === k)
    return { encounter: t?.enCurso ? 'In progress' : t?.completado ? 'Fulfilled' : null, iniciar: false }
  }

  /* Los números salen de las listas del día, no de un mock aparte. */
  const stats: Stat[] = useMemo(() => {
    const completados = dia.appointments.filter((a) => a.completado).length
    const nuevos = dia.waiting.filter((w) => w.nuevo).length
    return [
      {
        /* Una cancelada ya no es una cita del día; un No Show sí (no libera el lugar). */
        label: 'Appointments', value: String(dia.appointments.filter((a) => a.cerrado !== 'Cancelled').length),
        nota: `${completados} completed`, icon: CalendarDays,
        info: `Appointments for this day, without cancellations. ${completados} completed.`,
      },
      {
        label: 'Waiting room', value: String(dia.waiting.length),
        nota: `${nuevos} new`, icon: Clock,
        info: 'Patients who checked in and have not checked out yet.',
      },
      {
        label: 'Open encounters', value: String(dia.encuentros.abiertos),
        nota: dia.encuentros.promedio, icon: Activity,
        info: `Encounters started and not closed yet. ${dia.encuentros.promedio}`,
      },
    ]
  }, [dia])

  /* Appointments: sólo los que todavía no llegaron, por hora. */
  const porLlegar = useMemo(() => pendientesDeLlegar(dia), [dia])
  /* Las opciones salen de las citas por llegar, con cuántas tiene cada una. */
  const opciones = (campo: 'provider' | 'operatory') =>
    [...new Set(porLlegar.map((a) => a[campo]))].sort().map((v) => ({ value: v, count: porLlegar.filter((a) => a[campo] === v).length }))
  const turnos = porLlegar.filter((a) =>
    (providers.length === 0 || providers.includes(a.provider)) && (salas.length === 0 || salas.includes(a.operatory)))
  const tareas = tipoTarea === 'All' ? dia.tasks : dia.tasks.filter((t) => t.kind === tipoTarea)
  const enEspera = dia.waiting.filter((w) => etapas.length === 0 || etapas.includes(w.etapa))

  return (
    <div className={CONTENEDOR_PAGINA}>
      {/* El día de hoy pasó al Topbar y el elegido lo dice el selector (Julián, 2026-10-13). La fecha manda sobre toda la
          pantalla y vive acá arriba, no adentro de Appointments. Los controles van debajo del título, como en el resto de
          la app (Scheduling), y los números a la derecha de esa fila (dashboard.md, 2026-11-19). */}
      <PageTitle>Dashboard</PageTitle>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <FiltroFecha value={date} onChange={setDate} marked={diasConDatos} />
        <div data-tour="dash-stats">
          <StatStrip stats={stats} />
        </div>
      </div>

      {/* Tres columnas con un tope por panel y "Show N more", que abre el resto con scroll adentro: el total va en el
          título y no hace falta recorrer la lista para saber si hay más (comparativa del 2026-11-19; antes, desde 1280px,
          scroll interno sin tope). */}
      <div className="mt-4 grid gap-4 lg:max-[1279px]:grid-cols-2 min-[1280px]:grid-cols-3">
        <Panel
          title={<>Appointments <Globo n={turnos.length} /></>}
          controls={
            <FilterMenu
              label="Filter appointments" size="sm" tour="dash-filter"
              groups={[
                { title: 'Provider', options: opciones('provider'), value: providers, onChange: setProviders },
                { title: 'Room', options: opciones('operatory'), value: salas, onChange: setSalas },
              ]}
            />
          }
        >
          {/* Los vacíos de CON-4176: sin citas en el día, o con citas pero ninguna que coincida con los filtros. */}
          {turnos.length === 0 ? (
            porLlegar.length > 0 ? (
              <EmptyState icon={CalendarDays} title="No results match your filters" detail="Try other providers or rooms." />
            ) : dia.appointments.some((a) => a.cerrado !== 'Cancelled') ? (
              <EmptyState
                icon={CalendarDays}
                title="Everyone has checked in"
                detail="All of this day's patients have arrived. Follow them in the Waiting Room."
              />
            ) : (
              <EmptyState
                icon={CalendarDays}
                title="No appointments scheduled for today"
                detail="Your schedule is clear. Add an appointment or check pending requests."
                accion={{ label: 'New appointment', onClick: () => aviso.info('Use Scheduling to create an appointment.') }}
              />
            )
          ) : (
            <ListGroup limit={TOPE.turnos} label="appointments">
              {turnos.map((a) => {
                const id = `appt-${claveTurno(a)}`
                return (
                  <AppointmentRow
                    key={id} appt={{ ...a, accion: 'Check in' }} id={id} activa={selected?.id === id}
                    onSelect={pick} onAccion={hacerCheckIn} acciones={accionesReservada(a)}
                  />
                )
              })}
            </ListGroup>
          )}
        </Panel>

        <Panel
          title={<>Waiting room <Globo n={enEspera.length} /></>}
          controls={
            <FilterMenu
              label="Filter waiting room" size="sm"
              groups={[{
                title: 'Visit stage', value: etapas, onChange: setEtapas,
                options: ETAPAS_ESPERA.map((e) => ({ value: e, count: dia.waiting.filter((w) => w.etapa === e).length })),
              }]}
            />
          }
        >
          {enEspera.length === 0 ? (
            /* CON-4178: vacía de verdad, o con visitas que el filtro deja afuera. */
            dia.waiting.length > 0 ? (
              <EmptyState icon={Clock} title="No results match your filters" detail="Try other visit stages." />
            ) : (
              <EmptyState icon={Clock} title="Waiting room is empty" detail="No patients have checked in for this day yet." />
            )
          ) : (
            <WaitingRoomList
              ahora={horaDelDia(date, reloj)}
              pacientes={enEspera} limit={TOPE.espera} seleccionada={selected?.id}
              onSelect={pick} onAccion={hacerCheckOut} acciones={accionesEspera}
            />
          )}
        </Panel>

        <Panel title={<>Rooms <Globo n={dia.rooms.length} /></>}>
          <OperatoryList rooms={dia.rooms} turnos={dia.appointments} dia={dia} onSelect={(a, el) => pick(a, el)} />
        </Panel>
      </div>

      {/* Pending Task va abajo, a todo el ancho: arriba queda la fila de tres (Julián, 2026-10-19). */}
      <Panel
        title="Pending task" className="mt-4"
        controls={
          <Tabs
            size="sm" aria-label="Filter tasks"
            tabs={[
              { value: 'All', count: dia.tasks.length },
              ...TASK_KINDS.map((k) => ({ value: k, count: dia.tasks.filter((t) => t.kind === k).length })),
            ]}
            value={tipoTarea} onChange={setTipoTarea}
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
                : 'No pending tasks of this type today.'
            }
          />
        ) : (
          <PendingTaskList tasks={tareas} limit={TOPE.tareas} />
        )}
      </Panel>

      {editando && (
        <NewAppointmentModal
          edicion
          inicial={editando.datos}
          {...(editando.etapa ? EDICION_POR_ETAPA[editando.etapa] : {})}
          onGuardar={guardarEdicion}
          onClose={() => setEditando(null)}
        />
      )}

      {cerrando?.tipo === 'cancel' && (
        <CancelAppointmentDialog nombre={cerrando.turno.name} onConfirm={confirmarCierre} onCancel={() => setCerrando(null)} />
      )}
      {cerrando?.tipo === 'noshow' && (
        <NoShowDialog nombre={cerrando.turno.name} hora={cerrando.turno.time} onConfirm={() => confirmarCierre()} onCancel={() => setCerrando(null)} />
      )}

      {selected && (
        <PatientDetailsPopover
          {...estadoVisita(selected.appt)}
          name={selected.appt.name}
          initials={selected.appt.initials}
          anchor={selected.rect}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}

