import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { userEvent, within } from 'storybook/test'
import { aviso } from '@/components/ui/toaster'
import { Bloque, Lienzo, Tabla, Token } from '@/design-system/kit'
import { esperar } from '@/design-system/play'
import { CASOS, NO_ASIGNADOS, type Caso, type Procedimiento } from '@/data/treatment-plan'
import { DetalleRegistro, registroDePlan, useVerRegistro } from './RecordDetail'
import { SIN_CONSENTIMIENTO_NI_TURNO, TablaProcedimientos } from './TreatmentPlanSection'

/* Las filas de ejemplo: las sueltas, un caso en Planning (se arrastra) y dos aceptados (con Consent). */
const FILAS = {
  unassigned: { titulo: 'Unassigned', caso: undefined, filas: NO_ASIGNADOS.slice(0, 4) },
  planning: { titulo: 'Periodontists Recommended · Visit 2 (Planning)', caso: 'c1', filas: CASOS[0]!.visitas[1]!.procedimientos },
  waiting: { titulo: 'Restorative Plan · Visit 1 (Waiting for consent)', caso: 'c3', filas: CASOS.find((c) => c.id === 'c3')!.visitas[0]!.procedimientos },
  accepted: { titulo: 'Bridge Option · Visit 1 (Accepted)', caso: 'c7', filas: CASOS.find((c) => c.id === 'c7')!.visitas[0]!.procedimientos },
} as const
type Clave = keyof typeof FILAS
const ANCHOS = { case: 1026, narrow: 360 } as const

type Args = { filas: Clave; detalle: boolean; seleccion: boolean; abierta: boolean; ancho: keyof typeof ANCHOS }

/* La tabla como en Treatment Plan: el caso de las filas (sin caso, sueltas) y el detalle de la Problem List. */
function Ejemplo({ filas: clave, detalle, seleccion, abierta, ancho }: Args) {
  const { filas, caso: casoId } = FILAS[clave]
  const caso: Caso | undefined = CASOS.find((c) => c.id === casoId)
  const { contexto, drawer } = useVerRegistro()
  const [abiertas, setAbiertas] = useState<string[]>(abierta ? [filas[0]!.id] : [])
  const [sel, setSel] = useState<string[]>([])
  const planificando = caso?.estado === 'Planning'
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white" style={{ width: ANCHOS[ancho], maxWidth: '100%' }}>
      {caso && <div className="bg-dash-blue px-4 py-2 text-[13px] font-semibold text-white">{caso.nombre}</div>}
      <TablaProcedimientos
        key={`${clave}-${abierta}`}
        filas={[...filas]}
        acciones={!!caso}
        consentimiento={!!caso && !SIN_CONSENTIMIENTO_NI_TURNO.includes(caso.estado)}
        arrastrable={planificando}
        sinMenu={!!caso && !planificando}
        seleccion={seleccion ? sel : undefined}
        onSeleccion={seleccion ? setSel : undefined}
        onAccion={(p: Procedimiento) => aviso.info(`Remove ${p.codigo}?`)}
        onCompletar={() => aviso.info('Opens Complete.')}
        detalle={detalle ? (p) => <DetalleRegistro registro={registroDePlan(p, caso)} contexto={contexto} /> : undefined}
        abiertas={abiertas}
        onAlternar={(id) => setAbiertas((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]))}
      />
      {drawer}
    </div>
  )
}

const meta = {
  title: 'Components/Clinical/TreatmentPlanSection table',
  parameters: {
    layout: 'padded',
    docs: {
      story: { inline: false, iframeHeight: 640 },
      description: {
        component: [
          'La tabla de procedimientos de Treatment Plan (`TablaProcedimientos`), la de **Unassigned** y la de cada visita de un caso.',
          '',
          '**Cada fila se despliega** con el detalle de la Problem List (Julián, 2026-10-13): chevron al inicio, clic en cualquier lado de la fila menos en sus controles, y *Collapse all / Expand all* desde que hay una abierta. El detalle es el de *Components / Clinical / RecordDetail*: el caso que se está viendo con la visita y su turno, **Procedure consent** (el estado del consentimiento de ese procedimiento), los hallazgos, derivaciones y órdenes del procedimiento del paciente que es, y lo cobrado. Un procedimiento suelto no tiene caso ni consentimiento: esas filas quedan y lo dicen. Un hallazgo vinculado se abre en el drawer, sin salir de Treatment Plan.',
          '',
          'La columna **Procedure** corta los nombres largos (tooltip con el nombre entero, y el detalle lo muestra completo) para que la tabla no se estire: a 1440 entra entera, Consent y Actions incluidas.',
          '',
          '**Probalo:** en *Playground* elegí las filas (sueltas, Planning, Waiting for consent o Accepted), la selección y el ancho desde *Controls*, y abrí una fila.',
        ].join('\n'),
      },
    },
  },
  args: { filas: 'waiting', detalle: true, seleccion: true, abierta: true, ancho: 'case' },
  argTypes: {
    filas: { name: 'rows', control: 'inline-radio', options: Object.keys(FILAS), labels: Object.fromEntries(Object.entries(FILAS).map(([k, v]) => [k, v.titulo])), description: 'Las sueltas (Unassigned) o una visita de un caso en Planning, Waiting for consent o Accepted.' },
    detalle: { name: 'row detail', control: 'boolean', description: 'Con `detalle`: chevron y la fila se despliega.' },
    seleccion: { name: 'selection', control: 'boolean', description: 'La columna de casillas.' },
    abierta: { name: 'first row open', control: 'boolean', description: 'Arranca con la primera fila desplegada.' },
    ancho: { name: 'width', control: 'inline-radio', options: Object.keys(ANCHOS), description: 'case 1026 (el caso a 1440) · narrow 360 (teléfono: la tabla scrollea y el detalle queda en la parte visible).' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

/* Cambiá las filas, la selección y el ancho desde Controls. */
export const Playground: Story = { render: (a) => <Ejemplo {...a} /> }

export const Parts: Story = {
  parameters: { controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="A row open" nota="Restorative Plan, Waiting for consent: la visita con su turno, el consentimiento Pending y el hallazgo con su diagnóstico.">
        <Ejemplo filas="waiting" detalle seleccion abierta ancho="case" />
      </Bloque>
      <Bloque titulo="What each part is">
        <Tabla encabezado={['Part', 'What it does', 'Component']} minimo={720} arriba>
          <tr><td className="font-semibold">Chevron</td><td>Columna de 28px al inicio (después del arrastre en Planning); gira al abrir.</td><td>TablaProcedimientos (`detalle`)</td></tr>
          <tr><td className="font-semibold">Row</td><td>Clic o Enter / Espacio la abre y la cierra; los clics en la casilla, el menú y los íconos no. Abierta, fondo gris claro; marcada, celeste.</td><td>TablaProcedimientos</td></tr>
          <tr><td className="font-semibold">Detail</td><td>Debajo de la fila, a lo ancho de la parte visible de la tabla, con la sangría del chevron.</td><td>DetalleRegistro + registroDePlan (RecordDetail)</td></tr>
          <tr><td className="font-semibold">Collapse all / Expand all</td><td>Arriba de las visitas del caso (uno para todas) o arriba de Unassigned, desde que hay una fila abierta.</td><td>BotonExpandirTodo (Ledger)</td></tr>
          <tr><td className="font-semibold">Procedure</td><td>Corta el nombre con "…"; el tooltip y el título del detalle lo muestran entero.</td><td>—</td></tr>
          <tr><td className="font-semibold">Linked record</td><td>Un hallazgo o procedimiento vinculado se abre en el drawer de View full record; el caso, en Treatment Plan mismo.</td><td>useVerRegistro (RecordDetail)</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Closed" nota="Las filas con su chevron, ninguna abierta.">
        <Ejemplo filas="waiting" detalle seleccion abierta={false} ancho="case" />
      </Bloque>
      <Bloque titulo="Unassigned, open" nota="Un procedimiento suelto: sin caso ni consentimiento; las filas quedan y dicen qué no hay.">
        <Ejemplo filas="unassigned" detalle seleccion abierta ancho="case" />
      </Bloque>
      <Bloque titulo="Before the case is accepted" nota="Planning: sin turno y el consentimiento se genera al aceptar; se arrastra a otra visita.">
        <Ejemplo filas="planning" detalle seleccion abierta ancho="case" />
      </Bloque>
      <Bloque titulo="Accepted, consent signed" nota="Bridge Option: consentimiento Signed y el caso histórico del grupo plegado.">
        <Ejemplo filas="accepted" detalle seleccion abierta ancho="case" />
      </Bloque>
      <Bloque titulo="Without detail" nota="Sin `detalle`, la tabla de antes: sin chevron y la fila no se abre.">
        <Ejemplo filas="unassigned" detalle={false} seleccion={false} abierta={false} ancho="case" />
      </Bloque>
      <Bloque titulo="Narrow" nota="Teléfono: la tabla scrollea de costado y el detalle queda en la parte visible.">
        <Ejemplo filas="waiting" detalle seleccion={false} abierta ancho="narrow" />
      </Bloque>
    </Lienzo>
  ),
}

/* Abrir una fila y después el hallazgo vinculado: el drawer de la Problem List. */
export const LinkedFindingOpen: Story = {
  name: 'Linked finding open',
  parameters: { docs: { story: { inline: false, iframeHeight: 720 } } },
  args: { filas: 'waiting', detalle: true, seleccion: true, abierta: true, ancho: 'case' },
  render: (a) => <Ejemplo {...a} />,
  play: async (c) => {
    await userEvent.click(await within(c.canvasElement).findByRole('button', { name: /^Chronic enamel dental caries · Tooth 3/ }))
    await esperar(/Source exam/)(c)
  },
}

export const Specs: Story = {
  parameters: { controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Layout">
        <Tabla encabezado={['Item', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Chevron column</td><td>28px; ícono de 16px <Token nombre="ink-faint" />, gira 90° abierta.</td></tr>
          <tr><td className="font-semibold">Open row</td><td>Fondo <Token nombre="surface-subtle" />, igual que el detalle; marcada gana el celeste <Token nombre="dash-count-bg" />.</td></tr>
          <tr><td className="font-semibold">Detail</td><td>Padding 12px 16px y 44px a la izquierda (la sangría del chevron, como DataTable). Fijo en la parte visible si la tabla scrollea.</td></tr>
          <tr><td className="font-semibold">Procedure</td><td>Ocupa lo que sobra, 160px como mínimo; corta con "…" en una línea.</td></tr>
          <tr><td className="font-semibold">Location</td><td>Sin partir (Upper Arch en una línea).</td></tr>
          <tr><td className="font-semibold">Fit</td><td>A 1440 la visita de un caso aceptado entra entera (1026px); más angosto, la tabla scrollea de costado como antes.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>The same detail as the Problem List, so a procedure reads the same wherever it is opened.</li>
          <li>Opening a row never selects it: the checkbox and the row menu keep their own clicks.</li>
          <li>No consent and no appointment before the case is accepted; a loose procedure has neither.</li>
        </ul>
      </Bloque>
    </Lienzo>
  ),
}
