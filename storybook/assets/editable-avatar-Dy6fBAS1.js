import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useRef } from 'react'
import { Pencil } from 'lucide-react'
import { cn } from '@/lib/utils'

/* Avatar de iniciales con foto opcional: en vez de un cuadrado/círculo fijo,
   un botón de lápiz abre el selector de archivos del sistema y la imagen
   elegida reemplaza las iniciales. \`avatarClassName\` trae tamaño, forma y
   colores -distintos entre Employees (cuadrado, fondo celeste) y el panel
   del paciente (círculo, fondo azul sólido)-, así el componente no le impone
   una forma a quien lo usa; el botón toma el mismo tamaño y forma para
   superponerse exacto.

   El botón sólo aparece con hover/foco -antes era una insignia fija en la
   esquina, y con la foto ya puesta tapaba una parte de la cara todo el
   tiempo-. En reposo la foto se ve entera; al pasar el mouse, un velo oscuro
   con el lápiz cubre el avatar completo, no sólo una esquina. */
export function EditableAvatar({
  foto,
  iniciales,
  onChange,
  avatarClassName,
  label,
}: {
  foto: string | null
  iniciales: string
  onChange: (dataUrl: string) => void
  avatarClassName: string
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
      {foto ? (
        <img src={foto} alt="" className={cn(avatarClassName, 'object-cover')} />
      ) : (
        <span className={cn(avatarClassName, 'flex items-center justify-center font-semibold')}>
          {iniciales}
        </span>
      )}
      <button
        type="button"
        aria-label={\`Change photo for \${label}\`}
        onClick={() => inputRef.current?.click()}
        className={cn(
          avatarClassName,
          'absolute inset-0 flex items-center justify-center bg-black/0 text-transparent opacity-0 transition-all hover:bg-black/45 hover:text-white hover:opacity-100 focus-visible:bg-black/45 focus-visible:text-white focus-visible:opacity-100 focus-visible:outline-none',
        )}
      >
        <Pencil className="size-4" />
      </button>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={elegirArchivo} />
    </span>
  )
}
`})))()}export{n,i as r,r as t};