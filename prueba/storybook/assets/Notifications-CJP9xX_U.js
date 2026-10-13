import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarX2, CheckCheck, Eye, EyeOff, Inbox, type LucideIcon } from 'lucide-react'
import { PageTitle } from '@/components/ui/page-title'
import { Tabs } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { DateFilter, inRange, type DateRange } from '@/components/ui/date-filter'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { aviso } from '@/components/ui/toaster'
import { CONTENEDOR_PAGINA, ICONO_SUELTO } from '@/lib/estilos'
import { cn } from '@/lib/utils'
import { fechaDe, grupoDe, haceCuanto, type EstadoNotificacion } from '@/data/notificaciones'
import { useNotificaciones, type NotificacionViva } from '@/data/notificacionesStore'

/* Notifications: todas las notificaciones, con la lógica del Inbox de Notion. Inbox muestra las leídas y las sin leer;
   Unread, sólo las sin leer (Pending y Archived se sacaron, Julián 2026-10-13). Abrir una la marca leída y lleva a
   donde pasó. Se llega desde la campana ("View all notifications"). Con muchas, el filtro de fecha acota pestañas,
   lista y Mark all as read. Ver design-reference/figma/modulos/notifications.md. */

export type Vista = 'Inbox' | 'Unread'

const EN_VISTA: Record<Vista, (n: NotificacionViva) => boolean> = {
  Inbox: () => true,
  Unread: (n) => n.estado === 'unread',
}

export const VACIO: Record<Vista, { icon: LucideIcon; title: string; detail: string }> = {
  Inbox: { icon: Inbox, title: 'You’re all caught up', detail: 'New notifications will show up here.' },
  Unread: { icon: CheckCheck, title: 'No unread notifications', detail: 'You’ve read everything. New ones will show up here.' },
}

/* Con fechas elegidas y nada en ellas: lo dice y ofrece sacar el filtro (notifications.md, 2026-10-12). */
export const VACIO_FECHAS: Record<Vista, string> = {
  Inbox: 'No notifications on these dates',
  Unread: 'No unread notifications on these dates',
}

/* Un botón de ícono de la fila, con su nombre para el lector de pantalla y el tooltip de la app (el oscuro, como en el
   menú del paciente), que dice qué hace antes de tocarlo. */
export function Accion({ label, icon: Icon, onClick }: { label: string; icon: LucideIcon; onClick: () => void }) {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button type="button" onClick={onClick} aria-label={label} className={cn(ICONO_SUELTO, 'text-ink-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-dash-blue')}>
            <Icon className="size-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={4} className="bg-ink text-white">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

/* Una notificación. Sin leer: punto azul, fondo apenas azul y título en negrita; leída, texto más apagado. El ícono es
   gris en todas. Punto, ícono, título y acción van centrados en la misma línea. La acción (el ojo: leída / no leída,
   pedido de Julián 2026-10-13) aparece al pasar el mouse o al llegar con el teclado, como en Notion, con su tooltip; en
   pantallas chicas queda a la vista. */
export function FilaNotificacion({ n, onAbrir, onMarcar }: {
  n: NotificacionViva
  onAbrir: (n: NotificacionViva) => void
  onMarcar: (n: NotificacionViva, estado: EstadoNotificacion) => void
}) {
  const sinLeer = n.estado === 'unread'
  return (
    <li className={cn('group flex items-start gap-3 border-b border-line-row px-4 py-3 transition-colors last:border-b-0 hover:bg-surface-subtle', sinLeer && 'bg-info-bg/50')}>
      {/* El centro de todo es el del ícono (36px): el punto (8px) baja 14px, el título (20px de alto) 8px y la acción (28px) 4px. */}
      <span aria-hidden className={cn('mt-3.5 size-2 shrink-0 rounded-full', sinLeer ? 'bg-dash-blue' : 'bg-transparent')} />
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-slate text-ink-slate">
        <n.icon className="size-4" />
      </span>
      <button type="button" onClick={() => onAbrir(n)} className="min-w-0 flex-1 rounded-sm pt-2 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dash-blue">
        <span className={cn('block text-[13.5px] leading-5 text-ink', sinLeer ? 'font-semibold' : 'font-medium')}>
          {n.titulo}
          {sinLeer && <span className="sr-only"> (unread)</span>}
        </span>
        <span className={cn('mt-0.5 block text-[13px] leading-snug', sinLeer ? 'text-ink-medium' : 'text-ink-muted')}>{n.detalle}</span>
        <span className="mt-1 flex flex-wrap items-center gap-x-1.5 text-[12px] text-ink-faint">
          <span>{haceCuanto(n.hace)}</span>
          {n.autor && <><span aria-hidden>·</span><span>{n.autor}</span></>}
          <span aria-hidden>·</span>
          <span className="font-medium text-dash-blue group-hover:underline">{n.accion}</span>
        </span>
      </button>
      <span className="mt-1 flex shrink-0 items-center sm:opacity-0 sm:transition-opacity sm:group-focus-within:opacity-100 sm:group-hover:opacity-100">
        <Accion label={sinLeer ? 'Mark as read' : 'Mark as unread'} icon={sinLeer ? Eye : EyeOff} onClick={() => onMarcar(n, sinLeer ? 'read' : 'unread')} />
      </span>
    </li>
  )
}

export default function Notifications() {
  const navigate = useNavigate()
  const notis = useNotificaciones()
  const [vista, setVista] = useState<Vista>('Inbox')
  const [fechas, setFechas] = useState<DateRange | null>(null)

  /* Las fechas acotan todo lo de abajo: los números de las pestañas, la lista y las acciones en lote. */
  const delRango = notis.items.filter((n) => !fechas || inRange(fechaDe(n.hace), fechas))
  const visibles = [...delRango].sort((a, b) => a.hace - b.hace).filter(EN_VISTA[vista])
  const cuenta = (v: Vista) => delRango.filter(EN_VISTA[v]).length
  const sinLeer = delRango.filter((n) => n.estado === 'unread')
  /* El punto del calendario: días con algo en la pestaña abierta. */
  const diasConNotis = notis.items.filter(EN_VISTA[vista]).map((n) => fechaDe(n.hace))
  /* Grupos en el orden en que aparecen (la lista ya va de la más nueva a la más vieja). */
  const grupos = visibles.reduce<{ titulo: string; items: NotificacionViva[] }[]>((acc, n) => {
    const titulo = grupoDe(n.hace)
    if (acc.at(-1)?.titulo === titulo) acc.at(-1)!.items.push(n)
    else acc.push({ titulo, items: [n] })
    return acc
  }, [])

  /* Mark all as read avisa con Undo, que las vuelve a dejar sin leer. */
  const marcarTodas = () => {
    const ids = sinLeer.map((n) => n.id)
    notis.marcar(ids, 'read')
    aviso.ok(\`\${ids.length} notification\${ids.length === 1 ? '' : 's'} marked as read.\`, { label: 'Undo', onClick: () => notis.marcar(ids, 'unread') })
  }

  const abrir = (n: NotificacionViva) => {
    notis.abrir(n.id)
    notis.volverAlBanner(n.id)
    navigate(n.to)
  }

  return (
    <div className={CONTENEDOR_PAGINA}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <PageTitle>Notifications</PageTitle>
          <p className="text-[13px] text-ink-muted">Open one to go where it happened, or mark it as read or unread.</p>
        </div>
        {/* Sin menú ⋮: sólo tenía acciones de archivar (notifications.md, 2026-10-13). */}
        <Button variant="secondary" size="md" disabled={!sinLeer.length} onClick={marcarTodas}>
          <CheckCheck /> Mark all as read
        </Button>
      </div>

      {/* Pestañas y fecha en la misma fila: las dos cambian qué se ve. En el celular la fecha baja. */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <Tabs
          aria-label="Filter notifications"
          tabs={(['Inbox', 'Unread'] as const).map((v) => ({ value: v, count: cuenta(v) }))}
          value={vista}
          onChange={setVista}
        />
        <DateFilter value={fechas} onChange={setFechas} marked={diasConNotis} label="Filter notifications by date" />
      </div>

      <section aria-label={\`\${vista} notifications\`} className="mt-4 overflow-hidden rounded-lg bg-white shadow-panel">
        {grupos.length ? (
          grupos.map((g) => (
            <div key={g.titulo}>
              <h2 className="border-b border-line-row bg-surface-subtle px-4 py-2 text-[11px] font-semibold tracking-[0.06em] text-ink-muted uppercase">{g.titulo}</h2>
              <ul className="m-0 list-none p-0">
                {g.items.map((n) => (
                  <FilaNotificacion key={n.id} n={n} onAbrir={abrir} onMarcar={(x, estado) => notis.marcar([x.id], estado)} />
                ))}
              </ul>
            </div>
          ))
        ) : fechas ? (
          <EmptyState
            className="py-14"
            icon={CalendarX2}
            title={VACIO_FECHAS[vista]}
            detail="Pick other dates, or clear them to see everything."
            accion={{ label: 'Clear dates', onClick: () => setFechas(null) }}
          />
        ) : (
          <EmptyState className="py-14" {...VACIO[vista]} />
        )}
      </section>
    </div>
  )
}
`})))()}export{n,i as r,r as t};