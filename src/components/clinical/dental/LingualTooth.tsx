import { cn } from '@/lib/utils'

/* La cara lingual/palatina del diente, dibujada por nosotros: la librería
   sólo trae la vestibular y la oclusal, así que lo que se carga en la
   superficie lingual no se veía en ninguna parte del gráfico.

   Es un dibujo propio, no la vestibular espejada: la cara lingual tiene su
   forma -el cíngulo de los anteriores, las cúspides linguales de los
   posteriores-. Ver design-reference/figma/modulos/clinical-mode.md. */

type TipoDiente = 'molar' | 'premolar' | 'canino' | 'incisivo'

/* Numeración universal: la posición dentro de la arcada define la forma. */
function tipoDiente(numero: number): TipoDiente {
  const pos = ((numero - 1) % 16) + 1
  if (pos <= 3 || pos >= 14) return 'molar'
  if (pos <= 5 || pos >= 12) return 'premolar'
  if (pos === 6 || pos === 11) return 'canino'
  return 'incisivo'
}

/* Dibujado con la corona abajo y las raíces arriba -orientación maxilar-;
   la mandíbula usa el mismo dibujo espejado. */
const CORONA: Record<TipoDiente, string> = {
  /* Dos cúspides linguales marcadas y el surco al medio. */
  molar: 'M6.5 34 C6.5 51 11 62.5 16.5 63.4 C19 63.8 20.5 62 22 62 C23.5 62 25 63.8 27.5 63.4 C33 62.5 37.5 51 37.5 34 Z',
  premolar: 'M10.5 34 C10.5 51 14.4 62 22 63.4 C29.6 62 33.5 51 33.5 34 Z',
  canino: 'M11.5 34 C11.5 46.5 16.2 59 22 63.6 C27.8 59 32.5 46.5 32.5 34 Z',
  incisivo: 'M12.5 34 L12.5 57 Q12.5 63 22 63 Q31.5 63 31.5 57 L31.5 34 Z',
}

/* El cíngulo: el engrosamiento del tercio cervical que sólo se ve de este
   lado, y que es lo que distingue esta cara de la vestibular. */
const CINGULO: Record<TipoDiente, string | null> = {
  molar: null,
  premolar: 'M14.5 40 Q22 47 29.5 40 Q22 44.5 14.5 40 Z',
  canino: 'M15 40.5 Q22 49 29 40.5 Q22 45.5 15 40.5 Z',
  incisivo: 'M15.4 40.5 Q22 48.5 28.6 40.5 Q22 45 15.4 40.5 Z',
}

/* Surcos propios de la cara lingual. */
const SURCO: Record<TipoDiente, string> = {
  molar: 'M22 40 L22 57 M15.5 45 Q22 49 28.5 45',
  premolar: 'M22 43 L22 56',
  canino: 'M22 43 L22 57',
  incisivo: 'M17 46 L17 55 M27 46 L27 55',
}

const RAICES: Record<TipoDiente, string[]> = {
  molar: ['M12.3 36 C12 29 12.6 22.5 14.1 18.4 C14.8 16 18.1 16.4 18.4 19.6 C19 23 20.4 25.5 22 27 C23.6 25.5 25 23 25.6 19.6 C25.9 16.4 29.2 16 29.9 18.4 C31.4 22.5 32 29 31.7 36 Z'],
  premolar: ['M17.4 36 C16.6 27 16.1 16 19.8 10.5 Q22 8 24.2 10.5 C27.9 16 27.4 27 26.6 36 Z'],
  canino: ['M17.5 36 C16.6 26 16 10 19.6 4.5 Q22 2 24.4 4.5 C28 10 27.4 26 26.5 36 Z'],
  incisivo: ['M18 36 C17.3 27 16.8 17 19.9 11.5 Q22 9.2 24.1 11.5 C27.2 17 26.7 27 26 36 Z'],
}

const ENCIA = 'M3 43 C3 33 11 28.5 22 28.5 C33 28.5 41 33 41 43 Z'
/* La banda de hueso, del mismo crema que usan las celdas de la librería:
   sin ella la fila lingual leía como pegada de otro dibujo. */
const HUESO = { x: 2, y: 4, w: 40, h: 36 }

/* La lesión de caries sobre la cara: mancha oscura, como la dibuja la
   librería en las otras vistas. */
const LESION: Record<TipoDiente, string> = {
  molar: 'M18 46 Q22 42 26 46 Q27.5 51 22 54 Q16.5 51 18 46 Z',
  premolar: 'M18.5 47 Q22 43.5 25.5 47 Q26.5 51.5 22 54 Q17.5 51.5 18.5 47 Z',
  canino: 'M19 47 Q22 44 25 47 Q26 51 22 54 Q18 51 19 47 Z',
  incisivo: 'M19 47 Q22 44 25 47 Q26 51 22 54 Q18 51 19 47 Z',
}

export function LingualTooth({
  numero, ausente, seleccionado, caries, restauracion, flip,
}: {
  numero: number
  ausente: boolean
  seleccionado: boolean
  /** Caries cargada en la cara lingual/palatina de esta pieza. */
  caries: boolean
  /** Restauración cargada en esa misma cara. */
  restauracion: boolean
  flip: boolean
}) {
  const tipo = tipoDiente(numero)
  const cingulo = CINGULO[tipo]

  if (ausente) {
    return (
      <svg viewBox="0 0 44 64" className="h-full w-full" aria-hidden>
        <rect x="10" y="34" width="24" height="24" rx="8" className="fill-none stroke-[#d4d4d8]" strokeWidth="1.6" strokeDasharray="3 2.5" />
        <path d="M16 40 L28 52 M28 40 L16 52" className="stroke-[#a1a1aa]" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 44 64" className={cn('h-full w-full', flip && '-scale-y-100')} aria-hidden>
      <rect x={HUESO.x} y={HUESO.y} width={HUESO.w} height={HUESO.h} fill="#fdefd2" />
      {RAICES[tipo].map((d) => (
        <path key={d} d={d} fill="#fcfcfd" stroke="#d2d2d9" strokeWidth="1.1" strokeLinejoin="round" />
      ))}
      <path d={ENCIA} fill="#f2a5a5" />
      <path d={CORONA[tipo]} fill={seleccionado ? '#eef3fd' : '#f1f1f4'} stroke="#c9c9d1" strokeWidth="1.2" strokeLinejoin="round" />
      {cingulo && <path d={cingulo} fill="#e4e4e9" stroke="#d2d2d9" strokeWidth="0.7" />}
      <path d={SURCO[tipo]} fill="none" stroke="#c9c9d1" strokeWidth="0.9" strokeLinecap="round" />
      {restauracion && <path d={LESION[tipo]} fill="#9aa3b2" stroke="#6b7280" strokeWidth="0.8" />}
      {caries && <path d={LESION[tipo]} fill="#0a1018" />}
    </svg>
  )
}
