import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useState } from 'react'
import { PenLine, Plus } from 'lucide-react'
import { aviso } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { DocumentViewer } from '@/components/ui/document-viewer'
import { Drawer, DrawerActions } from '@/components/ui/drawer'
import { Pill } from '@/components/ui/pill'
import { TextArea } from '@/components/patients/form'
import { abrirDocumento } from '@/components/dashboard/documentoTarea'
import { FirmarDialog, VistaDocumento } from '@/pages/ClinicalNote'
import { PROVIDER_SESION, type EncuentroHistorial } from '@/data/historial'
import { AVISO_AUTOMATICA, agregarAdenda, documentoEncuentro, encuentroCerrado, firmarNota } from '@/lib/historial'

/* Lo que abre el ojo de Patient Summary (red.dev: /treatment-history/:clinicalNoteId): la Clinical Note del encuentro en
   el visor de documentos, con Back to history y View PDF. Qué se puede hacer depende del encuentro y de la nota
   (CON-2727, CON-2728, CON-2730, CON-3508); ver clinical-mode.md (2026-11-27, Patient Summary). */

/** El aviso del visor: qué falta o por qué no se puede firmar. Azul cuando pide algo; gris cuando sólo informa. */
function avisoDe(e: EncuentroHistorial): { tono: 'info' | 'neutral'; texto: string } {
  const propia = e.provider === PROVIDER_SESION
  if (e.nota === 'Signed') return { tono: 'neutral', texto: \`Signed by \${e.provider} on \${e.firmada}. A signed note can't be changed\${propia ? '; add an addendum to complement it' : ''}.\` }
  if (!encuentroCerrado(e)) return { tono: 'info', texto: 'The clinical note can only be signed when the encounter is completed. Until then it is generated again each time you open it.' }
  if (!propia) return { tono: 'neutral', texto: \`Only \${e.provider}, the provider of this encounter, can sign this clinical note.\` }
  if (e.automatica) return { tono: 'info', texto: \`\${AVISO_AUTOMATICA} Review it before signing.\` }
  if (e.estado === 'Completed') return { tono: 'info', texto: 'Signing this clinical note closes the encounter: it becomes Fulfilled and can no longer be changed.' }
  return { tono: 'info', texto: 'This clinical note is waiting for your signature.' }
}

export function PatientSummaryNote({ encuentro: e, paciente, onBack }: { encuentro: EncuentroHistorial; paciente: string; onBack: () => void }) {
  /* Como red.dev: "Preparing document..." cada vez que se abre. Sin firmar, la nota se vuelve a generar con lo que el
     encuentro tiene en ese momento (CON-2728). */
  const [listo, setListo] = useState(false)
  useEffect(() => { const t = setTimeout(() => setListo(true), 600); return () => clearTimeout(t) }, [])
  const [firmando, setFirmando] = useState<'nota' | 'adenda' | null>(null)
  /* El texto del addendum; null con el drawer cerrado. */
  const [adenda, setAdenda] = useState<string | null>(null)

  const doc = documentoEncuentro(e, paciente)
  const firmada = e.nota === 'Signed'
  const propia = e.provider === PROVIDER_SESION
  const nota = avisoDe(e)
  const pie = !propia
    ? undefined
    : firmada
      /* El addendum va sólo sobre una nota firmada de un encuentro Fulfilled (CON-2730). */
      ? e.estado === 'Fulfilled' && <Button variant="secondary" className="ml-auto" onClick={() => setAdenda('')}><Plus /> Add addendum</Button>
      : encuentroCerrado(e) && <Button className="ml-auto" onClick={() => setFirmando('nota')}><PenLine /> Sign clinical note</Button>

  const firmar = () => {
    if (firmando === 'nota') { firmarNota(e.id); aviso.ok('Clinical note signed.') }
    if (firmando === 'adenda' && adenda) { agregarAdenda(e.id, { autor: PROVIDER_SESION, texto: adenda.trim() }); setAdenda(null); aviso.ok('Addendum added.') }
    setFirmando(null)
  }

  return (
    <>
      <DocumentViewer
        title={\`Clinical note - \${paciente}\`}
        subtitle={\`\${e.fecha} · \${e.provider}\`}
        status={<Pill tone={firmada ? 'success' : 'warning'} size="sm">{e.nota}</Pill>}
        backLabel="Back to history"
        onBack={onBack}
        loading={!listo}
        onPdf={() => abrirDocumento(doc, () => aviso.error("We couldn't open the PDF. Allow pop-ups for this site and try again."))}
        notice={nota.texto}
        noticeTone={nota.tono}
        footer={pie || undefined}
      >
        <VistaDocumento doc={doc} />
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