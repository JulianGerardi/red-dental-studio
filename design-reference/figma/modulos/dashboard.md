<!-- Generado partiendo dashboard-findings.md por módulo.
     Índice general: design-reference/figma/README.md -->

# Dashboard — hallazgos del Figma

# Dashboard — hallazgos del Figma (Platform Design, 9fYLxX9hlTj5unFthG4bBg)

Relevado 2026-08-25. Nodos:
- Provider: sección `3749:72259` → frame `3605:56445` (Default)
- Secretary: sección `3751:72342` → frames `3636:57488` (Populated) y `3632:58557` (Empty State)

## Estructura

Frame 1200×1224. Sidebar 58 · Header 64 · Page Content 1142×1165 (x=58, y=64).
Dentro: padding lateral 27 → contenido útil 1088.

| Fila | y | alto |
|---|---|---|
| Page Title | 24 | 19 |
| View Toggle Row | 59 | 35 (toggle 200×35, alineado a la derecha) |
| Stat Cards Row | 110 | 137 |
| Panels Row | 263 | 671 |
| Panel full-width | 950 | 191 |

**Orden de paneles según rol:**
- Provider: Appointments · Pending Task · Rooms→"Coming soon"
- Secretary: Pending Task · Appointments · Rooms (7 operatorios)

## Especificaciones confirmadas

**Stat Card** — `p-24`, `radius 8`, `shadow 0 4px 4px rgba(0,0,0,.05)`, `gap 8`.
Header: título 15px Inter Medium; icon slot 28px con glifo 18.05px; gap 41.
Valor 26px Bold; delta 13px `#b8b8b8`. Gap 2 entre ambos.

**Panel** — `radius 8`, `shadow 0 4px 14px rgba(100,100,100,.25)`.
Header 46px alto, `px-16 py-12`, título 13.5px Inter Bold.
Body `p-16`, `gap 12`.

**Appointment Card** — `radius 5`, `px-6.01 py-7.35`, `gap 6.68`,
`drop-shadow 0 4px 2px rgba(0,0,0,.05)`. Avatar 37.43 (`radius 10.69`).
Chips TR/CC alto 24.06 `radius 6.68`. Caja de hora 41.17×53.61 `radius 9.77`.
CTA azul `#1d56bc` `radius 6` `py-8`, texto 10px Medium.

Paleta encontrada: `#1d56bc` (azul), `#1a804d`/`#f0fcf5` (success),
`#fbe5e5` (danger light), `#f6f6f6` (campo), `#4a5565` (texto secundario),
`#1a1a1a` (nombre), `#b8b8b8` (delta), `#0f172a`, `#e4e4e7` (borde).

Tipografía: **Inter** en todo el archivo.

## Anomalías detectadas EN EL FIGMA

1. **Las dos filas no comparten grilla.** Stat cards: 352.343 de ancho, gap 15.485.
   Panels: 351.333, gap 17. Las columnas quedan desfasadas ~1px entre filas.
   El intent limpio sería 352 / 16 (3×352 + 2×16 = 1088 exacto).
2. **`30-02-2026`** en el date picker de Appointments — el 30 de febrero no existe.
3. **Dos paneles titulados "Rooms"** en la vista Provider: el tercero de la fila
   (que muestra "Coming soon") y el full-width de abajo (vacío).
4. **Nombres de capa que no coinciden con el contenido:** `Panel — Rooms` renderiza
   Appointments; `Panel — New (Coming Soon)` renderiza un header "Rooms";
   `Panel — Pending Task (Full Width)` también renderiza "Rooms".
5. **Idioma mezclado en el toggle:** "Recepcionista" (ES) junto a "Provider" (EN).
6. **Sidebar corto en Secretary (Populated):** 1067px de alto en un frame de 1234 —
   le faltan 167px. En Provider sí llega (1224).
7. **Page Content arranca distinto entre frames de Secretary:** y=64 en Populated
   (pegado al header) vs y=74 en Empty State (10px de aire). Mismo header de 64.
8. **La escala tipográfica se derrumba dentro de los cards.** El chrome exterior usa
   15/26/13px, pero los appointment cards usan 11/9/8 y el badge "Check In" queda en
   **5.87px** — ilegible. Parece un componente pegado y escalado ~0.75×.
9. **Título de panel en 13.5px** (medio píxel) contra 15px del stat card.

---

## Qué se aplicó en la réplica (2026-08-25)

Decisión del usuario: **proporciones fieles con tamaños cómodos** +
**arreglar solo lo visual, el contenido va tal cual**.

### Corregido (visual)
- **Punto 1 — grilla unificada.** Ambas filas usan ahora `gap: 16px` y comparten
  columnas. Verificado por medición, no a ojo: las tres columnas de stat cards y
  las tres de paneles arrancan en la misma `x` (81 / 451 / 822 a 1200px).
- **Puntos 6 y 7** no existían en la implementación: el sidebar ya se estira a
  toda la altura por flex, y el contenido ya arranca pegado al header.
- **Alturas de panel:** el Figma fija los tres en 671. La grilla los estira a la
  columna más alta en lugar de que cada uno abrace su contenido.

### Escala tipográfica
El chrome exterior se mantiene igual al Figma (15 / 26 / 13px). Los internos de
los cards suben ~1.3× y con piso de 11px:

| Elemento | Figma | Réplica |
|---|---|---|
| Título de panel | 13.5 | 15 |
| Nombre de paciente | 11 | 13 |
| Badge "Check In" | **5.87** | 11 (piso de legibilidad) |
| Chips TR/CC | 9 | 11 |
| Texto de campo | 9 | 12 |
| Hora | 8 | 11 |
| CTA | 10 | 13 |
| Badge de operatorio | 8 | 11 |

Al subir la escala, el bloque del paciente dejaba de entrar a lo ancho y truncaba
"Noah James Smith". Se recuperaron 6px achicando gaps (avatar 10→8, toolbar 6→4)
en vez de bajar la tipografía. Margen actual: 0px — un nombre más largo va a
truncar con elipsis.

### Dejado tal cual (contenido)
- `30-02-2026` en el date picker.
- "Recepcionista" junto a "Provider" en el toggle.
- Los dos paneles titulados "Rooms" (el de "Coming soon" y el full-width vacío).

### No replicado
La foto real del paciente (`Noah James Smith`) se reemplazó por un avatar de
iniciales, en línea con el resto de la réplica, que usa mock data propia.

### Pendiente
El **Header y el Sidebar del Figma difieren** de los de la app: el Figma tiene
"Hi! Dentist Sarah", selector "Abril - Los Angeles", atajo ⌘ en el search, avatar
con foto y un ítem de ayuda en el sidebar. Fuera del alcance de esta pasada
(el pedido era la pantalla del dashboard).

---

## Filtro por fecha y popover de detalle (Dashboard)

### El date picker ahora filtra
El chip de Appointments era estático. Ahora abre un calendario y filtra la lista
del panel. El componente sigue el `Calendar` de la librería **shadcn/ui kit for
Figma** que usa el archivo (encontrado con `search_design_system`), pintado con
los tokens de la app: día seleccionado en `--color-dash-blue`, bordes `#e4e4e7`,
tipografía 11–12px.

Extras sobre el diseño, marcados como propios:
- Los días **con turnos llevan un punto** debajo del número.
- Fecha sin turnos → estado vacío ("There are no appointments scheduled for this
  day"), en línea con el que ya usaba el sistema original.

**Conflicto resuelto:** el Figma muestra `30-02-2026`, una fecha que no existe.
Mientras el chip era decorativo se replicó tal cual (anomalía 4), pero al volverse
un filtro real no puede ser el valor seleccionado — no se puede elegir el 30 de
febrero. El default pasó a **28-02-2026**. Es la primera vez que la regla
"contenido tal cual" choca con "que funcione"; ganó que funcione.

### El detalle del paciente es un popover anclado, no un modal
El nodo `3632:58405` se llama "Patient Details Modal", pero **dentro del frame
está en `x=207`**, o sea flotando pegado al panel de Appointments — no centrado.
Estaba implementado como modal con overlay oscuro; ahora:

- se ancla a la card que se clickeó, 10px a su derecha
- **voltea a la izquierda** si no hay lugar en el viewport
- sin overlay oscuro; cierra con click afuera o Escape

Archivo renombrado a `PatientDetailsPopover.tsx` para que el nombre no mienta,
igual que mienten varias capas del Figma.

### Ajustes sobre el date picker y el popover

- **El borde azul es sólo estado activo.** El Figma trae el trigger con borde
  azul permanente; se cambió a `#e4e4e7` en reposo y azul al abrir, igual que el
  search y el selector de locación. Es una desviación deliberada del diseño.
- **El trigger se ve como los demás inputs**: `h-8`, radio 6, borde `#e4e4e7`,
  sombra `0 1px 2px rgb(0 0 0/.05)`, 13px. Medido contra el input de búsqueda del
  header: mismos cuatro valores.
- **El popover acompaña el scroll.** Estaba en `position: fixed` con coordenadas
  de viewport, así que al scrollear la card se iba y el popover quedaba clavado.
  Ahora usa `position: absolute` con coordenadas de documento
  (`rect.top + scrollY`) y se monta por portal en `body` para que no lo recorte
  el `overflow-hidden` del panel. Verificado: la separación card↔popover se
  mantiene en −4px antes y después de scrollear 300px.


## Rediseño del 2026-08-28 (`4430:57451`)

Ver el resumen en el README. Anomalías nuevas de este frame:

54. **El dashboard se titula "Patients".** Es la home del sidebar y muestra
    turnos, sala de espera y salas, pero el H1 dice lo mismo que la lista de
    pacientes. **Confirmado como error**: en el prototipo dice "Dashboard".
    Es la única de este frame que no se replica.
55. **El popup del paciente** (`4430:57474`) dice **"Start Enconter"** sin la u,
    abrevia "Reason for Visit" a **"Rsn for Visit"**, y repite **"Height"** en
    las dos medias filas, con el mismo valor. Además el icono ↑A
    (`AArrowUp`, "tamaño de texto") se usa tanto para Rsn for Visit como para
    Height.
58. **Mezcla de idiomas** en ese mismo popup: "17 Marzo, 2024" en una interfaz
    íntegramente en inglés. Ya pasaba en la versión anterior con "15 Marzo".

El resto se replica tal cual, con **una excepción**: el bloque del motivo de
la visita, que Julián pidió mejorar. En el frame el motivo es texto gris de
11px, truncado y apretado contra el label en la misma línea; siendo el dato
que explica la visita, pasó a renglón propio, completo y legible, con el label
arriba en el estilo de etiqueta en versalitas que ya usa la tira de stats.
De paso ahí se escribe **"Reason for Visit"** en vez de "Rsn", y el icono deja
de ser el de tamaño de texto (`AArrowUp`) para pasar a uno de historia clínica.
Los otros textos de la anomalía 55 —"Start Enconter", "Height" repetido— siguen
tal cual.


## Filtros del dashboard (2026-08-28)

Los dos embudos del frame están dibujados pero sin menú. En el prototipo
despliegan una lista de checkboxes y filtran de verdad; sin nada tildado se
muestra todo, y el botón lleva un contador cuando hay filtro activo.

- **Pending Task** filtra por Clinical Note / Lab Orders / Prescriptions /
  Referrals. Son las mismas categorías que estaban como tabs, así que **los
  tabs se sacaron por redundantes**.
- **Appointments** filtra por operatorio. El diseño no dice por qué debería
  filtrar; se eligió el único campo con variación en la card.

Efecto lateral: como el filtro funciona, cada tarea lleva su categoría real.
El frame rotula las cuatro cards "Referrals" bajo el tab "Clinical Note"
(anomalía 20) — eso sólo se sostiene en un mockup estático.


## Botón "Start Enconter" del popup (`4430:57478`)

Medido sobre el nodo: **142×32, radio 8, verde `#1e9850`**, texto 13 semibold
con el play a la izquierda y el chevron a la derecha. Es el mismo botón que la
ficha del paciente, y estaba mal replicado: iba como pastilla de 44 de alto,
estirada a todo el ancho y en otro verde (`#28c563`). De paso el de la ficha
usaba `#1a7f4b`; los dos quedaron en `#1e9850`, que además es el verde
"Check-in" del calendario.

## El bloque del motivo de visita: tres intentos

1. **Label arriba, valor abajo.** Resolvió el truncado del frame pero el motivo
   seguía a 13px, el mismo cuerpo que el plan.
2. **Motivo como titular** del panel celeste, a 15px semibold con una línea de
   separación. Tampoco convenció.
3. **Aplanado** (el actual). El problema no era el tamaño del texto sino el
   anidado: card `#fafbfe` → panel `#eef5ff` → card blanca, tres capas en un
   popup de 360. Ahora el motivo es **una fila igual a las de abajo** —es un
   dato del paciente como Height o Mobile Number— y el plan de tratamiento
   queda como la única pieza destacada, con la barra de acento azul del
   sistema. El panel celeste desapareció.

El chip **"+5"** de los procedimientos ahora despliega los ocho y vuelve a
plegar con "Show less". Ver la regla general en el README.

El botón "Start Enconter" mantiene el verde y el radio del nodo `4430:57478`
pero va en el escalón **md** (36 de alto): los 32 del nodo quedaban chicos al
lado del avatar.


## El filtro de fecha manda sobre todo el dashboard (2026-08-28)

Antes cada bloque tenía su mock fijo y sólo Appointments filtraba, así que el
día del encabezado no tenía nada que ver con lo que se mostraba. Ahora **todo
cuelga del filtro de fecha** del panel de Appointments: encabezado, tira de
stats, sala de espera, salas y tareas. Los datos por día viven en
`src/components/dashboard/dashboard-data.ts`.

- El encabezado dice **"Today"** sólo si la fecha elegida es realmente hoy; si
  no, el día de la semana que corresponda.
- **Los números de la tira se calculan de las listas**, no son un mock aparte.
  El frame dice 6 / 3 / 2 mientras el panel muestra tres turnos; el día por
  defecto se armó con seis turnos, dos ya completados, para que el número del
  Figma sea cierto en vez de una etiqueta suelta.
- Hay tres días cargados (28-02, 03-03 y 10-03 de 2026), marcados con punto en
  el calendario. Cualquier otro día muestra los estados vacíos de cada panel.

Verificado: al pasar del 28-02 al 03-03, el encabezado cambia de
"Saturday • February 28, 2026" a "Tuesday • March 3, 2026", los stats de
6/3/2 a 3/1/1, los turnos de 9 a 4, las salas ocupadas de 4 a 2 y las tareas
de 8 a 4.

## "Edit appointment" en el kebab de la card

El kebab del frame está dibujado sin menú. Despliega **"Edit appointment"**,
que abre **el mismo modal de New Appointment** con los datos de la card ya
cargados: paciente, provider, operatorio, la fecha del dashboard, la franja
horaria derivada de la hora de la card y el estado. El título pasa a
"Edit Appointment" y el toast final dice "updated" en vez de "booked".


## Actualización del popup del 2026-08-28 (`4430:57474`)

El frame se rehizo y quedó muy cerca de la propuesta aplanada: **se fue el
panel celeste** y el plan pasó a una card blanca con barra de acento azul de
3px (`#1d56bc`). Dos cambios más:

1. **El motivo de la visita vive adentro de esa card**, como primera fila,
   separado del resto por un hairline `#f2f2f2`.
2. **Los procedimientos dejaron de ser chips**: ahora son una tabla
   CODE / PROCEDURE con la cabecera `#f9f9f9` de Insurance y Documents, y el
   total abajo a la derecha.

Lo que no se replica:

- Se mantiene **"Reason for Visit"** escrito completo y el icono de historia
  clínica, que Julián pidió al mejorar este bloque. El frame volvió a
  "Rsn for Visit" con el icono de tamaño de texto (`AArrowUp`). Con el label
  largo el motivo no entra en una línea, así que **envuelve** en vez de
  truncarse.
- El frame lista dos procedimientos y **cruza los códigos**: pone D0120 en
  "Bitewings – four radiographic images" y D1110 en "Periodic oral evaluation",
  al revés de como aparecen en el resto del archivo (anomalía 59). Se usa el
  mapeo correcto, y la tabla muestra los ocho del plan con scroll — el mismo
  Visit 1 del New Appointment.
- El botón queda en el escalón **md** (36) y no en los 32 del nodo, como pidió
  Julián.


## Reprogramar un turno (2026-08-28)

Editar un turno y cambiarle la fecha **lo mueve de día de verdad**: sale de la
lista del día viejo y entra en la del nuevo.

El dashboard **no salta solo** a la fecha nueva: eso hacía perder de vista el
día en curso. El toast informa el cambio y **ofrece ir**:
*"Mara Otero rescheduled to 03-03-2026."* con un botón **"Go to Mar 3"**.
Decide el usuario. Los toasts con acción duran 9 segundos en vez de 3,2, para
dar tiempo a decidir.

Verificado: Mara Otero pasa del 28-02 al 03-03; el 28-02 queda con 5 turnos en
vez de 6 y ella aparece en el 03-03, con los stats de los dos días recalculados.

Para eso el campo **Date del modal dejó de ser un select** con tres fechas
fijas de 2025 (`12-03-2025`, `13-03-2025`, `14-03-2025`, el placeholder del
frame) y pasó a ser el calendario: sin eso no había forma de reprogramar a un
día cualquiera. Los dos campos de hora sí conservan ese placeholder raro del
Figma.

## El calendario, estilo shadcn

El popover del date picker sigue ahora el componente `Calendar` de shadcn, con
los tokens de la app:

| | |
|---|---|
| Celdas | 36×36, `text-sm` peso normal, `rounded-md` |
| Hover | `bg-accent` / `text-accent-foreground` |
| Elegido | `bg-primary` / `text-primary-foreground` |
| Hoy | `bg-accent` |
| Días de otro mes | `text-muted-foreground opacity-50` |
| Cabecera | mes centrado en `text-sm font-medium`, navegación en los extremos |
| Navegación | botones fantasma de 28 con borde `border-input`, al 50% de opacidad hasta el hover |
| Popover | `bg-popover` con borde y `shadow-md` |

Se conservan los dos agregados propios: los saltos de año y el punto azul en
los días con turnos.


## El filtro de fecha sube al nivel de la pantalla (2026-08-31)

Vivia adentro del panel de Appointments, y desde ahi mandaba sobre las tres
columnas: metido en una de ellas parecia filtrar solo esa. Ahora esta arriba,
al lado del titulo, con una linea que dice explicitamente su alcance
-"Appointments, waiting room and tasks follow this date."-.

Al lado, un boton **Today** para volver al dia sin abrir el calendario y buscar
la fecha. Desaparece cuando ya estas en hoy: no tendria nada que hacer.

**Bug que aparecio con la mudanza**: el desplegable del calendario iba con
`right-0`, o sea que se abria hacia la izquierda. Colgado del panel de
Appointments, que estaba a la derecha, funcionaba; arriba a la izquierda del
dashboard quedaba en x=-136, fuera de pantalla. Ahora alinea por la izquierda y
tiene tope de ancho.

## Stat strip: una linea para el numero (2026-08-31)

El rotulo iba arriba y el numero abajo, en 26px, lo que partia cada metrica en
dos lineas y dejaba el numero lejos de lo que nombra. Ahora **rotulo y numero
van en la misma linea** -el numero baja a 18px para entrar- y el detalle
-"2 completed"- abajo. La tira paso de 88 a 72 de alto.

Las tres metricas comparten el celeste y el azul de Appointments. El frame le
daba un color distinto a cada una -naranja y violeta-, y eso leia como si el
color dijera algo: son el mismo tipo de dato del mismo dia, asi que el color no
las distingue, solo las agrupa. Queda como **desviacion deliberada**.

## Pending Task sin hueco al final (2026-10-06)

Las 8 tareas del día en tres columnas dejaban la última fila con dos y un hueco blanco a la derecha. Desde 1360px van
cuatro columnas (4 × 2); más angosto siguen tres, porque con cuatro se cortaba el nombre del paciente.

## Una sola superficie para las cards (2026-10-06)

Appointments, Waiting Room, Rooms y Pending Task usan `InnerCard` con la sombra nueva `shadow-inner-card`
(0 1px 3px, 8%) y un borde fino `line`: la de antes (0 4px 2px) se veía dura. Es la misma de los turnos del Patient
Dashboard y de las cards chicas de Patients y Scheduling. Ver *Elements / Cards → Card inside a panel*.

## Stroke más tenue y más fino en las cards de adentro (2026-10-06)

Julián: "el stroke de las cards lo haría un gris más tenue y la línea más finita". `shadow-inner-card` lleva ahora la
línea: 0 0 0 0.5px negro al 10% (en retina medio pixel; en una pantalla común 1px en #f0f0f0, antes #e4e4e7), más la
sombra suave. Un `border-[0.5px]` no sirve: Chrome lo redondea a 1px. Igual en el Patient Dashboard (turnos, tareas y
las listas de Pending documents, con `shadow-hairline`).

## El stroke va por dentro de la card (2026-10-06)

En Today Appointments (Patients) el stroke se veía raro: la lista tiene scroll y recortaba la línea, que iba por fuera
de la card, arriba y a los costados; sólo quedaba la sombra de abajo. Ahora la línea es `inset` (por dentro, negro al
12%) y la sombra de afuera casi no se nota (0 1px 2px, 4%): el borde es igual en los cuatro lados en todas las cards de
adentro.

## Today, a la altura del selector de fecha (2026-10-09)

Julián: "los inputs de date y today no tienen la misma medida". El selector mide 32px (`h-8`, como el resto de los
inputs) y Today estaba armado a mano en 36px (`h-9`), así que quedaba más alto y desalineado. Ahora Today es
`Button` secondary **md** (32px) y conserva la misma sombra sutil que el selector, para que se lean como par.

La fila se mudó a `FiltroFecha` (exportado de `Dashboard.tsx`) para documentarla: *Pages / Parts / Dashboard* pasa a
Playground, Parts, States (otro día, hoy, hover, calendario abierto, y el botón de filtro sin y con filtro) y Specs (las
dos alturas leídas del render).

## Sombra de las cards más suave (2026-10-10)

Julián: "los shadows de las cards madre están muy duros". De tres propuestas, las cards madre van con la A:
`shadow-panel` pasa a `0 1px 2px rgb(16 24 40 / 6%), 0 1px 3px rgb(16 24 40 / 8%)` (antes la del Figma, `0 4px 14px`
gris al 25%). Los números (`StatCard`, `StatStrip`) dejan su sombra propia del Figma (`0 4px 4px`, 5%) y usan la misma
que los paneles. La B queda para los pop ups flotantes, empezando por el detalle del paciente que abre la card de turno
(`PatientDetailsPopover`, antes `0 8px 28px` al 22%): `shadow-floating`. Las *Especificaciones confirmadas* de arriba quedan como estaban en el Figma;
esto es una desviación deliberada (ver `figma/README.md`). El detalle de las variantes, en `design-system.md`.

## El selector de fecha, alineado con el filtro de Notifications (2026-10-12)

Julián preguntó si el input de fecha del Dashboard estaba alineado con el filtro de fecha nuevo de Notifications. Tenían
la misma base (32px, borde, radio, sombra, ícono, días de 36px, puntos) pero se separaban en el texto (regular y un
color escrito a mano), el formato, el hover, el foco de teclado, el popover y cómo se marcaba hoy. Con su ok:

1. **Un solo calendario**: `MonthCalendar` (en `ui/date-picker.tsx`) lo usan el `DatePicker` y el `DateFilter`. Hoy va
   en azul y negrita en los dos (antes, en el `DatePicker`, con fondo celeste; el celeste ahora es el medio de un rango).
2. **Popover de Radix** también en el `DatePicker` (antes una caja propia): Escape lo cierra, el foco vuelve al campo y se
   da vuelta si no entra (en New appointment ahora abre hacia arriba en vez de cortarse). Mismo radio y anillo que el
   del filtro.
3. **Dos looks del campo**, con las clases compartidas (`fechaTriggerClasses`):
   - `field` (formularios y drawers): dd-mm-aaaa como el Figma, texto regular y foco con borde azul, como los demás
     campos (`control()`).
   - `toolbar` (Dashboard): **"Feb 28, 2026"**, medium, hover gris y anillo de foco: el mismo campo que el filtro de
     Notifications.
4. **Formato "Feb 28, 2026" en el Dashboard** (decisión de Julián): `28-02-2026` venía del Figma, pero en EE. UU.
   `03-04-2026` se lee 4 de marzo o 3 de abril. En los formularios queda dd-mm-aaaa (anomalía del Figma conservada).
5. El texto del campo pasa a `text-ink` (antes `text-[#0f172a]`, sin token). Al abrir, el calendario muestra el mes del
   día elegido (antes quedaba en el mes en que se abrió la primera vez, aunque Today cambiara el día).

La ilustración de ayuda (`help/demos.tsx`) muestra el chip como "Feb 28, 2026". Verificado: elegir un día cierra y
cambia el campo; Today y reabrir muestran el mes de hoy; Escape devuelve el foco; `ds:campos` sin problemas en los
siete drawers con fecha; e2e en `tests/dashboard.e2e.ts`.

**Para validar con usuarios:** si en recepción "Feb 28, 2026" se lee más rápido que 28-02-2026 (y si conviene llevarlo
también a los formularios), y si alguien extraña el fondo celeste de hoy.

## Propuesta: el Dashboard con volumen, dos variantes (2026-10-12)

Julián: "la app maneja volúmenes de información importantes, ¿qué se te ocurre para cuando tenemos muchas cards?". Con un
día real de una clínica de cinco sillones (35 turnos, 8 en la sala de espera, 28 tareas; `DIA_CARGADO` en
`dashboard-data.ts`, `?day=busy`) el Dashboard mide **10.614px** en escritorio y **16.882px** en el celular, y Pending
Task arranca a los 8.630px. Las causas: cada turno y cada tarea es una card de 190px, las listas crecen sin tope y
empujan lo de abajo, no hay orden (los turnos vienen 10:00, 10:30, 11:00, 11:30, 08:30, 09:00) y las tres columnas
crecen cada una por su lado.

Pidió dos variantes para elegir. Están las dos andando en la app, con un selector arriba del Dashboard (`BarraPropuesta`,
`?variant=a|b`), y en *Proposals / Dashboard with volume*. La versión actual no cambia. El día cargado tiene **los mismos
campos que el día de la demo**, sólo más cantidad.

**Lo común a las dos**:
- **Filas en lugar de cards** (`DashboardRows.tsx`), con **el mismo contenido de cada card**. Turno (`AppointmentRow`):
  hora, iniciales, nombre (abre la ficha rápida), Check In, provider, operatorio, los chips **TR** y **CC**, **Check Out**
  o **Cancel** (el mismo aviso que la card, `accionTurno`) y el kebab con Edit appointment (`MenuCard`). Tarea
  (`TaskRow`): paciente, Requested, el documento, Expired date, Register, Expiration date y **Complete this Task**
  (`completarTarea`). Salas: la misma `OperatoryCard`. La fila se adapta al ancho de su lista con `@container`: en
  renglones en angosto (el botón baja a su renglón si no entra, para no cortar provider y operatorio), en columnas desde
  768px.
- **Grupos con lo que ya dicen los datos** (`ui/list-group`, *Elements / List group*): los turnos en Scheduled (por hora)
  y Completed (plegado; es el dato de "2 completed"), las tareas por tipo (las cuatro categorías del filtro). La Waiting
  Room, sin grupos y en el orden de siempre.
- La tira de números, los filtros, los vacíos y la edición son los de siempre.

**A · Board (todo a la vista).** Appointments, Waiting Room y Pending Task a la par desde 1200px, cada panel con **alto
máximo** (la pantalla menos el encabezado, mínimo 520px) y su scroll, con los rótulos de grupo pegados arriba; las salas,
abajo, en grilla (tres por fila, seis desde 1536px: más angosto el nombre se cortaba). Debajo de 1200px, una lista por vez
con tabs. Con el día cargado: 1.214px de alto y Pending Task a la vista.

**B · Focus (la clínica primero).** Arriba, Waiting Room (con tope de 5) y Rooms a la par; abajo, Appointments y Pending
Task en una sola lista a lo ancho con tabs, en columnas como una tabla y con tope por grupo. Con el día cargado: 1.517px.

### Corrección: el contenido de las cards no se toca (2026-10-12)

Julián, sobre la primera versión: "hay datos que no debes cambiar o no agregues cosas que no están en la pantalla
original: en las cards faltan TR y CC, que son los botones rojos y verdes, y los botones de Check Out y Cancel". La
primera versión había inventado contenido, contra la regla de este módulo ("arreglar sólo lo visual, el contenido va tal
cual"). Se sacó todo lo que no estaba en las cards:

- El flujo Check In → Seat → Check Out que movía pacientes entre listas (vuelven Check Out y Cancel, con su aviso).
- Los minutos de espera con umbrales de color, el "en el sillón" y la columna *In the clinic* (vuelve *Waiting Room*).
- Los vencimientos inventados ("Overdue 3 days", grupos Overdue / Due today / Later) y "Complete" en lugar de "Complete
  this Task".
- La card "Next" con el único botón azul, la pill "New", "Open Scheduling", "Go to appointment" en el kebab y la barra
  de color por estado (decía estados que la card no tiene: todas dicen Check In).
- Los cambios en la tira de números ("longest 27 min", encuentros contados del sillón) y el paciente de cada sala.

Quedan el diseño de filas, los grupos, el scroll por panel, los tabs y los anchos.

**Anomalía que se mantiene, para decidir aparte:** los turnos completados siguen mostrando **Check Out**, como en la card.

**Qué validar con usuarios:** si recepción deja el dashboard abierto todo el día en un monitor (favorece A); si los
odontólogos quieren ver sólo sus turnos por defecto (el viejo toggle Provider / Recepcionista, como filtro por rol).

## Cierre de la propuesta: el layout de siempre, filas y "Show more" (2026-10-12)

Julián, después de ver A y B: "me quedo con la opción que tenemos", y para toda la app, cuando hay muchas cards o mucha
información, **como en la A: un scroll y un "Show more" que lo activa**, con **las cards que se diseñaron para la A**,
que ocupan menos. Las variantes, el selector de propuesta y la página *Proposals / Dashboard with volume* se borraron.

- **Layout:** el del Figma, sin cambios (Appointments · Waiting Room · Rooms y Pending Task a lo ancho).
- **Filas:** turnos y sala de espera con `AppointmentRow`, tareas con `TaskRow` (`DashboardRows.tsx`), con el mismo
  contenido que las cards. `TaskRow` vuelve a mostrar el tipo (en la A iba en el rótulo del grupo) y pasa a columnas
  recién desde 1024px de lista. Las salas siguen con `OperatoryCard`.
- **Tope y scroll** (`ui/show-more`, *Elements / Show more*): se ven 5 turnos, 5 en espera, 6 salas y 5 tareas; "Show N
  more" abre el resto adentro de un scroll (alto máximo `min(70vh, 640px)`, nunca menos que cerrado) sin estirar la
  página, con un degradé abajo que avisa que hay más; "Show less" vuelve. El orden de las listas es el de los datos.
- **Día cargado:** `?day=busy` sigue cargando 35 turnos, 8 en espera y 28 tareas en la fecha de la demo para ver el
  Dashboard con volumen (*Pages / Dashboard Busy Day*): 1.381px de alto contra 10.614px con cards.
- Las acciones de las cards pasaron a funciones compartidas (`accionTurno`, `completarTarea`): la card y la fila hacen
  lo mismo.

## Filas: la hora en su caja y las tareas agrupadas (2026-10-13)

Julián: "veo medio descolgado el horario" y en Pending Task "quedó muy separado el nombre, el request, los iconos".

- **La hora vuelve a la caja de la card** (`bg-dash-field`, reloj y hora, la "caja de hora" del Figma): en la fila
  angosta va a la izquierda y ocupa el alto de toda la fila, así la ancla; antes era texto suelto arriba y quedaba
  colgando sobre el hueco de los renglones de abajo. En la fila ancha, la misma caja en una línea (72×32).
- **Tareas agrupadas:** cada parte va pegada a la que acompaña, como en la card: el tipo con Requested, el paciente con
  el documento y Expired date, y las fechas a continuación. El aire libre queda antes de Complete this Task, no entre los
  datos. Antes los anchos fijos y un espacio flexible en el medio las repartían por toda la fila.

## Icono 3D en el saludo (2026-10-18)

Julián marcó el calendario del saludo ("Sunday - October 18, 2026"): ahí va el icono 3D, con la estética de la manito.

- Es el **emoji nativo** 📅 (el mismo recurso que 👋). Cambia **sólo ese icono**; el campo de fecha y *Today* de la fila
  de abajo, la tira de números y los formularios siguen con el icono lineal (una versión anterior los había cambiado).
- El saludo pasa de 19 a **16px**: a 19 se veía enorme al lado de los controles.
- **A validar:** el emoji se dibuja distinto según el sistema; el 📅 muestra una fecha fija ("17").

## Cada fila, su card (2026-10-13)

Julián: "debe ser estilo card, no debe estar todo unido; si no, no tiene continuidad el diseño" (Appointments, Waiting
Room y Pending Task). Las filas estaban todas en una caja de línea fina con divisores; ahora **cada fila va en su card
interna** (`TARJETA_INTERNA`: blanca, línea de medio pixel y sombra suave), con 12px entre una y otra, igual que las
salas de la columna de al lado y los turnos del Patient Dashboard. Adentro no cambia nada; el margen interno pasa a
10px parejo en los cuatro lados (antes 12 a la izquierda y 8 arriba y a la derecha). Lo hace `ListGroup`, así que el
Pending Task del Patient Dashboard toma lo mismo.

## Nueva organización: salas arriba, turnos a lo ancho y colores por acción (2026-10-13)

Julián pasó una imagen con la pantalla reorganizada y estos pedidos: Appointments y Waiting Room llenando el ancho, los
operatorios arriba "para que no ocupen espacio" (abierto a otra propuesta), un color por botón "para no confundir al
usuario", un botón al lado de Today para las preguntas frecuentes, que las filas ocupen toda la card blanca sin
cortarse, y en el Topbar el "Hi! Dentist" escribiéndose y después la fecha del día con otro ícono que no sea la mano.

- **Salas en una tira arriba** (`dashboard/OperatoryStrip.tsx`, *Components / Dashboard / Operatory strip*): una fila
  de `OperatoryCard` sobre la página (`enPagina`: card de página, sin borde) que llena el ancho. Cuántas entran sale del
  ancho: cada card mide al menos 232px, lo justo para "Operatory name" con la pill más larga (Unavailable); con 200px el
  nombre se cortaba. Las que no entran van a "Show N more" (la regla de listas largas), así que la tira nunca empuja los
  turnos para abajo: a 1440 se ven 5 (como en la imagen) y la sexta queda en "Show 1 more"; a 1920, las 6; en el celular,
  una. Sin título visible, como en la imagen; para el lector de pantalla la región se llama "Rooms".
- **Appointments y Waiting Room a la par** desde 1024px (`lg:grid-cols-2`), cada uno con la mitad del ancho; abajo de
  1024, uno debajo del otro a lo ancho. Las dos cards quedan del mismo alto.
- **Que no se corte:** con la mitad del ancho, la fila del turno queda en dos renglones y el botón al lado de "Dr. Elena
  Martinez · Operatory 2", que se lee entero (como en la imagen, pero sin el "Operator…"). La versión en una línea pasó
  de 768 a 896px de lista: a 1920 cada panel mide unos 840px y en una línea el provider se cortaba en "Dr. Elena …".
- **Un color por acción** (`ACCION_TURNO` en `AppointmentCard.tsx`, variantes de `ui/button`): Check In verde (variante
  nueva `success`: `dash-ok-fg`, el verde de la pill Check In, 4,9:1 con blanco; hover `green-deep`), Check Out azul
  (`primary`) y Cancel rojo (`destructive`). La imagen dibujaba Check In con borde negro; Julián pidió buscarle otro
  color del design system, y el verde es el de "llegó / arranca" en la app (pill Check In, Start Enconter). Lo usan la
  fila y la card de turno. `accionTurno` avisa "X checked in." para Check In.
- **Check In en los datos:** el turno de las 10:30 del día de la demo trae Check In, como en la imagen.
- **Preguntas frecuentes:** al lado de Today, un link con el look de `Button` secondary md de sólo ícono
  (`ShieldQuestionMark`, el escudo con el signo de la imagen) que lleva a Help, donde el Dashboard arranca abierto.
  Siempre visible; nombre accesible y tooltip "Frequently asked questions".
- **Fuera de la pantalla, como en la imagen:** la línea azul con la fecha arriba del título (la fecha del día pasó al
  Topbar y la elegida la dice el selector) y la línea "Appointments, waiting room and tasks follow this date.".
- **Saludo del Topbar** (`layout/Saludo.tsx`, *Components / Layout / Greeting*): "Hi! Dentist Sarah" se escribe letra
  por letra (60ms), queda 1,6s, se borra y se escribe la fecha del día ("Tuesday - October 13, 2026", el formato de la
  imagen) con el calendario azul en lugar de la mano; unos 5s en total. Una vez por sesión del navegador (sessionStorage):
  al recargar o volver va la fecha directo, para que no salude cada vez. Con reducir movimiento, la fecha directo. El
  lector de pantalla lee saludo y fecha juntos. Una copia invisible del texto más largo reserva el ancho, así el
  buscador no se corre mientras se escribe. La fecha es la de hoy, no la de la demo (el Dashboard sigue en Feb 28, 2026).
- `ShowMore`: si abierta entra entera (la sexta sala), no lleva el degradé de "hay más abajo".

**Para validar con usuarios:** si recepción lee los colores sin confundir Check In (verde, botón) con la pill Check In
(verde, estado) en la misma fila: la pill dice "Check In" aunque el paciente todavía no haya llegado. Convendría que la
pill diga el estado real (por ejemplo "Scheduled" antes de llegar); no se tocó porque cambia contenido y espera el ok de
Julián. También si la tira de salas arriba se consulta lo suficiente o conviene plegarla.

## Salas con color y filtro de la sala de espera (2026-10-17)

Julián: "si toco en una room debería aparecer en Waiting Room los pacientes que están en esa room, pero debería tener
un cambio visual para situar al usuario". Y en la imagen nueva, las salas con colores; aclaró después: "solo aplicá los
colores a las rooms" (las cards de turno quedan blancas).

- **Color por estado en la tira de arriba** (`OPERATORY_SURFACES` en `OperatoryCard.tsx`): borde de 1px y fondo con el
  mismo par de tokens de su pill: Available `dash-ok-fg`/`dash-ok-bg`, Busy `dash-busy-fg`/`dash-busy-bg`,
  Unavailable `dash-bad-fg`/`dash-bad-bg`. Adentro de un panel la card sigue blanca.
- **Tocar una sala filtra la Waiting Room** por esa sala; tocarla de nuevo la suelta. La card es un botón con
  `aria-pressed`. **Elegida:** el anillo azul de selección de la app (`dash-ring`, 2px a 2px, como la card de turno
  activa) y sombra; **las demás se apagan al 60%** hasta el hover o el foco. Así se ve de qué sala sale la lista sin
  perder el estado de las otras.
- **En la Waiting Room**, el filtro se lee como *Chip* pegado al título ("Waiting Room · Operatory 2 ×"); la ✕ ("Show all
  rooms") lo saca. A la derecha lo tapaba la pestaña del paciente que flota en el borde. Si la sala no tiene a nadie
  esperando: "No one is waiting for Operatory 1" con el botón *Show all rooms*. El filtro sigue al cambiar de día, como
  el de Appointments.
- **En el celular** la sala de espera queda abajo de todo: al elegir una sala, la pantalla baja hasta ella (sin
  animación con reducir movimiento).
- **Las salas se llaman como en los turnos** ("Operatory 1" … "Operatory 6"): el Figma decía "Operatory name" en todas,
  un texto de relleno; con ese nombre no se podía saber qué sala filtraba ni cruzarla con "Dr. Elena Martinez ·
  Operatory 2" de las filas.
- Arreglo de paso: editar un turno de la sala de espera filtrada guardaba sobre el índice de la lista filtrada; ahora
  usa el del día (`dia.waiting.indexOf`).

**Pendiente de Julián** (aparece en la imagen pero no en el pedido, no se tocó): Pending Task en una tercera columna,
la fecha azul arriba del título, y estados nuevos en la pill de cada turno (Confirmed, Waiting, In Progress,
Cancelled). **Para validar con usuarios:** si apagar las otras salas se entiende como "filtro activo" y no como "salas
deshabilitadas".

## Pending Task, tercera columna (2026-10-18)

Julián, con la imagen: "aplicá la Pending Task en tres columnas". Appointments · Waiting Room · Pending Task se reparten
el ancho **desde 1280px** (`xl:grid-cols-3`). Entre 1024 y 1280 siguen Appointments y Waiting Room a la par y Pending
Task abajo, a lo ancho (`lg:col-span-2`): con tres columnas a 1024px cada una mediría ~320px y los turnos se cortarían.
Más angosto, todo en una columna. Las filas toman su forma angosta (`@container`): a 1440px las de turno bajan el botón
a su renglón, como las tareas. Pending Task sigue con su filtro, Show more y vacío de siempre.

## Botón por panel, íconos de Pending Task a la derecha y más gente en la agenda (2026-10-18)

Julián: "en Appointments siempre va a decir Check In y en Waiting Room Check Out", "en Pending Task los íconos van a la
derecha, alineados al botón azul" y "agregá más cards, así queda prolijo y vemos opciones cuando la agenda está llena".

- **La acción la dice el panel, no el turno**: Appointments (el paciente todavía no llegó) siempre *Check In*, verde;
  Waiting Room (ya está adentro) siempre *Check Out*, azul. Lo pasa `pages/Dashboard.tsx` (`accion`), y los datos del
  día ya no traen `accion`. **Cancel** deja de aparecer en el Dashboard (era una card suelta del frame); el componente
  lo sigue soportando (`AccionTurno`, *Dashboard rows → States*). Pendiente de Julián: si Cancel va como opción del
  kebab de cada turno.
- **Pending Task angosto**: el documento y *Expired date* van contra el borde derecho (`ml-auto`), alineados con el
  botón azul de abajo, como en la imagen.
- **Día de la demo con más gente**: la sala de espera pasa de 3 a 6 y se reparte entre Operatory 1 a 4 (antes todos en la
  2), así el filtro por sala tiene a quién mostrar (Operatory 1 y 2, dos cada una; Operatory 5 y 6, vacías). La tira de
  números lo refleja (Waiting 6). Con el día cargado (`?day=busy`) se ven los topes y "Show N more".

## Topbar: el saludo más separado del menú (2026-10-18)

- Entre el botón de expandir el menú y el saludo: 14px (antes 8). El saludo sigue igual: se escribe "Hi! Dentist Sarah" y
  después la fecha, **una vez por sesión**; en las visitas siguientes de la misma pestaña se ve la fecha directo.
- Inputs del header medidos: locación 32, buscador 32, botón de perfil 40 (avatar de 32 + 4 de aire), campana 28. Los
  de 32 son el tamaño `md` de los botones; no se tocaron.

## Un solo avatar de persona (2026-10-18)

El avatar de la card de Appointments (44px, esquina 12) es la referencia que se toma para toda la app: `ui/avatar`.
Pending Task y las filas pasan del celeste al azul; el popover del paciente, del círculo al cuadrado redondeado (sin el
borde blanco). Regla en `../README.md`.

## Topbar: inputs del header más chicos (2026-10-18)

Julián: "achicá un poco esos inputs del header" (locación, buscador y perfil).

- Locación y buscador: 32 → **28px** (tamaño `sm` de los botones); texto 13px y 12px, íconos de 14px. Perfil: avatar de 28
  y botón de 32px (antes 40); nombre y rol a 11px. La campana ya era de 28.
- **A validar:** que 12px en el buscador siga leyéndose bien en monitores chicos y para quien tiene baja visión; el área
  de toque de 28px queda justo para el mouse, pero es el mínimo para pantallas táctiles.

## Sala siempre elegida, número que coincide y tira con scroll horizontal (2026-10-19)

Julián: "los Patients today, cuando clickeo, no coinciden con las cards que muestra"; "siempre debería estar marcada una
room por defecto"; y "las rooms en scroll horizontal, así queda más intuitivo y ganamos espacio".

- **El número coincide.** Era un 12 fijo en todas las salas. Ahora "Patients today" es la cantidad de turnos de esa sala
  en el día (`dia.appointments` filtrado por operatorio, calculado en `pages/Dashboard.tsx`). Elegir la sala 2 dice 3 y
  Appointments muestra 3 cards. Tocar una sala filtra **los dos paneles**, no sólo Waiting Room: si el número cuenta
  turnos y sólo cambiaba la sala de espera, no podía coincidir con nada de lo que se veía.
- **Siempre una sala elegida**, la primera por defecto; tocar otra la cambia y no se puede soltar (como las tabs: sin
  "todas"). Si el día no trae la sala elegida, la primera. El chip junto al título de Appointments y de Waiting Room dice
  la sala, sin ✕ (siempre hay una). Vacío propio: "No appointments in Operatory 5" / "No one is waiting for Operatory 5".
  Se fue el estado "Show all rooms".
- **Filter de Appointments sale**: filtraba por operatorio, que ahora decide la tira de arriba; con una sala siempre
  elegida los dos se pisaban (elegir otro operatorio en el filtro dejaba la lista vacía). Pending Task conserva el suyo.
  Pendiente de Julián: si Appointments necesita otro filtro (por provider, por estado).
- **Salas en scroll horizontal** (`OperatoryStrip`): una sola fila, cada card de 232px como mínimo, con snap al borde. A
  1440px se ven cinco y la sexta asoma, que avisa que se desliza; con pocas salas se reparten el ancho. Se fue "Show N
  more" de las salas: una fila sola ocupa el mismo alto con 6 que con 20, y sin botón de más.
- Dato: Operatory 6 pasa a Available (figuraba Busy con 0 pacientes) y se suma un turno de Sofia Chen en Operatory 4, que
  ya estaba en la sala de espera sin turno. El día de la demo queda en 7 turnos. Con `?day=busy`, 7 por sala ("Show 2
  more").

**Para validar con usuarios:** si recepción encuentra la agenda del día entera sin la vista de "todas las salas" (hoy
sólo se ve una sala por vez), y si la sexta card asomando alcanza para entender que la tira se desliza.

## Tocar el turno abre la ficha flotante (2026-10-19, tarde)

Julián: "cuando aprieto un appointment debería desplegarse en modo flotante al lado de la card la siguiente información"
(Figma `4430:57474`, Patient Info Content). La ficha ya existía (`PatientDetailsPopover`, hecha de ese mismo nodo): lo
que faltaba era el gesto. Con las filas, sólo el **nombre** la abría; la card entera sí.

- **La fila entera abre la ficha**, anclada al costado (con volteo si no entra), igual que la card. El botón de acción
  (Check In / Check Out), el kebab y los links de adentro no la abren. Hover gris en la fila y celeste mientras está abierta.
- El nombre sigue siendo un botón (`aria-expanded`): es el camino con teclado, porque la fila no puede ser un botón con
  otros adentro. Aplica a Appointments y Waiting Room.
- La ficha es la del Figma: avatar, *Start Enconter* (sic), nombre y *Planned*, motivo, visita con la tabla CODE /
  PROCEDURE y el total, y las filas de datos. Datos de ejemplo iguales para todos los turnos (no hay backend).
- **A validar:** si recepción espera encontrar ahí el estado real del turno y sus datos propios, hoy fijos.

## Vuelve la sala opcional; queda sólo el scroll horizontal (2026-10-19, más tarde)

Julián: "yo si quisiera puedo ver todos los appointments de todas las room, entonces lo anterior estaba bien; sólo dejá de
lo nuevo el scroll de las room". Se deshace lo anterior de este mismo día, salvo la tira.

- **Sala opcional otra vez**: sin ninguna elegida al empezar; tocar una la elige y filtra **sólo la Waiting Room**, tocarla
  de nuevo la suelta, y el chip ✕ "Show all rooms" junto al título también. Vacío: "No one is waiting for Operatory 5".
- **Appointments muestra todas las salas** y vuelve su botón Filter (por operatorio).
- **"Patients today" vuelve al 12 fijo** del dato. Ojo: no coincide con los turnos que se ven; si se calcula, tampoco
  coincidiría con el filtro de la Waiting Room. Queda a decisión de Julián.
- **Se conserva** `OperatoryStrip` en una fila con scroll horizontal (232px mínimo, snap) sin "Show N more", y los datos
  nuevos (Operatory 6 Available, turno de Sofia Chen).
