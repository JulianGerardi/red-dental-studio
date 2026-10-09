import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { AssignmentsCount, AssignmentsDrawer, TIPOS_ASIGNACION, asignacionesDe, totalAsignaciones } from './Assignments'
import { Bloque, Lienzo, Muestra, Muestras, Tabla, TablaPartes, Token } from '@/design-system/kit'
import { ARANCELES, ASEGURADORAS, PLANES } from '@/data/finanzas'

type Args = { feeSchedule: string; vista: 'Count' | 'Drawer' }

const meta = {
  title: 'Components/Finance/Assignments',
  parameters: {
    layout: 'padded',
    docs: {
      decisionsFrom: 'components/finance/Assignments.tsx',
      description: {
        component: [
          'La columna **Assignments** de la tabla de Fee Schedules (pedido de Julián; no está en red.dev): a cuántas entidades está linkeado directamente un fee schedule.',
          '',
          '- **AssignmentsCount**: el total. Al pasar el mouse o al tocarlo se abre el desglose (Patients, Carriers, Providers, Locations) con *View assignments*. Con 0 queda en gris y no abre nada.',
          '- **AssignmentsDrawer** (*View assignments*, también desde el menú de la fila): la lista de cada tipo con link a su ficha. Para cambiar una asignación se edita esa ficha.',
          '',
          'Los carriers salen de los planes que usan el fee schedule como *Max Allowable Amount Fee Schedule* o en *Fee Schedule By Location*; el resto son asignaciones directas.',
          '',
          '**Probalo:** en *Playground* pasá el mouse por el número o elegí otro fee schedule.',
        ].join('\n'),
      },
    },
  },
  args: { feeSchedule: 'PPO Premium Plan', vista: 'Count' },
  argTypes: {
    feeSchedule: { control: 'select', options: ARANCELES.map((a) => a.nombre), description: 'De qué fee schedule.' },
    vista: { control: 'inline-radio', options: ['Count', 'Drawer'], description: 'El número o el drawer.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>

const de = (nombre: string) => ARANCELES.find((a) => a.nombre === nombre) ?? ARANCELES[0]
const grupos = (nombre: string) => asignacionesDe(de(nombre), PLANES, ASEGURADORAS)

function Contador({ nombre }: { nombre: string }) {
  const [drawer, setDrawer] = useState(false)
  return (
    <>
      <AssignmentsCount asignaciones={grupos(nombre)} onVer={() => setDrawer(true)} />
      {drawer && <AssignmentsDrawer arancel={de(nombre)} asignaciones={grupos(nombre)} onClose={() => setDrawer(false)} />}
    </>
  )
}

export const Playground: Story = {
  render: ({ feeSchedule, vista }) => vista === 'Count'
    ? <div className="p-6"><Contador key={feeSchedule} nombre={feeSchedule} /></div>
    : <AssignmentsDrawer arancel={de(feeSchedule)} asignaciones={grupos(feeSchedule)} onClose={() => {}} />,
}

export const Parts: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[
          ['Número', 'El total, azul con subrayado punteado: se puede consultar.', 'button'],
          ['Desglose', `${TIPOS_ASIGNACION.join(', ')} con su ícono y cantidad; abre con hover o clic, cierra al salir, con Escape o clic afuera.`, 'Popover'],
          ['View assignments', 'Abre el drawer.', 'button'],
          ['Drawer', 'Una sección por tipo; cada uno con link a su ficha y un detalle (el plan, el cargo, la dirección).', 'ModalShell + DrawerSection'],
        ]} />
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
          {['PPO Premium Plan', 'UCR - Red', 'Aetna 2026', 'Cigna DPPO 2027'].map((n) => (
            <Muestra key={n} titulo={totalAsignaciones(grupos(n)) ? `${n} · ${totalAsignaciones(grupos(n))}` : `${n} · Empty`} nota={totalAsignaciones(grupos(n)) ? 'Hover o clic: desglose.' : 'Sin asignaciones: 0 en gris, sin desglose.'}>
              <Contador nombre={n} />
            </Muestra>
          ))}
        </Muestras>
      </Bloque>
    </Lienzo>
  ),
}

export const Drawer: Story = {
  parameters: { layout: 'fullscreen', controls: { disable: true }, docs: { story: { inline: false, iframeHeight: 640 } } },
  render: () => <AssignmentsDrawer arancel={de('PPO Premium Plan')} asignaciones={grupos('PPO Premium Plan')} onClose={() => {}} />,
}

export const Specs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Lienzo>
      <Bloque titulo="Measures">
        <Tabla encabezado={['Piece', 'Value']}>
          <tr><td className="font-semibold">Número</td><td className="tabular-nums">13px Semibold tabular, 6px a los lados</td></tr>
          <tr><td className="font-semibold">Desglose</td><td className="tabular-nums">240px, se abre 4px debajo; se cierra 150ms después de salir</td></tr>
          <tr><td className="font-semibold">Drawer</td><td className="tabular-nums">sm · 480px, pie con Close</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Colors">
        <Tabla encabezado={['Piece', 'Token']}>
          <tr><td className="font-semibold">Número, links</td><td><Token nombre="dash-blue" /></td></tr>
          <tr><td className="font-semibold">Hover del número</td><td><Token nombre="info-bg" /></td></tr>
          <tr><td className="font-semibold">0 y tipos vacíos</td><td><Token nombre="ink-faint" /></td></tr>
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
