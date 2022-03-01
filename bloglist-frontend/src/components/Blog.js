import React from "react"
const Blog = ({ blog }) => (
  <div>
    {blog.title} <i>By</i> {blog.author}
  </div>
)

export default Blog
