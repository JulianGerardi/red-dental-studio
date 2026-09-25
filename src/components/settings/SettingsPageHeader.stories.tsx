import type { Meta, StoryObj } from '@storybook/react-vite'
import { Plus } from 'lucide-react'
import { SettingsPageHeader } from './SettingsPageHeader'

const meta = {
  title: 'Components/Settings/SettingsPageHeader',
  component: SettingsPageHeader,
  parameters: { layout: 'padded' },
  args: { titulo: 'Team', bajada: 'People who work at this clinic and what they can do.' },
} satisfies Meta<typeof SettingsPageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithActionAndSearch: Story = {
  args: {
    accion: <button className="bg-dash-blue flex h-9 items-center gap-1.5 rounded-md px-4 text-[13px] font-medium text-white"><Plus className="size-4" /> New employee</button>,
    children: <input placeholder="Search employees" className="h-9 w-64 rounded-md border border-line px-3 text-[13px]" />,
  },
}
