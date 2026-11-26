/* Sin alias '@/': también lo importan las plantillas de PDF desde Node (scripts/pdfs-exportar.mjs). */
import { ARCADAS, type Denticion } from '../data/laboratorios.ts'

/* ── El diagrama de la boca de la Lab Order (como el PDF de red.dev): las dos arcadas en herradura, la encía rosa, cada
   diente con su número o letra afuera y los de la orden en azul. Coordenadas en puntos, con y hacia abajo; el PDF y la
   hoja en pantalla dibujan lo mismo. ── */
export type DienteDiagrama = { d: string; x: number; y: number; lx: number; ly: number }
export type ArcadaDiagrama = { nombre: string; cx: number; cy: number; rx: number; ry: number; encia: [number, number][]; dientes: DienteDiagrama[] }
export function diagramaBoca(denticion: Denticion) {
  const primaria = denticion === 'Primary'
  const [rx, ry, tam] = primaria ? [58, 50, 15] : [68, 56, 10.5]
  const ancho = 200
  const rad = (g: number) => (g * Math.PI) / 180
  /* De 195° a -15°: una herradura, con los molares más abajo que la línea del centro. */
  const angulos = (n: number) => Array.from({ length: n }, (_, i) => 195 - (i * 210) / (n - 1))
  const arcada = (nombre: string, fila: string[], cy: number, signo: 1 | -1): ArcadaDiagrama => {
    const cx = ancho / 2
    const punto = (g: number, ex = 0): [number, number] => [cx + (rx + ex) * Math.cos(rad(g)), cy - signo * (ry + ex) * Math.sin(rad(g))]
    return {
      nombre, cx, cy, rx, ry,
      encia: Array.from({ length: 37 }, (_, i) => punto(198 - i * 6)),
      dientes: angulos(fila.length).map((g, i) => {
        const [x, y] = punto(g)
        const [lx, ly] = punto(g, tam / 2 + 9)
        return { d: fila[i]!, x, y, lx, ly }
      }),
    }
  }
  const bajo = ry * Math.sin(rad(15))
  const arribaCy = 22 + ry
  const abajoCy = arribaCy + 2 * bajo + 34
  return {
    ancho, alto: abajoCy + ry + 24, tam,
    arcadas: [arcada('Maxillary', ARCADAS[denticion].arriba, arribaCy, 1), arcada('Mandibular', ARCADAS[denticion].abajo, abajoCy, -1)],
  }
}

