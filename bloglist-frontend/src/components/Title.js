import React from "react"
const Title = ({ user }) => {
  let text = ""
  user === null ? (text = "Log In") : (text = "Blogs")

  return (<h2>{text}</h2>)
}

export default Title
