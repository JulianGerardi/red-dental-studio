import { useState } from 'react'
import { OdontogramEmbed } from '@/components/clinical/OdontogramEmbed'
import { ExamLayout } from './ExamLayout'
import { BotoneraDientes } from './dental/BotoneraDientes'

/* DentAssmt — Figma (proyecto hermano, misma spec). Reusa nuestro
   `Odontogram` real en vez del PNG con hotspots del original: ya existe,
   opera de verdad y es lo que pide `ClinicalMode.tsx` desde el principio
   ("no una foto"). El panel de Findings, las acciones y sus drawers son los de
   todos los exámenes (`ExamLayout`); acá va el chart, con la botonera de
   selección de la app real a la izquierda de la barra de Odontogram /
   Periodontal Status. Ver design-reference/figma/modulos/clinical-mode.md. */
export function DentalAssessmentExam() {
  /* El lienzo del chart: la botonera de selección busca ahí las piezas de la librería. */
  const [lienzo, setLienzo] = useState<HTMLDivElement | null>(null)

  return (
    <ExamLayout>
      <div ref={setLienzo} className="relative flex min-w-0 flex-col items-center gap-3 overflow-x-auto rounded-xl border border-line p-4" data-examen style={{ background: 'radial-gradient(#e4e4e7 1px, transparent 1px) 0 0 / 16px 16px, #fafbfe' }}>
        <OdontogramEmbed controlesAbiertos={false} onCerrarControles={() => {}} accionesBarra={<BotoneraDientes raiz={lienzo} />} />
      </div>
    </ExamLayout>
  )
}
