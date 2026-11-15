import type { Meta, StoryObj } from '@storybook/react-vite'
import { CONTADORES } from '@/data/clinical-mode'
import { PROGRESO_INICIAL } from '@/data/workflows'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import { ClinicalNoteDialog, Flotante, ListaContador, OpcionesEncuentro, ResumenWorkflow } from './ClinicalTopBar'

const meta = {
  title: 'Components/Clinical/ClinicalTopBar parts',
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 360 } } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/* El popover flotante que abren los contadores de la barra. */
export const FloatingPopover: Story = {
  render: () => (
    <Flotante titulo="Medications" ancla={new DOMRect(80, 20, 60, 32)} onClose={() => {}}>
      <ListaContador c={CONTADORES[1]} />
    </Flotante>
  ),
}

/* La lista del contador: con elementos y vacía. */
export const CounterListFilled: Story = { render: () => <div className="w-[220px] p-4"><ListaContador c={CONTADORES[1]} /></div> }
export const CounterListEmpty: Story = { render: () => <div className="w-[220px] p-4"><ListaContador c={CONTADORES[0]} /></div> }

/* Lo que abre CC o TR: las respuestas del workflow completo, o el aviso de que el paciente no lo contestó (estado vacío). */
export const BadgeCompleted: Story = { render: () => <div className="w-[300px] p-4"><ResumenWorkflow k="CC" progreso={PROGRESO_INICIAL['chief-complaint']} onAbrir={() => {}} /></div> }
export const BadgeEmpty: Story = { render: () => <div className="w-[300px] p-4"><ResumenWorkflow k="TR" onAbrir={() => {}} /></div> }

/* Al cerrar el encuentro (Figma 4540:27072): firmar la Clinical Note ahora o más tarde. */
export const ClinicalNote: Story = { render: () => <ClinicalNoteDialog open onClose={() => {}} /> }

/* Las opciones del menú del encuentro (CON-1612; clinical-mode.md, 2026-11-13): en curso ofrece Pause Encounter y
   Discharge Patient; en pausa, retomarlo. */
const menuEncuentro = (estado: 'sinEmpezar' | 'enCurso' | 'enPausa') => (
  <div className="h-40 p-4">
    <RowActionsMenu label="Encounter options" abierto>
      <OpcionesEncuentro estado={estado} onCambiar={() => {}} onCompletar={() => {}} />
    </RowActionsMenu>
  </div>
)
export const EncounterOptionsInProgress: Story = { render: () => menuEncuentro('enCurso') }
export const EncounterOptionsPaused: Story = { render: () => menuEncuentro('enPausa') }
