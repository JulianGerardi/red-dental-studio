import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/* Aviso de una sección de formulario: una franja cálida con barra a la izquierda y texto corto, sin ícono ni título. Es
   la del Figma de New Patient y Edit Patient ("Optional section. Use this section when a guardian needs to be associated
   with the patient…", 5277:125202). Distinta de Alert: ésta no interrumpe ni pide nada, sólo explica para qué sirve la
   sección que está debajo. Ver Elements / Section notice. */
export function SectionNotice({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div role="note" className={cn('rounded-r-md border-l-[3px] border-attn-fg bg-warn-bg px-4 py-3 text-[11px] leading-[1.5] font-bold text-attn-fg', className)}>
      {children}
    </div>
  )
}
