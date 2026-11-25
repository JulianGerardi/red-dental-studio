import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useMemo, useRef, useState } from 'react'
import { Download, Monitor, Smartphone, Braces, Eye } from 'lucide-react'
import { PageTitle } from '@/components/ui/page-title'
import { Button } from '@/components/ui/button'
import { Pill } from '@/components/ui/pill'
import { Tabs } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { TARJETA_PANEL } from '@/lib/estilos'
import { COLOR, completar } from '@/emails/marco'
import { EJEMPLO, MAILS, htmlDe, variablesDeMail, type Mail } from '@/emails/plantillas'

/* Vista previa de los mails que manda el backend (design-reference/figma/modulos/emails.md). Es una página aparte de
   la app, en /emails/ (los mails no son una pantalla de la plataforma), con las piezas del design system. Muestra
   cada plantilla con datos de ejemplo o con sus {{variables}} marcadas, en escritorio o en celular, y la deja bajar
   tal cual. El mail elegido va en el hash (/emails/#appointment-request), así cada uno tiene su link. */

/* Las imágenes salen de public/emails/, la misma carpeta que se le entrega al backend. */
const ASSETS = new URL(\`\${import.meta.env.BASE_URL}emails\`, window.location.origin).href
const IMAGENES = { assets_url: ASSETS, practice_logo_url: \`\${ASSETS}/sample-practice-logo.png\` }
const CATEGORIAS = [...new Set(MAILS.map((m) => m.categoria))]
const JIRA = 'https://confidetally.atlassian.net/browse/'

type Ancho = 'desktop' | 'mobile'
type Modo = 'sample' | 'variables'

const mailDelHash = () => MAILS.find((m) => m.id === window.location.hash.slice(1)) ?? MAILS[0]

export default function Emails() {
  const [mail, setMail] = useState(mailDelHash)
  const [ancho, setAncho] = useState<Ancho>('desktop')
  const [modo, setModo] = useState<Modo>('sample')
  useEffect(() => {
    const alCambiar = () => setMail(mailDelHash())
    window.addEventListener('hashchange', alCambiar)
    return () => window.removeEventListener('hashchange', alCambiar)
  }, [])
  const elegir = (id: string) => { window.location.hash = id }

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-8">
      <img src={\`\${ASSETS}/confidentally-logo.png\`} alt="Confidentally" className="mb-5 h-11 w-auto" />
      <PageTitle>Emails</PageTitle>
      <p className="mt-[9px] max-w-[720px] text-xs leading-[17px] text-ink-faint">
        The emails the platform sends. They all share one layout; only the text and the {'{{variables}}'} change.
      </p>

      {/* En celular la lista se vuelve un select: 16 mails estirarían la página antes de llegar a la vista previa. */}
      <label className="mt-4 block lg:hidden">
        <span className="sr-only">Email</span>
        <select
          value={mail.id}
          onChange={(e) => elegir(e.target.value)}
          className="h-9 w-full rounded-md border border-line bg-white px-3 text-[13px] text-ink"
        >
          {CATEGORIAS.map((c) => (
            <optgroup key={c} label={c}>
              {MAILS.filter((m) => m.categoria === c).map((m) => <option key={m.id} value={m.id}>{m.nombre}</option>)}
            </optgroup>
          ))}
        </select>
      </label>

      <div className="mt-5 flex items-start gap-5">
        <nav aria-label="Emails" className={cn(TARJETA_PANEL, 'sticky top-4 hidden w-[264px] shrink-0 p-2 lg:block')}>
          {CATEGORIAS.map((c) => (
            <div key={c} className="mb-1 last:mb-0">
              <p className="px-2.5 pt-2 pb-1 text-[11px] font-semibold tracking-wide text-ink-faint uppercase">{c}</p>
              {MAILS.filter((m) => m.categoria === c).map((m) => (
                <a
                  key={m.id}
                  href={\`#\${m.id}\`}
                  aria-current={m.id === mail.id ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[13px] focus-visible:outline-2 focus-visible:outline-dash-blue',
                    m.id === mail.id ? 'bg-dash-count-bg font-semibold text-dash-blue' : 'text-ink-soft hover:bg-surface-subtle',
                  )}
                >
                  <span className="min-w-0 flex-1 truncate">{m.nombre}</span>
                  {m.origen === 'propuesta' && <Pill tone="warning" size="sm">Proposal</Pill>}
                </a>
              ))}
            </div>
          ))}
        </nav>

        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <FichaMail mail={mail} />
          <div className={cn(TARJETA_PANEL, 'overflow-hidden')}>
            <div className="flex flex-wrap items-center gap-2 border-b border-line px-4 py-3">
              <Tabs
                aria-label="Width"
                value={ancho}
                onChange={setAncho}
                tabs={[{ value: 'desktop', label: 'Desktop', icon: Monitor }, { value: 'mobile', label: 'Mobile', icon: Smartphone }]}
              />
              <Tabs
                aria-label="Content"
                value={modo}
                onChange={setModo}
                tabs={[{ value: 'sample', label: 'Sample data', icon: Eye }, { value: 'variables', label: 'Variables', icon: Braces }]}
              />
              <Button variant="secondary" size="md" className="ml-auto" onClick={() => bajar(mail)}>
                <Download /> Download HTML
              </Button>
            </div>
            <VistaMail key={\`\${mail.id}-\${modo}-\${ancho}\`} mail={mail} ancho={ancho} modo={modo} />
          </div>
        </div>
      </div>
    </div>
  )
}

function FichaMail({ mail }: { mail: Mail }) {
  const variables = useMemo(() => variablesDeMail(mail), [mail])
  const filas: [string, React.ReactNode][] = [
    ['Sent when', mail.disparador],
    ['To', mail.destinatario],
    ['From', mail.remitente === 'clinica' ? 'The clinic ({{practice_name}})' : 'Confidentally'],
    ['Preheader', mail.preheader],
    ['Jira', mail.jira.length
      ? <span className="flex flex-wrap gap-x-2">{mail.jira.map((k) => <a key={k} href={JIRA + k} target="_blank" rel="noreferrer" className="text-dash-blue hover:underline">{k}</a>)}</span>
      : <span className="text-ink-faint">No story yet</span>],
  ]
  return (
    <section className={cn(TARJETA_PANEL, 'p-5')} aria-label="Email details">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-[11px] font-semibold tracking-wide text-ink-faint uppercase">{mail.categoria}</p>
        {mail.origen === 'propuesta'
          ? <Pill tone="warning">Proposal · pending approval</Pill>
          : <Pill tone="success">From the document</Pill>}
      </div>
      <h2 className="mt-1 text-base font-semibold text-ink">
        <span className="sr-only">Subject: </span>{mail.asunto}
      </h2>
      <dl className="mt-3 grid grid-cols-[96px_1fr] gap-x-3 gap-y-1.5 text-[13px]">
        {filas.map(([r, v]) => (
          <div key={r} className="contents">
            <dt className="text-ink-muted">{r}</dt>
            <dd className="min-w-0 text-ink">{v}</dd>
          </div>
        ))}
        {mail.completado && (
          <>
            <dt className="text-ink-muted">Not in the doc</dt>
            <dd className="text-ink">{mail.completado.join(' · ')}</dd>
          </>
        )}
      </dl>
      <p className="mt-4 mb-1.5 text-[11px] font-semibold tracking-wide text-ink-faint uppercase">Variables ({variables.length})</p>
      <ul className="flex flex-wrap gap-1.5">
        {variables.map((v) => (
          <li key={v} className="rounded bg-surface-muted px-1.5 py-0.5 font-mono text-[11px] text-ink-soft">{\`{{\${v}}}\`}</li>
        ))}
      </ul>
    </section>
  )
}

function VistaMail({ mail, ancho, modo }: { mail: Mail; ancho: Ancho; modo: Modo }) {
  const ref = useRef<HTMLIFrameElement>(null)
  const [alto, setAlto] = useState(900)
  const html = useMemo(() => {
    const crudo = htmlDe(mail)
    return modo === 'sample' ? completar(crudo, { ...EJEMPLO, ...IMAGENES }) : completar(crudo, IMAGENES)
  }, [mail, modo])

  const alCargar = () => {
    const doc = ref.current?.contentDocument
    if (!doc) return
    if (modo === 'variables') marcarVariables(doc)
    setAlto(doc.documentElement.scrollHeight)
  }

  return (
    <div className="flex justify-center bg-surface-muted p-4 sm:p-6">
      <iframe
        ref={ref}
        title={\`Preview: \${mail.asunto}\`}
        srcDoc={html}
        sandbox="allow-same-origin"
        onLoad={alCargar}
        style={{ height: alto }}
        className={cn('block border-0 bg-white', ancho === 'mobile' ? 'w-full max-w-[375px] rounded-[20px] shadow-panel' : 'w-full max-w-[680px]')}
      />
    </div>
  )
}

/* Marca las {{variables}} del texto (no las de los enlaces) para ver qué completa el backend. */
function marcarVariables(doc: Document) {
  const nodos: Text[] = []
  const w = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT)
  while (w.nextNode()) if (/\\{\\{\\w+\\}\\}/.test(w.currentNode.nodeValue ?? '')) nodos.push(w.currentNode as Text)
  for (const n of nodos) {
    const frag = doc.createDocumentFragment()
    for (const parte of (n.nodeValue ?? '').split(/(\\{\\{\\w+\\}\\})/)) {
      if (!/^\\{\\{\\w+\\}\\}$/.test(parte)) { frag.append(parte); continue }
      const s = doc.createElement('span')
      s.textContent = parte
      s.setAttribute('style', \`background:\${COLOR.franja};color:\${COLOR.marca};border-radius:4px;padding:0 3px;font-family:ui-monospace,Menlo,monospace;font-size:0.85em;font-weight:500;\`)
      frag.append(s)
    }
    n.replaceWith(frag)
  }
}

function bajar(mail: Mail) {
  const url = URL.createObjectURL(new Blob([htmlDe(mail)], { type: 'text/html' }))
  const a = Object.assign(document.createElement('a'), { href: url, download: \`\${mail.id}.html\` })
  a.click()
  URL.revokeObjectURL(url)
}
`})))()}export{n,i as r,r as t};