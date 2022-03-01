import React, { useState, useEffect, useRef } from "react"
//Services
import blogService from "./services/blogs"
import loginService from "./services/login"
//Styles
import "./index.css"
//COMPONENTS
import Notification from "./components/Notification"
import Button from "./components/Button"
import Title from "./components/Title"
import LogInForm from "./components/LogInForm"
import Blogs from "./components/Blogs"
import NewBlogForm from "./components/NewBlogForm"
import Togglable from "./components/Togglable"

const App = () => {
  const [blogs, setBlogs] = useState([])
  //Notification States
  const [notMsg, setNotMsg] = useState(null)
  const [isErr, setIsErr] = useState(false)
  //Login form states
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  
  const blogFormRef = useRef()

  useEffect(() => {
    async function fetch() {
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
    }
    fetch()
  }, [])
  useEffect(()=>{
    const blogListUser = window.localStorage.getItem("blogListUser")
    if(blogListUser){
      const user = JSON.parse(blogListUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])
  ///EVENT HANDLERS
  const onChange = e => {
    switch(e.target.getAttribute("name")){
      case "username":
        setUsername(e.target.value)
        break
      case "password":
        setPassword(e.target.value)
        break
      default: return
     
    }
      
  }
  const logInHandler = async e => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("blogListUser",JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      resetInputs("login")
      notify(false,`${user.username} succesfully logged in`)
    } catch (err) {
      notify(true,"Invalid username or password")
    }
  }
  const logOutHandler = e =>{
    window.localStorage.removeItem("blogListUser")
    notify(false,`Goodbye, ${user.username}!`)
    setUser(null)
  }
  const createBlog = async (newBlog) =>{

    try{
      const addedBlog = await blogService.addBlog(newBlog)
      setBlogs(blogs.concat(addedBlog))
      notify(false,`"${addedBlog.title.substring(0,30)}..." succesfully added`)
      resetInputs("newBlog")
      blogFormRef.current.toggleVisibility()
    }catch(err){
      const errStatus = err.message.slice(-3)
      errStatus==="400"
      ?notify(true,"Invalid url, title or author are missing")
      :notify(true,"Oops! Something went wrong")
    }
  }


  ///HTML GENERATORS
  const logInForm = () => (
    <LogInForm
      username={username}
      password={password}
      onSubmit={logInHandler}
      onChange={onChange}
    ></LogInForm>
  )
  const blogList = () => (
    <>
      {user.username} logged in <Button onClick={logOutHandler} text="logout"></Button>
      <br></br>
      <Togglable btnLabel="New blog" ref={blogFormRef}>
        <NewBlogForm createBlog={createBlog} ></NewBlogForm>
      </Togglable>
      <hr></hr>
      <Blogs blogs={blogs}></Blogs>
    </>
  )

  //Helpers
  function resetNot(){
    setTimeout(()=>setNotMsg(null),5000)
  }
  function notify(isErr,msg){
    setIsErr(isErr)
    setNotMsg(msg)
    resetNot()
  }
  function resetInputs(wichInputs){
    if(wichInputs==="login"){
      setUsername("")
      setPassword("")
    }

  }


  ///%%%%%%%%%%%%%%%%RETURN JSX%%%%%%%%%%%%%%%%%%%%%
  return (
    <div>
      <Notification msg={notMsg} isErr={isErr}></Notification>
      <Title user={user}></Title>
      {user === null ? logInForm() : blogList()}
    </div>
  )
}

export default App
