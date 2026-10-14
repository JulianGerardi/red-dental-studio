import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { CalendarX2, Eye, EyeOff } from 'lucide-react'
import { NOTIFICACIONES, type EstadoNotificacion } from '@/data/notificaciones'
import type { NotificacionViva } from '@/data/notificacionesStore'
import { Bloque, ConRotulo, Forzar, Lienzo, Muestras, Tabla, Token, medidasDe, type Medidas } from '@/design-system/kit'
import { EmptyState } from '@/components/ui/empty-state'
import { Accion, FilaNotificacion, VACIO, VACIO_FECHAS, type Vista } from './Notifications'

/* La fila de Notifications, documentada como Elements (Playground, Parts, States, Types, Row action, Specs). La
   pantalla completa está en Pages › Notifications. */

type Args = {
  title: string
  detail: string
  state: EstadoNotificacion
  type: 'task' | 'notice'
  minutesAgo: number
  author: string
  actions: 'on hover' | 'shown'
}

const meta = {
  title: 'Pages/Parts/Notifications',
  parameters: {
    layout: 'padded',
    docs: {
      decisionsFrom: 'pages/Notifications.tsx',
      description: {
        component: [
          'Una notificación de la pantalla *Notifications* (`@/pages/Notifications`), con la lógica del Inbox de Notion. La pantalla completa, con sus pestañas *Inbox* y *Unread*, está en *Pages*.',
          '',
          '**Estados:** *Unread* (punto azul, fondo apenas azul, título en negrita) · *Read* (texto más apagado). Abrirla la marca leída. *Pending* y *Archived* se sacaron (Julián, 2026-10-13).',
          '',
          '**La acción:** el ojo. *Mark as read* (ojo abierto) en las sin leer, *Mark as unread* (ojo tachado) en las leídas.',
          '',
          '**Ícono:** gris en todas.',
          '',
          '**Tipos:** *Task* (firmar, confirmar, verificar; va al banner mientras esté sin leer) · *Notice* (un pago, una mención). Se ven igual: lo que cambia es si va al banner.',
          '',
          '**En el celular** no hay hover: el ojo queda siempre a la vista (ver *Guidelines › On each device*).',
          '',
          '**Con muchas notificaciones:** el filtro de fecha (*Elements / Date filter*) en la fila de las pestañas acota los números, la lista y *Mark all as read*; lo de más de una semana se agrupa por mes (*Earlier this month*, *September*…), no en un solo *Older*.',
          '',
          '**Probalo:** en *Playground* cambiá estado, tipo, texto y hace cuánto llegó desde *Controls*; pasá el mouse por la fila y tocá el ojo.',
        ].join('\n'),
      },
    },
  },
  args: {
    title: 'Document awaiting your signature',
    detail: 'Consent form for Mara Otero — sent 2 days ago.',
    state: 'unread',
    type: 'task',
    minutesAgo: 25,
    author: '',
    actions: 'on hover',
  },
  argTypes: {
    title: { control: 'text', description: 'Qué pasó, en una línea.' },
    detail: { control: 'text', description: 'El detalle: a quién y cuándo.' },
    state: { control: 'inline-radio', options: ['unread', 'read'], description: 'Sin leer o leída.' },
    type: { control: 'inline-radio', options: ['task', 'notice'], description: 'Task: va al banner mientras esté sin leer. Notice: no. El ícono es gris en los dos.' },
    minutesAgo: { control: { type: 'number', min: 0 }, description: 'Minutos desde que llegó: 25m ago, 3h ago, Yesterday, 4d ago…' },
    author: { control: 'text', description: 'Quién la generó, si fue una persona.' },
    actions: { control: 'inline-radio', options: ['on hover', 'shown'], description: 'Deja el ojo a la vista, como al pasar el mouse.', table: { category: 'Preview' } },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

const nada = () => {}
const base = (id: string, cambio: Partial<NotificacionViva> = {}): NotificacionViva => ({ ...NOTIFICACIONES.find((n) => n.id === id)!, ...cambio })

const Fondo = ({ children }: { children: ReactNode }) => <div className="bg-page-background p-4 sm:p-6">{children}</div>
const Lista = ({ children }: { children: ReactNode }) => (
  <ul className="m-0 w-full max-w-[820px] list-none overflow-hidden rounded-lg border border-line bg-white p-0">{children}</ul>
)

/* Una fila que se puede usar: las acciones cambian su estado de verdad. */
function FilaViva({ inicial, forzar }: { inicial: NotificacionViva; forzar?: 'hover' | 'focus-visible' }) {
  const [n, setN] = useState(inicial)
  const fila = (
    <Lista>
      <FilaNotificacion
        n={n}
        onAbrir={() => setN((x) => ({ ...x, estado: 'read' }))}
        onMarcar={(_, estado) => setN((x) => ({ ...x, estado }))}
      />
    </Lista>
  )
  if (forzar === 'hover') return <Forzar selector="li" estado="hover">{fila}</Forzar>
  /* Con el teclado: la fila tiene el foco adentro (aparece el ojo) y el ojo, el anillo. */
  if (forzar === 'focus-visible') return <Forzar selector="li" estado="focus-within"><Forzar selector="li > span:last-child button" estado="focus-visible">{fila}</Forzar></Forzar>
  return fila
}

/* Cambiá todo desde Controls. */
export const Playground: Story = {
  render: (a) => {
    const n = base('n1', { titulo: a.title, detalle: a.detail, estado: a.state, tarea: a.type === 'task', icon: base(a.type === 'task' ? 'n1' : 'n7').icon, hace: a.minutesAgo, autor: a.author || undefined })
    return (
      <Fondo>
        <FilaViva key={JSON.stringify(a)} inicial={n} forzar={a.actions === 'shown' ? 'hover' : undefined} />
      </Fondo>
    )
  },
}

const PARTES: [string, string][] = [
  ['Dot', 'Azul si no se leyó. Leída, no hay punto. Va centrado con el ícono.'],
  ['Icon', 'Qué tipo de aviso es. Gris en todas.'],
  ['Title', 'Qué pasó, en una línea. En negrita mientras esté sin leer; centrado con el ícono y el punto.'],
  ['Background', 'Apenas azul si está sin leer, blanco si está leída.'],
  ['Detail', 'A quién y cuándo. Más apagado cuando está leída.'],
  ['Time · author · action', 'Hace cuánto llegó, quién la generó y a dónde lleva (el mismo texto que el banner). Tocar la fila la abre y la marca leída.'],
  ['Row action', 'El ojo: Mark as read (abierto) o Mark as unread (tachado), con tooltip. Aparece al pasar el mouse o al llegar con Tab; en pantallas chicas queda a la vista.'],
]

export const Parts: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Fondo>
      <Lienzo>
        <FilaViva inicial={base('n4')} forzar="hover" />
        <Tabla encabezado={['Part', 'What it does']} minimo={560} arriba>
          {PARTES.map(([parte, que]) => (
            <tr key={parte}>
              <td className="font-semibold whitespace-nowrap">{parte}</td>
              <td className="text-ink-medium">{que}</td>
            </tr>
          ))}
        </Tabla>
      </Lienzo>
    </Fondo>
  ),
}

function Estado({ titulo, nota, children }: { titulo: string; nota: string; children: ReactNode }) {
  return (
    <figure className="m-0 flex flex-col gap-2">
      <figcaption className="flex flex-col gap-0.5">
        <span className="text-[12.5px] font-semibold text-ink">{titulo}</span>
        <span className="text-[11.5px] leading-snug text-ink-muted">{nota}</span>
      </figcaption>
      {children}
    </figure>
  )
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Fondo>
      <Lienzo>
        <Estado titulo="Unread" nota="Punto azul, fondo apenas azul y título en negrita. Cuenta en el número de la campana.">
          <FilaViva inicial={base('n3')} />
        </Estado>
        <Estado titulo="Read" nota="Sin punto y con el detalle más apagado. Abrir una sin leer la deja así.">
          <FilaViva inicial={base('n9')} />
        </Estado>
        <Estado titulo="Hover · read" nota="Fondo gris, la acción subrayada y el ojo tachado (Mark as unread) a la vista.">
          <FilaViva inicial={base('n6')} forzar="hover" />
        </Estado>
        <Estado titulo="Hover · unread" nota="El fondo pasa a gris como en las leídas; el punto azul y la negrita quedan, y aparece el ojo (Mark as read).">
          <FilaViva inicial={base('n3')} forzar="hover" />
        </Estado>
        <Estado titulo="Keyboard focus · action" nota="Al llegar con Tab a un ícono aparecen las acciones y el ícono lleva el anillo azul.">
          <FilaViva inicial={base('n6')} forzar="focus-visible" />
        </Estado>
        <Estado titulo="Keyboard focus · row" nota="Con Tab sobre el contenido: anillo azul alrededor del texto; Enter la abre y la marca leída.">
          <Forzar selector="li" estado="focus-within"><Forzar selector="li > button" estado="focus-visible"><FilaViva inicial={base('n3')} /></Forzar></Forzar>
        </Estado>
      </Lienzo>
    </Fondo>
  ),
}

export const Types: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Fondo>
      <Lienzo>
        <Estado titulo="Task" nota="Algo para hacer: firmar, confirmar un turno, verificar un seguro. Va al banner de arriba mientras esté sin leer. Ícono gris, como todas.">
          <FilaViva inicial={base('n2')} />
        </Estado>
        <Estado titulo="Notice" nota="Algo que pasó: un pago, un resultado, un plan aceptado. No va al banner.">
          <FilaViva inicial={base('n7', { estado: 'unread' })} />
        </Estado>
        <Estado titulo="Mention" nota="Un aviso con autor: “hace cuánto · quién · acción”.">
          <FilaViva inicial={base('n5')} />
        </Estado>
      </Lienzo>
    </Fondo>
  ),
}

/* Cada estado con cada tipo: todas las combinaciones que puede tener una fila. */
const VARIANTES: [string, string, NotificacionViva][] = [
  ['Unread · task', 'Punto y fondo azul, ícono gris.', base('n1')],
  ['Unread · notice', 'Igual que la tarea: el tipo no cambia cómo se ve.', base('n3')],
  ['Read · task', 'Sin punto ni fondo, texto apagado. Ya no va al banner.', base('n2', { estado: 'read' })],
  ['Read · notice', 'Sin punto ni fondo, texto apagado.', base('n7')],
]

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Fondo>
      <Lienzo>
        {VARIANTES.map(([titulo, nota, n]) => (
          <Estado key={titulo} titulo={titulo} nota={nota}><FilaViva inicial={n} /></Estado>
        ))}
      </Lienzo>
    </Fondo>
  ),
}

/* Lo que cambia con el contenido: textos largos, con y sin autor, y cómo se escribe hace cuánto llegó. */
export const Content: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Fondo>
      <Lienzo>
        <Estado titulo="Long text" nota="Título y detalle largos bajan de línea; el punto, el ícono y el ojo quedan arriba, centrados con la primera línea.">
          <FilaViva inicial={base('n2', {
            titulo: 'Referral to Dr. Alvarez for periodontal evaluation expires today and still needs your approval',
            detalle: 'Mara Otero · Periodontics referral sent on September 12 — the patient is waiting for a call from the specialist’s office to schedule the first visit.',
          })} />
        </Estado>
        <Estado titulo="With author" nota="Cuando la generó una persona: “hace cuánto · quién · acción”.">
          <FilaViva inicial={base('n5')} />
        </Estado>
        <Estado titulo="Without author" nota="Cuando la genera el sistema: “hace cuánto · acción”.">
          <FilaViva inicial={base('n3')} />
        </Estado>
        <Bloque titulo="Time" nota="Cómo se escribe hace cuánto llegó, según los minutos.">
          <Lista>
            {([['Just now', 0], ['Minutes', 25], ['Hours', 3 * 60], ['Yesterday', 26 * 60], ['Days', 4 * 24 * 60], ['Older than a week', 12 * 24 * 60]] as const).map(([titulo, hace]) => (
              <FilaNotificacion key={titulo} n={base('n7', { titulo, hace })} onAbrir={nada} onMarcar={nada} />
            ))}
          </Lista>
        </Bloque>
      </Lienzo>
    </Fondo>
  ),
}

/* Cada pestaña sin nada que mostrar: qué pasó y qué hacer. Con fechas elegidas, el vacío lo dice y ofrece sacarlas. */
export const EmptyStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Fondo>
      <Lienzo>
        {(Object.keys(VACIO) as Vista[]).map((v) => (
          <Estado key={v} titulo={v} nota={VACIO[v].detail}>
            <div className="max-w-[820px] rounded-lg border border-line bg-white"><EmptyState className="py-10" {...VACIO[v]} /></div>
          </Estado>
        ))}
        {(Object.keys(VACIO_FECHAS) as Vista[]).map((v) => (
          <Estado key={`fechas-${v}`} titulo={`${v} · with dates`} nota="Nada en las fechas elegidas: lo dice y Clear dates vuelve a All dates.">
            <div className="max-w-[820px] rounded-lg border border-line bg-white">
              <EmptyState className="py-10" icon={CalendarX2} title={VACIO_FECHAS[v]} detail="Pick other dates, or clear them to see everything." accion={{ label: 'Clear dates', onClick: nada }} />
            </div>
          </Estado>
        ))}
      </Lienzo>
    </Fondo>
  ),
}

const ACCIONES: [string, typeof Eye][] = [
  ['Mark as read', Eye],
  ['Mark as unread', EyeOff],
]

/* La acción de la fila, el ojo (pedido de Julián, 2026-10-13): abierto en las sin leer (Mark as read), tachado en las
   leídas (Mark as unread). Con su tooltip al pasar el mouse. */
export const RowActions: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Fondo>
      <Muestras>
        {ACCIONES.map(([label, icon]) => (
          <ConRotulo key={label} rotulo={label}><Accion label={label} icon={icon} onClick={nada} /></ConRotulo>
        ))}
      </Muestras>
    </Fondo>
  ),
}

const MEDIDAS: [string, string][] = [
  ['Row', 'li'],
  ['Dot', 'li > span:first-child'],
  ['Icon', 'li > span:nth-child(2)'],
  ['Title', 'li > button > span:first-child > span:first-child'],
  ['Detail', 'li > button > span:nth-child(2)'],
  ['Time · author · action', 'li > button > span:nth-child(3)'],
  ['Row action', 'li > span:last-child button'],
]

function Medir() {
  const ref = useRef<HTMLDivElement>(null)
  const [filas, setFilas] = useState<(Medidas | null)[]>([])
  useLayoutEffect(() => {
    setFilas(MEDIDAS.map(([, sel]) => {
      const el = ref.current?.querySelector<HTMLElement>(sel)
      return el ? medidasDe(el) : null
    }))
  }, [])
  return (
    <Lienzo>
      <div ref={ref}><FilaViva inicial={base('n1')} forzar="hover" /></div>
      <Bloque titulo="Sizes" nota="Medidas leídas de la fila de arriba, ya dibujada.">
        <Tabla encabezado={['Part', 'Width', 'Height', 'Padding', 'Text', 'Radius']} minimo={620}>
          {MEDIDAS.map(([parte], i) => {
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
      </Bloque>
      <Bloque titulo="Colors" nota="Los tokens de cada parte. Salen de Notifications.tsx y su valor de src/index.css.">
        <Tabla encabezado={['Part', 'Token']} minimo={480}>
          <tr><td className="font-semibold">Unread row</td><td><Token nombre="info-bg" /> at 50% · dot <Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Hover</td><td><Token nombre="surface-subtle" /></td></tr>
          <tr><td className="font-semibold">Icon</td><td><Token nombre="surface-slate" /> · icon <Token nombre="ink-slate" /></td></tr>
          <tr><td className="font-semibold">Action link</td><td><Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Divider</td><td><Token nombre="line-row" /></td></tr>
          <tr><td className="font-semibold">Tooltip</td><td><Token nombre="ink" /> · text <Token nombre="white" /></td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Shared rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>Two states only: unread and read. No Pending, no Archived.</li>
          <li>Opening a notification marks it read and goes where it happened.</li>
          <li>The row action is the eye: Mark as read (eye) or Mark as unread (eye off). It shows on hover or keyboard focus, with its tooltip; on small screens it is always visible.</li>
          <li>Mark all as read comes with Undo.</li>
          <li>Tasks go to the banner while they are unread.</li>
          <li>The icon is gray for every notification.</li>
          <li>The date filter narrows the tab counts, the list and Mark all as read to the chosen dates.</li>
          <li>Groups: Today, Yesterday, This week (calendar days), then one per month.</li>
        </ul>
      </Bloque>
    </Lienzo>
  )
}

/* Medidas y colores, leídos de la fila dibujada y de src/index.css. */
export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => <Fondo><Medir /></Fondo>,
}
