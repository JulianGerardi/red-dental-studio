import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { NavigationPreview, type NavigationPreviewState } from '@/components/layout/navigation-preview'
import { Sidebar } from '@/components/layout/Sidebar'
import { HelpProvider } from '@/components/help/HelpProvider'
import { Bloque, Forzar, Tabla, Token, medidasDe, type Medidas as MedidasDe } from './kit'
import { PantallaReal } from './pantalla'

/* El menú lateral (rail): el Playground lo monta sobre la app entera, con la
   barra de arriba y la pantalla de la ruta elegida; Parts, States y Specs lo
   muestran solo, con su propio router. */

const RUTAS = {
  Dashboard: '/',
  Patients: '/patients',
  Scheduling: '/scheduling',
  Billing: '/billing',
  Help: '/help',
  'Settings / Accounts': '/settings/accounts',
} as const

type Abierto = 'nothing' | 'item tooltip' | 'billing menu' | 'settings menu'

type Args = {
  screen: keyof typeof RUTAS
  expanded: boolean
  open: Abierto
}

const meta = {
  title: 'Elements/Navigation',
  parameters: {
    layout: 'fullscreen',
    router: false,
    docs: {
      decisionsFrom: 'components/layout/Sidebar.tsx',
      description: {
        component: [
          '**Menú lateral (rail)** (`Sidebar`, dentro de `AppShell`). Colapsado mide 58px y muestra sólo íconos; expandido mide 176px con los nombres. Se abre y se cierra con el botón de la barra de arriba, a la izquierda del saludo.',
          '',
          '- **Colapsado:** al pasar el mouse por un ícono aparece su nombre en un tooltip a la derecha.',
          '- **Expandido:** no hay tooltips, el nombre ya se ve.',
          '- **Ítem activo:** azul con texto blanco, según la pantalla en la que estás.',
          '- **Settings:** queda abajo, en el mismo lugar colapsado y expandido. Al pasar el mouse abre un menú flotante con sus secciones.',
          '- **Billing:** al pasar el mouse (o con su flecha) abre al costado un menú con Billing, Fee Schedules, Carriers y Coverage Table. Queda activo en Billing y en esas tres tablas.',
          '- **En el celular:** el menú es un panel de 234px que tapa el contenido y se cierra solo al elegir una pantalla (ver *On each device*).',
          '',
          'El menú del paciente está en *Elements / Patient menu*.',
          '',
          '**Probalo:** en *Playground* elegí la pantalla y usá el botón de la barra de arriba; pasá el mouse por los íconos, por Billing y por Settings. Con *open* dejás abierto un tooltip o un menú.',
        ].join('\n'),
      },
    },
  },
  args: { screen: 'Dashboard', expanded: false, open: 'nothing' },
  argTypes: {
    screen: { control: 'select', options: Object.keys(RUTAS), description: 'Pantalla abierta: define el ítem activo.' },
    expanded: { control: 'boolean', description: 'Cómo arranca el menú: 176px con nombres o 58px con íconos. En la app se cambia con el botón de la barra de arriba.' },
    open: {
      control: 'select',
      options: ['nothing', 'item tooltip', 'billing menu', 'settings menu'],
      description: 'Deja abierto lo que en la app se abre con el mouse. El tooltip sólo existe colapsado: al elegirlo, el menú se colapsa.',
      table: { category: 'Preview' },
    },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

function previewDe(open: Abierto): NavigationPreviewState {
  switch (open) {
    case 'item tooltip': return { tooltip: 'Scheduling' }
    case 'billing menu': return { billingMenu: true }
    case 'settings menu': return { settingsMenu: true }
    default: return {}
  }
}

/* Elegí la pantalla, colapsá o expandí con el botón de arriba y dejá abierto un tooltip o un menú. */
export const Playground: Story = {
  parameters: { docs: { story: { inline: false, iframeHeight: 720 } } },
  render: ({ screen, expanded, open }) => {
    const expandido = open === 'item tooltip' ? false : expanded
    return (
      <NavigationPreview.Provider value={{ ...previewDe(open), expanded: expandido }}>
        <PantallaReal key={`${screen}-${expandido}`} ruta={RUTAS[screen]} />
      </NavigationPreview.Provider>
    )
  },
}

/* El rail solo, con su router y estados fijos sólo para esta instancia. El alto
   va fijo (en la app es el de la ventana) y sin z-40, que en la app lo sube
   sobre el contenido y acá lo pondría encima de la barra del sitio. */
function Rail({ ruta = '/', expanded = true, preview = {}, alto = 640 }: { ruta?: string; expanded?: boolean; preview?: NavigationPreviewState; alto?: number }) {
  return (
    <MemoryRouter initialEntries={[ruta]}>
      <HelpProvider>
        <NavigationPreview.Provider value={preview}>
          <div className="flex [&_aside]:z-0 [&_aside]:h-(--alto)" style={{ '--alto': `${alto}px` } as React.CSSProperties}>
            <Sidebar expanded={expanded} />
          </div>
        </NavigationPreview.Provider>
      </HelpProvider>
    </MemoryRouter>
  )
}

const Fondo = ({ children }: { children: ReactNode }) => (
  <div className="bg-page-background p-4 sm:p-6">{children}</div>
)

/* Qué es cada parte y qué pasa al tocarla. */
const PARTES: [string, string, string][] = [
  ['Logo', 'Bloque azul oscuro con el nombre. Mide lo mismo que la barra de arriba (64px) para que las dos queden alineadas.', 'Sólo el ícono.'],
  ['Items', 'Dashboard, Patients, Scheduling, Message, Contacts, Documents, Reports y Help: cada uno abre su pantalla. El de la pantalla actual va en azul.', 'Sólo íconos de 32×32, con el nombre en un tooltip.'],
  ['Billing', 'Abre Billing. Al pasar el mouse (o con su flecha) muestra al costado Billing, Fee Schedules, Carriers y Coverage Table.', 'El ícono; el menú sale igual al pasar el mouse.'],
  ['Confibot', 'No es una pantalla: abre y cierra la hoja de chat de ayuda. Queda en azul mientras está abierta.', 'Ícono con tooltip.'],
  ['Settings', 'Al pie, en el mismo lugar abierto o cerrado. Al pasar el mouse muestra sus secciones; Billing despliega sus tablas con su flecha.', 'El ícono, sin tooltip: el menú ya sale ahí mismo.'],
  ['Toggle', 'Está en la barra de arriba, a la izquierda del saludo: expande a 176px o colapsa a 58px.', 'Cambia el ícono.'],
]

export const Parts: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Fondo>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <Rail ruta="/scheduling" />
        <div className="min-w-0 flex-1">
          <Tabla encabezado={['Part', 'What it does', 'When collapsed']} minimo={560} arriba>
            {PARTES.map(([parte, que, colapsado]) => (
              <tr key={parte}>
                <td className="font-semibold whitespace-nowrap">{parte}</td>
                <td className="text-ink-medium">{que}</td>
                <td className="text-ink-medium">{colapsado}</td>
              </tr>
            ))}
          </Tabla>
        </div>
      </div>
    </Fondo>
  ),
}

/* El ancho de cada muestra deja lugar al menú flotante, que sale al costado del rail. */
function Estado({ titulo, nota, ancho, children }: { titulo: string; nota: string; ancho: number; children: ReactNode }) {
  return (
    <figure className="m-0 flex flex-col gap-2" style={{ width: ancho }}>
      <figcaption className="flex flex-col gap-0.5">
        <span className="text-[12.5px] font-semibold text-ink">{titulo}</span>
        <span className="text-[11.5px] leading-snug text-ink-muted">{nota}</span>
      </figcaption>
      {children}
    </figure>
  )
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Fondo>
      <div className="flex flex-col gap-10">
        <Bloque titulo="Expanded · 176px">
          <div className="flex flex-wrap items-start gap-x-6 gap-y-8">
            <Estado titulo="Default" nota="La pantalla actual en azul." ancho={176}>
              <Rail />
            </Estado>
            <Estado titulo="Hover on an item" nota="Fondo gris: se puede elegir." ancho={176}>
              <Forzar selector='a[href="/patients"]' estado="hover"><Rail /></Forzar>
            </Estado>
            <Estado titulo="Billing menu" nota="Al pasar el mouse por Billing, o con su flecha." ancho={430}>
              <Rail ruta="/billing" preview={{ billingMenu: true }} />
            </Estado>
            <Estado titulo="Settings menu" nota="Sale hacia arriba: Settings vive al pie." ancho={430}>
              <Rail ruta="/settings/accounts" preview={{ settingsMenu: true }} />
            </Estado>
          </div>
        </Bloque>
        <Bloque titulo="Collapsed · 58px">
          <div className="flex flex-wrap items-start gap-x-6 gap-y-8">
            <Estado titulo="Collapsed" nota="Sólo íconos; la pantalla actual en azul." ancho={120}>
              <Rail expanded={false} />
            </Estado>
            <Estado titulo="Tooltip on an item" nota="El nombre aparece a la derecha al pasar el mouse." ancho={200}>
              <Rail expanded={false} preview={{ tooltip: 'Scheduling' }} />
            </Estado>
            <Estado titulo="Settings menu" nota="El mismo menú, desde el ícono." ancho={320}>
              <Rail expanded={false} ruta="/settings/accounts" preview={{ settingsMenu: true }} />
            </Estado>
          </div>
        </Bloque>
      </div>
    </Fondo>
  ),
}

/* Qué se mide y en cuál de los dos rails (expandido o colapsado). Las cajas (rail, logo) sólo llevan tamaño. */
const MEDIDAS: [string, 'exp' | 'col', string, 'caja'?][] = [
  ['Rail · expanded', 'exp', 'aside', 'caja'],
  ['Rail · collapsed', 'col', 'aside', 'caja'],
  ['Logo', 'exp', 'aside > div', 'caja'],
  ['Item · expanded', 'exp', 'nav > a'],
  ['Item · collapsed', 'col', 'nav > a'],
  ['Settings · expanded', 'exp', '[data-tour=settings-menu]'],
]

function Medidas() {
  const exp = useRef<HTMLDivElement>(null)
  const col = useRef<HTMLDivElement>(null)
  const [filas, setFilas] = useState<(MedidasDe | null)[]>([])
  useLayoutEffect(() => {
    setFilas(MEDIDAS.map(([, cual, sel]) => {
      const el = (cual === 'exp' ? exp : col).current?.querySelector<HTMLElement>(sel)
      return el ? medidasDe(el) : null
    }))
  }, [])
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
      <div className="flex shrink-0 items-start gap-4">
        <div ref={exp}><Rail ruta="/scheduling" /></div>
        <div ref={col}><Rail ruta="/scheduling" expanded={false} /></div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-8">
        <Bloque titulo="Sizes" nota="Medidas leídas de los dos rails de al lado, en computadora. En el celular el panel mide 234px: tapa el contenido en vez de correrlo.">
          <Tabla encabezado={['Part', 'Width', 'Height', 'Padding', 'Text', 'Radius', 'Icon']} minimo={600}>
            {MEDIDAS.map(([parte, , , caja], i) => {
              const m = filas[i]
              const texto = m && !caja ? m : null
              return (
                <tr key={parte}>
                  <td className="font-semibold whitespace-nowrap">{parte}</td>
                  <td className="tabular-nums">{m?.ancho ?? '—'}</td>
                  <td className="tabular-nums">{m?.alto ?? '—'}</td>
                  <td className="tabular-nums">{m?.padding ?? '—'}</td>
                  <td className="tabular-nums">{texto ? `${texto.texto} · ${texto.peso}` : '—'}</td>
                  <td className="tabular-nums">{texto?.radio ?? '—'}</td>
                  <td className="tabular-nums">{texto?.icono ?? '—'}</td>
                </tr>
              )
            })}
          </Tabla>
          <p className="m-0 max-w-[72ch] text-[12.5px] text-ink-muted">
            Expandido, los ítems van a 12px de cada borde y a 4px uno de otro. Colapsado, cada ítem cae cada 50px (32 del
            ítem y 18 de espacio).
          </p>
        </Bloque>
        <Colores />
      </div>
    </div>
  )
}

const Colores = () => (
  <Bloque titulo="Colors">
    <Tabla encabezado={['Part', 'Token']} minimo={480}>
      <tr><td className="font-semibold">Rail</td><td><Token nombre="surface-subtle" /></td></tr>
      <tr><td className="font-semibold">Logo</td><td><Token nombre="dash-blue-hover" /> · text <Token nombre="white" /></td></tr>
      <tr><td className="font-semibold">Item</td><td>text <Token nombre="dash-muted" /> · hover black 5%</td></tr>
      <tr><td className="font-semibold">Active item</td><td><Token nombre="dash-blue" /> · text <Token nombre="white" /></td></tr>
      <tr><td className="font-semibold">Tooltip</td><td><Token nombre="ink" /> · text <Token nombre="white" /></td></tr>
      <tr><td className="font-semibold">Floating menu</td><td><Token nombre="white" /> · border <Token nombre="line" /> · hover <Token nombre="surface-muted" /></td></tr>
      <tr><td className="font-semibold">Floating menu · current</td><td><Token nombre="dash-count-bg" /> · text <Token nombre="dash-blue-hover" /></td></tr>
    </Tabla>
  </Bloque>
)

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Fondo>
      <Medidas />
    </Fondo>
  ),
}
