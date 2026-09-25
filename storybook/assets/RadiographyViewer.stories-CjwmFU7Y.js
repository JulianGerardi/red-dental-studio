import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import type { Meta, StoryObj } from '@storybook/react-vite'
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
`})))()}n();export{t as default};