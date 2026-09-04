# Inventario — red.dev.confidentally.com

Relevado el 2026-08-25 con sesión de Julián, viewport 1440×900.

## Stack original
Next.js (App Router + Turbopack) · Tailwind · shadcn/ui · Geist Sans/Mono · Sonner · Zustand

## Layout global (app shell)
- **Sidebar** shadcn `Sidebar` (`bg-sidebar`, `variant=floating`), colapsable:
  colapsado 57px (solo íconos) / expandido 250px (con labels y logo "Confidentally").
- **Topbar**: toggle de sidebar · "👋 Hi! {nombre}" · selector de location
  ("Abril · Europe/Berlin") · Search · campana · avatar + rol.
- **Pie de sidebar**: Settings · API Monitor + switch.

## Rutas

| Ruta | Estado | Complejidad |
|---|---|---|
| `/login` | ✅ pixel-exacto (11/11) | baja |
| `/forgot-password` | ✅ estructura (inferida, no vi el original) | baja |
| `/` (Dashboard) | ✅ estructura | media |
| `/patients` | ✅ estructura | media |
| `/patients/:id` | ✅ Overview; faltan 4 tabs | **alta** |
| `/patients/:id/clinical-mode` | ✅ los 7 módulos | **alta** |
| 404 | ✅ | baja |
| `/scheduling` | ✅ vista Month; faltan Day/Week y eventos | **alta** |
| `/settings/general` | ✅ estructura | media |
| `/settings/*` (12 restantes) | placeholder propio | media × 12 |
| `/billing` `/message` `/contacts` `/documents` | ✅ placeholder compartido | baja (1 componente) |
| `/reports` | sustituido por el placeholder — el original es un monitor de latencia interno | — |

## Detalle por pantalla

### Dashboard `/`
Título + toggle Receptionist/Provider · 3 stat cards (Patients attended /
Patients waiting / Open encounters) con ícono y estado vacío ·
3 paneles con header azul claro: Appointments (date picker + filtro),
Waiting Room, Rooms (cards con badge Available).

### Patients `/patients`
Header + botón "New Patient" · search · tabla (checkbox, avatar, nombre link,
birthdate, email, badge de status, kebab de acciones) con sort en 3 columnas ·
paginación "Showing 1 to 10 of 271 results" + selector "Mostrar: 10" (string en
español en UI inglesa — bug del original) + Previous / 1 / 2 / … / Next.

### Patient detail `/patients/:id`
Id en base64 (`UGF0aWVudC0…`). Breadcrumb.
- **Panel izquierdo**: avatar · nombre · badge ACTIVE · edad · botón Clinical Mode ·
  nav (Overview / Treatments / Insurance / Documents / Relationships & Billing) ·
  bloque "General" editable (Gender, DOB, Language, …).
- **Overview**: 4 accordions clínicos con contador (Allergies 2, Medical Conditions 1,
  Medication 13, Past Surgery and Hospitalization 3) · tabla Insurance con filas
  reordenables (drag handle) · Pending Tasks (tabs Pending Task / Activity, cards de
  Lab Order con estado y fechas de expiración) · Appointments (tabs Next / Waiting List / Past).
- **Clinical Mode**: odontograma. En localStorage: `oralExamValue` con
  `{ temporary, teeth: [{ element, surfaces[7], root, icons[] }] }`.

### Scheduling `/scheduling`
Calendario con nav de mes · Today · toggle Day / Week / Month · dropdown View ·
botón New appointment. Carga con skeletons.

### Settings `/settings/*`
Sidebar secundario con search + card grid en `/settings/general`.
Subrutas: `general` · `account` · `locations` · `team` (Employees) · `roles` ·
`parameters` · `finance` (+ `finance/fee-schedule`, `finance/carriers`,
`finance/coverage-table`) · `libraries` · `patient-portal` · `security` · `preferences`.

## Notas
- Lock de una sola pestaña: `localStorage["manager-app-single-tab-heartbeat"]`.
- Datos de pacientes del entorno dev son de prueba. **La réplica usa mock data propia.**


## Bugs del original corregidos en la réplica

1. **`Mostrar: 10`** en el selector de paginación de Patients: string en español
   dentro de una UI en inglés. Cambiado a `Show:`.
2. **Comilla suelta en el `class` del `h1`** del login: el original renderiza
   `class="font-bold text-3xl text-card-foreground" "` — hay un `"` de más que
   Tailwind ignora pero ensucia el DOM. No reproducido.
3. **`--calendaar-accent`** (con doble "a") en los tokens del original. En la
   réplica se mantuvo el nombre tal cual en `tokens.json` para no perder la
   trazabilidad, pero conviene renombrarlo si se adopta el design system.
4. **Paginación sin total de páginas**: el original muestra `1 2 … Next` sin
   indicar cuántas páginas hay. La réplica muestra `1 of 28`.

## Diferencias conocidas (no son bugs)

- **Fondo del panel de auth**: el original usa `auth-fallback-bg.png`; la réplica
  lo recrea con `radial-gradient` (`.auth-mesh`). Aproximado, no idéntico.
- **Ilustración de "Page under construction"**: SVG propio, dibujado a ojo desde
  el original.
- **Botón "New Patient"**: en el original aparece deshabilitado (probablemente por
  permisos del usuario de prueba). En la réplica está habilitado.
- **Datos**: todo mock propio (`src/data/mock.ts`), 271 pacientes ficticios para
  igualar el conteo de la paginación original.


## Clinical Mode `/patients/:id/clinical-mode`

**Takeover a pantalla completa**: no usa el app shell. Fondo de puntos.

- Barra superior: `Exit Clinical Mode` · `Overview` (solo dentro de un módulo) ·
  píldora de constantes (edad, género, peso, altura, 4 contadores, avatar + nombre).
- Módulos: Exams · Treatment plan · Treatment · Patient summary · Lab order ·
  Prescription · Referral. Los labels en el DOM van en sentence case y se
  capitalizan por CSS.
- **Overview**: render de la boca + tabla Problem List / Procedures
  (Date, Location, Tooth, Surface, Condition, Exam, Provider, Note, Status).
- **Exams** abre su propia sub-nav: Vitals · Ros · Physical · Extraoral ·
  Intraoral · Dental assessment · Periodontal · Radiographic.
  El query param `?exam=` es un **global ID de GraphQL en base64**
  (`ExamModule::Exam::Periodontal-0195…`), no un slug.
  - **Vitals**: 6 cards con medidor semicircular, toggle de unidad y stepper.
  - **Periodontal**: panel de Findings (Findings / Review exam) + selector de exam
    + odontograma.

### Modelo del odontograma

De `localStorage.oralExamValue` del original:

```ts
{ temporary: boolean, teeth: Tooth[32], bars: [] }

Tooth = {
  element: 'permanent' | 'temporary' | 'missing'
  surfaces: (string | null)[7]   // valor = color hex, ej "#fe0000"
  root: string | null
  icons: string[]                // ej "grbleeding"
  color: string | null
  findings: { date, finding, professional, surfaces[7] }[]
}
```

Las 7 superficies se mapearon como `MB · B · DB / O / ML · L · DL`
(los índices que usa el original, 4 y 5, caen en la banda lingual).
Numeración universal 1–32: arcada superior 1→16, inferior 32→17.

Vocabulario de findings observado: Periodontitis · Acute apical abscess ·
Necrosis of the pulp · Dental plaque on tooth · Localized moderate chronic
periodontitis · Subgingival dental calculus · Dental calculus · Temporary dentition.


## Rutas de Clinical Mode

**El label del tab no siempre es el slug.** Hay que clickear el tab para
descubrirlo — adivinar la URL da 404 o rebota al detalle de paciente.

| Tab | Ruta |
|---|---|
| Exams | `/clinical-mode/exams?exam=<base64 GraphQL ID>` |
| Treatment Plan | `/clinical-mode/treatment-plan` |
| Treatment | `/clinical-mode/treatment` |
| **Patient Summary** | **`/clinical-mode/treatment-history`** ← no coincide |
| Lab Order | `/clinical-mode/lab-order` |
| Prescription | `/clinical-mode/prescription` |
| Referral | `/clinical-mode/referral` |

- **Treatment Plan**: panel de casos (Unassigned Items, badges PLANNING /
  WAITING FOR CONSENT) + 4 filtros + tabla de procedimientos con códigos ADA.
- **Treatment**: gateado por el modal "No Active Encounter Found" sobre un layout
  difuminado. **No se pudo ver la pantalla real** — el paciente de prueba no tiene
  encounter abierto.
- **Patient Summary**: tabla de citas con Status, Clinic Note, y 4 columnas de
  check/cruz (Exams · Ref · Lab · Prescription).
- **Lab Order · Prescription · Referral**: comparten la misma fila-card
  (borde azul, avatar, slot central variable, badge, 3 fechas, 3 acciones).
  Replicado como un solo componente `RecordRow`.

## Build para el artifact

`vite.config.single.ts` genera un bundle **IIFE** en `dist-single/`, que luego se
inlinea junto al CSS en un solo HTML.

Dos cosas que hay que respetar o la página queda en blanco:

1. **No usar `<script type="module">` inline.** El artifact corre dentro de un
   iframe sandboxeado con origen opaco, y ahí los módulos inline no ejecutan.
   Por eso el formato IIFE y un `<script>` clásico.
2. **El formato IIFE no emite el CSS.** Hay que tomarlo del build normal
   (`npm run build` → `dist/assets/*.css`) y combinarlo a mano.
3. **Nada de comentarios HTML alrededor del `<script>`.** Un `<!-- ... -->` que
   contenía el texto literal `<script type="module">` dejaba la página en blanco:
   el CSS aplicaba pero el bundle no ejecutaba nunca. Aislado con una sonda que
   ponía un script chico antes y otro después del bundle — ambos corrían, así que
   el problema no era ni el tamaño ni el contenido del JS. Si hace falta explicar
   algo, va como comentario JS adentro del script.

El router se elige por `VITE_HASH_ROUTER`: `HashRouter` para el artifact (una sola
página, sin servidor que resuelva rutas), `BrowserRouter` en dev.
