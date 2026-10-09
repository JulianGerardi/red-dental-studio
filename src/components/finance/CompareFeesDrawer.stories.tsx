import type { Meta, StoryObj } from '@storybook/react-vite'
import { CompareFeesDrawer, diferencia } from './CompareFeesDrawer'
import { EstadosDelDrawer, SpecsDelDrawer } from '@/design-system/kit-drawer'
import { Bloque, Lienzo, Tabla, TablaPartes } from '@/design-system/kit'
import { ARANCELES } from '@/data/finanzas'

type Args = { feeSchedule: string }

const meta = {
  title: 'Components/Finance/CompareFeesDrawer',
  parameters: {
    layout: 'fullscreen',
    docs: {
      decisionsFrom: 'components/finance/CompareFeesDrawer.tsx',
      story: { inline: false, iframeHeight: 720 },
      description: {
        component: [
          '**Compare fees**, desde el menú de una fila de Fee Schedules (pedido de Julián; no está en red.dev). Reemplaza la vieja columna *vs UCR*: cada procedimiento tiene su propia diferencia, así que no hay un único porcentaje que resuma un fee schedule.',
          '',
          'La referencia se elige a la vista (*Compare with*), y arranca en el fee schedule *Default* (UCR - Red). Se comparan las versiones vigentes de los dos. Arriba, cuántos códigos quedan más altos, más bajos, iguales o sin precio en alguno de los dos; abajo, código por código con la diferencia en $ y en %.',
          '',
          '**Probalo:** en *Playground* elegí el fee schedule y cambiá *Compare with*.',
        ].join('\n'),
      },
    },
  },
  args: { feeSchedule: 'Aetna 2026' },
  argTypes: { feeSchedule: { control: 'select', options: ARANCELES.map((a) => a.nombre), description: 'El fee schedule de la fila.' } },
  render: ({ feeSchedule }) => <CompareFeesDrawer key={feeSchedule} arancel={de(feeSchedule)} aranceles={ARANCELES} onClose={() => {}} onEditar={() => {}} />,
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

const de = (n: string) => ARANCELES.find((a) => a.nombre === n) ?? ARANCELES[1]

export const Playground: Story = {}

export const Parts: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[
          ['Compare with', 'Los otros fee schedules no archivados; arranca en el Default. Debajo, desde cuándo rige cada versión.', 'SelectField'],
          ['Resumen', 'Higher · Lower · Same · Missing a fee.', 'dl'],
          ['Tabla', 'Code · Description · este · la referencia · Difference ($ y %).', 'role=table'],
          ['Pie', 'Close · Edit fees (abre el editor).', 'Button'],
        ]} />
      </Bloque>
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <EstadosDelDrawer estados={[
      { estado: 'Against the default', cuando: 'Abre comparando contra UCR - Red.', story: 'Playground' },
      { estado: 'Default itself', cuando: 'Desde UCR - Red arranca con el primer otro fee schedule.', story: 'From Default' },
      { estado: 'Missing fees', cuando: 'Un código sin precio en alguno de los dos muestra “—” y cuenta en Missing a fee (Medicaid).', story: 'Missing Fees' },
    ]} />
  ),
}

export const FromDefault: Story = { args: { feeSchedule: 'UCR - Red' } }
export const MissingFees: Story = { args: { feeSchedule: 'Medicaid' } }

export const Specs: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => {
    const ejemplos: [number | undefined, number | undefined][] = [[92, 115], [115, 115], [130, 100], [undefined, 300]]
    return (
      <Lienzo>
        <SpecsDelDrawer filas={[
          ['Size', 'lg'],
          ['Columnas', 'Code 56 · Description 1fr · 88 · 88 · Difference 120; scroll horizontal debajo de 560px'],
          ['diferencia()', 'monto = este − referencia; % sobre la referencia; null si falta uno.'],
        ]} />
        <Bloque titulo="Ejemplos de diferencia()">
          <Tabla encabezado={['Este', 'Referencia', 'Monto', '%']}>
            {ejemplos.map(([a, b], i) => {
              const d = diferencia(a, b)
              return <tr key={i}><td className="tabular-nums">{a ?? '—'}</td><td className="tabular-nums">{b ?? '—'}</td><td className="tabular-nums">{d ? d.monto : '—'}</td><td className="tabular-nums">{d?.porcentaje != null ? `${d.porcentaje.toFixed(0)}%` : '—'}</td></tr>
            })}
          </Tabla>
        </Bloque>
      </Lienzo>
    )
  },
}
