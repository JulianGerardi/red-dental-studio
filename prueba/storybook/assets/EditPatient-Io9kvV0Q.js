import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { PageTitle } from '@/components/ui/page-title'
import { TextField, SelectField, OptionCheckbox, FormFooter } from '@/components/patients/form'
import { PatientBreadcrumb } from '@/components/patients/PatientBreadcrumb'
import { DrawerSection, useEnDrawer } from '@/components/ui/drawer'
import { aviso } from '@/components/ui/toaster'
import { CONTENEDOR_PAGINA, TARJETA_PANEL } from '@/lib/estilos'
import { cn } from '@/lib/utils'

/* Figma 3640:72713 "Patients — Edit Patient (Full Page)".
   Tres secciones a 1088 de ancho: General (2×2 + 1 full), Demography
   (7 full-width + un checkbox) y Address (3 filas de 2). */

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  /* En el drawer va sin caja, como en Confidentally 2.0. */
  if (useEnDrawer()) return <DrawerSection title={title}>{children}</DrawerSection>
  return (
    <section className={cn(TARJETA_PANEL, 'p-6')}>
      <h2 className="text-sm font-semibold text-ink">{title}</h2>
      <div className="mt-4 flex flex-col gap-4">{children}</div>
    </section>
  )
}

/* El cuerpo de la página completa (Figma 3640:72713). El drawer de Edit Patient que abre el menú de la tabla es otro
   formulario, con pestañas: ver EditPatientModal (Figma 5277:123056). */
export function EditPatientForm() {
  return (
    <div className="flex flex-col gap-6">
      <Section title="General Information">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="First Name" required placeholder="John" />
          <TextField label="Middle Name" placeholder="Lorem" />
          <TextField label="Last Name" required placeholder="Smith" />
          <TextField label="Preferred Name" placeholder="Johnny" />
          <TextField label="Email" placeholder="john.smith@hotmail.com" />
        </div>
      </Section>

      <Section title="Demography Information">
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField label="Gender" required />
          <SelectField label="Race" />
          <SelectField label="Ethnicity" />
          <SelectField label="Profession" />
          <SelectField label="Nationality" />
          <SelectField label="Language" />
          <SelectField label="Religion" />
        </div>
        <OptionCheckbox label="Interpreter Required" />
      </Section>

      <Section title="Address Information">
        <div className="grid gap-4 sm:grid-cols-2">
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

export default function EditPatientPage() {
  return (
    <div className={CONTENEDOR_PAGINA}>
      <PatientBreadcrumb name="John Smith" section="Edit Patient" />
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