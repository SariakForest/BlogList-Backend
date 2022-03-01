import React from "react"
import Blog from "./Blog"
const Blogs = ({blogs,updateBlog})=>{
    return(
        <div>
            {blogs.map(blog => (
                <Blog updateBlog={updateBlog}key={blog.id} blog={blog} />
              ))}
        </div>
    )
}
export default Blogs