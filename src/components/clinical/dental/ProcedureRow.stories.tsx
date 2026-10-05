import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { CajaIcono, ConAyuda, ConditionRow, ESTADOS_FILA, ProcedureRow, type EstadoFila } from './ProcedureRow'
import { NOMBRE_ALCANCE, ScopeIcon } from './ScopeIcons'
import { TooltipProvider } from '@/components/ui/tooltip'
import { PROCEDURES, SCOPES, type ProcedureScope } from './data'
import { Bloque, ConRotulo, Lienzo, Muestras, Tabla, useMedidas } from '@/design-system/kit'

const D0120 = PROCEDURES.find((p) => p.code === 'D0120')!
const D2140 = PROCEDURES.find((p) => p.code === 'D2140')!

const meta = {
  title: 'Components/Clinical/Dental/ProcedureRow',
  component: ProcedureRow,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'La fila para elegir un procedimiento en New Procedure / New Condition (Figma *Design system · 2.0*, 535:2822): el código, la descripción, su área y un botón por alcance (diente, superficie, cuadrante, arcada) con los íconos del design system. La condición o diagnóstico (535:2307) va con `ConditionRow`.',
          '',
          '**Estados:** *default*, *selected* (borde azul), *inactive* (gris azulado), *error* (rojo) y *disabled* (apagada, no se elige).',
          '',
          '**Probalo:** en *Playground* cambiá el estado desde *Controls* y elegí un alcance.',
        ].join('\n'),
      },
    },
  },
  args: { procedure: D0120, estado: 'default', scopes: SCOPES.filter((s) => s !== 'Surface') },
  argTypes: {
    estado: { control: 'inline-radio', options: ESTADOS_FILA, description: 'Cómo se ve la fila.' },
    procedure: { table: { disable: true } },
    scopes: { table: { disable: true } },
    scope: { table: { disable: true } },
  },
} satisfies Meta<typeof ProcedureRow>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: function Render(args) {
    const [scope, setScope] = useState<ProcedureScope | null>(null)
    return <div className="max-w-[440px]"><ProcedureRow {...args} scope={scope} onScope={setScope} /></div>
  },
}

/* Las piezas: el cuadrado de cada ícono en los cinco estados, y la fila de condición. */
export const Parts: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Icons" nota="Diente, superficie, cuadrante y arcada, en blanco sobre el color del estado. Cada uno con su tooltip (ConAyuda): pasá el mouse.">
        <TooltipProvider delayDuration={200}>
          <Tabla encabezado={['State', ...SCOPES]} minimo={420}>
            {ESTADOS_FILA.map((e) => (
              <tr key={e}>
                <td className="font-semibold">{e}</td>
                {SCOPES.map((s) => <td key={s}><ConAyuda texto={NOMBRE_ALCANCE[s]}><span className="inline-flex"><CajaIcono estado={e}><ScopeIcon scope={s} /></CajaIcono></span></ConAyuda></td>)}
              </tr>
            ))}
          </Tabla>
        </TooltipProvider>
      </Bloque>
      <Bloque titulo="Condition" nota="Una condición o diagnóstico: el nombre y el diente.">
        <div className="max-w-[420px]"><ConditionRow label="Chronic enamel dental caries" /></div>
      </Bloque>
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <div className="grid gap-6 md:grid-cols-2">
        <Bloque titulo="Procedure">
          <div className="flex flex-col gap-3">
            {ESTADOS_FILA.map((e) => <ConRotulo key={e} rotulo={e}><ProcedureRow procedure={D0120} estado={e} scopes={SCOPES.filter((s) => s !== 'Surface')} /></ConRotulo>)}
            <ConRotulo rotulo="selected, on surface"><ProcedureRow procedure={D2140} estado="selected" scopes={SCOPES} scope="Surface" /></ConRotulo>
          </div>
        </Bloque>
        <Bloque titulo="Condition">
          <div className="flex flex-col gap-3">
            {ESTADOS_FILA.map((e) => <ConRotulo key={e} rotulo={e}><ConditionRow label="Chronic enamel dental caries" estado={e} /></ConRotulo>)}
          </div>
        </Bloque>
      </div>
    </Lienzo>
  ),
}

function FilaMedida({ estado }: { estado: EstadoFila }) {
  const { ref, m } = useMedidas()
  return (
    <tr>
      <td className="font-semibold">{estado}</td>
      <td><div ref={ref} className="w-[380px]"><ProcedureRow procedure={D0120} estado={estado} scopes={['Tooth', 'Quadrant', 'Arch']} /></div></td>
      <td className="tabular-nums">{m?.alto}</td>
      <td className="tabular-nums">{m?.padding}</td>
      <td className="tabular-nums">{m?.radio}</td>
    </tr>
  )
}

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Row" nota="Medidas leídas de la fila dibujada: borde de 1, padding 12 × 11, radio 6, íconos de 23 con 8 entre sí.">
        <Tabla encabezado={['State', 'Sample', 'Height', 'Padding', 'Radius']} minimo={720}>
          {(['default', 'selected'] as const).map((e) => <FilaMedida key={e} estado={e} />)}
        </Tabla>
      </Bloque>
      <Muestras>
        {SCOPES.map((s) => <ConRotulo key={s} rotulo={s}><CajaIcono estado="default"><ScopeIcon scope={s} /></CajaIcono></ConRotulo>)}
      </Muestras>
    </Lienzo>
  ),
}
