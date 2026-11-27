import { Plus, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BOTON_BORRAR } from '@/lib/estilos'
import { Button } from '@/components/ui/button'
import { DateTextField, SelectField, TextField } from '@/components/patients/form'
import { OBLIGATORIO } from '@/lib/validacion'

/* Las credenciales de New laboratory (CON-2285) y New provider (video de red.dev de Referral, 2026-11-27): opcionales, de
   a varias y sin repetir el tipo. Los tipos son los de la ficha de un empleado (la lista real está en el documento que
   cita CON-2285) y la licencia pide vencimiento. Ver design-reference/figma/modulos/clinical-mode.md (2026-11-27). */

export type Credencial = { id: number; tipo: string; numero: string; vence: string }
const TIPOS = ['License', 'DEA', 'NPI']
const CON_VENCIMIENTO = ['License']

/** Falta algún dato obligatorio en alguna credencial. */
export const credencialesIncompletas = (lista: Credencial[]) =>
  lista.some((c) => !c.tipo || !c.numero.trim() || (CON_VENCIMIENTO.includes(c.tipo) && !c.vence.trim()))

export function Credenciales({ value, onChange, intento }: {
  value: Credencial[]
  onChange: (v: Credencial[]) => void
  /** Ya se intentó guardar: muestra lo que falta. */
  intento: boolean
}) {
  const falta = (c: Credencial, k: 'tipo' | 'numero' | 'vence') =>
    intento && !c[k].trim() && (k !== 'vence' || CON_VENCIMIENTO.includes(c.tipo)) ? OBLIGATORIO : undefined
  const cambiar = (id: number, k: keyof Omit<Credencial, 'id'>) => (v: string) => onChange(value.map((c) => (c.id === id ? { ...c, [k]: v } : c)))
  return (
    <>
      {value.length === 0 && <p className="text-[13px] text-ink-muted">No credentials added yet.</p>}
      {value.map((c, i) => (
        <div key={c.id} className="grid items-start gap-4 sm:grid-cols-2">
          <SelectField
            label="Credential type" required options={TIPOS.filter((t) => t === c.tipo || !value.some((x) => x.tipo === t))}
            value={c.tipo} onChange={cambiar(c.id, 'tipo')} error={falta(c, 'tipo')}
          />
          <TextField label="Number" required placeholder="Credential number" value={c.numero} onChange={cambiar(c.id, 'numero')} error={falta(c, 'numero')} />
          <DateTextField label="Expiration date" required={CON_VENCIMIENTO.includes(c.tipo)} value={c.vence} onChange={cambiar(c.id, 'vence')} error={falta(c, 'vence')} />
          <Button variant="secondary" className={cn(BOTON_BORRAR, 'self-end sm:w-fit')} aria-label={`Remove credential ${i + 1}`} onClick={() => onChange(value.filter((x) => x.id !== c.id))}>
            <Trash2 /> Remove
          </Button>
        </div>
      ))}
      {value.length < TIPOS.length && (
        <Button variant="secondary" className="self-start" onClick={() => onChange([...value, { id: Date.now(), tipo: '', numero: '', vence: '' }])}>
          <Plus /> Add credential
        </Button>
      )}
    </>
  )
}
