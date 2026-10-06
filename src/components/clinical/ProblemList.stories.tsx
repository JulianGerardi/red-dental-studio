import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bloque, Lienzo, Tabla } from '@/design-system/kit'
import { userEvent, within } from 'storybook/test'
import { TooltipProvider } from '@/components/ui/tooltip'
import { NoteCell, ProblemList, ToothCell } from './ProblemList'
import { escribir, esperar, secuencia } from '@/design-system/play'

const meta = {
  title: 'Components/Clinical/ProblemList',
  component: ProblemList,
  parameters: {
    layout: 'padded',
    docs: {
      story: { inline: false, iframeHeight: 560 },
      description: {
        component: [
          "La tabla del Overview de Clinical Mode, con las pestañas **Problem List** y **Procedures** como en red.dev, sobre la tabla estándar (Elements / Tables).",
          "",
          "**Barra:** el buscador primero y después el filtro de estado (Elements / Filter): Active por defecto en Problem List, All en Procedures. Cambiar un estado desde el menú de la fila se puede deshacer.",
          "",
          "**Probalo:** en *Playground* cambiá de pestaña, buscá y filtrá.",
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof ProblemList>

export default meta
type Story = StoryObj<typeof meta>

/* Problem List con el filtro en Active, como abre en red.dev. */
export const Playground: Story = {}

/* La otra pestaña: los procedimientos del paciente, con el filtro en All. */
export const Procedures: Story = {
  play: async (c) => {
    await userEvent.click(await within(c.canvasElement).findByRole('tab', { name: 'Procedures' }))
    await esperar(/D0220/)(c)
  },
}

/* Búsqueda sin resultados: estado vacío "No problems found". */
export const NoResults: Story = { play: secuencia(escribir(/search/i, 'zzzz'), esperar(/no problems found/i)) }

/* El menú de una fila activa: Edit, los cambios de estado (los que cierran en rojo) y Delete. */
export const RowMenu: Story = {
  play: async (c) => {
    const [primera] = await within(c.canvasElement).findAllByRole('button', { name: /actions for abscess/i })
    await userEvent.click(primera)
    await esperar(/start monitoring/i)(c)
  },
}

/* Las piezas de cada fila: la nota (con y sin texto) y la pieza. */
export const Parts: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-6">
        <NoteCell nota="Reports fatigue for the last week; no fever." />
        <NoteCell />
        <ToothCell pieza={14} />
        <ToothCell />
      </div>
    </TooltipProvider>
  ),
}

/* El filtro de estado (Elements / Filter) abierto: Active por defecto, con la cantidad y el color de cada estado. */
export const StatusFilterOpen: Story = {
  play: async (c) => {
    await userEvent.click(await within(c.canvasElement).findByRole('button', { name: /filter problems by status/i }))
    await esperar(/clinic declined/i)(c)
  },
}

/* Estados de la tabla. */
export const States: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="States">
        <Tabla encabezado={["State", "When", "Story"]} minimo={560}>
          <tr><td className="font-semibold">Default</td><td>Problem List con el filtro en Active.</td><td>Playground</td></tr>
          <tr><td className="font-semibold">Procedures</td><td>La otra pestaña, con el filtro en All.</td><td>Procedures</td></tr>
          <tr><td className="font-semibold">Empty</td><td>Búsqueda o filtro sin resultados: No problems found.</td><td>No Results</td></tr>
          <tr><td className="font-semibold">Row menu</td><td>Edit, los cambios de estado (los que cierran, en rojo) y Delete.</td><td>Row Menu</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

/* Medidas. */
export const Specs: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Specs">
        <Tabla encabezado={["Item", "Value"]} minimo={560}>
          <tr><td className="font-semibold">Rows per page</td><td>5, con Show para cambiarlo.</td></tr>
          <tr><td className="font-semibold">Text</td><td>12px, para que entre a 1440 sin scroll.</td></tr>
          <tr><td className="font-semibold">Note and tooth</td><td>NoteCell muestra la nota en un tooltip; ToothCell la pieza o un guion.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
