import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { ModalShell } from '@/components/patients/form'
import { DrawerActions } from '@/components/ui/drawer'
import { Tabs } from '@/components/ui/tabs'
import {
  CamposDemography, CamposGeneral, CamposGuardian, SECCIONES_PACIENTE, limpiarPaciente, useFormPaciente, type SeccionPaciente,
} from '@/components/patients/PacienteCampos'
import { usePatients, VACIO_PACIENTE, type DatosPaciente } from '@/data/patientsStore'
import { aviso } from '@/components/ui/toaster'

/* Figma 5277:123056 (Patients — Edit): Edit Patient desde el menú de una fila de la tabla. A diferencia de New Patient, no
   va por pasos: las tres secciones están a un clic, con los datos ya cargados, y "Save Changes" está siempre y guarda
   todo junto. Cambiar de pestaña no guarda nada. Si al guardar falla algo de otra sección, esa pestaña queda marcada y
   el foco va al campo que hay que corregir (patients.md, 2026-10-22).

   \`id\` es el paciente de la tabla; \`inicial\` pisa los datos (el dashboard del paciente y Storybook); \`seccionInicial\` abre
   en otra pestaña (Storybook). */
export function EditPatientModal({
  id, inicial, seccionInicial = 'General', onClose,
}: {
  id?: string
  inicial?: DatosPaciente
  seccionInicial?: SeccionPaciente
  onClose: () => void
}) {
  const { datosDe, updatePatient } = usePatients()
  const datos = inicial ?? (id ? datosDe(id) : undefined) ?? VACIO_PACIENTE
  /* La cuenta del portal que ya existía no se cambia desde acá: se muestra como "Linked". */
  const portalVinculado = datos.portal
  const f = useFormPaciente(datos, portalVinculado)
  const [seccion, setSeccion] = useState<SeccionPaciente>(seccionInicial)

  const guardar = () => {
    const error = f.revisar(SECCIONES_PACIENTE)
    if (error) { setSeccion(error.seccion); f.enfocar(error.campo); return }
    const guardado = limpiarPaciente(f.d)
    if (id) updatePatient(id, guardado)
    aviso.ok(\`\${[guardado.first, guardado.last].filter(Boolean).join(' ')} has been updated.\`)
    onClose()
  }

  const comunes = { d: f.d, cambiar: f.cambiar, errores: f.errores }
  const panel = (s: SeccionPaciente, contenido: React.ReactNode) => (
    <div role="tabpanel" aria-label={s} hidden={seccion !== s}>{contenido}</div>
  )
  return (
    <ModalShell
      title="Edit Patient"
      description="Update the patient details"
      onClose={onClose}
      width="max-w-[560px]"
      tabs={(
        <Tabs
          aria-label="Patient sections" fullWidth value={seccion} onChange={setSeccion}
          tabs={SECCIONES_PACIENTE.map((s) => ({ value: s, alerta: f.conError(s) }))}
        />
      )}
      actions={<DrawerActions onCancel={onClose} onSave={guardar} saveLabel="Save Changes" />}
    >
      {panel('General', <CamposGeneral {...comunes} portalVinculado={portalVinculado} />)}
      {panel('Guardian', <CamposGuardian {...comunes} />)}
      {panel('Demography', <CamposDemography {...comunes} />)}
    </ModalShell>
  )
}
`})))()}export{n,i as r,r as t};