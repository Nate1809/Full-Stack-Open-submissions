const assert = require('node:assert')
const { test, after, beforeEach, describe} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
})

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
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const contents = blogsAtEnd.map(n => n.title)
    assert(!contents.includes(blogToDelete.title))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})