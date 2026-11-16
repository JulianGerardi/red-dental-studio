# Design system en Figma · Confidentally UI

> **2026-11-16: el design system vive en un archivo aparte**, para publicarlo como library:
> [Confidentally UI · Design System](https://www.figma.com/design/iJvnuV8TLStMXpNjdwsuDe) (`iJvnuV8TLStMXpNjdwsuDe`, equipo
> *CONFI UI KIT-DS*). La página 🎨 Design System del archivo de flujos (`TPh6NE9d4skn0BdId26UTR`, abajo) queda como
> primera versión hasta que las pantallas se reconecten a la library publicada.
>
> **Páginas del archivo nuevo** (una por categoría, como las páginas de módulos): 📕 Cover · 🎨 Foundations (muestras) ·
> 🔣 Icons (227) · 👆 Actions (Button 54, IconButton 36) · 🏷️ Status & People (Pill, Chip, Count, Avatar) · 📝 Forms
> (Field, Select, Search, Date, Textarea, Checkbox, Radio, Switch, Option card) · 🧭 Navigation (Tab/Tabs, Breadcrumb,
> Step, Step indicator, Page button, Pagination, Menu item, Menu) · 🗂️ Cards & Layout (Card, Stat card, Appointment card ×7
> estados, Pending task card, Clinical badge, Detail row, Empty state, Section notice, Show more) · 📊 Tables & Lists
> (Table cell, Table toolbar, Data table, Appointment row) · 💬 Feedback & Overlays (Alert, Toast, Tooltip, Popover,
> Confirm dialog, Drawer) · 🧩 App shell (Nav item, Sidebar ×20 variantes, Topbar, Notification banner, Page title) ·
> 🦷 Clinical (Exam tab, Finding row, Workflow card, Lab order row).
> Son 36 component sets (≈ 240 variantes), 16 componentes sueltos y 227 íconos, todo ligado a las mismas 117 variables, 23
> estilos de texto y 4 de sombra.
>
> **Reconectado el 2026-11-16:** la library está publicada y habilitada en el archivo de flujos. Todas las pantallas usan instancias
> de la library (0 instancias locales verificadas en Patients, Dashboard y Clinical Mode), los estilos de texto y de sombra son los
> publicados y las 117 variables locales del archivo de flujos son **alias** de las publicadas: cambiar un token en el archivo del
> design system y republicar actualiza las pantallas. El motor (claves de la library, reconexión de instancias y estilos) queda
> guardado en el archivo de flujos (`rds.ds`: `biblio`, `reconectar`, `reconectarRun`, `estilosLib`, `estilosRun`). Si se suma un
> componente, hay que republicar y agregar su clave a `biblio`. La página 🎨 Design System del archivo de flujos quedó sin uso.
>
> **Para publicarlo (ya hecho, para futuras versiones):** en el archivo nuevo, *Assets → Publish library* (lo hace Julián desde Figma). Después, en el archivo de
> flujos, activar la library (*Assets → Libraries*) y reconectar: cada instancia local pasa al componente publicado con
> `figma.importComponentByKeyAsync` (por nombre de set y variante), y las variables y estilos con
> `importVariableByKeyAsync` / `importStyleByKeyAsync`. El mapeo es por nombre: set + `Propiedad=Valor`.
>
> **Todavía sin componente** (pedido de Julián: "no debe faltar nada"): Date picker (calendario), Filter menu, Hover card,
> Dock flotante, Operatory card, Plan card y filas de Insurance/Ledger, columnas y turnos del calendario, tarjetas del
> Treatment Plan, drawers específicos de cada módulo (se arman con Drawer + Field + Button). Siguen siendo ilustración, y no
> componentes: odontograma/ToothGlyph, diagramas de región e intraoral, hoja de consentimiento, visor de radiografías y
> medidores de signos vitales.

Página **🎨 Design System** del archivo *Confidentally — Red Dental Studio · Flows* (`TPh6NE9d4skn0BdId26UTR`). Es el
espejo en Figma del Storybook y de `src/components/ui` + `src/index.css`. Hecho el 2026-11-15 a pedido de Julián:
*cada componente conectado a un design system, componetizado, con variantes*.

## Qué hay

| Capa | Qué es | Origen en el código |
|---|---|---|
| **Color** (88 variables, modo Light) | `color/<grupo>/<token>`: brand, ink, line, surface, field, status, appt, legacy. Los `appt-*` son alias de los base. Scopes por grupo y *code syntax* `var(--color-<token>)`. | `@theme` de `src/index.css` |
| **Radius** (8) | `radius/none … 3xl, full` (4 · 6 · 8 · 11,2 · 14,4 · 17,6 px) | `--radius` (.5rem) |
| **Spacing** (13) | grilla de 4 px: `spacing/0-5 … 12` (2 a 48 px) | escala de Tailwind |
| **Size** (8) | `size/control/{sm,md,lg}` = 28/32/36, `size/icon/{sm,md,lg}`, `size/field/{md,lg}` | `BUTTON_SIZES`, `Input` |
| **Estilos de texto** (23) | `Text/<tamaño>/<peso>` (Inter): 20, 17, 16, 15, 14, 13, 12, 11, 10 px, con el interlineado que usa la app (19,5 / 18 / 16,5 / 15…) | medidos de las 281 pantallas |
| **Estilos de efecto** (4) | `Shadow/panel`, `floating`, `inner-card`, `hairline` | `--shadow-*` |
| **Íconos** (227) | `Icon/<nombre>` en 16 px, con el nombre de lucide que lleva la capa `Icon - <nombre>` de las pantallas. Trazo ligado a `ink-medium` | `lucide-react` |

## Componentes y variantes

| Componente | Variantes (propiedades) | Pieza de React |
|---|---|---|
| **Button** | Variant (Primary · Secondary · Ghost · Link · Destructive · Success) × Size (SM · MD · LG) × State (Default · Hover · Disabled) = 54. Propiedades: `Label`, `Show icon`, `Icon` (instance swap) | `ui/button` |
| **IconButton** | Variant (Secondary · Ghost · Primary · Destructive) × Size × State = 36. `Icon` | `ui/button` con `iconOnly` |
| **Pill** | Tone (Success · Info · Warning · Danger · Neutral · Purple) × Size (MD · SM) = 12. `Label` | `ui/pill` |
| **Chip** | Tone (Blue · Neutral) × Removable = 4. `Label` | `ui/chip` |
| **Count** | Active (No · Yes). `Label` | `ui/count` |
| **Avatar** | Size 24 · 28 · 32 · 36 · 40 · 44 · 56 · 62 · 72, radio 27 %. `Initials` | `ui/avatar` |
| **Checkbox** · **Switch** | Checked × State · Size × On | `ui/checkbox`, `ui/switch` |
| **Field** | State (Default · Filled · Focus · Error · Disabled). `Label`, `Required`, `Value`, `Helper`, `Show helper` | `patients/form.tsx` (TextField) |
| **Tab** + **Tabs** | Size × Active × State = 8; contenedor `Tabs` | `ui/tabs` |
| **Alert** | Tone (Info · Success · Warning · Danger). `Title`, `Body` | `ui/alert` |
| **Card** | Type (Panel · Inner) | `TARJETA_PANEL`, `TARJETA_INTERNA` |
| **Step** | State (Active · Complete · Pending). `Step label` | `ui/step-indicator` (Insignia) |
| **Table cell** | Type (Header · Row) | `TABLA_ENCABEZADO`, `TABLA_FILA` |
| **Menu item** | Variant (Default · Destructive) × State (Default · Hover) | `ui/dropdown-menu` |
| **Tooltip** · **Breadcrumb** | — | `ui/tooltip`, `ui/breadcrumb` |

Todos los rellenos, trazos, radios, paddings y gaps de los componentes están **ligados a variables**; los textos, a
estilos. Cambiar un token cambia el componente y, con él, las pantallas.

## Qué se componentiza y qué no

**Se componentiza** lo que se repite con el mismo aspecto y cambia por variante: acciones, estados, cuentas, personas,
campos, pestañas, avisos, cards, pasos, celdas, ítems de menú y los íconos.

**No se componentiza** (y por qué):

- **Dominio clínico** — odontograma, `ToothGlyph`, diagramas de región e intraoral: una forma por pieza, no hay
  variantes de UI.
- **Calendario** — grilla y tarjetas de turno: posición por hora y alto por duración (layout, no estados).
- **Una sola pantalla** — hoja de consentimiento, visor de radiografías, medidores de signos vitales, dock de Confibot.
- **App shell** (Sidebar, Topbar, banner) — único por pantalla. Pasa a componente cuando haya variante responsive.
- **Drawer y Dialog** — contenedores con contenido libre: son plantilla (frame) armada con Step, Field y Button.
- **Inputs capturados y Select** (≈ 780) — estructura variable (adornos, ayuda, íconos). Se unifican en `Field` cuando el
  código lo unifique.
- **Botones fuera de la escala 28/32/36** — ver abajo.

## Qué quedó conectado en las pantallas

Se aplicó a las 22 páginas de módulos (≈ 280 pantallas), sobre las capturas, con *antes y después* por captura
(Patients · Step 01 y 03, Settings · Locations, Patient record · Overview): sin cambios visibles.

- **Instancias**: ≈ 1.700 Button, ≈ 1.350 IconButton, ≈ 1.350 Pill, ≈ 1.380 Avatar, Chip y Count. Un botón se reemplaza
  sólo si coincide con una variante (alto 28/32/36, radio 6, color de relleno/borde conocido, ícono del set). El ancho
  original se conserva (Fill container o ancho fijo).
- **Variables**: ≈ 85.000 rellenos y trazos con el hex exacto de un token → `Color`; radios exactos → `Radius`; paddings y
  gaps exactos → `Spacing`.
- **Estilos**: ≈ 22.000 textos con tamaño, peso e interlineado (±1 px) iguales a un `Text/*`; sombras iguales a un
  `Shadow/*`.
- Las marcas `rds.ds / v` en cada pantalla (datos compartidos del plugin) indican que ya se vinculó: se puede volver a
  correr sin repetir trabajo.

## Hallazgos de UX para validar con Julián

1. **Dos contadores**: `Globo` en Patients (azul sólido con número blanco) y `Count` (celeste). Proponemos Count.
2. **≈ 5.800 de 10.700 botones fuera de la escala de alturas** (24 y 20 px los más repetidos, también 34, 26, 30).
   Revisar áreas de toque: mínimo 24 px, ideal 28.
3. **Azules casi iguales**: `#1d56bc` (dash-blue), `#1e58be` y un azul vivo `#2f6bff` sin token. Unificar en `dash-blue`.
4. **Interlineados propios** en 11 semibold, 12 regular y 13 regular, y tamaños fuera de la escala (28, 18, 9 px):
   unificar en la escala 16,5 / 18 / 19,5 o sumar los estilos.
5. Colores sin token en los diagramas clínicos y grises sueltos (`#c9c9c9`, `#303030`, `#9a9a9a`, `#e0e0e0`): no se
   vincularon; si son parte del producto, se les crea el token.

## Cómo se retoma

- **Nueva pieza**: crear el componente en la página 🎨 Design System con variantes `Propiedad=Valor`, ligado a variables
  y estilos, nombre = pieza de React, y sumarla a la portada (*Index*).
- **Conectar pantallas nuevas** (después de capturar, ordenar y arreglar): los motores quedan guardados en el archivo, en
  datos compartidos del plugin (`namespace rds.ds`): `motor` (instancias de Pill, Avatar, Button, IconButton),
  `chipcount` (Chip y Count) y `binder` (variables, estilos de texto, radios, espaciados y sombras). Se corren con
  `use_figma` leyendo la clave con `figma.root.getSharedPluginData('rds.ds', '<clave>')` y evaluándola como función
  asíncrona con `PAGES` (nombres de página), `t0` y `LIM` (límite de tiempo en ms; 45.000 como máximo, el límite de la
  herramienta es 60 s por llamada).
- **Reglas aprendidas**: un error en `use_figma` revierte toda la llamada; hay que cargar las fuentes (Inter Regular,
  Medium, Semi Bold, Bold) antes de tocar textos; leer `node.name` antes de `remove()`; las variantes se nombran
  `Propiedad=Valor`; un trazo interno no suma al tamaño (el Pill lleva el borde de 1 px dentro del padding).
- Los íconos se reconocen por el nombre de la capa (`Icon - plus` → `Icon/plus`). Si aparece uno nuevo en el código,
  agregarlo al set con el mismo nombre en kebab.

## Revisión de alineación de las pantallas (2026-11-16)

Auditoría de las pantallas del archivo *Flows* contra la app en vivo. Qué se rompió y por qué:

- **Instancias en 0,0** (`Button - Check In/Out` en Dashboard y Header & Sidebar, `Pill` en Clinical Mode): el motor `poner` reemplazaba el nodo capturado sin copiar x/y cuando el padre no tiene auto layout. Reparado (x a la derecha de la fila) y **parchado el motor** (`motor` y `chipcount`: si el padre es `NONE`, copia x/y).
- **Avatares estirados** (186×62 en vez de 62×62, 68 en la ficha del paciente): heredaban `layoutAlign STRETCH`. Vuelven a 62×62 centrados.
- **Botón con ícono al final** (`Check In →`, `Complete this Task →`): el componente `Button` sólo tenía ícono antes del texto y las instancias no permiten reordenar hijos. Se agregó la variante **`Icon position` (Leading/Trailing)** al `Button` del DS (108 variantes). Library republicada; 536 botones (Check In, Check Out, Complete this Task) pasados a `Trailing`, con texto, ícono y color del ícono igual al del texto. Al clonar variantes hay que copiar también `componentPropertyReferences` (si no, el ícono no se muestra).
- Los tamaños 1531, 1101, etc. de los frames **son los reales**: la captura crece hasta mostrar lo que quedaba en el scroll (`alto` distinto de `fijo`).
