import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArchIcon, ScopeIcon } from './ScopeIcons'
import { SCOPES } from './data'

const meta = {
  title: 'Components/Clinical/Dental/ScopeIcon',
  component: ScopeIcon,
  args: { scope: 'Tooth', className: 'size-5' },
  argTypes: { scope: { control: 'select', options: SCOPES } },
} satisfies Meta<typeof ScopeIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const AllScopes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {SCOPES.map((s) => <span key={s} className="flex items-center gap-1.5 text-sm"><ScopeIcon scope={s} className="size-5" /> {s}</span>)}
    </div>
  ),
}

/* El ícono de arcada, que no existe en lucide, con el mismo tamaño que los demás. */
export const ArchGlyph: Story = { render: () => <ArchIcon className="size-6" /> }
`})))()}export{n,i as r,r as t};