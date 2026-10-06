import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { LinkedDiagnosisCard, LinkedFindingCard } from './LinkedFindingCard'

const meta = {
  title: 'Components/Clinical/Dental/LinkedFindingCard',
  component: LinkedFindingCard,
  args: { finding: { id: 'F-1', condition: 'chronic enamel dental caries', area: 'Tooth 3', surfaces: ['O', 'DB'], date: 'May 12, 2026', status: 'Active' }, linked: false, onToggle: () => {} },
  decorators: [(Story) => <div className="w-[360px]"><Story /></div>],
} satisfies Meta<typeof LinkedFindingCard>

export default meta
type Story = StoryObj<typeof meta>

function Demo(args: React.ComponentProps<typeof LinkedFindingCard>) {
  const [linked, setLinked] = useState(false)
  return <LinkedFindingCard {...args} linked={linked} onToggle={setLinked} />
}

export const Default: Story = { render: (args) => <Demo {...args} /> }

/* Sin superficies: sólo el nombre del hallazgo y su zona. */
export const WithoutSurfaces: Story = { args: { finding: { id: 'F-2', condition: 'oral candidiasis', area: 'Soft Palate', surfaces: [], date: 'May 12, 2026', status: 'Active' } }, render: (args) => <Demo {...args} /> }

/* El diagnóstico de Link to diagnosis: sólo código y superficies, sin estado ni fecha. Linked y sin vincular. */
export const Diagnosis: Story = {
  render: () => (
    <div className="flex flex-col gap-2.5">
      <LinkedDiagnosisCard code="K05.31" surfaces={['B', 'MB']} linked onToggle={() => {}} />
      <LinkedDiagnosisCard code="B37.0" surfaces={[]} linked={false} onToggle={() => {}} />
    </div>
  ),
}
