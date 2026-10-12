import { useState } from 'react'
import { Activity, CalendarDays, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Panel } from '@/components/dashboard/primitives'
import { Count } from '@/components/ui/count'
import { EmptyState } from '@/components/ui/empty-state'
import { FilterMenu } from '@/components/ui/filter-menu'
import { ListGroup } from '@/components/ui/list-group'
import { Tabs } from '@/components/ui/tabs'
import { TARJETA_PANEL } from '@/lib/estilos'
import { aviso } from '@/components/ui/toaster'
import { AppointmentRow, RoomStrip, TaskRow } from '@/components/dashboard/DashboardRows'
import { OperatoryCard } from '@/components/dashboard/OperatoryCard'
import { TASK_KINDS, type DiaDashboard, type Turno } from '@/components/dashboard/dashboard-data'
import type { Appointment } from '@/components/dashboard/AppointmentCard'
import type { PendingTask } from '@/components/dashboard/PendingTaskCard'

/* Propuesta del 2026-10-12: dos maneras de acomodar el Dashboard cuando hay mucho (un día real: 35 turnos, 8 en espera,
   28 tareas), con el mismo contenido de cada card. Se eligen con ?variant=a|b y el día cargado con ?day=busy. Cuando
   Julián elija, queda una y este archivo pasa a ser el cuerpo del Dashboard. Ver design-reference/figma/modulos/dashboard.md. */

export type Variante = 'current' | 'a' | 'b'

export const VARIANTES: Record<Variante, { nombre: string; idea: string }> = {
  current: { nombre: 'Current', idea: 'As it is today: every item is a full-size card and the lists grow with no limit.' },
  a: { nombre: 'A · Board', idea: 'Everything at a glance: three lists side by side, each with its own scroll, and the rooms below.' },
  b: { nombre: 'B · Focus', idea: 'Waiting room and rooms first. Below, appointments and tasks in one full-width list with tabs.' },
}

/* El selector de la propuesta, arriba del Dashboard. No es parte del producto: se va cuando haya una elegida. */
export function BarraPropuesta({
  variante, cargado, onVariante, onCargado,
}: {
  variante: Variante
  cargado: boolean
  onVariante: (v: Variante) => void
  onCargado: (c: boolean) => void
}) {
  return (
    <div className="mb-4 flex flex-col gap-2 rounded-lg border border-dashed border-dash-blue/40 bg-info-bg px-4 py-3">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="text-[12px] font-semibold text-dash-blue">Proposal · not live</span>
        <Tabs
          size="sm" aria-label="Layout" value={variante} onChange={onVariante}
          tabs={(Object.keys(VARIANTES) as Variante[]).map((v) => ({ value: v, label: VARIANTES[v].nombre }))}
        />
        <Tabs
          size="sm" aria-label="Data" value={cargado ? 'busy' : 'demo'} onChange={(v) => onCargado(v === 'busy')}
          tabs={[{ value: 'demo' as const, label: 'Demo day' }, { value: 'busy' as const, label: 'Busy day' }]}
        />
      </div>
      <p className="text-[12px] text-ink-muted">{VARIANTES[variante].idea}</p>
    </div>
  )
}

export type PropsCuerpo = {
  dia: DiaDashboard
  /** Los operatorios del día, para el filtro de turnos. */
  operatorios: string[]
  salas: string[]
  onSalas: (v: string[]) => void
  tipos: string[]
  onTipos: (v: string[]) => void
  /** El id de la fila que abrió la ficha rápida. */
  seleccion?: string
  onSelect: (a: Appointment, el: HTMLElement, id?: string) => void
  onEdit: (a: Appointment, panel: 'appointments' | 'waiting', index: number) => void
}

/* Los turnos del día por hora: los que faltan y, aparte, los completados (el mismo dato que dice "2 completed"). */
export function agruparTurnos(dia: DiaDashboard, salas: string[]) {
  const turnos = dia.appointments.filter((a) => salas.length === 0 || salas.includes(a.operatory))
  const porHora = (a: Turno, b: Turno) => a.time.localeCompare(b.time)
  return {
    total: turnos.length,
    programados: turnos.filter((a) => !a.completado).sort(porHora),
    hechos: turnos.filter((a) => a.completado).sort(porHora),
  }
}

/* Las tareas por tipo: las cuatro categorías del filtro (Clinical Note, Lab Orders, Prescriptions, Referrals). */
export const tareasPorTipo = (tareas: PendingTask[]) =>
  TASK_KINDS.map((kind) => ({ kind, lista: tareas.filter((t) => t.kind === kind) }))

/* Una fila de turno con su id y su edición. */
function fila(p: PropsCuerpo, a: Appointment, panel: 'appointments' | 'waiting', lugar: string) {
  const index = (p.dia[panel] as Appointment[]).indexOf(a)
  const id = `${lugar}-${panel}-${index}`
  return (
    <AppointmentRow
      key={id} appt={a} id={id} activa={p.seleccion === id} onSelect={p.onSelect}
      onEdit={() => p.onEdit(a, panel, index)}
    />
  )
}

const filtroSalas = (p: PropsCuerpo) => (
  <FilterMenu label="Filter appointments" options={p.operatorios} value={p.salas} onChange={p.onSalas} size="sm" tour="dash-filter" />
)
const filtroTipos = (p: PropsCuerpo) => (
  <FilterMenu label="Filter tasks" options={TASK_KINDS} value={p.tipos} onChange={p.onTipos} size="sm" />
)

/* Los mismos vacíos que la versión actual. */
const sinTurnos = (p: PropsCuerpo) => (
  <EmptyState
    icon={CalendarDays} title="No appointments today"
    detail={p.salas.length > 0 ? 'No appointments match the selected operatories.' : 'Your schedule is clear. Add an appointment or check pending requests.'}
    accion={{ label: 'New appointment', onClick: () => aviso.info('Use Scheduling to create an appointment.') }}
  />
)
const sinEspera = <EmptyState icon={Clock} title="Waiting room is empty" detail="No patients have checked in for this day yet." />
const sinTareas = (p: PropsCuerpo) => (
  <EmptyState
    icon={Activity} title="Nothing pending"
    detail={p.dia.tasks.length === 0 ? 'There are no tasks waiting on this day.' : 'No pending tasks match the selected types.'}
  />
)

const tareasFiltradas = (p: PropsCuerpo) => p.dia.tasks.filter((t) => p.tipos.length === 0 || p.tipos.includes(t.kind))

/* Turnos en dos grupos: Scheduled (por hora) y Completed, plegado. `limite` topa Scheduled con "Show N more". */
function gruposTurnos(p: PropsCuerpo, lugar: string, sticky: boolean, limite?: number) {
  const g = agruparTurnos(p.dia, p.salas)
  if (g.total === 0) return sinTurnos(p)
  return (
    <>
      <ListGroup title="Scheduled" tone="info" sticky={sticky} limit={limite}>{g.programados.map((a) => fila(p, a, 'appointments', lugar))}</ListGroup>
      <ListGroup title="Completed" sticky={sticky} collapsible defaultOpen={false}>{g.hechos.map((a) => fila(p, a, 'appointments', lugar))}</ListGroup>
    </>
  )
}

/* Tareas agrupadas por tipo. */
function gruposTareas(p: PropsCuerpo, sticky: boolean, limite?: number) {
  const tareas = tareasFiltradas(p)
  if (tareas.length === 0) return sinTareas(p)
  return tareasPorTipo(tareas).map(({ kind, lista }) => (
    <ListGroup key={kind} title={kind} sticky={sticky} limit={limite}>{lista.map((t, i) => <TaskRow key={i} task={t} />)}</ListGroup>
  ))
}

/* Variante A · Board: las tres listas a la par, cada una con alto máximo (el de la pantalla) y su scroll, y las salas
   abajo. Debajo de 1200px las tres columnas no entran: una lista por vez, con tabs. */
export function CuerpoTablero(p: PropsCuerpo) {
  const [tab, setTab] = useState<'appointments' | 'waiting' | 'tasks'>('appointments')
  const total = agruparTurnos(p.dia, p.salas).total
  const tareas = tareasFiltradas(p)
  const alto = 'min-[1200px]:max-h-[max(520px,calc(100dvh-400px))]'
  const scroll = 'gap-4 min-[1200px]:overflow-y-auto'
  const oculto = (k: typeof tab) => tab !== k && 'max-[1199px]:hidden'

  return (
    <div className="mt-5 flex flex-col gap-4">
      <Tabs
        fullWidth className="min-[1200px]:hidden" aria-label="Lists" value={tab} onChange={setTab}
        tabs={[
          { value: 'appointments' as const, label: 'Appointments', count: total },
          { value: 'waiting' as const, label: 'Waiting Room', count: p.dia.waiting.length },
          { value: 'tasks' as const, label: 'Pending Task', count: tareas.length },
        ]}
      />

      {/* Cada panel del alto de su contenido: estirados a la par, el más corto quedaba con un bloque blanco abajo. */}
      <div className="grid items-start gap-4 min-[1200px]:grid-cols-3">
        <Panel title={<>Appointments <Count>{total}</Count></>} controls={filtroSalas(p)} className={cn(alto, oculto('appointments'))} bodyClassName={scroll}>
          {gruposTurnos(p, 'a', true)}
        </Panel>
        <Panel title={<>Waiting Room <Count>{p.dia.waiting.length}</Count></>} className={cn(alto, oculto('waiting'))} bodyClassName={scroll}>
          {p.dia.waiting.length === 0 ? sinEspera : <ListGroup>{p.dia.waiting.map((a) => fila(p, a, 'waiting', 'a'))}</ListGroup>}
        </Panel>
        <Panel title={<>Pending Task <Count>{tareas.length}</Count></>} controls={filtroTipos(p)} className={cn(alto, oculto('tasks'))} bodyClassName={scroll}>
          {gruposTareas(p, true)}
        </Panel>
      </div>

      {/* Las salas, abajo: las tres listas son lo que se mira todo el tiempo y van primero. */}
      <RoomStrip rooms={p.dia.rooms} />
    </div>
  )
}

/* Variante B · Focus: arriba lo que pasa en la clínica (sala de espera y salas); abajo, turnos y tareas en una sola
   lista a lo ancho con tabs, con las filas en columnas y tope por grupo. */
export function CuerpoFoco(p: PropsCuerpo) {
  const [tab, setTab] = useState<'appointments' | 'tasks'>('appointments')
  const total = agruparTurnos(p.dia, p.salas).total
  const tareas = tareasFiltradas(p)

  return (
    <div className="mt-5 flex flex-col gap-4">
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <Panel title={<>Waiting Room <Count>{p.dia.waiting.length}</Count></>} bodyClassName="gap-4">
          {p.dia.waiting.length === 0 ? sinEspera : <ListGroup limit={5}>{p.dia.waiting.map((a) => fila(p, a, 'waiting', 'b'))}</ListGroup>}
        </Panel>
        <Panel title={<>Rooms <Count>{p.dia.rooms.length}</Count></>}>
          <div className="grid gap-2 sm:grid-cols-2">{p.dia.rooms.map((r, i) => <OperatoryCard key={i} room={r} />)}</div>
        </Panel>
      </div>

      <section aria-label="Appointments and tasks" className={cn(TARJETA_PANEL, 'flex flex-col')}>
        <header className="flex min-h-[52px] flex-wrap items-center justify-between gap-2 px-5 py-2">
          <Tabs
            aria-label="List" value={tab} onChange={setTab}
            tabs={[
              { value: 'appointments' as const, label: 'Appointments', count: total },
              { value: 'tasks' as const, label: 'Pending Task', count: tareas.length },
            ]}
          />
          {tab === 'appointments' ? filtroSalas(p) : filtroTipos(p)}
        </header>
        <div className="flex flex-col gap-4 p-4 pt-1">
          {tab === 'appointments' ? gruposTurnos(p, 'b', false, 8) : gruposTareas(p, false, 4)}
        </div>
      </section>
    </div>
  )
}
