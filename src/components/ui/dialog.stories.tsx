import type { Meta, StoryObj } from '@storybook/react-vite'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from './dialog'
import { Button } from './button'

const meta = {
  title: 'Components/UI/Dialog',
  component: Dialog,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

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
          <DialogClose asChild><Button variant="outline">Close</Button></DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  ),
}
