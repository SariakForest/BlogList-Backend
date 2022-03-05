import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import Blog from "../Blog"

describe("Blog components renders and", () => {
  const blog = {
    author: "Fulanito Perez",
    likes: 3,
    title: "Test blog",
    url: "http://rialLink.com",
    user: {
      username: "Sariak",
      name: "Sara Alvarez",
      id: "621e083c5faf16fac32734a4",
    },
  }
  const blogProps = {
    user: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNhcmlhayIsImlkIjoiNjIxZTA4M2M1ZmFmMTZmYWMzMjczNGE0IiwiaWF0IjoxNjQ2MTU3ODUzfQ.iPULRQw0RCgjhKGvmjXThiPrnGS_E60y-qT6jmSK8To",
      username: "Sariak",
      name: "Sara Alvarez",
    },
    updateBlog: () => jest.fn(),
    deleteBlog: () => jest.fn(),
  }
  test("displays title", () => {
    render(<Blog blog={blog} blogProps={blogProps} />)
    const element = screen.getByText(blog.title)
    expect(element).toBeDefined()
  })
  test("does not display url or likes by default", () => {
    const { container } = render(<Blog blog={blog} blogProps={blogProps} />)
    const link = container.querySelector(".blog__link")
    const likes = container.querySelector(".blog__likes")
    expect(link).toBeNull()
    expect(likes).toBeNull()
  })
})
