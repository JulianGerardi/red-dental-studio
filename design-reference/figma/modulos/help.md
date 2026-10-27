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

## Cuadrado con esquinas redondeadas, y recogido al costado (2026-10-26)

Dos correcciones de Julián sobre lo de arriba, mismo día:

- **El `rounded-full` de la entrada anterior no quedó bien.** Vuelve a `rounded-xl` -cuadrado con esquinas
  redondeadas, como tenía antes de ser arrastrable- en vez de la pastilla entera. Mismo cambio en
  `PatientInSessionPopup`.
- **La pestaña recogida (`recogido`) pasa del borde de abajo al costado derecho.** Antes era `bottom-0` con
  `rounded-t-xl` (una lengüeta que asoma desde abajo) y la flecha apuntaba para arriba; ahora es `right-0` con
  `rounded-l-xl` (asoma desde el costado) y la flecha apunta para la izquierda (`ChevronLeft`). Toma el mismo
  `pos.y` de dónde estaba el botón antes de esconderse -no es arrastrable, pero al menos queda a la altura en la
  que se la dejó, no en un lugar fijo nuevo-.

## El botón en reposo es un círculo, no un cuadrado (2026-10-26)

Julián mandó un video de otra app (otro asistente flotante) como referencia: en reposo -suelto, sin arrastrar- es un
**círculo entero**. El cuadrado con esquinas redondeadas de la entrada de arriba era para el estado **recogido**
(la pestaña al costado), que en el video se ve así -medio círculo asomando del borde- al tocar el botón chico de
esconder; no era para el estado de reposo. Se corrige: `rounded-full` en reposo (cerrada), `rounded-xl` sólo en la
card/hoja abierta -ya estaba así-. Mismo cambio en `PatientInSessionPopup` (`rounded-full` cerrada, `rounded-xl`
abierta). Sin tocar nada más de lo que ya quedó bien: arrastrable a cualquier parte, recogido al costado con la
altura (`pos.y`) de donde se dejó.

## Sólo el ícono, sin el texto al hover; y "currently being seen" suma la misma flechita (2026-10-26)

Dos pedidos más de Julián, mismo video de referencia:

- **El círculo de Confibot pierde el texto "Confibot"** que aparecía al pasar el mouse (en el video, el círculo es
  siempre sólo el ícono). Con eso se cae toda la lógica de "ancla a la izquierda o a la derecha según el lado con
  más lugar": el botón ya no cambia de ancho -siempre 44×44-, así que ancla directo con `left`/`top`, sin elegir.
  `ANCHO_CERRADO` baja de 50 a 44 (antes el ancho incluía el padding del texto).
- **`PatientInSessionPopup` suma la misma funcionalidad de esconder que Confibot**: la flechita chica
  (`ChevronDown`, mismo lugar y estética) manda la pestaña a un costado, como `recogido` en Confibot. No comparten
  código -cada una coordina su propio estado; Confibot además tiene que avisarle a `AppShell` para que no dibuje la
  hoja de chat vieja, acá no hay nada externo que depender-. Se guarda en localStorage
  (`confidentally.patient-popup-tucked`) y toma el `pos.y` de donde estaba antes de esconderse, igual que Confibot.
  La pestaña recogida dice "Patients" y es blanca, no el degradé azul -ese color es la señal de Confibot
  puntualmente, no corresponde en un indicador de pacientes-.

## La pestaña recogida: ícono en vez de nombre, un solo clic para abrir (2026-10-26)

Dos ajustes más de Julián sobre la pestaña recogida, en los dos widgets:

- **El nombre ya no está siempre a la vista.** Al lado del chevron va el ícono del widget (`Bot` en Confibot,
  `UserRound` en `PatientInSessionPopup`); el nombre aparece recién al pasar el mouse (`group-hover`, el `<span>`
  crece de `max-w-0` a 70px). Al traerla de vuelta, la pestaña de reposo entra con `panel-in` -la misma animación
  de deslizarse desde el borde derecho que usa el drawer (`ui/drawer.tsx`)-, no aparece de golpe ni "se despliega
  en forma de círculo" (pedido explícito de Julián, como referencia de lo que no quería).
- **Un solo clic trae y abre, ya no hacen falta dos.** Antes traer la pestaña sólo mostraba el botón/avatar de
  reposo, y recién un segundo clic abría el chat o el popup. Ahora `onTraer` (Confibot, vía `AppShell`) llama
  `setConfibotRecogido(false)` + `openConfibot()` juntos, y el botón de la pestaña de `PatientInSessionPopup` llama
  `setRecogido(false)` + `setAbierto(true)` juntos.
- **Bug de paso, encontrado por el e2e de Confibot** (no es de esta tanda, viene de "Confibot y currently being
  seen, arrastrables a cualquier parte"): `useArrastrable` persistía la posición por default ya en el primer
  montaje, así que `sobreFab` (Confibot arriba del FAB de Appointment requests en Scheduling) sólo se tenía en
  cuenta la primera vez que el flotante se dibujaba en la app entera -después quedaba pegado a esa posición vieja
  para siempre, tapando el FAB-. Ahora sólo persiste si ya había una posición guardada o si de verdad se arrastra
  (`useArrastrable.ts`); mientras tanto, un efecto recalcula con el `defecto()` del momento si `sobreFab` cambia.
  De paso, el colchón para no tapar el FAB (`128`) y el centrado en `x` sobre él se ajustan: la flechita de
  recoger, arriba del círculo, ahora también entra en el wrapper posicionado, así que el círculo visible ya no
  arranca en `pos.y`.

## Cerrar el chat ya no remonta el botón; ícono y tooltip de esconder más claros (2026-10-27)

Dos correcciones más de Julián sobre los dos widgets:

- **Al cerrar el chat de Confibot, el círculo volvía a entrar con `panel-in`** (la animación de "deslizarse desde
  el borde") cada vez, porque `AppShell` desmontaba `ConfibotLanzador` entero mientras `confibotAbierto` era
  true -cerrar el chat remonta el componente, React no distingue eso de traerlo de vuelta desde recogido-. En
  `PatientInSessionPopup` cerrar el popup no tiene este problema: es la misma caja que nunca se desmonta, sólo
  cambia de ancho. Se pareja el comportamiento: `ConfibotLanzador` suma una prop `oculto` (true mientras
  `confibotAbierto`) y devuelve `null` *después* de calcular la posición (useArrastrable sigue corriendo, no
  pierde `pos`) en vez de que `AppShell` lo saque del árbol. Al cerrar el chat el círculo reaparece quieto, en el
  mismo lugar, igual que la pestaña de "currently being seen".
- **El botón de esconder (la flechita chica) pasa de `ChevronDown` a `PanelRightClose`** -mismo ícono que ya usa
  la app para "colapsar un panel lateral" (Topbar, PatientSidePanel)-, con un tooltip (`ui/tooltip`, "Tuck away" /
  "Hide") porque una flecha sola no decía con claridad que esto manda el widget a una pestaña en el costado, no lo
  cierra ni lo borra. Mismo ícono y mismo tooltip en los dos widgets.

## El chat de Confibot abre donde está el botón, no siempre abajo a la derecha (2026-10-27)

Julián: la hoja de chat abría siempre en el mismo rincón fijo sin importar a dónde se hubiera arrastrado el botón
-"debería abrir en el mismo lugar donde está", como ya hace la card de `PatientInSessionPopup` al abrirse en el
lugar de su propia pestaña-.

- **`ConfibotLanzador` avisa su posición hacia afuera** (`onPosicion`, un efecto que corre antes de cualquier
  `return`, así se conoce incluso oculto o recogido). `AppShell` la guarda (`confibotPos`) y se la pasa a
  `Confibot`. Storybook no pasa esta prop -las dos quedan opcionales, nada se rompe sin tocar `Confibot.stories.tsx`
  y el `Specs`/`Parts` ahí documentados siguen siendo el fallback real-, así que ahí la hoja sigue cayendo en el
  rincón fijo de siempre.
- **Mismo criterio "hacia dónde hay más lugar" que `PatientInSessionPopup`** (`haciaIzquierda`/`haciaArriba` según
  en qué mitad de la pantalla quedó el botón), sólo desde 640px -en celular la hoja sigue siendo la de abajo a
  todo el ancho, arrastrar el botón importa menos en una pantalla angosta-. El ancla resta 28px (`ALTO_FLECHA_GAP`)
  al `top`/suma al `bottom`: `pos` es la esquina del *wrapper* (incluye la flechita de esconder arriba del
  círculo), no la del círculo en sí -mismo motivo por el que la card de `PatientInSessionPopup` tampoco arranca
  pegada a `pos.y`-.
- **La hoja, ahora en cualquier parte de la pantalla, puede terminar pasando por donde está la pestaña de
  "currently being seen"** (las dos caen cerca del borde derecho por default). En vez de resolverlo moviendo una
  u otra -con dos flotantes arrastrables de forma independiente, evitar todo cruce es mucho más que esta vuelta-,
  `PatientInSessionPopup` sube de `z-30` a `z-[41]` (por encima del `z-40` de Confibot, por debajo del `z-50` de
  drawers/diálogos): si se cruzan, "currently being seen" queda arriba y siempre se puede seguir viendo y
  tocando, en vez de taparse del todo. No es un layout sin superposición, es "ninguno de los dos desaparece".

## La hoja de chat no se sale de la pantalla y cierra como "currently being seen" (2026-10-27)

Julián: con el chat anclado al botón (entrada anterior), al abrirlo se iba muy arriba -el encabezado, con el botón de
cerrar, quedaba fuera de la pantalla- y tapaba lo que se estaba haciendo; "la experiencia debe ser como la de
patient".

- **Alto acotado al lugar libre.** Desde 640px la hoja ya no es siempre de 560px: `min(560, lugar del lado elegido -
  8px de margen)`. Con el botón cerca de la mitad de la pantalla la hoja anclada abajo arrancaba por encima del borde
  de arriba (ej.: 700px de alto, botón a y=378 → top en -110). La lista de mensajes ya scrollea por dentro, achicar
  no pierde contenido. El `bottom` también se piso a 8px como mínimo (el botón por default asoma 4px por debajo).
- **Cierra con Escape o clic afuera**, igual que la card de `PatientInSessionPopup`. El ítem *Confibot* del menú
  lateral queda excluido (`data-confibot-toggle`): su clic ya hace toggle y el `mousedown` cerraría primero, el clic
  lo volvería a abrir.
- A validar con usuarios: si cerrar con un clic afuera molesta a quien está escribiendo y toca la pantalla sin querer
  (el historial se guarda, no se pierde lo ya enviado, pero sí un borrador sin mandar).

## La pestaña se queda al abrir: la hoja sale acoplada al borde (2026-10-27)

Julián, con un mockup de los dos widgets: con la pestaña recogida, abrir no la trae de vuelta al círculo; la
pestaña se queda en el borde -chevron al revés (›) y el nombre a la vista-, y la hoja/card sale pegada al borde
derecho arriba de ella (abajo si la pestaña está en la mitad de arriba de la pantalla).

- **Confibot:** `onTraer` sólo abre el chat (ya no pone `recogido` en false). `ConfibotLanzador` sigue dibujando la
  pestaña con el chat abierto (`oculto` sólo oculta el círculo) y otro clic la cierra (`onCerrar`). `Confibot` suma
  `acoplada` (= recogido): `right: 0`, `bottom = innerHeight - pos.y` (o `top = pos.y + 32`), esquina pegada a la
  pestaña sin redondear. Alto = `min(560, lugar libre)`. La pestaña lleva `data-confibot-toggle` para que el clic
  afuera de la hoja no la cierre antes del clic de la pestaña (si no, la reabriría).
- **Currently being seen:** misma idea (`PatientInSessionPopup`, punto 12): `recogido` no cambia al abrir, la card
  acoplada reusa la lista (`detalle`) de la card que crece desde el círculo.
- **A validar con Julián:** desde la pestaña ya no hay un clic para volver al círculo arrastrable (antes, tocar la
  pestaña lo traía). Propuesta si hace falta: un control chico en el encabezado de la hoja/card, p. ej. "Pin to
  screen"; no lo agregué por no inventar controles.

## La hoja/card no tapa al otro flotante (2026-10-27)

Julián, con la captura de referencia: al abrir Confibot, la pestaña de "currently being seen" tiene que seguir a la
vista, no quedar encima de la hoja.

- **`altoSinPisar`** (`lib/useArrastrable.ts`): recorta el alto de la hoja/card para que no cruce el lugar que ocupa
  el otro flotante cerrado (`RectFlotante`: pestaña o círculo), con 8px de margen, sólo si se cruzan en horizontal.
  Mínimo 200px: una hoja inutilizable es peor que un roce.
- `ConfibotLanzador` y `PatientInSessionPopup` avisan su rect (`onRect`, también en resize); `AppShell` se lo pasa
  al otro como `evitar`. Con los dos en su lugar por default (1440×900): la hoja de Confibot queda de y=466 a 832 y
  la pestaña de Patients (426-458) a la vista; la card de Patients (458-810) no toca la pestaña de Confibot (832).
- El `z-[41]` de Patients queda como red de seguridad (si el recorte llega al mínimo).

## Columna del borde derecho: las dos pestañas y cada panel empujando al otro (2026-10-27)

Julián, con tres capturas (pantalla 1 = default, pantalla Patients, pantalla Confibot), después de que la hoja
tapara o desplazara al otro botón: así es el layout y así se despliega, con microanimación y sin saltos.

- **Default:** las dos pestañas recogidas pegadas al borde derecho, una abajo de la otra (Patients arriba, Confibot
  abajo), a la altura de Patients. `recogido` pasa a ser `true` por default en los dos (antes `false`: el círculo
  arrastrable era el default).
- **Abrir Patients:** pestaña arriba (chevron › y el nombre), la card abajo de ella, y la pestaña de Confibot
  empujada abajo de la card.
- **Abrir Confibot:** pestaña de Patients arriba, la hoja en el medio, la pestaña de Confibot abajo de todo.
- **Cómo está hecho** (`layout/DockFlotantes.tsx`): una columna `fixed right-0` con los tres en orden (Patients,
  hoja de Confibot, pestaña de Confibot); lo recogido se dibuja estático adentro, no `fixed`. `PanelDock` despliega
  el panel creciendo en alto (`grid-template-rows` 0fr→1fr + opacidad, ~260ms; al cerrar, al revés), así lo de abajo
  baja suave, sin salto. La columna mide su alto (ResizeObserver) y se corre para arriba si no entra, siguiendo la
  animación cuadro a cuadro. El chevron de la pestaña gira 180° al abrir. Escape o clic afuera cierran; otro clic en la
  pestaña también.
- **Alto de los paneles:** sheet = `min(560, ventana - 16 - 70)`; card = `min(360, …)` (la lista scrollea por dentro).
  Sólo desde 640px; en celular la hoja de Confibot sigue siendo la de abajo a todo el ancho.
- **El círculo arrastrable sigue en el código** (para quien lo tenga guardado) pero desde la pestaña no hay un clic
  para volver a él, y `altoSinPisar`/`evitar` sólo cubren ese caso. A validar: si el círculo y el arrastre ya no
  hacen falta, se pueden sacar (`useArrastrable`, el botón de esconder, `onPosicion`).
- **Storybook sin tocar:** `PatientInSessionPopup` ahora arranca recogido por default, su story se ve distinta hasta
  que se documente (pendiente de que Julián lo pida).

## La pestaña azul de Confibot queda arriba, pegada a la de Patients (2026-10-27)

Julián: con el chat abierto, la pestaña azul quedaba abajo de todo y había que ir lejos para cerrarlo. Ahora la
columna del borde es Patients (pestaña y su card) → pestaña de Confibot → hoja de Confibot: la pestaña azul no se
mueve al abrir (queda a 2px de la de Patients, como en el default) y la hoja se despliega abajo de ella, igual que la
card de Patients abajo de la suya. Lo que cambia respecto a la entrada anterior es sólo el orden de los hijos de
`DockFlotantes` en `AppShell`; la card de Patients sigue empujando a la pestaña de Confibot hacia abajo. Con 1440×900 la
columna sube para que entre la hoja de 560px (Patients 264-296, pestaña azul 298-330, hoja 332-892).

## El botón de Confibot abre y cierra, sin cruz y con ícono de colapsar (2026-10-27)

Sin historia de Jira (el módulo no tiene). Julián: el botón tiene que cerrar el chat también y no quedar activo, la
cruz de la hoja sobra, y conviene un ícono de colapsar mientras está activo para que se lea que otro clic lo cierra.

- **Sidebar:** el ítem Confibot ya alternaba (`toggleConfibot`); activo ahora cambia el ícono de `Bot` a
  `PanelRightClose` (el mismo de "esconder al costado" del resto de la app) y el tooltip del rail dice "Hide
  Confibot". Al cerrar vuelve a `Bot` y pierde el fondo azul.
- **Cruz de la hoja:** sólo en celular (`md:hidden`). Desde md siempre hay un botón a la vista que cierra -el ítem del
  sidebar y la pestaña azul, que ya giraba su chevron-, además de Escape y clic afuera. En celular el sidebar es un
  menú que se abre aparte, así que ahí la cruz sigue siendo la salida obvia.
- **No pude reproducir que "no cierra"** en `main` (Playwright, 1440×900, clic real en el sidebar y en la pestaña): los
  dos cierran. Si se ve en otro ancho o navegador, anotarlo acá con el caso.
- **A validar con usuarios:** si el cambio de ícono en el rail se entiende como "cerrar" o si confunde con salir de
  Confibot; alternativa: dejar `Bot` y sumar un chevron chico al lado (sólo con el sidebar expandido entra).

## La columna sube la mitad de lo que crece (2026-10-27)

Julián: con la card de Patients abierta, todo quedaba muy abajo y la pestaña de Confibot caía lejos. Ahora
`DockFlotantes` sube la columna la mitad de lo que crece al desplegarse un panel (`top = baseY - crecimiento/2`, con
66px = las dos pestañas como alto sin paneles), siempre dentro de la ventana: el crecimiento se reparte arriba y abajo.
En 1440×900 con Patients abierto: Patients 249-281, Confibot 637-669 (antes 814-846); con Confibot abierto las pestañas
quedan en 145-211 y la hoja en 213-773.
