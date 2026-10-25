import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { HelpProvider } from '@/components/help/HelpProvider'
import { NotificacionesProvider } from '@/data/notificacionesStore'
import { Bloque, Lienzo, Tabla } from '@/design-system/kit'
import { AppShell } from './AppShell'

const meta = {
  title: 'Components/Layout/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 620 },
      description: {
        component: [
          'El marco de toda la app: rail a la izquierda, barra de arriba, banner de avisos y, debajo, el `main` con cada pantalla. Los botones flotantes (Confibot y la pestaña *Currently being seen*) viven en la columna derecha, encima del contenido.',
          '',
          '**Espacio al final de la página:** el contenido termina a ras, con el mismo padding que tiene a los costados (24px). Sólo en celular el `main` reserva 96px abajo para poder scrollear Cancel/Save por encima del botón de Confibot, que ahí no tiene columna propia (Julián, 2026-10-25, comparando con la app de red).',
          '',
          '**Probalo:** en *Default* achicá la ventana por debajo de 640px: aparece la reserva de abajo; por encima, no.',
        ].join('\n'),
      },
    },
    router: false,
  },
} satisfies Meta<typeof AppShell>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <MemoryRouter>
      <HelpProvider>
        <NotificacionesProvider>
          <Routes>
            <Route element={<AppShell />}>
              <Route index element={<div className="p-8 text-sm text-ink-muted">Page content goes here.</div>} />
            </Route>
          </Routes>
        </NotificacionesProvider>
      </HelpProvider>
    </MemoryRouter>
  ),
}

/* Espacio al final de la página, por ancho. */
export const Specs: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Page end spacing" nota="Medido con la página scrolleada hasta el final.">
        <Tabla encabezado={['Width', 'Below the last element', 'Why']} minimo={560}>
          <tr><td className="font-semibold">640px and up</td><td>24px (<code>py-6</code> de la página)</td><td>Igual que el padding de los costados; Confibot flota en la columna derecha y no tapa controles.</td></tr>
          <tr><td className="font-semibold">Below 640px</td><td>24px + 96px (<code>pb-24</code> del <code>main</code>)</td><td>No hay columna lateral: la reserva deja scrollear Cancel/Save por encima del botón de Confibot.</td></tr>
          <tr><td className="font-semibold">Right side, 640px and up</td><td>24px (<code>sm:pr-6</code> del <code>main</code>) + 24–32px de la página</td><td>Margen para la pestaña <em>Currently being seen</em> (54px) sin tocar kebabs ni filas.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
