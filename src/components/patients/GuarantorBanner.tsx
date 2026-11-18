import { Alert } from '@/components/ui/alert'

/* Banner de garante del frame 3768:794930, con el aviso del design system (ver patients.md, 2026-11-18).
   NO se usa en Documents: pertenece a otro flujo (paciente menor sin garante
   asignado). Queda acá para engancharlo cuando ese flujo se implemente. */
export function GuarantorBanner() {
  return (
    <Alert tone="warning" title="Guarantor not assigned">
      This patient is a minor and does not have a guarantor assigned yet.
    </Alert>
  )
}
