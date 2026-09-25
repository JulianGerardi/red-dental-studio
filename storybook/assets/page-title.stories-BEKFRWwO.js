import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
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
`})))()}export{r as n,n as r,i as t};