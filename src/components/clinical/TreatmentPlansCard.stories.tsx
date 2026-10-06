import type { Meta, StoryObj } from '@storybook/react-vite'
import { TreatmentPlansCard } from './TreatmentPanel'
import { Bloque, Lienzo, Tabla, Token } from '@/design-system/kit'
import { esperar, pulsar, secuencia } from '@/design-system/play'

type Args = { width: number }

const meta = {
  title: 'Components/Clinical/Treatment plans card',
  parameters: {
    layout: 'padded',
    docs: {
      decisionsFrom: 'components/clinical/TreatmentPanel.tsx',
      description: {
        component: [
          'La card *Treatment plans* de la columna derecha de Treatment, en Clinical Mode: los planes del paciente (los tres primeros sin descartar) con el detalle de cada procedimiento.',
          '',
          '**Decisión:** Julián eligió esta opción (A) entre tres propuestas, porque muestra el detalle de cada procedimiento: estado, código, nombre, pieza, superficie y proveedor. Se probaron una con barra de avance por plan (B) y otra en línea de tiempo por visita (C).',
          '',
          '**Probalo:** en *Playground* abrí y cerrá los planes y usá el menú de un procedimiento.',
        ].join('\n'),
      },
    },
  },
  args: { width: 311 },
  argTypes: { width: { control: { type: 'range', min: 260, max: 420, step: 1 }, description: 'Ancho de la columna (311 en Treatment).' } },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

export const Playground: Story = {
  render: ({ width }) => <div style={{ width }}><TreatmentPlansCard /></div>,
}

export const Parts: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Parts">
        <Tabla encabezado={['Part', 'What it does']}>
          <tr><td className="font-semibold">Plan</td><td>Nombre del plan, plegable; el primero abre expandido.</td></tr>
          <tr><td className="font-semibold">Procedure</td><td>Tarjeta chica con borde verde: pill de estado, código y nombre.</td></tr>
          <tr><td className="font-semibold">Details</td><td>Tooth, Surface y Provider, con el rótulo en Semibold.</td></tr>
          <tr><td className="font-semibold">Menu</td><td>⋮ con Open in Treatment Plan, que abre el caso.</td></tr>
          <tr><td className="font-semibold">Limit</td><td>Los tres primeros procedimientos de cada plan.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="States">
        <Tabla encabezado={['State', 'When', 'Story']}>
          <tr><td className="font-semibold">Expanded</td><td>El primer plan al abrir, o el que se toca.</td><td className="text-ink-muted">Playground</td></tr>
          <tr><td className="font-semibold">Collapsed</td><td>Los demás planes: sólo el nombre y la flecha.</td><td className="text-ink-muted">Playground</td></tr>
          <tr><td className="font-semibold">Two open</td><td>Se pueden abrir varios a la vez.</td><td className="text-ink-muted">Second Plan Open</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

/* Abrir el segundo plan: quedan dos expandidos. */
export const SecondPlanOpen: Story = {
  render: ({ width }) => <div style={{ width }}><TreatmentPlansCard /></div>,
  play: secuencia(pulsar(/^periodontist alternative$/i), esperar(/periodontist alternative/i)),
}

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Measures">
        <Tabla encabezado={['Piece', 'Value']}>
          <tr><td className="font-semibold">Card</td><td className="tabular-nums">311px (la columna derecha de Treatment), padding 16px; card de la página: sombra y sin borde</td></tr>
          <tr><td className="font-semibold">Title</td><td className="tabular-nums">15px Bold</td></tr>
          <tr><td className="font-semibold">Plan name</td><td className="tabular-nums">12px Medium</td></tr>
          <tr><td className="font-semibold">Procedure</td><td className="tabular-nums">12px, código en Semibold; borde izquierdo de 2px</td></tr>
          <tr><td className="font-semibold">Details</td><td className="tabular-nums">10px</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Piece', 'Token']}>
          <tr><td className="font-semibold">Procedure background</td><td><Token nombre="surface-alt" /></td></tr>
          <tr><td className="font-semibold">Procedure border</td><td><Token nombre="status-ok" /></td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
