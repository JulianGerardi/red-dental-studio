import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/* La hoja del consentimiento con el formato del PDF que genera red.dev: clínica y fecha arriba, INFORMED CONSENT, el título y
   una card por sección con su rótulo en banda gris. En el preview de un template los datos del paciente son de ejemplo,
   los mismos de red.dev. Ver consents.md (2026-11-24, preview a pantalla completa). */

export const MUESTRA_PDF = {
  clinica: 'Sample Dental Clinic',
  direccion: '123 Main St, Springfield, IL, 62701',
  creado: 'September 23, 2026 — 10:30 AM',
  paciente: ['John Sample', 'DOB: January 1, 1990', 'Patient ID: 12345342'],
  proveedor: ['Dr. Jane Sample', 'General Dentist'],
  turno: 'January 1, 2030 — 9:00 AM',
  procedimiento: 'D0000 — Sample procedure',
  zona: 'Tooth/area: Tooth #19 — Occlusal surface',
  diagnostico: 'K02.9 — Dental caries, unspecified',
  hallazgos: 'Caries detected on the occlusal surface of tooth #19.',
}

export const RECONOCIMIENTOS_PDF = [
  'I have read and understood the information provided.',
  'I had the opportunity to ask questions.',
  'My questions were answered to my satisfaction.',
  'I voluntarily consent to the proposed treatment.',
]

function Seccion({ titulo, children }: { titulo?: string; children: ReactNode }) {
  return (
    <section className="rounded-lg p-5 shadow-hairline">
      {titulo && <h3 className="mb-4 rounded-md bg-surface-subtle px-2 py-2.5 text-[13px] font-bold text-ink">{titulo}</h3>}
      <div className="text-[14px] leading-[1.5] text-ink-soft">{children}</div>
    </section>
  )
}

const Lineas = ({ lineas }: { lineas: string[] }) => <>{lineas.map((l) => <p key={l}>{l}</p>)}</>

export function HojaConsentimientoPdf({ titulo, procedimiento, naturaleza, riesgos, className }: {
  titulo: string
  /** "D7240 — Removal of impacted tooth"; sin procedimientos, el de ejemplo. */
  procedimiento?: string
  naturaleza: string
  /** Un riesgo por línea. */
  riesgos: string
  className?: string
}) {
  const lineasRiesgo = riesgos.split('\n').filter(Boolean)
  const vacio = <p className="text-ink-faint">No content yet.</p>
  return (
    <article
      aria-label="Consent document preview"
      className={cn('flex flex-col gap-5 bg-white px-5 py-6 shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_2px_4px_rgb(0_0_0/0.06),0_14px_28px_-8px_rgb(0_0_0/0.22)] sm:px-9 sm:py-8', className)}
    >
        <header className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2 border-b border-line pb-5">
          <div>
            <p className="text-xl leading-tight font-bold text-dash-blue">{MUESTRA_PDF.clinica}</p>
            <p className="text-[15px] text-ink">{MUESTRA_PDF.direccion}</p>
          </div>
          <p className="text-[13px] text-ink sm:text-right">Consent created<br />{MUESTRA_PDF.creado}</p>
        </header>

        <h2 className="text-lg font-bold text-ink uppercase">Informed consent</h2>
        <p className="-mt-1 text-lg font-bold text-ink">{titulo || <span className="text-ink-faint">Untitled template</span>}</p>

        <Seccion titulo="Patient"><Lineas lineas={MUESTRA_PDF.paciente} /></Seccion>
        <Seccion titulo="Provider"><Lineas lineas={MUESTRA_PDF.proveedor} /></Seccion>
        <Seccion titulo="Appointment"><p>{MUESTRA_PDF.turno}</p></Seccion>
        <Seccion titulo="Procedure"><Lineas lineas={[procedimiento ?? MUESTRA_PDF.procedimiento, MUESTRA_PDF.zona]} /></Seccion>
        <Seccion titulo="Diagnosis"><p>{MUESTRA_PDF.diagnostico}</p></Seccion>
        <Seccion titulo="Clinical findings"><p>{MUESTRA_PDF.hallazgos}</p></Seccion>

        <Seccion titulo="Nature of procedure">{naturaleza ? <p className="whitespace-pre-line">{naturaleza}</p> : vacio}</Seccion>
        <Seccion titulo="Risk and complications">
          {lineasRiesgo.length ? <ul className="list-disc pl-5">{lineasRiesgo.map((r) => <li key={r}>{r}</li>)}</ul> : vacio}
        </Seccion>

        <Seccion titulo="Patient acknowledgment">
          <ul className="list-disc pl-5">{RECONOCIMIENTOS_PDF.map((r) => <li key={r}>{r}</li>)}</ul>
        </Seccion>
        <Seccion titulo="Patient/Guardian Signature">
          <div className="w-full max-w-[290px] rounded-md bg-surface-muted px-3.5 py-3">
            <p>Date and time</p>
            <p>[Completed when signed]</p>
          </div>
        </Seccion>
    </article>
  )
}
