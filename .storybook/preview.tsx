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
      /* El panel de Controls a la vista: es donde se personaliza cada
         elemento. Las páginas de Audit, que no tienen controles, lo ocultan. */
      showPanel: true,
      storySort: {
        order: ['Welcome', 'Foundations', ['Colors', 'Typography', 'Radius and shadows'], 'Elements', ['Page header', 'Buttons', 'Fields', 'Pills', 'Cards', 'Tables', 'Navigation', 'Patient menu'], 'Components', 'Pages', 'Audit'],
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
