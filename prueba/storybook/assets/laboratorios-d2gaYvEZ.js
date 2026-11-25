import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`/* Los laboratorios receptores de las Lab Orders: el select del detalle y el PDF de la orden (Receiving Laboratory, como
   red.dev). Ver design-reference/figma/modulos/dashboard.md (2026-11-25). */
export type Laboratorio = { nombre: string; telefono: string; email: string; direccion: string }

export const LABORATORIOS: Laboratorio[] = [
  { nombre: 'Olivos Laboratory', telefono: '+1 212 5550142', email: 'orders@olivoslab.com', direccion: '410 Park Ave, 3, New York, 10022, NY, US' },
  { nombre: 'North Dental Lab', telefono: '+1 646 5550178', email: 'lab@northdental.com', direccion: '88 Bleecker St, 1, New York, 10012, NY, US' },
  { nombre: 'Smile Lab Studio', telefono: '+1 718 5550193', email: 'hello@smilelab.studio', direccion: '25 Court St, 4, Brooklyn, 11201, NY, US' },
]

/* Los dientes de cada arcada, en el orden en que se ven (Maxillary arriba, Mandibular abajo). */
export type Denticion = 'Permanent' | 'Primary'
export const ARCADAS: Record<Denticion, { arriba: string[]; abajo: string[] }> = {
  Permanent: { arriba: Array.from({ length: 16 }, (_, i) => String(i + 1)), abajo: Array.from({ length: 16 }, (_, i) => String(32 - i)) },
  Primary: { arriba: 'ABCDEFGHIJ'.split(''), abajo: 'TSRQPONMLK'.split('') },
}
`})))()}export{r as n,n as r,i as t};