import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { cn } from '@/lib/utils'
import { DESCRIPTOR_ROWS, type DescriptorRow } from './data'

/* La guía visual de descriptores de una condition, con el diseño de Figma *Platform Design* 5294:107675 ("Edit Finding",
   Selected Descriptors): una fila por atributo, con el rótulo a la izquierda y las opciones como un control segmentado
   -caja gris con la elegida en azul-. La lógica es la nuestra: cada fila es de una sola elección y ninguna es
   obligatoria; tocar la opción ya marcada la deselecciona, y las filas con muchas opciones (Colors) pasan a otra línea
   en vez de achicarse. Ver design-reference/figma/modulos/clinical-mode.md (2026-10-24). */
export function DescriptorFields({
  value, onChange, rows = DESCRIPTOR_ROWS,
}: {
  value: Record<string, string>
  onChange: (next: Record<string, string>) => void
  rows?: DescriptorRow[]
}) {
  return (
    <div className="flex w-full flex-col gap-5">
      {rows.map((row) => (
        <div key={row.id} role="group" aria-label={row.label} className="flex w-full items-center gap-3">
          <span className="w-[72px] shrink-0 text-[10px] leading-[14px] font-semibold text-ink">{row.label}</span>
          <div className="flex min-w-0 flex-1 flex-wrap gap-1 rounded-[4px] bg-surface-muted p-[3px]">
            {row.options.map((opt) => {
              const on = value[row.id] === opt
              return (
                <button
                  key={opt} type="button" aria-pressed={on}
                  onClick={() => onChange({ ...value, [row.id]: on ? '' : opt })}
                  className={cn(
                    'min-w-[52px] flex-1 rounded-[4px] px-2 py-[3px] text-center text-[10px] leading-[14px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-dash-blue',
                    on ? 'bg-dash-blue text-white' : 'text-ink-muted hover:bg-white',
                  )}
                >
                  {opt}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

/** El texto de una fila a la vez, para \`Finding.descriptor\` -lo que ve la card-: sólo las filas con algo elegido. */
export function textoDescriptores(value: Record<string, string>) {
  return Object.values(value).filter(Boolean).join(', ')
}
`})))()}export{n,i as r,r as t};