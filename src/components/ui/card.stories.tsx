import type { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { composeStories } from '@storybook/react-vite'
import { MoreVertical } from 'lucide-react'
import { Button } from './button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card'
import { SectionCard, TextField } from '@/components/patients/form'
import { Bloque, Lienzo, Tabla, useMedidas } from '@/design-system/kit'
import * as StatCardStories from '@/components/dashboard/StatCard.stories'
import * as AppointmentCardStories from '@/components/dashboard/AppointmentCard.stories'
import * as OperatoryCardStories from '@/components/dashboard/OperatoryCard.stories'
import * as PendingTaskCardStories from '@/components/dashboard/PendingTaskCard.stories'
import * as PatientCardStories from '@/components/patients/PatientCard.stories'
import { cn } from '@/lib/utils'

type Args = {
  title: string
  description: string
  action: 'none' | 'button' | 'menu'
  content: string
  footer: boolean
  state: 'default' | 'hover' | 'selected'
  width: number
}

const meta = {
  title: 'Elements/Cards',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Una **card** es la caja blanca que agrupa **un solo tema** sobre el fondo gris de la pantalla: los datos de contacto de un paciente, un número del día, una cita. Sirve para separar bloques y que la pantalla se lea por partes.',
          '',
          '**Partes** (`@/components/ui/card`): `Card` (la caja) · `CardHeader` con `CardTitle` y `CardDescription` · `CardContent` · `CardFooter` para las acciones.',
          '',
          '**Probalo:** en *Playground* armá tu card desde *Controls*: título, bajada, acción, contenido, pie y estado.',
        ].join('\n'),
      },
    },
  },
  args: {
    title: 'Contact information',
    description: 'How the clinic reaches the patient.',
    action: 'button',
    content: 'sarah.stone@mail.com · (555) 010-2233',
    footer: false,
    state: 'default',
    width: 380,
  },
  argTypes: {
    title: { control: 'text', description: 'Título de la card.' },
    description: { control: 'text', description: 'Bajada debajo del título. Vacía = sin bajada.' },
    action: { control: 'inline-radio', options: ['none', 'button', 'menu'], description: 'Acción arriba a la derecha.' },
    content: { control: 'text', description: 'Contenido.' },
    footer: { control: 'boolean', description: 'Pie con Cancel y Save.' },
    state: { control: 'inline-radio', options: ['default', 'hover', 'selected'], description: 'hover: la card entera es clickeable. selected: está elegida.' },
    width: { control: { type: 'range', min: 240, max: 640, step: 20 }, description: 'Ancho en px.' },
  },
  /* Las cards viven sobre el fondo gris de la pantalla: se muestran así. */
  decorators: [(Story) => <div className="bg-page-background rounded-xl p-6"><Story /></div>],
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

function Armada({ title, description, action, content, footer, state, width }: Args) {
  return (
    <Card
      style={{ width }}
      className={cn(
        state === 'hover' && 'hover:border-dash-blue/40 pseudo-hover cursor-pointer transition-colors',
        state === 'selected' && 'border-dash-blue ring-dash-blue/15 ring-2',
      )}
    >
      <CardHeader>
        <div className="min-w-0">
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {action === 'button' && <Button variant="link" size="sm">Edit</Button>}
        {action === 'menu' && <Button variant="ghost" size="sm" iconOnly aria-label="Actions"><MoreVertical /></Button>}
      </CardHeader>
      <CardContent>{content}</CardContent>
      {footer && (
        <CardFooter>
          <Button variant="secondary" size="md">Cancel</Button>
          <Button size="md">Save</Button>
        </CardFooter>
      )}
    </Card>
  )
}

/* Armá la card desde Controls. */
export const Playground: Story = { render: (args) => <Armada {...args} /> }

/* Cada parte, marcada. */
function Parte({ nombre, children, className }: { nombre: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn('relative outline outline-1 outline-dashed outline-dash-blue/50 -outline-offset-1', className)}>
      <span className="bg-dash-blue absolute -top-2 right-2 rounded px-1.5 text-[10px] leading-4 font-semibold text-white">{nombre}</span>
      {children}
    </div>
  )
}

export const Anatomy: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Card className="w-[420px]">
      <Parte nombre="CardHeader">
        <CardHeader className="pb-1">
          <div>
            <Parte nombre="CardTitle" className="inline-block"><CardTitle>Contact information</CardTitle></Parte>
            <CardDescription>How the clinic reaches the patient.</CardDescription>
          </div>
          <Button variant="link" size="sm">Edit</Button>
        </CardHeader>
      </Parte>
      <Parte nombre="CardContent"><CardContent>sarah.stone@mail.com · (555) 010-2233</CardContent></Parte>
      <Parte nombre="CardFooter">
        <CardFooter><Button variant="secondary" size="md">Cancel</Button><Button size="md">Save</Button></CardFooter>
      </Parte>
    </Card>
  ),
}

/* Las cards que ya usa la app, con sus datos de ejemplo. */
const { Default: Stat } = composeStories(StatCardStories)
const { Default: Appointment } = composeStories(AppointmentCardStories)
const { Available: Operatory } = composeStories(OperatoryCardStories)
const { Default: Pending } = composeStories(PendingTaskCardStories)
const { Active: Patient } = composeStories(PatientCardStories)

const EN_LA_APP: { nombre: string; uso: string; ancho: number; nodo: ReactNode }[] = [
  { nombre: 'SectionCard', uso: 'A block of a form: groups related fields under a title.', ancho: 340, nodo: <SectionCard title="General"><TextField label="Name" placeholder="Name" /></SectionCard> },
  { nombre: 'StatCard', uso: 'One number of the day with its change.', ancho: 260, nodo: <Stat /> },
  { nombre: 'AppointmentCard', uso: 'One appointment in the dashboard list.', ancho: 360, nodo: <Appointment /> },
  { nombre: 'OperatoryCard', uso: 'One room and who is in it.', ancho: 300, nodo: <Operatory /> },
  { nombre: 'PendingTaskCard', uso: 'A task that is waiting for someone.', ancho: 320, nodo: <Pending /> },
  { nombre: 'PatientCard', uso: 'A patient in the mobile list.', ancho: 340, nodo: <Patient /> },
]

export const InTheApp: Story = {
  name: 'Cards in the app',
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {EN_LA_APP.map((c) => (
          <div key={c.nombre} className="flex flex-col gap-2">
            <p className="text-[13px] font-semibold">{c.nombre}</p>
            <p className="text-[12px] text-ink-muted">{c.uso}</p>
            <div style={{ width: c.ancho, maxWidth: '100%' }}>{c.nodo}</div>
          </div>
        ))}
      </div>
    </Lienzo>
  ),
}

function Medida({ nombre, children, selector }: { nombre: string; children: ReactNode; selector?: string }) {
  const { ref, m } = useMedidas(selector)
  return (
    <tr>
      <td className="font-semibold">{nombre}</td>
      <td><div ref={ref}>{children}</div></td>
      <td className="tabular-nums">{m?.radio}</td>
      <td className="tabular-nums">{m?.borde}</td>
      <td className="tabular-nums">{m?.padding}</td>
    </tr>
  )
}

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Box" nota="Medidas leídas de la card dibujada.">
        <Tabla encabezado={['Part', 'Sample', 'Radius', 'Border', 'Padding']} minimo={640}>
          <Medida nombre="Card"><Card className="h-12 w-40" /></Medida>
          <Medida nombre="CardHeader" selector=":scope > div > div"><Card className="w-40"><CardHeader><CardTitle>Title</CardTitle></CardHeader></Card></Medida>
          <Medida nombre="CardContent" selector=":scope > div > div"><Card className="w-40"><CardContent>Content</CardContent></Card></Medida>
          <Medida nombre="CardFooter" selector=":scope > div > div"><Card className="w-40"><CardFooter><Button size="sm">Save</Button></CardFooter></Card></Medida>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>One topic per card. If it needs two titles, it is two cards.</li>
          <li>The action that edits the card goes top right; the ones that save or cancel go in the footer.</li>
          <li>Cards sit on the grey page background, 16–24px apart.</li>
        </ul>
      </Bloque>
    </Lienzo>
  ),
}
