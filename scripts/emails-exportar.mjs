/* Exporta los mails para el backend: un HTML por mail con sus {{variables}} y un emails.json con el asunto, el
   preheader, quién lo recibe y qué variables lleva. Fuente: src/emails/. Uso: `npm run emails:exportar`
   (con --check falla si public/emails/ quedó desactualizado). Ver design-reference/figma/modulos/emails.md. */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { MAILS, htmlDe, variablesDeMail } from '../src/emails/plantillas.ts'

const DESTINO = join(import.meta.dirname, '..', 'public', 'emails')
const check = process.argv.includes('--check')
const archivos = {}

for (const m of MAILS) archivos[`${m.id}.html`] = htmlDe(m)
archivos['emails.json'] = JSON.stringify(
  MAILS.map((m) => ({
    id: m.id,
    category: m.categoria,
    trigger: m.disparador,
    recipient: m.destinatario,
    subject: m.asunto,
    preheader: m.preheader,
    sender: m.remitente === 'clinica' ? 'clinic' : 'platform',
    copy: m.origen === 'doc' ? 'approved document' : 'proposal, pending approval',
    template: `${m.id}.html`,
    variables: variablesDeMail(m),
    jira: m.jira,
  })),
  null,
  2,
) + '\n'

const viejos = Object.entries(archivos).filter(([n, c]) => !existsSync(join(DESTINO, n)) || readFileSync(join(DESTINO, n), 'utf8') !== c)
if (check) {
  if (viejos.length) {
    console.error(`public/emails/ desactualizado (${viejos.map(([n]) => n).join(', ')}). Corré npm run emails:exportar.`)
    process.exit(1)
  }
  console.log(`public/emails/ al día (${MAILS.length} mails).`)
} else {
  mkdirSync(DESTINO, { recursive: true })
  for (const [n, c] of viejos) writeFileSync(join(DESTINO, n), c)
  console.log(`${MAILS.length} mails en public/emails/ (${viejos.length} actualizados).`)
}
