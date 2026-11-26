import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Braces, Download, Eye, FileText, PenLine, PenOff } from 'lucide-react'
import { PageTitle } from '@/components/ui/page-title'
import { Button, buttonClasses } from '@/components/ui/button'
import { Pill } from '@/components/ui/pill'
import { Tabs } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { TARJETA_PANEL } from '@/lib/estilos'
import { COLOR, completar, variablesDe } from '@/pdfs/marco'
import { CATEGORIAS, PDFS, ejemploDe, htmlDe, llevaFirmas, sinFirmas, type Pdf } from '@/pdfs/plantillas'

/* Vista previa de los PDFs que genera el backend (design-reference/figma/modulos/pdfs.md). Página aparte de la app, en
   /pdfs/, como la de mails: cada documento con datos de ejemplo, con sus {{variables}} marcadas o el PDF de ejemplo, y
   la plantilla para bajar. El documento elegido va en el hash (/pdfs/#lab-order). */

/* Las plantillas, el pdfs.json, los PDF y las imágenes de ejemplo están en public/pdfs/, la carpeta del backend. */
const ASSETS = new URL(\`\${import.meta.env.BASE_URL}pdfs\`, window.location.origin).href
const LOGO = \`\${import.meta.env.BASE_URL}emails/confidentally-logo.png\`
const JIRA = 'https://confidetally.atlassian.net/browse/'
/* Ancho de la hoja en pantalla: 210 mm más el margen gris de la plantilla (24 px por lado). */
const ANCHO_HOJA = 842

type Modo = 'sample' | 'variables' | 'pdf'
type Estado = 'signed' | 'pending'

const pdfDelHash = () => PDFS.find((p) => p.id === window.location.hash.slice(1)) ?? PDFS[0]!

export default function Pdfs() {
  const [pdf, setPdf] = useState(pdfDelHash)
  const [modo, setModo] = useState<Modo>('sample')
  const [estado, setEstado] = useState<Estado>('signed')
  useEffect(() => {
    const alCambiar = () => setPdf(pdfDelHash())
    window.addEventListener('hashchange', alCambiar)
    return () => window.removeEventListener('hashchange', alCambiar)
  }, [])
  const elegir = (id: string) => { window.location.hash = id }
  const firmas = llevaFirmas(pdf)

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-8">
      <img src={LOGO} alt="Confidentally" className="mb-5 h-11 w-auto" />
      <PageTitle>PDFs</PageTitle>
      <p className="mt-[9px] max-w-[720px] text-xs leading-[17px] text-ink-faint">
        The documents the platform generates as PDF. They all share one A4 sheet; only the sections and the {'{{variables}}'} change.
      </p>

      {/* En celular la lista se vuelve un select, como en la página de mails. */}
      <label className="mt-4 block lg:hidden">
        <span className="sr-only">Document</span>
        <select
          value={pdf.id}
          onChange={(e) => elegir(e.target.value)}
          className="h-9 w-full rounded-md border border-line bg-white px-3 text-[13px] text-ink"
        >
          {CATEGORIAS.map((c) => (
            <optgroup key={c} label={c}>
              {PDFS.filter((p) => p.categoria === c).map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
            </optgroup>
          ))}
        </select>
      </label>

      <div className="mt-5 flex items-start gap-5">
        <nav aria-label="PDFs" className={cn(TARJETA_PANEL, 'sticky top-4 hidden w-[264px] shrink-0 p-2 lg:block')}>
          {CATEGORIAS.map((c) => (
            <div key={c} className="mb-1 last:mb-0">
              <p className="px-2.5 pt-2 pb-1 text-[11px] font-semibold tracking-wide text-ink-faint uppercase">{c}</p>
              {PDFS.filter((p) => p.categoria === c).map((p) => (
                <a
                  key={p.id}
                  href={\`#\${p.id}\`}
                  aria-current={p.id === pdf.id ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[13px] focus-visible:outline-2 focus-visible:outline-dash-blue',
                    p.id === pdf.id ? 'bg-dash-count-bg font-semibold text-dash-blue' : 'text-ink-soft hover:bg-surface-subtle',
                  )}
                >
                  <span className="min-w-0 flex-1 truncate">{p.nombre}</span>
                  {p.origen === 'propuesta' && <Pill tone="warning" size="sm">Proposal</Pill>}
                </a>
              ))}
            </div>
          ))}
        </nav>

        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <FichaPdf pdf={pdf} />
          <div className={cn(TARJETA_PANEL, 'overflow-hidden')}>
            <div className="flex flex-wrap items-center gap-2 border-b border-line px-4 py-3">
              <Tabs
                aria-label="Content"
                value={modo}
                onChange={setModo}
                tabs={[
                  { value: 'sample', label: 'Sample data', icon: Eye },
                  { value: 'variables', label: 'Variables', icon: Braces },
                  { value: 'pdf', label: 'PDF', icon: FileText },
                ]}
              />
              {firmas && modo === 'sample' && (
                <Tabs
                  aria-label="Signatures"
                  value={estado}
                  onChange={setEstado}
                  tabs={[{ value: 'signed', label: 'Signed', icon: PenLine }, { value: 'pending', label: 'Not signed', icon: PenOff }]}
                />
              )}
              <div className="ml-auto flex flex-wrap gap-2">
                <Button variant="secondary" size="md" onClick={() => bajar(pdf)}>
                  <Download /> Download HTML
                </Button>
                <a href={\`\${ASSETS}/\${pdf.id}.pdf\`} download className={buttonClasses({ variant: 'secondary', size: 'md' })}>
                  <FileText /> Sample PDF
                </a>
              </div>
            </div>
            {modo === 'pdf'
              ? <VistaArchivo key={pdf.id} pdf={pdf} />
              : <VistaHoja key={\`\${pdf.id}-\${modo}-\${estado}\`} pdf={pdf} variables={modo === 'variables'} firmada={estado === 'signed'} />}
          </div>
        </div>
      </div>
    </div>
  )
}

function FichaPdf({ pdf }: { pdf: Pdf }) {
  const { variables, listas } = useMemo(() => variablesDe(htmlDe(pdf), ejemploDe(pdf, ASSETS)), [pdf])
  const filas: [string, React.ReactNode][] = [
    ['Generated', pdf.cuando],
    ['Signed by', pdf.firma],
    ['Jira', <span key="jira" className="flex flex-wrap gap-x-2">{pdf.jira.map((k) => <a key={k} href={JIRA + k} target="_blank" rel="noreferrer" className="text-dash-blue hover:underline">{k}</a>)}</span>],
  ]
  const chip = (v: string) => <li key={v} className="rounded bg-surface-muted px-1.5 py-0.5 font-mono text-[11px] text-ink-soft">{v}</li>
  return (
    <section className={cn(TARJETA_PANEL, 'p-5')} aria-label="Document details">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-[11px] font-semibold tracking-wide text-ink-faint uppercase">{pdf.categoria}</p>
        {pdf.origen === 'propuesta'
          ? <Pill tone="warning">Proposal · pending approval</Pill>
          : <Pill tone="success">Same as the app</Pill>}
      </div>
      <h2 className="mt-1 text-base font-semibold text-ink">{pdf.nombre}</h2>
      <dl className="mt-3 grid grid-cols-[96px_1fr] gap-x-3 gap-y-1.5 text-[13px]">
        {filas.map(([r, v]) => (
          <div key={r} className="contents">
            <dt className="text-ink-muted">{r}</dt>
            <dd className="min-w-0 text-ink">{v}</dd>
          </div>
        ))}
        {pdf.completado && (
          <>
            <dt className="text-ink-muted">Proposed</dt>
            <dd className="text-ink">{pdf.completado.join(' · ')}</dd>
          </>
        )}
      </dl>
      <p className="mt-4 mb-1.5 text-[11px] font-semibold tracking-wide text-ink-faint uppercase">Variables ({variables.length})</p>
      <ul className="flex flex-wrap gap-1.5">{variables.map((v) => chip(\`{{\${v}}}\`))}</ul>
      {Object.keys(listas).length > 0 && (
        <>
          <p className="mt-4 mb-1.5 text-[11px] font-semibold tracking-wide text-ink-faint uppercase">Lists ({Object.keys(listas).length})</p>
          <ul className="flex flex-col gap-1.5">
            {Object.entries(listas).map(([lista, campos]) => (
              <li key={lista} className="flex flex-wrap items-center gap-1.5">
                <span className="font-mono text-[11px] font-semibold text-ink">{\`{{#\${lista}}}\`}</span>
                <ul className="flex flex-wrap gap-1.5">{campos.map((c) => chip(\`{{\${c}}}\`))}</ul>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}

/* La hoja HTML en un iframe, achicada para que entre entera en el ancho de la card (en celular, también). */
function VistaHoja({ pdf, variables, firmada }: { pdf: Pdf; variables: boolean; firmada: boolean }) {
  const marco = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLIFrameElement>(null)
  const [alto, setAlto] = useState(1180)
  const [escala, setEscala] = useState(1)
  const html = useMemo(() => {
    const datos = ejemploDe(pdf, ASSETS)
    return completar(htmlDe(pdf), firmada ? datos : sinFirmas(datos), { variables })
  }, [pdf, variables, firmada])

  useLayoutEffect(() => {
    const el = marco.current
    if (!el) return
    const medir = () => setEscala(Math.min(1, el.clientWidth / ANCHO_HOJA))
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const alCargar = () => {
    const doc = ref.current?.contentDocument
    if (!doc) return
    if (variables) marcarVariables(doc)
    setAlto(doc.documentElement.scrollHeight)
  }

  return (
    <div ref={marco} className="overflow-hidden bg-surface-muted" style={{ height: alto * escala }}>
      <iframe
        ref={ref}
        title={\`Preview: \${pdf.nombre}\`}
        srcDoc={html}
        sandbox="allow-same-origin"
        onLoad={alCargar}
        style={{ width: ANCHO_HOJA, height: alto, transform: \`scale(\${escala})\`, transformOrigin: '0 0', marginLeft: \`max(0px, calc((100% - \${ANCHO_HOJA}px) / 2))\` }}
        className="block border-0"
      />
    </div>
  )
}

/* El PDF de ejemplo tal cual lo generó Chromium: páginas, márgenes y pie con número de página. */
function VistaArchivo({ pdf }: { pdf: Pdf }) {
  const url = \`\${ASSETS}/\${pdf.id}.pdf\`
  return (
    <div className="bg-surface-muted p-4 sm:p-6">
      <iframe title={\`Sample PDF: \${pdf.nombre}\`} src={url} className="block h-[80vh] min-h-[560px] w-full rounded-md border-0 bg-white" />
      <p className="mt-3 text-xs text-ink-muted">
        If the PDF doesn’t show, <a href={url} target="_blank" rel="noreferrer" className="text-dash-blue hover:underline">open it in a new tab</a>.
      </p>
    </div>
  )
}

/* Marca las {{variables}} del texto para ver qué completa el backend (como en la página de mails). */
function marcarVariables(doc: Document) {
  const nodos: Text[] = []
  const w = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT)
  while (w.nextNode()) {
    const padre = w.currentNode.parentElement?.tagName
    if (padre !== 'STYLE' && /\\{\\{\\w+\\}\\}/.test(w.currentNode.nodeValue ?? '')) nodos.push(w.currentNode as Text)
  }
  for (const n of nodos) {
    const frag = doc.createDocumentFragment()
    for (const parte of (n.nodeValue ?? '').split(/(\\{\\{\\w+\\}\\})/)) {
      if (!/^\\{\\{\\w+\\}\\}$/.test(parte)) { frag.append(parte); continue }
      const s = doc.createElement('span')
      s.textContent = parte
      s.setAttribute('style', \`background:\${COLOR.franja};color:\${COLOR.marca};border-radius:3px;padding:0 2px;font-family:ui-monospace,Menlo,monospace;font-size:0.85em;font-weight:500;\`)
      frag.append(s)
    }
    n.replaceWith(frag)
  }
}

function bajar(pdf: Pdf) {
  const url = URL.createObjectURL(new Blob([htmlDe(pdf)], { type: 'text/html' }))
  const a = Object.assign(document.createElement('a'), { href: url, download: \`\${pdf.id}.html\` })
  a.click()
  URL.revokeObjectURL(url)
}
`})))()}export{n,i as r,r as t};