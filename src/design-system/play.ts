import { userEvent, within } from 'storybook/test'

/* Ayudas para los stories que muestran un estado que nace de una interacción:
   un error de validación después de apretar Save, una búsqueda sin resultados,
   una fila elegida. Buscan en todo el documento porque los menús y diálogos
   se dibujan fuera del canvas. */
type Contexto = { canvasElement: HTMLElement }

const en = (c: Contexto) => within(c.canvasElement.ownerDocument.body)

/* Aprieta el botón cuyo nombre coincide. */
export const pulsar = (nombre: RegExp) => async (c: Contexto) => {
  await userEvent.click(await en(c).findByRole('button', { name: nombre }))
}

/* Escribe en el campo con ese placeholder o rótulo. Asigna el valor con el
   setter nativo y dispara `input`: es lo que React escucha en un campo
   controlado. `userEvent.type` dejaba el valor en el DOM sin llegar al estado. */
export const escribir = (campo: RegExp | string, texto: string) => async (c: Contexto) => {
  const cuerpo = en(c)
  const candidatos = await cuerpo.findAllByPlaceholderText(campo).catch(() => [] as HTMLElement[])
  const el = (candidatos[0] ?? (await cuerpo.findByLabelText(campo))) as HTMLInputElement | HTMLTextAreaElement
  const prototipo = el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype
  Object.getOwnPropertyDescriptor(prototipo, 'value')!.set!.call(el, texto)
  el.dispatchEvent(new Event('input', { bubbles: true }))
}

/* Encadena pasos. */
export const secuencia = (...pasos: ((c: Contexto) => Promise<void>)[]) => async (c: Contexto) => {
  for (const paso of pasos) await paso(c)
}

/* Comprueba que el texto esté en pantalla: si no aparece el story falla, así
   cada estado documentado queda verificado y no sólo dibujado. */
export const esperar = (texto: RegExp) => async (c: Contexto) => {
  await en(c).findByText(texto, { exact: false })
}
