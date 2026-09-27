import { useContext, useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import { Controls, DocsContext, Markdown, Primary, Source, Stories } from '@storybook/addon-docs/blocks'
import {
  BookOpen, ClipboardCheck, Code2, ExternalLink, LayoutTemplate, Lightbulb, MonitorSmartphone, Palette, Puzzle,
  SlidersHorizontal, type LucideIcon,
} from 'lucide-react'
import { Tabs } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { comentarioDe, componentes } from './catalog'
import { Decisiones, useDecisiones } from './decisiones'
import { Dispositivos } from './Dispositivos'
import { hrefDe, paginaDeArchivo, useIndice } from './Mapa'

/* Página de docs de cada componente, armada como las de Primer: arriba qué
   es, en una frase; tres pestañas -Overview para probarlo y ver sus
   ejemplos, Guidelines para entender por qué es así y dónde se usa, Code
   para importarlo y leer su código-, y a la derecha un índice de la pestaña.
   Lee los archivos con `?raw`, así que siempre muestra lo que hay en el repo. */

const archivos = import.meta.glob('/src/**/*.{ts,tsx}', { query: '?raw', import: 'default' }) as Record<
  string,
  () => Promise<string>
>

const REPO = 'https://github.com/JulianGerardi/red-dental-studio/blob/main/'

function useArchivo(ruta: string | null) {
  const [codigo, setCodigo] = useState<string | null>(null)
  useEffect(() => {
    let vivo = true
    if (ruta && archivos[ruta]) archivos[ruta]().then((c) => vivo && setCodigo(c))
    else setCodigo(null)
    return () => {
      vivo = false
    }
  }, [ruta])
  return codigo
}

const ICONO_SECCION: Record<string, LucideIcon> = {
  Foundations: Palette,
  Elements: LayoutTemplate,
  Components: Puzzle,
  Pages: MonitorSmartphone,
  Audit: ClipboardCheck,
}

/* Un comentario de código a Markdown: une las líneas cortadas de cada
   párrafo y deja las listas como listas. */
function comentarioAMarkdown(texto: string) {
  return texto
    .split(/\n\s*\n/)
    .map((p) => p.split('\n').reduce((acc, l) => (/^\s*[-*]\s/.test(l) ? `${acc}\n${l.trim()}` : `${acc} ${l.trim()}`), '').trim())
    .join('\n\n')
}

/* Título de sección: entra en el índice de la derecha. */
function Seccion({ titulo, nota, children, id }: { titulo: string; nota?: ReactNode; children: ReactNode; id?: string }) {
  return (
    <section className="ds-seccion mt-12 first:mt-8" id={id}>
      <h2 data-toc className="sb-unstyled m-0 scroll-mt-6 text-[22px] leading-tight font-bold tracking-[-0.015em] text-ink">{titulo}</h2>
      {nota && <p className="sb-unstyled m-0 mt-1.5 max-w-[70ch] text-[14px] leading-relaxed text-ink-muted">{nota}</p>}
      <div className="mt-4">{children}</div>
    </section>
  )
}

type Item = { el: HTMLElement; texto: string; nivel: 2 | 3 }

/* "On this page": las secciones de la pestaña abierta y los ejemplos. */
function EnEstaPagina({ raiz, clave }: { raiz: RefObject<HTMLDivElement | null>; clave: string }) {
  const [items, setItems] = useState<Item[]>([])
  const [activo, setActivo] = useState(0)
  useEffect(() => {
    const el = raiz.current
    if (!el) return
    let firma = ''
    let t = 0
    const leer = () => {
      const hs = [...el.querySelectorAll<HTMLElement>('h2[data-toc], .ds-ejemplos .sb-anchor > h3')]
      const nuevos = hs.map((h): Item => ({ el: h, texto: h.textContent?.trim() ?? '', nivel: h.matches('[data-toc]') ? 2 : 3 })).filter((i) => i.texto)
      const f = nuevos.map((i) => i.texto).join('|')
      if (f !== firma) {
        firma = f
        setItems(nuevos)
      }
    }
    leer()
    const mo = new MutationObserver(() => {
      window.clearTimeout(t)
      t = window.setTimeout(leer, 200)
    })
    mo.observe(el, { childList: true, subtree: true })
    return () => {
      mo.disconnect()
      window.clearTimeout(t)
    }
  }, [raiz, clave])
  useEffect(() => {
    const alMover = () => {
      let i = 0
      items.forEach((it, k) => {
        if (it.el.getBoundingClientRect().top < 160) i = k
      })
      setActivo(i)
    }
    alMover()
    window.addEventListener('scroll', alMover, { passive: true })
    return () => window.removeEventListener('scroll', alMover)
  }, [items])
  if (items.length < 2) return null
  return (
    <nav aria-label="On this page" className="sb-unstyled sticky top-6 hidden max-h-[calc(100vh-48px)] self-start overflow-y-auto lg:block">
      <p className="m-0 mb-2 text-[12px] font-semibold text-ink">On this page</p>
      <ul className="m-0 flex list-none flex-col border-l border-line p-0">
        {items.map((it, i) => (
          <li key={`${it.texto}-${i}`}>
            <button
              type="button"
              onClick={() => it.el.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className={cn(
                '-ml-px block w-full border-l-2 py-1 text-left text-[12.5px] leading-snug transition-colors',
                it.nivel === 3 ? 'pl-6' : 'pl-3',
                i === activo ? 'border-dash-blue font-medium text-dash-blue' : 'border-transparent text-ink-muted hover:text-ink',
              )}
            >
              {it.texto}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function Chip({ icono: Icono, children, tono = 'gris', onClick, href }: { icono?: LucideIcon; children: ReactNode; tono?: 'gris' | 'azul' | 'verde'; onClick?: () => void; href?: string }) {
  const clase = cn(
    'inline-flex h-7 items-center gap-1.5 rounded-full border px-2.5 text-[12px] font-medium no-underline whitespace-nowrap',
    tono === 'azul' && 'border-dash-blue/25 bg-info-bg text-dash-blue',
    tono === 'verde' && 'border-dash-ok-fg/30 bg-dash-ok-bg text-dash-ok-fg',
    tono === 'gris' && 'border-line bg-white text-ink-medium',
    (onClick || href) && 'transition-colors hover:border-dash-blue hover:text-dash-blue',
  )
  const contenido = <>{Icono && <Icono className="size-3.5" aria-hidden />}{children}</>
  if (href) return <a href={href} target="_top" className={clase}>{contenido}</a>
  if (onClick) return <button type="button" onClick={onClick} className={clase}>{contenido}</button>
  return <span className={clase}>{contenido}</span>
}

type Pestana = 'Overview' | 'Guidelines' | 'Code'

export function DocsPage() {
  const contexto = useContext(DocsContext)
  const todas = contexto.componentStories()
  const historia = todas[0]
  const indice = useIndice()
  const archivoStories = (historia?.parameters?.fileName as string | undefined)?.replace(/^\.\//, '')
  const rutaStories = archivoStories ? `/${archivoStories}` : null
  const rutaComponente = rutaStories ? rutaStories.replace(/(\.[a-z]+)*\.stories\.tsx$/, '.tsx') : null
  const componente = useArchivo(rutaComponente)
  const stories = useArchivo(rutaStories)

  /* Páginas que documentan componentes de otros archivos (Elements / Patient
     menu → PatientSidePanel.tsx; Appointment cards → cuatro archivos) los
     indican con `docs.decisionsFrom`. */
  const decisionesDe = historia?.parameters?.docs?.decisionsFrom as string | string[] | undefined
  const archivosDeDecision = decisionesDe ? [decisionesDe].flat() : rutaComponente && componente ? [rutaComponente] : []
  const archivosDeUso = (decisionesDe ? [decisionesDe].flat() : rutaComponente ? [rutaComponente.slice(1)] : []).map((a) => a.replace(/^\/?(src\/)?/, ''))
  const encontrados = componentes.filter((c) => archivosDeUso.includes(c.archivo))
  const usos = encontrados.length ? [...new Set(encontrados.flatMap((c) => c.usadoPor))].sort() : undefined
  const decisionesPrimero = useDecisiones(archivosDeDecision[0] ?? null)

  /* El código que se muestra: el del componente, o el primero que documenta
     una página de Elements. */
  const rutaFuente = componente ? rutaComponente : archivosDeUso[0] ? `/src/${archivosDeUso[0]}` : null
  const fuenteAjena = useArchivo(componente ? null : rutaFuente)
  const fuente = componente ?? fuenteAjena
  const archivoFuente = rutaFuente?.slice(1)
  const exportados = encontrados.flatMap((c) => c.exports.map((e) => ({ e, desde: `@/${c.archivo.replace(/\.tsx$/, '')}` })))

  const titulo = historia?.title ?? ''
  const partes = titulo.split('/')
  const nombre = partes[partes.length - 1] ?? ''
  const seccion = partes[0] ?? ''
  const grupo = partes.length > 2 ? partes.slice(1, -1).join(' / ') : ''
  const IconoSeccion = ICONO_SECCION[seccion] ?? BookOpen

  const descripcionDocs = (historia?.parameters?.docs as { description?: { component?: string } } | undefined)?.description?.component
  const descripcion = descripcionDocs ?? (componente ? comentarioAMarkdown(comentarioDe(componente)).replace(/^Figma[^—\-.:]*?\d+:\d+\s*[—\-.:]?\s*/i, '').replace(/^\p{Ll}/u, (c) => c.toUpperCase()) : '')
  const parrafos = descripcion.split(/\n\s*\n/)
  const [lead, resto] = !parrafos[0] || /^\s*[-*\d]/.test(parrafos[0]) ? ['', descripcion] : [parrafos[0], parrafos.slice(1).join('\n\n')]

  const tieneControles = !!historia && Object.keys(historia.argTypes ?? {}).length > 0 && !historia.parameters?.controls?.disable
  const conDispositivos = !!historia && !historia.parameters?.docs?.devices?.disable
  const pestanas: Pestana[] = ['Overview']
  if (archivosDeDecision.length || conDispositivos || usos) pestanas.push('Guidelines')
  if (fuente || stories) pestanas.push('Code')
  const [pestana, setPestana] = useState<Pestana>('Overview')
  const cuerpo = useRef<HTMLDivElement>(null)

  const irA = (p: Pestana, id: string) => {
    setPestana(p)
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
  }

  const paginaDe = (archivo: string) => {
    if (!indice) return undefined
    const e = paginaDeArchivo(indice, archivo)
    return e ? hrefDe(e) : undefined
  }

  return (
    <div className="ds-doc font-sans text-ink">
      <header className="sb-unstyled flex flex-col gap-4 border-b border-line-row pb-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12.5px] text-ink-muted">
          <IconoSeccion className="size-3.5" aria-hidden />
          <span>{seccion}</span>
          {grupo && <><span className="text-ink-faint">/</span><span>{grupo}</span></>}
        </nav>
        <h1 className="sb-unstyled m-0 text-[36px] leading-[1.1] font-bold tracking-[-0.02em] text-ink sm:text-[40px]">{nombre}</h1>
        {lead && (
          <div className="ds-lead max-w-[68ch] text-[16px] leading-relaxed text-ink-medium">
            <Markdown>{lead}</Markdown>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2">
          {historia?.name === 'Playground' && <Chip icono={SlidersHorizontal} tono="verde">Playground</Chip>}
          {todas.length > 1 && <Chip onClick={() => irA('Overview', 'ds-ejemplos')}>{todas.length - 1} {todas.length === 2 ? 'example' : 'examples'}</Chip>}
          {usos && <Chip onClick={() => irA('Guidelines', 'ds-usos')}>Used in {usos.length} {usos.length === 1 ? 'file' : 'files'}</Chip>}
          {decisionesPrimero && decisionesPrimero.length > 0 && <Chip icono={Lightbulb} onClick={() => irA('Guidelines', 'ds-decisiones')}>Design decisions</Chip>}
          <span className="mx-1 h-4 w-px bg-line" aria-hidden />
          {historia && <Chip icono={ExternalLink} tono="azul" href={`./?path=/story/${historia.id}`}>Open full screen</Chip>}
          {archivoFuente && <Chip icono={Code2} href={`${REPO}${archivoFuente}`}>Source</Chip>}
        </div>
      </header>

      {pestanas.length > 1 && (
        <div className="sticky top-0 z-10 -mx-1 bg-white/95 px-1 py-3 backdrop-blur">
          <Tabs
            aria-label="Page sections"
            tabs={pestanas.map((p) => ({ value: p, icon: p === 'Overview' ? BookOpen : p === 'Guidelines' ? Lightbulb : Code2 }))}
            value={pestana}
            onChange={setPestana}
          />
        </div>
      )}

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_190px]">
        <div ref={cuerpo} className="min-w-0">
          {pestana === 'Overview' && (
            <>
              {resto && (
                <div className="ds-acerca mt-6 max-w-[72ch]">
                  <Markdown>{resto}</Markdown>
                </div>
              )}
              {historia && (
                <Seccion
                  titulo={historia.name === 'Playground' ? 'Playground' : historia.name}
                  nota={tieneControles ? 'Cambiá sus propiedades en la tabla de abajo: el componente cambia en vivo. Show code da el código de lo que armaste.' : undefined}
                >
                  <Primary />
                  {tieneControles && <Controls />}
                </Seccion>
              )}
              {todas.length > 1 && (
                <Seccion id="ds-ejemplos" titulo="Examples" nota="Cada variante y estado, funcionando. Show code muestra cómo se arma.">
                  <div className="ds-ejemplos">
                    <Stories includePrimary={false} title={<></>} />
                  </div>
                </Seccion>
              )}
            </>
          )}

          {pestana === 'Guidelines' && (
            <>
              {archivosDeDecision.length > 0 && (
                <Seccion id="ds-decisiones" titulo="Why it looks like this" nota="Las decisiones de diseño, leídas de los comentarios del código: cada una con la línea a la que se refiere.">
                  {archivosDeDecision.length === 1 ? (
                    <Decisiones archivo={archivosDeDecision[0]!} />
                  ) : (
                    <div className="flex flex-col gap-6">
                      {archivosDeDecision.map((a) => (
                        <div key={a} className="flex flex-col gap-2">
                          <p className="sb-unstyled m-0 font-mono text-[12px] text-ink-muted">{a}</p>
                          <Decisiones archivo={a} />
                        </div>
                      ))}
                    </div>
                  )}
                </Seccion>
              )}
              {conDispositivos && historia && (
                <Seccion titulo="On each device" nota="La historia principal en el ancho real de un celular, una tablet y una computadora. Se puede usar adentro.">
                  <Dispositivos storyId={historia.id} alto={historia.parameters?.docs?.devices?.height} />
                </Seccion>
              )}
              {usos && (
                <Seccion id="ds-usos" titulo="Where it is used" nota={usos.length ? `${usos.length} ${usos.length === 1 ? 'archivo de la app lo usa' : 'archivos de la app lo usan'}, leído del código.` : 'Ninguna pantalla lo usa todavía: sólo está documentado acá.'}>
                  {usos.length > 0 && (
                    <ul className="sb-unstyled m-0 grid list-none gap-2 p-0 sm:grid-cols-2">
                      {usos.map((u) => {
                        const href = u.startsWith('components/') ? paginaDe(u) : undefined
                        return (
                          <li key={u} className="flex items-center justify-between gap-3 rounded-lg border border-line-row bg-white px-3 py-2">
                            <code className="truncate text-[12px] text-ink">{u}</code>
                            {href && <a href={href} target="_top" className="shrink-0 text-[12px] text-dash-blue no-underline hover:underline">Open</a>}
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </Seccion>
              )}
            </>
          )}

          {pestana === 'Code' && (
            <>
              {exportados.length > 0 && (
                <Seccion titulo="Import">
                  <Source
                    language="tsx"
                    code={[...new Set(exportados.map((x) => x.desde))]
                      .map((desde) => `import { ${exportados.filter((x) => x.desde === desde).map((x) => x.e).join(', ')} } from '${desde}'`)
                      .join('\n')}
                  />
                </Seccion>
              )}
              {fuente && archivoFuente && (
                <Seccion titulo="Source" nota={<code>{archivoFuente}</code>}>
                  <Source code={fuente} language="tsx" />
                </Seccion>
              )}
              {stories && archivoStories && (
                <Seccion titulo="Stories source" nota={<code>{archivoStories}</code>}>
                  <Source code={stories} language="tsx" />
                </Seccion>
              )}
            </>
          )}
        </div>
        <EnEstaPagina raiz={cuerpo} clave={pestana} />
      </div>
    </div>
  )
}
