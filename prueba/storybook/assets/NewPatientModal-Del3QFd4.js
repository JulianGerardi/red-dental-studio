import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { ModalShell } from '@/components/patients/form'
import { DrawerActions, DrawerStep } from '@/components/ui/drawer'
import {
  CamposDemography, CamposGeneral, CamposGuardian, SECCIONES_PACIENTE, limpiarPaciente, useFormPaciente,
} from '@/components/patients/PacienteCampos'
import { usePatients, VACIO_PACIENTE, type DatosPaciente } from '@/data/patientsStore'
import { aviso } from '@/components/ui/toaster'

/* Figma 3751:73452 (Patients — List): New Patient en tres pasos, General → Guardian → Demography. Guardian y Demography son
   opcionales (cada uno lo dice en su aviso) y siempre están: ya no aparece sólo para un menor. Next revisa lo obligatorio
   del paso; Save revisa los tres y vuelve al primero con algo por corregir. Para cambiar un paciente que ya existe, ver
   EditPatientModal (pestañas y Save Changes). Decisiones y anomalías del Figma en modulos/patients.md, 2026-10-22.

   \`inicial\` y \`pasoInicial\` son para Storybook: abrir el formulario con datos o en un paso. */
export function NewPatientModal({
  inicial, pasoInicial = 0, onClose,
}: {
  inicial?: Partial<DatosPaciente>
  pasoInicial?: number
  onClose: () => void
}) {
  const { addPatient } = usePatients()
  const f = useFormPaciente({ ...VACIO_PACIENTE, ...inicial })
  const [paso, setPaso] = useState(pasoInicial)
  const actual = SECCIONES_PACIENTE[paso]!

  const siguiente = () => {
    const error = f.revisar([actual])
    if (error) { f.enfocar(error.campo); return }
    f.reiniciarIntento()
    setPaso((n) => Math.min(n + 1, SECCIONES_PACIENTE.length - 1))
  }
  const atras = () => { f.reiniciarIntento(); setPaso((n) => Math.max(n - 1, 0)) }
  const guardar = () => {
    const error = f.revisar(SECCIONES_PACIENTE)
    if (error) { setPaso(SECCIONES_PACIENTE.indexOf(error.seccion)); f.enfocar(error.campo); return }
    const datos = limpiarPaciente(f.d)
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
      steps={SECCIONES_PACIENTE}
      step={paso}
      actions={<DrawerActions step={paso} total={SECCIONES_PACIENTE.length} onNext={siguiente} onBack={atras} onCancel={onClose} onSave={guardar} />}
    >
      <DrawerStep index={0} step={paso}><CamposGeneral {...comunes} /></DrawerStep>
      <DrawerStep index={1} step={paso}><CamposGuardian {...comunes} /></DrawerStep>
      <DrawerStep index={2} step={paso}><CamposDemography {...comunes} /></DrawerStep>
    </ModalShell>
  )
}
`})))()}export{n,i as r,r as t};