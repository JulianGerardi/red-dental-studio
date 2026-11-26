import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Pill } from '@/components/ui/pill'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import type { Rol } from '@/data/roles'

/* Un rol en la lista de Settings → Roles: la card de la portada de Settings (ícono, título y bajada) con el estado, System
   role, cuántos permisos tiene y Updated, y su ⋮. Toda la card abre el rol; el ⋮ va por encima. Ver roles.md, 2026-11-26. */
export function RoleCard({ rol, to, acciones }: { rol: Rol; to: string; acciones: ReactNode }) {
  return (
    <Card className="hover:ring-primary/40 relative flex h-full flex-col p-6 transition-shadow hover:ring-1 has-[h2_a:focus-visible]:outline-2 has-[h2_a:focus-visible]:outline-offset-2 has-[h2_a:focus-visible]:outline-dash-blue">
      <div className="flex items-start justify-between gap-3">
        <span className="bg-accent text-primary flex size-11 items-center justify-center rounded-lg">
          <ShieldCheck className="size-5" />
        </span>
        <div className="relative z-10 -mr-2 -mt-1">
          <RowActionsMenu label={rol.nombre}>{acciones}</RowActionsMenu>
        </div>
      </div>
      <h2 className="mt-4 line-clamp-2 text-[15px] font-bold text-ink">
        {/* El área del título se estira a toda la card: links o botones adentro de un link no valen. */}
        <Link to={to} className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-0">{rol.nombre}</Link>
      </h2>
      <p className="mt-1 line-clamp-2 text-[13px] text-ink-muted">{rol.descripcion}</p>
      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-4">
        <span className="flex flex-wrap gap-1.5">
          <Pill tone={rol.activo ? 'success' : 'danger'} size="sm">{rol.activo ? 'Active' : 'Inactive'}</Pill>
          {rol.sistema && <Pill tone="neutral" size="sm">System role</Pill>}
        </span>
        <span className="ml-auto text-[12px] text-ink-muted tabular-nums">
          {rol.permisos.length} {rol.permisos.length === 1 ? 'permission' : 'permissions'} · Updated {rol.actualizado}
        </span>
      </div>
    </Card>
  )
}
