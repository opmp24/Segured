import { test, expect } from '@playwright/test'

test('homepage loads and shows title', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toContainText('NM Soluciones Integrales')
})
