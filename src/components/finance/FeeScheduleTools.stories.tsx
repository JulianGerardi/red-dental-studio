import type { Meta, StoryObj } from '@storybook/react-vite'
import { CopyFormDrawer, IncreaseAllDrawer, aumentar } from './FeeScheduleTools'
import { esperar, pulsar, secuencia } from '@/design-system/play'
import { EstadosDelDrawer, SpecsDelDrawer } from '@/design-system/kit-drawer'
import { Bloque, Lienzo, Tabla, TablaPartes } from '@/design-system/kit'
import { dinero } from '@/data/finanzas'

type Args = { herramienta: 'Copy form' | 'Increase All'; seleccionados: number }

const meta = {
  title: 'Components/Finance/FeeScheduleTools',
  parameters: {
    layout: 'fullscreen',
    docs: {
      decisionsFrom: 'components/finance/FeeScheduleTools.tsx',
      story: { inline: false, iframeHeight: 560 },
      description: {
        component: [
          'Las dos herramientas del editor de un fee schedule, arriba a la derecha como en red.dev:',
          '',
          '- **Copy form**: *Select the fee schedule you want to replace with*. Trae los precios de otro fee schedule activo a la columna *New Fee*.',
          '- **Bulk Edit** → **Increase All**: sube (o baja, con un número negativo) los *New Fee* en $ o en %, con *Exclude $0.0 fees from the increase* y *Round up the value to the nearest dollar*. Con filas tildadas en la tabla pasa a **Increase Selected** y cambia sólo esas (pedido de Julián; red.dev sube todas).',
          '',
          'Ninguna guarda: los cambios quedan en *New Fee* hasta el *Save* del editor, que crea la versión nueva desde *Available From*.',
          '',
          '**Probalo:** en *Playground* elegí la herramienta y cuántas filas hay tildadas.',
        ].join('\n'),
      },
    },
  },
  args: { herramienta: 'Increase All', seleccionados: 0 },
  argTypes: {
    herramienta: { control: 'inline-radio', options: ['Copy form', 'Increase All'], description: 'Qué drawer abrir.' },
    seleccionados: { control: { type: 'number', min: 0, max: 26 }, description: 'Increase All: filas tildadas en la tabla (0 = todas).' },
  },
  render: ({ herramienta, seleccionados }) => herramienta === 'Copy form'
    ? <CopyFormDrawer opciones={OPCIONES} onClose={() => {}} onCopiar={() => {}} />
    : <IncreaseAllDrawer key={seleccionados} seleccionados={seleccionados} onClose={() => {}} onAplicar={() => {}} />,
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

const OPCIONES = ['Aetna 2026', 'Delta Dental PPO 2026', 'PPO Premium Plan', 'Medicaid']

export const Playground: Story = {}

export const Parts: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Copy form">
        <TablaPartes partes={[
          ['Fee schedule', 'Select con los otros fee schedules activos; placeholder “Select an option”.', 'SelectField'],
          ['Pie', 'Cancel · Confirm.', 'FormFooter'],
        ]} />
      </Bloque>
      <Bloque titulo="Increase All / Increase Selected">
        <TablaPartes partes={[
          ['Increase All Fees By', 'Monto o porcentaje; distinto de 0. Con selección: Increase Selected Fees By.', 'TextField'],
          ['By', '$ o %.', 'SelectField'],
          ['Exclude $0.0 fees from the increase', 'Los que valen $0 quedan igual.', 'OptionCheckbox'],
          ['Round up the value to the nearest dollar', 'Redondea para arriba.', 'OptionCheckbox'],
          ['Pie', 'Cancel · Confirm.', 'FormFooter'],
        ]} />
      </Bloque>
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <EstadosDelDrawer estados={[
      { estado: 'Increase All', cuando: 'Sin filas tildadas: cambia todos los New Fee.', story: 'Playground' },
      { estado: 'Increase Selected', cuando: 'Con filas tildadas: título, bajada y rótulo dicen cuántas.', story: 'Increase Selected' },
      { estado: 'Validation error', cuando: 'Confirm con el monto vacío o en 0: “Enter an amount other than 0.”.', story: 'With Validation Error' },
      { estado: 'Copy form error', cuando: 'Confirm sin elegir: “Select the fee schedule to copy.”.', story: 'Copy Form Error' },
    ]} />
  ),
}

export const IncreaseSelected: Story = { args: { seleccionados: 3 } }
export const WithValidationError: Story = { play: secuencia(pulsar(/^confirm$/i), esperar(/other than 0/i)) }
export const CopyFormError: Story = { args: { herramienta: 'Copy form' }, play: secuencia(pulsar(/^confirm$/i), esperar(/select the fee schedule to copy/i)) }

export const Specs: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <SpecsDelDrawer filas={[
        ['Size', 'sm · 480px las dos'],
        ['aumentar()', '% multiplica, $ suma; Round up usa Math.ceil; si no, 2 decimales.'],
      ]} />
      <Bloque titulo="Ejemplos de aumentar()">
        <Tabla encabezado={['Fee', 'Increase', 'New Fee']}>
          <tr><td className="tabular-nums">{dinero(92)}</td><td>10 %</td><td className="tabular-nums">{dinero(aumentar(92, { monto: 10, por: '%', excluirCeros: false, redondear: false }))}</td></tr>
          <tr><td className="tabular-nums">{dinero(92)}</td><td>10 % · Round up</td><td className="tabular-nums">{dinero(aumentar(92, { monto: 10, por: '%', excluirCeros: false, redondear: true }))}</td></tr>
          <tr><td className="tabular-nums">{dinero(0)}</td><td>$5 · Exclude $0.0</td><td className="tabular-nums">{dinero(aumentar(0, { monto: 5, por: '$', excluirCeros: true, redondear: false }))}</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
