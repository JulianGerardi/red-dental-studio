import type { Preview } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/toaster'
import { DocsPage } from '../src/design-system/DocsPage'
import { Foco } from '../src/design-system/Foco'
import theme from './theme'
import '../src/index.css'
import '../src/design-system/docs.css'

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    /* Los ejemplos sin la barra de zoom del Storybook: el sitio tiene su
       propia estética (ver src/design-system/Sitio.tsx). */
    docs: { page: DocsPage, theme, canvas: { withToolbar: false } },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    options: {
      /* El panel de Controls a la vista: es donde se personaliza cada
         elemento. Las páginas de Audit, que no tienen controles, lo ocultan. */
      showPanel: true,
      storySort: {
        order: ['Welcome', 'Foundations', ['Overview', 'Colors', 'Typography', 'Radius and shadows'], 'Elements', ['Overview', 'Page header', 'Buttons', 'Fields', 'Tabs', 'Pills', 'Counts', 'Cards', 'Appointment cards', 'Tables', 'Navigation', 'Patient menu'], 'Components', ['Overview'], 'Pages', ['Overview'], 'Audit', ['Overview']],
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
    /* Una pieza de pantalla completa (una barra, un panel, un banner) dentro
       del recuadro de un ejemplo o de la vista de un dispositivo: con aire
       alrededor y el fondo gris de la app, para que no quede pegada al borde.
       Los modales se ven igual: se abren sobre todo el recuadro. */
    (Story, ctx) =>
      ctx.parameters.layout === 'fullscreen' && ctx.title.startsWith('Components/') && window.parent !== window && window.parent !== window.top ? (
        <div className="bg-page-background min-h-screen p-6">
          <Story />
        </div>
      ) : (
        <Story />
      ),
    /* Una historia abierta sola (Full screen, una pantalla de Pages): con la
       barra del sitio para volver. No en los docs ni en las vistas de
       dispositivo, que son iframes adentro de otro. */
    (Story, ctx) =>
      ctx.viewMode === 'story' && window.parent !== window && window.parent === window.top ? (
        <Foco id={ctx.id} titulo={ctx.title} nombre={ctx.name} layout={ctx.parameters.layout}>
          <Story />
        </Foco>
      ) : (
        <Story />
      ),
  ],
}

export default preview
