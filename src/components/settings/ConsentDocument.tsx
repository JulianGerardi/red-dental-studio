import {
  MapPin, Send, User, Stethoscope, CalendarDays, ClipboardList, X, type LucideIcon,
} from 'lucide-react'

/* Preview del consentimiento como lo recibe el paciente: una hoja de papel
   sobre el escritorio gris del panel, no una tarjeta más de la UI. Tipografía
   de la app (Inter), la misma que tenía el preview antes de ser hoja. Detalle en
   design-reference/figma/modulos/consents.md. */

/* "Patient acknowledgment" es el mismo texto en todos los consentimientos:
   no se edita por template, sólo se muestra acá. */
const RECONOCIMIENTOS_PACIENTE = [
  'I have read and understand the information provided.',
  'I had the opportunity to ask questions.',
  'I voluntarily consent to the proposed treatment.',
]

/* Fechas de ejemplo -no vienen del template, son del envío y de la cita del
   paciente-. */
const CONSENT_ENVIADO = 'September 23, 2026 — 10:30 AM'
const [FECHA_CITA, HORA_CITA] = 'October 15, 2026 — 9:00 AM'.split(' — ')

const ETIQUETA = 'text-[10px] font-semibold tracking-wide uppercase'

function Seccion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-3.5">
      <h4 className={`${ETIQUETA} border-b border-[#e4e4e7] pb-1 text-[#71717a]`}>{titulo}</h4>
      <div className="mt-2 text-[#3f3f46]">{children}</div>
    </section>
  )
}

/* Casilla del recuadro de datos: rótulo con ícono arriba, valor abajo. */
function Campo({ icono: Icono, etiqueta, children }: { icono: LucideIcon; etiqueta: string; children: React.ReactNode }) {
  return (
    <div className="bg-white p-2.5">
      <p className={`${ETIQUETA} flex items-center gap-1 text-[#71717a]`}>
        <Icono className="text-dash-blue size-3 shrink-0" /> {etiqueta}
      </p>
      <div className="mt-1.5 text-[12px] leading-snug">{children}</div>
    </div>
  )
}

type Props = {
  titulo: string
  procedimiento?: string
  naturaleza: string
  riesgos: string
  vistaPaciente: boolean
}

export function ConsentDocument({ titulo, procedimiento, naturaleza, riesgos, vistaPaciente }: Props) {
  const lineasRiesgo = riesgos.split('\n').filter(Boolean)
  const vacio = <p className="text-[#a1a1aa]">No content yet.</p>

  return (
    <article
      aria-label="Consent document preview"
      className="mx-auto flex aspect-[8.5/11] w-full max-w-[520px] flex-col bg-white px-6 pt-6 pb-3.5 text-[12px] leading-[1.5] text-[#3f3f46] shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_2px_4px_rgb(0_0_0/0.06),0_14px_28px_-8px_rgb(0_0_0/0.22)]"
    >
      <header className="flex items-center gap-3 border-b-2 border-[#1d56bc] pb-3">
        <span aria-hidden className="bg-dash-blue grid size-9 shrink-0 place-items-center rounded-md text-[12px] font-bold text-white">LA</span>
        <div className="flex min-w-0 flex-col gap-1 text-[11px] text-[#71717a]">
          <p className="flex items-center gap-1 font-semibold text-[#09090b]"><MapPin className="size-3 shrink-0" /> Los Angeles, Dental Clinic</p>
          <p className="flex items-center gap-1"><Send className="size-3 shrink-0" /> Consent sent: {CONSENT_ENVIADO}</p>
        </div>
      </header>

      <div className="mt-4 text-center">
        <p className={`${ETIQUETA} text-[#1d56bc]`}>Informed Consent</p>
        <h3 className="mt-1 text-[17px] leading-tight font-bold text-[#09090b]">{titulo || 'Untitled Consent'}</h3>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-px border border-[#d4d4d8] bg-[#d4d4d8]">
        <Campo icono={User} etiqueta="Patient">
          <p className="font-bold text-[#09090b]">Sarah Stone</p>
          <p className="text-[#71717a]">DOB: 04/02/1991</p>
          <p className="text-[#71717a]">Patient ID: 12345432</p>
        </Campo>
        <Campo icono={Stethoscope} etiqueta="Provider">
          <p className="font-bold text-[#09090b]">John Lorem</p>
        </Campo>
        <Campo icono={CalendarDays} etiqueta="Appointment">
          <p className="font-bold text-[#09090b]">{FECHA_CITA}</p>
          <p className="text-[#71717a]">{HORA_CITA}</p>
        </Campo>
        <Campo icono={ClipboardList} etiqueta="Procedure">
          <p className="font-bold text-[#09090b]">{procedimiento ?? '—'}</p>
        </Campo>
      </div>

      {!vistaPaciente && (
        <>
          <Seccion titulo="Diagnosis"><p>Non-restorable tooth with recurrent infection.</p></Seccion>
          <Seccion titulo="Clinical Findings"><p>Extensive decay affecting tooth structure and surrounding tissue.</p></Seccion>
        </>
      )}

      <Seccion titulo="Nature of procedure">{naturaleza ? <p>{naturaleza}</p> : vacio}</Seccion>

      <Seccion titulo="Risk and complications">
        {lineasRiesgo.length > 0 ? (
          <ul className="list-disc pl-4 marker:text-[#a1a1aa]">
            {lineasRiesgo.map((linea, i) => <li key={i}>{linea}</li>)}
          </ul>
        ) : vacio}
      </Seccion>

      <Seccion titulo="Patient acknowledgment">
        <ul className="flex flex-col gap-1.5">
          {RECONOCIMIENTOS_PACIENTE.map((r) => (
            <li key={r} className="flex gap-2">
              <span aria-hidden className="mt-[3px] size-3 shrink-0 rounded-[3px] border border-[#71717a]" />
              {r}
            </li>
          ))}
        </ul>
      </Seccion>

      <div className="mt-auto grid grid-cols-[1fr_88px] gap-4 pt-7 text-[11px] text-[#a1a1aa]">
        <div className="relative border-t border-[#52525b] pt-1">
          <X aria-hidden className="absolute -top-3.5 left-0 size-3 text-[#a1a1aa]" />
          Patient / Legal Guardian
        </div>
        <div className="border-t border-[#52525b] pt-1">Date</div>
      </div>

      <footer className="mt-3 flex justify-between border-t border-[#f1f1f4] pt-2 text-[10px] text-[#a1a1aa]">
        <span>Sarah Stone · Patient ID 12345432</span>
        <span>Page 1 of 1</span>
      </footer>
    </article>
  )
}
