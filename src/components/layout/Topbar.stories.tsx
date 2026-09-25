import type { Meta, StoryObj } from '@storybook/react-vite'
import { NOTIFICACIONES } from '@/data/notificaciones'
import { Topbar } from './Topbar'

const meta = {
  title: 'Components/Layout/Topbar',
  component: Topbar,
  parameters: { layout: 'fullscreen' },
  args: { expanded: true, onToggleSidebar: () => {}, notificaciones: NOTIFICACIONES },
} satisfies Meta<typeof Topbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithoutNotifications: Story = { args: { notificaciones: [] } }
