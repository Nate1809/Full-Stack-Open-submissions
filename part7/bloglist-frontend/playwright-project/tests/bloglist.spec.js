const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // empty the db here
    await request.post('api/testing/reset')
    // create users for the backend here
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await request.post('/api/users', {
      data: {
        name: 'Noria de Mexico',
        username: 'noria',
        password: 'mexico'
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

    test.describe('and a blog by user exists', () => {
      test.beforeEach(async ( { page } ) => {
        await createBlog(page, 'first blog', 'first author', 'wikipedia.org')
      })
      test('the blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByText('0 like')).toBeVisible()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('1 like')).toBeVisible()
      })
      test('the blog can be deleted by user who added it', async ({ page }) => {
        await page.getByText('first blog first author').click()
        await page.getByRole('button', { name: 'view' }).click()
        page.on('dialog', dialog => dialog.accept())
        await page.getByRole('button', { name: 'remove' }).click()
        await page.getByText('Blog first blog by first author removed').waitFor()
        // check blog no longer there
        await expect(page.getByText('first blog first author')).not.toBeVisible()
        await expect(page.getByText('like')).not.toBeVisible()
      })
    })
    test('only the user who added the blog sees the blog delete button', async ({ page }) => {
      // original logout
      await page.getByRole('button', { name: 'logout' }).click()
      // stranger login and create blog
      await loginWith(page, 'noria', 'mexico')
      await createBlog(page, 'first blog', 'first author', 'wikipedia.org')
      //stranger logout
      await page.getByRole('button', { name: 'logout' }).click()
      // login original
      await loginWith(page, 'mluukkai', 'salainen')
      // test if can delete stranger's blog
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('remove')).not.toBeVisible()
    })
    test('blogs are arranged in the order according to the likes', async ({ page }) => {
      // create 3 blogs
      await createBlog(page, 'one like blog', 'one author', 'wikipedia.org')
      await createBlog(page, 'three like blog', 'three author', 'wikipedia.org')
      await createBlog(page, 'two like blog', 'two author', 'wikipedia.org')

      // add likes
      await page.locator('div').filter({ hasText: /^one like blog one author view$/ }).getByRole('button').click()
      await page.getByRole('button', { name: 'like' }).click()
      await page.getByRole('paragraph').filter({ hasText: '1 like' }).waitFor()
      await page.getByRole('button', { name: 'hide' }).click()

      await page.pause()


      await page.locator('div').filter({ hasText: /^two like blog two author view$/ }).getByRole('button').click()
      for (let i = 0; i < 2; i++) {
        await page.getByRole('button', { name: 'like' }).click()
        await page.getByRole('paragraph').filter({ hasText: (i + 1) + ' like' }).waitFor()
      }
      await page.getByRole('button', { name: 'hide' }).click()


      await page.locator('div').filter({ hasText: /^three like blog three author view$/ }).getByRole('button').click()
      for (let i = 0; i < 3; i++) {
        await page.getByRole('button', { name: 'like' }).click()
        await page.getByRole('paragraph').filter({ hasText: (i + 1) + ' like' }).waitFor()
      }
      await page.getByRole('button', { name: 'hide' }).click()

      //reload page
      await page.reload()

      // make sure order is three like blog -> two like blog -> one like blog
      await page.pause()
      const blogs = page.locator('.defaultBlogContent')
      await expect(blogs.nth(0)).toContainText('three like blog three author')
      await expect(blogs.nth(1)).toContainText('two like blog two author')
      await expect(blogs.nth(2)).toContainText('one like blog one author')

    })
  })

})