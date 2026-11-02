import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { ArrowUpRight } from 'lucide-react'
import { aviso } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { Alert } from '@/components/ui/alert'
import { FirmarConsentimiento, VistaConsentimiento } from '@/components/clinical/ConsentDetail'
import { useState } from 'react'
import { CONSENTIMIENTO_REQUERIDO as TEXTOS, MENU_PROCEDIMIENTO, PACIENTE, type ConsentProcedimiento, type FirmasConsentimiento, type Rubrica } from '@/data/treatment-plan'

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
      <p className="text-[12px] text-ink-muted">{paciente}{caso && \` · Case: \${caso}\`}</p>
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
}
/** Cómo se aplica el cambio: con \`enviar\`, el documento sin generar o sin mandar sale al paciente (Pending). */
export type ComoSeAplica = { enviar?: boolean; nota?: string }

const sinDocumento = (c?: ConsentProcedimiento) => c === 'Not generated'

/** Start y Complete de un procedimiento, como en el prototipo de CON-4052 (con caso o suelto): firmado o sin template
    se aplica directo; si falta, Consent required. Send consent and sign later genera el documento si no había y lo
    manda; si el envío falla, el procedimiento no cambia y el diálogo lo dice (se reintenta con el mismo documento).
    Sign now genera el documento, abre la revisión y firma (Back vuelve al diálogo) y, firmado, pide confirmar: Cancel
    clinical change deja el procedimiento como estaba, con el consentimiento firmado. View consent abre el documento y
    Back vuelve al diálogo. */
export function useFlujoConsentimiento({ onAplicar, onGenerar, onFirmar, fallaEnvio }: {
  onAplicar: (ids: string[], verbo: 'Start' | 'Complete', como: ComoSeAplica) => void
  /** Genera el documento de los que no tenían (Not generated → Not sent); el procedimiento no cambia. */
  onGenerar: (ids: string[]) => void
  /** Registra todas las firmas requeridas (genera el documento si no había); el procedimiento no cambia. */
  onFirmar: (ids: string[], rubrica: Rubrica) => void
  /** Prototype controls: el próximo envío falla. */
  fallaEnvio?: boolean
}) {
  type Pedido = {
    verbo: 'Start' | 'Complete'; procs: ProcedimientoConConsentimiento[]; caso?: string; tipo: TipoConsentimiento
    paso: 'pregunta' | 'firma' | 'firmado' | 'documento'; error?: string
  }
  const [pedido, setPedido] = useState<Pedido | null>(null)
  const ids = pedido?.procs.map((p) => p.id) ?? []
  const cerrar = () => setPedido(null)
  const aplicar = (como: ComoSeAplica) => { if (pedido) onAplicar(ids, pedido.verbo, como); cerrar() }
  /* Generar el documento de los que no tenían: queda generado aunque después se cancele (como en el prototipo). */
  const generar = (p: Pedido): Pedido => {
    const sin = p.procs.filter((x) => sinDocumento(x.consentimiento)).map((x) => x.id)
    if (sin.length) onGenerar(sin)
    return { ...p, procs: p.procs.map((x) => (sin.includes(x.id) ? { ...x, consentimiento: 'Not sent' as const } : x)) }
  }

  const pedir = (verbo: 'Start' | 'Complete', procs: ProcedimientoConConsentimiento[], caso?: string) => {
    const tipo = consentimientoRequerido(procs.map((p) => p.consentimiento))
    if (!tipo) return onAplicar(procs.map((p) => p.id), verbo, {})
    setPedido({ verbo, procs, caso, tipo, paso: 'pregunta' })
  }

  const resumen = pedido && <ResumenConsentimiento procedimientos={pedido.procs} caso={pedido.caso} />
  let elemento: React.ReactNode = null
  if (pedido?.paso === 'pregunta') {
    elemento = (
      <ConsentRequiredDialog
        tipo={pedido.tipo}
        procedimientos={pedido.procs}
        caso={pedido.caso}
        error={pedido.error}
        onCancel={cerrar}
        onSignNow={() => setPedido({ ...generar(pedido), paso: 'firma', error: undefined })}
        onViewConsent={() => setPedido({ ...pedido, paso: 'documento' })}
        onContinue={() => {
          if (pedido.tipo === 'pendiente') return aplicar({ nota: ' Consent signature pending.' })
          if (fallaEnvio) return setPedido({ ...generar(pedido), error: MENU_PROCEDIMIENTO.noPudoEnviarse })
          aplicar({ enviar: true, nota: ' Consent sent to the patient.' })
        }}
      />
    )
  } else if (pedido?.paso === 'documento') {
    elemento = <VistaConsentimiento procedimiento={pedido.procs[0]!} cerrar="Back" onClose={() => setPedido({ ...pedido, paso: 'pregunta' })} />
  } else if (pedido?.paso === 'firma') {
    elemento = (
      <FirmarConsentimiento
        rol="Patient"
        nombre={PACIENTE}
        titulo={MENU_PROCEDIMIENTO.revisar.titulo}
        descripcion={MENU_PROCEDIMIENTO.revisar.texto}
        resumen={resumen}
        cancelar="Back"
        guardar="Record signature"
        onClose={() => setPedido({ ...pedido, paso: 'pregunta' })}
        onFirmar={(r) => { onFirmar(ids, r); setPedido({ ...pedido, paso: 'firmado' }) }}
      />
    )
  } else if (pedido?.paso === 'firmado') {
    elemento = (
      <ConfirmDialog
        title={MENU_PROCEDIMIENTO.firmado.titulo}
        cancelLabel="Cancel clinical change"
        confirmLabel={\`Confirm \${pedido.verbo}\`}
        onCancel={() => { cerrar(); aviso.info('Procedure consent signed. The procedure has not changed.') }}
        onConfirm={() => aplicar({ nota: ' Consent signed.' })}
      >
        <p>{MENU_PROCEDIMIENTO.firmado.texto}</p>
        {resumen}
      </ConfirmDialog>
    )
  }
  return { pedir, elemento }
}
`})))()}export{n,i as r,r as t};