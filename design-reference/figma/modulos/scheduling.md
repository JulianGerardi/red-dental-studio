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
