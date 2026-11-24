# Consents (Settings → Consent Templates)

**Jira** (funcionamiento de la app; índice en [jira.md](../../jira.md)):

- Epics: CON-2094 Consent · CON-3118 [Consent] Procedure · CON-505 Document - Template · CON-1132 Firma
  ([historias](https://confidetally.atlassian.net/issues?jql=parent%20in%20%28CON-2094%2CCON-3118%2CCON-505%2CCON-1132%29%20AND%20issuetype%20%21%3D%20Bug%20AND%20status%20%21%3D%20Cancelled%20AND%20%28labels%20is%20EMPTY%20OR%20labels%20%21%3D%20%22design-system%22%29%20ORDER%20BY%20created%20DESC))
- Historias de abril: CON-2860, CON-2862, CON-2905, CON-2907, CON-2908, CON-2909, CON-2910, CON-2911, CON-2912,
  CON-2913, CON-2914, CON-2865, CON-2866, CON-2923, CON-2927, CON-2928, CON-2959, CON-2960
  ([Jira](https://confidetally.atlassian.net/issues?jql=key%20in%20%28CON-2860%2CCON-2862%2CCON-2905%2CCON-2907%2CCON-2908%2CCON-2909%2CCON-2910%2CCON-2911%2CCON-2912%2CCON-2913%2CCON-2914%2CCON-2865%2CCON-2866%2CCON-2923%2CCON-2927%2CCON-2928%2CCON-2959%2CCON-2960%29%20ORDER%20BY%20key%20ASC))

Nodo Figma: `4106:170620` ("New Consent Template"). Lista de templates a la
izquierda, editor en el medio, preview a la derecha (desde 2026-10-07 el preview
se abre en un drawer, ver al final). Código en
`src/pages/settings/Consents.tsx` (pantalla) y
`src/components/settings/ConsentDocument.tsx` (la hoja del preview).

## El preview es una hoja de documento (2026-09-24)

Pedido de Julián: el preview tenía que parecer **el documento que ve el
paciente**, no una tarjeta más de la interfaz.

- **Escritorio gris, hoja blanca.** El panel del preview pasa a fondo `#f5f6f8`
  y adentro va una hoja blanca con sombra de papel (borde de 1px + sombra
  suave + sombra larga abajo). El encabezado "Preview" / "Patient View" queda
  en el escritorio, fuera de la hoja: es de la app, no del documento.
- **Tipografía: la de la app, no serif.** Se probó con serif (Georgia) y Julián
  pidió volver a la de antes: Inter, cuerpo 12px, rótulos en versalitas de
  10px semibold, título 17px bold. El aspecto de documento sale de la
  estructura -hoja, membrete, recuadro, casillas, firma-, no de la fuente.
- **Membrete:** monograma de la clínica, "Los Angeles, Dental Clinic" y debajo
  "Consent sent: …", con filete azul de 2px. Título centrado con la etiqueta
  "Informed Consent" arriba.
- **Recuadro de datos** de 2×2 con líneas finas: Patient, Provider,
  Appointment, Procedure. Cada casilla lleva su rótulo con el ícono que pidió
  Julián; la cita separa fecha y hora en dos líneas.
- **Secciones** con rótulo en versalitas y filete: Diagnosis y Clinical
  Findings (sólo en la vista de clínica), Nature of procedure, Risk and
  complications y Patient acknowledgment.
- **Acknowledgment con casillas vacías** -es un formulario que el paciente
  todavía no firmó, no una lista informativa-. Son cinco afirmaciones (leyó y
  entendió, tuvo oportunidad de preguntar, entiende riesgos/beneficios/
  alternativas, sabe que puede rechazar, consiente voluntariamente) y un aviso
  debajo: todas deben estar marcadas antes de que el paciente firme.
- El **texto guía en cursiva** de Nature of procedure y Risk and complications
  vive en el editor, debajo de cada caja: es para quien redacta el template, no
  para el paciente (2026-09-25).
- **Cierre:** línea de firma "Patient / Legal Guardian" con una "X" al inicio,
  línea de fecha al lado, y pie "Page 1 of 1".

**La hoja crece con el contenido.** Tiene proporción carta (8.5×11) como
*mínimo*, pero con el texto real las secciones fijas (datos, acknowledgment,
firma) ya la dejan más alta que una carta. Se prefirió eso a escalar la página
entera con `transform`, que dejaba el texto en ~6px. Tope de 520px de ancho:
en una sola columna la hoja no se estira, se centra.

## Reorganización de la pantalla (2026-09-24)

Pedido de Julián: el preview se veía chico al costado y la pantalla no se
entendía de un vistazo. Misma lógica, mejor flujo:

- **Preview más grande y siempre a la vista.** Columnas `260px | editor |
  preview` con el preview 1.15× el editor (antes 300 / 1fr / 340). Va
  `sticky` arriba con scroll propio si la hoja es más alta que la ventana, así
  se sigue viendo mientras se edita. Debajo del título dice "What the patient
  receives".
- **Las columnas dependen del ancho del contenido, no de la ventana**
  (`@container`): con el menú expandido el contenido es ~250px más angosto que
  la ventana, y con los breakpoints de viewport el preview se aplastaba.
  ≥1024px de contenido: tres columnas · ≥768px: lista a la izquierda, editor
  y preview apilados a la derecha · menos: todo apilado.
- **El título del editor dice qué se está haciendo.** "Edit Template" con el
  estado (Active / Inactive, System) al lado cuando hay uno elegido, y "New
  Consent Template" cuando se crea. Antes decía siempre "New Consent
  Template", incluso editando uno existente, y repetía la descripción que ya
  está bajo el título de la página. (Es un desvío deliberado del Figma, que
  deja el título fijo.)
- **Guardar y Cancelar quedan fijos al pie del editor** (`sticky`), sin tener
  que bajar hasta el final para guardar.
- **Lista:** el panel se llama "Templates" (ya no repite el título de la
  página), "New template" pasa de link a botón azul relleno y chico (h-7, como Save), y el título de cada template
  hace hasta dos líneas en vez de cortarse.
- Cada tarjeta ocupa su propio alto (`self-start`) en vez de estirarse al de
  la más alta.

**Para que `sticky` funcione hubo que tocar el `<main>` de `AppShell`:** tenía
`overflow-x-hidden`, que fuerza `overflow-y: auto` y convierte a `<main>` en
contenedor de scroll aunque no scrollee -el `sticky` de adentro se calculaba
contra él y nunca se pegaba-. Pasó a `overflow-x-clip`, que recorta igual sin
crear contenedor de scroll.

## Pantalla terminada y documentada en el design system (2026-09-29)

Pedido de Julián: "armá bien la pantalla de consent que le falta documentar en
el design system". En el design system sólo estaba el toolbar de formato; el
resto vivía adentro de un solo componente de 456 líneas.

1. **La pestaña "All" quedaba cortada** ("Al") en la columna de la lista: las
   cuatro pestañas (Active, Inactive, System, All) no entraban en 260px. La
   lista pasa a 288px con las tres columnas y a 280px con dos. Verificado que
   la fila de pestañas ya no desborda (ancho de contenido = ancho visible).
2. **Encabezado estándar:** usa `SettingsPageHeader`, como Accounts y Ledger
   Options, en vez de un `h1` propio con las mismas clases.
3. **Botones del sistema:** New template (`Button` sm), Activate / Deactivate
   template (primary / secondary) y Cancel / Save pasan a `Button`. Antes eran
   botones hechos a mano con las clases copiadas.
4. **Colores con token:** los cuatro valores escritos a mano pasan a tokens
   -la tarjeta elegida a `info-bg`, el borde del aviso a `dash-bad-fg/30`, el
   escritorio del preview a `surface-muted` y el hover de la X del chip a
   `dash-blue/10`-. El conteo de colores sin token del design system bajó de
   101 a 97.
5. **Partes separadas y exportadas**, misma lógica: `TarjetaTemplate`,
   `ListaTemplates`, `SelectorProcedimientos` (maneja su propia búsqueda),
   `TextoConsentimiento`, `EditorTemplate` y `PanelPreview`. La pantalla sólo
   guarda el estado y las une.
6. **Design system → Pages › Parts › Consents.** Un ejemplo por parte y
   estado, como estaba al principio (Julián prefirió verlos separados), pero
   con la estética de Elements: descripción corta, **Playground** primero con
   lista, editor y preview juntos y sus *Controls* (template, activo, filtro,
   errores de validación, Patient View); cada ejemplo sobre el fondo de la app
   con su título y nota -tarjeta elegida, default, hover, inactiva y System;
   lista y sin resultados; procedimientos con chips, vacío y con error; texto
   lleno y vacío; editor editando, nuevo y con errores; preview de clínica y
   de paciente; toolbar- y **Specs** al final (medidas leídas de la pantalla
   dibujada, tokens y reglas). Todo se puede usar.


## Consent text: un solo editor, vacío de verdad (2026-10-03)

1. **Un solo editor de texto enriquecido**, como en el Figma. "Nature of
   procedure" y "Risk and complications" dejan de ser campos fijos: son
   encabezados del contenido de cada template. Un template nuevo arranca
   **vacío**, sin secciones ni guías, sólo el placeholder.
2. **La barra de formato funciona** (negrita, cursiva, subrayado, H1, H2,
   párrafo, listas) sobre lo seleccionado, cada ícono con su tooltip. Pegar
   pega texto plano. Las listas que Chrome mete dentro de un `<p>` se sacan.
3. **El preview pinta el mismo contenido**: los H2 se ven como el rótulo de
   una sección de la hoja; vacío, "No content yet". Se limpia el HTML antes
   de pintarlo (sólo las etiquetas de la barra, sin atributos).
4. **La pantalla arranca en un template nuevo y vacío**, como el estado Empty
   del design system; los templates se abren desde la lista.
5. Design system: *Consent text · Empty* sin secciones; *Filled* con los
   encabezados como contenido; *Formatting toolbar* ya no es decorativa.

### Vuelta atrás: los dos campos, sin nada escrito (2026-10-03)

Julián prefirió los **dos campos separados** con su guía ("Nature of procedure",
"Risk and complications"). Lo único que cambia respecto de antes: **las cajas
no traen nada escrito** (sin placeholder) en un template nuevo ni en el estado
Empty. La pantalla vuelve a abrir con el primer template de la lista y la barra
de formato vuelve a avisar que no está disponible.

El editor único de arriba queda **oculto** en `Consents.tsx`
(`EDITOR_UNICO = false`): poniéndolo en `true` vuelve esa versión entera
(editor, barra que aplica formato, preview con el HTML y la pantalla que abre
vacía). Su componente está exento en `exentos.json` para que no aparezca en el
design system.

## Cards con sombra, sin borde (2026-10-06)

Julián pidió que en toda la app las cards generales lleven la sombra de los paneles del Dashboard en vez de stroke.
En Consents: Templates y el editor. Las cards de adentro siguen con borde fino y sombra suave (`InnerCard`). Ver *Elements / Cards*.

## El preview pasa a un drawer (2026-10-07)

Pedido de Julián: el preview ocupaba mucho lugar como tercera columna; que sea flotante, para abrirlo cuando se quiera,
o un drawer como los formularios. Se eligió el **drawer** (es la regla de pop ups de la app) abierto desde un botón que
siempre está a mano:

1. **Dos columnas**: Templates (288px) y el editor, que se queda con todo el resto. Sin preview al costado, el editor
   deja de verse apretado; la lista vale 288px también con dos columnas (antes 280).
2. **Preview en el pie fijo del editor**, a la izquierda de Cancel y Save (botón secondary con el ojo). Como el pie es
   `sticky`, se abre desde cualquier punto del scroll: eso cubre lo "flotante" sin sumar un botón suelto encima de la
   pantalla.
3. **Drawer lg (560px)** con título "Preview" y bajada "What the patient receives". Todo el panel es el **escritorio
   gris** (`surface-muted`) con la hoja blanca encima, como estaba la columna: la hoja entra justa (512px de los 520 de
   tope). Arriba de la hoja, *Patient View* y una línea que dice qué se está viendo (con o sin diagnóstico y hallazgos).
4. **Pie de dos botones del mismo ancho**: *Back to editor* y *Save*. Save cierra el drawer y guarda; si falta algo, los
   errores quedan a la vista en el editor (el aviso rojo y cada campo).
5. La hoja muestra lo escrito hasta ese momento (el borrador, sin guardar). Se pierde el preview en vivo mientras se
   tipea: es el costo de sacarlo de la pantalla. La bajada del editor ya no dice "Changes show in the preview as you
   type" sino "Preview shows the sheet with your changes".
6. `PanelPreview` pasa a ser `DrawerPreview`. Design system (*Pages › Parts › Consents*): Playground en su propio iframe
   y con el control *previewOpen*; *Preview · Clinic view* y *Patient view* con el drawer abierto; el botón Preview en
   Specs.

### Segunda vuelta: pie en angosto y Storybook con Parts y States (2026-10-07)

Releyendo el CLAUDE.md nuevo se auditó la tanda contra cada regla de los `.md`. Quedaron dos arreglos y un cambio de
documentación:

1. **El pie del editor se cortaba en angosto.** Con Preview, Cancel y Save en una fila sin wrap (unos 302px), a 320px
   Preview quedaba fuera de la pantalla y a 360 se metía en el padding: rompía "de 320 a 1440+ nada se recorta"
   (`figma/README.md`, *Responsive*). Ahora el pie hace wrap: por debajo de ~370px **Cancel y Save bajan juntos** a una
   segunda línea, a la derecha (van en su propio grupo), y **Preview queda solo arriba**, a la izquierda. El pie pasa de
   61 a 109px de alto en ese rango. Medido en 320, 360, 390 y 1440: ningún botón sale del contenido de la card.
2. **Specs → Colors decía "Panels: border line"**, de antes de las cards sin borde (2026-10-06). Ahora dice
   `white · shadow-panel, no border`.
3. **La página de Storybook pasa a Playground, Parts, States y Specs**, como *Elements / Navigation* (#9): el CLAUDE.md
   dice "nada de listas sueltas" y que `ds:check` no alcanza. Reemplaza la lista de historias sueltas del 2026-09-29 (punto
   6), pero **cada estado sigue siendo su propia muestra**, con título y nota, dentro de *States* (agrupadas por parte:
   Template card, Templates list, Procedure picker, Consent text, Formatting toolbar, Editor y Preview drawer). *Parts*
   es la pantalla con una tabla de qué hace cada parte. Los dos estados del drawer siguen en historias aparte, en
   iframe, porque el drawer es `position: fixed`. *Narrow footer* es un iframe de 320px con la historia `NarrowFooter`
   (fuera de la página de docs): inline, las clases `sm:` responden a la ventana de escritorio y el editor salía de
   340px, así que no mostraba lo mismo que un celular.

## Estados de la columna Consent del procedimiento (2026-11-11)

**CON-4119** (epic CON-3118). Vive en Clinical Mode › Treatment Plan y Procedures: ver `clinical-mode.md` ›
*CON-4119: los estados de la columna Consent (2026-11-11)*.

## Campo vacío: *This field is required.* (2026-11-16)

1. El selector de procedimientos de la plantilla decía *At least one procedure must be listed.*; ahora dice *This field
   is required.* como el resto (`OBLIGATORIO`, regla en [figma/README.md › Validación](../README.md)). El aviso de
   arriba (*All required fields marked with (\*)…*) no cambia.

## Filtro de estado como Accounts (2026-11-20)

Pedido de Julián de un solo diseño de filtro (detalle en `settings-accounts.md`, misma fecha). Las pestañas **Active /
Inactive / System / All** de la lista de templates pasan al `FilterMenu`, al lado del buscador: grupo *Status* de una
opción, All primero como en Accounts, sin puntos de color y con la cantidad de cada uno. Sigue arrancando en Active
(no cuenta como filtro aplicado; Clear all vuelve a Active). `ListaTemplates` suma `todos` para las cantidades.

## *New template* en la fila del título (2026-11-20)

Pedido de Julián (*"botón a nivel de título, como en todos"*). *New template* sale de la card Templates y va al lado
de *Consent templates*, en `md`, como New employee o New location. La card queda con su título, el buscador, Filter y la
lista. `ListaTemplates` ya no recibe `onNuevo`.

## Mismo patrón que Coverage tables (2026-11-24)

**CON-3719** (Desactivar), **CON-3725** (Activar), **CON-3724** (Listar). Pedido de Julián con un HTML y un PDF de
estandarización: la pantalla pasa a la pieza común `components/settings/ListaEditor.tsx` (detalle del patrón en
`settings-billing.md`, misma fecha).

1. Lista de 340 px y editor, 20 px entre las dos cards; en angosto, apiladas (`@3xl` del contenedor, antes 288 px).
2. **Tarjeta**: nombre 14 px semibold y ⋮ a la derecha; debajo Active/Inactive, System y la cantidad de procedimientos.
   **Se va el switch** de la tarjeta.
3. **⋮**: *Deactivate* / *Activate*, línea y *Delete* en rojo. **Se va** el botón *Deactivate template* del editor.
4. **Reglas de Jira que el HTML no tenía**:
   - Deactivate (CON-3719) pide confirmación *Deactivate consent template?* con los procedimientos afectados y el texto
     de la historia (singular o plural). Toast: *The consent template has been successfully deactivated.*
   - Activate (CON-3725) frena si falta procedimiento o si otro template activo ya tiene alguno de sus procedimientos,
     con los textos de la historia. Toast: *The consent template has been successfully activated.*
   - Los **System** no se activan, desactivan ni borran (precondición `system = false`): las dos acciones quedan
     deshabilitadas y el menú dice por qué. Cambia lo anotado antes (*un template de sistema también se puede desactivar*).
5. **Delete** (con confirmación *Delete template?* y Undo) sigue el HTML, pero **CON-1484** *[Template] Delete Template*
   está **cancelada** en Jira: queda como propuesta a confirmar con Julián.
6. **Editor**: *Edit template* + pill de estado, sin la bajada (*Preview shows the sheet…*) y sin la pill System
   (queda en la lista). Pie común: Preview a la izquierda, Cancel · Save a la derecha, fijo abajo.
7. Sin coincidencias: *No matching results* (antes *No templates* con bajada).

8. **Preview más ancho** (pedido de Julián, dos vueltas): el drawer pasa de `lg` (560 px) a `2xl` (1000 px) y la hoja
   de 520 a 820 px (`className="max-w-[820px] sm:px-10 sm:pt-8"`), sin perder la proporción carta. Sólo en el preview
   de Settings: el detalle del consentimiento de Clinical Mode sigue con su drawer `xl` y la hoja de 520 px. En el
   celular ocupa toda la pantalla, como antes.

## Search, pestañas y Preview como red.dev (2026-11-24)

**CON-4094** (preview a pantalla completa), **CON-3724** (listar). Pedido de Julián con dos videos de red.dev
(`/settings/consents/:id/edit`): replicar la funcionalidad del buscador, las pestañas y el preview, sin tocar el resto
del patrón estandarizado.

1. **Pestañas Active · System · All** debajo del buscador, a todo el ancho (`ui/tabs`, `fullWidth`, como Coverage). Vuelven
   las pestañas y se va el *Filter* del 2026-11-20. *Inactive* no tiene pestaña (queda en All), como red.dev.
2. **Buscador de la lista** con X para borrar (`SearchInput clearable`, en `PanelLista`: vale también para Coverage).
3. **Search procedure** como red.dev: al hacer foco abre la lista de todos los procedimientos que no están elegidos
   (`CODE - Description`, con scroll), filtra mientras se escribe, X para borrar y *No results found.* sin coincidencias.
   Flechas, Enter y Escape. La lista suma el catálogo CDT de la app (`clinical/dental/data` › `PROCEDURES`) a los de los
   templates.
4. **Preview a pantalla completa** (`PreviewPaciente`, reemplaza a `DrawerPreview`): tapa la app; arriba *Back to editing*
   y *Patient View - {título}*; el aviso gris *Preview includes your unsaved changes. Save the template to keep them.*
   (CON-4094) y la hoja. Escape también vuelve. **Se van** el toggle *Patient view* y el *Save* del preview: red.dev no
   los tiene y CON-4094 pide que abrir o cerrar el preview no guarde.
5. **La hoja con el formato del PDF** (`settings/HojaConsentimientoPdf`): *Sample Dental Clinic* y dirección, *Consent
   created* con la fecha a la derecha, línea, *INFORMED CONSENT*, el título y una card por sección con su rótulo en
   banda gris: Patient, Provider, Appointment, Procedure, Diagnosis, Clinical findings, el texto del template, Patient
   acknowledgment y Patient/Guardian Signature (*Date and time [Completed when signed]*). Los datos de ejemplo son los
   de red.dev; Procedure usa el primer procedimiento elegido (sin ninguno, *D0000 — Sample procedure*).
   - **Anomalía**: en red.dev el texto del template es una sola card sin rótulo (editor único); acá son dos campos, así
     que van dos cards, *Nature of procedure* y *Risk and complications*.
   - `ConsentDocument` (la hoja de Clinical Mode, con firmas) no cambia: convendría alinearla al mismo PDF en otra tanda.
6. No se replica de red.dev (lo decidido en la estandarización sigue): *+ New* en el panel (va en el título de la
   pantalla), el título del editor con el nombre del template y su bajada, y *Activate template* en el editor (va en el ⋮).

## El editor dice "New template" (2026-11-24)

Devolución de Julián: el título del editor decía *Edit template* para uno cargado y *New consent template* para uno
nuevo, mientras el botón dice *New template*. Ahora dice **New template**, igual que el botón.

## El preview en el visor de documentos (2026-11-24)

Propuesta A (regla en `figma/README.md` › *Visor de documentos*). `PreviewPaciente` usa `ui/document-viewer`: mismo
contenido que antes (*Back to editing*, *Patient View - título*, el aviso gris de cambios sin guardar). La hoja
(`HojaConsentimientoPdf`) pierde su marco gris propio: el fondo lo pone el visor.
