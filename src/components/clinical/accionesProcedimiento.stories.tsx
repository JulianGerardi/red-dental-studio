import type { Meta, StoryObj } from '@storybook/react-vite'
import { ESTADOS_PROCEDIMIENTO } from '@/data/clinical-mode'
import { Pill } from '@/components/ui/pill'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import { Bloque, ConRotulo, Lienzo, Muestras, Tabla, TablaPartes } from '@/design-system/kit'
import {
  ACCION, DialogoBorrar, DialogoCambioEstado, DialogoEditar, ItemsAcciones, accionesDe, type ContextoPlan,
} from './accionesProcedimiento'
import { TONO_PROCEDIMIENTO } from './RecordDetail'

/* Las acciones de un procedimiento, iguales en Treatment Plan y en Problem List → Procedures. Decisiones en
   design-reference/figma/modulos/clinical-mode.md (2026-11-11). */

type Args = { status: (typeof ESTADOS_PROCEDIMIENTO)[number]; plan: ContextoPlan }
const CONTEXTOS: ContextoPlan[] = ['sin-plan', 'planificando', 'esperando-consentimiento', 'ejecutable', 'cerrado']
const PROC = { id: 'p1', codigo: 'D2954', nombre: 'Prefabricated post and core in addition to crown', pieza: 19 }

const meta = {
  title: 'Components/Clinical/Procedure actions',
  parameters: {
    layout: 'padded',
    docs: {
      decisionsFrom: 'components/clinical/accionesProcedimiento.tsx',
      jira: ['CON-2833', 'CON-2834', 'CON-2939', 'CON-2835', 'CON-4052'],
      story: { inline: false, iframeHeight: 420 },
      description: {
        component: [
          'El menú ⋮ de un procedimiento y sus diálogos (`@/components/clinical/accionesProcedimiento`). Qué acciones ofrece depende del **estado del procedimiento** y de **en qué está su caso**: mientras se planea o espera el consentimiento, Start y Complete quedan bloqueados y dicen por qué (CON-2833).',
          '',
          '**Cómo se usa:** *Edit* guarda una nota sin cambiar el estado. *Refer*, *Discard* y *Discontinue* piden confirmar (CON-2939). *Delete* pregunta el alcance: sacarlo sólo del caso (queda en Unassigned Items) o borrarlo del paciente.',
          '',
          '**Probalo:** en *Playground* elegí el estado del procedimiento y la situación del plan desde *Controls*: el menú abierto cambia. *Parts* dice qué hace cada pieza y *States* muestra la matriz completa.',
        ].join('\n'),
      },
    },
  },
  args: { status: 'Pending', plan: 'ejecutable' },
  argTypes: {
    status: { control: 'select', options: ESTADOS_PROCEDIMIENTO, description: 'El estado del procedimiento.' },
    plan: { control: 'select', options: CONTEXTOS, description: 'sin-plan: suelto · planificando · esperando-consentimiento · ejecutable: caso aceptado · cerrado.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>
const sinControles = { controls: { disable: true }, docs: { story: { inline: true } } }
const enIframe = { layout: 'fullscreen' as const, controls: { disable: true }, docs: { story: { inline: false, iframeHeight: 520 } } }
const nada = () => {}

export const Playground: Story = {
  render: ({ status, plan }) => (
    <div className="h-72">
      <RowActionsMenu label={`${PROC.codigo}`} abierto>
        <ItemsAcciones grupos={accionesDe(status, plan)} onElegir={nada} />
      </RowActionsMenu>
    </div>
  ),
}

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Parts">
        <TablaPartes partes={[
          ['Menu items', 'Los ítems del ⋮, en grupos con separador. Los bloqueados quedan apagados y su tooltip explica el motivo.', 'ItemsAcciones'],
          ['Edit procedure', 'Guarda la nota del procedimiento.', 'DialogoEditar'],
          ['Status change', 'Confirma Refer, Discard o Discontinue y dice de qué estado a cuál pasa.', 'DialogoCambioEstado'],
          ['Delete', 'Pregunta el alcance: Delete from Tx o del paciente.', 'DialogoBorrar'],
          ['Status pill', 'El color de cada estado del procedimiento.', 'TONO_PROCEDIMIENTO'],
        ]} />
      </Bloque>
      <Bloque titulo="Actions">
        <Tabla encabezado={['Action', 'Label', 'Moves the procedure to']} minimo={480}>
          {(Object.keys(ACCION) as (keyof typeof ACCION)[]).map((a) => (
            <tr key={a}><td className="font-mono text-[12px]">{a}</td><td className="font-semibold">{ACCION[a].label}</td><td>{ACCION[a].a ?? '—'}</td></tr>
          ))}
        </Tabla>
      </Bloque>
      <Bloque titulo="Status pill">
        <Muestras>{ESTADOS_PROCEDIMIENTO.map((e) => <ConRotulo key={e} rotulo={TONO_PROCEDIMIENTO[e]}><Pill tone={TONO_PROCEDIMIENTO[e]}>{e}</Pill></ConRotulo>)}</Muestras>
      </Bloque>
    </Lienzo>
  ),
}

/* Qué ofrece el menú en cada combinación; en gris, lo bloqueado (disabled). */
export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="States" nota="Filas: estado del procedimiento. Columnas: situación del plan. Tachado = bloqueado (disabled).">
        <Tabla encabezado={['Status', ...CONTEXTOS]} minimo={860} arriba>
          {ESTADOS_PROCEDIMIENTO.map((e) => (
            <tr key={e}>
              <td className="font-semibold whitespace-nowrap">{e}</td>
              {CONTEXTOS.map((c) => (
                <td key={c} className="text-[12px]">
                  {accionesDe(e, c).flat().map((i) => <span key={i.accion} className={i.bloqueada ? 'mr-1.5 text-ink-faint line-through' : 'mr-1.5'}>{ACCION[i.accion].label}</span>)}
                </td>
              ))}
            </tr>
          ))}
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}

export const EditProcedure: Story = { parameters: enIframe, render: () => <DialogoEditar procedimiento={PROC} nota="Wait for the core buildup to set." caso="Endodontic Treatment" onClose={nada} onGuardar={nada} /> }
export const ReferProcedure: Story = { parameters: enIframe, render: () => <DialogoCambioEstado accion="refer" procedimiento={PROC} desde="Pending" caso="Endodontic Treatment" onCancel={nada} onConfirm={nada} /> }
export const DiscardProcedure: Story = { parameters: enIframe, render: () => <DialogoCambioEstado accion="discard" procedimiento={PROC} desde="Planned" onCancel={nada} onConfirm={nada} /> }
export const DiscontinueProcedure: Story = { parameters: enIframe, render: () => <DialogoCambioEstado accion="discontinue" procedimiento={PROC} desde="In progress" caso="Endodontic Treatment" onCancel={nada} onConfirm={nada} /> }
export const DeleteProcedure: Story = { parameters: enIframe, render: () => <DialogoBorrar procedimiento={PROC} caso="Endodontic Treatment" onCancel={nada} onConfirm={nada} /> }
