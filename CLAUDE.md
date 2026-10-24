# red-clone · Red Dental Studio

Rediseño de la UI de Confidentally (clínicas dentales), guiado por Figma. React 19 + Vite + TypeScript + Tailwind v4 +
shadcn/ui (Radix), con datos mock en `src/data/` (no hay backend). Lo pide y aprueba Julián, que escribe en castellano:
respondé igual.

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

La app va primero y el Storybook al final: documentar en Storybook consume mucho crédito, así que no se hace hasta que
la app esté aprobada y publicada.

1. Implementar y mirarlo en el dev server (Browser pane o Playwright en el scratchpad si el pane está oculto).
2. Dejar anotado, sin que lo pida, la sección con fecha en el `.md` del módulo (decisiones y anomalías). **No** tocar
   stories ni `design-system.md` en este paso.
3. Checks: `tsc -b`, `vite build`, e2e. Si un cambio rompe un e2e, se arregla el test o el código, no se saltea.
4. Pasarle a Julián **el link de localhost** de la pantalla exacta que cambió, con el dev server andando, por ejemplo
   `http://localhost:5182/patients/1/relationships`. Localmente las rutas van sin `#`.
5. **No hacer push sin su ok** ("subilo"). Subir a `main` publica app y Storybook juntos, pero el Storybook sale con lo
   que ya tenía.
6. Después del push: `gh run list` hasta que termine el deploy y confirmar en el bundle publicado. Pages cachea hasta
   ~10 min; para probar, agregá `?cb=<n>`. Pasarle el link en vivo de la app.
7. **Último paso, solo cuando Julián dé otro ok** ("documentá en Storybook" o similar): story del componente, ruta en
   `Pages.stories.tsx` y sección con fecha en `design-system.md`; correr `ds:check`; pasarle el link de localhost del
   DS (con Storybook andando), por ejemplo `http://localhost:6006/?path=/docs/elements-cards--docs`; push con su ok y
   confirmar el deploy como en el paso 6. Si Julián no lo pide, no se hace ni se sugiere hacerlo por cuenta propia.

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

- Todo componente lleva su `.stories.tsx` al lado; toda ruta nueva va en `src/design-system/Pages.stories.tsx`. Se
  escriben en el último paso de la tanda (ver arriba), no mientras se implementa la app.
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
