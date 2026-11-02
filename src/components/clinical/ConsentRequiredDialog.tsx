import { ArrowUpRight } from 'lucide-react'
import { aviso } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { Alert } from '@/components/ui/alert'
import { FirmarConsentimiento } from '@/components/clinical/ConsentDetail'
import { useState } from 'react'
import { CONSENTIMIENTO_REQUERIDO as TEXTOS, MENU_PROCEDIMIENTO, PACIENTE, type ConsentProcedimiento } from '@/data/treatment-plan'

/* Consent required: frena el cambio de estado de un procedimiento cuando su consentimiento no está firmado y deja
   elegir cómo seguir. Prototipo de Julián "Consent modals revised" (CON-3927, CON-3946, CON-3950). Ver
   design-reference/figma/modulos/clinical-mode.md (2026-10-17). */

/** sin-enviar: no hay documento, hay un borrador sin mandar o venció · pendiente: se mandó y falta la firma. */
export type TipoConsentimiento = 'sin-enviar' | 'pendiente'

export type ProcedimientoResumen = { id: string; codigo: string; nombre: string; pieza?: string | number }

/** Qué diálogo pide el cambio, o null si todos están firmados o no tienen template (Not required): ahí se aplica sin
    preguntar. Con uno sin generar o sin mandar en el grupo, gana sin-enviar: hay algo que mandar antes de seguir. */
export function consentimientoRequerido(estados: (ConsentProcedimiento | undefined)[]): TipoConsentimiento | null {
  const faltan = estados.filter((e) => e && e !== 'Signed' && e !== 'Not required')
  if (faltan.length === 0) return null
  return faltan.some((e) => e !== 'Pending') ? 'sin-enviar' : 'pendiente'
}

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
  /** El nombre del caso del procedimiento. */
  caso: string
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

export type ProcedimientoConConsentimiento = ProcedimientoResumen & { consentimiento?: ConsentProcedimiento }
/** Cómo se aplica el cambio: con `enviar`, el documento sin generar o sin mandar sale al paciente (Pending). */
export type ComoSeAplica = { enviar?: boolean; nota?: string }

/** Start y Complete de un procedimiento de un caso, como en el prototipo de CON-4052: firmado o sin template se aplica
    directo; si falta, Consent required. Sign now abre la revisión y firma (Back vuelve al diálogo) y, firmado, pide
    confirmar el cambio pedido: Cancel clinical change lo deja como estaba, con el consentimiento ya firmado. */
export function useFlujoConsentimiento({ onAplicar, onFirmar, onVerConsentimiento }: {
  onAplicar: (ids: string[], verbo: 'Start' | 'Complete', como: ComoSeAplica) => void
  /** Registra las firmas (genera el documento si no había); el estado del procedimiento no cambia. */
  onFirmar: (ids: string[]) => void
  /** View consent: abre el documento que ya existe. */
  onVerConsentimiento?: (id: string) => void
}) {
  type Pedido = { verbo: 'Start' | 'Complete'; procs: ProcedimientoConConsentimiento[]; caso?: string; tipo: TipoConsentimiento; paso: 'pregunta' | 'firma' | 'firmado' }
  const [pedido, setPedido] = useState<Pedido | null>(null)
  const ids = pedido?.procs.map((p) => p.id) ?? []
  const cerrar = () => setPedido(null)
  const aplicar = (como: ComoSeAplica) => { if (pedido) onAplicar(ids, pedido.verbo, como); cerrar() }

  const pedir = (verbo: 'Start' | 'Complete', procs: ProcedimientoConConsentimiento[], caso?: string) => {
    const tipo = consentimientoRequerido(procs.map((p) => p.consentimiento))
    if (!tipo) return onAplicar(procs.map((p) => p.id), verbo, {})
    setPedido({ verbo, procs, caso, tipo, paso: 'pregunta' })
  }

  const resumen = pedido && <ResumenConsentimiento procedimientos={pedido.procs} caso={pedido.caso} />
  const elemento = !pedido ? null : pedido.paso === 'pregunta' ? (
    <ConsentRequiredDialog
      tipo={pedido.tipo}
      procedimientos={pedido.procs}
      caso={pedido.caso ?? ''}
      onCancel={cerrar}
      onSignNow={() => setPedido({ ...pedido, paso: 'firma' })}
      onViewConsent={onVerConsentimiento && (() => { const id = ids[0]; cerrar(); if (id) onVerConsentimiento(id) })}
      onContinue={() => aplicar(pedido.tipo === 'sin-enviar'
        ? { enviar: true, nota: ' Consent sent to the patient.' }
        : { nota: ' Consent signature pending.' })}
    />
  ) : pedido.paso === 'firma' ? (
    <FirmarConsentimiento
      rol="Patient"
      nombre={PACIENTE}
      titulo={MENU_PROCEDIMIENTO.revisar.titulo}
      descripcion={MENU_PROCEDIMIENTO.revisar.texto}
      resumen={resumen}
      cancelar="Back"
      guardar="Record signature"
      onClose={() => setPedido({ ...pedido, paso: 'pregunta' })}
      onFirmar={() => { onFirmar(ids); setPedido({ ...pedido, paso: 'firmado' }) }}
    />
  ) : (
    <ConfirmDialog
      title={MENU_PROCEDIMIENTO.firmado.titulo}
      cancelLabel="Cancel clinical change"
      confirmLabel={`Confirm ${pedido.verbo}`}
      onCancel={() => { cerrar(); aviso.info('Procedure consent signed. The procedure has not changed.') }}
      onConfirm={() => aplicar({ nota: ' Consent signed.' })}
    >
      <p>{MENU_PROCEDIMIENTO.firmado.texto}</p>
      {resumen}
    </ConfirmDialog>
  )
  return { pedir, elemento }
}
