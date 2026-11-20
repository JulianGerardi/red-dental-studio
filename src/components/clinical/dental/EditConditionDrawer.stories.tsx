import type { Meta, StoryObj } from '@storybook/react-vite'
import { esperar, pulsarRol, secuencia } from '@/design-system/play'
import { EditConditionDrawer } from './EditConditionDrawer'

const meta = {
  title: 'Components/Clinical/Dental/EditConditionDrawer',
  component: EditConditionDrawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      jira: ['CON-2770', 'CON-1751'],
      story: { inline: false, iframeHeight: 640 },
      description: {
        component: '**Edit Finding** de una condition cargada en un diente (Figma 5301:149072; CON-2770): arriba los datos del finding de lectura, y en pestañas lo que se edita -superficies, descriptores y notas-. Un solo *Save* guarda todo. Lo abre [EditFindingDrawer](/docs/components-clinical-dental-editfindingdrawer--docs), que elige el drawer según el tipo de finding.\n\n**Probalo:** en *Default* cambiá de pestaña y elegí otro descriptor; *Descriptors* abre directo en esa pestaña.',
      },
    },
  },
  args: {
    finding: { id: 'F-1', area: 'Tooth 3', condition: 'chronic enamel dental caries', descriptor: 'Deep', date: 'May 14, 2026', status: 'Active', tooth: 3, provider: 'Elena Martinez', surfaces: ['O', 'DB'], notes: 'Occlusal decay detected on routine exam.', linked: [], diagnoses: [], kind: 'condition', descriptors: { borders: 'Raised' }, examen: 'Dental assessment' },
    onClose: () => {},
    onSave: () => {},
  },
} satisfies Meta<typeof EditConditionDrawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
/* La pestaña Descriptors elegida (selected). */
export const Descriptors: Story = { play: secuencia(pulsarRol('tab', /descriptors/i), esperar(/descriptors/i)) }
/* Sin finding (estado vacío): el drawer no se abre. */
export const Closed: Story = { args: { finding: null } }
