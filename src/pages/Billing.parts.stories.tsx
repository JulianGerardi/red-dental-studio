import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import Billing from './Billing'
import { ActividadReciente, BuscarPaciente, ResultadoPaciente, Stat } from './Billing'
import { Bloque, Forzar, Lienzo, Tabla, Token, medidasDe, type Medidas } from '@/design-system/kit'
import { ACTIVIDAD_RECIENTE, FILTROS_ACTIVIDAD, PACIENTES_BILLING, STATS_HOY, saldoDe, type FiltroActividad } from '@/data/billing'

/* Playground, Parts, States y Specs de Billing; decisiones en design-reference/figma/modulos/billing.md (2026-10-09). */

const NOMBRES = PACIENTES_BILLING.map((p) => p.nombre)

type Args = {
  selectedPatient: 'None' | (typeof NOMBRES)[number]
  filter: FiltroActividad
  search: string
  emptyActivity: boolean
}

const meta = {
  title: 'Pages/Parts/Billing',
  parameters: {
    layout: 'padded',
    docs: {
      decisionsFrom: 'pages/Billing.tsx',
      description: {
        component: [
          'El resumen de cobros de toda la clínica (`@/pages/Billing`): los números del día arriba, **Recent Billing Activity** a la izquierda y **Find Patient** y **Today** a la derecha. La pantalla completa está en *Pages*.',
          '',
          '**Cómo se usa:** se elige un paciente tocando una fila de la tabla o un resultado de Find Patient. Arriba de la tabla aparecen sus dos saldos y **sus filas y su card quedan en celeste** (`dash-count-bg`, el mismo del rango nuevo de Coverage Table) hasta que se elige otro o se toca la X. En el celular, elegir en Find Patient sube hasta los saldos.',
          '',
          '**Cards:** los paneles son `Panel` (título de 15px sin ícono, como Patients y el Dashboard); lo que va adentro (los resultados, los números de Today y del paciente elegido) es `InnerCard`.',
          '',
          '**Probalo:** en *Playground* elegí paciente, filtro, búsqueda y actividad vacía desde *Controls*, o tocá filas y resultados. *Parts* dice qué hace cada parte, *States* muestra cada una en cada estado y *Specs* trae medidas y colores.',
        ].join('\n'),
      },
    },
  },
  args: { selectedPatient: 'Maria Abril Viola', filter: 'All', search: '', emptyActivity: false },
  argTypes: {
    selectedPatient: { control: 'select', options: ['None', ...NOMBRES], description: 'El paciente elegido: sus saldos arriba de la tabla y sus filas y su card en celeste.' },
    filter: { control: 'inline-radio', options: [...FILTROS_ACTIVIDAD], description: 'Las Tabs de Recent Billing Activity.' },
    search: { control: 'text', description: 'Lo escrito en Find Patient. “zzz” muestra el vacío.' },
    emptyActivity: { control: 'boolean', description: 'Todavía no se posteó nada: la tabla vacía.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

const sinControles = { controls: { disable: true } }
const nada = () => {}
const filasDe = (f: FiltroActividad) => ACTIVIDAD_RECIENTE.filter((m) => f === 'All' || (f === 'Pt Payment' && m.tipo === 'Payment') || (f === 'Charge Adj' && m.tipo === 'Adjustment' && m.monto > 0) || (f === 'Credit Adj' && m.tipo === 'Adjustment' && m.monto < 0))
const [john, maria, , diego] = PACIENTES_BILLING

const Fondo = ({ children }: { children: ReactNode }) => <div className="bg-page-background p-4 sm:p-6">{children}</div>

/* La pantalla con lo que se eligió en Controls. En su propio iframe, para que el drawer de Post payment se abra adentro. */
export const Playground: Story = {
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 1180 } } },
  render: (a) => (
    <div className="bg-page-background min-h-screen">
      <Billing
        key={JSON.stringify(a)}
        inicial={{ seleccionado: a.selectedPatient === 'None' ? undefined : a.selectedPatient, filtro: a.filter, busqueda: a.search, vacia: a.emptyActivity }}
      />
    </div>
  ),
}

/* ── Parts ─────────────────────────────────────────────────────────── */

const PARTES: [string, string, string][] = [
  ['Header', 'Billing y las tres acciones (Patient Payment, Credit Adjustment, Charge Adjustment), que abren Post payment con el tipo ya elegido, y Export statement.', 'Billing'],
  ['Summary numbers', 'Cinco números de toda la clínica, cada uno en una card de página (sombra, sin borde).', 'Stat'],
  ['Recent Billing Activity', 'Panel con las Tabs de tipo en el encabezado (en el celular bajan abajo del título), los saldos del paciente elegido y la tabla.', 'ActividadReciente · Panel'],
  ['Selected patient', 'Nombre y rol, la X para soltarlo y dos números en InnerCard: Unapplied Credits y Open Balance.', 'ActividadReciente · Stat interna'],
  ['Activity table', 'La tabla de la app, compacta. Clic en una fila elige a ese paciente; sus filas quedan en celeste.', 'DataTable (selected sin selectable)'],
  ['Find Patient', 'Panel con el buscador (nombre, apellido o email) y los resultados.', 'BuscarPaciente · Panel'],
  ['Patient result', 'InnerCard con iniciales, nombre, último pago y saldo. Hover gris; el elegido queda en celeste.', 'ResultadoPaciente'],
  ['Today', 'Panel con tres números del día, cada uno en InnerCard.', 'Panel · Stat interna'],
  ['Post payment', 'Drawer para registrar el pago o el ajuste; si hay un paciente elegido, arranca con él.', 'PostPaymentDialog'],
]

export const Parts: Story = {
  parameters: { ...sinControles, layout: 'fullscreen' },
  render: () => (
    <div className="flex flex-col gap-6 bg-page-background pb-6">
      <Billing inicial={{ seleccionado: 'Maria Abril Viola' }} />
      <div className="px-4 sm:px-6">
        <Tabla encabezado={['Part', 'What it does', 'Component']} minimo={760} arriba>
          {PARTES.map(([parte, que, componente]) => (
            <tr key={parte}>
              <td className="font-semibold whitespace-nowrap">{parte}</td>
              <td className="text-ink-medium">{que}</td>
              <td className="font-mono text-[12px] text-ink-muted">{componente}</td>
            </tr>
          ))}
        </Tabla>
      </div>
    </div>
  ),
}

/* ── States ────────────────────────────────────────────────────────── */

function Estado({ titulo, nota, ancho, children }: { titulo: string; nota: string; ancho: number; children: ReactNode }) {
  return (
    <figure className="m-0 flex max-w-full flex-col gap-2" style={{ width: ancho }}>
      <figcaption className="flex flex-col gap-0.5">
        <span className="text-[12.5px] font-semibold text-ink">{titulo}</span>
        <span className="text-[11.5px] leading-snug text-ink-muted">{nota}</span>
      </figcaption>
      {children}
    </figure>
  )
}

const Fila = ({ children }: { children: ReactNode }) => <div className="flex flex-wrap items-start gap-x-6 gap-y-8">{children}</div>

function Resultado({ elegido, forzar, largo }: { elegido?: boolean; forzar?: 'hover' | 'focus-visible'; largo?: boolean }) {
  const p = largo ? { ...diego!, nombre: 'Maria Fernanda Abril Viola de la Torre' } : elegido ? maria! : john!
  const card = <ResultadoPaciente paciente={p} saldo={saldoDe(p.nombre)} elegido={elegido} onElegir={nada} />
  /* Sobre el blanco del panel, como en la pantalla. */
  return <div className="rounded-lg bg-white p-4">{forzar ? <Forzar selector="button" estado={forzar}>{card}</Forzar> : card}</div>
}

function Buscador({ q, elegido }: { q: string; elegido?: string }) {
  const [busqueda, setBusqueda] = useState(q)
  const [sel, setSel] = useState(elegido ?? null)
  return <BuscarPaciente busqueda={busqueda} onBusqueda={setBusqueda} seleccionado={sel} saldoDe={saldoDe} onElegir={setSel} />
}

/* `sinCoincidencias`: hay actividad pero ninguna del tipo elegido (con los datos de ejemplo cada tipo tiene filas). */
function Actividad({ filtro: inicial = 'All', elegido, vacia, sinCoincidencias }: { filtro?: FiltroActividad; elegido?: string; vacia?: boolean; sinCoincidencias?: boolean }) {
  const [filtro, setFiltro] = useState(inicial)
  const [sel, setSel] = useState<string | null>(elegido ?? null)
  const paciente = PACIENTES_BILLING.find((p) => p.nombre === sel)
  return (
    <ActividadReciente
      filas={vacia || sinCoincidencias ? [] : filasDe(filtro)} sinActividad={vacia} filtro={filtro} onFiltro={setFiltro}
      paciente={paciente} saldo={paciente ? saldoDe(paciente.nombre) : 0} onElegir={setSel} onLimpiar={() => setSel(null)}
    />
  )
}

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Fondo>
      <div className="flex flex-col gap-10">
        <Bloque titulo="Patient result">
          <Fila>
            <Estado titulo="Default" nota="InnerCard: línea de medio pixel y sombra suave, sobre el panel blanco." ancho={280}><Resultado /></Estado>
            <Estado titulo="Hover" nota="Fondo gris, como la fila de una tabla: se puede elegir." ancho={280}><Resultado forzar="hover" /></Estado>
            <Estado titulo="Selected" nota="El paciente elegido: celeste dash-count-bg (el del rango nuevo de Coverage Table) hasta que se elige otro o se toca la X." ancho={280}><Resultado elegido /></Estado>
            <Estado titulo="Focus" nota="Con el teclado: anillo azul por fuera de la card." ancho={280}><Resultado forzar="focus-visible" /></Estado>
            <Estado titulo="Long name" nota="El nombre se corta con “…”; el saldo no se mueve." ancho={280}><Resultado largo /></Estado>
          </Fila>
        </Bloque>
        <Bloque titulo="Find Patient">
          <Fila>
            <Estado titulo="With results" nota="Sin búsqueda muestra los recientes. Tocá uno: queda en celeste." ancho={280}><Buscador q="" elegido="Maria Abril Viola" /></Estado>
            <Estado titulo="Searching" nota="Filtra por nombre mientras se escribe; la X limpia la búsqueda." ancho={280}><Buscador q="ma" /></Estado>
            <Estado titulo="No results" nota="Nada coincide con lo escrito." ancho={280}><Buscador q="zzz" /></Estado>
          </Fila>
        </Bloque>
        <Bloque titulo="Recent Billing Activity" nota="Tocá una fila para elegir a otro paciente o la X para soltarlo.">
          <Fila>
            <Estado titulo="Selected patient" nota="Sus saldos en InnerCard arriba de la tabla y sus filas en celeste (selected, sin casillas)." ancho={960}><Actividad elegido="Maria Abril Viola" /></Estado>
            <Estado titulo="Default" nota="Sin paciente elegido: sólo la tabla. Hover gris en cada fila." ancho={960}><Actividad /></Estado>
            <Estado titulo="Filtered, no entries" nota="Hay actividad pero ninguna del tipo elegido en las Tabs." ancho={960}><Actividad filtro="Charge Adj" sinCoincidencias /></Estado>
            <Estado titulo="Empty" nota="Todavía no se posteó nada." ancho={960}><Actividad vacia /></Estado>
            <Estado titulo="Narrow" nota="En el celular las Tabs bajan abajo del título y la tabla scrollea de costado adentro de su caja." ancho={343}><Actividad elegido="John Hayes" /></Estado>
          </Fila>
        </Bloque>
        <Bloque titulo="Numbers">
          <Fila>
            <Estado titulo="On the page" nota="Los cinco de arriba: card de página, sombra y sin borde." ancho={248}><Stat label="Total A/R" value="$2,131.86" caption="Across patient and insurance balances" /></Estado>
            <Estado titulo="Inside a panel" nota="Today y Selected patient: InnerCard." ancho={248}><div className="rounded-lg bg-white p-4"><Stat interna {...STATS_HOY[0]!} /></div></Estado>
          </Fila>
        </Bloque>
      </div>
    </Fondo>
  ),
}

/* ── Specs ─────────────────────────────────────────────────────────── */

const MEDIDAS: [string, string][] = [
  ['Panel header', 'section header'],
  ['Panel title', 'section h2'],
  ['Find Patient search', 'input[aria-label="Find patient"]'],
  ['Patient result', 'button[aria-current="true"]'],
  ['Selected patient · number', 'section [class*="shadow-inner-card"]'],
  ['Table row (compact)', '[role="row"][aria-selected="true"]'],
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
    <div className="flex flex-col gap-8">
      <div ref={ref} className="grid grid-cols-[minmax(0,1fr)_280px] gap-4 overflow-x-auto">
        <Actividad elegido="Maria Abril Viola" />
        <Buscador q="" elegido="Maria Abril Viola" />
      </div>
      <Lienzo>
        <Bloque titulo="Sizes" nota="Medidas leídas de los paneles de arriba, ya dibujados.">
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
        <Bloque titulo="Colors" nota="Los tokens de cada parte. Salen de Billing.tsx y su valor de src/index.css.">
          <Tabla encabezado={['Part', 'Token']} minimo={480}>
            <tr><td className="font-semibold">Panels and summary numbers</td><td><Token nombre="white" /> · <code>shadow-panel</code>, no border</td></tr>
            <tr><td className="font-semibold">Results and numbers inside a panel</td><td><Token nombre="white" /> · <code>shadow-inner-card</code></td></tr>
            <tr><td className="font-semibold">Hover (result, row)</td><td><Token nombre="surface-subtle" /></td></tr>
            <tr><td className="font-semibold">Selected (result, rows)</td><td><Token nombre="dash-count-bg" /></td></tr>
            <tr><td className="font-semibold">Focus ring</td><td><Token nombre="dash-ring" /></td></tr>
            <tr><td className="font-semibold">Avatar</td><td><Token nombre="dash-blue" /> · text <Token nombre="white" /></td></tr>
          </Tabla>
        </Bloque>
        <Bloque titulo="Shared rules">
          <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
            <li>Columns: activity 1fr · Find Patient and Today 280px from 1024px; below that, one column.</li>
            <li>Panel titles have no icon (Panel, 15px Bold), like Patients and the Dashboard.</li>
            <li>A card on the grey page has a shadow and no border; anything inside a panel is an InnerCard.</li>
            <li>One patient is selected at a time, from a row or from Find Patient. Their card and every one of their rows stay light blue until another is picked or the X clears it.</li>
            <li>On the phone, picking in Find Patient scrolls up to the patient’s balances (smooth, or instant with reduced motion).</li>
            <li>The table is the app’s DataTable, compact (44px rows), same header, rows and footer as the other tables.</li>
          </ul>
        </Bloque>
      </Lienzo>
    </div>
  )
}

/* Medidas y colores, leídos de los paneles dibujados y de src/index.css. */
export const Specs: Story = {
  parameters: sinControles,
  render: () => <Fondo><Medir /></Fondo>,
}
