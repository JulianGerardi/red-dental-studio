import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch } from './switch'

const meta = {
  title: 'Components/UI/Switch',
  component: Switch,
  argTypes: { size: { control: 'select', options: ['default', 'sm'] } },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { defaultChecked: true, 'aria-label': 'Active' } }

export const States: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Switch aria-label="Off" />
      <Switch defaultChecked aria-label="On" />
      <Switch size="sm" defaultChecked aria-label="Small on" />
      <Switch disabled aria-label="Disabled" />
      <Switch disabled defaultChecked aria-label="Disabled on" />
    </div>
  ),
}

/* Estado de error: borde y anillo rojos cuando el campo es inválido. */
export const Invalid: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Switch aria-invalid aria-label="Invalid off" />
      <Switch aria-invalid defaultChecked aria-label="Invalid on" />
    </div>
  ),
}
`})))()}export{r as n,n as r,i as t};