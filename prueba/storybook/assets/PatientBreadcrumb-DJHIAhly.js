import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { useParams } from 'react-router-dom'
import { Breadcrumb, type Miga } from '@/components/ui/breadcrumb'
import { cn } from '@/lib/utils'

/** Las migas de una pantalla del paciente: Patients › paciente › sección. Sin sección (Overview) termina en el paciente. */
export function migasPaciente(nombre: string, base: string, seccion?: string): Miga[] {
  return [
    { label: 'Patients', to: '/patients' },
    { label: nombre, to: seccion ? base : undefined },
    ...(seccion ? [{ label: seccion }] : []),
  ]
}

/* Rastro de las pantallas del paciente (Julián, 2026-10-13); las pantallas de primer nivel no llevan. Ver
   patient-dashboard.md. */
export function PatientBreadcrumb({ name, section, className }: {
  name: string
  /** El nombre de la sección en el menú del paciente; sin sección es el Overview. */
  section?: string
  className?: string
}) {
  const { id = 'john-smith' } = useParams()
  return (
    <div className={cn('mb-4', className)}>
      <Breadcrumb items={migasPaciente(name, \`/patients/\${id}\`, section)} />
    </div>
  )
}
`})))()}export{n,i as r,r as t};