<!-- Índice general: design-reference/figma/README.md -->

# Insurance — hallazgos del Figma

Sección `3817:865128`, 9 frames. **Los nueve se llaman igual**:
"Patiens Plans — Documents (Default)". Las capas de modal, además, se llaman
todas "New Patient Form (With Guardian)", que no tiene nada que ver.

| Nodo | Pantalla | Estado |
|---|---|---|
| `3817:865704` | Insurance (4 planes) | ✅ hecho |
| `3831:897436` | Insurance (Priority a dos renglones, uno Inactive) | ✅ hecho |
| `3847:61696` | New Subscription — Use current patient details | ✅ hecho |
| `3847:78489` | New Subscription — Use a person that already exists | ✅ hecho |
| `3847:69663` | New Subscription — Add a new subscriber | ✅ hecho |
| `3847:82831` | Manage Suscription | ✅ hecho |
| `3847:91274` | Manage Suscription (otro estado) | ✅ hecho |
| `3847:95515` | New Depender | ✅ hecho |
| `3847:87067` | Edit Relationship (reusado de Relationships) | ya existía |

Se llega desde el ítem **Insurance** del panel lateral
(`/patients/:id/insurance`).

## La pantalla

Breadcrumb **Patients › Search Patients › Documents ›**, título
**"Patients Plans"** y a la derecha el switch **"Show plan history"**.

Tabla con grip de arrastre y columnas Order · Carrier · Plan · Subscriber ·
Relation · Coverage Period · Priority Period · Status. Order, Relation y Status
son pills outline: azul, gris y verde/rojo. En el segundo frame la celda de
Priority Period trae dos renglones (Primary … / Secondary …).

Debajo, dos cards:

- **Subscription Information** — buscador "Search for an existing
  subscription\*", el link **Add New Subscription**, la suscripción elegida
  como lista de pares icono/etiqueta/valor, y el botón **Manage Subscription**.
- **Patient Information** — Relationship to Subscriber\*, una caja de sólo
  lectura, Cordination Order\*, dos checkboxes, Coverage Start\* | Coverage
  End, Eligibility\* | Verification Date, Notes y Cancel/Save.

## Anomalías 60 a 66

60. **Nueve frames con el mismo nombre**, "Patiens Plans — Documents
    (Default)", con "Patiens" mal escrito. Las capas de modal se llaman todas
    "New Patient Form (With Guardian)".
61. **El breadcrumb termina en "Documents"**, en azul, en una pantalla de
    Insurance.
62. **"Cordination Order" sin la segunda o**, dos veces en la card de Patient
    Information. En el modal New Depender el mismo campo está bien escrito,
    "Coordination Order".
63. **La caja de sólo lectura repite el rótulo del select que tiene abajo**:
    "Cordination Order / Primary" y, pegado, el select "Cordination Order\*".
64. **"Manage Suscription"** sin la b en el título del modal, mientras el botón
    que lo abre dice "Manage Subscription".
65. **"New Depender" y "Dependers"** en vez de Dependent/Dependents, y
    **"Subcriber ID"** sin la s en los tres modales.
66. **"Showing 8 of 8 insurances"** con cuatro filas a la vista, y el
    placeholder **"Loremp"** en los tres campos de nombre del nuevo suscriptor.

Todo se replica tal cual.

## Colores, muestreados del frame

Las pills llevan **fondo tintado**, como el resto del sistema:

| Pill | Fondo | Texto |
|---|---|---|
| Primary · Self | `#f0f5ff` | `#174596` |
| Child · Active | `#f0fcf5` | `#1a804d` |
| Spouse | `#f5f5f5` | `#595959` |
| Inactive | `#fff2f2` | `#b22626` |

La caja de sólo lectura de Cordination Order va en `#eff4ff`, no en el
`#e8ecf7` de los chips de conteo.

## Decisiones propias

- **El switch "Show plan history" suma los planes vencidos**, no filtra por
  estado: el segundo frame muestra una fila `Inactive` con el switch apagado,
  así que esconder los inactivos contradecía el diseño. Sin historial se ven
  los 4 planes de los frames; con historial se agregan 2 vencidos.
- **El grip de las filas reordena de verdad** arrastrando, con toast. El frame
  lo dibuja pero no dice qué hace.
- **La columna Priority Period siempre nombra el orden.** En el primer frame
  las filas de Lucas Johnson traen el rango pelado ("01/12/2025 - Present") y
  las de Robert el desglose "Primary … / Secondary …". Con las dos formas
  conviviendo no se entiende a qué corresponde la fecha, así que todas las
  filas dicen el orden. Los planes del historial cierran el rango con fecha
  real, sin "Present".
- **New Depender se abre desde "Add New" de Manage Suscription** y al cerrarse
  vuelve a ese modal. El frame lo muestra suelto sobre la página, sin indicar
  desde dónde se entra.
