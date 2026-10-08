import type { Meta, StoryObj } from '@storybook/react-vite'
import { CoverageBar } from './CoverageBar'
import { Bloque, Lienzo, Muestra, Muestras, Tabla, TablaPartes, Token, useMedidas } from '@/design-system/kit'

const meta = {
  title: 'Components/Finance/CoverageBar',
  component: CoverageBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Lo que paga un plan en una categoría (`@/components/finance/CoverageBar`): una barra corta y el porcentaje. La usan la tabla de reglas de una coverage table y el drawer de una regla.',
          '',
          '**Cómo se lee:** verde es que cubre todo (100%), azul que cubre una parte y "Not covered" en gris que no paga nada. El número va siempre: la barra sola no alcanza para leer 70 contra 80.',
          '',
          '**Probalo:** en *Playground* cambiá *value* y *size* desde *Controls*.',
        ].join('\n'),
      },
    },
  },
  args: { value: 80, size: 'md' },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 5 }, description: 'Porcentaje que paga el plan, de 0 a 100.' },
    size: { control: 'inline-radio', options: ['md', 'sm'], description: 'md (64px) en tablas · sm (40px) en resúmenes.' },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof CoverageBar>

export default meta
type Story = StoryObj<typeof meta>

const sinControles = { controls: { disable: true } }

export const Playground: Story = {}

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque><CoverageBar value={80} /></Bloque>
      <TablaPartes partes={[
        ['Track', 'El 100%, en gris. Da la escala.', 'span[role=meter]'],
        ['Fill', 'Lo que paga: verde si es 100, azul si es menos.', 'span'],
        ['Number', 'El porcentaje exacto, con cifras de ancho fijo para que las filas alineen.', 'span'],
        ['Not covered', 'Reemplaza barra y número cuando el plan no paga (0%).', 'span'],
      ]} />
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Muestras>
        <Muestra titulo="Full" nota="100%: cubre todo, en verde."><CoverageBar value={100} /></Muestra>
        <Muestra titulo="Partial" nota="De 1 a 99: azul."><CoverageBar value={80} /></Muestra>
        <Muestra titulo="Low" nota="Igual que partial: el color no juzga el porcentaje."><CoverageBar value={10} /></Muestra>
        <Muestra titulo="Not covered (empty)" nota="0%: sin barra, el texto en gris."><CoverageBar value={0} /></Muestra>
        <Muestra titulo="Small" nota="size sm, en resúmenes y drawers angostos."><CoverageBar value={50} size="sm" /></Muestra>
      </Muestras>
    </Lienzo>
  ),
}

function Medida({ size }: { size: 'md' | 'sm' }) {
  const { ref, m } = useMedidas('[role=meter]')
  return (
    <tr>
      <td className="font-semibold">{size}</td>
      <td><div ref={ref}><CoverageBar value={60} size={size} /></div></td>
      <td className="tabular-nums">{m?.ancho}</td>
      <td className="tabular-nums">{m?.alto}</td>
      <td className="tabular-nums">{m?.radio}</td>
    </tr>
  )
}

export const Specs: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Sizes" nota="Medidas leídas de la barra dibujada.">
        <Tabla encabezado={['Size', 'Sample', 'Width', 'Height', 'Radius']} minimo={520}>
          <Medida size="md" />
          <Medida size="sm" />
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors" nota="De CoverageBar.tsx y src/index.css.">
        <Tabla encabezado={['Part', 'Token']} minimo={420}>
          <tr><td className="font-semibold">Track</td><td><Token nombre="surface-muted" /></td></tr>
          <tr><td className="font-semibold">Fill · 100%</td><td><Token nombre="dash-ok-fg" /></td></tr>
          <tr><td className="font-semibold">Fill · partial</td><td><Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Number</td><td><Token nombre="ink" /> · 12px semibold</td></tr>
          <tr><td className="font-semibold">Not covered</td><td><Token nombre="ink-faint" /> · 12px medium</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>The value is clamped between 0 and 100.</li>
          <li>The bar has role meter and reads “Covered at N%”.</li>
        </ul>
      </Bloque>
    </Lienzo>
  ),
}
