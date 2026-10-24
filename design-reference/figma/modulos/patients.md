<!-- Generado partiendo dashboard-findings.md por módulo.
     Índice general: design-reference/figma/README.md -->

# Patients — hallazgos del Figma

**Jira** (funcionamiento de la app; índice en [jira.md](../../jira.md)):

- Epics: CON-833 Pacientes - Migracion back graphQL · CON-3910 Consultar pacientes · CON-2107 Patient
  ([historias](https://confidetally.atlassian.net/issues?jql=parent%20in%20%28CON-833%2CCON-3910%2CCON-2107%29%20AND%20issuetype%20%21%3D%20Bug%20AND%20status%20%21%3D%20Cancelled%20AND%20%28labels%20is%20EMPTY%20OR%20labels%20%21%3D%20%22design-system%22%29%20ORDER%20BY%20created%20DESC))
- Historias de abril: CON-2858
  ([Jira](https://confidetally.atlassian.net/issues?jql=key%20in%20%28CON-2858%29%20ORDER%20BY%20key%20ASC))

## Patients — List (nodo `3638:59529`) y Patient Details Modal (`3632:58405`)

### Especificaciones aplicadas

**Tabla** (`3638:61352`): shell `radius 8` borde `#e7e7e7` · header `44px` sobre
`#f9f9f9` · filas `56px` · `px-16`. Anchos de celda fijos
(200 / 180 / 260 / 160 / 72) repartidos con `justify-between`. Avatar `32px`
sobre `#1a4da9`. Todo el texto en **12px SemiBold `#71717a`**.
Badges `px-8 py-3 rounded-full` con borde: Completed `#1a804d`/`#f0fcf5`,
Proposed `#99660d`/`#fffaf0`, In Progress `#174596`/`#f0f2ff`.

**Modal**: 309 de ancho (llevado a 340 por la escala tipográfica), barra azul
`#1d56bc` de 66px, cuerpo con borde `#1a4da9` de 1.13px, avatar de 75.5px
montado a caballo en `left 24 / top 12` con borde blanco de 4px.

### Anomalías nuevas (13 a 18)

13. **La tabla de pacientes es el componente de referrals.** La capa se llama
    `table/referral-table` y el footer dice **"Showing 6 of 18 referrals"** — en
    una pantalla de pacientes y con 11 filas a la vista, no 6.
14. **Dos azules distintos.** El breadcrumb usa `#0056ef`; el resto de la UI usa
    `#1d56bc`. Son colores diferentes, no estados del mismo.
15. **Typo en el nombre del token**: `--color-confindetally` (con una "n" de más;
    debería ser "confidentally").
16. **Copy de locación en la pantalla de pacientes**: el subtítulo dice
    "Set your location name. Add the location you need."
17. **Formatos de fecha mezclados** en la misma columna: "April 2" / "Jan 15" /
    "Mar 8" / "June 2" / "Jun 3" / "March 15".
18. **Español dentro del modal en inglés**: "34 años" y "15 Marzo, 2024".

Todo lo anterior es contenido y se replicó **tal cual**, según lo acordado.
Lo único corregido fue visual: el alto fijo de la fila de label en el grid de
stats, porque "Primary Insurance Plan" ocupa dos líneas y desalineaba la columna
derecha respecto de la izquierda (verificado: ambas columnas arrancan en las
mismas `y` y miden 152).

### Pendiente del módulo Patients

Faltan 4 pantallas del mismo módulo: **New Patient Modal (Base)** `3639:55808`,
**New Patient Modal (With Guardian)** `3640:56478`, **Edit Contact Modal**
`3640:74270` y **Edit Patient (Full Page)** `3640:72713`.

---

## Patients — las 4 pantallas restantes + unificación tipográfica

### Pantallas agregadas
- **New Patient Modal** (`3639:55808`, form `3640:73356`, 860×818) — dos columnas
  de 380.5: General Information y Demographic Information, footer Cancel/Save.
- **New Patient con guardián** (`3640:56478`) — idéntica, más una sección
  Guardian Information debajo de la columna izquierda. Se resolvió con una prop
  `withGuardian` sobre el mismo componente, no duplicando la pantalla.
- **Edit Contact Modal** (`3640:74270`, form 860×521) — Contact Information
  (área + teléfono, email) y Address Information (2 líneas, país/estado, ciudad/ZIP).
- **Edit Patient (Full Page)** (`3640:72713`, 1200×1359) — tres secciones a 1088:
  General (2×2 + 1 full), Demography (7 selects + checkbox) y Address (3×2).

Conexión: "New Patient" y "+ Guardian" abren sus modales, el kebab de una fila
abre Edit Contact, y el click en la fila lleva a `/patients/edit`.

### Anomalía 19
**El bloque "Use this option only to link a person that already exists in the
system…" aparece 3 veces en el mismo formulario de New Patient**, en posiciones
que no se relacionan: dos veces en General Information y una tercera en el medio
de Demographic Information, entre Language y Religion. Es un componente
placeholder repetido. Se replicó tal cual.

### Anomalía 20
El layer de la columna izquierda se llama `Demographic Information` pero renderiza
**"General Information"** — otro nombre de capa que no coincide con el contenido.

### Escala tipográfica unificada

Los dos títulos de página tenían tamaños distintos en la réplica (Dashboard 24px
bold, Patients 20px semibold). **Medido sobre los PNG del Figma, la altura de
tinta de "Dashboard" y de "Patients" es la misma: 15px** → ambos son 20px
SemiBold. Se corrigió el Dashboard y se extrajo un componente `PageTitle` para
que no puedan volver a divergir.

Escala vigente en toda la app:

| Rol | Tamaño |
|---|---|
| Título de página | 20px SemiBold `#09090b` |
| Título de panel / sección | 15px Bold (14px en cards de formulario) |
| Cuerpo / controles | 13px |
| Secundario, celdas de tabla | 12px |
| Badges y chips | 11px |
| Valor de stat card | 26px Bold |

### Tabs del Pending Task — resuelto midiendo, no estimando

Dos intentos fallidos antes de mirar los números:
1. Activo `shrink-0` + inactivos `flex-1` → cada click redistribuía los anchos y
   **se movían los cuatro** (82/77/77/77 → 80/74/80/80).
2. Los cuatro a ancho de contenido con `justify-between` → estable, pero
   amontonados a la izquierda y con anchos dispares (78/70/81/59).

La respuesta salió de medir los centros de los labels sobre el frame,
escaneando columnas de tinta en el PNG:

```
Figma:  511 · 590 · 668 · 748   → cuatro slots iguales
```

O sea el layout correcto es **`flex-1` en los cuatro**, que además es
completamente estable. Verificado: centros 512/591/669/748 (1px del Figma) y
sin movimiento al cambiar de tab.


### Variante "con guardián": el disparador no está en el Figma

En una pasada anterior agregué un botón "+ Guardian" en la página de Patients
para llegar a esa variante. **Ese botón no existe en el diseño** — fue un invento
para poder navegar hasta ahí. Removido.

El Figma muestra las dos variantes de New Patient como **frames sueltos** y no
indica qué las alterna. La réplica lo dispara con el **segundo checkbox de
General Information**, que revela la sección Guardian Information. Es una
elección propia y está marcada como tal en el código — si hay un control real
que la activa, hay que reemplazarla.

---

## Patients — Today Appointments y sin Recent Patients (2026-10-07)

Pedido de Julián sobre el costado de la lista (`src/pages/Patients.tsx`):

- **Se saca el panel Recent Patients** (con el mail y el link al perfil de cada card): la tabla de al lado ya es la
  lista de los últimos pacientes. `PatientCard` queda en el código con su story, sin usarse en la pantalla.
- **Today Appointments**: en lugar de la flecha suelta a Scheduling, cada fila (`AppointmentCardCompacta`) lleva el
  kebab de las tablas (`RowActionsMenu`) con **Edit** (abre el mismo modal "Edit Appointment" del Dashboard con los
  datos de la card; guardar avisa y cierra, los turnos del día no se modifican acá) y **Go to appointment** (va a
  `/scheduling`).
- **Son 10 turnos**, los últimos del día: `TURNOS_PATIENTS` en `dashboard-data.ts` suma 4 a los 6 del día. Es una
  lista aparte porque la tira del Dashboard calcula sus números de los turnos del día (6 / 3 / 2 del Figma). Con 10
  caben todos (`CANTIDAD_TURNOS = 10`), con scroll adentro del panel, y "View all" no aparece.
- Decisión propia, no está en el Figma: la pantalla no dibuja ni el kebab ni el menú de la card.
- En Storybook: *Elements / Appointment cards → Patients list card: states* (kebab hover, menú abierto, nombre largo
  y los 10 turnos) y *Components / UI / RowActionsMenu → Open*. El kebab no tiene anillo de foco propio (usa el del
  navegador, como el de las tablas), por eso no hay un estado de foco dibujado.

## Drawers del paciente: campos de a dos (2026-10-10)

Regla de Julián (2026-10-10, sobre una captura de Post payment con campos de anchos distintos): en los drawers los
campos van de a dos y del mismo ancho, y vale para todo. Está en *Components / UI / Drawer → Specs → Fields* y se
controla con `npm run ds:campos`.

1. **New Patient**: First | Middle, Last | Birthdate y Email en la columna izquierda (antes tres nombres por fila).
2. **Edit Patient**: Email entra en la grilla de los nombres; Demography pasa a dos columnas, como New Patient; la grilla
   usa `gap-4` y `sm:` como el resto (antes `gap-6 md:`).
3. **Edit Contact Details**: Area Code y Phone Number del mismo ancho (antes 96px + el resto) y la dirección de a dos,
   como New Location.
4. **New Allergy / Medication / Medical Condition / Past Surgery**: salen los campos de ancho entero (Reaction,
   Frequency, Status, Approx Start Date); van en la columna izquierda. Se va la opción `ancho: 'full'` de
   `data/clinicalItems.ts`.
5. **Insurance** (la pestaña del paciente): Assignment of Benefits y Release of Information, una debajo de la otra.


---

## Patients — sombra de Today Appointments (2026-10-10)

Pedido de Julián: el panel *Today Appointments* no tenía la misma sombra que el resto de las cards.

- El panel ya era `Panel` con `TARJETA_PANEL` (`shadow-panel`, igual que el Dashboard); lo que fallaba era la barra
  lateral que lo envuelve: tenía `lg:overflow-hidden` y el mismo ancho que el panel (336px), así que recortaba toda la
  sombra y en escritorio la card se veía chata. En celular no pasaba (el `overflow-hidden` era sólo `lg:`).
- Se saca el `overflow-hidden` de la barra. El tope de alto (`--patients-alto`, el de la tabla) sigue igual: el panel se
  achica solo porque él mismo tiene `overflow-hidden` y la lista de turnos ya scrollea adentro. Medido a 1440 y 1024:
  barra, panel y tabla siguen en 716px y la lista scrollea (688 de contenido en 592 visibles).
- Regla nueva en *Elements / Cards → Specs* (bloque *Shadow room* y en *Rules*): una card no va dentro de un contenedor
  con `overflow-hidden`; para topar el alto, el scroll va adentro de la card.

---

## Patients — barra lateral desde el título, Recent Patients de vuelta y filas enteras (2026-10-13)

Pedido de Julián, con una captura de cómo lo quiere: (1) vuelve Recent Patients con los últimos 10, (2) el botón *New
Patient* cambia de lugar y (3) la fila de un paciente no se corta.

- **Layout.** El título, la bajada y *New Patient* pasan a la columna de la tabla: el botón va al borde derecho de esa
  columna, en la fila del título. La barra lateral arranca a la misma altura que el título y el botón (195 px a 1440).
  Antes el botón estaba al borde de la página y la barra empezaba debajo. Abajo de `lg` todo se apila: encabezado,
  búsqueda, tabla y después los dos paneles.
- **Recent Patients vuelve con 10.** Los pacientes nuevos entran primero en el store, así que los 10 primeros son los
  recientes. Misma card que antes (`PatientCard`: avatar, nombre con link al perfil, pill, mail y kebab con Edit) y
  el mismo `Panel` + globo con el total. La captura lo rotula "Recents"; se dejó "Recent Patients".
- **Filas enteras: `ui/show-more`.** La fila cortada era del tope de alto que se medía en la tabla (`--patients-alto`,
  con ResizeObserver) y de los paneles `flex-1` con scroll adentro: la lista scrolleaba con cualquier alto y quedaba
  una card a medias o un hueco en blanco abajo. Ahora cada lista usa la regla de listas largas (2026-10-12): se ven
  **4 turnos y 3 pacientes** enteros y "Show N more" abre el resto con scroll adentro (hasta `min(70vh, 640px)`), con el
  degradé abajo. 4 y 3 filas porque así la barra termina a la altura de la tabla a 1440 px (cada fila pesa 70 px).
  Se van `--patients-alto`, el `useEffect` que lo medía y `BotonVerTodos` ("View all" pasa a "Show N more").
- **Buscadores.** Cada panel tiene el suyo. El de Recent Patients está en la captura (con el placeholder de turnos
  copiado: se puso "Search recent patients"). Buscar ya no saca el tope: con muchos resultados siguen "Show N more".
- Anomalía a validar: la primera página de la tabla muestra los mismos 10 pacientes que Recent Patients (por eso se
  había sacado el 2026-10-07). Conviene probar con usuarios si el panel aporta o si "reciente" tendría que ser otra
  cosa (último turno, última visita).

### Se saca el link "Patients ⌄" (2026-10-18)

Pedido de Julián: el link de arriba de la pantalla no abría nada distinto de esta misma pantalla -navegaba a
`/patients` estando ya en `/patients`-, así que era un adorno sin función. Se saca, junto con el `mt-[15px]` que
compensaba su alto (`CONTENEDOR_PAGINA` ya trae `py-6`).

## Today Appointments y Recent Patients: el scroll queda adentro de la caja (2026-10-19)

Julián: "el scroll debe ser interior, no debe expandirse todo el cuadro en Today Appointments y Recent Patients, porque
si no pierde el grid de la pantalla y no queda en caja como está por default".

- Abierta, la lista crecía hasta `min(70vh, 640px)` y la barra quedaba mucho más alta que la tabla. Ahora `ShowMore`
  lleva `enCaja`: abierta mide **lo mismo que cerrada** y el resto se ve scrolleando adentro; el panel y la barra no se
  mueven. "Show N more" / "Show less" siguen igual. El resto de la app conserva el comportamiento de crecer.
- **A validar:** que con 4 y 3 filas a la vista alcance, o si conviene dejar más filas a la vista en pantallas altas.

## Un solo avatar de persona (2026-10-18)

La tabla, las cards de celular y Today Appointments / Recent Patients usan `ui/avatar`: cuadrado con esquinas
redondeadas en vez del círculo (Julián marcó que no seguía el estilo del Dashboard). Regla en `../README.md`.

## Today Appointments: el nombre lleva al paciente (2026-10-19)

Pedido de Julián: en *Today Appointments* el nombre del turno tiene que ir directo al perfil del paciente, como ya
hacía *Recent Patients* (`PatientCard`). *Recent Patients* ya mostraba sólo 10 con scroll adentro desde el 2026-10-13;
nada que cambiar ahí.

- `AppointmentCardCompacta` (usada sólo acá, con `compact`) pasa el nombre de `<span>` a `Link`, mismo azul y
  subrayado al hover que `PersonCell` y `PatientCard`. El turno no trae el id del paciente -no hay backend-, así que
  el id sale de `slug(appt.name)` (ahora exportado de `data/patientsStore.tsx`): los turnos de pacientes que están en
  la lista (Sofia Chen, Daniel Ortiz, Thomas Davis, Lena Park) van a su ficha real; los que no existen en la demo
  (Noah James, Mara Otero…) abren igual la pantalla del paciente -es mock, siempre muestra "John Smith"-, consistente
  con cómo ya se comporta cualquier otro link a `/patients/:id` en el prototipo.
- El kebab se queda igual (Edit, Go to appointment): el link es sólo para ir a ver al paciente; editar el turno sigue
  en el menú.

## Recent Patients, sin hueco ni disparejo contra la tabla (2026-10-19)

Julián, con una captura: "fijate que no quede en blanco o disparejo el bento, por ejemplo Recent Patients debe
coincidir con el final de la tabla, así no queda el espacio que te marco, y ambas card deben tener el mismo largo
tanto Recent Patients como Find Patients" (lo mismo pasaba en Billing, ver billing.md).

**La causa:** `LIMITE_TURNOS` y `LIMITE_RECIENTES` eran números fijos (4 y 3), elegidos a mano para que la barra
terminara a la altura de la tabla *a 1440px, con esta tabla*. Cualquier cambio de cualquiera de los dos lados -más o
menos pacientes, otra página, el ancho de ventana- los desajustaba de nuevo; no era la primera vez (Billing tiene el
mismo historial: "con cinco, Find Patient no llenaba su columna" llevó a agregar tres pacientes más al mock en vez de
arreglar la causa).

**El arreglo, en dos partes:**
1. La barra ya no se estira contra la tabla (`items-stretch`): eso crea un bucle, porque cuánto mide la barra
   dependería de cuántas filas decide mostrar Recent Patients, que a su vez depende de cuánto mide la barra. Se mide
   el alto de la columna de la tabla por separado (`altoTabla`, con `ResizeObserver`) y la barra toma ese valor fijo
   como su propio alto (`lg:h-[var(--alto-tabla)]`), sin volver a depender de ella.
2. Adentro de la barra, **Recent Patients** (la última card) lleva `flex-1`: se queda con lo que sobra después de
   Today Appointments (`shrink-0`, con su `limit` de siempre). Su `ShowMore` suma la prop `llenarAlto`
   (`ui/show-more`, *Elements / Show more*): mide la primera fila ya dibujada y el alto disponible, y calcula cuántas
   filas enteras entran -nunca un número adivinado. `min-h-[220px]` en la card es el piso para cuando la tabla es tan
   corta (la última página, con un solo paciente) que Today Appointments por sí solo ya pide más alto que toda la
   barra: sin ese piso, Recent Patients quedaba en 0 y desaparecía entera.

Verificado: con la tabla llena (10 de 11), el borde de Recent Patients cae a menos de 2px del borde de la tabla; en
la página 2 (1 paciente), Today Appointments se queda con sus 4 filas y Recent Patients no desaparece, se achica a su
piso. `tests/billing.e2e.ts` tenía un test que esperaba "tres pacientes" a mano; pasa a contar cuántos hay antes y
después de "Show more" en vez de un número fijo, porque ahora varía con el alto real de la ventana.

**Para validar con usuarios:** si 220px de piso alcanza en una pantalla angosta antes de que se note que Recent
Patients pisa el alto de la tabla (hoy ahí no tienen por qué coincidir: no hay suficiente tabla para igualar).

## New Patient: Select Person pasa a `PersonSearchField` (2026-10-20)

Mismo pedido y mismo cambio que `scheduling.md` (2026-10-20): los dos "Select Person" de New Patient (vincular a una
persona existente, y el guardián) usaban `SearchField`; pasan a `PersonSearchField`, con avatar y DOB/email por
sugerencia, como Add Relationship → Select person (el porqué completo está en `relationships.md`, 2026-10-20). Las
líneas de DOB/email salen de `DIRECTORIO` (el mismo directorio de Add Relationship, reexportado desde
`AddRelationshipDrawer.tsx`); los dos nombres de `PERSONAS` que no están ahí (Sarah Stone, Daniel Anderson) muestran
sólo el nombre, sin inventar fecha de nacimiento ni email.

## New Patient y Edit Patient según el Figma nuevo (2026-10-22)

Julián pasó dos secciones nuevas de Patients: **New Patient** (`3751:73452`, "Patients — List") y **Edit Patient desde la tabla**
(`5277:123056`, "Patients — Edit"). Los dos formularios comparten las mismas tres secciones -**General, Guardian y Demography**-
pero se usan distinto, y el flujo también:

- **New Patient: tres pasos**, Next Step / Return / Save. Next revisa lo obligatorio del paso y marca en rojo lo que falta; Save revisa los tres
  y vuelve al primero con algo por corregir. Guardian y Demography son opcionales (cada uno lo dice en su aviso) y **siempre están**:
  antes el paso Guardian aparecía sólo para un menor de 18 o con un checkbox.
- **Edit Patient: tres pestañas**, no pasos. Es la especificación de Julián, punto por punto:
  1. Las tres secciones accesibles directamente (`ui/tabs`, `fullWidth`), en cualquier orden.
  2. Los datos existentes, precargados (nombre, nacimiento, email, y lo demás que se sepa del paciente: `usePatients().datosDe(id)`).
  3. El botón principal es **Save Changes**, disponible desde cualquier pestaña.
  4. Cambiar de pestaña **no guarda**: se guarda al apretar Save Changes (los paneles quedan montados, ocultos, así no se pierde lo escrito).
  5. Si al guardar falla algo de otra sección, **esa pestaña queda marcada** (punto rojo, `alerta` de Tabs) y se lleva al usuario a la sección y **al
     campo** que falla (`useFormPaciente`: `revisar` devuelve sección y campo; `enfocar` busca `[data-campo]`). Al corregir, la marca se va sola.
  Si el usuario entra sólo a corregir el email, lo cambia y guarda desde General, sin pasar por Guardian ni Demography.
- **Los datos**: `NuevoPaciente` pasa a `DatosPaciente` (store) con los campos de las tres secciones; `usePatients()` suma `datosDe(id)`. El
  paciente de la tabla y el del dashboard (`/patients/john-smith`, `DATOS_JOHN_SMITH`) abren con sus datos; Abril Viola, Sofia Chen y
  Daniel Ortiz traen datos de ejemplo (portal vinculado, guardián, intérprete).
- **Validación**: obligatorios nombre, apellido y nacimiento; con *Associate a guardian* tildado, también el nombre y la relación del guardián
  (destildado, esos campos se deshabilitan y no se guardan); el email, si está, tiene que ser válido, y con la cuenta del portal pedida hace falta.
  Demography es opcional entero, como dice su aviso.
- **Cuenta del portal**: en New, la opción *Create a patient portal account using this email address*. En Edit, si ya existe se muestra como un estado
  (*Patient portal account · Linked*); si no, ofrece la misma opción que New.

### Anomalías del Figma y cómo se resolvieron

Cuando el Figma se contradice a sí mismo o trae un texto pegado de otra pantalla, ganó el sentido y queda anotado (cambiarlo es una línea):

1. **Subtítulo de New Patient** = el de Add Relationship ("Link a family member, guardian or guarantor to this patient."). Se deja "Create the patient record".
2. **Paso 3 de New Patient** (`5277:125924`) dice "Add Relationship", con los pasos *Person / Contact / Relationship* y "Next Step" en el último. Es
   New Patient (*General / Guardian / Demography*) y el último paso guarda (Save).
3. **Middle Name lleva asterisco** en los dos flujos y tres placeholders cruzados ("Last name" en Middle Name, "First name" en Last Name, "Last name" en
   Birthdate). Middle Name sigue **opcional** (mucha gente no tiene segundo nombre) y los placeholders son los de siempre (John / Lorem / Smith).
4. **Pie del paso Guardian** con tres botones (Cancel, Back, Next Step). Se mantiene la regla de dos botones del mismo ancho: Return y Next Step; Cancel
   sigue en la ✕.
5. **Avisos de Demography**: en New repite el del Guardian ("Optional section. Use this section when a guardian…") y en Edit dice "…These fields are
   optional in this prototype". Va uno solo para los dos: *Additional contact and address information. These fields are optional.*
6. **Dirección**: en New, "Adress line 1" es un select y Adress, City y Postal Code llevan asterisco; en Edit es "Address" (un input) y sólo City lleva
   asterisco, y el aviso dice que todo es opcional. Un solo campo "Address" (input), City (select) y "ZIP / Postal Code", **todos opcionales**, como dice el aviso.
7. **Preferred Language** con placeholder "408-XXX-XXXX" (el del teléfono): va "English".
8. **La cuenta del portal está arriba de las pestañas** y sólo en General, así que las pestañas bajarían y subirían al cambiar. Va dentro de General,
   debajo de las pestañas, que quedan fijas.
9. **El pie de General en Edit dice "Next Step"** y los otros dos "Save Changes": en Edit es **Save Changes en las tres** (especificación de Julián).
10. **Títulos de sección copiados**: Guardian y Demography de Edit dicen "General Information". Van "Guardian Information" y "Demographic Information".
11. **Datos de relleno** en Edit ("Abril" en Guardian Full Name, Phone, Address y ZIP; nacimiento 19/02/1993 con una tabla que dice April 2, 2025): se cargan los de la fila.
12. **Email a todo el ancho** en los dos frames. La regla de los drawers (de a dos, del mismo ancho; 2026-10-10) gana: Email va en la grilla, en la columna izquierda.
13. **New Patient ya no trae** *Link a person that already exists* ni el buscador *Select Person*: el Figma sólo dibuja Interpreter Required y la cuenta
    del portal. Se sacaron del alta (el componente de Settings → Employees que usa `LinkPersonCheckbox` no cambia). El guardián se escribe, no se busca.
14. **Gender** (era obligatorio en Demography) no está en el Figma nuevo: sale de los dos formularios.

La página completa `/patients/edit` (Figma `3640:72713`) no cambia: es otra pantalla, con otros campos (Address Line 1 y 2, Country, State…).

**Para validar con usuarios / con Julián:**
- ¿Middle Name obligatorio de verdad? (el Figma lo marca; acá es opcional.)
- ¿La dirección es opcional, como dice el aviso, o City y Postal Code deben serlo?
- **Menores de 18**: el paso Guardian ya no se impone. Toda la tabla de ejemplo tiene fecha de nacimiento 2025: ¿conviene un aviso o hacerlo obligatorio para un menor?
- ¿Cancelar o cerrar Edit con cambios sin guardar debería preguntar?
- ¿El guardián se escribe o se busca entre las personas del sistema (como en Add Relationship)? El Figma lo dibuja como texto.
