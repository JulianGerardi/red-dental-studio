# Cambios

Lo último arriba. Cada PR suma su entrada: qué cambió y qué tiene que saber el dev. El porqué de cada decisión está en
`design-reference/figma/modulos/<módulo>.md`; lo anterior al 2026-10-06, en `git log` y en esos mismos archivos.

## 2026-11-26

### Settings › Billing: pestañas entre secciones, atajos desde Settings y breadcrumb coherente (CON-57) ([#PR](https://github.com/JulianGerardi/red-dental-studio/pull/PR))
- **Billing es una pantalla con pestañas**, como Ledger options: `finance/BillingHeader` (título *Billing*, la acción de la
  sección y *Fee schedules · Carriers · Coverage tables*) reemplaza al `SettingsPageHeader` de las tres listas. Las rutas no
  cambian: cada pestaña es la suya.
- **`ui/tabs` › `TabLinks`**: el look de `Tabs` con links y `aria-current`, para pestañas que cambian de pantalla (así las
  frena `useAvisoSalida`). Usá `Tabs` para vistas de un mismo bloque y `TabLinks` para pantallas hermanas.
- **`SettingsSectionCard`** suma `atajos`: links directos a las pantallas de la sección (Settings General los saca de los
  `children` de `settings-nav.ts`; hoy, Billing). Con atajos, la card deja de ser un `<a>` entero: el título estira su área.
- **Breadcrumb** (`pages/Settings.tsx`): las tres pestañas terminan en `Settings / Billing`, también con un ítem elegido;
  lo de adentro cuelga de *Billing* con link a la pestaña de origen (`Settings / Billing / Aetna Dental Plans / Acme Corp`).
  Se va el tramo de la sección.
- Pendiente del design system: `BillingHeader` y `TabLinks` están en `exentos.json` hasta documentarlos en Storybook.

### Settings › Fee schedules con el diseño de Coverage tables (CON-57) ([#202](https://github.com/JulianGerardi/red-dental-studio/pull/202))
- **Una sola pantalla** para `/settings/finance/fee-schedule` y `…/:feeId/edit`: `SettingsFeeSchedules` arma lista y editor
  con `components/settings/ListaEditor` (dos cards, como Coverage tables). Se van la `DataTable` de la entrada y
  `SettingsFeeScheduleEdit`; sin elegido, el editor muestra *No fee schedule selected*.
- **Lista:** `ItemLista` con la pill del estado (`TONO_ARANCEL`) y *Default*. El ⋮: *View assignments*, *Compare fees*,
  *Inactive / Active*, *Archive / Restore*. `ItemLista` suma `estado` (pill que no sea Active / Inactive) y `acciones`
  (reemplaza Deactivate / Delete); `EncabezadoEditor` suma `estado` y `extra`.
- **Editor (`FeeScheduleEditor`):** es su propia card (`TARJETA_EDITOR`) con *Edit fee schedule* + estado; *Copy form* y
  *Bulk edit* encima de la tabla, a la derecha; pie `PieEditor` con *Cancel · Save* a la derecha. `MasterList` queda sin
  uso (sólo su story).

### Dashboard y Scheduling: la navegación de fecha se marca en azul en hoy ([#201](https://github.com/JulianGerardi/red-dental-studio/pull/201))
- **`ui/date-nav` (`DateNav`):** cuando se está viendo hoy, todo el bloque queda activo con el estado de un filtro
  aplicado (`ui/filter-menu`): borde y texto `dash-blue` sobre `info-bg`. Fuera de hoy, el bloque blanco de siempre.
  *Today* ya no se deshabilita: lleva `aria-pressed` y siempre vuelve a `hoy`.
- **Qué cuenta como hoy:** en Day, el mismo día; en Week y Month, si la semana o el mes que se ve incluye `hoy`.
- **Dashboard:** pasa `hoy={HOY_DEMO}` (antes comparaba con la fecha real y Today nunca quedaba en hoy). Scheduling
  sigue con `FECHA_ANCLA`. Si una pantalla nueva usa `DateNav` con datos de demo, pasale su `hoy`.

### Edit procedure: sin overrides del estimado y con un finding y un diagnóstico por defecto (CON-4211) ([#200](https://github.com/JulianGerardi/red-dental-studio/pull/200))
- `ProcedureEstimate` ya no lleva *Insurance estimate overrides*: se saca `override` de `EstimadoProcedimiento` y de
  `resolverEstimado` (`data/estimaciones.ts`). Backend: el estimado guarda sólo el modo (automático o a mano) y los montos.
- *Link findings* y *Link diagnosis* pierden la bajada; si el procedimiento no tiene vínculos, `EditProcedureDrawer` arranca
  con un finding (mismo diente o el primero) y su diagnóstico.

## 2026-11-25

### Clinical Mode: Edit finding / Edit procedure desde las tablas, Estimate y la card del plan (CON-4211, CON-2770) ([#199](https://github.com/JulianGerardi/red-dental-studio/pull/199))
- **El Edit del ⋮ abre los mismos drawers que el examen:** Problem List -> *Edit finding*; Procedures y las filas de
  Treatment Plan (casos y Unassigned) -> *Edit procedure*. Dejá de usar `DialogoEditar` (sólo la nota) ahí: queda sólo en
  `EndEncounterDrawer`. Las filas se pasan a `Finding` con `dental/registroComoFinding.ts` (`findingDeProblema`,
  `findingDeProcedimiento`, `cambiosDe…`); `EditFindingDrawer` suma las props `estado` y `bloqueoEstimado`.
- **Edit finding con un diente:** sólo General information, sin pestañas ni descriptores. Physical y ROS tampoco llevan
  la pestaña Descriptors. Títulos en minúscula inicial: "Edit finding" y "Edit procedure".
- **Edit procedure suma la pestaña Estimate** (`dental/ProcedureEstimate.tsx`): cálculo automático o a mano, y override
  por seguro (Primary / Secondary). Bloqueado fuera de Planning o sin permiso (como Estimate details). Modelo nuevo
  `EstimadoProcedimiento` y `resolverEstimado` en `data/estimaciones.ts`; `Finding.estimado` y `Procedimiento.estimado /
  vinculados / diagnosticos`. **Backend:** guardar el estimado por procedimiento con sus overrides (CON-4211, sin
  descripción en Jira). Pendiente: que Estimate details use los overrides guardados.
- **Card del plan del Overview** (`TreatmentPlanList` › `PlanCard`) con el diseño de la de Treatment Plan de la ficha del
  paciente. `Dato` cambia de caja gris a rótulo + valor con ícono azul. Mismos datos; el Total amount sigue abriendo
  Estimate details.
- Nuevo estado de finding *Referred* (`FindingStatus`, pill violeta).

### Lab order y Referral como Edit account; End Encounter más simple ([#198](https://github.com/JulianGerardi/red-dental-studio/pull/198))
- **Nuevo `clinical/FichaClinica`**: `EncabezadoFicha` (título de pantalla + estado + acciones) y `Adjuntos` (archivos
  PDF/JPG/PNG ≤10MB con lista). `LabOrderDetail` y `ReferralDetail` los usan, con cards apiladas (`settings` `Card`) y
  `FormFooter` abajo a la derecha, como Edit account. Usarlos en toda ficha nueva de Clinical Mode.
- **`settings/primitives` `Card`** suma `action` (control junto al título). Sin cambios para los usos actuales.
- **`EndEncounterDrawer`** (CON-4153): una sola línea de lo hecho por procedimiento (*Procedure completed* reemplaza a
  las fases), sin bajada debajo del título ni texto al pie.

### Locations: Rooms y Exceptions con columnas parejas ([#197](https://github.com/JulianGerardi/red-dental-studio/pull/197))
- `FILA_SALA` y `FILA_EXCEPCION` (`pages/settings/LocationDetail.tsx`): las columnas de datos se reparten el ancho por
  igual y las acciones van al final en 160 px, igual en encabezado y filas. En el celular no cambia nada.

### Mails: cabecera con degradé desde blanco, pie según quién escribe y textos nuevos del Figma ([#196](https://github.com/JulianGerardi/red-dental-studio/pull/196))
- **Cabecera** igual para Confidentally y la clínica: el degradé queda blanco hasta 280 px, así el logo (máx. 240 px) apoya
  siempre sobre blanco; en Outlook la cabecera es blanca. **Pie** según `remitente`: el de Confidentally (copyright,
  dirección, legales) y el de la clínica (nombre, `{{practice_address}}`, "Powered by Confidentally", mail y teléfono,
  legales). Sale el aviso legal largo.
- **Textos de los 16 mails** según el Figma 📧 Email: título, "Hello {{nombre}},", "Questions? Contact …" y "The … team".
  Booked, Confirmed y Canceled sin botón. Vuelve la **contraseña temporal** en Patient, Employee y Guardian invitation.
- **Para el backend, variables nuevas:** `patient_name`, `account_owner_name`, `employee_name`, `guardian_name`,
  `practice_address`, `previous_appointment_date`, `temporary_password`, `document_link`. **Dejan de usarse:** `*_first_name`,
  `set_password_link`, `link_expiration`, `support_contact`, `website_url`. Imágenes nuevas en `public/emails/`:
  `confidentally-mark.png` (pie) y `sample-practice-logo-<color>.png` (pruebas). El detalle va en `emails.json`.
- Bloque `saludo` pasa a `titulo`; `firma` lleva `equipo` en vez de `lineas`; `origen` es `'figma' | 'propuesta'`.
- **Vista previa** (`/emails/`): muestras de color del logo de ejemplo en los mails de la clínica.
- **Figma:** la página 📧 Email documenta la plantilla y los 16 mails (6 flujos, `scripts/figma/flujos/emails.mjs`); la
  ruta de cada pantalla capturada ahora incluye el hash.

### Settings: Roles y Preferences, y arreglos de Fee schedule, Account y Working hours ([#195](https://github.com/JulianGerardi/red-dental-studio/pull/195))
- **Roles** (`/settings/roles`) y **Preferences** (`/settings/preferences`) dejan de ser "Coming soon". Nuevos:
  `data/roles.ts` (permisos por categoría y roles), `settings/PermissionsPicker`, `settings/RoleDrawer`,
  `pages/settings/Roles.tsx`, `pages/settings/Preferences.tsx`. Lógica de CON-3130/3131/3132/3181/3229/3411/4065: roles del
  sistema en sólo lectura; con empleados activos no se desactiva ni se borra. Preferences guarda el formato de fecha en el
  navegador; usarlo en toda la app y el tema oscuro quedan pendientes.
- **Nuevo `lib/useAvisoSalida(sucio)`**: con cambios sin guardar frena los links de la app y la recarga, y pregunta *Are
  you sure you want to leave?*. Lo usa Edit Fee Schedule.
- **Edit Fee Schedule**: tabla con scroll interno, sin casillas (Bulk edit cambia todo; se va *Increase selected*), New fee
  como texto (`MoneyInput comoTexto`), vacío *No procedures available*, Filter de la lista sin selección al entrar.
  `etiquetaVersion`: una versión que no empezó es *Scheduled*.
- **Account**: Subscription history con `DataTable`; sin Cancel/Save en esa pestaña.
- **Working hours**: en *Set working hours* el rango se borra con el tacho; las franjas de la tabla siguen con la ✕.

### Referral: Complete this task abre el detalle ([#194](https://github.com/JulianGerardi/red-dental-studio/pull/194))
- **Nuevo `clinical/ReferralDetail`** (`ReferralDetail`, `ReferralPanel`): *Complete this task* de una Referral abre
  Clinical Mode en `?tab=Referral&task=<id>` con la derivación (CON-2321). Una card como el panel de Treatment plan,
  secciones sin caja, Cancel / Save al pie. Sólo se edita en Pending con encuentro abierto (CON-2323); Procedures sólo
  Planned; nota de 500; adjuntos PDF/JPG/PNG ≤10MB (CON-2322).
- **Nuevo `clinical/NewProviderDrawer`**: General, Address, Phone; el provider nuevo queda elegido (CON-2610).
- **`tareas.accionesDe`**: Referral tiene ⋮ (Pending → Request, Cancel, Delete; Requested → Cancel), también en las filas
  de Pending task. Request pregunta antes (CON-2394). Mock: `PROVEEDORES_DERIVACION`, `DERIVACION_TAREA`.

### End Encounter: procedimientos del turno con fases en orden ([#193](https://github.com/JulianGerardi/red-dental-studio/pull/193))
- **Nuevo `clinical/EndEncounterDrawer`** (CON-4153): *Complete encounter* de Clinical Mode abre el drawer con los
  procedimientos del turno antes de cerrar; sin procedimientos cierra directo. Acción por fila: *Start procedure*,
  *Complete phase N* o *Complete procedure*, siempre la siguiente fase sin registrar (CON-4154, CON-4155). ⋮ en tres
  secciones (CON-4156) y *View execution history* en drawer con la nota de cada encuentro (CON-4158).
- **Nuevo `lib/ejecucion.ts`** (estado y reglas: `accionPrincipal`, `faseDeCierre`, `esAnticipado`) y `data/ejecucion.ts`.
  `ClinicalNoteDialog` suma `onFirmar` (opcional).
- Para backend: completar antes de la última fase actualiza a `FINISHED` la fila de la fase de hoy (no crea otra) y no
  registra fases futuras.

### Lab Order: rediseño del detalle, New Laboratory y la tabla alineada ([#192](https://github.com/JulianGerardi/red-dental-studio/pull/192))
- **`LabOrderDetail`** con otro layout y mismo contenido que red.dev: cabecera *LAB ORDER* + estado, PDF y ⋮; la fecha
  va con ASAP; *Teeth & surface* en su card; *Details* a la derecha; Cancel / Save fijos abajo. Sin íconos decorativos.
  Editable sólo con encuentro abierto **y** la orden en Pending (CON-2218).
- Procedimientos (CON-3904): `SearchPicker` + `FilterMenu`, sólo los elegibles; `ui/search-picker` suma `disabled`.
- **Nuevos `clinical/NewLaboratoryDrawer`** (CON-2285, pasos General · Contact · Address · Credentials) y
  **`clinical/dental/DentalArch`** (arcadas en U con botones). `PROCEDIMIENTOS_ORDEN` en `data/clinical-mode.ts`.
- **`LabOrderPanel`** como las tablas generales: sin card, `SettingsSearch` (*Search lab orders* + Search), botones md,
  *Last update* / *Created date*.

### Billing: el tipo de actividad en pestañas, como red.dev ([#191](https://github.com/JulianGerardi/red-dental-studio/pull/191))
- *Recent billing activity* deja el `FilterMenu`: **All / Payments / Adjustments / Today** van en `ui/tabs` (sm), en la
  fila del título y a la izquierda de *Columns*. Con un paciente, *Patient view / Guarantor view* va en el mismo lugar.
- Los controles pasan de `DataTable` (`toolbarStart` / `actions`) al `controls` del `Panel`. `ActividadReciente` ya no
  recibe `todas`. Accounts sigue con su Filter.

### PDF de la Lab Order con los datos y el diagrama de la boca de red.dev ([#190](https://github.com/JulianGerardi/red-dental-studio/pull/190))
- El PDF de la Lab Order (ícono del documento en Pending task) trae lo de red.dev: Provider, Lab Order ID, Patient
  Phone, Email, Expiration Date; Patient Information, Receiving Laboratory, Provider Information, Dental Work Request y
  **Teeth & Surface Specifications con el diagrama de la boca**. Sin firma (CON-2643).
- **Nuevo `data/laboratorios.ts`** (`LABORATORIOS`, `ARCADAS`, `Denticion`); el select de `LabOrderDetail` lo usa.
- `documentoTarea`: sección `dientes`, `Documento.sinFirma` y `diagramaBoca()` (la geometría que dibujan el PDF y el
  SVG `DiagramaBoca` de `VistaDocumento`). Token nuevo `--color-encia`.

### Pending task: fechas alineadas aunque no haya ⋮ ([#189](https://github.com/JulianGerardi/red-dental-studio/pull/189))
- **`TaskRow`** (Dashboard y Patient Dashboard) reserva siempre el lugar del ⋮ (28 px), como ya hacía con el PDF: la
  Clinical note, que no tiene acciones, ya no corre el vencimiento, el PDF ni *Complete this task* (CON-2643).
- Sin cambios de props, rutas ni datos.

## 2026-11-24

### Visor y hoja de documentos unificados ([#188](https://github.com/JulianGerardi/red-dental-studio/pull/188))
- **Nuevo `ui/document-viewer`** (`DocumentViewer`): todo documento a pantalla completa, nunca en drawer. Back con
  destino, título, estado, View PDF, un aviso y la barra de firma sólo si hay algo que firmar. Lo usan la Clinical note,
  el Procedure consent de Clinical Mode, *View consent* (antes drawer) y el preview de Consent templates.
- **Nuevo `ui/document-sheet`** (`DocumentSheet`): membrete, tipo y título, resumen en tres columnas, secciones
  numeradas, firmas y pie. `ConsentDocument` lo usa (**se va la prop `ancho`**) y la Clinical note también.
  **Se borra `settings/HojaConsentimientoPdf`**. `CLINICA` y `MEMBRETE` en `data/clinica.ts`.
- **PDF de la Clinical note** (`pdfDeDocumento`) con el mismo diseño. Para backend: es el formato de referencia del PDF.

### Ledger options, New template y la fecha de Dashboard y Scheduling ([#187](https://github.com/JulianGerardi/red-dental-studio/pull/187))
- **Nuevo `ui/date-nav` (`DateNav`):** ‹ Today › + período con calendario, en un solo bloque. Props `value`, `onChange`,
  `periodo` (`day` · `week` · `month`), `hoy`, `marked`, `tour`. Lo usan Dashboard (un día) y Scheduling (su vista).
  **Dejar de usar** `DatePicker variant="toolbar"` + el botón *Today* aparte en esas pantallas.
- **Scheduling:** la fecha a la izquierda; *Day / Week / Month*, *Status legend* y *Filter* a la derecha.
- **Ledger options:** pestañas arriba y debajo el buscador y el Filter de la lista (Direction + Impact para Adjustment
  types; Method type para Payment methods). Name y Description se reparten el ancho.
- **Consents:** el editor nuevo dice *New template*.

### Consents: search, pestañas y Preview a pantalla completa como red.dev ([#186](https://github.com/JulianGerardi/red-dental-studio/pull/186))
- **Pestañas Active · System · All** debajo del buscador (reemplazan el Filter); buscadores con X (`PanelLista`, también
  en Coverage). *Search procedure* abre la lista al hacer foco, filtra, X y *No results found.*
- **Preview a pantalla completa** (CON-4094): `PreviewPaciente` **reemplaza a `DrawerPreview`**; *Back to editing*,
  *Patient View - título*, aviso de cambios sin guardar. Sin toggle *Patient view* ni *Save* en el preview.
- **Nuevo `settings/HojaConsentimientoPdf`**: la hoja con el formato del PDF de red.dev (datos de ejemplo). `Filtro` pasa
  a `'Active' | 'System' | 'All'`; `ListaTemplates` ya no recibe `todos`.

### Coverage tables y Consents con el mismo patrón de lista + editor ([#185](https://github.com/JulianGerardi/red-dental-studio/pull/185))
- **Nuevo `settings/ListaEditor`:** `PanelLista`, `ItemLista`, `EncabezadoEditor`, `PieEditor`, `GRILLA_LISTA_EDITOR`,
  `TARJETA_EDITOR`. Lista de 340 px + editor en dos cards; ⋮ con Activate/Deactivate y Delete (con confirmación); pie
  fijo con Cancel · Save. Va dentro de un `@container`. `MasterList` queda sólo para Fee schedules.
- **Coverage:** pestañas Percentage / Copayment (reemplazan el select), `TablaCobertura.activo?` (propuesta, sin
  historia; no filtra *Copy from template*), *Exc* → *Exceptions* y valores a la derecha (`TextField numero`).
  `RangesTable` arma columnas según el ancho de la tabla (`@3xl` de contenedor), sin scroll horizontal.
- **Consents:** sin switch ni *Deactivate template*; Deactivate confirma con los procedimientos (CON-3719), Activate
  valida que no haya otro template activo para el procedimiento (CON-3725), System bloqueado. Preview en drawer `2xl`
  con la hoja a 820 px. Delete de templates es propuesta: **CON-1484 está cancelada**.

### Billing: la columna derecha termina con la tabla ([#184](https://github.com/JulianGerardi/red-dental-studio/pull/184))
- **Find patient** sin alto fijo: los pacientes enteros que entran (mínimo tres) y *Show N more* pegado a la última
  fila. **Today** (`lg:flex-1`) termina donde termina la tabla y muestra siempre sus tres cards.
- **`ui/stat-card`:** prop nueva `filaSiNoEntra`: dentro de un contenedor `[container:hoy/size]` de menos de 340px de
  alto, la card pasa a una fila (ícono, rótulo, ⓘ y valor a la derecha).
- **`Billing.tsx`:** `usePacientesQueEntran` mide la columna izquierda (`lg:self-start`) y calcula cuántos pacientes
  entran; `BuscarPaciente` recibe `filas`. Find patient deja `llenarAlto` y los 440px fijos.
- **Todas las tablas:** el pie de `DataTable` queda fijo al ancho visible (en el celular se escondía en el scroll).

### Tablas estandarizadas v2: pie, alineación, fechas, Tooth/Surface y avatar ([#183](https://github.com/JulianGerardi/red-dental-studio/pull/183))
- **Pie de toda tabla:** "Showing 1 to 10 of N results" (siempre *results*), *Rows per page* 10 / 25 / 50 a la derecha
  con el paginador (sólo con más de una página). Todas arrancan en 10 filas.
- **`ui/data-table`:** nuevos `PieTabla`, `usePaginas` (tablas propias: Ledger, Treatment plan) y `FILAS_POR_PAGINA`.
  **Dejar de usar `itemLabel` y `pageSizeLabel`** (se fueron); `pageSizeOptions` tiene default `[10, 25, 50]`.
- **Alineación:** cantidades e importes a la derecha (`align: 'right'` suma `pr-3`), *Actions* a la derecha, toggles a la
  izquierda. *Assignments* (Fee schedules) a la izquierda: es un link.
- **Fechas:** *Created date* en Problem list, Procedures y Treatment plan; MM/DD/YYYY en todas (`fechaDMA` → `fechaMDA`).
- **Treatment plan:** *Created date, Location, Tooth, Surface*; Unassigned paginado. Avatar sólo en Patients y Employees.
- Employees y Locations: el nombre es link a la ficha. Fee schedules: el Filter arranca vacío. Ledger options usa
  `DataTable`. Detalle en `design-reference/figma/README.md` (2026-11-24).

### Métricas unificadas: estructura v3 con el estilo de la app ([#182](https://github.com/JulianGerardi/red-dental-studio/pull/182))
- **Todas las métricas** (Billing, Ledger, Edit account → Subscription y Dashboard): ícono en caja celeste, rótulo en
  sentence case, ⓘ en todas y **sin bajada**: lo que decía la bajada pasa al ⓘ.
- **`ui/stat-card`:** props `label`, `value`, `info`, `icon`, `interna` (InnerCard adentro de un panel, como Today de
  Billing) y `enFila`. **Dejar de usar `caption` y `compacta`** (se fueron). Card con sombra y sin borde (`TARJETA_PANEL`).
- **`StatStrip` (Dashboard):** en celular las métricas se apilan una por fila con el ⓘ a la derecha; desde 768px, en fila.
- **Textos y valores:** *Expires on* (era *Expired on*), Licenses "3 / 170 used", ⓘ nuevos de Today y del Dashboard.
  Total A/R es la suma de Guarantor A/R + Insurance A/R ($17,297.96).
- **Open encounters (CON-2813):** Planned, In Progress, On Hold, Completed y Discharged, sin Fulfilled, de cualquier día;
  el mock todavía da un número por día. Appointments sin canceladas (CON-3912); Waiting room: Checked in, On hold y Ready
  to check out (CON-4178).

### Patient Dashboard: pestañas de vuelta en la fila del título y sin "N to resolve" ([#181](https://github.com/JulianGerardi/red-dental-studio/pull/181))
- Pending task y Pending documents vuelven a tener las pestañas a la derecha del título, como el Dashboard (se deshace
  lo del #180 en esta pantalla).
- Pending documents ya no muestra la pastilla "N to resolve": las pestañas dicen cuántos hay por grupo.
- **Para el dev:** sólo layout, en `PatientDetail.tsx` y `patients/PendingDocuments.tsx`. Decisión en
  `modulos/patient-dashboard.md` (2026-11-24).

### Pending task con Filter por provider; pestañas de Pending documents debajo del título ([#180](https://github.com/JulianGerardi/red-dental-studio/pull/180))
- **Dashboard · Pending task:** las pestañas siguen a la derecha del título y suman un Filter por provider al lado
  (cada provider ve sus tareas). Las cantidades de las pestañas son las del provider elegido; si no queda nada, "No
  results match your filters".
- **Patient Dashboard:** las pestañas de Pending task y de Pending documents van debajo del título, a la izquierda; "N to
  resolve" a la derecha, a la altura del título.
- **Para el dev:** el filtro usa `PendingTask.provider` (`FilterMenu` sm, varias opciones). Decisiones en
  `modulos/dashboard.md` (2026-11-24) y `patient-dashboard.md` (2026-11-20).

## 2026-11-20

### Acciones al lado del título, pestañas a la izquierda, botones "Add" y Clinical practitioner ([#179](https://github.com/JulianGerardi/red-dental-studio/pull/179))
- **Regla:** al lado del título van sólo las acciones; las pestañas van a la izquierda de su barra y filtros, fecha y
  Columns en la otra punta. Scheduling: Day / Week / Month a la izquierda; fecha, Today, Status legend y Filter juntos a
  la derecha. Ledger del paciente: Patient view / Guarantor view en la barra de la tabla, a la izquierda. Billing: igual
  con paciente; sin paciente, Filter al lado de Columns. Ledger options: Adjustment types / Payment methods en pestañas
  debajo del buscador (salieron del Filter).
- **Scheduling:** *View* usa `FilterTrigger` (blanco, ícono y "Filter"), sin contador porque la grilla todavía no filtra.
  Texto del calendario en `ink` (horas, días, números; hoy sigue en azul) y Status legend en `ink`.
- **Employees (CON-4085, CON-3542):** sin casillas; *Provider* pasa a *Clinical practitioner* (columna, interruptor
  *Is clinical practitioner* y *Disable clinical practitioner* en el ⋮). "Credentials expired" debajo del Yes
  (`Empleado.credencialesVencidas`).
- **Botones:** los "Add" que eran links azules pasan a `ui/button` (Add new hour, Add role, Add exception en primario;
  Add credential, Add another time range, Add new subscription, Add new en secundario). Consent templates: *New
  template* en la fila del título (`ListaTemplates` ya no recibe `onNuevo`). El salto por letra de Billing profile con el
  color de `Tabs`.
- **Exceptions (Location):** mismo diseño que Rooms: caja con encabezado, filas, estado en `Pill`, *Edit exception*.
- **Para el dev:** `DataTable` suma `toolbarStart` (al principio de su barra; Billing pone ahí las pestañas para no
  tener dos barras). Decisiones en `modulos/scheduling.md`, `employees.md`, `settings-ledger.md`, `ledger.md`,
  `billing.md`, `consents.md`, `locations.md` y `billing-profile.md` (2026-11-20).

### Pending Task con funcionalidad, como red.dev ([#178](https://github.com/JulianGerardi/red-dental-studio/pull/178))
- **Complete this task:** Lab order, Prescription y Referral abren Clinical Mode en su pestaña (`?tab=…&task=<id>`); la
  Lab order entra a `clinical/LabOrderDetail`, en *Read-only mode* sin encuentro abierto. La Clinical note abre
  `pages/ClinicalNote` (`/patients/:id/clinical-note/:noteId`): Back to history, View PDF y Sign clinical note con login.
- **⋮:** Lab order con Edit, Request, Cancel, Delete; Prescription con Activate, Cancel. Sin encuentro abierto (In
  progress u On hold), apagadas con tooltip.
- **PDF:** formato de red.dev (Dental Clinical Note), en otra pestaña. `dashboard/documentoTarea.ts` arma el contenido y
  el PDF a mano; con backend lo genera el servidor.
- **Para el dev:** lógica en `dashboard/tareas.tsx` (`useAccionesTarea`, `useTareasVivas`, `MenuTarea`). `PendingTask`
  suma `id`, `patientId`, `provider`, `pdf`; `TaskRow` y `PendingTaskList` suman `encuentroAbierto`, `onAccion`, `hoy`;
  `LabOrderPanel` suma `tarea` y `encuentroAbierto`. Decisiones en `modulos/dashboard.md` y `clinical-mode.md`
  (2026-11-20).

### Dashboard: "Show N more" al pie del panel, alineado entre columnas ([#177](https://github.com/JulianGerardi/red-dental-studio/pull/177))
- Appointments y Waiting room muestran "Show N more" a la misma altura, al pie de cada panel (Figma Flows `509:81656`);
  antes iba pegado a la última fila y en Waiting room caía 45 px más arriba.
- **Para el dev:** `ShowMore` y `ListGroup` suman `alPie` (botón al pie con `mt-auto`; el panel tiene que dar alto con
  `flex-1`). Sin la prop no cambia nada. Decisión en `modulos/dashboard.md` (2026-11-20).

### Normalización de UI: tamaños, buscador único, sentence case, columnas Name, Account única y métricas compactas ([#176](https://github.com/JulianGerardi/red-dental-studio/pull/176))
- **Tamaños:** `Button`, `FilterMenu`, `SearchInput` y `SearchButton` comparten sm 28 · md 32 · lg 36. Nivel de página
  en `md` (acción del título, buscador, filtro, fecha); dentro de una card en `sm`; campos de formulario en 36.
- **Buscador:** `ui/search-input` nuevo (`size`, `clearable`); `SettingsSearch` lo usa. Placeholders "Search <lo que
  lista>". No escribir buscadores a mano.
- **Textos en sentence case** en toda la app (títulos, botones, pestañas, columnas, labels, estados). Siglas, nombres
  propios, Clinical Mode y los catálogos de datos (tipos de pago y ajuste, lugares de servicio, nombres de documentos)
  quedan igual. Typos del Figma corregidos: Address, Last name, Subscription, Abbreviation, Overview.
- **Tablas:** la columna identificadora se llama Name; Date of birth, Rooms, Address, Provider; Enabled en Ledger options;
  cabeceras sin mayúsculas; Subscriber de Insurance como link (`TABLA_LINK`).
- **Settings → Account** abre Edit account: una clínica ve sólo su cuenta. `/settings/accounts` redirige.
- **Dashboard:** bloque de métricas compacto; la definición de cada número va en un ⓘ.
- **Para el dev:** `PageTitle` mide 32 de alto; `PADDING_PAGINA` para Settings; títulos de card 15/700 y de sección
  14/700 en `ink` (fuera `text-black`); piso de 11 px; sin `-[#hex]` en clases (tokens nuevos `info-subtle`,
  `info-strong-bg`, `info-line`, `info-line-strong`, `amber-hover`, `amber-fg`, `status-ok-hover`); formularios de a
  dos también en pantallas; `AREA_TOQUE` para botones de ícono. Reglas en `design-reference/figma/README.md`
  (2026-11-20).

### Settings con los tamaños del Ledger y Billing ([#175](https://github.com/JulianGerardi/red-dental-studio/pull/175))
- **Edit Account › Subscription:** *Subscription Summary* y *Subscription History* pasan de 16 a 15px bold, como los
  títulos de Billing. Las cards ya eran `ui/stat-card`, iguales a las del Ledger y Billing.
- **Pestañas de las pantallas de edición de Settings** (Account, Location, Employee, Carriers, Insurance
  Plan): `Tabs size="sm"` (28px).
- **`FormFooter`:** Cancel / Save de 36 a 32px en una pantalla (Settings, Edit Patient, Insurance). En un drawer siguen en
  36px, como `DrawerActions`: lo fija `ModalShell` con `[&_[data-form-footer]_button]:h-9`.
- Decisiones en `modulos/settings-accounts.md` (2026-11-20).

### Filtros: un solo diseño, el de Accounts, y sin puntos de color ([#174](https://github.com/JulianGerardi/red-dental-studio/pull/174))
- **Patrón:** buscador → Search → Filter.
  - El buscador es `settings/SettingsSearch` (36 px): Accounts, Locations, Employees, Ledger Options y Patients ya no lo
    escriben a mano.
  - El Filter es `ui/filter-menu`.
- **Pestañas y select pasan al Filter:**
  - **Ledger Options:** grupos *View* y *Type*.
  - **Billing:** *Type*, `sm`, al lado de Columns.
  - **Consents:** *Status*, con Active por defecto.
- **Para el dev:**
  - `FilterOption` ya no acepta `tone`: ningún filtro lleva puntos de color.
  - `SettingsSearch` suma `tour`.
  - `ActividadReciente` suma `todas` y `ListaTemplates` suma `todos`, para las cantidades.
  - Las pestañas que cambian de vista y el `DateFilter` no cambian.
  - Decisiones en `modulos/settings-accounts.md` (2026-11-20).

### Ledger: sin Export statement en la barra de la tabla ([#173](https://github.com/JulianGerardi/red-dental-studio/pull/173))
- Sale el botón de descargar (*Export statement*) de la barra de la tabla del Ledger: no está en red.dev (en Billing ya
  había salido). La barra queda con Expand / Collapse all y Columns. Decisión en `modulos/ledger.md` (2026-11-20).

### Drawers del Ledger y Billing: campos en fila y el desplegable de Apply to como red.dev (CON-3738, CON-3739, CON-3735) ([#172](https://github.com/JulianGerardi/red-dental-studio/pull/172))
- **Campos en fila:**
  - **Crédito:** fecha, Apply to, Adjustment type y Amount en una fila.
  - **Charge:** tres por fila.
  - **Pago:** fecha y Apply to en dos de cuatro columnas; cada método en su caja gris, con todos sus campos en fila.
  - De a dos en una card angosta y de a uno en el celular.
- **Apply to:** cada opción con su cuadradito de ícono (`Building2` para la cuenta del guarantor, `User` para una
  persona), nombre y rol; la elegida con borde `dash-blue`, fondo `info-bg` y ✓.
- **Para el dev:**
  - `FILA` en `ledger/formulario` da la grilla según la cantidad de campos, con container queries sobre la card
    (`@container`).
  - Excepción a los campos de a dos de los drawers: `ds:campos` saltea los que tienen `data-campos="fila"`.
  - Decisiones en `modulos/ledger.md` (2026-11-20).

### Drawers del Ledger y Billing contra el video de red.dev (CON-3738, CON-3739, CON-3735) ([#171](https://github.com/JulianGerardi/red-dental-studio/pull/171))
- **Sin ícono ni plegado** en el título de la card. `SeccionLedger` pierde la prop `caja`: siempre es una card con
  título, también en Credit y Charge Adjustment, que antes no lo mostraban.
- **Sin transacciones abiertas:** Patient Payment no muestra los métodos y Save se apaga; Credit Adjustment también
  apaga Save. La tabla dice *No open transactions.*
- **Patient Payment:** cambiar Apply to con un solo método pone el saldo abierto del nuevo alcance; el método que suma
  el + arranca en Check Payment con 0.00.
- **Credit Adjustment en una sola página** (sin Adjustment → Allocation). *Adjustment type* arranca vacío
  ("Select credit type") y es obligatorio.
- Decisiones en `modulos/ledger.md` (2026-11-20).

## 2026-11-19

### Dashboard: el título con el tamaño de las demás pantallas ([#170](https://github.com/JulianGerardi/red-dental-studio/pull/170))
- *Dashboard* deja `PageTitle size="lg"` y usa el tamaño por defecto (20px semibold), como Patients, Scheduling y
  Billing. Ninguna pantalla usa `size="lg"` ahora; la variante sigue en `ui/page-title`.

### Patient Payment, Credit y Charge Adjustment con la lógica de red.dev, en el Ledger y en Billing; métricas en azul ([#169](https://github.com/JulianGerardi/red-dental-studio/pull/169))
- **Un solo formulario para el Ledger y Billing** (CON-3738, CON-3739, CON-3735): los tres drawers comparten la lógica y
  `PostPaymentDialog` sólo elige cuál abrir.
- **Apply to** con alcance (todo el hogar, Self o un dependiente); al cambiarlo se recargan los cargos abiertos.
- **Reparto automático** del importe del cargo más viejo al más nuevo; se vuelve a repartir al cambiar el importe o el
  alcance. Applied se edita a mano con sus topes y mensajes (línea por encima del saldo del guarantor, total por encima del
  importe). Lo que no se aplica queda como crédito sin aplicar y los cargos cubiertos dejan de figurar como abiertos.
- **Patient Payment**, como el video de red.dev: un solo paso, con la card *Payment Information* (se pliega), los métodos en
  su caja con + / −, Notes adentro y *Ledger Transactions* de 10 columnas debajo. Abre con el total abierto como importe.
  Un movimiento por pago, con todos sus métodos; sólo los de tipo patient, cada uno con su campo (cheque y banco,
  Authorization ID, Reference number). Fecha no futura.
- **Credit Adjustment** sólo con tipos de crédito; **Charge Adjustment** con Provider opcional y Visit date (`[None]` y las
  visitas del alcance), guardado como `Adjustment` positivo.
- **Métricas en azul:** el número de `ui/stat-card` (Billing, Ledger, Edit Account) y de las del Dashboard (`StatStrip`,
  `dashboard/StatCard`) pasa a `text-dash-blue`.
- **Para el dev:**
  - Lógica pura en `lib/ledgerAplicacion.ts` (`cargosAbiertos`, `autoAplicar`, `resumenAplicacion`, `MENSAJES`, `opcionesAplicaA`).
  - Hook `useAplicacion`, `ShellLedger` y `SeccionLedger` en `ledger/formulario.tsx`; `ApplyToSelect` nuevo.
  - `LedgerAllocationTable` es controlada y pierde la flecha de fila, Columns y el paginado.
  - `PostPaymentDialog` recibe `movs`, `aplicaciones`, `garante`, `dependientes` y `alcanceInicial` en lugar de `pacienteInicial`.
  - `onGuardar(m, aplicado)` trae cuánto fue a cada cargo (id → monto); `METODOS_PAGO` y los tipos de ajuste pasan a `data/ledger.ts`.
  - `ds:check` marca sin story: `ApplyToSelect`, `CampoFecha`, `SeccionLedger`, `ShellLedger`, `WaitingRoomList`,
    `CancelAppointmentDialog`, `NoShowDialog` y `Globo`; no frena el deploy y se resuelve al documentar.
  - Decisiones en `modulos/ledger.md` y `billing.md` (2026-11-19).

### Ledger y Billing alineados con red.dev, Scheduling, Dashboard y Settings normalizados (CON-4142) ([#168](https://github.com/JulianGerardi/red-dental-studio/pull/168))
- **Regla:** las acciones principales van en la fila del título; los controles de fecha y filtro, debajo. Ninguna
  pantalla lleva bajada debajo del título (`SettingsPageHeader` ya no acepta `bajada`).
- **Ledger:** Patient Payment (-), Credit Adjustment (-) y Charge Adjustment (+) son botones en la fila del título que
  abren el `PostPaymentDialog` de Billing (sale la pestaña Transactions), con Patient View / Guarantor View al lado.
  Sin buscador ni filtro; la tabla va en su card con Columns y Export. Type con rótulos cortos y colores de red.dev
  (`PillTipo` en `LedgerRowDetail`, también en Billing). Household en las dos vistas, con link a la ficha.
- **Métricas:** `ui/stat-card` (`StatCard`) es la card de métricas de Ledger, Billing y Edit Account › Subscription.
- **Billing:** métricas de borde a borde; con un paciente elegido, los tres pagos van en la fila del título y Export CSV
  se apaga. La lógica de adentro de los drawers no cambia en este PR: se arma aparte.
- **Scheduling:** Day/Week/Month, View y New appointment en la fila del título; debajo, el `DatePicker` de la app (sin
  flechas) y Status legend. Sin breadcrumb. El nombre del paciente en el detalle del turno abre su ficha.
- **Dashboard:** la fecha, Today y los números bajan a la fila de debajo del título.
- **Settings:** el overview queda con Account, Locations, Employees, Roles, Consents, Billing, Ledger y Preferences.
  Salen Parameters, Libraries, Patient Portal y Security del menú y sus rutas.
- **Para el dev:** `PatientPaymentPanel`, `CreditAdjustmentPanel` y `ChargeAdjustmentPanel` quedan sin uso en la app
  (siguen sus stories hasta documentar). `StatCard` todavía no tiene story (va al documentar).

### Dashboard según las historias de Dashboard 2 (CON-4176 a CON-4180) ([#167](https://github.com/JulianGerardi/red-dental-studio/pull/167))
- **Menú ⋮ de Appointments** sin *Edit patient* (CON-4177): Edit appointment, Mark as no-show y Cancel appointment.
- **Vacíos:** *No appointments scheduled for today*, *Waiting room is empty* y, con filtros sin resultados, *No results
  match your filters* en las dos columnas.
- **Waiting y Paused** se calculan desde la hora del check-in y del inicio de la pausa actual, y se actualizan cada
  minuto (CON-4178).
- **Contador de sala** con tooltip *N appointments today* (`ui/tooltip`).
- **Start Encounter** en la ficha rápida sólo con el encounter Planned (Checked in), y el pill dice el estado real del
  encounter (CON-4179).
- **Para el dev:** `EnEspera` cambia `minutos` por `desde` (HH:MM); helpers `minutosDesde` y `horaDelDia`.
  `WaitingRoomList` pide `ahora`. `PatientDetailsPopover` suma `encounter` (null: sin pill) e `iniciar`.
  Propuesta para el backend (`checked_in_at`, historial de estados del encounter / `on_hold_since`) en
  `modulos/dashboard.md`, 2026-11-19, tercera tanda.

### Dashboard: cada columna, su momento de la visita; filtros y menú ⋮ según el estado ([#166](https://github.com/JulianGerardi/red-dental-studio/pull/166))
- **Appointments** muestra sólo las citas que todavía no llegaron, en orden de hora, sin el badge *Check In* ni TR/CC.
  Total en el título y tope de 6 con "Show N more". **Check In** pasa la cita a la Waiting Room.
  Filter **Provider** + **Room** combinados; el título cuenta lo filtrado.
- **Menú ⋮ de una cita Booked:** Edit appointment · Edit patient · Mark as no-show (sólo con la hora pasada, CON-1828) ·
  Cancel appointment (motivo obligatorio, CON-1827). Check In y Check Out nunca van en el menú: tienen su botón.
- **Waiting Room** en tres grupos por etapa del encounter (CON-1670): **Checked in** (TR, CC y *Waiting · N min*),
  **On hold** (*Paused · N min*) y **Ready to check out** (el único con Check Out). Cada grupo muestra al menos una fila y
  su cuenta es el total. Filter **Visit stage** en lugar del de sala. Cancel sólo en Checked in.
- **Edit appointment desde la Waiting Room** deja campos en sólo lectura según la etapa: Checked in todo menos paciente,
  status, fecha y hora; On hold sólo la sala; Ready to check out sólo las notas.
- **Rooms:** contador de citas junto al nombre y, cerrada, *Now* / *Next*. Estados Available, Busy y **No bookings**
  (gris, sala sin citas); *Unavailable* queda para una sala fuera de servicio. Sale *Patients today*.
- **Para el dev:**
  - Componentes nuevos: `WaitingRoomList` y `AppointmentStatusDialogs` (`CancelAppointmentDialog`, `NoShowDialog`).
  - `MenuCard` pasa a Radix y acepta `acciones`. `AppointmentRow` suma `chips`, `estado`, `onAccion` y `acciones`.
  - `NewAppointmentModal` suma `bloqueados` y `nota`; `ConfirmDialog` suma `confirmDisabled`.
  - `OperatoryCard` suma `resumen`; `OperatoryStatus` suma `'No bookings'`.
  - `Globo` se mudó a `dashboard/primitives` (Patients lo reexporta).
  - En `dashboard-data.ts`, cada turno de la agenda lleva `completado` / `enCurso` / `cerrado`; `EnEspera` lleva
    `etapa` y `minutos`. Helpers: `pendientesDeLlegar`, `resumenSala`, `puedeNoShow`, `HORA_DEMO` y
    `MOTIVOS_CANCELACION` (CON-2801). `TURNOS_PATIENTS` quedó fijo.
  - Desde 1280px las columnas ya no toman el alto de la ventana. Decisiones en `modulos/dashboard.md` (2026-11-19).

### Mails de la plataforma: plantilla única para el backend y página aparte ([#165](https://github.com/JulianGerardi/red-dental-studio/pull/165))
- **Los 16 mails** de "Email Propuesta" (onboarding, turnos, treatment plan, firma, paciente, empleado, suscripción y
  guardian) sobre **un solo layout** con siete bloques fijos (saludo, párrafo, aviso, detalles, botón, nota y firma) y
  `{{variables}}`, en HTML apto para clientes de correo (tablas, estilos inline, 600 px). Los que el documento deja
  vacíos están marcados como propuesta.
- **Página aparte de la app**: https://juliangerardi.github.io/red-dental-studio/emails/ (cada mail con su link,
  `#<id>`): vista previa con datos de ejemplo o variables, escritorio o celular, y descarga del HTML.
- **Para el dev / backend:** los archivos para el backend están en `public/emails/`: `<id>.html` (la plantilla con sus
  `{{variables}}`), `emails.json` (asunto, preheader, destinatario y variables de cada mail) y las imágenes. Las
  imágenes cuelgan de `{{assets_url}}` y el logo de la clínica va en `{{practice_logo_url}}` (PNG de 88 px de alto).
  Los mails de paciente, empleado y guardian **no llevan contraseña**: mandan un link de un solo uso que vence
  (`{{set_password_link}}`, `{{link_expiration}}`). El aviso es el `Alert` de la app. Fuente: `src/emails/`.
  Se regenera con `npm run emails:exportar` (`--check` avisa si quedó desactualizado); las imágenes, con
  `node scripts/emails-recursos.mjs`. Vite tiene una segunda entrada (`emails/index.html`). Decisiones en `emails.md`.

### Documentación: New/Edit Patient, menús de tabla y Figma de Patients y Settings ([#164](https://github.com/JulianGerardi/red-dental-studio/pull/164))
- **Storybook:** *Pages / Parts / Patient modals* pasa a Playground, Parts, States y Specs, con New Patient (pasos,
  duplicado) y Edit Patient (la pantalla, completa y con datos que faltan); Fields suma *Contact* y *Address*. *Fields*
  suma la regla y la story *Checkbox beside a field*; *Tables* la fila *Row actions* y el nombre como texto en Settings.
- **Se borran** `EditPatientModal` (el drawer viejo con pestañas) y `EditPatientForm` (el formulario fijo del Figma): la
  app ya no los usaba. `PatientDetail` deja el estado `'edit'` que nadie abría.
- **Screens & Flows:** recapturadas 🧍 Patients (suma *New Patient (ya registrado)*; *Edit* es la pantalla con cards) y
  Settings — Employees, Locations y Accounts, conectadas a la library.
- **Para el dev:** `EditPatientPage` acepta `pacienteId` (sólo para Storybook). En Figma, los motores para conectar
  pantallas son `motorLib` y `chipcountLib`; `motor` y `chipcount` ya no corren (`figma-docs.md`, 2026-11-19).

### Pending Signature por paciente, con tres pacientes de ejemplo ([#133](https://github.com/JulianGerardi/red-dental-studio/pull/133))
- `patient-0002`, `patient-0003` y `patient-0005` abren con **Pending Signature**, para verlo sin hacer el flujo;
  `patient-0001` sigue con Start Encounter. La nota sin firmar queda en el paciente desde el que se cerró el encuentro.
- Clinical Mode desde el panel abre el del paciente de la ficha (`/patients/<id>/clinical-mode`), ya no siempre el
  primero.
- **Para el dev:** `useNotaPendiente(paciente)` / `setNotaPendiente(paciente, v)` en `lib/notaClinica.ts`, semilla en
  `NOTA_PENDIENTE_INICIAL`; `ClinicalNoteDialog` pide `paciente`. Decisión en `patient-dashboard.md` (2026-11-10).

### Figma: card de cita del paciente (Patient appointment card) conectada al design system ([#163](https://github.com/JulianGerardi/red-dental-studio/pull/163))
- **Patient appointment card** nuevo en el design system (`🗂️ Cards & Layout`): card de cita de la ficha del paciente con estados Booked (con Cancel), Cancelled, Fulfilled y No Show. 119 cards de las pantallas pasan a instancias; diferencia con el original ≈ 0,16 % de los píxeles.
- **Para el dev:** la app no cambia. Motor `citas` guardado en el archivo de flujos; pendientes (campos, tablas, ícono flecha en los botones) en `design-reference/figma-design-system.md`, sección *Card de cita del paciente conectada*.

## 2026-11-18

### Figma: fila de tarea (Task row) conectada al design system ([#162](https://github.com/JulianGerardi/red-dental-studio/pull/162))
- **Task row** nuevo en el design system (`📊 Tables & Lists`): fila de tarea pendiente con variantes por tipo (Clinical Note, Lab Orders, Prescriptions, Referrals). 96 filas de las pantallas pasan a instancias; en el Dashboard la diferencia con el original es < 0,1 % de los píxeles.
- **Para el dev:** la app no cambia. Motor `tareas` guardado en el archivo de flujos; pendientes (cards de Appointments de la ficha, campos, tablas) y el detalle en `design-reference/figma-design-system.md`, sección *Fila de tarea conectada*.

### Relationships: todos los nombres son link y Household con ⋮ (CON-4139, CON-4113) ([#161](https://github.com/JulianGerardi/red-dental-studio/pull/161))
- **Todos los nombres de las cards** (relaciones y Household) son link azul a la ficha de esa persona
  (`/patients/:pacienteId`). Ya no hay nombre en negro.
- **Household lleva el ⋮** con *Edit relationship* y *Delete relationship*, igual que las relaciones. Al editar se
  conserva la pill *Household*. Sin pacientes en Household: *No household patients*.
- **Para el dev:** `PersonaCard` siempre dibuja el `Link`; pasale `onEdit`/`onDelete` también en Household. Decisión en
  `relationships.md` (2026-11-18).

### New Patient como 2.0, Edit Patient como la ficha de un empleado y tablas de Settings sólo con el ⋮ ([#160](https://github.com/JulianGerardi/red-dental-studio/pull/160))
- **New Patient** (CON-1328): *Email* obligatorio; Demography con los campos de 2.0 (*Gender\** obligatorio, Race,
  Ethnicity, Marital Status, Profession, Nationality, Language y Religion) e *Interpreter Required* al lado de Language.
  Mismo nombre y email que otro paciente: `Alert` danger y no se guarda.
- **Edit Patient** (`/patients/:id/edit`, CON-1329): una sola pantalla sin pestañas, como la ficha de Employee: foto
  editable, nombre y estado, y las cards General, Contact, Address y Demographic. Sin Guardian ni el buscador de personas.
  Obligatorios de la historia: General, Gender, teléfono y dirección.
- **Employee:** la ficha ya no tiene *Use this option only to link a person…* (sigue en New Employee).
- **Locations, Employees y Accounts:** el nombre de la fila deja de ser link (se entra por el ⋮ → *Edit*); todos los
  ítems del menú llevan ícono y los de editar dicen *Edit*.
- **Para el dev:** `DatosPaciente` suma demografía (`gender`, `race`, `ethnicity`, `marital`, `profession`,
  `nationality`, `religion`) y contacto/dirección (`codigo`, `area`, `numero`, `ext`, `linea1`, `linea2`, `pais`,
  `estado`, `ciudad`, `zip`); salen `phone`, `address` y `city`. `useFormPaciente(datos, { edicion: true })`,
  `validarPaciente(d, { menor, exigirGuardian, edicion })`, `duplicadoDe(...)` y los campos `CamposContacto` /
  `CamposDireccion`. `PersonCell` sin `to` ni `onClick` dibuja texto. Detalle en `patients.md`, `employees.md`,
  `locations.md` y `settings-accounts.md` (2026-11-18).

### Figma: fila de turno y Status chip conectados al design system ([#159](https://github.com/JulianGerardi/red-dental-studio/pull/159))
- **Appointment row** rehecho desde la app (variantes `Action=Check In|Check Out`, 408×86) y componente nuevo **Status chip** (TR/CC). ≈ 310 filas de turno de las pantallas pasan a instancias; diferencia con la pantalla original < 0,2 % de los píxeles. El ícono del Button toma el color de su texto.
- **Para el dev:** la app no cambia. Motor `filas` guardado en el archivo de flujos; pendientes (filas de tarea, cards de la ficha, campos, tablas) y el detalle en `design-reference/figma-design-system.md`, sección *Fila de turno conectada*.

### Documentación: Alert como aviso único y sale Section notice ([#158](https://github.com/JulianGerardi/red-dental-studio/pull/158))
- **Storybook:** *Elements / Alert* con Parts, States (tonos, título y texto, sólo título, angosto, largo y *In the app*)
  y Specs, y la regla en la descripción. Se borran `ui/section-notice` y su story.
- **Screens & Flows:** los avisos de Guardian (Patients) y *Guarantor not assigned* (Scheduling) pasan a instancias de
  *Alert* de la library; el de Demography se borra. Se cambiaron en el lugar, sin recapturar.
- **Design system en Figma:** sale *Section notice*; *Alert* suma la regla. Hay que **republicar la library**.
- **Para el dev:** `@/components/ui/section-notice` ya no existe: para un mensaje en pantalla, `Alert`.

### Figma: estilos de texto y sombra, Sidebar sin activo y pills conectados al design system ([#157](https://github.com/JulianGerardi/red-dental-studio/pull/157))
- Nuevos en el DS: 7 estilos de sombra, 27 de texto, variante `Sidebar Active=None` y Pill SM con 6 px de padding. Se aplicaron ≈ 8.700 textos, ≈ 4.000 sombras y ≈ 320 pills de estado en las pantallas.
- **Para el dev:** la app no cambia. Qué falta conectar (cards, campos, tablas, textos con interlineado automático) y cómo se corren los motores: `design-reference/figma-design-system.md`, sección *Estilos, Sidebar sin activo y pills*.

### Avisos: uno solo (`ui/alert`) y sin el de Demography ([#156](https://github.com/JulianGerardi/red-dental-studio/pull/156))
- **Demography** (New Patient y Edit Patient) ya no muestra *Additional contact and address information. These fields
  are optional.*: no estaba en ningún diseño.
- **Un solo aviso en la app: `ui/alert`** (caja redondeada con ícono y título). Las franjas con barra a la izquierda
  hechas a mano pasan a `Alert`: *Guarantor not assigned* del detalle del turno y `GuarantorBanner` (warning), Guardian
  *This patient is under 18.* (warning), New Hours (*Attention needed* warning, *This will update the hours…* info),
  *Global access* de Assign Role (info) y el aviso de presión de Vitals (info).
- **Para el dev:** para un mensaje en pantalla, usar `Alert` con su tono; no armar franjas con `border-l-[3px]`. Las
  tarjetas con barra de color (turnos, findings) no son avisos y siguen igual. `ui/section-notice` queda sin usos y se
  saca del design system cuando se documente. Decisión en `patients.md` (2026-11-18).

### Drawers sin bajada, Edit Patient como pantalla y Edit Appointment en pestañas ([#155](https://github.com/JulianGerardi/red-dental-studio/pull/155))
- **Drawers:** el título va solo. `ui/drawer` deja `description` sólo para el lector de pantalla; se sacan las bajadas
  genéricas de sección (New Appointment, Exceptions).
- **Edit Patient es una pantalla** (`/patients/:id/edit`), como la ficha de una Location: pestañas General / Guardian /
  Demography, cada sección en su card y Cancel / Save Changes abajo a la derecha; los dos vuelven a la tabla de
  Patients. Se va la ruta vieja `/patients/edit`.
- **Edit Appointment (CON-3249):** sin pasos, en pestañas General / Schedule / Additional / Treatment Plan y un solo Save
  Changes. En el calendario, un lápiz en el detalle del turno lo abre; Fulfilled, No-show y Cancelled no se editan.
- **Para el dev:**
  - `NewAppointmentModal`: `titulo="Edit Appointment"` pasa a `edicion`; suma `pestanaInicial` (Rooms y Working Hours
    abren en Schedule).
  - `AppointmentDetailsDrawer` suma `onEdit`; `esEditable()` en `calendar-data.ts`.
  - `EditPatientModal` ya no se usa en la app (queda en el Storybook hasta documentar).
  - Decisiones en `patients.md`, `scheduling.md` y `figma/README.md` (2026-11-17).

## 2026-11-17

### Figma: pantallas alineadas y shell conectado al design system ([#154](https://github.com/JulianGerardi/red-dental-studio/pull/154))
- **Alineación:** los botones Check In / Check Out (Dashboard y Header & Sidebar) quedaban en 0,0 pisando los chips; los avatares de la ficha del paciente estaban estirados (186×62) y el pill de las entradas de Clinical Mode, sobre el texto. Reparados. La causa era el motor que reemplaza lo capturado por componentes: no copiaba x/y en frames sin auto layout; ya lo hace.
- **Button con ícono al final:** nueva propiedad de variante `Icon position` (Leading/Trailing) en el Button del design system (108 variantes). 536 botones (Check In, Check Out, Complete this Task) pasan a Trailing, como en la app.
- **Shell como instancias:** Sidebar, Topbar y banner de notificación son instancias del design system en ~250 pantallas (el banner a 55 px). Topbar y banner se igualaron a la app (botón de colapsar, buscador blanco, avatar SS, cierre y colapso a la derecha) y el Sidebar suma la sangría de 12 px. Títulos de página: 91 pasan a instancias de `Page title`.
- **Para el dev:** la app no cambia. Motor `shell` guardado en el archivo de flujos (plugin data `rds.ds/shellSrc`). Pendiente y anomalías en `design-reference/figma-design-system.md` (*Revisión de alineación* y *Shell conectado*): Sidebar sin ítem activo, cards, campos, tablas y estilos de texto y sombra sin conectar.

## 2026-11-16

### Documentación: borrar una franja, cerrar un día, citas afectadas y advertencias en azul ([#153](https://github.com/JulianGerardi/red-dental-studio/pull/153))
- **Storybook:**
  - *Pages / Parts / Location detail* suma *Delete working hours?*, *Close working hours?*, *Unable to change* y la
    tabla *Working Hours · States*.
  - *HoursAppointmentsDialog* se rehízo con CON-4167: la cita resuelta sale de la lista, sin citas se vuelve al origen
    y está el bloqueo.
  - *ConfirmDialog*: la advertencia va en azul.
- **Screens & Flows:** Locations suma el flujo *Delete hours & close a day* (9 pantallas). La página se recapturó y se
  reconectó a la library del design system.
- **Design system en Figma:** *Confirm dialog* con la advertencia en azul y dos ejemplos nuevos. Hay que republicar
  la library.
- **Para el dev:**
  - La app no cambia.
  - `pulsarRol` (`design-system/play.ts`) acepta `switch`.
  - Recapturar una página conectada a la library tiene pasos nuevos: ver `figma-docs.md`.

### New/Edit Patient: nombre completo en una fila ([#152](https://github.com/JulianGerardi/red-dental-studio/pull/152))
- Paso *General* (`CamposGeneral`): *First Name*, *Middle Name* y *Last Name* en una fila de tres; debajo, *Email* y
  *Birthdate*. En celular, apilados.
- **Para el dev:** excepción deliberada a "campos de a dos" en drawers (`patients.md`, 2026-11-16). Sin cambios de datos
  ni validaciones.

### Working Hours: borrar una franja, cerrar un día y citas afectadas según la HU 8 ([#151](https://github.com/JulianGerardi/red-dental-studio/pull/151))
- **Delete working hours?** (la ✕ de una franja, CON-4166): pregunta antes y borra sólo esa franja. Si es la última,
  el día queda Closed.
- **Close working hours?** (el switch, CON-4165): pregunta antes y el día conserva sus franjas. Al reabrirlo,
  *Set working hours* las trae.
- **Affected appointments** (CON-4167): entran sólo las citas que pierden cobertura. Lo hecho cita por cita se guarda en
  el momento y la cita resuelta sale de la lista. Con citas en Check In o In Progress no se aplica nada
  (*Unable to change working hours*).
- **`ConfirmDialog`:** el ícono de advertencia (`icon="warning"`) va en azul; en `danger` sigue rojo.
- **Para el dev:**
  - En `LocationDetail.tsx`, todo cambio de horarios es una `Operacion` (`panel`, `quitar`, `cerrar`) que pasa por
    pregunta, impacto (`pierde`) y aplicación.
  - `HoursAppointmentsDialog` recibe `afectados` ya calculados y `onCambiar`. `HoursBlockedDialog` es nuevo.
  - `EstadoTurnoLocacion` suma Check In e In Progress.

### Campos obligatorios vacíos: siempre "This field is required." ([#150](https://github.com/JulianGerardi/red-dental-studio/pull/150))
- Todo campo obligatorio vacío dice *This field is required.* debajo (CON-4161). Salen *Required.*, *Enter the reason.*,
  *A billing name is required.*, *Please add a procedure to the exception* y las demás variantes.
- **Para el dev:**
  - Usar `OBLIGATORIO` de `src/lib/validacion.ts`; no escribir el texto a mano.
  - Los mensajes de valor inválido (*Enter a valid email.*, *Enter the 10-digit NPI.*) quedan para un campo con algo
    cargado; vacío, siempre `OBLIGATORIO`.

### Affected appointments con jerarquía clara, "+N" sólo cuando no entra y asterisco en las horas ([#149](https://github.com/JulianGerardi/red-dental-studio/pull/149))
- **Affected appointments** (`HoursAppointmentsDialog`): el título es *Affected appointments*. Cada fila muestra el
  paciente, la fecha con el horario completo y el provider, con el estado como badge a la derecha junto al ⋮. Queda un
  solo contador, *Appointments (N)*: salen el pie y la línea por fila.
- **Working Hours** (`FranjasDia`): una línea con todas las franjas que entran junto a *Edit hours*. Sólo las que no
  entran quedan en "+N", que las despliega. En celular, el día y el switch van arriba y las franjas debajo.
- **Start Time y End Time con asterisco** en *Set working hours* y en *New Hours* (Employees).
- **Screens & Flows:** Locations suma el flujo *Set working hours: other days & affected appointments*.
- **Para el dev:**
  - `FranjasDia` mide con `ResizeObserver` sobre una copia invisible (`aria-hidden`).
  - En tests, contar las franjas por el botón *Remove …*, no por el texto: la copia lo repite.

### Design system: ConfirmDialog con ícono en línea, Set working hours y turnos afectados ([#148](https://github.com/JulianGerardi/red-dental-studio/pull/148))
- **Storybook:**
  - *Elements / ConfirmDialog*: el control `icon` (auto · warning · delete) y una story por combinación de tono e
    ícono.
  - *LocationHoursModal*: ahora tiene Parts, States y Specs.
  - *HoursAppointmentsDialog*: página nueva.
- **Figma del design system** ([Confidentally UI · Design System](https://www.figma.com/design/iJvnuV8TLStMXpNjdwsuDe),
  *Feedback & Overlays*): el *Confirm dialog* tiene el ícono de 16 px, las propiedades `Tone` × `Icon` (5 variantes) y
  ejemplos reales de la app debajo.
- **Para el dev:**
  - La app no cambia.
  - Para Code Connect: `tone` → `Tone`, `icon` → `Icon` (sin prop = Auto), `title` → `Title` y `children` → `Body`.
  - El link al Figma del design system está en `CLAUDE.md`. El detalle, en `design-system.md` (2026-11-16).

### Working Hours: aplicar el horario a otros días, turnos afectados y pop-ups con ícono en línea ([#147](https://github.com/JulianGerardi/red-dental-studio/pull/147))
- **Set working hours (Locations):** el día de origen queda elegido y no se puede sacar. Si un día adicional está Open
  con otro horario, pregunta *Replace working hours?* nombrando sólo esos días, en el orden de la tabla (CON-1546;
  historia de Abril sin clave en Jira todavía). La comparación ordena las franjas.
- **Turnos afectados:** si las horas nuevas dejan afuera turnos Proposed o Booked, antes de guardar se abre
  `HoursAppointmentsDialog`: por turno, Edit appointment, Cancel appointment o Mark as No Show; Confirm guarda las
  horas y pasa el resto a Waiting List. Cancel no guarda nada (resolución de CON-2890, con el texto adaptado a la
  locación).
- **`ui/confirm-dialog`:** sale el ícono de 36 px con círculo. Ahora todos llevan un ícono de 16 px junto al título que
  sale del tono (info azul; triángulo rojo en `danger`).
- **Para el dev:**
  - `LocationHoursModal` suma `horario` (la semana actual, 0-6) y `onGuardar` puede devolver `false` para dejar el
    panel abierto mientras se resuelven turnos. Exporta `mismoHorario`, `listaDias`, `aMinutos` y `deChip`.
  - Datos nuevos: `TURNOS_LOCACION` en `src/data/location-detail.ts`.
  - `ConfirmDialog` suma `icon="delete"` (tacho): usarlo sólo en lo que borra. `icon="warning"` sigue para avisos.
  - Decisiones en `figma/modulos/locations.md` y `figma/README.md` (2026-11-16).

## 2026-11-15

### Figma: Fill container, íconos de los buscadores y design system conectado ([#145](https://github.com/JulianGerardi/red-dental-studio/pull/145))
- **Fill container en las 281 pantallas:** lo que ocupa todo el ancho o el alto de su contenedor, o el espacio que sobra,
  pasa a Fill container (con ancho máximo si lo tenía). Al quitar un elemento el resto se acomoda y al achicar la pantalla
  el contenido la acompaña; el dock y los drawers quedan anclados a su borde.
- **Íconos de los buscadores:** el importador los dejaba debajo del input blanco y no se veían; ahora van arriba.
- **Para el dev:**
  - Nuevo `scripts/figma/arreglar.figma.js` (se corre con `use_figma` después de importar y ordenar). Verifica cada
    contenedor: si algún hijo cambiara de tamaño, lo deja como estaba.
  - Reglas y límites en `design-reference/figma-docs.md` y en `CLAUDE.md` (*Documentación en Figma*). La app no cambia.
- **Clinical Mode, segunda tanda** (`scripts/figma/flujos/clinical-mode-2.mjs`): Treatment — Workflows (7 pantallas: lista y filtro de workflows, acciones, preguntas, ocultar sección, Generate Narrative), Radiography — Gallery, Upload & Viewer (3) y Lab Order — List & Actions (4: lista, filtro, acciones por fila, View History), capturados de la app y conectados al design system. Las notas de ROS, Physical, Periodontal, Patient Summary, Prescription y Referral ahora dicen que en la app son placeholders «Planned» (antes parecían pantallas hechas).
- **Clinical Mode, tercera y cuarta tanda** (`clinical-mode-3.mjs`, `clinical-mode-4.mjs`): Dental Assessment en profundidad (información del diente, acciones de un hallazgo, Edit Finding, Discard, Delete, New Procedure planned/existing/superficies; 11 pantallas capturadas) y, desde Platform Design sobre el shell de la plataforma, Prescription (lista y New), Referral (lista y create), ROS y Treatment History (6 pantallas). Anomalías del diseño en `modulos/clinical-mode.md`.
- **Dental Assessment, cierre** (`clinical-mode-5.mjs`): Edit Condition de un hallazgo de región (Soft Palate), Problem List · Procedures y sus acciones (Edit, Complete, Discontinue) con el drawer Edit Procedure (7 pantallas). Quedan sin equivalente en la app los pop-ups de New Condition de Platform Design, y para después Treatment Workflow y Workflow Set Up (hay que pegarlos).
- **Foundations nuevos** en el design system: colecciones Opacity, Border, Layout (anchos de página, drawers, breakpoints), Motion y Z-index, y muestras de foco y contraste WCAG.
- **Pantallas reconectadas a la library publicada:** instancias (≈ 9.000 cambiadas), estilos de texto y de sombra (≈ 22.000 textos) y variables (alias de las publicadas); verificado sin cambios visibles. Detalle en `design-reference/figma-design-system.md`.
- **Design system en un archivo aparte** ([Confidentally UI · Design System](https://www.figma.com/design/iJvnuV8TLStMXpNjdwsuDe)): 11 páginas por categoría, 36 component sets (≈ 240 variantes), 227 íconos, 117 variables y los estilos de texto y sombra; suma lo que faltaba (Sidebar, Topbar, banner, menús, cards de turno y tarea, tabla, paginador, drawer, diálogo, toast…). Listo para publicar como library; falta que Julián la publique y reconectar las pantallas.
- **Design system en Figma** (primera versión, página 🎨 Design System del archivo de flujos): 117 variables (Color 88, Radius, Spacing, Size), 23 estilos de
  texto, 4 de sombra y 227 íconos, más 18 componentes (Button 54, IconButton 36, Pill, Chip, Count, Avatar,
  Checkbox, Switch, Field, Tab, Alert, Card, Step, Table cell, Menu item, Tooltip, Breadcrumb). Cada propiedad de la
  pieza de React tiene su propiedad en Figma.
- **Pantallas conectadas:** ≈ 5.900 instancias (Button, IconButton, Pill, Avatar, Chip, Count), ≈ 85.000 rellenos y
  trazos ligados a variables de color, radios y espaciados a sus variables y ≈ 22.000 textos a estilos, sin cambios
  visibles (se comparó antes y después). Lo que no coincide con una variante queda como capa.
- **Para el dev:** `design-reference/figma-design-system.md` trae la clasificación (qué se componentiza y qué no), cómo
  retomar y los hallazgos de UX: dos contadores (Globo y Count), ≈ 5.800 de 10.700 botones fuera de la escala 28/32/36 y
  azules sin token (`#1e58be`, `#2f6bff`). Nada de esto toca el código de la app todavía.


### Documentación en Figma, Storybook al día y Jira en cada página ([#144](https://github.com/JulianGerardi/red-dental-studio/pull/144))
- **Figma:** archivo nuevo, [Confidentally — Red Dental Studio · Flows](https://www.figma.com/design/TPh6NE9d4skn0BdId26UTR),
  con el formato de la página 🧍 Patients de *Platform Design*: una página por módulo (19), una sección por flujo (63)
  y 281 pantallas capturadas de la app, con auto layout y las capas nombradas como el componente de React.
- **Relationships & Billing completo:** Add Relationship con Person · Contact · Relationship (persona con contacto,
  sin contacto y nueva), Edit, Delete con su vacío y el garante en Ledger y Billing (CON-4000, CON-3174, CON-3999).
- **Happy path para el dev:** cada flujo trae resumen, quién lo usa, sus historias de Jira y los pasos numerados; cada
  pantalla, su ruta y una nota.
- **Storybook:** quedaban 74 piezas sin story y 6 estados sin mostrar desde el 2026-10-25. `ds:check` vuelve a verde
  (570 de 570). Páginas nuevas: BillingProfile, LocationInsuranceDefaults, ConsentDetail, EstimateDetails, Procedure
  actions, RegionExam, IntraOralExam, ProblemListFlotante, SearchPicker, DockFlotantes y Ledger parts, entre otras.
- **Jira en el Storybook:** cada página suma la tarjeta *Jira* con las historias de la pieza y su link.
- **Para el dev:**
  - La app no cambia de comportamiento: sólo se exportaron piezas internas para poder documentarlas (lista en
    `design-system.md`, 2026-11-15).
  - `scripts/figma/`: `capturar.mjs` (`npm run figma:capturar -- <módulo>`), `portada.mjs`, `ordenar.figma.js` y un
    archivo por módulo en `flujos/` con los pasos, las notas y las claves de Jira. Sirven de guía del flujo aunque no
    se abra el Figma.
  - `kit.tsx` suma `SpecsMedidas` (Specs leídos de la pieza dibujada) y los stories aceptan `parameters.docs.jira`.
  - Reglas en `design-reference/figma-docs.md` y en `CLAUDE.md` (*Documentación en Figma*): documentar es Storybook y
    Figma.

## 2026-11-13

### Billing: un drawer por botón, como red.dev, y Export CSV que descarga ([#143](https://github.com/JulianGerardi/red-dental-studio/pull/143))
- **Drawers de red.dev:** Patient Payment abre *New Patient Payment (-)*, Credit Adjustment abre *Credit Adjustment (-)* y
  Charge Adjustment abre *Enter Charge (+) Adjustment*, cada uno con sus campos (CON-4147). Sale el "Post payment" único,
  con su Type y su buscador de paciente.
- **Pago:** varios métodos con + / − (Check Payment pide Check y Bank/Branch). **Credit** y **Charge:** los tipos de
  red.dev; Charge suma Provider y Visit date y no tiene tabla de aplicación.
- **Export CSV** descarga `billing-activity-<fecha>.csv` con las filas que se ven.
- **Para el dev:**
  - `PostPaymentDialog` arma el drawer según `tipoInicial`.
  - Listas en `data/billing.ts`: `METODOS_PAGO`, `TIPOS_AJUSTE_CREDITO`, `TIPOS_AJUSTE_CARGO`, `PROVIDERS_BILLING`.
  - Decisiones en `billing.md` (2026-11-13, "Los botones y sus drawers"). Storybook sin actualizar.

### Billing alineado con red.dev: Export CSV, filtros, Columns y Today ([#142](https://github.com/JulianGerardi/red-dental-studio/pull/142))
- **Export CSV** arriba a la derecha; con un paciente elegido queda apagado (CON-4147).
- **Filtros de red.dev:** All, Payments, Adjustments, Today (antes Pt Payment, Charge Adj, Credit Adj).
- **Columnas de red.dev:** Trans. Date, Patient / Account, Type, Description, Provider, Amount, Trans. Bal., Status, con
  **Columns** al lado de los filtros. Patient View usa las del Ledger (CDT Code y Type con nombre completo).
- **Credit available · $X** debajo de un pago con crédito sin aplicar; pie con "results" y Rows per page (8, 20, 50).
- **Today** con los títulos de red.dev (Adjustments Created Today, Unapplied Credits) y montos en plata.
- **Para el dev:**
  - `DataTable` suma `hiddenColumns` (columnas ocultas controladas desde afuera).
  - `nombreTipo` y `TONO_TIPO` viven en `LedgerRowDetail` (los usan Ledger y Billing).
  - El menú de `ColumnPicker` dice "Visible columns" (también en el Ledger).
  - `HOY_BILLING` en `data/billing.ts` es el "hoy" de los datos de prueba (filtro Today y card Today).
  - Decisiones en `billing.md` (2026-11-13). Storybook sin actualizar.

### Clinical Mode: encuentro de CON-1612, exámenes de red.dev y fechas MM/DD/YYYY ([#141](https://github.com/JulianGerardi/red-dental-studio/pull/141))
- **Encuentro:** tres estados (CON-1612), iguales en la barra de Clinical Mode y en la ficha, que comparten el estado:
  - *Start Encounter*: desde la ficha lleva a Clinical Mode (CON-2994).
  - *Complete Encounter*: ofrece firmar la Clinical Note. El menú ofrece *Pause Encounter* y *Discharge Patient*.
  - *Pending Encounter* (en pausa, ámbar).
  - Se van las opciones viejas (End / Discard encounter, Encounter settings) y el menú ya no se corta.
- **Exámenes** con los nombres y el orden de red.dev: Vitals, ROS, Physical, Extraoral, Intraoral, Dental assessment,
  Periodontal y Radiographic. Salen BMI y ATM/O-F (CON-4144).
- **Fechas en MM/DD/YYYY** en toda la app (tablas, detalles, cards y campos de fecha; Insurance pide "MM / DD / YY").
  Los títulos y las frases siguen en texto.
- **Textos:** "Start Encounter" (antes "Enconter"), "Mark as…", y "Rows per page:" en las tablas de Clinical Mode y en
  Accounts (antes "Show:" y "Mostrar:").
- **Para el dev:**
  - Estado del encuentro en `lib/encuentro.ts` (`useEstadoEncuentro`) y opciones en `OpcionesEncuentro`.
  - `formatMDY` en `lib/fecha.ts` para mostrar fechas; `formatDMY` queda sólo para las claves internas de la agenda.
  - `ordenFecha` lee MM/DD.
  - Decisiones en `clinical-mode.md` (2026-11-13). Storybook sin actualizar.

## 2026-11-12

### Documents: nombres reales y Rows per page ([#140](https://github.com/JulianGerardi/red-dental-studio/pull/140))
- **Nombres:** la tabla deja de repetir "Isacc Cihtepin.doc" (venía del Figma). Ahora usa nombres como los de red.dev:
  *Procedure Consent - código y procedimiento*, *Informed Consent / Refusal of Dental Treatment – caso*, del más nuevo al
  más viejo (CON-4143).
- **Rows per page:** 10, 20 o 50; arranca en 10.
- **Para el dev:** `DataTable` ya traía `pageSizeOptions`; acá sólo se activa. Hay e2e nuevo en
  `tests/documents.e2e.ts`. Decisiones en `treatments.md` (2026-11-12). Storybook sin actualizar.

### Ledger: "Add a note (optional)" y "Enter Charge (+) Adjustment" ([#139](https://github.com/JulianGerardi/red-dental-studio/pull/139))
- **Notes:** el placeholder de Patient Payment, Credit Adjustment, Charge Adjustment y Post payment (Billing) pasa de
  "Placeholder" a "Add a note (optional)".
- **Charge Adjustment (+):** el título pasa a "Enter Charge (+) Adjustment", como red.dev, en lugar de "New Credit (+)
  Adjustment" del Figma.
- **Pestañas:** Payment, Credit y Charge quedan como pestañas (decisión de Julián, CON-4142).
- **Para el dev:** sólo cambian textos. Las decisiones están en `ledger.md` (2026-11-12).

### Ledger: métricas, columnas y ⋮ de CON-3753 / CON-3755, y Household ([#138](https://github.com/JulianGerardi/red-dental-studio/pull/138))
- **Métricas:** Patient (o Guarantor) balance, Patient (o Guarantor) responsibility, Unapplied credits y Open charges,
  cada una con un ⓘ. Se van Total charges e Insurance paid (CON-4142).
- **Columnas:** Trans. Date, CDT Code, Patient / Account, Type (Procedure, Patient Payment…), Description, Provider,
  Amount, Trans. Bal. y Ledger Bal. Unapplied Credit pasa a ser opcional y arranca oculta.
- **Orden:** de lo más nuevo a lo más viejo. Ledger Bal. corre sobre lo que muestra la vista.
- **⋮ por fila:** Apply credit y Estimation details (abre el caso en Clinical Mode). Sin acciones, no hay ⋮.
- **Guarantor View:** suma la card Household.
- **Para el dev:**
  - `Stat` suma `info` y la `nota` pasa a ser opcional.
  - `ColumnPicker` suma `porDefecto`.
  - `RowActionsMenu` suma `onOpenChange`.
  - `FilaConTooltip` suma `callado`.
  - `coberturaSeguro` pasa a `data/ledger.ts`.
  - Decisiones en `ledger.md` (2026-11-12). Storybook sin actualizar.

### Relationships, buscador con ✕ y New Appointment ordenado como CON-4090 ([#137](https://github.com/JulianGerardi/red-dental-studio/pull/137))
- **Relationships:** el nombre de quien es paciente linkea a su ficha; el ⋮ queda marcado mientras su menú está
  abierto; Edit Relationship pasa a 560 px como los demás drawers (CON-4139).
- **Buscador de personas:** con texto escrito muestra una **✕** para borrarlo. La persona elegida se ve con la misma
  card del buscador (Add Relationship, Edit e Insurance).
- **New Appointment:** Status y Requestor arriba, después Reason y Date, Start y End, y Operatory (orden de CON-4090).
  **Additional** (ASAP, Follow-up, Premedicate) y **Notes** pasan al paso 1; el paso 2 queda sólo para linkear la
  visita. Date dice "Pick a date" y la agenda del costado muestra la fecha elegida en inglés (CON-4140).
- **Horas:** las franjas van de "08 AM" a "07 PM" con 12 horas ("01 PM", no "13 PM", anomalía del Figma).
- **Para el dev:** `hora24(franja)` en `AppointmentSlotPicker` pasa una franja a hora 0-23; usarlo en vez de
  `parseInt` (ya está en Scheduling, Dashboard, Patients y LocationDetail). `PersonaFila` se exporta desde
  `patients/form`. Decisiones en `relationships.md` y `scheduling.md` (2026-11-12). Storybook sin actualizar.

### Treatment Plan, Insurance Plans, ayuda en Insurance y sin "Ver estado vacío" ([#136](https://github.com/JulianGerardi/red-dental-studio/pull/136))
- Títulos como en red.dev: **Treatment Plan** (antes "Treatments plan") e **Insurance Plans** (antes "Patients Plans").
- Treatments y Relationships ya no muestran el botón de demo "Ver estado vacío" (estaba en castellano).
- Insurance: **ⓘ** en Coverage Period y Priority Period con la explicación de cada columna (CON-4137, CON-4138).
- **Para el dev:** `DataTableColumn` suma `headerInfo` (pone un `InfoTip` al lado del encabezado). En Relationships se
  va el estado `vacio`. Decisiones en `treatments.md`, `relationships.md` e `insurance.md` (2026-11-12). Storybook sin
  actualizar (pendiente de que Julián lo pida).

## 2026-11-11

### Buscador de personas igual en toda la app: nombre · número y chips ([#134](https://github.com/JulianGerardi/red-dental-studio/pull/134))
- Todos los buscadores de personas (New Appointment, New Patient, Add Relationship, New Subscription, New Depender,
  Insurance) muestran **nombre · número de paciente** (sólo si es paciente) y abajo **DOB y email como chips**; los
  providers, cargo y email. Buscan en todos esos datos sin acentos. **La elegida reemplaza al input**, con ✕ para
  cambiarla. Teclado: ↑ ↓, Enter y Esc.
- **Para el dev:** `PersonSearchField` pierde `lineas`; los datos van con `subtitulo` y `chips` (helper
  `chipsPersona(dob, email)`). El input es `combobox` y las sugerencias `option` (los e2e usan esos roles). Decisión en
  `patients.md` (2026-11-11). Storybook sin actualizar.

### Treatment Plan: estados de la columna Consent ([#135](https://github.com/JulianGerardi/red-dental-studio/pull/135))
- La columna **Consent** de los procedimientos (Treatment Plan y Procedures) usa los seis estados de CON-4119: **Not
  required, Not generated, Requested, Accepted, Rejected, Discarded**, cada uno con el tooltip de la historia. *Pending*
  pasa a *Requested* y *Signed* a *Accepted*; *Not sent* desaparece (es el `PENDING` interno: se ve *Not generated*).
- *Rejected* y *Discarded* abren el documento pero ya no se firma. Start / Complete con *Not generated*, *Rejected* o
  *Discarded* piden un consentimiento nuevo. El consentimiento **del caso** (Pending / Signed / Expired) no cambia.
- **Para el dev:** `ConsentProcedimiento` cambia sus valores; `AYUDA_CONSENTIMIENTO` (tooltips) reemplaza a
  `SIN_DOCUMENTO` y sale `AVISO_CONSENTIMIENTO`. Helpers nuevos: `consentimientoCerrado()` y `sinPedir()`. La columna no
  se sumó a Unassigned (la historia lo nombra; falta definirlo). Decisión en `clinical-mode.md` (2026-11-11). Storybook
  sin actualizar.

## 2026-11-10

### Insurance: buscador de suscripciones con chips ([#132](https://github.com/JulianGerardi/red-dental-studio/pull/132))
- **Search for an existing subscription**: cada resultado muestra **nombre · ID** y abajo **Carrier y Plan como chips**
  (carrier gris, plan celeste). La card elegida, igual. Entra en el ancho del campo y en el celular los chips bajan.
  Reemplaza a las columnas de #130 (Julián eligió esta variante entre tres, CON-3284).
- **Para el dev:** `ui/chip` suma `tone` (`blue` de siempre, `neutral`) y `title`. En `PersonSearchField`, `columnas`
  se reemplaza por `subtitulo` (texto al lado del nombre) y `chips` (`{ label, value, tone }[]`); sin esas props se ve
  como antes. Decisión en `insurance.md` (2026-11-10). Storybook sin actualizar.

### Ficha del paciente: Pending Signature cuando la Clinical Note queda sin firmar ([#131](https://github.com/JulianGerardi/red-dental-studio/pull/131))
- Al cerrar el encuentro en Clinical Mode (*End encounter*) y elegir **Remind me later**, la ficha del paciente muestra
  **Pending Signature** en el lugar de Start Encounter, como en red.dev (CON-4081, punto 6). Es un botón aparte, **sin
  desplegable**: abre el mismo diálogo *Clinical Note* y con *Review and sign* vuelve Start Enconter. Va en **tinte
  violeta sin borde** con el ícono de firma: ni la caja naranja de red.dev ni el relleno `#b45309` de la historia,
  porque el naranja se confundía con Pending Encounter (ámbar). Con el menú colapsado queda como ícono.
- **Para el dev:** `PendingSignatureButton` (`PatientSidePanel.tsx`) reemplaza a `EncounterButton` mientras
  `useNotaPendiente()` (`lib/notaClinica.ts`) sea verdadero; `ClinicalNoteDialog` lo prende y lo apaga. Usa `purple-fg` /
  `purple-bg`, sin tokens nuevos. No es un estado del botón de encuentro. Jira no tiene historia para esto: está como
  anomalía en `patient-dashboard.md` (2026-11-10). Storybook sin actualizar (pendiente de que Julián lo pida).

### Detalle del turno: inicio y fin, y Delete ([#129](https://github.com/JulianGerardi/red-dental-studio/pull/129))
- **Scheduling → detalle del turno**: el horario muestra inicio y fin al tamaño del resto de las filas ("08:15 AM –
  10:45 AM"), con la duración a la derecha y la fecha abajo; antes sólo se veía la hora de inicio, en grande.
- **Delete** (CON-2990), a la izquierda de Check In y del mismo ancho: sólo borra un turno `Proposed`, con
  `ConfirmDialog`. En los demás estados se ve apagado y dice por qué (tooltip y aviso). Se suma a la grilla un turno
  Proposed de ejemplo que no está en el Figma (Sofia Chen, miércoles 11:00 AM).
- **Para el dev:** `AppointmentDetailsDrawer` cambia `hora: string` por `inicio: number` (hora decimal) y suma
  `onDelete?` (sin la prop no muestra el botón; confirma adentro). `calendar-data.ts` suma `esEliminable(estado)`.
  Check In pasa a `ui/button`. La auditoría del borrado no se muestra (no hay backend). e2e en
  `tests/scheduling-delete.e2e.ts`. Decisiones en `scheduling.md` (2026-11-10). Storybook sin actualizar.

### Insurance: resultados del buscador de suscripciones en filas ([#130](https://github.com/JulianGerardi/red-dental-studio/pull/130))
- **Search for an existing subscription**: cada resultado es una fila con avatar, nombre e **ID** a la izquierda, y
  **Carrier** y **Plan** en columnas alineadas entre todas las filas (antes eran cuatro renglones apilados y sobraba
  espacio a la derecha). La card de la elegida usa el mismo formato. En el celular, Carrier y Plan bajan debajo del
  nombre. "Subscription:" pasa a "ID:", como el placeholder (CON-3284).
- **Para el dev:** `PersonSearchField` (`patients/form.tsx`) suma `columnas` (opcional: `{ label, value }[]`, en una
  grilla que se decide por el ancho de la card con `@container`). Sin esa prop se ve como antes. Decisión en
  `insurance.md` (2026-11-10). Storybook sin actualizar.

## 2026-11-06

### Lista de Patients: sin bajada, Rows per page, Overview y foto ([#128](https://github.com/JulianGerardi/red-dental-studio/pull/128))
- Patients ya no tiene bajada (era el texto de Locations). La tabla suma **Rows per page** (10, 20, 50) y el menú ⋮ de
  cada fila suma **Overview**, que lleva a la ficha. Si el paciente tiene foto (subida en su ficha), se ve en el avatar
  de la tabla y de Recent Patients. Las tres cosas, como en red.dev (CON-4080).
- **Para el dev:** `PersonCell` suma `photo`; `lib/usePhoto.ts` suma `fotoGuardada` y `clavePacienteFoto` (la misma
  clave que guarda la ficha). Decisiones en `patients.md` (2026-11-06). Storybook sin actualizar (pendiente de que
  Julián lo pida).

### Location: Insurance Defaults y bloqueos de desactivación ([#127](https://github.com/JulianGerardi/red-dental-studio/pull/127))
- **Settings → Locations → Insurance Defaults** (pestaña nueva, `?type=insurance-defaults`, epic CON-1173): Billing
  Provider (CON-3894), Rendering Provider (CON-3896), PPO Write-offs y aviso de no contratado (CON-4030), Place of
  Service (CON-3898) y autorización de nuevos subscribers (CON-3899), con los valores iniciales de CON-4029 y un solo
  **Save changes** al final. Perfiles y providers se eligen en un drawer abierto desde una card (**Select / Change**);
  los opcionales se quitan con la ✕.
- **Bloqueos**: un Billing Profile de Location (CON-4032) o un Primary Provider (CON-4031) elegido en los defaults de
  alguna Location no se desactiva; el aviso lista *Location — Setting* con links a esos defaults.
- **Para el dev:** datos en `data/insuranceDefaults.ts`; el store `billingProfilesStore` suma `defaultsDe`,
  `guardarDefaults`, `providerElegible`, `perfilElegible` y `referencias` (`guardarPrimario` puede devolver
  `'bloqueado'`). Componente `settings/LocationInsuranceDefaults.tsx` con `BloqueoDefaults`. `ConfirmDialog` suma
  `hideCancel`. Semilla: Sarah Stone es Primary Provider y está en los defaults de Bayside. e2e en
  `tests/insurance-defaults.e2e.ts`. Decisiones en `insurance-defaults.md`. Storybook sin actualizar.

### Working Hours: elegir días no los vincula y Open exige horas ([#126](https://github.com/JulianGerardi/red-dental-studio/pull/126))
- **Settings → Locations → Working Hours** (CON-1546): sale *Apply change to* (*All linked days*): elegir días aplica
  las horas en esta operación, no los vincula. Activar Open en un día cerrado abre **Set working hours** y el día queda
  Open recién al guardar (Cancel lo deja Closed). Save guarda todas las franjas en todos los días elegidos; Edit hours
  abre con las del día; validaciones de CON-1546. Cerrar un día vacía sus franjas, con Undo.
- **Para el dev:** `LocationHoursModal` pasa a `onGuardar(dias, rangos)` (antes un solo rango) y suma `iniciales`. El
  switch ya no abre el día: lo hace el Save. Decisiones en `locations.md` (2026-11-06). Storybook sin actualizar.

### Insurance: buscar, borrar y crear suscripciones como red.dev ([#124](https://github.com/JulianGerardi/red-dental-studio/pull/124))
- **Subscription Information**: el buscador es el de personas de la app. Cada resultado es una card con suscriptor,
  número de suscripción, carrier y plan, y busca en los cuatro datos. Sin elegir, la card va con guiones y **Manage
  Subscription** queda deshabilitado. Elegida: plan, estado y el tacho para **borrar** (CON-3282). Si tiene patient
  insurances, sale el error *Failed to delete subscription*; si no, pide confirmar.
- **Patient Information**: **Coordination Order se calcula** (primer orden libre entre los planes activos) y se va el
  select duplicado. Save suma el plan a la tabla.
- **New Subscription** (CON-3284): Carrier Name → Plan Name encadenados, Subscriber ID y Coverage Start obligatorios,
  aviso *Uncompleted fields*, fechas validadas y sin duplicados de suscriptor + plan. La nueva queda elegida. Sin Notes.
- **Menú del paciente**: Relationships & Billing pasa del ícono `Ban` a `Handshake`.
- **Para el dev:** `PersonSearchField` suma `nombre` y `texto` (qué nombre mostrar y dónde buscar). `SearchField` suma
  `emptyText` y `clearable`. Datos nuevos en `data/insurance.ts`: `SUSCRIPCIONES` (`enUso` bloquea el borrado),
  `etiquetaSuscripcion` y `PLANES_POR_CARRIER`. `ManageSubscriptionModal` recibe `suscripcion` y `NewSubscriptionModal`
  recibe `paciente`, `existentes` y `onCreada`. e2e en `tests/insurance.e2e.ts`. Decisiones en `insurance.md` y
  `patient-dashboard.md` (2026-11-06). Storybook sin actualizar.

### Rooms: cada turno afectado se edita aparte ([#125](https://github.com/JulianGerardi/red-dental-studio/pull/125))
- Al desactivar una sala con turnos, cada uno lleva **Edit appointment**: abre el drawer de la agenda y cambiarle el
  Operatory a otra sala activa lo saca de los afectados. **Confirm** cancela los que quedan y los pasa a la lista de
  espera (CON-1520).
- **Para el dev:** `NewAppointmentModal` suma `operatorios` (opciones del select Operatory). Turnos de ejemplo en horas
  en punto. Decisión en `locations.md` (2026-11-06). Storybook sin actualizar.

### Rooms de la locación con la lógica de red.dev ([#123](https://github.com/JulianGerardi/red-dental-studio/pull/123))
- **Settings → Locations → Rooms** (CON-404, CON-1520): misma caja que Working Hours, con switch *Active* / *Inactive*
  en la fila, *Edit room* y tacho. New Room pide Name* y Type* (Abbreviation pasa a opcional) y avisa el nombre
  repetido. Desactivar una sala con turnos los lista y los pasa a la lista de espera; apagar la última activa se pregunta.
- **Para el dev:** `Sala` (`data/location-detail.ts`) suma `activa` y `turnos`, con tipos en `TIPOS_SALA`;
  `NewRoomModal` recibe `nombresUsados` y `onGuardar(sala)`; `SwitchOpenClose` acepta `labels` y `label`. La pestaña
  de la locación va en la URL (`?type=rooms`). Decisiones en `locations.md` (2026-11-06). Storybook sin actualizar.

### Ficha del turno: Weight en vez del Height repetido ([#122](https://github.com/JulianGerardi/red-dental-studio/pull/122))
- La ficha flotante que abre un turno del Dashboard repetía **Height** en las dos medias filas (venía del Figma). Ahora
  la primera es **Weight** ("154 lb", ícono de pesa) y la segunda **Height** ("5 ft 8 in"), como en red.dev (CON-4072).
- **Para el dev:** sólo cambian los datos de ejemplo de `FILAS_DOBLES` en `dashboard/PatientDetailsPopover.tsx` (la
  key pasa a ser el label). Decisión en `dashboard.md` (2026-11-06). Storybook sin actualizar (pendiente de que Julián
  lo pida).

## 2026-11-04

### Calendarios con año editable y Country Code con todos los países ([#121](https://github.com/JulianGerardi/red-dental-studio/pull/121))
- **Todos los calendarios**: el año del encabezado se escribe (↑/↓ suma o resta uno); ya no hace falta ir con las flechas.
- **Country Code** en toda la app (Guardian, Settings, finanzas): los **245 países** con su **bandera**, de la A a la Z y con
  buscador por nombre o código. Formato "(+54) Argentina"; un valor viejo ("+1") se muestra como su país.
- Los selects abren **hacia arriba** si abajo no entran (también las sugerencias del buscador de personas).
- Guardian: el resumen de *Contact Information* muestra el teléfono aunque esté incompleto.
- **Para el dev:** `CountryCodeField` (`patients/form.tsx`) reemplaza a `SelectField label="Country Code"` y ya no recibe
  `options`. `SelectField` suma `icono` y `buscable`. Datos en `src/data/paises.ts` (`PAISES_TEL`, `paisDe`, `codigoDe`);
  bandera en `ui/country-flag.tsx`. Dependencia nueva `country-flag-icons`; `vite.config` no incrusta sus SVG en el JS.
  Detalle en `patients.md` (2026-11-04). Sin Storybook todavía.

### New Patient: Guardian para menores, como en 2.0 y con desplegables ([#120](https://github.com/JulianGerardi/red-dental-studio/pull/120))
- **CON-2858.** El paso **Guardian** (pestaña en Edit Patient) aparece sólo si el paciente es **menor de 18** y en el alta es
  obligatorio (*This patient is a minor and must have at least one guardian assigned.*). Adulto: General → Demography.
- Guardian: buscador de personas del sistema (elegida, no se le piden datos) o **Add New Person**, con sus datos en tres
  desplegables con resumen: *Personal Information* (abierto), *Contact Information* y *Address Information* (cerrados;
  se abren solos si falta algo). Después, *This person is also a guarantor* y *Relationship to Patient* (relaciones de 2.0).
- General: primero *Use this option only to link a person…*, después los datos y la cuenta del portal debajo del email.
  **Interpreter Required pasa a Demography.**
- **Para el dev:** pieza nueva `CollapsibleFields` (`patients/form.tsx`). `DatosPaciente` pierde `guardian` y suma
  `guardianNuevo`, `gFirst…gZip` y `guardianGarante`. `useFormPaciente(inicial, { portalVinculado, guardianMenor, nacimiento })`
  devuelve `menor` y `secciones`; `limpiarPaciente(d, menor)`. `PersonSearchField` ahora tiene `aria-label`. Detalle en
  `patients.md` (2026-11-04). Sin Storybook todavía.

### Billing Profile: Primary Provider con Save, textos más cortos y carriers de la A a la Z ([#119](https://github.com/JulianGerardi/red-dental-studio/pull/119))
- **CON-4004 / CON-4007.** *Is a Primary Provider* vuelve a aplicarse con el **Save** de la ficha (revierte lo del #118):
  la pestaña *Insurance / Billing Profile* aparece al guardar en Yes. Guardarlo en No pregunta **Deactivate Primary
  Provider?** (Cancel · Deactivate); el Cancel del pie descarta.
- Perfil inactivo: el aviso queda sólo con *This billing profile is inactive and cannot be edited.* Credenciales: *Tax
  identification type* y *number* en la misma fila. Alta de Location: sin *The profile is enabled only after you save.* ni
  *The location keeps operating*; *Complete the information…* pasa a `Alert` warning.
- Mock: 31 carriers nuevos en `ASEGURADORAS` (36, de la A a la Z) para ver Contracted With completo con su scroll interno.
- **Para el dev:** en `Employees.tsx`, `toggles.primario` es borrador y `guardar()` aplica `guardarPrimario` (con
  `ConfirmDialog` si se apaga). `CamposCredenciales`: el select de tipo lleva `sm:col-start-1`. Detalle en
  `billing-profile.md` (2026-11-04). Sin Storybook todavía.

## 2026-11-03

### Insurance / Billing Profile en Location y provider ([#118](https://github.com/JulianGerardi/red-dental-studio/pull/118))
- **CON-4021 · CON-4026 · CON-4027 · CON-4028.** Location suma la pestaña *Insurance / Billing Profile*: el switch *Use this
  Location as a Billing Provider* abre la configuración (NPI y TIN/SSN obligatorios) y se habilita con *Save and enable*.
  Activo: nombre editable, *Replace* de dirección/teléfono, drawer *Billing credentials* y *Contracted With*. Apagarlo
  pregunta y lo deja de lectura; reactivar conserva los contratos.
- **CON-4004 · CON-4005 · CON-4006 · CON-4007.** *Is a Primary Provider* (Provider Info) se aplica al switchear: prender crea
  o reactiva el perfil y muestra la pestaña; apagar pregunta y lo deja de lectura. Nombre, NPI y TIN/SSN de lectura.
- **CON-4033.** *Contracted With* lista los carriers de Settings › Billing; el que no tiene relación cuenta como *Not
  contracted*, así que uno nuevo aparece solo.
- **Para el dev:** nuevos `settings/BillingProfile.tsx` (piezas compartidas), `LocationBillingProfile.tsx`,
  `ProviderBillingProfile.tsx` y el store `data/billingProfilesStore.tsx` (`BillingProfilesProvider` envuelve Settings).
  `Toggle` suma `ariaLabel`. Cada card guarda por separado y salir con cambios pregunta. e2e en
  `tests/billing-profile.e2e.ts`. Detalle en `billing-profile.md`. Sin Storybook todavía.

### Relationships: sin archivado, Delete con confirmación y Contact sólo cuando falta ([#117](https://github.com/JulianGerardi/red-dental-studio/pull/117))
- **CON-4000.** Se retiraron Archive/Reactivate, el filtro `Active | Archived`, la pill *Archived* y el aviso de relación
  archivada en Add Relationship (las historias de archivar están canceladas).
- **CON-3999.** Vuelve *Delete relationship* con confirmación (*This action cannot be undone.*, Cancel / Delete en rojo).
  Borrado físico: el toast no ofrece Undo.
- **CON-3174.** Add Relationship pide el paso **Contact** con persona nueva o con una existente sin teléfono/dirección (email
  precargado); si ya los tiene, el drawer queda en Person · Relationship y la card usa su contacto.
- **Para el dev:** `MenuAcciones`/`PersonaCard` usan `onEdit`/`onDelete`; `RelationshipDialogs.tsx` suma
  `DeleteRelationshipDialog` y saca `ArchiveRelationshipDialog`, `ReactivateRelationshipDrawer` y `RelacionArchivada`;
  `AddRelationshipDrawer` ya no recibe `archivadas`/`onReactivar`. `PersonaDirectorio` suma `telefono` y `direccion`
  opcionales. Detalle en `relationships.md` (2026-11-03). Sin Storybook todavía.

## 2026-11-02

### Clinical Mode: una sola card de Informed Consent y Back del consentimiento vuelve al historial ([#116](https://github.com/JulianGerardi/red-dental-studio/pull/116))
- **CON-4052.** Al pasar de un caso a otro en el rail se apilaba una card de Informed Consent más (el bloque y la vista del
  caso compartían la misma `key`). Ahora hay **una sola card por caso**; versiones y consentimientos de cada procedimiento
  viven en Consent history (el reloj).
- Si un consentimiento se abre desde el Consent history, **Back vuelve a ese drawer**; desde la columna Consent o Sign now
  sigue volviendo al caso.
- **Para el dev:** el `ConsentBlock` lleva `key="consentimiento-<id>"`. `ConsentBlock` acepta `historial` / `onHistorial`
  (controlado desde `TreatmentPlanSection`; sin ellos funciona solo, como en las stories) y
  `abrirConsentimiento(id, desdeHistorial)`. Detalle en `clinical-mode.md` (2026-11-02). Sin Storybook todavía.

### New Patient: vincular a una persona que ya existe en el sistema ([#115](https://github.com/JulianGerardi/red-dental-studio/pull/115))
- En el paso General, *Use this option only to link a person that already exists in the system* cambia nombre,
  nacimiento y email por el buscador **Person\*** (empleados, contactos y suscriptores; quien ya es paciente no aparece).
  Al guardar, el paciente toma los datos de la persona elegida. Sin historia propia en Jira (relacionada: CON-2858).
- **Para el dev:** `src/data/personas.ts` es nuevo (`PERSONAS_SISTEMA`); `DIRECTORIO` se mudó ahí y
  `AddRelationshipDrawer` lo reexporta. `CamposGeneral` suma la prop opcional `vinculo` (sólo New Patient) y
  `PersonSearchField` suma `emptyText`. e2e nuevo: `tests/new-patient.e2e.ts`.

### Clinical Mode: el bloque Informed Consent con las firmas en su propia fila ([#114](https://github.com/JulianGerardi/red-dental-studio/pull/114))
- **CON-4052.** En el bloque Informed Consent de un caso, el título con su estado queda arriba con los íconos de historial
  y menú ⋮ a la derecha, y **Patient y Provider van en una fila propia debajo**, con el nombre siempre visible (antes se
  escondía con la card angosta). Mismo orden en escritorio y celular.
- **Para el dev:** `ConsentBlock.tsx` ya no usa `@container` ni el `sr-only @5xl:not-sr-only` de `FilaFirma`; las firmas
  van en un `span` con `basis-full`. Detalle en `clinical-mode.md` (2026-11-02). Sin Storybook todavía.

### Clinical Mode: acciones del procedimiento según su estado, columna Consent y firma del consentimiento ([#113](https://github.com/JulianGerardi/red-dental-studio/pull/113))
- **CON-4052.** El menú ⋮ de un procedimiento muestra, oculta o deshabilita Edit, Start, Complete, Refer, Discard,
  Discontinue y Delete según su estado y el del plan (Treatment Plan, Unassigned y Procedures del Overview). Start y
  Complete quedan deshabilitados, con tooltip, mientras el plan se planea (Planning, Pending, Presented) o espera el
  consentimiento; un plan descartado, cancelado o vencido sólo deja Edit.
- **Columna Consent** en las tablas de procedimientos (plan aceptado en adelante): abre el consentimiento del
  procedimiento (Not generated, Not sent, Pending, Signed, Not required).
- **Start y Complete** pasan por *Consent required*. **Sign now lleva a la pantalla del consentimiento** (ya no abre un
  drawer); con las dos firmas se confirma el cambio, y Back lo deja como estaba. Complete va directo al consentimiento
  (ya no pasa por *Complete Procedure*).
- **Pantalla del consentimiento** como red.dev: documento a todo el ancho y Patient Signature / Provider Signature en un
  **pop up de portal** (`ui/dialog`, excepción a "pop ups = drawer": representa una página externa).
- **Historial (el reloj)**: una sola línea de tiempo con el consentimiento del caso y el de cada procedimiento.
- **Para el dev:** `src/components/clinical/accionesProcedimiento.tsx` (matriz `accionesDe(estado, contexto)`, `ItemsAcciones`,
  diálogos Edit / Refer / Discard / Discontinue / Delete) y `ConsentDetail.tsx` (pantalla, `FirmaPaciente`, `FirmaProveedor`)
  son nuevos; `useFlujoConsentimiento` ahora recibe `onFirmar(ids, verbo)` para llevar al detalle. `EstadoCaso` suma
  In progress, Cancelled y Expired; `Procedimiento` suma `consentimiento`, `firmas`, `rubricas`, `nota`. Rollback ya no
  existe para procedimientos. Las variantes del prototipo son datos reales (casos c5 y c9, Unassigned); `?consent=<id>`
  abre el consentimiento de un procedimiento. Detalle en `clinical-mode.md` (2026-11-02). Sin Storybook todavía.

## 2026-10-30

### Insurance llena el alto del menú y scrollea adentro ([#112](https://github.com/JulianGerardi/red-dental-studio/pull/112))
- Insurance había quedado desactualizada frente a Treatments, Ledger y Documents (2026-10-25): scrolleaba la página
  entera y el menú del paciente se iba con ella. Ahora la tabla de planes y los dos paneles de abajo llenan el alto
  que deja el menú y scrollean adentro, igual que esas tres pantallas.
- De paso, **"Manage Subscription" baja al piso de su card** para quedar a la misma altura que Cancel/Save del
  panel de al lado.
- **Para el dev:** `src/pages/patients/Insurance.tsx` suma el wrapper `flex flex-col` y el mismo truco de
  `lg:relative/flex-1` + `lg:absolute/inset-0/overflow-y-auto` de `Treatments.tsx`; el botón Manage Subscription pasa
  de `mt-5` a `mt-auto`. Nuevo e2e en `tests/patient-dashboard.e2e.ts`. Detalle en `insurance.md` (2026-10-30).

## 2026-10-29

### Clinical Mode: el panel del examen estira el fondo hasta Findings ([#111](https://github.com/JulianGerardi/red-dental-studio/pull/111))
- En los exámenes (Extra Oral, Intra Oral, DentAssmt, los "Planned") el panel de la derecha quedaba corto frente a la
  lista de Findings y dejaba ver el gris de la página debajo. Ahora las dos columnas se estiran a la altura de la más
  alta y el fondo de cada panel (blanco, o el punteado de Extra/Intra Oral) llega hasta el borde.
- **Para el dev:** `ExamLayout` pasa de `lg:items-start` a `lg:items-stretch` y envuelve `children` en un `div
  flex-1`; `RegionExam`, `DentalAssessmentExam` y el `enConstruccion` de `ClinicalMode` suman `h-full`. Vitals
  (sin columna de Findings) no cambia. Detalle en `clinical-mode.md` (2026-10-29).

### Treatment Plan: Estimate details desde el Total Amount ([#110](https://github.com/JulianGerardi/red-dental-studio/pull/110))
- **CON-3710 / CON-2529.** El *Total Amount* del caso y el *Total amount* de las cards del Overview de Clinical Mode
  abren **Estimate details**: cinco totales y el desglose por visita y procedimiento (Amount charged, Allowable amount,
  Coverage %, Copayment, Deductible applied, Insurance portion, Insurance adjustment, Patient portion).
- Estados: Not calculated, Up to date, Update needed, Updating…, Update failed y Locked. Sólo se calcula en Planning
  (actualiza todas las alternativas del grupo); mover un procedimiento de visita la deja desactualizada y el caso
  muestra *Ins. est. update available*, que confirma con el modal de CON-2529.
- **Para el dev:** `components/clinical/EstimateDetails.tsx` (`EstimateDetails`, `PrototypeControls`, `situacionDe`,
  `estimacionEditable`) y `data/estimaciones.ts` (cálculo **mock** por categoría del CDT; el real es el de CON-2041).
  **`PrototypeControls` es de demo y no va a producto.** `PlanCard` pasa a `div` con un botón que la cubre y otro encima
  para el total. El `total` de cada caso ahora sale de la suma de sus fees. Storybook sin actualizar. Detalle en
  `clinical-mode.md` (2026-10-28).

### Clinical Mode: la tabla del Overview flota; Patient Dashboard termina en Address ([#109](https://github.com/JulianGerardi/red-dental-studio/pull/109))
- **Clinical Mode, Overview:** la Problem List / Procedures ya no va fija debajo del chart: se abre flotando desde el botón
  *View Problem List* (ícono de tabla), el mismo y en el mismo lugar que en los exámenes. La pantalla entra sin scroll en
  ventanas de ~1080px de alto.
- **Patient Dashboard:** la pantalla termina donde termina Address (el alto lo da el menú del paciente). Pending documents,
  Pending Task y Appointments scrollean adentro con alto fijo y cierran en la misma línea; Appointments ya no lleva
  "Show N more" desde `lg`, carga al scrollear.
- **Para el dev:** pieza nueva `ProblemListFlotante` (`components/clinical/ProblemListFlotante.tsx`), que `ExamLayout` y
  el Overview comparten. En `PatientDetail.tsx` la columna del medio es `lg:relative` con el contenido en `lg:absolute
  inset-0` y la fila lleva `lg:min-h-[56rem]`. Los e2e que usaban la tabla del Overview abren primero *View Problem
  List*. Storybook sin actualizar. Detalle en `clinical-mode.md` y `patient-dashboard.md` (2026-10-29).

### Pending Task/documents: vuelve el alto fijo, no salta al cambiar de tab ([#108](https://github.com/JulianGerardi/red-dental-studio/pull/108))
- Revierte el punto de "sin espacio en blanco" del PR anterior: cambiar de tab hacía crecer o achicar la card según
  cuántos ítems traía esa categoría. Pending Task y Pending documents vuelven al alto fijo del 2026-10-25 -se
  reparten el alto que deja el menú, sin acomodarse al total-, combinado con la carga al scrollear sin botón.
- **Para el dev:** `ui/show-more` pierde el modo de `cargarAlScroll` sin `llenarAlto` que se había sumado para esto
  (nadie más lo usaba); vuelve a tener sentido sólo junto con `enCaja` + `llenarAlto`, como en #105. Detalle en
  `patient-dashboard.md` (2026-10-29).

### Pending Task: tabs en vez de Filter; sin tab Activity; sin espacio en blanco ([#107](https://github.com/JulianGerardi/red-dental-studio/pull/107))
- Pending Task (Dashboard y Patient Dashboard) filtra por tipo con **tabs** en vez del Filter -vuelve el camino que
  el Dashboard había dejado por el embudo (2026-08-28)-. Pending documents cambia sus tabs de *All/Patient/Office* a
  **Overdue / Due this week / Later**, las mismas categorías que ya agrupaban la lista.
- Sale el tab *Pending Task / Activity* del Patient Dashboard (nunca tuvo una vista de Activity armada): el tab de
  tipo queda solo, a la derecha del título.
- Pending Task y Pending documents ya no fuerzan su alto al de Appointments: miden lo que pide su contenido, sin
  espacio de más, y recién pasado un alto máximo (~640px) entra el scroll interno.
- **Para el dev:** `ui/show-more` suma un modo de `cargarAlScroll` sin `llenarAlto` -sin alto fijo del que tirar,
  monta todas las filas de una (nada de tandas) y cap en `maxHeight`-; antes sólo tenía sentido junto con
  `llenarAlto`. `PendingDocuments` pierde la prop `llenar`. Detalle en `dashboard.md` y `patient-dashboard.md`
  (2026-10-29).

## 2026-10-28

### Pending documents: la misma funcionalidad de scroll que Pending Task ([#106](https://github.com/JulianGerardi/red-dental-studio/pull/106))
- El **Show more** de Pending documents se veía mal (no se notaba que había más cards). Ahora tiene la misma
  funcionalidad que Pending Task: sin botón, la caja arranca scrolleable y carga el resto sola al acercarse al final.
- **Para el dev:** `PendingDocuments.tsx` suma `cargarAlScroll={llenar}` a su `ShowMore` (mismo condicional que ya
  usaba `enCaja`/`llenarAlto`/`filas`). No hay prop ni componente nuevo: es la pieza de `ui/show-more` que se armó
  para el PR anterior. Detalle en `patient-dashboard.md` (2026-10-28).

### Patient Dashboard: Pending Task filtra por tipo y carga al scrollear ([#105](https://github.com/JulianGerardi/red-dental-studio/pull/105))
- Pending Task del Patient Dashboard suma el mismo **Filter** por tipo que ya usa el Dashboard (checkboxes Clinical
  Note / Lab Orders / Prescriptions / Referrals, nada tildado muestra todo), junto a los tabs Pending Task / Activity.
- La lista ya no tiene botón **"Show N more"**: la caja arranca scrolleable y, al acercarse al final, suma otra tanda
  de tareas sola, hasta mostrarlas todas.
- **Para el dev:** `ui/show-more` suma la prop `cargarAlScroll` (sólo tiene sentido junto con `enCaja` + `llenarAlto`);
  por ahora sólo la usa `PendingTaskList` del Patient Dashboard (`PatientDetail.tsx`) — Pending documents y el Pending
  Task del Dashboard siguen con el botón. El mock `TASKS` de `PatientDetail.tsx` pasa de ser las 9 tareas "Referrals"
  a repartirse entre los cuatro tipos. Detalle, anomalía de Jira anotada y qué validar con usuarios en
  `patient-dashboard.md` (2026-10-28).

### Extraoral e Intraoral: sin región elegida no se carga nada; New Procedure va a la región ([#104](https://github.com/JulianGerardi/red-dental-studio/pull/104))
- Como en red.dev: en Extra Oral e Intra Oral, Add Condition y Add Procedure sin región elegida en el gráfico no
  abren el drawer y avisan "Select at least one area on the chart to add a condition/procedure." (texto provisorio:
  no se pudo copiar el de red.dev).
- Add Procedure en esos exámenes ya no abre el New Procedure de diente: muestra las regiones elegidas como chips, sin
  alcance por diente ni Surfaces, y guarda el área de tratamiento Extra Oral / Intra Oral. Si se sacan todas las
  regiones dentro del drawer, no deja guardar.
- Se va "Not Localized" (lo pedían CON-1398/CON-1401; conflicto anotado en `clinical-mode.md`, 2026-10-28). La card
  del finding ya no muestra "Descriptors:" vacío.
- **Para el dev:** `ExamLayout` suma la prop `regiones` (`RegionesElegidas`) y `NewProcedureDrawer`, `regiones` /
  `onRemoveRegion`. Storybook sin actualizar (pendiente de que Julián lo pida).

### Edit Finding: el nombre sin el ícono del diente, que ya va en la fila del área ([#103](https://github.com/JulianGerardi/red-dental-studio/pull/103))
- En el Edit Finding de una condition en un diente, la fila del nombre ya no repite el ícono del diente: va una sola
  vez, en la fila **Tooth** que encabeza la rueda. Los tres Edit muestran ahora sólo nombre y estado arriba.
- **Para el dev:** `FilaNombre` (`clinical/dental/DatosHallazgo.tsx`) ya no recibe `alcances`; el ícono del área se
  pinta sólo con `FilaArea`. Anomalía (el Figma sí lo pone) en `clinical-mode.md` (2026-10-28). Storybook sin
  actualizar (pendiente de que Julián lo pida).

## 2026-10-27

### Las pestañas suben la mitad de lo que crece el panel al desplegarse ([#102](https://github.com/JulianGerardi/red-dental-studio/pull/102))
- Con la card de Patients abierta todo quedaba muy abajo y la pestaña de Confibot caía lejos. Ahora la columna del
  borde derecho sube la mitad de lo que crece el panel (siempre dentro de la ventana): en 1440×900 con Patients
  abierto, la pestaña de Confibot queda en y=637 en vez de 814.
- **Para el dev:** sólo `layout/DockFlotantes.tsx` (`top = baseY - crecimiento/2`). Documentado en `help.md`; Storybook
  sin actualizar (pendiente de que Julián lo pida).

### Confibot: el botón abre y cierra, con ícono de colapsar, y la hoja sin cruz desde md ([#101](https://github.com/JulianGerardi/red-dental-studio/pull/101))
- El ítem Confibot del sidebar abre y cierra el chat; activo muestra `PanelRightClose` (colapsar) en vez de `Bot` y el
  tooltip del rail dice "Hide Confibot".
- La cruz de la hoja de Confibot sólo queda en celular (`md:hidden`): desde md cierran el ítem del sidebar, la pestaña
  azul, Escape o clic afuera.
- **Para el dev:** `layout/Sidebar.tsx` y `help/Confibot.tsx`; `tests/confibot.e2e.ts` cierra con el sidebar en vez
  de la cruz. Detalle en `design-reference/figma/modulos/help.md` (2026-10-27). Storybook sin actualizar (pendiente
  de que Julián lo pida).

### El banner de avisos colapsado dice "pending notifications" ([#100](https://github.com/JulianGerardi/red-dental-studio/pull/100))
- Colapsado, el banner decía "4 pending tasks"; ahora dice "4 pending notifications" ("1 pending notification" en
  singular). Quedó afuera de lo publicado antes.
- **Para el dev:** sólo el texto en `NotificationBanner.tsx`. Documentado en `notifications.md`; la story del banner
  (`NotificationBanner.stories.tsx`) todavía dice "pending tasks" -Storybook sin actualizar, pendiente de que Julián lo
  pida-.

### Confibot: la pestaña azul queda pegada a la de Patients y la hoja se despliega abajo ([#99](https://github.com/JulianGerardi/red-dental-studio/pull/99))
- Con el chat abierto, la pestaña azul de Confibot ya no baja al final de la columna: queda pegada abajo de la de
  Patients (como en el default) y la hoja se despliega abajo de ella, así el botón de cerrar no se aleja. La card de
  Patients sigue empujando a la pestaña de Confibot hacia abajo.
- **Para el dev:** sólo cambia el orden de los hijos de `DockFlotantes` en `AppShell` (Patients, pestaña de Confibot,
  hoja de Confibot). `tests/confibot.e2e.ts` ajustado al nuevo orden. Documentado en `help.md`; Storybook sin
  actualizar (pendiente de que Julián lo pida).

### Clinical Mode: los Edit con el orden del mockup y "Edit Finding" también en el diente ([#98](https://github.com/JulianGerardi/red-dental-studio/pull/98))
- Los datos de arriba van en este orden: nombre con su estado → Creation date → Fee (sólo procedimientos) → Exams →
  Provider → el área de tratamiento al final, con su ícono en el cuadrado azul (CON-3700).
- El drawer de una condition en un diente se titula **Edit Finding** (antes "Edit Condition"): una condition
  cargada siempre es un finding. La fila **Tooth · "20 · Permanent"** es la cabecera de la card de la rueda de
  superficies; se fueron el título "Selected Area" y la cabecera interna.
- Edit Finding (diente y Extraoral/Intraoral) separa **General Information** y **Descriptors** en pestañas
  (`ui/tabs`), como Edit Procedure.
- **Para el dev:** el componente sigue llamándose `EditConditionDrawer` (sólo cambia el título); el área de
  tratamiento se lee con `areaDeTratamiento(finding)` y se pinta con `FilaArea` (`clinical/dental/DatosHallazgo.tsx`).
  Detalle en `design-reference/figma/modulos/clinical-mode.md` (2026-10-27). Storybook sin actualizar (pendiente de
  que Julián lo pida).

### Confibot y "currently being seen": columna en el borde derecho, como en las capturas ([#97](https://github.com/JulianGerardi/red-dental-studio/pull/97))
- Los dos recogidos viven ahora en una columna pegada al borde derecho. **Default:** las dos pestañas una abajo de
  la otra (Patients arriba, Confibot abajo). **Abrir Patients:** la card se despliega abajo de su pestaña y empuja a
  la de Confibot. **Abrir Confibot:** la hoja queda entre la pestaña de Patients (arriba) y la de Confibot (abajo de
  todo). Nada se pisa. Los paneles crecen en alto con una microanimación (~260ms, también al cerrar) y la columna se
  corre para arriba si no entra; el chevron de la pestaña gira al abrir.
- Recogido pasa a ser el estado por default en los dos (antes arrancaban como círculo arrastrable).
- **A validar:** el círculo arrastrable sigue en el código pero desde la pestaña no hay un clic para volver a él. Si
  ya no hace falta, se puede sacar (arrastre, botón de esconder, `useArrastrable`).
- **Para el dev:** `layout/DockFlotantes.tsx` (`DockFlotantes` + `PanelDock`); `AppShell` arma la columna con
  `PatientInSessionPopup`, `Confibot` y `ConfibotLanzador` en ese orden. Lo recogido se dibuja estático adentro de la
  columna (no `fixed`); lo demás no cambia. `tests/confibot.e2e.ts` reescrito para este flujo. Sin cambios de
  Storybook (la story de `PatientInSessionPopup` se ve recogida por el nuevo default hasta que se documente).
  Documentado en `help.md`.

### Confibot y "currently being seen": la hoja/card no tapa al otro flotante ([#96](https://github.com/JulianGerardi/red-dental-studio/pull/96))
- Al abrir Confibot, la pestaña de "currently being seen" quedaba encima de la hoja. Ahora cada flotante avisa el
  lugar que ocupa cerrado y la hoja/card del otro recorta su alto para no cruzarlo (8px de margen, mínimo 200px): con
  los dos en su lugar por default, el botón de Patients queda a la vista arriba de la hoja de Confibot.
- **Para el dev:** `altoSinPisar` y `RectFlotante` en `lib/useArrastrable.ts`; `ConfibotLanzador` y
  `PatientInSessionPopup` suman `onRect` y reciben `evitar` vía `AppShell` (props opcionales, Storybook compila sin
  cambios). El `z-[41]` de Patients queda de respaldo. Documentado en `help.md`; Storybook sin actualizar (pendiente
  de que Julián lo pida).

### Pestaña recogida: se queda al abrir y la hoja/card sale acoplada al borde ([#95](https://github.com/JulianGerardi/red-dental-studio/pull/95))
- Con Confibot o "currently being seen" recogidos en la pestaña del borde, abrir ya no los trae de vuelta al círculo:
  la pestaña se queda (chevron al revés y nombre a la vista) y la hoja o card sale pegada al borde derecho, arriba de
  la pestaña (abajo si la pestaña está en la mitad de arriba de la pantalla). Otro clic en la pestaña, Escape o un
  clic afuera la cierran.
- **A validar:** desde la pestaña ya no hay un clic para volver al círculo arrastrable. Propuesta si hace falta: un
  control chico en el encabezado ("Pin to screen").
- **Para el dev:** `Confibot` suma `acoplada` y `ConfibotLanzador` suma `onCerrar` (opcionales, Storybook compila sin
  cambios); `onTraer` ahora sólo abre el chat. El botón de la pestaña lleva `data-confibot-toggle`. En
  `PatientInSessionPopup` la lista se extrajo a `detalle` y se reusa en la card acoplada. `tests/confibot.e2e.ts`
  actualizado (la pestaña se llama "Open Confibot" / "Hide Confibot chat"). Documentado en `help.md`; Storybook sin
  actualizar (pendiente de que Julián lo pida).

### Confibot: la hoja no se sale de la pantalla y cierra con Escape o clic afuera ([#94](https://github.com/JulianGerardi/red-dental-studio/pull/94))
- Con el botón cerca de la mitad de la pantalla, la hoja de chat se iba por arriba y el botón de cerrar quedaba
  fuera de vista. Ahora el alto se achica al lugar libre (margen de 8px) y la lista de mensajes scrollea por dentro.
- La hoja cierra con Escape o con un clic afuera, como la card de "currently being seen". Ojo: un borrador sin
  enviar se pierde si se cierra así (lo ya enviado se guarda).
- **Para el dev:** el ítem *Confibot* del menú lateral lleva `data-confibot-toggle` para quedar excluido del clic
  afuera (su clic ya hace toggle). Documentado en `help.md`; Storybook sin actualizar (pendiente de que Julián lo
  pida).

### Confibot: el chat abre donde está el botón, no siempre abajo a la derecha ([#93](https://github.com/JulianGerardi/red-dental-studio/pull/93))
- La hoja de chat de Confibot ya no abre siempre en el mismo rincón fijo: abre anclada a donde esté el botón
  (arrastrado o no), creciendo hacia el lado con más lugar en pantalla, igual que la card de "currently being
  seen". En celular sigue siendo la hoja de abajo a todo el ancho.
- Como ahora puede abrir en cualquier parte, puede terminar pasando por donde está la pestaña de "currently being
  seen" (las dos caen cerca del borde derecho por default). Si se cruzan, "currently being seen" queda siempre
  visible y tocable arriba del chat, en vez de taparse del todo.
- **Para el dev:** `ConfibotLanzador` avisa su posición (`onPosicion`) y `AppShell` se la pasa a `Confibot`; las
  dos props son opcionales, Storybook sigue compilando sin tocar `Confibot.stories.tsx` (ahí la hoja sigue
  cayendo en el rincón fijo de siempre). `PatientInSessionPopup` sube de `z-30` a `z-[41]`. Documentado en
  `help.md`; Storybook sin actualizar (pendiente de que Julián lo pida).

### Confibot: cerrar el chat ya no remonta el botón; ícono y tooltip de esconder más claros ([#92](https://github.com/JulianGerardi/red-dental-studio/pull/92))
- Al cerrar el chat de Confibot, el círculo volvía a aparecer con la animación de "entra deslizándose desde el
  borde" cada vez. Ahora reaparece quieto en el mismo lugar, igual que la pestaña de "currently being seen".
- El botón de esconder (la flechita chica) cambia de una flecha simple a un ícono de "colapsar panel lateral", con
  un tooltip ("Tuck away" / "Hide") para dejar claro que esconde el widget a un costado, no lo cierra. Mismo cambio
  en los dos widgets.
- **Para el dev:** `ConfibotLanzador` suma una prop `oculto` -se queda montado pero sin dibujarse mientras el chat
  está abierto, en vez de que `AppShell` lo desmonte-, así no pierde la posición arrastrada ni reanima la entrada.
  Documentado en `help.md`.

### Pestaña recogida de Confibot y "currently being seen": ícono, un clic para abrir ([#91](https://github.com/JulianGerardi/red-dental-studio/pull/91))
- La pestaña escondida de los dos widgets ya no muestra el nombre siempre: va un ícono, y el nombre aparece recién
  al pasar el mouse. Al traerla de vuelta entra deslizándose desde el borde (no aparece de golpe ni se despliega
  desde un círculo), y ese mismo clic ya abre el chat o el popup -antes hacía falta un segundo clic sobre el botón
  de reposo-.
- **Para el dev:** de paso se corrigió un bug de `useArrastrable` (de la tanda anterior, #90): la posición por
  default se guardaba ya en el primer montaje, así que Confibot dejaba de apilarse arriba del FAB de "Appointment
  requests" en Scheduling (lo tapaba) apenas se visitaba cualquier otra pantalla antes. Ahora sólo persiste si ya
  había una posición guardada o si se arrastra de verdad. Documentado en `help.md` y `patients.md`; Storybook sin
  actualizar (pendiente de que Julián lo pida).

## 2026-10-26

### Confibot y "currently being seen": arrastrables, círculo en reposo, esconder al costado ([#90](https://github.com/JulianGerardi/red-dental-studio/pull/90))
- Los dos widgets flotantes se arrastran con mouse o touch a cualquier parte de la pantalla (se guarda la posición,
  no vuelve sola). En reposo son un círculo completo; abiertos (la card de "currently being seen", la hoja de
  Confibot) siguen con esquinas redondeadas. Confibot muestra sólo el ícono, sin el texto que aparecía al hover.
- Los dos se pueden esconder a una pestaña angosta pegada al costado derecho, a la altura donde se dejaron (antes
  Confibot se escondía pegado abajo; "currently being seen" no tenía esta opción).
- **Para el dev:** `useArrastrable` (nuevo, en `lib/`), compartido entre `ConfibotLanzador` y
  `PatientInSessionPopup`: pointer events, clampeado a la ventana, posición en localStorage. Cada componente maneja
  su propio estado de "recogido" (no comparten código ahí). Documentado en `help.md` y `patients.md`; Storybook sin
  actualizar (pendiente de que Julián lo pida).

### El título de la pestaña dice Confidentally ([#89](https://github.com/JulianGerardi/red-dental-studio/pull/89))
- La pestaña de la app decía `red-clone` (el nombre de la carpeta). Ahora dice `Confidentally`, como el sidebar.
- **Para el dev:** sólo `<title>` en `index.html`. Storybook no cambia: su pestaña sigue con el título que le pone
  Storybook por cada página.

### Favicon de la marca en la app y en Storybook ([#88](https://github.com/JulianGerardi/red-dental-studio/pull/88))
- La pestaña del navegador mostraba el rayo violeta por defecto de Vite. Ahora lleva la marca del sidebar (ícono
  `GalleryVerticalEnd` blanco sobre `#1a4da9`), en la app y en Storybook.
- **Para el dev:** `public/favicon.svg` cambia y se suman `public/favicon-32.png` y `public/apple-touch-icon.png`;
  `index.html` los enlaza. Storybook suma `staticDirs: ['../public']` y los PNG en `manager-head.html`. El título de la
  pestaña no cambia. Storybook sin actualizar (no hay stories nuevos).

## 2026-10-25

### Pending documents: la card llena su parte del alto, con "Show N more" y el scroll adentro de la lista ([#87](https://github.com/JulianGerardi/red-dental-studio/pull/87))
- Igual que Pending Task en el #85: las dos cards del centro del Patient Dashboard se reparten el alto que deja el menú,
  muestran las filas que entran enteras y *Show N more* abre el resto con scroll adentro, sin que la card crezca (antes
  Pending documents crecía y empujaba a Pending Task).
- **Para el dev:** `PendingDocuments` suma `llenar`; `ShowMore` con `filas` mide con la fila más alta de las dibujadas.
  Storybook sin actualizar.

### Tablas: el desplegable ya no lleva View full record ([#86](https://github.com/JulianGerardi/red-dental-studio/pull/86))
- El pie del detalle de una fila sale en Problem List, Procedures, Treatment Plan, Ledger y Billing: el desplegable ya
  tiene toda la información. En el Ledger queda sólo Apply credit. Sigue en el menú de los tres puntos de cada finding.
- **Para el dev:** `DetalleRegistro` y `DetalleMovimiento` / `LedgerRowDetail` pierden la prop `onVerTodo`; se elimina
  `VerRegistroCompleto` (`ui/detail-list`). Se pierde el atajo de un cargo de procedimiento del Ledger a Clinical Mode.

### Pending Task: la card llena el alto, con "Show N more" y el scroll adentro de la lista ([#85](https://github.com/JulianGerardi/red-dental-studio/pull/85))
- En el #84 Pending Task (Patient Dashboard) había pasado a mostrar todas sus tareas sin botón. Ahora la card sigue
  llenando el alto que deja el menú (sin hueco en blanco), muestra las tareas que entran enteras y *Show N more* abre
  el resto con scroll adentro de la lista, sin que la card crezca, como Appointments.
- **Para el dev:** `ShowMore` suma `filas` (selector de la fila, junto a `llenarAlto`, para listas agrupadas);
  `PendingTaskList` suma `llenarAlto`. En `PatientDetail.tsx` el mock de tareas pasa de 6 a 9 para que el botón exista.
  Treatments sigue sin *Show N more*. Storybook sin actualizar.

### Patient: Documents, Treatments y Ledger cierran al pie del menú; Pending Task y Treatments, completos y con scroll adentro ([#84](https://github.com/JulianGerardi/red-dental-studio/pull/84))
- Documents, Treatments y Ledger terminaban antes que el menú del paciente. Ahora la card de contenido llega al mismo
  nivel (Documents y Ledger con el pie de paginación abajo de la card).
- Pending Task (Patient Dashboard) y Treatments muestran todo de entrada, sin *Show N more*; la lista scrollea adentro de
  la card y, en Treatments, con un degradé abajo. Pending documents conserva su *Show 2 more*.
- **Para el dev:** `DataTable` suma la prop `llenar` (estira la tabla y deja el pie abajo, desde `lg`). Pending Task y
  Treatments usan un contenedor `lg:relative` con la lista en `lg:absolute lg:inset-0 overflow-y-auto`, así el alto de la
  fila lo sigue mandando el menú. Treatments ya no usa `ShowMore`. El e2e `patient-overview` pasa a esperar un solo
  *Show N more* y las 6 tareas. Storybook sin actualizar.

### Dashboard: la fila del turno no se rompe al expandir el menú lateral ([#83](https://github.com/JulianGerardi/red-dental-studio/pull/83))
- Con el menú expandido la lista de Appointments mide 381px, 3px por debajo del corte de 384px (`@sm`), y la fila saltaba de 86 a 139px: el provider
  ocupaba el renglón del medio y el botón (Check In / Check Out) quedaba solo en un cuarto renglón. Ahora el botón sube al renglón de Check In y los
  chips, y el provider queda último: 109px expandido; colapsado no cambia.
- **Para el dev:** una clase en `AppointmentRow` (`DashboardRows.tsx`): `order-last … @sm:order-none` en el provider; sólo afecta el layout angosto.

### Patient Dashboard: las tres columnas cierran al mismo nivel ([#82](https://github.com/JulianGerardi/red-dental-studio/pull/82))
- Pending Task (columna del medio) terminaba ~180px antes que el menú del paciente y Appointments, que llegan hasta el
  final de la página. Ahora la card llena el alto que le sobra y las tres columnas cierran juntas, como en la app de red.
- **Para el dev:** `PatientDetail.tsx`, la card de Pending Task suma `flex-1` (sólo crece; en celular no cambia nada).
  Documents, Treatments y Ledger tienen el mismo desnivel y no se tocaron. Storybook sin actualizar.

### La página termina a ras: sin el hueco de ~110px al final del scroll ([#80](https://github.com/JulianGerardi/red-dental-studio/pull/80))
- Comparado con la app de red, al final de cada página quedaban ~137px vacíos (en red, ~16px). Era la reserva de alto
  para el botón de Confibot, que desde que el contenido deja una columna a la derecha ya no hace falta en pantallas
  desde 640px. Ahora la página termina a 24px, igual que el padding de los costados; en celular se conserva la reserva.
- **Para el dev:** `AppShell`, `main`: `pb-24 sm:pb-28` pasa a `pb-24 sm:pb-0`. El botón de Confibot puede quedar sobre
  el padding interno de la última card (no tapa texto ni controles en las pantallas revisadas). Decisión en
  `figma/README.md` → Responsive (2026-10-25). Storybook sin actualizar.

## 2026-10-24

### Clinical Mode: Extraoral e Intraoral con el gráfico del Figma, Edit drawers y buscadores ([#79](https://github.com/JulianGerardi/red-dental-studio/pull/79))
- **Extraoral e Intraoral** muestran el PNG del Figma sin ninguna región marcada (`RegionDiagram`, base común;
  `ExtraOralDiagram`, `IntraOralDiagram` nuevo) con una zona clickeable por región. El SVG propio de #78 se descarta.
  La pestaña Intra Oral deja de ser placeholder (`IntraOralExam`, y `RegionExam` como examen común). Sin región
  elegida, Add Condition carga como "Not Localized".
- **Edit Procedure / Edit Condition / Edit Finding** con el diseño del Figma: `EditFindingDrawer` elige el drawer según
  el finding (procedimiento, condition en un diente, condition sin diente). Edit Finding suma Notes y Treatment Area
  (CON-2770). `DescriptorFields` pasa a control segmentado en toda la app. Pie: Cancel a la izquierda, Save a la derecha.
- **Buscadores**: `ui/search-picker` (`SearchPicker`, nuevo): nada hasta escribir, resultados en cards en un desplegable,
  lo vinculado en una card azul. En New Procedure el buscador es independiente de la lista del catálogo.
- **Para el dev:** `Finding.fee?` (Fee de Edit Procedure, de `precioUcr()` en `data/finanzas.ts`), `INTRAORAL_REGIONS`,
  token `--color-region-active`. `RegionConditionDrawer` recibe regiones como `string[]`. Storybook sin actualizar en
  esta tanda: las historias que eligen de una lista van a tener que escribir en el buscador.
- **Pendiente:** nombres del resto de las zonas del Intraoral, la rueda de superficies del Figma (BC/B/D/M/P/PC/O) vs.
  la nuestra, y los assets limpios de red.dev para reemplazar la reconstrucción de los PNG.

### Clinical Mode: guía visual de descriptores y Extraoral con gráfico de regiones ([#78](https://github.com/JulianGerardi/red-dental-studio/pull/78))
- **Guía visual de descriptores** (`DescriptorFields`, nuevo): doce filas de una sola elección —Quantity, Symmetry,
  Size, Shape, Borders, Colors, Surface, Consistency, Mobility, Pain, Bleeding, Exudate—, tomadas de la app real
  (grabaciones de pantalla en Extraoral e Intraoral). Se eligen al crear una condition (paso *Descriptors* en Add
  Condition) y se corrigen después desde Edit Finding, ya precargadas. Add/Edit Procedure no cambia.
- **Extraoral** deja el placeholder genérico: `ExtraOralDiagram` (gráfico de 4 vistas de cabeza, SVG propio, 7
  regiones clickeables con multi-selección) y `RegionConditionDrawer` (Add Condition por región, no por diente;
  catálogo de condición propio —Atrophy, Blister, Abscess—, con la misma guía de descriptores como paso 2).
- **Para el dev:** `Finding` suma `kind?: 'procedure' | 'condition'` y `descriptors?: Record<string, string>`.
  `ExamLayout` suma `onCondicion?: () => void` (reemplaza el `NewProcedureDrawer` genérico por el drawer propio de un
  examen) y el hook `useFindingsEstado`. `DrawerActions` suma `nextLabel` opcional (default "Next Step", no cambia
  ningún otro drawer).
- **Pendiente, sin inventar:** los límites exactos de cada región del gráfico (sin fuente vectorial real), el
  catálogo completo de condiciones de Extraoral/Intraoral, y si la card de un finding debería mostrar la condition en
  negrita como la app real (afectaría a todos los exámenes). Ver `figma/modulos/clinical-mode.md` (2026-10-22 y
  2026-10-24).

### Docs: Storybook al final de la tanda y la lógica de la app linkeada a Jira ([#76](https://github.com/JulianGerardi/red-dental-studio/pull/76))
- **Storybook al final.** Documentar en Storybook consume mucho crédito: ahora se hace como último paso, cuando Julián lo
  pide, después de que la app esté aprobada y publicada. Antes de eso sólo va la sección con fecha del `.md` del
  módulo. El "subilo" publica la app; el Storybook tiene su propio "subilo" al final. Sin cambios de código: `ds:check`
  sigue corriendo en el deploy con `continue-on-error`.
- **Jira.** La lógica de la app (reglas de negocio, estados, flujos) está en el proyecto `CON`; las historias de abril
  de 2026 son las más detalladas. Las del label `design-system` son de diseño y no se usan. Cada `.md` de módulo trae
  un bloque **Jira** con sus epics e historias, e `design-reference/jira.md` los indexa.
- **Para el dev:** sólo `CLAUDE.md`, `design-reference/jira.md` (nuevo) y el bloque **Jira** en
  `design-reference/figma/modulos/*.md` y en `design-reference/figma/README.md`. El mapeo historia → módulo salió de los
  títulos: si una historia quedó en el módulo equivocado, corregirla en `jira.md` y en el `.md` del módulo.

### Patients y toda la app: achicar el margen de la pestaña "Currently being seen" ([#77](https://github.com/JulianGerardi/red-dental-studio/pull/77))
- El margen que reserva `AppShell` para que la pestaña flotante no tape kebabs ni filas reales (PR #73) pasa de 64px a
  24px: los 64 se sumaban por encima del padding propio de la página en vez de contarlo, y dejaban una franja vacía a
  la derecha mucho más ancha que cualquier otro margen de la app.
- **Para el dev:** `AppShell.tsx`, `sm:pr-16` → `sm:pr-6` en el `<main>`. No se tocó `PatientInSessionPopup`.

## 2026-10-22

### New/Edit Patient según el Figma nuevo, archivar y reactivar relaciones, buscador de persona en desplegable ([#75](https://github.com/JulianGerardi/red-dental-studio/pull/75))
- **New Patient:** tres pasos General → Guardian → Demography; Guardian y Demography son opcionales y siempre están.
  **Edit Patient** (menú de la tabla y lápiz del dashboard del paciente): pestañas con los datos precargados y **Save Changes**
  desde cualquier sección; cambiar de pestaña no guarda; si falla algo en otra sección se marca la pestaña y se lleva al campo.
  New Patient ya no trae *Link a person that already exists* ni *Select Person* (el Figma nuevo no los dibuja). Las anomalías del
  Figma y cómo se resolvieron están en `modulos/patients.md`.
- **Relationships (CON-3958):** *Delete relationship* pasa a **Archive relationship** (no borra: queda en Archived); reactivar desde
  un drawer de revisión; Add Relationship avisa si ya hay una archivada (*Open reactivation*); Edit Relationship pide confirmar
  *Remove Guardian access*; filtro **Active / Archived** en la pantalla.
- **Buscador de persona:** las sugerencias flotan en un desplegable pegado al input y la elegida lleva una ✕ para quitarla.
- **Para el dev:** `NuevoPaciente` → `DatosPaciente` (store) y `usePatients().datosDe(id)`; `components/patients/PacienteCampos.tsx`
  (secciones + `useFormPaciente`), `pages/patients/EditPatientModal.tsx` nuevo, `NewPatientModal` pierde `title`/`forceGuardian`/`editId`;
  `components/patients/RelationshipDialogs.tsx`; `MenuAcciones` usa `onArchive`/`onReactivate` en vez de `onDelete`. Nuevos:
  `ui/section-notice`, `Tabs.alerta`, `Drawer.tabs`, `DateField.valorInicial`.

## 2026-10-20

### New Procedure: vincular un finding o un diagnóstico pide un procedimiento ya cargado ([#74](https://github.com/JulianGerardi/red-dental-studio/pull/74))
- El drawer de Add Procedure/Add Condition guardaba todo junto al final (Procedure, Surfaces, Link to finding, Link to
  diagnosis), así que nada quedaba cargado hasta terminar los cuatro pasos, aunque vincular pide un procedimiento que
  ya exista.
- Ahora el paso de Procedure (y Surfaces, si el procedimiento va en superficie) termina en **Save**: guarda el
  procedimiento ahí mismo, sin vínculos. Recién con eso guardado **aparecen** los pasos Link to finding y Link to
  diagnosis, para vincularlo. Existing sin superficie sigue igual (un solo paso, Save).
- **Para el dev:** `NewProcedureDrawer` separa `onSave` (crea el procedimiento y devuelve su id) de `onLink` (guarda
  `linked`/`diagnoses` sobre ese id, sin crear uno nuevo). Quien lo use tiene que devolver el id en `onSave` y pasar
  `onLink`.

### Buscar una persona se ve igual en toda la app, y la sombra del pie del drawer que no se disparaba ([#72](https://github.com/JulianGerardi/red-dental-studio/pull/72))
- **Buscar una persona** (Patient y Provider de New Appointment, Select Person de New Patient, Select Subscriber y
  Dependent Patient de Insurance) ya no es un menú flotante con una línea de texto: las sugerencias y la elegida son
  cards con avatar y hasta dos líneas de datos (DOB, email…), borde azul y un visto al elegir — el diseño de Add
  Relationship → Select person, ahora compartido. De paso corrige dos bugs en Select Subscriber (rótulo "Plan name"
  mal copiado, y la card de la elegida se mostraba siempre aunque no se hubiera elegido a nadie).
- **`ui/drawer`:** la sombra que avisa "seguís con scroll" (agregada el 2026-10-19) nunca se disparaba con ningún
  alto de ventana: el `ResizeObserver` se armaba con la ref del contenido todavía en `null`. Arreglado con ref por
  callback (`useState` en vez de `useRef`).
- **Para el dev:** `patients/form.tsx` suma `PersonSearchField` (junto a `SearchField`, con la prop `lineas`);
  `AddRelationshipDrawer` ahora lo usa en vez de tener su propio bloque de búsqueda. `ui/drawer` cambia
  `scroll`/`contenido` de `useRef` a `useState` + `ref={setScroll}`/`ref={setContenido}`.

### Margen reservado en AppShell para que "Currently being seen" no tape contenido en tablet ([#73](https://github.com/JulianGerardi/red-dental-studio/pull/73))
- Auditoría UX en tablet: la pestaña fija de "quién está en el sillón" (`PatientInSessionPopup`, borde derecho,
  centrada verticalmente) quedaba encima de kebabs, badges y filas reales en ocho pantallas (Dashboard, Patients,
  Patient Dashboard, Insurance, Ledger, Settings → Locations, Notifications, Help), porque de 640 a ~1500px el
  contenido llega hasta ese mismo borde.
- **Para el dev:** `AppShell` suma `sm:pr-16` al `main` -mismo mecanismo que ya reserva `pb-24 sm:pb-28` para
  Confibot-, así ningún panel o tabla llega nunca hasta donde flota la pestaña. No se tocó `PatientInSessionPopup`.

### El banner amarillo, borde sólo abajo ([#71](https://github.com/JulianGerardi/red-dental-studio/pull/71))
- `border` (las cuatro caras) pasa a `border-b`: arriba, a la izquierda y a la derecha el aviso ya está pegado al
  header, al rail y al borde de la ventana, así que esas caras no necesitan línea propia.

### El banner amarillo sin esquinas redondeadas, y colapsable ([#69](https://github.com/JulianGerardi/red-dental-studio/pull/69))
- Sin `rounded-lg`: con el aviso ya de punta a punta y sin padding, las esquinas redondeadas no correspondían.
- Nuevo: una flecha para **colapsar el aviso entero** a una tira angosta con el total ("4 pending tasks"), que se
  vuelve a abrir con un clic. Es distinto de la X que ya existía, que sólo oculta la tarea puntual que se esté
  mostrando (sigue sin leer en la campana); la flecha nueva no toca ninguna tarea, sólo el estado visual del aviso.
- **Para el dev:** `NotificationBanner` suma estado local `colapsado` (`useState`, no persiste entre sesiones);
  `ChevronUp` junto a la X cuando está abierto, tira con `ChevronDown` cuando está colapsado.

### Salas: más aire entre el encabezado y la primera card de la línea ([#70](https://github.com/JulianGerardi/red-dental-studio/pull/70))
- Al desplegar una sala, la primera card quedaba pegada a la línea que separa el encabezado de la línea del día; ahora hay 12px.
- **Para el dev:** `LineaDelDia` (`OperatoryCard.tsx`): `pt-1` pasa a `pt-3`.

## 2026-10-19

### Patients y Billing: la barra lateral termina a la altura de la tabla, sin hueco ni disparejo ([#68](https://github.com/JulianGerardi/red-dental-studio/pull/68))
- Recent Patients (Patients) y Find Patient (Billing) ya no adivinan un número fijo de filas: toman el alto medido de
  la columna de la tabla y muestran las que entren completas ahí, sin dejar hueco ni pasarse.
- **Para el dev:** `ui/show-more` suma `llenarAlto` (sólo junto con `enCaja`, sólo en el panel `flex-1` de verdad: mide
  la primera fila + `ResizeObserver` en vez de usar `limit` fijo). `children` tiene que devolver las filas sueltas, no
  envueltas en un único contenedor (`<ul>`). Piso de `min-h-[220px]` para cuando la tabla es muy corta.

### Pending Task con el diseño de Pending documents, Pending documents primero y salas con color ([#67](https://github.com/JulianGerardi/red-dental-studio/pull/67))
- **Pending Task** (Dashboard y Patient Dashboard) toma el diseño de Pending documents: grupos por tipo, filas en una caja
  con divisores y, en cada una, ícono del tipo, pills *Requested* y *Expired date*, vencimiento, documento y *Complete this
  Task*. En el Patient Dashboard, **Pending documents va primero** y Pending Task abajo.
- **Las salas vuelven a tener el color de su estado** (verde, azul, rojo) sobre el acordeón.
- **Para el dev:** `PendingTaskList` nuevo; `TaskRow` (`DashboardRows.tsx`) rehecho y sin `DocYVencida`; `OPERATORY_SURFACES`
  vuelve a `OperatoryCard.tsx`. `PatientDetail.tsx` usa `PendingTaskList` y cambia el orden de los dos bloques.

### El banner amarillo, sin el tope de ancho de la página ([#66](https://github.com/JulianGerardi/red-dental-studio/pull/66))
- Ajuste sobre el PR #62: el banner amarillo medía lo mismo que el `max-w-[1400px]/1800px` de `ANCHO_PAGINA` (el
  mismo tope que el título y las cards), así que en pantallas muy anchas seguía con aire a los costados en vez de ir
  de punta a punta de verdad. Ahora mide el 100% de la columna de contenido (sidebar aparte).
- **Para el dev:** `NotificationBanner` deja de usar `ANCHO_PAGINA`; es un único `<div role="status" className="w-full …">`, sin wrapper.

### Billing y Patients: título pegado al buscador ([#65](https://github.com/JulianGerardi/red-dental-studio/pull/65))
- Find Patient (Billing) y Today Appointments / Recent Patients (Patients): el encabezado del panel baja de 52 a 40px y
  el cuerpo arranca sin padding arriba. Today (Billing) usa la medida de las cards compactas de Patients.
- **Para el dev:** se aplica con `[&>header]:min-h-10` y `pt-0` en esos paneles (`TITULO_PEGADO` en `Billing.tsx`);
  `Panel` no cambia.

### Billing: todo a la vista sin scroll ([#63](https://github.com/JulianGerardi/red-dental-studio/pull/63))
- Find Patient muestra 3 pacientes y "Show N more" abre el resto con scroll adentro; Today pasa a filas compactas y las
  5 cards de arriba llevan menos padding. La tabla de Recent Billing Activity muestra 8 filas por página (antes 15).
- **Para el dev:** `Stat` suma la prop `compacta`; `BuscarPaciente` usa `ui/show-more` con `LIMITE_PACIENTES = 3`; el
  tamaño de página es `PAGINA_ACTIVIDAD = 8`. El e2e de Billing espera `Showing 1 to 8 of 21 entries`.

### Dashboard: anillo de sala, Patients today variable y Waiting Room filtrada sin hueco ([#60](https://github.com/JulianGerardi/red-dental-studio/pull/60))
- El anillo azul de la sala elegida ya no se corta contra el borde del scroll al elegir Operatory 1 (la primera de la
  tira). "Patients today" vuelve a variar por sala (12/10/4) en vez del número fijo e igual en las seis. Elegir una
  sala ya no repite su nombre en cada fila de Waiting Room (el chip del título ya lo dice) y el panel filtrado abraza
  sus filas en vez de dejar un hueco blanco enorme debajo.
- En New Appointment, paso 1: con poco alto de ventana el último campo quedaba cortado contra el pie sin ningún aviso.
  Arreglado en `ui/drawer` (vale para todos los drawers): el pie lleva una sombra elevada mientras el paso siga con
  scroll.
- New Appointment: las sugerencias de Patient y de los dos Provider llevan una segunda línea (fecha de nacimiento y
  email del paciente; email del provider), que antes faltaba.
- **Para el dev:** `OperatoryStrip` suma `scroll-p-1.5`; `dashboard-data.ts#salas()` recibe un array de números en vez
  de uno fijo; `AppointmentRow` suma la prop `ocultarOperatorio`; el wrapper de Waiting Room en `Dashboard.tsx` agrega
  `self-start` con sala elegida; `Drawer` mide con `ResizeObserver` si falta contenido por ver; `SearchField` suma la
  prop opcional `subtext` (sin ella no cambia nada para sus otros usos).

### El banner amarillo sin padding arriba ni a los costados ([#62](https://github.com/JulianGerardi/red-dental-studio/pull/62))
- El aviso de tareas pendientes va pegado al header y a los bordes del contenido de la página (antes tenía
  `px-4 pt-4 sm:px-6`). El ancho y el orden interno no cambiaron.
- **Para el dev:** `NotificationBanner` — el wrapper de `ANCHO_PAGINA` pasa a `px-0 pt-0`.

### Dashboard: salas como acordeón, Waiting Room independiente y fila de tres que entra en la pantalla ([#64](https://github.com/JulianGerardi/red-dental-studio/pull/64))
- **Rooms** pasa a ser la tercera de tres columnas, con el diseño del artifact: tocar una sala despliega la línea del
  día de esa sala (hora, paciente, motivo, profesional, Complete / Upcoming) y ya no filtra la Waiting Room. "Patients
  today" es la cantidad de turnos de la sala.
- **Waiting Room independiente**, con su propio Filter por operatorio.
- **Fila de tres que entra en la pantalla desde 1280px:** Appointments, Waiting Room y Rooms toman el alto de la ventana
  y scrollean adentro; abajo de 1280px sigue como antes. **Pending Task va abajo, a todo el ancho**, y su fila muestra
  el estado (Requested) en una pill debajo del tipo.
- **Para el dev:** `OperatoryStrip` se borra; `OperatoryList` + `OperatoryCard` (`turnos`, `abierta`, `onToggle`,
  `onSelect`) y `LineaDelDia`. `Panel` suma `scroll`; hook `useAltoRestante`. `TaskRow` usa `StatusPill` para el estado. `Appointment.motivo` (mock). `AppointmentRow`
  baja TR/CC junto a Check In con `@sm`. El e2e del Dashboard se reescribió (ya no hay Show more a 1440px).
  Además, `tests/scheduling-linked-visit.e2e.ts` busca las sugerencias por el comienzo del nombre: la segunda línea que
  sumó #60 las había roto.

### Dashboard: tocar un turno abre la ficha flotante ([#61](https://github.com/JulianGerardi/red-dental-studio/pull/61))
- La fila del turno (Appointments y Waiting Room) abre la ficha del paciente flotando al lado, como la card; antes sólo
  el nombre. El botón de acción, el kebab y los links no la abren. La ficha es la del Figma `4430:57474`, ya existente.
- **Para el dev:** `AppointmentRow` (`DashboardRows.tsx`) suma `onClick` en `[data-appt-row]` que llama a `onSelect`;
  ignora clics dentro de `button, a, [role=menu], [role=menuitem]`. El botón de acción hace `stopPropagation`.

### Patients: el scroll de Today Appointments y Recent Patients queda adentro de la caja ([#59](https://github.com/JulianGerardi/red-dental-studio/pull/59))
- Al abrir "Show N more", la lista ya no agranda el panel: mide lo mismo que cerrada y scrollea adentro, así la barra no
  se sale de la grilla de la tabla.
- **Para el dev:** `ShowMore` suma `enCaja`; lo pasan los dos paneles de `pages/Patients.tsx`. El resto de las listas
  conserva el crecimiento hasta `min(70vh, 640px)`.

### Clinical mode: ConfirmProcedureDialog y ClinicalNoteDialog pasan a ConfirmDialog ([#58](https://github.com/JulianGerardi/red-dental-studio/pull/58))
- Los dos rearmaban `Dialog` a mano (botones propios, colores sin token) en vez de usar `ui/confirm-dialog`, el patrón
  que ya sigue el resto de la app para una pregunta de sí/no. No es un pop up nuevo, es la corrección de dos piezas que
  no seguían el sistema ya definido.
- **Para el dev:** mismas props y comportamiento externo en los dos componentes. En `ConfirmProcedureDialog`
  (`clinical/dental/`) el checklist de condiciones vinculadas va como children de `ConfirmDialog`. En
  `ClinicalNoteDialog` (`ClinicalTopBar.tsx`), cerrar con Esc o clic afuera ahora también cuenta como "Remind me later".
  *Elements / ConfirmDialog* suma una fila en Specs › Where.

### Detalle del Ledger y Billing más corto, con un solo "View full record" ([#57](https://github.com/JulianGerardi/red-dental-studio/pull/57))
- En el detalle de una fila: los pies **View procedure / View payment / View adjustment** pasan a **View full record**,
  igual que en Procedures y en los findings. Se van **Adjustment reason** (ya es el título), **Payment methods** y las
  frases explicativas de debajo de Financial details y de las aplicaciones.
- **Para el dev:** `LedgerRowDetail` usa `VerRegistroCompleto` (`ui/detail-list`) y pierde `Motivo` y `MetodosDePago`. El
  e2e de Ledger busca ahora *View full record*.

### Billing: sin los saldos del garante ni la columna Balance ([#56](https://github.com/JulianGerardi/red-dental-studio/pull/56))
- Con un paciente elegido se van *Guarantor Unapplied Credits* y *Guarantor Open Balance*, y la tabla pierde la columna
  Balance (también el campo Balance del detalle de la fila y de *View full record*): son de la cuenta en todas las
  locations y la pantalla filtra por una. *Find Patient* sigue mostrando el Balance de cada paciente: queda a decidir.
- **Para el dev:** `ActividadReciente` pierde `creditos` y `saldo`; Billing pasa `saldo: undefined` al detalle y al
  registro completo. `creditosNoAplicados` y `saldoDe` quedan en `data/billing.ts` sin uso en la tabla.

### Patients: Today Appointments con el nombre como link ([#55](https://github.com/JulianGerardi/red-dental-studio/pull/55))
- El nombre de cada fila de *Today Appointments* lleva directo a la ficha del paciente, como ya hacía *Recent
  Patients*. El kebab sigue igual (Edit, Go to appointment).
- **Para el dev:** `AppointmentCardCompacta` (`dashboard/AppointmentCard.tsx`) pasa el nombre a `Link`; el id sale de
  `slug(appt.name)`, ahora exportado de `data/patientsStore.tsx` (el turno no trae el id del paciente). *Recent
  Patients* ya mostraba sólo 10 con scroll interno desde el 13 de octubre, no se tocó.

### Dashboard: la sala vuelve a ser opcional y quedan las salas con scroll horizontal ([#54](https://github.com/JulianGerardi/red-dental-studio/pull/54))
- Se deshace lo de #50 salvo el scroll: sin sala elegida por defecto; tocar una filtra sólo la Waiting Room y tocarla de
  nuevo (o el chip ✕) la suelta. Appointments muestra todas las salas y recupera su Filter. "Patients today" vuelve al 12
  fijo del dato. Se conserva la tira en una fila con scroll horizontal.
- **Para el dev:** `OperatoryStrip` `onElegir(sala | null)` (toca la elegida para soltar); `Dashboard.tsx` recupera `salas`
  y `salaEspera`. Datos: Operatory 6 Available y un turno de Sofia Chen en Operatory 4 se mantienen.

### Overview: el chart de DentAssmt de sólo lectura y Treatment Plan hasta abajo ([#53](https://github.com/JulianGerardi/red-dental-studio/pull/53))
- El chart del Overview de Clinical Mode es el mismo de DentAssmt, sin controles, con lo mismo cargado. La pieza de la
  última condición queda resaltada; la última condición cambia al cargar otra con Add Condition y *Show details* lleva
  al examen donde se cargó. Treatment Plan llega hasta el final de la tabla en desktop. Las caries oclusales salen en rojo.
- **Para el dev:** `OdontogramaOverview` / `OdontogramaLectura` (`clinical/OdontogramaOverview.tsx`),
  `dental/estadoOdontograma.ts` (estado compartido de la librería), `useUltimaCondicion()` en `ExamLayout`, `llena` en
  `TreatmentPlanList`. `Odontogram` ya no se usa en la app (queda en el Builder).

### La flecha de desplegar, en toda fila que se despliega ([#52](https://github.com/JulianGerardi/red-dental-studio/pull/52))
- El Ledger y Ledger Transactions (Patient Payment, Credit Adjustment, Post Payment) se desplegaban sin flecha; Billing,
  Problem List y Treatment Plan la tenían. Ahora todas llevan la misma flecha al inicio y el detalle arranca en la primera
  columna. Una fila que navega o abre un drawer sigue sin flecha.
- **Para el dev:** `RowChevron` nuevo en `ui/data-table.tsx`; lo usan DataTable (`rowDetail`), `TablaProcedimientos`,
  el Ledger y `LedgerAllocationTable`. `LedgerRowDetail` suma `sangria`. *Audit / Tables in the app* marca una tabla
  que se despliegue sin flecha.

### Dashboard: sala siempre elegida, "Patients today" que coincide y salas con scroll horizontal ([#50](https://github.com/JulianGerardi/red-dental-studio/pull/50))
- **La sala elegida filtra Appointments y Waiting Room** (antes sólo la sala de espera) y **siempre hay una**, la primera
  por defecto; tocar otra la cambia. El chip junto al título dice cuál. El filtro por operatorio de Appointments sale
  (lo reemplaza la sala); Pending Task conserva el suyo.
- **"Patients today" es la cantidad de turnos de esa sala** (era un 12 fijo): coincide con las cards que se ven.
- **Las salas van en una fila con scroll horizontal** (232px mínimo, snap) en lugar de "Show N more".
- **Para el dev:** `OperatoryStrip` pierde `ShowMore`; `elegida` es la sala mostrada y `onElegir(nombre)` la cambia (sin
  soltar). `Dashboard.tsx` calcula `patientsToday` de `dia.appointments`; se van `salas` (filtro) y `salaEspera`. Datos:
  Operatory 6 Available y un turno nuevo en Operatory 4. e2e en `tests/dashboard.e2e.ts`.

## 2026-10-18

### Topbar: locación, buscador y perfil más chicos ([#51](https://github.com/JulianGerardi/red-dental-studio/pull/51))
- Locación y buscador pasan de 32 a **28px** de alto (texto de 13 y 12px, íconos de 14px) y el botón del perfil de 40 a 32px
  (avatar de 28). La campana ya medía 28; el botón del menú sigue en 32.
- **Para el dev:** `h-7` en `LocationSelector.tsx` y en `GlobalSearch`; `Avatar size={28}` en `MenuCuenta`.

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
