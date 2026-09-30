import type { Meta, StoryObj } from '@storybook/react-vite'
import { RADIOGRAFIAS } from '@/data/clinical-mode'
import { RadiographyViewer } from './RadiographyViewer'

const meta = {
  title: 'Components/Clinical/RadiographyViewer',
  component: RadiographyViewer,
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 720 } } },
  args: { estudios: RADIOGRAFIAS, actual: RADIOGRAFIAS[0], onCambiar: () => {}, onVolver: () => {}, onSubir: () => {} },
} satisfies Meta<typeof RadiographyViewer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/* En la lista de procedimientos de una condición, los que no aplican aparecen
   deshabilitados (fondo gris, cursor bloqueado), y el elegido lleva borde azul. */
export const DisabledProcedureAndSelection: Story = {}
