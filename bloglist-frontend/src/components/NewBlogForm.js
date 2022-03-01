import React, { useState } from "react"
import Button from "./Button"
const NewBlogForm = ({ createBlog }) => {
  //New blog form states
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  //Event Handlers

  const onChange = ({target})=>{
    switch(target.name){
      case "title":
        setTitle(target.value)
        break
      case "author":
        setAuthor(target.value)
        break
      case "url":
        setUrl(target.value)
        break
      default:return
    }
  }

  const addBlog = (e)=>{
    e.preventDefault()
    const newBlog = {title,author,url}
    createBlog(newBlog)
    resetInputs()
  }


  ///Helper funcs

  function resetInputs(){
    setTitle("")
    setAuthor("")
    setUrl("")
  }
  return (
    <>
       <form onSubmit={addBlog}>
      <table>
      <tbody>
        <tr>
          <td><label>title:</label></td>
          <td><input name="title" type="text" value={title} onChange={onChange}></input></td>
        </tr>
        <tr>
          <td><label>author:</label></td>
          <td><input name="author" type="text" value={author} onChange={onChange}></input></td>
        </tr>
        <tr>
          <td><label>url:</label></td>
          <td><input name="url" type="text" value={url} onChange={onChange}></input></td>
        </tr>
        </tbody>
      </table>
      <Button type="submit" text="Add blog"></Button>
    </form>  
    </>
  )
}
export default NewBlogForm
