import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { ExtraOralDiagram } from './ExtraOralDiagram'
import { EXTRAORAL_REGIONS, type ExtraOralRegion } from './data'
import { Bloque, Lienzo, Tabla } from '@/design-system/kit'

const meta = {
  title: 'Components/Clinical/Dental/ExtraOralDiagram',
  component: ExtraOralDiagram,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'El gráfico de Extraoral: cuatro vistas de cabeza -perfil derecho, frente, nuca, perfil izquierdo, el orden de una foto clínica- con regiones clickeables. Dibujado como SVG propio, no una foto: mismo criterio que el `Odontogram` ("no una foto", clinical-mode.md).',
          '',
          '**Siete regiones, confirmadas en grabaciones de pantalla de red.dev** (Julián, 2026-10-24): Scalp, Right/Left Forehead, Right/Left Eye, Right/Left Posterior Head. Una región puede dibujarse en más de una vista -Scalp en el frente, por ejemplo- y las dos marcan juntas. **Los límites son una aproximación**: no hay fuente vectorial, se estimaron sobre capturas y video.',
          '',
          '**Dos clicks, no uno**: una región sin nada guardado es sólo un hover; clickearla la suma a "pending" (ámbar, lo que se está por cargar); si ya tiene una condition activa guardada queda en verde. Multi-selección: cada click alterna esa región sola, las demás siguen como estaban.',
          '',
          '**Probalo:** clickeá una región en cualquier vista.',
        ].join('\n'),
      },
    },
  },
  args: { pending: [], active: [], onToggle: () => {} },
  argTypes: { pending: { table: { disable: true } }, active: { table: { disable: true } }, onToggle: { table: { disable: true } } },
} satisfies Meta<typeof ExtraOralDiagram>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: function Render(args) {
    const [pending, setPending] = useState<ExtraOralRegion[]>(args.pending)
    return (
      <ExtraOralDiagram
        {...args} pending={pending}
        onToggle={(r) => setPending((prev) => (prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]))}
      />
    )
  },
}

/* Las siete regiones y en qué vista aparece cada una. */
export const Parts: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Regions" nota="Clickeable en cualquier vista donde se dibuje; todas sus formas marcan juntas.">
        <Tabla encabezado={['Region', 'Views']} minimo={420}>
          <tr><td className="font-semibold">Scalp</td><td>Front, right profile, left profile</td></tr>
          <tr><td className="font-semibold">Right Forehead</td><td>Front, right profile</td></tr>
          <tr><td className="font-semibold">Left Forehead</td><td>Front, left profile</td></tr>
          <tr><td className="font-semibold">Right Eye</td><td>Front</td></tr>
          <tr><td className="font-semibold">Left Eye</td><td>Front</td></tr>
          <tr><td className="font-semibold">Right Posterior Head</td><td>Right profile, back</td></tr>
          <tr><td className="font-semibold">Left Posterior Head</td><td>Left profile, back</td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <div className="grid gap-6">
        <Bloque titulo="Default" nota="Nada elegido ni guardado.">
          <ExtraOralDiagram pending={[]} active={[]} onToggle={() => {}} />
        </Bloque>
        <Bloque titulo="Pending" nota="Elegidas ahora, antes de guardar (ámbar) — Add Condition abierto.">
          <ExtraOralDiagram pending={['Scalp', 'Right Forehead']} active={[]} onToggle={() => {}} />
        </Bloque>
        <Bloque titulo="Active" nota="Con una condition ya guardada (verde).">
          <ExtraOralDiagram pending={[]} active={['Right Posterior Head', 'Left Eye'] as ExtraOralRegion[]} onToggle={() => {}} />
        </Bloque>
      </div>
    </Lienzo>
  ),
}

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Colors" nota="Pending: warn-fg al 35% (45% en hover). Active: dash-ok-fg al 30% (40% en hover) — el mismo verde de un finding Active. Trazo de las regiones: line-strong.">
        <Tabla encabezado={['Token', 'Where']} minimo={420}>
          <tr><td className="font-semibold">warn-fg / 35%</td><td>Región pending</td></tr>
          <tr><td className="font-semibold">dash-ok-fg / 30%</td><td>Región active</td></tr>
          <tr><td className="font-semibold">surface-muted</td><td>Cabeza, hombros, orejas</td></tr>
          <tr><td className="font-semibold">line</td><td>Trazo de la cabeza</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Rules" nota={`Siete regiones (${EXTRAORAL_REGIONS.join(', ')}). Cada forma es un botón real (role="button", tabIndex, Enter/Espacio): se puede marcar sin mouse.`}>
        <div />
      </Bloque>
    </Lienzo>
  ),
}
