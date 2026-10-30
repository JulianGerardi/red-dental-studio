<!-- Índice general: design-reference/figma/README.md -->

# Insurance — hallazgos del Figma

**Jira** (funcionamiento de la app; índice en [jira.md](../../jira.md)):

- Epics: CON-1252 [Patient] Patient Insurance Information · CON-1063 [Insurance Plan] Coverage Table · CON-1096
  [Insurance Plan] Predeterminations · CON-1100 [Insurance Plan] Deductibles and Benefits · CON-1109 [Insurance Plan]
  Coordination of Benefits · CON-1130 [Insurance Plan] Payment Table · CON-1113 [Organization] Carrier & Plan ·
  CON-1598 Insurance Estimate · CON-2687 Insurance Continuacion · CON-3283 Seguros 2 · CON-3259 Plan & Subscriptions ·
  CON-57 [Organization] Fee schedule
  ([historias](https://confidetally.atlassian.net/issues?jql=parent%20in%20%28CON-1252%2CCON-1063%2CCON-1096%2CCON-1100%2CCON-1109%2CCON-1130%2CCON-1113%2CCON-1598%2CCON-2687%2CCON-3283%2CCON-3259%2CCON-57%29%20AND%20issuetype%20%21%3D%20Bug%20AND%20status%20%21%3D%20Cancelled%20AND%20%28labels%20is%20EMPTY%20OR%20labels%20%21%3D%20%22design-system%22%29%20ORDER%20BY%20created%20DESC))
- Historias de abril: CON-2941
  ([Jira](https://confidetally.atlassian.net/issues?jql=key%20in%20%28CON-2941%29%20ORDER%20BY%20key%20ASC))

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

## New Subscription y New Depender: campos de a dos (2026-10-10)

Regla de Julián (2026-10-10, sobre una captura de Post payment con campos de anchos distintos): en los drawers los
campos van de a dos y del mismo ancho, y vale para todo. Está en *Components / UI / Drawer → Specs → Fields* y se
controla con `npm run ds:campos`.

1. New Subscriber: Name | Middle Name, Last Name | Birthday y Email (antes tres nombres por fila).
2. Subscription Information: Plan name entra en la grilla al lado de Subscriber ID y Carrier name.
3. New Depender: Coordination Order al lado de Carrier name y las cuatro fechas en una sola grilla.

## Select Subscriber y Dependent Patient pasan a `PersonSearchField` (2026-10-20)

Mismo pedido que `relationships.md` (2026-10-20): buscar una persona, igual en toda la app. Estos dos ya mostraban la
card de `PersonaSeleccionada` (avatar, DOB, email, borde azul) debajo del buscador, pero armada a mano con dos piezas
sueltas y dos bugs de paso: **Select Subscriber** (New Subscription) tenía el `SearchField` con el rótulo "Plan name"
pegado -copiado de otro campo- y la card de `PersonaSeleccionada` se mostraba siempre con `DIRECTORIO[0]` (Michael
Miller) aunque no se hubiera elegido a nadie todavía. Con `PersonSearchField` las dos cosas quedan resueltas de taquito:
el rótulo pasa a "Select person" y la card sólo aparece cuando `d.persona` matchea un nombre de verdad.

`ManageSubscriptionModal` no cambia: su `PersonaSeleccionada` con `DIRECTORIO[0]` es un display fijo (el suscriptor y
los dependientes ya cargados de esa suscripción, con lápiz para editar, no un buscador), y su propio bug de mostrar
siempre el mismo nombre hardcodeado es otro tema, no el de esta tanda.

## El alto queda igual al de Treatments, Ledger y Documents (2026-10-30)

Julián, con una grabación de pantalla: Insurance había quedado desactualizada respecto del alto que ya tienen las
otras pantallas del paciente -scrolleaba la página entera, con el menú del paciente yéndose junto con el contenido-,
a diferencia de Treatments, Ledger y Documents, que desde el 2026-10-25 llenan el alto que deja el menú y scrollean
adentro (ver patient-dashboard.md, misma fecha).

- La tabla de planes (`Patients Plans`) y los dos paneles de abajo (Subscription Information, Patient Information)
  pasan a compartir un mismo bloque que llena el alto que deja el menú y scrollea adentro, con el mismo truco de
  Treatments: `lg:relative lg:flex-1` por fuera, `lg:absolute lg:inset-0 overflow-y-auto` por dentro -así el bloque
  no entra en el cálculo del alto de la fila, que lo manda el menú-, y el degradé de abajo avisando que sigue.
- El wrapper del contenido (`<div className="min-w-0 flex-1">`) no tenía `flex flex-col`: sin eso los hijos no podían
  participar del `flex-1`. Era la pieza que faltaba para que Insurance se comportara como el resto.
- Verificado con Playwright a 1519×829: `document.documentElement.scrollHeight` da exactamente lo mismo en Insurance
  que en Treatments, Ledger y Documents (1101px); antes era mayor porque el bloque entero empujaba la página.
- `tests/patient-dashboard.e2e.ts` suma un test: la región de scroll existe y, al scrollear adentro, el menú del
  paciente (el link "Treatments") sigue visible.

Julián, de paso: **"Manage Subscription" baja al piso de su card** (`mt-auto` en vez de `mt-5`) para quedar a la misma
altura que Cancel/Save de Patient Information -la card de Subscription Information es más corta y el grid las estira
igual, así que sin eso el botón quedaba más arriba-. Verificado con Playwright: los dos botones comparten la misma
coordenada `y`.
