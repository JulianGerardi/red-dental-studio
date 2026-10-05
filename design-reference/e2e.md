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

Los tests usan locators (`screen.getByRole(...)`, `expect(...)`): no llaman a ningún modelo.

## Pendiente: el modelo para los pasos en lenguaje natural

`agent.act('...')` y `agent.assert('...')` necesitan un modelo. Todavía no hay ninguno configurado: se elige uno
(una API key de Gemini, Anthropic u OpenAI, una suscripción de ChatGPT o Copilot, o un modelo local) y se agrega en
`agents.default` de `e2e.config.ts`. La clave va en una variable de entorno, nunca en el repo.

## Notas

- El CLI manda telemetría anónima de uso (comandos y errores, sin contenido de los tests). Se apaga con
  `npx e2e telemetry disable` o `E2E_TELEMETRY_DISABLED=1`.
- No se instalaron la skill de e2e para agentes (`.claude/skills/e2e`) ni su servidor MCP (`.mcp.json`), que
  `npx e2e init` agrega por defecto.
