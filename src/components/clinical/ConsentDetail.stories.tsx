import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { CASOS, type ConsentProcedimiento, type Procedimiento } from '@/data/treatment-plan'
import { Bloque, ConRotulo, Lienzo, Muestra, Muestras, SpecsMedidas, TablaPartes } from '@/design-system/kit'
import {
  ConsentDetail, EstadoConsentimiento, Firmado, FirmaPaciente, FirmaProveedor, PadFirma, VentanaFirma, VistaConsentimiento,
} from './ConsentDetail'

/* Playground, Parts, States y Specs del consentimiento de un procedimiento. Decisiones en
   design-reference/figma/modulos/clinical-mode.md (2026-11-02 y 2026-11-11) y consents.md. */

const PROCS = CASOS.flatMap((c) => c.visitas.flatMap((v) => v.procedimientos))
const con = (estado: ConsentProcedimiento): Procedimiento => PROCS.find((p) => p.consentimiento === estado) ?? { ...PROCS[0], consentimiento: estado }
const ESTADOS: ConsentProcedimiento[] = ['Not required', 'Not generated', 'Requested', 'Accepted', 'Rejected', 'Discarded']

type Args = { consent: 'Requested' | 'Accepted' | 'Rejected'; from: 'Consent column' | 'Sign now · Start' | 'Sign now · Complete' }

const meta = {
  title: 'Components/Clinical/ConsentDetail',
  parameters: {
    layout: 'fullscreen',
    docs: {
      jira: ['CON-4119', 'CON-2905', 'CON-2910', 'CON-2911', 'CON-2913', 'CON-2860', 'CON-2862', 'CON-2866', 'CON-2927', 'CON-2928'],
      story: { inline: false, iframeHeight: 760 },
      description: {
        component: [
          'El consentimiento de **un procedimiento** dentro de Treatment Plan: la hoja con las afirmaciones, las dos firmas (paciente y provider) y el estado. Se abre desde la columna *Consent* de la visita (CON-4119) o desde *Sign now* de Consent required.',
          '',
          '**Cómo se usa:** el paciente marca las afirmaciones en la hoja y recién ahí se habilita *Patient Signature* (CON-2910): adopta una firma con sus iniciales (CON-2860) o la dibuja (CON-2862). El provider firma en el portal seguro con su email y contraseña (CON-2911). Con las dos firmas el consentimiento queda **Accepted** (CON-2927); si el paciente lo rechaza, **Rejected** (CON-2928). Si vino de *Sign now*, al firmar se confirma el Start o Complete que se había pedido.',
          '',
          '**Probalo:** en *Playground* elegí el estado y desde dónde se abrió con *Controls*, marcá las casillas y firmá. *Parts* dice qué hace cada parte, *States* muestra los seis estados de la columna y las firmas, y *Specs* las medidas leídas en vivo.',
        ].join('\n'),
      },
    },
  },
  args: { consent: 'Requested', from: 'Consent column' },
  argTypes: {
    consent: { control: 'inline-radio', options: ['Requested', 'Accepted', 'Rejected'], description: 'El estado del consentimiento del procedimiento.' },
    from: { control: 'inline-radio', options: ['Consent column', 'Sign now · Start', 'Sign now · Complete'], description: 'Desde la columna Consent, o desde Sign now: ahí las firmas confirman el cambio de estado pedido.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>
const sinControles = { layout: 'padded' as const, controls: { disable: true }, docs: { story: { inline: true } } }
const enIframe = { layout: 'fullscreen' as const, controls: { disable: true }, docs: { story: { inline: false, iframeHeight: 620 } } }
const nada = () => {}

/* El detalle con las firmas en memoria: firmar las suma, como en Treatment Plan. */
function Demo({ consent, from }: Args) {
  const [p, setP] = useState(() => con(consent))
  return (
    <div className="bg-page-background min-h-[720px] p-6">
      <ConsentDetail
        procedimiento={p}
        pendiente={from === 'Consent column' ? undefined : { verbo: from === 'Sign now · Start' ? 'Start' : 'Complete', restantes: 0 }}
        onVolver={nada}
        onFirmar={(rol, rubrica) => setP((x) => ({ ...x, firmas: { ...x.firmas, [rol]: '11/13/2026' }, rubricas: { ...x.rubricas, [rol]: rubrica } }))}
      />
    </div>
  )
}

export const Playground: Story = { render: (args) => <Demo key={JSON.stringify(args)} {...args} /> }

/* ── Parts ─────────────────────────────────────────────────────────── */

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[
          ['Consent status', 'El estado en la columna Consent: ícono y palabra en el color del estado. Con onAbrir es un botón que lleva al detalle.', 'EstadoConsentimiento'],
          ['Consent sheet', 'La hoja del consentimiento con las afirmaciones y las dos líneas de firma.', 'ConsentDocument'],
          ['Signed mark', 'Quién firmó y cuándo, en lugar del botón de firma.', 'Firmado'],
          ['Patient signature', 'El paciente adopta una firma con su nombre e iniciales, o la dibuja.', 'FirmaPaciente'],
          ['Provider signature', 'El provider firma en el portal seguro con email y contraseña.', 'FirmaProveedor'],
          ['Signature window', 'El marco común de las dos ventanas de firma: título, bajada y pie con dos botones.', 'VentanaFirma'],
          ['Signature pad', 'El lienzo para dibujar la firma; devuelve la imagen o null si se borra.', 'PadFirma'],
          ['View consent', 'La hoja de lectura, sin firmar, que abre View consent desde Consent required.', 'VistaConsentimiento'],
        ]} />
      </Bloque>
      <Bloque titulo="Signed mark">
        <Muestras><ConRotulo rotulo="Patient"><Firmado rol="Patient" fecha="11/13/2026" /></ConRotulo><ConRotulo rotulo="Provider"><Firmado rol="Provider" fecha="11/13/2026" /></ConRotulo></Muestras>
      </Bloque>
      <Bloque titulo="Signature pad" nota="Dibujá con el mouse o el dedo."><div className="max-w-[420px]"><PadFirma onCambio={nada} /></div></Bloque>
    </Lienzo>
  ),
}

/* ── States ────────────────────────────────────────────────────────── */

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Consent status" nota="Los seis estados de CON-4119. Not required: el procedimiento no tiene template · Not generated: hay template y todavía no hay documento · Requested: se mandó y falta firmar · Accepted · Rejected · Discarded.">
        <Muestras>{ESTADOS.map((e) => <ConRotulo key={e} rotulo={e}><EstadoConsentimiento estado={e} /></ConRotulo>)}</Muestras>
      </Bloque>
      <Bloque titulo="As a button" nota="Con onAbrir abre el detalle; Not required no abre nada.">
        <Muestras>{ESTADOS.map((e) => <ConRotulo key={e} rotulo={e}><EstadoConsentimiento estado={e} onAbrir={nada} de="D2391" nombre="D2391 Resin-based composite" /></ConRotulo>)}</Muestras>
      </Bloque>
      <Bloque titulo="Detail by state">
        <div className="grid gap-6">
          <Muestra titulo="Requested" nota="Falta firmar: Patient Signature se habilita al marcar las afirmaciones."><ConsentDetail procedimiento={con('Requested')} onVolver={nada} onFirmar={nada} /></Muestra>
          <Muestra titulo="Accepted" nota="Las dos firmas: el documento queda de lectura."><ConsentDetail procedimiento={con('Accepted')} onVolver={nada} onFirmar={nada} /></Muestra>
          <Muestra titulo="Rejected" nota="El paciente lo rechazó: Sign now pide uno nuevo."><ConsentDetail procedimiento={con('Rejected')} onVolver={nada} onFirmar={nada} /></Muestra>
        </div>
      </Bloque>
    </Lienzo>
  ),
}

/* Las ventanas, cada una en su iframe (son position: fixed). */
export const PatientSignature: Story = { parameters: enIframe, render: () => <FirmaPaciente nombre="John Smith" descripcion="Procedure Consent - D2391 Resin-based composite – one surface, posterior" onClose={nada} onFirmar={nada} /> }
export const ProviderSignature: Story = { parameters: enIframe, render: () => <FirmaProveedor nombre="Dr. Perez Martinez" onClose={nada} onFirmar={nada} /> }
/* El botón de guardar disabled hasta que haya algo que firmar. */
export const SignatureWindowDisabled: Story = { parameters: enIframe, render: () => <VentanaFirma titulo="Patient signature" descripcion="Sign to accept this consent." guardar="Adopt and sign" guardarDeshabilitado onClose={nada} onGuardar={nada}><p className="text-[13px] text-ink-muted">Draw or adopt a signature to continue.</p></VentanaFirma> }
export const ViewConsent: Story = { parameters: enIframe, render: () => <VistaConsentimiento procedimiento={con('Requested')} onClose={nada} /> }

/* ── Specs ─────────────────────────────────────────────────────────── */

export const Specs: Story = {
  parameters: sinControles,
  render: () => (
    <SpecsMedidas piezas={[
      { nombre: 'Consent status', children: <EstadoConsentimiento estado="Requested" /> },
      { nombre: 'Consent status (button)', selector: 'button', children: <EstadoConsentimiento estado="Requested" onAbrir={nada} de="D2391" /> },
      { nombre: 'Signed mark', children: <Firmado rol="Patient" fecha="11/13/2026" /> },
      { nombre: 'Signature pad', selector: 'canvas', children: <PadFirma onCambio={nada} /> },
    ]} />
  ),
}
