import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useMemo, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pencil, Plus, Search, Trash2, Users } from 'lucide-react'
import { AmountCell, DataTable, PersonCell, TextCell, type DataTableColumn } from './data-table'
import { Button } from './button'
import { DropdownMenuItem } from './dropdown-menu'
import { Pill, type PillTone } from './pill'
import { Bloque, Lienzo, Tabla, Token } from '@/design-system/kit'

/* ── Datos de ejemplo ─────────────────────────────────────────────────────── */
type Paciente = { id: string; nombre: string; iniciales: string; email: string; nacimiento: string; provider: string; estado: 'Active' | 'Inactive' | 'Pending'; saldo: number; visita: string }

const NOMBRES = ['Sarah Stone', 'John Lorem', 'Maria Abril Viola', 'Elias Aguirre', 'Nadia Duarte', 'Mara Otero', 'Tomás Rivas', 'Lucía Paz', 'Diego Luna', 'Ana Beltrán', 'Pablo Ortiz', 'Julia Vega']
const PROVIDERS = ['Dr. Emily Chen', 'Dr. John Lorem', 'Dr. Ana Ruiz']
const ESTADOS: Paciente['estado'][] = ['Active', 'Active', 'Inactive', 'Pending']
const TONO: Record<Paciente['estado'], PillTone> = { Active: 'success', Inactive: 'neutral', Pending: 'warning' }

const PACIENTES: Paciente[] = Array.from({ length: 40 }, (_, i) => {
  const nombre = NOMBRES[i % NOMBRES.length]!
  return {
    id: \`p-\${i + 1}\`,
    nombre,
    iniciales: nombre.split(' ').map((p) => p[0]).slice(0, 2).join(''),
    email: \`\${nombre.toLowerCase().split(' ')[0]}.\${i + 1}@mail.com\`,
    nacimiento: \`\${String((i % 28) + 1).padStart(2, '0')}/\${String((i % 12) + 1).padStart(2, '0')}/19\${60 + (i % 40)}\`,
    provider: PROVIDERS[i % PROVIDERS.length]!,
    estado: ESTADOS[i % ESTADOS.length]!,
    saldo: ((i * 137) % 900) - 120,
    visita: \`Sep \${(i % 28) + 1}, 2026\`,
  }
})

/* Columnas disponibles: cada una sabe su encabezado, su ancho y qué dibujar. */
const COLUMNAS: Record<string, DataTableColumn<Paciente>> = {
  Name: { key: 'name', header: 'Full name', width: 220, cell: (p) => <PersonCell name={p.nombre} initials={p.iniciales} /> },
  Email: { key: 'email', header: 'Email', cell: (p) => <TextCell>{p.email}</TextCell> },
  Birthday: { key: 'birthday', header: 'Birthday', width: 120, cell: (p) => p.nacimiento },
  Provider: { key: 'provider', header: 'Provider', width: 150, cell: (p) => <TextCell>{p.provider}</TextCell> },
  Status: { key: 'status', header: 'Status', width: 110, cell: (p) => <Pill tone={TONO[p.estado]}>{p.estado}</Pill> },
  'Last visit': { key: 'visit', header: 'Last visit', width: 120, cell: (p) => p.visita },
  Balance: { key: 'balance', header: 'Balance', width: 110, align: 'right', cell: (p) => <AmountCell value={p.saldo} /> },
}
const NOMBRES_COLUMNAS = Object.keys(COLUMNAS)

type Args = {
  columns: string[]
  rows: number
  selectable: boolean
  rowActions: boolean
  toolbar: boolean
  clickableRows: boolean
  density: 'regular' | 'compact'
  pageSize: number
  itemLabel: string
}

const meta = {
  title: 'Elements/Tables',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'La tabla estándar de la app (\`@/components/ui/data-table\`). Tiene la misma anatomía que las tablas de Patients, Team, Accounts y Documents: **barra de arriba → encabezado → filas → pie**.',
          '',
          '**Cómo se arma:** le pasás las *columnas* (encabezado, ancho y qué dibujar en cada celda) y las *filas*. Selección, menú de fila, paginación y estado vacío se prenden con props.',
          '',
          '**Armá tu tabla:** en *Playground* elegí columnas, cantidad de filas y funciones desde *Controls*. El código de la tabla que armaste aparece en *Show code*.',
        ].join('\\n'),
      },
    },
  },
  args: { columns: ['Name', 'Email', 'Status', 'Balance'], rows: 24, selectable: true, rowActions: true, toolbar: true, clickableRows: false, density: 'regular', pageSize: 10, itemLabel: 'patients' },
  argTypes: {
    columns: { control: 'check', options: NOMBRES_COLUMNAS, description: 'Qué columnas mostrar, en ese orden.' },
    rows: { control: { type: 'range', min: 0, max: 40, step: 1 }, description: 'Cantidad de filas. 0 muestra el estado vacío.' },
    selectable: { control: 'boolean', description: 'Casilla por fila y "seleccionar todo".' },
    rowActions: { control: 'boolean', description: 'Menú ⋮ con Edit y Delete en cada fila.' },
    toolbar: { control: 'boolean', description: 'Barra de arriba con buscador y acción principal.' },
    clickableRows: { control: 'boolean', description: 'La fila entera abre el detalle.' },
    density: { control: 'inline-radio', options: ['regular', 'compact'], description: 'regular 56px por fila · compact 44px.' },
    pageSize: { control: 'inline-radio', options: [5, 10, 20], description: 'Filas por página.' },
    itemLabel: { control: 'text', description: 'Qué se cuenta en el pie.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

function Armada({ columns, rows, selectable, rowActions, toolbar, clickableRows, density, pageSize, itemLabel }: Args) {
  const [q, setQ] = useState('')
  const [abierta, setAbierta] = useState<string | null>(null)
  const datos = useMemo(() => PACIENTES.slice(0, rows).filter((p) => \`\${p.nombre} \${p.email}\`.toLowerCase().includes(q.toLowerCase())), [rows, q])
  /* En el orden lógico, no en el orden en que se tildaron. */
  const cols = NOMBRES_COLUMNAS.filter((c) => columns.includes(c)).map((c) => COLUMNAS[c]!)
  return (
    <div className="flex flex-col gap-3">
      <DataTable
        key={\`\${pageSize}-\${rows}\`}
        columns={cols.length ? cols : [COLUMNAS.Name!]}
        rows={datos}
        rowKey={(p) => p.id}
        rowLabel={(p) => p.nombre}
        selectable={selectable}
        rowActions={rowActions ? () => (
          <>
            <DropdownMenuItem><Pencil className="size-4 shrink-0" /> Edit</DropdownMenuItem>
            <DropdownMenuItem variant="destructive"><Trash2 className="size-4 shrink-0" /> Delete</DropdownMenuItem>
          </>
        ) : undefined}
        onRowClick={clickableRows ? (p) => setAbierta(p.nombre) : undefined}
        density={density}
        pageSize={pageSize}
        itemLabel={itemLabel}
        empty={rows === 0 ? { icon: Users, title: 'No patients yet', detail: 'Add your first patient to see them here.' } : undefined}
        toolbar={toolbar ? (
          <>
            <div className="relative w-[260px] max-w-full">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search patients" aria-label="Search patients" className="h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:border-dash-blue focus:outline-none" />
            </div>
            <Button className="ml-auto"><Plus />New patient</Button>
          </>
        ) : undefined}
      />
      {abierta && <p className="text-[12px] text-ink-muted">Row clicked: <b className="text-ink">{abierta}</b> (in the app this opens the detail).</p>}
    </div>
  )
}

/* Armá la tabla desde Controls. */
export const Playground: Story = { render: (args) => <Armada {...args} /> }

const PASOS: { titulo: string; texto: string; codigo: string }[] = [
  {
    titulo: 'Define the columns',
    texto: 'Una columna por dato: el encabezado, un ancho fijo en px (o ninguno, para la que se estira) y qué dibujar en la celda. Los montos van a la derecha.',
    codigo: \`const columns: DataTableColumn<Patient>[] = [
  { key: 'name', header: 'Full name', width: 220, cell: (p) => <PersonCell name={p.name} initials={p.initials} /> },
  { key: 'email', header: 'Email', cell: (p) => <TextCell>{p.email}</TextCell> },
  { key: 'status', header: 'Status', width: 110, cell: (p) => <Pill tone="success">{p.status}</Pill> },
  { key: 'balance', header: 'Balance', width: 110, align: 'right', cell: (p) => <AmountCell value={p.balance} /> },
]\`,
  },
  {
    titulo: 'Pass the rows',
    texto: 'Las filas y cómo identificar cada una. Con eso ya hay tabla, con pie y paginación de 10.',
    codigo: \`<DataTable columns={columns} rows={patients} rowKey={(p) => p.id} itemLabel="patients" />\`,
  },
  {
    titulo: 'Turn on what it needs',
    texto: 'Selección, menú de fila, barra de arriba, fila clickeable y estado vacío, sólo si la pantalla los usa.',
    codigo: \`<DataTable
  columns={columns} rows={patients} rowKey={(p) => p.id} itemLabel="patients"
  selectable
  rowActions={(p) => <DropdownMenuItem onSelect={() => edit(p)}>Edit</DropdownMenuItem>}
  toolbar={<><SearchInput /><Button className="ml-auto">New patient</Button></>}
  empty={{ title: 'No patients yet', detail: 'Add your first patient.' }}
/>\`,
  },
]

export const HowToBuild: Story = {
  name: 'How to build a table',
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <ol className="flex flex-col gap-6">
        {PASOS.map((p, i) => (
          <li key={p.titulo} className="grid grid-cols-1 gap-3 md:grid-cols-[260px_1fr]">
            <div>
              <p className="text-[13px] font-semibold"><span className="text-dash-blue">{i + 1}.</span> {p.titulo}</p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-ink-muted">{p.texto}</p>
            </div>
            <pre className="overflow-x-auto rounded-lg bg-ink px-4 py-3 font-mono text-[11.5px] leading-relaxed text-white">{p.codigo}</pre>
          </li>
        ))}
      </ol>
      <Bloque titulo="Result">
        <Armada columns={['Name', 'Email', 'Status', 'Balance']} rows={12} selectable rowActions toolbar clickableRows={false} density="regular" pageSize={5} itemLabel="patients" />
      </Bloque>
    </Lienzo>
  ),
}

const BASE: Args = { columns: ['Name', 'Email', 'Status'], rows: 6, selectable: false, rowActions: false, toolbar: false, clickableRows: false, density: 'regular', pageSize: 10, itemLabel: 'patients' }

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Empty" nota="Sin filas: el estado vacío dice por qué y qué hacer. No hay pie.">
        <Armada {...BASE} rows={0} />
      </Bloque>
      <Bloque titulo="Selected rows" nota="La fila elegida toma el fondo azul claro y el pie cuenta cuántas hay.">
        <Armada {...BASE} rows={4} selectable />
      </Bloque>
      <Bloque titulo="Compact" nota="44px por fila, para listas largas dentro de un panel.">
        <Armada {...BASE} rows={4} density="compact" />
      </Bloque>
    </Lienzo>
  ),
}

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Parts" nota="Cada parte con su alto y sus colores, tomados de data-table.tsx y src/index.css.">
        <Tabla encabezado={['Part', 'Height', 'Fill', 'Text', 'Divider']} minimo={760}>
          <tr><td className="font-semibold">Container</td><td>—</td><td><Token nombre="white" /></td><td>—</td><td><Token nombre="line-row" /> · radius 8px</td></tr>
          <tr><td className="font-semibold">Header row</td><td className="tabular-nums">44px</td><td><Token nombre="surface-alt" /></td><td><Token nombre="ink-muted" /> 11px Semibold</td><td>—</td></tr>
          <tr><td className="font-semibold">Row</td><td className="tabular-nums">56px · 44px compact</td><td><Token nombre="white" /></td><td><Token nombre="ink-soft" /> 13px</td><td><Token nombre="line-row" /></td></tr>
          <tr><td className="font-semibold">Selected row</td><td>—</td><td><Token nombre="dash-count-bg" /></td><td>—</td><td>—</td></tr>
          <tr><td className="font-semibold">Footer</td><td className="tabular-nums">52px</td><td><Token nombre="white" /></td><td><Token nombre="ink-muted" /> 12px Semibold</td><td><Token nombre="line-row" /></td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>One column stretches (the one without a width); the rest have a fixed width so header and rows line up.</li>
          <li>Amounts align right with tabular numbers; text that does not fit ends in “…” and shows in full on hover.</li>
          <li>If the columns do not fit, the table scrolls inside its box: the page never scrolls sideways.</li>
          <li>Search, filters and the main action go above the table, not inside it.</li>
        </ul>
      </Bloque>
    </Lienzo>
  ),
}
`})))()}export{n,i as r,r as t};