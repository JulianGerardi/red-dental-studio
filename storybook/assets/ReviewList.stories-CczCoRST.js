import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { ReviewList } from './ReviewList'

const meta = {
  title: 'Components/Clinical/Dental/ReviewList',
  component: ReviewList,
  args: {
    reviews: [
      { id: 'R-1', date: 'May 14, 2026', provider: 'Elena Martinez', note: 'Reviewed with the patient. No new findings.' },
      { id: 'R-2', date: 'Feb 02, 2026', provider: 'Emily Chen', note: 'Caries on 3 to monitor.' },
    ],
  },
  decorators: [(Story) => <div className="w-[420px]"><Story /></div>],
} satisfies Meta<typeof ReviewList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Empty: Story = { args: { reviews: [] } }
`})))()}export{n,i as r,r as t};