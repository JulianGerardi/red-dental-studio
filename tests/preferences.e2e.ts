import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* Settings → Preferences: el tema oscuro se elige sin Save y queda al volver a entrar. Ver
   design-reference/figma/modulos/preferences.md (2026-11-26). */

test('Dark se aplica al elegirlo, queda al volver y Light lo deshace', async ({ app, screen }) => {
  await app.open('/settings/preferences')
  const claro = screen.getByRole('radio', /^Light/)
  const oscuro = screen.getByRole('radio', /^Dark/)
  await expect(claro).toHaveAttribute('aria-checked', 'true')
  await expect(screen.getByText(/Preferred date format/)).not.toBeVisible()

  await oscuro.tap()
  await expect(oscuro).toHaveAttribute('aria-checked', 'true')

  await app.open('/settings/preferences')
  await expect(screen.getByRole('radio', /^Dark/)).toHaveAttribute('aria-checked', 'true')

  await screen.getByRole('radio', /^Light/).tap()
  await expect(screen.getByRole('radio', /^Light/)).toHaveAttribute('aria-checked', 'true')
})
