<!-- Generado partiendo dashboard-findings.md por módulo.
     Índice general: design-reference/figma/README.md -->

# Scheduling — hallazgos del Figma

## Módulo Scheduling (sección `3847:166204`)

Seis pantallas + un frame de referencia de colores:

| Nodo | Pantalla | Estado |
|---|---|---|
| `3847:166205` | Calendar (base) | ✅ hecho |
| `3847:204065` | Calendar — Appointment Requests | pendiente |
| `3862:220908` | Calendar — New Appointment Modal | ✅ hecho |
| `3862:230569` | Calendar — Link Treatment Plan Modal | pendiente |
| `3856:208439` | Calendar — View Filters Panel | pendiente |
| `3856:214039` | Appointment Details Drawer (281×466) | pendiente |
| `1626:45098` | Reference — Badge Colors | referencia |

### Paleta del calendario (muestreada del frame)

| Estado | Punto | Fondo del bloque | Barra izquierda |
|---|---|---|---|
| Proposed | `#ffb82c` | `#fffaf0` | `#ffb82c` |
| Check-in | `#1e9850` | `#ddf0e5` | `#1e9850` |
| Booked | `#1d56bc` | `#e8eef8` | `#1d56bc` |
| In progress | `#4f46e5` | `#f5f0ff` | `#6633a6` |
| Fulfilled | `#17723c` | `#e9f5ee` | `#1e9850` |
| No-show | *(sin punto)* | — | — |
| Cancelled | gris | — | — |

Franja bloqueada `#e8e8e8`, líneas de hora `#ededed`, alto de hora 63px,
rango 08:00–18:00.

### Anomalías nuevas (21 a 24)

21. **Las siete columnas dicen "THUR".** Todos los días de la semana están
    rotulados como jueves.
22. **El toggle marca "Month" pero la vista es semanal** — siete columnas con
    franjas horarias, no una grilla mensual.
23. **Todos los eventos dicen "10:00 AM"** sin importar la franja en la que
    están: hay uno a las 13:00 que igual dice 10:00 AM.
24. **"No-show" es el único ítem de la leyenda sin punto de color.**

Además, la cabecera dice "May 27, 2022" pero los días numerados son 31 y 01–06,
que no corresponden a esa semana.

Todo replicado tal cual, según lo acordado para contenido.

### Scheduling — las 5 pantallas restantes

| Nodo | Pantalla | Disparador en la réplica |
|---|---|---|
| `3856:214039` | Appointment Details Drawer | click en un bloque del calendario |
| `3856:208346` | View Filters Panel | botón **View** |
| `3862:220908` | New Appointment Modal | **New appointment** y **Register appointment** |
| `3862:230569` | Link Treatment Plan Drawer | **sin disparador** — ver nota |
| `3847:204065` | Appointment Requests (poblado) | tab ASAP del panel flotante |

- El **Details Drawer** flota anclado al bloque, 10px a su derecha, con volteo si
  no entra — mismo patrón que el popover del Dashboard.
- El **Link Treatment Plan** no es un modal centrado: en el frame es un drawer
  pegado al borde derecho, a toda la altura. Se implementó así.

### Leyenda corregida
El contenedor se estiraba a los 1142px del contenido; ahora mide **713px** y
termina en "Cancelled". Ningún nombre se corta (`whitespace-nowrap` + `shrink-0`).

### Anomalías nuevas (25 a 28)

25. **"Reaseon for the visit"** en el Appointment Details Drawer — con "Reaseon".
26. **Start Time y End Time muestran una fecha** (`12-03-2025`) en el modal de
    New Appointment, no una hora.
27. **Las horas de la tarde se rotulan "13 PM, 14 PM, 15 PM…"** en el frame del
    New Appointment Modal, mientras que en el calendario base son "01 PM, 02 PM…".
    Los dos frames no coinciden.
28. **Las salas repiten las especialidades de los providers** en el panel de View:
    Operatory 1 "General Dentist", Operatory 2 "Pediatric Specialist", etc.

Y el bloque "Use this option only to link a person…" vuelve a aparecer **3 veces**
tanto en New Appointment como en Link Treatment Plan — el mismo placeholder que
ya aparecía 3 veces en New Patient (anomalía 19).

---

## Correcciones de interacción

- **El View es un desplegable**, no un modal centrado: se ancla al botón, 2px
  debajo y alineado a su borde derecho, sin overlay. El chevron rota al abrir.
- **El panel de Appointment requests queda pegado al FAB**: estaba a 96px del
  borde inferior, muy separado del icono. Ahora comparte el borde inferior con el
  FAB y deja 12px de separación horizontal, como en el frame.

### El FAB usa el anillo doble del design system

Escaneando el corte horizontal del FAB en el frame (`y=1117`) sale la estructura:

```
#0047c4 (3px) · #ffffff (3px) · #1d56bc (cuerpo, 60px) · #ffffff (3px) · #0047c4 (3px)
```

Es el patrón de foco de shadcn. **Desviación pedida:** el hueco entre el botón y
el stroke va **transparente**, no blanco como en el frame. Se implementa con
`outline: 3px solid #0047c4` + `outline-offset: 3px` en vez de un doble
`box-shadow`, porque con box-shadow el hueco hay que pintarlo de un color y acá
tiene que dejar ver el fondo. En reposo el outline queda transparente con la
misma geometría, así que al activarse no hay salto de layout.

Se aplica cuando el panel está **activo** y en `focus-visible`; `#0047c4` también
es el color de hover.

El panel de solicitudes entra con una microanimación de 180ms
(`fab-panel-in`: opacidad + 8px de desplazamiento + escala 0.96→1) con
`transform-origin` en la esquina inferior derecha, o sea que nace desde el FAB.
Va bajo `motion-safe`, así que se desactiva con `prefers-reduced-motion`.

`#0047c4` quedó como token `--color-dash-ring`. **Es el mismo valor de hover que
usa el otro archivo de Figma de este cliente**, así que conviene aplicarlo a
cualquier botón sólido azul del sistema, no sólo al FAB.


## El botón "Event" no abre nada

En una pasada anterior se le había colgado el drawer de Link Treatment Plan
(`3862:230569`), pero **no corresponde**: el Figma no indica qué abre ese botón.
El drawer quedó implementado en `src/components/scheduling/LinkTreatmentPlanDrawer.tsx`
pero **desconectado**. Cuando aparezca su disparador real, se vuelve a enchufar;
si resulta que no va, se borra el archivo.


## New Appointment Modal (`3862:220908`)

Modal de 757 en tres bloques por columna: **Patient and Scheduling** (bajada
"Complete the details below to schedule the appointment." + Patient\*),
**Details** (Requestor, Reason for Visit, Date\*, Start Time\* | End Time\*,
Operatory\*, Status\*) a la izquierda; **Providers** (Primary\* y Additional
Provider\*, los dos con buscador "Search by Name") y **Additional**
(tres checkboxes + Notes) a la derecha.

### Columna de horarios (`3862:224820`, "appointment-item-2")

190 de ancho, **por fuera del modal**: flota a su derecha, encima del overlay.
Va pegada, no separada: el modal ocupa x 130–887 y la columna arranca en 879,
o sea que se monta 8px encima. Las dos miden 813 de alto y arrancan en la misma
y, así que la columna toma exactamente la altura del modal y sus 11 franjas se
reparten ese alto (~70 cada una).
Cabecera con avatar, "Sarah Stone" / "General Dentistry", la fecha
"Sábado, 19 de febrero de 2022" y la ayuda "Click on available time to
schedule". Debajo, las franjas 08 AM … 17 PM con un bloque rojo ocupado a las
09:30.

En el prototipo elegir una franja completa Date, Start Time y End Time de una
sola vez, y la franja elegida **se arrastra** a otra hora. La hora de fin sale
de la propia lista y no de sumar uno, para que 11 AM caiga en 12 PM y no en
"12 AM".

### Anomalías 50 y 51

50. **El mismo modal existe en dos versiones con checkboxes distintos.** En
    `3847:166204` los tres de "Additional" repiten "Use this option only to
    link a person that already exists in the system…"; en `3862:220908` dicen
    **ASAP**, **Follow-up** y **Premedicate**. Se toman los del frame nuevo,
    que son los que tienen sentido en un turno.
51. **Nada indica qué muestra la columna de horarios.** Aparece en los dos
    frames, siempre visible, sin control asociado. En el prototipo la dispara
    **ASAP**: es el único checkbox tildado en el frame donde la columna se ve.
    Es una inferencia — ver Desviaciones en el README.

Las horas de esta columna arrastran la anomalía 27: después de 12 PM siguen
"13 PM, 14 PM…".


## Rediseño del New Appointment del 2026-08-28 (`4430:61940`)

Las tres cards del formulario se fundieron en una sola columna izquierda
(Patient\*, Primary Provider\*, Additional Provider, Requestor, Reason for
Visit, Date\*, Start/End Time\*, Operatory\*, Status\*), y la derecha suma
**Link to treatment plan visit** arriba de "Additional":

- **Treatment plans**: dos cards con radio, badge de estado (`Accepted` verde /
  `Inprogress` azul), fecha "27, August 2025", doctor + terapia, y
  "2 Visits · 3 Procedures" en azul.
- **Visit**: dos cards con radio, "Visit 1" + chip "N Procedures", "Total
  1,270.00" a la derecha y los chips de procedimiento en `#dbeafe`, más un
  "+5" cuando hay más.

La card elegida lleva borde azul y fondo `#f8faff`.

Geometría de la columna de horarios: formulario 757 + panel 190 = frame 947, los
dos hermanos y de la misma altura. Va **pegada, sin solape** — el frame anterior
la montaba 8px encima.

### Anomalías 56 y 57

56. **La columna repite "19 PM"** en las dos últimas filas. No se replica: en un
    selector real serían dos franjas con el mismo nombre. La lista llega hasta
    las 19 una sola vez.
57. **"Inprogress"** en una palabra. En la leyenda del calendario y en los
    badges de turno el mismo estado se escribe "In progress".


## Rediseño propio de las cards de plan y visita (2026-08-28)

Pedido de Julián: otra propuesta para las cards de "Treatment plans" y "Visit",
alineada al sistema que ya existe. Vive en
`src/components/scheduling/TreatmentPlanPicker.tsx`.

Se propusieron dos variantes por listado y Julián eligió **una de cada una**:

| Listado | Elegida | Descartada |
|---|---|---|
| Treatment plans | **Card** (A) | fila densa de dos renglones (B) |
| Visit | **Fila + tabla** (B) | card con bloque gris y "+N" desplegable (A) |

- **Plan — card.** Alto fijo, barra de acento con el color del estado, radio en
  columna, pill de estado, terapia en gris y los dos chips de conteo con la
  fecha a la derecha.
- **Visit — fila + tabla.** Fila compacta con "Visit N", el chip de
  procedimientos y el total en azul; la elegida abre **la tabla completa** de
  procedimientos con la cabecera gris de Insurance y Documents, con scroll si
  la lista crece. Sin "+N": todo visible.

De la variante B de planes quedó anotado que **una sola línea no alcanza**: en
una columna de 365 no entran doctor, terapia, conteos, estado y fecha sin
cortar el nombre. Y de la A de visitas, que el bloque gris necesitaba
`min-h` para que las cards del listado midieran igual mientras estaban
plegadas.

**Qué se reusó del sistema, y de dónde**

| Recurso | De dónde viene |
|---|---|
| Barra de acento de 3px a la izquierda | bloques del calendario y card ASAP |
| Pills outline + fondo tintado (verde / azul) | badges de Relationships, Insurance y leyenda de Scheduling |
| Chips de conteo `bg-dash-count-bg` | "Patients today: 12" y avatares del header |
| Bloque gris `bg-dash-field` | filas de la card de turno del dashboard |
| Seleccionado = borde azul + `#f8faff` | el propio frame |

**Qué cambió respecto del frame, y por qué**

1. **El radio pasa a una columna fija a la izquierda**, igual en los dos
   listados. En el frame estaba metido entre el contenido y caía a distinta
   altura en cada card: en la de plan iba junto al nombre del doctor, en la de
   visita junto a los chips.
2. **La barra de acento toma el color del estado** (verde Accepted, azul
   Inprogress) y lo mantiene aunque la card esté elegida. Antes el estado sólo
   se leía en la pill; ahora se distingue de reojo.
3. **El total deja de ser gris chico.** Es el número que decide la elección:
   va alineado a la derecha, con la etiqueta "TOTAL" arriba y el importe en
   azul, en negrita, a 15px.
4. **Los procedimientos dejan de ser una nube de chips.** Iban creciendo y
   cambiaban el alto de cada card. Ahora entran en un bloque gris de alto fijo,
   dos líneas y "+N more procedures". Las cuatro cards del listado miden lo
   mismo.
5. La segunda visita pasó a ser "Visit 2" con otro total. En el frame las dos
   dicen "Visit 1" y "Total 1,270.00", que en un selector real no distingue
   una opción de la otra.
6. **Cinco visitas, no dos (pedido de Julián).** Se agregaron Visit 3, 4 y 5
   -cirugía del implante, pilar y corona, siguiendo la Comprehensive Implant
   Therapy-. Las cards del plan ya no dicen "2 Visits · 3 Procedures" del
   frame: los conteos salen de la lista y hoy dan "5 Visits · 19 Procedures".


## Day / Week / Month funcionando (2026-08-29)

El frame sólo dibuja la vista semanal y los tres botones eran decorativos.
Ahora son **tres vistas de la misma agenda**, como Google Calendar:

- **Day** — una columna a lo ancho con las horas de 08 a 18.
- **Week** — las siete columnas del frame.
- **Month** — la grilla real del mes, con los días de otro mes en gris.

Las flechas y el rótulo del encabezado siguen la vista: en Day avanzan un día
y muestran "Monday, May 30, 2022"; en Week saltan una semana y muestran
"May 29 – Jun 4, 2022"; en Month cambian de mes y muestran "May 2022". "Today"
vuelve a la fecha de referencia del frame.

**Los turnos se arrastran en las tres.** En Day y Week cambian de día y hora
(franjas de 15 minutos); en Month cambian de día y conservan la hora.

### Lo que hubo que cambiar del Figma

Para que las tres vistas sean la misma agenda hace falta **fecha real**. El
frame rotula las siete columnas "THUR" con los números 31, 01…06 (anomalía 2),
que además no forman una semana consistente. Las columnas ahora muestran el día
que corresponde, con la semana empezando en domingo y anclada al 31/05/2022.
La anomalía queda documentada pero **no se replica**: un calendario donde todas
las columnas dicen el mismo día no puede cambiar de vista.

### Responsive

- En celular **arranca en Day**, que entra completo sin scroll lateral.
- **Week** lleva scroll horizontal propio (ancho mínimo 760).
- **Month entra completo**: las celdas muestran **un punto por turno** con el
  color del estado en vez del chip con nombre, igual que Google Calendar en
  teléfono. Desde `md` vuelven los chips.


## Detalle del turno: cuarta propuesta (2026-08-30, reemplazada)

Las tres primeras eran la misma columna angosta y alta con distinta ropa
—cajas con borde, filas grises, pares con regla fina—. En un calendario ese
formato tapa media agenda y obliga a scrollear.

La cuarta cambia la **forma**, no el relleno: card **apaisada** de 460×240
—menos de la mitad de alto— con un riel a la izquierda que lleva la hora, la
fecha y el estado, y a la derecha el paciente más cuatro datos en dos columnas.
Entra al lado del bloque sin pelearse con la grilla.

Componentes, colores y tipografías son los del sistema: el mismo riel de acento
de los bloques del calendario, las mismas pills de estado y la misma escala de
texto.

Además, todos los popovers anclados —este, el del paciente y el clínico— se
corren hacia arriba lo justo para entrar enteros en pantalla (`useAnclaje` en
`src/lib/anclaje.ts`). Antes se dibujaban a la altura de la card y, con la card
abajo de todo, había que scrollear para leerlos.


## Detalle del turno: quinta propuesta (2026-08-30)

La apaisada no sobrevivia al telefono: a 390px quedaba en 366 de ancho, el riel
se comia 124 y las dos columnas de datos bajaban a **103px** -"Reaseon for the
visit" se cortaba en "Consult..."-.

Las cuatro versiones compartian ademas el mismo vicio de fondo: pares
etiqueta/valor con micro-titulo en mayusculas, o sea el volcado del formulario.

La quinta cambia el contenido, no la decoracion:

- **La duracion se dibuja.** Un huso vertical con dos puntas -hueca el inicio,
  llena el fin- y el lapso al costado. Es el instrumento de la agenda y ocupa
  menos que la fila "to 10:00 AM" que reemplaza.
- **Filas con icono en lugar de rotulo.** Un consultorio, un profesional y un
  motivo se reconocen por el icono; los `PROVIDER` / `OPERATORY` en versalitas
  sobraban y hacian leer dos veces.
- **Sigue siendo el bloque del calendario**: acento arriba y cabecera con el
  tinte del estado, los mismos de `BLOCK_STYLE`.

Mide 336x364 en desktop, y **abajo de `sm` deja de ser popover**: pasa a hoja
inferior a todo el ancho, con velo y agarradera. Es el patron que espera
cualquiera en un telefono y borra el problema de las columnas apretadas.

La card tambien **se cierra si cambia el ancho de la ventana**: sus coordenadas
se calculan una vez contra el bloque que la abrio y una rotacion las invalida.
Solo el ancho, porque en mobile la barra del navegador dispara `resize` en cada
scroll y se cerraria sola.


## Ajustes sobre la quinta propuesta (2026-08-30)

- **Un solo horario.** Inicio y fin juntos hacian leer dos veces un dato que es
  uno: cuando empieza. Queda "9:00 AM" grande y "1 hr - Monday, May 29 2025" al
  lado, en chico. El huso vertical se fue con ellos.
- **La pill sale del fondo tintado.** El estado ya lo canta el acento de
  arriba; con la cabecera pintada ademas, quedaba color sobre color. Ahora la
  cabecera es blanca y el tinte lo lleva la pill, como el resto de los badges
  del sistema.
- **Sin lapiz en Provider.** El detalle es de lectura: el turno se cambia desde
  "Edit appointment", no con lapices sueltos por fila.

## Panel de solicitudes: ASAP y lista de espera

Tenia una sola card ASAP de adorno, con un Cancel que no cancelaba, y la lista
de espera vacia.

Una solicitud tiene dos salidas y ahora las dos estan en la card:

- **Cancel** la saca de la lista y avisa.
- **Schedule** abre el New Appointment **ya cargado** con lo que pidio el
  paciente -paciente, profesional, motivo, fecha, franja, consultorio y
  estado-. Nadie deberia retipear datos que el sistema ya tiene.

Al guardar, el turno entra en la grilla y la solicitud desaparece. Si cae en
otro dia que el que se esta mirando, el sistema **no cambia de pantalla solo**:
lo ofrece en el toast ("Go to Mar 13"), igual que al reprogramar desde el
dashboard.

Las dos listas son lo mismo con distinta urgencia: misma card, acento rojo y
pill "ASAP" para las urgentes, acento azul y "Waiting 4 days" para las que
esperan. Las pestanas llevan el conteo, y la lista scrollea dentro del panel
para no crecer hasta tapar el calendario.


## Botones fuera de la barra (2026-08-30)

**Event** y **Register appointment** salen de la barra de Scheduling hasta que
se defina que hacen. No se borran: el markup queda detras de la constante
`PENDIENTES` en `src/pages/Scheduling.tsx`, asi que volver a mostrarlos es
cambiar `false` por `true` y no rehacerlos.

Los dos venian sin destino propio: Event nunca tuvo uno en el Figma -en algun
momento se le habia colgado el drawer de Link Treatment Plan, que no
corresponde- y Register appointment abria el mismo modal que New appointment,
o sea que la barra tenia dos botones para lo mismo.


## La hora sale de un solo lado (2026-08-30)

El Figma rotula los cuatro turnos "10:00 AM" aunque esten en franjas distintas,
y ese rotulo fijo se replicaba tal cual. Convivia ademas con la vista de mes,
que siempre imprimio la hora real, y con la card de detalle, que tenia un
"9:00 AM" escrito a mano. Tres horarios distintos para el mismo turno segun
donde se lo mirara.

Ahora la hora sale siempre de `start`: el bloque, el mes, el detalle y el toast
dicen lo mismo. Un turno con dos horas segun la pantalla no es una anomalia a
replicar, es un error de lectura -queda como **desviacion deliberada**-.

Los arranques se llevaron al cuarto de hora mas cercano (8.2 -> 8.25,
9.4 -> 9.5): los decimales venian de medir el alto del frame, y al imprimirlos
daban "08:12 AM". El bloque se corre unos pocos pixeles.

La duracion se muestra a partir de `duration` ("2 hr 30 min", "1 hr"), y la
fecha, del dia del turno.

## Conteos en texto, no en pill (2026-08-30)

En Treatment plans y en Visit, los "2 Visits", "3 Procedures" y "8 Procedures"
eran pills azules. Una pill marca un **estado** -Accepted, Inprogress- y esa ya
esta arriba a la derecha de cada plan; pintar tambien los numeros ponia tres
capsulas de color compitiendo en una card de cuatro lineas.

Los conteos pasaron a texto gris al lado del nombre. El nombre de la visita
-"Visit 1"- queda como lo unico en negrita de la fila, que es lo que se elige.


## Pills alineadas al sistema (2026-08-30)

La pill de estado del detalle iba sin borde y a 10px; la de ASAP / lista de
espera, con borde pero sin padding vertical. Ninguna de las dos pegaba con las
de Insurance o Treatment plans.

La pill del sistema es una sola: `rounded-full border px-2 py-[2px]
text-[11px] font-semibold`, con borde y texto del mismo color y fondo tintado.
Las dos pasaron a esa.

## "New appointment" no creaba nada (2026-09-07)

Comparando contra un proyecto hermano de la misma spec (ver
[[red-clone-dashboard-figma-sibling]] en memoria) aparecieron dos gaps reales,
los dos en el mismo lugar de siempre -no en la lógica compartida, en lo que
quedó sin conectar-.

`CalendarEvent` no tenía `provider`/`room`/`reason`: el Appointment Details
Drawer mostraba **"Dr. Smith" / "Operatory 2" / "Consultation · reaseon for
the visit" fijos**, para cualquier turno que se clickeara. El formulario de
"New Appointment" sí pide Primary Provider, Operatory y Reason -los datos
existían-, sólo no llegaban al evento guardado. Se agregan los tres campos a
`CalendarEvent`, a los 4 eventos semilla (que además repetían todos "Juan
Perez" como paciente, mismo tipo de anomalía que ya se documentó con
Radiography/Rooms) y al drawer, que ahora lee del turno real.

Más grave: el botón suelto "New appointment" (a diferencia de "agendar una
solicitud") **no pasaba `onGuardar`** — el modal mostraba su toast de éxito
pero nunca tocaba `eventos`. Se factoriza `construirEvento` (antes vivía
inline en `agendarSolicitud`) y se usa en los dos casos: agendar una
solicitud saca a alguien de la cola de espera, crear uno suelto no, pero los
dos arman el mismo tipo de evento.


## Comparación con el Scheduling real (2026-09-25)

Pedido de Julián: entender por qué el prototipo no se parece al Scheduling de
red.dev.confidentally.com y qué hace falta para que un dev lo implemente tal
cual. Resultado completo, con la tabla de 14 diferencias y los seis pasos
recomendados: https://claude.ai/artifact/Mu28yUXmDEW7isJko5CgqV

Lo que hay que saber al retomar:

- **La app real tiene lo que el Figma nunca dibujó:** Day con una columna por
  sala (Room 2/3/7), 24 h con horas no laborables en gris, View con toggles,
  Zoom y Enabled hours, Check In / No Show / Cancel en el detalle, "+N" en Month
  y la leyenda en una fila. El prototipo no tiene nada de eso.
- **El prototipo agrega lo que el real no tiene:** plan y visita en New
  Appointment, la card de detalle propia, Schedule que precarga el modal.
- **Vocabulario de estados inconsistente en el real:** la leyenda dice
  Completed, el filtro Fulfilled; "Check in" y "Checked in" conviven en el
  filtro; el alta arranca en "Waitlist", que no está en ninguna de las dos.
- **Escala distinta:** real = fuente del sistema, controles de 36 px con 14 px,
  75 px por hora, azul `#1e58be`; prototipo = Inter, 32 px con 12 px, 63 px
  por hora, azul `#1d56bc`. Los colores de estado sí coinciden con el Figma,
  salvo el verde oscuro (`#115c30` real, `#17723c` prototipo).
- **Sin verificar:** arrastrar turnos, el menú de Today, el ícono ↗ por sala,
  qué hacen "+N" y Schedule, la app real en celular y otros roles.

## La grilla del calendario mantiene su borde (2026-10-06)

Con la regla nueva (cards con sombra y sin borde), las vistas de semana y mes del calendario siguen con borde: son una
grilla, como las tablas.

## New Appointment: la fecha del ancho de Start Time (2026-10-10)

Regla de Julián (2026-10-10, sobre una captura de Post payment con campos de anchos distintos): en los drawers los
campos van de a dos y del mismo ancho, y vale para todo. Está en *Components / UI / Drawer → Specs → Fields* y se
controla con `npm run ds:campos`. Date ocupaba todo el ancho entre pares de media columna; ahora va en la columna
izquierda, encima de Start Time.
Los rótulos de Treatment plan y Visit (paso 2) pasan a `FieldLabel`. Patient y los providers siguen de ancho entero:
son búsquedas de persona.

## Solicitudes: la misma card que los turnos del Patient Dashboard (2026-10-12)

Pedido de Julián: las cards de *Appointment requests* y las de *Appointments* del Patient Dashboard con el mismo diseño
(ver `patient-dashboard.md`, misma fecha). `SolicitudCard` pasa a usar `TarjetaTurno`:

- Se va el punto de color al lado del nombre (repetía la barra y la pill) y entra el avatar con las iniciales.
- La pill hecha a mano con hex sueltos (`#dc2626`, `#1d56bc` en `style`) pasa a `Pill` (danger / info), y la barra, a
  token (`BARRA_TONOS`). Cancel y Schedule pasan a `ui/button` sm (28px): antes eran botones de 11px y unos 24px de alto.
- El panel pasa de 260 a **280px**, el ancho de la columna Appointments del Patient Dashboard: la card mide lo mismo en
  los dos lados. En el celular queda topado a `100vw - 116px` (259 en un iPhone de 375), como antes.
- Con el avatar, en la lista de espera el nombre se recortaba demasiado ("Noah Ja…" junto a "Waiting 4 days"): ahora
  baja a un segundo renglón.

## New Appointment: visita linkeada a otro turno (2026-10-17)

Pedido de Julián, con un prototipo en HTML (`appointment-linked-visit_1.html`): al agendar un turno, la visita del plan
que se elige puede **ya estar linkeada a otro turno**. Una visita pertenece a un solo turno, así que hay que decirlo y
dejar que se mueva.

**"Otro paso" → una pregunta, no un tercer paso.** El pedido decía "otro paso" para ese escenario. El prototipo lo
resuelve con el paso 2 (con el bloque *Linked appointment* en la visita) y una confirmación al guardar. Se hizo igual,
con `ConfirmDialog`, y no como un paso más del drawer, por tres razones: (1) sólo aparece con algunos datos, y un
indicador que a veces dice dos pasos y a veces tres miente sobre cuánto falta; (2) es una pregunta de sí o no, y esas
son las únicas que siguen como confirmación chica (`design-system.md`, *Pop ups*, punto 6); (3) llega recién al
guardar, cuando ya se sabe qué visita se eligió. Si Julián quería un paso real en el indicador, se cambia sin tocar los
datos: es mover `MoverVisitaDialog` a un `DrawerStep`.

**Qué se ve y cuándo**
- La fila de una visita linkeada (`VisitRow` con `vinculada`) muestra, **aunque no esté elegida**, el bloque
  *Linked appointment*: fecha y hora del otro turno, su estado en una `Pill` y un círculo de info (`InfoTip`) con "To use
  this visit for the new appointment, you'll need to move it from the linked appointment." Así se decide antes de
  tocarla, no después de apretar Save.
- Save con esa visita elegida abre **Move treatment visit?** ("Visit 2 is linked to the appointment on Sep 28, 2026 at
  1:15 PM. Continuing will unlink this visit from that appointment and link it to the appointment you are saving."), con
  *Cancel* y *Move visit*. Cancel vuelve al drawer con todo lo cargado y el foco en Save; Move visit guarda, cierra y
  suma un segundo toast: "Visit 2 moved from the Sep 28, 2026 appointment."
- En los datos de ejemplo la linkeada es **Visit 2**, igual que en el prototipo (Sep 28, 2026 · 1:15 PM).

**Qué cambió respecto del prototipo, y por qué**
1. **El estado dice "Fulfilled", no "Completed"**: es el vocabulario de los turnos de la app (leyenda del calendario y
   `PatientAppointmentCard`); el gris del prototipo pasa a la `Pill` con el tono del estado (verde). Anomalía de
   vocabulario ya anotada el 2026-09-25.
2. **El tooltip oscuro pasa a `InfoTip`**: el Tooltip es sólo para nombrar un ícono; esto explica en dos líneas, y el
   InfoTip abre con mouse, toque y teclado. El clic en el círculo no elige la visita.
3. **Un solo diálogo de la app**: el overlay propio del prototipo es el `ConfirmDialog` de siempre (foco en Cancel).
4. **Return, no Back**: en el prototipo "Back" vaciaba la selección; en el drawer es Return y vuelve al paso 1.
5. **No se replicó** el plan "Provider Pruebas / caso 1", el total de $332 ni el calendario de la derecha: son datos
   del prototipo; el drawer ya tiene su calendario del día al costado.
6. **Sin estado "movida" persistente**: el prototipo cambiaba el bloque a "Linked to this appointment" después de mover.
   Acá el drawer se cierra al guardar, así que no hay nada que mostrar; los datos son de muestra y la visita sigue
   figurando linkeada la próxima vez que se abre el drawer.

**Se corrigió de paso:** `ConfirmDialog` devolvía el foco a ningún lado al cerrarse (Radix lo manda a un `Trigger` que
acá no existe), así que después de Cancel el teclado perdía el lugar. Ahora vuelve al botón que la abrió.

**Para validar con usuarios**
- ¿Se entiende "mover" una visita? Alternativa: "Use anyway" / "Replace the link".
- **Visita linkeada a un turno ya cumplido** (Fulfilled): moverla reescribe el historial de un turno atendido. ¿Se
  permite igual, se deshabilita, o sólo con permiso? El prototipo la deja mover; acá se hizo igual y se anota como
  decisión abierta.
- **"Optional" pero siempre elegida:** el paso dice que el link es opcional, pero la visita 1 arranca elegida y no se
  puede soltar. En el prototipo la selección arranca vacía y se puede limpiar. Se propone arrancar sin visita elegida y
  sumar un "No visit"; **no se hizo** porque cambia el comportamiento actual y espera su ok.
- Si el otro turno ya pasó o ya se canceló, ¿hace falta la pregunta, o se mueve sin preguntar?

## View: filtro rediseñado (2026-10-17)

Pedido de Julián con un diseño nuevo del filtro **View** (reemplaza al frame `3856:208346`). Es de **un solo valor por grupo** (radios,
con "Select all …" como una opción más), no de casillas: así está en el diseño.

- **Estructura:** Status en una fila; Providers con buscador por nombre o especialidad y la lista de a dos; Rooms al costado con
  *Current view* (lo que se verá al guardar); pie con el resumen ("1 provider · 1 room"), Cancel y Save.
- **Es un popover** (`ui/popover` vía `ViewMenu`): debajo de View, alineado a su borde derecho, sin fondo oscuro; Radix lo corre para
  que entre en pantalla, cierra con Escape, clic afuera o ✕ y devuelve el foco a View. Cancel, ✕, Escape y clic afuera **descartan**;
  Save guarda en `Scheduling` (`vista`) y el panel reabre desde lo guardado.
- **Responsive por la caja** (container queries): 976px en escritorio (Rooms al costado desde 896px de caja); en tablet Rooms baja y va
  de a dos; en celular todo de a uno. Con poca altura scrollea el cuerpo y el encabezado y el pie quedan fijos.
- **Decisiones de UX:** la búsqueda no cambia lo elegido (esconder al provider elegido no lo saca; el conteo y Current view lo siguen
  diciendo); sin resultados hay estado vacío con *Clear search*; teclado de radio nativo (Tab entra por la elegida, flechas
  recorren y eligen); textos secundarios en `ink-muted` en vez del gris claro del diseño (contraste 4.8:1 vs 2.6:1).
- **Anomalía 91:** las salas repiten "Operatory 2" cuatro veces y sus subtítulos son especialidades de providers (se suma a la 28). Se
  copia tal cual.
- **Pendiente de validar con usuarios:** si recepción necesita **varios** providers o salas a la vez (el diseño sólo permite uno o
  todos) y si el filtro de Status debería afectar también a Day/Week/Month: hoy el prototipo guarda la vista pero la grilla no
  filtra (no hay backend ni datos para 12 providers).

## New Appointment: los campos del paso 1 quedaban cortados contra el pie (2026-10-19)

Julián: "fijate que los inputs quedan cortados en el paso 1". Con poco alto de ventana (celular, o una ventana de escritorio baja),
el paso "Patient and Scheduling" tiene nueve campos y no entra entero: el contenido scrollea solo, pero el pie (Cancel / Next Step)
no se movía y el último campo (End Time, Operatory o Status según cuánto entre) quedaba recortado justo contra él, sin ningún aviso
de que seguía con scroll. Se veía como un campo roto, no como "hay más abajo".

No es un bug de este drawer en particular: es `ui/drawer`, el mismo de todos los formularios. El arreglo va ahí: mientras falte
contenido por ver, el pie lleva una sombra elevada arriba (como una barra de scroll tapando lo que sigue); al llegar al final se va
sola. Se probó primero un degradé blanco como el de `ui/show-more`, pero sobre un campo blanco liso (no una card con avatar y chips)
tapaba el control entero dejándolo en blanco, peor que el corte original; la sombra no esconde el campo, sólo separa visualmente el
pie. Ver `design-system.md` (2026-10-19) y *Components / UI / Drawer → Parts → Footer shadow*.

## El buscador de Patient y Provider sin fecha de nacimiento ni email (2026-10-19)

Julián: "me di cuenta que faltaría cuando buscas un paciente más información. Antes además del nombre decía la fecha de
nacimiento y email. Lo mismo con provider, nombre + email". `SearchField` (`patients/form.tsx`) sólo mostraba el nombre en cada
sugerencia; ahora cada una lleva una segunda línea:

- **Patient:** fecha de nacimiento y email. No hay una ficha única para los cuatro nombres de este campo (son de esta pantalla,
  no de la tabla de Patients ni del mock de 271 de Billing/Ledger, que tampoco los tiene): es mock propio, con el mismo formato
  que usa la tabla de Patients ("Month D, YYYY" y nombre.apellido@email.com).
- **Primary y Additional Provider:** el email de la plantilla del consultorio (`data/employees.ts`, Settings → Employees), que
  ya tiene a estos cuatro cargados. "Dr. " es sólo el tratamiento que usa esta pantalla; el nombre de abajo es el de Employees.

`SearchField` suma una prop opcional `subtext` (una función de la opción a la segunda línea); sin ella sigue mostrando sólo el
nombre, como el resto de sus usos (Carrier name, CDT codes, medicamentos, etc., sin tocar). Ver *Elements / Fields* y
*Components / Scheduling / NewAppointmentModal*.

**Para validar con usuarios:** si conviene la misma segunda línea en Requestor (hoy un `SelectField`, no busca) o en otros
buscadores de persona de la app (Add Relationship, por ejemplo).

## New Appointment: Start Time, End Time, Operatory y Status seguían sin verse (2026-10-20)

Julián: "fijate que los inputs de star time end time operatory y status no se ven se cortan" — el mismo síntoma que el
2026-10-19 (campos del paso 1 cortados contra el pie), con ventanas de escritorio bajas (probado a 1024×768). La sombra
del pie que se agregó ese día (`ui/drawer`, *Parts → Footer shadow*) nunca llegaba a dispararse: medía el contenido con
un `useRef` + `useEffect`, pero ese efecto corría con la ref todavía en `null` -el contenido del `Dialog` de Radix se
monta en el DOM un tick después del primer render del Drawer- y como las dependencias del efecto no volvían a cambiar,
ni el `ResizeObserver` ni el listener de `resize` llegaban a conectarse nunca: la sombra no aparecía con ningún alto de
ventana, y el campo seguía viéndose cortado sin aviso de que había que scrollear.

Confirmado con Playwright: a 1024×768, el contenido medía 610px contra 564px visibles (y hasta 396px achicando la
ventana a 600px de alto) sin que el pie mostrara nunca la sombra, ni al redimensionar. Arreglado en `ui/drawer`
reemplazando esas dos refs por `useState<HTMLDivElement | null>` (ref por callback): el efecto que arma el
`ResizeObserver` ahora depende del nodo real y corre de nuevo en cuanto Radix lo monta. Scrollear manualmente el
contenido (el `onScroll` de siempre) ya funcionaba antes del arreglo —por eso el paso 1 no estaba roto, sólo sin aviso.

**Para el dev:** `ui/drawer` cambia `scroll`/`contenido` de `useRef` a `useState` + ref por callback (`ref={setScroll}`,
`ref={setContenido}`); el resto del componente no cambia. No es un bug de `NewAppointmentModal`: cualquier drawer con
muchos campos y poco alto de ventana tenía el mismo problema.

## Patient, Primary y Additional Provider pasan a `PersonSearchField` (2026-10-20)

Julián pidió que buscar una persona se vea igual en toda la app, como en Add Relationship → Select person (ver
`relationships.md`, 2026-10-20, por el porqué completo). Las tres búsquedas de persona de este drawer usaban
`SearchField`: un menú flotante, una sola línea de texto por sugerencia. Pasan a `PersonSearchField`: la sugerencia es
una card con avatar y, debajo del nombre, DOB y email en líneas separadas (antes una sola línea unida con "·",
`pacienteSubtexto`/`providerSubtexto`, agregada el 2026-10-19); la elegida queda remarcada con borde azul y un visto,
en vez de sólo completar el campo.

**Para el dev:** `pacienteSubtexto`/`providerSubtexto` pasan a `pacienteLineas`/`providerLineas` (devuelven un array de
líneas, `['DOB: …', 'Email: …']` o `['Email: …']`, en vez de un string ya unido). El avatar de la card lleva
`aria-hidden`: sin eso, sus iniciales se cuelan antes del nombre en el nombre accesible del botón y rompían
`tests/scheduling-linked-visit.e2e.ts` (que busca el botón por `/^John Smith/`, `/^Dr. Emily Chen/`); verificado que
sigue encontrando el botón y completando el campo igual que antes.
