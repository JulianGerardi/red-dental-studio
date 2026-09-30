import type { Meta, StoryObj } from '@storybook/react-vite'
import { RadiographyUpload } from './RadiographyUpload'
import { escribir } from '@/design-system/play'

const meta = {
  title: 'Components/Clinical/RadiographyUpload',
  component: RadiographyUpload,
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 720 } } },
  args: { onCancel: () => {}, onSave: () => {} },
} satisfies Meta<typeof RadiographyUpload>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/* "Add" queda deshabilitado mientras el campo de URL está vacío; los archivos
   que se están subiendo muestran su barra de progreso (estado de carga). */
export const AddDisabledAndUploading: Story = {}

/* Con una URL escrita, el botón se habilita. */
export const WithUrl: Story = { play: escribir(/url|https?:/i, 'https://files.clinic.com/xray-01.png') }
