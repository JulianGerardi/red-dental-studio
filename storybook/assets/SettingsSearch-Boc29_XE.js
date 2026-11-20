import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useRef } from 'react'
import { SearchInput } from '@/components/ui/search-input'
import { SearchButton } from '@/components/ui/search-button'

/* El buscador de las listas: SearchInput md con el botón Search al lado, en la fila de abajo del título. Filtra mientras
   se escribe; Search lleva el foco al campo. Es el de todas las barras con buscador (Locations, Employees, Ledger
   Options, Patients, Carriers, Fee Schedules…), seguido del Filter si hay. */
export function SettingsSearch({
  value, onChange, placeholder = 'Search...', className, disabled, onSearch, tour,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  /** Qué hace Search además de llevar el foco (volver a la página 1, recortar espacios). */
  onSearch?: () => void
  /** Ancla del tour de ayuda. */
  tour?: string
}) {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <>
      <SearchInput ref={ref} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} className={className} data-tour={tour} />
      <SearchButton onClick={() => { onSearch?.(); ref.current?.focus() }} />
    </>
  )
}
`})))()}export{n,i as r,r as t};