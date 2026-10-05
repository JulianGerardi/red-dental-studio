import type { Meta, StoryObj } from '@storybook/react-vite'
import { PendingDocuments } from './PendingDocuments'
import { DOCS_PENDIENTES } from '@/data/pendingDocuments'

const meta = {
  title: 'Components/Patients/PendingDocuments',
  component: PendingDocuments,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Los documentos del paciente que alguien tiene que resolver (firmar, subir, actualizar o revisar), en el Patient Dashboard en lugar de la tabla de Insurance. Agrupados en Overdue, Due this week y Later, con quién tiene que actuar (Patient, Provider, Front desk) y un botón para resolverlo; los vencidos con el botón azul. Se filtra entre All, Patient y Office.',
          '',
          '**Probalo:** en *Playground* resolvé documentos o filtrá por quién tiene que actuar.',
        ].join('\n'),
      },
    },
  },
  argTypes: { docs: { table: { disable: true } } },
  decorators: [(Story) => <div className="max-w-[860px] rounded-lg border border-line bg-white p-5"><Story /></div>],
} satisfies Meta<typeof PendingDocuments>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
/* Todo resuelto: queda el estado vacío. */
export const Empty: Story = { args: { docs: DOCS_PENDIENTES.map((d) => ({ ...d, resuelto: 'Oct 5, 2026' })) } }
