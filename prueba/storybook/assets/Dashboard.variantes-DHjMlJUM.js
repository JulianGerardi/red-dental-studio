import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Activity, ArrowRight, CalendarDays, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Panel } from '@/components/dashboard/primitives'
import { Count } from '@/components/ui/count'
import { EmptyState } from '@/components/ui/empty-state'
import { FilterMenu } from '@/components/ui/filter-menu'
import { ListGroup } from '@/components/ui/list-group'
import { Tabs } from '@/components/ui/tabs'
import { TARJETA_PANEL } from '@/lib/estilos'
import { AppointmentRow, NextAppointment, RoomStrip, TaskRow, tonoEspera, type EtapaTurno } from '@/components/dashboard/DashboardRows'
import { TASK_KINDS, type DiaDashboard, type EnEspera, type Turno } from '@/components/dashboard/dashboard-data'
import type { Appointment } from '@/components/dashboard/AppointmentCard'
import type { PendingTask } from '@/components/dashboard/PendingTaskCard'

/* Propuesta del 2026-10-12: dos maneras de ordenar el Dashboard cuando hay mucho (un día real: 40 pacientes, 28
   tareas). Se eligen con ?variant=a|b y el día cargado con ?day=busy. Cuando Julián elija, queda una y este archivo
   pasa a ser el cuerpo del Dashboard. Ver design-reference/figma/modulos/dashboard.md. */

export type Variante = 'current' | 'a' | 'b'

export const VARIANTES: Record<Variante, { nombre: string; idea: string }> = {
  current: { nombre: 'Current', idea: 'As it is today: every item is a full-size card and the lists grow with no limit.' },
  a: { nombre: 'A · Board', idea: 'Everything at a glance: three lists side by side, each with its own scroll, grouped by what is happening.' },
  b: { nombre: 'B · Focus', idea: 'What is next comes first: the next patient, who is in chair and who is waiting. Below, one full list with tabs.' },
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
  onEdit: (a: Turno, panel: 'appointments' | 'waiting', index: number) => void
  onAvanzar: (panel: 'appointments' | 'waiting', index: number) => void
  onCompletar: (t: PendingTask) => void
}

const porHora = (a: Appointment, b: Appointment) => a.time.localeCompare(b.time)

/* Los turnos del día por etapa, en el orden en que se atienden. La sala de espera, el que más espera primero. */
export function agruparTurnos(dia: DiaDashboard, salas: string[]) {
  const turnos = dia.appointments.filter((a) => salas.length === 0 || salas.includes(a.operatory))
  const proximos = turnos.filter((a) => !a.completado && !a.enSillon).sort(porHora)
  return {
    total: turnos.length,
    siguiente: proximos[0],
    proximos,
    enSillon: turnos.filter((a) => a.enSillon && !a.completado).sort((a, b) => a.enSillon!.localeCompare(b.enSillon!)),
    hechos: turnos.filter((a) => a.completado).sort(porHora),
    espera: [...dia.waiting].sort((a, b) => (b.espera ?? 0) - (a.espera ?? 0)),
  }
}

/* Las tareas por vencimiento, como Pending documents: vencidas, de hoy y el resto. */
export function agruparTareas(tareas: PendingTask[]) {
  const orden = [...tareas].sort((a, b) => (a.vence ?? 99) - (b.vence ?? 99))
  return {
    vencidas: orden.filter((t) => (t.vence ?? 1) < 0),
    hoy: orden.filter((t) => t.vence === 0),
    despues: orden.filter((t) => t.vence === undefined || t.vence > 0),
  }
}

/* Una fila de turno con su id, su acción y su edición. \`lugar\` distingue la misma persona en dos listas (B). */
function fila(p: PropsCuerpo, t: Turno & EnEspera, etapa: EtapaTurno, lugar: string) {
  const panel = etapa === 'waiting' ? 'waiting' : 'appointments'
  const index = (p.dia[panel] as (Turno & EnEspera)[]).indexOf(t)
  const id = \`\${lugar}-\${panel}-\${index}\`
  return (
    <AppointmentRow
      key={id} appt={t} etapa={etapa} id={id} activa={p.seleccion === id} onSelect={p.onSelect}
      onEdit={() => p.onEdit(t, panel, index)} onAccion={() => p.onAvanzar(panel, index)}
    />
  )
}

function siguiente(p: PropsCuerpo, t: Turno, lugar: string) {
  const index = p.dia.appointments.indexOf(t)
  const id = \`\${lugar}-next-\${index}\`
  return (
    <NextAppointment
      appt={t} id={id} activa={p.seleccion === id} onSelect={p.onSelect}
      onEdit={() => p.onEdit(t, 'appointments', index)} onAccion={() => p.onAvanzar('appointments', index)}
    />
  )
}

const filtroSalas = (p: PropsCuerpo) => (
  <FilterMenu label="Filter appointments" options={p.operatorios} value={p.salas} onChange={p.onSalas} size="sm" tour="dash-filter" />
)
const filtroTipos = (p: PropsCuerpo) => (
  <FilterMenu label="Filter tasks" options={TASK_KINDS} value={p.tipos} onChange={p.onTipos} size="sm" />
)

const sinTurnos = (p: PropsCuerpo) => (
  <EmptyState
    icon={CalendarDays} title="No appointments today"
    detail={p.salas.length > 0 ? 'No appointments match the selected operatories.' : 'Your schedule is clear. Add an appointment or check pending requests.'}
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

/* Variante A · Board: las tres listas a la vista, del alto de la pantalla y cada una con su scroll. Debajo de 1200px
   no entran tres columnas legibles: pasan a tabs. */
export function CuerpoTablero(p: PropsCuerpo) {
  const [tab, setTab] = useState<'appointments' | 'waiting' | 'tasks'>('appointments')
  const g = agruparTurnos(p.dia, p.salas)
  const tareas = tareasFiltradas(p)
  const t = agruparTareas(tareas)
  const resto = g.proximos.slice(1)
  const alto = 'min-[1200px]:max-h-[max(520px,calc(100dvh-400px))]'
  const scroll = 'gap-4 min-[1200px]:overflow-y-auto'
  const oculto = (k: typeof tab) => tab !== k && 'max-[1199px]:hidden'
  const espera = g.espera[0]?.espera ?? 0

  return (
    <div className="mt-5 flex flex-col gap-4">
      <RoomStrip rooms={p.dia.rooms} />

      <Tabs
        fullWidth className="min-[1200px]:hidden" aria-label="Lists" value={tab} onChange={setTab}
        tabs={[
          { value: 'appointments' as const, label: 'Appointments', count: g.total },
          { value: 'waiting' as const, label: 'In the clinic', count: g.espera.length + g.enSillon.length },
          { value: 'tasks' as const, label: 'Tasks', count: tareas.length },
        ]}
      />

      <div className="grid gap-4 min-[1200px]:grid-cols-3">
        <Panel
          title={<>Appointments <Count>{g.total}</Count></>} controls={filtroSalas(p)}
          className={cn(alto, oculto('appointments'))} bodyClassName={scroll}
          footer={(
            <Link to="/scheduling" className="flex items-center gap-1 text-[12px] font-medium text-dash-blue hover:underline">
              Open Scheduling <ArrowRight className="size-3.5" />
            </Link>
          )}
        >
          {g.total === 0 ? sinTurnos(p) : (
            <>
              {g.siguiente && siguiente(p, g.siguiente, 'a')}
              <ListGroup title="Up next" tone="info" sticky>{resto.map((a) => fila(p, a, 'upcoming', 'a'))}</ListGroup>
              <ListGroup title="Completed" sticky collapsible defaultOpen={false}>{g.hechos.map((a) => fila(p, a, 'done', 'a'))}</ListGroup>
            </>
          )}
        </Panel>

        {/* Quién está en la clínica: los que esperan (el que más espera primero) y los que están en el sillón. Juntos
            dicen el flujo de un vistazo, y la columna no queda medio vacía con una sala de espera corta. */}
        <Panel title={<>In the clinic <Count>{g.espera.length + g.enSillon.length}</Count></>} className={cn(alto, oculto('waiting'))} bodyClassName={scroll}>
          {g.espera.length + g.enSillon.length === 0 ? sinEspera : (
            <>
              <ListGroup
                title="Waiting" tone="warning" sticky empty="Nobody is waiting."
                note={g.espera.length > 0 && <>longest <span className={cn('font-semibold', tonoEspera(espera))}>{espera} min</span></>}
              >
                {g.espera.map((a) => fila(p, a, 'waiting', 'a'))}
              </ListGroup>
              <ListGroup title="In chair" sticky empty="Nobody is in chair right now.">{g.enSillon.map((a) => fila(p, a, 'in-chair', 'a'))}</ListGroup>
            </>
          )}
        </Panel>

        <Panel title={<>Pending Task <Count>{tareas.length}</Count></>} controls={filtroTipos(p)} className={cn(alto, oculto('tasks'))} bodyClassName={scroll}>
          {tareas.length === 0 ? sinTareas(p) : (
            <>
              <ListGroup title="Overdue" tone="danger" sticky>{t.vencidas.map((x, i) => <TaskRow key={\`v\${i}\`} task={x} onComplete={() => p.onCompletar(x)} />)}</ListGroup>
              <ListGroup title="Due today" tone="warning" sticky>{t.hoy.map((x, i) => <TaskRow key={\`h\${i}\`} task={x} onComplete={() => p.onCompletar(x)} />)}</ListGroup>
              <ListGroup title="Later" sticky>{t.despues.map((x, i) => <TaskRow key={\`d\${i}\`} task={x} onComplete={() => p.onCompletar(x)} />)}</ListGroup>
            </>
          )}
        </Panel>
      </div>
    </div>
  )
}

/* Variante B · Focus: arriba lo que pasa ahora (el próximo, quién está en el sillón, quién espera más); abajo, una
   sola lista a lo ancho con tabs, con las filas en columnas. */
export function CuerpoFoco(p: PropsCuerpo) {
  const [tab, setTab] = useState<'schedule' | 'waiting' | 'tasks'>('schedule')
  const lista = useRef<HTMLDivElement>(null)
  const g = agruparTurnos(p.dia, p.salas)
  const tareas = tareasFiltradas(p)
  const t = agruparTareas(tareas)
  const espera = g.espera[0]?.espera ?? 0
  const verLista = (k: typeof tab) => {
    setTab(k)
    lista.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="mt-5 flex flex-col gap-4">
      <section aria-label="Right now" className={cn(TARJETA_PANEL, 'grid divide-y divide-line-soft lg:grid-cols-3 lg:divide-x lg:divide-y-0')}>
        <div className="flex flex-col gap-2 p-4">
          <p className="text-[11px] font-semibold tracking-wide text-dash-blue uppercase">Next patient</p>
          {g.siguiente ? siguiente(p, g.siguiente, 'b-now') : (
            <EmptyState icon={CalendarDays} title="No one else today" detail="Every appointment of this day is in chair or done." className="py-6" />
          )}
          <ListGroup title="Then" count={Math.max(0, g.proximos.length - 1)} className="mt-1">
            {g.proximos.slice(1, 3).map((a) => fila(p, a, 'upcoming', 'b-now'))}
          </ListGroup>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <ListGroup title="In chair" empty="Nobody is in chair right now.">{g.enSillon.map((a) => fila(p, a, 'in-chair', 'b-now'))}</ListGroup>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <ListGroup
            title="Waiting" tone="warning" count={g.espera.length} empty="Nobody is waiting."
            note={g.espera.length > 0 && <>longest <span className={cn('font-semibold', tonoEspera(espera))}>{espera} min</span></>}
          >
            {g.espera.slice(0, 3).map((a) => fila(p, a, 'waiting', 'b-now'))}
          </ListGroup>
          {g.espera.length > 3 && (
            <button type="button" onClick={() => verLista('waiting')} className="flex items-center gap-1 self-start rounded text-[12px] font-medium text-dash-blue hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue">
              See all {g.espera.length} <ArrowRight className="size-3.5" />
            </button>
          )}
        </div>
      </section>

      <RoomStrip rooms={p.dia.rooms} />

      <div ref={lista} className="scroll-mt-4">
        <Panel
          title="Full day"
          controls={(
            <div className="flex flex-wrap items-center gap-2">
              <Tabs
                size="sm" aria-label="List" value={tab} onChange={setTab}
                tabs={[
                  { value: 'schedule' as const, label: 'Schedule', count: g.total },
                  { value: 'waiting' as const, label: 'Waiting room', count: g.espera.length },
                  { value: 'tasks' as const, label: 'Pending tasks', count: tareas.length },
                ]}
              />
              {tab === 'schedule' && filtroSalas(p)}
              {tab === 'tasks' && filtroTipos(p)}
            </div>
          )}
          bodyClassName="gap-4"
        >
          {tab === 'schedule' && (g.total === 0 ? sinTurnos(p) : (
            <>
              <ListGroup title="Up next" tone="info" limit={8}>{g.proximos.map((a) => fila(p, a, 'upcoming', 'b'))}</ListGroup>
              <ListGroup title="In chair">{g.enSillon.map((a) => fila(p, a, 'in-chair', 'b'))}</ListGroup>
              <ListGroup title="Completed" collapsible defaultOpen={false}>{g.hechos.map((a) => fila(p, a, 'done', 'b'))}</ListGroup>
            </>
          ))}
          {tab === 'waiting' && (g.espera.length === 0 ? sinEspera : (
            <ListGroup title="Longest wait first">{g.espera.map((a) => fila(p, a, 'waiting', 'b'))}</ListGroup>
          ))}
          {tab === 'tasks' && (tareas.length === 0 ? sinTareas(p) : (
            <>
              <ListGroup title="Overdue" tone="danger" limit={8}>{t.vencidas.map((x, i) => <TaskRow key={\`v\${i}\`} task={x} onComplete={() => p.onCompletar(x)} />)}</ListGroup>
              <ListGroup title="Due today" tone="warning" limit={8}>{t.hoy.map((x, i) => <TaskRow key={\`h\${i}\`} task={x} onComplete={() => p.onCompletar(x)} />)}</ListGroup>
              <ListGroup title="Later" limit={8}>{t.despues.map((x, i) => <TaskRow key={\`d\${i}\`} task={x} onComplete={() => p.onCompletar(x)} />)}</ListGroup>
            </>
          ))}
        </Panel>
      </div>
    </div>
  )
}
`})))()}export{n,i as r,r as t};