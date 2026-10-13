import type { Meta, StoryObj } from '@storybook/react-vite'
import { userEvent, within } from 'storybook/test'
import { aviso } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Bloque, Lienzo, Tabla, Token } from '@/design-system/kit'
import { esperar } from '@/design-system/play'
import { PROBLEMAS, PROCEDIMIENTOS } from '@/data/clinical-mode'
import {
  ContenidoConsentimiento, ContenidoDerivaciones, ContenidoExamen, FilasProblema, FilasProcedimiento,
  ContenidoHallazgos, ContenidoOrdenes, ContenidoProcedimientos, ContenidoTratamiento, DetalleRegistro,
  ContenidoAplicadas, ContenidoFinanzas, ContenidoSede, Metrica, cargoDe,
  RegistroCompletoDrawer, SeccionesProblema, SeccionesProcedimiento,
  type ContextoDetalle,
} from './RecordDetail'

/* En la app los links cambian de pestaña (ClinicalMode provee NavegacionClinica); acá avisan adónde irían. */
const CONTEXTO: ContextoDetalle = {
  problemas: PROBLEMAS,
  procedimientos: PROCEDIMIENTOS,
  onAbrirProblema: (p) => aviso.info(`Opens ${p.condicion} in Problem List.`),
  onAbrirProcedimiento: (p) => aviso.info(`Opens ${p.codigo} in Procedures.`),
}

const ANCHOS = { wide: 880, overlay: 790, narrow: 320 } as const
const PROC = Object.fromEntries(PROCEDIMIENTOS.map((p) => [`${p.codigo} · ${p.nombre.slice(0, 28)}`, p.id]))
const PROB = Object.fromEntries(PROBLEMAS.map((p) => [`${p.condicion} (${p.estado})`, p.id]))

type Args = { tipo: 'procedure' | 'problem'; procedure: string; problem: string; ancho: keyof typeof ANCHOS }

/* El detalle como queda en la tabla: fondo gris claro debajo de la fila, con la sangría del chevron. */
function EnFila({ tipo, procedure, problem, ancho }: Args) {
  const registro = tipo === 'procedure'
    ? { tipo: 'procedimiento' as const, r: PROCEDIMIENTOS.find((p) => p.id === procedure) ?? PROCEDIMIENTOS[0]! }
    : { tipo: 'problema' as const, r: PROBLEMAS.find((p) => p.id === problem) ?? PROBLEMAS[0]! }
  return (
    <TooltipProvider>
      <div className="rounded-lg border border-line-row bg-surface-subtle px-4 py-3 pl-11 text-[13px] text-ink-soft" style={{ width: ANCHOS[ancho] }}>
        <DetalleRegistro key={registro.r.id} registro={registro} contexto={CONTEXTO} />
      </div>
    </TooltipProvider>
  )
}

const meta = {
  title: 'Components/Clinical/RecordDetail',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'El detalle que se despliega en cada fila de la tabla del Overview de Clinical Mode (**Problem List** y **Procedures**), con el mismo desplegable del Ledger: el chevron, clic en la fila, y *Expand all / Collapse all* desde que hay una abierta (`rowDetail` de Elements / Tables).',
          '',
          '**Qué muestra:** lo que cuelga del registro, en una **lista sin cards**: una fila debajo de la otra, el título a la izquierda y los datos a la derecha, cada dato en una línea. Van por importancia (Julián, 2026-10-13). Un procedimiento: *Treatment* (el caso, su grupo, la visita con su turno, las otras visitas y los casos históricos), *Procedure consent*, *Findings / diagnoses*, *Referral* y *Lab order*, y después lo del cobro (prototipo *Expanded transaction detail*): *Clinic location*, *Financial details* (cargo, seguro, pagos y ajustes aplicados, y lo que falta de ese cargo) y *Applied transactions* (qué se aplicó, cuándo y cuánto; la referencia abre la transacción). Un problema: *Procedures*, *Treatment*, *Referral*, *Lab order* (con el procedimiento relacionado) y *Source exam*. Lo que no entra en el resumen se pliega detrás de "N more…". Las piezas de la lista son *Components / UI / DetailList*, las mismas del detalle del Ledger.',
          '',
          '**Reusa** lo que ya hay: el turno de la visita de Treatment Plan (`CitaVisita`), el estado de consentimiento de sus tablas, las pills de caso, de Lab Order y de la tabla, y el drawer para *View full record*. Cada link lleva a la pantalla donde se trabaja (Treatment Plan con el caso abierto, Lab Order, Referral, el examen) o abre el registro en la otra pestaña. Sólo lectura.',
          '',
          '**Probalo:** en *Playground* elegí un procedimiento o un problema y el ancho (la tabla del Overview, el flotante de un examen o un teléfono) desde *Controls*; abrí los "more" y tocá un link.',
        ].join('\n'),
      },
    },
  },
  args: { tipo: 'procedure', procedure: 'pr10', problem: 'p9', ancho: 'wide' },
  argTypes: {
    tipo: { name: 'record', control: 'inline-radio', options: ['procedure', 'problem'], description: 'Qué pestaña de la tabla.' },
    procedure: { control: 'select', options: Object.values(PROC), labels: Object.fromEntries(Object.entries(PROC).map(([k, v]) => [v, k])), description: 'El procedimiento de la fila.', if: { arg: 'tipo', eq: 'procedure' } },
    problem: { control: 'select', options: Object.values(PROB), labels: Object.fromEntries(Object.entries(PROB).map(([k, v]) => [v, k])), description: 'El problema de la fila.', if: { arg: 'tipo', eq: 'problem' } },
    ancho: { name: 'width', control: 'inline-radio', options: Object.keys(ANCHOS), description: 'wide 880 (Overview) · overlay 790 (View Problem List de un examen) · narrow 320 (teléfono: el título de cada fila va arriba).' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

/* Cambiá el registro y el ancho desde Controls. */
export const Playground: Story = { render: (args) => <EnFila {...args} /> }

/* ── Parts ─────────────────────────────────────────────────────────── */

const rProc = PROCEDIMIENTOS.find((p) => p.id === 'pr11')!
const p9 = PROBLEMAS.find((p) => p.id === 'p9')!

export const Parts: Story = {
  parameters: { controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <TooltipProvider>
      <Lienzo>
        <Bloque titulo="The detail, procedure" nota="Título completo y pieza arriba; la lista; al pie View full record y Read-only summary.">
          <EnFila tipo="procedure" procedure="pr10" problem="p9" ancho="wide" />
        </Bloque>
        <Bloque titulo="Rows of a procedure" nota="FilasProcedimiento, por importancia: Treatment, Procedure consent, Findings / diagnoses, Referral y Lab order, y después Clinic location, Financial details y Applied transactions (del cargo del Ledger).">
          <div className="@container flex w-[880px] max-w-full flex-col"><FilasProcedimiento r={rProc} c={CONTEXTO} /></div>
        </Bloque>
        <Bloque titulo="Rows of a problem" nota="FilasProblema, por importancia: Procedures, Treatment (sin visitas), Referral y Lab order con el procedimiento relacionado, y Source exam.">
          <div className="@container flex w-[880px] max-w-full flex-col"><FilasProblema r={p9} c={CONTEXTO} /></div>
        </Bloque>
        <Bloque titulo="What each part is">
          <Tabla encabezado={['Part', 'What it does', 'Component']} minimo={720} arriba>
            <tr><td className="font-semibold">Row</td><td>Una fila de la lista, sin card: título de 11px y la cuenta a la izquierda (arriba en angosto), los datos a la derecha. Una línea fina separa las filas.</td><td>FilaDetalle (UI / DetailList)</td></tr>
            <tr><td className="font-semibold">Entry</td><td>Un dato en una línea: rótulo opcional (Finding, Diagnosis), link o texto, su estado y el contexto.</td><td>Entrada (UI / DetailList)</td></tr>
            <tr><td className="font-semibold">Link</td><td>Lleva a donde vive el registro; la flecha dice que sale de la tabla.</td><td>EnlaceRegistro (UI / DetailList)</td></tr>
            <tr><td className="font-semibold">N more…</td><td>Lo que no entra en el resumen, plegado: visitas, casos históricos, hallazgos y diagnósticos.</td><td>MasItems (UI / DetailList)</td></tr>
            <tr><td className="font-semibold">Nothing linked</td><td>La fila queda y dice qué falta: así se sabe que no hay, no que no cargó.</td><td>Vacio (UI / DetailList)</td></tr>
            <tr><td className="font-semibold">Contents</td><td>Lo mismo en la fila y en el drawer: el drawer lo muestra todo, sin plegar.</td><td>ContenidoTratamiento, ContenidoOrdenes, ContenidoDerivaciones, ContenidoHallazgos, ContenidoConsentimiento, ContenidoProcedimientos, ContenidoExamen</td></tr>
            <tr><td className="font-semibold">Financial details</td><td>El cargo del Ledger que cobra el procedimiento: cargo original, seguro, pagos, ajustes y Outstanding balance (destacado: el saldo de ese cargo, no el de la cuenta). Sin cargo: Not charged yet.</td><td>ContenidoFinanzas, Metrica</td></tr>
            <tr><td className="font-semibold">Applied transactions</td><td>Fecha, tipo, la transacción (abre su registro de sólo lectura, el mismo del Ledger) y lo aplicado a este cargo.</td><td>ContenidoAplicadas</td></tr>
            <tr><td className="font-semibold">Clinic location</td><td>La sede donde se hizo (la del cargo). Se llama así para no confundirla con la columna Location de la tabla, que es la zona de la boca.</td><td>ContenidoSede</td></tr>
            <tr><td className="font-semibold">Full record</td><td>Drawer de sólo lectura: los datos de la fila de a dos y una sección por fila de la lista. Close y Edit.</td><td>RegistroCompletoDrawer, SeccionesProcedimiento, SeccionesProblema</td></tr>
          </Tabla>
        </Bloque>
      </Lienzo>
    </TooltipProvider>
  ),
}

/* ── States ────────────────────────────────────────────────────────── */

const procDe = (id: string) => PROCEDIMIENTOS.find((p) => p.id === id)!
const probDe = (id: string) => PROBLEMAS.find((p) => p.id === id)!

export const States: Story = {
  parameters: { controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <TooltipProvider>
      <Lienzo>
        <Bloque titulo="Procedure, everything linked" nota="Caso aceptado: la visita del procedimiento con su turno (No appointment avisa, como en Treatment Plan), una visita más plegada, la derivación y el consentimiento firmado.">
          <EnFila tipo="procedure" procedure="pr10" problem="p9" ancho="wide" />
        </Bloque>
        <Bloque titulo="Historical case and lab order" nota="El caso elegido de un grupo y la alternativa descartada, plegada en Historical case.">
          <EnFila tipo="procedure" procedure="pr4" problem="p9" ancho="wide" />
        </Bloque>
        <Bloque titulo="Before the case is accepted" nota="Planning, Pending o Presented: la visita sin turno y el consentimiento todavía no existe (la misma regla que Treatment Plan).">
          <EnFila tipo="procedure" procedure="pr11" problem="p9" ancho="wide" />
        </Bloque>
        <Bloque titulo="Charged and partly paid" nota="D4341: $310 cobrados, con pago, ajuste y transferencia aplicados; faltan $170.">
          <EnFila tipo="procedure" procedure="pr11" problem="p9" ancho="wide" />
        </Bloque>
        <Bloque titulo="Paid by insurance" nota="D0120: lo cubrió el seguro entero; Outstanding en $0.">
          <EnFila tipo="procedure" procedure="pr9" problem="p9" ancho="wide" />
        </Bloque>
        <Bloque titulo="Empty" nota="Nada vinculado: cada fila queda y dice qué no hay (No treatment linked, No lab orders linked…).">
          <EnFila tipo="procedure" procedure="pr1" problem="p9" ancho="wide" />
        </Bloque>
        <Bloque titulo="Problem with procedures" nota="El procedimiento que lo resuelve, su caso, y la derivación con el procedimiento relacionado.">
          <EnFila tipo="problem" procedure="pr10" problem="p9" ancho="wide" />
        </Bloque>
        <Bloque titulo="Problem with its own referral" nota="Un problema derivado sin procedimiento: la derivación es del problema.">
          <EnFila tipo="problem" procedure="pr10" problem="p11" ancho="wide" />
        </Bloque>
        <Bloque titulo="Overlay width" nota="790px, el flotante de View Problem List: la misma lista, con el título a la izquierda.">
          <EnFila tipo="procedure" procedure="pr6" problem="p9" ancho="overlay" />
        </Bloque>
        <Bloque titulo="Narrow" nota="Teléfono: el título de cada fila va arriba de sus datos. En la tabla, el detalle queda en la parte visible aunque la tabla scrollee de costado.">
          <EnFila tipo="procedure" procedure="pr10" problem="p9" ancho="narrow" />
        </Bloque>
      </Lienzo>
    </TooltipProvider>
  ),
}

/* El "more" abierto: la otra visita con su turno. El diagnóstico ya se ve sin abrir nada. */
export const MoreOpen: Story = {
  name: 'More open',
  args: { tipo: 'procedure', procedure: 'pr10', ancho: 'wide' },
  render: (args) => <EnFila {...args} />,
  play: async (c) => {
    const canvas = within(c.canvasElement)
    await userEvent.click(await canvas.findByRole('button', { name: /1 more visit/ }))
    await esperar(/May 4, 2026/)(c)
    await esperar(/K08\.9/)(c)
  },
}

/* View full record: el drawer con todo, sin plegar. */
export const FullRecord: Story = {
  name: 'Full record',
  parameters: { controls: { disable: true }, docs: { story: { inline: false, iframeHeight: 720 } } },
  render: () => (
    <TooltipProvider>
      <RegistroCompletoDrawer registro={{ tipo: 'procedimiento', r: procDe('pr10') }} contexto={CONTEXTO} onClose={() => {}} />
    </TooltipProvider>
  ),
}

/* El drawer de un problema: Source exam primero. */
export const FullRecordProblem: Story = {
  name: 'Full record · problem',
  parameters: { controls: { disable: true }, docs: { story: { inline: false, iframeHeight: 720 } } },
  render: () => (
    <TooltipProvider>
      <RegistroCompletoDrawer registro={{ tipo: 'problema', r: probDe('p5') }} contexto={CONTEXTO} onClose={() => {}} />
    </TooltipProvider>
  ),
}

/* Las secciones del drawer y los contenidos sueltos, para ver cada uno sin el marco. */
export const Contents: Story = {
  parameters: { controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <TooltipProvider>
      <Lienzo>
        <Bloque titulo="Drawer sections">
          <div className="grid w-[880px] max-w-full gap-8 md:grid-cols-2">
            <div className="flex flex-col gap-6"><SeccionesProcedimiento r={procDe('pr4')} c={CONTEXTO} /></div>
            <div className="flex flex-col gap-6"><SeccionesProblema r={probDe('p1')} c={CONTEXTO} /></div>
          </div>
        </Bloque>
        <Bloque titulo="Contents">
          <div className="grid w-[880px] max-w-full gap-6 md:grid-cols-3 [&>div]:flex [&>div]:flex-col [&>div]:gap-2">
            <div><ContenidoTratamiento t={undefined} /></div>
            <div><ContenidoOrdenes ordenes={[]} /><ContenidoDerivaciones derivaciones={[]} /></div>
            <div><ContenidoHallazgos hallazgos={[probDe('p5')]} onAbrir={CONTEXTO.onAbrirProblema} completo /></div>
            <div><ContenidoProcedimientos procedimientos={[procDe('pr6')]} onAbrir={CONTEXTO.onAbrirProcedimiento} /></div>
            <div><ContenidoConsentimiento t={undefined} /></div>
            <div><ContenidoExamen problema={probDe('p7')} /></div>
            <div><ContenidoSede cargo={cargoDe(procDe('pr11'))} /></div>
            <div className="md:col-span-2"><ContenidoFinanzas cargo={cargoDe(procDe('pr11'))} /></div>
            <div className="md:col-span-3"><ContenidoAplicadas cargo={cargoDe(procDe('pr11'))} /></div>
            <div><ContenidoFinanzas cargo={undefined} /><ContenidoAplicadas cargo={undefined} /></div>
            <div><dl className="grid grid-cols-2 gap-4"><Metrica label="Original charge" valor={310} /><Metrica label="Outstanding balance" valor={170} destacado /></dl></div>
          </div>
        </Bloque>
      </Lienzo>
    </TooltipProvider>
  ),
}

/* ── Specs ─────────────────────────────────────────────────────────── */

export const Specs: Story = {
  parameters: { controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Layout">
        <Tabla encabezado={['Item', 'Value']} minimo={560}>
          <tr><td className="font-semibold">List</td><td>Sin cards: una fila debajo de la otra, separadas por una línea de 1px. Padding vertical de 8px por fila.</td></tr>
          <tr><td className="font-semibold">Row title</td><td>Columna de 150px a la izquierda desde 448px de detalle; abajo de eso, arriba de los datos (container query: depende del ancho de la tabla, no de la pantalla).</td></tr>
          <tr><td className="font-semibold">Entry</td><td>Una línea de 24px como mínimo (el alto del botón de turno); si no entra, sigue en la siguiente.</td></tr>
          <tr><td className="font-semibold">Gap</td><td>12px entre el título del registro, la lista y el pie.</td></tr>
          <tr><td className="font-semibold">In the table</td><td>Debajo de la fila, con la sangría del chevron (44px) y fondo <code>surface-subtle</code>. Si la tabla scrollea de costado, el detalle queda fijo en la parte visible.</td></tr>
          <tr><td className="font-semibold">Financial details</td><td>Números en columnas de 112px como mínimo, tantas como entren (5 en el Overview, 2 en el teléfono); el monto abajo de su rótulo, 15px; el que falta pagar en Semibold <Token nombre="dash-blue" />.</td></tr>
          <tr><td className="font-semibold">Applied transactions</td><td>Tabla de 12px con encabezado de 11px <Token nombre="ink-muted" />; fecha MM/DD/YYYY y monto sin partir.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Type and color">
        <Tabla encabezado={['Item', 'Size', 'Color']} minimo={560}>
          <tr><td className="font-semibold">Record title</td><td>13px Semibold</td><td><Token nombre="ink" /></td></tr>
          <tr><td className="font-semibold">Row title</td><td>11px Semibold</td><td><Token nombre="ink-muted" /></td></tr>
          <tr><td className="font-semibold">Link</td><td>12px Medium, flecha 12px</td><td><Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Context line</td><td>11px</td><td><Token nombre="ink-muted" /></td></tr>
          <tr><td className="font-semibold">Nothing linked</td><td>12px</td><td><Token nombre="ink-faint" /></td></tr>
          <tr><td className="font-semibold">Divider between rows</td><td>1px</td><td><Token nombre="line-soft" /></td></tr>
          <tr><td className="font-semibold">Count</td><td>Count (Elements)</td><td><Token nombre="dash-count-bg" /></td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>Read-only: changing a status stays in the row menu. Edit in the full record says it is not in this release.</li>
          <li>A list, not cards: the detail should not take more room than the data it shows.</li>
          <li>Every row stays even when it is empty, so the detail always has the same shape and order.</li>
          <li>Show the first items in the summary (the visit of the procedure, the finding and its diagnosis); the rest goes behind “N more…”. The full record shows everything.</li>
          <li>Statuses use the pills of their own screen: cases as in Treatment Plan, lab orders as in Lab Order, consent as in the visit table.</li>
          <li>No appointment and no consent before the case is accepted (Planning, Pending, Presented), as in Treatment Plan.</li>
        </ul>
      </Bloque>
    </Lienzo>
  ),
}
