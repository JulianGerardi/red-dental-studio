import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { PatientCard } from './PatientCard'

const meta = {
  title: 'Components/Patients/PatientCard',
  component: PatientCard,
  args: {
    row: { id: 'patient-0001', name: 'Sarah Stone', initials: 'SS', birthday: '04/02/1991', email: 'sarah.stone@mail.com', status: 'Active' },
    onEdit: () => {},
  },
  decorators: [(Story) => <div className="w-[340px]"><Story /></div>],
} satisfies Meta<typeof PatientCard>

export default meta
type Story = StoryObj<typeof meta>

export const Active: Story = {}
export const Inactive: Story = { args: { row: { id: 'patient-0002', name: 'John Lorem', initials: 'JL', birthday: '12/09/1985', email: 'john.lorem@mail.com', status: 'Inactive' } } }
`})))()}export{n,i as r,r as t};