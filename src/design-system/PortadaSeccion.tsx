import { ChevronRight } from 'lucide-react'
import { QUE_SECCION, type Pagina, type Seccion } from './buscar'
import { Enlace } from './navegar'
import { PIEZAS, TarjetaPieza } from './piezas'
import { Sitio, idPortada, useIndiceSitio } from './Sitio'
import { MemoryRouter } from 'react-router-dom'

/* La portada de cada sección, como el índice de componentes de Primer: el
   nombre, qué hay y una tarjeta por página. Las piezas que tienen muestra
   (Elements, Foundations y algunas de UI) se ven funcionando; el resto
   muestra su descripción. Todo sale del índice: una página nueva aparece
   sola. */

function TarjetaTexto({ pagina, detalle }: { pagina: Pagina; detalle?: string }) {
  return (
    <Enlace id={pagina.id} className="group flex min-w-0 flex-col rounded-xl border border-line bg-white p-5 no-underline transition-colors hover:border-ink-faint">
      <span className="text-[18px] leading-tight font-semibold text-ink">{pagina.titulo}</span>
      {detalle && <span className="mt-1 text-[12px] text-ink-muted">{detalle}</span>}
      <span className="mt-2 line-clamp-3 flex-1 text-[14px] leading-relaxed text-ink-muted">{pagina.descripcion || 'Sin descripción todavía.'}</span>
      <span className="mt-4 inline-flex items-center gap-0.5 text-[14px] font-medium text-dash-blue">
        Learn more <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Enlace>
  )
}

export function PortadaSeccion({ seccion }: { seccion: Seccion }) {
  const indice = useIndiceSitio()
  const paginas = indice?.filter((p) => p.seccion === seccion && p.id !== idPortada(seccion)) ?? []
  const grupos = new Map<string, Pagina[]>()
  for (const p of paginas) grupos.set(p.grupo, [...(grupos.get(p.grupo) ?? []), p])
  const piezaDe = (p: Pagina) => PIEZAS.find((x) => x.titulo === p.titulo && x.seccion === p.seccion)

  return (
    <Sitio actual={idPortada(seccion)} seccion={seccion}>
      <div className="mx-auto flex max-w-[1080px] flex-col gap-12 px-5 pt-10 pb-24 sm:px-10">
        <header className="flex flex-col gap-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[14px]">
            <Enlace id="welcome--docs" className="text-dash-blue no-underline hover:underline">Home</Enlace>
            <span className="text-ink-muted">/</span>
            <span className="text-ink">{seccion}</span>
          </nav>
          <h1 className="m-0 text-[40px] leading-[1.15] font-semibold tracking-[-0.02em] text-ink">{seccion}</h1>
          <p className="m-0 max-w-[70ch] text-[18px] leading-relaxed text-ink-muted">{QUE_SECCION[seccion]}</p>
        </header>

        {!indice ? (
          <p className="m-0 text-[14px] text-ink-muted">Cargando…</p>
        ) : (
          <MemoryRouter>
            {[...grupos].map(([grupo, lista]) => (
              <section key={grupo || '-'} className="flex flex-col gap-5">
                {grupo && (
                  <h2 className="m-0 flex items-baseline gap-2 border-b border-line pb-3 text-[24px] font-semibold text-ink">
                    {grupo} <span className="text-[14px] font-normal text-ink-muted">{lista.length}</span>
                  </h2>
                )}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {lista.map((p) => {
                    const pieza = piezaDe(p)
                    if (pieza) return <TarjetaPieza key={p.id} pieza={{ ...pieza, ancho: undefined }} id={p.id} />
                    return <TarjetaTexto key={p.id} pagina={p} detalle={grupo === 'Screens' ? 'Pantalla completa' : undefined} />
                  })}
                </div>
              </section>
            ))}
          </MemoryRouter>
        )}
      </div>
    </Sitio>
  )
}
