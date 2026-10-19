import type { Meta, StoryObj } from '@storybook/react-vite'
import { PendingTaskList } from './PendingTaskList'
import type { PendingTask } from './PendingTaskCard'
import { Bloque, Lienzo, Muestra, Tabla, TablaPartes } from '@/design-system/kit'
import { TARJETA_PANEL } from '@/lib/estilos'
import { cn } from '@/lib/utils'

const KINDS = ['Clinical Note', 'Lab Orders', 'Prescriptions', 'Referrals']
const tareas = (n: number, kinds = KINDS): PendingTask[] =>
  Array.from({ length: n }, (_, i) => ({
    kind: kinds[i % kinds.length]!, state: 'Requested', person: 'Elena Marquez', initials: 'EM',
    register: 'March 17, 2025', expiration: 'March 15, 2025',
  }))

type Args = { tasks: number; limit: number; width: number }

const meta = {
  title: 'Components/Dashboard/Pending task list',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Las tareas pendientes con **el diseño de Pending documents** (`@/components/dashboard/PendingTaskList`, Julián, 2026-10-19): agrupadas por tipo (Clinical Note, Lab Orders, Prescriptions, Referrals), cada grupo con su rótulo en versalitas y la cuenta, y las filas en una sola caja con divisores finos. Cada fila (`TaskRow`) lleva el ícono del tipo, el tipo con sus pills, quién y cuándo se registró, el vencimiento, el documento y *Complete this Task*.',
          '',
          '**Dónde:** Pending Task del Dashboard (abajo, a todo el ancho) y Pending Task del Patient Dashboard, que ahora va debajo de Pending documents. Se ven los primeros `limit` y "Show N more" abre el resto con scroll adentro.',
          '',
          '**Probalo:** en *Playground* cambiá la cantidad de tareas, el tope y el ancho desde *Controls*.',
        ].join('\n'),
      },
    },
  },
  args: { tasks: 8, limit: 5, width: 900 },
  argTypes: {
    tasks: { control: { type: 'range', min: 0, max: 16 }, description: 'Cuántas tareas hay, repartidas entre los cuatro tipos.' },
    limit: { control: { type: 'range', min: 1, max: 10 }, description: 'Cuántas se ven antes de "Show N more".' },
    width: { control: { type: 'range', min: 320, max: 1300, step: 10 }, description: 'Ancho de la lista. Angosta, el vencimiento y el botón bajan de renglón.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>
const sinControles = { controls: { disable: true } }

const Caja = ({ ancho, children }: { ancho: number; children: React.ReactNode }) => (
  <div className={cn(TARJETA_PANEL, 'max-w-full p-5')} style={{ width: ancho + 40 }}>{children}</div>
)

export const Playground: Story = {
  render: (a) => <Caja ancho={a.width}><PendingTaskList key={`${a.tasks}-${a.limit}`} tasks={tareas(a.tasks)} limit={a.limit} /></Caja>,
}

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque nota="Dos grupos con sus filas en una caja y los divisores finos entre una y otra.">
        <Caja ancho={900}><PendingTaskList tasks={tareas(4, ['Clinical Note', 'Lab Orders'])} /></Caja>
      </Bloque>
      <TablaPartes partes={[
        ['Group label', 'El tipo y la cuenta, 11px Semibold en versalitas y gris, como Overdue / Due this week en Pending documents.', 'PendingTaskList'],
        ['Rows box', 'Una caja por grupo con la sombra fina y divisores entre filas.', 'shadow-hairline · divide-line-soft'],
        ['Row', 'Ícono, tipo con pills, paciente y registro, vencimiento, documento y botón.', 'TaskRow'],
        ['Show more', 'Los primeros `limit` y el resto con scroll adentro.', 'ShowMore'],
      ]} />
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <div className="grid gap-6">
        <Muestra titulo="With Show more" nota="Ocho tareas con un tope de cinco.">
          <Caja ancho={900}><PendingTaskList tasks={tareas(8)} limit={5} /></Caja>
        </Muestra>
        <Muestra titulo="One group" nota="Como en el Patient Dashboard: todas del mismo tipo.">
          <Caja ancho={900}><PendingTaskList tasks={tareas(3, ['Referrals'])} /></Caja>
        </Muestra>
        <Muestra titulo="Narrow (360px)" nota="El vencimiento y el botón bajan a su renglón; el paciente se corta con elipsis.">
          <Caja ancho={360}><PendingTaskList tasks={tareas(2, ['Lab Orders'])} /></Caja>
        </Muestra>
        <Muestra titulo="Empty" nota="Sin tareas no dibuja nada: el panel muestra su EmptyState.">
          <Caja ancho={600}><PendingTaskList tasks={[]} /><p className="text-[12px] text-ink-muted">(nothing drawn)</p></Caja>
        </Muestra>
      </div>
    </Lienzo>
  ),
}

export const Specs: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Behavior" nota="De PendingTaskList.tsx.">
        <Tabla encabezado={['Part', 'Value']} minimo={480}>
          <tr><td className="font-semibold">Grouping</td><td>Por tipo, en el orden Clinical Note, Lab Orders, Prescriptions, Referrals</td></tr>
          <tr><td className="font-semibold">Gap between groups</td><td className="tabular-nums">16px</td></tr>
          <tr><td className="font-semibold">Label → box</td><td className="tabular-nums">6px</td></tr>
          <tr><td className="font-semibold">Row padding</td><td className="tabular-nums">12px · 10px</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
