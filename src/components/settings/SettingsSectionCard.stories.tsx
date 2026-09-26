import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlidersHorizontal, UserCog } from 'lucide-react'
import { SettingsSectionCard } from './SettingsSectionCard'
import { SETTINGS_SECTIONS } from '@/data/mock'
import { SETTINGS_ICONS } from '@/pages/Settings'

const meta = {
  title: 'Components/Settings/SettingsSectionCard',
  component: SettingsSectionCard,
  parameters: { layout: 'padded' },
  args: { to: '/settings/accounts', icon: UserCog, title: 'Accounts', description: 'Manage your account and their access.' },
  argTypes: { icon: { control: false } },
  decorators: [(Story) => <div className="bg-page-background rounded-xl p-6"><div className="w-[320px]"><Story /></div></div>],
} satisfies Meta<typeof SettingsSectionCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/* Hover: el borde toma el azul de la marca. */
export const Hover: Story = { parameters: { pseudo: { hover: true } } }

/* La portada de Settings: una card por sección. */
export const Grid: Story = {
  decorators: [(Story) => <div className="bg-page-background rounded-xl p-6"><Story /></div>],
  render: () => (
    <div className="grid w-[900px] max-w-full gap-5 md:grid-cols-2 xl:grid-cols-3">
      {SETTINGS_SECTIONS.map((s) => (
        <SettingsSectionCard key={s.to} to={s.to} icon={SETTINGS_ICONS[s.icon] ?? SlidersHorizontal} title={s.title} description={s.desc} />
      ))}
    </div>
  ),
}
