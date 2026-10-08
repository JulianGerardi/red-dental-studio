import type { Meta, StoryObj } from '@storybook/react-vite'
import { userEvent, within } from 'storybook/test'
import { CirclePlus, History } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FilterTrigger } from '@/components/ui/filter-menu'
import { Pill } from '@/components/ui/pill'
import { Bloque, ConRotulo, Lienzo, Muestras, Tabla, Token } from '@/design-system/kit'
import { escribir, esperar, pulsar, secuencia } from '@/design-system/play'
import { ORDENES } from '@/data/clinical-mode'
import { LabOrderPanel, ORDEN_TONO } from './LabOrderPanel'

const ANCHOS = { desktop: 1280, tablet: 768, phone: 390 } as const
type Args = { orders: number; width: keyof typeof ANCHOS }

/* El panel al ancho elegido; la key lo reinicia al cambiar los controles. */
function Panel({ orders, width }: Args) {
  return (
    <div className="max-w-full" style={{ width: ANCHOS[width] }}>
      <LabOrderPanel key={`${orders}-${width}`} ordenes={ORDENES.slice(0, orders)} />
    </div>
  )
}

const meta = {
  title: 'Components/Clinical/LabOrderPanel',
  parameters: {
    layout: 'padded',
    docs: {
      story: { inline: false, iframeHeight: 760 },
      description: {
        component: [
          'La pestaña **Lab Order** de Clinical Mode (Figma 4070:148911, el listado). Desde el 2026-10-08 usa la estética del resto de la app: la card de la página (sombra, sin borde) con la **tabla estándar** (Elements / Tables) adentro, igual que la Problem List del Overview.',
          '',
          '**Barra:** el buscador primero y después **Filter** (Elements / Filter) con los estados de la orden, su cantidad y el punto del color de su pill; a la derecha *View History* (secundario) y *New Prescription* (la acción principal), los dos con `ui/button`. **Tabla:** Provider y Patient con las iniciales del equipo, la pill de estado, las fechas (la de vencimiento en rojo si vence pronto) y el kebab de fila (*View order*, *Edit order* y, si sigue abierta, *Cancel order* con Undo). **Pie:** el de la tabla estándar, con *Show* 5 / 10 / 20 y la paginación.',
          '',
          '"active prescriptions" y "New Prescription" son texto de Prescription que quedó en el frame (anomalía 85): se copian tal cual. El detalle de la orden y el modal *New Laboratory* quedan pendientes.',
          '',
          '**Probalo:** en *Playground* buscá, filtrá por estado, abrí el menú de una fila y cancelá una orden; desde *Controls* cambiá cuántas órdenes hay (0 muestra el vacío) y el ancho.',
        ].join('\n'),
      },
    },
  },
  args: { orders: ORDENES.length, width: 'desktop' },
  argTypes: {
    orders: { control: { type: 'range', min: 0, max: ORDENES.length, step: 1 }, description: 'Cuántas órdenes trae el panel. Con 0, el estado vacío; con más de 5 y Show en 5, la paginación.' },
    width: { control: 'inline-radio', options: Object.keys(ANCHOS), description: 'desktop 1280 · tablet 768 (la tabla scrollea adentro de su caja) · phone 390.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

/* Buscá, filtrá y abrí el menú de una fila; cambiá cuántas órdenes hay y el ancho desde Controls. */
export const Playground: Story = { render: (args) => <Panel {...args} /> }

/* ── Parts ─────────────────────────────────────────────────────────── */

export const Parts: Story = {
  parameters: { controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Toolbar" nota="El buscador y Filter a la izquierda; las acciones a la derecha. Todo de 36px de alto.">
        <Muestras>
          <ConRotulo rotulo="Filter (sin aplicar / con 2 estados)"><span className="flex gap-2"><FilterTrigger /><FilterTrigger count={2} /></span></ConRotulo>
          <ConRotulo rotulo="View History · secondary lg"><Button variant="secondary"><History /> View History</Button></ConRotulo>
          <ConRotulo rotulo="New Prescription · primary lg"><Button><CirclePlus /> New Prescription</Button></ConRotulo>
        </Muestras>
      </Bloque>
      <Bloque titulo="Status pills" nota="ORDEN_TONO: el mismo tono en la tabla, en el punto del filtro y en el detalle de la Problem List (RecordDetail).">
        <Muestras>
          {Object.entries(ORDEN_TONO).map(([e, tono]) => <ConRotulo key={e} rotulo={tono}><Pill tone={tono}>{e}</Pill></ConRotulo>)}
        </Muestras>
      </Bloque>
      <Bloque titulo="What each part does">
        <Tabla encabezado={['Part', 'What it does', 'Component']} minimo={720}>
          <tr><td className="font-semibold">Card</td><td>La card de la página: blanca, sombra, sin borde, 16px de aire.</td><td><code>TARJETA_PANEL</code></td></tr>
          <tr><td className="font-semibold">Search</td><td>Filtra mientras se tipea por provider, paciente o estado.</td><td><code>DataTable search</code></td></tr>
          <tr><td className="font-semibold">Filter</td><td>Estados de la orden, de a varios, con cantidad y color; sin nada tildado se ve todo. Se borra con Clear all.</td><td><code>DataTable filter</code> → FilterMenu</td></tr>
          <tr><td className="font-semibold">View History</td><td>Acción secundaria. Avisa que no está en esta versión.</td><td><code>Button secondary</code></td></tr>
          <tr><td className="font-semibold">New Prescription</td><td>La acción principal. Avisa que no está en esta versión.</td><td><code>Button</code></td></tr>
          <tr><td className="font-semibold">Provider · Patient</td><td>Iniciales en el círculo celeste del equipo y el nombre, sin link.</td><td>como <code>PersonCell tone=soft</code></td></tr>
          <tr><td className="font-semibold">Status</td><td>La pill del estado.</td><td><code>Pill</code></td></tr>
          <tr><td className="font-semibold">Expiration Date</td><td>En rojo y semibold si vence pronto (<code>urgente</code>).</td><td>—</td></tr>
          <tr><td className="font-semibold">Row menu</td><td>View order, Edit order y, en Requested / Pending / Delayed, Cancel order (rojo) con Undo.</td><td><code>RowActionsMenu</code></td></tr>
          <tr><td className="font-semibold">Footer</td><td>"Showing X to Y of N active prescriptions", Show 5 / 10 / 20 y las páginas.</td><td><code>DataTable</code></td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

/* ── States ────────────────────────────────────────────────────────── */

/* El filtro abierto: cada estado con su cantidad y su color. */
export const FilterOpen: Story = {
  name: 'Filter open',
  render: (args) => <Panel {...args} />,
  play: secuencia(pulsar(/filter lab orders by status/i), esperar(/^Filters$/)),
}

/* Filtrado por Requested: el botón se pinta de azul con la cuenta y el pie dice "filtered from 9". */
export const Filtered: Story = {
  render: (args) => <Panel {...args} />,
  play: async (c) => {
    await pulsar(/filter lab orders by status/i)(c)
    await userEvent.click(await within(c.canvasElement.ownerDocument.body).findByRole('menuitemcheckbox', { name: /Requested/ }))
    await esperar(/filtered from 9/)(c)
  },
}

/* El menú de una orden abierta: View order, Edit order y Cancel order. */
export const RowMenu: Story = {
  name: 'Row menu',
  render: (args) => <Panel {...args} />,
  play: secuencia(pulsar(/actions for james cartes/i), esperar(/cancel order/i)),
}

/* Cancelar una orden: pasa a Canceled y el aviso ofrece Undo. */
export const Canceled: Story = {
  render: (args) => <Panel {...args} />,
  play: async (c) => {
    await pulsar(/actions for james cartes/i)(c)
    await userEvent.click(await within(c.canvasElement.ownerDocument.body).findByRole('menuitem', { name: /cancel order/i }))
    await esperar(/lab order for james cartes canceled/i)(c)
  },
}

/* Búsqueda sin resultados: el vacío de la tabla estándar. */
export const NoResults: Story = {
  name: 'No results',
  render: (args) => <Panel {...args} />,
  play: secuencia(escribir(/search/i, 'zzzz'), esperar(/nothing matches/i)),
}

/* Sin órdenes: el estado vacío del panel. */
export const Empty: Story = { args: { orders: 0 }, render: (args) => <Panel {...args} />, play: esperar(/no lab orders yet/i) }

/* En el teléfono: la barra baja en filas y la tabla scrollea de costado adentro de su caja. */
export const Phone: Story = { args: { width: 'phone' }, render: (args) => <Panel {...args} /> }

export const States: Story = {
  parameters: { controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="States">
        <Tabla encabezado={['State', 'When', 'Story']} minimo={620}>
          <tr><td className="font-semibold">Default</td><td>Las 9 órdenes del frame, sin filtro.</td><td>Playground</td></tr>
          <tr><td className="font-semibold">Filter open</td><td>Los seis estados con cantidad y color, en el orden del pedido.</td><td>Filter Open</td></tr>
          <tr><td className="font-semibold">Filtered</td><td>Filter azul con la cuenta; el pie dice "(filtered from 9)".</td><td>Filtered</td></tr>
          <tr><td className="font-semibold">Row menu</td><td>View order, Edit order y Cancel order si la orden sigue abierta.</td><td>Row Menu</td></tr>
          <tr><td className="font-semibold">Canceled</td><td>La orden pasa a Canceled; Undo la devuelve.</td><td>Canceled</td></tr>
          <tr><td className="font-semibold">No results</td><td>La búsqueda o el filtro no encuentran nada: "No results".</td><td>No Results</td></tr>
          <tr><td className="font-semibold">Empty</td><td>El paciente no tiene órdenes: "No lab orders yet".</td><td>Empty</td></tr>
          <tr><td className="font-semibold">Phone</td><td>La barra baja en filas; la tabla scrollea adentro de su caja.</td><td>Phone</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

/* ── Specs ─────────────────────────────────────────────────────────── */

export const Specs: Story = {
  parameters: { controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Specs">
        <Tabla encabezado={['Item', 'Value']} minimo={620}>
          <tr><td className="font-semibold">Card</td><td>Radio 8 · padding 16 · <Token nombre="white" /> · shadow-panel, sin borde</td></tr>
          <tr><td className="font-semibold">Toolbar</td><td>Alto 36 · search 260 · Filter md · botones lg · 8 entre piezas · 12 hasta la tabla</td></tr>
          <tr><td className="font-semibold">Table</td><td>La estándar: encabezado 44 en <Token nombre="surface-alt" />, filas 56, texto 13px <Token nombre="ink-soft" />, divisor <Token nombre="line-row" /></td></tr>
          <tr><td className="font-semibold">Columns</td><td>Provider y Patient se estiran (mín. 160) · Status 110 · Updated 110 · Created 110 · Expiration Date 120 · Actions 40</td></tr>
          <tr><td className="font-semibold">People</td><td>Círculo 32 en <Token nombre="dash-count-bg" />, iniciales 11px <Token nombre="dash-blue-hover" />; nombre 13px medium <Token nombre="ink" /></td></tr>
          <tr><td className="font-semibold">Expiring soon</td><td>Semibold <Token nombre="dash-bad-fg" /></td></tr>
          <tr><td className="font-semibold">Rows per page</td><td>10 (entran las 9 del frame), con Show 5 / 10 / 20</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
