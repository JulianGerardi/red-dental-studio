import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bloque, Lienzo, Tabla, Token } from '@/design-system/kit'
import { NOTIFICACIONES } from '@/data/notificaciones'
import { delBanner } from '@/data/notificacionesStore'
import { NotificationBanner } from './NotificationBanner'

/* Las tareas que el banner muestra de verdad: sin leer y sin ocultar. */
const TAREAS = delBanner(NOTIFICACIONES, [])

const meta = {
  title: 'Components/Layout/NotificationBanner',
  component: NotificationBanner,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false, iframeHeight: 620 },
      description: {
        component: [
          "El aviso de tareas sin leer arriba de cada pantalla (documentos para firmar, derivaciones, llamados). Es la **tarjeta** ámbar del design system, de punta a punta del contenido de la página (Julián, 2026-10-13; antes iba del ancho de su texto), sin padding arriba ni a los costados (Julián, 2026-10-19), pegado al header y a los bordes del contenido.",
          "",
          "**Cómo se ordena:** la tarea, Review y el paginador juntos a la izquierda; la X sola, a la derecha.",
          "",
          "**Qué tiene:** ícono, la tarea y su detalle, Review, el paginador cuando hay más de una y la X para ocultarlo.",
          "",
          "**Probalo:** en *Playground* pasá de tarea con las flechas.",
        ].join('\n'),
      },
    },
  },
  args: { items: TAREAS, cursor: 0, onCursor: () => {}, onOcultar: () => {} },
} satisfies Meta<typeof NotificationBanner>

export default meta
type Story = StoryObj<typeof meta>

function Demo({ items }: { items: typeof TAREAS }) {
  const [cursor, setCursor] = useState(0)
  return <NotificationBanner items={items} cursor={cursor} onCursor={setCursor} onOcultar={() => {}} />
}

/* Varias tareas: con paginador. */
export const Playground: Story = { render: (args) => <Demo items={args.items} /> }
export const Single: Story = { render: () => <Demo items={TAREAS.slice(0, 1)} /> }

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
      <NotificationBanner items={TAREAS} cursor={cursor} onCursor={setCursor} onOcultar={() => {}} />
      <div className="mx-auto w-full max-w-[1400px] px-6 pt-5">
        <p className="text-[20px] font-bold text-ink">Notifications</p>
        <p className="text-[13px] text-ink-muted">Open one to go where it happened, or mark it as read or unread.</p>
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
          <tr><td className="font-semibold">Close</td><td>Oculta esa tarea del banner; sigue sin leer en la campana y en Notifications. Va sola, en el extremo derecho.</td></tr>
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
          <tr><td className="font-semibold">Width</td><td>De punta a punta del contenido de la página (w-full dentro de ANCHO_PAGINA): alineado con el título y con las cards.</td></tr>
          <tr><td className="font-semibold">Padding</td><td>Ninguno arriba ni a los costados: pegado al header y a los bordes del contenido.</td></tr>
          <tr><td className="font-semibold">Order</td><td>Ícono, tarea, Review y paginador a la izquierda; la X con <code>ml-auto</code>, sola a la derecha.</td></tr>
          <tr><td className="font-semibold">Fill</td><td><Token nombre="warn-bg" /></td></tr>
          <tr><td className="font-semibold">Text and border</td><td><Token nombre="warn-fg" /></td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
