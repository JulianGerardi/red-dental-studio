import type { Meta, StoryObj } from '@storybook/react-vite'
import { DIRECTORIO, PersonaSeleccionada } from './AddRelationship'

const meta = { title: 'Pages/Parts/Add relationship', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const SelectedPerson: Story = { render: () => <div className="w-[420px]"><PersonaSeleccionada p={DIRECTORIO[0]} /></div> }
