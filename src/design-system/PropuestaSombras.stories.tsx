import type { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { CalendarCheck } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Panel } from '@/components/dashboard/primitives'
import { AppointmentCardCompacta } from '@/components/dashboard/AppointmentCard'
import { StatCard } from '@/components/dashboard/StatCard'
import { TURNOS_PATIENTS } from '@/components/dashboard/dashboard-data'
import { Bloque, Lienzo, Tabla } from './kit'
import { PantallaReal } from './pantalla'

/* Propuesta (2026-10-10): tres sombras más suaves para las cards madre (shadow-panel y shadow-stat). Página temporal:
   cuando Julián elija, el valor pasa a --shadow-panel en src/index.css y esta página se borra. */
const VARIANTES = {
  actual: {
    nombre: 'Current',
    valor: '0 4px 14px 0 rgb(100 100 100 / 0.25)',
    idea: 'Gris neutro al 25% y 14px de blur: se ve un halo oscuro alrededor de toda la card, también arriba.',
  },
  a: {
    nombre: 'A · Subtle',
    valor: '0 1px 2px 0 rgb(16 24 40 / 0.06), 0 1px 3px 0 rgb(16 24 40 / 0.08)',
    idea: 'Casi plana: sólo una sombra de contacto que marca el borde. La card se separa del fondo por el blanco, no por la altura. La más calma para pantallas densas; la diferencia con la card de adentro se achica.',
  },
  b: {
    nombre: 'B · Diffuse',
    valor: '0 1px 2px 0 rgb(16 24 40 / 0.04), 0 4px 16px -2px rgb(16 24 40 / 0.10)',
    idea: 'La misma idea de hoy (la card apenas levantada) con un tercio de la intensidad: una sombra de contacto para el borde y una difusa que cae hacia abajo, sin halo arriba.',
  },
  c: {
    nombre: 'C · Floating',
    valor: '0 2px 4px -2px rgb(16 24 40 / 0.06), 0 16px 32px -8px rgb(16 24 40 / 0.14)',
    idea: 'Más altura y más aire: sombra amplia y muy clara, corrida hacia abajo. Se ve más liviana y "premium", pero el borde de arriba casi desaparece sobre el fondo #fafbfe y pide más separación entre cards.',
  },
} as const
type Variante = keyof typeof VARIANTES

/* Las variantes pisan el --tw-shadow de las dos clases sólo adentro de [data-sombra]: la app no cambia. */
const ESTILOS = (Object.keys(VARIANTES) as Variante[])
  .filter((v) => v !== 'actual')
  .map((v) => `[data-sombra="${v}"] .shadow-panel, [data-sombra="${v}"] .shadow-stat { --tw-shadow: ${VARIANTES[v].valor}; }`)
  .join('\n')

function ConVariante({ variante, children, className }: { variante: Variante; children: ReactNode; className?: string }) {
  return (
    <div data-sombra={variante} className={className}>
      <style>{ESTILOS}</style>
      {children}
    </div>
  )
}

/* La misma muestra en cada variante: una card de la página, un número del Dashboard y un panel con cards adentro. */
function Muestra({ variante }: { variante: Variante }) {
  return (
    <ConVariante variante={variante} className="flex w-[260px] flex-col gap-4">
      <Card>
        <CardHeader className="pb-1">
          <div>
            <CardTitle>Contact information</CardTitle>
            <CardDescription>How the clinic reaches the patient.</CardDescription>
          </div>
          <Button variant="link" size="sm">Edit</Button>
        </CardHeader>
        <CardContent>sarah.stone@mail.com · (555) 010-2233</CardContent>
      </Card>
      <StatCard title="Appointments" value="6" delta="+2 vs yesterday" icon={CalendarCheck} />
      <Panel title="Today Appointments" bodyClassName="gap-3">
        {TURNOS_PATIENTS.slice(0, 3).map((a) => <AppointmentCardCompacta key={a.name} appt={a} />)}
      </Panel>
    </ConVariante>
  )
}

const meta = {
  title: 'Proposals/Card shadow',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          '**Propuesta, no está aplicada.** La sombra de las cards madre (`shadow-panel`: `Card`, `Panel`, `TARJETA_PANEL`, `SectionCard`; y `shadow-stat` de los números del Dashboard) se ve dura. Tres variantes más suaves, las tres sin borde (regla del 2026-10-06), con el gris azulado del fondo de página en vez de gris neutro.',
          '',
          'La que se elija pasa a un solo token para **todas** las cards madre, también la tira de números del Dashboard, que hoy tiene una sombra propia. Las cards de adentro (`InnerCard`) no cambian.',
          '',
          '**Probalo:** en *Playground* cambiá la variante desde *Controls*; en *In the app* mirá cada variante en una pantalla real (Dashboard, Patients, la ficha del paciente).',
        ].join('\n'),
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<{ variante: Variante; pantalla: string }>

const CONTROL_VARIANTE = {
  control: { type: 'inline-radio' as const, labels: Object.fromEntries(Object.entries(VARIANTES).map(([k, v]) => [k, v.nombre])) },
  options: Object.keys(VARIANTES),
  description: 'Sombra de las cards madre.',
}

export const Playground: Story = {
  args: { variante: 'b' },
  argTypes: { variante: CONTROL_VARIANTE },
  render: ({ variante }) => (
    <div className="flex flex-col gap-3">
      <div className="bg-page-background rounded-lg p-8"><Muestra variante={variante} /></div>
      <p className="max-w-[72ch] text-[13px] text-ink-muted">{VARIANTES[variante].idea}</p>
    </div>
  ),
}

/* Las cuatro juntas, sobre el fondo de página real (#fafbfe). */
export const SideBySide: Story = {
  name: 'Side by side',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="bg-page-background flex flex-wrap gap-x-6 gap-y-8 rounded-lg p-6">
      {(Object.keys(VARIANTES) as Variante[]).map((v) => (
        <div key={v} className="flex flex-col gap-3">
          <span className="text-[13px] font-semibold text-ink">{VARIANTES[v].nombre}</span>
          <Muestra variante={v} />
        </div>
      ))}
    </div>
  ),
}

/* Una pantalla real con la variante aplicada. */
export const InTheApp: Story = {
  name: 'In the app',
  tags: ['!autodocs'],
  args: { variante: 'b', pantalla: '/' },
  argTypes: {
    variante: CONTROL_VARIANTE,
    pantalla: {
      control: {
        type: 'select' as const,
        labels: { '/': 'Dashboard', '/patients': 'Patients', '/patients/patient-0001': 'Patient overview', '/billing': 'Billing', '/settings/general': 'Settings' },
      },
      options: ['/', '/patients', '/patients/patient-0001', '/billing', '/settings/general'],
      description: 'Pantalla de la app.',
    },
  },
  parameters: { layout: 'fullscreen', router: false },
  render: ({ variante, pantalla }) => (
    <ConVariante key={pantalla} variante={variante}>
      <PantallaReal ruta={pantalla} />
    </ConVariante>
  ),
}

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Values" nota="Las tres usan rgb(16 24 40), el gris azulado oscuro del texto, en vez del gris neutro de hoy: sobre el fondo #fafbfe la sombra se ve limpia y no sucia. Todas sin borde y con la sombra de contacto (1–2px) que marca el canto, porque el blanco de la card y el fondo casi no contrastan.">
        <Tabla encabezado={['Variant', 'box-shadow', 'Why']} minimo={760} arriba>
          {(Object.keys(VARIANTES) as Variante[]).map((v) => (
            <tr key={v}>
              <td className="font-semibold whitespace-nowrap">{VARIANTES[v].nombre}</td>
              <td className="tabular-nums"><code className="text-[12px]">{VARIANTES[v].valor}</code></td>
              <td className="text-ink-medium">{VARIANTES[v].idea}</td>
            </tr>
          ))}
        </Tabla>
      </Bloque>
      <Bloque titulo="What changes">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>One token: --shadow-panel in src/index.css. Every page card follows it (Card, Panel, TARJETA_PANEL, SectionCard, Settings cards, Clinical Mode panels).</li>
          <li>shadow-stat (the Dashboard numbers) takes the same value: today it has its own shadow.</li>
          <li>Unchanged: InnerCard (shadow-inner-card), drawers, menus and the blue ring on hover and selection.</li>
        </ul>
      </Bloque>
    </Lienzo>
  ),
}
