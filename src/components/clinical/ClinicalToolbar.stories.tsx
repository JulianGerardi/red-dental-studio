import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { Pestana } from '@/data/clinical-mode'
import { ClinicalToolbar } from './ClinicalToolbar'

const meta = {
  title: 'Components/Clinical/ClinicalToolbar',
  component: ClinicalToolbar,
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 720 } } },
  args: { pestana: 'Vitals' as Pestana, onPestana: () => {} },
} satisfies Meta<typeof ClinicalToolbar>

export default meta
type Story = StoryObj<typeof meta>

function Demo() {
  const [pestana, setPestana] = useState<Pestana>('Vitals')
  return <ClinicalToolbar pestana={pestana} onPestana={setPestana} />
}

/* En los exámenes, "Exams ›" despliega los registros. */
export const Default: Story = { render: () => <Demo /> }

/* Con un registro abierto, las pestañas son los registros y "Exams" vuelve a los exámenes. */
export const RecordSelected: Story = {
  args: { pestana: 'Treatment Plan' },
  render: (args) => <ClinicalToolbar {...args} />,
}
