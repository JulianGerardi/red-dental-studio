import type { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Plus, Search } from 'lucide-react'
import { Breadcrumb, type Miga } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { SearchButton } from '@/components/ui/search-button'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { Bloque, Lienzo, Tabla, useMedidas } from './kit'
import { cn } from '@/lib/utils'

/* El encabezado de una pantalla: rastro, título, bajada, acción principal y
   barra de búsqueda y filtros. Se arma con las piezas reales de la app
   (Breadcrumb, SettingsPageHeader, Button, SearchButton). */

type Args = {
  breadcrumb: string
  title: string
  description: string
  action: boolean
  actionLabel: string
  search: boolean
  searchButton: boolean
  filter: boolean
}

const meta = {
  title: 'Elements/Page header',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          'El encabezado de las pantallas de la app. De arriba hacia abajo: **rastro** (dónde estás, con links para volver) · **título** · **bajada** (qué se hace acá) · **acción principal** a la derecha del título · **barra** con buscador, botón Search y filtros.',
          '',
          'Se arma con `Breadcrumb` (`@/components/ui/breadcrumb`) y `SettingsPageHeader` (`@/components/settings/SettingsPageHeader`), que ya usan Accounts, Employees, Locations y Ledger options.',
          '',
          '**Probalo:** en *Playground* cambiá cada parte desde *Controls*.',
        ].join('\n'),
      },
    },
  },
  args: {
    breadcrumb: 'Settings > Accounts',
    title: 'Accounts overview',
    description: 'View and manage all accounts across the platform.',
    action: true,
    actionLabel: 'New Account',
    search: true,
    searchButton: true,
    filter: true,
  },
  argTypes: {
    breadcrumb: { control: 'text', description: 'Tramos separados por ">". El último es la pantalla actual. Vacío = sin rastro.' },
    title: { control: 'text' },
    description: { control: 'text', description: 'Una línea: qué se hace en esta pantalla.' },
    action: { control: 'boolean', description: 'Acción principal a la derecha del título.' },
    actionLabel: { control: 'text' },
    search: { control: 'boolean', description: 'Buscador en la barra.' },
    searchButton: { control: 'boolean', description: 'Botón Search al lado del buscador.' },
    filter: { control: 'boolean', description: 'Filtro por estado (select).' },
  },
  decorators: [(Story) => <div className="bg-page-background min-h-svh"><Story /></div>],
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

const migas = (texto: string): Miga[] => {
  const partes = texto.split('>').map((p) => p.trim()).filter(Boolean)
  return partes.map((label, i) => ({ label, to: i < partes.length - 1 ? '#' : undefined }))
}

const Buscador = () => (
  <div className="relative min-w-0 flex-1 sm:max-w-[300px]">
    <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
    <input
      placeholder="Search..."
      aria-label="Search"
      className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none"
    />
  </div>
)

const Filtro = () => (
  <select aria-label="Filter by status" className="focus:border-dash-blue h-9 shrink-0 rounded-md border border-line bg-white px-3 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] focus:outline-none">
    {['All', 'Active', 'Draft', 'Pending'].map((f) => <option key={f}>{f}</option>)}
  </select>
)

/* Mismo margen que las pantallas: el rastro lo pone el layout de Settings
   arriba y el encabezado va debajo. */
function Encabezado({ breadcrumb, title, description, action, actionLabel, search, searchButton, filter }: Args) {
  const barra = search || searchButton || filter
  return (
    <div>
      {breadcrumb.trim() && <div className="px-4 pt-5 sm:px-8"><Breadcrumb items={migas(breadcrumb)} /></div>}
      <div className="px-4 py-6 sm:px-8">
        <SettingsPageHeader
          titulo={title}
          bajada={description}
          accion={action ? <Button><Plus /> {actionLabel}</Button> : undefined}
        >
          {barra ? (
            <>
              {search && <Buscador />}
              {searchButton && <SearchButton onClick={() => {}} className="h-9" />}
              {filter && <Filtro />}
            </>
          ) : undefined}
        </SettingsPageHeader>
      </div>
    </div>
  )
}

/* Cambiá cada parte desde Controls. */
export const Playground: Story = { render: (args) => <Encabezado {...args} /> }

/* Cada parte, numerada en el orden en que se lee. */
function Marca({ n, children, className }: { n: number; children: ReactNode; className?: string }) {
  return (
    <div className={cn('relative outline outline-1 outline-dashed outline-dash-blue/50 -outline-offset-2', className)}>
      <span className="bg-dash-blue absolute -top-2.5 -left-2.5 z-10 flex size-5 items-center justify-center rounded-full text-[10px] font-bold text-white">{n}</span>
      {children}
    </div>
  )
}

const PARTES = [
  ['Breadcrumb', 'Dónde estás. Cada tramo menos el último lleva de vuelta. En Settings lo pone el layout: la pantalla no lo dibuja.'],
  ['Title', 'El nombre de la pantalla. 24px Bold.'],
  ['Description', 'Una línea que dice qué se hace acá. 14px, ink-muted.'],
  ['Primary action', 'Una sola, la más importante, alineada con el título. Button primary lg.'],
  ['Toolbar', 'Buscador (hasta 300px), botón Search y filtros, 20px debajo de la bajada. La tabla o el contenido van 16px más abajo.'],
] as const

export const Anatomy: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="px-4 py-6 sm:px-8">
      <div className="flex flex-col gap-5">
        <Marca n={1} className="w-fit"><Breadcrumb items={migas('Settings > Accounts')} /></Marca>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-col gap-2">
            <Marca n={2} className="w-fit"><h1 className="text-2xl font-bold text-ink">Accounts overview</h1></Marca>
            <Marca n={3} className="w-fit"><p className="text-sm text-ink-muted">View and manage all accounts across the platform.</p></Marca>
          </div>
          <Marca n={4}><Button><Plus /> New Account</Button></Marca>
        </div>
        <Marca n={5} className="w-fit">
          <div className="flex flex-wrap items-center gap-3 p-1"><Buscador /><SearchButton onClick={() => {}} className="h-9" /><Filtro /></div>
        </Marca>
      </div>
      <ol className="mt-8 flex flex-col gap-2 rounded-lg border border-line-row bg-white p-4 text-[13px]">
        {PARTES.map(([nombre, texto], i) => (
          <li key={nombre} className="flex gap-3">
            <span className="bg-dash-blue flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white">{i + 1}</span>
            <span><b className="text-ink">{nombre}.</b> <span className="text-ink-medium">{texto}</span></span>
          </li>
        ))}
      </ol>
    </div>
  ),
}

/* ── Encabezados en la app, leídos del código ──────────────────────────── */
const fuentes = import.meta.glob('/src/pages/**/*.tsx', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

type Fila = { pantalla: string; archivo: string; titulo: string; como: 'SettingsPageHeader' | 'PageTitle' | 'h1'; tamano: string; rastro: string; accion: boolean; buscador: boolean }

const PX: Record<string, number> = { xs: 12, sm: 14, base: 16, lg: 18, xl: 20, '2xl': 24, '3xl': 30, '4xl': 36 }
const PESO: Record<string, string> = { bold: 'Bold', semibold: 'Semibold', medium: 'Medium' }
/* "text-2xl font-bold" → "24px Bold". Si hay variantes (sm:text-…), la base. */
function tamanoDe(clases: string) {
  const base = clases.split(/\s+/).filter((c) => !c.includes(':'))
  const t = base.map((c) => c.match(/^text-(xs|sm|base|lg|xl|2xl|3xl|4xl)$/)?.[1] ?? c.match(/^text-\[(\d+)px\]$/)?.[1]).find(Boolean)
  const w = base.map((c) => c.match(/^font-(bold|semibold|medium)$/)?.[1]).find(Boolean)
  if (!t) return '—'
  return `${PX[t] ?? t}px${w ? ` ${PESO[w]}` : ''}`
}

/* Pantallas sueltas, fuera del marco de la app: tienen su propio encabezado. */
const SUELTAS = /^(Login|ForgotPassword|NotFound|UnderConstruction)$/

function detectar(): Fila[] {
  const filas: Fila[] = []
  for (const [ruta, texto] of Object.entries(fuentes)) {
    if (ruta.includes('.stories.')) continue
    const archivo = ruta.replace('/src/', '')
    const pantalla = archivo.replace(/^pages\//, '').replace(/\.tsx$/, '')
    if (SUELTAS.test(pantalla)) continue
    const settings = archivo.startsWith('pages/settings/')
    const rastro = settings ? 'Settings layout' : /ChevronDown className="size-\[15px\]"|<Link to="\/patients" className/.test(texto) ? 'Module link' : '—'
    const accion = /accion=\{|bg-dash-blue[^"]*text-white|<Button[\s>]|buttonClasses\(/.test(texto)
    const buscador = /placeholder="Search/.test(texto)
    const sph = texto.match(/<SettingsPageHeader[\s\S]*?titulo="([^"]+)"/)
    if (sph) { filas.push({ pantalla, archivo, titulo: sph[1]!, como: 'SettingsPageHeader', tamano: '24px Bold', rastro, accion, buscador }); continue }
    const pt = texto.match(/<PageTitle( size="lg")?>([^<{]+)</)
    if (pt) { filas.push({ pantalla, archivo, titulo: pt[2]!.trim().replace(/&amp;/g, '&'), como: 'PageTitle', tamano: pt[1] ? '24px Bold' : '20px Semibold', rastro, accion, buscador }); continue }
    const h1 = texto.match(/<h1 className="([^"]*)"[^>]*>([^<{]+)</)
    if (h1) filas.push({ pantalla, archivo, titulo: h1[2]!.trim(), como: 'h1', tamano: tamanoDe(h1[1]!), rastro, accion, buscador })
  }
  return filas.sort((a, b) => a.como.localeCompare(b.como) || a.pantalla.localeCompare(b.pantalla))
}

export const InTheApp: Story = {
  name: 'Headers in the app',
  parameters: { controls: { disable: true } },
  render: () => {
    const filas = detectar()
    const tamanos = [...new Set(filas.map((f) => f.tamano))]
    return (
      <div className="px-4 py-6 sm:px-8">
        <Lienzo className="max-w-none">
          <Bloque nota={`Cada pantalla de la app con su encabezado, detectado en el código (Login, Forgot password y las páginas de error quedan afuera: tienen el suyo). Hoy conviven ${tamanos.length} tamaños de título: ${tamanos.join(', ')}. El estándar es SettingsPageHeader, 24px Bold; las filas en naranja se apartan.`}>
            <Tabla encabezado={['Screen', 'Title', 'Built with', 'Title size', 'Breadcrumb', 'Action', 'Search']} minimo={900}>
              {filas.map((f) => (
                <tr key={f.archivo} className={f.tamano !== '24px Bold' ? 'bg-warn-bg' : ''}>
                  <td className="font-mono text-[11.5px]">{f.pantalla}</td>
                  <td className="font-semibold">{f.titulo}</td>
                  <td>{f.como}</td>
                  <td className="tabular-nums">{f.tamano}</td>
                  <td className="text-ink-muted">{f.rastro}</td>
                  <td>{f.accion ? 'Yes' : '—'}</td>
                  <td>{f.buscador ? 'Yes' : '—'}</td>
                </tr>
              ))}
            </Tabla>
          </Bloque>
        </Lienzo>
      </div>
    )
  },
}

function Medida({ nombre, children, selector }: { nombre: string; children: ReactNode; selector: string }) {
  const { ref, m } = useMedidas(selector)
  return (
    <tr>
      <td className="font-semibold">{nombre}</td>
      <td><div ref={ref}>{children}</div></td>
      <td className="tabular-nums">{m?.texto} · {m?.peso}</td>
      <td className="tabular-nums">{m?.alto}</td>
    </tr>
  )
}

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="px-4 py-6 sm:px-8">
      <Lienzo>
        <Bloque titulo="Type" nota="Medido sobre el encabezado dibujado.">
          <Tabla encabezado={['Part', 'Sample', 'Text', 'Height']} minimo={640}>
            <Medida nombre="Breadcrumb" selector="nav"><Breadcrumb items={migas('Settings > Accounts')} /></Medida>
            <Medida nombre="Title" selector="h1"><SettingsPageHeader titulo="Accounts" bajada="View and manage all accounts." /></Medida>
            <Medida nombre="Description" selector="p"><SettingsPageHeader titulo="Accounts" bajada="View and manage all accounts." /></Medida>
          </Tabla>
        </Bloque>
        <Bloque titulo="Spacing">
          <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
            <li>Page padding: 16px on phones, 32px from 640px up; 24px top and bottom.</li>
            <li>Breadcrumb 20px from the top; the title block right below it.</li>
            <li>Description 4px under the title; toolbar 20px under the description; content 16px under the toolbar.</li>
            <li>Toolbar items 12px apart; on narrow screens they wrap to the next line.</li>
          </ul>
        </Bloque>
      </Lienzo>
    </div>
  ),
}
