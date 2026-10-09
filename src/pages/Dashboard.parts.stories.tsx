import { useLayoutEffect, useRef, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { BotonFiltro, FiltroFecha } from './Dashboard'
import { DIAS_CON_DATOS, HOY_DEMO } from '@/components/dashboard/dashboard-data'
import { BUTTON_VARIANTS } from '@/components/ui/button'
import { Bloque, ConRotulo, Forzar, Lienzo, Muestras, Tabla, Token, medidasDe, type Medidas } from '@/design-system/kit'
import { tokensDe } from '@/design-system/medir'

type Args = { day: 'Another day' | 'Today'; markedDays: boolean }

const meta = {
  title: 'Pages/Parts/Dashboard',
  parameters: {
    layout: 'padded',
    docs: {
      decisionsFrom: 'pages/Dashboard.tsx',
      description: {
        component: [
          'Las partes propias del dashboard (`@/pages/Dashboard`): la **fila de fecha** de arriba, que manda sobre toda la pantalla, y el **botón de filtro** de cada panel. La pantalla completa está en *Pages*.',
          '',
          '**Cómo se usa:** el selector elige el día; *Today* vuelve a hoy sin abrir el calendario y sólo aparece cuando el día elegido no es hoy. Los dos miden 32px de alto, como el resto de los inputs de la app.',
          '',
          '**Probalo:** en *Playground* elegí el día y los días marcados desde *Controls*; tocá *Today* y el botón se va.',
        ].join('\n'),
      },
    },
  },
  args: { day: 'Another day', markedDays: true },
  argTypes: {
    day: { control: 'inline-radio', options: ['Another day', 'Today'], description: 'El día con el que arranca. En hoy, el botón Today no aparece.' },
    markedDays: { control: 'boolean', description: 'El punto azul en los días con turnos, dentro del calendario.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

const sinControles = { controls: { disable: true } }
const HOY_SEL = 'button[title="Go to today"]'

function Fecha({ inicial = HOY_DEMO, marcados = true }: { inicial?: Date; marcados?: boolean }) {
  const [d, setD] = useState(inicial)
  return <FiltroFecha value={d} onChange={setD} marked={marcados ? DIAS_CON_DATOS : []} />
}

function Filtro({ inicial }: { inicial: string[] }) {
  const [v, setV] = useState(inicial)
  return <BotonFiltro label="Provider" options={['Dr. Elena Martinez', 'Dr. Emily Chen']} value={v} onChange={setV} />
}

/* La fila de fecha, con el calendario a mano. */
export const Playground: Story = {
  render: (args) => (
    <div className="h-[400px] bg-page-background p-4">
      <Fecha key={`${args.day}-${args.markedDays}`} inicial={args.day === 'Today' ? new Date() : HOY_DEMO} marcados={args.markedDays} />
    </div>
  ),
}

/* Qué tiene cada parte. */
export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Date row" nota="Arriba de las tres columnas: si viviera adentro de Appointments parecería filtrar sólo esa.">
        <Muestras>
          <ConRotulo rotulo="Date picker · Today · scope line"><Fecha marcados={false} /></ConRotulo>
        </Muestras>
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li><strong>Date picker:</strong> el día de toda la pantalla, en dd-mm-aaaa.</li>
          <li><strong>Today:</strong> <code>Button</code> secondary md con el ícono CalendarClock. Sólo cuando el día no es hoy.</li>
          <li><strong>Scope line:</strong> dice a qué afecta la fecha, 12px en <code>ink-muted</code>.</li>
        </ul>
      </Bloque>
      <Bloque titulo="Panel filter button" nota="El embudo de Appointments y de Pending Task: FilterMenu en sm.">
        <div className="h-48"><Filtro inicial={[]} /></div>
      </Bloque>
    </Lienzo>
  ),
}

/* Cada parte en cada estado. */
export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Date row">
        <div className="flex flex-col gap-6">
          <ConRotulo rotulo="Another day: Today shows up"><Fecha /></ConRotulo>
          <ConRotulo rotulo="Today: the button goes away"><Fecha inicial={new Date()} /></ConRotulo>
          <ConRotulo rotulo="Today, hover"><Forzar selector={HOY_SEL} estado="hover"><Fecha /></Forzar></ConRotulo>
          <ConRotulo rotulo="Calendar open">
            <Forzar selector="button[aria-haspopup]" estado="click" className="h-[380px]"><Fecha /></Forzar>
          </ConRotulo>
        </div>
      </Bloque>
      <Bloque titulo="Panel filter button">
        <Muestras className="h-48 items-start">
          <ConRotulo rotulo="No filter"><Filtro inicial={[]} /></ConRotulo>
          <ConRotulo rotulo="One chosen"><Filtro inicial={['Dr. Emily Chen']} /></ConRotulo>
        </Muestras>
      </Bloque>
    </Lienzo>
  ),
}

const PARTES = [['Date picker', 'button[aria-haspopup]'], ['Today', HOY_SEL]] as const

/* Dibuja la fila y lee el selector y Today del mismo render. */
function MedidasFila() {
  const ref = useRef<HTMLDivElement>(null)
  const [m, setM] = useState<(Medidas | null)[]>([])
  useLayoutEffect(() => {
    setM(PARTES.map(([, sel]) => {
      const el = ref.current?.querySelector<HTMLElement>(sel)
      return el ? medidasDe(el) : null
    }))
  }, [])
  return (
    <>
      <div ref={ref}><Fecha marcados={false} /></div>
      <Tabla encabezado={['Part', 'Height', 'Width', 'Padding', 'Text', 'Radius', 'Border', 'Icon']} minimo={820}>
        {PARTES.map(([parte], i) => (
          <tr key={parte}>
            <td className="font-semibold">{parte}</td>
            <td className="tabular-nums">{m[i]?.alto}</td>
            <td className="tabular-nums">{m[i]?.ancho}</td>
            <td className="tabular-nums">{m[i]?.padding}</td>
            <td className="tabular-nums">{m[i]?.texto} · {m[i]?.peso}</td>
            <td className="tabular-nums">{m[i]?.radio}</td>
            <td className="tabular-nums">{m[i]?.borde}</td>
            <td className="tabular-nums">{m[i]?.icono}</td>
          </tr>
        ))}
      </Tabla>
    </>
  )
}

/* Medidas leídas de la fila dibujada y los tokens de Today. */
export const Specs: Story = {
  parameters: sinControles,
  render: () => {
    const t = tokensDe(BUTTON_VARIANTS.secondary)
    return (
      <Lienzo>
        <Bloque titulo="Date row" nota="Leído de la fila ya dibujada. El selector y Today miden lo mismo de alto: si uno cambia, el otro tiene que acompañar.">
          <MedidasFila />
        </Bloque>
        <Bloque titulo="Today colors" nota="Los de Button secondary (button.tsx y src/index.css).">
          <Tabla encabezado={['Fill', 'Text', 'Border', 'Hover fill']} minimo={560}>
            <tr>
              <td><Token nombre={t.fondo} /></td>
              <td><Token nombre={t.texto} /></td>
              <td><Token nombre={t.borde} /></td>
              <td><Token nombre={t.fondoHover} /></td>
            </tr>
          </Tabla>
        </Bloque>
        <Bloque titulo="Rules">
          <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
            <li>Today is <code>Button variant="secondary" size="md"</code>: 32px, the date picker height. Never a hand-made button.</li>
            <li>Both carry the same faint shadow (0 1px 2px, 5%), so they read as a pair.</li>
            <li>8px between parts. Today only when the chosen day is not today.</li>
          </ul>
        </Bloque>
      </Lienzo>
    )
  },
}
