import type { Meta, StoryObj } from '@storybook/react-vite'
import { MOVIMIENTOS } from '@/data/ledger'
import { Bloque, Lienzo, Tabla, TablaPartes, Token } from '@/design-system/kit'
import { esperar, pulsar, secuencia } from '@/design-system/play'
import { LedgerAllocationTable } from './LedgerAllocationTable'

const CARGOS = MOVIMIENTOS.filter((m) => m.tipo === 'Charge')
const LISTAS = { open: CARGOS, few: CARGOS.slice(0, 2), none: [] }
const ANCHOS = { panel: 1100, narrow: 360 } as const
type Args = { cargos: keyof typeof LISTAS; ancho: keyof typeof ANCHOS }

/* La tabla como en Patient Payment, Credit Adjustment y Post Payment. */
function Ejemplo({ cargos, ancho }: Args) {
  return (
    <div style={{ width: ANCHOS[ancho], maxWidth: '100%' }}>
      <LedgerAllocationTable cargos={LISTAS[cargos]} />
    </div>
  )
}

/* Abre la primera fila: el detalle nace de un clic. */
const abrirPrimera = secuencia(pulsar(/Toggle details for Periodic oral evaluation/), esperar(/Original charge/))

const meta = {
  title: 'Components/Ledger/LedgerAllocationTable',
  parameters: {
    layout: 'padded',
    docs: {
      story: { inline: false, iframeHeight: 720 },
      description: {
        component: [
          '**Ledger Transactions**: los cargos abiertos del paciente en *Patient Payment*, *Credit Adjustment* y *Post Payment*. En **Applied** se escribe cuánto del pago va a cada cargo; el pie suma lo aplicado y lo que falta.',
          '',
          '**Cada fila se despliega** con el detalle del Ledger: la flecha al inicio (`RowChevron`, la misma de todas las tablas), clic en la fila menos en Applied, y *Collapse all / Expand all* desde que hay una abierta. Antes esta tabla se abría sin flecha; desde 2026-10-18 la lleva como las demás.',
          '',
          '**Probalo:** en *Playground* elegí cuántos cargos hay y el ancho desde *Controls*, y tocá una fila para desplegarla.',
        ].join('\n'),
      },
    },
  },
  args: { cargos: 'open', ancho: 'panel' },
  argTypes: {
    cargos: { name: 'charges', control: 'inline-radio', options: Object.keys(LISTAS), description: 'open: todos los cargos (3 páginas) · few: dos · none: sin cargos abiertos.' },
    ancho: { name: 'width', control: 'inline-radio', options: Object.keys(ANCHOS), description: 'panel 1100 (el Ledger a 1440) · narrow 360 (teléfono: la tabla scrollea y el detalle queda en la parte visible).' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

/* Cambiá los cargos y el ancho desde Controls. */
export const Playground: Story = { render: (a) => <Ejemplo {...a} /> }

export const Parts: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo className="max-w-[1100px]">
      <Bloque titulo="A row open" nota="D0120: el detalle del Ledger debajo de la fila, alineado con la primera columna.">
        <Ejemplo cargos="open" ancho="panel" />
      </Bloque>
      <Bloque titulo="What each part is">
        <TablaPartes partes={[
          ['Row chevron', 'Primera columna; gira al abrir. La misma flecha que DataTable, el Ledger y Treatment Plan.', 'RowChevron'],
          ['Row', 'Clic o Enter / Espacio la abre y la cierra; el clic en Applied o en el borde de una columna no.', 'LedgerAllocationTable'],
          ['Applied', 'Cuánto del pago va a ese cargo, hasta el monto del cargo.', 'LedgerAllocationTable'],
          ['Detail', 'El del Ledger según el tipo, fijo en la parte visible si la tabla scrollea.', 'LedgerRowDetail'],
          ['Collapse all / Expand all', 'Arriba de la tabla, desde que hay una fila abierta.', 'BotonExpandirTodo'],
          ['Columns', 'Oculta columnas; Date, Applied y Balance quedan siempre.', 'ColumnPicker'],
          ['Totals', 'Amount not applied y Amount applied, adentro de la tabla, arriba del paginado.', 'LedgerAllocationTable'],
        ]} />
      </Bloque>
    </Lienzo>
  ),
  play: abrirPrimera,
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo className="max-w-[1100px]">
      <Bloque titulo="Closed" nota="Las filas con su flecha, ninguna abierta.">
        <Ejemplo cargos="few" ancho="panel" />
      </Bloque>
      <Bloque titulo="Empty" nota="Sin cargos abiertos: no hay a qué aplicar el pago.">
        <Ejemplo cargos="none" ancho="panel" />
      </Bloque>
      <Bloque titulo="Narrow" nota="Teléfono: la tabla scrollea de costado; la flecha queda primera.">
        <Ejemplo cargos="few" ancho="narrow" />
      </Bloque>
    </Lienzo>
  ),
}

/* Una fila desplegada: la flecha gira y el detalle arranca en la primera columna. */
export const RowOpen: Story = {
  name: 'Row open',
  render: (a) => <Ejemplo {...a} />,
  play: abrirPrimera,
}

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Layout">
        <Tabla encabezado={['Item', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Row chevron</td><td>16px <Token nombre="ink-faint" />, 6px hasta Date; gira 90° abierta.</td></tr>
          <tr><td className="font-semibold">Row</td><td>12px <Token nombre="ink-soft" />, padding 10px 12px, gap 6px entre columnas. Abierta, fondo <Token nombre="surface-subtle" />.</td></tr>
          <tr><td className="font-semibold">Detail</td><td>Fondo <Token nombre="surface-subtle" />, 34px a la izquierda (12 + flecha 16 + gap 6): arranca donde arranca Date.</td></tr>
          <tr><td className="font-semibold">Fit</td><td>Las 12 columnas entran sin scroll en el Ledger a 1440; más angosto, la tabla scrollea dentro de su caja.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>A row that unfolds always shows the chevron, as in every other table (Elements / Tables → Rules).</li>
          <li>Typing in Applied never opens or closes the row.</li>
        </ul>
      </Bloque>
    </Lienzo>
  ),
}
