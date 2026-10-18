import { useState, type CSSProperties, type ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  ESTADOS_VISTA, GrupoFiltro, OpcionFiltro, PROVIDERS_VISTA, SALAS_VISTA, SeccionFiltro, TODOS, VISTA_INICIAL,
  ViewFiltersPanel, ViewMenu, type OpcionVista, type VistaCalendario,
} from './ViewFiltersPanel'
import { Bloque, Forzar, Lienzo, Muestra, Tabla, TablaPartes, Token } from '@/design-system/kit'
import { esperar, pulsar, secuencia } from '@/design-system/play'

const nada = () => {}
const sinControles = { controls: { disable: true } }

const LARGOS: OpcionVista[] = [
  { id: 'martinez', nombre: 'Dr. Maria Abril Viola Fernández de la Torre', detalle: 'General Dentist and Pediatric Orthodontics' },
  ...PROVIDERS_VISTA.slice(1),
]
const SALAS_LARGAS: OpcionVista[] = [
  { id: 'op1', nombre: 'Operatory 1 — North wing, second floor', detalle: 'General Dentist' },
  ...SALAS_VISTA.slice(1),
]

const etiquetas = (lista: OpcionVista[], todos: string) =>
  Object.fromEntries([[TODOS, todos], ...lista.map((o) => [o.id, `${o.nombre} (${o.id})`])])

type Args = { width: number; status: string; provider: string; room: string; search: string; longNames: boolean }

const meta = {
  title: 'Components/Scheduling/ViewFiltersPanel',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'El filtro **View** de Scheduling: qué estado, qué provider y qué sala muestra la agenda. Se abre desde el botón *View* de la barra, debajo y alineado a su borde derecho, sin fondo oscuro (`ViewMenu`, con `ui/popover`). Diseño de Julián del 2026-10-17.',
          '',
          '- **Status** en una fila de opciones; **Providers** con buscador por nombre o especialidad y la lista de a dos; **Rooms** al costado, con *Current view*: lo que se va a ver al tocar Save.',
          '- Cada grupo elige **uno o todos** ("Select all …"), como en el diseño. Arriba a la derecha de cada grupo, cuántos hay elegidos; al pie, el resumen ("1 provider · 1 room").',
          '- **Save** guarda la vista (y avisa "Calendar view updated."); **Cancel**, la ✕, Escape o un clic afuera la descartan.',
          '- Mide lo que su caja (container queries): 976px en escritorio; más angosto, Rooms baja debajo de Providers y en el celular la lista va de a uno.',
          '',
          '**Probalo:** en *Playground* cambiá el ancho, lo elegido en cada grupo, la búsqueda y los nombres largos desde *Controls*. Tocá las opciones, usá Tab y las flechas, y buscá "pediatric" o algo que no exista. En *In the toolbar*, el botón de verdad.',
        ].join('\n'),
      },
    },
  },
  args: { width: 976, status: VISTA_INICIAL.estado, provider: VISTA_INICIAL.provider, room: VISTA_INICIAL.sala, search: '', longNames: false },
  argTypes: {
    width: { control: { type: 'range', min: 320, max: 976, step: 8 }, description: 'Ancho de la caja en px. 976 en escritorio; en tablet y celular, la pantalla menos 24.' },
    status: { control: { type: 'select', labels: etiquetas(ESTADOS_VISTA, 'Select all Status') }, options: [TODOS, ...ESTADOS_VISTA.map((o) => o.id)], description: 'Estado elegido al abrir.' },
    provider: { control: { type: 'select', labels: etiquetas(PROVIDERS_VISTA, 'Select all Providers') }, options: [TODOS, ...PROVIDERS_VISTA.map((o) => o.id)], description: 'Provider elegido al abrir.' },
    room: { control: { type: 'select', labels: etiquetas(SALAS_VISTA, 'Select all Rooms') }, options: [TODOS, ...SALAS_VISTA.map((o) => o.id)], description: 'Sala elegida al abrir.' },
    search: { control: 'text', description: 'Búsqueda de providers al abrir. Probá "oral" o "zzz".' },
    longNames: { control: 'boolean', description: 'El primer provider y la primera sala con nombres largos: se recortan, no bajan de renglón.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

function Panel({ ancho = 976, inicial, busqueda, largos, alto }: { ancho?: number; inicial?: VistaCalendario; busqueda?: string; largos?: boolean; alto?: number }) {
  /* El alto disponible es la variable que pone el popover: con un tope, el cuerpo scrollea y el pie queda fijo. */
  const estilo = { width: ancho, maxWidth: 'none', ...(alto ? { '--radix-popover-content-available-height': `${alto}px` } : {}) } as CSSProperties
  return (
    <div className="overflow-x-auto p-1">
      <div style={estilo}>
        <ViewFiltersPanel
          key={JSON.stringify([inicial, busqueda, largos])}
          className="w-full"
          inicial={inicial}
          busquedaInicial={busqueda}
          providers={largos ? LARGOS : undefined}
          salas={largos ? SALAS_LARGAS : undefined}
          onClose={nada}
        />
      </div>
    </div>
  )
}

/* Cambiá ancho, selección y búsqueda desde Controls. */
export const Playground: Story = {
  render: (a) => <Panel ancho={a.width} inicial={{ estado: a.status, provider: a.provider, sala: a.room }} busqueda={a.search} largos={a.longNames} />,
}

/* El botón View de la barra, con el panel abierto como en la app. */
function EnLaBarra() {
  const [vista, setVista] = useState(VISTA_INICIAL)
  return (
    <div className="flex min-h-[880px] w-full items-start justify-end gap-2 rounded-lg bg-page-background p-4">
      <span className="flex h-8 items-center px-4 text-xs font-medium text-ink-slate">Day</span>
      <span className="bg-dash-blue flex h-8 items-center rounded-md px-4 text-xs font-medium text-white">Week</span>
      <span className="flex h-8 items-center px-4 text-xs font-medium text-ink-slate">Month</span>
      <ViewMenu valor={vista} onGuardar={setVista} />
    </div>
  )
}

export const InTheToolbar: Story = {
  name: 'In the toolbar',
  parameters: sinControles,
  render: () => <EnLaBarra />,
  play: secuencia(pulsar(/^View$/), esperar(/Customize the schedule you want to see/)),
}

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Options" nota="Una sola pieza para las tres listas: sin marca (Status y los Select all), con avatar (providers) y con el círculo de sala (rooms). Elegida, fondo celeste.">
        <div className="flex flex-wrap items-start gap-6 rounded-lg bg-white p-4">
          <GrupoFiltro etiqueta="Status sample" className="flex flex-wrap gap-2">
            <OpcionFiltro nombre="Select all Status" on={false} enfocable={false} onElegir={nada} className="px-4" />
            <OpcionFiltro nombre="Proposed" on enfocable onElegir={nada} className="px-4" />
          </GrupoFiltro>
          <GrupoFiltro etiqueta="Provider sample" className="w-[300px]">
            <OpcionFiltro nombre="Dr. Emily Okonkwo" detalle="Pediatric Specialist" marca="avatar" on={false} enfocable onElegir={nada} className="w-full" />
          </GrupoFiltro>
          <GrupoFiltro etiqueta="Room sample" className="w-[248px]">
            <OpcionFiltro nombre="Operatory 1" detalle="General Dentist" marca="sala" on enfocable onElegir={nada} className="w-full" />
          </GrupoFiltro>
        </div>
      </Bloque>
      <Bloque titulo="Section header" nota="Rótulo a la izquierda y cuántos hay elegidos a la derecha.">
        <div className="w-[400px] rounded-lg bg-white p-4"><SeccionFiltro titulo="Providers" conteo="1 of 12 selected"><span /></SeccionFiltro></div>
      </Bloque>
      <TablaPartes partes={[
        ['Header', '"View" (22px Bold) y la bajada "Customize the schedule you want to see". La ✕ cierra sin guardar. Una línea lo separa del cuerpo.', 'header · ICONO_SUELTO'],
        ['Status', 'Select all Status, Proposed, Check In y Cancelled en una fila que baja de renglón si no entra. Arriba a la derecha: "1 selected".', 'SeccionFiltro · GrupoFiltro · OpcionFiltro'],
        ['Providers search', 'Filtra por nombre o especialidad mientras se escribe. No cambia lo elegido.', 'input type="search"'],
        ['Providers', 'Select all Providers y los doce, de a dos. "1 of 12 selected" arriba; "Showing all 12 providers" (o "Showing 4 of 12") abajo.', 'OpcionFiltro marca="avatar"'],
        ['No results', 'Si la búsqueda no encuentra a nadie: el estado vacío con Clear search.', 'EmptyState'],
        ['Rooms', 'Select all Rooms y las seis salas. Al costado de Providers, separadas por una línea; en angosto, debajo.', 'OpcionFiltro marca="sala"'],
        ['Current view', 'Lo que se va a ver al tocar Save: el provider (o All providers) y "estado · sala".', 'div bg-info-bg'],
        ['Footer', 'El resumen ("1 provider · 1 room") a la izquierda y Cancel / Save a la derecha. Queda fijo: el cuerpo scrollea.', 'footer · Button lg'],
      ]} />
    </Lienzo>
  ),
}

function Fila({ estado, nota, children }: { estado: string; nota: string; children: ReactNode }) {
  return (
    <tr>
      <td className="font-semibold whitespace-nowrap">{estado}</td>
      <td>{children}</td>
      <td className="text-ink-medium">{nota}</td>
    </tr>
  )
}

const OPCION = <OpcionFiltro nombre="Dr. Emily Okonkwo" detalle="Pediatric Specialist" marca="avatar" on={false} enfocable onElegir={nada} className="w-full" />
const TODO: VistaCalendario = { estado: TODOS, provider: TODOS, sala: TODOS }

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo className="max-w-none">
      <Bloque titulo="Option">
        <Tabla encabezado={['State', 'Sample', 'What it means']} minimo={720}>
          <Fila estado="Default" nota="Radio vacío, sin fondo.">
            <div className="w-[300px]">{OPCION}</div>
          </Fila>
          <Fila estado="Hover" nota="Fondo gris muy suave: se puede tocar.">
            <Forzar selector="button" estado="hover" className="w-[300px]">{OPCION}</Forzar>
          </Fila>
          <Fila estado="Keyboard focus" nota="Anillo azul por dentro. Tab entra al grupo por la opción elegida; las flechas recorren y eligen.">
            <Forzar selector="button" estado="focus-visible" className="w-[300px] p-1">{OPCION}</Forzar>
          </Fila>
          <Fila estado="Selected" nota="Radio lleno y fondo celeste (info-bg). Una por grupo.">
            <div className="w-[300px]"><OpcionFiltro nombre="Dr. Emily Okonkwo" detalle="Pediatric Specialist" marca="avatar" on enfocable onElegir={nada} className="w-full" /></div>
          </Fila>
          <Fila estado="Long name" nota="Nombre y bajada se recortan en un renglón; el nombre completo queda en el title.">
            <div className="w-[300px]"><OpcionFiltro nombre={LARGOS[0].nombre} detalle={LARGOS[0].detalle} marca="avatar" on={false} enfocable onElegir={nada} className="w-full" /></div>
          </Fila>
        </Tabla>
      </Bloque>
      <Muestra titulo="Default" nota="Como abre la primera vez: Proposed, Dr. Martinez's y Operatory 1, el ejemplo del diseño.">
        <Panel />
      </Muestra>
      <Muestra titulo="Everything selected" nota="Select all en los tres grupos: 3 selected, 12 of 12 y 6 of 6; Current view dice All providers · All statuses · All rooms.">
        <Panel inicial={TODO} />
      </Muestra>
      <Muestra titulo="Search with results" nota={'"pediatric": quedan los cuatro Pediatric Specialist y el pie dice "Showing 4 of 12 providers".'}>
        <Panel busqueda="pediatric" />
      </Muestra>
      <Muestra titulo="Selected provider hidden by the search" nota={'"oral" esconde a Dr. Martinez\'s, pero sigue elegido: 1 of 12 y Current view no cambian. Tab entra por Select all Providers.'}>
        <Panel busqueda="oral" />
      </Muestra>
      <Muestra titulo="No results" nota="Ningún provider coincide: el estado vacío con Clear search, que vuelve a mostrar los doce.">
        <Panel busqueda="zzz" />
      </Muestra>
      <Muestra titulo="Short screen" nota="Con poco alto (una laptop de 768px), el cuerpo scrollea y el encabezado y el pie quedan fijos.">
        <Panel alto={520} />
      </Muestra>
      <Muestra titulo="Long names" nota="Se recortan con puntos suspensivos: la grilla no se desarma.">
        <Panel largos inicial={{ ...VISTA_INICIAL, provider: 'martinez' }} />
      </Muestra>
    </Lienzo>
  ),
}

/* Los tres anchos: la caja mide lo de la pantalla menos 24 hasta 976. */
export const Widths: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo className="max-w-none">
      <Muestra titulo="Desktop · 976px" nota="Rooms al costado de Providers, separado por una línea; providers de a dos.">
        <Panel ancho={976} />
      </Muestra>
      <Muestra titulo="Tablet · 744px (768 − 24)" nota="Rooms baja debajo de Providers, de a dos, con Current view al final.">
        <Panel ancho={744} />
      </Muestra>
      <Muestra titulo="Phone · 351px (375 − 24)" nota="Todo de a uno; Status baja de renglón. El cuerpo scrollea con el alto que deja la pantalla.">
        <Panel ancho={351} alto={620} />
      </Muestra>
    </Lienzo>
  ),
}

export const Specs: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Measures" nota="De ViewFiltersPanel.tsx.">
        <Tabla encabezado={['Part', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Panel</td><td>976px máx., la pantalla − 24 debajo de eso · radio 12 · <code>shadow-floating</code> · 6px debajo de View, alineado a su borde derecho, a 12px como mínimo de los bordes de la pantalla</td></tr>
          <tr><td className="font-semibold">Height</td><td>El alto que deja la pantalla (<code>--radix-popover-content-available-height</code>): encabezado y pie fijos, el cuerpo scrollea</td></tr>
          <tr><td className="font-semibold">Padding</td><td>24px a los lados desde 672px de caja; 16px más angosto</td></tr>
          <tr><td className="font-semibold">Title · subtitle</td><td>22px Bold ink · 11px Regular ink-muted</td></tr>
          <tr><td className="font-semibold">Section label · count</td><td>13px Medium ink · 11px ink-muted, números tabulares</td></tr>
          <tr><td className="font-semibold">Option</td><td>40px mín. · padding 6/12 (Status 6/16) · radio 8 · gap 12 · radio de 18px (<code>Radio</code>) · nombre 13px Semibold · bajada 11px ink-muted</td></tr>
          <tr><td className="font-semibold">Avatar · room</td><td>28px · iniciales 10px Semibold dash-blue sobre dash-count-bg · círculo dash-blue</td></tr>
          <tr><td className="font-semibold">Search</td><td>36px · borde line, dash-blue con foco · ícono 16px · 13px</td></tr>
          <tr><td className="font-semibold">Columns</td><td>Providers de a dos desde 512px de caja; Rooms de 248px al costado desde 896px (24px a cada lado de la línea)</td></tr>
          <tr><td className="font-semibold">Current view</td><td>info-bg · radio 8 · padding 12/16 · 11px Medium dash-blue, 13px Semibold, 11px ink-muted</td></tr>
          <tr><td className="font-semibold">Footer</td><td>Línea arriba · padding 16/24 · resumen 12px ink-muted · Cancel y Save <code>Button</code> lg (36px)</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Use', 'Token']} minimo={480}>
          <tr><td>Selected option · Current view</td><td><Token nombre="info-bg" /></td></tr>
          <tr><td>Hover</td><td><Token nombre="surface-subtle" /></td></tr>
          <tr><td>Radio · focus · room · Save</td><td><Token nombre="dash-blue" /></td></tr>
          <tr><td>Avatar</td><td><Token nombre="dash-count-bg" /></td></tr>
          <tr><td>Secondary text</td><td><Token nombre="ink-muted" /></td></tr>
          <tr><td>Dividers · search border</td><td><Token nombre="line" /></td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Behavior">
        <Tabla encabezado={['Rule', 'Why']} minimo={560}>
          <tr><td className="font-semibold">Uno o todos por grupo</td><td>Así está en el diseño: radios, con "Select all" como una opción más.</td></tr>
          <tr><td className="font-semibold">Save guarda, lo demás descarta</td><td>Cancel, la ✕, Escape y un clic afuera dejan la vista como estaba; al abrir de nuevo arranca de lo guardado.</td></tr>
          <tr><td className="font-semibold">Teclado</td><td>Tab: búsqueda, ✕ y un paso por grupo (la opción elegida). Flechas: recorren y eligen, como un radio nativo.</td></tr>
          <tr><td className="font-semibold">La búsqueda no elige</td><td>Esconder al provider elegido no lo saca: el conteo y Current view siguen diciendo lo que se va a ver.</td></tr>
          <tr><td className="font-semibold">Gris legible</td><td>La bajada, los conteos y las especialidades van en ink-muted (4.8:1) y no en el gris claro del diseño (2.6:1).</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
