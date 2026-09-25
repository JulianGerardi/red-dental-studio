import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { Confibot } from './Confibot'

const meta = {
  title: 'Components/Help/Confibot',
  component: Confibot,
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
  args: { abierto: true, onClose: () => {}, onShowOnScreen: () => {} },
  decorators: [(Story) => <div className="relative h-[640px]"><Story /></div>],
} satisfies Meta<typeof Confibot>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {}
`})))()}n();export{t as default};