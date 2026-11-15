import type { Meta, StoryObj } from '@storybook/react-vite'
import { esperar, pulsar, secuencia } from '@/design-system/play'
import { ProblemListFlotante } from './ProblemListFlotante'

const meta = {
  title: 'Components/Clinical/ProblemListFlotante',
  component: ProblemListFlotante,
  parameters: {
    layout: 'fullscreen',
    docs: {
      jira: ['CON-3114', 'CON-2832', 'CON-2833'],
      story: { inline: false, iframeHeight: 640 },
      description: {
        component: 'El botón **View Problem List** de la barra de acciones del Overview de Clinical Mode y la tabla que abre flotando (clinical-mode.md, 2026-10-29): *Problem List* con los hallazgos de todos los exámenes y *Procedures* con los procedimientos del paciente (CON-2832, CON-2833). Es ancha para que la tabla entre entera y scrollea adentro hasta el borde de la pantalla.\n\n**Cómo se usa:** con `procedimientoInicial` abre ya en Procedures con esa fila desplegada: es el link del Ledger a un procedimiento (`?procedure=`).\n\n**Probalo:** en *Default* tocá el botón; *Open* la deja abierta y *OpenOnProcedure* llega como desde el Ledger.',
      },
    },
  },
  decorators: [(Story) => <div className="bg-page-background min-h-[600px] p-4"><Story /></div>],
} satisfies Meta<typeof ProblemListFlotante>

export default meta
type Story = StoryObj<typeof meta>

/* Cerrada: sólo el botón. */
export const Default: Story = {}
/* Abierta (el botón queda marcado: selected). */
export const Open: Story = { play: secuencia(pulsar(/view problem list/i), esperar(/problem list/i)) }
/* Desde el Ledger: abre en Procedures con la fila del procedimiento. */
export const OpenOnProcedure: Story = { args: { procedimientoInicial: 'D4341' } }
