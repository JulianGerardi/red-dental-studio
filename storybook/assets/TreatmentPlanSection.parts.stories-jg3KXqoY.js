import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { CASOS, NO_ASIGNADOS } from '@/data/treatment-plan'
import {
  Dialogo, DialogoBorrarCaso, DialogoCompletar, DialogoMover, DialogoNuevoGrupo, OpcionRadio, Rail, TablaProcedimientos, VistaCaso,
} from './TreatmentPlanSection'

const meta = {
  title: 'Components/Clinical/TreatmentPlanSection parts',
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 560 } } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const BaseDialog: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => <Dialogo titulo="Discard case" bajada={['This action can be undone.']} texto={["Are you sure you want to discard this case?"]} onConfirm={() => {}} onClose={() => {}} confirmar="Discard" />,
}
export const MoveDialog: Story = { parameters: { layout: 'fullscreen' }, render: () => <DialogoMover onClose={() => {}} /> }
export const NewGroupDialog: Story = { parameters: { layout: 'fullscreen' }, render: () => <DialogoNuevoGrupo onClose={() => {}} /> }
export const CompleteDialog: Story = { parameters: { layout: 'fullscreen' }, render: () => <DialogoCompletar onClose={() => {}} /> }
export const DeleteCaseDialog: Story = { parameters: { layout: 'fullscreen' }, render: () => <DialogoBorrarCaso onConfirm={() => {}} onClose={() => {}} /> }

/* Opción de un grupo de radios dentro de los diálogos: elegida y sin elegir. */
export const RadioOption: Story = {
  render: () => (
    <div className="flex w-[380px] flex-col gap-2">
      <OpcionRadio on titulo="Move all procedures" detalle="Every procedure of this case goes to the destination." onClick={() => {}} />
      <OpcionRadio on={false} titulo="Copy procedures" detalle="Keep them in this case too." onClick={() => {}} />
    </div>
  ),
}

export const CaseRail: Story = {
  render: () => <div className="w-[300px]"><Rail vista="caso" casoId={CASOS[0].id} favoritos={[CASOS[0].id]} onFavorito={() => {}} onUnassigned={() => {}} onCaso={() => {}} /></div>,
}

function ConSeleccion() {
  const [sel, setSel] = useState<string[]>([NO_ASIGNADOS[0].id])
  return <TablaProcedimientos filas={NO_ASIGNADOS.slice(0, 5)} acciones seleccion={sel} onSeleccion={setSel} onAccion={() => {}} onCompletar={() => {}} />
}
export const ProceduresTable: Story = { render: () => <ConSeleccion /> }
export const ProceduresTableReadOnly: Story = { render: () => <TablaProcedimientos filas={NO_ASIGNADOS.slice(0, 5)} onAccion={() => {}} /> }

export const CaseView: Story = {
  render: () => <VistaCaso caso={CASOS[0]} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onGrupo={() => {}} onCompletar={() => {}} />,
}
`})))()}export{n,i as r,r as t};