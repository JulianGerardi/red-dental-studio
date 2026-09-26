import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'

/* Card de la portada de Settings: cada sección de la configuración es una
   card con ícono, título y bajada que lleva a su pantalla. La card entera es
   el link. Ver Elements / Cards en Storybook. */
export function SettingsSectionCard({
  to, icon: Icon, title, description,
}: {
  to: string
  icon: LucideIcon
  title: string
  description: string
}) {
  return (
    <Link to={to} className="focus-visible:outline-dash-blue block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2">
      <Card className="hover:border-primary/40 h-full p-6 transition-colors">
        <span className="bg-accent text-primary flex size-11 items-center justify-center rounded-lg">
          <Icon className="size-5" />
        </span>
        <h2 className="mt-4 text-lg font-bold">{title}</h2>
        <p className="text-muted-foreground mt-1 text-sm">{description}</p>
      </Card>
    </Link>
  )
}
