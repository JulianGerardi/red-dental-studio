import type { Meta, StoryObj } from '@storybook/react-vite'
import { SOLICITUDES } from '@/components/scheduling/requests-data'
import { SolicitudCard } from './Scheduling'

const meta = { title: 'Pages/Parts/Scheduling', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/* Tarjeta del panel de solicitudes: ASAP (barra y pill rojas) y lista de espera (azules). Es la misma card que los
   turnos del Patient Dashboard; ver Elements / Appointment cards. */
export const RequestCards: Story = {
  render: () => (
    <div className="flex w-[248px] flex-col gap-2">
      {SOLICITUDES.map((s) => <SolicitudCard key={s.id} s={s} onCancel={() => {}} onSchedule={() => {}} />)}
    </div>
  ),
}
