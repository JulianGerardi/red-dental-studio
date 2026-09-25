import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import {
  ModalShell, SectionCard, TextField, SelectField, DateField, SearchField,
  LinkPersonCheckbox, OptionCheckbox, FormFooter,
} from '@/components/patients/form'
import { usePatients, type NuevoPaciente } from '@/data/patientsStore'
import { aviso } from '@/components/ui/toaster'

/* Figma 3639:55808 (base) y 3640:56478 (con guardián).
   La variante con guardián sólo agrega una tercera sección debajo de la
   columna izquierda; el resto es idéntico.

   El Figma muestra las dos variantes como frames sueltos y NO indica qué las
   alterna: los dos checkboxes de General Information tienen texto propio y
   ninguno habla de guardianes. Acá la sección aparece cuando la fecha de
   nacimiento da **menor de 18**, que es la regla real detrás del guardián y no
   obliga a inventar un control. Ver README.md, Desviaciones. */
const MAYORIA = 18

function esMenor(texto: string) {
  const f = new Date(texto)
  if (Number.isNaN(f.getTime())) return false
  const hoy = new Date()
  let edad = hoy.getFullYear() - f.getFullYear()
  const m = hoy.getMonth() - f.getMonth()
  if (m < 0 || (m === 0 && hoy.getDate() < f.getDate())) edad--
  return edad < MAYORIA
}
const VACIO: NuevoPaciente = { first: '', middle: '', last: '', email: '', birthday: '', gender: '' }

export function NewPatientModal({
  title = 'New Patient',
  forceGuardian = false,
  editId,
  inicial,
  onClose,
}: {
  title?: string
  forceGuardian?: boolean
  /** Si viene, guarda sobre ese paciente en vez de crear uno nuevo. */
  editId?: string
  inicial?: Partial<NuevoPaciente>
  onClose: () => void
}) {
  const { addPatient, updatePatient } = usePatients()
  const [d, setD] = useState<NuevoPaciente>({ ...VACIO, ...inicial })
  const withGuardian = forceGuardian || esMenor(d.birthday)
  const [intentado, setIntentado] = useState(false)
  const set = (k: keyof NuevoPaciente) => (v: string) => setD((p) => ({ ...p, [k]: v }))
  /* Los campos obligatorios se marcan en rojo recién después del primer
     intento de guardar, para no señalar errores antes de tiempo. El aviso
     va debajo del campo; el toast se reserva para el final de la acción. */
  const falta = (v: string) => (intentado && !v.trim() ? 'This field is required.' : undefined)

  const guardar = () => {
    /* Los campos marcados con * son los que el Figma exige. */
    setIntentado(true)
    if (!d.first.trim() || !d.last.trim() || !d.birthday.trim() || !d.gender.trim()) return
    const nombre = [d.first, d.last].filter(Boolean).join(' ')
    if (editId) {
      updatePatient(editId, d)
      aviso.ok(\`\${nombre} has been updated.\`)
    } else {
      addPatient(d)
      aviso.ok(\`\${nombre} has been added to the patient list.\`)
    }
    onClose()
  }

  return (
    <ModalShell
      title={title}
      onClose={onClose}
      footer={<FormFooter onCancel={onClose} onSave={guardar} />}
    >
      <div className="grid gap-7 lg:grid-cols-2">
        <div className="flex flex-col gap-7">
          <SectionCard title="General Information">
            <LinkPersonCheckbox />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <TextField label="First Name" required placeholder="John" value={d.first} onChange={set('first')} error={falta(d.first)} />
              <TextField label="Middle Name" placeholder="Lorem" value={d.middle} onChange={set('middle')} />
              <TextField label="Last Name" required placeholder="Smith" value={d.last} onChange={set('last')} error={falta(d.last)} />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextField label="Email" placeholder="john.smith@hotmail.c..." value={d.email} onChange={set('email')} />
              <DateField label="Birthdate" required onChange={set('birthday')} error={falta(d.birthday)} />
            </div>
            <OptionCheckbox label="Create a new user account with this email address" />
          </SectionCard>

          {withGuardian && (
            <SectionCard title="Guardian Information">
              <SearchField label="Select Person" options={['Jessica Miller', 'Michael Miller', 'Robert Miller']} />
              <OptionCheckbox label="Add new person" defaultChecked={false} />
              <OptionCheckbox label="This person is also the guarantor" defaultChecked={false} />
              <SelectField
                label="Relationship to Patient"
                required
                options={['Parent', 'Guardian', 'Sibling', 'Spouse', 'Other']}
              />
            </SectionCard>
          )}
        </div>

        <SectionCard title="Demographic Information">
          <SelectField label="Gender" required value={d.gender} onChange={set('gender')} error={falta(d.gender)} />
          <SelectField label="Race" />
          <SelectField label="Ethnicity" />
          <SelectField label="Profession" />
          <SelectField label="Nationality" />
          <SelectField label="Language" />
          <OptionCheckbox label="Interpreter Required" />
          <SelectField label="Religion" />
        </SectionCard>
      </div>
    </ModalShell>
  )
}
`})))()}export{n,i as r,r as t};