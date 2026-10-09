import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useRef } from 'react'
import { FileSearch, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SelectField, TextField } from '@/components/patients/form'
import { EmptyState } from '@/components/ui/empty-state'
import { ICONO_SUELTO, TABLA_ENCABEZADO, TABLA_FILA, TABLA_MARCO } from '@/lib/estilos'
import { TIPOS_DEDUCIBLE, excepcionesEnRango, type Excepcion, type Rango, type TipoCobertura, type TipoDeducible } from '@/data/finanzas'

/* La tabla de rangos de una coverage table, la de la plantilla y la de cada plan (red.dev, Coverage Table): un rango de
   códigos, su categoría, el tipo de deducible y lo que paga. En el celular cada rango baja a dos columnas. */

const COLUMNAS = 'sm:grid-cols-[minmax(170px,1.3fr)_minmax(140px,1.6fr)_150px_110px_40px_32px]'

export const rangoVacio = (): Rango => ({ id: \`r-\${Math.random().toString(36).slice(2, 8)}\`, desde: '', hasta: '', categoria: '', deducible: 'None', valor: 0 })

/* Un rango está completo con los dos códigos y la categoría; el valor puede ser 0. */
export const rangoCompleto = (r: Rango) => !!(r.desde.trim() && r.hasta.trim() && r.categoria.trim())

export function RangesTable({
  tipo, rangos, onChange, excepciones = [], intentado, nuevo,
}: {
  /** El rango recién agregado con Add Range: baja hasta él, lo resalta y pone el foco en su primer campo. */
  nuevo?: string
  tipo: TipoCobertura
  rangos: Rango[]
  onChange: (rangos: Rango[]) => void
  /** Las excepciones de la plantilla: la columna Exc cuenta las que caen en cada rango. */
  excepciones?: Excepcion[]
  /** Después de Save: marca en rojo lo que falta. */
  intentado?: boolean
}) {
  const cambiar = (id: string, parte: Partial<Rango>) => onChange(rangos.map((r) => (r.id === id ? { ...r, ...parte } : r)))
  const codigo = (v: string) => v.toUpperCase().replace(/[^D0-9]/g, '').slice(0, 5)
  const falta = (v: string) => (intentado && !v.trim() ? 'Required' : undefined)
  const porcentaje = tipo === 'Percentage'
  const tabla = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!nuevo) return
    const fila = tabla.current?.querySelector<HTMLElement>(\`[data-rango="\${nuevo}"]\`)
    fila?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    fila?.querySelector('input')?.focus({ preventScroll: true })
  }, [nuevo])

  return (
    <div ref={tabla} role="table" aria-label="Coverage ranges" className={TABLA_MARCO}>
      <div role="row" className={cn('hidden gap-3 sm:grid', TABLA_ENCABEZADO, COLUMNAS)}>
        <span role="columnheader">Code Ranges<span className="text-required">*</span></span>
        <span role="columnheader">Category<span className="text-required">*</span></span>
        <span role="columnheader">Deductible Type<span className="text-required">*</span></span>
        <span role="columnheader">{porcentaje ? 'Coverage %' : 'Copayment'}<span className="text-required">*</span></span>
        <span role="columnheader" title="Exceptions">Exc</span>
        <span role="columnheader"><span className="sr-only">Actions</span></span>
      </div>

      {rangos.length === 0 ? (
        <EmptyState icon={FileSearch} title="No procedure ranges found" detail="Make sure there are available ranges or try adding a new one." className="border-t border-line-row py-10" />
      ) : (
        rangos.map((r, i) => (
          <div
            key={r.id} role="row" data-rango={r.id}
            className={cn('grid grid-cols-2 gap-3', TABLA_FILA, 'items-start', COLUMNAS, r.id === nuevo && 'motion-safe:animate-[rango-nuevo_1.6s_ease-out]')}
          >
            <div role="cell" className="col-span-2 flex items-start gap-2 sm:col-span-1">
              <TextField hideLabel label={\`Range \${i + 1} from\`} placeholder="R. Min" value={r.desde} onChange={(v) => cambiar(r.id, { desde: codigo(v) })} error={falta(r.desde)} className="min-w-0 flex-1" />
              <span className="pt-2 text-ink-faint">-</span>
              <TextField hideLabel label={\`Range \${i + 1} to\`} placeholder="R. Max" value={r.hasta} onChange={(v) => cambiar(r.id, { hasta: codigo(v) })} error={falta(r.hasta)} className="min-w-0 flex-1" />
            </div>
            <div role="cell" className="col-span-2 sm:col-span-1">
              <TextField hideLabel label={\`Range \${i + 1} category\`} placeholder="Category" value={r.categoria} onChange={(v) => cambiar(r.id, { categoria: v })} error={falta(r.categoria)} />
            </div>
            <div role="cell">
              <SelectField hideLabel label={\`Range \${i + 1} deductible type\`} options={[...TIPOS_DEDUCIBLE]} value={r.deducible} onChange={(v) => cambiar(r.id, { deducible: v as TipoDeducible })} />
            </div>
            <div role="cell">
              <TextField
                hideLabel label={\`Range \${i + 1} \${porcentaje ? 'coverage %' : 'copayment'}\`} placeholder={porcentaje ? 'Coverage %' : '$0.00'}
                value={String(r.valor)} onChange={(v) => cambiar(r.id, { valor: Math.min(porcentaje ? 100 : 99999, Number(v.replace(/[^\\d.]/g, '')) || 0) })}
              />
            </div>
            <span role="cell" className="flex h-9 items-center tabular-nums" aria-label={\`\${excepcionesEnRango(r, excepciones)} exceptions\`}>
              <span className="mr-1 text-xs sm:hidden">Exc</span>{excepcionesEnRango(r, excepciones)}
            </span>
            <span role="cell" className="flex h-9 items-center justify-end">
              <button type="button" aria-label={\`Remove range \${i + 1}\`} onClick={() => onChange(rangos.filter((x) => x.id !== r.id))} className={cn(ICONO_SUELTO, 'text-dash-bad-fg')}>
                <Trash2 className="size-4" />
              </button>
            </span>
          </div>
        ))
      )}
    </div>
  )
}
`})))()}export{n,i as r,r as t};