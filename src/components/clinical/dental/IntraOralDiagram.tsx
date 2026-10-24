import boca from '@/assets/intraoral-mouth.png'
import { RegionDiagram, type Forma } from './RegionDiagram'
import type { IntraOralRegion } from './data'

/* El gráfico de Intraoral: el PNG del Figma (Platform Design, Clinical Exam — Intra Oral) con la boca abierta y la
   vista de la lengua, sin ninguna zona marcada (el celeste de ejemplo que trae el PNG se deshizo por cálculo: el labio
   se completó con su espejo y el paladar blando se recuperó; ver modulos/clinical-mode.md). Por ahora sólo hay zona
   clickeable en el paladar duro (CON-882) y el paladar blando (la forma celeste del propio PNG; "Soft Palate" es el
   nombre que usa el Figma): el resto de las zonas que se ven en red.dev (labios, arcada, mejillas, lengua, piso de
   boca) esperan su lista de nombres, no se inventan. Right = lado derecho del
   paciente, a la izquierda del dibujo. Coordenadas del PNG original (3831 px). */

const FORMAS: Forma<IntraOralRegion>[] = [
  { region: 'Right Hard Palate', d: 'M1144 563L1100 566L1040 585L985 620L940 665L900 720L868 770L840 805L1144 805Z' },
  { region: 'Soft Palate', d: 'M719 1183L723 1190L862 1221L868 1129L890 1085L919 1055L949 1037L987 1027L1011 1026L1038 1031L1064 1042L1108 1076L1115 1076L1135 1032L1145 1033L1163 1071L1174 1076L1209 1049L1238 1035L1271 1029L1311 1031L1362 1055L1404 1095L1422 1142L1430 1222L1572 1187L1559 1141L1544 1055L1545 991L1515 976L1496 950L1481 904L1467 831L1453 805L840 805L834 809L816 862L815 888L797 949L774 975L746 989L746 1070L733 1141Z' },
  { region: 'Left Hard Palate', d: 'M1144 563L1188 566L1248 585L1303 620L1348 665L1388 720L1420 770L1448 805L1144 805Z' },
]

export function IntraOralDiagram({
  pending, active, onToggle,
}: {
  pending: IntraOralRegion[]
  active: IntraOralRegion[]
  onToggle: (region: IntraOralRegion) => void
}) {
  return (
    <RegionDiagram
      titulo="Intra oral diagram" imagen={boca} ancho={3831} alto={1900} viewBox="200 60 3380 1840" className="max-h-[560px]"
      formas={FORMAS} pending={pending} active={active} onToggle={onToggle}
    />
  )
}
