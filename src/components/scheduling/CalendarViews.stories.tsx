import type { Meta, StoryObj } from '@storybook/react-vite'
import { EVENTOS_INICIALES, FECHA_ANCLA } from './calendar-data'
import { Cabecera, ColumnaHoras, VistaDia, VistaMes, VistaSemana } from './CalendarViews'

const props = { eventos: EVENTOS_INICIALES, fecha: FECHA_ANCLA, onMover: () => {}, onAbrir: () => {} }

const meta = {
  title: 'Components/Scheduling/CalendarViews',
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 720 } } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Week: Story = { render: () => <VistaSemana {...props} /> }
export const Day: Story = { render: () => <VistaDia {...props} /> }
export const Month: Story = { render: () => <VistaMes {...props} /> }

/* Sin turnos las tres vistas se dibujan igual, sólo con la grilla. */
export const EmptyWeek: Story = { render: () => <VistaSemana {...props} eventos={[]} /> }
export const EmptyMonth: Story = { render: () => <VistaMes {...props} eventos={[]} /> }

/* Piezas de la grilla: la columna de horas y la cabecera con los días. */
export const HoursColumn: Story = { render: () => <div className="h-[420px] w-20 overflow-hidden"><ColumnaHoras /></div> }
export const DayHeader: Story = {
  render: () => {
    const dias = Array.from({ length: 7 }, (_, i) => new Date(2022, 4, 29 + i))
    return <div className="flex w-[900px]"><Cabecera dias={dias} hoy={new Date(2022, 4, 31)} /></div>
  },
}
