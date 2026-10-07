# red-clone · Red Dental Studio

Rediseño de la UI de Confidentally (clínicas dentales), guiado por Figma. React 19 + Vite + TypeScript + Tailwind v4 +
shadcn/ui (Radix), con datos mock en `src/data/` (no hay backend). Lo pide y aprueba Julián, que escribe en castellano:
respondé igual.

- **Carpeta del proyecto: siempre `~/Desktop/Claude/red-clone`.** No trabajar en otras copias
  (`~/Desktop/Claude/red-dental-studio`, ni el viejo `~/red-clone`).
- App publicada: https://juliangerardi.github.io/red-dental-studio/
- Design system (Storybook, "Confidentally UI"): https://juliangerardi.github.io/red-dental-studio/storybook/
- Repo: `JulianGerardi/red-dental-studio` (privado), rama `main`.

## Comandos

```bash
npm run dev                                   # :5182 (en el Browser pane: preview_start "red-clone")
npm run storybook                             # :6006
npx tsc -b                                    # tipos
npm run ds:check                              # cobertura del design system (ver abajo)
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
  (reglas transversales), `design-reference/e2e.md`.
- Proyecto hermano con la lógica de 2.0: `~/Desktop/Work/dashboard-figma/src/components` (buscá ahí el `*Drawer.tsx`
  equivalente antes de armar uno).

## Cómo se trabaja una tanda

1. Implementar y mirarlo en el dev server (Browser pane o Playwright en el scratchpad si el pane está oculto).
2. Documentar **todo en Storybook en la misma tanda**, sin que lo pida, con la regla de la sección *Design system*;
   además, sección con fecha en el `.md` del módulo y en `design-system.md`.
3. Checks: `tsc -b`, `ds:check`, `vite build`, e2e. Si un cambio rompe un e2e, se arregla el test o el código, no se
   saltea.
4. Pasarle a Julián **los links de localhost** para que vea los cambios antes de publicar, con el dev server (y
   Storybook, si cambió el design system) andando: la pantalla exacta que cambió, por ejemplo
   `http://localhost:5182/patients/1/relationships`, y la página del DS, por ejemplo
   `http://localhost:6006/?path=/docs/elements-cards--docs`. Localmente las rutas van sin `#`.
5. **No hacer push sin su ok.** Su "subilo" es la única validación y significa **publicar en todos lados**: la app en
   vivo y el design system. Con esa palabra se hace todo de corrido, sin volver a preguntar en ningún paso (nada de
   "¿commiteo?", "¿abro el PR?", "¿mergeo?"): commit, push y, si hay rama de sesión, PR y merge a `main`. El merge a
   `main` dispara el deploy de la app y del Storybook juntos.
6. Después del merge: `gh run list` hasta que termine el deploy, confirmar el cambio en la app publicada y en el
   Storybook publicado, y pasarle los dos links. Pages cachea hasta ~10 min; para probar, agregá `?cb=<n>`.

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

## Design system

- **Todo se documenta en Storybook antes de subir.** Cada componente, pantalla, estado, variante o regla nueva o
  cambiada en la tanda tiene su página con la estructura de abajo; sin eso no se pide aprobación ni se sube. `ds:check`
  en verde no alcanza: no exige Parts, States ni Specs.
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
