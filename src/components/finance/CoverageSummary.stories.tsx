import type { Meta, StoryObj } from '@storybook/react-vite'
import { CoverageSummary } from './CoverageSummary'
import { Bloque, Lienzo, Muestra, Muestras, Tabla, TablaPartes, Token } from '@/design-system/kit'
import { COBERTURAS } from '@/data/finanzas'

type Args = { tabla: string; limites: boolean }

const meta = {
  title: 'Components/Finance/CoverageSummary',
  parameters: {
    layout: 'padded',
    docs: {
      decisionsFrom: 'components/finance/CoverageSummary.tsx',
      description: {
        component: [
          'Una coverage table en una línea (`@/components/finance/CoverageSummary`): cuánto paga por clase -Preventive, Basic, Major y Ortho- y, si se pide, sus límites debajo. La usan la lista de *Coverage Tables* y el paso Billing de *New Plan*.',
          '',
          '**Cómo se lee:** si todas las categorías de una clase pagan lo mismo se ve un número ("80%"); si no, el rango ("60–70%"). El detalle por categoría está en la tabla de la coverage table.',
          '',
          '**Probalo:** en *Playground* elegí la tabla y prendé *limites* desde *Controls*.',
        ].join('\n'),
      },
    },
  },
  args: { tabla: COBERTURAS[0].nombre, limites: true },
  argTypes: {
    tabla: { control: 'select', options: COBERTURAS.map((t) => t.nombre), description: 'La coverage table de los datos de ejemplo.' },
    limites: { control: 'boolean', description: 'Suma la línea de máximo anual, deducible y máximo de ortodoncia.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

const sinControles = { controls: { disable: true } }
const tabla = (nombre: string) => COBERTURAS.find((t) => t.nombre === nombre) ?? COBERTURAS[0]

export const Playground: Story = {
  render: (a) => <div className="max-w-[420px]"><CoverageSummary tabla={tabla(a.tabla)} limites={a.limites} /></div>,
}

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque><CoverageSummary tabla={COBERTURAS[0]} limites /></Bloque>
      <TablaPartes partes={[
        ['Class', 'Nombre de la clase en gris y su porcentaje en negro. Other (cosmética) no se muestra: casi nunca se cubre.', 'span'],
        ['Range', 'Si las categorías de una clase pagan distinto, el mínimo y el máximo ("60–70%").', 'porcentajeDeClase()'],
        ['Limits', 'Máximo anual ("No limit" si es 0), deducible individual y máximo de ortodoncia ("not covered" si es 0).', 'limites'],
      ]} />
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Muestras>
        <Muestra titulo="Uniform" nota="Cada clase paga lo mismo en todas sus categorías." ancho={360}><CoverageSummary tabla={tabla('PPO Standard 100/80/50')} /></Muestra>
        <Muestra titulo="Range" nota="Endodontics paga 60 y el resto de Basic 70." ancho={360}><CoverageSummary tabla={tabla('DHMO Network')} /></Muestra>
        <Muestra titulo="Not covered" nota="Major y Ortho en 0%: la clase existe pero no paga." ancho={360}><CoverageSummary tabla={tabla('Basic 100/70/0')} /></Muestra>
        <Muestra titulo="With limits" nota="La segunda línea, como en el drawer de plan." ancho={360}><CoverageSummary tabla={tabla('PPO Plus 100/90/60')} limites /></Muestra>
        <Muestra titulo="No maximum" nota="Máximo en 0: “No limit”, no “$0”." ancho={360}><CoverageSummary tabla={tabla('DHMO Network')} limites /></Muestra>
      </Muestras>
    </Lienzo>
  ),
}

export const Specs: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Type and colors" nota="De CoverageSummary.tsx y src/index.css.">
        <Tabla encabezado={['Part', 'Text', 'Token']} minimo={480}>
          <tr><td className="font-semibold">Class name</td><td>12px regular</td><td><Token nombre="ink-muted" /></td></tr>
          <tr><td className="font-semibold">Percentage</td><td>12px semibold · tabular</td><td><Token nombre="ink" /></td></tr>
          <tr><td className="font-semibold">Limits</td><td>11.5px regular · tabular</td><td><Token nombre="ink-muted" /></td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>Classes wrap to a second line when the column is narrow; a class never breaks in two.</li>
          <li>Gap 10px between classes, 4px between the two lines.</li>
        </ul>
      </Bloque>
    </Lienzo>
  ),
}
