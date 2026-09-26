/* Detección de estados de un componente a partir de su código, y de si su
   story los muestra. Sirve tanto a scripts/ds-coverage.mjs (Node) como a la
   página "Foundations / States coverage" de Storybook.

   Un estado cuenta como *soportado* cuando el componente lo maneja
   (prop `disabled`, `error`, `loading`, un estado vacío, un valor
   seleccionado) y como *documentado* cuando el story lo nombra o lo usa. */

export const ESTADOS = ['disabled', 'error', 'loading', 'empty', 'selected']

/* Qué busca cada estado en el código del componente. */
const EN_COMPONENTE = {
  disabled: /\bdisabled\s*[=?:}]|disabled:|aria-disabled|\bdisabled\b\s*\)/,
  error: /\berror\??\s*[:=]|aria-invalid|\bintentado\b|\berrores?\b\s*[:=]/,
  loading: /\bloading\b|\bcargando\b|isLoading|animate-spin|[Ss]keleton|\bspinner\b/,
  empty: /EmptyState|\bvacio\b|length === 0|!\w+\.length|No content yet|No results|Nothing (matches|to show)/,
  selected: /aria-pressed|aria-checked|aria-selected|\b(on|selected|active|activa|checked|seleccionad[ao])\s*[?:]\s*(boolean|string)|data-\[state=|\b(on|selected|activa)\b\s*[,=}]/,
}

/* Qué busca cada estado en el story. */
const EN_STORY = {
  disabled: /disabled|deshabilit/i,
  error: /error|invalid|validation|intentado|required/i,
  loading: /loading|cargando|skeleton/i,
  empty: /empty|vacio|vacío|sin datos|\[\]|no results/i,
  selected: /selected|active|checked|\bon\b|pressed|seleccion/i,
}

export function estadosSoportados(codigo) {
  return ESTADOS.filter((e) => EN_COMPONENTE[e].test(codigo))
}

export function estadosDocumentados(codigoStory) {
  return ESTADOS.filter((e) => EN_STORY[e].test(codigoStory))
}

/* Estados que un componente soporta y su story no muestra. `exentos` es un
   objeto { "components/x/Y.tsx": { estado: "motivo" } }. */
export function estadosFaltantes(archivo, codigo, codigoStory, exentos = {}) {
  const dispensados = exentos[archivo] ?? {}
  const documentados = new Set(estadosDocumentados(codigoStory))
  return estadosSoportados(codigo).filter((e) => !documentados.has(e) && !(e in dispensados))
}
