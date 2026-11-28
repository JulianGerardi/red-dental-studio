import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Eye, EyeOff, FileText, PenLine } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { FieldLabel, control } from '@/components/patients/form'
import { buscarTarea } from '@/components/dashboard/dashboard-data'
import { aplicarAccion } from '@/components/dashboard/tareas'
import { CLINICA, abrirDocumento, diagramaBoca, documentoTarea, type Documento } from '@/components/dashboard/documentoTarea'
import { EmptyState } from '@/components/ui/empty-state'
import { DocumentViewer } from '@/components/ui/document-viewer'
import { DocumentSheet } from '@/components/ui/document-sheet'
import { MEMBRETE } from '@/data/clinica'
import type { Denticion } from '@/data/laboratorios'

/* La Clinical Note que abre Complete this Task en Pending Task, como red.dev (videos de Julián, 2026-11-20): Back to
   History (vuelve a Patient Summary de Clinical Mode), el nombre, View PDF, el documento y Sign Clinical Note, que pide
   el usuario y la contraseña otra vez. En el visor de documentos (ui/document-viewer), a pantalla completa. Ver
   design-reference/figma/modulos/dashboard.md (2026-11-20 y 2026-11-24). */

/* El diagrama de la boca de la Lab Order, el mismo que dibuja el PDF (diagramaBoca). */
function DiagramaBoca({ denticion, elegidos }: { denticion: Denticion; elegidos: string[] }) {
  const g = diagramaBoca(denticion)
  return (
    <svg viewBox={\`0 0 \${g.ancho} \${g.alto}\`} className="w-full max-w-[240px] rounded-xl bg-surface-muted" role="img" aria-label={\`\${denticion} dentition, teeth \${elegidos.join(', ')}\`}>
      {g.arcadas.map((a) => (
        <g key={a.nombre}>
          <polyline points={a.encia.map((p) => p.join(',')).join(' ')} fill="none" strokeWidth={g.tam + 7} strokeLinecap="round" strokeLinejoin="round" className="stroke-encia" />
          <text x={a.cx} y={a.cy + 3} textAnchor="middle" fontSize={8.5} className="fill-ink-muted">{a.nombre}</text>
          {a.dientes.map((t) => {
            const si = elegidos.includes(t.d)
            return (
              <g key={t.d}>
                <rect x={t.x - g.tam / 2} y={t.y - g.tam / 2} width={g.tam} height={g.tam} rx={g.tam * 0.35} strokeWidth={0.8} className={si ? 'fill-dash-blue stroke-dash-blue' : 'fill-white stroke-line'} />
                <text x={t.lx} y={t.ly + 2.5} textAnchor="middle" fontSize={denticion === 'Primary' ? 8 : 6.5} className="fill-ink-muted">{t.d}</text>
              </g>
            )
          })}
        </g>
      ))}
    </svg>
  )
}

/* El documento en pantalla, con la hoja común (ui/document-sheet) y el mismo contenido que el PDF (documentoTarea): la
   primera sección de datos va al resumen y el resto, numerado. Firma el provider. */
export function VistaDocumento({ doc }: { doc: Documento }) {
  const datos = doc.secciones.find((s) => 'campos' in s)
  const resto = doc.secciones.filter((s) => s !== datos)
  return (
    <DocumentSheet
      clinic={MEMBRETE}
      type={doc.titulo}
      title={doc.paciente}
      summary={datos && 'campos' in datos ? datos.campos.map(([label, value]) => ({ label, value })) : []}
      sections={resto.map((s) => ({
        title: s.titulo,
        content: 'campos' in s ? (
          <dl className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {s.campos.map(([k, v]) => <div key={k}><dt className="inline font-semibold text-ink">{k}: </dt><dd className="inline">{v}</dd></div>)}
          </dl>
        ) : 'listas' in s ? (
          <div className="flex flex-col gap-2">
            {s.listas.map(([k, items], i) => (
              <div key={\`\${i}-\${k}\`}>
                <p className="font-semibold text-ink">{k}</p>
                <ul className="list-disc pl-5">{items.map((it) => <li key={it}>{it}</li>)}</ul>
              </div>
            ))}
          </div>
        ) : 'dientes' in s ? (
          <div className="flex flex-wrap items-start gap-6">
            <DiagramaBoca denticion={s.dientes.denticion} elegidos={s.dientes.piezas.map(([d]) => d)} />
            <ul>{s.dientes.piezas.map(([d, sup]) => <li key={d}><span className="font-semibold text-ink">Tooth {d}</span>{sup.length ? \`: \${sup.join(', ')}\` : ''}</li>)}</ul>
          </div>
        ) : (
          <div className="flex flex-col gap-2">{s.parrafos.map((p) => <p key={p}>{p}</p>)}</div>
        ),
      }))}
      signatures={doc.sinFirma ? undefined : [{ role: 'Provider', name: doc.provider, signed: doc.firmado ? { date: doc.firmado, text: doc.provider } : undefined }]}
      appendix={doc.adendas?.length ? {
        title: 'Addenda',
        note: 'Added after the note was signed. They do not change the signed note.',
        content: (
          <div className="flex flex-col gap-4">
            {doc.adendas.map((a) => (
              <div key={\`\${a.fecha}-\${a.texto}\`}>
                <p className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <span className="font-semibold text-ink">Addendum by {a.autor}</span>
                  <span className="text-[12px] text-ink-muted tabular-nums">{a.fecha}</span>
                </p>
                <p>{a.texto}</p>
                <p className="text-[11px] text-ink-muted">Signed electronically by {a.autor} · {a.fecha}</p>
              </div>
            ))}
          </div>
        ),
      } : undefined}
      footer={\`\${CLINICA.nombre} · \${doc.titulo} · \${doc.paciente}\`}
    />
  )
}

/* Login to Sign Document: el usuario y la contraseña otra vez, por seguridad. Sign se habilita con los dos. La misma
   firma la nota del historial y sus addenda (clinical/PatientSummaryNote). */
export function FirmarDialog({ onCancel, onFirmar }: { onCancel: () => void; onFirmar: () => void }) {
  const [email, setEmail] = useState('')
  const [clave, setClave] = useState('')
  const [ver, setVer] = useState(false)
  return (
    <Dialog open onOpenChange={(v) => !v && onCancel()}>
      <DialogContent className="gap-4 p-5 sm:max-w-[575px]">
        <DialogTitle className="flex items-center gap-2 text-base font-bold text-ink">
          <span className="flex size-6 items-center justify-center rounded-md border border-line"><PenLine className="size-3.5" aria-hidden /></span>
          Login to sign document
        </DialogTitle>
        <DialogDescription className="text-[13px] text-ink-soft">
          For security and legal purposes, please re-enter your credentials to sign this document electronically.
        </DialogDescription>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => { e.preventDefault(); if (email.trim() && clave) onFirmar() }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <FieldLabel>Email</FieldLabel>
              <input type="email" autoComplete="username" placeholder="example@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className={cn(control(), 'h-9 px-3')} />
            </label>
            <label className="flex flex-col gap-2">
              <FieldLabel>Password</FieldLabel>
              <span className="relative">
                <input type={ver ? 'text' : 'password'} autoComplete="current-password" placeholder="Enter password" value={clave} onChange={(e) => setClave(e.target.value)} className={cn(control(), 'h-9 pr-9 pl-3')} />
                <button type="button" onClick={() => setVer(!ver)} aria-label={ver ? 'Hide password' : 'Show password'} className="absolute inset-y-0 right-0 flex w-9 items-center justify-center text-ink-muted hover:text-ink">
                  {ver ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </span>
            </label>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
            <Button type="submit" disabled={!email.trim() || !clave}>Sign</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default function ClinicalNote() {
  const { id = 'john-smith', noteId = '' } = useParams()
  const navegar = useNavigate()
  const tarea = buscarTarea(noteId)
  /* Como red.dev: "Preparing document..." un momento antes de mostrarlo; View PDF espera. */
  const [listo, setListo] = useState(false)
  useEffect(() => { const t = setTimeout(() => setListo(true), 600); return () => clearTimeout(t) }, [])
  const [firmando, setFirmando] = useState(false)
  const [firmada, setFirmada] = useState<Date>()

  const doc = tarea && documentoTarea(tarea, firmada)
  const volver = () => navegar(\`/patients/\${id}/clinical-mode?tab=\${encodeURIComponent('Patient summary')}\`)

  return (
    <>
      <DocumentViewer
        title={tarea ? \`Clinical note - \${tarea.person}\` : 'Clinical note'}
        backLabel="Back to history"
        onBack={volver}
        loading={!!doc && !listo}
        onPdf={doc ? () => abrirDocumento(doc, () => aviso.error("We couldn't open the PDF. Allow pop-ups for this site and try again.")) : undefined}
        footer={doc && !firmada ? <Button className="ml-auto" onClick={() => setFirmando(true)}><PenLine /> Sign clinical note</Button> : undefined}
      >
        {doc
          ? <VistaDocumento doc={doc} />
          : <EmptyState icon={FileText} title="Clinical note not found" detail="It may have been signed or removed. Go back to the history to find it." className="rounded-lg bg-surface" />}
      </DocumentViewer>

      {firmando && tarea && (
        <FirmarDialog
          onCancel={() => setFirmando(false)}
          onFirmar={() => { setFirmando(false); setFirmada(new Date()); aplicarAccion(tarea, 'Sign') }}
        />
      )}
    </>
  )
}
`})))()}export{n,i as r,r as t};