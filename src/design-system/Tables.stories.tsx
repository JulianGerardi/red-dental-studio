import type { Meta, StoryObj } from '@storybook/react-vite'
import { Codigo, Page, Seccion } from './Page'
import { PaginaDeRecetas, type Receta } from './Recipes'

/* Todas las tablas de la app, con lo que el código dice de cada una: qué
   columnas tiene y qué funciones (selección, menú de fila, paginación,
   redimensionado…). Las columnas y las funciones se leen del archivo fuente
   cada vez; la vista en vivo es la pantalla real montada en un iframe. */
const fuentes = import.meta.glob('/src/**/*.tsx', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

type Tabla = { nombre: string; archivo: string; historia: string; nota: string }

const TABLAS: Tabla[] = [
  { nombre: 'Patients list', archivo: 'components/patients/PatientsTable.tsx', historia: 'components-patients-patientstable--default', nota: 'Filas con avatar + nombre que lleva al paciente, pastilla de estado y menú de fila. Anchos fijos por columna; el sobrante se reparte.' },
  { nombre: 'Team (Settings)', archivo: 'pages/settings/Employees.tsx', historia: 'pages--settings-team', nota: 'Selección múltiple, borrado con Undo en el toast y buscador.' },
  { nombre: 'Accounts (Settings)', archivo: 'pages/settings/Accounts.tsx', historia: 'pages--settings-accounts', nota: 'Filtro por estado en pestañas y once columnas; la de Owners es la elástica.' },
  { nombre: 'Locations (Settings)', archivo: 'pages/settings/Locations.tsx', historia: 'pages--settings-locations', nota: 'Fila con nombre, dirección, empleados y salas; menú de fila y borrado con Undo.' },
  { nombre: 'Insurance (Patient)', archivo: 'pages/patients/Insurance.tsx', historia: 'pages--patient-insurance', nota: 'Una fila por plan: orden, carrier, suscriptor, período de cobertura y prioridad, con pastilla de estado.' },
  { nombre: 'Ledger (Patient)', archivo: 'pages/patients/Ledger.tsx', historia: 'pages--patient-ledger', nota: 'La más completa: columnas configurables (Columns), anchos que se arrastran, filas que se expanden, filtros, pestañas de vista y paginación.' },
  { nombre: 'Ledger allocation', archivo: 'components/patients/ledger/LedgerAllocationTable.tsx', historia: 'components-ledger-ledgerallocationtable--default', nota: 'La tabla de aplicación de pagos: mismas columnas redimensionables y filas expandibles que el Ledger.' },
  { nombre: 'Documents (Patient)', archivo: 'pages/patients/Documents.tsx', historia: 'pages--patient-documents', nota: 'Nombre del documento y pastilla de firma.' },
  { nombre: 'Recent activity (Billing)', archivo: 'pages/Billing.tsx', historia: 'pages--billing', nota: 'Fecha, tipo, descripción, provider y monto; el monto va alineado a la derecha.' },
  { nombre: 'Problem list (Clinical)', archivo: 'components/clinical/ProblemList.tsx', historia: 'components-clinical-problemlist--default', nota: '<table> real con buscador, paginación y menú de acciones.' },
  { nombre: 'Lab orders (Clinical)', archivo: 'components/clinical/LabOrderPanel.tsx', historia: 'components-clinical-laborderpanel--default', nota: '<table> real con filtros, pastilla de estado y menú de acciones.' },
  { nombre: 'Procedures (Treatment plan)', archivo: 'components/clinical/TreatmentPlanSection.tsx', historia: 'components-clinical-treatmentplansection--default', nota: '<table> real de procedimientos con selección, favoritos y acciones por caso.' },
  { nombre: 'Roles (Settings)', archivo: 'components/settings/RolesLocation.tsx', historia: 'components-settings-roleslocation--default', nota: 'Roles asignados a un empleado, con las sedes de cada uno.' },
  { nombre: 'Patient overview', archivo: 'pages/PatientDetail.tsx', historia: 'pages--patient-overview', nota: 'Las tablas de actividad del dashboard del paciente.' },
]

const FUNCIONES: [string, RegExp][] = [
  ['Selection', /Checkbox/],
  ['Row menu', /RowActionsMenu|MoreVertical/],
  ['Pagination', /Pagination|Showing \d/],
  ['Empty state', /EmptyState/],
  ['Undo on delete', /label: 'Undo'/],
  ['Search', /placeholder="Search|SearchButton/],
  ['Filters', /FilterMenu|Filter\b/],
  ['Status pills', /<Pill|StatusPill/],
  ['Column picker', /ColumnPicker/],
  ['Resizable columns', /useAnchoColumnas|ManijaResize/],
  ['Expandable rows', /Expand all|expandidas/],
  ['Tabs', /<Tabs\b/],
  ['Native <table>', /<table/],
]

function columnasDe(texto: string): string[] {
  const salida = new Set<string>()
  for (const m of texto.matchAll(/<span className=\{[^}]*COLS\.\w+[^}]*\}>([A-Z][A-Za-z &/]{1,28})<\/span>/g)) salida.add(m[1].trim())
  for (const m of texto.matchAll(/<HeadCell[^>]*>([A-Z][A-Za-z &/]{1,28})<\/HeadCell>/g)) salida.add(m[1].trim())
  for (const m of texto.matchAll(/<th[^>]*>([A-Z][A-Za-z &/]{1,28})<\/th>/g)) salida.add(m[1].trim())
  for (const m of texto.matchAll(/const COLUMNAS(?::[^=]+)? = \[([^\]]+)\]/g)) for (const n of m[1].matchAll(/'([^']+)'/g)) salida.add(n[1])
  for (const m of texto.matchAll(/id: '\w+', label: '([A-Z][A-Za-z &/]{1,28})'/g)) salida.add(m[1])
  for (const m of texto.matchAll(/<span className="(?:flex-1|w-\[[\d]+px\][^"]*)">([A-Z][A-Za-z &/]{1,28})<\/span>/g)) salida.add(m[1].trim())
  return [...salida]
}

const meta = {
  title: 'Patterns/Tables',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', options: { showPanel: false } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const familiaTabla = (r: Receta) => (r.tag === 'table' ? 'Table' : r.tag === 'th' ? 'Header cell' : 'Data cell')

export const Tablas: Story = {
  name: 'Tables',
  render: () => (
    <Page
      titulo="Tables"
      bajada={`Las ${TABLAS.length} tablas de la app. Hay dos formas de construirlas: <table> real (Clinical) y filas de <div> con anchos por columna (todo lo demás). Comparten anatomía: barra de herramientas arriba (buscador, filtros, acción principal), fila de encabezado, filas con celdas de texto, pastilla, avatar, casilla o menú, y pie con paginación o estado vacío.`}
    >
      <Seccion titulo="Anatomy">
        <div className="grid grid-cols-1 gap-3 text-[13px] text-ink-medium sm:grid-cols-2">
          <p><b className="text-ink">Container.</b> <Codigo>rounded-lg border border-line-row bg-white</Codigo>, con scroll horizontal propio (<Codigo>overflow-x-auto</Codigo>) y un ancho mínimo para que las columnas no se aplasten.</p>
          <p><b className="text-ink">Header row.</b> Fondo <Codigo>surface-alt</Codigo>, texto <Codigo>11px semibold ink-muted</Codigo>, sin mayúsculas. Cada columna toma su ancho de una constante <Codigo>COLS</Codigo>; encabezado y filas la comparten, así quedan alineados.</p>
          <p><b className="text-ink">Rows.</b> Texto <Codigo>13px ink-soft</Codigo>, divisor <Codigo>border-t line-row</Codigo>. La fila seleccionada toma <Codigo>bg-dash-count-bg</Codigo>. El nombre es un link azul en negrita con subrayado al pasar el mouse.</p>
          <p><b className="text-ink">Cells.</b> Avatar con iniciales + nombre, texto truncado, <Codigo>Pill</Codigo> para el estado, <Codigo>Checkbox</Codigo> para la selección y <Codigo>RowActionsMenu</Codigo> para las acciones.</p>
          <p><b className="text-ink">Footer.</b> Barra de <Codigo>52px</Codigo> con “Showing X to Y of N” y <Codigo>Pagination</Codigo>. Sin filas se muestra <Codigo>EmptyState</Codigo> con el motivo (sin datos, o búsqueda sin resultados).</p>
          <p><b className="text-ink">Toolbar.</b> Arriba de la tabla: buscador con lupa, filtros y la acción principal (Patterns / Buttons, Primary).</p>
        </div>
      </Seccion>

      <Seccion titulo="Index" nota="Columnas y funciones leídas del archivo fuente de cada tabla.">
        <div className="flex flex-col gap-6">
          {TABLAS.map((t) => {
            const texto = fuentes[`/src/${t.archivo}`] ?? ''
            const funciones = FUNCIONES.filter(([, re]) => re.test(texto)).map(([n]) => n)
            const columnas = columnasDe(texto)
            return (
              <article key={t.archivo} className="overflow-hidden rounded-lg border border-line bg-white">
                <header className="flex flex-col gap-2 border-b border-line-soft p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-[14px] font-semibold">{t.nombre}</h3>
                    <Codigo>src/{t.archivo}</Codigo>
                  </div>
                  <p className="max-w-[80ch] text-[12.5px] text-ink-medium">{t.nota}</p>
                  {columnas.length > 0 && (
                    <p className="flex flex-wrap items-center gap-1.5 text-[11.5px]">
                      <span className="text-ink-muted">Columns:</span>
                      {columnas.map((c) => <span key={c} className="rounded bg-surface-muted px-1.5 py-0.5 text-ink-soft">{c}</span>)}
                    </p>
                  )}
                  <p className="flex flex-wrap items-center gap-1.5 text-[11.5px]">
                    <span className="text-ink-muted">Features:</span>
                    {funciones.length ? funciones.map((f) => <span key={f} className="rounded bg-dash-count-bg px-1.5 py-0.5 text-dash-blue-hover">{f}</span>) : <span className="text-ink-faint">none detected</span>}
                  </p>
                </header>
                <iframe title={t.nombre} loading="lazy" src={`iframe.html?id=${t.historia}&viewMode=story`} className="h-[520px] w-full border-0 bg-page-background" />
              </article>
            )
          })}
        </div>
      </Seccion>

      <Seccion titulo="Cell recipes found in code" nota="Los <table>, <th> y <td> con clases propias. Las tablas de <div> no aparecen acá: sus celdas usan las recetas de texto y pastilla.">
        <PaginaDeRecetas tipo="table" familiaDe={familiaTabla} orden={['Table', 'Header cell', 'Data cell']} estados={false} />
      </Seccion>
    </Page>
  ),
}
