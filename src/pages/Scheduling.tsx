import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronLeft, ChevronRight, Plus, CalendarCheck, Inbox, MapPin, Clock } from 'lucide-react'
import { AppointmentDetailsDrawer } from '@/components/scheduling/AppointmentDetailsDrawer'
import { ViewFiltersPanel } from '@/components/scheduling/ViewFiltersPanel'
import { NewAppointmentModal } from '@/components/scheduling/NewAppointmentModal'
import {
  SOLICITUDES, datosDeSolicitud, fechaLegible, type Solicitud,
} from '@/components/scheduling/requests-data'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { PageTitle } from '@/components/ui/page-title'
import {
  EVENTOS_INICIALES, FECHA_ANCLA, MESES, BLOCK_STYLE,
  inicioDeSemana, sumarDias, type EventoConFecha, type ApptState,
} from '@/components/scheduling/calendar-data'
import { HORAS } from '@/components/scheduling/AppointmentSlotPicker'
import {
  VistaDia, VistaSemana, VistaMes, fmtExacta, type Vista,
} from '@/components/scheduling/CalendarViews'
import { StatusLegend } from '@/components/scheduling/StatusLegend'
import { EmptyState } from '@/components/ui/empty-state'


/* Interruptor de lo que está en el tablero pero todavía no se usa. En false
   el markup existe y no se renderiza; se prende cuando se defina el alcance. */
const PENDIENTES = false

export default function Scheduling() {
  /* En celular la vista semanal obliga a scrollear de costado para ver un
     día: arranca en Day, como Google Calendar. */
  const [view, setView] = useState<Vista>(
    () => (typeof window !== 'undefined' && window.innerWidth < 768 ? 'Day' : 'Week'),
  )
  const [fecha, setFecha] = useState(FECHA_ANCLA)
  const [reqTab, setReqTab] = useState<'ASAP' | 'Waiting List'>('ASAP')
  /* Arranca cerrado: el panel de solicitudes es el estado desplegado del FAB
     y aparecía solo al entrar a Scheduling. */
  const [reqOpen, setReqOpen] = useState(false)
  /* El detalle se queda con el turno entero: la hora y la fecha que muestra
     tienen que ser las del bloque que se clickeó, no un texto fijo. */
  const [detail, setDetail] = useState<{ ev: EventoConFecha; rect: DOMRect } | null>(null)
  const abrirDetalle = (e: EventoConFecha, el: HTMLElement) =>
    setDetail({ ev: e, rect: el.getBoundingClientRect() })
  const [panel, setPanel] = useState<'view' | 'new' | null>(null)
  /* Las solicitudes son estado: se agendan o se caen, y en los dos casos
     desaparecen de la lista. */
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>(SOLICITUDES)
  const [agendando, setAgendando] = useState<Solicitud | null>(null)

  /* Los turnos se pueden arrastrar a otro día y hora. El Figma no lo muestra
     —es un frame estático— pero es lo que se espera de un calendario. */
  const [eventos, setEventos] = useState<EventoConFecha[]>(EVENTOS_INICIALES)

  const mover = (i: number, nueva: Date, start?: number) => {
    setEventos((prev) =>
      prev.map((ev, j) => {
        if (j !== i) return ev
        const tope = 18 - ev.duration
        const hora = start === undefined ? ev.start : Math.min(Math.max(start, 8), tope)
        aviso.ok(
          `${ev.patient} moved to ${nueva.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${fmtExacta(hora)}.`,
        )
        return { ...ev, fecha: nueva, start: hora }
      }),
    )
  }

  const visibles = solicitudes.filter((s) => s.tipo === reqTab)

  const cancelarSolicitud = (s: Solicitud) => {
    const indice = solicitudes.findIndex((x) => x.id === s.id)
    setSolicitudes((prev) => prev.filter((x) => x.id !== s.id))
    aviso.warn(`Request for ${s.patient} was cancelled.`, {
      label: 'Undo',
      onClick: () => setSolicitudes((prev) => [...prev.slice(0, indice), s, ...prev.slice(indice)]),
    })
  }

  /* Datos crudos del modal -> turno de la grilla. Compartido por "agendar una
     solicitud" y por "New appointment" suelto: los dos arman el mismo tipo de
     evento, sólo cambia qué pasa con la solicitud de origen (si hay una). */
  type DatosGuardado = { patient: string; date: string; start: string; end: string; status: string; primary?: string; operatory?: string; reason?: string }
  const construirEvento = (d: DatosGuardado): EventoConFecha => {
    const [dd, mm, yyyy] = d.date.split('-').map(Number)
    const dia = new Date(yyyy, mm - 1, dd)
    const desde = HORAS.indexOf(d.start)
    const hasta = HORAS.indexOf(d.end)
    const inicio = desde >= 0 ? Number(d.start.slice(0, 2)) : 9
    const duracion = desde >= 0 && hasta > desde ? hasta - desde : 1
    const estado = (d.status in BLOCK_STYLE ? d.status : 'Booked') as ApptState
    return {
      start: inicio, duration: duracion, patient: d.patient, state: estado, fecha: dia,
      provider: d.primary || 'Unassigned', room: d.operatory || 'Unassigned', reason: d.reason || 'Appointment',
    }
  }

  /* Agendar una solicitud la saca de la lista y la pone en la grilla. El turno
     puede caer en otro día que el que se está mirando: el sistema no cambia de
     pantalla solo, lo ofrece en el toast. */
  const agendarSolicitud = (s: Solicitud, d: DatosGuardado) => {
    const nuevo = construirEvento(d)
    setEventos((prev) => [...prev, nuevo])
    setSolicitudes((prev) => prev.filter((x) => x.id !== s.id))
    const rotulo = nuevo.fecha.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    aviso.ok(`${d.patient} scheduled for ${rotulo} at ${d.start}.`, {
      label: `Go to ${rotulo}`,
      onClick: () => { setFecha(dia); setView('Day') },
    })
    return true
  }

  /* "New appointment" suelto -sin solicitud de origen-: mismo armado de
     evento, sin nada que sacar de la lista de espera. Antes no pasaba
     `onGuardar` acá y el modal sólo mostraba un toast sin tocar la grilla. */
  const crearTurno = (d: DatosGuardado) => {
    setEventos((prev) => [...prev, construirEvento(d)])
    return false
  }

  /* Las flechas y el rótulo siguen la vista, igual que en Google Calendar. */
  const paso = (n: number) => {
    setFecha((f) => {
      if (view === 'Day') return sumarDias(f, n)
      if (view === 'Week') return sumarDias(f, n * 7)
      return new Date(f.getFullYear(), f.getMonth() + n, 1)
    })
  }

  const rotulo = (() => {
    if (view === 'Day') {
      return fecha.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    }
    if (view === 'Week') {
      const a = inicioDeSemana(fecha)
      const b = sumarDias(a, 6)
      const mismoMes = a.getMonth() === b.getMonth()
      return `${MESES[a.getMonth()].slice(0, 3)} ${a.getDate()} – ${mismoMes ? '' : MESES[b.getMonth()].slice(0, 3) + ' '}${b.getDate()}, ${b.getFullYear()}`
    }
    return `${MESES[fecha.getMonth()]} ${fecha.getFullYear()}`
  })()

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6">
      <Link to="/scheduling" className="flex items-center gap-1 text-sm text-[#0056ef]">
        Scheduling <ChevronDown className="size-[15px]" />
      </Link>
      <div className="mt-3">
        <PageTitle>Scheduling</PageTitle>
      </div>

      {/* Toolbar */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <button onClick={() => paso(-1)} className="rounded-md border border-[#e4e4e7] bg-white p-1.5" aria-label="Previous">
            <ChevronLeft className="size-4" />
          </button>
          <span className="text-[13px] font-semibold whitespace-nowrap text-[#09090b]">{rotulo}</span>
          <button onClick={() => setFecha(FECHA_ANCLA)} className="flex items-center gap-1 text-[13px] text-[#71717a]">
            Today <ChevronDown className="size-3.5" />
          </button>
          <button onClick={() => paso(1)} className="rounded-md border border-[#e4e4e7] bg-white p-1.5" aria-label="Next">
            <ChevronRight className="size-4" />
          </button>
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          {/* El Figma marca "Month" activo aunque la vista sea semanal. */}
          <div className="flex items-center gap-1">
            {(['Day', 'Week', 'Month'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  'h-8 rounded-md px-4 text-xs font-medium transition-colors',
                  view === v ? 'bg-dash-blue text-white' : 'text-[#a3a9b8] hover:text-[#71717a]',
                )}
              >
                {v}
              </button>
            ))}
          </div>
          <div className="relative">
            <button
              data-view-trigger
              onClick={() => setPanel((p) => (p === 'view' ? null : 'view'))}
              aria-expanded={panel === 'view'}
              className="bg-dash-blue hover:bg-dash-blue-hover flex h-8 items-center gap-1.5 rounded-md px-4 text-xs font-medium text-white transition-colors"
            >
              View
              <ChevronDown className={cn('size-3.5 transition-transform', panel === 'view' && 'rotate-180')} />
            </button>
            {panel === 'view' && <ViewFiltersPanel onClose={() => setPanel(null)} />}
          </div>
          {/* Event y Register appointment quedan fuera de la barra hasta que se
              defina qué hacen. No se borran: el markup sigue acá detrás de
              PENDIENTES, así volver a mostrarlos es cambiar una constante y no
              rehacer los botones. Event nunca tuvo destino en el Figma;
              Register appointment abría el mismo modal que New appointment. */}
          {PENDIENTES && (
            <>
              <button
                onClick={() => aviso.info('Event scheduling is not available in this release.')}
                className="bg-dash-blue hover:bg-dash-blue-hover h-8 rounded-md px-4 text-xs font-medium text-white transition-colors"
              >
                Event
              </button>
              <button
                onClick={() => setPanel('new')}
                className="bg-dash-blue hover:bg-dash-blue-hover flex h-8 items-center gap-1.5 rounded-md px-4 text-xs font-medium text-white transition-colors"
              >
                <Plus className="size-3.5" /> Register appointment
              </button>
            </>
          )}
          <button
            onClick={() => setPanel('new')}
            className="bg-dash-blue hover:bg-dash-blue-hover flex h-8 items-center gap-1.5 rounded-md px-4 text-xs font-medium text-white transition-colors"
          >
            <Plus className="size-3.5" /> New appointment
          </button>
        </div>
      </div>

      {/* Leyenda: botón desplegable en vez de la franja a lo ancho. */}
      <div className="mt-4">
        <StatusLegend />
      </div>

      {/* Grilla: la misma agenda en tres vistas. */}
      {view === 'Day' && (
        <VistaDia eventos={eventos} fecha={fecha} onMover={mover} onAbrir={abrirDetalle} />
      )}
      {view === 'Week' && (
        <VistaSemana eventos={eventos} fecha={fecha} onMover={mover} onAbrir={abrirDetalle} />
      )}
      {view === 'Month' && (
        <VistaMes eventos={eventos} fecha={fecha} onMover={mover} onAbrir={abrirDetalle} />
      )}

      {/* Panel flotante de solicitudes + FAB */}
      {reqOpen && (
        <div className="motion-safe:animate-[fab-panel-in_180ms_cubic-bezier(0.16,1,0.3,1)] fixed right-[100px] bottom-8 z-30 flex max-h-[70svh] w-[260px] origin-bottom-right flex-col rounded-lg border border-[#e4e4e7] bg-white p-4 shadow-[0_4px_14px_0_rgb(100_100_100/0.25)]">
          <p className="text-[13px] font-bold text-[#09090b]">Appointment requests</p>
          <div className="mt-3 flex shrink-0 rounded-md bg-[#f1f5f9] p-1">
            {(['ASAP', 'Waiting List'] as const).map((t) => {
              const n = solicitudes.filter((s) => s.tipo === t).length
              return (
                <button
                  key={t}
                  onClick={() => setReqTab(t)}
                  className={cn(
                    'flex-1 rounded px-2 py-1 text-xs font-medium',
                    reqTab === t ? 'bg-dash-blue text-white' : 'text-[#64748b]',
                  )}
                >
                  {t}{n > 0 && ` (${n})`}
                </button>
              )
            })}
          </div>

          {/* La lista scrollea sola: el panel está anclado al FAB y no puede
              crecer hasta tapar el calendario. */}
          <div className="-mr-1 mt-3 flex min-h-0 flex-col gap-2 overflow-y-auto pr-1">
            {visibles.length === 0 ? (
              <EmptyState
                icon={Inbox}
                title="No requests"
                detail={
                  reqTab === 'ASAP'
                    ? 'No one is waiting for the first available slot.'
                    : 'Nothing on the waiting list right now.'
                }
                className="py-6"
              />
            ) : (
              visibles.map((s) => (
                <SolicitudCard
                  key={s.id}
                  s={s}
                  onCancel={() => cancelarSolicitud(s)}
                  onSchedule={() => setAgendando(s)}
                />
              ))
            )}
          </div>
        </div>
      )}

      {/* Anillo del design system: 3px de stroke a 3px del botón. Se usa
          outline + outline-offset en vez de box-shadow para que el hueco sea
          transparente y deje ver el fondo, en lugar de pintarse de blanco. */}
      <button
        onClick={() => setReqOpen((v) => !v)}
        aria-label="Appointment requests"
        aria-pressed={reqOpen}
        className={cn(
          'bg-dash-blue fixed right-8 bottom-8 z-30 flex size-[60px] items-center justify-center',
          'rounded-full text-white transition-all outline-none',
          'hover:bg-dash-ring',
          'shadow-lg [outline-style:solid] outline-[3px] outline-offset-[3px] outline-transparent',
          'focus-visible:outline-[var(--color-dash-ring)]',
          reqOpen && 'outline-[var(--color-dash-ring)]',
        )}
      >
        <CalendarCheck className="size-6" />
      </button>

      {detail && (
        <AppointmentDetailsDrawer
          patient={detail.ev.patient}
          estado={detail.ev.state}
          hora={fmtExacta(detail.ev.start)}
          duracion={detail.ev.duration}
          fecha={detail.ev.fecha}
          provider={detail.ev.provider}
          room={detail.ev.room}
          reason={detail.ev.reason}
          anchor={detail.rect}
          onClose={() => setDetail(null)}
        />
      )}
      {panel === 'new' && <NewAppointmentModal onGuardar={crearTurno} onClose={() => setPanel(null)} />}
      {/* Agendar una solicitud es crear un turno, no editarlo: el modal es el
          mismo pero llega con lo que el paciente ya había pedido. */}
      {agendando && (
        <NewAppointmentModal
          inicial={datosDeSolicitud(agendando)}
          onGuardar={(d) => agendarSolicitud(agendando, d)}
          onClose={() => setAgendando(null)}
        />
      )}
    </div>
  )
}

/* Una solicitud tiene dos salidas y las dos están en la card. El acento rojo
   es sólo para ASAP: en la lista de espera nada es urgente por definición. */
function SolicitudCard({
  s, onCancel, onSchedule,
}: {
  s: Solicitud
  onCancel: () => void
  onSchedule: () => void
}) {
  const urgente = s.tipo === 'ASAP'
  const acento = urgente ? '#dc2626' : '#1d56bc'
  return (
    <div
      className="rounded-md border-l-[3px] bg-white p-2.5 shadow-[0_1px_3px_rgb(0_0_0/0.08)]"
      style={{ borderLeftColor: acento }}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="flex min-w-0 items-center gap-1.5">
          <span className="size-1.5 shrink-0 rounded-full" style={{ backgroundColor: acento }} />
          <span className="truncate text-xs font-bold text-[#09090b]">{s.patient}</span>
        </span>
        {/* Misma pill que el resto del sistema: 11px y con aire vertical. El
            frame la dibujaba a 10px y sin padding, y quedaba aplastada al lado
            de las de Insurance o Treatment plans. */}
        <span
          className="shrink-0 rounded-full border px-2 py-[2px] text-[11px] font-semibold"
          style={{ borderColor: acento, color: acento }}
        >
          {urgente ? 'ASAP' : s.espera}
        </span>
      </div>
      <p className="mt-1 text-[11px] text-[#71717a]">{s.reason}</p>
      <p className="mt-1 flex items-center gap-1.5 text-[11px] text-[#71717a]">
        <Clock className="size-3 shrink-0" /> {fechaLegible(s.date)} · {s.start} - {s.end}
      </p>
      <p className="mt-0.5 flex items-center gap-1.5 truncate text-[11px] text-[#71717a]">
        <MapPin className="size-3 shrink-0" /> {s.location}
      </p>
      {/* Cancel y la acción principal, uno al lado del otro. */}
      <div className="mt-2 flex items-center justify-end gap-2">
        <button
          onClick={onCancel}
          className="rounded-md border border-[#e4e4e7] px-2.5 py-1 text-[11px] font-medium hover:bg-[#fafafa]"
        >
          Cancel
        </button>
        <button
          onClick={onSchedule}
          className="bg-dash-blue hover:bg-dash-blue-hover rounded-md px-2.5 py-1 text-[11px] font-semibold text-white transition-colors"
        >
          Schedule
        </button>
      </div>
    </div>
  )
}
