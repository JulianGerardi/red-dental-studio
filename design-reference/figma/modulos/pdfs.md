# PDFs (documentos que genera la plataforma)

**Jira** (funcionamiento de la app; índice en [jira.md](../../jira.md)): no hay un epic de PDFs. La lista de documentos
sale de **CON-4115** (*[Documents] View*: consentimientos, treatment plans, lab orders, recetas, referrals y exámenes
radiográficos y periodontales), más la Clinical note (CON-2641, CON-2643) y los consentimientos de aceptación y rechazo
del caso (CON-2923). Cada documento trae además las historias de su módulo (CON-2220, CON-2287, CON-2230, CON-2322…).

Código: `src/pdfs/marco.ts` (la hoja A4, los bloques y un Mustache mínimo), `src/pdfs/plantillas.ts` (los 10 documentos,
sus textos y los datos de ejemplo), `src/pdfs/Vista.tsx` (la vista previa, página aparte en `/pdfs/`) y
`scripts/pdfs-exportar.mjs` (lo que se le entrega al backend, en `public/pdfs/`). El diagrama de la boca pasó a
`src/lib/diagramaBoca.ts` para que lo usen la app y las plantillas.

## 2026-11-25 · Primera versión (CON-4115, CON-2220, CON-2287, CON-2923)

Pedido de Julián: "como hicimos con los mails, lo mismo pero con todos los PDF". Mismo formato que `/emails/`: una
página aparte con cada documento, su link, datos de ejemplo o variables y la plantilla para bajar.

### 1. Lo que impone el backend

- **Una sola hoja para todos los PDF**: la *Hoja de documentos* de la app (`ui/document-sheet`, README › Hoja de
  documentos, 2026-11-24): membrete, tipo en azul, título, resumen en tres columnas, secciones numeradas, firmas lado a
  lado y pie. Cada documento cambia sólo sus secciones.
- **Bloques fijos:** `campos`, `texto`, `html` (texto con formato del editor de la app), `nota`, `lista`, `tabla`,
  `grupos` (una tabla por visita con su subtotal), `tarjetas` (una caja por medicamento), `imagenes`, `casillas` (las
  afirmaciones que marca el paciente) y `boca` (el diagrama de la Lab order). Un documento nuevo se arma con esos bloques.
- **Mustache, a diferencia de los mails:** un PDF tiene listas (medicamentos, procedimientos, dientes), así que la
  plantilla usa lo mínimo de Mustache: `{{var}}` (escapada), `{{{var}}}` (sólo las `*_html`, que vienen del editor),
  `{{#lista}}…{{/lista}}` y `{{^lista}}…{{/lista}}` (si está vacía). Sin lógica: cualquier librería Mustache sirve
  (Java, .NET, Node, Python…). Una lista adentro de otra (`visits.procedures`) se arma igual.
- **HTML a PDF en el servidor** con un motor que entienda CSS de impresión (Chromium/Puppeteer o WeasyPrint). La hoja es
  A4 con `@page`: márgenes de 18 mm y el pie *clínica · documento · paciente* y *Page N of M* en cada página. Los PDF de
  ejemplo salen de Chromium. Tablas, tarjetas, figuras y firmas no se cortan entre páginas.
- **El diagrama de la boca sin condicionales:** la plantilla trae las dos denticiones en SVG; `{{dentition}}` muestra
  una, y `{{#teeth}}` arma una regla de CSS por diente para pintarlo de azul.
- **Firmas:** cada firmante usa `{{<rol>_name}}`, `{{<rol>_signed_date}}` (vacía = *Pending signature* / *Not signed
  yet*) y `{{<rol>_signature_image}}` (el trazo; sin imagen, el nombre en cursiva, como la app). Las casillas del
  paciente quedan marcadas cuando firmó.
- **Entrega:** `npm run pdfs:exportar` deja en `public/pdfs/` la plantilla (`<id>.html`), un PDF de ejemplo
  (`<id>.pdf`, con Playwright) y `pdfs.json`: cuándo se genera, quién firma, variables, listas con sus campos, cuáles
  van sin escapar y los datos de ejemplo. Se publica en `…/red-dental-studio/pdfs/`. Con `--check` falla si las
  plantillas o el json quedaron desactualizados (no compara los PDF); con `--todos` rehace todos los PDF.
- **Tipografía:** Inter, con Helvetica/Arial de respaldo. El servidor tiene que tener Inter instalada (licencia OFL) para
  que el PDF se vea igual.

### 2. Los documentos

| Documento | Diseño | Jira |
| --- | --- | --- |
| Clinical note | Como la app (`documentoTarea`) | CON-2641, CON-2643, CON-4115 |
| Periodontal exam | Propuesta | CON-1122, CON-1418, CON-1428, CON-4115 |
| Radiographic exam | Propuesta | CON-1649, CON-1657, CON-1658, CON-4115 |
| Lab order | Como la app (PDF de red.dev) | CON-2215, CON-2220, CON-2643, CON-4115 |
| Prescription | Propuesta, con los campos de CON-2230 | CON-2230, CON-2287, CON-3034, CON-4115 |
| Referral | Propuesta, con los campos de CON-2322 y CON-3128 | CON-2322, CON-3033, CON-3128, CON-4115 |
| Treatment plan | Propuesta (visitas, estimación) | CON-1634, CON-2036, CON-1598, CON-4115 |
| Procedure consent | Como la app (`ConsentDocument`) | CON-195, CON-4119, CON-4115 |
| Treatment acceptance consent | Propuesta | CON-2923, CON-2715, CON-3571, CON-4115 |
| Informed refusal | Propuesta | CON-2923, CON-2716, CON-4115 |

La vista previa marca cada uno con *Same as the app* o *Proposal · pending approval*, y lista lo propuesto.

### 3. Decisiones de diseño

1. **Prescription y Referral dejan el formato genérico** (la app los dibuja con los datos de la tarea: Register,
   Expiration, Status). Toman los campos de sus historias: cada medicamento en su caja con *Directions* armadas en una
   frase ("1 capsule oral, every 8 hours, for 7 days"), cantidad, refills, sustitución y sustancia controlada; el
   referral con el contacto, sus procedimientos, la nota, ASAP/Mandatory en el resumen y los adjuntos. CON-3033 y
   CON-3034 piden mejorar ese diseño y no traen descripción.
2. **Treatment plan:** procedimientos agrupados por visita con su subtotal, como el plan en la app, y tres importes
   (Fee, Insurance, Patient) en lugar de las nueve columnas de *Estimate details*: el paciente necesita saber cuánto
   paga. El aviso "This is an estimate…" es propuesta.
3. **Consentimientos del caso (CON-2923):** aceptación y rechazo tienen el mismo armado: el texto sale del template de
   Settings › Consents (`consent_text_html`), los procedimientos del caso y las afirmaciones del paciente. La aceptación
   suma el costo; el rechazo, cuándo se registró la decisión.
4. **Periodontal:** una fila por diente con Mobility, PD, CAL y BOP de cada lado (tres sitios, en mm), como los rótulos
   del gráfico periodontal de la app. Los dientes ausentes no se listan.
5. **Radiographic:** las imágenes de dos en dos, con nombre, fecha y dientes, y la tabla de findings.
6. **Selector de firma en la vista previa** (*Signed* / *Not signed*): el mismo PDF se genera antes y después de firmar.

### 4. Anomalías

1. **La app tiene el *View PDF* del consentimiento deshabilitado** ("View PDF is not available in this release.") y el
   PDF de la Clinical note y la Lab order se dibuja a mano con Helvetica (`pdfDeDocumento`). Las plantillas no
   reemplazan ese código: son la referencia para el PDF del servidor.
2. **El aviso "All acknowledgment checkboxes must be completed…"** es una instrucción de pantalla y queda en el PDF del
   consentimiento porque está en la hoja de la app. Propuesta: sacarlo del PDF.
3. **Membrete con iniciales:** la hoja de la app usa las iniciales en un cuadrado azul; los mails usan
   `{{practice_logo_url}}`. Se mantuvo la hoja aprobada. Propuesta: usar el logo de la clínica también en los PDF.
4. **Receta de sustancias controladas:** CON-2230 tiene el check *Controlled Substance*, pero no pide los datos del
   prescriptor que exige una receta así (por ejemplo, su número de DEA). No se inventaron.
5. **Clinical note:** las listas vacías de Medical History usan los textos de la app como mensaje de vacío ("Patient
   reports no known medical conditions.").

### Para validar con usuarios

- Con recepción: si el Treatment plan con tres importes por procedimiento alcanza para explicarle el costo al paciente.
- Con odontólogos: si el PDF periodontal en tabla se lee bien, o si esperan el gráfico (charting) como en la pantalla.
- Con el backend: qué motor HTML→PDF usan y si soporta `@page` con pie y número de página; si no, el pie va por la
  opción de pie del motor (Puppeteer `footerTemplate`).
