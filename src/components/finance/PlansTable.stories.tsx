import type { Meta, StoryObj } from '@storybook/react-vite'
import { PlansTable, type ColumnaPlan } from './PlansTable'
import { Bloque, Lienzo, Muestra, Tabla, TablaPartes } from '@/design-system/kit'
import { FinanzasProvider } from '@/data/finanzasStore'
import { ASEGURADORAS, PLANES } from '@/data/finanzas'

type Args = { carrier: string; ocultar: ColumnaPlan[]; acciones: boolean; loading: boolean }

const meta = {
  title: 'Components/Finance/PlansTable',
  parameters: {
    layout: 'padded',
    docs: {
      decisionsFrom: 'components/finance/PlansTable.tsx',
      description: {
        component: [
          'Los planes de seguro (`@/components/finance/PlansTable`), armada con la tabla estándar (*Elements / Tables*). Es lo que une las tres secciones de Billing: cada plan lleva como link su carrier, su fee schedule y su coverage table.',
          '',
          '**Dónde va:** en el detalle de un carrier (pestaña Plans, sin la columna Carrier), de un fee schedule (sin Fee schedule) y de una coverage table (sin Coverage table). Con `onEditar` el nombre del plan abre el drawer de edición y la fila suma Edit plan y Delete plan.',
          '',
          '**Probalo:** en *Playground* elegí el carrier, qué columnas ocultar, si tiene acciones y el estado *loading* desde *Controls*.',
        ].join('\n'),
      },
    },
  },
  decorators: [(Story) => <FinanzasProvider><Story /></FinanzasProvider>],
  args: { carrier: 'All carriers', ocultar: [], acciones: true, loading: false },
  argTypes: {
    carrier: { control: 'select', options: ['All carriers', ...ASEGURADORAS.map((c) => c.nombre)], description: 'Filtra los planes de ejemplo por carrier. Humana no tiene planes: muestra el vacío.' },
    ocultar: { control: 'inline-check', options: ['carrier', 'feeSchedule', 'coverageTable'], description: 'Columnas que el detalle ya es.' },
    acciones: { control: 'boolean', description: 'onEditar y onBorrar: nombre clickeable y menú de fila.' },
    loading: { control: 'boolean', description: 'Filas grises mientras carga.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

const sinControles = { controls: { disable: true } }
const nada = () => {}
const de = (nombre: string) => PLANES.filter((p) => nombre === 'All carriers' || p.aseguradoraId === ASEGURADORAS.find((c) => c.nombre === nombre)?.id)

export const Playground: Story = {
  render: (a) => (
    <PlansTable planes={de(a.carrier)} ocultar={a.ocultar} loading={a.loading} onEditar={a.acciones ? nada : undefined} onBorrar={a.acciones ? nada : undefined} />
  ),
}

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo className="max-w-[1100px]">
      <PlansTable planes={de('Aetna')} onEditar={nada} onBorrar={nada} />
      <TablaPartes partes={[
        ['Plan', 'Nombre del plan. Con onEditar es un botón que abre Edit Plan.', 'button / TextCell'],
        ['Carrier', 'Link al detalle del carrier. Se oculta en el detalle de un carrier.', 'Link'],
        ['Group number · Employer · Type', 'Los datos del plan; Employer vacío es “—”.', 'TextCell'],
        ['Fee schedule', 'Link al fee schedule que usa el plan: lo que cobra el consultorio.', 'Link'],
        ['Coverage table', 'Link a la coverage table: lo que paga el plan.', 'Link'],
        ['Subscribers · Status', 'Pacientes suscriptos y estado (Active / Inactive).', 'Pill'],
        ['Actions', 'Edit plan y Delete plan, si se pasan onEditar y onBorrar.', 'RowActionsMenu'],
      ]} />
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo className="max-w-[1100px]">
      <Muestra titulo="In a carrier" nota="Sin la columna Carrier, con acciones: como en la pestaña Plans del carrier."><PlansTable planes={de('Delta Dental of California')} ocultar={['carrier']} onEditar={nada} onBorrar={nada} /></Muestra>
      <Muestra titulo="In a fee schedule (read only)" nota="Sin la columna Fee schedule y sin acciones: los planes se editan desde su carrier."><PlansTable planes={PLANES.filter((p) => p.arancelId === 'delta-ppo')} ocultar={['feeSchedule']} /></Muestra>
      <Muestra titulo="Empty" nota="El carrier todavía no tiene planes."><PlansTable planes={[]} ocultar={['carrier']} vacio={{ title: 'No plans yet', detail: 'Add the plans your patients have with this carrier.' }} /></Muestra>
      <Muestra titulo="Loading" nota="Filas grises con la forma de las columnas."><PlansTable planes={de('Aetna')} loading /></Muestra>
    </Lienzo>
  ),
}

export const Specs: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Columns" nota="Anchos fijos; Employer es la que se estira.">
        <Tabla encabezado={['Column', 'Width', 'Hidden in']} minimo={480}>
          {[['Plan', '190', '—'], ['Carrier', '170', 'Carrier detail'], ['Group number', '110', '—'], ['Employer', 'flex', '—'], ['Type', '80', '—'], ['Fee schedule', '160', 'Fee schedule detail'], ['Coverage table', '170', 'Coverage table detail'], ['Subscribers', '90 · right', '—'], ['Status', '80', '—']].map(([c, w, o]) => (
            <tr key={c}><td className="font-semibold">{c}</td><td className="tabular-nums">{w}</td><td>{o}</td></tr>
          ))}
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>Names come from the Billing store: a renamed fee schedule shows its new name everywhere.</li>
          <li>A plan with subscribers can’t be deleted: set it to Inactive instead (Carriers.tsx).</li>
          <li>Links are blue and underline on hover, like the rest of the tables.</li>
        </ul>
      </Bloque>
    </Lienzo>
  ),
}
