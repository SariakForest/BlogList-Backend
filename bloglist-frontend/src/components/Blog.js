import { useState } from "react"

import Button from "./Button"
const Blog = ({ blog }) => {
  const [showInfo, setShowInfo] = useState(false)

  const expandBlog = () => setShowInfo(!showInfo)

  const infoStyle = {
    padding:20,
    width:"fit-content"
  }
  const blogInfo = (
    <div style={infoStyle}>
      <hr></hr>
      <p><a href={blog.url}>Link to blog</a><br></br></p>
      <p>likes {blog.likes} <Button text="👍" /></p>
      <p>{blog.author}</p>
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
