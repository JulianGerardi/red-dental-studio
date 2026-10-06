import { PageTitle } from '@/components/ui/page-title'
import { TextField, SelectField, OptionCheckbox, FormFooter, ModalShell } from '@/components/patients/form'
import { DrawerActions, DrawerSection, useEnDrawer } from '@/components/ui/drawer'
import { useState } from 'react'
import { aviso } from '@/components/ui/toaster'
import { CONTENEDOR_PAGINA } from '@/lib/estilos'

/* Figma 3640:72713 "Patients — Edit Patient (Full Page)".
   Tres secciones a 1088 de ancho: General (2×2 + 1 full), Demography
   (7 full-width + un checkbox) y Address (3 filas de 2). */

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  /* En el drawer va sin caja, como en Confidentally 2.0. */
  if (useEnDrawer()) return <DrawerSection title={title}>{children}</DrawerSection>
  return (
    <section className="rounded-lg border border-line bg-white p-6">
      <h2 className="text-sm font-semibold text-ink">{title}</h2>
      <div className="mt-4 flex flex-col gap-4">{children}</div>
    </section>
  )
}

/* El cuerpo es el mismo en la página y en el drawer que abre el lápiz de "General" en el dashboard del paciente. En el
   drawer va por pasos (`paso`): se ve una sección y las otras quedan escondidas, sin perder lo escrito. */
export const PASOS_EDIT_PATIENT = ['General', 'Demography', 'Address'] as const

export function EditPatientForm({ paso }: { paso?: number }) {
  const ver = (i: number) => paso === undefined || paso === i
  return (
    <div className="flex flex-col gap-6">
        <div hidden={!ver(0)}>
        <Section title="General Information">
          <div className="grid gap-6 md:grid-cols-2">
            <TextField label="First Name" required placeholder="John" />
            <TextField label="Middle Name" placeholder="Lorem" />
            <TextField label="Last Name" required placeholder="Smith" />
            <TextField label="Preferred Name" placeholder="Johnny" />
          </div>
          <TextField label="Email" placeholder="john.smith@hotmail.com" />
        </Section>
        </div>

        <div hidden={!ver(1)}>
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
        </div>

        <div hidden={!ver(2)}>
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

    </div>
  )
}

export function EditPatientModal({ onClose }: { onClose: () => void }) {
  const [paso, setPaso] = useState(0)
  return (
    <ModalShell
      title="Edit Patient"
      description="General, demography and address"
      onClose={onClose}
      width="max-w-[560px]"
      steps={PASOS_EDIT_PATIENT}
      step={paso}
      actions={(
        <DrawerActions
          step={paso} total={PASOS_EDIT_PATIENT.length} onNext={() => setPaso((n) => n + 1)} onBack={() => setPaso((n) => n - 1)}
          onCancel={onClose} onSave={() => { aviso.ok('Patient details saved.'); onClose() }}
        />
      )}
    >
      <EditPatientForm paso={paso} />
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
