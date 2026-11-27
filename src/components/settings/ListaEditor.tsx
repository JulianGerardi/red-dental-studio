import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Power, PowerOff, Search, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Pill, type PillTone } from '@/components/ui/pill'
import { SearchInput } from '@/components/ui/search-input'
import { EmptyState } from '@/components/ui/empty-state'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { TARJETA_PANEL } from '@/lib/estilos'

/* Patrón común de Coverage tables y Consent templates: lista a la izquierda y editor a la derecha, en dos cards. Ver
   settings-billing.md y consents.md (2026-11-24, estandarización). */

/* Lista de 340 px y el editor con el resto; en angosto, una debajo de la otra. Va dentro de un `@container`. */
export const GRILLA_LISTA_EDITOR = 'mt-5 grid grid-cols-1 items-start gap-5 @3xl:grid-cols-[340px_minmax(0,1fr)]'
/* La card del editor: el pie (PieEditor) cuenta con este padding. */
export const TARJETA_EDITOR = cn(TARJETA_PANEL, 'flex min-w-0 flex-col gap-4 p-4 sm:p-5')

/* El panel de la izquierda: título, buscador (con Filter al lado si hay), pestañas si hay y la lista. */
export function PanelLista({ titulo, q, onQ, placeholder, filtro, pestanas, vacio, children }: {
  titulo: string
  q: string
  onQ: (v: string) => void
  placeholder: string
  /** Al lado del buscador: Filter en Consents. */
  filtro?: ReactNode
  /** Debajo del buscador: Percentage / Copayment en Coverage. */
  pestanas?: ReactNode
  /** Sin coincidencias. */
  vacio: boolean
  children: ReactNode
}) {
  return (
    <section aria-label={titulo} className={cn(TARJETA_PANEL, 'flex flex-col gap-3 p-4 sm:p-5')}>
      <h2 className="text-sm font-bold text-ink">{titulo}</h2>
      <div className="flex items-center gap-2">
        <SearchInput size="sm" value={q} onChange={onQ} placeholder={placeholder} aria-label={placeholder} clearable className="sm:max-w-none" />
        {filtro}
      </div>
      {pestanas}
      <ul aria-label={titulo} className="-m-1 flex max-h-[560px] flex-col gap-2 overflow-y-auto p-1">
        {vacio ? <li><EmptyState icon={Search} title="No matching results" className="py-6" /></li> : children}
      </ul>
    </section>
  )
}

/* Un estado con otro nombre que Active / Inactive (Archived en Fee schedules), con el tono de su pill. */
export type EstadoLista = { nombre: string; tono: PillTone }
const pillEstado = (activo: boolean, estado?: EstadoLista) =>
  estado ?? { nombre: activo ? 'Active' : 'Inactive', tono: activo ? 'success' as const : 'neutral' as const }

/* Un ítem de la lista: nombre y ⋮ en la primera línea, estado y datos secundarios debajo. Se abre con `to` (ruta) u
   `onElegir`. El menú: Activate o Deactivate y, después de una línea, Delete en rojo; `acciones` lo reemplaza. */
export function ItemLista({ nombre, activo, estado, elegido, to, onElegir, extra, onAlternar, onBorrar, acciones, bloqueado, abierto }: {
  nombre: string
  activo: boolean
  /** La pill cuando no es Active / Inactive: los estados de un fee schedule. */
  estado?: EstadoLista
  elegido: boolean
  to?: string
  onElegir?: () => void
  /** Debajo del nombre, después del estado: System, cantidad de procedimientos, Default. */
  extra?: ReactNode
  onAlternar?: () => void
  onBorrar?: () => void
  /** Los ítems del ⋮ en lugar de Activate / Delete (Fee schedules: Inactive y Archive). */
  acciones?: ReactNode
  /** El motivo por el que no se puede activar, desactivar ni borrar (un template System): las acciones quedan deshabilitadas. */
  bloqueado?: string
  /** Sólo para las stories: deja el menú abierto. */
  abierto?: boolean
}) {
  const contenido = (
    <>
      <span className={cn('line-clamp-2 w-full text-sm font-semibold', activo ? 'text-ink' : 'text-ink-faint')}>{nombre}</span>
      <span className="flex flex-wrap items-center gap-1.5">
        <Pill tone={pillEstado(activo, estado).tono} size="sm">{pillEstado(activo, estado).nombre}</Pill>
        {extra}
      </span>
    </>
  )
  const area = 'flex min-w-0 flex-1 flex-col items-start gap-1.5 text-left focus-visible:outline-none'
  return (
    <li
      className={cn(
        'flex items-start gap-2 rounded-lg border py-2.5 pr-2 pl-3 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-dash-blue/40',
        elegido ? 'border-dash-blue bg-info-bg' : 'border-line bg-surface hover:bg-surface-subtle',
      )}
    >
      {to ? (
        <Link to={to} aria-current={elegido ? 'page' : undefined} className={area}>{contenido}</Link>
      ) : (
        <button type="button" onClick={onElegir} aria-current={elegido || undefined} className={area}>{contenido}</button>
      )}
      <RowActionsMenu label={nombre} abierto={abierto} className="-my-0.5">
        {acciones ?? <>
        <DropdownMenuItem disabled={!!bloqueado} onSelect={onAlternar}>
          {activo ? <PowerOff className="size-4 shrink-0" /> : <Power className="size-4 shrink-0" />} {activo ? 'Deactivate' : 'Activate'}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" disabled={!!bloqueado} onSelect={onBorrar}>
          <Trash2 className="size-4 shrink-0" /> Delete
        </DropdownMenuItem>
        {bloqueado && <p className="max-w-[220px] px-1.5 pt-1 pb-1.5 text-[11px] leading-snug text-ink-muted">{bloqueado}</p>}
        </>}
      </RowActionsMenu>
    </li>
  )
}

/* El título del editor con el estado al lado: Edit coverage table / Edit template + Active o Inactive (o `estado`). */
export function EncabezadoEditor({ titulo, activo, estado, extra }: { titulo: string; activo?: boolean; estado?: EstadoLista; extra?: ReactNode }) {
  const pill = activo !== undefined || estado ? pillEstado(activo ?? false, estado) : undefined
  return (
    <div className="flex flex-wrap items-center gap-2">
      <h2 className="text-[15px] font-bold text-ink">{titulo}</h2>
      {pill && <Pill tone={pill.tono} size="sm">{pill.nombre}</Pill>}
      {extra}
    </div>
  )
}

/* El pie del editor, fijo abajo mientras se baja: a la izquierda lo que no cierra (Preview), a la derecha Cancel y Save. */
export function PieEditor({ izquierda, onCancelar, onGuardar, guardarDeshabilitado, etiquetaGuardar = 'Save', secundario }: {
  izquierda?: ReactNode
  onCancelar: () => void
  onGuardar: () => void
  guardarDeshabilitado?: boolean
  /** Otra acción principal: Publish en el Draft de un fee schedule. */
  etiquetaGuardar?: string
  /** Entre Cancel y la principal: Save draft. */
  secundario?: ReactNode
}) {
  return (
    <div className="sticky bottom-0 z-10 -mx-4 -mb-4 flex flex-wrap items-center justify-end gap-3 rounded-b-lg border-t border-line bg-surface px-4 py-3 sm:-mx-5 sm:-mb-5 sm:px-5">
      {izquierda && <div className="mr-auto">{izquierda}</div>}
      <div className="flex gap-3">
        <Button variant="secondary" className="px-6" onClick={onCancelar}>Cancel</Button>
        {secundario}
        <Button className="px-6" disabled={guardarDeshabilitado} onClick={onGuardar}>{etiquetaGuardar}</Button>
      </div>
    </div>
  )
}
