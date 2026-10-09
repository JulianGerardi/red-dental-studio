import { useState } from 'react'
import { FormFooter, ModalShell, TextField } from '@/components/patients/form'
import { cn } from '@/lib/utils'
import { LOCACIONES } from '@/pages/settings/Locations'
import { TABLA_ENCABEZADO, TABLA_FILA, TABLA_MARCO } from '@/lib/estilos'

/* Location Number (red.dev, botón de Edit Carrier): el número que el carrier le asignó a cada locación. Era un diálogo; acá
   es un drawer, como todo lo que carga datos. Ver settings-billing.md. */
export function LocationNumberDrawer({ numeros, onClose, onGuardar }: {
  numeros: Record<string, string>
  onClose: () => void
  onGuardar: (numeros: Record<string, string>) => void
}) {
  const [d, setD] = useState(numeros)
  return (
    <ModalShell
      title="Location Number"
      description="Enter the location number assigned by the insurance carrier for this clinic. This identifier is required to process electronic claims correctly and avoid rejections. Contact the insurance carrier if you do not know the assigned number."
      onClose={onClose}
      width="max-w-[560px]"
      footer={<FormFooter onCancel={onClose} onSave={() => { onGuardar(Object.fromEntries(Object.entries(d).filter(([, v]) => v.trim()))); onClose() }} />}
    >
      <div role="table" aria-label="Location numbers" className={TABLA_MARCO}>
        <div role="row" className={cn('grid grid-cols-[1fr_200px] gap-4', TABLA_ENCABEZADO)}>
          <span role="columnheader">Location Name</span>
          <span role="columnheader">Number</span>
        </div>
        {LOCACIONES.map((l) => (
          <div key={l.id} role="row" className={cn('grid grid-cols-[1fr_200px] gap-4', TABLA_FILA)}>
            <span role="cell">{l.nombre}</span>
            <span role="cell">
              <TextField hideLabel label={`${l.nombre} number`} placeholder="Enter a number" value={d[l.id] ?? ''} onChange={(v) => setD((p) => ({ ...p, [l.id]: v }))} />
            </span>
          </div>
        ))}
      </div>
    </ModalShell>
  )
}
