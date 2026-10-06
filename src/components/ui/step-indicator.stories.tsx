import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Conector, Insignia, StepIndicator } from './step-indicator'
import { Button } from '@/components/ui/button'
import { Bloque, ConRotulo, Lienzo, Muestras, Tabla, Token } from '@/design-system/kit'

type Args = { total: number; current: number; names: boolean }

const NOMBRES = ['Procedure', 'Surfaces', 'Link to finding', 'Review']

const meta = {
  title: 'Elements/StepIndicator',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Los pasos de un drawer con varias partes (`@/components/ui/step-indicator`). El drawer lo dibuja solo cuando recibe `steps`: New Patient, New Appointment, Edit Patient, New Location, New Employee, New Account, New Procedure, Post payment, las suscripciones.',
          '',
          '**Rótulos:** "Step" en todos los drawers, como en Confidentally 2.0; New Procedure muestra el nombre de cada paso (Procedure, Surfaces, Link to finding). El rótulo no ocupa ancho: la línea corre siempre de círculo a círculo, con "Step" o con nombres largos.',
          '',
          '**Al avanzar:** el tilde entra con un rebote, un anillo verde se abre y la línea se llena en verde hacia el paso siguiente.',
          '',
          '**Probalo:** en *Playground* cambiá la cantidad de pasos, el paso actual y los nombres desde *Controls*, y usá Next Step / Return.',
        ].join('\n'),
      },
    },
  },
  args: { total: 3, current: 2, names: false },
  argTypes: {
    total: { control: { type: 'range', min: 2, max: 4, step: 1 }, description: 'Cantidad de pasos.' },
    current: { control: { type: 'range', min: 1, max: 4, step: 1 }, description: 'Paso actual, desde 1.' },
    names: { control: 'boolean', description: 'Cada paso con su nombre en vez de "Step" (lo que usa New Procedure).' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

function Demo({ total, current, names }: Args) {
  const [paso, setPaso] = useState(Math.min(current, total))
  return (
    <div className="flex w-[420px] max-w-full flex-col gap-4 rounded-lg border border-line bg-white p-6">
      <StepIndicator total={total} current={paso} labels={names ? NOMBRES.slice(0, total) : undefined} />
      <div className="flex gap-3 [&>button]:flex-1">
        <Button variant="secondary" disabled={paso <= 1} onClick={() => setPaso((p) => p - 1)}>Return</Button>
        <Button disabled={paso > total} onClick={() => setPaso((p) => p + 1)}>Next Step</Button>
      </div>
    </div>
  )
}

/* Avanzá y retrocedé para ver la animación al completar un paso. */
export const Playground: Story = { render: (args) => <Demo key={`${args.total}-${args.current}-${args.names}`} {...args} /> }

export const Parts: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="The pieces">
        <Muestras>
          <ConRotulo rotulo="Badge"><Insignia estado="active" numero={2} /></ConRotulo>
          <ConRotulo rotulo="Connector"><div className="flex w-40"><Conector lleno={false} /></div></ConRotulo>
          <ConRotulo rotulo="Label with a name"><div className="flex w-24 justify-center"><Insignia estado="active" numero={1} label="Surfaces" /></div></ConRotulo>
        </Muestras>
        <Tabla encabezado={['Part', 'What it does']}>
          <tr><td className="font-semibold">Badge</td><td>Círculo de 24px con el número; completo, un tilde.</td></tr>
          <tr><td className="font-semibold">Connector</td><td>Línea de 2px entre dos círculos; se llena en verde al pasar al paso siguiente.</td></tr>
          <tr><td className="font-semibold">Label</td><td>"Step" o el nombre del paso, 10px arriba del círculo. No ocupa ancho: el primero se alinea a la izquierda, el último a la derecha y los del medio al centro.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Each step" nota="Pending gris, active azul, complete verde con tilde.">
        <Muestras>
          <ConRotulo rotulo="Pending"><Insignia estado="pending" numero={3} /></ConRotulo>
          <ConRotulo rotulo="Active"><Insignia estado="active" numero={2} /></ConRotulo>
          <ConRotulo rotulo="Complete"><Insignia estado="complete" numero={1} /></ConRotulo>
        </Muestras>
      </Bloque>
      <Bloque titulo="Whole bar" nota='Con "Step" y con nombres: los círculos y la línea quedan en el mismo lugar.'>
        <Tabla encabezado={['Where', 'Step', 'Names']} minimo={600}>
          {[1, 2, 3].map((n) => (
            <tr key={n}>
              <td className="font-semibold">{n === 1 ? 'First step' : n === 2 ? 'Middle step' : 'Last step'}</td>
              <td><div className="w-[230px]"><StepIndicator total={3} current={n} /></div></td>
              <td><div className="w-[230px]"><StepIndicator total={3} current={n} labels={NOMBRES.slice(0, 3)} /></div></td>
            </tr>
          ))}
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Measures">
        <Tabla encabezado={['Piece', 'Value']}>
          <tr><td className="font-semibold">Badge</td><td className="tabular-nums">24 × 24px, número 12px Semibold, tilde 10px</td></tr>
          <tr><td className="font-semibold">Connector</td><td className="tabular-nums">2px de alto, de círculo a círculo</td></tr>
          <tr><td className="font-semibold">Label</td><td className="tabular-nums">10px Medium, 15px de alto, 4px arriba del círculo</td></tr>
          <tr><td className="font-semibold">In a drawer</td><td>Debajo del título, 24px de margen a los costados, sin línea que lo separe.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['State', 'Badge', 'Label']}>
          <tr><td className="font-semibold">Pending</td><td><Token nombre="line-strong" /></td><td><Token nombre="ink-faint" /></td></tr>
          <tr><td className="font-semibold">Active</td><td><Token nombre="dash-blue" /></td><td><Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Complete</td><td><Token nombre="dash-ok-fg" /></td><td><Token nombre="dash-ok-fg" /></td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Motion" nota="Con movimiento reducido no hay animación.">
        <Tabla encabezado={['When', 'What moves', 'Timing']}>
          <tr><td className="font-semibold">A step completes</td><td>El tilde entra con un rebote (paso-check) y un anillo verde se abre (paso-anillo).</td><td className="tabular-nums">380ms · 700ms</td></tr>
          <tr><td className="font-semibold">Then</td><td>La línea se llena en verde hacia el paso siguiente.</td><td className="tabular-nums">500ms, 150ms después</td></tr>
          <tr><td className="font-semibold">The content</td><td>El paso nuevo del drawer entra desde la derecha (Next) o desde la izquierda (Return).</td><td className="tabular-nums">260ms</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
