import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Ban, CheckCheck, CircleX, Clock, PackageCheck, Pencil, Power, Send, TimerOff, Trash2, type LucideIcon } from 'lucide-react'
import { aviso } from '@/components/ui/toaster'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { DropdownMenuItem, DropdownMenuLabel } from '@/components/ui/dropdown-menu'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import type { PillTone } from '@/components/ui/pill'
import type { PendingTask } from './PendingTaskCard'
import { abrirDocumento, abrirHoja, documentoTarea } from './documentoTarea'
/* Ciclo a propósito (registros usa tareaViva): se llaman sólo dentro de funciones. */
import { hojaDeRegistro } from '@/components/clinical/registros'

/* Lo que hacen los botones de una tarea de Pending Task, en el Dashboard, en el Patient Dashboard y en el detalle de la
   orden en Clinical Mode. Sale de los videos de red.dev de Julián (sólo lo que muestran); ver
   design-reference/figma/modulos/dashboard.md (2026-11-20). */

/* \`Finish\` es el *Complete* de una Referral pedida (CON-2398): no confundir con \`Complete\`, que abre la tarea. */
export type AccionTarea = 'Edit' | 'Request' | 'Activate' | 'Deliver' | 'Delay' | 'Finish' | 'Expire' | 'Reject' | 'Cancel' | 'Delete'
export type AccionUI = AccionTarea | 'Complete' | 'PDF'

const SINGULAR: Record<string, string> = { 'Clinical note': 'Clinical note', 'Lab orders': 'Lab order', Prescriptions: 'Prescription', Referrals: 'Referral' }
export const nombreTarea = (t: PendingTask) => SINGULAR[t.kind] ?? t.kind

/* La pestaña de Clinical Mode que abre Complete this Task. La Clinical Note abre su propia pantalla. */
export const PESTANA_TAREA: Record<string, string> = { 'Lab orders': 'Lab order', Prescriptions: 'Prescription', Referrals: 'Referral' }

/* Un color por estado, el mismo en Pending Task, en las tres tablas de Clinical Mode y en sus fichas. */
export const TONO_ESTADO: Record<string, PillTone> = {
  Pending: 'warning', Requested: 'info', Delayed: 'warning', Fulfilled: 'danger', Active: 'success', Delivered: 'success',
  Completed: 'success', Rejected: 'danger', Canceled: 'danger', Expired: 'neutral',
}

/* La máquina de estados de cada registro, como red.dev (recorrido del 2026-11-27) y Jira: sólo se edita y se borra en
   Pending. Lab order (CON-2222): Pending → Requested → Delivered / Delayed / Rejected, y se cancela mientras esté
   abierta. Prescription (CON-2357): Pending → Active, que se puede dar por vencida (Expire) y se cancela en Pending o Active (CON-2355). Referral (CON-2324):
   Pending → Requested → Completed / Rejected. Un estado final no tiene acciones. El orden es el del ⋮ de red.dev
   (recorrido del 2026-11-28). Ver clinical-mode.md (2026-11-27 y 2026-11-28). */
const MAQUINA: Record<string, Record<string, AccionTarea[]>> = {
  'Lab orders': { Pending: ['Edit', 'Request', 'Cancel', 'Delete'], Requested: ['Reject', 'Deliver', 'Delay', 'Cancel'], Delayed: ['Reject', 'Deliver', 'Cancel'] },
  Prescriptions: { Pending: ['Edit', 'Activate', 'Cancel', 'Delete'], Active: ['Cancel', 'Expire'] },
  Referrals: { Pending: ['Edit', 'Request', 'Cancel', 'Delete'], Requested: ['Finish', 'Reject', 'Cancel'] },
}
export const accionesDe = (t: PendingTask): AccionTarea[] => MAQUINA[t.kind]?.[t.state] ?? []
/** El registro todavía se puede editar: sólo en Pending (CON-2218, CON-2354, CON-2323). */
export const esEditable = (t: PendingTask) => accionesDe(t).includes('Edit')

/* A qué estado lleva cada acción y si el registro sigue siendo una tarea pendiente (CON-2643). */
const DESTINO: Partial<Record<AccionTarea, string>> = {
  Request: 'Requested', Activate: 'Active', Deliver: 'Delivered', Delay: 'Delayed', Finish: 'Completed', Expire: 'Expired', Reject: 'Rejected', Cancel: 'Canceled',
}
const PENDIENTES: Record<string, string[]> = { 'Lab orders': ['Pending', 'Requested', 'Delayed'], Prescriptions: ['Pending'], Referrals: ['Pending', 'Requested'] }

/* Los íconos del ⋮ de red.dev (lucide): pencil, send, power, package-check, clock, check-check, timer-off, circle-x, ban, trash-2. */
const ICONO: Record<AccionTarea, LucideIcon> = {
  Edit: Pencil, Request: Send, Activate: Power, Deliver: PackageCheck, Delay: Clock, Finish: CheckCheck, Expire: TimerOff, Reject: CircleX, Cancel: Ban, Delete: Trash2,
}
const ETIQUETA: Partial<Record<AccionTarea, string>> = { Finish: 'Complete' }
const DESTRUCTIVA: AccionTarea[] = ['Expire', 'Reject', 'Cancel', 'Delete']

/* ── Estado de las tareas, fuera de React como el del encuentro (lib/encuentro): un cambio hecho en el Dashboard se ve
   en Clinical Mode y al revés. ── */
/* \`fuera\`: dejó de ser una tarea pendiente (sigue en su tabla de Clinical Mode con el estado nuevo). \`borrada\`: se
   eliminó (Delete) y no se ve en ningún lado. */
type Cambio = { state?: string; pdf?: boolean; fuera?: boolean; borrada?: boolean; updated?: string }
let cambios: Record<string, Cambio> = {}
const oyentes = new Set<() => void>()
const guardar = (id: string, c: Cambio | undefined) => {
  cambios = { ...cambios }
  if (c) cambios[id] = c
  else delete cambios[id]
  oyentes.forEach((f) => f())
}

export const tareaViva = <T extends PendingTask>(t: T): T & { fuera?: boolean; borrada?: boolean; updated?: string } => ({ ...t, ...(t.id ? cambios[t.id] : undefined) })

/** Para los almacenes que dependen del estado de las tareas (clinical/registros). */
export const suscribirTareas = (f: () => void) => { oyentes.add(f); return () => { oyentes.delete(f) } }
export const avisarTareas = () => oyentes.forEach((f) => f())


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

const HOY = () => new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })

/* El documento existe según el estado, como red.dev: la Lab order desde que se pide (CON-2584: cancelada desde Pending
   no tiene), la Prescription mientras está Active (CON-2287) y la Referral mientras está Requested (el código de
   red.dev: \`documentId: "REQUESTED" === status ? … : undefined\`). */
const conPdf = (t: PendingTask, estado: string) =>
  t.kind === 'Prescriptions' ? estado === 'Active' : t.kind === 'Referrals' ? estado === 'Requested' : estado === 'Requested' || (estado !== 'Pending' && !!t.pdf)

/* Los avisos, con el texto de Jira ("The lab order has been successfully marked as Requested.", CON-2221). */
const HECHO: Partial<Record<AccionTarea, string>> = {
  Request: 'marked as Requested', Activate: 'marked as Active', Deliver: 'marked as Delivered', Delay: 'marked as Delayed',
  Finish: 'completed', Expire: 'marked as Expired', Reject: 'rejected', Cancel: 'canceled', Delete: 'deleted',
}
/* Lab order y Prescription avisan el estado como red.dev ("…successfully marked as Canceled."); Referral, la acción. */
const MARCADO: Partial<Record<AccionTarea, string>> = { Reject: 'marked as Rejected', Cancel: 'marked as Canceled' }

/** Aplica la acción ya confirmada: cambia el estado, el documento y si sigue pendiente, y avisa. */
export function aplicarAccion(t: PendingTask, accion: AccionTarea | 'Sign') {
  if (!t.id) return
  const id = t.id
  const antes = cambios[id]
  if (accion === 'Sign') { guardar(id, { ...antes, fuera: true }); aviso.ok('Clinical note signed.'); return }
  if (accion === 'Edit') return
  const viva = tareaViva(t)
  const nombre = nombreTarea(t).toLowerCase()
  if (accion === 'Delete') guardar(id, { ...antes, fuera: true, borrada: true })
  else {
    const estado = DESTINO[accion]!
    guardar(id, { ...antes, state: estado, pdf: conPdf(viva, estado), fuera: !PENDIENTES[t.kind]?.includes(estado), updated: HOY() })
  }
  const hecho = (t.kind !== 'Referrals' && MARCADO[accion]) || HECHO[accion]
  aviso.ok(\`The \${nombre} has been successfully \${hecho}.\`)
}

/* El PDF de la tarea (formato de red.dev, documentoTarea.ts) en una pestaña nueva. */
export function abrirPdf(t: PendingTask) {
  const alFallar = () => aviso.error("We couldn't open the PDF. Allow pop-ups for this site and try again.")
  /* Lab order, Prescription y Referral salen de las plantillas de PDF (src/pdfs); la Clinical note, del PDF de la tarea. */
  const hoja = hojaDeRegistro(tareaViva(t))
  if (hoja) abrirHoja(hoja, alFallar)
  else abrirDocumento(documentoTarea(t), alFallar)
}

type Pregunta = { t: PendingTask; accion: Exclude<AccionTarea, 'Edit'> }
type TextoPregunta = { title: string; texto: string }

/* Toda acción que cambia el estado pregunta antes, con el título y el texto de red.dev (recorridos del 2026-11-27 y 28)
   o de Jira cuando red.dev no lo tiene (CON-2356, CON-3436). Como red.dev, todas se contestan con Cancel / Confirm y el
   Confirm va en el azul de la marca, también en Reject, Cancel y Delete (Julián, 2026-11-28). */
const PREGUNTAS: Record<string, Partial<Record<Pregunta['accion'], TextoPregunta>>> = {
  'Lab orders': {
    Request: { title: 'Request lab order', texto: 'Are you sure you want to mark this order as Requested? Once marked as Requested, you will no longer be able to edit this order.' },
    Deliver: { title: 'Deliver lab order', texto: 'Are you sure you want to mark this lab order as Delivered?' },
    Delay: { title: 'Delay lab order', texto: 'Are you sure you want to mark this lab order as Delayed?' },
    Reject: { title: 'Reject lab order', texto: 'Are you sure you want to mark this order as Rejected?' },
    Cancel: { title: 'Cancel lab order', texto: 'Are you sure you want to mark this lab order as Canceled?' },
    Delete: { title: 'Delete lab order', texto: 'Are you sure you want to delete this lab order? This action cannot be undone.' },
  },
  Prescriptions: {
    Activate: { title: 'Activate prescription', texto: 'Are you sure you want to mark this prescription as Active? Once marked as Active, you will no longer be able to edit this prescription.' },
    Expire: { title: 'Expire prescription', texto: 'Are you sure you want to mark this prescription as Expired?' },
    Cancel: { title: 'Cancel prescription', texto: 'Are you sure you want to mark this prescription as Canceled?' },
    Delete: { title: 'Delete prescription', texto: 'Are you sure you want to delete this prescription? This action cannot be undone.' },
  },
  Referrals: {
    Request: { title: 'Request referral', texto: 'Are you sure you want to mark this referral as Requested? Once marked as Requested, you will no longer be able to edit this referral.' },
    Finish: { title: 'Complete referral', texto: 'Are you sure you want to complete this referral?' },
    Reject: { title: 'Reject referral', texto: 'Are you sure you want to reject this referral?' },
    Cancel: { title: 'Cancel referral', texto: 'Are you sure you want to cancel this referral?' },
    Delete: { title: 'Delete referral', texto: 'Are you sure you want to delete this referral? This action cannot be undone.' },
  },
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
    else setPregunta({ t, accion })
  }

  const texto = pregunta && PREGUNTAS[pregunta.t.kind]?.[pregunta.accion]
  const dialogo: ReactNode = pregunta && texto ? (
    <ConfirmDialog
      title={texto.title} confirmLabel="Confirm" cancelLabel="Cancel" icon="warning"
      onCancel={() => setPregunta(null)}
      onConfirm={() => { aplicarAccion(pregunta.t, pregunta.accion); setPregunta(null) }}
    >
      <p>{texto.texto}</p>
    </ConfirmDialog>
  ) : null

  return { hacer, dialogo }
}

/* Las acciones de un registro según su estado, como ítems de menú: las usan el ⋮ de Pending Task, el de la ficha y el
   de las tablas de Clinical Mode. Ninguna pide un encuentro abierto (dashboard.md, 2026-11-27). \`editarApagado\` (las
   tablas de Clinical Mode): fuera de Pending, *Edit* sigue primero pero apagado y dice por qué (clinical-mode.md, 2026-11-28). */
type PropsMenu = { task: PendingTask; onAccion: (t: PendingTask, a: AccionUI) => void; sin?: AccionTarea[]; editarApagado?: boolean }

export function ItemsTarea({ task, onAccion, sin = [], editarApagado }: PropsMenu) {
  const item = (a: AccionTarea, motivo?: string) => {
    const Icono = ICONO[a]
    const opcion = (
      <DropdownMenuItem
        key={a} aria-disabled={!!motivo || undefined} variant={DESTRUCTIVA.includes(a) ? 'destructive' : 'default'}
        onSelect={(e) => { if (motivo) { e.preventDefault(); return } onAccion(task, a) }}
        className={cn('text-[13px]', motivo && 'cursor-not-allowed opacity-50')}
      >
        <Icono className="size-3.5" /> {ETIQUETA[a] ?? a}
      </DropdownMenuItem>
    )
    if (!motivo) return opcion
    return (
      <Tooltip key={a}>
        <TooltipTrigger asChild>{opcion}</TooltipTrigger>
        <TooltipContent side="top" className="max-w-[240px] text-center">{motivo}</TooltipContent>
      </Tooltip>
    )
  }
  const acciones = accionesDe(task).filter((a) => !sin.includes(a))
  const editApagado = editarApagado && !acciones.includes('Edit') && !sin.includes('Edit')
  return (
    <TooltipProvider delayDuration={100}>
      {editApagado && item('Edit', \`This \${nombreTarea(task).toLowerCase()} can only be edited while Pending.\`)}
      {acciones.map((a) => item(a))}
    </TooltipProvider>
  )
}

/** El ⋮ de la tarea, como red.dev: *Options* y las acciones de su estado. Un estado final no tiene menú, salvo con
 *  \`editarApagado\`. */
export function MenuTarea({ task, onAccion, sin = [], editarApagado }: PropsMenu) {
  if (!accionesDe(task).some((a) => !sin.includes(a)) && !(editarApagado && !sin.includes('Edit'))) return null
  return (
    <RowActionsMenu label={\`\${nombreTarea(task)} for \${task.person}\`}>
      <DropdownMenuLabel className="text-[12px] font-semibold text-ink">Options</DropdownMenuLabel>
      <ItemsTarea task={task} onAccion={onAccion} sin={sin} editarApagado={editarApagado} />
    </RowActionsMenu>
  )
}
`})))()}export{r as n,n as r,i as t};