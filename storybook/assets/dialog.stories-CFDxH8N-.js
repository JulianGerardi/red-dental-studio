import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from './dialog'
import { Button } from './button'

const meta = {
  title: 'Components/UI/Dialog',
  component: Dialog,
  parameters: { layout: 'centered', docs: { description: { component: 'Una ventana para confirmar o completar algo antes de seguir. **Probalo** en *Playground*: pregunta, explicación, acción, tono y botón Close. Se cierra con Escape, con Close o con la acción.' } } },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

type DialogArgs = { title: string; description: string; confirmLabel: string; tone: 'primary' | 'destructive'; showCloseButton: boolean; open: boolean }

/* Cambiá pregunta, explicación, acción y tono desde Controls. */
export const Playground: StoryObj<DialogArgs> = {
  args: { title: 'Discard changes?', description: 'Your edits to this template will be lost.', confirmLabel: 'Discard', tone: 'destructive', showCloseButton: true, open: true },
  argTypes: {
    title: { control: 'text', description: 'La pregunta que hay que responder.' },
    description: { control: 'text', description: 'Qué pasa si se confirma.' },
    confirmLabel: { control: 'text', description: 'El verbo de la acción, no "OK".' },
    tone: { control: 'inline-radio', options: ['primary', 'destructive'], description: 'destructive si borra o descarta.' },
    showCloseButton: { control: 'boolean', description: 'Botón Close al lado de la acción.' },
    open: { control: 'boolean', description: 'Abierto al cargar. Apagado: se abre con el botón.' },
  },
  parameters: { docs: { story: { inline: false, iframeHeight: 420 } } },
  render: ({ title, description, confirmLabel, tone, showCloseButton, open }) => (
    <Dialog key={String(open)} defaultOpen={open}>
      <DialogTrigger asChild><Button>Open dialog</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton={showCloseButton}>
          <DialogClose asChild><Button variant={tone}>{confirmLabel}</Button></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild><Button>Open dialog</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Discard changes?</DialogTitle>
          <DialogDescription>Your edits to this template will be lost.</DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton>
          <Button variant="destructive">Discard</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

/* Composición a mano: el portal, la capa oscura y el botón de cerrar se
   pueden usar por separado cuando el contenido no es el diálogo estándar. */
export const ManualComposition: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Custom dialog</DialogTitle>
            <DialogDescription>Built from Portal, Overlay and Close.</DialogDescription>
          </DialogHeader>
          <DialogClose asChild><Button variant="secondary">Close</Button></DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  ),
}
`})))()}export{n,i as r,r as t};