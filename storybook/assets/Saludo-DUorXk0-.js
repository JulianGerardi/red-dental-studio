import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

/* El saludo del Topbar (Julián, 2026-10-13): "Hi! Dentist Sarah" se escribe letra por letra, se borra y en su lugar se
   escribe la fecha del día, con el calendario en vez de la mano. Una vez por sesión; después, y con movimiento reducido,
   la fecha directo. Ver design-reference/figma/modulos/dashboard.md. */

export const SALUDO = 'Hi! Dentist Sarah'

/* "Saturday - February 28, 2026", como en la imagen de Julián. */
export const fechaDelDia = (d: Date) =>
  \`\${d.toLocaleDateString('en-US', { weekday: 'long' })} - \${d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}\`

/* Los tiempos de la animación, en ms. */
export const SALUDO_TIEMPOS = { letra: 60, pausa: 1600, borrar: 30, antesDeLaFecha: 250 }

const VISTO = 'saludo-visto'
type Fase = 'saludo' | 'borra' | 'fecha' | 'listo'

const reducido = () => {
  try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches } catch { return false }
}
const yaVisto = () => {
  try { return sessionStorage.getItem(VISTO) === '1' } catch { return false }
}

export function Saludo({ fecha = new Date(), animar = 'sesion', fase: fija, className }: {
  /** El día que se muestra; por defecto, hoy. */
  fecha?: Date
  /** Cuándo se escribe: una vez por sesión, siempre (Storybook) o nunca (la fecha directo). */
  animar?: 'sesion' | 'siempre' | 'nunca'
  /** Deja fijo el saludo o la fecha, sin animar (Storybook). */
  fase?: 'saludo' | 'fecha'
  className?: string
}) {
  const textoFecha = fechaDelDia(fecha)
  const [estado, setEstado] = useState<{ fase: Fase; n: number }>(() => {
    const escribe = animar === 'siempre' || (animar === 'sesion' && !yaVisto())
    return escribe && !reducido() ? { fase: 'saludo', n: 0 } : { fase: 'listo', n: 0 }
  })

  useEffect(() => {
    if (animar === 'sesion') try { sessionStorage.setItem(VISTO, '1') } catch { /* sin storage, saluda cada vez */ }
  }, [animar])

  useEffect(() => {
    if (fija) return
    const { fase, n } = estado
    const { letra, pausa, borrar, antesDeLaFecha } = SALUDO_TIEMPOS
    const pasar = (siguiente: { fase: Fase; n: number }, ms: number) => setTimeout(() => setEstado(siguiente), ms)
    let t: ReturnType<typeof setTimeout> | undefined
    if (fase === 'saludo') t = n < SALUDO.length ? pasar({ fase, n: n + 1 }, letra) : pasar({ fase: 'borra', n }, pausa)
    else if (fase === 'borra') t = n > 0 ? pasar({ fase, n: n - 1 }, borrar) : pasar({ fase: 'fecha', n: 0 }, antesDeLaFecha)
    else if (fase === 'fecha') t = n < textoFecha.length ? pasar({ fase, n: n + 1 }, letra) : pasar({ fase: 'listo', n }, 0)
    return () => clearTimeout(t)
  }, [estado, fija, textoFecha])

  const enFecha = fija ? fija === 'fecha' : estado.fase === 'fecha' || estado.fase === 'listo'
  const completo = enFecha ? textoFecha : SALUDO
  const visible = fija || estado.fase === 'listo' ? completo : completo.slice(0, estado.n)
  const escribiendo = !fija && estado.fase !== 'listo'

  return (
    <p className={cn('flex items-center gap-1.5 text-base whitespace-nowrap text-black', className)}>
      {/* El lector de pantalla lee los dos de una vez, no letra por letra. */}
      <span className="sr-only">{SALUDO}. {textoFecha}</span>
      <span aria-hidden className="flex items-center gap-1.5">
        {enFecha
          ? <span key="fecha" data-saludo-icono className={cn(escribiendo && 'inline-block motion-safe:animate-[saludo-icono_240ms_ease-out]')}>📅</span>
          : <span data-saludo-icono>👋</span>}
        {/* Las dos capas en la misma celda: la invisible reserva el ancho del texto más largo y la barra no se corre. */}
        <span className="grid">
          <span className="invisible [grid-area:1/1]">{SALUDO.length > textoFecha.length ? SALUDO : textoFecha}</span>
          <span className="[grid-area:1/1]">
            {visible}
            {escribiendo && (
              <span className="bg-dash-blue ml-0.5 inline-block h-[1.05em] w-0.5 translate-y-[0.15em] animate-[saludo-cursor_1s_steps(1)_infinite]" />
            )}
          </span>
        </span>
      </span>
    </p>
  )
}
`})))()}export{n,i as r,r as t};