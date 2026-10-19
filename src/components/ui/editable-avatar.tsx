import { useRef } from 'react'
import { Pencil } from 'lucide-react'
import { Avatar, type AvatarSize } from './avatar'

/* El Avatar (ui/avatar) con foto editable: un botón de lápiz abre el selector
   de archivos del sistema y la imagen elegida reemplaza las iniciales. Misma
   forma y color que cualquier otro avatar; `className` sólo para un caso que
   no es una persona (el logo de la cuenta, en celeste) o un tamaño responsive.

   El botón sólo aparece con hover/foco -antes era una insignia fija en la
   esquina, y con la foto ya puesta tapaba una parte de la cara todo el
   tiempo-. En reposo la foto se ve entera; al pasar el mouse, un velo oscuro
   con el lápiz cubre el avatar completo, no sólo una esquina. */
export function EditableAvatar({
  foto,
  iniciales,
  onChange,
  size = 56,
  className,
  label,
}: {
  foto: string | null
  iniciales: string
  onChange: (dataUrl: string) => void
  size?: AvatarSize
  className?: string
  label: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const elegirArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0]
    e.target.value = ''
    if (!archivo) return
    const lector = new FileReader()
    lector.onload = () => onChange(String(lector.result))
    lector.readAsDataURL(archivo)
  }

  return (
    <span className="relative inline-flex shrink-0">
      <Avatar initials={iniciales} photo={foto} size={size} className={className} />
      <button
        type="button"
        aria-label={`Change photo for ${label}`}
        onClick={() => inputRef.current?.click()}
        className="rounded-avatar absolute inset-0 flex items-center justify-center bg-black/0 text-transparent opacity-0 transition-all hover:bg-black/45 hover:text-white hover:opacity-100 focus-visible:bg-black/45 focus-visible:text-white focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-blue"
      >
        <Pencil className="size-4" />
      </button>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={elegirArchivo} />
    </span>
  )
}
