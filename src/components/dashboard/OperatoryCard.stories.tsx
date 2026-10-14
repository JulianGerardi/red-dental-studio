import type { Meta, StoryObj } from '@storybook/react-vite'
import { OperatoryCard, type Operatory, type OperatoryStatus } from './OperatoryCard'
import { Bloque, Lienzo, Muestra, Tabla, TablaPartes, Token, useMedidas } from '@/design-system/kit'
import { TARJETA_PANEL } from '@/lib/estilos'
import { cn } from '@/lib/utils'

type Args = { status: OperatoryStatus; name: string; patientsToday: number; provider: string; surface: 'On the page' | 'In a panel'; width: number }

const SALA: Operatory = { name: 'Operatory name', status: 'Available', patientsToday: 12, provider: 'Daniel Anderson' }

const meta = {
  title: 'Components/Dashboard/OperatoryCard',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Una sala del Dashboard (`@/components/dashboard/OperatoryCard`): el nombre, su estado (**Available**, **Busy**, **Unavailable**), cuántos pacientes tiene hoy y el profesional.',
          '',
          '**Dónde:** en la tira de salas de arriba del Dashboard, suelta sobre la página (`enPagina`: la card de página, sombra y sin borde, 2026-10-13). Adentro de un panel va como card interna (línea fina y sombra suave).',
          '',
          '**Probalo:** en *Playground* cambiá el estado, los textos, la superficie y el ancho desde *Controls*.',
        ].join('\n'),
      },
    },
  },
  args: { status: 'Available', name: 'Operatory name', patientsToday: 12, provider: 'Daniel Anderson', surface: 'On the page', width: 260 },
  argTypes: {
    status: { control: 'inline-radio', options: ['Available', 'Busy', 'Unavailable'], description: 'El estado: el color de la pill.' },
    name: { control: 'text', description: 'Nombre de la sala. Uno largo se corta con elipsis.' },
    patientsToday: { control: { type: 'number', min: 0 }, description: 'Pacientes de hoy, en el globo celeste.' },
    provider: { control: 'text', description: 'Profesional de la sala.' },
    surface: { control: 'inline-radio', options: ['On the page', 'In a panel'], description: 'Sobre el fondo gris (card de página) o adentro de un panel (card interna).' },
    width: { control: { type: 'range', min: 200, max: 400, step: 4 }, description: 'Ancho de la card. En la tira no baja de 232px.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>
const sinControles = { controls: { disable: true } }

/* El fondo de cada superficie: la página gris o un panel blanco. */
const Fondo = ({ enPagina, children }: { enPagina?: boolean; children: React.ReactNode }) => (
  <div className={cn('rounded-lg p-4', enPagina ? 'bg-page-background' : cn(TARJETA_PANEL))}>{children}</div>
)

export const Playground: Story = {
  render: (a) => (
    <Fondo enPagina={a.surface === 'On the page'}>
      <div style={{ width: a.width, maxWidth: '100%' }}>
        <OperatoryCard room={{ name: a.name, status: a.status, patientsToday: a.patientsToday, provider: a.provider }} enPagina={a.surface === 'On the page'} />
      </div>
    </Fondo>
  ),
}

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque nota="Arriba el nombre y la pill de estado; abajo, los pacientes de hoy y el profesional.">
        <Fondo enPagina><div className="w-[260px]"><OperatoryCard room={SALA} enPagina /></div></Fondo>
      </Bloque>
      <TablaPartes partes={[
        ['Name', 'El nombre de la sala, 14px Semibold; se corta con elipsis si no entra.', 'room.name'],
        ['Status', 'La pill del estado: verde Available, azul Busy, rojo Unavailable.', 'StatusPill'],
        ['Patients today', 'Ícono de calendario y el número en el globo celeste.', 'room.patientsToday'],
        ['Provider', 'Ícono de persona y el profesional.', 'room.provider'],
        ['Surface', 'Sobre la página, la card de página (sombra, sin borde); adentro de un panel, la card interna.', 'enPagina'],
      ]} />
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <div className="grid gap-6 md:grid-cols-3">
        {(['Available', 'Busy', 'Unavailable'] as const).map((s) => (
          <Muestra key={s} titulo={s}>
            <Fondo enPagina><OperatoryCard room={{ ...SALA, status: s }} enPagina /></Fondo>
          </Muestra>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Muestra titulo="On the page" nota="La tira de salas del Dashboard: card de página.">
          <Fondo enPagina><OperatoryCard room={SALA} enPagina /></Fondo>
        </Muestra>
        <Muestra titulo="In a panel" nota="Adentro de una card: card interna, con la línea fina.">
          <Fondo><OperatoryCard room={SALA} /></Fondo>
        </Muestra>
        <Muestra titulo="Narrowest (232px)" nota="El ancho mínimo en la tira: entra el nombre con la pill más larga.">
          <Fondo enPagina><div className="w-[232px]"><OperatoryCard room={{ ...SALA, status: 'Unavailable' }} enPagina /></div></Fondo>
        </Muestra>
        <Muestra titulo="Long name" nota="Se corta con elipsis; la pill no baja de renglón.">
          <Fondo enPagina><div className="w-[232px]"><OperatoryCard room={{ ...SALA, name: 'Operatory 12 · Surgery room' }} enPagina /></div></Fondo>
        </Muestra>
      </div>
    </Lienzo>
  ),
}

function Medidas() {
  const card = useMedidas(':scope > div > div')
  const nombre = useMedidas('p')
  return (
    <>
      <div ref={card.ref} className="w-[260px]">
        <div ref={nombre.ref}><OperatoryCard room={SALA} enPagina /></div>
      </div>
      <Tabla encabezado={['Part', 'Height', 'Padding', 'Radius', 'Gap', 'Text']} minimo={560}>
        <tr><td className="font-semibold">Card</td><td className="tabular-nums">{card.m?.alto}</td><td className="tabular-nums">{card.m?.padding}</td><td className="tabular-nums">{card.m?.radio}</td><td className="tabular-nums">{card.m?.gap}</td><td>—</td></tr>
        <tr><td className="font-semibold">Name</td><td>—</td><td>—</td><td>—</td><td>—</td><td className="tabular-nums">{nombre.m?.texto} · {nombre.m?.peso}</td></tr>
      </Tabla>
    </>
  )
}

export const Specs: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Size" nota="Leído de la card dibujada, a 260px.">
        <Medidas />
      </Bloque>
      <Bloque titulo="Colors" nota="Los tokens de cada estado (src/index.css) y de cada superficie (lib/estilos).">
        <Tabla encabezado={['Part', 'Fill', 'Text / line']} minimo={560}>
          <tr><td className="font-semibold">Available</td><td><Token nombre="dash-ok-bg" /></td><td><Token nombre="dash-ok-fg" /></td></tr>
          <tr><td className="font-semibold">Busy</td><td><Token nombre="dash-busy-bg" /></td><td><Token nombre="dash-busy-fg" /></td></tr>
          <tr><td className="font-semibold">Unavailable</td><td><Token nombre="dash-bad-bg" /></td><td><Token nombre="dash-bad-fg" /></td></tr>
          <tr><td className="font-semibold">Patients today</td><td><Token nombre="dash-count-bg" /></td><td><Token nombre="dash-blue-hover" /></td></tr>
          <tr><td className="font-semibold">On the page</td><td>white · shadow-panel (TARJETA_PANEL)</td><td>—</td></tr>
          <tr><td className="font-semibold">In a panel</td><td>white · shadow-inner-card (TARJETA_INTERNA)</td><td>—</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
