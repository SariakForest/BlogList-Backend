import { useState } from "react"

import Button from "./Button"
const Blog = ({ blog, blogProps }) => {
  const [showInfo, setShowInfo] = useState(false)
  const { user, updateBlog, deleteBlog } = blogProps

  const expandBlog = () => setShowInfo(!showInfo)
  const addLike = () => {
    const changedBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    }
    updateBlog(changedBlog)
  }
  const delBlog = () => {
    if (window.confirm(`Remove "${blog.title}"?`)) deleteBlog(blog.id)
  }

  const infoStyle = {
    padding: 20,
    width: "fit-content",
  }

  const blogInfo = (
    <div style={infoStyle}>
      <hr></hr>
      <p>
        <a href={blog.url}>Link to blog</a>
        <br></br>
      </p>
      <p>
        likes {blog.likes} <Button onClick={addLike} text="👍" />
      </p>
      <p>{blog.author}</p>
      {user.username === blog.user.username ? (
        <Button onClick={delBlog} text="Remove" type="del" />
      ) : (
        ""
      )}
      <hr></hr>
    </div>
  )

  return (
    <div>
      {blog.title}{" "}
      <Button onClick={expandBlog} text={showInfo ? "hide" : "show"} />
      {showInfo ? blogInfo : ""}
    </div>
  )
}

export default Blog
