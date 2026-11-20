import type { Meta, StoryObj } from '@storybook/react-vite'
import { OpcionCondicion, OpcionDiagnostico, OpcionFinding, OpcionProcedimiento } from './OpcionesVinculo'
import { PROCEDURES } from './data'

/* Las cards de resultado de los buscadores de New Procedure / New Condition (SearchPicker). Decisiones en
   design-reference/figma/modulos/clinical-mode.md (2026-10-20 y 2026-10-24). */
const meta = {
  title: 'Components/Clinical/Dental/OpcionesVinculo',
  parameters: {
    layout: 'padded',
    docs: {
      jira: ['CON-2083', 'CON-1751'],
      description: {
        component: 'Lo que muestra cada resultado de los buscadores de *New Procedure* y *New Condition* (CON-2083, CON-1751): un **finding** para vincular (condición, área, estado y fecha), un **diagnóstico** (código y descripción), una **condición** (con su grupo) y un **procedimiento** (código CDT y nombre). Van adentro de [SearchPicker](/docs/components-ui-searchpicker--docs).\n\n**Probalo:** cada story es una card; *WithoutDetail* muestra las que no traen el dato opcional.',
      },
    },
  },
  decorators: [(Story) => <div className="flex w-[420px] max-w-full flex-col gap-2 rounded-xl bg-white p-3"><Story /></div>],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const FindingOption: Story = {
  render: () => (
    <>
      <OpcionFinding finding={{ condition: 'chronic enamel dental caries', area: 'Tooth 3', surfaces: ['O', 'DB'], status: 'Active', date: 'May 14, 2026', examen: 'Dental assessment' }} />
      <OpcionFinding finding={{ condition: 'oral candidiasis', area: 'Soft palate', surfaces: [], status: 'Active', date: 'May 14, 2026', examen: 'Intraoral' }} />
    </>
  ),
}
export const DiagnosisOption: Story = { render: () => <OpcionDiagnostico code="K05.31" descripcion="Chronic periodontitis, localized" detalle="Periodontal" /> }
export const ConditionOption: Story = { render: () => <OpcionCondicion nombre="Abscess (morphologic abnormality)" grupo="Soft tissue" /> }
export const ProcedureOption: Story = { render: () => <>{PROCEDURES.slice(0, 3).map((p) => <OpcionProcedimiento key={p.code} procedure={p} />)}</> }

/* Sin los datos opcionales (estado vacío de esos renglones). */
export const WithoutDetail: Story = {
  render: () => (
    <>
      <OpcionDiagnostico code="K02.9" descripcion="Dental caries, unspecified" />
      <OpcionCondicion nombre="Generally unwell" />
    </>
  ),
}
