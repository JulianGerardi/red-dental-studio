import{n as e}from"./rolldown-runtime-DkW27tQK.js";var t;function n(){return(n=e((()=>{t=`import { normalizar } from '../buscar'
import { EMPLEADOS } from '@/data/employees'
import { INSURANCE, PATIENTS, fullName } from '@/data/mock'
import { PAISES, ESTADOS, ZONAS } from '@/data/location-options'
import { PLANTILLAS, TIPOS, campo, infoDe, nuevoId, pestana, tablaDe, type Bloque, type Campo, type Diseno, type TipoBloque } from './bloques'
import { DATOS, type IdConjunto } from './datos'
import type { ParteIA, PlanIA } from './ia'
import { buscarPiezas, type Item, type Seccion } from './paleta'

const TIPOS_BLOQUE = TIPOS.map((t) => t.tipo)

/* "Describí lo que querés armar": se arma con palabras clave, sin IA, con lo que el Builder sabe de la app — sus piezas
   reales (la paleta), los bloques editables, las tablas con sus datos y los datos de ejemplo para las opciones de los campos.
   La descripción se parte en partes (comas, "y", "a la derecha", "abajo"); cada parte trae su mejor opción y las demás
   quedan para cambiarla. Ver design-reference/design-system.md › Builder. */

export type Opcion = { etiqueta: string; lugar: string; crear: () => Bloque }
export type Parte = { texto: string; opciones: Opcion[]; elegida: number; bloqueId: string }
export type Resultado = { diseno: Diseno; partes: Parte[]; entendido: string; abrir: string | null; plantillas: typeof PLANTILLAS }

/* ── Palabras ───────────────────────────────────────────────────────── */

const RELLENO = new Set(normalizar(\`armame arma armar crea creame haceme hace hacer quiero necesito me gustaria dame traeme mostrame
  un una unos unas el la los las lo de del al a para por que con y e en su sus mi mis se como tipo algo donde este esta esto dia hoy
  pantalla pagina vista screen popup pop up modal ventana dialogo tarjeta card panel formulario form seccion componente
  nuevo nueva nuevos nuevas crear alta registrar cargar agregar anadir sumar agendar editar modificar cambiar eliminar borrar baja\`).split(/\\s+/))

/* Para buscar piezas sí cuentan las palabras que nombran la forma: "tarjeta de paciente", "popup de pago". */
const FORMA = /^(tarjeta|card|panel|modal|popup|dialogo|ventana|formulario|tabla|lista|nuevo|nueva|editar)$/

const INTENCION: [RegExp, string][] = [
  [/\\b(nuev[oa]s?|crear|alta|registrar|cargar|agregar|anadir|sumar|agendar|dar de alta)\\b/, 'New'],
  [/\\b(editar|modificar|cambiar|actualizar)\\b/, 'Edit'],
  [/\\b(eliminar|borrar|dar de baja|baja|cancelar)\\b/, 'Delete'],
]

const INGLES: Record<string, string> = {
  pago: 'payment', pagos: 'payments', cobro: 'charge', cobros: 'charges', paciente: 'patient', pacientes: 'patients', turno: 'appointment',
  turnos: 'appointments', cita: 'appointment', citas: 'appointments', empleado: 'employee', empleados: 'employees', sede: 'location',
  sedes: 'locations', receta: 'prescription', recetas: 'prescriptions', tratamiento: 'treatment', tratamientos: 'treatments',
  seguro: 'insurance', suscripcion: 'subscription', dependiente: 'dependent', sala: 'room', salas: 'rooms', horario: 'hours',
  horarios: 'hours', excepcion: 'exception', consentimiento: 'consent', consentimientos: 'consents', documento: 'document',
  documentos: 'documents', factura: 'invoice', facturacion: 'billing', movimiento: 'transaction', movimientos: 'ledger', cuenta: 'account',
  cuentas: 'accounts', usuario: 'user', usuarios: 'users', rol: 'role', roles: 'roles', agenda: 'schedule', calendario: 'calendar',
  odontograma: 'dental chart', radiografia: 'radiograph', radiografias: 'radiographs', laboratorio: 'lab', orden: 'order',
  alergia: 'allergy', alergias: 'allergies', medicacion: 'medication', nota: 'note', notas: 'notes', tarea: 'task', tareas: 'tasks',
  clinica: 'clinic', configuracion: 'settings', ajustes: 'settings', perfil: 'profile', contacto: 'contact', familia: 'household',
  relacion: 'relationship', relaciones: 'relationships', inicio: 'dashboard', tablero: 'dashboard', reporte: 'report', reportes: 'reports',
  ayuda: 'help', notificaciones: 'notifications', credito: 'credit', ajuste: 'adjustment', presupuesto: 'estimate', plan: 'plan',
  encuentro: 'encounter', consulta: 'visit', vitales: 'vitals', profesional: 'provider', profesionales: 'providers', equipo: 'team',
  preferencias: 'preferences', procedimiento: 'procedure', procedimientos: 'procedures', diagnostico: 'diagnosis', problema: 'problem',
  problemas: 'problems', historia: 'history', historial: 'history', resumen: 'overview', proveedor: 'provider',
  activas: 'active', activos: 'active', inactivas: 'inactive', inactivos: 'inactive', pasadas: 'past', pasados: 'past', proximas: 'upcoming',
  proximos: 'upcoming', todas: 'all', todos: 'all', pendientes: 'pending', completadas: 'completed', completados: 'completed', datos: 'details',
  general: 'general', informacion: 'information', archivos: 'files', pagadas: 'paid', vencidas: 'overdue',
}

/* Una etiqueta en inglés, palabra por palabra si se conocen: "activas" → "Active". */
const enIngles = (s: string) => mayuscula(palabras(normalizar(s)).map((w) => INGLES[w] ?? w).join(' ') || s)

const mayuscula = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const palabras = (n: string) => n.split(/[^a-z0-9]+/).filter(Boolean)

/* El título en inglés, como la app: "registrar un pago" → "New payment", "configuración de la clínica" → "Clinic settings". */
function tituloDe(texto: string): { titulo: string; intencion: string; sustantivo: string } {
  const n = normalizar(texto)
  const intencion = INTENCION.find(([re]) => re.test(n))?.[1] ?? ''
  const ws = palabras(n).filter((w) => !RELLENO.has(w))
  const conocidas = ws.filter((w) => INGLES[w]).map((w) => INGLES[w]!)
  const sustantivos = (conocidas.length ? conocidas : ws).reverse()
  const sustantivo = sustantivos.join(' ')
  return { titulo: mayuscula([intencion, sustantivo].filter(Boolean).join(' ').toLowerCase().trim() || 'Untitled'), intencion, sustantivo }
}

/* ── Campos ─────────────────────────────────────────────────────────── */

const lista = (xs: string[]) => xs.join(', ')
const HORAS = ['08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM']
const PROVIDERS = EMPLEADOS.filter((e) => e.esProvider).map((e) => e.nombre)
const CARGOS = [...new Set([...EMPLEADOS.map((e) => e.cargo), 'Hygienist', 'Front desk', 'Admin'])]

/* Cada clase de dato que la app pide, con su control y sus opciones de ejemplo. Van de lo más largo a lo más corto. */
const CAMPOS: [RegExp, Partial<Campo>][] = [
  [/nacimiento|cumpleanos/, { label: 'Date of birth', clase: 'date', required: true }],
  [/(metodo|forma|medio) de pago/, { label: 'Payment method', clase: 'select', opciones: 'Card payment, Cash payment, Check payment, Electronic payment', required: true }],
  [/codigo postal|\\bzip\\b/, { label: 'ZIP code', placeholder: '33132' }],
  [/zona horaria|huso horario/, { label: 'Timezone', clase: 'select', opciones: lista(ZONAS) }],
  [/(numero de )?(poliza|afiliado|socio)/, { label: 'Member ID', placeholder: 'ABC-123456' }],
  [/obra social|seguro|aseguradora|prepaga|cobertura/, { label: 'Insurance carrier', clase: 'search', opciones: lista(INSURANCE.map((i) => i.carrier)) }],
  [/nombre completo/, { label: 'Full name', placeholder: 'Maria Abril Viola', required: true }],
  [/apellidos?/, { label: 'Last name', placeholder: 'Viola', required: true }],
  [/\\bnombres?\\b/, { label: 'First name', placeholder: 'Maria', required: true }],
  [/correo|e ?mail|\\bmail\\b/, { label: 'Email', placeholder: 'name@mail.com' }],
  [/telefono|celular|\\btel\\b|movil|whatsapp/, { label: 'Phone', placeholder: '(555) 234-5678' }],
  [/direccion|domicilio/, { label: 'Address', placeholder: '123 Biscayne Blvd' }],
  [/ciudad|localidad/, { label: 'City', placeholder: 'Miami' }],
  [/\\bpais\\b/, { label: 'Country', clase: 'select', opciones: lista(PAISES) }],
  [/provincia/, { label: 'State', clase: 'select', opciones: lista(ESTADOS.slice(0, 12)) }],
  [/\\bhoras?\\b|horario/, { label: 'Time', clase: 'select', opciones: lista(HORAS), required: true }],
  [/\\bfechas?\\b|\\bdia\\b/, { label: 'Date', clase: 'calendar', required: true }],
  [/monto|importe|\\btotal\\b|precio|valor|\\bcosto\\b/, { label: 'Amount', placeholder: '$0.00', required: true }],
  [/notas?|observaciones?|comentarios?/, { label: 'Notes', clase: 'textarea', placeholder: 'Anything the front desk should know' }],
  [/descripcion|detalle/, { label: 'Description', clase: 'textarea' }],
  [/motivo|razon/, { label: 'Reason for visit', clase: 'select', opciones: 'Routine cleaning, Emergency (toothache), Check-up, Consultation' }],
  [/\\bsexo\\b|genero/, { label: 'Sex', clase: 'select', opciones: 'Female, Male, Other' }],
  [/\\bestado\\b|\\bstatus\\b/, { label: 'Status', clase: 'select', opciones: 'Active, Inactive' }],
  [/\\b(rol|roles|cargo|puesto)\\b/, { label: 'Role', clase: 'select', opciones: lista(CARGOS), required: true }],
  [/\\bsedes?\\b|ubicacion|sucursal|consultorio|\\bclinica\\b/, { label: 'Location', clase: 'select', opciones: 'Abril - Los Angeles, Abril - New York, Abril - Berlin' }],
  [/profesional|doctor|dentista|odontologo|proveedor|provider/, { label: 'Provider', clase: 'search', opciones: lista(PROVIDERS), placeholder: 'Search by name', required: true }],
  [/\\bpacientes?\\b/, { label: 'Patient', clase: 'search', opciones: lista(PATIENTS.slice(0, 10).map(fullName)), placeholder: 'Search by name', required: true }],
  [/\\bdni\\b|documento|\\bssn\\b|identificacion/, { label: 'ID number' }],
  [/contrasena|password|\\bclave\\b/, { label: 'Password' }],
  [/usuario|username/, { label: 'Username' }],
  [/especialidad/, { label: 'Specialty', clase: 'select', opciones: 'General Dentistry, Orthodontics, Endodontics, Periodontics, Oral Surgery' }],
  [/\\bsala\\b|operatorio|\\bbox\\b/, { label: 'Operatory', clase: 'select', opciones: 'Operatory 1, Operatory 2, Operatory 3' }],
  [/diente|pieza dental/, { label: 'Tooth', clase: 'select', opciones: lista(Array.from({ length: 32 }, (_, i) => String(i + 1))) }],
  [/medicamentos?|droga|farmaco/, { label: 'Medication', clase: 'search', opciones: 'Amoxicillin, Ibuprofen, Paracetamol, Clindamycin, Chlorhexidine 0.12%' }],
  [/dosis/, { label: 'Dose', placeholder: '500 mg' }],
  [/frecuencia/, { label: 'Frequency', clase: 'select', opciones: 'Once daily, Every 12 hours, Every 8 hours, As needed' }],
  [/duracion/, { label: 'Duration', clase: 'select', opciones: '15 min, 30 min, 45 min, 1 hr, 1 hr 30 min' }],
  [/alergias?/, { label: 'Allergies', clase: 'textarea' }],
  [/empresa|compania/, { label: 'Company' }],
  [/idioma|lenguaje/, { label: 'Language', clase: 'select', opciones: 'English, Spanish, Portuguese' }],
  [/moneda/, { label: 'Currency', clase: 'select', opciones: 'USD, EUR, ARS' }],
  [/sitio web|pagina web/, { label: 'Website', placeholder: 'https://' }],
  [/\\bedad\\b/, { label: 'Age' }],
  [/\\btitulo\\b|asunto/, { label: 'Title' }],
]

const ARTICULOS = /^(el|la|los|las|un|una|unos|unas|su|sus|mi|tu)\\s+/
const items = (texto: string) => texto.split(/\\s*(?:,|;|\\/|\\s+y\\s+|\\s+e\\s+)\\s*/).map((x) => x.trim().replace(ARTICULOS, '')).filter(Boolean)

/* Lo que nombra una parte de la pantalla y no un dato: "la tabla de pacientes", "a la derecha los turnos". */
const NO_CAMPO = /\\b(tabla|lista|listado|grilla|pestanas|solapas|tabs|metricas|estadisticas|indicadores|calendario|odontograma|botone?s?|titulo|encabezado|tarjetas?|panel|buscador|aviso|alerta|pasos|paginacion|a la derecha|a la izquierda|al lado|abajo|arriba)\\b/

/* Los campos de una lista ("nombre, email y rol (obligatorio)"): los conocidos con su control; los demás, de texto. */
function camposDe(texto: string): { campos: Campo[]; conocidos: number } {
  let conocidos = 0
  const campos = items(texto).map((it) => {
    const n = normalizar(it)
    const obligatorio = /obligatori|requerid|\\*/.test(n)
    const def = NO_CAMPO.test(n) || palabras(n).length > 5 ? undefined : CAMPOS.find(([re]) => re.test(n))?.[1]
    if (def) conocidos++
    const c = campo(def ?? { label: mayuscula(it.replace(/\\(.*?\\)/g, '').trim()) })
    return obligatorio ? { ...c, required: true } : c
  })
  return { campos, conocidos }
}

/* ── Bloques y piezas ───────────────────────────────────────────────── */

const DATOS_DE: [RegExp, IdConjunto][] = [
  [/pacientes?/, 'pacientes'], [/movimientos?|pagos|cobros|cuenta corriente|ledger|saldo/, 'movimientos'], [/recetas?|prescripcion/, 'recetas'], [/turnos?|citas?|agenda/, 'turnos'],
]
const nuevo = (t: TipoBloque) => () => infoDe(t).nuevo()
const deBloque = (t: TipoBloque, crear: () => Bloque = nuevo(t)): Opcion => ({ etiqueta: infoDe(t).nombre, lugar: 'Bloque editable', crear })

/* Las palabras de UI que ya son un bloque editable. */
function bloqueDe(texto: string): Opcion | null {
  const n = normalizar(texto)
  const tabla = /\\b(tabla|lista|listado|grilla)\\b/.test(n)
  if (tabla) {
    const datos = DATOS_DE.find(([re]) => re.test(n))?.[1] ?? 'pacientes'
    return { etiqueta: \`Table · \${datos}\`, lugar: 'Bloque editable', crear: () => tablaDe(datos) }
  }
  const pestanas = n.match(/\\b(pestanas|solapas|tabs)\\b(?:\\s+(?:de|con|:))?\\s*(.*)/)
  if (pestanas) {
    const labels = items(texto.slice(texto.length - pestanas[2]!.length)).map(enIngles)
    return deBloque('pestanasContenido', () => {
      const b = infoDe('pestanasContenido').nuevo()
      return labels.length > 1 && b.tipo === 'pestanasContenido' ? { ...b, pestanas: labels.map((l) => pestana(l)) } : b
    })
  }
  const reglas: [RegExp, TipoBloque][] = [
    [/\\b(titulo|encabezado|header)\\b/, 'encabezado'], [/\\bbotone?s?\\b|\\bacciones\\b/, 'botones'], [/\\b(franja de metricas|resumen del dia)\\b/, 'metricas'],
    [/\\b(metricas|estadisticas|numeros|indicadores|kpis?)\\b/, 'stats'],
    [/\\b(calendario|agenda|vista semanal)\\b/, 'calendario'], [/\\bodontograma\\b/, 'odontograma'], [/\\breceta\\b/, 'receta'],
    [/\\b(estado vacio|vacio|sin datos)\\b/, 'vacio'], [/\\b(texto|parrafo)\\b/, 'texto'], [/\\b(switch|interruptores|preferencias|opciones)\\b/, 'opciones'],
    [/\\bpago\\b/, 'pago'], [/\\b(horarios? disponibles|slots?|elegir (la )?hora)\\b/, 'horarios'], [/\\b(tareas|pendientes)\\b/, 'tareas'],
    [/\\bturnos (del dia|de hoy|proximos)|proximos turnos\\b/, 'turnos'], [/\\b(datos de contacto|contacto|detalles)\\b/, 'detalles'],
    [/\\b(estados|etiquetas|pills)\\b/, 'pills'], [/\\b(divisor|separador)\\b/, 'divisor'],
    [/\\b(migas|breadcrumb|ruta de navegacion)\\b/, 'migas'], [/\\b(pasos|etapas|stepper|wizard)\\b/, 'pasos'], [/\\b(paginacion|paginado)\\b/, 'paginacion'],
    [/\\b(buscador|barra de busqueda|busqueda|filtros?|toolbar)\\b/, 'busqueda'], [/\\b(aviso|alerta|advertencia|mensaje de (error|exito))\\b/, 'aviso'],
    [/\\b(avatar|persona|perfil)\\b/, 'persona'], [/\\b(operatorios|salas|consultorios)\\b/, 'operatorios'],
    [/\\b(tarjetas|cards) de pacientes\\b/, 'pacientes'], [/\\b(subir|adjuntar|cargar archivos?|upload|archivos)\\b/, 'subir'],
  ]
  const t = reglas.find(([re]) => re.test(n))?.[1]
  if (!t) return null
  if (t === 'encabezado') {
    const { titulo } = tituloDe(texto.replace(/t[ií]tulo|encabezado|header/gi, ''))
    return deBloque('encabezado', () => ({ ...infoDe('encabezado').nuevo(), titulo } as Bloque))
  }
  return deBloque(t)
}

const dePieza = (it: Item): Opcion => ({ etiqueta: it.detalle && it.detalle !== it.nombre ? \`\${it.nombre} · \${it.detalle}\` : it.nombre, lugar: it.lugar, crear: it.crear })

/* Las piezas reales que coinciden, una por componente. Si ninguna tiene todas las palabras, se prueba sacando una, y
   después con cada palabra sola ("turnos del día" → los de turnos). */
function piezasDe(paleta: Seccion[], texto: string, max = 4): Opcion[] {
  const ws = palabras(normalizar(texto)).filter((w) => w.length > 1 && (!RELLENO.has(w) || FORMA.test(w)))
  if (!ws.length) return []
  let hallados = buscarPiezas(paleta, ws.join(' '))
  for (let i = 0; !hallados.length && ws.length > 1 && i < ws.length; i++) hallados = buscarPiezas(paleta, ws.filter((_, j) => j !== i).join(' '))
  for (const w of [...ws].sort((a, b) => b.length - a.length)) if (!hallados.length && !FORMA.test(w) && w.length > 3) hallados = buscarPiezas(paleta, w)
  const vistas = new Set<string>()
  return hallados.filter((it) => {
    const k = it.nombre
    if (vistas.has(k)) return false
    vistas.add(k)
    return true
  }).slice(0, max).map(dePieza)
}

/* Las opciones de una parte: un bloque si nombra uno (tabla, botones, métricas…), si no la pieza real que más se parece.
   Las piezas se buscan con \`sobre\` si se da (para un formulario, lo que se pide y no sus campos). */
function opcionesDe(paleta: Seccion[], texto: string, sobre = texto): Opcion[] {
  const { campos, conocidos } = camposDe(texto)
  const esLista = conocidos >= 2 && conocidos >= items(texto).length * 0.6
  const bloque = esLista ? null : bloqueDe(texto)
  const piezas = piezasDe(paleta, sobre)
  const opciones: Opcion[] = []
  if (esLista) opciones.push({ etiqueta: \`Fields · \${campos.map((c) => c.label).join(', ')}\`, lugar: 'Bloque editable', crear: () => ({ id: nuevoId(), tipo: 'campos', columnas: campos.length > 3 ? 2 : 1, campos: camposDe(texto).campos }) })
  if (bloque) opciones.push(bloque)
  opciones.push(...piezas)
  if (!opciones.length) opciones.push({ etiqueta: \`Section · \${mayuscula(texto)}\`, lugar: 'Bloque editable', crear: () => ({ id: nuevoId(), tipo: 'seccion', titulo: mayuscula(texto), bloques: [] }) })
  return opciones
}

/* ── Armar ──────────────────────────────────────────────────────────── */

type Trozo = { texto: string; lado: 'derecha' | 'izquierda' | null }

/* Las partes de una descripción, con "a la derecha" / "al lado" / "a la izquierda" para ponerlas en columnas. */
function trozos(texto: string): Trozo[] {
  const marcado = texto
    .replace(/\\s*[,;]\\s*(?:y\\s+)?/g, '|')
    .replace(/\\s+y\\s+(?=(?:a la |al lado|abajo|arriba|debajo|despu[eé]s|luego|una? |el |la |los |las ))/gi, '|')
    .replace(/\\s+(?=(?:abajo|debajo|despu[eé]s|luego)\\b)/gi, '|')
  const crudos = marcado.split('|').map((t) => t.trim()).filter(Boolean)
  /* "pestañas de activas, historial y la tabla": lo corto que sigue a las pestañas son sus nombres, hasta algo con artículo. */
  for (let i = 0; i < crudos.length - 1; i++) {
    if (!/pesta[nñ]as|solapas|\\btabs\\b/i.test(crudos[i]!)) continue
    while (i + 1 < crudos.length && crudos[i + 1]!.split(/\\s+/).length <= 2 && !ARTICULOS.test(\`\${crudos[i + 1]} \`) && !bloqueDe(crudos[i + 1]!)) {
      crudos[i] = \`\${crudos[i]}, \${crudos.splice(i + 1, 1)[0]}\`
    }
  }
  return crudos.map((t) => {
    const n = normalizar(t)
    const lado: Trozo['lado'] = /^(a la derecha|al lado)|a la derecha$|al costado/.test(n) ? 'derecha' : /^a la izquierda|a la izquierda$/.test(n) ? 'izquierda' : null
    const limpio = t.replace(/^(?:y\\s+)?(?:a la (?:derecha|izquierda)|al lado|al costado|abajo|debajo|arriba|despu[eé]s|luego)(?:\\s+de\\s+(?:eso|todo|esto))?[,:]?\\s*/i, '').replace(/\\s+a la (?:derecha|izquierda)$/i, '')
    return { texto: limpio, lado }
  }).filter((t) => t.texto)
}

/* Lo que va antes de la lista ("un popup para registrar un pago") y la lista ("fecha, monto y notas"). */
function partir(texto: string): { cabeza: string; resto: string } {
  const m = texto.match(/^(.*?)(?::|\\s+(?:con|que (?:tenga|tengan|muestre|incluya|pida)|donde (?:haya|este|se vea)|with)\\s+)(.*)$/i)
  return m ? { cabeza: m[1]!.trim(), resto: m[2]!.trim() } : { cabeza: texto.trim(), resto: '' }
}

export function describir(texto: string, paleta: Seccion[]): Resultado | null {
  const n = normalizar(texto).trim()
  if (!n) return null
  const { cabeza, resto } = partir(texto.trim())
  const nc = normalizar(cabeza)
  const pideModal = /\\b(popup|pop up|modal|ventana|dialogo)\\b/.test(nc)
  const pidePantalla = /\\b(pantalla|pagina|vista|screen)\\b/.test(nc)
  const pideTarjeta = /\\b(tarjeta|card)\\b/.test(nc)
  const pidePanel = /\\bpanel\\b/.test(nc)
  const { titulo, intencion, sustantivo } = tituloDe(cabeza)
  const partes: Parte[] = []
  const parte = (textoParte: string, opciones: Opcion[]): Bloque => {
    const b = opciones[0]!.crear()
    partes.push({ texto: textoParte, opciones, elegida: 0, bloqueId: b.id })
    return b
  }
  const plantillas = PLANTILLAS.filter((p) => {
    const donde = normalizar(\`\${p.nombre} \${p.que}\`)
    return palabras(nc).filter((w) => w.length > 3 && !RELLENO.has(w) && donde.includes(w)).length >= 1 && !resto
  }).slice(0, 3)

  /* Un popup: con una lista, se arma con sus campos (y la pieza real parecida queda de opción); sin lista, la pieza real. */
  if (pideModal) {
    const { campos, conocidos } = camposDe(resto)
    const bloqueCabeza = bloqueDe(cabeza.replace(/\\b(popup|pop up|modal|ventana|di[aá]logo)\\b/gi, ''))
    const adentro: () => Bloque[] = () =>
      conocidos ? [{ id: nuevoId(), tipo: 'campos', columnas: campos.length > 3 ? 2 : 1, campos: camposDe(resto).campos }]
      : intencion === 'Delete' ? [{ id: nuevoId(), tipo: 'texto', texto: \`Are you sure you want to delete this \${sustantivo || 'item'}? This can’t be undone.\`, tono: 'normal' }]
      : bloqueCabeza ? [bloqueCabeza.crear()] : []
    const accion = intencion === 'Delete' ? 'Delete' : intencion === 'Edit' ? 'Edit' : 'Add'
    const armado: Opcion = {
      etiqueta: \`Modal · \${titulo}\`, lugar: 'Bloque editable',
      crear: () => ({
        id: nuevoId(), tipo: 'modal', titulo, disparador: \`\${accion} \${sustantivo || 'item'}\`.trim(), ancho: campos.length > 4 ? 'lg' : 'md',
        confirmar: intencion === 'Delete' ? 'Delete' : 'Save', cancelar: 'Cancel', peligro: intencion === 'Delete', bloques: adentro(),
      }),
    }
    const reales = piezasDe(paleta, cabeza)
    const opciones = conocidos || intencion === 'Delete' || !reales.length ? [armado, ...reales] : [...reales, armado]
    const b = parte(cabeza, opciones)
    return {
      diseno: { nombre: titulo, contenedor: 'libre', tituloPanel: '', ancho: 'completo', bloques: [b] }, partes, plantillas,
      abrir: b.tipo === 'modal' ? b.id : null,
      entendido: conocidos ? \`Un modal “\${titulo}” con \${campos.length} campos.\` : \`El modal que más se parece: \${opciones[0]!.etiqueta}.\`,
    }
  }

  /* Una lista de campos sola ("formulario de nuevo empleado con nombre, email y rol"): una card con el formulario y sus botones. */
  const { campos, conocidos } = camposDe(resto)
  if (resto && conocidos >= 2 && conocidos >= items(resto).length * 0.6 && !pidePantalla) {
    const bloques: Bloque[] = [
      { id: nuevoId(), tipo: 'encabezado', titulo, bajada: '', accion: '', icono: 'none' },
      parte(resto, opcionesDe(paleta, resto, cabeza)),
      { id: nuevoId(), tipo: 'botones', alinear: 'fin', botones: [{ label: 'Cancel', variant: 'secondary', size: 'lg', icono: 'none' }, { label: intencion === 'Edit' ? 'Save changes' : 'Save', variant: 'primary', size: 'lg', icono: 'none' }] },
    ]
    return {
      diseno: { nombre: titulo, contenedor: pidePanel ? 'panel' : 'card', tituloPanel: titulo, ancho: campos.length > 3 ? 'medio' : 'angosto', bloques }, partes, plantillas, abrir: null,
      entendido: \`Un formulario “\${titulo}” con \${campos.length} campos y sus botones.\`,
    }
  }

  const botones = (): Bloque => ({ id: nuevoId(), tipo: 'botones', alinear: 'fin', botones: [{ label: 'Cancel', variant: 'secondary', size: 'lg', icono: 'none' }, { label: 'Save changes', variant: 'primary', size: 'lg', icono: 'none' }] })

  /* Una pantalla que es un formulario ("pantalla de configuración con nombre, teléfono…"): encabezado, sección y botones. */
  if (pidePantalla && resto && conocidos >= 2 && conocidos >= items(resto).length * 0.6) {
    const seccion: Bloque = { id: nuevoId(), tipo: 'seccion', titulo: 'General', bloques: [parte(resto, opcionesDe(paleta, resto, cabeza))] }
    return {
      diseno: { nombre: \`\${titulo} screen\`, contenedor: 'app', tituloPanel: '', ancho: 'completo', bloques: [{ id: nuevoId(), tipo: 'encabezado', titulo, bajada: '', accion: '', icono: 'none' }, seccion, botones()] },
      partes, plantillas, abrir: null, entendido: \`Una pantalla “\${titulo}” con un formulario de \${campos.length} campos y sus botones.\`,
    }
  }

  /* Una pantalla (o varias partes): encabezado y cada parte en su lugar; "a la derecha" arma columnas. */
  const lista = resto ? trozos(resto) : []
  if (!lista.length) {
    const opciones = opcionesDe(paleta, cabeza)
    if (!pidePantalla) {
      /* Nada que se parezca a una pieza, un bloque o un campo: mejor decirlo que inventar. */
      if (opciones.length === 1 && opciones[0]!.etiqueta.startsWith('Section ·') && !pideTarjeta && !pidePanel) return null
      const b = parte(cabeza, opciones)
      const suelta = b.tipo === 'pieza'
      return {
        diseno: { nombre: titulo, contenedor: suelta ? 'libre' : pideTarjeta || pidePanel ? (pidePanel ? 'panel' : 'card') : 'card', tituloPanel: titulo, ancho: suelta ? 'completo' : 'medio', bloques: [b] },
        partes, plantillas, abrir: null, entendido: \`\${opciones[0]!.etiqueta}\${opciones.length > 1 ? \`, con \${opciones.length - 1} opciones más\` : ''}.\`,
      }
    }
    /* "La pantalla de pacientes": el encabezado y las piezas principales de ese módulo. */
    for (const o of piezasDe(paleta, cabeza, 6).slice(0, 2)) lista.push({ texto: o.etiqueta, lado: null })
  }
  const bloques: Bloque[] = [{ id: nuevoId(), tipo: 'encabezado', titulo, bajada: '', accion: intencion === 'New' ? \`New \${sustantivo}\` : '', icono: intencion === 'New' ? 'Plus' : 'none' }]
  for (const t of lista) {
    const b = parte(t.texto, opcionesDe(paleta, t.texto))
    const anterior = bloques[bloques.length - 1]
    if (t.lado && anterior && anterior.tipo !== 'encabezado') {
      bloques.pop()
      const [izq, der] = t.lado === 'derecha' ? [anterior, b] : [b, anterior]
      bloques.push({ id: nuevoId(), tipo: 'columnas', proporcion: t.lado === 'derecha' ? '2-1' : '1-2', columnas: [{ id: nuevoId(), bloques: [izq] }, { id: nuevoId(), bloques: [der] }] })
    } else bloques.push(b)
  }
  const nombres = partes.map((p, i) => \`\${lista[i]?.lado ? \`a la \${lista[i]!.lado}, \` : ''}\${p.opciones[0]!.etiqueta}\`)
  return {
    diseno: { nombre: \`\${titulo} screen\`, contenedor: 'app', tituloPanel: '', ancho: 'completo', bloques }, partes, plantillas, abrir: null,
    entendido: \`Una pantalla “\${titulo}” con \${nombres.join('; ')}.\`,
  }
}

/* ── Con IA ─────────────────────────────────────────────────────────── */

/* Un bloque del plan de la IA, con sus datos (tabla), pestañas o texto. */
function bloqueIA(p: ParteIA): Opcion | null {
  const t = TIPOS_BLOQUE.find((x) => x === p.bloque)
  if (!t) return null
  if (t === 'tabla') {
    const datos = (p.datos && p.datos in DATOS ? p.datos : 'pacientes') as IdConjunto
    return { etiqueta: \`Table · \${datos}\`, lugar: 'Bloque editable', crear: () => tablaDe(datos) }
  }
  return deBloque(t, () => {
    const b = infoDe(t).nuevo()
    if (b.tipo === 'pestanasContenido' && p.pestanas && p.pestanas.length > 1) return { ...b, pestanas: p.pestanas.map((l) => pestana(l)) }
    if (b.tipo === 'encabezado' && p.texto) return { ...b, titulo: p.texto }
    if (b.tipo === 'texto' && p.texto) return { ...b, texto: p.texto }
    if (b.tipo === 'vacio' && p.texto) return { ...b, titulo: p.texto }
    return b
  })
}

/* Las opciones de una parte del plan: lo que eligió la IA, sus alternativas y, por las dudas, lo que da el motor sin IA. */
function opcionesIA(p: ParteIA, porId: Map<string, Item>, paleta: Seccion[]): Opcion[] {
  const out: Opcion[] = []
  if (p.que === 'campos' && p.campos?.length) {
    const campos = p.campos
    out.push({
      etiqueta: \`Fields · \${campos.map((c) => c.label).join(', ')}\`, lugar: 'Bloque editable',
      crear: () => ({
        id: nuevoId(), tipo: 'campos', columnas: campos.length > 3 ? 2 : 1,
        campos: campos.map((c) => campo({ label: c.label, clase: c.control, opciones: c.opciones.join(', '), required: c.obligatorio, placeholder: c.placeholder })),
      }),
    })
  }
  const bloque = p.que === 'bloque' ? bloqueIA(p) : null
  if (bloque) out.push(bloque)
  const pieza = p.pieza ? porId.get(p.pieza) : undefined
  if (pieza) out.push(dePieza(pieza))
  for (const id of p.alternativas) {
    const it = porId.get(id)
    if (it) out.push(dePieza(it))
  }
  out.push(...opcionesDe(paleta, p.pedido))
  const vistas = new Set<string>()
  return out.filter((o) => !vistas.has(o.etiqueta) && vistas.add(o.etiqueta))
}

/* Arma el plan que devolvió la IA con las mismas reglas que el motor sin IA: pantalla con App y columnas, modal, formulario. */
export function desdePlan(plan: PlanIA, porId: Map<string, Item>, paleta: Seccion[]): Resultado {
  const partes: Parte[] = []
  const hechos = plan.partes.map((p) => {
    const opciones = opcionesIA(p, porId, paleta)
    const b = opciones[0]!.crear()
    partes.push({ texto: p.pedido, opciones, elegida: 0, bloqueId: b.id })
    return { b, lado: p.lado }
  })
  const titulo = plan.titulo || 'Untitled'
  const base = { partes, plantillas: [], entendido: plan.resumen }
  const botones = (): Bloque => ({ id: nuevoId(), tipo: 'botones', alinear: 'fin', botones: [{ label: 'Cancel', variant: 'secondary', size: 'lg', icono: 'none' }, { label: plan.accion || 'Save', variant: plan.peligro ? 'destructive' : 'primary', size: 'lg', icono: 'none' }] })

  if (plan.tipo === 'modal') {
    if (hechos.length === 1 && hechos[0]!.b.tipo === 'pieza') return { ...base, diseno: { nombre: titulo, contenedor: 'libre', tituloPanel: '', ancho: 'completo', bloques: [hechos[0]!.b] }, abrir: null }
    const modal: Bloque = {
      id: nuevoId(), tipo: 'modal', titulo, disparador: plan.accion || \`Add \${titulo.replace(/^New /, '').toLowerCase()}\`, ancho: hechos.length > 1 ? 'lg' : 'md',
      confirmar: plan.peligro ? 'Delete' : 'Save', cancelar: 'Cancel', peligro: plan.peligro, bloques: hechos.map((h) => h.b),
    }
    return { ...base, diseno: { nombre: titulo, contenedor: 'libre', tituloPanel: '', ancho: 'completo', bloques: [modal] }, abrir: modal.id }
  }
  if (plan.tipo === 'formulario') {
    const bloques: Bloque[] = [{ id: nuevoId(), tipo: 'encabezado', titulo, bajada: '', accion: '', icono: 'none' }, ...hechos.map((h) => h.b), botones()]
    return { ...base, diseno: { nombre: titulo, contenedor: 'card', tituloPanel: titulo, ancho: 'medio', bloques }, abrir: null }
  }
  if (plan.tipo === 'suelta') {
    const suelta = hechos.every((h) => h.b.tipo === 'pieza')
    return { ...base, diseno: { nombre: titulo, contenedor: suelta ? 'libre' : 'card', tituloPanel: '', ancho: suelta ? 'completo' : 'medio', bloques: hechos.map((h) => h.b) }, abrir: null }
  }
  const bloques: Bloque[] = [{ id: nuevoId(), tipo: 'encabezado', titulo, bajada: '', accion: plan.accion, icono: plan.accion ? 'Plus' : 'none' }]
  for (const { b, lado } of hechos) {
    const anterior = bloques[bloques.length - 1]
    if (lado && anterior && anterior.tipo !== 'encabezado') {
      bloques.pop()
      const [izq, der] = lado === 'derecha' ? [anterior, b] : [b, anterior]
      bloques.push({ id: nuevoId(), tipo: 'columnas', proporcion: lado === 'derecha' ? '2-1' : '1-2', columnas: [{ id: nuevoId(), bloques: [izq] }, { id: nuevoId(), bloques: [der] }] })
    } else bloques.push(b)
  }
  return { ...base, diseno: { nombre: \`\${titulo} screen\`, contenedor: 'app', tituloPanel: '', ancho: 'completo', bloques }, abrir: null }
}
`})))()}n();export{t as default};