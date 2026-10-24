import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { PlanDrawer } from './PlanDrawer'
import { PLAN_VACIO, PlanAddressFields, PlanConfigurationFields, PlanContactFields, PlanGeneralFields, type FormPlan } from './PlanFields'
import { esperar, pulsar, secuencia } from '@/design-system/play'
import { Bloque, Lienzo } from '@/design-system/kit'
import { EstadosDelDrawer, PasosDelDrawer, SpecsDelDrawer } from '@/design-system/kit-drawer'
import { FinanzasProvider } from '@/data/finanzasStore'
import { ARANCELES, TELEFONO_VACIO } from '@/data/finanzas'

const meta = {
  title: 'Components/Finance/PlanDrawer',
  component: PlanDrawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      decisionsFrom: 'components/finance/PlanFields.tsx',
      story: { inline: false, iframeHeight: 720 },
      description: {
        component: [
          '**New Insurance Plan**, desde *Edit Carrier* (botón arriba a la derecha o */insurance-plans/new*). Son los cuatro grupos de la pestaña *Information* del plan en red.dev, uno por paso: General, Contact, Address y Configurations.',
          '',
          'Al guardar se abre la ficha del plan en *Coverage Table*, para seguir con lo que paga. Las otras pestañas (Predeterminations, Payment Table, Deductibles And Benefits, Coordination Of Benefits, Fee Schedule By Location) se completan ahí.',
          '',
          'Los mismos campos (`PlanFields`) arman la pestaña *Information* del plan, una card por grupo: se ven en *Fields*.',
          '',
          '**Probalo:** en *Playground* completá cada paso; en Contact elegí un contacto para que llene nombre, email y organización.',
        ].join('\n'),
      },
    },
  },
  decorators: [(Story) => <FinanzasProvider><Story /></FinanzasProvider>],
  args: { aseguradoraId: 'aetna', onClose: () => {}, onGuardar: () => {} },
  argTypes: { aseguradoraId: { control: 'select', options: ['aetna', 'benecare', 'cigna', 'delta-ca', 'metlife'], description: 'El carrier del plan (viene de Edit Carrier).' } },
} satisfies Meta<typeof PlanDrawer>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Parts: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <PasosDelDrawer pasos={[
      { nombre: 'General', secciones: 'General description: Plan/Employer name, Group #', obligatorios: 'Los dos' },
      { nombre: 'Contact', secciones: 'Contact Information: Country Code, Area Code, Number, Contact (buscador con ✕), First Name, Last Name, Email, Organization', obligatorios: 'Area Code y Number' },
      { nombre: 'Address', secciones: 'Address Information: Address Line 1 y 2, Country, State, City, ZIP Code', obligatorios: 'Todos menos Address Line 2' },
      { nombre: 'Configurations', secciones: 'Benefit Renewal Month, Source of Payment, Type, Max Allowable Amount Fee Schedule, Waiting Period (months), Dependent Max Age (years), Missing Tooth Clause, Crowns/Bridges Paid On, Out of Network Benefits, Out of Network Benefit Assignment', obligatorios: 'Renewal Month, Source of Payment, Type, Waiting Period, Dependent Max Age y Missing Tooth Clause' },
    ]} />
  ),
}

export const States: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <EstadosDelDrawer estados={[
      { estado: 'Default', cuando: 'Abre en General, vacío; Country en Estados Unidos.', story: 'Playground' },
      { estado: 'Validation errors', cuando: 'Next Step o Save con obligatorios vacíos.', story: 'With Validation Errors' },
      { estado: 'Contact selected', cuando: 'Elegir un contacto completa sus datos; la ✕ (Clear contact) los borra.' },
      { estado: 'Saved', cuando: 'Abre la ficha del plan en Coverage Table, vacía (“No procedure ranges found”).' },
    ]} />
  ),
}

export const WithValidationErrors: Story = {
  play: secuencia(pulsar(/^next step$/i), esperar(/this field is required/i)),
}

function Campos() {
  const [d, setD] = useState<FormPlan>({ ...PLAN_VACIO, nombre: 'Acme Corp', grupo: 'AET-100245' })
  const [codigo, setCodigo] = useState(TELEFONO_VACIO.codigo)
  const set = (k: keyof FormPlan) => (v: string) => setD((x) => ({ ...x, [k]: v }))
  const falta = () => undefined
  return (
    <Lienzo>
      <Bloque titulo="General description"><PlanGeneralFields d={d} set={set} falta={falta} /></Bloque>
      <Bloque titulo="Contact Information"><PlanContactFields d={d} set={set} falta={falta} codigo={codigo} onCodigo={setCodigo} /></Bloque>
      <Bloque titulo="Address Information"><PlanAddressFields d={d} set={set} falta={falta} /></Bloque>
      <Bloque titulo="Configurations"><PlanConfigurationFields d={d} set={set} falta={falta} aranceles={ARANCELES} /></Bloque>
    </Lienzo>
  )
}

export const Fields: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => <Campos />,
}

export const Specs: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <SpecsDelDrawer filas={[
      ['Size', 'lg'],
      ['Opens from', 'New Insurance Plan en Edit Carrier; también …/insurance-plans/new.'],
      ['Fields', 'components/finance/PlanFields.tsx, compartidos con la pestaña Information.'],
      ['Validation', 'lib/useFormPasos con obligatoriosPlan(country code).'],
      ['Origen', 'red.dev: New Insurance Plan es la página del plan con sólo Detail habilitada; acá drawer.'],
    ]} />
  ),
}
