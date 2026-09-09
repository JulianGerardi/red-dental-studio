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
