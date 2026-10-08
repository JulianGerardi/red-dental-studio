import type { Meta, StoryObj } from '@storybook/react-vite'
import { userEvent, within } from 'storybook/test'
import { aviso } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Bloque, Lienzo, Tabla, Token } from '@/design-system/kit'
import { esperar } from '@/design-system/play'
import { PROBLEMAS, PROCEDIMIENTOS } from '@/data/clinical-mode'
import {
  BloqueDetalle, BloquesProblema, BloquesProcedimiento, ContenidoConsentimiento, ContenidoDerivaciones, ContenidoExamen,
  ContenidoHallazgos, ContenidoOrdenes, ContenidoProcedimientos, ContenidoTratamiento, DetalleRegistro, EnlaceRegistro,
  Entrada, MasItems, RegistroCompletoDrawer, SeccionesProblema, SeccionesProcedimiento, SubtituloBloque, Vacio,
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
          '**Qué muestra:** lo que cuelga del registro, en bloques chicos (card adentro de un panel). Un procedimiento: *Treatment* (estado del grupo, el caso, la visita con su turno, las otras visitas y los casos históricos), *Lab order* y *Referral*, *Findings / diagnoses* y *Procedure consent*. Un problema: *Procedures*, *Treatment*, *Lab order* y *Referral* (con el procedimiento relacionado) y *Source exam*. Lo que no entra en el resumen se pliega detrás de "N more…".',
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
    ancho: { name: 'width', control: 'inline-radio', options: Object.keys(ANCHOS), description: 'wide 880 (Overview, 3 columnas) · overlay 790 (View Problem List de un examen, 3) · narrow 320 (teléfono, 1).' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

/* Cambiá el registro y el ancho desde Controls. */
export const Playground: Story = { render: (args) => <EnFila {...args} /> }

/* ── Parts ─────────────────────────────────────────────────────────── */

const r10 = PROCEDIMIENTOS.find((p) => p.id === 'pr10')!
const p9 = PROBLEMAS.find((p) => p.id === 'p9')!

export const Parts: Story = {
  parameters: { controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <TooltipProvider>
      <Lienzo>
        <Bloque titulo="The detail, procedure" nota="Título completo y pieza arriba; los bloques; al pie View full record y Read-only summary.">
          <EnFila tipo="procedure" procedure="pr10" problem="p9" ancho="wide" />
        </Bloque>
        <Bloque titulo="Blocks of a procedure" nota="BloquesProcedimiento: Treatment, Lab order + Referral, Findings / diagnoses y el consentimiento a lo ancho.">
          <div className="@container w-[880px] max-w-full"><div className="grid gap-2.5 @md:grid-cols-2 @2xl:grid-cols-3"><BloquesProcedimiento r={r10} c={CONTEXTO} /></div></div>
        </Bloque>
        <Bloque titulo="Blocks of a problem" nota="BloquesProblema: Procedures, Treatment (sin visitas), Lab order + Referral con el procedimiento relacionado y Source exam a lo ancho.">
          <div className="@container w-[880px] max-w-full"><div className="grid gap-2.5 @md:grid-cols-2 @2xl:grid-cols-3"><BloquesProblema r={p9} c={CONTEXTO} /></div></div>
        </Bloque>
        <Bloque titulo="Pieces">
          <div className="grid w-[880px] max-w-full gap-3 md:grid-cols-3">
            <BloqueDetalle titulo="Block" cuenta={2}>
              <Entrada estado={<span className="text-[11px] text-ink-muted">status</span>} sub="Context line">
                <EnlaceRegistro onClick={() => aviso.info('Opens the record.')}>Link to the record</EnlaceRegistro>
              </Entrada>
              <Entrada rotulo="Label"><span className="text-[12px] text-ink">Plain value</span></Entrada>
              <SubtituloBloque titulo="Second list" cuenta={0} />
              <Vacio>Nothing linked.</Vacio>
            </BloqueDetalle>
            <BloqueDetalle titulo="Folded">
              <span className="text-[12px] text-ink">First item</span>
              <MasItems label="2 more items"><p className="text-[12px] text-ink">Second item</p><p className="text-[12px] text-ink">Third item</p></MasItems>
            </BloqueDetalle>
            <div className="@container md:col-span-3"><div className="grid @md:grid-cols-2 @2xl:grid-cols-3">
              <BloqueDetalle titulo="Wide block" ancho><span className="text-[12px] text-ink">One value across the row</span></BloqueDetalle>
            </div></div>
          </div>
        </Bloque>
        <Bloque titulo="What each part is">
          <Tabla encabezado={['Part', 'What it does', 'Component']} minimo={720} arriba>
            <tr><td className="font-semibold">Block</td><td>Card adentro del detalle (InnerCard): título de 11px y la cuenta de lo que lista.</td><td>BloqueDetalle</td></tr>
            <tr><td className="font-semibold">Wide block</td><td>Un solo dato: ocupa la fila con el título al costado (consentimiento, examen de origen).</td><td>BloqueDetalle ancho</td></tr>
            <tr><td className="font-semibold">Entry</td><td>Link o texto, el estado a la derecha y una línea de contexto. Rótulo opcional (Finding, Diagnosis).</td><td>Entrada</td></tr>
            <tr><td className="font-semibold">Link</td><td>Lleva a donde vive el registro; la flecha dice que sale de la tabla.</td><td>EnlaceRegistro</td></tr>
            <tr><td className="font-semibold">N more…</td><td>Lo que no entra en el resumen, plegado: visitas, casos históricos, hallazgos y diagnósticos.</td><td>MasItems</td></tr>
            <tr><td className="font-semibold">Second list</td><td>Referral dentro del bloque de Lab order.</td><td>SubtituloBloque</td></tr>
            <tr><td className="font-semibold">Nothing linked</td><td>El bloque queda y dice qué falta: así se sabe que no hay, no que no cargó.</td><td>Vacio</td></tr>
            <tr><td className="font-semibold">Contents</td><td>Lo mismo en el bloque y en el drawer: el drawer lo muestra todo, sin plegar.</td><td>ContenidoTratamiento, ContenidoOrdenes, ContenidoDerivaciones, ContenidoHallazgos, ContenidoConsentimiento, ContenidoProcedimientos, ContenidoExamen</td></tr>
            <tr><td className="font-semibold">Full record</td><td>Drawer de sólo lectura: los datos de la fila de a dos y una sección por bloque. Close y Edit.</td><td>RegistroCompletoDrawer, SeccionesProcedimiento, SeccionesProblema</td></tr>
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
        <Bloque titulo="Empty" nota="Nada vinculado: cada bloque queda y dice qué no hay (No treatment linked, No lab orders linked…).">
          <EnFila tipo="procedure" procedure="pr1" problem="p9" ancho="wide" />
        </Bloque>
        <Bloque titulo="Problem with procedures" nota="El procedimiento que lo resuelve, su caso, y la derivación con el procedimiento relacionado.">
          <EnFila tipo="problem" procedure="pr10" problem="p9" ancho="wide" />
        </Bloque>
        <Bloque titulo="Problem with its own referral" nota="Un problema derivado sin procedimiento: la derivación es del problema.">
          <EnFila tipo="problem" procedure="pr10" problem="p11" ancho="wide" />
        </Bloque>
        <Bloque titulo="Overlay width" nota="790px, el flotante de View Problem List: siguen las tres columnas.">
          <EnFila tipo="procedure" procedure="pr6" problem="p9" ancho="overlay" />
        </Bloque>
        <Bloque titulo="Narrow" nota="Teléfono: una columna. En la tabla, el detalle queda en la parte visible aunque la tabla scrollee de costado.">
          <EnFila tipo="procedure" procedure="pr10" problem="p9" ancho="narrow" />
        </Bloque>
      </Lienzo>
    </TooltipProvider>
  ),
}

/* Los "more" abiertos: la otra visita con su turno y el diagnóstico (ICD-10 y superficie). */
export const MoreOpen: Story = {
  name: 'More open',
  args: { tipo: 'procedure', procedure: 'pr10', ancho: 'wide' },
  render: (args) => <EnFila {...args} />,
  play: async (c) => {
    const canvas = within(c.canvasElement)
    await userEvent.click(await canvas.findByRole('button', { name: /1 more visit/ }))
    await userEvent.click(await canvas.findByRole('button', { name: /more finding/ }))
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
          <tr><td className="font-semibold">Columns</td><td>3 desde 672px de detalle · 2 desde 448 · 1 abajo (container query: depende del ancho de la tabla, no de la pantalla).</td></tr>
          <tr><td className="font-semibold">Gap</td><td>10px entre bloques · 12px entre el título, los bloques y el pie.</td></tr>
          <tr><td className="font-semibold">Block</td><td>Padding 12px, radio 8px, sombra <code>shadow-inner-card</code> (card adentro de un panel, sin borde real).</td></tr>
          <tr><td className="font-semibold">Wide block</td><td>Toda la fila; título de 120px al costado y el contenido baja abajo si no le quedan 220px.</td></tr>
          <tr><td className="font-semibold">In the table</td><td>Debajo de la fila, con la sangría del chevron (44px) y fondo <code>surface-subtle</code>. Si la tabla scrollea de costado, el detalle queda fijo en la parte visible.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Type and color">
        <Tabla encabezado={['Item', 'Size', 'Color']} minimo={560}>
          <tr><td className="font-semibold">Record title</td><td>13px Semibold</td><td><Token nombre="ink" /></td></tr>
          <tr><td className="font-semibold">Block title</td><td>11px Semibold</td><td><Token nombre="ink-muted" /></td></tr>
          <tr><td className="font-semibold">Link</td><td>12px Medium, flecha 12px</td><td><Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Context line</td><td>11px</td><td><Token nombre="ink-muted" /></td></tr>
          <tr><td className="font-semibold">Nothing linked</td><td>12px</td><td><Token nombre="ink-faint" /></td></tr>
          <tr><td className="font-semibold">Divider between entries</td><td>1px</td><td><Token nombre="line-soft" /></td></tr>
          <tr><td className="font-semibold">Count</td><td>Count (Elements)</td><td><Token nombre="dash-count-bg" /></td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>Read-only: changing a status stays in the row menu. Edit in the full record says it is not in this release.</li>
          <li>Every block stays even when it is empty, so the detail always has the same shape.</li>
          <li>Show one item per list in the summary; the rest goes behind “N more…”. The full record shows everything.</li>
          <li>Statuses use the pills of their own screen: cases as in Treatment Plan, lab orders as in Lab Order, consent as in the visit table.</li>
          <li>No appointment and no consent before the case is accepted (Planning, Pending, Presented), as in Treatment Plan.</li>
        </ul>
      </Bloque>
    </Lienzo>
  ),
}
