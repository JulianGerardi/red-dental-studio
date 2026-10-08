import type { Meta, StoryObj } from '@storybook/react-vite'
import { Plus } from 'lucide-react'
import { SettingsPageHeader } from './SettingsPageHeader'
import { SettingsSearch } from './SettingsSearch'
import { Button } from '@/components/ui/button'
import { Pill } from '@/components/ui/pill'
import { Lienzo, Muestra, TablaPartes } from '@/design-system/kit'

const meta = {
  title: 'Components/Settings/SettingsPageHeader',
  component: SettingsPageHeader,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'El encabezado de las pantallas de Settings: título, bajada, acción principal alineada con el título y, debajo, la barra de búsqueda. La guía completa (anatomía, medidas, qué pantalla usa qué) está en *Elements / Page header*.',
          '',
          '**etiquetas** (2026-10-08): pills al lado del título, para el detalle de un ítem (Active, Default).',
          '',
          '**Probalo:** en *Playground* cambiá título, bajada y prendé *etiquetas* desde *Controls*.',
        ].join('\n'),
      },
    },
  },
  args: { titulo: 'Team', bajada: 'People who work at this clinic and what they can do.' },
  argTypes: {
    etiquetas: { control: 'select', options: ['None', 'Active', 'Default + Active'], mapping: { None: undefined, Active: <Pill tone="success">Active</Pill>, 'Default + Active': <><Pill tone="info">Default</Pill><Pill tone="success">Active</Pill></> }, description: 'Pills al lado del título.' },
    accion: { control: false },
    children: { control: false },
  },
} satisfies Meta<typeof SettingsPageHeader>

export default meta
type Story = StoryObj<typeof meta>

const sinControles = { controls: { disable: true } }

export const Playground: Story = {}

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <SettingsPageHeader titulo="Carriers" etiquetas={<Pill tone="success">Active</Pill>} bajada="The insurance companies you bill." accion={<Button><Plus /> New carrier</Button>}>
        <SettingsSearch value="" onChange={() => {}} />
      </SettingsPageHeader>
      <TablaPartes partes={[
        ['titulo', 'El nombre de la pantalla (PageTitle, 20px semibold).', 'PageTitle'],
        ['etiquetas', 'Pills al lado del título; hacen wrap con él.', 'Pill'],
        ['bajada', 'Una línea: qué se hace acá. 12px, ink-faint.', 'p'],
        ['accion', 'La acción principal (o un grupo), arriba a la derecha.', 'Button'],
        ['children', 'La barra: buscador y filtros, 20px debajo.', 'SettingsSearch · FilterMenu'],
      ]} />
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Muestra titulo="Title only"><SettingsPageHeader titulo="Billing" bajada="Manage fee schedules, carriers, and coverage tables." /></Muestra>
      <Muestra titulo="With action and search">
        <SettingsPageHeader titulo="Team" bajada="People who work at this clinic and what they can do." accion={<Button><Plus /> New employee</Button>}>
          <SettingsSearch value="" onChange={() => {}} placeholder="Search employees" />
        </SettingsPageHeader>
      </Muestra>
      <Muestra titulo="With tags (detail)"><SettingsPageHeader titulo="UCR - Red" etiquetas={<><Pill tone="info">Default</Pill><Pill tone="success">Active</Pill></>} bajada="UCR · Effective Jan 1, 2026" /></Muestra>
    </Lienzo>
  ),
}

export const Specs: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <p className="text-[13px] text-ink-medium">Measures, spacing and the headers in use are in <b>Elements / Page header</b>. Tags sit 8px from the title, centered on its line.</p>
    </Lienzo>
  ),
}
