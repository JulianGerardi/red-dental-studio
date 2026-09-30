import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bloque, Forzar, Lienzo, Tabla, Token, medidasDe, type Medidas } from '@/design-system/kit'
import {
  BORRADOR_VACIO, EditorTemplate, ListaTemplates, PanelPreview, SelectorProcedimientos, TEMPLATES_INICIALES, TarjetaTemplate,
  TextoConsentimiento, ToolbarFormato, aBorrador, type Borrador, type ConsentTemplate, type Filtro,
} from './Consents'

/* Settings › Consents, documentado como Elements (Playground, Parts, States, Specs). La pantalla completa está en
   Pages › Settings Consents. */

type Args = {
  template: 'Extraction Informed Consent' | 'Root Canal Consent' | 'Root Canal Consent – Molar' | 'New template'
  active: boolean
  filter: Filtro
  validationErrors: boolean
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
          'Los consentimientos que firma el paciente (`@/pages/settings/Consents`): a la izquierda los templates, en el medio el editor y a la derecha la hoja tal como la recibe el paciente. La pantalla completa está en *Pages*.',
          '',
          '**Cómo se usa:** se elige un template (o *New template*), se le pone título, uno o más procedimientos y el texto; el preview cambia mientras se escribe y *Save* lo guarda. El interruptor de cada tarjeta lo activa o desactiva sin abrirlo. *System* dice que viene con el producto; es independiente de activo.',
          '',
          '**Probalo:** en *Playground* elegí template, filtro, errores de validación y *Patient View* desde *Controls*; todo se puede usar.',
        ].join('\n'),
      },
    },
  },
  args: { template: 'Extraction Informed Consent', active: true, filter: 'Active', validationErrors: false, patientView: false },
  argTypes: {
    template: { control: 'select', options: ['Extraction Informed Consent', 'Root Canal Consent', 'Root Canal Consent – Molar', 'New template'], description: 'El template abierto en el editor, o uno nuevo.' },
    active: { control: 'boolean', description: 'Activo o inactivo: el interruptor de la tarjeta y el botón Activate / Deactivate del editor.' },
    filter: { control: 'inline-radio', options: ['Active', 'Inactive', 'System', 'All'], description: 'Las pestañas de la lista.' },
    validationErrors: { control: 'boolean', description: 'Como después de tocar Save con faltantes. Se ve con un template nuevo.' },
    patientView: { control: 'boolean', description: 'La hoja sin lo que es sólo de la clínica (diagnóstico y hallazgos).', table: { category: 'Preview' } },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

const nada = () => {}
const [extraccion, conducto, molar] = TEMPLATES_INICIALES
const coincide = (t: ConsentTemplate, f: Filtro) => f === 'All' || (f === 'Active' && t.activo) || (f === 'Inactive' && !t.activo) || (f === 'System' && t.sistema)

const Fondo = ({ children }: { children: ReactNode }) => <div className="bg-page-background p-4 sm:p-6">{children}</div>

/* La pantalla sin su encabezado: lista, editor y preview, con el estado propio de cada uno. */
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
  const alternar = (id: string) => setTemplates((ts) => ts.map((t) => (t.id === id ? { ...t, activo: !t.activo } : t)))
  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-[1080px] grid-cols-[288px_minmax(0,1fr)_minmax(0,1.15fr)] gap-4">
        <ListaTemplates
          templates={templates.filter((t) => coincide(t, filtro) && t.titulo.toLowerCase().includes(q.toLowerCase()))}
          elegidoId={elegido} q={q} onQ={setQ} filtro={filtro} onFiltro={setFiltro}
          onElegir={(t) => { setElegido(t.id); setBorrador(aBorrador(t)); setIntentado(false) }}
          onAlternar={alternar}
          onNuevo={() => { setElegido(null); setBorrador(BORRADOR_VACIO); setIntentado(false) }}
        />
        <EditorTemplate actual={actual} borrador={borrador} onBorrador={setBorrador} intentado={intentado} onAlternar={() => actual && alternar(actual.id)} onCancelar={() => setIntentado(false)} onGuardar={() => setIntentado(true)} />
        <PanelPreview borrador={borrador} vistaPaciente={vista} onVistaPaciente={setVista} />
      </div>
    </div>
  )
}

/* Cambiá todo desde Controls. */
export const Playground: Story = {
  render: (a) => <Fondo><Consentimientos key={JSON.stringify(a)} args={a} /></Fondo>,
}

const PARTES: [string, string][] = [
  ['Templates list', 'New template, el buscador, los filtros (Active, Inactive, System, All) y las tarjetas. 288px: las cuatro pestañas entran enteras.'],
  ['Template card', 'Título (hasta dos líneas), estado, System y cuántos procedimientos usa. Tocarla la abre en el editor; el interruptor la activa o desactiva sin abrirla. La elegida lleva el borde azul.'],
  ['Editor', 'Edit Template con su estado (o New Consent Template), Activate / Deactivate, el aviso rojo si faltan datos y Cancel / Save fijos al pie.'],
  ['Procedure picker', 'Busca por código o nombre; los elegidos quedan como chips con X. Obligatorio: al menos uno.'],
  ['Consent text', 'Nature of procedure y Risk and complications, con la guía en cursiva para quien redacta. El toolbar de formato es decorativo.'],
  ['Preview', 'La hoja que recibe el paciente sobre el escritorio gris. Patient View saca diagnóstico y hallazgos.'],
]

export const Parts: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Fondo>
      <div className="flex flex-col gap-8">
        <Consentimientos args={meta.args} />
        <Lienzo>
          <Tabla encabezado={['Part', 'What it does']} minimo={560} arriba>
            {PARTES.map(([parte, que]) => (
              <tr key={parte}>
                <td className="font-semibold whitespace-nowrap">{parte}</td>
                <td className="text-ink-medium">{que}</td>
              </tr>
            ))}
          </Tabla>
        </Lienzo>
      </div>
    </Fondo>
  ),
}

function Estado({ titulo, nota, ancho, children }: { titulo: string; nota: string; ancho?: number; children: ReactNode }) {
  return (
    <figure className="m-0 flex flex-col gap-2" style={{ width: ancho }}>
      <figcaption className="flex flex-col gap-0.5">
        <span className="text-[12.5px] font-semibold text-ink">{titulo}</span>
        <span className="text-[11.5px] leading-snug text-ink-muted">{nota}</span>
      </figcaption>
      {children}
    </figure>
  )
}

/* Una tarjeta que se puede usar: el interruptor cambia su estado. */
function Tarjeta({ inicial, elegida, forzar }: { inicial: ConsentTemplate; elegida?: boolean; forzar?: 'hover' | 'focus-visible' }) {
  const [t, setT] = useState(inicial)
  const tarjeta = <TarjetaTemplate t={t} elegida={!!elegida} onElegir={nada} onAlternar={() => setT((x) => ({ ...x, activo: !x.activo }))} />
  return forzar ? <Forzar selector="button" estado={forzar} className="block">{tarjeta}</Forzar> : tarjeta
}

function Procedimientos({ inicial, error }: { inicial: string[]; error?: boolean }) {
  const [elegidos, setElegidos] = useState(inicial)
  return <SelectorProcedimientos elegidos={elegidos} onCambiar={setElegidos} error={error && elegidos.length === 0} />
}

function Editor({ actual, intentado }: { actual?: ConsentTemplate; intentado?: boolean }) {
  const [b, setB] = useState(actual ? aBorrador(actual) : BORRADOR_VACIO)
  const [probado, setProbado] = useState(!!intentado)
  return <EditorTemplate actual={actual} borrador={b} onBorrador={setB} intentado={probado} onAlternar={nada} onCancelar={() => setProbado(false)} onGuardar={() => setProbado(true)} />
}

function Texto({ inicial }: { inicial: Borrador }) {
  const [b, setB] = useState(inicial)
  return <TextoConsentimiento naturaleza={b.naturaleza} riesgos={b.riesgos} onNaturaleza={(naturaleza) => setB({ ...b, naturaleza })} onRiesgos={(riesgos) => setB({ ...b, riesgos })} />
}

function Preview({ paciente }: { paciente?: boolean }) {
  const [v, setV] = useState(!!paciente)
  return <PanelPreview borrador={aBorrador(extraccion)} vistaPaciente={v} onVistaPaciente={setV} />
}

function Lista({ q }: { q: string }) {
  const [filtro, setFiltro] = useState<Filtro>('Active')
  const [texto, setTexto] = useState(q)
  return (
    <ListaTemplates
      templates={TEMPLATES_INICIALES.filter((t) => coincide(t, filtro) && t.titulo.toLowerCase().includes(texto.toLowerCase()))}
      elegidoId="t1" q={texto} onQ={setTexto} filtro={filtro} onFiltro={setFiltro} onElegir={nada} onAlternar={nada} onNuevo={nada}
    />
  )
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Fondo>
      <div className="flex flex-col gap-10">
        <Bloque titulo="Template card · 256px">
          <div className="flex flex-wrap items-start gap-x-6 gap-y-8">
            <Estado titulo="Selected" nota="Abierta en el editor: borde azul y fondo apenas azul." ancho={256}><Tarjeta inicial={extraccion} elegida /></Estado>
            <Estado titulo="Default" nota="Activa, sin elegir." ancho={256}><Tarjeta inicial={conducto} /></Estado>
            <Estado titulo="Hover" nota="Fondo gris: se puede elegir." ancho={256}><Tarjeta inicial={conducto} forzar="hover" /></Estado>
            <Estado titulo="Inactive" nota="Título apagado y pill gris. Sigue en la lista con el filtro Inactive." ancho={256}><Tarjeta inicial={{ ...conducto, activo: false }} /></Estado>
            <Estado titulo="System" nota="Viene con el producto. También se desactiva." ancho={256}><Tarjeta inicial={molar} /></Estado>
          </div>
        </Bloque>
        <Bloque titulo="Templates list · 288px">
          <div className="flex flex-wrap items-start gap-x-6 gap-y-8">
            <Estado titulo="Default" nota="Filtro Active, con la elegida marcada." ancho={288}><Lista q="" /></Estado>
            <Estado titulo="No results" nota="Nada coincide con la búsqueda o el filtro." ancho={288}><Lista q="implant" /></Estado>
          </div>
        </Bloque>
        <Bloque titulo="Procedure picker">
          <div className="flex flex-wrap items-start gap-x-6 gap-y-8">
            <Estado titulo="With procedures" nota="Los elegidos, como chips con X." ancho={420}><Procedimientos inicial={['D7240', 'D3948']} /></Estado>
            <Estado titulo="Empty" nota="Todavía sin procedimientos." ancho={420}><Procedimientos inicial={[]} /></Estado>
            <Estado titulo="Error" nota="Save sin ninguno: borde rojo y el mensaje en lugar de los chips." ancho={420}><Procedimientos inicial={[]} error /></Estado>
          </div>
        </Bloque>
        <Bloque titulo="Consent text">
          <div className="flex flex-wrap items-start gap-x-6 gap-y-8">
            <Estado titulo="Filled" nota="El texto de un template existente." ancho={480}><Texto inicial={aBorrador(extraccion)} /></Estado>
            <Estado titulo="Empty" nota="Un template nuevo: los placeholders y la guía." ancho={480}><Texto inicial={BORRADOR_VACIO} /></Estado>
          </div>
        </Bloque>
        <Bloque titulo="Editor">
          <div className="flex flex-wrap items-start gap-x-6 gap-y-8">
            <Estado titulo="Editing" nota="Edit Template con su estado y Deactivate template." ancho={520}><Editor actual={extraccion} /></Estado>
            <Estado titulo="New" nota="New Consent Template, sin botón de activar." ancho={520}><Editor /></Estado>
            <Estado titulo="Validation errors" nota="Save con faltantes: el aviso rojo arriba y cada campo obligatorio con su error." ancho={520}><Editor intentado /></Estado>
          </div>
        </Bloque>
        <Bloque titulo="Preview">
          <div className="flex flex-wrap items-start gap-x-6 gap-y-8">
            <Estado titulo="Clinic view" nota="Con diagnóstico y hallazgos clínicos." ancho={520}><Preview /></Estado>
            <Estado titulo="Patient view" nota="Lo que ve el paciente: sin lo que es sólo de la clínica." ancho={520}><Preview paciente /></Estado>
          </div>
        </Bloque>
        <Bloque titulo="Formatting toolbar" nota="Decorativo: avisa que el formato enriquecido no está disponible.">
          <div className="w-[480px]"><ToolbarFormato /></div>
        </Bloque>
      </div>
    </Fondo>
  ),
}

const MEDIDAS: [string, string][] = [
  ['Templates list', 'section[aria-label="Templates"]'],
  ['Template card', 'section[aria-label="Templates"] .rounded-lg.border'],
  ['New template', 'section[aria-label="Templates"] button'],
  ['Filter tabs', '[aria-label="Filter templates"]'],
  ['Editor', 'section[aria-label="Template editor"]'],
  ['Procedure chip', 'section[aria-label="Template editor"] .rounded-full.bg-info-bg'],
  ['Save', 'section[aria-label="Template editor"] .sticky button:last-child'],
  ['Preview', 'section[aria-label="Preview"]'],
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
            <tr><td className="font-semibold">Panels</td><td><Token nombre="white" /> · border <Token nombre="line" /></td></tr>
            <tr><td className="font-semibold">Selected card</td><td><Token nombre="info-bg" /> · border <Token nombre="dash-blue" /></td></tr>
            <tr><td className="font-semibold">Card hover</td><td><Token nombre="surface-subtle" /></td></tr>
            <tr><td className="font-semibold">Procedure chip</td><td><Token nombre="info-bg" /> · text <Token nombre="dash-blue" /></td></tr>
            <tr><td className="font-semibold">Validation notice</td><td><Token nombre="dash-bad-bg" /> · text <Token nombre="dash-bad-fg" /></td></tr>
            <tr><td className="font-semibold">Field error</td><td><Token nombre="field-error" /></td></tr>
            <tr><td className="font-semibold">Preview desk</td><td><Token nombre="surface-muted" /></td></tr>
          </Tabla>
        </Bloque>
        <Bloque titulo="Shared rules">
          <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
            <li>Columns: list 288px · editor 1fr · preview 1.15fr, by the width of the content (@container), not the window.</li>
            <li>Title and at least one procedure are required; Save shows the notice and each field’s error.</li>
            <li>Cancel and Save stay fixed at the bottom of the editor; the preview stays visible while you scroll.</li>
            <li>Activating or deactivating a template keeps its card in the list until the filter or search changes.</li>
          </ul>
        </Bloque>
      </Lienzo>
    </div>
  )
}

/* Medidas y colores, leídos de la pantalla dibujada y de src/index.css. */
export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => <Fondo><Medir /></Fondo>,
}
