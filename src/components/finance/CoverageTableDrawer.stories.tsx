import type { Meta, StoryObj } from '@storybook/react-vite'
import { CoverageTableDrawer } from './CoverageTableDrawer'
import { esperar, pulsar, secuencia } from '@/design-system/play'
import { EstadosDelDrawer, PasosDelDrawer, SpecsDelDrawer } from '@/design-system/kit-drawer'
import { FinanzasProvider } from '@/data/finanzasStore'
import { COBERTURAS } from '@/data/finanzas'

const meta = {
  title: 'Components/Finance/CoverageTableDrawer',
  component: CoverageTableDrawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 720 },
      description: {
        component: [
          'Alta y edición de una coverage table: qué paga un plan por categoría, con su deducible y sus máximos.',
          '',
          '**Nuevo:** General (nombre, de qué parte -una plantilla como *Standard 100/80/50* o “Copy of” una tabla- y el período de beneficio), Limits (máximos y deducibles) y Coverage (el porcentaje de cada clase, precargado por lo elegido). **Editar:** General y Limits; cada categoría se ajusta en la tabla del detalle.',
          '',
          '**Probalo:** en *Playground* elegí *Standard 100/80/50* en Start From y seguí hasta Coverage. *Edit* abre PPO Standard.',
        ].join('\n'),
      },
    },
  },
  decorators: [(Story) => <FinanzasProvider><Story /></FinanzasProvider>],
  args: { onClose: () => {}, onGuardar: () => {} },
  argTypes: { inicial: { control: false } },
} satisfies Meta<typeof CoverageTableDrawer>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Edit: Story = { args: { inicial: COBERTURAS[0] } }

export const Parts: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <PasosDelDrawer
      nota="Al editar hay dos pasos (General y Limits) y no se elige Start From."
      pasos={[
        { nombre: 'General', secciones: 'General Information: Name, Start From (plantillas y “Copy of …”), Benefit Period', obligatorios: 'Todos' },
        { nombre: 'Limits', secciones: 'Maximums: Annual Maximum, Orthodontic Lifetime Maximum. Deductibles: Individual, Family', obligatorios: 'Annual Maximum, Individual Deductible' },
        { nombre: 'Coverage', secciones: 'Coverage by Class: Preventive, Basic, Major, Orthodontics (%), cada uno con las categorías que abarca', obligatorios: 'Los cuatro' },
      ]}
    />
  ),
}

export const States: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <EstadosDelDrawer estados={[
      { estado: 'Default', cuando: 'Abre en General con Benefit Period en Calendar year.', story: 'Playground' },
      { estado: 'Prefilled', cuando: 'Elegir una plantilla carga los cuatro porcentajes; “Copy of” una tabla carga además sus límites y copia sus reglas tal cual si no se tocan.' },
      { estado: 'Validation errors', cuando: 'Obligatorios vacíos, montos que no son números y porcentajes fuera de 0 a 100.', story: 'With Validation Errors' },
      { estado: 'Editing', cuando: 'Edit Coverage Table con dos pasos.', story: 'Edit' },
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
      ['Opens from', 'New coverage table (lista y /settings/finance/coverage-table/new); Edit limits en la fila y en el detalle.'],
      ['Zero values', 'Annual Maximum 0 = sin máximo (“No limit”). Ortho 0 = ortodoncia no cubierta.'],
      ['Classes', 'Preventive: Diagnostic, Preventive. Basic: Restorative, Endodontic, Periodontal, Oral surgery, Adjunctive. Major: Prosthodontics, Maxillofacial, Implants. Orthodontics. Other (cosmética) arranca en 0.'],
    ]} />
  ),
}
