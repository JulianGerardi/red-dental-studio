<!-- Generado partiendo dashboard-findings.md por módulo.
     Índice general: design-reference/figma/README.md -->

# Header y Sidebar — hallazgos del Figma

## Header y Sidebar (2026-08-25, segunda pasada)

Nodos: Sidebar `3605:56447` · Header Secretary `3636:57489` · Header Provider
con dropdown abierto `3605:56446`.

### Sidebar — medido y verificado
`rail 58px` sobre `#fafafa` (no blanco) · bloque de logo `58×64` en `#1a4da9`
(un azul más oscuro que el `#1d56bc` del ítem activo) · ítems `32×32` con
**pitch de 50px** · icono 16px · **9 ítems**, incluido `CircleHelp` que faltaba ·
Settings al pie. Se hizo `sticky` porque con la página larga quedaba en y=1390.

### Header — correcciones de esta pasada
- **Toggle**: es un botón con borde `#e4e4e7` y esquinas redondeadas, no un icono
  suelto. Alterna `PanelLeftOpen` ↔ `PanelLeftClose` según el estado, con
  `active:scale-90` y transición (respetando `prefers-reduced-motion`).
- **Campana**: es `BellDot` (con punto), no `Bell` plano.
- **Divisor** antes del perfil: `border-l 1px #e4e4e7`, 42px de alto.
- **Dropdown de locación**: panel de 304px, radio 12, con título "Select location",
  badge "40 locations" (`#f5f0ff` / `#6633a6`), buscador, y filas de locación con
  timezone, check, estrella y tags de rol. El selector toma **borde azul** mientras
  está abierto y el chevron rota.

### Factor de escala del modal
El nodo del dropdown viene escalado **0.798**. Todos sus valores raros son limpios
divididos por eso: `303.072 = 380×0.798`, `19.141 = 24×0.798`,
`12.761 = 16×0.798`, `11.166 = 14×0.798`. Se implementó con la geometría
renderizada (304px, para que mida lo mismo que en el frame) y tipografía subida.

### Anomalías nuevas (10 a 12)

10. **El search difiere entre frames.** Provider: `263×28`, placeholder 14px.
    Secretary: `304×32`, placeholder 11px. Se tomó el de Secretary, que además
    coincide con el componente `input` del design system.
11. **El glifo ⌘ del buscador existe solo en Provider.** Se replicó esa diferencia
    (prop `showCommandHint`).
12. **El bloque de perfil difiere entre frames.** Provider: nombre negro medium +
    rol gris semibold. Secretary: ambos gris semibold. Se tomó el de Provider,
    que da jerarquía real.

### Cambio del usuario en el Figma (recepcionista)
- **Se quitó la fila de tabs** del panel Pending Task en la vista recepcionista.
  Provider la mantiene — verificado por diff de píxeles: la región cambiada es
  exactamente `x 97-425, y 389-963` en Secretary, y en Provider el diff da `None`.
- **Fondo de página `#FAFBFE`** en ambas vistas. La réplica usaba `#f5f5f5`
  (el `--page-background` del sistema original). Corregido con un override en
  `index.css`; `tokens.json` queda intacto porque documenta el original.


## El rail necesita su propio nivel de apilamiento (2026-08-30)

El menú flotante de Settings se dibujaba **detrás** del contenido en Scheduling
y en el dashboard del paciente. No era el z-index del panel: `position: sticky`
crea su propio contexto de apilamiento, así que el `z-50` del flotante sólo
competía adentro del rail. El rail estaba en `md:z-auto`, o sea que se pintaba
en orden de documento —antes que `<main>`— y cualquier caja posicionada del
contenido le pasaba por encima.

Ahora el rail va en `md:z-40`: sube entero, con el flotante adentro. Los modales
y popovers del contenido usan `z-50` y lo siguen tapando, que es lo correcto.

Es el mismo tipo de bug que el `overflow-y-auto` que recortaba el flotante: en
los dos casos una propiedad del contenedor cambia lo que puede hacer un hijo
absoluto.
