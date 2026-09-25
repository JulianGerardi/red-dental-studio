import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { conHelp } from '@/design-system/decorators'
import { Sidebar } from './Sidebar'

const meta = {
  title: 'Components/Layout/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
  decorators: [conHelp, (Story) => <div className="flex h-[720px]"><Story /></div>],
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Expanded: Story = { args: { expanded: true } }
export const Collapsed: Story = { args: { expanded: false } }

/* Ítem activo: se pinta según la ruta actual; acá se llega navegando a Scheduling. */
export const ActiveItem: Story = {
  args: { expanded: true },
  play: async (c) => {
    const { userEvent, within } = await import('storybook/test')
    await userEvent.click(await within(c.canvasElement.ownerDocument.body).findByRole('link', { name: /^scheduling$/i }))
  },
}
`})))()}export{n,i as r,r as t};