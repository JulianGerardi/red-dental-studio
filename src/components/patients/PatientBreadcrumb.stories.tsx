import type { Meta, StoryObj } from '@storybook/react-vite'
import { PatientBreadcrumb, migasPaciente } from './PatientBreadcrumb'
import { Bloque, Lienzo, Muestra, Tabla, TablaPartes } from '@/design-system/kit'

const SECCIONES = ['Overview', 'Treatments', 'Insurance', 'Ledger', 'Documents', 'Relationships & Billing', 'Edit Patient'] as const
type Args = { name: string; section: (typeof SECCIONES)[number] }
const seccionDe = (s: Args['section']) => (s === 'Overview' ? undefined : s)

const meta = {
  title: 'Components/Patients/PatientBreadcrumb',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'El rastro de todas las pantallas de un paciente (`@/components/patients/PatientBreadcrumb`, Julián, 2026-10-13): **Patients › paciente › sección**. Reemplaza al "‹ Patients" que tenían arriba: ahora se vuelve a la lista o al Overview del paciente con un toque. Es el `Breadcrumb` de *Elements / Breadcrumb* con las migas armadas por `migasPaciente`.',
          '',
          'En el **Overview** termina en el paciente; en una sección, el paciente lleva al Overview y la sección es el último tramo, con el mismo nombre que en el menú del paciente. **Edit Patient** cuelga del paciente. Add Relationship abre un drawer sobre la lista, así que termina en *Relationships & Billing*. La lista de Patients no lleva rastro: es de primer nivel.',
          '',
          '**Probalo:** en *Playground* elegí la sección y cambiá el nombre desde *Controls*.',
        ].join('\n'),
      },
    },
  },
  args: { name: 'John Smith', section: 'Ledger' },
  argTypes: {
    name: { control: 'text', description: 'El nombre del paciente, el mismo del menú del paciente. Probá uno largo.' },
    section: { control: 'select', options: SECCIONES, description: 'La pantalla del paciente. Overview termina en el nombre.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>
const sinControles = { controls: { disable: true } }

export const Playground: Story = {
  render: ({ name, section }) => <PatientBreadcrumb className="mb-0" name={name} section={seccionDe(section)} />,
}

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque nota="Una sección del paciente: los tres tramos.">
        <PatientBreadcrumb className="mb-0" name="John Smith" section="Insurance" />
      </Bloque>
      <TablaPartes partes={[
        ['Patients', 'Vuelve a la lista de pacientes.', '/patients'],
        ['Patient', 'Vuelve al Overview del paciente. En el Overview es el último tramo y no es link.', 'name · /patients/:id'],
        ['Section', 'La pantalla actual, con el nombre del menú del paciente (o Edit Patient).', 'section'],
      ]} />
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <div className="grid gap-6 md:grid-cols-2">
        <Muestra titulo="Overview" nota="Termina en el paciente.">
          <PatientBreadcrumb className="mb-0" name="John Smith" />
        </Muestra>
        <Muestra titulo="Section" nota="El paciente lleva al Overview.">
          <PatientBreadcrumb className="mb-0" name="John Smith" section="Relationships & Billing" />
        </Muestra>
        <Muestra titulo="Edit Patient" nota="El formulario completo cuelga del paciente.">
          <PatientBreadcrumb className="mb-0" name="John Smith" section="Edit Patient" />
        </Muestra>
        <Muestra titulo="Long name, phone" nota="Baja de renglón entre tramos; el nombre no se corta." ancho={240}>
          <PatientBreadcrumb className="mb-0" name="Maria Abril Viola Fernández" section="Relationships & Billing" />
        </Muestra>
      </div>
    </Lienzo>
  ),
}

export const Specs: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Trail per screen" nota="Lo que devuelve migasPaciente para cada pantalla (→ es link).">
        <Tabla encabezado={['Screen', 'Route', 'Breadcrumb']} minimo={640}>
          {SECCIONES.map((s) => (
            <tr key={s}>
              <td className="font-semibold">{s}</td>
              <td className="font-mono text-[12px] text-ink-muted">{s === 'Edit Patient' ? '/patients/edit' : `/patients/:id${s === 'Overview' ? '' : `/${s.split(' ')[0].toLowerCase()}`}`}</td>
              <td className="text-ink-medium">{migasPaciente('John Smith', '/patients/john-smith', seccionDe(s)).map((m) => (m.to ? `${m.label} →` : m.label)).join(' › ')}</td>
            </tr>
          ))}
        </Tabla>
      </Bloque>
      <Bloque titulo="Spacing">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>Arriba de la página, donde estaba "‹ Patients"; 16px (mb-4) sobre el panel del paciente y el contenido.</li>
          <li>Texto, colores y foco: los del Breadcrumb (Elements / Breadcrumb).</li>
        </ul>
      </Bloque>
    </Lienzo>
  ),
}
