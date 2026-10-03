import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import { ICONOS, PROPORCIONES, TIPOS, campo, columna, columnasDe, hijosDe, infoDe, nuevoId, pestana, tablaDe, type Bloque, type Diseno, type TipoBloque } from './bloques'
import { DATOS, conjunto, type IdConjunto } from './datos'
import type { Item, Seccion } from './paleta'

/* Describe con IA: Gemini (plan gratis) ve el lienzo tal como está y el catálogo de la app, y devuelve el diseño entero.
   Así crea desde cero o edita lo que ya hay (cambia un texto, suma o saca una parte, la mueve) sin perder lo demás: los
   bloques que no toca vuelven con su mismo id. Ver design-reference/design-system.md › Builder. */

export const CLAVE_GEMINI = 'confidentally-ui-builder-gemini'
/* El primero que responda: si un modelo ya no existe (404) se prueba el siguiente. */
const MODELOS = ['gemini-3.8-flash', 'gemini-3.5-flash', 'gemini-2.5-flash']

/* La clave del equipo, si el build la trae (VITE_GEMINI_KEY, del secreto del repo en el deploy): la usa quien no pegó la suya.
   Queda dentro del JavaScript publicado; se eligió así porque el Builder lo usa sólo el equipo. */
export const CLAVE_DEL_EQUIPO = (import.meta.env.VITE_GEMINI_KEY as string | undefined)?.trim() ?? ''

export function leerClave(): string {
  try {
    return window.localStorage.getItem(CLAVE_GEMINI) || CLAVE_DEL_EQUIPO
  } catch {
    return CLAVE_DEL_EQUIPO
  }
}
export function guardarClave(clave: string | null) {
  try {
    if (clave) window.localStorage.setItem(CLAVE_GEMINI, clave)
    else window.localStorage.removeItem(CLAVE_GEMINI)
  } catch {
    /* Sin almacenamiento: la IA queda apagada. */
  }
}

/* Cada pieza con un id corto (p1, p2…): menos texto para el modelo y menos lugar para equivocarse. */
export function catalogoDe(paleta: Seccion[]) {
  const piezas = paleta.slice(1).flatMap((s) => s.grupos.flatMap((g) => g.items)).map((it, i) => ({ id: \`p\${i + 1}\`, it }))
  return { piezas, porId: new Map<string, Item>(piezas.map((p) => [p.id, p.it])) }
}

/* ── El formato que lee y escribe la IA ──────────────────────────────── */

const LISTA = (xs: readonly string[]) => xs.map((x) => \`"\${x}"\`).join(' | ')
const ICONOS_REALES = Object.keys(ICONOS).filter((k) => k !== 'none')

/* Los campos de cada bloque, con los valores que acepta. */
const CAMPOS_BLOQUE = \`- {"tipo":"pieza","pieza":"p12"}: una PIEZA REAL del catálogo, por su id.
- encabezado: titulo, bajada, accion (texto del botón principal o ""), icono
- texto: texto, tono (\${LISTA(['normal', 'suave'])})
- botones: alinear (\${LISTA(['inicio', 'fin', 'extremos'])}), botones: [{label, variant (\${LISTA(['primary', 'secondary', 'ghost', 'link', 'destructive'])}), size (\${LISTA(['sm', 'md', 'lg'])}), icono}]
- campos: columnas (1 | 2), campos: [{label, clase (\${LISTA(['text', 'select', 'date', 'calendar', 'textarea', 'search'])}), placeholder, opciones ("A, B, C" en select y search), required, hint}]
- opciones: control (\${LISTA(['switch', 'checkbox'])}), items: [{label, on}]
- pago: titulo, fecha, aplicarA ("Nombre, Nombre"), metodos ("Card payment, Cash payment"), varios, notas, total
- horarios: provider, especialidad, fecha
- pills: items: [{label, tone (\${LISTA(['success', 'info', 'warning', 'danger', 'neutral', 'purple'])})}]
- vacio: icono, titulo, detalle, accion
- divisor: (sin campos)
- modal: titulo, disparador (botón que lo abre), ancho (\${LISTA(['sm', 'md', 'lg'])}), confirmar, cancelar, peligro, bloques: [...]
- pestanasContenido: size (\${LISTA(['sm', 'md'])}), fullWidth, pestanas: [{label, bloques: [...]}]
- columnas: proporcion (\${LISTA(Object.keys(PROPORCIONES))}), columnas: [{bloques: [...]}] (tantas columnas como números tiene la proporción)
- seccion: titulo, bloques: [...]
- pestanas: tabs ("All, Active, Inactive"), size, fullWidth
- tabla: datos (\${LISTA(Object.keys(DATOS))}), columnas: ["campo", ...], filas, buscador, seleccion, acciones, compacta, porPagina
- calendario: vista (\${LISTA(['Day', 'Week', 'Month'])}), selector, leyenda
- stats: items: [{titulo, valor, delta, icono}]
- metricas: apilada, items: [{titulo, valor, nota, icono}]
- detalles: titulo, items: [{icono, label, valor}]
- turnos | tareas | pacientes | operatorios: cantidad
- migas: items ("Patients, Maria Abril Viola")
- pasos: total, actual, etiquetas ("Patient, Scheduling, Confirm")
- paginacion: paginas
- busqueda: placeholder, filtro, opcionesFiltro, accion
- subir: titulo, detalle, accion
- aviso: tono (\${LISTA(['info', 'success', 'warning', 'danger'])}), titulo, texto
- persona: nombre, detalle, estado (\${LISTA(['', 'Active', 'Inactive'])}), grande
- odontograma: ejemplo, marca (\${LISTA(['Caries', 'Restoration', 'Planned'])})
- receta: titulo, medicamentos, repeticiones, sustitucion, indicaciones
Íconos (icono): "none" o \${ICONOS_REALES.join(', ')}.
Campos de cada tabla: \${Object.entries(DATOS).map(([k, c]) => \`\${k}: \${Object.keys(c.campos).join(', ')}\`).join(' · ')}.\`

function instrucciones(piezas: { id: string; it: Item }[]) {
  return \`Sos el Builder de Confidentally UI, el design system de una app de gestión de clínicas dentales (pacientes, turnos, facturación, clínica, odontograma, recetas, configuración). Trabajás solo: la persona te pide algo en castellano y vos lo armás o lo cambiás en el lienzo.

Te paso el LIENZO ACTUAL (JSON) y lo que pidió antes. Devolvé el diseño ENTERO como tiene que quedar:
- Si pide un cambio sobre lo que hay ("cambiá el título", "sacá la tabla", "agregá un botón", "poné los turnos a la derecha", "hacelo modal", "que tenga 3 columnas"), cambiá SOLO eso y devolvé todo lo demás igual, con los MISMOS "id".
- Si pide algo nuevo y distinto, armalo de cero (sin ids).
- Usá SOLO lo que existe: PIEZAS REALES de la app o BLOQUES editables.

1) PIEZAS REALES ("pieza" = id). id | componente | ejemplo | dónde
\${piezas.map((p) => \`\${p.id} | \${p.it.nombre} | \${p.it.detalle} | \${p.it.lugar}\`).join('\\n')}

2) BLOQUES EDITABLES ("tipo" y sus campos):
\${CAMPOS_BLOQUE}

3) DISEÑO: {"nombre", "contenedor": "app" (pantalla con el menú lateral y la barra de la app) | "card" | "panel" | "page" | "libre" (piezas sueltas o un modal), "tituloPanel", "ancho": "angosto" | "medio" | "completo", "bloques": [...]}

Reglas:
- Una pantalla o página va en "app" y empieza con un encabezado. Un popup o modal va en "libre" con un único bloque "modal". Un formulario suelto va en "card" con encabezado, campos y botones.
- Preferí la PIEZA REAL cuando ya existe algo así (el modal de nuevo paciente, PatientCard, PatientsTable…); si no existe, armalo con bloques.
- "a la derecha" / "al lado" / "a la izquierda" = un bloque "columnas".
- Todo texto de la interfaz en inglés, como la app ("Patients", "New payment", "Save"). Datos de ejemplo realistas de una clínica dental.

Respondé SOLO este JSON: {"resumen": "una oración en castellano rioplatense de lo que hiciste", "cambios": ["cada cosa que hiciste, corta, en castellano"], "diseno": {...}}\`
}

type Crudo = Record<string, unknown>
const esObjeto = (x: unknown): x is Crudo => !!x && typeof x === 'object' && !Array.isArray(x)

/* Lo que hay en el lienzo, en el formato de la IA: los mismos campos, las piezas por su id del catálogo. */
export function aFormatoIA(d: Diseno, idDePieza: (storyId: string) => string | undefined) {
  const bloque = (b: Bloque): Crudo => {
    if (b.tipo === 'pieza') return { id: b.id, tipo: 'pieza', pieza: idDePieza(b.storyId) ?? null, componente: b.componente }
    const x: Crudo = { ...b }
    if (b.tipo === 'tabla') x.columnas = b.columnas.map((c) => c.campo)
    if (b.tipo === 'campos') x.campos = b.campos.map((c) => { const { label, clase, placeholder, opciones, required, hint } = c; return { label, clase, placeholder, opciones, required, hint } })
    if (b.tipo === 'modal' || b.tipo === 'seccion') x.bloques = b.bloques.map(bloque)
    if (b.tipo === 'pestanasContenido') x.pestanas = b.pestanas.map((p) => ({ label: p.label, bloques: p.bloques.map(bloque) }))
    if (b.tipo === 'columnas') x.columnas = b.columnas.map((c) => ({ bloques: c.bloques.map(bloque) }))
    return x
  }
  return { nombre: d.nombre, contenedor: d.contenedor, tituloPanel: d.tituloPanel, ancho: d.ancho, bloques: d.bloques.map(bloque) }
}

/* Valores que no son texto libre: si la IA manda otro, queda el que trae el bloque. */
const ENUMS: Record<string, readonly string[]> = {
  tono: ['normal', 'suave', 'info', 'success', 'warning', 'danger'], alinear: ['inicio', 'fin', 'extremos'],
  variant: ['primary', 'secondary', 'ghost', 'link', 'destructive'], size: ['sm', 'md', 'lg'], ancho: ['sm', 'md', 'lg'],
  clase: ['text', 'select', 'date', 'calendar', 'textarea', 'search'], control: ['switch', 'checkbox'],
  tone: ['success', 'info', 'warning', 'danger', 'neutral', 'purple'], vista: ['Day', 'Week', 'Month'],
  estado: ['', 'Active', 'Inactive'], marca: ['Caries', 'Restoration', 'Planned'], icono: Object.keys(ICONOS),
}
const HIJOS = new Set(['bloques', 'pestanas', 'id', 'tipo'])

/* Copia sobre \`base\` lo que mandó la IA, campo por campo y del mismo tipo; las listas de objetos, como su primer elemento. */
function sobre<T extends Crudo>(base: T, x: Crudo): T {
  const out: Crudo = { ...base }
  for (const [k, v] of Object.entries(base)) {
    if (HIJOS.has(k) || !(k in x)) continue
    const nuevo = x[k]
    if (Array.isArray(v) && Array.isArray(nuevo)) {
      const molde = v[0]
      out[k] = esObjeto(molde) ? nuevo.filter(esObjeto).map((it) => sobre(molde, it)) : nuevo.filter((it) => typeof it === typeof molde)
    } else if (typeof nuevo === typeof v && (typeof v !== 'string' || !ENUMS[k] || ENUMS[k].includes(nuevo as string))) {
      out[k] = nuevo
    } else if (typeof v === 'number' && typeof nuevo === 'string' && Number.isFinite(Number(nuevo))) {
      out[k] = Number(nuevo)
    }
  }
  return out as T
}

/* El diseño que devolvió la IA, como bloques de verdad: todo campo validado, los ids que ya existían se conservan. */
export function desdeFormatoIA(x: unknown, actual: Diseno, porId: Map<string, Item>): Diseno {
  const previos = new Map<string, Bloque>()
  const juntar = (bs: Bloque[]) => bs.forEach((b) => { previos.set(b.id, b); hijosDe(b).forEach(juntar) })
  juntar(actual.bloques)
  const tipos = new Set<string>([...TIPOS.map((t) => t.tipo), 'pieza'])

  const lista = (xs: unknown, dentroDeModal = false): Bloque[] =>
    (Array.isArray(xs) ? xs : []).map((b) => bloque(b, dentroDeModal)).filter((b): b is Bloque => !!b)

  const bloque = (raw: unknown, dentroDeModal: boolean): Bloque | null => {
    if (!esObjeto(raw) || typeof raw.tipo !== 'string' || !tipos.has(raw.tipo)) return null
    const tipo = raw.tipo as TipoBloque
    if (tipo === 'modal' && dentroDeModal) return null
    const previo = typeof raw.id === 'string' ? previos.get(raw.id) : undefined
    const id = previo && previo.tipo === tipo ? previo.id : nuevoId()

    if (tipo === 'pieza') {
      const it = typeof raw.pieza === 'string' ? porId.get(raw.pieza) : undefined
      const hecho = it?.crear()
      if (previo?.tipo === 'pieza' && (!hecho || (hecho.tipo === 'pieza' && hecho.storyId === previo.storyId))) return previo
      return hecho ? { ...hecho, id } : null
    }
    if (tipo === 'tabla') {
      const datos = (typeof raw.datos === 'string' && raw.datos in DATOS ? raw.datos : 'pacientes') as IdConjunto
      const validos = Object.keys(conjunto(datos).campos)
      const pedidos = Array.isArray(raw.columnas) ? raw.columnas.map((c) => (esObjeto(c) ? c.campo : c)).filter((c): c is string => typeof c === 'string' && validos.includes(c)) : []
      const base = tablaDe(datos) as Extract<Bloque, { tipo: 'tabla' }>
      return { ...sobre(base as unknown as Crudo, raw), id, tipo: 'tabla', datos, columnas: pedidos.length ? pedidos.map((c) => columna(datos, c)) : base.columnas } as Bloque
    }
    const base = sobre(infoDe(tipo).nuevo() as unknown as Crudo, raw) as unknown as Bloque
    if (base.tipo === 'campos') {
      const campos = Array.isArray(raw.campos) ? raw.campos.filter(esObjeto) : []
      return { ...base, id, columnas: raw.columnas === 1 ? 1 : 2, campos: campos.length ? campos.map((c) => sobre(campo(), c)).map((c) => ({ ...c, id: nuevoId() })) : base.campos }
    }
    if (base.tipo === 'modal' || base.tipo === 'seccion') return { ...base, id, bloques: lista(raw.bloques, true) }
    if (base.tipo === 'pestanasContenido') {
      const ps = (Array.isArray(raw.pestanas) ? raw.pestanas : []).filter(esObjeto)
      return { ...base, id, pestanas: ps.length ? ps.map((p) => pestana(typeof p.label === 'string' ? p.label : 'Tab', lista(p.bloques, true))) : base.pestanas }
    }
    if (base.tipo === 'columnas') {
      const cs = (Array.isArray(raw.columnas) ? raw.columnas : []).filter(esObjeto)
      const proporcion = (typeof raw.proporcion === 'string' && raw.proporcion in PROPORCIONES ? raw.proporcion : ['1-1', '1-1', '1-1-1', '1-1-1-1'][Math.min(cs.length, 4) - 1] ?? '1-1') as keyof typeof PROPORCIONES
      const n = columnasDe(proporcion)
      return { ...base, id, proporcion, columnas: Array.from({ length: n }, (_, i) => ({ id: nuevoId(), bloques: lista(cs[i]?.bloques, true) })) }
    }
    return { ...base, id } as Bloque
  }

  const d = esObjeto(x) ? x : {}
  const contenedores = ['card', 'panel', 'page', 'libre', 'app'] as const
  const anchos = ['angosto', 'medio', 'completo'] as const
  return {
    nombre: typeof d.nombre === 'string' && d.nombre ? d.nombre : actual.nombre,
    contenedor: contenedores.find((c) => c === d.contenedor) ?? actual.contenedor,
    tituloPanel: typeof d.tituloPanel === 'string' ? d.tituloPanel : actual.tituloPanel,
    ancho: anchos.find((a) => a === d.ancho) ?? actual.ancho,
    bloques: lista(d.bloques),
  }
}

/* ── Gemini ──────────────────────────────────────────────────────────── */

export class ErrorIA extends Error {
  motivo: 'clave' | 'limite' | 'red' | 'respuesta'
  constructor(mensaje: string, motivo: ErrorIA['motivo']) {
    super(mensaje)
    this.motivo = motivo
  }
}

function errorDe(estado: number, cuerpo: { error?: { message?: string; status?: string } } | null): ErrorIA {
  const m = cuerpo?.error?.message ?? ''
  if (estado === 400 && /api key|API_KEY/i.test(m + (cuerpo?.error?.status ?? ''))) return new ErrorIA('Gemini dice que la clave no es válida: hay que renovarla o pegar otra en “Conectar Gemini”.', 'clave')
  if (estado === 401 || estado === 403) return new ErrorIA('Gemini rechazó la clave (¿está habilitada la API o la dieron de baja?).', 'clave')
  if (estado === 429) return new ErrorIA('Se llegó al límite gratis de Gemini por ahora; probá en un rato.', 'limite')
  return new ErrorIA(\`Gemini respondió con un error\${m ? \`: \${m}\` : \` (\${estado})\`}.\`, 'respuesta')
}

/* Llama a Gemini en streaming: los pensamientos van a \`alPensar\` a medida que llegan; devuelve el texto de la respuesta. */
async function llamar(clave: string, cuerpo: string, alPensar: (t: string) => void, senal: AbortSignal): Promise<{ texto: string; modelo: string }> {
  for (const modelo of MODELOS) {
    let r: Response
    try {
      r = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/\${modelo}:streamGenerateContent?alt=sse\`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': clave }, body: cuerpo, signal: senal,
      })
    } catch (e) {
      if (senal.aborted) throw e
      throw new ErrorIA('No se pudo conectar con Gemini (¿sin internet?).', 'red')
    }
    if (r.status === 404) continue
    if (!r.ok || !r.body) throw errorDe(r.status, await r.json().catch(() => null))
    let texto = ''
    let resto = ''
    const lector = r.body.pipeThrough(new TextDecoderStream()).getReader()
    for (;;) {
      const { value, done } = await lector.read()
      if (done) break
      resto += value.replace(/\\r/g, '')
      let corte: number
      while ((corte = resto.indexOf('\\n\\n')) >= 0) {
        const evento = resto.slice(0, corte)
        resto = resto.slice(corte + 2)
        for (const linea of evento.split('\\n')) {
          if (!linea.startsWith('data:')) continue
          const d = JSON.parse(linea.slice(5)) as { candidates?: { content?: { parts?: { text?: string; thought?: boolean }[] } }[] }
          for (const p of d.candidates?.[0]?.content?.parts ?? []) {
            if (p.thought) alPensar(p.text ?? '')
            else if (p.text) texto += p.text
          }
        }
      }
    }
    return { texto, modelo }
  }
  throw new ErrorIA('Ningún modelo gratis de Gemini respondió.', 'respuesta')
}

export type Turno = { pedido: string; resumen: string }

/* Piensa con Gemini sobre el lienzo actual: devuelve el diseño entero, lo que hizo y la lista de cambios. */
export async function pensarDiseno({ clave, pedido, historial, diseno, paleta, alPensar, senal }: {
  clave: string
  pedido: string
  /** Los pedidos anteriores de esta sesión, para entender "eso", "la tabla", "más grande". */
  historial: Turno[]
  diseno: Diseno
  paleta: Seccion[]
  alPensar: (texto: string) => void
  senal: AbortSignal
}): Promise<{ diseno: Diseno; resumen: string; cambios: string[]; modelo: string; edito: boolean }> {
  const { piezas, porId } = catalogoDe(paleta)
  const storyDe = new Map<string, string>()
  const idDePieza = (storyId: string) => {
    if (!storyDe.size) for (const p of piezas) { const b = p.it.crear(); if (b.tipo === 'pieza') storyDe.set(b.storyId, p.id) }
    return storyDe.get(storyId)
  }
  const lienzo = diseno.bloques.length ? JSON.stringify(aFormatoIA(diseno, idDePieza)) : '(vacío)'
  const antes = historial.slice(-6).map((t, i) => \`\${i + 1}. "\${t.pedido}" → \${t.resumen}\`).join('\\n') || '(nada)'
  const cuerpo = JSON.stringify({
    systemInstruction: { parts: [{ text: instrucciones(piezas) }] },
    contents: [{ role: 'user', parts: [{ text: \`LO QUE PIDIÓ ANTES:\\n\${antes}\\n\\nLIENZO ACTUAL:\\n\${lienzo}\\n\\nPEDIDO:\\n\${pedido}\` }] }],
    generationConfig: { responseMimeType: 'application/json', thinkingConfig: { includeThoughts: true } },
  })
  const { texto, modelo } = await llamar(clave, cuerpo, alPensar, senal)
  let r: Crudo
  try {
    r = JSON.parse(texto.replace(/^\`\`\`(?:json)?\\s*|\\s*\`\`\`$/g, '')) as Crudo
  } catch {
    throw new ErrorIA('Gemini devolvió algo que no se pudo leer.', 'respuesta')
  }
  const nuevo = desdeFormatoIA(r.diseno, diseno, porId)
  if (!nuevo.bloques.length) throw new ErrorIA('Gemini no devolvió ningún bloque que exista en la app.', 'respuesta')
  const ids = new Set<string>()
  const juntar = (bs: Bloque[]) => bs.forEach((b) => { ids.add(b.id); hijosDe(b).forEach(juntar) })
  juntar(diseno.bloques)
  const conserva = (bs: Bloque[]): boolean => bs.some((b) => ids.has(b.id) || hijosDe(b).some(conserva))
  return {
    diseno: nuevo,
    resumen: typeof r.resumen === 'string' ? r.resumen : '',
    cambios: Array.isArray(r.cambios) ? r.cambios.filter((c): c is string => typeof c === 'string').slice(0, 8) : [],
    modelo,
    edito: conserva(nuevo.bloques),
  }
}
`})))()}n();export{t as default};