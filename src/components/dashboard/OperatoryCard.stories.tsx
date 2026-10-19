import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { OperatoryCard, OPERATORY_SURFACES, type Operatory, type OperatoryStatus } from './OperatoryCard'
import { Bloque, Forzar, Lienzo, Muestra, Tabla, TablaPartes, Token, useMedidas } from '@/design-system/kit'
import { TARJETA_PANEL } from '@/lib/estilos'
import { cn } from '@/lib/utils'
import { tokensDe } from '@/design-system/medir'

type Args = { status: OperatoryStatus; name: string; patientsToday: number; provider: string; surface: 'On the page' | 'In a panel'; clickable: boolean; width: number }

const SALA: Operatory = { name: 'Operatory 2', status: 'Busy', patientsToday: 12, provider: 'Daniel Anderson' }
const nada = () => {}

const meta = {
  title: 'Components/Dashboard/OperatoryCard',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Una sala del Dashboard (`@/components/dashboard/OperatoryCard`): el nombre, su estado (**Available**, **Busy**, **Unavailable**), cuántos pacientes tiene hoy y el profesional.',
          '',
          '**Dónde:** en la tira de salas de arriba del Dashboard, suelta sobre la página (`enPagina`). Ahí **toma el color de su estado**: borde y fondo, los mismos de su pill (verde, azul, rojo), para ver de un vistazo qué sala está libre (Julián, 2026-10-17). Adentro de un panel va como card interna, blanca.',
          '',
          '**Tocarla la elige** (con `onClick` es un botón con `aria-pressed`): Appointments y Waiting Room muestran sólo a los de esa sala. La elegida lleva el anillo azul de selección y las demás se apagan hasta que se pasa el mouse. "Patients today" es la cantidad de turnos de la sala, así que coincide con las cards que se ven al elegirla (2026-10-19).',
          '',
          '**Probalo:** en *Playground* cambiá el estado, los textos, la superficie y el ancho desde *Controls*; con *clickable*, tocala.',
        ].join('\n'),
      },
    },
  },
  args: { status: 'Busy', name: 'Operatory 2', patientsToday: 12, provider: 'Daniel Anderson', surface: 'On the page', clickable: true, width: 260 },
  argTypes: {
    status: { control: 'inline-radio', options: ['Available', 'Busy', 'Unavailable'], description: 'El estado: el color de la pill y, sobre la página, el de la card.' },
    name: { control: 'text', description: 'Nombre de la sala, el mismo que dicen los turnos. Uno largo se corta con elipsis.' },
    patientsToday: { control: { type: 'number', min: 0 }, description: 'Pacientes de hoy, en el globo celeste.' },
    provider: { control: 'text', description: 'Profesional de la sala.' },
    surface: { control: 'inline-radio', options: ['On the page', 'In a panel'], description: 'Sobre el fondo gris (con el color del estado) o adentro de un panel (card interna, blanca).' },
    clickable: { control: 'boolean', description: 'Con onClick: un botón que elige la sala.' },
    width: { control: { type: 'range', min: 200, max: 400, step: 4 }, description: 'Ancho de la card. En la tira no baja de 232px.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>
const sinControles = { controls: { disable: true } }

/* El fondo de cada superficie: la página gris o un panel blanco. */
const Fondo = ({ enPagina, children, className }: { enPagina?: boolean; children: React.ReactNode; className?: string }) => (
  <div className={cn('rounded-lg p-4', enPagina ? 'bg-page-background' : cn(TARJETA_PANEL), className)}>{children}</div>
)

function Elegible(a: Args) {
  const [elegida, setElegida] = useState(false)
  return (
    <OperatoryCard
      room={{ name: a.name, status: a.status, patientsToday: a.patientsToday, provider: a.provider }}
      enPagina={a.surface === 'On the page'} seleccionada={elegida}
      onClick={a.clickable ? () => setElegida((v) => !v) : undefined}
    />
  )
}

export const Playground: Story = {
  render: (a) => (
    <Fondo enPagina={a.surface === 'On the page'}>
      <div style={{ width: a.width, maxWidth: '100%' }}><Elegible key={`${a.clickable}`} {...a} /></div>
    </Fondo>
  ),
}

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque nota="Arriba el nombre y la pill de estado; abajo, los pacientes de hoy y el profesional. Sobre la página, borde y fondo del color del estado.">
        <Fondo enPagina><div className="w-[260px]"><OperatoryCard room={SALA} enPagina onClick={nada} /></div></Fondo>
      </Bloque>
      <TablaPartes partes={[
        ['Name', 'El nombre de la sala, 14px Semibold, el mismo que dicen los turnos ("Operatory 2"); se corta con elipsis si no entra.', 'room.name'],
        ['Status', 'La pill del estado: verde Available, azul Busy, rojo Unavailable.', 'StatusPill'],
        ['Patients today', 'Ícono de calendario y el número en el globo celeste.', 'room.patientsToday'],
        ['Provider', 'Ícono de persona y el profesional.', 'room.provider'],
        ['Surface', 'Sobre la página, borde de 1px y fondo del color del estado; adentro de un panel, la card interna blanca.', 'enPagina · OPERATORY_SURFACES'],
        ['Selection', 'Con onClick es un botón (aria-pressed). Elegida: anillo azul de 2px a 2px; las demás al 60% hasta el hover o el foco.', 'seleccionada · atenuada · onClick'],
      ]} />
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <div className="flex flex-wrap gap-6">
        {(['Available', 'Busy', 'Unavailable'] as const).map((s, i) => (
          <Muestra key={s} titulo={s} ancho={264}>
            <Fondo enPagina><OperatoryCard room={{ ...SALA, name: `Operatory ${i + 1}`, status: s }} enPagina onClick={nada} /></Fondo>
          </Muestra>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Muestra titulo="Selected" nota="La sala que muestran Appointments y Waiting Room: anillo azul y sombra.">
          <Fondo enPagina><OperatoryCard room={SALA} enPagina seleccionada onClick={nada} /></Fondo>
        </Muestra>
        <Muestra titulo="Another one selected" nota="Se apaga al 60%; vuelve al pasar el mouse o con el foco.">
          <Fondo enPagina><OperatoryCard room={{ ...SALA, name: 'Operatory 1', status: 'Available' }} enPagina atenuada onClick={nada} /></Fondo>
        </Muestra>
        <Muestra titulo="Hover" nota="Suma la sombra de las cards.">
          <Forzar selector="button" estado="hover"><Fondo enPagina><OperatoryCard room={SALA} enPagina onClick={nada} /></Fondo></Forzar>
        </Muestra>
        <Muestra titulo="Keyboard focus" nota="El anillo de foco de la app; Enter o espacio la eligen.">
          <Forzar selector="button" estado="focus-visible"><Fondo enPagina><OperatoryCard room={SALA} enPagina onClick={nada} /></Fondo></Forzar>
        </Muestra>
        <Muestra titulo="In a panel" nota="Adentro de una card: card interna, blanca, con la línea fina.">
          <Fondo><OperatoryCard room={SALA} /></Fondo>
        </Muestra>
        <Muestra titulo="Narrowest (232px), long name" nota="El ancho mínimo en la tira: el nombre se corta con elipsis y la pill no baja de renglón.">
          <Fondo enPagina><div className="w-[232px]"><OperatoryCard room={{ ...SALA, name: 'Operatory 12 · Surgery room', status: 'Unavailable' }} enPagina onClick={nada} /></div></Fondo>
        </Muestra>
      </div>
    </Lienzo>
  ),
}

function Medidas() {
  const card = useMedidas(':scope > div > button')
  const nombre = useMedidas(':scope > button > span > span')
  return (
    <>
      <div ref={card.ref} className="w-[260px]">
        <div ref={nombre.ref}><OperatoryCard room={SALA} enPagina onClick={nada} /></div>
      </div>
      <Tabla encabezado={['Part', 'Height', 'Padding', 'Radius', 'Border', 'Gap', 'Text']} minimo={620}>
        <tr><td className="font-semibold">Card</td><td className="tabular-nums">{card.m?.alto}</td><td className="tabular-nums">{card.m?.padding}</td><td className="tabular-nums">{card.m?.radio}</td><td className="tabular-nums">{card.m?.borde}</td><td className="tabular-nums">{card.m?.gap}</td><td>—</td></tr>
        <tr><td className="font-semibold">Name</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td className="tabular-nums">{nombre.m?.texto} · {nombre.m?.peso}</td></tr>
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
      <Bloque titulo="Colors on the page" nota="De OPERATORY_SURFACES (OperatoryCard.tsx): el mismo par de tokens que la pill de cada estado.">
        <Tabla encabezado={['Status', 'Fill', 'Border']} minimo={480}>
          {(Object.keys(OPERATORY_SURFACES) as OperatoryStatus[]).map((s) => {
            const t = tokensDe(OPERATORY_SURFACES[s])
            return <tr key={s}><td className="font-semibold">{s}</td><td><Token nombre={t.fondo} /></td><td><Token nombre={t.borde} /></td></tr>
          })}
        </Tabla>
      </Bloque>
      <Bloque titulo="Selection and the rest">
        <Tabla encabezado={['Part', 'Value']} minimo={480}>
          <tr><td className="font-semibold">Selected ring</td><td><Token nombre="dash-ring" /> · 2px, 2px away</td></tr>
          <tr><td className="font-semibold">Others, while one is selected</td><td>60% opacity, back to 100% on hover or focus</td></tr>
          <tr><td className="font-semibold">Patients today</td><td><Token nombre="dash-count-bg" /> · <Token nombre="dash-blue-hover" /></td></tr>
          <tr><td className="font-semibold">In a panel</td><td>white · shadow-inner-card (TARJETA_INTERNA)</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
