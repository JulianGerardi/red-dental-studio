import { useEffect, useState } from 'react'
import { ModalShell } from '@/components/patients/form'
import { DrawerActions, DrawerStep } from '@/components/ui/drawer'
import {
  CamposDemography, CamposGeneral, CamposGuardian, SECCIONES_PACIENTE, limpiarPaciente, useFormPaciente,
} from '@/components/patients/PacienteCampos'
import { usePatients, VACIO_PACIENTE, type DatosPaciente } from '@/data/patientsStore'
import { PERSONAS_SISTEMA } from '@/data/personas'
import { aviso } from '@/components/ui/toaster'

/* Figma 3751:73452 (Patients — List): New Patient en tres pasos, General → Guardian → Demography. Guardian y Demography son
   opcionales (cada uno lo dice en su aviso) y siempre están: ya no aparece sólo para un menor. Next revisa lo obligatorio
   del paso; Save revisa los tres y vuelve al primero con algo por corregir. Para cambiar un paciente que ya existe, ver
   EditPatientModal (pestañas y Save Changes). Decisiones y anomalías del Figma en modulos/patients.md, 2026-10-22.
   Vincular a una persona que ya está en el sistema (empleado, contacto, suscriptor): modulos/patients.md, 2026-11-02.

   `inicial`, `pasoInicial` y `personaInicial` son para Storybook: abrir el formulario con datos, en un paso o vinculado. */
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
  const f = useFormPaciente({ ...VACIO_PACIENTE, ...inicial })
  const [paso, setPaso] = useState(pasoInicial)
  const actual = SECCIONES_PACIENTE[paso]!

  /* Lo escrito a mano no se pierde al tildar y destildar: la persona va aparte y reemplaza esos datos recién al guardar. */
  const [vincular, setVincular] = useState(!!personaInicial)
  const [personaNombre, setPersonaNombre] = useState(personaInicial ?? '')
  const [faltaPersona, setFaltaPersona] = useState(false)
  const [focoPersona, setFocoPersona] = useState(0)
  const yaPacientes = new Set(patients.map((p) => p.name.toLowerCase()))
  const candidatos = PERSONAS_SISTEMA.filter((p) => !yaPacientes.has(p.name.toLowerCase()))
  const persona = vincular ? candidatos.find((p) => p.name === personaNombre) : undefined
  const sinPersona = vincular && !persona

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
    setPaso((n) => Math.min(n + 1, SECCIONES_PACIENTE.length - 1))
  }
  const atras = () => { f.reiniciarIntento(); setPaso((n) => Math.max(n - 1, 0)) }
  const guardar = () => {
    if (sinPersona) { pedirPersona(); return }
    const error = f.revisar(vincular ? SECCIONES_PACIENTE.filter((s) => s !== 'General') : SECCIONES_PACIENTE)
    if (error) { setPaso(SECCIONES_PACIENTE.indexOf(error.seccion)); f.enfocar(error.campo); return }
    const datos = limpiarPaciente(persona
      ? { ...f.d, first: persona.first, middle: '', last: persona.last, birthday: persona.dob, email: persona.email }
      : f.d)
    addPatient(datos)
    aviso.ok(`${[datos.first, datos.last].filter(Boolean).join(' ')} has been added to the patient list.`)
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
      <DrawerStep index={1} step={paso}><CamposGuardian {...comunes} /></DrawerStep>
      <DrawerStep index={2} step={paso}><CamposDemography {...comunes} /></DrawerStep>
    </ModalShell>
  )
}
