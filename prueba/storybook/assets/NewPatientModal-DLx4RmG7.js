import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useState } from 'react'
import { ModalShell } from '@/components/patients/form'
import { DrawerActions, DrawerStep } from '@/components/ui/drawer'
import {
  CamposDemography, CamposGeneral, CamposGuardian, limpiarPaciente, useFormPaciente,
} from '@/components/patients/PacienteCampos'
import { usePatients, VACIO_PACIENTE, type DatosPaciente } from '@/data/patientsStore'
import { PERSONAS_SISTEMA } from '@/data/personas'
import { aviso } from '@/components/ui/toaster'

/* Figma 3751:73452 (Patients — List): New Patient en pasos, General → Guardian → Demography. Guardian aparece sólo si el
   paciente es menor de 18, y entonces es obligatorio (CON-2858); Demography es opcional. Next revisa lo obligatorio
   del paso; Save revisa los tres y vuelve al primero con algo por corregir. Para cambiar un paciente que ya existe, ver
   EditPatientModal (pestañas y Save Changes). Decisiones y anomalías del Figma en modulos/patients.md, 2026-10-22.
   Vincular a una persona que ya está en el sistema (empleado, contacto, suscriptor): modulos/patients.md, 2026-11-02.
   Guardian como en 2.0 (buscar o Add New Person, obligatorio para un menor; CON-2858): modulos/patients.md, 2026-11-04.

   \`inicial\`, \`pasoInicial\` y \`personaInicial\` son para Storybook: abrir el formulario con datos, en un paso o vinculado. */
export function NewPatientModal({
  inicial, pasoInicial = 0, personaInicial, onClose,
}: {
  inicial?: Partial<DatosPaciente>
  pasoInicial?: number
  /** Abre con "link a person that already exists" tildado y esta persona elegida. */
  personaInicial?: string
  onClose: () => void
}) {
  const { patients, addPatient } = usePatients()
  const [pasoElegido, setPaso] = useState(pasoInicial)

  /* Lo escrito a mano no se pierde al tildar y destildar: la persona va aparte y reemplaza esos datos recién al guardar. */
  const [vincular, setVincular] = useState(!!personaInicial)
  const [personaNombre, setPersonaNombre] = useState(personaInicial ?? '')
  const [faltaPersona, setFaltaPersona] = useState(false)
  const [focoPersona, setFocoPersona] = useState(0)
  const yaPacientes = new Set(patients.map((p) => p.name.toLowerCase()))
  const candidatos = PERSONAS_SISTEMA.filter((p) => !yaPacientes.has(p.name.toLowerCase()))
  const persona = vincular ? candidatos.find((p) => p.name === personaNombre) : undefined
  const sinPersona = vincular && !persona
  /* Un menor necesita guardián (CON-2858); vinculado, la edad sale de la persona elegida. */
  const f = useFormPaciente({ ...VACIO_PACIENTE, ...inicial }, { guardianMenor: true, nacimiento: persona?.dob })
  /* Los pasos dependen de la edad: el nacimiento sólo se cambia en General (paso 0), así que el índice no queda colgado. */
  const pasos = f.secciones
  const paso = Math.min(pasoElegido, pasos.length - 1)
  const actual = pasos[paso]!

  useEffect(() => {
    if (focoPersona) document.querySelector<HTMLElement>('[data-campo="persona"] input')?.focus()
  }, [focoPersona])

  const pedirPersona = () => { setPaso(0); setFaltaPersona(true); setFocoPersona(Date.now()) }

  const siguiente = () => {
    if (paso === 0 && vincular) {
      if (sinPersona) { pedirPersona(); return }
    } else {
      const error = f.revisar([actual])
      if (error) { f.enfocar(error.campo); return }
    }
    f.reiniciarIntento()
    setPaso(Math.min(paso + 1, pasos.length - 1))
  }
  const atras = () => { f.reiniciarIntento(); setPaso(Math.max(paso - 1, 0)) }
  const guardar = () => {
    if (sinPersona) { pedirPersona(); return }
    const error = f.revisar(vincular ? pasos.filter((s) => s !== 'General') : pasos)
    if (error) { setPaso(pasos.indexOf(error.seccion)); f.enfocar(error.campo); return }
    const datos = limpiarPaciente(persona
      ? { ...f.d, first: persona.first, middle: '', last: persona.last, birthday: persona.dob, email: persona.email }
      : f.d, f.menor)
    addPatient(datos)
    aviso.ok(\`\${[datos.first, datos.last].filter(Boolean).join(' ')} has been added to the patient list.\`)
    onClose()
  }

  const comunes = { d: f.d, cambiar: f.cambiar, errores: f.errores }
  return (
    <ModalShell
      title="New Patient"
      description="Create the patient record"
      onClose={onClose}
      width="max-w-[560px]"
      steps={pasos}
      step={paso}
      actions={<DrawerActions step={paso} total={pasos.length} onNext={siguiente} onBack={atras} onCancel={onClose} onSave={guardar} />}
    >
      <DrawerStep index={0} step={paso}>
        <CamposGeneral
          {...comunes}
          vinculo={{
            activo: vincular,
            onActivo: (v) => { setVincular(v); setFaltaPersona(false); f.reiniciarIntento() },
            personas: candidatos,
            valor: personaNombre,
            onValor: setPersonaNombre,
            error: faltaPersona && sinPersona ? 'Select a person or untick the option to enter the details.' : undefined,
          }}
        />
      </DrawerStep>
      {f.menor && <DrawerStep index={1} step={paso}><CamposGuardian {...comunes} obligatorio excluir={persona?.name} /></DrawerStep>}
      <DrawerStep index={pasos.length - 1} step={paso}><CamposDemography {...comunes} /></DrawerStep>
    </ModalShell>
  )
}
`})))()}export{n,i as r,r as t};