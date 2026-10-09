import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { MasterList, type ItemMaestro } from './MasterList'
import { Bloque, Lienzo, Muestra, Muestras, Tabla, TablaPartes, Token } from '@/design-system/kit'
import { Pill } from '@/components/ui/pill'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { SelectField } from '@/components/patients/form'
import { ARANCELES, TONO_ARANCEL } from '@/data/finanzas'

type Args = { elegido: string; conFiltro: boolean; ancho: number }

const meta = {
  title: 'Components/Finance/MasterList',
  parameters: {
    layout: 'padded',
    docs: {
      decisionsFrom: 'components/finance/MasterList.tsx',
      description: {
        component: [
          'La lista de la izquierda de *Edit Fee Schedule* y de *Coverage Table*, como en red.dev: buscador, un filtro y un ítem por fee schedule o plantilla. El elegido se abre a la derecha y queda resaltado.',
          '',
          'Cada ítem lleva su nombre (link a la edición), una etiqueta opcional (*Default*), el estado como punto de color (con su nombre en el title y en texto oculto) y el menú ⋮.',
          '',
          '**Probalo:** en *Playground* buscá, elegí otro ítem o sacá el filtro.',
        ].join('\n'),
      },
    },
  },
  args: { elegido: 'aetna-2026', conFiltro: true, ancho: 260 },
  argTypes: {
    elegido: { control: 'select', options: ARANCELES.map((a) => a.id), description: 'El ítem abierto a la derecha.' },
    conFiltro: { control: 'boolean', description: 'Muestra el filtro de arriba.' },
    ancho: { control: { type: 'range', min: 220, max: 360, step: 10 }, description: 'Ancho de la columna.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

const items: ItemMaestro[] = ARANCELES.slice(0, 7).map((a) => ({
  id: a.id, nombre: a.nombre, to: '#',
  etiqueta: a.porDefecto ? <Pill tone="info" size="sm">Default</Pill> : undefined,
  estado: { nombre: a.estado, tono: TONO_ARANCEL[a.estado] },
  acciones: <><DropdownMenuItem>Inactive</DropdownMenuItem><DropdownMenuItem variant="destructive">Archive</DropdownMenuItem></>,
}))

function Lista({ elegido, conFiltro = true, inicial = '', abierto, lista = items }: { elegido?: string; conFiltro?: boolean; inicial?: string; abierto?: string; lista?: ItemMaestro[] }) {
  const [q, setQ] = useState(inicial)
  const visibles = lista.filter((i) => i.nombre.toLowerCase().includes(q.trim().toLowerCase()))
  return (
    <MasterList
      items={visibles} elegido={elegido} q={q} onQ={setQ} placeholder="Search a Fee Schedule Here..." abierto={abierto}
      vacio="No fee schedules match the search or filters."
      filtro={conFiltro ? <SelectField hideLabel label="Type" options={['Percentage', 'Copayment']} value="Percentage" onChange={() => {}} /> : undefined}
    />
  )
}

export const Playground: Story = {
  render: ({ elegido, conFiltro, ancho }) => <div style={{ width: ancho }}><Lista elegido={elegido} conFiltro={conFiltro} /></div>,
}

export const Parts: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[
          ['Buscador', 'Search a Fee Schedule Here... (también en Coverage Table, tal cual red.dev) + Search.', 'SettingsSearch'],
          ['Filtro', 'Filters con States en Fee Schedules; el Type en Coverage Table.', 'FilterMenu / SelectField'],
          ['Ítem', 'Link a la edición; el elegido en azul sobre info-bg.', 'Link'],
          ['Etiqueta', 'La pill Default del fee schedule por defecto.', 'Pill'],
          ['Estado', 'Punto del color de la pill del estado; nombre en title y sr-only.', 'span'],
          ['Menú ⋮', 'Inactive / Archive en Fee Schedules; Delete en Coverage Table.', 'RowActionsMenu'],
        ]} />
      </Bloque>
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="States">
        <Muestras>
          <Muestra titulo="Selected" nota="El ítem abierto a la derecha." ancho={260}><Lista elegido="ucr-red" /></Muestra>
          <Muestra titulo="Empty" nota="La búsqueda o el filtro no dejan nada." ancho={260}><Lista inicial="zzz" /></Muestra>
          <Muestra titulo="Menu open" ancho={260}><Lista elegido="aetna-2026" abierto="aetna-2026" lista={items.slice(0, 3)} /></Muestra>
        </Muestras>
      </Bloque>
    </Lienzo>
  ),
}

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Measures">
        <Tabla encabezado={['Piece', 'Value']}>
          <tr><td className="font-semibold">Columna</td><td className="tabular-nums">260px en escritorio; a lo ancho debajo de lg</td></tr>
          <tr><td className="font-semibold">Lista</td><td className="tabular-nums">alto máximo 560px con scroll propio, 4px de padding</td></tr>
          <tr><td className="font-semibold">Ítem</td><td className="tabular-nums">13px, 8px arriba y abajo, punto de 8px</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Piece', 'Token']}>
          <tr><td className="font-semibold">Elegido</td><td><Token nombre="info-bg" /> · <Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Hover</td><td><Token nombre="surface-subtle" /></td></tr>
          <tr><td className="font-semibold">Punto Active / Inactive / Archived</td><td><Token nombre="dash-ok-fg" /> · <Token nombre="dash-bad-fg" /> · <Token nombre="ink-faint" /></td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
