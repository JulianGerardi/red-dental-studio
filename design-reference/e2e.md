# Tests end-to-end (e2e de TesterArmy)

Instalado el 2026-10-05: `e2e` 0.17 y `@e2e-dev/web` 0.12 (Playwright por dentro). Docs:
https://e2e.tester.army/docs, y offline en `node_modules/e2e/docs`.

## Correr

```bash
npm run test:e2e
```

Si el dev server ya está en :5182 lo reusa; si no, lo levanta (`e2e.config.ts`) y lo apaga al terminar. El
reporte queda en `.e2e/report.json` (ignorado en git, como el resto de `.e2e/`).

## Qué hay

- `e2e.config.ts`: un target web a 1440 × 900 contra `http://localhost:5182` (o `APP_URL`).
- `tests/clinical-mode.e2e.ts`: la app abre, y Add Procedure carga un D0120 desde DentAssmt recorriendo los tres
  pasos del drawer hasta el aviso de guardado.
  Desde el 2026-10-08 también Lab Order: Filter por Requested deja 2 de 9, y Cancel order desde el menú de la fila se
  deshace con Undo.
- `tests/consents.e2e.ts` (2026-10-07): en Settings → Consents, Preview abre la hoja en un drawer (Patient View saca
  Diagnosis) y Save desde el preview lo cierra y deja los faltantes a la vista en el editor.
- `tests/billing-settings.e2e.ts` (2026-10-09, rehecho desde red.dev): New Carrier pide lo obligatorio y el buscador
  completa el Payer ID; un plan nuevo se arma en cuatro pasos y sigue en su Coverage Table (Copy from + Save); cambiar de
  pestaña del plan con cambios pide confirmación; Bulk Edit +10% crea una versión nueva; una excepción se arma en cuatro
  pasos; Assignments muestra el desglose y la lista; Compare fees compara contra UCR - Red; Bulk Edit con filas tildadas
  cambia sólo esas.
- `tests/billing.e2e.ts` (2026-10-09): elegir un paciente en Find Patient abre su vista (sólo sus movimientos, los
  botones de pago, Guarantor View con todo su garante) y la X vuelve al resumen; una fila del resumen abre la vista de
  ese paciente en Patient View; el círculo de info de Overdue Balance muestra su texto al pasar el mouse.

- `tests/notifications.e2e.ts` (2026-10-12): el atajo *Last 7 days* acota la lista y la ✕ vuelve a *All dates*; dos
  clics en el calendario arman un rango y, en Unread sin nada en esas fechas, el vacío ofrece *Clear dates*. Las
  fechas se calculan desde hoy, como los datos.
  Desde el 2026-10-13 también: sólo hay *Inbox* y *Unread*, y el ojo de una fila la marca leída o sin leer (Unread de
  8 a 7 y de vuelta).

- `tests/dashboard.e2e.ts` (2026-10-12): el selector de fecha se lee "Feb 28, 2026"; elegir un día cierra el calendario
  y lo cambia; Today vuelve a hoy y se va.
  Con `?day=busy` (35 turnos) se ven cinco; *Show 30 more* abre el resto en una región con scroll y *Show less* la
  cierra (`ui/show-more`).
- `tests/clinical-mode.e2e.ts` (2026-10-13): en DentAssmt, *View full record* del menú del finding Tooth 3 abre su
  registro (Source exam) y el link a D2391 cambia el drawer a ese procedimiento.
- `tests/ledger.e2e.ts` (2026-10-14): el detalle de D4341 muestra su caso, Northgate Clinic y Outstanding transaction
  balance $170; con la búsqueda puesta, el link del pago abre su registro. El de un pago muestra Scope, Payment methods,
  a qué cargos fue y Apply credit. View procedure abre Procedures en Clinical Mode con la fila abierta.
  `tests/billing.e2e.ts` suma: con Maria Abril Viola, la fila del pago dice cómo se pagó y a qué cargo fue, y el link
  abre su registro.
- `tests/treatment-plan.e2e.ts` (2026-10-13): una fila de Unassigned se despliega (No treatment linked, Collapse all), y
  la fila D2391 de Restorative Plan muestra Procedure consent; su hallazgo se abre en el drawer sin salir de Treatment
  Plan.

- `tests/confibot.e2e.ts` (2026-10-13): el botón flotante abre el chat y se esconde mientras está abierto; la flechita
  lo recoge en una pestaña que sigue ahí al cambiar de pantalla y lo trae de vuelta. En Scheduling queda centrado
  arriba del botón de Appointment requests, sin tocarlo.

Los tests usan locators (`screen.getByRole(...)`, `expect(...)`): no llaman a ningún modelo.

## Pendiente: el modelo para los pasos en lenguaje natural

`agent.act('...')` y `agent.assert('...')` necesitan un modelo. Todavía no hay ninguno configurado: se elige uno
(una API key de Gemini, Anthropic u OpenAI, una suscripción de ChatGPT o Copilot, o un modelo local) y se agrega en
`agents.default` de `e2e.config.ts`. La clave va en una variable de entorno, nunca en el repo.

## Notas

- Sin acceso a `cdn.playwright.dev` (sesiones en la nube), el runner no puede bajar su Chromium. Se corre con el que
  ya está instalado apuntando `PLAYWRIGHT_BROWSERS_PATH` a una carpeta con enlaces `chromium-<versión>` y
  `chromium_headless_shell-<versión>` hacia el binario de `/opt/pw-browsers`.

- El CLI manda telemetría anónima de uso (comandos y errores, sin contenido de los tests). Se apaga con
  `npx e2e telemetry disable` o `E2E_TELEMETRY_DISABLED=1`.
- En una sesión en la nube sin salida a `cdn.playwright.dev`, el runner no puede bajar su Chromium (pide la versión
  de su `playwright-core`). Se puede apuntar `PLAYWRIGHT_BROWSERS_PATH` a una carpeta del scratchpad con
  `chromium-<versión>/chrome-linux64` y `chromium_headless_shell-<versión>/chrome-headless-shell-linux64` enlazados
  al Chromium que trae la máquina (`/opt/pw-browsers`).
- No se instalaron la skill de e2e para agentes (`.claude/skills/e2e`) ni su servidor MCP (`.mcp.json`), que
  `npx e2e init` agrega por defecto.
