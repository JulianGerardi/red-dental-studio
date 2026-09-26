import { useMemo, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { componentes } from './catalog'
import { Codigo, Page } from './Page'
import { IrA, paginaDeArchivo, useIndice } from './Mapa'

const meta = {
  title: 'Components/Catalog',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen', options: { showPanel: false } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function Catalogo() {
  const entradas = useIndice()
  const [q, setQ] = useState('')
  const [soloSinStory, setSoloSinStory] = useState(false)
  const visibles = useMemo(
    () =>
      componentes.filter(
        (c) =>
          (!soloSinStory || (!c.tieneStory && !c.exento)) &&
          `${c.archivo} ${c.exports.join(' ')} ${c.comentario}`.toLowerCase().includes(q.trim().toLowerCase()),
      ),
    [q, soloSinStory],
  )
  const conStory = componentes.filter((c) => c.tieneStory || c.exento).length
  const carpetas = [...new Set(visibles.map((c) => c.carpeta))]

  return (
    <Page
      titulo="Component catalog"
      bajada={`Todos los archivos de src/components, leídos del código: qué exportan, dónde se usan y la nota de diseño que cada uno trae en su encabezado. ${conStory} de ${componentes.length} tienen story; “Open →” lleva a su página.`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name, export or design note…"
          className="focus:border-dash-blue h-9 w-[340px] max-w-full rounded-md border border-line px-3 text-[13px] outline-none"
        />
        <label className="flex items-center gap-2 text-[13px] text-ink-medium">
          <input type="checkbox" checked={soloSinStory} onChange={(e) => setSoloSinStory(e.target.checked)} />
          Only without a story
        </label>
        <span className="text-[12px] text-ink-muted">{visibles.length} shown</span>
      </div>

      {carpetas.map((carpeta) => (
        <section key={carpeta}>
          <h2 className="mb-3 text-[13px] font-semibold tracking-wide text-ink-muted uppercase">{carpeta}</h2>
          <div className="overflow-hidden rounded-lg border border-line">
            {visibles.filter((c) => c.carpeta === carpeta).map((c) => (
              <details key={c.archivo} className="border-t border-line-soft first:border-t-0">
                <summary className="flex cursor-pointer flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2.5 text-[13px] hover:bg-surface-subtle">
                  <span className="font-semibold">{c.nombre}</span>
                  <span className="min-w-0 flex-1 truncate text-ink-muted">{c.exports.join(', ') || '-'}</span>
                  <span className="text-[11.5px] text-ink-muted">used in {c.usadoEn}</span>
                  {c.usadoEn === 0 && <span className="rounded-full bg-warn-bg px-2 py-0.5 text-[11px] font-semibold text-warn-fg">unused</span>}
                  {(() => {
                    const destino = entradas && paginaDeArchivo(entradas, c.archivo)
                    return destino ? (
                      <span onClick={(e) => e.stopPropagation()}>
                        <IrA entrada={destino} className="text-dash-blue text-[12px] font-semibold hover:underline">Open →</IrA>
                      </span>
                    ) : null
                  })()}
                  <span className={c.tieneStory || c.exento ? 'rounded-full bg-dash-ok-bg px-2 py-0.5 text-[11px] font-semibold text-dash-ok-fg' : 'rounded-full bg-warn-bg px-2 py-0.5 text-[11px] font-semibold text-warn-fg'}>
                    {c.tieneStory ? 'story' : c.exento ? 'in host story' : 'no story'}
                  </span>
                </summary>
                <div className="border-t border-line-soft bg-surface-subtle px-4 py-3 text-[12.5px] text-ink-soft">
                  <p className="mb-2"><Codigo>src/{c.archivo}</Codigo></p>
                  {c.exento && <p className="mb-2 text-ink-medium">{c.exento}</p>}
                  {c.comentario ? <p className="max-w-[80ch] whitespace-pre-wrap">{c.comentario}</p> : <p className="text-ink-faint">Sin nota de diseño en el encabezado del archivo.</p>}
                </div>
              </details>
            ))}
          </div>
        </section>
      ))}
    </Page>
  )
}

export const Catalog: Story = { name: 'Catalog', render: () => <Catalogo /> }
