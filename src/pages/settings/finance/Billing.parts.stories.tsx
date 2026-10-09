import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bloque, Lienzo, Muestra, Tabla, TablaPartes } from '@/design-system/kit'
import { FinanzasProvider, useFinanzas } from '@/data/finanzasStore'
import { ARANCELES, ASEGURADORAS, COBERTURAS, PLANES, planVacio } from '@/data/finanzas'
import { CarrierForm, CarrierPlans } from './Carriers'
import {
  PlanCoordination, PlanCoverage, PlanDeductibles, PlanDetail, PlanFeeByLocation, PlanPaymentTable, PlanPredeterminations,
} from './InsurancePlan'
import { FeeScheduleEditor } from './FeeSchedules'
import { CoverageTableEditor } from './CoverageTables'

/* Las piezas internas de Settings → Billing. Las pantallas completas están en Pages. Ver
   design-reference/figma/modulos/settings-billing.md. */

const PARTES = [
  'Carrier form', 'Carrier plans', 'Plan · Information', 'Plan · Coverage Table', 'Plan · Predeterminations', 'Plan · Payment Table',
  'Plan · Deductibles And Benefits', 'Plan · Coordination Of Benefits', 'Plan · Fee Schedule By Location', 'Fee schedule editor',
  'Coverage table editor',
] as const
type Parte = (typeof PARTES)[number]
type Args = { parte: Parte; carrier: string; plan: string; feeSchedule: string; coverageTable: string }

const meta = {
  title: 'Pages/Parts/Billing settings',
  parameters: {
    layout: 'padded',
    docs: {
      decisionsFrom: ['pages/settings/finance/Carriers.tsx', 'pages/settings/finance/InsurancePlan.tsx', 'pages/settings/finance/FeeSchedules.tsx', 'pages/settings/finance/CoverageTables.tsx'],
      description: {
        component: [
          'Las piezas de *Settings → Billing* que no son componentes sueltos. La lógica, los campos y los textos salen de red.dev (relevamiento en `design-reference/red-dev/settings-billing/`); el estilo y los componentes son los nuestros.',
          '',
          '- **Carriers**: *CarrierForm* (pestaña *Information* de Edit Carrier: General Information y Contact Information, Location Number) y *CarrierPlans* (pestaña *Insurance Plans / Employers*).',
          '- **Insurance plan**: las siete pestañas de Edit Insurance Plan, cada una con su Cancel · Save (Save deshabilitado hasta que algo cambie).',
          '- **Fee schedule editor**: General information con Copy form y Bulk Edit, versiones, Save in draft state, Available From, Type, *Non-zero fees* y la tabla Code · Description · Current Fee · New Fee con selección.',
          '- **Coverage table editor**: Manage Exceptions, Add Range, Name, Type y la tabla de rangos.',
          '',
          '**Probalo:** en *Playground* elegí la parte y el ítem desde *Controls*; todo se puede usar y guardar (en memoria).',
        ].join('\n'),
      },
    },
  },
  decorators: [(Story) => <FinanzasProvider><div className="bg-page-background p-4 sm:p-6"><Story /></div></FinanzasProvider>],
  args: { parte: 'Fee schedule editor', carrier: ASEGURADORAS[0].nombre, plan: PLANES[0].nombre, feeSchedule: ARANCELES[1].nombre, coverageTable: COBERTURAS[0].nombre },
  argTypes: {
    parte: { control: 'select', options: PARTES, description: 'Qué pieza mostrar.' },
    carrier: { control: 'select', options: ASEGURADORAS.map((c) => c.nombre), description: 'Para Carrier form y Carrier plans.' },
    plan: { control: 'select', options: PLANES.map((p) => p.nombre), description: 'Para las pestañas del plan.' },
    feeSchedule: { control: 'select', options: ARANCELES.map((a) => a.nombre), description: 'Para Fee schedule editor.' },
    coverageTable: { control: 'select', options: COBERTURAS.map((t) => t.nombre), description: 'Para Coverage table editor.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

const sinControles = { controls: { disable: true } }
const nada = () => {}

const SECCION = {
  'Plan · Information': PlanDetail, 'Plan · Coverage Table': PlanCoverage, 'Plan · Predeterminations': PlanPredeterminations,
  'Plan · Payment Table': PlanPaymentTable, 'Plan · Deductibles And Benefits': PlanDeductibles,
  'Plan · Coordination Of Benefits': PlanCoordination, 'Plan · Fee Schedule By Location': PlanFeeByLocation,
} as const

/* Cada pieza conectada al store, como en la pantalla. */
function Pieza({ parte, carrier, plan, feeSchedule, coverageTable }: Args) {
  const { aseguradoras, planes, aranceles, coberturas, guardar } = useFinanzas()
  const c = aseguradoras.find((x) => x.nombre === carrier) ?? aseguradoras[0]
  const p = planes.find((x) => x.nombre === plan) ?? planes[0]
  const a = aranceles.find((x) => x.nombre === feeSchedule) ?? aranceles[0]
  const t = coberturas.find((x) => x.nombre === coverageTable) ?? coberturas[0]
  if (parte === 'Carrier form') return <CarrierForm key={c.id} carrier={c} onGuardar={(x) => guardar('aseguradoras', x)} />
  if (parte === 'Carrier plans') return <CarrierPlans carrier={c} />
  if (parte === 'Fee schedule editor') return <FeeScheduleEditor key={`${a.id}-${a.versiones.length}`} arancel={a} />
  if (parte === 'Coverage table editor') return <CoverageTableEditor key={t.id} tabla={t} />
  const Seccion = SECCION[parte]
  return <Seccion key={p.id} plan={p} onGuardar={(x) => guardar('planes', x)} />
}

export const Playground: Story = {
  render: (args) => <Pieza {...args} />,
}

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[
          ['CarrierForm', 'Carrier Name y Payer ID deshabilitados; Location Number abre su drawer; banner “Uncompleted fields” al guardar incompleto.', 'Carriers.tsx'],
          ['CarrierPlans', 'Buscador “Search...”, columnas Plan/Employer Name · Group # · Status; ⋮ Edit, Inactive/Active, Delete con Undo.', 'Carriers.tsx'],
          ['PlanDetail', 'Pestaña Information: los cuatro grupos de PlanFields en cards.', 'InsurancePlan.tsx'],
          ['PlanCoverage', 'Type, Copy from, Add Range y la tabla de rangos.', 'InsurancePlan.tsx'],
          ['PlanPredeterminations', 'Switch por código (columna “Requierd”, tal cual) y buscador.', 'InsurancePlan.tsx'],
          ['PlanPaymentTable', 'Add Procedure, Filter procedures; Code · Description · Value.', 'InsurancePlan.tsx'],
          ['PlanDeductibles', 'Deductibles (Preventive, Basic, Major, Ortho) y Benefits (Maximum), en $.', 'InsurancePlan.tsx'],
          ['PlanCoordination', 'Un método por Source of Payment del plan primario.', 'InsurancePlan.tsx'],
          ['PlanFeeByLocation', 'Un fee schedule por locación, con “Use the plan default”.', 'InsurancePlan.tsx'],
          ['FeeScheduleEditor', 'Copy form, Bulk Edit, Name con lápiz, Version, Save in draft state, Available From, Type, Non-zero fees, selección y Current Fee · New Fee.', 'FeeSchedules.tsx'],
          ['CoverageTableEditor', 'Manage Exceptions (n), Add Range, Name, Type (fijo al editar) y RangesTable.', 'CoverageTables.tsx'],
        ]} />
      </Bloque>
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="States">
        <div className="flex flex-col gap-8">
          <Muestra titulo="Fee schedule editor · New" nota="Sin fee schedule: Name y Type habilitados y sólo la columna New Fee.">
            <FeeScheduleEditor />
          </Muestra>
          <Muestra titulo="Fee schedule editor · Missing fees" nota="Medicaid: Non-zero fees — 19 / 26; los códigos sin precio muestran “—” en Current Fee.">
            <FeeScheduleEditor arancel={ARANCELES.find((a) => a.id === 'medicaid')} />
          </Muestra>
          <Muestra titulo="Carrier plans · Empty" nota="Cigna Dental todavía no tiene planes.">
            <CarrierPlans carrier={ASEGURADORAS.find((c) => c.id === 'cigna')!} />
          </Muestra>
          <Muestra titulo="Plan coverage · Empty" nota="Un plan recién creado: “No procedure ranges found”.">
            <PlanCoverage plan={{ ...planVacio('cigna'), id: 'nuevo', nombre: 'Globex Corp' }} onGuardar={nada} />
          </Muestra>
          <Muestra titulo="Coverage table editor · New" nota="Name y Type habilitados, sin Manage Exceptions.">
            <CoverageTableEditor />
          </Muestra>
          <Muestra titulo="Save disabled" nota="Cada pestaña y editor deja Save deshabilitado hasta que algo cambie; con un error, el banner Uncompleted fields y el campo en rojo (error).">
            <CarrierForm carrier={ASEGURADORAS[0]} onGuardar={nada} />
          </Muestra>
          <Muestra titulo="Selected rows" nota="En el editor de fee schedule, las filas tildadas quedan en azul y Bulk Edit cambia sólo esas.">
            <FeeScheduleEditor arancel={ARANCELES[0]} />
          </Muestra>
        </div>
      </Bloque>
    </Lienzo>
  ),
}

export const Specs: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Rutas">
        <Tabla encabezado={['Ruta', 'Pieza']}>
          <tr><td className="font-mono text-xs">/settings/finance/carriers/:id/edit</td><td>CarrierForm</td></tr>
          <tr><td className="font-mono text-xs">…/edit/insurance-plans</td><td>CarrierPlans</td></tr>
          <tr><td className="font-mono text-xs">…/insurance-plans/:planId/edit?section=</td><td>Plan* (sin section: Information)</td></tr>
          <tr><td className="font-mono text-xs">/settings/finance/fee-schedule/:id/edit</td><td>FeeScheduleEditor con la lista</td></tr>
          <tr><td className="font-mono text-xs">/settings/finance/coverage-table/:id/edit</td><td>CoverageTableEditor con la lista</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Measures">
        <Tabla encabezado={['Piece', 'Value']}>
          <tr><td className="font-semibold">Editor con lista</td><td className="tabular-nums">grid 260px + resto desde lg; TARJETA_PANEL con 20px de padding</td></tr>
          <tr><td className="font-semibold">Tabla de fees</td><td className="tabular-nums">16 · 64 · 1fr · 96 · 120, gap 12; New Fee de 32px</td></tr>
          <tr><td className="font-semibold">Pie de cada pestaña</td><td>Cancel a la izquierda, Save a la derecha</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
