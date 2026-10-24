import { Calendar } from 'lucide-react'
import { STATUS_STYLE, codigoDiagnostico, type Finding } from './data'

/* Cómo se ve un finding o un diagnóstico en el buscador de vínculos (Link to finding / Link to diagnosis, y las
   pestañas Findings / Diagnostic de Edit Procedure): estado y fecha, el nombre con sus superficies y el área. */
export function OpcionFinding({ finding }: { finding: Pick<Finding, 'condition' | 'area' | 'surfaces' | 'status' | 'date'> }) {
  const style = STATUS_STYLE[finding.status]
  const nombre = finding.condition.charAt(0).toUpperCase() + finding.condition.slice(1)
  return (
    <span className="flex min-w-0 flex-col gap-0.5">
      <span className="flex flex-wrap items-center gap-x-2">
        <span className={`flex items-center gap-1 text-[11px] font-semibold ${style.text}`}>
          <span className={`size-1.5 rounded-full ${style.dot}`} />
          {finding.status}
        </span>
        <span className="text-dash-blue flex items-center gap-1 text-[10px] font-semibold"><Calendar className="size-2.5" /> {finding.date}</span>
      </span>
      <span className="text-[13px] leading-tight font-bold text-ink">
        {nombre}
        {finding.surfaces.length > 0 && <span className="font-semibold text-ink-medium"> - {finding.surfaces.join(', ')}</span>}
      </span>
      <span className="text-[12px] leading-tight text-ink-muted">{finding.area}</span>
    </span>
  )
}

export function OpcionDiagnostico({ code, surfaces }: { code: string; surfaces: string[] }) {
  return (
    <span className="text-[13px] font-bold text-ink">
      {code}
      {surfaces.length > 0 && <span className="font-semibold text-ink-medium"> · {surfaces.join(', ')}</span>}
    </span>
  )
}

/** Un diagnóstico por hallazgo, con su código y sus superficies; se guarda como "K05.31 · B, MB". */
export function candidatosDiagnostico(findings: Finding[]) {
  return findings
    .map((f) => ({ id: f.id, code: codigoDiagnostico(f.condition), surfaces: f.surfaces }))
    .map((d) => ({ ...d, valor: d.surfaces.length ? `${d.code} · ${d.surfaces.join(', ')}` : d.code }))
}
