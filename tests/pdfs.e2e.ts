import { test } from '@e2e-dev/web'
import { expect } from 'e2e'

/* PDFs: la página aparte con las plantillas de los PDF del backend (/pdfs/, fuera de la app). Ver design-reference/figma/modulos/pdfs.md (2026-11-25). */

test('Elegir un PDF muestra cuándo se genera, de dónde sale el diseño, sus variables y sus listas', async ({ app, screen }) => {
  await app.open('/pdfs/')
  await expect(screen.getByRole('heading', /^Clinical note$/)).toBeVisible()
  await expect(screen.getByText(/^Same as the app$/)).toBeVisible()

  await screen.getByRole('link', /^Prescription/).tap()
  await expect(screen.getByRole('heading', /^Prescription$/)).toBeVisible()
  await expect(screen.getByText(/^Proposal · pending approval$/)).toBeVisible()
  await expect(screen.getByText(/^\{\{#medications\}\}$/)).toBeVisible()
  await expect(screen.getByText(/^\{\{drug_name\}\}$/)).toBeVisible()
})

test('La vista previa cambia entre datos de ejemplo, variables y el PDF, y entre firmado y sin firmar', async ({ app, screen }) => {
  await app.open('/pdfs/#procedure-consent')
  const sinFirmar = screen.getByRole('tab', 'Not signed')
  await sinFirmar.tap()
  await expect(sinFirmar).toHaveAttribute('aria-selected', 'true')

  const variables = screen.getByRole('tab', 'Variables')
  await variables.tap()
  await expect(variables).toHaveAttribute('aria-selected', 'true')
  await expect(screen.getByRole('tab', 'Not signed')).not.toBeVisible()

  await screen.getByRole('tab', 'PDF').tap()
  await expect(screen.getByText(/open it in a new tab/)).toBeVisible()
  await expect(screen.getByRole('button', 'Download HTML')).toBeVisible()
  await expect(screen.getByRole('link', 'Sample PDF')).toBeVisible()
})

test('Los PDF sin firmas no muestran el selector de firma', async ({ app, screen }) => {
  await app.open('/pdfs/#lab-order')
  await expect(screen.getByRole('heading', /^Lab order$/)).toBeVisible()
  await expect(screen.getByRole('tab', 'Signed')).not.toBeVisible()
})
