import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import { useState } from 'react'
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
`})))()}n();export{t as default};