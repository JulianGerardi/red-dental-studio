/* Login. Ver design-reference/figma/modulos/login.md. */
import { clic } from './_util.mjs'

export default {
  pagina: '🔐 Login',
  orden: 1,
  resumen: 'Entrar a la plataforma y recuperar la contraseña. Van fuera del app shell.',
  jira: [],
  flujos: [
    {
      nombre: 'Login — Sign in',
      rol: 'Todos',
      resumen: 'Email y contraseña. Sin historia en Jira para el clon.',
      pantallas: [
        { nombre: 'Login', ruta: '/login', nota: 'Formulario a la derecha; a la izquierda, lo que ofrece la plataforma.' },
        { nombre: 'Login · required', hacer: clic('Login'), nota: 'Login sin datos marca los campos.' },
        { nombre: 'Forgot your password?', ruta: '/forgot-password', nota: 'Pide el email para mandar el link de reseteo.' },
        { nombre: 'Reset link sent', hacer: async (p) => { await p.getByRole('textbox').first().fill('sarah@clinic.com'); await p.getByRole('button', { name: 'Send reset link' }).click() }, nota: 'Confirma que el link se envió.' },
      ],
    },
  ],
}
