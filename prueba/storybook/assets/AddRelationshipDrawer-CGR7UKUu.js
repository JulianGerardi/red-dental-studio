import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useMemo, useState } from 'react'
import { Check, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DrawerActions, DrawerSection, DrawerStep } from '@/components/ui/drawer'
import { FieldError, FieldLabel, ModalShell, OptionCheckbox, SelectField, TextField } from '@/components/patients/form'
import { useFormPasos } from '@/lib/useFormPasos'

/* Add Relationship: antes una pantalla aparte (Figma 3716:61372, 3716:62815 y 3716:63601); ahora el drawer de
   Confidentally 2.0 con sus tres pasos: buscar o crear a la persona, sus datos de contacto y la relación con el
   paciente. Los textos del Figma se replican tal cual, incluido "Adress". Ver modulos/relationships.md. */

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
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block text-[13px] font-semibold text-ink">{p.name}</span>
        <span className="block text-[11px] text-ink-muted">
          <span className="text-ink-faint">DOB:</span> {p.dob}
        </span>
        <span className="block text-[11px] text-ink-muted">
          <span className="text-ink-faint">Email:</span> {p.email}
        </span>
      </span>
    </div>
  )
}

/* La dirección de la relación, como las opciones de 2.0: una tarjeta con su punto. */
export function OpcionDireccion({ texto, elegida, onElegir }: { texto: string; elegida: boolean; onElegir: () => void }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={elegida}
      onClick={onElegir}
      className={cn(
        'flex min-h-11 items-center gap-3 rounded-lg border bg-white px-3 py-2 text-left text-[13px] text-ink',
        elegida ? 'border-dash-blue' : 'border-line hover:bg-surface-subtle',
      )}
    >
      <span className={cn('flex size-4 shrink-0 items-center justify-center rounded-full border-2', elegida ? 'border-dash-blue' : 'border-ink-faint')}>
        {elegida && <span className="bg-dash-blue size-[7px] rounded-full" />}
      </span>
      {texto}
    </button>
  )
}

export type NuevaRelacion = {
  name: string
  initials: string
  dob: string
  rol: string
  guardian: boolean
  guarantor: boolean
  phone: string
  email: string
  address: string
}

const VACIO = {
  first: '', last: '', emailNueva: '',
  country: '', number: '', email: '',
  linea1: '', linea2: '', paisDir: '', region: '', ciudad: '', postal: '',
  rel: '',
}

const PASOS = ['Person', 'Contact', 'Relationship'] as const
const iniciales = (nombre: string) => nombre.trim().split(/\\s+/).slice(0, 2).map((x) => x[0]).join('').toUpperCase()

export function AddRelationshipDrawer({
  paciente = 'John Smith', onClose, onGuardar,
}: {
  /** El paciente de la ficha: aparece en las frases de Direction. */
  paciente?: string
  onClose: () => void
  onGuardar: (r: NuevaRelacion) => void
}) {
  const [q, setQ] = useState('')
  const [persona, setPersona] = useState<PersonaDirectorio | null>(null)
  const [nueva, setNueva] = useState(false)
  const [guardian, setGuardian] = useState(false)
  const [guarantor, setGuarantor] = useState(false)
  const [direccion, setDireccion] = useState<0 | 1 | null>(null)
  const [aviso, setAviso] = useState(false)

  const { d, set, falta, paso, siguiente, atras, listo } = useFormPasos(VACIO, [
    nueva ? ['first', 'last'] : [],
    ['country', 'number', 'email', 'linea1', 'linea2', 'paisDir', 'region', 'ciudad', 'postal'],
    ['rel'],
  ])

  const resultados = useMemo(
    () => (q.trim() && !persona ? DIRECTORIO.filter((p) => p.name.toLowerCase().includes(q.trim().toLowerCase())) : []),
    [q, persona],
  )
  const nombre = persona?.name ?? [d.first.trim(), d.last.trim()].filter(Boolean).join(' ')
  const rolTexto = guardian && guarantor ? 'Guardian and Guarantor' : guarantor ? 'Guarantor' : 'Guardian'
  const sinPersona = aviso && paso === 0 && !persona && !nueva
  const sinRol = aviso && paso === 2 && !guardian && !guarantor
  const sinDireccion = aviso && paso === 2 && direccion === null

  const seguir = () => {
    if (paso === 0 && !persona && !nueva) { setAviso(true); return }
    setAviso(false)
    siguiente()
  }
  const guardar = () => {
    setAviso(true)
    if (!persona && !nueva) return
    if (!listo() || (!guardian && !guarantor) || direccion === null) return
    onGuardar({
      name: nombre, initials: persona?.initials ?? iniciales(nombre), dob: persona?.dob ?? '—', rol: d.rel,
      guardian, guarantor, phone: d.number.trim(), email: d.email.trim(),
      address: [d.linea1, d.linea2, d.ciudad, d.region, d.postal].filter(Boolean).join(', '),
    })
    onClose()
  }

  return (
    <ModalShell
      title="Add Relationship"
      description="Link a family member, guardian or guarantor to this patient."
      onClose={onClose}
      width="max-w-[560px]"
      steps={PASOS}
      step={paso}
      actions={<DrawerActions step={paso} total={PASOS.length} onNext={seguir} onBack={() => { setAviso(false); atras() }} onCancel={onClose} onSave={guardar} />}
    >
      <DrawerStep index={0} step={paso}>
        <DrawerSection title="Find or create person">
          <div className="flex flex-col gap-2">
            <FieldLabel required>Select person</FieldLabel>
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
              <input
                value={q}
                onChange={(e) => { setQ(e.target.value); setPersona(null) }}
                placeholder="Search by Name or Last Name"
                aria-label="Select person"
                aria-invalid={sinPersona || undefined}
                disabled={nueva}
                className={cn(
                  'h-9 w-full rounded-md border bg-white pr-3 pl-9 text-[13px] placeholder:text-ink-faint focus:outline-none disabled:bg-surface-subtle',
                  sinPersona ? 'border-field-error' : 'focus:border-dash-blue border-line',
                )}
              />
            </div>
            <FieldError>{sinPersona ? 'Select a person or tick the option to create a new one.' : undefined}</FieldError>
            {resultados.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => { setPersona(p); setQ(p.name) }}
                className="flex items-center gap-3 rounded-lg border border-line bg-white p-3 text-left hover:bg-surface-subtle"
              >
                <span className="bg-dash-blue flex size-9 shrink-0 items-center justify-center rounded-md text-xs font-semibold text-white">{p.initials}</span>
                <span className="min-w-0 leading-tight">
                  <span className="block text-[13px] font-semibold text-ink">{p.name}</span>
                  <span className="block text-[11px] text-ink-muted">DOB: {p.dob}</span>
                </span>
              </button>
            ))}
            {persona && (
              <div className="relative">
                <PersonaSeleccionada p={persona} />
                <span className="bg-dash-ok-fg absolute top-1/2 right-3 flex size-5 -translate-y-1/2 items-center justify-center rounded-full text-white" aria-label="Selected">
                  <Check className="size-3" strokeWidth={3} />
                </span>
              </div>
            )}
          </div>
          <OptionCheckbox
            label="Add New Person"
            checked={nueva}
            onChange={(v) => { setNueva(v); setAviso(false); if (v) { setPersona(null); setQ('') } }}
          />
          {nueva && (
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="First Name" required placeholder="First name" value={d.first} onChange={set('first')} error={falta('first')} />
              <TextField label="Last Name" required placeholder="Last name" value={d.last} onChange={set('last')} error={falta('last')} />
              <TextField className="sm:col-span-2" label="Email" placeholder="Placeholder@gmail.com" value={d.emailNueva} onChange={set('emailNueva')} />
            </div>
          )}
        </DrawerSection>
      </DrawerStep>

      <DrawerStep index={1} step={paso}>
        <DrawerSection title="General Information">
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField label="Country" required value={d.country} onChange={set('country')} error={falta('country')} />
            <TextField label="Number" required placeholder="408-XXX-XXXX" value={d.number} onChange={set('number')} error={falta('number')} />
          </div>
          <TextField label="Email" required placeholder="Placeholder@gmail.com" value={d.email} onChange={set('email')} error={falta('email')} />
        </DrawerSection>
        {/* "Adress" sin doble D y las dos líneas como select: los dos salen del Figma. Anomalías 37 y 38. */}
        <DrawerSection title="Adress Information">
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField label="Adress line 1" required options={['123 Maple Street', '456 Oak Avenue', '789 Pine Road']} value={d.linea1} onChange={set('linea1')} error={falta('linea1')} />
            <SelectField label="Adress line 2" required options={['Apt 2B', 'Suite 300', 'Floor 4']} value={d.linea2} onChange={set('linea2')} error={falta('linea2')} />
            <SelectField label="Country" required value={d.paisDir} onChange={set('paisDir')} error={falta('paisDir')} />
            <SelectField label="Region" required options={['Arizona', 'California', 'Florida', 'New York']} value={d.region} onChange={set('region')} error={falta('region')} />
            <SelectField label="City" required options={['Phoenix', 'Los Angeles', 'Miami', 'New York']} value={d.ciudad} onChange={set('ciudad')} error={falta('ciudad')} />
            <TextField label="Postal Code" required placeholder="5678" value={d.postal} onChange={set('postal')} error={falta('postal')} />
          </div>
        </DrawerSection>
      </DrawerStep>

      <DrawerStep index={2} step={paso}>
        <DrawerSection title="Assign relationship role">
          <div className="flex flex-col gap-2">
            <OptionCheckbox label="Guardian" checked={guardian} onChange={setGuardian} />
            <OptionCheckbox label="Guarantor" checked={guarantor} onChange={setGuarantor} />
            <FieldError>{sinRol ? 'Choose at least one role.' : undefined}</FieldError>
          </div>
        </DrawerSection>
        <DrawerSection title="Direction">
          <div role="radiogroup" aria-label="Direction" className="flex flex-col gap-2">
            <OpcionDireccion texto={\`\${nombre || 'Selected person'} is \${rolTexto} for \${paciente}.\`} elegida={direccion === 0} onElegir={() => setDireccion(0)} />
            <OpcionDireccion texto={\`\${paciente} is \${rolTexto} of \${nombre || 'the selected person'}.\`} elegida={direccion === 1} onElegir={() => setDireccion(1)} />
            <FieldError>{sinDireccion ? 'Choose who is responsible for whom.' : undefined}</FieldError>
          </div>
          <SelectField
            label="Relationship to Patient" required
            options={['Parent', 'Guardian', 'Sibling', 'Spouse', 'Child', 'Other']}
            value={d.rel} onChange={set('rel')} error={falta('rel')}
          />
        </DrawerSection>
      </DrawerStep>
    </ModalShell>
  )
}
`})))()}export{n,i as r,r as t};