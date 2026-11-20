import { useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Ban, CircleCheck, Info, Pencil, Send, Trash2, type LucideIcon } from 'lucide-react'
import { aviso } from '@/components/ui/toaster'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import { ClinicalNoteDialog } from '@/components/clinical/ClinicalTopBar'
import type { PillTone } from '@/components/ui/pill'
import type { PendingTask } from './PendingTaskCard'

/* Lo que hacen los botones de una tarea de Pending Task, en el Dashboard, en el Patient Dashboard y en el detalle de la
   orden en Clinical Mode. Sale de los videos de red.dev de Julián y de CON-2641 / CON-2643; ver
   design-reference/figma/modulos/dashboard.md (2026-11-20). */

export type AccionTarea = 'Edit' | 'Request' | 'Activate' | 'Cancel' | 'Delete'
export type AccionUI = AccionTarea | 'Complete' | 'PDF'

export const SIN_ENCUENTRO = 'You do not have permission to perform this action because there is no open encounter for the selected patient.'

const SINGULAR: Record<string, string> = { 'Clinical Note': 'Clinical note', 'Lab Orders': 'Lab order', Prescriptions: 'Prescription', Referrals: 'Referral' }
export const nombreTarea = (t: PendingTask) => SINGULAR[t.kind] ?? t.kind

/* La pestaña de Clinical Mode que abre Complete this Task. La Clinical Note se firma ahí mismo. */
export const PESTANA_TAREA: Record<string, string> = { 'Lab Orders': 'Lab Order', Prescriptions: 'Prescription', Referrals: 'Referral' }

export const TONO_ESTADO: Record<string, PillTone> = { Pending: 'warning', Requested: 'purple', Delayed: 'warning', Fulfilled: 'success' }

/* El menú ⋮ según tipo y estado: Lab Order Pending y Prescription como en red.dev; el resto, lo que su estado permite. */
export function accionesDe(t: PendingTask): AccionTarea[] {
  if (t.kind === 'Lab Orders') return t.state === 'Pending' ? ['Edit', 'Request', 'Cancel', 'Delete'] : ['Edit', 'Cancel']
  if (t.kind === 'Prescriptions') return ['Activate', 'Cancel']
  if (t.kind === 'Referrals') return ['Edit', 'Cancel']
  return []
}

const ICONO: Record<AccionTarea, LucideIcon> = { Edit: Pencil, Request: Send, Activate: CircleCheck, Cancel: Ban, Delete: Trash2 }
const DESTRUCTIVA: AccionTarea[] = ['Cancel', 'Delete']

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
export function aplicarAccion(t: PendingTask, accion: AccionTarea | 'Sign') {
  if (!t.id) return
  const id = t.id
  const antes = cambios[id]
  const nombre = nombreTarea(t)
  const deshacer = { label: 'Undo', onClick: () => guardar(id, antes) }
  if (accion === 'Request') { guardar(id, { ...antes, state: 'Requested', pdf: true }); aviso.ok(`${nombre} for ${t.person} requested.`, deshacer) }
  else if (accion === 'Activate') { guardar(id, { ...antes, fuera: true }); aviso.ok(`${nombre} for ${t.person} activated.`, deshacer) }
  else if (accion === 'Cancel') { guardar(id, { ...antes, state: 'Canceled', fuera: true }); aviso.ok(`${nombre} for ${t.person} canceled.`) }
  else if (accion === 'Delete') { guardar(id, { ...antes, fuera: true }); aviso.ok(`${nombre} for ${t.person} deleted.`) }
  else if (accion === 'Sign') { guardar(id, { ...antes, fuera: true }); aviso.ok('Clinical Note signed.') }
}

/* El PDF de la tarea en una pestaña nueva. Sin backend, es el resumen de la tarea listo para imprimir. */
export function abrirPdf(t: PendingTask) {
  const filas = [['Patient', t.person], ['Provider', t.provider ?? '—'], ['Status', t.state], [t.kind === 'Clinical Note' ? 'Completed' : 'Register', t.register], ['Expiration date', t.expiration]]
  const html = `<!doctype html><meta charset="utf-8"><title>${nombreTarea(t)} · ${t.person}</title>
<body style="font:14px system-ui,sans-serif;max-width:640px;margin:48px auto;color:#1f2937">
<h1 style="font-size:20px">${nombreTarea(t)}</h1>
<table style="border-collapse:collapse;width:100%">${filas.map(([k, v]) => `<tr><th style="text-align:left;padding:8px;border-bottom:1px solid #e5e7eb;width:40%">${k}</th><td style="padding:8px;border-bottom:1px solid #e5e7eb">${v}</td></tr>`).join('')}</table>
<script>window.print()</script></body>`
  const ventana = window.open(URL.createObjectURL(new Blob([html], { type: 'text/html' })), '_blank')
  if (!ventana) aviso.error("We couldn't open the PDF. Allow pop-ups for this site and try again.")
}

type Pregunta = { t: PendingTask; accion: 'Cancel' | 'Delete' | 'Sign' }

/** Lo que hace cada botón de la tarea y las preguntas que abre. `paciente` fuerza la ficha (Patient Dashboard);
 *  `alAbrir` corre antes de ir a Clinical Mode (el Dashboard deja el encuentro de ese paciente). */
export function useAccionesTarea({ paciente, alAbrir }: { paciente?: string; alAbrir?: (t: PendingTask) => void } = {}) {
  const navegar = useNavigate()
  const [pregunta, setPregunta] = useState<Pregunta | null>(null)

  const abrir = (t: PendingTask) => {
    alAbrir?.(t)
    const pestana = PESTANA_TAREA[t.kind] ?? 'Lab Order'
    navegar(`/patients/${paciente ?? t.patientId ?? 'john-smith'}/clinical-mode?tab=${encodeURIComponent(pestana)}${t.id ? `&task=${t.id}` : ''}`)
  }

  const hacer = (t: PendingTask, accion: AccionUI) => {
    if (accion === 'PDF') abrirPdf(t)
    else if (accion === 'Complete') { if (t.kind === 'Clinical Note') setPregunta({ t, accion: 'Sign' }); else abrir(t) }
    else if (accion === 'Edit') abrir(t)
    else if (accion === 'Cancel' || accion === 'Delete') setPregunta({ t, accion })
    else aplicarAccion(t, accion)
  }

  const nombre = pregunta ? nombreTarea(pregunta.t) : ''
  const dialogo: ReactNode = !pregunta ? null : pregunta.accion === 'Sign' ? (
    <ClinicalNoteDialog open onClose={() => setPregunta(null)} paciente={pregunta.t.patientId ?? ''} onFirmar={() => aplicarAccion(pregunta.t, 'Sign')} />
  ) : (
    <ConfirmDialog
      title={`${pregunta.accion === 'Cancel' ? 'Cancel' : 'Delete'} this ${nombre.toLowerCase()}?`}
      confirmLabel={`${pregunta.accion === 'Cancel' ? 'Cancel' : 'Delete'} ${nombre.toLowerCase()}`}
      cancelLabel={pregunta.accion === 'Cancel' ? 'Keep it' : 'Cancel'}
      tone="danger" icon={pregunta.accion === 'Delete' ? 'delete' : undefined}
      onCancel={() => setPregunta(null)}
      onConfirm={() => { aplicarAccion(pregunta.t, pregunta.accion as AccionTarea); setPregunta(null) }}
    >
      <p>
        {pregunta.accion === 'Cancel'
          ? `The ${nombre.toLowerCase()} for ${pregunta.t.person} will be canceled and leave Pending Task.`
          : `The ${nombre.toLowerCase()} for ${pregunta.t.person} will be deleted. This can't be undone.`}
      </p>
    </ConfirmDialog>
  )

  return { hacer, dialogo }
}

/* El ⋮ de la tarea. Sin un encuentro abierto con el paciente, las opciones se ven deshabilitadas y el porqué va arriba,
   escrito: en red.dev es un tooltip sobre cada opción, que no se alcanza con el teclado (dashboard.md, 2026-11-20). */
export function MenuTarea({ task, abierto, onAccion, sin = [] }: { task: PendingTask; abierto: boolean; onAccion: (t: PendingTask, a: AccionUI) => void; sin?: AccionTarea[] }) {
  const acciones = accionesDe(task).filter((a) => !sin.includes(a))
  if (!acciones.length) return null
  const item = (a: AccionTarea) => {
    const Icono = ICONO[a]
    return (
      <DropdownMenuItem key={a} disabled={!abierto} variant={DESTRUCTIVA.includes(a) ? 'destructive' : 'default'} onSelect={() => onAccion(task, a)} className="text-[13px]">
        <Icono className="size-3.5" /> {a}
      </DropdownMenuItem>
    )
  }
  return (
    <RowActionsMenu label={`${nombreTarea(task)} for ${task.person}`}>
      <DropdownMenuLabel className="text-[12px] font-semibold text-ink">Options</DropdownMenuLabel>
      {!abierto && (
        <p role="note" className="mx-1 mb-1 flex max-w-[248px] gap-1.5 rounded-md bg-info-bg px-2 py-1.5 text-[11px] leading-snug text-ink">
          <Info className="text-dash-blue mt-px size-3.5 shrink-0" aria-hidden /> {SIN_ENCUENTRO}
        </p>
      )}
      {acciones.filter((a) => !DESTRUCTIVA.includes(a)).map(item)}
      {acciones.some((a) => DESTRUCTIVA.includes(a)) && acciones.some((a) => !DESTRUCTIVA.includes(a)) && <DropdownMenuSeparator />}
      {acciones.filter((a) => DESTRUCTIVA.includes(a)).map(item)}
    </RowActionsMenu>
  )
}
