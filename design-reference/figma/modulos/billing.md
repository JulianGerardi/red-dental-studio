# Billing

Figma 4481:9881, sección "Billing" con 4 pantallas hijas (todas nombradas
"Billing" a secas -hay que mirar el contenido, no el nombre de capa). No es
el mismo frame que "Relationships & Billing" de `modulos/relationships.md`
-ese es el tab de un paciente puntual; este es un módulo nuevo, de nivel
superior (`/billing`, ítem propio del rail), con vista de toda la clínica.

## Cómo se relacionan las 4 pantallas

No son pasos de un flujo ni pantallas separadas: son **estados de una sola
vista** "Billing Overview".

| Nodo | Qué muestra | En la app |
|---|---|---|
| `4481:9886` | Vacía: sin actividad, sin resultados | `actividad.length === 0` |
| `4481:10770` | Poblada, sin selección | estado por defecto |
| `4481:10051` | Poblada + modal "Post payment" (`4481:10480`) encima | `modal !== null` |
| `4481:11185` | Poblada + "Selected patient" (clic en una fila) | `seleccionado !== null` |

## La pantalla

Título "Billing" + tres botones de acción (Patient Payment (-) / Credit
Adjustment (-) / Charge Adjustment (+)) + exportar, cinco stat cards (Total
A/R, Patient A/R, Insurance A/R, Overdue Balance, Patients with Open
Balance), y dos columnas: **Recent Billing Activity** (tabla Date / Patient
/ Type / Description / Provider / Amount / Balance, con una tira de filtros
All / Pt Payment / Charge Adj / Credit Adj) a la izquierda, **Find Patient**
(buscador + resultados con avatar, "Last payment" y Balance) y **Today**
(Payments Posted Today / Adjustments created / Unapplied credits) a la
derecha. Clickear una fila de la tabla o un resultado de Find Patient abre
el panel "Selected patient" arriba de la tabla, con dos cards (Guarantor
Unapplied Credits / Guarantor Open Balance).

El Type de cada fila reusa el mismo vocabulario y los mismos tonos que la
columna Type del Ledger de paciente (`Ledger.tsx`, `detalleTipo`): Charge
muestra su código en vez de una pastilla genérica, Payment es "Pt Payment"
azul, Insurance es "Ins Payment" violeta, y Adjustment es "Charge Adj" rojo
o "Credit Adj" gris según el signo del monto.

## El modal "Post payment"

Se abre desde cualquiera de los tres botones de acción, con el campo Type
precargado según cuál se apretó. Estructura: buscador de paciente arriba
("Search Patients, guarantors,phone...."), fila de cuatro campos
(Transaction date* / Amount* / Type* / Apply to*), Notes, y la tabla
**Ledger Transactions** con los cargos abiertos del paciente elegido.

Reusa piezas que ya existían para el Ledger de un paciente puntual en vez de
reinventarlas: `ModalShell` + `FormFooter` -el mismo contenedor de modal que
usa el resto de la app, no un Dialog de shadcn ni un Drawer/Sheet- y
**`LedgerAllocationTable`** tal cual, el mismo componente que arma "Ledger
Transactions" en `PatientPaymentPanel` / `CreditAdjustmentPanel` del Ledger
de paciente. Lo único nuevo es el buscador de paciente de arriba, porque acá
no hay un paciente ya elegido de antes como en el Ledger de un paciente
puntual.

## Cómo se armaron los datos (`src/data/billing.ts`)

El Figma arma "Recent Billing Activity" y "Ledger Transactions" duplicando
una sola fila de relleno 8 y 10 veces -ver anomalías 77 y 82. Reproducir
eso tal cual habría dejado una tabla que no sirve para probar nada (todo el
mismo paciente, mismo balance, mismo cargo). En cambio, siguiendo el mismo
criterio que ya se usó en Accounts/Ledger/Ledger Options: el **copy
estático se replica tal cual** (labels, placeholders, typos), pero los
**datos de fila son originales**, variados y con saldo corrido real
(`conSaldo`, importado de `data/ledger.ts`) por paciente. Los nombres
"John Hayes", "Maria Abril Viola" y "Brent Crosby" se mantuvieron porque son
los que ya aparecen en el frame; "Diego Molina" y "Sophie Tran" son nuevos,
para tener más de tres cuentas distintas en "Find Patient".

## Anomalías del frame (75-90)

1. **(75)** La pantalla vacía no tiene título "Billing" ni los tres botones
   de acción que sí tienen las otras tres. **Corregido**: quedan siempre
   visibles -sin ellos no habría forma de postear el primer pago.
   *2026-10-09:* Julián pidió que los botones aparezcan sólo con un paciente
   elegido; el primer pago se postea eligiendo al paciente en Find Patient.
2. **(76)** "Overdue Balance" repite el valor exacto de "Insurance A/R"
   ($9,896.66 los dos). **Corregido** a un valor propio ($1,845.20).
3. **(77)** Las 10 filas de "Recent Billing Activity" muestran el mismo
   Balance ($1,230.00) pese a que el monto cambia fila a fila. **Corregido**:
   cada paciente arrastra su propio saldo corrido (`conSaldo`).
4. **(78)** "Find Patient" repite el mismo resultado ("Maria Abril Viola",
   Balance $120.00) cinco veces. **Corregido** con resultados distintos.
5. **(79)** Typo "Las payment {n}h ago" en cada resultado de Find Patient
   -falta la "t" de "Last". Se replica tal cual.
6. **(80)** Typo/espaciado "Search Patients, guarantors,phone...." en el
   buscador del modal. Se replica tal cual.
7. **(81)** El textarea Notes usa el placeholder literal "Placeholder", sin
   redactar uno real. Se replica -es el mismo criterio que ya usan
   `PatientPaymentPanel`/`CreditAdjustmentPanel`/`ChargeAdjustmentPanel`
   para el mismo campo.
8. **(82)** Las 8 filas de "Ledger Transactions" del modal son idénticas
   byte a byte (mismo paciente Brent Crosby, mismo código D7450, mismo
   monto), y la columna Provider dice "3 Hyg" -un código de procedimiento,
   no un nombre. **Corregido**: cargos variados, providers reales.
9. **(83)** "Amount not applied" y "Amount applied" mostraban el mismo
   valor ($430 los dos), que no tiene sentido lógico. **Se arregla solo**
   al reusar `LedgerAllocationTable`, que calcula los dos números de verdad
   a partir de lo que se tipeó en "Applied".
10. **(84)** Dos íconos de la pantalla "Selected patient" están nombrados
    "Icon / DollarSign" en la capa, pero uno de los dos renderiza en
    realidad un ícono de "grupo de personas" -instancia swapeada sin
    renombrar. No afecta la implementación: se usó el ícono que corresponde
    al significado real de cada card.
11. **(85)** El ícono de "descarga" del header está nombrado "Icon /
    CircleHelp" en la capa pero el componente real es una flecha hacia
    abajo. Se implementó como el mismo botón "Export statement" que ya
    existe en el Ledger de paciente, ícono `Download` incluido.
12. **(86)** Los tres botones de acción comparten el mismo ícono genérico,
    sin distinción entre ellos. **Corregido**: cada uno con su propio ícono
    (billetera / círculo menos / círculo más), a tono con su +/-.
13. **(87)** El texto "Selected patient: John Hayes · Guarantor" vive en una
    capa nombrada "Recent Billing Activity" en el dump de `get_metadata`.
    Sólo se ve el texto real pidiendo `get_design_context` de ese nodo
    puntual -mismo aviso que ya deja `figma_design_system_quirks`: no
    confiar en el nombre de capa de la metadata.
14. **(88)** La tira de filtros de tipo (All / Pt Payment / Charge Adj /
    Credit Adj) no cubre todos los tipos que aparecen en la tabla (Ins
    Payment, o un cargo mostrado con su código). Se replica tal cual: son
    los cuatro filtros que el propio Figma ofrece: el resto sólo se ve bajo
    "All".
15. **(89)** El campo "Amount" del modal se ve con una flechita de
    dropdown en el Figma, aunque es texto libre -mismo patrón de componente
    genérico reusado que la anomalía 86. Se implementó como campo de texto
    simple, sin dropdown.
16. **(90)** Un control "Month / Day / Week" aparece en el `get_metadata`
    de la pantalla vacía pero no se ve en ningún screenshot renderizado de
    ninguna de las 4 pantallas. Se interpreta como un nodo oculto/sin uso
    del archivo y no se implementa.

## Cards con sombra, sin borde (2026-10-06)

Julián pidió que en toda la app las cards generales lleven la sombra de los paneles del Dashboard en vez de stroke.
En Billing: las cinco tarjetas de números, Recent Billing Activity, Find Patient y Today. Las cards de adentro siguen con borde fino y sombra suave (`InnerCard`). Ver *Elements / Cards*.

## Cards como en Patients y el paciente elegido marcado (2026-10-09)

Pedido de Julián: que el paciente elegido para ver Recent Billing quede marcado con el celeste del rango nuevo de
Coverage Table; sacar los íconos de los títulos de Recent Billing Activity, Find Patient y Today; que Find Patient siga
la lógica de cards de Patients; y chequear que la tabla esté alineada con las otras.

1. **Paneles.** Los tres bloques pasan a `Panel` (`dashboard/primitives`), el mismo de Today Appointments en Patients y
   del Dashboard: título de 15px Bold **sin ícono** y encabezado de 52px. De paso, Recent Billing Activity y Find
   Patient tienen el título a la misma altura (antes las Tabs agrandaban el encabezado de la izquierda).
2. **Find Patient.** Cada resultado es una `InnerCard` como las de Today Appointments: iniciales en un cuadrado azul
   de 32px, nombre 13px Semibold, último pago 11px y el saldo a la derecha. El buscador es el del panel de Patients
   (32px, texto de 12px). Antes eran filas sueltas con hover, sin card.
3. **Números adentro de un panel.** Today y los dos saldos de Selected patient eran cards de página (sombra de panel)
   adentro de otro panel. Pasan a `InnerCard` (`Stat interna`); los cinco de arriba siguen como card de página.
4. **El elegido, marcado.** Un paciente a la vez, desde una fila o desde Find Patient. Su card (`aria-current`) queda
   en `dash-count-bg` hasta que se elige otro o se toca la X. *(Primero también se marcaban en celeste todas sus filas;
   la segunda vuelta filtra la tabla al paciente y eso se sacó.)*
5. **Celular.** Find Patient queda debajo de la tabla: elegir ahí sube hasta los saldos (scroll *nearest*, sin
   animación con movimiento reducido). En escritorio, con todo a la vista, no se mueve nada.
6. **Encabezado de Panel.** Pasa de `h-[52px] py-3` a `min-h-[52px] py-2 flex-wrap`: unas Tabs sm (36px) entran sin
   agrandarlo y en el celular bajan abajo del título en vez de pisarlo. En Dashboard y Patients no cambia ningún pixel
   (comparado con capturas antes y después).
7. **La tabla.** Es la misma `DataTable` que Patients, Team, Accounts y Lab Order (encabezado de 44px en banda gris con
   11px, filas de 13px, pie con paginación), compacta (44px) por ir adentro de un panel y alineada con el cuerpo del
   panel (16px). Lo único distinto es el peso: Patient en negrita negra y Amount y Balance en semibold. Eso ya lo
   corrige el PR #18 (patrón único de tablas); acá no se duplicó para no pisarlo.

**Para validar con usuarios:** si recepción lee el celeste como "elegido" (el Dashboard marca la card elegida con un
anillo azul); si marcar todas las filas del paciente ayuda o conviene, en cambio, filtrar la tabla por ese paciente; y
si el salto hacia arriba en el celular se entiende o desorienta.

## Segunda vuelta (2026-10-09): la vista de un paciente

Julián, con capturas de red.dev (`red.dev.confidentally.com/billing`, que desde la sesión en la nube no se pudo abrir):
la pantalla sin paciente queda como está; al elegir uno, Billing pasa a ser la vista de ese paciente.

1. **Dos modos, una pantalla.** *Resumen* (sin paciente): igual que antes. *Paciente*: se entra tocando una fila del
   resumen o un resultado de Find Patient, y se sale con la X de su card, que vuelve al resumen tal como estaba (con el
   filtro de tipo que tenía).
2. **Sólo lo suyo.** La tabla muestra únicamente los movimientos del paciente. Las filas ya no eligen (están todas
   las de él); en el resumen sí.
3. **Patient View / Guarantor View.** Con paciente, las Tabs del encabezado cambian de tipo (All, Pt Payment…) a
   *Patient View* (sus movimientos) y *Guarantor View* (todo lo que paga su garante, con la columna Patient para
   distinguir a cada uno), como red.dev. Cada paciente nuevo arranca en Patient View. Para eso los datos suman
   `garante` a cada paciente: Maria Abril Viola → John Hayes, Diego Molina → Sophie Tran; John, Brent y Sophie son
   garantes. Unapplied Credits y Open Balance pasan a sumar todo el grupo del garante (lo dicen sus títulos:
   *Guarantor …*).
4. **El paciente, arriba de Find Patient.** Una franja de borde a borde arriba del título (`Panel` suma `top`), en
   `dash-count-bg`, con sus iniciales, el nombre en azul, el rol (y su garante si es Patient) y la X. Antes el
   paciente se nombraba en una línea de texto arriba de la tabla; ahora lo dice el título del panel
   (*Maria Abril Viola — Recent Billing Activity*) y la franja, y esa línea se sacó.
5. **Microanimación.** La franja baja 6px y aparece en 220ms (`paciente-entra`) y las iniciales hacen un pop
   (`tab-in`); los saldos del garante y los botones entran igual. Cambiar de paciente la repite. Con movimiento
   reducido aparece sin animar. La franja está en una región `aria-live`: el lector de pantalla dice el nombre.
6. **Botones sólo con paciente.** Patient Payment, Credit Adjustment, Charge Adjustment y Export statement aparecen
   recién con un paciente: siempre postean para él. El encabezado reserva el alto (36px) para que la página no salte.
7. **Mensajes de cada card.** red.dev tiene un ícono de info con un mensaje en cada número. Se sumó en la tercera
   vuelta (abajo).

**Para validar con usuarios:** si recepción encuentra cómo postear un pago sin los botones a la vista en el resumen
(hay que elegir un paciente primero); si Guarantor View se entiende sin explicación; y si la X de la franja se
encuentra para volver al resumen o hace falta un "Back to all activity" con texto.

## Tercera vuelta (2026-10-09): círculos de info y animación más sutil

1. **Círculo de info en cada número** (`ui/info-tip`, nuevo en el design system). Arriba a la derecha de los cinco
   números y de los tres de Today; al pasar el mouse, tocar o llegar con Tab abre una card blanca con el título y qué
   cuenta. Es un `HoverCard` y no un `Tooltip`: la regla del design system dice que el Tooltip oscuro sólo nombra y lo
   que explica en una o dos líneas va en HoverCard, que es además lo que muestra red.dev. Gris como la etiqueta y azul
   al abrirse. El HoverCard solo no abre con el dedo: `InfoTip` lo abre y cierra tocando.
2. **Textos.** Los cinco de arriba y *Payments Posted Today* son los de red.dev (capturas de Julián). *Adjustments
   created* y *Unapplied credits* no tenían captura: los textos son una **propuesta a validar** ("Credit and charge
   adjustments created today (practice timezone)." y "Payments and credits received that are not applied to a charge
   yet."). Los saldos del garante (con paciente) no llevan círculo: red.dev no les da texto.
3. **Etiquetas como red.dev.** *Patient A/R* pasa a **Guarantor A/R** y *Patients with Open Balance* a **Guarantors
   with Open Charges**, para que el título del mensaje sea el mismo que el de la card (y porque el saldo es del
   garante, como en Guarantor View). Las bajadas acompañan: "Outstanding guarantor responsibility" y "Guarantors with a
   remaining balance". Se apartan del Figma, que decía Patient.
4. **Las iniciales de la card del paciente, sin borde.** Se sacó el anillo blanco (`ring-2`).
5. **Animación más sutil, estilo Apple.** Antes bajaba 6px en 220ms y las iniciales hacían un pop. Ahora la card del
   paciente, los saldos del garante y los botones aparecen con 2px, un desenfoque de 2px que se aclara y opacidad, en
   360ms con `cubic-bezier(0.32, 0.72, 0, 1)` (arranca rápido y frena largo). Sin pop.

## Post payment: campos parejos y la tabla entera (2026-10-10)

Regla de Julián (2026-10-10, sobre una captura de Post payment con campos de anchos distintos): en los drawers los
campos van de a dos y del mismo ancho, y vale para todo. Está en *Components / UI / Drawer → Specs → Fields* y se
controla con `npm run ds:campos`.

1. **Payment**: Transaction date | Amount y Type | Apply to, en `grid gap-4 sm:grid-cols-2`. Antes eran cuatro anchos fijos
   (180, 160, 200 y 200px) en un `flex-wrap`, que dejaban la fila corta y a Apply to suelto. El buscador de paciente usa
   `control()`, el mismo borde y sombra que los demás campos.
2. **Allocation**: el drawer pasa a **2xl (1000px)**, un tamaño nuevo de `ui/drawer`, para que las 12 columnas de Ledger
   Transactions entren enteras con sus anchos base (a 760px pedía scroll de costado). Se elige por `width` en
   `ModalShell`: hasta 860px sigue siendo xl.
3. **Ledger Transactions** sin el ícono de la tarjeta en el título (pedido de Julián), como el resto de los paneles: el
   título de un panel no lleva ícono.
