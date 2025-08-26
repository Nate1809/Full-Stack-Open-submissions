const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // empty the db here
    await request.post('api/testing/reset')
    // create a user for the backend here
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    // go to bloglist app
    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = page.getByText('blogs')
    await expect(locator).toBeVisible()
    await expect(page.getByText('login to application')).toBeVisible()
  })

  test('login form is shown', async ({ page }) => {
    // Verify the login heading is visible
    await expect(page.getByRole('heading', { name: 'login to application' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'logout' })).not.toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong')
      // await expect(page.getByText('Wrong username or password')).toBeVisible()
      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('Wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Bull terriers blog', 'Mr Bolillo', 'https://en.wikipedia.org/wiki/Bull_Terrier')
      await expect(page.getByText('Bull terriers blog Mr Bolillo')).toBeVisible()
    })

    test.describe('and a blog exists', () => {
      test.beforeEach(async ( { page } ) => {
        await createBlog(page, 'first blog', 'first author', 'wikipedia.org')
      })
      test('the blog can be liked', async ({ page }) => {
        await page.getByText('first blog first author').click()
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByText('0 like')).toBeVisible()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('1 like')).toBeVisible()
      })
    })
  })
})