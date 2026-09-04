/* Banner de garante del frame 3768:794930.
   NO se usa en Documents: pertenece a otro flujo (paciente menor sin garante
   asignado). Queda acá para engancharlo cuando ese flujo se implemente. */
export function GuarantorBanner() {
  return (
    <div className="rounded-r-md border-l-[3px] border-[#b45309] bg-[#fffbeb] px-4 py-2.5">
      <p className="text-[13px] font-bold text-[#b45309]">Guarantor not assigned</p>
      <p className="text-xs text-[#b45309]">
        This patient is a minor and does not have a guarantor assigned yet.
      </p>
    </div>
  )
}
