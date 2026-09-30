# Help (Confibot + Help Center)

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
