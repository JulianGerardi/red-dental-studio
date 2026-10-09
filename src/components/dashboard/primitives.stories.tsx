import { useState, type ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Inbox } from 'lucide-react'
import { InnerCard, Panel, StatusPill } from './primitives'
import { Tabs } from '@/components/ui/tabs'
import { EmptyState } from '@/components/ui/empty-state'
import { Bloque, Lienzo, Tabla, Token, useMedidas } from '@/design-system/kit'
import { cn } from '@/lib/utils'

/* Playground, Parts, States y Specs del Panel; el encabezado con Tabs que baja en angosto (billing.md, 2026-10-09). */

type Args = {
  title: string
  controls: 'none' | 'tabs' | 'link'
  top: boolean
  cards: number
  width: number
}

const meta = {
  title: 'Components/Dashboard/Panel and StatusPill',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'El **panel** (`Panel` de `@/components/dashboard/primitives`) es la card de página con título: Appointments, Waiting Room, Rooms y Pending Task del Dashboard, Today Appointments de Patients y Recent Billing Activity, Find Patient y Today de Billing. Adentro van `InnerCard`, una tabla o un estado vacío.',
          '',
          '**Partes:** franja de arriba opcional (`top`, de borde a borde: el paciente elegido en Find Patient de Billing), encabezado (título de 15px Bold, **sin ícono**, y a la derecha sus controles: un filtro, Tabs o *View all*) y cuerpo con 16px de aire y 12px entre piezas.',
          '',
          '**El encabezado mide 52px** aunque los controles sean unas Tabs de 36px; si no entran al lado del título (en el celular), bajan a una segunda línea y el encabezado crece.',
          '',
          '**Probalo:** en *Playground* cambiá título, controles, cantidad de cards y ancho desde *Controls*: con Tabs y menos de ~420px se ve el wrap.',
        ].join('\n'),
      },
    },
  },
  args: { title: 'Recent Billing Activity', controls: 'tabs', top: false, cards: 2, width: 560 },
  argTypes: {
    title: { control: 'text', description: 'Título del panel. Sin ícono.' },
    controls: { control: 'inline-radio', options: ['none', 'tabs', 'link'], description: 'A la derecha del título: nada, Tabs sm (Billing) o View all (Patients).' },
    top: { control: 'boolean', description: 'Franja arriba del título, de borde a borde (Find Patient con un paciente elegido).' },
    cards: { control: { type: 'range', min: 0, max: 5, step: 1 }, description: 'InnerCards en el cuerpo. 0 muestra el estado vacío.' },
    width: { control: { type: 'range', min: 300, max: 760, step: 20 }, description: 'Ancho en px.' },
  },
  /* Los paneles viven sobre el fondo gris de la pantalla. */
  decorators: [(Story) => <div className="bg-page-background rounded-xl p-6"><Story /></div>],
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

const FILTROS = ['All', 'Pt Payment', 'Charge Adj', 'Credit Adj'] as const

function Controles({ tipo }: { tipo: Args['controls'] }) {
  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]>('All')
  if (tipo === 'tabs') return <Tabs size="sm" aria-label="Filter activity" tabs={FILTROS} value={filtro} onChange={setFiltro} />
  if (tipo === 'link') return <button type="button" className="text-dash-blue shrink-0 text-[12px] font-semibold hover:underline">View all</button>
  return null
}

/* La franja de ejemplo: la misma forma que la card del paciente elegido en Billing. */
const Franja = () => (
  <div className="flex items-center gap-3 border-b border-line-row bg-dash-count-bg px-5 py-3">
    <span className="bg-dash-blue flex size-10 shrink-0 items-center justify-center rounded-lg text-[13px] font-semibold text-white">MA</span>
    <span className="text-dash-blue text-[14px] font-semibold">Maria Abril Viola</span>
  </div>
)

function Armado({ title, controls, top = false, cards }: Omit<Args, 'width' | 'top'> & { top?: boolean }) {
  return (
    <Panel title={title} controls={<Controles tipo={controls} />} top={top ? <Franja /> : undefined} className="max-w-full" bodyClassName="min-h-[120px]">
      {cards === 0
        ? <EmptyState icon={Inbox} title="Nothing here yet" detail="The panel says why it is empty and what to do." className="py-6" />
        : Array.from({ length: cards }, (_, i) => <InnerCard key={i} className="p-3 text-[13px] text-ink-muted">InnerCard {i + 1}</InnerCard>)}
    </Panel>
  )
}

/* Armá el panel desde Controls. */
export const Playground: Story = { render: (a) => <div style={{ width: a.width, maxWidth: '100%' }}><Armado {...a} /></div> }

/* ── Parts ─────────────────────────────────────────────────────────── */

function Parte({ nombre, children, className, izquierda }: { nombre: string; children: ReactNode; className?: string; izquierda?: boolean }) {
  return (
    <div className={cn('relative outline outline-1 outline-dashed outline-dash-blue/50 -outline-offset-1', className)}>
      <span className={cn('bg-dash-blue absolute -top-2 z-10 rounded px-1.5 text-[10px] leading-4 font-semibold text-white', izquierda ? 'left-2' : 'right-2')}>{nombre}</span>
      {children}
    </div>
  )
}

const PARTES: [string, string][] = [
  ['Top', 'Opcional, arriba del encabezado y de borde a borde. En Billing, el paciente que se está viendo arriba de Find Patient.'],
  ['Header', 'Mínimo 52px. Título a la izquierda y controles a la derecha; si no entran, los controles bajan a otra línea.'],
  ['Title', '15px Bold, negro, sin ícono. Puede llevar un globo con el total (Today Appointments).'],
  ['Controls', 'Lo que cambia el contenido del panel: un filtro (Dashboard), Tabs sm (Billing) o View all (Patients).'],
  ['Body', '16px de aire, 12px entre piezas. InnerCards, una tabla o un EmptyState.'],
]

export const Parts: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-6">
      <Parte nombre="Panel" izquierda className="w-[560px] max-w-full rounded-lg">
        <Panel
          title={<Parte nombre="Title" className="inline-block">Recent Billing Activity</Parte>}
          controls={<Parte nombre="Controls"><Controles tipo="tabs" /></Parte>}
        >
          <Parte nombre="Body"><InnerCard className="p-3 text-[13px] text-ink-muted">InnerCard</InnerCard></Parte>
        </Panel>
      </Parte>
      <Tabla encabezado={['Part', 'What it does']} minimo={560} arriba>
        {PARTES.map(([parte, que]) => (
          <tr key={parte}><td className="font-semibold whitespace-nowrap">{parte}</td><td className="text-ink-medium">{que}</td></tr>
        ))}
      </Tabla>
    </div>
  ),
}

/* ── States ────────────────────────────────────────────────────────── */

function Estado({ titulo, nota, ancho, children }: { titulo: string; nota: string; ancho: number; children: ReactNode }) {
  return (
    <figure className="m-0 flex max-w-full flex-col gap-2" style={{ width: ancho }}>
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
    <div className="flex flex-wrap items-start gap-x-6 gap-y-8">
      <Estado titulo="Title only" nota="Sin controles: el encabezado mide 52px igual." ancho={320}><Armado title="Today" controls="none" cards={2} /></Estado>
      <Estado titulo="With tabs" nota="Tabs sm (36px) al lado del título: el encabezado sigue en 52px." ancho={560}><Armado title="Recent Billing Activity" controls="tabs" cards={2} /></Estado>
      <Estado titulo="Narrow · tabs wrap" nota="En el celular (343px) las Tabs no entran al lado del título y bajan a una segunda línea. Si ni solas entran, se deslizan de costado." ancho={343}><Armado title="Recent Billing Activity" controls="tabs" cards={1} /></Estado>
      <Estado titulo="With top band" nota="top: la franja va arriba del título, de borde a borde, con una línea abajo." ancho={320}><Armado title="Find Patient" controls="none" top cards={2} /></Estado>
      <Estado titulo="With View all" nota="Un link chico a la derecha, como Today Appointments en Patients." ancho={320}><Armado title="Today Appointments" controls="link" cards={2} /></Estado>
      <Estado titulo="Empty" nota="Sin contenido: el EmptyState dice por qué y qué hacer." ancho={320}><Armado title="Waiting Room" controls="none" cards={0} /></Estado>
      <Estado titulo="StatusPill" nota="La pastilla de estado de Rooms y las cards del Dashboard." ancho={320}>
        <div className="flex gap-2">
          <StatusPill tone="ok">Available</StatusPill>
          <StatusPill tone="busy">Busy</StatusPill>
          <StatusPill tone="bad">Unavailable</StatusPill>
        </div>
      </Estado>
    </div>
  ),
}

/* ── Specs ─────────────────────────────────────────────────────────── */

function Medida({ nombre, selector, children }: { nombre: string; selector: string; children: ReactNode }) {
  const { ref, m } = useMedidas(selector)
  return (
    <tr>
      <td className="font-semibold">{nombre}</td>
      <td><div ref={ref} className="w-[340px]">{children}</div></td>
      <td className="tabular-nums">{m?.alto}</td>
      <td className="tabular-nums">{m?.padding}</td>
      <td className="tabular-nums">{m ? `${m.texto} · ${m.peso}` : ''}</td>
    </tr>
  )
}

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Sizes" nota="Medidas leídas de los paneles dibujados.">
        <Tabla encabezado={['Part', 'Sample', 'Height', 'Padding', 'Text']} minimo={760}>
          <Medida nombre="Header" selector="header"><Armado title="Today" controls="none" cards={1} /></Medida>
          <Medida nombre="Header · narrow tabs" selector="header"><Armado title="Recent Billing Activity" controls="tabs" cards={1} /></Medida>
          <Medida nombre="Title" selector="h2"><Armado title="Today" controls="none" cards={1} /></Medida>
          <Medida nombre="Body" selector="section > div"><Armado title="Today" controls="none" cards={1} /></Medida>
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Part', 'Token']} minimo={480}>
          <tr><td className="font-semibold">Panel</td><td><Token nombre="white" /> · <code>shadow-panel</code>, no border</td></tr>
          <tr><td className="font-semibold">Title</td><td><Token nombre="black" /> 15px Bold</td></tr>
          <tr><td className="font-semibold">Inner card</td><td><Token nombre="white" /> · <code>shadow-inner-card</code></td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>The title has no icon.</li>
          <li>The optional top band goes edge to edge above the header, with a line under it; it marks what the panel is about (the patient in Billing).</li>
          <li>The header is at least 52px, with 8px top and bottom and 20px on the sides; controls up to 36px (Tabs sm) fit without growing it.</li>
          <li>If the controls do not fit next to the title, they wrap below it; they never squeeze or cut the title.</li>
          <li>Everything inside the panel is an InnerCard, a table or an EmptyState, 12px apart.</li>
        </ul>
      </Bloque>
    </Lienzo>
  ),
}
