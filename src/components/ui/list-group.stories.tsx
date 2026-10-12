import type { Meta, StoryObj } from '@storybook/react-vite'
import { ListGroup, LIST_GROUP_TONES, type ListGroupTone } from './list-group'
import { AppointmentRow, TaskRow } from '@/components/dashboard/DashboardRows'
import { DIA_CARGADO } from '@/components/dashboard/dashboard-data'
import { Bloque, Lienzo, Muestra, Tabla, TablaPartes, Token, useMedidas } from '@/design-system/kit'
import { tokensDe } from '@/design-system/medir'
import { TARJETA_PANEL } from '@/lib/estilos'
import { cn } from '@/lib/utils'

/* Filas de ejemplo: las tareas del día cargado. */
const TAREAS = DIA_CARGADO.tasks
const filas = (n: number) => TAREAS.slice(0, n).map((t, i) => <TaskRow key={i} task={t} />)
const despues = (n: number) => TAREAS.filter((t) => (t.vence ?? 0) > 0).slice(0, n).map((t, i) => <TaskRow key={i} task={t} />)
const hechos = (n: number) => DIA_CARGADO.appointments.filter((a) => a.completado).slice(0, n).map((a, i) => <AppointmentRow key={i} appt={a} etapa="done" />)

type Args = { title: string; tone: ListGroupTone; items: number; collapsible: boolean; limit: number; note: string; empty: string }

const meta = {
  title: 'Elements/List group',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Un grupo de una lista larga adentro de una card (`@/components/ui/list-group`): rótulo en versalitas con la cuenta, las filas en una caja de línea fina y, si hace falta, **plegable** y con **tope** ("Show 12 more"). Es lo que ordena un panel con mucho: en lugar de cuarenta cards iguales, grupos por lo que importa ahora (Overdue · Due today · Later; Up next · In chair · Completed).',
          '',
          '**Cuándo usarlo:** una lista de más de ~6 ítems adentro de un panel. El color del rótulo dice la urgencia del grupo, no decora: rojo para lo vencido, ámbar para hoy, azul para lo que sigue, gris para el resto. Generaliza el agrupado de *Pending documents* (Patient Dashboard).',
          '',
          '**Probalo:** en *Playground* cambiá la cantidad de filas, el tope y el tono desde *Controls*; tocá el rótulo si es plegable y "Show N more".',
        ].join('\n'),
      },
    },
  },
  args: { title: 'Overdue', tone: 'danger', items: 8, collapsible: false, limit: 5, note: '', empty: 'Nothing overdue.' },
  argTypes: {
    title: { control: 'text', description: 'El nombre del grupo. Va en versalitas con la cuenta.' },
    tone: { control: 'inline-radio', options: Object.keys(LIST_GROUP_TONES), description: 'Color del rótulo: la urgencia del grupo.' },
    items: { control: { type: 'range', min: 0, max: 20 }, description: 'Cuántas filas tiene el grupo. Con 0 se ve el texto de vacío.' },
    collapsible: { control: 'boolean', description: 'El rótulo pliega y despliega el grupo.' },
    limit: { control: { type: 'range', min: 0, max: 12 }, description: 'Cuántas filas se ven antes de "Show N more". 0 = sin tope.' },
    note: { control: 'text', description: 'Dato a la derecha del rótulo ("longest 27 min").' },
    empty: { control: 'text', description: 'Texto cuando el grupo está vacío. Sin texto, el grupo vacío no se dibuja.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>
const sinControles = { controls: { disable: true } }

export const Playground: Story = {
  render: (a) => (
    <div className={cn(TARJETA_PANEL, 'max-w-[420px] p-4')}>
      <ListGroup
        key={`${a.collapsible}-${a.limit}`} title={a.title} tone={a.tone} collapsible={a.collapsible}
        limit={a.limit || undefined} note={a.note || undefined} empty={a.empty || undefined}
      >
        {filas(a.items)}
      </ListGroup>
    </div>
  ),
}

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque nota="Rótulo arriba, filas en una caja de línea fina (shadow-hairline) separadas por una línea más tenue, y el pie con el tope.">
        <div className={cn(TARJETA_PANEL, 'max-w-[420px] p-4')}>
          <ListGroup title="Due today" tone="warning" note="6 of 28" limit={3}>{filas(6)}</ListGroup>
        </div>
      </Bloque>
      <TablaPartes partes={[
        ['Label', 'Nombre del grupo y su cuenta en 11px Semibold versalitas, en el color del tono. Plegable: lleva un chevron y es un botón con aria-expanded.', 'ListGroup title · tone · collapsible'],
        ['Note', 'Un dato del grupo a la derecha del rótulo, en 11px gris.', 'note'],
        ['Rows', 'Cada hijo es una fila (un <li>). La caja es blanca con línea de medio pixel; entre filas, line-soft.', 'children'],
        ['Show more', 'Con tope, el resto queda detrás de "Show N more"; abierto, "Show less".', 'limit'],
        ['Empty', 'Sin filas, una línea de texto en la misma caja. Sin texto, el grupo no se dibuja.', 'empty'],
      ]} />
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <div className="grid gap-6 md:grid-cols-2">
        <Muestra titulo="With limit" nota="Las primeras 3 y el resto detrás de Show N more.">
          <div className={cn(TARJETA_PANEL, 'p-4')}><ListGroup title="Later" limit={3}>{despues(7)}</ListGroup></div>
        </Muestra>
        <Muestra titulo="Collapsed" nota="Completed arranca plegado: ya pasó, se consulta poco.">
          <div className={cn(TARJETA_PANEL, 'p-4')}><ListGroup title="Completed" collapsible defaultOpen={false}>{hechos(4)}</ListGroup></div>
        </Muestra>
        <Muestra titulo="Collapsible, open">
          <div className={cn(TARJETA_PANEL, 'p-4')}><ListGroup title="Completed" collapsible>{hechos(2)}</ListGroup></div>
        </Muestra>
        <Muestra titulo="Empty" nota="Con texto de vacío: el grupo se ve y dice que no hay nada.">
          <div className={cn(TARJETA_PANEL, 'p-4')}><ListGroup title="In chair" empty="Nobody is in chair right now." /></div>
        </Muestra>
        <Muestra titulo="Sticky label in a scrolling panel" nota="Scrolleá: el rótulo de cada grupo queda pegado arriba mientras pasan sus filas.">
          <div className={cn(TARJETA_PANEL, 'h-[260px] overflow-y-auto p-4')}>
            <div className="flex flex-col gap-4">
              <ListGroup title="Overdue" tone="danger" sticky>{filas(4)}</ListGroup>
              <ListGroup title="Due today" tone="warning" sticky>{TAREAS.slice(6, 10).map((t, i) => <TaskRow key={i} task={t} />)}</ListGroup>
            </div>
          </div>
        </Muestra>
        <Muestra titulo="Tones" nota="El color del rótulo es la urgencia.">
          <div className={cn(TARJETA_PANEL, 'flex flex-col gap-3 p-4')}>
            {(Object.keys(LIST_GROUP_TONES) as ListGroupTone[]).map((t) => <ListGroup key={t} title={t} tone={t} collapsible defaultOpen={false}>{filas(1)}</ListGroup>)}
          </div>
        </Muestra>
      </div>
    </Lienzo>
  ),
}

function MedidaRotulo() {
  const { ref, m } = useMedidas('p')
  return (
    <>
      <div ref={ref} className="max-w-[360px]"><ListGroup title="Overdue" tone="danger">{filas(1)}</ListGroup></div>
      <Tabla encabezado={['Part', 'Text', 'Height']} minimo={420}>
        <tr><td className="font-semibold">Label</td><td className="tabular-nums">{m?.texto} · {m?.peso}</td><td className="tabular-nums">{m?.alto}</td></tr>
      </Tabla>
    </>
  )
}

export const Specs: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Size" nota="Leído del rótulo dibujado. Entre el rótulo y la caja, 6px; entre grupos, el gap del panel (16px).">
        <MedidaRotulo />
      </Bloque>
      <Bloque titulo="Tones" nota="De LIST_GROUP_TONES (list-group.tsx) y src/index.css.">
        <Tabla encabezado={['Tone', 'Use', 'Text']} minimo={560}>
          {(Object.keys(LIST_GROUP_TONES) as ListGroupTone[]).map((t) => (
            <tr key={t}>
              <td className="font-semibold">{t}</td>
              <td className="text-ink-medium">{{ default: 'Later, Completed, In chair', danger: 'Overdue', warning: 'Due today, Waiting', info: 'Up next', success: 'Done, when it is good news' }[t]}</td>
              <td><Token nombre={tokensDe(LIST_GROUP_TONES[t]).texto} /></td>
            </tr>
          ))}
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
