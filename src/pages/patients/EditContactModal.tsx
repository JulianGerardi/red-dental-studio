import { ModalShell, TextField, SelectField } from '@/components/patients/form'
import { DrawerActions, DrawerSection } from '@/components/ui/drawer'
import { aviso } from '@/components/ui/toaster'

/* Figma 3640:74270. Drawer de un solo paso, como Edit Contact Details de Confidentally 2.0: los datos de contacto y la
   dirección, en una columna. */
export function EditContactModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalShell
      title="Edit Contact Details" description="Update this patient's contact information" onClose={onClose} width="max-w-[480px]"
      actions={<DrawerActions onCancel={onClose} onSave={() => { aviso.ok('Contact details updated.'); onClose() }} />}
    >
      <div className="flex flex-col gap-6">
        <DrawerSection title="Contact Details">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Area Code" placeholder="+1" />
            <TextField label="Phone Number" placeholder="(555) 123-4567" />
            <TextField label="Email Address" placeholder="john.smith@hotmail.com" />
          </div>
        </DrawerSection>

        <DrawerSection title="Address">
          {/* De a dos como New Location y New Employee (Drawer → Specs → Fields). */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Address Line 1" placeholder="Street and number" />
            <TextField label="Address Line 2" placeholder="Apartment, suite, etc." />
            <SelectField label="Country" required />
            <SelectField label="State" required />
            <TextField label="City" required placeholder="City" />
            <TextField label="ZIP Code" placeholder="00000" />
          </div>
        </DrawerSection>
      </div>
    </ModalShell>
  )
}
