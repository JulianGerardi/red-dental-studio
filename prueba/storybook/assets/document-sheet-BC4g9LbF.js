import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/* La hoja de todo documento de la app (consentimientos, clinical notes, lab orders…), igual al PDF que se descarga:
   membrete de la clínica, tipo y título, el resumen en una tabla de tres columnas, secciones numeradas, firmas lado a
   lado y el pie. Va adentro de ui/document-viewer. Propuesta B de Julián (2026-11-24): ver
   design-reference/figma/README.md › Hoja de documentos. */

/** \`detail\`: sede, dirección y contacto; cada línea separada con \\n, como en el PDF. */
export type DocumentClinic = { initials: string; name: string; detail: string }
export type DocumentSignature = {
  /** Quién firma y en qué carácter: "Patient / legal guardian", "Provider". */
  role: string
  name: string
  /** Firmada: el trazo (imagen) o el nombre escrito, y cuándo. Sin esto, la línea vacía con "Pending signature". */
  signed?: { date: string; image?: string; text?: string }
}

export function DocumentSheet({ clinic, meta, type, title, summary, sections, signatures, footer, className }: {
  clinic: DocumentClinic
  /** A la derecha del membrete: el rótulo y la fecha ("Consent sent", "09/23/2026 — 10:30 AM"). */
  meta?: [label: string, value: string]
  /** El tipo de documento, chico y en azul: "Informed consent", "Dental clinical note". */
  type: string
  title: string
  /** Los datos del encabezado, en una tabla de tres columnas (dos en el celular). */
  summary: { label: string; value: ReactNode }[]
  /** Numeradas: en un documento legal se citan ("punto 3"). */
  sections: { title: string; content: ReactNode }[]
  signatures?: DocumentSignature[]
  /** El pie de cada página: clínica, documento y paciente. */
  footer: string
  className?: string
}) {
  return (
    <article
      aria-label={\`\${type} document\`}
      className={cn(
        'mx-auto flex w-full max-w-[816px] flex-col bg-surface px-5 py-6 text-[13px] leading-[1.55] text-ink-soft shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_2px_4px_rgb(0_0_0/0.05),0_16px_32px_-12px_rgb(0_0_0/0.22)] sm:px-14 sm:py-12',
        className,
      )}
    >
      <header className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3 border-b-2 border-ink pb-4">
        <div className="flex min-w-0 items-center gap-3">
          <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-lg bg-dash-blue text-[14px] font-bold text-white">{clinic.initials}</span>
          <span className="flex min-w-0 flex-col">
            <span className="text-[15px] font-bold text-ink">{clinic.name}</span>
            <span className="text-[12px] whitespace-pre-line text-ink-muted">{clinic.detail}</span>
          </span>
        </div>
        {meta && (
          <p className="text-[12px] text-ink-muted tabular-nums sm:text-right">
            <span className="block font-semibold text-ink">{meta[0]}</span>{meta[1]}
          </p>
        )}
      </header>

      <p className="mt-6 text-[11px] font-bold tracking-[0.12em] text-dash-blue uppercase">{type}</p>
      <h3 className="mt-1 text-[20px] leading-tight font-bold text-balance text-ink">{title}</h3>

      <div className="mt-5 overflow-hidden rounded-md border border-line-row">
        <dl className="-mr-px -mb-px grid grid-cols-2 sm:grid-cols-3">
          {summary.map((s) => (
            <div key={s.label} className="min-w-0 border-r border-b border-line-row px-3 py-2.5">
              <dt className="text-[10px] font-semibold tracking-[0.08em] text-ink-muted uppercase">{s.label}</dt>
              <dd className="mt-0.5 font-medium break-words text-ink">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {sections.map((s, i) => (
        <section key={s.title} className="mt-6">
          <h4 className="flex items-baseline gap-2.5 text-[14px] font-bold text-ink">
            <span className="text-dash-blue font-semibold tabular-nums">{i + 1}</span>{s.title}
          </h4>
          <div className="mt-1.5">{s.content}</div>
        </section>
      ))}

      {signatures && signatures.length > 0 && (
        <section aria-label="Signatures" className="mt-auto grid gap-8 pt-10 sm:grid-cols-2 sm:gap-10">
          {signatures.map((f) => (
            <div key={f.role} className="flex flex-col gap-1">
              <div className="flex h-14 items-end border-b border-ink pb-1">
                {f.signed?.image
                  ? <img src={f.signed.image} alt={\`Signature of \${f.name}\`} className="max-h-14 max-w-[260px] object-contain" />
                  : f.signed
                    ? <span className="font-serif text-[22px] leading-none text-dash-blue italic">{f.signed.text || f.name}</span>
                    : <span className="text-[12px] text-ink-faint italic">Pending signature</span>}
              </div>
              <span className="text-[12px] font-semibold text-ink">{f.name} · {f.role}</span>
              <span className="text-[11px] text-ink-muted">{f.signed ? \`Signed electronically · \${f.signed.date}\` : 'Not signed yet'}</span>
            </div>
          ))}
        </section>
      )}

      <footer className="mt-8 flex justify-between gap-4 border-t border-line-row pt-2.5 text-[10px] text-ink-faint tabular-nums">
        <span>{footer}</span>
        <span className="shrink-0">Page 1 of 1</span>
      </footer>
    </article>
  )
}
`})))()}export{n,i as r,r as t};