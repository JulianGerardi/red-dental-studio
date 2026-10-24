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
          "En el Overview va con `llena`: en desktop la columna llega hasta el final de la tabla de al lado, sin estirar la fila, y la lista scrollea adentro. Así no queda espacio muerto debajo (2026-10-18).",
          "",
          "**Probalo:** en *Playground* tocá una tarjeta y prendé *llena* desde *Controls*: la card toma el alto del contenedor (acá, 640px). *Fill the column* lo muestra al lado de una columna más alta.",
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof TreatmentPlanList>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { llena: false },
  argTypes: { llena: { control: 'boolean', description: 'Desde 1024px ocupa todo el alto del contenedor (position: relative) sin estirarlo; la lista scrollea. Debajo, máximo 560px.' } },
  render: (args) => <div className="relative h-[640px] w-[360px]"><TreatmentPlanList {...args} /></div>,
}

/* Como en el Overview: la columna de al lado (el chart y la tabla) marca el alto y la card llega hasta abajo. */
export const FillTheColumn: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: false, iframeHeight: 900 } } },
  render: () => (
    <div className="bg-page-background flex gap-4 p-4">
      <div className="relative w-[360px] shrink-0"><TreatmentPlanList llena /></div>
      <div className="flex h-[840px] flex-1 items-center justify-center rounded-lg border border-dashed border-line text-[12px] text-ink-muted">Chart + Problem List (840px)</div>
    </div>
  ),
}

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

/* Medidas y la regla del alto. */
export const Specs: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Specs">
        <Tabla encabezado={["Item", "Value"]} minimo={560}>
          <tr><td className="font-semibold">Width</td><td>360px en el Overview (con 300 los datos de la tarjeta no entraban en una línea).</td></tr>
          <tr><td className="font-semibold">Height</td><td>Con <code>llena</code>, desde 1024px: el alto de la columna de al lado, hasta el final de la tabla. Debajo de 1024 (apilado) y sin <code>llena</code>: la lista hasta 560px.</td></tr>
          <tr><td className="font-semibold">List</td><td>Scroll adentro, 12px entre tarjetas.</td></tr>
          <tr><td className="font-semibold">Card</td><td>Card de la página: padding 16px, rounded-lg, shadow-panel, sin borde.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
