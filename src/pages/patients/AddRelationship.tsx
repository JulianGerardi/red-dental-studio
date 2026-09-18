import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PageTitle } from '@/components/ui/page-title'
import { PatientSidePanel } from '@/components/patients/PatientSidePanel'
import {
  TextField, SelectField, FieldLabel, FieldError, OptionCheckbox, FormFooter,
} from '@/components/patients/form'
import { aviso } from '@/components/ui/toaster'
import { CONTENEDOR_PAGINA } from '@/lib/estilos'

/* Figma 3716:61372 (buscar), 3716:62815 (persona existente elegida) y
   3716:63601 (persona nueva). No son tres pantallas distintas: son estados
   del mismo formulario, que reemplaza el contenido de la página — no es un
   modal. Cancel/Save van fuera de la card.

   Los textos se replican tal cual, incluido "Adress". Ver
   modulos/relationships.md, anomalías 37 a 41. */

export type PersonaDirectorio = {
  name: string
  initials: string
  dob: string
  email: string
}

export const DIRECTORIO: PersonaDirectorio[] = [
  { name: 'Michael Miller', initials: 'MM', dob: 'May 14, 1982', email: 'mm.thompson@yahoo.com' },
  { name: 'Jessica Miller', initials: 'JM', dob: 'May 14, 1982', email: 'jessica.miller@gmail.com' },
  { name: 'Robert Miller', initials: 'RM', dob: 'March 2, 1979', email: 'rob.miller@outlook.com' },
]

/* Card de persona del Figma: borde azul, avatar cuadrado y tres líneas. */
export function PersonaSeleccionada({ p }: { p: PersonaDirectorio }) {
  return (
    <div className="border-dash-blue flex items-center gap-3 rounded-lg border bg-white p-3">
      <span className="bg-dash-blue flex size-9 shrink-0 items-center justify-center rounded-md text-xs font-semibold text-white">
        {p.initials}
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block text-[13px] font-semibold text-[#09090b]">{p.name}</span>
        <span className="block text-[11px] text-[#71717a]">
          <span className="text-[#a1a1aa]">DOB:</span> {p.dob}
        </span>
        <span className="block text-[11px] text-[#71717a]">
          <span className="text-[#a1a1aa]">Email:</span> {p.email}
        </span>
      </span>
    </div>
  )
}

const VACIO = {
  country: '', number: '', email: '',
  linea1: '', linea2: '', paisDir: '', region: '', ciudad: '', postal: '',
  rel: '',
}

export default function AddRelationship() {
  const { id = 'john-smith' } = useParams()
  const navigate = useNavigate()
  const volver = () => navigate(`/patients/${id}/relationships`)

  const [q, setQ] = useState('')
  const [persona, setPersona] = useState<PersonaDirectorio | null>(null)
  const [nueva, setNueva] = useState(false)
  const [direccion, setDireccion] = useState(0)
  const [d, setD] = useState(VACIO)
  const [intentado, setIntentado] = useState(false)
  const set = (k: keyof typeof VACIO) => (v: string) => setD((p) => ({ ...p, [k]: v }))

  const resultados = useMemo(
    () => (q.trim() && !persona
      ? DIRECTORIO.filter((p) => p.name.toLowerCase().includes(q.trim().toLowerCase()))
      : []),
    [q, persona],
  )

  /* El formulario largo aparece con una persona elegida o al crear una nueva:
     es lo que separa el estado 3716:61372 de los otros dos. */
  const formulario = !!persona || nueva
  const req = (v: string) => (intentado && !v.trim() ? 'This field is required.' : undefined)
  const sinPersona = intentado && !formulario

  const obligatorios: (keyof typeof VACIO)[] = formulario
    ? ['country', 'number', 'email', 'linea1', 'linea2', 'paisDir', 'region', 'ciudad', 'postal', 'rel']
    : ['rel']

  const guardar = () => {
    setIntentado(true)
    if (!formulario || obligatorios.some((k) => !d[k].trim())) return
    aviso.ok(
      persona
        ? `${persona.name} was added as ${d.rel}.`
        : `New contact added as ${d.rel}.`,
    )
    volver()
  }

  return (
    <div className={CONTENEDOR_PAGINA}>

      {/* Único rastro de navegación que queda arriba: la vuelta a la tabla.
          El breadcrumb completo repetía lo que ya dice el panel lateral. */}
      <Link
        to="/patients"
        className="text-dash-blue mb-3 inline-flex items-center gap-1 text-sm hover:underline"
      >
        <ChevronLeft className="size-4" /> Patients
      </Link>
      <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-start">
        <PatientSidePanel
          name="John Smith" initials="JS" section="Relationships & Billing"
          basePath={`/patients/${id}`} 
        />

        <div className="min-w-0 flex-1">
          <PageTitle>Add Relationship</PageTitle>

          <div className="mt-4 rounded-lg border border-[#e4e4e7] bg-white p-6">
            <h2 className="text-sm font-bold text-[#09090b]">Find or create person</h2>

            <div className="mt-4 grid items-start gap-x-5 gap-y-4 lg:grid-cols-2">
              <div className="flex flex-col gap-2">
                <FieldLabel>Select Person</FieldLabel>
                <div className="relative">
                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#a1a1aa]" />
                  <input
                    value={q}
                    onChange={(e) => { setQ(e.target.value); setPersona(null) }}
                    placeholder="Search..."
                    aria-invalid={sinPersona || undefined}
                    className={cn(
                      'h-9 w-full rounded-md border bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)]',
                      'placeholder:text-[#a1a1aa] focus:outline-none',
                      sinPersona ? 'border-[#dc2626]' : 'focus:border-dash-blue border-[#e4e4e7]',
                    )}
                  />
                </div>
                <FieldError>
                  {sinPersona ? 'Select a person or tick the option to create a new one.' : undefined}
                </FieldError>

                {resultados.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => { setPersona(p); setQ(p.name); setNueva(false) }}
                    className="flex items-center gap-3 rounded-lg border border-[#e4e4e7] bg-white p-3 text-left hover:bg-[#fafafa]"
                  >
                    <span className="bg-dash-blue flex size-9 shrink-0 items-center justify-center rounded-md text-xs font-semibold text-white">
                      {p.initials}
                    </span>
                    <span className="min-w-0 leading-tight">
                      <span className="block text-[13px] font-semibold text-[#09090b]">{p.name}</span>
                      <span className="block text-[11px] text-[#71717a]">DOB: {p.dob}</span>
                    </span>
                  </button>
                ))}
                {persona && <PersonaSeleccionada p={persona} />}
              </div>

              {/* La card de la derecha arranca a la altura del input, no del label. */}
              <div className="flex flex-col gap-2">
                <span aria-hidden className="hidden h-[18px] lg:block" />
                <OptionCheckbox
                  label="Add New Person"
                  checked={nueva}
                  onChange={(v) => { setNueva(v); if (v) { setPersona(null); setQ('') } }}
                />
              </div>
            </div>

            {formulario && (
              <>
                <h3 className="mt-6 text-sm font-bold text-[#09090b]">General Information</h3>
                <div className="mt-4 grid gap-x-5 gap-y-4 lg:grid-cols-2">
                  <SelectField label="Country" required value={d.country} onChange={set('country')} error={req(d.country)} />
                  <TextField label="Number" required placeholder="408-XXX-XXXX" value={d.number} onChange={set('number')} error={req(d.number)} />
                </div>
                <TextField
                  className="mt-4" label="Email" required placeholder="Placeholder@gmail.com"
                  value={d.email} onChange={set('email')} error={req(d.email)}
                />

                {/* "Adress" sin doble D y las dos líneas como select: los dos
                    salen del Figma. Anomalías 37 y 38. */}
                <h3 className="mt-6 text-sm font-bold text-[#09090b]">Adress Information</h3>
                <div className="mt-4 grid gap-x-5 gap-y-4 lg:grid-cols-2">
                  <SelectField label="Adress line 1" required options={['123 Maple Street', '456 Oak Avenue', '789 Pine Road']} value={d.linea1} onChange={set('linea1')} error={req(d.linea1)} />
                  <SelectField label="Adress line 2" required options={['Apt 2B', 'Suite 300', 'Floor 4']} value={d.linea2} onChange={set('linea2')} error={req(d.linea2)} />
                  <SelectField label="Country" required value={d.paisDir} onChange={set('paisDir')} error={req(d.paisDir)} />
                  <SelectField label="Region" required options={['Arizona', 'California', 'Florida', 'New York']} value={d.region} onChange={set('region')} error={req(d.region)} />
                  <SelectField label="City" required options={['Phoenix', 'Los Angeles', 'Miami', 'New York']} value={d.ciudad} onChange={set('ciudad')} error={req(d.ciudad)} />
                  <TextField label="Postal Code" required placeholder="5678" value={d.postal} onChange={set('postal')} error={req(d.postal)} />
                </div>
              </>
            )}

            <h3 className="mt-6 text-sm font-bold text-[#09090b]">Assign relationship role</h3>
            <div className="mt-4 flex flex-col gap-2">
              <FieldLabel required>Role</FieldLabel>
              <div className="grid gap-x-5 gap-y-4 lg:grid-cols-2">
                <OptionCheckbox label="Guardian" />
                <OptionCheckbox label="Guarantor" />
              </div>
            </div>

            {formulario && (
              <div className="mt-4 flex flex-col gap-2">
                <FieldLabel required>Direction</FieldLabel>
                <div className="grid gap-x-5 gap-y-4 lg:grid-cols-2">
                  {[
                    `${persona?.name ?? 'Michael Miller'} is Guardian for John Smith.`,
                    `John Smith is Guardian of ${persona?.name ?? 'Michael Miller'}.`,
                  ].map((txt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setDireccion(i)}
                      className={cn(
                        'flex h-11 items-center gap-3 rounded-lg border bg-white px-3 text-left text-[13px] text-[#09090b]',
                        direccion === i ? 'border-dash-blue' : 'border-[#e4e4e7] hover:bg-[#fafafa]',
                      )}
                    >
                      <span
                        className={cn(
                          'flex size-4 shrink-0 items-center justify-center rounded-full border-2',
                          direccion === i ? 'border-dash-blue' : 'border-[#a1a1aa]',
                        )}
                      >
                        {direccion === i && <span className="bg-dash-blue size-[7px] rounded-full" />}
                      </span>
                      {txt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 grid gap-x-5 lg:grid-cols-2">
              <SelectField
                label="Relationship to Patient" required
                options={['Parent', 'Guardian', 'Sibling', 'Spouse', 'Child', 'Other']}
                value={d.rel} onChange={set('rel')} error={req(d.rel)}
              />
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-3">
            <FormFooter onCancel={volver} onSave={guardar} />
          </div>
        </div>
      </div>
    </div>
  )
}
