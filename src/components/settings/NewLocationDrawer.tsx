import { DrawerActions, DrawerSection, DrawerStep } from '@/components/ui/drawer'
import { ModalShell, SelectField, TextField } from '@/components/patients/form'
import { useFormPasos } from '@/lib/useFormPasos'
import { PAISES, CODIGOS, ESTADOS, ZONAS, FEES } from '@/data/location-options'

/* New Location: antes una pantalla aparte, ahora drawer con pasos como los de Confidentally 2.0 (mismos campos y
   catálogos). Ver design-reference/design-system.md, "Pop ups: drawer para todo". */

const VACIO = {
  nombre: '', abreviatura: '', fee: '',
  codigo: CODIGOS[0], area: '', numero: '', email: '',
  linea1: '', linea2: '', pais: PAISES[0], estado: '', ciudad: '', zip: '', zona: '',
}

const PASOS = ['General', 'Contact', 'Address'] as const

export type NuevaLocacion = { nombre: string; info: string }

export function NewLocationDrawer({ onClose, onGuardar }: { onClose: () => void; onGuardar: (l: NuevaLocacion) => void }) {
  const { d, set, falta, paso, siguiente, atras, listo } = useFormPasos(VACIO, [
    ['nombre', 'fee'],
    ['codigo', 'area', 'numero', 'email'],
    ['linea1', 'pais', 'estado', 'ciudad', 'zip', 'zona'],
  ])

  const guardar = () => {
    if (!listo()) return
    onGuardar({ nombre: d.nombre.trim(), info: `${d.linea1.trim()}, ${d.ciudad.trim()}` })
    onClose()
  }

  return (
    <ModalShell
      title="New Location"
      description="Set your location name. Add the location you need."
      onClose={onClose}
      width="max-w-[560px]"
      steps={PASOS}
      step={paso}
      actions={<DrawerActions step={paso} total={PASOS.length} onNext={siguiente} onBack={atras} onCancel={onClose} onSave={guardar} />}
    >
      <DrawerStep index={0} step={paso}>
        <DrawerSection title="General Information">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Name" required placeholder="Introduce your location name" value={d.nombre} onChange={set('nombre')} error={falta('nombre')} />
            <TextField label="Abbreviation" placeholder="Introduce abbreviation" value={d.abreviatura} onChange={set('abreviatura')} />
            <SelectField label="Default Fee Schedule" required placeholder="Select fee schedule" options={FEES} value={d.fee} onChange={set('fee')} error={falta('fee')} />
          </div>
        </DrawerSection>
      </DrawerStep>

      <DrawerStep index={1} step={paso}>
        <DrawerSection title="Contact Information">
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField label="Country Code" required options={CODIGOS} value={d.codigo} onChange={set('codigo')} error={falta('codigo')} />
            <TextField label="Area Code (3 digits)" required placeholder="555" value={d.area} onChange={set('area')} error={falta('area')} />
            <TextField label="Number (7 digits)" required placeholder="000-0000" value={d.numero} onChange={set('numero')} error={falta('numero')} />
            <TextField label="Email" required placeholder="example@example.com" value={d.email} onChange={set('email')} error={falta('email')} />
          </div>
        </DrawerSection>
      </DrawerStep>

      <DrawerStep index={2} step={paso}>
        <DrawerSection title="Address Information">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Address Line 1" required placeholder="Street name and number" value={d.linea1} onChange={set('linea1')} error={falta('linea1')} />
            <TextField label="Address Line 2" placeholder="Additional info" value={d.linea2} onChange={set('linea2')} />
            <SelectField label="Country" required options={PAISES} value={d.pais} onChange={set('pais')} error={falta('pais')} />
            <SelectField label="State" required placeholder="Select your region" options={ESTADOS} value={d.estado} onChange={set('estado')} error={falta('estado')} />
            <TextField label="City" required placeholder="Your city" value={d.ciudad} onChange={set('ciudad')} error={falta('ciudad')} />
            <TextField label="ZIP Code" required placeholder="Postal code (only numbers)" value={d.zip} onChange={set('zip')} error={falta('zip')} />
            <SelectField label="Time Zone" required placeholder="Select your time zone" options={ZONAS} value={d.zona} onChange={set('zona')} error={falta('zona')} />
          </div>
        </DrawerSection>
      </DrawerStep>
    </ModalShell>
  )
}
