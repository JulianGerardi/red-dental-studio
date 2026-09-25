import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { CoachMark } from './CoachMark'
import { TOPICS } from './topics'

const meta = {
  title: 'Components/Help/CoachMark',
  component: CoachMark,
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
  args: {
    coaching: { ...TOPICS[0], index: 0, total: 3 },
    onNext: () => {},
    onClose: () => {},
    onBackToHelp: () => {},
  },
  decorators: [(Story) => <div className="relative h-[640px]"><Story /></div>],
} satisfies Meta<typeof CoachMark>

export default meta
type Story = StoryObj<typeof meta>

export const FirstStep: Story = {}
export const MiddleStep: Story = { args: { coaching: { ...TOPICS[1], index: 1, total: 3 }, onPrev: () => {}, onNext: () => {} } }
`})))()}n();export{t as default};