import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { PatientRow, PatientStatus } from '@/components/patients/PatientsTable'

/* Store en memoria de la lista de pacientes. Alta y edición se reflejan en la
   tabla al instante. No persiste entre recargas: es un prototipo de diseño y
   guardar en localStorage haría que la demo arranque con datos sucios. */

export type NuevoPaciente = {
  first: string
  middle: string
  last: string
  email: string
  birthday: string
  gender: string
}

const SEMILLA: PatientRow[] = [
  { id: 'abril-viola', name: 'Abril Viola', initials: 'av', birthday: 'April 2, 2025', email: 'Abril@gmail.com', status: 'Active' },
  { id: 'marco-rivera', name: 'Marco Rivera', initials: 'mr', birthday: 'Jan 15, 2025', email: 'marco.r@gmail.com', status: 'Active' },
  { id: 'sofia-chen', name: 'Sofia Chen', initials: 'sc', birthday: 'Mar 8, 2025', email: 'sofia.chen@mail.com', status: 'Inactive' },
  { id: 'daniel-ortiz', name: 'Daniel Ortiz', initials: 'do', birthday: 'Feb 20, 2025', email: 'd.ortiz@outlook.com', status: 'Active' },
  { id: 'thomas-davis', name: 'Thomas Davis', initials: 'td', birthday: 'May 30, 2025', email: 'thomas.davis@email.com', status: 'Active' },
  { id: 'lena-park', name: 'Lena Park', initials: 'lp', birthday: 'May 11, 2025', email: 'lena.park@email.com', status: 'Inactive' },
  { id: 'mark-wilson', name: 'Mark Wilson', initials: 'mw', birthday: 'June 2, 2025', email: 'mark.wilson@email.com', status: 'Active' },
  { id: 'sophia-johnson', name: 'Sophia Johnson', initials: 'sj', birthday: 'April 20, 2025', email: 'sophia.johnson@email.com', status: 'Active' },
  { id: 'robert-brown', name: 'Robert Brown', initials: 'rb', birthday: 'March 15, 2025', email: 'robert.brown@email.com', status: 'Inactive' },
  { id: 'emily-clark', name: 'Emily Clark', initials: 'ec', birthday: 'July 8, 2025', email: 'emily.clark@email.com', status: 'Active' },
  { id: 'james-wilson', name: 'James Wilson', initials: 'jw', birthday: 'Jun 3, 2025', email: 'j.wilson@corp.com', status: 'Active' },
]

const slug = (s: string) => s.toLowerCase().trim().replace(/\\s+/g, '-')
/* Las iniciales van en minúscula, como en el Figma. */
const iniciales = (first: string, last: string) =>
  ((first[0] ?? '') + (last[0] ?? '')).toLowerCase()

function aFila(d: NuevoPaciente, id: string): PatientRow {
  const name = [d.first, d.middle, d.last].filter(Boolean).join(' ').trim()
  return {
    id,
    name: name || 'Sin nombre',
    initials: iniciales(d.first, d.last) || '??',
    birthday: d.birthday || '—',
    email: d.email || '—',
    status: 'Active' as PatientStatus,
  }
}

type Ctx = {
  patients: PatientRow[]
  addPatient: (d: NuevoPaciente) => PatientRow
  updatePatient: (id: string, d: NuevoPaciente) => void
  getPatient: (id: string) => PatientRow | undefined
}

const PatientsCtx = createContext<Ctx | null>(null)

export function PatientsProvider({ children }: { children: React.ReactNode }) {
  const [patients, setPatients] = useState<PatientRow[]>(SEMILLA)

  const addPatient = useCallback((d: NuevoPaciente) => {
    const base = slug([d.first, d.last].filter(Boolean).join(' ')) || 'paciente'
    let id = base
    let n = 2
    setPatients((prev) => {
      while (prev.some((p) => p.id === id)) id = \`\${base}-\${n++}\`
      return [aFila(d, id), ...prev]
    })
    return aFila(d, id)
  }, [])

  const updatePatient = useCallback((id: string, d: NuevoPaciente) => {
    setPatients((prev) => prev.map((p) => (p.id === id ? { ...aFila(d, id) , status: p.status } : p)))
  }, [])

  const getPatient = useCallback(
    (id: string) => patients.find((p) => p.id === id),
    [patients],
  )

  const value = useMemo(
    () => ({ patients, addPatient, updatePatient, getPatient }),
    [patients, addPatient, updatePatient, getPatient],
  )
  return <PatientsCtx.Provider value={value}>{children}</PatientsCtx.Provider>
}

export function usePatients() {
  const ctx = useContext(PatientsCtx)
  if (!ctx) throw new Error('usePatients debe usarse dentro de <PatientsProvider>')
  return ctx
}
`})))()}export{r as n,n as r,i as t};