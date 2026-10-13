import type { Meta, StoryObj } from '@storybook/react-vite'
import { Breadcrumb, type Miga } from './breadcrumb'
import { PatientBreadcrumb } from '@/components/patients/PatientBreadcrumb'
import { Bloque, Forzar, Lienzo, Muestra, Tabla, TablaPartes, Token, useMedidas } from '@/design-system/kit'

/* "Patients > John Smith > Ledger" → migas; el último tramo no es link. */
const migas = (texto: string): Miga[] => {
  const partes = texto.split('>').map((p) => p.trim()).filter(Boolean)
  return partes.map((label, i) => ({ label, to: i < partes.length - 1 ? '#' : undefined }))
}

type Args = { trail: string }

const meta = {
  title: 'Elements/Breadcrumb',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'El rastro de navegación (`@/components/ui/breadcrumb`): dice dónde estás y cada tramo, menos el último, lleva de vuelta. El último es la pantalla actual: va en gris, no es link y lleva `aria-current="page"`.',
          '',
          '**Dónde va (Julián, 2026-10-13):** sólo en las pantallas a las que **se entra desde otra**. Las de primer nivel —las que se abren desde el menú lateral o el de la cuenta: Dashboard, Patients, Scheduling, Billing, Help, Notifications, Settings y Profile— **no llevan**. La pantalla nunca lo escribe a mano: en Settings lo arma el layout a partir de la ruta y en las pantallas del paciente `PatientBreadcrumb` (*Patients › paciente › sección*). Ver *Where it goes* en *Specs*.',
          '',
          '**Probalo:** en *Playground* escribí el rastro desde *Controls*, separando los tramos con ">"; pasá el mouse y llegá con Tab a los links.',
        ].join('\n'),
      },
    },
  },
  args: { trail: 'Patients > John Smith > Ledger' },
  argTypes: {
    trail: { control: 'text', description: 'Tramos separados por ">". El último es la pantalla actual.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>
const sinControles = { controls: { disable: true } }

export const Playground: Story = { render: ({ trail }) => <Breadcrumb items={migas(trail)} /> }

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque nota="Un rastro de tres tramos: los dos primeros llevan de vuelta, el tercero es donde estás.">
        <Breadcrumb items={migas('Patients > John Smith > Ledger')} />
      </Bloque>
      <TablaPartes partes={[
        ['Link', 'Un nivel de arriba: lleva a esa pantalla. Azul, subrayado con el mouse, anillo azul con Tab.', 'items[i].to'],
        ['Separator', 'Chevron de 14px en gris tenue entre tramos; no se lee en voz alta.', 'ChevronRight'],
        ['Current screen', 'El último tramo, sin link (llevaría al mismo lugar), en gris y con aria-current="page".', 'items[last] sin to'],
      ]} />
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <div className="grid gap-6 md:grid-cols-2">
        <Muestra titulo="Default" nota="Dos niveles arriba y la pantalla actual.">
          <Breadcrumb items={migas('Patients > John Smith > Ledger')} />
        </Muestra>
        <Muestra titulo="Hover on a link" nota="Subrayado: se puede volver.">
          <Forzar selector="a" estado="hover"><Breadcrumb items={migas('Patients > John Smith > Ledger')} /></Forzar>
        </Muestra>
        <Muestra titulo="Keyboard focus" nota="Anillo azul al llegar con Tab, el de los botones.">
          <Forzar selector="a" estado="focus-visible"><Breadcrumb items={migas('Patients > John Smith > Ledger')} /></Forzar>
        </Muestra>
        <Muestra titulo="Patient overview" nota="En el Overview el rastro termina en el paciente.">
          <PatientBreadcrumb className="mb-0" name="John Smith" />
        </Muestra>
        <Muestra titulo="Long trail, narrow screen" nota="Baja de renglón entre tramos; ninguno se corta." ancho={260}>
          <Breadcrumb items={migas('Settings > Billing > Carriers > Aetna Dental Plans > Acme Corp')} />
        </Muestra>
        <Muestra titulo="First-level screen" nota="Patients, Billing, Dashboard…: sin rastro. El título dice dónde estás.">
          <p className="text-[12px] text-ink-faint">(no breadcrumb)</p>
        </Muestra>
      </div>
    </Lienzo>
  ),
}

/* Cada pantalla con su rastro, tal cual lo arma la app (auditado sobre todas las rutas el 2026-10-13). */
const DONDE: [string, string][] = [
  ['Dashboard · Patients · Scheduling · Billing · Help · Notifications', '—'],
  ['Settings (General) · Profile (/settings/account)', '—'],
  ['Patient overview', 'Patients › John Smith'],
  ['Patient section (Treatments, Insurance, Ledger, Documents, Relationships & Billing)', 'Patients › John Smith › Ledger'],
  ['Add Relationship (drawer over the list)', 'Patients › John Smith › Relationships & Billing'],
  ['Edit Patient', 'Patients › John Smith › Edit Patient'],
  ['Settings section', 'Settings › Locations'],
  ['Settings item', 'Settings › Locations › Abril'],
  ['Settings › Billing', 'Settings › Billing › Carriers › Aetna Dental Plans'],
  ['A /new that opens a drawer', 'Ends in the list: Settings › Employees'],
]

function Medida() {
  const { ref, m } = useMedidas('nav')
  return (
    <div ref={ref}>
      <Breadcrumb items={migas('Patients > John Smith > Ledger')} />
      <p className="mt-3 text-[12px] text-ink-muted tabular-nums">Measured: {m?.texto} · {m?.peso} · height {m?.alto} · gap {m?.gap}</p>
    </div>
  )
}

export const Specs: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Where it goes" nota="Primer nivel sin rastro; todo lo que se abre desde otra pantalla, con el camino desde el primer nivel.">
        <Tabla encabezado={['Screen', 'Breadcrumb']} minimo={640}>
          {DONDE.map(([pantalla, rastro]) => (
            <tr key={pantalla}><td className="font-semibold">{pantalla}</td><td className="text-ink-medium">{rastro}</td></tr>
          ))}
        </Tabla>
      </Bloque>
      <Bloque titulo="Type and spacing" nota="Medido sobre el rastro dibujado.">
        <Medida />
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>13px, links Regular. Chevron 14px; 4px entre tramos y chevrons.</li>
          <li>Settings: 20px desde arriba de la página. Paciente: arriba de la página, 16px sobre el panel y el contenido.</li>
        </ul>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Part', 'Token']} minimo={480}>
          <tr><td className="font-semibold">Link</td><td><Token nombre="dash-blue" /> · focus <Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Separator</td><td><Token nombre="ink-faint" /></td></tr>
          <tr><td className="font-semibold">Current screen</td><td><Token nombre="ink-muted" /></td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
