import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import { Count } from '@/components/ui/count'
import { Switch } from '@/components/ui/switch'
import { TARJETA_INTERNA } from '@/lib/estilos'
import { CATEGORIAS_PERMISOS } from '@/data/roles'

/* Los permisos de un rol, por categoría (red.dev): cada una se pliega, dice cuántos tiene tildados ("1/6") y lleva el
   switch "All permissions" para tildar o destildar la categoría entera (CON-3411). Sólo lectura en un rol del sistema
   (CON-4065). Ver design-reference/figma/modulos/roles.md. */
export function PermissionsPicker({
  value, onChange, readOnly, abiertasIniciales = [],
}: {
  value: string[]
  onChange?: (v: string[]) => void
  readOnly?: boolean
  /** Categorías que arrancan desplegadas. */
  abiertasIniciales?: string[]
}) {
  const [abiertas, setAbiertas] = useState<string[]>(abiertasIniciales)
  const todasAbiertas = abiertas.length === CATEGORIAS_PERMISOS.length
  const alternar = (nombre: string) => setAbiertas((a) => (a.includes(nombre) ? a.filter((x) => x !== nombre) : [...a, nombre]))
  const cambiar = (ids: string[], on: boolean) => onChange?.(on ? [...new Set([...value, ...ids])] : value.filter((id) => !ids.includes(id)))

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[13px] text-ink-muted">
          <span className="font-semibold text-ink tabular-nums">{value.length}</span> permissions selected
        </p>
        <button
          type="button"
          onClick={() => setAbiertas(todasAbiertas ? [] : CATEGORIAS_PERMISOS.map((c) => c.nombre))}
          className="rounded text-[13px] font-medium text-dash-blue hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue"
        >
          {todasAbiertas ? 'Collapse all' : 'Expand all'}
        </button>
      </div>

      {CATEGORIAS_PERMISOS.map((c) => {
        const ids = c.permisos.map((x) => x.id)
        const tildados = ids.filter((id) => value.includes(id)).length
        const todos = tildados === ids.length
        const abierta = abiertas.includes(c.nombre)
        const cuerpo = \`permisos-\${c.nombre.replace(/\\W+/g, '-').toLowerCase()}\`
        return (
          <section key={c.nombre} className={cn(TARJETA_INTERNA, 'overflow-hidden')}>
            <div className={cn('flex min-h-11 items-center gap-3 pr-3', abierta && 'bg-surface-alt')}>
              <button
                type="button"
                aria-expanded={abierta}
                aria-controls={cuerpo}
                onClick={() => alternar(c.nombre)}
                className="flex min-h-11 min-w-0 flex-1 items-center gap-2 pl-3 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-dash-blue"
              >
                <ChevronDown aria-hidden className={cn('size-4 shrink-0 text-ink-muted transition-transform', !abierta && '-rotate-90')} />
                <span className="truncate text-[13px] font-semibold text-ink">{c.nombre}</span>
                <Count active={tildados > 0} className="tabular-nums">{tildados}/{ids.length}</Count>
              </button>
              <label className="flex shrink-0 items-center gap-2 text-[12px] text-ink-muted">
                <span className="max-sm:sr-only">All permissions</span>
                <Switch
                  size="sm"
                  checked={todos}
                  disabled={readOnly}
                  onCheckedChange={(v) => cambiar(ids, v)}
                  aria-label={\`All \${c.nombre} permissions\`}
                />
              </label>
            </div>
            {abierta && (
              <ul id={cuerpo} className="grid gap-x-4 gap-y-3 border-t border-line-row p-3 sm:grid-cols-2">
                {c.permisos.map((x) => {
                  const on = value.includes(x.id)
                  return (
                    <li key={x.id} className="flex items-start gap-2.5">
                      <Checkbox on={on} onChange={(v) => cambiar([x.id], v)} label={x.nombre} disabled={readOnly} className="mt-0.5" />
                      <button
                        type="button"
                        tabIndex={-1}
                        disabled={readOnly}
                        onClick={() => cambiar([x.id], !on)}
                        className="flex min-w-0 flex-col gap-0.5 text-left disabled:cursor-default"
                      >
                        <span className="text-[13px] font-medium text-ink">{x.nombre}</span>
                        <span className="text-[12px] leading-snug text-ink-muted">{x.detalle}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </section>
        )
      })}
    </div>
  )
}
`})))()}export{n,i as r,r as t};