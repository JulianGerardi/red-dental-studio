import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { DrawerActions, DrawerSection, DrawerStep } from '@/components/ui/drawer'
import { CountryCodeField, ModalShell, SelectField, TextArea, TextField } from '@/components/patients/form'
import { useFormPasos } from '@/lib/useFormPasos'
import { CODIGOS, ESTADOS, PAISES } from '@/data/location-options'
import type { ProveedorDerivacion } from '@/data/clinical-mode'
import { Credenciales, credencialesIncompletas, type Credencial } from './Credenciales'

/* New provider desde Referral (CON-2610: crea el Referral Provider y queda elegido; CON-3128: su especialidad). Los campos
   son los del modal de red.dev, en un drawer con pasos como todo pop up de la app. Ver
   design-reference/figma/modulos/clinical-mode.md (2026-11-25). */

const ESPECIALIDADES = ['Endodontics', 'Oral Surgery', 'Orthodontics', 'Pediatric Dentistry', 'Periodontics', 'Prosthodontics']
const PASOS = ['General', 'Address', 'Phone', 'Credentials'] as const
const VACIO = {
  first: '', last: '', email: '', especialidad: '', notas: '',
  linea1: '', linea2: '', pais: PAISES[0]!, estado: '', ciudad: '', zip: '',
  codigo: CODIGOS[0]!, area: '', numero: '',
}

export function NewProviderDrawer({ onClose, onGuardar }: { onClose: () => void; onGuardar: (p: ProveedorDerivacion) => void }) {
  const { d, set, falta, paso, siguiente, atras, listo } = useFormPasos(VACIO, [
    ['first', 'last', 'email'],
    ['linea1', 'pais', 'estado', 'ciudad', 'zip'],
    ['codigo', 'area', 'numero'],
    [],
  ])
  const [credenciales, setCredenciales] = useState<Credencial[]>([])
  const [intentoCred, setIntentoCred] = useState(false)

  const guardar = () => {
    if (!listo()) return
    if (credencialesIncompletas(credenciales)) { setIntentoCred(true); return }
    onGuardar({ nombre: \`\${d.first.trim()} \${d.last.trim()}\`, especialidad: d.especialidad })
    onClose()
  }

  return (
    <ModalShell
      title="New provider"
      description="Add a referral provider. It will be selected in this referral."
      onClose={onClose}
      width="max-w-[560px]"
      steps={PASOS}
      step={paso}
      actions={<DrawerActions step={paso} total={PASOS.length} onNext={siguiente} onBack={atras} onCancel={onClose} onSave={guardar} />}
    >
      <DrawerStep index={0} step={paso}>
        <DrawerSection title="General information">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="First name" required placeholder="John" value={d.first} onChange={set('first')} error={falta('first')} />
            <TextField label="Last name" required placeholder="Doe" value={d.last} onChange={set('last')} error={falta('last')} />
            <TextField label="Email" required placeholder="provider@email.com" value={d.email} onChange={set('email')} error={falta('email')} />
            <SelectField label="Specialty" placeholder="Select a specialty" options={ESPECIALIDADES} value={d.especialidad} onChange={set('especialidad')} />
          </div>
          <TextArea label="Notes" rows={3} placeholder="Additional notes about the provider..." value={d.notas} onChange={set('notas')} />
        </DrawerSection>
      </DrawerStep>

      <DrawerStep index={1} step={paso}>
        <DrawerSection title="Address information">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Address line 1" required placeholder="Street name and number" value={d.linea1} onChange={set('linea1')} error={falta('linea1')} />
            <TextField label="Address line 2" placeholder="Additional info" value={d.linea2} onChange={set('linea2')} />
            <SelectField label="Country" required options={PAISES} value={d.pais} onChange={set('pais')} error={falta('pais')} />
            <SelectField label="State" required placeholder="Select your region" options={ESTADOS} value={d.estado} onChange={set('estado')} error={falta('estado')} />
            <TextField label="City" required placeholder="Your city" value={d.ciudad} onChange={set('ciudad')} error={falta('ciudad')} />
            <TextField label="ZIP code" required placeholder="Postal code (only numbers)" value={d.zip} onChange={set('zip')} error={falta('zip')} />
          </div>
        </DrawerSection>
      </DrawerStep>

      <DrawerStep index={2} step={paso}>
        <DrawerSection title="Phone">
          <div className="grid gap-4 sm:grid-cols-2">
            <CountryCodeField required value={d.codigo} onChange={set('codigo')} error={falta('codigo')} />
            <TextField label="Area code (3 digits)" required placeholder="555" value={d.area} onChange={set('area')} error={falta('area')} />
            <TextField label="Number (7 digits)" required placeholder="000-0000" value={d.numero} onChange={set('numero')} error={falta('numero')} />
          </div>
        </DrawerSection>
      </DrawerStep>
      <DrawerStep index={3} step={paso}>
        <DrawerSection title="Credentials">
          <Credenciales value={credenciales} onChange={setCredenciales} intento={intentoCred} />
        </DrawerSection>
      </DrawerStep>
    </ModalShell>
  )
}
`})))()}export{n,i as r,r as t};