/* Encabezado común de las pantallas de Settings. Antes cada una lo armaba
   por su cuenta y el botón principal caía en la fila del buscador, corrido
   del título; acá va alineado con el título y el buscador queda en su
   propia fila. Ver design-reference/figma/modulos/settings-accounts.md. */
export function SettingsPageHeader({
  titulo, bajada, accion, children,
}: {
  titulo: string
  bajada: string
  /** Acción principal, alineada con el título. */
  accion?: React.ReactNode
  /** Buscador y filtros, en la fila de abajo. */
  children?: React.ReactNode
}) {
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-[#09090b]">{titulo}</h1>
          <p className="mt-1 text-sm text-[#71717a]">{bajada}</p>
        </div>
        {accion}
      </div>
      {children && <div className="mt-5 flex flex-wrap items-center gap-3">{children}</div>}
    </>
  )
}
