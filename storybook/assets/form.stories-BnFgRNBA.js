import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  DateField, FieldError, FieldHint, FieldLabel, FormFooter, LinkPersonCheckbox, ModalShell,
  SearchField, SectionCard, TextField,
} from './form'

const meta = {
  title: 'Components/Patients/Form layout',
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="w-[360px]"><Story /></div>],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/* Los campos (Text, Select, Search, Date, Textarea, Checkbox) están en
   Elements / Fields, con controles. Acá, las piezas que arman un formulario. */
export const CalendarDateAndLinkPerson: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <DateField label="Start date" />
      <LinkPersonCheckbox />
    </div>
  ),
}

export const LabelAndError: Story = {
  render: () => (
    <div className="flex flex-col gap-1">
      <FieldLabel required>Required label</FieldLabel>
      <FieldHint>Help text under the field.</FieldHint>
      <FieldError>This field is required.</FieldError>
    </div>
  ),
}

export const Section: Story = {
  render: () => (
    <SectionCard title="General">
      <TextField label="Name" placeholder="Name" />
      <TextField label="Last name" placeholder="Last name" />
    </SectionCard>
  ),
}

export const Footer: Story = { render: () => <FormFooter onCancel={() => {}} onSave={() => {}} /> }

export const Modal: Story = {
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 620 } } },
  render: () => (
    <ModalShell title="New Allergy" onClose={() => {}} footer={<FormFooter onCancel={() => {}} onSave={() => {}} />}>
      <div className="flex flex-col gap-4">
        <SearchField label="Allergy" options={['Penicillin', 'Latex']} />
        <TextField label="Reaction" placeholder="Describe the reaction" />
      </div>
    </ModalShell>
  ),
}
`})))()}export{n,i as r,r as t};