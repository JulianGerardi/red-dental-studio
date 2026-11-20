import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Ban, CircleX, Clock, Package, Pencil, Power, Send, Trash2, type LucideIcon } from 'lucide-react'
import { aviso } from '@/components/ui/toaster'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { DropdownMenuItem, DropdownMenuLabel } from '@/components/ui/dropdown-menu'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import type { PillTone } from '@/components/ui/pill'
import type { PendingTask } from './PendingTaskCard'
import { abrirDocumento, abrirPdfEnPestana, documentoTarea, ordenDeLab, pdfOrdenLab } from './documentoTarea'

/* Lo que hacen los botones de una tarea de Pending Task, en el Dashboard, en el Patient Dashboard y en el detalle de la
   orden en Clinical Mode. Sale de los videos de red.dev de Julián (sólo lo que muestran); ver
   design-reference/figma/modulos/dashboard.md (2026-11-20). */

export type AccionTarea = 'Edit' | 'Request' | 'Reject' | 'Deliver' | 'Delay' | 'Activate' | 'Cancel' | 'Delete'
export type AccionUI = AccionTarea | 'Complete' | 'PDF'

export const SIN_ENCUENTRO = 'You do not have permission to perform this action because there is no open encounter for the selected patient.'
export const SOLO_PENDING = 'This lab order can only be edited while Pending.'

const SINGULAR: Record<string, string> = { 'Clinical note': 'Clinical note', 'Lab orders': 'Lab order', Prescriptions: 'Prescription', Referrals: 'Referral' }
export const nombreTarea = (t: PendingTask) => SINGULAR[t.kind] ?? t.kind

/* La pestaña de Clinical Mode que abre Complete this Task. La Clinical Note abre su propia pantalla. */
export const PESTANA_TAREA: Record<string, string> = { 'Lab orders': 'Lab order', Prescriptions: 'Prescription', Referrals: 'Referral' }

/* Los colores de red.dev: Pending naranja, Requested azul, Fulfilled rojo, Cancelled negro. */
export const TONO_ESTADO: Record<string, PillTone> = {
  Pending: 'warning', Requested: 'info', Delayed: 'warning', Fulfilled: 'danger',
  Cancelled: 'neutral', Rejected: 'danger', Delivered: 'success', Active: 'success',
}

/* El menú ⋮ de red.dev según el estado (videos de Julián, 2026-11-20): una Lab Order Pending lleva Edit, Request,
   Cancel y Delete; una Requested, Edit (sólo se edita en Pending), Reject, Deliver, Delay y Cancel. Prescription,
   Activate y Cancel. La Clinical Note no lleva y el de Referral no aparece en los videos. */
export function accionesDe(t: PendingTask): AccionTarea[] {
  if (t.kind === 'Lab orders') {
    if (t.state === 'Pending') return ['Edit', 'Request', 'Cancel', 'Delete']
    if (t.state === 'Requested') return ['Edit', 'Reject', 'Deliver', 'Delay', 'Cancel']
    if (t.state === 'Delayed') return ['Edit', 'Reject', 'Deliver', 'Cancel']
    return ['Edit']
  }
  if (t.kind === 'Prescriptions' && t.state === 'Pending') return ['Activate', 'Cancel']
  return []
}

/* Por qué una opción está apagada, o nada si se puede usar. */
export function bloqueoDe(t: PendingTask, a: AccionTarea, abierto: boolean) {
  if (!abierto) return SIN_ENCUENTRO
  if (a === 'Edit' && t.kind === 'Lab orders' && t.state !== 'Pending') return SOLO_PENDING
  return undefined
}

const ICONO: Record<AccionTarea, LucideIcon> = {
  Edit: Pencil, Request: Send, Reject: CircleX, Deliver: Package, Delay: Clock, Activate: Power, Cancel: Ban, Delete: Trash2,
}
const DESTRUCTIVA: AccionTarea[] = ['Reject', 'Cancel', 'Delete']

/* Cada cambio de estado pregunta antes y avisa después, con los textos de red.dev. Delete y las de Prescription no
   aparecen en los videos: siguen el mismo molde. */
type Cambio2 = { estado?: string; titulo: string; pregunta: string; aviso: string; detalle: string }
const CAMBIOS_LAB: Partial<Record<AccionTarea, Cambio2>> = {
  Request: { estado: 'Requested', titulo: 'Request lab order', pregunta: 'Are you sure you want to mark this order as Requested? Once marked as Requested, you will no longer be able to edit this order.', aviso: 'Lab order requested', detalle: 'The lab order has been successfully marked as Requested.' },
  Reject: { estado: 'Rejected', titulo: 'Reject lab order', pregunta: 'Are you sure you want to mark this order as Rejected?', aviso: 'Lab order rejected', detalle: 'The lab order has been successfully marked as Rejected.' },
  Deliver: { estado: 'Delivered', titulo: 'Deliver lab order', pregunta: 'Are you sure you want to mark this lab order as Delivered?', aviso: 'Lab order delivered', detalle: 'The lab order has been successfully marked as Delivered.' },
  Delay: { estado: 'Delayed', titulo: 'Delay lab order', pregunta: 'Are you sure you want to mark this lab order as Delayed?', aviso: 'Lab order delayed', detalle: 'The lab order has been successfully marked as Delayed.' },
  Cancel: { estado: 'Cancelled', titulo: 'Cancel lab order', pregunta: 'Are you sure you want to mark this lab order as Cancelled?', aviso: 'Lab order cancelled', detalle: 'The lab order has been successfully marked as Cancelled.' },
  Delete: { titulo: 'Delete lab order', pregunta: 'Are you sure you want to delete this lab order?', aviso: 'Lab order deleted', detalle: 'The lab order has been successfully deleted.' },
}
const CAMBIOS_RECETA: Partial<Record<AccionTarea, Cambio2>> = {
  Activate: { estado: 'Active', titulo: 'Activate prescription', pregunta: 'Are you sure you want to mark this prescription as Active?', aviso: 'Prescription activated', detalle: 'The prescription has been successfully marked as Active.' },
  Cancel: { estado: 'Cancelled', titulo: 'Cancel prescription', pregunta: 'Are you sure you want to mark this prescription as Cancelled?', aviso: 'Prescription cancelled', detalle: 'The prescription has been successfully marked as Cancelled.' },
}
const cambioDe = (t: PendingTask, a: AccionTarea) => (t.kind === 'Lab orders' ? CAMBIOS_LAB : CAMBIOS_RECETA)[a]

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

/** Las tareas con sus cambios. Se quedan en la lista con su estado nuevo, como red.dev; sólo Delete y la firma las sacan. */
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

/* El cambio ya confirmado. La tarea se queda en la lista con su estado nuevo, como en red.dev; Delete y la firma de la
   Clinical Note la sacan. */
export function aplicarAccion(t: PendingTask, accion: AccionTarea | 'Sign') {
  if (!t.id) return
  const antes = cambios[t.id]
  if (accion === 'Sign') { guardar(t.id, { ...antes, fuera: true }); aviso.ok('Clinical note signed.'); return }
  const c = cambioDe(t, accion)
  if (!c) return
  if (accion === 'Delete') guardar(t.id, { ...antes, fuera: true })
  else guardar(t.id, { ...antes, state: c.estado, pdf: accion === 'Request' ? true : (antes?.pdf ?? t.pdf) })
  aviso.ok({ titulo: c.aviso, texto: c.detalle })
}

/* El PDF de la tarea (formato de red.dev, documentoTarea.ts) en una pestaña nueva. */
const sinPestana = () => aviso.error("We couldn't open the PDF. Allow pop-ups for this site and try again.")
export const abrirPdf = (t: PendingTask) =>
  t.kind === 'Lab orders'
    ? abrirPdfEnPestana('Lab Order', () => pdfOrdenLab(ordenDeLab(t)), sinPestana)
    : abrirDocumento(documentoTarea(t), sinPestana)

type Pregunta = { t: PendingTask; accion: AccionTarea }

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
    else if (cambioDe(t, accion)) setPregunta({ t, accion })
  }

  const c = pregunta && cambioDe(pregunta.t, pregunta.accion)
  const dialogo: ReactNode = !pregunta || !c ? null : (
    <ConfirmDialog
      title={c.titulo} confirmLabel="Confirm"
      onCancel={() => setPregunta(null)}
      onConfirm={() => { aplicarAccion(pregunta.t, pregunta.accion); setPregunta(null) }}
    >
      <p>{c.pregunta}</p>
    </ConfirmDialog>
  )

  return { hacer, dialogo }
}

/* El ⋮ de la tarea, como red.dev: *Options* y las acciones. Sin un encuentro abierto con el paciente se ven apagadas, y
   Edit fuera de Pending también; cada una explica por qué en un tooltip, que abre también con el foco del teclado (por
   eso no van \`disabled\`: Radix les quita el puntero y el foco). */
export function MenuTarea({ task, abierto, onAccion, sin = [] }: { task: PendingTask; abierto: boolean; onAccion: (t: PendingTask, a: AccionUI) => void; sin?: AccionTarea[] }) {
  const acciones = accionesDe(task).filter((a) => !sin.includes(a))
  if (!acciones.length) return null
  const item = (a: AccionTarea) => {
    const Icono = ICONO[a]
    const bloqueo = bloqueoDe(task, a, abierto)
    const opcion = (
      <DropdownMenuItem
        key={a} aria-disabled={!!bloqueo || undefined} variant={DESTRUCTIVA.includes(a) ? 'destructive' : 'default'}
        onSelect={(e) => { if (bloqueo) { e.preventDefault(); return } onAccion(task, a) }}
        className={cn('text-[13px]', bloqueo && 'cursor-not-allowed opacity-50')}
      >
        <Icono className="size-3.5" /> {a}
      </DropdownMenuItem>
    )
    if (!bloqueo) return opcion
    return (
      <Tooltip key={a}>
        <TooltipTrigger asChild>{opcion}</TooltipTrigger>
        <TooltipContent side="top" className="max-w-[240px] text-center">{bloqueo}</TooltipContent>
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