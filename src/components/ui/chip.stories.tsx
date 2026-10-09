import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Chip } from './chip'
import { Pill } from './pill'
import { Bloque, ConRotulo, Lienzo, Muestras, Tabla, TablaPartes, Token } from '@/design-system/kit'

const meta = {
  title: 'Elements/Chips',
  component: Chip,
  parameters: {
    layout: 'padded',
    docs: {
      decisionsFrom: 'components/ui/chip.tsx',
      description: {
        component: [
          'Algo **elegido que se puede sacar**: los códigos CDT de una excepción o de un consentimiento, un filtro aplicado. Celeste (`dash-count-bg`) con texto azul y la ✕ a la derecha.',
          '',
          'No es un estado (eso es *Pills*, con borde y color semántico) ni una cuenta (*Counts*). Reemplaza los chips que cada pantalla dibujaba a mano: el gris de Manage Exceptions, el celeste de Consents y el de los filtros de Treatment.',
          '',
          '**Probalo:** en *Playground* cambiá el texto, sacá la ✕ o deshabilitalo desde *Controls*.',
        ].join('\n'),
      },
    },
  },
  args: { children: 'D0140 - Limited oral evaluation – problem focused', removeLabel: 'Remove D0140', disabled: false },
  argTypes: {
    children: { control: 'text', description: 'Lo elegido. Si no entra, termina en “…”.' },
    removeLabel: { control: 'text', description: 'aria-label de la ✕.' },
    disabled: { control: 'boolean', description: 'Se ve al 60% y la ✕ no responde.' },
    onRemove: { table: { disable: true } },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

function Lista() {
  const [codigos, setCodigos] = useState(['D0140 - Limited oral evaluation – problem focused', 'D1110 - Prophylaxis – adult', 'D2740 - Crown – porcelain/ceramic'])
  return (
    <div className="flex flex-wrap gap-2">
      {codigos.map((c) => <Chip key={c} removeLabel={`Remove ${c.split(' ')[0]}`} onRemove={() => setCodigos(codigos.filter((x) => x !== c))}>{c}</Chip>)}
      {codigos.length === 0 && <span className="text-[13px] text-ink-faint">No procedures added.</span>}
    </div>
  )
}

export const Playground: Story = {
  render: (args) => <Chip {...args} onRemove={() => {}} />,
}

export const Parts: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[
          ['Texto', 'Lo elegido, 12px Medium azul; se corta con “…” si no entra.', 'span'],
          ['✕', 'Saca el chip; lleva su aria-label (Remove D0140). Sin onRemove no aparece.', 'button'],
          ['Fondo', 'Celeste, sin borde: lo distingue de una Pill de estado.', 'span'],
        ]} />
      </Bloque>
      <Bloque titulo="Chip vs Pill">
        <Muestras>
          <ConRotulo rotulo="Chip: elegido, se saca"><Chip onRemove={() => {}} removeLabel="Remove D0140">D0140</Chip></ConRotulo>
          <ConRotulo rotulo="Pill: estado"><Pill tone="info">Age limitation</Pill></ConRotulo>
        </Muestras>
      </Bloque>
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="States">
        <Muestras>
          <ConRotulo rotulo="Default"><Chip onRemove={() => {}} removeLabel="Remove D1110">D1110 - Prophylaxis – adult</Chip></ConRotulo>
          <ConRotulo rotulo="Read only (sin ✕)"><Chip>D1110</Chip></ConRotulo>
          <ConRotulo rotulo="Disabled"><Chip disabled onRemove={() => {}} removeLabel="Remove D1110">D1110 - Prophylaxis – adult</Chip></ConRotulo>
          <ConRotulo rotulo="Long text"><div className="w-56"><Chip onRemove={() => {}} removeLabel="Remove D0150">D0150 - Comprehensive oral evaluation – new or established patient</Chip></div></ConRotulo>
        </Muestras>
      </Bloque>
      <Bloque titulo="In a list" nota="Como en Manage Exceptions › Select Procedure: tocá la ✕ para sacar uno.">
        <Lista />
      </Bloque>
    </Lienzo>
  ),
}

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Measures">
        <Tabla encabezado={['Piece', 'Value']}>
          <tr><td className="font-semibold">Alto</td><td className="tabular-nums">24px (h-6), radio completo</td></tr>
          <tr><td className="font-semibold">Padding</td><td className="tabular-nums">10px a la izquierda; 4px a la derecha con ✕, 10px sin ella</td></tr>
          <tr><td className="font-semibold">Texto</td><td className="tabular-nums">12px Medium</td></tr>
          <tr><td className="font-semibold">✕</td><td className="tabular-nums">área 16px, ícono 12px; hover blanco</td></tr>
          <tr><td className="font-semibold">Entre chips</td><td className="tabular-nums">gap 6–8px, flex-wrap</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Piece', 'Token']}>
          <tr><td className="font-semibold">Fondo</td><td><Token nombre="dash-count-bg" /></td></tr>
          <tr><td className="font-semibold">Texto y ✕</td><td><Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Hover de la ✕</td><td><Token nombre="white" /></td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
