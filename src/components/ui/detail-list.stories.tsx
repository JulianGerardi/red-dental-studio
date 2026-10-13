import type { Meta, StoryObj } from '@storybook/react-vite'
import { userEvent, within } from 'storybook/test'
import { aviso } from '@/components/ui/toaster'
import { Pill } from '@/components/ui/pill'
import { Bloque, Lienzo, Tabla, Token } from '@/design-system/kit'
import { esperar } from '@/design-system/play'
import { EnlaceRegistro, Entrada, FilaDetalle, ListaDetalle, MasItems, NotaDetalle, Vacio, VerRegistroCompleto } from './detail-list'

type Args = { filas: number; vacia: boolean; mas: boolean; ancho: 'table' | 'overlay' | 'phone' }
const ANCHOS = { table: 880, overlay: 700, phone: 320 } as const

const abrir = (que: string) => () => aviso.info(`Opens ${que}.`)

/* Una lista de ejemplo, con los temas en el orden de importancia y datos de mentira. */
function Ejemplo({ filas, vacia, mas, ancho }: Args) {
  const todas = [
    <FilaDetalle key="t" titulo="Treatment">
      <Entrada estado={<Pill tone="success" size="sm">Accepted</Pill>} sub="Visit 1 · this procedure">
        <EnlaceRegistro onClick={abrir('the case')}>Restorative treatment</EnlaceRegistro>
      </Entrada>
    </FilaDetalle>,
    <FilaDetalle key="l" titulo="Location"><Entrada><span className="text-[12px] text-ink">Bayside Dental</span></Entrada></FilaDetalle>,
    <FilaDetalle key="r" titulo="Referral" cuenta={vacia ? 0 : 2}>
      {vacia ? <Vacio>No referrals linked.</Vacio> : (
        <>
          <Entrada estado={<Pill tone="success" size="sm">Accepted</Pill>} sub="Requested Mar 03, 2026">
            <EnlaceRegistro onClick={abrir('the referral')}>Dr. Laura Chen · Endodontics</EnlaceRegistro>
          </Entrada>
          {mas && (
            <MasItems label="1 more referral">
              <Entrada estado={<Pill tone="danger" size="sm">Declined</Pill>} sub="Requested May 15, 2026">
                <EnlaceRegistro onClick={abrir('the referral')}>Dr. Omar Haddad · Oral Surgery</EnlaceRegistro>
              </Entrada>
            </MasItems>
          )}
        </>
      )}
    </FilaDetalle>,
    <FilaDetalle key="n" titulo="Balance">
      <Entrada><span className="text-[12px] font-semibold text-ink tabular-nums">$80.00</span></Entrada>
      <NotaDetalle>Balance of this charge only, not the patient or guarantor balance.</NotaDetalle>
    </FilaDetalle>,
  ]
  return (
    <div className="rounded-lg border border-line-row bg-surface-subtle px-4 py-3 pl-11" style={{ width: ANCHOS[ancho] }}>
      <ListaDetalle titulo="D2392 · Resin-based composite – two surfaces" lado="Tooth 14 · Surface OD" pie={<VerRegistroCompleto onClick={abrir('the full record')} />}>
        {todas.slice(0, filas)}
      </ListaDetalle>
    </div>
  )
}

const meta = {
  title: 'Components/UI/DetailList',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'La **lista de detalle**: lo que se despliega debajo de una fila de tabla (Elements / Tables, `rowDetail`). La usan el detalle de Problem List y Procedures en Clinical Mode y el de Transactions en el Ledger, así los dos se leen igual.',
          '',
          '**Cómo es:** el título del registro y un dato al costado (pieza, superficie); una fila por tema, una debajo de la otra y **sin cards**, con el título a la izquierda (arriba en angosto) y los datos a la derecha; cada dato en una línea con su link, su estado y el contexto; al pie *View full record* y *Read-only summary*. Lo que no entra se pliega en "N more…"; una fila sin datos queda y dice qué falta.',
          '',
          '**Probalo:** en *Playground* cambiá cuántas filas, si una está vacía, el "more" y el ancho desde *Controls*.',
        ].join('\n'),
      },
    },
  },
  args: { filas: 4, vacia: false, mas: true, ancho: 'table' },
  argTypes: {
    filas: { control: { type: 'range', min: 1, max: 4, step: 1 }, description: 'Cuántas filas.' },
    vacia: { control: 'boolean', description: 'La fila Referral sin datos: Vacio.' },
    mas: { control: 'boolean', description: 'Un dato plegado en "1 more referral".' },
    ancho: { control: 'inline-radio', options: Object.keys(ANCHOS), description: 'table 880 · overlay 700 · phone 320 (el título de cada fila pasa arriba).' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

/* Cambiá todo desde Controls. */
export const Playground: Story = { render: (a) => <Ejemplo {...a} /> }

export const Parts: Story = {
  parameters: { controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="The list" nota="ListaDetalle: título, dato del costado, las filas y el pie.">
        <Ejemplo filas={4} vacia={false} mas ancho="table" />
      </Bloque>
      <Bloque titulo="Pieces">
        <div className="@container flex w-[700px] max-w-full flex-col">
          <FilaDetalle titulo="Row" cuenta={2}>
            <Entrada estado={<Pill tone="info" size="sm">Status</Pill>} sub="Context">
              <EnlaceRegistro onClick={abrir('the record')}>Link to the record</EnlaceRegistro>
            </Entrada>
            <Entrada rotulo="Label"><span className="text-[12px] text-ink">Plain value</span></Entrada>
          </FilaDetalle>
          <FilaDetalle titulo="Folded">
            <Entrada><span className="text-[12px] text-ink">First item</span></Entrada>
            <MasItems label="2 more items"><Entrada><span className="text-[12px] text-ink">Second item</span></Entrada><Entrada><span className="text-[12px] text-ink">Third item</span></Entrada></MasItems>
          </FilaDetalle>
          <FilaDetalle titulo="Empty" cuenta={0}><Vacio>Nothing linked.</Vacio></FilaDetalle>
          <FilaDetalle titulo="With a note"><Entrada><span className="text-[12px] text-ink">$80.00</span></Entrada><NotaDetalle>What this number measures.</NotaDetalle></FilaDetalle>
        </div>
      </Bloque>
      <Bloque titulo="What each part is">
        <Tabla encabezado={['Part', 'What it does', 'Component']} minimo={720} arriba>
          <tr><td className="font-semibold">List</td><td>El detalle entero: título del registro, dato al costado, filas y pie con Read-only summary.</td><td>ListaDetalle</td></tr>
          <tr><td className="font-semibold">Row</td><td>Un tema: título de 11px y cuenta a la izquierda (150px; arriba en angosto), datos a la derecha. Una línea fina separa las filas.</td><td>FilaDetalle</td></tr>
          <tr><td className="font-semibold">Entry</td><td>Un dato en una línea: rótulo opcional, link o texto, estado y contexto.</td><td>Entrada</td></tr>
          <tr><td className="font-semibold">Link</td><td>Lleva a la pantalla donde se trabaja el registro; la flecha dice que sale de la tabla.</td><td>EnlaceRegistro</td></tr>
          <tr><td className="font-semibold">N more…</td><td>Lo que no entra en el resumen, plegado.</td><td>MasItems</td></tr>
          <tr><td className="font-semibold">Nothing linked</td><td>La fila queda y dice qué falta.</td><td>Vacio</td></tr>
          <tr><td className="font-semibold">Note</td><td>Aclara qué mide un dato (por ejemplo, saldo de la transacción y no de la cuenta).</td><td>NotaDetalle</td></tr>
          <tr><td className="font-semibold">View full record</td><td>Abre el registro completo (drawer o modal de sólo lectura).</td><td>VerRegistroCompleto</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Default" nota="Todas las filas con datos.">
        <Ejemplo filas={4} vacia={false} mas={false} ancho="table" />
      </Bloque>
      <Bloque titulo="Empty row" nota="Una fila sin datos queda en su lugar y lo dice: el detalle tiene siempre la misma forma.">
        <Ejemplo filas={4} vacia mas={false} ancho="table" />
      </Bloque>
      <Bloque titulo="Narrow" nota="Teléfono: el título de cada fila va arriba de sus datos.">
        <Ejemplo filas={4} vacia={false} mas ancho="phone" />
      </Bloque>
    </Lienzo>
  ),
}

/* El "more" abierto. */
export const MoreOpen: Story = {
  name: 'More open',
  render: (a) => <Ejemplo {...a} />,
  play: async (c) => {
    await userEvent.click(await within(c.canvasElement).findByRole('button', { name: /1 more referral/ }))
    await esperar(/Dr. Omar Haddad/)(c)
  },
}

export const Specs: Story = {
  parameters: { controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Layout">
        <Tabla encabezado={['Item', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Row</td><td>Padding vertical 8px; línea de 1px entre filas.</td></tr>
          <tr><td className="font-semibold">Row title</td><td>Columna de 150px desde 448px de ancho del detalle (container query); abajo de eso, arriba de los datos.</td></tr>
          <tr><td className="font-semibold">Entry</td><td>Alto mínimo 24px (el del botón de turno); si no entra en una línea, sigue en la siguiente.</td></tr>
          <tr><td className="font-semibold">Gaps</td><td>12px entre el título, las filas y el pie.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Type and color">
        <Tabla encabezado={['Item', 'Size', 'Color']} minimo={560}>
          <tr><td className="font-semibold">Record title</td><td>13px Semibold</td><td><Token nombre="ink" /></td></tr>
          <tr><td className="font-semibold">Row title</td><td>11px Semibold</td><td><Token nombre="ink-muted" /></td></tr>
          <tr><td className="font-semibold">Link</td><td>12px Medium, flecha 12px</td><td><Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Context and note</td><td>11px</td><td><Token nombre="ink-muted" /></td></tr>
          <tr><td className="font-semibold">Nothing linked</td><td>12px</td><td><Token nombre="ink-faint" /></td></tr>
          <tr><td className="font-semibold">Divider</td><td>1px</td><td><Token nombre="line-soft" /></td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>A list, not cards: the detail should not take more room than the data it shows.</li>
          <li>Rows in order of importance for whoever opens the row; every row stays even when empty.</li>
          <li>Read-only: actions stay in the row menu; links go to the screen where the record is worked on.</li>
        </ul>
      </Bloque>
    </Lienzo>
  ),
}
