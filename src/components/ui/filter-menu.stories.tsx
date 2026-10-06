import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { CircleAlert, ClipboardList, Siren, Stethoscope } from 'lucide-react'
import { FilterMenu, FilterOptionLabel, FilterTrigger } from './filter-menu'
import { Bloque, ConRotulo, Lienzo, Muestras, Tabla, useMedidas } from '@/design-system/kit'
import { esperar } from '@/design-system/play'
import { userEvent, within } from 'storybook/test'

type Args = { kind: 'multiple' | 'single' | 'with search'; size: 'sm' | 'md'; counts: boolean; disabled: boolean }

const meta = {
  title: 'Elements/Filter',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'El filtro de la app (`@/components/ui/filter-menu`), uno solo para todas las pantallas: Dashboard, Ledger, Accounts overview, la tabla estándar, la Problem List, Workflows y el buscador de procedimientos.',
          '',
          '**El botón** es siempre el mismo: ícono, "Filter" y, con filtros aplicados, azul con la cantidad. **El menú** tiene grupos de varias opciones (casillas) o de una (radio), cada opción con su cantidad y, si es un estado, el punto de su color; búsqueda opcional y Clear all. Se aplica al tocar.',
          '',
          '**Tamaños:** md (36px) junto a buscadores; sm (28px) en encabezados de cards y paneles.',
          '',
          '**Probalo:** en *Playground* cambiá el tipo de filtro, el tamaño y las cantidades desde *Controls*.',
        ].join('\n'),
      },
    },
  },
  args: { kind: 'multiple', size: 'md', counts: true, disabled: false },
  argTypes: {
    kind: { control: 'inline-radio', options: ['multiple', 'single', 'with search'], description: 'Varias opciones (casillas), una (radio, con un valor por defecto) o con búsqueda.' },
    size: { control: 'inline-radio', options: ['md', 'sm'], description: 'md 36px junto a buscadores · sm 28px en encabezados de cards.' },
    counts: { control: 'boolean', description: 'Cuántas filas tiene cada opción.' },
    disabled: { control: 'boolean', description: 'Deshabilitado: la tabla está cargando o sin permiso.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

const OPERATORIOS = ['Operatory 1', 'Operatory 2', 'Operatory 3']
const ESTADOS = [
  { value: 'Active', tone: 'success' as const, count: 6 },
  { value: 'In treatment', tone: 'info' as const, count: 1 },
  { value: 'Monitoring', tone: 'warning' as const, count: 1 },
  { value: 'Discarded', tone: 'danger' as const, count: 1 },
]
const TIPOS = [
  { value: 'Procedure', icon: Stethoscope, count: 1 },
  { value: 'Emergency', icon: Siren, count: 1 },
  { value: 'Complication', icon: CircleAlert, count: 0, disabled: true },
  { value: 'Questionnaire', icon: ClipboardList, count: 4 },
]

function Demo({ kind, size, counts, disabled }: Args) {
  const [varios, setVarios] = useState<string[]>(['Operatory 2'])
  const [uno, setUno] = useState('Active')
  const [tipos, setTipos] = useState<string[]>([])
  const [q, setQ] = useState('')
  const conCuenta = <T extends { count?: number }>(o: T) => (counts ? o : { ...o, count: undefined })
  return (
    <div className="flex h-80 items-start gap-4">
      {kind === 'multiple' && (
        <FilterMenu label="Filter appointments" size={size} disabled={disabled} groups={[{ title: 'Operatory', options: OPERATORIOS.map((o, i) => conCuenta({ value: o, count: i + 2 })), value: varios, onChange: setVarios }]} />
      )}
      {kind === 'single' && (
        <FilterMenu label="Filter by status" size={size} disabled={disabled} groups={[{ type: 'single', title: 'Status', defaultValue: 'Active', options: ESTADOS.map(conCuenta), value: uno, onChange: setUno }]} />
      )}
      {kind === 'with search' && (
        <FilterMenu
          label="Filter workflows" size={size} disabled={disabled}
          groups={[{ title: 'Workflow type', options: TIPOS.map(conCuenta), value: tipos, onChange: setTipos }]}
          search={{ label: 'Code or description', placeholder: 'e.g. TRIAGE or Social', value: q, onChange: setQ }}
          result="6 of 6 workflows"
        />
      )}
    </div>
  )
}

export const Playground: Story = { render: (args) => <Demo {...args} /> }

/* Las piezas: el botón en sus estados y lo que lleva cada opción del menú. */
export const Parts: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Trigger" nota="El mismo botón en todas las pantallas. Sin filtros, blanco; con filtros aplicados, azul con la cantidad.">
        <Muestras>
          <ConRotulo rotulo="md · none applied"><FilterTrigger /></ConRotulo>
          <ConRotulo rotulo="md · 2 applied"><FilterTrigger count={2} /></ConRotulo>
          <ConRotulo rotulo="sm · in card headers"><FilterTrigger size="sm" /></ConRotulo>
          <ConRotulo rotulo="sm · 1 applied"><FilterTrigger size="sm" count={1} /></ConRotulo>
        </Muestras>
      </Bloque>
      <Bloque titulo="Option" nota="Nombre y cantidad; un estado lleva el punto de su color, una categoría su ícono.">
        <div className="flex w-[240px] flex-col gap-1 rounded-lg border border-line p-1 text-[13px]">
          {[ESTADOS[0]!, TIPOS[3]!, { value: 'Operatory 1', count: 3 }, { value: 'No results', count: 0 }].map((o) => (
            <div key={o.value} className="flex items-center gap-2 rounded-md px-2 py-1"><FilterOptionLabel o={o} /></div>
          ))}
        </div>
      </Bloque>
    </Lienzo>
  ),
}

/* Estados del filtro; el menú abierto se ve en Open. */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Tabla encabezado={['State', 'Sample', 'What it means']} minimo={720}>
      <tr><td className="font-semibold">Default</td><td><FilterTrigger /></td><td className="text-ink-medium">Sin filtros: se ve todo (o el valor por defecto, como Active en la Problem List).</td></tr>
      <tr><td className="font-semibold">Active</td><td><FilterTrigger count={2} /></td><td className="text-ink-medium">Hay filtros aplicados: azul con cuántos. Clear all los saca.</td></tr>
      <tr><td className="font-semibold">Disabled</td><td><FilterTrigger disabled /></td><td className="text-ink-medium">La tabla está cargando o es de sólo lectura.</td></tr>
    </Tabla>
  ),
}

/* El menú abierto, con una opción selected y la búsqueda. */
export const Open: Story = {
  args: { kind: 'with search' },
  render: (args) => <Demo {...args} />,
  play: async (c) => {
    await userEvent.click(await within(c.canvasElement).findByRole('button', { name: /filter workflows/i }))
    await esperar(/code or description/i)(c)
  },
}

function Medida({ size, count }: { size: 'sm' | 'md'; count: number }) {
  const { ref, m } = useMedidas()
  return (
    <tr>
      <td className="font-semibold">{size}{count ? ' · active' : ''}</td>
      <td><div ref={ref} className="inline-flex"><FilterTrigger size={size} count={count} /></div></td>
      <td className="tabular-nums">{m?.alto}</td>
      <td className="tabular-nums">{m?.padding}</td>
      <td className="tabular-nums">{m?.texto}</td>
      <td className="tabular-nums">{m?.icono}</td>
      <td className="tabular-nums">{m?.radio}</td>
    </tr>
  )
}

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Trigger" nota="Medidas leídas del botón dibujado. El menú mide 248px de ancho.">
        <Tabla encabezado={['Size', 'Sample', 'Height', 'Padding', 'Text', 'Icon', 'Radius']} minimo={720}>
          <Medida size="md" count={0} />
          <Medida size="md" count={2} />
          <Medida size="sm" count={0} />
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
