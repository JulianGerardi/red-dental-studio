import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { Home } from 'lucide-react'
import { conHelp } from '@/design-system/decorators'
import { ConTooltip, SettingsItem } from './Sidebar'

const meta = { title: 'Components/Layout/Sidebar parts', parameters: { layout: 'padded' }, decorators: [conHelp] } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/* Con el rail colapsado cada ítem lleva un tooltip con su nombre. */
export const ItemTooltip: Story = {
  render: () => (
    <div className="p-16">
      <ConTooltip label="Dashboard" mostrar>
        <button className="flex size-8 items-center justify-center rounded-md bg-dash-blue text-white"><Home className="size-4" /></button>
      </ConTooltip>
    </div>
  ),
}

/* El ítem de Settings, con su menú flotante. */
export const SettingsEntry: Story = {
  render: () => <div className="h-72 w-[234px] p-4"><SettingsItem clase={(a) => \`flex items-center rounded-md px-3 py-2 text-sm \${a ? 'bg-dash-blue text-white' : ''}\`} mostrarLabel /></div>,
}
`})))()}export{n,i as r,r as t};