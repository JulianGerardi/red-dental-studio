# red-clone

Rediseño de la UI de [Confidentally](https://red.dev.confidentally.com) (software de gestión para clínicas dentales). React + Vite + TypeScript + Tailwind v4, con mock data propia (no hay backend real).

## Correr el proyecto

```bash
npm install
npm run dev      # dev server, http://localhost:5182
npm run build    # type-check (tsc -b) + build de producción
npm run lint     # oxlint
```

## Estructura

```
src/
  pages/            una por ruta (Dashboard.tsx, Scheduling.tsx, Patients.tsx, ...)
    clinical/        sub-páginas de Clinical Mode
    patients/        sub-páginas de detalle de paciente (Insurance, Ledger, ...)
    settings/        sub-páginas de Settings
  components/        agrupados por feature, un folder por página/módulo grande
    scheduling/       ← Appointment (ver abajo)
    clinical/         odontograma, exámenes, procedimientos
    patients/         forms y primitivas compartidas (ModalShell, SectionCard, FormFooter, ...)
    dashboard/        cards del Dashboard
    settings/         forms de Settings
    layout/           AppShell, Sidebar, Topbar
    ui/               shadcn/ui (botones, inputs, toaster, ...)
  data/               mock data (pacientes, turnos, catálogos)
  lib/                utils compartidos (cn, etc.)

design-reference/      capturas y notas del Figma original, por módulo
INVENTORY.md            relevamiento del sitio real (red.dev.confidentally.com) vs esta réplica
```

## Appointment / Scheduling

Todo lo de turnos vive en:

- **`src/pages/Scheduling.tsx`** — la página del calendario (Day/Week/Month, "New appointment", solicitudes).
- **`src/components/scheduling/`**
  - `NewAppointmentModal.tsx` — modal de alta/edición, wizard de 2 pasos (Patient & Scheduling → Treatment Plan).
  - `AppointmentSlotPicker.tsx` — panel lateral de horarios que aparece al tocar fecha/hora.
  - `TreatmentPlanPicker.tsx` — cards de plan de tratamiento y fila de visita del paso 2.
  - `CalendarViews.tsx`, `AppointmentDetailsDrawer.tsx`, `StatusLegend.tsx`, `ViewFiltersPanel.tsx` — resto del calendario.
  - `calendar-data.ts`, `requests-data.ts` — mock data de turnos y solicitudes.
- **`src/components/patients/PatientInSessionPopup.tsx`** — indicador "Currently being seen" (pestaña fija al borde derecho, en toda la app), lista los turnos de hoy sin completar.
- Referencia de diseño: `design-reference/figma/modulos/scheduling.md` + capturas en `design-reference/figma/scheduling-*.png`.

## Notas

- Lock de pestaña única: no aplica acá (es del sitio real, ver INVENTORY.md).
- Los datos son 100% mock (`src/data/`); no hay API ni persistencia real.
