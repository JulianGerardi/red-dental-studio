import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pill, type PillTone } from './pill'

const TONOS: PillTone[] = ['success', 'info', 'warning', 'danger', 'neutral', 'purple']

const meta = {
  title: 'Components/UI/Pill',
  component: Pill,
  args: { tone: 'success', children: 'Accepted' },
  argTypes: {
    tone: { control: 'select', options: TONOS },
    size: { control: 'select', options: ['md', 'sm'] },
  },
} satisfies Meta<typeof Pill>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Tones: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(['md', 'sm'] as const).map((size) => (
        <div key={size} className="flex flex-wrap items-center gap-2">
          <span className="w-8 text-[11px] text-ink-muted">{size}</span>
          {TONOS.map((t) => <Pill key={t} tone={t} size={size}>{t}</Pill>)}
        </div>
      ))}
    </div>
  ),
}
`})))()}n();export{t as default};