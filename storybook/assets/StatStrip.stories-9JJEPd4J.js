import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { CalendarDays, HandCoins, Receipt, Wallet } from 'lucide-react'
import { StatStrip } from './StatStrip'

const meta = {
  title: 'Components/Dashboard/StatStrip',
  component: StatStrip,
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 720 } } },
} satisfies Meta<typeof StatStrip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const StackedFourStats: Story = {
  args: {
    apilada: true,
    stats: [
      { label: 'Total charges', value: '$12,480', nota: '18 records', icon: Receipt },
      { label: 'Payments', value: '$9,300', nota: '11 records', icon: Wallet },
      { label: 'Balance', value: '$3,180', nota: 'Due now', icon: CalendarDays },
      { label: 'Unapplied credits', value: '$230', nota: '2 payments', icon: HandCoins },
    ],
  },
}
`})))()}n();export{t as default};