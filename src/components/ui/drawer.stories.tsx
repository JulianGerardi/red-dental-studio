import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Drawer } from './drawer'
import { Button } from './button'

const meta = {
  title: 'Components/UI/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 560 },
      description: { component: 'Un panel que entra desde la derecha para cargar algo sin perder de vista la pantalla de atrás. Título con su X, contenido con scroll y las acciones fijas al pie. **Probalo** en *Playground*: título, bajada y si lleva pie.' },
    },
  },
} satisfies Meta<typeof Drawer>

export default meta

type DrawerArgs = { title: string; description: string; footer: boolean; open: boolean }

/* Cambiá título, bajada y pie desde Controls. */
export const Playground: StoryObj<DrawerArgs> = {
  args: { title: 'New Procedure', description: 'Chart a procedure on the selected area.', footer: true, open: true },
  argTypes: {
    title: { control: 'text', description: 'Qué se carga.' },
    description: { control: 'text', description: 'Una línea de contexto. Vacía, no se muestra.' },
    footer: { control: 'boolean', description: 'Acciones fijas al pie, una debajo de la otra.' },
    open: { control: 'boolean', description: 'Abierto al cargar. Apagado: se abre con el botón.' },
  },
  render: function Render({ title, description, footer, open }) {
    const [abierto, setAbierto] = useState(open)
    return (
      <div className="p-6">
        <Button onClick={() => setAbierto(true)}>Open drawer</Button>
        <Drawer
          open={abierto}
          onClose={() => setAbierto(false)}
          title={title}
          description={description || undefined}
          footer={footer ? (<><Button className="w-full">Next Step</Button><Button variant="secondary" className="w-full" onClick={() => setAbierto(false)}>Cancel</Button></>) : undefined}
        >
          <p className="text-[13px] text-ink-muted">The form goes here. The chart behind stays visible.</p>
        </Drawer>
      </div>
    )
  },
}
