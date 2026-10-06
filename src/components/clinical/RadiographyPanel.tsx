import { useMemo, useState } from 'react'
import { Plus, Search, Maximize2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EmptyState } from '@/components/ui/empty-state'
import { RADIOGRAFIAS, type Radiografia } from '@/data/clinical-mode'
import { RadiographyViewer, Placa } from '@/components/clinical/RadiographyViewer'
import { RadiographyUpload } from '@/components/clinical/RadiographyUpload'
import { Button } from '@/components/ui/button'
import { ExamLayout } from '@/components/clinical/ExamLayout'

/* Figma 4106:197453 "Radiography - Initial": grilla de cinco columnas de
   placas, cada una con su fecha sobre la imagen y el profesional abajo.

   Las placas son **dibujadas**, no fotos: un degradado que imita una panorámica
   en negativo. No corresponde meter radiografías reales de nadie en una
   réplica, y una foto de stock haría creer que es un estudio del paciente. */

export function Card({ r, onAbrir }: { r: Radiografia; onAbrir: () => void }) {
  return (
    <div className="group rounded-lg bg-white shadow-panel p-2">
      <button
        onClick={onAbrir}
        aria-label={`Open ${r.tipo} from ${r.fecha}`}
        className="focus-visible:outline-dash-blue relative block aspect-[16/10] w-full overflow-hidden rounded-lg outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <Placa id={r.id} chica />
        <span className="absolute right-2 bottom-2 rounded bg-black/55 px-1.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
          {r.fecha}
        </span>
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/25 group-hover:opacity-100">
          <Maximize2 className="size-5 text-white" />
        </span>
      </button>
      <div className="mt-2 flex items-center gap-2 px-1 pb-1">
        <span className="bg-dash-count-bg text-dash-blue-hover flex size-6 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold">
          DT
        </span>
        <span className="min-w-0 flex-1 truncate text-[12px] text-ink-medium">{r.profesional}</span>
        <span className="shrink-0 text-[11px] text-ink-faint">{r.tipo}</span>
      </div>
    </div>
  )
}

export function RadiographyPanel() {
  const [q, setQ] = useState('')
  /* Tres pantallas, no tres modales: la grilla, el visor de una placa y la
     carga de archivos. El frame las dibuja como pantallas completas. */
  const [vista, setVista] = useState<'grilla' | 'visor' | 'subir'>('grilla')
  const [abierta, setAbierta] = useState<Radiografia | null>(null)

  const filas = useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t) return RADIOGRAFIAS
    return RADIOGRAFIAS.filter((r) => `${r.tipo} ${r.fecha} ${r.profesional}`.toLowerCase().includes(t))
  }, [q])

  if (vista === 'visor' && abierta) {
    return (
      <ExamLayout findings={false}>
        <RadiographyViewer
          estudios={RADIOGRAFIAS}
          actual={abierta}
          onCambiar={setAbierta}
          onVolver={() => setVista('grilla')}
          onSubir={() => setVista('subir')}
        />
      </ExamLayout>
    )
  }

  if (vista === 'subir') {
    return <ExamLayout findings={false}><RadiographyUpload onCancel={() => setVista('grilla')} onSave={() => setVista('grilla')} /></ExamLayout>
  }

  /* El buscador y Add image van en la fila de las acciones del examen (ExamLayout); sin los flotantes de abajo. */
  const buscador = (
    <>
      <div className="relative w-full sm:w-[260px]">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search..."
          aria-label="Search images"
          className="focus:border-dash-blue h-9 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none"
        />
      </div>
      <Button variant="secondary" size="lg" onClick={() => setVista('subir')}><Plus /> Add image</Button>
    </>
  )

  return (
    <ExamLayout findings={false} extra={buscador}>
      {filas.length === 0 ? (
        <div className="rounded-lg bg-white shadow-panel">
          <EmptyState
            icon={Search}
            title="No images found"
            detail={`Nothing matches "${q}". Try another study type or date.`}
            className="py-14"
          />
        </div>
      ) : (
        <div className={cn('grid gap-4', 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5')}>
          {filas.map((r) => (
            <Card key={r.id} r={r} onAbrir={() => { setAbierta(r); setVista('visor') }} />
          ))}
        </div>
      )}
    </ExamLayout>
  )
}
