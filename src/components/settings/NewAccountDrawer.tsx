import { useState } from 'react'
import { DrawerActions, DrawerSection, DrawerStep } from '@/components/ui/drawer'
import { DateField, ModalShell, OptionCheckbox, SelectField, TextField } from '@/components/patients/form'
import { useFormPasos } from '@/lib/useFormPasos'
import { CODIGOS, PAISES, ESTADOS, ZONAS } from '@/data/location-options'
import type { Cuenta } from '@/pages/settings/Accounts'

/* New Account: los pasos siguen las pestañas de Edit Account (Information y Owner, con Address aparte para no alargar
   el primero). La cuenta nueva queda en Draft hasta tener plan, como las de la lista sin suscripción. Ver
   design-reference/figma/modulos/settings-accounts.md. */

const VACIO = {
  nombre: '', subdominio: '', fee: '',
  codigo: CODIGOS[0], area: '', numero: '', email: '', sitio: '',
  linea1: '', linea2: '', pais: PAISES[0], estado: '', ciudad: '', zip: '', zona: '',
  first: '', middle: '', last: '', nacimiento: '', ownerEmail: '',
  ownerCodigo: CODIGOS[0], ownerArea: '', ownerNumero: '',
  ownerLinea1: '', ownerLinea2: '', ownerPais: PAISES[0], ownerEstado: '', ownerCiudad: '', ownerZip: '',
}

const PASOS = ['Information', 'Address', 'Owner'] as const

export function NewAccountDrawer({ onClose, onGuardar }: { onClose: () => void; onGuardar: (c: Cuenta) => void }) {
  const [copiarContacto, setCopiarContacto] = useState(true)
  const [copiarDomicilio, setCopiarDomicilio] = useState(true)
  const { d, set, falta, paso, siguiente, atras, listo } = useFormPasos(VACIO, [
    ['nombre', 'codigo', 'area', 'numero'],
    ['linea1', 'pais', 'estado', 'ciudad', 'zip', 'zona'],
    [
      'first', 'last', 'nacimiento', 'ownerEmail',
      ...(copiarContacto ? [] : ['ownerCodigo', 'ownerArea', 'ownerNumero'] as const),
      ...(copiarDomicilio ? [] : ['ownerLinea1', 'ownerPais', 'ownerEstado', 'ownerCiudad', 'ownerZip'] as const),
    ],
  ])

  const guardar = () => {
    if (!listo()) return
    onGuardar({
      id: `c${Date.now()}`, nombre: d.nombre.trim(), plan: '—', suscripcion: '—', vence: '', estadoSuscripcion: '',
      locaciones: 0, empleados: 0, licencias: '—', duenos: `${d.first.trim()} ${d.last.trim()}`, estado: 'Draft',
    })
    onClose()
  }

  return (
    <ModalShell
      title="New Account"
      description="Create the clinic account and its practice owner."
      onClose={onClose}
      width="max-w-[560px]"
      steps={PASOS}
      step={paso}
      actions={<DrawerActions step={paso} total={PASOS.length} onNext={siguiente} onBack={atras} onCancel={onClose} onSave={guardar} />}
    >
      <DrawerStep index={0} step={paso}>
        <DrawerSection title="General Information">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Name" required placeholder="Clinic name" value={d.nombre} onChange={set('nombre')} error={falta('nombre')} />
            <TextField label="Subdomain" placeholder="clinic" value={d.subdominio} onChange={set('subdominio')} hint={d.subdominio.trim() ? `${d.subdominio.trim().toLowerCase()}.confidentally.com` : undefined} />
            <TextField label="Fee Schedule Name" placeholder="Fee schedule" value={d.fee} onChange={set('fee')} />
          </div>
        </DrawerSection>
        <DrawerSection title="Contact Information">
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField label="Country Code" required options={CODIGOS} value={d.codigo} onChange={set('codigo')} error={falta('codigo')} />
            <TextField label="Area Code (3 digits)" required placeholder="555" value={d.area} onChange={set('area')} error={falta('area')} />
            <TextField label="Number (7 digits)" required placeholder="000-0000" value={d.numero} onChange={set('numero')} error={falta('numero')} />
            <TextField label="Email" placeholder="example@example.com" value={d.email} onChange={set('email')} />
            <TextField label="Website" placeholder="https://" value={d.sitio} onChange={set('sitio')} />
          </div>
        </DrawerSection>
      </DrawerStep>

      <DrawerStep index={1} step={paso}>
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

      <DrawerStep index={2} step={paso}>
        <DrawerSection title="Owner Information">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="First Name" required placeholder="First name" value={d.first} onChange={set('first')} error={falta('first')} />
            <TextField label="Middle Name" placeholder="Middle name" value={d.middle} onChange={set('middle')} />
            <TextField label="Last Name" required placeholder="Last name" value={d.last} onChange={set('last')} error={falta('last')} />
            <DateField label="Birthdate" required placeholder="Select" onChange={set('nacimiento')} error={falta('nacimiento')} />
            <TextField label="Email" required placeholder="owner@clinic.com" value={d.ownerEmail} onChange={set('ownerEmail')} error={falta('ownerEmail')} />
          </div>
        </DrawerSection>
        <DrawerSection title="Contact Information">
          <OptionCheckbox label="Copy contact information from account" checked={copiarContacto} onChange={setCopiarContacto} />
          {!copiarContacto && (
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField label="Country Code" required options={CODIGOS} value={d.ownerCodigo} onChange={set('ownerCodigo')} error={falta('ownerCodigo')} />
              <TextField label="Area Code (3 digits)" required placeholder="555" value={d.ownerArea} onChange={set('ownerArea')} error={falta('ownerArea')} />
              <TextField label="Number (7 digits)" required placeholder="000-0000" value={d.ownerNumero} onChange={set('ownerNumero')} error={falta('ownerNumero')} />
            </div>
          )}
        </DrawerSection>
        <DrawerSection title="Address Information">
          <OptionCheckbox label="Copy address information from account" checked={copiarDomicilio} onChange={setCopiarDomicilio} />
          {!copiarDomicilio && (
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Address Line 1" required placeholder="Street name and number" value={d.ownerLinea1} onChange={set('ownerLinea1')} error={falta('ownerLinea1')} />
              <TextField label="Address Line 2" placeholder="Additional info" value={d.ownerLinea2} onChange={set('ownerLinea2')} />
              <SelectField label="Country" required options={PAISES} value={d.ownerPais} onChange={set('ownerPais')} error={falta('ownerPais')} />
              <SelectField label="State" required placeholder="Select your region" options={ESTADOS} value={d.ownerEstado} onChange={set('ownerEstado')} error={falta('ownerEstado')} />
              <TextField label="City" required placeholder="Your city" value={d.ownerCiudad} onChange={set('ownerCiudad')} error={falta('ownerCiudad')} />
              <TextField label="ZIP Code" required placeholder="Postal code (only numbers)" value={d.ownerZip} onChange={set('ownerZip')} error={falta('ownerZip')} />
            </div>
          )}
        </DrawerSection>
      </DrawerStep>
    </ModalShell>
  )
}
