import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { DrawerActions, DrawerSection } from '@/components/ui/drawer'
import { useState } from 'react'
import { FieldLabel, ModalShell, TextField, SelectField } from '@/components/patients/form'
import { Switch } from '@/components/ui/switch'
import { TIPOS_SALA, type Sala } from '@/data/location-detail'

/* New Room / Edit Room (CON-404): Name* y Type* obligatorios, Abbreviation opcional y el estado. El nombre no se repite
   en la locación. Desactivar desde acá pasa por las mismas preguntas que desde la tabla. Ver figma/modulos/locations.md. */

export function NewRoomModal({
  inicial, nombresUsados = [], onClose, onGuardar,
}: {
  inicial?: Sala
  /** Nombres de las otras salas de la locación, para avisar el repetido. */
  nombresUsados?: string[]
  onClose: () => void
  onGuardar: (sala: Sala) => void
}) {
  const [nombre, setNombre] = useState(inicial?.nombre ?? '')
  const [abrev, setAbrev] = useState(inicial?.abreviatura ?? '')
  const [tipo, setTipo] = useState(inicial?.tipo ?? '')
  const [activa, setActiva] = useState(inicial?.activa ?? true)
  const [intentado, setIntentado] = useState(false)

  const repetido = nombresUsados.some((n) => n.trim().toLowerCase() === nombre.trim().toLowerCase())
  const errorNombre = !intentado ? undefined : !nombre.trim() ? 'This field is required.' : repetido ? 'Name already exists.' : undefined
  const errorTipo = intentado && !tipo ? 'This field is required.' : undefined

  const guardar = () => {
    setIntentado(true)
    if (!nombre.trim() || !tipo || repetido) return
    onGuardar({
      id: inicial?.id ?? \`sala-\${Date.now()}\`,
      nombre: nombre.trim(), abreviatura: abrev.trim().toUpperCase(), tipo, activa,
      turnos: inicial?.turnos ?? [],
    })
    onClose()
  }

  return (
    <ModalShell
      title={inicial ? 'Edit Room' : 'New Room'}
      description="Rooms can be booked for appointments during the location's working hours."
      onClose={onClose}
      width="max-w-[560px]"
      actions={<DrawerActions onCancel={onClose} onSave={guardar} />}
    >
      <DrawerSection title="General Information">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Name" required placeholder="Operatory 1" value={nombre} onChange={setNombre} error={errorNombre} />
          <TextField label="Abbreviation" placeholder="OP1" value={abrev} onChange={setAbrev} />
          <SelectField label="Type" required placeholder="Select a type" options={TIPOS_SALA} value={tipo} onChange={setTipo} error={errorTipo} />
          <div className="flex flex-col gap-2">
            <FieldLabel>Status</FieldLabel>
            <label className="flex h-9 items-center gap-2 text-[13px] text-ink">
              <Switch checked={activa} onCheckedChange={setActiva} aria-label="Active room" />
              {activa ? 'Active' : 'Inactive'}
            </label>
          </div>
        </div>
      </DrawerSection>
    </ModalShell>
  )
}
`})))()}export{n,i as r,r as t};