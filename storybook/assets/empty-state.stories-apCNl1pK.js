import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { FileText } from 'lucide-react'
import { EmptyState } from './empty-state'

const meta = {
  title: 'Components/UI/EmptyState',
  component: EmptyState,
  args: { title: 'No documents yet', detail: 'Uploaded documents will show up here.' },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithIcon: Story = { args: { icon: FileText } }
export const WithAction: Story = { args: { icon: FileText, accion: { label: 'Upload document', onClick: () => {} } } }
export const Planned: Story = { args: { title: 'Lab orders', detail: 'Coming in a future release.', pill: 'Planned' } }
`})))()}export{n,i as r,r as t};