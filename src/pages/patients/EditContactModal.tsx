import { ModalShell, SectionCard, TextField, SelectField, FormFooter } from '@/components/patients/form'
import { aviso } from '@/components/ui/toaster'

/* Figma 3640:74270 → form 3640:75931 (860×521). */
export function EditContactModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell title="Edit Contact" onClose={onClose} footer={<FormFooter onCancel={onClose} onSave={() => { aviso.ok('Contact information saved.'); onClose() }} />}>
      <div className="grid gap-7 lg:grid-cols-2">
        <SectionCard title="Contact Information">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Area Code" placeholder="+1" />
            <TextField label="Phone Number" placeholder="(555) 123-4567" />
          </div>
          <TextField label="Email" placeholder="john.smith@hotmail.com" />
        </SectionCard>

        <SectionCard title="Address Information">
          <TextField label="Address Line 1" placeholder="Street and number" />
          <TextField label="Address Line 2" placeholder="Apartment, suite, etc." />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectField label="Country" required />
            <SelectField label="State" required />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="City" required placeholder="City" />
            <TextField label="ZIP Code" placeholder="00000" />
          </div>
        </SectionCard>
      </div>
    </ModalShell>
  )
}
