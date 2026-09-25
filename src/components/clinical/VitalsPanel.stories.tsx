import type { Meta, StoryObj } from '@storybook/react-vite'
import { VitalsPanel } from './VitalsPanel'
import { escribir } from '@/design-system/play'

const meta = {
  title: 'Components/Clinical/VitalsPanel',
  component: VitalsPanel,
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 720 } } },
} satisfies Meta<typeof VitalsPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/* "Save" queda deshabilitado hasta que se escribe una nota. */
export const SaveDisabledUntilNote: Story = {}

/* Con una nota escrita, Save se habilita. */
export const WithNote: Story = { play: escribir(/note/i, 'Patient reports mild dizziness.') }
