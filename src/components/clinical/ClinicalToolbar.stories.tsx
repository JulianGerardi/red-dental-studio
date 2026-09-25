import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { Juego, Pestana } from '@/data/clinical-mode'
import { ClinicalToolbar } from './ClinicalToolbar'

const meta = {
  title: 'Components/Clinical/ClinicalToolbar',
  component: ClinicalToolbar,
  parameters: { layout: 'padded' },
  args: { juego: 'Exams', onJuego: () => {}, pestana: 'Vitals' as Pestana, onPestana: () => {} },
} satisfies Meta<typeof ClinicalToolbar>

export default meta
type Story = StoryObj<typeof meta>

function Demo() {
  const [juego, setJuego] = useState<Juego>('Exams')
  const [pestana, setPestana] = useState<Pestana>('Vitals' as Pestana)
  return <ClinicalToolbar juego={juego} onJuego={setJuego} pestana={pestana} onPestana={setPestana} />
}

export const Default: Story = { render: () => <Demo /> }
