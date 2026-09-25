import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { PageTitle } from '@/components/ui/page-title'
import { TextField, SelectField, OptionCheckbox, FormFooter, ModalShell } from '@/components/patients/form'
import { aviso } from '@/components/ui/toaster'
import { CONTENEDOR_PAGINA } from '@/lib/estilos'

/* Figma 3640:72713 "Patients — Edit Patient (Full Page)".
   Tres secciones a 1088 de ancho: General (2×2 + 1 full), Demography
   (7 full-width + un checkbox) y Address (3 filas de 2). */

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-line bg-white p-6">
      <h2 className="text-sm font-semibold text-ink">{title}</h2>
      <div className="mt-4 flex flex-col gap-4">{children}</div>
    </section>
  )
}

/* El cuerpo es el mismo en la página y en el modal que abre el lápiz de
   "General" en el dashboard del paciente. */
export function EditPatientForm() {
  return (
    <div className="flex flex-col gap-6">
        <Section title="General Information">
          <div className="grid gap-6 md:grid-cols-2">
            <TextField label="First Name" required placeholder="John" />
            <TextField label="Middle Name" placeholder="Lorem" />
            <TextField label="Last Name" required placeholder="Smith" />
            <TextField label="Preferred Name" placeholder="Johnny" />
          </div>
          <TextField label="Email" placeholder="john.smith@hotmail.com" />
        </Section>

        <Section title="Demography Information">
          <SelectField label="Gender" required />
          <SelectField label="Race" />
          <SelectField label="Ethnicity" />
          <SelectField label="Profession" />
          <SelectField label="Nationality" />
          <SelectField label="Language" />
          <SelectField label="Religion" />
          <OptionCheckbox label="Interpreter Required" />
        </Section>

        <Section title="Address Information">
          <div className="grid gap-6 md:grid-cols-2">
            <TextField label="Address Line 1" placeholder="Street and number" />
            <TextField label="Address Line 2" placeholder="Apartment, suite, etc." />
            <SelectField label="Country" required />
            <SelectField label="State" required />
            <TextField label="City" required placeholder="City" />
            <TextField label="ZIP Code" placeholder="00000" />
          </div>
        </Section>

    </div>
  )
}

export function EditPatientModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell
      title="Edit Patient"
      onClose={onClose}
      width="max-w-[1100px]"
      footer={<FormFooter onCancel={onClose} onSave={() => { aviso.ok('Patient details saved.'); onClose() }} />}
    >
      <EditPatientForm />
    </ModalShell>
  )
}

export default function EditPatientPage() {
  return (
    <div className={CONTENEDOR_PAGINA}>
      <div className="flex flex-col gap-[15px]">
        <PageTitle>Edit Patient</PageTitle>
      </div>
      <div className="mt-6">
        <EditPatientForm />
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <FormFooter onCancel={() => history.back()} onSave={() => aviso.ok('Patient details saved.')} />
      </div>
    </div>
  )
}
`})))()}export{n,i as r,r as t};