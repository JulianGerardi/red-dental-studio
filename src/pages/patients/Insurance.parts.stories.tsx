import type { Meta, StoryObj } from '@storybook/react-vite'
import { ShieldHalf } from 'lucide-react'
import { FilaDato } from './Insurance'

const meta = { title: 'Pages/Parts/Insurance', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const DataRow: Story = { render: () => <div className="w-[300px]"><FilaDato icon={ShieldHalf} label="Carrier" value="Delta Dental" /></div> }
