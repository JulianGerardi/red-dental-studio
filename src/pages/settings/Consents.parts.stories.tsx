import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Bloque, Forzar, Lienzo, Tabla, Token, medidasDe, type Medidas } from '@/design-system/kit'
import {
  BORRADOR_VACIO, DrawerPreview, EditorTemplate, ListaTemplates, SelectorProcedimientos, TEMPLATES_INICIALES, TarjetaTemplate,
  TextoConsentimiento, ToolbarFormato, aBorrador, type Borrador, type ConsentTemplate, type Filtro,
} from './Consents'

/* Playground, Parts, States y Specs; el drawer y el pie a 320px se ven en iframe (consents.md, segunda vuelta). */

type Args = {
  template: 'Extraction Informed Consent' | 'Root Canal Consent' | 'Root Canal Consent – Molar' | 'New template'
  active: boolean
  filter: Filtro
  validationErrors: boolean
  previewOpen: boolean
  patientView: boolean
}

const meta = {
  title: 'Pages/Parts/Consents',
  parameters: {
    layout: 'padded',
    docs: {
      decisionsFrom: 'pages/settings/Consents.tsx',
      description: {
        component: [
          'Los consentimientos que firma el paciente (`@/pages/settings/Consents`): a la izquierda los templates y al lado el editor. La hoja tal como la recibe el paciente se abre en un drawer desde *Preview*, en el pie del editor. La pantalla completa está en *Pages*.',
          '',
          '**Cómo se usa:** se elige un template (o *New template*), se le pone título, uno o más procedimientos y el texto; *Preview* muestra la hoja con lo escrito hasta ahí y *Save* lo guarda, desde el editor o desde el preview. El interruptor de cada tarjeta lo activa o desactiva sin abrirlo. *System* dice que viene con el producto; es independiente de activo.',
          '',
          '**Probalo:** en *Playground* elegí template, filtro, errores de validación, el preview abierto y *Patient View* desde *Controls*. *Parts* dice qué hace cada parte, *States* muestra cada una en cada estado (todo se puede usar) y *Specs* trae medidas y colores.',
        ].join('\n'),
      },
    },
  },
  args: { template: 'Extraction Informed Consent', active: true, filter: 'Active', validationErrors: false, previewOpen: false, patientView: false },
  argTypes: {
    template: { control: 'select', options: ['Extraction Informed Consent', 'Root Canal Consent', 'Root Canal Consent – Molar', 'New template'], description: 'El template abierto en el editor, o uno nuevo.' },
    active: { control: 'boolean', description: 'Activo o inactivo: el interruptor de la tarjeta y el botón Activate / Deactivate del editor.' },
    filter: { control: 'inline-radio', options: ['Active', 'Inactive', 'System', 'All'], description: 'Las pestañas de la lista.' },
    validationErrors: { control: 'boolean', description: 'Como después de tocar Save con faltantes. Se ve con un template nuevo.' },
    previewOpen: { control: 'boolean', description: 'El drawer del preview abierto, como después de tocar Preview.', table: { category: 'Preview' } },
    patientView: { control: 'boolean', description: 'La hoja sin lo que es sólo de la clínica (diagnóstico y hallazgos).', table: { category: 'Preview' } },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

const nada = () => {}
const [extraccion, conducto, molar] = TEMPLATES_INICIALES
const coincide = (t: ConsentTemplate, f: Filtro) => f === 'All' || (f === 'Active' && t.activo) || (f === 'Inactive' && !t.activo) || (f === 'System' && t.sistema)
const sinControles = { controls: { disable: true } }

const Fondo = ({ children }: { children: ReactNode }) => <div className="bg-page-background p-4 sm:p-6">{children}</div>

/* Una muestra: título y nota arriba, la parte abajo, al ancho que tiene en la pantalla. */
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

/* La pantalla sin su encabezado: lista y editor, con el drawer del preview, y el estado propio de cada uno. */
function Consentimientos({ args }: { args: Args }) {
  const inicial = TEMPLATES_INICIALES.map((t) => (t.titulo === args.template ? { ...t, activo: args.active } : t))
  const [templates, setTemplates] = useState(inicial)
  const [q, setQ] = useState('')
  const [filtro, setFiltro] = useState<Filtro>(args.filter)
  const [elegido, setElegido] = useState<string | null>(inicial.find((t) => t.titulo === args.template)?.id ?? null)
  const actual = templates.find((t) => t.id === elegido)
  const [borrador, setBorrador] = useState<Borrador>(actual ? aBorrador(actual) : BORRADOR_VACIO)
  const [intentado, setIntentado] = useState(args.validationErrors)
  const [vista, setVista] = useState(args.patientView)
  const [preview, setPreview] = useState(args.previewOpen)
  const alternar = (id: string) => setTemplates((ts) => ts.map((t) => (t.id === id ? { ...t, activo: !t.activo } : t)))
  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-[880px] grid-cols-[288px_minmax(0,1fr)] gap-4">
        <ListaTemplates
          templates={templates.filter((t) => coincide(t, filtro) && t.titulo.toLowerCase().includes(q.toLowerCase()))}
          elegidoId={elegido} q={q} onQ={setQ} filtro={filtro} onFiltro={setFiltro}
          onElegir={(t) => { setElegido(t.id); setBorrador(aBorrador(t)); setIntentado(false) }}
          onAlternar={alternar}
          onNuevo={() => { setElegido(null); setBorrador(BORRADOR_VACIO); setIntentado(false) }}
        />
        <EditorTemplate actual={actual} borrador={borrador} onBorrador={setBorrador} intentado={intentado} onAlternar={() => actual && alternar(actual.id)} onCancelar={() => setIntentado(false)} onGuardar={() => setIntentado(true)} onPreview={() => setPreview(true)} />
      </div>
      <DrawerPreview abierto={preview} onCerrar={() => setPreview(false)} borrador={borrador} vistaPaciente={vista} onVistaPaciente={setVista} onGuardar={() => { setPreview(false); setIntentado(true) }} />
    </div>
  )
}

/* Cambiá todo desde Controls. En su propio iframe, para que el drawer del preview se abra adentro. */
export const Playground: Story = {
  parameters: { docs: { story: { inline: false, iframeHeight: 820 } } },
  render: (a) => <Fondo><Consentimientos key={JSON.stringify(a)} args={a} /></Fondo>,
}

/* ── Parts ─────────────────────────────────────────────────────────── */

/* Qué es cada parte y qué pasa al usarla. */
const PARTES: [string, string, string][] = [
  ['Templates list', 'New template, el buscador, las pestañas Active, Inactive, System y All, y las tarjetas.', 'ListaTemplates'],
  ['Template card', 'Título (hasta dos líneas), estado, System si viene con el producto y cuántos procedimientos usa. Tocarla la abre en el editor; el interruptor la activa o desactiva sin abrirla.', 'TarjetaTemplate'],
  ['Editor', 'Edit Template con su estado (o New Consent Template), Activate / Deactivate, el aviso rojo si faltan datos, los campos y el pie fijo.', 'EditorTemplate'],
  ['Procedure picker', 'Busca por código o nombre; los elegidos quedan como chips con X. Obligatorio.', 'SelectorProcedimientos'],
  ['Consent text', 'Nature of procedure y Risk and complications (un riesgo por línea), cada caja con su guía en cursiva para quien redacta.', 'TextoConsentimiento'],
  ['Formatting toolbar', 'Barra de formato con tooltips. Con los dos campos avisa que el formato enriquecido no está disponible.', 'ToolbarFormato'],
  ['Footer', 'Fijo al pie del editor: Preview a la izquierda, Cancel y Save a la derecha. En angosto Cancel y Save bajan juntos a una segunda línea y Preview queda solo arriba.', 'EditorTemplate'],
  ['Preview drawer', 'Drawer lg sobre el escritorio gris con la hoja que recibe el paciente (lo escrito hasta ahí), Patient View y el pie Back to editor / Save.', 'DrawerPreview'],
  ['Consent sheet', 'La hoja del paciente: membrete, datos, secciones, acknowledgment y firma. Tiene su página en Components / Settings / ConsentDocument.', 'ConsentDocument'],
]

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Fondo>
      <div className="flex flex-col gap-6">
        <Consentimientos args={meta.args} />
        <Tabla encabezado={['Part', 'What it does', 'Component']} minimo={720} arriba>
          {PARTES.map(([parte, que, componente]) => (
            <tr key={parte}>
              <td className="font-semibold whitespace-nowrap">{parte}</td>
              <td className="text-ink-medium">{que}</td>
              <td className="font-mono text-[12px] text-ink-muted">{componente}</td>
            </tr>
          ))}
        </Tabla>
      </div>
    </Fondo>
  ),
}

/* ── States ────────────────────────────────────────────────────────── */

function Tarjeta({ inicial, elegida, forzar }: { inicial: ConsentTemplate; elegida?: boolean; forzar?: 'hover' }) {
  const [t, setT] = useState(inicial)
  const tarjeta = <TarjetaTemplate t={t} elegida={!!elegida} onElegir={nada} onAlternar={() => setT((x) => ({ ...x, activo: !x.activo }))} />
  return forzar ? <Forzar selector="button" estado={forzar} className="block">{tarjeta}</Forzar> : tarjeta
}

function Lista({ q }: { q: string }) {
  const [filtro, setFiltro] = useState<Filtro>('Active')
  const [texto, setTexto] = useState(q)
  const [elegido, setElegido] = useState<string | null>('t1')
  return (
    <ListaTemplates
      templates={TEMPLATES_INICIALES.filter((t) => coincide(t, filtro) && t.titulo.toLowerCase().includes(texto.toLowerCase()))}
      elegidoId={elegido} q={texto} onQ={setTexto} filtro={filtro} onFiltro={setFiltro} onElegir={(t) => setElegido(t.id)} onAlternar={nada} onNuevo={() => setElegido(null)}
    />
  )
}

function Procedimientos({ inicial, error }: { inicial: string[]; error?: boolean }) {
  const [elegidos, setElegidos] = useState(inicial)
  return <SelectorProcedimientos elegidos={elegidos} onCambiar={setElegidos} error={error && elegidos.length === 0} />
}

function Texto({ inicial }: { inicial: Borrador }) {
  const [b, setB] = useState(inicial)
  return <TextoConsentimiento naturaleza={b.naturaleza} riesgos={b.riesgos} onNaturaleza={(naturaleza) => setB({ ...b, naturaleza })} onRiesgos={(riesgos) => setB({ ...b, riesgos })} />
}

/* El editor con su drawer: Preview lo abre encima de la página. */
function Editor({ actual, intentado }: { actual?: ConsentTemplate; intentado?: boolean }) {
  const [b, setB] = useState(actual ? aBorrador(actual) : BORRADOR_VACIO)
  const [probado, setProbado] = useState(!!intentado)
  const [preview, setPreview] = useState(false)
  const [vista, setVista] = useState(false)
  return (
    <>
      <EditorTemplate actual={actual} borrador={b} onBorrador={setB} intentado={probado} onAlternar={nada} onCancelar={() => setProbado(false)} onGuardar={() => setProbado(true)} onPreview={() => setPreview(true)} />
      <DrawerPreview abierto={preview} onCerrar={() => setPreview(false)} borrador={b} vistaPaciente={vista} onVistaPaciente={setVista} onGuardar={() => { setPreview(false); setProbado(true) }} />
    </>
  )
}

/* Los estados del drawer y dónde se ven (consents.md, 2026-10-07). */
const ESTADOS_DRAWER: [string, string, string][] = [
  ['Clinic view', 'Abre así: la hoja con diagnóstico y hallazgos clínicos.', 'Preview Clinic View'],
  ['Patient view', 'Con Patient View: sin lo que es sólo de la clínica.', 'Preview Patient View'],
  ['Save with missing fields', 'Save cierra el drawer y el editor muestra el aviso rojo y el error de cada campo.', 'States › Editor › New (Preview → Save)'],
]

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Fondo>
      <div className="flex flex-col gap-10">
        <Bloque titulo="Template card">
          <Fila>
            <Estado titulo="Selected" nota="Abierta en el editor: borde azul y fondo apenas azul." ancho={256}><Tarjeta inicial={extraccion} elegida /></Estado>
            <Estado titulo="Default" nota="Activa, sin elegir. El título hace hasta dos líneas." ancho={256}><Tarjeta inicial={conducto} /></Estado>
            <Estado titulo="Hover" nota="Fondo gris: se puede elegir." ancho={256}><Tarjeta inicial={conducto} forzar="hover" /></Estado>
            <Estado titulo="Inactive" nota="Título apagado y pill gris. Se ve con el filtro Inactive." ancho={256}><Tarjeta inicial={{ ...conducto, activo: false }} /></Estado>
            <Estado titulo="System" nota="Viene con el producto. Es independiente de activo: también se desactiva." ancho={256}><Tarjeta inicial={molar} /></Estado>
          </Fila>
        </Bloque>
        <Bloque titulo="Templates list">
          <Fila>
            <Estado titulo="Default" nota="Las cuatro pestañas entran en 288px. Se puede buscar, filtrar y elegir." ancho={288}><Lista q="" /></Estado>
            <Estado titulo="No results" nota="Nada coincide con la búsqueda o el filtro." ancho={288}><Lista q="implant" /></Estado>
          </Fila>
        </Bloque>
        <Bloque titulo="Procedure picker">
          <Fila>
            <Estado titulo="With procedures" nota="Busca por código o nombre; los elegidos quedan como chips con X." ancho={480}><Procedimientos inicial={['D7240', 'D3948']} /></Estado>
            <Estado titulo="Empty" nota="Todavía sin procedimientos. Escribí “root” o “D3” para ver las sugerencias." ancho={480}><Procedimientos inicial={[]} /></Estado>
            <Estado titulo="Error" nota="Save sin ninguno: borde rojo y el mensaje en lugar de los chips." ancho={480}><Procedimientos inicial={[]} error /></Estado>
          </Fila>
        </Bloque>
        <Bloque titulo="Consent text">
          <Fila>
            <Estado titulo="Filled" nota="Las dos secciones con su guía en cursiva, para quien redacta (no va en la hoja del paciente)." ancho={520}><Texto inicial={aBorrador(extraccion)} /></Estado>
            <Estado titulo="Empty" nota="Un template nuevo: las dos cajas vacías, sin nada escrito adentro; quedan los rótulos y la guía." ancho={520}><Texto inicial={BORRADOR_VACIO} /></Estado>
          </Fila>
        </Bloque>
        <Bloque titulo="Formatting toolbar">
          <Fila>
            <Estado titulo="Not available" nota="Con los dos campos avisa que el formato enriquecido no está disponible. Cada ícono con su tooltip." ancho={480}><ToolbarFormato /></Estado>
          </Fila>
        </Bloque>
        <Bloque titulo="Editor" nota="Preview abre el drawer encima de la página; Escape o la X lo cierran.">
          <Fila>
            <Estado titulo="Editing" nota="Edit Template con su estado y Deactivate template. Preview, Cancel y Save fijos al pie." ancho={560}><Editor actual={extraccion} /></Estado>
            <Estado titulo="New" nota="New Consent Template, sin botón de activar. Tocá Save para ver los errores." ancho={560}><Editor /></Estado>
            <Estado titulo="Validation errors" nota="Save con faltantes: el aviso rojo arriba y cada campo obligatorio con su error." ancho={560}><Editor intentado /></Estado>
            <Estado titulo="Narrow footer" nota="En 320px Cancel y Save bajan juntos a una segunda línea y Preview queda solo arriba. Es un iframe de 320px: el pie fijo queda al pie de la ventana." ancho={320}>
              <iframe title="Narrow footer" src="iframe.html?id=pages-parts-consents--narrow-footer&viewMode=story" className="h-[568px] w-[320px] border-0 bg-page-background" />
            </Estado>
          </Fila>
        </Bloque>
        <Bloque titulo="Preview drawer" nota="El drawer es position: fixed: Clinic view y Patient view se ven abiertos en las dos historias de abajo, cada una en su iframe; Save con faltantes se prueba en Editor › New.">
          <Tabla encabezado={['State', 'When', 'Story']} minimo={560}>
            {ESTADOS_DRAWER.map(([estado, cuando, historia]) => (
              <tr key={estado}>
                <td className="font-semibold whitespace-nowrap">{estado}</td>
                <td className="text-ink-medium">{cuando}</td>
                <td className="text-ink-muted">{historia}</td>
              </tr>
            ))}
          </Tabla>
        </Bloque>
      </div>
    </Fondo>
  ),
}

/* El editor solo, para verlo en el iframe de 320px de States (no va en la página de docs). */
export const NarrowFooter: Story = {
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => <Fondo><Editor actual={extraccion} /></Fondo>,
}

/* ── Preview drawer (en iframe) ────────────────────────────────────── */

/* El drawer abierto sobre la página; Preview lo vuelve a abrir. */
function Preview({ paciente }: { paciente?: boolean }) {
  const [abierto, setAbierto] = useState(true)
  const [v, setV] = useState(!!paciente)
  return (
    <>
      <Button variant="secondary" className="self-start" onClick={() => setAbierto(true)}><Eye /> Preview</Button>
      <DrawerPreview abierto={abierto} onCerrar={() => setAbierto(false)} borrador={aBorrador(extraccion)} vistaPaciente={v} onVistaPaciente={setV} onGuardar={() => setAbierto(false)} />
    </>
  )
}

const enIframe = { layout: 'fullscreen', controls: { disable: true }, docs: { story: { inline: false, iframeHeight: 760 } } }

export const PreviewClinicView: Story = {
  parameters: enIframe,
  render: () => <Fondo><Estado titulo="Clinic view" nota="Se abre desde Preview, en el pie del editor: drawer lg sobre el escritorio gris, con diagnóstico y hallazgos clínicos. Back to editor lo cierra; Save guarda y lo cierra." ancho={320}><Preview /></Estado></Fondo>,
}
export const PreviewPatientView: Story = {
  parameters: enIframe,
  render: () => <Fondo><Estado titulo="Patient view" nota="Lo que ve el paciente: sin lo que es sólo de la clínica." ancho={320}><Preview paciente /></Estado></Fondo>,
}

/* ── Specs ─────────────────────────────────────────────────────────── */

const MEDIDAS: [string, string][] = [
  ['Templates list', 'section[aria-label="Templates"]'],
  ['Template card', 'section[aria-label="Templates"] .rounded-lg.border'],
  ['New template', 'section[aria-label="Templates"] button'],
  ['Filter tabs', '[aria-label="Filter templates"]'],
  ['Editor', 'section[aria-label="Template editor"]'],
  ['Procedure chip', 'section[aria-label="Template editor"] .rounded-full.bg-info-bg'],
  ['Preview button', 'section[aria-label="Template editor"] .sticky button:first-child'],
  ['Save', 'section[aria-label="Template editor"] .sticky button:last-child'],
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
      <div ref={ref}><Consentimientos args={meta.args} /></div>
      <Lienzo>
        <Bloque titulo="Sizes" nota="Medidas leídas de la pantalla de arriba, ya dibujada.">
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
        <Bloque titulo="Colors" nota="Los tokens de cada parte. Salen de Consents.tsx y su valor de src/index.css.">
          <Tabla encabezado={['Part', 'Token']} minimo={480}>
            <tr><td className="font-semibold">Panels</td><td><Token nombre="white" /> · <code>shadow-panel</code>, no border</td></tr>
            <tr><td className="font-semibold">Selected card</td><td><Token nombre="info-bg" /> · border <Token nombre="dash-blue" /></td></tr>
            <tr><td className="font-semibold">Card hover</td><td><Token nombre="surface-subtle" /></td></tr>
            <tr><td className="font-semibold">Procedure chip</td><td><Token nombre="info-bg" /> · text <Token nombre="dash-blue" /></td></tr>
            <tr><td className="font-semibold">Validation notice</td><td><Token nombre="dash-bad-bg" /> · text <Token nombre="dash-bad-fg" /></td></tr>
            <tr><td className="font-semibold">Field error</td><td><Token nombre="field-error" /></td></tr>
            <tr><td className="font-semibold">Preview drawer</td><td><Token nombre="surface-muted" /> · sheet <Token nombre="white" /></td></tr>
          </Tabla>
        </Bloque>
        <Bloque titulo="Shared rules">
          <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
            <li>Columns: list 288px · editor 1fr, by the width of the content (@container), not the window.</li>
            <li>Title and at least one procedure are required; Save shows the notice and each field’s error.</li>
            <li>Preview, Cancel and Save stay fixed at the bottom of the editor. Preview opens the sheet in a drawer (lg · 560px) with what is written so far.</li>
            <li>In narrow widths (under ~370px) Cancel and Save wrap together to a second line on the right and Preview stays alone above: nothing gets cut at 320px.</li>
            <li>Save in the preview closes it and saves; if something is missing, the errors show in the editor.</li>
            <li>Activating or deactivating a template keeps its card in the list until the filter or search changes.</li>
          </ul>
        </Bloque>
      </Lienzo>
    </div>
  )
}

/* Medidas y colores, leídos de la pantalla dibujada y de src/index.css. */
export const Specs: Story = {
  parameters: sinControles,
  render: () => <Fondo><Medir /></Fondo>,
}
