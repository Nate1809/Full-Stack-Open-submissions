const { test, expect, beforeEach, describe } = require('@playwright/test')



describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    await page.goto('http://localhost:5173')

    const locator = page.getByText('blogs')
    await expect(locator).toBeVisible()
    await expect(page.getByText('login to application')).toBeVisible()
  })

  test('Login form is shown', async ({ page }) => {
    // Verify the login heading is visible
    await expect(page.getByRole('heading', { name: 'login to application' })).toBeVisible()

    await expect(page.getByRole('button', { name: 'logout' })).not.toBeVisible()
  })
})