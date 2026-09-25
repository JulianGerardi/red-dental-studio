import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { HelpProvider } from '@/components/help/HelpProvider'
import { AppShell } from './AppShell'

const meta = {
  title: 'Components/Layout/AppShell',
  component: AppShell,
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } }, router: false },
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
`})))()}export{n,i as r,r as t};