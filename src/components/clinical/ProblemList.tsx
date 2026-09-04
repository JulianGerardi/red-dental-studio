import { useMemo, useState } from 'react'
import { Search, Info, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { EmptyState } from '@/components/ui/empty-state'
import { ICONO_SUELTO } from '@/lib/estilos'
import { PROBLEMAS, ESTADO_PILL, type Problema } from '@/data/clinical-mode'

const POR_PAGINA = 3

/* En el frame los encabezados se parten en dos líneas —"Dat e", "Toot h",
   "Surf ace"— porque las columnas quedaron más angostas que las palabras. Es
   un error de layout, no contenido: acá no se parten. */
const COLUMNAS = ['Date', 'Surface', 'Condition', 'Exam', 'Provider', 'Note', 'Status', 'Actions']

export function ProblemList() {
  const [q, setQ] = useState('')
  const [pagina, setPagina] = useState(1)
  const [nota, setNota] = useState<Problema | null>(null)

  const filtrados = useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t) return PROBLEMAS
    return PROBLEMAS.filter((p) =>
      `${p.fecha} ${p.pieza} ${p.superficie} ${p.condicion} ${p.examen} ${p.proveedor}`.toLowerCase().includes(t),
    )
  }, [q])

  const paginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA))
  const actual = Math.min(pagina, paginas)
  const visibles = filtrados.slice((actual - 1) * POR_PAGINA, actual * POR_PAGINA)

  return (
    <div className="rounded-xl border border-[#e4e4e7] bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[15px] font-bold text-[#09090b]">Problem list</p>
        <div className="relative w-full sm:w-[220px]">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#a1a1aa]" />
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setPagina(1) }}
            placeholder="Search..."
            className="focus:border-dash-blue h-9 w-full rounded-md border border-[#e4e4e7] bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-[#a1a1aa] focus:outline-none"
          />
        </div>
      </div>

      {filtrados.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No problems found"
          detail={`Nothing matches "${q}". Try another tooth, condition or provider.`}
          className="py-8"
        />
      ) : (
        <>
          <div className="mt-3 -mx-4 overflow-x-auto px-4">
            <table className="w-full min-w-[720px] border-collapse">
              <thead>
                <tr className="border-y border-[#f1f1f4]">
                  {COLUMNAS.map((c) => (
                    <th
                      key={c}
                      className="h-10 px-3 text-left text-[11px] font-semibold whitespace-nowrap text-[#71717a]"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibles.map((p) => (
                  <tr key={p.id} className="border-b border-[#f1f1f4] last:border-0">
                    <td className="h-12 px-3 text-[13px] whitespace-nowrap text-[#09090b]">{p.fecha}</td>
                    <td className="px-3 text-[13px] text-[#09090b]">{p.superficie}</td>
                    <td className="px-3 text-[13px] whitespace-nowrap text-[#09090b]">{p.condicion}</td>
                    <td className="px-3 text-[13px] whitespace-nowrap text-[#52525b]">{p.examen}</td>
                    <td className="px-3 text-[13px] whitespace-nowrap text-[#52525b]">{p.proveedor}</td>
                    <td className="px-3">
                      <button
                        onClick={() => setNota(nota?.id === p.id ? null : p)}
                        aria-label={`Note for tooth ${p.pieza}`}
                        className={cn(
                          'flex size-7 items-center justify-center rounded-full bg-[#f3effe] text-[#6633a6] transition-colors hover:bg-[#e7ddfd]',
                          nota?.id === p.id && 'ring-2 ring-[#6633a6] ring-offset-1',
                        )}
                      >
                        <Info className="size-3.5" />
                      </button>
                    </td>
                    <td className="px-3">
                      <span className={cn('rounded-full border px-2 py-[2px] text-[11px] font-semibold', ESTADO_PILL[p.estado])}>
                        {p.estado}
                      </span>
                    </td>
                    <td className="px-3">
                      <button
                        onClick={() => aviso.info('Editing a problem is not available in this release.')}
                        aria-label={`Actions for tooth ${p.pieza}`}
                        className={ICONO_SUELTO}
                      >
                        <MoreVertical className="size-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* La nota se lee acá abajo y no en un toast: es texto clínico, no
              un aviso de que algo pasó. */}
          {nota && (
            <div className="mt-3 flex items-start gap-2 rounded-md border-l-[3px] border-l-[#6633a6] bg-[#faf8ff] px-3 py-2">
              <Info className="mt-px size-3.5 shrink-0 text-[#6633a6]" />
              <span className="text-[12px] text-[#52525b]">
                <span className="font-semibold text-[#09090b]">Tooth {nota.pieza} · {nota.condicion} — </span>
                {nota.nota}
              </span>
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center justify-center gap-1">
            <button
              onClick={() => setPagina((n) => Math.max(1, n - 1))}
              disabled={actual === 1}
              className="flex h-8 items-center gap-1 rounded-md px-2 text-[13px] font-medium disabled:opacity-40"
            >
              <ChevronLeft className="size-4" /> Previous
            </button>
            {Array.from({ length: paginas }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPagina(n)}
                aria-current={n === actual ? 'page' : undefined}
                className={cn(
                  'flex size-8 items-center justify-center rounded-md text-[13px] tabular-nums',
                  n === actual ? 'border border-[#e4e4e7] font-semibold' : 'text-[#52525b] hover:bg-[#f4f4f5]',
                )}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPagina((n) => Math.min(paginas, n + 1))}
              disabled={actual === paginas}
              className="flex h-8 items-center gap-1 rounded-md px-2 text-[13px] font-medium disabled:opacity-40"
            >
              Next <ChevronRight className="size-4" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}
