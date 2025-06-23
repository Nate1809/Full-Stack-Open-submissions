import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.detailBlogContent')
    expect(div).not.toHaveStyle('display: none')
  })
})