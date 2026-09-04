import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EXAMENES, REGISTROS, type Juego, type Pestana } from '@/data/clinical-mode'

/* Botonera de 4235:135661 y 4265:56662. El primer botón no es una pestaña más:
   es el que **cambia la botonera entera**. Con "Exams" salen los diez
   exámenes; con "Records", los siete registros —Treatment Plan, Lab Order,
   Prescription…—. El frame lo dibuja con chevron derecho cerrado y chevron
   abajo abierto, y eso es exactamente lo que hace acá. */
export function ClinicalToolbar({
  juego, onJuego, pestana, onPestana,
}: {
  juego: Juego
  onJuego: (j: Juego) => void
  pestana: Pestana
  onPestana: (p: Pestana) => void
}) {
  const [abierto, setAbierto] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fuera = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setAbierto(false)
    }
    document.addEventListener('mousedown', fuera)
    return () => document.removeEventListener('mousedown', fuera)
  }, [])

  const items: readonly string[] = juego === 'Exams' ? EXAMENES : REGISTROS

  return (
    /* El botón del desplegable vive FUERA del contenedor que scrollea: adentro,
       el `overflow-x-auto` recortaba el menú y quedaba escondido detrás de la
       pantalla. Sólo scrollean las pestañas. */
    <div className="flex items-center gap-[10.64px]">
      <div ref={ref} className="relative z-20 shrink-0">
        <button
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          className="flex h-9 items-center gap-1.5 rounded-lg border border-[#e4e4e7] bg-white px-3.5 text-[13px] font-medium whitespace-nowrap shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] hover:bg-[#fafafa]"
        >
          {/* El rótulo es siempre "Exams", como en los dos frames: es el nombre
              del menú, no el del juego activo. Cuál está puesto se ve marcado
              adentro del desplegable. */}
          Exams
          {abierto ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
        </button>

        {abierto && (
          <div className="absolute top-full left-0 z-50 mt-1 w-[180px] rounded-lg border border-[#e4e4e7] bg-white p-1 shadow-[0_12px_32px_rgb(0_0_0/0.18)]">
            {(['Exams', 'Records'] as const).map((j) => (
              <button
                key={j}
                onClick={() => {
                  onJuego(j)
                  onPestana((j === 'Exams' ? EXAMENES[2] : REGISTROS[3]) as Pestana)
                  setAbierto(false)
                }}
                className={cn(
                  'block w-full rounded px-3 py-2 text-left text-[13px] hover:bg-[#f4f4f5]',
                  juego === j && 'bg-dash-count-bg text-dash-blue-hover font-medium',
                )}
              >
                {j}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fill container: en desktop las pestañas se reparten el ancho en
          partes iguales, como en el frame. En angosto vuelven a su tamaño y
          scrollean. */}
      <div className="-mx-1 min-w-0 flex-1 overflow-x-auto px-1 pb-1">
        {/* El hueco entre pestañas queda fijo en 10.64, el del export. El
            sobrante lo absorben las **pestañas**, no los huecos: `grow` con
            base automática reparte el extra en partes iguales, así cada una
            crece lo mismo y conserva su diferencia de ancho. Con
            `justify-between` el sobrante caía en los huecos y quedaban de 47;
            con `basis-0` todas terminaban del mismo ancho. */}
        <div className="flex w-max items-center gap-[10.64px] lg:w-full">
          {items.map((p) => {
            const on = p === pestana
            return (
              <button
                key={p}
                onClick={() => onPestana(p as Pestana)}
                aria-current={on ? 'page' : undefined}
                className={cn(
                  /* Del export de la Tab Bar: alto 33.96, padding 21.27, radio
                     5.32, label 11.52/600. Cada pestaña mide lo que dice: el
                     ancho de la fila lo da el padding de la pantalla, no un
                     estiramiento de los botones. */
                  'flex h-[33.96px] shrink-0 items-center justify-center rounded-[5.32px] px-[21.27px] text-[11.52px] font-semibold whitespace-nowrap transition-colors',
                  'lg:grow',
                  on
                    ? 'bg-dash-blue font-semibold text-white'
                    : 'border border-[#e4e4e7] bg-white font-medium text-[#09090b] shadow-[0_1px_2px_0_rgb(0_0_0/0.05)] hover:bg-[#fafafa]',
                )}
              >
                {p}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
