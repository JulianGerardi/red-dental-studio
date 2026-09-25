import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  DateField, DateTextField, FieldError, FieldLabel, FormFooter, LinkPersonCheckbox, ModalShell,
  OptionCheckbox, SearchField, SectionCard, SelectField, TextArea, TextField,
} from './form'

const meta = {
  title: 'Components/Patients/Form fields',
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="w-[360px]"><Story /></div>],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function Campos() {
  const [texto, setTexto] = useState('')
  const [sel, setSel] = useState('')
  const [buscar, setBuscar] = useState('')
  const [fecha, setFecha] = useState('')
  const [nota, setNota] = useState('')
  return (
    <div className="flex flex-col gap-4">
      <TextField label="First name" required placeholder="Type here" value={texto} onChange={setTexto} />
      <TextField label="Email" placeholder="name@clinic.com" error="This field is required." />
      <SelectField label="Gender" options={['Female', 'Male', 'Other']} value={sel} onChange={setSel} />
      <SearchField label="Medication" options={['Amoxicillin', 'Ibuprofen', 'Lidocaine']} value={buscar} onChange={setBuscar} />
      <DateField label="Start date" />
      <DateTextField label="Birthday" value={fecha} onChange={setFecha} />
      <TextArea label="Notes" placeholder="Add notes" value={nota} onChange={setNota} />
      <OptionCheckbox label="Send a reminder" />
      <LinkPersonCheckbox />
    </div>
  )
}

export const Fields: Story = { render: () => <Campos /> }

export const LabelAndError: Story = {
  render: () => (
    <div className="flex flex-col gap-1">
      <FieldLabel required>Required label</FieldLabel>
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

/* Casilla del formulario: tildada (por defecto) y destildada. */
export const CheckboxStates: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <OptionCheckbox label="Checked" defaultChecked />
      <OptionCheckbox label="Unchecked" defaultChecked={false} />
    </div>
  ),
}
`})))()}export{n,i as r,r as t};