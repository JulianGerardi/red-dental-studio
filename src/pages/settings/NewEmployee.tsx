import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  SectionCard, TextField, SelectField, DateField, FormFooter,
} from '@/components/patients/form'
import { LinkExistingPerson } from '@/components/settings/LinkExistingPerson'
import { CODIGOS, PAISES, ESTADOS } from '@/data/location-options'
import { type Empleado } from '@/data/employees'
import { aviso } from '@/components/ui/toaster'

/* Antes era un modal (`NewEmployeeModal.tsx`); misma lógica que "New
   Location": pasa a su propia pantalla -/settings/team/new-, con el
   breadcrumb de `SettingsLayout` como único camino de vuelta a la lista, sin
   tope de ancho -mismo criterio que "New Location" y que la ficha de un
   empleado-. El contenido no cambió: mismas tres cards, mismos catálogos. */

const VACIO = {
  first: '', middle: '', last: '', email: '', birthday: '',
  codigo: CODIGOS[0], area: '', numero: '', ext: '',
  linea1: '', linea2: '', pais: PAISES[0], estado: '', ciudad: '', zip: '',
}

export function SettingsNewEmployee() {
  const navigate = useNavigate()
  const [d, setD] = useState(VACIO)
  const [intentado, setIntentado] = useState(false)
  const [vincular, setVincular] = useState(false)
  const [vinculado, setVinculado] = useState<Empleado | null>(null)
  const set = (k: keyof typeof VACIO) => (v: string) => setD((p) => ({ ...p, [k]: v }))
  const req = (k: keyof typeof VACIO) => (intentado && !vincular && !d[k].trim() ? 'This field is required.' : undefined)

  const obligatorios: (keyof typeof VACIO)[] = vincular
    ? ['codigo', 'area', 'numero', 'linea1', 'pais', 'estado', 'ciudad', 'zip']
    : ['first', 'last', 'email', 'birthday', 'codigo', 'area', 'numero', 'linea1', 'pais', 'estado', 'ciudad', 'zip']

  const volver = () => navigate('/settings/team')

  const guardar = () => {
    setIntentado(true)
    if (vincular && !vinculado) return
    if (obligatorios.some((k) => !d[k].trim())) return
    const nombre = vincular && vinculado ? vinculado.nombre : `${d.first} ${d.last}`
    aviso.ok(`${nombre} was added to your employees.`)
    volver()
  }

  return (
    <div className="px-4 py-6 sm:px-8">
      <h1 className="text-2xl font-bold text-ink">New Employee</h1>
      <p className="mt-1 text-sm text-ink-muted">Everyone with access to the practice, across every location.</p>

      <div className="mt-5 flex flex-col gap-6">
        <SectionCard title="General Information">
          <LinkExistingPerson
            vincular={vincular}
            onVincular={setVincular}
            vinculado={vinculado}
            onSeleccionar={setVinculado}
          />
          {!vincular && (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <TextField
                  label="First name" required placeholder="First name"
                  value={d.first} onChange={set('first')} error={req('first')}
                />
                <TextField
                  label="Middle name" placeholder="Middle name"
                  value={d.middle} onChange={set('middle')}
                />
                <TextField
                  label="Last name" required placeholder="Last name"
                  value={d.last} onChange={set('last')} error={req('last')}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextField
                  label="Email" required placeholder="Email"
                  value={d.email} onChange={set('email')} error={req('email')}
                />
                <DateField
                  label="Birthdate" required placeholder="Birthdate"
                  onChange={set('birthday')} error={req('birthday')}
                />
              </div>
            </>
          )}
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
            className="sm:w-1/2 sm:pr-2" label="Extension" placeholder="Extension"
            value={d.ext} onChange={set('ext')}
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
        </SectionCard>

        <FormFooter onCancel={volver} onSave={guardar} />
      </div>
    </div>
  )
}
