import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { EditableAmount } from './EditableAmount'
import { Bloque, Forzar, Lienzo, Muestra, Muestras, Tabla, TablaPartes, Token, useMedidas } from '@/design-system/kit'
import { expect, waitFor, within } from 'storybook/test'
import { escribir, pulsar } from '@/design-system/play'

const meta = {
  title: 'Components/Finance/EditableAmount',
  component: EditableAmount,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Un monto que se edita en su misma celda (`@/components/finance/EditableAmount`): el precio de un procedimiento en la tabla de un fee schedule.',
          '',
          '**Cómo se usa:** se toca el monto (aparece el lápiz al pasar el mouse), se escribe y Enter -o salir del campo- lo guarda; Escape lo descarta. Vacío y Enter lo deja sin precio ("Not set"). Un texto que no es un monto pinta el borde en rojo y no se guarda.',
          '',
          '**Probalo:** en *Playground* tocá el monto y cambialo; desde *Controls* probá *value*, *disabled* y *editing*.',
        ].join('\n'),
      },
    },
  },
  args: { value: 115, label: 'D1110 fee', disabled: false, editing: false, onChange: () => {} },
  argTypes: {
    value: { control: 'number', description: 'El monto. Sin valor: "Not set".' },
    label: { control: 'text', description: 'Qué monto es, para el lector de pantalla.' },
    disabled: { control: 'boolean', description: 'De sólo lectura.' },
    editing: { control: 'boolean', description: 'Arranca editando (sólo stories).' },
    onChange: { table: { disable: true } },
  },
} satisfies Meta<typeof EditableAmount>

export default meta
type Story = StoryObj<typeof meta>

const sinControles = { controls: { disable: true } }

function Vivo({ inicial, ...p }: { inicial?: number } & Partial<React.ComponentProps<typeof EditableAmount>>) {
  const [v, setV] = useState(inicial)
  return <EditableAmount label="D1110 fee" {...p} value={v} onChange={setV} />
}

export const Playground: Story = {
  render: (a) => <Vivo key={`${a.value}-${a.editing}`} inicial={a.value} disabled={a.disabled} editing={a.editing} label={a.label} />,
}

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Muestras>
        <Muestra titulo="Reading"><Forzar selector="button" estado="hover"><Vivo inicial={115} /></Forzar></Muestra>
        <Muestra titulo="Editing"><Vivo inicial={115} editing /></Muestra>
      </Muestras>
      <TablaPartes partes={[
        ['Amount', 'El monto con centavos, en negro. "Not set" en gris si no tiene.', 'button'],
        ['Pencil', 'Aparece con el mouse o el foco: dice que se puede editar.', 'Pencil'],
        ['Input', 'Campo de 112px, alineado a la derecha, con el $ adentro. Borde azul; rojo si el texto no es un monto.', 'input'],
      ]} />
    </Lienzo>
  ),
}

/* Error: un texto que no es un monto. Comprueba que el campo quede inválido. */
export const InvalidAmount: Story = {
  args: { value: 115, editing: false },
  play: async (c) => {
    await pulsar(/edit d1110 fee/i)(c)
    await escribir(/^d1110 fee$/i, '9x')(c)
    await waitFor(() => expect(within(c.canvasElement).getByLabelText(/^d1110 fee$/i)).toHaveAttribute('aria-invalid', 'true'))
  },
}

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Muestras>
        <Muestra titulo="Default" nota="El precio guardado."><Vivo inicial={115} /></Muestra>
        <Muestra titulo="Hover" nota="Fondo gris y lápiz."><Forzar selector="button" estado="hover"><Vivo inicial={115} /></Forzar></Muestra>
        <Muestra titulo="Not set (empty)" nota="El código no tiene precio en este fee schedule."><Vivo /></Muestra>
        <Muestra titulo="Editing" nota="Enter guarda, Escape descarta."><Vivo inicial={115} editing /></Muestra>
        <Muestra titulo="Disabled" nota="Sólo lectura, al 50%."><Vivo inicial={115} disabled /></Muestra>
      </Muestras>
      <p className="text-[12.5px] text-ink-muted">Error (invalid text): red border and nothing is saved. See it live in the <em>Invalid Amount</em> story.</p>
    </Lienzo>
  ),
}

function Medida({ editando }: { editando?: boolean }) {
  const { ref, m } = useMedidas(editando ? 'input' : 'button')
  return (
    <tr>
      <td className="font-semibold">{editando ? 'Input' : 'Button'}</td>
      <td><div ref={ref}><Vivo inicial={115} editing={editando} /></div></td>
      <td className="tabular-nums">{m?.ancho}</td>
      <td className="tabular-nums">{m?.alto}</td>
      <td className="tabular-nums">{m?.texto}</td>
      <td className="tabular-nums">{m?.radio}</td>
    </tr>
  )
}

export const Specs: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Sizes" nota="Medidas leídas de la pieza dibujada.">
        <Tabla encabezado={['Part', 'Sample', 'Width', 'Height', 'Text', 'Radius']} minimo={620}>
          <Medida />
          <Medida editando />
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Part', 'Token']} minimo={420}>
          <tr><td className="font-semibold">Amount</td><td><Token nombre="ink" /></td></tr>
          <tr><td className="font-semibold">Not set</td><td><Token nombre="ink-faint" /></td></tr>
          <tr><td className="font-semibold">Hover</td><td><Token nombre="surface-muted" /></td></tr>
          <tr><td className="font-semibold">Input border</td><td><Token nombre="dash-blue" /> · error <Token nombre="field-error" /></td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules">
        <ul className="flex list-disc flex-col gap-1 pl-5 text-[13px] text-ink-medium">
          <li>Accepts “95”, “95.5”, “$1,250”. Saves rounded to cents.</li>
          <li>Empty + Enter clears the fee. Invalid text on blur is discarded.</li>
          <li>Clicks inside don’t reach the row (it can live in a clickable row).</li>
        </ul>
      </Bloque>
    </Lienzo>
  ),
}
