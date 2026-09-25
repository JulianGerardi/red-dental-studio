import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { CalendarDays } from 'lucide-react'
import { StatCard } from './StatCard'

const meta = {
  title: 'Components/Dashboard/StatCard',
  component: StatCard,
  args: { title: 'Appointments', value: '6', delta: '+2 vs yesterday', icon: CalendarDays },
} satisfies Meta<typeof StatCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
`})))()}n();export{t as default};