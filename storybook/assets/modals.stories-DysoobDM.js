import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import type { Meta, StoryObj } from '@storybook/react-vite'
import { ManageSubscriptionModal, NewDependerModal, NewSubscriptionModal } from './modals'

const meta = {
  title: 'Components/Patients/Insurance modals',
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const NewSubscription: Story = { render: () => <NewSubscriptionModal onClose={() => {}} /> }
export const ManageSubscription: Story = { render: () => <ManageSubscriptionModal onNuevoDependiente={() => {}} onClose={() => {}} /> }
export const NewDependent: Story = { render: () => <NewDependerModal onClose={() => {}} /> }
`})))()}n();export{t as default};