# Login

Figma 3749:72258 ("Log in"). El frame trae dos variantes que comparten la
misma card de la derecha y cambian el panel de la izquierda: una con un
degradé azul liso y otra con una foto de la clínica.

## Estructura del frame

Card partida en dos: panel izquierdo a sangre y formulario a la derecha con
logo en círculo, "Welcome! Dentist Salud", bajada, Email, Password con ojo,
botón Login, "Don't have an account? Sign up" y el pie "© 2025 ALL RIGHTS
RESERVED | CONFIDENTALLY".

## Anomalía: "Forgot your password?" dos veces

El frame lo pone **dos veces seguidas**: como texto a la derecha del label
"Password" y otra vez como link azul debajo del campo. Son el mismo destino,
pegados. Va una sola vez, en la fila del label -que es donde el usuario lo
busca-; el de abajo se descarta. Anomalía del mismo tipo que "Charge
Adjustment (+)" abriendo un modal titulado "New Credit (+) Adjustment", ver
`ledger.md`.

## El panel de la izquierda muestra la app, no un campo liso

Pedido de Julián: el mismo tipo de login que el del proyecto hermano
-que usa el panel para mostrar pantallas reales animadas- pero con la
estética de acá. Se toma el azul del Figma
(`linear-gradient(150deg,#1d56bc,#2f74f5,#0043c7)`, los mismos tres azules
del botón de Confibot) y encima van tres vitrinas que rotan cada 5,2s,
armadas con **datos reales del proyecto**, no con dibujos:

1. **Agenda** — los turnos de `EVENTS`, el mismo array que dibuja el
   calendario de Scheduling.
2. **Ledger** — las últimas líneas de `MOVIMIENTOS` con `conSaldo()`, así el
   "Balance due" que se ve es el saldo verdadero ($13.123,00), no un número
   inventado.
3. **Odontograma** — la arcada de `MANDIBULAR`, con tres piezas marcadas.

Las piezas marcadas del panel 3 sí son fijas: es una vitrina, no el
odontograma real, y hacerla depender de `makeMockExam()` la volvería
distinta en cada carga sin ganar nada.

Cada vitrina se remonta al cambiar de slide (`key={slide}`) para que su
animación arranque de cero; si no, el panel queda congelado en el último
cuadro. Los puntos de abajo son botones de verdad, se puede saltar de slide.

## Lo demás

- El formulario usa los tokens de la app -`dash-blue`, bordes `#e4e4e7`,
  label 12px / control 13px- en vez de los genéricos del login anterior.
- Submit entra al Dashboard (`navigate('/')`). No hay auth real: es la misma
  ficción que el resto del prototipo.
- Abajo de `lg` el panel se esconde y queda sólo el formulario, centrado
  (medido: 327px de ancho a 375 de viewport, sin desborde).
