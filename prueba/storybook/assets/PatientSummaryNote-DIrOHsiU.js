import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useMemo, useState } from 'react'
import { CircleAlert, CopyPlus, PenLine } from 'lucide-react'
import { aviso } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { DocumentHtml } from '@/components/ui/document-html'
import { DocumentViewer } from '@/components/ui/document-viewer'
import { EmptyState } from '@/components/ui/empty-state'
import { Pill } from '@/components/ui/pill'
import { abrirHoja } from '@/components/dashboard/documentoTarea'
import { FirmarDialog } from '@/pages/ClinicalNote'
import { PROVIDER_SESION, type EncuentroHistorial } from '@/data/historial'
import { agregarAdenda, encuentroCerrado, firmarNota, hojaNota } from '@/lib/historial'

/* Lo que abre el ojo de Patient Summary, como red.dev (/treatment-history/:clinicalNoteId, recorrido del 2026-11-28): la
   Clinical Note en el visor de documentos con Back to history y View PDF; abajo, Sign clinical note si no está firmada y
   Add addendum si ya lo está. Un encuentro cancelado no tiene nota: el mismo error de red.dev y Return. El documento es
   la plantilla Clinical note de src/pdfs. Ver clinical-mode.md (2026-11-27, Patient Summary). */

export function PatientSummaryNote({ encuentro: e, paciente, onBack }: { encuentro: EncuentroHistorial; paciente: string; onBack: () => void }) {
  /* "Preparing document..." cada vez que se abre: sin firmar, la nota se vuelve a generar (CON-2728). */
  const [listo, setListo] = useState(false)
  useEffect(() => { const t = setTimeout(() => setListo(true), 600); return () => clearTimeout(t) }, [])
  const [dialogo, setDialogo] = useState<'firma' | 'adenda' | null>(null)

  const cancelado = e.estado === 'Cancelled'
  const hoja = useMemo(() => hojaNota(e, paciente), [e, paciente])
  const firmada = e.nota === 'Signed'
  /* Firmada, Add addendum (CON-2730, CON-3008); sin firmar y con el encuentro cerrado, Sign clinical note (CON-2727). */
  const pie = cancelado
    ? undefined
    : firmada
      ? <Button className="ml-auto" onClick={() => setDialogo('adenda')}><CopyPlus /> Add addendum</Button>
      : encuentroCerrado(e) && <Button className="ml-auto" onClick={() => setDialogo('firma')}><PenLine /> Sign clinical note</Button>

  const firmar = (texto: string) => {
    if (dialogo === 'firma') { firmarNota(e.id); aviso.ok('Clinical note signed.') }
    if (dialogo === 'adenda') { agregarAdenda(e.id, { author: PROVIDER_SESION, text: texto }); aviso.ok('Addendum added.') }
    setDialogo(null)
  }

  return (
    <>
      <DocumentViewer
        title={cancelado ? 'Clinical note' : \`Clinical note - \${paciente}\`}
        status={cancelado ? undefined : <Pill tone={firmada ? 'success' : 'warning'} size="sm">{e.nota}</Pill>}
        backLabel="Back to history"
        onBack={onBack}
        loading={!listo}
        pdfDisabled={cancelado}
        onPdf={() => abrirHoja(hoja, () => aviso.error("We couldn't open the PDF. Allow pop-ups for this site and try again."))}
        footer={pie || undefined}
      >
        {cancelado ? (
          <EmptyState
            icon={CircleAlert}
            title="Clinical note can only be rendered for an active or finished encounter"
            accion={{ label: 'Return', onClick: onBack }}
            className="rounded-lg bg-surface"
          />
        ) : (
          <DocumentHtml html={hoja} title={\`Dental clinical note of \${paciente}, \${e.fecha}\`} />
        )}
      </DocumentViewer>

      {dialogo && <FirmarDialog addendum={dialogo === 'adenda'} onCancel={() => setDialogo(null)} onFirmar={firmar} />}
    </>
  )
}
`})))()}export{n,i as r,r as t};