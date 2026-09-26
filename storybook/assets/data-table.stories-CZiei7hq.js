import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pencil, Plus, Trash2, Users } from 'lucide-react'
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
  Name: { key: 'name', header: 'Full name', width: 220, locked: true, cell: (p) => <PersonCell name={p.nombre} initials={p.iniciales} /> },
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
  search: boolean
  filter: boolean
  columnPicker: boolean
  resizable: boolean
  expandable: boolean
  reorderable: boolean
  selectable: boolean
  rowActions: boolean
  primaryAction: boolean
  clickableRows: boolean
  density: 'regular' | 'compact'
  pageSize: number
  itemLabel: string
  state: 'ready' | 'loading' | 'error' | 'disabled'
  disabledRows: boolean
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
          '**Reducir, achicar y filtrar** (las funciones del Ledger): buscador, filtro por estado, *Columns* para ocultar columnas, bordes de columna que se arrastran para achicar o ensanchar, y filas que se despliegan para ver el detalle.',
          '',
          '**Armá tu tabla:** en *Playground* elegí columnas, cantidad de filas y funciones desde *Controls*. El código de la tabla que armaste aparece en *Show code*.',
        ].join('\\n'),
      },
    },
  },
  args: {
    columns: ['Name', 'Email', 'Status', 'Balance'], rows: 24,
    search: true, filter: true, columnPicker: true, resizable: true, expandable: false, reorderable: false,
    selectable: true, rowActions: true, primaryAction: true, clickableRows: false,
    density: 'regular', pageSize: 10, itemLabel: 'patients', state: 'ready', disabledRows: false,
  },
  argTypes: {
    columns: { control: 'check', options: NOMBRES_COLUMNAS, description: 'Qué columnas mostrar, en ese orden.' },
    rows: { control: { type: 'range', min: 0, max: 40, step: 1 }, description: 'Cantidad de filas. 0 muestra el estado vacío.' },
    search: { control: 'boolean', description: 'Buscador por nombre o email.', table: { category: 'Reduce, resize and filter' } },
    filter: { control: 'boolean', description: 'Embudo para filtrar por estado.', table: { category: 'Reduce, resize and filter' } },
    columnPicker: { control: 'boolean', description: 'Botón Columns para ocultar columnas. Full name no se puede ocultar.', table: { category: 'Reduce, resize and filter' } },
    resizable: { control: 'boolean', description: 'Arrastrá el borde de una columna para achicarla o ensancharla. Doble clic la devuelve a su ancho.', table: { category: 'Reduce, resize and filter' } },
    expandable: { control: 'boolean', description: 'Clic en la fila despliega el detalle, con Expand / Collapse all.', table: { category: 'Reduce, resize and filter' } },
    reorderable: { control: 'boolean', description: 'Manija para reordenar filas arrastrando (o con ↑ ↓), como los planes de Insurance.' },
    selectable: { control: 'boolean', description: 'Casilla por fila y "seleccionar todo".' },
    rowActions: { control: 'boolean', description: 'Menú ⋮ con Edit y Delete en cada fila.' },
    primaryAction: { control: 'boolean', description: 'Botón New patient a la derecha de la barra.' },
    clickableRows: { control: 'boolean', description: 'La fila entera abre el detalle (sin expandir).' },
    density: { control: 'inline-radio', options: ['regular', 'compact'], description: 'regular 56px por fila · compact 44px. La fila crece si una celda tiene dos líneas.' },
    pageSize: { control: 'inline-radio', options: [5, 10, 20], description: 'Filas por página.' },
    itemLabel: { control: 'text', description: 'Qué se cuenta en el pie.' },
    state: { control: 'inline-radio', options: ['ready', 'loading', 'error', 'disabled'], description: 'loading: filas grises · error: no se pudo cargar, con Try again · disabled: toda la tabla de sólo lectura.', table: { category: 'States' } },
    disabledRows: { control: 'boolean', description: 'Los pacientes Inactive no se pueden elegir ni accionar.', table: { category: 'States' } },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

const FILTRO_ESTADO = { label: 'Filter by status', options: ['Active', 'Inactive', 'Pending'], match: (p: Paciente, sel: string[]) => sel.includes(p.estado) }
const BUSQUEDA = { placeholder: 'Search patients', match: (p: Paciente, q: string) => \`\${p.nombre} \${p.email}\`.toLowerCase().includes(q.toLowerCase()) }

function Detalle({ p }: { p: Paciente }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
      {[['Email', p.email], ['Birthday', p.nacimiento], ['Provider', p.provider], ['Last visit', p.visita]].map(([k, v]) => (
        <div key={k}><dt className="text-[11px] font-semibold text-ink-muted">{k}</dt><dd className="text-ink">{v}</dd></div>
      ))}
    </dl>
  )
}

function Armada({ columns, rows, search, filter, columnPicker, resizable, expandable, reorderable, selectable, rowActions, primaryAction, clickableRows, density, pageSize, itemLabel, state = 'ready', disabledRows = false }: Args) {
  const [reintentos, setReintentos] = useState(0)
  const [abierta, setAbierta] = useState<string | null>(null)
  const [orden, setOrden] = useState(PACIENTES)
  const reordenar = (origen: Paciente, destino: Paciente) =>
    setOrden((prev) => {
      const de = prev.indexOf(origen)
      const a = prev.indexOf(destino)
      const copia = prev.filter((p) => p !== origen)
      copia.splice(copia.indexOf(destino) + (de < a ? 1 : 0), 0, origen)
      return copia
    })
  /* En el orden lógico, no en el orden en que se tildaron. */
  const cols = NOMBRES_COLUMNAS.filter((c) => columns.includes(c)).map((c) => COLUMNAS[c]!)
  return (
    <div className="flex flex-col gap-3">
      <DataTable
        key={\`\${pageSize}-\${rows}-\${cols.map((c) => c.key).join()}\`}
        columns={cols.length ? cols : [COLUMNAS.Name!]}
        rows={orden.slice(0, rows)}
        rowKey={(p) => p.id}
        rowLabel={(p) => p.nombre}
        search={search ? BUSQUEDA : undefined}
        filter={filter ? FILTRO_ESTADO : undefined}
        columnPicker={columnPicker}
        resizable={resizable}
        rowDetail={expandable ? (p) => <Detalle p={p} /> : undefined}
        reorder={reorderable ? { onReorder: reordenar } : undefined}
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
        actions={primaryAction ? <Button size="md"><Plus />New patient</Button> : undefined}
        loading={state === 'loading'}
        disabled={state === 'disabled'}
        error={state === 'error' ? { title: 'We couldn’t load the patients', detail: \`The server did not answer. Check your connection and try again.\${reintentos ? \` (\${reintentos} retries)\` : ''}\`, onRetry: () => setReintentos((n) => n + 1) } : undefined}
        isRowDisabled={disabledRows ? (p) => p.estado === 'Inactive' : undefined}
      />
      {abierta && <p className="text-[12px] text-ink-muted">Row clicked: <b className="text-ink">{abierta}</b> (in the app this opens the detail).</p>}
    </div>
  )
}

const BASE: Args = {
  columns: ['Name', 'Email', 'Status'], rows: 6,
  search: false, filter: false, columnPicker: false, resizable: false, expandable: false, reorderable: false,
  selectable: false, rowActions: false, primaryAction: false, clickableRows: false,
  density: 'regular', pageSize: 10, itemLabel: 'patients', state: 'ready', disabledRows: false,
}

/* Armá la tabla desde Controls. */
export const Playground: Story = { render: (args) => <Armada {...args} /> }

/* Las funciones del Ledger, todas prendidas. */
export const ReduceResizeAndFilter: Story = {
  name: 'Reduce, resize and filter',
  parameters: { controls: { include: ['search', 'filter', 'columnPicker', 'resizable', 'expandable'] } },
  args: { columns: ['Name', 'Email', 'Birthday', 'Provider', 'Status', 'Last visit', 'Balance'], search: true, filter: true, columnPicker: true, resizable: true, expandable: true },
  render: (args) => (
    <Lienzo className="max-w-none">
      <ul className="flex flex-col gap-1 text-[13px] text-ink-medium">
        <li><b className="text-ink">Reduce:</b> <i>Columns</i> oculta las columnas que no hacen falta; el buscador y el embudo reducen las filas. El pie dice cuántas quedan de cuántas.</li>
        <li><b className="text-ink">Resize:</b> pasá el mouse por el encabezado y arrastrá el borde de una columna. Doble clic la devuelve a su ancho; <i>Reset column widths</i> las devuelve todas.</li>
        <li><b className="text-ink">Expand:</b> clic en una fila despliega su detalle; <i>Collapse all</i> y <i>Expand all</i> aparecen apenas abrís una.</li>
      </ul>
      <Armada {...args} />
    </Lienzo>
  ),
}

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
    texto: 'Selección, menú de fila, acción principal y estado vacío, sólo si la pantalla los usa.',
    codigo: \`<DataTable
  columns={columns} rows={patients} rowKey={(p) => p.id} itemLabel="patients"
  selectable
  rowActions={(p) => <DropdownMenuItem onSelect={() => edit(p)}>Edit</DropdownMenuItem>}
  actions={<Button size="md"><Plus />New patient</Button>}
  empty={{ title: 'No patients yet', detail: 'Add your first patient.' }}
/>\`,
  },
  {
    titulo: 'Let people reduce, resize and filter',
    texto: 'Las funciones del Ledger, cuando la tabla tiene muchas columnas o muchas filas: buscar, filtrar, ocultar columnas, arrastrar anchos y desplegar el detalle de una fila.',
    codigo: \`<DataTable
  columns={columns} rows={patients} rowKey={(p) => p.id}
  search={{ placeholder: 'Search patients', match: (p, q) => p.name.toLowerCase().includes(q.toLowerCase()) }}
  filter={{ label: 'Filter by status', options: ['Active', 'Inactive'], match: (p, sel) => sel.includes(p.status) }}
  columnPicker
  resizable
  rowDetail={(p) => <PatientSummary patient={p} />}
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
        <Armada {...BASE} columns={['Name', 'Email', 'Status', 'Balance']} rows={12} search filter columnPicker resizable selectable rowActions primaryAction pageSize={5} />
      </Bloque>
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Loading" nota="Mientras llegan los datos: filas grises con la forma de las columnas, sin pie. La barra y las casillas no se pueden tocar.">
        <Armada {...BASE} selectable search state="loading" />
      </Bloque>
      <Bloque titulo="Error" nota="No se pudieron traer los datos: qué pasó, qué hacer y Try again. No se muestran filas viejas como si estuvieran al día.">
        <Armada {...BASE} search state="error" />
      </Bloque>
      <Bloque titulo="Disabled" nota="Toda la tabla de sólo lectura, por ejemplo sin permiso de edición o mientras se guarda: se ve al 60% y nada responde.">
        <Armada {...BASE} rows={4} selectable rowActions search state="disabled" />
      </Bloque>
      <Bloque titulo="Disabled rows" nota="Filas que no se pueden elegir ni accionar (acá, los pacientes Inactive): texto atenuado, casilla deshabilitada y sin menú. Seleccionar todo las saltea.">
        <Armada {...BASE} rows={8} selectable rowActions disabledRows />
      </Bloque>
      <Bloque titulo="Empty" nota="Sin filas: el estado vacío dice por qué y qué hacer. No hay pie.">
        <Armada {...BASE} rows={0} />
      </Bloque>
      <Bloque titulo="No results" nota="Hay datos pero la búsqueda o el filtro no encuentra nada: se dice eso, no “no hay datos”.">
        <SinResultados />
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

/* Búsqueda sin resultados: la tabla con el buscador ya cargado. */
function SinResultados() {
  return (
    <DataTable
      columns={[COLUMNAS.Name!, COLUMNAS.Email!, COLUMNAS.Status!]}
      rows={PACIENTES.slice(0, 6).filter((p) => p.nombre.includes('zzz'))}
      rowKey={(p) => p.id}
      itemLabel="patients"
      empty={{ title: 'No patients found', detail: 'Try a different name or email.' }}
    />
  )
}

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Parts" nota="Cada parte con su alto y sus colores, tomados de data-table.tsx y src/index.css.">
        <Tabla encabezado={['Part', 'Height', 'Fill', 'Text', 'Divider']} minimo={760}>
          <tr><td className="font-semibold">Container</td><td>—</td><td><Token nombre="white" /></td><td>—</td><td><Token nombre="line-row" /> · radius 8px</td></tr>
          <tr><td className="font-semibold">Header row</td><td className="tabular-nums">44px</td><td><Token nombre="surface-alt" /></td><td><Token nombre="ink-muted" /> 11px Semibold</td><td>—</td></tr>
          <tr><td className="font-semibold">Row</td><td className="tabular-nums">56px · 44px compact (grows if a cell has two lines)</td><td><Token nombre="white" /></td><td><Token nombre="ink-soft" /> 13px</td><td><Token nombre="line-row" /></td></tr>
          <tr><td className="font-semibold">Selected row</td><td>—</td><td><Token nombre="dash-count-bg" /></td><td>—</td><td>—</td></tr>
          <tr><td className="font-semibold">Footer</td><td className="tabular-nums">52px</td><td><Token nombre="white" /></td><td><Token nombre="ink-muted" /> 12px Semibold</td><td><Token nombre="line-row" /></td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>One column stretches (the one without a width); the rest have a fixed width so header and rows line up.</li>
          <li>Amounts align right with tabular numbers; text that does not fit ends in “…” and shows in full on hover.</li>
          <li>If the columns do not fit, the table scrolls inside its box: the page never scrolls sideways.</li>
          <li>Above the table, never inside it: search and filter on the left; Columns and the main action on the right.</li>
          <li>Turn on Columns and resizable columns when the table has more columns than fit; search and filter when it has more rows than one page.</li>
        </ul>
      </Bloque>
    </Lienzo>
  ),
}
`})))()}export{n,i as r,r as t};