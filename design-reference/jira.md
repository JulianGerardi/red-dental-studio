# Jira: el funcionamiento de la app

Proyecto `CON` en `confidetally.atlassian.net`. Acá está la **lógica** de cada parte de la app: reglas de negocio,
estados, precondiciones y escenarios de aceptación. Las historias de abril de 2026 son las más detalladas (historia
de usuario, precondiciones, regla de negocio, escenarios, restricciones); los epics son la puerta de entrada a todo
lo anterior.

- **No se usa** el label `design-system`: son historias de diseño, para los devs.
- Quedan afuera los bugs, lo cancelado, el diseño y la infraestructura.
- El mapeo historia → módulo salió de los títulos y de las epics (2026-10-24); si una cae en el módulo equivocado,
  se corrige acá y en el bloque **Jira** del `.md` del módulo.
- Cada historia se lee entera con `getJiraIssue` antes de implementar su módulo.

Consultas útiles:

```
project = CON AND created >= "2026-04-01" AND created < "2026-05-01" AND issuetype != Bug AND status != Cancelled
parent = CON-3114                                # todas las historias de un epic
project = CON AND text ~ "finding" AND (labels is EMPTY OR labels != "design-system") AND issuetype != Bug
```

## billing

Documento: [figma/modulos/billing.md](figma/modulos/billing.md)

**Epics**

- [CON-1060](https://confidetally.atlassian.net/browse/CON-1060) Billing

## clinical-mode

Documento: [figma/modulos/clinical-mode.md](figma/modulos/clinical-mode.md)

**Epics**

- [CON-1611](https://confidetally.atlassian.net/browse/CON-1611) Encounter
- [CON-1610](https://confidetally.atlassian.net/browse/CON-1610) Encounter Events
- [CON-1608](https://confidetally.atlassian.net/browse/CON-1608) Vitals
- [CON-2825](https://confidetally.atlassian.net/browse/CON-2825) [Post Demo] Vitals
- [CON-1609](https://confidetally.atlassian.net/browse/CON-1609) Procedure
- [CON-771](https://confidetally.atlassian.net/browse/CON-771) [CLINICA] Procedimientos, Conditions y Diagnosis
- [CON-3114](https://confidetally.atlassian.net/browse/CON-3114) [Post Demo] Clinical Mode
- [CON-1397](https://confidetally.atlassian.net/browse/CON-1397) Exams 2.0
- [CON-2067](https://confidetally.atlassian.net/browse/CON-2067) Exams continuacion
- [CON-2083](https://confidetally.atlassian.net/browse/CON-2083) [Exams] Procedure & Conditions
- [CON-880](https://confidetally.atlassian.net/browse/CON-880) Exam "Physical"
- [CON-881](https://confidetally.atlassian.net/browse/CON-881) Exam "Extra Oral"
- [CON-882](https://confidetally.atlassian.net/browse/CON-882) Exam "Intra Oral"
- [CON-883](https://confidetally.atlassian.net/browse/CON-883) Exam "Dental Assessment"
- [CON-965](https://confidetally.atlassian.net/browse/CON-965) Examen "Review of Systems"
- [CON-810](https://confidetally.atlassian.net/browse/CON-810) Extraoral
- [CON-1649](https://confidetally.atlassian.net/browse/CON-1649) Radiographic
- [CON-2212](https://confidetally.atlassian.net/browse/CON-2212) Prescription
- [CON-2214](https://confidetally.atlassian.net/browse/CON-2214) Lab Order
- [CON-2321](https://confidetally.atlassian.net/browse/CON-2321) Referral
- [CON-2724](https://confidetally.atlassian.net/browse/CON-2724) Nota Clinica
- [CON-2793](https://confidetally.atlassian.net/browse/CON-2793) Encounter continuacion
- [CON-900](https://confidetally.atlassian.net/browse/CON-900) Medical conditions
- [CON-1751](https://confidetally.atlassian.net/browse/CON-1751) Cambios Procedure y Condition
- [CON-1961](https://confidetally.atlassian.net/browse/CON-1961) Condition [Treatment Area]
- [CON-3900](https://confidetally.atlassian.net/browse/CON-3900) Modelo de procedimientos
- [CON-3742](https://confidetally.atlassian.net/browse/CON-3742) Dental Asessment nueva libreria
- [CON-3686](https://confidetally.atlassian.net/browse/CON-3686) Patient Dentition
- [CON-570](https://confidetally.atlassian.net/browse/CON-570) Workflow
- [CON-2258](https://confidetally.atlassian.net/browse/CON-2258) Workflow configuration
- [CON-2412](https://confidetally.atlassian.net/browse/CON-2412) Llenado de preguntas workflow

**Historias de abril**

- [CON-2827](https://confidetally.atlassian.net/browse/CON-2827) Blood Pressure 2 · epic CON-2825
- [CON-2828](https://confidetally.atlassian.net/browse/CON-2828) Respiration 2 · epic CON-2825
- [CON-2829](https://confidetally.atlassian.net/browse/CON-2829) Heart rate 2 · epic CON-2825
- [CON-2830](https://confidetally.atlassian.net/browse/CON-2830) [Vital] Oxygen Saturation  🕐 · epic CON-2825
- [CON-2936](https://confidetally.atlassian.net/browse/CON-2936) Vitals BMI · epic CON-3114
- [CON-2832](https://confidetally.atlassian.net/browse/CON-2832) [Problem List] Trated mostrar si esta atada a un procedimiento y este esta completo · epic CON-3114
- [CON-2833](https://confidetally.atlassian.net/browse/CON-2833) [Procedures] Restringir acciones clínicas desde Exámenes · epic CON-3114
- [CON-2834](https://confidetally.atlassian.net/browse/CON-2834) [Procedure] Eliminar Not Indicated🕐 · epic CON-3114
- [CON-2835](https://confidetally.atlassian.net/browse/CON-2835) Finding – Cambio automático a estado In Treatment al aceptar un Treatment Case 🕐 · epic CON-3114
- [CON-2845](https://confidetally.atlassian.net/browse/CON-2845) [lab_orders] Cambio treatment_procedure · epic CON-2836
- [CON-2852](https://confidetally.atlassian.net/browse/CON-2852) [referral] Cambio treatment_procedure · epic CON-2836
- [CON-2939](https://confidetally.atlassian.net/browse/CON-2939) [Procedure] Referred · epic CON-2838
- [CON-2846](https://confidetally.atlassian.net/browse/CON-2846) [Prescription] Reutilizar medicación existente activa · epic CON-3114
- [CON-2854](https://confidetally.atlassian.net/browse/CON-2854) [Prescription] Cambiar el nombre del campo Activated
- [CON-2955](https://confidetally.atlassian.net/browse/CON-2955) Maquina estados encounter cambia de DISCHARGED A FULFILLED · epic CON-3114
- [CON-2937](https://confidetally.atlassian.net/browse/CON-2937) Generación automática de Nota Clínica al cierre automático del Encounter · epic CON-2724
- [CON-2884](https://confidetally.atlassian.net/browse/CON-2884) Crear Workflows al Inicio del Encounter (Triage + Chief Complaint) · epic CON-2883
- [CON-2885](https://confidetally.atlassian.net/browse/CON-2885) Edición de Cuestionarios (Triage y Chief Complaint) · epic CON-2883
- [CON-2886](https://confidetally.atlassian.net/browse/CON-2886) Consulta de Cuestionarios (Triage + Chief Complaint) · epic CON-2883

## consents

Documento: [figma/modulos/consents.md](figma/modulos/consents.md)

**Epics**

- [CON-2094](https://confidetally.atlassian.net/browse/CON-2094) Consent
- [CON-3118](https://confidetally.atlassian.net/browse/CON-3118) [Consent] Procedure
- [CON-505](https://confidetally.atlassian.net/browse/CON-505) Document - Template
- [CON-1132](https://confidetally.atlassian.net/browse/CON-1132) Firma

**Historias de abril**

- [CON-2860](https://confidetally.atlassian.net/browse/CON-2860) Adoptar una firma prediseñada · epic CON-1132
- [CON-2862](https://confidetally.atlassian.net/browse/CON-2862) Dibujar la firma · epic CON-1132
- [CON-2905](https://confidetally.atlassian.net/browse/CON-2905) Sign Document -  Abrir el modal de firma · epic CON-1132
- [CON-2907](https://confidetally.atlassian.net/browse/CON-2907) [Patient] 1. Request document signature · epic CON-1132
- [CON-2908](https://confidetally.atlassian.net/browse/CON-2908) [Patien] 2. Send signing email · epic CON-1132
- [CON-2909](https://confidetally.atlassian.net/browse/CON-2909) [Patient] 3. Open document from email · epic CON-1132
- [CON-2910](https://confidetally.atlassian.net/browse/CON-2910) [Patient] 4. View document preview - Sing Document · epic CON-1132
- [CON-2911](https://confidetally.atlassian.net/browse/CON-2911) [Provider]  View document preview - Sing Document · epic CON-1132
- [CON-2912](https://confidetally.atlassian.net/browse/CON-2912) [Patient] Alternative - View document preview - Sing Document · epic CON-1132
- [CON-2913](https://confidetally.atlassian.net/browse/CON-2913) Sign Patient · epic CON-2094
- [CON-2914](https://confidetally.atlassian.net/browse/CON-2914) [Patient] Alternative - View document preview - Reject · epic CON-1132
- [CON-2865](https://confidetally.atlassian.net/browse/CON-2865) Crear Procedure Consent Template · epic CON-3118
- [CON-2866](https://confidetally.atlassian.net/browse/CON-2866) Permitir firma asistida por provider · epic CON-3118
- [CON-2923](https://confidetally.atlassian.net/browse/CON-2923) Generar y enviar automáticamente los consentimientos al completar la decisión de todos los Treatment Cases · epic CON-2094
- [CON-2927](https://confidetally.atlassian.net/browse/CON-2927) Consentimiento aceptado al completar todas las firmas · epic CON-2094
- [CON-2928](https://confidetally.atlassian.net/browse/CON-2928) Actualización automática del consentimiento a estado Rejected · epic CON-2094
- [CON-2959](https://confidetally.atlassian.net/browse/CON-2959) Documento - Consent accepted
- [CON-2960](https://confidetally.atlassian.net/browse/CON-2960) Documento - Consent reject

## dashboard

Documento: [figma/modulos/dashboard.md](figma/modulos/dashboard.md)

**Epics**

- [CON-2639](https://confidetally.atlassian.net/browse/CON-2639) Dashboard – Pending Tasks
- [CON-3116](https://confidetally.atlassian.net/browse/CON-3116) [Post Demo] Dashboard

## employees

Documento: [figma/modulos/employees.md](figma/modulos/employees.md)

**Epics**

- [CON-1548](https://confidetally.atlassian.net/browse/CON-1548) Employee
- [CON-2889](https://confidetally.atlassian.net/browse/CON-2889) Employee 2
- [CON-3115](https://confidetally.atlassian.net/browse/CON-3115) Roles y Permisos
- [CON-3120](https://confidetally.atlassian.net/browse/CON-3120) [Post Demo] Admin
- [CON-3230](https://confidetally.atlassian.net/browse/CON-3230) Usuarios Admin
- [CON-3506](https://confidetally.atlassian.net/browse/CON-3506) Configuración de permisos
- [CON-3853](https://confidetally.atlassian.net/browse/CON-3853) List Permission

**Historias de abril**

- [CON-2890](https://confidetally.atlassian.net/browse/CON-2890) Edit/Delete Working hours provider · epic CON-2889

## header-sidebar

Documento: [figma/modulos/header-sidebar.md](figma/modulos/header-sidebar.md)

**Historias de abril**

- [CON-2933](https://confidetally.atlassian.net/browse/CON-2933) Buscador Patient y Location · epic CON-2798

## help

Documento: [figma/modulos/help.md](figma/modulos/help.md)

Sin epics ni historias de funcionamiento.

## insurance

Documento: [figma/modulos/insurance.md](figma/modulos/insurance.md)

**Epics**

- [CON-1252](https://confidetally.atlassian.net/browse/CON-1252) [Patient] Patient Insurance Information
- [CON-1063](https://confidetally.atlassian.net/browse/CON-1063) [Insurance Plan] Coverage Table
- [CON-1096](https://confidetally.atlassian.net/browse/CON-1096) [Insurance Plan] Predeterminations
- [CON-1100](https://confidetally.atlassian.net/browse/CON-1100) [Insurance Plan] Deductibles and Benefits
- [CON-1109](https://confidetally.atlassian.net/browse/CON-1109) [Insurance Plan] Coordination of Benefits
- [CON-1130](https://confidetally.atlassian.net/browse/CON-1130) [Insurance Plan] Payment Table
- [CON-1113](https://confidetally.atlassian.net/browse/CON-1113) [Organization] Carrier & Plan
- [CON-1598](https://confidetally.atlassian.net/browse/CON-1598) Insurance Estimate
- [CON-2687](https://confidetally.atlassian.net/browse/CON-2687) Insurance Continuacion
- [CON-3283](https://confidetally.atlassian.net/browse/CON-3283) Seguros 2
- [CON-3259](https://confidetally.atlassian.net/browse/CON-3259) Plan & Subscriptions
- [CON-57](https://confidetally.atlassian.net/browse/CON-57) [Organization] Fee schedule

**Historias de abril**

- [CON-2941](https://confidetally.atlassian.net/browse/CON-2941) Cambiar carga de patient insurance · epic CON-2798

## ledger

Documento: [figma/modulos/ledger.md](figma/modulos/ledger.md)

**Epics**

- [CON-3732](https://confidetally.atlassian.net/browse/CON-3732) Ledger 2

**Historias de abril**

- [CON-2863](https://confidetally.atlassian.net/browse/CON-2863) [Futuro] Posting insurance overpayments · epic CON-3888

## locations

Documento: [figma/modulos/locations.md](figma/modulos/locations.md)

**Epics**

- [CON-1590](https://confidetally.atlassian.net/browse/CON-1590) Location
- [CON-38](https://confidetally.atlassian.net/browse/CON-38) Configuracion aplicacion
- [CON-1173](https://confidetally.atlassian.net/browse/CON-1173) [Location] Settings Billing

## login

Documento: [figma/modulos/login.md](figma/modulos/login.md)

Sin epics ni historias de funcionamiento.

## notifications

Documento: [figma/modulos/notifications.md](figma/modulos/notifications.md)

**Epics**

- [CON-3611](https://confidetally.atlassian.net/browse/CON-3611) Alerta

## patient-dashboard

Documento: [figma/modulos/patient-dashboard.md](figma/modulos/patient-dashboard.md)

**Epics**

- [CON-2107](https://confidetally.atlassian.net/browse/CON-2107) Patient
- [CON-1749](https://confidetally.atlassian.net/browse/CON-1749) Personas
- [CON-2798](https://confidetally.atlassian.net/browse/CON-2798) Post demo
- [CON-3919](https://confidetally.atlassian.net/browse/CON-3919) Perfil Clínico, Provider in Charge y Additional Provider
- [CON-3193](https://confidetally.atlassian.net/browse/CON-3193) Contacts

**Historias de abril**

- [CON-2946](https://confidetally.atlassian.net/browse/CON-2946) Persona · epic CON-2798
- [CON-2940](https://confidetally.atlassian.net/browse/CON-2940) Cambiar la carga de patient, employee, etc -> personas · epic CON-2798
- [CON-2942](https://confidetally.atlassian.net/browse/CON-2942) [Ficha del paciente] Appointments · epic CON-2798
- [CON-2952](https://confidetally.atlassian.net/browse/CON-2952) [Ficha del Patient] Corregir el armado de la informacion general · epic CON-2798
- [CON-2954](https://confidetally.atlassian.net/browse/CON-2954) formato estándar de fecha es mes-día-año (MM/DD/AAAA) · epic CON-2798
- [CON-2840](https://confidetally.atlassian.net/browse/CON-2840) [Overview] [Ficha del paciente] Visualización de planes aceptados · epic CON-2838
- [CON-2916](https://confidetally.atlassian.net/browse/CON-2916) [Futuro] Confirm cambios medical history del paciente · epic CON-3888
- [CON-2847](https://confidetally.atlassian.net/browse/CON-2847) [Medication] status · epic CON-2798
- [CON-2944](https://confidetally.atlassian.net/browse/CON-2944) [Ficha del paciente] Cambios en Medication, Surgery, etc · epic CON-3114
- [CON-2945](https://confidetally.atlassian.net/browse/CON-2945) Corregir patient_medications.unit (enum) · epic CON-3114
- [CON-2953](https://confidetally.atlassian.net/browse/CON-2953) Modal Medications · epic CON-2798

## patients

Documento: [figma/modulos/patients.md](figma/modulos/patients.md)

**Epics**

- [CON-833](https://confidetally.atlassian.net/browse/CON-833) Pacientes - Migracion back graphQL
- [CON-3910](https://confidetally.atlassian.net/browse/CON-3910) Consultar pacientes
- [CON-2107](https://confidetally.atlassian.net/browse/CON-2107) Patient

**Historias de abril**

- [CON-2858](https://confidetally.atlassian.net/browse/CON-2858) Add Guardian desde New Patient · epic CON-2879

## relationships

Documento: [figma/modulos/relationships.md](figma/modulos/relationships.md)

**Epics**

- [CON-2879](https://confidetally.atlassian.net/browse/CON-2879) Relationship
- [CON-3958](https://confidetally.atlassian.net/browse/CON-3958) [Relationship] Guardian & Guardian
- [CON-3973](https://confidetally.atlassian.net/browse/CON-3973) Ordenar historias de [Relationship] Guardian & Guardian

**Historias de abril**

- [CON-2858](https://confidetally.atlassian.net/browse/CON-2858) Add Guardian desde New Patient · epic CON-2879

## scheduling

Documento: [figma/modulos/scheduling.md](figma/modulos/scheduling.md)

**Epics**

- [CON-367](https://confidetally.atlassian.net/browse/CON-367) Calendarización
- [CON-747](https://confidetally.atlassian.net/browse/CON-747) Calendarizacion V2
- [CON-1493](https://confidetally.atlassian.net/browse/CON-1493) Calendarizacion front end 2.0
- [CON-3119](https://confidetally.atlassian.net/browse/CON-3119) [Post Demo] Calendario
- [CON-3600](https://confidetally.atlassian.net/browse/CON-3600) Treatment Visit & Appointment

**Historias de abril**

- [CON-2934](https://confidetally.atlassian.net/browse/CON-2934) [Appointment] Creación rápida de Appointment desde agenda (Double Click + Drag) · epic CON-3119

## settings-accounts

Documento: [figma/modulos/settings-accounts.md](figma/modulos/settings-accounts.md)

**Epics**

- [CON-895](https://confidetally.atlassian.net/browse/CON-895) Accounts

## settings-ledger

Documento: [figma/modulos/settings-ledger.md](figma/modulos/settings-ledger.md)

**Epics**

- [CON-3732](https://confidetally.atlassian.net/browse/CON-3732) Ledger 2

## treatments

Documento: [figma/modulos/treatments.md](figma/modulos/treatments.md)

**Epics**

- [CON-1138](https://confidetally.atlassian.net/browse/CON-1138) Cases
- [CON-2709](https://confidetally.atlassian.net/browse/CON-2709) Cases 2
- [CON-2982](https://confidetally.atlassian.net/browse/CON-2982) [Post Demo] Cases
- [CON-3939](https://confidetally.atlassian.net/browse/CON-3939) Treatment & Case
- [CON-3207](https://confidetally.atlassian.net/browse/CON-3207) Treatment / Workflow
- [CON-3695](https://confidetally.atlassian.net/browse/CON-3695) Caso y estimaciones final MVP
- [CON-2140](https://confidetally.atlassian.net/browse/CON-2140) Documents 2.0

**Historias de abril**

- [CON-2861](https://confidetally.atlassian.net/browse/CON-2861) [Ficha del paciente] Seccion Documents · epic CON-3116

## Sin módulo en el clon

Patient Portal (el portal del paciente no está en esta app) y otros epics generales.

**Epics**

- [CON-2](https://confidetally.atlassian.net/browse/CON-2) Group of requirements for patient portal to production deployment.
- [CON-227](https://confidetally.atlassian.net/browse/CON-227) Patient Portal
- [CON-2895](https://confidetally.atlassian.net/browse/CON-2895) Patient Portal
- [CON-2883](https://confidetally.atlassian.net/browse/CON-2883) Workflow - Patient Portal
- [CON-3189](https://confidetally.atlassian.net/browse/CON-3189) Treament Decision desde el Portal
- [CON-3241](https://confidetally.atlassian.net/browse/CON-3241) Appointment Patient Portal
- [CON-446](https://confidetally.atlassian.net/browse/CON-446) Aplicacion Mobile
- [CON-3888](https://confidetally.atlassian.net/browse/CON-3888) Historias que se desarrollaran en algun momento

**Historias de abril**

- [CON-2887](https://confidetally.atlassian.net/browse/CON-2887) Responder Cuestionarios desde Patient Portal · epic CON-2883
- [CON-2888](https://confidetally.atlassian.net/browse/CON-2888) Habilitación automática de cuestionarios de onboarding en Patient Portal · epic CON-2883
- [CON-2896](https://confidetally.atlassian.net/browse/CON-2896) Ingreso de número de paciente · epic CON-2895
- [CON-2897](https://confidetally.atlassian.net/browse/CON-2897) Envío de email de verificación · epic CON-2895
- [CON-2898](https://confidetally.atlassian.net/browse/CON-2898) Confirmación de acceso al correo · epic CON-2895
- [CON-2899](https://confidetally.atlassian.net/browse/CON-2899) Creación de contraseña · epic CON-2895
- [CON-2900](https://confidetally.atlassian.net/browse/CON-2900) Finalización del registro · epic CON-2895
- [CON-2901](https://confidetally.atlassian.net/browse/CON-2901) Iniciar sesión con credenciales · epic CON-2895
- [CON-2902](https://confidetally.atlassian.net/browse/CON-2902) [Post Demo] Recuperar acceso · epic CON-2895
- [CON-2921](https://confidetally.atlassian.net/browse/CON-2921) Dashboard Patient Portal · epic CON-2895

## Descartadas de abril

No son de lógica: CON-2837 (diseño), CON-2839 (diseño), CON-2935 (diseño), CON-2956 (diseño), CON-2882 (infraestructura), CON-2915 (caso de prueba).
