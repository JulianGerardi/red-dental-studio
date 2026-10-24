import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { DescriptorFields } from './DescriptorFields'
import { DESCRIPTOR_ROWS } from './data'
import { Bloque, ConRotulo, Lienzo, Tabla, useMedidas } from '@/design-system/kit'

const meta = {
  title: 'Components/Clinical/Dental/DescriptorFields',
  component: DescriptorFields,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'La guía visual de descriptores de una condition: doce filas, una por atributo, cada una con sus opciones como píldoras de una sola elección. Ninguna es obligatoria -una condition puede no tener nada elegido, o sólo algunas filas-. La usan [New Condition](/docs/components-clinical-dental-newproceduredrawer--docs) (paso *Descriptors*) y [Edit Finding](/docs/components-clinical-dental-editfindingdrawer--docs), sólo en una condition.',
          '',
          '**Tomadas de la app real** (red.dev, Extraoral e Intraoral, New Condition → Select descriptors), no del Figma: Quantity, Symmetry, Size, Shape, Borders, Colors, Surface, Consistency, Mobility, Pain, Bleeding y Exudate, con las mismas opciones -confirmado el 2026-10-24 con grabaciones de pantalla de Julián en los dos exámenes-.',
          '',
          '**Probalo:** tocá una píldora para elegirla: la fila cambia a una sola opción, en azul. Tocarla de nuevo la deselecciona.',
        ].join('\n'),
      },
    },
  },
  args: { value: {}, onChange: () => {} },
  argTypes: { value: { table: { disable: true } }, onChange: { table: { disable: true } } },
} satisfies Meta<typeof DescriptorFields>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<Record<string, string>>(args.value)
    return <div className="max-w-[420px]"><DescriptorFields {...args} value={value} onChange={setValue} /></div>
  },
}

/* Las doce filas, cada una con su rótulo y sus opciones. */
export const Parts: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Rows" nota="Rótulo (FieldLabel, como Provider y Notes) y una píldora por opción, que envuelven en vez de quedar en columnas fijas.">
        <Tabla encabezado={['Row', 'Options']} minimo={520}>
          {DESCRIPTOR_ROWS.map((r) => <tr key={r.id}><td className="font-semibold">{r.label}</td><td>{r.options.join(' · ')}</td></tr>)}
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <div className="grid gap-6 md:grid-cols-2">
        <Bloque titulo="Empty" nota="Nada elegido: la condición creada sin tocar la guía.">
          <div className="max-w-[380px]"><DescriptorFields value={{}} onChange={() => {}} /></div>
        </Bloque>
        <Bloque titulo="Selected" nota="Dos filas elegidas (hover y foco: Playground).">
          <div className="max-w-[380px]"><DescriptorFields value={{ colors: 'White', borders: 'Raised' }} onChange={() => {}} /></div>
        </Bloque>
      </div>
    </Lienzo>
  ),
}

function PildoraMedida() {
  const { ref, m } = useMedidas()
  return (
    <tr>
      <td className="font-semibold">Selected pill</td>
      <td><div ref={ref} className="inline-block"><DescriptorFields value={{ quantity: 'Solitary' }} onChange={() => {}} rows={[DESCRIPTOR_ROWS[0]!]} /></div></td>
      <td className="tabular-nums">{m?.padding}</td>
      <td className="tabular-nums">{m?.radio}</td>
    </tr>
  )
}

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Rows" nota="Gap de 16 entre filas, 6 entre el rótulo y las píldoras, 6 entre píldoras de una misma fila.">
        <Tabla encabezado={['Item', 'Sample', 'Padding', 'Radius']} minimo={560}>
          <PildoraMedida />
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules" nota="Una elección por fila: tocar otra píldora la reemplaza. Tocar la ya elegida la deselecciona. Ninguna fila es obligatoria.">
        <ConRotulo rotulo="Unselected"><span className="text-[11px] font-semibold text-ink-muted">Option label</span></ConRotulo>
      </Bloque>
    </Lienzo>
  ),
}
