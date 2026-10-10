import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import {
  ModalShell, TextField, SelectField, DateField, SearchField,
  LinkPersonCheckbox, OptionCheckbox,
} from '@/components/patients/form'
import { DrawerActions, DrawerSection, DrawerStep } from '@/components/ui/drawer'
import { Alert } from '@/components/ui/alert'
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
const PERSONAS = ['Jessica Miller', 'Michael Miller', 'Robert Miller', 'Sarah Stone', 'Daniel Anderson']

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
  /* Como New Patient de Confidentally 2.0: "link a person that already exists" cambia los datos por un buscador y suma
     el paso de guardián. El guardián también aparece si la fecha de nacimiento da menor de edad (regla de acá). */
  const [vincular, setVincular] = useState(false)
  const [persona, setPersona] = useState('')
  const withGuardian = forceGuardian || vincular || esMenor(d.birthday)
  const [intentado, setIntentado] = useState(false)
  const set = (k: keyof NuevoPaciente) => (v: string) => setD((p) => ({ ...p, [k]: v }))
  /* Los obligatorios se marcan en rojo recién después del primer intento de seguir o guardar. */
  const falta = (v: string) => (intentado && !v.trim() ? 'This field is required.' : undefined)
  const pasos = withGuardian ? ['General', 'Guardian', 'Demography'] : ['General', 'Demography']
  const [paso, setPaso] = useState(0)
  const actual = pasos[Math.min(paso, pasos.length - 1)]!
  const faltaGeneral = vincular ? !persona.trim() : !d.first.trim() || !d.last.trim() || !d.birthday.trim()
  const siguiente = () => {
    if (actual === 'General' && faltaGeneral) { setIntentado(true); return }
    setIntentado(false)
    setPaso((n) => Math.min(n + 1, pasos.length - 1))
  }

  const guardar = () => {
    setIntentado(true)
    if (faltaGeneral) { setPaso(0); return }
    if (!d.gender.trim()) return
    const [first = '', ...resto] = vincular ? persona.split(' ') : [d.first]
    const datos = vincular ? { ...d, first, last: resto.join(' ') } : d
    const nombre = [datos.first, datos.last].filter(Boolean).join(' ')
    if (editId) {
      updatePatient(editId, datos)
      aviso.ok(\`\${nombre} has been updated.\`)
    } else {
      addPatient(datos)
      aviso.ok(\`\${nombre} has been added to the patient list.\`)
    }
    onClose()
  }

  return (
    <ModalShell
      title={title}
      description={editId ? 'Update the patient details' : 'Create the patient record'}
      onClose={onClose}
      width="max-w-[560px]"
      steps={pasos}
      step={paso}
      actions={<DrawerActions step={paso} total={pasos.length} onNext={siguiente} onBack={() => setPaso((n) => n - 1)} onCancel={onClose} onSave={guardar} />}
    >
      <DrawerStep index={pasos.indexOf('General')} step={paso}>
        <DrawerSection title="General Information">
          <LinkPersonCheckbox checked={vincular} onChange={(v) => { setVincular(v); setIntentado(false) }} />
          <OptionCheckbox label="Interpreter Required" defaultChecked={false} />
          <OptionCheckbox label="Create a new user account with this email address" />
          {vincular ? (
            <>
              <SearchField
                label="Select Person" required placeholder="Search by Name or Last Name" options={PERSONAS}
                value={persona} onChange={setPersona} error={falta(persona)}
              />
              {persona && <Alert tone="warning" title="If underage, you must enable a guarantor in the next step" />}
            </>
          ) : (
            <>
              {/* De a dos, como Edit Patient: nunca tres por fila (Components / UI / Drawer → Specs → Fields). */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextField label="First Name" required placeholder="John" value={d.first} onChange={set('first')} error={falta(d.first)} />
                <TextField label="Middle Name" placeholder="Lorem" value={d.middle} onChange={set('middle')} />
                <TextField label="Last Name" required placeholder="Smith" value={d.last} onChange={set('last')} error={falta(d.last)} />
                <DateField label="Birthdate" required onChange={set('birthday')} error={falta(d.birthday)} />
                <TextField label="Email" placeholder="john.smith@hotmail.com" value={d.email} onChange={set('email')} />
              </div>
            </>
          )}
        </DrawerSection>
      </DrawerStep>

      {withGuardian && (
        <DrawerStep index={pasos.indexOf('Guardian')} step={paso}>
          <DrawerSection title="Guardian Information">
            <OptionCheckbox label="Add new person" defaultChecked={false} />
            <OptionCheckbox label="This person is also the guarantor" defaultChecked={false} />
            <SearchField label="Select Person" placeholder="Search by Name or Last Name" options={PERSONAS} />
            <SelectField label="Relationship to Patient" required options={['Parent', 'Guardian', 'Sibling', 'Spouse', 'Other']} />
          </DrawerSection>
        </DrawerStep>
      )}

      <DrawerStep index={pasos.indexOf('Demography')} step={paso}>
        <DrawerSection title="Demography Information">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectField label="Gender" required value={d.gender} onChange={set('gender')} error={falta(d.gender)} />
            <SelectField label="Race" />
            <SelectField label="Ethnicity" />
            <SelectField label="Profession" />
            <SelectField label="Nationality" />
            <SelectField label="Language" />
            <SelectField label="Religion" />
          </div>
        </DrawerSection>
      </DrawerStep>
    </ModalShell>
  )
}
`})))()}export{n,i as r,r as t};