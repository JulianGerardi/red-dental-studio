import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { CASOS } from '@/data/treatment-plan'
import { estimacionesIniciales, type Estimacion } from '@/data/estimaciones'
import { Bloque, Lienzo, Muestra, TablaPartes } from '@/design-system/kit'
import { EstimateDetails, PrototypeControls, situacionDe } from './EstimateDetails'

/* Playground, Parts y States de Estimate details. Decisiones en design-reference/figma/modulos/clinical-mode.md
   (2026-10-29, "Estimate details desde el Total Amount"). */

const ESTADOS: Estimacion['estado'][] = ['al-dia', 'desactualizada', 'sin-calcular', 'calculando', 'fallo']
const ROTULO: Record<Estimacion['estado'], string> = { 'al-dia': 'Up to date', desactualizada: 'Update needed', 'sin-calcular': 'Not calculated', calculando: 'Calculating', fallo: 'Update failed' }
const caso = CASOS[0]
const base = estimacionesIniciales(CASOS)[caso.id]

type Args = { status: Estimacion['estado']; lockedCase: boolean }

const meta = {
  title: 'Components/Clinical/EstimateDetails',
  parameters: {
    layout: 'fullscreen',
    docs: {
      jira: ['CON-3695', 'CON-1598'],
      story: { inline: false, iframeHeight: 760 },
      description: {
        component: [
          'El detalle de la estimación de un caso: por visita y por procedimiento, cuánto cuesta, cuánto cubre el seguro y cuánto paga el paciente (CON-3695, CON-1598). Se abre desde el **Total amount** de la card del caso o de su encabezado en Treatment Plan.',
          '',
          '**Cómo se usa:** la estimación es una foto. Si el caso cambió después de calcularla queda *Update needed* y ofrece *Update estimate*; sin calcular, *Calculate estimate*; si el cálculo falla, avisa y deja reintentar. Con el caso presentado o cerrado queda bloqueada: se ve y no se recalcula.',
          '',
          '**Probalo:** en *Playground* elegí el estado y si el caso está bloqueado desde *Controls*. *Parts* dice qué hace cada parte y *States* muestra cada situación.',
        ].join('\n'),
      },
    },
  },
  args: { status: 'al-dia', lockedCase: false },
  argTypes: {
    status: { control: 'select', options: ESTADOS, description: 'al-dia · desactualizada (el caso cambió) · sin-calcular · calculando · fallo.' },
    lockedCase: { control: 'boolean', description: 'El caso ya se presentó: la estimación queda de lectura.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>
const sinControles = { layout: 'padded' as const, controls: { disable: true }, docs: { story: { inline: true } } }
const nada = () => {}
const presentado = { ...caso, estado: 'Presented' as const }

export const Playground: Story = {
  render: ({ status, lockedCase }) => (
    <div className="bg-page-background min-h-[720px] p-6">
      <EstimateDetails caso={lockedCase ? presentado : caso} estimacion={{ ...base, estado: status }} onVolver={nada} onCalcular={nada} />
    </div>
  ),
}

function Controles() {
  const [fallar, setFallar] = useState(false)
  return <PrototypeControls situacion={situacionDe(caso, base)} onEscenario={nada} onSimular={nada} fallar={fallar} onFallar={setFallar} />
}

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[
          ['Header', 'Back, el nombre del caso y el estado de la estimación con su descripción.', 'EstimateDetails'],
          ['Totals', 'Los totales del caso: fee, cobertura del seguro, ajustes y lo que paga el paciente.', 'EstimateDetails'],
          ['Visit table', 'Una tabla por visita con sus procedimientos; en celular la primera columna queda fija.', 'EstimateDetails'],
          ['Action', 'Calculate, Update o Retry según la situación; no aparece con el caso bloqueado.', 'EstimateDetails'],
          ['Prototype controls', 'Sólo del prototipo: fuerza un escenario o simula un cambio en el caso para ver cada situación.', 'PrototypeControls'],
        ]} />
      </Bloque>
      <Bloque titulo="Prototype controls"><Controles /></Bloque>
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="States">
        <div className="grid gap-6">
          {ESTADOS.map((e) => (
            <Muestra key={e} titulo={ROTULO[e]} nota={e === 'calculando' ? 'Loading: mientras se calcula.' : e === 'fallo' ? 'Error: el cálculo falló y se puede reintentar.' : e === 'sin-calcular' ? 'Empty: todavía no hay estimación.' : undefined}>
              <EstimateDetails caso={caso} estimacion={{ ...base, estado: e }} onVolver={nada} onCalcular={nada} />
            </Muestra>
          ))}
          <Muestra titulo="Presented / locked" nota="Disabled: con el caso presentado no se recalcula."><EstimateDetails caso={presentado} estimacion={base} onVolver={nada} onCalcular={nada} /></Muestra>
        </div>
      </Bloque>
    </Lienzo>
  ),
}

/* Prototype controls con "Fail next calculation" marcado (checked): el próximo cálculo falla, para ver Update failed. */
export const FailNextCalculationChecked: Story = {
  parameters: sinControles,
  render: () => <PrototypeControls situacion="desactualizada" onEscenario={nada} onSimular={nada} fallar onFallar={nada} />,
}
