import type { Meta, StoryObj } from '@storybook/react-vite'
import { PlanProgressList, PlanTimeline, TreatmentPlansCard, type VarianteTreatmentPlans } from './TreatmentPanel'
import { CASOS } from '@/data/treatment-plan'
import { Bloque, ConRotulo, Lienzo, Muestras, Tabla, Token } from '@/design-system/kit'
import { pulsar, esperar, secuencia } from '@/design-system/play'

type Args = { variante: VarianteTreatmentPlans }

const PLANES = CASOS.filter((c) => c.estado !== 'Discarded').slice(0, 3)
const OPCIONES: [VarianteTreatmentPlans, string, string][] = [
  ['tarjetas', 'A · Cards', 'La publicada. Planes plegables; cada procedimiento en una tarjeta chica con borde verde, pill de estado, código, nombre, pieza, superficie y proveedor.'],
  ['progreso', 'B · Progress per plan', 'Misma lógica que A. Cada plan en su caja con estado, barra de avance, hechos/total y monto; los procedimientos encabezados por la pieza.'],
  ['recorrido', 'C · Timeline by visit', 'Un plan a la vez con flechas. Avance en tramos (uno por procedimiento) y los procedimientos en línea de tiempo por visita, con la fecha del turno.'],
]

const meta = {
  title: 'Components/Clinical/Treatment plans card',
  component: TreatmentPlansCard,
  parameters: {
    layout: 'padded',
    docs: {
      decisionsFrom: 'components/clinical/TreatmentPanel.tsx',
      description: {
        component: [
          'La card *Treatment plans* de la columna derecha de Treatment, en Clinical Mode: los planes del paciente (los tres primeros sin descartar) con el detalle de cada procedimiento.',
          '',
          '**Opciones:** A es la que está publicada; B y C son las propuestas nuevas, con el mismo detalle por procedimiento (estado, código, nombre, pieza, superficie, proveedor y menú). Julián elige.',
          '',
          '**Probalo:** en *Playground* cambiá la opción desde *Controls*; abrí y cerrá planes o pasá de plan con las flechas.',
        ].join('\n'),
      },
    },
  },
  args: { variante: 'tarjetas' },
  argTypes: {
    variante: { control: 'inline-radio', options: ['tarjetas', 'progreso', 'recorrido'], description: 'tarjetas (A, la publicada) · progreso (B) · recorrido (C).' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

/* Al ancho real de la columna: 311px. */
export const Playground: Story = {
  render: ({ variante }) => <div className="w-[311px]"><TreatmentPlansCard key={variante} variante={variante} /></div>,
}

/* Las tres opciones lado a lado, para comparar. */
export const Options: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo className="max-w-none">
      <div className="flex flex-wrap items-start gap-6">
        {OPCIONES.map(([v, rotulo, nota]) => (
          <div key={v} className="flex w-[311px] flex-col gap-2">
            <p className="text-[13px] font-semibold text-ink">{rotulo}</p>
            <p className="min-h-[54px] text-[12px] leading-snug text-ink-muted">{nota}</p>
            <TreatmentPlansCard variante={v} />
          </div>
        ))}
      </div>
    </Lienzo>
  ),
}

export const Parts: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="What every option shows" nota="Lo mismo en A, B y C: cambia cómo se ordena, no qué se ve.">
        <Tabla encabezado={['Part', 'A', 'B', 'C']} minimo={760}>
          <tr><td className="font-semibold">Plan</td><td>Nombre, plegable</td><td>Caja con nombre y estado del caso, plegable</td><td>Nombre con flechas y "Plan 1 of 3"</td></tr>
          <tr><td className="font-semibold">Progress</td><td>—</td><td>Barra, hechos/total y monto</td><td>Tramos por procedimiento, "x of y completed" y monto</td></tr>
          <tr><td className="font-semibold">Procedure</td><td>Pill de estado, código: nombre</td><td>Pieza destacada, código: nombre, punto de estado</td><td>Punto en la línea, código: nombre, pill de estado</td></tr>
          <tr><td className="font-semibold">Details</td><td colSpan={3}>Tooth, Surface y Provider en todas.</td></tr>
          <tr><td className="font-semibold">Menu</td><td colSpan={3}>⋮ con Open in Treatment Plan.</td></tr>
          <tr><td className="font-semibold">More</td><td>Los 3 primeros</td><td>Los 3 primeros y "See all N procedures"</td><td>Los 4 primeros por visita y "See all N procedures"</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo className="max-w-none">
      <Bloque titulo="B · Expanded and collapsed" nota="El primer plan abre expandido; los demás plegados muestran igual estado, avance y monto.">
        <div className="w-[279px]"><PlanProgressList casos={PLANES} /></div>
      </Bloque>
      <Bloque titulo="C · First and last plan" nota="En el primero la flecha de atrás queda disabled; en el último, la de adelante.">
        <Muestras>
          <ConRotulo rotulo="First plan"><div className="w-[279px]"><PlanTimeline casos={PLANES} tope={2} /></div></ConRotulo>
          <ConRotulo rotulo="Last plan"><div className="w-[279px]"><PlanTimeline casos={PLANES.slice(-1)} tope={2} /></div></ConRotulo>
        </Muestras>
      </Bloque>
    </Lienzo>
  ),
}

/* C: la flecha pasa al plan siguiente. */
export const TimelineNextPlan: Story = {
  args: { variante: 'recorrido' },
  render: ({ variante }) => <div className="w-[311px]"><TreatmentPlansCard variante={variante} /></div>,
  play: secuencia(pulsar(/^next plan$/i), esperar(/plan 2 of 3/i)),
}

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Measures">
        <Tabla encabezado={['Piece', 'Value']}>
          <tr><td className="font-semibold">Card</td><td className="tabular-nums">311px (la columna derecha de Treatment), padding 16px, radio 12px</td></tr>
          <tr><td className="font-semibold">Title</td><td className="tabular-nums">15px Bold</td></tr>
          <tr><td className="font-semibold">Procedure name</td><td className="tabular-nums">12px, código en Semibold</td></tr>
          <tr><td className="font-semibold">Details</td><td className="tabular-nums">10px, rótulo en Semibold</td></tr>
          <tr><td className="font-semibold">B · Tooth badge</td><td className="tabular-nums">36 × 36px, "TOOTH" 8px y número 13px Bold</td></tr>
          <tr><td className="font-semibold">Progress bar</td><td className="tabular-nums">6px de alto</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Status colors" nota="Los del punto y la barra; la pill usa los tonos de Elements / Pills.">
        <Tabla encabezado={['Procedure status', 'Dot', 'Progress']}>
          <tr><td className="font-semibold">Planned</td><td><Token nombre="status-ok" /></td><td><Token nombre="line" /></td></tr>
          <tr><td className="font-semibold">Completed</td><td><Token nombre="dash-busy-fg" /></td><td><Token nombre="dash-busy-fg" /></td></tr>
          <tr><td className="font-semibold">Removed</td><td><Token nombre="ink-faint" /></td><td><Token nombre="line-soft" /></td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
