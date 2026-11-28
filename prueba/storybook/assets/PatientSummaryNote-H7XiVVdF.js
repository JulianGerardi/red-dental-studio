import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useMemo, useState } from 'react'
import { PenLine, Plus } from 'lucide-react'
import { aviso } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { DocumentHtml } from '@/components/ui/document-html'
import { DocumentViewer } from '@/components/ui/document-viewer'
import { Drawer, DrawerActions } from '@/components/ui/drawer'
import { Pill } from '@/components/ui/pill'
import { TextArea } from '@/components/patients/form'
import { abrirHoja } from '@/components/dashboard/documentoTarea'
import { FirmarDialog } from '@/pages/ClinicalNote'
import { PROVIDER_SESION, type EncuentroHistorial } from '@/data/historial'
import { agregarAdenda, encuentroCerrado, firmarNota, hojaNota } from '@/lib/historial'

/* Lo que abre el ojo de Patient Summary (red.dev: /treatment-history/:clinicalNoteId): la Clinical Note del encuentro en
   el visor de documentos, con Back to history, View PDF y Sign clinical note o Add addendum. El documento es la
   plantilla Clinical note de src/pdfs, la misma en la pantalla y en el PDF. Qué se puede hacer depende del encuentro y
   de la nota (CON-2727, CON-2728, CON-2730, CON-3508); ver clinical-mode.md (2026-11-27, Patient Summary). */

/** Sólo cuando no se puede firmar, el aviso dice por qué. */
function avisoDe(e: EncuentroHistorial) {
  if (e.nota === 'Signed') return undefined
  if (!encuentroCerrado(e)) return 'The clinical note can only be signed when the encounter is completed.'
  if (e.provider !== PROVIDER_SESION) return \`Only \${e.provider}, the provider of this encounter, can sign this clinical note.\`
  return undefined
}

export function PatientSummaryNote({ encuentro: e, paciente, onBack }: { encuentro: EncuentroHistorial; paciente: string; onBack: () => void }) {
  /* Como red.dev: "Preparing document..." cada vez que se abre. Sin firmar, la nota se vuelve a generar con lo que el
     encuentro tiene en ese momento (CON-2728). */
  const [listo, setListo] = useState(false)
  useEffect(() => { const t = setTimeout(() => setListo(true), 600); return () => clearTimeout(t) }, [])
  const [firmando, setFirmando] = useState<'nota' | 'adenda' | null>(null)
  /* El texto del addendum; null con el drawer cerrado. */
  const [adenda, setAdenda] = useState<string | null>(null)

  const hoja = useMemo(() => hojaNota(e, paciente), [e, paciente])
  const firmada = e.nota === 'Signed'
  const propia = e.provider === PROVIDER_SESION
  /* Firmada, Add addendum (CON-2730, CON-3008); sin firmar, la firma quien atendió con el encuentro cerrado. */
  const pie = firmada
    ? <Button variant="secondary" className="ml-auto" onClick={() => setAdenda('')}><Plus /> Add addendum</Button>
    : propia && encuentroCerrado(e) && <Button className="ml-auto" onClick={() => setFirmando('nota')}><PenLine /> Sign clinical note</Button>

  const firmar = () => {
    if (firmando === 'nota') { firmarNota(e.id); aviso.ok('Clinical note signed.') }
    if (firmando === 'adenda' && adenda) { agregarAdenda(e.id, { author: PROVIDER_SESION, text: adenda.trim() }); setAdenda(null); aviso.ok('Addendum added.') }
    setFirmando(null)
  }

  return (
    <>
      <DocumentViewer
        title={\`Clinical note - \${paciente}\`}
        status={<Pill tone={firmada ? 'success' : 'warning'} size="sm">{e.nota}</Pill>}
        backLabel="Back to history"
        onBack={onBack}
        loading={!listo}
        onPdf={() => abrirHoja(hoja, () => aviso.error("We couldn't open the PDF. Allow pop-ups for this site and try again."))}
        notice={avisoDe(e)}
        noticeTone="neutral"
        footer={pie || undefined}
      >
        <DocumentHtml html={hoja} title={\`Dental clinical note of \${paciente}, \${e.fecha}\`} />
      </DocumentViewer>

      <Drawer
        open={adenda !== null}
        onClose={() => setAdenda(null)}
        title="Add addendum"
        description="Add a note after the signed clinical note. It does not change the signed note."
        footer={<DrawerActions onCancel={() => setAdenda(null)} onSave={() => setFirmando('adenda')} saveDisabled={!adenda?.trim()} saveLabel="Sign and save" />}
      >
        <TextArea
          label="Addendum" required rows={8} placeholder="What needs to be added to the signed note"
          value={adenda ?? ''} onChange={setAdenda}
          hint="It is added after the signed note with your name and the date. Once saved, it can't be edited or deleted."
        />
      </Drawer>

      {firmando && <FirmarDialog onCancel={() => setFirmando(null)} onFirmar={firmar} />}
    </>
  )
}
`})))()}export{n,i as r,r as t};