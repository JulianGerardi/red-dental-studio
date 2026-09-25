import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { HelpProvider } from '@/components/help/HelpProvider'
import { AppShell } from './AppShell'

const meta = {
  title: 'Components/Layout/AppShell',
  component: AppShell,
  parameters: { layout: 'fullscreen', router: false },
} satisfies Meta<typeof AppShell>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <MemoryRouter>
      <HelpProvider>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<div className="p-8 text-sm text-ink-muted">Page content goes here.</div>} />
          </Route>
        </Routes>
      </HelpProvider>
    </MemoryRouter>
  ),
}
