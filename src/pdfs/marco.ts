/* Marco único de los PDFs: una hoja A4 (membrete, tipo y título, resumen, secciones numeradas, firmas y pie) con el
   diseño de ui/document-sheet, y bloques fijos para el contenido. El backend la completa con Mustache (sólo variables,
   listas y secciones vacías/llenas) y la pasa a PDF con un motor HTML (Chromium, WeasyPrint…). Las decisiones, en
   design-reference/figma/modulos/pdfs.md. */
import { diagramaBoca } from '../lib/diagramaBoca.ts'
import type { Denticion } from '../data/laboratorios.ts'

/* Colores de los tokens de @theme (src/index.css), en hex: la plantilla vive fuera de la app. */
export const COLOR = {
  marca: '#1d56bc', // dash-blue
  tinta: '#09090b', // ink
  texto: '#3f3f46', // ink-soft
  apagado: '#71717a', // ink-muted
  tenue: '#a1a1aa', // ink-faint
  linea: '#e7e7e7', // line-row
  caja: '#f4f4f5', // surface-muted
  encia: '#f8d5d1', // encia
  diente: '#6390f0', // diente elegido del diagrama (como el PDF de la app)
  franja: '#e8eef8', // brand-tint
} as const

const FUENTE = "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif"

/* ── Bloques de contenido ── */

/** Un dato: rótulo y valor (texto con {{variables}}). */
export type Campo = [rotulo: string, valor: string]
/** Columna de una tabla: encabezado, valor de cada fila y si se alinea a la derecha (importes). */
export type Columna = { titulo: string; valor: string; derecha?: boolean; ancho?: string }

export type Bloque =
  | { tipo: 'campos'; campos: Campo[] }
  | { tipo: 'texto'; texto: string }
  /** Texto con formato que viene del editor de la app (notas, texto del consentimiento): va sin escapar, {{{var}}}. */
  | { tipo: 'html'; variable: string }
  | { tipo: 'nota'; texto: string }
  | { tipo: 'lista'; lista: string; valor: string; vacio: string; rotulo?: string }
  /** `subtotal`: una fila al pie con un rótulo y un importe por cada una de las últimas columnas. */
  | { tipo: 'tabla'; lista: string; columnas: Columna[]; vacio: string; subtotal?: { rotulo: string; valores: string[] } }
  /** Una tabla por grupo (visitas del treatment plan, exámenes y casos de la nota): título, un dato a la derecha y una
      nota debajo de la tabla. */
  | { tipo: 'grupos'; lista: string; titulo: string; detalle?: string; nota?: string; tabla: Omit<Extract<Bloque, { tipo: 'tabla' }>, 'tipo'> }
  /** Los importes de un documento, alineados a la derecha; la última fila es lo que paga el paciente. El mismo bloque en
      el treatment plan y en el consentimiento de aceptación. */
  | { tipo: 'importes'; filas: Campo[]; nota?: string }
  /** Datos sueltos en cuadros, como el resumen (los vitales de la nota). */
  | { tipo: 'cuadros'; lista: string; rotulo: string; valor: string; vacio: string }
  /** Textos con título y fecha (las narrativas de los cuestionarios y de los workflows). */
  | { tipo: 'narrativas'; lista: string; titulo: string; detalle?: string; texto: string; vacio?: string }
  /** Un subtítulo adentro de una sección. */
  | { tipo: 'subtitulo'; texto: string }
  /** Una caja por ítem (cada medicamento de la receta). */
  | { tipo: 'tarjetas'; lista: string; titulo: string; campos: Campo[] }
  | { tipo: 'imagenes'; lista: string; imagen: string; titulo: string; detalle: string; vacio: string }
  /** Casillas que marca el paciente al firmar: marcadas si `marcada` tiene valor. */
  | { tipo: 'casillas'; items: string[]; marcada: string; aviso?: string }
  /** El diagrama de la boca con los dientes de `lista` en azul y, al lado, cada diente con sus superficies. Los campos de
      cada ítem se llaman `tooth` y `surfaces`; la dentición (Permanent o Primary) va en `denticion`. */
  | { tipo: 'boca'; lista: string; denticion: string }

/** `si`: la sección sólo sale si esa variable o lista tiene valor (la nota clínica no muestra lo que no pasó en la
    visita). Los números salen con un contador de CSS, así que una sección que no sale no deja un hueco. */
export type Seccion = { titulo: string; bloques: Bloque[]; si?: string }
/** Quién firma: `prefijo` arma las variables {{<prefijo>_name}}, {{<prefijo>_signed_date}} y {{<prefijo>_signature_image}}. */
export type Firma = { rol: string; prefijo: string }

export type Hoja = {
  /** El tipo, chico y en azul: "Dental clinical note". */
  tipo: string
  titulo: string
  /** A la derecha del membrete: rótulo y fecha. */
  meta: Campo
  resumen: Campo[]
  secciones: Seccion[]
  firmas?: Firma[]
  /** Un aviso debajo del título (la nota generada sola al cerrarse el encounter). */
  aviso?: string
  /** Secciones que van después de las firmas (las adendas de la nota: se suman una vez firmada). */
  posdata?: Seccion[]
  /** Lista de adjuntos que van como anexo, cada uno en su hoja: `annex_label`, `name`, `file_type`, `is_image`,
      `file_url`. Las imágenes se ven en la hoja; un PDF adjunto lo agrega el backend después de su hoja. */
  anexos?: string
  /** Lo que dice el pie de cada página después del nombre de la clínica. */
  pie: string
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const campos = (cs: Campo[]) => `<dl class="campos">${cs.map(([r, v]) => `<div><dt>${esc(r)}:</dt> <dd>${v}</dd></div>`).join('')}</dl>`

function tabla({ lista, columnas, vacio, subtotal }: Omit<Extract<Bloque, { tipo: 'tabla' }>, 'tipo'>) {
  const clase = (c: Columna) => (c.derecha ? ' class="der"' : '')
  return `<table class="tabla">
<thead><tr>${columnas.map((c) => `<th${clase(c)}${c.ancho ? ` style="width:${c.ancho}"` : ''}>${esc(c.titulo)}</th>`).join('')}</tr></thead>
<tbody>{{#${lista}}}<tr>${columnas.map((c) => `<td${clase(c)}>${c.valor}</td>`).join('')}</tr>{{/${lista}}}
{{^${lista}}}<tr><td class="vacio" colspan="${columnas.length}">${esc(vacio)}</td></tr>{{/${lista}}}</tbody>${subtotal ? `
<tfoot><tr><td colspan="${columnas.length - subtotal.valores.length}">${subtotal.rotulo}</td>${subtotal.valores.map((v) => `<td class="der">${v}</td>`).join('')}</tr></tfoot>` : ''}
</table>`
}

/* El diagrama en SVG de las dos denticiones; la plantilla muestra la que diga {{dentition}} y pinta los dientes de la
   lista con CSS (Mustache no tiene condicionales por diente). Mismo dibujo que la hoja y el PDF de la app. */
function svgBoca(denticion: Denticion) {
  const g = diagramaBoca(denticion)
  const n = (x: number) => x.toFixed(1)
  const arcadas = g.arcadas.map((a) => `<polyline points="${a.encia.map(([x, y]) => `${n(x)},${n(y)}`).join(' ')}" fill="none" stroke="${COLOR.encia}" stroke-width="${g.tam + 7}" stroke-linecap="round" stroke-linejoin="round"/>
<text x="${n(a.cx)}" y="${n(a.cy + 3)}" text-anchor="middle" class="arcada">${a.nombre}</text>
${a.dientes.map((t) => `<g data-tooth="${t.d}"><rect class="pieza" x="${n(t.x - g.tam / 2)}" y="${n(t.y - g.tam / 2)}" width="${g.tam}" height="${g.tam}" rx="${n(g.tam * 0.35)}"/><text x="${n(t.lx)}" y="${n(t.ly + 2.5)}" text-anchor="middle" class="num">${t.d}</text></g>`).join('')}`).join('\n')
  return `<svg data-d="${denticion}" viewBox="0 0 ${g.ancho} ${n(g.alto)}" width="${g.ancho}" height="${n(g.alto)}" role="img" aria-label="${denticion} dentition">${arcadas}</svg>`
}

function bloque(b: Bloque): string {
  switch (b.tipo) {
    case 'campos': return campos(b.campos)
    case 'texto': return `<p>${b.texto}</p>`
    case 'html': return `<div class="prosa">{{{${b.variable}}}}</div>`
    case 'nota': return `<p class="nota">${b.texto}</p>`
    case 'lista': return `${b.rotulo ? `<p class="rotulo">${esc(b.rotulo)}</p>` : ''}<ul class="lista">{{#${b.lista}}}<li>${b.valor}</li>{{/${b.lista}}}{{^${b.lista}}}<li>${esc(b.vacio)}</li>{{/${b.lista}}}</ul>`
    case 'tabla': return tabla(b)
    case 'grupos': return `{{#${b.lista}}}<div class="grupo"><p class="grupo-titulo"><span>${b.titulo}</span>${b.detalle ? `<span class="grupo-detalle">${b.detalle}</span>` : ''}</p>${tabla(b.tabla)}${b.nota ? `<p class="grupo-nota">${b.nota}</p>` : ''}</div>{{/${b.lista}}}`
    case 'importes': return `<div class="importes"><dl>${b.filas.map(([r, v]) => `<div><dt>${esc(r)}</dt><dd>${v}</dd></div>`).join('')}</dl>${b.nota ? `<p class="nota">${esc(b.nota)}</p>` : ''}</div>`
    case 'cuadros': return `<dl class="cuadros">{{#${b.lista}}}<div><dt>${b.rotulo}</dt><dd>${b.valor}</dd></div>{{/${b.lista}}}</dl>{{^${b.lista}}}<p class="nota">${esc(b.vacio)}</p>{{/${b.lista}}}`
    case 'narrativas': return `{{#${b.lista}}}<div class="narrativa"><p class="narrativa-titulo">${b.titulo}${b.detalle ? `<span>${b.detalle}</span>` : ''}</p><p>${b.texto}</p></div>{{/${b.lista}}}${b.vacio ? `{{^${b.lista}}}<p class="nota">${esc(b.vacio)}</p>{{/${b.lista}}}` : ''}`
    case 'subtitulo': return `<h3>${esc(b.texto)}</h3>`
    case 'tarjetas': return `{{#${b.lista}}}<div class="tarjeta"><p class="tarjeta-titulo">${b.titulo}</p>${campos(b.campos)}</div>{{/${b.lista}}}`
    case 'imagenes': return `<div class="imagenes">{{#${b.lista}}}<figure><img src="${b.imagen}" alt="${b.titulo}"><figcaption><b>${b.titulo}</b><span>${b.detalle}</span></figcaption></figure>{{/${b.lista}}}</div>{{^${b.lista}}}<p class="nota">${esc(b.vacio)}</p>{{/${b.lista}}}`
    case 'casillas': return `<ul class="casillas">${b.items.map((i) => `<li><span class="casilla{{#${b.marcada}}} marcada{{/${b.marcada}}}">{{#${b.marcada}}}<svg viewBox="0 0 10 10" width="8" height="8"><path d="M2 5.2 4.2 7.4 8 2.8" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>{{/${b.marcada}}}</span>${esc(i)}</li>`).join('')}</ul>${b.aviso ? `<p class="nota">${esc(b.aviso)}</p>` : ''}`
    case 'boca': return `<style>{{#${b.lista}}}.boca [data-tooth="{{tooth}}"] .pieza{fill:${COLOR.diente};stroke:${COLOR.marca}}{{/${b.lista}}}</style>
<div class="boca" data-dentition="${b.denticion}"><div class="dibujo">${svgBoca('Permanent')}${svgBoca('Primary')}</div>
<dl class="campos">{{#${b.lista}}}<div><dt>Tooth {{tooth}}{{#surfaces}}:{{/surfaces}}</dt> <dd>{{surfaces}}</dd></div>{{/${b.lista}}}</dl></div>`
  }
}

function firma({ rol, prefijo: p }: Firma) {
  return `<div class="firma">
<div class="trazo">{{#${p}_signed_date}}{{#${p}_signature_image}}<img src="{{${p}_signature_image}}" alt="Signature of {{${p}_name}}">{{/${p}_signature_image}}{{^${p}_signature_image}}<span class="escrita">{{${p}_name}}</span>{{/${p}_signature_image}}{{/${p}_signed_date}}{{^${p}_signed_date}}<span class="pendiente">Pending signature</span>{{/${p}_signed_date}}</div>
<b>{{${p}_name}} · ${esc(rol)}</b>
<span>{{#${p}_signed_date}}Signed electronically · {{${p}_signed_date}}{{/${p}_signed_date}}{{^${p}_signed_date}}Not signed yet{{/${p}_signed_date}}</span>
</div>`
}

const ESTILOS = `
@page { size: A4; margin: 18mm 18mm 20mm;
  @bottom-left { content: "{{{practice_name}}} · PIE · {{{patient_name}}}"; font: 7pt ${FUENTE}; color: ${COLOR.tenue}; }
  @bottom-right { content: "Page " counter(page) " of " counter(pages); font: 7pt ${FUENTE}; color: ${COLOR.tenue}; }
}
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font-family: ${FUENTE}; font-size: 9pt; line-height: 1.55; color: ${COLOR.texto}; }
p { margin: 0 0 4pt; }
.membrete { display: flex; justify-content: space-between; align-items: flex-start; gap: 16pt; padding-bottom: 11pt; border-bottom: 1.5pt solid ${COLOR.tinta}; }
.clinica { display: flex; align-items: center; gap: 9pt; }
.iniciales { display: grid; place-items: center; overflow: hidden; width: 30pt; height: 30pt; border-radius: 6pt; background: ${COLOR.marca}; color: #fff; font-weight: 700; font-size: 10.5pt; flex: none; }
.datos b { display: block; font-size: 11pt; color: ${COLOR.tinta}; }
.datos span, .meta { display: block; font-size: 8pt; line-height: 1.45; color: ${COLOR.apagado}; }
.meta { text-align: right; white-space: nowrap; }
.meta b { display: block; color: ${COLOR.tinta}; font-weight: 600; }
.tipo { margin: 18pt 0 2pt; font-size: 7.5pt; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: ${COLOR.marca}; }
h1 { margin: 0; font-size: 15pt; line-height: 1.25; font-weight: 700; color: ${COLOR.tinta}; }
.resumen { display: grid; grid-template-columns: repeat(3, 1fr); margin-top: 13pt; border: .75pt solid ${COLOR.linea}; border-radius: 4pt; overflow: hidden; }
.resumen div { padding: 6pt 8pt; border-right: .75pt solid ${COLOR.linea}; border-bottom: .75pt solid ${COLOR.linea}; margin: 0 -.75pt -.75pt 0; min-width: 0; }
.resumen dt { font-size: 6.5pt; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: ${COLOR.apagado}; }
.resumen dd { margin: 1pt 0 0; font-weight: 500; color: ${COLOR.tinta}; overflow-wrap: anywhere; }
section { margin-top: 18pt; }
body { counter-reset: seccion; }
h2 { display: flex; gap: 7pt; margin: 0 0 5pt; font-size: 10.5pt; font-weight: 700; color: ${COLOR.tinta}; break-after: avoid; counter-increment: seccion; }
h2::before { content: counter(seccion); color: ${COLOR.marca}; font-weight: 600; }
.aviso { margin: 10pt 0 0; padding: 6pt 9pt; border-radius: 4pt; background: ${COLOR.franja}; font-size: 8pt; color: ${COLOR.texto}; }
.anexo-cabeza { padding-bottom: 9pt; margin-bottom: 14pt; border-bottom: 1.5pt solid ${COLOR.tinta}; }
.anexo-cabeza .tipo { margin-top: 0; }
.anexo-cabeza span { display: block; margin-top: 2pt; font-size: 8pt; color: ${COLOR.apagado}; }
.anexo-imagen { margin: 0; }
.anexo-imagen img { display: block; width: 100%; max-height: 215mm; object-fit: contain; border-radius: 4pt; }
.anexo-pdf { padding: 14pt; border: .75pt dashed ${COLOR.tenue}; border-radius: 4pt; text-align: center; color: ${COLOR.apagado}; }
.anexos-pie { margin-top: 6pt; }
.campos { margin: 0; }
.campos div { margin-bottom: 2pt; }
.campos dt { display: inline; font-weight: 600; color: ${COLOR.tinta}; }
.campos dd { display: inline; margin: 0; }
.rotulo { margin: 6pt 0 1pt; font-weight: 600; color: ${COLOR.tinta}; }
.lista { margin: 0 0 4pt; padding-left: 13pt; }
.nota { font-size: 8pt; color: ${COLOR.apagado}; }
.prosa p { margin: 0 0 6pt; }
.prosa h2 { display: block; margin: 9pt 0 3pt; font-size: 9pt; }
.prosa ul, .prosa ol { margin: 0 0 6pt; padding-left: 13pt; }
.tabla { width: 100%; border-collapse: collapse; font-size: 8.5pt; }
.tabla th { padding: 4pt 6pt; text-align: left; font-size: 6.5pt; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: ${COLOR.apagado}; border-bottom: .75pt solid ${COLOR.tinta}; }
.tabla td { padding: 4.5pt 6pt; border-bottom: .75pt solid ${COLOR.linea}; vertical-align: top; color: ${COLOR.tinta}; }
.tabla tr { break-inside: avoid; }
.tabla .der { text-align: right; font-variant-numeric: tabular-nums; }
.tabla .vacio { color: ${COLOR.apagado}; }
.tabla tfoot td { border-bottom: 0; padding-top: 4.5pt; font-weight: 600; background: ${COLOR.caja}; }
.tabla .sub { display: block; font-size: 7.5pt; line-height: 1.45; color: ${COLOR.apagado}; }
.tabla .sub b { font-weight: 600; color: ${COLOR.texto}; }
.grupo { margin-bottom: 12pt; break-inside: avoid; }
.grupo-titulo { display: flex; justify-content: space-between; gap: 12pt; margin: 0 0 2pt; font-weight: 600; color: ${COLOR.tinta}; }
.grupo-detalle { font-weight: 500; color: ${COLOR.apagado}; }
.grupo-nota { margin: 4pt 0 0; font-size: 8pt; color: ${COLOR.texto}; }
.grupo-nota b { font-weight: 600; color: ${COLOR.tinta}; }
.importes { display: flex; flex-direction: column; align-items: flex-end; break-inside: avoid; }
.importes dl { width: 62mm; margin: 0 0 6pt; }
.importes dl div { display: flex; justify-content: space-between; gap: 12pt; padding: 2.5pt 0; }
.importes dt { color: ${COLOR.texto}; }
.importes dd { margin: 0; font-variant-numeric: tabular-nums; color: ${COLOR.tinta}; }
.importes dl div:last-child { margin-top: 3pt; padding-top: 5pt; border-top: .75pt solid ${COLOR.tinta}; font-size: 10pt; font-weight: 700; }
.importes dl div:last-child dt { color: ${COLOR.tinta}; }
.importes .nota { max-width: 62mm; text-align: right; }
.cuadros { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6pt; margin: 0 0 4pt; }
.cuadros div { padding: 5pt 7pt; border: .75pt solid ${COLOR.linea}; border-radius: 4pt; break-inside: avoid; }
.cuadros dt { font-size: 6.5pt; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: ${COLOR.apagado}; }
.cuadros dd { margin: 1pt 0 0; font-weight: 600; color: ${COLOR.tinta}; font-variant-numeric: tabular-nums; }
.narrativa { margin-bottom: 7pt; break-inside: avoid; }
.narrativa .firmado { display: block; margin-top: 2pt; font-size: 7.5pt; color: ${COLOR.apagado}; }
.campos .linea { display: block; }
.narrativa-titulo { display: flex; justify-content: space-between; gap: 12pt; margin: 0 0 1pt; font-weight: 600; color: ${COLOR.tinta}; }
.narrativa-titulo span { font-weight: 400; font-size: 8pt; color: ${COLOR.apagado}; }
h3 { margin: 10pt 0 4pt; font-size: 9pt; font-weight: 700; color: ${COLOR.tinta}; break-after: avoid; }
h2 + h3 { margin-top: 2pt; }
.tarjeta { padding: 8pt 10pt; margin-bottom: 7pt; border: .75pt solid ${COLOR.linea}; border-radius: 4pt; break-inside: avoid; }
.tarjeta-titulo { font-weight: 600; font-size: 9.5pt; color: ${COLOR.tinta}; }
.imagenes { display: grid; grid-template-columns: 1fr 1fr; gap: 10pt; }
.imagenes figure { margin: 0; break-inside: avoid; }
.imagenes img { display: block; width: 100%; height: 130pt; object-fit: cover; border-radius: 4pt; background: ${COLOR.caja}; }
.imagenes figcaption { display: flex; flex-direction: column; margin-top: 3pt; font-size: 8pt; }
.imagenes figcaption b { color: ${COLOR.tinta}; font-weight: 600; }
.imagenes figcaption span { color: ${COLOR.apagado}; }
.casillas { list-style: none; margin: 0 0 4pt; padding: 0; }
.casillas li { display: flex; gap: 6pt; margin-bottom: 3pt; }
.casilla { display: grid; place-items: center; flex: none; width: 9pt; height: 9pt; margin-top: 2pt; border: .75pt solid ${COLOR.apagado}; border-radius: 2pt; }
.casilla.marcada { background: ${COLOR.marca}; border-color: ${COLOR.marca}; }
.boca { display: flex; gap: 16pt; align-items: flex-start; break-inside: avoid; }
.dibujo { flex: none; padding: 4pt; border-radius: 8pt; background: ${COLOR.caja}; }
.dibujo svg { display: block; width: 128pt; height: auto; }
.boca[data-dentition="Permanent"] svg[data-d="Primary"], .boca[data-dentition="Primary"] svg[data-d="Permanent"] { display: none; }
.boca .pieza { fill: #fff; stroke: ${COLOR.tenue}; stroke-width: .8; }
.boca .arcada { font-size: 8.5px; fill: ${COLOR.apagado}; }
.boca .num { font-size: 6.5px; fill: ${COLOR.apagado}; }
.boca svg[data-d="Primary"] .num { font-size: 8px; }
.firmas { display: grid; grid-template-columns: 1fr 1fr; gap: 24pt; margin-top: 30pt; break-inside: avoid; }
.firma { display: flex; flex-direction: column; gap: 1pt; font-size: 8pt; }
.trazo { display: flex; align-items: flex-end; height: 40pt; padding-bottom: 3pt; margin-bottom: 3pt; border-bottom: .75pt solid ${COLOR.tinta}; }
.trazo img { max-height: 38pt; max-width: 190pt; }
.escrita { font: italic 16pt Georgia, 'Times New Roman', serif; color: ${COLOR.marca}; line-height: 1; }
.pendiente { font-style: italic; color: ${COLOR.tenue}; }
.firma b { color: ${COLOR.tinta}; font-weight: 600; }
.firma span { color: ${COLOR.apagado}; }
.pie-pantalla { display: none; }
@media print { .anexo { break-before: page; } }
/* En pantalla (vista previa y navegador) se ve como una hoja; el PDF usa @page. */
@media screen {
  body { background: ${COLOR.caja}; padding: 24px; }
  .hoja + .hoja { margin-top: 24px; }
  .hoja { width: 210mm; min-height: 297mm; margin: 0 auto; padding: 18mm 18mm 12mm; display: flex; flex-direction: column; background: #fff; box-shadow: 0 0 0 1px rgb(0 0 0/.06), 0 2px 4px rgb(0 0 0/.05), 0 16px 32px -12px rgb(0 0 0/.22); }
  .pie-pantalla { display: flex; justify-content: space-between; margin-top: auto; padding-top: 24pt; font-size: 7pt; color: ${COLOR.tenue}; }
}
`

const seccion = (s: Seccion) => {
  const html = `<section>\n<h2>${esc(s.titulo)}</h2>\n${s.bloques.map(bloque).join('\n')}\n</section>`
  return s.si ? `{{#${s.si}}}${html}{{/${s.si}}}` : html
}
const pie = (h: Hoja) => `<footer class="pie-pantalla"><span>{{practice_name}} · ${esc(h.pie)} · {{patient_name}}</span></footer>`

export function armarHoja(h: Hoja): string {
  const estilos = ESTILOS.replace('PIE', h.pie.replace(/"/g, ''))
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${h.titulo.replace(/<[^>]+>/g, '')} — {{patient_name}}</title>
<style>${estilos}</style>
</head>
<body>
<main class="hoja">
<header class="membrete">
<div class="clinica"><span class="iniciales">{{practice_initials}}</span><div class="datos"><b>{{practice_name}}</b><span>{{location_name}} · {{location_address}}</span><span>{{practice_phone}} · {{practice_email}}</span></div></div>
<p class="meta"><b>${esc(h.meta[0])}</b>${h.meta[1]}</p>
</header>
<p class="tipo">${esc(h.tipo)}</p>
<h1>${h.titulo}</h1>
${h.aviso ? `${h.aviso}\n` : ''}<dl class="resumen">${h.resumen.map(([r, v]) => `<div><dt>${esc(r)}</dt><dd>${v}</dd></div>`).join('')}</dl>
${h.secciones.map(seccion).join('\n')}
${h.firmas?.length ? `<div class="firmas">${h.firmas.map(firma).join('')}</div>` : ''}
${(h.posdata ?? []).map(seccion).join('\n')}
${pie(h)}
</main>${h.anexos ? `
{{#${h.anexos}}}<main class="hoja anexo">
<header class="anexo-cabeza"><p class="tipo">Annex {{annex_label}} · ${esc(h.pie)}</p><h1>{{name}}</h1><span>{{file_type}} · {{patient_name}}</span></header>
{{#is_image}}<figure class="anexo-imagen"><img src="{{file_url}}" alt="{{name}}"></figure>{{/is_image}}
{{^is_image}}<p class="anexo-pdf">The attached document starts on the next page.</p>{{/is_image}}
${pie(h)}
</main>{{/${h.anexos}}}` : ''}
</body>
</html>
`
}

/* ── Mustache mínimo: lo que hace el backend. {{var}} escapada, {{{var}}} tal cual, {{#lista}}…{{/lista}} repite (o
   muestra si tiene valor) y {{^lista}}…{{/lista}} muestra si está vacía. Cualquier librería Mustache da lo mismo. ── */

type Seccion_ = { tipo: '#' | '^'; nombre: string; hijos: Nodo[] }
type Nodo = string | { tipo: 'var' | 'crudo'; nombre: string; hijos?: undefined } | Seccion_
export type Datos = { [k: string]: string | boolean | Datos[] | undefined }

function analizar(plantilla: string): Nodo[] {
  const raiz: Nodo[] = []
  const pila: { nombre: string; hijos: Nodo[] }[] = [{ nombre: '', hijos: raiz }]
  const re = /\{\{\{\s*(\w+)\s*\}\}\}|\{\{\s*([#^/]?)\s*(\w+)\s*\}\}/g
  let ultimo = 0
  for (const m of plantilla.matchAll(re)) {
    const actual = pila.at(-1)!
    if (m.index > ultimo) actual.hijos.push(plantilla.slice(ultimo, m.index))
    ultimo = m.index + m[0].length
    if (m[1]) actual.hijos.push({ tipo: 'crudo', nombre: m[1] })
    else if (m[2] === '#' || m[2] === '^') {
      const nodo: Seccion_ = { tipo: m[2], nombre: m[3]!, hijos: [] }
      actual.hijos.push(nodo)
      pila.push(nodo)
    } else if (m[2] === '/') {
      if (actual.nombre !== m[3]) throw new Error(`Sección mal cerrada: {{/${m[3]}}}`)
      pila.pop()
    } else actual.hijos.push({ tipo: 'var', nombre: m[3]! })
  }
  if (pila.length > 1) throw new Error(`Sección sin cerrar: {{#${pila.at(-1)!.nombre}}}`)
  if (ultimo < plantilla.length) raiz.push(plantilla.slice(ultimo))
  return raiz
}

const escapar = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const vacio = (v: unknown) => v === undefined || v === false || v === '' || (Array.isArray(v) && v.length === 0)

/** Completa la plantilla con los datos. Con `variables`, deja cada {{var}} a la vista y muestra cada lista una vez. */
export function completar(plantilla: string, datos: Datos, { variables = false } = {}): string {
  const buscar = (pila: Datos[], n: string) => { for (let i = pila.length - 1; i >= 0; i--) if (n in pila[i]!) return pila[i]![n]; return undefined }
  const pintar = (nodos: Nodo[], pila: Datos[]): string => nodos.map((n) => {
    if (typeof n === 'string') return n
    const v = buscar(pila, n.nombre)
    if (n.tipo === 'var' || n.tipo === 'crudo') {
      if (variables) return `{{${n.nombre}}}`
      if (v === undefined || typeof v !== 'string') return n.tipo === 'var' ? `{{${n.nombre}}}` : ''
      return n.tipo === 'var' ? escapar(v) : v
    }
    const hijos = n.hijos ?? []
    if (variables) return n.tipo === '#' ? pintar(hijos, pila) : ''
    if (n.tipo === '^') return vacio(v) ? pintar(hijos, pila) : ''
    if (vacio(v)) return ''
    return Array.isArray(v) ? v.map((item) => pintar(hijos, [...pila, item])).join('') : pintar(hijos, pila)
  }).join('')
  return pintar(analizar(plantilla), [datos])
}

/** Variables y listas de una plantilla: las sueltas y, por lista, los campos de cada ítem. Una sección es lista si en los
    datos de ejemplo es un arreglo (una lista adentro de otra se nombra "visits.procedures"); si no, es un "mostrar si
    tiene valor" y cuenta como variable. */
export function variablesDe(plantilla: string, ejemplo: Datos): { variables: string[]; listas: Record<string, string[]> } {
  const variables = new Set<string>()
  const listas: Record<string, Set<string>> = {}
  const recorrer = (nodos: Nodo[], lista?: string, item?: Datos) => {
    for (const n of nodos) {
      if (typeof n === 'string') continue
      if (n.tipo !== 'var' && n.tipo !== 'crudo') {
        const valor = item?.[n.nombre] ?? ejemplo[n.nombre]
        if (Array.isArray(valor)) {
          const nombre = lista && item && n.nombre in item ? `${lista}.${n.nombre}` : n.nombre
          listas[nombre] ??= new Set()
          recorrer(n.hijos ?? [], nombre, valor[0])
          continue
        }
      }
      /* Una variable general usada adentro de una lista (el paciente en la hoja de un anexo) sigue siendo general. */
      const general = !lista || (item && !(n.nombre in item) && n.nombre in ejemplo)
      ;(general ? variables : listas[lista]!).add(n.nombre)
      recorrer(n.hijos ?? [], lista, item)
    }
  }
  recorrer(analizar(plantilla))
  return { variables: [...variables], listas: Object.fromEntries(Object.entries(listas).map(([k, v]) => [k, [...v]])) }
}
