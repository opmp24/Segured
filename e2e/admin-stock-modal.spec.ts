import { test, expect } from '@playwright/test'

test.describe('Admin stock modal', () => {
  test.beforeEach(async ({ page }) => {
    const token = 'test-token-123'

    await page.route('**/.netlify/functions/admin-auth', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ token }),
      })
    })

    await page.route('**/.netlify/functions/admin-products*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 1,
            name: 'Casco de Seguridad',
            code: 'CAS-001',
            category: 'EPP',
            brand: 'MarcaTest',
            color: 'Amarillo',
            material: 'Polietileno',
            position: 1,
            price: 15000,
            quantity: 10,
            status: 'visible',
            description: 'Casco de seguridad industrial',
            product_images: [],
            created_at: '2026-01-01T00:00:00Z',
            updated_at: '2026-01-01T00:00:00Z',
          },
        ]),
      })
    })

    await page.goto('/admin')
    await page.fill('input[type="password"]', 'any-password')
    await page.click('button[type="submit"]')
    await page.waitForURL(/\/admin\/dashboard/)
  })

  test('modal opens with correct Bootstrap classes', async ({ page }) => {
    await page.goto('/admin/dashboard/stock')
    await page.waitForSelector('table.table')
    await page.click('button[title="Editar"]')
    await page.waitForSelector('.modal.show')

    const modal = page.locator('.modal.show')
    await expect(modal).toHaveAttribute('tabindex', '-1')

    const dialog = modal.locator('.modal-dialog')
    await expect(dialog).toHaveClass(/modal-dialog-centered/)
    await expect(dialog).toHaveClass(/modal-dialog-scrollable/)
    await expect(dialog).toHaveClass(/modal-xl/)
    await expect(dialog).toHaveClass(/modal-fullscreen-md-down/)
  })

  test('modal-body has overflow-y auto for scroll', async ({ page }) => {
    await page.goto('/admin/dashboard/stock')
    await page.waitForSelector('table.table')
    await page.click('button[title="Editar"]')
    await page.waitForSelector('.modal.show')

    const overflowY = await page
      .locator('.modal.show .modal-body')
      .evaluate((el) => getComputedStyle(el).overflowY)
    expect(overflowY).toBe('auto')
  })

  test('modal-content has overflow hidden to constrain body scroll', async ({ page }) => {
    await page.goto('/admin/dashboard/stock')
    await page.waitForSelector('table.table')
    await page.click('button[title="Editar"]')
    await page.waitForSelector('.modal.show')

    const overflow = await page
      .locator('.modal.show .modal-content')
      .evaluate((el) => getComputedStyle(el).overflow)
    expect(overflow).toBe('hidden')
  })

  test('modal-header and modal-footer stay visible while body scrolls', async ({ page }) => {
    await page.goto('/admin/dashboard/stock')
    await page.waitForSelector('table.table')
    await page.click('button[title="Editar"]')
    await page.waitForSelector('.modal.show')

    const header = page.locator('.modal.show .modal-header')
    const footer = page.locator('.modal.show .modal-footer')
    const body = page.locator('.modal.show .modal-body')

    await expect(header).toBeVisible()
    await expect(footer).toBeVisible()

    const headerBox = await header.boundingBox()
    const footerBox = await footer.boundingBox()
    const bodyBox = await body.boundingBox()

    expect(headerBox).toBeTruthy()
    expect(footerBox).toBeTruthy()
    expect(bodyBox).toBeTruthy()

    expect(headerBox!.y + headerBox!.height).toBeLessThanOrEqual(bodyBox!.y)
    expect(footerBox!.y).toBeGreaterThanOrEqual(bodyBox!.y + bodyBox!.height)
  })
})
