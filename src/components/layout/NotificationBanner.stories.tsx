import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { NOTIFICACIONES } from '@/data/notificaciones'
import { NotificationBanner } from './NotificationBanner'

const meta = {
  title: 'Components/Layout/NotificationBanner',
  component: NotificationBanner,
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
  args: { items: NOTIFICACIONES, cursor: 0, onCursor: () => {}, onOcultar: () => {} },
} satisfies Meta<typeof NotificationBanner>

export default meta
type Story = StoryObj<typeof meta>

function Demo({ items }: { items: typeof NOTIFICACIONES }) {
  const [cursor, setCursor] = useState(0)
  return <NotificationBanner items={items} cursor={cursor} onCursor={setCursor} onOcultar={() => {}} />
}

export const Several: Story = { render: (args) => <Demo items={args.items} /> }
export const Single: Story = { render: () => <Demo items={NOTIFICACIONES.slice(0, 1)} /> }

/* Sin tareas pendientes el banner no se dibuja: el componente devuelve null. */
export const Empty: Story = {
  render: () => (
    <div className="border border-dashed border-line-strong p-4 text-[12px] text-ink-muted">
      <NotificationBanner items={[]} cursor={0} onCursor={() => {}} onOcultar={() => {}} />
      No banner is rendered when there are no pending tasks.
    </div>
  ),
}

/* En la página: el aviso del ancho de su contenido, alineado con el título. */
function Pagina() {
  const [cursor, setCursor] = useState(0)
  return (
    <div className="bg-page-background pb-6">
      <NotificationBanner items={NOTIFICACIONES} cursor={cursor} onCursor={setCursor} onOcultar={() => {}} />
      <div className="mx-auto w-full max-w-[1400px] px-6 pt-5">
        <p className="text-[20px] font-bold text-ink">Notifications</p>
        <p className="text-[13px] text-ink-muted">Mark each one as read, pending or unread, and archive what’s done.</p>
      </div>
    </div>
  )
}
export const OnPage: Story = { render: () => <Pagina /> }
