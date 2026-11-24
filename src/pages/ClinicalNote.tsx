import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Eye, EyeOff, FileText, PenLine } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { FieldLabel, control } from '@/components/patients/form'
import { buscarTarea } from '@/components/dashboard/dashboard-data'
import { aplicarAccion } from '@/components/dashboard/tareas'
import { CLINICA, abrirDocumento, documentoTarea, type Documento } from '@/components/dashboard/documentoTarea'
import { EmptyState } from '@/components/ui/empty-state'
import { DocumentViewer } from '@/components/ui/document-viewer'

/* La Clinical Note que abre Complete this Task en Pending Task, como red.dev (videos de Julián, 2026-11-20): Back to
   History (vuelve a Patient Summary de Clinical Mode), el nombre, View PDF, el documento y Sign Clinical Note, que pide
   el usuario y la contraseña otra vez. En el visor de documentos (ui/document-viewer), a pantalla completa. Ver
   design-reference/figma/modulos/dashboard.md (2026-11-20 y 2026-11-24). */

/* El documento en pantalla: el mismo contenido que el PDF (documentoTarea). */
export function VistaDocumento({ doc }: { doc: Documento }) {
  return (
    <article className="mx-auto w-full max-w-[760px] rounded-lg bg-white px-6 py-8 shadow-inner-card sm:px-12 sm:py-10">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-dash-blue flex size-16 items-center justify-center rounded-full bg-info-bg text-xl font-bold" aria-hidden>R</span>
          <span className="flex flex-col">
            <span className="text-[14px] font-semibold text-ink">{CLINICA.nombre}</span>
            <span className="text-[12px] text-ink-muted">{CLINICA.sede}</span>
          </span>
        </div>
        <span className="text-[12px] text-ink sm:text-right">{CLINICA.direccion}<br />{CLINICA.contacto}</span>
      </header>

      {doc.secciones.map((s) => (
        <section key={s.titulo} className="mt-8 flex flex-col gap-3">
          <h2 className="rounded-md bg-surface-subtle px-3 py-2 text-[15px] font-semibold text-ink">{s.titulo}</h2>
          {'campos' in s && (
            <dl className="grid gap-x-6 gap-y-2 text-[13px] sm:grid-cols-2">
              {s.campos.map(([k, v]) => (
                <div key={k}><dt className="inline font-semibold text-ink">{k}: </dt><dd className="inline text-ink-muted">{v}</dd></div>
              ))}
            </dl>
          )}
          {'listas' in s && s.listas.map(([k, items]) => (
            <div key={k} className="text-[13px]">
              <p className="font-semibold text-ink">{k}</p>
              <ul className="mt-1 list-disc pl-5 text-ink">{items.map((it) => <li key={it}>{it}</li>)}</ul>
            </div>
          ))}
          {'parrafos' in s && s.parrafos.map((p) => <p key={p} className="text-[13px] leading-relaxed text-ink-muted">{p}</p>)}
        </section>
      ))}

      <footer className="mt-8 border-t border-ink pt-2 text-[11px]">
        <p className="font-semibold text-ink">Provider</p>
        <p className="text-ink-muted">{doc.provider}</p>
        <p className="text-ink-muted">Date: {doc.firmado}</p>
      </footer>
    </article>
  )
}

/* Login to Sign Document: el usuario y la contraseña otra vez, por seguridad. Sign se habilita con los dos. */
function FirmarDialog({ onCancel, onFirmar }: { onCancel: () => void; onFirmar: () => void }) {
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
  const volver = () => navegar(`/patients/${id}/clinical-mode?tab=${encodeURIComponent('Patient summary')}`)

  return (
    <>
      <DocumentViewer
        title={tarea ? `Clinical note - ${tarea.person}` : 'Clinical note'}
        backLabel="Back to history"
        onBack={volver}
        loading={!!doc && !listo}
        onPdf={doc ? () => abrirDocumento(doc, () => aviso.error("We couldn't open the PDF. Allow pop-ups for this site and try again.")) : undefined}
        footer={doc && !firmada ? <Button className="ml-auto" onClick={() => setFirmando(true)}><PenLine /> Sign clinical note</Button> : undefined}
      >
        {doc
          ? <VistaDocumento doc={doc} />
          : <EmptyState icon={FileText} title="Clinical note not found" detail="It may have been signed or removed. Go back to the history to find it." className="rounded-lg bg-white" />}
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
