import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
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
`})))()}export{n,i as r,r as t};