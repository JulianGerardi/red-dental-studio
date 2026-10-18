import { ArrowUpRight } from 'lucide-react'
import { aviso } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { CONSENTIMIENTO_REQUERIDO as TEXTOS, PACIENTE, type ConsentProcedimiento, type EstadoCaso } from '@/data/treatment-plan'

/* Consent required: frena el cambio de estado de un procedimiento cuando su consentimiento no está firmado y deja
   elegir cómo seguir. Prototipo de Julián "Consent modals revised" (CON-3927, CON-3946, CON-3950). Ver
   design-reference/figma/modulos/clinical-mode.md (2026-10-17). */

/** sin-enviar: no hay documento, hay un borrador sin mandar o venció · pendiente: se mandó y falta la firma. */
export type TipoConsentimiento = 'sin-enviar' | 'pendiente'

export type ProcedimientoResumen = { id: string; codigo: string; nombre: string; pieza?: string | number }

/* Sólo se actualiza un procedimiento de un caso aceptado: Waiting for consent ya está aceptado y espera las firmas. */
export const CASO_LISTO: EstadoCaso[] = ['Accepted', 'Waiting for consent']

/** Qué diálogo pide el cambio, o null si todos están firmados (o no llevan consentimiento). Con uno sin mandar en el
    grupo, gana sin-enviar: hay algo que mandar antes de seguir. */
export function consentimientoRequerido(estados: (ConsentProcedimiento | undefined)[]): TipoConsentimiento | null {
  const faltan = estados.filter((e) => e && e !== 'Signed')
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
export function ResumenConsentimiento({ procedimientos, paciente = PACIENTE, caso }: { procedimientos: ProcedimientoResumen[]; paciente?: string; caso: string }) {
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
      <p className="text-[12px] text-ink-muted">{paciente} · Case: {caso}</p>
    </div>
  )
}

export function ConsentRequiredDialog({
  tipo, procedimientos, paciente, caso, enviando, onCancel, onSignNow, onContinue,
  onViewConsent = () => aviso.info('Open document is not available in this release.'),
}: {
  tipo: TipoConsentimiento
  procedimientos: ProcedimientoResumen[]
  paciente?: string
  /** El nombre del caso del procedimiento. */
  caso: string
  /** Mientras se manda el documento: spinner en la acción principal. */
  enviando?: boolean
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
      {tipo === 'pendiente' && (
        <Button variant="link" size="md" onClick={onViewConsent} className="mt-3 h-auto">
          {TEXTOS.ver} <ArrowUpRight />
        </Button>
      )}
    </ConfirmDialog>
  )
}
