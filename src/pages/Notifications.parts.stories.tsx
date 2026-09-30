import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Archive, ArchiveRestore, Clock, Mail, MailOpen } from 'lucide-react'
import { NOTIFICACIONES, type EstadoNotificacion } from '@/data/notificaciones'
import type { NotificacionViva } from '@/data/notificacionesStore'
import { Bloque, ConRotulo, Forzar, Lienzo, Muestras, Tabla, Token, medidasDe, type Medidas } from '@/design-system/kit'
import { Accion, FilaNotificacion } from './Notifications'

/* La fila de Notifications, documentada como Elements (Playground, Parts, States, Types, Row actions, Specs). La
   pantalla completa está en Pages › Notifications. */

type Args = {
  title: string
  detail: string
  state: EstadoNotificacion
  type: 'task' | 'notice'
  archived: boolean
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
          'Una notificación de la pantalla *Notifications* (`@/pages/Notifications`), con la lógica del Inbox de Notion. La pantalla completa, con sus pestañas y acciones en lote, está en *Pages*.',
          '',
          '**Estados:** *Unread* (punto azul, fondo apenas azul, título en negrita) · *Read* (texto más apagado) · *Pending* (lo mismo que sin leer pero en amarillo: punto `amber` y fondo amarillo tenue; quedó para hacer). Abrirla la marca leída; una pendiente sigue pendiente. Archivada sale del Inbox y vuelve con *Move to inbox*.',
          '',
          '**Tipos:** *Task* (ícono ámbar: firmar, confirmar, verificar; va al banner mientras no esté leída) · *Notice* (ícono gris: un pago, una mención).',
          '',
          '**Probalo:** en *Playground* cambiá estado, tipo, texto y hace cuánto llegó desde *Controls*; pasá el mouse por la fila para ver las acciones, cada una con su tooltip.',
        ].join('\n'),
      },
    },
  },
  args: {
    title: 'Document awaiting your signature',
    detail: 'Consent form for Mara Otero — sent 2 days ago.',
    state: 'unread',
    type: 'task',
    archived: false,
    minutesAgo: 25,
    author: '',
    actions: 'on hover',
  },
  argTypes: {
    title: { control: 'text', description: 'Qué pasó, en una línea.' },
    detail: { control: 'text', description: 'El detalle: a quién y cuándo.' },
    state: { control: 'inline-radio', options: ['unread', 'read', 'pending'], description: 'Sin leer, leída o pendiente.' },
    type: { control: 'inline-radio', options: ['task', 'notice'], description: 'Task: ícono ámbar y va al banner. Notice: ícono gris.' },
    archived: { control: 'boolean', description: 'Archivada: la acción pasa a Move to inbox.' },
    minutesAgo: { control: { type: 'number', min: 0 }, description: 'Minutos desde que llegó: 25m ago, 3h ago, Yesterday, 4d ago…' },
    author: { control: 'text', description: 'Quién la generó, si fue una persona.' },
    actions: { control: 'inline-radio', options: ['on hover', 'shown'], description: 'Deja las acciones a la vista, como al pasar el mouse.', table: { category: 'Preview' } },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

const nada = () => {}
const base = (id: string, cambio: Partial<NotificacionViva> = {}): NotificacionViva => ({ ...NOTIFICACIONES.find((n) => n.id === id)!, archivada: false, ...cambio })

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
        onAbrir={() => setN((x) => ({ ...x, estado: x.estado === 'unread' ? 'read' : x.estado }))}
        onMarcar={(_, estado) => setN((x) => ({ ...x, estado }))}
        onArchivar={(_, archivada) => setN((x) => ({ ...x, archivada }))}
      />
    </Lista>
  )
  if (forzar === 'hover') return <Forzar selector="li" estado="hover">{fila}</Forzar>
  /* Con el teclado: la fila tiene el foco adentro (aparecen las acciones) y el primer ícono, el anillo. */
  if (forzar === 'focus-visible') return <Forzar selector="li" estado="focus-within"><Forzar selector="li > span:last-child button" estado="focus-visible">{fila}</Forzar></Forzar>
  return fila
}

/* Cambiá todo desde Controls. */
export const Playground: Story = {
  render: (a) => {
    const n = base('n1', { titulo: a.title, detalle: a.detail, estado: a.state, tarea: a.type === 'task', icon: base(a.type === 'task' ? 'n1' : 'n7').icon, archivada: a.archived, hace: a.minutesAgo, autor: a.author || undefined })
    return (
      <Fondo>
        <FilaViva key={JSON.stringify(a)} inicial={n} forzar={a.actions === 'shown' ? 'hover' : undefined} />
      </Fondo>
    )
  },
}

const PARTES: [string, string][] = [
  ['Dot', 'Azul si no se leyó, amarillo si está pendiente. Leída, no hay punto. Va centrado con el ícono.'],
  ['Icon', 'Qué tipo de aviso es. Ámbar si es una tarea (firmar, confirmar, verificar), gris si es un aviso.'],
  ['Title', 'Qué pasó, en una línea. En negrita mientras esté sin leer o pendiente; centrado con el ícono y el punto.'],
  ['Background', 'Apenas azul si está sin leer, amarillo tenue si está pendiente, blanco si está leída.'],
  ['Detail', 'A quién y cuándo. Más apagado cuando está leída.'],
  ['Time · author · action', 'Hace cuánto llegó, quién la generó y a dónde lleva (el mismo texto que el banner). Tocar la fila la abre y la marca leída.'],
  ['Row actions', 'Leída/no leída, pendiente y archivar, con tooltip. Aparecen al pasar el mouse o al llegar con Tab; en pantallas chicas quedan a la vista.'],
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
        <Estado titulo="Pending" nota="Quedó para hacer: como sin leer, pero en amarillo (punto y fondo), y el reloj activo. Abrirla no le saca el pendiente.">
          <FilaViva inicial={base('n4')} />
        </Estado>
        <Estado titulo="Archived" nota="Fuera del Inbox, en la pestaña Archived. La acción pasa a Move to inbox.">
          <FilaViva inicial={base('n10', { archivada: true })} />
        </Estado>
        <Estado titulo="Hover" nota="Fondo gris, la acción subrayada y los tres íconos a la vista.">
          <FilaViva inicial={base('n6')} forzar="hover" />
        </Estado>
        <Estado titulo="Keyboard focus" nota="Al llegar con Tab a un ícono aparecen las acciones y el ícono lleva el anillo azul.">
          <FilaViva inicial={base('n6')} forzar="focus-visible" />
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
        <Estado titulo="Task" nota="Algo para hacer: firmar, confirmar un turno, verificar un seguro. Ícono ámbar; va al banner de arriba mientras no esté leída ni archivada.">
          <FilaViva inicial={base('n2')} />
        </Estado>
        <Estado titulo="Notice" nota="Algo que pasó: un pago, un resultado, un plan aceptado. Ícono gris; no va al banner.">
          <FilaViva inicial={base('n7', { estado: 'unread' })} />
        </Estado>
        <Estado titulo="Mention" nota="Un aviso con autor: “hace cuánto · quién · acción”.">
          <FilaViva inicial={base('n5')} />
        </Estado>
      </Lienzo>
    </Fondo>
  ),
}

const ACCIONES: [string, typeof Mail, boolean][] = [
  ['Mark as read', MailOpen, false],
  ['Mark as unread', Mail, false],
  ['Mark as pending', Clock, false],
  ['Remove from pending', Clock, true],
  ['Archive', Archive, false],
  ['Move to inbox', ArchiveRestore, false],
]

/* Los íconos de la fila: el de leída cambia a no leída y viceversa; el reloj queda ámbar mientras está pendiente;
   archivar pasa a Move to inbox en las archivadas. Cada uno con su tooltip al pasar el mouse. */
export const RowActions: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Fondo>
      <Muestras>
        {ACCIONES.map(([label, icon, activo]) => (
          <ConRotulo key={label} rotulo={label}><Accion label={label} icon={icon} activo={activo} onClick={nada} /></ConRotulo>
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
          <tr><td className="font-semibold">Task icon</td><td><Token nombre="amber" /> at 15% · icon <Token nombre="attn-fg" /></td></tr>
          <tr><td className="font-semibold">Notice icon</td><td><Token nombre="surface-slate" /> · icon <Token nombre="ink-slate" /></td></tr>
          <tr><td className="font-semibold">Pending row</td><td><Token nombre="warn-bg" /> · dot <Token nombre="amber" /> · clock <Token nombre="warn-fg" /></td></tr>
          <tr><td className="font-semibold">Action link</td><td><Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Divider</td><td><Token nombre="line-row" /></td></tr>
          <tr><td className="font-semibold">Tooltip</td><td><Token nombre="ink" /> · text <Token nombre="white" /></td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Shared rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>Opening a notification marks it read and goes where it happened; a pending one stays pending.</li>
          <li>Archiving, Archive read, Archive all and Mark all as read always come with Undo.</li>
          <li>Row actions show on hover or keyboard focus, each with its tooltip; on small screens they are always visible.</li>
          <li>Tasks go to the banner while they are unread or pending and not archived.</li>
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
