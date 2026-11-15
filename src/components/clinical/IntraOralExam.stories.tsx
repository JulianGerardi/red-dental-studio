import type { Meta, StoryObj } from '@storybook/react-vite'
import { esperar, pulsar, secuencia } from '@/design-system/play'
import { IntraOralExam } from './IntraOralExam'

const meta = {
  title: 'Components/Clinical/IntraOralExam',
  component: IntraOralExam,
  parameters: {
    layout: 'padded',
    docs: {
      jira: ['CON-882', 'CON-2083'],
      story: { inline: false, iframeHeight: 720 },
      description: {
        component: 'El examen **Intraoral** completo (CON-882): el gráfico de la boca ([IntraOralDiagram](/docs/components-clinical-dental-intraoraldiagram--docs)) con el mismo Add Condition por región que Extraoral ([RegionExam](/docs/components-clinical-regionexam--docs)). Por ahora las zonas clickeables son el paladar duro (derecho e izquierdo) y el paladar blando: el resto espera su lista de nombres (clinical-mode.md, 2026-10-24).\n\n**Probalo:** tocá *Soft Palate* -queda en ámbar- y después *Add Condition*: el drawer abre con esa región en "Selected area".',
      },
    },
  },
} satisfies Meta<typeof IntraOralExam>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
/* Una región elegida (selected), lista para Add Condition. */
export const RegionSelected: Story = { play: secuencia(pulsar(/^Soft Palate$/i), esperar(/add condition/i)) }
