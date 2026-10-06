import type { Meta, StoryObj } from '@storybook/react-vite'
import { userEvent, within } from 'storybook/test'
import { TooltipProvider } from '@/components/ui/tooltip'
import { NoteCell, ProblemList, ToothCell } from './ProblemList'
import { escribir, esperar, secuencia } from '@/design-system/play'

const meta = {
  title: 'Components/Clinical/ProblemList',
  component: ProblemList,
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 560 } } },
} satisfies Meta<typeof ProblemList>

export default meta
type Story = StoryObj<typeof meta>

/* Problem List con el filtro en Active, como abre en red.dev. */
export const Default: Story = {}

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
