# Consents (Settings → Consent Templates)

Nodo Figma: `4106:170620` ("New Consent Template"). Lista de templates a la
izquierda, editor en el medio, preview a la derecha. Código en
`src/pages/settings/Consents.tsx` (pantalla) y
`src/components/settings/ConsentDocument.tsx` (la hoja del preview).

## El preview es una hoja de documento (2026-09-24)

Pedido de Julián: el preview tenía que parecer **el documento que ve el
paciente**, no una tarjeta más de la interfaz.

- **Escritorio gris, hoja blanca.** El panel del preview pasa a fondo `#f5f6f8`
  y adentro va una hoja blanca con sombra de papel (borde de 1px + sombra
  suave + sombra larga abajo). El encabezado "Preview" / "Patient View" queda
  en el escritorio, fuera de la hoja: es de la app, no del documento.
- **Tipografía: la de la app, no serif.** Se probó con serif (Georgia) y Julián
  pidió volver a la de antes: Inter, cuerpo 12px, rótulos en versalitas de
  10px semibold, título 17px bold. El aspecto de documento sale de la
  estructura -hoja, membrete, recuadro, casillas, firma-, no de la fuente.
- **Membrete:** monograma de la clínica, "Los Angeles, Dental Clinic" y debajo
  "Consent sent: …", con filete azul de 2px. Título centrado con la etiqueta
  "Informed Consent" arriba.
- **Recuadro de datos** de 2×2 con líneas finas: Patient, Provider,
  Appointment, Procedure. Cada casilla lleva su rótulo con el ícono que pidió
  Julián; la cita separa fecha y hora en dos líneas.
- **Secciones** con rótulo en versalitas y filete: Diagnosis y Clinical
  Findings (sólo en la vista de clínica), Nature of procedure, Risk and
  complications y Patient acknowledgment.
- **Acknowledgment con casillas vacías** -es un formulario que el paciente
  todavía no firmó, no una lista informativa-. Son cinco afirmaciones (leyó y
  entendió, tuvo oportunidad de preguntar, entiende riesgos/beneficios/
  alternativas, sabe que puede rechazar, consiente voluntariamente) y un aviso
  debajo: todas deben estar marcadas antes de que el paciente firme.
- El **texto guía en cursiva** de Nature of procedure y Risk and complications
  vive en el editor, debajo de cada caja: es para quien redacta el template, no
  para el paciente (2026-09-25).
- **Cierre:** línea de firma "Patient / Legal Guardian" con una "X" al inicio,
  línea de fecha al lado, y pie "Page 1 of 1".

**La hoja crece con el contenido.** Tiene proporción carta (8.5×11) como
*mínimo*, pero con el texto real las secciones fijas (datos, acknowledgment,
firma) ya la dejan más alta que una carta. Se prefirió eso a escalar la página
entera con `transform`, que dejaba el texto en ~6px. Tope de 520px de ancho:
en una sola columna la hoja no se estira, se centra.

## Reorganización de la pantalla (2026-09-24)

Pedido de Julián: el preview se veía chico al costado y la pantalla no se
entendía de un vistazo. Misma lógica, mejor flujo:

- **Preview más grande y siempre a la vista.** Columnas `260px | editor |
  preview` con el preview 1.15× el editor (antes 300 / 1fr / 340). Va
  `sticky` arriba con scroll propio si la hoja es más alta que la ventana, así
  se sigue viendo mientras se edita. Debajo del título dice "What the patient
  receives".
- **Las columnas dependen del ancho del contenido, no de la ventana**
  (`@container`): con el menú expandido el contenido es ~250px más angosto que
  la ventana, y con los breakpoints de viewport el preview se aplastaba.
  ≥1024px de contenido: tres columnas · ≥768px: lista a la izquierda, editor
  y preview apilados a la derecha · menos: todo apilado.
- **El título del editor dice qué se está haciendo.** "Edit Template" con el
  estado (Active / Inactive, System) al lado cuando hay uno elegido, y "New
  Consent Template" cuando se crea. Antes decía siempre "New Consent
  Template", incluso editando uno existente, y repetía la descripción que ya
  está bajo el título de la página. (Es un desvío deliberado del Figma, que
  deja el título fijo.)
- **Guardar y Cancelar quedan fijos al pie del editor** (`sticky`), sin tener
  que bajar hasta el final para guardar.
- **Lista:** el panel se llama "Templates" (ya no repite el título de la
  página), "New template" pasa de link a botón azul relleno y chico (h-7, como Save), y el título de cada template
  hace hasta dos líneas en vez de cortarse.
- Cada tarjeta ocupa su propio alto (`self-start`) en vez de estirarse al de
  la más alta.

**Para que `sticky` funcione hubo que tocar el `<main>` de `AppShell`:** tenía
`overflow-x-hidden`, que fuerza `overflow-y: auto` y convierte a `<main>` en
contenedor de scroll aunque no scrollee -el `sticky` de adentro se calculaba
contra él y nunca se pegaba-. Pasó a `overflow-x-clip`, que recorta igual sin
crear contenedor de scroll.
