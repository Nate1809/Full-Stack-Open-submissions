const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Bolillos del mundo',
    author: 'Alameda Smith',
    url: 'https://bullterrier.world/blogs/all/bull-terriers-sunbathing-the-health-benefits-of-vitamin-d',
    likes: 5999
  },
  {
    title: 'Stardew Valley Cookbook is now avaialble',
    author: 'Eric Barone',
    url: 'https://www.stardewvalley.net/the-stardew-valley-cookbook-is-now-available/',
    likes: 5999
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}