import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { Fragment, useId, useState } from 'react'
import { CircleCheck, CircleSlash, Pencil, Play, Send, Trash2, XCircle, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { PillTone } from '@/components/ui/pill'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { Drawer, DrawerActions } from '@/components/ui/drawer'
import { TextArea } from '@/components/patients/form'
import { ResumenConsentimiento, type ProcedimientoResumen } from '@/components/clinical/ConsentRequiredDialog'
import type { EstadoProcedimiento } from '@/data/clinical-mode'
import { MENU_PROCEDIMIENTO, type Caso, type EstadoCaso, type Procedimiento } from '@/data/treatment-plan'

/* CON-4052: qué acciones ofrece un procedimiento según su estado y el del plan donde está. Lo que no corresponde al
   estado se oculta; Start y Complete, mientras el plan se planea o espera el consentimiento, quedan deshabilitadas con
   el tooltip. Es la misma regla en Procedures, Unassigned y las visitas de un caso. Ver clinical-mode.md (2026-11-02). */

/* El tono de la pill de cada estado de procedimiento, en todas las tablas. */
export const TONO_PROCEDIMIENTO: Record<EstadoProcedimiento, PillTone> = {
  'In progress': 'info', Pending: 'warning', Planned: 'success', Completed: 'neutral', Discontinued: 'warning', Discarded: 'danger', Referred: 'purple',
}

export type AccionProcedimiento = 'edit' | 'start' | 'complete' | 'refer' | 'discard' | 'discontinue' | 'delete'

/** sin-plan: suelto · planificando: Planning, Pending o Presented · esperando-consentimiento: Waiting for consent ·
    ejecutable: Accepted o In progress · cerrado: caso descartado, o plan cancelado o vencido. */
export type ContextoPlan = 'sin-plan' | 'planificando' | 'esperando-consentimiento' | 'ejecutable' | 'cerrado'

export const BLOQUEO_EJECUCION = 'This procedure cannot be started or completed until its treatment case is accepted and its treatment plan is accepted or in progress.'

export function contextoDeCaso(estado?: EstadoCaso): ContextoPlan {
  if (!estado) return 'sin-plan'
  if (estado === 'Discarded' || estado === 'Cancelled' || estado === 'Expired') return 'cerrado'
  if (estado === 'Waiting for consent') return 'esperando-consentimiento'
  if (estado === 'Accepted' || estado === 'In progress') return 'ejecutable'
  return 'planificando'
}

/** La columna Consent: con el caso aceptado (también si después se canceló o venció el plan). No en Planning, en
    Unassigned ni en un caso descartado (prototipo de CON-4052). */
export const conColumnaConsent = (c: Caso) =>
  c.estado === 'Waiting for consent' || c.estado === 'Accepted' || c.estado === 'In progress' || (!!c.aceptado && (c.estado === 'Cancelled' || c.estado === 'Expired'))

export const ACCION: Record<AccionProcedimiento, { label: string; icono: LucideIcon; a?: EstadoProcedimiento; peligro?: boolean }> = {
  edit: { label: 'Edit', icono: Pencil },
  start: { label: 'Start', icono: Play, a: 'In progress' },
  complete: { label: 'Complete', icono: CircleCheck, a: 'Completed' },
  refer: { label: 'Refer', icono: Send, a: 'Referred' },
  discard: { label: 'Discard', icono: XCircle, a: 'Discarded', peligro: true },
  discontinue: { label: 'Discontinue', icono: CircleSlash, a: 'Discontinued', peligro: true },
  delete: { label: 'Delete', icono: Trash2, peligro: true },
}

export type ItemAccion = { accion: AccionProcedimiento; bloqueada?: boolean }

/** Los grupos del menú, separados por una línea. Start no sale de Planned (no existe esa transición) y Delete sólo de
    Planned; Pending lo pone la aceptación del caso, no hay acción para eso. Los estados finales sólo se editan. */
export function accionesDe(estado: Procedimiento['estado'], contexto: ContextoPlan): ItemAccion[][] {
  const editar: ItemAccion[] = [{ accion: 'edit' }]
  if (contexto === 'cerrado') return [editar]
  const bloqueada = contexto === 'planificando' || contexto === 'esperando-consentimiento'
  if (estado === 'Planned') return [editar, [{ accion: 'complete', bloqueada }, { accion: 'refer' }, { accion: 'discard' }], [{ accion: 'delete' }]]
  if (estado === 'Pending') return [editar, [{ accion: 'start', bloqueada }, { accion: 'complete', bloqueada }, { accion: 'refer' }, { accion: 'discard' }]]
  if (estado === 'In progress') return [editar, [{ accion: 'complete' }, { accion: 'discontinue' }]]
  return [editar]
}

/** Complete en el menú de la fila: si está, y si está bloqueada. */
export const completarDe = (grupos: ItemAccion[][]) => grupos.flat().find((i) => i.accion === 'complete')

/** Los ítems del menú ⋮ (van dentro de un DropdownMenuContent). Lo bloqueado se puede enfocar para leer el tooltip,
    pero no hace nada. */
export function ItemsAcciones({ grupos, onElegir }: { grupos: ItemAccion[][]; onElegir: (a: AccionProcedimiento) => void }) {
  const id = useId()
  return (
    <>
      <DropdownMenuLabel className="text-[12px] font-semibold text-ink">Actions</DropdownMenuLabel>
      {grupos.map((g, i) => (
        <Fragment key={i}>
          {i > 0 && <DropdownMenuSeparator />}
          {g.map(({ accion, bloqueada }) => {
            const { label, icono: Icono, peligro } = ACCION[accion]
            const item = (
              <DropdownMenuItem
                key={accion}
                aria-disabled={bloqueada || undefined}
                aria-describedby={bloqueada ? \`\${id}-bloqueo\` : undefined}
                onSelect={(e) => (bloqueada ? e.preventDefault() : onElegir(accion))}
                className={cn(
                  'gap-2 text-[13px]',
                  bloqueada ? 'cursor-not-allowed text-ink-faint focus:bg-surface-subtle focus:text-ink-faint' : peligro && 'text-dash-bad-fg focus:text-dash-bad-fg',
                )}
              >
                <Icono className={cn('size-4', bloqueada ? 'text-ink-faint' : peligro ? 'text-dash-bad-fg' : 'text-ink-muted')} /> {label}
              </DropdownMenuItem>
            )
            if (!bloqueada) return item
            return (
              <Tooltip key={accion}>
                <TooltipTrigger asChild>{item}</TooltipTrigger>
                <TooltipContent side="left" className="max-w-[260px] bg-ink leading-snug text-white">{BLOQUEO_EJECUCION}</TooltipContent>
              </Tooltip>
            )
          })}
        </Fragment>
      ))}
      {grupos.flat().some((i) => i.bloqueada) && <span id={\`\${id}-bloqueo\`} className="sr-only">{BLOQUEO_EJECUCION}</span>}
    </>
  )
}

/* ── Lo que abre cada acción del menú (prototipo de CON-4052) ───────── */

/** Edit: sólo las notas; no cambian el estado. */
export function DialogoEditar({ procedimiento, nota = '', caso, onClose, onGuardar }: {
  procedimiento: ProcedimientoResumen
  nota?: string
  caso?: string
  onClose: () => void
  onGuardar: (nota: string) => void
}) {
  const [texto, setTexto] = useState(nota)
  return (
    <Drawer
      open
      onClose={onClose}
      title={MENU_PROCEDIMIENTO.editar.titulo}
      description={MENU_PROCEDIMIENTO.editar.texto}
      footer={<DrawerActions onCancel={onClose} onSave={() => onGuardar(texto.trim())} saveLabel="Save notes" />}
    >
      <div className="flex flex-col gap-5">
        <ResumenConsentimiento procedimientos={[procedimiento]} caso={caso} />
        <TextArea label="Procedure notes" value={texto} onChange={setTexto} placeholder="Add procedure notes..." />
      </div>
    </Drawer>
  )
}

/** Refer, Discard y Discontinue: de qué estado a cuál, y de qué procedimiento. */
export function DialogoCambioEstado({ accion, procedimiento, desde, caso, onCancel, onConfirm }: {
  accion: 'refer' | 'discard' | 'discontinue'
  procedimiento: ProcedimientoResumen
  desde: string
  caso?: string
  onCancel: () => void
  onConfirm: () => void
}) {
  const { label, a, peligro } = ACCION[accion]
  return (
    <ConfirmDialog title={\`\${label} procedure\`} confirmLabel={label} tone={peligro ? 'danger' : 'primary'} onCancel={onCancel} onConfirm={onConfirm}>
      <p>Change this procedure from {desde} to {a}?</p>
      <ResumenConsentimiento procedimientos={[procedimiento]} caso={caso} />
    </ConfirmDialog>
  )
}

/** Delete: suelto, una pregunta; en un caso, el alcance: Delete from Tx (sale del caso, queda en el paciente) o Delete
    Procedure (se borra el registro). */
export function DialogoBorrar({ procedimiento, caso, onCancel, onConfirm }: {
  procedimiento: ProcedimientoResumen
  caso?: string
  onCancel: () => void
  onConfirm: (alcance: 'caso' | 'paciente') => void
}) {
  const t = MENU_PROCEDIMIENTO.borrarEnCaso
  if (!caso) {
    return (
      <ConfirmDialog title="Delete procedure" confirmLabel="Delete" tone="danger" onCancel={onCancel} onConfirm={() => onConfirm('paciente')}>
        <p>{MENU_PROCEDIMIENTO.borrarSuelto}</p>
        <ResumenConsentimiento procedimientos={[procedimiento]} />
      </ConfirmDialog>
    )
  }
  return (
    <ConfirmDialog
      title="Delete procedure"
      confirmLabel={t.procedimiento.titulo}
      tone="danger"
      otherAction={{ label: t.tx.titulo, onClick: () => onConfirm('caso') }}
      onCancel={onCancel}
      onConfirm={() => onConfirm('paciente')}
    >
      <p>{t.texto}</p>
      <ResumenConsentimiento procedimientos={[procedimiento]} caso={caso} />
      <dl className="mt-3 flex flex-col gap-2">
        {[t.tx, t.procedimiento].map((o) => (
          <div key={o.titulo}>
            <dt className="text-[13px] font-semibold text-ink">{o.titulo}</dt>
            <dd className="text-[13px] text-ink-soft">{o.texto}</dd>
          </div>
        ))}
      </dl>
    </ConfirmDialog>
  )
}
`})))()}export{n,i as r,r as t};