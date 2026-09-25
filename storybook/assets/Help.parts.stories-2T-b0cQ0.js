import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { TOPICS } from '@/components/help/topics'
import { TopicCard } from './Help'

const meta = { title: 'Pages/Parts/Help', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Topic: Story = { render: () => <div className="w-[340px]"><TopicCard topic={TOPICS[0]} onOpen={() => {}} /></div> }
`})))()}export{n,i as r,r as t};