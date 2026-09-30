import type { LucideIcon } from 'lucide-react'
import { buscar, historias, normalizar, type Pagina } from '../buscar'
import type { Entrada } from '../Mapa'
import { TIPOS, nuevoId, type Bloque, type Grupo, type TipoBloque } from './bloques'

/* La paleta del Builder: los bloques editables y todas las piezas de Confidentally UI (Elements, Components y Pages),
   leídas del índice de Storybook, así que una pieza nueva aparece sola. Ver design-reference/design-system.md › Builder. */

export type Item = { clave: string; nombre: string; detalle: string; lugar: string; tipo: TipoBloque; icono?: LucideIcon; crear: () => Bloque }
export type GrupoPaleta = { nombre: string; items: Item[] }
export type Seccion = { titulo: string; que: string; grupos: GrupoPaleta[] }

/* Palabras en castellano para encontrar cada bloque. */
const PALABRAS: Partial<Record<TipoBloque, string>> = {
  encabezado: 'titulo encabezado header', texto: 'texto parrafo', botones: 'boton botones accion', campos: 'campos formulario input form',
  opciones: 'switch interruptor casilla checkbox opciones', pago: 'pago cobro payment', horarios: 'horario hora turno slot',
  pills: 'etiqueta estado pill badge', vacio: 'vacio sin datos empty', divisor: 'linea separador divider', modal: 'modal popup ventana dialogo',
  pestanasContenido: 'pestanas solapas tabs', seccion: 'seccion grupo section', pestanas: 'pestanas solapas tabs', tabla: 'tabla lista grilla table',
  calendario: 'calendario agenda', stats: 'numeros metricas estadisticas', detalles: 'detalles datos contacto', turnos: 'turnos citas agenda appointments',
  tareas: 'tareas pendientes tasks', odontograma: 'odontograma dientes', receta: 'receta medicamento prescription',
  migas: 'migas ruta breadcrumb navegacion', pasos: 'pasos etapas stepper wizard progreso', paginacion: 'paginacion paginas siguiente anterior',
  busqueda: 'buscador busqueda filtro barra toolbar search', aviso: 'aviso alerta mensaje banner error exito atencion',
  persona: 'persona avatar paciente perfil usuario', metricas: 'metricas numeros franja resumen dashboard stats',
  operatorios: 'operatorios salas consultorios', pacientes: 'pacientes tarjetas cards lista', subir: 'subir archivos adjuntar upload documentos',
}

const GRUPOS_BLOQUES: Grupo[] = ['Layout', 'Forms', 'Content', 'Data', 'Clinical']

const BLOQUES: Seccion = {
  titulo: 'Editable blocks',
  que: 'Se editan desde Layers y dan código propio.',
  grupos: GRUPOS_BLOQUES.map((g) => ({
    nombre: g,
    items: TIPOS.filter((t) => t.grupo === g).map((t) => ({ clave: t.tipo, nombre: t.nombre, detalle: t.que, lugar: `Block · ${g}`, tipo: t.tipo, icono: t.icono, crear: t.nuevo })),
  })),
}

/* Elements que ya son bloques editables: están arriba. */
const YA_BLOQUE = new Set(['Buttons', 'Fields', 'Pills', 'Tables', 'Tabs', 'Appointment cards', 'Page header'])
const MODULOS = ['UI', 'Layout', 'Dashboard', 'Patients', 'Scheduling', 'Clinical', 'Ledger', 'Billing', 'Settings', 'Help']

const archivoDe = (importPath: string) => (/^\.\/src\/(components|pages)\//.test(importPath) ? `@/${importPath.slice(6).replace(/\.stories\.tsx$/, '')}` : '')

/* Páginas que juntan varias piezas distintas ("ClinicalTopBar parts", "Insurance modals", las partes de Pages):
   cada ejemplo es un componente propio y se llama como el ejemplo. */
const junta = (p: Pagina) => p.grupo === 'Parts' || (p.seccion === 'Components' && !/^[A-Z][A-Za-z0-9]*$/.test(p.titulo))
/* En esas páginas un ejemplo de nombre genérico ("Default", "Without Title") se llama como la página. */
const GENERICO = /^(default|base|all|empty)$|^(with|without)\b/i
const suelto = (p: Pagina, nombre: string) => junta(p) && !GENERICO.test(nombre)
/* Historias que abren un diálogo o un menú al cargar: en el lienzo bloquearían la página, así que van en un iframe. */
const ABRE = /defaultOpen|\bopen(: true|=\{true\}|\s*\/?>|\s+on)/
/* Ejemplos que muestran cómo se usa algo, no una pieza. */
const DEMO = /^(playground|specs|anatomy)$|in the app|which .+ goes|how to build/i

const lugarDe = (p: Pagina) => [p.seccion, p.grupo].filter(Boolean).join(' › ')

const resolver = (ruta: string, rel: string) => {
  const partes = ruta.split('/').slice(0, -1)
  for (const x of rel.split('/')) {
    if (x === '..') partes.pop()
    else if (x !== '.') partes.push(x)
  }
  return partes.join('/').replace(/^\/src\//, '@/')
}

/* El componente que dibuja un ejemplo y de dónde se importa, leído de su archivo de historias: la primera etiqueta
   importada de la app en su render (siguiendo `...OtroEjemplo`), si no el `component` de la página. */
function usoDe(importPath: string, storyId: string): { jsx: string; archivo: string } | null {
  const ruta = importPath.replace(/^\./, '')
  const raw = historias[ruta]
  if (!raw) return null
  const imports = new Map<string, string>()
  for (const m of raw.matchAll(/^import \{([^}]+)\} from '([^']+)'/gm)) {
    const desde = m[2]!.startsWith('.') ? resolver(ruta, m[2]!) : m[2]!
    for (const n of m[1]!.split(',')) imports.set(n.trim().replace(/^type\s+/, '').split(/\s+as\s+/).pop()!, desde)
  }
  const cuerpo = (clave: string, vueltas = 0): string => {
    const m = [...raw.matchAll(/^export const (\w+)/gm)].find((x) => x[1]!.toLowerCase() === clave)
    if (!m) return ''
    const fin = raw.indexOf('\nexport ', m.index! + 1)
    const txt = raw.slice(m.index!, fin < 0 ? undefined : fin)
    const base = txt.match(/\.\.\.([A-Z]\w*)/)?.[1]
    return txt.includes('<') || !base || vueltas > 2 ? txt : cuerpo(base.toLowerCase(), vueltas + 1)
  }
  const deLaApp = (n: string) => {
    const desde = imports.get(n)
    return desde && /^@\/(components|pages)\//.test(desde) ? { jsx: n, archivo: desde } : null
  }
  for (const m of cuerpo(storyId.split('--')[1]!.replace(/-/g, '')).matchAll(/<([A-Z][A-Za-z0-9]*)/g)) {
    const u = deLaApp(m[1]!)
    if (u) return u
  }
  const meta = raw.match(/\bcomponent:\s*([A-Z]\w*)/)?.[1]
  return meta ? deLaApp(meta) : null
}

/* Una pieza real: uno de los ejemplos de su página (o la pantalla). */
export function piezaDe(entradas: Entrada[], p: Pagina, ej: { nombre: string; id: string }): Bloque {
  const pantalla = p.grupo === 'Screens'
  const suelta = suelto(p, ej.nombre)
  const entrada = entradas.find((e) => e.id === ej.id)
  const uso = entrada && !pantalla ? usoDe(entrada.importPath, ej.id) : null
  return {
    id: nuevoId(), tipo: 'pieza', storyId: ej.id, pantalla,
    ...(entrada && !pantalla && { historia: entrada.importPath, marco: ABRE.test(historias[entrada.importPath.replace(/^\./, '')] ?? '') }),
    componente: suelta ? ej.nombre : p.titulo, ejemplo: pantalla || suelta ? '' : ej.nombre,
    lugar: suelta ? `${lugarDe(p)} › ${p.titulo}` : lugarDe(p),
    archivo: uso?.archivo ?? (entrada && !suelta ? archivoDe(entrada.importPath) : ''),
    ...(uso && { jsx: uso.jsx }),
  }
}

type ItemPieza = Item & { pagina: Pagina }

/* Cada pieza por separado: un ítem por ejemplo, y uno por pantalla. */
function itemsDe(entradas: Entrada[], p: Pagina): ItemPieza[] {
  if (p.grupo === 'Screens') {
    const ej = { nombre: p.titulo, id: p.id }
    return [{ clave: p.id, nombre: p.titulo, detalle: 'Pantalla completa', lugar: lugarDe(p), tipo: 'pieza', pagina: p, crear: () => piezaDe(entradas, p, ej) }]
  }
  return p.ejemplos.filter((e) => !DEMO.test(e.nombre)).map((e) => ({
    clave: e.id, nombre: suelto(p, e.nombre) ? e.nombre : p.titulo, detalle: suelto(p, e.nombre) ? p.titulo : e.nombre, lugar: lugarDe(p), tipo: 'pieza', pagina: p,
    crear: () => piezaDe(entradas, p, e),
  }))
}

/* Las páginas de la app que tienen piezas para soltar en el lienzo. */
function paginasDe(indice: Pagina[]) {
  return indice.filter((p) => p.titulo !== 'Overview' && (
    (p.seccion === 'Elements' && !YA_BLOQUE.has(p.titulo) && p.titulo !== 'Elements') ||
    (p.seccion === 'Components' && MODULOS.includes(p.grupo)) ||
    (p.seccion === 'Pages' && p.grupo === 'Parts')
  ))
}

export function armarPaleta(entradas: Entrada[], indice: Pagina[]): Seccion[] {
  const paginas = paginasDe(indice)
  const orden = (a: Item, b: Item) => a.nombre.localeCompare(b.nombre) || a.detalle.localeCompare(b.detalle)
  const de = (f: (p: Pagina) => boolean) => paginas.filter(f).flatMap((p) => itemsDe(entradas, p)).sort(orden)
  return [
    BLOQUES,
    {
      titulo: 'App components',
      que: 'Cada componente real y cada uno de sus ejemplos, por separado, tal como están en Confidentally UI.',
      grupos: [
        { nombre: 'Elements', items: de((p) => p.seccion === 'Elements') },
        ...MODULOS.map((m) => ({ nombre: m, items: de((p) => p.seccion === 'Components' && p.grupo === m) })),
      ].filter((g) => g.items.length),
    },
    {
      titulo: 'Screen parts',
      que: 'Las piezas propias de cada pantalla, sueltas. La pantalla se arma con el contenedor App y estas piezas.',
      grupos: [{ nombre: 'Screen parts', items: de((p) => p.grupo === 'Parts') }].filter((g) => g.items.length),
    },
  ]
}

/* Buscar en toda la paleta: los bloques por nombre y palabras; cada pieza con el buscador del sitio, que entiende castellano. */
export function filtrar(paleta: Seccion[], consulta: string): Item[] {
  const q = normalizar(consulta).trim()
  if (!q) return []
  const palabras = q.split(/\s+/)
  const bloques = BLOQUES.grupos.flatMap((g) => g.items).filter((it) => {
    const donde = normalizar(`${it.nombre} ${it.detalle} ${PALABRAS[it.tipo] ?? ''}`)
    return palabras.every((w) => donde.includes(w))
  })
  return [...bloques, ...buscarPiezas(paleta, q)]
}

/* Las piezas de la app que coinciden, de más a menos: por nombre, ejemplo, módulo y lo que dice su página. */
export function buscarPiezas(paleta: Seccion[], consulta: string): Item[] {
  const piezas = new Map(paleta.slice(1).flatMap((s) => s.grupos.flatMap((g) => g.items as ItemPieza[])).map((it) => [it.clave, it]))
  const indice: Pagina[] = [...piezas.values()].map((it) => ({
    ...it.pagina, id: it.clave, titulo: `${it.nombre} ${it.detalle}`, descripcion: `${it.pagina.titulo} ${it.pagina.descripcion}`, ejemplos: [],
  }))
  /* A igual puntaje, la de nombre más corto: "tarjeta de paciente" es PatientCard antes que PatientAppointmentCard. */
  return buscar(indice, consulta).sort((a, b) => b.puntos - a.puntos || a.titulo.length - b.titulo.length).map((r) => piezas.get(r.id)!)
}
