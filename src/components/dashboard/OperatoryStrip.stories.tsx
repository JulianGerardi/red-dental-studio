import { useLayoutEffect, useRef, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { OperatoryStrip, OPERATORY_MIN } from './OperatoryStrip'
import type { Operatory, OperatoryStatus } from './OperatoryCard'
import { Bloque, Forzar, Lienzo, Muestra, Tabla, TablaPartes } from '@/design-system/kit'

/* Salas de ejemplo: los estados del día de la demo, repetidos para tener volumen. */
const ESTADOS: OperatoryStatus[] = ['Available', 'Busy', 'Busy', 'Busy', 'Unavailable', 'Busy']
const salas = (n: number): Operatory[] =>
  Array.from({ length: n }, (_, i) => ({ name: `Operatory ${i + 1}`, status: ESTADOS[i % ESTADOS.length]!, patientsToday: 12, provider: 'Daniel Anderson' }))

/* Cuántas entran en una fila, con la misma cuenta que OperatoryStrip (gap de 16px). */
const entran = (ancho: number) => Math.max(1, Math.floor((ancho + 16) / (OPERATORY_MIN + 16)))

type Args = { rooms: number; width: number }

const meta = {
  title: 'Components/Dashboard/Operatory strip',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Las salas del Dashboard en **una tira arriba de los turnos** (`@/components/dashboard/OperatoryStrip`, Julián, 2026-10-13): antes ocupaban una columna entera al lado de Appointments y Waiting Room; arriba no le roban ancho a los turnos.',
          '',
          '**Cómo se comporta:** una fila de *OperatoryCard* sobre la página que **llena el ancho**. Cuántas entran sale del ancho (cada card mide al menos 232px, lo justo para el nombre con la pill más larga); las que no entran van a **"Show N more"**, la regla de listas largas (*Elements / Show more*). Con menos salas que lugares, las que hay se reparten el ancho. Sin salas no se dibuja.',
          '',
          '**Cada sala con el color de su estado** y, al tocarla, **filtra la sala de espera** del Dashboard por esa sala: la elegida lleva el anillo azul, las demás se apagan, y la sala de espera muestra el filtro como chip junto a su título (Julián, 2026-10-17). Tocarla de nuevo, o la ✕ del chip, la suelta.',
          '',
          '**Probalo:** en *Playground* cambiá la cantidad de salas y el ancho desde *Controls*; tocá una sala para elegirla y "Show N more".',
        ].join('\n'),
      },
    },
  },
  args: { rooms: 6, width: 1352 },
  argTypes: {
    rooms: { control: { type: 'range', min: 0, max: 14 }, description: 'Cuántas salas tiene la clínica.' },
    width: { control: { type: 'range', min: 340, max: 1800, step: 10 }, description: 'Ancho de la tira. 1352 es el del Dashboard a 1440px.' },
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<Args>
const sinControles = { controls: { disable: true } }

/* La tira a su ancho real, sobre el fondo de la página. Si no entra en la columna de docs, se achica entera (con
   transform, que no cambia el ancho que mide la tira): así se ve cuántas entran a 1440 aunque la columna sea angosta. */
function Pagina({ ancho, children }: { ancho: number; children: React.ReactNode }) {
  const caja = useRef<HTMLDivElement>(null)
  const dentro = useRef<HTMLDivElement>(null)
  const [vista, setVista] = useState({ escala: 1, alto: 0 })
  const total = ancho + 32
  useLayoutEffect(() => {
    const medir = () => {
      const escala = Math.min(1, (caja.current?.clientWidth ?? total) / total)
      setVista({ escala, alto: (dentro.current?.offsetHeight ?? 0) * escala })
    }
    medir()
    const ro = new ResizeObserver(medir)
    if (caja.current) ro.observe(caja.current)
    if (dentro.current) ro.observe(dentro.current)
    return () => ro.disconnect()
  }, [total])
  return (
    <div ref={caja} className="w-full overflow-hidden" style={{ height: vista.alto || undefined }}>
      <div ref={dentro} className="rounded-lg bg-page-background p-4" style={{ width: total, transform: `scale(${vista.escala})`, transformOrigin: 'top left' }}>
        {children}
      </div>
    </div>
  )
}

/* Con la sala elegida en estado, como en el Dashboard. */
function Elegible({ rooms, inicial = null }: { rooms: Operatory[]; inicial?: string | null }) {
  const [elegida, setElegida] = useState<string | null>(inicial)
  return <OperatoryStrip rooms={rooms} elegida={elegida} onElegir={setElegida} />
}

export const Playground: Story = {
  render: (a) => <Pagina ancho={a.width}><Elegible key={a.rooms} rooms={salas(a.rooms)} /></Pagina>,
}

export const Parts: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo className="max-w-[1400px]">
      <Bloque nota="A 1440px (tira de 1352px, acá a escala) entran cinco: la sexta queda en Show 1 more.">
        <Pagina ancho={1352}><OperatoryStrip rooms={salas(6)} /></Pagina>
      </Bloque>
      <TablaPartes partes={[
        ['Row', 'Una fila que llena el ancho: tantas columnas como entran de 232px, nunca más que las salas.', 'OperatoryStrip'],
        ['Selection', 'Tocar una sala la elige (filtra la sala de espera del Dashboard) y tocarla de nuevo la suelta; la elegida lleva el anillo y las demás se apagan.', 'elegida · onElegir'],
        ['Card', 'La sala, como card de página (sombra, sin borde).', 'OperatoryCard enPagina'],
        ['Show N more', 'Las que no entran; abre el resto en filas, con scroll si hace falta.', 'ShowMore'],
      ]} />
    </Lienzo>
  ),
}

export const States: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo className="max-w-[1400px]">
      <Muestra titulo="All fit" nota="Cuatro salas a 1352px: se reparten el ancho, sin hueco a la derecha y sin botón.">
        <Pagina ancho={1352}><OperatoryStrip rooms={salas(4)} /></Pagina>
      </Muestra>
      <Muestra titulo="More than fit" nota="Doce salas: una fila y Show N more.">
        <Pagina ancho={1352}><OperatoryStrip rooms={salas(12)} /></Pagina>
      </Muestra>
      <Muestra titulo="One selected" nota="Operatory 2 filtra la sala de espera: anillo azul; las demás al 60% hasta el hover.">
        <Pagina ancho={1352}><Elegible rooms={salas(6)} inicial="Operatory 2" /></Pagina>
      </Muestra>
      <Muestra titulo="Open" nota="Todas, en filas; con muchas, scroll adentro.">
        <Forzar selector="[data-show-more]" estado="click">
          <Pagina ancho={1352}><OperatoryStrip rooms={salas(12)} /></Pagina>
        </Forzar>
      </Muestra>
      <Muestra titulo="Tablet (662px)" nota="Dos por fila.">
        <Pagina ancho={662}><OperatoryStrip rooms={salas(6)} /></Pagina>
      </Muestra>
      <div className="grid gap-6 md:grid-cols-2">
        <Muestra titulo="Phone (358px)" nota="Una sola y el resto en Show N more: los turnos quedan cerca.">
          <Pagina ancho={358}><OperatoryStrip rooms={salas(6)} /></Pagina>
        </Muestra>
      </div>
      <Muestra titulo="Empty" nota="Sin salas no se dibuja nada.">
        <Pagina ancho={600}><OperatoryStrip rooms={[]} /><p className="text-[12px] text-ink-muted">(nothing drawn)</p></Pagina>
      </Muestra>
    </Lienzo>
  ),
}

export const Specs: Story = {
  parameters: sinControles,
  render: () => (
    <Lienzo>
      <Bloque titulo="Behavior" nota="De OperatoryStrip.tsx.">
        <Tabla encabezado={['Part', 'Value']} minimo={480}>
          <tr><td className="font-semibold">Card min width</td><td className="tabular-nums">{OPERATORY_MIN}px</td></tr>
          <tr><td className="font-semibold">Gap</td><td className="tabular-nums">16px, the same as between panels</td></tr>
          <tr><td className="font-semibold">Columns</td><td className="font-mono text-[12px]">min(floor((width + 16) / {OPERATORY_MIN + 16}), rooms)</td></tr>
          <tr><td className="font-semibold">Fade when open</td><td>from page-background</td></tr>
        </Tabla>
      </Bloque>
      <Bloque titulo="Per screen" nota="Cuántas salas se ven en una fila en el Dashboard, con la barra lateral cerrada.">
        <Tabla encabezado={['Screen', 'Strip width', 'Rooms in a row']} minimo={480}>
          {[[1920, 1752], [1440, 1352], [1280, 1174], [1024, 918], [768, 662], [390, 358]].map(([pantalla, ancho]) => (
            <tr key={pantalla}><td className="tabular-nums">{pantalla}px</td><td className="tabular-nums">{ancho}px</td><td className="tabular-nums">{entran(ancho!)}</td></tr>
          ))}
        </Tabla>
      </Bloque>
    </Lienzo>
  ),
}
