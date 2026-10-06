import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bloque, Lienzo, Tabla } from '@/design-system/kit'
import { TreatmentPlanList } from './TreatmentPlanList'

const meta = {
  title: 'Components/Clinical/TreatmentPlanList',
  component: TreatmentPlanList,
  parameters: {
    layout: 'padded',
    docs: {
      story: { inline: false, iframeHeight: 720 },
      description: {
        component: [
          "Los Treatment Plans del Overview de Clinical Mode, en tarjetas con la estructura de red.dev (la opción A que eligió Julián, porque muestra el detalle). Tocar una tarjeta abre ese caso en Treatment Plan.",
          "",
          "**Probalo:** en *Playground* tocá una tarjeta.",
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof TreatmentPlanList>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/* Las partes de una tarjeta. */
export const Parts: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Parts">
        <Tabla encabezado={["Part", "What it does"]} minimo={560}>
          <tr><td className="font-semibold">Header</td><td>Nombre del plan, grupo y la pill del estado del caso.</td></tr>
          <tr><td className="font-semibold">Data</td><td>Doctor y rol, total y fecha de creación, con su ícono.</td></tr>
          <tr><td className="font-semibold">Progress</td><td>Procedimientos completados sobre el total, con barra.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

/* Los estados del caso, con el tono de su pill. */
export const States: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="States">
        <Tabla encabezado={["Case status", "Pill tone"]} minimo={560}>
          <tr><td className="font-semibold">Planning</td><td>warning</td></tr>
          <tr><td className="font-semibold">Pending</td><td>purple</td></tr>
          <tr><td className="font-semibold">Presented</td><td>info</td></tr>
          <tr><td className="font-semibold">Waiting for consent</td><td>neutral</td></tr>
          <tr><td className="font-semibold">Accepted</td><td>success</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
