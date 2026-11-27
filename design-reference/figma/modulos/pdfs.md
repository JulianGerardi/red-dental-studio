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

No pude entrar al sistema ni hablar con Sikiu: el contenido sale de Jira. La nota se arma con los eventos del encounter
(CON-2816, CON-2728): uno por tipo (`event_type`, CON-2617) y cada uno con el payload de su historia. Una sección por tipo:

| Sección | Historia | Qué muestra |
| --- | --- | --- |
| Medical History | CON-3605, CON-2198, CON-2199 | Cuestionarios de la visita (Chief Complaint, Triage), los del paciente con su fecha (en orden alfabético), condiciones/alergias/cirugías (tipo, desde, estado, severidad, reacciones, nota) y medicación |
| Vitals | CON-2191 | Un cuadro por medición y las notas |
| Exams and findings | CON-1619, CON-2772 | Una tabla por examen: finding, área, resultado (positive/negative en ROS y Physical), descriptores, nota y la review |
| Periodontal measures | CON-2055 | Sólo las significativas (PD ≥ 4 mm, recesión ≥ 1 mm, agrandamiento gingival) |
| Procedures performed | CON-2620 | Los que pasaron a Completed o In progress |
| Treatment plan | CON-2204 | Cada caso (tipo, recomendado, estado, total) con sus procedimientos por visita, findings, diagnósticos y la discusión |
| Prescriptions, Lab orders, Referrals | CON-2615, CON-2614, CON-2616 | Una caja por orden con los campos del evento |
| Workflows | CON-2621 | Las narrativas (no salen si la nota se generó sola, CON-2937) |
| Additional Notes | | El texto libre del provider |
| Addenda (después de la firma) | CON-2730 | Autor, fecha, texto y firma de cada una; no cambian la nota firmada |

- **Una sección sólo sale si pasó algo en la visita**: `{{#has_vitals}}`, `{{#has_exams}}`… (Mustache necesita un booleano
  para no repetir la sección por cada ítem). Los números de sección salen de un contador de CSS, así que no quedan huecos.
- **Generada sola (CON-2937):** `{{#auto_generated}}` muestra un aviso debajo del título.
- Sin firmar, la vista previa no muestra adendas (sólo existen sobre una nota firmada).

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
4. CON-3605 dice "Oral History"; la app lo llama *Dental and Oral Health History* (se usó el de la app).

### Para validar

- Con Sikiu o en el sistema: generar una nota real con todos los registros de Clinical Mode y comparar sección por
  sección (sobre todo exámenes y workflows, cuyo texto real no está en Jira).
- Con odontólogos: si la nota se lee bien en este orden (historia → vitales → exámenes → procedimientos → plan → órdenes)
  o si esperan el formato SOAP.
- Con recepción: si el paciente entiende *Adjustment* o conviene "Insurance discount".
