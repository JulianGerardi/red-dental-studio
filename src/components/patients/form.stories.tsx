import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  DateField, FieldError, FieldHint, FieldLabel, FormFooter, LinkPersonCheckbox, ModalShell,
  SearchField, SectionCard, TextField, CollapsibleFields, CountryCodeField, PersonaFila, chipsPersona,
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
    <ModalShell title="New allergy" onClose={() => {}} footer={<FormFooter onCancel={() => {}} onSave={() => {}} />}>
      <div className="flex flex-col gap-4">
        <SearchField label="Allergy" options={['Penicillin', 'Latex']} />
        <TextField label="Reaction" placeholder="Describe the reaction" />
      </div>
    </ModalShell>
  ),
}

/* Country Code (patients.md, 2026-11-04): los países con su bandera y un buscador por nombre o código. */
export const CountryCode: Story = { render: () => <CountryCodeField value="(+1) United States" onChange={() => {}} /> }

/* Un grupo de campos plegado dentro de un drawer (Guardian → Contact Information, CON-2858): cerrado resume lo cargado,
   se abre al tocarlo y, con un error adentro, se abre solo y se pinta de rojo. */
export const CollapsibleClosed: Story = { render: () => <CollapsibleFields title="Contact information" required summary="+1 (324) 359-6750"><TextField label="Area code" value="324" /></CollapsibleFields> }
export const CollapsibleOpen: Story = { render: () => <CollapsibleFields title="Contact information" required summary="Not loaded yet" defaultOpen><TextField label="Area code" placeholder="555" /></CollapsibleFields> }
export const CollapsibleWithError: Story = { render: () => <CollapsibleFields title="Contact information" required summary="Complete the phone number." error><TextField label="Area code" placeholder="555" error="Complete the phone number." /></CollapsibleFields> }

/* La fila de una persona en un buscador: nombre, tipo y los chips que la distinguen de otra con el mismo nombre. */
export const PersonRow: Story = { render: () => <PersonaFila nombre="Jessica Miller" subtitulo="Contact" chips={chipsPersona('05/14/1982', 'jessica.miller@gmail.com')} /> }

/* Estado vacío (empty): el buscador sin coincidencias dice qué pasó. */
export const SearchEmpty: Story = { render: () => <SearchField label="Carrier name" value="zzz" options={['Aetna', 'Cigna']} emptyText="Carrier not found." onChange={() => {}} /> }
