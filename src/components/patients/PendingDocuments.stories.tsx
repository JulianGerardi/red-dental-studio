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
          '',
          'En una columna angosta (el Overview a 1024px, el celular) el vencimiento y el botón bajan a un segundo renglón en vez de aplastar el nombre.',
          '',
          '**Probalo:** en *Playground* resolvé documentos o filtrá por quién tiene que actuar; *Narrow column* la muestra a 380px.',
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
/* Muchos documentos: se ven los primeros cuatro y "Show N more" abre el resto con scroll (2026-10-12). Copias de los
   mismos del mock, con otro id: sólo para mostrar el tope. */
export const ManyDocuments: Story = {
  name: 'Many documents (show more)',
  args: { docs: [0, 1, 2].flatMap((k) => DOCS_PENDIENTES.map((d) => ({ ...d, id: `${d.id}-${k}` }))) },
}
/* Todo resuelto: queda el estado vacío. */
export const Empty: Story = { args: { docs: DOCS_PENDIENTES.map((d) => ({ ...d, resuelto: 'Oct 5, 2026' })) } }
/* La columna izquierda del Overview a 1024px: vencimiento y botón en un segundo renglón (2026-10-17). */
export const NarrowColumn: Story = {
  name: 'Narrow column',
  decorators: [(Story) => <div className="w-[380px] rounded-lg border border-line bg-white p-5"><Story /></div>],
}
