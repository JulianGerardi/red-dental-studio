# Cambios

Lo último arriba. Cada PR suma su entrada: qué cambió y qué tiene que saber el dev. El porqué de cada decisión está en
`design-reference/figma/modulos/<módulo>.md`; lo anterior al 2026-10-06, en `git log` y en esos mismos archivos.

## 2026-10-18

### Un solo avatar de persona en toda la app ([#49](https://github.com/JulianGerardi/red-dental-studio/pull/49))
- Pacientes, providers, empleados y la cuenta usan el avatar de la card de Appointments: cuadrado con esquinas
  redondeadas, azul con iniciales blancas. Se van los círculos (Patients, Employees, Relationships, panel del paciente)
  y el celeste del equipo. Esquina con el token nuevo `--radius-avatar` (27%, `rounded-avatar`).
- **Para el dev:** `<Avatar initials size photo />` de `ui/avatar` (se va `AvatarFallback`; tamaños 24 a 72 en
  `AVATAR_SIZES`). `PersonCell` pierde `tone`; `EditableAvatar` recibe `size` en vez de `avatarClassName`. No escribir
  avatares a mano. Storybook: *Elements / Avatars*.

### Topbar: el saludo un poco más separado del botón del menú ([#48](https://github.com/JulianGerardi/red-dental-studio/pull/48))
- Entre el botón de expandir el menú y el saludo hay 14px en lugar de 8. Nada más cambia.
- **Para el dev:** `gap-3.5` en el bloque izquierdo de `Topbar.tsx`.

### El icono 3D va sólo en el saludo, y el texto más chico ([#47](https://github.com/JulianGerardi/red-dental-studio/pull/47))
- El calendario del saludo ("Sunday - October 18, 2026") pasa a ser el emoji 📅, 3D como la manito. El campo de fecha y
  *Today* vuelven al icono lineal (lo de #43 se revierte). El saludo baja de 19 a 16px.
- **Para el dev:** se va `emojiFecha` de `ui/date-picker.tsx`; `Saludo.tsx` usa 📅 en vez de `CalendarDays`.


### Icono de calendario 3D en la fecha del Dashboard ([#43](https://github.com/JulianGerardi/red-dental-studio/pull/43))
- El campo de fecha ("Feb 28, 2026") y el botón *Today* usan el emoji 📅 / 🗓️ (3D, como la manito del saludo) en lugar
  del icono lineal. La tira de números, los formularios y el Date filter no cambian.
- **Para el dev:** `emojiFecha` en `ui/date-picker.tsx`; `DatePicker variant="toolbar"` lo usa. Para otro icono 3D, el
  mismo componente con el emoji que corresponda.

### Patients: barra lateral, Recent Patients de vuelta y sin el link "Patients ⌄" ([#44](https://github.com/JulianGerardi/red-dental-studio/pull/44))
- *New Patient* pasa a la fila del título; la barra lateral (*Today Appointments* / *Recent Patients*, de vuelta con
  los últimos 10) arranca a esa misma altura. Las dos listas usan `ui/show-more` (4 turnos, 3 pacientes): nunca queda
  una fila cortada. Se saca el link "Patients ⌄" de arriba, que no abría nada.
- **Para el dev:** `BotonVerTodos` se va de `pages/Patients.tsx`; para una lista larga nueva, `ui/show-more`.

### Dashboard: botón por panel, íconos de Pending Task a la derecha y más gente en la agenda ([#45](https://github.com/JulianGerardi/red-dental-studio/pull/45))
- **Appointments** siempre muestra **Check In** (verde) y **Waiting Room** siempre **Check Out** (azul): la acción la
  decide el panel. **Cancel** sale del Dashboard; si se quiere, va como opción del kebab.
- **Pending Task:** en angosto, el documento y *Expired date* van contra el borde derecho, alineados con el botón azul.
- **Día de la demo con más gente:** 6 en la sala de espera, repartidos entre las salas (el filtro por sala tiene a quién
  mostrar).
- **Para el dev:** `Dashboard.tsx` pasa `accion` según el panel; `dashboard-data` ya no trae `accion`. `AccionTurno`
  sigue aceptando `'Cancel'`. e2e actualizado en `tests/dashboard.e2e.ts`.

### Dashboard: Pending Task como tercera columna ([#40](https://github.com/JulianGerardi/red-dental-studio/pull/40))
- Appointments, Waiting Room y Pending Task se reparten el ancho desde 1280px. Entre 1024 y 1280, Pending Task queda
  abajo, a lo ancho; más angosto, una columna. Sin componentes nuevos: sólo la grilla de `pages/Dashboard.tsx`
  (`xl:grid-cols-3`; el panel lleva `lg:col-span-2 xl:col-span-1`).

## 2026-10-17

### Consent required al completar o empezar un procedimiento sin firma ([#46](https://github.com/JulianGerardi/red-dental-studio/pull/46))
- Nuevo diálogo **Consent required** para CON-3927, CON-3946 y CON-3950 (prototipo de Julián *Consent modals revised*):
  sale al tocar *Complete* en un caso aceptado de Treatment Plan y *Start* en la tabla Procedures del Overview, cuando el
  consentimiento del procedimiento no está firmado. Dos variantes: **No consent sent** (manda el documento y sigue, sin
  segunda confirmación) y **Signature pending** (sigue con la firma pendiente, con *View consent*); las dos ofrecen
  *Sign now* y *Cancel*. Si el caso todavía no se aceptó, no hay diálogo: aviso de error *Procedure cannot be updated*
  con *View case*.
- **Para el dev:** `clinical/ConsentRequiredDialog.tsx` (`ConsentRequiredDialog`, `consentimientoRequerido`,
  `avisarCasoNoListo`, `CASO_LISTO`); textos en `CONSENTIMIENTO_REQUERIDO` (`data/treatment-plan.ts`). `ui/confirm-dialog`
  suma `icon="warning"`, `otherAction` y `loading`. `aviso.ok/error/warn/info` aceptan `{ titulo, texto }` además de un
  string. Decisiones en `figma/modulos/clinical-mode.md`. No se pudieron leer los tickets de Jira en esta sesión (el
  conector de Atlassian no estaba conectado): conviene cotejar contra sus criterios de aceptación.

### New Appointment: visita linkeada a otro turno ([#41](https://github.com/JulianGerardi/red-dental-studio/pull/41))
- Si la visita del plan que se elige ya está linkeada a otro turno, su fila lo muestra (fecha, hora, estado e info) y
  Save pregunta *Move treatment visit?*: *Move visit* la mueve al turno nuevo; *Cancel* vuelve al drawer sin cambios.
  Es una pregunta, no un tercer paso: así el indicador siempre dice dos.
- **Para el dev:** `Visita.vinculada`, `TurnoVinculadoInfo` y `MoverVisitaDialog` en `TreatmentPlanPicker.tsx`.
  `ConfirmDialog` ahora devuelve el foco al botón que lo abrió (aplica a todas). Storybook: *Components / Scheduling /
  TreatmentPlanPicker* y *NewAppointmentModal*. e2e nuevo: `tests/scheduling-linked-visit.e2e.ts`.

### Scheduling: View rediseñado ([#39](https://github.com/JulianGerardi/red-dental-studio/pull/39))
- El filtro **View** tiene el diseño nuevo: Status en una fila, Providers con buscador y de a dos, Rooms al costado con *Current view* y pie con resumen,
  Cancel y Save. Es un popover bajo el botón: Save guarda la vista; Cancel, ✕, Escape o clic afuera la descartan. En tablet y celular se reacomoda.
- **Para el dev:** `ViewMenu` (en `ViewFiltersPanel.tsx`) reemplaza al panel absoluto y a `data-view-trigger`; `Scheduling` guarda `vista`
  (`VistaCalendario`) pero la grilla todavía no filtra. Sale `Group`; entran `OpcionFiltro`, `GrupoFiltro` y `SeccionFiltro`. Storybook:
  *Components / Scheduling / ViewFiltersPanel*.

### Patient Overview: Pending Task y Pending documents a la izquierda, Appointments en su columna ([#42](https://github.com/JulianGerardi/red-dental-studio/pull/42))
- El Overview del paciente pasa a dos columnas desde 1024px: a la izquierda Pending Task y debajo Pending documents; a
  la derecha Appointments (280px) del alto de las dos, con 7 turnos a la vista. Abajo de 1024px, una columna. Mismo
  contenido, otro orden.
- En una columna angosta, la fila de Pending documents baja el vencimiento y el botón a un segundo renglón en vez de
  aplastar el nombre.
- **Para el dev:** `PatientDetail.tsx` (grilla `lg:grid-cols-[minmax(0,1fr)_280px]`, `TOPE.turnosColumna` con `useMedia`);
  `PendingDocuments.tsx` (`basis-56` + `ml-auto`). Storybook: *Pages / Parts / Patient Overview* y *PendingDocuments →
  Narrow column*. Nuevo e2e `tests/patient-overview.e2e.ts`.

### Detalle del registro en Clinical Mode y Treatment Plan; detalle por tipo en Ledger y Billing ([#30](https://github.com/JulianGerardi/red-dental-studio/pull/30))
- **Clinical Mode:** el detalle de Procedures y Problem List ordena sus filas por importancia (Treatment, Procedure consent, Findings, Referral, Lab order; en un problema, Procedures, Treatment, Referral, Lab order, Source exam). *View full record* también sale del menú de cada finding de los exámenes y las filas de Treatment Plan se despliegan con el mismo detalle. Las pills van de a una por dato, chicas y con minúscula inicial.
- **Ledger y Billing:** la fila se despliega según su tipo (Procedure, Charge Adjustment, Patient Payment, Credit Adjustment) con Location, Financial details y las transacciones aplicadas; Billing lo muestra con un paciente elegido. Lo del cobro vive sólo ahí, no en Clinical Mode. Insurance Payment sigue con los datos de siempre.
- **Para el dev:** `ui/detail-list` (`ListaDetalle`, `FilaDetalle`…), `LedgerRowDetail` / `DetalleMovimiento` (lo usa Billing), `RecordDetail` con `registroDePlan`, `registroDeHallazgo` y `useVerRegistro`; Clinical Mode acepta `?case=` y `?procedure=`. Datos: `APLICACIONES` en `data/ledger.ts` y `APLICACIONES_BILLING` en `data/billing.ts`. Storybook: *Components / UI / DetailList*, *Ledger / LedgerRowDetail*, *Clinical / RecordDetail*, *Pages / Parts / Billing*.

### Dashboard: filas en cards, salas arriba con color y filtro, colores por acción y saludo animado ([#31](https://github.com/JulianGerardi/red-dental-studio/pull/31))
- **Filas en cards:** las de Appointments, Waiting Room y Pending Task (también el Pending Task del Patient Dashboard)
  van cada una en su card interna, con 12px entre una y otra.
- **Salas en una tira arriba** que llena el ancho (mínimo 232px por card; las que no entran, a "Show N more"), con el
  **color de su estado** (borde y fondo de su pill). **Tocar una sala filtra la Waiting Room**: la elegida lleva el
  anillo azul, las demás se apagan y el filtro va como chip junto al título. Las salas se llaman "Operatory 1…6", como
  en los turnos.
- **Appointments y Waiting Room a la par**, a todo el ancho desde 1024px. **Un color por acción:** Check In verde,
  Check Out azul, Cancel rojo. Link a **preguntas frecuentes** (Help) al lado de Today. Salen la fecha de arriba del
  título y la línea de alcance de la fecha.
- **Topbar:** "Hi! Dentist Sarah" se escribe y deja la fecha del día con un calendario, una vez por sesión.
- **Para el dev:** `Button` suma la variante `success`. `ACCION_TURNO` (`AppointmentCard`) mapea acción → variante y
  `AccionTurno` suma `'Check In'`. Nuevos: `dashboard/OperatoryStrip` (`elegida`, `onElegir`) y `layout/Saludo` (usa
  `sessionStorage` `saludo-visto`). `OperatoryCard` suma `enPagina` con `OPERATORY_SURFACES`, `seleccionada`,
  `atenuada` y `onClick` (botón con `aria-pressed`). `ListGroup` pone cada hijo en un `<li>` con `TARJETA_INTERNA`;
  `ShowMore` no lleva degradé si la lista abierta no scrollea; `AppointmentRow` pasa a columnas desde `@4xl`. Storybook:
  nuevas *Components / Dashboard / Operatory strip* y *Components / Layout / Greeting*. e2e en `tests/dashboard.e2e.ts`.

### Patient Dashboard sin huecos y breadcrumbs del paciente ([#37](https://github.com/JulianGerardi/red-dental-studio/pull/37))
- El menú del paciente baja hasta el final de la pantalla y Pending Task y Appointments terminan a la misma altura: el
  Overview cierra parejo, sin espacios grises.
- Las siete pantallas del paciente llevan **Patients / John Smith / sección** en lugar del "‹ Patients" (el Overview
  termina en el paciente; Edit Patient también lo tiene). Las de primer nivel (Patients, Billing, Dashboard, Settings,
  Profile…) no llevan; Profile mostraba un "Settings" suelto y ya no.
- **Para el dev:** componente nuevo `components/patients/PatientBreadcrumb` (`migasPaciente`), no armar el rastro a
  mano. `PatientSidePanel` va con `lg:self-stretch` (el contenedor ya no necesita `lg:items-start`). `Breadcrumb` suma
  foco visible y `aria-current`. Storybook: *Elements / Breadcrumb* (reemplaza a *Components / UI / Breadcrumb*) y
  *Components / Patients / PatientBreadcrumb*. e2e nuevo: `tests/patient-dashboard.e2e.ts`.
- Todos los breadcrumbs (también los de Settings) separan los tramos con **"/"** en lugar de la flecha.

## 2026-10-13

### Billing en el menú lateral, sin menú: sus tablas, sólo en Settings ([#36](https://github.com/JulianGerardi/red-dental-studio/pull/36))
- El ítem **Billing** del menú lateral va directo a su pantalla, sin menú flotante. **Fee Schedules, Carriers y Coverage
  Table** quedan sólo en Settings → Billing; ahí el ítem marcado es Settings.
- **Para el dev:** se borran `BillingItem` y `billingMenu` (`NavigationPreview`); Billing es un ítem más de `NAV` y
  `SettingsItem` queda activo en todo `/settings/*`. En *Elements / Navigation → States*: *Billing* y *Settings menu ·
  Billing tables*.

### Billing: bento con Find Patient arriba, la tabla hasta abajo y los botones del paciente dentro del panel ([#33](https://github.com/JulianGerardi/red-dental-studio/pull/33))
- Bento: izquierda los números y Recent Billing Activity; derecha Find Patient (a la altura de los números) y Today.
  Las dos columnas terminan juntas: la tabla muestra 15 filas por página y Find Patient scrollea adentro.
- Con un paciente, los botones de pago van arriba del título de su actividad y el bento guarda el alto del resumen.
- **Para el dev:** `Stat enFila` alinea etiqueta, número y bajada entre cards con subgrid. `AccionesPaciente` (con
  `ui/button` md, en el `top` del Panel) reemplaza a `EncabezadoBilling`. La columna derecha va absoluta desde `lg`
  y toma el alto de la izquierda (`--billing-alto` con paciente). Tres pacientes más en `data/billing.ts`.

### Notifications sin Pending ni Archived, el ojo y el banner de punta a punta ([#34](https://github.com/JulianGerardi/red-dental-studio/pull/34))
- Notifications queda con dos estados (sin leer y leída) y dos pestañas (*Inbox* y *Unread*): se van Pending, Archived,
  archivar y el menú ⋮ (sólo tenía acciones de archivar). La acción de la fila es un ojo: *Mark as read* / *Mark as
  unread*. El banner amarillo va de punta a punta del contenido en toda la app, con la X sola a la derecha.
- **Para el dev:** `EstadoNotificacion` es `'unread' | 'read'` y `Notificacion` ya no tiene `archivada`; el store pierde
  `archivar`. `delBanner` = tareas sin leer no ocultas. `NotificationBanner` pasa a `w-full` con la X en `ml-auto`. Las
  tareas pendientes de ejemplo quedan sin leer (Unread 8) y las archivadas se sacan.

### Confibot vuelve a flotar abajo a la derecha ([#35](https://github.com/JulianGerardi/red-dental-studio/pull/35))
- Vuelve el botón flotante de Confibot (el de antes de pasar al menú): se estira a "Confibot" con el mouse o el foco, se
  recoge con la flechita en una pestaña al pie y eso se recuerda entre visitas. En Scheduling se apila arriba de
  Appointment requests; no se dibuja con el chat o un CoachMark abiertos. El ítem del menú lateral se queda.
- **Para el dev:** `ConfibotLanzador` y `useConfibotRecogido()` en `help/Confibot.tsx`, montados por `AppShell`, que
  vuelve a reservar su alto al pie del `main` (`pb-24 sm:pb-28`). Una pantalla con su propio botón flotante abajo a la
  derecha llama a `useFabDePagina()` (`help/HelpProvider.tsx`) y Confibot se apila arriba. Token nuevo
  `dash-blue-glow`. Storybook: *Components / Help / Confibot*.

### Menú lateral en blanco ([#38](https://github.com/JulianGerardi/red-dental-studio/pull/38))
- El fondo del menú lateral pasa de gris (`#fafafa`) a **blanco**, en escritorio y en el panel del celular. El bloque del
  logo sigue azul; hover, ítem activo y menús flotantes no cambian.
- **Para el dev:** el `aside` de `Sidebar.tsx` usa `bg-white` en lugar de `bg-surface-subtle` (el token sigue en uso en
  otros lados). En *Elements / Navigation → Specs → Colors*.

### Edit Carrier: las dos casillas en la misma fila ([#32](https://github.com/JulianGerardi/red-dental-studio/pull/32))
- En Edit Carrier › *Information*, *Do not include Dental Diagnostic Codes* y *Do not bill Insurance* van lado a lado, cada
  una bajo una de las columnas de arriba (en el celular, apiladas). El drawer New Carrier no cambia.
- **Para el dev:** en una página con campos de a dos, las casillas van en el mismo `grid gap-4 sm:grid-cols-2`; en los
  drawers siguen apiladas.

### Listas largas con "Show more" y scroll: Dashboard, Patient Dashboard y Treatments ([#29](https://github.com/JulianGerardi/red-dental-studio/pull/29))
- Con muchas cards o mucha información se ven unos pocos y **"Show N more" abre el resto con scroll adentro**, sin
  estirar la página; "Show less" vuelve. Dashboard: 5 turnos, 5 en espera, 6 salas y 5 tareas. Patient Dashboard: 3
  tareas, 3 turnos y 4 documentos pendientes. Treatments: 4 planes. Con un día real (`?day=busy`) el Dashboard pasa de
  10.614px a 1.381px de alto.
- Turnos, sala de espera y tareas van en **filas** en lugar de las cards grandes, con el mismo contenido (TR, CC, Check
  In, Check Out o Cancel, Edit appointment; Requested, documento, Expired date, fechas, Complete this Task) y la hora en
  la caja gris de la card. Documents Manager toma el encabezado de las tablas por defecto (buscador de 36px con Search) y
  Last Update a la izquierda.
- **Para el dev:** componentes nuevos `ui/show-more` (`ShowMore`, *Elements / Show more*), `ui/list-group`
  (`ListGroup`, filas en caja con el tope) y `dashboard/DashboardRows` (`AppointmentRow`, `TaskRow`); usarlos para toda
  lista larga en vez de apilar cards. La acción del pie de la card de turno es `accionTurno` y la de la tarea
  `completarTarea` (card y fila hacen lo mismo). `SettingsPageHeader` acepta ir sin `bajada`. `DIA_CARGADO` en
  `dashboard-data.ts` (`?day=busy`). Dos reglas nuevas en `CLAUDE.md`: listas largas y "rediseñar no es cambiar el
  contenido".

## 2026-10-12

### Appointments del Patient Dashboard y solicitudes de Scheduling: una sola card ([#27](https://github.com/JulianGerardi/red-dental-studio/pull/27))
- Los turnos del Patient Dashboard recuperan la barra de 3px a la izquierda que tienen las solicitudes de *Appointment
  requests*, y las dos cards pasan a ser la misma: barra y pill del mismo color (Booked azul, Fulfilled verde, No Show
  ámbar, Cancelled rojo; ASAP rojo, lista de espera azul), avatar, nombre de hasta dos renglones y acciones con
  `ui/button` sm. El panel de solicitudes pasa a 280px, el ancho de la columna Appointments del paciente.
- **Para el dev:** componente nuevo `components/scheduling/TarjetaTurno.tsx` (`TarjetaTurno`, `BARRA_TONOS`), base de
  `PatientAppointmentCard` y `SolicitudCard`; no armar otra card de turno a mano. La solicitud deja la pill y los botones
  con hex en `style`. En *Elements / Appointment cards* y *Components / Scheduling / TarjetaTurno*.

### Fecha del Dashboard alineada con el filtro de Notifications ([#28](https://github.com/JulianGerardi/red-dental-studio/pull/28))
- El selector de fecha del Dashboard y el filtro de Notifications comparten campo y calendario. El Dashboard muestra
  "Feb 28, 2026" (antes 28-02-2026), con texto medium, hover gris y anillo de foco; los formularios siguen en dd-mm-aaaa.
  El `DatePicker` usa el popover de Radix (Escape, foco de vuelta al campo, se da vuelta si no entra) y hoy se marca en
  azul y negrita en los dos calendarios.
- **Para el dev:** `MonthCalendar` es el calendario de toda la app (no armar uno a mano); `fechaTriggerClasses` el campo.
  `DatePicker` suma `variant="toolbar"` para la fecha de una pantalla; `field` sigue por defecto en formularios. Los días
  llevan `aria-label` con la fecha completa. Página *Components / UI / DatePicker* con la estructura completa.

### Notifications: filtro de fecha y grupos por mes ([#26](https://github.com/JulianGerardi/red-dental-studio/pull/26))
- Con muchas notificaciones, un campo de fecha junto a las pestañas: un clic filtra un día, el segundo arma un rango;
  atajos (Today, Yesterday, Last 7/30/90 days), punto en los días con notificaciones y la ✕ para sacarlo. Las fechas
  acotan las pestañas, la lista y las acciones en lote; sin resultados, el vacío ofrece *Clear dates*. Lo de más de una
  semana se agrupa por mes, y Today / Yesterday / This week cuentan días de calendario.
- **Para el dev:** componente nuevo `ui/date-filter` (`DateFilter`, `DateFilterPanel`), en *Elements / Date filter*;
  usarlo para filtrar listas por fecha (el `DatePicker` sigue para campos de formulario). `grupoDe` devuelve un string
  (grupos por mes) y hay `fechaDe` / `diasAtras` en `data/notificaciones.ts`; el store suma `HISTORIAL` (datos de
  ejemplo). El `Token` del kit ya lee bien `primary` y `accent`.

## 2026-10-10

### Sombras más suaves (cards y pop ups) y Today Appointments con sombra ([#25](https://github.com/JulianGerardi/red-dental-studio/pull/25))
- Arreglo: en escritorio el panel *Today Appointments* de Patients se veía sin sombra. La barra lateral que lo envuelve
  tenía `overflow-hidden` y le recortaba la sombra; ahora se ve igual que los paneles del Dashboard. El alto sigue topado
  al de la tabla y la lista de turnos scrollea adentro, como antes.
- Sombras más suaves, en dos alturas. Las cards madre (paneles, cards de las pantallas del paciente, Settings, Clinical
  Mode, Billing y los números del Dashboard) quedan casi planas: sólo una sombra de contacto que marca el canto, en vez
  del halo gris al 25%. Los pop ups que flotan sobre la pantalla (el detalle del paciente de la card de turno, el
  selector de locación, filtros, Appointment requests, Patient in session, los flotantes de Clinical Mode, Confibot y
  CoachMark) llevan una sombra propia, un poco más alta, igual para todos.
- **Para el dev:** `--shadow-panel` cambia de valor, `shadow-stat` se borra (`StatCard` y `StatStrip` usan
  `shadow-panel`) y hay un token nuevo, `shadow-floating`, para los pop ups flotantes. Card madre: `shadow-panel` /
  `TARJETA_PANEL`; pop up flotante: `shadow-floating`; nunca una sombra a mano. Regla nueva en
  *Elements / Cards → Specs* (*Shadow room*): una card no va dentro de un contenedor con `overflow-hidden`; para topar el
  alto, el scroll va adentro de la card.

### Drawers: campos de a dos y del mismo ancho, Post payment y New Carrier ([#24](https://github.com/JulianGerardi/red-dental-studio/pull/24))
- Regla de Julián para toda la app: en los drawers los campos van de a dos y del mismo ancho. Post payment ordenado
  (fecha y monto, tipo y a quién se aplica) y más ancho, para que Ledger Transactions entre entera; la tabla sin ícono.
  New Carrier con las dos casillas una debajo de la otra. La regla se aplicó en unos 20 drawers y en los formularios del
  Ledger (cuatro columnas iguales, títulos sin ícono).
- **Para el dev:** `grid gap-4 sm:grid-cols-2` y cada campo llena su celda; nada de anchos fijos, `flex-wrap` ni tres por
  fila. Sólo Notes y la búsqueda de paciente o persona van a lo ancho. Casillas apiladas, `FieldLabel` y `control()`.
  `ui/drawer` suma `2xl` (1000px). Nuevo `npm run ds:campos` (con Storybook andando) mide los campos de todos los
  drawers. `data/clinicalItems.ts` pierde `ancho: 'full'`. Regla en *Components / UI / Drawer → Specs → Fields*.

## 2026-10-09

### Chips con la ✕ a la derecha en todo el sistema ([#23](https://github.com/JulianGerardi/red-dental-studio/pull/23))
- *Selected area* de New Procedure y de New Condition (Radiography) y las franjas de Working Hours de Locations pasan al
  `Chip` del design system: celeste, texto azul y la ✕ a la derecha (antes a la izquierda, con tamaños y azules
  distintos). El *+N* de Working Hours toma el mismo alto y color.
- **Para el dev:** regla nueva, la ✕ de un chip va siempre a la derecha; usar `ui/chip` y no armar chips a mano. No hay
  cambios de datos ni de comportamiento.

### Selects que se abren dentro de una tabla y Chip del design system ([#22](https://github.com/JulianGerardi/red-dental-studio/pull/22))
- Arreglo: en Fee Schedule By Location, Coordination Of Benefits y Deductible Type de las coverage tables la lista del
  select quedaba escondida (el marco de la tabla recortaba lo que sobresalía). Ahora se abre por encima.
- Chip nuevo para lo elegido que se puede sacar (celeste, texto azul, ✕ a la derecha): lo usan los procedimientos de
  Manage Exceptions (antes gris), los códigos de Consents y los filtros de Treatment.
- **Para el dev:** `TABLA_MARCO` ya no lleva `overflow-hidden` (las esquinas las redondean `TABLA_ENCABEZADO` y la última
  `TABLA_FILA`); no volver a recortar una tabla con selects adentro. Componente nuevo `ui/chip` (`Chip`, con `onRemove` y
  `removeLabel`), en *Elements / Chips*.

### Settings → Billing igual a red.dev: Fee Schedules, Carriers y Coverage Table ([#18](https://github.com/JulianGerardi/red-dental-studio/pull/18))
- Billing se rehízo desde `red.dev` (lógica, pantallas, campos y textos; estilo nuestro): Carriers → Edit Carrier
  (*Information* | *Insurance Plans / Employers*) → la página del plan con siete pestañas; Fee Schedules con versiones,
  Copy form y Bulk Edit; Coverage Table como plantillas con rangos y excepciones (asistente de 4 pasos).
- Correcciones de Julián: Fee Schedules es una tabla (Name, Type, Assignments, Effective, Last updated, Status, Actions:
  Edit, View assignments, Compare fees); *Non-zero fees — n / 26* en el editor; Bulk Edit sobre las filas tildadas;
  *Information* primero en todas las pestañas. Sin portada: `/settings/finance` redirige a Fee Schedules.
- **Para el dev:** datos nuevos en `data/finanzas.ts` (Arancel con `versiones`, `tipo`, `actualizado`, `asignados`;
  PlanSeguro con las siete secciones; TablaCobertura con `excepciones`) y store `data/finanzasStore.tsx`. Rutas
  `…/:id/edit` como red.dev (`/:id` redirige). Componentes en `components/finance/` (fields, RangesTable, MasterList,
  PlanFields, Assignments, CompareFeesDrawer y seis drawers); salieron CoverageBar, CoverageSummary, EditableAmount,
  PlansTable y los drawers viejos. `TextField` / `SelectField` suman `hideLabel`; `control()` se exporta. Relevamiento
  y anomalías en `design-reference/red-dev/settings-billing/` y `figma/modulos/settings-billing.md`.
- Segunda vuelta: breadcrumbs de Billing como el resto de Settings (sin *Edit*, el último no es link); Manage Exceptions
  ordenado y sin título repetido; Add Range avisa con un toast y lleva a la fila nueva; drawers sin títulos de sección que
  repitan el rótulo; **patrón único de tablas** en toda la app.
- **Para el dev (tablas):** usar `TABLA_MARCO`, `TABLA_ENCABEZADO`, `TABLA_FILA`, `TABLA_TEXTO` y `TABLA_LINK` de
  `lib/estilos.ts` en cualquier tabla; azul sólo para links, nada de `font-medium`/`text-ink` en celdas. `AmountCell` ya no
  es Medium; no usar `TextCell strong` en la app. `RangesTable` suma `nuevo` y `ExceptionsDrawer` suma `tabla`.

### Billing: cards como en Patients y la vista de un paciente ([#21](https://github.com/JulianGerardi/red-dental-studio/pull/21))
- Recent Billing Activity, Find Patient y Today son `Panel` (título sin ícono); los resultados de Find Patient y los
  números adentro de un panel son `InnerCard`.
- Elegir un paciente (fila o Find Patient) abre su vista: su card arriba de Find Patient (con animación), su nombre en
  el título, sólo sus movimientos, Patient View / Guarantor View y los botones de pago, que sin paciente no se ven. La
  X vuelve al resumen.
- Cada número de arriba y de Today tiene su círculo de info con el texto de red.dev. *Patient A/R* pasa a *Guarantor
  A/R* y *Patients with Open Balance* a *Guarantors with Open Charges*, como red.dev.
- **Para el dev:** componente nuevo `ui/info-tip` (`InfoTip`, sobre `HoverCard`); `Stat` acepta `info` y
  `StatBilling` también. `Panel` suma `top` y su encabezado pasa a `min-h-[52px] py-2 flex-wrap` (Dashboard y Patients no
  cambian). `PacienteBilling` suma `garante`; `grupoDeGarante()` y `VISTAS_PACIENTE` en `data/billing.ts`. `Billing.tsx`
  exporta `EncabezadoBilling`, `PacienteElegido`, `ResultadoPaciente`, `BuscarPaciente`, `ActividadReciente` y
  `Stat interna`. Animación `paciente-entra` en `index.css`. E2E nuevo: `tests/billing.e2e.ts`.

### Clinical Mode: View Problem List con lugar para toda la tabla ([#19](https://github.com/JulianGerardi/red-dental-studio/pull/19))
- El flotante de *View Problem List* de los exámenes pasa de 820px a **hasta 1240px**: desde 1024px la tabla entra
  entera (Status y Actions). Con una fila abierta llega hasta el borde de abajo y scrollea adentro; antes se salía de
  la pantalla.
- **Para el dev:** sólo cambia el `PopoverContent` de `clinical/ExamLayout.tsx` (ancho, `max-h` con
  `--radix-popover-content-available-height`, `overflow-y-auto` y `collisionPadding`). Storybook: *ExamLayout* suma
  *Problem list open*, *Problem list · row open* y Specs.

### Dashboard: Today a la altura del selector de fecha ([#20](https://github.com/JulianGerardi/red-dental-studio/pull/20))
- Today pasa a `Button` secondary md (32px, como el `DatePicker`); antes iba a mano en 36px y quedaba desalineado.
- La fila de fecha vive en `FiltroFecha` (exportado de `src/pages/Dashboard.tsx`). *Pages / Parts / Dashboard* pasa a
  Playground, Parts, States y Specs.
- **Para el dev:** un botón al lado de un input de 32px va en `md`, nunca un `<button>` a mano con `h-9`.

## 2026-10-08

### Clinical Mode: Lab Order con la tabla, el buscador, el filtro y los botones de la app ([#17](https://github.com/JulianGerardi/red-dental-studio/pull/17))
- Lab Order deja su tabla propia y usa la de la app (`DataTable`) en la card de la página: buscador, Filter que filtra
  por estado (con cantidad y color), *View History* y *New Prescription* con `ui/button`, el kebab estándar (*View
  order*, *Edit order*, *Cancel order* con Undo) y el pie con *Show* y paginación.
- **Para el dev:** `LabOrderPanel` recibe `ordenes` opcional. En `DataTable`, `filter.options` acepta `FilterOption`
  (cantidad y tono); los strings siguen andando. Ya no hay `FilterTrigger` suelto en Lab Order.

### Link de prueba general y rol de product designer ([#16](https://github.com/JulianGerardi/red-dental-studio/pull/16))
- Cada push a una rama que no sea `main` se publica en https://juliangerardi.github.io/red-dental-studio/prueba/ (app)
  y `/prueba/storybook/`, para ver los cambios antes de "subilo". Muestra sólo la última rama subida;
  `/prueba/version.txt` dice cuál. Publicar `main` ya no borra `/prueba` y escribe `/version.txt` con su commit.
- `CLAUDE.md`: las sesiones actúan como product designer senior, UX/UI y UX researcher.
- **Para el dev:** workflow nuevo `.github/workflows/deploy-preview.yml`; los dos deploys comparten `gh-pages` y el de
  prueba sólo toca `prueba/`.

### Clinical Mode: el detalle de la fila pasa de cards a lista ([#15](https://github.com/JulianGerardi/red-dental-studio/pull/15))
- El detalle desplegable de Problem List / Procedures deja las cards: es una lista de filas (título a la izquierda, datos
  a la derecha, una línea fina entre filas) en el orden Treatment, Lab order, Referral, Findings / diagnoses y Procedure
  consent; el problema sigue el mismo orden con Procedures y Source exam. Cada dato va en una línea.
- **Para el dev:** en `clinical/RecordDetail.tsx`, `FilaDetalle` reemplaza a `BloqueDetalle` y `SubtituloBloque`, y
  `FilasProcedimiento` / `FilasProblema` a `BloquesProcedimiento` / `BloquesProblema`. Sin cambios de datos ni de
  navegación.

### Clinical Mode: detalle desplegable en Problem List y Procedures ([#14](https://github.com/JulianGerardi/red-dental-studio/pull/14))
- Cada fila de la tabla del Overview se despliega como en el Ledger y muestra caso, visitas y turno, órdenes de
  laboratorio, derivaciones, hallazgos y diagnósticos, consentimiento y examen de origen, con links a cada pantalla.
  *View full record* abre un drawer de sólo lectura.
- **Para el dev:** nuevo `clinical/RecordDetail.tsx` (`DetalleRegistro`, `RegistroCompletoDrawer`, contexto
  `NavegacionClinica` que provee ClinicalMode). `DataTable` suma `defaultExpanded` y el detalle de fila queda en la parte
  visible cuando la tabla scrollea. `TONO_PROBLEMA` / `TONO_PROCEDIMIENTO` pasan a `RecordDetail`. Datos de los vínculos
  en `VINCULOS_PROCEDIMIENTO` y `DERIVACIONES_PROBLEMA` (`data/clinical-mode.ts`).

## 2026-10-07

### Consents: pie en angosto y Storybook con Parts y States ([#13](https://github.com/JulianGerardi/red-dental-studio/pull/13))
- Editor de Consents: el pie fijo hace wrap. En angosto (menos de ~370 px) Cancel y Save bajan juntos a una segunda
  línea y Preview queda solo arriba; antes, a 320 px, Preview quedaba cortado fuera de la pantalla.
- Storybook: *Pages › Parts › Consents* pasa a Playground, Parts, States y Specs (ya no hay historias sueltas); Specs
  corrige los paneles a sombra sin borde. **Para el dev:** sin cambios de API: `EditorTemplate` y `DrawerPreview` reciben
  lo mismo que en #6.

### Patients: estados de la card de Today Appointments ([#12](https://github.com/JulianGerardi/red-dental-studio/pull/12))
- Storybook: *Elements / Appointment cards → Patients list card: states* (kebab hover, menú abierto con Edit y Go to
  appointment, nombre largo y los 10 turnos). El Playground de *Patients list* abre el modal de Edit.
- `RowActionsMenu` suma `abierto` y `AppointmentCardCompacta` suma `menuAbierto`. **Para el dev:** son sólo para las
  stories (dejan el menú a la vista); no usarlas en pantallas. Sin cambios en la app.

### Navigation: comentarios de una línea ([#11](https://github.com/JulianGerardi/red-dental-studio/pull/11))
- `src/design-system/Navigation.stories.tsx`: dos comentarios largos pasan a una línea y apuntan a `design-system.md`.
  Sin cambios en la app ni en Storybook.

### Avisos al dev ([#10](https://github.com/JulianGerardi/red-dental-studio/pull/10))
- Nace este archivo. Desde ahora todo cambio entra por PR (incluidos el CLAUDE.md y la documentación), suma su entrada
  acá y pide revisión a jonatan784 y betsyMb.

### Navigation en Storybook ([#9](https://github.com/JulianGerardi/red-dental-studio/pull/9))
- *Elements / Navigation* pasa a Playground, Parts, States y Specs. Sin cambios en la app.

### Count, el globo de cuenta ([#8](https://github.com/JulianGerardi/red-dental-studio/pull/8))
- Nuevo `src/components/ui/count.tsx`: círculo con un dígito, píldora con dos, 20 px de alto; prop `active` para la
  card azul abierta. **Para el dev:** todo contador nuevo va con `Count`, no con un `<span>` a mano.
- Página *Elements / Counts* en Storybook.

### Sidebar de 176 px ([#7](https://github.com/JulianGerardi/red-dental-studio/pull/7))
- El menú expandido pasa de 234 a 176 px en escritorio (58 colapsado; en el celular sigue en 234).
- Settings ya no desborda el rail: se le sacó el `w-full`.

### Consents: preview en drawer ([#6](https://github.com/JulianGerardi/red-dental-studio/pull/6))
- La pantalla queda en dos columnas (Templates y editor). El preview se abre en un drawer (`DrawerPreview`, lg) desde
  el botón Preview del pie fijo del editor.
- e2e nuevo: `tests/consents.e2e.ts`.

### Contadores de las cards clínicas ([#5](https://github.com/JulianGerardi/red-dental-studio/pull/5))
- Patient Dashboard: los contadores de Allergies, Medical Conditions, Medication y Past Surgery pasan a globo redondo
  (desde #8, con `Count`).

### Patients: editar turnos ([#4](https://github.com/JulianGerardi/red-dental-studio/pull/4))
- Today Appointments muestra los 10 turnos y cada card tiene un kebab con Edit (abre `NewAppointmentModal` con los
  datos cargados) y Go to appointment. `AppointmentCard` suma `onEdit`.
- Se saca el panel Recent Patients.

### CLAUDE.md (directo a `main`, antes de esta regla)
- Instrucciones para las sesiones de Claude: carpeta `~/Desktop/Claude/red-clone`, links de localhost antes de
  publicar, todo documentado en Storybook antes de subir, "subilo" publica todo de una y respuestas en castellano.

## 2026-10-06 (directo a `main`)

### Cards
- Card sobre el fondo de la página: `TARJETA_PANEL` (sombra, **sin borde**). Card adentro de otra: `TARJETA_INTERNA` /
  `InnerCard`, con una línea de 0,5 px dibujada con sombra inset (`shadow-inner-card`). Las dos están en
  `src/lib/estilos.ts`. **Para el dev:** no usar `border` en cards; tablas y la grilla del calendario sí lo mantienen.

### Drawers con pasos
- New Location, New Employee, New Account, Manage Licenses y Add Relationship pasan a `ui/drawer`; las rutas `/new`
  abren el drawer sobre la lista.
- Los pasos muestran su nombre (nunca "Step") y entran con animación. Estado del formulario con `lib/useFormPasos`.

### Clinical
- New Procedure: paso nuevo *Link to diagnosis* para Planned (código y superficie). Surfaces depende del procedimiento
  elegido.
- Treatment Plan: en Planning, Pending y Presented no se muestran ni consentimiento ni turno.
- Treatment plans card: queda la opción A.

### Navegación y títulos
- El ícono de Billing del menú abre Fee Schedules, Carriers y Coverage Tables.
- Títulos de Settings, Confibot y Help con `ui/page-title`. El botón Columns usa el mismo estilo que los filtros
  (`filterTriggerClasses`).
