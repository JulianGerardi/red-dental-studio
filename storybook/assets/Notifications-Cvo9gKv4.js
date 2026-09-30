import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Archive, ArchiveRestore, CheckCheck, Clock, Inbox, Mail, MailOpen, type LucideIcon } from 'lucide-react'
import { PageTitle } from '@/components/ui/page-title'
import { Tabs } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Pill } from '@/components/ui/pill'
import { EmptyState } from '@/components/ui/empty-state'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { aviso } from '@/components/ui/toaster'
import { CONTENEDOR_PAGINA, ICONO_SUELTO } from '@/lib/estilos'
import { cn } from '@/lib/utils'
import { grupoDe, haceCuanto, type EstadoNotificacion } from '@/data/notificaciones'
import { useNotificaciones, type NotificacionViva } from '@/data/notificacionesStore'

/* Notifications: todas las notificaciones, con la lógica del Inbox de Notion. Inbox muestra las leídas y las sin leer;
   Unread, sólo las sin leer; Archived, las archivadas. Suma Pending, lo que quedó para hacer (Notion no lo tiene; acá
   las notificaciones son tareas). Abrir una la marca leída y lleva a donde pasó. Se llega desde la campana ("View all
   notifications"). Ver design-reference/figma/modulos/notifications.md. */

export type Vista = 'Inbox' | 'Unread' | 'Pending' | 'Archived'

const EN_VISTA: Record<Vista, (n: NotificacionViva) => boolean> = {
  Inbox: (n) => !n.archivada,
  Unread: (n) => !n.archivada && n.estado === 'unread',
  Pending: (n) => !n.archivada && n.estado === 'pending',
  Archived: (n) => n.archivada,
}

const VACIO: Record<Vista, { icon: LucideIcon; title: string; detail: string }> = {
  Inbox: { icon: Inbox, title: 'You’re all caught up', detail: 'New notifications will show up here.' },
  Unread: { icon: CheckCheck, title: 'No unread notifications', detail: 'You’ve read everything. What you left for later is in Pending.' },
  Pending: { icon: Clock, title: 'Nothing pending', detail: 'Mark a notification as pending to come back to it later.' },
  Archived: { icon: Archive, title: 'No archived notifications', detail: 'Archive what’s done to keep your inbox short.' },
}

const GRUPOS = ['Today', 'Yesterday', 'This week', 'Older'] as const

/* Un botón de ícono de la fila, con su nombre para el lector de pantalla y el tooltip de la app (el oscuro, como en el
   menú del paciente), que dice qué hace antes de tocarlo. */
export function Accion({ label, icon: Icon, activo, onClick }: { label: string; icon: LucideIcon; activo?: boolean; onClick: () => void }) {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button type="button" onClick={onClick} aria-label={label} className={cn(ICONO_SUELTO, 'text-ink-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-dash-blue', activo && 'text-warn-fg hover:text-warn-fg')}>
            <Icon className="size-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={4} className="bg-ink text-white">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

/* Una notificación. Sin leer: punto azul, fondo apenas azul y título en negrita. Pendiente: la etiqueta ámbar.
   Las tres acciones (leída/no leída, pendiente, archivar) aparecen al pasar el mouse o al llegar con el teclado, como en
   Notion, cada una con su tooltip; en pantallas chicas quedan a la vista. Sin menú ⋮: repetía lo mismo. */
export function FilaNotificacion({ n, onAbrir, onMarcar, onArchivar }: {
  n: NotificacionViva
  onAbrir: (n: NotificacionViva) => void
  onMarcar: (n: NotificacionViva, estado: EstadoNotificacion) => void
  onArchivar: (n: NotificacionViva, archivada: boolean) => void
}) {
  const sinLeer = n.estado === 'unread'
  const pendiente = n.estado === 'pending'
  return (
    <li className={cn('group flex items-start gap-3 border-b border-line-row px-4 py-3 transition-colors last:border-b-0 hover:bg-surface-subtle', sinLeer && 'bg-info-bg/50')}>
      <span aria-hidden className={cn('mt-[15px] size-2 shrink-0 rounded-full', sinLeer ? 'bg-dash-blue' : 'bg-transparent')} />
      <span className={cn('flex size-9 shrink-0 items-center justify-center rounded-full', n.tarea ? 'bg-warn-bg text-attn-fg' : 'bg-surface-slate text-ink-slate')}>
        <n.icon className="size-4" />
      </span>
      <button type="button" onClick={() => onAbrir(n)} className="min-w-0 flex-1 rounded-sm text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dash-blue">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className={cn('text-[13.5px] text-ink', sinLeer ? 'font-semibold' : 'font-medium')}>{n.titulo}</span>
          {pendiente && <Pill tone="warning" size="sm">Pending</Pill>}
          {sinLeer && <span className="sr-only">(unread)</span>}
        </span>
        <span className={cn('mt-0.5 block text-[13px] leading-snug', n.estado === 'read' ? 'text-ink-muted' : 'text-ink-medium')}>{n.detalle}</span>
        <span className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[12px] text-ink-faint">
          <span>{haceCuanto(n.hace)}</span>
          {n.autor && <><span aria-hidden>·</span><span>{n.autor}</span></>}
          <span aria-hidden>·</span>
          <span className="font-medium text-dash-blue group-hover:underline">{n.accion}</span>
        </span>
      </button>
      <span className="flex shrink-0 items-center gap-0.5 sm:opacity-0 sm:transition-opacity sm:group-focus-within:opacity-100 sm:group-hover:opacity-100">
        <Accion label={sinLeer ? 'Mark as read' : 'Mark as unread'} icon={sinLeer ? MailOpen : Mail} onClick={() => onMarcar(n, sinLeer ? 'read' : 'unread')} />
        <Accion label={pendiente ? 'Remove from pending' : 'Mark as pending'} icon={Clock} activo={pendiente} onClick={() => onMarcar(n, pendiente ? 'read' : 'pending')} />
        <Accion label={n.archivada ? 'Move to inbox' : 'Archive'} icon={n.archivada ? ArchiveRestore : Archive} onClick={() => onArchivar(n, !n.archivada)} />
      </span>
    </li>
  )
}

export default function Notifications() {
  const navigate = useNavigate()
  const notis = useNotificaciones()
  const [vista, setVista] = useState<Vista>('Inbox')

  const ordenadas = [...notis.items].sort((a, b) => a.hace - b.hace)
  const visibles = ordenadas.filter(EN_VISTA[vista])
  const cuenta = (v: Vista) => notis.items.filter(EN_VISTA[v]).length
  const sinLeer = notis.items.filter((n) => !n.archivada && n.estado === 'unread')
  const leidas = notis.items.filter((n) => !n.archivada && n.estado === 'read')
  const enInbox = notis.items.filter((n) => !n.archivada)

  /* Todo cambio masivo avisa con Undo, que devuelve cada una a como estaba. */
  const conUndo = (mensaje: string, antes: NotificacionViva[], hacer: () => void) => {
    hacer()
    aviso.ok(mensaje, {
      label: 'Undo',
      onClick: () => antes.forEach((n) => { notis.marcar([n.id], n.estado); notis.archivar([n.id], n.archivada) }),
    })
  }
  const plural = (k: number) => \`\${k} notification\${k === 1 ? '' : 's'}\`

  const abrir = (n: NotificacionViva) => {
    notis.abrir(n.id)
    notis.volverAlBanner(n.id)
    navigate(n.to)
  }
  const archivar = (n: NotificacionViva, archivada: boolean) =>
    conUndo(archivada ? 'Notification archived.' : 'Moved back to the inbox.', [n], () => notis.archivar([n.id], archivada))

  return (
    <div className={CONTENEDOR_PAGINA}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <PageTitle>Notifications</PageTitle>
          <p className="text-[13px] text-ink-muted">Mark each one as read, pending or unread, and archive what’s done.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="md"
            disabled={!sinLeer.length}
            onClick={() => conUndo(\`\${plural(sinLeer.length)} marked as read.\`, sinLeer, () => notis.marcar(sinLeer.map((n) => n.id), 'read'))}
          >
            <CheckCheck /> Mark all as read
          </Button>
          <RowActionsMenu label="all notifications" className="size-8 rounded-md border border-line bg-white">
            <DropdownMenuItem disabled={!leidas.length} onSelect={() => conUndo(\`\${plural(leidas.length)} archived.\`, leidas, () => notis.archivar(leidas.map((n) => n.id), true))}>
              <Archive /> Archive read
            </DropdownMenuItem>
            <DropdownMenuItem disabled={!enInbox.length} onSelect={() => conUndo(\`\${plural(enInbox.length)} archived.\`, enInbox, () => notis.archivar(enInbox.map((n) => n.id), true))}>
              <Archive /> Archive all
            </DropdownMenuItem>
          </RowActionsMenu>
        </div>
      </div>

      <Tabs
        className="mt-5"
        aria-label="Filter notifications"
        tabs={(['Inbox', 'Unread', 'Pending', 'Archived'] as const).map((v) => ({ value: v, count: cuenta(v) }))}
        value={vista}
        onChange={setVista}
      />

      <section aria-label={\`\${vista} notifications\`} className="mt-4 overflow-hidden rounded-lg border border-line bg-white">
        {visibles.length ? (
          GRUPOS.map((g) => {
            const del = visibles.filter((n) => grupoDe(n.hace) === g)
            if (!del.length) return null
            return (
              <div key={g}>
                <h2 className="border-b border-line-row bg-surface-subtle px-4 py-2 text-[11px] font-semibold tracking-[0.06em] text-ink-muted uppercase">{g}</h2>
                <ul className="m-0 list-none p-0">
                  {del.map((n) => (
                    <FilaNotificacion key={n.id} n={n} onAbrir={abrir} onMarcar={(x, estado) => notis.marcar([x.id], estado)} onArchivar={archivar} />
                  ))}
                </ul>
              </div>
            )
          })
        ) : (
          <EmptyState className="py-14" {...VACIO[vista]} />
        )}
      </section>
    </div>
  )
}
`})))()}export{n,i as r,r as t};