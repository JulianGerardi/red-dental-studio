import { PageTitle } from '@/components/ui/page-title'

/* Encabezado común de las pantallas de Settings. Antes cada una lo armaba
   por su cuenta y el botón principal caía en la fila del buscador, corrido
   del título; acá va alineado con el título y el buscador queda en su
   propia fila. Sin bajada debajo del título, en ninguna pantalla (settings-accounts.md, 2026-11-19). */
export function SettingsPageHeader({
  titulo, etiquetas, accion, children,
}: {
  titulo: string
  /** Pills al lado del título (estado, Default) en el detalle de un ítem. */
  etiquetas?: React.ReactNode
  /** Acción principal, alineada con el título. */
  accion?: React.ReactNode
  /** Buscador y filtros, en la fila de abajo. */
  children?: React.ReactNode
}) {
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          {etiquetas ? (
            <div className="flex flex-wrap items-center gap-2">
              <PageTitle>{titulo}</PageTitle>
              {etiquetas}
            </div>
          ) : <PageTitle>{titulo}</PageTitle>}
        </div>
        {accion}
      </div>
      {children && <div className="mt-5 flex flex-wrap items-center gap-3">{children}</div>}
    </>
  )
}
