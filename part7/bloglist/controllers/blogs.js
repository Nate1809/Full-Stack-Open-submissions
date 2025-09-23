const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user
  if ( blog.user.toString() === user._id.toString() ) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }

  return response.status(401).json({ error: 'user not authorized to delete this blog' })
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  // Find the blog by ID
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }

  // Update fields
  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes

  // Save and return the updated blog
  const updatedBlog = await blog.save()
  response.json(updatedBlog)
})

blogsRouter.get('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }
  response.json(blog.comments || [])
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const { comment } = request.body

  if (!comment) {
    return response.status(400).json({ error: 'comment is required' })
  }

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  blog.comments = blog.comments || []
  blog.comments.push(comment)
  await blog.save()

  response.status(201).json(comment)
})

module.exports = blogsRouter