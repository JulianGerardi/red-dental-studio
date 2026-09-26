import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { CalendarDays, CreditCard, FileText, Receipt } from 'lucide-react'
import { Tabs, type TabItem } from './tabs'
import { Bloque, ConRotulo, Lienzo, Muestras, Tabla, Token, useMedidas } from '@/design-system/kit'

const NOMBRES = ['Transactions', 'Patient Payment', 'Credit Adjustment', 'Charge Adjustment', 'Statements', 'Claims', 'Payment Plans', 'Collections', 'Refunds', 'Write-offs']
const ICONOS = [Receipt, CreditCard, FileText, CalendarDays]

type Args = {
  count: number
  labels: string
  size: 'sm' | 'md'
  fullWidth: boolean
  counts: boolean
  icons: boolean
  disabledTab: number
  width: number
  state: 'default' | 'hover' | 'focus'
}

const meta = {
  title: 'Elements/Tabs',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Las pestañas de la app (\`@/components/ui/tabs\`): una caja gris con la pestaña activa en azul. Cambian entre vistas de un mismo bloque —Transactions / Patient Payment en el Ledger, Patient / Guarantor View, ASAP / Waiting List— y no entre páginas.',
          '',
          '**Cuándo:** 2 a 6 opciones de lo mismo. Si son más o cambian de pantalla, va otro componente (un menú, el menú del paciente, un select).',
          '',
          '**Probalo:** en *Playground* sumá o sacá pestañas con *count*, escribí tus propios nombres en *labels* (separados por coma), achicá el ancho con *width* para ver qué pasa cuando no entran, y probá con el teclado: Tab entra, ← → Inicio Fin mueven.',
        ].join('\\n'),
      },
    },
  },
  args: { count: 4, labels: '', size: 'md', fullWidth: false, counts: false, icons: false, disabledTab: -1, width: 720, state: 'default' },
  argTypes: {
    count: { control: { type: 'range', min: 2, max: 10, step: 1 }, description: 'Cantidad de pestañas. Sumá para ver cómo se comporta con muchas.' },
    labels: { control: 'text', description: 'Tus propios nombres, separados por coma. Vacío = nombres de ejemplo.' },
    size: { control: 'inline-radio', options: ['md', 'sm'], description: 'md 32px en pantallas · sm 28px dentro de paneles y cards.' },
    fullWidth: { control: 'boolean', description: 'Ocupa todo el ancho y reparte las pestañas por igual (paneles angostos).' },
    counts: { control: 'boolean', description: 'Cantidad al lado del nombre: "Claims (3)". Si es 0, no se muestra.' },
    icons: { control: 'boolean', description: 'Ícono antes del nombre.' },
    disabledTab: { control: { type: 'range', min: -1, max: 9, step: 1 }, description: 'Número de pestaña deshabilitada (-1 = ninguna). El teclado la saltea.' },
    width: { control: { type: 'range', min: 200, max: 960, step: 20 }, description: 'Ancho disponible en px. Si no entran, la tira se desliza de costado.' },
    state: { control: 'inline-radio', options: ['default', 'hover', 'focus'], description: 'Fuerza un estado en las pestañas inactivas.', table: { category: 'Preview' } },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

function armar({ count, labels, counts, icons, disabledTab }: Pick<Args, 'count' | 'labels' | 'counts' | 'icons' | 'disabledTab'>): TabItem<string>[] {
  const propios = labels.split(',').map((x) => x.trim()).filter(Boolean)
  const nombres = propios.length ? propios : NOMBRES.slice(0, count)
  return nombres.map((n, i) => ({
    value: n,
    count: counts ? (i * 3) % 7 : undefined,
    icon: icons ? ICONOS[i % ICONOS.length] : undefined,
    disabled: i === disabledTab,
  }))
}

const PSEUDO = { default: '', hover: 'pseudo-hover-all', focus: 'pseudo-focus-visible-all' } as const

function Demo(args: Args) {
  const items = armar(args)
  const [valor, setValor] = useState(String(typeof items[0] === 'string' ? items[0] : items[0]!.value))
  const actual = items.some((t) => (typeof t === 'string' ? t : t.value) === valor) ? valor : (items[0] as { value: string }).value
  return (
    <div className={PSEUDO[args.state]} style={{ width: args.width, maxWidth: '100%' }}>
      <Tabs tabs={items} value={actual} onChange={setValor} size={args.size} fullWidth={args.fullWidth} aria-label="Example" />
      <p className="mt-3 text-[12px] text-ink-muted">Selected: <b className="text-ink">{actual}</b></p>
    </div>
  )
}

/* Sumá pestañas, escribí nombres y achicá el ancho desde Controls. */
export const Playground: Story = { render: (args) => <Demo key={\`\${args.count}-\${args.labels}\`} {...args} /> }

export const Sizes: Story = {
  parameters: { controls: { include: ['count'] } },
  render: ({ count }) => (
    <Muestras className="flex-col items-start">
      <ConRotulo rotulo="md · 32px — on screens"><Demo {...meta.args} count={count} size="md" /></ConRotulo>
      <ConRotulo rotulo="sm · 28px — inside panels and cards"><Demo {...meta.args} count={count} size="sm" /></ConRotulo>
    </Muestras>
  ),
}

export const FullWidth: Story = {
  name: 'Full width',
  parameters: { controls: { include: ['count'] } },
  args: { count: 2, fullWidth: true, size: 'sm', width: 320 },
  render: (args) => <Demo {...args} />,
}

export const WithCountsAndIcons: Story = {
  name: 'With counts and icons',
  args: { counts: true, icons: true },
  parameters: { controls: { include: ['count', 'size'] } },
  render: (args) => <Demo {...args} />,
}

/* Muchas pestañas en poco lugar: la tira se desliza, no se parte. */
export const Overflow: Story = {
  args: { count: 10, width: 420 },
  parameters: { controls: { include: ['count', 'width'] } },
  render: (args) => <Demo {...args} />,
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Tabla encabezado={['State', 'Sample', 'What it means']} minimo={720}>
      {[
        ['Active', '', 'La vista que se está mostrando. Azul con texto blanco.'],
        ['Hover', 'pseudo-hover-all', 'El texto de una inactiva se oscurece: se puede elegir.'],
        ['Focus (keyboard)', 'pseudo-focus-visible-all', 'Anillo azul al llegar con Tab; ← → mueven y eligen.'],
      ].map(([nombre, clase, texto]) => (
        <tr key={nombre}>
          <td className="font-semibold">{nombre}</td>
          <td><div className={clase}><Tabs tabs={['Patient View', 'Guarantor View']} value="Patient View" onChange={() => {}} /></div></td>
          <td className="text-ink-medium">{texto}</td>
        </tr>
      ))}
      <tr>
        <td className="font-semibold">Disabled</td>
        <td><Tabs tabs={['Findings', { value: 'Diagnostics', disabled: true }]} value="Findings" onChange={() => {}} /></td>
        <td className="text-ink-medium">Todavía no se puede usar (por ejemplo, falta cargar el examen). Al 40% y el teclado la saltea.</td>
      </tr>
    </Tabla>
  ),
}

/* Dónde se usan, leído del código. */
const fuentes = import.meta.glob('/src/**/*.tsx', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
export const InTheApp: Story = {
  name: 'Tabs in the app',
  parameters: { controls: { disable: true } },
  render: () => {
    const usos = Object.entries(fuentes)
      .filter(([r]) => !r.includes('.stories.') && !r.includes('/design-system/') && !r.endsWith('/ui/tabs.tsx'))
      .flatMap(([ruta, texto]) => [...texto.matchAll(/<Tabs\\b([\\s\\S]*?)\\/>/g)].map((m) => ({ ruta: ruta.replace('/src/', ''), props: m[1]! })))
    return (
      <Lienzo className="max-w-none">
        <Bloque nota={\`\${usos.length} grupos de pestañas en la app, todos con este componente.\`}>
          <Tabla encabezado={['Where', 'Purpose', 'Size', 'Full width', 'Counts']} minimo={720}>
            {usos.map((u, i) => (
              <tr key={\`\${u.ruta}-\${i}\`}>
                <td className="font-mono text-[11.5px]">{u.ruta}</td>
                <td>{u.props.match(/aria-label="([^"]+)"/)?.[1] ?? '—'}</td>
                <td>{/size="sm"/.test(u.props) ? 'sm' : 'md'}</td>
                <td>{/fullWidth/.test(u.props) ? 'Yes' : '—'}</td>
                <td>{/count:/.test(u.props) ? 'Yes' : '—'}</td>
              </tr>
            ))}
          </Tabla>
        </Bloque>
      </Lienzo>
    )
  },
}

function FilaTamano({ s }: { s: 'sm' | 'md' }) {
  const { ref, m } = useMedidas('[role=tab]')
  return (
    <tr>
      <td><div ref={ref}><Tabs size={s} tabs={['Patient View', 'Guarantor View']} value="Patient View" onChange={() => {}} /></div></td>
      <td className="font-semibold">{s}</td>
      <td className="tabular-nums">{m?.alto}</td>
      <td className="tabular-nums">{m?.padding}</td>
      <td className="tabular-nums">{m?.texto} · {m?.peso}</td>
      <td className="tabular-nums">{m?.radio}</td>
    </tr>
  )
}

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Sizes" nota="Medidas de una pestaña, leídas de la pestaña dibujada.">
        <Tabla encabezado={['Sample', 'Size', 'Height', 'Padding', 'Text', 'Radius']} minimo={720}>
          <FilaTamano s="md" />
          <FilaTamano s="sm" />
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Part', 'Token']} minimo={420}>
          <tr><td className="font-semibold">Track</td><td><Token nombre="surface-slate" /></td></tr>
          <tr><td className="font-semibold">Active tab</td><td><Token nombre="dash-blue" /> · text <Token nombre="white" /></td></tr>
          <tr><td className="font-semibold">Inactive text</td><td><Token nombre="ink-slate" /> · hover <Token nombre="ink-soft" /></td></tr>
          <tr><td className="font-semibold">Focus ring</td><td><Token nombre="dash-blue" /></td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
`})))()}export{r as n,n as r,i as t};