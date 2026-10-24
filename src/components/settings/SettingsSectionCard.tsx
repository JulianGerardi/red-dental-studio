import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'

/* Card de la portada de Settings: cada sección de la configuración es una
   card con ícono, título y bajada que lleva a su pantalla. La card entera es
   el link. Ver Elements / Cards en Storybook. */
export function SettingsSectionCard({
  to, icon: Icon, title, description, detail,
}: {
  to: string
  icon: LucideIcon
  title: string
  description: string
  /** Un dato al pie ("6 fee schedules · 1 default"), para las portadas de una sección. */
  detail?: string
}) {
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
