import { Link, useNavigate } from 'react-router-dom'
import { RowActionsMenu } from '@/components/ui/row-actions-menu'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import type { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'

/* Card de la portada de Settings: cada sección de la configuración es una
   card con ícono, título y bajada que lleva a su pantalla. La card entera es
   el link. Ver Elements / Cards en Storybook. */
export function SettingsSectionCard({
  to, icon: Icon, title, description, detail, atajos,
}: {
  to: string
  icon: LucideIcon
  title: string
  description: string
  /** Un dato al pie ("6 fee schedules · 1 default"), para las portadas de una sección. */
  detail?: string
  /** Links directos a las pantallas de la sección (Billing: Fee schedules, Carriers, Coverage tables). La card sigue
      llevando a la sección; los atajos van encima (settings-billing.md, 2026-11-26). */
  atajos?: { to: string; label: string }[]
}) {
  const navigate = useNavigate()
  if (atajos?.length) {
    /* Los atajos van en un ⋮, así la card queda igual a las demás (Julián, 2026-11-26). Un botón adentro de un link no
       vale: el título estira su área a toda la card y el ⋮ va por encima. */
    return (
      <Card className="hover:ring-primary/40 relative h-full p-6 transition-shadow hover:ring-1 has-[h2_a:focus-visible]:outline-2 has-[h2_a:focus-visible]:outline-offset-2 has-[h2_a:focus-visible]:outline-dash-blue">
        <div className="flex items-start justify-between gap-3">
          <span className="bg-accent text-primary flex size-11 items-center justify-center rounded-lg">
            <Icon className="size-5" />
          </span>
          <div className="relative z-10 -mr-2 -mt-1">
            <RowActionsMenu label={`${title} sections`}>
              {atajos.map((a) => (
                <DropdownMenuItem key={a.to} onSelect={() => navigate(a.to)}>{a.label}</DropdownMenuItem>
              ))}
            </RowActionsMenu>
          </div>
        </div>
        <h2 className="mt-4 text-[15px] font-bold text-ink">
          <Link to={to} className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-0">{title}</Link>
        </h2>
        <p className="mt-1 text-[13px] text-ink-muted">{description}</p>
        {detail && <p className="mt-3 text-[12px] font-semibold text-dash-blue">{detail}</p>}
      </Card>
    )
  }
  return (
    <Link to={to} className="focus-visible:outline-dash-blue block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2">
      <Card className="hover:ring-primary/40 h-full p-6 transition-shadow hover:ring-1">
        <span className="bg-accent text-primary flex size-11 items-center justify-center rounded-lg">
          <Icon className="size-5" />
        </span>
        <h2 className="mt-4 text-[15px] font-bold text-ink">{title}</h2>
        <p className="mt-1 text-[13px] text-ink-muted">{description}</p>
        {detail && <p className="mt-3 text-[12px] font-semibold text-dash-blue">{detail}</p>}
      </Card>
    </Link>
  )
}
