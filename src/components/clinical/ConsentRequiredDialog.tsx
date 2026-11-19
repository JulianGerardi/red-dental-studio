import { ArrowUpRight } from 'lucide-react'
import { aviso } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { Alert } from '@/components/ui/alert'
import { VistaConsentimiento } from '@/components/clinical/ConsentDetail'
import { useState } from 'react'
import { CONSENTIMIENTO_REQUERIDO as TEXTOS, MENU_PROCEDIMIENTO, PACIENTE, type ConsentProcedimiento, type FirmasConsentimiento, type Rubrica } from '@/data/treatment-plan'

/* Consent required: frena el cambio de estado de un procedimiento cuando su consentimiento no está firmado y deja
   elegir cómo seguir. Prototipo de Julián "Consent modals revised" (CON-3927, CON-3946, CON-3950). Ver
   design-reference/figma/modulos/clinical-mode.md (2026-10-17). */

/** sin-enviar: no hay documento, o el que había se rechazó o se descartó · pendiente: se pidió y falta la firma. */
export type TipoConsentimiento = 'sin-enviar' | 'pendiente'

export type ProcedimientoResumen = { id: string; codigo: string; nombre: string; pieza?: string | number }

/** Qué diálogo pide el cambio, o null si todos están firmados (Accepted) o no tienen template (Not required): ahí se
    aplica sin preguntar. Con uno sin pedir en el grupo, gana sin-enviar: hay algo que mandar antes de seguir. */
export function consentimientoRequerido(estados: (ConsentProcedimiento | undefined)[]): TipoConsentimiento | null {
  const faltan = estados.filter((e) => e && e !== 'Accepted' && e !== 'Not required')
  if (faltan.length === 0) return null
  return faltan.some((e) => e !== 'Requested') ? 'sin-enviar' : 'pendiente'
}

/** Hace falta un documento nuevo: nunca se generó, o el que había se rechazó o se descartó (CON-4119). */
export const sinPedir = (c?: ConsentProcedimiento) => c === 'Not generated' || c === 'Rejected' || c === 'Discarded'

/** El caso no está aceptado: el procedimiento no cambia y el aviso lleva al caso. */
export function avisarCasoNoListo(onVerCaso: () => void) {
  const { titulo, texto, accion } = TEXTOS.noListo
  aviso.error({ titulo, texto }, { label: accion, onClick: onVerCaso })
}

const tieneDiente = (p: ProcedimientoResumen) => p.pieza != null && p.pieza !== ''

/** Qué se va a cambiar y de quién: el procedimiento (o los elegidos), el paciente y el caso. */
export function ResumenConsentimiento({ procedimientos, paciente = PACIENTE, caso }: { procedimientos: ProcedimientoResumen[]; paciente?: string; caso?: string }) {
  return (
    <div className="mt-3 flex flex-col gap-1 rounded-lg bg-surface-alt px-3 py-2.5 shadow-inner-card">
      {/* Con varios elegidos, la lista scrollea adentro y el diálogo no crece. La pieza no se parte: "Tooth #3" queda junto. */}
      <ul className="flex max-h-[120px] flex-col gap-0.5 overflow-y-auto">
        {procedimientos.map((p) => (
          <li key={p.id} className="text-[13px] leading-snug font-semibold text-ink">
            {p.codigo} · {p.nombre}{tieneDiente(p) && <> · <span className="whitespace-nowrap">Tooth #{p.pieza}</span></>}
          </li>
        ))}
      </ul>
      <p className="text-[12px] text-ink-muted">{paciente}{caso && ` · Case: ${caso}`}</p>
    </div>
  )
}

export function ConsentRequiredDialog({
  tipo, procedimientos, paciente, caso, enviando, error, onCancel, onSignNow, onContinue,
  onViewConsent = () => aviso.info('Open document is not available in this release.'),
}: {
  tipo: TipoConsentimiento
  procedimientos: ProcedimientoResumen[]
  paciente?: string
  /** El nombre del caso del procedimiento; un procedimiento suelto no tiene. */
  caso?: string
  /** Mientras se manda el documento: spinner en la acción principal. */
  enviando?: boolean
  /** No se pudo mandar: el procedimiento no cambió y se reintenta con el mismo documento. */
  error?: string
  /** El estado del procedimiento no cambia. */
  onCancel: () => void
  /** Abre la revisión y firma del documento; elegirlo no es firmar, el estado no cambia. */
  onSignNow: () => void
  /** Aplica el estado pedido; con sin-enviar, además manda el documento (o el borrador que había). */
  onContinue: () => void
  /** Abre el documento que ya existe, sin cerrar el diálogo. */
  onViewConsent?: () => void
}) {
  const t = TEXTOS[tipo]
  return (
    <ConfirmDialog
      title={TEXTOS.titulo}
      icon="warning"
      confirmLabel={t.accion}
      onConfirm={onContinue}
      onCancel={onCancel}
      otherAction={{ label: TEXTOS.firmar, onClick: onSignNow }}
      loading={enviando}
    >
      <p>{procedimientos.length > 1 ? t.textoVarios : t.texto}</p>
      <ResumenConsentimiento procedimientos={procedimientos} paciente={paciente} caso={caso} />
      {error && <Alert tone="danger" title="Consent not sent" className="mt-3">{error}</Alert>}
      {tipo === 'pendiente' && (
        <Button variant="link" size="md" onClick={onViewConsent} className="mt-3 h-auto">
          {TEXTOS.ver} <ArrowUpRight />
        </Button>
      )}
    </ConfirmDialog>
  )
}

/* ── El flujo de Start y Complete ─────────────────────────────────── */

export type ProcedimientoConConsentimiento = ProcedimientoResumen & {
  consentimiento?: ConsentProcedimiento
  proveedor?: string
  firmas?: FirmasConsentimiento
  rubricas?: Partial<Record<keyof FirmasConsentimiento, Rubrica>>
  /** El envío de este consentimiento falla (ejemplo real del prototipo). */
  envioFalla?: boolean
}
/** Cómo se aplica el cambio: con `enviar`, el documento que faltaba se genera y sale al paciente (Requested). */
export type ComoSeAplica = { enviar?: boolean; nota?: string }

/** Start y Complete de un procedimiento, como en el prototipo de CON-4052 (con caso o suelto): firmado o sin template
    se aplica directo; si falta, Consent required. Send consent and sign later genera el documento si no había y lo
    manda (Requested); si el envío falla, el procedimiento no cambia, el consentimiento sigue como estaba (el PENDING
    interno no se muestra, CON-4119) y el diálogo lo dice. Sign now genera el documento (Requested) y lleva al detalle
    del consentimiento (no abre un drawer): ahí se firma en el pop up del portal y, con las firmas, quien llama pide
    confirmar el cambio. View consent abre el documento y Back vuelve al diálogo. */
export function useFlujoConsentimiento({ onAplicar, onGenerar, onFirmar }: {
  onAplicar: (ids: string[], verbo: 'Start' | 'Complete', como: ComoSeAplica) => void
  /** Sign now genera el documento de los que no tenían (pasan a Requested); el procedimiento no cambia. */
  onGenerar: (ids: string[]) => void
  /** Sign now: ya se generó el documento; lleva al detalle del consentimiento de estos (los que piden firma). */
  onFirmar: (ids: string[], verbo: 'Start' | 'Complete') => void
}) {
  type Pedido = {
    verbo: 'Start' | 'Complete'; procs: ProcedimientoConConsentimiento[]; caso?: string; tipo: TipoConsentimiento
    paso: 'pregunta' | 'documento'; error?: string
  }
  const [pedido, setPedido] = useState<Pedido | null>(null)
  const ids = pedido?.procs.map((p) => p.id) ?? []
  const cerrar = () => setPedido(null)
  const aplicar = (como: ComoSeAplica) => { if (pedido) onAplicar(ids, pedido.verbo, como); cerrar() }
  /* Generar el documento de los que no tenían: queda pedido aunque después se vuelva con Back. */
  const generar = (p: Pedido): Pedido => {
    const sin = p.procs.filter((x) => sinPedir(x.consentimiento)).map((x) => x.id)
    if (sin.length) onGenerar(sin)
    return { ...p, procs: p.procs.map((x) => (sin.includes(x.id) ? { ...x, consentimiento: 'Requested' as const } : x)) }
  }

  const pedir = (verbo: 'Start' | 'Complete', procs: ProcedimientoConConsentimiento[], caso?: string) => {
    const tipo = consentimientoRequerido(procs.map((p) => p.consentimiento))
    if (!tipo) return onAplicar(procs.map((p) => p.id), verbo, {})
    setPedido({ verbo, procs, caso, tipo, paso: 'pregunta' })
  }

  let elemento: React.ReactNode = null
  if (pedido?.paso === 'pregunta') {
    elemento = (
      <ConsentRequiredDialog
        tipo={pedido.tipo}
        procedimientos={pedido.procs}
        caso={pedido.caso}
        error={pedido.error}
        onCancel={cerrar}
        onSignNow={() => {
          const { procs } = generar(pedido)
          cerrar()
          onFirmar(procs.filter((p) => consentimientoRequerido([p.consentimiento])).map((p) => p.id), pedido.verbo)
        }}
        onViewConsent={() => setPedido({ ...pedido, paso: 'documento' })}
        onContinue={() => {
          if (pedido.tipo === 'pendiente') return aplicar({ nota: ' Consent signature pending.' })
          if (pedido.procs.some((p) => p.envioFalla)) return setPedido({ ...pedido, error: MENU_PROCEDIMIENTO.noPudoEnviarse })
          aplicar({ enviar: true, nota: ' Consent sent to the patient.' })
        }}
      />
    )
  } else if (pedido?.paso === 'documento') {
    elemento = <VistaConsentimiento procedimiento={pedido.procs[0]!} cerrar="Back" onClose={() => setPedido({ ...pedido, paso: 'pregunta' })} />
  }
  return { pedir, elemento }
}
