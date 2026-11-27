import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Ban, CircleCheck, CircleX, Pencil, Send, Trash2, type LucideIcon } from 'lucide-react'
import { aviso } from '@/components/ui/toaster'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { DropdownMenuItem, DropdownMenuLabel } from '@/components/ui/dropdown-menu'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import type { PillTone } from '@/components/ui/pill'
import type { PendingTask } from './PendingTaskCard'
import { abrirDocumento, documentoTarea } from './documentoTarea'

/* Lo que hacen los botones de una tarea de Pending Task, en el Dashboard, en el Patient Dashboard y en el detalle de la
   orden en Clinical Mode. Sale de los videos de red.dev de Julián (sólo lo que muestran); ver
   design-reference/figma/modulos/dashboard.md (2026-11-20). */

/* \`Finish\` es el *Complete* de una Referral pedida (CON-2398): no confundir con \`Complete\`, que abre la tarea. */
export type AccionTarea = 'Edit' | 'Request' | 'Activate' | 'Finish' | 'Reject' | 'Cancel' | 'Delete'
export type AccionUI = AccionTarea | 'Complete' | 'PDF'

export const SIN_ENCUENTRO = 'You do not have permission to perform this action because there is no open encounter for the selected patient.'

const SINGULAR: Record<string, string> = { 'Clinical note': 'Clinical note', 'Lab orders': 'Lab order', Prescriptions: 'Prescription', Referrals: 'Referral' }
export const nombreTarea = (t: PendingTask) => SINGULAR[t.kind] ?? t.kind

/* La pestaña de Clinical Mode que abre Complete this Task. La Clinical Note abre su propia pantalla. */
export const PESTANA_TAREA: Record<string, string> = { 'Lab orders': 'Lab order', Prescriptions: 'Prescription', Referrals: 'Referral' }

/* Los colores de red.dev: Pending naranja, Requested azul, Fulfilled rojo. */
export const TONO_ESTADO: Record<string, PillTone> = { Pending: 'warning', Requested: 'info', Delayed: 'warning', Fulfilled: 'danger', Completed: 'success', Rejected: 'danger' }

/* El menú ⋮ de red.dev: Lab Order con Edit, Request, Cancel y Delete; Prescription con Activate y Cancel. La Clinical
   Note no lleva. Referral, según su estado en Jira: Pending pide, cancela o borra (CON-2394, CON-2391, CON-3436);
   Requested se completa, se rechaza o se cancela (CON-2398, CON-2392; video de red.dev del 2026-11-27). */
export function accionesDe(t: PendingTask): AccionTarea[] {
  if (t.kind === 'Lab orders') return ['Edit', 'Request', 'Cancel', 'Delete']
  if (t.kind === 'Prescriptions') return ['Activate', 'Cancel']
  if (t.kind === 'Referrals') return t.state === 'Pending' ? ['Request', 'Cancel', 'Delete'] : ['Finish', 'Reject', 'Cancel']
  return []
}

const ICONO: Record<AccionTarea, LucideIcon> = { Edit: Pencil, Request: Send, Activate: CircleCheck, Finish: CircleCheck, Reject: CircleX, Cancel: Ban, Delete: Trash2 }
const ETIQUETA: Partial<Record<AccionTarea, string>> = { Finish: 'Complete' }
const DESTRUCTIVA: AccionTarea[] = ['Reject', 'Cancel', 'Delete']

/* ── Estado de las tareas, fuera de React como el del encuentro (lib/encuentro): un cambio hecho en el Dashboard se ve
   en Clinical Mode y al revés. ── */
type Cambio = { state?: string; pdf?: boolean; fuera?: boolean }
let cambios: Record<string, Cambio> = {}
const oyentes = new Set<() => void>()
const guardar = (id: string, c: Cambio | undefined) => {
  cambios = { ...cambios }
  if (c) cambios[id] = c
  else delete cambios[id]
  oyentes.forEach((f) => f())
}

export const tareaViva = (t: PendingTask): PendingTask & { fuera?: boolean } => ({ ...t, ...(t.id ? cambios[t.id] : undefined) })

/** Las tareas con sus cambios; las que dejaron de estar pendientes salen de la lista (CON-2643, CA8). */
export function useTareasVivas(base: PendingTask[]) {
  const [, redibujar] = useState(0)
  useEffect(() => {
    const f = () => redibujar((n) => n + 1)
    oyentes.add(f)
    return () => { oyentes.delete(f) }
  }, [])
  return base.map(tareaViva).filter((t) => !t.fuera)
}

/** Vuelve todas las tareas a como estaban (Storybook y tests). */
export const reiniciarTareas = () => { cambios = {}; oyentes.forEach((f) => f()) }

/* Request y Activate se hacen al toque y se deshacen desde el aviso; Cancel y Delete ya pasaron por la pregunta. */
/* \`sinAviso\`: el que llama ya avisó (Prescription en Clinical Mode, que tiene sus propios textos de Jira). */
export function aplicarAccion(t: PendingTask, accion: AccionTarea | 'Sign', { sinAviso = false } = {}) {
  if (!t.id) return
  if (sinAviso) { guardar(t.id, { ...cambios[t.id], ...(accion === 'Cancel' ? { state: 'Canceled' } : {}), fuera: true }); return }
  const id = t.id
  const antes = cambios[id]
  const nombre = nombreTarea(t)
  const deshacer = { label: 'Undo', onClick: () => guardar(id, antes) }
  if (accion === 'Request') { guardar(id, { ...antes, state: 'Requested', pdf: true }); aviso.ok(\`\${nombre} for \${t.person} requested.\`, deshacer) }
  else if (accion === 'Activate') { guardar(id, { ...antes, fuera: true }); aviso.ok(\`\${nombre} for \${t.person} activated.\`, deshacer) }
  else if (accion === 'Finish') { guardar(id, { ...antes, state: 'Completed', fuera: true }); aviso.ok('The referral has been successfully completed.') }
  else if (accion === 'Reject') { guardar(id, { ...antes, state: 'Rejected', fuera: true }); aviso.ok('The referral has been successfully rejected.') }
  else if (accion === 'Cancel') { guardar(id, { ...antes, state: 'Canceled', fuera: true }); aviso.ok(\`\${nombre} for \${t.person} canceled.\`) }
  else if (accion === 'Delete') { guardar(id, { ...antes, fuera: true }); aviso.ok(\`\${nombre} for \${t.person} deleted.\`) }
  else if (accion === 'Sign') { guardar(id, { ...antes, fuera: true }); aviso.ok('Clinical note signed.') }
}

/* El PDF de la tarea (formato de red.dev, documentoTarea.ts) en una pestaña nueva. */
export const abrirPdf = (t: PendingTask) =>
  abrirDocumento(documentoTarea(t), () => aviso.error("We couldn't open the PDF. Allow pop-ups for this site and try again."))

type Pregunta = { t: PendingTask; accion: 'Cancel' | 'Delete' | 'Request' | 'Finish' | 'Reject' }

/* Las preguntas de Referral, con los textos de red.dev (video del 2026-11-27) y de Jira (CON-2391, CON-3436). */
const PREGUNTA_REFERRAL = {
  Request: { title: 'Request referral', confirm: 'Mark as requested', keep: 'Cancel', texto: 'Are you sure you want to mark this referral as Requested? Once marked as Requested, you will no longer be able to edit this referral.' },
  Finish: { title: 'Complete referral', confirm: 'Complete', keep: 'Cancel', texto: 'Are you sure you want to complete this referral?' },
  Reject: { title: 'Reject referral', confirm: 'Reject', keep: 'Cancel', texto: 'Are you sure you want to reject this referral?' },
  Cancel: { title: 'Cancel this referral?', confirm: 'Cancel referral', keep: 'Keep it', texto: 'The referral will not be sent to the provider or followed by the patient.' },
  Delete: { title: 'Delete referral', confirm: 'Delete', keep: 'Cancel', texto: 'Are you sure you want to delete this referral? This action cannot be undone.' },
}

/* Lab order, con los textos de red.dev (video de Julián del 2026-11-27): Request y Delete preguntan antes. */
const PREGUNTA_LAB = {
  Request: { title: 'Request lab order', confirm: 'Mark as requested', keep: 'Cancel', texto: 'Are you sure you want to mark this order as Requested? Once marked as Requested, you will no longer be able to edit this order.' },
  Delete: { title: 'Delete lab order', confirm: 'Delete', keep: 'Cancel', texto: 'Are you sure you want to delete this lab order? This action cannot be undone.' },
}

/** Lo que hace cada botón de la tarea y las preguntas que abre. \`paciente\` fuerza la ficha (Patient Dashboard);
 *  \`alAbrir\` corre antes de ir a Clinical Mode (el Dashboard deja el encuentro de ese paciente). */
export function useAccionesTarea({ paciente, alAbrir }: { paciente?: string; alAbrir?: (t: PendingTask) => void } = {}) {
  const navegar = useNavigate()
  const [pregunta, setPregunta] = useState<Pregunta | null>(null)

  const abrir = (t: PendingTask) => {
    alAbrir?.(t)
    const ficha = paciente ?? t.patientId ?? 'john-smith'
    /* La Clinical Note abre su pantalla (Back to History, View PDF, Sign Clinical Note), como red.dev. */
    if (t.kind === 'Clinical note') { navegar(\`/patients/\${ficha}/clinical-note/\${t.id ?? ''}\`); return }
    const pestana = PESTANA_TAREA[t.kind] ?? 'Lab order'
    navegar(\`/patients/\${ficha}/clinical-mode?tab=\${encodeURIComponent(pestana)}\${t.id ? \`&task=\${t.id}\` : ''}\`)
  }

  const hacer = (t: PendingTask, accion: AccionUI) => {
    if (accion === 'PDF') abrirPdf(t)
    else if (accion === 'Complete' || accion === 'Edit') abrir(t)
    else if (accion === 'Cancel' || accion === 'Delete' || accion === 'Finish' || accion === 'Reject' || (accion === 'Request' && (t.kind === 'Referrals' || t.kind === 'Lab orders'))) setPregunta({ t, accion })
    else aplicarAccion(t, accion)
  }

  const nombre = pregunta ? nombreTarea(pregunta.t) : ''
  const referral = pregunta?.t.kind === 'Referrals' ? PREGUNTA_REFERRAL[pregunta.accion]
    : pregunta?.t.kind === 'Lab orders' && (pregunta.accion === 'Request' || pregunta.accion === 'Delete') ? PREGUNTA_LAB[pregunta.accion] : undefined
  const dialogo: ReactNode = !pregunta ? null : referral ? (
    <ConfirmDialog
      title={referral.title} confirmLabel={referral.confirm} cancelLabel={referral.keep}
      tone={pregunta.accion === 'Request' || pregunta.accion === 'Finish' ? undefined : 'danger'} icon={pregunta.accion === 'Delete' ? 'delete' : undefined}
      onCancel={() => setPregunta(null)}
      onConfirm={() => { aplicarAccion(pregunta.t, pregunta.accion); setPregunta(null) }}
    >
      <p>{referral.texto}</p>
    </ConfirmDialog>
  ) : pregunta.accion !== 'Cancel' && pregunta.accion !== 'Delete' ? null : (
    <ConfirmDialog
      title={\`\${pregunta.accion === 'Cancel' ? 'Cancel' : 'Delete'} this \${nombre.toLowerCase()}?\`}
      confirmLabel={\`\${pregunta.accion === 'Cancel' ? 'Cancel' : 'Delete'} \${nombre.toLowerCase()}\`}
      cancelLabel={pregunta.accion === 'Cancel' ? 'Keep it' : 'Cancel'}
      tone="danger" icon={pregunta.accion === 'Delete' ? 'delete' : undefined}
      onCancel={() => setPregunta(null)}
      onConfirm={() => { aplicarAccion(pregunta.t, pregunta.accion); setPregunta(null) }}
    >
      <p>
        {pregunta.accion === 'Cancel'
          ? \`The \${nombre.toLowerCase()} for \${pregunta.t.person} will be canceled and leave Pending Task.\`
          : \`The \${nombre.toLowerCase()} for \${pregunta.t.person} will be deleted. This can't be undone.\`}
      </p>
    </ConfirmDialog>
  )

  return { hacer, dialogo }
}

/* El ⋮ de la tarea, como red.dev: *Options* y las acciones. Sin un encuentro abierto con el paciente se ven apagadas y
   cada una explica por qué en un tooltip, que también abre con el foco del teclado (por eso no van \`disabled\`: Radix les
   quita el puntero y el foco). */
export function MenuTarea({ task, abierto, onAccion, sin = [] }: { task: PendingTask; abierto: boolean; onAccion: (t: PendingTask, a: AccionUI) => void; sin?: AccionTarea[] }) {
  const acciones = accionesDe(task).filter((a) => !sin.includes(a))
  if (!acciones.length) return null
  const item = (a: AccionTarea) => {
    const Icono = ICONO[a]
    const opcion = (
      <DropdownMenuItem
        key={a} aria-disabled={!abierto || undefined} variant={DESTRUCTIVA.includes(a) ? 'destructive' : 'default'}
        onSelect={(e) => { if (!abierto) { e.preventDefault(); return } onAccion(task, a) }}
        className={cn('text-[13px]', !abierto && 'cursor-not-allowed opacity-50')}
      >
        <Icono className="size-3.5" /> {ETIQUETA[a] ?? a}
      </DropdownMenuItem>
    )
    if (abierto) return opcion
    return (
      <Tooltip key={a}>
        <TooltipTrigger asChild>{opcion}</TooltipTrigger>
        <TooltipContent side="top" className="max-w-[240px] text-center">{SIN_ENCUENTRO}</TooltipContent>
      </Tooltip>
    )
  }
  return (
    <RowActionsMenu label={\`\${nombreTarea(task)} for \${task.person}\`}>
      <TooltipProvider delayDuration={100}>
        <DropdownMenuLabel className="text-[12px] font-semibold text-ink">Options</DropdownMenuLabel>
        {acciones.map(item)}
      </TooltipProvider>
    </RowActionsMenu>
  )
}
`})))()}export{r as n,n as r,i as t};