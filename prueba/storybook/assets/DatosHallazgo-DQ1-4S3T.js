import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { ReactNode } from 'react'
import { CalendarDays, FileSpreadsheet, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Pill, type PillTone } from '@/components/ui/pill'
import { ScopeIcon } from './ScopeIcons'
import type { FindingStatus, ProcedureScope } from './data'

/* Los datos de un finding arriba de Edit Finding, Edit Condition y Edit Procedure (Figma 5294:107675, 5301:149072 y
   5294:85084): una fila por dato, card blanca con la línea azul a la izquierda y sombra suave, con el ícono en un
   cuadradito, el rótulo en semibold y el valor a la derecha. La píldora del Figma mide 6,5 px de texto: acá usa la
   \`Pill\` chica del sistema (10 px), que sí se lee. Ver design-reference/figma/modulos/clinical-mode.md (2026-10-24). */

const TARJETA = 'flex items-center gap-1.5 rounded-md border-l-[3px] border-dash-blue bg-white px-2.5 py-3 pl-3.5 shadow-[0_1px_1.5px_rgb(0_0_0/0.1),0_1px_1px_rgb(0_0_0/0.1)]'

export function FilaDato({ icono, rotulo, children }: { icono: ReactNode; rotulo: string; children?: ReactNode }) {
  return (
    <div className={TARJETA}>
      <span className="flex min-w-0 flex-1 items-center gap-1.5">
        {icono}
        <span className="text-xs font-semibold text-ink">{rotulo}</span>
      </span>
      {children !== undefined && <span className="shrink-0 text-right text-xs text-ink">{children}</span>}
    </div>
  )
}

const CUADRADO = 'flex size-[22px] shrink-0 items-center justify-center rounded-[4px] bg-white text-ink [&_svg]:size-[13px]'
export const IconoFecha = () => <span className={CUADRADO}><CalendarDays /></span>
export const IconoProveedor = () => <span className={CUADRADO}><User /></span>
export const IconoExamen = () => <span className={CUADRADO}><FileSpreadsheet /></span>

/** El nombre del finding con su estado a la derecha; con \`alcances\`, los íconos de diente/cuadrante/arcada delante. */
export function FilaNombre({ alcances, nombre, estado, tono = 'success' }: {
  alcances?: ProcedureScope[]
  nombre: string
  estado: string
  tono?: PillTone
}) {
  return (
    <div className={cn(TARJETA)}>
      <span className="flex min-w-0 flex-1 items-center gap-1.5">
        {alcances?.map((a) => (
          <span key={a} className="flex size-[22px] shrink-0 items-center justify-center rounded-[4px] bg-dash-blue">
            <ScopeIcon scope={a} />
          </span>
        ))}
        <span className="min-w-0 text-xs font-semibold text-ink">{nombre}</span>
      </span>
      <Pill tone={tono} size="sm" className="shrink-0">{estado}</Pill>
    </div>
  )
}

/** "May 14, 2026" -> "14 / 05 / 2026", como lo muestra el Figma; si no se puede leer, el texto tal cual. */
export function fechaCorta(texto: string) {
  const d = new Date(texto)
  if (Number.isNaN(d.getTime())) return texto
  const dd = String(d.getDate()).padStart(2, '0'), mm = String(d.getMonth() + 1).padStart(2, '0')
  return \`\${dd} / \${mm} / \${d.getFullYear()}\`
}

export const mayuscula = (t: string) => t.charAt(0).toUpperCase() + t.slice(1)

/** El tono de la píldora de estado: el mismo criterio de color que la card del finding. */
export const TONO_ESTADO: Record<FindingStatus, PillTone> = {
  Active: 'success', Monitoring: 'warning', 'In Treatment': 'info', Treated: 'success', 'Externally Treated': 'success',
  'No Treatment Needed': 'danger', 'Patient Declined': 'danger', 'Clinic Declined': 'danger', Discarded: 'danger',
}
`})))()}export{n,i as r,r as t};