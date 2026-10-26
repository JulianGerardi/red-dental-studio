# Help (Confibot + Help Center)

**Jira:** sin epics ni historias de funcionamiento (revisado el 2026-10-24).

## De acordeón de FAQ a temas que te llevan a la pantalla real (2026-09-08)

`Help.tsx` era un acordeón estático -categorías en pills, preguntas y
respuestas en texto- con 19 preguntas ya verificadas contra el comportamiento
real de la app. Se porta a un sistema visto en un proyecto hermano de la
misma spec (ver [[red-clone-dashboard-figma-sibling]] en memoria): cada
pregunta pasa a ser un **Topic** -título, cuerpo, un ícono de "ancla"
(`data-tour`) y una mini-demo animada- que, al elegirlo, navega a la pantalla
donde vive esa función y la explica ahí encima, con un anillo de spotlight
alrededor del control real.

Las 19 preguntas y respuestas del acordeón viejo se reusan tal cual -mismo
contenido, verificado antes-, sólo cambia el formato. Una corrección salió de
portarlas: "Pick an open slot on the calendar to launch New Appointment"
no es cierto en esta app -no hay click-to-book en una celda vacía, sólo
arrastrar un turno existente-, así que el tema de Scheduling ahora describe
el botón "New appointment" real.

**Qué se deja para después** -alcance explícito, no fue un recorte
silencioso-: el proyecto hermano tiene ~31 temas contra Patient Portal
(CC/TR, quick-links, orden de coberturas, tareas/actividad, rail
colapsable) y el examen dental completo (odontograma clickeable,
intra/extra oral). Esta primera tanda cubre Dashboard, Patients, Scheduling,
Clinical Mode y Settings con el mismo contenido que ya existía. Sumar el
resto es la misma receta: nuevo `Topic` en `topics.ts`, nueva mini-demo en
`demos.tsx`, `data-tour` en el control real.

## Arquitectura

- `src/components/help/topics.ts` — tipo `Topic`, `MODULES`, `MODULE_PAGE`
  (rutas reales, no un estado de página como en el proyecto hermano -acá hay
  react-router de verdad-), `TOPICS` y `puntuarTema` (coincidencia por
  palabras, para que Confibot conteste sin depender de IA).
- `src/components/help/demos.tsx` — primitivas compartidas (`Stage`, `Panel`,
  `Pointer`) y las mini-demos, todas animadas por CSS (`@keyframes tour-*` en
  `index.css`), en loop de 4s.
- `src/components/help/CoachMark.tsx` — la tarjeta flotante con la demo, el
  cuerpo y prev/next entre los temas del mismo módulo. `Spotlight` busca
  `[data-tour="..."]` en el DOM real y dibuja el anillo (`coach-spotlight`,
  una vez, no en loop).
- `src/components/help/Confibot.tsx` — el chat. **Sin IA real** -decisión de
  Julián, para no pedirle consentimiento ni cobrarle a quien abra el
  artifact-: contesta buscando con `puntuarTema` sobre `TOPICS`, como ya hace
  el proyecto hermano de fallback cuando la capacidad `sample` no está.
- `src/components/help/HelpProvider.tsx` — el estado de "qué tema se está
  explicando" vive en la raíz de `App.tsx`, no adentro de `AppShell`: Clinical
  Mode es una ruta hermana, fuera del shell, y el CoachMark tiene que
  sobrevivir esa navegación. `Confibot` sí vive adentro de `AppShell` -se
  oculta en Clinical Mode y en Login, a propósito, mismo criterio que el
  proyecto hermano-.
- `src/pages/Help.tsx` — el índice: un acordeón por módulo, cada uno con sus
  `TopicCard`.

## Anclas agregadas (`data-tour`)

`dash-date`, `dash-stats`, `dash-filter` (Dashboard); `pat-new`, `pat-search`,
`pat-tabs`, `pat-add-relationship`, `pat-clinical-mode` (Patients);
`sched-new` (Scheduling); `set-locations`, `set-team` (Settings);
`settings-menu` (Sidebar). Los temas sin ancla -por ejemplo los que explican
un concepto en vez de un control puntual- no dibujan spotlight, sólo abren la
tarjeta con la demo.

## Títulos alineados (2026-10-06)

Help usa `PageTitle` (20px Semibold) con la bajada de 12px, como las demás pantallas (antes 24px Bold). Confibot titula
como los drawers: 18px Bold y bajada de 12px; los rótulos en mayúsculas pasan a 11px.

## Cards con sombra, sin borde (2026-10-06)

Julián pidió que en toda la app las cards generales lleven la sombra de los paneles del Dashboard en vez de stroke.
En Help: cada módulo plegable. Las cards de adentro siguen con borde fino y sombra suave (`InnerCard`). Ver *Elements / Cards*.

## Confibot vuelve a flotar abajo a la derecha (2026-10-13)

Julián pidió volver a tener Confibot flotando en la esquina inferior derecha, con el último botón que habíamos hecho.
Se recupera tal cual el de antes del 2026-09-18 (`0d8611bb`, cuando pasó al menú): círculo de 48px con el degradé azul
e ícono Bot que, con el mouse o el foco, se estira a "Confibot" y prende un halo con el degradé que corre; una flechita
arriba para recogerlo y, recogido, una pestaña pegada al borde de abajo que lo trae de vuelta. Ahora como
`ConfibotLanzador` en `Confibot.tsx`, con tokens en vez de hex (`dash-blue`, `dash-blue-glow` nuevo para el `#2f74f5`
del medio, `dash-ring`).

Lo que hizo que lo sacáramos, resuelto en vez de esquivado:

1. **Tapaba Appointment requests en Scheduling.** Una pantalla con su propio botón flotante llama a `useFabDePagina()`
   (en `HelpProvider`) y Confibot se apila centrado arriba de ese botón, a 12px. Recogido, la pestaña se corre a la
   izquierda del botón de la pantalla. Con el panel de solicitudes abierto, la pestaña queda debajo del panel, tocándolo:
   es un estado de paso y se aceptó.
2. **Tapaba Cancel/Save al pie de las páginas.** Vuelve la reserva de alto en el `main` de `AppShell` (`pb-24
   sm:pb-28`, la misma de 2026-09-08): lo que cae al pie se puede scrollear por encima del botón. Los drawers (z-50)
   lo tapan, así que sus pies no compiten con él.
3. **Chocaba con el CoachMark**, que usa la misma esquina: mientras hay una explicación abierta, o la hoja de chat, el
   botón no se dibuja.

**Decisiones nuevas.** Recogido o no se recuerda entre visitas (`confidentally.confibot-tucked` en localStorage): quien
lo esconde porque le estorba no tiene que volver a hacerlo cada vez. La flechita sigue viéndose de 24px pero tiene 40px
de área de toque, y la pestaña y la flechita muestran el anillo de foco con teclado (`dash-ring`).

**El ítem Confibot del menú lateral se queda**: abre la misma hoja y es el camino que queda con el botón recogido.
Pendiente de validar con Julián si lo prefiere sólo flotante.

## El botón de reposo pasa a la estética de "currently being seen" (2026-10-26)

Pedido de Julián: que el disparador de Confibot y el ícono de "currently being seen" (`PatientInSessionPopup`, en
`patients/`) queden **del mismo lado, separados, con la misma estética**, y los dos un poco más chicos para ocupar
menos pantalla.

- **Mismo lado, misma estética.** El círculo de 48px con el degradé azul y el halo al hover se reemplaza por la misma
  pestaña blanca pegada al borde derecho que ya usa `PatientInSessionPopup` (`rounded-l-xl border border-r-0
  shadow-floating`), con el ícono Bot en un círculo celeste (`bg-dash-count-bg`/`dash-blue`, el mismo par que ya usa
  el encabezado de la hoja de chat) en vez del avatar. De 48px pasa a 44px de alto; el texto "Confibot" que aparece al
  hover pasa de 14px a 13px.
- **Separados, no agrupados.** Siguen siendo dos pestañas en posiciones distintas, no una al lado de la otra: ésta
  queda abajo a la derecha (donde ya estaba) y la de currently being seen a media altura. Moverlas a estar pegadas
  requeriría repensar desde dónde abre la hoja de chat -hoy ancla a esa misma esquina de abajo, con todo el alto
  disponible arriba suyo; a media altura, una hoja de ~560px de alto no tendría dónde abrir en una pantalla baja-.
  Si Julián las quiere una al lado de la otra igual, es un paso más: agruparlas en un único contenedor flex en
  `AppShell.tsx` en vez de cada una con su propio `fixed`.
- **Página con su propio botón (Scheduling).** Antes el círculo se centraba arriba del botón redondo de la pantalla
  (`right-[38px] bottom-[104px]`, para quedar alineado con su centro). La pestaña nueva no es redonda, así que ya no
  hace falta centrarla: sigue pegada al borde derecho, sólo sube (`bottom-[100px]`) lo justo para no tocarlo.
- **La pestaña recogida (`recogido`) no cambia.** Sigue con el degradé: es la señal para volver a traerlo después de
  esconderlo a propósito, no el estado de reposo que se quería discreto. Si Julián la quiere pareja también, es una
  vuelta más.
- **A validar con Julián:** este botón existe para que se note -es la puerta de entrada a Confibot, que antes de
  2026-10-13 vivía sólo en el menú y se sacó porque nadie lo encontraba-. Pasarlo a neutro (como pide este pedido)
  puede volver a esconderlo un poco; si después de probarlo cuesta encontrarlo, una vuelta intermedia sería un acento
  de color sólo en el ícono (ya lo tiene, `dash-blue`) sin el degradé ni el halo del círculo.

## Arrastrable a cualquier parte (2026-10-26)

Mismo pedido que el de "currently being seen" (`patients.md`): el disparador de Confibot se puede arrastrar a
cualquier parte de la pantalla con mouse o touch, y se guarda en localStorage (`confidentally.confibot-pos`), así
que no vuelve sola al lugar de siempre entre recargas. Sin historia de Jira -UI pura-.

- **`useArrastrable`** (nuevo, en `lib/`), compartido con `PatientInSessionPopup`: pointer events (mouse y touch con
  la misma lógica), clampeado dentro de la ventana, recalcula si la ventana cambia de tamaño. Un movimiento chico
  (<5px) cuenta como click -abre Confibot-, uno más grande mueve el botón y el click no se dispara.
- **Deja de estar pegado al borde físico**: la pestaña `rounded-l-xl border-r-0` (flush contra el borde real de la
  ventana) no tenía sentido suelta en cualquier parte -se veía con un lado cortado sin motivo-. Pasa a una pastilla
  entera (`rounded-full`, border en las cuatro caras), misma estética que "currently being seen".
- **El hover que revela "Confibot"** (antes siempre crecía hacia la izquierda, porque siempre estaba pegado al
  borde derecho) ahora crece para el lado de la pantalla con más lugar: si el botón quedó en la mitad izquierda,
  crece hacia la derecha, y viceversa.
- **La posición por default sigue siendo abajo a la derecha** (corrida si hay un FAB de página), pero eso es sólo el
  primer arranque: en cuanto se arrastra una vez, la posición guardada manda.
- **La pestaña recogida (`recogido`) no es arrastrable** -ya es un estado escondido a propósito, no hace falta
  moverla- y la hoja de chat sigue abriendo siempre en su lugar de siempre, abajo a la derecha: no sigue al botón
  arrastrado. Si mover el botón lejos de esa esquina resulta confuso al abrir el chat en otro lado, es la próxima
  vuelta.
