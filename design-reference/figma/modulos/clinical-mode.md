# Clinical Mode

**Jira** (funcionamiento de la app; índice en [jira.md](../../jira.md)):

- Epics: CON-1611 Encounter · CON-1610 Encounter Events · CON-1608 Vitals · CON-2825 [Post Demo] Vitals · CON-1609
  Procedure · CON-771 [CLINICA] Procedimientos, Conditions y Diagnosis · CON-3114 [Post Demo] Clinical Mode · CON-1397
  Exams 2.0 · CON-2067 Exams continuacion · CON-2083 [Exams] Procedure & Conditions · CON-880 Exam "Physical" ·
  CON-881 Exam "Extra Oral" · CON-882 Exam "Intra Oral" · CON-883 Exam "Dental Assessment" · CON-965 Examen "Review of
  Systems" · CON-810 Extraoral · CON-1649 Radiographic · CON-2212 Prescription · CON-2214 Lab Order · CON-2321
  Referral · CON-2724 Nota Clinica · CON-2793 Encounter continuacion · CON-900 Medical conditions · CON-1751 Cambios
  Procedure y Condition · CON-1961 Condition [Treatment Area] · CON-3900 Modelo de procedimientos · CON-3742 Dental
  Asessment nueva libreria · CON-3686 Patient Dentition · CON-570 Workflow · CON-2258 Workflow configuration ·
  CON-2412 Llenado de preguntas workflow · CON-4153 Ejecución y trazabilidad de procedimientos por encounter
  ([historias](https://confidetally.atlassian.net/issues?jql=parent%20in%20%28CON-1611%2CCON-1610%2CCON-1608%2CCON-2825%2CCON-1609%2CCON-771%2CCON-3114%2CCON-1397%2CCON-2067%2CCON-2083%2CCON-880%2CCON-881%2CCON-882%2CCON-883%2CCON-965%2CCON-810%2CCON-1649%2CCON-2212%2CCON-2214%2CCON-2321%2CCON-2724%2CCON-2793%2CCON-900%2CCON-1751%2CCON-1961%2CCON-3900%2CCON-3742%2CCON-3686%2CCON-570%2CCON-2258%2CCON-2412%29%20AND%20issuetype%20%21%3D%20Bug%20AND%20status%20%21%3D%20Cancelled%20AND%20%28labels%20is%20EMPTY%20OR%20labels%20%21%3D%20%22design-system%22%29%20ORDER%20BY%20created%20DESC))
- Historias de abril: CON-2827, CON-2828, CON-2829, CON-2830, CON-2936, CON-2832, CON-2833, CON-2834, CON-2835,
  CON-2845, CON-2852, CON-2939, CON-2846, CON-2854, CON-2955, CON-2937, CON-2884, CON-2885, CON-2886
  ([Jira](https://confidetally.atlassian.net/issues?jql=key%20in%20%28CON-2827%2CCON-2828%2CCON-2829%2CCON-2830%2CCON-2936%2CCON-2832%2CCON-2833%2CCON-2834%2CCON-2835%2CCON-2845%2CCON-2852%2CCON-2939%2CCON-2846%2CCON-2854%2CCON-2955%2CCON-2937%2CCON-2884%2CCON-2885%2CCON-2886%29%20ORDER%20BY%20key%20ASC))

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
**Desviacion a pedido de Julian:** esos dos botones van **solo con el icono**
(36x36, sin caja); al pasar el mouse -o con foco de teclado- el boton muestra
su caja y **se abre con el texto adentro**, como el del frame. **Empuja lo que
tiene al lado, no lo tapa**: probamos dos alternativas y las dos se descartaron
-un tooltip (Julian queria el texto en el mismo boton) y abrirse por encima con
un fondo que tapaba los primeros contadores, que dejaba el boton superpuesto
con Medications y compania-. El costo de empujar es que la barra se corre
mientras el mouse esta encima; a 1280 no llega a generar scroll horizontal.
Overwiev seleccionado conserva el azul solido -es el estado "aca estas", no
decoracion-. Ambos llevan `aria-label`. En pantallas tactiles no hay hover,
asi que el nombre no se ve.
De izquierda a derecha: `< Exit clinical Mode`, `Overwiev`, las pills verdes
solidas **CC** y **TR** (`#28c563`), los cuatro contadores redondos, las
constantes como texto (34 yrs / Male / 1.68 m / 85 kg), el profesional con su
avatar y `Start Enconter` con su chevron. El frame tambien dibuja un boton de
nota clinica redondo entre los dos: **se saco a pedido de Julian**.

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

- **Treatment Plan**: cuatro planes con profesional, nombre, pill
  "Available", tres datos (Created On en azul / Total Procedures / Total
  Amount) y el porcentaje grande con la barra. La columna scrollea sola para no
  estirar la pagina al doble del alto del odontograma; desde el 2026-10-18 llega
  hasta el final de la tabla (ver abajo).
- **Centro**: el odontograma sobre fondo punteado, con el boton de ampliar y el
  aviso de ultima condicion anclado abajo. Desde el 2026-10-18 es el chart de
  DentAssmt, de solo lectura (ver abajo).
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
"New Laboratory" quedan pendientes. Desde el 2026-10-08 va con la estética de
la app (tabla estándar, filtro y botones): ver *Lab Order con la estética de la
app* más abajo.

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
- **Tablet (768-1023px), pedido de Julian:** tres lineas. 1) Exit y Overwiev a
  la izquierda, CC y TR al final; 2) los cuatro contadores a la izquierda y, al
  final, constantes + profesional + Start Enconter; 3) la botonera. Desktop y
  telefono quedan como estaban: las clases del rango son `md:max-lg:`, y los
  `max-lg:` que envolvian el grupo del paciente pasaron a `max-md:`. (Con el
  boton de nota puesto, la segunda linea no entraba a 768: 721px contra 708
  utiles. Al sacarlo sobran ~27px y no hace falta recortar nada.)
- **CC y TR, pedido de Julian:** mas grandes que el export (28px de alto, texto
  13, tilde 12; el export trae 22.81 / 10.9 / 9.08, donde el tilde casi no se
  distinguia). **Desde `lg` van pegadas a la edad del paciente**, a la izquierda
  de "34 yrs"; en tablet y telefono siguen donde estaban (al final de la
  primera linea / con Exit y Overwiev). Son dos copias de los mismos botones,
  una oculta con `hidden` segun el ancho. Con las pills ahi la fila de desktop
  entra sin scroll desde ~1190px; abajo de eso scrollea de costado, como ya
  hacia.
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
- **Estado del caso**: Planning -> Pending -> Presented -> Accepted (o
  Discarded). El kebab los mueve: Finish Planning (no esta en el frame), Present,
  Accept y Discard; cada accion sólo se ofrece desde el estado donde tiene
  sentido.
  - Planning: lapiz para renombrar, Move to y la categoria como combo.
  - Presented: sólo el ojo de vista previa.
  - Fuera de su estado, lapiz, ojo y Move to no se esconden: quedan
    deshabilitados y el tooltip dice cuando se pueden usar. La categoria, fuera
    de Planning, es texto fijo.
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

**El arrastre** (`PerioPdArrastre.tsx`) reconstruye lo que se ve en el
video: apretar sobre el gráfico y mover el mouse carga la fila de un
trazo, con la altura del cursor como profundidad (1-15mm, el mismo rango
del `input` de la librería) del sitio que tiene debajo. No hay nada de
esto en la librería instalada (2.5.0, la última publicada -se revisó
también la rama principal en GitHub, sin tagear, y tampoco está ahí-): es
un overlay propio, igual en espíritu a `OdontogramPanel`.

Dos decisiones de la implementación:

- **Un punto por sitio, no por diente.** Cada diente tiene 3 sitios por
  cara (MB/B/DB o ML/L/DL) con su propio `input`; el arrastre no los
  agrupa, sólo recorre los 48 inputs de la fila en el orden del DOM -que es
  el orden en que se ven-, así que la curva sale tan fina como en el video
  de referencia (48 puntos por arcada, no 16).
- **La escala se mide en vivo, no se hardcodea.** El eje del gráfico dibuja
  sus propias etiquetas ("5"/"10"/"15" en `.perio-mm-grid text`); se toman
  dos de esas etiquetas por sus `getBoundingClientRect()` reales y de ahí
  sale la recta píxel↔mm. Así da igual el alto que tenga el gráfico, y si
  la librería cambia el layout del eje, se recalibra sola.

Si el mouse saltea sitios entre dos eventos de un arrastre rápido, se
interpola el valor entre el sitio anterior y el actual en vez de dejar
escalones. "Buccal CAL" no se toca directamente: ya sale igual a "Buccal
PD" porque la librería lo deriva sola cuando "Buccal GM" está en cero.

**Primer intento del gráfico más chico, descartado.** Achicarlo pisando el
alto del SVG (`.perio-tooth-arch`, viewBox 688x130, `height:auto` por
defecto) con `preserveAspectRatio="none"` lo estiraba: el diente quedaba
deformado. Julián lo marcó -*"el gráfico quedó deformado, debería estar
como antes"*- y pidió que se achique sin perder la forma, y que la arcada
entre en pantalla sin scroll. La solución real está en la sección
siguiente (2026-09-16): angostar las COLUMNAS en vez de estirar el SVG.

### Tabs para las arcadas, columnas angostas de verdad y caries en rojo (2026-09-16)

Tres correcciones sobre lo del día anterior, con la app abierta y
señalando qué estaba mal.

**Por qué angostar el contenedor no achicaba el gráfico.** Antes de
resolverlo bien se probó la vía "obvia": angostar el `.perio-fullgrid-
scroll` (con `max-width` o con un resize real de ventana) y dejar que la
librería reacomode sola sus columnas -tiene un `ResizeObserver` sobre ese
mismo contenedor para eso, `applyArchColumns` en su código-. No pasó nada:
con la ventana en 500px el SVG seguía midiendo 1030px, sin importar cuánto
se esperara. El `ResizeObserver` existe en el bundle instalado (se
confirmó en el JS minificado), pero no reacciona en esta integración -no
se llegó a determinar por qué-, así que no es un camino confiable.

**La solución que sí funciona:** pisar directamente el
`gridTemplateColumns` de la arcada, la MISMA técnica que ya angostaba la
columna de rótulos a 130px, extendida a las columnas de dientes (factor
0.6). Como todas las filas -incluida la del gráfico- comparten esa única
grilla, angostar las columnas angosta parejo toda la arcada; y como el SVG
del gráfico sigue en `width:100%; height:auto` (se sacó el
`preserveAspectRatio:"none"` del intento anterior), su alto sale solo de
ese ancho más chico, sin deformar nada. De 195px bajó a ~117px con las
proporciones intactas -verificado con `getBoundingClientRect()`, no a
ojo-. Vive en `PeriodontalTabs.tsx` (`ajustarColumnas`); ya no hace falta
el archivo aparte que sólo tocaba el SVG.

**Maxillary/Mandibular pasaron de desplegables a tabs.** Julián pidió tabs
explícitamente -*"en vez de dropdowns que sea en forma de tabs"*- para no
scrollear ni entre arcadas ni dentro de una. `PeriodontalAccordion.tsx` se
reemplazó por `PeriodontalTabs.tsx`: mismo mecanismo de mudar los dos
`.perio-fullgrid-arch` reales fuera del `.perio-fullgrid-scroll` de la
librería, pero a dos paneles mutuamente excluyentes en vez de dos
secciones colapsables independientes.

**El arrastre ahora funciona en los dos gráficos de cada arcada, no sólo
el bucal.** Cada arcada tiene un segundo gráfico -"Palatal" en Maxillary,
"Lingual / Palatal" en Mandibular- que antes no tenía el trazo enganchado.
`PerioPdArrastre.tsx` ahora saca el aspecto ("buccal"/"palatal") del
propio nombre de clase del SVG (`perio-tooth-arch-{aspecto}`) en vez de
tenerlo hardcodeado, y arma el selector de inputs con ese mismo valor -es
el que ya usa `data-perio-aspect`, así que no hay mapeo propio-.

**Las caries se pintan de rojo.** El color no es una regla de CSS: viene
horneado como `style="fill:#0a1018"` inline en cada `<path id="caries-
{surface}">` del SVG de la pieza (assets de la librería). Se pisa con
`!important` -`.odonto-embed [id^="caries-"], [id^="subcaries-"] { fill:
#dc2626 !important }`-, reusando el mismo rojo que ya usa el número de
diente con problema en `Odontogram.tsx`. Verificado leyendo el `fill`
computado del `<path>` real tras activar una cara con caries desde el
propio checkbox de la librería (`#chk-caries-{surface}`), no sólo mirando
la pantalla.

### Tres correcciones más sobre lo de arriba (2026-09-16, tarde)

**El gráfico no rellenaba el panel.** El `0.6` fijo de `ajustarColumnas`
multiplicaba lo que la librería hubiera calculado ANTES -que, según el
ancho real de pantalla de quien mira la app, puede no ser lo mismo que se
vio acá al probar-, así que en una ventana más ancha quedaba un hueco vacío
a la derecha del gráfico y de todas las filas, y en una más angosta pedía
scroll horizontal. Se cambió a que las columnas de dientes sean `fr` -osea
que reparten TODO el ancho disponible, no un número de px fijo- y a poner
el techo en el contenedor (`.perio-tabs-cuerpo { max-width: 750px }`), no
en las columnas. Así el ancho real depende sólo de la pantalla de quien
mira, no de la que se usó para calcular un factor.

Un `fr` a secas casi rompe esto: por default vale `minmax(auto, 1fr)`, y
ese `auto` es el min-content de la celda más ancha de esa columna en
CUALQUIER fila (un checkbox, un número). Con contenido que no quiere
achicarse la grilla "explota" mucho más ancha que el contenedor en vez de
repartir de verdad -se vio en vivo: gráfico de 3727px en un panel de
741px-. La solución es `minmax(0, Nfr)`, que saca ese piso. Verificado con
`getBoundingClientRect()` en tres anchos de ventana (480, ~750 y 1400px):
el borde derecho del SVG coincide con el del contenedor en los tres, sin
hueco y sin overflow.

**Algunas caries quedaban en negro.** No todas: las de las 12 caras
lingual/palatinas nuevas (`CarasLinguales.tsx`). Esas caras son un
`cloneNode` del SVG lateral **al que se le sacan todos los `id`** -para no
duplicar los que la librería resuelve con `getElementById`-, así que el
selector por `id` del fix de caries no las alcanzaba: quedaban con el
`style="fill:#0a1018"` original de la librería. Antes de sacar el `id`,
si empieza con `caries-`/`subcaries-` se le deja la clase `.caries-clon`,
que `odontogram-theme.css` pinta igual que las demás.

**"None" no se leía al seleccionarlo.** El CSS scopeado de la librería
trae DOS reglas para `.perio-overlay-switch-btn.is-active` -la primera
pone el texto en blanco, más abajo en la misma hoja (mismo peso: una sola
clase de estado) otra lo vuelve a poner en `#0b1220`, casi negro, sobre el
mismo fondo azul de fábrica-. Con el botón activo así, el texto se leía
apenas, y por eso todo el selector se sentía "amontonado" -no se
distinguía dónde terminaba un botón y empezaba el siguiente-. Se repone el
blanco con una regla `.odonto-embed .perio-overlay-switch-btn.is-active`
-gana por tener un ancestro de más, sin necesitar `!important`-.

### El "fill container" era del PANEL, no de la grilla sola (2026-09-16, noche)

Julián mandó una captura de su pantalla real -mucho más ancha que la del
navegador con la que se venía probando- con flechas a mano marcando un
hueco vacío a la derecha de toda la sección "Periodontal Status". El
`max-width: 750px` de la corrección anterior estaba puesto sólo en
`.perio-tabs-cuerpo` (la grilla): en una pantalla angosta eso alcanza para
que todo se vea prolijo, pero en una ancha el selector "None/PD/CAL…" y
los tabs -que no tenían ningún techo- seguían estirándose al ancho
completo del panel mientras la grilla, ya achicada, quedaba corta: quedaba
un descalce entre filas de la MISMA tarjeta, no un problema de la grilla
en sí.

El techo se movió al panel entero (`.perio-inline-panel`, el `#perioInlinePanel`
que contiene el título, el selector de superposición, los tabs y la
grilla), así todo se achica junto y no hay ancho que no coincida con otro
dentro de la misma sección. Verificado con la ventana en 1800px: el
selector, los tabs y la grilla terminan los tres en el mismo borde
derecho.

**Las caries seguían viéndose negras en algunas caras (labial, mesial,
incisal, distal, lingual).** El `fill` sí daba rojo -se verificó de nuevo,
en las cinco superficies-, pero el `stroke` horneado en el SVG
(`stroke:#000`) no se había tocado: con el relleno a `opacity:0.45` -así
codifica la profundidad ICDAS, eso no se toca- un contorno negro sólido es
lo que más pesa a la vista, y de lejos la mancha se leía negra con apenas
un tinte rojo. Se agregó `stroke: #dc2626 !important` a la misma regla del
`fill`.

### El techo de 750px también sobraba: fill container real (2026-09-16, más tarde)

Julián pidió aplicarle "fill container" a la tabla, sin más. El
`max-width: 750px` del arreglo anterior evitaba el descalce entre filas
-eso estaba bien-, pero seguía siendo un techo inventado: en una pantalla
angosta la tabla quedaba más chica de lo necesario, y en una ancha dejaba
un hueco vacío al lado de la tarjeta (comparado con las demás pestañas,
que sí ocupan todo el ancho). Se sacó el `max-width` y se puso
`width: 100%` en `.perio-inline-panel` y en `.perio-tabs-cuerpo`: la tabla
ahora ocupa el ancho real que le da la pantalla de quien mira, ni más ni
menos, igual que el resto de la app. Las columnas siguen en `fr`
(`ajustarColumnas`), así que reparten ESE ancho -sea cual sea- en vez de
uno fijo calculado en otra pantalla.

Es un trade-off consciente: en una pantalla muy ancha el gráfico vuelve a
crecer -si el panel mide 1000px en vez de 750px, el gráfico crece con
él-, pero ya no hay ningún ancho inventado por esta sesión que no
coincida con el de al lado. Verificado en 700px (angosto) y 1800px
(ancho): panel, selector, tabs y grilla terminan los tres en el mismo
borde en ambos casos, y el ancho de la tabla coincide con el ancho real
del contenedor que le da la página (998px a 1800px de ventana, no 750).

### "Tooth information" pasa de paso del carrusel a ícono propio (2026-09-16)

Julián pidió sacar "Tooth information" de la lista de pasos del panel
flotante (Controls/Statuses/.../Diagnoses/Tooth information, que se recorre
con los chevrones) y ponerlo en un ícono circular propio -mismo
`BOTON_ICONO_REDONDO` que "Add condition" en Radiography- arriba a la
derecha del gráfico: al pasar el mouse adelanta el resumen en un hover
card (`ToothInfoTrigger.tsx`, con el `HoverCard` de shadcn -se instaló para
esto, `npx shadcn add hover-card`, con los mismos dos bugs de siempre del
CLI: file en `@/components/ui/` en vez de `src/`, e import de `cn` desde
`"cn"` en vez de `@/lib/utils`-), y al clickear lo abre entero en un
`ModalShell`.

`OdontogramEmbed.tsx` ya no mete el nodo `.tooth-info` en `pasos`: lo lee
aparte en su propio estado (`infoNodo`), con el mismo mecanismo -mismo
`releer()`, misma comparación para no re-renderizar de más-. El nodo real
de la librería sigue siendo la fuente (`ToothInfoPanel.tsx` no cambió), y
sigue **siempre** en `display:none` en CSS -antes sólo se mostraba con
`.controles-abiertos`, y las docenas de reglas de estilo que tenía para
cuando SÍ se mostraba inline quedaron sin efecto pero sin tocar, por si
algún día vuelve a mostrarse así-.

Verificado en vivo que "Tooth information" es un resumen del EXAMEN
entero, no de la pieza seleccionada -muestra "32 permanent teeth", una
tabla de arcadas y hallazgos agregados (Caries/Fillings/Root canal/
Diagnoses/...), y ese contenido no cambia según qué diente esté
`.active`, pero sí se actualiza solo al marcar una condición real (se
probó marcando una caries y viendo aparecer "Caries: 7 (L) – superficial"
en el resumen)-. Es el comportamiento de siempre de la librería, no algo
que haya cambiado esta sesión: antes se veía igual, sólo que como último
paso del carrusel en vez de acá.

De paso, un pedido corto sobre el mismo examen: el FAB "Tooth controls"
(el de los sliders, que abría el panel de controles) se sacó -quedaba
redundante-, y su función se sumó al "+" de "New procedure": clickearlo
abre el modal de New Procedure y de una vez deja `controlesAbiertos` en
`true`, así que al cerrar el modal (Cancel o Save) el panel del diente ya
está ahí, sin un segundo click.

### El ícono se muda a la fila de botones de la librería (2026-09-16)

El ícono de "Tooth information" quedó al lado de los tabs Odontogram/
Periodontal Status/Diagnoses -pisando "Diagnoses", que quedaba cortado
("Diagno…")-. Julián mandó una captura pidiendo sacarlo de ahí y ponerlo
alineado, del mismo tamaño, en la fila de "conditions" -los botones
propios de la librería a la derecha del título "Dental chart": vista
oclusal, cordales, hueso, pulpa, limpiar selección (`.chart-actions`, con
sus botones `btn btn-ghost btn-icon`, `min-width:44px` puesto por la
librería)-.

`OdontogramEmbed.tsx` ahora también relee `.chart-actions` (mismo
mecanismo que `infoNodo`, guardado en `accionesNodo`) y se lo pasa a
`ToothInfoTrigger`, que arma su botón con las mismas clases de la
librería en vez de copiarles el tamaño a mano.

**Bug real encontrado en el camino, ya solucionado**: la primera versión
portaba el botón adentro de `.chart-actions` con `createPortal`. Al
cambiar de tab (Odontogram → Periodontal Status) React tiraba, siempre,
un error sin capturar: `"Target container is not a DOM element"`. La
causa: `.chart-actions` es de la librería, que lo saca del DOM en el
mismo instante del cambio de tab -de forma síncrona-, mientras que el
`MutationObserver` que lo nota en React corre recién en el siguiente
tick; el portal llega a intentar reconciliar contra un contenedor que ya
no está.

Un chequeo de guardia (`contenedor instanceof Element` antes de
`createPortal`) NO alcanzó: el error seguía, y un log confirmó que el
componente ni siquiera se estaba re-renderizando con un valor viejo -la
falla es interna a cómo React limpia un portal al desmontarlo, no algo
que se pueda frenar filtrando el valor de la prop-.

La solución real, en `ToothInfoTrigger.tsx`: nada de `createPortal`. El
botón se renderiza normal, adentro del propio árbol de React (como
cualquier otro hijo de `OdontogramEmbed`), y un `useLayoutEffect` lo
MUEVE con `appendChild` directo a `.chart-actions` -React sigue el nodo
por su propia referencia, no le importa dónde vive en el DOM en cada
momento-. Al desmontar, ese mismo efecto lo devuelve a su padre
original ANTES de que React intente sacarlo: React borra sus nodos
buscándolos en el padre donde él los montó, así que si el nodo ya no
está ahí (porque lo moví) tira `NotFoundError: the node to be removed is
not a child of this node`. Tiene que ser `useLayoutEffect`, no
`useEffect`: la limpieza de un efecto pasivo corre DESPUÉS de que React
ya sacó sus nodos durante el commit -se probó, y ese timing tardío no
alcanza a devolver el nodo a tiempo-.

Verificado con 5 cambios de tab seguidos (Odontogram/Periodontal
Status/Diagnoses en cualquier orden) sin un solo error en consola, y con
el ícono re-enganchándose solo cada vez -un único botón vivo en todo
momento, nunca duplicado-.

**Bug hermano, sin arreglar todavía**: `PeriodontalTabs.tsx` tiene el
MISMO problema -porta con `createPortal` adentro de
`.perio-fullgrid-scroll`, que la librería también saca del DOM al
cambiar de tab-. Se reprodujo el mismo error saliendo de Periodontal
Status. Queda anotado como tarea aparte (mismo arreglo: cambiar el
`createPortal` por el patrón de mover un nodo ya renderizado con
`useLayoutEffect`), no se tocó en esta sesión por no ser parte del
pedido.

### Corrección: el ícono va en la barra de tabs, no en `.chart-actions` (2026-09-16)

Interpretación errónea de la sesión anterior: "alineado, del mismo
tamaño, en la fila de conditions" se leyó como "adentro de
`.chart-actions`". Julián mandó de nuevo la captura de referencia -el
ícono "i" redondo, solo, a la derecha de los tabs Odontogram/
Periodontal Status, en su propia línea- y aclaró: "no quiero que esté
en la misma fila" (la de vista oclusal/cordales/hueso/pulpa/limpiar
selección). El punto 1 de esa captura ("saca el boton de diagnostic")
tampoco se había hecho: pedía sacar el botón **"Diagnoses"**
(`#openCaseDiagnosesBtn`) directamente, no sólo separar el ícono de él.

Arreglo real:
- `#openCaseDiagnosesBtn` se oculta por CSS (`display:none` en
  `odontogram-theme.css`, scopeado a `.perio-launch-bar`) — Diagnoses
  ya no está en la UI.
- `ToothInfoTrigger` se porta ahora a `.perio-launch-bar` (la barra que
  contiene el toggle Odontogram/Periodontal Status), no a
  `.chart-actions`. Mismo mecanismo `useLayoutEffect` + `appendChild`
  de más arriba, mismo motivo (esa barra también se rearma al cambiar
  de tab). En `OdontogramEmbed.tsx` el estado se renombró
  `accionesNodo` → `barraNodo` para que el nombre no mienta.
- El botón dejó las clases de la librería (`btn btn-ghost btn-icon`) y
  volvió a `BOTON_ICONO_REDONDO` -el mismo estilo circular que "Add
  condition"-, con `ml-4 size-8` para separarlo del toggle y que entre
  en la altura de la barra (32px, la misma que tenían los tabs).

Verificado con el mismo test de 4 cambios de tab seguidos: cero errores
en consola, `.perio-launch-bar` conserva el ícono enganchado, y
`#openCaseDiagnosesBtn` queda en `display:none` en todo momento.

### "Tooth information" pasa de modal a panel debajo del chart, y punto rojo de notificación (2026-09-16)

Dos pedidos cortos de Julián sobre el mismo ícono:

1. Que clickearlo **no abra un modal** -tapaba el gráfico- sino que
   despliegue el panel **debajo del "Dental chart"**, como un acordeón
   más (en el mismo lugar donde ya aparecía el panel de Controls/
   Statuses/Tooth details/etc al elegir una pieza).
2. Un **punto rojo** sobre el ícono cuando hay algo cargado para ver,
   así el usuario no tiene que abrirlo "por las dudas".

**Cambio de estructura**: `ToothInfoTrigger` ya no guarda el estado
`abierto` ni dibuja el `ModalShell` -sólo dibuja el botón redondo (lo
que se porta a `.perio-launch-bar`)-. El estado (`infoAbierto`) y el
panel expandido ahora viven en `OdontogramEmbed`, justo después de
`<OdontogramShell>`, como una card más (mismo estilo que el panel de
controles): así el botón puede vivir adentro de la barra de tabs -que
se porta con `appendChild`- mientras el panel que abre vive en su lugar
natural del árbol, sin que un modal tenga que salir de ese mismo
`<span>` portado.

**Punto rojo**: se extrajo la lectura del resumen (`leerResumen`, en
`ToothInfoPanel.tsx`) a un hook exportado, `useResumenDental(nodo)`, que
usan tanto `ToothInfoPanel` (para pintar la ficha) como
`ToothInfoTrigger` (para decidir el punto). "Hay algo para ver" no es
sólo "algún renglón no vacío": se agregó `hayHallazgo(resumen)` porque
**"Periodontal status" es la excepción** -sano se lee "the periodontium
is healthy", un texto que no arranca con "no" y que el `sinDato` del
panel (pensado sólo para atenuar visualmente, no para esto) contaba
como si fuera un hallazgo real. Sin ese caso especial, el punto rojo
quedaba prendido SIEMPRE, incluso en un examen sano recién empezado -se
detectó probando en frío, con el examen mock sin tocar-. `hayHallazgo`
descarta ese renglón cuando el valor contiene "healthy".

Verificado marcando un aparato de ortodoncia real en una pieza (Ortho
appliance → Bracket): el punto aparece al instante y el renglón
"Orthodontics" pasa de gris a texto normal en el panel; sacando el
aparato, el punto se apaga. En el examen sano de base (sin tocar nada)
el punto no aparece.

### El panel también muestra el resumen de Periodontal Status (2026-09-16)

Julián mandó una captura de la card "Summary" (Avg PD, Avg CAL, BOP%,
Charted sites, Worst CAL, Max PD, Max furcation, PI%) pidiendo que sea
"lo que vas marcando en el periodontal" -el resumen en vivo del sondaje,
no un texto fijo-.

La librería ya la dibuja sola: es `.perio-summary-card` (título
"Summary" + `.perio-fullgrid-summary-item` con label/value,
`role="status"`), con los mismos textos -se encontraron las claves de
i18n `perio.summary.avgPd`, `.avgCal`, `.maxFurcation`, etc. en
`node_modules/react-advanced-odontogram`-. No hubo que calcular nada:
alcanzó con leerla igual que `.tooth-info`.

**Bug encontrado al cablearlo**: `.perio-summary-card` sólo existe en el
DOM mientras se ve la vista Periodontal Status -la librería la saca por
completo al volver a Odontogram, igual que hace con `.chart-actions` a
la inversa-. Pero **`.tooth-info` es al revés: sólo existe en
Odontogram, no en Periodontal Status** -esto no se había notado antes
porque nunca se probó el ícono estando parado en esa vista-. Como
`ToothInfoTrigger`/`OdontogramEmbed` exigían `infoNodo` (`.tooth-info`)
para dibujar el botón, **el ícono entero desaparecía en Periodontal
Status**, justo la vista donde el nuevo resumen es más útil.

Arreglo: `nodo` (`.tooth-info`) pasa a ser `HTMLElement | null` en
`ToothInfoTrigger`, `ToothInfoPanel` y `useResumenDental`; el botón se
dibuja si hay `infoNodo` **o** `perioNodo` (antes exigía sólo el
primero). `OdontogramEmbed` relee `.perio-summary-card` en el mismo
`releer()` que ya usaba para `.tooth-info`/`.perio-launch-bar`, guardado
en `perioNodo`.

`hayHallazgo` -el punto rojo- ahora también prende con `Charted sites`
> 0 en el resumen periodontal, no sólo con hallazgos del odontograma.
Un matiz conocido, no arreglado: como `.perio-summary-card` no existe
fuera de Periodontal Status, el punto por sondaje sólo se ve estando en
esa vista -si ya se cargaron sitios y se vuelve a Odontogram, el punto
se apaga hasta que algo en `.tooth-info` amerite prenderlo por su
cuenta-. Aceptable: no hay de dónde leer ese dato en Odontogram, la
librería no lo deja en el DOM.

Verificado cargando un "Buccal PD" real (5mm) en un sitio: el bloque
"Periodontal summary" del panel pasa de puros "–"/"0%" a "Avg PD 5",
"Charted sites 1", "Max PD 5" al instante, y el punto rojo del ícono
prende -estando en Periodontal Status-. Cero errores de consola.

### El panel pasa de inline a flotante fijo a la derecha (2026-09-16)

Con el resumen periodontal en vivo (arriba) surgió el caso de uso real:
Julián quiere ir cargando sitios en la grilla -que es larga, se scrollea
mucho- mientras compara contra el "Periodontal summary". Con el panel
inline de más arriba (debajo del "Dental chart") tenía que scrollear
hasta el final cada vez para verlo, lejos de la grilla que estaba
cargando.

Pasa a `position: fixed` -`top-20 right-4`, `max-h-[calc(100vh-6rem)]`
con su propio scroll-, así que queda anclado a la ventana y no a la
página: sigue a la vista mientras se scrollea la grilla, sin tapar nada
(no tiene fondo oscuro, la grilla sigue clickeable atrás) y sin
reservar espacio en el layout -al cerrarlo, todo vuelve exactamente a
como estaba-. Sigue sin ser modal, que es lo que Julián había pedido
explícitamente evitar en primer lugar: no atenúa el resto de la
pantalla ni bloquea interactuar con el gráfico.

Verificado: se scrolleó la grilla de Periodontal Status con el panel
abierto y quedó fijo en el mismo lugar de la pantalla; se cargó un sitio
con el panel abierto y el valor se actualizó ahí mismo sin cerrarlo; al
cerrar, la página quedó igual que antes de abrirlo. Cero errores de
consola.

### El flotante fijo tampoco sirvió: pasa a inline arriba de los tabs (2026-09-16)

El `position: fixed` de más arriba resultó ser justo lo que Julián NO
quería: "fijo del lado derecho **no flotante**, que no tape el
gráfico". Un fixed sigue siendo un overlay -sombra, se superpone a lo
que tenga debajo-, así que angostar el chart con una columna no alcanza
del todo: el panel corta contenido igual en pantallas más chicas. Y de
paso se encontró que `sticky` (probado como alternativa a `fixed` para
la misma columna) tampoco servía: se "despegaba" mucho antes de lo
esperado y quedaba clavado arriba de la ventana en vez de acompañar el
scroll -no se investigó la causa raíz porque el pedido cambió antes de
terminar de depurarlo-.

Julián lo resolvió con un pedido más simple y más preciso: que aparezca
**arriba de los tabs Maxillary/Mandibular**. Eso saca de encima toda la
necesidad de `fixed`/`sticky`: es contenido inline más, en su lugar
natural, entre la barra "Periodontal Status" (con "None/PD/CAL/
Recession/...") y los tabs de arcada -nunca se superpone a nada porque
no es un overlay, es parte del documento-.

El truco es DÓNDE insertarlo: `.perio-tabs-cabecera` -los botones
Maxillary/Mandibular- no es de la librería, es de `PeriodontalTabs.tsx`
(este mismo proyecto), que la arma con `createPortal` dentro de
`.perio-fullgrid-scroll` cada vez que se entra a Periodontal Status. Se
la lee igual que `.perio-summary-card`/`.tooth-info` (`releer()` en
`OdontogramEmbed`, guardada en `tabsPerioNodo`) y se le agregó un
componente nuevo, `PanelArribaDeTabs`, que mueve el panel real con
`insertBefore(panel, cabecera)` -mismo patrón de `useLayoutEffect` +
mover-el-nodo-y-devolverlo-al-desmontar que ya usa `ToothInfoTrigger`
para `.perio-launch-bar`, con el mismo motivo: no se puede `createPortal`
a ciegas porque la librería/`PeriodontalTabs` puede sacar
`.perio-tabs-cabecera` del DOM en cualquier cambio de vista.

En Odontogram no hay tabs Maxillary/Mandibular -`tabsPerioNodo` da
`null`-, así que ahí el panel vuelve a ser inline simple, debajo del
"Dental chart", como en la primera versión (antes del flotante).

Verificado: abrir el panel en Periodontal Status lo muestra pegado
arriba de "Maxillary | Mandibular", angostando en cero el gráfico de
abajo (nada se superpone, todo se ve completo). Cambiar de tab
(Odontogram ↔ Periodontal Status) varias veces seguidas con el panel
abierto y cerrado en distintos momentos: cero errores de consola, el
panel reaparece en el lugar correcto cada vez.


## Treatment Plan: caso más liviano (2026-09-30)

A pedido de Julian, dentro de un caso (Periodontists Recommended y los demas):

1. **Sin New Case Group ni New Alternative Case en el caso.** Siguen en
   Unassigned, que es donde se arman los casos.
2. **El consentimiento es una sola fila**: icono del documento en el color del
   estado, titulo, pill, y las dos firmas -Patient y Provider- en la misma linea,
   con History y el kebab al final. Medido: 50px de alto contra ~145 antes. La
   linea "1 of 2 signatures pending" pasa a texto para lector de pantalla: las
   firmas ya lo dicen.
3. **Con la card angosta se esconden los nombres de los firmantes** (container
   query a 1024px): quedan rol y estado. Medido: la fila pide 1068px con
   nombres; a 1440 la card mide 1088 y entra, a 1280 mide 928 y se partia.
4. **La card del consentimiento ya no recorta**: sin `overflow-hidden`, el menu
   del kebab se sale del bloque en vez de quedar cortado.
5. **Columna Consent en las tablas del caso**, antes de Actions: icono y palabra
   en el color del estado -Signed verde, Pending ambar, Not sent gris, Expired
   rojo-. Palabra y no solo icono, para que se lea sin pasar el mouse. No va en
   Unassigned: un procedimiento suelto no tiene consentimiento.


### Segunda vuelta: el caso se puede plegar (2026-09-30)

- **El caso se pliega** con un chevron al final del encabezado -el mismo gesto que
  Pending Decision en el rail-. Plegado queda una franja de 77px con el nombre,
  el estado y el total; las visitas siguen a la vista. Abierto mide 243px, contra
  348 antes de estos ajustes.
- **Una sola linea de campos: Treatment Case Category (240px) - Additional
  Discussion Notes - Total Amount**, en ese orden. El total va al final y con la
  misma altura que el select (36px); las notas pasan de 3 a 2 filas para que la
  linea no sea mas alta de lo necesario.
- **La categoria usa el `SelectField` de la app**, el mismo de los modales. Era un
  `<select>` nativo con la flecha pegada al borde.
- **Plegado, el total conserva su caja** (fondo `dash-count-bg`, "Total Amount:
  231.12") en el encabezado, junto al estado: es la misma caja abierta y plegada.
- **Preview sube al encabezado** como icono, junto al lapiz, con tooltip. Antes
  era un link de texto debajo del select.


## DentAssmt: Add Procedure / Add Condition en un drawer (2026-10-03)

A pedido de Julian, siguiendo la organizacion del Figma UX-UI 2.0 (1669:87207
el drawer, 1669:87208 los tres pasos) con el design system de la app:

1. **Drawer a la derecha** (`components/ui/drawer.tsx`) en vez de modal: el
   chart queda a la vista mientras se carga. Es la excepcion pedida a la regla
   de no usar drawers en red-clone.
2. **"Add Document" pasa a "Add Condition".** Los dos botones abren el mismo
   drawer: Add Procedure arranca en *Planned* y se titula New Procedure; Add
   Condition arranca en *Existing* (algo que el paciente ya tiene hecho) y se
   titula New Condition.
3. **Los pasos tienen nombre**: el indicador dice Procedure, Surfaces y Link to
   finding en vez de "Step" (`StepIndicator` con `labels`). Al completar un
   paso la insignia y la regla hacia el siguiente quedan en **verde** (antes la
   regla quedaba azul). La animacion: el tilde entra con un rebote corto y un
   anillo que se abre (`paso-check`, `paso-anillo`), y despues la regla se
   llena hacia el paso siguiente. Con *reduce motion* no se anima (Julian,
   2026-10-05).
4. **Procedure**: la busqueda tiene pestañas *Existing* / *Planned* con su
   cantidad. Existing muestra solo lo que queda en la boca (restauraciones y
   endodoncias); el estado se guarda con el procedimiento (Existing queda como
   Externally Treated, Planned como Active).
5. **Surfaces** es opcional: no todo procedimiento va en una superficie.
6. **Link to finding** lista los hallazgos del examen (no los descartados):
   cada card dice el nombre del hallazgo y, si tiene, sus superficies
   ("Localized periodontal pocketing - B, MB") y debajo la zona. El estado va
   en el color del estado, igual que en la card de Findings: *In Treatment* en
   azul, *Monitoring* en ambar. Antes era verde o rojo y nada mas (Julian,
   2026-10-05).
7. **Botones arriba a la izquierda del chart**, en la fila de Odontogram /
   Periodontal Status, que ahi esta libre: Add Procedure, Add Condition y View
   Problem List. Abajo quedaban fuera de la pantalla (Julian: "ahi abajo no se
   ven"). Medido: centrados con esa fila a 1440, 1280 y 1024. Con menos de
   1280 queda solo el icono, con su tooltip; en el celular van en su fila.
8. **View Problem List abre la tabla del overview flotando** (`ProblemList` en
   un Popover) sobre el chart, sin cambiar de vista. Se cierra con Escape o
   tocando afuera.

### La busqueda de procedure, como en la app real (red.dev, 2026-10-03)

Mirado en red.dev sin guardar nada (New Procedure y New Condition, abiertos y
cancelados). Lo que se trajo al paso Procedure del drawer:

- Placeholder **"Search by code or description"**.
- **Las 14 categorias del catalogo** (Adjunctive service, Cosmetic & aesthetic
  services, Diagnostic services, Endodontic services, Implant services,
  Maxillofacial prosthetics, Oral and maxillofacial surgery, Orthodontic
  services, Periodontal services, Preventive services, Prosthodontics fixed y
  removable, Restorative services). En la app real son una columna a la
  izquierda de un modal ancho; en un drawer de 440px van en un select
  "Category". La app real escribe "Adjuntive service"; aca va bien escrito.
- **El embudo filtra por area de tratamiento** con switches: Show all
  treatment, Arch, Mouth, Quadrant, Surface, Tooth. Con filtros activos el
  embudo se pone azul y muestra cuantos hay.
- **Cada procedimiento muestra su area** en un chip debajo de la descripcion,
  como los resultados de la busqueda real.
- **Codigos y descripciones reales** (D0120 Periodic oral evaluation -
  established patient, D2740 Crown - porcelain/ceramic, D4341 scaling and root
  planing...). D3310 decia "Treatment of Root Canal Obstruction", que es otro
  codigo: ahora dice Endodontic therapy, anterior tooth.

Lo que la app real hace distinto y no se trajo: New Procedure es un modal
centrado (se pidio drawer) y al pasar de paso avisa con un "Validation warning"
si el area elegida no coincide con la que pide el procedimiento. New Condition
es un flujo aparte, una busqueda de condiciones filtrada por el area elegida;
aca Add Condition abre el mismo drawer en Existing, como se pidio.


### DentAssmt: botonera de la app real y sin tabla de controles (2026-10-03)

A pedido de Julian:

1. **Sin la tabla de controles.** Add Procedure ya no abre el panel "Controls"
   (1 of 8) debajo del chart; la seleccion de piezas pasa a la botonera.
2. **La botonera de la app real arriba del chart** (`dental/BotoneraDientes.tsx`):
   Permanent / Primary, Upper arch, Lower arch, Q1-Q4, All, Clear y las flechas
   para ir a la pieza anterior o siguiente. Maneja la seleccion de la libreria:
   sus botones por id (`#btnSelectAll`, `#btnSelectUpper`, `#btnSelectLower`) y,
   para los cuadrantes y las flechas, clic con CMD/CTRL sobre cada pieza
   (`.tooth-tile[data-tooth]`, que viene en FDI; la pantalla numera en
   Universal). Verificado: Q1 elige 1-8, Q2 9-16, Q3 17-24, Q4 25-32; las
   arcadas 1-16 y 17-32; All las 32; las flechas avanzan de a una.
   - **Primary** usa `applyPrimaryDentition()` de la libreria (piezas A-J).
     La libreria no tiene "volver a permanente": **Permanent** vuelve con
     `resetMouth()`, que tambien borra lo marcado, asi que pide confirmacion.
   - Con poco ancho la botonera baja a dos lineas, como en la app real.
3. **Las acciones del examen como Exit clinical Mode**: solo el icono y, al
   pasar el mouse o con el foco, se abren con su texto (mismas clases,
   `BOTON_EXPANDIBLE` y `ETIQUETA_EXPANDIBLE` en `lib/estilos.ts`, que ahora
   comparten con la barra de Clinical Mode). Van a la izquierda de la barra de
   Odontogram / Periodontal Status, metidas en la barra de la libreria con el
   mismo truco que el boton de Tooth information (`EnBarra` en
   OdontogramEmbed): siguen ahi al cambiar de pestaña.

4. **Cambiadas de lugar** (Julian): las tres acciones del examen van arriba, en
   la fila propia del lienzo, y la botonera de seleccion va a la izquierda de
   la barra de Odontogram / Periodontal Status (`accionesBarra` de
   OdontogramEmbed). Ahi va en version compacta -Upper / Lower, cuadrantes sin
   icono, Clear solo con el icono- para compartir la fila con las pestañas:
   medido, a 1440 entra todo en una fila; con menos ancho la barra baja a dos
   lineas (`flex-wrap` en `.perio-launch-bar`) y las pestañas quedan a la
   derecha.

5. **La botonera como controles segmentados** (Julian pidio algo mas lindo de
   usar): cada grupo es una sola pieza con los botones unidos -[Permanent |
   Primary], [All | Upper | Lower], [Q1 | Q2 | Q3 | Q4], [← | →] y Clear-, asi
   se lee de un vistazo que va con que y ocupa menos. All paso al grupo de las
   arcadas: boca entera, arriba, abajo.
   - **Lo elegido queda en azul** (arcada, cuadrante o todas) hasta que la
     seleccion cambia: Clear, las flechas o un clic sobre una pieza del chart.
   - **Siempre en una fila**: debajo de 1400px Permanent / Primary quedan solo
     con el icono (con su tooltip) y Upper / Lower sin icono. Medido a 1440 y
     1280: la barra mide 40px, una sola linea con las pestañas. Se usa
     `max-[1400px]:hidden` y no `hidden …:inline` porque la libreria del
     odontograma pisa la clase `.hidden`.

6. **Editar un finding tambien va en el drawer** (`dental/EditFindingDrawer.tsx`,
   antes `EditProcedureModal`): el finding entero arriba (estado, fecha, zona,
   condicion y descriptores, con la misma card del panel), debajo lo que se
   edita -Provider, Surfaces si es una pieza, Notes- y los procedimientos
   vinculados. Save y Cancel fijos al pie, como New Procedure.


## Todos los examenes con Findings y las acciones (2026-10-03)

A pedido de Julian:

1. **Las acciones vuelven a ser blancas** (borde y sombra, como antes) y
   mantienen la animacion de Exit clinical Mode: al pasar el mouse se abren
   con su texto.
2. **Se repiten en todos los examenes** (Ros, BMI, Vitals, Physical, ATM/O-F,
   Intra Oral, Extra Oral, DentAssmt, Periodontal, Radiography) con
   `ExamLayout`: arriba del contenido Add Procedure, Add Condition y View
   Problem List, y a la izquierda el panel de **Findings** con Review exam.
   - **Vitals** lleva las acciones y no Findings, como se pidio.
   - **Radiography** lleva las acciones; sus findings ya viven en el visor de
     cada placa, asi que no se duplica el panel.
   - Los registros (Treatment Plan, Lab Order...) no cambian.
3. **Los findings son del paciente**: `ExamFindingsProvider` (en ClinicalMode)
   los guarda mientras se cambia de examen. Verificado: una nota editada en
   Physical aparece en Ros.
4. DentAssmt queda solo con su chart; el panel, las acciones y los drawers
   (New Procedure, Edit Finding, confirmaciones, Review exam) son los de
   `ExamLayout`.
5. **Radiography**: sin los botones flotantes de abajo (Add image y Table
   view). El buscador va en la misma fila que las acciones del examen, a la
   derecha (`extra` de `ExamLayout`), y al lado **Add image**, que es el unico
   camino a la carga de placas. La grilla usa todo el ancho (sin el margen que
   les dejaba a los flotantes). El visor y la carga tambien llevan las
   acciones arriba.
6. **Vitals**: sin los tres botones del costado (Add vital, New document,
   Table view); quedan las acciones comunes arriba y el contenido usa todo el
   ancho.
7. **Tooltips en las acciones** (2026-10-05). No repiten el nombre, que ya se
   lee al abrirse el boton: dicen que hace cada una ("Chart a planned
   procedure", "Chart a condition or work the patient already has", "Open the
   patient's problem list"). Abajo del boton, con 400 ms de espera para no
   saltar mientras se abre la etiqueta.

## DentAssmt estaba lento (2026-10-05)

Julian: "esta como medio lento los botones de add procedure". Medido con la
build de produccion, no a ojo:

1. **Un bucle que no paraba.** `CarasLinguales` mira los cambios de `class`
   en el chart para copiar la seleccion a las caras linguales, pero veia
   tambien los que hacia ella misma (`classList.add` de una clase que ya esta
   igual cuenta como mutacion). Cada copia disparaba otra: en reposo, ~2000
   mutaciones cada 2 s, las 12 piezas recopiadas en cada frame, y los demas
   observers del chart (`OdontogramEmbed`, `PeriodontalTabs`,
   `PerioPdArrastre`) corriendo detras. La pantalla iba a **28 fps**. Ahora
   descarta sus propias mutaciones (`takeRecords`) e ignora las de las celdas
   copiadas: **0 mutaciones en reposo, 61 fps**. La seleccion se sigue
   copiando (Q1 marca sus caras; Clear las limpia).
2. **Abrir el drawer recalculaba toda la pagina.** Radix bloquea el scroll y
   define `--removed-body-scroll-bar-size` en `:root`; una variable heredable
   ahi obliga a recalcular los estilos de cada elemento, y el odontograma
   tiene ~27.000. Registrada sin herencia (`@property` en `index.css`; nada
   nuestro la usa): la tarea al abrir pasa de **~90 ms a ~43 ms**. En los
   examenes sin chart ya abria en ~20 ms.
3. **La etiqueta de los botones** se abre y se cierra en 150 ms (antes 200)
   y su tope pasa de 160 a 128 px: con tanto aire sobre la etiqueta mas larga
   (111 px), al cerrarse tardaba en arrancar. Vale tambien para Exit clinical
   Mode y Overwiev, que comparten la constante.

## Treatment Plan por fecha, menu Exams y Surfaces condicional (2026-10-05)

Pedido de Julian con captura de la app real (red.dev, Clinical Mode >
Treatment Plan).

1. **Los planes se agrupan por fecha**, no por Pending Decision / Acepted /
   Discarted (revisado en red.dev). A la izquierda, **Unassigned Items** y
   debajo una fila por fecha de creacion (DD/MM/YYYY, la mas nueva arriba)
   con el estado del grupo en una pastilla (PLANNING, PENDING, PRESENTED,
   WAITING FOR CONSENT, ACCEPTED, DISCARDED) y un chevron. La fecha se
   despliega con sus casos (las alternativas), unidos por la linea del arbol:
   marcador naranja, nombre, "Update: fecha" y un punto con el color del
   estado del caso; el elegido queda en azul. Cada fecha se abre y se cierra
   sola, tambien la del caso abierto (antes quedaba forzada abierta y, al
   elegir un caso de otra fecha, la anterior se cerraba sola). El estado del grupo es el de
   sus casos vivos, o Discarded si se descartaron todos. Se suma **Waiting
   for consent** (como en la app real): Accept Case lo deja ahi, esperando
   las firmas.
2. **Que se ve segun el estado**: lo que no corresponde **se oculta**, ya no
   queda deshabilitado con tooltip.
   - *Planning*: lapiz (renombrar), ojo, **New Alternative Case** (boton azul
     chico, `Button size="sm"`), Move to,
     categoria como combo, y las visitas se editan: cada procedimiento se
     arrastra a otra visita o a **"Drag procedure here to create new visit"**,
     que arma una visita nueva (las vacias se van y se renumeran). New
     Alternative Case crea una copia en Planning con la misma fecha y la abre.
   - *Pending*: solo el ojo, para ver el plan antes de presentarlo (Finish
     Planning ya dice que deja de ser editable).
   - *Presented y siguientes*: sin Move to, ojo ni lapiz; la categoria queda
     como texto y las filas sin menu de quitar.
3. **La barra, como en red.dev**: en los examenes, el boton **Exams ›**
   queda marcado (fondo azul claro) y despliega los registros: Treatment
   Plan, Treatment, Patient Summary, Lab Order, Prescription y Referral. Al
   elegir uno, las pestanas pasan a ser los registros y **Exams** queda como
   boton comun que vuelve al ultimo examen abierto.
4. **Surfaces solo cuando hace falta**: el paso aparece cuando el
   procedimiento es de diente + superficie (D2140, D2330) y se eligio
   cargarlo en superficie. El boton Surface de la fila solo esta en esos
   procedimientos. Sin superficie el drawer tiene dos pasos, Procedure y Link
   to finding. Con el paso, Next Step pide al menos una superficie.

## Iconos y estados del design system 2.0 (2026-10-05)

Figma *Design system · 2.0* (QZThiRTqdCgD1H6fv3k5zf):

1. **Iconos de procedimiento** (535:2307, 535:2822): diente, boca y arcada
   en blanco sobre un cuadrado de 23 px con el color del estado
   (`src/assets/procedure-icons/`, `ScopeIcon`, `CajaIcono`). Figma repite
   la boca en dos lugares: aca va en Quadrant. No hay icono de superficie:
   Surface sigue con la grilla.
2. **Filas con estados** (`ProcedureRow`, `ConditionRow`): default,
   selected (borde azul), inactive (gris azulado, `input-inactive`), error
   (borde y codigo rojos, fondo `dash-bad-bg`) y disabled (apagada, no se
   elige). El drawer de New Procedure usa default y selected; la lista de
   diagnosticos (oculta por ahora) usa `ConditionRow`.
3. **Badges CC / TR del header** (254:2930, `ClinicalBadge`): CC es Chief
   Complaint y TR **Triage** (asi en Figma y en el panel). Tilde (`ok`) o
   cruz (`no`), en active (lleno), inactive (suave) y disabled (gris, sin
   dato). El header los lee de `ESTADO_CLINICO`; hoy los dos en active con
   tilde. Tamano `md` en el header (el de Figma, 22 px, hace ilegible el
   tilde).
4. Tokens nuevos en `index.css`: `input-inactive`, `input-inactive-bg`,
   `status-ok`, `status-ok-muted`, `status-ok-strong`, `status-bad-muted`,
   `status-bad-strong`.

## Treatment Plan: menu, turnos, seleccion y acceso limitado (2026-10-05)

Revisado en red.dev (casos en Planning, Waiting for consent, Accepted y
Discarded):

1. **Encabezado del caso**, en el orden de la app real: New Alternative Case
   (azul chico), lapiz, ojo, Move to; despues el menu y el pliegue.
2. **El menu (los tres puntos) tiene dos secciones**, "Actions Case" y
   "Actions Treatment", como en red.dev; lo que borra o cierra va en rojo y,
   sin acciones de caso, dice *No case actions available*:
   - Planning: Delete | Finish Planning, Expire, Cancel (red.dev dice
     Present: aca primero se termina de planear).
   - Pending: — | Present, Expire, Cancel.
   - Presented: — | Accept, Discard, Expire, Cancel (no existe en red.dev).
   - Waiting for consent: — | Expire, Cancel.
   - Accepted: — | Generate Consent, Expire, Cancel.
   - Discarded: — | Generate Consent.
   Expire y Cancel confirman y dejan el caso en Discarded.
3. **Turno de la visita**: afuera de la tabla de cada visita, arriba a la
   derecha (la visita conserva su barra azul; Julian: "era solo poner el
   boton por fuera de esa tabla"). Sin turno dice
   **No appointment** y, al tocarlo, avisa "No active appointment. There is no
   active appointment in the current encounter." (el toast de red.dev). Con
   turno muestra fecha y hora y abre el detalle (fecha, hora, provider).
4. **Las filas de las visitas se marcan** en todos los estados, con la
   casilla de cada fila y la de toda la visita (marca solo las suyas). La
   barra dice cuantas y que hacer: Move to y Remove en Planning, Complete en
   Accepted y Waiting for consent.
5. **Acceso limitado**: un caso de otra ubicacion (`sinPermiso`) lleva el
   aviso "Limited access to this treatment case" con el estilo de avisos del
   design system (`ui/alert`, tono warning) y no se edita. `Alert` es el
   bloque Alert del constructor hecho componente; el constructor lee sus
   tonos de ahi.

## Tooltips, pasos del drawer y puntos del arbol (2026-10-05)

1. **Cada icono tiene tooltip** que dice que es: los alcances del buscador
   (Tooth, Surface, Quadrant, Arch), el diente de la condicion, el alcance
   elegido en Surfaces y las acciones de cada procedimiento en las visitas
   (More actions, Complete procedure, Imaging, Link to finding). red.dev se
   colgo al abrir los examenes, asi que los nombres son los de los alcances
   del buscador.
2. **Los pasos del drawer dependen de lo elegido**: Surfaces solo si el
   procedimiento lleva superficie (area Surface; al elegirlo queda en
   superficie), y Link to finding solo con Planned: lo ya hecho (Existing)
   no resuelve un hallazgo. Existing sin superficie es un solo paso: no se
   muestran pasos y el boton es Save.
3. **El punto de estado de cada caso** va al inicio, sobre la linea del
   arbol, con su tooltip.
4. **El menu de Informed Consent** usa el mismo diseno que el del caso
   (`DropdownMenu` con secciones con titulo e icono en cada item):
   *Signatures* (Sign as patient / provider, o "All signatures collected") y
   *Document* (Open document, Send to patient again, Replace document,
   Download PDF).

## Treatment: workflows, y CC / TR segun el workflow (2026-10-05)

Figma 9fYLxX9h 4540:26288 "Treatment — Section (Workflow Detail & Clinical
Note Confirmation)" para el diseno; red.dev (paciente Aaa Test Aaa, pestana
Treatment) para la logica.

1. **Regla de CC y TR** (la confirmo Julian): cada badge dice si el paciente
   completo su workflow en Treatment. CC = Chief Complaint, TR = Triage.
   Completo: verde con tilde (`ok` / `active`). Sin completar: rojo suave con
   cruz (`no` / `inactive`), como en red.dev, donde se ven en blanco con texto
   rojo y el icono de clipboard tachado. En red.dev, mientras carga, los dos
   van en gris con spinner; aca no hay carga.
2. **Al abrir CC o TR**: si esta completo, las respuestas por paso y la hora
   en que se completo; si no, "The patient has not answered the chief
   complaint / triage questions yet." (texto de red.dev, que lo muestra en un
   panel lateral; aca va en el desplegable de la barra) con el atajo **Answer
   in Treatment**, que abre Treatment con ese workflow.
3. **Treatment** (`TreatmentPanel`): a la izquierda el workflow elegido
   (codigo en azul y "Published vN", como red.dev), buscador de secciones y
   los pasos plegables con ojo para ocultar y "Show hidden". Se abre un paso
   a la vez. Las preguntas son chips (una o varias opciones, Yes / No) o
   texto. Una opcion puede colgar preguntas hijas, con el conector del arbol
   del Figma. Pie: **Generate Narrative** (abre el editor de narrativa, ver
   abajo) y **Save Step**, que guarda el paso abierto y se habilita cuando lo
   obligatorio esta contestado. A la derecha: Workflows (tarjetas con
   categoria y fecha; la elegida en azul; filtro por categoria y por codigo),
   Progress del workflow elegido (pasos guardados en verde con tilde) y
   Treatment plans.
4. **Workflows del mock**: Chief Complaint (Reason for Visit, Current Dental
   Problems (HPI)), Triage, Social History, Family History, Dental and Oral
   Health History y Prophylaxis (los seis pasos del Figma). Las preguntas de
   Triage y de Reason for Visit son las de red.dev; las demas son mock. Arranca
   con Chief Complaint completo y Triage sin contestar, para que se vean los
   dos estados. El progreso vive en `WorkflowsProvider` (pantalla de Clinical
   Mode) y lo leen Treatment y el header.
5. **Clinical Note** (4540:27072): al elegir *End encounter* en el menu del
   encuentro, el aviso "The clinical encounter has been completed" con
   *Remind me later* y *Review and sign*.

## Tabla del Overview: Problem List y Procedures (2026-10-05)

Como en red.dev:

1. **Dos pestanas** (`Tabs`): *Problem List* y *Procedures*. A la derecha,
   el filtro de estado (desplegable de una opcion) y el buscador.
2. **Problem List**: Date, Location, Tooth, Surface, Condition, Exam,
   Provider, Note, Status. Filtro por defecto **Active**; opciones: Active,
   Clinic declined, Discarded, Externally treated, In treatment, Monitoring,
   No treatment needed, Patient declined, Referred, Treated (sin "All", igual
   que red.dev).
3. **Procedures**: Date, Location, Tooth, Surface, Procedure (codigo y
   descripcion), Provider, Note, Status. Filtro por defecto **All**; opciones:
   Completed, Discarded, Discontinued, In progress, Planned, Referred.
4. **Celdas**: la pieza en una cajita gris (vacia si no es de un diente); la
   nota es el icono violeta con el texto en tooltip, o un guion; el estado en
   mayusculas.
5. **Menu de cada fila** ("Actions"): un problema activo tiene Edit, Start
   Monitoring, Start Treatment, Mark As Treated, Mark As Externally Treated,
   y en rojo Mark As No Treat. Needed, Mark As Patient Declined, Mark As
   Clinic Declined, Discard; despues Delete. Un procedimiento In progress:
   Edit, Discontinue, Rollback, Delete; uno Discarded: Edit, Rollback,
   Delete. Esos tres menus se vieron en red.dev; los de los demas estados son
   inferidos (lo abierto ofrece lo que falta, lo cerrado Rollback). Cada
   cambio avisa con Undo.
6. Usa la tabla estandar (`DataTable`): 5 filas por pagina con selector
   (Show: 5 / 10 / 20) y "Showing X to Y of N results". El menu de fila
   (`RowActionsMenu`) ahora crece hasta 280 px para que "Mark As Externally
   Treated" no se parta; las demas tablas siguen en 190.

## Narrativa, filtros y cards de Treatment Plan (2026-10-05)

1. **Narrativa con el flujo de red.dev** (`NarrativeEditor`): Generate
   Narrative abre el **AI Narrative Editor** (icono violeta, "CODIGO -
   PUBLISHED Vn"). Al abrirse genera el borrador con lo contestado en los
   pasos **guardados** (skeleton mientras genera) y lo deja guardado como
   *Original Clinical Draft*. Sin pasos guardados, el editor queda vacio y
   avisa "no answered questions to summarize" (en red.dev: "Failed to
   regenerate narrative · No answered questions to summarize"). Barra de
   formato: Bold, Title, Subtitle, Text, List. Editar pasa a *Unsaved
   changes* y habilita **Apply Changes** (deshabilitado con el borrador
   original, como red.dev). Cerrar con cambios sin aplicar pide confirmacion;
   **Regenerate** tambien, si pisa una version editada. La narrativa guardada
   se ve resumida arriba de los pasos (Open vuelve al editor) y el boton pasa a
   *Edit Narrative*. El borrador se arma con plantilla, sin IA real.
2. **Filtro de Workflows**: encabezado con *Clear all*, tipos con icono y
   cuantos workflows hay de cada uno (el que no tiene ninguno queda
   deshabilitado), busqueda por codigo o descripcion (Enter aplica), y al pie
   cuantos quedarian antes de aplicar. Lo aplicado se ve en chips debajo del
   titulo, cada uno con su X, y *Clear*; sin resultados, *Clear filters*.
3. **Filtro de estado de la tabla**: el punto del color de cada estado (el
   mismo de su pill) y cuantas filas tiene cada uno, en el boton y en el menu.
4. **Cards de Treatment Plan del Overview**, con la estructura de red.dev:
   iniciales y profesional, nombre del caso con su estado (los colores del
   rail de Treatment Plan), grupo y cantidad de procedimientos, Total amount y
   Created on en cajas grises con icono, y Treatment progress con el
   porcentaje, "x of y completed" y la barra. Salen de los casos del paciente
   (los descartados no), no de cuatro copias de "periodontists Alternative".
   Toda la card abre ese caso en Treatment Plan; *All treatment* abre la
   lista. El icono de documento sigue afuera, como pidio Julian. Endodontic
   Treatment trae la primera visita completa, para que se vea avance.

## Card Treatment plans: dos propuestas más, y los pasos de New Procedure (2026-10-06)

- Julián pidió algo distinto para la card *Treatment plans* del workflow sin perder el detalle de la A. Quedan tres
  opciones en `TreatmentPlansCard` (`variante`): **A · tarjetas** (la publicada, la que se ve en la app), **B ·
  progreso** (cada plan en su caja con estado, barra de avance y monto; la pieza encabeza cada procedimiento) y **C ·
  recorrido** (un plan a la vez con flechas, avance en tramos y los procedimientos en línea de tiempo por visita). Las
  tres muestran estado, código, nombre, pieza, superficie, proveedor y el menú. Pendiente: que Julián elija. Design
  system: *Components / Clinical / Treatment plans card*.
- **New Procedure** conserva los nombres de sus pasos (Procedure, Surfaces, Link to finding) con `stepLabels`; los
  demás drawers dicen "Step". El rótulo ya no ocupa ancho, así la línea entre círculos es igual en todos.
- **New Alternative Case** pasa al tamaño normal del botón (36px), como New Case Group y los íconos de al lado.

## Cards con sombra, sin borde (2026-10-06)

Julián pidió que en toda la app las cards generales lleven la sombra de los paneles del Dashboard en vez de stroke.
En Clinical Mode: el Overview (Treatment Plan, odontograma, Problem List), Treatment (el workflow, Workflows, Progress y Treatment plans), Treatment Plan (la lista de planes y el caso), la columna de los exámenes, Vitals, Radiography y el bloque de consentimiento. Las cards de adentro siguen con borde fino y sombra suave (`InnerCard`). Ver *Elements / Cards*.

## Card Treatment plans: queda la A (2026-10-06)

Julián eligió la **A** (las tarjetas, la que ya estaba publicada). B y C se sacaron del código junto con la prop
`variante`; la página *Components / Clinical / Treatment plans card* documenta sólo la A, con la decisión.

## Treatment Plan antes de aceptar, Link to diagnosis y los nombres de los pasos (2026-10-06)

- **Sin consentimiento ni turno antes de aceptar:** en Planning, Pending y Presented no se muestran el bloque de
  consentimiento, la columna Consent de los procedimientos ni el turno de cada visita (`SIN_CONSENTIMIENTO_NI_TURNO` en
  TreatmentPlanSection). Julián nombró Planning y Presented; Pending queda entre los dos, así que va igual.
- **New Procedure, Link to diagnosis:** para Planned, después de Link to finding, un paso más con los diagnósticos de
  los hallazgos del examen **por código ICD-10 y superficie** (`LinkedDiagnosisCard`), sin estado ni fecha; se guardan
  como "K05.31 · B, MB". Los códigos salen de `CODIGO_DIAGNOSTICO` (data.ts). Se fue la pestaña oculta "Diagnostics".
- **Surfaces** depende del procedimiento elegido (lleva superficie o no), tanto en Planned como en Existing.
- **Los pasos dicen su nombre** en todos los drawers (Procedure, Surfaces, Link to finding, Link to diagnosis…), no
  "Step": así se sabe qué se está haciendo.

## Detalle desplegable en Problem List y Procedures (2026-10-08)

Pedido de Julián con un prototipo HTML (*Compact clinical details*): que cada fila de la tabla del Overview muestre lo
que cuelga del registro, reusando el desplegable del Ledger.

1. **El desplegable es el del Ledger** (`rowDetail` de `DataTable`): chevron al inicio, clic en la fila, *Collapse all /
   Expand all* desde que hay una abierta, y el detalle con fondo gris claro debajo. Vale en el Overview y en el flotante
   de *View Problem List* de los exámenes.
2. **Bloques** (`RecordDetail.tsx`, cards adentro de un panel), en 3 columnas, 2 o 1 según el ancho **de la tabla**
   (container query, no media query: el flotante del examen es más angosto que la pantalla). Arriba, el nombre completo
   y la pieza / superficie: la celda de la fila corta los nombres largos.
   - *Procedimiento:* **Treatment** (estado del grupo, el caso con su estado, la visita del procedimiento con su turno,
     las otras visitas y los casos históricos plegados), **Lab order** + **Referral** en un mismo bloque, **Findings /
     diagnoses** (el hallazgo y su diagnóstico ICD-10 + superficie, como Link to diagnosis) y **Procedure consent** a lo
     ancho.
   - *Problema:* **Procedures** que lo resuelven, **Treatment** (sólo el caso, sin visitas), **Lab order** + **Referral**
     con el procedimiento relacionado y **Source exam** a lo ancho.
   - Lo que no entra en el resumen va detrás de "N more…"; un bloque vacío queda y dice qué no hay ("No lab orders
     linked."), así el detalle tiene siempre la misma forma.
3. **Se reusa lo que ya había**: el turno de la visita es `CitaVisita` de Treatment Plan ("No appointment" avisa igual),
   el consentimiento es `EstadoConsentimiento` de sus tablas, y las pills son las de cada pantalla (casos como el rail,
   órdenes como Lab Order, la tabla como la tabla). **Antes de aceptar el caso** (Planning, Pending, Presented) no hay
   turno ni consentimiento, la misma regla que Treatment Plan.
4. **Los links llevan a donde se trabaja**, en vez del diálogo de "preview" del prototipo: el caso y el consentimiento a
   Treatment Plan con ese caso abierto, la orden a Lab Order, la derivación a Referral, el examen de origen a su pestaña.
   Un hallazgo o un procedimiento cambia a la otra pestaña, ajusta el filtro para que se vea y abre esa fila
   (`defaultExpanded` de DataTable, que abre en la página de la fila). Desde el flotante de un examen, el flotante se
   cierra al navegar. La navegación la provee ClinicalMode (`NavegacionClinica`); sin provider, el link avisa adónde iría.
5. **View full record** abre un drawer de sólo lectura (Pop ups = drawer): los datos de la fila de a dos y una sección
   por bloque, sin nada plegado. Pie: Close y Edit, que avisa como Edit del menú de la fila.
6. **Datos** (`VINCULOS_PROCEDIMIENTO` y `DERIVACIONES_PROBLEMA` en `data/clinical-mode.ts`): cada procedimiento apunta
   a un caso de `CASOS` y al procedimiento del caso (de ahí salen visita, turno y consentimiento), a sus hallazgos, órdenes
   y derivaciones. Los problemas toman lo de sus procedimientos. Quedan registros sin nada para que se vea el vacío
   (D0220).
7. **Columnas**: el chevron suma 28px y la Problem List pasaba de 934 a 960 a 1440 (scroll lateral). Location 96 → 80,
   Exam 88 → 84 y Provider 96 → 88: las dos pestañas entran otra vez a 1440 sin scroll.
8. **En el teléfono** la tabla scrollea de costado; el detalle queda fijo en la parte visible (`sticky` + el ancho
   visible de la tabla, como el Ledger), ahora para toda tabla con detalle.

Del prototipo no se toma: el "Phase" de cada visita (el modelo no tiene fases) y el "Dental chart context".

### Anomalía

| # | Qué | Dónde |
|---|---|---|
| 97 | El contador de Referrals de la barra dice **0** aunque hay procedimientos y problemas en estado Referred (y ahora derivaciones vinculadas) | barra / detalle |

No se tocó la barra en esta tanda: queda para decidir si el contador sale de las derivaciones.

### Segunda vuelta: lista en vez de cards (2026-10-08)

Julián: las cards ocupaban lugar. El detalle pasa a ser **una lista**: una fila debajo de la otra, separadas por una
línea fina, sin card ni sombra, con el título (y la cuenta) en una columna de 150px a la izquierda y los datos a la
derecha; en angosto el título va arriba.

1. **Orden, el que pidió:** Treatment, Lab order, Findings, Procedure consent. Referral sale del bloque de Lab order y
   pasa a su propia fila, justo después. El problema sigue el mismo orden con su contraparte: Treatment, Lab order,
   Referral, **Procedures** (donde va Findings) y **Source exam** (donde va el consentimiento). El drawer de *View full
   record* usa el mismo orden.
2. **Cada dato en una línea**: link, estado y contexto seguidos. El estado del grupo se suma a la línea del caso
   ("Group status") en vez de ocupar una línea propia, y la visita va sin la caja gris.
3. Con más ancho por fila, el hallazgo **y** su diagnóstico se ven sin abrir nada (antes el diagnóstico iba plegado);
   se pliega desde el tercero. Las otras visitas y los casos históricos siguen detrás de "N more…".
4. `BloqueDetalle` y `SubtituloBloque` se van; quedan `FilaDetalle`, `FilasProcedimiento` y `FilasProblema`.

## Lab Order con la estética de la app (2026-10-08)

Pedido de Julián: unificar Lab Order con el resto de la app -tabla, buscador, botones y filtros-. Tenía una `<table>`
propia con borde, un link azul suelto para New Prescription, un `FilterTrigger` que no filtraba y un pie armado a mano.

1. **Card de la página** (`TARJETA_PANEL`, sombra y sin borde, 16px de aire) con la **tabla estándar** (`DataTable`)
   adentro, como la Problem List del Overview.
2. **Barra**: el buscador primero (provider, paciente o estado) y después **Filter**, que ahora filtra: los seis estados
   de a varios, con su cantidad y el punto del color de su pill (`ORDEN_TONO`, en el orden del pedido: Requested,
   Pending, Delayed, Delivered, Canceled, Rejected). Para eso el `filter` de `DataTable` acepta opciones con `count` y
   `tone` (`FilterOption`), no sólo texto.
3. **Botones** con `ui/button` (36px, el alto del buscador y de Filter): *New Prescription* es la acción principal
   (azul sólido, antes un link) y *View History* pasa del pie a la barra como secundario: el pie es el de la tabla.
4. **Filas**: las iniciales en el círculo celeste del equipo (32px, como `PersonCell tone="soft"`) sin link -la orden no
   lleva a la ficha-; los nombres en `ink` medium. La pill y el rojo de lo que vence pronto quedan.
5. **Acciones**: el ícono de documento y el kebab se juntan en el kebab estándar (`RowActionsMenu`): *View order*,
   *Edit order* y, mientras la orden sigue abierta (Requested, Pending, Delayed), *Cancel order* en rojo, que la pasa
   a Canceled con Undo. View y Edit avisan que no están en esta versión, como antes el ícono.
6. **Pie** de la tabla estándar: "Showing 1 to 9 of 9 active prescriptions" (anomalía 85, se mantiene), *Show* 5 / 10 / 20
   y la paginación. 10 por página: entran las 9 del frame.
7. **Vacíos**: la búsqueda sin resultados usa el de la tabla ("No results"); sin órdenes, "No lab orders yet".
8. El panel recibe `ordenes` opcional (por defecto las del frame), para mostrar el vacío y la paginación en Storybook.

Desviación del frame: View History deja el pie y el ícono de documento de cada fila pasa al menú. Storybook:
*Components / Clinical / LabOrderPanel* (Playground, Parts, States y Specs) y *Elements / Tables* (filtro con cantidad y
color).


## View Problem List con lugar para toda la tabla (2026-10-09)

Julián, con captura de Vitals a ~1480px: el flotante de *View Problem List* cortaba la tabla. Medido: el flotante medía
820px y la tabla pedía 146px más, así que Status quedaba cortado y Actions sólo se veía scrolleando de costado. Además,
con una fila abierta el flotante pasaba el borde de abajo de la pantalla (910 en 830) y lo de abajo no se podía ver.

1. **Ancho:** hasta 1240px (o la pantalla menos 32px). Desde 1024px la tabla entra entera, con Status y Actions, y a
   1280 y 1480 la columna Condition ya no parte los nombres. Si no entra a la derecha del botón, Radix lo corre a la
   izquierda dejando 16px (`collisionPadding`). A 768 y 390 la tabla sigue scrolleando de costado adentro de su caja.
2. **Alto:** hasta el borde de abajo de la pantalla (`--radix-popover-content-available-height`) y scroll adentro del
   flotante (`overscroll-contain`, para que la rueda no mueva la página de atrás).
3. La sombra pasa al contenido del popover y el radio a 8px, el de la card de la tabla: con el scroll adentro, una
   sombra en un hijo quedaría recortada.

Se pensó en pasarlo a drawer (la regla de Pop ups), pero es una consulta rápida sin salir del examen, que es para lo que
está el flotante. Si Julián quiere más lugar todavía, el siguiente paso es un drawer xl.

## Selected area con el Chip del design system (2026-10-09)

El área elegida de **New Procedure** y de **New Condition** (Radiography) pasa a `ui/chip`: celeste, texto azul 12px y la
✕ a la derecha (antes a la izquierda, 11px Semibold; la de Radiography además con esquinas cuadradas y un azul más
oscuro). Julián eligió la ✕ a la derecha: se lee primero qué es y después la acción, es la convención de Gmail, Jira o
Material y coincide con el cerrar de drawers y toasts. *"Uper left"* sigue tal cual (anomalía 88).

## New Procedure y New Condition: rótulos y controles de la app (2026-10-10)

Regla de Julián (2026-10-10, sobre una captura de Post payment con campos de anchos distintos): en los drawers los
campos van de a dos y del mismo ancho, y vale para todo. Está en *Components / UI / Drawer → Specs → Fields* y se
controla con `npm run ds:campos`.

1. **New Procedure**: Selected area, Procedure y Surfaces usan `FieldLabel` (12px Medium `ink`, la regla de la línea 809)
   en vez de un rótulo semibold gris hecho a mano; los buscadores usan `control()`, con la misma sombra que los demás
   campos.
2. **New Condition** (visor de radiografías): lo mismo, más la lupa y el placeholder "Search by code or description" de
   New Procedure, que busca en el mismo catálogo (antes decía "Select"). Note pasa a `TextArea`.
3. La búsqueda con su botón Filter es una barra de catálogo, no un par de campos: queda fuera de la grilla.

## Orden del detalle por importancia y lo del cobro (2026-10-13)

Julián, con dos tablas de orden recomendado y el prototipo *Expanded transaction detail* (que es para el detalle de
**Procedures** de esta tabla, no para el Ledger: una primera vuelta lo puso en el Ledger por error y se deshizo).

- **Procedimiento:** Treatment (el caso, su aceptación, visitas), **Procedure consent** (después de ver la aceptación,
  si el consentimiento está), Findings / diagnoses (qué condición resuelve), Referral y Lab order; y después lo del
  cobro, en el orden del prototipo: **Clinic location**, **Financial details** y **Applied transactions**.
- **Problema (finding):** Procedures (qué procedimientos lo resuelven y en qué estado), Treatment, Referral, Lab order y
  Source exam (la trazabilidad, al final). No lleva cobro: se cobra el procedimiento.

Lo del cobro sale del cargo del Ledger que cobra el procedimiento (`procedimiento` en `data/ledger.ts`):

1. *Financial details*: Original charge, Insurance paid, Payments applied, Credit adjustments applied y **Outstanding
   balance** (destacado), con la nota "Balance of this charge only, not the patient or guarantor balance.". Los números
   van en columnas de 112px como mínimo, tantas como entren, y el monto abajo de su rótulo para que queden alineados
   aunque un rótulo se parta.
2. *Applied transactions*: fecha, tipo, la transacción y lo aplicado a este cargo. La referencia abre la transacción en
   el mismo registro de sólo lectura del Ledger (`LedgerRowModal`), sin salir de Clinical Mode.
3. **Clinic location** y no "Location" como el prototipo: la tabla ya tiene una columna Location que es la zona de la
   boca (Soft Palate, Upper Arch).
4. Sin cargo, las tres filas quedan y lo dicen ("Not charged yet."). Hoy tienen cargo D0120, D1110, D0220 y D4341; el
   ejemplo con pagos parciales es D4341 ($310, faltan $170).
5. `APLICACIONES` en `data/ledger.ts` dice a qué cargo fue cada pago, ajuste o seguro; cierra con `creditoDisponible`
   (lo aplicado por cada origen más lo disponible da su monto) y ningún cargo recibe más de lo que vale. El Ledger no
   cambia.

Las fechas del Ledger (2025) y las de Clinical Mode (2026) vienen de mocks distintos y no coinciden; queda anotado.

El drawer de *View full record* sigue el mismo orden. Las piezas de la lista pasan a `ui/detail-list`
(*Components / UI / DetailList*).

## El detalle de la Problem List desde un examen y desde Treatment Plan (2026-10-13)

Julián: la Problem List lista todos los findings, pero parado en un examen también hay que poder ver esa información,
desde los tres puntos de cada finding; y cada tabla de Treatment Plan (Unassigned y los casos por fecha) tiene que
desplegarse como la Problem List, porque ahí se ve el estado del consentimiento.

1. **Findings del examen** (`ExamLayout`): el menú de cada finding empieza con **View full record**, junto a Edit (mirar
   antes de cambiar). Abre el mismo drawer de sólo lectura de la Problem List: los datos del finding (con
   *Descriptors*, que la tabla no tiene) y Procedures, Treatment, Referrals, Lab orders y Source exam. Un hallazgo o
   procedimiento vinculado cambia el drawer a ese registro sin salir del examen; un caso, una orden, una derivación o un
   examen llevan a su pestaña. No se suma un desplegable en la card: el panel mide 300px y el drawer es el patrón de
   "ver todo" (Pop ups = drawer).
2. **Los findings del examen y las filas de la Problem List son mocks distintos.** Cada finding lleva ahora `examen`
   (el Source exam; lo cargado desde un examen toma ese examen) y, si es una fila de la tabla, `problema`. Hoy sólo
   *Tooth 3 · chronic enamel dental caries* es una fila (p5: procedimiento D2391 en Restorative Plan); los otros cuatro
   muestran las filas vacías ("No procedures linked."). El estado y los datos del drawer son los del finding.
3. **Treatment Plan**: cada fila de Unassigned y de las visitas de un caso se despliega con el detalle de la Problem
   List (`detalle` de `TablaProcedimientos`): chevron, clic en la fila menos en sus controles (casilla, menú, íconos;
   arrastrar sigue igual) y un solo *Collapse all / Expand all* arriba de las visitas del caso o de Unassigned, desde
   que hay una abierta. El detalle muestra el caso que se está viendo con la visita y su turno, **Procedure consent**
   (el estado del consentimiento de ese procedimiento, o que se genera al aceptar), los hallazgos, derivaciones y
   órdenes del procedimiento del paciente que es, y lo cobrado. Una fila suelta no tiene caso ni consentimiento: esas
   filas quedan y lo dicen. El link al caso lo abre en Treatment Plan mismo; un hallazgo, en el drawer.
4. **Las filas del caso que son procedimientos del paciente llevan sus datos** (`DEL_PACIENTE` en
   `data/treatment-plan.ts`): c1v2p1 D4341 Upper Arch, c3v1p1 D2391 pieza 3 O, c3v1p2 D2392 pieza 14 O, D, c5v2p1 D3330
   pieza 19 y c7v1p1 D7140 pieza 16. Antes decían D0120 pieza 1 como el resto del frame, y el detalle mostraba un
   hallazgo de la pieza 3 debajo de una fila de la pieza 1. Fecha, provider y fee quedan como el frame.
5. **Procedure** corta los nombres largos con "…" (tooltip con el nombre entero; el detalle lo muestra completo), como
   la tabla del Overview, y **Location** no se parte: con el chevron y los nombres reales la visita de un caso aceptado
   pedía 1054px en 1026. A 1440 entra entera; más angosto scrollea de costado como antes y el detalle queda en la parte
   visible.

Radiography no cambia: sus findings viven en el visor de cada placa y no tienen menú.

Para validar con usuarios: si en el examen alcanza con el drawer o hace falta ver el resumen sin abrir nada, y si el
odontólogo usa el detalle de Treatment Plan para revisar el consentimiento antes de la visita o sigue mirando la columna
Consent.

### Pills de una sola forma, y el cobro sale de acá (2026-10-14)

Julián, con capturas del detalle de Treatment Plan: había pills repetidas (el caso *Planning* y al lado *Group status
PLANNING*), algunas en mayúsculas y otras no, y la de Status del drawer más grande.

1. **Una pill por dato**, chica (sm) y en **minúscula inicial**, como las 50 pills del resto de la app. El estado del
   grupo pasa a texto en la línea del caso ("Group status: Accepted") y sólo cuando no es el del caso (una alternativa
   descartada de un grupo aceptado); si es el mismo, no se repite.
2. Las únicas pills en mayúsculas de la app eran de Clinical Mode y venían de red.dev: Status de la Problem List y
   Procedures, el estado de cada fecha del rail de Treatment Plan y la card de Treatment plans del Overview. Pasan a
   minúscula inicial, así la fila y su detalle dicen el estado igual.
3. **Lo del cobro (Clinic location, Financial details, Applied transactions) sale del detalle de Clinical Mode** y de
   Treatment Plan: va en el detalle de la fila del Ledger y de Billing (ver `ledger.md` y `billing.md`, 2026-10-14).
   El detalle de un procedimiento termina en Lab order.
4. Clinical Mode abre desde el Ledger: `?case=` abre ese caso en Treatment Plan y `?procedure=` abre Procedures con esa
   fila desplegada (el link del caso y *View procedure* del detalle de una fila del Ledger; ver `ledger.md`).

## Consent required al cambiar el estado de un procedimiento (2026-10-17)

Julián armó el diseño en un prototipo HTML (*Consent modals revised*) para tres historias de Jira: CON-3927, CON-3946 y
CON-3950. **No se pudieron leer los tickets** (el conector de Atlassian de esta sesión no estaba conectado): lo de abajo
sale del prototipo y de cómo ya funciona la app. Conviene cotejarlo con los criterios de aceptación.

**Problema:** cambiar el estado de un procedimiento (completarlo, empezarlo) sin consentimiento firmado dejaba seguir
sin avisar. Quien lo usa es el odontólogo o la recepción, en pleno turno, y necesita decidir rápido: mandar el documento
para que el paciente firme después, firmarlo ahí mismo o seguir igual.

1. **Dónde sale.** *Complete* en Treatment Plan (el ícono de la fila o el *Complete* de la barra con filas marcadas, ya
   después de Confirm en Complete Procedure) y *Start* en el menú de la fila de **Procedures** del Overview. Un
   procedimiento suelto (sin caso) no lleva consentimiento: cambia directo.
2. **Dos variantes**, según el consentimiento (`consentimientoRequerido()`):
   - **No consent sent** (sin documento, borrador sin mandar o vencido): *Cancel · Sign now · Send consent and sign
     later*. La acción principal manda el documento (o reusa el borrador) y aplica el estado, **sin segunda
     confirmación**; el consentimiento queda Pending.
   - **Signature pending** (se mandó y falta la firma): *Cancel · Sign now · Continue without signed consent* y el link
     *View consent ↗* al documento. Aplica el estado con la firma pendiente: no crea otro documento ni lo reenvía.
   - Con varios procedimientos manda el peor caso: si uno no se mandó, es No consent sent. Todos firmados, sin diálogo.
3. **Sign now no es una firma.** Abre la revisión y la firma que ya existen (el prototipo aclara que ese flujo no se
   rediseña); acá avisa que no está en esta versión y el estado no cambia. Cancel, la X y Esc dejan todo como estaba.
4. **Caso no listo.** Si el caso no está aceptado (Planning, Pending, Presented) no hay diálogo: el procedimiento no
   cambia y sale un aviso de error con título **Procedure cannot be updated** ("The treatment case must be Accepted and
   its treatment plan must be Accepted or In Progress.") y la acción *View case*, que abre el caso en Treatment Plan.
   *Waiting for consent* cuenta como aceptado (espera las firmas). En Treatment Plan, antes de aceptar, la fila **no
   ofrece Complete** (lo que no corresponde se oculta, como el resto de la pantalla); un procedimiento ya completado
   tampoco.
5. **Desvíos del prototipo, a propósito.** El prototipo muestra el toast fijo arriba a la derecha; el sistema ya tiene
   toasts abajo a la izquierda, así que el aviso usa ese (`aviso.error` ahora acepta `{ titulo, texto }`). El prototipo
   usa una X propia para cerrar; `ConfirmDialog` no la lleva (Cancel y Esc cierran, como el resto de las confirmaciones).
   El diálogo es **un `ConfirmDialog`** (no un drawer): se contesta sin cargar nada, igual que Discard o Accept.
6. **Undo.** El aviso de *Start* sigue ofreciendo Undo y deshace el estado, pero **no retira el consentimiento ya
   enviado** (el documento salió). Si se vuelve a tocar Start, el diálogo ya dice *Signature pending*.
7. **Datos de ejemplo.** D2740 (Crown) cuelga de Crown Option, que está en Presented: Start muestra el aviso. D2391 y
   D2392 cuelgan de Restorative Plan (Waiting for consent): Pending y Not sent, una por variante.

**A validar con usuarios:** si *Expired* debe ir con No consent sent (se manda uno nuevo) o pedir *Replace document*; si
al elegir varios procedimientos conviene un único diálogo (como ahora) o uno por procedimiento; y si *Sign now* debería
volver al paso siguiente después de firmar sin que la persona tenga que repetir la acción.

Código: `clinical/ConsentRequiredDialog.tsx` (`ConsentRequiredDialog`, `ResumenConsentimiento`,
`consentimientoRequerido`, `avisarCasoNoListo`, `CASO_LISTO`); textos en `CONSENTIMIENTO_REQUERIDO` (`data/treatment-plan.ts`).
Design system: *Components / Clinical / ConsentRequiredDialog*, *Elements / ConfirmDialog* y *Components / UI / Toast*.

## Overview: el chart de DentAssmt y Treatment Plan hasta abajo (2026-10-18)

Pedido de Julián, sobre una captura del Overview: *"sumarle el mismo gráfico que tenemos en dental assessment, que te
muestre la última condition que cargaste a modo informativo"* y *"el treatment plan se corta muy temprano, debería
llegar hasta abajo justo cuando termina la tabla, así no queda espacio muerto"*.

**Problema:** el Overview tenía su propio odontograma (`Odontogram`, el viejo de 32 piezas por 7 superficies, con datos
inventados) y DentAssmt otro (la librería). Dos dibujos distintos del mismo paciente: lo cargado en uno no se veía en el
otro. Quien entra a Clinical Mode (el odontólogo, al empezar el turno) quiere ver de un vistazo cómo está la boca y qué
fue lo último que se cargó, sin editar nada.

1. **El mismo chart, de sólo lectura** (`OdontogramaLectura` en `clinical/OdontogramaOverview.tsx`): la grilla de
   react-advanced-odontogram (`OdontogramProvider` + `OdontogramChartSurface`, sin controles ni panel) con `readOnly`,
   las caras linguales de los anteriores (`CarasLinguales`) y el mismo tema. Por CSS (`.odonto-resumen`) se van la ayuda
   "Click a tooth. For multi-select…", Status / Plan y los botones de vista: acá no hacen nada. El hover de la pieza
   también se va.
2. **Un solo odontograma** (`dental/estadoOdontograma.ts`). La librería guarda su estado en el módulo y lo borra al
   desmontarse (`destroyOdontogram`), así que DentAssmt y el Overview, que nunca están montados a la vez, lo comparten
   copiándolo: al armarse cada uno carga lo guardado (`importStatus`) y DentAssmt guarda cada cambio (`getStatusChart`).
   Arranca con **la caries oclusal de la pieza 3**, que es la última condición del frame (Problem List p5, Chronic enamel
   dental caries, superficie O): ahora se ve también en DentAssmt.
3. **La última condición.** Al entrar es la del frame (Caries, 20/06/2025, pieza 3). Cuando se carga otra con **Add
   Condition** en cualquier examen pasa a ser esa: el procedimiento elegido, la fecha de hoy y su pieza
   (`ultima` en el estado de `ExamFindingsProvider`, `useUltimaCondicion()`). Add Procedure no la cambia: es algo
   planeado, no una condición. En DentAssmt no se pinta el chart desde la app (no hay controles desde el 2026-10-03), así
   que la condición nueva se ve en el aviso y en la pieza resaltada, no dibujada.
4. **La pieza resaltada** como la elegida del frame: borde azul y fondo `dash-count-bg` en sus dos celdas y el número en
   una pastilla azul. Sin pieza (una condición de zona, como un Mucocele) no se resalta nada. Para lectores de pantalla,
   el aviso suma "on tooth N".
5. **Show details** antes elegía la pieza en el chart y avisaba con un toast; en un chart de sólo lectura no tiene
   sentido. Ahora **lleva al examen donde se cargó** (el mismo destino que el link *Exam* del detalle de la Problem List)
   y, si es DentAssmt, abre con la pieza ya elegida. Sin examen con pestaña, no hay botón.
6. **El aviso en una línea desde sm**: con un nombre largo ("Resin-based composite crown, anterior") se partía en dos y
   tapaba los números de abajo. El nombre se corta (el completo va en el tooltip) y el aviso llega hasta 600px. En el
   celular sigue a todo el ancho y en dos líneas.
7. **Ancho:** el chart usa toda la columna (antes se topaba en 900); ampliado va de 900 a 1100 centrado, para que las
   piezas no se estiren de más. Debajo de 720 scrollea a lo ancho adentro de la card, como antes.
8. **Caries en rojo, de verdad.** Las caras oclusal, mesial y distal son un grupo (`g#caries-occlusal`) con la forma
   adentro, y el negro horneado está en la forma: la regla de 2026-09-14 pintaba el grupo y la caries seguía casi negra.
   Se pinta también `*-shape`. Pasaba igual en DentAssmt.
9. **Treatment Plan hasta abajo.** En desktop la card (`TreatmentPlanList llena`) es absoluta dentro de su columna: el
   alto lo marca la columna de al lado (chart + Problem List) y la lista scrollea adentro, así termina justo donde
   termina la tabla y no estira la fila. Si la tabla crece (otra página, una fila abierta) la card la acompaña. Apilado
   (menos de 1024px) sigue con el tope de 560px.

**Desvío anotado:** el frame muestra "Last Condition" con un texto fijo; ahora cambia con lo que se carga, que es lo que
pidió Julián ("la última condition que cargaste").

**A validar con usuarios:** si "Last Condition" debería decir también la pieza a la vista (hoy sólo la marca el chart);
si una condición cargada en DentAssmt debería pintarse en el chart (eso pide volver a tener controles o mapear cada
código a un estado de la librería); y si Show details tiene que quedarse en el Overview abriendo el detalle de la
Problem List en vez de cambiar de examen.

Código: `clinical/OdontogramaOverview.tsx` (`OdontogramaOverview`, `OdontogramaLectura`),
`clinical/dental/estadoOdontograma.ts`, `ULTIMA_CONDICION` / `UltimaCondicion` en `data/clinical-mode.ts`,
`useUltimaCondicion` en `ExamLayout.tsx`, `pestanaDeExamen` en `RecordDetail.tsx`, `llena` en `TreatmentPlanList`.
Design system: *Components / Clinical / Overview chart* y *Components / Clinical / TreatmentPlanList* (*Fill the
column*, *Specs*).

## Confirm Procedure y Clinical Note pasan a ConfirmDialog (2026-10-19)

Julián sintió que clinical mode necesitaba su propia definición de pop up. No era así: el sistema ya está decidido
(`ui/drawer` para todo lo que carga o edita, `ui/confirm-dialog` sólo para una pregunta antes de seguir, un flotante
anclado para consultar sin bloquear — CLAUDE.md y `design-system.md` 2026-10-06) y `ConsentRequiredDialog` ya lo sigue
bien. Lo que pasaba es que dos piezas de clinical mode se escribieron rearmando `Dialog` a mano, antes de `ConfirmDialog`
o sin encontrarlo, con botones `<button>` propios y colores hardcodeados (`bg-dash-blue`, `bg-field-error`) en vez de
`ui/button` y sus variantes.

- **`ConfirmProcedureDialog`** (`dental/ConfirmProcedureDialog.tsx`): confirma el cambio de estado de un finding, con un
  checklist opcional para marcar como Treated las condiciones vinculadas del área. Pasa a `ConfirmDialog`, con el
  checklist como children (igual que `ResumenConsentimiento` en `ConsentRequiredDialog`). `tone="danger"` en las
  acciones destructivas de `actions.ts` (discard, delete, no-treatment, patient/clinic declined), `primary` en el resto.
- **`ClinicalNoteDialog`** (`ClinicalTopBar.tsx`): ofrece firmar la Clinical Note al cerrar el encuentro. Pasa a
  `ConfirmDialog` con `cancelLabel="Remind me later"` en vez de "Cancel". Efecto colateral, a propósito: cerrar con Esc
  o clickeando afuera ahora también dispara el aviso "We will remind you to sign the Clinical Note" (antes sólo lo hacía
  el botón) — como en cualquier otro `ConfirmDialog` de la app, cerrarlo de cualquier forma es la misma decisión de no
  seguir ahora.

No se suma ningún patrón nuevo ni cambia el flujo de ninguna pantalla: es una corrección de consistencia, no una
decisión de UX nueva.

Código: `clinical/dental/ConfirmProcedureDialog.tsx`, `clinical/ClinicalTopBar.tsx` (`ClinicalNoteDialog`).
Design system: *Elements / ConfirmDialog* (fila nueva en *Specs* › *Where*).

## New Procedure: vincular pide un procedimiento ya cargado (2026-10-20)

Julián vio el problema: para vincular un finding y un diagnóstico hace falta tener el procedimiento cargado, pero el
drawer no lo cargaba hasta el final. Los cuatro pasos (Procedure, Surfaces, Link to finding, Link to diagnosis)
compartían un único Save al cierre, así que nada quedaba guardado si se cerraba antes, y conceptualmente se pedía
vincular algo que todavía no existía.

1. **Procedure (y Surfaces, si el procedimiento va en superficie) ya no llevan a "Next Step" hacia los pasos de
   vínculo**: ese paso es ahora el último antes de guardar, con el botón **Save**. Guarda el procedimiento sin
   vínculos (`linked: []`, `diagnoses: []`) y dispara el mismo aviso de siempre ("D0120 charted as planned on tooth
   21").
2. **Recién con eso guardado aparecen Link to finding y Link to diagnosis** en el indicador de pasos, para vincular
   hallazgos y diagnósticos al procedimiento que ya existe. El Save de Link to diagnosis guarda esos vínculos sobre
   ese mismo procedimiento (no crea uno nuevo) y cierra el drawer.
3. **Existing no cambia**: nunca tuvo pasos de vínculo (lo ya hecho no resuelve un hallazgo), así que sigue siendo un
   solo paso, sin indicador, con Save.

`NewProcedureDrawer` separa `onSave` (crea el procedimiento y devuelve su id) de `onLink` (guarda `linked`/`diagnoses`
sobre ese id); `ExamLayout.saveProcedure` devuelve el id generado y suma `linkProcedure` para el segundo guardado. La
UI y el catálogo de procedimientos no cambian, sólo cuándo se guarda cada parte.

Código: `clinical/dental/NewProcedureDrawer.tsx`, `clinical/ExamLayout.tsx`.
Design system: *Components / Clinical / Dental / NewProcedureDrawer* (Parts, Specs y los estados `LinkToFindingStep` /
`LinkToDiagnosisStep` actualizados).

## La guía visual de descriptores de una condition (2026-10-22)

Julián pasó el Figma *Platform Design* (5294:107675, pantalla "Edit Finding") pidiendo una mejora de esa guía visual:
trece filas -Borders, Attachment, Color, Depth, Shape, Size, Color (de nuevo), Surface, Consistency, Mobility, Pain,
Bleeding, Exudate-, cada una con sus opciones como píldoras de una sola elección. Hoy `Finding.descriptor` es un solo
texto libre y ni New Condition ni Edit Finding lo tocan: se ve, no se carga ni se edita.

También pidió revisar el flujo real de Add Condition en **Extraoral** (red.dev, un examen todavía sin construir acá,
con el `EmptyState` genérico), copiando esa pantalla. **No se pudo**: `red.dev.confidentally.com` no resuelve desde
esta sesión en la nube -la política de red del entorno no lo tiene en *Allowed domains*-, y agregarlo a mitad de
sesión tampoco alcanzó (el proxy lo siguió rechazando). Queda pendiente para una vuelta con acceso real o con capturas
de Julián; no se inventa el diagrama de regiones de Extraoral ni su flujo de Add Condition sin esa referencia.

**Lo que sí se hizo, con lo que había (el Figma, alcanzable):**

1. **`DescriptorFields`** (`dental/DescriptorFields.tsx`), nuevo: las trece filas de `DESCRIPTOR_ROWS` (`dental/data.ts`),
   cada una con su `FieldLabel` arriba -como Provider, Surfaces y Notes del mismo drawer- y las píldoras envolviendo
   debajo, en vez de la grilla fija de 5 columnas del frame -ahí sólo cierra con exactamente 5 opciones, y ocho de las
   trece filas tienen menos y dejan columnas vacías-. Una elección por fila, ninguna obligatoria; tocar la píldora ya
   elegida la deselecciona (el frame no muestra esto, pero una guía con todo opcional necesita poder volver a "nada
   elegido"). `textoDescriptores` arma el texto de `Finding.descriptor` -lo que ve la card- con lo elegido, unido por
   coma.
2. **Nueva en New Condition, nunca en Add Procedure**: el paso **Descriptors** -opcional, no bloquea Next Step/Save-
   aparece sólo con `mode="condition"`, después de Procedure (y Surfaces, si corresponde) y antes de guardar. Un
   procedure no tiene esta guía: su "descriptor" sigue saliendo de la superficie o el alcance, como hoy.
3. **Edit Finding** suma la misma sección, cargada con lo que el finding ya tenía, sólo si `finding.kind === 'condition'`.
   `Finding` suma `kind?: 'procedure' | 'condition'` -qué botón lo cargó- y `descriptors?: Record<string, string>` -la
   guía, por id de fila-; `ExamLayout.saveProcedure` los completa al crear.
4. **Corrige el punto 3 de "vincular pide un procedimiento ya cargado" (2026-10-20):** Existing ya no es siempre un
   solo paso sin indicador. Sin superficie son dos (Procedure, Descriptors); con superficie, tres. Sigue sin Link to
   finding/diagnosis -lo ya hecho no resuelve un hallazgo-, que es lo que decía ese punto.

**Sin resolver, a propósito:** las trece filas son siempre las mismas para cualquier condition -el frame tampoco
filtra-, así que una caries (D2391) muestra Attachment, Mobility o Bleeding, que son de una lesión de tejido blando,
no de una pieza. Con sólo este Figma como referencia no hay de dónde sacar qué fila va con qué condition sin
inventarlo; **a validar con Julián** si conviene agrupar o filtrar por tipo en otra vuelta, con una fuente (red.dev o
el catálogo clínico) que diga qué corresponde a cada una.

### Anomalías del frame (5294:107675)

| # | Que | Donde |
|---|---|---|
| 98 | Attachment dice **"Peculate"** (Pedunculate) | Edit Finding |
| 99 | Depth dice **"Ulcerate"** (Ulcerated) | Edit Finding |
| 100 | Dos filas se llaman **"Color"**: Normal/White/Red/Yellow y, más abajo, Red/Purple/Brown | Edit Finding |
| 101 | Consistency dice **"Smoothr"** (Smooth) | Edit Finding |

Se replican las cuatro (contenido, como "Adress"): van tal cual en `DESCRIPTOR_ROWS`. **No se replica** que
Consistency repite "Papillated" dos veces -esa fila tiene Hard, Smoothr, Papillated, Papillated, Hairy en el frame-:
es un bug de lista, como la paginación `1 2 3 4 5 3` de la anomalía 71, no una opción.

Código: `clinical/dental/DescriptorFields.tsx`, `clinical/dental/data.ts` (`DESCRIPTOR_ROWS`, `Finding.kind`,
`Finding.descriptors`), `clinical/dental/NewProcedureDrawer.tsx`, `clinical/dental/EditFindingDrawer.tsx`,
`clinical/ExamLayout.tsx` (`saveProcedure`).
Design system: *Components / Clinical / Dental / DescriptorFields* (nueva), *NewProcedureDrawer* (paso Descriptors en
Parts/Specs, estado `DescriptorsStep`) y *EditFindingDrawer* (sección Descriptors, estado `ProcedureFinding` sin
ella).

## Las doce filas reales, no las del Figma (2026-10-24)

Julián consiguió acceso real a red.dev (el bloqueo de red de esta sesión en la nube se resolvió) y mandó, además,
dos grabaciones de pantalla navegando **Extraoral** e **Intraoral** -de ahí sale todo lo de más abajo-. Primer dato
importante: la guía visual de descriptores de la vuelta anterior (2026-10-22) copiaba el Figma *Platform Design*
(5294:107675), pero **la app real usa otro catálogo**, igual en los dos exámenes. Se reemplaza `DESCRIPTOR_ROWS` por
el real; las cuatro anomalías de la sección anterior (Peculate, Ulcerate, Smoothr, la fila "Color" repetida) ya no
aplican -eran erratas del frame viejo, no de este catálogo-.

**Las doce filas** (`dental/data.ts`, `DESCRIPTOR_ROWS`), confirmadas en los dos exámenes:

| Fila | Opciones |
|---|---|
| Quantity | Solitary · Multiple diffuse · Multiple coalescing |
| Symmetry | Unilateral · Bilateral |
| Size | Small (e.g., 0.5 cm) · Medium (e.g., 1-2 cm) · Large (e.g., >2 cm) |
| Shape | Round · Oval · Irregular · Linear |
| Borders | Well demarcated · Poorly defined · Raised · Flat |
| Colors | Red · Pale · Pink · White · Gray · Blue · Brown · Black · Yellow |
| Surface | Smooth · Rough · Papillated · Ulcerated · Hairy |
| Consistency | Hard · Soft · Firm · Fluctuant · Indurated |
| Mobility | Fixed · Movable |
| Pain | Painful · Painless |
| Bleeding | Present · Absent |
| Exudate | Absent · Serous · Purulent · Bloody |

Sin erratas que anotar esta vez: son los rótulos tal cual los escribe la app real.

### Lo que las grabaciones muestran de Extraoral e Intraoral (sin construir todavía)

No alcanza el tiempo de esta tanda para armar las dos pantallas enteras, pero queda documentado para la próxima:

1. **El gráfico tiene regiones clickeables, de verdad.** Extraoral son cuatro vistas de cabeza (perfil izquierdo,
   frente, nuca, perfil derecho); Intraoral, boca y lengua desde dos ángulos. Clickear una región la resalta
   (amarillo mientras se está por cargar; verde azulado cuando ya tiene una condition activa).
2. **Se pueden elegir varias regiones a la vez** antes de cargar la condition: cada una queda como chip en "Selected
   area", con su ✕ para sacarla. Regiones vistas: Scalp, Right/Left Posterior Head, Right/Left Forehead, Right/Left
   Eye (Extraoral); Right/Left Maxillary Gingiva, Right Mandibular Gingiva, Right/Left Ventral Tongue, Right Hard
   Palate, Soft Palate (Intraoral). Seguro hay más: esto es sólo lo que aparece en las dos grabaciones.
3. **"Add Condition" es un catálogo propio, no el de procedimientos**: en las grabaciones, "Atrophy (morphologic
   abnormality)", "Blister (morphologic abnormality)", "Abscess (morphologic abnormality)" y "No Findings". El
   buscador dice "Search a Condition Here...", con un botón "Filter" al lado.
4. **Dos pasos, mismo título "New Condition", sin indicador de pasos visible**: 1) área + catálogo de condición, con
   "Select descriptors" como botón de avance (no "Next Step"); 2) las doce filas de arriba, con "Save". Ninguna fila
   es obligatoria: las condiciones de ejemplo quedan con 2 a 12 filas elegidas, nunca las doce completas.
5. **La card del finding dice "Location:"**, no "Area", con las regiones separadas por coma si son varias, y
   "Descriptors:" sólo con lo elegido (overflow como "+9 more").
6. **Add Procedure no cambia**: catálogo de códigos, pestañas Existing/Planned -igual al `NewProcedureDrawer` que ya
   existe acá-.
7. **Edit Procedure es un modal centrado**, no el drawer con pasos de acá: General Information a la izquierda (Created
   date, Status, Fee, el código, Provider, Note) y, a la derecha, pestañas **Findings**/**Diagnostics** -el mismo
   buscador de vincular, pero las dos conviven en pestañas en vez de ser pasos sucesivos del wizard-. **No se tocó**:
   `NewProcedureDrawer` sigue siendo drawer, que fue un pedido explícito de Julián (2026-10-03) como excepción a la
   regla de no usar drawers; cambiarlo a este modal de dos columnas queda pendiente de que lo confirme, no es un
   cambio que se decida solo.

No se armó el gráfico de regiones (necesitaría los límites de cada zona, que no se pueden sacar con precisión de
pixeles de una grabación) ni el catálogo de condiciones por examen. Extraoral sigue con el `EmptyState` genérico.

Código: `clinical/dental/data.ts` (`DESCRIPTOR_ROWS`).
Design system: *Components / Clinical / Dental / DescriptorFields* (Playground, Parts y States actualizados con el
catálogo real).

## Extraoral: el gráfico de regiones (2026-10-24)

Julián pidió seguir con Extraoral en la misma tanda. Dos fuentes nuevas, además de las grabaciones:

1. **El Figma real tiene las cuatro vistas de cabeza**, como imagen plana (nodo 4106:157537/4106:158958 de *Platform
   Design*, página "Clinical Exam — Extra Oral"), con una región ya pintada de ejemplo. Se intentó sacarle esa pintura
   con inpainting (OpenCV, TELEA y Navier-Stokes) para reusarla como base limpia: **no salió bien** -quedan manchas y
   un borde fantasma en la frente, la parte más visible de las cuatro vistas-, así que no se usó. El PNG de
   `extra-oral-diagram.ts` (ya en el repo de una vuelta anterior) es este mismo asset, en baja resolución.
2. **Jira** (CON-2770, CON-2066, CON-1860, CON-2063): confirma que el área se guarda como `location` -una región con
   nombre, no un diente- y que el gráfico es clickeable de verdad.

**Se construye el gráfico como SVG propio**, no la imagen del Figma ni una reinterpretación de ella: mismo criterio que
el `Odontogram` ("no una foto", más arriba en este archivo). `ExtraOralDiagram.tsx` dibuja las cuatro vistas -perfil
derecho, frente, nuca, perfil izquierdo, el orden de una foto clínica- a mano, con las siete regiones vistas en las
grabaciones (Scalp, Right/Left Forehead, Right/Left Eye, Right/Left Posterior Head) como `<path>` clickeables.
**Los límites de cada región son una aproximación** -no hay fuente vectorial de la app real, se estimaron a ojo sobre
capturas de video-; ajustar cuando haya más referencia. Una región puede dibujarse en más de una vista (Right/Left
Forehead, en su perfil y en el frente) y todas sus formas se marcan juntas. Scalp queda sólo en el frente por ahora:
en las grabaciones también se veía en los dos perfiles, pero ahí se pisaba con Forehead/Posterior Head -pendiente
para la próxima pasada, con más espacio en el dibujo-.

**Estados del color, los mismos tokens que ya usa la app**: `pending` (ámbar, `warn-fg`, mientras se elige antes de
guardar) y `active` (verde, `dash-ok-fg`, el mismo de un finding Active) -nada de colores nuevos.

**El flujo, calcado de las grabaciones**:

1. Clickear una o más regiones las agrega a "pending" -queda en ámbar-, estén o no con el drawer abierto.
2. **Add Condition** abre `RegionConditionDrawer`: dos pasos, los dos titulados "New Condition" (la app real no
   muestra un indicador de pasos; acá sí, como todos los drawers del sistema). Paso 1, **Condition**: las regiones
   elegidas como chips removibles y el catálogo de condición -propio, no el de procedimientos: sólo **Atrophy**,
   **Blister** y **Abscess** (todas "morphologic abnormality") aparecieron en las grabaciones, seguro hay más y no se
   inventan sin verlas-. El botón de avance dice **"Select descriptors"**, no "Next Step" -así lo dice la app real-,
   y se suma un `nextLabel` opcional a `DrawerActions` para esto (con "Next Step" de default, no cambia ningún otro
   drawer). Paso 2, **Descriptors**: la misma guía visual de `DescriptorFields`.
3. **Save** crea el finding -`kind: 'condition'`, `area` con las regiones unidas por coma, `examen: 'Extraoral'`- y
   limpia la selección; las regiones quedan en verde.

**`ExamLayout` suma `onCondicion`**, opcional: si se pasa, Add Condition lo llama en vez de abrir el
`NewProcedureDrawer` genérico (que siempre carga contra un diente). Add Procedure no cambia -sigue siendo el genérico,
pendiente para otra vuelta; CON-2063 sugiere que ahí el área se autodetecta como "todo el examen", no se elige una
región, pero no alcanza a verse bien en las grabaciones-. También se suma `useFindingsEstado`, el hook para que un
examen con su propio Add Condition pueda guardar un finding directo (sin pasar por `NewProcedureDrawer`); `ExtraOralExam`
se envuelve en su propio `ExamFindingsProvider` si no hay uno puesto (para andar suelto en Storybook, como ya podía
`DentalAssessmentExam` con su fallback).

**Lo que vieron las grabaciones y no se replicó, a propósito**:

- La card de un finding muestra la **condition en negrita** arriba ("Atrophy (morphologic abnormality)") y
  "Location:"/"Exams:" como líneas con rótulo debajo; acá `FindingCard` sigue mostrando el área en negrita y
  "Condition:" como línea, la decisión ya documentada en "Findings según el design system" (más arriba). Son dos
  formatos de card distintos -no sólo Extraoral: cambiaría la de todos los exámenes-. **A confirmar con Julián** antes
  de tocarlo.
- El catálogo de condición completo (más que Atrophy/Blister/Abscess) y los límites exactos de cada región: sin una
  fuente mejor que un video, no se inventan.

Código: `clinical/ExtraOralExam.tsx`, `clinical/dental/ExtraOralDiagram.tsx`, `clinical/dental/RegionConditionDrawer.tsx`,
`clinical/dental/data.ts` (`EXTRAORAL_REGIONS`, `REGION_CONDITIONS`), `clinical/ExamLayout.tsx` (`onCondicion`,
`useFindingsEstado`), `ui/drawer.tsx` (`DrawerActions.nextLabel`), `pages/ClinicalMode.tsx`.
Design system: *Components / Clinical / Dental / ExtraOralDiagram* y *RegionConditionDrawer* (nuevas), *Components /
Clinical / ExtraOralExam* (nueva).

## Extraoral e Intraoral con el gráfico del Figma, y los tres Edit con su diseño (2026-10-24)

**CON-881, CON-882 y CON-934** (Exam Extra Oral, Exam Intra Oral, [Exam] Add condition). Julián: "no cambies los gráficos que
te pasé, los diseños deben ser lo que están en Figma"; "el intra oral también debe aparecer sin nada marcado"; "la lógica
usa la que armamos, pero el diseño el del Figma".

**Los gráficos son los PNG del Figma**, no un dibujo (`clinical/dental/RegionDiagram.tsx` es la base; `ExtraOralDiagram` e
`IntraOralDiagram` la usan; `assets/extraoral-heads.png` e `assets/intraoral-mouth.png`, a 2048 px).

- Los dos PNG traen una región de ejemplo ya pintada de celeste (el chip "Uper left", con typo, **anomalía #102**), y el
  Figma no tiene una versión limpia. Se probó borrarla con inpainting (deja manchas y se pierde la nariz de los perfiles)
  y aclararla con un filtro (lava todo el dibujo). Lo que funcionó: **deshacer la mezcla por cálculo**. La capa celeste es
  translúcida, así que se estimó cómo se mezcla con el dibujo y se invirtió; en Extraoral, donde el arte es gris, queda
  el dibujo original. En Intraoral el color de debajo no se puede recuperar entero: el labio se completó con su espejo
  (el dibujo es simétrico, eje 1144 px), y en el paladar blando se recuperó la luz y el color se rellenó con el del
  paladar de al lado; se borraron los bordes blancos que traía la capa. Los resultados se ven limpios, pero **son una
  reconstrucción**: el reemplazo correcto es el asset de red.dev (cabeza y boca sin celeste y una capa por región).
- **Las zonas** (invisibles hasta pasar el mouse) salen de las formas celestes del propio PNG, completadas por simetría, y
  de la partición que se ve en red.dev. Los ojos, Scalp y el paladar duro son una aproximación mía. Right = lado derecho
  del paciente: en el frente queda a la izquierda del dibujo, en la nuca a la derecha, en el Intraoral a la izquierda.
- **Extraoral**: 7 zonas (Scalp, Right/Left Forehead, Right/Left Eye, Right/Left Posterior Head). **Intraoral**: sólo las
  de nombre confirmado: Right/Left Hard Palate (CON-882 da "Right Hard Palate") y Soft Palate (el nombre del Figma). El
  resto de lo que se ve en red.dev -labios, arcada, mejillas, lengua, piso de boca- espera su lista de nombres: no se
  inventan. Tampoco cuello y hombro (Jira da "Right Anterior Neck", "Left Shoulder"): el Figma no los marca.
- `RegionExam` (`clinical/RegionExam.tsx`) es el examen de los dos: pending ámbar, active turquesa, el mismo Add Condition
  por región (`RegionConditionDrawer`, que ahora acepta cualquier nombre de región). Sin región elegida se carga como
  **Not Localized** (CON-881/CON-882). La pestaña Intra Oral deja de ser un placeholder.
- **Jira vs. app real, sin cambiar**: Jira dice "una fila por locación" al elegir varias regiones; red.dev muestra **una
  sola card con todas las locaciones**. Se deja lo que hace la app real. También sin aplicar, por no verse en la app: las
  pestañas *Most Used / All Conditions* y los códigos SNOMED, los textos exactos de CON-934 ("Condition successfully saved
  to the exam." y los dos errores) y los descriptores en orden alfabético.

**Los tres Edit con el diseño del Figma y nuestra lógica.** `EditFindingDrawer` ahora elige según el finding:

| Finding | Drawer | Figma |
|---|---|---|
| Procedimiento (Add Procedure) | **Edit Procedure**: General Information / Findings / Diagnostic | 5294:85084 |
| Condition en un diente | **Edit Condition**: Selected Area con la rueda y las superficies, descriptores, notas | 5301:149072 |
| Condition sin diente (Extraoral, Intraoral) | **Edit Finding**: Selected Descriptors | 5294:107675 |

- Las filas de datos de arriba (Creation date, Provider, Exams, nombre con su estado) son `DatosHallazgo.tsx`: card con la
  línea azul a la izquierda y sombra suave. La píldora de estado del Figma mide **6,5 px de texto**: se usa la `Pill` chica
  del sistema (10 px), que sí se lee (**anomalía #103**).
- **DescriptorFields** pasa al diseño del Figma en toda la app (New Condition, Edit, Extraoral/Intraoral): rótulo a la
  izquierda y control segmentado (caja gris, la opción elegida en azul). Antes eran píldoras sueltas debajo de cada rótulo.
  La lógica no cambia (una opción por fila, ninguna obligatoria, tocar la elegida la deselecciona).
- El pie es Cancel a la izquierda y Save a la derecha, del mismo ancho (antes estaban al revés). Los drawers ya no
  llevan bajada con el área y la condition: ese dato es ahora una fila.
- **Edit Condition**: el proveedor va como dato, sin editar, como en el Figma. Las superficies y los descriptores se
  corrigen acá, independientes entre sí (CON-2770); el Figma de esta pantalla no trae descriptores, así que van con el
  diseño de Edit Finding debajo del área. **La rueda es la nuestra** (MB/B/DB/O/ML/L/DL), no la del Figma
  (BC/B/D/M/P/PC/O) ni sus nombres ("D - Distal", "M - Masial", "B - Bucal"): es otro vocabulario de superficies, no se
  mezcla sin confirmar con Julián.
- **Edit Procedure**: el Fee sale del arancel UCR del código (`precioUcr`, `data/finanzas.ts`) y se guarda en el finding al
  cargar el procedimiento; si no hay precio, la fila no aparece. Findings y Diagnostic reusan las cards y el buscador de
  Link to finding / Link to diagnosis de New Procedure; un solo Save guarda proveedor, notas y vínculos.
- Una condition de un diente con descriptores ya no se edita desde "Edit Finding" sino desde "Edit Condition" (el e2e se
  actualizó).

Código: `clinical/dental/{RegionDiagram,ExtraOralDiagram,IntraOralDiagram,RegionConditionDrawer,DatosHallazgo,EditFindingDrawer,
EditConditionDrawer,EditProcedureDrawer,DescriptorFields}.tsx`, `clinical/{RegionExam,ExtraOralExam,IntraOralExam,ExamLayout}.tsx`,
`dental/data.ts` (`INTRAORAL_REGIONS`, `Finding.fee`), `data/finanzas.ts`, `pages/ClinicalMode.tsx`. Storybook sin tocar
(se hace al final, cuando Julián lo pida).

### Ajustes: notas, Intraoral más chico, buscadores y contraste con Jira (2026-10-24)

**CON-2770 (Edit Finding), CON-934 (Add condition), CON-1399.** Julián: "edit finding falta el note"; "el intra oral está
enorme, achicalo (tomá de referencia el video)"; "los search deben funcionar como un search: no deberían estar por
default las condition cargadas, deben aparecer cuando las busco".

- **Edit Finding** suma **Notes** y la fila **Treatment Area** (el área del finding). Así cumple CON-2770, que pide
  mostrar fecha, estado, condition, examen y área de tratamiento de sólo lectura, y editar superficie (si corresponde),
  notas y descriptores. El Figma de Edit Finding no trae ni Notes ni Treatment Area: manda Jira.
- **Intraoral** mide como en la grabación de red.dev: unos 740 px de ancho, centrado, en vez de todo el examen.
- **Buscadores**: `ui/search-picker.tsx` (nuevo, `SearchPicker`), el mismo formato que `PersonSearchField`. No muestra
  nada hasta escribir; las coincidencias flotan en un desplegable pegado al input y lo elegido queda debajo con una ✕. Se
  usa en la condition de New Condition (Extraoral/Intraoral), en Findings / Diagnostic de Edit Procedure y en Link to
  finding / Link to diagnosis de New Procedure. **Contradice CON-934**, que lista las condiciones de entrada (pestañas
  *Most Used / All Conditions*) y usa la búsqueda para filtrar: se sigue lo que pidió Julián. El catálogo de
  procedimientos de New Procedure/New Condition de DentAssmt (con embudo, Category y Existing/Planned) **no se tocó**: es
  la pantalla de la app real; queda a confirmar si también pasa a buscador.
- La región con una condition activa se pinta con el celeste del Figma y de red.dev (token nuevo `region-active`,
  `#90dbd5`); el verde de la app sobre el rosa del Intraoral quedaba oliva.
- **Jira consultado**: CON-2770 (Edit Finding, la más nueva, manda sobre CON-1399, de 2025, que además dejaba editar
  locación y estado), CON-3142 / CON-3143 (VOL 2 Edit Procedure / Edit Condition: sin descripción) y CON-774 (Edit
  Procedure del catálogo de admin, no aplica al examen). Para Edit Procedure del examen no hay historia con campos: la
  lógica sigue siendo la nuestra (proveedor, notas, vínculos).

Código: `ui/search-picker.tsx`, `clinical/dental/{EditFindingDrawer,EditProcedureDrawer,NewProcedureDrawer,
RegionConditionDrawer,IntraOralDiagram,RegionDiagram,OpcionesVinculo}.tsx`, `index.css` (`region-active`). Storybook sin
tocar: las historias de RegionConditionDrawer y NewProcedureDrawer que eligen de la lista van a tener que escribir en el
buscador cuando se documente.

### Buscadores como en red.dev (2026-10-24)

Julián, con dos grabaciones de red.dev (New Procedure y Edit Procedure): "es un buscador independiente que busca"; "no me
gusta cómo quedó el diseño del search cuando busco un finding o una condition: lo haría como el video, pero con el estilo
de nuestra app".

- **New Procedure / New Condition (DentAssmt)**: la lista del catálogo queda como está, filtrada por Category, área y
  Existing/Planned. El buscador ya no la filtra: es **independiente**, busca en todo el catálogo del estado elegido y
  abre su propio desplegable encima de la lista, con código, descripción y los alcances posibles (Tooth, Quadrant…).
  Elegir un resultado lo marca en la lista y la desplaza hasta él; si la categoría o el área lo escondían, se limpian.
- **`SearchPicker`**: los resultados son **cards** con el estilo de la app (`TARJETA_INTERNA`) sobre un fondo gris
  claro. Un finding se ve como la card de finding (estado, fecha, nombre en negrita, Exams, Location), un diagnóstico
  como "código - descripción" con el área debajo, una condition con su grupo. Al pasar el mouse aparece la acción
  (vincular o agregar). Lo elegido queda debajo en una card con borde azul y su botón para desvincular o sacar; arriba,
  "Linked findings" / "Linked diagnoses". El input lleva una ✕ para limpiar.
- En red.dev los resultados de Edit Procedure quedan en el panel y no en un desplegable, y los findings aparecen de
  entrada: acá se mantiene el pedido anterior (nada hasta escribir, desplegable como el resto de los buscadores).
  La descripción del diagnóstico es la condition del finding (no hay catálogo de diagnósticos con su texto).

Código: `ui/search-picker.tsx`, `clinical/dental/{OpcionesVinculo,NewProcedureDrawer,EditProcedureDrawer,RegionConditionDrawer}.tsx`.

## Sin View full record en el desplegable de las tablas (2026-10-25)

- Pedido de Julián: el detalle que se despliega ya tiene toda la información, así que el botón **View full record** del
  pie sale de los desplegables de las tablas: Problem List, Procedures y las visitas de Treatment Plan (`DetalleRegistro`),
  el Ledger y la tabla de Billing con un paciente (`DetalleMovimiento`). Revierte el "un solo link al registro" del
  2026-10-19.
- En el pie del Ledger queda sólo **Apply credit** (con crédito sin aplicar) y *Read-only summary*; sin acciones, no hay pie.
- Sigue en el menú de los tres puntos de cada finding de los exámenes (ahí no hay desplegable) y en las referencias de
  *Applied transactions* (abren la transacción en el modal).
- Se pierde el atajo de un cargo de procedimiento del Ledger a Clinical Mode con el procedimiento abierto; quedan el link al
  caso de la fila Treatment y el de cada hallazgo. A validar con usuarios si se extraña.

## Los Edit: orden de los datos, dos pestañas y el área de tratamiento (2026-10-27)

**CON-3700 (Findings, cambios de modelo), CON-1761 ([Condition] Treatment Area), CON-2770 (Edit Finding).** Julián:
"el procedure arriba, luego fecha, precio y capaz arriba el precio"; "separá en 2 tabs General de Descriptors tanto en
Edit Condition como en Edit Finding (así queda más corto)"; "Treatment area iría con el símbolo de extra oral o intra
oral, el ícono diseñado igual que cuando marcamos un tooth (fondo azul e ícono en blanco)… cada procedure y finding
tiene un treatment area o no tiene; si tiene, el sistema guarda cuál es esa área y cuál es el valor".

- **Orden de los datos**, según el mockup que mandó Julián después ("nuevo orden"): nombre con su estado → Creation
  date → (Fee, sólo procedimientos) → Exams → Provider → el área de tratamiento al final. Edit Procedure no muestra
  Exams y su proveedor es el select editable de abajo, así que queda nombre → fecha → Fee → área. Un primer intento
  ponía el Fee antes de la fecha y el área antes del examen; quedó descartado.
- **"Edit Condition" se llama "Edit Finding".** Julián: "dice condition pero siempre es finding": una condition
  cargada es un finding, así que el drawer de una condition en un diente (`EditConditionDrawer`, Figma 5301:149072)
  también se titula **Edit Finding**, igual que el de Extraoral/Intraoral. Anomalía: el Figma lo titula "Edit
  Condition". El componente conserva su nombre interno; sólo cambia lo que ve el usuario.
- **El diente encabeza la rueda.** En ese drawer ya no van el título "Selected Area" ni la cabecera "Tooth N ·
  Permanent" adentro de la card: la fila del área (`FilaArea`, Tooth · "20 · Permanent") es la cabecera de una card
  `TARJETA_INTERNA` con la rueda de superficies, "Selected surface" y la ayuda, como en el mockup.
- **Edit Finding (las dos variantes)** pasa a dos pestañas, **General Information** (datos, área, notas) y
  **Descriptors**, con `ui/tabs` en el drawer, como Edit Procedure.
- **Área de tratamiento** (CON-3700, `findings.specs`): `Finding.treatmentArea` guarda `{ tipo, valor }`. Tipos: Tooth,
  Range, Quadrant, Arch, Mouth e Intraoral/Extraoral (en el backend, un único `INTRA_EXTRA_ORAL` con la lista de
  `location`). El valor es el diente, el cuadrante ("Upper Left", código 20), la arcada ("Maxillary", 01), la boca entera
  ("Entire oral cavity", 00) o las regiones marcadas en el gráfico. Se guarda al cargar: Add Procedure / Add Condition
  según el alcance elegido (`areaDeAlcance`), Extraoral / Intraoral con su ubicación. Lo cargado antes, sin el dato, lo
  deduce `areaDeTratamiento` (diente → Tooth, examen Extraoral/Intraoral → su región).
- La fila muestra el ícono del tipo en el cuadrado azul con el ícono en blanco, como el del diente (`IconoArea`,
  `FilaArea`), el nombre del tipo ("Intra Oral", "Quadrant") y su valor. En Edit Procedure reemplaza la fila "Tooth".
- **A validar con usuarios:** si recepción y odontólogos esperan ver "Condition" en algún lugar (la acción del
  odontograma sigue siendo *Add Condition* y el drawer de alta, *New Condition*): cargar una condition y editarla como
  finding es coherente con el modelo, pero conviene confirmar que el cambio de nombre no confunde.
- **Íconos, a confirmar**: diente, boca y arcada son los del design system; Range usa el diente. Para Extraoral e
  Intraoral el Figma no tiene ícono: Extraoral lleva la cara de lucide (`ScanFace`) e Intraoral la boca abierta, que el
  Figma también usa para Quadrant (y acá para Mouth). Conviene que diseño defina un ícono propio para cada tipo.

Código: `clinical/dental/{data.ts,ScopeIcons,DatosHallazgo,EditFindingDrawer,EditConditionDrawer,EditProcedureDrawer}.tsx`,
`clinical/{ExamLayout,RegionExam}.tsx`, `tests/clinical-mode.e2e.ts`.

## Edit Finding: el nombre sin el ícono del diente (2026-10-28)

**CON-2770 (Edit Finding).** Julián, sobre el drawer de una condition en un diente: "en el nombre de la condición creo que
es innecesario el ícono, porque el ícono de la location ya lo pusiste en el tooth".

- La fila del nombre (`FilaNombre`) muestra sólo el nombre y el estado, en los tres Edit. El ícono del área va una sola
  vez, en su fila (`FilaArea`: Tooth, Quadrant, Intra Oral…), y no se repite arriba. Se quitó la prop `alcances`, que
  sólo usaba este drawer.
- Anomalía: el Figma 5301:149072 pone el ícono del diente delante del nombre; acá se saca para no duplicar el dato.

Código: `clinical/dental/{DatosHallazgo,EditConditionDrawer}.tsx`.

## Extraoral e Intraoral: sin región elegida no se carga nada (2026-10-28)

**CON-1398 ([Intra Oral / Extra Oral] Add Finding), CON-1401 ([Intra Oral / Extra Oral] Exam), CON-881, CON-882.**
Julián: "en red.dev, en el flujo de Add Condition y Add Procedure hay una validación antes que te dice que no podés
cargar una condition sin antes seleccionar una parte de la cabeza (para ambos exámenes va esto)".

- **Validación:** en Extraoral e Intraoral, Add Condition y Add Procedure sin ninguna región elegida no abren el drawer;
  avisan con un toast de advertencia: "Select at least one area on the chart to add a condition." / "…to add a
  procedure." (mismo patrón que "Select at least one document to download." de Documents). Lo resuelve `ExamLayout`
  con la prop `regiones`, así vale para los dos botones y los dos exámenes.
- **Add Procedure va a la región.** Hasta ahora, en estos exámenes Add Procedure abría el New Procedure de diente
  ("Upper left", dientes del cuadrante). Las grabaciones de red.dev (2026-10-24) muestran New Procedure con "Selected
  area: Right Malar Region ×": se carga sobre las regiones del gráfico. Ahora `NewProcedureDrawer` con `regiones`
  muestra esas regiones como chips (requeridas, se pueden sacar), sin los íconos de alcance por diente ni el paso
  Surfaces, y guarda `area` = las regiones y `treatmentArea` = Extraoral/Intraoral con ese valor (CON-3700).
- **Si se sacan todas las regiones dentro del drawer** (New Condition o New Procedure), en lugar de los chips dice
  "Select at least one area on the chart." y no deja avanzar ni guardar.
- **Se va "Not Localized".** Anomalía / conflicto con Jira: CON-1398 y CON-1401 dicen que sin locación elegida se usa
  `"Not Localized"`; red.dev hoy valida, y Julián pidió seguir a red.dev. En las grabaciones del 2026-10-24 red.dev
  todavía abría los dos drawers sin región, así que la validación es posterior. Conviene que la historia se actualice
  (no se tocó Jira: es sólo lectura).
- **Texto a confirmar:** no se pudo entrar a red.dev (pide login) para copiar el mensaje exacto de la validación; el
  texto de arriba es provisorio hasta tener una captura.
- **FindingCard** ya no muestra "Descriptors:" vacío: la línea aparece sólo si hay descriptores (una condition sin
  descriptores o un procedimiento por región dejaban el rótulo solo).

Código: `clinical/{ExamLayout,RegionExam}.tsx`, `clinical/dental/{NewProcedureDrawer,RegionConditionDrawer,FindingCard}.tsx`,
`tests/clinical-mode.e2e.ts`.

## El Overview sin scroll: la tabla flota desde View Problem List (2026-10-29)

Julián: en Clinical Mode el ícono de la tabla tiene que ser igual al de las demás pantallas, en la misma ubicación y
flotante, para ver toda la pantalla a simple vista sin scroll.

- El Overview tenía la **Problem List / Procedures** fija debajo del chart (la pantalla medía 1.274px a 829 de alto, 445
  más que la ventana). Ahora la tabla sale del flujo y se abre **flotando** desde el botón *View Problem List* (ícono
  `Table2`), el mismo de los exámenes: arriba a la izquierda del contenido, blanco, con el texto al pasar el mouse y el
  tooltip "Open the patient's problem list". Página: 1.274 → 891px a 1519×829 (en 1080 de alto entra entera).
- Una sola pieza: `ProblemListFlotante` (botón + tooltip + popover con la tabla). `ExamLayout` ya no arma su propio
  popover: la usa en la fila de acciones. Con `?procedure=` (el link del Ledger) el Overview abre la tabla ya en
  Procedures con esa fila, como antes.
- El botón está también con el chart ampliado, donde antes la tabla se escondía.
- Sin cambio de contenido: las mismas pestañas, filtros, filas y acciones, ahora en el flotante.
- **Anomalía de nombre:** el pedido habla de "Clinical Notes"; no hay pantalla con ese nombre en la app (sólo la
  Clinical Note que se ofrece firmar al cerrar el encuentro). Se tomó como el Overview de Clinical Mode, que es donde la
  tabla estaba fija. Confirmar con Julián.
- **A validar con usuarios:** si el odontólogo abre seguido la tabla en el Overview (en ese caso conviene dejarla
  anclada) o la consulta de paso; y si el botón de sólo ícono se descubre sin el texto.
- `tests/clinical-mode.e2e.ts`: los tests que usaban la tabla del Overview abren primero *View Problem List*; los de
  consentimiento cuentan el dialog *Consent required* (el popover de la tabla también es `dialog`).

## El fondo del panel del examen llega hasta el borde de Findings (2026-10-29)

Julián, con captura: en los exámenes (Extra Oral entre otros) el panel blanco de la derecha quedaba corto -terminaba
bien antes que la lista de Findings de la izquierda y dejaba a la vista una franja del gris de la página abajo.

- La fila de `ExamLayout` (columna de Findings + columna del examen) tenía `lg:items-start`: cada columna tomaba sólo
  el alto de su propio contenido, sin importar la otra. Pasa a `lg:items-stretch` -el default de flexbox, que se había
  pisado a propósito- así las dos columnas quedan parejas, a la altura de la más alta.
- Eso sólo empareja la columna; el panel propio de cada examen (el borde con el gráfico, el odontograma, el
  "Planned" de los exámenes sin armar) seguía siendo alto por su contenido. Ahora `ExamLayout` envuelve `children` en
  un `div` `flex-1` y cada panel (`RegionExam`, `DentalAssessmentExam`, el `enConstruccion` de `ClinicalMode`) lleva
  `h-full`: el fondo blanco (o el punteado de Extra/Intra Oral) estira hasta el final de esa columna, no sólo el
  contenido.
- Vitals (`findings={false}`, sin columna de Findings) no cambia: con una sola columna `items-stretch` no tiene nada
  contra qué emparejar.
- Cuando el examen tiene más contenido que Findings (DentAssmt con el odontograma completo), ahora es la columna de
  Findings la que se estira pareja -antes quedaba corta del lado del examen-.

Código: `clinical/{ExamLayout,RegionExam,DentalAssessmentExam}.tsx`, `pages/ClinicalMode.tsx`.

## Treatment Plan: Estimate details desde el Total Amount (2026-10-28)

**CON-3710 (Botón manual de calcular estimations), CON-2529 (Actualización de valores frente a cambios del plan)**, epic
CON-3695 (indexado en `treatments.md`). Julián: el botón del precio del Treatment Plan lleva a una pantalla con el
detalle en tabla. Referencia: su prototipo `estimate_details_interactive_1.html` (no está en el Figma). red.dev pide
login, así que la pantalla de ahí no se pudo ver.

- **Entradas:** el `Total Amount` del caso (en la fila de campos y plegado en el encabezado) y el `Total amount` de las
  cards del Overview pasan a ser botones con chevron. La card entera sigue abriendo el caso: el botón del total va encima
  de una capa que cubre la card (un botón no puede ir dentro de otro).
- **Pantalla** (`EstimateDetails`): reemplaza al rail y al caso a todo el ancho —la tabla tiene nueve columnas— y se
  vuelve con "Back to Case". Encabezado con el caso, estado de la estimación, fecha del último cálculo y la acción;
  cinco totales (Plan case total, Deductible applied, Insurance portion, Insurance adjustments y Patient portion, este
  resaltado); "Procedure breakdown" agrupado por visita (plegable) con Amount charged, Allowable amount, Coverage %,
  Copayment, Deductible applied, Insurance portion, Insurance adjustment y Patient portion, y la fila Case total.
- **Estados:** Not calculated (estado vacío + Calculate estimates), Up to date, Update needed (los números son el cálculo
  anterior y se dice), Updating estimates… (spinner, se siguen viendo los anteriores), Update failed (Alert + Retry
  update) y Locked (desde Pending; "Locked at presentation" desde Presented). Update failed se ve con Prototype
  controls (abajo).
- **Regla (CON-2529):** sólo se calcula en Planning y con permiso sobre la ubicación; después la estimación es de sólo
  lectura. Calcular actualiza todas las alternativas en Planning del grupo ("Updates all treatment alternatives").
  Sin amount charged no se estima.
- **Disparador implementado:** mover un procedimiento de visita (trigger 8 de CON-2529) deja la estimación en Update
  needed. La estimación guarda la foto del plan con la que se calculó: la tabla muestra esa foto hasta recalcular.
- **Aviso "Ins. est. update available"** (CON-2529, paso 2-4): en el caso en Planning con la estimación desactualizada,
  al lado del Total Amount. Abre la confirmación "Insurance Estimate Update Available" con la copia de la historia y
  "Update" recalcula.
- **Desviación del prototipo:** con la estimación al día el botón no desaparece, queda como secundario "Recalculate".
  CON-3710 pide poder calcular a mano "para corroborar los resultados" mientras se arma el plan.
- **Desviación del prototipo:** en celular la columna Procedure queda fija y los montos scrollean de costado.
- **Dato corregido:** el `total` de cada caso sale ahora de la suma de sus fees. Era un número suelto (231.12) que no
  cerraba con los procedimientos ($1,872.00 con 8 de $234): al abrir el desglose se iba a leer como error. Los totales
  de cada visita ("$100.000") siguen como estaban.
- **Mock del cálculo** (`data/estimaciones.ts`): cobertura por categoría del CDT (D0-D1 100 %, D2-D4 80 %, resto 50 %),
  allowable del 90 % / 85 %, deducible de $50 que se consume en orden en lo no preventivo, copago 0. Charged = insurance
  + adjustment + patient en cada fila. Arranque: Periodontists Recommended desactualizado (la foto no tiene el último
  procedimiento de la Visit 2), Periodontist Alternative sin calcular, el resto calculado.

**Segunda vuelta (Julián, mismo día):**

- La pill del estado va **al lado del título**, no debajo.
- Sin "Last calculated …", sin el texto bajo el botón ("Updates all treatment alternatives") y sin bajada en Up to date
  ("No changes affecting estimates…"): con la pill alcanza. El resto de los estados conserva su bajada porque dice algo
  que la pill no (que los números son del cálculo anterior, que está congelado). Calcular sigue actualizando todas las
  alternativas del grupo; lo dice el toast.
- El rótulo de arriba ("Treatment case · …") pasa al rótulo chico del sistema (el de ListGroup): 11px, semibold,
  `tracking-wide`, `text-ink-muted`. Tenía 10px y `tracking-[0.12em]`, demasiado interletrado.
- **Prototype controls**, como en su HTML: una franja punteada arriba de la pantalla con el escenario (Update needed /
  Up to date / Not calculated / Update failed / Presented / Locked), "Simulate plan change" y "Fail next calculation".
  Es una herramienta de demo, no parte del producto: el escenario fuerza la estimación (`forzar`) aunque el estado del
  caso diga otra cosa, y así Update failed y Locked se pueden mostrar en cualquier caso. Antes de pasarlo a los devs
  hay que sacarlo o esconderlo detrás de un flag.

A validar con usuarios: si recepción entiende "Allowable amount" e "Insurance adjustment" sin ayuda (quizá un InfoTip en
el encabezado); si el aviso con confirmación suma o alcanza con el botón de la pantalla; y si Patient portion es el dato
que más buscan (hoy es el único resaltado).

Código: `clinical/{EstimateDetails,TreatmentPlanSection,TreatmentPlanList}.tsx`, `pages/ClinicalMode.tsx`,
`data/{estimaciones,treatment-plan}.ts`, `tests/treatment-plan.e2e.ts`.

## CON-4052: acciones del procedimiento y su consentimiento (2026-11-02)

**CON-4052** ([Procedure] Mostrar las acciones según el estado del procedimiento y el contexto del treatment plan), epic
CON-3939 (indexado en `treatments.md`); se cruza con **CON-2980** (Waiting for consent → Accepted). Julián pasó dos prototipos HTML: el primero
(*procedure_actions_prototype*) con los escenarios del ticket, y el que manda (*treatment_procedure_consent_revised*), con
los estados del consentimiento del procedimiento y cómo funciona el menú ⋮. Pidió el estado y el comportamiento, no el
diseño: todo va con las piezas del design system.

**El menú ⋮** (`accionesProcedimiento.tsx`: `accionesDe`, `ItemsAcciones`), el mismo en Unassigned, en las visitas de un
caso y en Procedures del Overview:

| Procedimiento \ plan | Suelto | Planning / Pending / Presented | Waiting for consent | Accepted / In progress | Discarded / Cancelled / Expired |
|---|---|---|---|---|---|
| Planned | Edit · Complete · Refer · Discard · Delete | Edit · Complete (bloqueado) · Refer · Discard · Delete | — | — | Edit |
| Pending | — | — | Edit · Start y Complete (bloqueados) · Refer · Discard | Edit · Start · Complete · Refer · Discard | Edit |
| In progress | Edit · Complete · Discontinue | | | Edit · Complete · Discontinue | Edit |
| Completed, Referred, Discarded, Discontinued | Edit | Edit | Edit | Edit | Edit |

- Lo incompatible con el estado **se oculta**; Start y Complete bloqueados por el plan **se ven deshabilitados** con el
  tooltip ("This procedure cannot be started or completed until its treatment case is accepted and its treatment plan is
  accepted or in progress."; Julián cambió el del ticket, que hablaba de "still being planned or waiting for consent").
  Se pueden enfocar con el teclado para leerlo; el texto también va como `aria-describedby`.
- **Presented es igual que Planning** (Julián, mismo día; faltaba en el prototipo): Edit · Complete bloqueado · Refer ·
  Discard · Delete, sin Start y sin columna Consent. Pending (Finish Planning) también.
- **Start no sale de Planned** (no existe esa transición) y **Delete sólo de Planned**. **Pending** no se elige a mano:
  aceptar el caso pasa sus Planned a Pending.
- El atajo de Complete de la fila (el ícono) sigue al menú: está si el menú lo ofrece y bloqueado si allá lo está.
- **Qué abre cada acción** (del prototipo): Edit, un drawer con las notas ("Only authorized fields can be edited. Notes do
  not change clinical state."), que en Procedures se ven en la columna Note; Refer, Discard y Discontinue, una
  confirmación "{Acción} procedure" con el cambio de estado; Delete suelto, "Are you sure you want to delete this
  procedure? This action cannot be undone."; Delete en un caso, el alcance con tres salidas: Cancel · **Delete from Tx**
  (sale del caso y va a Unassigned) · **Delete Procedure**. Como dice el diálogo, Delete no tiene Undo; el resto sí.

**El consentimiento del procedimiento** (no el del caso, que es el bloque de arriba):

1. **Cinco estados**, los del prototipo: *Not generated* (hay template, no hay documento), *Not sent* (generado, sin
   mandar), *Pending* (mandado, falta la firma), *Signed* y *Not required* (sin template). **Expired sale**: estaba desde
   2026-09-30 y el prototipo no lo tiene.
2. **La columna Consent** se ve con el caso aceptado (Waiting for consent, Accepted, In progress, y Cancelled o Expired si
   se había aceptado: `Caso.aceptado`). No en Planning, en Unassigned ni en un caso descartado. Está también en Procedures
   del Overview, con la misma regla.
3. **Tocarla**: con documento (Not sent, Pending, Signed) abre el **detalle del consentimiento** (`ConsentDetail`), que es
   lo que pidió Julián: la hoja de Consent Templates con los datos del paciente y, al lado, las firmas de paciente y
   provider con su botón Sign (drawer con las cinco afirmaciones, y la firma dibujada o escrita). Firmar ahí no repite el
   cambio clínico. Sin documento avisa: "No document yet. Start or Complete initiates consent management when allowed." o
   "No mapped template: no specific consent flow.". También se abre con `?case=…&consent=…` y desde el detalle de la fila.
4. **Start y Complete** (`useFlujoConsentimiento`, el mismo en las dos pantallas): Signed o Not required, se aplica
   directo; Pending, Consent required con *Continue without signed consent* y *View consent*; Not generated o Not sent,
   *Send consent and sign later* (genera si hace falta, manda y aplica). **Sign now** abre *Review and sign consent*
   ("Opening this view does not sign the document."; Back vuelve al diálogo) y, firmado, *Consent signed*: *Cancel clinical
   change* deja el procedimiento como estaba con el consentimiento ya firmado; *Confirm Start/Complete* lo aplica.
5. **El plan pasa a In progress** con el primer Start de un caso Accepted. Se suman los estados de caso **In progress**,
   **Cancelled** y **Expired**: Expire y Cancel ya no dejan el caso en Discarded.
6. **CON-2980**: firmar el consentimiento **del caso** (el bloque de arriba, las dos firmas) pasa un caso en Waiting for
   consent a Accepted. Firmar el de un procedimiento no lo cambia (así lo aclara el prototipo).

**Lo que cambia de antes** (2026-10-17): Waiting for consent ya no cuenta como aceptado (`CASO_LISTO` sale); el aviso
"Procedure cannot be updated" ya no aparece porque Start y Complete bloqueados no se pueden elegir (`avisarCasoNoListo`
queda sólo en su story); "Sign now" ya no es un aviso de "not available"; Rollback sale del menú de procedimientos
(CON-4052 no lo tiene); la columna Consent ahora también está en Procedures.

**Datos de ejemplo**: Endodontic Treatment (Accepted) tiene en la Visit 2 un Signed, un Pending a medio firmar (falta el
provider) y un Not generated; Restorative Plan (Waiting for consent) un Pending y un Not sent; Bridge Option un Not
required. En Procedures, D2950 y D2954 son los del caso aceptado.

**Anomalías / desvíos del prototipo**: el prototipo muestra la falla al mandar con un simulador; acá queda el lugar en el
diálogo (`error` en `ConsentRequiredDialog`, Alert danger) sin disparador. Complete en Treatment Plan sigue pasando
primero por *Complete Procedure* (las condiciones vinculadas, Figma 4122:250957): el prototipo dice que los flujos
existentes no se reproducen. El caso Cancelled del prototipo (con el caso aceptado) se arma cancelando un caso aceptado.

**A validar con usuarios:** si recepción entiende la diferencia entre el consentimiento del caso (arriba) y el de cada
procedimiento (la columna); si *Cancel clinical change* después de firmar se lee como "no pierdo la firma"; y si el
tooltip de Start/Complete bloqueados alcanza o conviene decir qué falta ("Waiting for the patient's consent").

Código: `clinical/{accionesProcedimiento,ConsentDetail,ConsentRequiredDialog,ConsentBlock,TreatmentPlanSection,ProblemList}.tsx`,
`data/{treatment-plan,clinical-mode}.ts`, `pages/ClinicalMode.tsx`; e2e en `tests/{treatment-plan,clinical-mode}.e2e.ts`.

### Cada escenario y cada consentimiento como en el prototipo, la hoja a todo el ancho (2026-11-02)

Julián pidió revisar cómo reacciona cada escenario del HTML (*Scenario* × *Specific procedure consent*). El HTML del link
de SharePoint es el mismo que pasó adjunto; ese link y el de red.dev piden login y no se pudieron abrir desde acá.

1. **Un procedimiento suelto también tiene consentimiento** (hay template): no se ve en Unassigned, pero su Complete pasa
   por Consent required como en un caso, sin la línea del caso. Los de ejemplo arrancan en Not generated (uno, Not
   required).
2. **Send consent and sign later** genera el documento si no había (Not generated → Not sent) y lo manda. Si el envío
   falla, el procedimiento no cambia y el diálogo lo dice ("The consent could not be sent. The procedure has not
   changed. Retry using the same document, or sign now."); se reintenta con el mismo documento.
3. **Sign now** genera el documento aunque después se vuelva con Back o se cancele.
4. **View consent** abre el documento en un drawer (*Procedure consent*: "Specific consent for this procedure — not the
   treatment case consent.", estado y firmas) y **Back** vuelve al diálogo con el pedido intacto. Antes salía a la
   pantalla del consentimiento y se perdía el Start o Complete.
5. ~~Prototype controls~~: sacados el mismo día (ver abajo); las variantes son datos reales.
6. **Escenarios que no tenían caso**: Night Guard Plan (In progress), Whitening Plan (Cancelled después de aceptar, con
   la columna Consent) y Sealant Plan (Expired antes de aceptar, sin columna). Los cerrados no van a las cards del
   Overview.
7. **La hoja a todo el ancho** en el detalle del consentimiento (pedido de Julián): las firmas pasan arriba, en dos
   tarjetas lado a lado, y el documento ocupa el ancho de la pantalla sin el tamaño de carta (`ConsentDocument
   ancho="completo"`). Al pie de la hoja quedan **las dos firmas estampadas**, la del paciente (*Patient / Legal
   Guardian*) y la del provider, cada una con el trazo dibujado (o el nombre escrito) sobre la línea y su fecha.

**Pendiente:** el diseño de la firma de red.dev (el consentimiento y *Patient signature*) no se pudo ver: el link pide
login. Lo armado sigue el patrón del documento; conviene ajustarlo con capturas.

**Fuera del prototipo:** en Procedures del Overview, los sueltos no tienen datos de consentimiento y cambian directo.

### Variantes reales, Complete como el HTML y la firma de red.dev (2026-11-02, 3ª vuelta)

Julián, con un video de red.dev (consentimiento del procedimiento, *Patient Signature* y *Provider Signature*):

1. **Sin Prototype controls.** Lo del HTML eran las variantes para ver, no controles de la pantalla: ahora son
   procedimientos reales. Endodontic Treatment (Accepted), Visit 2: Signed (D3330, derivado), Pending a medio firmar
   (D2950), Not generated (D2954), Not sent (D2750), Not required (D0230) y Signed (D9910, Start directo). Night Guard
   Plan (In progress): D1110 cuyo envío **falla** (`envioFalla`). Unassigned: D2330 Not generated, D2331 Not sent, D7210
   Pending, D4910 Signed y D1206 Not required (no se ven en la tabla; Complete actúa según cada uno).
2. **Complete como el HTML**: de la fila, del ícono o de la barra va directo al consentimiento. Sale el paso previo
   *Complete Procedure* (las condiciones vinculadas del Figma 4122:250957): `DialogoCompletar` queda sólo en su story.
3. **La pantalla del consentimiento, como la de red.dev** con el design system: arriba *Back*, "Procedure Consent - código
   nombre", el estado y *View PDF*; "Preparing document..." mientras carga; el documento a todo el ancho; abajo, fijos,
   *Patient Signature* (secundario, izquierda) y *Provider Signature* (primario, derecha). Firmada, cada uno queda como
   "Patient signed fecha". Las firmas quedan estampadas al pie de la hoja.
   - **Patient Signature** (drawer): Printed Name e Initials (se completan solas), *Adopt Signature* (el nombre en letra
     de firma con las iniciales) o *Draw*, la vista previa con *Delete*, el texto legal de red.dev y *Cancel* / *Adopt
     and Sign*. **Desvío:** el paciente marca primero las cinco afirmaciones en el documento (el template ya dice "must be
     completed before the patient can sign"); hasta entonces el botón está deshabilitado y lo explica.
   - **Provider Signature** (drawer): "For security and legal purposes, please re-enter your credentials to sign this
     document electronically.", Email y Password (con ojo); *Sign* deshabilitado hasta completar. En el mock, cualquier
     credencial firma.
   - *Sign now* (Consent required) usa la misma firma con las afirmaciones arriba y *Back* / *Record signature*.
   - Salen "Send to patient" / "Send again" y los avisos de la pantalla: red.dev no los tiene; se manda desde el flujo.
4. **Los consentimientos no van uno abajo del otro**: van en el **historial** del bloque del caso (el reloj). El
   drawer *Consent history* lista primero cada *Procedure Consent* del caso con su estado y sus firmas (los que tienen
   documento se abren) y después las versiones del consentimiento del caso.
5. **Tooltip de la columna Consent**, como en red.dev: "Procedure Consent - código nombre" y "Open to present it to the
   patient for signature" (o, sin documento, lo que pasa). El detalle de la fila nombra el consentimiento igual.

A validar con usuarios: si el provider espera volver a poner la contraseña en cada firma o una vez por sesión; si
recepción entiende que el paciente marca las afirmaciones en el documento antes de *Patient Signature*.

## CON-4052: Sign now lleva al consentimiento, firma en pop up e historial único (4ª vuelta, 2026-11-02)

Pedido de Julián tras ver la 3ª vuelta. Jira: CON-4052 (con CON-2980 para el paso a Accepted).

1. **Sign now ya no abre un drawer**: genera el documento si no había y lleva a la pantalla del consentimiento del
   procedimiento (`ConsentDetail`). Arriba, un `Alert` dice "Sign to start/complete this procedure": con las dos firmas
   aparece *Consent signed* (Cancel clinical change / Confirm Start|Complete) y recién ahí cambia el procedimiento. Back
   deja el procedimiento como estaba (el consentimiento conserva lo firmado). Si el pedido era de varios, se firman de a
   uno y al terminar el último se confirma el cambio de todos (`pendiente.cola` en `TreatmentPlanSection`).
   Desde Procedures (`ProblemList`), Sign now cambia a la pestaña Treatment Plan con `DestinoClinico.accion`; el cambio se
   confirma ahí, en el procedimiento del caso (las dos listas del mock tienen estado propio: Procedures no se actualiza).
2. **Firmar abre un pop up** (`ui/dialog`), no un drawer: en red.dev esos botones llevan a un portal de firma, así que
   la ventana lleva la cinta "Secure signing portal". Es una excepción deliberada a "pop ups = drawer" porque representa
   otra página. Mismo contenido que antes (Patient Signature: Printed Name, Initials, Adopt Signature / Draw, preview,
   texto legal; Provider Signature: email y contraseña de nuevo); pie con dos botones del mismo ancho. El drawer de
   "Review and sign consent" con las cinco afirmaciones desapareció: las afirmaciones se marcan en el documento.
3. **Historial único** (el reloj): una sola línea de tiempo con el consentimiento del caso y el de cada procedimiento,
   lo más nuevo arriba; lo que espera una firma no tiene fecha y va primero (punto ámbar). Cada ítem dice el evento, el
   documento ("Case consent v3" o "Procedure Consent - D2950 …", este último abre su pantalla) y fecha. No son el mismo
   documento (el del caso se firma para aceptar el plan; el del procedimiento, para actuar sobre él), por eso se integran
   en vez de sacar uno. El bloque de la pantalla sigue mostrando sólo el último consentimiento del caso.

**Para validar con usuarios:** si el pop up de firma en el consultorio se entiende como "portal" (¿se espera que el
paciente firme en otra pantalla/tablet?), y si el historial mezclado se lee bien o conviene un filtro Case / Procedure.

## CON-4052: el bloque Informed Consent con las firmas en su propia fila (2026-11-02)

Pedido de Julián sobre una captura: con el bloque angosto los íconos (historial y menú) caían a una segunda fila a la
izquierda. Ahora la fila de arriba es el título con su estado y, a la derecha, los dos íconos; **Patient y Provider van
abajo, en una fila propia**, con el nombre siempre visible (antes se escondía con la card angosta). Mismo orden en
escritorio y celular; en celular el título se parte en líneas y las firmas quedan una debajo de la otra.

## CON-4052: una sola card de Informed Consent por caso (2026-11-02)

Julián mostró en video que, al pasar de un caso a otro en el rail, el bloque Informed Consent se apilaba (una card más
cada vez). Causa: el bloque y `VistaCaso` eran hermanos con la misma `key` (el id del caso) y React duplicaba el
bloque. Ahora el bloque lleva `key="consentimiento-<id>"`. Siempre hay **una sola** card de Informed Consent arriba del
caso; todo lo demás (versiones del caso y consentimientos de cada procedimiento) vive en **Consent history** (el reloj).
Planning, Pending y Presented siguen sin card. e2e: "al cambiar de caso queda una sola card de Informed Consent".

## CON-4052: Back del consentimiento vuelve al Consent history (2026-11-02)

Si el consentimiento de un procedimiento se abrió desde el Consent history (el reloj), **Back vuelve a ese drawer** y no
al caso. El estado del historial (`historial`) vive en `TreatmentPlanSection` y `ConsentBlock` lo recibe controlado
(`historial` / `onHistorial`), porque el bloque se desmonta mientras se ve el consentimiento. Desde la columna Consent o
Sign now, Back sigue volviendo al caso. e2e: "el historial del caso lista los consentimientos de cada procedimiento".

## CON-4119: los estados de la columna Consent (2026-11-11)

**CON-4119** ([Patient Procedures] Visualización y estados de la columna Consent en el listado de procedimientos), epic
CON-3118 ([Consent] Procedure). Pedido de Julián: actualizar los valores del consentimiento del procedimiento en
Treatment Plan por los de la historia. Reemplaza los cinco estados del prototipo de CON-4052 (punto 1 de 2026-11-02).

| Antes (prototipo CON-4052) | Ahora (CON-4119) | Tooltip (tal cual la historia) | Color |
|---|---|---|---|
| Not required | **Not required** | sin tooltip | gris atenuado (`ink-faint`) |
| Not generated | **Not generated** | "Consent will be automatically generated 24h before the appointment, or when starting/completing the procedure." | gris (`ink-muted`) |
| Not sent | — (se ve como Not generated) | | |
| Pending | **Requested** | "Consent requested, pending patient signature." | ámbar (`warn-fg`) |
| Signed | **Accepted** | "Consent signed and accepted." | verde (`dash-ok-fg`) |
| — | **Rejected** | "Consent rejected by patient." | rojo (`dash-bad-fg`) |
| — | **Discarded** | "Consent discarded." | gris (`ink-muted`), ícono de anulado |

1. **Not sent desaparece.** Era "generado, sin mandar": el `PENDING` interno de la historia (regla 2), que no se le
   muestra al usuario. Mientras el documento no salió al paciente, la columna sigue en *Not generated*. Por eso, si el
   envío falla (*Send consent and sign later* en Night Guard Plan, D1110), el consentimiento queda *Not generated* y no
   *Not sent*; el diálogo sigue diciendo que no se pudo mandar.
2. **Se mantiene el formato de la columna** (ícono + palabra en el color del estado, no una pill con borde): es la pieza
   que ya estaba y la historia pide el estado y el color, no un componente nuevo. El encabezado del detalle sí usa `Pill`
   (`warning`, `success`, `danger`, `neutral`).
3. **Tooltip**: primero el nombre del consentimiento ("Procedure Consent - código nombre", como en red.dev) y abajo el
   texto de la historia. Reemplaza a "Open to present it to the patient for signature" y a los dos textos del prototipo
   ("No document yet…", "No mapped template…"). *Not required* no tiene tooltip ni nada que abrir: pasa a ser texto, no
   botón. En pantallas táctiles no hay hover: tocar *Not generated* muestra el mismo texto como aviso.
4. **Qué abre cada uno**: *Requested* y *Accepted*, el detalle del consentimiento como antes. *Rejected* y *Discarded*
   también abren el documento, pero **ya no se firma**: en el pie, en lugar de los dos botones, queda el texto del
   estado + "It can no longer be signed." y las afirmaciones no se pueden marcar (`consentimientoCerrado`).
5. **Start y Complete** (regla 4 de la historia, con CON-4052): *Accepted* o *Not required*, directo; *Requested*,
   Consent required con *Continue without signed consent*; *Not generated*, *Rejected* o *Discarded* (`sinPedir`),
   Consent required con *Send consent and sign later*, que genera un documento nuevo y lo deja *Requested*. *Sign now*
   también lo deja *Requested* (generado y esperando la firma, asistida) aunque después se vuelva con Back.
6. **Firmas**: con una firma sigue *Requested*; con las dos, *Accepted* (`estadoTrasFirma`).
7. **Consent history** (el reloj): un consentimiento rechazado o descartado aparece como "Rejected by patient" o
   "Discarded" (punto gris), no como "Not signed yet".
8. **Datos de ejemplo**: Endodontic Treatment, Visit 2: Accepted (D3330), Requested a medio firmar (D2950), Not
   generated (D2954), **Rejected** (D2750), Not required (D0230) y Accepted (D9910). Restorative Plan: Requested y Not
   generated. Whitening Plan (cancelado después de aceptar): los dos **Discarded**. Unassigned (no se ven en la tabla):
   Not generated, Rejected, Requested, Accepted y Not required.

**No cambia:** el consentimiento **del caso** (el bloque Informed Consent de arriba: Pending / Signed / Expired) es otra
entidad y la historia no lo nombra. Tampoco cambia dónde se ve la columna (ver anomalías).

**Anomalías / lo que la historia deja abierto:**

- La historia dice que la columna aplica igual en **Unassigned Items**; acá Unassigned y los casos sin aceptar siguen
  **sin columna Consent** (decisión de Julián del 2026-10-06 y prototipo de CON-4052). Falta definir cuál manda.
- La regla 3 ("Tooltip informativo") está vacía en Jira.
- La historia admite "`Not required` (o `—`)": se dejó la palabra, que dice más que el guion.
- No hay historia para lo que pasa al tocar **Start / Complete con el consentimiento Rejected o Discarded**: se resolvió
  pidiendo uno nuevo (punto 5). CON-2928 habla del rechazo del consentimiento del caso, no del de un procedimiento.
- La "actualización reactiva" (criterio 4) no se puede mostrar sin backend: en el mock el estado cambia al mandar o firmar.
- *Not required* en `ink-faint` es el "gris atenuado" que pide la historia, pero su contraste sobre blanco es bajo
  (≈2,6:1): conviene revisar si alcanza o si pasa a `ink-muted` como Discarded.

**A validar con usuarios:** si recepción distingue *Not generated* de *Not required* sin leer el tooltip; si *Requested*
se entiende como "falta que firme el paciente" (antes decía Pending); y qué esperan hacer frente a un *Rejected* (¿volver
a pedirlo, o hablar con el paciente antes?).

Código: `data/treatment-plan.ts` (`ConsentProcedimiento`, `AYUDA_CONSENTIMIENTO`; salen `SIN_DOCUMENTO` y
`AVISO_CONSENTIMIENTO`), `clinical/{ConsentDetail,ConsentRequiredDialog,ConsentBlock,TreatmentPlanSection,ProblemList,RecordDetail}.tsx`;
e2e en `tests/treatment-plan.e2e.ts` ("la columna Consent muestra los estados de CON-4119").

## CON-4144 · El encuentro de CON-1612 y textos de red.dev (2026-11-13)

Comparativa con red.dev del Overview, la barra y la Problem List (ticket CON-4144, asignado a Abril). El layout ya está
decidido (odontograma de DentAssmt, tabla flotante, botoneras Exams/Records): se deja como está.

1. **Botón del encuentro con los estados de CON-1612**. Antes el pill alternaba *Start / Pause Enconter*. Su menú tenía
   *End encounter*, *Discard encounter* y *Encounter settings*: dos no hacían nada y ninguno sale de Jira. Además, el menú
   no se veía, porque la barra tiene `overflow-x-auto` y lo cortaba. Ahora:
   - Sin empezar: "Start Enconter", sin menú: no hay nada que pausar ni cerrar.
   - En curso: "Complete Encounter" (lo cierra y ofrece firmar la Clinical Note, como hacía End encounter). El menú
     ofrece *Pause Encounter* y *Discharge Patient*, como red.dev.
   - En pausa (*On hold*): pill ámbar "Pending Encounter", el mismo de la ficha. Al tocarlo se retoma; el menú ofrece
     *Complete Encounter* y *Discharge Patient*.
   - El menú es el `DropdownMenu` del sistema: se abre en un portal y ya no lo corta la barra.
   - `ClinicalTopBar` pasa de `encuentro: boolean` a `EstadoEncuentro` ('sinEmpezar' | 'enCurso' | 'enPausa').
2. **"Mark as…"**: el 2026-10-05 se copió "Mark As" de red.dev, que hoy dice "Mark as". Se alinea en el menú de la
   Problem List y en las acciones de los exámenes (`dental/actions.ts`).
3. **"Rows per page:"** en la Problem List, Procedures, Lab Order y los registros. Decían "Show:", distinto de la tabla del
   sistema y de red.dev. Settings › Accounts decía "Mostrar:", en castellano: también pasa a "Rows per page:".
4. **A definir con Julián**:
   - Los nombres de los exámenes. red.dev usa Vitals, ROS, Physical, Extraoral, Intraoral, Dental assessment, Periodontal
     y Radiographic; nosotros, los del Figma (Ros, BMI, ATM/O-F, Intra Oral, DentAssmt, Radiography…).
   - Un solo formato de fecha. Clinical Mode usa día/mes; red.dev y el Ledger, mes/día; Documents, "Oct 27, 2026".
   - "Start Enconter" sin la u, que viene del Figma.
5. **A validar con usuarios**: si en recepción se entiende la pausa por el color ámbar, y si "Discharge Patient" en el
   mismo menú que Pause se toca por error (hoy no pide confirmación, como en red.dev).

### Decisiones de Julián sobre CON-4144 (2026-11-13)

1. **Exámenes con los nombres y el orden de red.dev**: Vitals, ROS, Physical, Extraoral, Intraoral, Dental assessment,
   Periodontal y Radiographic. Salen BMI y ATM/O-F: no existen en red.dev (el BMI está adentro de Vitals, en
   Anthropometry) y acá eran pestañas en construcción. El rótulo del área de tratamiento de los Edit también pasa a
   Intraoral / Extraoral. La columna *Exam* de la Problem List sigue con los nombres de los datos (Dental Assessment,
   Radiography).
2. **Un solo formato de fecha: MM/DD/YYYY, como red.dev**, en toda la app: tablas, detalles, cards, campos de fecha
   (DatePicker de formulario, `formatMDY` en `lib/fecha.ts`) y el campo tipeado de Insurance ("MM / DD / YY"). Los datos se
   pasaron a ese formato y `ordenFecha` (Treatment Plan) lo lee así.
   - Quedan en texto los títulos y las frases: el saludo ("Thursday - November 13, 2026"), el selector de la barra del
     Dashboard ("Feb 28, 2026"), la semana de la agenda, "moved to Mar 3" en los avisos y las fechas relativas de
     Notifications.
   - Las claves internas dd-mm-aaaa de la agenda y del Dashboard no cambian: no se muestran.
3. **"Start Encounter"** con la u, en la barra de Clinical Mode, en la ficha y en el popup del paciente del Dashboard.
4. **El botón de la ficha, igual que el de Clinical Mode**, con el mismo estado (`lib/encuentro.ts`, `useEstadoEncuentro`).
   - Sin empezar: *Start Encounter*, que además lleva a Clinical Mode (CON-2994).
   - En curso: *Complete Encounter*, que ofrece firmar la Clinical Note; si se deja para después, queda *Pending
     Signature*. El menú ofrece *Pause Encounter* y *Discharge Patient* (`OpcionesEncuentro`).
   - En pausa: *Pending Encounter* en ámbar.
   - Antes el menú de la ficha elegía directamente entre los dos estados del Figma.

## 2026-11-16 · CON-2212 · CON-2321 · CON-2214 · CON-1397 · Figma: segunda a cuarta tanda de Clinical Mode

Documentación en el archivo de flujos (`scripts/figma/flujos/clinical-mode-2.mjs`, `-3` y `-4`):

- **Capturado de la app:** Treatment — Workflows (7), Radiography — Gallery, Upload & Viewer (3), Lab Order — List & Actions
  (4), Dental Assessment — Tooth & Findings (7) y New Procedure (4: planned, filtro por área, existing y superficies).
- **Adecuado desde Platform Design** (en la app son placeholders «Planned»): Prescription (lista y New Prescription),
  Referral (lista y create), ROS · General y Treatment History. Se capturó el shell real de la app con la pestaña activa y la
  guía del flujo; el placeholder se reemplazó por el contenido del diseño, estirado a Fill container, con instancias,
  variables y estilos del design system. Los frames crudos quedaron en 🧪 Pruebas (`· original Platform Design`).
- **Decisión:** Physical sigue sin diseño en Platform Design; Patient Summary tampoco. Treatment History y Clinical Note
  son pestañas del diseño que la app no tiene todavía (Treatment History se muestra sobre el shell con la pestaña
  renombrada).

Anomalías del diseño (se copian tal cual y se anotan):

1. "Overwiev" y "Start Enconter" en la barra de Clinical Mode.
2. Referral · Create lleva el link **New Laboratory** (copiado de Lab Order) y dos campos de búsqueda con el mismo valor "I".
3. New Prescription: dos campos "Strength" (valor y unidad), "Frecuency" mal escrito, y Duration con una lista que dice "mg".
4. La columna Actions de la lista de Prescription son tres círculos vacíos (sin íconos definidos).
5. El pie de ROS dice "Showing 9 active prescriptions" y "View History" (copiado de Prescription).
6. Lab Order: el botón dice "New Prescription" y el pie "active prescriptions" (ya anotado, #85).
7. ROS · General: el interruptor "Negative" va en rojo, el mismo rojo de error; conviene validar si un síntoma negativo es una alerta.

### Dental Assessment: cierre (2026-11-16, `clinical-mode-5.mjs`)

- Se suman Edit Condition de región, Problem List · Procedures, Procedure actions y los drawers Edit / Complete / Discontinue
  procedure. Con `clinical-mode-3.mjs` queda cubierto Tooth information, el menú del hallazgo, Edit Finding, Discard, Delete,
  New Procedure (planned, existing, superficies) y el filtro por área.
- **Sin equivalente en la app:** los pop-ups de New Condition (8) de Platform Design: la app resuelve el alta con el drawer de
  dos pasos (Procedure · Descriptors).
- **Para después (decisión de Julián):** Treatment Workflow (detalle y Clinical Note) y Workflow Set Up: hay que pegarlos en el
  archivo de flujos.

## Vitals: el aviso de presión con `ui/alert` (2026-11-18)

Sin historia de Jira (devolución de diseño de Abril Viola). El aviso azul que aparece cuando un valor se va del rango
pasa de franja con barra a la izquierda a `Alert` tono info, el aviso único de la app (detalle en patients.md,
2026-11-18). El texto sigue siendo el del Figma, que no habla de presión (anomalía ya anotada en `AVISO_PRESION`).

## CON-2643 · El detalle de la Lab Order desde Pending Task (2026-11-20)

**Jira:** CON-2643 (CA5: Complete this Task lleva al detalle), CON-2641. De los videos de red.dev de Julián; sólo lo que
muestran.

- `?tab=<pestaña>` abre Clinical Mode en esa pestaña y `?task=<id>` busca la tarea (`buscarTarea`). En Lab Order entra
  directo a `LabOrderDetail`: *LAB ORDER* con *Delivery Expiration Date\**, estado, PDF y el ⋮ de la tarea (sin Edit);
  **General Information** (Receiving Laboratory\* + New Laboratory, ASAP, Procedures, Teeth & Surface) y **Details**
  (Dental Work Requested\*, Special Instructions, Attachments), cada una con su ícono; *Cancel* y *Save* abajo.
- **Teeth & Surface** como red.dev: primero *Initialize permanent dentition* / *Initialize primary dentition*; elegida,
  quedan *Permanent* / *Primary*, los dientes, la rueda de superficies y *Toggle all* / *Apply to unset*. La dentición se
  puede cambiar aun en sólo lectura (en red.dev también); lo demás no.
- **Decisión:** los dientes son botones numerados por arcada (Maxillary 1–16, Mandibular 32–17; en Primary A–J y T–K)
  en vez del odontograma dibujado de red.dev (`react-advanced-odontogram` no admite dos instancias montadas). Cada diente
  es un botón de 24px con `aria-pressed`. La rueda es la de New Procedure (`SurfaceWheel`).
- **Sin encuentro abierto:** `ui/alert` warning *Read-only mode* con el texto de red.dev, todo deshabilitado y *Save*
  apagado; *Cancel* vuelve a la lista. Con el encuentro abierto *Save* valida los tres obligatorios.
- *New Laboratory* avisa que no está en esta versión (el modal del Figma 4070:148911 sigue pendiente). Cancelar o borrar
  la orden desde su ⋮ vuelve a la lista. La orden de la tarea no está en la tabla de Lab Order (mocks distintos).
- *Back to History* de la Clinical Note (dashboard.md, 2026-11-20) abre esta pantalla en Patient Summary.

## Tablas estandarizadas v2 (2026-11-24)

Pie, alineación, fechas y avatar con las reglas comunes de todas las tablas: ver `design-reference/figma/README.md`
(*Tablas estandarizadas v2*, 2026-11-24).

## El consentimiento en el visor de documentos (2026-11-24)

Propuesta A (regla en `figma/README.md` › *Visor de documentos*).

1. **Procedure consent** (`ConsentDetail`) deja de abrirse dentro del módulo: va en `ui/document-viewer`, a pantalla
   completa. Arriba Back, el paciente, el título, el estado y View PDF.
   - El aviso *Sign to start/complete this procedure* pasa del `Alert` a la línea de aviso (`info`).
   - *Rejected/Discarded* (… *It can no longer be signed.*) pasa al aviso (`neutral`).
   - Con las dos firmas hechas, la barra de abajo desaparece y el aviso dice *Patient signed … · Provider signed …*.
2. **View consent** desde Consent required (`VistaConsentimiento`) deja el drawer: el mismo visor con *Back* (vuelve
   al diálogo), el estado y el aviso de quién firmó.

## La hoja unificada del consentimiento (2026-11-24)

Propuesta B (regla en `figma/README.md` › *Hoja de documentos*). `ConsentDocument` usa `ui/document-sheet`: membrete de
la clínica (antes el avatar *LA* y *Los Angeles, Dental Clinic*), resumen en tres columnas (antes la grilla de 2×2 con
íconos), secciones numeradas y firmas con *Signed electronically · fecha* o *Pending signature*. Se va la prop `ancho`.

## CON-2218 · CON-2285 · CON-3904 · Lab Order: rediseño del detalle y New Laboratory (2026-11-25)

**Jira:** CON-2218 (Edit Lab Order: sólo en Pending, "The lab order has been successfully updated."), CON-2285 (New
Laboratory), CON-3904 (procedimientos elegibles), CON-2643. Pedido de Julián con un video de red.dev (Pending Tasks →
Lab Order → ⋮ → Edit): cambiar el diseño de la parte de Clinical Mode respetando lo que hace.

Lo que el video muestra y se respeta: *LAB ORDER* con *Delivery Expiration Date\**, estado, PDF y ⋮; Receiving
Laboratory\* con ✕ y *New Laboratory*; ASAP; Procedures con buscador, **Filter** y la card del procedimiento vinculado
(chip del caso, estado, código - descripción, *Created date* y el tacho); Teeth & Surface con Permanent / Primary y las
arcadas; Details (Dental Work Requested\*, Special Instructions, Attachments); Cancel y Save fijos abajo; el modal New
Laboratory.

Decisiones:

1. **Cabecera liviana:** ícono, *LAB ORDER* y el estado juntos a la izquierda; PDF y ⋮ a la derecha. La fecha deja la
   cabecera y pasa a *General information* junto a ASAP: las dos dicen para cuándo es, y el error quedaba suelto lejos
   del campo.
2. **Dos columnas 3:2 por tarea:** a la izquierda lo que define la orden (laboratorio, plazo, procedimientos) y, en su
   propia card, *Teeth & surface*, que antes quedaba apretado debajo; a la derecha *Details*, que en desktop queda
   pegajosa (sticky) mientras se marcan dientes. En celular, una columna.
3. **Procedimientos:** `ui/search-picker` (busca al escribir, vincula) + `FilterMenu` por Status y Treatment case. Sólo
   aparecen los elegibles de CON-3904: sueltos en Planned o Pending / In progress de un caso aceptado (Waiting for
   consent, Accepted, In progress). Los vinculados, en cards internas con el chip del caso y la pill del estado
   (`TONO_PROCEDIMIENTO`). Mensajes de Jira: *No procedures match your search.* / *No eligible procedures available.*
   La orden arranca con uno (`PROCEDIMIENTOS_ORDEN`), como en el video. `SearchPicker` suma `disabled`.
4. **Arcadas en U (`dental/DentalArch`):** los mismos botones numerados (24px, `aria-pressed`) dispuestos como en el
   odontograma de red.dev: Maxillary 1–16 arriba, Mandibular 32–17 abajo (A–J y T–K en Primary), el ancho se ajusta al
   contenedor. Un punto marca los dientes que ya tienen superficies. Sigue sin la librería (no admite dos instancias).
   Permanent / Primary pasan a un control segmentado en el título de la card; antes de elegir, los dos *Initialize…*.
5. **Adjuntos:** zona compacta que acepta arrastrar y soltar de verdad, valida PDF/JPG/PNG hasta 10MB (*Only PDF, JPG or
   PNG files up to 10MB.*) y lista los archivos con su ✕.
6. **Cancel / Save en una barra flotante** (`sticky bottom-4`), siempre a la vista como en red.dev; en celular, del mismo
   ancho.
7. **Sólo lectura:** sin encuentro, el aviso de siempre; con encuentro pero la orden fuera de Pending, el de CON-2218
   (*This lab order cannot be edited because it is not in an editable state.*).
8. **New Laboratory = drawer con pasos** (regla de pop ups), `NewLaboratoryDrawer`: *General* (Organization name\*,
   Email\*), *Contact* (Country code\*, Area code (3 digits)\*, Number (7 digits)\*), *Address* (Address line 1\*, Address
   line 2, Country\*, State\*, City\*, ZIP code\*) y *Credentials* (opcional; *No credentials added yet.*, de a varias sin
   repetir tipo: Credential type\*, Number\*, Expiration date). Valida email, 3 y 7 dígitos y que no exista el mismo
   nombre + email. Al guardar avisa *The laboratory has been successfully created.*, se suma a la lista y queda elegido.

Anomalías / supuestos:

- El modal de red.dev pone Contact information adentro de General; acá es su paso. Placeholder del email genérico
  (`laboratory@example.com`) en vez de una dirección de hotmail. Los laboratorios viven en `data/laboratorios.ts` (de #190).
- Los tipos de credencial de CON-2285 están "en el documento" que no tenemos: se usan los de Employees (License, DEA,
  NPI) y License pide vencimiento. Validar con Julián.
- CON-2285 pide el aviso *Uncompleted fields…*; se mantiene el error por campo de la app (CON-4161).
- Cancel con cambios sin guardar no pregunta (tampoco en red.dev): propuesta aparte.

### Sin íconos y la tabla como las demás (2026-11-25, 2ª vuelta)

Pedido de Julián al revisar el link de prueba:

- **Fuera los íconos decorativos** del detalle: el del encabezado (*LAB ORDER*), los de los títulos de las cards
  (General information, Teeth & surface, Details), los de Permanent / Primary e *Initialize…* y el del adjunto. Quedan
  sólo los de acción (PDF, ⋮, ✕, tacho, *+ New laboratory*, buscador y Filter).
- **El listado de Lab Order alineado a las tablas generales** (Employees, Patients, Documents): sin la card blanca
  alrededor, la tabla sobre el fondo; *Search lab orders* con su botón **Search** (`SettingsSearch`, el
  `SearchInput` + `SearchButton` de toda tabla con buscador al inicio), Filter al lado y los botones en 32px (md), la
  misma altura que el buscador. Encabezados de fecha como el resto: *Last update* (Documents) y *Created date* (regla 3
  de *Tablas estandarizadas v2*); *Expiration date* queda. Vacío con búsqueda: *No lab orders found*.
- Se mergeó `main` (#190): los laboratorios y las arcadas salen de `data/laboratorios.ts`; New Laboratory arma el
  teléfono y la dirección con el formato de ese archivo, así el PDF los muestra.

## CON-4153 · End Encounter: los procedimientos del turno y sus fases (2026-11-25)

Epic **CON-4153** (Ejecución y trazabilidad de procedimientos por encounter) con sus cinco historias: **CON-4154** (HU 1,
Start procedure y fases intermedias), **CON-4155** (HU 2, Complete procedure y el cierre anticipado), **CON-4156** (HU 3,
el menú ⋮ por secciones), **CON-4157** (HU 4, el drawer End Encounter) y **CON-4158** (HU 5, el historial de ejecución).
La planificación de las fases viene de **CON-3942**. Julián pasó el prototipo *end_encounter_sequential_phases*; Abril
había comentado en el epic los cinco casos para probar.

**El flujo.** *Complete encounter* (el pill de la barra, CON-1612) ya no cierra directo: si el turno tiene procedimientos
previstos abre el drawer **End Encounter**; sin procedimientos sigue el cierre de antes. En el drawer:

- Arriba una línea de qué se hace ("Record the phases or procedures done in this appointment…") y el contexto del turno:
  fecha, hora, provider y cuántos procedimientos. No es bajada del título (la regla del drawer sigue): es contenido.
- *Appointment procedures* con `ui/list-group`: cada fila con código y nombre, la pill del estado (`TONO_PROCEDIMIENTO`),
  pieza/superficie o área y la fase ("Next: phase 2 of 4", "Single phase", "Last completed: phase 2 of 4 · Completed
  early"); debajo, en verde, lo registrado **en este encuentro** ("Phase 3 completed", "Procedure completed"). A la
  derecha la acción que toca y el ⋮ (`RowActionsMenu`), siempre visible.
- Pie con *Back* y *End Encounter*. Back y la X no cierran el encuentro ni deshacen nada; End Encounter lo cierra aunque
  queden fases sin registrar y sigue con la Clinical Note de siempre (*Remind me later* / *Review and sign*).

**La acción de la fila** (`accionPrincipal`, `lib/ejecucion.ts`), siempre la **siguiente fase sin registrar** (ejecución
lineal de CON-4154, no la fase agendada): una sola fase → *Complete procedure*; la 1 de varias → *Start procedure*
(Started, el procedimiento pasa a In progress); una intermedia → *Complete phase N* (Continued); la última → *Complete
procedure* (Finished, Completed). Registrar una fase deja disponible la siguiente **en el mismo encuentro** (lo que agrega
el prototipo *sequential phases*): se pueden hacer varias en una visita.

**El ⋮** (CON-4156), en tres secciones: *Phase* (la siguiente fase, si no es la última), *Procedure* (*Complete
procedure*, o *Complete procedure at phase N* si hoy ya se registró una; *Discontinue* si está In progress; *Refer* y
*Discard* si está Pending) y *Actions* (*Edit* y *View execution history*). En un estado final sólo quedan las de
*Actions*. Refer, Discard, Discontinue y Edit reusan los diálogos de CON-4052 (`DialogoCambioEstado`, `DialogoEditar`).

**Completar antes de la última fase** (CON-4155) pide *Complete procedure?* con el texto del ticket ("This procedure has
remaining planned phases…") y en qué fase termina. La fase de cierre es la última registrada hoy (esa misma fila pasa a
Finished, no se duplica) o, si hoy no se hizo ninguna, la siguiente. No se crean fases futuras ni se toca el plan.
Cancel no cambia nada.

**View execution history** (CON-4158) abre un drawer encima: el procedimiento con su estado y la tabla *Phase ·
Encounter date · Procedure event · Clinical note*, sólo con lo registrado y de menor a mayor. La nota: *View clinical
note* (con la pill *Unsigned* si no se firmó), *No clinical note* o *Access restricted*. *View clinical note* abre la
nota del encuentro en el visor de documentos (`ui/document-viewer` + `VistaDocumento`) y *Back to history* vuelve. Los
dos estados vacíos del ticket ("No phases have been recorded…" y el de Completed sin historial). Cerrar el encuentro
pasa lo de hoy a un encuentro con su fecha y la nota sin firmar; *Review and sign* la deja firmada (`onFirmar` de
`ClinicalNoteDialog`).

**Datos de ejemplo** (`data/ejecucion.ts`), los cinco casos del prototipo con códigos reales: D2391 (una fase, Pending),
D3330 (fase 2 de 4), D2750 (la 3 ya registrada hoy desde el Treatment Plan, aparece confirmada), D5110 (la última de 4)
y D6010 (tres fases sin empezar). Los encuentros anteriores cubren los cuatro estados de la nota. El estado vive fuera de
React (como `lib/encuentro`), así que lo hecho se conserva al cerrar y reabrir el drawer.

**Desvíos del prototipo y anomalías**

1. **Rótulos de Jira, no del HTML**: el HTML dice "Complete phase 1 / start procedure" y "Complete phase N / procedure";
   el ticket (HU 3 y HU 4) y el comentario de Abril, *Start procedure* y *Complete procedure*. Manda Jira.
2. El HTML pone "Dr. Julio Perez" como provider del turno: Julio Perez es el paciente. Acá va el provider de los datos.
3. El historial en el HTML es un modal de una línea; CON-4158 pide drawer con tabla: se siguió el ticket.
4. El pill de la barra sigue diciendo *Complete encounter* (CON-1612, red.dev); el ticket lo llama *End Encounter*. El
   drawer y su botón sí dicen End Encounter.
5. Los procedimientos del drawer tienen el consentimiento resuelto ("Execution permission granted" en el prototipo): no
   pasan por `useFlujoConsentimiento`. Con uno pendiente habría que encadenarlo (CON-4154 lo pide).
6. El fallo al cerrar ("el encounter permanece abierto") no tiene disparador en el mock.

**Pendiente (a definir con Julián)**

- **HU 3 en el Treatment Plan**: las acciones de fase en el ⋮ de las visitas del caso. Hoy el Treatment Plan no tiene
  fases (los datos de `treatment-plan.ts` no repiten procedimientos entre visitas) y el drawer usa su propia lista; unirlos
  es el próximo paso.
- **La ficha del paciente**: su *Complete encounter* sigue cerrando directo. El drawer va sólo en Clinical Mode, que es
  "la pantalla clínica actual" del ticket y la única con los procedimientos del turno.

**A validar con usuarios**: si "Next: phase 2 of 4" junto a "Phase 1 completed" se entiende como "ya hice una, sigue
otra"; si el odontólogo espera que *End Encounter* avise de procedimientos sin tocar (hoy no avisa, como pide el ticket);
y si *Complete procedure at phase N* en el ⋮ se distingue bien de la acción de la fila.

Código: `clinical/EndEncounterDrawer.tsx`, `lib/ejecucion.ts`, `data/ejecucion.ts`, `clinical/ClinicalTopBar.tsx`; e2e en
`tests/clinical-mode.e2e.ts` (y el de Pending signature en `tests/patient-dashboard.e2e.ts`, que ahora pasa por el drawer).

## CON-2321 · CON-2322 · CON-2323 · CON-2394 · El detalle de la Referral desde Pending Task (2026-11-25)

**Jira:** CON-2321 (Referral, epic), CON-2322 (New Referral: campos y validaciones), CON-2323 (Edit: sólo Pending),
CON-2394 (Request), CON-2391 (Cancel), CON-3436 (Delete), CON-2610 (autocomplete de Referral Provider y New Provider),
CON-3128 (especialidad del provider), CON-2643 (Complete this task lleva al detalle). Video de red.dev de Julián: Pending
Task → Referrals → *Complete this task* abre Clinical Mode en la pestaña Referral con la derivación cargada. Julián pidió
el mismo comportamiento pero **con el diseño de Clinical Mode**, no el de red.dev.

- **Qué se copió de red.dev (contenido):** título *Referral*, estado, ⋮; *General information* (Referral provider\* +
  New provider, Procedures, ASAP, Mandatory to continue treatment) y *Details* (Referral note\*, Attachments con la lista
  de archivos); *Cancel* y *Save*; *Read-only mode* sin encuentro abierto. New provider con los campos del modal de
  red.dev (nombre, apellido, email, notas, credenciales, dirección y teléfono).
- **Qué cambió (diseño):** red.dev arma dos cajas sueltas con un ícono en cada título, una barra de título aparte y los
  botones flotando debajo. Acá va **una sola card** (`TARJETA_PANEL`) como el panel de Treatment plan: encabezado con
  título, estado y ⋮ (más una línea con paciente, Register y Expiration date, los mismos datos de la fila de Pending
  task), las dos secciones **sin caja ni borde** (`DrawerSection`) en dos columnas, y *Cancel* / *Save* en el pie de la
  card con una línea fina arriba. Adjuntos: zona de arrastre en una fila (no un bloque alto) y cada archivo en
  `TARJETA_INTERNA` con su tamaño y ✕. New provider es un **drawer con pasos** (General, Address, Phone), regla de la app
  para todo pop up; red.dev usa un modal centrado.
- **Reglas de Jira aplicadas:** sólo se edita en Pending y con encuentro abierto; en Requested, aviso *This referral
  can't be edited* (CON-2323). Procedures busca sólo procedimientos **Planned** del paciente, varios a la vez
  (`SearchPicker`, CON-2322). Nota máx. 500 caracteres con contador; adjuntos PDF/JPG/PNG hasta 10MB, si no *Invalid file
  format or size.* Save valida provider y nota (*This field is required.* y el aviso *All required fields marked with (\*)
  must be completed before proceeding.*); al guardar, *The referral has been successfully updated.* El provider muestra su
  especialidad debajo y, sin coincidencias, *No results found.* (CON-2610). El provider nuevo queda elegido al guardar.
- **⋮ de Referral** (también en la fila del Dashboard y del Patient Dashboard; antes no tenía): Pending → Request,
  Cancel, Delete; Requested → Cancel. Request pregunta antes, con el texto de CON-2394 (*Once marked as Requested, you
  will no longer be able to edit this referral.*); Delete usa título y texto de CON-3436.
- Cancel vuelve a la pestaña Referral, que sigue en *Planned* (la lista de derivaciones, CON-3870, no está construida).

Anomalías y pendientes:

1. **Inventado para el mock** (red.dev no lo muestra): los providers (Dr. Laura Chen, Dr. Omar Haddad, Dr. Priya Shah,
   tomados de las derivaciones ya cargadas en la Problem List), la nota y el adjunto de ejemplo, y la lista de
   especialidades del drawer.
2. Complete (CON-2398) y Rejected (CON-2392) de una Referral Requested no se sumaron al ⋮: piden revisar los findings
   vinculados en el mismo modal, que todavía no existe.
3. *Provider Type* (CON-3128) no se agregó: la historia no dice qué opciones tiene. *Credentials* avisa que no está en
   esta versión (no hay historia con sus campos).
4. El `TextArea` compartido mete la ayuda (el contador) dentro del `<label>`: el lector lee "Referral note 94/500".

**A validar con usuarios:** si recepción entiende *Request* como "enviar al provider"; si el contador de 500 alcanza; y si
conviene ver los procedimientos derivados también en la lista de Treatment plan.

### CON-4153 · End Encounter: una sola línea de lo hecho y sin bajada (2026-11-25)

Pedido de Julián sobre una captura del drawer:

1. **Lo hecho hoy, una sola vez:** cada fila muestra sólo la última línea verde. Si en el mismo encuentro se completó la
   fase 2 y después el procedimiento, queda *Procedure completed* (antes se listaban *Phase 1 completed* y *Procedure
   completed* juntos). Sin cerrar el procedimiento, se ve la fase más alta registrada. El detalle completo sigue en
   *View execution history*.
2. **Sin bajada:** sale el texto *Record the phases or procedures done in this appointment…* y la línea de fecha,
   hora, provider y cantidad debajo del título, como pide la regla de drawers (título sin bajada). La cantidad sigue en
   *Appointment procedures · N*.
3. **Sin el texto del pie** (*You can end the encounter without completing every procedure…*).

**A validar con usuarios:** sin el texto del pie, si se entiende que End Encounter cierra aunque queden fases sin
registrar y que Back no deshace lo guardado.

## CON-2214 · CON-2321 · Lab order y Referral con la estructura de Edit account (2026-11-25)

Pedido de Julián: el detalle de Lab order y el de Referral tienen que verse como Edit account (Settings), "así es lo
mismo para todo". Las dos fichas usan ahora las mismas piezas (`clinical/FichaClinica.tsx`):

1. **Título de pantalla** (`EncabezadoFicha`): *Lab order* / *Referral* a 20px SemiBold, como `PageTitle`, con el estado al
   lado y PDF y ⋮ a la derecha. Sale la barra-card de arriba y el *LAB ORDER* en mayúsculas de red.dev.
2. **Cards apiladas a todo el ancho** con la card de Settings (`settings/primitives` `Card`, que suma `action` para un
   control junto al título): Lab order → *General information* (laboratorio + New laboratory | Delivery expiration date,
   ASAP, Procedures), *Teeth & surface* (la dentición como `action`) y *Details* (Dental work requested | Special
   instructions, Attachments). Referral → *General information* (provider + New provider | ASAP y Mandatory, Procedures) y
   *Details* (Referral note | Attachments). Campos de a dos desde 640px; en celular, uno debajo del otro.
3. **Cancel / Save abajo a la derecha, fuera de las cards** (`FormFooter`), como Edit account. Se van la barra fija de
   Lab order y el pie dentro de la card de Referral.
4. **Attachments compartido** (`Adjuntos`): zona de arrastre en una fila y cada archivo con tamaño y ✕. Lab order
   conserva su aviso (*Only PDF, JPG or PNG files up to 10MB.*); Referral el de Jira (*Invalid file format or size.*).
5. Referral pierde la línea de paciente / Register / Expiration date debajo del título (ninguna de las dos fichas la
   tiene, Edit account tampoco).

**A validar:** sin la barra fija, en una Lab order larga Save queda al final de la página; Edit account funciona igual.

## CON-4211 · CON-2770 · Los Edit desde las tablas, Estimate en Edit procedure y la card del plan (2026-11-25)

**CON-4211 ([Procedure] Insurance Estimate), CON-2770 (Edit Finding), CON-3142 (VOL 2 Edit Procedure), CON-2529.**
CON-4211, CON-3142 y CON-1598 no tienen descripción en Jira: el estimado sale de la captura de la app anterior que mandó
Julián (Edit Procedure › Insurance Estimates) y del vocabulario de Estimate details. Julián: "cuando tenés un tooth no
van los descriptors, sólo general information"; "cuando edito un procedure debería estar también el estimate"; "el edit
del ⋮ de la tabla (procedure o problem list) y el de Actions del treatment plan deberían ser estos drawers"; "el
treatment plan del clinical mode debe estar alineado en diseño al treatment plan del patient dashboard". El video que
mencionó no llegó: si el diseño del estimado era otro, se ajusta.

- **Títulos**: *Edit finding* (toda condition: con diente, Extraoral/Intraoral, Physical…) y *Edit procedure*. En
  minúscula inicial, como el resto de los drawers de la app ("New condition", "Edit relationship"); el mockup decía
  "Edit Finding" y el Figma 5301:149072 "Edit Condition" (anomalía: se sigue la regla de la app).
- **Edit finding con un diente**: sin pestañas ni descriptores, sólo General information (datos, rueda de superficies y
  notas). Consecuencia: los descriptores de una condition en un diente se eligen al cargarla y después no se editan.
  **A validar** con odontólogos si alguna vez corrigen un descriptor después.
- **Edit finding de Physical y ROS** (Generally unwell, Abnormal weight gain): sin la pestaña Descriptors, que son de una
  lesión. Extraoral e Intraoral la conservan.
- **Edit procedure suma la pestaña Estimate** (`dental/ProcedureEstimate.tsx`):
  - Arriba, sin editar: *Amount charged* (el fee), *Allowable amount* y *Coverage*, con las filas de `DatosHallazgo`.
  - *Outstanding insurance estimates*: "Calculate insurance estimates automatically" (casilla y no switch: se guarda
    con Save, regla de `ui/switch`). Con la casilla, Primary / Secondary insurance portion e Insurance write-off son el
    cálculo y no se tocan; sin ella se cargan a mano. *Patient portion* siempre es el resto (cargo − seguros − write-off).
    Volver a automático reemplaza lo cargado a mano.
  - *Insurance estimate overrides*: Primary y Secondary, cada uno con su casilla y su monto; el override manda sobre lo
    calculado y arranca con el valor actual. Si los seguros suman más que el cargo, el error se ve abajo y Save vuelve a
    la pestaña Estimate sin guardar.
  - **Bloqueado** (se ve, no se toca, con el aviso "Estimate locked" y el candado) cuando el procedimiento está en un
    caso que salió de Planning o sin permiso sobre la ubicación: la misma regla de Estimate details (CON-2529). Suelto,
    siempre se edita.
  - Sin fee: estado vacío "No amount charged" (sin cargo no se estima, CON-2529).
  - Mock (`resolverEstimado`, `data/estimaciones.ts`): la cobertura por categoría del CDT de Estimate details; el
    deducible se aplica en el caso, no acá; el mock no tiene seguro secundario (queda en $0). Sin tocar nada no se
    guarda copia: el procedimiento sigue calculándose solo. **Pendiente**: que Estimate details tome los overrides
    guardados (hoy recalcula sin ellos).
- **Edit del ⋮ en las tablas**: Problem List abre *Edit finding* (antes decía "Editing is not available"); Procedures
  y las filas de Treatment Plan (casos y Unassigned) abren *Edit procedure* (antes, un drawer sólo con la nota,
  `DialogoEditar`). Las filas se pasan a `Finding` con `dental/registroComoFinding.ts`; el estado que se ve es el de la
  fila (Planned, Pending…), el fee el del caso o el UCR, y Findings arranca con los vínculos de
  `VINCULOS_PROCEDIMIENTO`. Lo que se guarda (nota, proveedor, superficies, descriptores, vínculos, estimado) vuelve a
  la fila. End Encounter sigue con `DialogoEditar` (sólo la nota): **a confirmar** si también pasa a Edit procedure.
- Las superficies de la Problem List usan también M, D, I y F, que la rueda (MB/B/DB/O/ML/L/DL) no tiene: el chip las
  nombra igual ("D - Distal"), pero no se marcan en la rueda (anomalía: dos vocabularios de superficies).
- Nuevo estado de finding *Referred* (pill violeta), para editar una fila de la Problem List derivada.
- **Card del plan en el Overview** (`TreatmentPlanList`, `PlanCard`): pasa al diseño de la card de Treatment Plan de la
  ficha del paciente (`pages/patients/Treatments`): profesional y estado arriba; franja gris con el grupo y los
  procedimientos, el nombre del caso en azul, la barra fina (azul mientras avanza, verde al 100 %, roja si se canceló o
  venció) y "Overall completion: N % · x of N completed"; pie con Created on y Total amount, que sigue abriendo Estimate
  details. Mismos datos que antes. Va dentro del panel blanco, así que es `TARJETA_INTERNA`.

A validar con usuarios: si recepción entiende *Insurance write-off* (la app anterior lo llama "Ins write-off") y si el
override por seguro alcanza o piden override del Patient portion.

Código: `clinical/dental/{ProcedureEstimate,registroComoFinding,EditFindingDrawer,EditConditionDrawer,EditProcedureDrawer,
data,DatosHallazgo}.tsx`, `clinical/{ProblemList,TreatmentPlanSection,TreatmentPlanList,RecordDetail}.tsx`,
`data/{estimaciones,treatment-plan}.ts`, `tests/clinical-mode.e2e.ts`. Storybook sin tocar.

### Edit procedure: sin overrides y con un finding y un diagnóstico cargados (2026-11-26)

**CON-4211.** Julián: "el estimate overrides no va"; "el mensaje debajo de Link findings y Link diagnosis sacalo, y debería tener por default un finding cargado y un diagnostic cargado".

- **Estimate sin *Insurance estimate overrides***: queda *Outstanding insurance estimates* (automático o a mano) y el Patient portion como resto. Se saca del modelo (`EstimadoProcedimiento.override`) y de `resolverEstimado`. Revierte lo de 2026-11-25.
- **Link findings / Link diagnosis sin la bajada** de abajo del título.
- **Vinculados por defecto**: si el procedimiento no trae nada vinculado, arranca con un finding (el del mismo diente o, si no hay, el primero no descartado) y su diagnóstico. Lo ya vinculado manda y no se pisa. **A validar**: que preseleccionar no lleve a guardar un vínculo que nadie revisó; se puede sacar con la ✕.

## CON-2214 · CON-2321 · CON-2584 · Lab order y Referral: layout para escribir, mismo procedimiento y lo que muestran los videos de red.dev (2026-11-27)

**Jira:** CON-2214 (Lab Order), CON-2215 y CON-2221 (comentarios de Abril: Patient, Ordering Provider y Order Date;
firma del dentista para Requested), CON-2584 (comentario de Abril: el procedimiento tiene que mostrar fecha y diente,
superficie o zona, también una vez elegido; en sólo lectura New Laboratory y adjuntos apagados), CON-2321, CON-2322,
CON-2394, CON-2398, CON-2392, CON-3436. Pedido de Julián sobre la versión "como Edit account" del 2026-11-25 y cuatro
videos de red.dev (dos de Lab Order, dos de Referral).

**Problemas que marcó Julián** (y eran ciertos):

1. Los procedimientos tenían dos formatos: en Lab order el caso y el estado pero no el diente; en Referral el diente pero
   no el caso. No se comparó antes de mandar.
2. Las cards apiladas a todo el ancho le daban casi toda la pantalla a General information y dejaban el texto libre (lo
   único donde se escribe mucho y lo que lee el laboratorio o el especialista) en una caja de 4 filas, abajo y con scroll.
3. Espacio vacío: la fecha sola en media fila, el procedimiento en media fila, el recuadro punteado alto de *Initialize…*.
4. Teeth & surface iba en su propia card; tiene que estar dentro de General information.

**Decisiones**

1. **Dos columnas en desktop (≥1024 px), 7:5** (`COLUMNAS_FICHA`): a la izquierda *General information* (lo que define
   el pedido), a la derecha *Details*, que se estira al alto de la izquierda y le da ese alto al texto libre (`TextArea`
   suma `crecer`; `settings/Card` suma `bodyClassName`). En Lab order, *Dental work requested* se lleva 2/3 y *Special
   instructions* 1/3; en Referral, la nota todo. En celular y tablet, una columna con textos de 7 filas. Es lo que hace
   red.dev (dos columnas), con la estética de la app. Cancel / Save siguen abajo a la derecha (`FormFooter`).
2. **Teeth & surface dentro de General information**, como subsección con su rótulo y Permanent / Primary a la derecha.
   Sin el recuadro punteado: los dos *Initialize…* en una fila.
3. **Un solo formato de procedimiento** (`ProcedimientoResumen` y `ProcedimientosVinculados` en `FichaClinica`), en el
   buscador y en la lista, en las dos fichas: chip del caso (o *Independent*, el término de red.dev en los dos módulos;
   el Treatment plan los llama *Unassigned*), pill del estado, código - nombre y "Tooth 19 · O, D" o la zona ("Full
   mouth") con *Created date*. Vinculados uno debajo del otro, con el tacho. La Referral de ejemplo arranca con D2740 para
   que se vea igual que la Lab order.
4. **Ordering provider y Order date** (CON-2215, Abril) arriba de General information, de sólo lectura. *Patient* no se
   repite: está en la barra del paciente.
5. Sólo lectura (CON-2584): también los *Initialize…*, la dentición y los dientes.

**Lab order: lo que muestran los videos y se corrigió**

- **Dentición mixta:** Permanent / Primary sólo cambia la arcada que se ve; lo marcado en una queda al pasar a la otra
  (antes se borraba). Al lado de la arcada, las listas *Permanent* y *Primary* con los dientes marcados (red.dev dice
  *Pediatric*; acá *Primary*, como el botón): tocar uno lo elige para la rueda.
- **Rueda de cinco superficies** (`dental/RuedaSuperficies`, nueva): M a la izquierda, D a la derecha, O al centro y
  arriba / abajo según la arcada (maxilar: B / P; mandíbula: L / B), como red.dev. La `SurfaceWheel` de siete zonas sigue
  en los findings. Supuesto: en los anteriores el centro es I (incisal); el video sólo muestra molares.
- **Toggle all** marca o saca las cinco superficies del diente elegido (antes marcaba todos los dientes). *Apply to unset*
  copia las del diente elegido a los marcados sin superficies.
- **Request pregunta antes** (`PREGUNTA_LAB`): *Request lab order* con el texto de red.dev. Delete también, con su texto
  (*Delete lab order*). Antes Request se hacía al toque.
- **Edit desde la tabla** de la pestaña Lab order abre la ficha (antes: "Editing is not available"); *View order* también.
  Edit sólo en Pending. Lo hecho desde el ⋮ de la ficha se ve en la fila.

**Referral: lo que muestran los videos y se corrigió**

- *Request referral* con el texto de red.dev.
- **Requested: Complete y Reject** en el ⋮ (CON-2398, CON-2392), cada uno con su pregunta (*Complete referral* / *Reject
  referral*) y su aviso (*The referral has been successfully completed / rejected.*); la tarea sale de Pending Task. En el
  código la acción se llama `Finish` para no chocar con *Complete this task*.
- El ⋮ de la ficha no tiene Delete (red.dev lo tiene en el tacho de la lista, no en la ficha).
- **New provider con Credentials** (cuarto paso): tipo, número y vencimiento, de a varias, como New laboratory
  (`clinical/Credenciales`, compartido).

**Anomalías de red.dev / pendientes**

1. El buscador de procedimientos de Referral en red.dev muestra procedimientos *Referred*; CON-2322 dice sólo Planned. Se
   sigue Jira.
2. El PDF de Lab order de red.dev sale con una segunda hoja en blanco y no lleva dientes, procedimientos ni ASAP.
3. El ⋮ de Lab order en Pending Task sigue con Edit / Request para órdenes Requested o Delayed (red.dev sólo mostró
   Pending): falta la máquina de estados (CON-2222).
4. Firma del dentista para pasar a Requested (CON-2221, *Dentist signature required to mark as Requested*): no está; la
   historia de firmar la Lab Order (CON-2338) está cancelada. Validar con Julián.
5. Los tipos de credencial siguen siendo los de Employees (License, DEA, NPI); red.dev muestra *DEA #*.
6. La lista de Referral de red.dev (cards con referring / referred provider, Created, Last updated, Expiration date, PDF,
   tacho y ⋮) no está construida (CON-3870).

**A validar con usuarios:** si la columna de Details a la derecha se lee como "lo que va al laboratorio"; si 2/3 – 1/3
entre trabajo e indicaciones alcanza; si recepción entiende *Independent*; y si la lista de dientes elegidos se usa para
cambiar de diente o se toca siempre la arcada.

Código: `clinical/{FichaClinica,LabOrderDetail,ReferralDetail,LabOrderPanel,Credenciales,NewProviderDrawer,
NewLaboratoryDrawer}.tsx`, `clinical/dental/RuedaSuperficies.tsx`, `dashboard/tareas.tsx`, `patients/form.tsx`
(`TextArea.crecer`), `settings/primitives.tsx` (`Card.bodyClassName`); e2e en `tests/pending-tasks.e2e.ts`. Storybook sin
tocar.

## CON-2230 · CON-2354 · CON-2356 · Prescription: la lista y New / Edit prescription (2026-11-27)

**Jira:** CON-2212 (epic) · CON-2230 (New Prescription: campos, listas y validaciones) · CON-2354 (Edit: sólo Pending, al
menos una medicación) · CON-2355 (Cancel: Pending o Active) · CON-2356 (Delete: sólo Pending) · CON-2358 (Expired al
vencer) · CON-2286 (Consult: lista con filtros y detalle) · CON-2287 (PDF de una Active) · CON-2337 (Update Patient
Medications por medicación) · CON-2846 (reutilizar la medicación ya activa) · CON-2347 (valores por defecto). Dos videos
de red.dev de Julián: la lista con *Filters* (Status, Provider, Expiration From / To), ⋮ → *Edit*, y *New Prescription*
con *Medication 1 / 2*, *Medication Details*, *Directions for Use*, *Additional* y el error *Uncompleted fields*. Pedido:
"respetando el diseño de nosotros, estética y también tablas". Antes la pestaña era el placeholder *Planned*.

Código: `clinical/PrescriptionPanel.tsx` (lista, ⋮, preguntas, PDF), `clinical/PrescriptionForm.tsx` (la ficha),
`data/prescripciones.ts` (catálogos y mock), `pages/ClinicalMode.tsx`, `tests/clinical-mode.e2e.ts`.

Qué se copió del video (contenido) y cómo quedó (diseño):

1. **Lista = tabla estándar**, como Lab order: sin card alrededor, *Search prescriptions* con su botón Search, **Filter**
   (`FilterMenu` con dos grupos, Status y Provider, con cantidades) y la fecha de vencimiento con `DateFilter` (*Any
   expiration date*; atajos Next 7 / Next 30 / Last 30 / Last 90 days). red.dev arma las filas como cards con el avatar
   del provider, un chip azul con la droga y tres íconos sueltos; acá son columnas: *Medication* (la primera y "+N
   more"), *Provider* (sólo el nombre: el avatar queda para Patients y Employees), *Status*, *Created date*, *Last
   update*, *Expiration date*. La fila abre la ficha.
2. **El ⋮ según el estado** (los íconos de PDF y tacho de red.dev pasan al menú, como en toda tabla): Pending → Edit
   prescription, Activate, Cancel prescription, Delete prescription; Active → View prescription, Download PDF, Cancel
   prescription; Expired / Canceled → View prescription.
3. **Ficha con la estructura de Edit account** (`FichaClinica`), igual que Lab order y Referral: título *New
   prescription* / *Prescription* con el estado; PDF y ⋮ a la derecha en una Active; dos cards apiladas y Cancel / Save
   abajo a la derecha.
   - *General information*: **Expiration date\*** (en red.dev iba suelta en la barra del título) y **Additional
     instructions** (500 caracteres con contador). Se juntaron en la misma card: son de toda la receta y así no queda una
     card de un solo campo al final.
   - *Medications*: *New medication* en el título de la card; una pestaña por medicación (`ui/tabs`, *Medication 1*,
     *Medication 2*…) con el punto rojo si tiene errores; *Remove medication N* (sólo con más de una, CON-2354) en vez
     de la ✕ chiquita de la pestaña. Adentro, *Medication details* | *Directions for use* en dos columnas desde 1280px
     (abajo, una debajo de la otra) y los campos de a dos.
   - Valor y unidad en la misma fila (Strength, Dose, Duration): un rótulo, el número y la unidad.
   - **Casillas y no switches** para Allow generic substitution, Controlled substance y Update patient medications: se
     guardan con Save (regla de `ui/switch`; CON-2230 también dice Checkbox).
4. **Validaciones (CON-2230):** obligatorios con *This field is required.* por campo y el aviso *Uncompleted fields: All
   required fields marked with (\*) must be completed before proceeding.*; si el error está en otra medicación, se abre
   esa. Medication tiene que salir de la lista (*Select a medication from the list.*; sin coincidencias, *No results
   found.*). Números positivos (decimales en Strength y Dose) y mayores a 0. El calendario sólo deja elegir de mañana a
   seis meses; una Pending vieja que abre con la fecha vencida avisa *Date cannot be in the past* al guardar.
5. **Mensajes de Jira:** *The prescription has been successfully created / updated / canceled / deleted.* Cancel y Delete
   preguntan con los textos de CON-2355 y CON-2356. **Activate** pregunta sólo si una medicación con *Update patient
   medications* ya está activa en el paciente: *This medication is already active for the patient. Do you want to reuse
   the existing medication?* → *Reuse existing medication* / *Cancel* (CON-2846, que reemplaza el error de CON-2337).
6. **Sólo lectura** fuera de Pending: aviso *This prescription can't be edited · Only pending prescriptions can be
   edited.* y *Back to prescriptions* en lugar de Cancel / Save.
7. **Pending Task:** *Complete this task* de una Prescription abre la pestaña con su ficha (`?tab=Prescription&task=`).
   Activate, Cancel o Delete desde ahí también la sacan de Pending Task (`aplicarAccion(…, { sinAviso })`).
8. **Piezas que cambian:** `ui/date-picker` suma `min`, `max`, `disabled` y `label` (y `MonthCalendar`, `min`);
   `ui/date-filter`, `emptyLabel`. El Storybook no se tocó (se documenta al final, si se pide).

Anomalías y supuestos:

1. **Inventado para el mock:** las 14 recetas, la lista de drogas (las de uso dental), las unidades, las vías y la
   medicación activa del paciente (Ibuprofen, para ver la pregunta de CON-2846). CON-2230 deja Unit of Measure y Route
   con "etc.". El video tiene un solo provider y drogas sin unidad real ("clonazepam 1 G").
2. El video escribe **Cancelled**; Jira y el resto de la app, **Canceled**. Se sigue Jira.
3. El video pinta todas las fechas de vencimiento en rojo; acá sólo las de recetas *Expired* (el color dice algo).
4. Los placeholders del video (500, 30, 1, 7) parecían valores cargados: van como *e.g. 500*.
5. **Activate no tiene historia propia:** el cambio a Active sale de CON-2337 / CON-2846 y del ⋮ de Pending Task. No pide
   encuentro abierto (ninguna historia de Prescription lo pide; Lab order y Referral sí). **A confirmar con Julián.**
6. CON-2354 dice que en Edit "puede mantener Draft o cambiarlo a Active" desde el formulario; acá Activate queda en el ⋮
   (un solo lugar para cambiar de estado, como Lab order y Referral).
7. *Expired* es automático (CON-2358): el mock trae los estados fijos.

**A validar con usuarios:** si el odontólogo prefiere ver todas las medicaciones a la vez (filas) en vez de pestañas cuando
receta tres o más; si *Update patient medications* se entiende sin explicación; y si el filtro de vencimiento se usa más
para lo que vence pronto o para lo ya vencido.

### Prescription: el funcionamiento de red.dev (2026-11-27, 2ª vuelta)

Julián pasó acceso a red.dev para relevar cómo funciona Prescription. Se miró sin cambiar nada (sin guardar, activar,
cancelar ni borrar): la lista de *Aaa Test Aaa*, Edit de una Pending, New Prescription con Save vacío, el ⋮ de cada
estado, los filtros y Pending Tasks; los textos de las preguntas salen del código publicado de la app. Lo que cambió acá
para funcionar igual (el diseño sigue siendo el nuestro):

1. **Listas de opciones de red.dev**, no las de CON-2230 (la app real las cambió por unas odontológicas): Dosage form
   (33, de *Buccal tablet* a *Vaginal tablet*), Strength unit (g, mcg, mEq, mg, ml, mmol, %, IU, Unknown), Dose unit
   (Applications, Capsules, Drops, Puffs, Sprays, Suppository, Tablespoons, Tablets, Teaspoons, Unknown), Route (Buccal,
   Dental, Intramuscular, Intrathecal, Intravenous, Oral, Periodontal, Sublingual, Submucosal, Topical), Frequency (As
   needed, At bedtime, Every 4 to 6 hours, Four times daily, Immediately, Once daily, Three times daily, Twice daily,
   Unknown) y Duration (Days, Weeks, Months). Los códigos en mayúsculas de red.dev (MG, APPLICATIONS) se escriben como se
   leen.
2. **La indicación armada** debajo de Directions for use, como red.dev: *Take 1 tablet orally every 4-6 hours for 5 days*
   (`indicacionesDeUso`), sólo con todos los datos.
3. **La pestaña lleva el nombre de la droga** elegida (red.dev: *clonazepam*); sin droga, *Medication N*. *Remove …* usa
   el mismo nombre.
4. **Cada cambio de estado pregunta antes**, con los textos de red.dev:
   - *Activate prescription* (Pending): *…Once marked as Active, you will no longer be able to edit this prescription.* →
     *The prescription has been successfully marked as Active.*
   - *Cancel prescription* (Pending o Active) → *…successfully marked as Canceled.*
   - **Expire** (nuevo, sólo Active): *Expire prescription* → *…successfully marked as Expired.*
   - *Delete prescription* (Pending, el tacho de la fila): el texto de CON-2356, igual en red.dev.
5. **Medicación ya activa: al guardar**, no al activar. red.dev la detecta al crear o editar, cuando una medicación con
   *Update patient medications* ya está activa en el paciente: *Medication already active* · *This medication is already
   active for the patient. Do you want to reuse the existing medication?* → *Reuse existing medication* guarda
   reutilizándola; *Cancel* vuelve al formulario. El campo de red.dev se llama `activated` (CON-2854 lo renombró a
   *Update Patient Medications*).
6. **Textos:** sólo lectura *This prescription can only be edited while Pending.*; vacío *No prescriptions* · *This
   patient doesn't have any prescriptions yet.*; con filtros *No prescriptions match the current filters*.
7. Se confirmó lo que ya estaba: PDF sólo en Active y tacho sólo en Pending (en red.dev, deshabilitados en el resto);
   Expired y Cancelled sólo tienen *Edit* deshabilitado (acá, *View prescription*); New Prescription sin ⋮ ni PDF; los
   campos numéricos vacíos con placeholder; Refills opcional; error *Uncompleted fields*.

Diferencias que se dejan como están (a confirmar con Julián):

1. **Expiration date:** red.dev deja elegir desde hoy y sin tope; CON-2230 pide posterior a hoy y hasta 6 meses. Se sigue
   Jira.
2. **Strength** en red.dev sólo acepta enteros; acá admite decimales (clonazepam 0.5 mg no se podría recetar).
3. red.dev escribe **Cancelled** y agrega una "s" de más en la indicación (*applicationss*); acá *Canceled* y el plural
   bien hecho. La unidad **UI** de red.dev va como *IU*.
4. **Filters** en red.dev se aplican con *Apply Filters*; acá al tocar, como todos los filtros de la app.
5. **Pending Tasks** de red.dev marca con *Expired date* las Pending vencidas, y su ⋮ (Edit, Activate, Cancel) aparece
   deshabilitado sin encuentro abierto. No se sumó acá: es otra pantalla (dashboard.md).
6. El buscador de red.dev consulta una base de drogas real (amoxapine, AMOXICILINA, Soltamox…); acá, la lista corta del mock.

### Prescription: la ficha en dos columnas, como Lab order y Referral (2026-11-27, 3ª vuelta)

Al traer `main` (#209 a #211), Lab order y Referral ya no eran cards apiladas: pasaron a dos columnas 7:5
(`COLUMNAS_FICHA`). Prescription se alinea para que las tres fichas sean iguales:

- **Izquierda, *Medications*** (lo que define la receta): pestañas, *Medication details* y debajo *Directions for use*,
  campos de a dos. Reemplaza las dos columnas internas de la primera versión.
- **Derecha, *Details*** (lo de toda la receta): *Expiration date* y *Additional instructions*, que se lleva el alto que
  deja la columna de la izquierda (`TextArea crecer`). Reemplaza la card *General information* de arriba.
- En celular y tablet, una columna: primero las medicaciones.
- La unidad de Strength / Dose / Duration se ensancha para que entren *Applications* y *Tablespoons*.

**A confirmar con Julián:** Lab order y Referral muestran arriba *Ordering provider* y *Order date* de sólo lectura
(CON-2215). Prescription no los lleva: red.dev no los muestra en el formulario y ninguna historia los pide ahí.

## CON-2212 · CON-2214 · CON-2321 · Prescription, Lab order y Referral: el flujo completo con las mismas piezas (2026-11-27, 2ª tanda)

**Jira:** Prescription — CON-2212 (epic), CON-2230 (New), CON-2354 (Edit), CON-2355 (Cancel), CON-2356 (Delete), CON-2357
(máquina de estados), CON-2358 (Expired), CON-2286 (lista), CON-2287 (PDF), CON-2337 (Update Patient Medications). Lab
order — CON-2215 (New), CON-2218 (Edit), CON-2219 (lista), CON-2221 (Requested), CON-2222 (máquina), CON-2224 a CON-2228
(Rejected, Delivered, Delayed, Delete, Canceled), CON-2584. Referral — CON-2322 (New), CON-2323 (Edit), CON-2324
(máquina), CON-2391, CON-2392, CON-2394, CON-2398, CON-2609 (lista), CON-3436. Pedido de Julián: "armá el flujo completo
de Prescription, Lab order y Referrals, identificá los componentes que venimos usando y usá lo mismo para todo (tablas,
editar, new); adecuá el diseño al de la app, red.dev sirve de guía para el flujo real". Se recorrió red.dev con su
usuario (sólo lectura: listas, ⋮ por estado, Filters, formularios, validaciones y diálogos; no se guardó ni cambió nada).

**Una sola estructura para los tres** (`clinical/RegistrosPanel`, `clinical/registros`, `dashboard/tareas`):

1. **Lista = tabla estándar** (`DataTable`): buscador con *Search* (`SettingsSearch`), *Filter* por estado y *New …* a la
   derecha; columnas Provider, lo propio de cada uno (Laboratory / Medication en chip con *+N* / Referred provider con
   su especialidad), Status, Last update, Created date y Expiration date (en rojo si vence en una semana y sigue
   abierto). red.dev lista Prescription y Referral en cards y Lab order en tabla: acá las tres en tabla. Referral no
   lleva Expiration date (CON-2609 no la lista y la ficha no tiene ese campo).
2. **La fila abre la ficha**; el ⋮ trae *View* (si ya no se edita), *View PDF* (si hay documento) y las acciones del
   estado. En red.dev una orden que ya no se edita sólo se puede ver por el PDF (Edit apagado): acá se abre en sólo
   lectura, con su contenido.
3. **Una ficha para New, Edit y sólo lectura** (`LabOrderDetail`, `PrescriptionDetail`, `ReferralDetail`, sobre
   `FichaClinica`): flecha de vuelta a la lista, título (*New prescription* / *Prescription*), estado, PDF y ⋮; *General
   information* a la izquierda, que abre con quién lo hizo y cuándo (de sólo lectura), y *Details* a la derecha; *Cancel*
   / *Save* abajo a la derecha (*Back* si no se edita). Los avisos son los mismos (`AvisosFicha`): *Read-only mode* sin
   encuentro o fuera de Pending (*This … cannot be edited because it is not in an editable state.*, CON-2218) y, al
   guardar con faltantes, *Uncompleted fields* (el texto de Jira) arriba más *This field is required.* en cada campo.
   Antes Lab order tenía mensajes propios por campo y Referral un toast.
4. **Máquina de estados única** (`MAQUINA` en `dashboard/tareas`): Lab order Pending → Edit, Request, Cancel, Delete ·
   Requested → Deliver, Delay, Reject, Cancel · Delayed → Deliver, Reject, Cancel. Prescription Pending → Edit, Activate,
   Cancel, Delete · Active → Cancel. Referral Pending → Edit, Request, Cancel, Delete · Requested → Complete, Reject,
   Cancel. Un estado final no tiene ⋮. Vale igual en Pending Task (Dashboard y Patient Dashboard), en la tabla y en la
   ficha (la ficha no repite Edit).
5. **Toda acción pregunta antes** (`ConfirmDialog`, `PREGUNTAS`), con el título y el texto de red.dev (*Activate
   prescription*, *Deliver lab order*, *Cancel Referral*…); el botón dice lo que hace (*Mark as delivered*) y no
   *Confirm*. Los avisos siguen a Jira: *The lab order has been successfully marked as Requested.*, *The prescription has
   been successfully created / updated / canceled / deleted.* Sale el *Undo* de Request / Activate / Cancel order: ahora
   se confirma antes.
6. **Un solo almacén** (`clinical/registros`): cada registro es la tarea (estado, provider, fechas, documento) más su
   contenido. Lo que se crea o edita se ve en la tabla, al reabrir la ficha, en Pending Task y en el PDF
   (`documentoRegistro`). La tarea que abre *Complete this task* entra a su tabla con el mismo contenido que su PDF.
   New laboratory / New provider quedan para los registros siguientes.
7. **Sin encuentro abierto**: *New …* y las acciones se ven apagadas con el tooltip de siempre; la ficha abre en sólo
   lectura. En sólo lectura se siguen recorriendo las medicaciones y los dientes (quedan fuera del `fieldset`).
8. **PDF** cuando el documento existe, como red.dev: Lab order desde Requested (cancelada desde Pending no tiene,
   CON-2584), Prescription sólo Active (CON-2287), Referral sólo Requested.

**Prescription (nueva)**

- Campos y listas de red.dev: Expiration date\*; por medicación *Medication\** (buscador), *Strength\** + unidad,
  *Dosage form\**, *Quantity to dispense\**, *Refills*, *Update patient medications*, *Allow generic substitution* (sí por
  defecto), *Controlled substance*; *Directions for use*: *Dose\** + unidad, *Route\**, *Frequency\**, *Duration\** +
  unidad; *Additional instructions* (500). Debajo de Directions, la indicación en una frase (*Take 1 tablet orally three
  times daily for 5 days*), como red.dev.
- **Varias medicaciones en pestañas** (`ui/tabs`, aparecen desde la segunda) con el nombre de cada una (*Ibuprofen 400
  mg*; red.dev dice *Medication 1*) y el punto rojo en la que tiene faltantes; *Add medication* y *Remove medication*
  (queda al menos una).
- **Details = Summary + Additional instructions**: todas las medicaciones a la vista con su frase, cantidad y refills, y
  las marcas (controlled, sin genérico, actualiza las medicaciones del paciente); tocar una lleva a su pestaña. Es
  contenido derivado de los mismos campos: red.dev muestra la frase sólo de la medicación abierta. La columna queda fija
  arriba mientras se recorre el formulario.
- Campos cortos de a tres en desktop ancho, de a dos y de a uno en tablet y celular.
- Vencimiento: no se eligen días pasados ni más allá de 6 meses (CON-2230; `DatePicker` suma `min` / `max`). Números sin
  negativos ni letras.
- Los tres interruptores de red.dev son **casillas**: se guardan con Save (regla de `ui/switch`).

**Lab order (lo que se sumó)**: *New lab order*; Deliver, Delay y Reject; contador 500 en los dos textos (CON-2215);
vencimiento sin días pasados; vincular un procedimiento con diente lo trae marcado en *Teeth & surface* (CON-2215); la
tabla cambia *Patient* por *Laboratory* (estaba dentro de un paciente) y pierde *View history* y el *New prescription*
que venía del Figma (anomalía 85).

**Referral (lo que se sumó)**: la lista (no existía: la pestaña decía *Planned*), *New referral*, *Referring provider* y
*Referral date* arriba, Delete en la ficha como las otras dos.

**Anomalías de red.dev / decisiones a validar con Julián**

1. Unidades como enum crudo (*MG*, *APPLICATIONS*, *PERCENT*) y dos campos llamados *Unit*: acá *mg*, *Applications*, *%*
   y *Strength unit* / *Dose unit* / *Duration unit*. La frase de red.dev dice *applicationss*.
2. red.dev usa *Cancelled*; la app y Jira, *Canceled*.
3. Delayed → Deliver / Reject / Cancel es un supuesto (CON-2222 es una imagen y red.dev no tenía una orden Delayed).
4. Una Referral Completed o Rejected no tiene PDF en red.dev (el ícono queda apagado): se respetó, pero el documento
   existió. A confirmar.
5. **CON-2337**: la casilla *Update patient medications* se guarda, pero activar la receta todavía no escribe en las
   Medications del paciente (los estados de ese mock son los del Figma de Medical History, sin *Active* / *Prescribed*).
6. **CON-2398 / CON-2392**: Complete y Reject de una Referral con findings vinculados piden revisar esos findings en el
   mismo modal; hoy sólo preguntan.
7. **CON-2358**: Expired es automático por fecha; acá es un estado de los datos de ejemplo.
8. CON-2221 (firma del dentista para Requested) sigue sin implementarse: su historia (CON-2338) está cancelada.
9. Los filtros de red.dev también filtran por laboratorio, provider y rango de fechas; acá Filter es por estado y el
   buscador cubre provider, laboratorio, medicación y derivado. Si hace falta el rango, va con `DateFilter`.
10. El `SelectField` compartido no asocia su rótulo al botón (se nombra por el placeholder): en Prescription cada lista
    lleva un placeholder propio. Arreglarlo en el componente cambia el nombre accesible de todos los selects de la app.

**A validar con usuarios:** si el odontólogo prefiere pestañas o las medicaciones apiladas cuando son dos o tres; si el
resumen de la derecha alcanza para revisar antes de activar; si recepción distingue *View* de *Edit* en el ⋮; y si
*Deliver* / *Delay* se entienden como "el laboratorio entregó / avisó demora".

Código: `clinical/{RegistrosPanel,registros,PrescriptionDetail,LabOrderDetail,ReferralDetail,FichaClinica,LabOrderPanel}`,
`data/recetas.ts`, `dashboard/{tareas,documentoTarea}`, `ui/date-picker` (`min`, `max`, `ariaLabel`), `pages/ClinicalMode`.
e2e: `tests/registros-clinicos.e2e.ts` (nuevo), `tests/pending-tasks.e2e.ts`, `tests/clinical-mode.e2e.ts`. Storybook sin
tocar (la story de `LabOrderPanel` describe la tabla anterior; se rehace al documentar).

### Una sola Prescription: se une con la de #214 según red.dev (2026-11-27, 3ª vuelta)

Mientras se armaba la tanda de arriba, otra sesión publicó una Prescription propia (#214: `PrescriptionPanel`,
`PrescriptionForm`, `data/prescripciones.ts`, la sección *Prescription: la lista y New / Edit prescription*). Julián: "fijate
cómo está en red". Queda **una sola**, la del panel compartido (`RegistrosPanel` + `PrescriptionDetail` + `data/recetas`),
con lo que #214 había relevado de red.dev y esta no tenía; los tres archivos de #214 se borran.

- **Filtros como red.dev en las tres tablas** (`FilterMenu` con grupos + `DateFilter`): Prescription → Status, Provider y
  vencimiento; Lab order → Status, Laboratory, Provider y vencimiento; Referral → Status y fecha de la derivación
  (confirmado en red.dev). Reemplaza el punto 9 de la lista de arriba.
- **Expire** en una Prescription Active (*Expire prescription* → *…successfully marked as Expired.*), además de Cancel.
- **Reuse existing medication** (CON-2846, reemplaza el error de CON-2337): al guardar una receta con una medicación en
  *Update patient medications* que el paciente ya tiene activa (Ibuprofen en el mock) pregunta *Medication already
  active*. Activar sigue sin escribir en las Medications del paciente.
- **Validaciones de #214:** la medicación sale de la lista (*Select a medication from the list.*), números mayores a 0
  (*Enter a number greater than 0.*), vencimiento de mañana a seis meses (*Date cannot be in the past* en una Pending
  vieja) y placeholders *e.g. 500*.
- **Avisos como red.dev** en Lab order y Prescription: *…successfully marked as Canceled / Rejected.*; Referral conserva
  *…successfully canceled / completed / rejected.*
- **Lo que queda de esta tanda y no de #214:** Activate, Cancel, Expire y Delete piden encuentro abierto (como Lab order
  y Referral; #214 no lo pedía y lo dejó "a confirmar"); la ficha es *General information* (con las medicaciones) |
  *Details* (resumen e indicaciones), no *Medications* | *Details*; número y unidad son dos campos con su rótulo; el ⋮
  dice *Edit / View / View PDF* (no *Edit prescription / Download PDF*); el vencimiento va en rojo si vence en una
  semana y sigue abierta (no sólo las Expired); los datos de ejemplo son los 7 de `registros` (no los 14 de #214).
- `ui/date-picker` queda con la firma de #214 (`min`, `max`, `disabled`, `label`); `aplicarAccion` pierde `sinAviso`.

## CON-2214 · CON-2212 · CON-2321 · Teeth & surface de red.dev, datos en el título, fichas apiladas y el PDF nuevo (2026-11-27, 4ª vuelta)

**Jira:** CON-2215 (Lab order), CON-2230 / CON-2287 (Prescription y su PDF), CON-2322 / CON-2609 (Referral), CON-4115
(PDFs). Pedido de Julián sobre lo publicado en #216, con dos links de red.dev (una Prescription Active y la lista de
Referral), que se recorrieron otra vez sin cambiar nada.

1. **Teeth & surface como está armado en red.dev** (`dental/ArcadaAnatomica`, reemplaza a `DentalArch`, que se borra): el
   dibujo de las dos arcadas con la anatomía de cada diente, su número afuera y *Maxillary* / *Mandibular* adentro, para
   Permanent y Primary. Sale del SVG de red.dev (`dental/arcadasRed.ts`, generado: un trazo por diente; los colores son
   los tokens de la app). Cada diente es un botón (`aria-pressed`, teclado). La dentición va debajo del rótulo
   (`ui/tabs`), el dibujo a la izquierda y, a la derecha, *Permanent* / *Primary* con los dientes marcados, la rueda y
   *Toggle all* / *Apply to unset*. La **rueda** usa las cinco formas de red.dev (`RuedaSuperficies`).
2. **Quién y cuándo, en el título** (`EncabezadoFicha` suma `datos` y `campo`): pares rótulo / valor separados por una
   línea, a la derecha del título y junto al PDF y el ⋮; en celular bajan a su fila. Lab order: *Ordering provider* y
   *Order date*. Prescription: *Prescribing provider*, *Prescription date* y **Expiration date\*** (el `DatePicker`,
   como red.dev, con su error debajo). Referral: *Referring provider*, *Referral date* y *Expiration date*. Salen de
   *General information*.
3. **New siempre activo**: *New lab order / prescription / referral* no piden encuentro abierto (en red.dev se crean con
   el paciente en *Pending Signature*) y la ficha nueva se carga y se guarda. Lo ya cargado sigue pidiendo encuentro para
   editar y para las acciones del ⋮ (CON-2643). **A confirmar con Julián** si eso también se saca.
4. **Prescription y Referral, una card debajo de la otra**, como los formularios de la app (Lab order sigue en dos
   columnas). Prescription: *Medications* (*Add medication* en el título de la card, pestañas, y *Medication details* |
   *Directions for use* lado a lado desde 1280 px con los campos de a dos, como red.dev) y *Details* con *Additional
   instructions*. **Sale el *Summary***. Referral: *General information* (provider + *New provider* | ASAP y Mandatory,
   Procedures) y *Details* (Referral note | Attachments).
5. **Prescription Active como red.dev**: campos apagados, Save apagado, PDF en el título y ⋮ con *Expire* y *Cancel*.
6. **El documento sale de las plantillas de PDF** (`src/pdfs/plantillas`, las que recibe el backend), completadas con lo
   cargado en la ficha (`hojaDeRegistro` + `completar`) y abiertas en una pestaña (`abrirHoja`): Lab order, Prescription
   y Referral. La Clinical note sigue con el PDF de la tarea. Se va `documentoRegistro`.
7. **PDF en la fila** de las tres tablas (columna *PDF*, el ícono de red.dev): se abre cuando el documento existe y se ve
   apagado cuando todavía no. Sale *View PDF* del ⋮.
8. **Referral con Expiration date** en la tabla (y en el título), en rojo cuando vence en una semana o ya venció y sigue
   abierta, como Lab order y Prescription (`urge`).

Anomalías y supuestos:

- La ficha de Referral de red.dev no tiene campo de vencimiento y su lista muestra la misma fecha que *Created*. Acá una
  derivación nueva vence a los 30 días (supuesto, no hay regla en Jira): **a confirmar**.
- La plantilla de Lab order no tiene *Special instructions*, *ASAP* ni procedimientos: van dentro de *Dental Work
  Request*. Dibuja una sola dentición; con dientes de las dos, la permanente (los temporarios quedan en la lista).
- El PDF de red.dev de Prescription trae *Prescription ID*, *Valid From* y una tabla de medicación; el nuestro es el de
  `pdfs.md` (sin ID, una medicación por bloque).
- El documento se abre como hoja HTML (la plantilla), no como archivo .pdf: el PDF lo arma el backend. Desde la pestaña
  se imprime o se guarda como PDF.
- El dibujo de las arcadas pesa unos 85 KB en el módulo de Clinical Mode.

**A validar con usuarios:** si el vencimiento en el título se ve como un campo obligatorio (queda lejos del resto); y si
el dibujo anatómico se toca bien en celular (los dientes anteriores son chicos).

Código: `clinical/dental/{ArcadaAnatomica,arcadasRed,RuedaSuperficies}`, `clinical/{FichaClinica,LabOrderDetail,
PrescriptionDetail,ReferralDetail,RegistrosPanel,registros}`, `dashboard/{tareas,documentoTarea}`, `data/recetas`;
`tests/{registros-clinicos,pending-tasks}.e2e.ts`.

### Fichas apiladas en las tres, fechas y "+N" con las piezas de la app (2026-11-27, 5ª vuelta)

**CON-2214 · CON-2212 · CON-2321.** Pedido de Julián sobre el link de prueba; corrige la 4ª vuelta donde la contradice.

- **Lab order con la misma diagramación que Prescription y Referral**: una card debajo de la otra (*General information*
  con Teeth & surface, y *Details* con *Dental work requested* | *Special instructions* y los adjuntos). Ya no hay
  ficha en dos columnas: salen `COLUMNAS_FICHA`, `DatoFicha`, `TextArea.crecer` y `Card.bodyClassName`.
- **Prescription:** el rótulo *Expiration date\** va arriba del campo, en el título.
- **Referral:** *Referral note* a todo el ancho y *Attachments* debajo.
- **Fechas con los componentes de la app:** el `DatePicker` de las fichas no apaga días (igual que en el resto de los
  formularios); que el vencimiento no quede en el pasado (*Date cannot be in the past*) ni a más de seis meses en una
  receta se revisa al guardar, con el aviso arriba y debajo del campo. Una Lab order Pending ya vencida pide una fecha
  nueva para guardarse. CON-2230 pide bloquear la selección en el calendario: se cambió por pedido de Julián. El filtro
  de las tablas es el `DateFilter` de toda la app (*All dates*, Today, Last 7 / 30 / 90 days); en Lab order y
  Prescription también deja elegir días que vienen, y abre en el mes actual. Sale `emptyLabel`.
- **"+N" de Medication** (`ui/chip` › `ChipMas`, el mismo "+N" de Working hours, sin la ✕): despliega el resto de las
  medicaciones en la fila, sin abrir la ficha.
- **Corregido en la revisión:** *New* después de entrar por una tarea de Pending Task tomaba el id y el estado de esa
  tarea y la pisaba al guardar; ahora crea un registro nuevo en Pending. El documento de una tarea pedida desde el
  Dashboard firmaba con la fecha de creación. El foco de un diente se distingue del diente elegido (trazo negro).

### Sin encuentro, la fecha del Dashboard y Lab order a lo ancho (2026-11-27, 6ª vuelta)

**CON-2214 · CON-2212 · CON-2321.** Pedido de Julián sobre el link de prueba; reemplaza lo que la 4ª y la 5ª vuelta dicen
del encuentro y del filtro de fecha.

- **Nada pide un encuentro abierto en estas tres pestañas**: ni *New*, ni editar una Pending, ni las acciones del ⋮
  ("no tengo que poner siempre Start encounter para iniciar algo"). La ficha sólo queda en *Read-only mode* cuando el
  registro ya no está en Pending. `RegistrosPanel` y las fichas pierden `encuentroAbierto` / `abierto`; `AvisosFicha`,
  el aviso de *no open encounter*. **Pending Task del Dashboard y del Patient Dashboard no cambia**: su ⋮ sigue apagado
  sin encuentro (CON-2643), pero *Complete this task* abre la ficha y desde ahí sí se edita. A unificar si Julián lo
  pide.
- **El filtro de fecha de las tablas es el bloque del Dashboard** (`ui/date-nav`: ‹ Today › + calendario), por mes:
  filtra por el mes del vencimiento (Lab order, Prescription) o de la derivación (Referral). Para servir de filtro,
  `DateNav` admite `value: null` con `vacio` (*All dates*) y `onClear` (la ✕ al final del bloque). Sale `DateFilter` de
  estas tablas.
- **Lab order sin aire a los costados**: dentro de *General information*, desde 1280 px, los campos (laboratorio, fecha,
  ASAP, procedimientos) van a la izquierda y *Teeth & surface* (dentición, arcadas, dientes marcados, rueda y sus botones)
  a la derecha. Más angosto, uno debajo del otro. La lógica no cambia.
- **Details de Lab order**: *Dental work requested* y, debajo, *Special instructions*, los dos a todo el ancho.
- **Expiration date de Prescription en el título**: los tres datos comparten grilla (rótulo arriba a 8 px y el valor a la
  altura del campo, 36 px), separados por una línea; antes el rótulo quedaba pegado al campo porque los otros dos eran
  texto chico (`EncabezadoFicha`: con `campo`, `datos` toma la grilla de formulario).

**A validar con usuarios:** si filtrar por mes alcanza o piden un rango libre; y si *Today* se entiende como "este mes"
en una tabla.

## CON-4157 · CON-4156 · End Encounter: sin rótulo y Edit / historial dentro del mismo drawer (2026-11-27)

**Jira:** CON-4157 (HU 4, el drawer End Encounter), CON-4156 (HU 3: *Edit* "respeta las reglas existentes", o sea el Edit
procedure de siempre), CON-4158 (HU 5, el historial), CON-4211 y CON-2529 (el estimado dentro de Edit procedure). Pedido
de Julián sobre el drawer: "el título *appointment procedure* aparece expandido, no debe ser así, sacalo" y "cuando pongo
edit procedure el flujo es el de la tabla de Procedures; no me gusta cómo se superpone en el drawer, buscaría otra idea
pero que no se superponga".

**El problema.** *Edit* y *View execution history* abrían un segundo drawer encima de End Encounter. El de Edit es más
angosto (480 px contra 560), así que a su izquierda quedaba asomando una franja del de atrás con los nombres cortados:
dos paneles, dos X y dos pies a la vista.

**Decisiones**

1. **Sin el rótulo *APPOINTMENT PROCEDURES · N*.** El drawer tiene una sola lista y el título ya dice qué es; el rótulo
   en versalitas repetía. `ListGroup` va sin `title`, con `label` para el lector de pantalla (ahora nombra la sección
   también sin título).
2. **Un solo drawer con tres vistas** (`EndEncounterDrawer`): la lista, *Edit procedure* y *Execution history*. Lo que se
   abre desde el ⋮ de una fila **reemplaza** el contenido del drawer (título, pestañas, contenido y pie) en vez de apilar
   otro: entra desde la derecha (`paso-entra`, la animación de los pasos) y al volver la lista entra desde la izquierda.
   Mismo ancho (`lg`) en las tres, para que el panel no salte.
3. **Cómo se vuelve:** en Edit procedure, *Cancel* y *Save* (con el aviso `D3330 updated.`); en el historial, *Back*. La X
   y Escape vuelven **un paso** (a la lista), no cierran End Encounter: es lo que hacía antes la X del drawer de arriba, y
   evita perder el cierre del encuentro por querer salir de la edición. Al volver, el foco queda en el ⋮ de la fila de la
   que se salió y esa fila queda a la vista.
4. **Edit es el Edit procedure de las tablas** (cierra el "a confirmar" del 2026-11-25): General information, Findings,
   Diagnostic y Estimate, con un solo Save. `EditProcedureDrawer` expone sus partes con `useEdicionProcedimiento` (título,
   pestañas, pie y contenido) para mostrarse en un drawer que ya está abierto; el componente sigue igual para el resto.
   Se guarda nota, proveedor, vínculos y estimado en el procedimiento del turno (`guardarEdicionCita`, reemplaza a
   `guardarNotaCita`); no toca el estado ni las fases.
5. **El estimado se ve bloqueado** (*Estimate locked*): un procedimiento del turno ya está en un caso aceptado, y el
   estimado sólo se edita en Planning (CON-2529). El texto es el de `bloqueoEstimadoDe`, con "This treatment case" en
   lugar del nombre del caso.
6. Las preguntas sí/no (*Complete procedure?*, Refer, Discard, Discontinue) siguen como `ConfirmDialog`, y *View clinical
   note* del historial sigue abriendo el visor de documentos a pantalla completa: no son drawers apilados.

**Alternativas descartadas:** Edit al costado del drawer (el `aside` de New Appointment): no se superpone y deja la lista
a la vista, pero necesita más de 1000 px y en tablet y celular habría que caer igual en el reemplazo, o sea dos
comportamientos. Edit desplegado dentro de la fila: cuatro pestañas no entran en una fila compacta. Cerrar End Encounter
y abrir Edit como drawer aparte: parpadea el fondo y el panel vuelve a entrar.

**Anomalías y pendientes**

1. **Inventado para el mock:** la *Creation date* de cada procedimiento del turno (`fecha` en `data/ejecucion.ts`). El
   proveedor es el del turno hasta que se cambia en Edit; el fee, el UCR del código.
2. Los procedimientos del turno no dicen de qué caso son (el mock no los une con `treatment-plan.ts`, pendiente desde el
   2026-11-25): por eso el aviso del estimado no nombra el caso.
3. `DialogoEditar` (el drawer que sólo editaba la nota) ya no se usa en la app: queda en `accionesProcedimiento` y en su
   story hasta que se limpie.
4. Al cambiar de vista el título del drawer cambia pero el lector de pantalla no lo anuncia solo (el foco queda en el
   panel). A revisar si se documenta el patrón para otros drawers.

**A validar con usuarios:** si queda claro que *Edit procedure* es un paso dentro de End Encounter y no otra pantalla (se
vuelve con Cancel, Save o la X); si esperan que la X cierre todo; y si en el cierre del encuentro alguien necesita ver la
lista mientras edita (ahí pesaría la opción del costado).

Código: `clinical/EndEncounterDrawer.tsx` (`HistorialEjecucion` reemplaza a `ExecutionHistoryDrawer`),
`clinical/dental/EditProcedureDrawer.tsx`, `ui/list-group.tsx`, `lib/ejecucion.ts`, `data/ejecucion.ts`,
`tests/clinical-mode.e2e.ts`. Storybook sin tocar.

## CON-2214 · CON-2212 · CON-2321 · Recorrido de QA de Lab order y sus arreglos (2026-11-28)

Julián pidió recorrer la app para ver si lo nuevo está bien. Un agente recorrió Lab order de punta a punta sobre el link
de prueba (tabla, filtros, New, Teeth & surface, acciones por estado, documento) y lo que sigue se confirmó en el código y
en pantalla antes de corregirlo. Los arreglos de formulario se aplican igual a Prescription y Referral.

1. **Request / Activate desde la ficha con cambios sin guardar perdía esos cambios.** El ⋮ de la ficha cambiaba el estado
   sin guardar el formulario: la orden quedaba Requested (ya no se edita) con el contenido viejo, y la ficha seguía
   mostrando lo nuevo como si se hubiera guardado. Ahora, si hay cambios, *Request* (Lab order, Referral) y *Activate*
   (Prescription) validan y guardan antes de preguntar; con errores, los muestra y no pregunta. Sin cambios, pasa como
   desde la tabla. Además la ficha se vuelve a armar cuando cambia el estado (`key` con el estado): después de *Cancel* no
   queda a la vista lo que no se guardó.
2. **El documento de una orden nueva salía a nombre de otra paciente.** `ClinicalMode` buscaba al paciente en `PATIENTS`
   y, si no estaba (la ficha de prueba `john-smith`), tomaba el primero de la lista. Ahora sólo pasa el nombre si el
   paciente existe; si no, queda el de la ficha de prueba, igual que los registros de ejemplo.
3. **Los procedimientos vinculados no salían en el documento** aunque la 4ª vuelta decía que van dentro de *Dental Work
   Request*. Salen debajo del trabajo y las indicaciones, uno por renglón con su código y su diente. El texto libre de los
   PDF conserva los saltos de línea (`.texto { white-space: pre-line }` en `pdfs/marco`).
4. **Lo creado con New no aparecía en Pending task del paciente.** Ahora entra al Patient Dashboard mientras siga
   pendiente (`creadosDe`), y *Complete this task* abre su ficha (`ClinicalMode` busca la tarea también entre los
   registros). El Dashboard de la clínica no cambia: sus tareas son las del día de ejemplo.
5. **Formulario:** el error de un campo se va al corregirlo, sin esperar al próximo *Save*; un laboratorio o un provider
   escrito a mano vale si coincide con uno de la lista (sin distinguir mayúsculas) y, si no coincide, el mensaje dice
   *Select a laboratory from the list.* / *Select a provider from the list.* en vez de *This field is required.*; *New
   laboratory* y *New provider* quedan alineados con su campo también cuando hay error.
6. **Rueda de superficies:** la letra de arriba y la de abajo caían sobre la línea que separa las dos franjas de su
   zona; van en la franja de adentro.

**Segunda pasada: Prescription y Referral** (mismo día, recorrido acotado de dos agentes, confirmado acá antes de tocar):

7. **Activate con la medicación ya activa no activaba.** Desde el ⋮ de la ficha con cambios, la pregunta de CON-2846
   (*Medication already active*) guardaba y volvía a la tabla sin seguir con *Activate*. Ahora *Reuse existing medication*
   guarda y sigue con la pregunta de *Activate*.
8. **La pregunta de CON-2846 se repetía en cada Save.** *Reuse existing medication* deja *Update patient medications* sin
   tildar en esas medicaciones: el paciente ya la tiene, no hay que volver a sumarla. Si se vuelve a tildar, pregunta otra vez.
9. **Vencimiento de la receta en el día de hoy:** decía *Date cannot be in the past*. CON-2230 pide de mañana a seis
   meses; ahora dice *The expiration date must be after today.* y lo pasado sigue con *Date cannot be in the past*.
10. **New provider no validaba el formato** (sí lo hacía New laboratory): mail (*Enter a valid email.*), ZIP sólo números,
    *Area code* de 3 y *Number* de 7 dígitos, con los mismos mensajes. Y **sus datos no llegaban al documento**: *Referred
    to* decía *Phone: - · Email: - · Address: -*; ahora lleva teléfono, mail y dirección del provider creado (los de
    ejemplo no tienen esos datos y siguen con *-*).
11. **El documento de la receta decía *Additional indications*** y la ficha *Additional instructions*: queda el de la ficha.
12. **El título para lector de pantalla de Clinical Mode** decía *Mara Otero* en la ficha de prueba (mismo origen que el
    punto 2); dice *John Smith*.
13. **Tablet (768 px):** el buscador de las tres tablas se achicaba hasta mostrar *Sea*; con un ancho mínimo, la barra
    baja de renglón.

**Anotado y sin tocar** (detalles, no rompen el flujo): al pasar a Expired o Canceled, el PDF de la fila se apaga (es la
regla de `conPdf`, a confirmar si el documento de una receta vencida tiene que seguir a mano); la tabla no se reordena cuando cambia *Last update*; volver de
una ficha abierta desde la página 2 deja la tabla en la 1; cambiar de pestaña con una ficha nueva cargada la descarta sin
avisar; el contador 0/500 se oculta mientras el campo muestra un error (es así en toda la app).

## CON-2731 · CON-2727 · CON-2728 · CON-2730 · Patient Summary: el flujo completo (2026-11-27)

**Jira:** epic CON-2724 *Nota Clinica*. CON-2731 (la lista), CON-2728 y CON-2816 (la nota se genera al abrirla),
CON-2937 (la que se genera sola a las 48 h), CON-2726 y CON-2727 (firma), CON-2730 (addendum), CON-3508 (quién ve y
quién firma), CON-4158 (los textos *No clinical note* y *Access restricted*) y los bugs que fijan el comportamiento de la
lista: CON-3016 (la pestaña se llama *Patient Summary*), CON-3773 (al volver se conserva la página), CON-3166 (el estado
se actualiza sin recargar), CON-3023 (*Download started*), CON-3012 y CON-3539 (el tilde verde).

Pedido de Julián: armar el flujo de `red.dev/…/clinical-mode/treatment-history` alineado a la app, sin piezas nuevas. La
pestaña era el placeholder *Planned*. **red.dev pide login y no se pudo entrar desde la sesión**: la lista sale de la
réplica que ya había en `clinical/panels.tsx` (hecha mirando red.dev), de sus rutas públicas
(`/treatment-history` y `/treatment-history/:clinicalNoteId`) y de Jira; la nota y su PDF, de los videos del 2026-11-20
(dashboard.md). Lo que no se pudo ver está en *A validar*.

Código: `clinical/PatientSummaryPanel` (la tabla), `clinical/PatientSummaryNote` (lo que abre el ojo), `data/historial`
(los encuentros de ejemplo, con las variables de la plantilla *Clinical note*), `lib/historial` (firmar, addendum y la
hoja de cada encuentro) y `ui/document-html` (la hoja de una plantilla dentro del visor). Se borra la réplica de
`panels.tsx` y `TREATMENT_HISTORY` de `data/mock`.

### La lista

- **Mismas columnas que red.dev**, con `ui/data-table`: *Date* (con *Latest* en el más nuevo y la zona horaria debajo),
  *Status*, *Clinical note*, *Reason for appt*, *Provider*, *Procedures*, *Exams*, *Ref*, *Lab*, *Prescription* y
  *Actions* (el ojo). Pie estándar: *Showing 1 to 10 of N results*, *Rows per page* y paginador; 10 por página.
- **Pills con los tonos de la app:** el encuentro, con los de los turnos (Fulfilled verde, Cancelled rojo) más In
  progress azul, On hold ámbar, Completed violeta y Discharged gris (`TONO_ENCUENTRO`); la nota, *Signed* verde y
  *Unsigned* ámbar, como en el historial de un procedimiento (End Encounter). Sin nota, *No clinical note*; sin permiso,
  el candado y *Access restricted* (CON-4158).
- **Procedures:** el primer código en un chip y el resto detrás de "+N", que los despliega en la fila (`ChipMas`, como
  las medicaciones de una receta). El nombre, el diente y el estado, al pasar el mouse. Chip gris: el celeste se pierde
  sobre la fila elegida.
- **Exams, Ref, Lab y Prescription:** tilde verde si en el encuentro hubo (CON-3012, CON-3539) y cruz roja si no, como
  red.dev. Las reglas son las de los eventos del encuentro: un examen con hallazgos (CON-3668), una orden o derivación
  que salió de Pending, una receta que pasó a Active (CON-2614 a CON-2616).
- **Barra:** *Filter* (Status y Provider, CON-2731), la fecha y *Download*.
- **Selección y Download:** casilla por fila y en el encabezado. *Download* junta las notas elegidas, con sus addenda, y
  avisa *Download started* (CON-3023). El archivo lo arma el backend con la plantilla; en el prototipo se abren en una
  pestaña con ese diseño, una nota por página (`hojasJuntas`). Sin nada elegido avisa *Select at least one clinical note
  to download.*, como Documents.
- **Sin nota o sin permiso** (encuentro cancelado; nota de otro provider sin *Read Clinical Note*): la fila se ve
  atenuada, sin ojo ni casilla (`isRowDisabled`).
- **El encuentro de hoy** entra a la lista cuando se toca *Start encounter* y toma su estado de la barra: In progress,
  On hold y, al cerrarlo, Completed o Discharged (`cerrarEncuentroHoy`). *Review and sign* del diálogo de cierre lo deja
  Fulfilled y Signed. Antes de empezar no aparece: Planned no se lista.

### El ojo

Abre la Clinical Note del encuentro en `ui/document-viewer`, a pantalla completa, **sin salir de la pestaña**: al volver,
la página, los filtros y lo elegido siguen como estaban (CON-3773). La nota abierta va en la URL (`?note=<id>`), como la
ruta de red.dev: se puede compartir y el Atrás del navegador la cierra. Tocar la fila hace lo mismo que el ojo.

Siempre: *Back to history*, *Clinical note - <paciente>*, la pill de la nota, *View PDF* y *Preparing document...* un
momento, como red.dev. Lo demás depende del encuentro y de la nota; el aviso aparece sólo cuando no se puede firmar:

| Encuentro · nota | Aviso | Acción |
|---|---|---|
| In progress, On hold o Discharged · Unsigned | *The clinical note can only be signed when the encounter is completed.* (CON-2727) | Ninguna |
| Completed o Fulfilled · Unsigned, propia | Ninguno | *Sign clinical note* |
| Completed o Fulfilled · Unsigned, de otro provider | *Only <provider>, the provider of this encounter, can sign this clinical note.* (CON-3508) | Ninguna |
| Signed | Ninguno | *Add addendum* |

- **Firmar** pide el usuario y la contraseña otra vez (*Login to sign document*, el mismo diálogo de la nota de Pending
  Task). Firmada, la nota no cambia más, el encuentro Completed pasa a Fulfilled y la lista lo muestra sin recargar
  (CON-2727, CON-3166).
- **Add addendum** (CON-2730, CON-3008): en toda nota firmada. Drawer de un solo campo y *Sign and save*, que también
  pide el login. Queda en *Addenda*, después de la firma, a nombre de quien lo escribe; no se edita ni se borra. Se
  pueden sumar varios.
- "Propia" es la del provider de la sesión (`PROVIDER_SESION`, el de la barra de la app). No hay permiso de firma: firma
  quien atendió (CON-3306, cancelada, lo decía así; CON-3508 lo mantiene).
- La nota que se generó sola a las 48 h lo dice adentro del documento (el aviso de la plantilla) y no trae *Workflows*
  (CON-2937).

### La nota y el PDF

- **El documento es la plantilla *Clinical note* de `src/pdfs`** (el diseño nuevo de los PDF, el que recibe el backend),
  completada con los eventos del encuentro (`datosNota`, `hojaNota`). **La misma hoja se ve en el visor y abre *View
  PDF***: lo que se lee es lo que se imprime. `ui/document-html` la muestra en un iframe que toma el alto del contenido;
  en el celular la hoja se acomoda al ancho.
- **Contenido, el de la plantilla y en su orden, sólo lo que se hizo** (CON-2975): *Vital Signs*; *Medical History*
  (condiciones, medicación, alergias, cirugías, *Chief Complaint* y *Triage* del encuentro, y *Patient History* con
  Family, Oral y Social, CON-3081 y CON-3605); *Exams* (CON-3668); *Treatment Plan* con el *Consent Summary*;
  *Operative Report*; *Workflows*; *Prescriptions*; *Lab Orders*; *Referrals*; *Additional Notes*; la firma del
  provider con fecha y hash (CON-2727) y, después, *Addenda*. Sin firma del paciente.
- *View PDF* abre la hoja en una pestaña nueva, titulada *Dental Clinical Note — <paciente>*, como los documentos de Lab
  order, Prescription y Referral (`abrirHoja`).
- La historia médica es del paciente (`HISTORIA_PACIENTE`): va igual en todas sus notas.

### Decisiones

1. **La fecha se filtra con el bloque del Dashboard, por mes** (`ui/date-nav`), como Lab order, Prescription y Referral
   desde la 6ª vuelta del mismo día. red.dev y CON-2731 piden un rango: queda en *A validar*, junto con el de las otras
   tres tablas.
2. **Filter con Status y Provider**: red.dev sólo tiene la fecha; CON-2731 pide los tres. Se usa el `FilterMenu` de las
   tablas hermanas.
3. **Tilde verde y cruz roja, como red.dev** (`CircleCheck` y `CircleX`). La primera versión ponía una raya en lugar de
   la cruz; Julián pidió la cruz (2026-11-28).
4. **El ojo queda a la vista**, no dentro de un ⋮: es la única acción de la fila y la que se usa siempre.
5. **La columna se llama *Clinical note***, como en el resto de la app; red.dev dice *Clinic note* (anomalía).
6. **Download habilitado siempre**: red.dev lo apaga sin selección, sin decir por qué. Acá avisa qué falta, como
   Documents. El botón lleva la cantidad elegida.
7. **El aviso del visor sólo cuando algo impide firmar.** La primera versión avisaba en todos los casos (firmada, a la
   espera de firma, generada sola): era ruido que red.dev no tiene.

### Anomalías y límites

1. CON-2731 nombra la columna de recetas *Active*; red.dev, *Prescription*. Se deja la de red.dev.
2. CON-3058 (bug): "al seleccionar *Date* deben marcarse todos los encounters de esa fecha". No queda claro qué control
   es; la casilla del encabezado elige toda la página.
3. *Review and sign* del cierre del encuentro firma sin mostrar la nota (Figma 4540:27072); CON-2726 dice que la muestra
   y que firmar es otro paso. No se tocó: se propone aparte que abra esta misma nota con *Sign clinical note*.
4. Cerrar el encuentro desde la ficha del paciente (no desde Clinical Mode) no deja la fila en la lista: sólo la barra de
   Clinical Mode llama a `cerrarEncuentroHoy`.
5. Los encuentros de la lista y los del historial de un procedimiento (`data/ejecucion`) son datos de ejemplo distintos.
6. Las credenciales del login no se validan (CON-3648 pide que sean las del provider que firma).
7. El paciente es el de la barra de Clinical Mode (Julio Perez), con cualquier id de la ruta.

**A validar (con red.dev abierto y con usuarios):**

- Qué hace el ojo de red.dev en un encuentro cancelado y en uno In progress, y si el detalle muestra algo más que *Back
  to history*, *View PDF* y *Sign clinical note*.
- Dónde está *Add addendum* en red.dev y cómo se ve el addendum en su PDF (acá sale de CON-2730).
- Si *Download* de varias notas baja un archivo por nota, un ZIP o un PDF combinado.
- Si el provider necesita ver el motivo de *Access restricted* o pedir el acceso desde la fila.
- Si el filtro por mes alcanza para buscar una visita vieja o hace falta el rango (también en las otras tres tablas).
- Que el texto de la nota coincida con el de red.dev sección por sección: sale de la plantilla de `src/pdfs`, no de
  mirar la nota real.

### Segunda vuelta (2026-11-28): devolución de Julián

Sobre el link de prueba: *"faltan las cruces rojas"*, *"el pdf no está alineado al nuevo diseño de pdf y el documento no
dice lo mismo… le falta información, le falta el add addendum… le sumaste cosas que no van"*. Lo de arriba ya está
corregido con esto:

1. Vuelve la cruz roja en Exams, Ref, Lab y Prescription.
2. La nota deja de dibujarse con `VistaDocumento` y `pdfDeDocumento` (el formato de una página de la nota de Pending
   Task, con secciones numeradas) y pasa a la plantilla *Clinical note* de `src/pdfs`, en pantalla y en el PDF. Con eso
   entra lo que faltaba: Chief Complaint, Triage, Patient History, Treatment Plan y Consent Summary, el detalle de cada
   orden y el hash de la firma.
3. *Add addendum* aparece en toda nota firmada (antes sólo en las propias).
4. Se van los avisos informativos del visor y el subtítulo con fecha y provider.
5. Se vuelve atrás lo que la primera versión le había sumado a `documentoTarea` (páginas, `aviso`, `adendas`,
   `descargarDocumento`) y a `ui/document-sheet` (`appendix`): ya no hace falta.

**Queda distinto:** la Clinical note de Pending Task (`pages/ClinicalNote`) sigue con el formato anterior. Pasarla a la
misma plantilla es un cambio chico; espera el ok.

### Tercera vuelta (2026-11-28): el contenido de las notas de red.dev

Julián pasó dos Clinical Notes de red.dev en PDF (la más completa, del 08/20/2026, y una con sólo el peso, del
08/13/2026) y los links a esas notas (`/treatment-history/<encounter>?page=2`). Los links piden login y no se pudieron
abrir; los PDF sí. Con eso:

1. **La plantilla *Clinical note* de `src/pdfs` pasa al contenido de red.dev**, con el diseño nuevo de los PDF (ver
   `pdfs.md`). Orden de red.dev: *Medical History*; *Exams* con *Review of Systems (ROS)* (tabla System / Negative /
   Positive), *Vital Signs* (tabla Measurement / Value; antes era una lista y una sección aparte), *Physical
   Examination* (*Positive for …* / *Negative for …* por zona), *Extraoral Examination* (*The extraoral examination
   revealed:* … *All other extraoral structures appeared normal.*) e *Intraoral Examination* (igual, con *identified*);
   *Prescription* (*The following medication(s) was prescribed to the patient:*, la droga, *Take … for …*, *Dosage
   form*, *Documents sent*); *Lab Order* (*Lab order sent to …*, *Lab work requested*, *Case* con sus procedimientos,
   *Special instructions*, *Documents sent*, *Expected return*); *Additional Notes*; *Provider* con nombre y fecha.
   *Prescription* y *Lab Order* en singular, como red.dev.
2. **Sale lo que red.dev no imprime:** Chief Complaint, Triage, Patient History, Treatment Plan y Consent Summary,
   Operative Report, Workflows y el hash de la firma. Dental Assessment, Radiographic, Periodontal y Referral quedan en la
   plantilla porque los pide Jira (CON-2975), y sólo salen si el encuentro los tiene.
3. ~~La columna *Exams* no cuenta los signos vitales~~ — corregido en la cuarta vuelta: en red.dev sí cuentan. Se suma
   un encuentro con sólo el peso (08/12/2026, Andy Davis).
4. **La columna *Procedures* no sale de la nota:** en la de red.dev el D2140 de la fila aparece dentro de la orden de
   laboratorio (*Case*), no como un *Operative Report*. Cada encuentro tiene sus procedimientos aparte (`procedimientos`).
5. Los encuentros de ejemplo (`data/historial`) usan los campos nuevos (`ros`, `vitals`, `physical`,
   `extraoral_findings`, `intraoral_findings`…).

**Anomalías de red.dev** (se copian donde aplica, se anotan):

- La fecha de la nota de Andy Davis dice 08/13 y la fila de la lista, 08/12: es el corrimiento de zona horaria de
  CON-3038.
- En la lista de red.dev la fila del 08/20 tiene tilde en *Ref*, pero la nota no trae ninguna derivación.
- *Take 1.0 applications as needed* y *Expected return: 2026-09-30* (fecha ISO, no MM/DD/YYYY): se copia el formato.
- La firma de red.dev dice *Date:* vacío aunque la nota esté firmada.

**Todavía sin ver en red.dev:** qué hace el ojo en una fila cancelada (red.dev muestra *Unsigned* también ahí), cómo
se ven *Add addendum* y los addenda, y el *Download* de varias.

### Cuarta vuelta (2026-11-28): recorrido en red.dev

Julián pasó un usuario de red.dev y se recorrió Patient Summary (página 2 del paciente *AAA test AAA*) sin guardar ni
firmar nada. Pidió además: *"el add addendum no funciona así, fijalo bien como está en red"* y *"el mensaje 'the clinical
note…' eso no va"*.

**Cómo se comporta red.dev:**

| Qué | red.dev |
|---|---|
| Barra | *Filter by date range* (dos meses, *Clear Filter*) y *Download*, apagado hasta elegir; con elegidas, *2 Selected · Clear*. Sin buscador ni Filter. |
| Filas | Todas con casilla y ojo, también la cancelada (que dice *Unsigned*). *Procedures* abre un desplegable *Procedures (1)* con código y nombre. |
| Exams, Ref, Lab, Prescription | Tilde verde o cruz roja. Los signos vitales solos marcan *Exams*. |
| Ojo · firmada | *Back to History*, *Clinical Note - <paciente>*, *View PDF*, la nota y, abajo al centro, *Add Addendum*. Sin aviso. |
| Ojo · sin firmar | Igual, con *Sign Clinical Note* abajo; también en la nota de otro provider. Sin aviso. |
| Ojo · cancelada | *Clinical note can only be rendered for an active or finished encounter* y *Return*; *View PDF* apagado. |
| Add Addendum | Pop up centrado *Add Clinical Note Addendum*: *Authentication required to sign this addendum*, *Addendum Content* (*Type your addendum here...*), una línea, otra vez *Authentication required…*, *Email* y *Password* lado a lado y *Save Addendum*, apagado hasta completar. |
| Sign Clinical Note | *Login to Sign Document* (el mismo de Pending Task). |
| Download | Un PDF por nota elegida (`document-<id>.pdf`). La firmada dice *Date: <fecha>*; los signos vitales fuera de rango, *(Out of range)*. |

**Lo que cambia en la app:**

1. **Add addendum como red.dev:** un solo pop up con el texto y el login, y *Save addendum*. Es el mismo diálogo de la
   firma (`FirmarDialog` con `addendum`); se va el drawer. Botón primario, como *Sign clinical note*.
2. **Sin avisos arriba de la nota:** se va *The clinical note can only be signed…* (y cualquier otro).
3. **Cancelada:** se abre con el error de red.dev (`EmptyState` con *Return*) y *View PDF* apagado; en la lista dice
   *Unsigned*, como red.dev. *Download* no baja nada de un encuentro cancelado.
4. **Firmar una nota ajena:** *Sign clinical note* aparece en toda nota sin firmar de un encuentro cerrado; el login dice
   quién firma (CON-3648). Con el encuentro abierto, sigue sin aparecer.
5. **Exams cuenta los signos vitales.**
6. **Download apagado** hasta elegir alguna fila.

**Se mantiene distinto de red.dev, a propósito:** la fecha con el bloque de mes (`ui/date-nav`, como las otras tres
pestañas, decisión de Julián del 2026-11-27) en lugar del rango; *Filter* (Status y Provider, CON-2731); los
procedimientos con chip y "+N" (como Medication); la pill de la nota en la barra del visor; *Download* abre las notas
juntas en una pestaña, una por página, porque el PDF de cada una lo genera el backend.


## CON-2214 · CON-2212 · CON-2321 · Lab order, Prescription y Referral como red.dev: ⋮, Confirm en azul, sólo Filter y fichas (2026-11-28)

Devolución de Julián con cuatro videos de red.dev y los links a las tres pestañas. Se relevó red.dev en sólo lectura
(menús por estado, los 12 diálogos, las fichas, New y los PDF reales) además de los videos; nada de esto está en una
historia nueva: son correcciones sobre CON-2214, CON-2212 y CON-2321 (y CON-2584, CON-2356, CON-2220).

### Qué cambió

1. **El ⋮ de las tablas, como red.dev.** Encabezado *Options* y, fuera de Pending, **Edit sigue primero pero apagado**,
   con el tooltip de red.dev ("This lab order can only be edited while Pending."). Un estado final muestra sólo ese Edit.
   Sale *View*: la fila abre la ficha. Orden e íconos de red.dev (lucide):
   - Lab order · Pending: Edit (pencil), Request (send), Cancel (ban), Delete (trash-2). Requested: Edit apagado, Reject
     (circle-x), Deliver (package-check), Delay (clock), Cancel. Delayed (red.dev no tiene ninguna): Edit apagado, Reject,
     Deliver, Cancel.
   - Prescription · Pending: Edit, Activate (power), Cancel. Active: Edit apagado, Cancel, Expire (timer-off).
   - Referral · Pending: Edit, Request, Cancel. Requested: Edit apagado, Complete (check-check), Reject, Cancel.
   `ItemsTarea` / `MenuTarea` suman `editarApagado`; el ⋮ de la ficha y el de Pending Task siguen como estaban.
2. **Delete de Prescription y Referral es el tacho de la fila** (columna *Delete*, entre el PDF y el ⋮, como red.dev), con
   `ICONO_TACHO`; sólo en Pending (CON-2356), apagado en el resto. En Lab order sigue en el ⋮, como red.dev.
3. **Toda pregunta se contesta con *Cancel* / *Confirm*, y el Confirm va en azul**, también en Reject, Cancel y Delete
   ("pasamos todos los botones en vez de rojo azul"). Ícono de aviso en el título, como red.dev. Los textos no cambian.
   Vale para las tres pestañas, sus fichas y Pending Task (comparten `PREGUNTAS`). El rojo queda en las opciones del ⋮.
4. **La barra de la tabla trae sólo *Filter*** (a la izquierda, donde estaba) y *New …* a la derecha: salen el buscador y
   el filtro de fecha. En las tres, como red.dev.
5. **El documento, sin cambios** (ya seguía a red.dev): Lab order desde que se pide; Prescription mientras está Active;
   Referral mientras está Requested (el código de red.dev: `documentId: "REQUESTED" === status ? … : undefined`). En
   el resto, el ícono se ve apagado.
6. **Fichas.**
   - *New*: sin quién ni cuándo en el título (todavía no existe), en las tres.
   - Lab order: *Delivery expiration date* sube al título, como en Prescription y en red.dev; *ASAP* queda debajo del
     laboratorio.
   - Prescription: los tres checks pasan a switch con Yes / No (`settings/primitives` › `Toggle`, que suma `disabled`);
     *Add medication* pasa a **New medication**, botón azul; quitar una medicación es el tacho de sólo ícono al lado de
     las pestañas.
   - Referral: *ASAP* y *Mandatory to continue treatment* van debajo de *Procedures*; salen "Only planned procedures can
     be referred." y "No procedures linked." (este último también en Lab order: es el mismo bloque).

### Anomalías y supuestos

1. **"El ícono del trash acomodalo como hicimos en waiting room"**: no encontré un tacho en Waiting Room. Se tomó como el
   formato único del tacho (`ICONO_TACHO`, el de *Set working hours*): en la fila de la tabla y al lado de las pestañas
   de medicación. A confirmar con Julián.
2. **El documento de la Referral sólo existe en Requested** en red.dev (se apaga al completarla o rechazarla). Julián:
   "el pdf sólo se puede ver si pasó del estado request": se leyó como esa misma regla. Si quiere que siga a la vista
   después, es un cambio de una línea (`conPdf`).
3. **Delete en red.dev dice *Continue*** en Prescription; acá, *Confirm* como el resto.
4. **Estados:** red.dev escribe *Cancelled*; la app, *Canceled* (decisión anterior). No se tocó.
5. **Filter de red.dev** trae además un rango de fechas adentro; Julián pidió sacar el filtro de fecha y no se sumó.
6. El primer Escape sobre el Edit apagado cierra su tooltip y el segundo, el menú (igual que las opciones apagadas de
   Pending Task).

### Para validar

- Con odontólogos: si alcanza con Edit apagado + abrir la fila para ver una orden que ya no se edita, o hace falta un
  *View* explícito.
- Con recepción: Confirm en azul para Cancel y Delete (acciones que no se deshacen): que no se confirme sin leer.

### Revisión (2026-11-28, misma tanda)

- *Medication already active* (CON-2846) también se contesta con *Confirm*, como el resto de las preguntas.
- Lab order: el error de la fecha se borra al cambiarla (ya lo resolvió #220: los errores se derivan de los valores).
- La tira de medicaciones no baja de renglón en celular: el tacho queda al lado y las pestañas scrollean.
- Vacío con filtros: "Try different filters." (Referral no filtra por provider).
- Clinical Mode con un paciente que no está en la lista (`john-smith`): los registros nuevos quedan a nombre de John
  Smith y no del primero de la lista.
- Pendientes (baja): el foco se pierde después de borrar con el tacho de la fila; el tacho y el PDF apagados explican el
  motivo sólo con `title` (no por teclado); `ui/date-nav` conserva `vacio` / `onClear` sin uso.

## CON-2214 · CON-2212 · CON-2321 · Lo que faltaba para coincidir con red.dev (2026-11-28, segunda pasada)

Julián pidió navegar red.dev y que el flujo coincida "perfectamente". Se recorrió en sólo lectura (sin crear, cambiar ni
borrar nada): las tres tablas con su *Filter* y el ⋮ por estado, *New* de cada una con *Save* vacío, la ficha de una
Pending y de una cerrada, el tacho de Referral y Pending Task del Dashboard. Casi todo ya coincidía después de la sección
anterior; esto es lo que quedaba:

1. **Teeth & surface arranca con el dibujo a la vista**, en *Permanent*, sin los botones *Initialize permanent / primary
   dentition*: red.dev ya no los tiene. Vincular un procedimiento con un diente temporario pasa a *Primary*.
2. **La lista de dientes temporarios se llama *Pediatric***, como en red.dev (las pestañas siguen *Permanent* / *Primary*,
   también como red.dev).
3. **Prescription muestra la pestaña desde la primera medicación** (*Medication 1*), como red.dev; el tacho para quitar
   una aparece desde la segunda.
4. **El estado *Cancelled*** se escribe como en red.dev y en el resto de la app (Scheduling). Los textos de las preguntas y
   los avisos no cambian ("…mark this lab order as Canceled?", "…marked as Canceled."): son los de red.dev.

**Distinto de red.dev a propósito** (ya decidido, se deja igual):
- *Pending Task* no pide encuentro abierto (red.dev apaga el ⋮ con el tooltip *…no open encounter…*; Julián, 2026-11-27).
- *Delete* de una Prescription Pending: red.dev no lo ofrece, CON-2356 sí; queda el tacho de la fila.
- *Save* vacío en Referral muestra el aviso *Uncompleted fields* (red.dev sólo pinta los campos), igual que Lab order y
  Prescription; y debajo de cada campo, *This field is required.* (red.dev sólo lo pinta de rojo).
- Pending Task de red.dev lista también Lab orders *Cancelled* y *Rejected*; acá sólo las pendientes (CON-2641, CON-2643).
- El pie de la tabla dice *results* en las tres (red.dev dice *lab orders* en Lab order): es el pie de todas las tablas.

