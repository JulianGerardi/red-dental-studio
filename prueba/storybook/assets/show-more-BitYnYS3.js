import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

/* Una lista larga dentro de una card: se ven los primeros \`limit\` y "Show N more" abre el resto adentro de un scroll, sin
   estirar la página; "Show less" vuelve. Es la regla de toda la app para muchas cards o mucha información (Julián,
   2026-10-12). Ver design-reference/figma/modulos/dashboard.md. */

export const SHOW_MORE_ALTO = 'min(70vh, 640px)'

export function ShowMore({
  total, limit, maxHeight = SHOW_MORE_ALTO, enCaja, llenarAlto, filas, cargarAlScroll, label = 'items', fade = 'from-white', className, children,
}: {
  /** Cuántos ítems hay en total. */
  total: number
  /** Cuántos se ven cerrado. Con \`llenarAlto\`, es sólo el valor inicial hasta medir: ver \`llenarAlto\`. */
  limit: number
  /** Alto máximo de la lista abierta; más allá, scroll. Nunca queda más baja que la lista cerrada. */
  maxHeight?: string
  /** Abierta mide lo mismo que cerrada y scrollea adentro: el panel no crece (barras junto a una tabla, Patients y
      Billing). */
  enCaja?: boolean
  /** Sólo tiene sentido junto con \`enCaja\`, y sólo en el panel que de verdad tiene \`flex-1\` en una columna ya
      estirada a la altura de la tabla (el último, Recent Patients de Patients y Find Patient de Billing): mide
      cuántas filas enteras entran en ese alto (ResizeObserver + el alto de la primera fila ya dibujada) en vez de
      adivinar un número fijo -eso se corría cada vez que cambiaba el contenido de al lado (Julián, 2026-10-19, ver
      design-reference/figma/modulos/patients.md). Los demás \`enCaja\` sin esto (Today Appointments, un panel
      \`shrink-0\` sin alto propio del que tirar) siguen con \`limit\` fijo como siempre: con \`llenarAlto\` ahí, al no
      haber alto que medir, el panel se termina achicando a nada.
      \`children\` tiene que devolver las filas sueltas (un array de elementos), no una lista envuelta en un \`<ul>\` o
      cualquier otro contenedor único: se mide el primer HIJO del div de contenido como si fuera una fila, y si en
      cambio es un \`<ul>\` que las agrupa a todas, mide el alto de la lista entera y el cálculo sale mal. */
  llenarAlto?: boolean
  /** Con \`llenarAlto\` y filas dentro de grupos (PendingTaskList: rótulo + caja por tipo): selector de la fila ("li"). Se mide su alto y lo que
      suman los rótulos y espacios de alrededor, en vez de tomar el primer hijo como si fuera una fila. */
  filas?: string
  /** Sin botón "Show more": la caja (sólo tiene sentido con \`enCaja\` + \`llenarAlto\`, que le dan su alto propio) arranca
      ya scrolleable y, al acercarse al final, suma otra tanda de \`limiteEfectivo\` ítems, hasta mostrarlos todos
      (Pending Task del Patient Dashboard, Julián 2026-10-28, sobre el video de referencia). */
  cargarAlScroll?: boolean
  /** Nombre de lo que se lista, para el lector de pantalla ("appointments"). */
  label?: string
  /** Color del fondo de abajo, para el degradé que avisa que hay más: el de la card (blanco) o el de la página. */
  fade?: string
  /** Clases de la lista: grilla, columna con gap… */
  className?: string
  /** Dibuja los primeros \`cuantos\` ítems. */
  children: (cuantos: number) => ReactNode
}) {
  const [abierto, setAbierto] = useState(false)
  const [altoCerrado, setAltoCerrado] = useState(0)
  const [alFinal, setAlFinal] = useState(false)
  /* Sólo con \`cargarAlScroll\`: cuántos ítems sumó el scroll hasta ahora. null = todavía la primera tanda. */
  const [visiblesScroll, setVisiblesScroll] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const contenidoRef = useRef<HTMLDivElement>(null)
  /* null hasta la primera medición: mientras tanto se usa \`limit\` para no empezar sin nada dibujado. */
  const [limiteMedido, setLimiteMedido] = useState<number | null>(null)
  const limiteEfectivo = llenarAlto ? (limiteMedido ?? limit) : limit
  const sobran = total - limiteEfectivo
  const conTope = sobran > 0
  const scroll = cargarAlScroll ? conTope : conTope && abierto
  /* Arranca con dos tandas: con una sola, si entra justa en la caja no asoma nada para scrollear y no hay cómo
     enterarse de que sigue (sin botón que lo diga). */
  const mostrando = cargarAlScroll ? Math.min(visiblesScroll ?? limiteEfectivo * 2, total) : conTope && !abierto ? limiteEfectivo : total

  /* Cambió el filtro (otro total): la próxima tanda vuelve a arrancar en \`limiteEfectivo\`. */
  useLayoutEffect(() => {
    if (cargarAlScroll) setVisiblesScroll(null)
  }, [cargarAlScroll, total])

  /* Cuántas filas enteras entran en el alto que da el flex-1 del panel: se mide la primera fila ya dibujada (todas
     miden lo mismo) y el alto disponible de la caja, y se recalcula solo cuando ese alto cambia (el vecino crece o
     se achica, se filtra la búsqueda, cambia el ancho de ventana). */
  useLayoutEffect(() => {
    if (!llenarAlto) return
    const caja = ref.current
    const contenido = contenidoRef.current
    if (!caja || !contenido) return
    const medir = () => {
      if (filas) {
        const dibujadas = [...contenido.querySelectorAll<HTMLElement>(filas)]
        if (!dibujadas.length) return
        /* La más alta de las dibujadas: si unas filas envuelven a más renglones que otras, ninguna queda cortada. */
        const altoFila = Math.max(...dibujadas.map((f) => f.offsetHeight))
        if (!altoFila) return
        const estilo = getComputedStyle(caja)
        const aire = (parseFloat(estilo.paddingTop) || 0) + (parseFloat(estilo.paddingBottom) || 0)
        const alrededor = contenido.offsetHeight - dibujadas.reduce((a, f) => a + f.offsetHeight, 0)
        const cuantas = Math.max(1, Math.floor((caja.clientHeight - aire - alrededor) / altoFila))
        setLimiteMedido((previo) => (previo === cuantas ? previo : cuantas))
        return
      }
      const fila = contenido.children[0] as HTMLElement | undefined
      const altoFila = fila?.offsetHeight
      if (!altoFila) return
      const gap = parseFloat(getComputedStyle(contenido).rowGap || '0') || 0
      const cuantas = Math.max(1, Math.floor((caja.clientHeight + gap) / (altoFila + gap)))
      setLimiteMedido((previo) => (previo === cuantas ? previo : cuantas))
    }
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(caja)
    return () => ro.disconnect()
  }, [llenarAlto, filas, total])

  /* Si todo entra sin scroll (pocas de más), no hay nada abajo que avisar: el degradé no va. */
  useLayoutEffect(() => {
    const el = ref.current
    if (scroll && el) setAlFinal(el.scrollTop + el.clientHeight >= el.scrollHeight - 4)
  }, [scroll, total])

  const alternar = () => {
    if (!abierto) setAltoCerrado(ref.current?.offsetHeight ?? 0)
    setAlFinal(false)
    setAbierto((v) => !v)
  }

  /* A ~120px del final suma otra tanda, para que lleguen antes de que el usuario vea el borde de la lista. */
  const alScrollear = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    setAlFinal(el.scrollTop + el.clientHeight >= el.scrollHeight - 4)
    if (cargarAlScroll && mostrando < total && el.scrollTop + el.clientHeight >= el.scrollHeight - 120) {
      setVisiblesScroll(Math.min(mostrando + limiteEfectivo, total))
    }
  }

  return (
    <div className={cn('flex flex-col gap-2', llenarAlto && 'min-h-0 flex-1')}>
      {/* -m-1 p-1: aire para que el scroll no corte la sombra de las cards. */}
      <div
        ref={ref}
        role={scroll ? 'region' : undefined}
        aria-label={scroll ? \`All \${label}\` : undefined}
        tabIndex={scroll ? 0 : undefined}
        onScroll={scroll ? alScrollear : undefined}
        className={cn(
          '-m-1 p-1',
          scroll && 'overflow-y-auto overscroll-contain rounded-lg focus-visible:outline-2 focus-visible:outline-dash-blue',
          llenarAlto && 'min-h-0 flex-1',
          /* Redondeo de la cuenta de filas: si una mide una fracción de más, que se recorte en vez de asomar por la
             esquina de la card. */
          llenarAlto && !scroll && 'overflow-hidden',
        )}
        /* cargarAlScroll vive siempre junto a enCaja + llenarAlto (ver su doc): el alto ya lo da el flex-1 de afuera,
           sin necesitar el alto cerrado que acá nunca se llega a medir (no hay click que lo dispare). */
        style={scroll && !cargarAlScroll ? { maxHeight: enCaja ? \`\${altoCerrado}px\` : \`max(\${altoCerrado}px, \${maxHeight})\` } : undefined}
      >
        <div ref={contenidoRef} className={className}>{children(mostrando)}</div>
        {/* En Mac la barra de scroll no se ve hasta que se scrollea: el degradé avisa que hay más abajo. */}
        {scroll && (
          <div aria-hidden className={cn('pointer-events-none sticky -bottom-1 -mt-8 h-8 bg-gradient-to-t to-transparent transition-opacity', fade, alFinal && 'opacity-0')} />
        )}
      </div>
      {conTope && !cargarAlScroll && (
        <button
          type="button" data-show-more aria-expanded={abierto} onClick={alternar}
          className="flex items-center gap-1 self-start rounded text-[12px] font-medium text-dash-blue hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue"
        >
          {abierto ? 'Show less' : \`Show \${sobran} more\`}
          <ChevronDown aria-hidden className={cn('size-3.5 transition-transform', abierto && 'rotate-180')} />
        </button>
      )}
    </div>
  )
}
`})))()}export{r as n,n as r,i as t};