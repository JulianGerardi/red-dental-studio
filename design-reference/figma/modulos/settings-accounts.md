# Settings → Accounts

Pantalla nueva (2026-09-09), armada desde una captura que pasó Julián de la
plataforma real. No hay frame de Figma para esta.

## Header normalizado

Pedido explícito: *"normalicemos el header de arriba que contiene el título,
el search y el botón; el diseño que está hoy está bien, sólo cambiar la
disposición — por ejemplo el botón está alineado al título"*.

Antes cada pantalla de Settings armaba su encabezado a mano y el botón
principal caía **en la fila del buscador**, empujado con `ml-auto`. Ahora hay
un `SettingsPageHeader` compartido:

```
[Título + bajada]                         [Acción principal]
[Buscador · filtros]
```

Aplicado a las tres que lo tienen: **Accounts**, **Locations** y
**Employees**. El "N selected" de Employees se queda en la fila de abajo -es
un estado del listado, no una acción de la pantalla-.

## La tabla

Once columnas: Name · Plan · Subscription · Expires on · Subscription Status
· Locations · Employees · Licenses · Owners · Status · Actions. Status usa
tres pastillas -Active verde, Draft gris, Pending ámbar-, con los mismos
tonos que ya usa el resto de la app.

Al pie, "Showing 1 to 10 of 46 results", el selector de filas y la paginación
-el mismo componente `Pagination` del Ledger, no uno nuevo-.

## Anomalías de la captura

1. **"Mostrar:"** en castellano en una pantalla íntegramente en inglés. Se
   replica tal cual.
2. **Botón "Search"** al lado del campo, aunque el filtrado ya corre mientras
   se tipea. Se replica; sirve para volver a la primera página.
3. **Datos con guion largo** en Plan, Owners y Licenses -cuentas sin plan ni
   dueño-. Se replican así en vez de inventarles un valor.
4. Nombres de cuenta de prueba ("aasdasda", "bla bla bla", "testing betsy").
   Van tal cual: es contenido, no diseño.

## Por qué no se veían las pantallas nuevas (2026-09-09)

Julián reportó "no veo aplicado los cambios" con el código ya publicado.
Dos causas, las dos reales:

1. **Settings no tiene sidebar propio**: su landing (`/settings/general`)
   dibuja una grilla de tarjetas que sale de `SETTINGS_SECTIONS`
   (`data/mock.ts`), **no** de `SETTINGS_NAV` -ese alimenta el menú flotante
   del rail-. Agregar la ruta y el `SETTINGS_NAV` no alcanzaba: sin tarjeta,
   desde la pantalla de Settings no había forma de llegar. Son dos listas
   distintas y hay que tocar las dos.
2. **Había dos ítems casi iguales**, "Account" (placeholder viejo, vacío) y
   "Accounts" (el nuevo). Entrar al que no era daba una pantalla en blanco.
   Queda uno solo, "Accounts", que es como lo llama el Figma; se sacó
   `account` de `SETTINGS_PLACEHOLDERS` y se apuntaron ahí el menú de cuenta
   del header y la tarjeta.

## La estructura de Accounts se lleva a las demás listas (2026-09-09)

Pedido de Julián: *"la estructura que le diste a Accounts overview debe ser
igual para todo lo que tenga esta estructura"*. La estructura es:

- contenedor `w-full overflow-x-auto rounded-lg border` con `min-w-[Npx]`
- cabecera `bg-[#f9f9f9] px-3 py-3 text-[11px] font-semibold` -sin alto fijo
  ni borde inferior-
- filas `border-t px-3 py-3 text-[13px]` -el borde va arriba, así el pie se
  separa solo y no hace falta `last:border-0`-
- pie **adentro** del borde: contador a la izquierda, `Pagination` a la derecha

Aplicada a **Locations**, **Employees**, **Insurance** y **Documents**, que
tenían cabecera `h-12 ... border-b ... px-4 text-xs`, filas con `border-b` +
`last:border-0`, y pies de `h-[52px] px-4` sin borde.

Dos cosas que aparecieron al hacerlo:

1. **Insurance y Documents tenían la paginación dibujada**: botones con los
   glifos `‹ 1 2 3 ›` **sin `onClick`**, puramente decorativos. Documents
   pasa a paginar de verdad con el componente compartido (8 por página);
   Insurance muestra todas sus filas, así que ahí `Pagination` no dibuja nada
   -mejor eso que un control muerto-.
2. Los contadores decían cosas que no eran: "Showing 3 of 15 referrals" en la
   tabla de documentos y "8 of 8 insurances" con cuatro filas. Se dejan
   anotados como anomalía del Figma pero el número ahora cuenta lo que hay en
   pantalla.

## El botón "Search" se saca (2026-09-09)

Estaba replicado del diseño pero Julián lo marcó como redundante: el filtrado
ya corre mientras se tipea, así que el botón no hacía nada que el campo no
hiciera solo. Queda el campo.
