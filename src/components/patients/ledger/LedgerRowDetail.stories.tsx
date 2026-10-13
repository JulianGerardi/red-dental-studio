import type { Meta, StoryObj } from '@storybook/react-vite'
import { aviso } from '@/components/ui/toaster'
import { Bloque, Lienzo, Tabla, Token } from '@/design-system/kit'
import { APLICACIONES, MOVIMIENTOS, aplicadoA, conSaldo } from '@/data/ledger'
import { BotonExpandirTodo, LedgerRowDetail, Metrica, TablaAplicaciones, TratamientoDelCargo } from './LedgerRowDetail'

const FILAS = conSaldo(MOVIMIENTOS)
const fila = (id: string) => FILAS.find((m) => m.id === id)!
const OPCIONES = Object.fromEntries(FILAS.map((m) => [`${m.codigo !== '—' ? m.codigo : m.tipo} · ${m.descripcion.slice(0, 32)}`, m.id]))

type Args = { movimiento: string; ancho: 'table' | 'phone' }
const ANCHOS = { table: 900, phone: 340 } as const

/* El detalle como queda debajo de la fila; los links avisan adónde irían. */
function EnTabla({ movimiento, ancho }: Args) {
  const m = fila(movimiento)
  return (
    <div className="overflow-hidden rounded-lg border border-line-row bg-white" style={{ width: ANCHOS[ancho] }}>
      <LedgerRowDetail
        m={m}
        onVerTodo={() => aviso.info('Opens the full record.')}
        onVerTransaccion={(x) => aviso.info(`Opens ${x.descripcion}.`)}
        onAbrirClinica={(d) => aviso.info(d.caso ? `Opens case ${d.caso} in Treatment Plan.` : `Opens procedure ${d.procedimiento} in Clinical Mode.`)}
        onAplicarCredito={(m.creditoDisponible ?? 0) > 0 ? () => aviso.info('Opens Apply credit.') : undefined}
      />
    </div>
  )
}

const meta = {
  title: 'Components/Ledger/LedgerRowDetail',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'El detalle que se despliega al tocar una fila de **Transactions** en el Ledger, con la lista de *Components / UI / DetailList* (la misma del detalle de Clinical Mode).',
          '',
          '**Un cargo** (procedimiento): *Treatment* (el caso de Treatment Plan del que sale y la visita), *Location*, *Financial details* (cargo original, lo pagado por el seguro, pagos y ajustes aplicados, y lo que falta: el saldo **de ese cargo**, no el de la cuenta) y *Applied transactions* (qué pago, ajuste o seguro se aplicó, cuándo y cuánto). Al pie *View procedure* abre el procedimiento en Clinical Mode.',
          '',
          '**Un pago, ajuste o pago del seguro**: *Location*, *Financial details* (monto, aplicado a cargos, crédito sin aplicar) y *Applied to* (a qué cargos fue). Si queda crédito, *Apply credit*; lo que se aplica ahí aparece en las dos puntas.',
          '',
          '**Probalo:** en *Playground* elegí la transacción y el ancho desde *Controls*, y tocá los links.',
        ].join('\n'),
      },
    },
  },
  args: { movimiento: 'm12', ancho: 'table' },
  argTypes: {
    movimiento: { name: 'transaction', control: 'select', options: Object.values(OPCIONES), labels: Object.fromEntries(Object.entries(OPCIONES).map(([k, v]) => [v, k])), description: 'La fila desplegada.' },
    ancho: { name: 'width', control: 'inline-radio', options: Object.keys(ANCHOS), description: 'table 900 · phone 340.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

/* Elegí la transacción desde Controls. */
export const Playground: Story = { render: (a) => <EnTabla {...a} /> }

export const Parts: Story = {
  parameters: { controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Charge" nota="D2392: Treatment, Location, Financial details y Applied transactions; al pie View procedure y View full record.">
        <EnTabla movimiento="m12" ancho="table" />
      </Bloque>
      <Bloque titulo="Payment" nota="Wire transfer: a qué cargos fue y cuánto.">
        <EnTabla movimiento="m22" ancho="table" />
      </Bloque>
      <Bloque titulo="Pieces">
        <div className="flex w-[760px] max-w-full flex-col gap-6">
          <dl className="grid grid-cols-3 gap-6">
            <Metrica label="Original charge" valor={220} />
            <Metrica label="Payments applied" valor={120} />
            <Metrica label="Outstanding balance" valor={80} destacado />
          </dl>
          <TratamientoDelCargo m={fila('m12')} onAbrir={() => aviso.info('Opens the case.')} />
          <TablaAplicaciones
            filas={aplicadoA('m12', APLICACIONES).map((a) => ({ a, otra: fila(a.origen) }))}
            columnaRef="Reference / description"
            onVer={(x) => aviso.info(`Opens ${x.descripcion}.`)}
          />
        </div>
      </Bloque>
      <Bloque titulo="What each part is">
        <Tabla encabezado={['Part', 'What it does', 'Component']} minimo={720} arriba>
          <tr><td className="font-semibold">Treatment</td><td>El caso del procedimiento que se cobra (estado como en Treatment Plan) y la visita; el link abre el caso en Clinical Mode.</td><td>TratamientoDelCargo</td></tr>
          <tr><td className="font-semibold">Financial details</td><td>Números del cargo o del pago; el último, destacado, es lo que falta o lo que queda sin aplicar.</td><td>Metrica</td></tr>
          <tr><td className="font-semibold">Applied transactions / Applied to</td><td>Fecha, tipo, la otra transacción (abre su registro) y lo aplicado. En el cargo, la nota aclara que es sólo lo aplicado a ese cargo.</td><td>TablaAplicaciones</td></tr>
          <tr><td className="font-semibold">List, rows, links, footer</td><td>Las piezas comunes.</td><td>Components / UI / DetailList</td></tr>
          <tr><td className="font-semibold">Expand all / Collapse all</td><td>Arriba de la tabla, desde que hay una fila abierta.</td><td>BotonExpandirTodo</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Charge, partly paid" nota="D2392: $220 con pago, ajuste y transferencia aplicados; faltan $80.">
        <EnTabla movimiento="m12" ancho="table" />
      </Bloque>
      <Bloque titulo="Charge, paid by insurance" nota="D0120: lo cubrió el seguro entero; Outstanding en $0. Sin caso: No treatment plan linked.">
        <EnTabla movimiento="m1" ancho="table" />
      </Bloque>
      <Bloque titulo="Empty: charge with nothing applied" nota="D2740: nada aplicado todavía; la fila queda y lo dice.">
        <EnTabla movimiento="m6" ancho="table" />
      </Bloque>
      <Bloque titulo="Payment with unapplied credit" nota="Check payment: $50 aplicados y $150 sin aplicar; al pie, Apply credit.">
        <EnTabla movimiento="m27" ancho="table" />
      </Bloque>
      <Bloque titulo="Denied insurance" nota="BCBS denegado: nada aplicado y la nota lo dice.">
        <EnTabla movimiento="m7" ancho="table" />
      </Bloque>
      <Bloque titulo="Narrow" nota="Teléfono: el título de cada fila arriba y los números de a dos.">
        <EnTabla movimiento="m12" ancho="phone" />
      </Bloque>
    </Lienzo>
  ),
}

export const ExpandAll: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex gap-3">
      <BotonExpandirTodo todasAbiertas={false} hayAlgunaAbierta onExpandirTodo={() => {}} onColapsarTodo={() => {}} />
      <BotonExpandirTodo todasAbiertas hayAlgunaAbierta onExpandirTodo={() => {}} onColapsarTodo={() => {}} />
    </div>
  ),
}

export const Specs: Story = {
  parameters: { controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Financial details">
        <Tabla encabezado={['Item', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Grid</td><td>Cargo: 5 columnas desde 576px de detalle, 2 abajo. Pago: 3 columnas, 2 abajo.</td></tr>
          <tr><td className="font-semibold">Label</td><td>11px <Token nombre="ink-muted" /></td></tr>
          <tr><td className="font-semibold">Value</td><td>15px Medium <Token nombre="ink" />; el destacado Semibold <Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Outstanding balance</td><td>Monto del cargo menos lo aplicado; nunca el saldo corrido de la cuenta (eso es la columna Balance).</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Applied transactions">
        <Tabla encabezado={['Item', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Table</td><td>Encabezado 11px <Token nombre="ink-muted" />, filas 12px con línea <Token nombre="line-soft" />; fecha y monto sin partir.</td></tr>
          <tr><td className="font-semibold">Date</td><td>MM/DD/YYYY, como la tabla de asignación.</td></tr>
          <tr><td className="font-semibold">Reference</td><td>Link a la otra transacción: abre su registro completo.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="In the table">
        <Tabla encabezado={['Item', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Container</td><td>Fondo <Token nombre="surface-subtle" />, padding 12px. Si la tabla scrollea de costado, el detalle queda en la parte visible (ancho visible menos el padding).</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
