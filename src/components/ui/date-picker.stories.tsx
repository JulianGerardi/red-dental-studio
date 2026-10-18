import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronLeft, ChevronsLeft } from 'lucide-react'
import { DatePicker, MonthCalendar, NavBtn } from './date-picker'
import { DateFilter } from './date-filter'
import { Bloque, ConRotulo, Forzar, Lienzo, Muestra, Muestras, Tabla, TablaPartes, Token, medidasDe, useMedidas, type Medidas } from '@/design-system/kit'
import { esperar, pulsar, secuencia } from '@/design-system/play'

type Args = { variant: 'field' | 'toolbar'; value: 'empty' | 'chosen'; markedDays: boolean; error: boolean }

const meta = {
  title: 'Components/UI/DatePicker',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Elegir **un día** (`@/components/ui/date-picker`). Para filtrar una lista por un día o un rango está *Elements / Date filter*, que usa el mismo campo y el mismo calendario (`MonthCalendar`).',
          '',
          '**Dos looks:** *field* en formularios y drawers (dd-mm-aaaa, como el Figma; texto regular y foco con borde azul, como los demás campos; 36px con `className="h-9 w-full"`) · *toolbar* en la barra de una pantalla (Dashboard): "Feb 28, 2026", medium, hover gris y anillo de foco, el mismo campo que el Date filter; su icono es el emoji 📅 (3D, como la manito del saludo) y el de Today, 🗓️.',
          '',
          '**El calendario:** el elegido en azul lleno, hoy en azul y negrita, punto en los días con contenido, saltos de mes y de año. Se abre en un popover de Radix: devuelve el foco al cerrar, Escape lo cierra y se da vuelta si no entra.',
          '',
          '**Probalo:** en *Playground* abrí el campo y elegí un día; desde *Controls* cambiá el look, arrancá vacío o con fecha, sacá los puntos o mostralo con error.',
        ].join('\n'),
      },
    },
  },
  args: { variant: 'field', value: 'chosen', markedDays: true, error: false },
  argTypes: {
    variant: { control: 'inline-radio', options: ['field', 'toolbar'], description: 'field: formulario (dd-mm-aaaa) · toolbar: barra de una pantalla ("Feb 28, 2026").' },
    value: { control: 'inline-radio', options: ['empty', 'chosen'], description: 'Sin fecha (placeholder) o con un día elegido.' },
    markedDays: { control: 'boolean', description: 'Punto en los días con contenido (en el Dashboard, los días con turnos).' },
    error: { control: 'boolean', description: 'Campo obligatorio sin fecha: borde rojo.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

const DIA = new Date(2026, 1, 28)
const MARCADOS = [2, 5, 9, 12, 16, 19, 23, 26].map((n) => new Date(2026, 1, n))

function Demo({ variant, value, markedDays, error }: Args) {
  const [d, setD] = useState<Date | null>(value === 'chosen' ? DIA : null)
  return (
    <div className="h-[400px] w-64">
      <DatePicker variant={variant} value={d} onChange={setD} marked={markedDays ? MARCADOS : []} error={error} className={variant === 'field' ? 'h-9 w-full' : undefined} />
    </div>
  )
}

export const Playground: Story = { render: (args) => <Demo key={JSON.stringify(args)} {...args} /> }

/* El calendario dibujado en la página (en la app va en el popover). */
const Caja = ({ children }: { children: ReactNode }) => <div className="w-fit max-w-full rounded-lg bg-popover p-3 shadow-md ring-1 ring-foreground/10">{children}</div>
function Mes({ elegido = DIA, max, yearNav = true, verMes = elegido }: { elegido?: Date; max?: Date; yearNav?: boolean; verMes?: Date }) {
  const [mes, setMes] = useState(new Date(verMes.getFullYear(), verMes.getMonth(), 1))
  const [d, setD] = useState(elegido)
  return <Caja><MonthCalendar month={mes} onMonthChange={setMes} from={d} to={d} onPick={setD} marked={MARCADOS} max={max} yearNav={yearNav} /></Caja>
}
const Campo = ({ variant = 'field', inicial = DIA, error, ancho }: { variant?: 'field' | 'toolbar'; inicial?: Date | null; error?: boolean; ancho?: boolean }) => {
  const [d, setD] = useState<Date | null>(inicial)
  return <DatePicker variant={variant} value={d} onChange={setD} error={error} className={ancho ? 'h-9 w-[220px]' : undefined} />
}

const PARTES: [string, string, string][] = [
  ['Field', 'Muestra el día elegido (o el placeholder) y abre el calendario. field: dd-mm-aaaa; toolbar: "Feb 28, 2026".', 'DatePicker'],
  ['Year · month arrows', 'Saltan un año o un mes. Se esconden si hay un tope (max) y no hay nada adelante.', 'NavBtn'],
  ['Month', 'Mes y año a la vista; se anuncia al cambiar.', 'MonthCalendar'],
  ['Weekdays', 'Su a Sa, apagados.', 'MonthCalendar'],
  ['Day', 'Elegido en azul lleno; hoy en azul y negrita; punto si tiene contenido; los de otro mes, apagados. Tocarlo elige y cierra.', 'MonthCalendar'],
]

export const Parts: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Field" nota="El mismo campo en los dos looks; cambia el formato, el peso de la letra y el foco.">
        <Muestras>
          <ConRotulo rotulo="field · in a form (36px)"><Campo ancho /></ConRotulo>
          <ConRotulo rotulo="toolbar · Dashboard (32px)"><Campo variant="toolbar" /></ConRotulo>
        </Muestras>
      </Bloque>
      <Bloque titulo="Calendar" nota="MonthCalendar: el mismo del Date filter.">
        <Mes />
        <Muestras>
          <ConRotulo rotulo="Year arrow"><NavBtn onClick={() => {}} label="Previous year"><ChevronsLeft className="size-4" /></NavBtn></ConRotulo>
          <ConRotulo rotulo="Month arrow"><NavBtn onClick={() => {}} label="Previous month"><ChevronLeft className="size-4" /></NavBtn></ConRotulo>
        </Muestras>
      </Bloque>
      <TablaPartes partes={PARTES} />
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="field">
        <Tabla encabezado={['State', 'Sample', 'What it means']} minimo={720}>
          <tr><td className="font-semibold">Empty</td><td><Campo inicial={null} ancho /></td><td className="text-ink-medium">Placeholder apagado.</td></tr>
          <tr><td className="font-semibold">Chosen</td><td><Campo ancho /></td><td className="text-ink-medium">El día en dd-mm-aaaa.</td></tr>
          <tr><td className="font-semibold">Hover</td><td><Forzar selector="button" estado="hover"><Campo ancho /></Forzar></td><td className="text-ink-medium">Borde más oscuro, como los demás campos.</td></tr>
          <tr><td className="font-semibold">Keyboard focus</td><td><Forzar selector="button" estado="focus-visible"><Campo ancho /></Forzar></td><td className="text-ink-medium">Borde azul, como los demás campos. Enter o Espacio lo abre.</td></tr>
          <tr><td className="font-semibold">Error</td><td><Campo inicial={null} error ancho /></td><td className="text-ink-medium">Obligatorio sin fecha: borde rojo.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="toolbar">
        <Tabla encabezado={['State', 'Sample', 'What it means']} minimo={720}>
          <tr><td className="font-semibold">Chosen</td><td><Campo variant="toolbar" /></td><td className="text-ink-medium">"Feb 28, 2026", medium. En una barra siempre hay un día.</td></tr>
          <tr><td className="font-semibold">Hover</td><td><Forzar selector="button" estado="hover"><Campo variant="toolbar" /></Forzar></td><td className="text-ink-medium">Fondo gris, como el Date filter y Filter.</td></tr>
          <tr><td className="font-semibold">Keyboard focus</td><td><Forzar selector="button" estado="focus-visible"><Campo variant="toolbar" /></Forzar></td><td className="text-ink-medium">Anillo azul, como los botones.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Calendar">
        <div className="flex flex-wrap gap-6">
          <Muestra titulo="Chosen day · marked days" nota="El elegido en azul lleno; punto en los días con contenido.">
            <Mes />
          </Muestra>
          <Muestra titulo="Today" nota="Hoy, sin elegir, en azul y negrita (antes era un fondo celeste: ahora el celeste es el medio de un rango).">
            <Mes elegido={new Date(new Date().getFullYear(), new Date().getMonth() - 1, 15)} verMes={new Date()} />
          </Muestra>
          <Muestra titulo="With a max (Date filter)" nota="Los días después del tope, deshabilitados; sin flecha hacia adelante.">
            <Mes elegido={new Date()} max={new Date()} yearNav={false} />
          </Muestra>
        </div>
      </Bloque>
    </Lienzo>
  ),
}

/* El campo abierto, como en la app. */
export const Open: Story = {
  render: (args) => <Demo {...args} />,
  play: secuencia(pulsar(/28-02-2026/), esperar(/February 2026/)),
}

const MEDIDAS_MES: [string, string][] = [
  ['Arrow', 'button[aria-label="Previous month"]'],
  ['Month', 'span[aria-live]'],
  ['Weekday', '.grid > span'],
  ['Day', '.grid > button'],
]

function MedirMes() {
  const ref = useRef<HTMLDivElement>(null)
  const [filas, setFilas] = useState<(Medidas | null)[]>([])
  useLayoutEffect(() => {
    setFilas(MEDIDAS_MES.map(([, sel]) => {
      const el = ref.current?.querySelector<HTMLElement>(sel)
      return el ? medidasDe(el) : null
    }))
  }, [])
  return (
    <>
      <div ref={ref}><Mes /></div>
      <Tabla encabezado={['Part', 'Width', 'Height', 'Text', 'Radius']} minimo={560}>
        {MEDIDAS_MES.map(([parte], i) => (
          <tr key={parte}>
            <td className="font-semibold">{parte}</td>
            <td className="tabular-nums">{filas[i]?.ancho ?? '—'}</td>
            <td className="tabular-nums">{filas[i]?.alto ?? '—'}</td>
            <td className="tabular-nums">{filas[i] ? `${filas[i]!.texto} · ${filas[i]!.peso}` : '—'}</td>
            <td className="tabular-nums">{filas[i]?.radio ?? '—'}</td>
          </tr>
        ))}
      </Tabla>
    </>
  )
}

function MedidaCampo({ nombre, children }: { nombre: string; children: ReactNode }) {
  const { ref, m } = useMedidas('button')
  return (
    <tr>
      <td className="font-semibold whitespace-nowrap">{nombre}</td>
      <td><div ref={ref} className="inline-flex">{children}</div></td>
      <td className="tabular-nums">{m?.alto}</td>
      <td className="tabular-nums">{m?.padding}</td>
      <td className="tabular-nums">{m ? `${m.texto} · ${m.peso}` : ''}</td>
      <td className="tabular-nums">{m?.radio}</td>
    </tr>
  )
}

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Which one goes where">
        <Tabla encabezado={['Piece', 'Sample', 'Where']} minimo={720}>
          <tr><td className="font-semibold">DatePicker · field</td><td><Campo ancho /></td><td className="text-ink-medium">Formularios y drawers: Ledger, Post payment, New appointment, Exceptions, Birthdate.</td></tr>
          <tr><td className="font-semibold">DatePicker · toolbar</td><td><Campo variant="toolbar" /></td><td className="text-ink-medium">El día de una pantalla entera: Dashboard (con Today al lado).</td></tr>
          <tr><td className="font-semibold">DateFilter</td><td><DateFilter value={null} onChange={() => {}} /></td><td className="text-ink-medium">Filtrar una lista por un día o un rango: Notifications.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Field" nota="Medidas leídas del campo dibujado.">
        <Tabla encabezado={['Look', 'Sample', 'Height', 'Padding', 'Text', 'Radius']} minimo={720}>
          <MedidaCampo nombre="field (form)"><Campo ancho /></MedidaCampo>
          <MedidaCampo nombre="toolbar"><Campo variant="toolbar" /></MedidaCampo>
        </Tabla>
      </Bloque>
      <Bloque titulo="Calendar" nota="Medidas leídas del calendario de arriba.">
        <MedirMes />
      </Bloque>
      <Bloque titulo="Colors" nota="Tokens de date-picker.tsx; su valor está en src/index.css.">
        <Tabla encabezado={['Part', 'Token']} minimo={480}>
          <tr><td className="font-semibold">Field</td><td><Token nombre="line" /> border · <Token nombre="ink" /> text · placeholder <Token nombre="ink-faint" /></td></tr>
          <tr><td className="font-semibold">Open · focus</td><td><Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Error</td><td><Token nombre="field-error" /></td></tr>
          <tr><td className="font-semibold">Chosen day</td><td><Token nombre="primary" /> · text <Token nombre="primary-foreground" /></td></tr>
          <tr><td className="font-semibold">Hover day</td><td><Token nombre="accent" /></td></tr>
          <tr><td className="font-semibold">Today · dot</td><td><Token nombre="dash-blue" /> · dot <Token nombre="primary" /></td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>One calendar for the whole app: MonthCalendar, in DatePicker and Date filter. Never a calendar by hand.</li>
          <li>In a form, field (dd-mm-aaaa, 36px). On a screen toolbar, toolbar ("Feb 28, 2026", 32px).</li>
          <li>The popover is Radix: Escape closes it, focus goes back to the field and it flips when there is no room.</li>
          <li>Today in blue bold; the chosen day in solid blue; dots for days with content.</li>
          <li>Colors always from tokens.</li>
        </ul>
      </Bloque>
    </Lienzo>
  ),
}
