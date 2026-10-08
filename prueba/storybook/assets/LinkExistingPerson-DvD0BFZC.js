import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { Search, Delete, X } from 'lucide-react'
import { LinkPersonCheckbox, FieldLabel } from '@/components/patients/form'
import { EMPLEADOS, type Empleado } from '@/data/employees'

/* Compartido por la ficha de empleado y "New Employee". Ver
   design-reference/figma/modulos/employees.md. */
export function LinkExistingPerson({
  vincular, onVincular, excluirId, vinculado, onSeleccionar,
}: {
  vincular: boolean
  onVincular: (v: boolean) => void
  excluirId?: string
  vinculado: Empleado | null
  onSeleccionar: (p: Empleado | null) => void
}) {
  const [busqueda, setBusqueda] = useState('')
  const candidatos = EMPLEADOS.filter((e) => e.esProvider && e.id !== excluirId)
  const resultados = busqueda.trim() && !vinculado
    ? candidatos.filter((p) => p.nombre.toLowerCase().includes(busqueda.trim().toLowerCase()))
    : []
  const limpiar = () => { setBusqueda(''); onSeleccionar(null) }

  return (
    <div className="flex flex-col gap-2">
      <LinkPersonCheckbox checked={vincular} onChange={(v) => { onVincular(v); if (!v) limpiar() }} />

      {vincular && (
        <div className="flex flex-col gap-2">
          <FieldLabel required>Person</FieldLabel>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
              <input
                value={busqueda}
                onChange={(e) => { setBusqueda(e.target.value); onSeleccionar(null) }}
                placeholder="Search providers..."
                className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-9 pl-9 text-[13px] placeholder:text-ink-faint focus:outline-none"
              />
              {busqueda && (
                <button
                  type="button" aria-label="Clear search" onClick={limpiar}
                  className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-0.5 text-ink-faint hover:text-ink-muted"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
            <button
              type="button" aria-label="Reset selection" onClick={limpiar}
              className="bg-dash-blue hover:bg-dash-blue-hover flex size-9 shrink-0 items-center justify-center rounded-md text-white transition-colors"
            >
              <Delete className="size-4" />
            </button>
          </div>

          {resultados.map((p) => (
            <button
              key={p.id} type="button" onClick={() => { onSeleccionar(p); setBusqueda(p.nombre) }}
              className="flex items-center gap-3 rounded-lg border border-line bg-white p-3 text-left hover:bg-surface-subtle"
            >
              <span className="bg-dash-blue flex size-9 shrink-0 items-center justify-center rounded-md text-xs font-semibold text-white">
                {p.iniciales}
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block text-[13px] font-semibold text-ink">{p.nombre}</span>
                <span className="block text-[11px] text-ink-muted">DOB: {p.cumpleanos}</span>
              </span>
            </button>
          ))}

          {vinculado && (
            <div className="border-dash-blue flex items-center gap-3 rounded-lg border bg-[#eff6ff] p-3">
              <span className="bg-dash-blue flex size-9 shrink-0 items-center justify-center rounded-md text-xs font-semibold text-white">
                {vinculado.iniciales}
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block text-[13px] font-bold text-ink uppercase">{vinculado.nombre}</span>
                <span className="block text-[11px] text-ink-muted">
                  <span className="text-ink-faint">DOB:</span> {vinculado.cumpleanos}
                  <span className="text-ink-faint"> Email:</span> {vinculado.email}
                </span>
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
`})))()}export{n,i as r,r as t};