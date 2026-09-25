import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
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
`})))()}export{n,i as r,r as t};