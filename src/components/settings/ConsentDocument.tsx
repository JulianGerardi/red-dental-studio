import { cn } from '@/lib/utils'
import {
  Check, MapPin, Send, User, Stethoscope, CalendarDays, ClipboardList, X, type LucideIcon,
} from 'lucide-react'

/* Preview del consentimiento como lo recibe el paciente: una hoja de papel
   sobre el escritorio gris del panel, no una tarjeta más de la UI. Tipografía
   de la app (Inter), la misma que tenía el preview antes de ser hoja. Detalle en
   design-reference/figma/modulos/consents.md. */

/* "Patient acknowledgment" es el mismo texto en todos los consentimientos:
   no se edita por template, sólo se muestra acá. */
export const RECONOCIMIENTOS_PACIENTE = [
  'I have read and understand the information provided regarding the proposed treatment.',
  'I have had the opportunity to ask questions and have received satisfactory answers.',
  'I understand the potential risks, benefits, and alternatives to the proposed treatment.',
  'I understand that I may choose to decline the proposed treatment.',
  'I voluntarily consent to the proposed treatment.',
]
export const AVISO_RECONOCIMIENTOS = 'All acknowledgment checkboxes must be completed before the patient can sign the consent.'

/* Fechas de ejemplo -no vienen del template, son del envío y de la cita del
   paciente-. */
const CONSENT_ENVIADO = 'September 23, 2026 — 10:30 AM'
const [FECHA_CITA, HORA_CITA] = 'October 15, 2026 — 9:00 AM'.split(' — ')

const ETIQUETA = 'text-[10px] font-semibold tracking-wide uppercase'

/* El texto del template es HTML del editor: los H2 se ven como el rótulo de una sección de la hoja. */
const PROSA_HOJA =
  '[&_h1]:mt-3.5 [&_h1]:text-[13px] [&_h1]:font-bold [&_h1]:text-ink [&_h2]:mt-3.5 [&_h2]:mb-2 [&_h2]:border-b [&_h2]:border-line [&_h2]:pb-1 [&_h2]:text-[10px] [&_h2]:font-semibold [&_h2]:tracking-wide [&_h2]:text-ink-muted [&_h2]:uppercase [&_p]:my-1 [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:marker:text-ink-faint [&_ol]:list-decimal [&_ol]:pl-4'

/* Texto sin etiquetas: para saber si el consentimiento está vacío. */
export const textoPlano = (html: string) => html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()

/* Deja sólo las etiquetas que produce la barra de formato y les saca los atributos: el preview pinta lo que se escribió. */
const PERMITIDAS = new Set(['B', 'STRONG', 'I', 'EM', 'U', 'H1', 'H2', 'H3', 'P', 'BR', 'UL', 'OL', 'LI', 'DIV'])
export function limpiarHtml(html: string) {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const limpiar = (padre: Node) => {
    for (const n of [...padre.childNodes]) {
      if (n.nodeType === Node.TEXT_NODE) continue
      if (n.nodeType !== Node.ELEMENT_NODE || ['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED'].includes((n as Element).tagName)) { n.remove(); continue }
      const el = n as Element
      limpiar(el)
      if (!PERMITIDAS.has(el.tagName)) { el.replaceWith(...el.childNodes); continue }
      for (const a of [...el.attributes]) el.removeAttribute(a.name)
    }
  }
  limpiar(doc.body)
  return doc.body.innerHTML
}

export function Seccion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-3.5">
      <h4 className={`${ETIQUETA} border-b border-line pb-1 text-ink-muted`}>{titulo}</h4>
      <div className="mt-2 text-ink-soft">{children}</div>
    </section>
  )
}

/* Casilla del recuadro de datos: rótulo con ícono arriba, valor abajo. */
export function Campo({ icono: Icono, etiqueta, children }: { icono: LucideIcon; etiqueta: string; children: React.ReactNode }) {
  return (
    <div className="bg-white p-2.5">
      <p className={`${ETIQUETA} flex items-center gap-1 text-ink-muted`}>
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
  /** Sólo con el editor único (oculto en Consents): el HTML del template, en lugar de las dos secciones. */
  texto?: string
  vistaPaciente: boolean
  /** El documento de un paciente (detalle del consentimiento en Treatment Plan); sin esto, los datos de ejemplo. */
  paciente?: string
  proveedor?: string
  /** El documento de un paciente lleva las dos firmas (paciente y provider): el trazo o el nombre sobre la línea y la
      fecha. Con la del paciente, las casillas quedan marcadas. Sin esto, la línea vacía del preview de Settings. */
  firmas?: { paciente?: FirmaHoja; proveedor?: FirmaHoja }
  /** Las afirmaciones marcadas; con `onReconocer`, el paciente las marca en la hoja (detalle del consentimiento). */
  reconocidos?: readonly string[]
  onReconocer?: (afirmacion: string, marcada: boolean) => void
  /** completo: ocupa todo el ancho y crece con el contenido (el detalle del consentimiento), sin el tamaño de carta. */
  ancho?: 'carta' | 'completo'
  className?: string
}

export type FirmaHoja = { fecha: string; nombre: string; imagen?: string; texto?: string; iniciales?: string }

/* Una línea de firma del documento: el trazo (o el nombre escrito, o el nombre) sobre la línea, quién firma y la fecha. */
function LineaFirma({ rol, nombre, firma }: { rol: string; nombre: string; firma?: FirmaHoja }) {
  return (
    <div className="grid grid-cols-[1fr_96px] items-end gap-4 text-[11px] text-ink-faint">
      <div>
        <div className="flex h-14 items-end pb-1">
          {firma?.imagen
            ? <img src={firma.imagen} alt={`Signature of ${firma.nombre}`} className="max-h-14 max-w-[260px] object-contain" />
            : firma && (
                <span className="font-serif text-[20px] leading-none text-dash-blue italic">
                  {firma.texto || firma.nombre}{firma.iniciales && <span className="ml-1.5 text-[12px]">({firma.iniciales})</span>}
                </span>
              )}
        </div>
        <div className="relative border-t border-ink-medium pt-1">
          {!firma && <X aria-hidden className="absolute -top-3.5 left-0 size-3 text-ink-faint" />}
          {rol} · <span className="text-ink-muted">{nombre}</span>
        </div>
      </div>
      <div>
        <p className="pb-1 text-[12px] text-ink">{firma?.fecha}</p>
        <div className="border-t border-ink-medium pt-1">Date</div>
      </div>
    </div>
  )
}

export function ConsentDocument({ titulo, procedimiento, naturaleza, riesgos, texto, vistaPaciente, paciente = 'Sarah Stone', proveedor = 'John Lorem', firmas, reconocidos, onReconocer, ancho = 'carta', className }: Props) {
  const firmaPaciente = firmas?.paciente
  const lineasRiesgo = riesgos.split('\n').filter(Boolean)
  const vacio = <p className="text-ink-faint">No content yet.</p>

  return (
    <article
      aria-label="Consent document preview"
      className={cn(
        'mx-auto flex w-full flex-col bg-white px-6 pt-6 pb-3.5 text-[12px] leading-[1.5] text-ink-soft shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_2px_4px_rgb(0_0_0/0.06),0_14px_28px_-8px_rgb(0_0_0/0.22)]',
        ancho === 'carta' ? 'aspect-[8.5/11] max-w-[520px]' : 'sm:px-10 sm:pt-8',
        className,
      )}
    >
      <header className="flex items-center gap-3 border-b-2 border-dash-blue pb-3">
        <span aria-hidden className="bg-dash-blue grid size-9 shrink-0 place-items-center rounded-md text-[12px] font-bold text-white">LA</span>
        <div className="flex min-w-0 flex-col gap-1 text-[11px] text-ink-muted">
          <p className="flex items-center gap-1 font-semibold text-ink"><MapPin className="size-3 shrink-0" /> Los Angeles, Dental Clinic</p>
          <p className="flex items-center gap-1"><Send className="size-3 shrink-0" /> Consent sent: {CONSENT_ENVIADO}</p>
        </div>
      </header>

      <div className="mt-4 text-center">
        <p className={`${ETIQUETA} text-dash-blue`}>Informed Consent</p>
        <h3 className="mt-1 text-[17px] leading-tight font-bold text-ink">{titulo || 'Untitled Consent'}</h3>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-px border border-line-strong bg-line-strong">
        <Campo icono={User} etiqueta="Patient">
          <p className="font-bold text-ink">{paciente}</p>
          <p className="text-ink-muted">DOB: 04/02/1991</p>
          <p className="text-ink-muted">Patient ID: 12345432</p>
        </Campo>
        <Campo icono={Stethoscope} etiqueta="Provider">
          <p className="font-bold text-ink">{proveedor}</p>
        </Campo>
        <Campo icono={CalendarDays} etiqueta="Appointment">
          <p className="font-bold text-ink">{FECHA_CITA}</p>
          <p className="text-ink-muted">{HORA_CITA}</p>
        </Campo>
        <Campo icono={ClipboardList} etiqueta="Procedure">
          <p className="font-bold text-ink">{procedimiento ?? '—'}</p>
        </Campo>
      </div>

      {!vistaPaciente && (
        <>
          <Seccion titulo="Diagnosis"><p>Non-restorable tooth with recurrent infection.</p></Seccion>
          <Seccion titulo="Clinical Findings"><p>Extensive decay affecting tooth structure and surrounding tissue.</p></Seccion>
        </>
      )}

      {texto !== undefined ? (
        textoPlano(texto)
          ? <div className={`${PROSA_HOJA} text-ink-soft`} dangerouslySetInnerHTML={{ __html: limpiarHtml(texto) }} />
          : <Seccion titulo="Consent text">{vacio}</Seccion>
      ) : (
        <>
          <Seccion titulo="Nature of procedure">
            {naturaleza ? <p>{naturaleza}</p> : vacio}
          </Seccion>
          <Seccion titulo="Risk and complications">
            {lineasRiesgo.length > 0 ? (
              <ul className="list-disc pl-4 marker:text-ink-faint">
                {lineasRiesgo.map((linea, i) => <li key={i}>{linea}</li>)}
              </ul>
            ) : vacio}
          </Seccion>
        </>
      )}

      <Seccion titulo="Patient acknowledgment">
        <ul className="flex flex-col gap-1.5">
          {RECONOCIMIENTOS_PACIENTE.map((r) => {
            const on = firmaPaciente ? true : !!reconocidos?.includes(r)
            const casilla = (
              <span aria-hidden className={`mt-[3px] grid size-3 shrink-0 place-items-center rounded-[3px] border ${on ? 'border-dash-blue bg-dash-blue text-white' : 'border-ink-muted'}`}>
                {on && <Check className="size-2.5" strokeWidth={3} />}
              </span>
            )
            return (
              <li key={r}>
                {onReconocer ? (
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={on}
                    onClick={() => onReconocer(r, !on)}
                    className="-mx-1 flex gap-2 rounded px-1 text-left hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-dash-blue"
                  >
                    {casilla}{r}
                  </button>
                ) : <span className="flex gap-2">{casilla}{r}</span>}
              </li>
            )
          })}
        </ul>
        <p className="mt-2 text-[11px] leading-snug font-medium text-ink-muted">{AVISO_RECONOCIMIENTOS}</p>
      </Seccion>

      {firmas ? (
        <section aria-label="Signatures" className="mt-auto grid gap-6 pt-7 sm:grid-cols-2 sm:gap-10">
          <LineaFirma rol="Patient / Legal Guardian" nombre={paciente} firma={firmas.paciente} />
          <LineaFirma rol="Provider" nombre={proveedor} firma={firmas.proveedor} />
        </section>
      ) : (
        <div className="mt-auto grid grid-cols-[1fr_88px] gap-4 pt-7 text-[11px] text-ink-faint">
          <div className="relative border-t border-ink-medium pt-1">
            <X aria-hidden className="absolute -top-3.5 left-0 size-3 text-ink-faint" />
            Patient / Legal Guardian
          </div>
          <div className="border-t border-ink-medium pt-1">Date</div>
        </div>
      )}

      <footer className="mt-3 flex justify-between border-t border-line-soft pt-2 text-[10px] text-ink-faint">
        <span>{paciente} · Patient ID 12345432</span>
        <span>Page 1 of 1</span>
      </footer>
    </article>
  )
}
