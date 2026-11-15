import { useState, type ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { FinanzasProvider } from '@/data/finanzasStore'
import { BillingProfilesProvider, useBillingProfiles } from '@/data/billingProfilesStore'
import { claveLocacion, claveProvider } from '@/data/billingProfiles'
import { Bloque, Lienzo, Muestra, Muestras, ConRotulo, SpecsMedidas, TablaPartes } from '@/design-system/kit'
import {
  AccionesGuardado, CamposCredenciales, ContactoCard, ContractedWith, CredentialsDrawer, DatoPerfil, EstadoPerfilPill,
  ReplaceContactDrawer, type Credenciales, type EstadoPerfil,
} from './BillingProfile'
import { IdentidadLocacion, LocationBillingProfile } from './LocationBillingProfile'
import { ContactosProvider, ProviderBillingProfile } from './ProviderBillingProfile'

/* Playground, Parts, States y Specs del Billing Profile de Location y de provider. Decisiones en
   design-reference/figma/modulos/billing-profile.md. */

type Args = { owner: 'Location · Abril' | 'Location · Bayside' | 'Provider · Elena Martinez' | 'Provider · Emily Chen' }

const conStores = (hijos: ReactNode) => <FinanzasProvider><BillingProfilesProvider>{hijos}</BillingProfilesProvider></FinanzasProvider>

const meta = {
  title: 'Components/Settings/BillingProfile',
  parameters: {
    layout: 'padded',
    docs: {
      decisionsFrom: ['components/settings/BillingProfile.tsx', 'components/settings/LocationBillingProfile.tsx', 'components/settings/ProviderBillingProfile.tsx'],
      jira: ['CON-4019', 'CON-4021', 'CON-4026', 'CON-4027', 'CON-4028', 'CON-4033', 'CON-4003', 'CON-4004', 'CON-4005', 'CON-4006', 'CON-4007'],
      story: { inline: false, iframeHeight: 760 },
      description: {
        component: [
          'La pestaña **Insurance / Billing Profile** de una Location (epic CON-4019) y de un provider (epic CON-4003): con qué nombre, dirección, teléfono, NPI y Tax ID factura, y con qué carriers tiene contrato (*Contracted With*).',
          '',
          '**Cómo se usa:** la Location lo habilita con el switch *Use this Location as a Billing Provider* y *Save and enable* (CON-4021): sólo queda activo con credenciales válidas. El provider no tiene switch: el perfil se prepara al guardar *Primary Provider* en Provider Info (CON-4004). Deshabilitado, todo se ve de lectura (CON-4028, CON-4007). Si el perfil está elegido en Insurance Defaults no se puede deshabilitar (CON-4032, CON-4031).',
          '',
          '**Probalo:** en *Playground* elegí de quién es el perfil desde *Controls* (Abril arranca sin configurar, Bayside ya está activa). *Parts* dice qué hace cada pieza, *States* muestra cada estado del perfil y de sus piezas, y *Specs* las medidas leídas en vivo.',
        ].join('\n'),
      },
    },
  },
  args: { owner: 'Location · Abril' },
  argTypes: {
    owner: { control: 'select', options: ['Location · Abril', 'Location · Bayside', 'Provider · Elena Martinez', 'Provider · Emily Chen'], description: 'De quién es el perfil. Abril: sin configurar · Bayside: activa · Elena Martinez: Primary Provider · Emily Chen: todavía no lo es.' },
  },
  decorators: [(Story) => conStores(<div className="bg-page-background min-h-[640px] p-6"><Story /></div>)],
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>
const sinControles = { controls: { disable: true }, docs: { story: { inline: true } } }
const nada = () => {}

export const Playground: Story = {
  render: ({ owner }) => owner === 'Location · Abril' ? <LocationBillingProfile key={owner} locId="abril" nombreLocacion="Abril" />
    : owner === 'Location · Bayside' ? <LocationBillingProfile key={owner} locId="bayside" nombreLocacion="Bayside Dental" />
    : <ProviderBillingProfile key={owner} empleadoId={owner === 'Provider · Elena Martinez' ? 'elena-martinez' : 'emily-chen'} />,
}

/* ── Parts ─────────────────────────────────────────────────────────── */

const CREDENCIALES: Credenciales = { npi: '1234567890', tipoFiscal: 'TIN', fiscal: '123456789' }

/* La identidad de la Location con un perfil ya activo, tomado del store. */
function Identidad() {
  const { perfiles, guardarPerfil } = useBillingProfiles()
  const clave = claveLocacion('bayside')
  const [reemplazo, setReemplazo] = useState<'direccion' | 'telefono' | null>(null)
  return (
    <IdentidadLocacion
      perfil={perfiles[clave]} reemplazo={reemplazo} onReemplazar={setReemplazo} onCerrarReemplazo={() => setReemplazo(null)}
      onGuardar={(c) => { guardarPerfil(clave, { ...perfiles[clave], ...c }); return true }} onDirtyChange={nada}
    />
  )
}
function ContactosDelProvider({ editable }: { editable: boolean }) {
  const { perfiles } = useBillingProfiles()
  return <ContactosProvider perfil={perfiles[claveProvider('elena-martinez')]} editable={editable} onGuardar={() => true} onDirtyChange={nada} />
}

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Parts" nota="Location y provider comparten las piezas de BillingProfile.tsx; cada uno arma su pantalla con ellas.">
        <TablaPartes partes={[
          ['Status pill', 'El estado del perfil: Not configured, Pending activation, Active o Inactive.', 'EstadoPerfilPill'],
          ['Profile field', 'Un dato de lectura con su rótulo (Billing name, NPI, Tax ID).', 'DatoPerfil'],
          ['Contact card', 'Dirección o teléfono de billing. Replace elige otro del titular o abre el drawer para cargar uno nuevo; el anterior no se borra.', 'ContactoCard'],
          ['Replace drawer', 'Carga una dirección o un teléfono nuevo.', 'ReplaceContactDrawer'],
          ['Credentials', 'NPI (10 dígitos) y Tax ID (TIN o SSN, 9 dígitos), en la pantalla o en su drawer.', 'CamposCredenciales · CredentialsDrawer'],
          ['Contracted With', 'Los carriers, con buscador, filtro e índice por letra. Se tilda con cuáles hay contrato (CON-4027, CON-4006).', 'ContractedWith'],
          ['Save bar', 'Cancel y Save; avisa si hay cambios sin guardar.', 'AccionesGuardado'],
          ['Location identity', 'Nombre, dirección, teléfono y credenciales de la Location.', 'IdentidadLocacion'],
          ['Provider contacts', 'Dirección y teléfono de billing del provider.', 'ContactosProvider'],
        ]} />
      </Bloque>
      <Bloque titulo="Location identity"><Identidad /></Bloque>
      <Bloque titulo="Provider contacts"><ContactosDelProvider editable /></Bloque>
      <Bloque titulo="Contracted With"><ContractedWith guardados={{ aetna: true }} editable onGuardar={() => true} /></Bloque>
    </Lienzo>
  ),
}

/* ── States ────────────────────────────────────────────────────────── */

const ESTADOS: EstadoPerfil[] = ['Not configured', 'Pending activation', 'Active', 'Inactive']

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Profile status" nota="Not configured: nunca se cargó · Pending activation: el switch está prendido y falta guardar · Active · Inactive: se deshabilitó y queda de lectura.">
        <Muestras>{ESTADOS.map((e) => <ConRotulo key={e} rotulo={e}><EstadoPerfilPill estado={e} /></ConRotulo>)}</Muestras>
      </Bloque>
      <Bloque titulo="Contact card">
        <div className="grid gap-4 sm:grid-cols-2">
          <Muestra titulo="Default" nota="Con otros contactos del titular, Replace abre un menú."><ContactoCard titulo="Billing address" valor={'36 Main Street\nMiami, Florida 33131, United States'} opciones={['36 Main Street\nMiami, Florida 33131, United States', '900 Ocean Drive\nMiami, Florida 33139, United States']} onElegir={nada} onReemplazar={nada} /></Muestra>
          <Muestra titulo="New, not saved yet" nota="Lo cargado en esta pantalla lleva la marca New hasta guardar."><ContactoCard titulo="Billing phone" valor="+1 (305) 555-0142" nuevo onReemplazar={nada} /></Muestra>
          <Muestra titulo="Disabled" nota="Con el perfil deshabilitado no se puede reemplazar."><ContactoCard titulo="Billing address" valor={'36 Main Street\nMiami, Florida 33131, United States'} onReemplazar={nada} disabled /></Muestra>
        </div>
      </Bloque>
      <Bloque titulo="Credentials">
        <div className="grid gap-4 sm:grid-cols-2">
          <Muestra titulo="Filled"><CamposCredenciales valor={CREDENCIALES} onChange={nada} /></Muestra>
          <Muestra titulo="With validation errors" nota="Save and enable con datos inválidos."><CamposCredenciales valor={{ npi: '123', tipoFiscal: 'TIN', fiscal: '' }} onChange={nada} errores={{ npi: 'NPI must have 10 digits.', fiscal: 'Tax ID is required.' }} /></Muestra>
        </div>
      </Bloque>
      <Bloque titulo="Contracted With">
        <div className="grid gap-4">
          <Muestra titulo="Editable" nota="Perfil activo."><ContractedWith guardados={{ aetna: true, cigna: true }} editable onGuardar={() => true} /></Muestra>
          <Muestra titulo="Read only" nota="Perfil deshabilitado: se ve, no se cambia."><ContractedWith guardados={{ aetna: true }} editable={false} onGuardar={() => true} /></Muestra>
        </div>
      </Bloque>
      <Bloque titulo="Save bar">
        <div className="grid gap-4">
          <Muestra titulo="No changes" nota="Save queda apagado."><AccionesGuardado sucio={false} aviso="You have unsaved changes." onCancel={nada} onSave={nada} saveLabel="Save" /></Muestra>
          <Muestra titulo="Unsaved changes"><AccionesGuardado sucio aviso="You have unsaved changes." onCancel={nada} onSave={nada} saveLabel="Save carrier contracts" /></Muestra>
        </div>
      </Bloque>
      <Bloque titulo="Provider contacts · read only"><ContactosDelProvider editable={false} /></Bloque>
    </Lienzo>
  ),
}

/* Los drawers, cada uno en su iframe (son position: fixed). */
const enIframe = { layout: 'fullscreen' as const, controls: { disable: true }, docs: { story: { inline: false, iframeHeight: 640 } } }
export const ReplaceAddress: Story = { parameters: enIframe, render: () => <ReplaceContactDrawer tipo="direccion" onClose={nada} onUsar={nada} /> }
export const ReplacePhone: Story = { parameters: enIframe, render: () => <ReplaceContactDrawer tipo="telefono" onClose={nada} onUsar={nada} /> }
export const EditCredentials: Story = { parameters: enIframe, render: () => <CredentialsDrawer inicial={CREDENCIALES} onClose={nada} onGuardar={() => true} /> }

/* ── Specs ─────────────────────────────────────────────────────────── */

export const Specs: Story = {
  parameters: sinControles,
  render: () => (
    <SpecsMedidas piezas={[
      { nombre: 'Status pill', children: <EstadoPerfilPill estado="Active" /> },
      { nombre: 'Profile field', children: <DatoPerfil titulo="NPI">1234567890</DatoPerfil> },
      { nombre: 'Contact card', children: <ContactoCard titulo="Billing phone" valor="+1 (305) 555-0142" onReemplazar={nada} /> },
      { nombre: 'Replace button', selector: 'button', children: <ContactoCard titulo="Billing phone" valor="+1 (305) 555-0142" onReemplazar={nada} /> },
      { nombre: 'Save button', selector: 'button:last-of-type', children: <AccionesGuardado sucio aviso="You have unsaved changes." onCancel={nada} onSave={nada} saveLabel="Save" /> },
    ]} />
  ),
}
