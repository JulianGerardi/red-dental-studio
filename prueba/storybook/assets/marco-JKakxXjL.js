import{n as e,r as t}from"./rolldown-runtime-DkW27tQK.js";var n=t({default:()=>r}),r;function i(){return(i=e((()=>{r=`/* Marco único de los mails: un layout y siete bloques fijos que arman HTML apto para clientes de correo (tablas,
   estilos inline, 600px). El backend sólo reemplaza {{variables}}: nada de bucles ni condicionales. Las decisiones,
   en design-reference/figma/modulos/emails.md. */

/* Los mails no leen variables CSS: los colores van en hex, copiados de los tokens de @theme (src/index.css). */
export const COLOR = {
  marca: '#1d56bc', // dash-blue (botón primario de la app)
  tinta: '#09090b', // ink
  texto: '#3f3f46', // ink-soft
  apagado: '#71717a', // ink-muted
  linea: '#e4e4e7', // line
  fondo: '#f4f4f5', // surface-muted
  caja: '#fafafa', // surface-subtle
  franja: '#e8eef8', // brand-tint
  avisoFondo: '#fffaf0', // warn-bg
  avisoTexto: '#99660d', // warn-fg
  avisoBorde: '#b45309', // attn-fg
} as const

const FUENTE = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

export type Bloque =
  | { tipo: 'saludo'; texto: string }
  | { tipo: 'parrafo'; texto: string }
  | { tipo: 'aviso'; texto: string }
  | { tipo: 'detalles'; titulo: string; filas: [rotulo: string, valor: string][] }
  | { tipo: 'boton'; texto: string; enlace: string }
  | { tipo: 'nota'; texto: string }
  | { tipo: 'firma'; despedida: string; lineas: string[] }

/** Quién habla: la clínica (paciente, guardian, empleado) o Confidentally (dueño de la cuenta). */
export type Remitente = 'clinica' | 'plataforma'

const BOTON_FALLA = 'If the button does not work, copy and paste this link into your browser:'

function bloque(b: Bloque): string {
  switch (b.tipo) {
    case 'saludo':
      return \`<p style="margin:0 0 16px;font-size:18px;line-height:28px;font-weight:600;color:\${COLOR.tinta};">\${b.texto}</p>\`
    case 'parrafo':
      return \`<p style="margin:0 0 16px;font-size:16px;line-height:26px;color:\${COLOR.texto};">\${b.texto}</p>\`
    case 'aviso':
      return \`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 20px;"><tr>
<td style="background:\${COLOR.avisoFondo};border-left:3px solid \${COLOR.avisoBorde};border-radius:6px;padding:12px 16px;font-size:14px;line-height:22px;color:\${COLOR.avisoTexto};">\${b.texto}</td>
</tr></table>\`
    case 'detalles':
      return \`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:4px 0 24px;"><tr>
<td style="background:\${COLOR.caja};border:1px solid \${COLOR.linea};border-radius:8px;padding:20px 20px 12px;">
<p style="margin:0 0 12px;padding-bottom:10px;border-bottom:1px solid \${COLOR.linea};font-size:12px;line-height:16px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:\${COLOR.tinta};">\${b.titulo}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
\${b.filas.map(([r, v]) => \`<tr><td class="rotulo" valign="top" style="padding:0 12px 8px 0;width:132px;font-size:14px;line-height:20px;color:\${COLOR.apagado};">\${r}</td><td class="valor" valign="top" style="padding:0 0 8px;font-size:14px;line-height:20px;font-weight:600;color:\${COLOR.tinta};word-break:break-word;">\${v}</td></tr>\`).join('\\n')}
</table>
</td></tr></table>\`
    case 'boton':
      // Botón "a prueba de balas": la celda lleva el color, así Outlook también lo pinta. El enlace de respaldo va siempre.
      return \`<table role="presentation" cellpadding="0" cellspacing="0" border="0" class="boton" style="margin:8px 0 20px;"><tr>
<td align="center" bgcolor="\${COLOR.marca}" style="border-radius:8px;background:\${COLOR.marca};">
<a href="\${b.enlace}" target="_blank" style="display:inline-block;padding:14px 28px;font-family:\${FUENTE};font-size:16px;line-height:20px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:8px;">\${b.texto}</a>
</td></tr></table>
<p style="margin:0 0 4px;font-size:13px;line-height:20px;color:\${COLOR.apagado};">\${BOTON_FALLA}</p>
<p style="margin:0 0 20px;font-size:13px;line-height:20px;word-break:break-all;"><a href="\${b.enlace}" target="_blank" style="color:\${COLOR.marca};text-decoration:underline;">\${b.enlace}</a></p>\`
    case 'nota':
      return \`<p style="margin:0 0 12px;font-size:14px;line-height:22px;color:\${COLOR.apagado};">\${b.texto}</p>\`
    case 'firma':
      return \`<p style="margin:12px 0 4px;font-size:16px;line-height:24px;color:\${COLOR.texto};">\${b.despedida}</p>
\${b.lineas.map((l, i) => \`<p style="margin:0;font-size:\${i === 0 ? 16 : 14}px;line-height:\${i === 0 ? 24 : 22}px;\${i === 0 ? \`font-weight:600;color:\${COLOR.tinta};\` : \`color:\${COLOR.apagado};\`}">\${l}</p>\`).join('\\n')}\`
  }
}

function cabecera(remitente: Remitente): string {
  const contenido = remitente === 'clinica'
    ? \`<p style="margin:0;font-size:20px;line-height:28px;font-weight:600;color:\${COLOR.tinta};">{{practice_name}}</p>\`
    : \`<img src="{{logo_url}}" width="150" height="48" alt="Confidentally" style="display:block;border:0;width:150px;height:auto;">\`
  // Franja del Figma (blanco a azul claro), más baja y con quien escribe adentro. Sin degradé, queda el color plano.
  return \`<tr><td class="px" bgcolor="\${COLOR.franja}" style="background:\${COLOR.franja};background-image:linear-gradient(120deg,#ffffff 0%,\${COLOR.franja} 55%,#c9dafa 100%);padding:28px 40px;">\${contenido}</td></tr>\`
}

export function armarMail({ asunto, preheader, remitente, bloques }: {
  asunto: string
  preheader: string
  remitente: Remitente
  bloques: Bloque[]
}): string {
  return \`<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>\${asunto}</title>
<style>
  body { margin:0; padding:0; width:100% !important; -webkit-text-size-adjust:100%; }
  a { color:\${COLOR.marca}; }
  @media (max-width: 620px) {
    .marco { padding:0 !important; }
    .tarjeta { border-radius:0 !important; border-left:0 !important; border-right:0 !important; }
    .px { padding-left:24px !important; padding-right:24px !important; }
    .boton { width:100% !important; }
    .boton a { display:block !important; }
    .rotulo, .valor { display:block !important; width:auto !important; }
    .rotulo { padding-bottom:0 !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:\${COLOR.fondo};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">\${preheader}&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="\${COLOR.fondo}" style="background:\${COLOR.fondo};">
<tr><td align="center" class="marco" style="padding:32px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" class="tarjeta" style="width:100%;max-width:600px;background:#ffffff;border:1px solid \${COLOR.linea};border-radius:12px;overflow:hidden;font-family:\${FUENTE};">
\${cabecera(remitente)}
<tr><td class="px" style="padding:36px 40px 16px;font-family:\${FUENTE};">
\${bloques.map(bloque).join('\\n')}
</td></tr>
<tr><td class="px" style="padding:0 40px 28px;font-family:\${FUENTE};">
<p style="margin:0;padding-top:20px;border-top:1px solid \${COLOR.linea};font-size:12px;line-height:20px;color:\${COLOR.apagado};">This email was sent to you as a registered member of <a href="{{website_url}}" style="color:\${COLOR.marca};text-decoration:none;">Confidentally.com</a>. Use of the service and website is subject to our <a href="{{terms_url}}" style="color:\${COLOR.marca};text-decoration:none;">Terms of Use</a> and <a href="{{privacy_url}}" style="color:\${COLOR.marca};text-decoration:none;">Privacy Statement</a>.</p>
</td></tr>
<tr><td align="center" class="px" bgcolor="\${COLOR.caja}" style="background:\${COLOR.caja};border-top:1px solid \${COLOR.linea};padding:28px 40px;font-family:\${FUENTE};">
<img src="{{logo_url}}" width="140" height="45" alt="Confidentally" style="display:block;margin:0 auto 16px;border:0;width:140px;height:auto;">
<p style="margin:0 0 4px;font-size:12px;line-height:18px;color:\${COLOR.apagado};">&copy; {{year}} Confidentally. All rights reserved.</p>
<p style="margin:0 0 8px;font-size:12px;line-height:18px;color:\${COLOR.apagado};">{{company_address}}</p>
<p style="margin:0;font-size:12px;line-height:18px;"><a href="{{privacy_url}}" style="color:\${COLOR.marca};text-decoration:none;">Privacy Policy</a><span style="color:\${COLOR.apagado};">&nbsp;&nbsp;&bull;&nbsp;&nbsp;</span><a href="{{terms_url}}" style="color:\${COLOR.marca};text-decoration:none;">Terms of Service</a></p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>
\`
}

/** Las variables que usa un HTML, en orden de aparición y sin repetir. */
export function variablesDe(html: string): string[] {
  return [...new Set([...html.matchAll(/\\{\\{\\s*(\\w+)\\s*\\}\\}/g)].map((m) => m[1]))]
}

const escapar = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Lo que hace el backend: reemplaza cada {{variable}} por su valor (escapado). Las que falten quedan a la vista. */
export function completar(html: string, datos: Record<string, string>): string {
  return html.replace(/\\{\\{\\s*(\\w+)\\s*\\}\\}/g, (todo, v: string) => (v in datos ? escapar(datos[v]) : todo))
}
`})))()}export{r as n,n as r,i as t};