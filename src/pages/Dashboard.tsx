import { useMemo, useState } from 'react'
import { CalendarDays, Clock, Activity, CalendarClock } from 'lucide-react'
import { Panel } from '@/components/dashboard/primitives'
import { EmptyState } from '@/components/ui/empty-state'
import { FilterMenu } from '@/components/dashboard/FilterMenu'
import { PageTitle } from '@/components/ui/page-title'
import { StatStrip, type Stat } from '@/components/dashboard/StatStrip'
import { AppointmentCard, type Appointment } from '@/components/dashboard/AppointmentCard'
import { PatientDetailsPopover } from '@/components/dashboard/PatientDetailsPopover'
import { DatePicker, sameDay } from '@/components/ui/date-picker'
import { OperatoryCard } from '@/components/dashboard/OperatoryCard'
import { PendingTaskCard } from '@/components/dashboard/PendingTaskCard'
import {
  DIAS, DIA_VACIO, TASK_KINDS, claveFecha, fechaDesdeClave, reprogramar,
  type DiaDashboard, type Origen,
} from '@/components/dashboard/dashboard-data'
import {
  NewAppointmentModal, type DatosTurno,
} from '@/components/scheduling/NewAppointmentModal'
import { HORAS } from '@/components/scheduling/AppointmentSlotPicker'
import { formatDMY } from '@/components/ui/date-picker'
import { aviso } from '@/components/ui/toaster'

/* Figma 4430:57451 — rediseño del dashboard.
   Cambios respecto de la versión anterior (3605:56445 / 3636:57488):
   - El frame lo rotula "Patients"; es un error del archivo (anomalía 54) y
     Julián confirmó que va "Dashboard".
   - Los tres stat cards se juntaron en una sola tira arriba a la derecha.
   - Las columnas son Appointments · Waiting Room · Rooms, fijas: el toggle
     Provider / Recepcionista ya no está en el diseño.
   - Pending Task bajó a una franja a lo ancho, con las tareas en tres
     columnas. Los tabs se sacaron: hacían lo mismo que el embudo.
   - Desapareció el cuarto panel "Rooms" vacío del pie.

   **Toda la pantalla cuelga del filtro de fecha** del panel de Appointments:
   encabezado, tira de stats, sala de espera, salas y tareas. Los datos por
   día están en dashboard-data.ts. */

/* El chip del Figma dice 30-02-2026, una fecha que no existe. Al volverse
   filtro real no puede ser el valor seleccionado, así que el default pasa a
   28-02-2026. Ver README.md, anomalía 4. */
const DEFAULT_DATE = new Date(2026, 1, 28)

function BotonFiltro({
  label, options, value, onChange,
}: {
  label: string
  options: string[]
  value: string[]
  onChange: (v: string[]) => void
}) {
  return <FilterMenu label={label} options={options} value={value} onChange={onChange} />
}

export default function Dashboard() {
  const [date, setDate] = useState(DEFAULT_DATE)
  const [salas, setSalas] = useState<string[]>([])
  const [tipos, setTipos] = useState<string[]>([])
  const [selected, setSelected] =
    useState<{ appt: Appointment; rect: DOMRect; id?: string } | null>(null)
  const [editando, setEditando] = useState<{ datos: DatosTurno; origen: Origen } | null>(null)
  /* Los días viven en estado: reprogramar un turno tiene que moverlo de fecha
     y verse en el día nuevo. */
  const [dias, setDias] = useState(DIAS)

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
      aviso.ok(`${d.patient} rescheduled to ${destino}.`, {
        label: `Go to ${corta}`,
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
        nota: `${completados} completed`, icon: CalendarDays,
      },
      {
        label: 'Waiting', value: String(dia.waiting.length),
        nota: `${nuevos} new`, icon: Clock,
      },
      {
        label: 'Open encounters', value: String(dia.encuentros.abiertos),
        nota: dia.encuentros.promedio, icon: Activity,
      },
    ]
  }, [dia])

  const operatorios = useMemo(
    () => [...new Set(dia.appointments.map((a) => a.operatory))].sort(),
    [dia],
  )
  const turnos = dia.appointments.filter(
    (a) => salas.length === 0 || salas.includes(a.operatory),
  )
  const tareas = dia.tasks.filter((t) => tipos.length === 0 || tipos.includes(t.kind))

  /* "Today" sólo si la fecha elegida es de verdad hoy; si no, el día que sea. */
  const hoy = sameDay(date, new Date())
  const encabezado = date.toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })
  const diaSemana = date.toLocaleDateString('en-US', { weekday: 'long' })

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-dash-blue text-sm">
            {hoy ? 'Today' : diaSemana} • {encabezado}
          </p>
          <PageTitle size="lg">Dashboard</PageTitle>
        </div>
        <StatStrip stats={stats} />
      </div>

      {/* La fecha manda sobre las tres columnas, así que vive acá arriba y no
          adentro de Appointments: metida en una de las tres, parecía filtrar
          sólo esa. */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <DatePicker value={date} onChange={setDate} marked={diasConDatos} />
        {/* Volver a hoy sin tener que abrir el calendario y buscar el día.
            Desaparece cuando ya estás en hoy: no tendría nada que hacer. */}
        {!hoy && (
          <button
            onClick={() => setDate(new Date())}
            title="Go to today"
            className="flex h-9 items-center gap-1.5 rounded-md border border-[#e4e4e7] bg-white px-3 text-[13px] font-medium shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] transition-colors hover:bg-[#fafafa]"
          >
            <CalendarClock className="size-4" /> Today
          </button>
        )}
        <span className="text-[12px] text-[#71717a]">
          Appointments, waiting room and tasks follow this date.
        </span>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Panel
          title="Appointments"
          controls={
            <BotonFiltro
              label="Filter appointments" options={operatorios}
              value={salas} onChange={setSalas}
            />
          }
        >
          {turnos.length === 0 ? (
            <EmptyState
              icon={CalendarDays}
              title="No appointments today"
              detail={
                salas.length > 0
                  ? 'No appointments match the selected operatories.'
                  : 'Your schedule is clear. Add an appointment or check pending requests.'
              }
              accion={{ label: 'New appointment', onClick: () => aviso.info('Use Scheduling to create an appointment.') }}
            />
          ) : (
            turnos.map((a, i) => (
              <AppointmentCard
                key={i} appt={a} id={`appt-${i}`} activa={selected?.id === `appt-${i}`}
                onSelect={pick}
                onEdit={(x) => editar(x, {
                  clave: claveFecha(date), panel: 'appointments',
                  index: dia.appointments.indexOf(a),
                })}
              />
            ))
          )}
        </Panel>

        <Panel title="Waiting Room">
          {dia.waiting.length === 0 ? (
            <EmptyState
              icon={Clock}
              title="Waiting room is empty"
              detail="No patients have checked in for this day yet."
            />
          ) : (
            dia.waiting.map((a, i) => (
              <AppointmentCard
                key={i} appt={a} id={`wait-${i}`} activa={selected?.id === `wait-${i}`}
                onSelect={pick}
                onEdit={(x) => editar(x, { clave: claveFecha(date), panel: 'waiting', index: i })}
              />
            ))
          )}
        </Panel>

        <Panel title="Rooms">
          {dia.rooms.map((r, i) => <OperatoryCard key={i} room={r} />)}
        </Panel>
      </div>

      <div className="mt-4">
        <Panel
          title="Pending Task"
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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tareas.map((t, i) => <PendingTaskCard key={i} task={t} />)}
            </div>
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

