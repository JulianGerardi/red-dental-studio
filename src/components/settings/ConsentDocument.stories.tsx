import type { Meta, StoryObj } from '@storybook/react-vite'
import { ConsentDocument } from './ConsentDocument'

const meta = {
  title: 'Components/Settings/ConsentDocument',
  component: ConsentDocument,
  parameters: { layout: 'padded' },
  args: {
    titulo: 'Extraction Informed Consent',
    procedimiento: 'Removal of impacted tooth',
    naturaleza: 'The proposed treatment has been explained to me in a way that I understood, including what will be done and why it is recommended.',
    riesgos: 'Pain, swelling, bleeding, or bruising.\nInfection or delayed healing.\nReaction to medications or anesthesia.',
    vistaPaciente: false,
  },
  decorators: [(Story) => <div className="w-[520px] rounded-xl border border-line bg-surface-alt p-3"><Story /></div>],
} satisfies Meta<typeof ConsentDocument>

export default meta
type Story = StoryObj<typeof meta>

export const ClinicView: Story = {}
export const PatientView: Story = { args: { vistaPaciente: true } }
export const Empty: Story = { args: { titulo: '', procedimiento: undefined, naturaleza: '', riesgos: '' } }
