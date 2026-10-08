import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useState } from 'react'
import { FileText, Trash2, LoaderCircle } from 'lucide-react'
import { aviso } from '@/components/ui/toaster'

/* Figma 4106:201810: zona de arrastre, carga por URL y la lista de archivos
   subiendo. En el frame los cuatro archivos están congelados en "55% · 37 sec
   left"; acá la barra avanza de verdad, porque un progreso que no se mueve no
   dice nada. */

type Archivo = { id: string; nombre: string; peso: string; progreso: number }

const INICIALES: Archivo[] = Array.from({ length: 4 }, (_, i) => ({
  id: \`f\${i + 1}\`,
  nombre: 'Report name_T1.pdf',
  peso: '23.5MB',
  progreso: 55 - i * 9,
}))

export function RadiographyUpload({ onCancel, onSave }: { onCancel: () => void; onSave: () => void }) {
  const [archivos, setArchivos] = useState<Archivo[]>(INICIALES)
  const [url, setUrl] = useState('')
  const [sobre, setSobre] = useState(false)

  const sumar = (nombre: string) =>
    setArchivos((a) => [...a, { id: \`f\${Date.now()}\`, nombre, peso: '23.5MB', progreso: 0 }])

  return (
    <div className="flex flex-col gap-4">
      <div
        onDragOver={(e) => { e.preventDefault(); setSobre(true) }}
        onDragLeave={() => setSobre(false)}
        onDrop={(e) => {
          e.preventDefault()
          setSobre(false)
          const n = e.dataTransfer.files[0]?.name
          if (n) { sumar(n); aviso.ok(\`\${n} added to the queue.\`) }
        }}
        className={\`flex flex-col items-center gap-3 rounded-xl border-2 border-dashed px-6 py-12 text-center transition-colors \${
          sobre ? 'border-dash-blue bg-dash-count-bg' : 'border-line-strong bg-white'
        }\`}
      >
        <FileText className="size-10 text-ink" strokeWidth={1.5} />
        <span>
          <span className="block text-[17px] font-bold text-ink">Drag and drop your files</span>
          {/* "PND" es el typo del frame. */}
          <span className="block text-[13px] text-ink-muted">
            JPEG, PND, PDF, and MP4 formats, up to 50MB
          </span>
        </span>
        <label className="h-9 cursor-pointer rounded-md border border-line bg-white px-4 text-[13px] leading-9 font-medium hover:bg-surface-subtle">
          Select File
          <input
            type="file"
            className="sr-only"
            onChange={(e) => {
              const n = e.target.files?.[0]?.name
              if (n) { sumar(n); aviso.ok(\`\${n} added to the queue.\`) }
            }}
          />
        </label>
      </div>

      <div>
        <span className="block text-xs font-medium text-ink">or upload from URL</span>
        <div className="mt-1.5 flex gap-2">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Add file URL"
            className="focus:border-dash-blue h-10 min-w-0 flex-1 rounded-md border border-line px-3 text-[13px] placeholder:text-ink-faint focus:outline-none"
          />
          <button
            disabled={!url.trim()}
            onClick={() => {
              sumar(url.split('/').pop() || 'file')
              setUrl('')
              aviso.ok('File added to the queue.')
            }}
            className="h-10 shrink-0 rounded-md border border-line px-5 text-[13px] font-medium hover:bg-surface-subtle disabled:opacity-50"
          >
            Upload
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {archivos.map((a) => (
          <div key={a.id} className="flex items-center gap-3 rounded-lg border border-line bg-white p-3">
            <FileText className="size-6 shrink-0 text-ink" strokeWidth={1.5} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-bold text-ink">{a.nombre}</span>
              <span className="flex flex-wrap items-center gap-x-2 text-[12px] text-ink-muted">
                {a.peso} <span className="text-line-strong">|</span> {a.progreso}%
                <span className="bg-dash-blue size-1.5 rounded-full" />
                <span className="text-dash-blue font-medium">37 sec left</span>
                <LoaderCircle className="size-3.5 animate-spin text-dash-ok-fg" />
                Uploading
              </span>
              <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-line-soft">
                <span className="bg-dash-blue block h-full rounded-full transition-all" style={{ width: \`\${a.progreso}%\` }} />
              </span>
            </span>
            <button
              onClick={() => {
                const indice = archivos.findIndex((f) => f.id === a.id)
                setArchivos((x) => x.filter((f) => f.id !== a.id))
                aviso.warn(\`\${a.nombre} was removed from the queue.\`, {
                  label: 'Undo',
                  onClick: () => setArchivos((x) => [...x.slice(0, indice), a, ...x.slice(indice)]),
                })
              }}
              aria-label={\`Remove \${a.nombre}\`}
              className="shrink-0 rounded p-1 text-ink hover:bg-dash-bad-bg hover:text-dash-bad-fg"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>

      {/* En el frame Cancel y Save ocupan media pantalla cada uno; se mantienen
          juntos y al pie, como en el resto del sistema. */}
      <div className="flex flex-nowrap items-center justify-end gap-3">
        <button
          onClick={onCancel}
          className="h-9 shrink-0 rounded-md border border-line px-4 text-[13px] font-medium whitespace-nowrap hover:bg-surface-subtle"
        >
          Cancel
        </button>
        <button
          onClick={() => { aviso.ok(\`\${archivos.length} file\${archivos.length === 1 ? '' : 's'} saved to the exam.\`); onSave() }}
          className="bg-dash-blue hover:bg-dash-blue-hover h-9 shrink-0 rounded-md px-4 text-[13px] font-semibold whitespace-nowrap text-white transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  )
}
`})))()}export{n,i as r,r as t};