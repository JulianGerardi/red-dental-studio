import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bloque, Lienzo, Muestra, Tabla, TablaPartes } from '@/design-system/kit'
import { escribir, esperar, pulsar, secuencia } from '@/design-system/play'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import { FinanzasProvider, useFinanzas, ucrDe } from '@/data/finanzasStore'
import { ARANCELES, ASEGURADORAS, COBERTURAS } from '@/data/finanzas'
import { SetupChecks, usePendientes } from './Billing'
import { FeesTable, MenuArancel, useAccionesArancel } from './FeeSchedules'
import { CarrierInformation } from './Carriers'
import { CoverageRulesTable, MenuCobertura, useAccionesCobertura } from './CoverageTables'

/* Las piezas internas de Settings → Billing: Setup checks, la tabla de precios, la ficha de un carrier, la tabla de reglas
   y los kebabs. Las pantallas completas están en Pages. Ver design-reference/figma/modulos/settings-billing.md. */

type Parte = 'Setup checks' | 'Fees table' | 'Carrier information' | 'Coverage rules' | 'Row menus'
type Args = { parte: Parte; feeSchedule: string; carrier: string; coverageTable: string }

const meta = {
  title: 'Pages/Parts/Billing settings',
  parameters: {
    layout: 'padded',
    docs: {
      decisionsFrom: ['pages/settings/finance/Billing.tsx', 'pages/settings/finance/FeeSchedules.tsx', 'pages/settings/finance/Carriers.tsx', 'pages/settings/finance/CoverageTables.tsx'],
      description: {
        component: [
          'Las piezas de *Settings → Billing* que no son componentes sueltos. Billing tiene tres tablas conectadas: **Fee Schedules** (lo que cobra el consultorio por código CDT), **Carriers** con sus planes, y **Coverage Tables** (lo que paga el plan por categoría). Cada plan apunta a un fee schedule y a una coverage table.',
          '',
          '**Las piezas:** *Setup checks* (lo que falta configurar, en la portada), *FeesTable* (precios con edición en la celda), *CarrierInformation* (la ficha editable de un carrier), *CoverageRulesTable* (una fila por categoría; tocarla abre su regla) y los kebabs de fee schedule y coverage table. Las pantallas completas están en *Pages*.',
          '',
          '**Probalo:** en *Playground* elegí la parte y el ítem desde *Controls*; todo se puede usar (editar un precio, guardar la ficha, abrir un menú).',
        ].join('\n'),
      },
    },
  },
  decorators: [(Story) => <FinanzasProvider><div className="bg-page-background p-4 sm:p-6"><Story /></div></FinanzasProvider>],
  args: { parte: 'Fees table', feeSchedule: ARANCELES[1].nombre, carrier: ASEGURADORAS[0].nombre, coverageTable: COBERTURAS[0].nombre },
  argTypes: {
    parte: { control: 'select', options: ['Setup checks', 'Fees table', 'Carrier information', 'Coverage rules', 'Row menus'], description: 'Qué pieza mostrar.' },
    feeSchedule: { control: 'select', options: ARANCELES.map((a) => a.nombre), description: 'Para Fees table y Row menus.' },
    carrier: { control: 'select', options: ASEGURADORAS.map((c) => c.nombre), description: 'Para Carrier information.' },
    coverageTable: { control: 'select', options: COBERTURAS.map((t) => t.nombre), description: 'Para Coverage rules y Row menus.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

const sinControles = { controls: { disable: true } }
const nada = () => {}

/* Cada pieza conectada al store, como en la pantalla. */
function Checks() {
  return <SetupChecks pendientes={usePendientes()} />
}
function Precios({ nombre }: { nombre: string }) {
  const { aranceles, guardar } = useFinanzas()
  const a = aranceles.find((x) => x.nombre === nombre) ?? aranceles[0]
  return (
    <FeesTable
      arancel={a}
      ucr={ucrDe(aranceles)}
      onCambiar={(codigo, v) => {
        const precios = { ...a.precios }
        if (v === undefined) delete precios[codigo]
        else precios[codigo] = v
        guardar('aranceles', { ...a, precios })
      }}
    />
  )
}
function Ficha({ nombre }: { nombre: string }) {
  const c = ASEGURADORAS.find((x) => x.nombre === nombre) ?? ASEGURADORAS[0]
  return <CarrierInformation key={c.id} carrier={c} onGuardar={nada} />
}
function Reglas({ nombre }: { nombre: string }) {
  return <CoverageRulesTable tabla={COBERTURAS.find((t) => t.nombre === nombre) ?? COBERTURAS[0]} onEditar={nada} />
}
function Menus({ arancel, tabla }: { arancel: string; tabla: string }) {
  const accA = useAccionesArancel()
  const accC = useAccionesCobertura()
  const { aranceles, coberturas } = useFinanzas()
  const a = aranceles.find((x) => x.nombre === arancel) ?? aranceles[0]
  const t = coberturas.find((x) => x.nombre === tabla) ?? coberturas[0]
  return (
    <div className="flex min-h-[240px] flex-wrap gap-x-56 gap-y-8">
      <Muestra titulo={`Fee schedule · ${a.nombre}`}><RowActionsMenu label={a.nombre} abierto><MenuArancel a={a} acciones={accA} /></RowActionsMenu></Muestra>
      <Muestra titulo={`Coverage table · ${t.nombre}`}><RowActionsMenu label={t.nombre} abierto><MenuCobertura t={t} acciones={accC} /></RowActionsMenu></Muestra>
    </div>
  )
}

export const Playground: Story = {
  parameters: { docs: { story: { inline: false, iframeHeight: 760 } } },
  render: (a) => (
    <div key={JSON.stringify(a)}>
      {a.parte === 'Setup checks' && <div className="max-w-[560px]"><Checks /></div>}
      {a.parte === 'Fees table' && <Precios nombre={a.feeSchedule} />}
      {a.parte === 'Carrier information' && <Ficha nombre={a.carrier} />}
      {a.parte === 'Coverage rules' && <Reglas nombre={a.coverageTable} />}
      {a.parte === 'Row menus' && <Menus arancel={a.feeSchedule} tabla={a.coverageTable} />}
    </div>
  ),
}

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo className="max-w-[1100px]">
      <TablaPartes partes={[
        ['Setup checks', 'Card de la portada con lo que impide cobrar bien: carriers activos sin planes, planes que apuntan a algo inactivo y fee schedules en uso con códigos sin precio. Cada uno con Review. Sin pendientes: “Everything is set up.”', 'SetupChecks · usePendientes'],
        ['Fees table', 'El catálogo CDT con el precio del fee schedule editable en la celda (EditableAmount), el UCR y la diferencia. Buscador, filtro por categoría y Columns.', 'FeesTable'],
        ['Carrier information', 'Pestaña Information del carrier: General, Contact y Claims Address, con Cancel / Save al pie.', 'CarrierInformation'],
        ['Coverage rules', 'Una fila por categoría CDT: códigos, clase, CoverageBar, deducible, espera y frecuencia. La fila abre CoverageRuleDrawer.', 'CoverageRulesTable'],
        ['Row menus', 'Los kebabs de fila y de detalle: Set as default, Duplicate, Activate / Deactivate y Delete (fee schedule); Duplicate, Activate / Deactivate y Delete (coverage table).', 'MenuArancel · MenuCobertura'],
      ]} />
      <Muestra titulo="Setup checks"><div className="max-w-[560px]"><Checks /></div></Muestra>
      <Muestra titulo="Coverage rules"><Reglas nombre="PPO Standard 100/80/50" /></Muestra>
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo className="max-w-[1100px]">
      <Bloque titulo="Setup checks">
        <div className="grid gap-4 md:grid-cols-2">
          <Muestra titulo="With pending items" nota="Los datos de ejemplo: dos fee schedules en uso con códigos sin precio."><Checks /></Muestra>
          <Muestra titulo="All set (empty)" nota="Sin pendientes."><SetupChecks pendientes={[]} /></Muestra>
        </div>
      </Bloque>
      <Bloque titulo="Fees table">
        <Muestra titulo="Compared with UCR" nota="Un PPO: UCR fee y vs UCR. Tocá un precio para editarlo."><Precios nombre="PPO Premium Plan" /></Muestra>
        <Muestra titulo="The UCR itself" nota="Sin columnas de comparación."><Precios nombre="UCR - Red" /></Muestra>
        <Muestra titulo="Codes without a fee" nota="Medicaid: los códigos que no cubre dicen “Not set”; se filtra por categoría para encontrarlos."><Precios nombre="Medicaid" /></Muestra>
      </Bloque>
      <Bloque titulo="Carrier information">
        <Muestra titulo="Default" nota="Los datos del carrier, editables. Cancel descarta, Save guarda. Los errores de validación se ven en Carrier Information Errors."><Ficha nombre="Aetna" /></Muestra>
      </Bloque>
      <Bloque titulo="Coverage rules">
        <Muestra titulo="Ranges and not covered" nota="DHMO Network: Endodontics paga distinto que el resto de Basic; Cosmetic no se cubre."><Reglas nombre="DHMO Network" /></Muestra>
      </Bloque>
      <Bloque titulo="Row menus" nota="Un fee schedule que no es el default suma Set as default; el default no lo muestra.">
        <Menus arancel="PPO Premium Plan" tabla="PPO Plus 100/90/60" />
      </Bloque>
    </Lienzo>
  ),
}

/* Error: Save con el nombre del carrier vacío. */
export const CarrierInformationErrors: Story = {
  parameters: sinControles,
  render: () => <Ficha nombre="Cigna" />,
  play: secuencia(escribir(/carrier name/i, ''), pulsar(/^save$/i), esperar(/required/i)),
}

/* Reglas para borrar y desactivar: lo que se protege para que ningún plan quede sin cobrar. */
const REGLAS: [string, string, string][] = [
  ['Fee schedule', 'Default, o usado por algún plan', 'Toast de error: setear otro default o mover los planes. El default además no se desactiva.'],
  ['Carrier', 'Con planes', 'Toast de error: borrar los planes o desactivar el carrier.'],
  ['Plan', 'Con pacientes suscriptos', 'Toast de error: pasarlo a Inactive.'],
  ['Coverage table', 'Usada por algún plan', 'Toast de error: mover los planes a otra tabla.'],
  ['Cualquiera', 'Se puede borrar', 'Sale de la lista con un toast “… was deleted.” y Undo, que lo vuelve a su lugar.'],
]

export const Specs: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Delete and deactivate">
        <Tabla encabezado={['Item', 'When', 'What happens']} minimo={640} arriba>
          {REGLAS.map(([i, c, q]) => <tr key={`${i}${c}`}><td className="font-semibold whitespace-nowrap">{i}</td><td>{c}</td><td className="text-ink-medium">{q}</td></tr>)}
        </Tabla>
      </Bloque>
      <Bloque titulo="Shared rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>One store (data/finanzasStore) wraps Settings: what is created in one screen shows up in the others and in the breadcrumb.</li>
          <li>Every list: SettingsPageHeader + SettingsSearch + status filter (All / Active / Inactive) + DataTable. Every detail: header with tags and actions, StatStrip of four, Tabs and a table.</li>
          <li>/new opens the list with the create drawer open, like Locations and Team.</li>
          <li>The CDT catalog and its categories are the ones of Clinical Mode (clinical/dental/data).</li>
          <li>“vs UCR” compares with the default UCR fee schedule; the typographic minus (−) keeps the numbers aligned.</li>
        </ul>
      </Bloque>
    </Lienzo>
  ),
}
