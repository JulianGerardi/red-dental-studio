import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import { TIPOS } from './bloques'
import { DATOS } from './datos'
import type { Item, Seccion } from './paleta'

/* Describe con IA: Gemini (plan gratis) piensa con el catálogo de la app y devuelve un plan en JSON que sólo puede usar
   piezas y bloques que existen; describir.ts (\`desdePlan\`) lo arma. La clave la pega cada persona y queda en su navegador.
   Ver design-reference/design-system.md › Builder. */

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

export type CampoIA = { label: string; control: 'text' | 'select' | 'date' | 'calendar' | 'textarea' | 'search'; opciones: string[]; obligatorio: boolean; placeholder: string }
export type ParteIA = {
  pedido: string
  que: 'pieza' | 'bloque' | 'campos'
  pieza: string | null
  bloque: string | null
  datos: string | null
  texto: string | null
  pestanas: string[] | null
  campos: CampoIA[] | null
  lado: 'derecha' | 'izquierda' | null
  alternativas: string[]
}
export type PlanIA = { tipo: 'pantalla' | 'modal' | 'formulario' | 'suelta'; titulo: string; accion: string; peligro: boolean; resumen: string; partes: ParteIA[] }

/* Cada pieza con un id corto (p1, p2…): menos texto para el modelo y menos lugar para equivocarse. */
export function catalogoDe(paleta: Seccion[]) {
  const piezas = paleta.slice(1).flatMap((s) => s.grupos.flatMap((g) => g.items)).map((it, i) => ({ id: \`p\${i + 1}\`, it }))
  return { piezas, porId: new Map<string, Item>(piezas.map((p) => [p.id, p.it])) }
}

const BLOQUES = TIPOS.map((t) => t.tipo)

function instrucciones(piezas: { id: string; it: Item }[]) {
  return \`Sos el Builder de Confidentally UI, el design system de una app de gestión de clínicas dentales (pacientes, turnos, facturación, clínica, odontograma, recetas, configuración).
La persona describe en castellano algo para armar. Pensá qué necesita y armalo SOLO con lo que existe en la app:

1) PIEZAS REALES (componentes de la app; "pieza" = su id). Formato: id | componente | ejemplo | dónde
\${piezas.map((p) => \`\${p.id} | \${p.it.nombre} | \${p.it.detalle} | \${p.it.lugar}\`).join('\\n')}

2) BLOQUES EDITABLES ("bloque" = su tipo): \${TIPOS.map((t) => \`\${t.tipo} (\${t.nombre}: \${t.que})\`).join('; ')}.
   Para "tabla" poné "datos" en uno de: \${Object.keys(DATOS).join(', ')}. Para "pestanasContenido" poné los nombres en "pestanas". Para "encabezado", "texto" o "vacio" poné el texto en "texto".

3) CAMPOS ("campos" = un formulario): cada campo con label en inglés como la app (First name, Date of birth, Payment method…), control (text, select, date, calendar, textarea, search), opciones si es select o search, obligatorio y placeholder.

Reglas:
- tipo: "pantalla" si pide una pantalla o página (va con el menú lateral y la barra de la app), "modal" si pide popup/modal/ventana, "formulario" si es un formulario suelto, "suelta" si es una sola pieza.
- Preferí la PIEZA REAL cuando ya existe algo así (por ejemplo el modal de nuevo paciente, PatientCard, PatientsTable). Si lo que pide no existe, armalo con bloques y campos.
- Cada parte es un pedazo de lo pedido ("pedido" = ese texto). Si dice "a la derecha" / "al lado" / "a la izquierda", poné "lado".
- "alternativas": hasta 3 ids de otras piezas que también servirían para esa parte.
- titulo en inglés como la app ("Patients", "New payment", "Clinic settings"); accion = el botón principal (o el que abre el modal), en inglés; peligro = true si es para eliminar.
- resumen: una oración en castellano rioplatense de lo que armaste.\`
}

const nulo = (type: string) => ({ type, nullable: true })
const ESQUEMA = {
  type: 'OBJECT',
  properties: {
    tipo: { type: 'STRING', enum: ['pantalla', 'modal', 'formulario', 'suelta'] },
    titulo: { type: 'STRING' },
    accion: { type: 'STRING' },
    peligro: { type: 'BOOLEAN' },
    resumen: { type: 'STRING' },
    partes: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          pedido: { type: 'STRING' },
          que: { type: 'STRING', enum: ['pieza', 'bloque', 'campos'] },
          pieza: nulo('STRING'),
          bloque: { type: 'STRING', enum: BLOQUES, nullable: true },
          datos: { type: 'STRING', enum: Object.keys(DATOS), nullable: true },
          texto: nulo('STRING'),
          pestanas: { type: 'ARRAY', items: { type: 'STRING' }, nullable: true },
          campos: {
            type: 'ARRAY', nullable: true,
            items: {
              type: 'OBJECT',
              properties: {
                label: { type: 'STRING' },
                control: { type: 'STRING', enum: ['text', 'select', 'date', 'calendar', 'textarea', 'search'] },
                opciones: { type: 'ARRAY', items: { type: 'STRING' } },
                obligatorio: { type: 'BOOLEAN' },
                placeholder: { type: 'STRING' },
              },
              required: ['label', 'control', 'opciones', 'obligatorio', 'placeholder'],
            },
          },
          lado: { type: 'STRING', enum: ['derecha', 'izquierda'], nullable: true },
          alternativas: { type: 'ARRAY', items: { type: 'STRING' } },
        },
        required: ['pedido', 'que', 'pieza', 'bloque', 'datos', 'texto', 'pestanas', 'campos', 'lado', 'alternativas'],
      },
    },
  },
  required: ['tipo', 'titulo', 'accion', 'peligro', 'resumen', 'partes'],
}

export class ErrorIA extends Error {
  motivo: 'clave' | 'limite' | 'red' | 'respuesta'
  constructor(mensaje: string, motivo: ErrorIA['motivo']) {
    super(mensaje)
    this.motivo = motivo
  }
}

function errorDe(estado: number, cuerpo: { error?: { message?: string; status?: string } } | null): ErrorIA {
  const m = cuerpo?.error?.message ?? ''
  if (estado === 400 && /api key|API_KEY/i.test(m + (cuerpo?.error?.status ?? ''))) return new ErrorIA('La clave de Gemini no es válida.', 'clave')
  if (estado === 401 || estado === 403) return new ErrorIA('Gemini rechazó la clave (¿está habilitada la API?).', 'clave')
  if (estado === 429) return new ErrorIA('Se llegó al límite gratis de Gemini por ahora; probá en un rato.', 'limite')
  return new ErrorIA(\`Gemini respondió con un error\${m ? \`: \${m}\` : \` (\${estado})\`}.\`, 'respuesta')
}

/* Piensa con Gemini: \`alPensar\` recibe los pensamientos a medida que llegan; devuelve el plan. */
export async function pensar({ clave, pedido, paleta, alPensar, senal }: {
  clave: string
  pedido: string
  paleta: Seccion[]
  alPensar: (texto: string) => void
  senal: AbortSignal
}): Promise<{ plan: PlanIA; porId: Map<string, Item>; modelo: string }> {
  const { piezas, porId } = catalogoDe(paleta)
  const cuerpo = JSON.stringify({
    systemInstruction: { parts: [{ text: instrucciones(piezas) }] },
    contents: [{ role: 'user', parts: [{ text: pedido }] }],
    generationConfig: { responseMimeType: 'application/json', responseSchema: ESQUEMA, thinkingConfig: { includeThoughts: true } },
  })
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
    let json = ''
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
            else if (p.text) json += p.text
          }
        }
      }
    }
    try {
      const plan = JSON.parse(json) as PlanIA
      if (!plan || !Array.isArray(plan.partes)) throw new Error()
      return { plan, porId, modelo }
    } catch {
      throw new ErrorIA('Gemini devolvió algo que no se pudo leer.', 'respuesta')
    }
  }
  throw new ErrorIA('Ningún modelo gratis de Gemini respondió.', 'respuesta')
}
`})))()}n();export{t as default};