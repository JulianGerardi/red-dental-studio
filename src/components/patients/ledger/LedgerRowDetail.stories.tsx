import type { Meta, StoryObj } from '@storybook/react-vite'
import { userEvent, within } from 'storybook/test'
import { aviso } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Bloque, Lienzo, Tabla, Token } from '@/design-system/kit'
import { esperar } from '@/design-system/play'
import { MOVIMIENTOS, conSaldo, tieneCredito } from '@/data/ledger'
import { ACTIVIDAD_RECIENTE, APLICACIONES_BILLING } from '@/data/billing'
import { BotonExpandirTodo, DetalleMovimiento, FilasCobro, LedgerRowDetail, Metrica } from './LedgerRowDetail'

/* Las transacciones de ejemplo, una por caso del cobro. */
const CASOS = {
  'charge-partly-paid': { titulo: 'D4341 · charge, partly paid (Northgate Clinic)', id: 'm13' },
  'charge-paid': { titulo: 'D0120 · charge paid by insurance', id: 'm1' },
  'charge-unpaid': { titulo: 'D0220 · charge, nothing applied', id: 'm14' },
  'payment-several': { titulo: 'Wire transfer · applied to four charges', id: 'm22' },
  'payment-credit': { titulo: 'Check payment · with unapplied credit', id: 'm27' },
  'insurance-denied': { titulo: 'BCBS claim · denied', id: 'm7' },
} as const
type Caso = keyof typeof CASOS
const CON_SALDO = conSaldo(MOVIMIENTOS)
const de = (c: Caso) => CON_SALDO.find((m) => m.id === CASOS[c].id)!
const ANCHOS = { table: 1094, phone: 356 } as const

type Args = { caso: Caso; ancho: keyof typeof ANCHOS }

const ver = (x: { descripcion: string }) => aviso.info(`Opens ${x.descripcion} in its full record.`)

/* La fila desplegada como en el Ledger, con el ancho visible de la tabla. */
function Ejemplo({ caso, ancho }: Args) {
  const m = de(caso)
  return (
    <TooltipProvider>
      <div className="rounded-lg border border-line-row bg-white" style={{ width: ANCHOS[ancho], maxWidth: '100%', ['--tabla-visible' as string]: `${ANCHOS[ancho]}px` }}>
        <LedgerRowDetail
          m={m}
          onVerTodo={() => aviso.info('Opens View full record.')}
          onVerTransaccion={ver}
          onAplicarCredito={tieneCredito(m) ? () => aviso.info('Opens Apply credit.') : undefined}
        />
      </div>
    </TooltipProvider>
  )
}

const meta = {
  title: 'Components/Ledger/LedgerRowDetail',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Lo que se despliega debajo de una fila del **Ledger** y de **Billing** con un paciente elegido (en Billing, adentro del `rowDetail` de la tabla de la app).',
          '',
          '**Qué muestra:** los datos de la transacción (Description, Transaction date, Patient, Type, Code, Provider, Status, Tooth, Surface, Amount, Balance) y, debajo de una línea, lo del cobro (prototipo *Expanded transaction detail*, Julián 2026-10-14), con las filas de *Components / UI / DetailList*:',
          '',
          '- **Clinic location**: la sede donde se registró.',
          '- **Financial details**: un cargo, Original charge, Insurance paid, Payments applied, Credit adjustments applied y **Outstanding balance** (lo que falta de ese cargo, no el saldo de la cuenta). Un pago o ajuste, lo recibido, lo aplicado a cargos y **Unapplied credit**.',
          '- **Applied transactions**: fecha, tipo, la otra transacción (abre su registro de sólo lectura) y lo aplicado. En un cargo, los pagos y ajustes que lo cubren; en un pago, los cargos a los que fue.',
          '',
          'Al pie, **View full record** (el mismo contenido en un drawer) y, si queda crédito sin aplicar, **Apply credit**, que suma sus aplicaciones al detalle. Lo del cobro no está en Clinical Mode.',
          '',
          '**Probalo:** en *Playground* elegí la transacción y el ancho desde *Controls*; tocá una referencia de Applied transactions.',
        ].join('\n'),
      },
    },
  },
  args: { caso: 'charge-partly-paid', ancho: 'table' },
  argTypes: {
    caso: { name: 'transaction', control: 'select', options: Object.keys(CASOS), labels: Object.fromEntries(Object.entries(CASOS).map(([k, v]) => [k, v.titulo])), description: 'Un cargo (pagado, en parte o nada), un pago aplicado a varios cargos, uno con crédito sin aplicar o un claim denegado.' },
    ancho: { name: 'width', control: 'inline-radio', options: Object.keys(ANCHOS), description: 'table 1094 (el Ledger a 1440) · phone 356 (la tabla scrollea y el detalle queda en la parte visible).' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

/* Cambiá la transacción y el ancho desde Controls. */
export const Playground: Story = { render: (a) => <Ejemplo {...a} /> }

export const Parts: Story = {
  parameters: { controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <TooltipProvider>
      <Lienzo>
        <Bloque titulo="The detail" nota="Los datos de la transacción, la línea, lo del cobro y el pie.">
          <Ejemplo caso="charge-partly-paid" ancho="table" />
        </Bloque>
        <Bloque titulo="Billing" nota="El mismo contenido sin el marco (DetalleMovimiento): lo pone la tabla de la app. Card Payment de Maria Abril Viola, aplicado a D1110.">
          <div className="w-[960px] max-w-full rounded-lg border border-line-row bg-surface-subtle px-4 py-3 pl-11">
            <DetalleMovimiento m={ACTIVIDAD_RECIENTE.find((m) => m.id === 'act-Maria Abril Viola-1')!} aplicaciones={APLICACIONES_BILLING} movimientos={ACTIVIDAD_RECIENTE} onVerTransaccion={ver} onVerTodo={() => aviso.info('Opens View full record.')} />
          </div>
        </Bloque>
        <Bloque titulo="Pieces">
          <div className="flex flex-col gap-4">
            <div className="@container flex w-[880px] max-w-full flex-col"><FilasCobro m={de('payment-several')} onVerTransaccion={ver} /></div>
            <dl className="grid w-[420px] grid-cols-2 gap-4"><Metrica label="Original charge" valor={310} /><Metrica label="Outstanding balance" valor={170} destacado /></dl>
            <div className="flex gap-3">
              <BotonExpandirTodo todasAbiertas={false} hayAlgunaAbierta onExpandirTodo={() => {}} onColapsarTodo={() => {}} />
              <BotonExpandirTodo todasAbiertas hayAlgunaAbierta onExpandirTodo={() => {}} onColapsarTodo={() => {}} />
            </div>
          </div>
        </Bloque>
        <Bloque titulo="What each part is">
          <Tabla encabezado={['Part', 'What it does', 'Component']} minimo={720} arriba>
            <tr><td className="font-semibold">Fields</td><td>Los datos de la transacción, de a tres columnas (una en el teléfono).</td><td>Campos</td></tr>
            <tr><td className="font-semibold">Clinic location</td><td>La sede donde se registró; sin dato, la principal.</td><td>FilasCobro</td></tr>
            <tr><td className="font-semibold">Financial details</td><td>Los números en columnas de 112px como mínimo, el monto abajo de su rótulo; el último destacado (lo que falta del cargo o el crédito sin aplicar). Una nota dice qué mide.</td><td>FilasCobro, Metrica</td></tr>
            <tr><td className="font-semibold">Applied transactions</td><td>Tabla chica: Date applied, Type, la referencia (link a su registro) y Applied amount. Sin aplicaciones, la fila queda y lo dice.</td><td>FilasCobro</td></tr>
            <tr><td className="font-semibold">Footer</td><td>View full record y, con crédito sin aplicar, Apply credit.</td><td>DetalleMovimiento</td></tr>
            <tr><td className="font-semibold">Frame</td><td>En el Ledger, fondo gris y fijo en la parte visible de la tabla; en Billing lo pone DataTable.</td><td>LedgerRowDetail</td></tr>
            <tr><td className="font-semibold">Collapse all / Expand all</td><td>Al lado de las herramientas de la tabla desde que hay una fila abierta.</td><td>BotonExpandirTodo</td></tr>
          </Tabla>
        </Bloque>
      </Lienzo>
    </TooltipProvider>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <TooltipProvider>
      <Lienzo>
        <Bloque titulo="Charge, partly paid" nota="D4341: $310 cobrados en Northgate Clinic; un pago, un ajuste y una transferencia aplicados; faltan $170.">
          <Ejemplo caso="charge-partly-paid" ancho="table" />
        </Bloque>
        <Bloque titulo="Charge paid by insurance" nota="D0120: lo cubrió el seguro entero; Outstanding en $0.">
          <Ejemplo caso="charge-paid" ancho="table" />
        </Bloque>
        <Bloque titulo="Charge, nothing applied" nota="Applied transactions queda y lo dice.">
          <Ejemplo caso="charge-unpaid" ancho="table" />
        </Bloque>
        <Bloque titulo="Payment applied to several charges" nota="La transferencia: a qué cargos fue y cuánto a cada uno.">
          <Ejemplo caso="payment-several" ancho="table" />
        </Bloque>
        <Bloque titulo="Unapplied credit" nota="Un pago con crédito sin aplicar: Unapplied credit destacado y Apply credit al pie.">
          <Ejemplo caso="payment-credit" ancho="table" />
        </Bloque>
        <Bloque titulo="Denied claim" nota="No pagó nada: todo en $0 y la nota lo dice.">
          <Ejemplo caso="insurance-denied" ancho="table" />
        </Bloque>
        <Bloque titulo="Narrow" nota="Teléfono: los datos en una columna y el título de cada fila del cobro arriba de sus datos.">
          <Ejemplo caso="charge-partly-paid" ancho="phone" />
        </Bloque>
      </Lienzo>
    </TooltipProvider>
  ),
}

/* Tocar una referencia de Applied transactions: abre esa transacción. */
export const ReferenceOpen: Story = {
  name: 'Reference open',
  render: (a) => <Ejemplo {...a} />,
  play: async (c) => {
    await userEvent.click(await within(c.canvasElement).findByRole('button', { name: /Check payment ····1234/ }))
    await esperar(/Opens Check payment/)(c)
  },
}

export const Specs: Story = {
  parameters: { controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Layout">
        <Tabla encabezado={['Item', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Frame (Ledger)</td><td>Padding 12px; fijo a la izquierda de la parte visible y del ancho visible menos el padding, así lo alineado a la derecha no se corta.</td></tr>
          <tr><td className="font-semibold">Cobro</td><td>16px debajo de los datos, con una línea <Token nombre="line-row" /> arriba y 12px de aire. Filas de ui/detail-list: título en una columna de 150px desde 448px de ancho.</td></tr>
          <tr><td className="font-semibold">Financial details</td><td>Columnas de 112px como mínimo, tantas como entren (5 en el Ledger a 1440, 2 en el teléfono). Monto 15px; el destacado Semibold <Token nombre="dash-blue" />.</td></tr>
          <tr><td className="font-semibold">Applied transactions</td><td>Tabla de 12px, encabezado 11px <Token nombre="ink-muted" />, fecha MM/DD/YYYY y monto sin partir, alineado a la derecha.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>Outstanding balance is the balance of that charge only, not the patient or guarantor balance; the note says so.</li>
          <li>Every row stays even when empty, so the detail always has the same shape.</li>
          <li>The same detail in the Ledger and in Billing: a transaction reads the same in both. Clinical Mode does not show billing.</li>
        </ul>
      </Bloque>
    </Lienzo>
  ),
}
