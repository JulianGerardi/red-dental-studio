import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/components/ui/button'
import { DockFlotantes, PanelDock } from './DockFlotantes'

/* La columna de flotantes del borde derecho. Decisiones en design-reference/figma/modulos/help.md (2026-10-27). */
type Args = { baseY: number; open: boolean }

const meta = {
  title: 'Components/Layout/DockFlotantes',
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 520 },
      description: {
        component: [
          'La columna pegada al borde derecho donde viven recogidos los dos flotantes del app shell: la pestaña de *currently being seen* arriba y la de Confibot debajo. Al abrir una, su card u hoja se despliega **dentro de la columna** (`PanelDock`) y empuja a lo que tiene abajo, en vez de taparlo.',
          '',
          '**Cómo se usa:** `baseY` es la altura donde arranca la columna. Si al crecer no entra en la pantalla, la columna sube: reparte el crecimiento arriba y abajo y nunca se sale del alto de la ventana.',
          '',
          '**Probalo:** en *Playground* abrí y cerrá el panel con el botón o desde *Controls*, y cambiá `baseY` para ver cómo se acomoda cerca del borde.',
        ].join('\n'),
      },
    },
  },
  args: { baseY: 120, open: false },
  argTypes: {
    baseY: { control: { type: 'range', min: 0, max: 460, step: 20 }, description: 'Dónde arranca la columna, en px desde arriba.' },
    open: { control: 'boolean', description: 'El panel desplegado adentro de la columna.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

const Pestana = ({ children }: { children: string }) => (
  <span className="pointer-events-auto flex h-8 items-center rounded-l-lg bg-dash-blue px-3 text-[12px] font-medium text-white">{children}</span>
)

function Demo({ baseY, open }: Args) {
  const [abierto, setAbierto] = useState(open)
  return (
    <div className="bg-page-background min-h-[480px] p-6">
      <Button variant="secondary" onClick={() => setAbierto((v) => !v)}>{abierto ? 'Close panel' : 'Open panel'}</Button>
      <DockFlotantes baseY={baseY}>
        <Pestana>Being seen</Pestana>
        <PanelDock abierto={abierto}>
          <div className="pointer-events-auto mr-2 w-[240px] rounded-xl bg-white p-4 text-[13px] text-ink shadow-lg">The card grows inside the column and pushes the Confibot tab down.</div>
        </PanelDock>
        <Pestana>Confibot</Pestana>
      </DockFlotantes>
    </div>
  )
}

export const Playground: Story = { render: (args) => <Demo key={JSON.stringify(args)} {...args} /> }
/* Los dos estados: recogido y con el panel abierto. */
export const Collapsed: Story = { parameters: { controls: { disable: true } }, render: () => <Demo baseY={120} open={false} /> }
export const PanelOpen: Story = { parameters: { controls: { disable: true } }, render: () => <Demo baseY={120} open /> }
/* Cerca del borde de abajo, la columna sube para que el panel entre. */
export const NearTheBottom: Story = { parameters: { controls: { disable: true } }, render: () => <Demo baseY={440} open /> }
