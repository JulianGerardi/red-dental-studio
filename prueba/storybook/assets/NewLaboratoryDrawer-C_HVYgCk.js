import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { DrawerActions, DrawerSection, DrawerStep } from '@/components/ui/drawer'
import { CountryCodeField, ModalShell, SelectField, TextField } from '@/components/patients/form'
import { useFormPasos } from '@/lib/useFormPasos'
import { CODIGOS, ESTADOS, PAISES } from '@/data/location-options'
import type { Laboratorio } from '@/data/laboratorios'
import { Credenciales, credencialesIncompletas, type Credencial } from './Credenciales'

/* New Laboratory desde Receiving laboratory (CON-2285): el modal de red.dev (video de Julián, 2026-11-25) pasa a drawer
   con pasos, como New Location. Mismos campos y textos; las credenciales son opcionales y de a varias, sin repetir el
   tipo. Ver design-reference/figma/modulos/clinical-mode.md (2026-11-25). */

const VACIO = { nombre: '', email: '', codigo: CODIGOS[0], area: '', numero: '', linea1: '', linea2: '', pais: PAISES[0], estado: '', ciudad: '', zip: '' }
const PASOS = ['General', 'Contact', 'Address', 'Credentials'] as const
const EMAIL = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
const soloDigitos = (v: string, max: number) => v.replace(/\\D/g, '').slice(0, max)

export function NewLaboratoryDrawer({ existentes, onClose, onGuardar }: {
  existentes: Laboratorio[]
  onClose: () => void
  onGuardar: (l: Laboratorio) => void
}) {
  const { d, set, falta, paso, siguiente, atras, listo } = useFormPasos(VACIO, [
    ['nombre', 'email'],
    ['codigo', 'area', 'numero'],
    ['linea1', 'pais', 'estado', 'ciudad', 'zip'],
    [],
  ])
  const [formato, setFormato] = useState<Record<string, string>>({})
  const [credenciales, setCredenciales] = useState<Credencial[]>([])
  const [intentoCred, setIntentoCred] = useState(false)

  /* Lo obligatorio lo marca useFormPasos; acá, el formato de cada paso (email, teléfono, ZIP) y el duplicado. */
  const revisar = (i: number) => {
    const e: Record<string, string> = {}
    if (i === 0) {
      if (d.email.trim() && !EMAIL.test(d.email.trim())) e.email = 'Enter a valid email.'
      else if (existentes.some((l) => l.nombre.toLowerCase() === d.nombre.trim().toLowerCase() && l.email.toLowerCase() === d.email.trim().toLowerCase()))
        e.nombre = 'A laboratory with this name and email already exists.'
    }
    if (i === 1) {
      if (d.area && d.area.length !== 3) e.area = 'Enter 3 digits.'
      if (d.numero && d.numero.replace(/\\D/g, '').length !== 7) e.numero = 'Enter 7 digits.'
    }
    setFormato(e)
    return Object.keys(e).length === 0
  }
  const avanzar = () => { if (revisar(paso)) siguiente() }
  const errorDe = (k: keyof typeof VACIO) => falta(k) ?? formato[k]

  const guardar = () => {
    if (!listo() || ![0, 1, 2].every(revisar)) return
    if (credencialesIncompletas(credenciales)) { setIntentoCred(true); return }
    const codigo = d.codigo.match(/\\(([^)]+)\\)/)?.[1] ?? '+1'
    const abreviatura: Record<string, string> = { 'United States of America (the)': 'US', Canada: 'CA', Argentina: 'AR', Spain: 'ES', Mexico: 'MX' }
    onGuardar({
      nombre: d.nombre.trim(), email: d.email.trim(), telefono: \`\${codigo} \${d.area} \${d.numero.replace(/\\D/g, '')}\`,
      direccion: [d.linea1, d.linea2, d.ciudad, d.zip, d.estado, abreviatura[d.pais] ?? d.pais].map((x) => x.trim()).filter(Boolean).join(', '),
    })
    onClose()
  }

  return (
    <ModalShell
      title="New laboratory"
      onClose={onClose}
      width="max-w-[560px]"
      steps={PASOS}
      step={paso}
      actions={<DrawerActions step={paso} total={PASOS.length} onNext={avanzar} onBack={atras} onCancel={onClose} onSave={guardar} />}
    >
      <DrawerStep index={0} step={paso}>
        <DrawerSection title="General information">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Organization name" required placeholder="Laboratory" value={d.nombre} onChange={set('nombre')} error={errorDe('nombre')} />
            <TextField label="Email" required placeholder="laboratory@example.com" value={d.email} onChange={set('email')} error={errorDe('email')} />
          </div>
        </DrawerSection>
      </DrawerStep>

      <DrawerStep index={1} step={paso}>
        <DrawerSection title="Contact information">
          <div className="grid gap-4 sm:grid-cols-2">
            <CountryCodeField required value={d.codigo} onChange={set('codigo')} error={errorDe('codigo')} />
            <TextField label="Area code (3 digits)" required placeholder="555" value={d.area} onChange={(v) => set('area')(soloDigitos(v, 3))} error={errorDe('area')} />
            <TextField label="Number (7 digits)" required placeholder="000-0000" value={d.numero} onChange={(v) => set('numero')(v.replace(/[^\\d-]/g, '').slice(0, 8))} error={errorDe('numero')} />
          </div>
        </DrawerSection>
      </DrawerStep>

      <DrawerStep index={2} step={paso}>
        <DrawerSection title="Address information">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Address line 1" required placeholder="Street name and number" value={d.linea1} onChange={set('linea1')} error={errorDe('linea1')} />
            <TextField label="Address line 2" placeholder="Additional info" value={d.linea2} onChange={set('linea2')} />
            <SelectField label="Country" required options={PAISES} value={d.pais} onChange={set('pais')} error={errorDe('pais')} />
            <SelectField label="State" required placeholder="Select your region" options={ESTADOS} value={d.estado} onChange={set('estado')} error={errorDe('estado')} />
            <TextField label="City" required placeholder="Your city" value={d.ciudad} onChange={set('ciudad')} error={errorDe('ciudad')} />
            <TextField label="ZIP code" required placeholder="Postal code (only numbers)" value={d.zip} onChange={(v) => set('zip')(soloDigitos(v, 10))} error={errorDe('zip')} />
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