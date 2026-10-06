import type { Meta, StoryObj } from '@storybook/react-vite'
import { Confibot } from './Confibot'
import { escribir } from '@/design-system/play'

const meta = {
  title: 'Components/Help/Confibot',
  component: Confibot,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 620 },
      description: {
        component: [
          'La hoja de chat que explica la app; se abre con *Confibot* en el menú lateral. Responde llevando a la pantalla donde vive lo que se pregunta.',
          '',
          '**Tipografía:** la de los drawers. Título 18px Bold y bajada 12px; mensajes y sugerencias 13px; rótulos 11px en mayúsculas.',
          '',
          '**Probalo:** en *Playground* escribí una pregunta o tocá una sugerencia.',
        ].join('\n'),
      },
    },
  },
  args: { abierto: true, onClose: () => {}, onShowOnScreen: () => {} },
  decorators: [(Story) => <div className="relative h-[640px]"><Story /></div>],
} satisfies Meta<typeof Confibot>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/* Enviar deshabilitado mientras el mensaje está vacío. */
export const SendDisabledWhenEmpty: Story = {}

/* Con un borrador escrito, Enviar se habilita. */
export const WithDraft: Story = { play: escribir(/ask me anything/i, 'How do I add a patient?') }
