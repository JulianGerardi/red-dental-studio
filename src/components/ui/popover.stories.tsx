import type { Meta, StoryObj } from '@storybook/react-vite'
import { Popover, PopoverAnchor, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from './popover'
import { Button } from './button'

const meta = {
  title: 'Components/UI/Popover',
  component: Popover,
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="p-24">
      <Popover defaultOpen>
        <PopoverTrigger asChild><Button variant="outline">Open</Button></PopoverTrigger>
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

/* Anclado a otro elemento: `PopoverAnchor` fija dónde se ubica el popover sin
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
