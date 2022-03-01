import {useState} from "react"
import Blog from "./Blog"
import Button from "./Button"
const Blogs = ({blogs,updateBlog})=>{
    const [toSort,setToSort] = useState(false)
    const sortedBlogs = [...blogs]
    sortedBlogs.sort((first,second)=>{
        return second.likes-first.likes
      })
    
    const toggleSort = (e)=>{
        setToSort(!toSort)
    }
    let blogsToDisplay

    toSort
    ?blogsToDisplay = sortedBlogs
    :blogsToDisplay = blogs
    return(
        <div>
            <Button onClick={toggleSort} text={toSort?"Sort chronologically":"Sort by likes"}/>
            {blogsToDisplay.map(blog => (
                <Blog updateBlog={updateBlog}key={blog.id} blog={blog} />
              ))}
        </div>
    )
}
export default Blogs