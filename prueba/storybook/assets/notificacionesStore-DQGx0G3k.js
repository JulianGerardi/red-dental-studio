import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { NOTIFICACIONES, type EstadoNotificacion, type Notificacion } from './notificaciones'

/* Store en memoria de las notificaciones: lo comparten la campana, el banner y la pantalla Notifications. Como el de
   pacientes, no persiste entre recargas (es un prototipo; la demo arranca siempre igual). Ver
   design-reference/figma/modulos/notifications.md. */

export type NotificacionViva = Notificacion & { archivada: boolean }

type Ctx = {
  items: NotificacionViva[]
  /** Sacadas del banner con la X: siguen en la campana y en la pantalla. */
  ocultas: string[]
  marcar: (ids: string[], estado: EstadoNotificacion) => void
  /** Abrirla la marca leída, como en Notion; una pendiente sigue pendiente. */
  abrir: (id: string) => void
  archivar: (ids: string[], archivada: boolean) => void
  ocultarDelBanner: (id: string) => void
  volverAlBanner: (id: string) => void
}

const Contexto = createContext<Ctx | null>(null)

export function NotificacionesProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<NotificacionViva[]>(() => NOTIFICACIONES.map((n) => ({ ...n, archivada: n.archivada ?? false })))
  const [ocultas, setOcultas] = useState<string[]>([])

  const cambiar = useCallback((ids: string[], f: (n: NotificacionViva) => NotificacionViva) =>
    setItems((xs) => xs.map((n) => (ids.includes(n.id) ? f(n) : n))), [])

  const valor = useMemo<Ctx>(() => ({
    items,
    ocultas,
    marcar: (ids, estado) => cambiar(ids, (n) => ({ ...n, estado })),
    abrir: (id) => cambiar([id], (n) => (n.estado === 'unread' ? { ...n, estado: 'read' } : n)),
    archivar: (ids, archivada) => cambiar(ids, (n) => ({ ...n, archivada })),
    ocultarDelBanner: (id) => setOcultas((xs) => (xs.includes(id) ? xs : [...xs, id])),
    volverAlBanner: (id) => setOcultas((xs) => xs.filter((x) => x !== id)),
  }), [items, ocultas, cambiar])

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>
}

export function useNotificaciones() {
  const ctx = useContext(Contexto)
  if (!ctx) throw new Error('useNotificaciones must be used inside NotificacionesProvider')
  return ctx
}

/* Las del banner: tareas sin resolver (sin leer o pendientes), no archivadas ni sacadas con la X. */
export const delBanner = (items: NotificacionViva[], ocultas: string[]) =>
  items.filter((n) => n.tarea && n.estado !== 'read' && !n.archivada && !ocultas.includes(n.id))
`})))()}export{r as n,n as r,i as t};