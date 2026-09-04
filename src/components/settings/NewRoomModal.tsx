import { useState } from 'react'
import { ModalShell, TextField, SelectField, FormFooter } from '@/components/patients/form'
import type { Sala } from '@/data/location-detail'

/* Figma 3864:306314 "Settings — Location (Rooms — New Room Modal)". Tres
   campos: Name, Abreviattion (typo del frame) y Type. Mismo modal para
   crear y para editar —con `inicial` precarga y el título cambia a "Edit
   Room", que no viene del frame pero es la convención del resto del
   sistema para este mismo patrón (Assign Role, New Exception). */

const TIPOS = ['Operatory', 'Consultation', 'X-Ray', 'Sterilization', 'Reception']

export function NewRoomModal({
  inicial, onClose, onGuardar,
}: {
  inicial?: Sala
  onClose: () => void
  onGuardar: (nombre: string, abrev: string, tipo: string) => void
}) {
  const [nombre, setNombre] = useState(inicial?.nombre ?? '')
  const [abrev, setAbrev] = useState(inicial?.abreviatura ?? '')
  const [tipo, setTipo] = useState(inicial?.tipo ?? '')
  const [intentado, setIntentado] = useState(false)

  const guardar = () => {
    setIntentado(true)
    if (!nombre.trim() || !abrev.trim()) return
    onGuardar(nombre, abrev, tipo)
    onClose()
  }

  return (
    <ModalShell
      title={inicial ? 'Edit Room' : 'New Room'}
      onClose={onClose}
      width="max-w-[420px]"
      footer={<FormFooter onCancel={onClose} onSave={guardar} />}
    >
      <div className="flex flex-col gap-4">
        <TextField
          label="Name" required placeholder="Select" value={nombre} onChange={setNombre}
          error={intentado && !nombre.trim() ? 'This field is required.' : undefined}
        />
        <TextField
          label="Abreviattion" required placeholder="Placeholder" value={abrev} onChange={setAbrev}
          error={intentado && !abrev.trim() ? 'This field is required.' : undefined}
        />
        <SelectField label="Type" options={TIPOS} value={tipo} onChange={setTipo} />
      </div>
    </ModalShell>
  )
}
