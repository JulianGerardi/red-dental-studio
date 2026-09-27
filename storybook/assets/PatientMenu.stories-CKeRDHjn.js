import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Link, MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { PatientSidePanel, setEncounterState, setPatientMenuCollapsed } from '@/components/patients/PatientSidePanel'
import { PatientMenuPreview, type PatientMenuPreviewState } from '@/components/patients/patient-menu-preview'
import { Toaster } from '@/components/ui/toaster'
import { Bloque, Forzar, Tabla, Token, medidasDe, type Medidas as MedidasDe } from './kit'

/* El menú del paciente solo, sin la pantalla: las pantallas están en Pages.
   Tiene su propio router, así que elegir una sección cambia el ítem activo
   como en la app; a la derecha, un recuadro marca dónde va la pantalla y mide
   el ancho que le queda. */

const PACIENTE = '/patients/abril-viola'
const SECCIONES = {
  Overview: '',
  Treatments: '/treatments',
  Insurance: '/insurance',
  Ledger: '/ledger',
  Documents: '/documents',
  'Relationships & Billing': '/relationships',
} as const
type Seccion = keyof typeof SECCIONES

const seccionDeRuta = (ruta: string) =>
  (Object.entries(SECCIONES).find(([, v]) => \`\${PACIENTE}\${v}\` === ruta)?.[0] as Seccion | undefined) ?? null
const inicialesDe = (nombre: string) =>
  nombre.split(/\\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join('').toUpperCase()

type Abierto = 'nothing' | 'section tooltip' | 'status tooltip' | 'patient information' | 'encounter options'

type Args = {
  section: Seccion
  collapsed: boolean
  encounter: 'start' | 'pending'
  name: string
  open: Abierto
}

const meta = {
  title: 'Elements/Patient menu',
  parameters: {
    layout: 'fullscreen',
    router: false,
    docs: {
      decisionsFrom: 'components/patients/PatientSidePanel.tsx',
      description: {
        component: [
          'El panel de la izquierda en todas las pantallas de un paciente (\`@/components/patients/PatientSidePanel\`). Acá está solo: las pantallas de cada sección están en *Pages*.',
          '',
          'Hace tres cosas: **dice quién es el paciente** (foto, nombre, estado, edad), **lleva a cada sección** de su ficha y **arranca la atención** (encuentro y Clinical Mode). Abajo tiene sus datos generales y de contacto.',
          '',
          'Se colapsa de 218px a 60px para darle ancho a la pantalla (el Ledger lo necesita) y lo recuerda al pasar de una sección a otra. En pantallas de menos de 1024px no colapsa: las secciones pasan a una tira horizontal (ver *On each device*).',
          '',
          '**Probalo:** en *Playground* tocá las secciones, colapsá con el botón de arriba del panel y mirá cuánto ancho gana el recuadro; pasá el mouse por los íconos colapsados y por la tarjeta de ficha; cambiá el encuentro con el chevron. Con *open* dejás abierto cada tooltip o menú.',
        ].join('\\n'),
      },
    },
  },
  args: { section: 'Overview', collapsed: false, encounter: 'start', name: 'John Smith', open: 'nothing' },
  argTypes: {
    section: { control: 'select', options: Object.keys(SECCIONES), description: 'Sección abierta: queda en azul. En la app es la ruta; acá también cambia al tocar el menú.' },
    collapsed: { control: 'boolean', description: 'Expandido (218px) o colapsado (60px). En la app, con el botón de arriba del panel.' },
    encounter: { control: 'inline-radio', options: ['start', 'pending'], description: 'Start Encounter (verde) o Pending Encounter (ámbar).' },
    name: { control: 'text', description: 'Nombre del paciente: las iniciales de la foto salen de acá. Probá uno largo.' },
    open: {
      control: 'select',
      options: ['nothing', 'section tooltip', 'status tooltip', 'patient information', 'encounter options'],
      description: 'Deja abierto lo que en la app se abre con el mouse. Los tooltips y la tarjeta sólo existen colapsado: al elegirlos, el menú se colapsa.',
      table: { category: 'Preview' },
    },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

function previewDe(open: Abierto, name: string): PatientMenuPreviewState {
  switch (open) {
    case 'section tooltip': return { collapsed: true, tooltip: 'Ledger' }
    case 'status tooltip': return { collapsed: true, tooltip: \`\${name} · Active · 50 years\` }
    case 'patient information': return { collapsed: true, infoCard: true }
    case 'encounter options': return { collapsed: false, encounterOptions: true }
    default: return {}
  }
}

/* El lugar de la pantalla: dice qué sección abrió el menú y cuánto ancho le
   deja. Los links que salen del paciente (Clinical Mode, editar General)
   avisan adónde llevan. */
function LugarDePantalla({ ruta, seccion }: { ruta: string; seccion: Seccion | null }) {
  const ref = useRef<HTMLDivElement>(null)
  const [ancho, setAncho] = useState(0)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const medir = () => setAncho(Math.round(el.getBoundingClientRect().width))
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const destino = ruta.endsWith('/clinical-mode') ? 'Clinical Mode, full screen' : ruta === '/patients/edit' ? 'the patient form (General)' : ruta
  return (
    <div ref={ref} className="flex min-h-[220px] min-w-0 flex-1 flex-col items-center justify-center gap-1.5 self-stretch rounded-lg border border-dashed border-ink-faint/60 p-6 text-center">
      {seccion ? (
        <>
          <p className="text-[13px] font-semibold text-ink">{seccion} screen</p>
          <p className="text-[12px] text-ink-muted tabular-nums">Available width: {ancho} px</p>
          <p className="font-mono text-[11px] text-ink-faint">{ruta}</p>
        </>
      ) : (
        <>
          <p className="text-[13px] font-semibold text-ink">Leaves the patient menu</p>
          <p className="text-[12px] text-ink-muted">Opens {destino}.</p>
          <Link to={PACIENTE} className="text-[12px] font-medium text-dash-blue underline">Back to Overview</Link>
        </>
      )}
    </div>
  )
}

function ConRuta({ name, pantalla }: { name: string; pantalla: boolean }) {
  const { pathname } = useLocation()
  const seccion = seccionDeRuta(pathname)
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
      <PatientSidePanel name={name} initials={inicialesDe(name)} section={seccion ?? ''} basePath={PACIENTE} />
      {pantalla && <LugarDePantalla ruta={pathname} seccion={seccion} />}
    </div>
  )
}

/* Un menú con su router y, si hace falta, estados fijos (colapsado,
   encuentro, tooltip abierto) sólo para esta instancia. */
function Menu({ section = 'Overview', name = 'John Smith', preview = {}, pantalla = false }: { section?: Seccion; name?: string; preview?: PatientMenuPreviewState; pantalla?: boolean }) {
  return (
    <PatientMenuPreview.Provider value={preview}>
      <MemoryRouter key={section} initialEntries={[\`\${PACIENTE}\${SECCIONES[section]}\`]}>
        <Routes>
          <Route path="*" element={<ConRuta name={name} pantalla={pantalla} />} />
        </Routes>
      </MemoryRouter>
    </PatientMenuPreview.Provider>
  )
}

const Fondo = ({ children }: { children: ReactNode }) => (
  <div className="bg-page-background min-h-[760px] p-4 sm:p-6">{children}</div>
)

/* Colapsado y encuentro se comparten entre todas las pantallas del paciente
   (viven fuera de React): se fijan después de que el panel empezó a
   escucharlos, y antes de dibujar con el loader. */
function Sincronizar({ collapsed, encounter }: Pick<Args, 'collapsed' | 'encounter'>) {
  useEffect(() => {
    setPatientMenuCollapsed(collapsed)
    setEncounterState(encounter)
  }, [collapsed, encounter])
  return null
}

/* Tocá las secciones, colapsá y cambiá el encuentro: todo funciona como en la app. */
export const Playground: Story = {
  loaders: [async ({ args }) => {
    setPatientMenuCollapsed(!!args.collapsed)
    setEncounterState(args.encounter ?? 'start')
    return {}
  }],
  render: (args) => (
    <Fondo>
      <Menu section={args.section} name={args.name} preview={previewDe(args.open, args.name)} pantalla />
      <Sincronizar collapsed={args.collapsed} encounter={args.encounter} />
      <Toaster />
    </Fondo>
  ),
}

/* Qué es cada parte y qué pasa al tocarla. */
const PARTES: [string, string, string][] = [
  ['Collapse button', 'Colapsa a 60px o expande a 218px. Se recuerda al cambiar de sección. Sólo en pantallas de 1024px o más.', 'Cambia a "expand".'],
  ['Photo', 'Iniciales en azul hasta que se sube una foto; al tocarla se cambia.', 'Baja a 36px, con un punto verde por el estado.'],
  ['Name · status · age', 'Quién es el paciente. El estado es la misma pill verde de las tablas.', 'Se leen en el tooltip del punto verde.'],
  ['Encounter', 'Start Encounter (verde) arranca la atención; Pending Encounter (ámbar) la deja en espera. El chevron cambia entre los dos.', 'No se muestra.'],
  ['Clinical Mode', 'Abre la ficha clínica a pantalla completa (odontograma, exámenes).', 'Ícono de ojo con tooltip.'],
  ['Sections', 'Las seis partes de la ficha. La actual va en azul; cada una abre su pantalla.', 'Sólo íconos, con el nombre en un tooltip.'],
  ['General · Contact', 'Datos del paciente. El lápiz edita: General abre la ficha del paciente, Contact un modal.', 'Ícono de ficha: al pasar el mouse abre una tarjeta con los dos bloques.'],
]

export const Parts: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Fondo>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <Menu preview={{ collapsed: false, encounter: 'start' }} />
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

const EXPANDIDO = { collapsed: false, encounter: 'start' } as const
const COLAPSADO = { collapsed: true, encounter: 'start' } as const

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Fondo>
      <div className="flex flex-col gap-10">
        <Bloque titulo="Expanded · 218px">
          <div className="flex flex-wrap items-start gap-x-6 gap-y-8">
            <Estado titulo="Default" nota="La sección actual en azul." ancho={218}>
              <Menu preview={EXPANDIDO} />
            </Estado>
            <Estado titulo="Hover on a section" nota="Fondo gris: se puede elegir." ancho={218}>
              <Forzar selector='a[href$="/insurance"]' estado="hover"><Menu preview={EXPANDIDO} /></Forzar>
            </Estado>
            <Estado titulo="Keyboard focus" nota="Anillo azul al llegar con Tab." ancho={218}>
              <Forzar selector='a[href$="/ledger"]' estado="focus-visible"><Menu preview={EXPANDIDO} /></Forzar>
            </Estado>
            <Estado titulo="Pending encounter" nota="Ámbar con pausa: la atención quedó en espera." ancho={218}>
              <Menu preview={{ collapsed: false, encounter: 'pending' }} />
            </Estado>
            <Estado titulo="Encounter options" nota="El chevron abre los dos estados; el actual en azul." ancho={218}>
              <Menu preview={{ ...EXPANDIDO, encounterOptions: true }} />
            </Estado>
          </div>
        </Bloque>
        <Bloque titulo="Collapsed · 60px">
          <div className="flex flex-wrap items-start gap-x-6 gap-y-8">
            <Estado titulo="Collapsed" nota="Sólo íconos; el estado es el punto verde." ancho={120}>
              <Menu preview={COLAPSADO} />
            </Estado>
            <Estado titulo="Tooltip on a section" nota="El nombre aparece a la derecha al pasar el mouse." ancho={200}>
              <Menu preview={{ ...COLAPSADO, tooltip: 'Ledger' }} />
            </Estado>
            <Estado titulo="Patient status" nota="Nombre, estado y edad en el tooltip del punto." ancho={260}>
              <Menu preview={{ ...COLAPSADO, tooltip: 'John Smith · Active · 50 years' }} />
            </Estado>
            <Estado titulo="Patient information" nota="General y Contact en una tarjeta, al pasar el mouse por la ficha." ancho={340}>
              <Menu preview={{ ...COLAPSADO, infoCard: true }} />
            </Estado>
          </div>
        </Bloque>
      </div>
    </Fondo>
  ),
}

/* Qué se mide y en cuál de los dos menús (expandido o colapsado). */
const MEDIDAS: [string, 'exp' | 'col', string][] = [
  ['Panel · expanded', 'exp', 'aside'],
  ['Panel · collapsed', 'col', 'aside'],
  ['Section · expanded', 'exp', 'nav a'],
  ['Section · collapsed', 'col', 'nav a'],
  ['Encounter', 'exp', '.relative.w-full > span'],
  ['Clinical Mode', 'exp', 'a[href$="/clinical-mode"]'],
  ['Photo · expanded', 'exp', 'aside .rounded-full'],
  ['Photo · collapsed', 'col', 'aside .rounded-full'],
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
        <div ref={exp}><Menu preview={EXPANDIDO} /></div>
        <div ref={col}><Menu preview={COLAPSADO} /></div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-8">
        <Bloque titulo="Sizes" nota="Medidas leídas de los dos menús de al lado, en computadora.">
          <Tabla encabezado={['Part', 'Width', 'Height', 'Padding', 'Text', 'Radius']} minimo={560}>
            {MEDIDAS.map(([parte], i) => {
              const m = filas[i]
              return (
                <tr key={parte}>
                  <td className="font-semibold whitespace-nowrap">{parte}</td>
                  <td className="tabular-nums">{m?.ancho ?? '—'}</td>
                  <td className="tabular-nums">{m?.alto ?? '—'}</td>
                  <td className="tabular-nums">{m?.padding ?? '—'}</td>
                  <td className="tabular-nums">{m ? \`\${m.texto} · \${m.peso}\` : '—'}</td>
                  <td className="tabular-nums">{m?.radio ?? '—'}</td>
                </tr>
              )
            })}
          </Tabla>
        </Bloque>
        <Colores />
      </div>
    </div>
  )
}

const Colores = () => (
  <Bloque titulo="Colors">
    <Tabla encabezado={['Part', 'Token']} minimo={480}>
      <tr><td className="font-semibold">Panel</td><td><Token nombre="white" /> · border <Token nombre="line" /></td></tr>
      <tr><td className="font-semibold">Active section</td><td><Token nombre="dash-blue" /> · text <Token nombre="white" /></td></tr>
      <tr><td className="font-semibold">Hover</td><td><Token nombre="surface-muted" /></td></tr>
      <tr><td className="font-semibold">Start Encounter</td><td><Token nombre="green" /></td></tr>
      <tr><td className="font-semibold">Pending Encounter</td><td><Token nombre="amber" /> · text <Token nombre="[#7a4a00]" /></td></tr>
      <tr><td className="font-semibold">Clinical Mode</td><td><Token nombre="[#eef5ff]" /> · text <Token nombre="dash-blue" /></td></tr>
      <tr><td className="font-semibold">Photo</td><td><Token nombre="dash-blue-hover" /></td></tr>
      <tr><td className="font-semibold">Status</td><td><Token nombre="dash-ok-bg" /> · <Token nombre="dash-ok-fg" /> · dot <Token nombre="green" /></td></tr>
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
`})))()}export{n,i as r,r as t};