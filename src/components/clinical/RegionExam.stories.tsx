import type { Meta, StoryObj } from '@storybook/react-vite'
import { esperar, pulsar, secuencia } from '@/design-system/play'
import { ExamFindingsProvider } from './ExamLayout'
import { RegionExam, RegionExamInterno } from './RegionExam'
import { IntraOralDiagram } from './dental/IntraOralDiagram'
import type { IntraOralRegion } from './dental/data'

/* El examen por región que comparten Extraoral e Intraoral. Decisiones en
   design-reference/figma/modulos/clinical-mode.md (2026-10-24 y 2026-10-28). */
const meta = {
  title: 'Components/Clinical/RegionExam',
  parameters: {
    layout: 'padded',
    docs: {
      jira: ['CON-881', 'CON-882', 'CON-810', 'CON-2083'],
      story: { inline: false, iframeHeight: 720 },
      description: {
        component: [
          'El examen que carga hallazgos **por región** en vez de por diente: lo usan Extraoral (CON-881, CON-810) e Intraoral (CON-882). Recibe el nombre del examen y el gráfico (`diagrama`), y pone las acciones y el panel de Findings de `ExamLayout`.',
          '',
          '**Cómo se usa:** se toca una región del gráfico -queda en ámbar- y recién ahí *Add Condition* abre el drawer con esa región puesta. Sin región elegida no se carga nada (clinical-mode.md, 2026-10-28). Al guardar, la región queda en verde y el finding va a la Problem List con el nombre del examen.',
          '',
          '**Probalo:** en *Default* tocá *Soft Palate* y después *Add Condition*. *WithProvider* es la misma pieza montada como en Clinical Mode, con los findings compartidos.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>
const diagrama = (p: { pending: IntraOralRegion[]; active: IntraOralRegion[]; onToggle: (r: IntraOralRegion) => void }) => <IntraOralDiagram {...p} />

/* Suelto: pone su propio provider de findings. */
export const Default: Story = { render: () => <RegionExam<IntraOralRegion> examen="Intraoral" diagrama={diagrama} /> }

/* Una región elegida (selected): queda en ámbar hasta abrir el drawer. */
export const RegionSelected: Story = { ...Default, play: secuencia(pulsar(/^Soft Palate$/i), esperar(/add condition/i)) }

/* Como en Clinical Mode: el provider ya está puesto y el examen usa los findings compartidos. */
export const WithProvider: Story = { render: () => <ExamFindingsProvider><RegionExamInterno<IntraOralRegion> examen="Intraoral" diagrama={diagrama} /></ExamFindingsProvider> }
