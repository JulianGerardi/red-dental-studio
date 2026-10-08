import { DrawerActions, DrawerSection, DrawerStep } from '@/components/ui/drawer'
import { ModalShell, SelectField, TextField } from '@/components/patients/form'
import { useFormPasos } from '@/lib/useFormPasos'
import { useFinanzas } from '@/data/finanzasStore'
import { ESTADOS } from '@/data/location-options'
import { RECLAMOS, idNuevo, type Aseguradora, type Reclamo } from '@/data/finanzas'

/* New Carrier: General, Contact y Address, como New Location. Los planes se cargan después, desde el detalle del carrier.
   Editar un carrier es la pestaña Information de su detalle. Ver settings-billing.md. */

const VACIO = {
  nombre: '', payerId: '', reclamos: 'Electronic',
  telefono: '', fax: '', email: '', sitio: '',
  linea1: '', linea2: '', ciudad: '', estadoUs: '', zip: '',
}

const PASOS = ['General', 'Contact', 'Address'] as const

export function CarrierDrawer({ onClose, onGuardar }: { onClose: () => void; onGuardar: (c: Aseguradora) => void }) {
  const { aseguradoras } = useFinanzas()
  const { d, set, falta, paso, siguiente, atras, listo } = useFormPasos(VACIO, [
    ['nombre', 'payerId', 'reclamos'],
    ['telefono'],
    ['linea1', 'ciudad', 'estadoUs', 'zip'],
  ])
  const repetido = aseguradoras.some((a) => a.nombre.toLowerCase() === d.nombre.trim().toLowerCase())

  const guardar = () => {
    if (!listo() || repetido) return
    onGuardar({
      id: idNuevo(d.nombre, aseguradoras.map((a) => a.id)),
      nombre: d.nombre.trim(), payerId: d.payerId.trim().toUpperCase(), reclamos: d.reclamos as Reclamo,
      telefono: d.telefono.trim(), fax: d.fax.trim(), email: d.email.trim(), sitio: d.sitio.trim(),
      linea1: d.linea1.trim(), linea2: d.linea2.trim(), ciudad: d.ciudad.trim(), estadoUs: d.estadoUs, zip: d.zip.trim(),
      estado: 'Active',
    })
    onClose()
  }

  return (
    <ModalShell
      title="New Carrier"
      description="The insurance company you send claims to. Add its plans next."
      onClose={onClose}
      width="max-w-[560px]"
      steps={PASOS}
      step={paso}
      actions={<DrawerActions step={paso} total={PASOS.length} onNext={() => !repetido && siguiente()} onBack={atras} onCancel={onClose} onSave={guardar} />}
    >
      <DrawerStep index={0} step={paso}>
        <DrawerSection title="General Information">
          <TextField
            label="Carrier Name" required placeholder="e.g. Delta Dental of California" value={d.nombre} onChange={set('nombre')}
            error={falta('nombre') ?? (repetido ? 'This carrier already exists.' : undefined)}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Payer ID" required placeholder="e.g. 77777" value={d.payerId} onChange={set('payerId')} error={falta('payerId')} hint="The ID used to send electronic claims." />
            <SelectField label="Claims Submission" required options={[...RECLAMOS]} value={d.reclamos} onChange={set('reclamos')} error={falta('reclamos')} />
          </div>
        </DrawerSection>
      </DrawerStep>

      <DrawerStep index={1} step={paso}>
        <DrawerSection title="Contact Information">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Phone" required placeholder="(800) 000-0000" value={d.telefono} onChange={set('telefono')} error={falta('telefono')} />
            <TextField label="Fax" placeholder="(800) 000-0000" value={d.fax} onChange={set('fax')} />
            <TextField label="Email" placeholder="claims@carrier.com" value={d.email} onChange={set('email')} />
            <TextField label="Website" placeholder="carrier.com" value={d.sitio} onChange={set('sitio')} />
          </div>
        </DrawerSection>
      </DrawerStep>

      <DrawerStep index={2} step={paso}>
        <DrawerSection title="Claims Address" description="Where paper claims and attachments are mailed.">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Address Line 1" required placeholder="Street or PO Box" value={d.linea1} onChange={set('linea1')} error={falta('linea1')} />
            <TextField label="Address Line 2" placeholder="Additional info" value={d.linea2} onChange={set('linea2')} />
            <TextField label="City" required placeholder="City" value={d.ciudad} onChange={set('ciudad')} error={falta('ciudad')} />
            <SelectField label="State" required placeholder="Select a state" options={ESTADOS} value={d.estadoUs} onChange={set('estadoUs')} error={falta('estadoUs')} />
            <TextField label="ZIP Code" required placeholder="Postal code" value={d.zip} onChange={set('zip')} error={falta('zip')} />
          </div>
        </DrawerSection>
      </DrawerStep>
    </ModalShell>
  )
}
