const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const app = require('../app')

const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

let token

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()

  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'root', password: 'sekret' })

  token = loginResponse.body.token

  // Create blogs using the authenticated route
  for (const blog of helper.initialBlogs) {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
  }
})

describe('blog API', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('unique identifier property is named id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    for (const blog of blogs) {
      assert.ok(blog.id, 'Expected blog to have an "id" field')
      assert.strictEqual(blog._id, undefined, 'Expected blog not to have "_id" field')
    }
  })

  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'Sei: Reimagining AI Therapy',
      author: 'Nathan Guzman',
      url: 'https://medium.com/@nathanguzman/sei-reimagining-ai-therapy-with-googles-agent-development-kit-6d9e39088a93',
      likes: 52
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)


    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)


    const contents = blogsAtEnd.map(n => n.title)
    assert(contents.includes('Sei: Reimagining AI Therapy'))
  })

  test('blog without likes defaults to 0 likes', async () => {
    const newBlog = {
      title: 'Sei: Reimagining AI Therapy',
      author: 'Nathan Guzman',
      url: 'https://medium.com/@nathanguzman/sei-reimagining-ai-therapy-with-googles-agent-development-kit-6d9e39088a93',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].likes, 0)
  })

  test('blog without title is not added', async () => {
    const newBlog = {
      author: 'Nathan Guzman',
      url: 'https://medium.com/@nathanguzman/sei-reimagining-ai-therapy-with-googles-agent-development-kit-6d9e39088a93',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('blog without url is not added', async () => {
    const newBlog = {
      title: 'Sei: Reimagining AI Therapy',
      author: 'Nathan Guzman',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('adding a blog with invalid token fails with 401', async () => {
    const newBlog = {
      title: 'Unauthorized Blog',
      author: 'Evil User',
      url: 'http://malicious.com',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer invalidtoken123')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

  test('adding a blog without a token fails with 401', async () => {
    const newBlog = {
      title: 'Missing Token Blog',
      author: 'No Auth',
      url: 'http://notoken.com',
      likes: 1
    }

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(result.body.error, 'token missing')
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).set('Authorization', `Bearer ${token}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const contents = blogsAtEnd.map(n => n.title)
    assert(!contents.includes(blogToDelete.title))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  })

  test('fails with status 401 if user did not create the blog', async () => {
    // Create a second user
    const passwordHash = await bcrypt.hash('anotherpass', 10)
    const otherUser = new User({ username: 'anotheruser', passwordHash })
    await otherUser.save()

    // Log in as the second user
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'anotheruser', password: 'anotherpass' })

    const otherToken = loginResponse.body.token

    // Attempt to delete a blog created by the first user
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    const result = await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${otherToken}`)
      .expect(401)

    assert.strictEqual(result.body.error, 'user not authorized to delete this blog')

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })
})

describe('updating a blog', () => {
  test('number of likes is updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const newBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 1000
    }
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const blogAtEnd = blogsAtEnd.find(b => b.id === blogToUpdate.id)
    assert.strictEqual(blogAtEnd.likes, newBlog.likes)
    assert.strictEqual(blogAtEnd.title, newBlog.title)
    assert.strictEqual(blogAtEnd.author, newBlog.author)
    assert.strictEqual(blogAtEnd.url, newBlog.url)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'gallinero',
      name: 'Clucker Chicken',
      password: 'burger',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Clucker Chicken',
      password: 'burger',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password is too short', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'rata',
      name: 'Walt Disney',
      password: 'a',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('Both username and password must be given and both must be at least 3 characters long'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username is too short', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'a',
      name: 'Walt Disney',
      password: 'cool password bruh',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('Both username and password must be given and both must be at least 3 characters long'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})