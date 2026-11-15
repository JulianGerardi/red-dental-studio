/* Atajos para escribir los pasos de un flujo. Cada uno devuelve una función (page) => Promise. */
export const clic = (nombre, rol = 'button', n = 0) => (p) => p.getByRole(rol, { name: nombre }).nth(n).click()
export const texto = (t, n = 0) => (p) => p.getByText(t).nth(n).click()
export const escribir = (campo, valor, rol = 'textbox') => (p) => p.getByRole(rol, { name: campo }).first().fill(valor)
export const tecla = (k) => (p) => p.keyboard.press(k)
export const espera = (ms) => (p) => p.waitForTimeout(ms)
export const en = (sel, f) => (p) => f(p.locator(sel))
/* Varios pasos seguidos, con una pausa corta entre uno y otro. */
export const pasos = (...fs) => async (p) => { for (const f of fs) { await f(p); await p.waitForTimeout(250) } }
/* El menú ⋮ de una fila y la opción elegida. */
export const menuFila = (fila, opcion) => pasos(clic(new RegExp(`Actions for ${fila}`)), ...(opcion ? [clic(opcion, 'menuitem')] : []))
export const llenar = (placeholder, valor, n = 0) => (p) => p.getByPlaceholder(placeholder).nth(n).fill(valor)
export const foco = (placeholder) => (p) => p.getByPlaceholder(placeholder).first().click()
/* Elige la primera opción de cada "Select" que quede en el drawer (los SelectField dibujan sus opciones como botones). */
export const elegirSelects = (cuantos = 8) => async (p) => {
  const d = p.getByRole('dialog').last()
  for (let i = 0; i < cuantos; i += 1) {
    const sel = d.getByRole('button', { name: 'Select', exact: true })
    if (!(await sel.count())) break
    const antes = await d.getByRole('button').allInnerTexts()
    await sel.first().click()
    await p.waitForTimeout(250)
    const nuevos = (await d.getByRole('button').allInnerTexts()).filter((t) => !antes.includes(t))
    if (nuevos[0]) await d.getByRole('button', { name: nuevos[0], exact: true }).first().click()
    await p.waitForTimeout(200)
  }
}
export const enDialogo = (f) => (p) => f(p.getByRole('dialog').last())
