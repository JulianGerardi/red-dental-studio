import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { SettingsSearch } from './SettingsSearch'
import { Bloque, Forzar, Lienzo, Muestra, Tabla, TablaPartes, Token, useMedidas } from '@/design-system/kit'

const meta = {
  title: 'Components/Settings/SettingsSearch',
  component: SettingsSearch,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'El buscador de las listas de Settings (`@/components/settings/SettingsSearch`): campo con lupa y el botón *Search* al lado, en la fila de abajo de *SettingsPageHeader*. Lo usan Fee Schedules, Carriers y Coverage Tables.',
          '',
          '**Cómo funciona:** filtra mientras se escribe; *Search* lleva el foco al campo (el botón es del diseño original y Julián pidió que esté en toda tabla con buscador).',
          '',
          '**Probalo:** en *Playground* escribí, y desde *Controls* cambiá *placeholder* y *disabled*.',
        ].join('\n'),
      },
    },
  },
  args: { value: '', placeholder: 'Search carriers or payer ID', disabled: false, onChange: () => {} },
  argTypes: {
    value: { control: 'text', description: 'Lo escrito.' },
    placeholder: { control: 'text', description: 'Qué se busca; también es el nombre del campo para el lector de pantalla.' },
    disabled: { control: 'boolean', description: 'Sin datos que buscar.' },
    onChange: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  decorators: [(Story) => <div className="flex flex-wrap items-center gap-3"><Story /></div>],
} satisfies Meta<typeof SettingsSearch>

export default meta
type Story = StoryObj<typeof meta>

const sinControles = { controls: { disable: true } }

function Vivo({ inicial = '', ...p }: { inicial?: string; placeholder?: string; disabled?: boolean }) {
  const [v, setV] = useState(inicial)
  return <div className="flex w-[460px] max-w-full flex-wrap items-center gap-3"><SettingsSearch {...p} value={v} onChange={setV} /></div>
}

export const Playground: Story = {
  render: (a) => <Vivo key={a.value} inicial={a.value} placeholder={a.placeholder} disabled={a.disabled} />,
}

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Vivo placeholder="Search fee schedules" />
      <TablaPartes partes={[
        ['Field', 'Lupa a la izquierda, hasta 320px de ancho; se achica en angosto.', 'input'],
        ['Search', 'Botón azul: lleva el foco al campo. El filtrado ya corre al escribir.', 'SearchButton'],
      ]} />
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Muestra titulo="Empty" nota="Con el placeholder de lo que se busca."><Vivo placeholder="Search carriers or payer ID" /></Muestra>
      <Muestra titulo="Typed" nota="La lista ya está filtrada."><Vivo inicial="delta" /></Muestra>
      <Muestra titulo="Focus" nota="Borde azul."><Forzar selector="input" estado="focus-visible"><Vivo placeholder="Search coverage tables" /></Forzar></Muestra>
      <Muestra titulo="Disabled" nota="Fondo gris; no se puede escribir."><Vivo placeholder="Search" disabled /></Muestra>
    </Lienzo>
  ),
}

function Medida({ sel, parte }: { sel: string; parte: string }) {
  const { ref, m } = useMedidas(sel)
  return (
    <tr>
      <td className="font-semibold">{parte}</td>
      <td><div ref={ref} className="flex items-center gap-3"><SettingsSearch value="" onChange={() => {}} /></div></td>
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
        <Tabla encabezado={['Part', 'Sample', 'Width', 'Height', 'Text', 'Radius']} minimo={700}>
          <Medida sel="input" parte="Field" />
          <Medida sel="button" parte="Search" />
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Part', 'Token']} minimo={420}>
          <tr><td className="font-semibold">Field border</td><td><Token nombre="line" /> · focus <Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Placeholder · icon</td><td><Token nombre="ink-faint" /></td></tr>
          <tr><td className="font-semibold">Search</td><td><Token nombre="dash-blue" /> · hover <Token nombre="dash-blue-hover" /></td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
