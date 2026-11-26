import { Link } from 'react-router-dom'
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
  if (atajos?.length) {
    /* Links adentro de un link no valen: el título estira su área a toda la card y los atajos quedan por encima. */
    return (
      <Card className="hover:ring-primary/40 relative h-full p-6 transition-shadow hover:ring-1 has-[h2_a:focus-visible]:outline-2 has-[h2_a:focus-visible]:outline-offset-2 has-[h2_a:focus-visible]:outline-dash-blue">
        <span className="bg-accent text-primary flex size-11 items-center justify-center rounded-lg">
          <Icon className="size-5" />
        </span>
        <h2 className="mt-4 text-[15px] font-bold text-ink">
          <Link to={to} className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-0">{title}</Link>
        </h2>
        <p className="mt-1 text-[13px] text-ink-muted">{description}</p>
        <nav aria-label={`${title} sections`} className="relative z-10 mt-4 flex flex-wrap gap-2">
          {atajos.map((a) => (
            <Link
              key={a.to} to={a.to}
              className="rounded-md border border-line bg-white px-2.5 py-1 text-[12px] font-semibold text-dash-blue transition-colors hover:bg-info-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue"
            >
              {a.label}
            </Link>
          ))}
        </nav>
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
