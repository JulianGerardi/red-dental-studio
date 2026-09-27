import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import { componentes, comentarioDe } from './catalog'
import { hrefDe, paginas, type Entrada } from './Mapa'

/* El buscador de la portada. Busca en todas las páginas del design system
   por nombre, por lo que dicen (su descripción) y por el nombre de sus
   ejemplos (States, Disabled, Loading…), y entiende castellano: "botón",
   "turno" o "pestañas" encuentran Buttons, Appointment cards y Tabs. */

const historias = import.meta.glob('/src/**/*.stories.tsx', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

export type Seccion = 'Foundations' | 'Elements' | 'Components' | 'Pages' | 'Audit'

export type Pagina = {
  id: string
  href: string
  titulo: string
  seccion: Seccion
  /** Módulo o grupo: Dashboard, Scheduling, Screens… */
  grupo: string
  descripcion: string
  /** Nombres de sus ejemplos, con el link a cada uno. */
  ejemplos: { nombre: string; href: string }[]
}

export type Resultado = Pagina & { puntos: number; ejemplo?: { nombre: string; href: string } }

/* Castellano → cómo se llama en el design system. */
const SINONIMOS: Record<string, string[]> = {
  boton: ['button'], botones: ['button'],
  tabla: ['table'], tablas: ['table'], grilla: ['table'], lista: ['table', 'list'],
  campo: ['field'], campos: ['field'], formulario: ['field', 'form'], input: ['field'],
  pestana: ['tabs'], pestanas: ['tabs'], solapa: ['tabs'], solapas: ['tabs'],
  tarjeta: ['card'], tarjetas: ['card'],
  turno: ['appointment'], turnos: ['appointment'], cita: ['appointment'], citas: ['appointment'], agenda: ['scheduling', 'calendar'], calendario: ['calendar', 'scheduling'],
  paciente: ['patient'], pacientes: ['patient'],
  menu: ['menu', 'navigation'], lateral: ['navigation', 'sidebar'], barra: ['navigation', 'sidebar'],
  encabezado: ['header'], titulo: ['header', 'title', 'typography'],
  etiqueta: ['pill', 'badge'], etiquetas: ['pill', 'badge'], estado: ['pill', 'states', 'status'], estados: ['states', 'pill'],
  color: ['colors'], colores: ['colors'], tipografia: ['typography'], letra: ['typography'], fuente: ['typography'],
  sombra: ['shadow'], sombras: ['shadow'], radio: ['radius'], bordes: ['radius'],
  pantalla: ['pages', 'screen'], pantallas: ['pages', 'screen'],
  error: ['error'], errores: ['error'], cargando: ['loading'], carga: ['loading'], deshabilitado: ['disabled'], vacio: ['empty'],
  celular: ['phone'], movil: ['phone'], telefono: ['phone'], tablet: ['tablet'], computadora: ['desktop'],
  modal: ['dialog', 'modal'], dialogo: ['dialog'], ventana: ['dialog', 'modal'],
  aviso: ['toast'], avisos: ['toast'], notificacion: ['toast'], mensaje: ['toast'],
  interruptor: ['switch'], casilla: ['checkbox'], tilde: ['checkbox'],
  buscador: ['search'], busqueda: ['search'], filtro: ['filter'], filtros: ['filter'],
  factura: ['billing'], facturacion: ['billing'], cuenta: ['accounts', 'ledger'], cuentas: ['accounts'],
  seguro: ['insurance'], seguros: ['insurance'], documento: ['documents'], documentos: ['documents'],
  equipo: ['team', 'employees'], empleados: ['employees'], sede: ['locations'], sedes: ['locations'], consultorio: ['locations', 'operatory'],
  consentimiento: ['consent'], consentimientos: ['consent'], odontograma: ['dental', 'tooth'], diente: ['tooth'], dientes: ['tooth', 'dental'],
  receta: ['prescription'], recetas: ['prescription'], ayuda: ['help'], inicio: ['dashboard'], tablero: ['dashboard'],
  foto: ['avatar'], avatar: ['avatar'], icono: ['icon'], iconos: ['icon'], medidas: ['specs'], tamanos: ['sizes'],
}

export const normalizar = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

const limpiar = (s: string) =>
  s.replace(/\\\\'/g, "'").replace(/\\*\\*|__|\`/g, '').replace(/\\*([^*]+)\\*/g, '$1').replace(/\\s+/g, ' ').trim()

const recortar = (s: string, max = 170) => (s.length > max ? \`\${s.slice(0, max).replace(/\\s+\\S*$/, '')}…\` : s)

/* Lo que dice la página: la descripción de sus docs, si no el comentario del
   componente, si no el primer comentario de sus stories. */
function descripcionDe(importPath: string): string {
  const raw = historias[importPath.replace(/^\\./, '')]
  if (raw) {
    const m = raw.match(/component:\\s*\\[\\s*'((?:[^'\\\\]|\\\\.)*)'/) ?? raw.match(/component:\\s*'((?:[^'\\\\]|\\\\.)*)'/)
    if (m) return recortar(limpiar(m[1]!))
  }
  const archivo = importPath.replace(/^\\.\\/src\\//, '').replace(/(\\.[a-z]+)*\\.stories\\.tsx$/, '.tsx')
  const c = componentes.find((x) => x.archivo === archivo)
  const texto = c?.comentario ?? (raw ? comentarioDe(raw) : '')
  return recortar(limpiar(texto.replace(/^Figma[^—\\-.:]*?\\d+:\\d+\\s*[—\\-.:]?\\s*/i, '')))
}

export function armarIndice(entradas: Entrada[]): Pagina[] {
  const ejemplosPorArchivo = new Map<string, { nombre: string; href: string }[]>()
  for (const e of entradas) {
    if (e.type !== 'story') continue
    ejemplosPorArchivo.set(e.importPath, [...(ejemplosPorArchivo.get(e.importPath) ?? []), { nombre: e.name, href: hrefDe(e) }])
  }
  const normales = paginas(entradas.filter((e) => e.title !== 'Pages' && e.title !== 'Welcome')).map((e): Pagina => {
    const partes = e.title.split('/')
    return {
      id: e.id,
      href: hrefDe(e),
      titulo: partes[partes.length - 1]!,
      seccion: partes[0] as Seccion,
      grupo: partes.length > 2 ? partes[1]! : '',
      descripcion: descripcionDe(e.importPath),
      ejemplos: ejemplosPorArchivo.get(e.importPath) ?? [],
    }
  })
  /* Las pantallas son stories de un mismo título: cada una es una página. */
  const pantallas = entradas
    .filter((e) => e.title === 'Pages' && e.type === 'story')
    .map((e): Pagina => ({
      id: e.id,
      href: hrefDe(e),
      titulo: e.name,
      seccion: 'Pages',
      grupo: 'Screens',
      descripcion: \`La pantalla \${e.name} completa, como se ve en la app.\`,
      ejemplos: [],
    }))
  return [...normales, ...pantallas]
}

/* Cada palabra de la búsqueda, con lo que significa en el design system. */
function alternativas(palabra: string): string[] {
  const alts = new Set([palabra])
  for (const [clave, valores] of Object.entries(SINONIMOS)) {
    if (clave === palabra || (palabra.length >= 3 && clave.startsWith(palabra))) valores.forEach((v) => alts.add(v))
  }
  return [...alts]
}

const PESO_SECCION: Record<Seccion, number> = { Elements: 8, Foundations: 6, Pages: 3, Components: 0, Audit: -4 }

export function buscar(indice: Pagina[], consulta: string, max = Infinity): Resultado[] {
  const palabras = normalizar(consulta).split(/[\\s/,]+/).filter(Boolean)
  if (!palabras.length) return []
  const resultados: Resultado[] = []
  for (const p of indice) {
    const titulo = normalizar(p.titulo)
    const palabrasTitulo = titulo.split(/[\\s&·-]+/)
    const lugar = normalizar(\`\${p.seccion} \${p.grupo}\`)
    const texto = normalizar(p.descripcion)
    let puntos = 0
    let ejemplo: Resultado['ejemplo']
    let todas = true
    for (const palabra of palabras) {
      let mejor = 0
      for (const alt of alternativas(palabra)) {
        if (titulo === alt) mejor = Math.max(mejor, 70)
        else if (palabrasTitulo.some((w) => w.startsWith(alt))) mejor = Math.max(mejor, 50)
        else if (titulo.includes(alt)) mejor = Math.max(mejor, 35)
        const ej = p.ejemplos.find((x) => normalizar(x.nombre).includes(alt))
        if (ej && mejor < 20) { mejor = 20; ejemplo = ej }
        if (lugar.includes(alt)) mejor = Math.max(mejor, 15)
        if (texto.includes(alt)) mejor = Math.max(mejor, 10)
      }
      if (!mejor) { todas = false; break }
      puntos += mejor
    }
    if (todas) resultados.push({ ...p, puntos: puntos + PESO_SECCION[p.seccion], ejemplo })
  }
  return resultados.sort((a, b) => b.puntos - a.puntos || a.titulo.localeCompare(b.titulo)).slice(0, max)
}
`})))()}n();export{t as default};