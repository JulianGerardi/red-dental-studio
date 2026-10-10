import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { DrawerActions, DrawerSection, DrawerStep } from '@/components/ui/drawer'
import { DateField, ModalShell, SelectField, TextField } from '@/components/patients/form'
import { LinkExistingPerson } from '@/components/settings/LinkExistingPerson'
import { useFormPasos } from '@/lib/useFormPasos'
import { CODIGOS, PAISES, ESTADOS } from '@/data/location-options'
import type { Empleado } from '@/data/employees'

/* New Employee: antes una pantalla aparte, ahora drawer con pasos como los de Confidentally 2.0. "Link a person that
   already exists" cambia los datos personales por el buscador. Ver design-reference/figma/modulos/employees.md. */

const VACIO = {
  first: '', middle: '', last: '', email: '', birthday: '',
  codigo: CODIGOS[0], area: '', numero: '', ext: '',
  linea1: '', linea2: '', pais: PAISES[0], estado: '', ciudad: '', zip: '',
}

const PASOS = ['General', 'Contact', 'Address'] as const

const iniciales = (nombre: string) => nombre.trim().split(/\\s+/).slice(0, 2).map((p) => p[0]).join('').toUpperCase()

export function NewEmployeeDrawer({ onClose, onGuardar }: { onClose: () => void; onGuardar: (e: Empleado) => void }) {
  const [vincular, setVincular] = useState(false)
  const [vinculado, setVinculado] = useState<Empleado | null>(null)
  const { d, set, falta, paso, siguiente, atras, listo } = useFormPasos(VACIO, [
    vincular ? [] : ['first', 'last', 'email', 'birthday'],
    ['codigo', 'area', 'numero'],
    ['linea1', 'pais', 'estado', 'ciudad', 'zip'],
  ])

  const guardar = () => {
    if (!listo()) return
    const nombre = vinculado?.nombre ?? \`\${d.first.trim()} \${d.last.trim()}\`
    onGuardar(vinculado ?? {
      id: nombre.toLowerCase().replace(/\\s+/g, '-'), nombre, iniciales: iniciales(nombre), cargo: '—',
      cumpleanos: d.birthday, email: d.email.trim(), esProvider: false, estado: 'Active',
    })
    onClose()
  }

  return (
    <ModalShell
      title="New Employee"
      description="Everyone with access to the practice, across every location."
      onClose={onClose}
      width="max-w-[560px]"
      steps={PASOS}
      step={paso}
      actions={(
        <DrawerActions
          step={paso} total={PASOS.length} onNext={siguiente} onBack={atras} onCancel={onClose} onSave={guardar}
          nextDisabled={paso === 0 && vincular && !vinculado}
        />
      )}
    >
      <DrawerStep index={0} step={paso}>
        <DrawerSection title="General Information">
          <LinkExistingPerson vincular={vincular} onVincular={setVincular} vinculado={vinculado} onSeleccionar={setVinculado} />
          {!vincular && (
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="First name" required placeholder="First name" value={d.first} onChange={set('first')} error={falta('first')} />
              <TextField label="Middle name" placeholder="Middle name" value={d.middle} onChange={set('middle')} />
              <TextField label="Last name" required placeholder="Last name" value={d.last} onChange={set('last')} error={falta('last')} />
              <DateField label="Birthdate" required placeholder="Birthdate" onChange={set('birthday')} error={falta('birthday')} />
              <TextField className="sm:col-span-2" label="Email" required placeholder="Email" value={d.email} onChange={set('email')} error={falta('email')} />
            </div>
          )}
        </DrawerSection>
      </DrawerStep>

      <DrawerStep index={1} step={paso}>
        <DrawerSection title="Contact Information">
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField label="Country Code" required options={CODIGOS} value={d.codigo} onChange={set('codigo')} error={falta('codigo')} />
            <TextField label="Area Code (3 digits)" required placeholder="555" value={d.area} onChange={set('area')} error={falta('area')} />
            <TextField label="Number (7 digits)" required placeholder="000-0000" value={d.numero} onChange={set('numero')} error={falta('numero')} />
            <TextField label="Extension" placeholder="Extension" value={d.ext} onChange={set('ext')} />
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
          </div>
        </DrawerSection>
      </DrawerStep>
    </ModalShell>
  )
}
`})))()}export{n,i as r,r as t};