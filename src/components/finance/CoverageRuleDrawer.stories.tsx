import type { Meta, StoryObj } from '@storybook/react-vite'
import { CoverageRuleDrawer } from './CoverageRuleDrawer'
import { escribir, esperar, secuencia } from '@/design-system/play'
import { EstadosDelDrawer, PasosDelDrawer, SpecsDelDrawer } from '@/design-system/kit-drawer'
import { COBERTURAS } from '@/data/finanzas'

const tabla = COBERTURAS[0]

const meta = {
  title: 'Components/Finance/CoverageRuleDrawer',
  component: CoverageRuleDrawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 640 },
      description: {
        component: [
          'La regla de una categoría de una coverage table: cuánto paga el plan, si se descuenta el deducible, la espera y el límite de frecuencia. Se abre tocando una fila de la tabla de reglas.',
          '',
          '**Un paso:** Coverage (Plan Pays con su barra y el interruptor Deductible Applies, on / off) y Limitations (Waiting Period y Frequency Limit).',
          '',
          '**Probalo:** en *Playground* cambiá el porcentaje y mirá la barra; elegí otra categoría desde *Controls*.',
        ].join('\n'),
      },
    },
  },
  args: { grupo: 'Implant services', regla: tabla.reglas['Implant services'], onClose: () => {}, onGuardar: () => {} },
  argTypes: {
    grupo: { control: 'select', options: Object.keys(tabla.reglas), description: 'La categoría CDT.' },
    regla: { control: false },
  },
} satisfies Meta<typeof CoverageRuleDrawer>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (a) => <CoverageRuleDrawer key={a.grupo} {...a} regla={tabla.reglas[a.grupo]} />,
}

/* Una categoría que no cubre: sin barra, “Not covered”. */
export const NotCovered: Story = { args: { grupo: 'Cosmetic & aesthetic services', regla: tabla.reglas['Cosmetic & aesthetic services'] } }

export const Parts: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <PasosDelDrawer
      nota="Un paso. El título es la categoría y la bajada su rango de códigos y su clase."
      pasos={[{ nombre: 'Rule', secciones: 'Coverage: Plan Pays (%), la barra (CoverageBar), Deductible Applies (on / off). Limitations: Waiting Period, Frequency Limit', obligatorios: 'Plan Pays' }]}
    />
  ),
}

export const States: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <EstadosDelDrawer estados={[
      { estado: 'Default', cuando: 'Con la regla actual y la barra del porcentaje.', story: 'Playground' },
      { estado: 'Not covered', cuando: '0%: la barra dice “Not covered”.', story: 'Not Covered' },
      { estado: 'Validation errors', cuando: 'Vacío o fuera de 0 a 100 (sólo enteros): sin barra y el error debajo; Save no hace nada.', story: 'With Validation Errors' },
      { estado: 'Saved', cuando: 'La fila cambia y el toast dice “… now pays N%.”.' },
    ]} />
  ),
}

export const WithValidationErrors: Story = {
  play: secuencia(escribir(/plan pays/i, '150'), esperar(/whole number/i)),
}

export const Specs: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <SpecsDelDrawer filas={[
      ['Size', 'md · 480px'],
      ['Opens from', 'Una fila (o Edit rule) de la tabla de reglas, en el detalle de una coverage table.'],
      ['Deductible', 'Toggle de settings/primitives: Yes / No.'],
      ['Waiting Period', 'None, 3, 6 o 12 months.'],
    ]} />
  ),
}
