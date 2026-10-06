import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bloque, Lienzo, Tabla, Token } from '@/design-system/kit'
import { NOTIFICACIONES } from '@/data/notificaciones'
import { NotificationBanner } from './NotificationBanner'

const meta = {
  title: 'Components/Layout/NotificationBanner',
  component: NotificationBanner,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 620 },
      description: {
        component: [
          "El aviso de tareas pendientes arriba de cada pantalla (documentos para firmar, consentimientos). Julián eligió la **tarjeta**: el aviso ámbar del design system, del ancho de su contenido y alineado con la página, sin barra de punta a punta.",
          "",
          "**Qué tiene:** ícono, la tarea y su detalle, Review, el paginador cuando hay más de una y la X para ocultarlo.",
          "",
          "**Probalo:** en *Playground* pasá de tarea con las flechas.",
        ].join('\n'),
      },
    },
  },
  args: { items: NOTIFICACIONES, cursor: 0, onCursor: () => {}, onOcultar: () => {} },
} satisfies Meta<typeof NotificationBanner>

export default meta
type Story = StoryObj<typeof meta>

function Demo({ items }: { items: typeof NOTIFICACIONES }) {
  const [cursor, setCursor] = useState(0)
  return <NotificationBanner items={items} cursor={cursor} onCursor={setCursor} onOcultar={() => {}} />
}

/* Varias tareas: con paginador. */
export const Playground: Story = { render: (args) => <Demo items={args.items} /> }
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

/* Las partes del aviso. */
export const Parts: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Parts">
        <Tabla encabezado={["Part", "What it does"]} minimo={560}>
          <tr><td className="font-semibold">Icon</td><td>El tipo de tarea, en el color del aviso.</td></tr>
          <tr><td className="font-semibold">Title and detail</td><td>Qué hay que hacer y para quién, con cuándo se mandó.</td></tr>
          <tr><td className="font-semibold">Review</td><td>Lleva a la tarea.</td></tr>
          <tr><td className="font-semibold">Pager</td><td>1 of 4 con flechas; sólo con más de una tarea. Separado por una línea.</td></tr>
          <tr><td className="font-semibold">Close</td><td>Oculta el aviso.</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

/* Estados del aviso. */
export const States: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="States">
        <Tabla encabezado={["State", "When", "Story"]} minimo={560}>
          <tr><td className="font-semibold">Several</td><td>Más de una tarea: paginador.</td><td>Playground</td></tr>
          <tr><td className="font-semibold">Single</td><td>Una tarea: sin paginador.</td><td>Single</td></tr>
          <tr><td className="font-semibold">Empty</td><td>Sin tareas: no se dibuja.</td><td>Empty</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

/* Medidas y colores. */
export const Specs: Story = {
  parameters: { layout: 'padded', controls: { disable: true }, docs: { story: { inline: true } } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Specs">
        <Tabla encabezado={["Item", "Value"]} minimo={560}>
          <tr><td className="font-semibold">Width</td><td>Del contenido (w-fit), dentro del ancho de página, alineado con el título.</td></tr>
          <tr><td className="font-semibold">Fill</td><td><Token nombre="warn-bg" /></td></tr>
          <tr><td className="font-semibold">Text and border</td><td><Token nombre="warn-fg" /></td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
