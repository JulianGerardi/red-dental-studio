import { cn } from '@/lib/utils'
import { BLOCK_STYLE, fmtExacta, type EventoConFecha } from './calendar-data'

/* Un turno en el calendario. Ver Elements / Appointment cards.

   Por qué así:
   - Fondo suave y barra de 3px a la izquierda, los dos del color del estado:
     el color dice el estado sin leer, y la barra lo sostiene aunque el turno
     sea corto y el fondo casi no se vea.
   - La hora va en el color del estado y el nombre en negro: en una agenda se
     busca por hora y se confirma por nombre.
   - Tres formas del mismo turno: bloque en Day y Week (el alto es la
     duración), chip de un renglón en Month y fila en la lista del día del
     celular, donde el estado va escrito porque no hay leyenda al lado.
   - Se agarra con la mano para reprogramarlo; un click abre el detalle. */
export type FormaTurno = 'bloque' | 'chip' | 'fila'

const FORMA: Record<FormaTurno, string> = {
  bloque: 'cursor-grab overflow-hidden px-1.5 py-1 transition-shadow hover:shadow-md active:cursor-grabbing',
  chip: 'flex cursor-grab items-center gap-1.5 overflow-hidden px-1.5 py-1 active:cursor-grabbing',
  fila: 'flex items-center gap-2 px-2.5 py-2',
}

export function TurnoCalendario({
  evento, forma, className, style, ...props
}: {
  evento: Pick<EventoConFecha, 'start' | 'patient' | 'state'>
  forma: FormaTurno
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const s = BLOCK_STYLE[evento.state]
  return (
    <button
      type="button"
      {...props}
      className={cn('rounded-r-[3px] border-l-[3px] text-left', FORMA[forma], className)}
      style={{ backgroundColor: s.bg, borderLeftColor: s.bar, ...style }}
    >
      {forma === 'bloque' && (
        <>
          <span className="block text-[10px] font-medium" style={{ color: s.fg }}>{fmtExacta(evento.start)}</span>
          <span className="block truncate text-[11px] text-[#18181b]">{evento.patient}</span>
        </>
      )}
      {forma === 'chip' && (
        <>
          <span className="shrink-0 text-[10px] font-medium" style={{ color: s.fg }}>{fmtExacta(evento.start).slice(0, 5)}</span>
          <span className="truncate text-[10px] text-[#18181b]">{evento.patient}</span>
        </>
      )}
      {forma === 'fila' && (
        <>
          <span className="shrink-0 text-[11px] font-semibold" style={{ color: s.fg }}>{fmtExacta(evento.start)}</span>
          <span className="min-w-0 flex-1 truncate text-[13px] text-[#18181b]">{evento.patient}</span>
          <span className="shrink-0 text-[11px]" style={{ color: s.fg }}>{evento.state}</span>
        </>
      )}
    </button>
  )
}
