# Settings - Locations

**Jira** (funcionamiento de la app; índice en [jira.md](../../jira.md)):

- Epics: CON-1590 Location · CON-38 Configuracion aplicacion · CON-1173 [Location] Settings Billing
  ([historias](https://confidetally.atlassian.net/issues?jql=parent%20in%20%28CON-1590%2CCON-38%2CCON-1173%29%20AND%20issuetype%20%21%3D%20Bug%20AND%20status%20%21%3D%20Cancelled%20AND%20%28labels%20is%20EMPTY%20OR%20labels%20%21%3D%20%22design-system%22%29%20ORDER%20BY%20created%20DESC))
- Insurance / Billing Profile de la Location: ver [billing-profile.md](billing-profile.md) (CON-4019).

## Breadcrumb de Settings (2026-08-30)

Sin breadcrumb, volver a General obligaba a abrir el menu flotante del rail:
la pantalla no ofrecia ninguna salida hacia arriba.

El rastro lo arma **el layout** a partir de la ruta, no cada pantalla -asi hay
uno solo; el problema anterior era justamente que se dibujaban dos-:

- `/settings/locations` -> Settings / Locations
- `/settings/locations/abril` -> Settings / Locations / Abril
- `/settings/finance/carriers` -> Settings / Billing / Carriers
- `/settings/general` -> sin migas (es la raiz)

"Settings" siempre apunta a General. El ultimo tramo es la pantalla actual y
por eso no es link. El back-link "< Abril" del detalle se fue: lo reemplaza el
tramo "Locations".


## Roles & Location: diseno nuevo (Figma 3864:270946)

Cambio entero. Antes eran pares de selects "Rol / Location" con un tacho al
lado. Ahora es una lista de **filas de rol**:

- Nombre del rol y, al lado, cuantas sedes tiene.
- A la derecha: "All locations" con su switch, un separador, el tacho y el
  chevron.
- La fila abierta se marca con borde azul y cabecera celeste, y despliega abajo
  una grilla de cuatro sedes, cada una con su switch. La sede activa lleva
  borde azul.
- Arriba a la derecha, **Add Role**; al pie, Cancel y Save.

### La regla del sistema

**Sin ninguna sede tildada, el rol vale para todas.** Por eso el rotulo dice
"All locations" cuando no hay ninguna seleccionada, y no "0 / 4": cero
seleccionadas no significa que el rol no aplique en ningun lado, significa lo
contrario. El switch "All locations" hace las dos cosas -limpia la seleccion, o
la deja lista para elegir a mano-.

### Modal Assign Role

Usa el modal por defecto de la app, igual que New Patient o New Appointment:
**titulo solo** -22px, sin icono ni bajada-, `SectionCard` para la caja
"Locations" y `FieldLabel` para el rotulo del select y los nombres de las
sedes. La primera version traia icono en caja y subtitulo copiados de la
captura, y quedaba como un modal de otra app.

Adentro: el select de Role obligatorio y el aviso azul de **Global access** que
explica la regla, mas las cuatro sedes con switches en tres columnas.

Al guardar sin tocar ninguna sede, el toast lo dice: "X assigned to all
locations".

**Desviacion:** en la captura del modal, Cancel quedo en el extremo izquierdo y
Save en el derecho. Van pegados, como en todo el sistema y como en la pantalla
de Roles & Location del propio Figma.

Las sedes son las del frame, tal cual, incluido **"Naples Detal"**.

El titulo de la pantalla ahora sigue a la pestana -"Roles & Location",
"Provider Info", "Working Hours"-; solo la primera dice "Employee Information".


### "Global access", no "All locations" (2026-08-31)

La fila del rol y el switch decian "All locations" mientras el aviso del modal
llamaba **Global access** a la misma regla. Nombrar dos veces distinto la misma
cosa es lo que hace dudar: ahora es "Global access" en los dos lados.


## Employees se separa de Locations (2026-09-03)

La ficha de un empleado -Employee / Roles & Location / Provider Info / Working
Hours, Figma 3864:235190- vivia colgada de `/settings/locations/:locId`. Un
empleado no es una locacion, asi que se mudo a **Settings -> Employees**
(`/settings/team`), que hasta ahora era un placeholder "Planned".

- `/settings/team` -> tabla de la plantilla: casilla, nombre con avatar
  (iniciales, no foto -ningun otro avatar del sistema usa fotos-), fecha de
  nacimiento, email, pill "Is Provider" y pill de estado. Con busqueda,
  seleccion multiple y kebab por fila.
- `/settings/team/:employeeId` -> la ficha de siempre, sin cambios de
  contenido, solo de direccion.

`/settings/locations/:locId` queda libre para lo que le corresponde: el flujo
real de una locacion.

## El flujo real de una locacion (Figma 3864:277885)

Cuatro pestanas: **Information / Working Hours / Rooms / Exceptions**.

### Information

General Information (Location Name*, Abreviattion*, Preferred Location Fee
Schedule), Contact Information (Country Code*, Number*, Email) y Adress
Information (Address line 1*/2*, City*, State*, Zip Code*, Country*, Time
Zone*). Mismos campos y mismas opciones que el modal "New Location" -se
exportaron sus constantes para no duplicarlas-.

### Working Hours

Tabla Day / Status / Hours: un switch Open/Close por dia y, si esta abierto,
las franjas horarias como pills. Con mas de dos franjas aparece un chip
**"+N" que se despliega** -regla del sistema: ningun "+N" se queda sin
mostrar lo que cuenta-. "Edit hours" abre el modal.

**El frame salta el martes** en la lista de dias -domingo, lunes, miercoles,
jueves, viernes, sabado-. No se replica: un dia ausente de la semana es un
error de contenido, no una decision de diseno.

**Cuando un dia abierto no tiene horas cargadas**, la fila muestra
"+ Add New Hour" en vez de quedar vacia.

#### Modal "New Availability" (4620:115332)

Lo abre el boton "Edit hours" -el titulo del modal no coincide con el rotulo
del boton que lo abre; se replica tal cual-. Mas chico que "New Hours"
(3864:267207, el de la ficha de empleado): sin el aviso ambar y sin selector
de locacion -ya se esta adentro de una-, y el alcance tiene **dos** opciones
en vez de tres: "Only this day" / "All linked days".

### Rooms

Vacio por defecto: "No Rooms" con el icono de punto del EmptyState del
sistema, y "+ Add Room" en el encabezado, no dentro del panel. Al cargar
salas, cada una es una card con icono de puerta, Type y Abbreviation.

**Rooms — Populated (3864:310040) repite "Daniel Anderson"** -el nombre de un
empleado- como nombre de sala, tres veces, con Type y Abbreviation en blanco.
No se replica: es un placeholder de otro componente pegado en el lugar
equivocado, no contenido real. El icono de persona que trae esa card tampoco
-una sala no es una persona-, se usa un icono de puerta.

#### Modal "New Room" (3864:306314)

Name*, Abreviattion* (typo del frame) y Type.

### Exceptions

Lista de filas: punto de estado, nombre, fecha con icono de calendario,
chevron para editar y tacho para borrar. El chevron abre el mismo modal
precargado.

**Exceptions (3864:313606) repite "Radiological Assessment" con la misma
fecha diez veces.** No se replica: mismo caso que las salas, un placeholder
sin contenido real detras.

#### Modal "New Exception" (3864:317345)

Name*, Abreviattion*, Reason, y un recuadro con Start Time* / Date* / End
Time* / "All day exception". Los iconos de basura y guardar que trae ese
recuadro son redundantes con Cancel/Save del pie -asi esta en el frame-, se
dejan con la misma accion.


## Tres detalles corregidos (2026-09-03)

- **Las pills de horario llevan la cruz para quitar esa franja** -se me habia
  quedado afuera al armar la tabla-. Cada `×` borra solo esa franja; si era la
  ultima del dia, el dia vuelve a Close solo.
- **Las cards de Rooms suman editar y borrar.** El icono de lapiz abre "New
  Room" precargado -el titulo cambia a "Edit Room", que no viene del frame
  pero es la misma convencion que ya usan Assign Role y New Exception para
  este mismo patron-; el tacho borra la card con su aviso.
- **El checkbox de "All day exception" pasa a ser el `OptionCheckbox` del
  sistema.** El que arme a mano tenia el cuadrito en `rounded` (4px) con un
  punto blanco; el del sistema es `rounded-[3px]` con el tilde de `Check`,
  que es el que usan New Patient, Add Relationship y el resto de las casillas
  con rotulo largo.


## New Employee (2026-09-03)

Settings -> Employees sumo el boton **"+ New Employee"**, alineado a la
convencion del resto del sistema: mismas tres cards que "New Location"
-General / Contact / Address Information- y las mismas listas de pais,
codigo de pais y estado, exportadas de `NewLocationModal.tsx` para no volver
a escribirlas. `DateField` gano un `placeholder` opcional -"Birthdate" en vez
del "Pick a date" por defecto- para calzar con el contenido de la captura.

## Link Person en la ficha del empleado (2026-09-03)

La ficha de un empleado -tab Employee, card "General Information"- traia un
bloque suelto que no encajaba ahi: "Search Procedure or category" con un
"+ Add new" que solo abria un toast "not available in this release". Buscar
un procedimiento no tiene sentido en la informacion general de una persona;
era contenido de otra pantalla clonado por error.

Se reemplaza por el flujo de "vincular una persona que ya existe en el
sistema" que la propia `LinkPersonCheckbox` ya prometia pero no hacia nada
-el checkbox estaba ahi, decorativo, en este mismo lugar y en el de "New
Employee" y "New Patient"-:

- Tildar el checkbox despliega un campo **Person\*** con buscador.
- El buscador filtra sobre `EMPLEADOS` -no un directorio aparte- **filtrado a
  los que ya son provider** (`esProvider: true`), sin incluir a la persona
  cuya ficha se esta mirando. Es la idea de fondo: esto vincula el registro a
  un provider que el sistema ya tiene cargado, no crea uno nuevo.
- Cada resultado es una card chica (avatar, nombre, DOB) igual a las de
  Relationships; al elegir una queda una card mas grande con fondo celeste y
  borde azul -`bg-[#eff6ff] border-dash-blue`, el mismo tono que ya usa
  `ClinicalPopover` para "Prescribed"- con el nombre en mayusculas y DOB +
  Email en una sola linea.
- El boton cuadrado azul al lado del buscador -icono `Delete`, el mismo de
  "backspace"- limpia texto y seleccion juntos; la "x" de adentro del campo
  solo borra el texto.

`LinkPersonCheckbox` no cambio: ya traia el estilo correcto -borde azul
tildado, el default del sistema-, faltaba nada mas la logica detras.

Dos ajustes mas sobre el mismo flujo, del mismo dia:

- **Los campos manuales se ocultan al tildar el checkbox.** First Name / Lasr
  Name / Email / Birthdate quedaban debajo del buscador aunque esos datos ya
  los tiene el sistema -se ven en la card del provider elegido-. Mostrar los
  dos a la vez duplicaba la misma informacion; ahora el grid de los cuatro
  campos solo aparece con el checkbox destildado.
- **Espaciado parejo en Location -> Information.** El wrapper de `Card`
  (`src/components/settings/primitives.tsx`) no le pone gap a sus hijos: dos
  bloques seguidos -el input de arriba y el grid de abajo- quedaban pegados
  sin aire, mas visible entre "Location Name" y "Abreviattion" pero tambien
  entre "Country Code"/"Number" y "Email", y entre la grilla de "Adress
  Information" y "Time Zone". Se corrige con el mismo `mt-4` que ya usa
  Employees en este mismo lugar (`Card title="Contact Information"` ->
  "Extension"), no un componente nuevo.

## Exceptions: fecha y horas por desplegable (2026-09-03)

Start Time / End Time y Date eran texto libre ("00:00 hs", "DD / MM / YY").
Pasan a componentes del sistema:

- **Date**: el `DatePicker` de shadcn que ya usa el resto de la app -mismo
  calendario que Scheduling-, no un campo de texto con mascara.
- **Start Time / End Time**: un `SelectField` con la grilla de cada media
  hora (00:00 a 23:30), el mismo desplegable que usan los selects de
  cualquier otro formulario.

Los dos campos ademas **dejaron de verse deshabilitados** cuando "All day
exception" esta tildado -tenian `opacity-50` puesto, y ademas se podia
seguir tipeando adentro, asi que el aspecto no coincidia con el
comportamiento-. Siguen sin ser obligatorios en ese caso, pero ya no
parecen apagados.

## Kebab de Employees: el menu "Actions" (2026-09-03)

El kebab de cada fila abria un menu de dos lineas propio. Se reemplaza por el
que paso Julian: titulo "Actions", "Edit Employee" en negro con lapiz, y
cuatro acciones en rojo con el icono de "prohibido" -Delete Employee, Suspend
Employee, Terminate Employee, Disable- mas "Remove Provider Role" con tacho.

- **Delete Employee** es la unica que hace algo de verdad: borra la fila,
  como el "Remove" que reemplaza.
- **Suspend / Terminate / Disable** necesitan un estado de cuenta que el
  sistema todavia no modela -activo/suspendido/terminado-, asi que quedan
  como aviso "no disponible en esta version", igual que el resto de las
  acciones sin backend real en la app.
- **Remove Provider Role** no borra a la persona: le apaga el flag
  `esProvider` y la pill "Is Provider" pasa a "No". Si hiciera lo mismo que
  Delete, dos items del mismo menu tendrian la misma accion.

## Working Hours: el switch en azul (2026-09-03)

El rotulo "Open" iba en verde (`#1a804d`). El switch ya usa azul para el
estado activo -el mismo pill que todo el sistema-; el texto pasa a
`dash-blue` para no meter un segundo significado -verde, que la app reserva
para "Active" / "Completado"- sobre el mismo control.

## "Is Provider" destraba tabs, no solo un dato (2026-09-03)

Las cuatro tabs de la ficha -Employee, Roles & Location, Provider Info,
Working Hours- estaban siempre ahi, tuviera sentido o no: alguien de
mostrador (`esProvider: false`) veia igual "Provider Info" y "Working Hours",
vacias de significado para su rol.

Ahora **Provider Info y Working Hours solo existen si "Is Provider" esta en
Yes**. Tildar el switch:

- Hace aparecer las dos tabs con un pop -`@keyframes tab-in` en
  `src/index.css`, la misma curva que ya usa `fab-panel-in`- para que se lea
  como "esto se acaba de destrabar", no como que la pantalla se reordeno
  sola.
- Dispara un toast confirmando que quedaron disponibles.

Si estabas parado en una de esas dos tabs y alguien te saca el "Is Provider"
-hoy no pasa por la UI real, el switch solo vive en la tab Employee, pero
queda cubierto por si el control se mueve mas adelante-, vuelve a Employee en
vez de dejarte mirando una tab que ya no deberia existir.

## Birthdate y horarios: los inputs de fecha/hora que ya existian (2026-09-03)

Dos inputs se habian quedado en texto libre cuando el resto del sistema ya
tenia el componente correcto:

- **Birthdate de la ficha del empleado** (`Employees.tsx`, tab Employee) era
  un `TextField` comun. Pasa a `DateField` -el mismo calendario que usa
  "New Patient" y "New Employee" para nacimiento, que abre en un año
  plausible en vez del mes actual-.
- **Start Time / End Time de "New Availability"** (`LocationHoursModal.tsx`,
  el popup de "Edit hours" en Working Hours de una locacion) **y de "New
  Hours"** (`NewHoursModal.tsx`, el de la ficha de un empleado -en ese momento
  sin uso real en la UI, pero con el mismo problema; se conectó después, ver
  más abajo-) eran texto libre igual que
  Exceptions antes de corregirlo. Pasan al mismo `SelectField` con la grilla
  de cada media hora (`HORAS`, 00:00 a 23:30) que ya usa `NewExceptionModal`.

## Abrir un dia dispara el popup de horas (2026-09-03)

Tildar el switch de un dia cerrado lo pasaba a "Open" pero sin franjas
cargadas: quedaba en `sinHoras` y habia que apretar aparte "+ Add New Hour"
para recien ahi ver el popup. Un paso de mas para algo que siempre termina en
el mismo lugar.

Ahora, si el switch pasa a Open y el dia no tiene franjas (`dia.rangos.length
=== 0`), "New Availability" se abre solo, con ese dia ya marcado en "Repeat on
days". Cerrar un dia no cambia -sigue vaciando sus franjas, como siempre-, asi
que en la practica esto cubre todos los casos reales: no hay forma de terminar
con un dia recien abierto que ya tenga horas cargadas.

## "New Location" pasa a pantalla completa (2026-09-03)

Era un modal (`NewLocationModal.tsx`) sobre la lista de locaciones. Ahora es
su propia ruta -`/settings/locations/new`, `SettingsNewLocation` en
`NewLocation.tsx`- con el breadcrumb de siempre (`Settings > Locations > New
Location`) como camino de vuelta a la lista, en vez de un botón "Cancel" que
sólo cierra un overlay.

El contenido no cambió: las mismas tres cards -General / Contact / Address
Information-, los mismos catálogos. Esos catálogos (`PAISES`, `CODIGOS`,
`ESTADOS`, `ZONAS`, `FEES`) se movieron a `src/data/location-options.ts` -ya
no tenía sentido que vivieran en un archivo que se llama "Modal" y ya no es
uno-; `LocationDetail.tsx` y `NewEmployeeModal.tsx`, que sólo usaban esas
constantes, apuntan al nuevo archivo.

El primer pase dejó un `max-w-[860px]` heredado del ancho que tenía el modal
-tenía sentido ahí, centrado sobre un overlay; en una pantalla propia sólo
angostaba el contenido contra el borde izquierdo, cards e inputs incluidos-.
Se sacó: ahora ocupa el mismo ancho que la pestaña Information de una
locación, que es la referencia -mismo wrapper `flex flex-col gap-4` sin tope,
ninguna de las dos pantallas lo tiene.

## "Add new hour" de la ficha de un empleado abre "New Hours" (2026-09-03)

Figma 3864:267207 "New Hours" -aviso ámbar, selector de locación, rangos
horarios, días de repetición, alcance del cambio- ya estaba construido en
`NewHoursModal.tsx`, pero **no colgaba de ningún botón**: el "+ Add new hour"
de la tab Working Hours de un empleado (`Employees.tsx`) sólo mostraba un
toast "not available in this release". Se conecta al modal real, que ya tenía
resueltos los Start/End Time como desplegable (ver más arriba) en vez de
esperar a que se usara para recién ahí notar que estaban en texto libre.

## Working Hours de una locación, roto en desktop ancho (2026-09-03)

La fila usa `grid-cols-[140px_140px_1fr]` -Day / Status / Hours-, sin tope de
ancho. En una ventana angosta no se nota, pero a 1440px la columna Hours se
estira a ~900px: las franjas quedan agrupadas a la izquierda y "Edit hours"
-que llevaba `ml-auto`- terminaba solo, pegado al borde derecho, con un vacío
enorme en el medio que lo desconectaba visualmente de las franjas que dice
editar.

Se saca el `ml-auto`. Ahora "Edit hours" sigue directo a la última franja
-o al chip "+N"-, como ya hacía "Add New Hour" en un día sin franjas: la fila
se lee de izquierda a derecha, con el espacio sobrante quedando *después* del
contenido, no partiéndolo en dos.

## "New Employee" pasa a pantalla completa (2026-09-03)

Misma conversión que "New Location", misma razón: era un modal
(`NewEmployeeModal.tsx`) sobre la tabla de empleados, ahora es su propia
ruta -`/settings/team/new`, `SettingsNewEmployee` en `NewEmployee.tsx`- con
el breadcrumb (`Settings > Employees > New Employee`) como vuelta a la lista,
sin tope de ancho. El contenido no cambió: las mismas tres cards, los mismos
catálogos de `location-options.ts`. `Employees.tsx` cambió el botón "+ New
Employee" de `onClick` con estado local a `Link`, igual que "+ New location"
en su momento.

## "New Location" pasa a drawer (2026-10-06)

Misma regla que New Employee: `components/settings/NewLocationDrawer.tsx`, lg, pasos **General**, **Contact** y
**Address**, mismos campos y catálogos que la pantalla anterior. `/settings/locations/new` abre la lista con el drawer
abierto. La locación nueva entra primera en la tabla. Next Step valida sólo el paso a la vista (`lib/useFormPasos`).
Design system: *Components / Settings / NewLocationDrawer*.

## Working Hours con el Chip del design system (2026-10-09)

Las franjas de horario de cada día pasan a `ui/chip` con la ✕ a la derecha (antes a la izquierda, 11px Semibold y
`dash-blue-hover`). El *+N* toma el mismo alto (24px), color y tamaño de texto, y suma `aria-label` ("Show 2 more hours
on Monday"). Mismo criterio que Clinical Mode: la ✕ va al final en todo el sistema.

## New Exception, New Hours y New Location: campos de a dos (2026-10-10)

Regla de Julián (2026-10-10, sobre una captura de Post payment con campos de anchos distintos): en los drawers los
campos van de a dos y del mismo ancho, y vale para todo. Está en *Components / UI / Drawer → Specs → Fields* y se
controla con `npm run ds:campos`.

1. **New Exception**: sale el recuadro del rango (sus campos quedaban 26px más angostos que el resto). Name |
   Abreviattion, Reason | Date y Start Time | End Time; All day exception y los íconos de borrar y guardar el rango en la
   misma línea, abajo.
2. **New Hours**: Location en la columna izquierda, del ancho de Start Time.
3. **New Location**: Name entra en la grilla con Abbreviation y Default Fee Schedule; Time Zone, en la de la dirección.

## Rooms con la lógica de red.dev (2026-11-06)

CON-404 (Registrar room) · CON-1520 (Deactivate Operatory) · CON-1581 add · CON-1582 edit · CON-1583 delete · CON-1584
active. Pedido de Julián con red.dev de guía (`/settings/locations/:id/edit?type=rooms`). Desde esta sesión red.dev pide
login y no se pudo abrir: se armó con las historias y con el patrón de las listas de red.dev que ya están en la app
(Insurance Plans / Employers, `red-dev/settings-billing/`). Validar contra red.dev con capturas.

1. **Misma estética que Working Hours** (pedido de Julián, mismo día): caja blanca con encabezado gris Room ·
   Abbreviation · Type · Status, una fila por sala con el switch en línea (*Active* / *Inactive*, el `SwitchOpenClose`
   de Open/Close con otros rótulos), la inactiva en gris y las acciones como link azul (*Edit room*) + tacho. *+ New
   Room* arriba a la derecha. Debajo de 1024px la fila se compacta: Type · Abbreviation bajo el nombre, sin encabezado.
   Primero se armó con `ui/data-table` (buscador, filtro y ⋮, como Insurance Plans); se cambió para que las pestañas
   de la locación se vean iguales. Una locación tiene pocas salas: sin buscador ni filtro. Vacío: *No rooms yet*.
2. **Campos de CON-404**: Name* y Type* obligatorios, Abbreviation opcional (el drawer anterior lo tenía al revés, del
   frame 3864:306314). Se suma Status (switch, arranca Active). Abbreviation se guarda en mayúsculas.
3. **Validaciones**: nombre repetido en la locación (sin mayúsculas) → *Name already exists.* (texto de Jira). Para lo
   obligatorio se usa el *This field is required.* de todo el sistema, no el *Required fields missing.* de la historia.
4. **Desactivar con turnos (CON-1520)**: `ConfirmDialog` con aviso, el texto de la historia y *Affected Appointments
   (N)* con fecha, provider y paciente; Cancel · Confirm. Confirm la deja inactiva, saca sus turnos y el toast dice
   cuántos pasaron a la lista de espera (con Undo). Prender o apagar el switch sin turnos se aplica enseguida, con Undo. La historia habla de "operatory"; la app dice "room", como la pestaña.
5. **Última sala activa** (*All operatories deactivated. Continue?*): *Deactivate all rooms?* explicando que no se van a
   poder dar turnos en la locación. Si además tiene turnos, va como un párrafo más del mismo aviso: una sola pregunta.
6. Desactivar desde el drawer de Edit pasa por las mismas preguntas.
7. **Datos**: Operatory 1 a 3 (los de la agenda), X-Ray Room, Consultation Room y Sterilization (inactiva). Operatory 1
   y 2 traen turnos de noviembre para que el aviso se vea. `TIPOS_SALA` sigue siendo la lista anterior: ni Jira ni el
   Figma dicen qué tipos hay.
8. **La pestaña va en la URL** como en red.dev: `?type=information|working-hours|rooms|exceptions|billing-profile`.

Para validar: qué tipos de sala tiene red.dev; si Delete con turnos programados debería pedir lo mismo que Inactive
(hoy borra con Undo, CON-1583 no tiene detalle); y que las salas inactivas salgan de los selects de New Appointment
(postcondición de CON-404, no conectado porque la agenda no lee estas salas).

### Rooms: cada turno afectado se edita aparte (2026-11-06, CON-1520)

Julián: "podés gestionar cada cita por separado" quiere decir que cada turno del aviso es editable, para no tener que
cancelarlos todos y poder cambiarle sólo la sala.

1. Cada turno de *Affected Appointments* lleva el link **Edit appointment** (en celular, *Edit*), que abre el mismo
   drawer *Edit Appointment* de la agenda con el turno cargado (paciente, provider, fecha, horas, Operatory y Status
   Booked). Mientras está abierto, el aviso se esconde y vuelve al cerrar.
2. El select **Operatory** ofrece sólo las otras salas **activas** de la locación (`operatorios`, prop nueva de
   `NewAppointmentModal`). Elegir otra saca el turno de los afectados y lo pasa a esa sala: toast *Appointment for X
   moved to Operatory 3.* Guardar sin cambiar la sala deja el turno en la lista con su fecha nueva.
3. **Confirm** sigue la historia: los que quedan se cancelan y pasan a la lista de espera (*N appointments were
   cancelled and moved to the waiting list.*).
4. Si se movieron todos, el aviso pasa a *Deactivate Operatory 1?* (o *Deactivate all rooms?* si es la última activa).
5. Los turnos de ejemplo pasan a horas en punto (09:00, 11:00, 14:00, 08:00): el drawer de turnos va de hora en hora y
   un 10:30 no se podía cargar.

Para validar: si en vez del drawer completo alcanza con un select de sala en la misma fila del aviso (más rápido para
mover varios, pero no deja cambiar la fecha).

### Working Hours: elegir días no es vincularlos, y Open exige horas (2026-11-06, CON-1546)

Pedido de Julián. CON-1546 (*Editar Horario de Apertura/Cierre de Locación*) es la historia; CON-1578/1579 están vacías.

1. **Sale "Apply change to" con "Only this day" / "All linked days".** Elegir varios días en "Repeat on days" aplica
   las franjas a esos días *en esta operación*; no crea una relación entre ellos. Que lunes y martes tengan los mismos
   horarios no los vincula. "All linked days" sólo tendría sentido si el producto manejara grupos de horarios
   compartidos (crear un grupo L-M-V, y al editar el lunes elegir separarlo o editar el grupo): no existe, así que
   la opción prometía algo que no pasaba. Una línea bajo "Repeat on days" avisa que las horas reemplazan las de cada día
   elegido.
2. **Un día no puede quedar Open sin horas.** Activar el switch de un día cerrado ya no lo pasa a Open: abre el panel,
   con el día de origen elegido y una fila vacía de Start / End Time (se pueden sumar franjas y días). El día queda
   Open recién con un Save válido; Cancel o la ✕ no guardan nada y el día sigue Closed. Sale el estado "Add New Hour"
   (abierto sin franjas) y su botón.
3. **El panel se llama "Set working hours"** (antes "New Availability", título del Figma 4620:115332): lo abre tanto
   el switch como "Edit hours", y en los dos casos se fijan horas, no se crea una disponibilidad nueva.
4. **Save guarda todo lo cargado en todos los días elegidos.** Antes guardaba sólo la primera franja y sólo en el día
   de origen, aunque se eligieran más. Las franjas se ordenan por hora y se muestran con el formato de los chips
   ("08:00 AM - 01:00 PM").
5. **"Edit hours" abre con las franjas del día cargadas**, para editarlas en vez de reescribirlas de cero.
6. **Validaciones de CON-1546** debajo de cada fila: "Start time must be earlier than end time.", "Time interval must
   be at least 30 minutes." y "This time interval overlaps with another."; sin días elegidos, "Select at least one
   day.".
7. **Cerrar un día vacía sus franjas** (así reabrirlo arranca con la fila vacía del punto 2) y avisa "Monday is now
   closed." con **Undo**, para no perder horas por un toque de más. Quitar la última franja con la ✕ del chip también
   lo cierra, como ya pasaba.

Queda afuera: el aviso de CON-1546 cuando hay turnos fuera del horario nuevo (no hay turnos por locación en los datos
mock) y el de "All operating hours have been disabled". "New Hours" de la ficha de un empleado tiene su propio
alcance ("All selected days" / "This and future weeks") y no se tocó.

### Working Hours: aplicar el horario a otros días y resolver turnos afectados (2026-11-16, CON-1546, CON-2890)

Pedido de Julián con la historia *Aplicar los horarios a otros días* de Abril Viola. **No está cargada en Jira** (se
buscó por título y por el texto del modal): se cita CON-1546 (editar horario de la locación) y CON-2890 (pantalla de
resolución de turnos). Cuando exista la clave, sumarla acá, en el código y en `jira.md`.

1. **El día de origen queda elegido y no se puede sacar** en *Repeat on days*: va relleno en azul, con
   `aria-disabled` y el nombre "Sunday (day being edited)". Los demás días se eligen libres, estén Open o Closed. La línea
   de ayuda suma "Each day can still be edited on its own later." (guardar varios días no los vincula, ver 2026-11-06).
2. **Replace working hours?** (`ConfirmDialog`, Cancel / Confirm) sale cuando al menos un día **adicional** está Open y
   tiene otro horario. El mensaje nombra sólo esos días, en el orden de la tabla y sin el de origen: "This will replace
   the existing working hours for Monday and Tuesday. Do you want to continue?". No sale si sólo cambia el día de
   origen, si los adicionales están Closed o si ya tienen el mismo horario. La comparación ordena las franjas
   (`mismoHorario`), así que el orden de carga no cuenta. Cancel vuelve al panel con el borrador y los días elegidos;
   no guarda nada.
3. **Confirm sigue con el impacto en turnos** antes de guardar. Si las horas nuevas dejan afuera un turno Proposed o
   Booked de esos días (dura una hora y tiene que caber entero en una franja), se abre **These hours affect scheduled
   appointments** (`HoursAppointmentsDialog`) y el panel sigue abierto atrás: todavía no se guardó nada.
4. **El texto de CON-2890 se adaptó a la locación** (decisión de Julián, 2026-11-16): la historia dice "assigned to
   this provider" y propone cambiar el provider, pero en una locación cambiar el provider no saca el turno de fuera de
   horario. Queda: "There are scheduled appointments outside the new working hours. You can review and manage each
   appointment individually, or confirm to move all appointments to the waiting list." El título es propio (la historia
   no trae uno).
5. **Por turno**, el ⋮ (`RowActionsMenu`): *Edit appointment* abre el drawer de la agenda para moverlo de día, hora o
   provider (si sigue afuera, un toast lo dice); *Cancel appointment* y *Mark as No Show*; *Undo changes* vuelve al
   original. Cada fila dice qué le va a pasar: "Moves to the waiting list on Confirm.", "Now within the new working
   hours." o "Will be marked as No Show.", y abajo cuántos pasan a la lista de espera. Los cambios son un borrador:
   **Cancel** del aviso vuelve al panel sin aplicar ni las horas ni los turnos.
6. **Confirm** guarda las horas en todos los días elegidos, aplica lo resuelto y pasa el resto a *Waiting List*:
   "Hours saved for 3 days. 1 appointment was moved to the waiting list.". Sin turnos afectados guarda directo, como
   antes.
7. **Datos**: `TURNOS_LOCACION` (lunes 23/11 15:00 Booked, martes 24/11 08:00 Proposed y otros que quedan adentro), para
   que Sunday 09:00–14:00 aplicado a Monday y Tuesday muestre dos afectados.

Queda afuera: el bloqueo de CON-2890 con turnos Check In / In Progress ("This shift cannot be modified…"), cerrar un día
o quitar una franja con la ✕ del chip cuando tiene turnos (CON-1547), y conectar estos turnos con la agenda real.

Para validar con usuarios: si recepción entiende que el día de origen relleno "no se puede sacar" sin el tooltip; si el
⋮ por turno se descubre o conviene dejar las acciones a la vista; y si "Waiting List" en bloque es lo que esperan como
salida por defecto.

#### Documentación (2026-11-16, CON-1546, CON-2890)

- **Storybook:** *LocationHoursModal* (Parts, States y Specs, con *Replace Question*), *HoursAppointmentsDialog*
  (nuevo) y *Elements / ConfirmDialog* con el ícono en línea. Detalle en `design-system.md`, 2026-11-16.
- **Figma, Screens & Flows** (página ⚙️ Settings — Locations, `7:16`): flujo nuevo *Locations — Set working hours:
  other days & affected appointments*. Siete pantallas: la semana, el panel con el día de origen fijo, otros días
  elegidos, *Replace working hours?*, los turnos afectados, uno resuelto con No Show y las horas guardadas. La página
  se recapturó entera desde la app (`scripts/figma/flujos/settings-locations.mjs`).
- **Figma, design system:** *Confirm dialog* con `Tone` × `Icon` en *Feedback & Overlays*.

### Affected appointments: lista con jerarquía y un solo contador (2026-11-16, CON-1546, CON-2890)

Pedido de Julián, con una referencia.

1. **Título más corto**: *Affected appointments* (antes *These hours affect scheduled appointments*). Se mantiene el
   ícono de 16 px en línea de la propuesta A: la referencia traía el círculo, que se sacó en toda la app.
2. **Cada fila, de arriba hacia abajo**: el paciente (semibold, con el ⋮ a la derecha), la fecha con el horario
   completo ("Monday, November 23 · 3:00–4:00 PM") y el provider en gris. El estado es un badge a la derecha, separado
   del texto. Antes la fecha, el estado, el provider y el paciente compartían dos líneas.
3. **Un solo contador**: *Appointments (2)*, arriba de la lista. Salen el pie "2 appointments will move to the waiting
   list." y la línea por fila "Moves to the waiting list on Confirm.": el mensaje de arriba ya lo dice.
4. **Lo resuelto se ve en el badge** (Cancelled, No Show). El turno movido adentro del horario con *Edit appointment*
   conserva su estado, así que es el único que suma una línea verde, "Now within the new working hours.".

Para validar: si el badge alcanza para notar que un turno ya está resuelto, sin la línea por fila. Y si el aviso de
Rooms (*This room has scheduled appointments*, CON-1520) debería tomar la misma jerarquía: hoy la lista es igual a la
de antes.

### Working Hours: "+N" sólo cuando las franjas no entran (2026-11-16)

Julián: "no entiendo por qué dice +2 cuando te sobra toda la pantalla", y después: "el +2 debe estar cuando no entran
los horarios".

1. **Antes**, la tabla mostraba siempre las dos primeras franjas y "+N", aunque sobrara ancho.
2. **Ahora** (`FranjasDia`), la fila muestra en una línea todas las franjas que entran junto a *Edit hours*. Sólo si no
   entran, las que sobran quedan en "+N", que al tocarlo las despliega a todas, bajando de línea. Los anchos se miden en
   una copia invisible (`aria-hidden`) y se recalculan con `ResizeObserver` al cambiar el ancho. En escritorio entran
   las 4; en tablet (1024) quedan 2 y "+2"; en celular, 1 y "+3".
3. **Celular** (menos de 640 px): la grilla de tres columnas se cortaba a la derecha. Ahora el día y el switch van arriba
   y las franjas o *Closed all day.* debajo, a todo el ancho; el encabezado queda *Day · Status*.
4. **Start Time y End Time llevan asterisco** en *Set working hours* y en *New Hours* (Employees): son obligatorios y
   ya se validaban con *Required.*, pero no lo decían.
5. Los e2e cuentan las franjas por su botón *Remove …*, no por el texto: la copia invisible repite el texto.

Para validar: si "+N" en celular, con una sola franja visible, se entiende o conviene mostrarlas todas ahí.

## CON-4161 · Campo vacío: *This field is required.* (2026-11-16)

1. *Set working hours*, *New Hours* y *New Exception* decían *Required.* debajo de Start/End Time vacíos; CON-4161 y
   CON-4162 piden *This field is required.*, el texto único de la app (`OBLIGATORIO`, regla en
   [figma/README.md › Validación](../README.md)). Los demás errores de horarios no cambian.

### Borrar una franja, cerrar un día y citas afectadas según la HU 8 (2026-11-16, CON-4165, CON-4166, CON-4167)

Pedido de Julián con CON-4165 (HU 6, cerrar un día) y CON-4166 (HU 7, eliminar un intervalo). Aparecieron en Jira las
historias de Working Hours HU 1 a 8 (CON-4160 a CON-4167). *Aplicar a otros días* es CON-4164 (HU 5) y las citas
afectadas, CON-4167 (HU 8).

1. **Toda operación pasa por el mismo recorrido** (`Operacion` en `LocationDetail.tsx`):
   1. Pregunta (salvo el panel, que ya tiene la suya de reemplazo).
   2. Impacto: si alguna cita afectada está en Check In o In Progress, se bloquea; si hay otras, *Affected appointments*.
   3. Se aplica.

   Cancel en cualquier paso deja la tabla como estaba.
2. **Borrar una franja (✕ del chip)**:
   - *Delete working hours?* (danger, tacho): "This will delete the working hours from 08:00 AM to 01:00 PM on Monday. Do
     you want to continue?". Si es la última del día, suma "Monday will be closed."; si además es la última de la
     locación, "The location will have no working hours.".
   - Al confirmar sale sólo esa franja; sin franjas, el día queda Closed. Toast con Undo.
3. **Cerrar un día (switch)**:
   - *Close working hours?* (danger, triángulo): "This will close the location every Monday. Do you want to continue?"
     y, si era el último día abierto, la misma frase de la locación sin horarios. Una sola pregunta.
   - Las franjas **se conservan** (el día queda `abierto: false` con sus `rangos`). Reabrirlo abre *Set working hours* con
     esas franjas, y se reabre recién con Save.
   - Antes, cerrar vaciaba las franjas sin preguntar (2026-11-06, punto 7); eso queda reemplazado.
4. **Citas afectadas, según CON-4167**:
   - Entran sólo las que **pierden cobertura**: estaban cubiertas por un día Open y dejan de estarlo. Las que ya estaban
     afuera no cuentan.
   - Lo que se hace cita por cita (Edit appointment, Cancel appointment, Mark as No Show) **se guarda en el momento** y
     no se deshace con Cancel.
   - La cita resuelta **sale de la lista** y *Appointments (N)* cuenta sólo las pendientes. Sale *Undo changes* del menú
     y la línea "Now within the new working hours.".
   - Si no queda ninguna, se vuelve a la acción de origen: el panel, o la pregunta de borrar o cerrar, que sigue sin
     citas afectadas.
   - Confirm pasa a *Waiting List* las que siguen afectadas, conservando la cita.
5. **Bloqueo**: *Unable to change working hours* (`HoursBlockedDialog`, sólo Close) con el texto de CON-4167 ("Working
   hours cannot be changed because there are affected appointments in Check In or In Progress status.") y las citas en
   curso. No se aplica nada y el panel conserva el borrador. El título es propio, con el mismo patrón que *Unable to
   disable billing profile*.
6. **Datos**: `wh6`, una cita en Check In hoy (lunes 16, 10:00), para mostrar el bloqueo al borrar 08:00 AM - 01:00 PM
   de Monday. `EstadoTurnoLocacion` suma Check In e In Progress.
7. **Íconos de advertencia en azul** (Julián): en `ConfirmDialog`, `icon="warning"` va en `dash-blue` salvo en
   `danger`, que sigue rojo. Afecta también a Consent required.

Para validar: si "The location will have no working hours." alcanza como advertencia o conviene un tono más fuerte; y si
el Undo de borrar y cerrar tiene sentido cuando ya hubo una pregunta antes.

#### Documentación (2026-11-16, CON-4165, CON-4166, CON-4167)

- **Storybook:**
  - *Pages / Parts / Location detail*: Delete working hours?, Close working hours?, Unable to change y la tabla
    *Working Hours · States*.
  - *HoursAppointmentsDialog* rehecho con CON-4167.
  - *Elements / ConfirmDialog*: la advertencia en azul.
- **Screens & Flows** (página ⚙️ Settings — Locations): flujo nuevo *Locations — Delete hours & close a day*, con 9
  pantallas. La página se recapturó entera y se reconectó a la library del design system: 0 instancias locales y los
  rellenos ligados a variables.
- **Design system en Figma:** *Confirm dialog* con la advertencia en azul y los ejemplos *Delete working hours?* y
  *Close working hours?*.

## Tablas de Settings: a la ficha sólo por el ⋮, menús con ícono y *Edit* (2026-11-18)

Sin historia de Jira: devolución de diseño de Julián sobre Locations, Employees y Accounts.

1. **Una sola forma de entrar a la ficha**: el ⋮ → *Edit*. El nombre de la fila deja de ser link (Locations y Accounts:
   `TextCell`; Employees: `PersonCell` sin `to`, que ahora dibuja texto y no un botón vacío). Antes había dos caminos al
   mismo lugar.
2. **Menús alineados** con el de Patients (*Overview* / *Edit*): todos los ítems llevan ícono a la izquierda y nombre
   corto, sin repetir la entidad de la fila.
   - Locations: *Edit* (lápiz), *Delete* (tacho).
   - Employees: *Edit* (lápiz), *Delete* (tacho, antes el ícono de prohibido), *Suspend*, *Terminate*, *Disable*
     (prohibido) y *Remove Provider Role* (persona con menos, antes otro tacho).
   - Accounts: *Edit* (lápiz), *Manage Licenses* (llave), *Suspend* (prohibido). Antes no tenían íconos.

**A validar:** que recepción y administración no extrañen el clic en el nombre (es el patrón de Patients, que sí lo
conserva). Si lo extrañan, la salida es la fila entera clickeable, no volver al link.

## Exceptions con la estructura de Roles & location (2026-11-20)

Pedido de Julián: *Add exception* y *Add role* tenían diseños distintos (uno adentro de una caja blanca, el otro no).
Se saca la caja: botón primario arriba a la derecha y cada excepción como card suelta (blanca, borde, `rounded-xl`, el
mismo padding que la card de un rol), con 12 px entre cards. *Add exception* era un link azul; ahora es `ui/button`.

### Sin puntos de estado (2026-11-20)

Pedido de Julián: el punto verde o gris de cada excepción no existe en el resto de la app. El estado pasa a `ui/pill`
con su nombre (Active en verde; Expired y los demás en neutro), al lado de la fecha, como el Status de Employees.

### Exceptions con el diseño de Rooms (2026-11-20, corrige lo anterior)

Pedido de Julián: que Exceptions quede igual a Working hours y Rooms. Botón *Add exception* arriba a la derecha, afuera;
una caja blanca con encabezado gris (*Exception · Date · Status*) y una fila por excepción (`FILA_EXCEPCION`, misma
grilla que `FILA_SALA`): nombre en semibold, fecha, estado en `Pill` y, al final, *Edit exception* con el lápiz (como
*Edit room*) y el tacho. El chevron que abría la edición pasa a ser *Edit exception*: hace lo mismo. En el celular la
fecha baja debajo del nombre, como el tipo de una sala.

## Tablas estandarizadas v2 (2026-11-24)

Pie, alineación, fechas y avatar con las reglas comunes de todas las tablas: ver `design-reference/figma/README.md`
(*Tablas estandarizadas v2*, 2026-11-24).

### El nombre vuelve a ser link (2026-11-24)

Pedido de Julián con el HTML de tablas estandarizadas v2: el nombre de la fila lleva a la ficha (link azul, como Patients
y Carriers) y el ⋮ → *Edit* sigue. Corrige el punto 1 del 2026-11-18.

## Working hours: el tacho en Set working hours, la ✕ en las franjas (2026-11-25)

Sin historia nueva (el borrado es CON-4165 / CON-4166): pedido de Julián, igualar el ícono de borrar de Working hours con
el tacho de Rooms y del resto de la app.

- En *Set working hours*, el botón de cada rango pasa de la ✕ al tacho (*Delete time range*), como en *New exception*.
- **Las franjas de la tabla siguen con la ✕ del chip** (Julián, mismo día: "en los badges de los horarios sí vale la
  pena la X"). Es un chip y la ✕ es la forma de sacarlo; igual pregunta antes (*Delete working hours?*).
