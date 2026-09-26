import type { Meta, StoryObj } from '@storybook/react-vite'
import { NewHoursModal } from './NewHoursModal'
import { esperar, pulsar, secuencia } from '@/design-system/play'

const meta = {
  title: 'Components/Settings/NewHoursModal',
  component: NewHoursModal,
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
  args: { onClose: () => {} },
} satisfies Meta<typeof NewHoursModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/* Estado de error: Save con los campos obligatorios vacíos. */
export const WithValidationErrors: Story = {
  play: secuencia(pulsar(/^save$/i), esperar(/required|at least|must|invalid/i)),
}

/* Los días que ya tienen horario (Mon, Thu, Fri, Sat) llegan seleccionados. */
export const DaysSelectedByDefault: Story = {}
