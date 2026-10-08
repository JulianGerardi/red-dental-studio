import type { Meta, StoryObj } from '@storybook/react-vite'
import { PlanDrawer } from './PlanDrawer'
import { esperar, pulsar, secuencia } from '@/design-system/play'
import { EstadosDelDrawer, PasosDelDrawer, SpecsDelDrawer } from '@/design-system/kit-drawer'
import { FinanzasProvider } from '@/data/finanzasStore'
import { PLANES } from '@/data/finanzas'

const meta = {
  title: 'Components/Finance/PlanDrawer',
  component: PlanDrawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 720 },
      description: {
        component: [
          'Alta y edición de un plan de seguro: el plan de un carrier y los dos datos que lo hacen cobrable, su **fee schedule** (lo que cobra el consultorio) y su **coverage table** (lo que paga el plan).',
          '',
          '**Pasos:** Plan (carrier, nombre, grupo, empleador, tipo; al editar también Status) y Billing (fee schedule con su tipo y cuántos precios tiene, coverage table con su resumen). Desde el detalle de un carrier el carrier viene fijo. Sólo se ofrece lo activo.',
          '',
          '**Probalo:** en *Playground* completá Plan, y en Billing elegí una coverage table para ver su resumen. *Edit* abre Aetna Dental PPO.',
        ].join('\n'),
      },
    },
  },
  decorators: [(Story) => <FinanzasProvider><Story /></FinanzasProvider>],
  args: { onClose: () => {}, onGuardar: () => {} },
  argTypes: { inicial: { control: false }, aseguradoraId: { control: 'select', options: ['aetna', 'cigna', 'metlife'], description: 'Carrier fijo, como al abrirlo desde su detalle.' } },
} satisfies Meta<typeof PlanDrawer>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/* Desde el detalle de un carrier: el carrier viene fijo (disabled). */
export const FromCarrier: Story = { args: { aseguradoraId: 'cigna' } }

/* Editar: los datos del plan y su Status. */
export const Edit: Story = { args: { inicial: PLANES[0] } }

export const Parts: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <PasosDelDrawer pasos={[
      { nombre: 'Plan', secciones: 'Plan Information: Carrier, Plan Name, Group Number, Employer, Plan Type (y Status al editar)', obligatorios: 'Carrier, Plan Name, Group Number, Plan Type' },
      { nombre: 'Billing', secciones: 'Fee Schedule (con “tipo · N procedures priced”) y Coverage Table (con su CoverageSummary)', obligatorios: 'Los dos' },
    ]} />
  ),
}

export const States: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <EstadosDelDrawer estados={[
      { estado: 'Default', cuando: 'Abre en Plan con todo vacío.', story: 'Playground' },
      { estado: 'Carrier fixed (disabled)', cuando: 'Abierto desde el detalle de un carrier: el select de Carrier queda disabled con su nombre.', story: 'From Carrier' },
      { estado: 'Editing', cuando: 'Edit Plan con los datos cargados y el select de Status.', story: 'Edit' },
      { estado: 'Validation errors', cuando: 'Next Step o Save con obligatorios vacíos.', story: 'With Validation Errors' },
      { estado: 'Saved', cuando: 'El plan aparece en la pestaña Plans del carrier y en las de su fee schedule y su coverage table.' },
    ]} />
  ),
}

export const WithValidationErrors: Story = {
  play: secuencia(pulsar(/^next step$/i), esperar(/required/i)),
}

export const Specs: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <SpecsDelDrawer filas={[
      ['Size', 'lg · 560px'],
      ['Opens from', 'New plan en el detalle del carrier y en el kebab de su fila; Edit plan en la tabla de planes.'],
      ['Options', 'Carriers, fee schedules y coverage tables activos; lo que el plan ya tenía se mantiene aunque esté inactivo.'],
      ['Group Number', 'Se guarda en mayúsculas.'],
    ]} />
  ),
}
