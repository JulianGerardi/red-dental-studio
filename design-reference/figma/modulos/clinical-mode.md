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
