<!-- Generado partiendo dashboard-findings.md por módulo.
     Índice general: design-reference/figma/README.md -->

# Patient Dashboard — hallazgos del Figma

## Patient Dashboard (`3646:58836`) y flujo de navegación

Pantalla nueva: panel izquierdo de 218px (avatar, nombre, badge Active, edad,
"Start Encounter" verde, "Clinical Mode", nav de 6 secciones, y los bloques
**General** y **Contact**, cada uno con su lápiz) + área principal con 4
accordions clínicos 2×2, tabla de Insurance, Pending Task a dos columnas y una
columna angosta de Appointments con badges Booked / Cancelled / Fulfilled / No Show.

Reemplaza al `PatientDetail` que se había armado en la pasada de ancho, que venía
del sistema viejo y no del Figma.

### Flujo de navegación conectado

| Disparador | Destino |
|---|---|
| Nombre en la tabla (azul `#0056ef`, linkeado) | `/patients/:id` — dashboard del paciente |
| Kebab de la fila → "Edit" | Modal **Edit Patient** (el form con guardián, `3640:56487`, mismo componente con otro título) |
| Lápiz de **General** | Modal **Edit Patient** full form (`3640:72713`) |
| Lápiz de **Contact** | Modal **Edit Contact** (`3640:74270`) |

El lápiz de Contact resolvió una duda que había quedado abierta: el modal de Edit
Contact no tenía disparador conocido y estaba enganchado provisoriamente al kebab.

Nota: el nombre en la tabla del Figma es gris `#71717a`. Se pasó a azul linkeado
por pedido explícito — es un cambio sobre el diseño, no una réplica.

### Breakpoint, otra vez
El panel de Appointments quedaba debajo de Pending Task porque usaba `xl`
(1280px) y el frame del Figma mide 1200. Mismo error que ya había aparecido en la
grilla del Dashboard: **en este archivo las columnas de 3 y de 2 deben abrir en
`lg` (1024), no en `xl`.**

---

## Correcciones sobre el Patient Dashboard

### Edit Patient es página, no modal
El nodo `3640:72713` se llama literalmente **"Edit Patient (Full Page)"** y así
debe abrirse. Estaba puesto como modal desde el lápiz de General; ahora navega a
`/patients/edit`. El modal del kebab (`3640:56487`, el form con guardián titulado
"Edit Patient") sí sigue siendo modal — son dos cosas distintas.

### Tipografía de las appointment cards
Medido sobre el frame, en el Figma esas cards usan tamaños extremos:

| Elemento | Alto de tinta | ≈ fuente |
|---|---|---|
| Nombre | 5px | ~7px |
| Descripción | 3px | ~5px |
| Nombre en Pending Task (mismo panel) | 11px | ~13px |

O sea que dentro de la misma pantalla conviven ~7px y ~13px. En la réplica se
habían copiado esos valores literales (8/9/10px), rompiendo la escala acordada.
Corregido a la escala unificada: nombre 12, textos y badge 11. La columna pasó de
240 a **280** para que entre sin truncar.

### Los tabs no varían tipografía
Todos los controles de tabs de la app quedan en **12px**: Pending Task, Activity,
Next / Next Appointments, y el toggle Recepcionista / Provider. Verificado:
`tabsFontSizes: ["12px"]` — un solo valor en toda la pantalla.

### Efecto colateral resuelto
Al ensanchar Appointments, Pending Task quedó sin espacio y truncaba
"Elena Marquez". El Figma lo muestra a 2 columnas, pero con textos de ~7px. Con
la escala cómoda dos cards no entran a 1200px, así que va a **1 columna abajo de
1280 y 2 arriba**. Verificado: 0 elementos truncados en toda la pantalla.

---

## Cards clínicas: popup flotante (Figma `3646:59881`)

Las cuatro cards (Allergies, Medication, Medical Conditions, Past Surgery and
Hospitalization) **no expanden inline**: al clickearlas la card se pinta de
`#1d56bc` con texto e icono en blanco y el contador invertido
(`#eff6ff` de fondo, número azul), y cuelga un **popup debajo** alineado a su
borde izquierdo y con su mismo ancho.

Popup: fondo `#fafcff`, borde `#e4e4e7`, filas blancas. La primera fila viene
resaltada con `#eff6ff` y borde `#1d56bc`. Cada fila lleva nombre, badge de
estado (`Prescribed` azul / `Completed` verde), "Since: <fecha>", y acciones de
editar y borrar; debajo, la línea de dosis en 10px gris.

Se posiciona en coordenadas de documento y va por portal, así acompaña el scroll
y no lo recorta el contenedor.

El contenido de **Past Surgery and Hospitalization** es el del frame; el de las
otras tres categorías es mock propio con el mismo vocabulario de badges.

## La sección por defecto es Overview
El dashboard del paciente arrancaba en "Documents" por un valor inicial mal
puesto. Ahora arranca en **Overview**.

## Modales clínicos (`3751:76503`)

La sección se llama "Patient Profile — Documents" pero de las cinco pantallas
que tiene, cuatro son los formularios de alta de los bloques clínicos:

| Nodo | Frame | Alto | Estado |
|---|---|---|---|
| `3648:59976` | New Medical Condition Form | 484 | ✅ hecho |
| `3648:60265` | New Allergy Form | 552 | ✅ hecho |
| `3648:61266` | New Past Surgery Or Hospitalization Form | 416 | ✅ hecho |
| `3648:62265` | New Medication Form | 748 | ✅ hecho |

Los cuatro miden 555 de ancho, con los campos en dos columnas y Cancel/Save
abajo a la derecha. El campo principal siempre es un buscador con lupa. Cambia
sólo la lista de campos, que en el código vive en `CONFIG`
(`src/data/clinicalItems.ts`); el modal es uno solo,
`ClinicalItemModal.tsx`.

Campos por formulario, con el ancho que ocupan:

- **Medical Condition** — Medical Condition\* (fila), Status\* (fila),
  Approx Start Date\* | Approx End Date, Notes (fila).
- **Allergy** — Allergy\* (fila), Status\* | Severity\*, Reaction\* (fila),
  Approx Start Date\* | Approx End Date, Notes (fila).
- **Past Surgery or Hospitalization** — el buscador (fila),
  Approx Start Date\* (fila), Notes (fila).
- **Medication** — Medication\* (fila), Strenght\* | unidad,
  Dosage Form\* | Status\*, Approx Start Date\* | Approx End Date\*,
  el subtítulo **Direction for Use**, Dose\* | unidad, Frequency\* (fila),
  Notes\* (fila).

Las unidades de Strenght y de Dose son selects **sin label propio**: se apoyan
en el label del campo de al lado.

### Anomalías 44 a 49

44. **Dos de los cuatro modales se titulan "New Allergy".** El frame
    `3648:62265` se llama "New Medication Form" y el `3648:61266` "New Past
    Surgery Or Hospitalization Form", pero los dos muestran "New Allergy" como
    título. Se replica tal cual, según la regla de contenido literal.
45. **"Strenght"** en vez de "Strength".
46. **Notes es obligatorio sólo en Medication**, y ahí su placeholder es el de
    un formulario de referrals: "Include patient history, previous treatments,
    and specific questions for the specialist…". Los otros tres dicen
    "Add notes".
47. **Approx End Date es obligatorio sólo en Medication.** En Allergy y en
    Medical Condition el mismo campo va sin asterisco, y en Past Surgery
    directamente no existe.
48. **La fila del listado usa siempre el formato de medicación.** El popup
    (`3646:59881`) muestra "10 - ONCE DAILY" debajo de cada ítem, también
    para alergias y cirugías, donde ese dato no aplica. En el prototipo esa
    línea se arma con los campos que cada categoría sí tiene
    (severidad/reacción, notas, dosis/frecuencia).
49. **El primer ítem del listado aparece pintado de azul**, como si estuviera
    seleccionado. Es el estado hover capturado en el frame: en el prototipo el
    azul es hover y ningún ítem arranca marcado.


## Reason for Visit: el conteo deja de ser pill (2026-08-30)

En el bloque Reason for Visit del popover del dashboard, "8 Procedures" era una
pill azul con borde y "Visit 1" iba en peso normal. Quedaba al reves de lo que
importa: la pill se llevaba la mirada y el nombre de la visita -que es el dato-
pasaba desapercibido.

Una pill marca un estado; ese numero solo cuenta las filas de la tabla que esta
justo abajo. Ahora el conteo va en gris al lado y la negrita queda en
"Visit 1". Mismo criterio que en Treatment plans del New Appointment.

## Foto de perfil editable (2026-09-03)

El avatar de iniciales del panel izquierdo (`PatientSidePanel.tsx`, las seis
pantallas del dashboard) ahora tiene un botón de cámara que abre el selector
de archivos y reemplaza las iniciales por la foto elegida. Mismo componente y
mismo mecanismo que en la ficha de un empleado -ver README.md, "Foto de
perfil editable"-: `EditableAvatar` + `usePhoto`, persistida en `localStorage`
para que sobreviva a que el panel se vuelva a montar en cada tab del
paciente.
