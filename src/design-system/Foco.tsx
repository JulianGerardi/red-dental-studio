import type { ReactNode } from 'react'
import { ArrowLeft, GalleryVerticalEnd } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useIndice } from './Mapa'
import { Enlace } from './navegar'

/* Una historia sola, a pantalla completa (un Playground abierto con "Full
   screen", una pantalla de Pages, un ejemplo encontrado con el buscador):
   una barra fina para volver a su página y la historia debajo. Reemplaza al
   Storybook, que en esta vista tiene el menú y las barras ocultas. */

export function Foco({ id, titulo, nombre, layout, children }: { id: string; titulo: string; nombre: string; layout?: string; children: ReactNode }) {
  const entradas = useIndice()
  const base = id.split('--')[0]
  const docs = entradas?.find((e) => e.id === `${base}--docs`)
  const seccion = titulo.split('/')[0]!.toLowerCase()
  const volverA = docs?.id ?? `${seccion}-overview--docs`
  const pagina = docs ? titulo.split('/').pop() : titulo.split('/')[0]

  return (
    <div className="ds-foco sb-unstyled flex min-h-screen flex-col bg-white text-ink">
      <header className="flex h-12 shrink-0 items-center gap-3 border-b border-line bg-white px-4">
        <Enlace id={volverA} className="inline-flex h-8 items-center gap-1.5 rounded-md px-2 text-[14px] font-medium text-ink no-underline hover:bg-surface-muted">
          <ArrowLeft className="size-4" /> {pagina}
        </Enlace>
        <span className="text-ink-faint">/</span>
        <span className="truncate text-[14px] text-ink-muted">{nombre}</span>
        <Enlace id="welcome--docs" className="ml-auto flex items-center gap-2 text-[14px] font-semibold text-ink no-underline">
          <span className="flex size-6 items-center justify-center rounded-md bg-dash-blue text-white"><GalleryVerticalEnd className="size-3.5" /></span>
          <span className="hidden sm:inline">Enamel</span>
        </Enlace>
      </header>
      <div className={cn('flex-1', layout === 'centered' && 'flex items-center justify-center p-6', layout === 'padded' && 'p-6', !layout && 'flex items-center justify-center p-6')}>
        {children}
      </div>
    </div>
  )
}
