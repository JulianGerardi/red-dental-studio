import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Download, FileText } from 'lucide-react'
import { aviso } from '@/components/ui/toaster'
import { SettingsPageHeader } from '@/components/settings/SettingsPageHeader'
import { SettingsSearch } from '@/components/settings/SettingsSearch'
import { PatientSidePanel } from '@/components/patients/PatientSidePanel'
import { PatientBreadcrumb } from '@/components/patients/PatientBreadcrumb'
import { Pill, type PillTone } from '@/components/ui/pill'
import { DataTable, type DataTableColumn } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'
import { CONTENEDOR_PAGINA } from '@/lib/estilos'

/* Figma 3753:80195 "Patient Profile — Documents". */

type Doc = { id: string; name: string; firma: 'Signed' | 'Pending Signature'; fecha: string }

/* Nombres como los arma red.dev (Procedure Consent - código y procedimiento; Informed Consent / Refusal – caso), con los
   procedimientos y casos de John Smith. Antes repetía el "Isacc Cihtepin.doc" del Figma (treatments.md, 2026-11-12). */
const DOCS: Doc[] = ([
  ['Informed Consent for Dental Treatment – Endodontic Treatment', 'Pending Signature', '10/27/2026'],
  ['Procedure Consent - D2950 Core buildup, including any pins when required', 'Pending Signature', '10/27/2026'],
  ['Procedure Consent - D2954 Prefabricated post and core in addition to crown', 'Pending Signature', '10/27/2026'],
  ['Procedure Consent - D2750 Crown – porcelain fused to high noble metal', 'Signed', '10/22/2026'],
  ['Informed Refusal of Dental Treatment – Implant Option', 'Signed', '10/22/2026'],
  ['Informed Consent for Dental Treatment – Crown Option', 'Pending Signature', '10/21/2026'],
  ['Procedure Consent - D7140 Extraction – erupted tooth or exposed root (elevation and/or forceps removal)', 'Signed', '09/14/2026'],
  ['Procedure Consent - D2140 Amalgam – one surface, primary or permanent', 'Signed', '08/25/2026'],
  ['Procedure Consent - D0220 Intraoral – periapical first radiographic image', 'Signed', '08/25/2026'],
  ['Informed Consent for Dental Treatment – Periodontal maintenance', 'Signed', '08/05/2026'],
  ['Procedure Consent - D1110 Prophylaxis – adult', 'Signed', '08/05/2026'],
  ['Procedure Consent - D0120 Periodic oral evaluation – established patient', 'Signed', '08/05/2026'],
] as const).map(([name, firma, fecha], i) => ({ id: \`doc-\${i + 1}\`, name, firma, fecha }))

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
        <span className="truncate" title={d.name}>{d.name}</span>
      </span>
    ),
  },
  { key: 'firma', header: 'Signature', width: 200, cell: (d) => <Pill tone={FIRMA_TONO[d.firma]}>{d.firma}</Pill> },
  { key: 'fecha', header: 'Last Update', width: 140, cell: (d) => d.fecha },
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

      <PatientBreadcrumb name="John Smith" section="Documents" />
      <div className="flex flex-col gap-5 lg:flex-row">
        <PatientSidePanel
          name="John Smith"
          initials="JS"
          section="Documents"
          basePath={\`/patients/\${id}\`}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          {/* El encabezado de las tablas por defecto (Locations, Employees): título con la acción alineada y el buscador de
              36px con Search en su fila (documents en treatments.md, 2026-10-12). */}
          <SettingsPageHeader
            titulo="Documents Manager"
            accion={(
              <Button
                variant="secondary"
                size="md"
                iconOnly
                aria-label="Download selected"
                onClick={() =>
                  sel.length
                    ? aviso.ok(\`\${sel.length} document\${sel.length > 1 ? 's' : ''} downloaded.\`)
                    : aviso.warn('Select at least one document to download.')
                }
              >
                <Download />
              </Button>
            )}
          >
            <SettingsSearch value={q} onChange={setQ} placeholder="Search documents" />
          </SettingsPageHeader>

          <div className="mt-4 flex flex-col lg:flex-1">
            <DataTable
              llenar
              columns={COLUMNAS}
              rows={filas}
              rowKey={(d) => d.id}
              rowLabel={(d) => d.name}
              selectable
              selected={sel}
              onSelectedChange={setSel}
              pageSize={10}
              pageSizeOptions={[10, 20, 50]}
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