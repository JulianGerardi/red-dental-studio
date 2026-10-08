# Settings → Billing (Fee Schedules, Carriers, Coverage Tables)

Pantallas nuevas (2026-10-08). Julián pidió tomar el flujo completo de `red.dev.confidentally.com/settings/finance/carriers`
(carriers, fee schedules y coverage tables) y armarlo con el estilo y los componentes de esta app. Desde la sesión en la
nube ese dominio no resuelve (no es público) y no hay frame de Figma para estas pantallas, así que Julián eligió
**"Armalo con tu criterio"**: el flujo está armado según cómo funciona la facturación dental en EE.UU. y queda para
ajustar contra la app real cuando haya capturas.

## Cómo se organiza

Tres tablas que se conectan a través del **plan**:

```
Fee schedule  ← lo que cobra el consultorio por código CDT
      ↑
Carrier → Plan ─→ Coverage table  ← lo que paga el plan por categoría (%, deducible, máximos)
```

| Ruta | Pantalla |
|---|---|
| `/settings/finance` | **Billing**: portada con una card por sección (con su cuenta), *How it fits together* y *Setup checks* |
| `/settings/finance/fee-schedule` (`/new`) | Lista de fee schedules (con el drawer de alta abierto) |
| `/settings/finance/fee-schedule/:feeId` | Detalle: StatStrip, pestañas **Fees** (catálogo CDT con el precio editable en la celda) y **Plans** |
| `/settings/finance/carriers` (`/new`) | Lista de carriers |
| `/settings/finance/carriers/:carrierId` | Detalle: StatStrip, pestañas **Plans** (con New plan) e **Information** (ficha editable) |
| `/settings/finance/coverage-table` (`/new`) | Lista de coverage tables |
| `/settings/finance/coverage-table/:tableId` | Detalle: StatStrip, pestañas **Coverage** (una fila por categoría CDT) y **Plans** |

## Decisiones

1. **Un store para las tres** (`data/finanzasStore.tsx`, `FinanzasProvider` envuelve la ruta de Settings en
   `AppRoutes.tsx`): un fee schedule creado aparece en el drawer de plan; un plan nuevo aparece en las pestañas Plans del
   carrier, de su fee schedule y de su coverage table; el breadcrumb muestra el nombre del ítem. Como `patientsStore`, no
   persiste: al recargar vuelven los datos de ejemplo.
2. **El catálogo CDT es el de Clinical Mode** (`clinical/dental/data.ts`, `PROCEDURES` y sus categorías, "como en la app
   real"): un solo vocabulario de códigos. Las coverage tables usan esas mismas 13 categorías, agrupadas en clases
   (Preventive, Basic, Major, Orthodontics, Other) con sus rangos de códigos.
3. **Misma estructura que el resto de Settings**: lista = `SettingsPageHeader` + buscador + filtro de estado + `DataTable`;
   detalle = encabezado con pills al lado del título (`etiquetas`, nuevo) y grupo de acciones (secundaria, principal y
   kebab), `StatStripApilada` de cuatro, `Tabs` y una tabla. `/new` abre la lista con el drawer de alta, como Locations.
4. **Pop ups = drawer con pasos con nombre**: New/Edit Fee Schedule (General · Fees), Adjust Fees (uno), New Carrier
   (General · Contact · Address), New/Edit Plan (Plan · Billing), New/Edit Coverage Table (General · Limits · Coverage) y
   la regla de una categoría (uno).
5. **Editar un carrier es la pestaña Information**, como la ficha de una locación; el drawer es sólo para el alta.
6. **El precio se edita en la celda** (`EditableAmount`): en una tabla de 26 códigos, abrir un drawer por precio era
   demasiado. Para cambiar muchos a la vez está *Adjust fees* (por %, por categoría, con redondeo y vista previa).
7. **"vs UCR"** compara cada fee schedule contra el UCR por defecto (el honorario completo del consultorio); se muestra
   con el signo menos tipográfico (−) para que las cifras alineen.
8. **Lo que no se borra**, para que ningún plan quede sin cobrar: un fee schedule default o en uso, un carrier con
   planes, un plan con pacientes suscriptos y una coverage table en uso. Avisan con un toast de error que dice qué hacer
   (mover los planes, desactivar). Lo demás se borra con *Undo*. El default no se desactiva.
9. **Setup checks** (portada): carriers activos sin planes, planes que apuntan a algo inactivo y fee schedules en uso con
   códigos sin precio, cada uno con *Review*. Es lo que hace que la portada sirva para algo más que navegar.
10. **Coverage table nueva desde una plantilla** (Standard 100/80/50, Plus 100/90/60, Basic 100/70/0, Empty) o como
    "Copy of" una tabla existente (copia límites y reglas tal cual si no se tocan los porcentajes). En el drawer se pone
    el % por clase; cada categoría se ajusta después en la tabla.
11. **Ceros con sentido**: máximo anual 0 = "No limit"; máximo de ortodoncia 0 = "Not covered"; 0% = "Not covered".
12. **Default Fee Schedule de Locations** (`data/location-options.ts → FEES`) pasa a salir de los fee schedules activos
    de Billing. Cambian las opciones: "PPO Premiun Plan" pasa a "PPO Premium Plan", se suman UCR - Red, Delta Dental PPO
    2026 e In-house Membership y sale Standard 2025 (está inactivo).
13. **El menú dice "Coverage Tables"** (antes "Coverage Table"), en plural como "Fee Schedules" y como el título de la
    pantalla: el breadcrumb sale del menú y no coincidía con el título.

## Componentes nuevos

- `components/finance/`: `CoverageBar`, `CoverageSummary`, `EditableAmount`, `PlansTable`, `FeeScheduleDrawer`,
  `AdjustFeesDrawer`, `CarrierDrawer`, `PlanDrawer`, `CoverageTableDrawer`, `CoverageRuleDrawer`. Storybook:
  *Components / Finance*.
- `components/settings/SettingsSearch` (buscador + Search de las listas de Settings; Locations, Accounts y Ledger todavía
  lo escriben a mano).
- `SettingsPageHeader` suma `etiquetas`; `SettingsSectionCard` suma `detail`.
- Piezas internas de las pantallas en *Pages / Parts / Billing settings*.

## Pendiente de confirmar con Julián

1. Comparar contra la app real (`red.dev`): columnas, nombres de campos, pasos de los drawers y si hay pantallas que
   falten (por ejemplo, importar un fee schedule desde CSV).
2. Si la pestaña Insurance del paciente (`data/insurance.ts → CARRIERS`) tiene que tomar los carriers y planes de acá.
3. El renombre del menú a "Coverage Tables" (decisión 13).
