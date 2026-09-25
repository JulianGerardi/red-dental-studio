import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`/* Plantilla del consultorio, para la tabla de Settings → Employees y para la
   ficha de cada persona. Los nombres reusan a los profesionales que ya
   aparecen en el resto del sistema —Scheduling, Clinical Mode—, más un par de
   roles de mostrador que no son proveedores, para que "Is Provider" tenga los
   dos valores en datos de prueba. */

export type EstadoEmpleado = 'Active' | 'Inactive'

export type Empleado = {
  id: string
  nombre: string
  iniciales: string
  cargo: string
  cumpleanos: string
  email: string
  esProvider: boolean
  estado: EstadoEmpleado
}

export const EMPLEADOS: Empleado[] = [
  { id: 'elena-martinez', nombre: 'Elena Martinez', iniciales: 'EM', cargo: 'Dentist', cumpleanos: '12/04/1986', email: 'elena.martinez@reddental.com', esProvider: true, estado: 'Active' },
  { id: 'emily-chen', nombre: 'Emily Chen', iniciales: 'EC', cargo: 'Dentist', cumpleanos: '03/09/1990', email: 'emily.chen@reddental.com', esProvider: true, estado: 'Active' },
  { id: 'daniel-anderson', nombre: 'Daniel Anderson', iniciales: 'DA', cargo: 'Dentist', cumpleanos: '21/01/1983', email: 'daniel.anderson@reddental.com', esProvider: true, estado: 'Active' },
  { id: 'sarah-stone', nombre: 'Sarah Stone', iniciales: 'SS', cargo: 'Dentist', cumpleanos: '30/03/1979', email: 'sarah.stone@reddental.com', esProvider: true, estado: 'Active' },
  { id: 'julio-perez', nombre: 'Julio Perez', iniciales: 'JP', cargo: 'Hygienist', cumpleanos: '17/06/1992', email: 'julio.perez@reddental.com', esProvider: true, estado: 'Active' },
  { id: 'michael-torres', nombre: 'Michael Torres', iniciales: 'MT', cargo: 'Hygienist', cumpleanos: '08/11/1988', email: 'michael.torres@reddental.com', esProvider: true, estado: 'Inactive' },
  { id: 'perez-martinez', nombre: 'Perez Martinez', iniciales: 'PM', cargo: 'Assistant', cumpleanos: '25/02/1995', email: 'perez.martinez@reddental.com', esProvider: false, estado: 'Active' },
  { id: 'salgado', nombre: 'Salgado', iniciales: 'SA', cargo: 'Front Desk', cumpleanos: '14/07/1998', email: 'salgado@reddental.com', esProvider: false, estado: 'Active' },
]
`})))()}export{n,i as r,r as t};