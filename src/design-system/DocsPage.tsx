import { useContext, useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import { Controls, DocsContext, Markdown, Primary, Source, Stories, Story } from '@storybook/addon-docs/blocks'
import { Lightbulb, Puzzle, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Seccion as NombreSeccion } from './buscar'
import { comentarioDe, componentes } from './catalog'
import { Decisiones, useDecisiones } from './decisiones'
import { Dispositivos } from './Dispositivos'
import { paginaDeArchivo, useIndice } from './Mapa'
import { Enlace } from './navegar'
import { Sitio, idPortada } from './Sitio'

/* La página de cada componente, con la estética de primer.style: rastro,
   nombre, una frase de qué es, pestañas subrayadas (Overview para probarlo y
   ver sus ejemplos, Guidelines para entender por qué es así, Code para
   importarlo y leer su código), tarjetas de estado y el índice "On this
   page" a la derecha. Lee los archivos con `?raw`, así que siempre muestra lo
   que hay en el repo. */

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

/* Un comentario de código a Markdown: une las líneas cortadas de cada
   párrafo y deja las listas como listas. */
function comentarioAMarkdown(texto: string) {
  return texto
    .split(/\n\s*\n/)
    .map((p) => p.split('\n').reduce((acc, l) => (/^\s*[-*]\s/.test(l) ? `${acc}\n${l.trim()}` : `${acc} ${l.trim()}`), '').trim())
    .join('\n\n')
}

/* Título de sección: entra en el índice de la derecha. */
function Seccion({ titulo, nota, children, id }: { titulo?: string; nota?: ReactNode; children: ReactNode; id?: string }) {
  return (
    <section className="mt-12 first:mt-10" id={id}>
      {titulo && <h2 data-toc className="m-0 scroll-mt-24 border-b border-line pb-2 text-[24px] leading-tight font-semibold tracking-[-0.01em] text-ink">{titulo}</h2>}
      {nota && <p className="m-0 mt-3 max-w-[70ch] text-[15px] leading-relaxed text-ink-muted">{nota}</p>}
      <div className={titulo || nota ? 'mt-5' : ''}>{children}</div>
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
      const hs = [...el.querySelectorAll<HTMLElement>('h2[data-toc], .ds-ejemplos .sb-anchor > h3, .ds-informe .ds-page-h2')]
      const nuevos = hs.map((h): Item => ({ el: h, texto: h.textContent?.trim() ?? '', nivel: h.matches('.ds-ejemplos h3') ? 3 : 2 })).filter((i) => i.texto)
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
        if (it.el.getBoundingClientRect().top < 180) i = k
      })
      setActivo(i)
    }
    alMover()
    window.addEventListener('scroll', alMover, { passive: true })
    return () => window.removeEventListener('scroll', alMover)
  }, [items])
  if (items.length < 2) return null
  return (
    <nav aria-label="On this page" className="sticky top-24 hidden max-h-[calc(100vh-120px)] self-start overflow-y-auto xl:block">
      <p className="m-0 mb-3 text-[12px] font-semibold tracking-[0.06em] text-ink-muted uppercase">On this page</p>
      <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
        {items.map((it, i) => (
          <li key={`${it.texto}-${i}`}>
            <button
              type="button"
              onClick={() => it.el.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className={cn(
                'block w-full rounded-md py-1 pr-2 text-left text-[14px] leading-snug transition-colors hover:bg-surface-muted',
                it.nivel === 3 ? 'pl-5' : 'pl-2',
                i === activo ? 'font-semibold text-ink' : 'text-dash-blue',
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

/* Como las tarjetas React / Rails / Figma de Primer: qué es, en qué estado
   está y adónde ir. */
function Tarjeta({ icono: Icono, titulo, etiqueta, tono = 'gris', children }: { icono: typeof Puzzle; titulo: string; etiqueta: string; tono?: 'verde' | 'ambar' | 'gris'; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-line p-4">
      <span className="flex items-center justify-between">
        <span className="text-[15px] font-semibold text-ink">{titulo}</span>
        <Icono className="size-5 text-ink-muted" aria-hidden />
      </span>
      <span
        className={cn(
          'self-start rounded-full border px-2 py-0.5 text-[12px] font-medium',
          tono === 'verde' && 'border-dash-ok-fg/30 bg-dash-ok-bg text-dash-ok-fg',
          tono === 'ambar' && 'border-warn-fg/30 bg-warn-bg text-warn-fg',
          tono === 'gris' && 'border-line bg-surface-subtle text-ink-medium',
        )}
      >
        {etiqueta}
      </span>
      <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] [&>*+*]:before:mr-2 [&>*+*]:before:text-ink-faint [&>*+*]:before:content-['|']">{children}</span>
    </div>
  )
}

const LINK = 'cursor-pointer text-dash-blue underline decoration-dash-blue/40 underline-offset-2 hover:decoration-dash-blue'

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
  const decisiones = useDecisiones(archivosDeDecision[0] ?? null)

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
  const seccion = (partes[0] ?? '') as NombreSeccion
  const grupo = partes.length > 2 ? partes.slice(1, -1).join(' / ') : ''
  const idPagina = historia ? `${historia.id.split('--')[0]}--docs` : undefined
  /* Foundations y Audit son páginas de una sola historia que ya se explica
     sola: se muestra tal cual, sin marco de ejemplo. */
  const informe = todas.length === 1 && historia?.name !== 'Playground' && (seccion === 'Foundations' || seccion === 'Audit' || !componente)

  const descripcionDocs = (historia?.parameters?.docs as { description?: { component?: string } } | undefined)?.description?.component
  const descripcion = descripcionDocs ?? (componente ? comentarioAMarkdown(comentarioDe(componente)).replace(/^Figma[^—\-.:]*?\d+:\d+\s*[—\-.:]?\s*/i, '').replace(/^\p{Ll}/u, (c) => c.toUpperCase()) : '')
  const parrafos = descripcion.split(/\n\s*\n/)
  const [lead, resto] = !parrafos[0] || /^\s*[-*\d]/.test(parrafos[0]) ? ['', descripcion] : [parrafos[0], parrafos.slice(1).join('\n\n')]

  const tieneControles = !!historia && Object.keys(historia.argTypes ?? {}).length > 0 && !historia.parameters?.controls?.disable
  const conDispositivos = !!historia && !informe && !historia.parameters?.docs?.devices?.disable
  const pestanas: Pestana[] = ['Overview']
  if (archivosDeDecision.length || conDispositivos || usos) pestanas.push('Guidelines')
  if (fuente || stories) pestanas.push('Code')
  const [pestana, setPestana] = useState<Pestana>('Overview')
  const cuerpo = useRef<HTMLDivElement>(null)

  const irA = (p: Pestana, id: string) => {
    setPestana(p)
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
  }
  const idDeArchivo = (archivo: string) => (indice ? paginaDeArchivo(indice, archivo)?.id : undefined)
  const listo = historia?.name === 'Playground' && !!decisiones?.length

  return (
    <Sitio actual={idPagina} seccion={seccion}>
      <div className="ds-doc mx-auto grid max-w-[1240px] gap-12 px-5 pt-10 pb-24 sm:px-10 xl:grid-cols-[minmax(0,1fr)_220px]">
        <div ref={cuerpo} className="min-w-0">
          <header className="flex flex-col gap-4">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[14px]">
              <Enlace id="welcome--docs" className="text-dash-blue no-underline hover:underline">Home</Enlace>
              <span className="text-ink-muted">/</span>
              <Enlace id={idPortada(seccion)} className="text-dash-blue no-underline hover:underline">{seccion}</Enlace>
              {grupo && <><span className="text-ink-muted">/</span><span className="text-ink-muted">{grupo}</span></>}
              <span className="text-ink-muted">/</span>
              <span className="text-ink">{nombre}</span>
            </nav>
            <h1 className="m-0 text-[40px] leading-[1.15] font-semibold tracking-[-0.02em] text-ink">{nombre}</h1>
            {lead && (
              <div className="ds-prosa ds-lead max-w-[70ch]">
                <Markdown>{lead}</Markdown>
              </div>
            )}
          </header>

          {pestanas.length > 1 && (
            <nav aria-label="Page sections" className="mt-8 flex gap-6 border-b border-line">
              {pestanas.map((p) => (
                <button
                  key={p}
                  type="button"
                  aria-current={p === pestana ? 'page' : undefined}
                  onClick={() => setPestana(p)}
                  className={cn(
                    '-mb-px border-b-2 px-1 pb-2.5 text-[15px] transition-colors',
                    p === pestana ? 'border-dash-blue font-semibold text-ink' : 'border-transparent text-ink-muted hover:border-line-strong hover:text-ink',
                  )}
                >
                  {p}
                </button>
              ))}
            </nav>
          )}

          {pestana === 'Overview' && (
            <>
              {!informe && historia && (
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <Tarjeta icono={Puzzle} titulo="Component" etiqueta={listo ? 'Ready' : historia.name === 'Playground' ? 'In progress' : 'Documented'} tono={listo ? 'verde' : historia.name === 'Playground' ? 'ambar' : 'gris'}>
                    <Enlace id={historia.id} className={LINK}>Full screen</Enlace>
                    {archivoFuente && <a href={`${REPO}${archivoFuente}`} target="_blank" rel="noreferrer" className={LINK}>Source</a>}
                    {pestanas.includes('Code') && <button type="button" onClick={() => irA('Code', 'ds-codigo')} className={LINK}>Code</button>}
                  </Tarjeta>
                  <Tarjeta icono={Users} titulo="Usage" etiqueta={usos ? `Used in ${usos.length} ${usos.length === 1 ? 'file' : 'files'}` : 'Not in the app'}>
                    {usos && <button type="button" onClick={() => irA('Guidelines', 'ds-usos')} className={LINK}>Where</button>}
                    {conDispositivos && <button type="button" onClick={() => irA('Guidelines', 'ds-dispositivos')} className={LINK}>Devices</button>}
                    {todas.length > 1 && <button type="button" onClick={() => document.getElementById('ds-ejemplos')?.scrollIntoView({ behavior: 'smooth' })} className={LINK}>Examples</button>}
                  </Tarjeta>
                  <Tarjeta icono={Lightbulb} titulo="Design" etiqueta={decisiones?.length ? `${decisiones.length} ${decisiones.length === 1 ? 'decision' : 'decisions'}` : 'No decisions yet'} tono={decisiones?.length ? 'gris' : 'ambar'}>
                    {!!decisiones?.length && <button type="button" onClick={() => irA('Guidelines', 'ds-decisiones')} className={LINK}>Why it looks like this</button>}
                  </Tarjeta>
                </div>
              )}
              {resto && (
                <div className="ds-prosa mt-8 max-w-[72ch]">
                  <Markdown>{resto}</Markdown>
                </div>
              )}
              {informe ? (
                <Seccion>
                  <div className="ds-informe"><Story /></div>
                </Seccion>
              ) : (
                historia && (
                  <Seccion
                    titulo={historia.name === 'Playground' ? 'Playground' : historia.name}
                    nota={tieneControles ? 'Cambiá sus propiedades en la tabla de abajo: el componente cambia en vivo. Show code da el código de lo que armaste.' : undefined}
                  >
                    <Primary />
                    {tieneControles && <div className="mt-4"><Controls /></div>}
                  </Seccion>
                )
              )}
              {todas.length > 1 && (
                <Seccion id="ds-ejemplos" titulo="Examples" nota="Cada variante y estado, funcionando. Show code muestra cómo se arma.">
                  <div className="ds-ejemplos ds-prosa">
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
                          <p className="m-0 font-mono text-[12.5px] text-ink-muted">{a}</p>
                          <Decisiones archivo={a} />
                        </div>
                      ))}
                    </div>
                  )}
                </Seccion>
              )}
              {conDispositivos && historia && (
                <Seccion id="ds-dispositivos" titulo="On each device" nota="La historia principal en el ancho real de un celular, una tablet y una computadora. Se puede usar adentro.">
                  <Dispositivos storyId={historia.id} alto={historia.parameters?.docs?.devices?.height} />
                </Seccion>
              )}
              {usos && (
                <Seccion id="ds-usos" titulo="Where it is used" nota={usos.length ? `${usos.length} ${usos.length === 1 ? 'archivo de la app lo usa' : 'archivos de la app lo usan'}, leído del código.` : 'Ninguna pantalla lo usa todavía: sólo está documentado acá.'}>
                  {usos.length > 0 && (
                    <ul className="m-0 grid list-none gap-2 p-0 sm:grid-cols-2">
                      {usos.map((u) => {
                        const id = u.startsWith('components/') ? idDeArchivo(u) : undefined
                        return (
                          <li key={u} className="flex items-center justify-between gap-3 rounded-lg border border-line px-3 py-2">
                            <code className="truncate text-[12.5px] text-ink">{u}</code>
                            {id && <Enlace id={id} className="shrink-0 text-[13px] text-dash-blue no-underline hover:underline">Open</Enlace>}
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
            <div id="ds-codigo">
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
                <Seccion titulo="Source" nota={<a href={`${REPO}${archivoFuente}`} target="_blank" rel="noreferrer" className={LINK}>{archivoFuente}</a>}>
                  <Source code={fuente} language="tsx" />
                </Seccion>
              )}
              {stories && archivoStories && (
                <Seccion titulo="Stories source" nota={<code className="text-[13px]">{archivoStories}</code>}>
                  <Source code={stories} language="tsx" />
                </Seccion>
              )}
            </div>
          )}
        </div>
        <EnEstaPagina raiz={cuerpo} clave={pestana} />
      </div>
    </Sitio>
  )
}
