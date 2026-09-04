<!-- Generado partiendo dashboard-findings.md por módulo.
     Índice general: design-reference/figma/README.md -->

# Patients — hallazgos del Figma

## Patients — List (nodo `3638:59529`) y Patient Details Modal (`3632:58405`)

### Especificaciones aplicadas

**Tabla** (`3638:61352`): shell `radius 8` borde `#e7e7e7` · header `44px` sobre
`#f9f9f9` · filas `56px` · `px-16`. Anchos de celda fijos
(200 / 180 / 260 / 160 / 72) repartidos con `justify-between`. Avatar `32px`
sobre `#1a4da9`. Todo el texto en **12px SemiBold `#71717a`**.
Badges `px-8 py-3 rounded-full` con borde: Completed `#1a804d`/`#f0fcf5`,
Proposed `#99660d`/`#fffaf0`, In Progress `#174596`/`#f0f2ff`.

**Modal**: 309 de ancho (llevado a 340 por la escala tipográfica), barra azul
`#1d56bc` de 66px, cuerpo con borde `#1a4da9` de 1.13px, avatar de 75.5px
montado a caballo en `left 24 / top 12` con borde blanco de 4px.

### Anomalías nuevas (13 a 18)

13. **La tabla de pacientes es el componente de referrals.** La capa se llama
    `table/referral-table` y el footer dice **"Showing 6 of 18 referrals"** — en
    una pantalla de pacientes y con 11 filas a la vista, no 6.
14. **Dos azules distintos.** El breadcrumb usa `#0056ef`; el resto de la UI usa
    `#1d56bc`. Son colores diferentes, no estados del mismo.
15. **Typo en el nombre del token**: `--color-confindetally` (con una "n" de más;
    debería ser "confidentally").
16. **Copy de locación en la pantalla de pacientes**: el subtítulo dice
    "Set your location name. Add the location you need."
17. **Formatos de fecha mezclados** en la misma columna: "April 2" / "Jan 15" /
    "Mar 8" / "June 2" / "Jun 3" / "March 15".
18. **Español dentro del modal en inglés**: "34 años" y "15 Marzo, 2024".

Todo lo anterior es contenido y se replicó **tal cual**, según lo acordado.
Lo único corregido fue visual: el alto fijo de la fila de label en el grid de
stats, porque "Primary Insurance Plan" ocupa dos líneas y desalineaba la columna
derecha respecto de la izquierda (verificado: ambas columnas arrancan en las
mismas `y` y miden 152).

### Pendiente del módulo Patients

Faltan 4 pantallas del mismo módulo: **New Patient Modal (Base)** `3639:55808`,
**New Patient Modal (With Guardian)** `3640:56478`, **Edit Contact Modal**
`3640:74270` y **Edit Patient (Full Page)** `3640:72713`.

---

## Patients — las 4 pantallas restantes + unificación tipográfica

### Pantallas agregadas
- **New Patient Modal** (`3639:55808`, form `3640:73356`, 860×818) — dos columnas
  de 380.5: General Information y Demographic Information, footer Cancel/Save.
- **New Patient con guardián** (`3640:56478`) — idéntica, más una sección
  Guardian Information debajo de la columna izquierda. Se resolvió con una prop
  `withGuardian` sobre el mismo componente, no duplicando la pantalla.
- **Edit Contact Modal** (`3640:74270`, form 860×521) — Contact Information
  (área + teléfono, email) y Address Information (2 líneas, país/estado, ciudad/ZIP).
- **Edit Patient (Full Page)** (`3640:72713`, 1200×1359) — tres secciones a 1088:
  General (2×2 + 1 full), Demography (7 selects + checkbox) y Address (3×2).

Conexión: "New Patient" y "+ Guardian" abren sus modales, el kebab de una fila
abre Edit Contact, y el click en la fila lleva a `/patients/edit`.

### Anomalía 19
**El bloque "Use this option only to link a person that already exists in the
system…" aparece 3 veces en el mismo formulario de New Patient**, en posiciones
que no se relacionan: dos veces en General Information y una tercera en el medio
de Demographic Information, entre Language y Religion. Es un componente
placeholder repetido. Se replicó tal cual.

### Anomalía 20
El layer de la columna izquierda se llama `Demographic Information` pero renderiza
**"General Information"** — otro nombre de capa que no coincide con el contenido.

### Escala tipográfica unificada

Los dos títulos de página tenían tamaños distintos en la réplica (Dashboard 24px
bold, Patients 20px semibold). **Medido sobre los PNG del Figma, la altura de
tinta de "Dashboard" y de "Patients" es la misma: 15px** → ambos son 20px
SemiBold. Se corrigió el Dashboard y se extrajo un componente `PageTitle` para
que no puedan volver a divergir.

Escala vigente en toda la app:

| Rol | Tamaño |
|---|---|
| Título de página | 20px SemiBold `#09090b` |
| Título de panel / sección | 15px Bold (14px en cards de formulario) |
| Cuerpo / controles | 13px |
| Secundario, celdas de tabla | 12px |
| Badges y chips | 11px |
| Valor de stat card | 26px Bold |

### Tabs del Pending Task — resuelto midiendo, no estimando

Dos intentos fallidos antes de mirar los números:
1. Activo `shrink-0` + inactivos `flex-1` → cada click redistribuía los anchos y
   **se movían los cuatro** (82/77/77/77 → 80/74/80/80).
2. Los cuatro a ancho de contenido con `justify-between` → estable, pero
   amontonados a la izquierda y con anchos dispares (78/70/81/59).

La respuesta salió de medir los centros de los labels sobre el frame,
escaneando columnas de tinta en el PNG:

```
Figma:  511 · 590 · 668 · 748   → cuatro slots iguales
```

O sea el layout correcto es **`flex-1` en los cuatro**, que además es
completamente estable. Verificado: centros 512/591/669/748 (1px del Figma) y
sin movimiento al cambiar de tab.


### Variante "con guardián": el disparador no está en el Figma

En una pasada anterior agregué un botón "+ Guardian" en la página de Patients
para llegar a esa variante. **Ese botón no existe en el diseño** — fue un invento
para poder navegar hasta ahí. Removido.

El Figma muestra las dos variantes de New Patient como **frames sueltos** y no
indica qué las alterna. La réplica lo dispara con el **segundo checkbox de
General Information**, que revela la sección Guardian Information. Es una
elección propia y está marcada como tal en el código — si hay un control real
que la activa, hay que reemplazarla.
