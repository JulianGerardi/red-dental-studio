import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { Trash2, Save } from 'lucide-react'
import {
  ModalShell, TextField, SelectField, FormFooter, FieldLabel, OptionCheckbox,
} from '@/components/patients/form'
import { DatePicker } from '@/components/ui/date-picker'
import { aviso } from '@/components/ui/toaster'
import type { Excepcion } from '@/data/location-detail'

/* Figma 3864:317345 "Settings — Location (Exceptions — New Exception
   Modal)". Name / Abreviattion (typo del frame) / Reason, y un recuadro
   propio para el rango con Start Time / Date / End Time y "All day
   exception". Los íconos de basura y guardar que trae el recuadro son
   redundantes con Cancel/Save del pie —así está en el frame— y se los deja
   con la misma acción: borrar vacía el rango, guardar dispara el submit.

   Fecha y horas son desplegables del sistema, no texto libre: el calendario
   es el \`DatePicker\` de shadcn que ya usa el resto de la app, y las horas
   son un \`SelectField\` con la grilla de media hora. Los campos no se apagan
   cuando "All day exception" está tildado —seguían pareciendo deshabilitados
   aunque se podía tipear igual—, sólo dejan de ser obligatorios. */

const RAZONES = ['Holiday', 'Staff Training', 'Maintenance', 'Private Event', 'Other']

const HORAS = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2)
  const m = i % 2 === 0 ? '00' : '30'
  return \`\${String(h).padStart(2, '0')}:\${m} hs\`
})

export function NewExceptionModal({
  inicial, onClose, onGuardar,
}: {
  inicial?: Excepcion
  onClose: () => void
  onGuardar: (e: Omit<Excepcion, 'id'>) => void
}) {
  const [nombre, setNombre] = useState(inicial?.nombre ?? '')
  const [abrev, setAbrev] = useState(inicial?.abreviatura ?? '')
  const [razon, setRazon] = useState(inicial?.razon ?? '')
  const [inicio, setInicio] = useState(inicial?.horaInicio ?? '')
  const [fecha, setFecha] = useState<Date | null>(inicial?.fecha ?? null)
  const [fin, setFin] = useState(inicial?.horaFin ?? '')
  const [todoElDia, setTodoElDia] = useState(inicial?.todoElDia ?? true)
  const [intentado, setIntentado] = useState(false)

  const guardar = () => {
    setIntentado(true)
    if (!nombre.trim() || !abrev.trim() || !fecha || (!todoElDia && (!inicio.trim() || !fin.trim()))) return
    onGuardar({
      nombre, abreviatura: abrev, razon, fecha, todoElDia,
      horaInicio: todoElDia ? '' : inicio, horaFin: todoElDia ? '' : fin,
      estado: 'Active',
    })
    onClose()
  }

  return (
    <ModalShell
      title="New Exception"
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
        <SelectField label="Reason" options={RAZONES} value={razon} onChange={setRazon} />

        <div className="rounded-lg border border-line p-3">
          <div className="flex flex-col gap-4">
            <SelectField
              label="Start Time" required placeholder="00:00 hs" options={HORAS}
              value={inicio} onChange={setInicio}
              error={intentado && !todoElDia && !inicio.trim() ? 'Required.' : undefined}
            />
            <div className="flex flex-col gap-2">
              <FieldLabel required>Date</FieldLabel>
              <DatePicker
                value={fecha} onChange={setFecha} className="h-9 w-full"
                error={intentado && !fecha ? true : undefined}
              />
            </div>
            <SelectField
              label="End Time" required placeholder="00:00 hs" options={HORAS}
              value={fin} onChange={setFin}
              error={intentado && !todoElDia && !fin.trim() ? 'Required.' : undefined}
            />

            <OptionCheckbox label="All day exception" checked={todoElDia} onChange={setTodoElDia} />
          </div>

          <div className="mt-3 flex items-center gap-1">
            <button
              type="button"
              aria-label="Clear range"
              onClick={() => { setInicio(''); setFin(''); aviso.info('Time range cleared.') }}
              className="rounded-md p-1.5 text-ink-muted transition-colors hover:bg-dash-bad-bg hover:text-dash-bad-fg"
            >
              <Trash2 className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Save range"
              onClick={guardar}
              className="rounded-md p-1.5 text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink"
            >
              <Save className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  )
}
`})))()}export{n,i as r,r as t};