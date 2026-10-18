import type { Meta, StoryObj } from '@storybook/react-vite'
import { userEvent, within } from 'storybook/test'
import { aviso } from '@/components/ui/toaster'
import { Bloque, Lienzo, Tabla, Token } from '@/design-system/kit'
import { esperar } from '@/design-system/play'
import { FindingActionsMenu } from './FindingActionsMenu'
import type { Finding, FindingStatus } from './data'

const FINDING: Finding = {
  id: 'F-1', area: 'Tooth 3', condition: 'chronic enamel dental caries', descriptor: 'Deep', date: 'May 14, 2026',
  status: 'Active', tooth: 3, provider: 'Elena Martinez', surfaces: ['O'], notes: '', linked: [], diagnoses: [],
}
const ESTADOS: FindingStatus[] = ['Active', 'Monitoring', 'In Treatment', 'Treated', 'Externally Treated', 'No Treatment Needed', 'Patient Declined', 'Clinic Declined', 'Discarded']

type Args = { status: FindingStatus; verRegistro: boolean }

/* El menú con el trigger a la vista; las stories con play lo abren. */
function Menu({ status, verRegistro }: Args) {
  return (
    <div className="flex h-[440px] w-64 justify-end">
      <FindingActionsMenu
        finding={{ ...FINDING, status }}
        onVer={verRegistro ? () => aviso.info('Opens the full record drawer.') : undefined}
        onEdit={() => aviso.info('Opens Edit Finding.')}
        onAction={(a) => aviso.info(`Asks to confirm: ${a}.`)}
      />
    </div>
  )
}

const abrir = async (c: { canvasElement: HTMLElement }) => {
  await userEvent.click(await within(c.canvasElement).findByRole('button', { name: /Actions for Tooth 3/ }))
}

const meta = {
  title: 'Components/Clinical/Dental/FindingActionsMenu',
  parameters: {
    layout: 'padded',
    docs: {
      story: { inline: false, iframeHeight: 480 },
      description: {
        component: [
          'El menú de los tres puntos de cada finding, en el panel de **Findings** de los exámenes (`ExamLayout`).',
          '',
          '**Qué tiene:** *View full record* abre el mismo drawer de sólo lectura que la Problem List (sus procedimientos, caso, derivaciones, órdenes y examen de origen), así parado en un examen se ve lo mismo que en la tabla sin salir de él (Julián, 2026-10-13). Después *Edit*, los cambios de estado (Start Monitoring… Discard) y *Delete*; los que cierran sin tratar van en rojo y cada uno pide confirmación. *Start Treatment* sólo sobre algo abierto (Active o Monitoring).',
          '',
          '**Probalo:** en *Playground* cambiá el estado del finding y si el menú lleva View full record desde *Controls*, y abrí el menú.',
        ].join('\n'),
      },
    },
  },
  args: { status: 'Active', verRegistro: true },
  argTypes: {
    status: { control: 'select', options: ESTADOS, description: 'El estado del finding: Start Treatment se deshabilita fuera de Active y Monitoring.' },
    verRegistro: { name: 'View full record', control: 'boolean', description: 'Con `onVer`: el ítem que abre el registro completo. En los exámenes va siempre.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

/* Cambiá el estado y View full record desde Controls. */
export const Playground: Story = { render: (a) => <Menu {...a} /> }

export const Parts: Story = {
  parameters: { controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="What each part is">
        <Tabla encabezado={['Part', 'What it does']} minimo={600} arriba>
          <tr><td className="font-semibold">Trigger</td><td>Los tres puntos en la esquina de la card del finding; su nombre accesible es "Actions for" y el área (Tooth 3, Soft Palate).</td></tr>
          <tr><td className="font-semibold">Actions</td><td>El título del menú, como el de la Problem List.</td></tr>
          <tr><td className="font-semibold">View full record</td><td>Primero, junto a Edit: mirar antes de cambiar. Abre el drawer de la Problem List (Components / Clinical / RecordDetail) con lo vinculado al finding; un link a otro registro cambia el drawer a ese.</td></tr>
          <tr><td className="font-semibold">Edit</td><td>Abre Edit Finding.</td></tr>
          <tr><td className="font-semibold">Status actions</td><td>Start Monitoring, Start Treatment, Mark As Treated, Mark As Externally Treated; en rojo los que cierran sin tratar y Discard. Cada uno pide confirmación.</td></tr>
          <tr><td className="font-semibold">Delete</td><td>Separado al final, en rojo. Se deshace desde el aviso.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="States" nota="Cada uno abierto en su story: Open, Treated y Without full record.">
        <Tabla encabezado={['State', 'When', 'Story']} minimo={600}>
          <tr><td className="font-semibold">Open</td><td>Un finding activo: todo habilitado, View full record primero.</td><td>Open</td></tr>
          <tr><td className="font-semibold">Start Treatment disabled</td><td>Un finding ya tratado o cerrado: el tratamiento sólo arranca sobre algo abierto.</td><td>Treated</td></tr>
          <tr><td className="font-semibold">Without full record</td><td>Sin `onVer`: el menú arranca en Edit.</td><td>Without full record</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

/* El menú abierto sobre un finding activo. */
export const Open: Story = { render: (a) => <Menu {...a} />, play: async (c) => { await abrir(c); await esperar(/View full record/)(c) } }

/* En un finding ya tratado, "Start Treatment" queda deshabilitado. */
export const Treated: Story = { args: { status: 'Treated' }, render: (a) => <Menu {...a} />, play: async (c) => { await abrir(c); await esperar(/Start Treatment/)(c) } }

/* Sin `onVer` no hay View full record. */
export const WithoutFullRecord: Story = {
  name: 'Without full record',
  args: { verRegistro: false },
  render: (a) => <Menu {...a} />,
  play: async (c) => { await abrir(c); await esperar(/Start Monitoring/)(c) },
}

export const Specs: Story = {
  parameters: { controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Layout">
        <Tabla encabezado={['Item', 'Value']} minimo={560}>
          <tr><td className="font-semibold">Trigger</td><td>28px, ícono de 14px, <Token nombre="ink-muted" />; fondo <Token nombre="surface-muted" /> al pasar el mouse.</td></tr>
          <tr><td className="font-semibold">Menu</td><td>248px, alineado al borde derecho del trigger. Ítems con ícono de 16px.</td></tr>
          <tr><td className="font-semibold">Groups</td><td>View full record y Edit; los estados; Delete. Una línea separa cada grupo.</td></tr>
          <tr><td className="font-semibold">Destructive</td><td><Token nombre="field-error" />: Mark As No Treat. Needed, Patient Declined, Clinic Declined, Discard y Delete.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
