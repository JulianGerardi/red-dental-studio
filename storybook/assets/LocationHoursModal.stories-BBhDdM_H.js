import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { LocationHoursModal } from './LocationHoursModal'

const meta = {
  title: 'Components/Settings/LocationHoursModal',
  component: LocationHoursModal,
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
  args: { onClose: () => {} },
} satisfies Meta<typeof LocationHoursModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const FromSingleDay: Story = { args: { dia: 3 } }
`})))()}n();export{t as default};