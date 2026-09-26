import type { Meta, StoryObj } from '@storybook/react-vite'
import { ToolbarFormato } from './Consents'

const meta = { title: 'Pages/Parts/Consents', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/* Toolbar de formato: decorativo, avisa que el formato enriquecido no está disponible. */
export const FormattingToolbar: Story = { render: () => <div className="w-[480px]"><ToolbarFormato /></div> }
