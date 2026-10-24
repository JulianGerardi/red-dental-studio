import type { Meta, StoryObj } from '@storybook/react-vite'
import { EditFindingDrawer } from './EditFindingDrawer'

const meta = {
  title: 'Components/Clinical/Dental/EditFindingDrawer',
  component: EditFindingDrawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 620 },
      description: {
        component: [
          'Editar un finding, en el mismo drawer de la derecha que New Procedure/New Condition: estado, fecha, zona, condición y descriptores arriba (`FindingCard`); Provider, Surfaces (si tiene pieza) y Notes abajo.',
          '',
          '**Descriptors sólo en una condition** (`finding.kind === "condition"`): la guía visual de [DescriptorFields](/docs/components-clinical-dental-descriptorfields--docs), cargada con lo que ya tenía elegido. Un procedure no la lleva.',
          '',
          '**Probalo:** en *Default* tocá otra píldora de Borders o Surface y guardá: la línea "Descriptors" de la card de arriba no cambia -es una foto de cuando se abrió el drawer-, pero la Problem List sí queda con lo nuevo.',
        ].join('\n'),
      },
    },
  },
  args: {
    finding: { id: 'F-1', area: 'Tooth 3', condition: 'chronic enamel dental caries', descriptor: 'Deep', date: 'May 14, 2026', status: 'Active', tooth: 3, provider: 'Elena Martinez', surfaces: ['O', 'DB'], notes: '', linked: ['#10987231'], diagnoses: [], kind: 'condition', descriptors: { borders: 'Raised' } },
    onClose: () => {},
    onSave: () => {},
  },
} satisfies Meta<typeof EditFindingDrawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/* Un finding sin pieza (una zona de la boca): sin la rueda de superficies. */
export const WithoutTooth: Story = { args: { finding: { id: 'F-2', area: 'Soft Palate', condition: 'oral candidiasis', descriptor: 'Red', date: 'May 14, 2026', status: 'Active', tooth: null, provider: 'Sarah Stone', surfaces: [], notes: '', linked: [], diagnoses: [], kind: 'condition', descriptors: { colors: 'Red' } } } }

/* Un procedure (Add Procedure): sin la sección de Descriptors, que es sólo de una condition. */
export const ProcedureFinding: Story = { args: { finding: { id: 'F-6', area: 'Tooth 19', condition: 'D2740 - Crown – porcelain/ceramic', descriptor: 'Tooth', date: 'May 14, 2026', status: 'Externally Treated', tooth: 19, provider: 'Emily Chen', surfaces: [], notes: '', linked: [], diagnoses: [], kind: 'procedure' } } }
