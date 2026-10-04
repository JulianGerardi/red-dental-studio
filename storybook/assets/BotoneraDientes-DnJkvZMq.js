import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight, Baby, Eraser, PanelBottom, PanelTop, UserRound, type LucideIcon } from 'lucide-react'
import { applyPrimaryDentition, clearSelection, resetMouth } from 'react-advanced-odontogram'
import { ModalShell } from '@/components/patients/form'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

/* La botonera de la app real (red.dev, Dental assessment): dentición, arcadas, cuadrantes, limpiar y moverse de pieza en
   pieza. Maneja la selección de la librería del odontograma: sus botones de selección (por id) para todas y las arcadas, y
   clic con CMD/CTRL sobre cada pieza para los cuadrantes. La librería numera en FDI; la pantalla, en Universal (1-32).

   Cada grupo es un control segmentado (botones unidos, con un solo borde): se lee de un vistazo qué va con qué y ocupa
   poco, para compartir la fila con Odontogram / Periodontal Status. Lo elegido queda en azul hasta que la selección cambia
   desde el chart. Ver design-reference/figma/modulos/clinical-mode.md. */

/* Las piezas en orden Universal, 1 a 32, con su número FDI. */
const UNIVERSAL_A_FDI = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28, 38, 37, 36, 35, 34, 33, 32, 31, 41, 42, 43, 44, 45, 46, 47, 48]
const CUADRANTES = [1, 2, 3, 4].map((q) => UNIVERSAL_A_FDI.slice((q - 1) * 8, q * 8))

const GRUPO = 'inline-flex shrink-0 items-stretch divide-x divide-line overflow-hidden rounded-md border border-line bg-white shadow-[0_1px_2px_0_rgb(0_0_0/0.05)]'
const SEGMENTO = 'flex h-8 items-center gap-1.5 px-2.5 text-[12.5px] font-medium text-ink-medium transition-colors hover:bg-surface-subtle hover:text-ink focus-visible:relative focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-dash-blue'
const ELEGIDO = 'bg-dash-blue text-white hover:bg-dash-blue-hover hover:text-white'

type Grupo = 'all' | 'upper' | 'lower' | \`q\${number}\` | null

export function BotoneraDientes({ raiz }: { raiz: HTMLElement | null }) {
  const [denticion, setDenticion] = useState<'permanent' | 'primary'>('permanent')
  const [grupo, setGrupo] = useState<Grupo>(null)
  const [confirmando, setConfirmando] = useState(false)
  /* Mientras la botonera hace sus propios clics sobre las piezas, no cuentan como "la cambiaron desde el chart". */
  const propio = useRef(false)

  const embed = () => raiz?.querySelector<HTMLElement>('.odonto-embed') ?? null

  /* Un clic sobre una pieza del chart cambia la selección: lo elegido en la botonera deja de estar marcado. */
  useEffect(() => {
    const el = raiz?.querySelector<HTMLElement>('.odonto-embed')
    if (!el) return
    const alTocar = (e: MouseEvent) => {
      if (!propio.current && (e.target as Element | null)?.closest('.tooth-tile')) setGrupo(null)
    }
    el.addEventListener('click', alTocar, true)
    return () => el.removeEventListener('click', alTocar, true)
  }, [raiz])

  const pulsarDeLaLibreria = (id: string) => {
    clearSelection()
    embed()?.querySelector<HTMLButtonElement>(\`#\${id}\`)?.click()
  }
  const elegir = (fdis: number[]) => {
    clearSelection()
    propio.current = true
    fdis.forEach((n, i) => embed()?.querySelector<HTMLElement>(\`.tooth-tile[data-tooth="\${n}"]\`)?.dispatchEvent(new MouseEvent('click', { bubbles: true, metaKey: i > 0, ctrlKey: i > 0 })))
    propio.current = false
  }
  /* Con una pieza elegida, la anterior o la siguiente en orden Universal; sin ninguna, arranca en la 1. */
  const mover = (delta: 1 | -1) => {
    const elegidas = [...new Set([...(embed()?.querySelectorAll<HTMLElement>('.tooth-tile[aria-selected="true"]') ?? [])].map((t) => Number(t.dataset.tooth)))]
    const i = elegidas.length ? UNIVERSAL_A_FDI.indexOf(delta > 0 ? elegidas[elegidas.length - 1]! : elegidas[0]!) : -1
    const siguiente = i < 0 ? 0 : Math.min(Math.max(i + delta, 0), UNIVERSAL_A_FDI.length - 1)
    elegir([UNIVERSAL_A_FDI[siguiente]!])
    setGrupo(null)
  }

  /* Un segmento: con ícono y texto, o sólo el ícono con su tooltip. Con poco ancho, \`angosto\` esconde el texto y
     \`iconoAncho\` el ícono. \`max-[1400px]:hidden\` y no \`hidden …:inline\`: la librería del odontograma pisa \`.hidden\`. */
  const segmento = (label: string, onClick: () => void, o: { icono?: LucideIcon; texto?: string; on?: boolean; soloIcono?: boolean; angosto?: boolean; iconoAncho?: boolean } = {}) => {
    const Icono = o.icono
    const boton = (
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        aria-pressed={o.on}
        className={cn(SEGMENTO, (o.soloIcono || o.angosto) && 'px-2', o.angosto && 'min-[1400px]:px-2.5', o.on && ELEGIDO)}
      >
        {Icono && <Icono className={cn('size-3.5 shrink-0', o.iconoAncho && 'max-[1400px]:hidden')} />}
        {!o.soloIcono && <span className={o.angosto ? 'max-[1400px]:hidden' : undefined}>{o.texto ?? label}</span>}
      </button>
    )
    if (!o.soloIcono && !o.angosto) return <span key={label} className="flex">{boton}</span>
    return (
      <Tooltip key={label}>
        <TooltipTrigger asChild>{boton}</TooltipTrigger>
        <TooltipContent side="top" sideOffset={4} className={cn('bg-ink text-white', o.angosto && 'min-[1400px]:hidden')}>{label}</TooltipContent>
      </Tooltip>
    )
  }
  const grupoDe = (label: string, hijos: ReactNode) => <span role="group" aria-label={label} className={GRUPO}>{hijos}</span>

  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-2" role="toolbar" aria-label="Tooth selection">
        {grupoDe('Dentition', <>
          {segmento('Permanent', () => denticion === 'primary' && setConfirmando(true), { icono: UserRound, on: denticion === 'permanent', angosto: true })}
          {segmento('Primary', () => { if (denticion !== 'primary') { applyPrimaryDentition(); setDenticion('primary'); setGrupo(null) } }, { icono: Baby, on: denticion === 'primary', angosto: true })}
        </>)}
        {grupoDe('Arches', <>
          {segmento('All teeth', () => { pulsarDeLaLibreria('btnSelectAll'); setGrupo('all') }, { texto: 'All', on: grupo === 'all' })}
          {segmento('Upper arch', () => { pulsarDeLaLibreria('btnSelectUpper'); setGrupo('upper') }, { icono: PanelTop, texto: 'Upper', on: grupo === 'upper', iconoAncho: true })}
          {segmento('Lower arch', () => { pulsarDeLaLibreria('btnSelectLower'); setGrupo('lower') }, { icono: PanelBottom, texto: 'Lower', on: grupo === 'lower', iconoAncho: true })}
        </>)}
        {grupoDe('Quadrants', CUADRANTES.map((fdis, i) => segmento(\`Q\${i + 1}\`, () => { elegir(fdis); setGrupo(\`q\${i + 1}\`) }, { on: grupo === \`q\${i + 1}\` })))}
        {grupoDe('Move', <>
          {segmento('Previous tooth', () => mover(-1), { icono: ArrowLeft, soloIcono: true })}
          {segmento('Next tooth', () => mover(1), { icono: ArrowRight, soloIcono: true })}
        </>)}
        {grupoDe('Clear', segmento('Clear selection', () => { clearSelection(); setGrupo(null) }, { icono: Eraser, soloIcono: true }))}

        {/* La librería no tiene "volver a permanente": vuelve con su reinicio, que también borra lo marcado. Se avisa. */}
        {confirmando && (
          <ModalShell
            title="Back to permanent dentition?"
            onClose={() => setConfirmando(false)}
            width="max-w-[420px]"
            footer={
              <>
                <button type="button" onClick={() => setConfirmando(false)} className="h-9 rounded-md border border-line bg-white px-5 text-[13px] font-medium hover:bg-surface-subtle">Cancel</button>
                <button type="button" onClick={() => { resetMouth(); setDenticion('permanent'); setGrupo(null); setConfirmando(false) }} className="bg-dash-blue hover:bg-dash-blue-hover h-9 rounded-md px-5 text-[13px] font-medium text-white">Switch to permanent</button>
              </>
            }
          >
            <p className="text-[13px] leading-relaxed text-ink-soft">The chart goes back to the permanent teeth. What was marked on the primary teeth is cleared.</p>
          </ModalShell>
        )}
      </div>
    </TooltipProvider>
  )
}
`})))()}export{n,i as r,r as t};