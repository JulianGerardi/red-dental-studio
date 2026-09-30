import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut,
  DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger,
} from './dropdown-menu'
import { Button } from './button'
import { MoreVertical } from 'lucide-react'

const meta = {
  title: 'Components/UI/DropdownMenu',
  component: DropdownMenu,
  parameters: { docs: { description: { component: 'La lista de acciones que abre un botón: el ⋮ de cada fila, Columns, los filtros. **Probalo** en *Playground*: acciones, la que borra, una deshabilitada, casillas y alineación.' } } },
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

type MenuArgs = { trigger: 'kebab' | 'button'; items: string; destructive: string; disabledItem: string; withCheckboxes: boolean; align: 'start' | 'center' | 'end'; open: boolean }

/* Armá el menú desde Controls: acciones, la que borra, una deshabilitada y
   casillas. */
export const Playground: StoryObj<MenuArgs> = {
  args: { trigger: 'kebab', items: 'Edit, Duplicate, Download', destructive: 'Delete', disabledItem: '', withCheckboxes: false, align: 'end', open: true },
  argTypes: {
    trigger: { control: 'inline-radio', options: ['kebab', 'button'], description: 'kebab: el ⋮ de las filas · button: un botón con nombre.' },
    items: { control: 'text', description: 'Acciones, separadas por coma.' },
    destructive: { control: 'text', description: 'Acción que borra: va al final, en rojo y separada. Vacío = ninguna.' },
    disabledItem: { control: 'text', description: 'Nombre de una acción que todavía no se puede usar.' },
    withCheckboxes: { control: 'boolean', description: 'Opciones que se tildan sin cerrar el menú (filtros, columnas).' },
    align: { control: 'inline-radio', options: ['start', 'center', 'end'], description: 'end para el ⋮ de las filas: abre hacia adentro de la tabla.' },
    open: { control: 'boolean', description: 'Abierto al cargar.' },
  },
  render: ({ trigger, items, destructive, disabledItem, withCheckboxes, align, open }) => {
    const acciones = items.split(',').map((x) => x.trim()).filter(Boolean)
    return (
      <div className="flex h-72 w-72 items-start justify-center pt-4">
        <DropdownMenu key={String(open)} defaultOpen={open}>
          <DropdownMenuTrigger asChild>
            {trigger === 'kebab'
              ? <button type="button" aria-label="Actions" className="flex size-8 items-center justify-center rounded-md text-ink hover:bg-surface-muted"><MoreVertical className="size-4" /></button>
              : <Button variant="secondary">Actions</Button>}
          </DropdownMenuTrigger>
          <DropdownMenuContent align={align} className="w-52">
            {acciones.map((a) => <DropdownMenuItem key={a} disabled={a === disabledItem.trim()}>{a}</DropdownMenuItem>)}
            {withCheckboxes && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked onSelect={(e) => e.preventDefault()}>Show inactive</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem onSelect={(e) => e.preventDefault()}>Only mine</DropdownMenuCheckboxItem>
              </>
            )}
            {destructive.trim() && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">{destructive}</DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  },
}

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
