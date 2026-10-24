# red-clone · Red Dental Studio

Rediseño de la UI de Confidentally (clínicas dentales), guiado por Figma. React 19 + Vite + TypeScript + Tailwind v4 +
shadcn/ui (Radix), con datos mock en `src/data/` (no hay backend). Lo pide y aprueba Julián.

- **Respondé siempre en castellano**: mensajes, preguntas y resúmenes. Los textos de la app siguen en inglés.
- **Carpeta del proyecto: siempre `~/Desktop/Claude/red-clone`.** No trabajar en otras copias
  (`~/Desktop/Claude/red-dental-studio`, ni el viejo `~/red-clone`).
- App publicada: https://juliangerardi.github.io/red-dental-studio/
- Design system (Storybook, "Confidentally UI"): https://juliangerardi.github.io/red-dental-studio/storybook/
- **Link de prueba** (la última rama subida, antes de publicar): https://juliangerardi.github.io/red-dental-studio/prueba/
  y https://juliangerardi.github.io/red-dental-studio/prueba/storybook/
- Repo: `JulianGerardi/red-dental-studio` (privado), rama `main`.
- Lógica de la app (Jira, proyecto `CON`, historias de abril de 2026):
  https://confidetally.atlassian.net/issues?jql=project%20%3D%20CON%20AND%20created%20%3E%3D%20%222026-04-01%22%20AND%20created%20%3C%20%222026-05-01%22%20AND%20issuetype%20%21%3D%20Bug%20AND%20status%20%21%3D%20Cancelled%20ORDER%20BY%20key%20ASC

## Tu rol

Actuá como **product designer senior, diseñador UX/UI y UX researcher**, no sólo como quien ejecuta el pedido:

- Entendé el problema antes de resolver la pantalla: quién lo usa (recepción, odontólogo, administración), en qué
  momento del flujo y qué tiene que lograr.
- Investigá antes de decidir: la lógica de red.dev y de Confidentally 2.0 (`dashboard-figma`), el Figma, lo que ya
  existe en el design system y patrones probados en software de salud y SaaS.
- Si el pedido trae un problema de UX (inconsistencia, flujo roto, estado que falta, poca accesibilidad), decilo y
  proponé una alternativa con el porqué. Si hay varias salidas razonables, recomendá una.
- Cubrí todos los estados (vacío, carga, error, deshabilitado, contenido largo) y los tres anchos (celular, tablet,
  escritorio).
- Consistencia antes que novedad: reusá piezas del design system; si algo nuevo se justifica, documentalo.
- Textos de la app desde el lado del usuario: cortos, claros y que digan qué pasa. Accesibilidad: contraste, foco
  visible, teclado y áreas de toque.
- Al cerrar una tanda, contá en pocas líneas qué decidiste, por qué y qué convendría validar con usuarios.

## Comandos

```bash
npm run dev                                   # :5182 (en el Browser pane: preview_start "red-clone")
npm run storybook                             # :6006
npx tsc -b                                    # tipos
npm run ds:check                              # cobertura del design system (ver abajo)
npm run ds:campos                             # campos de los drawers de a dos y del mismo ancho (con Storybook andando)
npx vite build                                # build de la app
E2E_TELEMETRY_DISABLED=1 npm run test:e2e     # e2e en tests/*.e2e.ts, reusa el dev server
```

## Dónde está cada cosa

- `src/pages/` una por ruta (rutas en `src/AppRoutes.tsx`); `src/components/<módulo>/`; `src/components/ui/` shadcn y
  piezas base (drawer, step-indicator, button, data-table, filter-menu, page-title…); `src/lib/estilos.ts` clases
  compartidas (cards, botones de ícono, ancho de página).
- **`design-reference/figma/modulos/<módulo>.md`**: decisiones y anomalías numeradas de cada módulo. Es la fuente más
  confiable para retomar algo; leé el del módulo antes de tocarlo.
- `design-reference/design-system.md` (cómo está armado el Storybook y sus reglas), `design-reference/figma/README.md`
  (reglas transversales), `design-reference/e2e.md`, `design-reference/jira.md` (historias de Jira por módulo).
- Proyecto hermano con la lógica de 2.0: `~/Desktop/Work/dashboard-figma/src/components` (buscá ahí el `*Drawer.tsx`
  equivalente antes de armar uno).

## Jira

El funcionamiento de la app (reglas de negocio, estados, flujos) está en Jira (`confidetally.atlassian.net`, proyecto
`CON`). Las historias de abril de 2026 son las más detalladas: historia de usuario, precondiciones, regla de negocio,
escenarios de aceptación y restricciones. Ejemplo: `CON-2835` (al aceptar un Treatment Case, sus findings pasan a
In Treatment).

- Es la fuente de la lógica. Si algo del Figma, del código o del `.md` no cierra, o parece que falta algo, **buscalo
  ahí antes de preguntar o de inventar**. Si no hay historia para lo que se pide, avisale a Julián.
- **No se usa el label `design-system`**: esas historias son de diseño y son para los devs. Tampoco bugs ni cancelados.
- `design-reference/jira.md` indexa epics e historias de abril por módulo, y cada `.md` de módulo lleva su bloque
  **Jira** debajo del título. El mapeo salió de los títulos: si una historia está en el módulo equivocado, se corrige
  en los dos lugares.
- Antes de tocar un módulo, leé sus historias (`getJiraIssue`) junto con su `.md`. Para más: `parent = CON-3114` trae
  las historias de un epic.
- Todo lo que se arma queda linkeado: la sección con fecha del `.md` del módulo arranca con la clave (`CON-2835`) y el
  commit y el PR la nombran.
- Solo lectura: no cambiar estados, comentar ni crear historias sin el ok de Julián.
- Se lee con el conector de Atlassian (`cloudId`: `confidetally.atlassian.net`). La búsqueda devuelve todo junto y se
  pasa del límite: pedí `fields` acotados y filtrá el archivo guardado con `jq`.

## Cómo se trabaja una tanda

La app va primero y el Storybook al final: documentar en Storybook consume mucho crédito, así que no se hace hasta que
la app esté aprobada y publicada.

1. Leer la historia del módulo en Jira y su `.md`; implementar y mirarlo en el dev server (Browser pane o Playwright en
   el scratchpad si el pane está oculto).
2. Dejar anotado, sin que lo pida, la sección con fecha en el `.md` del módulo (clave de Jira, decisiones y anomalías).
   **No** tocar stories ni `design-system.md` en este paso.
3. Checks: `tsc -b`, `vite build`, e2e. Si un cambio rompe un e2e, se arregla el test o el código, no se saltea.
4. Pasarle a Julián los links de la app para que vea los cambios antes de publicar:
   - **Localhost**, con el dev server andando: la pantalla exacta que cambió, por ejemplo
     `http://localhost:5182/patients/1/relationships`. Localmente las rutas van sin `#`.
   - **Link de prueba general**: push de la rama de la sesión (nunca `main`); el workflow *Deploy preview* la publica en
     `…/red-dental-studio/prueba/` (la app va con `#`, por ejemplo `…/prueba/#/patients/1/relationships`). Muestra sólo
     la última rama subida: antes de pasarlo, esperá el workflow (`gh run list --workflow "Deploy preview"`) y confirmá
     que `…/prueba/version.txt` dice tu rama y tu commit. Pages cachea hasta ~10 min: agregá `?cb=<n>` antes del `#`.
     El Storybook de prueba (`…/prueba/storybook/`) se pasa recién en el paso 7.
5. **No publicar sin su ok.** Subir la rama de la sesión para el link de prueba no publica nada; `main` sí. Su "subilo"
   es la única validación y significa **publicar la app en vivo**. Con esa palabra se hace todo de corrido, sin volver
   a preguntar en ningún paso (nada de "¿commiteo?", "¿abro el PR?", "¿mergeo?"): commit con la entrada de `CAMBIOS.md`,
   push, PR con los reviewers de *Avisar al dev* y merge a `main`. El merge dispara el deploy de la app y del Storybook
   juntos, pero el Storybook sale con lo que ya tenía.
6. Después del merge: `gh run list` hasta que termine el deploy, confirmar que `…/red-dental-studio/version.txt` dice el
   commit del merge y que el cambio se ve en la app publicada, y pasarle el link en vivo. Pages cachea hasta ~10 min;
   para probar, agregá `?cb=<n>`.
7. **Último paso, solo cuando Julián pida documentar** ("documentá en Storybook" o similar): story del componente, ruta
   en `Pages.stories.tsx` y sección con fecha en `design-system.md`; correr `ds:check`; pasarle el link de localhost del
   DS (con Storybook andando), por ejemplo `http://localhost:6006/?path=/docs/elements-cards--docs`, y el de prueba
   `…/prueba/storybook/`. Su "subilo" publica de corrido, como en el paso 5 (otra entrada en `CAMBIOS.md`, otro PR), y
   se confirma el Storybook publicado como en el paso 6. Si Julián no lo pide, no se hace ni se sugiere hacerlo por
   cuenta propia.

## Avisar al dev

El código lo toman **jonatan784** y **betsyMb**, y se enteran de cada cambio por GitHub:

- **Todo cambio va por PR**, también los del CLAUDE.md o la documentación: nunca push directo a `main`. Si estás en
  `main`, creá una rama antes.
- Cada PR suma **su entrada arriba de todo en `CAMBIOS.md`**, con fecha y número de PR: qué cambió y qué tiene que
  saber el dev (componentes nuevos, reglas, rutas, qué dejar de usar), en pocas líneas y en castellano.
- La descripción del PR lleva *Qué cambia*, *Para el dev* y *Verificación*.
- Se crea con `gh pr create --reviewer jonatan784,betsyMb`: GitHub les manda un mail aunque el PR se mergee enseguida.

## Reglas de UI

- **Pop ups = `ui/drawer`** (derecha, alto completo). Con más de una sección lleva pasos: `steps` + `DrawerStep` +
  `DrawerActions`, estado con `lib/useFormPasos`. Cada paso tiene un nombre corto de lo que se hace ("General",
  "Contact", "Address"), nunca "Step". Secciones sin caja ni borde, campos de a dos, pie con dos botones del mismo
  ancho. Sólo las preguntas sí/no quedan como `ui/confirm-dialog`.
- **Cards:** la card sobre el fondo gris de la página es `TARJETA_PANEL` (sombra, **sin borde**); la que va adentro de
  otra es `TARJETA_INTERNA` / `InnerCard` (línea de 0,5 px gris tenue + sombra suave, en `shadow-inner-card`). La línea
  fina se dibuja con sombra inset: Chrome redondea `border-[0.5px]` a 1 px y una sombra externa se corta en listas con
  scroll. Tablas y la grilla del calendario mantienen su borde.
- Títulos de pantalla con `ui/page-title`; botones con `ui/button` (sm/md/lg = 28/32/36).
- Colores siempre con token (`src/index.css`), nunca `text-[#hex]`. Token que se lea desde JS va en `@theme static`.
- Primitivo interactivo nuevo: `npx shadcn@latest add <nombre>`. El CLI suele dejar archivos en un directorio `@/`
  literal y el import de `cn` mal: mover a `src/`, corregir a `@/lib/utils` y `npm uninstall cn`.
- Textos de la app en inglés; los del Figma se copian tal cual (incluidos errores como "Adress", anotados como anomalía
  en el `.md`).
- **Rediseñar no es cambiar el contenido.** Una propuesta de layout (filas en vez de cards, grupos, columnas) muestra los
  mismos datos, textos y acciones que la pantalla original —chips como TR y CC, Check Out, Cancel—; nada inventado
  (estados, métricas, botones, flujos). Lo nuevo se propone aparte y espera su ok.
- **Listas largas** (muchas cards o mucha información): se ven unos pocos y "Show N more" abre el resto con scroll
  adentro, sin estirar la página (`ui/show-more`; filas en caja con `ui/list-group`). Turnos y tareas, con las filas de
  `dashboard/DashboardRows` en vez de las cards grandes.

## Design system

- **El Storybook se documenta al final**, no mientras se implementa la app: es el último paso de la tanda y lo pide
  Julián (ver *Cómo se trabaja una tanda*). Ahí, cada componente, pantalla, estado, variante o regla nueva o cambiada en
  la tanda tiene su página con la estructura de abajo. `ds:check` en verde no alcanza: no exige Parts, States ni Specs.
- Todo componente lleva su `.stories.tsx` al lado; toda ruta nueva va en `src/design-system/Pages.stories.tsx`.
- `ds:check` falla si una función de React con mayúscula no está importada por ninguna story (o en
  `src/design-system/exentos.json`), si falta un estado soportado o si aparece un hex con token.
- Cada página sigue la estructura de *Elements / Buttons*: descripción que termina en "**Probalo:**", Playground con
  controles, Parts, States y Specs, armados con `src/design-system/kit.tsx` (drawers: `kit-drawer.tsx`). Nada de
  listas sueltas de stories.

## Código

- Corto. Comentarios de una línea, apuntando al `.md` del módulo cuando hay una decisión detrás; el razonamiento va
  en el `.md`, no en el código.
- Nombres internos en castellano, como el resto del código.

## Seguridad

- No leer `.env`. Los secretos los carga Julián (`gh secret set …`); nunca escribir claves en el código ni en el chat.
  La clave de Gemini del Builder sale del secreto `GEMINI_API_KEY` en el deploy.

## Gotchas

- Tests: `getByText` sobre un texto con hermanos necesita regex; en Playwright las opciones de `SelectField` son botones,
  no `role=option`; `userEvent.type` no actualiza inputs controlados (usar `escribir()` de `design-system/play.ts`).
- Con el Browser pane oculto, las transiciones no avanzan y `requestAnimationFrame` no corre: capturar con Playwright.
- Tailwind v4 `outline-none` + `focus-visible:outline-2` deja el anillo invisible.
