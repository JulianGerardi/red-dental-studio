import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pencil } from 'lucide-react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { CASOS, NO_ASIGNADOS } from '@/data/treatment-plan'
import { esperar, pulsar, secuencia } from '@/design-system/play'
import {
  Dialogo, DialogoBorrarCaso, DialogoCompletar, DialogoMover, DialogoNuevoGrupo, OpcionRadio, Rail, TablaProcedimientos, VistaCaso, EstadoConsentimiento, AccionCaso,
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
  render: () => <VistaCaso caso={CASOS[0]} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />,
}

/* Planeado, esperando ser presentado: lápiz, ojo y Move to deshabilitados con su tooltip; la categoría queda como texto. */
export const CaseViewPending: Story = {
  render: () => <VistaCaso caso={{ ...CASOS[0], estado: 'Pending' }} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />,
}

/* Presentado: sólo el ojo de vista previa se habilita. */
export const CaseViewPresented: Story = {
  render: () => <VistaCaso caso={{ ...CASOS[0], estado: 'Presented' }} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />,
}

/* Aceptado: lápiz, ojo y Move to deshabilitados con su tooltip, y la categoría como texto. */
export const CaseViewAccepted: Story = {
  render: () => <VistaCaso caso={{ ...CASOS[0], estado: 'Accepted' }} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />,
}

/* Estado del consentimiento de cada procedimiento del caso (columna Consent). */
export const ConsentStatus: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(['Signed', 'Pending', 'Not sent', 'Expired'] as const).map((e) => <EstadoConsentimiento key={e} estado={e} />)}
    </div>
  ),
}

/* El caso plegado: el encabezado conserva el estado y el total, y la categoría, las notas y las fechas se esconden. */
export const CaseViewCollapsed: Story = {
  render: () => <VistaCaso caso={CASOS[0]} favorito={false} onFavorito={() => {}} onDialogo={() => {}} onMover={() => {}} onCompletar={() => {}} />,
  play: secuencia(pulsar(/collapse case/i), esperar(/^total:/i)),
}

/* Ícono de acción del encabezado del caso: habilitado en su estado; fuera de él, deshabilitado con el tooltip que dice cuándo se usa. */
export const CaseAction: Story = {
  render: () => (
    <TooltipProvider delayDuration={150}>
      <div className="flex items-center gap-6 text-ink-medium">
        <AccionCaso habilitado tooltip="Rename case" tooltipDeshabilitado="Only while planning" aria-label="Rename case"><Pencil className="size-4" /></AccionCaso>
        <AccionCaso habilitado={false} tooltip="Rename case" tooltipDeshabilitado="Only while planning" aria-label="Rename case (disabled)"><Pencil className="size-4" /></AccionCaso>
      </div>
    </TooltipProvider>
  ),
}
