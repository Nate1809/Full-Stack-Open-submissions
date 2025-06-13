const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, current) =>
    (prev && prev.likes > current.likes) ? prev : current
  , null)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const grouped = _.countBy(blogs, 'author') // like defaultdict + increment
  const topAuthor = _.maxBy(Object.entries(grouped), ([, count]) => count)

  return {
    author: topAuthor[0],
    blogs: topAuthor[1]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}