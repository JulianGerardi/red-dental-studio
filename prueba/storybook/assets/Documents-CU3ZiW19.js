import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, Search, Download, FileText } from 'lucide-react'
import { aviso } from '@/components/ui/toaster'
import { PageTitle } from '@/components/ui/page-title'
import { PatientSidePanel } from '@/components/patients/PatientSidePanel'
import { Pill, type PillTone } from '@/components/ui/pill'
import { DataTable, type DataTableColumn } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import { CONTENEDOR_PAGINA } from '@/lib/estilos'

/* Figma 3753:80195 "Patient Profile — Documents". */

type Doc = { id: string; name: string; firma: 'Signed' | 'Pending Signature'; fecha: string }

/* Los nombres se repiten -así viene en el Figma-: el id distingue cada fila. */
const DOCS: Doc[] = [
  ...Array.from({ length: 9 }, () => ({ name: 'Isacc Cihtepin.doc', firma: 'Signed' as const, fecha: 'Aug 5, 2026' })),
  { name: 'Isacc Cihtepin.doc', firma: 'Pending Signature' as const, fecha: 'Jul 28, 2026' },
  { name: 'Isacc Cihtepin.doc', firma: 'Pending Signature' as const, fecha: 'Jul 28, 2026' },
  { name: 'Isacc Cihtepin.doc', firma: 'Signed' as const, fecha: 'Aug 1, 2026' },
].map((d, i) => ({ ...d, id: \`doc-\${i + 1}\` }))

const FIRMA_TONO: Record<Doc['firma'], PillTone> = {
  Signed: 'success',
  'Pending Signature': 'warning',
}

/* La tabla estándar (ui/data-table) con las columnas de documentos. */
const COLUMNAS: DataTableColumn<Doc>[] = [
  {
    key: 'name', header: 'Name', cell: (d) => (
      <span className="flex min-w-0 items-center gap-3">
        <span className="bg-dash-blue flex size-7 shrink-0 items-center justify-center rounded text-white"><FileText className="size-4" /></span>
        <span className="truncate text-ink-medium">{d.name}</span>
      </span>
    ),
  },
  { key: 'firma', header: 'Signature', width: 200, cell: (d) => <Pill tone={FIRMA_TONO[d.firma]}>{d.firma}</Pill> },
  { key: 'fecha', header: 'Last Update', width: 140, align: 'right', cell: (d) => <span className="text-ink-medium">{d.fecha}</span> },
]

export default function Documents() {
  const { id = 'john-smith' } = useParams()
  const [q, setQ] = useState('')
  const [sel, setSel] = useState<string[]>([])

  const filas = useMemo(
    () => DOCS.filter((d) => d.name.toLowerCase().includes(q.toLowerCase())),
    [q],
  )

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
          basePath={\`/patients/\${id}\`}
        />

        <div className="min-w-0 flex-1">
          <PageTitle>Documents Manager</PageTitle>

          <div className="mt-4 flex items-center gap-3">
            <div className="relative w-[265px]">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search documents"
                className="focus:border-dash-blue h-8 w-full rounded-md border border-line bg-white pr-3 pl-9 text-[13px] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] placeholder:text-ink-faint focus:outline-none"
              />
            </div>
            <Button
              variant="secondary"
              size="md"
              iconOnly
              aria-label="Download selected"
              className="ml-auto"
              onClick={() =>
                sel.length
                  ? aviso.ok(\`\${sel.length} document\${sel.length > 1 ? 's' : ''} downloaded.\`)
                  : aviso.warn('Select at least one document to download.')
              }
            >
              <Download />
            </Button>
          </div>

          <div className="mt-3">
            <DataTable
              columns={COLUMNAS}
              rows={filas}
              rowKey={(d) => d.id}
              rowLabel={(d) => d.name}
              selectable
              selected={sel}
              onSelectedChange={setSel}
              pageSize={8}
              itemLabel="documents"
              empty={{ icon: FileText, title: 'No documents found', detail: 'Try a different file name.' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
`})))()}export{n,i as r,r as t};