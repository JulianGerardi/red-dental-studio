import type { Meta, StoryObj } from '@storybook/react-vite'
import { ACTIVIDAD_RECIENTE, METODOS_PAGO, TIPOS_AJUSTE_CARGO, TIPOS_AJUSTE_CREDITO } from '@/data/billing'
import { PasosDelDrawer, EstadosDelDrawer, SpecsDelDrawer } from '@/design-system/kit-drawer'
import { Bloque, Lienzo, Tabla } from '@/design-system/kit'
import { esperar, pulsar, secuencia } from '@/design-system/play'
import { PostPaymentDialog } from './PostPaymentDialog'

/* Playground, Parts, States y Specs de los tres drawers de Billing. Decisiones en
   design-reference/figma/modulos/billing.md (2026-11-13, "Los botones y sus drawers"). */

const meta = {
  title: 'Components/Billing/PostPaymentDialog',
  component: PostPaymentDialog,
  parameters: {
    layout: 'fullscreen',
    docs: {
      jira: ['CON-4147', 'CON-1060', 'CON-3732'],
      story: { inline: false, iframeHeight: 680 },
      description: {
        component: [
          'Los tres drawers que cargan un movimiento en la cuenta de un paciente, **uno por botón, como red.dev** (CON-4147): *Patient Payment (-)* abre **New Patient Payment (-)**, *Credit Adjustment (-)* abre **Credit Adjustment (-)** y *Charge Adjustment (+)* abre **Enter Charge (+) Adjustment**. Es un solo componente: `tipoInicial` decide qué drawer arma. Lo abren Billing (con un paciente elegido) y el Ledger del paciente.',
          '',
          '**Cómo se usa:** el pago y el crédito tienen dos pasos -los datos y *Allocation*, la tabla donde se elige a qué cargos se aplica-; lo que no se aplica queda como crédito sin aplicar. El pago acepta **varios métodos** con + y −, y *Check Payment* pide Check y Bank/Branch. El cargo es de un solo paso: suma Provider y Visit date y no lleva tabla de aplicación. *Apply to* ofrece al paciente y a los demás de su garante.',
          '',
          '**Probalo:** en *Playground* elegí el tipo desde *Controls*. *Parts* muestra los pasos de cada drawer y las listas de red.dev, *States* cada estado con su story y *Specs* los anchos.',
        ].join('\n'),
      },
    },
  },
  args: { tipoInicial: 'Patient Payment', pacienteInicial: 'Maria Abril Viola', movs: ACTIVIDAD_RECIENTE, onClose: () => {}, onGuardar: () => {} },
  argTypes: {
    tipoInicial: { control: 'select', options: ['Patient Payment', 'Credit Adjustment', 'Charge Adjustment'], description: 'Qué botón se tocó: decide el título, los campos y si hay paso Allocation.' },
    pacienteInicial: { control: 'text', description: 'El paciente elegido en Billing o el de la ficha: Apply to ofrece a su grupo de garante.' },
  },
} satisfies Meta<typeof PostPaymentDialog>

export default meta
type Story = StoryObj<typeof meta>
const sinControles = { layout: 'padded' as const, controls: { disable: true }, docs: { story: { inline: true } } }

export const Playground: Story = {}
export const PatientPayment: Story = {}
export const CreditAdjustment: Story = { args: { tipoInicial: 'Credit Adjustment' } }
export const ChargeAdjustment: Story = { args: { tipoInicial: 'Charge Adjustment' } }

/* Estado de error: Save o Next Step con los campos obligatorios vacíos. */
export const WithValidationErrors: Story = {
  args: { tipoInicial: 'Charge Adjustment' },
  play: secuencia(pulsar(/^save$/i), esperar(/required|at least|must|invalid/i)),
}

/* Varios métodos de pago: + suma una fila y − la quita. */
export const SeveralPaymentMethods: Story = { play: secuencia(pulsar(/add another payment method/i), esperar(/remove this payment method/i)) }

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <PasosDelDrawer
        nota="New Patient Payment (-) y Credit Adjustment (-). Enter Charge (+) Adjustment es de un solo paso, sin Allocation."
        pasos={[
          { nombre: 'Payment / Adjustment', secciones: 'Date · Apply to · métodos de pago (o tipo de ajuste) · Amount · Notes', obligatorios: 'Amount mayor a cero; con Check Payment, Check y Bank/Branch' },
          { nombre: 'Allocation', secciones: 'La tabla de cargos abiertos con lo que se aplica a cada uno', obligatorios: 'Nada: lo que no se aplica queda como crédito' },
        ]}
      />
      <Bloque titulo="Lists from red.dev" nota="Viven en data/billing.ts.">
        <Tabla encabezado={['List', 'Options']} minimo={640} arriba>
          <tr><td className="font-semibold whitespace-nowrap">Payment methods</td><td>{METODOS_PAGO.join(' · ')}</td></tr>
          <tr><td className="font-semibold whitespace-nowrap">Credit adjustment types</td><td>{TIPOS_AJUSTE_CREDITO.join(' · ')}</td></tr>
          <tr><td className="font-semibold whitespace-nowrap">Charge adjustment types</td><td>{TIPOS_AJUSTE_CARGO.join(' · ')}</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <EstadosDelDrawer estados={[
      { estado: 'New Patient Payment (-)', cuando: 'Patient Payment (-) en Billing o en el Ledger.', story: 'Patient Payment' },
      { estado: 'Credit Adjustment (-)', cuando: 'Credit Adjustment (-).', story: 'Credit Adjustment' },
      { estado: 'Enter Charge (+) Adjustment', cuando: 'Charge Adjustment (+): un solo paso, con Provider y Visit date.', story: 'Charge Adjustment' },
      { estado: 'Validation errors', cuando: 'Save o Next Step sin Amount.', story: 'With Validation Errors' },
      { estado: 'Several payment methods', cuando: 'Add another payment method.', story: 'Several Payment Methods' },
    ]} />
  ),
}

export const Specs: Story = {
  parameters: sinControles,
  render: () => (
    <SpecsDelDrawer filas={[
      ['Width · payment and credit', '2xl · 1000px, para que la tabla de Allocation entre entera'],
      ['Width · charge', 'El ancho por defecto de los drawers de formulario (ModalShell)'],
      ['Fields', 'De a dos y del mismo ancho; Notes ocupa el ancho entero'],
      ['Footer · payment and credit', 'Cancel / Next Step en el primer paso; Return / Save en Allocation'],
      ['Footer · charge', 'Cancel / Save: un solo paso'],
    ]} />
  ),
}
