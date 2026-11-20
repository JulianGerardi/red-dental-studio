import { useState, type ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { FinanzasProvider } from '@/data/finanzasStore'
import { BillingProfilesProvider } from '@/data/billingProfilesStore'
import { claveLocacion } from '@/data/billingProfiles'
import { Bloque, Lienzo, Muestra, SpecsMedidas, TablaPartes } from '@/design-system/kit'
import { esperar, pulsar, pulsarRol, secuencia } from '@/design-system/play'
import {
  BloqueoDefaults, Casilla, ElegirPerfilDrawer, ElegirProviderDrawer, Encabezado, LocationInsuranceDefaults, OpcionDrawer,
  Opciones, ResumenPerfil, ResumenProvider, Seleccion,
} from './LocationInsuranceDefaults'

/* Playground, Parts, States y Specs de Location → Insurance Defaults. Decisiones en
   design-reference/figma/modulos/insurance-defaults.md. */

type Args = { location: 'Abril' | 'Bayside Dental' | 'Northgate Clinic' }
const IDS = { Abril: 'abril', 'Bayside Dental': 'bayside', 'Northgate Clinic': 'northgate' } as const

const conStores = (hijos: ReactNode) => <FinanzasProvider><BillingProfilesProvider>{hijos}</BillingProfilesProvider></FinanzasProvider>

const meta = {
  title: 'Components/Settings/LocationInsuranceDefaults',
  parameters: {
    layout: 'padded',
    docs: {
      jira: ['CON-1173', 'CON-4029', 'CON-3894', 'CON-3896', 'CON-4030', 'CON-3898', 'CON-3899', 'CON-4031', 'CON-4032'],
      story: { inline: false, iframeHeight: 820 },
      description: {
        component: [
          'La pestaña **Insurance Defaults** de una Location (epic CON-1173): qué Billing Provider (CON-3894) y qué Rendering Provider (CON-3896) van por defecto en los claims, qué contrato se usa para los cálculos (CON-4030), el Place of Service (CON-3898) y las autorizaciones de un suscriptor nuevo (CON-3899).',
          '',
          '**Cómo se usa:** todo se guarda junto con un solo *Save changes* (CON-4029). Elegir *Specific Billing Profile* o *Specific Provider* obliga a seleccionar uno: se eligen en un drawer que abre una card con Select / Change, no en un input. Un perfil o un provider elegido acá no se puede deshabilitar desde su pantalla: ahí aparece el aviso que lista dónde está en uso (CON-4031, CON-4032).',
          '',
          '**Probalo:** en *Playground* elegí la Location desde *Controls*, cambiá las opciones y guardá. *Parts* dice qué hace cada pieza, *States* muestra la selección vacía, llena y con error y el aviso de bloqueo, y *Specs* las medidas leídas en vivo.',
        ].join('\n'),
      },
    },
  },
  args: { location: 'Abril' },
  argTypes: { location: { control: 'inline-radio', options: ['Abril', 'Bayside Dental', 'Northgate Clinic'], description: 'La Location cuyos defaults se editan.' } },
  decorators: [(Story) => conStores(<div className="bg-page-background min-h-[720px] p-6"><Story /></div>)],
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>
const sinControles = { controls: { disable: true }, docs: { story: { inline: true } } }
const enIframe = { layout: 'fullscreen' as const, controls: { disable: true }, docs: { story: { inline: false, iframeHeight: 640 } } }
const nada = () => {}

export const Playground: Story = { render: ({ location }) => <LocationInsuranceDefaults key={location} locId={IDS[location]} /> }

/* Estado de error: Specific Billing Profile sin perfil elegido. */
export const WithValidationErrors: Story = {
  parameters: { controls: { disable: true } },
  render: () => <LocationInsuranceDefaults locId="abril" />,
  play: secuencia(pulsarRol('radio', /Specific Billing Profile/), pulsar(/save changes/i), esperar(/select/i)),
}

/* ── Parts ─────────────────────────────────────────────────────────── */

function OpcionesDemo() {
  const [v, setV] = useState<'a' | 'b'>('a')
  return <Opciones etiqueta="Billing provider" valor={v} opciones={[['a', 'Location Billing Profile'], ['b', 'Specific billing profile']]} onChange={setV} />
}
function CasillaDemo({ inicial }: { inicial: boolean }) {
  const [on, setOn] = useState(inicial)
  return <Casilla on={on} onChange={setOn}>Assignment of benefits</Casilla>
}

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[
          ['Section header', 'Título y bajada de cada bloque de defaults.', 'Encabezado'],
          ['Options', 'El grupo de radios de un default (Location / Specific…).', 'Opciones'],
          ['Checkbox', 'Una autorización del suscriptor nuevo (Assignment of Benefits, Release of Information).', 'Casilla'],
          ['Selection card', 'La card con Select / Change que abre el drawer; llena muestra el resumen de lo elegido.', 'Seleccion'],
          ['Profile summary', 'El Billing Profile elegido: nombre y organización.', 'ResumenPerfil'],
          ['Provider summary', 'El provider elegido: avatar, nombre y especialidad.', 'ResumenProvider'],
          ['Drawer option', 'Una fila elegible dentro del drawer.', 'OpcionDrawer'],
          ['Select Billing Profile', 'El drawer con los perfiles habilitados.', 'ElegirPerfilDrawer'],
          ['Select provider', 'El drawer con los providers elegibles.', 'ElegirProviderDrawer'],
          ['In-use notice', 'El aviso que frena deshabilitar un perfil o un provider en uso, con link a cada Location.', 'BloqueoDefaults'],
        ]} />
      </Bloque>
      <Bloque titulo="Section header"><Encabezado titulo="Billing provider" bajada="Who bills the claims created in this location." /></Bloque>
      <Bloque titulo="Options"><OpcionesDemo /></Bloque>
      <Bloque titulo="Summaries">
        <div className="grid gap-4 sm:grid-cols-2">
          <Muestra titulo="Profile summary"><ResumenPerfil clave={claveLocacion('bayside')} /></Muestra>
          <Muestra titulo="Provider summary"><ResumenProvider id="elena-martinez" /></Muestra>
        </div>
      </Bloque>
      <Bloque titulo="Drawer option" nota="Elegida y sin elegir.">
        <div className="flex max-w-[420px] flex-col gap-2">
          <OpcionDrawer on onMarcar={nada} onElegir={nada}><ResumenProvider id="elena-martinez" /></OpcionDrawer>
          <OpcionDrawer on={false} onMarcar={nada} onElegir={nada}><ResumenProvider id="sarah-stone" /></OpcionDrawer>
        </div>
      </Bloque>
    </Lienzo>
  ),
}

/* ── States ────────────────────────────────────────────────────────── */

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Selection card">
        <div className="grid gap-4">
          <Muestra titulo="Empty" nota="Sin nada elegido: Select abre el drawer."><Seleccion id="s1" rotulo="Billing profile" requerido vacio="No billing profile selected." onElegir={nada} /></Muestra>
          <Muestra titulo="Selected" nota="Con algo elegido: el resumen y Change."><Seleccion id="s2" rotulo="Billing profile" requerido vacio="No billing profile selected." onElegir={nada} onQuitar={nada}><ResumenPerfil clave={claveLocacion('bayside')} /></Seleccion></Muestra>
          <Muestra titulo="Error" nota="Save changes sin elegir."><Seleccion id="s3" rotulo="Rendering provider" requerido vacio="No provider selected." error="Select a rendering provider." onElegir={nada} /></Muestra>
        </div>
      </Bloque>
      <Bloque titulo="Checkbox">
        <div className="flex flex-wrap gap-6"><CasillaDemo inicial /><CasillaDemo inicial={false} /></div>
      </Bloque>
    </Lienzo>
  ),
}

export const SelectBillingProfile: Story = { parameters: enIframe, render: () => <ElegirPerfilDrawer elegido={claveLocacion('bayside')} onClose={nada} onElegir={nada} /> }
export const SelectProvider: Story = { parameters: enIframe, render: () => <ElegirProviderDrawer titulo="Select Rendering Provider" providers={['elena-martinez', 'sarah-stone', 'daniel-anderson']} elegido="elena-martinez" onClose={nada} onElegir={nada} /> }
/* Estado vacío: ningún provider elegible en la Location. */
export const SelectProviderEmpty: Story = { parameters: enIframe, render: () => <ElegirProviderDrawer titulo="Select Rendering Provider" providers={[]} elegido={null} onClose={nada} onElegir={nada} /> }
export const BillingProfileInUse: Story = { parameters: enIframe, render: () => <BloqueoDefaults tipo="perfil" referencias={[{ locId: 'abril', campo: 'billingProfileId' }, { locId: 'northgate', campo: 'billingProfileId' }]} onClose={nada} /> }
export const ProviderInUse: Story = { parameters: enIframe, render: () => <BloqueoDefaults tipo="provider" referencias={[{ locId: 'abril', campo: 'renderingId' }]} onClose={nada} /> }

/* ── Specs ─────────────────────────────────────────────────────────── */

export const Specs: Story = {
  parameters: sinControles,
  render: () => (
    <SpecsMedidas piezas={[
      { nombre: 'Selection card', children: <Seleccion id="m1" rotulo="Billing profile" requerido vacio="No billing profile selected." onElegir={nada} /> },
      { nombre: 'Select button', selector: 'button', children: <Seleccion id="m2" rotulo="Billing profile" requerido vacio="No billing profile selected." onElegir={nada} /> },
      { nombre: 'Drawer option', children: <OpcionDrawer on onMarcar={nada} onElegir={nada}><ResumenProvider id="elena-martinez" /></OpcionDrawer> },
      { nombre: 'Checkbox', children: <CasillaDemo inicial /> },
    ]} />
  ),
}
