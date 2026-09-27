import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch } from './switch'

const meta = {
  title: 'Components/UI/Switch',
  component: Switch,
  argTypes: { size: { control: 'select', options: ['default', 'sm'] } },
  parameters: { docs: { description: { component: 'Prende o apaga algo que tiene efecto enseguida. **Probalo** en *Playground*.' } } },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

type SwitchArgs = { label: string; checked: boolean; size: 'default' | 'sm'; disabled: boolean; invalid: boolean }

/* Prendelo y apagalo, y cambiá tamaño y estado desde Controls. */
export const Playground: StoryObj<SwitchArgs> = {
  args: { label: 'Active template', checked: true, size: 'default', disabled: false, invalid: false },
  argTypes: {
    label: { control: 'text', description: 'Qué prende o apaga. Siempre al lado.' },
    checked: { control: 'boolean', description: 'Cómo arranca. Se puede tocar.' },
    size: { control: 'inline-radio', options: ['default', 'sm'], description: 'default en formularios · sm en listas.' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean', description: 'Borde rojo cuando falta elegir.' },
  },
  render: ({ label, checked, size, disabled, invalid }) => (
    <label className="flex items-center gap-2.5 text-[13px] text-ink">
      <Switch key={String(checked)} defaultChecked={checked} size={size} disabled={disabled} aria-invalid={invalid || undefined} />
      {label}
    </label>
  ),
}

export const Default: Story = { args: { defaultChecked: true, 'aria-label': 'Active' } }

export const States: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Switch aria-label="Off" />
      <Switch defaultChecked aria-label="On" />
      <Switch size="sm" defaultChecked aria-label="Small on" />
      <Switch disabled aria-label="Disabled" />
      <Switch disabled defaultChecked aria-label="Disabled on" />
    </div>
  ),
}

/* Estado de error: borde y anillo rojos cuando el campo es inválido. */
export const Invalid: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Switch aria-invalid aria-label="Invalid off" />
      <Switch aria-invalid defaultChecked aria-label="Invalid on" />
    </div>
  ),
}
