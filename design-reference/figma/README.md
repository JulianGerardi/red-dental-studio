# Figma "Platform Design" — hallazgos por módulo

Archivo: `9fYLxX9hlTj5unFthG4bBg`. Relevado durante el rediseño de `red-clone`.

| Módulo | Nodo raíz | Documento |
|---|---|---|
| Dashboard (Provider / Secretary) | `3749:72259` · `3751:72342` | [modulos/dashboard.md](modulos/dashboard.md) |
| Header y Sidebar | `3605:56447` · `3636:57489` | [modulos/header-sidebar.md](modulos/header-sidebar.md) |
| Patients (5 pantallas) | `3751:73452` | [modulos/patients.md](modulos/patients.md) |
| Patient Dashboard | `3646:58836` | [modulos/patient-dashboard.md](modulos/patient-dashboard.md) |
| Scheduling (6 pantallas) | `3847:166204` | [modulos/scheduling.md](modulos/scheduling.md) |
| Treatments | `3763:254355` | [modulos/treatments.md](modulos/treatments.md) |
| Documents (manager) | `3753:80194` | [modulos/treatments.md](modulos/treatments.md) |
| Relationships & Billing (6 pantallas) | `3751:76507` | [modulos/relationships.md](modulos/relationships.md) |
| Consents (Settings) | `4106:170620` | [modulos/consents.md](modulos/consents.md) |
| Design system (Storybook) | — | [../design-system.md](../design-system.md) |

## Convenciones acordadas

- **Escala:** proporciones fieles del Figma con tamaños cómodos. El chrome exterior
  se respeta (20 / 15 / 13 / 12 / 11px); los internos de card que en el Figma bajan
  a 5–10px se suben con piso de **11px**.
- **Anomalías:** se corrige lo visual (alineaciones, gaps, altura de columnas);
  el **contenido se replica tal cual** aunque esté mal, y se documenta.
- **Breakpoints:** en este archivo las grillas de 2 y 3 columnas abren en `lg`
  (1024px), nunca en `xl` — el frame mide 1200 y `xl` llega tarde.

## Anomalías detectadas (28)

Numeradas de forma continua entre módulos, para poder citarlas sin ambigüedad.

| # | Módulo | Anomalía |
|---|---|---|
| 1 | Dashboard | Stat cards y panels no comparten grilla (gap 15.485 vs 17) |
| 2 | Dashboard | `30-02-2026` en el date picker — fecha inexistente |
| 3 | Dashboard | Dos paneles titulados "Rooms" en la vista Provider |
| 4 | Dashboard | Nombres de capa que no coinciden con el contenido |
| 5 | Dashboard | Idioma mezclado: "Recepcionista" junto a "Provider" |
| 6 | Dashboard | Sidebar de 1067px en un frame de 1234 (Secretary) |
| 7 | Dashboard | Page Content en y=64 vs y=74 entre frames de Secretary |
| 8 | Dashboard | Escala tipográfica se derrumba dentro de los cards (hasta 5.87px) |
| 9 | Dashboard | Título de panel en 13.5px contra 15px del stat card |
| 10 | Header | El search difiere entre frames (263×28 vs 304×32) |
| 11 | Header | El glifo ⌘ existe sólo en el frame Provider |
| 12 | Header | El bloque de perfil difiere entre frames |
| 13 | Patients | La tabla es `table/referral-table`: dice "6 of 18 referrals" |
| 14 | Patients | Dos azules distintos: `#0056ef` y `#1d56bc` |
| 15 | Patients | Typo en el token: `--color-confindetally` |
| 16 | Patients | Copy de locación en la pantalla de pacientes |
| 17 | Patients | Formatos de fecha mezclados en la misma columna |
| 18 | Patients | Español dentro del modal en inglés ("34 años") |
| 19 | Patients | "Use this option…" repetido 3 veces en New Patient |
| 20 | Patients | Layer `Demographic Information` renderiza "General Information" |
| 21 | Scheduling | Las siete columnas del calendario dicen "THUR" |
| 22 | Scheduling | El toggle marca "Month" pero la vista es semanal |
| 23 | Scheduling | Todos los eventos dicen "10:00 AM" sin importar su franja |
| 24 | Scheduling | "No-show" es el único de la leyenda sin punto |
| 25 | Scheduling | "Reaseon for the visit" en el Details Drawer |
| 26 | Scheduling | Start/End Time muestran una fecha (`12-03-2025`) |
| 27 | Scheduling | Horas "13 PM, 14 PM…" en un frame y "01 PM, 02 PM…" en otro |
| 28 | Scheduling | Las salas repiten las especialidades de los providers |
| 29 | Treatments | El título dice "Treatments plan" y el breadcrumb "Treatment plan" |
| 30 | Treatments | El breadcrumb termina en un chevron suelto |
| 31 | Treatments | Badge "Expired" con nota "Cancelled" en la misma card |
| 32 | Treatments | Un frame se llama "Empty State — Mislabeled Insurance Copy" |
| 33 | Documents | El frame "Documents" no contiene ningún documento: repite Overview |
| 34 | Documents | El banner dice "this patient is a minor" y el perfil dice 50 years |
| 35 | Documents | Capas muertas: "Legacy Sidebar (Hidden, Unused)" y "Action Button (Hidden)" |
| 36 | Documents | La tabla de documentos dice "Showing 3 of 15 referrals" |
| 37 | Relationships | "Adress Information" y "Adress line 1/2": falta una D |
| 38 | Relationships | "Adress line 1" y "Adress line 2" son selects, no campos de texto |
| 39 | Relationships | "Country" aparece dos veces: en General y en Adress Information |
| 40 | Relationships | Direction mezcla "is Guardian **for**" y "is Guardian **of**" |
| 41 | Relationships | El estado New Person nombra a "Michael Miller" en Direction sin haber elegido a nadie |
| 42 | Relationships | No hay botón que lleve a "Add Relationship" en ninguna pantalla |
| 43 | Relationships | ~~El texto "Use this option only to link a person…" se usa como label de las 4 opciones de Role~~ **corregido en el Figma el 2026-08-26** |
| 44 | Patient Dashboard | Dos de los cuatro modales clínicos se titulan "New Allergy" (Medication y Past Surgery) |
| 45 | Patient Dashboard | "Strenght" en vez de "Strength" |
| 46 | Patient Dashboard | Notes obligatorio sólo en Medication, con el placeholder de un form de referrals |
| 47 | Patient Dashboard | Approx End Date obligatorio sólo en Medication |
| 48 | Patient Dashboard | La fila del listado clínico usa el formato de medicación para las cuatro categorías |
| 49 | Patient Dashboard | El primer ítem del listado aparece azul, como seleccionado: es el hover |
| 50 | Scheduling | El modal de New Appointment existe en dos versiones con checkboxes distintos |
| 51 | Scheduling | Nada indica qué muestra la columna de horarios del New Appointment |
| 52 | Patients | Ninguno de los dos checkboxes de New Patient alterna la variante con guardián |
| 53 | Patients | "Lasr Name" en el Edit Patient de página completa |
| 54 | Dashboard | El dashboard rediseñado se titula "Patients" — **confirmado error, va "Dashboard"** |
| 55 | Dashboard | El popup del paciente dice "Start Enconter", "Rsn for Visit" y repite "Height" |
| 56 | Scheduling | La columna de horarios repite "19 PM" en las dos últimas filas |
| 57 | Scheduling | "Inprogress" en una palabra; en el resto del sistema es "In progress" |
| 58 | Dashboard | El popup del paciente mezcla idiomas: "17 Marzo, 2024" en una UI en inglés |
| 59 | Dashboard | La tabla del popup asigna D0120 a "Bitewings" y D1110 a "Periodic oral evaluation" |
| 60 | Insurance | Los nueve frames se llaman "Patiens Plans — Documents (Default)"; los modales, "New Patient Form (With Guardian)" |
| 61 | Insurance | El breadcrumb termina en "Documents" en una pantalla de Insurance |
| 62 | Insurance | "Cordination Order" en la página y "Coordination Order" en el modal |
| 63 | Insurance | Una caja de sólo lectura repite el rótulo del select que tiene abajo |
| 64 | Insurance | "Manage Suscription" en el modal y "Manage Subscription" en el botón |
| 65 | Insurance | "New Depender", "Dependers" y "Subcriber ID" |
| 66 | Insurance | "Showing 8 of 8 insurances" con 4 filas, y placeholder "Loremp" |

## Desviaciones deliberadas del diseño

Cambios pedidos que **no** son réplica del Figma:

- Nombre de la tabla de Patients en azul y linkeado (en el Figma es gris `#71717a`).
- Borde del date picker azul sólo en estado activo (en el Figma es permanente).
- Default del filtro de fecha en `28-02-2026`: al volverse un filtro real no podía
  quedar el `30-02-2026` del diseño.
- Punto indicador en los días con turnos y estado vacío del calendario.
- El disparador de la variante "con guardián" de New Patient: el Figma no indica
  cuál es, y desde la actualización del 2026-08-26 los dos checkboxes de General
  Information tienen texto propio que no habla de guardianes (anomalía 52). La
  sección aparece cuando **la fecha de nacimiento da menor de 18**, que es la
  regla real detrás del guardián y no obliga a inventar un control.
- **Saltos de año en el date picker.** El Figma sólo dibuja las flechas de mes;
  sin las de año una fecha de nacimiento queda a cientos de clics. Por lo mismo
  el campo Birthdate abre en 1990 y no en el mes actual.
- El anillo del FAB de Scheduling lleva el hueco **transparente** en vez del halo
  blanco del frame (`outline` + `outline-offset`, no doble `box-shadow`).
- **La card de turno abierta lleva ese mismo anillo.** Con el popup del paciente
  al lado no había forma de saber de qué card salía; ahora la presionada se
  marca con el anillo azul de 3px a 3px de offset, igual que el FAB. Las
  inactivas llevan el anillo transparente para que nada se corra al activarse.
- Botón **"Add Relationship"** junto al título de Relationships & Billing y
  entradas **"Edit relationship"** y **"Delete relationship"** en el kebab de
  cada card: el Figma diseña esas cuatro pantallas pero no dibuja de dónde se
  entra (anomalía 42), y el borrado sólo aparece mencionado en el texto del
  modal de edición.
- Botón **"Add <categoría>"** al pie del listado clínico desplegable: los cuatro
  modales de alta tampoco tienen disparador dibujado.
- **Variante de edición de los modales clínicos** ("Edit Medication",
  "Edit Allergy", …): el Figma sólo diseña el alta. Es el mismo formulario
  precargado. A diferencia del alta, acá el título usa el nombre real de la
  categoría y no arrastra la anomalía 44.
- El **panel de solicitudes de Scheduling arranca cerrado**. Es el estado
  desplegado del FAB, y en el frame aparece abierto porque así se capturó.
- **Cards de Treatment plan y Visit rediseñadas** (pedido de Julián). El plan
  quedó como card —radio en columna, barra de acento con el color del estado,
  chips de conteo— y la visita como fila compacta que **abre la tabla completa
  de procedimientos** al elegirla, con el total en azul y negrita. Detalle y
  justificación en [modulos/scheduling.md](modulos/scheduling.md).
- **Los embudos del dashboard filtran de verdad.** El Figma los dibuja sin
  menú. El de Pending Task despliega Clinical Note / Lab Orders /
  Prescriptions / Referrals — las mismas categorías que eran tabs — y admite
  varias a la vez. El de Appointments no tiene criterio indicado en el diseño:
  se eligió **operatorio**, el único campo con variación en la card.
- Como el filtro ahora funciona, **las tareas llevan la categoría que les
  corresponde**. En el frame las cuatro dicen "Referrals" bajo el tab "Clinical
  Note" (anomalía 20), lo que con un filtro real no se sostiene.
- **Turnos arrastrables**, tanto en el calendario grande como en la columna de
  New Appointment. El Figma es un frame estático y no lo muestra, pero es lo
  que se espera de un calendario. En la grilla el turno se suelta en franjas de
  15 minutos y cambia de día y hora; el toast confirma el destino.
- La **columna de horarios de New Appointment la dispara el checkbox ASAP**.
  El Figma la dibuja siempre visible y sin control asociado; ASAP es el único
  checkbox tildado en ese frame (anomalía 51). Elegir una franja completa Date,
  Start Time y End Time.


## Alta y edición de pacientes

La lista vive en un store en memoria (`src/data/patientsStore.tsx`, contexto de
React). **New Patient agrega una fila y Edit actualiza la existente**, ambos
reflejados en la tabla al instante. El modal de edición precarga los datos de la
fila y guarda sobre el mismo `id`, sin duplicar.

No persiste entre recargas: es un prototipo de diseño y guardar en localStorage
haría que la demo arranque con datos sucios de sesiones anteriores.

## Toasts de confirmación

Cada acción devuelve un toast (`src/components/ui/toaster.tsx`, sobre `sonner`):
pastilla blanca, icono circular a la izquierda y X para cerrar. Cuatro tipos:
`aviso.ok` (verde `#1a804d`), `aviso.error` (rojo `#b22626`),
`aviso.warn` (ámbar `#99660d`) y `aviso.info` (azul).

Cubre alta y edición de pacientes, Edit Contact, Edit Patient, Check In,
Check Out, Complete this Task, guardar filtros del calendario, crear turno,
alta y edición de relaciones, vincular plan de tratamiento y descargar
documentos (que avisa si no hay ninguno seleccionado).

## Rediseño del dashboard del 2026-08-28

Frames nuevos: `4430:57451` (dashboard), `4430:57474` (popup del paciente) y
`4430:61940` (New Appointment).

**Dashboard.** Cambió entero:

- El título lleva **"Today • <fecha>"** arriba en azul y subió de 20 a 24px Bold
  (medido: 18px de tinta, 90px de ancho). El frame lo rotula "Patients", pero es
  un error del archivo: va **"Dashboard"** (anomalía 54, confirmada por Julián).
- Los tres stat cards se juntaron en **una sola tira** arriba a la derecha, con
  divisores verticales y un cuadrito de color por métrica: calendario
  `#eef2ff`/`#1d56bc`, reloj `#fff7ed`/naranja, pulso `#f5f3ff`/`#8b5cf6`.
- Las columnas son **Appointments · Waiting Room · Rooms**, fijas. **El toggle
  Provider / Recepcionista ya no está en el diseño** — se sacó del dashboard;
  `ViewToggle.tsx` queda en el repo por si vuelve.
- **Pending Task** bajó a una franja a lo ancho, con las tareas en tres
  columnas. **Los tabs se sacaron**: hacían lo mismo que el embudo del header,
  así que el filtro quedó en el embudo (pedido de Julián el 2026-08-28).
- Desapareció el cuarto panel "Rooms" vacío del pie (la vieja anomalía 5).
- La card de turno se rediseñó: sin borde, foto y badge "Check In" a la
  izquierda, chips TR/CC y kebab a la derecha, los dos campos grises con la
  caja de hora al costado, y un botón a lo ancho del pie ("Check Out", o
  "Cancel" en la primera de Waiting Room).

**Popup del paciente** (`4430:57474`, 357×488). Ya no es la tarjeta con barra
azul y avatar montado: card `#fafbfe`, avatar redondo y botón verde
`#28c563` "Start Enconter" arriba, nombre + pill "Planned", un panel `#eef5ff`
con el plan de tratamiento y, abajo, filas blancas de datos.

**New Appointment** (`4430:61940`). Las cards "Patient and Scheduling",
"Details" y "Providers" se fundieron en una sola columna izquierda; la derecha
suma el bloque **Link to treatment plan visit** arriba de "Additional".
Additional Provider perdió el asterisco. La columna de horarios ahora es
hermana del formulario dentro de un frame de 947 (757 + 190): va pegada, sin el
solape de 8px del frame anterior.

## Actualización del Figma del 2026-08-26

El equipo de diseño reemplazó el texto de relleno de los checkboxes. Los que
quedaron, por pantalla:

| Pantalla | Checkboxes |
|---|---|
| New Patient — General Information | "Use this option only to link a person that already exists in the system (e.g employee, subscriber, contact, etc)" *(sin cambios)* · "Create a new user account with this email address" |
| New Patient — Guardian Information | "Add new person" · "This person is also the guarantor" |
| New Patient / Edit Patient — Demographic | "Interpreter Required" |
| Add Relationship — Find or create person | "Add New Person" |
| Add / Edit Relationship — Role | "Guardian" · "Guarantor" |
| New Appointment — Additional | "ASAP" · "Follow-up" · "Premedicate" |
| Link to treatment plan visit — Additional | "ASAP" · "Follow-up" · "Premedicate" |

El único que sigue siendo el párrafo largo es el primero de New Patient, y ahí
sí viene a cuento. La anomalía 43 queda cerrada.

La sección **Guardian Information** también cambió: era Relationship + dos
checkboxes + Guardian, y ahora es Select Person + "Add new person" +
"This person is also the guarantor" + Relationship to Patient\*.

## Bugs propios corregidos

No son hallazgos del Figma sino errores del prototipo, anotados para no
repetirlos:

- **Checkboxes congelados.** `LinkPersonCheckbox` recibía `checked` con default
  `true` y, sin `onChange`, no había forma de destildarlo. Ahora lleva estado
  propio cuando nadie lo controla (`defaultChecked`), y sólo pasa a controlado
  si le pasan `checked`.
- **Breadcrumb muerto en Patients.** Era un `<button>` sin acción; ahora es el
  mismo `Link` que en el resto del módulo. Verificado que las siete migas
  navegan.
- **Kebabs en gris.** Los tres puntos iban en `#71717a`; en el Figma son negros.
- **Placeholder perdido en los selects.** `''` no se tomaba como vacío, así que
  un select controlado y sin valor se veía sin texto.

## Settings: menú flotante en vez de sidebar propio

Settings tenía su propio sidebar de 200px adentro de la sección, con lo que la
pantalla quedaba con dos barras de navegación una al lado de la otra. Ahora sus
pantallas cuelgan de un **panel flotante que sale al costado del ítem Settings**
del rail principal, siguiendo el ejemplo que pasó Julián.

- Se abre con **hover** en escritorio, con un respiro de 140ms antes de cerrar
  para poder cruzar el hueco entre el ítem y el panel.
- El **chevron es un botón aparte**, no un icono adentro del link: metido
  adentro, cancelar la navegación dependía de que el `preventDefault` le ganara
  la carrera al `Link`, y con dedo terminaba navegando igual.
- **En el panel mobile no hay lugar al costado**, así que ahí se despliega en el
  mismo lugar, debajo del ítem, con su propio scroll.
- Se cierra al navegar y marca el ítem activo.
- La sección quedó con el breadcrumb y el contenido a todo el ancho.

## Clinical Mode

Ver `modulos/clinical-mode.md`. Takeover con barra de catorce controles, diez
pestanas y el Overview maquetado; los nueve examenes cuelgan de sus propios
tableros. Anomalias 67 a 74.

## Billing (2026-09-12)

Nodo `4481:9881`, módulo nuevo de nivel superior (`/billing`), no el
"Relationships & Billing" del tab de un paciente. Cuatro pantallas que son
en realidad estados de una sola vista -vacía, poblada, con el modal "Post
payment" y con un paciente seleccionado. Ver `modulos/billing.md`, con el
detalle de por qué los datos de fila no replican el relleno duplicado del
Figma. Anomalías 75 a 90.

## Responsive

El Figma sólo tiene el frame de 1200. La app funciona de **320 a 1440+** sin
perder ninguna función: nada se recorta y nada desaparece, sólo cambia de
forma. Verificado en 320, 390, 768, 1024 y 1400 sobre las 16 rutas (incluidas
las de Clinical Mode y las pantallas sueltas de login), con desborde horizontal
de documento **0 en todas**.

Cómo se comporta cada pieza:

| Pieza | < 768 | ≥ 768 | ≥ 1024 |
|---|---|---|---|
| Sidebar | panel sobre el contenido, con fondo oscuro y cierre al navegar | rail de 58 con iconos | igual, expandible a 234 |
| Topbar | sólo buscador, campana y avatar | + locación | + saludo y nombre del perfil |
| Dashboard | una columna | dos | tres |
| Panel del paciente | arriba del contenido, avatar al lado del nombre y nav en tira horizontal | igual | columna de 218 a la izquierda |
| Modales | una columna de campos, padding reducido | dos columnas | igual |
| Columna de horarios del turno | al pie del modal, a lo ancho | igual | pegada al costado |
| Tablas | scroll horizontal propio | igual | completas |
| Calendario de Scheduling | Day por defecto; Month con puntos | Week con scroll | las tres completas |

Decisiones que valen la pena anotar:

- **El buscador del header pierde su ancho fijo de 304** y se encoge; lo que
  cae primero es lo prescindible (saludo, locación, nombre del perfil), no la
  búsqueda.
- **La columna de horarios del New Appointment no se esconde en angosto**: se
  mueve al pie del modal a lo ancho. Esconderla hubiera sacado la única forma
  visual de elegir franja.
- **El panel del paciente apilado ocupaba una pantalla entera** antes de llegar
  al contenido. En angosto el avatar va al lado del nombre y la navegación pasa
  a una tira horizontal deslizable.
- **Las tablas no se reflowean a tarjetas**: llevan scroll horizontal con ancho
  mínimo. Reordenar columnas cambiaría la lectura de la información clínica.
- **La tira de stats del dashboard dejó de scrollear de costado.** El sentido
  del componente es ver las tres métricas de un vistazo, y con scroll había que
  arrastrar para enterarse de que existían. En angosto ocupa todo el ancho y
  reparte las tres en columnas, con el icono arriba del texto; desde `lg`
  vuelve a la fila compacta del Figma.
- **Sin breadcrumb en las pantallas del paciente** (dashboard, Treatments,
  Insurance, Documents, Relationships, Add Relationship y Edit Patient). El
  panel lateral ya dice en qué paciente y en qué sección estás; el breadcrumb
  repetía eso y en Insurance además apuntaba a "Documents" (anomalía 61).
- **La leyenda de estados dejó de ser una franja a lo ancho** y pasó a un botón
  "Status legend" que despliega la lista. La franja obligaba a arrastrarla de
  costado en celular y se comía un renglón entero en escritorio. La muestra de
  color ahora es el bloque del calendario —barra de acento más fondo— y no el
  punto suelto, que es lo que hay que reconocer en la grilla.
- **En el mes en celular, tocar un día abre su lista de turnos** debajo de la
  grilla. Las celdas muestran puntos para que el mes entre completo, pero sin
  la lista no había forma de saber de qué turno era cada punto.
- **La card de turno mantiene su estructura de un renglón también en angosto**
  (pedido de Julián). Se probó mandando TR/CC y el kebab a una segunda línea
  para que el nombre no se recortara, pero rompía la lectura de la card: la
  fila de acciones es parte de su identidad. El nombre se recorta con elipsis.

## Regla: Cancel y Save van siempre juntos

El par **nunca se separa ni se apila**, en ninguna pantalla ni ancho. Por eso
`FormFooter` trae su propio contenedor `flex flex-nowrap` con los dos botones
en `shrink-0` y `whitespace-nowrap`, en vez de confiar en el flex de quien lo
use: así no hay contenedor angosto, columna ni wrap que los pueda romper.

## Regla: el sistema no cambia de pantalla por su cuenta

Cuando una acción deja el resultado en otro lado —otro día, otra sección— el
toast **lo ofrece** en vez de llevar al usuario sin preguntarle: mensaje +
botón de acción, y el toast dura 9 segundos en lugar de 3,2. Reprogramar un
turno a otra fecha es el primer caso: avisa y ofrece "Go to Mar 3".

## Regla: toda eliminación se puede deshacer (2026-09-03)

El mismo mecanismo del toast con botón de acción cubre ahora **cualquier
acción de eliminar** en la app: el toast que confirma el borrado trae "Undo"
y, si se aprieta, reinserta el elemento en su posición original —no al final
de la lista—, capturando el índice antes de borrar.

Cubre las diez eliminaciones reales de la app: roles de un empleado
(`RolesLocation.tsx`), hallazgos de una radiografía (`RadiographyViewer.tsx`),
archivos en cola antes de subir (`RadiographyUpload.tsx`), items clínicos del
dashboard del paciente y del modo clínico (medicación/condición/alergia/
cirugía, en `PatientDetail.tsx` y `ClinicalTopBar.tsx`), relaciones
(`Relationships.tsx`), salas y excepciones de una locación
(`LocationDetail.tsx`), empleados (`Employees.tsx`), locaciones
(`Locations.tsx`) y solicitudes de turno canceladas (`Scheduling.tsx`).

Queda afuera **"Go to Mar 3"** de agendar una solicitud: ese toast ya tiene su
propia acción —ir al turno recién creado—, y agregar un segundo botón
"Undo" ahí no deshace un borrado, deshace haber agendado, que es una acción
distinta con su propio efecto (crea un evento en la grilla) y no es lo que
pidió Julián.

## Regla: ningún "+N" es una etiqueta muerta

Cada vez que una lista se corta con un **"+5"**, un "+N more" o cualquier
resumen equivalente, ese resumen **tiene que desplegar** lo que esconde, y
volver a plegarlo. Vale para los chips de procedimientos del popup del
paciente, para el listado de visitas del New Appointment y para cualquier
recorte que se agregue después. En los frames son etiquetas estáticas; en un
prototipo que se clickea, un contador que no lleva a ningún lado es un callejón
sin salida.

Estado al 2026-08-28: el único "+N" de la app es el de los procedimientos del
popup, y despliega los ocho. El listado de visitas de New Appointment muestra
la tabla completa, sin recorte.

## Validación: el error vive en el campo

El toast marca el **final** de una acción, no la corrige. Los errores de
formulario van pegados al campo: borde `#dc2626` y un mensaje de 11px debajo
(`FieldError` en `src/components/patients/form.tsx`). Si un formulario no pasa
la validación **no aparece ningún toast** — la pantalla se queda donde está con
los campos marcados, y el toast recién sale cuando el guardado se completa.

Los campos se marcan recién después del primer intento de guardar, no mientras
se completa el formulario.

## Inputs funcionales con datos ficticios

Todos los controles de formulario responden, no son decorativos:

- **`SelectField`** abre un menú real con opciones por campo (Gender, Race,
  Language, Operatory, Status, etc.) definidas en `OPCIONES` dentro de
  `src/components/patients/form.tsx`. Un label sin entrada cae en genéricas.
- **`DateField`** abre el calendario y fija la fecha elegida.
- **El buscador global del header** filtra sobre un índice ficticio de pacientes
  y páginas, y navega al resultado.
- La **búsqueda de Patients** ya filtraba la tabla; el **filtro de fecha** del
  Dashboard ya filtraba los turnos.

## Foto de perfil editable (2026-09-03)

Los avatares de iniciales de un empleado y de un paciente se pueden cambiar
por una foto real, no son decorativos. `EditableAvatar`
(`src/components/ui/editable-avatar.tsx`) agrega un botón que abre el selector
de archivos del sistema; la imagen elegida reemplaza las iniciales
-object-cover, misma forma que ya tenía el avatar-. Es el mismo componente en
los dos lugares, con distinto `avatarClassName` porque la forma y el color no
son los mismos:

- **Ficha de un empleado** (`Employees.tsx`): cuadrado, fondo celeste
  (`bg-dash-count-bg`). Elena Martinez es el caso de prueba.
- **Panel del paciente** (`PatientSidePanel.tsx`, el panel izquierdo de las
  seis pantallas del dashboard): círculo, fondo azul sólido.

La foto se guarda en `localStorage` (`usePhoto` en `src/lib/usePhoto.ts`), no
en el estado del componente: el panel del paciente se vuelve a montar en cada
tab -Overview, Treatments, Insurance...-, así que sin esto la foto
desaparecería al cambiar de pestaña. No hay backend real detrás -es una app de
datos ficticios-, así que persistir en el navegador es lo más cerca que se
puede estar de "la foto quedó guardada".

**El botón de editar sólo aparece con hover (2026-09-03).** La primera
versión era una insignia de cámara fija en la esquina inferior derecha: con
una foto real puesta, tapaba una parte de la cara todo el tiempo, no sólo al
interactuar. Ahora es un lápiz -ícono de edición, no de cámara- que cubre el
avatar completo pero sólo se ve con `hover`/foco: en reposo la foto queda
íntegra, sin nada superpuesto.
