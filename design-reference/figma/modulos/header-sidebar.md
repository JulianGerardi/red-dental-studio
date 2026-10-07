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

**Settings no cambia de lugar al colapsar (pedido de Julián).** Va al pie del
rail en los dos estados, con el ícono a la misma altura: el ítem colapsado mide
32 y el expandido 36, así que colapsado lleva 2px más de padding abajo. (Se
probó pegarlo a los demás íconos y se descartó: Julián lo quería donde está
expandido.) Los ítems del rail colapsado llevan tooltip con el nombre; Settings
no, porque su menú flotante ya abre al hover en ese lugar.

Ojo con los tooltips: los `NavLink` van envueltos con `asChild`, y Radix Slot
no combina una `className` que es función -la pasa como texto y el link pierde
todos sus estilos-. Por eso el estado activo se calcula en el Sidebar y llega
como string.

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

## Menú de cuenta en el header (2026-09-08)

La flecha al lado del nombre no abría nada. Ahora despliega el menú que pasó
Julián en captura: título **My Account**, separador, **Profile · Suscription
· Support**, separador, **Help center · Log out**. Mismo `DropdownMenu` de
shadcn que ya usan el picker de columnas y los filtros.

**"Suscription" va con esa ortografía a propósito.** Así está en el diseño y
acá el contenido se replica tal cual -misma regla que dejó "Start Enconter"
en el panel del paciente y el título "New Credit (+) Adjustment" en un botón
que dice "Charge Adjustment (+)"-.

Destinos: Profile → `/settings/account`, Suscription → `/billing`, Support y
Help center → `/help`, y **Log out → `/login`** con su toast. Ese Log out es,
además, la única puerta de entrada al login desde la app: antes `/login`
existía como ruta pero no había forma de llegar sin escribir la URL, que es
por lo que Julián no lo veía.

## Notificaciones: banner arriba + campana (2026-09-08)

Pedido de Julián. Son **tareas pendientes**, no avisos de paso: quedan hasta
que se resuelven -para lo efímero ya están los toasts-.

**Banner**, arriba de todo y debajo del header. Muestra una por vez con
flechas ‹ › y el contador al medio. Probado tal cual lo describió:
"1 of 2 · Document awaiting your signature" → siguiente → "2 of 2 · Referral
expires today" → anterior → vuelve a la primera.

**El cursor se recorta al ocultar**, así nunca queda apuntando a algo que ya
no se muestra: verificado parado en "2 of 2", ocultando esa, y el banner pasa
a mostrar la que queda en vez de vaciarse. Con una sola pendiente las flechas
y el contador desaparecen -no hay entre qué moverse-.

**La X del banner no borra: oculta.** Corrección de Julián. La tarea sigue
pendiente y sigue en la campana -borrarla de verdad sería dar por hecha una
tarea que nadie completó-, así que la X sólo la saca del banner y avisa con
un toast ("Moved to notifications"). Por eso el badge de la campana **no
baja** al ocultar: verificado, queda en 2 con una sola en el banner.

**Abrirla desde la campana la devuelve al banner**, además de llevar a la
tarea: vuelve al estado de siempre, sin nada escondido. Mientras está oculta,
la campana se lo dice con un "Hidden from banner" debajo del detalle. La
campana ya no tiene X propia: no hay forma de borrar una tarea sin
completarla, que es justo lo que Julián pidió.

**La campana aloja las mismas**: no es una lista aparte. Lleva el número de
pendientes como badge, las lista con su detalle, cada una se puede descartar
desde ahí, y sin pendientes dice "You're all caught up".

> Actualizado el 2026-09-29: la campana ahora sigue la lógica de la pantalla
> Notifications (ver `notifications.md`): el número es cuántas hay **sin
> leer**, muestra las 5 más nuevas con *Mark all as read* y lleva a todas
> con **View all notifications**. El banner sigue mostrando sólo tareas.

El estado vive en `AppShell`, no en cada pantalla: tiene que sobrevivir a la
navegación y lo comparten banner y campana.

**Color: ámbar, no azul** (pedido de Julián). Se reusa el par de "atención"
que el proyecto ya tenía -`#fffbeb` de fondo con `#b45309`, el mismo que
usan `GuarantorBanner` y `NewHoursModal` y el que declara el badge
`warning`- en vez de inventar un amarillo nuevo. El azul lo hacía leer como
información; en ámbar se lee como algo pendiente de hacer.

## El panel del paciente se re-abría al cambiar de ítem (2026-09-08)

Colapsabas el panel, clickeabas otra sección y volvía a aparecer expandido.
El motivo: `colapsado` era `useState`, y el panel **se vuelve a montar en
cada pantalla del paciente** -cada página renderiza su propia instancia-.
Se pasa al mismo mecanismo fuera de React que ya usaba el botón de encuentro
en ese archivo, y por la misma razón. Verificado: colapsar en Ledger, ir a
Treatments, sigue en 60px.

## Billing abre su menú flotante (2026-10-06)

Como Settings: al pasar el mouse por Billing (o con su flecha, expandido o en el celular) se abre al costado un menú
con **Billing**, **Fee Schedules**, **Carriers** y **Coverage Table** (las tablas de Settings → Billing). Billing queda
activo en `/billing` y en esas tres; Settings deja de marcarse ahí. `BillingItem` en `Sidebar.tsx`, con la lógica de
abrir y cerrar compartida (`useFlotante`). Design system: *Elements / Navigation → States → Billing menu*.

## Menú expandido más angosto: 234 → 176px (2026-10-07)

Pedido de Julián, con una captura y una línea negra marcando hasta dónde: con 234px el menú abierto le quitaba
demasiado a la pantalla. La línea caía a ~178px reales (la captura venía escalada ×1,33: el bloque del logo, de 64px,
medía 85); se tomó **176**. Entra todo sin cortar: "Confidentally", "Scheduling" y "Documents" son lo más largo, y los
ítems quedan a 12px de cada borde (`mx-3`, de 12 a 164). Colapsado sigue en 58.

**Sólo escritorio.** En el celular el menú es un panel encima del contenido y no le roba lugar a nadie, así que sigue
en 234: ahí además el menú de Settings se despliega adentro, con sus sub-items.

**Settings se salía del rail 12px.** Su ítem llevaba `w-full` además del `mx-3` de todos: medía el ancho entero del
rail más el margen y se pasaba por la derecha (se ve en la captura de Julián, la barra azul cruza el borde). Se quitó el
`w-full`; ahora va de 12 a 164 como el resto, en escritorio y en el celular.

Verificado con Playwright en `/settings/consents` a 1500px: rail de 176, ningún ítem desborda, desborde horizontal 0,
y los flotantes de Billing y Settings siguen saliendo al costado.

**Navigation en Storybook, completa** (misma fecha). Con la regla nueva de documentar todo antes de subir, la página
*Elements / Navigation* deja de ser una lista de historias y pasa a Playground (con *open* para tooltip y menús),
Parts, States y Specs. Specs lee del rail dibujado: 176 y 58 de ancho, logo de 64, ítem expandido 152×36 con 12px de
padding, colapsado 32×32. No lleva estado de foco: los ítems no tienen anillo propio (usan el del navegador) y el addon
de pseudo-estados sólo fuerza reglas de CSS, así que la muestra salía igual al default.

