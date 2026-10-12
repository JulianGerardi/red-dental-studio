import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DateFilter, DateFilterPanel, DATE_PRESETS, type DateRange } from './date-filter'
import { Tabs } from '@/components/ui/tabs'
import { Bloque, ConRotulo, Forzar, Lienzo, Muestra, Muestras, Tabla, TablaPartes, Token, medidasDe, useMedidas, type Medidas } from '@/design-system/kit'
import { esperar, pulsar, secuencia } from '@/design-system/play'

type Args = { value: 'all dates' | 'preset' | 'one day' | 'range'; markedDays: boolean; disabled: boolean }

const meta = {
  title: 'Elements/Date filter',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'El filtro de fecha de una lista (`@/components/ui/date-filter`): un solo campo que filtra **un día o un rango**. Hoy lo usa *Notifications*, para cuando hay muchas.',
          '',
          '**Cómo se usa:** un clic en un día filtra ese día; un segundo clic cierra el rango (en cualquier orden). Mientras se elige el segundo, el rango se ve hasta el día bajo el mouse. A la izquierda, atajos: *All dates* (sin filtro), *Today*, *Yesterday*, *Last 7 days*, *Last 30 days* y *Last 90 days*. Se aplica al tocar, sin botón Apply, como *Filter*.',
          '',
          '**El campo:** *All dates* mientras no filtra; con fechas, azul como *Filter* con algo aplicado, dice el atajo ("Last 7 days") o las fechas ("Oct 3", "Sep 10 – Sep 20") y lleva una ✕ para sacarlas.',
          '',
          '**El calendario:** punto en los días que tienen algo; los días que vienen, deshabilitados (no hay nada que filtrar ahí).',
          '',
          '**Probalo:** en *Playground* abrí el campo, tocá un atajo o dos días; desde *Controls* arrancá con un atajo, un día o un rango, sacá los puntos o deshabilitalo.',
        ].join('\n'),
      },
    },
  },
  args: { value: 'all dates', markedDays: true, disabled: false },
  argTypes: {
    value: { control: 'inline-radio', options: ['all dates', 'preset', 'one day', 'range'], description: 'Con qué arranca: sin filtro, un atajo (Last 7 days), un día o un rango.' },
    markedDays: { control: 'boolean', description: 'Punto en los días que tienen algo.' },
    disabled: { control: 'boolean', description: 'Deshabilitado: la lista está cargando.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

const haceDias = (n: number) => {
  const d = new Date()
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() - n)
}
const UN_DIA: DateRange = { from: haceDias(3), to: haceDias(3) }
const RANGO: DateRange = { from: haceDias(20), to: haceDias(14) }
const ARRANQUE: Record<Args['value'], DateRange | null> = { 'all dates': null, preset: DATE_PRESETS[2]!.range(), 'one day': UN_DIA, range: RANGO }
/* Días con contenido de ejemplo: casi todos los de las últimas semanas. */
const MARCADOS = [0, 1, 2, 4, 5, 8, 9, 11, 13, 15, 16, 18, 20, 23, 25, 26, 28, 31, 33, 38].map(haceDias)

function Demo({ value, markedDays, disabled }: Args) {
  const [r, setR] = useState<DateRange | null>(ARRANQUE[value])
  return (
    <div className="flex h-[420px] items-start justify-end sm:w-[560px]">
      <DateFilter value={r} onChange={setR} marked={markedDays ? MARCADOS : []} disabled={disabled} />
    </div>
  )
}

export const Playground: Story = { render: (args) => <Demo key={JSON.stringify(args)} {...args} /> }

/* El panel abierto, dibujado en la página (en la app va en un popover). */
const Caja = ({ children }: { children: ReactNode }) => <div className="w-fit max-w-full rounded-lg bg-popover p-3 shadow-md ring-1 ring-foreground/10">{children}</div>
function Panel({ inicial = null, ancla }: { inicial?: DateRange | null; ancla?: Date }) {
  const [r, setR] = useState<DateRange | null>(inicial)
  return <Caja><DateFilterPanel value={r} onChange={setR} marked={MARCADOS} defaultAnchor={ancla} /></Caja>
}
const Campo = ({ inicial = null, disabled }: { inicial?: DateRange | null; disabled?: boolean }) => {
  const [r, setR] = useState<DateRange | null>(inicial)
  return <DateFilter value={r} onChange={setR} disabled={disabled} />
}

const PARTES: [string, string, string][] = [
  ['Field', 'Dice qué fechas se ven: All dates, el atajo o las fechas. Abre el panel.', 'DateFilter'],
  ['Clear (✕)', 'Sólo con fechas elegidas: vuelve a All dates sin abrir el panel.', 'DateFilter'],
  ['Quick ranges', 'All dates y los cinco atajos. El elegido, en azul. Tocarlo aplica y cierra.', 'DateFilterPanel'],
  ['Month', 'Mes a la vista y flechas. No hay flecha hacia meses que vienen.', 'DateFilterPanel · NavBtn'],
  ['Day', 'Un clic filtra ese día; el segundo cierra el rango. Extremos en azul, el medio celeste, punto si tiene algo, hoy en azul y negrita.', 'DateFilterPanel'],
  ['Hint', 'Qué hacer ahora: "Pick a day, or two days for a range." o "Now pick the end date."', 'DateFilterPanel'],
]

export const Parts: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Field" nota="Sin filtro, blanco. Con fechas, azul con la ✕.">
        <Muestras>
          <ConRotulo rotulo="All dates"><Campo /></ConRotulo>
          <ConRotulo rotulo="Preset"><Campo inicial={ARRANQUE.preset} /></ConRotulo>
          <ConRotulo rotulo="Range"><Campo inicial={RANGO} /></ConRotulo>
        </Muestras>
      </Bloque>
      <Bloque titulo="Panel" nota="Atajos a la izquierda (arriba, en una tira, en el celular) y el calendario.">
        <Panel inicial={RANGO} />
      </Bloque>
      <TablaPartes partes={PARTES} />
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Field">
        <Tabla encabezado={['State', 'Sample', 'What it means']} minimo={720}>
          <tr><td className="font-semibold">All dates</td><td><Campo /></td><td className="text-ink-medium">Sin filtro: se ve todo.</td></tr>
          <tr><td className="font-semibold">Hover</td><td><Forzar selector="button" estado="hover"><Campo /></Forzar></td><td className="text-ink-medium">Fondo gris, como Filter.</td></tr>
          <tr><td className="font-semibold">Keyboard focus</td><td><Forzar selector="button" estado="focus-visible"><Campo /></Forzar></td><td className="text-ink-medium">Anillo azul; Enter o Espacio lo abre.</td></tr>
          <tr><td className="font-semibold">Preset</td><td><Campo inicial={ARRANQUE.preset} /></td><td className="text-ink-medium">Un atajo: dice su nombre.</td></tr>
          <tr><td className="font-semibold">One day</td><td><Campo inicial={UN_DIA} /></td><td className="text-ink-medium">Un clic en un día y cerrar: ese día.</td></tr>
          <tr><td className="font-semibold">Range</td><td><Campo inicial={RANGO} /></td><td className="text-ink-medium">Dos clics: del primero al segundo, los dos incluidos.</td></tr>
          <tr><td className="font-semibold">Disabled</td><td><Campo disabled /></td><td className="text-ink-medium">La lista está cargando.</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Panel">
        <div className="flex flex-wrap gap-6">
          <Muestra titulo="Nothing chosen" nota="All dates en azul; hoy en azul y negrita; los días que vienen, apagados.">
            <Panel />
          </Muestra>
          <Muestra titulo="Picking the end date" nota="Ya se tocó un día: queda en azul y el rango sigue al mouse hasta el segundo clic.">
            <Panel inicial={{ from: haceDias(10), to: haceDias(10) }} ancla={haceDias(10)} />
          </Muestra>
          <Muestra titulo="Preset" nota="El atajo elegido en azul y su rango en el calendario.">
            <Panel inicial={ARRANQUE.preset} />
          </Muestra>
        </div>
      </Bloque>
    </Lienzo>
  ),
}

/* El campo abierto, como en la app. */
export const Open: Story = {
  args: { value: 'range' },
  render: (args) => <Demo {...args} />,
  play: secuencia(pulsar(/^Filter by date:/), esperar(/Pick a day, or two days for a range/)),
}

/* En Notifications: en la fila de las pestañas, a la derecha; en el celular baja. */
function EnNotificaciones() {
  const [v, setV] = useState<'Inbox' | 'Unread' | 'Pending' | 'Archived'>('Inbox')
  const [r, setR] = useState<DateRange | null>(ARRANQUE.preset)
  return (
    <div className="flex w-full max-w-[820px] flex-wrap items-center justify-between gap-3 rounded-lg bg-page-background p-4">
      <Tabs aria-label="Filter notifications" tabs={[{ value: 'Inbox', count: 9 }, { value: 'Unread', count: 3 }, { value: 'Pending', count: 1 }, { value: 'Archived' }]} value={v} onChange={setV} />
      <DateFilter value={r} onChange={setR} marked={MARCADOS} label="Filter notifications by date" />
    </div>
  )
}

function Medida({ nombre, children }: { nombre: string; children: ReactNode }) {
  const { ref, m } = useMedidas('button')
  return (
    <tr>
      <td className="font-semibold whitespace-nowrap">{nombre}</td>
      <td><div ref={ref} className="inline-flex">{children}</div></td>
      <td className="tabular-nums">{m?.alto}</td>
      <td className="tabular-nums">{m?.padding}</td>
      <td className="tabular-nums">{m?.texto}</td>
      <td className="tabular-nums">{m?.radio}</td>
    </tr>
  )
}

const MEDIDAS_PANEL: [string, string][] = [
  ['Quick range', '[role=group] button'],
  ['Month arrow', 'button[aria-label="Previous month"]'],
  ['Weekday', '.grid > span'],
  ['Day', '.grid > button'],
  ['Hint', 'p'],
]

/* Medidas leídas del panel dibujado. */
function MedirPanel() {
  const ref = useRef<HTMLDivElement>(null)
  const [filas, setFilas] = useState<(Medidas | null)[]>([])
  useLayoutEffect(() => {
    setFilas(MEDIDAS_PANEL.map(([, sel]) => {
      const el = ref.current?.querySelector<HTMLElement>(sel)
      return el ? medidasDe(el) : null
    }))
  }, [])
  return (
    <>
      <div ref={ref}><Panel inicial={RANGO} /></div>
      <Tabla encabezado={['Part', 'Width', 'Height', 'Padding', 'Text', 'Radius']} minimo={620}>
        {MEDIDAS_PANEL.map(([parte], i) => {
          const m = filas[i]
          return (
            <tr key={parte}>
              <td className="font-semibold whitespace-nowrap">{parte}</td>
              <td className="tabular-nums">{m?.ancho ?? '—'}</td>
              <td className="tabular-nums">{m?.alto ?? '—'}</td>
              <td className="tabular-nums">{m?.padding ?? '—'}</td>
              <td className="tabular-nums">{m ? `${m.texto} · ${m.peso}` : '—'}</td>
              <td className="tabular-nums">{m?.radio ?? '—'}</td>
            </tr>
          )
        })}
      </Tabla>
    </>
  )
}

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="In Notifications" nota="En la fila de las pestañas, a la derecha: las dos cambian qué se ve. Las fechas acotan los números de las pestañas, la lista y las acciones en lote (Mark all as read, Archive…).">
        <EnNotificaciones />
      </Bloque>
      <Bloque titulo="Field" nota="Medidas leídas del campo dibujado.">
        <Tabla encabezado={['Part', 'Sample', 'Height', 'Padding', 'Text', 'Radius']} minimo={720}>
          <Medida nombre="Field"><Campo /></Medida>
          <Medida nombre="Field · with dates"><Campo inicial={RANGO} /></Medida>
        </Tabla>
      </Bloque>
      <Bloque titulo="Panel" nota="Medidas leídas del panel de arriba. Días de 36px, como el DatePicker; 12px de aire al borde de la pantalla.">
        <MedirPanel />
      </Bloque>
      <Bloque titulo="Colors" nota="Tokens de date-filter.tsx; su valor está en src/index.css.">
        <Tabla encabezado={['Part', 'Token']} minimo={480}>
          <tr><td className="font-semibold">Field</td><td><Token nombre="line" /> border · <Token nombre="ink" /> text · hover <Token nombre="surface-subtle" /></td></tr>
          <tr><td className="font-semibold">Field with dates</td><td><Token nombre="dash-blue" /> border and text · <Token nombre="info-bg" /> fill</td></tr>
          <tr><td className="font-semibold">Chosen quick range</td><td><Token nombre="info-bg" /> · text <Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Range ends</td><td><Token nombre="primary" /> · text <Token nombre="primary-foreground" /></td></tr>
          <tr><td className="font-semibold">Range middle</td><td><Token nombre="accent" /></td></tr>
          <tr><td className="font-semibold">Today · dot</td><td><Token nombre="dash-blue" /> · dot <Token nombre="primary" /></td></tr>
          <tr><td className="font-semibold">Hint</td><td><Token nombre="ink-muted" /></td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>One field for a day or a range: one click picks a day, a second click closes the range.</li>
          <li>Applies on click, like Filter: no Apply button. Quick ranges close the panel.</li>
          <li>With dates the field turns blue and has a ✕; All dates means no filter.</li>
          <li>Days with content get a dot; upcoming days are disabled.</li>
          <li>Field 32px, like DatePicker and Button md. The panel keeps 12px from the screen edge.</li>
          <li>When nothing falls in the dates, the list says so and offers Clear dates.</li>
        </ul>
      </Bloque>
    </Lienzo>
  ),
}
