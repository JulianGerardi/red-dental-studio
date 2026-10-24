import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { RotateCcw } from 'lucide-react'
import { Saludo, SALUDO, SALUDO_TIEMPOS, fechaDelDia } from './Saludo'
import { Button } from '@/components/ui/button'
import { Bloque, Lienzo, Muestra, Tabla, TablaPartes, Token, useMedidas } from '@/design-system/kit'

type Args = { mode: 'Animated' | 'Greeting' | 'Date' }

const DIA = new Date(2026, 1, 28)

const meta = {
  title: 'Components/Layout/Greeting',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'El saludo del Topbar (`@/components/layout/Saludo`, Julián, 2026-10-13): **"Hi! Dentist Sarah" se escribe letra por letra**, se borra y en su lugar se escribe **la fecha del día** ("Saturday - February 28, 2026"), con el calendario en vez de la mano.',
          '',
          '**Cuándo se anima:** una vez por sesión del navegador; al recargar o volver a entrar en la misma pestaña va la fecha directo. Con *reducir movimiento* activado, también la fecha directo. El lector de pantalla lee saludo y fecha juntos, nunca letra por letra. Se ve desde 1024px, como el saludo de antes.',
          '',
          '**Probalo:** en *Playground* elegí la animación o cada estado fijo desde *Controls*; "Replay" la vuelve a escribir.',
        ].join('\n'),
      },
    },
  },
  args: { mode: 'Animated' },
  argTypes: {
    mode: { control: 'inline-radio', options: ['Animated', 'Greeting', 'Date'], description: 'La animación completa o un estado fijo.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>
const sinControles = { controls: { disable: true } }

/* Fondo y alto del Topbar. */
const Barra = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-16 items-center rounded-lg bg-white px-4 shadow-panel">{children}</div>
)

function Animado() {
  const [vuelta, setVuelta] = useState(0)
  return (
    <div className="flex flex-col items-start gap-3">
      <Barra><Saludo key={vuelta} fecha={DIA} animar="siempre" /></Barra>
      <Button variant="secondary" size="sm" onClick={() => setVuelta((v) => v + 1)}><RotateCcw /> Replay</Button>
    </div>
  )
}

export const Playground: Story = {
  render: (a) => a.mode === 'Animated'
    ? <Animado />
    : <Barra><Saludo fecha={DIA} fase={a.mode === 'Greeting' ? 'saludo' : 'fecha'} /></Barra>,
}

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque nota="Primero el saludo con la mano; después la fecha con el calendario.">
        <div className="flex flex-col gap-3">
          <Barra><Saludo fecha={DIA} fase="saludo" /></Barra>
          <Barra><Saludo fecha={DIA} fase="fecha" /></Barra>
        </div>
      </Bloque>
      <TablaPartes partes={[
        ['Icon', 'La mano 👋 con el saludo; el calendario 📅 con la fecha, que entra con un giro corto. Los dos son emoji (3D).', 'Saludo'],
        ['Text', '16px Regular negro, en una línea. El saludo es el del Figma; la fecha, "Weekday - Month D, YYYY".', 'SALUDO · fechaDelDia'],
        ['Caret', 'Barra azul de 2px que titila mientras se escribe; se va al terminar.', 'saludo-cursor'],
        ['Reserved width', 'Una copia invisible del texto más largo: la barra de arriba no se corre mientras se escribe.', 'grid'],
        ['Screen reader text', 'Saludo y fecha en un texto oculto; la parte animada va con aria-hidden.', 'sr-only'],
      ]} />
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <div className="grid gap-6 md:grid-cols-2">
        <Muestra titulo="Typing (first visit)" nota="La animación completa, la primera vez en la sesión.">
          <Animado />
        </Muestra>
        <Muestra titulo="Greeting" nota="El saludo completo, antes de borrarse.">
          <Barra><Saludo fecha={DIA} fase="saludo" /></Barra>
        </Muestra>
        <Muestra titulo="Date (end)" nota="Así queda, y así se ve directo al volver en la misma sesión o con reducir movimiento.">
          <Barra><Saludo fecha={DIA} animar="nunca" /></Barra>
        </Muestra>
      </div>
      <Muestra titulo="Longest date" nota="El día y el mes más largos (unos 300px): entra igual en una línea; el Topbar lo muestra desde 1024px.">
        <Barra><Saludo fecha={new Date(2026, 8, 30)} animar="nunca" /></Barra>
      </Muestra>
    </Lienzo>
  ),
}

function MedidaTexto() {
  const { ref, m } = useMedidas('p')
  return (
    <>
      <div ref={ref}><Barra><Saludo fecha={DIA} fase="fecha" /></Barra></div>
      <Tabla encabezado={['Part', 'Text', 'Gap']} minimo={420}>
        <tr><td className="font-semibold">Greeting</td><td className="tabular-nums">{m?.texto} · {m?.peso}</td><td className="tabular-nums">{m?.gap}</td></tr>
      </Tabla>
    </>
  )
}

const { letra, pausa, borrar, antesDeLaFecha } = SALUDO_TIEMPOS
const fechaEjemplo = fechaDelDia(DIA)
const total = SALUDO.length * letra + pausa + SALUDO.length * borrar + antesDeLaFecha + fechaEjemplo.length * letra

export const Specs: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Size" nota="Leído del saludo dibujado.">
        <MedidaTexto />
      </Bloque>
      <Bloque titulo="Timing" nota="De SALUDO_TIEMPOS (Saludo.tsx).">
        <Tabla encabezado={['Step', 'Time']} minimo={420}>
          <tr><td className="font-semibold">Each letter</td><td className="tabular-nums">{letra}ms</td></tr>
          <tr><td className="font-semibold">Full greeting on screen</td><td className="tabular-nums">{pausa}ms</td></tr>
          <tr><td className="font-semibold">Each letter erased</td><td className="tabular-nums">{borrar}ms</td></tr>
          <tr><td className="font-semibold">Before the date</td><td className="tabular-nums">{antesDeLaFecha}ms</td></tr>
          <tr><td className="font-semibold">Whole animation ({fechaEjemplo})</td><td className="tabular-nums">{(total / 1000).toFixed(1)}s</td></tr>
          <tr><td className="font-semibold">Caret blink</td><td className="tabular-nums">1s</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Part', 'Token']} minimo={420}>
          <tr><td className="font-semibold">Text</td><td>black</td></tr>
          <tr><td className="font-semibold">Calendar icon and caret</td><td><Token nombre="dash-blue" /></td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
