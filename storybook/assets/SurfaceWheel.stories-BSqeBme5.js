import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { SurfaceWheel, type Surface } from './SurfaceWheel'

const meta = {
  title: 'Components/Clinical/Dental/SurfaceWheel',
  component: SurfaceWheel,
  args: { value: ['O'], onChange: () => {}, size: 220 },
} satisfies Meta<typeof SurfaceWheel>

export default meta
type Story = StoryObj<typeof meta>

function Demo({ size }: { size?: number }) {
  const [v, setV] = useState<Surface[]>(['O', 'DB'])
  return <SurfaceWheel value={v} onChange={setV} size={size} />
}

export const Default: Story = { render: (args) => <Demo size={args.size} /> }

/* Ninguna superficie elegida. */
export const NoneSelected: Story = { render: () => <SurfaceWheel value={[]} onChange={() => {}} /> }

/* Todas las superficies elegidas. */
export const AllSelected: Story = { render: () => <SurfaceWheel value={['MB', 'B', 'DB', 'O', 'ML', 'L', 'DL']} onChange={() => {}} /> }
`})))()}export{n,i as r,r as t};