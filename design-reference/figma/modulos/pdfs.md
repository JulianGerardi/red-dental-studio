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

## 2026-11-26 · Documentación en Figma (CON-4115)

Pedido de Julián: armar los PDF en Figma como los mails. Página **📄 PDFs** (`597:4`) del archivo *Screens & Flows*, con el
flujo en `scripts/figma/flujos/pdfs.mjs`.

- **Cuatro flujos y 13 pantallas:** *Template & preview* (sample data, sin firmar y variables, con el consentimiento del
  procedimiento) y un flujo por categoría: Clinical records, Orders y Treatment & consent. Cada pantalla es `/pdfs/#<id>` y
  su nota dice cuándo se genera, quién firma y si el diseño es de la app o propuesta. Las historias de Jira salen de cada
  documento.
- **Plantilla:** los títulos (`h1`, `h2`) llevan `font-weight: 700` explícito: el preflight de la página los reseteaba al
  copiar la hoja y salían sin negrita. Los PDF de ejemplo se rehicieron (se ven igual).
- **Anomalías:** la firma escrita usa Times New Roman Italic, que Figma no tiene (quedó en Playfair Display Italic); en la
  pantalla *Variables* el cuadro de iniciales de la clínica queda con `{{practice_initials}}` cortado, igual que en la vista
  previa; la pestaña PDF no está en el Figma.

## 2026-11-27 · Nota clínica completa, findings y diagnósticos, importes y anexos (CON-2617, CON-3605, CON-2204, CON-2730)

Devolución de Julián sobre la primera versión: la nota clínica estaba incompleta ("una nota clínica tiene MUCHAS
cosas"), el Lab Order ID es un UUID interno de Confidentally, los adjuntos convenía mostrarlos como anexo en página aparte,
al treatment plan y al consentimiento les faltaban los findings/diagnosis, y los importes del treatment plan y del
consentimiento estaban armados distinto.

### 1. Nota clínica (pasa a propuesta)

**Fuente: la especificación que pasó Julián** (*Especificación de Reconstrucción: Nota Clínica Completa*, CON-2816,
CON-2975, CON-3081, CON-3605, CON-3668, CON-2727). CON-2975 y CON-3081 son las pruebas de QA con los textos exactos.
**Se comparó con las 8 notas que genera red.dev** (Dashboard › Pending Tasks › Clinical Notes, sin firmar; sólo
lectura, no se firmó ni se creó nada). Son todas de un paciente y no traen vitales, exámenes ni órdenes: esas partes
siguen saliendo de la especificación.

- **La nota es texto, no tablas**, con los textos de la especificación copiados tal cual y en su orden: Vital Signs →
  Medical History (antecedentes, Chief Complaint y Triage sin título de grupo, *Patient History* en orden alfabético) →
  Exams → Consent Summary → Operative Report → Workflows → órdenes → firma.
- **Omisión estricta:** lo que no tuvo actividad en la visita no sale, ni la sección ni la línea. Cada sección lleva su
  booleano (`has_vitals`, `has_exams`, `consent_presented`, `has_procedures`…) y cada subtítulo condicional también
  (`has_probing_depths`, `has_recession`…): Mustache no sabe si una lista está vacía sin repetir el bloque.
- **Exams** sale sólo si hay al menos un finding o una review (CON-3668). Cada examen repetible lleva su fecha. Dental
  Assessment y Radiographic tienen sus tres textos (sin findings —sólo si se usó *No findings*—, con findings y
  reviewed); Periodontal, el de review o el del nuevo sondaje con PD ≥ 4 mm, recesión, agrandamiento, sangrado y
  supuración. Las zonas van con el nombre anatómico (*Left Mandibular Gingiva*), no "Zone 14".
- **Treatment Plan, como la nota real:** "Treatment plan(s) were proposed…", cada caso con "{nombre} – {tipo}
  (Recommended) · Est. total cost", sus visitas con el costo, los procedimientos (código en negrita, descripción y zona)
  y "Patient Decision". El **Consent Summary** va adentro de esta sección, como en red.dev, y sale si hubo interacción
  con un consentimiento (CON-3081); la lista de aceptados, sólo si el paciente firmó en esa sesión.
- **Antecedentes con el formato de red.dev:** "{condición} {estado} ({fecha}). {nota}", el medicamento en negrita y cada
  alergia con su reacción ("Gastrointestinal – Abdominal Pain") y su severidad debajo.
- **Resumen con los 5 datos de la nota real** (sin Location).
- **Operative Report:** "**{código}** — {descripción} on **#{diente}** *[in progress / completed]*", una vez por
  procedimiento aunque tenga varias visitas; sin zona, sin "on".
- **Firma:** sólo el provider (CON-2975 pide sacar la del paciente), con fecha, hora y hash del contenido (CON-2727).
- Recetas, lab orders y referrals siguen como cajas con rótulo y valor: la especificación no da su texto. *Documents
  sent: Yes* sólo si se adjuntó un archivo.
- **Fuera de la especificación y se mantienen:** *Additional Notes* (el texto libre de la hoja de la app; sólo si hay) y
  las **adendas** después de la firma (CON-2730). El aviso de nota generada sola (CON-2937) también.
- **Títulos sin número, en azul** (pedido de Julián), en todos los PDF. Los números no aportaban en documentos cortos y
  cambiaban con cada sección que se omite. La hoja de la app (`ui/document-sheet`) sigue numerada: queda distinta.
- **Sin cajas** (pedido de Julián: "deben estar todos iguales"): los medicamentos de la receta y las órdenes de la nota
  dejan la caja con borde y quedan como el resto (título en negrita y sus datos). Lo mismo el aviso de nota generada
  sola y la portada del anexo PDF. Con borde quedan sólo el resumen (igual en todos) y el diagrama de la boca de la Lab
  order (como la app).

### 2. Treatment plan y consentimientos

- **Findings y diagnósticos debajo de cada procedimiento** (los trae CON-2204 por procedimiento): en el treatment plan, la
  aceptación, el rechazo y el referral (CON-2616). La columna *Tooth* pasa a *Area* con el `anatomic_area` del evento
  ("19 (O, D)", "Full mouth", "Upper arch").
- **Importes iguales en los dos documentos**: las columnas Fee / Insurance / Adjustment / Patient y el bloque *Estimate*
  alineado a la derecha (Plan case total, Insurance portion, Insurance adjustments y Patient portion resaltado), con los
  nombres y el aviso de *Estimate details* de la app. El subtotal de cada visita es una fila al pie de su tabla con un
  importe por columna (antes era un número suelto al lado del título, sin decir de qué).
- **Los importes del ejemplo no sumaban** (faltaba el ajuste del seguro): ahora salen del cálculo de `data/estimaciones` y
  Fee = Insurance + Adjustment + Patient. El deducible va en la nota ("includes $50.00 of deductible") para que la columna
  sume de arriba abajo.

### 3. Lab order, Prescription y anexos

- **Lab order:** sale el *Lab Order ID* (UUID interno); en su lugar, *Laboratory*. **Prescription:** sale el *Prescription
  ID* (`RX-000184` era inventado y no hay un número legible en Jira).
- **Adjuntos como anexo:** la sección *Attachments* es un índice (Annex, File, Type) y cada adjunto va después del
  documento en su propia hoja (`Hoja.anexos`): una imagen se ve en la hoja; un PDF tiene una hoja de portada y el backend
  le agrega sus páginas detrás. Campos: `annex_label`, `name`, `file_type`, `is_image`, `file_url`.

### 4. Anomalías

1. **Page N of M** cuenta las hojas que arma la plantilla: si el backend agrega las páginas de un PDF adjunto, el total
   tiene que salir después de unir los archivos (o numerar sólo el documento).
2. CON-2191 manda `measure: vm.value` (el valor dos veces); la plantilla espera la unidad en `measure`.
3. CON-2615 dice "Para cada [lab_orders]" en la historia de recetas, y CON-2616 llama `record_prescription_event` en la de
   referrals: copias de otra historia.
4. CON-3605 y la especificación dicen "Oral History"; la app lo llama *Dental and Oral Health History*. La nota usa el
   de la especificación.
5. La especificación dice "Finding on #{tooth}/{surface}": se tomó "Finding" como el nombre del finding
   ("Deep caries on #19/O, D").
6. En red.dev el Consent Summary es un párrafo de la sección Treatment Plan; la especificación lo trata como sección
   aparte. Se siguió la nota real. Si hay consentimiento sin plan presentado, la sección igual tiene que salir
   (`has_treatment_plan` lo decide el backend).
7. **En red.dev:** los costos salen sin formato ("Est. total cost: 110.0", "Est. cost: 0"); la plantilla espera el
   importe con moneda ("$110.00"). Falta el espacio después de la raya en el plan ("D0140 —Limited…"). El bloque de
   firma sin firmar dice "Date:" vacío; la plantilla dice "Not signed yet".

### Para validar

- En red.dev: generar una nota real con todos los registros de Clinical Mode y compararla con el PDF de ejemplo,
  sobre todo exámenes, órdenes y workflows.
- Con odontólogos: si el BRAINS fijo del Consent Summary alcanza o esperan el detalle de cada plan.
- Con recepción: si el paciente entiende *Adjustment* o conviene "Insurance discount".

## 2026-11-28 · Encabezado como red.dev, Lab order completa y Referral (CON-2220, CON-2584, CON-2287, CON-2616)

Julián: el PDF de la Lab order tiene que tener todo lo del documento de red.dev ("falta el lab order ID", "el gráfico
que sea el mismo"), el de la Referral no estaba alineado y **en todos los PDF hay que respetar la organización de los
datos del encabezado**, sin perder el diseño nuevo (títulos en azul, sin números ni cajas). Se bajaron los PDF reales de
Lab order (8) y Prescription (1) de red.dev, en sólo lectura.

1. **Encabezado en los 10 documentos** (`Hoja.encabezado`, reemplaza a `meta` y `resumen`): la clínica a la izquierda y,
   a la derecha y alineado a la derecha, primero quién lo emite (en negrita, sin rótulo) y debajo un renglón "Rótulo:
   valor" por dato, como red.dev. Sale el cuadro de resumen de tres columnas: sus datos están ahí. Los que repetían al
   paciente con el título (cuando el título es el paciente) se sacaron.
2. **Lab order, con lo del documento real y en su orden:** *Lab Order ID* (UUID), *Patient Phone*, *Email* y
   *Expiration Date* en el encabezado; Patient Information, Receiving Laboratory, Provider Information, Dental Work
   Request, Teeth & Surface Specifications, **Special Instructions** y **Documents Uploaded**. Sin dientes, sin
   indicaciones o sin adjuntos, la sección no sale (`has_teeth`, `special_instructions`, `has_documents`).
3. **El gráfico es el de red.dev**: las arcadas anatómicas (`clinical/dental/arcadasRed`, el mismo dibujo que Teeth &
   surface en la app) con el diente pedido en azul y "Tooth 3: D, O, M" al lado. `lib/diagramaBoca` queda sólo para el PDF
   viejo de la tarea.
4. **Corrección:** el *Lab Order ID* lo había sacado el 27 por leer mal "es un número interno": va. La Prescription
   recupera su *Prescription ID* (ocho caracteres en red.dev) y suma *Valid From* y Patient Information.
5. **Documents Uploaded** (Lab order y Referral): archivo, tipo y peso, y el anexo donde va cada uno (los adjuntos siguen
   como anexos, uno por hoja).
6. **Referral:** Patient Information, Referred Provider, Provider Information, Procedures to refer, Referral note y
   Documents Uploaded.

### Anomalías

1. **No se pudo ver el PDF real de una Referral**: el link de Julián es un `blob:` de su navegador y hoy ninguna Referral
   de red.dev tiene el documento habilitado (la única era la que completó en el video). Se armó con las secciones de los
   documentos reales de Lab order y Prescription. Falta confirmar si imprime un *Referral ID*.
2. El documento de red.dev no imprime procedimientos ni ASAP en la Lab order; la app antepone "ASAP." al trabajo pedido
   (decisión del 27, no se tocó).
3. red.dev imprime el vencimiento como `2026-05-05` (Lab order) y `03-06-2026` (Prescription); la plantilla recibe la
   fecha ya escrita.
4. En red.dev el documento no tiene tipo ni título, pie, número de página ni firma; el diseño nuevo los mantiene.
