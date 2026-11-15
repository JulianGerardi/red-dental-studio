# Documentación en Figma: Screens & Flows

Además del Storybook, todo lo que se diseña en `red-clone` queda documentado en Figma, para que diseño y los devs lo
recorran sin levantar la app. El modelo es la página **🧍 Patients** que armó Julián en *Platform Design*
(`9fYLxX9hlTj5unFthG4bBg`, nodo `4476:138875`): una página por módulo, una sección por flujo y las pantallas del flujo
una al lado de la otra.

- **Archivo:** [Confidentally — Red Dental Studio · Flows](https://www.figma.com/design/TPh6NE9d4skn0BdId26UTR)
  (`TPh6NE9d4skn0BdId26UTR`, equipo *CONFI UI KIT-DS*). Creado el 2026-11-14.
- **Se documenta al final**, junto con el Storybook (paso 7 de *Cómo se trabaja una tanda* en `CLAUDE.md`): cuando la
  app está aprobada y Julián pide documentar.
- **No se dibuja a mano.** Las pantallas se capturan de la app andando y se importan a Figma: así el Figma dice lo
  mismo que el código.

## Parámetros

1. **Una página por módulo**, con emoji y el nombre del módulo, en el orden del menú de la app (tabla de abajo). Si un
   módulo nuevo no entra en ninguna, lleva página propia.
2. **Arriba de la página, el encabezado del módulo** (`Module · <página>`): nombre, resumen en una línea, historias de
   Jira, de dónde se capturó (commit y fecha) y el índice de flujos.
3. **Una sección por flujo**, con el nombre `Módulo — Flujo` ("Patients — New Patient (adulto)"). Un flujo es un
   recorrido completo que alguien hace de principio a fin; las alternativas (menor con guardián, guardián nuevo) van en
   su propia sección.
4. **Cada flujo lleva su guía de happy path**: título, resumen, quién lo usa (chip gris), las historias de Jira con la
   regla de negocio (chips azules; ámbar si no hay historia) y la lista de pasos numerados con lo que hace el usuario y
   lo que responde la app. Está escrita para el dev, en castellano.
5. **Las pantallas van en fila**, de izquierda a derecha, cada una con su número, su nombre, la ruta de la app y una
   nota debajo. Ancho 1512 px (el de la referencia); el alto es el de la pantalla, o el de la página entera cuando
   scrollea.
6. **Auto layout en todo.** Cada frame sale del `flex` o `grid` real de la app; la documentación alrededor también.
   Nada se posiciona a mano salvo lo que en la app es `fixed` (drawers, toasts, flotantes).
7. **Capas con nombre.** La capa se llama como el componente de React (`Topbar`, `DataTable`, `StepIndicator`); si un
   componente de la pantalla envuelve a uno del design system, los dos: `PatientsTable / DataTable`. Los controles
   llevan rol y texto (`Button - New Patient`, `Text Input - First Name`) y los íconos, su nombre de Lucide
   (`Icon - plus`). Lo que no es un componente queda como `Row`, `Column` o `Grid`. Lo que empieza con `Doc /` es
   documentación, no producto.
8. **El contenido es el de la app**: mismos datos de prueba, mismos textos (incluidas las anomalías anotadas en cada
   `.md`). No se inventan pantallas ni estados que la app no tenga.
9. **Cubrir los estados del flujo**: vacío, error de validación, deshabilitado y confirmaciones, además del camino
   feliz.

## Páginas

| Página | Id | Flujos (`scripts/figma/flujos/`) | Decisiones (`figma/modulos/`) |
|---|---|---|---|
| 📕 Cover | `0:1` | `portada.mjs` | este archivo |
| 🔐 Login | `7:3` | `login.mjs` | `login.md` |
| 🧭 Header & Sidebar | `7:4` | `header-sidebar.mjs` | `header-sidebar.md`, `help.md` |
| 🩺 Dashboard | `7:5` | `dashboard.mjs` | `dashboard.md` |
| 🧍 Patients | `7:6` | `patients.mjs` | `patients.md` |
| 💊 Patient record — Overview | `7:7` | `patient-overview.mjs` | `patient-dashboard.md` |
| 🔗 Patient record — Relationships & Billing | `7:8` | `relationships.mjs` | `relationships.md` |
| 🛡️ Patient record — Insurance | `7:9` | `insurance.mjs` | `insurance.md` |
| 💵 Patient record — Ledger | `7:10` | `ledger.mjs` | `ledger.md` |
| 🩹 Patient record — Treatments & Documents | `7:11` | `treatments.mjs` | `treatments.md` |
| 🦷 Clinical Mode | `7:12` | `clinical-mode.mjs` | `clinical-mode.md`, `consents.md` |
| 📅 Scheduling | `7:13` | `scheduling.mjs` | `scheduling.md` |
| 💳 Billing | `7:14` | `billing.mjs` | `billing.md` |
| ⚙️ Settings — Accounts | `7:15` | `settings-accounts.mjs` | `settings-accounts.md` |
| ⚙️ Settings — Locations | `7:16` | `settings-locations.mjs` | `locations.md`, `billing-profile.md`, `insurance-defaults.md` |
| ⚙️ Settings — Employees | `7:17` | `settings-employees.mjs` | `employees.md`, `billing-profile.md` |
| ✍️ Settings — Consent Templates | `7:18` | `settings-consents.mjs` | `consents.md` |
| ⚙️ Settings — Billing & Ledger | `7:19` | `settings-billing.mjs` | `settings-billing.md`, `settings-ledger.md` |
| 🔔 Notifications | `7:20` | `notifications.mjs` | `notifications.md` |
| ❓ Help | `7:21` | `help.mjs` | `help.md` |

Al 2026-11-15: 19 páginas de módulo, 60 flujos y 262 pantallas.

## Cómo se actualiza una página

Con el dev server andando (`npm run dev`, `:5182`) y el conector de Figma.

1. **Definir el flujo** en `scripts/figma/flujos/<módulo>.mjs`: `pagina`, `orden`, `resumen`, `jira` y los `flujos`,
   cada uno con `nombre`, `rol`, `jira`, `resumen` y sus `pantallas`. Una pantalla tiene `nombre`, `nota` (qué hace el
   usuario y qué responde la app), `ruta` si arranca de una URL (sin ella sigue desde la pantalla anterior) y `hacer`,
   los clics para llegar a ese estado (atajos en `flujos/_util.mjs`: `clic`, `escribir`, `llenar`, `menuFila`,
   `pasos`). `alto: 'fijo'` deja la pantalla al alto de la ventana (drawers, calendario, Clinical Mode).
2. **Capturar:** `npm run figma:capturar -- <módulo>` deja en `.figma-capturas/<módulo>/` un HTML por lote
   (`lote-N.html`) y el `manifiesto.json`. El script avisa con ✗ el paso que no pudo dar: se corrige el flujo, no se
   saltea. Sin argumentos captura todos los módulos.
3. **Vaciar la página** del módulo en Figma (borrar sus secciones y su encabezado) con `use_figma`.
4. **Importar** cada lote con `html_to_figma` (`cssSelector: ".fx-frame"`, `nodeId`: el id de la página) y hacer el
   `POST` del HTML a la URL que devuelve. Los lotes de una página se suben en orden.
5. **Ordenar** con `use_figma` y el código de `scripts/figma/ordenar.figma.js` (cambiando `PAGE_ID`): arma las
   secciones y apila todo.
6. **Mirar** una sección con `get_screenshot` y, si cambiaron las cantidades, regenerar la portada
   (`npm run figma:portada`, importar `.figma-capturas/_portada/lote-1.html` en `0:1` y ordenar).
7. **Anotar** en esta tabla la página nueva, si la hay.

## Cómo funciona la captura

- `scripts/figma/capturar.mjs` abre la app con Playwright a 1512 × 1008, da los pasos de cada pantalla y la serializa
  (`scripts/figma/serializar.mjs`) a HTML autocontenido. Alrededor arma la documentación (encabezado, happy path,
  pasos y notas), también en HTML: el importador convierte todo a frames con auto layout.
- **Nombres de capa:** el importador nombra cada frame con su `aria-label`. Antes de serializar, a cada elemento se le
  pone el del componente de React que lo dibuja (leído del árbol de React; sólo componentes de `src/`, sin Radix, el
  router ni los providers).
- **CSS:** las media queries se resuelven al capturar y `vh`/`vw` pasan a variables por pantalla, porque el importador
  tiene otro tamaño de ventana. Lo que no se ve (`display: none`) se quita y lo `sticky` va en su lugar del flujo.
- **Alto:** si la que scrollea es la página, el frame toma su alto completo; si es un panel interno, la ventana crece
  hasta mostrarlo. Con un drawer o un diálogo abierto queda al alto de la ventana.
- **Dibujos pesados** (cada diente del odontograma, los gráficos de Extraoral e Intraoral) van como imagen: en vectores
  serían miles de capas por pantalla.
- Las imágenes van embebidas: el importador no baja recursos externos. `.figma-capturas/` no se versiona.

## Pendiente

- Las piezas de documentación (`Doc / Step header`, `Doc / Chip · Jira`…) son frames con auto layout, no componentes
  de Figma con instancias. Si el archivo va a editarse a mano, conviene pasarlas a componentes.
- Las pantallas no están vinculadas a una library de Figma: son capas, no instancias del UI kit.
- En celular y tablet la app cambia de layout; el archivo documenta el escritorio (1512). Los otros anchos están en el
  Storybook (*Devices*).
