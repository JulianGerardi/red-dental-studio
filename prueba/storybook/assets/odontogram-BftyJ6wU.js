import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`/* Modelo calcado de \`localStorage.oralExamValue\` del original:
   { temporary, teeth: Tooth[32], bars: [] }

   Cada pieza tiene 7 superficies. Los índices que usa el original (4 y 5)
   caen en la banda lingual, así que las mapeamos como:
     0 MB · 1 B · 2 DB      (banda vestibular)
     3 O/I                  (oclusal / incisal, ancho completo)
     4 ML · 5 L · 6 DL      (banda lingual)
   El valor de cada superficie es un color hex, o null si está sana. */

export const SURFACE_LABELS = ['MB', 'B', 'DB', 'O', 'ML', 'L', 'DL'] as const

export type ToothElement = 'permanent' | 'temporary' | 'missing'

export type Finding = {
  date: string
  finding: string
  professional: string
  surfaces: (string | null)[]
}

export type Tooth = {
  number: number
  element: ToothElement
  surfaces: (string | null)[]
  root: string | null
  icons: string[]
  color: string | null
  findings: Finding[]
}

export type OralExam = {
  temporary: boolean
  teeth: Tooth[]
  bars: unknown[]
}

/* Vocabulario de iconos observado en el original. */
export const TOOTH_ICONS: Record<string, { label: string; glyph: string; color: string }> = {
  grbleeding: { label: 'Gingival bleeding', glyph: '●', color: '#dc2626' },
  grplaque: { label: 'Dental plaque', glyph: '▲', color: '#f59e0b' },
  grcalculus: { label: 'Calculus', glyph: '■', color: '#78716c' },
}

export const FINDING_VOCABULARY = [
  'Periodontitis',
  'Acute apical abscess',
  'Necrosis of the pulp',
  'Dental plaque on tooth',
  'Localized moderate chronic periodontitis',
  'Subgingival dental calculus',
  'Dental calculus',
  'Temporary dentition',
]

const emptySurfaces = () => Array<string | null>(7).fill(null)

function makeTooth(number: number): Tooth {
  return {
    number,
    element: 'permanent',
    surfaces: emptySurfaces(),
    root: null,
    icons: [],
    color: null,
    findings: [],
  }
}

/* Exam ficticio: 32 piezas, con algunas superficies marcadas y una ausente,
   para que el chart tenga los mismos estados que el original. */
export function makeMockExam(): OralExam {
  const teeth = Array.from({ length: 32 }, (_, i) => makeTooth(i + 1))

  const mark = (n: number, idx: number[], color = '#fe0000') => {
    const t = teeth[n - 1]
    idx.forEach((i) => (t.surfaces[i] = color))
  }

  mark(3, [4])
  mark(10, [5])
  mark(11, [4, 5])
  mark(14, [3])
  mark(19, [5])
  mark(23, [4])
  mark(29, [1])
  mark(30, [3, 5])

  teeth[9].icons = ['grbleeding']
  teeth[10].icons = ['grbleeding', 'grplaque']
  teeth[18].icons = ['grcalculus']

  teeth[15].element = 'missing'

  const finding = (finding: string, date: string): Finding => ({
    date,
    finding,
    professional: 'Salgado, R.',
    surfaces: emptySurfaces(),
  })

  teeth[9].findings = [finding('Dental calculus', '2026-05-14T13:27:51.058Z')]
  teeth[10].findings = [finding('Dental calculus', '2026-05-14T15:54:55.382Z')]
  teeth[2].findings = [finding('Dental calculus', '2026-05-14T14:37:43.046Z')]
  teeth[4].findings = [finding('Localized moderate chronic periodontitis', '2026-05-14T14:44:55.396Z')]

  return { temporary: false, teeth, bars: [] }
}

/* Orden de dibujo: fila superior 1→16 (UR luego UL),
   fila inferior 32→17 (LR luego LL), igual que un odontograma estándar. */
export const MAXILLARY = Array.from({ length: 16 }, (_, i) => i + 1)
export const MANDIBULAR = Array.from({ length: 16 }, (_, i) => 32 - i)
`})))()}export{r as n,n as r,i as t};