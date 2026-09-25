# Consents (Settings → Consent Templates)

Nodo Figma: `4106:170620` ("New Consent Template"). Lista de templates a la
izquierda, editor en el medio, preview a la derecha. Código en
`src/pages/settings/Consents.tsx` (pantalla) y
`src/components/settings/ConsentDocument.tsx` (la hoja del preview).

## El preview es una hoja de documento (2026-09-24)

Pedido de Julián: el preview tenía que parecer **el documento que ve el
paciente**, no una tarjeta más de la interfaz.

- **Escritorio gris, hoja blanca.** El panel del preview pasa a fondo `#eef0f4`
  y adentro va una hoja blanca con sombra de papel (borde de 1px + sombra
  suave + sombra larga abajo). El encabezado "Preview" / "Patient View" queda
  en el escritorio, fuera de la hoja: es de la app, no del documento.
- **Tipografía de documento:** serif (`font-serif`, Georgia) para el título y
  el cuerpo; Inter sólo en lo que es formulario -rótulos en versalitas,
  recuadro de datos, firma y pie-.
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
  todavía no firmó, no una lista informativa-.
- **Cierre:** línea de firma "Patient / Legal Guardian" con una "X" al inicio,
  línea de fecha al lado, y pie "Page 1 of 1".

**La hoja crece con el contenido.** Tiene proporción carta (8.5×11) como
*mínimo*, pero con el texto real (dos textareas, cuatro riesgos) en una
columna de ~314px queda bastante más alta que una carta -más de 2:1-. Se prefirió eso
a escalar la página entera con `transform`, que dejaba el texto en ~6px. Incluso
con el template vacío las secciones fijas (datos, acknowledgment, firma) ya
superan la proporción carta.

**Excepción al piso de 11px:** rótulos, firma y pie de la hoja bajan a
9–10.5px. Es un documento reducido, y esos textos son la parte "chica" de
cualquier formulario; el cuerpo se queda en 11px.

Tope de 400px de ancho: en pantallas angostas (una sola columna) la hoja no
se estira, se centra.
