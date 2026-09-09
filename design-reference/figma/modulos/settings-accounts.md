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
