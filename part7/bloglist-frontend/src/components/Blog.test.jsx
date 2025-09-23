import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import NewBlogForm from "./NewBlogForm.jsx";

describe('Blog', () => {
  const blog = {
    title: 'Bolillos del mundo',
    author: 'Alameda Smith',
    url: 'https://bullterrier.world'
  }

  const mockLikeHandler = vi.fn()
  const mockRemoveHandler = vi.fn()

  let container

  beforeEach(() => {
    container = render(
      <Blog
        blog={ blog }
        user={ {} }
        handleLike={ mockLikeHandler }
        handleRemove={ mockRemoveHandler }
      />
    ).container
  })

  test('at start blog name and author are displayed', () => {
    const div = container.querySelector('.defaultBlogContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('at start URL and likes are not displayed', () => {
    const div = container.querySelector('.detailBlogContent')
    expect(div).toHaveStyle('display: none')
  })

  test('URL and likes displayed when show button clicked', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const div = container.querySelector('.detailBlogContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })

})

describe('New Blog Form', () => {

  const mockCreateHandler = vi.fn()
  let container

  beforeEach(() => {
    container = render(
      <NewBlogForm createBlog={ mockCreateHandler }/>
    ).container
  })

  test('new blog form calls the event handler it received as props with the right details', async () => {
    // screen.debug()
    const user = userEvent.setup()

    const titleInput = screen.getByPlaceholderText('title')
    const authorInput = screen.getByPlaceholderText('author')
    const urlInput = screen.getByPlaceholderText('url')
    const createButton = screen.getByText('create')

    await user.type(titleInput, 'bolillitos del mundo')
    await user.type(authorInput, 'Raymix')
    await user.type(urlInput, 'https://www.akc.org/dog-breeds/bull-terrier/')
    await user.click(createButton)

    // console.log(mockCreateHandler.mock.calls[0][0])
    expect(mockCreateHandler.mock.calls).toHaveLength(1)
    expect(mockCreateHandler.mock.calls[0][0].title).toBe('bolillitos del mundo')
    expect(mockCreateHandler.mock.calls[0][0].author).toBe('Raymix')
    expect(mockCreateHandler.mock.calls[0][0].url).toBe('https://www.akc.org/dog-breeds/bull-terrier/')
  })

})
