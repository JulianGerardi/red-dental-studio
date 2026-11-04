import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`/* Todos los países con su código telefónico, para los Country Code (Julián, 2026-11-04; patients.md). La lista de códigos
   salió una vez de libphonenumber-js 1.12.10 (sólo los países con bandera en country-flag-icons); los nombres, del
   navegador (Intl.DisplayNames, en inglés). Cada entrada: ISO de dos letras + código, separadas por espacio. */
const CRUDO =
  'AC247 AD376 AE971 AF93 AG1 AI1 AL355 AM374 AO244 AR54 AS1 AT43 AU61 AW297 AX358 AZ994 BA387 BB1 BD880 BE32 BF226 ' +
  'BG359 BH973 BI257 BJ229 BL590 BM1 BN673 BO591 BQ599 BR55 BS1 BT975 BW267 BY375 BZ501 CA1 CC61 CD243 CF236 CG242 ' +
  'CH41 CI225 CK682 CL56 CM237 CN86 CO57 CR506 CU53 CV238 CW599 CX61 CY357 CZ420 DE49 DJ253 DK45 DM1 DO1 DZ213 ' +
  'EC593 EE372 EG20 EH212 ER291 ES34 ET251 FI358 FJ679 FK500 FM691 FO298 FR33 GA241 GB44 GD1 GE995 GF594 GG44 GH233 ' +
  'GI350 GL299 GM220 GN224 GP590 GQ240 GR30 GT502 GU1 GW245 GY592 HK852 HN504 HR385 HT509 HU36 ID62 IE353 IL972 ' +
  'IM44 IN91 IO246 IQ964 IR98 IS354 IT39 JE44 JM1 JO962 JP81 KE254 KG996 KH855 KI686 KM269 KN1 KP850 KR82 KW965 KY1 ' +
  'KZ7 LA856 LB961 LC1 LI423 LK94 LR231 LS266 LT370 LU352 LV371 LY218 MA212 MC377 MD373 ME382 MF590 MG261 MH692 ' +
  'MK389 ML223 MM95 MN976 MO853 MP1 MQ596 MR222 MS1 MT356 MU230 MV960 MW265 MX52 MY60 MZ258 NA264 NC687 NE227 NF672 ' +
  'NG234 NI505 NL31 NO47 NP977 NR674 NU683 NZ64 OM968 PA507 PE51 PF689 PG675 PH63 PK92 PL48 PM508 PR1 PS970 PT351 ' +
  'PW680 PY595 QA974 RE262 RO40 RS381 RU7 RW250 SA966 SB677 SC248 SD249 SE46 SG65 SH290 SI386 SJ47 SK421 SL232 ' +
  'SM378 SN221 SO252 SR597 SS211 ST239 SV503 SX1 SY963 SZ268 TA290 TC1 TD235 TG228 TH66 TJ992 TK690 TL670 TM993 ' +
  'TN216 TO676 TR90 TT1 TV688 TW886 TZ255 UA380 UG256 US1 UY598 UZ998 VA39 VC1 VE58 VG1 VI1 VN84 VU678 WF681 WS685 ' +
  'XK383 YE967 YT262 ZA27 ZM260 ZW263'

/* Códigos compartidos por varios países ("+1" son Estados Unidos, Canadá y el Caribe): el principal, para un valor viejo
   que sólo dice el código. */
const PRINCIPAL: Record<string, string> = { '1': 'US', '7': 'RU', '39': 'IT', '44': 'GB', '47': 'NO', '61': 'AU', '212': 'MA', '262': 'RE', '290': 'SH', '358': 'FI', '590': 'GP', '599': 'CW' }

export type PaisTel = { iso: string; codigo: string; nombre: string; opcion: string }

const nombres = new Intl.DisplayNames(['en'], { type: 'region' })

/** "(+54) Argentina": el formato de las opciones, el mismo que ya usaban Settings y Locations. De la A a la Z. */
export const PAISES_TEL: PaisTel[] = CRUDO.trim().split(/\\s+/).map((x) => {
  const iso = x.slice(0, 2)
  const codigo = \`+\${x.slice(2)}\`
  const nombre = nombres.of(iso) ?? iso
  return { iso, codigo, nombre, opcion: \`(\${codigo}) \${nombre}\` }
}).sort((a, b) => a.nombre.localeCompare(b.nombre))

export const OPCIONES_CODIGO = PAISES_TEL.map((p) => p.opcion)
const POR_OPCION = new Map(PAISES_TEL.map((p) => [p.opcion, p]))

/** El país de un valor: "(+54) Argentina", "(+1) United States of America (the)", "+54" o "Argentina". */
export function paisDe(valor: string): PaisTel | undefined {
  const exacto = POR_OPCION.get(valor)
  if (exacto) return exacto
  const codigo = valor.match(/\\+\\d+/)?.[0]
  const texto = valor.toLowerCase()
  /* El nombre más largo que aparece en el texto: "Nigeria" antes que "Niger". */
  const porNombre = PAISES_TEL
    .filter((p) => (!codigo || p.codigo === codigo) && texto.includes(p.nombre.toLowerCase()))
    .sort((a, b) => b.nombre.length - a.nombre.length)[0]
  if (porNombre || !codigo) return porNombre
  const iso = PRINCIPAL[codigo.slice(1)]
  return PAISES_TEL.find((p) => (iso ? p.iso === iso : p.codigo === codigo))
}

/** El código solo ("+54") de un valor, para armar un teléfono. */
export const codigoDe = (valor: string) => valor.match(/\\+\\d+/)?.[0] ?? valor
`})))()}export{r as n,n as r,i as t};