import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useRef, useState } from 'react'
import { Bold, Bot, List, Loader2, Pilcrow, RefreshCw, Send, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { aviso } from '@/components/ui/toaster'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { borradorNarrativa, type Narrativa, type ProgresoWorkflow, type Workflow } from '@/data/workflows'

/* AI Narrative Editor, el flujo de red.dev: al abrirse arma el borrador con lo contestado en los pasos guardados ("Original
   Clinical Draft", que queda guardado); si no hay nada, avisa "No answered questions to summarize". Se edita con formato
   (Bold, Title, Subtitle, Text, List) y Apply Changes guarda la versión editada. Ver
   design-reference/figma/modulos/clinical-mode.md. */

type Estado = 'generando' | 'borrador' | 'editado' | 'aplicado' | 'vacio'

const ESTADO: Record<Estado, { texto: string; punto: string }> = {
  generando: { texto: 'Generating narrative from the answered questions…', punto: 'bg-dash-blue' },
  borrador: { texto: 'Original Clinical Draft', punto: 'bg-status-ok' },
  editado: { texto: 'Unsaved changes', punto: 'bg-warn-fg' },
  aplicado: { texto: 'Edited narrative', punto: 'bg-status-ok' },
  vacio: { texto: 'No answered questions to summarize', punto: 'bg-ink-faint' },
}

/* Un botón de la barra de formato. El mousedown no le saca la selección al editor. */
export function BotonFormato({ etiqueta, icono: Icono, onClick, disabled }: { etiqueta: string; icono?: typeof Bold; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button" disabled={disabled} aria-label={etiqueta} onMouseDown={(e) => e.preventDefault()} onClick={onClick}
      className="flex h-7 items-center gap-1.5 rounded px-2 text-[11px] font-semibold tracking-wide text-ink uppercase transition-colors hover:bg-surface-muted disabled:opacity-40"
    >
      {Icono && <Icono className="size-3.5" aria-hidden />}
      {etiqueta}
    </button>
  )
}

export function NarrativeEditor({
  wf, progreso, open, onClose, onGuardar,
}: {
  wf: Workflow
  progreso?: ProgresoWorkflow
  open: boolean
  onClose: () => void
  onGuardar: (n: Omit<Narrativa, 'fecha'>) => void
}) {
  const editor = useRef<HTMLDivElement>(null)
  const [estado, setEstado] = useState<Estado>('generando')
  const [confirmar, setConfirmar] = useState<'cerrar' | 'regenerar' | null>(null)
  const guardada = progreso?.narrativa

  const cargar = (html: string) => { if (editor.current) editor.current.innerHTML = html }

  /* Genera el borrador (con una espera corta, como la IA de red.dev) y lo deja guardado. */
  const generar = () => {
    setEstado('generando')
    cargar('')
    window.setTimeout(() => {
      const html = borradorNarrativa(wf, progreso)
      cargar(html)
      if (!html) {
        setEstado('vacio')
        aviso.error('Failed to generate the narrative: no answered questions to summarize. Save a step first.')
        return
      }
      setEstado('borrador')
      onGuardar({ html, origen: 'draft' })
    }, 900)
  }

  useEffect(() => {
    if (!open) return
    setConfirmar(null)
    /* El editor existe recién cuando el diálogo se monta. */
    const t = window.setTimeout(() => {
      if (guardada) { cargar(guardada.html); setEstado(guardada.origen === 'edited' ? 'aplicado' : 'borrador') }
      else generar()
    })
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const formato = (comando: string, valor?: string) => {
    editor.current?.focus()
    document.execCommand(comando, false, valor)
    setEstado('editado')
  }
  const aplicar = () => {
    const html = editor.current?.innerHTML ?? ''
    onGuardar({ html, origen: 'edited' })
    setEstado('aplicado')
    aviso.ok('Narrative updated.')
  }
  const cerrar = () => (estado === 'editado' ? setConfirmar('cerrar') : onClose())
  /* Regenerar pisa lo editado: se confirma antes. */
  const regenerar = () => (estado === 'editado' || estado === 'aplicado' ? setConfirmar('regenerar') : generar())
  const generando = estado === 'generando'

  return (
    <Dialog open={open} onOpenChange={(v) => !v && cerrar()}>
      <DialogContent showCloseButton={false} className="flex h-[min(80vh,720px)] flex-col gap-0 overflow-hidden p-0 sm:max-w-[760px]">
        <div className="flex items-start gap-3 border-b border-line-soft px-5 py-4">
          <span className="bg-purple-fg flex size-9 shrink-0 items-center justify-center rounded-lg text-white"><Bot className="size-5" aria-hidden /></span>
          <div className="min-w-0 flex-1">
            <DialogTitle className="text-[17px] font-semibold text-ink">AI Narrative Editor</DialogTitle>
            <p className="text-[10px] font-medium tracking-wide text-ink-muted uppercase">{wf.codigo} - Published v{wf.version}</p>
            <DialogDescription className="sr-only">Edit clinical narrative with direct visual formatting.</DialogDescription>
          </div>
          <button type="button" aria-label="Close narrative editor" onClick={cerrar} className="flex size-8 items-center justify-center rounded-md text-ink-muted hover:bg-surface-muted"><X className="size-4" /></button>
        </div>

        <div role="toolbar" aria-label="Formatting" className="flex flex-wrap items-center gap-1 border-b border-line-soft bg-surface-alt px-4 py-1.5">
          <BotonFormato etiqueta="Bold" icono={Bold} disabled={generando} onClick={() => formato('bold')} />
          <span aria-hidden className="mx-1 h-4 w-px bg-line" />
          <BotonFormato etiqueta="Title" disabled={generando} onClick={() => formato('formatBlock', 'h2')} />
          <BotonFormato etiqueta="Subtitle" disabled={generando} onClick={() => formato('formatBlock', 'h3')} />
          <span aria-hidden className="mx-1 h-4 w-px bg-line" />
          <BotonFormato etiqueta="Text" icono={Pilcrow} disabled={generando} onClick={() => formato('formatBlock', 'p')} />
          <BotonFormato etiqueta="List" icono={List} disabled={generando} onClick={() => formato('insertUnorderedList')} />
        </div>

        <div className="relative min-h-0 flex-1 overflow-y-auto">
          {generando && (
            <div aria-live="polite" className="absolute inset-0 flex flex-col gap-2.5 px-6 py-5">
              <span className="sr-only">Generating narrative</span>
              {['w-1/3', 'w-1/4', 'w-5/6', 'w-2/3', 'w-1/4', 'w-3/4'].map((w, i) => <span key={i} className={cn('h-3 animate-pulse rounded bg-surface-muted', w)} />)}
            </div>
          )}
          <div
            ref={editor}
            role="textbox" aria-multiline aria-label="Clinical narrative"
            contentEditable={!generando} suppressContentEditableWarning
            data-placeholder={estado === 'vacio' ? 'No answered questions to summarize yet. Answer and save a step, then regenerate — or start typing your clinical notes...' : 'Start typing your clinical notes...'}
            onInput={() => setEstado('editado')}
            className={cn(
              'min-h-full px-6 py-5 text-[13px] leading-relaxed text-ink outline-none',
              'empty:before:text-ink-faint empty:before:content-[attr(data-placeholder)]',
              '[&_b]:font-semibold [&_h2]:mb-2 [&_h2]:text-[18px] [&_h2]:font-bold [&_h3]:mt-4 [&_h3]:mb-1 [&_h3]:text-[14px] [&_h3]:font-semibold [&_li]:my-1 [&_p]:my-1.5 [&_ul]:list-disc [&_ul]:pl-5',
              generando && 'invisible',
            )}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-line-soft bg-surface-alt px-5 py-3">
          {confirmar ? (
            <>
              <span className="flex-1 text-[12px] text-ink">
                {confirmar === 'cerrar' ? 'Discard the unsaved changes to the narrative?' : 'Replace the edited narrative with a new draft from the answers?'}
              </span>
              <Button variant="secondary" size="md" onClick={() => setConfirmar(null)}>Keep editing</Button>
              <Button variant="destructive" size="md" onClick={() => { const c = confirmar; setConfirmar(null); if (c === 'cerrar') onClose(); else generar() }}>
                {confirmar === 'cerrar' ? 'Discard' : 'Replace'}
              </Button>
            </>
          ) : (
            <>
              <span className="flex flex-1 items-center gap-2 text-[11px] text-ink-muted italic">
                {generando ? <Loader2 className="text-dash-blue size-3 animate-spin" aria-hidden /> : <span aria-hidden className={cn('size-1.5 rounded-full', ESTADO[estado].punto)} />}
                {ESTADO[estado].texto}
                {guardada && !generando && estado !== 'editado' && <span className="not-italic">· {guardada.fecha}</span>}
              </span>
              <Button variant="secondary" size="md" disabled={generando} onClick={regenerar}><RefreshCw /> Regenerate</Button>
              <Button size="md" disabled={estado !== 'editado'} onClick={aplicar}><Send /> Apply Changes</Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
`})))()}export{n,i as r,r as t};