import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { Popover, PopoverAnchor, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from './popover'
import { Button } from './button'

const meta = {
  title: 'Components/UI/Popover',
  component: Popover,
  parameters: { docs: { description: { component: 'Un panel chico que se abre al lado de un botón y queda abierto hasta cerrarlo. **Probalo** en *Playground*: contenido, lado, alineación y ancho.' } } },
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

type PopoverArgs = { title: string; description: string; side: 'top' | 'right' | 'bottom' | 'left'; align: 'start' | 'center' | 'end'; open: boolean; width: number }

/* Cambiá contenido, posición y ancho desde Controls. */
export const Playground: StoryObj<PopoverArgs> = {
  args: { title: 'Patient information', description: 'General and contact data, readable without leaving the screen.', side: 'right', align: 'start', open: true, width: 288 },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    side: { control: 'inline-radio', options: ['top', 'right', 'bottom', 'left'] },
    align: { control: 'inline-radio', options: ['start', 'center', 'end'], description: 'Cómo se alinea con el botón.' },
    open: { control: 'boolean', description: 'Abierto fijo. Apagado: se abre con clic y se cierra con Escape o clic afuera.' },
    width: { control: { type: 'range', min: 200, max: 420, step: 8 }, description: 'Ancho en px (288 por defecto).' },
  },
  render: ({ title, description, side, align, open, width }) => (
    <div className="p-24">
      <Popover key={String(open)} defaultOpen={open}>
        <PopoverTrigger asChild><Button variant="secondary">Open</Button></PopoverTrigger>
        <PopoverContent side={side} align={align} style={{ width }}>
          <PopoverHeader>
            <PopoverTitle>{title}</PopoverTitle>
            <PopoverDescription>{description}</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </div>
  ),
}

export const Default: Story = {
  render: () => (
    <div className="p-24">
      <Popover defaultOpen>
        <PopoverTrigger asChild><Button variant="secondary">Open</Button></PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </div>
  ),
}

/* Anclado a otro elemento: \`PopoverAnchor\` fija dónde se ubica el popover sin
   que ese elemento sea el disparador. */
export const AnchoredElsewhere: Story = {
  render: () => (
    <div className="p-24">
      <Popover open>
        <PopoverAnchor asChild><div className="h-10 w-48 rounded-md border border-dashed border-line-strong bg-surface-subtle p-2 text-xs">Anchor</div></PopoverAnchor>
        <PopoverContent><PopoverTitle>Anchored</PopoverTitle><PopoverDescription>Positioned against the dashed box.</PopoverDescription></PopoverContent>
      </Popover>
    </div>
  ),
}
`})))()}export{r as n,n as r,i as t};