import type { Preview } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/toaster'
import '../src/index.css'

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    options: {
      storySort: {
        order: ['Welcome', 'Foundations', 'Components', 'Patterns', 'Pages'],
      },
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <TooltipProvider>
          <Story />
          <Toaster />
        </TooltipProvider>
      </MemoryRouter>
    ),
  ],
}

export default preview
