import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card'

const meta = {
  title: 'Components/UI/HoverCard',
  component: HoverCard,
  parameters: { docs: { description: { component: 'Información para leer que aparece al pasar el mouse (la ficha de un diente). **Probalo** en *Playground*: contenido, lado y demora.' } } },
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

type HoverArgs = { trigger: string; title: string; detail: string; side: 'top' | 'right' | 'bottom' | 'left'; open: boolean; openDelay: number }

/* Cambiá contenido, lado y demora desde Controls. */
export const Playground: StoryObj<HoverArgs> = {
  args: { trigger: 'Tooth 14', title: 'Tooth 14 · Upper left first premolar', detail: 'Existing restoration on the occlusal surface. Last reviewed Mar 12, 2025.', side: 'bottom', open: true, openDelay: 300 },
  argTypes: {
    trigger: { control: 'text', description: 'Sobre qué se pasa el mouse.' },
    title: { control: 'text' },
    detail: { control: 'text' },
    side: { control: 'inline-radio', options: ['top', 'right', 'bottom', 'left'] },
    open: { control: 'boolean', description: 'Abierta fija. Apagado: aparece al pasar el mouse, después de la demora.' },
    openDelay: { control: { type: 'range', min: 0, max: 1000, step: 50 }, description: 'Demora en ms: pasar de largo no la abre.' },
  },
  render: ({ trigger, title, detail, side, open, openDelay }) => (
    <div className="p-24">
      <HoverCard key={\`\${open}-\${openDelay}\`} defaultOpen={open} openDelay={openDelay}>
        <HoverCardTrigger asChild><a className="text-dash-blue cursor-pointer text-sm font-medium">{trigger}</a></HoverCardTrigger>
        <HoverCardContent side={side}>
          <p className="text-sm font-bold">{title}</p>
          <p className="mt-1 text-xs leading-relaxed text-ink-muted">{detail}</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
}

export const Default: Story = {
  render: () => (
    <div className="p-24">
      <HoverCard defaultOpen>
        <HoverCardTrigger asChild><a className="text-dash-blue cursor-pointer text-sm font-medium">Sarah Stone</a></HoverCardTrigger>
        <HoverCardContent>
          <p className="text-sm font-bold">Sarah Stone</p>
          <p className="text-xs text-ink-muted">DOB 04/02/1991 · Patient ID 12345432</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
}
`})))()}export{n,i as r,r as t};