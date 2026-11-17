import { ModalShell } from '@/components/patients/form'
import { DrawerActions } from '@/components/ui/drawer'
import {
  CamposDemography, CamposGeneral, CamposGuardian, limpiarPaciente, useFormPaciente,
} from '@/components/patients/PacienteCampos'
import { usePatients, VACIO_PACIENTE, type DatosPaciente } from '@/data/patientsStore'
import { aviso } from '@/components/ui/toaster'

/* Figma 5277:123056 (Patients — Edit): Edit Patient desde el menú de una fila de la tabla. A diferencia de New Patient, no
   va por pasos ni por pestañas: las secciones van una debajo de la otra con los datos ya cargados, como la ficha de una
   Location, y "Save Changes" guarda todo junto. Si al guardar falla algo, el foco va al campo que hay que corregir
   (patients.md, 2026-11-17).

   `id` es el paciente de la tabla; `inicial` pisa los datos (el dashboard del paciente y Storybook). */
export function EditPatientModal({
  id, inicial, onClose,
}: {
  id?: string
  inicial?: DatosPaciente
  onClose: () => void
}) {
  const { datosDe, updatePatient } = usePatients()
  const datos = inicial ?? (id ? datosDe(id) : undefined) ?? VACIO_PACIENTE
  /* La cuenta del portal que ya existía no se cambia desde acá: se muestra como "Linked". */
  const portalVinculado = datos.portal
  const f = useFormPaciente(datos, { portalVinculado })

  const guardar = () => {
    const error = f.revisar(f.secciones)
    if (error) { f.enfocar(error.campo); return }
    const guardado = limpiarPaciente(f.d, f.menor)
    if (id) updatePatient(id, guardado)
    aviso.ok(`${[guardado.first, guardado.last].filter(Boolean).join(' ')} has been updated.`)
    onClose()
  }

  const comunes = { d: f.d, cambiar: f.cambiar, errores: f.errores }
  return (
    <ModalShell
      title="Edit Patient"
      onClose={onClose}
      width="max-w-[560px]"
      actions={<DrawerActions onCancel={onClose} onSave={guardar} saveLabel="Save Changes" />}
    >
      {/* Guardian, sólo para un menor (patients.md, 2026-11-04). */}
      <div className="flex flex-col gap-6">
        <CamposGeneral {...comunes} portalVinculado={portalVinculado} />
        {f.menor && <CamposGuardian {...comunes} />}
        <CamposDemography {...comunes} />
      </div>
    </ModalShell>
  )
}
