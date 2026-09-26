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
