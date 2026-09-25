import type { Meta, StoryObj } from '@storybook/react-vite'
import { SOLICITUDES } from '@/components/scheduling/requests-data'
import { SolicitudCard } from './Scheduling'

const meta = { title: 'Pages/Parts/Scheduling', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/* Tarjeta del panel de solicitudes: ASAP (acento rojo) y lista de espera (acento azul). */
export const RequestCards: Story = {
  render: () => (
    <div className="flex w-[300px] flex-col gap-3">
      {SOLICITUDES.slice(0, 3).map((s) => <SolicitudCard key={s.id} s={s} onCancel={() => {}} onSchedule={() => {}} />)}
    </div>
  ),
}
