import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { Calendar, Check, X } from 'lucide-react'
import { SCOPES, STATUS_STYLE, codigoDiagnostico, type Finding, type ProcedureOption } from './data'

/* Cómo se ve un finding, un diagnóstico o una condition en los buscadores (Link to finding / Link to diagnosis, las
   pestañas Findings / Diagnostic de Edit Procedure, la condition de New Condition): el contenido de la card de un
   resultado, con el estilo de la card de finding de la app -estado, fecha, nombre en negrita, Exams y Location-, como
   red.dev muestra sus resultados (grabación de Julián, 2026-10-24). */
const mayuscula = (t: string) => t.charAt(0).toUpperCase() + t.slice(1)

export function OpcionFinding({ finding }: { finding: Pick<Finding, 'condition' | 'area' | 'surfaces' | 'status' | 'date' | 'examen'> }) {
  const style = STATUS_STYLE[finding.status]
  return (
    <span className="flex min-w-0 flex-col gap-2">
      <span className="flex flex-wrap items-center gap-2">
        <span className={\`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold \${style.badge}\`}>
          {style.good ? <Check className="size-2.5" strokeWidth={3} /> : <X className="size-2.5" />}
          {finding.status}
        </span>
        <span className="text-dash-blue flex items-center gap-1 text-[10px] font-semibold"><Calendar className="size-2.5" /> {finding.date}</span>
      </span>
      <span className="flex flex-col gap-0.5 pl-1">
        <span className="text-xs font-extrabold text-ink">
          {mayuscula(finding.condition)}
          {finding.surfaces.length > 0 && <span className="font-semibold text-ink-medium"> - {finding.surfaces.join(', ')}</span>}
        </span>
        {finding.examen && <span className="text-xs text-ink">Exams: <span className="text-ink-muted">{finding.examen}</span></span>}
        <span className="text-xs text-ink">Location: <span className="text-ink-muted">{finding.area}</span></span>
      </span>
    </span>
  )
}

export function OpcionDiagnostico({ code, descripcion, detalle }: { code: string; descripcion: string; detalle?: string }) {
  return (
    <span className="flex min-w-0 flex-col gap-0.5">
      <span className="text-xs font-bold text-ink">{code} - {descripcion}</span>
      {detalle && <span className="text-[11px] text-ink-muted">{detalle}</span>}
    </span>
  )
}

export function OpcionCondicion({ nombre, grupo }: { nombre: string; grupo?: string }) {
  return (
    <span className="text-xs font-bold text-ink">
      {nombre}
      {grupo && <span className="font-medium text-ink-muted"> ({grupo})</span>}
    </span>
  )
}

/** Un diagnóstico por hallazgo, con su código y sus superficies; se guarda como "K05.31 · B, MB". */
export function candidatosDiagnostico(findings: Finding[]) {
  return findings.map((f) => {
    const code = codigoDiagnostico(f.condition)
    const valor = f.surfaces.length ? \`\${code} · \${f.surfaces.join(', ')}\` : code
    const detalle = [f.area, f.surfaces.join(', ')].filter(Boolean).join(' · ')
    return { id: f.id, code, surfaces: f.surfaces, valor, descripcion: mayuscula(f.condition), detalle }
  })
}

/** Un procedimiento del catálogo en el buscador de New Procedure: código y descripción, y debajo dónde se puede cargar. */
export function OpcionProcedimiento({ procedure }: { procedure: ProcedureOption }) {
  const alcances = SCOPES.filter((s) => s !== 'Surface' || procedure.area === 'Surface')
  return (
    <span className="flex min-w-0 flex-col gap-1.5">
      <span className="text-xs">
        <span className="font-bold text-dash-blue">{procedure.code} - </span>
        <span className="font-medium text-ink">{procedure.label}</span>
      </span>
      <span className="flex flex-wrap gap-1">
        {alcances.map((s) => <span key={s} className="rounded bg-dash-count-bg px-1.5 py-0.5 text-[10px] font-semibold text-dash-blue">{s}</span>)}
      </span>
    </span>
  )
}
`})))()}export{n,i as r,r as t};