# Cambios

Lo último arriba. Cada PR suma su entrada: qué cambió y qué tiene que saber el dev. El porqué de cada decisión está en
`design-reference/figma/modulos/<módulo>.md`; lo anterior al 2026-10-06, en `git log` y en esos mismos archivos.

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
