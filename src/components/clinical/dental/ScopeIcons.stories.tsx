import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArchIcon, ScopeIcon } from './ScopeIcons'
import { CajaIcono } from './ProcedureRow'
import { SCOPES } from './data'

/* Los íconos son blancos (design system 2.0): se muestran sobre su cuadrado, como en las filas. */
const meta = {
  title: 'Components/Clinical/Dental/ScopeIcon',
  component: ScopeIcon,
  args: { scope: 'Tooth' },
  argTypes: { scope: { control: 'select', options: SCOPES } },
} satisfies Meta<typeof ScopeIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: (args) => <CajaIcono estado="default"><ScopeIcon {...args} /></CajaIcono> }
export const AllScopes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {SCOPES.map((s) => <span key={s} className="flex items-center gap-1.5 text-sm"><CajaIcono estado="default"><ScopeIcon scope={s} /></CajaIcono> {s}</span>)}
    </div>
  ),
}

/* El ícono de arcada del design system 2.0. */
export const ArchGlyph: Story = { render: () => <CajaIcono estado="default"><ArchIcon /></CajaIcono> }
