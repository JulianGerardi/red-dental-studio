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
