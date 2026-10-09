import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import Billing from './Billing'
import { ActividadReciente, BuscarPaciente, EncabezadoBilling, PacienteElegido, ResultadoPaciente, Stat } from './Billing'
import { Bloque, Forzar, Lienzo, Tabla, Token, medidasDe, type Medidas } from '@/design-system/kit'
import {
  ACTIVIDAD_RECIENTE, FILTROS_ACTIVIDAD, PACIENTES_BILLING, STATS_BILLING, STATS_HOY, VISTAS_PACIENTE, grupoDeGarante, saldoDe,
  type FiltroActividad, type VistaPaciente,
} from '@/data/billing'

/* Playground, Parts, States y Specs de Billing; decisiones en design-reference/figma/modulos/billing.md (2026-10-09). */

const NOMBRES = PACIENTES_BILLING.map((p) => p.nombre)

type Args = {
  selectedPatient: 'None' | (typeof NOMBRES)[number]
  view: VistaPaciente
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
          'Los cobros de la clínica (`@/pages/Billing`). Tiene **dos modos** en la misma pantalla:',
          '',
          '- **Resumen** (sin paciente): los cinco números, **Recent Billing Activity** de toda la clínica con las Tabs de tipo, **Find Patient** y **Today**. No hay botones de pago.',
          '- **Paciente** (elegido desde una fila o desde Find Patient): su card baja arriba de Find Patient con una animación corta, el título dice su nombre, las Tabs pasan a **Patient View / Guarantor View**, la tabla muestra **sólo sus movimientos** (o los de todo su garante) y aparecen los botones de pago. La X de la card vuelve al resumen.',
          '',
          '**Cards:** los paneles son `Panel` (título de 15px sin ícono, como Patients y el Dashboard); lo que va adentro (resultados, números de Today y del garante) es `InnerCard`. La pantalla completa está en *Pages*.',
          '',
          '**Probalo:** en *Playground* elegí paciente, vista, filtro, búsqueda y actividad vacía desde *Controls*, o tocá filas, resultados y la X. *Parts* dice qué hace cada parte, *States* muestra cada una en cada estado y *Specs* trae medidas y colores.',
        ].join('\n'),
      },
    },
  },
  args: { selectedPatient: 'Maria Abril Viola', view: 'Patient View', filter: 'All', search: '', emptyActivity: false },
  argTypes: {
    selectedPatient: { control: 'select', options: ['None', ...NOMBRES], description: 'None es el resumen de la clínica; un nombre abre la vista de ese paciente.' },
    view: { control: 'inline-radio', options: [...VISTAS_PACIENTE], description: 'Con paciente: sólo lo suyo o todo lo de su garante.' },
    filter: { control: 'inline-radio', options: [...FILTROS_ACTIVIDAD], description: 'En el resumen: las Tabs de tipo.' },
    search: { control: 'text', description: 'Lo escrito en Find Patient. “zzz” muestra el vacío.' },
    emptyActivity: { control: 'boolean', description: 'Todavía no se posteó nada.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

const sinControles = { controls: { disable: true } }
const nada = () => {}
const [john, maria, , diego] = PACIENTES_BILLING
const porTipo = (f: FiltroActividad) => ACTIVIDAD_RECIENTE.filter((m) => f === 'All' || (f === 'Pt Payment' && m.tipo === 'Payment') || (f === 'Charge Adj' && m.tipo === 'Adjustment' && m.monto > 0) || (f === 'Credit Adj' && m.tipo === 'Adjustment' && m.monto < 0))

const Fondo = ({ children }: { children: ReactNode }) => <div className="bg-page-background p-4 sm:p-6">{children}</div>

/* La pantalla con lo que se eligió en Controls. En su propio iframe, para que el drawer de Post payment se abra adentro. */
export const Playground: Story = {
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 1180 } } },
  render: (a) => (
    <div className="bg-page-background min-h-screen">
      <Billing
        key={JSON.stringify(a)}
        inicial={{ seleccionado: a.selectedPatient === 'None' ? undefined : a.selectedPatient, vista: a.view, filtro: a.filter, busqueda: a.search, vacia: a.emptyActivity }}
      />
    </div>
  ),
}

/* ── Parts ─────────────────────────────────────────────────────────── */

const PARTES: [string, string, string][] = [
  ['Header', 'Billing. Con un paciente elegido suma Patient Payment, Credit Adjustment y Charge Adjustment (abren Post payment con el tipo ya elegido) y Export statement.', 'EncabezadoBilling'],
  ['Summary numbers', 'Cinco números de toda la clínica, cada uno en una card de página (sombra, sin borde). No cambian con el paciente.', 'Stat'],
  ['Info circle', 'Arriba a la derecha de cada número de arriba y de Today: al pasar el mouse, tocar o llegar con Tab explica qué cuenta (los textos de red.dev).', 'InfoTip'],
  ['Recent Billing Activity', 'Resumen: toda la clínica y las Tabs de tipo. Paciente: su nombre en el título, Patient View / Guarantor View, los dos saldos del garante y sólo sus movimientos.', 'ActividadReciente · Panel'],
  ['Guarantor numbers', 'Sólo con paciente: Unapplied Credits y Open Balance de todo lo que paga su garante, en InnerCard.', 'Stat interna'],
  ['Activity table', 'La tabla de la app, compacta. En el resumen, clic en una fila abre la vista de ese paciente.', 'DataTable'],
  ['Patient card', 'Sólo con paciente: de borde a borde arriba de Find Patient, con iniciales (sin borde), nombre, rol (y su garante si es Patient) y la X que vuelve al resumen. Entra sutil, estilo Apple: 2px, un desenfoque leve que se aclara y opacidad (360ms).', 'PacienteElegido · Panel top'],
  ['Find Patient', 'Panel con el buscador (nombre, apellido o email) y los resultados.', 'BuscarPaciente · Panel'],
  ['Patient result', 'InnerCard con iniciales, nombre, último pago y saldo. Hover gris; el elegido queda en celeste.', 'ResultadoPaciente'],
  ['Today', 'Panel con tres números del día, cada uno en InnerCard.', 'Panel · Stat interna'],
  ['Post payment', 'Drawer para registrar el pago o el ajuste del paciente elegido.', 'PostPaymentDialog'],
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

/* Find Patient con su estado: elegir muestra la card arriba, la X la saca. */
function Buscador({ q, elegido }: { q: string; elegido?: string }) {
  const [busqueda, setBusqueda] = useState(q)
  const [sel, setSel] = useState(elegido ?? null)
  const paciente = PACIENTES_BILLING.find((p) => p.nombre === sel)
  return <BuscarPaciente busqueda={busqueda} onBusqueda={setBusqueda} paciente={paciente} saldoDe={saldoDe} onElegir={setSel} onCerrar={() => setSel(null)} />
}

/* Recent Billing Activity con su estado. `sinCoincidencias`: hay actividad pero ninguna del tipo elegido (con los datos
   de ejemplo cada tipo tiene filas). `sinMovimientos`: un paciente sin nada posteado. */
function Actividad({ filtro: inicialFiltro = 'All', elegido, vista: inicialVista = 'Patient View', vacia, sinCoincidencias, sinMovimientos }: {
  filtro?: FiltroActividad; elegido?: string; vista?: VistaPaciente; vacia?: boolean; sinCoincidencias?: boolean; sinMovimientos?: boolean
}) {
  const [filtro, setFiltro] = useState(inicialFiltro)
  const [sel, setSel] = useState<string | null>(elegido ?? null)
  const [vista, setVista] = useState(inicialVista)
  const paciente = PACIENTES_BILLING.find((p) => p.nombre === sel)
  const grupo = sel ? grupoDeGarante(sel) : []
  const quienes = vista === 'Guarantor View' ? grupo.map((p) => p.nombre) : [sel]
  const filas = vacia || sinCoincidencias || sinMovimientos ? [] : sel ? ACTIVIDAD_RECIENTE.filter((m) => quienes.includes(m.paciente)) : porTipo(filtro)
  return (
    <ActividadReciente
      filas={filas} sinActividad={vacia} filtro={filtro} onFiltro={setFiltro} paciente={paciente} vista={vista} onVista={setVista}
      creditos={grupo.reduce((n, p) => n + p.creditosNoAplicados, 0)} saldo={grupo.reduce((n, p) => n + saldoDe(p.nombre), 0)}
      onElegir={(n) => { setSel(n); setVista('Patient View') }}
    />
  )
}

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Fondo>
      <div className="flex flex-col gap-10">
        <Bloque titulo="Header">
          <Fila>
            <Estado titulo="Overview" nota="Sin paciente: sólo el título. Los pagos y ajustes son de un paciente." ancho={720}><EncabezadoBilling conPaciente={false} onAccion={nada} onExportar={nada} /></Estado>
            <Estado titulo="Patient selected" nota="Aparecen los tres botones y Export statement, con la misma entrada sutil que la card del paciente." ancho={720}><EncabezadoBilling conPaciente onAccion={nada} onExportar={nada} /></Estado>
          </Fila>
        </Bloque>
        <Bloque titulo="Patient card">
          <Fila>
            <Estado titulo="Patient" nota="Rol y quién paga. Entra sutil: 2px, un desenfoque leve que se aclara y opacidad, 360ms con una curva que frena suave. La X vuelve al resumen." ancho={280}><div className="overflow-hidden rounded-lg bg-white"><PacienteElegido paciente={maria!} onCerrar={nada} /></div></Estado>
            <Estado titulo="Guarantor" nota="El garante: sólo su rol." ancho={280}><div className="overflow-hidden rounded-lg bg-white"><PacienteElegido paciente={john!} onCerrar={nada} /></div></Estado>
            <Estado titulo="Long name" nota="El nombre se corta con “…” (completo al pasar el mouse); el rol baja a otra línea si no entra." ancho={280}><div className="overflow-hidden rounded-lg bg-white"><PacienteElegido paciente={{ ...diego!, nombre: 'Maria Fernanda Abril Viola de la Torre' }} onCerrar={nada} /></div></Estado>
          </Fila>
        </Bloque>
        <Bloque titulo="Patient result">
          <Fila>
            <Estado titulo="Default" nota="InnerCard: línea de medio pixel y sombra suave, sobre el panel blanco." ancho={280}><Resultado /></Estado>
            <Estado titulo="Hover" nota="Fondo gris, como la fila de una tabla: se puede elegir." ancho={280}><Resultado forzar="hover" /></Estado>
            <Estado titulo="Selected" nota="El paciente que se está viendo: celeste dash-count-bg (el del rango nuevo de Coverage Table)." ancho={280}><Resultado elegido /></Estado>
            <Estado titulo="Focus" nota="Con el teclado: anillo azul por fuera de la card." ancho={280}><Resultado forzar="focus-visible" /></Estado>
            <Estado titulo="Long name" nota="El nombre se corta con “…”; el saldo no se mueve." ancho={280}><Resultado largo /></Estado>
          </Fila>
        </Bloque>
        <Bloque titulo="Find Patient">
          <Fila>
            <Estado titulo="Overview" nota="Sin paciente: el buscador y los recientes. Tocá uno." ancho={280}><Buscador q="" /></Estado>
            <Estado titulo="Patient selected" nota="Su card arriba de todo y su resultado en celeste. La X lo suelta." ancho={280}><Buscador q="" elegido="Maria Abril Viola" /></Estado>
            <Estado titulo="Searching" nota="Filtra por nombre mientras se escribe; la X del buscador limpia la búsqueda." ancho={280}><Buscador q="ma" /></Estado>
            <Estado titulo="No results" nota="Nada coincide con lo escrito." ancho={280}><Buscador q="zzz" /></Estado>
          </Fila>
        </Bloque>
        <Bloque titulo="Recent Billing Activity" nota="Tocá una fila del resumen para abrir la vista de ese paciente, y las Tabs para cambiar de vista.">
          <Fila>
            <Estado titulo="Overview" nota="Toda la clínica, con las Tabs de tipo. Hover gris en cada fila." ancho={960}><Actividad /></Estado>
            <Estado titulo="Patient View" nota="Su nombre en el título, los saldos de su garante y sólo sus movimientos. Las filas ya no eligen." ancho={960}><Actividad elegido="Maria Abril Viola" /></Estado>
            <Estado titulo="Guarantor View" nota="Todo lo que paga su garante (acá John Hayes y Maria Abril Viola), con la columna Patient para distinguirlos." ancho={960}><Actividad elegido="Maria Abril Viola" vista="Guarantor View" /></Estado>
            <Estado titulo="Patient without activity" nota="Un paciente sin nada posteado: se puede registrar el primer pago desde los botones de arriba." ancho={960}><Actividad elegido="Brent Crosby" sinMovimientos /></Estado>
            <Estado titulo="Filtered, no entries" nota="Resumen: hay actividad pero ninguna del tipo elegido en las Tabs." ancho={960}><Actividad filtro="Charge Adj" sinCoincidencias /></Estado>
            <Estado titulo="Empty" nota="Todavía no se posteó nada en la clínica." ancho={960}><Actividad vacia /></Estado>
            <Estado titulo="Narrow" nota="En el celular las Tabs bajan abajo del título y la tabla scrollea de costado adentro de su caja." ancho={343}><Actividad elegido="John Hayes" /></Estado>
          </Fila>
        </Bloque>
        <Bloque titulo="Numbers">
          <Fila>
            <Estado titulo="On the page" nota="Los cinco de arriba: card de página, sombra y sin borde, con el círculo de info." ancho={248}><Stat {...STATS_BILLING[0]!} /></Estado>
            <Estado titulo="Inside a panel" nota="Today: InnerCard, también con el círculo de info." ancho={248}><div className="rounded-lg bg-white p-4"><Stat interna {...STATS_HOY[0]!} /></div></Estado>
            <Estado titulo="Without info" nota="Los saldos del garante (con paciente): red.dev no les da texto, así que no llevan círculo." ancho={248}><div className="rounded-lg bg-white p-4"><Stat interna label="Guarantor Open Balance" value="$150.00" caption="Total outstanding" /></div></Estado>
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
  ['Patient card', '[aria-live] > div'],
  ['Patient card · initials', '[aria-live] > div > span'],
  ['Find Patient search', 'input[aria-label="Find patient"]'],
  ['Patient result', 'button[aria-current="true"]'],
  ['Guarantor number', 'section [class*="shadow-inner-card"]'],
  ['Table row (compact)', '[role="row"]:not([data-tabla-header])'],
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
            <tr><td className="font-semibold">Patient card</td><td><Token nombre="dash-count-bg" /> · name <Token nombre="dash-blue" /> · line <Token nombre="line-row" /></td></tr>
            <tr><td className="font-semibold">Hover (result, row)</td><td><Token nombre="surface-subtle" /></td></tr>
            <tr><td className="font-semibold">Selected result</td><td><Token nombre="dash-count-bg" /></td></tr>
            <tr><td className="font-semibold">Focus ring</td><td><Token nombre="dash-ring" /></td></tr>
            <tr><td className="font-semibold">Initials</td><td><Token nombre="dash-blue" /> · text <Token nombre="white" /></td></tr>
          </Tabla>
        </Bloque>
        <Bloque titulo="Shared rules">
          <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
            <li>Two modes on one screen: the clinic overview (no patient) and one patient. The X on the patient card goes back to the overview exactly as it was (tab filter included).</li>
            <li>With a patient the table shows only their entries (Patient View) or everything their guarantor pays for (Guarantor View). Each new patient opens in Patient View.</li>
            <li>Payment and adjustment buttons only show with a patient selected: they always post for that patient.</li>
            <li>The patient card, the guarantor numbers and the buttons enter subtly, Apple-style: 2px, a slight blur that clears and a fade, 360ms on a curve that eases out gently. Without motion (reduced motion) they just appear. Screen readers hear the name (aria-live).</li>
            <li>Every number at the top and in Today has its info circle (InfoTip) explaining what it counts; the guarantor numbers have none.</li>
            <li>Columns: activity 1fr · Find Patient and Today 280px from 1024px; below that, one column. On the phone, picking in Find Patient scrolls up to the patient’s numbers.</li>
            <li>Panel titles have no icon (Panel, 15px Bold). A card on the grey page has a shadow and no border; anything inside a panel is an InnerCard.</li>
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
