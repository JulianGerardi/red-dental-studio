import { useEffect, useState, type ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/components/ui/button'
import { aviso } from '@/components/ui/toaster'
import { Bloque, Lienzo, Muestra, Tabla, TablaPartes, Token } from '@/design-system/kit'
import {
  ConsentRequiredDialog, ResumenConsentimiento, avisarCasoNoListo, consentimientoRequerido, type ProcedimientoResumen,
} from './ConsentRequiredDialog'

/* Playground, Parts, States y Specs. Los diálogos son position: fixed: cada estado va en su propio iframe
   (clinical-mode.md, 2026-10-17). */

type Args = { variant: 'No consent sent' | 'Signature pending'; procedures: 1 | 3 | 8; sending: boolean }

const meta = {
  title: 'Components/Clinical/ConsentRequiredDialog',
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 560 },
      description: {
        component: [
          'Frena el cambio de estado de un procedimiento cuando su consentimiento no está firmado y deja elegir cómo seguir (CON-3927, CON-3946, CON-3950; prototipo *Consent modals revised*). Sale al tocar **Complete** en Treatment Plan y **Start** en la tabla Procedures del Overview.',
          '',
          '**Cómo se usa:** *No consent sent* (sin documento, borrador sin mandar o vencido) ofrece mandarlo para firmar después o firmar ahora; *Signature pending* (ya se mandó) ofrece firmar ahora o seguir con la firma pendiente, sin mandar otro. *Sign now* abre la revisión y la firma, no es una firma. Cancel y la X dejan el procedimiento como estaba. Si el caso todavía no está aceptado no hay diálogo: sale un aviso de error con *View case*.',
          '',
          '**Probalo:** en *Playground* elegí la variante, cuántos procedimientos y el estado de envío desde *Controls*. *Parts* dice qué hace cada parte y cada botón, *States* muestra cada caso (todo se puede usar) y *Specs* trae medidas y colores.',
        ].join('\n'),
      },
    },
  },
  args: { variant: 'No consent sent', procedures: 1, sending: false },
  argTypes: {
    variant: { control: 'inline-radio', options: ['No consent sent', 'Signature pending'], description: 'No consent sent: sin documento, borrador o vencido · Signature pending: ya se mandó y falta la firma.' },
    procedures: { control: 'inline-radio', options: [1, 3, 8], description: 'Cuántos procedimientos cambian de estado (Complete con filas marcadas). Con muchos, la lista scrollea adentro.' },
    sending: { control: 'boolean', description: 'Mientras se manda el documento: spinner en la acción principal y los otros botones deshabilitados.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

const PROCS: ProcedimientoResumen[] = [
  { id: 'a', codigo: 'D2740', nombre: 'Crown – porcelain/ceramic', pieza: 19 },
  { id: 'b', codigo: 'D2391', nombre: 'Resin-based composite – one surface, posterior', pieza: 3 },
  { id: 'c', codigo: 'D0120', nombre: 'Periodic oral evaluation' },
  { id: 'd', codigo: 'D2392', nombre: 'Resin-based composite – two surfaces, posterior', pieza: 14 },
  { id: 'e', codigo: 'D7140', nombre: 'Extraction – erupted tooth or exposed root', pieza: 16 },
  { id: 'f', codigo: 'D3330', nombre: 'Endodontic therapy, molar tooth', pieza: 30 },
  { id: 'g', codigo: 'D4341', nombre: 'Periodontal scaling and root planing – four or more teeth per quadrant' },
  { id: 'h', codigo: 'D1110', nombre: 'Prophylaxis – adult' },
]

const enIframe = { layout: 'fullscreen', controls: { disable: true }, docs: { story: { inline: false, iframeHeight: 560 } } }

/* El diálogo abierto sobre una página vacía; el botón lo vuelve a abrir. Sign now y Continue avisan lo que harían. */
function Demo({ tipo, cuantos = 1, enviando }: { tipo: 'sin-enviar' | 'pendiente'; cuantos?: number; enviando?: boolean }) {
  const [abierto, setAbierto] = useState(true)
  return (
    <div className="bg-page-background min-h-[520px] p-6">
      <Button variant="secondary" onClick={() => setAbierto(true)}>Open Consent required</Button>
      {abierto && (
        <ConsentRequiredDialog
          tipo={tipo}
          procedimientos={PROCS.slice(0, cuantos)}
          caso="Restorative Plan"
          enviando={enviando}
          onCancel={() => { setAbierto(false); aviso.info('Cancelled. The procedure status is unchanged.') }}
          onSignNow={() => { setAbierto(false); aviso.info('Opens the review and signature workflow. Sign now is not a signature.') }}
          onContinue={() => { setAbierto(false); aviso.ok(tipo === 'sin-enviar' ? 'Status applied. Consent sent to the patient.' : 'Status applied. Consent signature pending.') }}
          onViewConsent={() => aviso.info('Opens the existing consent document.')}
        />
      )}
    </div>
  )
}

/* Cambiá todo desde Controls. En su propio iframe, para que el diálogo se abra adentro. */
export const Playground: Story = {
  render: ({ variant, procedures, sending }) => (
    <Demo key={`${variant}-${procedures}-${sending}`} tipo={variant === 'No consent sent' ? 'sin-enviar' : 'pendiente'} cuantos={procedures} enviando={sending} />
  ),
}

/* ── Parts ─────────────────────────────────────────────────────────── */

export const Parts: Story = {
  parameters: { controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Parts" nota="Es un ConfirmDialog con ícono y una tercera salida: la pregunta se contesta sin cargar nada, por eso no es un drawer.">
        <TablaPartes partes={[
          ['Warning icon', 'Círculo ámbar con el signo de alerta: la acción pedida quedó frenada por algo que falta.', 'ConfirmDialog icon="warning"'],
          ['Title', '"Consent required". Dice qué falta, no una pregunta de sí o no.', 'ConfirmDialog title'],
          ['Message', 'Qué pasa y qué se puede hacer. En plural cuando son varios procedimientos.', 'ConsentRequiredDialog'],
          ['Summary', 'Procedimientos (código, nombre y pieza), el paciente y el caso. Con muchos, scrollea adentro.', 'ResumenConsentimiento'],
          ['View consent', 'Link al documento que ya existe. Sólo en Signature pending; no cierra el diálogo.', 'ConsentRequiredDialog'],
          ['Actions', 'Cancel · Sign now · acción principal, en ese orden y alineadas a la derecha.', 'ConfirmDialog otherAction'],
        ]} />
      </Bloque>
      <Bloque titulo="What each button does" nota="El estado que se pidió (Completed, In progress…) sólo cambia con la acción principal.">
        <Tabla encabezado={['Variant', 'Cancel / ✕ / Esc', 'Sign now', 'Primary action', 'Procedure status']} minimo={760} arriba>
          <tr>
            <td className="font-semibold">No consent sent</td>
            <td>Cierra. Nada cambia.</td>
            <td>Abre la revisión y la firma. No es una firma: el estado no cambia.</td>
            <td><strong>Send consent and sign later</strong>: manda el documento (o reusa el borrador que había) y sigue, sin otra confirmación.</td>
            <td>Cambia; el consentimiento queda Pending.</td>
          </tr>
          <tr>
            <td className="font-semibold">Signature pending</td>
            <td>Cierra. Nada cambia.</td>
            <td>Abre la revisión y la firma del documento que ya existe.</td>
            <td><strong>Continue without signed consent</strong>: sigue con la firma pendiente. No manda otro documento ni lo reenvía.</td>
            <td>Cambia; el consentimiento sigue Pending.</td>
          </tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="When it appears" nota="Con varios procedimientos manda el peor caso: si uno no se mandó, es No consent sent.">
        <Tabla encabezado={['Case', 'Consent', 'What happens']} minimo={640} arriba>
          <tr><td className="font-semibold">Not accepted (Planning, Pending, Presented)</td><td>—</td><td>No hay diálogo: aviso de error <em>Procedure cannot be updated</em> con <em>View case</em>.</td></tr>
          <tr><td className="font-semibold">Accepted o Waiting for consent</td><td>Signed</td><td>No hay diálogo: el estado cambia.</td></tr>
          <tr><td className="font-semibold">Accepted o Waiting for consent</td><td>Pending</td><td>Signature pending.</td></tr>
          <tr><td className="font-semibold">Accepted o Waiting for consent</td><td>Not sent o Expired</td><td>No consent sent.</td></tr>
          <tr><td className="font-semibold">Procedimiento suelto (sin caso)</td><td>—</td><td>No hay diálogo: no lleva consentimiento.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Where it is used">
        <Tabla encabezado={['Screen', 'Trigger']} minimo={560}>
          <tr><td className="font-semibold">Treatment Plan › caso aceptado</td><td>Complete de una fila o de las marcadas → Confirm en Complete Procedure.</td></tr>
          <tr><td className="font-semibold">Overview › Procedures</td><td>Start en el menú de la fila.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

/* ── States (cada uno en su iframe) ───────────────────────────────── */

const ESTADOS: [string, string, string][] = [
  ['No consent sent', 'Sin documento, borrador sin mandar o vencido.', 'NoConsentSent'],
  ['Signature pending', 'El documento se mandó y falta la firma; suma View consent.', 'SignaturePending'],
  ['Several procedures', 'Complete con varias filas marcadas: texto en plural y lista con scroll adentro.', 'SeveralProcedures'],
  ['Sending', 'Mientras se manda el documento: spinner en la acción principal y los demás botones deshabilitados (loading).', 'Sending'],
  ['Case not ready', 'El caso no está aceptado: no hay diálogo, sale el aviso de error con View case.', 'CaseNotReady'],
]

export const States: Story = {
  parameters: { controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="States" nota="Cada estado es su propia historia, en su iframe, porque el diálogo es position: fixed. Abrilas desde la barra lateral de Storybook.">
        <Tabla encabezado={['State', 'When', 'Story']} minimo={640}>
          {ESTADOS.map(([estado, cuando, historia]) => (
            <tr key={estado}>
              <td className="font-semibold whitespace-nowrap">{estado}</td>
              <td className="text-ink-medium">{cuando}</td>
              <td className="font-mono text-[12px] text-ink-muted">{historia}</td>
            </tr>
          ))}
        </Tabla>
      </Bloque>
      <Bloque titulo="Summary" nota="La caja que dice qué cambia, sola: con uno, con uno sin pieza y con varios.">
        <div className="flex flex-wrap items-start gap-x-6 gap-y-8">
          <Muestra titulo="One procedure" ancho={420}><ResumenConsentimiento procedimientos={PROCS.slice(0, 1)} caso="Restorative Plan" /></Muestra>
          <Muestra titulo="Without a tooth" nota="Un procedimiento que no es de un diente no lleva Tooth #." ancho={420}><ResumenConsentimiento procedimientos={PROCS.slice(2, 3)} caso="Restorative Plan" /></Muestra>
          <Muestra titulo="Several" nota="Con más de cuatro, la lista scrollea adentro (120px)." ancho={420}><ResumenConsentimiento procedimientos={PROCS} caso="Restorative Plan" /></Muestra>
        </div>
      </Bloque>
    </Lienzo>
  ),
}

export const NoConsentSent: Story = {
  parameters: enIframe,
  render: () => <Demo tipo="sin-enviar" />,
}
export const SignaturePending: Story = {
  parameters: enIframe,
  render: () => <Demo tipo="pendiente" />,
}
export const SeveralProcedures: Story = {
  parameters: enIframe,
  render: () => <Demo tipo="sin-enviar" cuantos={8} />,
}
/* loading: la acción principal con spinner; Cancel y Sign now quedan disabled. */
export const Sending: Story = {
  parameters: enIframe,
  render: () => <Demo tipo="sin-enviar" cuantos={3} enviando />,
}

/* El aviso de error: sale solo al abrir la historia; el botón lo vuelve a mostrar. */
function CasoNoListo() {
  const mostrar = () => avisarCasoNoListo(() => aviso.info('Opens the treatment case.'))
  useEffect(() => { mostrar() }, [])
  return (
    <div className="bg-page-background min-h-[520px] p-6">
      <Button variant="secondary" onClick={mostrar}>Show error again</Button>
    </div>
  )
}
export const CaseNotReady: Story = {
  parameters: enIframe,
  render: () => <CasoNoListo />,
}

/* ── Specs ─────────────────────────────────────────────────────────── */

const Fila = ({ a, b }: { a: string; b: ReactNode }) => <tr><td className="font-semibold">{a}</td><td>{b}</td></tr>

/* Qué diálogo pide cada combinación; sin diálogo, el estado cambia directo. */
const NOMBRE = { 'sin-enviar': 'No consent sent', pendiente: 'Signature pending' } as const
const dialogo = (estados: Parameters<typeof consentimientoRequerido>[0]) => {
  const tipo = consentimientoRequerido(estados)
  return tipo ? NOMBRE[tipo] : 'None: the status changes'
}

export const Specs: Story = {
  parameters: { controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Specs">
        <Tabla encabezado={['Item', 'Value']} minimo={560}>
          <Fila a="Width" b="480px con tres acciones (420px el ConfirmDialog de dos), centrado; en el celular, el ancho menos 32px." />
          <Fila a="Padding / gap" b="20px de padding, 12px entre partes, 8px entre botones." />
          <Fila a="Icon" b="Círculo de 36px, ícono de 18px, con un aro ámbar al 20%." />
          <Fila a="Title" b="16px Bold, a la derecha del ícono." />
          <Fila a="Message" b="13px, interlineado relajado, ink-soft." />
          <Fila a="Summary" b="13px Semibold por procedimiento y 12px el paciente y el caso; lista de hasta 120px de alto con scroll." />
          <Fila a="Buttons" b="Cancel y Sign now secondary, la principal primary; tamaño md (32px). Debajo de 640px los tres crecen y se reparten el ancho." />
          <Fila a="Error toast" b="360px; título 13px Semibold, texto 12.5px, View case debajo del texto; dura 9s porque lleva acción." />
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Part', 'Token']} minimo={480}>
          <Fila a="Icon circle" b={<Token nombre="warn-bg" />} />
          <Fila a="Icon" b={<Token nombre="warn-fg" />} />
          <Fila a="Summary" b={<Token nombre="surface-alt" />} />
          <Fila a="Primary action" b={<Token nombre="dash-blue" />} />
          <Fila a="View consent" b={<Token nombre="dash-blue" />} />
        </Tabla>
      </Bloque>
      <Bloque titulo="Logic" nota="consentimientoRequerido() decide el diálogo; nada de esto se calcula en la pantalla.">
        <Tabla encabezado={['Consents of the procedures', 'Dialog']} minimo={560}>
          <Fila a="Todos Signed (o sin consentimiento)" b={dialogo(['Signed', undefined])} />
          <Fila a="Pending" b={dialogo(['Pending', 'Signed'])} />
          <Fila a="Not sent" b={dialogo(['Not sent'])} />
          <Fila a="Expired" b={dialogo(['Expired', 'Pending'])} />
          <Fila a="Pending y Not sent juntos" b={dialogo(['Pending', 'Not sent'])} />
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
