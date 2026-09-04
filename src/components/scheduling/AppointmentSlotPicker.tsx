import { useState } from 'react'
import { AlarmClock, GripVertical } from 'lucide-react'
import { cn } from '@/lib/utils'

/* Figma 3862:224820 "appointment-item-2" — la columna de 190px que acompaña al
   modal de New Appointment. No es parte del modal: en el frame arranca en
   x=879 cuando el modal termina en 887, o sea que va pegada y hasta se monta
   8px encima. Los dos miden 813 de alto y empiezan en la misma y.

   Las horas van 08 AM … 12 PM y siguen con 13 PM, 14 PM…: es el mismo error
   del calendario grande, anomalía 27. Se replica. */

/* 4430:61940 llega hasta las 19 y repite "19 PM" en las dos últimas filas.
   La etiqueta duplicada no se replica: en un selector real serían dos franjas
   con el mismo nombre. Queda anotada como anomalía 56. */
export const HORAS = [
  '08 AM', '09 AM', '10 AM', '11 AM', '12 PM', '13 PM',
  '14 PM', '15 PM', '16 PM', '17 PM', '18 PM', '19 PM',
]

/* Bloque rojo del frame: 09 AM ocupado. */
const OCUPADA = '09 AM'

export function AppointmentSlotPicker({
  provider = 'Sarah Stone',
  especialidad = 'General Dentistry',
  fecha = 'Sábado, 19 de febrero de 2022',
  paciente,
  seleccion,
  onPick,
  className,
}: {
  provider?: string
  especialidad?: string
  fecha?: string
  /** Nombre a mostrar en la card que se arrastra. */
  paciente?: string
  /** Hora elegida, en el mismo formato que HORAS. */
  seleccion?: string
  onPick: (hora: string) => void
  className?: string
}) {
  const [sobre, setSobre] = useState<string | null>(null)

  return (
    /* El alto y el ancho los pone quien lo usa: al costado del modal va
       pegado y a toda la altura; adentro, a lo ancho y con scroll. */
    <aside
      className={cn(
        'motion-safe:animate-[loc-in_180ms_ease-out] flex flex-col overflow-hidden rounded-xl border border-[#e4e4e7] bg-white',
        className,
      )}
    >
      <header className="shrink-0 border-b border-[#e4e4e7] px-3 py-3">
        <div className="flex items-center gap-2">
          <span className="bg-dash-count-bg text-dash-blue-hover flex size-8 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold">
            {provider.split(' ').map((w) => w[0]).slice(0, 2).join('')}
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[13px] font-bold text-[#09090b]">{provider}</span>
            <span className="block truncate text-[13px] font-bold text-[#09090b]">{especialidad}</span>
          </span>
        </div>
        <p className="mt-2 text-[10px] text-[#71717a]">{fecha}</p>
        <p className="text-[10px] text-[#a1a1aa]">
          {seleccion ? 'Drag the card to move it' : 'Click on available time to schedule'}
        </p>
      </header>

      {/* Las franjas se reparten el alto del panel, como en el frame:
          813 - 85 de cabecera / 11 filas da ~70 cada una. */}
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        {HORAS.map((h) => {
          const ocupada = h === OCUPADA
          const elegida = seleccion === h
          return (
            <div key={h} className="flex min-h-[54px] flex-1 border-b border-[#f1f1f4] last:border-0">
              <span className="flex w-[50px] shrink-0 items-center pl-2 text-[11px] text-[#71717a]">
                {h}
              </span>
              <button
                type="button"
                onClick={() => !ocupada && onPick(h)}
                disabled={ocupada}
                aria-label={ocupada ? `${h} unavailable` : `Schedule at ${h}`}
                onDragOver={(e) => { if (!ocupada) { e.preventDefault(); setSobre(h) } }}
                onDragLeave={() => setSobre((s) => (s === h ? null : s))}
                onDrop={(e) => {
                  e.preventDefault()
                  setSobre(null)
                  if (!ocupada) onPick(h)
                }}
                className={cn(
                  'relative flex-1 border-l border-[#f1f1f4] p-1 text-left transition-colors',
                  ocupada
                    ? 'cursor-not-allowed bg-[#fdf3f3]'
                    : sobre === h
                      ? 'bg-[#dbeafe]'
                      : elegida
                        ? 'bg-[#eff6ff]'
                        : 'bg-[#fbfbfc] hover:bg-[#eff6ff]',
                )}
              >
                {/* Media hora, para que la fila no quede como un bloque plano. */}
                <span className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-[#f1f1f4]" />

                {ocupada && (
                  <span className="absolute inset-y-1 left-1 flex items-center rounded-r-md border-l-[3px] border-l-[#dc2626] bg-[#fde8e8] pr-2 pl-1.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#dc2626] text-white">
                      <AlarmClock className="size-3" />
                    </span>
                  </span>
                )}

                {/* La franja elegida se arrastra a otra hora. */}
                {elegida && !ocupada && (
                  <span
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.effectAllowed = 'move'
                      e.dataTransfer.setData('text/plain', h)
                    }}
                    className="border-l-dash-blue relative flex h-full cursor-grab items-center gap-1 rounded-r-[3px] border-l-[3px] bg-[#e8eef8] px-1.5 active:cursor-grabbing"
                  >
                    <GripVertical className="text-dash-blue size-3 shrink-0" />
                    <span className="min-w-0 leading-tight">
                      <span className="text-dash-blue block truncate text-[10px] font-semibold">{h}</span>
                      <span className="block truncate text-[10px] text-[#18181b]">
                        {paciente?.trim() || 'New appointment'}
                      </span>
                    </span>
                  </span>
                )}
              </button>
            </div>
          )
        })}
      </div>
    </aside>
  )
}
