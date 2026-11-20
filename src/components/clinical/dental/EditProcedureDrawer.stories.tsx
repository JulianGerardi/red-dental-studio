import type { Meta, StoryObj } from '@storybook/react-vite'
import { EditProcedureDrawer } from './EditProcedureDrawer'
import type { Finding } from './data'

const CARIES: Finding = { id: 'F-1', area: 'Tooth 19', condition: 'chronic enamel dental caries', descriptor: 'Deep', date: 'May 14, 2026', status: 'Active', tooth: 19, provider: 'Elena Martinez', surfaces: ['O'], notes: '', linked: [], diagnoses: [], kind: 'condition', examen: 'Dental assessment' }
const CORONA: Finding = { id: 'F-6', area: 'Tooth 19', condition: 'D2740 - Crown – porcelain/ceramic', descriptor: 'Tooth', date: 'May 14, 2026', status: 'Externally treated', tooth: 19, provider: 'Emily Chen', surfaces: [], notes: '', linked: ['F-1'], diagnoses: [], kind: 'procedure', fee: 1200 }

const meta = {
  title: 'Components/Clinical/Dental/EditProcedureDrawer',
  component: EditProcedureDrawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      jira: ['CON-2083', 'CON-1751', 'CON-3900'],
      story: { inline: false, iframeHeight: 640 },
      description: {
        component: '**Edit Procedure** (Figma 5294:85084; CON-2083, CON-1751): los datos del procedimiento arriba y, en pestañas, la información general (provider, notas, fee si existe) y los hallazgos y diagnósticos vinculados. Recibe todos los findings del paciente para ofrecer con cuál vincularlo. Lo abre [EditFindingDrawer](/docs/components-clinical-dental-editfindingdrawer--docs) cuando el finding es un procedimiento.\n\n**Probalo:** en *Default* cambiá de pestaña; *WithoutLinks* es un procedimiento sin hallazgos vinculados.',
      },
    },
  },
  args: { finding: CORONA, findings: [CARIES, CORONA], onClose: () => {}, onSave: () => {} },
} satisfies Meta<typeof EditProcedureDrawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
/* Sin hallazgos vinculados ni fee (estado vacío de esas secciones). */
export const WithoutLinks: Story = { args: { finding: { ...CORONA, linked: [], fee: undefined } } }
