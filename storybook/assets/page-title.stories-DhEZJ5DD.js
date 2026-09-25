import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { PageTitle } from './page-title'

const meta = {
  title: 'Components/UI/PageTitle',
  component: PageTitle,
  args: { children: 'Patients' },
  argTypes: { size: { control: 'select', options: ['md', 'lg'] } },
} satisfies Meta<typeof PageTitle>

export default meta
type Story = StoryObj<typeof meta>

export const Medium: Story = {}
export const Large: Story = { args: { size: 'lg' } }
`})))()}n();export{t as default};