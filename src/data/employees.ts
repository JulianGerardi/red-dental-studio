/* Plantilla del consultorio, para la tabla de Settings → Employees y para la
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
  { id: 'elena-martinez', nombre: 'Elena Martinez', iniciales: 'EM', cargo: 'Dentist', cumpleanos: '04/12/1986', email: 'elena.martinez@reddental.com', esProvider: true, estado: 'Active' },
  { id: 'emily-chen', nombre: 'Emily Chen', iniciales: 'EC', cargo: 'Dentist', cumpleanos: '09/03/1990', email: 'emily.chen@reddental.com', esProvider: true, estado: 'Active' },
  { id: 'daniel-anderson', nombre: 'Daniel Anderson', iniciales: 'DA', cargo: 'Dentist', cumpleanos: '01/21/1983', email: 'daniel.anderson@reddental.com', esProvider: true, estado: 'Active' },
  { id: 'sarah-stone', nombre: 'Sarah Stone', iniciales: 'SS', cargo: 'Dentist', cumpleanos: '03/30/1979', email: 'sarah.stone@reddental.com', esProvider: true, estado: 'Active' },
  { id: 'julio-perez', nombre: 'Julio Perez', iniciales: 'JP', cargo: 'Hygienist', cumpleanos: '06/17/1992', email: 'julio.perez@reddental.com', esProvider: true, estado: 'Active' },
  { id: 'michael-torres', nombre: 'Michael Torres', iniciales: 'MT', cargo: 'Hygienist', cumpleanos: '11/08/1988', email: 'michael.torres@reddental.com', esProvider: true, estado: 'Inactive' },
  { id: 'perez-martinez', nombre: 'Perez Martinez', iniciales: 'PM', cargo: 'Assistant', cumpleanos: '02/25/1995', email: 'perez.martinez@reddental.com', esProvider: false, estado: 'Active' },
  { id: 'salgado', nombre: 'Salgado', iniciales: 'SA', cargo: 'Front Desk', cumpleanos: '07/14/1998', email: 'salgado@reddental.com', esProvider: false, estado: 'Active' },
]
