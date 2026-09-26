import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut,
  DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger,
} from './dropdown-menu'
import { Button } from './button'

const meta = {
  title: 'Components/UI/DropdownMenu',
  component: DropdownMenu,
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="h-64 w-64">
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger asChild><Button variant="secondary">My Account</Button></DropdownMenuTrigger>
        <DropdownMenuContent className="w-52">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile <DropdownMenuShortcut>⇧P</DropdownMenuShortcut></DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuCheckboxItem checked>Notifications</DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
}

/* Ítem deshabilitado: atenuado y sin respuesta al mouse ni al teclado. */
export const DisabledItem: Story = {
  render: () => (
    <div className="h-64 w-64">
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger asChild><Button variant="secondary">Actions</Button></DropdownMenuTrigger>
        <DropdownMenuContent className="w-52">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem disabled>Cancel (disabled - started)</DropdownMenuItem>
          <DropdownMenuCheckboxItem disabled checked>Notifications (disabled)</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
}

/* Grupos, opciones de radio y submenú: el resto de la familia del menú. */
export const GroupsRadioAndSubmenu: Story = {
  render: () => (
    <div className="h-72 w-72">
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger asChild><Button variant="secondary">View</Button></DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuRadioGroup value="date">
              <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent><DropdownMenuItem>Export…</DropdownMenuItem></DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
}
