import type { Preview } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/toaster'
import { DocsPage } from '../src/design-system/DocsPage'
import theme from './theme'
import '../src/index.css'

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { page: DocsPage, theme },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    options: {
      storySort: {
        order: ['Welcome', 'Foundations', 'Components', 'Patterns', 'Pages'],
      },
    },
  },
  decorators: [
    /* Las pantallas completas (Pages) traen su propio router y providers:
       con `parameters.router: false` no se les anida otro. */
    (Story, { parameters }) =>
      parameters.router === false ? (
        <Story />
      ) : (
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
