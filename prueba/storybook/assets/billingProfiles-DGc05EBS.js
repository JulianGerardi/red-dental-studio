import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`import { esNorteamerica, type Telefono } from '@/data/finanzas'

/* Insurance / Billing Profile de una Location o de un provider (CON-4004…4007, CON-4021…4028). Un titular (entity) tiene
   un solo perfil; deshabilitarlo lo deja en \`activo: false\` sin borrar nada. Ver figma/modulos/billing-profile.md. */

export type TipoFiscal = 'TIN' | 'SSN'
export const TIPOS_FISCALES: TipoFiscal[] = ['TIN', 'SSN']

export type PerfilFacturacion = {
  nombre: string
  /** Dos renglones: calle y unidad, después ciudad, estado, código postal y país. */
  direccion: string
  telefono: string
  npi: string
  tipoFiscal: TipoFiscal
  fiscal: string
  activo: boolean
  /** Contracted With por id de carrier. El carrier que falta cuenta como \`false\` (relación inicial). */
  contratos: Record<string, boolean>
}

/** Las direcciones y teléfonos que ya tiene el titular: el primero es el general, los otros se cargaron para billing. */
export type ContactosTitular = { direcciones: string[]; telefonos: string[] }

export const claveLocacion = (id: string) => \`loc:\${id}\`
export const claveProvider = (id: string) => \`emp:\${id}\`

/* Lo que trae cada Location en Information: es lo que el perfil propone al configurarse. */
export const CONTACTOS_LOCACION: Record<string, { direccion: string; telefono: string }> = {
  abril: { direccion: '789 N Sunrise Street, Suite 200\\nLos Angeles, California 90012, United States', telefono: '+1 (213) 555-0147' },
  alaska: { direccion: '1220 W 5th Ave\\nAnchorage, Alaska 99501, United States', telefono: '+1 (907) 555-0110' },
  bayside: { direccion: '450 Biscayne Blvd\\nMiami, Florida 33132, United States', telefono: '+1 (305) 555-0192' },
  northgate: { direccion: '9800 Aurora Ave N\\nSeattle, Washington 98103, United States', telefono: '+1 (206) 555-0164' },
  riverside: { direccion: '310 Congress Ave\\nAustin, Texas 78701, United States', telefono: '+1 (512) 555-0178' },
}

/* Lo que el provider ya tiene cargado en su ficha (persona y Credentials): con eso se prepara el perfil sin pedir nada. */
export const DATOS_PROVIDER: Record<string, { direccion: string; telefono: string; npi: string; tipoFiscal: TipoFiscal; fiscal: string }> = {
  'elena-martinez': { direccion: '123 Maple Street, Apt 2B\\nLos Angeles, California 90001, United States', telefono: '+1 (213) 555-0181', npi: '1427081936', tipoFiscal: 'SSN', fiscal: '512684321' },
  'emily-chen': { direccion: '456 Oak Avenue, Suite 300\\nLos Angeles, California 90012, United States', telefono: '+1 (213) 555-0126', npi: '1588734420', tipoFiscal: 'SSN', fiscal: '604417788' },
  'daniel-anderson': { direccion: '88 Harbor Drive\\nMiami, Florida 33101, United States', telefono: '+1 (305) 555-0133', npi: '1093847561', tipoFiscal: 'TIN', fiscal: '274510936' },
  'sarah-stone': { direccion: '14 Pine Court\\nSeattle, Washington 98101, United States', telefono: '+1 (206) 555-0102', npi: '1730592846', tipoFiscal: 'SSN', fiscal: '338905512' },
  'julio-perez': { direccion: '2200 Lake Shore Blvd\\nAustin, Texas 78702, United States', telefono: '+1 (512) 555-0157', npi: '1265039874', tipoFiscal: 'SSN', fiscal: '471028836' },
  'michael-torres': { direccion: '61 Elm Street\\nAnchorage, Alaska 99502, United States', telefono: '+1 (907) 555-0149', npi: '1902648315', tipoFiscal: 'SSN', fiscal: '219736604' },
}

/* Semilla: Abril sin perfil (para recorrer la configuración), Bayside activo y Northgate deshabilitado. Elena es Primary
   Provider con perfil, Daniel lo fue (perfil inactivo) y Emily todavía no (lo prepara al activar Primary Provider). */
export const PERFILES_INICIALES: Record<string, PerfilFacturacion> = {
  [claveLocacion('bayside')]: {
    nombre: 'Bayside Dental Group', direccion: CONTACTOS_LOCACION.bayside.direccion, telefono: CONTACTOS_LOCACION.bayside.telefono,
    npi: '1659384720', tipoFiscal: 'TIN', fiscal: '593827461', activo: true, contratos: { aetna: true, 'delta-ca': true },
  },
  [claveLocacion('northgate')]: {
    nombre: 'Northgate Clinic', direccion: CONTACTOS_LOCACION.northgate.direccion, telefono: CONTACTOS_LOCACION.northgate.telefono,
    npi: '1386402957', tipoFiscal: 'TIN', fiscal: '840193275', activo: false, contratos: { cigna: true },
  },
  [claveProvider('elena-martinez')]: {
    nombre: 'Elena Martinez', ...DATOS_PROVIDER['elena-martinez'], activo: true, contratos: { aetna: true, metlife: true },
  },
  [claveProvider('daniel-anderson')]: {
    nombre: 'Daniel Anderson', ...DATOS_PROVIDER['daniel-anderson'], activo: false, contratos: { benecare: true },
  },
}

/* Primary Provider guardado de cada empleado provider. */
export const PRIMARIOS_INICIALES: Record<string, boolean> = {
  'elena-martinez': true, 'emily-chen': false, 'daniel-anderson': false, 'sarah-stone': false, 'julio-perez': false, 'michael-torres': false,
}

export const CONTACTOS_INICIALES: Record<string, ContactosTitular> = Object.fromEntries([
  ...Object.entries(CONTACTOS_LOCACION).map(([id, c]) => [claveLocacion(id), { direcciones: [c.direccion], telefonos: [c.telefono] }]),
  ...Object.entries(DATOS_PROVIDER).map(([id, c]) => [claveProvider(id), { direcciones: [c.direccion], telefonos: [c.telefono] }]),
])

/* ── Formatos ───────────────────────────────────────────────────────── */

export type DireccionNueva = { linea1: string; linea2: string; ciudad: string; estado: string; zip: string; pais: string }

export const textoDireccion = (d: DireccionNueva) =>
  \`\${[d.linea1.trim(), d.linea2.trim()].filter(Boolean).join(', ')}\\n\${d.ciudad.trim()}, \${d.estado} \${d.zip.trim()}, \${d.pais}\`

/* "(+1) United States…" con área y número → "+1 (213) 555-0147". */
export const textoTelefono = (t: Telefono) => {
  const prefijo = t.codigo.match(/\\((\\+\\d+)\\)/)?.[1] ?? ''
  return esNorteamerica(t.codigo)
    ? \`\${prefijo} (\${t.area}) \${t.numero.slice(0, 3)}-\${t.numero.slice(3)}\`
    : \`\${prefijo} \${t.numero}\`
}

/* El TIN/SSN nunca se muestra entero: sólo los últimos cuatro dígitos. */
export const fiscalOculto = (tipo: TipoFiscal, numero: string) => \`\${tipo} •••••\${numero.replace(/\\D/g, '').slice(-4)}\`

export const NPI_VALIDO = (v: string) => /^\\d{10}$/.test(v.replace(/\\D/g, ''))
export const FISCAL_VALIDO = (v: string) => /^\\d{9}$/.test(v.replace(/\\D/g, ''))
`})))()}export{n,i as r,r as t};