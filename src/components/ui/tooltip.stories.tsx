import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'
import { Button } from './button'
import { CalendarRange } from 'lucide-react'

const meta = {
  title: 'Components/UI/Tooltip',
  component: Tooltip,
  parameters: { docs: { description: { component: 'El nombre de algo que se muestra sólo como ícono. **Probalo** en *Playground*: texto, lado, disparador, abierto fijo o al pasar el mouse, y demora.' } } },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

type TooltipArgs = { text: string; side: 'top' | 'right' | 'bottom' | 'left'; trigger: 'icon' | 'button'; open: boolean; delay: number }

/* Cambiá texto, lado, disparador y demora desde Controls. */
export const Playground: StoryObj<TooltipArgs> = {
  args: { text: 'Scheduling', side: 'right', trigger: 'icon', open: true, delay: 100 },
  argTypes: {
    text: { control: 'text', description: 'Una palabra o frase corta: nombra lo que el ícono no dice.' },
    side: { control: 'inline-radio', options: ['top', 'right', 'bottom', 'left'], description: 'Lado donde aparece. En los rieles, a la derecha.' },
    trigger: { control: 'inline-radio', options: ['icon', 'button'], description: 'Sobre qué aparece.' },
    open: { control: 'boolean', description: 'Abierto fijo para verlo. Apagado: aparece al pasar el mouse o con Tab.' },
    delay: { control: { type: 'range', min: 0, max: 800, step: 50 }, description: 'Demora en ms: 100-150 en los rieles, 500 en tablas para no parpadear al barrer.' },
  },
  render: ({ text, side, trigger, open, delay }) => (
    <TooltipProvider key={`${delay}-${open}`} delayDuration={delay}>
      <div className="p-16">
        <Tooltip open={open || undefined}>
          <TooltipTrigger asChild>
            {trigger === 'icon'
              ? <button type="button" aria-label={text} className="flex size-8 items-center justify-center rounded-md text-ink hover:bg-surface-muted"><CalendarRange className="size-4" /></button>
              : <Button variant="secondary">Hover me</Button>}
          </TooltipTrigger>
          <TooltipContent side={side} className="bg-ink text-white">{text}</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
}

export const Default: Story = {
  render: () => (
    <div className="p-16">
      <Tooltip defaultOpen>
        <TooltipTrigger asChild><Button variant="secondary">Hover me</Button></TooltipTrigger>
        <TooltipContent side="right">Dashboard</TooltipContent>
      </Tooltip>
    </div>
  ),
}

/* El proveedor fija la demora con que aparecen los tooltips del área. */
export const WithProviderDelay: Story = {
  render: () => (
    <TooltipProvider delayDuration={400}>
      <div className="p-16">
        <Tooltip>
          <TooltipTrigger asChild><Button variant="secondary">Hover, waits 400 ms</Button></TooltipTrigger>
          <TooltipContent>Delayed tooltip</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
}
