# Clinical Mode

Figma:

| Que | Nodo |
|---|---|
| Barra, botonera y overview por defecto | **4235:135661** |
| Botonera de registros (el desplegable "Exams") | **4265:56662** |
| Vitals | **4106:205304** "Vitals — Section (Entry Form)", 4 estados |
| Lab Order | **4070:148911** (listado, detalle y modal New Laboratory) |
| Tablero anterior, **descartado** | 4235:136447 / 4235:136450 |

El primer tablero (4235:136447) era una version vieja: barra con capsulas,
pills verdes claras, Medical history a la izquierda y "Ovewiev" como pestana.
La buena es **4235:135661**: pills verdes solidas, constantes como texto
pelado, Overwiev como boton de la barra y Treatment Plan como overview.

## Que es

Un **takeover**: no usa el shell de la app -ni rail ni header-, porque la
pantalla se ocupa entera con el paciente que se esta atendiendo. La unica
salida es "Exit Clinical Mode". Se entra desde el panel del paciente.

## Barra superior (4235:135661)

Solo Exit y Overwiev llevan caja; lo demas va suelto sobre el fondo `#fafbfe`.
De izquierda a derecha: `< Exit clinical Mode`, `Overwiev`, las pills verdes
solidas **CC** y **TR** (`#28c563`), los cuatro contadores redondos, las
constantes como texto (34 yrs / Male / 1.68 m / 85 kg), el profesional con su
avatar, el boton de nota clinica y `Start Enconter` con su chevron.

- **Los cuatro contadores son desplegables**, no numeritos: cada uno abre una
  lista flotante con lo que cuenta -Referrals, Medications, Conditions,
  Allergy-. Ahi vive ahora la historia clinica del paciente; el tablero viejo
  la tenia como card en la columna izquierda y 4235:135661 la sacó.
- Todo va en una fila pegada con la misma separacion entre piezas: nada se
  estira. Cuando el grupo del medio crecia, quedaba un hueco enorme antes de
  Start Enconter.
- CC y TR abren el panel derecho. En el frame estan siempre en verde, o sea
  completadas; se marca cual esta abierta con el anillo del sistema.
- El contador en **0** va en gris. Un contador vacio no es una novedad y no
  deberia llamar como los otros; el frame los pinta todos iguales.
- **Overwiev no es una pestana**: es el boton de la barra que vuelve al panel
  del paciente desde cualquier examen o registro.

## Botonera: dos juegos y un desplegable

El primer boton no es una pestana mas, es el que **cambia la botonera entera**
(4265:56662):

- **Exams**: Ros, BMI, Vitals, Physical, ATM/O-F, Intra Oral, Extra Oral,
  DentAssmt, Periodontal, Radiography.
- **Records**: Treatment Plan, Treatment, Treatment History, Lab Order,
  Prescription, Referral, Clinical Note.

El rotulo del boton dice siempre "Exams" en los dos frames -es el nombre del
menu, no el del juego activo-, con chevron derecho cerrado y chevron abajo
abierto. Cual juego esta puesto se ve marcado adentro del desplegable. La
pestana activa va en azul solido con texto blanco.

**Maquetadas**: el overview, **Vitals** y **Lab Order** (listado). El resto
queda con el empty state del sistema; cada una cuelga de su propio tablero, de
hasta 7752px de ancho.

## Overview

- **Treatment Plan**: cuatro planes con profesional, documento, nombre, pill
  "Available", tres datos (Created On en azul / Total Procedures / Total
  Amount) y el porcentaje grande con la barra. La columna scrollea sola para no
  estirar la pagina al doble del alto del odontograma.
- **Centro**: el odontograma sobre fondo punteado, con el boton de ampliar y el
  aviso de ultima condicion anclado abajo.
- **Problem list**: Date, Surface, Condition, Exam, Provider, Note, Status,
  Actions. Sin columna de pieza: el frame no la tiene.

## Vitals (4106:205304)

Seis tarjetas en grilla de 3: Anthropometry, Blood Pressure, Temperature,
Respiration, Heart Rate y SpO2. Cada una lleva titulo, subtitulo, el medidor
semicircular con el valor adentro, los campos con -/+ y el rango abajo.

- **El medidor se arrastra.** La perilla se agarra y el valor sigue al angulo;
  tambien anda con las flechas del teclado, con Home/End y PageUp/PageDown,
  porque un control que solo funciona con el mouse deja afuera a quien carga
  signos con el teclado. Los botones -/+ y el campo siguen andando.
- **El color del arco dice algo.** El frame muestra un tablero con los estados
  Normal / Elevated / Dangerously low; aca el estado sale del valor contra su
  rango, asi que el color no es decorativo. Dentro de rango el arco va azul.
- **Anthropometry** alterna Weight / Hight arriba y lb / kg abajo.
- **Blood Pressure** lleva dos campos y el aviso azul del cuarto tablero.
- Abajo, el composer "Add notes" con adjuntar, dictar y Send -apagado sin
  texto, como en el frame- y las tres acciones flotantes del borde derecho.

## Lab Order (4070:148911, listado)

Tabla de Provider / Patient / Status / Updated / Created / Expiration Date /
Actions, con Filter, New Prescription y el pie "Showing 9 active
prescriptions". Las que vencen pronto van en rojo. El detalle y el modal
"New Laboratory" quedan pendientes.

## Desviaciones deliberadas

1. **El render 3D del centro se reemplaza por el odontograma.** El frame pone
   una imagen de una boca en 3D. El odontograma que ya tiene el sistema -32
   piezas por 7 superficies- dice lo mismo, se puede operar y es un componente
   nuestro, no una foto.
2. **Los encabezados de la tabla no se parten.** En el frame se leen "Dat e",
   "Toot h", "Surf ace", "Condit ion", "Exa m", "Provi der", "Not e", "Sta tus",
   "Acti ons": las columnas quedaron mas angostas que las palabras. Es un error
   de layout, no contenido.
3. **La columna Date lleva fechas.** El frame repite tres filas con "Perez
   Marti..." truncado en la columna Date; el nombre es el del proveedor, que
   tiene su propia columna.

## Anomalias

| # | Que | Donde |
|---|---|---|
| 67 | La pestana dice **"Ovewiev"** | tabs |
| 68 | La pill verde abierta dice **"Chief Compliace"** | barra / panel |
| 69 | Medical history repite **"Conditions"** en dos tiles, con 0 y con 5 | columna izquierda |
| 70 | El boton de la barra dice "Exit Clinical" en un frame y "Exit Clinical Mode" en el otro | barra |
| 71 | La paginacion muestra `1 2 3 4 5 3 ...`: un **3 repetido y en gris** despues del 5 | Problem List |
| 72 | La columna Date lleva un nombre de persona truncado | Problem List |
| 73 | Los encabezados de la tabla se parten a la mitad de la palabra | Problem List |
| 74 | "Total Procedures" muestra `$` como valor en una de las cards | Treatment Plan |
| 75 | La pill dice **"TR"** y el panel "Triage"; en el tablero viejo era "TT" | barra |
| 76 | **"Start Enconter"** | barra |
| 77 | **"Exit clinical Mode"**, con la c minuscula | barra |
| 78 | La pestana dice **"Ros"** y no "ROS" | botonera |
| 79 | El boton del desplegable dice "Exams" tambien cuando muestra los registros | botonera |
| 80 | Condition dice **"Carries"** | Problem list |
| 81 | El plan se llama **"periodontists Alternative"**, en minuscula | Treatment Plan |
| 82 | Anthropometry alterna **"Hight"** | Vitals |
| 83 | La unidad de presion es **"mHg"** en el numero y "mmHg" en el rango | Vitals |
| 84 | El aviso azul de Blood Pressure habla de **horarios y dias**: es texto de otra pantalla | Vitals |
| 85 | El pie de Lab Order dice **"active prescriptions"** y el boton **"New Prescription"** en una pantalla de ordenes de laboratorio | Lab Order |

Se replican las de contenido (67 a 70, 75 a 85). No se replican 71 a 74: son
errores de layout o de dato, no decisiones de diseno.

## Responsive

- Barra: una fila en `lg`, con la capsula de constantes absorbiendo el sobrante
  por scroll interno. Abajo de `lg` envuelve y **Start Encounter ocupa la fila
  entera**, que es donde tiene que estar la accion principal en un telefono.
- Pestanas: scroll horizontal. Son cortas y una grilla las volveria un bloque
  de botones.
- Panel TT/CC: columna de 300px en `lg`, hoja completa abajo.
- Odontograma y Problem List: scroll horizontal propio, sin desbordar el
  documento. Verificado 0 de desborde en 390 y 1280.


## Detalles que costaron una vuelta (2026-08-31)

1. **El desplegable de Exams quedaba escondido.** El boton vivia adentro del
   contenedor con `overflow-x-auto` de las pestanas, y ese overflow recorta a
   los hijos absolutos. Ahora el boton esta afuera y solo scrollean las
   pestanas. Es el tercer bug de la misma familia -el flotante de Settings, el
   rail de Clinical, este-: una propiedad del contenedor cambia lo que puede
   hacer un hijo posicionado, y el sintoma aparece lejos de la causa.
2. **La columna del Treatment Plan pasó de 300 a 360.** Medido: la etiqueta
   "Total Procedures" pide 72px en una linea y con 300 la caja daba 67, asi que
   se partia en dos y desalineaba las tres cajas entre si. Con 360 la caja da
   80.


## Padding general de 38px (2026-08-31)

Las pantallas de Clinical Mode llevan **38px** de padding, no los 12/20 que
tenian. Con el padding chico la columna del Treatment Plan quedaba pegada al
borde izquierdo de la pantalla y toda la grilla leia corrida. En mobile baja a
16/24, que es donde 38 se come la mitad del ancho util.

El numero del medidor bajo de 34 a 27px: a 34 competia con el titulo de la
tarjeta y se montaba sobre el arco en los valores largos.


## Fill container en la barra y la botonera (2026-08-31)

En el Figma las dos ocupan el ancho entero del contenedor, y eso no era
decorativo: **Start Enconter cae en el borde derecho** y las diez pestanas son
de ancho parejo repartidas de punta a punta. Empaquetadas a la izquierda, como
estaban, sobraba un hueco a la derecha y la botonera leia corrida.

- Barra: `justify-between` en desktop; el `gap` queda de minimo y el sobrante
  se reparte entre las piezas.
- Botonera: **hug content** (4496:109598). Cada pestana mide lo que dice mas
  18px a cada lado, y el contenedor reparte el sobrante entre ellas. Medido
  contra el frame: Ros 61 vs 62, Vitals 73 vs 73, ATM/O-F 95 vs 95,
  Radiography 116 vs 111. Anchos iguales, como estaban antes, era fill en los
  hijos y no era lo que pedia el diseno.
- En angosto las pestanas vuelven a su tamano y scrollean, porque repartir once
  botones en 390px los dejaria en 30px.

El boton **Overwiev** seleccionado usa el mismo azul solido que la pestana
activa, y el hover tira a azul. Antes se marcaba con un borde negro, que no es
un estado del sistema.


## Detalles de la barra (4106:196634)

- **Gap de 12px** entre todas las piezas, el mismo de la botonera.
- Las cuatro constantes van separadas por **reglas finas**: son cuatro datos
  distintos, no una frase.
- El boton de nota clinica es **redondo**: es un icono suelto, no un control
  con etiqueta como Exit u Overwiev.

## Radiography (4106:197453)

Grilla de placas: cada card lleva la imagen con la fecha encima abajo a la
derecha y, debajo, el profesional. En el frame son cinco columnas fijas; aca
van de 1 a 5 segun el ancho. Al pie, las dos acciones flotantes azules -sumar
imagen y vista de tabla-. Clickear una placa la abre a pantalla completa.

**La placa sale del propio Figma** (nodo 4106:202592, el visor). Ojo con ese
nodo: la **columna de botones es hija del frame de la imagen**, asi que el
export la venia quemando dentro del PNG y quedaban dos juegos de controles -los
del diseno incrustados y los nuestros encima-. `contentsOnly` no los saca
porque no son contenido flotante, son hijos. Se recorta la franja x 752..819 en
vez de tocar el archivo del usuario.

Escala de grises y JPEG progresivo: 40 KB la grande y 8 KB la chica, embebidas
como data URI porque el artifact es un solo archivo y no puede pedir imagenes a
ningun host. Cada estudio la muestra con un filtro de brillo y contraste
derivado de su id: es una sola imagen de origen, no veinte.

Los tres botones del visor van **abajo a la derecha** de la placa, que es donde
los pone el frame, no centrados en su alto.

### Anomalia

| # | Que | Donde |
|---|---|---|
| 86 | Las veinte placas son la misma imagen, la misma fecha y el mismo profesional | Radiography |

No se replica: una grilla de veinte estudios identicos no se puede leer ni
ordenar. Aca varian el tipo y la fecha.


## El flujo de Radiography (2026-08-31)

Tres pantallas, no tres modales; el Figma las dibuja como pantallas completas.

1. **Grilla** (4106:197453). Al pie, dos acciones flotantes **redondas** -las
   tenia cuadradas-: sumar imagen y vista de tabla.
2. **Visor** (4106:202309). Columna de *Findings* a la izquierda -pill de
   estado, fecha en azul, kebab, zona, condicion y descriptores, con barra de
   acento roja o verde segun el estado- y la placa grande a la derecha, con las
   tres acciones redondas: sumar condicion, alejar y acercar. El zoom anda de
   verdad y muestra el porcentaje. Abajo, la tira de miniaturas con el boton de
   sumar al final, y arriba "All images" para volver.
3. **New Condition** (4106:202622). Panel derecho de dos pasos: area
   seleccionada, buscador con Filter, el catalogo de procedimientos -con el
   D0150 deshabilitado, como el frame- y, en el paso 2, descriptores y nota.
4. **Subida** (4106:201810). Zona de arrastre real, carga por URL y la lista de
   archivos. En el frame los cuatro estan congelados en "55% - 37 sec left";
   aca cada uno tiene su propio avance, porque un progreso que no se mueve no
   dice nada.

### Anomalias

| # | Que | Donde |
|---|---|---|
| 87 | **"Discarted"** en la pill de los hallazgos | Findings |
| 88 | **"Uper left"** en el area seleccionada | New Condition |
| 89 | **"PND"** entre los formatos aceptados | Subida |
| 90 | Los cuatro archivos suben con el mismo porcentaje y el mismo tiempo restante | Subida |

Se replican 87, 88 y 89 (texto). La 90 no: es un estado congelado del frame,
no una decision.

## Barras compactas y padding (2026-08-31)

Padding general de **30px** a cada lado (16 abajo de `sm`). Las barras no se
estiran igual porque los botones son hug y el gap es fijo: el sobrante queda a
la derecha en vez de repartirse entre ellos. Lo que las estiraba antes era
`justify-between`, no el ancho del contenedor.

- Botonera: gap de **12px**, el del frame, y las pestanas siguen en hug.
- Barra: gap de **8px**. El frame usa 12, pero sus controles miden 34 de alto y
  los nuestros 36 con texto de 13px; con 12 la fila no entraba en 1124 y
  scrolleaba. Medido: con 8 entra justa, 1124 de contenido en 1124 de caja.


## Treatment Plan (Figma 4118:220403)

Seccion "Cases, Workflow & Dialogs". Vive en la pestana **Treatment Plan** de
la botonera de registros.

- **Rail de estados**: Unassigned, Pending Decision -desplegable, con los tres
  casos-, Acepted y Discarted. La columna mide 240px: medido, "Periodontists
  Recommended" pide 179px de texto y con el icono y el padding no entraba en
  los 190 del frame.
- **Unassigned**: tabla de procedimientos sueltos con New Case Group, New
  Alternative Case y Move to.
- **Caso**: cabecera con el nombre y su lapiz, Move to y el kebab con Present /
  Accept / Discard / Delete; fecha y autor; categoria y notas; total; y una
  tabla por visita con la barra azul del encabezado.
- **Dialogos** con la copia del frame: Present Case, Accept Case, Discard Case,
  Remove Procedure y Delete Case -este ultimo con las dos opciones de alcance-.

### El consentimiento sube al principio

El frame lo deja **al pie del caso**: una fila ambar con el titulo, la misma
advertencia repetida dos veces -"Provider signature pending"- y dos botones de
icono sin rotulo. Para saber quien firmo habia que abrir Consent history y
recien ahi elegir el documento.

Rediseñado a pedido de Julian: el documento es **lo primero de la pantalla** y
el bloque responde las tres preguntas que importan sin abrir nada.

- **Que documento es**: titulo, pill de estado y cuantas firmas faltan.
- **Quien firmo**: una fila por firmante con su nombre, tilde verde y fecha si
  firmo, o alerta ambar y "Signature pending" si no.
- **Que falta hacer**: la accion pendiente es un boton rotulado -"Sign as
  provider"-, no un icono escondido. Al lado, "Open document".
- **El historial es secundario**: un boton "History" que abre un panel lateral
  con la linea de tiempo de versiones.

El ambar se mantiene, pero como acento del estado pendiente y no como marco de
toda la card: cuando entran las dos firmas el bloque pasa a verde solo y el
texto cambia a "All signatures collected". Verificado.

### Anomalias

| # | Que | Donde |
|---|---|---|
| 91 | **"Acepted"** y **"Discarted"** en el rail | Treatment Plan |
| 92 | La card de consentimiento repite **"Provider signature pending"** dos veces | Consent |
| 93 | El pie de la tabla dice **"Showing 8 of 8 insurances"** en una tabla de procedimientos | Unassigned |
| 94 | El dialogo Delete Case rotula **"Select destination case"** lo que en realidad es el alcance del borrado | Delete Case |

Se replican 91, 93 y 94 (texto). La 92 no: la advertencia repetida se
reemplaza por la lista de firmas, que es lo que el usuario pidio.


## Ajustes (2026-08-31, segunda vuelta)

- **Padding de 25px.** Con eso las dos barras arrancan en la misma x que las
  cards de abajo. Medido: barra, botonera y card, las tres en x=25.
- **Botón de sólo ícono** (Figma 4122:248298): caja blanca, borde gris finito y
  el **ícono en negro**, con el mismo hover que los botones con texto. Va sólo
  en los **flotantes** —el zoom del visor y las acciones al borde de Vitals y
  Radiography—, que antes eran azules fijos. Los kebabs de tabla y los íconos
  dentro de una card siguen sueltos, sin caja. Los tres estilos están en
  `src/lib/estilos.ts`.
- **Las pills CC y TR cuelgan un desplegable**, la misma lógica que los
  contadores. Eran un panel lateral de 300px que ocupaba media pantalla para
  mostrar dos párrafos. `ClinicalSidePanel` se fue.

## Treatment Plan: ajustes

- Se entra por **Unassigned**, que es el estado por defecto del frame
  (4118:220406), y el ítem activo del rail va en pill azul.
- El **bookmark marca favorito** —relleno cuando lo está—; el resto de la fila
  navega. Antes el ícono era decorativo.
- **Move to** y **New Alternative Case** abren el mismo modal, "Move Procedure
  to Existing Case" (4122:246942), con el select y los radios del sistema. Que
  New Alternative Case abra un modal titulado "Move Procedure" es del Figma.

| # | Que | Donde |
|---|---|---|
| 95 | New Alternative Case abre un modal titulado **"Move Procedure to Existing Case"** | Treatment Plan |
| 96 | Las dos opciones del modal traen **el mismo detalle**, aunque "Move to destination plan only" diga lo contrario | Move Procedure |

## Dashboard: atajos en la ficha del turno

El popup del paciente mostraba el turno y no llevaba a ningún lado. Ahora tiene
dos accesos con el botón de ícono del sistema: la **ficha del paciente** y
**Clinical Mode**.


## Ajustes (2026-08-31, tercera vuelta)

- El **consentimiento** perdió la fila de botones del pie y el rótulo del
  History: quedan el ícono con su título y el kebab, que ahora incluye la firma
  pendiente además de Open document, Send to patient again, Replace document y
  Download PDF. El estado de cada firma sigue a la vista, que era el punto.
- La tabla de **Unassigned** lleva casillas por fila y una de seleccionar todo.
  Con filas marcadas aparece una barra que dice cuántas y ofrece Move to,
  Remove y Clear: seleccionar sin acción no sirve de nada.
- El modal de **Move Procedure** respira: la bajada baja a 12px, los bloques se
  separan y las tarjetas de opción ganan padding. Antes era todo 13px pegado.
- Los **contadores clínicos de la barra** usan el `ClinicalPopover` y el
  `ClinicalItemModal` del dashboard del paciente, así que desde ahí se puede
  **agregar, editar y borrar** medicación, condiciones y alergias, y el número
  del contador sigue la lista. Referrals no es una categoría clínica y conserva
  su lista simple.
- `ClinicalPopover` tomaba el ancho del ancla. Colgado de una card del
  dashboard eso era el ancho de la card; colgado de un contador de 46px el
  panel quedaba en una tira ilegible. Ahora nunca baja de 300.


## Findings segun el design system (432:15211)

El panel de Findings del visor no seguia el componente. Ahora si:

- Cabecera con **dos botones**: "+ Review Exam" en azul apagado (#8eaadd) y
  "+ No Finding" en azul pleno. Antes el primero era un link de texto.
- Cada hallazgo es una **card gris #f9f9f9** con barra de acento a la izquierda
  -verde #1e9850 activo, rojo #d20319 descartado-, la pill de estado, la fecha
  en gris, y **dos acciones en cajitas blancas**: borrar y editar. Antes era un
  kebab sobre fondo blanco con divisores.
- La zona va en **versalitas** y Condition / Descriptors debajo.
- Al pie, **"All result (6)"** con chevron.
- Seis hallazgos, que es lo que dice ese contador.

El design system escribe **"Discarded"**; el frame de Radiography escribia
"Discarted". Se usa el del design system: es el que define el componente.

**Bug que aparecio al armarlo**: la lista es flex con alto maximo, y sin
`shrink-0` las cards se achicaban hasta recortar Condition y Descriptors -71px
de alto contra los 123 que necesitan-.

## Ajustes finales de Treatment Plan

- **New Case Group** (4122:246100): un solo campo, Case Name.
- **Complete Procedure** (4122:250957): las tres condiciones ligadas con su
  pill, fecha, kebab y "Go to procedure". El texto pide **seleccionar** las
  condiciones a marcar como tratadas y el frame no da con que: se les suma la
  casilla del sistema, y el toast dice cuantas se marcaron.
- La **bajada de los dialogos** pasa a la columna del titulo. Suelta a lo ancho
  se metia por debajo de la X.
- La placa del visor baja a 16/9 con tope de 430px: a 16/11 se comia la
  pantalla y obligaba a scrollear para ver la tira de miniaturas.


## Barra y botonera desde el CSS del Figma (2026-08-31)

Julian exporto el CSS de los nodos "Clinical Header" y "Tab Bar". Las medidas
salen de ahi, decimales incluidos, porque son las que hacen que las tres filas
de la pantalla queden alineadas entre si.

**Barra** — fila de 1124, gap **21** entre los cinco grupos; ninguno crece, y
la suma de los grupos mas los gaps da exactamente 1124.

| Grupo | Gap interno | Detalle |
|---|---|---|
| Nav & Status | 9.82 | Exit (171x35.36) y Overwiev (118x35.36), caja blanca, radio 5.89, label 13.75/600. Las pills CC y TR: 22.81 de alto, radio completo, `#28C563`, label 10.9/400, check de 9.08, con gap 11.25 entre ellas |
| Notification Icons | 6 | Capsulas de 18.17 con fondo `#F9FAFB`, borde `#E5E7EB`, icono `#1D56BC` de 11.88 y badge de 14.04 en `#1D56BC` con el conteo en 7.57 |
| detail-info-bar | 3.93 | Cuatro celdas de 15.71 con regla a la derecha `#E4E4E7` -la ultima no lleva-, texto 11.79 en negro |
| user-info-bar | 3.19 | Avatar de 23.71 y el nombre en 11.95/600 `#18181B` |
| Start Encounter | 9 | Boton de nota redondo de 31.43 con borde `#E4E4E7`, y el pill verde de 142.41x31.79 radio completo con play de 13.75, label 10.8/600 y chevron de 15.71 adentro |

El export pinta el badge del contador en **azul tambien con 0**: se abandona la
idea de pintar el cero en gris.

**Botonera** — fila de 1124, gap **10.64**. Cada pestana: alto 33.96, padding
21.27, radio 5.32, label 11.52/600, y **`flex-grow: 1` con la misma base**: las
once terminan del mismo ancho llenando la fila. 11 x 92.51 + 10 x 10.64 = 1124.
En angosto vuelven a su tamano y scrollean.

En el telefono los grupos de la barra **envuelven**: los 370px del primero no
entran en 358 y la fila terminaba scrolleando de costado.

## Vitals: el arco recortado y el aviso (2026-08-31)

- **El arco se veia cortado** en las dos puntas y abajo. La perilla sobresale
  del trazo -su radio es GROSOR/2+4- y el viewBox no tenia margen para ella.
  Ahora el viewBox lleva ese padding: 196x114 en vez de 184x96.
- **El aviso azul de Blood Pressure ya no esta por defecto**: aparece cuando el
  valor se va del rango normal. Fijo, era una advertencia que nunca advertia de
  nada.
- El medidor toma un alto fijo dentro de la card, asi los campos y la linea de
  rango quedan a la misma altura en las seis y la grilla deja de verse
  desordenada.

## La placa: 819x552

El tope va en el **ancho**. Topando solo el alto, en una columna mas ancha el
marco quedaba en 874x552 y la proporcion se iba a 1.58 en vez de 1.48. Y el
`w-fit` en el contenedor con un hijo `w-full` los colapsaba a los dos a 0.

## Iconos de accion en negro

`ICONO_SUELTO` pasa a `#09090b`. Un icono que hace algo -el kebab, el history,
el ojo- se dibuja con el mismo peso que el texto que acompana; en gris parecia
deshabilitado.


## Ancho y padding (2026-08-31)

Se probaron las tres variantes hasta dar con la que Julian queria:

1. **Estirar los botones** para llenar el contenedor -`flex-grow`-: rechazada,
   cambia el diseno de los botones.
2. **Topar el contenido en 1110**, el ancho natural de la botonera con sus
   botones en hug, y centrarlo: deja las dos filas justas, pero a 1280 son 85px
   de padding a cada lado y en pantallas grandes desaprovecha el ancho.
3. **Repartir el sobrante en los huecos** con `justify-between`: la fila llega
   al borde pero los huecos se van a 19 en 1280 y 47 en 1600, muy lejos de los
   10.64 del export.
4. **La que quedo**: el hueco queda **fijo en 10.64** y el sobrante lo absorben
   las **pestanas**. `grow` con base automatica reparte el extra en partes
   iguales, asi cada pestana crece lo mismo y conserva su diferencia de ancho
   -no es `basis-0`, que las igualaria a todas-.

Medido a 1280: huecos de 11 y pestanas de 72 / 73 / 83 / 98 / 102 / 103 / 106 /
113 / 115 / 122, terminando exacto en el borde. A 1600 el hueco sigue en 11.
Es la estructura de la captura: huecos chicos y parejos, pestanas de anchos
distintos, fila llena.

Padding lateral de **48px** en desktop -16 en telefono- y tope de 1440.

## Contadores e items del desplegable

- Los **iconos de los contadores** pasaron de 12 a **16px** y la capsula de
  18.17 a 26: a 12 no se distinguia de que era cada contador.
- En el desplegable, **el nombre del medicamento va en su propia linea**.
  Compartia fila con la pill, el "Since" y los dos iconos, y en un panel
  angosto se truncaba hasta desaparecer: colgado del contador no se leia que
  medicacion era. El ancho minimo del popover subio de 300 a 360.


## La barra alta: un solo hueco (2026-09-01)

Con `justify-between` el sobrante se repartia entre los cinco grupos y quedaban
separados casi el doble de lo que muestra la captura. Ahora los cuatro primeros
van pegados con su hueco de **12** y el sobrante cae **entero antes del ultimo
grupo** —el boton de nota y Start Enconter—, que se corre al borde derecho con
`ml-auto`.

Medido a 1280: huecos de 12 / 12 / 12 y uno de 86 antes del grupo final, que
termina en 1232, el borde del contenido. Es donde lo pone la captura.

En el telefono el grupo final ocupa la fila entera, como el resto.

## DentAssmt, primer examen real (2026-09-08)

`EXAMENES` ya tenía `DentAssmt`/`Intra Oral`/`Extra Oral` en la lista desde
antes, cayendo los tres en el placeholder genérico "Planned" -nunca se habían
construido-. Se porta DentAssmt completo desde el proyecto hermano (ver
[[red-clone-dashboard-figma-sibling]] en memoria): un panel de findings con
menú de acciones (Monitor, Treat, Treated, Discard, Delete...), confirmación
antes de cada cambio de estado, un wizard de 3 pasos para cargar un
procedimiento (elegir código → superficie → vincular findings) y firma de
revisión del exam.

**Diferencia grande con el original**: ellos arman el chart con una imagen
PNG (1042×797) y hotspots invisibles encima calculados a mano por porcentaje.
Acá se reusa **nuestro `Odontogram` real** -ya existe, ya opera, y es
justamente lo que este mismo archivo documentaba como decisión desde el
principio: "no una foto"-. Clickear un diente en DentAssmt abre su detalle en
vez de pintar superficies -eso vive adentro de "New Procedure", con su propia
rueda de superficies-.

**La rueda de superficies es propia, no la del proyecto hermano**: ellos
usan un vocabulario distinto (BC/B/O/P/PC/D/M). Acá va la rueda rediseñada
con las 7 superficies que ya modela `odontogram.ts` (MB/B/DB/O/ML/L/DL), en
el mismo orden, como 6 sectores iguales alrededor del círculo oclusal.

**Simplificación documentada**: el drawer de edición del original es un
wizard de 2 pasos con estimados en dólares por finding y un segundo paso
para re-vincular findings/diagnósticos. Acá "Edit" cubre proveedor,
superficies y notas en una sola pantalla -no hay ningún otro lado de la app
que modele "estimado de costo" por finding, y re-vincular ya se hace desde
"New Procedure"-.

**"Delete" pasa a ser deshacible**: el original dice "This can't be undone".
Como toda eliminación en esta app, ahora sale con Undo en el toast.

Pendiente para otra vuelta: **Intra Oral** y **Extra Oral** -mismo panel de
findings, pero clickeás una región de un diagrama en vez de un diente-. Los
diagramas ya están embebidos como data URI en
`src/assets/clinical/intra-oral-diagram.ts` y `extra-oral-diagram.ts`
-mismo criterio que `panoramic.ts`-, listos para cuando se arme esa pantalla.

## Corrección: nada de Drawer/Sheet (2026-09-08)

Primera versión de "New Procedure", "Edit Finding" y el detalle de diente
usaba `Sheet`/`SheetContent` -el panel deslizante desde el borde derecho-,
copiado tal cual del proyecto hermano. Julián lo corrigió: red-clone no
tiene ese patrón en ningún lado -ver [[feedback_no_drawer_pattern_in_red_clone]]
en memoria-. Se reescriben los tres como `ModalShell` (el mismo contenedor
de `NewAppointmentModal` en Scheduling, con `footer` propio por paso en el
wizard), y de paso "New document" -que ya era un modal centrado, pero hecho
a mano- pasa a usar `ModalShell` también en vez de duplicar ese markup.

`NewProcedureDrawer.tsx` → `NewProcedureModal.tsx`,
`EditProcedureDrawer.tsx` → `EditProcedureModal.tsx`,
`ToothDetailDrawer` → `ToothDetailModal`. `src/components/ui/sheet.tsx` se
borra: sin ningún uso en el proyecto, no tiene sentido dejarlo instalado
como invitación a usarlo de nuevo.

**Regla para lo que falta** (Intra Oral, Extra Oral, y cualquier otro
módulo que se porte de acá en más): el contenedor de cada pantalla del
original no se copia tal cual. Se mapea primero a lo que ya existe acá
-página propia, tabs, `ModalShell` o `Dialog`- y recién ahí se escribe el
componente.

## Odontograma con estilo propio (2026-09-13)

Julián pasó como referencia **react-advanced-odontogram**
(`ZoliQua/React-Odontogram-Modul`, demo en react-odontogram-modul.vercel.app):
*"necesito que el dentall assestment sea como el que te pase pero adecuado a
nuestro estilo"*. No se instala el paquete ni se copia su código -es un
módulo npm genérico, con su propia paleta, numeración FDI y un montón de
features que acá no van-; se reimplementa lo que define visualmente a ese
odontograma, con nuestros tonos y sobre nuestro modelo de datos.

**Lo que se portó** (`src/components/clinical/dental/ToothGlyph.tsx`):

1. **Dos vistas por pieza**, que es lo que más distingue a la referencia de
   la grilla abstracta que teníamos: la **anatómica** -corona, encía, raíces
   y conductos- y la **oclusal** con las superficies. La anatómica se dibuja
   en este orden: raíces, encía encima del arranque, corona al frente. Sin
   ese orden las raíces flotan sobre el rosa y los molares leen como orejas
   de conejo -pasó en las dos primeras vueltas-.
2. **Forma por tipo de pieza**, deducida de la posición en la arcada
   (1-3 y 14-16 molares · 4-5 y 12-13 premolares · 6 y 11 caninos · 7-10
   incisivos): el molar lleva una masa de raíz bifurcada, el canino la raíz
   más larga, el incisivo la corona en cincel.
3. **El número de la pieza codifica su estado**, como el "bold blue /
   bold italic red" de la referencia, pero calculado con **nuestros propios
   estados de Finding**: rojo si hay uno sin resolver
   (Active/Monitoring/In Treatment), azul si tiene alguno cerrado, gris si
   no tiene nada. El esmalte lleva el mismo tinte, muy suave.
4. **La vista oclusal con esquinas en diagonal**, el patrón clásico del
   odontograma. La referencia parte la mesa en 5 (M/D/B/L/O); acá se
   respetan las **7 superficies que ya modela `odontogram.ts`**
   (MB · B · DB / O / ML · L · DL), así que cada banda va partida en tres y
   la mesa oclusal ocupa el ancho completo.

**Lo que no se portó, y por qué**: el modelo **Status/Plan de dos capas con
diff** duplica lo que ya hace el flujo de Findings y procedimientos de esta
app; la **carta periodontal** completa es un módulo clínico aparte, no una
feature del gráfico; **dentición primaria/mixta**, el generador de prótesis
("Upper 12-22 zirconia"), **export FHIR/JSON**, multi-idioma y el tour
guiado son features de un paquete npm genérico, no de una clínica con su
propio backend. La **selección múltiple** y los toggles de visibilidad
(ocultar oclusal, muelas del juicio, hueso, pulpa) quedan pendientes: son
baratos y suman, pero no son el gráfico.

**El flujo de interacción no cambió**: clickear una pieza sigue abriendo su
detalle, y pintar superficies sigue viviendo adentro de "New Procedure" con
su propia rueda. La referencia edita el diente desde un panel lateral
permanente; acá eso chocaría con el panel de Findings que ya ocupa esa
columna.

## Corrección: se usa la librería real, no una reinterpretación (2026-09-13)

La sección de arriba describe un odontograma dibujado a mano imitando la
referencia. **Julián lo rechazó dos veces**: *"sigue mal, no podés
simplemente tomar el repositorio de github y pegar eso... es justamente eso
lo que quiero, que esté igual a lo que te pasé pero con la estética de
nuestro sistema"*. O sea: la librería de verdad, no una versión propia
parecida.

Ahora DentAssmt monta **`react-advanced-odontogram`** (MIT, (c) Zoltán Dul,
`ZoliQua/React-Odontogram-Modul`) vía npm, envuelto en
`src/components/clinical/OdontogramEmbed.tsx`.

Tres cosas que hubo que resolver para que conviva con esta app:

1. **Su CSS es el de una app entera, no el de un componente**: trae `*`,
   `html, body` y clases genéricas (`.btn`, `.card`, `.title`, `.pill`).
   Importado tal cual pisaba media app. `scripts/scope-odontogram-css.mjs`
   (postcss, `npm run odontogram:css`) reescribe los 650 selectores
   acotándolos a `.odonto-embed` y genera `src/styles/odontogram-scoped.css`,
   que es lo que se importa. Verificado que Billing, Patients y Dashboard
   quedan intactos.
2. **La paleta** sale de los `--odon-*` que la librería expone por
   `themeConfig`, mapeados a los tokens de la app (azul `#1d56bc`, borde
   `#e4e4e7`, texto `#09090b`). Lo que no sale de variables -radios,
   tipografía, el header de su demo con marca/idioma/GitHub, los selects con
   pastilla celeste- se corrige en `src/styles/odontogram-theme.css`.
3. **Su layout responde al viewport, no al contenedor**: apila chart y
   controles recién abajo de 1100px de viewport, así que en nuestro panel
   -que es más angosto que la ventana- el chart quedaba en 325px con scroll.
   Se fuerza `display:flex; flex-direction:column` en `main.layout`.

**Los controles al costado, no debajo**. Primero se ocultaron -Julián:
*"me dificulta estar scrolleando y no ver el gráfico"*- pero enseguida
aclaró que no iban eliminados: *"sin eso cómo le agrego al diente que tiene
caries o algún sangrado"*. Son justamente el formulario con el que se marca
la pieza, así que tienen que verse **al mismo tiempo** que el gráfico:

- `main.layout` vuelve a ser la grilla de la librería (chart + panel de
  340), pero decidida por **container query** sobre el ancho del panel del
  examen, no por media query sobre la ventana -ese fue el error de la
  primera vuelta: la librería apila recién abajo de 1100px de *viewport*, y
  acá lo que manda es el contenedor-.
- El **chart queda sticky** y la **columna de controles también**, con su
  propio scroll: se puede bajar a leer "Tooth information" sin perder de
  vista ni el odontograma ni los controles.
- El listado de Findings de la izquierda se **pliega** con un botón, para
  liberar los 300px que esa columna necesita en pantallas de 1440.

También se perdió el modal "Details for Tooth N#" propio: la librería maneja
la interacción con la pieza. El panel de Findings, New Procedure y la firma
de revisión del exam **no cambiaron**.

**Detalle que costó encontrar**: `themeConfig` aplica los `--odon-*` sobre
el nodo interno de la librería, pero el CSS acotado los lee en
`.odonto-embed` -el wrapper, que está más arriba-, así que las variables no
llegaban y quedaban los colores de fábrica. Se declaran también como estilo
inline del wrapper. Los segmentados (tabs y Status/Plan) además no
coincidían entre sí -radio 6 contra 8- ni con los de Billing/Ledger: se
igualan en `odontogram-theme.css`.

**Costo**: el bundle pasa de ~1 MB a ~5,4 MB (la librería arrastra jsPDF,
html2canvas y fuentes Noto para el export en PDF). El artifact de una sola
página sigue entrando en el límite de 16 MB, pero conviene tenerlo presente.

## Los controles, en un flotante paso a paso (2026-09-13)

Idea de Julián, después de probar la columna al costado: *"toda la parte de
Controls, Status lo haría estilo carrusel, entonces vas paso por paso y queda
todo más chico, y podemos agregarle un ícono flotante más donde estén estas
funcionalidades... de esta manera vemos todo el gráfico"*.

Cómo quedó:

- Un **FAB más** en la columna del examen -un chevron, no un "+"- abre y
  cierra el panel. El "+" sigue siendo New Procedure.
- El panel va **debajo del gráfico, en el flujo**, no flotando encima:
  flotando tapaba justo lo que se está mirando. Muestra **una sección por
  vez**: Controls,
  Statuses, Tooth details, Orthodontics, Caries, Fillings, Root and
  periodontium, Diagnoses y Tooth information. Nueve pasos, con
  anterior/siguiente y el contador en la barra de abajo.
- Se puede **minimizar**: queda sólo la barra y el odontograma se ve entero
  sin perder en qué paso estabas.
- Las filas de la librería son `<div class="row"><span>Label</span><select>`,
  y como cada label mide distinto los selects arrancaban en distinta x. Se
  alinean con una grilla de columna fija (`:has(> select)`), con el control
  acotado a 360 para que no se estire a todo el ancho.
- `main.layout` va en **flex column**: con `grid-template-columns: 1fr` el
  panel se iba igual a una columna implícita y terminaba al costado,
  apretando el chart. Pasó dos veces, queda anotado.
- Las secciones son nodos que dibuja la librería, así que se descubren del
  DOM y se muestran/ocultan por índice. Un `MutationObserver` las vuelve a
  leer porque la librería monta y desmonta cards según la pieza activa
  -Orthodontics sólo aparece en piezas elegibles-. Los títulos salen de
  `.card-title` **sacando los botones de adentro**: si no, el paso se llama
  "Statuses−" o "Tooth detailsReset".

### Ajustes del panel (2026-09-13, misma vuelta)

- **Los FAB no se mueven y siguen donde estaban**: anclados al pie de la
  card subían y bajaban al abrir el panel, y llevados a `fixed` se iban al
  borde de la ventana. Ahora `OdontogramEmbed` publica el pie del **gráfico**
  como `--odonto-chart-fin` (ResizeObserver sobre `.chart`) y la botonera se
  posiciona contra esa variable: medido, queda a 486px del tope de la card
  con el panel cerrado, abierto y minimizado.
- **Las cards de abajo van en blanco**, no con el verde del fondo punteado
  del examen: la librería las pinta con su propio `--card` y sobre ese fondo
  quedaban verdosas.
- **Las filas van en varias columnas** (`repeat(auto-fit, minmax(300px,1fr))`
  sobre la card): apiladas de a una dejaban media card vacía y obligaban a
  scrollear. Los selectores de superficie y las tiras de checkboxes siguen
  ocupando la fila entera.
- **Las filas sin contenido se colapsan**. La librería deja en el DOM filas
  que quedan vacías según la pieza activa; en una grilla seguían ocupando su
  celda. `OdontogramEmbed` mide el alto real y les pone `.odonto-vacio`,
  limpiando la marca antes de cada medición para que reaparezcan cuando
  vuelven a tener contenido. De 14 hijos pasan a 5 visibles en Tooth details.
- **Cuidado con el `display` inline del carrusel**: al paso activo hay que
  *sacarle* la propiedad, no ponerle `block`. Con `block` se pisaba el `grid`
  de la card y las filas volvían a apilarse -costó encontrarlo-.

### Rediseño del panel (2026-09-13, comentario en el artifact)

Julián comentó sobre el `aside` de controles: *"se ve mal y no está alineado
a nuestra plataforma, hacerlo mejor, mantené la lógica, sólo enfocate en el
diseño"*. Sólo CSS, ningún id ni handler de la librería tocado:

- **Cabecera de card**: título a la izquierda y acciones a la derecha con una
  línea debajo. El botón de plegar flotaba suelto contra el borde.
- **Botones** (Reset, Reset mouth, Primary dentition, OK...) con el
  secundario de la app: 28-32px, borde `#e4e4e7`, radio 6, texto 12/500.
- **Campos**: label 12/500 en `#09090b` como `FieldLabel`, y selects e
  inputs a 36px con nuestro borde, radio y sombra.
- **Tiras de checkboxes y toggles** como pastillas, con el azul de la app
  para el estado activo.
- **Tabla del resumen** con la cabecera gris del resto de las tablas, sin el
  celeste de la librería y sin cursivas.
- Los grupos que no son par label+control (`status-actions`,
  `status-extra-row`, `select-actions`) van a lo ancho y en línea: repartidos
  en las columnas de la grilla partían "Add: [select] OK" en dos renglones.
  **Ojo con la especificidad**: hay que nombrarlos `.row.status-extra-row`,
  porque si no gana `.row:has(> select)`, que suma la del argumento.

### Fuera el gate de dentición, panel más chico (2026-09-13)

- **Se saca el gate de entrada de DentAssmt**: la card "Initial Patient
  Dentition" con Permanent/Primary y la fila "Not found detection · Try
  again". Pedido de Julián. Eran de la spec del proyecto hermano, pero la
  librería ya trae Primary/Mixed/Edentulous en su panel de Statuses, así que
  preguntarlo antes de mostrar nada sólo tapaba el gráfico. Ahora el
  odontograma aparece directo al entrar a la pestaña.
- **Panel más compacto**: techo de 300px, controles de 32px, cabeceras de 12
  y pastillas de 26. El panel acompaña al gráfico, no es la pantalla.

### El panel, rediseñado de verdad (2026-09-13, 2ª vuelta)

Retocar colores no alcanzó -*"lo sigo viendo igual, quiero algo diferente"*-
porque el problema era la **disposición**, no la paleta:

1. **Cada card repetía el título que ya está en la barra de pasos**
   ("Tooth details" arriba y abajo). Se saca el texto del `.card-title` y
   queda sólo su fila de acciones (Reset, Clear selection), chica y a la
   derecha.
2. **El par label+control en línea** obligaba a una columna de label fija y
   se comía el ancho. Ahora el label va **arriba** del control, como los
   formularios de la app, y entran 3-4 campos por fila
   (`auto-fit, minmax(180px, 1fr)`).
3. **El vacío de media card** eran las filas que la librería deja sin
   contenido: `.odonto-vacio` las colapsa, pero la regla la **pisaban las de
   layout de más abajo** (`.inline-checks`, más específicas). Va con
   `!important`, que acá se justifica: es una utilidad cuyo único trabajo es
   ganarle al CSS de un tercero.

Resultado medido: la card pasa de 204px a 75 y el panel de 299 a ~200.

### El panel pasa a ser nuestro (2026-09-13, 3ª vuelta)

Estilar el markup de la librería no alcanzaba -*"sigo viendo la misma card
horrenda"*-, así que el panel **se dibuja con nuestros componentes**:
`src/components/clinical/dental/OdontogramPanel.tsx`.

Cómo funciona, que es lo no obvio:

- La librería sigue montada y con toda su lógica, pero su `aside.panel` se
  manda **fuera de pantalla** (`position:absolute; left:-10000px`), **no** a
  `display:none`: hace falta que siga teniendo layout para poder saber qué
  controles están visibles y espejarlos. Con `display:none` todos miden cero.
- `leerControles()` recorre la card activa y arma un modelo de sus
  `select`, `input[type=checkbox]` y `button` reales -con su label, su valor
  y si están deshabilitados-.
- Se redibujan con nuestro diseño, y cada interacción **escribe sobre el
  control original y dispara su evento** (`change` o `click`), así que la
  librería reacciona igual que si la hubieran tocado a ella.
- Un `MutationObserver` sobre la card refresca el modelo: la librería
  reescribe sus controles al cambiar de pieza o de estado.

Los controles deshabilitados **se muestran igual**, en gris: hasta elegir
una pieza la librería los deja inactivos, y esconderlos dejaba la card casi
vacía -que era justo la queja-.

Verificado de punta a punta con un render automatizado: apretar nuestro
botón "All" deja `activeToothLabel` en "32 teeth" y habilita los campos, y
elegir "Radix" en nuestro select escribe `radix` en el `#substrateSelect` de
la librería.

### Estados y separación del panel propio (2026-09-13)

- **Los campos ya no van pegados**: la grilla pasa a
  `auto-fill, minmax(200px, 280px)` con 24px de separación, en vez de
  estirarse a todo el ancho.
- **El botón apretado queda en azul**. La librería **no marca** sus botones
  de selección rápida -comprobado: al clickear "Teeth" no cambia ni la clase
  ni `aria-pressed`-, así que el estado lo lleva `OdontogramPanel` y se
  limpia al cambiar de paso. "Clear selection" no queda marcado, porque
  deshace la selección en vez de elegir algo.
- **Foco azul en los campos**: borde `#1d56bc` y anillo de 3px. La regla va
  en `odontogram-theme.css` y no en clases de Tailwind porque el CSS de la
  librería es **sin capa** y le gana a las utilidades, que van en `@layer`.
  Ese es el motivo de fondo de varias peleas de especificidad de esta vuelta.
- **Los labels ya no arrastran el texto de las `<option>`**: al leer la
  etiqueta hay que saltear el propio control y cualquier nodo que lo
  contenga; si no, "Incisal wear" salía como
  "Incisal wearnoneAttrition (tooth-to-tooth)Erosion...".

### Cruz de superficies y confirmaciones (2026-09-13)

- **El selector de superficies pasa a ser nuestro**. En la librería es un
  `.surface-cross` con cinco `label.surface-cell.pos-*`, cada una con su
  checkbox. `CruzSuperficies` lo redibuja como la cruz de un odontograma
  -vestibular arriba, lingual/palatina abajo, mesial y distal a los costados,
  oclusal al medio- con la referencia al lado, y cada celda escribe sobre su
  checkbox real. Esos checkboxes se excluyen del listado genérico para que no
  salgan además como pastillas sueltas.
- **Cerrar no pierde nada**: el botón X abre una confirmación que lo dice
  explícitamente -lo cargado queda en el odontograma, cerrar sólo esconde los
  controles-. Verificado que "Keep open" deja todo como estaba.
- **Lo que sí borra, avisa**: los botones cuyo nombre cae en
  `reset|clear|edentulous` piden confirmación antes, con el botón de
  confirmar en rojo. Son los únicos que efectivamente vacían la
  configuración.

### El panel escribía sólo en el DOM (bug real, 2026-09-13)

Julián reportó *"cuando cierro, la configuración vuelve al default"*.
Comprobado con el propio resumen de la librería: marcar una superficie no
cambiaba `Caries: No carious teeth.`, o sea que **el panel no llegaba a su
estado**. Estaba poniendo `.checked` / `.value` a mano y disparando un
`change` sintético: eso cambia el DOM, la librería no se entera y en el
siguiente render vuelve todo atrás.

Ahora los controles se accionan **como lo haría una persona**: los
checkboxes con `el.click()` -que dispara el flujo nativo completo- y los
selects con el setter nativo de `HTMLSelectElement.value` más `input` y
`change`. Verificado con el resumen, que pasa a
`Caries: 1 (O) – superficial, 2 (O) – superficial, ...`, y con un cierre y
reapertura del panel: el estado queda.

**Lección**: para saber si una escritura entró en la librería no sirve leer
de vuelta el mismo nodo que escribiste -eso siempre da true-; hay que mirar
algo que produzca ella, como el resumen.

También, el botón marcado se guarda **por sección** (`accionPorPaso`): al
volver a un paso tiene que seguir elegido lo que se dejó.

### Cerrar descarta, minimizar guarda (2026-09-13)

Quedaron como dos gestos distintos, que era la confusión de antes:

- **La cruz descarta**: confirma primero -en rojo, avisando que no se puede
  deshacer- y devuelve el odontograma al default. Se apoya en el
  `#btnResetAll` de la librería, que es quien sabe cuál es ese default.
- **El chevron minimiza**: esconde los controles sin tocar nada, y el propio
  aviso de la cruz remite a él para el caso de "sacarlo de en medio sin
  perder lo hecho".

Descartar deja todo como recién entrado: además del reset, llama al
`clearSelection()` que la librería exporta -si no, las piezas quedaban
elegidas- y el carrusel vuelve al paso 1 con el panel remontado, así no
queda ningún botón marcado.

Verificado con el resumen de la librería: minimizar deja
`Caries: 1 (O) – superficial, ...`; descartar vuelve a
`Caries: No carious teeth.`, con `activeToothLabel` en "—", el paso en
"1 of 9" y el botón "Teeth" sin marcar.

También se saca el botón de plegar el listado de Findings.

### "Tooth information" también pasa a ser nuestro (2026-09-13)

Era el último paso que seguía con el markup de la librería -numeración en
rojo itálica, la leyenda de negritas, los hallazgos como párrafos largos-.
`ToothInfoPanel` lee ese nodo -que sigue siendo la fuente, con su
`MutationObserver` para los cambios del chart- y lo muestra como ficha:
titular, la tabla de arcadas con la cabecera gris del resto de la app, y los
hallazgos en columnas de rótulo + valor. Los renglones sin dato -los que la
librería escribe empezando en "No"/"no"- van en gris claro, para que no
pesen lo mismo que un hallazgo real.

Con eso el nodo de la librería se manda fuera de pantalla igual que el
panel: **ninguno de los nueve pasos usa ya su markup**.

### El azul es sólo estado activo (2026-09-13)

El FAB de "New procedure" estaba azul fijo, como si estuviera prendido. Los
cuatro botones de la columna van neutros -blanco con borde- y el azul queda
reservado a los que **sí** tienen estado: los controles cuando el panel está
abierto y la tabla cuando es la vista elegida.

### "No me marca las caries" (2026-09-14)

Verificado que **sí marca**: seleccionando una pieza y tocando una
superficie, el diente muestra la lesión negra en la vista anatómica y en la
oclusal -igual que la referencia, donde la caries también se dibuja en
negro- y el resumen pasa a `Caries: 1 (O) – superficial`.

Lo que faltaba era el paso previo: **sin pieza elegida la librería
deshabilita todos los campos**, así que se tocaba una superficie y no pasaba
nada. Ahora, cuando están todos deshabilitados, el panel lo dice:
*"Pick a tooth on the chart to edit it"*.

Nota para depurar esto en el futuro: el primer `[data-tooth]` del chart es
el **18 en FDI**, que con nuestra numeración universal se muestra como
**1**. Recortar una captura por `data-tooth` sin tener eso en cuenta lleva a
mirar el diente equivocado y creer que no se pintó nada -me pasó-.

### Fillings: el orden importa, y ahora se avisa (2026-09-14)

*"Fillings and restorative no funciona"*. Comprobado contra el resumen, el
problema es de **orden**, no de la integración:

- Marcar una superficie con Type en "No filling" no hace nada.
- Y elegir el material **después** tampoco lo recupera: la marca se perdió.

O sea que el único orden que funciona es material → superficie, que es el
inverso del natural (primero dónde, después qué). Ahora, mientras
`#fillingSelect` está en `none`, la cruz va apagada y el panel lo dice:
*"Choose a filling type first — marking a surface before that has no
effect."* Al elegir material el aviso desaparece y marcar la superficie
registra `Fillings: 1 (O)`.

### Pendientes al minimizar (2026-09-14)

Pedido de Julián: al esconder la card, que avise qué quedó sin completar.
El panel marca como *tocada* cada sección donde se cambió algo -select,
checkbox, superficie o botón-, y al minimizar la barra pasa a decir
"7 sections left" con los nombres ("Controls · Statuses · Tooth details +4",
y el resto en el `title`). "Tooth information" no cuenta: es un resumen, no
algo para completar.

### Ajustes del panel (2026-09-14)

- **La cruz de superficies va al lado de los campos**, no debajo: la fila es
  un flex y los selects ocupan lo que sobra.
- **Chevron propio en los selects**: `appearance: none` y el `ChevronDown`
  de la app encima, para no mostrar la flecha del sistema.
- **Los chevrones de paso van juntos**, como un paginador. Separados a los
  extremos de la barra costaba saltar de sección.
- **Minimizado muestra las dos caras**: arriba lo cargado
  ("Set: Caries · Fillings") y abajo lo que falta ("7 left: Controls ·
  Statuses…"), con la lista completa en el `title`.

Sobre *"no aparece lo que seleccioné"*: no pude reproducirlo. Probado elegir
un valor, cambiar de paso y volver, y minimizar y restaurar: el select
siempre conserva lo elegido y coincide con el de la librería. Se interpretó
como "al minimizar no veo lo que cargué", que es lo que resuelve el resumen
de arriba.

### Fondo blanco en Clinical Mode (2026-09-14)

Comentario en el artifact: *"esto debe estar en blanco"*. Quedó anclado al
`body`, sin señalar ningún elemento, así que se interpretó como el **fondo
de página**: era `#fafbfe`, el mismo que el Figma usa en el dashboard, y
pasa a blanco **sólo en Clinical Mode**. Las otras pantallas siguen con el
`#fafbfe` del diseño; si el pedido era global, se cambia el
`--page-background` de `index.css` y listo.

### Las caras linguales/palatinas (2026-09-14)

Pedido de Julián: que se vea la otra cara del diente, en el medio del
gráfico. La librería sólo dibuja vestibular y oclusal.

**Primer intento, descartado**: se agregaron dos filas nuevas con un dibujo
anatómico propio de la cara lingual. Julián lo rechazó -*"te quedó raro"*- y
aclaró el pedido real: **no había que agregar filas**, sino llenar los **12
cuadrados que ya estaban vacíos** con *"una copia fiel del dibujo de arriba,
como el 6, 7, 8, 9, 10, 11, pero más chicos"*.

Esos 12 huecos son los `.tooth-tile.occl-view.placeholder` de los seis
anteriores de cada arcada: no tienen cara oclusal, así que la fila los dejaba
en blanco. `CarasLinguales.tsx` los llena con una **copia del SVG que ya
dibuja la librería** para esa misma pieza -no un dibujo aparte, así no se
despega del original ni hay dos versiones que mantener-, acotada por alto al
82% para que entre entera, y clickeable: seleccionar desde ahí es lo que
permite cargarle condiciones como a cualquier otro diente.

Detalles que importan:

- **Se le sacan todos los `id` a la copia**: duplicarlos rompería los
  `getElementById` con los que la librería resuelve sus propios controles.
- Se vuelve a copiar con el `onStateChange` de la librería, y la selección
  -que no pasa por ahí- con un observer de clases diferido con
  `requestAnimationFrame`, porque ese observer también ve nuestros cambios.

### Las caras nuevas aceptan condiciones (2026-09-14)

Verificado de punta a punta que desde una de esas 12 celdas se puede cargar
lo mismo que desde cualquier diente: seleccionar deja `activeToothLabel` en
la pieza, "Tooth condition" escribe `radix` en el `#substrateSelect`,
"Restoration" deja `Prosthetics: 6: Crown – zirconia` -idéntico a hacerlo
desde el diente de arriba, que da `Prosthetics: 1: …`- y marcar una
superficie registra `Caries: 6 (L) – superficial`.

Lo que sí faltaba era **mostrarse seleccionadas**: ahora se les pone la clase
`active` de la librería en vez de una propia, así heredan exactamente el
mismo contorno azul punteado que el resto y no hay dos estilos de selección.

Nota de depuración: los selects del panel están dentro de un `span` -el que
posiciona el chevron-, así que un locator `label > select` no los encuentra.
Dos pruebas dieron falsos negativos por eso antes de notarlo.

### Periodontal Status en dos desplegables (2026-09-15)

El tab traía las dos arcadas -dientes 1 a 16, después 32 a 17- una abajo de
la otra dentro de un mismo scroll (`.perio-fullgrid-scroll`), con las ~17
filas de cada una (Miller Class, BOP, CAL, GM, PD, Furcation, el gráfico de
dientes, Plaque, PI, GI, Mobility, CEJ, Root concavity, KG, GT) apiladas:
para llegar a la segunda arcada había que bajar más de 1000px. Julián pidió
partirlo justo donde el número de diente pasa de 16 a 32 -que es exactamente
la frontera entre arcadas- y volver cada mitad un desplegable, además de
angostar la columna de rótulos de la izquierda.

La grilla la arma la librería con DOM plano (`buildArch` en `PerioChart.tsx`
del paquete), no JSX, así que no hay prop para partirla. `PeriodontalAccordion.tsx`
saca los dos `.perio-fullgrid-arch` (330 celdas interactivas cada uno) del
scroller y los reinserta -la pieza real, no una copia, para no perder sus
listeners- adentro de dos secciones propias ("Maxillary" / "Mandibular", los
mismos rótulos que ya usa el tab Odontogram), colapsables de forma
independiente. Igual que "Periodontal Status" en general, el tab se
desmonta entero al cambiar a otro (no es un `display:none`), así que cada
vez que se reabre aparece un scroller nuevo con sus arcadas enteras: se
detecta por mutaciones en la raíz y se reparte una vez por montaje.

El ancho de la columna de rótulos (`ROW_LABEL_WIDTH = 220` en el código de
la librería) también es un valor que escribe JS, no CSS: va inline en el
`gridTemplateColumns` de cada arcada. Se angosta a 130px pisando sólo ese
primer track cada vez que la librería lo recalcula (en cada resize del
panel); las filas ya estaban preparadas para que un rótulo largo pase a dos
líneas en vez de cortarse, así que no se pierde texto.

### Gráfico más chico y carga de "Buccal PD" al arrastre (2026-09-15)

Dos pedidos con un video de referencia (otra app armada sobre la misma
librería): achicar el gráfico de dientes+curva de cada arcada, y agregar la
posibilidad de cargar "Buccal PD" arrastrando el mouse en vez de tipear
cada sitio.

**El gráfico** (`.perio-tooth-arch`, 688x130 de viewBox) se dibuja a
`height:auto` -entra al 100% del ancho y el alto sale de esa proporción-,
~195px. `PerioGraficoAchicado.tsx` no tiene una prop para bajarlo: le saca
el `preserveAspectRatio` por default ("meet", que ajusta por el lado que
sobra y deja franjas vacías a los costados) y lo fuerza a `"none"` para que
estire al alto nuevo (96px, puesto por CSS en `.perio-tooth-arch`) usando
el ancho entero. El diente y la curva quedan un poco más achatados, pero
las columnas siguen alineadas con el resto de las filas.

**El arrastre** (`PerioPdArrastre.tsx`) reconstruye lo que se ve en el
video: apretar sobre el gráfico y mover el mouse carga la fila "Buccal PD"
de un trazo, con la altura del cursor como profundidad (1-15mm, el mismo
rango del `input` de la librería) del sitio que tiene debajo. No hay nada
de esto en la librería instalada (2.5.0, la última publicada -se revisó
también la rama principal en GitHub, sin tagear, y tampoco está ahí-): es
un overlay propio, igual en espíritu a `OdontogramPanel`.

Dos decisiones de la implementación:

- **Un punto por sitio, no por diente.** Cada diente tiene 3 sitios
  bucales (MB/B/DB) con su propio `input`; el arrastre no los agrupa, sólo
  recorre los 48 inputs de la fila en el orden del DOM -que es el orden en
  que se ven-, así que la curva sale tan fina como en el video de
  referencia (48 puntos por arcada, no 16).
- **La escala se mide en vivo, no se hardcodea.** El eje del gráfico dibuja
  sus propias etiquetas ("5"/"10"/"15" en `.perio-mm-grid text"`); se toman
  dos de esas etiquetas por sus `getBoundingClientRect()` reales y de ahí
  sale la recta píxel↔mm. Así da igual el alto que tenga el gráfico -sirve
  para el 96px de ahora sin acoplarse a ese número-, y si la librería
  cambia el layout del eje, se recalibra sola.

Si el mouse saltea sitios entre dos eventos de un arrastre rápido, se
interpola el valor entre el sitio anterior y el actual en vez de dejar
escalones. "Buccal CAL" no se toca directamente: ya sale igual a "Buccal
PD" porque la librería lo deriva sola cuando "Buccal GM" está en cero.

Verificado con un arrastre real (`computer.left_click_drag`, no sólo
disparando eventos por JS) en las dos arcadas y después de cerrar y volver
a abrir la pestaña -la grilla se reconstruye pero los valores cargados
sobreviven, y el arrastre se reengancha solo a los inputs nuevos-.
