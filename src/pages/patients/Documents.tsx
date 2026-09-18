import { useMemo, useState } from 'react'
import { Pagination } from '@/components/patients/ledger/Pagination'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, Search, Download, FileText } from 'lucide-react'
import { aviso } from '@/components/ui/toaster'
import { PageTitle } from '@/components/ui/page-title'
import { PatientSidePanel } from '@/components/patients/PatientSidePanel'
import { Pill, type PillTone } from '@/components/ui/pill'
import { CONTENEDOR_PAGINA } from '@/lib/estilos'

/* Figma 3753:80195 "Patient Profile — Documents". */

type Doc = { name: string; firma: 'Signed' | 'Pending Signature'; fecha: string }

const DOCS: Doc[] = [
  ...Array.from({ length: 9 }, () => ({ name: 'Isacc Cihtepin.doc', firma: 'Signed' as const, fecha: 'Aug 5, 2026' })),
  { name: 'Isacc Cihtepin.doc', firma: 'Pending Signature', fecha: 'Jul 28, 2026' },
  { name: 'Isacc Cihtepin.doc', firma: 'Pending Signature', fecha: 'Jul 28, 2026' },
  { name: 'Isacc Cihtepin.doc', firma: 'Signed', fecha: 'Aug 1, 2026' },
]

const FIRMA_TONO: Record<Doc['firma'], PillTone> = {
  Signed: 'success',
  'Pending Signature': 'warning',
}

export default function Documents() {
  const { id = 'john-smith' } = useParams()
  const [q, setQ] = useState('')
  const [sel, setSel] = useState<number[]>([])

  const [pagina, setPagina] = useState(1)
  const filas = useMemo(
    () => DOCS.filter((d) => d.name.toLowerCase().includes(q.toLowerCase())),
    [q],
  )
  const TAM_PAGINA = 8
  const paginas = Math.max(1, Math.ceil(filas.length / TAM_PAGINA))
  const paginaActual = Math.min(pagina, paginas)
  const filasPagina = filas.slice((paginaActual - 1) * TAM_PAGINA, paginaActual * TAM_PAGINA)
  const todas = sel.length === filas.length && filas.length > 0

  return (
    <div className={CONTENEDOR_PAGINA}>

      {/* Único rastro de navegación que queda arriba: la vuelta a la tabla.
          El breadcrumb completo repetía lo que ya dice el panel lateral. */}
      <Link
        to="/patients"
        className="text-dash-blue mb-3 inline-flex items-center gap-1 text-sm hover:underline"
      >
        <ChevronLeft className="size-4" /> Patients
      </Link>
      <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-start">
        <PatientSidePanel
          name="John Smith"
          initials="JS"
          section="Documents"
          basePath={`/patients/${id}`}
        />

        <div className="min-w-0 flex-1">
          <PageTitle>Documents Manager</PageTitle>

          <div className="mt-4 flex items-center gap-3">
            <div className="relative w-[265px]">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#a1a1aa]" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search documents"
                className="focus:border-dash-blue h-8 w-full rounded-md border border-[#e4e4e7] bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-[#a1a1aa] focus:outline-none"
              />
            </div>
            <button
              onClick={() =>
                sel.length
                  ? aviso.ok(`${sel.length} document${sel.length > 1 ? 's' : ''} downloaded.`)
                  : aviso.warn('Select at least one document to download.')
              }
              aria-label="Download selected"
              className="ml-auto flex size-8 items-center justify-center rounded-md border border-[#e4e4e7] bg-white shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] hover:bg-[#fafafa]"
            >
              <Download className="size-4" />
            </button>
          </div>

          <div className="mt-3 w-full overflow-x-auto rounded-lg border border-[#e7e7e7] bg-white">
            <div className="min-w-[620px]">
            <div className="flex items-center bg-[#f9f9f9] px-3 py-3 text-[11px] font-semibold text-[#71717a]">
              <span className="w-10">
                <input
                  type="checkbox"
                  aria-label="Select all"
                  checked={todas}
                  onChange={() => setSel(todas ? [] : filas.map((_, i) => i))}
                />
              </span>
              <span className="flex-1">Name</span>
              <span className="w-[200px]">Signature</span>
              <span className="w-[140px] text-right">Last Update</span>
            </div>

            {filasPagina.map((d, i) => (
              <div key={i} className="flex items-center border-t border-[#e7e7e7] px-3 py-3 text-[13px] text-[#3f3f46]">
                <span className="w-10">
                  <input
                    type="checkbox"
                    aria-label={`Select ${d.name}`}
                    checked={sel.includes(i)}
                    onChange={() =>
                      setSel((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]))
                    }
                  />
                </span>
                <span className="flex flex-1 items-center gap-3">
                  <span className="bg-dash-blue flex size-7 shrink-0 items-center justify-center rounded text-white">
                    <FileText className="size-4" />
                  </span>
                  <span className="truncate text-[#52525b]">{d.name}</span>
                </span>
                <span className="w-[200px]">
                  <Pill tone={FIRMA_TONO[d.firma]}>{d.firma}</Pill>
                </span>
                <span className="w-[140px] text-right text-[#52525b]">{d.fecha}</span>
              </div>
            ))}

            {/* El Figma dice "Showing 3 of 15 referrals" en una tabla de
                documentos -reusa el componente de referrals-. El contador
                ahora cuenta documentos de verdad y el paginado funciona: los
                botones dibujados no tenían onClick. */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e7e7e7] px-3 py-3">
              <span className="text-xs font-semibold text-[#71717a]">
                Showing {filasPagina.length} of {filas.length} documents
              </span>
              <Pagination pagina={paginaActual} paginas={paginas} onChange={setPagina} />
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
