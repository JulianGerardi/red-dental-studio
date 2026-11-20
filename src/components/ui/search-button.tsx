import { Button, type ButtonSize } from '@/components/ui/button'

/* El filtrado ya corre mientras se tipea; este botón es el que trae el
   Figma al lado del campo. Julián lo había sacado por redundante y después
   pidió que volviera en toda tabla con buscador al inicio. Es un Button
   primario: mismo tamaño que el SearchInput que acompaña (md por defecto). */
export function SearchButton({
  onClick, className, size = 'md',
}: { onClick?: () => void; className?: string; size?: ButtonSize }) {
  return (
    <Button size={size} onClick={onClick} className={className}>
      Search
    </Button>
  )
}
