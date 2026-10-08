# Cambios

Lo último arriba. Cada PR suma su entrada: qué cambió y qué tiene que saber el dev. El porqué de cada decisión está en
`design-reference/figma/modulos/<módulo>.md`; lo anterior al 2026-10-06, en `git log` y en esos mismos archivos.

## 2026-10-08

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
