import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { vi } from 'vitest'
import axios from 'axios'

vi.mock('axios')

const blog = {
  id: '1',
  title: 'react testing',
  author: 'tester',
  url: 'http://testing.com',
  likes: 5,
  user: {
    username: 'tester',
    name: 'Tester'
  }
}

const mockSetBlogs = vi.fn()
const mockBlogs = []

test('renders title and author, but not url or likes by default', () => {
  render(<Blog blog={blog} user={{ username: 'tester', name: 'Tester' }} setBlogs={mockSetBlogs} blogs={mockBlogs} />)

  const headerElement = screen.getByText('react testing tester')
  expect(headerElement).toBeDefined()

  const detailsDiv = screen.queryByText('http://testing.com')
  expect(detailsDiv).toBeNull()

  const likesDiv = screen.queryByText('5 likes')
  expect(likesDiv).toBeNull()
})

test('url and number of likes are shown when the button controlling the shown details has been clicked', () => {
  render(<Blog blog={blog} user={{ username: 'tester', name: 'Tester' }} setBlogs={mockSetBlogs} blogs={mockBlogs} />)

  const button = screen.getByText('view')
  fireEvent.click(button)

  const urlElement = screen.getByText('http://testing.com')
  expect(urlElement).toBeDefined()

  const likesElement = screen.getByText('5 likes')
  expect(likesElement).toBeDefined()
})

test('like button is clicked twice, the event handler is called twice', () => {
  axios.put.mockResolvedValue({
    data: {
      ...blog,
      likes: blog.likes + 1,
    }
  })

  render(<Blog blog={blog} user={{ username: 'tester', name: 'Tester' }} setBlogs={mockSetBlogs} blogs={mockBlogs} updateBlog={vi.fn()} />)

  const button = screen.getByText('view')
  fireEvent.click(button)

  const likeButton = screen.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(axios.put).toHaveBeenCalledTimes(2)
})

test('form calls the event handler it received as props with the right details when a new blog is created', () => {
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('Title')
  const authorInput = screen.getByPlaceholderText('Author')
  const urlInput = screen.getByPlaceholderText('URL')

  fireEvent.change(titleInput, { target: { value: 'react testing' } })
  fireEvent.change(authorInput, { target: { value: 'tester' } })
  fireEvent.change(urlInput, { target: { value: 'http://testing.com' } })

  const submitButton = screen.getByText('create')
  fireEvent.click(submitButton)

  expect(createBlog).toHaveBeenCalledWith({
    title: 'react testing',
    author: 'tester',
    url: 'http://testing.com',
    likes: 0,
  })
})
