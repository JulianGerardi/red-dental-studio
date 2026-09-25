import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  SectionCard, SelectField, TextField, FormFooter,
} from '@/components/patients/form'
import { aviso } from '@/components/ui/toaster'
import { PAISES, CODIGOS, ESTADOS, ZONAS, FEES } from '@/data/location-options'

/* Antes era un modal; el mismo formulario ahora vive en su propia pantalla
   -/settings/locations/new-, con el breadcrumb de \`SettingsLayout\` como
   único camino de vuelta a la lista. Campos y catálogos, sin cambios. */

const VACIO = {
  nombre: '', abreviatura: '', fee: '',
  codigo: CODIGOS[0], area: '', numero: '', email: '',
  linea1: '', linea2: '', pais: PAISES[0], estado: '', ciudad: '', zip: '', zona: '',
}

export function SettingsNewLocation() {
  const navigate = useNavigate()
  const [d, setD] = useState(VACIO)
  const [intentado, setIntentado] = useState(false)
  const set = (k: keyof typeof VACIO) => (v: string) => setD((p) => ({ ...p, [k]: v }))
  const req = (k: keyof typeof VACIO) => (intentado && !d[k].trim() ? 'This field is required.' : undefined)

  const obligatorios: (keyof typeof VACIO)[] =
    ['nombre', 'fee', 'codigo', 'area', 'numero', 'email', 'linea1', 'pais', 'estado', 'ciudad', 'zip', 'zona']

  const volver = () => navigate('/settings/locations')

  const guardar = () => {
    setIntentado(true)
    if (obligatorios.some((k) => !d[k].trim())) return
    aviso.ok(\`\${d.nombre} was added to your locations.\`)
    volver()
  }

  return (
    <div className="px-4 py-6 sm:px-8">
      <h1 className="text-2xl font-bold text-ink">New Location</h1>
      <p className="mt-1 text-sm text-ink-muted">Set your location name. Add the location you need.</p>

      <div className="mt-5 flex flex-col gap-6">
        <SectionCard title="General Information">
          <TextField
            label="Name" required placeholder="Introduce your location name"
            value={d.nombre} onChange={set('nombre')} error={req('nombre')}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Abbreviation" placeholder="Introduce abbreviation"
              value={d.abreviatura} onChange={set('abreviatura')}
            />
            <SelectField
              label="Default Fee Schedule" required placeholder="Select fee schedule"
              options={FEES} value={d.fee} onChange={set('fee')} error={req('fee')}
            />
          </div>
        </SectionCard>

        <SectionCard title="Contact Information">
          <div className="grid gap-4 sm:grid-cols-3">
            <SelectField
              label="Country Code" required options={CODIGOS}
              value={d.codigo} onChange={set('codigo')} error={req('codigo')}
            />
            <TextField
              label="Area Code (3 digits)" required placeholder="555"
              value={d.area} onChange={set('area')} error={req('area')}
            />
            <TextField
              label="Number (7 digits)" required placeholder="000-0000"
              value={d.numero} onChange={set('numero')} error={req('numero')}
            />
          </div>
          <TextField
            className="sm:w-1/2 sm:pr-2" label="Email" required placeholder="example@example.com"
            value={d.email} onChange={set('email')} error={req('email')}
          />
        </SectionCard>

        <SectionCard title="Address Information">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Address Line 1" required placeholder="Street name and number"
              value={d.linea1} onChange={set('linea1')} error={req('linea1')}
            />
            <TextField
              label="Address Line 2" placeholder="Additional info"
              value={d.linea2} onChange={set('linea2')}
            />
            <SelectField
              label="Country" required options={PAISES}
              value={d.pais} onChange={set('pais')} error={req('pais')}
            />
            <SelectField
              label="State" required placeholder="Select your region" options={ESTADOS}
              value={d.estado} onChange={set('estado')} error={req('estado')}
            />
            <TextField
              label="City" required placeholder="Your city"
              value={d.ciudad} onChange={set('ciudad')} error={req('ciudad')}
            />
            <TextField
              label="ZIP Code" required placeholder="Postal code (only numbers)"
              value={d.zip} onChange={set('zip')} error={req('zip')}
            />
          </div>
          <SelectField
            className="sm:w-1/2 sm:pr-2" label="Time Zone" required placeholder="Select your time zone"
            options={ZONAS} value={d.zona} onChange={set('zona')} error={req('zona')}
          />
        </SectionCard>

        <FormFooter onCancel={volver} onSave={guardar} />
      </div>
    </div>
  )
}
`})))()}export{n,i as r,r as t};